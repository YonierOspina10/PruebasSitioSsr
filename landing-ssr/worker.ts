/**
 * worker.ts — Cloudflare Worker SSR handler para landing-ssr.
 *
 * Este Worker reemplaza server.ts (Express/Node) para producción en Cloudflare.
 * Usa el runtime V8 isolate de Workers (NO Node.js).
 *
 * Responsabilidades:
 *  1. Servir assets estáticos desde Static Assets (/__STATIC_CONTENT)
 *  2. Ejecutar SSR (renderToString) para requests de páginas HTML
 *  3. Inyectar en el template: app-html, pinia-state, importmap, shell-config
 *  4. Cachear respuestas SSR con Cache API (caches.default)
 *  5. Aplicar cabeceras de seguridad OWASP en cada respuesta
 */

// ── Import del módulo SSR (viene del build: vite build --ssr) ─────────────────
// En producción, Wrangler resuelve esta ruta al bundle compilado.
import { render } from './dist/server/entry-server.js'

// ── El template HTML se inyecta en build time por el script de empaquetado ────
// Wrangler/esbuild importa .html como texto plano (configurado en [[rules]] de wrangler.toml).
// La sintaxis ?raw es exclusiva de Vite; para Workers se usa la regla type="Text".
declare module '*.html' {
  const content: string
  export default content
}
import HTML_TEMPLATE from './dist/client/index.html'

// ── Tipado del entorno de Cloudflare Workers ──────────────────────────────────

/** Variables de entorno configuradas en wrangler.toml o el dashboard de Cloudflare */
interface Env {
  /** URL base del SPA root (ej: https://sitiousuarioonline.com) */
  SPA_ROOT_URL: string
  /** URL del configLanding.js en el CDN/SPA root */
  CONFIG_LANDING_URL: string
  /** URL pre-configurada del bundle hasheado de SitioVersion5 */
  SITIO_VERSION5_BUNDLE_URL: string
  /** Origen del deployment Pages (root shell) para discovery y fallback de assets */
  PAGES_ORIGIN: string
  /** Binding de Static Assets (Cloudflare Sites / Workers Assets) */
  ASSETS: Fetcher
}

// Cache en memoria del isolate para evitar fetch de discovery en cada request.
interface DiscoveredPagesAssets {
  rootShellEntry: string
  sitioVersion5Bundle: string
  configLandingUrl: string
  versionConfigUrl: string
}
let cachedPagesAssets: DiscoveredPagesAssets | null = null
let cachedPagesAssetsExpiresAt = 0

// Versión del cache key: incrementar al desplegar cambios que afecten el HTML
// para invalidar respuestas cacheadas sin necesidad de purge manual.
const CACHE_VERSION = 'v7'

// ── Extensiones de archivos estáticos que NO deben pasar por SSR ──────────────
const STATIC_EXTENSIONS = new Set([
  '.js', '.mjs', '.css',
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot',
  '.json', '.xml', '.txt', '.map',
  '.mp4', '.webm', '.ogg', '.mp3',
  '.pdf',
])

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Determina si la request es para un asset estático basándose en la extensión
 * del pathname. Evita ejecutar SSR para archivos JS, CSS, imágenes, etc.
 */
function isStaticAsset(pathname: string): boolean {
  const lastDot = pathname.lastIndexOf('.')
  if (lastDot === -1) return false
  const ext = pathname.slice(lastDot).toLowerCase()
  return STATIC_EXTENSIONS.has(ext)
}

/**
 * Determina si la request debe recibir HTML renderizado por SSR.
 * Condiciones:
 *  - Método GET o HEAD (no mutaciones)
 *  - Header Accept incluye text/html (es un navegador/crawler, no una API call)
 *  - La URL no es un asset estático
 */
function shouldSSR(request: Request, pathname: string): boolean {
  const method = request.method.toUpperCase()
  if (method !== 'GET' && method !== 'HEAD') return false
  if (isStaticAsset(pathname)) return false
  const accept = request.headers.get('Accept') ?? ''
  return accept.includes('text/html')
}

function isLandingPath(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/home' ||
    pathname === '/home/' ||
    pathname === '/landing-ssr' ||
    pathname === '/landing-ssr/'
  )
}

function resolveSpaRedirectTarget(spaRootUrl: string, requestUrl: URL): string | null {
  const { pathname, search } = requestUrl

  if (!spaRootUrl || isLandingPath(pathname) || isStaticAsset(pathname)) {
    return null
  }

  try {
    const target = new URL(`${pathname}${search}`, spaRootUrl)

    // Si SPA_ROOT_URL apunta al mismo dominio y la URL ya es canónica,
    // no redirigir para evitar loops 302 en /deportes y similares.
    if (
      target.origin === requestUrl.origin &&
      target.pathname === pathname &&
      target.search === search
    ) {
      return null
    }

    return target.toString()
  } catch {
    return null
  }
}

/**
 * Genera los headers de seguridad OWASP para cada respuesta HTML.
 * Protege contra XSS, clickjacking, MIME sniffing, etc.
 */
function buildSecurityHeaders(spaRootUrl: string): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self' https:",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https:`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https:",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https:",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com https:",
      `connect-src 'self' https:`,
      "media-src 'self' https:",
      "frame-ancestors 'none'",
    ].join('; '),
  }
}

/**
 * Construye el bloque <script type="importmap"> para que el root shell
 * pueda resolver los dynamic imports de SitioVersion5 correctamente.
 * Solo se usa como fallback si el root shell entry no está disponible.
 */
function buildImportmap(bundleUrl: string): string {
  if (!bundleUrl) return ''
  const importmap = {
    imports: {
      '@my-micro-apps/SitioVersion5': bundleUrl,
    },
  }
  const safeJson = JSON.stringify(importmap).replace(/</g, '\\u003c')
  return `<script type="importmap">${safeJson}</script>`
}

/**
 * Descubre los assets del root shell desde el manifest de Pages.
 * Retorna:
 *  - rootShellEntry: URL del entry point compilado del root shell
 *  - sitioVersion5Bundle: URL del chunk de SitioVersion5 (fallback)
 *
 * El root shell entry se carga en el HTML SSR para que el root shell
 * maneje single-spa y las transiciones SPA sin recarga de página.
 */
async function discoverPagesAssets(env: Env): Promise<DiscoveredPagesAssets> {
  const now = Date.now()
  if (cachedPagesAssets && cachedPagesAssetsExpiresAt > now) {
    return cachedPagesAssets
  }

  const result: DiscoveredPagesAssets = { rootShellEntry: '', sitioVersion5Bundle: '', configLandingUrl: '', versionConfigUrl: '' }
  const pagesOrigin = env.PAGES_ORIGIN
  if (!pagesOrigin) return result

  interface ManifestEntry {
    file?: string
    src?: string
    isEntry?: boolean
    isDynamicEntry?: boolean
    dynamicImports?: string[]
    imports?: string[]
    css?: string[]
  }

  try {
    const manifestCandidates = [
      `${pagesOrigin}/.vite/manifest.json`,
      `${pagesOrigin}/manifest.json`,
    ]

    for (const manifestUrl of manifestCandidates) {
      let response: Response
      try { response = await fetch(manifestUrl) } catch { continue }
      if (!response.ok) continue

      let manifest: Record<string, ManifestEntry>
      try { manifest = await response.json() as Record<string, ManifestEntry> } catch { continue }

      // Root shell entry: manifest['index.html'].file
      const indexEntry = manifest['index.html']
      if (indexEntry?.file) {
        result.rootShellEntry = indexEntry.file.startsWith('/') ? indexEntry.file : `/${indexEntry.file}`
      }

      // SitioVersion5 bundle via dynamicImports
      if (indexEntry?.dynamicImports) {
        for (const dynKey of indexEntry.dynamicImports) {
          if (dynKey.includes('landing')) continue
          const dynEntry = manifest[dynKey]
          if (dynEntry?.isDynamicEntry && dynEntry?.file) {
            result.sitioVersion5Bundle = dynEntry.file.startsWith('/') ? dynEntry.file : `/${dynEntry.file}`
            break
          }
        }
      }

      if (result.rootShellEntry) break
    }

    // Descubrir configLanding y versionConfig del HTML de Pages
    try {
      const htmlResponse = await fetch(`${pagesOrigin}/`)
      if (htmlResponse.ok) {
        const html = await htmlResponse.text()
        // Extraer configLanding URL: <script ... src="...configLanding..."> 
        const configLandingMatch = html.match(/src=["']([^"']*configLanding[^"']*)["']/)
        if (configLandingMatch?.[1]) {
          result.configLandingUrl = configLandingMatch[1]
        }
        // Extraer versionConfig: window.versionConfig = '...'
        const versionConfigMatch = html.match(/versionConfig\s*=\s*["']([^"']+)["']/)
        if (versionConfigMatch?.[1]) {
          result.versionConfigUrl = versionConfigMatch[1]
        }
      }
    } catch {
      // Fallback: usar CONFIG_LANDING_URL si no se puede descubrir
    }

    // Cache por 5 minutos
    cachedPagesAssets = result
    cachedPagesAssetsExpiresAt = now + 5 * 60 * 1000
    return result
  } catch {
    return result
  }
}

/**
 * Genera el script tag del root shell entry para inyectar en el HTML SSR.
 * El root shell se encarga de:
 *  - Inicializar temas, analytics, config
 *  - Registrar single-spa apps (landing-ssr como ghost app + SitioVersion5)
 *  - Manejar transiciones SPA sin recarga de página
 */
function buildRootShellEntryTag(rootShellEntryUrl: string): string {
  if (!rootShellEntryUrl) return ''
  return `<script type="module" src="${rootShellEntryUrl}"></script>`
}

/**
 * Construye los scripts de configuración del shell:
 *  - configLanding.js → inyecta window.cconfig (config del partner)
 *  - window.versionConfig → URL del config.js que SitioVersion5 necesita
 */
function buildShellConfig(spaRootUrl: string, configLandingUrl: string, versionConfigUrl: string): string {
  const configUrl = configLandingUrl || `${spaRootUrl}/configLanding.js`
  const versionUrl = versionConfigUrl || `${spaRootUrl}/config.js`
  const scripts: string[] = []

  if (configUrl) {
    scripts.push(`<script src="${encodeURI(configUrl)}"></script>`)
  }
  if (spaRootUrl) {
    scripts.push(`<script>window.__SPA_ROOT_URL__="${encodeURI(spaRootUrl)}";</script>`)
  }
  if (versionUrl) {
    scripts.push(`<script>window.versionConfig="${encodeURI(versionUrl)}";</script>`)
  }
  return scripts.join('\n    ')
}

/**
 * Ejecuta el SSR completo:
 *  1. Llama a render(url) de entry-server.ts → HTML de Vue + estado Pinia
 *  2. Inyecta todo en el template HTML (placeholders)
 *  3. Retorna un Response con headers de seguridad y cache
 */
async function handleSSR(url: string, env: Env): Promise<Response> {
  // Renderizar la app Vue en el servidor
  const { html: appHtml, state } = await render(url)

  // Serialización segura del estado Pinia: escapar </script> dentro del JSON
  const safeState = state.replace(/</g, '\\u003c')
  const piniaScript = `<script>window.__PINIA_STATE__=${safeState}</script>`

  // Descubrir assets del root shell desde Pages
  const pagesAssets = await discoverPagesAssets(env)

  // Reemplazar cada placeholder del template con su contenido
  const finalHtml = HTML_TEMPLATE
    .replace('<!--app-html-->', appHtml)
    .replace('<!--pinia-state-->', piniaScript)
    .replace('<!--head-tags-->', '')
    .replace('<!--importmap-->', '') // No importmap: el root shell maneja los imports
    .replace('<!--shell-config-->', buildShellConfig(
      env.SPA_ROOT_URL,
      pagesAssets.configLandingUrl || env.CONFIG_LANDING_URL,
      pagesAssets.versionConfigUrl,
    ))
    .replace('<!--root-shell-entry-->', buildRootShellEntryTag(pagesAssets.rootShellEntry))

  // Construir headers: seguridad + cache + content-type
  const headers = new Headers({
    'Content-Type': 'text/html;charset=UTF-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
    ...buildSecurityHeaders(env.SPA_ROOT_URL),
  })

  return new Response(finalHtml, { status: 200, headers })
}

// ── Entry point del Worker ────────────────────────────────────────────────────

export default {
  /**
   * Handler principal del Cloudflare Worker.
   * Cada request HTTP pasa por aquí.
   *
   * Flujo:
   *  1. Si es asset estático → delegar a env.ASSETS (Static Assets binding)
   *  2. Si es SSR → verificar Cache API → si MISS, ejecutar render → cache.put
   *  3. Si no es HTML ni asset → delegar a ASSETS como fallback
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname === '/landing-ssr' || pathname === '/landing-ssr/') {
      return Response.redirect(new URL(`/${url.search}`, url.origin).toString(), 302)
    }

    // ── 0. Service Worker cleanup ─────────────────────────────────────────
    // Servir un SW que se auto-limpia para evitar que un SW cacheado del
    // deployment anterior de Pages intercepte requests de navegación y
    // sirva HTML viejo en vez del HTML SSR del Worker.
    if (pathname === '/sw.js' || pathname === '/registerSW.js') {
      const cleanupScript = pathname === '/sw.js'
        ? `self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});`
        : `// noop - SW registration disabled in SSR mode`
      return new Response(cleanupScript, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    }

    const redirectTarget = resolveSpaRedirectTarget(env.SPA_ROOT_URL, url)
    if (redirectTarget) {
      return Response.redirect(redirectTarget, 302)
    }

    // ── 1. Assets estáticos: delegar al binding ASSETS ──────────────────────
    // Los assets del build (JS, CSS, imágenes, fonts) los sirve Cloudflare
    // directamente desde Static Assets con cache inmutable automático.
    if (isStaticAsset(pathname)) {
      let assetResponse = await env.ASSETS.fetch(request)

      // Si el asset no existe en landing-ssr, intentar desde Pages (root shell).
      // Esto permite servir chunks de SitioVersion5, configLanding.js, config.js, etc.
      if (!assetResponse.ok && env.PAGES_ORIGIN) {
        try {
          const pagesUrl = new URL(pathname, env.PAGES_ORIGIN).href
          const pagesResponse = await fetch(pagesUrl)
          if (pagesResponse.ok) {
            assetResponse = pagesResponse
          }
        } catch {
          // Pages fetch falló, devolver el 404 original de ASSETS
        }
      }

      // Si el asset no existe en ningún lado, devolver el 404
      if (!assetResponse.ok) return assetResponse

      // Clonar respuesta para agregar cache-control immutable (assets con hash)
      const headers = new Headers(assetResponse.headers)
      if (pathname.startsWith('/assets/')) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      }
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers,
      })
    }

    // ── 2. HTML requests ─────────────────────────────────────────────────────
    if (shouldSSR(request, pathname)) {
      // Construir cache key con versión para invalidar cache en deploys
      const cacheKey = new Request(new URL(`${pathname}?_cv=${CACHE_VERSION}`, url.origin).href, {
        method: 'GET',
        headers: request.headers,
      })

      // Consultar Cache API de Cloudflare (capa edge, no browser cache)
      const cache = caches.default
      let cachedResponse = await cache.match(cacheKey)

      if (cachedResponse) {
        return cachedResponse
      }

      // ── 2a. Rutas de landing → SSR completo ──────────────────────────────
      // Solo renderizamos SSR para rutas que landing-ssr maneja (/, /home).
      // Para las demás rutas (ej. /deportes), servimos el HTML template sin
      // contenido SSR para que mini-shell monte SitioVersion5 directamente,
      // evitando un flash de HomeView antes de la transición.
      if (isLandingPath(pathname)) {
        try {
          const ssrResponse = await handleSSR(pathname, env)

          // Guardar en cache de forma no bloqueante (ctx.waitUntil)
          ctx.waitUntil(cache.put(cacheKey, ssrResponse.clone()))

          return ssrResponse
        } catch (error) {
          console.error('[Worker SSR] Render error:', error)

          const fallback = await env.ASSETS.fetch(
            new Request(new URL('/index.html', url.origin).href),
          )
          if (fallback.ok) {
            const headers = new Headers(fallback.headers)
            headers.set('Content-Type', 'text/html;charset=UTF-8')
            headers.set('Cache-Control', 'no-cache')
            return new Response(fallback.body, { status: 200, headers })
          }

          return new Response('Internal Server Error', { status: 500 })
        }
      }

      // ── 2b. Rutas no-landing → proxy root shell HTML desde Pages ──────
      // Para /deportes y demás rutas, servimos el HTML del root shell
      // (desplegado en Pages). El root shell tiene su propia configuración
      // single-spa que monta SitioVersion5 correctamente con todos sus
      // chunks, dependencias y CSS.
      // El chunk de SitioVersion5 del root shell NO es standalone: cuando
      // se carga vía importmap con mini-shell, arrastra el entry point del
      // root shell causando conflictos. Por eso servimos el HTML completo.
      if (env.PAGES_ORIGIN) {
        try {
          const pagesIndexResponse = await fetch(`${env.PAGES_ORIGIN}/index.html`)
          if (pagesIndexResponse.ok) {
            const pagesHtml = await pagesIndexResponse.text()
            const headers = new Headers({
              'Content-Type': 'text/html;charset=UTF-8',
              'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
            })
            const spaResponse = new Response(pagesHtml, { status: 200, headers })
            ctx.waitUntil(cache.put(cacheKey, spaResponse.clone()))
            return spaResponse
          }
          console.error('[Worker] Pages returned non-ok for /index.html:', pagesIndexResponse.status)
        } catch (error) {
          console.error('[Worker] Error fetching root shell HTML from Pages:', error)
        }
      }

      // Fallback: servir landing-ssr template si Pages no disponible
      try {
        const pagesAssets = await discoverPagesAssets(env)
        const spaHtml = HTML_TEMPLATE
          .replace('<!--app-html-->', '')
          .replace('<!--pinia-state-->', '')
          .replace('<!--head-tags-->', '')
          .replace('<!--importmap-->', '')
          .replace('<!--shell-config-->', buildShellConfig(
            env.SPA_ROOT_URL,
            pagesAssets.configLandingUrl || env.CONFIG_LANDING_URL,
            pagesAssets.versionConfigUrl,
          ))
          .replace('<!--root-shell-entry-->', buildRootShellEntryTag(pagesAssets.rootShellEntry))

        const headers = new Headers({
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-cache',
          ...buildSecurityHeaders(env.SPA_ROOT_URL),
        })

        return new Response(spaHtml, { status: 200, headers })
      } catch (error) {
        console.error('[Worker SPA shell] Error building fallback template:', error)
        return new Response('Internal Server Error', { status: 500 })
      }
    }

    // ── 3. Fallback: cualquier otra request → delegar a ASSETS (+ Pages) ────
    // Esto cubre casos como robots.txt, sitemap.xml, favicon, etc.
    const fallbackResponse = await env.ASSETS.fetch(request)
    if (!fallbackResponse.ok && env.PAGES_ORIGIN) {
      try {
        const pagesUrl = new URL(pathname, env.PAGES_ORIGIN).href
        const pagesResponse = await fetch(pagesUrl)
        if (pagesResponse.ok) return pagesResponse
      } catch {
        // ignore
      }
    }
    return fallbackResponse
  },
} satisfies ExportedHandler<Env>

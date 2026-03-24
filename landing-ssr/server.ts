import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { type Request, type Response } from 'express'
import compression from 'compression'
import type { ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT ?? 3000

// ── Variables de entorno para integración cross-micro ─────────────────────────
const SPA_ROOT_URL = process.env.SPA_ROOT_URL ?? ''        // e.g. https://sitiousuarioonline-spa.onrender.com
const CONFIG_LANDING_URL = process.env.CONFIG_LANDING_URL ?? '' // URL del configLanding.js en el CDN/SPA root

// ── Discovery de SitioVersion5 bundle (hash dinámico) ─────────────────────────
let sitioVersion5BundleUrl = ''
let lastDiscoveryAttemptAt = 0
const DISCOVERY_RETRY_INTERVAL_MS = 30_000

type ViteManifestEntry = {
  file: string
}

function normalizeAssetUrl(baseUrl: string, maybeRelativePath: string): string {
  if (!maybeRelativePath) return ''
  if (/^https?:\/\//.test(maybeRelativePath)) return maybeRelativePath
  const cleanBase = baseUrl.replace(/\/$/, '')
  const cleanPath = maybeRelativePath.replace(/^\//, '')
  return `${cleanBase}/${cleanPath}`
}

async function fetchJson(url: string): Promise<Record<string, ViteManifestEntry> | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    return await response.json() as Record<string, ViteManifestEntry>
  } catch {
    return null
  }
}

function getSitioEntryFromManifest(manifest: Record<string, ViteManifestEntry>): ViteManifestEntry | undefined {
  return manifest['SitioVersion5/src/main.ts']
    ?? manifest['SitioVersion5/main.ts']
    ?? Object.entries(manifest).find(([key, value]) =>
      key.includes('SitioVersion5') || value?.file?.includes('SitioVersion5'),
    )?.[1]
}

async function discoverSitioFromManifest(): Promise<string> {
  const manifestCandidates = [
    `${SPA_ROOT_URL}/.vite/manifest.json`,
    `${SPA_ROOT_URL}/manifest.json`,
  ]

  for (const manifestUrl of manifestCandidates) {
    const manifest = await fetchJson(manifestUrl)
    if (!manifest) continue

    const sitioEntry = getSitioEntryFromManifest(manifest)
    if (sitioEntry?.file) {
      return normalizeAssetUrl(SPA_ROOT_URL, sitioEntry.file)
    }
  }

  return ''
}

async function discoverSitioFromIndex(): Promise<string> {
  try {
    const response = await fetch(SPA_ROOT_URL)
    if (!response.ok) return ''

    const html = await response.text()
    const match = html.match(/\/assets\/[^"']*SitioVersion5[^"']*\.js/i)
    if (!match?.[0]) return ''

    return normalizeAssetUrl(SPA_ROOT_URL, match[0])
  } catch {
    return ''
  }
}

async function discoverSitioVersion5Bundle(): Promise<void> {
  if (!SPA_ROOT_URL) {
    console.warn('[SSR] SPA_ROOT_URL not set — SitioVersion5 cross-micro disabled')
    return
  }

  lastDiscoveryAttemptAt = Date.now()

  try {
    const fromManifest = await discoverSitioFromManifest()
    if (fromManifest) {
      sitioVersion5BundleUrl = fromManifest
      console.log(`[SSR] Discovered SitioVersion5 bundle from manifest: ${sitioVersion5BundleUrl}`)
      return
    }

    const fromIndex = await discoverSitioFromIndex()
    if (fromIndex) {
      sitioVersion5BundleUrl = fromIndex
      console.warn('[SSR] Manifest not available, discovered SitioVersion5 bundle from index.html')
      return
    }

    sitioVersion5BundleUrl = ''
    console.warn('[SSR] Could not discover SitioVersion5 bundle URL from SPA service')
  } catch (err) {
    console.warn('[SSR] Error discovering SitioVersion5 bundle:', err)
    sitioVersion5BundleUrl = ''
  }
}

async function ensureSitioVersion5BundleDiscovered(): Promise<void> {
  if (sitioVersion5BundleUrl) return

  const now = Date.now()
  if (now - lastDiscoveryAttemptAt < DISCOVERY_RETRY_INTERVAL_MS) return

  await discoverSitioVersion5Bundle()
}

// ── Generación de importmap para SitioVersion5 ────────────────────────────────
function buildImportmap(): string {
  if (!sitioVersion5BundleUrl) return ''

  const importmap = {
    imports: {
      '@my-micro-apps/SitioVersion5': sitioVersion5BundleUrl,
    },
  }
  // Escape < para prevenir XSS en inyección de JSON dentro de script tags
  const safeJson = JSON.stringify(importmap).replace(/</g, '\\u003c')
  return `<script type="importmap">${safeJson}</script>`
}

// ── Shell config: inyecta window.cconfig y window.versionConfig ───────────────
function buildShellConfig(): string {
  const configUrl = CONFIG_LANDING_URL || `${SPA_ROOT_URL}/configLanding.js`
  const versionConfigUrl = `${SPA_ROOT_URL}/config.js`

  // El configLanding.js se carga síncronamente para que mini-shell tenga window.cconfig
  // El config.js define window.versionConfig que SitioVersion5 necesita
  const scripts: string[] = []

  if (configUrl) {
    scripts.push(`<script src="${encodeURI(configUrl)}"></script>`)
  }
  if (SPA_ROOT_URL) {
    scripts.push(`<script>window.versionConfig="${encodeURI(versionConfigUrl)}";</script>`)
  }

  return scripts.join('\n    ')
}

// ── Seguridad: cabeceras HTTP (OWASP) ────────────────────────────────────────
function setSecurityHeaders(res: Response): void {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  )
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${SPA_ROOT_URL}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      `connect-src 'self' ${SPA_ROOT_URL}`,
      "frame-ancestors 'none'",
    ].join('; '),
  )
}

// ── Cache headers para Cloudflare CDN ────────────────────────────────────────
function setCacheHeaders(res: Response, type: 'html' | 'asset'): void {
  if (type === 'asset') {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=3600',
    )
  }
}

async function createServer(): Promise<void> {
  const app = express()
  app.use(compression())

  // Instancia de Vite (solo en desarrollo)
  let viteDevServer: ViteDevServer | null = null

  if (isProd) {
    // ── Producción: servir estáticos de dist/client ─────────────────────────
    // Usar process.cwd() (raíz del proyecto) en lugar de __dirname
    // para evitar paths duplicados cuando server.js compila dentro de dist/
    const clientDist = path.resolve(process.cwd(), 'dist/client')
    app.use(
      '/assets',
      express.static(path.join(clientDist, 'assets'), {
        setHeaders: (res) => setCacheHeaders(res as Response, 'asset'),
      }),
    )
    app.use(express.static(clientDist, { index: false }))
  } else {
    // ── Desarrollo: Vite en middleware mode con HMR ─────────────────────────
    const { createServer: createViteServer } = await import('vite')
    viteDevServer = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(viteDevServer.middlewares)
  }

  // ── SSR handler ─────────────────────────────────────────────────────────────
  app.use('*path', async (req: Request, res: Response) => {
    const url = req.originalUrl
    try {
      if (isProd) {
        await ensureSitioVersion5BundleDiscovered()
      }

      let template: string
      let render: (url: string) => Promise<{ html: string; state: string }>

      if (isProd) {
        const clientDist = path.resolve(process.cwd(), 'dist/client')
        const serverDist = path.resolve(process.cwd(), 'dist/server')
        template = fs.readFileSync(path.join(clientDist, 'index.html'), 'utf-8')
        const serverModule = await import(
          path.join(serverDist, 'entry-server.js')
        )
        render = serverModule.render as typeof render
      } else {
        // Desarrollo: reutilizar la instancia Vite ya creada
        const rawTemplate = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        )
        template = await viteDevServer!.transformIndexHtml(url, rawTemplate)
        const ssrModule = await viteDevServer!.ssrLoadModule('/src/entry-server.ts')
        render = ssrModule.render as typeof render
      }

      const { html: appHtml, state } = await render(url)

      // ── Serialización segura del estado Pinia (escape de </script>) ──────
      const safeState = state.replace(/</g, '\\u003c')
      const piniaScript = `<script>window.__PINIA_STATE__=${safeState}<\/script>`

      const finalHtml = template
        .replace('<!--app-html-->', appHtml)
        .replace('<!--pinia-state-->', piniaScript)
        .replace('<!--head-tags-->', '')
        .replace('<!--importmap-->', buildImportmap())
        .replace('<!--shell-config-->', buildShellConfig())

      setSecurityHeaders(res)
      setCacheHeaders(res, 'html')
      res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml)
    } catch (e) {
      const error = e as Error
      if (viteDevServer) viteDevServer.ssrFixStacktrace(error)
      console.error('SSR render error:', error.stack)
      res.status(500).send('Internal Server Error')
    }
  })

  // ── Discovery de assets cross-micro al iniciar ──────────────────────────────
  if (isProd) {
    await discoverSitioVersion5Bundle()
  }

  app.listen(Number(port), () => {
    console.log(`PaniPlay SSR server running at http://localhost:${port}`)
    console.log(`Mode: ${isProd ? 'production' : 'development'}`)
    if (sitioVersion5BundleUrl) {
      console.log(`SitioVersion5 bundle: ${sitioVersion5BundleUrl}`)
    }
  })
}

createServer().catch(console.error)

# Arquitectura SSR — landing-ssr

> **Última actualización:** Marzo 2026
> **Estado:** Producción — `sitiousuarioonline.com`

---

## Tabla de Contenidos

1. [¿Qué es SSR nativo en Vue 3?](#qué-es-ssr-nativo-en-vue-3)
2. [Flujo de una solicitud SSR](#flujo-de-una-solicitud-ssr)
3. [Entry Points](#entry-points)
4. [Hydration (Hidratación)](#hydration-hidratación)
5. [Factory Pattern — app.ts](#factory-pattern--appts)
6. [Router SSR-aware](#router-ssr-aware)
7. [Serialización segura del estado Pinia](#serialización-segura-del-estado-pinia)
8. [Ciclo de vida en SSR](#ciclo-de-vida-en-ssr)
9. [Worker vs Server — Entornos de ejecución](#worker-vs-server--entornos-de-ejecución)
10. [Discovery de Assets y Configuración](#discovery-de-assets-y-configuración)
11. [Build Pipeline](#build-pipeline)
12. [Estructura de archivos — Inventario completo](#estructura-de-archivos--inventario-completo)

---

## ¿Qué es SSR nativo en Vue 3?

**Server-Side Rendering (SSR)** genera el HTML completo en el servidor para cada visita, antes de enviarse al navegador. Esto contrasta con CSR (Client-Side Rendering), donde el servidor envía un HTML vacío y el navegador construye la UI con JavaScript.

### Ventajas para una landing de casino

| Factor | CSR | SSR |
|--------|-----|-----|
| SEO | Contenido invisible a crawlers | HTML completo indexable |
| First Contentful Paint | ~2-4s | ~400-800ms |
| Compartir en redes sociales | Meta OG vacíos | Meta tags renderizados |
| Core Web Vitals (LCP) | Bajo | Alto |

---

## Flujo de una solicitud SSR

```
Browser                  Cloudflare Edge           Worker (V8 Isolate)
  │                             │                          │
  │── GET / ──────────────────► │                          │
  │                             │── Cache MISS ──────────► │
  │                             │                          │── shouldSSR() ✓
  │                             │                          │── isLandingPath() ✓
  │                             │                          │── handleSSR('/')
  │                             │                          │   ├─ render('/') [entry-server.ts]
  │                             │                          │   │  ├─ createApp()
  │                             │                          │   │  ├─ router.push('/')
  │                             │                          │   │  ├─ renderToString(app)
  │                             │                          │   │  └─ pinia.state → JSON
  │                             │                          │   ├─ discoverPagesAssets()
  │                             │                          │   │  ├─ fetch manifest.json → rootShellEntry
  │                             │                          │   │  ├─ fetch HTML de Pages
  │                             │                          │   │  └─ regex → configLandingUrl + versionConfigUrl
  │                             │                          │   ├─ buildShellConfig(spaRoot, configLanding, versionConfig)
  │                             │                          │   ├─ buildRootShellEntryTag(rootShellEntry)
  │                             │                          │   └─ HTML_TEMPLATE.replace(placeholders)
  │                             │◄── HTML + headers OWASP ─│
  │                             │   cache.put(s-maxage=1h) │
  │◄── HTML completo ───────────│                          │
  │── Parsea HTML (contenido visible inmediato)            │
  │── configLanding.js carga window.cconfig (CDN)          │
  │── entry-client.ts hidrata Vue                          │
  │── Root shell entry arranca (single-spa + theme)        │
  │── App interactiva ✅                                    │
```

---

## Entry Points

El proyecto tiene **5 entry points**, cada uno para un contexto de ejecución específico:

### `src/entry-server.ts` — Renderizado en servidor

Se ejecuta dentro del Worker de Cloudflare (V8 isolate) por cada request SSR. Exporta `render(url)`:

```typescript
export async function render(url: string) {
  const { app, router, pinia } = createApp()  // instancia fresca por request
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)       // HTML completo de Vue
  const state = JSON.stringify(pinia.state.value)
  return { html, state }
}
```

**Importante**: `createApp()` crea una instancia fresca por cada request. Un singleton en SSR causaría contaminación de estado entre usuarios.

### `src/entry-client.ts` — Hidratación en browser

Se ejecuta en el navegador cuando el HTML SSR ya fue renderizado por el Worker. Solo hidrata en rutas de landing (`/`, `/home`, `/landing-ssr`):

```typescript
if (!isSingleSpa && isLandingRoute) {
  const { app, router, pinia } = createApp()
  pinia.state.value = window.__PINIA_STATE__   // restaura estado del servidor
  window.__LANDING_SSR_HYDRATED__ = true       // flag para ghost app del root shell
  router.isReady().then(() => app.mount('#app'))
}
```

**El flag `__LANDING_SSR_HYDRATED__`** es crítico: le dice al root shell que landing-ssr ya está montada y que debe usar un ghost app (show/hide) en vez de re-montar Vue.

### `src/entry-spa.ts` — Microfrontend single-spa

Entry point para cuando landing-ssr corre como microfrontend dentro del root shell (no desde HTML SSR). Usa `createApp` (no `createSSRApp`) porque no hay HTML pre-renderizado que hidratar:

- **Router base dinámico**: `/landing-ssr` o `/` según la URL actual
- **Pinia fresca** por cada mount
- **Limpieza en unmount**: elimina estilos inyectados por Vite
- **Delegación de rutas externas**: Vue Router → `navigateToUrl()` de single-spa

### `src/mini-shell.ts` — Orquestador SSR standalone

Orquestador single-spa mínimo que solo vive en el contexto SSR standalone (cuando el Worker sirve el HTML). **No se ejecuta dentro del root shell**.

Responsabilidades:
1. **Ghost app landing-ssr**: Muestra/oculta `#app` sin re-montar Vue
2. **SitioVersion5**: Cuando el usuario navega a una ruta de Sitio (ej. `/deportes`), dispara `window.location.assign()` para recargar con el HTML del root shell. SitioVersion5 no es standalone — su chunk arrastra el entry del root shell.
3. **Espera config**: Polling breve hasta que `window.cconfig` tenga datos

### `worker.ts` — Handler del Cloudflare Worker (producción)

Punto de entrada principal en producción. Flujo de decisión:

```
Request entrante
  ├── /sw.js, /registerSW.js → Service Worker cleanup
  ├── /landing-ssr → Redirect 302 a /
  ├── Asset estático (.js, .css, .png...) → env.ASSETS.fetch() + fallback Pages
  ├── HTML request (Accept: text/html)
  │   ├── isLandingPath (/, /home) → handleSSR() → HTML renderizado
  │   ├── Ruta no-landing (/deportes) → Proxy HTML de Pages (root shell)
  │   └── Fallback → Template sin SSR + shell config
  └── Cualquier otra → env.ASSETS.fetch() + fallback Pages
```

### `server.ts` — Express server (desarrollo)

Servidor Express para desarrollo local. Replica el comportamiento del Worker pero sobre Node.js con hot-reload de Vite.

---

## Hydration (Hidratación)

La hidratación es el proceso por el cual Vue toma el HTML estático generado por el servidor y lo "activa" convirtiendo el DOM en un árbol de componentes interactivos.

### Proceso:
1. El servidor genera HTML + serializa estado Pinia → `window.__PINIA_STATE__`
2. El browser renderiza el HTML (el usuario ya ve la página)
3. El JS carga, Vue **no re-renderiza** — adjunta los event listeners al DOM existente
4. La app queda completamente interactiva

### Condición crítica: No Hydration Mismatch

El HTML del servidor y el HTML que Vue generaría en el cliente **deben ser idénticos**:
- Los stores deben tener los mismos datos en servidor y cliente
- Los composables no deben acceder a `window` durante el rendering (solo en `onMounted`)
- Las fechas deben ser consistentes o no usarse en el render inicial

---

## Factory Pattern — app.ts

```typescript
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createRouter()
  app.use(pinia)
  app.use(router)
  return { app, router, pinia }
}
```

`createSSRApp` es la versión SSR de `createApp`. En producción activa la hidratación; en desarrollo añade advertencias de mismatch.

---

## Router SSR-aware

```typescript
export function createRouter(options?) {
  return _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory()   // Servidor: sin window.location
      : createWebHistory(base), // Cliente: URL del navegador
    routes: [...]
  })
}
```

`import.meta.env.SSR` es `true` cuando Vite compila para el bundle del servidor (`--ssr`).

---

## Serialización segura del estado Pinia

En `worker.ts`, el estado se inyecta escapeando `</script>` para prevenir XSS:

```typescript
const safeState = state.replace(/</g, '\\u003c')
const piniaScript = `<script>window.__PINIA_STATE__=${safeState}</script>`
```

Esto previene que un atacante que controle datos del store inyecte `</script><script>alert(1)` en el HTML.

---

## Ciclo de vida en SSR

| Hook | ¿Ejecuta en servidor? | ¿Ejecuta en cliente? |
|------|-----------------------|----------------------|
| `setup()` | Sí | Sí |
| `onBeforeMount` | No | Sí |
| `onMounted` | No | Sí |
| `onBeforeUnmount` | No | Sí |
| `onUnmounted` | No | Sí |

Los accesos a `window`, `document`, `localStorage` deben estar **únicamente en `onMounted`** o detrás de `if (!import.meta.env.SSR)`.

---

## Worker vs Server — Entornos de ejecución

| Aspecto | `server.ts` (Express) | `worker.ts` (Cloudflare) |
|---------|----------------------|--------------------------|
| Runtime | Node.js 18+ | V8 Isolate (Workers) |
| Uso | Desarrollo local | Producción |
| Hot-reload | Sí (Vite middleware) | No (requiere rebuild) |
| Cache | No | Cache API de Cloudflare (s-maxage=3600) |
| Assets | Vite sirve estáticos | Static Assets binding (`env.ASSETS`) |
| Config Discovery | Variables de entorno | Discovery dinámico desde Pages HTML |
| Comando | `npm run dev` | `npm run dev:worker` |

---

## Discovery de Assets y Configuración

### Problema resuelto

Las variables de entorno en `wrangler.toml` (`CONFIG_LANDING_URL`, etc.) apuntaban a archivos locales genéricos con configuración incorrecta (ecuabet partner=8), mientras que las URLs correctas (ganaplay partner=27) estaban en el HTML del root shell desplegado en Pages.

### Solución: `discoverPagesAssets()`

El Worker descubre las URLs correctas de configuración parseando el HTML del root shell en Pages:

```
1. Fetch manifest.json de Pages → rootShellEntry, sitioVersion5Bundle
2. Fetch HTML de Pages (/) → regex para extraer:
   - src="...configLanding-ganaplay.gt_..."  → configLandingUrl
   - versionConfig = '...config-ganaplay...' → versionConfigUrl
3. Cache en memoria del isolate por 5 minutos
4. Fallback a variables de entorno si Pages no responde
```

### URLs descubiertas (producción actual)

| Variable | URL descubierta |
|----------|----------------|
| `configLandingUrl` | `https://configsfrontend-21622.kxcdn.com/configs/files/configLanding-ganaplay.gt_gt_desktop_es-vv1761327683.js?v=vv1761327683` |
| `versionConfigUrl` | `https://configsfrontend-21622.kxcdn.com/configs/files/config-ganaplay.gt_gt_desktop_es-vv1761327683.js?v=vv1761327683` |
| `rootShellEntry` | `/assets/index-D1ZiVTbz.js` |

### Inyección en el HTML SSR

El Worker inyecta 3 bloques en el template HTML usando placeholders:

| Placeholder | Contenido inyectado | Propósito |
|---|---|---|
| `<!--shell-config-->` | `<script src="configLanding-ganaplay...">` + `window.__SPA_ROOT_URL__` + `window.versionConfig` | Configuración del partner (window.cconfig) y URLs |
| `<!--root-shell-entry-->` | `<script type="module" src="/assets/index-D1ZiVTbz.js">` | Root shell que inicia single-spa, theme, analytics |
| `<!--pinia-state-->` | `<script>window.__PINIA_STATE__={...}</script>` | Estado Pinia serializado para hidratación |
| `<!--app-html-->` | HTML renderizado de Vue | Contenido visible del landing |

---

## Build Pipeline

```
npm run build:worker         (build para Cloudflare Workers)
├── vue-tsc -b               → Verificación de tipos TypeScript
├── vite build --ssrManifest  → dist/client/ (HTML template + JS/CSS hasheados)
└── vite build --ssr          → dist/server/ (entry-server.js para el Worker)

npm run build:spa             (build para single-spa dentro del root shell)
└── vite build --config vite.config.spa.ts → dist/spa/ (landing-ssr.es.js)

npm run deploy                (build + despliegue completo)
└── npm run build:worker && wrangler deploy
```

### Outputs del build

| Build | Archivo | Uso |
|---|---|---|
| `build:client` | `dist/client/assets/index-*.js` | Bundle cliente (entry-client + mini-shell + Vue + single-spa) |
| `build:client` | `dist/client/assets/vendor-vue-*.js` | Vendor chunk (Vue, Pinia, Vue Router) |
| `build:client` | `dist/client/assets/vendor-single-spa-*.js` | Vendor chunk (single-spa) |
| `build:client` | `dist/client/index.html` | Template HTML con placeholders para el Worker |
| `build:ssr` | `dist/server/entry-server.js` | Función `render(url)` consumida por el Worker |
| `build:spa` | `dist/spa/landing-ssr.es.js` | Módulo ES con lifecycle hooks para single-spa |

---

## Estructura de archivos — Inventario completo

### Raíz de landing-ssr

| Archivo | Propósito | Entorno |
|---------|-----------|---------|
| `worker.ts` | Cloudflare Worker SSR — handler principal de producción | Producción |
| `server.ts` | Express SSR — servidor de desarrollo con hot-reload | Desarrollo |
| `wrangler.toml` | Configuración de Cloudflare Workers (rutas, vars, assets) | Producción |
| `vite.config.ts` | Build del cliente SSR + build del servidor | Build |
| `vite.config.spa.ts` | Build SPA para single-spa (root shell) | Build |
| `package.json` | Dependencias y scripts de build/deploy | Todos |
| `tsconfig.json` | Config TypeScript raíz | Build |
| `tsconfig.app.json` | TS config para código cliente | Build |
| `tsconfig.node.json` | TS config para código Node/build | Build |
| `tsconfig.server.json` | TS config para server.ts (Express) | Build |
| `tsconfig.worker.json` | TS config para worker.ts (Cloudflare) | Build |
| `postcss.config.js` | PostCSS + Tailwind CSS | Build |
| `index.html` | Template HTML con placeholders SSR | Build/Runtime |

### src/ — Código fuente

```
src/
├── app.ts                          Factory: createApp() — instancia fresca Vue + Pinia + Router
├── App.vue                         Componente raíz: <RouterView /> con Suspense
├── entry-server.ts                 SSR: render(url) → { html, state }
├── entry-client.ts                 Hidratación browser + flag __LANDING_SSR_HYDRATED__
├── entry-spa.ts                    single-spa lifecycle: bootstrap/mount/unmount
├── mini-shell.ts                   Orquestador single-spa para SSR standalone
│
├── components/
│   ├── atoms/                      Componentes base sin estado
│   │   ├── BaseBadge.vue           Badge con color configurable
│   │   ├── BaseButton.vue          Botón con variantes (primary/secondary/ghost/danger)
│   │   └── BaseImage.vue           Imagen lazy-loaded con aspect-ratio
│   ├── molecules/                  Componentes compuestos
│   │   ├── GameCard.vue            Card de juego con badge, imagen, RTP, CTA
│   │   ├── NavItem.vue             Enlace de navegación con integración single-spa
│   │   └── PromoCard.vue           Card de promoción con CTA
│   └── organisms/                  Componentes complejos con lógica
│       ├── AppHeader.vue           Header sticky con nav desktop/móvil + auth buttons
│       ├── AppFooter.vue           Footer con branding, links legales, redes sociales
│       ├── GameCarousel.vue        Carrusel de juegos con autoplay (useCarousel)
│       ├── HeroBanner.vue          Banner principal con CTA
│       └── PromoCarousel.vue       Carrusel de promociones
│
├── composables/
│   └── useCarousel.ts              Composable SSR-safe: carrusel con autoplay (solo onMounted)
│
├── interfaces/
│   ├── game.interface.ts           IGame, GameCategory, GameBadge
│   ├── promotion.interface.ts      IPromotion, PromotionType
│   ├── navigation.interface.ts     INavLink
│   └── carousel.interface.ts       ICarouselOptions
│
├── router/
│   └── index.ts                    Factory createRouter() — history SSR-aware, base dinámico
│
├── stores/
│   ├── games.store.ts              Juegos mock + filtros por categoría
│   ├── promotions.store.ts         Promociones mock + filtros por expiración
│   └── navigation.store.ts         Links de navegación + menú móvil
│
├── styles/
│   └── main.css                    Tailwind CSS + utilidades custom
│
├── templates/
│   └── DefaultLayout.vue           Layout: AppHeader → <slot> → AppFooter
│
├── types/
│   └── micro-apps.d.ts             Declaración de módulo @my-micro-apps/SitioVersion5
│
├── views/
│   └── HomeView.vue                Página principal: Hero + Juegos + Promos + Features
│
└── assets/
    └── hero.png                    Imagen del hero banner
```

### public/ — Archivos estáticos

| Archivo | Propósito |
|---------|-----------|
| `favicon.svg` | Favicon del sitio |
| `icons.svg` | Sprite de iconos SVG |

# Arquitectura SSR — PaniPlay

## ¿Qué es SSR nativo en Vue 3?

**Server-Side Rendering (SSR)** significa que el HTML completo se genera en el servidor Node.js para cada visita, antes de enviarse al navegador. Esto contrasta con CSR (Client-Side Rendering), donde el servidor envía un HTML vacío y el navegador construye la UI con JavaScript.

### Ventajas para una landing de casino

| Factor | CSR | SSR |
|--------|-----|-----|
| SEO | ❌ Contenido invisible a crawlers | ✅ HTML completo indexable |
| First Contentful Paint | ~2-4s | ~400-800ms |
| Compartir en redes sociales | ❌ Meta OG vacíos | ✅ Meta tags renderizados |
| Core Web Vitals (LCP) | Bajo | Alto |

---

## Flujo de una solicitud SSR

```
Browser                   Cloudflare CDN            Render (Express)
  │                             │                          │
  │── GET / ──────────────────► │                          │
  │                             │── MISS → GET / ────────► │
  │                             │                          │── createApp()
  │                             │                          │── router.push('/')
  │                             │                          │── stores.load()
  │                             │                          │── renderToString(app)
  │                             │                          │── inject state
  │                             │◄── HTML completo ────────│
  │◄── HTML completo ───────────│                          │
  │                             │   (cachea 24h en CDN)    │
  │── Parsea HTML               │                          │
  │── Descarga JS/CSS           │◄── assets (1 año) ───────│
  │── Vue hydrate()             │                          │
  │   (reconcilia DOM)          │                          │
  │── App interactiva ✅         │                          │
```

---

## Los dos entry points

### `src/entry-server.ts`

Se ejecuta en Node.js por cada request. Exporta la función `render(url)`:

```typescript
export async function render(url: string) {
  const { app, router, pinia } = createApp()  // instancia fresca por request
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)       // HTML completo
  const state = JSON.stringify(pinia.state.value)
  return { html, state }
}
```

**Importante**: `createApp()` debe crearse por cada request. Nunca usar un singleton en SSR, ya que causaría contaminación de estado entre usuarios.

### `src/entry-client.ts`

Se ejecuta en el navegador una sola vez:

```typescript
import '@/styles/main.css'
const { app, router, pinia } = createApp()

// Restaurar estado del servidor (hidratación)
const initialState = window.__PINIA_STATE__
if (initialState) pinia.state.value = initialState

// Vue reconcilia el DOM existente (no re-renderiza desde cero)
router.isReady().then(() => app.mount('#app'))
```

---

## Hydration (Hidratación)

La hidratación es el proceso por el cual Vue toma el HTML estático generado por el servidor y lo "activa" convirtiendo el DOM en un árbol de componentes interactivos.

### Proceso:
1. El servidor genera HTML + serializa estado Pinia → `window.__PINIA_STATE__`
2. El browser renderiza el HTML (el usuario ya ve la página)
3. El JS carga, Vue **no re-renderiza** — simplemente adjunta los event listeners al DOM existente
4. La app queda completamente interactiva

### Condición crítica: **No Hydration Mismatch**

El HTML del servidor y el HTML que Vue generaría en el cliente **deben ser idénticos**. Para esto:

- Los stores tienen los mismos datos en servidor y cliente
- Los composables no acceden a `window` durante la rendering (solo en `onMounted`)
- Las fechas (`new Date()`) deben ser consistentes o no usarse en el render inicial

---

## `src/app.ts` — Factory pattern

```typescript
export function createApp() {
  const app = createSSRApp(App)  // ← createSSRApp, no createApp
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
export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory()   // Servidor: sin window.location
      : createWebHistory(),     // Cliente: URL del navegador
    routes: [...]
  })
}
```

`import.meta.env.SSR` es `true` cuando Vite compila para el bundle del servidor (flag `--ssr`).

---

## Serialización segura del estado Pinia

En `server.ts`, el estado se inyecta escapeando `</script>` para prevenir XSS:

```typescript
const safeState = state.replace(/</g, '\\u003c')
const piniaScript = `<script>window.__PINIA_STATE__=${safeState}</script>`
```

Esto previene que un atacante que controle datos del store pueda inyectar `</script><script>alert(1)` en el HTML.

---

## Ciclo de vida en SSR

| Hook | ¿Ejecuta en servidor? | ¿Ejecuta en cliente? |
|------|-----------------------|----------------------|
| `setup()` | ✅ | ✅ |
| `onBeforeMount` | ❌ | ✅ |
| `onMounted` | ❌ | ✅ |
| `onBeforeUnmount` | ❌ | ✅ |
| `onUnmounted` | ❌ | ✅ |

Los accesos a `window`, `document`, `localStorage` deben estar **únicamente en `onMounted`** o detrás de `if (!import.meta.env.SSR)`.

---

## Build Pipeline

```
npm run build
├── vue-tsc -b                          → Verificación de tipos TS
├── vite build --ssrManifest            → dist/client/ (JS, CSS, imágenes)
│   └── ssr-manifest.json               → mapeo módulo → chunk
├── vite build --ssr entry-server.ts    → dist/server/ (CJS bundle)
└── tsc -p tsconfig.server.json         → dist/server.js (Express compilado)
```

En producción, `dist/server.js` importa `dist/server/entry-server.js` para el renderizado.

---

## Integración Cross-Micro (mini-shell)

El build del cliente incluye `mini-shell.ts` que arranca un orquestador single-spa mínimo.
Esto permite transiciones SPA hacia SitioVersion5 sin recarga de página.

Ver [SSR_SPA_INTEGRATION.md](./SSR_SPA_INTEGRATION.md) para la documentación completa del flujo, importmap dinámico, y validación de la prueba.

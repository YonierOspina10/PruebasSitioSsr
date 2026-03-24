# Integración SSR + SPA Cross-Micro — landing-ssr ↔ SitioVersion5

## Objetivo

Permitir que `landing-ssr`, desplegado como servicio SSR standalone en Render, funcione como punto de entrada con rendering del servidor (SEO + fast FCP), y al hacer clic en una ruta de SitioVersion5 (ej: `/deportes`), transicione a modo SPA **sin recarga de página**.

---

## Flujo completo

```
[1] Browser → GET /landing-ssr (o /)
         → Express SSR server
         → response: HTML landing completo (SSR)
              + script de hidratación Vue (entry-client.ts)
              + importmap dinámico con URL de SitioVersion5
              + mini-shell single-spa inline

[2] Browser parsea HTML → usuario ve contenido INMEDIATO (SSR)

[3] entry-client.ts hidrata #app   ← Vue detecta DOM existente, no re-renderiza
    mini-shell.ts arranca          ← single-spa registra landing-ssr + sitios

[4] Usuario clic "Deportes"
         → NavItem.vue → history.pushState('/deportes')
         → single-spa intercepta
         → unmount landing-ssr (oculta #app)
         → mount SitioVersion5 (en #sitio-root)
         → SPA, sin recarga

[5] Usuario clic "Atrás" (popstate)
         → single-spa intercepta
         → unmount SitioVersion5
         → mount landing-ssr (muestra #app)
         → sin recarga
```

---

## Arquitectura de componentes

```
landing-ssr/
├── index.html              ← Template SSR con placeholders
│   ├── <!--importmap-->    ← Inyectado por server.ts (URL hasheada de SitioVersion5)
│   ├── <!--shell-config--> ← Inyectado por server.ts (window.cconfig + versionConfig)
│   ├── <!--app-html-->     ← Contenido SSR de Vue
│   ├── <!--pinia-state-->  ← Estado serializado de Pinia
│   ├── #app                ← Contenedor de landing-ssr (hidratado por Vue)
│   └── #sitio-root         ← Contenedor de SitioVersion5 (montado por single-spa)
│
├── src/
│   ├── entry-client.ts     ← Hidratación SSR standalone (createSSRApp → mount #app)
│   ├── entry-server.ts     ← Render del servidor (renderToString → HTML + state)
│   ├── entry-spa.ts        ← Entry para single-spa en monorepo root (createSSRApp)
│   ├── mini-shell.ts       ← Orquestador single-spa para contexto SSR standalone
│   ├── app.ts              ← Factory de la app Vue (createSSRApp)
│   └── types/
│       └── micro-apps.d.ts ← Declaraciones TypeScript para módulos externos
│
└── server.ts               ← Express SSR + inyección de importmap + shelConfig
```

---

## Componentes clave

### mini-shell.ts

Orquestador single-spa mínimo que **solo vive en el contexto SSR standalone**. No se ejecuta dentro del monorepo root (allí `src/main.js` es el shell).

Responsabilidades:
1. **Ghost app landing-ssr**: No re-monta Vue. Solo muestra/oculta `#app` (el DOM ya fue hidratado por `entry-client.ts`).
2. **SitioVersion5 lazy-loaded**: Registra SitioVersion5 como app single-spa que se carga via importmap dinámico cuando la ruta cambia a una ruta de Sitio (ej: `/deportes`).
3. **Arranque de single-spa**: Llama a `start({ urlRerouteOnly: true })` después de verificar que `window.cconfig` está disponible.

### entry-spa.ts (createSSRApp)

Usa `createSSRApp` en lugar de `createApp` para que Vue, al montarse sobre DOM pre-renderizado por SSR, haga **hidratación** en vez de destruir y re-renderizar. Cuando se monta sobre un `div` vacío (contexto monorepo root), simplemente renderiza normalmente.

### server.ts — Inyección dinámica

El servidor Express inyecta tres bloques adicionales:

| Placeholder | Contenido | Propósito |
|---|---|---|
| `<!--importmap-->` | `<script type="importmap">{"imports":{"@my-micro-apps/SitioVersion5":"URL"}}` | Permite a mini-shell hacer `import('@my-micro-apps/SitioVersion5')` en runtime |
| `<!--shell-config-->` | `<script src="configLanding.js">` + `window.versionConfig` | Provee `window.cconfig` y la URL del config.js para SitioVersion5 |
| `<!--pinia-state-->` | `<script>window.__PINIA_STATE__=...` | Estado serializado de Pinia para hidratación |

### Discovery de SitioVersion5 Bundle

En producción, el servidor SSR obtiene la URL hasheada del bundle de SitioVersion5 desde el manifest del SPA root:

```
GET {SPA_ROOT_URL}/.vite/manifest.json
→ Busca entry SitioVersion5
→ Construye URL completa: {SPA_ROOT_URL}/{file}
→ Inyecta en importmap
```

Esto sucede una vez al iniciar el servidor (startup), no por cada request.

---

## Variables de entorno (Servicio SSR)

| Variable | Requerida | Ejemplo | Descripción |
|---|---|---|---|
| `NODE_ENV` | Sí | `production` | Modo de ejecución |
| `PORT` | No | `3000` | Puerto del servidor Express |
| `SPA_ROOT_URL` | Sí* | `https://sitiousuarioonline-spa.onrender.com` | URL del servicio SPA root (para importmap y config) |
| `CONFIG_LANDING_URL` | No | `https://cdn.example.com/configLanding.js` | URL del configLanding.js (default: `{SPA_ROOT_URL}/configLanding.js`) |

*Sin `SPA_ROOT_URL`, la navegación cross-micro a SitioVersion5 queda deshabilitada. SSR puro sigue funcionando.

---

## Flujo de navegación: NavItem.vue → single-spa

```
NavItem.vue
  └── @click="navigateToSpa($event, '/deportes')"
        ├── event.preventDefault()
        ├── window.history.pushState(null, '', '/deportes')
        └── window.dispatchEvent(new PopStateEvent('popstate'))
              │
              └── single-spa intercepta (v6 parchea pushState)
                    ├── unmount 'landing-ssr' → #app.style.display = 'none'
                    └── mount 'sitios' → import('@my-micro-apps/SitioVersion5')
                           → monta en #sitio-root
                           → SPA sin recarga
```

---

## Build Pipeline

```bash
# Build completo SSR (para servicio standalone en Render)
npm run build
# → vue-tsc -b                              (type-check)
# → vite build --ssrManifest                 (client: entry-client + mini-shell → dist/client)
# → vite build --ssr entry-server.ts         (server: entry-server → dist/server)
# → tsc -p tsconfig.server.json             (node: server.ts → dist/server.js)

# Build SPA para monorepo root
npm run build:spa
# → vite build --config vite.config.spa.ts   (lib: landing-ssr.js + mini-shell.js → dist/spa)
```

### Outputs

| Build | Archivo | Uso |
|---|---|---|
| `build:client` | `dist/client/assets/index-*.js` | Bundle unificado (entry-client + mini-shell + single-spa) |
| `build:client` | `dist/client/index.html` | Template con placeholders para server.ts |
| `build:ssr` | `dist/server/entry-server.js` | Función `render(url)` para SSR en Express |
| `build:node` | `dist/server.js` | Servidor Express compilado |
| `build:spa` | `dist/spa/landing-ssr.js` | Módulo SPA para single-spa en monorepo root |
| `build:spa` | `dist/spa/mini-shell.js` | Módulo mini-shell (solo para referencia, no usado directamente) |

---

## Validación de la prueba

Con los cambios implementados, el comportamiento verificable en Render es:

1. **SSR funciona**: `GET https://sitiousuarioonline-landing-ssr.onrender.com` → devuelve HTML con contenido real (verificar en "View Source" o Network → response body)
2. **Hidratación sin flash**: JavaScript carga, Vue hidrata sin destello. El contenido ya está visible antes de que JS termine.
3. **Transición SPA**: Clic en "Deportes" → URL cambia a `/deportes` → SitioVersion5 monta → sin recarga (verificar en Network: no hay request de documento nuevo).
4. **Navegación atrás**: Botón atrás → URL vuelve a `/` → landing vuelve a aparecer → sin recarga.

---

## Lo que NO cambia

| Archivo | Razón |
|---|---|
| `entry-client.ts` | Ya hidrata correctamente usando `createSSRApp` desde `app.ts` |
| `app.ts` | Ya usa `createSSRApp`. Es la base correcta. |
| `NavItem.vue` | `pushState` + `PopStateEvent` ya es el mecanismo correcto para single-spa |
| `entry-server.ts` | Pipeline `render()` no cambia |
| `src/main.js` (root) | El root del monorepo no se toca. El mini-shell es independiente |
| `navigation.store.ts` | `/deportes` ya está marcado como `isExternal: true` |

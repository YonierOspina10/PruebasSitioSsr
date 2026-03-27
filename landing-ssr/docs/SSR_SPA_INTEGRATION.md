# Integración SSR + SPA — landing-ssr ↔ SitioVersion5

> **Última actualización:** Marzo 2026
> **Estado:** Producción — `sitiousuarioonline.com`

---

## Objetivo

Permitir que `landing-ssr`, desplegado como Worker SSR en Cloudflare, funcione como punto de entrada con rendering del servidor (SEO + fast FCP), y que al navegar a rutas de SitioVersion5 (ej: `/deportes`), la transición ocurra de manera óptima.

---

## Flujo completo — Primer acceso a `/`

```
[1] Browser → GET /
         → Cloudflare Edge → Cache MISS → Worker SSR
         → response: HTML completo (SSR)
              + <script src="configLanding-ganaplay..."> (CDN)
              + <script>window.versionConfig="config-ganaplay..."</script>
              + <script>window.__SPA_ROOT_URL__="https://sitiousuarioonline.com"</script>
              + <script>window.__PINIA_STATE__={...}</script>
              + <div id="app">...HTML renderizado...</div>
              + <script type="module" src="/assets/index-D1Zi...js"> (root shell)

[2] Browser parsea HTML → usuario ve contenido INMEDIATO (SSR)

[3] configLanding-ganaplay.js ejecuta → window.cconfig = { partner: 27, ... }

[4] entry-client.ts hidrata #app
    ├─ createApp() + Pinia restore + Vue mount
    └─ window.__LANDING_SSR_HYDRATED__ = true

[5] Root shell entry (index-D1Zi...js) arranca
    ├─ normalizeLandingSsrPath()
    ├─ handleRouteChange()
    │   └─ window.cconfig ya tiene datos → SKIP config.js load
    ├─ applyGlobalThemeColors() (tema ganaplay)
    ├─ registerApplication('landing-ssr') → GHOST APP (porque __LANDING_SSR_HYDRATED__)
    │   └─ mount: #app.style.display = ''
    │   └─ unmount: #app.style.display = 'none'
    ├─ registerApplication('sitios') → SitioVersion5 (lazy import)
    └─ start() → single-spa activo
```

---

## Flujo — Navegación SPA de `/` a `/deportes`

```
[6] Usuario clic "Deportes" (enlace de landing-ssr)
    ├─ NavItem.vue → history.pushState('/deportes')
    └─ single-spa intercepta el cambio de ruta

[7] single-spa:
    ├─ unmount 'landing-ssr' → #app.style.display = 'none'
    └─ mount 'sitios' → import('@my-micro-apps/SitioVersion5')
           ├─ Chunk main-DoxS2F-7.js carga (lazy, desde Pages)
           ├─ bootstrap() → mount()
           └─ SitioVersion5 renderiza en su contenedor
               → Usa window.cconfig (ganaplay, partner=27) ✅
               → Navbar, configuración, contenido completo ✅

[8] Navegación SPA completada — sin recarga de página
```

---

## Flujo — Hard refresh en `/deportes`

```
[9] Browser → GET /deportes
    → Worker SSR detecta ruta NO landing
    → Section 2b: Proxy HTML de Pages (root shell)
    → response: HTML del root shell (SPA)
         + configLanding-ganaplay.gt_... (CDN)
         + versionConfig = config-ganaplay.gt_... (CDN)

[10] Root shell monta normalmente (sin SSR, sin ghost app)
     ├─ handleRouteChange() → SKIP (cconfig ya poblado)
     ├─ registerApplication('sitios')
     └─ SitioVersion5 monta directamente en /deportes ✅
```

---

## Patrón Ghost App

Cuando el Worker sirve HTML con SSR (rutas `/`, `/home`), `entry-client.ts` hidrata el `#app` y establece `window.__LANDING_SSR_HYDRATED__ = true`.

El root shell detecta este flag y registra `landing-ssr` como **ghost app**:

```javascript
// src/main.js — root shell
if (window.__LANDING_SSR_HYDRATED__) {
    return {
        bootstrap: async () => { /* noop */ },
        mount: async () => {
            document.getElementById('app').style.display = '';
        },
        unmount: async () => {
            document.getElementById('app').style.display = 'none';
        },
    };
}
```

**¿Por qué ghost app?**
- Vue ya está montada e hidratada por `entry-client.ts`
- Destruir y re-montar Vue causaría un flash visible y pérdida de estado
- Show/hide es instantáneo y preserva la instancia hidratada
- Al navegar de vuelta desde `/deportes`, el contenido aparece inmediatamente

---

## Resolución de configuración

### Problema original

El Worker inyectaba URLs de configuración desde variables de entorno en `wrangler.toml`:
- `CONFIG_LANDING_URL = "https://sitiousuarioonline.com/configLanding.js"` → config ecuabet (partner=8, incorrecto)
- `versionConfig` apuntaba a `config.js` → `window.cconfig = {}` (vacío)

### Solución implementada

El Worker descubre las URLs correctas parseando el HTML del root shell desplegado en Pages:

```typescript
// worker.ts — discoverPagesAssets()
const htmlResponse = await fetch(`${pagesOrigin}/`)
const html = await htmlResponse.text()

// Extraer configLanding: <script src="...configLanding-ganaplay...">
const configLandingMatch = html.match(/src=["']([^"']*configLanding[^"']*)["']/)

// Extraer versionConfig: window.versionConfig = '...config-ganaplay...'
const versionConfigMatch = html.match(/versionConfig\s*=\s*["']([^"']+)["']/)
```

### Guard de carga en el root shell

El root shell tiene un guard en `handleRouteChange()` que evita sobreescribir `window.cconfig` si ya está poblado:

```javascript
// src/main.js
if (configScript !== undefined && !(window.cconfig && Object.keys(window.cconfig).length > 1)) {
    loadScript(configScript) // Solo carga si cconfig está vacío o tiene 1 key
} else {
    console.log('[shell] Skipping config.js load — cconfig already populated');
}
```

Esto previene que `config.js` (que contiene `window.cconfig = {}`) sobreescriba la configuración real cargada por `configLanding-ganaplay.js`.

---

## Variables de entorno del Worker

| Variable | Valor actual | Propósito |
|----------|-------------|-----------|
| `SPA_ROOT_URL` | `https://sitiousuarioonline.com` | URL base del dominio |
| `CONFIG_LANDING_URL` | `https://sitiousuarioonline.com/configLanding.js` | **Fallback** — URLs reales se descubren de Pages |
| `PAGES_ORIGIN` | `https://sitiousuarioonline.pages.dev` | Root shell en Cloudflare Pages |
| `SITIO_VERSION5_BUNDLE_URL` | `""` (vacío) | Se descubre dinámicamente del manifest |

---

## Diagrama de componentes

```
sitiousuarioonline.com (Worker SSR)
├── GET / (landing paths)
│   ├── worker.ts → handleSSR()
│   │   ├── entry-server.ts → render()
│   │   ├── discoverPagesAssets() → config URLs del CDN
│   │   └── HTML completo con:
│   │       ├── <!--app-html--> = contenido Vue renderizado
│   │       ├── <!--pinia-state--> = estado serializado
│   │       ├── <!--shell-config--> = configLanding + versionConfig (CDN)
│   │       └── <!--root-shell-entry--> = /assets/index-*.js (root shell)
│   │
│   └── Browser
│       ├── entry-client.ts → hidratación Vue + __LANDING_SSR_HYDRATED__
│       ├── root shell entry → single-spa + ghost app + theme
│       └── mini-shell.ts → (standalone fallback, redirige a Pages si navega a /deportes)
│
└── GET /deportes (non-landing paths)
    ├── worker.ts → Proxy HTML de Pages
    └── Root shell monta SitioVersion5 directamente
```

---

## Archivos clave para la integración

| Archivo | Rol en la integración |
|---------|----------------------|
| `landing-ssr/worker.ts` | SSR handler, discovery de config, proxy a Pages |
| `landing-ssr/src/entry-client.ts` | Hidratación + flag `__LANDING_SSR_HYDRATED__` |
| `landing-ssr/src/mini-shell.ts` | Orquestador standalone (redirige a Pages para SitioVersion5) |
| `src/main.js` | Root shell: ghost app, handleRouteChange guard, single-spa |
| `src/landing-ssr-shim.js` | Shim que re-exporta el build SPA de landing-ssr |
| `vite.config.js` | Alias `@my-micro-apps/landing-ssr` → shim |

---

## Navegación — NavItem.vue → single-spa

```
NavItem.vue
  └── @click → navigateToSpa($event, '/deportes')
        ├── event.preventDefault()
        ├── history.pushState(null, '', '/deportes')
        └── window.dispatchEvent(new PopStateEvent('popstate'))
              │
              └── single-spa intercepta
                    ├── unmount 'landing-ssr' → #app.style.display = 'none'
                    └── mount 'sitios' → import('@my-micro-apps/SitioVersion5')
                           → monta en su contenedor
                           → SPA sin recarga
```

---

## Cache del Worker

| Tipo de request | Cache-Control | Cache Key |
|----------------|---------------|-----------|
| SSR HTML (`/`, `/home`) | `public, s-maxage=3600, stale-while-revalidate=60` | `{pathname}?_cv=v7` |
| Proxy Pages HTML (`/deportes`) | `public, s-maxage=600, stale-while-revalidate=60` | `{pathname}?_cv=v7` |
| Assets `/assets/*` | `public, max-age=31536000, immutable` | Request URL (por defecto) |
| Assets otros | Headers originales | Request URL (por defecto) |

El `CACHE_VERSION` (actualmente `v7`) se incrementa al desplegar cambios que afecten el HTML para invalidar el cache sin purge manual.

---

## Service Worker Cleanup

El Worker intercepta `/sw.js` y `/registerSW.js` para servir un service worker de auto-limpieza:

```javascript
// sw.js — limpia caches de deployments anteriores de Pages
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});
```

Esto evita que un SW cacheado del deployment anterior de Pages intercepte requests de navegación y sirva HTML viejo en vez del HTML SSR del Worker.

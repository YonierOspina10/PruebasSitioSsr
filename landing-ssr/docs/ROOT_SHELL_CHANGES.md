# Modificaciones al Root Shell — src/main.js & vite.config.js

> **Última actualización:** Marzo 2026
> **Archivos modificados:** `src/main.js`, `vite.config.js`, `src/landing-ssr-shim.js`

---

## Resumen

El root shell (`src/main.js`) es el orquestador single-spa que monta los microfrontends. Se realizaron las siguientes modificaciones para integrar `landing-ssr` como microfrontend SSR sin romper la navegación SPA ni la configuración existente.

---

## 1. Ghost App para landing-ssr (src/main.js)

### ¿Qué se cambió?

Se agregó detección de `window.__LANDING_SSR_HYDRATED__` en el registro de `landing-ssr` como aplicación single-spa.

### ¿Por qué?

Cuando el Worker SSR sirve el HTML de `/`, `entry-client.ts` hidrata Vue en `#app` y establece `window.__LANDING_SSR_HYDRATED__ = true`. Si el root shell intentara montar landing-ssr normalmente (re-importando el módulo SPA), destruiría la instancia hidratada causando un flash visible.

### Código añadido

```javascript
// src/main.js
safeRegisterApplication({
    name: 'landing-ssr',
    app: async () => {
        // Si ya se hidrato por SSR, usar ghost app (show/hide)
        if (window.__LANDING_SSR_HYDRATED__) {
            return {
                bootstrap: async () => {
                    console.log('[root-shell] landing-ssr ghost app bootstrapped');
                },
                mount: async () => {
                    const el = document.getElementById('app');
                    if (el) el.style.display = '';
                },
                unmount: async () => {
                    const el = document.getElementById('app');
                    if (el) el.style.display = 'none';
                },
            };
        }
        // Si no hay SSR (navegación directa desde root shell), importar normalmente
        return await import('@my-micro-apps/landing-ssr');
    },
    activeWhen: (location) => {
        if (location.pathname === '/landing-ssr' || location.pathname === '/landing-ssr/') return true;
        if (!isLandingSsrHomeEnabled) return false;
        return routesLanding.some(route => pathToRegexp(route).test(location.pathname));
    },
});
```

### Finalidad

- **SSR context**: Ghost app que solo muestra/oculta `#app` — sin re-montar Vue
- **SPA context**: Importación normal del módulo SPA — monta Vue desde cero
- **Transición suave**: Al navegar de `/deportes` de vuelta a `/`, el contenido SSR aparece instantáneamente

---

## 2. Guard de configuración en handleRouteChange() (src/main.js)

### ¿Qué se cambió?

Se agregó un guard que evita cargar `config.js` vía `window.versionConfig` cuando `window.cconfig` ya está poblado con datos reales.

### ¿Por qué?

En el contexto SSR, el HTML inyecta `configLanding-ganaplay.js` (CDN) que popula `window.cconfig` con la configuración completa (partner=27, menu, menu_, etc.). Luego, cuando el root shell arranca y ejecuta `handleRouteChange()`, intentaba cargar `config.js` (que contiene `window.cconfig = {}`) sobrescribiendo toda la configuración ganaplay.

### Código modificado

```javascript
// src/main.js — ANTES
function handleRouteChange() {
    const path = window.location.pathname;
    let configScript;
    if (path !== '/') {
        configScript = window.versionConfig;
    }
    if (configScript !== undefined) {
        loadScript(configScript);  // Siempre cargaba — sobrescribía cconfig
    }
}

// src/main.js — DESPUÉS
function handleRouteChange() {
    const path = window.location.pathname;
    let configScript;
    if (path !== '/') {
        configScript = window.versionConfig;
    }
    // Guard: solo cargar si cconfig está vacío o tiene 1 sola key
    if (configScript !== undefined && !(window.cconfig && Object.keys(window.cconfig).length > 1)) {
        loadScript(configScript);
    } else if (configScript !== undefined) {
        console.log('[shell] Skipping config.js load — cconfig already populated');
    }
}
```

### Finalidad

Prevenir que `config.js` sobreescriba `window.cconfig` cuando ya contiene la configuración correcta del partner (cargada por `configLanding-ganaplay.js`). La condición `Object.keys(window.cconfig).length > 1` verifica que cconfig tenga contenido real (más que solo una key de inicialización).

---

## 3. Normalización de rutas /landing-ssr (src/main.js)

### ¿Qué se cambió?

Se agregaron funciones para normalizar URLs con prefijo `/landing-ssr/`:
- `normalizeLandingSsrPath()` — aplica `history.replaceState` para limpiar el prefijo
- `getCanonicalShellUrl()` — convierte `/landing-ssr/` → `/landing-ssr` y `/landing-ssr/home` → `/home`
- Patch de `history.pushState` y `history.replaceState` — intercepción transparente

### ¿Por qué?

landing-ssr puede montarse en la ruta `/landing-ssr` (legacy) o en `/` (home). Los links internos del landing podrían generar URLs como `/landing-ssr/home` que necesitan normalizarse a `/home` para que single-spa active la aplicación correcta.

### Finalidad

Garantizar que las URLs con prefijo `/landing-ssr/` se normalicen automáticamente, evitando que single-spa confunda las rutas o monte la aplicación incorrecta.

---

## 4. Intercepción de clicks en enlaces (src/main.js)

### ¿Qué se cambió?

Se agregó un event listener `document.addEventListener('click', handleCanonicalShellNavigation, true)` que intercepta clicks en enlaces `<a>` y los normaliza antes de que single-spa los procese.

### ¿Por qué?

Los componentes de landing-ssr (NavItem.vue) generan enlaces con href absolutos o relativos que podrían incluir el prefijo `/landing-ssr`. La intercepción de clicks garantiza que se aplique la normalización canónica antes de navegar.

### Finalidad

Consistencia en la navegación SPA: todos los clicks en enlaces dentro del landing se normalizan y delegan a `navigateToUrl()` de single-spa.

---

## 5. `minifyInternalExports: false` (vite.config.js)

### ¿Qué se cambió?

Se agregó `minifyInternalExports: false` en la configuración de rollup del root shell.

### ¿Por qué?

Vite/Rollup por defecto renombra exports internos como `bootstrap`, `mount`, `unmount` a nombres minificados (`a`, `b`, `c`). single-spa necesita estos nombres exactos para su lifecycle protocol. Sin esta opción, el dynamic import de SitioVersion5 retornaba un módulo con keys minificadas que single-spa no podía reconocer.

### Código modificado

```javascript
// vite.config.js — rollupOptions
rollupOptions: {
    output: {
        minifyInternalExports: false,  // ← AGREGADO
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
        }
    }
}
```

### Finalidad

Preservar los nombres de exports (`bootstrap`, `mount`, `unmount`) en los chunks de SitioVersion5 para que single-spa pueda montar el microfrontend correctamente vía dynamic import.

---

## 6. Alias de landing-ssr (vite.config.js)

### ¿Qué se cambió?

Se agregó un alias en `resolve.alias` para que el import `@my-micro-apps/landing-ssr` resuelva al shim local.

### Código

```javascript
// vite.config.js
resolve: {
    alias: {
        '@': path.resolve(__dirname, './SitioVersion5/src'),
        '@my-micro-apps/landing-ssr': path.resolve(__dirname, './src/landing-ssr-shim.js'),
    }
}
```

### ¿Por qué?

El root shell necesita importar landing-ssr como módulo ES de single-spa. El shim re-exporta los lifecycle hooks desde el build SPA de landing-ssr:

```javascript
// src/landing-ssr-shim.js
import '../landing-ssr/dist/spa/landing-ssr.css'

export {
  bootstrap,
  mount,
  unmount,
} from '../landing-ssr/dist/spa/landing-ssr.es.js'
```

### Finalidad

Permitir que el root shell importe landing-ssr como microfrontend single-spa usando la convención `@my-micro-apps/landing-ssr`, con CSS incluido.

---

## 7. HTML Fallback Plugin (vite.config.js)

### ¿Qué se cambió?

Se agregó el plugin `landingSsrHtmlFallback()` para desarrollo local.

### Código

```javascript
function landingSsrHtmlFallback() {
    return {
        name: 'landing-ssr-html-fallback',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use((req, _res, next) => {
                const requestUrl = req.url?.split('?')[0] ?? '';
                const accept = req.headers.accept ?? '';
                if (accept.includes('text/html') &&
                    (requestUrl === '/landing-ssr' || requestUrl.startsWith('/landing-ssr/'))) {
                    req.url = '/index.html';
                }
                next();
            });
        },
    };
}
```

### Finalidad

En desarrollo local, cuando se navega a `/landing-ssr`, Vite no sabe que debe servir `index.html`. Este plugin intercepta las requests a rutas de landing-ssr y las redirige al `index.html` del root shell para que single-spa maneje el routing.

---

## Resumen de archivos modificados

| Archivo | Cambios | Impacto |
|---------|---------|---------|
| `src/main.js` | Ghost app, guard de config, normalización de rutas, intercepción de clicks | Integración SSR ↔ SPA sin page reloads |
| `vite.config.js` | `minifyInternalExports: false`, alias landing-ssr, plugin HTML fallback | Build correcto para single-spa + dev local |
| `src/landing-ssr-shim.js` | Nuevo archivo — re-exporta lifecycle hooks de landing-ssr | Puente entre root shell y landing-ssr build SPA |

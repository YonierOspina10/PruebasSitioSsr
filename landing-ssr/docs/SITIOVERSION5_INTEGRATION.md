# Integración de SitioVersion5 con landing-ssr

> **Última actualización:** Marzo 2026

---

## Resumen

SitioVersion5 es la aplicación principal de apuestas deportivas y casino que corre como microfrontend dentro del root shell. Su integración con landing-ssr requirió ajustes en el root shell (no en SitioVersion5 directamente) para que ambos coexistan correctamente.

---

## ¿Qué es SitioVersion5?

- Aplicación Vue 3 con routing completo (deportes, casino, gestión de cuenta, etc.)
- Se monta como microfrontend vía single-spa cuando el usuario navega a rutas como `/deportes`
- Exporta lifecycle hooks: `bootstrap()`, `mount()`, `unmount()`
- Depende de `window.cconfig` para configuración del partner (API URLs, tema, idioma, menú)

---

## Cambios realizados para la integración

### 1. Preservar exports de lifecycle (vite.config.js del root)

**Problema:** Vite/Rollup minificaba los nombres de exports internos (`bootstrap` → `a`, `mount` → `b`), causando que single-spa no pudiera reconocer los lifecycle hooks de SitioVersion5 al cargarlo via `import('@my-micro-apps/SitioVersion5')`.

**Solución:**
```javascript
// vite.config.js (root)
rollupOptions: {
    output: {
        minifyInternalExports: false,  // Preserva bootstrap, mount, unmount
    }
}
```

**Error sin esta opción:**
```
single-spa: application 'sitios' did not export bootstrap, mount, unmount
```

---

### 2. Rutas de SitioVersion5 en el root shell (src/main.js)

SitioVersion5 se registra como app single-spa con una función `activeWhen` que incluye todas sus rutas:

```javascript
registerApplication({
    name: 'sitios',
    app: async () => {
        const mod = await import('@my-micro-apps/SitioVersion5');
        return mod;
    },
    activeWhen: (location) => {
        // NO activar en rutas de landing-ssr
        if (location.pathname.startsWith('/landing-ssr')) return false;
        if (routesLanding.some(route => pathToRegexp(route).test(location.pathname))) return false;
        // Activar en todas las demás rutas (deportes, casino, etc.)
        return routesSite.some(route => pathToRegexp(route).test(location.pathname));
    },
});
```

**Rutas de SitioVersion5 incluyen:** `/deportes`, `/deportes/*`, `/apuestas`, `/new-casino`, `/live-casino`, `/gestion/*`, `/consulta/*`, `/registro`, `/promociones-bonos`, y ~80+ más.

---

### 3. Resolución de configuración para SitioVersion5

**Problema original:** SitioVersion5 depende de `window.cconfig` para funcionar. Cuando el Worker SSR servía el HTML de `/`, inyectaba `configLanding.js` (ecuabet, partner=8) en vez de `configLanding-ganaplay.js` (ganaplay, partner=27). Al navegar a `/deportes` vía SPA, SitioVersion5 se montaba con la configuración incorrecta.

**Error visible:**
```
Cannot read properties of undefined (reading 'menu_')
```

**Causa:** La configuración ecuabet no tiene la propiedad `menu_` que SitioVersion5 espera cuando está configurado como ganaplay.

**Solución (en worker.ts):**
- El Worker descubre las URLs correctas de `configLanding` y `versionConfig` parseando el HTML del root shell en Pages
- Inyecta `configLanding-ganaplay.gt_gt_desktop_es-vv1761327683.js` (CDN) en vez de `configLanding.js`
- Inyecta `config-ganaplay.gt_gt_desktop_es-vv1761327683.js` como `window.versionConfig`

**Solución complementaria (en src/main.js):**
- Guard en `handleRouteChange()` que evita cargar `config.js` si `window.cconfig` ya está poblado

---

### 4. Proxy de Pages para rutas no-landing (worker.ts)

**Problema:** SitioVersion5 no es standalone — su chunk `main-DoxS2F-7.js` incluye dependencias del root shell. Si se cargara directamente via importmap en el contexto mini-shell, arrastraría el entry point del root shell creando dos instancias de single-spa con conflictos.

**Solución:** Para rutas como `/deportes`, el Worker proxifica el HTML completo del root shell desde Pages:

```typescript
// worker.ts — sección 2b
if (env.PAGES_ORIGIN) {
    const pagesIndexResponse = await fetch(`${env.PAGES_ORIGIN}/index.html`)
    if (pagesIndexResponse.ok) {
        const pagesHtml = await pagesIndexResponse.text()
        return new Response(pagesHtml, { status: 200, headers })
    }
}
```

Esto permite que el root shell monte SitioVersion5 con toda su infraestructura correcta (imports, CSS, dependencies).

---

## Flujo de montaje de SitioVersion5

### Desde SSR (navegación SPA / → /deportes)

```
1. Usuario en / (SSR hydrated, ghost app)
2. Clic en "Deportes"
3. single-spa:
   ├─ unmount 'landing-ssr' → #app.style.display = 'none'
   └─ mount 'sitios'
      ├─ import('@my-micro-apps/SitioVersion5')
      ├─ Chunk main-DoxS2F-7.js carga desde Pages
      ├─ bootstrap() → mount()
      └─ SitioVersion5 renderiza con window.cconfig (ganaplay) ✅
```

### Desde hard refresh (/deportes directamente)

```
1. GET /deportes → Worker proxifica HTML de Pages (root shell)
2. Root shell arranca, handleRouteChange() → SKIP (cconfig poblado)
3. single-spa activa 'sitios' para /deportes
4. import('@my-micro-apps/SitioVersion5')
5. SitioVersion5 monta normalmente ✅
```

---

## SitioVersion5 — Archivos relevantes

| Archivo | Propósito |
|---------|-----------|
| `SitioVersion5/src/main.ts` | Entry point con lifecycle exports single-spa |
| `SitioVersion5/vite.config.ts` | Build como módulo dynámico del root shell |
| `SitioVersion5/package.json` | Dependencias (Vue 3, Pinia, single-spa-vue) |

---

## Dependencias de configuración de SitioVersion5

SitioVersion5 necesita estas propiedades en `window.cconfig`:

| Propiedad | Descripción | Ejemplo |
|-----------|-------------|---------|
| `partner` | ID del partner | `27` (ganaplay) |
| `integration` | Nombre de integración | `"ganaplay.gt"` |
| `menu` | Menú principal | `[{...}]` |
| `menu_` | Menú alternativo | `[{...}]` |
| `language.languageDafault` | Idioma por defecto | `"es"` |
| `urlApi.url` | URL de la API | `"https://partnerapi.virtualsoft.bet/..."` |
| `theme_colors_desktop` | Colores del tema desktop | `{primary: "#...", ...}` |
| `mobileL` | Indicador mobile | `""` (desktop) |

**Si estas propiedades no existen en `window.cconfig`, SitioVersion5 lanza errores.** Por eso es crítico que el Worker inyecte la URL correcta del CDN (ganaplay) y no la URL local genérica.

---

## Lo que NO se modificó en SitioVersion5

| Aspecto | Razón |
|---------|-------|
| Código fuente | Todos los cambios fueron en el root shell y worker.ts |
| vite.config.ts | Build estándar — solo rol de módulo dinámico |
| Rutas internas | Las gestiona Vue Router dentro de SitioVersion5 |
| Ciclo de vida single-spa | Ya exporta bootstrap/mount/unmount correctamente |

Los cambios necesarios para la integración fueron todos en la capa de orquestación (root shell + worker), manteniendo SitioVersion5 desacoplado.

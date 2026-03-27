# Documentación — landing-ssr

> **Última actualización:** Marzo 2026
> **Estado:** Producción — `sitiousuarioonline.com`

---

## Índice de documentos

| Documento | Descripción |
|-----------|-------------|
| [SSR_ARCHITECTURE.md](./SSR_ARCHITECTURE.md) | Arquitectura SSR completa: entry points, hidratación, factory pattern, Worker vs Express, discovery de assets, build pipeline, inventario de archivos |
| [SSR_SPA_INTEGRATION.md](./SSR_SPA_INTEGRATION.md) | Integración SSR ↔ SPA: ghost app, mini-shell, navegación cross-micro entre landing-ssr y SitioVersion5, flujo completo de routing |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Guía paso a paso: requisitos, desarrollo local, builds, despliegue a Cloudflare Workers/Pages, verificación post-despliegue, rollback |
| [STORES.md](./STORES.md) | Stores Pinia: games, promotions, navigation. Interfaces TypeScript, estrategia SSR de datos, guía para conectar APIs reales |
| [ROOT_SHELL_CHANGES.md](./ROOT_SHELL_CHANGES.md) | Modificaciones realizadas al root shell (`src/main.js`, `vite.config.js`) para integrar landing-ssr como microfrontend SSR |
| [SITIOVERSION5_INTEGRATION.md](./SITIOVERSION5_INTEGRATION.md) | Cambios en SitioVersion5 y su integración con el nuevo ecosistema SSR/SPA |
| [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) | Plan detallado para migrar la landing legacy a landing-ssr: fases, componentización, pruebas, rollback |

---

## Arquitectura resumida

```
sitiousuarioonline.com (Cloudflare DNS)
        │
        ├── Worker SSR (landing-ssr)
        │   ├── GET / → HTML pre-renderizado (SSR)
        │   ├── GET /home → HTML pre-renderizado (SSR)
        │   ├── GET /deportes → Proxy HTML de Pages (root shell)
        │   └── GET /assets/* → Static Assets + fallback a Pages
        │
        ├── Pages (root shell)
        │   ├── index.html + JS/CSS del orquestador single-spa
        │   ├── SitioVersion5 chunks
        │   └── configLanding/config URLs del CDN
        │
        └── CDN (configsfrontend-21622.kxcdn.com)
            ├── configLanding-ganaplay.gt_gt_desktop_es-vv*.js
            └── config-ganaplay.gt_gt_desktop_es-vv*.js
```

## Comandos esenciales

```powershell
# Desarrollo local SSR (Express + Vite hot-reload)
cd landing-ssr && npm run dev

# Build + deploy a producción
cd landing-ssr && npm run deploy

# Build del root shell
cd .. && npm run build

# Verificar SSR en producción
Invoke-WebRequest -Uri "https://sitiousuarioonline.com/" -UseBasicParsing -Headers @{Accept="text/html"}
```

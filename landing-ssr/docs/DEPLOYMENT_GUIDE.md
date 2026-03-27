# Guía de Despliegue — landing-ssr

> **Dominio de producción:** `sitiousuarioonline.com`
> **Última actualización:** Marzo 2026

---

## Tabla de Contenidos

1. [Arquitectura de Despliegue](#1-arquitectura-de-despliegue)
2. [Requisitos Previos](#2-requisitos-previos)
3. [Estructura de Builds](#3-estructura-de-builds)
4. [Desarrollo Local](#4-desarrollo-local)
5. [Build de Producción](#5-build-de-producción)
6. [Despliegue del Worker SSR](#6-despliegue-del-worker-ssr)
7. [Despliegue del Root Shell (Pages)](#7-despliegue-del-root-shell-pages)
8. [Variables de Entorno](#8-variables-de-entorno)
9. [Verificación Post-Despliegue](#9-verificación-post-despliegue)
10. [Rollback y Troubleshooting](#10-rollback-y-troubleshooting)

---

## 1. Arquitectura de Despliegue

```
                    sitiousuarioonline.com (Cloudflare DNS)
                            │
              ┌─────────────┴─────────────┐
              │    Cloudflare Edge CDN     │
              └────────┬──────────────────┘
                       │
         ┌─────────────┼───────────────┐
         │             │               │
    ┌────▼────┐  ┌─────▼─────┐  ┌─────▼────┐
    │ Worker  │  │  Pages    │  │   CDN    │
    │  SSR    │  │  Root     │  │  Config  │
    │ landing │  │  Shell    │  │  Files   │
    │  -ssr   │  │  (SPA)    │  │          │
    └─────────┘  └───────────┘  └──────────┘
    worker.ts    index.html     configLanding-*.js
    dist/client  dist/ (root)   config-*.js
    dist/server  SitioVersion5
```

### Dos servicios en producción

| Servicio | Plataforma | URL | Responsabilidad |
|----------|-----------|-----|-----------------|
| Worker SSR | Cloudflare Workers | `sitiousuarioonline.com/*` | SSR landing, proxy Pages, assets |
| Root Shell | Cloudflare Pages | `sitiousuarioonline.pages.dev` | Orquestador single-spa, SitioVersion5 |

---

## 2. Requisitos Previos

### Software requerido

| Herramienta | Versión mínima | Verificar con |
|-------------|---------------|--------------|
| Node.js | 18.x+ | `node --version` |
| npm | 9.x+ | `npm --version` |
| Wrangler CLI | 4.x+ | `npx wrangler --version` |

### Cuentas y permisos

- **Cloudflare Account** con acceso al dominio `sitiousuarioonline.com`
- **API Token** con permisos: Workers Scripts Edit, Workers Routes Edit, Zone Read

### Autenticación de Wrangler

```powershell
# Login interactivo (abre navegador)
npx wrangler login

# O usando API Token (CI/CD)
$env:CLOUDFLARE_API_TOKEN = "tu_token"
```

---

## 3. Estructura de Builds

landing-ssr produce **3 builds** independientes:

```
landing-ssr/
├── vite.config.ts         ← build:client + build:ssr
├── vite.config.spa.ts     ← build:spa
├── dist/
│   ├── client/            ← Assets del SSR (HTML template, JS, CSS)
│   │   ├── index.html     ← Template con placeholders
│   │   └── assets/        ← JS/CSS hasheados (immutable cache)
│   ├── server/            ← Bundle SSR para el Worker
│   │   └── entry-server.js ← render(url) → { html, state }
│   └── spa/               ← Módulo ES para single-spa
│       ├── landing-ssr.es.js ← Lifecycle hooks
│       └── landing-ssr.css   ← Estilos
```

---

## 4. Desarrollo Local

### 4.1 Instalar dependencias

```powershell
cd c:\Users\Yonier Ospina\Documents\PruebasSitioSsr

# Instalar deps del landing-ssr
cd landing-ssr
npm install

# Instalar deps del root shell
cd ..
npm install
```

### 4.2 Modo desarrollo SSR (Express)

```powershell
cd landing-ssr
npm run dev    # Express + Vite hot-reload en http://localhost:3000
```

**Verificar:**
- Contenido visible antes de que JS se ejecute
- `View Source` muestra HTML real (no div vacío)
- Tailwind CSS aplicado correctamente
- Interactividad funcional después de hidratación

### 4.3 Modo desarrollo Worker (Wrangler)

```powershell
cd landing-ssr

# 1. Build necesario ANTES de wrangler dev
npm run build:client
npm run build:ssr

# 2. Simula el Worker localmente
npm run dev:worker    # http://localhost:8787
```

> **Nota**: `wrangler.toml` tiene `run_worker_first = true` en `[assets]`. Sin este flag, Wrangler sirve `index.html` directamente para `/` sin invocar el Worker.

### 4.4 Modo desarrollo SPA (root shell)

```powershell
cd c:\Users\Yonier Ospina\Documents\PruebasSitioSsr

# Si landing-ssr necesita rebuild como módulo SPA:
cd landing-ssr && npm run build:spa && cd ..

# Iniciar el root shell en dev
npm run dev    # http://localhost:5173
```

---

## 5. Build de Producción

### 5.1 Build del Worker SSR (landing-ssr)

```powershell
cd landing-ssr

# Build completo: type-check + client + SSR
npm run build:worker

# Resultado:
# dist/client/  → Static Assets del Worker
# dist/server/  → entry-server.js (render function)
```

### 5.2 Build del Root Shell

```powershell
cd c:\Users\Yonier Ospina\Documents\PruebasSitioSsr

# Build del monorepo root (incluye SitioVersion5)
npm run build

# Resultado:
# dist/assets/index-D1Zi...js  → Root shell entry point
# dist/assets/main-DoxS...js   → SitioVersion5 chunk
```

**Importante**: Si se modifica landing-ssr como módulo SPA, ejecutar `npm run build:spa` en `landing-ssr/` antes del build del root shell.

---

## 6. Despliegue del Worker SSR

### 6.1 Deploy combinado (build + deploy)

```powershell
cd landing-ssr
npm run deploy    # equivale a: npm run build:worker && wrangler deploy
```

### 6.2 Solo deploy (si ya se hizo build)

```powershell
cd landing-ssr
npx wrangler deploy
```

### 6.3 Verificar deploy

```powershell
# El deploy muestra la URL y bindings:
# ✅ Uploaded landing-ssr
# ✅ env.ASSETS → Assets
# ✅ env.SPA_ROOT_URL → "https://sitiousuarioonline.com"
# ✅ env.PAGES_ORIGIN → "https://sitiousuarioonline.pages.dev"
```

### 6.4 Invalidar cache SSR

Al desplegar cambios que afecten el HTML, incrementar `CACHE_VERSION` en `worker.ts`:

```typescript
const CACHE_VERSION = 'v8'  // incrementar desde v7
```

---

## 7. Despliegue del Root Shell (Pages)

El root shell se despliega a Cloudflare Pages (builds automáticos o manuales):

```powershell
# Build del root shell
cd c:\Users\Yonier Ospina\Documents\PruebasSitioSsr
npm run build

# Deploy manual a Pages (si no hay CI/CD)
npx wrangler pages deploy dist --project-name=sitiousuarioonline
```

**Importante**: Después de desplegar el root shell, el Worker debe descubrir los nuevos hashes de assets. El cache de discovery se invalida automáticamente cada 5 minutos, o puede forzarse incrementando `CACHE_VERSION` en el Worker.

---

## 8. Variables de Entorno

### wrangler.toml (Worker)

| Variable | Valor | Propósito |
|----------|-------|-----------|
| `SPA_ROOT_URL` | `https://sitiousuarioonline.com` | URL base del dominio |
| `CONFIG_LANDING_URL` | `https://sitiousuarioonline.com/configLanding.js` | Fallback — URLs reales se descubren desde Pages |
| `PAGES_ORIGIN` | `https://sitiousuarioonline.pages.dev` | Root shell en Cloudflare Pages |
| `SITIO_VERSION5_BUNDLE_URL` | `""` | Se descubre dinámicamente |

### Configuración de Routes

```toml
routes = [
    { pattern = "sitiousuarioonline.com/*", zone_name = "sitiousuarioonline.com" },
]
```

El Worker captura **todas** las requests del dominio. Para rutas no-landing (`/deportes`), proxifica el HTML del root shell desde Pages.

---

## 9. Verificación Post-Despliegue

### Test 1: SSR funcional

```powershell
$r = Invoke-WebRequest -Uri "https://sitiousuarioonline.com/" `
  -UseBasicParsing -Headers @{Accept="text/html"}

# Debe contener HTML renderizado (no placeholder vacío)
$r.Content -match "PaniPlay"  # true

# Debe tener configLanding del CDN (NO configLanding.js local)
$r.Content.Contains("configLanding-ganaplay.gt")  # True
$r.Content.Contains("configLanding.js`"")          # False
```

### Test 2: versionConfig correcto

```powershell
$r.Content.Contains("config-ganaplay.gt")  # True
$r.Content.Contains("config.js`"")          # False
```

### Test 3: Headers de seguridad

```powershell
$r.Headers["X-Frame-Options"]           # DENY
$r.Headers["X-Content-Type-Options"]    # nosniff
$r.Headers["Cache-Control"]             # public, s-maxage=3600, stale-while-revalidate=60
```

### Test 4: Proxy de Pages para /deportes

```powershell
$r2 = Invoke-WebRequest -Uri "https://sitiousuarioonline.com/deportes" `
  -UseBasicParsing -Headers @{Accept="text/html"}

# Debe contener el root shell HTML (no SSR de landing)
$r2.Content.Contains("configLanding-ganaplay.gt")  # True
$r2.StatusCode  # 200
```

### Test 5: Assets estáticos

```powershell
$asset = Invoke-WebRequest -Uri "https://sitiousuarioonline.com/assets/index-COzlxXRZ.js" `
  -UseBasicParsing -Method Head

$asset.StatusCode  # 200
$asset.Headers["Cache-Control"]  # public, max-age=31536000, immutable
```

---

## 10. Rollback y Troubleshooting

### Rollback del Worker

```powershell
# Ver versiones anteriores
npx wrangler deployments list

# Rollback a versión anterior
npx wrangler rollback
```

### Problemas comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| HTML vacío (sin SSR) | `run_worker_first = false` en wrangler.toml | Verificar `[assets] run_worker_first = true` |
| Config ecuabet en SSR | Discovery de Pages falló | Verificar `PAGES_ORIGIN` y que Pages esté accesible |
| Cache viejo después de deploy | `CACHE_VERSION` no incrementado | Incrementar `CACHE_VERSION` en worker.ts y redesplegar |
| SitioVersion5 no carga | Root shell no desplegado en Pages | Verificar deployment en Pages y discovery de manifest |
| Error `menu_` undefined | `window.cconfig` tiene config incorrecta | Verificar que configLanding URL apunta al CDN correcto |
| SW intercepta requests | Service Worker viejo cacheado | El Worker sirve `/sw.js` de auto-limpieza automáticamente |
| Hydration mismatch | Diferencia entre servidor y cliente | No acceder a `window`/`document` en `setup()`, solo en `onMounted()` |

### Logs del Worker

```powershell
# Ver logs en tiempo real
npx wrangler tail

# Logs persistentes
npx wrangler tail --format json
```

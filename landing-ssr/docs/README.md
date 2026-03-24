# PaniPlay Casino — Documentación del Proyecto

> Landing page de entretenimiento de casino renderizada en el servidor (**Vue 3 SSR nativo**), con diseño atómico, Pinia, Vue Router y despliegue en Render + Cloudflare CDN.

---

## Índice de documentación

| Archivo | Contenido |
|---------|-----------|
| [SSR_ARCHITECTURE.md](./SSR_ARCHITECTURE.md) | Flujo SSR, hidratación, ciclo de vida |
| [SSR_SPA_INTEGRATION.md](./SSR_SPA_INTEGRATION.md) | Integración SSR + SPA cross-micro (mini-shell, importmap, /deportes) |
| [COMPONENTS.md](./COMPONENTS.md) | Atomic Design, árbol de componentes, props |
| [STORES.md](./STORES.md) | Stores Pinia, interfaces TypeScript, cómo extender |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Render, variables de entorno, Cloudflare CDN |

---

## Quickstart

### Prerrequisitos
- Node.js ≥ 22
- npm ≥ 10

### Desarrollo local

```bash
# Instalar dependencias
npm ci

# Iniciar servidor de desarrollo (Express + Vite HMR)
npm run dev
# → http://localhost:3000
```

Los cambios en `.vue`, `.ts` y `.css` se reflejan en el navegador en tiempo real gracias a Vite HMR.

### Build de producción

```bash
npm run build
```

Esto ejecuta en orden:
1. `vue-tsc -b` — Verificación de tipos TypeScript
2. `vite build --ssrManifest --outDir dist/client` — Bundle del cliente
3. `vite build --ssr src/entry-server.ts --outDir dist/server` — Bundle del servidor
4. `tsc -p tsconfig.server.json` — Compila `server.ts` → `dist/server.js`

### Producción local

```bash
npm run start
# NODE_ENV=production → http://localhost:3000
```

---

## Estructura del proyecto

```
landing-ssr/
├── server.ts                    # Express SSR server (punto de entrada Node)
├── render.yaml                  # Configuración de deploy en Render
├── index.html                   # Template HTML con placeholders SSR
├── vite.config.ts               # Vite: Tailwind v4 + alias @/
├── tsconfig.server.json         # TypeScript para compilar server.ts
│
├── src/
│   ├── app.ts                   # Factory: createSSRApp + Pinia + Router
│   ├── entry-client.ts          # Entry hidratación del cliente
│   ├── entry-server.ts          # Entry renderizado en servidor
│   │
│   ├── router/
│   │   └── index.ts             # Factory de Vue Router (SSR-aware)
│   │
│   ├── stores/                  # Pinia stores
│   │   ├── games.store.ts
│   │   ├── promotions.store.ts
│   │   └── navigation.store.ts
│   │
│   ├── interfaces/              # TypeScript interfaces
│   │   ├── game.interface.ts
│   │   ├── promotion.interface.ts
│   │   ├── navigation.interface.ts
│   │   └── carousel.interface.ts
│   │
│   ├── composables/
│   │   └── useCarousel.ts       # Lógica de carrusel SSR-safe
│   │
│   ├── components/
│   │   ├── atoms/               # Componentes primitivos
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseBadge.vue
│   │   │   └── BaseImage.vue
│   │   ├── molecules/           # Composición de atoms
│   │   │   ├── NavItem.vue
│   │   │   ├── GameCard.vue
│   │   │   └── PromoCard.vue
│   │   └── organisms/           # Secciones completas
│   │       ├── AppHeader.vue
│   │       ├── AppFooter.vue
│   │       ├── HeroBanner.vue
│   │       ├── GameCarousel.vue
│   │       └── PromoCarousel.vue
│   │
│   ├── templates/
│   │   └── DefaultLayout.vue    # Layout: Header + slot + Footer
│   │
│   ├── views/
│   │   └── HomeView.vue         # Vista de la landing (única)
│   │
│   └── styles/
│       └── main.css             # Tailwind v4 + @theme casino
│
└── docs/                        # Esta documentación
```

---

## Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `NODE_ENV` | `development` | `production` en Render |
| `PORT` | `3000` | Puerto del servidor Express |

---

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build completo para producción |
| `npm run start` | Iniciar servidor de producción |
| `npm run build:client` | Solo bundle del cliente |
| `npm run build:ssr` | Solo bundle del servidor |
| `npm run build:node` | Solo compilar server.ts |

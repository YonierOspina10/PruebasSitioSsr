# Stores Pinia — landing-ssr

> **Última actualización:** Marzo 2026

---

## Configuración SSR de Pinia

Pinia es completamente compatible con SSR cuando se usa correctamente:

```typescript
// src/app.ts — instancia fresca por request
const pinia = createPinia()
app.use(pinia)
```

**Nunca** compartir una instancia de Pinia entre requests. El factory pattern de `createApp()` garantiza esto.

### Flujo de datos SSR

```
Servidor (Worker)                    Cliente (Browser)
─────────────────                    ─────────────────
createApp()                          createApp()
  └─ createPinia()                     └─ createPinia()
                                            └─ pinia.state.value = window.__PINIA_STATE__
stores populados (mock data)
renderToString(app) → HTML
JSON.stringify(pinia.state.value)    Vue hidrata sobre HTML existente
  └─ window.__PINIA_STATE__ = {...}  → stores ya tienen datos ✅
```

---

## `useGamesStore` — `src/stores/games.store.ts`

### State

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `games` | `IGame[]` | Array de todos los juegos (actualmente mock, 8 juegos) |
| `activeCategory` | `GameCategory \| null` | Filtro activo, null = todos |
| `isLoading` | `boolean` | Para futuras llamadas a API |

### Getters

| Getter | Retorna | Descripción |
|--------|---------|-------------|
| `filteredGames` | `IGame[]` | Juegos filtrados por `activeCategory` |
| `featuredGames` | `IGame[]` | Solo juegos con badge `hot` o `exclusive` |
| `liveGames` | `IGame[]` | Solo juegos con `isLive: true` |

### Actions

| Acción | Params | Descripción |
|--------|--------|-------------|
| `setCategory` | `GameCategory \| null` | Cambia el filtro activo |

### IGame interface

```typescript
interface IGame {
  id: string
  name: string
  category: 'slots' | 'roulette' | 'poker' | 'blackjack' | 'baccarat' | 'live'
  provider: string
  thumbnail: string           // URL de la imagen
  badge: 'hot' | 'new' | 'exclusive' | null
  rtp: number                 // Return to Player (0-100)
  isLive: boolean
  playUrl: string
}
```

---

## `usePromotionsStore` — `src/stores/promotions.store.ts`

### State

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `promotions` | `IPromotion[]` | Todas las promociones (actualmente mock, 4 promos) |
| `isLoading` | `boolean` | Para futuras llamadas a API |

### Getters

| Getter | Retorna | Descripción |
|--------|---------|-------------|
| `activePromotions` | `IPromotion[]` | Promos no expiradas (filtra por `expiresAt`) |
| `featuredPromotion` | `IPromotion \| undefined` | Primera promo de tipo `welcome` |

### IPromotion interface

```typescript
interface IPromotion {
  id: string
  title: string
  subtitle: string
  description: string
  type: 'welcome' | 'deposit' | 'free-spins' | 'cashback' | 'vip'
  badgeLabel: string          // Texto del badge, ej: "¡NUEVO!"
  value: string               // Valor legible, ej: "200% + 100 FS"
  imageUrl: string
  ctaLabel: string            // Texto del botón
  ctaUrl: string
  expiresAt: string | null    // ISO 8601 o null (sin expiración)
}
```

---

## `useNavigationStore` — `src/stores/navigation.store.ts`

### State

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `mainLinks` | `INavLink[]` | Links del header (6 links: Inicio, Deportes, Juegos...) |
| `footerLinks` | `INavLink[]` | Links del footer (5 links: Términos, Privacidad...) |
| `isMenuOpen` | `boolean` | Estado del menú móvil |

### Actions

| Acción | Descripción |
|--------|-------------|
| `toggleMenu()` | Abre/cierra el menú móvil |
| `closeMenu()` | Cierra el menú (útil en navigation guards) |

### INavLink interface

```typescript
interface INavLink {
  id: string
  label: string
  href: string
  isExternal?: boolean  // Si true, NavItem usa navigateToUrl() de single-spa
}
```

**Nota**: El link de "Deportes" tiene `isExternal: true` porque navega a una ruta manejada por SitioVersion5, no por landing-ssr.

---

## Cómo conectar a una API real

Cuando se tenga un backend, reemplazar los arrays `MOCK_GAMES` / `MOCK_PROMOTIONS` por llamadas a API:

### 1. Agregar action fetch al store

```typescript
// En games.store.ts
async fetchGames() {
  this.isLoading = true
  try {
    const response = await fetch('/api/games')  // URL relativa (SSR + cliente)
    this.games = await response.json()
  } finally {
    this.isLoading = false
  }
},
```

### 2. Llamar en entry-server.ts antes del render

```typescript
const { app, router, pinia } = createApp()
const gamesStore = useGamesStore(pinia)
await gamesStore.fetchGames()  // datos listos antes del render
// ...renderToString(app)
```

Los datos quedarán serializados en `window.__PINIA_STATE__` y el cliente los restaurará sin hacer una segunda llamada a la API.

### 3. Consideraciones SSR

- Las URLs de API deben funcionar tanto desde el Worker (con dominio completo) como desde el cliente (relativas o absolutas)
- Manejar errores para que un fallo de API no rompa el SSR — usar datos fallback
- El timeout de fetch en el Worker debe ser razonable (< 5s) para no bloquear el rendering

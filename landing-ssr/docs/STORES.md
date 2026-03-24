# Stores Pinia — PaniPlay

## Configuración SSR de Pinia

Pinia es completamente compatible con SSR cuando se usa correctamente:

```typescript
// src/app.ts — instancia fresca por request
const pinia = createPinia()
app.use(pinia)
```

**Nunca** compartir una instancia de Pinia entre requests. El factory pattern de `createApp()` garantiza esto.

---

## `useGamesStore` — `src/stores/games.store.ts`

### State

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `games` | `IGame[]` | Array de todos los juegos (mock) |
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

### Cómo agregar un juego

```typescript
// En games.store.ts, dentro de MOCK_GAMES:
{
  id: 'game-009',
  name: 'Nuevo Juego',
  category: 'slots',
  provider: 'Mi Proveedor',
  thumbnail: 'https://url-de-imagen.jpg',
  badge: 'new',
  rtp: 96.0,
  isLive: false,
  playUrl: '#play',
},
```

---

## `usePromotionsStore` — `src/stores/promotions.store.ts`

### State

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `promotions` | `IPromotion[]` | Todas las promociones |
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
| `mainLinks` | `INavLink[]` | Links del header |
| `footerLinks` | `INavLink[]` | Links del footer |
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
  isExternal?: boolean  // Si true, abre en nueva pestaña con rel="noopener"
}
```

---

## Cómo conectar a una API real

Cuando tengas un backend, reemplaza los arrays `MOCK_GAMES` / `MOCK_PROMOTIONS` por llamadas a API. El patrón recomendado con SSR:

```typescript
// En el store, agregar action:
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

Luego en `entry-server.ts`, llamar la action antes de renderizar:
```typescript
const { app, router, pinia } = createApp()
const gamesStore = useGamesStore(pinia)
await gamesStore.fetchGames()  // datos listos antes del render
// ...renderToString(app)
```

Los datos quedarán serializados en `window.__PINIA_STATE__` y el cliente los restaurará sin hacer una segunda llamada a la API.

# Plan de Migración — Landing Legacy → landing-ssr

> **Última actualización:** Marzo 2026
> **Estado:** landing-ssr funcional en producción. Landing legacy disponible como referencia.

---

## Objetivo

Migrar progresivamente la landing legacy (`landing/`) a `landing-ssr`, manteniendo la funcionalidad SSR actual intacta y aprovechando la arquitectura de componentes ya establecida.

---

## Estado actual

### landing-ssr (producción)

- SSR funcional en `sitiousuarioonline.com/`
- Componentes: HeroBanner, GameCarousel, PromoCarousel, AppHeader, AppFooter
- Datos: Mock estáticos en Pinia stores
- Integración: Ghost app + root shell + SitioVersion5 ✅
- Navegación SPA: Funcional sin page reloads ✅
- Configuración: Discovery dinámico de URLs del CDN ✅

### landing legacy (referencia)

- Directorio `landing/` en el monorepo
- Componentes Vue 3 con Vite
- No tiene SSR
- Incluye: componentes de chat, banners, cards, footers, headers, i18n, iconos, etc.
- Actualmente NO registrada como app en el root shell

---

## Fases de migración

### Fase 1: Inventario y priorización (1-2 días)

**Objetivo:** Mapear los componentes de landing legacy que deben migrarse.

**Acciones:**

1. **Listar componentes de landing/**
   ```
   landing/src/components/
   ├── banners/          → Banners promocionales
   ├── buttons/          → Botones de acción
   ├── cards/            → Cards informativas
   ├── cardsIcons/       → Cards con iconos
   ├── chat/             → Integración de chat
   ├── footers/          → Footers (ya existe en landing-ssr)
   ├── headers/          → Headers (ya existe en landing-ssr)
   ├── i18n/             → Internacionalización
   ├── icons/            → Iconografía
   ├── infoIcons/        → Iconos informativos
   ├── infoText/         → Textos informativos
   ├── jackpots/         → Sección jackpots
   ├── labelRedirect/    → Labels con redirección
   └── ...
   ```

2. **Clasificar por prioridad**
   - **Alta**: Componentes visibles en la landing actual → banners, cards, jackpots
   - **Media**: Funcionalidades → chat, i18n
   - **Baja**: Componentes que ya están en landing-ssr → headers, footers

3. **Identificar dependencias**
   - Composables de landing legacy
   - Servicios y API calls
   - Assets e imágenes
   - Stores y estado

---

### Fase 2: Adaptación de componentes SSR-safe (3-5 días por lote)

**Objetivo:** Migrar componentes garantizando compatibilidad con SSR.

**Reglas de migración:**

#### Regla 1: No acceder a browser APIs en setup/render
```typescript
// ❌ INCORRECTO — rompe SSR
export default {
  setup() {
    const width = window.innerWidth  // window no existe en el server
  }
}

// ✅ CORRECTO — SSR-safe
export default {
  setup() {
    const width = ref(0)
    onMounted(() => {
      width.value = window.innerWidth
    })
  }
}
```

#### Regla 2: Usar guards de entorno
```typescript
// Para código que solo debe correr en el cliente
if (!import.meta.env.SSR) {
  // localStorage, document.cookie, window.addEventListener, etc.
}
```

#### Regla 3: Composables SSR-safe
```typescript
// Patrón del useCarousel.ts existente
export function useFeature() {
  const state = ref(initialValue)

  // Timer/observer/listener solo en cliente
  onMounted(() => {
    const timer = setInterval(update, 1000)
    onUnmounted(() => clearInterval(timer))
  })

  return { state }
}
```

#### Regla 4: Imágenes con lazy-loading
```vue
<!-- Usar BaseImage.vue existente -->
<BaseImage :src="imageUrl" :alt="altText" :aspect-ratio="16/9" />
```

**Proceso por componente:**

1. Copiar componente de `landing/src/components/` a `landing-ssr/src/components/`
2. Ubicar en el nivel atómico correcto (atoms/molecules/organisms)
3. Adaptar imports (alias `@/` → rutas de landing-ssr)
4. Mover accesos a browser APIs a `onMounted()`
5. Verificar que renderiza correctamente en SSR (`npm run dev`)
6. Verificar hidratación sin mismatch en el browser

---

### Fase 3: Integración de datos reales (2-3 días)

**Objetivo:** Conectar stores con APIs reales en vez de datos mock.

**Acciones:**

1. **Crear acciones fetch en cada store**
   ```typescript
   // stores/games.store.ts
   async fetchGames() {
     this.isLoading = true
     try {
       const apiUrl = window.cconfig?.urlApi?.url || '/api'
       const response = await fetch(`${apiUrl}/games`)
       this.games = await response.json()
     } catch (error) {
       console.error('Error fetching games:', error)
       // Mantener mock data como fallback
     } finally {
       this.isLoading = false
     }
   }
   ```

2. **Llamar en entry-server.ts antes del render**
   ```typescript
   export async function render(url: string) {
     const { app, router, pinia } = createApp()
     await router.push(url)
     await router.isReady()

     // Cargar datos reales
     const gamesStore = useGamesStore(pinia)
     const promosStore = usePromotionsStore(pinia)
     await Promise.all([
       gamesStore.fetchGames(),
       promosStore.fetchPromotions(),
     ])

     const html = await renderToString(app)
     const state = JSON.stringify(pinia.state.value)
     return { html, state }
   }
   ```

3. **El cliente restaura estado sin fetch adicional**
   - `window.__PINIA_STATE__` contiene los datos reales del servidor
   - No se necesita una segunda llamada a la API en el cliente
   - Si el usuario navega a una nueva página, los stores pueden hacer fetch incremental

---

### Fase 4: Internacionalización (2-3 días)

**Objetivo:** Integrar i18n si la landing legacy lo usa.

**Acciones:**

1. Evaluar la solución de i18n de landing legacy
2. Integrar vue-i18n (si se usa) con SSR:
   ```typescript
   // app.ts
   import { createI18n } from 'vue-i18n'

   export function createApp() {
     const i18n = createI18n({
       locale: 'es',  // Puede venir de window.cconfig.language.languageDafault
       messages: { es: {...}, en: {...} },
       legacy: false,
     })
     app.use(i18n)
   }
   ```
3. Verificar SSR — vue-i18n es SSR-compatible

---

### Fase 5: Chat y servicios externos (1-2 días)

**Objetivo:** Integrar chat (Zendesk u otro) de forma lazy.

**Acciones:**

1. **Cargar chat solo en el cliente, solo tras interacción**
   ```typescript
   // Usar el patrón runOnceOnFirstInteraction del root shell
   onMounted(() => {
     window.runOnceOnFirstInteraction?.(() => {
       loadChatWidget()
     })
   })
   ```

2. **No bloquear SSR ni hidratación** — el chat es un side-effect del cliente

---

### Fase 6: Optimización SEO (1-2 días)

**Objetivo:** Mejorar meta tags y structured data.

**Acciones:**

1. **Meta tags dinámicos por ruta**
   ```typescript
   // En entry-server.ts, inyectar head-tags según la URL
   const headTags = generateHeadTags(url, gamesStore.featuredGames)
   // <!--head-tags--> placeholder en index.html
   ```

2. **Schema.org structured data** para juegos y promociones
3. **Sitemap.xml** generado dinámicamente
4. **robots.txt** servido por el Worker

---

## Reglas para agregar componentes sin romper landing-ssr

### Checklist pre-commit

- [ ] Componente renderiza sin errores en SSR (`npm run dev` → View Source ≠ div vacío)
- [ ] No hay hydration mismatch en la consola del browser
- [ ] No se accede a `window`/`document`/`localStorage` en `setup()` ni en `<template>` directamente
- [ ] Los timers/intervals se crean en `onMounted()` y limpian en `onUnmounted()`
- [ ] Las imágenes usan lazy-loading (`loading="lazy"` o BaseImage.vue)
- [ ] El componente sigue el Atomic Design (atoms → molecules → organisms)
- [ ] Las interfaces TypeScript están en `src/interfaces/`

### Checklist pre-deploy

- [ ] `npm run build:worker` completa sin errores
- [ ] `npm run build:spa` completa sin errores (si se usa como microfrontend)
- [ ] Test SSR local: `npm run dev` → página renderiza correctamente
- [ ] Test Worker local: `npm run dev:worker` → SSR funciona en http://localhost:8787
- [ ] Deploy: `npm run deploy` → verificar HTML en producción
- [ ] Verificar que `/deportes` sigue funcionando (no romper la integración SPA)

---

## Estructura objetivo post-migración

```
landing-ssr/src/components/
├── atoms/
│   ├── BaseBadge.vue
│   ├── BaseButton.vue
│   ├── BaseImage.vue
│   ├── BaseIcon.vue          ← Nuevo: iconografía SVG
│   └── BaseInput.vue         ← Nuevo: inputs de formulario
├── molecules/
│   ├── GameCard.vue
│   ├── NavItem.vue
│   ├── PromoCard.vue
│   ├── JackpotCard.vue       ← Migrado de landing legacy
│   ├── BannerSlide.vue       ← Migrado de landing legacy
│   └── InfoCard.vue          ← Migrado de landing legacy
└── organisms/
    ├── AppHeader.vue
    ├── AppFooter.vue
    ├── GameCarousel.vue
    ├── HeroBanner.vue
    ├── PromoCarousel.vue
    ├── JackpotSection.vue    ← Migrado de landing legacy
    ├── BannerCarousel.vue    ← Migrado de landing legacy
    └── ChatWidget.vue        ← Migrado de landing legacy (lazy-loaded)
```

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Hydration mismatch al migrar componentes | Alta | Medio | Guard `!import.meta.env.SSR` + testing local |
| Romper navegación SPA al agregar rutas | Media | Alto | No modificar `activeWhen` del root shell sin testing |
| Performance degradada por fetch bloqueante en SSR | Media | Alto | Timeout corto + fallback a mock data |
| Inconsistencia visual entre landing-ssr y SitioVersion5 | Media | Medio | Usar theme de `window.cconfig` (ya integrado) |
| Config incorrecta al cambiar CDN URLs | Baja | Alto | Discovery dinámico de Pages ya resuelve esto |

---

## Orden de ejecución recomendado

```
Fase 1 (Inventario)
  │
  ├─► Fase 2 (Componentes SSR-safe) — se puede hacer incremental
  │     ├── Lote 1: Banners y cards (más visibles)
  │     ├── Lote 2: Jackpots y info sections
  │     └── Lote 3: Iconos y utilidades
  │
  ├─► Fase 3 (Datos reales) — puede ir en paralelo con Fase 2
  │
  ├─► Fase 4 (i18n) — después de Fase 2
  │
  ├─► Fase 5 (Chat) — independiente, se puede hacer en cualquier momento
  │
  └─► Fase 6 (SEO) — al final, cuando el contenido esté completo
```

---

## Resumen de comandos de validación

```powershell
# Desarrollo local SSR
cd landing-ssr && npm run dev

# Build completo
npm run build:worker

# Deploy + verificación
npm run deploy

# Test SSR en producción
$r = Invoke-WebRequest -Uri "https://sitiousuarioonline.com/" -UseBasicParsing -Headers @{Accept="text/html"}
$r.Content.Contains("configLanding-ganaplay")  # True ✅

# Test SPA navigation (verificar en browser)
# 1. Abrir https://sitiousuarioonline.com/
# 2. Click en "Deportes"
# 3. Verificar que SitioVersion5 carga con config correcta (partner=27)
# 4. No debe haber page reload (verificar en Network tab)
```

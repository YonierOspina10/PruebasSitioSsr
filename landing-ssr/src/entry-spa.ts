import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { navigateToUrl } from 'single-spa'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import { createRouter } from './router'
import './styles/main.css'

/**
 * Entry point para single-spa (modo SPA dentro del monorepo root shell).
 *
 * ── Diferencias con entry-client.ts / entry-server.ts ──────────────────────
 *
 * entry-server.ts  → Corre en el Worker (renderToString). Sin DOM.
 * entry-client.ts  → Corre en el browser para hidratar HTML del SSR standalone.
 * entry-spa.ts     → Corre en el browser cuando el ROOT SHELL lo monta como
 *                    microfrontend vía single-spa. No hay HTML pre-renderizado,
 *                    Vue renderiza desde cero en el contenedor que single-spa provee.
 *
 * ── Por qué createApp ──────────────────────────────────────────────────────
 * Dentro del root shell no existe HTML SSR de este micro para hidratar.
 * Usar createSSRApp aquí hace que Vue intente hidratar un contenedor vacío,
 * emitiendo warnings y ensuciando el ciclo de montaje al navegar entre micros.
 * En single-spa el comportamiento correcto es montar desde cero con createApp.
 *
 * ── Router con base dinámico ───────────────────────────────────────────────
 * Cuando isLandingSsrHomeEnabled está activo, el root shell monta este micro
 * en las rutas '/' y '/home' (además de '/landing-ssr').
 * El base del router se determina dinámicamente en handleInstance:
 *   - Si la URL actual empieza con '/landing-ssr' → base = '/landing-ssr'
 *   - En cualquier otro caso (/, /home) → base = '/'
 * Esto permite que Vue Router resuelva rutas correctamente en ambos contextos.
 *
 * ── Limpieza en unmount ────────────────────────────────────────────────────
 * single-spa-vue llama app.unmount() automáticamente. Pero si hay side-effects
 * globales (event listeners, timers, subscriptions), se limpian en el hook
 * afterUnmount para evitar memory leaks al navegar entre microfronts.
 */

// Rutas que landing-ssr maneja internamente (independiente del base)
const LANDING_INTERNAL_PATHS = ['/', '/home']

function isAtLandingSsrPrefix(): boolean {
  const p = window.location.pathname
  return p === '/landing-ssr' || p.startsWith('/landing-ssr/')
}

function toShellPath(path: string) {
  if (path === '/landing-ssr' || path === '/landing-ssr/') {
    return '/landing-ssr'
  }

  if (path.startsWith('/landing-ssr/')) {
    const normalizedPath = path.slice('/landing-ssr'.length)
    return normalizedPath || '/'
  }

  return path
}

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App)
    },
  },
  handleInstance(app) {
    // ── Pinia: instancia fresca por cada mount ────────────────────────────
    const pinia = createPinia()
    app.use(pinia)

    // ── Router: base path dinámico ────────────────────────────────────────
    // Cuando el root shell monta landing-ssr en '/' o '/home' (isLandingSsrHomeEnabled),
    // el base debe ser '/' para que Vue Router resuelva las rutas correctamente.
    // Cuando se monta en '/landing-ssr' (ruta legacy), el base es '/landing-ssr'.
    const base = isAtLandingSsrPrefix() ? '/landing-ssr' : '/'

    const router = createRouter({
      base,
      useMemoryHistory: false,
      includeFallbackRoute: true,
    })

    router.beforeEach((to) => {
      // Permitir navegación a rutas internas de landing-ssr
      if (LANDING_INTERNAL_PATHS.includes(to.path)) return true

      // Para rutas externas (ej. /deportes), delegar a single-spa
      navigateToUrl(toShellPath(to.fullPath))
      return false
    })

    app.use(router)
  },
})

// ── Lifecycle exports para single-spa ─────────────────────────────────────────
// single-spa llama estas funciones en orden: bootstrap → mount → unmount
// y puede repetir mount/unmount múltiples veces sin volver a llamar bootstrap.

export const bootstrap = vueLifecycles.bootstrap

export const mount = vueLifecycles.mount

/**
 * Unmount con limpieza de side-effects globales.
 *
 * single-spa-vue ya llama app.unmount() internamente, lo cual:
 *  1. Ejecuta onUnmounted() de todos los componentes
 *  2. Destruye la instancia de Vue y desasocia el DOM
 *
 * Aquí se limpia cualquier efecto que NO esté atado al ciclo de vida de Vue:
 *  - Event listeners en window/document
 *  - setInterval / setTimeout globales
 *  - WebSocket connections
 *  - Estilos globales inyectados dinámicamente
 */
export async function unmount(props: Record<string, unknown>) {
  // 1. Dejar que single-spa-vue desmonte Vue primero
  await vueLifecycles.unmount(props)

  // 2. Limpiar estilos inyectados dinámicamente por este micro
  // (Vite en dev inyecta <style> tags; en producción están en el bundle CSS)
  document.querySelectorAll('style[data-vite-dev-id*="landing-ssr"]').forEach(el => el.remove())
}

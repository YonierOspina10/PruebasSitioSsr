import '@/styles/main.css'
import { createApp } from './app'
import type { StateTree } from 'pinia'

/**
 * Hidratación SSR standalone.
 * Solo se ejecuta cuando landing-ssr corre como app independiente (Worker SSR).
 * Cuando corre dentro de single-spa (root shell), entry-spa.ts maneja el ciclo de vida.
 *
 * IMPORTANTE: Solo hidrata en rutas de landing (/, /home).
 * Para rutas como /deportes, mini-shell.ts toma control y monta SitioVersion5
 * a través de single-spa, sin necesidad de montar Vue en #app.
 */
const LANDING_HYDRATION_ROUTES = ['/', '/home', '/landing-ssr', '/landing-ssr/']

const isSingleSpa = !!(window as any).__SINGLE_SPA_DEVTOOLS__ ||
  typeof (window as any).__single_spa_devtools__ !== 'undefined' ||
  document.querySelector('[id^="single-spa"]')

const isLandingRoute = LANDING_HYDRATION_ROUTES.includes(window.location.pathname)

if (!isSingleSpa && isLandingRoute) {
  const { app, router, pinia } = createApp()

  // Restaurar el estado de Pinia desde el servidor (hidratación)
  const initialState = (
    window as Window & { __PINIA_STATE__?: Record<string, StateTree> }
  ).__PINIA_STATE__
  if (initialState) {
    pinia.state.value = initialState
  }

  // Marcar que la hidratación SSR ocurrió para que el root shell
  // use un ghost app (show/hide) en vez de re-montar Vue.
  ;(window as any).__LANDING_SSR_HYDRATED__ = true

  // Esperar a que el router resuelva la ruta antes de montar (evita mismatch SSR)
  router.isReady().then(() => {
    app.mount('#app')
  })
}

import '@/styles/main.css'
import { createApp } from './app'
import type { StateTree } from 'pinia'

/**
 * Hidratación SSR standalone.
 * Solo se ejecuta cuando landing-ssr corre como app independiente (Express SSR).
 * Cuando corre dentro de single-spa, entry-spa.ts maneja el ciclo de vida.
 */
const isSingleSpa = !!(window as any).__SINGLE_SPA_DEVTOOLS__ ||
  typeof (window as any).__single_spa_devtools__ !== 'undefined' ||
  document.querySelector('[id^="single-spa"]')

if (!isSingleSpa) {
  const { app, router, pinia } = createApp()

  // Restaurar el estado de Pinia desde el servidor (hidratación)
  const initialState = (
    window as Window & { __PINIA_STATE__?: Record<string, StateTree> }
  ).__PINIA_STATE__
  if (initialState) {
    pinia.state.value = initialState
  }

  // Esperar a que el router resuelva la ruta antes de montar (evita mismatch SSR)
  router.isReady().then(() => {
    app.mount('#app')
  })
}

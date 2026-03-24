import { renderToString } from '@vue/server-renderer'
import { createApp } from './app'

/**
 * Función exportada que Express llama por cada request.
 * Devuelve el HTML renderizado y el estado serializado de Pinia.
 */
export async function render(url: string): Promise<{ html: string; state: string }> {
  const { app, router, pinia } = createApp()

  // Navegar a la URL solicitada antes de renderizar
  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  const state = JSON.stringify(pinia.state.value)

  return { html, state }
}

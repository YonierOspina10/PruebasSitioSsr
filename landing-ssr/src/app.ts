import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from '@/router'
import App from './App.vue'

/**
 * Factory de la aplicación.
 * Se llama una vez por request en el servidor (instancias frescas),
 * y una vez en el cliente al cargar la página.
 */
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createRouter()

  app.use(pinia)
  app.use(router)

  return { app, router, pinia }
}

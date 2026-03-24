import { createSSRApp, h } from 'vue'
import { createPinia } from 'pinia'
import { createRouter as _createRouter, createWebHistory } from 'vue-router'
import singleSpaVue from 'single-spa-vue'
import App from './App.vue'
import HomeView from '@/views/HomeView.vue'
import '@/styles/main.css'

/**
 * Entry point para single-spa (modo SPA dentro del monorepo).
 * Usa createSSRApp para soportar hidratación cuando se monta sobre DOM
 * pre-renderizado por SSR. En DOM vacío (monorepo root) renderiza normalmente.
 * El servidor SSR standalone usa entry-client.ts / entry-server.ts en su lugar.
 */

console.log('[landing-ssr] entry-spa.ts loaded successfully')

const vueLifecycles = singleSpaVue({
  createApp: createSSRApp,
  appOptions: {
    render() {
      return h(App)
    },
  },
  handleInstance(app) {
    const pinia = createPinia()
    app.use(pinia)

    const router = _createRouter({
      history: createWebHistory('/landing-ssr'),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'PaniPlay — Casino Online | Slots, Ruleta y más',
            description: 'Juega en PaniPlay, el mejor casino online con slots, ruleta y las mejores promociones.',
          },
        },
      ],
      scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        return { top: 0 }
      },
    })
    app.use(router)
  },
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount

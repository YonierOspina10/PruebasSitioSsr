import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * Factory de router: usa createMemoryHistory en servidor (sin DOM)
 * y createWebHistory en cliente (historial del navegador).
 */
export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
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
}

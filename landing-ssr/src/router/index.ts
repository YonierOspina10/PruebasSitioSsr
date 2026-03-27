import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * Factory de router: usa createMemoryHistory en servidor (sin DOM)
 * y createWebHistory en cliente (historial del navegador).
 */
interface CreateRouterOptions {
  base?: string
  useMemoryHistory?: boolean
  includeFallbackRoute?: boolean
}

export function createRouter(options: CreateRouterOptions = {}) {
  const {
    base = '/',
    useMemoryHistory = import.meta.env.SSR,
    includeFallbackRoute = true,
  } = options

  return _createRouter({
    history: useMemoryHistory ? createMemoryHistory() : createWebHistory(base),
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
      {
        path: '/home',
        name: 'home-alias',
        component: HomeView,
        meta: {
          title: 'PaniPlay — Casino Online | Slots, Ruleta y más',
          description: 'Juega en PaniPlay, el mejor casino online con slots, ruleta y las mejores promociones.',
        },
      },
      ...(includeFallbackRoute
        ? [{ path: '/:pathMatch(.*)*', name: 'shell-fallback', component: HomeView }]
        : []),
    ],
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      return { top: 0 }
    },
  })
}

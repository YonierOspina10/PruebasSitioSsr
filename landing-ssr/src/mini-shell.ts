/**
 * mini-shell.ts — Orquestador single-spa mínimo para el contexto SSR standalone.
 *
 * Se carga junto a entry-client.ts dentro del HTML servido por Express.
 * Responsabilidades:
 *  1. Registrar landing-ssr como "ghost app" (show/hide del #app ya hidratado).
 *  2. Registrar SitioVersion5 como app lazy-loaded (via importmap dinámico).
 *  3. Gestionar pushState interception para transiciones SPA sin recarga.
 *
 * NO se ejecuta dentro del monorepo root (allí src/main.js es el shell).
 */

import { registerApplication, start, getAppNames } from 'single-spa'

// ── Tipos ────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    cconfig: Record<string, any>
    versionConfig?: string
    __MINI_SHELL_STARTED__?: boolean
    __PINIA_STATE__?: Record<string, unknown>
  }
}

// ── Constantes de rutas ──────────────────────────────────────────────────────
const LANDING_ROUTES = ['/', '/landing-ssr']
const SITIO_EXCLUDED_ROUTES = ['/', '/landing-ssr']

// ── Helpers ──────────────────────────────────────────────────────────────────

function isLandingRoute(pathname: string): boolean {
  return LANDING_ROUTES.includes(pathname) || pathname === ''
}

function isSitioRoute(pathname: string): boolean {
  return !SITIO_EXCLUDED_ROUTES.includes(pathname) && pathname !== ''
}

// ── Ghost app: landing-ssr (show/hide #app) ──────────────────────────────────
// El DOM ya fue hidratado por entry-client.ts.
// Esta "app" solo muestra/oculta el contenedor, no re-monta Vue.
const landingApp = {
  async bootstrap() {
    console.log('[mini-shell] landing-ssr ghost app bootstrapped')
  },
  async mount() {
    const el = document.getElementById('app')
    if (el) el.style.display = ''
    console.log('[mini-shell] landing-ssr mounted (shown)')
  },
  async unmount() {
    const el = document.getElementById('app')
    if (el) el.style.display = 'none'
    console.log('[mini-shell] landing-ssr unmounted (hidden)')
  },
}

// ── Registro de SitioVersion5 (lazy load via importmap) ──────────────────────
function registerSitioVersion5(): void {
  if (getAppNames().includes('sitios')) return

  registerApplication({
    name: 'sitios',
    app: () => import(/* @vite-ignore */ '@my-micro-apps/SitioVersion5'),
    activeWhen: (location) => isSitioRoute(location.pathname),
    customProps: {
      domElementGetter: () => {
        let container = document.getElementById('sitio-root')
        if (!container) {
          container = document.createElement('div')
          container.id = 'sitio-root'
          document.body.appendChild(container)
        }
        return container
      },
    },
  })
}

// ── Inicialización ───────────────────────────────────────────────────────────

function initMiniShell(): void {
  // Evitar doble inicialización
  if (window.__MINI_SHELL_STARTED__) return
  window.__MINI_SHELL_STARTED__ = true

  console.log('[mini-shell] Initializing SSR cross-micro shell')

  // 1. Registrar landing-ssr como ghost app
  if (!getAppNames().includes('landing-ssr')) {
    registerApplication({
      name: 'landing-ssr',
      app: landingApp,
      activeWhen: (location) => isLandingRoute(location.pathname),
    })
  }

  // 2. Registrar SitioVersion5
  registerSitioVersion5()

  // 3. Arrancar single-spa
  start({ urlRerouteOnly: true })

  console.log('[mini-shell] single-spa started, registered apps:', getAppNames())
}

// ── Esperar a que window.cconfig esté disponible ─────────────────────────────
// En SSR standalone el servidor inyecta window.cconfig en el HTML.
// En caso de que llegue asíncronamente, hacemos polling breve.

function waitForConfig(maxAttempts = 50, intervalMs = 100): Promise<void> {
  return new Promise((resolve) => {
    if (window.cconfig && Object.keys(window.cconfig).length > 0) {
      resolve()
      return
    }

    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      if ((window.cconfig && Object.keys(window.cconfig).length > 0) || attempts >= maxAttempts) {
        clearInterval(timer)
        resolve()
      }
    }, intervalMs)
  })
}

// ── Boot ─────────────────────────────────────────────────────────────────────
waitForConfig().then(() => {
  initMiniShell()
})

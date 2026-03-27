import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/**
 * Configuración Vite para compilar landing-ssr como módulo SPA (ES module)
 * importable por el root single-spa shell (via @my-micro-apps/landing-ssr).
 *
 * También compila mini-shell.ts que orquesta single-spa en contexto SSR
 * standalone (show/hide landing + lazy-load SitioVersion5).
 *
 * Este build es INDEPENDIENTE de vite.config.ts (que maneja SSR + client).
 *
 * Comando: npm run build:spa → vite build --config vite.config.spa.ts
 * Output:  dist/spa/landing-ssr.js, dist/spa/mini-shell.js
 *
 * ── Estrategia de externals ──────────────────────────────────────────────────
 * En modo SPA (single-spa), las dependencias core se comparten entre
 * microfrontends a través del importmap del root shell:
 *
 *   vue, vue-router, pinia    → El root shell los expone globalmente
 *   single-spa                → Ya cargado por el root shell
 *   single-spa-vue            → Adapter ligero, se incluye en el bundle
 *
 * Esto EVITA duplicación: si landing-ssr y SitioVersion5 incluyeran
 * cada uno su propia copia de Vue (~50KB), habría conflictos de instancia
 * (createApp de un Vue no reconoce componentes del otro) y +100KB de
 * peso innecesario.
 *
 * ── Diferencia con vite.config.ts ────────────────────────────────────────────
 * vite.config.ts (SSR):  noExternal: true → TODO empaquetado (Workers no tiene npm)
 * vite.config.spa.ts:    external: [...] → Vue/Pinia/Router provistos por el host
 */
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    // ── Lib mode: genera ES modules sin index.html ──────────────────────────
    // Cada entry produce un .js independiente que exporta los lifecycle hooks
    // de single-spa (bootstrap, mount, unmount).
    lib: {
      entry: {
        // Entry principal: el root shell hace import('@my-micro-apps/landing-ssr')
        'landing-ssr': resolve(__dirname, 'src/entry-spa.ts'),
        // Mini-shell: se carga en el HTML del SSR standalone
        'mini-shell': resolve(__dirname, 'src/mini-shell.ts'),
      },
      formats: ['es'],
      // Nombres de archivo predecibles (sin hash) para importmap estable
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },

    outDir: 'dist/spa',

    // ── Externals: dependencias provistas por el host ───────────────────────
    rollupOptions: {
      external: [
        // Core Vue: el root shell expone una única instancia compartida
        'vue',
        'vue-router',
        'pinia',
        // single-spa ya está cargado en el host
        'single-spa',
      ],
      output: {
        // Globals para compatibilidad con scripts no-ESM (legacy fallback)
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'single-spa': 'singleSpa',
        },
      },
    },

    // ── Sin minificación de class names para debugging ─────────────────────
    // En producción del monorepo, el root shell puede minificar.
    minify: false,
  },
})

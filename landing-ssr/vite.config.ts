import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// ── Configuración base compartida ─────────────────────────────────────────────
// Se usa tanto para el build del cliente (entry-client.ts + assets)
// como para el build SSR (entry-server.ts → bundle consumido por el Worker).
//
// Builds que usan este archivo:
//   build:client → vite build --ssrManifest --outDir dist/client
//   build:ssr    → vite build --ssr src/entry-server.ts --outDir dist/server
//
// El build SPA (entry-spa.ts para single-spa) usa vite.config.spa.ts.
//
// Se usa la forma funcional de defineConfig para detectar si es build SSR
// y condicionar las opciones de rollup (manualChunks no aplica en SSR).
// ──────────────────────────────────────────────────────────────────────────────

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // ── Build del cliente ───────────────────────────────────────────────────────
  build: {
    // ── Target: Cloudflare Workers usa V8 reciente ──────────────────────────
    target: 'esnext',

    // ── Tamaño de assets para inline como base64 ────────────────────────────
    assetsInlineLimit: 4096,

    // ── Source maps solo en desarrollo ───────────────────────────────────────
    sourcemap: false,

    // ── Rollup: optimizaciones solo para el build del cliente ────────────────
    // En SSR (single entry, sin code splitting) manualChunks no es compatible.
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/vue') ||
              id.includes('node_modules/@vue') ||
              id.includes('node_modules/pinia') ||
              id.includes('node_modules/vue-router')) {
            return 'vendor-vue'
          }
          if (id.includes('node_modules/single-spa')) {
            return 'vendor-single-spa'
          }
        },
      },
    },
  },

  // ── SSR-specific ──────────────────────────────────────────────────────────
  ssr: {
    // Target: webworker (V8 isolate, NO Node.js)
    target: 'webworker',

    // Empaqueta TODO dentro del bundle (Workers no tiene node_modules)
    noExternal: true,
  },
}))

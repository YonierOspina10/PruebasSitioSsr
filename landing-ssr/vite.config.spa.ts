import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/**
 * Configuración Vite para compilar landing-ssr como módulo SPA
 * importable por el root single-spa (via @my-micro-apps/landing-ssr).
 * También compila mini-shell.ts para el contexto SSR standalone.
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        'landing-ssr': resolve(__dirname, 'src/entry-spa.ts'),
        'mini-shell': resolve(__dirname, 'src/mini-shell.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist/spa',
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', 'single-spa'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'single-spa': 'singleSpa',
        },
      },
    },
  },
})

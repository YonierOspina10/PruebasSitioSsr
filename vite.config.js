import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {VitePWA} from "vite-plugin-pwa";
import path from 'path';

function landingSsrHtmlFallback() {
    return {
        name: 'landing-ssr-html-fallback',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use((req, _res, next) => {
                const requestUrl = req.url?.split('?')[0] ?? '';
                const accept = req.headers.accept ?? '';
                const isHtmlRequest = accept.includes('text/html');
                const isLandingSsrRoute = requestUrl === '/landing-ssr' || requestUrl.startsWith('/landing-ssr/');

                if (isHtmlRequest && isLandingSsrRoute) {
                    req.url = '/index.html';
                }

                next();
            });
        },
    };
}

// Función para generar un hash único basado en la fecha y hora actual
function generateUniqueHash() {
  return new Date().getTime().toString(36); // Convertir a base 36 para acortar el hash
}

const env = loadEnv(
    'all',
    process.cwd()
);


const assetsPath = env.VITE_ASSETS_PATH  || 'assets/';
const assetsPath2 = env.VITE_ASSETS_PATH2  || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    manifest: true,
    rollupOptions: {
      output:{
        // Preservar nombres de exports (bootstrap, mount, unmount) en chunks
        // para que SitioVersion5 funcione correctamente vía dynamic import
        // cuando el root shell corre en contexto SSR.
        minifyInternalExports: false,
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
        cssCodeSplit: true,
        sourcemap: false,

    },
    css: {
        devSourcemap: true
    },
    experimental: {

        // Añade renderBuiltUrl aquí
        renderBuiltUrl(fileName, {type, hostType}) {
            console.log('fileName:', fileName);
            console.log('assetsPath2:', assetsPath2);
            // Asegúrate de que solo se aplique a los assets en producción
            if (assetsPath2 != '') {
                console.log('Returning:', `${assetsPath2}${fileName}`);

                // Usa la URL del CDN para los assets
                return `${assetsPath2}${fileName}`
            }
            console.log('Returning default:', fileName);
            // Para otros casos, usa la URL por defecto
            return fileName
        }
    },

    plugins: [
        landingSsrHtmlFallback(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('swiper-')
                }
            }
        }),
        vueJsx(),
        VitePWA({
            manifest: {
                name: 'Doradobet',
                short_name: 'Doradobet',
                description: 'Prueba pwa Doradobet',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'fullscreen',
                scope: '/',
                start_url: '/',
                id: '0',
                icons: [
                    {
                        src: 'icons/icon_192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'icons/icon_512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'icons/icon_144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        purpose: 'any'
                    }
                ],
                screenshots: [
                    {
                        src: 'screenshots/screenshot1.png',
                        sizes: '540x720',
                        type: 'image/png',
                        form_factor: 'wide'
                    }
                ]
            },
            workbox: {
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './SitioVersion5/src'),
            '@my-micro-apps/landing-ssr': path.resolve(__dirname, './src/landing-ssr-shim.js'),
        }
    }
});

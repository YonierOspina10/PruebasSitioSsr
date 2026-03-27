import { registerApplication, start, getAppNames, navigateToUrl } from 'single-spa'; // Importing functions to register and start micro frontends
import { pathToRegexp } from 'path-to-regexp'; // Importing path-to-regexp for route matching
import { initFirestore } from '../SitioVersion5/firebaseConfig'
import { setTheme, init } from '@tecnologia-general/virtualsoft-widgets';
import '@tecnologia-general/virtualsoft-widgets/dist/styles.css';
import {
    analyticsSdk,
    initAutoTracking,
    // ConsoleAdapter,
    GTMAdapter
} from "@tecnologia-general/virtualsoft-analytics-sdk";



try {
    analyticsSdk.init({
        adapters: [GTMAdapter],
        debug: false,
    });

    initAutoTracking();
} catch (e) {
    console.error("Error initializing analytics SDK:", e);
}

function normalizeLandingSsrPath() {
    const canonicalUrl = getCanonicalShellUrl(window.location.href);
    if (!canonicalUrl) {
        return;
    }

    if (canonicalUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        return;
    }

    history.replaceState(history.state, '', canonicalUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

function getCanonicalShellUrl(urlLike) {
    const parsed = new URL(urlLike, window.location.origin);

    if (parsed.origin !== window.location.origin) {
        return null;
    }

    if (parsed.pathname === '/landing-ssr/') {
        return `/landing-ssr${parsed.search}${parsed.hash}`;
    }

    if (parsed.pathname.startsWith('/landing-ssr/')) {
        const normalizedPath = parsed.pathname.slice('/landing-ssr'.length) || '/';
        return `${normalizedPath}${parsed.search}${parsed.hash}`;
    }

    return null;
}

const originalPushState = history.pushState.bind(history);
history.pushState = function pushStatePatched(state, title, url) {
    const target = url == null ? null : getCanonicalShellUrl(String(url));
    return originalPushState(state, title, target ?? url);
};

const originalReplaceState = history.replaceState.bind(history);
history.replaceState = function replaceStatePatched(state, title, url) {
    const target = url == null ? null : getCanonicalShellUrl(String(url));
    return originalReplaceState(state, title, target ?? url);
};

function handleCanonicalShellNavigation(event) {
    if (!(event.target instanceof Element)) {
        return;
    }

    const anchor = event.target.closest('a');
    if (!anchor) {
        return;
    }

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
    }

    const hrefAttr = anchor.getAttribute('href');
    if (!hrefAttr || hrefAttr.startsWith('#') || hrefAttr.startsWith('javascript:')) {
        return;
    }

    if (anchor.target && anchor.target !== '_self') {
        return;
    }

    const resolvedUrl = new URL(anchor.href, window.location.origin);
    if (resolvedUrl.origin !== window.location.origin) {
        return;
    }

    const canonicalUrl = getCanonicalShellUrl(resolvedUrl.href);
    if (!canonicalUrl) {
        return;
    }

    event.preventDefault();
    navigateToUrl(canonicalUrl);
}

normalizeLandingSsrPath();
window.addEventListener('single-spa:before-routing-event', normalizeLandingSsrPath);
window.addEventListener('single-spa:routing-event', normalizeLandingSsrPath);
document.addEventListener('click', handleCanonicalShellNavigation, true);

(function initRunOnceOnFirstInteraction() {
    if (window.runOnceOnFirstInteraction) return;

    window.runOnceOnFirstInteraction = function runOnceOnFirstInteraction(fn) {
        if (typeof fn !== 'function') return;

        let ran = false;

        const run = () => {
            if (ran) return;
            ran = true;
            try {
                fn();
            } catch (e) {
                console.error(e);
            }
        };

        const opts = { once: true, passive: true };

        // Primary: covers mouse + touch + pen in modern browsers
        window.addEventListener('pointerdown', run, opts);

        // Fallbacks
        window.addEventListener('touchstart', run, opts);
        window.addEventListener('mousemove', run, opts);
        window.addEventListener('keydown', run, opts);
    };
})();
function getDeviceTheme() {
    if (window.cconfig.mobileL === '') {
        return 'desktop';
    } else if (window.cconfig.mobileL !== '') {
        return 'mobile';
    }
}

const THEME_MAP = {
    primary_focus: "--theme-pf",
    secondary_focus: "--theme-sf",
    accent_focus: "--theme-af",
    success: "--theme-su",
    info: "--theme-in",
    warning: "--theme-wa",
    error: "--theme-er",
    primary: "--theme-p",
    primary_content: "--theme-pc",
    secondary: "--theme-s",
    secondary_content: "--theme-sc",
    accent: "--theme-a",
    accent_content: "--theme-ac",
    neutral: "--theme-n",
    neutral_focus: "--theme-nf",
    neutral_content: "--theme-nc",
    base_100: "--theme-b1",
    base_200: "--theme-b2",
    base_300: "--theme-b3",
    base_400: "--theme-b4",
    base_content: "--theme-bc",
}

function resolveThemePalette(
    themeMode,
    deviceTheme
) {

    const key =
        themeMode === "light"
            ? `theme_colors_ligth_${deviceTheme}`
            : `theme_colors_${deviceTheme}`

    const config = window.cconfig?.[key]

    if (!config) return {}

    const result = {}

    for (const key in THEME_MAP) {
        const cssVar = THEME_MAP[key]
        if (config[key]) {
            result[cssVar] = config[key]
        }
    }

    return result

}
    /**
     * Converts a hex color to HSL format.
     * @param {string} H - The hex color string.
     * @returns {string} - The HSL representation of the color.
     */
    function hexToHsl(H) {
        if (H !== undefined) {
            let r = 0,
                g = 0,
                b = 0;
            if (H.length == 4) {
                r = '0x' + H[1] + H[1]; // Convert shorthand hex to full hex
                g = '0x' + H[2] + H[2];
                b = '0x' + H[3] + H[3];
            } else if (H.length == 7) {
                r = '0x' + H[1] + H[2]; // Convert full hex to RGB
                g = '0x' + H[3] + H[4];
                b = '0x' + H[5] + H[6];
            }
            r /= 255; // Normalize red
            g /= 255; // Normalize green
            b /= 255; // Normalize blue
            let cmin = Math.min(r, g, b),
                cmax = Math.max(r, g, b),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;
            if (delta == 0) h = 0; // No hue if delta is 0
            else if (cmax == r) h = ((g - b) / delta) % 6; // Calculate hue
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            h = Math.round(h * 60); // Convert hue to degrees
            if (h < 0) h += 360; // Adjust hue if negative
            l = (cmax + cmin) / 2; // Calculate lightness
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Calculate saturation
            s = +(s * 100).toFixed(1); // Convert saturation to percentage
            l = +(l * 100).toFixed(1); // Convert lightness to percentage
            return '' + h + ' ' + s + '% ' + l + '%'; // Return HSL string
        } else {
            return ''; // Return empty string if input is undefined
        }
    }

function applyGlobalThemeColors(themeMode) {
    // view size
    let deviceKeyBase;
    if (window.cconfig.theme_colors_desktop !== undefined && window.cconfig.mobileL === '') {
        deviceKeyBase = 'desktop';
    } else if (window.cconfig.theme_colors_mobile !== undefined && window.cconfig.mobileL !== '') {
        deviceKeyBase = 'mobile';
    } else {
        deviceKeyBase = null;
    }
    // mode (light/dark) and view size
    let configKey = null;

    if (deviceKeyBase) {
        if (themeMode === 'light') {
            const candidate = `theme_colors_ligth_${deviceKeyBase}`;
            if (window.cconfig[candidate]) {
                configKey = candidate;
            }
        }

        if (!configKey) {
            configKey = `theme_colors_${deviceKeyBase}`;
        }
    }

    if (!configKey && window.cconfig.theme_colors) {
        configKey = 'theme_colors';
    }

    const config = configKey ? window.cconfig[configKey] : null;
    if (!config) {
        console.warn('[theme] No se encontró configuración de colores para', themeMode, 'con key', configKey);
        return;
    }
    //build CSS with all variables
    const css = `
      :root {
        --pf: ${hexToHsl(config.primary_focus)} !important;
        --sf: ${hexToHsl(config.secondary_focus)} !important;
        --af: ${hexToHsl(config.accent_focus)} !important;
        --su: ${hexToHsl(config.success)} !important;
        --in: ${hexToHsl(config.info)} !important;
        --wa: ${hexToHsl(config.warning)} !important;
        --er: ${hexToHsl(config.error)} !important;
        --p: ${hexToHsl(config.primary)} !important;
        --pc: ${hexToHsl(config.primary_content)} !important;
        --s: ${hexToHsl(config.secondary)} !important;
        --sc: ${hexToHsl(config.secondary_content)} !important;
        --a: ${hexToHsl(config.accent)} !important;
        --ac: ${hexToHsl(config.accent_content)} !important;
        --n: ${hexToHsl(config.neutral)} !important;
        --nf: ${hexToHsl(config.neutral_focus)} !important;
        --nc: ${hexToHsl(config.neutral_content)} !important;
        --b1: ${hexToHsl(config.base_100)} !important;
        --b2: ${hexToHsl(config.base_200)} !important;
        --b3: ${hexToHsl(config.base_300)} !important;
        --b4: ${hexToHsl(config.base_400)} !important;
        --bc: ${hexToHsl(config.base_content)} !important;
        --nt: ${hexToHsl(config.neutral_text)} !important;
        --it: ${hexToHsl(config.info_text)} !important;
        --sb: ${hexToHsl(config.sportbook_color)} !important;
        --ic: ${hexToHsl(config.input_border)} !important;
        --ip: ${hexToHsl(config.input_placeholder)} !important;
        --ib: ${hexToHsl(config.input_background)} !important;
      }
      [data-theme="main"] .swiper-button-prev,
      [data-theme="main"] .swiper-button-next,
      [data-theme="main"] .swiper-button-prev::after,
      [data-theme="main"] .swiper-button-next::after {
        color: ${config.primary};
      }
    `;

    let styleEl = document.getElementById('global-theme-colors');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'global-theme-colors';
        document.body.appendChild(styleEl);
    }
    styleEl.textContent = css;
}

function getCurrentTheme() {
    const storedTheme = localStorage.getItem('changeThemeColor');
    return storedTheme === 'true' ? 'light' : 'dark';
}
const initialTheme = getCurrentTheme();
const deviceTheme = getDeviceTheme()

const lightPalette = resolveThemePalette("light", deviceTheme)
const darkPalette = resolveThemePalette("dark", deviceTheme)

applyGlobalThemeColors(initialTheme);

init({
    css: {
        common: {
            '--ff-tags': 'Arial, sans-serif',
            '--ff-description': 'Georgia, serif',
            '--ff-title': 'Helvetica, sans-serif',
            '--fw-regular': '400',
            '--fw-semibold': '600',
            '--fw-bold': '700',
            '--fs-sm': '10px',
            '--fs-md': '14px',
            '--fs-lg': '16px',
            '--lh-sm': '1.2',
            '--lh-md': '1.5',
            '--lh-lg': '1.8',
            '--ls-sm': '0.5px',
            '--ls-md': '1px',
            '--ls-lg': '1.5px',
            '--pd-sm': '4px',
            '--pd-md': '8px',
            '--pd-lg': '16px',
            '--gp-sm': '4px',
            '--gp-md': '8px',
            '--gp-lg': '16px',
            '--bw-sm': '0.5px',
            '--bw-md': '1px',
            '--bw-lg': '2px',
            '--br-sm': '4px',
            '--br-md': '8px',
            '--br-lg': '16px',
        },
        light: lightPalette,
        dark: darkPalette,
    },
    defaultTheme: initialTheme,
});

window.addEventListener('themeChanged', (e) => {
    if(e.detail.theme){
        setTheme(e.detail.theme);
        applyGlobalThemeColors(e.detail.theme);
    }
});

// Check if landingHome is defined in the global configuration
const isLandingHomeDefined =
    window.cconfig.landingHome !== undefined && window.cconfig.landingHome !== undefined && window.cconfig.landingHome;
const isLandingSsrHomeEnabled = true;
    /**
     * Loads a script dynamically and returns a promise.
     * @param {string} url - The URL of the script to load.
     * @param {string} [type='module'] - The type of the script (default is 'module').
     * @returns {Promise<HTMLScriptElement>} - A promise that resolves with the loaded script element.
     */
    function loadScript(url, type = 'module') {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${url}"]`);
            if (existingScript) {
                resolve(existingScript); // Resolve if the script is already loaded
                return;
            }
            const script = document.createElement('script'); // Create a new script element
            script.src = url; // Set the script source
            script.type = type; // Set the script type
            script.async = true;
            script.onload = () => resolve(script); // Resolve on load
            script.onerror = () => reject(new Error(`Failed to load script ${url}`)); // Reject on error
            document.head.appendChild(script); // Append the script to the document head
        });
        }
        try {

    /**
     * Handles route changes and loads the appropriate configuration script.
     * Si configLanding.js ya cargó window.cconfig con datos reales,
     * NO cargar config.js porque lo sobreescribiría con un objeto vacío.
     */
    function handleRouteChange() {
        const path = window.location.pathname; // Get the current path
        let configScript;
        if (path !== '/') {
            configScript = window.versionConfig; // Get the version config if not on the root path
        }
        // Si cconfig ya tiene datos reales (cargado por configLanding.js),
        // no cargar config.js que lo sobreescribiría con {}
        if (configScript !== undefined && !(window.cconfig && Object.keys(window.cconfig).length > 1)) {
            loadScript(configScript) // Load the configuration script
                .then(() => {
                    // Config cargado: sitios ya está registrado desde el bloque principal.
                    // No re-registrar aquí.
                    console.log('[shell] versionConfig loaded for path:', path);
                  })
                 .catch((error) => {
                     console.error(error); // Log any errors
                 });
        } else if (configScript !== undefined) {
            console.log('[shell] Skipping config.js load — cconfig already populated for path:', path);
        }
    }

    if (isLandingHomeDefined || isLandingSsrHomeEnabled) {
        handleRouteChange(); // Handle route change if landing home is defined
    }

    // Add event listener for popstate to handle back/forward navigation
    window.addEventListener('popstate', () => {
        if (isLandingHomeDefined || isLandingSsrHomeEnabled) {
            handleRouteChange(); // Handle route change on popstate
        }
    });
} catch (e) {
    console.log(e); // Log any errors in the try block
}
// Ensure `window.sessionSeon` is defined using existing global configs
window.sessionSeon =
  window.sessionSeon || // Use existing sessionSeon if already defined
  (window.cconfig && window.cconfig.sessionSeon) || // Otherwise, use sessionSeon from window.cconfig
  {}; // Default to empty object if none exists

// Immediately-invoked async function to dynamically load SEON if active
(async function loadSeonIfActive() {
  try {
    // Validate SEON configuration before loading
      if (window.sessionSeon && window.sessionSeon.active && window.sessionSeon.src) {
          typeof window.runOnceOnFirstInteraction === "function" && window.runOnceOnFirstInteraction(
              () => {
                  setTimeout(async () => {
                      console.log("[SEON] Initializing after first user interaction.");
                      await loadScript(window.sessionSeon.src, "text/javascript");
                      initSeonWhenReady(); // Call the initialization function
                  }, 1000);
              },
          )
      }
  } catch (err) {
    console.error("Error loading SEON:", err);
  }
})();

/**
* Initialize SEON when available in the global window
*/
function initSeonWhenReady() {
  if (typeof window.seon === "undefined") { // Check if SEON is available
    setTimeout(initSeonWhenReady, 300); // Retry initialization after delay
    return;
  }
  window.seon.init(); // Call SEON init method

  // Define helper to create a SEON session
  window.getSeonSession = async function () {
    try {
      const session = await window.seon.getSession({
        geolocation: { canPrompt: false }, // Disable geolocation prompts
        networkTimeoutMs: 2000, // Network timeout
        fieldTimeoutMs: 2000, // Field collection timeout
        region: "eu", // Region configuration
        silentMode: true, // Silent mode for user experience
      });
      return session;
    } catch (err) {
      console.error("Error creating SEON session:", err);
      return null;
    }
  };
}

if (window.cconfig?.firestoreconfig?.activate === true && false) {
  initFirestore()
    .then(() => {
      console.info("Firestore initialized and ready.");
    })
    .catch((err) => {
      console.error("Error initializing Firestore:", err);
    });
} else {
  console.warn("Firestore not active — skipping initialization.");
}

try {

    // Preserve the original attachShadow method
    Element.prototype._attachShadow = Element.prototype.attachShadow;
    // Override attachShadow to use 'open' mode by default
    Element.prototype.attachShadow = function () {
        return this._attachShadow({ mode: 'open' });
    };

    let deviceTheme = 'theme_colors'; // Default theme variable
    /**
     * Updates API URLs based on the current domain and configuration.
     */
    const updateApiUrls = () => {
        const currentDomain = window.location.href; // Get the current domain
        const urlApi = window.cconfig.urlApi.url; // Get the API URL from config
        const urlCasinoPlay = window.cconfig.urlCasinoPlay; // Get the casino play URL from config
        const urlApiFallback = window.cconfig.url_api; // Get the fallback API URL from config
        if (urlApiFallback && currentDomain.includes('sp-')) {
            let domainPrefix = currentDomain.split('.')[0]; // Extract domain prefix
            let domainPrefixCasino = currentDomain.split('.')[0];
            domainPrefix = domainPrefix.replace('sp-', 'partnerapi-'); // Modify domain prefix for API
            domainPrefixCasino = domainPrefixCasino.replace('sp-', 'casino-'); // Modify domain prefix for casino
            const initialUrl = new URL(urlApiFallback); // Create URL object for fallback API
            const baseDomain = initialUrl.hostname.split('.').slice(1).join('.'); // Get base domain
            const basePath = initialUrl.pathname; // Get base path
            window.cconfig.url_api = `${domainPrefix}.${baseDomain}${basePath}`; // Update API URL in config
            window.cconfig.urlApi.url = window.cconfig.url_api; // Set the updated API URL
            const initialUrlCasino = new URL(urlCasinoPlay); // Create URL object for casino play
            const baseDomainCasino = initialUrlCasino.hostname.split('.').slice(1).join('.'); // Get base domain for casino
            const basePathCasino = initialUrlCasino.pathname; // Get base path for casino
            window.cconfig.urlCasinoPlay = `${domainPrefixCasino}.${baseDomainCasino}${basePathCasino}`; // Update casino play URL in config
        } else if (currentDomain.includes('sp-')) {
            let domainPrefix = currentDomain.split('.')[0]; // Extract domain prefix
            let domainPrefixCasino = currentDomain.split('.')[0];
            domainPrefix = domainPrefix.replace('sp-', 'partnerapi-'); // Modify domain prefix for API
            domainPrefixCasino = domainPrefixCasino.replace('sp-', 'casino-'); // Modify domain prefix for casino
            const initialUrl = new URL(urlApi); // Create URL object for API
            const baseDomain = initialUrl.hostname.split('.').slice(1).join('.'); // Get base domain
            const basePath = initialUrl.pathname; // Get base path
            window.cconfig.urlApi.url = `${domainPrefix}.${baseDomain}${basePath}`; // Update API URL in config
            window.cconfig.url_api = window.cconfig.urlApi.url; // Set the updated API URL
            const initialUrlCasino = new URL(urlCasinoPlay); // Create URL object for casino play
            const baseDomainCasino = initialUrlCasino.hostname.split('.').slice(1).join('.'); // Get base domain for casino
            const basePathCasino = initialUrlCasino.pathname; // Get base path for casino
            window.cconfig.urlCasinoPlay = `${domainPrefixCasino}.${baseDomainCasino}${basePathCasino}`; // Update casino play URL in config
        }
    };

    updateApiUrls(); // Call function to update API URLs



    // Set the theme attribute on the document element if defined
    if (window.cconfig.theme !== undefined && window.cconfig.theme !== '') {
        /**
         * Applies the theme to the document element.
         */
        function getTheme() {
            document.documentElement.setAttribute('data-theme', cconfig.theme); // Set the data-theme attribute
        }
        getTheme(); // Call the function to apply the theme
    }
} catch (e) {
    console.log(e); // Log any errors in the try block
}

// Define landing routes
let routesLanding = ['/', '/home'];

// Define site routes
let routesSite = [
    '/home',
    '/registro',
    '/registro/:Codigo',
    '/registro/aff/:Codigo2',
    '/registro/a/:Codigo3',
    '/landing/login-playtech',
    '/landing/registro',
    '/landing/casino',
    '/landing/registro-casino',
    '/landing/deportivas',
    '/landing/depositos',
    '/landing/registro-deportivas',
    '/landing/registro-corto',
    '/landing/registro-corto/:Codigo',
    '/landing/registro-corto/aff/:Codigo2',
    '/landing/registro-corto/a/:Codigo3',
    '/landing/registro-corto-loto',
    '/casino/bono',
    '/apuestas/bono',
    '/deportes',
    '/deportes/partido/:PartidoId',
    '/deportes/liga/:LigaId',
    '/deportes/pais/:PaisId',
    '/deportes/:DeporteId',
    '/deportes2',
    '/deportes2/partido/:PartidoId',
    '/deportes2/liga/:LigaId',
    '/deportes2/pais/:PaisId',
    '/deportes2/:DeporteId',
    '/apuestas',
    '/apuestas/partido/:PartidoId',
    '/apuestas/liga/:LigaId',
    '/apuestas/pais/:PaisId',
    '/apuestas/:DeporteId',
    '/lottery-bets',
    '/deportes-en-vivo',
    '/deportes-en-vivo2',
    '/apuestas-en-vivo',
    '/new-casino',
    '/new-casino/:GameId',
    '/new-casino/categoria/:CategoryId',
    '/new-casino/categoria/:CategoryId/:GameId',
    '/new-casino/proveedor/:ProviderId',
    '/live-casino-vivo',
    '/live-casino-vivo/:GameId',
    '/live-casino-vivo/categoria/:CategoryId',
    '/live-casino-vivo/categoria/:CategoryId/:GameId',
    '/live-casino-vivo/proveedor/:ProviderId',
    '/live-casino',
    '/live-casino/:GameId',
    '/pragmatic-vivo',
    '/pragmatic-vivo/:GameId',
    '/evolution',
    '/evolution/:GameId',
    '/betgamestv',
    '/betgamestv/:GameId',
    '/vivogaming',
    '/vivogaming/:GameId',
    '/poker',
    '/virtuales-lobby',
    '/virtuales-lobby/:GameId',
    '/virtuales-lobby/categoria/:CategoryId',
    '/virtuales-lobby/categoria/:CategoryId/:GameId',
    '/virtuales-lobby/proveedor/:ProviderId',
    '/virtual',
    '/virtualnew',
    '/virtual/:GameId',
    '/gestion/deposito',
    '/gestion/deposito-cuenta',
    '/gestion/tarjetas-credito',
    '/gestion/deposito/error',
    '/gestion/deposito/correcto',
    '/gestion/deposito/pendiente',
    '/gestion/cuenta_cobro',
    '/gestion/cuenta_cobro_anular',
    '/gestion/cuentasbancarias',
    '/consulta/consulta_tickets_online',
    '/consulta/consulta_tickets_online2',
    '/consulta/consulta_tickets_casino',
    '/consulta/consulta_depositos',
    '/consulta/consulta_retiros',
    '/gestion/gestion_cuenta',
    '/gestion/verificar_cuenta',
    '/gestion/cambiar-clave',
    '/gestion/misbonos',
    '/gestion/shop-bonuses',
    '/gestion/autoexclusion',
    '/gestion/autoexclusion-producto',
    '/gestion/limitedeposito',
    '/referido/agregar_referidos',
    '/referido/estado_referidos',
    '/shop-bonuses',
    '/shop-bonuses-cards/:categoryId',
    '/consulta/mi_lealtad',
    '/gestion/mi_lealtad',
    '/contactenos',
    '/trabaja-con-nosotros',
    '/terminosycondiciones',
    '/terminosycondiciones/:sectionId',
    '/politica-de-privacidad',
    '/politica-de-privacidad/:sectionId',
    '/preguntasfrecuentes',
    '/preguntasfrecuentes/:sectionId',
    '/juego-responsable',
    '/juego-responsable/:sectionId',
    '/geolocalizacion',
    '/reclamaciones',
    '/resultados',
    '/mundial',
    '/thankyou',
    '/graciasdeposito',
    '/promociones-bonos',
    '/promociones-bonos/:sectionId',
    '/promociones-bonos/id/:bonoId',
    '/banner-right',
    '/banner-left',
    '/banner-rightnl',
    '/banner-leftnl',
    '/banner-topcenter',
    '/banner-topcenternl',
    '/recuperar-clave',
    '/recuperar-clave-validar/:tokenP',
    '/recuperar-clave-activar/:tokenP',
    '/validar-actualizacion/:tokenP',
    '/verificar-email/:email/:tokenP',
    '/mensajes',
    '/torneos',
    '/bingos',
    '/sorteos',
    '/programa_lealtad',
    '/programa-lealtad',
    '/landing/app',
    '/landing/appIos',
    '/landing/cambiar-clave',
    '/landing/verificarCuenta',
    '/landing/sorteos/:LotteryId',
    '/liga/:ligaId',
    '/my-bonuses-progress',
    '/wallet',
    '/pos/login',
    '/pos/menu',
    '/pos/bets-sport',
    '/pos/change-password',
    '/pos/flow-cash',
    '/pos/flow-cash-summary',
    '/pos/prize-payment',
    '/pos/note-withdrawal-payment',
    '/pos/credit-recharge',
    '/pos/resultados',
    '/televentas',
];

// Register the application based on whether landing home is defined
// Agregar catch-all a routesSite una sola vez, de forma determinística.
// Esto evita mutaciones dentro de activeWhen que causaban inconsistencias.
if (!routesSite.includes('/:pathMatch(.*)*')) {
    routesSite.push('/:pathMatch(.*)*');
}

if (!isLandingHomeDefined || isLandingSsrHomeEnabled) {
    routesSite.unshift('/'); // Add root route if landing home is not defined
    if (!getAppNames().includes('sitios')) {
    safeRegisterApplication({
         name: 'sitios',
         app: async () => {
             try {
                 const mod = await import('@my-micro-apps/SitioVersion5');
                 console.log('[single-spa debug] SitioVersion5 module imported:', mod);
                 try {
                     const exported = mod.default || mod;
                     console.log('[single-spa debug] SitioVersion5 exported keys:', Object.keys(exported));
                 } catch (e) {
                     console.warn('[single-spa debug] Could not enumerate exported keys for SitioVersion5', e);
                 }
                 return mod;
             } catch (err) {
                 console.error('[single-spa] Failed to import SitioVersion5 (sitios):', err);
                 throw err;
             }
         },
         activeWhen: (location) => {
             // Excluir rutas de landing-ssr: ese micro tiene su propio registro
             if (location.pathname.startsWith('/landing-ssr')) return false;
             // Excluir rutas de landing (/, /home): landing-ssr las maneja
             if ((isLandingHomeDefined || isLandingSsrHomeEnabled) && routesLanding.some(route => pathToRegexp(route).test(location.pathname))) {
                return false;
             }
             return routesSite.some(route => pathToRegexp(route).test(location.pathname));
         },
     });
     }

} else {
    if (!getAppNames().includes('landing')) {
    safeRegisterApplication({
         name: 'landing',
         app: async () => {
             try {
                 return await import('@my-micro-apps/landing');
             } catch (err) {
                 console.error('[single-spa] Failed to import landing:', err);
                 throw err;
             }
         },
         activeWhen: (location) => routesLanding.some(route => pathToRegexp(route).test(location.pathname)),
     });
     }

}

// ── Registro de landing-ssr (microfrontend SSR/SPA dual – HOME del shell) ─────
// Cuando isLandingSsrHomeEnabled = true, landing-ssr es la app principal para
// las rutas '/' y '/home'. El root shell la monta con entry-spa.ts que detecta
// automáticamente si debe usar base '/' o '/landing-ssr'.
// Para '/deportes' y demás rutas, single-spa monta 'sitios' (SitioVersion5).
//
// Cuando __LANDING_SSR_HYDRATED__ está activo (SSR standalone), entry-client.ts
// ya hidrato Vue en #app. En ese caso usamos un ghost app que solo muestra/oculta
// el contenedor #app, evitando conflictos de doble montaje.
if (!getAppNames().includes('landing-ssr')) {
    safeRegisterApplication({
        name: 'landing-ssr',
        app: async () => {
            // Si la hidratación SSR ya ocurrió, usar ghost app (show/hide #app)
            if (window.__LANDING_SSR_HYDRATED__) {
                return {
                    bootstrap: async () => {
                        console.log('[root-shell] landing-ssr ghost app (SSR hydrated) bootstrapped');
                    },
                    mount: async () => {
                        const el = document.getElementById('app');
                        if (el) el.style.display = '';
                        console.log('[root-shell] landing-ssr mounted (shown - SSR hydrated)');
                    },
                    unmount: async () => {
                        const el = document.getElementById('app');
                        if (el) el.style.display = 'none';
                        console.log('[root-shell] landing-ssr unmounted (hidden)');
                    },
                };
            }
            try {
                return await import('@my-micro-apps/landing-ssr');
            } catch (err) {
                console.error('[single-spa] Failed to import landing-ssr:', err);
                throw err;
            }
        },
        activeWhen: (location) => {
            // Ruta legacy /landing-ssr
            if (location.pathname === '/landing-ssr' || location.pathname === '/landing-ssr/') {
                return true;
            }

            if (!isLandingSsrHomeEnabled) {
                return false;
            }

            // Rutas home: /, /home
            return routesLanding.some(route => pathToRegexp(route).test(location.pathname));
        },
    });
}

// Start single-spa once after registering applications
try {
    if (!getAppNames().includes('__single_spa_started')) {
        // We don't have a direct API to check if start() was already called, but start() is idempotent in practice.
        // Call it once here.
        start();
        console.log('[single-spa] started');
    }
} catch (e) {
    // If start throws for any reason, log it but don't break the host
    console.error('[single-spa] error starting single-spa:', e);
}

// FILE DOCUMENTED
/**
 * Safe wrapper around registerApplication to tolerate races where another script
 * already registered the same app name (single-spa error #21).
 * Accepts the same config object as registerApplication.
 */
function safeRegisterApplication(config) {
    try {
        // If app already present, skip early
        if (getAppNames && typeof getAppNames === 'function' && getAppNames().includes(config.name)) {
            console.warn(`[single-spa] safeRegisterApplication: app '${config.name}' already registered, skipping.`);
            return;
        }
        registerApplication(config);
    } catch (err) {
        // single-spa throws an Error with minified message #21 when duplicate registration happens
        const msg = (err && err.message) ? err.message : '';
        if (msg.includes('minified message #21') || msg.includes('There is already an app registered')) {
            console.warn(`[single-spa] safeRegisterApplication caught duplicate registration for '${config.name}', ignoring`);
            return;
        }
        // rethrow unknown errors
        throw err;
    }
}

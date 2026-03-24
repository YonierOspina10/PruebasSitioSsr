import { createApp, h, reactive } from 'vue'; // Import Vue functions for app creation and reactivity
import App from './App.vue'; // Import the main App component
import router from './router'; // Import the router configuration
import { createRouter, createWebHistory } from 'vue-router'; // Import router creation functions
import singleSpaVue from 'single-spa-vue'; // Import single-spa-vue for micro-frontend integration
import { createPinia } from 'pinia'; // Import Pinia for state management
import VueLazyLoad from 'vue3-lazyload'; // Import lazy loading for images
import { createI18n, useI18n } from 'vue-i18n'; // Import i18n for internationalization
import VueCountdown from '@chenfengyuan/vue-countdown'; // Import countdown component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import FontAwesome icon component
import { library } from '@fortawesome/fontawesome-svg-core'; // Import FontAwesome library
import mitt from 'mitt'; // Import mitt for event handling
import './style.css'; // Import global styles
import Zendesk from './zendesk/index'; // Import Zendesk integration
import { useAppcomponentStore } from './stores/AppComponent'; // Import the app component store
import vue3GoogleLogin from 'vue3-google-login'; // Import Google login component
import {
    faFacebook,
    faInstagram,
    faYoutube,
    faTwitter,
    faXTwitter,
    faSkype,
    faTelegram,
    faWhatsapp,
    faTiktok,
    faLinkedin,
    faThreads,
} from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import apiService from './services/ApiService';
import { useGetInfoFirestore } from '../../SitioVersion5/src/composables/useInfoFirestore.ts'; // Import API service
var dataLayer = window.dataLayer || []; // Declarar dataLayer como una variable global
const pinia = createPinia(); // Create a Pinia store instance
const vueRouter = createRouter({
    // Create a Vue Router instance
    history: createWebHistory(import.meta.env.BASE_URL), // Use web history mode for routing
    routes: router.options.routes, // Set routes from the imported router
});

const vueLifecycles = singleSpaVue({
    // Configure single-spa lifecycle methods
    createApp,
    appOptions: {
        render() {
            return h(App); // Render the main App component
        },
    },
    handleInstance(app) {
        let fbTranlation = null;
        /* === Image CDN runtime (vanilla JS, no imports) ========================= */
        function optimizeWindowConfig(opts = {}) {
            const provider    = opts.provider || 'imgix';
            const subdomain   = window.cconfig != undefined && window.cconfig.urlApi != undefined && window.cconfig.urlApi.prefixImg != undefined ? window.cconfig.urlApi.prefixImg : 'images.virtualsoft.tech/m';
            const mobileParams  = opts.mobileParams  || '?auto=format,compress&fit=max&q=70&dpr=2';
            const desktopParams = opts.desktopParams || '?auto=format,compress&fit=max&q=85&dpr=2';

            console.log(subdomain);
            // targets: soporta window.config y/o window.cconfig
            const targets = [];
            if (typeof window !== 'undefined' && window.config)  targets.push(window.config);
            if (typeof window !== 'undefined' && window.cconfig) targets.push(window.cconfig);
            if (!targets.length) return false;

            const isMobile = String(((window.cconfig || window.config || {}).mobileL || '0')) === '1';
            const params   = isMobile ? mobileParams : desktopParams;

            const alreadyOnCdn = (u) => typeof u === 'string' && (
                (provider === 'imgix'      && u.includes(subdomain)) ||
                (provider === 'cloudinary' && u.includes(subdomain)) ||
                (provider === 'cloudflare' && /\/cdn-cgi\/image\//.test(u))
            );

            // Helper to merge query params, preserving existing w/h, etc.
            function mergeImgixParams(existingSearch, defaultsSearch) {
                const existing = new URLSearchParams((existingSearch || '').replace(/^\?/, ''));
                const defaults = new URLSearchParams((defaultsSearch || '').replace(/^\?/, ''));

                // If the URL already contains w/h/dpr/fit/q/auto/fm, we respect it.
                // Otherwise we apply defaults.
                for (const [k, v] of defaults.entries()) {
                    if (!existing.has(k)) existing.set(k, v);
                }

                // Safety: do NOT inject a fixed width globally.
                // If someone accidentally passed `w` in defaults, remove it unless the original had it.
                if (!new URLSearchParams((existingSearch || '').replace(/^\?/, '')).has('w') && defaults.has('w')) {
                    existing.delete('w');
                }
                if (!new URLSearchParams((existingSearch || '').replace(/^\?/, '')).has('h') && defaults.has('h')) {
                    existing.delete('h');
                }

                const qs = existing.toString();
                return qs ? `?${qs}` : '';
            }

            function rewrite(u) {
                if (typeof u !== 'string') return u;
                if (/^(data:|blob:)/i.test(u)) return u;
                try {
                    if (alreadyOnCdn(u)) return u;
                    const url = new URL(u, window.location.origin);
                    if (!/\/m\//.test(url.pathname) || !/\.(png|jpe?g|webp)(\?|$)/i.test(url.pathname)) return u;
                    const imagePath = url.pathname.replace('/m/', '/');
                    const mergedQuery = mergeImgixParams(url.search, params);
                    switch (provider) {
                        case 'imgix':      return `https://${subdomain}${imagePath}${mergedQuery}`;
                        case 'cloudinary': return `https://${subdomain}${imagePath}${mergedQuery}`;
                        case 'cloudflare': {
                            const prefix = opts.cfPrefix || `${url.protocol}//${url.host}`;
                            return `${prefix}/cdn-cgi/image/format=auto/${url.origin}${imagePath}`;
                        }
                        case 'generic':
                        default:           return `${url.origin}${imagePath}${mergedQuery}`;
                    }
                } catch { return u; }
            }
            function walk(obj) {
                if (Array.isArray(obj)) { for (let i=0;i<obj.length;i++){ const v=obj[i]; obj[i]=(v&&typeof v==='object')?walk(v):rewrite(v);} return obj; }
                if (obj && typeof obj === 'object') { Object.keys(obj).forEach((k)=>{ const v=obj[k]; obj[k]=(v&&typeof v==='object')?walk(v):rewrite(v); }); }
                return obj;
            }
            for (const t of targets) walk(t);
            return true;
        }
        function waitForConfigAndOptimize(opts = {}) {
            return new Promise((resolve) => {
                const t0 = Date.now();
                const id = setInterval(() => {
                    if ((typeof window !== 'undefined') && (window.config || window.cconfig)) {
                        clearInterval(id);
                        try { resolve(!!optimizeWindowConfig(opts)); } catch { resolve(false); }
                    } else if (Date.now() - t0 > 5000) { clearInterval(id); resolve(false); }
                }, 20);
            });
        }
        /* === End Image CDN runtime ============================================= */
        /**
         * Fetch translations from Firestore using the composable `useGetInfoFirestore`,
         * convert the returned array into a key/value map, expose it to global config and
         * the app component, and return the resulting map.
         *
         * @returns {Promise<Record<string, string> | null>}
         *   A Promise resolving to a record mapping translation keys to values, or null
         *   when no translations are available or an error occurs.
         */
        async function languajesFirebase() {
            try {
                // Call composable to get translations. It may return an array of items
                // with `key` and `value` properties.
                const firebaseLanguajes = await useGetInfoFirestore(
                    window.cconfig,
                    {},
                    'translations',
                    { useLogin: false, useScope: false }
                );

                // If the response is a non-empty array, reduce it to an array of [key,value]
                // tuples and build an object from those entries.
                if (Array.isArray(firebaseLanguajes) && firebaseLanguajes.length) {
                    const entries = (firebaseLanguajes).reduce(
                        (acc, item) => {
                            // Normalize key and value as strings when present
                            const k = (item && item.key != null) ? String(item.key) : '';
                            const v = (item && item.value != null) ? String(item.value) : '';
                            if (k !== '' && v !== '') acc.push([k, v]);
                            return acc;
                        },
                        []
                    );

                    // Convert array of tuples into an object: { key: value, ... }
                    const firebaseLanguajesObject = Object.fromEntries(entries);

                    // Expose translations globally for later use
                    window.cconfig.firebaseLanguajesMap = firebaseLanguajesObject;

                    // Also attach to the reactive app component if available
                    const ac = app.config.globalProperties.$appComponent;
                    if (ac) ac.firebaseLanguajesMap = firebaseLanguajesObject;

                    // Assign to outer-scope variable used elsewhere and return the object
                    fbTranlation = firebaseLanguajesObject;
                    return firebaseLanguajesObject;
                }

                // No translations found
                return null;
            } catch (err) {
                console.error('languajesFirebase error:', err);
                return null;
            }
        }

        waitForConfigAndOptimize({
            provider: 'imgix',
            subdomain: 'images.virtualsoft.tech/m',
            mobileParams:  '?auto=format,compress&fit=max&q=70&dpr=2',
            desktopParams: '?auto=format,compress&fit=max&q=85&dpr=2',
        });

        /**
         * Invoke languajesFirebase and, when finished, apply the fetched translations
         * to the i18n instance for the current locale.
         *
         * Note: the original condition `if (fbTranlation != null || fbTranlation !== undefined)`
         * always evaluates true when `fbTranlation` is defined. A safer check is `fbTranlation != null`.
         */
        languajesFirebase().then(() => {

            // If translations were loaded, set the messages for the active locale.
            if (fbTranlation != null) {
                let locale = window.cconfig.default_language != undefined
                    ? window.cconfig.default_language
                    : window .cconfig.language.languageDafault;
                i18n.global.setLocaleMessage(locale, fbTranlation);
            }
        });

        // Handle the app instance for configuration
        // Initialize language data if not present
        if (
            window.cconfig == undefined ||
            window.cconfig['languagesData'] == undefined ||
            window.cconfig['languagesData'][window.cconfig.countryL] == undefined
        ) {
            window.cconfig['languagesData'] = {};
            window.cconfig['languagesData'][window.cconfig.countryL] = {};
            window.cconfig['languagesData'][window.cconfig.countryL]['es'] = {};
            window.cconfig['languagesData'][window.cconfig.countryL]['en'] = {};
            window.cconfig['languagesData'][window.cconfig.countryL]['pt'] = {};
            window.cconfig['languagesData'][window.cconfig.countryL]['tr'] = {};
        }
        // Clear mobile language if set to '0'
        if (window.cconfig['mobileL'] !== undefined && window.cconfig['mobileL'] === '0') {
            window.cconfig['mobileL'] = '';
        }
        // Initialize background cards for events
        if (window.cconfig['cards_events'] !== undefined) {
            if (window.cconfig['backgroundCardsTopEvents'] == undefined) {
                window.cconfig['backgroundCardsTopEvents'] = {};
            }
            if (window.cconfig['backgroundCardsTopEvents'][window.cconfig['countryL']] == undefined) {
                window.cconfig['backgroundCardsTopEvents'][window.cconfig['countryL']] = window.cconfig['cards_events'];
            }
            window.cconfig['backgroundCardsTopEvents'][window.cconfig['countryL']] = window.cconfig['cards_events'];
        }
        // Initialize footer copyright information
        if (window.cconfig['footer_'] !== undefined && window.cconfig['copyright'] !== undefined) {
            if (window.cconfig['footer'] == undefined) {
                window.cconfig['footer'] = {};
            }
            if (window.cconfig['footer'][window.cconfig['countryL']] == undefined) {
                window.cconfig['footer'][window.cconfig['countryL']] = {};
            }
            if (window.cconfig['footer'][window.cconfig['countryL']]['copyright'] == undefined) {
                window.cconfig['footer'][window.cconfig['countryL']]['copyright'] =
                    window.cconfig['footer_']['copyright'];
            }
            window.cconfig['footer'][window.cconfig['countryL']]['copyright'] = window.cconfig['footer_']['copyright'];
        }
        // Prepare messages for internationalization
        let messages =
            window.cconfig['not_login'] !== undefined &&
            window.cconfig['not_login'][
                window.cconfig.default_language !== undefined
                    ? window.cconfig.default_language
                    : window.cconfig.language.languageDafault
                ] !== undefined &&
            window.cconfig['not_login'][
                window.cconfig.default_language !== undefined
                    ? window.cconfig.default_language
                    : window.cconfig.language.languageDafault
                ]['translations'] !== undefined
                ? {
                    es: window.cconfig['not_login']['es']['translations'],
                    en: window.cconfig['not_login']['en']['translations'],
                    pt: window.cconfig['not_login']['pt']['translations'],
                    tr: window.cconfig['not_login']['tr'] !== undefined && window.cconfig['not_login']['tr']['translations'] !== undefined ? window.cconfig['not_login']['tr']['translations'] : {},
                }
                : window.cconfig['languagesData'][window.cconfig.countryL];
        try {
            // Set various configuration properties from window.cconfig
            if (window.cconfig.url_site != undefined) {
                window.cconfig.urlSkin = window.cconfig.url_site;
            }
            if (window.cconfig.layout_ != undefined) {
                window.cconfig.layout = window.cconfig.layout_;
            }
            if (window.cconfig.partner_ != undefined) {
                window.cconfig.partner = window.cconfig.partner_;
            }
            if (window.cconfig.favicon_ != undefined) {
                window.cconfig.favicon = window.cconfig.favicon_;
            }
            if (window.contingency != undefined) {
                window.cconfig.contingency = window.contingency;
            }
            // Merge error codes into messages
            if (window['languagesErrorCodes'] !== undefined && window['languagesErrorCodes']['es'] !== undefined) {
                messages['es'] = {
                    ...window['languagesErrorCodes']['es'],
                    ...messages['es'],
                };
            }
            if (window['languagesErrorCodes'] !== undefined && window['languagesErrorCodes']['en'] !== undefined) {
                messages['en'] = {
                    ...window['languagesErrorCodes']['en'],
                    ...messages['en'],
                };
            }
            if (window['languagesErrorCodes'] !== undefined && window['languagesErrorCodes']['pt'] !== undefined) {
                messages['pt'] = {
                    ...window['languagesErrorCodes']['pt'],
                    ...messages['pt'],
                };
            }
            if (window['languagesErrorCodes'] !== undefined && window['languagesErrorCodes']['tr'] !== undefined) {
                messages['tr'] = {
                    ...window['languagesErrorCodes']['tr'],
                    ...messages['tr'],
                };
            }
        } catch (e) {
            console.log(e); // Log any errors encountered during configuration
        }
        // Create i18n instance for internationalization
        let i18n = createI18n({
            locale:
                window.cconfig.default_language !== undefined
                    ? window.cconfig.default_language
                    : window.cconfig.language.languageDafault,
            legacy: false,
            globalInjection: true,
            fallbackLocale:
                window.cconfig.default_language !== undefined
                    ? window.cconfig.default_language
                    : window.cconfig.language.languageDafault,
            messages: messages,
        });
        const emitter = mitt(); // Create an event emitter instance
        app.config.globalProperties.$emitter = () => emitter; // Attach emitter to global properties
        app.use(vueRouter); // Use the router in the app
        app.use(pinia); // Use Pinia for state management
        app.use(i18n); // Use i18n for internationalization
        app.config.globalProperties.$config = () => window.cconfig; // Attach config to global properties
        const clientId = window.cconfig.googleLoginClienId != undefined ? window.cconfig.googleLoginClienId : ''; // Get Google login client ID
        app.use(vue3GoogleLogin, {
            clientId: clientId, // Configure Google login with client ID
        });
        app.config.globalProperties.$appComponent = reactive({
            // Create a reactive app component
            config: window.cconfig,
            mobile: window.cconfig.mobileL,
            country: window.cconfig.countryL,
            partnerG: window.cconfig.partner,
            infoApp: window.infoApp != undefined ? window.infoApp : false, // Flag for app information
            themeSportbook: false,
            casinoEnabled: true,
            liveCasinoEnabled: true,
            virtualesEnabled: true,
            contingency: false,
            lngProd:
                window.cconfig.default_language != undefined
                    ? window.cconfig.default_language
                    : window.cconfig.language.languageDafault,
            gamesListSearch: [],
            jackpotsList: [],
            labelRedirect:
                window.cconfig.labelRedirect != undefined &&
                window.cconfig.labelRedirect[window.cconfig.countryL] != undefined &&
                window.cconfig.labelRedirect[window.cconfig.countryL].active != undefined
                    ? window.cconfig.labelRedirect[window.cconfig.countryL].active
                    : false,
            platformApp: window.cconfig.platformApp != undefined ? window.cconfig.platformApp : 'Other',
            showLabel: true,
            user_test: false,
            setBackgroundType() {
                // Method to set the background type based on configuration
                let found = false;
                if (
                    this.config['backgrounds'] != undefined &&
                    this.config['backgrounds'][this.country] != undefined &&
                    this.config['backgrounds'][this.country][this.lngProd] != undefined &&
                    this.config['backgrounds'][this.country][this.lngProd]['notLogin'] != undefined &&
                    this.config['backgrounds'][this.country][this.lngProd]['notLogin']['backgrounds'] != undefined
                ) {
                    let backgrounds = this.config['backgrounds'][this.country][this.lngProd]['notLogin']['backgrounds'];
                    for (let item of backgrounds) {
                        let type = this.viewActual.split('/')[1];
                        if (item.url != undefined && item.url != '') {
                            if (item.redirect.indexOf(type) > -1 && type != '') {
                                try {
                                    document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                    document.getElementsByTagName('body')[0].style.backgroundImage =
                                        'url(' + item.url + ')';
                                } catch (e) {}
                                found = true;
                                break;
                            }
                        }
                    }
                }
                try {
                    if (!found) {
                        // If no background found, set default background
                        if (this.mobile == '1') {
                            if (this.config.background_mobile != '' && this.config.background_mobile != undefined) {
                                document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                document.getElementsByTagName('body')[0].style.backgroundImage =
                                    'url(' + this.config.background_mobile + ')';
                            } else {
                                if (
                                    this.config.backgroundMobileDefault != '' &&
                                    this.config.backgroundMobileDefault != undefined &&
                                    this.config.backgroundMobileDefault[appComponent.country] != undefined &&
                                    this.viewActual != '/banner-right' &&
                                    this.viewActual != '/banner-rightnl' &&
                                    this.viewActual != '/banner-left' &&
                                    this.viewActual != '/banner-leftnl'
                                ) {
                                    document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                    document.getElementsByTagName('body')[0].style.backgroundImage =
                                        'url(' + this.config.backgroundMobileDefault[appComponent.country] + ')';
                                } else {
                                    if (
                                        this.config.backgroundMobileDefault != '' &&
                                        this.config.backgroundMobileDefault != undefined &&
                                        this.viewActual != '/banner-right' &&
                                        this.viewActual != '/banner-rightnl' &&
                                        this.viewActual != '/banner-left' &&
                                        this.viewActual != '/banner-leftnl'
                                    ) {
                                        document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                        document.getElementsByTagName('body')[0].style.backgroundImage =
                                            'url(' + this.config.backgroundMobileDefault + ')';
                                    }
                                }
                            }
                        } else {
                            if (this.config.backgroundDefault != undefined && this.config.backgroundDefault != '') {
                                document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                document.getElementsByTagName('body')[0].style.backgroundImage =
                                    'url(' + this.config.backgroundDefault + ')';
                            } else if (
                                this.config.backgroundDefault != undefined &&
                                this.config.backgroundDefault[appComponent.country] != undefined &&
                                this.config.backgroundDefault[appComponent.country] != ''
                            ) {
                                document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                document.getElementsByTagName('body')[0].style.backgroundImage =
                                    'url(' + this.config.backgroundDefault[appComponent.country] + ')';
                            } else if (
                                this.config.background_desktop != undefined &&
                                this.config.background_desktop != ''
                            ) {
                                document.getElementsByTagName('body')[0].style.backgroundZize = 'contain';
                                document.getElementsByTagName('body')[0].style.backgroundImage =
                                    'url(' + this.config.background_desktop + ')';
                            }
                        }
                    }
                    // Remove background image for specific views
                    if (
                        this.viewActual == '/banner-topcenternl' ||
                        this.viewActual == '/banner-right' ||
                        this.viewActual == '/banner-rightnl' ||
                        this.viewActual == '/banner-left' ||
                        this.viewActual == '/banner-leftnl' ||
                        this.viewActual == '/banner-topcenter' ||
                        this.viewActual == '/banner-rightnl' ||
                        this.viewActual == '/banner-leftnl' ||
                        this.viewActual == '/banner-topcenternl'
                    ) {
                        document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
                    }
                } catch (e) {}
            },
            switchFirst() { // Function to switch the first box
                this.boxes.push(this.boxes[0]); // Move first box to the end
                this.boxes.shift(); // Remove first box
                this.moving = false; // Reset moving flag
            },
            moveLeft() { // Function to move boxes left
                this.moving = true; // Set moving flag
                const vthis = this;
                setTimeout(function () {
                    if (vthis.boxes.length > 0) {
                        vthis.switchFirst(); // Switch first box if available
                    }
                }, 3000); // Delay for 3 seconds
            },
            onWSPartnerCountry() {
                // Method to handle WebSocket connection for partner country updates
                if (
                    appComponent.config !== undefined &&
                    appComponent.config.urlApi !== undefined &&
                    appComponent.config.urlApi.ws2 !== undefined
                ) {
                    try {
                        let wsPartnerCountry = new WebSocket(
                            appComponent.config.urlApi.ws2.replace(
                                'CHANNELID',
                                `${appComponent.partnerG}_${appComponent.country}`,
                            ),
                        );
                        wsPartnerCountry.onopen = () => {
                            console.log('Partner Country socket has been opened!'); // Log when socket opens
                        };
                        wsPartnerCountry.onclose = () => {
                            appComponent.onWSPartnerCountry(); // Reconnect on close
                        };
                        wsPartnerCountry.onmessage = (message) => {
                            listenerWs(JSON.parse(message.data)); // Handle incoming messages
                        };
                        function listenerWs(message) {
                            // Function to process WebSocket messages
                            switch (message.type) {
                                case 'updateDom': {
                                    // Update DOM based on message data
                                    const data = message.data || {};
                                    if (data) {
                                        for (const [id, value] of Object.entries(data)) {
                                            const element = document.getElementById(id);
                                            if (id.includes('jackpot')) {
                                                // Special handling for jackpot elements
                                                const sportBookElement = document.getElementById('SportBook');
                                                let elementShadow;
                                                if (
                                                    sportBookElement !== null &&
                                                    sportBookElement.childNodes[0] !== null
                                                ) {
                                                    const element = sportBookElement.childNodes[0];
                                                    if (element && element.shadowRoot) {
                                                        const shadow = element.shadowRoot;
                                                        if (
                                                            shadow &&
                                                            shadow.lastChild !== null &&
                                                            shadow.querySelector('div').lastChild !== null
                                                        ) {
                                                            elementShadow = shadow.querySelector('div').lastChild;
                                                        }
                                                    }
                                                }
                                                if (element) {
                                                    element.textContent = new Intl.NumberFormat('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })
                                                        .format(value)
                                                        .toString();
                                                }
                                                if (elementShadow) {
                                                    const element2 = elementShadow.querySelector(`#${id}`);
                                                    if (element2) {
                                                        element2.textContent = new Intl.NumberFormat('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                            .format(value)
                                                            .toString();
                                                    }
                                                }
                                            } else if (element) {
                                                element.textContent = value; // Update element text content
                                            }
                                        }
                                    }
                                    break;
                                }
                                case 'getJackpots': {
                                    // Update jackpots list
                                    appComponent.jackpotsList = message.data || [];
                                    break;
                                }
                            }
                            const data2 = message.data || {};
                            if (data2) {
                                if (message.data.logout != undefined) {
                                    // Handle logout message
                                    if (window.ws != undefined) {
                                        window.ws.close(); // Close existing WebSocket
                                    }
                                    apiService.request('logout', {}).then((response) => {
                                        if (response.code == 0) {
                                            appComponent.tokenSB = '';
                                            appComponent.session = {
                                                // Reset session data
                                                grupo: '',
                                                logueado: false,
                                                usuario: '',
                                                id_user: '',
                                                nombre: '',
                                                pais: '',
                                                pais_nom: '',
                                                pais_id: null,
                                                moneda: '',
                                                simbolo_moneda: '',
                                                moneda_nom: '',
                                                idioma: '',
                                                utc: '',
                                                token: '',
                                                req_cheque: '',
                                                req_doc: '',
                                                fecha_crea: '',
                                                fecha_actualizacion: '',
                                                origen: '',
                                                city: '',
                                                departament: '',
                                                gender: '',
                                                casino_enabled: '',
                                                verifcedula_ant: '',
                                                verifcedula_post: '',
                                                verifcedula_ant_paprob: '',
                                                verifcedula_post_paprob: '',
                                                wallet: '',
                                                last_login_date: null,
                                                last_login_ip: '',
                                                cedula: '',
                                                celular: '',
                                                fecha_nacim: '',
                                                iframemini_bannerleft: '',
                                                iframemini_bannerright: '',
                                                verifcelular: '',
                                                update_password: false,
                                                user_verification: false,
                                                formSplaft: 'N',
                                                paternal_last_name: '',
                                                mother_last_name: '',
                                                email: '',
                                                phone: '',
                                                doc_type: '',
                                                nationalityid: '',
                                                first_name: '',
                                                identification: '',
                                            };
                                            apiService.setAuthToken(''); // Clear auth token
                                            try {
                                                window.altenarWSDK.set({ token: '' }); // Reset Altenar SDK token
                                            } catch (e) {}
                                            window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
                                            appComponent.tokenUser = '';
                                        }
                                    });
                                    appComponent.tokenSB = '';
                                    appComponent.session = {
                                        // Reset session data again
                                        grupo: '',
                                        logueado: false,
                                        usuario: '',
                                        id_user: '',
                                        nombre: '',
                                        pais: '',
                                        pais_nom: '',
                                        pais_id: null,
                                        moneda: '',
                                        simbolo_moneda: '',
                                        moneda_nom: '',
                                        idioma: '',
                                        utc: '',
                                        token: '',
                                        req_cheque: '',
                                        req_doc: '',
                                        fecha_crea: '',
                                        fecha_actualizacion: '',
                                        origen: '',
                                        city: '',
                                        departament: '',
                                        gender: '',
                                        casino_enabled: '',
                                        verifcedula_ant: '',
                                        verifcedula_post: '',
                                        verifcedula_ant_paprob: '',
                                        verifcedula_post_paprob: '',
                                        wallet: '',
                                        last_login_date: null,
                                        last_login_ip: '',
                                        cedula: '',
                                        celular: '',
                                        fecha_nacim: '',
                                        iframemini_bannerleft: '',
                                        iframemini_bannerright: '',
                                        update_password: false,
                                        user_verification: false,
                                        formSplaft: 'N',
                                        paternal_last_name: '',
                                        mother_last_name: '',
                                        email: '',
                                        phone: '',
                                        doc_type: '',
                                        nationalityid: '',
                                        first_name: '',
                                        identification: '',
                                    };
                                    apiService.setAuthToken(''); // Clear auth token again
                                    appComponent.tokenUser = '';
                                    window.localStorage.removeItem('auth_token'); // Remove auth token from local storage again
                                    if (appComponent.config.versionAltenar == '2') {
                                        window.location.href = '/'; // Redirect to home if version is 2
                                    }
                                    router.push('/'); // Navigate to home route
                                    setTimeout(() => {}, 1000); // Delay for 1 second
                                }
                                if (message.data.messages != undefined) {
                                    // Handle incoming messages
                                    message.data.messages.forEach(function (element) {
                                        appComponent.modalAlert.unshift({
                                            type: 'notification',
                                            message: emojify.replace(element.body), // Replace emojis in message body
                                        });
                                    });
                                }
                                if (message.data.NotificationBalance != undefined) {
                                    // Update notification balance
                                    appComponent.notificationsToast = message.data.NotificationBalance;
                                }
                                if (message.data.boxes != undefined) {
                                    // Update boxes data
                                    if (JSON.stringify(message.data.boxes) != appComponent.boxesOrig) {
                                        appComponent.boxesOrig = JSON.stringify(message.data.boxes);
                                        if (
                                            message.data.boxes != undefined &&
                                            message.data.boxes != null &&
                                            message.data.boxes.length > 0
                                        ) {
                                            appComponent.boxes = message.data.boxes;
                                            appComponent.boxes.forEach((item) => {
                                                item.title = window.emojify ? window.emojify.replace(item.title) : item.title; // Replace emojis in box titles
                                            });
                                            setInterval(function () {
                                                appComponent.moveLeft(); // Move boxes left every 5 seconds
                                            }, 5000);
                                        }
                                    }
                                }
                                if (message.data.bannerInv != undefined && message.data.bannerInv != '') {
                                    // Handle banner invitations
                                    if (JSON.stringify(message.data.bannerInv) != appComponent.bannerInvOrig) {
                                        appComponent.bannerInvOrig = JSON.stringify(message.data.bannerInv);
                                        appComponent.bannerInv = [];
                                        appComponent.bannerInv2 = message.data.bannerInv;
                                        var style1 =
                                            '<style>table, div, .u_content_text {min-width: auto !important;}</style>';
                                        appComponent.bannerInv2[2] = style1.concat(appComponent.bannerInv2[2]);
                                        if (
                                            appComponent.bannerInv2[5] !== '' &&
                                            appComponent.bannerInv2[6] !== 'isMessage'
                                        ) {
                                            if (
                                                appComponent.bannerInv2[7] !== '' &&
                                                appComponent.bannerInv2[7] !== undefined
                                            ) {
                                                let template =
                                                    '<div class="contenedor-banner-pet">' +
                                                    '<div class="tittle-destacado">' +
                                                    appComponent.bannerInv2[7] +
                                                    '</div>' +
                                                    '<div class="hidden" style="width: 430px; height: 263px;">' +
                                                    '<div class="close alert-container">' +
                                                    '<i class="fa fa-times"></i>' +
                                                    '</div>' +
                                                    '<div class="expand alert-container">' +
                                                    '<i class="fa fa-expand"></i>' +
                                                    '</div>' +
                                                    '<div class="body" style="width: 100%; height: 100%;">' +
                                                    '<a id="juego-iframe" href="' +
                                                    appComponent.bannerInv2[5] +
                                                    '">' +
                                                    '<iframe style="width: 100%; height: 100%;" src="' +
                                                    appComponent.bannerInv2[5] +
                                                    '" frameborder="0" allowfullscreen=""></iframe>' +
                                                    '</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                    '<button type="button" aria-hidden="true" class="mr-[85px]" data-notify="dismiss">×</button>' +
                                                    '<img data-notify="icon" class="img-circle pull-left" src="' +
                                                    appComponent.bannerInv2[0] +
                                                    '">' +
                                                    '<span class="alert-container close" >' +
                                                    '<a target="' +
                                                    appComponent.bannerInv2[4] +
                                                    '" data-notify="url" href="' +
                                                    appComponent.bannerInv2[3] +
                                                    '" class="pet-menssage">' +
                                                    '<span data-notify="title">' +
                                                    '<div>' +
                                                    appComponent.bannerInv2[1] +
                                                    '</div>' +
                                                    '</span>' +
                                                    '<span data-notify="message">' +
                                                    '<div>' +
                                                    appComponent.bannerInv2[2] +
                                                    '</div>' +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>' +
                                                    '</div>' +
                                                    '</div>';
                                                appComponent.modal = {
                                                    showModal: 'banner',
                                                    messageModal: template,
                                                };
                                            } else {
                                                let template =
                                                    '<div class="contenedor-banner-pet">' +
                                                    '<div class="hidden" style="width: 430px; height: 263px;">' +
                                                    '<div class="close alert-container">' +
                                                    '<i class="fa fa-times"></i>' +
                                                    '</div>' +
                                                    '<div class="expand alert-container">' +
                                                    '<i class="fa fa-expand"></i>' +
                                                    '</div>' +
                                                    '<div class="body" style="width: 100%; height: 100%;">' +
                                                    '<a id="juego-iframe" lightbox="iframe" href="' +
                                                    appComponent.bannerInv2[5] +
                                                    '">' +
                                                    '<iframe style="width: 100%; height: 100%;" src="' +
                                                    appComponent.bannerInv2[5] +
                                                    '" frameborder="0" allowfullscreen=""></iframe>' +
                                                    '</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' +
                                                    appComponent.bannerInv2[0] +
                                                    '" role="alert">' +
                                                    '<button  id="closeBannerInv" type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                    '<img data-notify="icon" class="img-circle pull-left" src="' +
                                                    appComponent.bannerInv2[0] +
                                                    '">' +
                                                    '<span class="alert-container close" >' +
                                                    '<a target="' +
                                                    appComponent.bannerInv2[4] +
                                                    '" data-notify="url" href="' +
                                                    appComponent.bannerInv2[3] +
                                                    '" class="pet-menssage">' +
                                                    '<span data-notify="title">' +
                                                    '<div>' +
                                                    appComponent.bannerInv2[1] +
                                                    '</div>' +
                                                    '</span>' +
                                                    '<span data-notify="message">' +
                                                    '<div>' +
                                                    appComponent.bannerInv2[2] +
                                                    '</div>' +
                                                    '</span>' +
                                                    '</a>' +
                                                    '</span>' +
                                                    '</div>' +
                                                    '</div>';
                                                appComponent.modal = {
                                                    showModal: 'banner',
                                                    messageModal: template,
                                                };
                                            }
                                        } else {
                                            if (
                                                appComponent.bannerInv2[5] === '' &&
                                                appComponent.bannerInv2[6] !== 'isMessage'
                                            ) {
                                                if (appComponent.bannerInv2[7] !== '') {
                                                    let template =
                                                        '<div class="contenedor-banner-pet hidde">' +
                                                        '<div class="tittle-destacado">' +
                                                        appComponent.bannerInv2[7] +
                                                        '</div>' +
                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                        '<img data-notify="icon" class="img-circle pull-left" src="' +
                                                        appComponent.bannerInv2[0] +
                                                        '">' +
                                                        '<span class="alert-container" >' +
                                                        '<a target="' +
                                                        appComponent.bannerInv2[4] +
                                                        '" data-notify="url" href="' +
                                                        appComponent.bannerInv2[3] +
                                                        '" class="pet-menssage">' +
                                                        '<span data-notify="title">' +
                                                        '<div>' +
                                                        appComponent.bannerInv2[1] +
                                                        '</div>' +
                                                        '</span>' +
                                                        '<span data-notify="message">' +
                                                        '<div>' +
                                                        appComponent.bannerInv2[2] +
                                                        '</div>' +
                                                        '</span>' +
                                                        '</a>' +
                                                        '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    appComponent.modal = {
                                                        showModal: 'banner',
                                                        messageModal: template,
                                                    };
                                                } else {
                                                    let template =
                                                        '<div class="contenedor-banner-pet hidde">' +
                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' +
                                                        appComponent.bannerInv2[0] +
                                                        '" role="alert">' +
                                                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                        '<img data-notify="icon" class="img-circle pull-left" src="' +
                                                        appComponent.bannerInv2[0] +
                                                        '">' +
                                                        '<span class="alert-container" >' +
                                                        '<a target="' +
                                                        appComponent.bannerInv2[4] +
                                                        '" data-notify="url" href="' +
                                                        appComponent.bannerInv2[3] +
                                                        '" class="pet-menssage">' +
                                                        '<span data-notify="title">' +
                                                        '<div>' +
                                                        appComponent.bannerInv2[1] +
                                                        '</div>' +
                                                        '</span>' +
                                                        '<span data-notify="message">' +
                                                        '<div>' +
                                                        appComponent.bannerInv2[2] +
                                                        '</div>' +
                                                        '</span>' +
                                                        '</a>' +
                                                        '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    appComponent.modal = {
                                                        showModal: 'banner',
                                                        messageModal: template,
                                                    };
                                                }
                                            } else {
                                                if (appComponent.bannerInv2[6] === 'isMessage') {
                                                    let template =
                                                        '<div class="contenedor-banner">' +
                                                        '<div class="message-contain">' +
                                                        '<span class="alert-container close relative inline-block">' +
                                                        '<button class="absolute -top-2 -right-1 bg-primary text-neutral border-none rounded-full w-8 h-8 flex items-center justify-center shadow-lg" onclick="document.querySelector(\'.modal\').style.display = \'none\'">X</button>' +
                                                        '<a target="' +
                                                        appComponent.bannerInv2[4] +
                                                        "\" onclick=\"clickGA('Banner Inv','Click Content','','0');\" data-notify=\"url\" href=\"" +
                                                        appComponent.bannerInv2[3] +
                                                        '" class="menssage">' +
                                                        '<span data-notify="message">' +
                                                        '<div>' +
                                                        appComponent.bannerInv2[2] +
                                                        '</div>' +
                                                        '</span>' +
                                                        '<img data-notify="icon" class="w-[50%] inline-block float-right" src="' +
                                                        appComponent.bannerInv2[0] +
                                                        '">' +
                                                        '</a>' +
                                                        '</span>' +
                                                        '<div>' +
                                                        '<button href="' +
                                                        appComponent.bannerInv2[3] +
                                                        '" type="button" class="action-banner bg-primary text-neutral">' +
                                                        '<a href="' +
                                                        appComponent.bannerInv2[3] +
                                                        '">' +
                                                        appComponent.bannerInv2[1] +
                                                        '</a>' +
                                                        '</button>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                                    appComponent.modal = {
                                                        showModal: 'banner',
                                                        messageModal: template,
                                                    };
                                                }
                                            }
                                        }
                                    }
                                }
                                if (message.data.quiskTokenBet != undefined) {
                                    // Handle Quisk token betting
                                    if (document.getElementById('quiskForm') != undefined) {
                                    }
                                    var f = document.createElement('form'); // Create a form for betting
                                    f.setAttribute('name', 'quiskForm');
                                    f.setAttribute('id', 'quiskForm');
                                    f.setAttribute('method', 'post');
                                    f.setAttribute('action', appComponent.config.QuiskUrlBetting);
                                    var i = document.createElement('input');
                                    i.setAttribute('type', 'text');
                                    i.setAttribute('name', 'merchantKey');
                                    i.setAttribute('value', appComponent.config.QuiskMerchantKey);
                                    i.setAttribute('hidden', 'true');
                                    var refId = document.createElement('input');
                                    refId.setAttribute('type', 'text');
                                    refId.setAttribute('name', 'refId');
                                    refId.setAttribute('value', message.data.quiskTokenBet.userId);
                                    refId.setAttribute('hidden', 'true');
                                    f.appendChild(refId);
                                    var phone = document.createElement('input');
                                    phone.setAttribute('type', 'text');
                                    phone.setAttribute('name', 'phone');
                                    phone.setAttribute('value', message.data.quiskTokenBet.phone);
                                    phone.setAttribute('hidden', 'true');
                                    f.appendChild(phone);
                                    var amount = document.createElement('input');
                                    amount.setAttribute('type', 'text');
                                    amount.setAttribute('name', 'amount');
                                    amount.setAttribute('value', message.data.quiskTokenBet.amount);
                                    amount.setAttribute('hidden', 'true');
                                    f.appendChild(amount);
                                    var currency = document.createElement('input');
                                    currency.setAttribute('type', 'text');
                                    currency.setAttribute('name', 'currency');
                                    currency.setAttribute('value', message.data.quiskTokenBet.currency);
                                    currency.setAttribute('hidden', 'true');
                                    f.appendChild(currency);
                                    var s = document.createElement('input');
                                    s.setAttribute('type', 'submit');
                                    s.setAttribute('value', 'Submit');
                                    s.setAttribute('hidden', 'true');
                                    f.appendChild(i);
                                    f.appendChild(s);
                                    try {
                                        document.getElementsByTagName('body')[0].appendChild(f); // Append form to body
                                    } catch (e) {}
                                    if (
                                        document.getElementById('quiskForm') !== undefined &&
                                        document.getElementById('quiskForm') !== null
                                    ) {
                                        document.getElementById('quiskForm')?.setAttribute('target', 'login');
                                        document
                                            .getElementById('quiskForm')
                                            ?.setAttribute('action', appComponent.config.QuiskUrlBetting);
                                    }
                                    window.open('', 'login', 'width=500,height=550,toolbar=-100'); // Open new window for login
                                    var quiskForm = document.getElementById('quiskForm');
                                    quiskForm.submit(); // Submit the form
                                }
                                if (message.data && message.data.data) {
                                    // Handle additional data
                                    let parseRoulette = JSON.parse(message.data.data);
                                    if (parseRoulette.roulette !== undefined && parseRoulette.roulette.length > 0) {
                                        appComponent.roulette = parseRoulette.roulette[0]; // Update roulette data
                                    }
                                }
                                if (message.data.depositPopup != undefined && message.data.depositPopup.length > 0) {
                                    // Handle deposit popup
                                    appComponent.modal = {
                                        showModal: 'promotiondeposit',
                                        messageModal: {
                                            imgPromotion: message.data.depositPopup[0].imgPromotion,
                                            textButton: message.data.depositPopup[0].textButton,
                                            imgDecoration: message.data.depositPopup[0].imgDecoration,
                                            urlButton: message.data.depositPopup[0].urlButton,
                                        },
                                    };
                                }
                                if (message.data.loyalty_price != undefined && message.data.loyalty_price.length > 0) {
                                    // Handle loyalty price updates
                                    appComponent.array_loyalty_price = message.data.loyalty_price;
                                    appComponent.loyalty_price = message.data.loyalty_price[0];
                                    apiService
                                        .request('read_user_message', {
                                            message_id: appComponent.loyalty_price['uid'],
                                        })
                                        .then((r) => console.log(r));
                                }
                                if (message.data.loyalty_popup != undefined && message.data.loyalty_popup.length > 0) {
                                    // Handle loyalty popup updates
                                    message.data.loyalty_popup.forEach((input_template) => {
                                        var dateP = new Date(input_template.date);
                                        dateP.setSeconds(dateP.getSeconds() + 30);
                                        input_template.date = appComponent.datePipe.transform(
                                            dateP,
                                            'MMM d, y, h:mm:ss a',
                                        );
                                    });
                                    if (
                                        message.data.loyalty_popup != undefined &&
                                        message.data.loyalty_popup.length > 0
                                    ) {
                                        appComponent.array_loyalty_popup = message.data.loyalty_popup;
                                        appComponent.loyalty_popup = message.data.loyalty_popup[0];
                                    }
                                }
                                if (message.data.redirectUrl != undefined) {
                                    // Handle redirect URL
                                    window.location.href = message.data.redirectUrl;
                                }
                                if (message.data.action != undefined && message.data.action != '') {
                                    // Handle programmable actions
                                    console.log('modalSocket:', message.data.action);
                                    appComponent.modalV2 = {
                                        showModal: 'programmable',
                                        messageModal: message.data.action,
                                    };
                                }
                                if (message.data.id_notification != undefined) {
                                    // Update notification status
                                    let params = {
                                        id_notification: message.data.id_notification,
                                    };
                                    apiService.request('update_status_notification', params).then((response) => {
                                        if (response.code != 0) {
                                            return false;
                                        }
                                    });
                                }
                            }
                        }
                    } catch (e) {
                        appComponent.onWSPartnerCountry(); // Reconnect on error
                    }
                }
            },
            gAnalytics(EventTicket, item) {
                // Check if EventTicket and item are valid strings
                if (typeof EventTicket == 'string' && typeof item == 'string' && EventTicket != undefined && item != undefined) {
                    // Add labels to APM for tracking
                    appComponent.apm.addLabels({ buttonId: EventTicket + '-' + item });
                }
                // Check if Google Analytics configuration is enabled
                if (appComponent.config.gAnalytics != undefined && appComponent.config.gAnalytics && (window.dataLayer !== undefined)) {
                    // Handle different event types based on EventTicket
                    switch (EventTicket) {
                        case 'change_theme_color_dark':
                            // Push event for change theme color dark
                            dataLayer.push({ 'event': 'change_theme_color_dark' });
                            break;
                        case 'change_theme_color_ligth':
                            // Push event for change theme color ligth
                            dataLayer.push({ 'event': 'change_theme_color_ligth' });
                            break;
                        case 'withdrawal_new':
                            // Push event for new withdrawal view
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Mi cuenta',
                                'EventoEtiqueta': '9.3 Retirar - Nueva Visual',
                            });
                            break;
                        case 'successful_withdrawal_new':
                            // Push event for successful new withdrawal
                            dataLayer.push({
                                'event': 'successful_withdrawal_new',
                                'withdrawType': item.type,
                                'value': item.value,
                            });
                            break;
                        case 'withdrawal_old':
                            // Push event for old withdrawal view
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Mi cuenta',
                                'EventoEtiqueta': '9.4 Retirar - Visual Antigua',
                            });
                            break;
                        case 'successful_withdrawal_old':
                            // Push event for successful old withdrawal
                            dataLayer.push({
                                'event': 'successful_withdrawal_old',
                                'withdrawType': item.type,
                                'value': item.value,
                            });
                            break;
                        case 'cancel_withdrawal_new':
                            // Push event for canceling new withdrawal
                            dataLayer.push({
                                event: 'event_click',
                                'EventoCategoria': '9. Mi cuenta',
                                'EventoEtiqueta': '9.6 Anular retiro - Visual nueva',
                            });
                            break;
                        case 'button_social_network':
                            // Push event for social network button click
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.1 RRSS - ' + item.SOCIAL_NAME,
                            });
                            break;
                        case 'language_selector':
                            // Push event for language selector interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.2 Selector de idioma – ' + item,
                            });
                            break;
                        case 'send_mail':
                            // Push event for sending mail
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.3 Mensajes',
                            });
                            break;
                        case 'deposit_profile':
                            // Push event for depositing profile
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.4 Depositar Perfil',
                            });
                            break;
                        case 'profile_balance':
                            // Push event for profile balance check
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.5 Saldo Perfil',
                            });
                            break;
                        case 'exit_profile':
                            // Push event for exiting profile
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.6 Salir Perfil',
                            });
                            break;
                        case 'menu_top':
                            // Push event for top menu interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Menu',
                                'EventoEtiqueta': '1.7 TopMenu - ' + item,
                            });
                            break;
                        case 'interaction_carrusel':
                            // Push event for carousel interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Banners',
                                'EventoEtiqueta': '1.8 Carrusel - ' + item,
                            });
                            break;
                        case 'sub_menu':
                            // Push event for submenu interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Submenu',
                                'EventoEtiqueta': '1.9 SubMenu - ' + item.MENU_ID,
                            });
                            break;
                        case 'payment_methods':
                            // Push event for payment methods interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.10 Medios de pago – ' + item.NAME,
                            });
                            break;
                        case 'promotion_interaction':
                            // Push event for promotion interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Banners',
                                'EventoEtiqueta': '1.11 Promocion - ' + item,
                            });
                            break;
                        case 'android_download':
                            // Push event for Android app download
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Descargapp',
                                'EventoEtiqueta': '1.12 Disponible en Android',
                            });
                            break;
                        case 'ios_download':
                            // Push event for iOS app download
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Descargappios',
                                'EventoEtiqueta': '1.12 Disponible en IOS',
                            });
                            break;
                        case 'pronter':
                            // Push event for pronter interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.13 Pronter',
                            });
                            break;
                        case 'club_de_oro':
                            // Push event for club de oro interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.14 Club de oro',
                            });
                            break;
                        case 'attemp_bet':
                            // Push event for attempting a bet
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Eventos top',
                                'EventoEtiqueta': '1.15 Evento top – ' + item,
                            });
                            break;
                        case 'interaction_chat':
                            // Push event for chat interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.16 Chat',
                            });
                            break;
                        case 'interaction_footer':
                            // Push event for footer interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.17 ' + item.section + ' - ' + item.element,
                            });
                            break;
                        case 'interaction_store':
                            // Push event for store interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '1. Home',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '1.18 Tienda de premios',
                            });
                            break;
                        case 'category_sportbook':
                            // Push event for sports book category interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '2. Pronósticos Deportivos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '2.1 Categoría - ' + item,
                            });
                            break;
                        case 'access_interaction':
                            // Push event for quick access interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '2. Pronósticos Deportivos',
                                'EventoTipo': 'Acceso Rápido',
                                'EventoEtiqueta': '2.3 ' + item,
                            });
                            break;
                        case 'access_league':
                            // Push event for accessing league interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '2. Pronósticos Deportivos',
                                'EventoTipo': 'Ligas Principales',
                                'EventoEtiqueta': '2.4 ' + item,
                            });
                            break;
                        case 'card_sportbook':
                            // Push event for opening sports book card
                            dataLayer.push({
                                'event': 'attemp_bet',
                                'EventoCategoria': '2. Pronósticos Deportivos',
                                'EventoTipo': 'Eventos top',
                                'EventoEtiqueta': '2.7 Abrir - ' + item,
                            });
                            break;
                        case 'play_now':
                            // Push event for play now interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.1 Juega Ya – ' + item.nombre,
                            });
                            break;
                        case 'show_view':
                            // Push event for showing/hiding view
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.2 Ver/Ocultar – ' + item.nombre,
                            });
                            break;
                        case 'show_more':
                            // Push event for showing more items
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.3 Ver mas - ' + item.nombre,
                            });
                            break;
                        case 'join':
                            // Push event for joining a tournament
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.3.1 Unirse – ' + item.nombre,
                            });
                            break;
                        case 'conversion_score':
                            // Push event for score conversion
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.3.2 Conversion puntaje – ' + item.nombre,
                            });
                            break;
                        case 'awards':
                            // Push event for awards interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '4. Torneos',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '4.3.3 Premios – ' + item.nombre,
                            });
                            break;
                        case 'category':
                            // Push event for casino category interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '5. Casino',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '5.1 Categoria – ' + item,
                            });
                            break;
                        case 'game_type':
                            // Push event for game type interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '5. Casino',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '5.2 Tipo Juego – ' + item,
                            });
                            break;
                        case 'play_casino':
                            // Push event for playing casino game
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '5. Casino' + (item.action ? ' - ' + item.action : ''),
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '5.3 Juegue Ahora – ' + item.name,
                            });
                            break;
                        case 'category_casino':
                            // Push event for live casino category interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '6. Casino En Vivo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '6.1 Categoria - ' + item,
                            });
                            break;
                        case 'category_live':
                            // Push event for live category interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '6. Casino En Vivo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '6.1 Categoria – ' + item,
                            });
                            break;
                        case 'supplier':
                            // Push event for supplier interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '6. Casino En Vivo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '6.2 Proveedor - ' + item,
                            });
                            break;
                        case 'supplier_all':
                            // Push event for all suppliers interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '6. Casino En Vivo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '6.2 Proveedor - ' + item,
                            });
                            break;
                        case 'play_now_live':
                            // Push event for playing live casino game
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '6. Casino En Vivo' + (item.action ? ' - ' + item.action : ''),
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '6.3 Juegue Ahora - ' + item.name,
                            });
                            break;
                        case 'show_lottery':
                            // Push event for showing lottery
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '7. Bingo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '7.1 Ver Sorteo - ' + item.name,
                            });
                            break;
                        case 'buy':
                            // Push event for buying lottery ticket
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '7. Bingo',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '7.2 Comprar - ' + item.name,
                            });
                            break;
                        case 'sub_menu_account':
                            // Push event for account submenu interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '9.1 ' + item.SUBMENU_TITLE,
                            });
                            break;
                        case 'deposit':
                            // Push event for deposit action
                            dataLayer.push({
                                'event': 'begin_checkout',
                                'value': item.monto,
                                'currency': item.moneda,
                                'items1': [{
                                    'item_id': item.info.id,
                                    'item_name': 'Depositar - ' + item.info.nombre,
                                }],
                            });
                            break;
                        case 'deposit_accept':
                            // Push event for accepting deposit
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '9.2.1 Depositar - Aceptar',
                            });
                            break;
                        case 'store_awards':
                            // Push event for redeeming awards
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '9.3 Tienda de Premios - Redimir - ' + item.title,
                            });
                            break;
                        case 'cancel_withdrawal':
                            // Push event for canceling withdrawal
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Popup',
                                'EventoEtiqueta': '9.4 Anular retiro',
                            });
                            break;
                        case 'bank_success':
                            // Push event for successful bank addition
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Popup',
                                'EventoEtiqueta': '9.5 Añadir cuenta bancaria',
                                'Banco': item,
                            });
                            break;
                        case 'withdrawal_interaction':
                            // Push event for withdrawal interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Popup',
                                'EventoEtiqueta': '9.6 Retiro - ' + item,
                            });
                            break;
                        case 'bonus_interaction':
                            // Push event for bonus redemption interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Servicios/Gestión',
                                'EventoTipo': 'Popup',
                                'EventoEtiqueta': '9.7 Redimir bono - ' + item,
                            });
                            break;
                        case 'menu_query':
                            // Push event for menu query interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '10. Servicios/Consultas',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '10.3 ' + item.SUBMENU_TITLE,
                            });
                            break;
                        case 'consult_services':
                            // Push event for consulting services
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '10. Servicios/Consultas',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '10.4 Consultar - ' + item,
                            });
                            break;
                        case 'checkbox_older':
                            // Push event for age confirmation checkbox
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '11. Registro',
                                'EventoTipo': 'Checkbox',
                                'EventoEtiqueta': '11.4 Checkbox – Soy Mayor de 18',
                            });
                            break;
                        case 'checkbox_send':
                            // Push event for sending authorization checkbox
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '11. Registro',
                                'EventoTipo': 'Checkbox',
                                'EventoEtiqueta': '11.5 Checkbox – Autorizo el Envio',
                            });
                            break;
                        case 'descarga_app':
                            // Push event for app download start
                            dataLayer.push({ 'event': 'start_download_app' });
                            break;
                        case 'inicio_app':
                            // Push event for app initialization
                            dataLayer.push({ 'event': 'init_app' });
                            break;
                        case 'register':
                            // Push event for successful registration
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '11. Registro',
                                'EventoTipo': 'Registro Exitoso',
                                'EventoEtiqueta': '11.6 Registrate',
                            });
                            break;
                        case 'accept_register':
                            // Push event for accepting registration
                            dataLayer.push({
                                'event': 'signup',
                                'user_id': item.user_id,
                                'first_name': item.data.first_name,
                                'last_name': item.data.last_name,
                                'pais': item.data.countryResident_id?.Name,
                                'provincia': item.data.department_id?.Name,
                                'ciudad': item.data.city_id?.Name,
                                'sexo': item.data.gender,
                                'email': item.data.email,
                                'phone': item.data.phone,
                                'landing': false,
                            });
                            break;
                        case 'popup_register':
                            // Push event for registration popup interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '12. Iniciar Sesion',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '12.1 Registrate',
                            });
                            break;
                        case 'popup_login':
                            // Push event for login popup interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '12. Iniciar Sesion',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '12.2 Acceder',
                            });
                            break;
                        case 'forgot_password':
                            // Push event for forgot password interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '21. Iniciar Sesion',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '12.3 Olvido su contrasena',
                            });
                            break;
                        case 'login_google':
                            // Push event for Google login interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '12. Iniciar Sesion',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '12.4 Ingresar con google',
                            });
                            break;
                        case 'login_facebook':
                            // Push event for Facebook login interaction
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '12. Iniciar Sesion',
                                'EventoTipo': 'Click',
                                'EventoEtiqueta': '12.5 Ingresar con facebook',
                            });
                            break;
                        case 'user_exist':
                            // Push event for non-existent user error
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '20. Errrores',
                                'EventoTipo': 'ERROR Login',
                                'EventoEtiqueta': '20.1 Usuario no Existe',
                            });
                            break;
                        case 'incorret_password':
                            // Push event for incorrect password error
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '20. Errrores',
                                'EventoTipo': 'ERROR Login',
                                'EventoEtiqueta': '20.2 Contrasena Incorrecta',
                            });
                            break;
                        case 'password_locked':
                            // Push event for locked user error
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '20. Errrores',
                                'EventoTipo': 'ERROR Login',
                                'EventoEtiqueta': '20.3 Usuario Bloqueado por Logueos',
                            });
                            break;
                        case 'menu_mobile':
                            // Push event for mobile profile menu opening
                            dataLayer.push({
                                'event': 'event_click',
                                'EventoCategoria': '9. Mi cuenta',
                                'EventoEtiqueta': '9.8 Abrir - Profile Mobile',
                            });
                            break;
                        case 'deposit_success':
                            // Push event for successful deposit
                            dataLayer.push({ 'event': 'deposit-success', 'value': item });
                            break;
                        case 'successful_register_agent':
                            // Push event for successful agent registration
                            dataLayer.push({ 'event': 'successful_register_agent' });
                            break;
                        case 'api_send_analytics':
                            // Push event for sending analytics data
                            dataLayer.push({ 'event': 'download_app_pwa', 'value': item.partnerG });
                            break;
                    }
                }
            },
            /**
             * Connects to the Pragmatic DGA service and manages table subscriptions.
             * This function dynamically loads the DGA script, connects to the server, and subscribes to available tables.
             */
            connectToDga() {
                /**
                 * Carga un script dinámicamente si aún no existe en el DOM
                 * @param {string} id - ID del script en el DOM
                 * @param {string} url - URL del script a cargar
                 */
                function loadScript(id, url) {
                    if (!document.getElementById(id)) {
                        const script = document.createElement('script');
                        script.id = id;
                        script.src = url;
                        script.onload = () => {
                            const dga = window.dga;
                            if (!dga) return console.error('DGA no se cargó');
                            dga.connect(cfg.serverApi);

                            dga.onConnect = () => {
                                console.log("Conectado al WebSocket de DGA");
                                dga.available(cfg.casinoId);

                            };

                            dga.onMessage = (msg) => {
                                if (msg.tableKey) {
                                    const tables = msg.tableKey;

                                    tables.forEach((tableId) => {
                                        dga.subscribe(cfg.casinoId, tableId, userCurrency);
                                    });
                                } else {
                                    if (!appComponent.dgaDataMap) appComponent.dgaDataMap = {};
                                    appComponent.dgaDataMap[msg.tableId] = msg;
                                }

                            };


                            dga.onError = (err) => {
                                console.error('Error DGA:', err);
                            };

                        };
                        script.onerror = () => {
                            console.error("Error al cargar el script DGA");
                        };
                        document.body.appendChild(script);
                    }
                }

                const cfg = appComponent.config?.pragmaticDgaSettings;
                const userCurrency = appComponent.session?.moneda;

                if (!cfg?.enabled || !cfg.serverApi || !cfg.casinoId) return;

                loadScript('dga-pragmatic', cfg.serverUrl)
            },
        });
        let appComponent = app.config.globalProperties.$appComponent; // Access the reactive app component
        if (window.cconfig.casinoEnabled != undefined) {
            appComponent.casinoEnabled = window.cconfig.casinoEnabled; // Set casino enabled status
        }
        if (window.cconfig.liveCasinoEnabled != undefined) {
            appComponent.liveCasinoEnabled = window.cconfig.liveCasinoEnabled; // Set live casino enabled status
        }
        if (window.cconfig.virtualesEnabled != undefined) {
            appComponent.virtualesEnabled = window.cconfig.virtualesEnabled; // Set virtual games enabled status
        }

        const stored = localStorage.getItem('changeThemeColor');
        if (
            (!stored || stored === '' || (stored !== 'false' && stored !== 'true')) &&
            appComponent.config !== undefined &&
            appComponent.config.defaultTheme !== undefined
        ) {
            if (appComponent.config.defaultTheme === 'dark') {
                localStorage.setItem('changeThemeColor', 'false');
                appComponent.themeSportbook = false;
            } else if (appComponent.config.defaultTheme === 'light') {
                localStorage.setItem('changeThemeColor', 'true');
                appComponent.themeSportbook = true;
            }
        }

        const storeComponent = useAppcomponentStore(); // Access the app component store
        storeComponent.setAppComponent(appComponent); // Set the app component in the store
        try {
            // Load Optimove SDK if configured
            if (
                window.cconfig.optimove !== undefined &&
                window.cconfig.optimove[appComponent.country] !== undefined &&
                window.cconfig.optimove[appComponent.country].tenant_id !== undefined &&
                window.cconfig.optimove[appComponent.country].tenant_token !== undefined
            ) {
                let scriptWorker = document.createElement('script');
                scriptWorker.async = false;
                scriptWorker.src = 'https://static.app.delivery/sdks/web/optimove-worker.js';
                const existingScriptWorker = document.querySelector(`script[src="${scriptWorker.src}"]`);
                if (!existingScriptWorker) {
                    typeof window.runOnceOnFirstInteraction === "function" && window.runOnceOnFirstInteraction(
                        () => {
                            setTimeout(() => {
                                console.log("[Optimove] Cargando script del service worker...");
                                document.head.appendChild(scriptWorker);
                            }, 1000);
                        },
                    )
                    scriptWorker.addEventListener('load', (event) => {
                        let script = document.createElement('script');
                        script.async = false;
                        script.src =
                            'https://sdk.optimove.net/websdk/?tenant_id=' +
                            window.cconfig.optimove[appComponent.country].tenant_id +
                            '&tenant_token=' +
                            window.cconfig.optimove[appComponent.country].tenant_token;
                        script.setAttribute('data-optimove-service-worker-path', '/ol-service-worker-optimove-v1.js');
                        const existingScript = document.querySelector(`script[src="${script.src}"]`);
                        if (!existingScript) {
                            document.head.appendChild(script);
                        }
                    });
                }
            }

        } catch (e) {}
        appComponent.setBackgroundType(); // Set the background type
        appComponent.onWSPartnerCountry(); // Initialize WebSocket connection
        window.addEventListener('load', () => {

            appComponent.connectToDga(); // Connect to Pragmatic DGA service
        });

        app.use(VueLazyLoad, {
            // Configure VueLazyLoad
            loading: '',
            error: '',
            lifecycle: {},
        });
        library.add(
            // Add FontAwesome icons to the library
            faFacebook,
            faInstagram,
            faYoutube,
            faTwitter,
            faSkype,
            faXTwitter,
            faTelegram,
            faWhatsapp,
            faTiktok,
            faLinkedin,
            faThreads,
            faAngleRight,
            faAngleLeft,
        );
        app.component(VueCountdown.name, VueCountdown); // Register VueCountdown component
        app.component('font-awesome-icon', FontAwesomeIcon); // Register FontAwesome icon component

        if (
            appComponent != undefined &&
            appComponent.config != undefined &&
            appComponent.config.zendesk != undefined &&
            appComponent.config.zendesk[appComponent.country] != undefined &&
            window.location.href.indexOf("/banner-leftnl") == -1 &&
            window.location.href.indexOf("/banner-rightnl") == -1 &&
            window.location.href.indexOf("/banner-left") == -1 &&
            window.location.href.indexOf("/banner-right") == -1 &&
            window.location.href.indexOf("/banner-leftnl") == -1 &&
            window.location.href.indexOf("/banner-rightnl") == -1 &&
            window.location.href.indexOf("/banner-topcenternl") == -1 &&
            window.location.href.indexOf("/banner-topcenter") == -1
        ) {
            try {
                if (appComponent.config.zendesk[appComponent.country].name === 'centribal') {
                    const scriptInit = document.createElement('script'); // Create a script element for Centribal
                    scriptInit.setAttribute('src', appComponent.config.zendesk['srcJs'] ? appComponent.config.zendesk['srcJs'] : 'https://cwcentribot.centribal.com/sdk_v1.js'); // Set script source
                    document.querySelector('body')?.appendChild(scriptInit); // Append script to body
                    const div = document.createElement('div'); // Create a div for Centribal iframe
                    div.setAttribute('id', 'centribal_iframe_layout'); // Set ID for the div
                    div.classList.add('centribal_hidden'); // Add hidden class
                    document.querySelector('body')?.appendChild(div); // Append div to body
                    window.addEventListener("message", function(e) { // Listen for messages from the iframe
                        if (e.data.status === "hide") {
                            document.getElementById("centribal_iframe_layout")?.classList.remove("centribal_open"); // Remove open class
                            document.getElementById("centribal_iframe_layout")?.classList.add("centribal_hidden"); // Add hidden class
                        }
                    });
                    typeof window.runOnceOnFirstInteraction === "function" && window.runOnceOnFirstInteraction(
                        () => {
                            setTimeout(() => {
                                console.log("[Centribal] Loading script after first interaction");
                                const script = document.createElement('script'); // Create a script element for Centribal
                                script.setAttribute('id', 'cen_snippet_static'); // Set ID for the script
                                script.setAttribute('control_iframe', ''); // Set control iframe attribute
                                script.setAttribute('src', appComponent.config.zendesk[appComponent.country].key); // Set source if not logged in
                                script.setAttribute('type', 'text/javascript'); // Set script type
                                document.querySelector('body')?.appendChild(script); // Append script to body
                            }, 1000);
                        },
                    )
                }
            }catch (e) {}
        }
    },
});

export const bootstrap = vueLifecycles.bootstrap; // Export bootstrap lifecycle method
export const mount = vueLifecycles.mount; // Export mount lifecycle method
export const unmount = vueLifecycles.unmount; // Export unmount lifecycle method


// FILE DOCUMENTED

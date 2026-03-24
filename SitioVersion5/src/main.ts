import { createApp, reactive, isProxy, toRaw, getCurrentInstance, ref, h, watch } from 'vue'; // Import Vue core functionalities
import { createI18n, useI18n } from 'vue-i18n'; // Import i18n for internationalization support
import { createPinia } from 'pinia'; // Import Pinia for state management
import VueMask from '@devindex/vue-mask'; // Import VueMask for input masking
import App from './App.vue'; // Import the main App component
import router from './router'; // Import the router configuration
import { useGetInfoFirestore } from './composables/useInfoFirestore'; // Import function to get banners data from firestore
import VueLazyLoad from 'vue3-lazyload'; // Import lazy loading for images
import apiService from '@/services/ApiService'; // Import API service for backend communication
import { useCookies } from 'vue3-cookies';
declare var dataLayer: any; // Declare global variable for Google Tag Manager
declare var Prometeo: any; // Declare global variable for Prometeo
declare var PPaymentButtonBox: any; // Declare global variable for payment button box
declare global {
    interface Window {
        hj: any; // Extend Window interface to include 'hj' variable
        countryCode: string; // Country code for localization
        ttq?: { track: (name: string, payload?: any) => void }; // TikTok tracking function
    }
}
import mitt from 'mitt'; // Import mitt for event handling
import VueCountdown from '@chenfengyuan/vue-countdown'; // Import countdown component
import { ApmVuePlugin } from '@elastic/apm-rum-vue'; // Import Elastic APM plugin for Vue
import { apm } from '@elastic/apm-rum'; // Import Elastic APM for performance monitoring
import Zendesk from './zendesk/index'; // Import Zendesk integration
import emojify from 'emojify.js'; // Import emojify for emoji support
emojify.setConfig({
    ignore_emoticons: false, // Configure emojify to not ignore emoticons
    img_dir: '/images/emoji', // Set directory for emoji images
});
import vue3GoogleLogin from 'vue3-google-login'; // Import Google login component
import VueSocialSharing from 'vue-social-sharing'; // Import social sharing component
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import store for app components
import './assets/flags.css'; // Import CSS for flags
import './index.css'; // Import main CSS file
import 'flowbite'; // Import Flowbite for UI components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import FontAwesome icon component
import { library } from '@fortawesome/fontawesome-svg-core'; // Import FontAwesome library
import {
    faBell,
    faClose,
    faPlay,
    faGear,
    faClock,
    faUser,
    faSignOutAlt,
    faChevronDown,
    faChevronUp,
    faSliders,
    faCircleCheck,
    faEye,
    faMars,
    faVenus,
    faIdCard,
    faMobile,
    faEnvelope,
    faKey,
    faRefresh,
    faCheck,
    faLocationDot,
    faArrowLeft,
    faMoneyCheckDollar,
    faLock,
    faUnlock,
    faCalendar,
    faRectangleAd,
    faAngleRight,
    faAngleLeft,
    faPlus,
    faXmark,
    faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons'; // Import solid icons from FontAwesome
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
} from '@fortawesome/free-brands-svg-icons'; // Import brand icons from FontAwesome
import ModalUpdateData from '@/components/modals/ModalUpdateData.vue'; // Import modal component for updating data
import modal from '@/components/modals/Modal.vue'; // Import generic modal component
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router for routing
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import singleSpaVue from 'single-spa-vue'; // Import Single SPA for micro-frontend architecture
import iconCheckv2Rounde from '@/components/icons/IconCheckv2Rounde.vue'; // Import custom icon component
import { array } from 'yup'; // Import array validation from Yup
import ApiService from '@/services/ApiService'; // Import API service again for consistency
import { nextTick } from 'vue';

function safeParseMaybeJson(input: any): any {
    if (input === null || input === undefined) return null;
    if (typeof input === 'object') return input;
    if (typeof input === 'string') {
        const s = input.trim();
        if (s === '') return null;
        try {
            return JSON.parse(s);
        } catch (err) {
            return null;
        }
    }
    return input;
}

// PREVIEW BOOTSTRAP RESOLUTION
const urlParams = new URLSearchParams(window.location.search);
const isPreview = urlParams.get('preview') === 'true';

if (isPreview) {
    console.log('[PREVIEW MODE] Activado');

    (window as any).__IS_PREVIEW__ = true;
    (window as any).cconfig = (window as any).cconfig || {};

    const cconfig = (window as any).cconfig;
    cconfig.isPreviewMode = true;
    const partnerId = urlParams.get('partnerId') || urlParams.get('partnerid');
    if (partnerId) {
        cconfig.partner_ = String(partnerId);
        console.log('[PREVIEW] partner_', cconfig.partner_);
    }
    const layout = urlParams.get('layout');
    if (layout) {
        cconfig.layout_ = Number(layout);
        console.log('[PREVIEW] layout_', cconfig.layout_);
    }
    const country = urlParams.get('country');
    if (country) {
        cconfig.default_country = country.toLowerCase();
        cconfig.countryL = country.toLowerCase();
        console.log('[PREVIEW] country', cconfig.countryL);
    }
    const lang = urlParams.get('lang');
    if (lang) {
        cconfig.default_language = lang.toLowerCase();
        console.log('[PREVIEW] language', cconfig.default_language);
    }

    (window as any).cconfig = cconfig;
}

// Create a Vue Router instance with web history mode
const vueRouter = createRouter({
    history: createWebHistory('/'), // Set the base URL for the router
    routes: router.options.routes, // Use routes defined in the router configuration
});

vueRouter.beforeEach((to, from) => {
    const onlyCasino = !!((window as any).cconfig && (window as any).cconfig.onlyCasino);
    // keep original scroll/log behavior
    // console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`);

    if (!onlyCasino) return true;

    // normalize path (remove trailing slashes, treat '' as '/')
    const normalized = (to.path || '/').replace(/\/+$/, '') || '/';

    // if trying to access root or /home, redirect to /new-casino
    if (normalized === '/' || normalized === '/home') {
        if (to.path === '/new-casino') return true; // already there
        return { path: '/new-casino', replace: true };
    }

    return true;
});
// Create a Single SPA lifecycle object for Vue
const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App); // Render the main App component
        },
    },
    /**
     * Handles the instance of the application by initializing configuration settings.
     *
     * @param {Object} app - The application instance to which plugins and configurations are applied.
     */
    handleInstance(app) {
        function AppInitialization() {
            function loadScript(src: string): Promise<void> {
                return new Promise((resolve, reject) => {
                    // Verifica si ya existe un script con ese src y lo elimina para forzar recarga
                    const existingScript = document.querySelector(`script[src="${src}"]`);
                    if (existingScript) {
                        existingScript.remove(); // elimina el script viejo si existe
                    }

                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = src;
                    script.async = true;

                    script.onload = () => {
                        console.log(`Script cargado: ${src}`);
                        resolve();
                    };

                    script.onerror = (err) => {
                        console.error(`Error al cargar script: ${src}`, err);
                        reject(err);
                    };

                    document.head.appendChild(script); // O document.body.appendChild(script)
                });
            }

            // Check if the configuration object and language data are defined; if not, initialize them.
            if ((window as any).cconfig == undefined ||
                (window as any).cconfig['languagesData'] == undefined ||
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL] == undefined) {

                // Initialize languagesData as an empty object for the current country.
                (window as any).cconfig['languagesData'] = {};
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL] = {};
                // Initialize language objects for Spanish, English, and Portuguese.
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL]['es'] = {};
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL]['en'] = {};
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL]['pt'] = {};
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL]['tr'] = {};
            }

            // If mobileL is defined and equals "0", reset it to an empty string.
            if ((window as any).cconfig !== undefined &&
                (window as any).cconfig['mobileL'] !== undefined &&
                (window as any).cconfig['mobileL'] === '0') {
                (window as any).cconfig['mobileL'] = '';
            }

            // Use Pinia for state management in the application.
            app.use(createPinia());
            // Use Vue Router for routing in the application.
            app.use(vueRouter);

// Add FontAwesome icons to the library
            library.add(faBell, faClose, faPlay, faGear, faFacebook, faInstagram, faYoutube, faTwitter, faSkype, faXTwitter, faClock, faUser, faSignOutAlt, faChevronDown, faChevronUp, faSliders, faCircleCheck, faMars, faVenus, faIdCard, faMobile, faEnvelope, faKey, faRefresh, faCheck, faLocationDot, faArrowLeft, faEye, faMoneyCheckDollar, faLock, faUnlock, faTelegram, faWhatsapp, faTiktok, faLinkedin, faCalendar, faRectangleAd, faAngleRight, faAngleLeft, faPlus, faXmark, faArrowRightArrowLeft, faThreads);
            let fbTranlation: Record<string, string> | null = null;
            /**
             * Fetch translations from Firestore using the composable `useGetInfoFirestore`,
             * convert the returned array into a key/value map, expose it to global config and
             * the app component, and return the resulting map.
             *
             * @returns {Promise<Record<string, string> | null>}
             *   A Promise resolving to a record mapping translation keys to values, or null
             *   when no translations are available or an error occurs.
             */
            async function languajesFirebase(): Promise<Record<string, string> | null> {
                try {
                    // Call composable to get translations. It may return an array of items
                    // with `key` and `value` properties.
                    const firebaseLanguajes = await useGetInfoFirestore(
                        (window as any).cconfig,
                        {} as any,
                        'translations',
                        { useLogin: false, useScope: false }
                    );

                    // If the response is a non-empty array, reduce it to an array of [key,value]
                    // tuples and build an object from those entries.
                    if (Array.isArray(firebaseLanguajes) && firebaseLanguajes.length) {
                        const entries: Array<[string, string]> = (firebaseLanguajes as any[]).reduce(
                            (acc: Array<[string, string]>, item: any) => {
                                // Normalize key and value as strings when present
                                const k = (item && item.key != null) ? String(item.key) : '';
                                const v = (item && item.value != null) ? String(item.value) : '';
                                if (k !== '' && v !== '') acc.push([k, v]);
                                return acc;
                            },
                            []
                        );

                        // Convert array of tuples into an object: { key: value, ... }
                        const firebaseLanguajesObject: Record<string, string> = Object.fromEntries(entries);

                        // Expose translations globally for later use
                        (window as any).cconfig.firebaseLanguajesMap = firebaseLanguajesObject;

                        // Also attach to the reactive app component if available
                        const ac: any = app.config.globalProperties.$appComponent;
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
                    let locale = (window as any).cconfig.default_language != undefined
                        ? (window as any).cconfig.default_language
                        : (window as any).cconfig.language.languageDafault;
                    i18n.global.setLocaleMessage(locale, fbTranlation);
                }
            });


            // Retrieve messages based on login status and language configuration
            let messages = (window as any).cconfig['not_login'] != undefined &&
            (window as any).cconfig['not_login'][(window as any).cconfig.default_language != undefined ?
                (window as any).cconfig.default_language :
                (window as any).cconfig.language.languageDafault] != undefined &&
            (window as any).cconfig['not_login'][(window as any).cconfig.default_language != undefined ?
                (window as any).cconfig.default_language :
                (window as any).cconfig.language.languageDafault]['translations'] != undefined ?
                {
                    'es': (window as any).cconfig['not_login']['es']['translations'],
                    'en': (window as any).cconfig['not_login']['en']['translations'],
                    'pt': (window as any).cconfig['not_login']['pt']['translations'],
                    'tr': (window as any).cconfig['not_login']['tr'] !== undefined && (window as any).cconfig['not_login']['tr']['translations'] !== undefined ? (window as any).cconfig['not_login']['tr']['translations'] : {},
                } :
                (window as any).cconfig['languagesData'][(window as any).cconfig.countryL];

            // Attempt to merge error codes into messages for each language
            try {
                if ((window as any)['languagesErrorCodes'] != undefined && (window as any)['languagesErrorCodes']['es'] != undefined) {
                    messages['es'] = { ...(window as any)['languagesErrorCodes']['es'], ...messages['es'] };
                }
                if ((window as any)['languagesErrorCodes'] != undefined && (window as any)['languagesErrorCodes']['en'] != undefined) {
                    messages['en'] = { ...(window as any)['languagesErrorCodes']['en'], ...messages['en'] };
                }
                if ((window as any)['languagesErrorCodes'] != undefined && (window as any)['languagesErrorCodes']['pt'] != undefined) {
                    messages['pt'] = { ...(window as any)['languagesErrorCodes']['pt'], ...messages['pt'] };
                }
                if ((window as any)['languagesErrorCodes'] != undefined && (window as any)['languagesErrorCodes']['tr'] != undefined) {
                    messages['tr'] = { ...(window as any)['languagesErrorCodes']['tr'], ...messages['tr'] };
                }
            } catch (e) {
                console.log(e); // Log any errors encountered during message processing
            }

            console.log('let messages ',messages);
            // Create an internationalization instance with the specified configuration
            let i18n = createI18n({
                locale: (window as any).cconfig.default_language != undefined ?
                    (window as any).cconfig.default_language :
                    (window as any).cconfig.language.languageDafault,
                legacy: false,
                globalInjection: true,
                fallbackLocale: (window as any).cconfig.default_language != undefined ?
                    (window as any).cconfig.default_language :
                    (window as any).cconfig.language.languageDafault,
                messages: messages, // Set the messages for localization
            });


            // Use the i18n instance in the Vue application
            app.use(i18n as any);
            app.use(VueMask); // Use VueMask plugin for input masking
            app.use(VueSocialSharing); // Use VueSocialSharing plugin for social sharing functionality
            // Custom directive to hide elements based on binding value
            app.directive('hide', function (el, binding) {
                el.style.display = !!binding.value ? 'none' : 'block'; // Hide or show element
            });

            // Create an event emitter instance
            const emitter = mitt();

            // Configure Google login with the specified client ID
            app.use(vue3GoogleLogin, {
                clientId: (window as any).cconfig.googleLoginClienId != undefined ?
                    (window as any).cconfig.googleLoginClienId : '',
            });

            // Set global properties for the Vue application
            app.config.globalProperties.$emitter = () => emitter; // Emitter for event handling
            app.config.globalProperties.$config = () => (window as any).cconfig; // Configuration access

            let config = app.config.globalProperties.$config; // Store configuration for later use
            let restoreLoginAnalytics: boolean = false; // Flag for login analytics restoration

            /**
             * Converts a hexadecimal color string to HSL (Hue, Saturation, Lightness) format.
             *
             * @param {string} H - The hexadecimal color string, either in the format #RGB or #RRGGBB.
             * @returns {string} The HSL representation of the color, or an empty string if the input is undefined.
             */
            function hexToHsl(H) {
                // Check if the input is defined
                if (H !== undefined) {
                    // Initialize RGB values
                    let r: any = 0,
                        g: any = 0,
                        b: any = 0;

                    // Convert hex to RGB based on the length of the input string
                    if (H.length == 4) {
                        // Short hex format #RGB
                        r = '0x' + H[1] + H[1];
                        g = '0x' + H[2] + H[2];
                        b = '0x' + H[3] + H[3];
                    } else if (H.length == 7) {
                        // Full hex format #RRGGBB
                        r = '0x' + H[1] + H[2];
                        g = '0x' + H[3] + H[4];
                        b = '0x' + H[5] + H[6];
                    }

                    // Normalize RGB values to the range [0, 1]
                    r /= 255;
                    g /= 255;
                    b /= 255;

                    // Calculate minimum and maximum RGB values
                    let cmin = Math.min(r, g, b),
                        cmax = Math.max(r, g, b),
                        delta = cmax - cmin,
                        h = 0,
                        s = 0,
                        l = 0;

                    // Calculate hue (h)
                    if (delta == 0) h = 0; // No color difference
                    else if (cmax == r) h = ((g - b) / delta) % 6; // Red is max
                    else if (cmax == g) h = (b - r) / delta + 2; // Green is max
                    else h = (r - g) / delta + 4; // Blue is max

                    // Convert hue to degrees
                    h = Math.round(h * 60);
                    if (h < 0) h += 360; // Ensure hue is positive

                    // Calculate lightness (l)
                    l = (cmax + cmin) / 2;

                    // Calculate saturation (s)
                    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                    s = +(s * 100).toFixed(1); // Convert to percentage
                    l = +(l * 100).toFixed(1); // Convert to percentage

                    // Return HSL string
                    return '' + h + ' ' + s + '% ' + l + '%';
                } else {
                    // Return empty string if input is undefined
                    return '';
                }
            }

            let countriesFlag = (window as any).cconfig.countriesFlag != undefined ? (window as any).cconfig.countriesFlag : [ // Array of country configurations
                {
                    name: 'es',
                    flag: 'es',
                }, {
                    name: 'en',
                    flag: 'us',
                }, {
                    name: 'pt',
                    flag: 'br',
                }, {
                    name: 'tr',
                    flag: 'tr',
                },
            ];
            // Reactive object to manage application state
            app.config.globalProperties.$appComponent = reactive({
                pendingWithdrawals: 0, // Number of pending withdrawals
                labelRedirect: (window as any).cconfig.labelRedirect != undefined &&
                    (window as any).cconfig.labelRedirect[(window as any).cconfig.countryL] != undefined &&
                    (window as any).cconfig.labelRedirect[(window as any).cconfig.countryL].active != undefined ?
                    (window as any).cconfig.labelRedirect[(window as any).cconfig.countryL].active : false,
                showModal3Image: false, // Flag to show modal with 3 images
                peopleInGames: [], // Array to hold people in games
                dga: '', // Placeholder for DGA
                infoDataPayphone: {}, // Object to hold payphone information
                activeInfoPayphone: false, // Flag for active payphone information
                platformApp: (window as any).cconfig.platformApp != undefined ?
                    (window as any).cconfig.platformApp : 'Other', // Platform application type
                showLabel: true, // Flag to show label
                showModal3: false, // Flag to show modal 3
                openMenu5: true, // Flag to open menu 5
                apm: apm, // Placeholder for APM
                config: (window as any).cconfig, // Configuration object
                loadingGames: false, // Flag for loading games
                saveResponseWithdrawal: null, // Placeholder for withdrawal response
                modalPayphoneDeposit: false, // Flag for payphone deposit modal
                modalTerracall: false, // Flag for Terracall modal
                modalTigoMoney: false, // Flag for Tigo Money modal
                modalPlux: '', // Flag for Plux modal
                modalPushPayment: false, // Flag for push payment modal
                modalVisaNetDeposit: false, // Flag for VisaNet deposit modal
                modalVisaNetDepositData: null, // Placeholder for VisaNet deposit data
                modalVisaDeposit: false, // Flag for Visa deposit modal
                infoApp: (window as any).infoApp != undefined ? (window as any).infoApp : false, // Flag for app information
                diableCountryRegister: (window as any).appDoradoPeruR != undefined ? (window as any).appDoradoPeruR : false, // Flag for app dorado peru
                themeSportbook: false,
                modalAlert: [], // Array for alerts
                myCasinoGames: [], // Array for user's casino games
                myListFavoriteGame: [], // Array for user's favorite games
                contingency: false, // Flag for contingency
                contingencyCasino: (window as any).cconfig.contingencyCasino !== undefined &&
                    (window as any).cconfig.contingencyCasino.on !== undefined ?
                    (window as any).cconfig.contingencyCasino.on : false, // Flag for casino contingency
                contingencySportbook: (window as any).cconfig.contingencySportbook !== undefined &&
                    (window as any).cconfig.contingencySportbook.on !== undefined ?
                    (window as any).cconfig.contingencySportbook.on : false, // Flag for sportsbook contingency
                count: 0, // General count
                otherCount: 0, // Other count
                startUnawarded: 0, // Start count for unawarded
                startAwarded: 0, // Start count for awarded
                loadMoreUnawarded: false, // Flag to load more unawarded
                loadMoreAwarded: false, // Flag to load more awarded
                favCasino: false, // Flag for favorite casino
                appPOS: false, // Flag for app POS
                disabledCount: false, // Flag to disable count
                disabledOtherCount: false, // Flag to disable other count
                disableOthersButtons: false, // Flag to disable other buttons
                showModalLogin: false, // Flag to show login modal
                mobile: (window as any).cconfig.mobileL, // Mobile configuration
                country: (window as any).cconfig.countryL, // Country configuration
                boxes: [], // Array for boxes
                notifier: null, // Placeholder for notifier
                jackpotsList: [], // Array for jackpots
                jackpotWinnersList: [], // Array for jackpot winners
                tournamnetsList: [], // Array for tournaments
                lotteryList: [], // Array for lottery
                detailTime: false, // Flag for detailed time
                detailNotifications: false, // Flag for detailed notifications
                detailNotificationsMobile: false, // Flag for mobile detailed notifications
                titleModalGenericForm: '', // Title for generic modal form
                notificationsUnread: 0, // Count of unread notifications
                menuMobile2: false, // Flag for mobile menu 2
                disabledLogin: false, // Flag to disable login
                notificationsToast: ref([]), // Reactive reference for notifications toast
                showMainModalBonus: false, // Flag to show main modal for bonus
                time: null, // Placeholder for time
                hours: null, // Placeholder for hours
                totalSeconds: 0, // Total seconds
                interval: 0, // Interval for timing
                flagTime: true, // Flag for time
                notifications: [], // Array for notifications
                title: 'SitioVersion3', // Title of the site
                partnerG: (window as any).cconfig.partner, // Partner configuration
                tokenUser: '', // User token
                viewActual: '', // Current view
                user_id: '', // User ID
                channel_id: '', // Channel ID
                id_platform: '', // Platform ID
                showCookies: false, // Flag to show cookies
                profile: {}, // User profile object
                disabledButtonForm: false, // Flag to disable form button
                disabledButtonWithdraw: false, // Flag to disable withdrawal button
                showLoadMoreButton: true, // Flag to show load more button
                showLoadMoreButtonReferral: false, // Flag to show load more button for referrals
                depositFromLanding: null, // Placeholder for deposit from landing
                DefaultAmountDeposits: null, // Default amount for deposits
                JackpotInformation: '', // Information about jackpots
                submittedSuccessfully: false, // Flag for successful submission
                session: { // User session information
                    id_user: '',
                    logueado: false,
                    usuario: '',
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
                    skinJsITN: '',
                    wallet: '',
                    last_login_date: null,
                    last_login_ip: '',
                    cedula: '',
                    celular: '',
                    fecha_nacim: '',
                    iframemini_bannerleft: '',
                    iframemini_bannerright: '',
                    verifcelular: null,
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
                    user_test: false,
                    theme_color_mode: null,
                    doc_expired: false
                },
                text: { // Text labels for time units
                    Year: '',
                    Month: '',
                    Weeks: '',
                    Days: ':',
                    Hours: ':',
                    Minutes: ':',
                    Seconds: '',
                    MilliSeconds: '',
                },
                themeG: (window as any).cconfig.theme, // Theme configuration
                titleAboutUs: '', // Title for About Us section
                openUpdateData: false, // Flag to open update data modal
                casinoOption: [], // Array for casino options
                sportOption: [], // Array for sport options
                language: '', // Current language
                lngProd: (window as any).cconfig.default_language != undefined ?
                    (window as any).cconfig.default_language :
                    (window as any).cconfig.language.languageDafault, // Default language for product
                myText: '', // Placeholder for text
                casinoEnabled: true, // Flag for casino enabled
                liveCasinoEnabled: true, // Flag for live casino enabled
                virtualesEnabled: true, // Flag for virtuals enabled
                urlGeoApi: '', // URL for Geo API
                bono_header: [], // Array for bonus headers
                notTokenUser: false, // Flag for no token user
                firstReqBalance: false, // Flag for first request balance
                page: '', // Current page
                ChangePassword: false, // Flag for change password
                switch2FA: false,
                showModal2FA: false, // Flag to show 2FA modal
                switch2FAUser: false, // Flag to show 2FA modal
                showModalLogin2FA: false, // Flag to show 2FA modal
                exclutionTime: null, // Placeholder for exclusion time
                saldo_total: null, // Total balance
                saldo_recarga: null, // Recharge balance
                saldo_retiro: null, // Withdrawal balance
                saldo_bono: null, // Bonus balance
                saldo_freebet: null, // Free bet balance
                saldo_freeCasino: null, // Free casino balance
                typeUser: '', // Type of user
                mensajesUnread: '', // Unread messages
                theme_color_mode: null, // Theme color mode
                tokenSB: '', // Token for SB
                providerSportbook: '', // Token for SB
                skinIdITN: '', // Skin ID for ITN
                urlSkin: '', // URL for skin
                walletCodeITN: '', // Wallet code for ITN
                loadBalance: false, // Flag to load balance
                selectFlag: (window as any).cconfig.language.selectFlagDefault, // Default select flag
                captchaKey: '', // Key for captcha
                urlAPI: '', // URL for API
                partner: (window as any).cconfig.partner, // Partner configuration
                subpartner: '', // Subpartner configuration
                urlLobbyVirtuales: '', // URL for virtual lobby
                urlLobbyVivogaming: '', // URL for Vivo gaming lobby
                urlLobbyPoker: '', // URL for poker lobby
                urlLobbyCasino: '', // URL for casino lobby
                urlLobbyLiveCasino: '', // URL for live casino lobby
                urlLobbyBetgamestv: '', // URL for Betgames TV lobby
                urlLobbyEvolution: '', // URL for Evolution lobby
                urlLobbyPragmaticLive: '', // URL for Pragmatic Live lobby
                urlRegistro: '', // URL for registration
                user: null, // Placeholder for user
                vCms: 1, // Version of CMS
                wsOpen: false, // Flag for WebSocket open
                boxesOrig: '', // Original boxes
                bannerInv: [], // Array for banner invitations
                bannerInvOrig: '', // Original banner invitation
                bannerInv2: [], // Second array for banner invitations
                menus_service: [], // Array for service menus
                loyalty: { // Loyalty program information
                    level: null,
                    points: null,
                },
                flagMenu: true, // Flag for menu visibility
                flagTimer: true, // Flag for timer visibility
                flagNotification: true, // Flag for notification visibility
                loadView: false, // Flag for loading view
                loadGeoApi: true, // Flag for loading Geo API
                tokenFCM: '', // Token for FCM
                frm: '', // Placeholder for form
                phoneUser: '', // User phone
                fontDafault: '', // Default font
                countries: countriesFlag, // Array of country flags
                typesTaps: [], // Array for tap types
                roulette: { // Roulette game information
                    Id: null,
                    prizes: [],
                    BackgroundURL: null,
                    winner: {
                        id: null,
                        image: null,
                        text: null,
                    },
                },
                loyalty_price: { // Loyalty price information
                    id: null,
                    win_type: null,
                    title: null,
                    imagen: null,
                    description: null,
                },
                array_loyalty_price: [], // Array for loyalty prices
                loyalty_popup: { // Loyalty popup information
                    date: null,
                    img: null,
                    idPrize: null,
                    userId: null,
                    type: null,
                    description: null,
                },
                array_loyalty_popup: [], // Array for loyalty popups
                metodos_pago: [], // Array for payment methods
                model: {}, // Placeholder for model
                confetti: null, // Placeholder for confetti
                promotionView: false, // Flag for promotion view
                moving: false, // Flag for moving state
                isCheckedMenuMobile: false, // Flag for mobile menu checked state
                dropdownNotificationsOpen: false, // Flag for dropdown notifications open state
                tickedCheckPhone: '', // Placeholder for checked phone
                showDownloadApp: null, // Flag for showing download app
                showLoyalty: null, // Flag for showing loyalty
                updateDateForm: '', // Placeholder for update date form
                promotionModal: {}, // Object for promotion modal
                infoModal: {}, // Object for info modal
                infoModalDeposit: undefined, // Object for info modal
                gamesList: [], // Array for games list
                gamesListSearch: [], // Array for searched games list
                preloaderShow: false, // Flag for showing preloader
                showMore: false, // Flag for showing more
                selections: { category: { id: '' }, provider: '' }, // Selections for categories and providers
                total_count: 0, // Total count
                offset: 0, // Offset for pagination
                limitLocal: 0, // Local limit for pagination
                showGame: false, // Flag for showing game
                showNotificationGameModal: false, // Flag for showing game
                notificationGameId: null, // Array for game notifications
                notificationGame: {}, // Array for game notifications
                gameSelected: {}, // Object for selected game
                src: '', // Source URL
                openLink: false, // Flag for opening link
                error_search: { // Object for error messages during search
                    'Name': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'Email': [
                        { type: 'required', message: 'Campo requerido' },
                        { type: 'email', message: 'Formato no válido' },
                    ],
                    'Phone': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'Adress': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'FavoriteSport': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'FavoriteCasino': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                },
                formSPLAFT: 'FormGroup', // Form type
                error_messages_form: { // Object for error messages in forms
                    'paternal_last_name': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'mother_last_name': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'first_name': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'nationality_id': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'doc_type': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'doc_nationality': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'identification': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'email': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'phone': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'occupation': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'equity_capital_declaration': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'origin_money_declaration': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'illegal_activities_declaration': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'is_a_pep': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'is_a_pep_detail': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'family_members_pep': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'family_member_fullname': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'know_activities_family_member': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'situations_to_be_reported': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'situations_to_be_reported_detail': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                    'terms_and_conditions': [
                        { type: 'required', message: 'Campo requerido' },
                    ],
                },
                placeholder: null, // Placeholder for input
                ph: null, // Placeholder for another input
                showModalCancelWithdraw: false, // Flag to show cancel withdraw modal
                showModalDepositV2: false, // Flag to show deposit modal version 2
                showModalDepositV3: false, // Flag to show deposit modal version 3
                showModalReferralAwards: false, // Flag to show referral awards modal
                /**
                 * Sends Google Analytics events based on user interactions.
                 *
                 * @param {string} EventTicket - The event identifier for the interaction.
                 * @param {any} item - Additional data related to the event.
                 */
                gAnalytics(EventTicket, item: any) {
                    // Check if EventTicket and item are valid strings
                    if (typeof EventTicket == 'string' && typeof item == 'string' && EventTicket != undefined && item != undefined) {
                        // Add labels to APM for tracking
                        appComponent.apm.addLabels({ buttonId: EventTicket + '-' + item });
                    }
                    // Check if Google Analytics configuration is enabled
                    if (appComponent.config.gAnalytics != undefined && appComponent.config.gAnalytics && ((window as any).dataLayer !== undefined)) {
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
                            case 'deposit_new':
                                // Push event for new withdrawal view
                                dataLayer.push({
                                    'event': 'event_click',
                                    'EventoCategoria': '9. Mi cuenta',
                                    'EventoEtiqueta': '9.9 Depositar - Nueva Visual',
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
                            case 'deposit_old':
                                // Push event for old withdrawal view
                                dataLayer.push({
                                    'event': 'event_click',
                                    'EventoCategoria': '9. Mi cuenta',
                                    'EventoEtiqueta': '9.9 Depositar - Visual Antigua',
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
                                    'type': item.type != undefined ? item.type : 'pasarela de pago',
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
                            case 'login':
                                // Prepare login event data
                                const loginEventData = {
                                    event: 'login-success',
                                    user_id: item.id_platform,
                                    país: item.countryName,
                                    provincia: item.province,
                                    ciudad: item.city,
                                    sexo: item.gender,
                                    first_name: item.first_name,
                                    last_name: item.paternal_last_name,
                                    email: item.email,
                                    phone: item.phone,
                                    origin: 'web',
                                };
                                // Function to determine if the app is a PWA
                                const isPWA = function () {
                                    const displayMode = window.matchMedia('(display-mode: standalone)').matches ? 'standalone' :
                                        window.matchMedia('(display-mode: fullscreen)').matches ? 'fullscreen' :
                                            window.matchMedia('(display-mode: minimal-ui)').matches ? 'minimal-ui' : 'browser';
                                    return displayMode === 'standalone' || displayMode === 'fullscreen' || displayMode === 'minimal-ui';
                                };
                                // Check if the app is running as a PWA on iOS
                                const isIosPWA = (window as any).navigator.standalone === true;
                                // Determine the origin of the login
                                if (isPWA() || isIosPWA) {
                                    loginEventData.origin = 'pwa';
                                } else if ((window as any).cordova_iab != undefined) {
                                    if ((window as any).versionApp != undefined) loginEventData['versionApp'] = (window as any).versionApp;
                                    loginEventData['dateLoginApp'] = new Date().toLocaleString();
                                    if ((window as any).navigator.userAgent != undefined) {
                                        const match = (window as any).navigator.userAgent.match(/\(([^)]+)\)/);
                                        loginEventData['device'] = match[0];
                                    }
                                    loginEventData.origin = 'app';
                                } else if ((window as any).cconfig.mobileL != undefined && (window as any).cconfig.mobileL == '1') {
                                    loginEventData.origin = 'mobile';
                                } else {
                                    loginEventData.origin = 'web';
                                }
                                // Push login event data to dataLayer
                                dataLayer.push(loginEventData);
                                restoreLoginAnalytics = false; // Reset login analytics flag
                                emitter.all.delete('ready:login'); // Remove login ready event
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

                    if (
                        appComponent.config.tiktok_pixels != undefined &&
                        appComponent.config.tiktok_pixels &&
                        (window as any).ttq &&
                        typeof (window as any).ttq !== 'undefined' &&
                        (window as any).ttq !== null
                    ) {
                        switch (EventTicket) {
                            case 'deposit': {
                                function getCookie(name) {
                                    let cookie = {};
                                    document.cookie.split(';').forEach(function (el) {
                                        let [k, v] = el.split('=');
                                        cookie[k.trim()] = v;
                                    });
                                    return cookie[name];
                                }

                                // Push event for deposit action
                                (window as any).ttq.track('InitiateCheckout', {
                                    content_id: item.info.id ?? item.info,
                                    value: item.monto,
                                    currency: item.moneda,
                                    event_time: Date.now(),
                                    ttclid:
                                        getCookie('ttclid') ||
                                        new URLSearchParams(window.location.search).get('ttclid'),
                                    external_id: appComponent.session.usuario,
                                    user_agent: navigator.userAgent,
                                });
                                break;
                            }
                        }
                    }
                },
                /**
                 * Handles the logout process for the user.
                 * This function clears user session data, closes WebSocket connection if it exists,
                 * and redirects the user based on partner configuration.
                 */
                notLogin() {
                    try {
                        // Close WebSocket connection if it exists
                        if ((window as any).ws != undefined) {
                            (window as any).ws.close();
                        }
                        // Clear authentication token from API service
                        apiService.setAuthToken('');
                        // Remove authentication token from local storage
                        window.localStorage.removeItem('auth_token');
                        window.localStorage.removeItem('modal_shown');

                    } catch (e) {
                        // Error handling can be added here if necessary
                    }
                    // Reset all user-related session variables to their default values
                    this.saldo_total = null;
                    this.saldo_recarga = null;
                    this.saldo_retiro = null;
                    this.saldo_bono = null;
                    this.saldo_freebet = null;
                    this.saldo_freeCasino = null;
                    this.bono_header = [];
                    this.typeUser = '';
                    this.mensajesUnread = '';
                    this.tokenSB = '';
                    this.providerSportbook = '';
                    this.session.theme_color_mode = null;
                    this.user_id = '';
                    this.channel_id = '';
                    this.session.logueado = false; // User is logged out
                    this.session.id_user = '';
                    this.session.usuario = '';
                    this.session.nombre = '';
                    this.session.pais = '';
                    this.session.pais_nom = '';
                    this.session.pais_id = null;
                    this.session.moneda = '';
                    this.session.simbolo_moneda = '';
                    this.session.moneda_nom = '';
                    this.session.idioma = '';
                    this.session.utc = '';
                    this.session.token = '';
                    this.session.req_cheque = '';
                    this.session.req_doc = '';
                    this.session.fecha_crea = '';
                    this.session.fecha_actualizacion = '';
                    this.session.origen = '';
                    this.session.city = '';
                    this.session.departament = '';
                    this.session.gender = '';
                    this.session.casino_enabled = '';
                    this.session.verifcedula_ant = '';
                    this.session.verifcedula_post = '';
                    this.session.verifcedula_ant_paprob = '';
                    this.session.verifcedula_post_paprob = '';
                    this.session.wallet = '';
                    this.session.last_login_date = null;
                    this.session.last_login_ip = '';
                    this.session.verifcelular = null;
                    this.session.update_password = false;
                    this.session.user_verification = false;
                    this.session.formSplaft = 'N';
                    this.session.paternal_last_name = '';
                    this.session.mother_last_name = '';
                    this.session.email = '';
                    this.session.phone = '';
                    this.session.doc_type = '';
                    this.session.nationalityid = '';
                    this.session.first_name = '';
                    this.session.identification = '';
                    this.session.doc_expired = false;
                    this.notTokenUser = true; // Indicates that the user is not authenticated
                    let array: any = [];
                    // Prepare error message for session expiration
                    array.unshift(
                        {
                            type: 'error',
                            message: appComponent.config.languagesData != undefined &&
                                appComponent.config.languagesData[appComponent.country] != undefined &&
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined &&
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]['Su sesión ha expirado, ingrese nuevamente por favor.'] != undefined ?
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]['Su sesión ha expirado, ingrese nuevamente por favor.'] :
                                'Su sesión ha expirado, ingrese nuevamente por favor.',
                        },
                    );
                    this.modalAlert = array; // Set modal alert with the error message
                    // Redirect user based on partner configuration
                    if (appComponent.config.partner_name != undefined ? appComponent.config.partner_name == 'Acropolis' : appComponent.config.name == 'Acropolis') {
                        router.push('/new-casino'); // Redirect to new casino page
                    } else {
                        router.push('/home'); // Redirect to home page
                    }
                    appComponent.loadView = true; // Indicate that the view is loading
                },
                /**
                 * Handles the login timeout scenario by preparing an error message.
                 * The message is determined based on the application's language configuration.
                 */
                timeLogin() {
                    // Initialize an array to hold alert messages
                    let array: any = [];

                    // Unshift a new error message object into the array
                    array.unshift(
                        {
                            type: 'error', // Type of the message
                            message: appComponent.config.languagesData != undefined && // Check if languagesData is defined
                                appComponent.config.languagesData[appComponent.country] != undefined && // Check if country data is defined
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined && // Check if language product data is defined
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]['Su sesión ha expirado, ingrese nuevamente dentro de unos minutos'] != undefined ? // Check if specific error message is defined
                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]['Su sesión ha expirado, ingrese nuevamente dentro de unos minutos'] : // Use the defined message
                                'Su sesión ha expirado, ingrese nuevamente dentro de unos minutos', // Fallback to default message
                        },
                    );

                    // Assign the prepared alert messages to the modalAlert property
                    this.modalAlert = array;
                },
                modal: { // Object for modal configuration
                    showModal: '',
                    titleModal: '',
                    messageModal: '',
                    buttonModal: '',
                    buttonModal2: '',
                    link2: '',
                    orderModal: '',
                    configuredMethod: {},
                    buttonX: true, // Flag for button X visibility
                    innerHtmlModal: '',
                },
                modalV2: { // Object for version 2 modal configuration
                    showModal: '',
                    messageModal: '',
                },
                modalCurrencyExchange: false, // Flag for currency exchange modal
                modalTransferencia: false, // Flag for transfer modal
                pasarelaSelected: null, // Placeholder for selected gateway
                closeModal: function () { // Function to close modal
                    this.modal.showModal = '';
                    this.modal.titleModal = '';
                    this.modal.messageModal = '';
                    this.modal.buttonModal = '';
                    this.modal.buttonModal2 = '';
                    this.modal.link2 = ''; 
                    this.modal.configuredMethod = {};
                    this.promotionModal = {};
                    this.infoModal = {};
                    appComponent.disabledButtonWithdraw = false; // Enable withdrawal button
                    appComponent.disabledButtonForm = false; // Enable form button
                },
                closeModalV2: function () { // Function to close version 2 modal
                    this.modalV2.showModal = '';
                    this.modalV2.messageModal = '';
                },
                loadJsAltenar: function () { // Function to load Altenar JS
                    var loadBiaF = true; // Flag for loading Bia
                    if (appComponent.config.versionAltenar != '2') {
                        var tags = document.getElementsByTagName('script');
                        for (var i = tags.length; i >= 0; i--) {
                            if ((
                                tags[i] &&
                                tags[i].getAttribute('src') != null &&
                                (tags[i] as any)
                                    .getAttribute('src')
                                    .indexOf('https://sb2integration-altenar2.biahosted.com') != -1)
                            ) {
                                if ((tags[i] as any)
                                    .getAttribute('src') != appComponent.config.altenar) {
                                    (tags[i].parentNode as any).removeChild(tags[i]); // Remove script tag
                                } else {
                                    loadBiaF = false; // Do not load if already present
                                }
                            }
                        }
                        if (loadBiaF) {
                            var script = document.createElement('script');
                            script.async = false; // Load script synchronously
                            script.src = appComponent.config.altenar; // Set script source
                            var vthis = this;
                            script.addEventListener('load', function () { // On script load
                                setTimeout(() => {
                                    appComponent.config.loadSportbook = true; // Set loadSportbook flag
                                }, 1000);
                            });
                            document.head.appendChild(script); // Append script to head
                        } else {
                            setTimeout(() => {
                                appComponent.config.loadSportbook = true; // Set loadSportbook flag
                            }, 1000);
                        }
                    } else {
                        setTimeout(() => {
                            appComponent.config.loadSportbook = true; // Set loadSportbook flag
                        }, 1000);
                    }
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
                /**
                 * Sets the background type based on the user's session and configuration.
                 * Determines the appropriate background image to display for the current view.
                 */
                setBackgroundType() {
                    let login; // Variable to hold the login status
                    if (this.session.logueado) {
                        login = 'login'; // User is logged in
                    } else {
                        if (!this.session.logueado) {
                            login = 'notLogin'; // User is not logged in
                        }
                    }
                    let found = false; // Flag to check if a background has been found
                    // Check if the backgrounds configuration exists for the current country and language
                    if (this.config['backgrounds'] != undefined &&
                        this.config['backgrounds'][this.country] != undefined &&
                        this.config['backgrounds'][this.country][this.lngProd] != undefined &&
                        this.config['backgrounds'][this.country][this.lngProd][login] != undefined &&
                        this.config['backgrounds'][this.country][this.lngProd][login]['backgrounds'] != undefined
                    ) {
                        let backgrounds = this.config['backgrounds'][this.country][this.lngProd][login]['backgrounds']; // Retrieve backgrounds
                        // Iterate through each background item
                        for (let item of backgrounds) {
                            let type = this.viewActual.split('/')[1]; // Get the current view type
                            if (item.url != undefined && item.url != '') {
                                // Check if the current view type matches the item's redirect
                                if (item.redirect.indexOf(type) > -1 && type != '') {
                                    try {
                                        // Set the background image and size for the body
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + item.url + ')';
                                    } catch (e) {
                                    } // Catch any errors during background setting
                                    found = true; // Background found
                                    break; // Exit loop
                                }
                            }
                        }
                    }
                    try {
                        // If no background was found, set default backgrounds based on mobile or desktop
                        if (!found) {
                            if (this.mobile == '1') { // Check if the device is mobile
                                if (this.config.background_mobile != '' && this.config.background_mobile != undefined) {
                                    // Set mobile background if defined
                                    (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                    (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.background_mobile + ')';
                                } else {
                                    // Check for mobile default backgrounds
                                    if ((this.config.backgroundMobileDefault != '' && this.config.backgroundMobileDefault != undefined && this.config.backgroundMobileDefault[appComponent.country] != undefined) && this.viewActual != '/banner-right' && this.viewActual != '/banner-rightnl' && this.viewActual != '/banner-left' && this.viewActual != '/banner-leftnl') {
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.backgroundMobileDefault[appComponent.country] + ')';
                                    } else {
                                        if (this.config.backgroundMobileDefault != '' && this.config.backgroundMobileDefault != undefined && this.viewActual != '/banner-right' && this.viewActual != '/banner-rightnl' && this.viewActual != '/banner-left' && this.viewActual != '/banner-leftnl') {
                                            (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                            (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.backgroundMobileDefault + ')';
                                        }
                                    }
                                }
                            } else { // If not mobile, check for desktop backgrounds
                                if (this.config.background_desktop != '' && this.config.background_desktop != undefined && this.viewActual != '/banner-right' && this.viewActual != '/banner-rightnl' && this.viewActual != '/banner-left' && this.viewActual != '/banner-leftnl') {
                                    (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                    (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.background_desktop + ')';
                                } else {
                                    // Check for default desktop backgrounds
                                    if ((this.config.backgroundDefault != undefined && this.config.backgroundDefault[appComponent.country] != undefined) && this.viewActual != '/banner-right' && this.viewActual != '/banner-rightnl' && this.viewActual != '/banner-left' && this.viewActual != '/banner-leftnl') {
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                        (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.backgroundDefault[appComponent.country] + ')';
                                    } else {
                                        if (this.config.backgroundDefault != '' && this.config.backgroundDefault != undefined && this.viewActual != '/banner-right' && this.viewActual != '/banner-rightnl' && this.viewActual != '/banner-left' && this.viewActual != '/banner-leftnl') {
                                            (document.getElementsByTagName('body')[0] as any).style.backgroundZize = 'contain';
                                            (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'url(' + this.config.backgroundDefault + ')';
                                        }
                                    }
                                }
                            }
                        }
                        // Remove background image for specific views
                        if (this.viewActual == '/banner-topcenternl' || this.viewActual == '/banner-right' || this.viewActual == '/banner-rightnl' || this.viewActual == '/banner-left' || this.viewActual == '/banner-leftnl' || this.viewActual == '/banner-topcenter' || this.viewActual == '/banner-rightnl' || this.viewActual == '/banner-leftnl' || this.viewActual == '/banner-topcenternl') {
                            (document.getElementsByTagName('body')[0] as any).style.backgroundImage = 'none'; // Clear background image
                        }
                    } catch (e) {
                    } // Catch any errors during background setting
                },
                changeLanguage(langKey, flag) { // Function to change language
                    emitter.emit('changeLanguage', { langKey: langKey, flag: flag }); // Emit language change event
                },
                /**
                 * Establishes a WebSocket connection for contingency handling.
                 * This function checks if the necessary configuration for the WebSocket is available,
                 * and if so, attempts to create a connection.
                 */
                onWSContingency() {
                    // Check if the appComponent configuration and WebSocket URL are defined
                    if (appComponent.config !== undefined && appComponent.config.urlApi !== undefined && appComponent.config.urlApi.wsContingency !== undefined) {
                        try {
                            // Create a new WebSocket instance using the contingency URL
                            let wsContingency = new WebSocket(appComponent.config.urlApi.wsContingency);

                            // Event handler for when the WebSocket connection is opened
                            wsContingency.onopen = () => {
                                console.log('Contingency socket Contingency has been opened!');
                            };

                            // Event handler for when the WebSocket connection is closed
                            wsContingency.onclose = () => {
                                // Re-establish the WebSocket connection upon closure
                                appComponent.onWSContingency();
                            };

                            // Event handler for incoming messages from the WebSocket
                            wsContingency.onmessage = (message) => {
                                // Parse the incoming message data and pass it to the listener function
                                listenerContingency(JSON.parse(message.data));
                            };

                            /**
                             * Handles the contingency data received and updates the application state accordingly.
                             * @param {Object} data - The data object containing contingency information.
                             */
                            function listenerContingency(data) {
                                // Check if contingency data is provided
                                if (data.contingency !== undefined) {
                                    // Update the app component's contingency property
                                    appComponent.contingency = data.contingency;

                                    // Update the global configuration if contingency is defined
                                    if ((window as any).cconfig.contingency !== undefined && (window as any).cconfig.contingency.on !== undefined) {
                                        (window as any).cconfig.contingency.on = data.contingency;
                                    }

                                    // Check if the user is logged in
                                    if (appComponent.session.logueado) {
                                        // Reset the token for the session
                                        appComponent.tokenSB = '';
                                        appComponent.providerSportbook = '';
                                        // Reset the session object with default values
                                        appComponent.session = {
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
                                            theme_color_mode: null,
                                            doc_expired: false
                                        };
                                        // Set the authentication token to an empty string
                                        apiService.setAuthToken('');
                                        try {
                                            // Attempt to set the token in the Altenar SDK
                                            (window as any).altenarWSDK.set({ token: '' });
                                        } catch (e) {
                                            // Catch any errors silently
                                        }
                                        // Remove the authentication token from local storage
                                        window.localStorage.removeItem('auth_token');
                                        window.localStorage.removeItem('modal_shown');

                                        // Reset the user token in the app component
                                        appComponent.tokenUser = '';
                                    }
                                }

                                // Check if contingencyCasino data is provided
                                if (data.contingencyCasino !== undefined) {
                                    // Update the app component's contingencyCasino property
                                    appComponent.contingencyCasino = data.contingencyCasino;

                                    // Update the global configuration if contingencyCasino is defined
                                    if ((window as any).cconfig.contingencyCasino !== undefined && (window as any).cconfig.contingencyCasino.on !== undefined) {
                                        (window as any).cconfig.contingencyCasino.on = data.contingencyCasino;
                                    }
                                }
                            }
                        } catch (e) {
                            // Handle any errors that occur during WebSocket connection setup
                            appComponent.onWSContingency();
                        }
                    }
                },
                /**
                 * Establishes a WebSocket connection for partner country updates.
                 * This function checks the configuration for the WebSocket API URL and attempts to connect.
                 */
                onWSPartnerCountry() {
                    // Check if the API URL is defined in the application component's configuration
                    if (appComponent.config !== undefined && appComponent.config.urlApi !== undefined && appComponent.config.urlApi.ws2 !== undefined) {
                        try {
                            if ((appComponent as any)._wsPartnerCountry) {
                                (appComponent as any)._wsPartnerCountry.onclose = null; // evitar reconexión automática
                                (appComponent as any)._wsPartnerCountry.close();
                                (appComponent as any)._wsPartnerCountry = null;
                            }
                            // Create a new WebSocket instance with the partner and country placeholders replaced
                            let wsPartnerCountry = new WebSocket(appComponent.config.urlApi.ws2.replace('CHANNELID', `${appComponent.partnerG}_${appComponent.country}`));
                            
                            (appComponent as any)._wsPartnerCountry = wsPartnerCountry;
                            (appComponent as any)._wsChannel = `${appComponent.partnerG}_${appComponent.country}`;

                            // Event handler for when the WebSocket connection is opened
                            wsPartnerCountry.onopen = () => {
                                console.log('Partner Country socket has been opened!');
                            };

                            // Event handler for when the WebSocket connection is closed
                            wsPartnerCountry.onclose = () => {
                                if ((appComponent as any)._wsChannel === `${appComponent.partnerG}_${appComponent.country}`) {
                                // Re-establish the connection when it closes
                                appComponent.onWSPartnerCountry();
                                }
                            };

                            // Event handler for incoming messages from the WebSocket
                            wsPartnerCountry.onmessage = (message) => {
                                // Parse the incoming message data and pass it to the listener function
                                listenerWs(JSON.parse(message.data));
                            };

                            /**
                             * WebSocket message listener function.
                             * @param {Object} message - The message received from the WebSocket.
                             */
                            function listenerWs(message) {
                                switch (message.type) {
                                    case 'updateDom': {
                                        const data = message.data || {}; // Extract data from the message or default to an empty object.
                                        if (data) {
                                            // Iterate over each entry in the data object.
                                            for (const [id, value] of (Object.entries as (obj: any) => [string, any][])(data)) {
                                                const element = document.getElementById(id); // Get the DOM element by ID.
                                                if (id.includes('jackpot')) { // Check if the ID includes 'jackpot'.
                                                    const sportBookElement = document.getElementById('SportBook'); // Get the SportBook element.
                                                    let elementShadow;
                                                    // Check if the SportBook element has child nodes.
                                                    if (
                                                        sportBookElement !== null &&
                                                        sportBookElement.childNodes[0] !== null
                                                    ) {
                                                        const element = sportBookElement.childNodes[0] as HTMLElement; // Get the first child of SportBook.
                                                        // Check if the child has a shadow root.
                                                        if (element && element.shadowRoot) {
                                                            const shadow = element.shadowRoot;
                                                            // Check if the shadow root has a last child.
                                                            if (
                                                                shadow &&
                                                                shadow.lastChild !== null &&
                                                                shadow.querySelector('div')
                                                                    .lastChild !== null
                                                            ) {
                                                                elementShadow =
                                                                    shadow.querySelector('div')?.lastChild; // Get the last child of the shadow root.
                                                            }
                                                        }
                                                    }
                                                    if (element) {
                                                        // Format the value and set it as the text content of the element.
                                                        element.textContent = new Intl.NumberFormat('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }).format(value).toString();
                                                    }
                                                    if (elementShadow) {
                                                        const element2 = elementShadow.querySelector(`#${id}`); // Get the element by ID from the shadow DOM.
                                                        if (element2) {
                                                            // Format the value and set it as the text content of the shadow element.
                                                            element2.textContent = new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }).format(value).toString();
                                                        }
                                                    }
                                                } else if (element) {
                                                    element.textContent = value; // Set the text content for other elements.
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case 'getJackpots': {
                                        appComponent.jackpotsList = message.data || []; // Update the jackpots list in the app component.
                                        break;
                                    }
                                    case 'playersTournament': {
                                        appComponent.tournamnetsList = message.data || []; // Update the tournaments list in the app component.
                                        break;
                                    }
                                    case 'playerLottery': {
                                        appComponent.lotteryList = message.data || []; // Update the lottery list in the app component.
                                        break;
                                    }
                                    case 'getJackpotWinners': {
                                        appComponent.jackpotWinnersList = message.data || []; // Update the jackpot winners list in the app component.
                                        break;
                                    }
                                }
                                const data2 = message.data || {}; // Extract data from the message or default to an empty object.
                                if (data2) {
                                    if (message.data.logout != undefined) { // Check if logout is defined in the message data.
                                        if ((window as any).ws != undefined) {
                                            (window as any).ws.close(); // Close the WebSocket connection.
                                        }
                                        apiService.request('logout', {}).then((response: any) => {
                                            if (response.code == 0) {
                                                if ((window as any).posthog){
                                                    (window as any).posthog?.reset()
                                                }
                                                appComponent.tokenSB = ''; // Clear the token.
                                                appComponent.providerSportbook = ''; // Clear the token.
                                                appComponent.session = { // Reset the session object.
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
                                                    theme_color_mode: null,
                                                    doc_expired: false
                                                };
                                                apiService.setAuthToken(''); // Clear the authentication token.
                                                try {
                                                    (window as any).altenarWSDK.set({ token: '' }); // Reset the Altenar SDK token.
                                                } catch (e) {
                                                }
                                                window.localStorage.removeItem('auth_token'); // Remove the auth token from local storage.
                                                window.localStorage.removeItem('modal_shown');

                                                appComponent.tokenUser = ''; // Clear the user token.
                                            }
                                        });
                                        appComponent.tokenSB = ''; // Clear the token again.
                                        appComponent.providerSportbook = ''; // Clear the token again.
                                        appComponent.session = { // Reset the session object again.
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
                                            theme_color_mode: null,
                                            doc_expired: false
                                        };
                                        apiService.setAuthToken(''); // Clear the authentication token again.
                                        appComponent.tokenUser = ''; // Clear the user token again.
                                        window.localStorage.removeItem('auth_token'); // Remove the auth token from local storage again.
                                        window.localStorage.removeItem('modal_shown');

                                        if (appComponent.config.versionAltenar == '2') {
                                            window.location.href = '/'; // Redirect to the home page if version is 2.
                                        }
                                        router.push('/'); // Navigate to the home route.
                                        setTimeout(() => {
                                        }, 1000); // Delay for 1 second.
                                    }
                                    if (message.data.messages != undefined) { // Check if messages are defined in the message data.
                                        message.data.messages.forEach(function (element) {
                                            appComponent.modalAlert.unshift( // Add each message to the modal alert array.
                                                {
                                                    type: 'notification',
                                                    message: emojify.replace(element.body), // Replace emojis in the message body.
                                                },
                                            );
                                        });
                                    }
                                    if (message.data.NotificationBalance != undefined) {
                                        appComponent.notificationsToast = message.data.NotificationBalance; // Update the notifications toast with balance.
                                    }
                                    if (message.data.boxes != undefined) {
                                        // Check if the boxes data has changed.
                                        if (JSON.stringify(message.data.boxes) != appComponent.boxesOrig) {
                                            appComponent.boxesOrig = JSON.stringify(message.data.boxes); // Update the original boxes data.
                                            if (message.data.boxes != undefined && message.data.boxes != null && message.data.boxes.length > 0) {
                                                appComponent.boxes = message.data.boxes; // Update the boxes in the app component.
                                                appComponent.boxes.forEach((item) => {
                                                    item.title = emojify.replace(item.title); // Replace emojis in each box title.
                                                });
                                                setInterval(function () {
                                                    appComponent.moveLeft(); // Move boxes left every 5 seconds.
                                                }, 5000);
                                            }
                                        }
                                    }
                                    if (message.data.bannerInv != undefined && message.data.bannerInv != '') {
                                        // Check if the bannerInv data has changed.
                                        if (JSON.stringify(message.data.bannerInv) != appComponent.bannerInvOrig) {
                                            appComponent.bannerInvOrig = JSON.stringify(message.data.bannerInv); // Update the original bannerInv data.
                                            appComponent.bannerInv = []; // Reset the bannerInv array.
                                            appComponent.bannerInv2 = message.data.bannerInv; // Update the bannerInv2 array.
                                            var style1 = '<style>table, div, .u_content_text {min-width: auto !important;}</style>'; // Define custom styles.
                                            appComponent.bannerInv2[2] = style1.concat(appComponent.bannerInv2[2]); // Concatenate styles to the bannerInv2.
                                            if (appComponent.bannerInv2[5] !== '' && appComponent.bannerInv2[6] !== 'isMessage') {
                                                if (appComponent.bannerInv2[7] !== '' && appComponent.bannerInv2[7] !== undefined) {
                                                    let template =
                                                        '<div class="contenedor-banner-pet">' +
                                                        '<div class="tittle-destacado">' + appComponent.bannerInv2[7] + '</div>' +
                                                        '<div class="hidden" style="width: 430px; height: 263px;">' +
                                                        '<div class="close alert-container">' +
                                                        '<i class="fa fa-times"></i>' +
                                                        '</div>' +
                                                        '<div class="expand alert-container">' +
                                                        '<i class="fa fa-expand"></i>' +
                                                        '</div>' +
                                                        '<div class="body" style="width: 100%; height: 100%;">' +
                                                        '<a id="juego-iframe" href="' + appComponent.bannerInv2[5] + '">' +
                                                        '<iframe style="width: 100%; height: 100%;" src="' + appComponent.bannerInv2[5] + '" frameborder="0" allowfullscreen=""></iframe>' +
                                                        '</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                        '<button type="button" aria-hidden="true" class="mr-[85px]" data-notify="dismiss">×</button>' +
                                                        '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                        '<span class="alert-container close" >' +
                                                        '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                        '<span data-notify="title">' +
                                                        '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                        '</span>' +
                                                        '<span data-notify="message">' +
                                                        '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                        '</span>' +
                                                        '</a>' +
                                                        '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    appComponent.modal = {
                                                        showModal: 'banner',
                                                        messageModal: template, // Set the modal message to the constructed template.
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
                                                        '<a id="juego-iframe" lightbox="iframe" href="' + appComponent.bannerInv2[5] + '">' +
                                                        '<iframe style="width: 100%; height: 100%;" src="' + appComponent.bannerInv2[5] + '" frameborder="0" allowfullscreen=""></iframe>' +
                                                        '</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' + appComponent.bannerInv2[0] + '" role="alert">' +
                                                        '<button  id="closeBannerInv" type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                        '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                        '<span class="alert-container close" >' +
                                                        '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                        '<span data-notify="title">' +
                                                        '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                        '</span>' +
                                                        '<span data-notify="message">' +
                                                        '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                        '</span>' +
                                                        '</a>' +
                                                        '</span>' +
                                                        '</div>' +
                                                        '</div>';
                                                    appComponent.modal = {
                                                        showModal: 'banner',
                                                        messageModal: template, // Set the modal message to the constructed template.
                                                    };
                                                }
                                            } else {
                                                if (appComponent.bannerInv2[5] === '' && appComponent.bannerInv2[6] !== 'isMessage') {
                                                    if (appComponent.bannerInv2[7] !== '') {
                                                        let template =
                                                            '<div class="contenedor-banner-pet hidde">' +
                                                            '<div class="tittle-destacado">' + appComponent.bannerInv2[7] + '</div>' +
                                                            '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                            '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                            '<span class="alert-container" >' +
                                                            '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                            '<span data-notify="title">' +
                                                            '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                            '</span>' +
                                                            '<span data-notify="message">' +
                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                            '</span>' +
                                                            '</a>' +
                                                            '</span>' +
                                                            '</div>' +
                                                            '</div>';
                                                        appComponent.modal = {
                                                            showModal: 'banner',
                                                            messageModal: template, // Set the modal message to the constructed template.
                                                        };
                                                    } else {
                                                        let template =
                                                            '<div class="contenedor-banner-pet hidde">' +
                                                            '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' + appComponent.bannerInv2[0] + '" role="alert">' +
                                                            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                            '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                            '<span class="alert-container" >' +
                                                            '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                            '<span data-notify="title">' +
                                                            '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                            '</span>' +
                                                            '<span data-notify="message">' +
                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                            '</span>' +
                                                            '</a>' +
                                                            '</span>' +
                                                            '</div>' +
                                                            '</div>';
                                                        appComponent.modal = {
                                                            showModal: 'banner',
                                                            messageModal: template, // Set the modal message to the constructed template.
                                                        };
                                                    }
                                                } else {
                                                    if (appComponent.bannerInv2[6] === 'isMessage') {
                                                        let template =
                                                            '<div class="contenedor-banner">' +
                                                            '<div class="message-contain">' +
                                                            '<span class="alert-container close relative inline-block">' +
                                                            '<button class="absolute -top-2 -right-1 bg-primary text-neutral border-none rounded-full w-8 h-8 flex items-center justify-center shadow-lg" onclick="document.getElementById(\'bannerInv\').style.display = \'none\'">X</button>' +
                                                            '<a target="' + appComponent.bannerInv2[4] + '" onclick="clickGA(\'Banner Inv\',\'Click Content\',\'\',\'0\');" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="menssage">' +
                                                            '<span data-notify="message">' +
                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                            '</span>' +
                                                            '<img data-notify="icon" class="w-[50%] inline-block float-right" src="' + appComponent.bannerInv2[0] + '">' +
                                                            '</a>' +
                                                            '</span>' +
                                                            '<div>' +
                                                            '<button href="' + appComponent.bannerInv2[3] + '" type="button" class="action-banner bg-primary text-neutral">' +
                                                            '<a href="' + appComponent.bannerInv2[3] + '">' + appComponent.bannerInv2[1] + '</a>' +
                                                            '</button>' +
                                                            '</div>' +
                                                            '</div>' +
                                                            '</div>';
                                                        appComponent.modal = {
                                                            showModal: 'banner',
                                                            messageModal: template, // Set the modal message to the constructed template.
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (message.data.quiskTokenBet != undefined) { // Check if quiskTokenBet is defined in the message data.
                                        if (document.getElementById('quiskForm') != undefined) {
                                        }
                                        var f = document.createElement('form'); // Create a new form element.
                                        f.setAttribute('name', 'quiskForm');
                                        f.setAttribute('id', 'quiskForm');
                                        f.setAttribute('method', 'post');
                                        f.setAttribute('action', appComponent.config.QuiskUrlBetting); // Set the form action to the Quisk URL.
                                        var i = document.createElement('input');
                                        i.setAttribute('type', 'text');
                                        i.setAttribute('name', 'merchantKey');
                                        i.setAttribute('value', appComponent.config.QuiskMerchantKey); // Set the merchant key.
                                        i.setAttribute('hidden', 'true'); // Hide the input.
                                        var refId = document.createElement('input');
                                        refId.setAttribute('type', 'text');
                                        refId.setAttribute('name', 'refId');
                                        refId.setAttribute('value', message.data.quiskTokenBet.userId); // Set the user ID.
                                        refId.setAttribute('hidden', 'true'); // Hide the input.
                                        f.appendChild(refId); // Append the refId input to the form.
                                        var phone = document.createElement('input');
                                        phone.setAttribute('type', 'text');
                                        phone.setAttribute('name', 'phone');
                                        phone.setAttribute('value', message.data.quiskTokenBet.phone); // Set the phone number.
                                        phone.setAttribute('hidden', 'true'); // Hide the input.
                                        f.appendChild(phone); // Append the phone input to the form.
                                        var amount = document.createElement('input');
                                        amount.setAttribute('type', 'text');
                                        amount.setAttribute('name', 'amount');
                                        amount.setAttribute('value', message.data.quiskTokenBet.amount); // Set the amount.
                                        amount.setAttribute('hidden', 'true'); // Hide the input.
                                        f.appendChild(amount); // Append the amount input to the form.
                                        var currency = document.createElement('input');
                                        currency.setAttribute('type', 'text');
                                        currency.setAttribute('name', 'currency');
                                        currency.setAttribute('value', message.data.quiskTokenBet.currency); // Set the currency.
                                        currency.setAttribute('hidden', 'true'); // Hide the input.
                                        f.appendChild(currency); // Append the currency input to the form.
                                        var s = document.createElement('input');
                                        s.setAttribute('type', 'submit');
                                        s.setAttribute('value', 'Submit');
                                        s.setAttribute('hidden', 'true'); // Hide the submit button.
                                        f.appendChild(i); // Append the merchant key input to the form.
                                        f.appendChild(s); // Append the submit button to the form.
                                        try {
                                            document.getElementsByTagName('body')[0].appendChild(f); // Append the form to the body.
                                        } catch (e) {
                                        }
                                        if (document.getElementById('quiskForm') !== undefined && document.getElementById('quiskForm') !== null) {
                                            document.getElementById('quiskForm')?.setAttribute('target', 'login'); // Set the target for the form submission.
                                            document.getElementById('quiskForm')?.setAttribute('action', appComponent.config.QuiskUrlBetting); // Set the action for the form submission.
                                        }
                                        window.open('', 'login', 'width=500,height=550,toolbar=-100'); // Open a new window for login.
                                        var quiskForm = <HTMLFormElement>document.getElementById('quiskForm'); // Get the quisk form element.
                                        quiskForm.submit(); // Submit the form.
                                    }
                                    if (message.data && message.data.data) {
                                        let parseRoulette = JSON.parse(message.data.data);
                                        if (parseRoulette.roulette !== undefined && parseRoulette.roulette.length > 0) {
                                            const rouletteData = parseRoulette.roulette[0];

                                            appComponent.roulette = rouletteData;

                                            setTimeout(() => {
                                                const modalId = `roulette-${rouletteData.Id}`;

                                                const observer = new MutationObserver((mutations, obs) => {
                                                    const modalElement = document.getElementById(modalId);
                                                    console.log("Buscando modal:", modalId, modalElement);

                                                    if (modalElement) {
                                                        console.log("Modal detectado:", modalElement);

                                                        const notificationId = message.data.id_notification;
                                                        let params = { id_notification: notificationId };

                                                        ApiService.request('update_status_notification', params)
                                                            .then((response: any) => {
                                                                if (response.code != 0) {
                                                                    console.error("Error actualizando notificación");
                                                                }
                                                            });

                                                        obs.disconnect();
                                                    }
                                                });

                                                observer.observe(document.body, {
                                                    childList: true,
                                                    subtree: true,
                                                });
                                            }, 100);
                                        }
                                    }
                                    if (message.data.depositPopup != undefined && message.data.depositPopup.length > 0) {
                                        appComponent.modal = { // Set the modal for deposit promotion.
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
                                        appComponent.array_loyalty_price = message.data.loyalty_price; // Update the loyalty price array.
                                        appComponent.loyalty_price = message.data.loyalty_price[0]; // Set the current loyalty price.
                                        apiService.request('read_user_message', {
                                            message_id: appComponent.loyalty_price['uid'], // Request user message for loyalty price.
                                        }).then(r => console.log(r));
                                    }
                                    if (message.data.loyalty_popup != undefined && message.data.loyalty_popup.length > 0) {
                                        message.data.loyalty_popup.forEach((input_template) => {
                                            var dateP = new Date(input_template.date); // Create a date object from the input template date.
                                            dateP.setSeconds(dateP.getSeconds() + 30); // Add 30 seconds to the date.
                                            input_template.date = appComponent.datePipe.transform(dateP, 'MMM d, y, h:mm:ss a'); // Transform the date format.
                                        });
                                        if (message.data.loyalty_popup != undefined && message.data.loyalty_popup.length > 0) {
                                            appComponent.array_loyalty_popup = message.data.loyalty_popup; // Update the loyalty popup array.
                                            appComponent.loyalty_popup = message.data.loyalty_popup[0]; // Set the current loyalty popup.
                                        }
                                    }
                                    if (message.data.redirectUrl != undefined) {
                                        window.location.href = message.data.redirectUrl; // Redirect to the specified URL.
                                    }
                                    if (message.data.action != undefined && message.data.action != '') {
                                        console.log('modalSocket:', message.data.action); // Log the action from the message data.
                                        appComponent.modalV2 = {
                                            showModal: 'programmable',
                                            messageModal: message.data.action, // Set the modal message to the action.
                                        };
                                    }
                                    if (message.data.unread_count != undefined) {
                                        appComponent.mensajesUnread = message.data.unread_count;
                                    }
                                    //                                     if (message.data.id_notification != undefined) {
                                    //                                             const rouletteId = message.data.id_notification
                                    //                                             const modalRoulette = `roulette-${rouletteId}`;

                                    //                                             const observer = new MutationObserver((mutation, obs) => {
                                    //                                                 const modalElement = document.getElementById(modalRoulette)
                                    //                                                 if(modalElement){
                                    //  let params = {
                                    //                                                 id_notification: rouletteId,
                                    //                                             }
                                    //                                             ApiService.request('update_status_notification', params)
                                    //                                                 .then((response : any) => {
                                    //                                                     if (response.code != 0) {
                                    //                                                         console.error("Error actualizando notificación");
                                    //                                                     }
                                    //                                                 })

                                    //                                                 obs.disconnect()
                                    //                                                 }
                                    //                                             })
                                    //                                            observer.observe(document.body, {
                                    //                                             childList: true,
                                    //                                             subtree: true
                                    //                                            })
                                    //                                         }
                                }
                            }
                        } catch (e) {
                            // Handle any errors that occur during WebSocket connection setup
                            appComponent.onWSPartnerCountry();
                        }
                    }
                },
                /**
                 * Initializes the WebSocket connection for general purposes.
                 * This function dynamically loads a script and sets up the WebSocket connection to receive messages.
                 */
                onWSGeneral() {
                    /**
                     * Loads a script dynamically by creating a script element and appending it to the document body.
                     * @param {string} id - The ID to assign to the script element.
                     * @param {string} url - The URL of the script to load.
                     */
                    function loadScript(id, url) {
                        const script = document.createElement('script'); // Create a new script element
                        script.id = id; // Set the ID of the script element
                        script.src = url; // Set the source URL of the script
                        document.body.appendChild(script); // Append the script element to the document body
                    }

                    // Check if the necessary configuration for WebSocket is defined
                    if (appComponent.config != undefined && appComponent.config.wsGeneral != undefined && appComponent.config.wsGeneral.urlScript != undefined) {
                        // Load the script specified in the configuration
                        loadScript(appComponent.config.wsGeneral.id, appComponent.config.wsGeneral.urlScript);

                        // Set a timeout to allow the script to load before executing the following code
                        setTimeout(() => {
                            appComponent.dga = window.dga; // Assign the global dga object to appComponent.dga

                            // Connect to the WebSocket using the provided configuration
                            appComponent.dga.connect(
                                appComponent.config.wsGeneral.urlWS, // WebSocket URL
                                appComponent.config.wsGeneral.casinoId, // Casino ID
                                appComponent.config.wsGeneral.tableIds // Table IDs
                            );

                            // Define the onMessage handler for incoming WebSocket messages
                            appComponent.dga.onMessage = function (response) {
                                // Check if the response tableId is included in the configured tableIds
                                if (appComponent.config.wsGeneral.tableIds.includes(response.tableId)) {
                                    // Filter out the item with the same tableId from peopleInGames
                                    appComponent.peopleInGames = appComponent.peopleInGames.filter(item => item.tableId !== response.tableId);
                                    // Add the new response to the peopleInGames array
                                    appComponent.peopleInGames.push(response);
                                }
                            }
                        }, 2000); // Delay of 2000 milliseconds before executing the connection logic
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
                /**
                 * Initiates a WebSocket connection and manages session restoration.
                 * This function checks the current view and attempts to restore the user's session if applicable.
                 */
                whatsUp2() {
                    // Check if the current view is defined
                    if (appComponent.viewActual != undefined) {
                        // Ensure the current view is not one of the specified banner views
                        if (appComponent.viewActual != '/banner-left' &&
                            appComponent.viewActual != '/banner-leftnl' &&
                            appComponent.viewActual != '/banner-right' &&
                            appComponent.viewActual != '/banner-rightnl' &&
                            appComponent.viewActual != '/banner-leftnl' &&
                            appComponent.viewActual != '/banner-rightnl' &&
                            appComponent.viewActual != '/banner-topcenternl' &&
                            appComponent.viewActual != '/banner-topcenter' &&
                            appComponent.viewActual != '') {

                            // Retrieve the session ID from the user token
                            var session_id = appComponent.tokenUser;

                            // Check if the session ID is valid and WebSocket is not open
                            if (session_id != '' && session_id != undefined && session_id != null && !appComponent.wsOpen) {
                                // Prepare data for restoring login
                                var data = {
                                    'command': 'restore_login',
                                    'params': {
                                        'user_id': 0,
                                        'auth_token': session_id
                                    }
                                };
                                // Set headers for the WebSocket connection
                                var headers = {
                                    'swarm-session': session_id
                                };
                                var Service = {};
                                var callbacks = {};
                                var currentCallbackId = 0;
                                try {
                                    // Create a new WebSocket connection
                                    var ws = new WebSocket(appComponent.config.url_websocket != undefined ?
                                        appComponent.config.url_websocket.replace('CHANNELID', appComponent.channel_id) :
                                        appComponent.config.urlApi.ws.replace('CHANNELID', appComponent.channel_id));

                                    // Store the WebSocket instance in the global window object
                                    (window as any).ws = ws;
                                    var step1 = 0;

                                    // Define the onopen event handler for the WebSocket
                                    ws.onopen = function () {
                                        // Send an event to Google Analytics if available
                                        if ((window as any).ga != undefined) {
                                            (window as any).ga('send', 'event', 'OpenWS', 'OpenWS', appComponent.channel_id);
                                        }
                                        console.log("Socket has been opened!");
                                        appComponent.wsOpen = true; // Mark WebSocket as open
                                    };

                                    // Define the onclose event handler for the WebSocket
                                    ws.onclose = function (event) {
                                        appComponent.wsOpen = false; // Mark WebSocket as closed
                                        // Reattempt to call whatsUp2 if the user is logged in
                                        if (appComponent.session.logueado) {
                                            appComponent.whatsUp2();
                                        }
                                    };

                                    // Define the onmessage event handler for the WebSocket
                                    ws.onmessage = function (message) {
                                        listener(JSON.parse(message.data)); // Process incoming messages
                                    };

                                    /**
                                     * Sends a request through the WebSocket connection and returns a promise.
                                     *
                                     * @param {Object} request - The request object to be sent through the WebSocket.
                                     * @returns {Promise<any>} A promise that resolves with the response data.
                                     */
                                    function sendRequest(request) {
                                        // Create a new promise that resolves after 1 second
                                        var defer = new Promise(function (resolve, reject) {
                                            setTimeout(function () {
                                                resolve('I promise to return this after 1 second!');
                                            }, 1000);
                                        });

                                        // Generate a unique callback ID for the request
                                        var callbackId = getCallbackId();

                                        // Store the callback in the callbacks object with the current timestamp
                                        callbacks[callbackId] = {
                                            time: new Date(),
                                            cb: defer
                                        };

                                        // Attach the callback ID to the request object
                                        request.rid = callbackId;

                                        // Send the request through the WebSocket connection
                                        ws.send(JSON.stringify(request));

                                        // Return the promise
                                        return defer;
                                    }

                                    /**
                                     * Handles incoming WebSocket messages and processes the data.
                                     *
                                     * @param {Object} data - The data received from the WebSocket.
                                     */
                                    function listener(data) {
                                        var messageObj = data;
                                        // if (messageObj.data.id_notification != undefined) {
                                        //     console.log('Entro')
                                        //     const rouletteId = messageObj.data.id_notification
                                        //     console.log('Id notification', rouletteId)
                                        //     const modalRoulette = `roulette-${rouletteId}`;
                                        //     console.log('modalRoulette', modalRoulette)

                                        //     const observer = new MutationObserver((mutations, obs) => {
                                        //         console.log('Entro al observer')
                                        //         const modalElement = document.getElementById(modalRoulette)
                                        //         console.log('ModalElement', modalElement)
                                        //         if(modalElement){
                                        //             console.log('Entro al modal Element')
                                        //     let params = {
                                        //         id_notification: rouletteId,
                                        //     }
                                        //     ApiService.request('update_status_notification', params)
                                        //         .then((response : any) => {
                                        //             if (response.code != 0) {
                                        //                 console.error("Error actualizando notificación");
                                        //             }
                                        //         })

                                        //         obs.disconnect()
                                        //         }
                                        //     })
                                        //    observer.observe(document.body, {
                                        //     childList: true,
                                        //     subtree: true
                                        //    })
                                        // }
                                        //console.log("Received data from websocket: ", messageObj);
                                        // If an object exists with callback_id in our callbacks object, resolve it
                                        /* if (callbacks.hasOwnProperty(messageObj.callback_id)) {
                                     //console.log(callbacks[messageObj.callback_id]);
                                     appComponent.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
                                     delete callbacks[messageObj.callbackID];
                                 }*/
                                        if (false) {
                                            step1 = 1;
                                            /*sendRequestWS({
                                        'command': 'whats_up_push_notifications'
                                    });*/
                                        } else {
                                            console.log("Received data from websocket2: ", messageObj.data);

                                            if (messageObj.data != undefined) {
                                                if (messageObj.data != undefined) {
                                                    if (messageObj.data.action === "onDepositedBalence") {
                                                        localStorage.setItem("ModalDepositShow", "false");
                                                    }
                                                    if (messageObj.data.action === "onNextSportbookBet") {
                                                        localStorage.setItem("ModalSporbookShow", "false");
                                                    }
                                                    if (messageObj.data.action === "onNextCasinoBet") {
                                                        localStorage.setItem("ModalCasinoShow", "false");
                                                    }
                                                    if (messageObj.data.logout != undefined) {
                                                        if ((window as any).ws != undefined) {
                                                            (window as any).ws.close();
                                                        }
                                                        apiService.request('logout', {}).then((response: any) => {
                                                            if (response.code == 0) {
                                                                if ((window as any).posthog){
                                                                    (window as any).posthog?.reset()
                                                                }
                                                                appComponent.tokenSB = "";
                                                                appComponent.providerSportbook = "";
                                                                appComponent.session = {
                                                                    grupo: '',
                                                                    logueado: false,
                                                                    usuario: '',
                                                                    id_user: "",
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
                                                                    last_login_ip: "",
                                                                    cedula: "",
                                                                    celular: "",
                                                                    fecha_nacim: "",
                                                                    iframemini_bannerleft: "",
                                                                    iframemini_bannerright: "",
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
                                                                    theme_color_mode: null,
                                                                    doc_expired: false
                                                                }
                                                                apiService.setAuthToken('');

                                                                try {
                                                                    (window as any).altenarWSDK.set({ token: '' });
                                                                } catch (e) {

                                                                }
                                                                window.localStorage.removeItem("auth_token");
                                                                window.localStorage.removeItem('modal_shown');

                                                                appComponent.tokenUser = "";
                                                            }
                                                        })
                                                        appComponent.tokenSB = "";
                                                        appComponent.providerSportbook = "";
                                                        appComponent.session = {
                                                            grupo: '',
                                                            logueado: false,
                                                            usuario: '',
                                                            id_user: "",
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
                                                            last_login_ip: "",
                                                            cedula: "",
                                                            celular: "",
                                                            fecha_nacim: "",
                                                            iframemini_bannerleft: "",
                                                            iframemini_bannerright: "",
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
                                                            theme_color_mode: null,
                                                            doc_expired: false
                                                        }
                                                        apiService.setAuthToken('');
                                                        appComponent.tokenUser = "";
                                                        window.localStorage.removeItem("auth_token");
                                                        window.localStorage.removeItem('modal_shown');

                                                        // appComponent.loadView = false;
                                                        if (appComponent.config.versionAltenar == "2") {
                                                            window.location.href = '/';
                                                        }

                                                        router.push('/');
                                                        setTimeout(() => {
                                                            // appComponent.loadView = true;
                                                        }, 1000);
                                                        //vappComponent.logOut();
                                                    }

                                                    if (messageObj.data && messageObj.data.data) {
                                                        let parseBonuses = JSON.parse(messageObj.data.data);
                                                        if (parseBonuses.bonuses !== undefined && parseBonuses.bonuses.length > 0) {
                                                            appComponent.showMainModalBonus = true; // Show the main modal for bonuses
                                                            appComponent.modal.messageModal = parseBonuses.bonuses; // Set the message modal to the bonuses data

                                                            const notificationId = messageObj.data.id_notification;

                                                            let params = { id_notification: notificationId };
                                                            ApiService.request('update_status_notification', params)
                                                                .then((response: any) => {
                                                                    if (response.code !== 0) {
                                                                        console.log("Ocurrio un error", response);
                                                                    }
                                                                })
                                                                .catch((error: any) => {
                                                                    console.error("Error al actualizar el estado de la notificación:", error);
                                                                })
                                                        }
                                                    }

                                                    if (messageObj.data.messages != undefined) {
                                                        messageObj.data.messages.forEach(function (element) {
                                                            appComponent.modalAlert.unshift(
                                                                {
                                                                    type: "notification",
                                                                    message: emojify.replace(element.body)
                                                                }
                                                            )
                                                        });
                                                    }

                                                    if (messageObj.data.NotificationBalance != undefined) {
                                                        appComponent.notificationsToast = messageObj.data.NotificationBalance;
                                                    }

                                                    if (messageObj.data.boxes != undefined) {
                                                        if (JSON.stringify(messageObj.data.boxes) != appComponent.boxesOrig) {
                                                            appComponent.boxesOrig = JSON.stringify(messageObj.data.boxes);
                                                            if (messageObj.data.boxes != undefined && messageObj.data.boxes != null && messageObj.data.boxes.length > 0) {
                                                                appComponent.boxes = messageObj.data.boxes;
                                                                appComponent.boxes.forEach((item) => {
                                                                    item.title = emojify.replace(item.title)
                                                                })
                                                                setInterval(function () {
                                                                    appComponent.moveLeft();
                                                                }, 5000);
                                                            }
                                                        }
                                                    }

                                                    if (messageObj.data.bannerInv != undefined && messageObj.data.bannerInv != '') {
                                                        if (JSON.stringify(messageObj.data.bannerInv) != appComponent.bannerInvOrig) {
                                                            appComponent.bannerInvOrig = JSON.stringify(messageObj.data.bannerInv);
                                                            appComponent.bannerInv = [];
                                                            appComponent.bannerInv2 = messageObj.data.bannerInv;
                                                            var style1 = "<style>table, div, .u_content_text {min-width: auto !important;}</style>"
                                                            appComponent.bannerInv2[2] = style1.concat(appComponent.bannerInv2[2]);
                                                            if (appComponent.bannerInv2[5] !== "" && appComponent.bannerInv2[6] !== "isMessage") {
                                                                if (appComponent.bannerInv2[7] !== "" && appComponent.bannerInv2[7] !== undefined) {
                                                                    let template =
                                                                        '<div class="contenedor-banner-pet">' +
                                                                        '<div class="tittle-destacado">' + appComponent.bannerInv2[7] + '</div>' +
                                                                        '<div class="hidden" style="width: 430px; height: 263px;">' +
                                                                        '<div class="close alert-container">' +
                                                                        '<i class="fa fa-times"></i>' +
                                                                        '</div>' +
                                                                        '<div class="expand alert-container">' +
                                                                        '<i class="fa fa-expand"></i>' +
                                                                        '</div>' +
                                                                        '<div class="body" style="width: 100%; height: 100%;">' +
                                                                        '<a id="juego-iframe" href="' + appComponent.bannerInv2[5] + '">' +
                                                                        '<iframe style="width: 100%; height: 100%;" src="' + appComponent.bannerInv2[5] + '" frameborder="0" allowfullscreen=""></iframe>' +
                                                                        '</a>' +
                                                                        '</div>' +
                                                                        '</div>' +
                                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                                        '<button type="button" aria-hidden="true" class="mr-[85px]" data-notify="dismiss">×</button>' +
                                                                        '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                                        '<span class="alert-container close" >' +
                                                                        '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                                        '<span data-notify="title">' +
                                                                        '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                                        '</span>' +
                                                                        '<span data-notify="message">' +
                                                                        '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                                        '</span>' +
                                                                        '</a>' +
                                                                        '</span>' +
                                                                        '</div>' +
                                                                        '</div>'

                                                                    appComponent.modal = {
                                                                        showModal: "banner",
                                                                        messageModal: template
                                                                    }
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
                                                                        '<a id="juego-iframe" lightbox="iframe" href="' + appComponent.bannerInv2[5] + '">' +
                                                                        '<iframe style="width: 100%; height: 100%;" src="' + appComponent.bannerInv2[5] + '" frameborder="0" allowfullscreen=""></iframe>' +
                                                                        '</a>' +
                                                                        '</div>' +
                                                                        '</div>' +
                                                                        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' + appComponent.bannerInv2[0] + '" role="alert">' +
                                                                        '<button  id="closeBannerInv" type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                                        '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                                        '<span class="alert-container close" >' +
                                                                        '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                                        '<span data-notify="title">' +
                                                                        '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                                        '</span>' +
                                                                        '<span data-notify="message">' +
                                                                        '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                                        '</span>' +
                                                                        '</a>' +
                                                                        '</span>' +
                                                                        '</div>' +
                                                                        '</div>'

                                                                    appComponent.modal = {
                                                                        showModal: "banner",
                                                                        messageModal: template
                                                                    }
                                                                }
                                                            } else {
                                                                if (appComponent.bannerInv2[5] === "" && appComponent.bannerInv2[6] !== "isMessage") {
                                                                    if (appComponent.bannerInv2[7] !== "") {
                                                                        let template =
                                                                            '<div class="contenedor-banner-pet hidde">' +
                                                                            '<div class="tittle-destacado">' + appComponent.bannerInv2[7] + '</div>' +
                                                                            '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                                                                            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                                            '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                                            '<span class="alert-container" >' +
                                                                            '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                                            '<span data-notify="title">' +
                                                                            '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                                            '</span>' +
                                                                            '<span data-notify="message">' +
                                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                                            '</span>' +
                                                                            '</a>' +
                                                                            '</span>' +
                                                                            '</div>' +
                                                                            '</div>'

                                                                        appComponent.modal = {
                                                                            showModal: "banner",
                                                                            messageModal: template
                                                                        }
                                                                    } else {
                                                                        let template =
                                                                            '<div class="contenedor-banner-pet hidde">' +
                                                                            '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' + appComponent.bannerInv2[0] + '" role="alert">' +
                                                                            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                                                                            '<img data-notify="icon" class="img-circle pull-left" src="' + appComponent.bannerInv2[0] + '">' +
                                                                            '<span class="alert-container" >' +
                                                                            '<a target="' + appComponent.bannerInv2[4] + '" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="pet-menssage">' +
                                                                            '<span data-notify="title">' +
                                                                            '<div>' + appComponent.bannerInv2[1] + '</div>' +
                                                                            '</span>' +
                                                                            '<span data-notify="message">' +
                                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                                            '</span>' +
                                                                            '</a>' +
                                                                            '</span>' +
                                                                            '</div>' +
                                                                            '</div>'

                                                                        appComponent.modal = {
                                                                            showModal: "banner",
                                                                            messageModal: template
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (appComponent.bannerInv2[6] === "isMessage") {
                                                                        let template =
                                                                            '<div class="contenedor-banner">' +
                                                                            '<div class="message-contain">' +
                                                                            '<span class="alert-container close relative inline-block">' +
                                                                            '<button class="absolute -top-2 -right-1 bg-primary text-neutral border-none rounded-full w-8 h-8 flex items-center justify-center shadow-lg" onclick="document.getElementById(\'bannerInv\').style.display = \'none\'">X</button>' +
                                                                            '<a target="' + appComponent.bannerInv2[4] + '" onclick="clickGA(\'Banner Inv\',\'Click Content\',\'\',\'0\');" data-notify="url" href="' + appComponent.bannerInv2[3] + '" class="menssage">' +
                                                                            '<span data-notify="message">' +
                                                                            '<div>' + appComponent.bannerInv2[2] + '</div>' +
                                                                            '</span>' +
                                                                            '<img data-notify="icon" class="w-[50%] inline-block float-right" src="' + appComponent.bannerInv2[0] + '">' +
                                                                            '</a>' +
                                                                            '</span>' +
                                                                            '<div>' +
                                                                            '<button href="' + appComponent.bannerInv2[3] + '" type="button" class="action-banner bg-primary text-neutral">' +
                                                                            '<a href="' + appComponent.bannerInv2[3] + '">' + appComponent.bannerInv2[1] + '</a>' +
                                                                            '</button>' +
                                                                            '</div>' +
                                                                            '</div>' +
                                                                            '</div>'

                                                                        appComponent.modal = {
                                                                            showModal: "banner",
                                                                            messageModal: template
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    if (messageObj.data.quiskTokenBet != undefined) {
                                                        if (document.getElementById("quiskForm") != undefined) {
                                                            //document.getElementById("quiskForm").remove();
                                                        }


                                                        var f = document.createElement("form");
                                                        f.setAttribute('name', "quiskForm");
                                                        f.setAttribute('id', "quiskForm");
                                                        f.setAttribute('method', "post");
                                                        f.setAttribute('action', appComponent.config.QuiskUrlBetting);

                                                        var i = document.createElement("input"); //input element, text
                                                        i.setAttribute('type', "text");
                                                        i.setAttribute('name', "merchantKey");
                                                        i.setAttribute('value', appComponent.config.QuiskMerchantKey);
                                                        i.setAttribute('hidden', "true");

                                                        var refId = document.createElement("input"); //input element, text
                                                        refId.setAttribute('type', "text");
                                                        refId.setAttribute('name', "refId");
                                                        refId.setAttribute('value', messageObj.data.quiskTokenBet.userId);
                                                        refId.setAttribute('hidden', "true");
                                                        f.appendChild(refId);



                                                        var phone = document.createElement("input"); //input element, text
                                                        phone.setAttribute('type', "text");
                                                        phone.setAttribute('name', "phone");
                                                        phone.setAttribute('value', messageObj.data.quiskTokenBet.phone);
                                                        phone.setAttribute('hidden', "true");
                                                        f.appendChild(phone);

                                                        var amount = document.createElement("input"); //input element, text
                                                        amount.setAttribute('type', "text");
                                                        amount.setAttribute('name', "amount");
                                                        amount.setAttribute('value', messageObj.data.quiskTokenBet.amount);
                                                        amount.setAttribute('hidden', "true");
                                                        f.appendChild(amount);

                                                        var currency = document.createElement("input"); //input element, text
                                                        currency.setAttribute('type', "text");
                                                        currency.setAttribute('name', "currency");
                                                        currency.setAttribute('value', messageObj.data.quiskTokenBet.currency);
                                                        currency.setAttribute('hidden', "true");
                                                        f.appendChild(currency);

                                                        var s = document.createElement("input"); //input element, Submit button
                                                        s.setAttribute('type', "submit");
                                                        s.setAttribute('value', "Submit");
                                                        s.setAttribute('hidden', "true");

                                                        f.appendChild(i);
                                                        f.appendChild(s);

                                                        //and some more input elements here
                                                        //and dont forget to add a submit button

                                                        try {
                                                            document.getElementsByTagName('body')[0].appendChild(f);
                                                        } catch (e) { }


                                                        if (document.getElementById("quiskForm") !== undefined && document.getElementById("quiskForm") !== null) {
                                                            document.getElementById("quiskForm")?.setAttribute("target", "login");
                                                            document.getElementById('quiskForm')?.setAttribute('action', appComponent.config.QuiskUrlBetting);

                                                        }

                                                        window.open("", "login", "width=500,height=550,toolbar=-100");
                                                        var quiskForm = <HTMLFormElement>document.getElementById('quiskForm');
                                                        quiskForm.submit();

                                                    }

                                                    if (messageObj.data && messageObj.data.data) {
                                                        let parseRoulette = JSON.parse(messageObj.data.data);
                                                        if (parseRoulette.roulette !== undefined && parseRoulette.roulette.length > 0) {
                                                            const rouletteData = parseRoulette.roulette[0];
                                                            appComponent.roulette = rouletteData;

                                                            appComponent.modalRoulette = true;

                                                            const modalId = `roulette-${rouletteData.Id}`;
                                                            const notificationId = messageObj.data.id_notification;
                                                            let retries = 0;
                                                            const maxRetries = 20;

                                                            const checkExist = setInterval(() => {
                                                                const modalElement = document.getElementById(modalId);
                                                                if (modalElement) {
                                                                    clearInterval(checkExist);
                                                                    let params = { id_notification: notificationId };
                                                                    ApiService.request('update_status_notification', params)
                                                                        .then((response: any) => {
                                                                            if (response.code !== 0) {
                                                                                console.log("Ocurrio un error", response);
                                                                            }
                                                                        })
                                                                        .catch((error: any) => {
                                                                            console.error("Error al actualizar el estado de la notificación:", error);
                                                                        })
                                                                }

                                                                retries++;
                                                                if (retries >= maxRetries) {
                                                                    clearInterval(checkExist);
                                                                }
                                                            }, 100);
                                                        }
                                                    }

                                                    if (messageObj.data.depositPopup != undefined && messageObj.data.depositPopup.length > 0) {
                                                        appComponent.modal = {
                                                            showModal: 'promotiondeposit',
                                                            messageModal: {
                                                                imgPromotion: messageObj.data.depositPopup[0].imgPromotion,
                                                                textButton: messageObj.data.depositPopup[0].textButton,
                                                                imgDecoration: messageObj.data.depositPopup[0].imgDecoration,
                                                                urlButton: messageObj.data.depositPopup[0].urlButton,
                                                            }
                                                        }
                                                    }

                                                    if (messageObj.data.loyalty_price != undefined && messageObj.data.loyalty_price.length > 0) {
                                                        appComponent.array_loyalty_price = messageObj.data.loyalty_price;
                                                        appComponent.loyalty_price = messageObj.data.loyalty_price[0];
                                                        //$("#popupnotification").click();

                                                        apiService.request('read_user_message', {
                                                            message_id: appComponent.loyalty_price['uid']
                                                        }).then(r => console.log(r))

                                                    }

                                                    if (messageObj.data.loyalty_popup != undefined && messageObj.data.loyalty_popup.length > 0) {
                                                        messageObj.data.loyalty_popup.forEach((input_template) => {
                                                            var dateP = new Date(input_template.date);
                                                            dateP.setSeconds(dateP.getSeconds() + 30);
                                                            input_template.date = appComponent.datePipe.transform(dateP, 'MMM d, y, h:mm:ss a');
                                                        });
                                                        if (messageObj.data.loyalty_popup != undefined && messageObj.data.loyalty_popup.length > 0) {
                                                            appComponent.array_loyalty_popup = messageObj.data.loyalty_popup;
                                                            appComponent.loyalty_popup = messageObj.data.loyalty_popup[0];
                                                            //$("#app-popuproad").click();
                                                        }
                                                    }

                                                    if (messageObj.data.redirectUrl != undefined) {
                                                        window.location.href = messageObj.data.redirectUrl;
                                                        //appComponent.router.navigateByUrl(messageObj.data.redirectUrl);
                                                    }

                                                    if (messageObj.data.action != undefined && messageObj.data.action != '') {
                                                        console.log('modalSocket:', messageObj.data.action)
                                                        appComponent.modalV2 = {
                                                            showModal: 'programmable',
                                                            messageModal: messageObj.data.action
                                                        }
                                                    }

                                                    if (messageObj.data.unread_count != undefined) {
                                                        appComponent.mensajesUnread = messageObj.data.unread_count;
                                                    }

                                                    function notifyBackendNotificationShown(options: {
                                                        modalId: string;
                                                        notificationId: string | number | undefined | null;
                                                        timeoutMs?: number;
                                                    }) {
                                                        const { modalId, notificationId, timeoutMs = 10000 } = options;

                                                        if (notificationId == null || notificationId === '') return;

                                                        let done = false;

                                                        const runOnce = () => {
                                                            if (done) return;
                                                            done = true;

                                                            ApiService.request('update_status_notification', { id_notification: notificationId })
                                                                .then((response: any) => {
                                                                    if (response?.code != 0) {
                                                                        console.error('Error updating notification status', response);
                                                                    }
                                                                })
                                                                .catch((err: unknown) => {
                                                                    console.error('Error updating notification status', err);
                                                                });
                                                        };

                                                        const existing = document.getElementById(modalId);
                                                        if (existing) {
                                                            runOnce();
                                                            return;
                                                        }

                                                        const observer = new MutationObserver((_mutations, obs) => {
                                                            const modalElement = document.getElementById(modalId);
                                                            if (!modalElement) return;

                                                            runOnce();
                                                            obs.disconnect();
                                                        });

                                                        observer.observe(document.body, { childList: true, subtree: true });

                                                        window.setTimeout(() => {
                                                            observer.disconnect();
                                                        }, timeoutMs);
                                                    }

                                                    if (messageObj.data.notification_game != undefined) {
                                                        appComponent.notificationGame = messageObj.data.notification_game;
                                                        setTimeout(() => {
                                                            appComponent.showNotificationGameModal = true;

                                                            // notificar al backend que se mostró la notificación
                                                            const notificationId = messageObj.data.id_notification;
                                                            appComponent.notificationGameId = notificationId;
                                                            const modalId = 'notification-game-modal';

                                                            notifyBackendNotificationShown({
                                                                modalId,
                                                                notificationId,
                                                                timeoutMs: 10000,
                                                            });
                                                        }, 1000);
                                                    }
                                                }

                                                /*setTimeout(function() {
                                                sendRequestWS({
                                                        'command': 'whats_up_push_notifications'
                                                });
                                        }, 5000);*/

                                            }


                                        }
                                    }

                                    /**
                                     * Generates a unique callback ID for requests.
                                     * Resets the ID if it exceeds 10000.
                                     * @returns {number} The current callback ID.
                                     */
                                    function getCallbackId() {
                                        currentCallbackId += 1;
                                        if (currentCallbackId > 10000) {
                                            currentCallbackId = 0; // Reset callback ID
                                        }
                                        return currentCallbackId; // Return the current callback ID
                                    }

                                    /**
                                     * Sends a request over WebSocket.
                                     * @param {Object} data - The data to send.
                                     */
                                    function sendRequestWS(data) {
                                        sendRequest((data)); // Call the sendRequest function with data
                                    }

                                    /**
                                     * Sends a 'whats_up' request every 5 seconds if WebSocket is open.
                                     */
                                    function sendRequestWSLive() {
                                        if (appComponent.wsOpen) {
                                            var data2 = {
                                                'command': 'whats_up' // Command to check status
                                            };
                                            sendRequest((data2)); // Send the request
                                            setTimeout(function () {
                                                sendRequestWSLive(); // Recur every 5 seconds
                                            }, 5000);
                                        }
                                    }
                                } catch (e) {
                                    appComponent.whatsUp2(); // Retry if an error occurs
                                }
                            } else {
                                // Retry after 1 second if session ID is invalid or WebSocket is open
                                setTimeout(() => appComponent.whatsUp2(), 1000);
                            }
                        } else {
                            // Retry after 1 second if the current view is not valid
                            if (appComponent.viewActual != '/banner-left' &&
                                appComponent.viewActual != '/banner-right' &&
                                appComponent.viewActual != '/banner-leftnl' &&
                                appComponent.viewActual != '/banner-rightnl' &&
                                appComponent.viewActual != '/banner-topcenternl' &&
                                appComponent.viewActual != '/banner-topcenter') {
                                setTimeout(() => appComponent.whatsUp2(), 1000);
                            }
                        }
                    } else {
                        // Retry after 1 second if the current view is undefined
                        setTimeout(() => appComponent.whatsUp2(), 1000);
                    }
                },
                /**
                 * Logs out the user by closing the WebSocket connection and clearing session data.
                 */
                logOut() {
                    // Send a logout request to the API
                    apiService.request('logout', {}).then(function (response: any) {
                        // Check if the response indicates a successful logout
                        if (response.code == 0) {
                            if ((window as any).posthog){
                                (window as any).posthog?.reset()
                            }
                            // Clear the user's token and reset session data
                            appComponent.tokenSB = "";
                            appComponent.providerSportbook = "";
                            appComponent.session = {
                                grupo: '',
                                logueado: false,
                                usuario: '',
                                id_user: "",
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
                                last_login_ip: "",
                                cedula: "",
                                celular: "",
                                fecha_nacim: "",
                                iframemini_bannerleft: "",
                                iframemini_bannerright: "",
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
                                theme_color_mode: null,
                                doc_expired: false
                            }

                            // Check if the WebSocket connection exists and close it if it does
                            if ((window as any).ws && (window as any).ws.readyState === 1) {
                                (window as any).ws.close();
                            }

                            // Clear the authentication token
                            apiService.setAuthToken('');

                            // Attempt to reset the Altenar SDK and remove the WebSocket
                            try {
                                (window as any).altenarWSDK.set({ token: '', clearBetSlip: true });
                                (window as any).WBS.remove();
                            } catch (e) {
                            }

                            // Identify the user in Hotjar if configured
                            try {
                                if (
                                    appComponent.config.hotjar != undefined &&
                                    appComponent.config.hotjar[appComponent.country] != undefined &&
                                    appComponent.config.hotjar[appComponent.country].active
                                ) {
                                    (window as any).hj('identify', null, {
                                        user_country: appComponent.country,
                                        user_group: '',
                                    });
                                }
                            } catch (e) {
                            }

                            // Remove the authentication token from local storage
                            window.localStorage.removeItem("auth_token");
                            window.localStorage.removeItem('modal_shown');

                            appComponent.tokenUser = "";

                            // Redirect to home if the Altenar version is 2
                            if (appComponent.config.versionAltenar == "2") {
                                window.location.href = '/home';
                            }

                            // Check for Zendesk configuration and remove existing scripts/iframes if necessary
                            if (appComponent.config.zendesk != undefined && appComponent.config.zendesk[appComponent.country] != undefined && appComponent.config.zendesk[appComponent.country].name == 'centribal') {
                                const scriptRemove = document.getElementById('cen_snippet_static');
                                const divIframeRemove = document.getElementById('centribal_iframe_layout');
                                if (scriptRemove) {
                                    scriptRemove.remove();
                                    divIframeRemove?.remove();
                                    const div = document.createElement('div');
                                    div.setAttribute('id', 'centribal_iframe_layout');
                                    div.classList.add('centribal_hidden');

                                    // Append the new div based on the layout configuration
                                    if (appComponent.config.layout === 3) {
                                        document.querySelector('body')?.appendChild(div);
                                    } else if (appComponent.config.layout === 2) {
                                        const divChat = document.getElementById('centribal_chat');
                                        divChat?.appendChild(div);
                                    }

                                    // Dynamically load the Zendesk script after a delay
                                    setTimeout(() => {
                                        const script = document.createElement('script');
                                        script.setAttribute('id', 'cen_snippet_static');
                                        script.setAttribute('control_iframe', '');
                                        script.setAttribute('type', 'text/javascript');
                                        script.setAttribute('src', appComponent.config.zendesk[appComponent.country].key);
                                        document.querySelector('body')?.appendChild(script);
                                    }, 500);
                                }
                            }

                            // Navigate to the home route
                            router.push("/home");
                        }
                    })
                },
                /**
                 * Refreshes the user's balance information by making an API request.
                 * This function retrieves various balance types and updates the appComponent state accordingly.
                 */
                refreshBalance2() {
                    // Parameters for the API request to fetch user balances
                    const params = {
                        source: 'user_balances',// Source of the data
                        subscribe: true, // Indicates that the request is a subscription
                        what: { profile: [] }, // Specifies the data structure to retrieve
                    };
                    // Making an API request to get user balance information
                    return apiService.request('get', params).then((response: any) => {
                        // Extracting user profile data from the response
                        let userProfile = response.data;

                        // Updating total balance if it exists in the response
                        if (userProfile.balance != undefined) {
                            appComponent.saldo_total = parseFloat(userProfile.balance);
                        }

                        // Updating deposit balance if it exists in the response
                        if (userProfile.balanceDeposit != undefined) {
                            appComponent.saldo_recarga = parseFloat(userProfile.balanceDeposit);
                        }

                        // Updating winning balance if it exists in the response
                        if (userProfile.balanceWinning != undefined) {
                            appComponent.saldo_retiro = parseFloat(userProfile.balanceWinning);
                        }

                        // Updating bonus balance if it exists in the response
                        if (userProfile.balanceBonus != undefined) {
                            appComponent.saldo_bono = parseFloat(userProfile.balanceBonus);
                        }

                        // Updating free bet balance if it exists in the response
                        if (userProfile.balanceFreebet != undefined) {
                            appComponent.saldo_freebet = parseFloat(userProfile.balanceFreebet);
                        }

                        // Updating free casino balance if it exists in the response
                        if (userProfile.balanceFreecasino != undefined) {
                            appComponent.saldo_freeCasino = userProfile.balanceFreecasino;
                        }

                        return response;
                    });
                },
                /**
                 * Refreshes the user's balance information by making an API request.
                 * This function retrieves various balance types and updates the appComponent state accordingly.
                 */
                refreshBalance3() {
                    // Parameters for the API request to fetch user balance information
                    const params = {
                        source: 'user_balances', // Source of the data
                        type: "bonuses", // Type of balance to retrieve
                        subscribe: true, // Indicates whether to subscribe to updates
                        what: { profile: [] }, // Specifies the data structure to request
                    };

                    // Making an API request to get user balance data
                    return apiService.request('get', params).then((response: any) => {
                        // Extracting user profile data from the API response
                        let userProfile = response.data;

                        // Updating total balance if it exists in the response
                        if (userProfile.balance != undefined) {
                            appComponent.saldo_total = parseFloat(userProfile.balance);
                        }
                        // Updating deposit balance if it exists in the response
                        if (userProfile.balanceDeposit != undefined) {
                            appComponent.saldo_recarga = parseFloat(userProfile.balanceDeposit);
                        }
                        // Updating winning balance if it exists in the response
                        if (userProfile.balanceWinning != undefined) {
                            appComponent.saldo_retiro = parseFloat(userProfile.balanceWinning);
                        }
                        // Updating bonus balance if it exists in the response
                        if (userProfile.balanceBonus != undefined) {
                            appComponent.saldo_bono = parseFloat(userProfile.balanceBonus);
                        }
                        // Updating free bet balance if it exists in the response
                        if (userProfile.balanceFreebet != undefined) {
                            appComponent.saldo_freebet = parseFloat(userProfile.balanceFreebet);
                        }
                        // Updating free casino balance if it exists in the response
                        if (userProfile.balanceFreecasino != undefined) {
                            appComponent.saldo_freeCasino = userProfile.balanceFreecasino;
                        }
                        
                        return response
                    });
                },
                /**
                 * Selects a wallet and initiates a request to configure it.
                 * If the request is successful, it navigates to the wallet page.
                 * If there is an error, it displays a notification modal with the error message.
                 */
                selectWallet() {
                    // Data object to be sent in the API request
                    const data = {
                        setWallet: 0 // Indicates the wallet to be set
                    }

                    // Making an API request to 'wallet_config' with the data object
                    apiService.request('wallet_config', data).then(function (response: any) {
                        // Check if the response code indicates success
                        if (response.code == 0) {
                            // Navigate to the wallet page on success
                            router.push('/wallet');
                        } else {
                            // Initialize an error message variable
                            var error_mensaje = "";

                            // Check if there is a specific error code in the response
                            if (response.error_code != undefined) {
                                error_mensaje = 'ERROR' + (response.error_code).toString(); // Construct error message
                            }

                            // If no specific error message, set a generic error message
                            if (error_mensaje == "") {
                                error_mensaje = 'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde';
                            }

                            // Configure the modal to display the error message
                            appComponent.modal = {
                                showModal: "notification", // Type of modal to show
                                titleModal: 'Error!', // Title of the modal
                                messageModal: error_mensaje, // Message to display in the modal
                                buttonModal: "Aceptar", // Text for the modal button
                                orderModal: "closeModal" // Action to take when the modal is closed
                            }
                        }
                    });
                },
                /**
                 * Initiates the Quisk betting process.
                 * Checks if the phoneUser is defined and not empty.
                 * If valid, it sets up a modal notification for the user.
                 * If not valid, it retries the Quisk betting process after 5 seconds.
                 */
                quiskBetting() {
                    // Check if phoneUser is defined and not an empty string
                    if (appComponent.phoneUser != undefined && appComponent.phoneUser != '') {
                        // Configure modal properties for notification
                        appComponent.modal = {
                            showModal: "notification", // Type of modal to show
                            titleModal: 'Mensaje', // Title of the modal
                            messageModal: 'Quisk Autorizacion', // Message to display in the modal
                            buttonModal: "Proceder", // Text for the modal button
                            orderModal: "Quisk" // Order type associated with the modal
                        }
                    } else {
                        // Retry the Quisk betting process after 5 seconds if phoneUser is invalid
                        setTimeout(() => {
                            appComponent.quiskBetting()
                        }, 5000);
                    }
                },
                /**
                 * Creates and submits a form to check the balance using Quisk service.
                 * The form is dynamically created and submitted to a specified URL.
                 */
                checkBalanceQuisk() {
                    // Check if the form already exists and remove it if it does
                    if ((document.getElementById("quiskForm") as any) != undefined) {
                        (document.getElementById("quiskForm") as any).remove();
                    }

                    // Create a new form element
                    var f = document.createElement("form");
                    f.setAttribute('name', "quiskForm"); // Set the name attribute of the form
                    f.setAttribute('id', "quiskForm");   // Set the id attribute of the form
                    f.setAttribute('method', "post");      // Set the method to POST
                    f.setAttribute('action', appComponent.config.QuiskUrlCheckBalance); // Set the action URL

                    // Create an input for the merchant key
                    var i = document.createElement("input");
                    i.setAttribute('type', "text"); // Set input type to text
                    i.setAttribute('name', "merchantKey"); // Set the name attribute
                    i.setAttribute('value', appComponent.config.QuiskMerchantKey); // Set the value to the merchant key
                    i.setAttribute('hidden', "true"); // Hide the input

                    // Create an input for the user's phone number
                    var phone = document.createElement("input");
                    phone.setAttribute('type', "text"); // Set input type to text
                    phone.setAttribute('name', "phone"); // Set the name attribute
                    phone.setAttribute('value', appComponent.phoneUser); // Set the value to the user's phone number
                    phone.setAttribute('hidden', "true"); // Hide the input

                    // Append the phone input to the form
                    f.appendChild(phone);

                    // Create a submit button
                    var s = document.createElement("input");
                    s.setAttribute('type', "submit"); // Set input type to submit
                    s.setAttribute('value', "Submit"); // Set the button text
                    s.setAttribute('hidden', "true"); // Hide the button

                    // Append the merchant key input and submit button to the form
                    f.appendChild(i);
                    f.appendChild(s);

                    // Attempt to append the form to the body of the document
                    try {
                        document.getElementsByTagName('body')[0].appendChild(f);
                    } catch (e) {
                        // Catch any errors that occur during the append operation
                    }

                    // Set the target for the form submission
                    (document.getElementById("quiskForm") as any).setAttribute("target", "login");
                    // Ensure the action URL is set correctly
                    (document.getElementById('quiskForm') as any).action = appComponent.config.QuiskUrlCheckBalance;

                    // Open a new window for the login process
                    window.open("", "login", "width=500,height=550,toolbar=-100");

                    // Get the form element and submit it
                    var quiskForm = <HTMLFormElement>document.getElementById('quiskForm');
                    quiskForm.submit(); // Submit the form
                },
                /**
                 * Opens the selected game and prepares the necessary options for gameplay.
                 * @param {Object} game - The game object containing details about the selected game.
                 */
                openGame(game) {
                    var vthis = this; // Preserve the context of 'this' for use in nested functions
                    this.gameSelected = game; // Set the currently selected game
                    // Check if the user is logged in
                    if (this.session.logueado) {
                        this.showGame = true; // Show the game interface
                        // Create a URLSearchParams object to work with the query string of the current URL
                        let urlParams = new URLSearchParams(window.location.search);
                        // Extract the value of the 'idpenka' parameter from the query string (if it exists)
                        let getIdPenka = urlParams.get("idpenka");

                        // Prepare options for the game
                        let optionsGames: {
                            gameid: any;
                            mode: string;
                            provider: any;
                            lan: any;
                            partnerid: any;
                            token: any;
                            balance: number;
                            currency: any;
                            userid: any;
                            isMobile: boolean;
                            idpenka?: any;
                        } = {
                            gameid: game.id, // Game ID
                            mode: "real", // Game mode (real or demo)
                            provider: game.provider, // Game provider
                            lan: this.lngProd, // Language setting
                            partnerid: this.partner, // Partner ID
                            token: this.tokenUser, // User authentication token
                            balance: 0, // Initial balance
                            currency: this.session.moneda, // User's currency
                            userid: this.session.usuario, // User ID
                            isMobile: false, // Mobile device flag
                        };

                        // If the 'idpenka' parameter was found in the URL, add it to the game options
                        if (getIdPenka) {
                            optionsGames.idpenka = getIdPenka
                        }

                        // Determine if the user is on a mobile device
                        if (this.mobile == "1") {
                            optionsGames.isMobile = true; // Set mobile flag to true
                        } else {
                            optionsGames.isMobile = false; // Set mobile flag to false
                        }

                        const currentParams = window.location.search
                        // Update the browser history based on the current view
                        if (appComponent.viewActual.indexOf('new-casino') != -1) {
                            window.history.pushState('', '', '/new-casino/' + game.id + currentParams); // Navigate to new casino view
                        } else {
                            if (appComponent.viewActual.indexOf('live-casino-vivo') != -1) {
                                window.history.pushState('', '', '/live-casino-vivo/' + game.id + currentParams); // Navigate to live casino view
                            } else {
                                if (appComponent.viewActual.indexOf('virtuales-lobby') != -1) {
                                    window.history.pushState('', '', '/virtuales-lobby/' + game.id + currentParams); // Navigate to virtual lobby view
                                } else {
                                    window.history.pushState('', '', '/new-casino/' + game.id + currentParams); // Default navigation to new casino view with current query parameters
                                }
                            }
                        }

                        // Construct the source URL for the game
                        this.src =
                            vthis.config.urlCasinoPlay +
                            "?gameid=" +
                            optionsGames.gameid +
                            "&mode=" +
                            optionsGames.mode +
                            "&provider=" +
                            optionsGames.provider +
                            "&lan=" +
                            optionsGames.lan +
                            "&partnerid=" +
                            optionsGames.partnerid +
                            "&token=" +
                            optionsGames.token +
                            "&balance=" +
                            optionsGames.balance +
                            "&currency=" +
                            optionsGames.currency +
                            "&userid=" +
                            optionsGames.userid +
                            "&isMobile=" +
                            optionsGames.isMobile;

                        // If 'idpenka' exists in the game options, append it to the game URL as a query parameter
                        if (optionsGames.idpenka) {
                            this.src += "&idpenka=" + optionsGames.idpenka
                        }
                    } else {
                        this.showModalLogin = true; // Show login modal if user is not logged in
                    }
                },
                /**
                 * Handles the deposit process.
                 * @param {Object} res - The response object containing data related to the deposit.
                 * @param {Object} item - The item being deposited, containing details such as amount and ID.
                 */
                deposit(res, item) {
                    try {
                        // Calls a function to handle successful deposit with user session and amount details.
                        (window as any).fDepositSuccess(
                            appComponent.session.usuario,
                            item.amount,
                            appComponent.session.moneda
                        );
                    } catch (e) {
                        // Logs any errors that occur during the success function call.
                        console.log(e);
                    }

                    // Checks if the item is undefined or if its ID is not one of the specified values.
                    if (item == undefined || (item.id != "3999" && item.id != "4001" && item.id != "3997")) {
                        // If response data text is not empty or undefined, show modal with data.
                        if (res.data.dataText != "" && res.data.dataText != undefined) {
                            // Check if 'newView' is set in localStorage
                            if (
                                appComponent.config.depositsView !== undefined &&
                                appComponent.config.depositsView[appComponent.country] !== undefined &&
                                appComponent.config.depositsView[appComponent.country]['switch'] === false &&
                                appComponent.config.depositsView[appComponent.country]['isDefaultView'] === true
                            ) {
                                window.localStorage.removeItem('newViewDeposit');
                                window.localStorage.setItem('newViewDeposit', 'true');
                                appComponent.infoModalDeposit = res.data;
                            } else if (
                                appComponent.config.depositsView !== undefined &&
                                appComponent.config.depositsView[appComponent.country] !== undefined &&
                                appComponent.config.depositsView[appComponent.country]['on'] !== undefined &&
                                appComponent.config.depositsView[appComponent.country]['on'] &&
                                window.localStorage.getItem('newViewDeposit') == 'true'
                            ) {
                                appComponent.infoModalDeposit = res.data;
                            } else {
                                if (
                                    appComponent.config.depositsView !== undefined &&
                                    appComponent.config.depositsView[appComponent.country] !== undefined &&
                                    appComponent.config.depositsView[appComponent.country]['on'] !== undefined &&
                                    appComponent.config.depositsView[appComponent.country]['on'] &&
                                    appComponent.config.depositsView[appComponent.country].isDefaultView !== undefined &&
                                    appComponent.config.depositsView[appComponent.country].isDefaultView &&
                                    !window.localStorage.getItem('newViewDeposit')
                                ) {
                                    appComponent.infoModalDeposit = res.data;
                                } else {
                                    appComponent.modal.showModal = 'data';
                                    appComponent.infoModal = res.data;
                                }
                            }
                        } else {
                            appComponent.showModalDepositV3 = false;
                            // Checks if Izipay configuration is available in response details.
                            if (res.data.details !== undefined && res.data.details.dataIzipay !== undefined) {
                                const iziConfig = res.data.details.dataIzipay.config;

                                // Function to load Izipay checkout form.
                                const loadIzipay = () => {
                                    if (window.Izipay) {
                                        try {
                                            const checkout = new Izipay({ config: iziConfig });
                                            console.log(item);
                                            appComponent.disabledButtonForm = true;

                                            // Delays the loading of the form for 1 second.
                                            setTimeout(() => {
                                                checkout.LoadForm({
                                                    authorization: res.data.details.dataIzipay.authorization,
                                                    keyRSA: 'KEY_RSA',
                                                    callbackResponse: (response) => {
                                                        console.log(response);
                                                        let params = {
                                                            response: response,
                                                            service: item.id,
                                                        };
                                                        // Sends deposit request with response and service details.
                                                        apiService.request('deposit', params).then((response) => {
                                                            console.log("Depósito realizado con éxito:", response);
                                                        });
                                                    },
                                                });
                                            }, 1000);
                                        } catch ({ Errors, message, date }) {
                                            // Logs error if Izipay initialization fails.
                                            console.error("Error al inicializar Izipay:", { Errors, message, date });
                                            appComponent.disabledButtonForm = false;
                                        }
                                    } else {
                                        // Logs error if Izipay is not available.
                                        console.error("Izipay no está disponible.");
                                        appComponent.disabledButtonForm = false;
                                    }
                                };

                                // Checks if the Izipay script is already included in the document.
                                const existingScript = document.querySelector(
                                    `script[src="${appComponent.config !== undefined && appComponent.config.modalIzipayDeposit !== undefined && appComponent.config.modalIzipayDeposit.src !== undefined
                                        ? appComponent.config.modalIzipayDeposit.src
                                        : 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js'}"]`
                                );

                                // If script is not included, create and append it to the document.
                                if (!existingScript) {
                                    const script = document.createElement("script");
                                    script.src = appComponent.config !== undefined && appComponent.config.modalIzipayDeposit !== undefined && appComponent.config.modalIzipayDeposit.src !== undefined
                                        ? appComponent.config.modalIzipayDeposit.src
                                        : 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js';
                                    script.async = true;
                                    document.head.appendChild(script);
                                    script.onload = loadIzipay; // Load Izipay on script load.
                                    script.onerror = () => {
                                        // Logs error if script fails to load.
                                        console.error(`Error al cargar el script: ${appComponent.config !== undefined && appComponent.config.modalIzipayDeposit !== undefined && appComponent.config.modalIzipayDeposit.src !== undefined
                                            ? appComponent.config.modalIzipayDeposit.src
                                            : 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js'}`);
                                    };
                                } else {
                                    // If script exists, directly load Izipay.
                                    loadIzipay();
                                }

                                // Function to open modal for Izipay.
                                appComponent.openModal = () => {
                                    appComponent.disabledButtonForm = true;
                                    if (!window.Izipay) {
                                        const script = document.createElement("script");
                                        script.src = appComponent.config?.modalIzipayDeposit?.src || 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js';
                                        script.async = true;
                                        document.head.appendChild(script);
                                        script.onload = loadIzipay; // Load Izipay on script load.
                                        script.onerror = () => {
                                            // Logs error if script fails to load.
                                            console.error(`Error al cargar el script: ${appComponent.config?.modalIzipayDeposit?.src || 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js'}`);
                                        };
                                    } else {
                                        // If Izipay is available, load it directly.
                                        loadIzipay();
                                    }
                                };

                                // Closes the modal.
                                appComponent.closeModal();
                            } else if (res.data.details != undefined && res.data.details.widgetId != undefined && res.data.details.intentId != undefined) {
                                // Creates a script element for Prometeo widget.
                                var script = document.createElement("script");
                                script.src = 'https://cdn.prometeoapi.com/widget/1.0.0/static/js/init.js';
                                document.head.appendChild(script);
                                script.addEventListener("load", (event) => {
                                    // Initializes and opens the Prometeo widget.
                                    var widget = Prometeo.init(res.data.details.widgetId, res.data.details.intentId);
                                    widget.open({ allowedFeatureLevel: 2 });
                                    // Styles the widget iframe after a delay.
                                    setTimeout(() => {
                                        document.getElementById('prometeo-widget-iframe')?.setAttribute('style', "position: fixed; display: flex; width: 100%; height: 100%; inset: 0px; background-color: rgba(0, 0, 0, 0.5); z-index: 99999; cursor: pointer; justify-content: center; align-items: center; overflow-y: scroll;");
                                    }, 250);
                                });
                                // Closes the modal.
                                appComponent.closeModal();
                            } else if (res.data.details != undefined && res.data.details.payphoneJS != undefined && res.data.details.payphoneToken != undefined && res.data.details.payphoneJson != undefined) {
                                // Creates a script element for Payphone.
                                var script = document.createElement("script");
                                script.src = res.data.details.payphoneJS;
                                document.head.appendChild(script);
                                script.addEventListener("load", (event) => {
                                    try {
                                        // Checks if Payphone is available and initializes it.
                                        if ((window as any).payphone != undefined) {
                                            (window as any).payphone.Button({
                                                token: res.data.details.payphoneToken,
                                                btnHorizontal: true,
                                                btnCard: true,
                                                createOrder: function (actions) {
                                                    return actions.prepare(res.data.details.payphoneJson);
                                                },
                                                onComplete: function (model, actions) {
                                                    actions.confirm({
                                                        id: model.id,
                                                        clientTxId: model.clientTxId
                                                    }).then(function (value) {
                                                        // Redirects based on transaction status.
                                                        if (value.transactionStatus == "Approved") {
                                                            if (appComponent.config.depositos != undefined && appComponent.config.depositos.thankYouDeposit != undefined && appComponent.config.depositos.thankYouDeposit[appComponent.country] != undefined && appComponent.config.depositos.thankYouDeposit[appComponent.country].show != undefined && appComponent.config.depositos.thankYouDeposit[appComponent.country].show && (appComponent.config.depositos.thankYouDeposit[appComponent.country].version == undefined || appComponent.config.depositos.thankYouDeposit[appComponent.country].version == 1)) {
                                                                window.location.href = '/graciasdeposito';
                                                            } else {
                                                                window.location.href = '/gestion/deposito/correcto';
                                                            }
                                                            appComponent.gAnalytics('deposit_success', item.amount);
                                                        } else {
                                                            window.location.href = '/gestion/deposito/pendiente';
                                                        }
                                                    }).catch(function (err) {
                                                        // Handles errors during confirmation.
                                                    });
                                                }
                                            }).render('#app');
                                        }
                                    } catch (e) {
                                        // Catches any errors during Payphone initialization.
                                    }
                                });
                                // Closes the modal and resets flags.
                                appComponent.closeModal();
                                appComponent.showModalDepositV2 = false;
                                appComponent.showModalReferralAwards = false;
                            } else {
                                // Handles various response scenarios.
                                if (res.data.target == "_blank") {
                                    window.open(res.data.details.action, '_blank');
                                } else if (
                                    res.data.details.dataPayphone !== undefined &&
                                    appComponent.config.modalPayphoneDeposit !== undefined &&
                                    appComponent.config.modalPayphoneDeposit[appComponent.country] !== undefined &&
                                    appComponent.config.modalPayphoneDeposit[appComponent.country]
                                ) {
                                    // Checks if Payphone script is already included.
                                    if (document.getElementById('scriptPayPhone') !== null) {
                                        appComponent.modalPayphoneDeposit = true;
                                        let count = 0;
                                        const interval = setInterval(() => {
                                            // Waits for Payphone button to be available.
                                            if (document.getElementById('pp-button') !== null) {
                                                clearInterval(interval);
                                                new PPaymentButtonBox(res.data.details.dataPayphone).render('pp-button');
                                                appComponent.activeInfoPayphone = false;
                                                if (res.data.details.dataPayphoneInfo != undefined) {
                                                    appComponent.infoDataPayphone = {
                                                        title: res.data.details.dataPayphoneInfo.title,
                                                        text: res.data.details.dataPayphoneInfo.text
                                                    };
                                                    appComponent.activeInfoPayphone = true;
                                                }
                                            } else {
                                                count++;
                                                if (count === 10) {
                                                    clearInterval(interval);
                                                    appComponent.modal = {
                                                        showModal: "notification",
                                                        titleModal: 'Error',
                                                        messageModal: "Error al cargar el botón de pago, por favor intente nuevamente.",
                                                        buttonModal: "Aceptar",
                                                        orderModal: "closeModal"
                                                    };
                                                }
                                            }
                                        }, 1000);
                                    } else {
                                        // Loads Payphone styles and script if not already included.
                                        let stylePayPhone = document.createElement('link');
                                        stylePayPhone.rel = 'stylesheet';
                                        stylePayPhone.href = appComponent.config.modalPayphoneDeposit['srcStyle'] ? appComponent.config.modalPayphoneDeposit['srcStyle'] : 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css';
                                        (window as any).document.head.appendChild(stylePayPhone);
                                        let scriptPayPhone = document.createElement('script');
                                        scriptPayPhone.id = 'scriptPayPhone';
                                        scriptPayPhone.type = 'module';
                                        scriptPayPhone.src = appComponent.config.modalPayphoneDeposit['srcJs'] ? appComponent.config.modalPayphoneDeposit['srcJs'] : 'https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js';
                                        scriptPayPhone.onload = () => {
                                            new PPaymentButtonBox(res.data.details.dataPayphone).render('pp-button');
                                        };
                                        appComponent.activeInfoPayphone = false;
                                        if (res.data.details.dataPayphoneInfo != undefined) {
                                            appComponent.infoDataPayphone = {
                                                title: res.data.details.dataPayphoneInfo.title,
                                                text: res.data.details.dataPayphoneInfo.text
                                            };
                                            appComponent.activeInfoPayphone = true;
                                        }
                                        appComponent.modalPayphoneDeposit = true;
                                        (window as any).document.head.appendChild(scriptPayPhone);
                                    }
                                } else if (
                                    res.data.details.dataVisa !== undefined &&
                                    appComponent.config.modalVisaDeposit !== undefined &&
                                    appComponent.config.modalVisaDeposit[appComponent.country] !== undefined &&
                                    appComponent.config.modalVisaDeposit[appComponent.country]
                                ) {
                                    // Handles Visa payment processing.
                                    if (document.getElementById('form-visa') !== null) {
                                        document.getElementById('form-visa').childNodes.forEach(node => {
                                            if (node.nodeName === 'BUTTON') {
                                                node.click(); // Clicks the button to submit the form.
                                            }
                                        });
                                    } else {
                                        let form = document.createElement('form');
                                        form.id = 'form-visa';
                                        form.method = res.data.details.method;
                                        form.action = res.data.details.dataVisa.actionForm;
                                        form.style.display = 'none';
                                        let script = document.createElement('script');
                                        script.id = 'script-visa';
                                        script.src = appComponent.config.modalVisaDeposit['srcJs'];
                                        // Sets various attributes for the Visa payment form.
                                        script.setAttribute("data-sessiontoken", res.data.details.dataVisa.sessiontoken);
                                        script.setAttribute("data-channel", res.data.details.dataVisa.channel);
                                        script.setAttribute("data-merchantid", res.data.details.dataVisa.merchantid);
                                        script.setAttribute("data-merchantlogo", res.data.details.dataVisa.merchantlogo);
                                        script.setAttribute("data-formbuttoncolor", res.data.details.dataVisa.formbuttoncolor);
                                        script.setAttribute("data-purchasenumber", res.data.details.dataVisa.purchasenumber);
                                        script.setAttribute("data-amount", res.data.details.dataVisa.amount);
                                        script.setAttribute("data-cardholdername", res.data.details.dataVisa.cardholdername);
                                        script.setAttribute("data-cardholderlastname", res.data.details.dataVisa.cardholderlastname);
                                        script.setAttribute("data-cardholderemail", res.data.details.dataVisa.cardholderemail);
                                        script.setAttribute("data-expirationminutes", res.data.details.dataVisa.expirationminutes);
                                        script.setAttribute("data-timeouturl", res.data.details.dataVisa.timeouturl);

                                        // Observer to handle dynamic button clicks.
                                        const observer = new MutationObserver((mutations, obs) => {
                                            mutations.forEach(mutation => {
                                                if (mutation.addedNodes.length) {
                                                    mutation.addedNodes.forEach(node => {
                                                        if (node.id === 'form-visa') {
                                                            const observer2 = new MutationObserver((mutationsList, observer) => {
                                                                for (const mutation of mutationsList) {
                                                                    if (mutation.type === 'childList') {
                                                                        mutation.addedNodes.forEach(node2 => {
                                                                            if (node2.nodeName === 'BUTTON') {
                                                                                node2.click(); // Clicks the button when added.
                                                                                observer.disconnect();
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                            observer2.observe(node, { childList: true, subtree: true });
                                                            obs.disconnect();
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                        observer.observe(document.body, { childList: true, subtree: true });
                                        form.appendChild(script);
                                        document.body.appendChild(form); // Appends the form to the body.
                                    }
                                } else if (
                                    res.data.details.dataPayU !== undefined &&
                                    appComponent.config.modalPayUDeposit !== undefined &&
                                    appComponent.config.modalPayUDeposit[appComponent.country] !== undefined &&
                                    appComponent.config.modalPayUDeposit[appComponent.country]
                                ) {
                                    // Handles PayU payment processing.
                                    const form = document.createElement('form');
                                    form.method = 'post';
                                    form.action = appComponent.config.modalPayUDeposit['src'];
                                    const fields = res.data.details.dataPayU;
                                    Object.keys(fields).forEach(key => {
                                        const input = document.createElement('input');
                                        input.type = 'hidden';
                                        input.name = key;
                                        input.value = fields[key];
                                        form.appendChild(input); // Appends hidden inputs to the form.
                                    });
                                    document.body.appendChild(form);
                                    form.submit(); // Submits the form.
                                    document.body.removeChild(form); // Removes the form after submission.
                                } else if (
                                    res.data.details.dataTerracall !== undefined &&
                                    appComponent.config.modalTerracall !== undefined &&
                                    appComponent.config.modalTerracall[appComponent.country] !== undefined &&
                                    appComponent.config.modalTerracall[appComponent.country]
                                ) {
                                    // Handles Terracall payment processing.
                                    let urlTerracall = appComponent.config.modalTerracall !== undefined && appComponent.config.modalTerracall['src'] !== undefined ? appComponent.config.modalTerracall['src'] : `https://sandbox-payer.pagadito.com`;
                                    appComponent.modalTerracall = true; // Resets modalTerracall state.

                                    // Waits for the next DOM update cycle to ensure elements are ready.
                                    nextTick(() => {
                                        // Checks if the scriptTerracall container exists and clears it.
                                        let container = document.getElementById('scriptTerracall');
                                        if (container) {
                                            container.innerHTML = ''; // Clears the container if it exists.
                                        }


                                        let scriptTerracall = document.createElement("iframe");
                                        scriptTerracall.src = `${urlTerracall}?lang=${appComponent.lngProd}&token=${res.data.details.dataTerracall.token}`;
                                        scriptTerracall.width = "100%"; // Sets the width of the iframe to 100%.
                                        scriptTerracall.height = "600"; // Sets the height of the iframe to auto.
                                        scriptTerracall.title = "Terracall Payment Widget"; // Sets the title of the iframe for accessibility.

                                        container?.appendChild(scriptTerracall); // Appends the iframe to the container.

                                        // Listens for messages from the widget iframe.
                                        window.addEventListener("message", function onWidgetMessage(event) {
                                            if (event.origin !== urlTerracall.split("/").slice(0, 3).join("/")) return;
                                            // Validates the origin of the message to ensure it comes from the expected source.
                                            console.log("Evento recibido del widget:", event.data);
                                            // Checks the status of the payment and redirects accordingly.
                                            if (event.data?.type === "PaymentProcessCompleted") {
                                                appComponent.gAnalytics('deposit_success', item.amount);
                                                event.data['transactionId'] = res.data.details.dataTerracall.merchantTransactionId;

                                                let params = {
                                                    response: event.data,
                                                    service: item.id
                                                };
                                                // Sends deposit request with response and service details.
                                                apiService.request('event_payment_confirm', params).then((response) => {
                                                    console.log("Depósito realizado con éxito:", response);
                                                });
                                                window.location.href = '/gestion/deposito/correcto';
                                            } else if (event.data?.status === "PaymentProcessCanceled") {
                                                event.data['transactionId'] = res.data.details.dataTerracall.merchantTransactionId;

                                                let params = {
                                                    response: event.data,
                                                    service: item.id
                                                };
                                                // Sends deposit request with response and service details.
                                                apiService.request('event_payment_confirm', params).then((response) => {
                                                    console.log("Depósito cancelado:", response);
                                                });
                                                window.location.href = '/gestion/deposito/error';
                                            } else {
                                                appComponent.modal = {
                                                    showModal: "notification",
                                                    titleModal: 'Error',
                                                    messageModal: "Ocurrio un error inesperado en el sistema. Por favor intente mas tarde",
                                                    buttonModal: "Aceptar",
                                                    orderModal: "closeModal"
                                                };
                                            }
                                            // Removes the event listener and widget container after processing the message.
                                            window.removeEventListener("message", onWidgetMessage);
                                            appComponent.modalTerracall = false; // Resets modalTerracall state.
                                        });
                                    }); // Ensures the DOM is updated before proceeding.

                                } else if (
                                    res.data.details.dataTigoMoney !== undefined &&
                                    appComponent.config.modalTigoMoney !== undefined &&
                                    appComponent.config.modalTigoMoney[appComponent.country] !== undefined &&
                                    appComponent.config.modalTigoMoney[appComponent.country]
                                ) {
                                    let urlTigoMoney = res.data.details.dataTigoMoney.url;
                                    appComponent.modalTigoMoney = true; // Resets modalTerracall state.

                                    // Waits for the next DOM update cycle to ensure elements are ready.
                                    nextTick(() => {
                                        // Checks if the scriptTigoMoney container exists and clears it.
                                        let container = document.getElementById('scriptTigoMoney');
                                        if (container) {
                                            container.innerHTML = ''; // Clears the container if it exists.
                                        }


                                        let scriptTigoMoney = document.createElement("iframe");
                                        scriptTigoMoney.src = urlTigoMoney;
                                        scriptTigoMoney.width = "100%"; // Sets the width of the iframe to 100%.
                                        scriptTigoMoney.height = "600"; // Sets the height of the iframe to auto.
                                        scriptTigoMoney.title = "Modal Deposito Tigo Money"; // Sets the title of the iframe for accessibility.



                                        container?.appendChild(scriptTigoMoney); // Appends the iframe to the container.
                                        // 🔥 Detectar navegación del iframe (cancel / success)
                                        scriptTigoMoney.addEventListener("load", () => {
                                            try {
                                                // 🔎 Intentar leer la URL actual dentro del iframe
                                                const currentUrl = scriptTigoMoney.contentWindow.location.href;
                                                console.log("Iframe navegó a:", currentUrl);

                                                if (currentUrl.includes("transactionStatus=cancel")) {
                                                    console.log("❌ Pago cancelado detectado");
                                                    appComponent.modalTigoMoney = false;
                                                    window.location.assign("/gestion/deposito/error");
                                                }

                                                if (currentUrl.includes("transactionStatus=success")) {
                                                    console.log("✅ Pago exitoso detectado");
                                                    appComponent.modalTigoMoney = false;
                                                    window.location.assign("/gestion/deposito/correcto");
                                                }
                                            } catch (err) {
                                                // Mientras siga en merchant.tigo.com → cae aquí
                                                console.log("CORS bloquea lectura del iframe (normal)", err);
                                            }
                                        });

                                    }); // Ensures the DOM is updated before proceeding.

                                } else {
                                    // Redirects to the specified action if no other conditions are met.
                                    window.location.href = res.data.details.action;
                                }
                            }
                        }
                    } else {
                        // Displays a success notification if the deposit request was created successfully.
                        appComponent.modal = {
                            showModal: "notification",
                            titleModal: 'Exito',
                            messageModal: "Solicitud de deposito creada satisfactoriamente.",
                            buttonModal: "Aceptar",
                            orderModal: "closeModal"
                        };
                        let responseTest = res.data.details.action;
                        responseTest = res.data.codeFrame.replace('\/"', '/');
                    }
                },
                /**
                 * Initiates the credit card payment process.
                 * @param {Object} res - The response object containing payment information.
                 */
                creditCard(res) {
                    // Check if modalPushPayment configuration is defined
                    if (appComponent.config.modalPushPayment !== undefined) {
                        // Check if the payment form element exists in the documenta
                        if (document.getElementById('form-niubiz') !== null) {
                            // Iterate through child nodes of the form
                            document.getElementById('form-niubiz').childNodes.forEach(node => {
                                // Trigger click on button nodes
                                if (node.nodeName === 'BUTTON') {
                                    node.click();
                                }
                            });
                        } else {
                            // Create a new script element for the payment script
                            var script = document.createElement("script");
                            script.src = appComponent.config.modalPushPayment.srcJs; // Set the source of the script
                            document.head.appendChild(script); // Append the script to the document head

                            // Add an event listener for when the script is loaded
                            script.addEventListener("load", () => {
                                // Configure the VisanetCheckout with payment details
                                window.VisanetCheckout.configure({
                                    sessiontoken: res.sessiontoken,
                                    channel: res.dataInfo.channel,
                                    merchantid: res.dataInfo.merchantid,
                                    merchantname: res.dataInfo.merchantname,
                                    purchasenumber: res.dataInfo.purchasenumber,
                                    amount: res.dataInfo.amount,
                                    formbuttoncolor: '#FF8000', // Button color for the form
                                    formbuttontext: 'Agregar tarjeta', // Button text for the form
                                    showamount: 'false', // Whether to show the amount
                                    cardholdername: res.dataInfo.cardholdername,
                                    cardholderlastname: res.dataInfo.cardholderlastname,
                                    cardholderemail: res.dataInfo.cardholderemail,
                                    expirationminutes: res.dataInfo.expirationminutes,
                                    timeouturl: res.dataInfo.timeouturl,
                                    action: res.dataInfo.action,
                                    usertoken: res.dataInfo.usertoken,
                                    complete: function (params) {
                                        // Alert with the parameters received upon completion
                                        alert(JSON.stringify(params));
                                    }
                                });

                                // Listen for messages from the payment window
                                window.addEventListener("message", function (e) {
                                    try {
                                        if (e && e.data) {
                                            const data = JSON.parse(e.data); // Parse the message data
                                            // Check if the message indicates completion of the payment
                                            if (data.method === "complete" && data.args && data.args.length > 0) {
                                                const transactionInfo = data.args[0]; // Extract transaction information
                                                const { token } = transactionInfo; // Get the token from transaction info
                                                const method = 'addCard'; // Define the method for the API request
                                                const productId = appComponent.config.creditCard !== undefined && appComponent.config.creditCard.idProduct !== undefined && appComponent.config.creditCard.idProduct !== '' ? appComponent.config.creditCard.idProduct : '6178'; // Define the product ID
                                                console.log("Token capturado:", token); // Log the captured token
                                                sessionStorage.setItem('transactionToken', token); // Store the token in session storage

                                                // Make an API request to register the card token
                                                apiService
                                                    .request("register_card_token", { token, method, productId })
                                                    .then((response) => {
                                                        console.log("Respuesta del backend:", response); // Log the backend response
                                                        // Check the response code for success
                                                        if (response.code === 0) {
                                                            sessionStorage.setItem('showModal', JSON.stringify({
                                                                showModal: "notification",
                                                                titleModal: 'Tarjeta de credito registrada',
                                                                messageModal: 'Se agrego la tarjeta de credito correctamente',
                                                                buttonModal: "Aceptar",
                                                                orderModal: "closeModal"
                                                            }));
                                                        } else {
                                                            sessionStorage.setItem('showModal', JSON.stringify({
                                                                showModal: "notification",
                                                                titleModal: 'Error!',
                                                                messageModal: 'error_mensaje',
                                                                buttonModal: "Aceptar",
                                                                orderModal: "closeModal"
                                                            }));
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error en la solicitud:", error); // Log any errors during the request
                                                        alert("Error en la comunicación con el backend."); // Alert the user of the error
                                                    });
                                            }
                                        }
                                    } catch (error) {
                                        console.error("Error al procesar el mensaje:", error); // Log any errors during message processing
                                    }
                                });

                                // Listen for the beforeunload event to log page reloads
                                window.addEventListener('beforeunload', function () {
                                    console.log("Página a punto de recargarse."); // Log when the page is about to reload
                                });

                                // Listen for the load event to handle modal state and transaction token
                                window.addEventListener('load', function () {
                                    const modalState = sessionStorage.getItem('showModal'); // Retrieve modal state from session storage
                                    if (modalState) {
                                        const modal = JSON.parse(modalState); // Parse the modal state
                                        appComponent.modal = modal; // Set the modal in the app component
                                        sessionStorage.removeItem('showModal'); // Remove the modal state from session storage
                                    }
                                    const transactionToken = sessionStorage.getItem('transactionToken'); // Retrieve transaction token from session storage
                                    if (transactionToken) {
                                        console.log("Token capturado desde sessionStorage:", transactionToken); // Log the captured token
                                    }
                                });

                                // Open the VisanetCheckout modal
                                window.VisanetCheckout.open();
                            });
                        }
                    }
                },
                /**
                 * Accepts the modal for the Quisk payment method.
                 * This function creates a form dynamically and submits it to the Quisk URL for betting.
                 */
                acceptModal() {
                    // Check if the current modal is the Quisk modal
                    if (appComponent.modal.orderModal == "Quisk") {
                        // Remove existing Quisk form if it exists
                        if ((document.getElementById("quiskForm") as any) != undefined) {
                            (document.getElementById("quiskForm") as any).remove();
                        }
                        // Create a new form element
                        var f = document.createElement("form");
                        f.setAttribute('name', "quiskForm"); // Set form name
                        f.setAttribute('id', "quiskForm"); // Set form ID
                        f.setAttribute('method', "post"); // Set form method to POST
                        f.setAttribute('action', appComponent.config.QuiskUrlBetting); // Set form action URL

                        // Create input for merchant key
                        var i = document.createElement("input");
                        i.setAttribute('type', "text");
                        i.setAttribute('name', "merchantKey"); // Input name for merchant key
                        i.setAttribute('value', appComponent.config.QuiskMerchantKey); // Set merchant key value
                        i.setAttribute('hidden', "true"); // Hide the input

                        // Create input for user's phone number
                        var phone = document.createElement("input");
                        phone.setAttribute('type', "text");
                        phone.setAttribute('name', "phone"); // Input name for phone
                        phone.setAttribute('value', appComponent.phoneUser); // Set phone value
                        phone.setAttribute('hidden', "true"); // Hide the input
                        f.appendChild(phone); // Append phone input to form

                        // Create input for amount
                        var amount = document.createElement("input");
                        amount.setAttribute('type', "text");
                        amount.setAttribute('name', "amount"); // Input name for amount
                        amount.setAttribute('value', ''); // Set amount value (initially empty)
                        amount.setAttribute('hidden', "true"); // Hide the input
                        f.appendChild(amount); // Append amount input to form

                        // Create input for currency
                        var currency = document.createElement("input");
                        currency.setAttribute('type', "text");
                        currency.setAttribute('name', "currency"); // Input name for currency
                        currency.setAttribute('value', ''); // Set currency value (initially empty)
                        currency.setAttribute('hidden', "true"); // Hide the input
                        f.appendChild(currency); // Append currency input to form

                        // Create submit button
                        var s = document.createElement("input");
                        s.setAttribute('type', "submit");
                        s.setAttribute('value', "Submit"); // Set button value
                        s.setAttribute('hidden', "true"); // Hide the button
                        f.appendChild(i); // Append merchant key input to form
                        f.appendChild(s); // Append submit button to form

                        // Attempt to append the form to the body
                        try {
                            document.getElementsByTagName('body')[0].appendChild(f);
                        } catch (e) {
                        }

                        // Set target for the form submission
                        (document.getElementById("quiskForm") as any).setAttribute("target", "login");
                        // Change action URL to the registration URL
                        (document.getElementById('quiskForm') as any).action = appComponent.config.QuiskUrlRegister;
                        // Open a new window for login
                        window.open("", "login", "width=500,height=550,toolbar=-100");
                        // Get the form element and submit it
                        var quiskForm = <HTMLFormElement>document.getElementById('quiskForm');
                        quiskForm.submit();
                    }
                    // Close the modal after processing
                    appComponent.closeModal()
                }
            });
            let appComponent = app.config.globalProperties.$appComponent; // Retrieve the app component from global properties

            vueRouter.beforeEach((to, from) => { // Set up a route guard before each navigation
                const { p: countryPath } = to.params; // Extract country path from route parameters
                const config = appComponent.config || {}; // Get the app component's configuration
                const activePathWithCountry = config.activePathWithCountry || []; // Get active paths with country
                const countryFixed = config.countryL || ''; // Get the fixed country value
                console.log('activePathWithCountry'); // Log the active paths for debugging
                const isValidCountryPath =
                    Array.isArray(activePathWithCountry) && // Check if active paths is an array
                    activePathWithCountry.includes(countryPath) && // Check if the country path is valid
                    countryPath === countryFixed; // Ensure the country path matches the fixed country
                if (countryPath && !isValidCountryPath) { // If country path exists and is invalid
                    const correctedPath = to.fullPath.replace(`/${countryPath}`, ''); // Correct the path
                    return { path: correctedPath, query: to.query, hash: to.hash }; // Redirect to the corrected path
                }
                return true; // Allow navigation
            });

            console.log(appComponent.platformApp); // Log the platform app for debugging
            const storeComponent = useAppcomponentStore(); // Use the app component store
            storeComponent.setAppComponent(appComponent); // Set the app component in the store

            // Event listeners for various login states
            window.document.addEventListener('notLogin', (e) => {
                appComponent.notLogin()
            }, false); // Handle not logged in event
            window.document.addEventListener('timeLogin', (e) => {
                appComponent.timeLogin()
            }, false); // Handle time login event
            window.document.addEventListener('endResponse', (e) => { // Handle end of response event
                appComponent.disabledButtonForm = false; // Enable the button form
                appComponent.apm.setUserContext({ // Set user context for APM
                    id: appComponent.session.usuario, // User ID
                    username: appComponent.session.nombre, // Username
                    email: appComponent.session.email // User email
                });
            }, false);

            window.document.addEventListener('confirmEmail', (e) => { // Handle email confirmation event
                appComponent.modal.showModal = "modalConfirmEmail"; // Show email confirmation modal
            }, false);

            window.document.addEventListener('confirmSms', (e) => { // Handle SMS confirmation event
                appComponent.modal = { // Set modal properties for SMS confirmation
                    showModal: "sms",
                    messageModal: {
                        title: "Enviar código", // Title for the modal
                        text: "Para continuar debes de verificar el número de teléfono celular donde te envíamos un código de 6 dígitos para su verificación", // Message text
                        buttonText: "Enviar", // Button text
                        img: "https://images.virtualsoft.tech/m/msjT1680297293.png", // Image URL
                        code: false, // Code flag
                    }
                }
            }, false);

            app.config.globalProperties.$refreshBalance = function () { // Define a function to refresh balance
                console.log('refreshBalance init'); // Log the initialization of refreshBalance
                const params = { // Parameters for the API request
                    source: "user", // Source of the request
                    subscribe: true, // Subscription flag
                    what: { profile: [] } // Requesting profile data
                };
                apiService.request('get', params).then((response: any) => { // Make API request
                    console.log('refreshBalance response', response); // Log the response
                    if (response.code == 0) { // Check if the response code is successful
                        console.log('get init'); // Log the initialization of getting data
                        // Check and set various configurations based on the response
                        const profile = response.data.data.profile[appComponent.user_id];
                        if (!profile) return;

                        // Guardar data global para cambios de ruta
                        (window as any).__userData = profile;

                        // Resolver modal según flags
                        resolveModal(profile)

                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.ChangePassword != undefined) {
                            appComponent.ChangePassword = response.data.data.config.ChangePassword; // Set change password flag
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.SportbookContingence != undefined) {
                            appComponent.contingencySportbook = response.data.data.config.SportbookContingence; // Set contingency for sportsbook
                            console.log(appComponent.contingencySportbook); // Log the contingency for debugging
                        }
                        if (appComponent.ChangePassword == true && appComponent.viewActual !== "/gestion/cambiar-clave") { // Redirect if password change is required
                            router.push('/gestion/cambiar-clave');
                        }
                        // Handle various user states based on the response
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.blocked_user2 != undefined && response.data.data.config.blocked_user2 === true) {
                            appComponent.modal.showModal = "genericForm"; // Show generic form modal for blocked user
                            appComponent.titleModalGenericForm = response.data.data.config.title; // Set title for the modal
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.blocked_user3 != undefined && response.data.data.config.blocked_user3 === true) {
                            appComponent.modal.showModal = "genericForm"; // Show generic form modal for another blocked user
                            appComponent.titleModalGenericForm = response.data.data.config.title2; // Set title for the modal
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.openUpdateData != undefined && response.data.data.config.openUpdateData) {
                            appComponent.openUpdateData = response.data.data.config.openUpdateData; // Set update data flag
                            if (appComponent.viewActual.indexOf("validar-actualizacion") == -1) {
                                // Additional logic can be added here
                            }
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config['2FAGlobal'] != undefined && response.data.data.config['2FAGlobal'] == 'A') {
                            appComponent.showModal2FA = true; // Set update data flag
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.openModalDeposit != undefined && response.data.data.config.openModalDeposit) {
                            appComponent.modal.showModal = "deposit"; // Show deposit modal
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.OpenUpdateData2 != undefined && response.data.data.config.OpenUpdateData2 === true) {
                            appComponent.modal.showModal = "updateData"; // Show update data modal
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.OpenUpdateData2 != undefined && response.data.data.config.OpenUpdateData2 === true) {
                            appComponent.modal.showModal = "updateData"; // Show update data modal again
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.profile[appComponent.user_id] != undefined && response.data.data.profile[appComponent.user_id].exclution_time != undefined) {
                            appComponent.exclutionTime = response.data.data.profile[appComponent.user_id].exclution_time; // Set exclusion time for the user
                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.profile[appComponent.user_id] != undefined && response.data.data.profile[appComponent.user_id]['2FASwitchUser'] != undefined) {
                            if (response.data.data.profile[appComponent.user_id]['2FASwitchUser'] == 'I') {
                                appComponent.switch2FAUser = false; // Set exclusion time for the user
                            } else if (response.data.data.profile[appComponent.user_id]['2FASwitchUser'] == 'A') {
                                appComponent.switch2FAUser = true; // Set exclusion time for the user
                            }

                        }
                        if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.profile[appComponent.user_id] != undefined && response.data.data.profile[appComponent.user_id]['2FAShowModalLogin'] != undefined && response.data.data.profile[appComponent.user_id]['2FAShowModalLogin']) {
                            appComponent.showModalLogin2FA = response.data.data.profile[appComponent.user_id]['2FAShowModalLogin']; // Set exclusion time for the user
                        }
                        appComponent.firstReqBalance = true; // Set first request balance flag
                        if (response != undefined && response.code == 0) { // Check for successful response
                            let userProfile = response.data.data.profile[appComponent.user_id]; // Get user profile data
                            window.countryCode = userProfile.country_code.toLowerCase() // Log successful response
                            if (userProfile.typeUser == "0") {
                                userProfile.typeUser = "U"; // Set user type to 'U'
                            } else {
                                if (userProfile.typeUser == "1") {
                                    userProfile.typeUser = "P"; // Set user type to 'P'
                                } else {
                                    userProfile.typeUser = "U"; // Default to 'U'
                                }
                            }
                            try {
                                // Update various configuration settings based on the response
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MaxWithdraw != undefined) {
                                    appComponent.config.retiros.MaxWithdraw = response.data.data.config.MaxWithdraw; // Set max withdraw limit
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MinWithdraw != undefined) {
                                    appComponent.config.retiros.MinWithdraw = response.data.data.config.MinWithdraw; // Set min withdraw limit
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MinWithdrawBank != undefined) {
                                    appComponent.config.retiros.MinWithdrawBank = response.data.data.config.MinWithdrawBank; // Set min withdraw for bank
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MaxWithdrawBankAccount != undefined) {
                                    appComponent.config.retiros.MaxWithdrawBankAccount = response.data.data.config.MaxWithdrawBankAccount; // Set max withdraw for bank account
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MinWithdrawBekashnet != undefined) {
                                    appComponent.config.retiros.MinWithdrawBekashnet = response.data.data.config.MinWithdrawBekashnet; // Set min withdraw for Bekashnet
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MaxWithdrawBetKashnet != undefined) {
                                    appComponent.config.retiros.MaxWithdrawBetKashnet = response.data.data.config.MaxWithdrawBetKashnet; // Set max withdraw for BetKashnet
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.TaxWithdrawalPrizes != undefined) {
                                    appComponent.config.retiros.TaxWithDraw = response.data.data.config.TaxWithdrawalPrizes; // Set tax for withdrawal prizes
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.TaxWithdrawalRewardsFrom != undefined) {
                                    appComponent.config.retiros.TaxBalanceWithDraw = response.data.data.config.TaxWithdrawalRewardsFrom; // Set tax for balance withdrawal
                                }
                                if (config.passwordPrincipal == undefined) {
                                    config.passwordPrincipal = {}; // Initialize password principal if undefined
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.MinLenPassword != undefined) {
                                    appComponent.config.passwordPrincipal = {}; // Initialize password principal config
                                    appComponent.config.passwordPrincipal.passwordChange = response.data.data.config.MinLenPassword; // Set minimum password length
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.DaysExpirePassword != undefined) {
                                    appComponent.config.passwordPrincipal.DaysExpirePassword = response.data.data.config.DaysExpirePassword; // Set days until password expiration
                                }
                                if (config.depositos == undefined) {
                                    config.depositos = {}; // Initialize deposit config if undefined
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.TaxWithdrawalDeposit != undefined) {
                                    appComponent.config.depositos.TaxDeposit = response.data.data.config.TaxWithdrawalDeposit; // Set tax for deposit
                                }
                                if (response != undefined && response.data != undefined && response.data.data != undefined && response.data.data.config != undefined && response.data.data.config.TaxWithdrawalDepositFrom != undefined) {
                                    appComponent.config.depositos.TaxDepositBalance = response.data.data.config.TaxWithdrawalDepositFrom; // Set tax for deposit balance
                                }
                            } catch (e) {
                                console.log(e); // Log any errors during configuration updates
                            }
                            // Handle user verification flags based on document front and back
                            if (userProfile.dniFront == 0) {
                                userProfile.verifcedula_ant = "N"; // Set verification flag for front document
                                userProfile.verifcedula_ant_paprob = "N"; // Set approval flag for front document
                            } else {
                                if (userProfile.dniFront == 1) {
                                    userProfile.verifcedula_ant = "N"; // Set verification flag for front document
                                    userProfile.verifcedula_ant_paprob = "N"; // Set approval flag for front document
                                } else {
                                    if (userProfile.dniFront == 2) {
                                        userProfile.verifcedula_ant = "N"; // Set verification flag for front document
                                        userProfile.verifcedula_ant_paprob = "S"; // Set approval flag for front document
                                    } else {
                                        if (userProfile.dniFront == 3) {
                                            userProfile.verifcedula_ant = "S"; // Set verification flag for front document
                                            userProfile.verifcedula_ant_paprob = "N"; // Set approval flag for front document
                                        }
                                    }
                                }
                            }
                            if (userProfile.dniFrontBack == 0) {
                                userProfile.verifcedula_post = "N"; // Set verification flag for back document
                                userProfile.verifcedula_post_paprob = "N"; // Set approval flag for back document
                            } else {
                                if (userProfile.dniFrontBack == 1) {
                                    userProfile.verifcedula_post = "N"; // Set verification flag for back document
                                    userProfile.verifcedula_post_paprob = "N"; // Set approval flag for back document
                                } else {
                                    if (userProfile.dniFrontBack == 2) {
                                        userProfile.verifcedula_post = "N"; // Set verification flag for back document
                                        userProfile.verifcedula_post_paprob = "S"; // Set approval flag for back document
                                    } else {
                                        if (userProfile.dniFrontBack == 3) {
                                            userProfile.verifcedula_post = "S"; // Set verification flag for back document
                                            userProfile.verifcedula_post_paprob = "N"; // Set approval flag for back document
                                        }
                                    }
                                }
                            }
                            // Handle skin settings based on user profile
                            if (userProfile.skinJsITN != undefined && userProfile.skinJsITN != '') {
                                config.altenar = userProfile.skinJsITN; // Set skin configuration
                                appComponent.altenar = userProfile.skinJsITN; // Set skin for app component
                                appComponent.config.altenar = userProfile.skinJsITN; // Set skin for app component config
                                (window as any).cconfig.altenar = userProfile.skinJsITN; // Set skin for global config
                            } else {
                                // Additional logic can be added here
                            }
                            // Set various balance values from user profile
                            appComponent.saldo_total = parseFloat(userProfile.balance); // Total balance
                            appComponent.saldo_recarga = parseFloat(userProfile.balanceDeposit); // Deposit balance
                            appComponent.saldo_retiro = parseFloat(userProfile.balanceWinning); // Withdrawal balance
                            appComponent.saldo_bono = parseFloat(userProfile.balanceBonus); // Bonus balance
                            appComponent.saldo_freebet = parseFloat(userProfile.balanceFreebet); // Free bet balance
                            appComponent.saldo_freeCasino = userProfile.balanceFreecasino; // Free casino balance
                            appComponent.bono_header = userProfile.bono_header; // Bonus header
                            appComponent.typeUser = userProfile.typeUser; // User type
                            appComponent.mensajesUnread = userProfile.unread_count; // Unread messages count
                            appComponent.tokenSB = userProfile.tokenSB; // Token for SB
                            appComponent.providerSportbook = userProfile.providerSportbook; // Token for SB
                            appComponent.theme_color_mode = userProfile.theme_color_mode; // Theme color mode
                            appComponent.tokenFCM = userProfile.tokenFCM; // Token for FCM
                            appComponent.phoneUser = userProfile.phone; // User phone number
                            if (userProfile.pendingWithdrawals) {
                                appComponent.pendingWithdrawals = userProfile.pendingWithdrawals; // Set pending withdrawals
                            }
                            if (appComponent.config.versionAltenar == "2") { // Check for Altenar version
                                try {
                                    (window as any).altenarWSDK.set({ token: appComponent.tokenSB }); // Set token for Altenar SDK
                                } catch (e) {
                                    // Handle errors
                                }
                            }
                            if (userProfile.skinItn != "" && userProfile.skinItn != undefined) {
                                config.skinIdITN = userProfile.skinItn; // Set skin ID for ITN
                                appComponent.skinIdITN = userProfile.skinItn; // Set skin ID for app component
                                (window as any).cconfig.skinIdITN = userProfile.skinItn; // Set skin ID for global config
                            }
                            appComponent.loadJsAltenar(); // Load Altenar JavaScript
                            appComponent.DefaultAmountDeposits = userProfile.DefaultAmountDeposits !== undefined &&
                                userProfile.DefaultAmountDeposits !== null &&
                                userProfile.DefaultAmountDeposits &&
                                typeof userProfile.DefaultAmountDeposits === 'string' ? parseFloat(userProfile.DefaultAmountDeposits) : userProfile.DefaultAmountDeposits ?? null; // Set default deposit amount
                            appComponent.session = { // Set session information
                                logueado: true, // User is logged in
                                usuario: userProfile.id_platform, // User platform ID
                                id_user: userProfile.id, // User ID
                                nombre: userProfile.name, // User name
                                pais: userProfile.country_code, // User country code
                                pais_nom: userProfile.countryName, // User country name
                                pais_id: userProfile.countryid, // User country ID
                                moneda: userProfile.currency_id, // User currency ID
                                simbolo_moneda: userProfile.currency_symbol, // User currency symbol
                                user_test: userProfile.user_test != undefined ? userProfile.user_test : false, // User test flag
                                moneda_nom: userProfile.currency_name, // User currency name
                                idioma: userProfile.language, // User language
                                utc: userProfile.utc, // User UTC offset
                                token: userProfile.token, // User token
                                req_cheque: userProfile.req_cheque, // Check request flag
                                req_doc: userProfile.req_doc, // Document request flag
                                fecha_crea: userProfile.fecha_crea, // Creation date
                                fecha_actualizacion: userProfile.fecha_actualizacion, // Update date
                                theme_color_mode: userProfile.theme_color_mode, // Theme color mode
                                origen: userProfile.origen, // User origin
                                city: userProfile.city, // User city
                                departament: userProfile.province, // User province
                                gender: userProfile.gender, // User gender
                                casino_enabled: userProfile.casino_enabled, // Casino enabled flag
                                verifcedula_ant: userProfile.verifcedula_ant, // Verification flag for front document
                                verifcedula_post: userProfile.verifcedula_post, // Verification flag for back document
                                verifcedula_ant_paprob: userProfile.verifcedula_ant_paprob, // Approval flag for front document
                                verifcedula_post_paprob: userProfile.verifcedula_post_paprob, // Approval flag for back document
                                wallet: userProfile.wallet, // User wallet
                                last_login_date: userProfile.last_login_date * 1000, // Last login date
                                last_login_ip: userProfile.last_login_ip, // Last login IP
                                cedula: userProfile.identification, // User identification
                                celular: userProfile.phone, // User phone
                                fecha_nacim: userProfile.birth_date, // User birth date
                                iframemini_bannerright: userProfile.iframemini_bannerright, // Right mini banner iframe
                                iframemini_bannerleft: userProfile.iframemini_bannerleft, // Left mini banner iframe
                                verifcelular: userProfile.verifcelular, // Cell verification flag
                                update_password: userProfile.update_password != undefined ? userProfile.update_password : false, // Update password flag
                                user_verification: userProfile.user_verification != undefined ? userProfile.user_verification : false, // User verification flag
                                formSplaft: userProfile.blocked_user == true ? 'S' : 'N', // Form splat flag
                                paternal_last_name: userProfile.paternal_last_name, // User paternal last name
                                mother_last_name: userProfile.mother_last_name, // User maternal last name
                                email: userProfile.email, // User email
                                phone: userProfile.phone, // User phone
                                doc_type: userProfile.doc_type, // Document type
                                nationalityid: userProfile.nationalityid, // Nationality ID
                                first_name: userProfile.first_name, // User first name
                                identification: userProfile.identification, // User identification
                                grupo: userProfile.group ? userProfile.group : '', // User group
                                doc_expired: userProfile.doc_expired // Document expired flag
                            }

                            try {
                                window.dataLayer?.push({
                                    event: "identify",
                                    user_id: userProfile.id_platform,
                                    email: userProfile.email,
                                    first_name: userProfile.first_name,
                                    last_name: userProfile.last_name,
                                    phone: userProfile.phone,
                                    gender: userProfile.gender,
                                    birth_date: userProfile.birth_date,
                                    document_id: userProfile.identification,
                                    country_code: userProfile.country_code,
                                    currency_id: userProfile.currency_id,
                                    is_verified: userProfile.is_verified,
                                    doc_expired: userProfile.doc_expired,
                                    balance: userProfile,
                                });

                            } catch (e) {
                                console.log(e)
                            }
                            try{
                                if ((window as any).posthog) {
                                    let userProfilePosthog = JSON.parse(JSON.stringify(userProfile));
                                    userProfilePosthog.email = userProfile.id_platform;
                                    (window as any).posthog.identify(String(userProfile.id_platform), userProfilePosthog);
                                }
                            }catch (e) {
                                console.log(e)
                            }


                            try {
                                apiService.setTestUser(appComponent.session.user_test == 1); // Set test user flag
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
                            try {
                                if ((window as any).optimoveSDK != undefined && (window as any).optimoveSDK.API != undefined) {
                                    (window as any).optimoveSDK.API.setUserId(userProfile.id_platform); // Set user ID for Optimove SDK
                                }
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
                            try {
                                if ((window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].on != undefined && (window as any).cconfig.chatKEIA[appComponent.country].on) {
                                    // initializeChat();

                                    const existingScript = document.getElementById('altenarWSDK'); // Check for existing SDK script
                                    if (existingScript) {
                                        initializeChat(); // Initialize chat if script already exists
                                    } else {
                                        const script = document.createElement('script'); // Create new script element
                                        script.setAttribute('id', 'altenarWSDK'); // Set script ID
                                        script.setAttribute('type', 'text/javascript'); // Set script type
                                        script.setAttribute('src', appComponent.config.altenar2.src); // Set script source
                                        document.body.appendChild(script); // Append script to the body
                                        script.addEventListener('load', () => {
                                            try {
                                                let integration = ''; // Initialize integration variable
                                                let culture = ''; // Initialize culture variable
                                                let oddsFormat = 0; // Initialize odds format variable
                                                let theme = ''; // Theme variable
                                                const { cookies } = useCookies();
                                                if (cookies.get('lng') !== undefined) {
                                                    // Determine culture based on cookie language
                                                    switch (cookies.get('lng')) {
                                                        case 'es':
                                                            culture = 'es-ES'; // Spanish culture
                                                            break;
                                                        case 'en':
                                                            culture = 'en-GB'; // English culture
                                                            break;
                                                        case 'pt':
                                                            culture = 'pt-BR'; // Portuguese culture
                                                            break;
                                                        default:
                                                            culture =
                                                                appComponent.config.altenar2[appComponent.country] !== undefined &&
                                                                appComponent.config.altenar2[appComponent.country].culture !== undefined
                                                                    ? appComponent.config.altenar2[appComponent.country].culture // Use country-specific culture if available
                                                                    : appComponent.config.altenar2.culture
                                                                        ? appComponent.config.altenar2.culture // Fallback to default culture
                                                                        : 'es-ES'; // Default to Spanish culture
                                                            break;
                                                    }
                                                }
                                                if (
                                                    appComponent.config.altenar2[appComponent.country] !== undefined &&
                                                    appComponent.config.altenar2[appComponent.country].integration !== undefined
                                                ) {
                                                    integration = appComponent.config.altenar2[appComponent.country].integration; // Get integration from country-specific config
                                                } else if (appComponent.config.altenar2.integration !== undefined) {
                                                    integration = appComponent.config.altenar2.integration; // Fallback to default integration
                                                }
                                                if (
                                                    appComponent.config.altenar2[appComponent.country] !== undefined &&
                                                    appComponent.config.altenar2[appComponent.country].oddsFormat !== undefined
                                                ) {
                                                    oddsFormat = appComponent.config.altenar2[appComponent.country].oddsFormat; // Get odds format from country-specific config
                                                } else if (appComponent.config.altenar2.oddsFormat !== undefined) {
                                                    oddsFormat = appComponent.config.altenar2.oddsFormat; // Fallback to default odds format
                                                }
                                                if (appComponent.themeSportbook) {
                                                    theme = 'light'; // Default theme
                                                } else {
                                                    theme = 'dark'; // Update theme based on app component
                                                }
                                                watch(
                                                    () => appComponent.themeSportbook,
                                                    (newValue, oldValue) => {
                                                        if (newValue === true) {
                                                            theme = 'light'; // Update theme based on app component
                                                        } else {
                                                            theme = 'dark'; // Update theme based on app component
                                                        }
                                                        (window as any).altenarWSDK.set({
                                                            themeName: theme,
                                                        });
                                                    },
                                                );
                                                // Initialize the Altenar SDK with configuration
                                                (window as any).altenarWSDK.init({
                                                    integration: integration,
                                                    culture: culture,
                                                    oddsFormat: oddsFormat,
                                                    token: appComponent.tokenSB,
                                                    themeName: theme,
                                                });
                                                initializeChat(); // Initialize chat after script is loaded
                                            } catch (e) {
                                                console.log({ e }); // Log any errors during SDK initialization
                                            } // Catch and ignore errors
                                            // this.sportBookStore.flagSportBook = true; // Set flag indicating sports book is ready
                                        });
                                    }


                                    async function initializeChat() {
                                        if (appComponent.session.logueado) {
                                            try {
                                                const sdk = new OddsPlatform({
                                                    clientId: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].clientID != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].clientID
                                                        : '',
                                                    authToken: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].authClientID != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].authClientID
                                                        : '',
                                                    userId: (window as any).usi != undefined ? (window as any).usi : '',
                                                    autoConnect: false
                                                });

                                                await sdk.init();

                                                // Manually connect WebSocket
                                                await sdk.connect();
                                                console.log((window as any).cconfig.chatKEIA[appComponent.country]);

                                                // Create UI
                                                const ui = new OddsPlatformUI(sdk, {
                                                    title: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.title != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.title
                                                        : '',

                                                    placeholder: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.placeholder != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.placeholder
                                                        : '',

                                                    autoOpen: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.autoOpen != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.autoOpen
                                                        : true,

                                                    showFloatingButton: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                    (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.showFloatingButton != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.showFloatingButton
                                                        : true,

                                                    agentName: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                        (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.agentName != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.agentName
                                                        : 'Paul',
                                                    customStyles: (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined &&
                                                        (window as any).cconfig.chatKEIA[appComponent.country].configurationChat != undefined && (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.styleChat != undefined
                                                        ? (window as any).cconfig.chatKEIA[appComponent.country].configurationChat.styleChat
                                                        : '',
                                                });

                                                console.log('Chat iniciado correctamente!');

                                                watch(
                                                    () => appComponent.showGame,
                                                    (newGame) => {
                                                        const chatBtn = document.querySelector('.odds-chat-float-btn') as HTMLElement | null;
                                                        if (!chatBtn) return;
                                                        if (newGame) {
                                                            chatBtn.style.display = 'none'; // Hide chat button when a game is selected
                                                        } else {
                                                            chatBtn.style.display = 'flex';
                                                        }
                                                    },
                                                    { deep: true, immediate: true }
                                                );

                                                return sdk;
                                            } catch (e) {
                                                console.log(e); // Log any errors
                                            }
                                        }
                                    }


                                }
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
                            try {
                                let userId = appComponent.session.usuario || null; // Get user ID
                                (window as any).hj('identify', userId, { // Identify user for Hotjar
                                    user_country:
                                        appComponent.session.pais.toLowerCase() ||
                                        appComponent.country,
                                    user_group: appComponent.session.grupo,
                                });
                            } catch (e) {
                            }
                            try {
                                if (appComponent.session.update_password) {
                                    router.push('/gestion/cambiar-clave'); // Redirect to change password if required
                                }
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
                            try {
                                if (((window as any).cconfig.checkPhone != undefined && (window as any).cconfig.checkPhone) && !appComponent.session.verifcelular) {
                                    appComponent.modal = { // Set modal for phone verification
                                        showModal: "sms",
                                        messageModal: {
                                            title: appComponent.config.languagesData != undefined &&
                                                appComponent.config.languagesData[appComponent.country] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Enviar código"] != undefined ?
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Enviar código"] :
                                                "Enviar código", // Title for the modal
                                            text: appComponent.config.languagesData != undefined &&
                                                appComponent.config.languagesData[appComponent.country] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Para continuar debes de verificar el número de teléfono celular donde te envíamos un código de 6 dígitos para su verificación"] != undefined ?
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Para continuar debes de verificar el número de teléfono celular donde te envíamos un código de 6 dígitos para su verificación"] :
                                                "Para continuar debes de verificar el número de teléfono celular donde te envíamos un código de 6 dígitos para su verificación", // Message text
                                            buttonText: appComponent.config.languagesData != undefined &&
                                                appComponent.config.languagesData[appComponent.country] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined &&
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Enviar"] != undefined ?
                                                appComponent.config.languagesData[appComponent.country][appComponent.lngProd]["Enviar"] :
                                                "Enviar", // Button text
                                            img: "https://images.virtualsoft.tech/m/msjT1680297293.png", // Image URL
                                            code: false, // Code flag
                                        }
                                    }
                                }
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
                            appComponent.loyalty.level = userProfile.loyaltyLevel; // Set loyalty level
                            appComponent.loyalty.points = userProfile.loyaltyPoints; // Set loyalty points
                            (window as any).usi = userProfile.id_platform; // Set user ID for global usage
                            if (appComponent.config.depositos != undefined && appComponent.config.depositos.bankAccountText != undefined && appComponent.config.depositos.bankAccountText) {
                                response.data.user_menus[0].SUBMENUS.unshift({ // Add bank transfer submenu
                                    "SUBMENU_ID": "137",
                                    "SUBMENU_URL": "deposito-cuenta",
                                    "SUBMENU_TITLE": "Bank transfer"
                                });
                            }
                            emitter.on('ready:login', () => { // Emit event when ready to login
                                appComponent.gAnalytics('login', userProfile); // Track login event
                            });
                            if (restoreLoginAnalytics) appComponent.gAnalytics('login', userProfile); // Track login event if restoreLoginAnalytics is true
                            // Check if infoApp is defined in the global window object
                            if (appComponent.infoApp) {
                                let menuInfoApp = [
                                    {
                                        "MENU_ID": "3",
                                        "SUBMENUS": [
                                            {
                                                "SUBMENU_ID": "189",
                                                "SUBMENU_URL": "cuentasbancarias",
                                                "SUBMENU_TITLE": "Cuentas bancarias"
                                            },
                                            {
                                                "SUBMENU_ID": "195",
                                                "SUBMENU_URL": "misbonos",
                                                "SUBMENU_TITLE": "Mis Bonos"
                                            },
                                            {
                                                "SUBMENU_ID": "87",
                                                "SUBMENU_URL": "gestion_cuenta",
                                                "SUBMENU_TITLE": "Mi Cuenta"
                                            },
                                            {
                                                "SUBMENU_ID": "89",
                                                "SUBMENU_URL": "historial_saldo",
                                                "SUBMENU_TITLE": "Historial de Saldo"
                                            }

                                        ],
                                        "MENU_SLUG": "gestion",
                                        "MENU_TITLE": "Gestión",
                                        "MENU_EDITAR": "true",
                                        "MENU_ELIMINAR": "false",
                                        "MENU_ADICIONAR": "true"
                                    },
                                    {
                                        "MENU_ID": "5",
                                        "SUBMENUS": [
                                            {
                                                "SUBMENU_ID": "100",
                                                "SUBMENU_URL": "consulta_tickets_online",
                                                "SUBMENU_TITLE": "Consulta de apuestas deportivas"
                                            },
                                            {
                                                "SUBMENU_ID": "184",
                                                "SUBMENU_URL": "consulta_tickets_casino",
                                                "SUBMENU_TITLE": "Informe de apuestas casino"
                                            },
                                            {
                                                "SUBMENU_ID": "186",
                                                "SUBMENU_URL": "consulta_depositos",
                                                "SUBMENU_TITLE": "Consultar depositos"
                                            },
                                            {
                                                "SUBMENU_ID": "188",
                                                "SUBMENU_URL": "consulta_retiros",
                                                "SUBMENU_TITLE": "Consultar retiros"
                                            }
                                        ],
                                        "MENU_SLUG": "consulta",
                                        "MENU_TITLE": "Consultas",
                                        "MENU_EDITAR": "false",
                                        "MENU_ELIMINAR": "false",
                                        "MENU_ADICIONAR": "true"
                                    }
                                ]
                                appComponent.menus_service = menuInfoApp; // Set service menus based on country
                            }
                            else if (appComponent.config.user_menus !== undefined && appComponent.config.user_menus[appComponent.country] !== undefined) {
                                appComponent.menus_service = appComponent.config.user_menus[appComponent.country]; // Set service menus based on country
                            } else {
                                appComponent.menus_service = [...response.data.user_menus]; // Fallback to response menus
                            }
                            appComponent.country = appComponent.session.pais.toLowerCase(); // Set country
                            appComponent.lngProd = appComponent.session.idioma.toLowerCase(); // Set language
                            if (appComponent.lngProd == "es") {
                                appComponent.selectFlag = "es"; // Set flag for Spanish
                            } else {
                                if (appComponent.lngProd == "en") {
                                    appComponent.selectFlag = "us"; // Set flag for English
                                } else {
                                    if (appComponent.lngProd == "pt") {
                                        appComponent.selectFlag = "br"; // Set flag for Portuguese
                                    } else {
                                        if (appComponent.lngProd == "tr") {
                                            appComponent.selectFlag = "tr"; // Set flag for Portuguese
                                        }
                                    }
                                }
                            }

                            if (response.data.data.document != undefined && response.data.data.document != '') {
                                var documentUser = response.data.data.document; // Get user document
                                let html = ''; // Initialize HTML for document display
                                if (documentUser != undefined && !documentUser.accept && appComponent.config.documentUser != undefined && appComponent.config.documentUser) {
                                    if (appComponent.config[documentUser.slug] != undefined && appComponent.config[documentUser.slug][appComponent.country] != undefined && appComponent.config[documentUser.slug][appComponent.country][appComponent.lngProd] != undefined) {
                                        let document = appComponent.config[documentUser.slug][appComponent.country][appComponent.lngProd]; // Get document configuration
                                        html = '<div class="documentUser">'; // Start document HTML
                                        document.forEach((item) => { // Iterate through document items
                                            if (item.parent != undefined && item.parent.length > 0) {
                                                html = html + '<h3 style="text-align: center; font-size: 14px; font-weight: bold">' + item.title + '</h3>'; // Add title
                                                item.parent.forEach((child) => { // Iterate through child items
                                                    html = html + '<h4 style="text-align: center; font-size: 12px; font-weight: bold">' + child.title + '</h4><br><p>' + child.content + '</p>'; // Add child content
                                                });
                                            }
                                        });
                                        html = html + '</div>'; // Close document HTML
                                    }
                                    if (
                                        !appComponent.session.user_verification ||
                                        appComponent.config.landingVerifyAccount == undefined ||
                                        appComponent.config.landingVerifyAccount[appComponent.country] == undefined ||
                                        appComponent.config.landingVerifyAccount[appComponent.country].active == undefined ||
                                        !appComponent.config.landingVerifyAccount[appComponent.country].active
                                    ) {
                                        appComponent.modal = { // Set modal for document display
                                            showModal: "document",
                                            messageModal: { data: html, document: documentUser } // Set document data
                                        }
                                    }
                                }
                            }
                            if (appComponent.config.urlApi != "" && appComponent.config.urlApi != undefined && appComponent.config.urlApi != null) {
                                if (appComponent.config.urlApi.isWsConnection === true) {
                                    if (appComponent.config.urlApi.wsPie != undefined && appComponent.config.urlApi.wsPie === true) {
                                        appComponent.whatsUp2(); // Call WhatsUp function if WebSocket connection is enabled
                                    }
                                }
                            }
                            if (appComponent.session.logueado) { // Check if user is logged in
                                if (appComponent.config.wallets != undefined && appComponent.config.wallets.length > 1) {
                                    if (appComponent.viewActual !== "/wallet") { // Redirect to wallet if not already on wallet page
                                        if (appComponent.session.wallet === '' || appComponent.session.wallet === undefined || appComponent.session.wallet === null) {
                                            router.push('/wallet'); // Redirect to wallet
                                        }
                                    }
                                }
                            }
                            if (appComponent.session.wallet == '1' && appComponent.frm == "lgn") {
                                appComponent.quiskBetting(); // Call quick betting function
                            }

                                if (appComponent.config.zendesk != undefined && appComponent.config.zendesk[appComponent.country] != undefined && appComponent.config.zendesk[appComponent.country].name == 'centribal') {
                                const scriptRemove = document.getElementById('cen_snippet_static'); // Get Zendesk script element
                                const divIframeRemove = document.getElementById('centribal_iframe_layout'); // Get Zendesk iframe element
                                if (scriptRemove) {
                                    scriptRemove.remove(); // Remove Zendesk script
                                    divIframeRemove?.remove(); // Remove Zendesk iframe
                                    const div = document.createElement('div'); // Create new div for Zendesk
                                    div.setAttribute('id', 'centribal_iframe_layout'); // Set ID for new div
                                    div.classList.add('centribal_hidden'); // Add hidden class
                                    if (appComponent.config.layout === 3) {
                                        document.querySelector('body')?.appendChild(div); // Append div to body for layout 3
                                    } else if (appComponent.config.layout === 2) {
                                        const divChat = document.getElementById('centribal_chat'); // Get chat div
                                        divChat?.appendChild(div); // Append div to chat
                                    }
                                    setTimeout(() => {
                                        const script = document.createElement('script'); // Create new script element
                                        script.setAttribute('id', 'cen_snippet_static'); // Set ID for script
                                        script.setAttribute('control_iframe', ''); // Set control iframe attribute
                                        script.setAttribute('type', 'text/javascript'); // Set script type
                                        if (appComponent.session.logueado) {
                                            script.setAttribute('src', `${appComponent.config.zendesk[appComponent.country].key}&userId=${appComponent.session.usuario}`); // Set source for logged in user
                                        } else {
                                            script.setAttribute('src', appComponent.config.zendesk[appComponent.country].key); // Set source for guest user
                                        }
                                        document.querySelector('body')?.appendChild(script); // Append script to body
                                    }, 500); // Delay script loading
                                }
                            }


                        if ((window as any).versionConfig != undefined && userProfile.country_code.toLowerCase() != (window as any).cconfig.countryL) {
                                appComponent.loadView = false;
                                loadScript((window as any).versionConfig.replace(/_([a-z]{2})_/, `_${userProfile.country_code.toLowerCase()}_`))
                                    .then(() => {
                                        appComponent.onWSPartnerCountry();
                                        const config = (window as any).cconfig; // Asegúrate de acceder al nuevo config global

                                        if (config.MENU_FOOTER_LIGHT_ != undefined) {
                                            config.MENU_FOOTER_LIGHT[config.countryL] = config.MENU_FOOTER_LIGHT_; // Set footer light menu for the country
                                        }
                                        if (config.PROVIDERS_ != undefined) {
                                            if (config.PROVIDERS != null) {
                                                config.PROVIDERS[config.countryL] = config.PROVIDERS_; // Set providers for the country
                                            } else {
                                                config.PROVIDERS = { [config.countryL]: [] }; // Initialize providers for the country
                                                config.PROVIDERS[config.countryL] = config.PROVIDERS_; // Set providers for the country
                                            }
                                        }
                                        if (config['login'] != undefined && config['login']['menu_'] != undefined) {
                                            config.MENU_USUARIO_LOGUEADO = { [config.countryL]: [] }; // Initialize logged-in user menu for the country
                                            config.MENU_USUARIO_LOGUEADO[config.countryL] = config['login']['menu_']; // Set logged-in user menu for the country
                                            config.MENU_USUARIO_LOGUEADO_MOBILE = { [config.countryL]: [] }; // Initialize mobile logged-in user menu for the country
                                            config.MENU_USUARIO_LOGUEADO_MOBILE[config.countryL] =
                                                config['login']['menu_']; // Set mobile logged-in user menu for the country
                                        }
                                        if (
                                            config['not_login'] != undefined &&
                                            config['not_login']['menu_'] != undefined
                                        ) {
                                            config.MENU_NOLOGUEADO = { [config.countryL]: [] }; // Initialize not logged-in user menu for the country
                                            config.MENU_NOLOGUEADO[config.countryL] = config['not_login']['menu_']; // Set not logged-in user menu for the country
                                            config.MENU_NOLOGUEADO_MOBILE = { [config.countryL]: [] }; // Initialize mobile not logged-in user menu for the country
                                            config.MENU_NOLOGUEADO_MOBILE[config.countryL] =
                                                config['not_login']['menu_']; // Set mobile not logged-in user menu for the country
                                        }

                                        // Update various configuration properties based on available data
                                        if (config.url_site != undefined) {
                                            config.urlSkin = config.url_site; // Set skin URL
                                        }
                                        if (config.layout_ != undefined) {
                                            config.layout = config.layout_; // Set layout
                                        }
                                        if (config.partner_ != undefined) {
                                            config.partner = config.partner_; // Set partner information
                                        }
                                        if (config.favicon_ != undefined) {
                                            config.favicon = config.favicon_; // Set favicon
                                        }
                                        if (config.withdrawalsView_ != undefined) {
                                            if (config.withdrawalsView == undefined) {
                                                config.withdrawalsView = {}; // Initialize withdrawals view if undefined
                                            }
                                            if (config.withdrawalsView[config['countryL']] == undefined) {
                                                config.withdrawalsView[config['countryL']] = config.withdrawalsView_; // Set withdrawals view for the country
                                            }
                                            config.withdrawalsView[config['countryL']] = config.withdrawalsView_; // Update withdrawals view for the country
                                        }
                                        if (config.depositsView != undefined) {
                                            const data = config.depositsView; // Check if deposits view for the country is defined
                                            if (config.depositsView[config['countryL']] == undefined) {
                                                config.depositsView = {}; // Initialize deposits view for the country if undefined
                                                config.depositsView[config['countryL']] = data; // Set withdrawals view for the country
                                            }
                                        }
                                        if (config['cards_events'] != undefined) {
                                            if (config['backgroundCardsTopEvents'] == undefined) {
                                                config['backgroundCardsTopEvents'] = {}; // Initialize background cards top events if undefined
                                            }
                                            if (config['backgroundCardsTopEvents'][config['countryL']] == undefined) {
                                                config['backgroundCardsTopEvents'][config['countryL']] =
                                                    config['cards_events']; // Set background cards top events for the country
                                            }
                                            config['backgroundCardsTopEvents'][config['countryL']] =
                                                config['cards_events']; // Update background cards top events for the country
                                        }
                                        if (config['footer_'] !== undefined && config['copyright'] !== undefined) {
                                            if (config['footer'] == undefined) {
                                                config['footer'] = {}; // Initialize footer if undefined
                                            }
                                            if (config['footer'][config['countryL']] == undefined) {
                                                config['footer'][config['countryL']] = {}; // Initialize footer for the country if undefined
                                            }
                                            if (config['footer'][config['countryL']]['copyright'] == undefined) {
                                                config['footer'][config['countryL']]['copyright'] =
                                                    config['footer_']['copyright']; // Set copyright information
                                            }
                                            config['footer'][config['countryL']]['copyright'] =
                                                config['footer_']['copyright']; // Update copyright information
                                        }
                                        if (config.general_ != undefined && config.general_['loyalty'] != undefined) {
                                            if (config['loyalty'] == undefined) {
                                                config['loyalty'] = {}; // Initialize loyalty if undefined
                                            }
                                            if (config['loyalty'][config['countryL']] == undefined) {
                                                config['loyalty'][config['countryL']] = config.general_['loyalty']; // Set loyalty for the country
                                            }
                                            config['loyalty'][config['countryL']] = config.general_['loyalty']; // Update loyalty for the country
                                        }
                                        if (
                                            config.general_ != undefined &&
                                            config.general_['gAnalytics'] != undefined
                                        ) {
                                            if (config['gAnalytics'] == undefined) {
                                                config['gAnalytics'] = config.general_['gAnalytics']; // Set Google Analytics configuration
                                            }
                                            config['gAnalytics'] = config.general_['gAnalytics']; // Update Google Analytics configuration
                                        }
                                        if (
                                            config.general_ != undefined &&
                                            config.general_.depositVersion != undefined
                                        ) {
                                            if (config.depositos == undefined) {
                                                config.depositos = {}; // Initialize depositos if undefined
                                            }
                                            if (config.depositos['styleVersion'] == undefined) {
                                                config.depositos['styleVersion'] = {}; // Initialize style version if undefined
                                            }
                                            if (config.depositos['styleVersion'][config['countryL']] == undefined) {
                                                config.depositos['styleVersion'][config['countryL']] =
                                                    config.general_['depositVersion']; // Set deposit version for the country
                                            }
                                            config.depositos['styleVersion'][config['countryL']] =
                                                config.general_['depositVersion']; // Update deposit version for the country
                                        }
                                        if (
                                            config.general_ != undefined &&
                                            config.general_['verifyJumio'] != undefined
                                        ) {
                                            if (config['verifyJumio'] == undefined) {
                                                config['verifyJumio'] = {}; // Initialize verifyJumio if undefined
                                            }
                                            if (config['verifyJumio'][config['countryL']] == undefined) {
                                                config['verifyJumio'][config['countryL']] =
                                                    config.general_['verifyJumio']; // Set verifyJumio for the country
                                            }
                                            config['verifyJumio'][config['countryL']] = config.general_['verifyJumio']; // Update verifyJumio for the country
                                        }
                                        if (config.general_ != undefined && config.general_['raffles'] != undefined) {
                                            if (config['raffles'] == undefined) {
                                                config['raffles'] = {}; // Initialize raffles if undefined
                                            }
                                            if (config['raffles'][config['countryL']] == undefined) {
                                                config['raffles'][config['countryL']] = config.general_['raffles']; // Set raffles for the country
                                            }
                                            config['raffles'][config['countryL']] = config.general_['raffles']; // Update raffles for the country
                                        }
                                        appComponent.menus_service = appComponent.config.user_menus[appComponent.country];
                                        appComponent.loadView = true; // Set load view flag
                                        emitter.emit("loadView", { country: appComponent.session.pais.toLowerCase() }); // Emit load view event
                                    }).catch((err) => {
                                        appComponent.loadView = true; // Set load view flag
                                        emitter.emit("loadView", { country: appComponent.session.pais.toLowerCase() });
                                    });
                            } else {
                                appComponent.loadView = true; // Set load view flag
                                emitter.emit("loadView", { country: appComponent.session.pais.toLowerCase() }); // Emit load view event
                            }
                            appComponent.disabledLogin = false; // Enable login button
                            appComponent.showModalLogin = false; // Hide login modal
                            console.log('refreshBalance end succes'); // Log successful end of refreshBalance
                        }
                        if (!appComponent.switch2FAUser && appComponent.showModalLogin2FA && appComponent.showModal2FA) {
                            appComponent.switch2FA = true;
                        }
                    } else {
                        appComponent.loadView = true; // Set load view flag
                        appComponent.disabledLogin = false; // Enable login button
                        console.log('refreshBalance end error'); // Log error end of refreshBalance
                    }
                })
            };
            function canShowModal(storageKey: string): boolean {
                return localStorage.getItem(storageKey) !== "false";
            }

            function resolveModal(data: any) { // Main resolver that decides which modal to show

                const { // Extract backend flags
                    firstLogin,
                    firstBetCasino,
                    firstBetSport,
                    firstDeposit
                } = data;

                const modalShown = localStorage.getItem("modal_shown"); // Check if login modal was already shown
                const currentPath = window.location.pathname; // Get current route path

                const isCasinoRoute = // Detect casino routes
                    currentPath.includes("new-casino") ||
                    currentPath.includes("live-casino-vivo");

                const isSportRoute = currentPath.includes("deportes"); // Detect sportsbook route
                const isDepositRoute = currentPath.includes("gestion/deposito"); // Detect deposit route
                const isWithdrawRoute = currentPath.includes("gestion/cuenta_cobro"); // Detect withdraw route

                let action: string | null = null; // Modal action identifier to dispatch

                if (isWithdrawRoute) { // Withdraw modal always shown on withdraw route
                    action = "onFirstWithdraw";
                }
                else if (isDepositRoute && canShowModal("ModalDepositShow")) {
                    action = firstDeposit
                        ? "onFirstDeposit"
                        : "onNextDeposit";
                }
                else if (
                    isCasinoRoute &&
                    firstBetCasino &&
                    canShowModal("ModalCasinoShow")
                ) {
                    action = "onFirstBetCasino";
                }
                else if (
                    isSportRoute &&
                    firstBetSport &&
                    canShowModal("ModalSporbookShow")
                ) {
                    action = "onFirstSportbookBet";
                }
                else if (!modalShown) { // Login modal only once per session
                    action = firstLogin
                        ? "onFirstLogin"
                        : "onNextLogin";

                }

                if (action) { // Dispatch modal event only if an action was resolved
                    window.dispatchEvent(
                        new CustomEvent("SHOW_LOGIN_MODAL", { detail: action })
                    );
                }

                (window as any).userFlags = { // Store flags globally for debugging or reuse
                    isFirstLogin: firstLogin,
                    isFirstBetCasino: firstBetCasino,
                    isFirstSport: firstBetSport,
                    isFirstDeposit: firstDeposit,
                    modalShown
                };
            }


            window.addEventListener("ROUTE_CHANGED", () => { // Listen to route change events
                const data = (window as any).__userData; // Retrieve previously stored user data
                if (!data) return; // Exit if data is not available
                resolveModal(data); // Re-evaluate modal logic on navigation
            });

            let refreshBalance = app.config.globalProperties.$refreshBalance; // Retrieve the refreshBalance function from global properties

            /**
             * Initializes the application by setting up various configurations and event listeners.
             */
            function init() {
                console.log('init init'); // Log initialization message
                appComponent.onWSContingency(); // Set up WebSocket contingency handling
                appComponent.onWSPartnerCountry(); // Set up WebSocket partner country handling

                // Check if contingency is defined in the global window object
                if ((window as any).contingency != undefined) {
                    appComponent.config.contingency = (window as any).contingency; // Assign global contingency to app configuration
                }

                // Check if infoApp is defined in the global window object
                if (appComponent.infoApp) {
                    let menuInfoApp = [
                        {
                            "MENU_ID": "3",
                            "SUBMENUS": [
                                {
                                    "SUBMENU_ID": "189",
                                    "SUBMENU_URL": "cuentasbancarias",
                                    "SUBMENU_TITLE": "Cuentas bancarias"
                                },
                                {
                                    "SUBMENU_ID": "195",
                                    "SUBMENU_URL": "misbonos",
                                    "SUBMENU_TITLE": "Mis Bonos"
                                },
                                {
                                    "SUBMENU_ID": "87",
                                    "SUBMENU_URL": "gestion_cuenta",
                                    "SUBMENU_TITLE": "Mi Cuenta"
                                },

                            ],
                            "MENU_SLUG": "gestion",
                            "MENU_TITLE": "Gestión",
                            "MENU_EDITAR": "true",
                            "MENU_ELIMINAR": "false",
                            "MENU_ADICIONAR": "true"
                        },
                        {
                            "MENU_ID": "5",
                            "SUBMENUS": [
                                {
                                    "SUBMENU_ID": "100",
                                    "SUBMENU_URL": "consulta_tickets_online",
                                    "SUBMENU_TITLE": "Consulta de apuestas deportivas"
                                },
                                {
                                    "SUBMENU_ID": "184",
                                    "SUBMENU_URL": "consulta_tickets_casino",
                                    "SUBMENU_TITLE": "Informe de apuestas casino"
                                },
                                {
                                    "SUBMENU_ID": "186",
                                    "SUBMENU_URL": "consulta_depositos",
                                    "SUBMENU_TITLE": "Consultar depositos"
                                },
                                {
                                    "SUBMENU_ID": "188",
                                    "SUBMENU_URL": "consulta_retiros",
                                    "SUBMENU_TITLE": "Consultar retiros"
                                }
                            ],
                            "MENU_SLUG": "consulta",
                            "MENU_TITLE": "Consultas",
                            "MENU_EDITAR": "false",
                            "MENU_ELIMINAR": "false",
                            "MENU_ADICIONAR": "true"
                        }
                    ]
                    appComponent.menus_service = menuInfoApp; // Set service menus based on country
                }

                // Check if WebSocket general configuration is enabled
                if (appComponent.config != undefined && appComponent.config.wsGeneral != undefined && appComponent.config.wsGeneral.on != undefined && appComponent.config.wsGeneral.on) {
                    appComponent.onWSGeneral(); // Set up WebSocket general handling
                }

                let contingencyData: any = appComponent.config.contingency; // Retrieve contingency data from configuration
                appComponent.contingency = contingencyData?.on ?? false; // Set contingency status based on configuration

                // If contingency is active, set it in the API service
                if (appComponent.contingency) {
                    apiService.setContingency(true);
                }

                // Validate contingency dates and set up interval for checking contingency status
                if (contingencyData != undefined && contingencyData.startDate && contingencyData.endDate && contingencyData.startDate < contingencyData.endDate) {
                    const now = new Date(); // Get current date
                    const startDate = new Date(parseInt(contingencyData.startDate, 10)); // Parse start date
                    const endDate = new Date(parseInt(contingencyData.endDate, 10)); // Parse end date

                    // Check if current date is within the contingency period
                    if (now <= startDate || now <= endDate) {
                        if (now >= startDate && now <= endDate) {
                            appComponent.contingency = true; // Set contingency to true
                            apiService.setContingency(true); // Update API service
                        } else if (now > endDate) {
                            appComponent.contingency = false; // Set contingency to false
                            apiService.setContingency(false); // Update API service
                        }

                        // Set up an interval to check the contingency status every second
                        const contingencyInterval = setInterval(() => {
                            const now = new Date(); // Get current date
                            if (now >= startDate && now <= endDate) {
                                appComponent.contingency = true; // Set contingency to true
                                apiService.setContingency(true); // Update API service
                            } else if (now > endDate) {
                                appComponent.contingency = false; // Set contingency to false
                                apiService.setContingency(false); // Update API service
                                clearInterval(contingencyInterval); // Clear the interval
                            }
                        }, 1000);
                    }
                }

                const stored = localStorage.getItem('changeThemeColor');
                if (
                    (!stored || stored == '' || (stored !== 'false' && stored !== 'true')) &&
                    appComponent.config != undefined &&
                    appComponent.config.defaultTheme != undefined
                ) {
                    if (appComponent.config.defaultTheme === 'dark') {
                        localStorage.setItem('changeThemeColor', 'false');
                        appComponent.themeSportbook = false;
                    } else if (appComponent.config.defaultTheme === 'light') {
                        localStorage.setItem('changeThemeColor', 'true');
                        appComponent.themeSportbook = true;
                    }
                }

                // Attempt to load Optimove script if configuration is available
                try {
                    if ((window as any).cconfig.optimove != undefined && (window as any).cconfig.optimove[appComponent.country] != undefined && (window as any).cconfig.optimove[appComponent.country].tenant_id != undefined && (window as any).cconfig.optimove[appComponent.country].tenant_token != undefined) {
                        let scriptWorker = document.createElement("script"); // Create script element for Optimove worker
                        scriptWorker.async = false; // Set script to load synchronously
                        scriptWorker.src = "https://static.app.delivery/sdks/web/optimove-worker.js"; // Set source for the script
                        const existingScriptWorker = document.querySelector(`script[src="${scriptWorker.src}"]`); // Check if script already exists
                        if (!existingScriptWorker) {
                            document.head.appendChild(scriptWorker); // Append script to document head
                            scriptWorker.addEventListener("load", (event) => {
                                let script = document.createElement("script"); // Create script element for Optimove SDK
                                script.async = false; // Set script to load synchronously
                                script.src = "https://sdk.optimove.net/websdk/?tenant_id=" + (window as any).cconfig.optimove[appComponent.country].tenant_id + "&tenant_token=" + (window as any).cconfig.optimove[appComponent.country].tenant_token; // Set source for the SDK
                                script.setAttribute("data-optimove-service-worker-path", "/ol-service-worker-optimove-v1.js"); // Set service worker path
                                const existingScript = document.querySelector(`script[src="${script.src}"]`); // Check if SDK script already exists
                                if (!existingScript) {
                                    document.head.appendChild(script); // Append SDK script to document head
                                }
                            });
                        }
                    }
                    } catch (e) {
                } // Catch any errors silently

                // Attempt to load chatKEIA script if configuration is available
                try {
                    if ((window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].on != undefined && (window as any).cconfig.chatKEIA[appComponent.country].on &&
                        (window as any).cconfig.chatKEIA[appComponent.country].clientID != undefined && (window as any).cconfig.chatKEIA[appComponent.country].authClientID != undefined) {
                        let scriptSocket = document.createElement("script"); // Create script element for chatKEIA  worker
                        scriptSocket.async = false; // Set script to load synchronously
                        scriptSocket.src = (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].scriptSocket != undefined
                            ? (window as any).cconfig.chatKEIA[appComponent.country].scriptSocket
                            : "https://cdn.socket.io/4.8.1/socket.io.min.js"
                        scriptSocket.integrity = (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].integritySocket != undefined
                            ? (window as any).cconfig.chatKEIA[appComponent.country].integritySocket
                            : "sha384-mkQ3/7FUtcGyoppY6bz/PORYoGqOl7/aSUMn2ymDOJcapfS6PHqxhRTMh1RR0Q6+"
                        scriptSocket.crossOrigin = (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].crossoriginSocket != undefined
                            ? (window as any).cconfig.chatKEIA[appComponent.country].crossoriginSocket
                            : "anonymous"
                        document.head.appendChild(scriptSocket); // Append SDK script to document head

                        let scriptPlataform = document.createElement("script"); // Create script element for chatKEIA  worker
                        scriptPlataform.async = false; // Set script to load synchronously
                        scriptPlataform.src = (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].scriptPlataform != undefined
                            ? (window as any).cconfig.chatKEIA[appComponent.country].scriptPlataform
                            : "https://platform-public-api-dev.onrender.com/static/sdk/index.min.js"
                        document.head.appendChild(scriptPlataform); // Append SDK script to document head

                        let scriptUI = document.createElement("script"); // Create script element for chatKEIA  UI
                        scriptUI.async = false; // Set script to load synchronously
                        scriptUI.src = (window as any).cconfig.chatKEIA != undefined && (window as any).cconfig.chatKEIA[appComponent.country] != undefined && (window as any).cconfig.chatKEIA[appComponent.country].scriptUI != undefined
                            ? (window as any).cconfig.chatKEIA[appComponent.country].scriptUI
                            : "https://platform-public-api-dev.onrender.com/static/sdk/ui-components.min.js"
                        document.head.appendChild(scriptUI); // Append SDK script to document head
                    }
                } catch (e) {

                }

                let config = appComponent.config; // Reference to app configuration
                try {
                    // Update various configuration properties based on available data
                    if (config.url_site != undefined) {
                        config.urlSkin = config.url_site; // Set skin URL
                    }
                    if (config.layout_ != undefined) {
                        config.layout = config.layout_; // Set layout
                    }
                    if (config.partner_ != undefined) {
                        config.partner = config.partner_; // Set partner information
                    }
                    if (config.favicon_ != undefined) {
                        config.favicon = config.favicon_; // Set favicon
                    }
                    if (config.withdrawalsView_ != undefined) {
                        if (config.withdrawalsView == undefined) {
                            config.withdrawalsView = {}; // Initialize withdrawals view if undefined
                        }
                        if (config.withdrawalsView[config['countryL']] == undefined) {
                            config.withdrawalsView[config['countryL']] = config.withdrawalsView_; // Set withdrawals view for the country
                        }
                        config.withdrawalsView[config['countryL']] = config.withdrawalsView_; // Update withdrawals view for the country
                    }
                    if (config.depositsView != undefined) {
                        const data = config.depositsView; // Check if deposits view for the country is defined
                        if (config.depositsView[config['countryL']] == undefined) {
                            config.depositsView = {}; // Initialize deposits view for the country if undefined
                            config.depositsView[config['countryL']] = data; // Set withdrawals view for the country
                        }
                    }
                    if (config['cards_events'] != undefined) {
                        if (config['backgroundCardsTopEvents'] == undefined) {
                            config['backgroundCardsTopEvents'] = {}; // Initialize background cards top events if undefined
                        }
                        if (config['backgroundCardsTopEvents'][config['countryL']] == undefined) {
                            config['backgroundCardsTopEvents'][config['countryL']] = config['cards_events']; // Set background cards top events for the country
                        }
                        config['backgroundCardsTopEvents'][config['countryL']] = config['cards_events']; // Update background cards top events for the country
                    }
                    if (config['footer_'] !== undefined && config['copyright'] !== undefined) {
                        if (config['footer'] == undefined) {
                            config['footer'] = {}; // Initialize footer if undefined
                        }
                        if (config['footer'][config['countryL']] == undefined) {
                            config['footer'][config['countryL']] = {}; // Initialize footer for the country if undefined
                        }
                        if (config['footer'][config['countryL']]["copyright"] == undefined) {
                            config['footer'][config['countryL']]["copyright"] = config['footer_']["copyright"]; // Set copyright information
                        }
                        config['footer'][config['countryL']]["copyright"] = config['footer_']["copyright"]; // Update copyright information
                    }
                    if (config.general_ != undefined && config.general_['loyalty'] != undefined) {
                        if (config['loyalty'] == undefined) {
                            config['loyalty'] = {}; // Initialize loyalty if undefined
                        }
                        if (config['loyalty'][config['countryL']] == undefined) {
                            config['loyalty'][config['countryL']] = config.general_['loyalty']; // Set loyalty for the country
                        }
                        config['loyalty'][config['countryL']] = config.general_['loyalty']; // Update loyalty for the country
                    }
                    if (config.general_ != undefined && config.general_['gAnalytics'] != undefined) {
                        if (config['gAnalytics'] == undefined) {
                            config['gAnalytics'] = config.general_['gAnalytics']; // Set Google Analytics configuration
                        }
                        config['gAnalytics'] = config.general_['gAnalytics']; // Update Google Analytics configuration
                    }
                    if (config.general_ != undefined && config.general_.depositVersion != undefined) {
                        if (config.depositos == undefined) {
                            config.depositos = {}; // Initialize depositos if undefined
                        }
                        if (config.depositos['styleVersion'] == undefined) {
                            config.depositos['styleVersion'] = {}; // Initialize style version if undefined
                        }
                        if (config.depositos['styleVersion'][config['countryL']] == undefined) {
                            config.depositos['styleVersion'][config['countryL']] = config.general_['depositVersion']; // Set deposit version for the country
                        }
                        config.depositos['styleVersion'][config['countryL']] = config.general_['depositVersion']; // Update deposit version for the country
                    }
                    if (config.general_ != undefined && config.general_['verifyJumio'] != undefined) {
                        if (config['verifyJumio'] == undefined) {
                            config['verifyJumio'] = {}; // Initialize verifyJumio if undefined
                        }
                        if (config['verifyJumio'][config['countryL']] == undefined) {
                            config['verifyJumio'][config['countryL']] = config.general_['verifyJumio']; // Set verifyJumio for the country
                        }
                        config['verifyJumio'][config['countryL']] = config.general_['verifyJumio']; // Update verifyJumio for the country
                    }
                    if (config.general_ != undefined && config.general_['raffles'] != undefined) {
                        if (config['raffles'] == undefined) {
                            config['raffles'] = {}; // Initialize raffles if undefined
                        }
                        if (config['raffles'][config['countryL']] == undefined) {
                            config['raffles'][config['countryL']] = config.general_['raffles']; // Set raffles for the country
                        }
                        config['raffles'][config['countryL']] = config.general_['raffles']; // Update raffles for the country
                    }
                } catch (e) {
                    console.log(e); // Log any errors encountered during configuration updates
                }

                // Check if the configuration is a proxy and convert to raw if necessary
                if (isProxy(appComponent.config)) {
                    config = toRaw(appComponent.config); // Convert to raw configuration
                }

                // Attempt to load Altenar configuration if available
                if ((window as any).cconfig.altenar != undefined && (window as any).cconfig.altenar != '') {
                    try {
                        appComponent.config.altenar = (window as any).cconfig.altenar; // Set Altenar configuration
                    } catch (e) {
                    }
                }

                // Attempt to load various casino-related configurations
                try {
                    if ((window as any).cconfig.casinoEnabled != undefined) {
                        appComponent.casinoEnabled = (window as any).cconfig.casinoEnabled; // Set casino enabled status
                    }
                } catch (e) {
                }
                try {
                    if ((window as any).cconfig.liveCasinoEnabled != undefined) {
                        appComponent.liveCasinoEnabled = (window as any).cconfig.liveCasinoEnabled; // Set live casino enabled status
                    }
                } catch (e) {
                }
                try {
                    if ((window as any).cconfig.virtualesEnabled != undefined) {
                        appComponent.virtualesEnabled = (window as any).cconfig.virtualesEnabled; // Set virtuales enabled status
                    }
                } catch (e) {
                }

                // Update footer and provider configurations based on available data
                try {
                    if (config.MENU_FOOTER_LIGHT_ != undefined) {
                        config.MENU_FOOTER_LIGHT[config.countryL] = config.MENU_FOOTER_LIGHT_; // Set footer light menu for the country
                    }
                    if (config.PROVIDERS_ != undefined) {
                        if (config.PROVIDERS != null) {
                            config.PROVIDERS[config.countryL] = config.PROVIDERS_; // Set providers for the country
                        } else {
                            config.PROVIDERS = { [config.countryL]: [] }; // Initialize providers for the country
                            config.PROVIDERS[config.countryL] = config.PROVIDERS_; // Set providers for the country
                        }
                    }
                    if (config['login'] != undefined && config['login']['menu_'] != undefined) {
                        config.MENU_USUARIO_LOGUEADO = { [config.countryL]: [] }; // Initialize logged-in user menu for the country
                        config.MENU_USUARIO_LOGUEADO[config.countryL] = config['login']['menu_']; // Set logged-in user menu for the country
                        config.MENU_USUARIO_LOGUEADO_MOBILE = { [config.countryL]: [] }; // Initialize mobile logged-in user menu for the country
                        config.MENU_USUARIO_LOGUEADO_MOBILE[config.countryL] = config['login']['menu_']; // Set mobile logged-in user menu for the country
                    }
                    if (config['not_login'] != undefined && config['not_login']['menu_'] != undefined) {
                        config.MENU_NOLOGUEADO = { [config.countryL]: [] }; // Initialize not logged-in user menu for the country
                        config.MENU_NOLOGUEADO[config.countryL] = config['not_login']['menu_']; // Set not logged-in user menu for the country
                        config.MENU_NOLOGUEADO_MOBILE = { [config.countryL]: [] }; // Initialize mobile not logged-in user menu for the country
                        config.MENU_NOLOGUEADO_MOBILE[config.countryL] = config['not_login']['menu_']; // Set mobile not logged-in user menu for the country
                    }
                } catch (e) {
                }

                const merge = { ...config, ...config }; // Merge configuration objects
                var eventMethod = (window.addEventListener as any) ? "addEventListener" : "attachEvent"; // Determine event listener method
                var eventer = window[eventMethod]; // Reference to the event listener method
                var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"; // Determine message event type

                // Set up event listener for messages from other windows
                eventer(messageEvent, function (e) {
                    // console.log('SITIO ONLINE → MENSAJE RECIBIDO', e.data);

                    var raw = e.data;
                    var data = raw;

                    // console.log("RAW TEXT:", typeof raw === "string" ? raw : JSON.stringify(raw));
                    if (typeof raw === "string") {
                        try {
                            data = JSON.parse(raw);
                            e.data = data;
                            // console.log("JSON parseado correctamente:", data);
                        } catch (err) {
                        }
                    }
                    // Handle redirection URL messages
                    if (typeof raw === "string" && raw.indexOf("redirectionurl_") !== -1) {
                        var a = document.createElement('a');    // Create anchor element for redirection
                        a.href = raw.split("redirectionurl_")[1];   // Set href to redirection URL
                        a.target = '_self';  // Set target to self
                        a.click();               // Trigger click to navigate
                        window.history.pushState(
                            '',
                            '',
                            '/new-casino/'
                        ); // Redirect to new casino page
                    }

                    // Handle redirection URL messages
                    if (typeof e.data === "object" && e.data !== null) {
                        const eventType = e.data.type || e.data.eventType;
                        const action = e.data.action;

                        if (eventType === "reloadGame") {
                            const currentSrc = appComponent.src;
                            appComponent.src = "";
                            setTimeout(() => {
                                appComponent.src = currentSrc;
                            }, 50);
                        }   

                        if (eventType === "backToLobby" || eventType === "com.egt-bg.exit" || action === "home_clicked") {
                            appComponent.showGame = false;
                        }
                    }


                    // Handle the redirection when the game requests to close
                    if (typeof raw === "string" && raw.indexOf("notifyCloseContainer") !== -1) {
                        // Your redirection logic here
                        appComponent.showGame = false;
                        window.history.pushState(
                            '',
                            '',
                            '/new-casino/'
                        ); // Redirect to new casino page
                    }
                    // Handle the redirection when the game requests to close
                    try {
                        let data = e.data;
                        if (typeof data === 'string') {
                            data = safeParseMaybeJson(data) ?? data;
                        }
                        // Check for classId 11
                        if (data.classId === 11) {
                            // Your redirection logic here
                            appComponent.showGame = false;
                            window.history.pushState(
                                '',
                                '',
                                '/new-casino/'
                            ); // Redirect to new casino page
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    // Handle redirection URL blank messages
                    if (typeof raw === "string" && raw.indexOf("redirectionurlblank_") !== -1) {
                        if (raw.split("redirectionurlblank_")[1] != undefined) {
                            var a = document.createElement('a');    // Create anchor element for redirection
                            a.href = raw.split("redirectionurlblank_")[1];  // Set href to redirection URL
                            a.target = '_blank';    // Set target to blank
                            a.click();             // Trigger click to navigate
                            window.location.href = '/new-casino'; // Redirect to new casino page
                            window.history.pushState(
                                '',
                                '',
                                '/new-casino/'
                            ); // Redirect to new casino page
                        }
                    }
                    // Handle login modal event
                    if (e.data === "loginModalEvent" || e.message === "loginModalEvent") {
                        appComponent.showModalLogin = true; // Show login modal
                    } else {
                        // Handle open game URL event
                        if (e.data.action === "open_game_url" && e.origin.indexOf("virtualsoft") > -1) {
                            var flag = false; // Flag for game opening
                            if (appComponent != undefined && appComponent.config != undefined && appComponent.config.openGameIframe) {
                                appComponent.urlpayments = e.data.data; // Set URL for payments
                                setTimeout(() => {
                                    [].forEach.call(document.querySelectorAll('[lightbox]'), function (el) {
                                        // Handle lightbox elements
                                    });
                                }, 100);
                            } else {
                                window.open(e.data.data, '_system'); // Open game URL in system
                            }
                        }
                    }

                    if (typeof e.data === 'string') {
                        const parsedData = safeParseMaybeJson(e.data) ?? e.data;
                        try {
                            if (parsedData.message === 'changeConfig') {
                                if (!parsedData.params || typeof parsedData.params !== "object") return;
                                if (parsedData.params.newConfig !== null && parsedData.params.newConfig !== '') {
                                    let device = parsedData.device;
                                    if (parsedData.params.newConfig != undefined && parsedData.params.newConfig.countries != undefined && parsedData.params.newConfig.countries != null && parsedData.params.newConfig.countries[parsedData.selectCountry] != undefined && parsedData.params.newConfig.countries[parsedData.selectCountry] != null) {
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry][device].login) parsedData.params.login = parsedData.params.newConfig.countries[parsedData.selectCountry][device].login; // Set login configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry][device].not_login) parsedData.params.not_login = parsedData.params.newConfig.countries[parsedData.selectCountry][device].not_login; // Set not login configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.menu) parsedData.params.menu = parsedData.params.newConfig.countries[parsedData.selectCountry]?.menu; // Set menu configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry][device].components_) parsedData.params.components_ = parsedData.params.newConfig.countries[parsedData.selectCountry][device].components_; // Set components configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.MENU_FOOTER_LIGHT_) parsedData.params.MENU_FOOTER_LIGHT_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.MENU_FOOTER_LIGHT_; // Set footer light menu configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.PROVIDERS_) parsedData.params.PROVIDERS_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.PROVIDERS_; // Set providers configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.forms) parsedData.params.forms = parsedData.params.newConfig.countries[parsedData.selectCountry]?.forms; // Set forms configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.header_) parsedData.params.header_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.header_; // Set header configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.footer_) parsedData.params.footer_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.footer_; // Set footer configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.ModalTemplates) parsedData.params.ModalTemplates = parsedData.params.newConfig.countries[parsedData.selectCountry]?.ModalTemplates; // Set modal templates configuration
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.background_desktop) parsedData.params.background_desktop = parsedData.params.newConfig.countries[parsedData.selectCountry]?.background_desktop;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.background_mobile) parsedData.params.background_mobile = parsedData.params.newConfig.countries[parsedData.selectCountry]?.background_mobile;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.favicon_) parsedData.params.favicon_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.favicon_;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.logo_) parsedData.params.logo_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.logo_;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_mode) parsedData.params.theme_mode = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_mode;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.swichThemeMode) parsedData.params.swichThemeMode = parsedData.params.newConfig.countries[parsedData.selectCountry]?.swichThemeMode;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors) parsedData.params.theme_colors = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_) parsedData.params.theme_colors_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_desktop) parsedData.params.theme_colors_desktop = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_desktop;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth) parsedData.params.theme_colors_ligth = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth_desktop) parsedData.params.theme_colors_ligth_desktop = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth_desktop;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth_mobile) parsedData.params.theme_colors_ligth_mobile = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_ligth_mobile;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_mobile) parsedData.params.theme_colors_mobile = parsedData.params.newConfig.countries[parsedData.selectCountry]?.theme_colors_mobile;
                                        if (parsedData.params.newConfig.countries[parsedData.selectCountry]?.categoryBonosLoyalty_) parsedData.params.categoryBonosLoyalty_ = parsedData.params.newConfig.countries[parsedData.selectCountry]?.categoryBonosLoyalty_;

                                    }
                                    for (let key in parsedData.params.newConfig) {
                                        if (key !== 'countries') {
                                            parsedData.params[key] = parsedData.params.newConfig[key]; // Update parameters with new configuration
                                        }
                                    }
                                }
                                delete parsedData.params.newConfig; // Remove newConfig from parameters
                                (window as any).cconfig = {
                                    ...(window as any).cconfig,
                                    ...parsedData.params,
                                    isPreviewMode: true
                                }; // Update global configuration
                                //  Update app component configuration
                                appComponent.config = {
                                    ...appComponent.config,
                                    ...parsedData.params,
                                    isPreviewMode: true,
                                };
                                // console.log('SITIO ONLINE → Config FINAL (root):', appComponent.config);
                                // console.log("SITIO ONLINE → Llamando a changeApp()");
                                changeApp(); // Trigger application change
                                appComponent.loadView = false;
                                setTimeout(() => appComponent.loadView = true, 5000); // Reload view after a delay

                                // Lógica adicional aquí
                            }
                        } catch (error) {
                            console.error('Error al parsear e.data:', error);
                        }
                    }
                });

                appComponent.setBackgroundType(); // Set background type for the application

                // Attempt to run emojify for emoji processing
                try {
                    emojify.run();
                } catch (e) {
                    console.log(e); // Log any errors encountered during emojify
                }

                try {
                    window.addEventListener('load', () => {

                        appComponent.connectToDga();
                    });
                } catch (e) {
                    console.log(e);
                }


                // Handle user authentication token based on contingency status
                if (appComponent.contingency) {
                    window.localStorage.removeItem("auth_token"); // Remove auth token if in contingency
                    window.localStorage.removeItem('modal_shown');

                    appComponent.loadView = true; // Set load view to true
                } else {
                    appComponent.tokenUser = window.localStorage.getItem("auth_token"); // Retrieve auth token from local storage
                }

                // Attempt to restore user login if token is available
                if (appComponent.tokenUser != '' && appComponent.tokenUser != null && appComponent.tokenUser != undefined &&
                    window.location.href.indexOf("/banner-leftnl") == -1 && window.location.href.indexOf("/banner-rightnl") == -1 &&
                    window.location.href.indexOf("/banner-left") == -1 && window.location.href.indexOf("/banner-right") == -1 &&
                    window.location.href.indexOf("/banner-leftnl") == -1 && window.location.href.indexOf("/banner-rightnl") == -1 &&
                    window.location.href.indexOf("/banner-topcenternl") == -1 && window.location.href.indexOf("/banner-topcenter") == -1) {
                    const params = {
                        auth_token: appComponent.tokenUser // Set parameters for restoring login
                    };
                    apiService.request('restore_login_site', params).then((response: any) => {
                        if (response != undefined && response.code == 0) {
                            appComponent.tokenUser = response.data.auth_token; // Update auth token
                            appComponent.user_id = response.data.user_id; // Set user ID
                            appComponent.channel_id = response.data.channel_id; // Set channel ID
                            appComponent.id_platform = response.data.id_platform; // Set platform ID
                            apiService.setAuthToken(response.data.auth_token); // Update API service with new auth token
                            window.localStorage.setItem("auth_token", response.data.auth_token); // Store new auth token in local storage
                            refreshBalance(); // Refresh user balance
                            try {
                                (window as any).fLoadSuccess(appComponent.user_id, appComponent.frm); // Trigger success callback
                            } catch (e) {
                            }
                            restoreLoginAnalytics = true; // Set flag for login analytics
                            console.log('restore_login_site end success'); // Log success message
                        } else {
                            appComponent.tokenSB = ''; // Clear token
                            appComponent.loadView = true; // Set load view to true
                            window.localStorage.removeItem("auth_token"); // Remove auth token from local storage
                            window.localStorage.removeItem('modal_shown');

                            appComponent.notTokenUser = true; // Set flag for no token user
                            appComponent.loadBalance = true; // Set load balance to true
                            appComponent.firstReqBalance = true; // Set first request balance to true
                            console.log('restore_login_site end error'); // Log error message
                        }
                        // Update logo configuration if available
                        if ((window as any).cconfig.header != undefined && (window as any).cconfig.header.logo != undefined && (window as any).cconfig.header.logo.src != "" && (window as any).cconfig.header.logo.src != undefined) {
                            try {
                                appComponent.config.logo = (window as any).cconfig.header.logo.src; // Set logo source
                                appComponent.config.header.logo.src = (window as any).cconfig.header.logo.src; // Update header logo source
                                appComponent.config.header.logoUrl = (window as any).cconfig.header.logo.src; // Set logo URL
                                appComponent.config.menuMobile.logo.url = (window as any).cconfig.menuMobile.logo.url; // Update mobile menu logo URL
                            } catch (e) {
                            }
                        }
                    }).catch((e) => {
                        console.log(e); // Log any errors encountered during login restoration
                        window.localStorage.removeItem("auth_token"); // Remove auth token from local storage
                        window.localStorage.removeItem('modal_shown');

                    });
                } else {
                    appComponent.loadView = true; // Set load view to true
                    appComponent.loadJsAltenar(); // Load Altenar JavaScript
                    try {
                        (window as any).fLoadSuccess(appComponent.user_id, appComponent.frm); // Trigger success callback
                    } catch (e) {
                    }
                    console.log('no hay token'); // Log message indicating no token
                }

                // Set up an interval to update the current time every second
                setInterval(() => {
                    appComponent.time = new Date(); // Update time
                }, 1000);

                // Set up a timer if conditions are met
                if (appComponent.flagTimer && ((window as any).cconfig.header_ != undefined && (window as any).cconfig.header_.clock != undefined ? (window as any).cconfig.header_.clock : (window as any).cconfig.header.clock)) {
                    appComponent.interval = setInterval(() => {
                        ++appComponent.totalSeconds; // Increment total seconds
                    }, 1000);
                    appComponent.flagTimer = false; // Reset flag timer
                }

                // Set up an event listener for accepting modals
                emitter.on("accept:modal", () => {
                    appComponent.acceptModal(); // Call accept modal function
                });
            }

            try {
                init(); // Initialize the application
            } catch (e) {
                console.log(e); // Log any errors during initialization
            }

            app.use(VueLazyLoad, { // Use VueLazyLoad plugin for lazy loading images
                loading: '', // Placeholder for loading state
                error: '', // Placeholder for error state
                lifecycle: {
                    loading: (el: null) => { // Lifecycle hook for loading state
                    },
                    error: (el: null) => { // Lifecycle hook for error state
                    },
                    loaded: (el: null) => { // Lifecycle hook for loaded state
                    }
                }
            });

            app.directive('t', function (el, binding) { // Custom directive 't' for translation
                if (appComponent != undefined &&
                    appComponent.config != undefined &&
                    appComponent.config['not_login'] != undefined &&
                    appComponent.config['not_login'][appComponent.lngProd] != undefined &&
                    appComponent.config['not_login'][appComponent.lngProd]['translations'] != undefined &&
                    appComponent.config['not_login'][appComponent.lngProd]['translations'][el.innerHTML] != undefined
                ) {
                    el.innerHTML = appComponent.config['not_login'][appComponent.lngProd]['translations'][el.innerHTML]; // Translate text if available
                } else {
                    if (appComponent != undefined &&
                        appComponent.config != undefined &&
                        appComponent.config.languagesData != undefined &&
                        appComponent.config.languagesData[appComponent.country] != undefined &&
                        appComponent.config.languagesData[appComponent.country][appComponent.lngProd] != undefined &&
                        appComponent.config.languagesData[appComponent.country][appComponent.lngProd][el.innerHTML] != undefined
                    ) {
                        el.innerHTML = appComponent.config.languagesData[appComponent.country][appComponent.lngProd][el.innerHTML]; // Fallback translation
                    }
                }
            });

            app.directive('focus', function (el, binding) { // Custom directive 'focus' to set focus on an element
                el.focus(); // Set focus on the element
            });

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
                let settings = {}; // Initialize settings for Zendesk integration
                if (appComponent.config.zendesk[appComponent.country].name == 'messenger') {
                    settings = {
                        messenger: {
                            chat: {
                                departments: {
                                    enabled: [], // Departments enabled for chat
                                    select: appComponent.config.zendesk[appComponent.country].departmentsSelect, // Selected departments
                                },
                            },
                        },
                    };
                } else if (appComponent.config.zendesk[appComponent.country].name == 'webWidget') {
                    settings = {
                        webWidget: {
                            chat: {
                                departments: {
                                    enabled: [], // Departments enabled for chat
                                    select: appComponent.config.zendesk[appComponent.country].departmentsSelect, // Selected departments
                                },
                            },
                            color: {
                                theme: appComponent.config.zendesk[appComponent.country].theme, // Theme color for the widget
                                launcherText: appComponent.config.zendesk[appComponent.country].launcherText, // Text for the launcher
                            },
                            position: {
                                horizontal: appComponent.config.zendesk[appComponent.country].horizontal, // Horizontal position of the widget
                                vertical: appComponent.config.zendesk[appComponent.country].vertical, // Vertical position of the widget
                            },
                        },
                    };
                } else if (appComponent.config.zendesk[appComponent.country].name == 'centribal') {
                    const scriptInit = document.createElement('script'); // Create a script element for Centribal
                    scriptInit.setAttribute('src', appComponent.config.zendesk['srcJs'] ? appComponent.config.zendesk['srcJs'] : 'https://cwcentribot.centribal.com/sdk_v1.js'); // Set script source
                    document.querySelector('body')?.appendChild(scriptInit); // Append script to body
                    const div = document.createElement('div'); // Create a div for Centribal iframe
                    div.setAttribute('id', 'centribal_iframe_layout'); // Set ID for the div
                    div.classList.add('centribal_hidden'); // Add hidden class
                    document.querySelector('body')?.appendChild(div); // Append div to body
                    window.addEventListener("message", function (e) { // Listen for messages from the iframe
                        if (e.data.status === "hide") {
                            document.getElementById("centribal_iframe_layout")?.classList.remove("centribal_open"); // Remove open class
                            document.getElementById("centribal_iframe_layout")?.classList.add("centribal_hidden"); // Add hidden class
                        }
                    });
                    setTimeout(() => {
                        const script = document.createElement('script'); // Create a script element for Centribal
                        script.setAttribute('id', 'cen_snippet_static'); // Set ID for the script
                        script.setAttribute('control_iframe', ''); // Set control iframe attribute
                        if (appComponent.session.logueado) {
                            script.setAttribute('src', `${appComponent.config.zendesk[appComponent.country].key}&userId=${appComponent.session.usuario}`); // Set source with user ID if logged in
                        } else {
                            script.setAttribute('src', appComponent.config.zendesk[appComponent.country].key); // Set source if not logged in
                        }
                        script.setAttribute('type', 'text/javascript'); // Set script type
                        document.querySelector('body')?.appendChild(script); // Append script to body
                    }, 500); // Delay script execution
                }
                if (appComponent.config.zendesk[appComponent.country].name == 'webWidget' || appComponent.config.zendesk[appComponent.country].name == 'messenger') {
                    app.use(Zendesk, { // Use Zendesk plugin with specified settings
                        key: appComponent.config.zendesk[appComponent.country].key, // Zendesk API key
                        disabled: appComponent.config.zendesk[appComponent.country].disabled, // Disable setting
                        hideOnLoad: appComponent.config.zendesk[appComponent.country].hideOnLoad, // Hide on load setting
                        settings: settings, // Pass settings for the widget
                    });
                }
            }
            try {
                // Check if Hotjar configuration is defined and active for the current country
                if (
                    appComponent.config.hotjar != undefined &&
                    appComponent.config.hotjar[appComponent.country] != undefined &&
                    appComponent.config.hotjar[appComponent.country].active
                ) {
                    // Initialize Hotjar tracking function if it doesn't already exist
                    (window as any).hj =
                        (window as any).hj ||
                        function () {
                            // Push arguments to the Hotjar queue
                            (window.hj.q = window.hj.q || []).push(arguments);
                        };

                    // Set Hotjar settings with the unique ID and version
                    (window as any)._hjSettings = {
                        hjid: appComponent.config.hotjar[appComponent.country].hjid,
                        hjsv: appComponent.config.hotjar[appComponent.country].hjsv,
                    };

                    // Create a script element to load the Hotjar script asynchronously
                    let script = document.createElement('script');
                    script.async = true;
                    script.src =
                        'https://static.hotjar.com/c/hotjar-' +
                        appComponent.config.hotjar[appComponent.country].hjid +
                        '.js?sv=' +
                        appComponent.config.hotjar[appComponent.country].hjsv;
                    script.id = 'hotjar';

                    // Append the Hotjar script to the document head
                    document.head.appendChild(script);

                    // Add an event listener to identify the user once the script is loaded
                    script.addEventListener('load', () => {
                        let userId = appComponent.session.usuario || null; // Get user ID from session
                        (window as any).hj('identify', userId, {
                            user_country:
                                appComponent.session.pais.toLowerCase() ||
                                appComponent.config.countryL, // Set user country
                            user_group: appComponent.session.grupo, // Set user group
                        });
                    });
                }
            } catch (e) {
                // Log any errors encountered during Hotjar initialization
                console.log('error hotjar', e);
            }

            /**
             * Function to set the title attribute of the iframe element.
             * It clears the interval once the title is set.
             */
            function titleIframe() {
                const iframe = document.getElementById("bim-ifr"); // Get the iframe element by ID
                if (iframe) {
                    iframe.setAttribute("title", "Chat Supporter"); // Set the title for accessibility
                    clearInterval(intervalId); // Clear the interval to stop further checks
                }
            }

            // Set an interval to check for the iframe and set its title every second
            const intervalId = setInterval(titleIframe, 1000);

            // Use the APM Vue plugin with the provided configuration, or an empty object if not defined
            app.use(ApmVuePlugin, {
                config: appComponent.config.apmVuePlugin != undefined ? appComponent.config.apmVuePlugin : {}
            }).component("font-awesome-icon", FontAwesomeIcon) // Register FontAwesomeIcon component
                .component(VueCountdown.name, VueCountdown); // Register VueCountdown component
        }

        /**
         * Function to change the application state by unmounting the current app
         * and re-initializing it.
         */
        function changeApp() {
            console.log('SITIO ONLINE → Ejecutando changeApp() con config');
            unmount(app);
            setTimeout(() => {
                mount(app);
            }, 1000); // Delay to ensure unmounting is complete
            // AppInitialization(); // Re-initialize the app
        }

        // Call the AppInitialization function to perform additional setup.
        AppInitialization();
    }, // Placeholder for handling instance
});


// Export lifecycle methods for Single SPA
export const bootstrap = vueLifecycles.bootstrap; // Export bootstrap method
export const mount = vueLifecycles.mount; // Export mount method
export const unmount = vueLifecycles.unmount; // Export unmount method



// Function to activate Single SPA
function activateSingleSpa() {
    bootstrap({} as any).then(() => {
        console.log('Vue app bootstrapped'); // Log successful bootstrap
        mount({} as any); // Mount the Vue app
    }).catch(err => {
        console.error('Error bootstrapping or mounting the Vue app:', err); // Log errors during bootstrap or mount
    });
}

// Event listener for messages to activate Single SPA
window.addEventListener('message', function (event) {
    if (event.data === 'activateSingleSpa') {
        activateSingleSpa(); // Call activateSingleSpa if the message matches
    }
});

// FILE DOCUMENTED

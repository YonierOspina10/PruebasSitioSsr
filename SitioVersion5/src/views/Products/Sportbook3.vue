<script lang="ts" setup>
/**
 * Sportbook3.vue
 *
 * Integration component for embedding and controlling the external Digitain sportsbook application.
 * - Boots the sportsbook using a global `window.Bootstrapper` loader.
 * - Maps SPA routes to sportsbook internal routes and viceversa to keep both apps synchronized.
 * - Manages lifecycle: boot, destroy, and re-boot on token/theme changes.
 *
 * Notes:
 * - This file uses Composition API (`<script setup>`) and TypeScript.
 * - The component relies on `appComponent` from the global Vue app context (injected global property).
 */

import { onMounted, onUnmounted, watch, ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSportBookStore } from '@/stores/sportbook';

const route = useRoute();
const router = useRouter();

/**
 * Reactive view selection based on window width.
 * Determines which Digitain view to boot (Mobile vs multiple desktop viewnames).
 */
const viewName = ref<ViewName>(window.innerWidth < 768 ? 'Mobile' : 'EuropeanView');

type ViewName = 'EuropeanView' | 'AfricanView' | 'Mobile' | 'LatinoView' | 'ModernView' | 'AsianView';

declare global {
    interface Window {
        /**
         * Optional Bootstrapper provided by the Digitain integration script.
         * boot(params, opts) returns a Promise resolving to an application instance (SportApp).
         */
        Bootstrapper?: {
            boot: (params: any, opts: { name: ViewName }) => Promise<any>;
        };
    }
}

/**
 * Boot parameters used by the external sportsbook integration.
 */
interface BootParams {
    server: string;
    containerId: string; // e.g. "sportsbook-container"
    token: string; // "-" if guest
    parent: string[];
    sportPartner: string;
    defaultLanguage?: string; // "es" recomendada
    projectTheme?: 'default' | 'alternative';
    oddsFormatList?: number[];
    oddsFormat?: number;
    zIndex?: { closed?: number; opened?: number; fullOpened?: number };
    initialRoute?: { path: string; qs?: any; hashData?: string };
    // Opcional (Mobile/Latino):
    urlStructureType?: 1 | 2;
    sportMainPath?: string;
    view?: 'asian'; // solo Mobile
}

/**
 * Minimal interface representing the exposed API of the loaded sportsbook instance.
 * - addEventListener: subscribe to internal events dispatched by the sportsbook.
 * - dispatchEvent: send commands to the sportsbook (e.g. destroy, theme change).
 */
type SportApp = {
    addEventListener: (name: string, cb: (e: any) => void) => void;
    dispatchEvent: (name: string, payload: any) => void;
};

let loading = ref(false);
let appInstance: SportApp | null = null;

// Getting the current instance of the component and the injected global app component
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
let sportBookStore = useSportBookStore();
const digitainData = appComponent?.config?.digitain ?? {};
let backgroundColor = 'none';
let betslipObserver: MutationObserver | null = null;
if (
    appComponent.config['sportBookVersion'].backgroundColor !== undefined &&
    appComponent.config['sportBookVersion'].backgroundColor !== ''
) {
    backgroundColor = appComponent.config['sportBookVersion'].backgroundColor;
}

/**
 * Boots the Digitain sportsbook with the given params and returns the app instance.
 * Protects against concurrent boots using the `loading` flag.
 *
 * @param params - Boot parameters to initialize the sportsbook
 * @param view - Chosen view (Mobile, EuropeanView, etc.)
 * @returns The created SportApp instance or null if already loading
 */
async function bootSportsbook(params: BootParams, view: ViewName) {
    if (loading.value) {
        return null;
    }
    loading.value = true;
    if (!window.Bootstrapper) throw new Error('Bootstrapper not loaded');
    sportBookStore.loading = true;
    appInstance = await window.Bootstrapper.boot(params, { name: view });
    betslipObserver = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            console.log('[Digitain] Betslip mutation observed, adjusting z-index');
            document.querySelectorAll('sport-betslip').forEach((el) => {
                (el as HTMLElement).style.zIndex = '100';
            });
        });
    });
    betslipObserver.observe(document.body, { childList: true, subtree: true });
    sportBookStore.loading = false;
    return appInstance;
}

/**
 * Subscribe to sportsbook internal dispatch events.
 * Callback receives the event payload extracted from the sportsbook's custom event.
 *
 * @param cb - Handler invoked with payload when `sportAppEventDispatch` fires
 */
function onSportDispatch(cb: (payload: any) => void) {
    appInstance?.addEventListener('sportAppEventDispatch', ({ data }) => cb(data));
}

/**
 * Sends a project theme update command to the sportsbook.
 *
 * @param theme - 'default' or 'alternative'
 */
function setProjectTheme(theme: 'default' | 'alternative') {
    appInstance?.dispatchEvent('sportAppEventListener', { type: 2, message: { projectTheme: theme } });
}

/**
 * Gracefully destroys the current sportsbook instance:
 * - Sends a destroy command when possible.
 * - Clears container DOM and any stray elements created by the sportsbook (e.g., betslip).
 * - Waits briefly to allow cleanup.
 */
async function destroySportsbook() {
    sportBookStore.loading = true;
    try {
        appInstance?.dispatchEvent('sportAppEventListener', { type: 1, message: null });
    } catch (e) {
        console.warn('[Digitain] Error during destroy:', e);
    }
    appInstance = null;

    // Disconnect the betslip observer
    if (betslipObserver) {
        betslipObserver.disconnect();
        betslipObserver = null;
    }

    // Clean the main container
    const container = document.getElementById('sport_div_iframe');
    if (container) {
        container.innerHTML = '';
    }

    // Remove sportsbook components from body
    const betslipElements = document.querySelectorAll('sport-betslip');
    betslipElements.forEach((el) => el.remove());

    await new Promise((resolve) => setTimeout(resolve, 1000));
}

/**
 * Build the BootParams object consumed by the sportsbook `boot()` method.
 * Includes user, token, language and an initialRoute mapped from the current SPA route.
 *
 * Side-effect: sets `appComponent.skinIdITN` to digitain sportPartner if empty.
 *
 * @returns BootParams ready to pass to `bootSportsbook`
 */
function makeBootParams() {
    if (
        (!appComponent.skinIdITN || appComponent.skinIdITN === '') &&
        appComponent?.config?.digitain &&
        appComponent?.config?.digitain?.sportPartner
    ) {
        appComponent.skinIdITN = appComponent?.config?.digitain?.sportPartner;
    }

    const params = {
        server: digitainData.host,
        containerId: 'sport_div_iframe',
        parent: [window.location.hostname],
        userId: String(appComponent.session.usuario),
        token: appComponent.tokenSB || '-',
        sportPartner: appComponent.skinIdITN,
        defaultLanguage: appComponent.lngProd || 'es',
        initialRoute: resolveInitialRouteFromSpa(route.fullPath),
    };

    return params;
}

/**
 * Wrapper that maps the current SPA `fullPath` to the sportsbook internal `initialRoute` shape.
 *
 * @param fullPath - current route fullPath
 * @returns initial route object for the sportsbook
 */
function resolveInitialRouteFromSpa(fullPath: string) {
    return mapSpaToSportPath(fullPath);
}

/**
 * Translate an SPA-style path to the sportsbook's path and query object.
 * Example: '/deportes/1/pais/2/liga/3/partido/4' -> { path: '/event-details', qs: { sport: '1', country: '2', champ: '3', event: '4', ... } }
 *
 * @param fullPath - SPA path or a string containing route segments
 * @returns Object containing `path` and optional `qs` and `hashData` for the sportsbook
 */
function mapSpaToSportPath(fullPath: string): { path: string; qs?: any; hashData?: string } {
    const url = new URL(fullPath, 'http://dummy');
    const parts = url.pathname.split('/').filter(Boolean);

    const qs: any = {};

    for (let i = 0; i < parts.length; i += 2) {
        switch (parts[i]) {
            case 'deportes':
                qs.sport = parts[i + 1];
                break;
            case 'pais':
                qs.country = parts[i + 1];
                break;
            case 'liga':
                qs.champ = parts[i + 1];
                break;
            case 'partido':
                qs.event = parts[i + 1];
                break;
        }
    }

    const sportId = qs.sport ?? 'undefined';
    const countryId = qs.country ?? 'undefined';
    const champId = qs.champ;

    if (qs.sport && qs.country && qs.champ && qs.event) {
        qs.supertip = 0;
        qs.live = 0;
        return { path: '/event-details', qs };
    } else if (champId !== undefined) {
        const qObj: any = {};
        qObj[sportId] = { [countryId]: [Number(champId)] };
        return {
            path: '/pre-match',
            qs: { q: JSON.stringify(qObj) },
        };
    }

    return { path: '/pre-match', qs: {} };
}

/**
 * Map a sportsbook internal route into a SPA-friendly path string.
 * Handles `/pre-match` with `q` payload, `/event-details` and `/results`.
 *
 * @param path - sportsbook internal path (e.g., '/pre-match', '/event-details')
 * @param qs - optional query object supplied by the sportsbook
 * @param _hashData - optional hash data (unused by this mapping)
 * @returns SPA path string to navigate to
 */
function mapSportPathToSpa(path: string, qs?: any, _hashData?: string): string {
    if (path === '/pre-match' && qs?.q) {
        let qObj = qs.q;
        if (typeof qObj === 'string') {
            try {
                qObj = JSON.parse(qObj);
            } catch {
                qObj = {};
            }
        }
        if (typeof qObj === 'object') {
            const sportId = Object.keys(qObj)[0];
            const countryIds = sportId ? Object.keys(qObj[sportId] ?? {}) : [];
            const countryId = countryIds[0];
            const champIds = countryId ? qObj[sportId][countryId] : [];
            const champId = Array.isArray(champIds) ? champIds[0] : undefined;

            let url = '';
            if (sportId) url += `/deportes/${sportId}`;
            if (countryId) url += `/pais/${countryId}`;
            if (champId) url += `/liga/${champId}`;

            function cleanRoute(path: string): string {
                const segments = path.split('/').filter((seg) => seg && seg !== 'undefined');
                // Always start with / if 'deportes' is present
                return segments.length ? '/' + segments.join('/') : '/deportes';
            }

            // limpiar undeinfeds de la url
            // url = url.replace(/undefined/g, '');

            return cleanRoute(url) || '/deportes';
        }
    }
    if (path === '/event-details' && qs) {
        const segments: string[] = [];
        if (qs.sport) segments.push(`deportes/${qs.sport}`);
        if (qs.country) segments.push(`pais/${qs.country}`);
        if (qs.champ) segments.push(`liga/${qs.champ}`);
        if (qs.event) segments.push(`partido/${qs.event}`);
        return segments.length ? `${segments.join('/')}` : '/deportes';
    }
    if (path === '/results' && qs?.eventId) {
        return `/deportes/resultados/${qs.eventId}`;
    }
    return '/deportes';
}

/**
 * Lifecycle: onMounted
 * - Ensures the external loader script is present.
 * - Boots the sportsbook when the loader is ready.
 * - Registers watchers to react to theme and token changes.
 */
onMounted(async () => {
    const host = digitainData.host;
    if (!host) {
        console.error('[Digitain] Missing host in config.');
        return;
    }

    // If already loaded, initialize immediately
    // if (window.SportFrame?.frame) {
    // this.initSportBook();
    // return;
    // }

    /**
     * Ensures a single script tag with `id` exists in the document body.
     * If the script exists, returns it; otherwise creates, appends and returns the new script element.
     *
     * @param id - element id to ensure
     * @param src - script source URL
     */
    const ensureOnce = (id, src) => {
        let s = document.getElementById(id) as HTMLScriptElement | null;
        if (s) return s;
        s = document.createElement('script') as HTMLScriptElement;
        s.id = id;
        s.src = src;
        document.body.appendChild(s);
        return s;
    };

    /**
     * Called when the external IntegrationLoader script is ready.
     * Boots the sportsbook and attaches a dispatcher to translate internal sportsbook navigation into SPA routes.
     */
    const onReady = async () => {
        await bootSportsbook(makeBootParams(), viewName.value);
        loading.value = false;

        // Escuchar cambios internos del Sportsbook (sincronizar con tu router)
        onSportDispatch((payload) => {
            if (payload?.type !== 3) return;
            const { path, qs, hashData, action } = payload.message ?? {};
            const spaUrl = mapSportPathToSpa(path, qs, hashData);

            // En Latino pueden mandarte action=REPLACE para evitar pasos extra en el historial:
            if (action === 'REPLACE') router.replace(spaUrl);
            else router.push(spaUrl);
        });
    };

    let srcJS = digitainData.srcJS;

    if (appComponent.altenar && appComponent.altenar !== '') {
        srcJS = appComponent.altenar;
    }

    if (!document.getElementById('DigitainLoaderFallback')) {
        const f = ensureOnce('DigitainLoaderFallback', srcJS);
        f.addEventListener('load', onReady, { once: true });
        f.addEventListener('error', (e) => console.error('[Digitain] Failed to load IntegrationLoader.js', e), {
            once: true,
        });
    } else {
        await onReady();
    }

    // Reaccionar al cambio de tema
    watch(
        () => appComponent.themeSportbook,
        (isDark) => {
            setProjectTheme(isDark ? 'alternative' : 'default');
        },
    );

    // Reboot tras login/logout (para inyectar nuevo token)
    watch(
        () => appComponent.tokenSB,
        async () => {
            await destroySportsbook();
            await bootSportsbook(makeBootParams(), viewName.value);
        },
    );
});

/**
 * Lifecycle: onUnmounted
 * - Ensures the sportsbook is destroyed when the component unmounts.
 */
onUnmounted(() => {
    void destroySportsbook();
});
</script>

<template>
    <!-- Main section for displaying the sportsbook if contingencySportbook is enabled -->
    <section
        v-if="appComponent.contingencySportbook"
        class="flex justify-center items-center"
    >
        <div class="h-full w-full">
            <!-- Inner section for layout and styling -->
            <section class="w-full h-full relative flex justify-center items-center py-16">
                <div class="grid grid-cols-1 sm:grid-cols-2 z-20 justify-items-center items-center gap-20 sm:gap-0">
                    <div class="flex flex-col gap-8 justify-center items-center">
                        <!-- Main heading for the casino promotion -->
                        <h2
                            class="font-bold font-poppinsm text-[2.5rem] text-primary text-center w-full sm:w-[56%] leading-10"
                        >
                            {{ $t(' Prueba tu suerte en nuestro casino') }}
                        </h2>
                        <div class="flex flex-col justify-center items-center gap-5">
                            <!-- Promotional text about the sportsbook -->
                            <p class="text-xl w-[90%] text-center font-poppinssl">
                                {{ $t('Mientras el') }}
                                <span class="font-bold">
                                    {{ $t('sportbook') }}
                                </span>
                                {{ $t('se prepara') }}
                                <span class="font-bold">
                                    {{ $t('para ti.') }}
                                </span>
                            </p>
                            <p class="text-2xl font-poppinssl">
                                {{ $t('¡La ') }}
                                <span class="font-bold">
                                    {{ $t('emoción') }}
                                </span>
                                {{ $t('no se detiene!') }}
                            </p>
                        </div>
                        <!-- Call to action for spinning and winning -->
                        <p class="bg-primary/80 saturate-150 px-16 sm:px-10 py-1 font-poppinssl">
                            {{ $t('¡GIRA APUESTA Y') }}
                            <span class="font-bold">
                                {{ $t('GANA AHORA!') }}
                            </span>
                        </p>
                        <!-- Conditional router link for the sportsbook button -->
                        <RouterLink
                            v-if="
                                appComponent.config.contingencySportbook !== undefined &&
                                appComponent.config.contingencySportbook.button !== undefined &&
                                appComponent.config.contingencySportbook.button.url != undefined &&
                                appComponent.config.contingencySportbook.button.text != undefined
                            "
                            :to="appComponent.config.contingencySportbook.button.url"
                            class="text-shadow-xl rounded-xl bg-success to-primary-content/60 text-neutral text-xl uppercase font-poppinsm p-4 hover:scale-105 transition-all z-50 ease-in-out shadow-[0px_3px_8px_-2px] shadow-base-content border-1 border-base-100"
                        >
                            {{ $t(appComponent.config.contingencySportbook.button.text) }}
                        </RouterLink>
                    </div>
                    <!-- Conditional image display for the sportsbook -->
                    <img
                        v-if="
                            appComponent.config.contingencySportbook !== undefined &&
                            appComponent.config.contingencySportbook.img !== undefined
                        "
                        :src="appComponent.config.contingencySportbook.img"
                        alt=""
                        class="object-contain"
                    />
                </div>
                <!-- Background image for the sportsbook -->
                <img
                    v-if="
                        appComponent.config.contingencySportbook !== undefined &&
                        appComponent.config.contingencySportbook.imgBackground !== undefined
                    "
                    :src="appComponent.config.contingencySportbook.imgBackground"
                    alt=""
                    class="absolute w-full h-full object-cover z-10"
                />
                <!-- Gradient overlay for the bottom of the section -->
                <div
                    class="w-full h-32 bg-gradient-to-t from-base-content to-transparent absolute z-10 -bottom-0"
                ></div>
            </section>
        </div>
    </section>
    <!-- Main loading screen displayed while data is being fetched -->
    <div
        v-if="sportBookStore.loading && !appComponent.contingencySportbook"
        class="flex w-full h-screen items-center"
        :style="{
            'background-color': backgroundColor,
        }"
    >
        <div class="flex-1"></div>
        <div class="flex flex-col w-12/12">
            <svg
                fill="none"
                class="w-12 h-12 animate-spin fill-primary stroke-2"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                />
            </svg>
            <!-- Placeholder for SVG content -->
        </div>
        <div class="flex-1"></div>
    </div>
    <!-- Main content section displayed when not loading -->
    <section
        v-show="!sportBookStore.loading && !appComponent.contingencySportbook"
        class="w-full py-2 pl-2 pr-2 text-white"
        :style="{
            'background-color': backgroundColor,
        }"
    >
        <div
            id="sport_div_iframe"
            class=""
        ></div>
        <!-- Container for the sports book -->
    </section>
</template>

<style scoped></style>

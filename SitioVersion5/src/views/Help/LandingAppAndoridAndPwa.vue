<script setup lang="ts">
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store
import { onMounted, ref, watch } from 'vue'; // Importing Vue composition API functions
import { computed, onBeforeMount } from '@vue/runtime-dom'; // Importing additional Vue functions

const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store

// Determining the APK URL based on the app configuration and country
const urlApk =
    appComponent.config.landing != undefined &&
    appComponent.config.landing.app !== undefined &&
    appComponent.config.landing.app.apk_url[appComponent['country']] != undefined
        ? appComponent.config.landing.app.apk_url[appComponent['country']]
        : appComponent.config.landing.app.apk_url;
const urlIos = computed(() => {
    const iosConfig = appComponent.config?.landing?.app?.ios_url;
    const country = appComponent.country;

    if (!iosConfig) return null;

    if (typeof iosConfig === 'object') {
        return iosConfig[country] ?? null;
    }
    return iosConfig;
});
const isPwa = ref(true); // Reactive reference to track if the app is a PWA
const isInstalled = ref(false); // Reactive reference to track if the app is installed
const installPromptEvent = ref(null); // Reactive reference to store the install prompt event
const browser = ref('Unknown'); // Reactive reference to store the browser type
const device = ref('Unknown'); // Reactive reference to store the device type
const onChromeandWindows = ref(false); // Reactive reference for Chrome on Windows
const onAppleSafari = ref(false); // Reactive reference for Safari on Apple devices
const onAppleChrome = ref(false); // Reactive reference for Chrome on Apple devices
const defaultButtonPwa = 'https://images.virtualsoft.tech/m/msj19212T1736985621.png'; // Default PWA button image URL
const defaultButtonAndroid = 'https://images.virtualsoft.tech/m/msj19212T1737036326.png'; // Default Android button image URL
const defaultButtonIOS = 'https://images.virtualsoft.tech/m/msj0212T1773085882.png';

const iosButtonImage = computed(() => {
    return (
        appComponent.config?.landing?.app?.assets?.buttonsIOS?.iPhone ||
        defaultButtonIOS
    );
});

const hasIosUrl = computed(() => !!urlIos.value);

const downloadIOS = () => {
    if (!urlIos) return;

    if (
        appComponent.config != undefined &&
        appComponent.config.partner != undefined &&
        appComponent.config.partner != '8'
    ) {
        window.location.href = urlIos.value;
    } else {
        appComponent.gAnalytics('descarga_app_ios');
        window.location.href = urlIos.value;
    }
};

// Function to handle PWA download
const downloadPwa = () => {
    isPwa.value = true; // Set PWA state to true
    // Check for specific browser and device combinations
    if (browser.value === 'Chrome' && device.value === 'Windows') {
        onChromeandWindows.value = true; // Set flag for Chrome on Windows
        return;
    } else if (device.value === 'iPhone' || device.value === 'Mac') {
        if (browser.value === 'Safari') {
            onAppleSafari.value = true; // Set flag for Safari on Apple
        } else if (browser.value === 'Chrome') {
            onAppleChrome.value = true; // Set flag for Chrome on Apple
        }
    } else if (device.value === 'Android' && browser.value === 'Chrome') {
        onChromeandWindows.value = true; // Set flag for Chrome on Android
    }
    // Prompt for installation if the event is available
    if (installPromptEvent.value) {
        installPromptEvent.value.prompt(); // Show the install prompt
        installPromptEvent.value.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó la instalación'); // Log acceptance
            } else {
                console.log('Usuario canceló la instalación'); // Log cancellation
            }
            installPromptEvent.value = null; // Reset the install prompt event
        });
    }
};

// Function to handle Android app download
const downloadAndroid = () => {
    isPwa.value = false; // Set PWA state to false
    if (device.value === 'Android' && browser.value === 'Chrome') {
        onChromeandWindows.value = false; // Reset flag for Chrome on Android
    }
    // Check app configuration for partner and redirect accordingly
    if (
        appComponent.config != undefined &&
        appComponent.config.partner != undefined &&
        appComponent.config.partner != '8'
    ) {
        window.location.assign(urlApk); // Redirect to APK URL
    } else {
        appComponent.gAnalytics('descarga_app'); // Track download event
        window.location.assign(urlApk); // Redirect to APK URL
    }
};

// Function to determine the browser type
const getBrowser = () => {
    let navAgent = navigator.userAgent; // Get the user agent string
    if (navAgent.includes('Chrome')) return 'Chrome'; // Check for Chrome
    if (navAgent.includes('Safari') && !navAgent.includes('Chrome')) return 'Safari'; // Check for Safari
    if (navAgent.includes('Firefox')) return 'Firefox'; // Check for Firefox
    return 'Unknown'; // Default to unknown
};

// Function to determine the device type
const getDevice = () => {
    let devAgent = navigator.userAgent; // Get the user agent string
    if (/Android/.test(devAgent)) return 'Android'; // Check for Android
    if (/Windows/.test(devAgent)) return 'Windows'; // Check for Windows
    if (/iPhone|iPad|iPod/.test(devAgent)) return 'iPhone'; // Check for iOS devices
    if (/Macintosh|Mac OS X|MacIntel|MacPPC|Mac68K/.test(devAgent)) return 'Mac'; // Check for Mac
};

// Computed property for PWA button image
const pwaButtonImage = computed(() => {
    let key = ''; // Initialize key for button image
    // Determine key based on device and browser
    if (device.value === 'iPhone' || device.value === 'Mac') {
        if (browser.value === 'Safari') {
            key = 'Safari_' + device.value; // Set key for Safari on Apple
        } else if (browser.value === 'Chrome') {
            key = 'Chrome_' + device.value; // Set key for Chrome on Apple
        }
    } else if (device.value === 'Windows' && browser.value === 'Chrome') {
        key = 'Chrome_Windows'; // Set key for Chrome on Windows
    } else if (device.value === 'Android' && browser.value === 'Chrome') {
        key = 'Chrome_Android'; // Set key for Chrome on Android
    }
    // Return the appropriate button image or default
    return (
        (appComponent.config.landing &&
            appComponent.config.landing.app &&
            appComponent.config.landing.app.assets &&
            appComponent.config.landing.app.assets.buttonsPWA &&
            appComponent.config.landing.app.assets.buttonsPWA[key]) ||
        defaultButtonPwa
    );
});

// Computed property for Android button image
const androidButtonImage = computed(() => {
    let key = ''; // Initialize key for button image
    if (device.value === 'Android') {
        key = 'Chrome_Android'; // Set key for Android
    }
    // Return the appropriate button image or default
    return (
        (appComponent.config.landing &&
            appComponent.config.landing.app &&
            appComponent.config.landing.app.assets &&
            appComponent.config.landing.app.assets[key]) ||
        defaultButtonAndroid
    );
});

// Lifecycle hook to run on component mount
onMounted(() => {
    browser.value = getBrowser(); // Set the browser type
    device.value = getDevice(); // Set the device type
});

// Lifecycle hook to run before component mount
onBeforeMount(() => {
    isInstalled.value = window.matchMedia('(display-mode: standalone)').matches; // Check if installed as PWA
    window.addEventListener('appinstalled', () => {
        isInstalled.value = true; // Update installed state on app installed event
    });
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); // Prevent default install prompt
        installPromptEvent.value = event; // Store the install prompt event
    });
});
</script>

<template>
    <!-- Main container for the app download section -->
    <div class="relative w-full h-auto flex flex-col justify-center items-center">
        <!-- Background image for the app section -->
        <img
            class="absolute w-full h-full object-cover"
            :src="appComponent.config.landing.app.assets.bg"
            alt="background"
        />
        <!-- Section for app description and download buttons -->
        <section class="w-full h-auto sm:h-[859.92px] grid grid-cols-1 sm:grid-cols-2 pt-8 relative">
            <div class="h-full w-full flex flex-col justify-start items-start gap-1 sm:gap-12 relative ml-0 sm:ml-6">
                <!-- Article containing the main app description -->
                <article
                    class="w-[95%] sm:w-[80%] h-[10%] sm:h-[25%] mt-5 flex flex-col justify-center gap-8 ml-6 sm:ml-0"
                >
                    <p class="h-[33%] w-full text-[2.5rem] sm:text-[3rem] text-neutral font-poppinssl font-bold">
                        {{ $t('La ') }}
                        <span class="text-primary font-poppinssl">
                            {{ $t('App') }}
                        </span>
                        {{ $t('que') }}
                    </p>
                    <p
                        class="h-[33%] w-full text-[2.5rem] sm:text-[3rem] text-center text-neutral font-poppinssl font-bold"
                    >
                        <span class="font-poppinssl font-bold text-primary">
                          {{$t('Cambiará ')}}
                        </span>
                        {{ $t('tu Forma') }}
                    </p>
                    <p class="h-[33%] w-full text-[2.5rem] sm:text-[3rem] text-neutral font-poppinssl font-bold">
                        {{ $t('de ') }}
                        <span class="font-poppinssl font-bold text-primary">
                            {{ $t('Jugar') }}
                        </span>
                    </p>
                </article>
                <!-- Conditional rendering of mobile mockup image -->
                <div
                    v-if="
                        appComponent.config.landing != undefined &&
                        appComponent.config.landing.app != undefined &&
                        appComponent.config.landing.app.assets != undefined &&
                        appComponent.config.landing.app.assets.fiveMobile != undefined
                    "
                    class="w-full h-auto flex justify-center items-center sm:hidden block"
                >
                    <img
                        :src="appComponent.config.landing.app.assets.fiveMobile"
                        class="object-contain"
                        alt="mock up"
                    />
                </div>
                <!-- Article containing additional app features -->
                <article class="h-[29%] sm:h-[40%] w-[90%] sm:w-full flex flex-col gap-10 mx-6 sm:mx-0">
                    <p class="h-auto w-full text-base sm:text-2xl text-neutral text-justify font-poppinssl">
                        {{ $t('¡Lleva la emoción del ') }}
                        <span class="font-bold font-poppinssl text-neutral">
                            {{ $t('casino online ') }}
                        </span>
                        {{ $t('a tu') }}
                        <span class="font-normal sm:font-bold font-poppinssl text-neutral">
                            {{ $t('dispositivo favorito! Descarga nuestra app ') }}
                        </span>
                        {{ $t('y') }}
                        <span class="font-normal sm:font-bold font-poppinssl text-neutral">
                            {{ $t('disfruta ') }}
                        </span>
                        {{
                            $t(
                                'de ligas exclusivas, torneos emocionantes, tragamonedas, Live Casino y mucho más. Todo el entretenimiento que buscas, a',
                            )
                        }}
                        <span class="font-bold text-primary font-poppinssl">
                            {{ $t('solo un clic.') }}
                        </span>
                    </p>
                    <ul class="w-full h-auto list-disc text-base sm:text-2xl text-neutral ml-5 sm:ml-10">
                        <li class="font-poppinssl text-neutral">
                            {{ $t('Un') }}
                            <span class="font-bold text-primary font-poppinssl">
                                {{ $t('diseño fluido') }}
                            </span>
                            {{ $t('para navegar por nuestros juegos.') }}
                        </li>
                        <li class="font-poppinssl text-neutral">
                            <span class="font-bold font-poppinssl text-primary">
                                {{ $t('Tiempos cortos de espera') }}
                            </span>
                            {{ $t('entre cada acción') }}
                        </li>
                        <li class="font-poppinssl text-neutral">
                            {{ $t('Puede seguir') }}
                            <span class="font-bold font-poppinssl text-primary">
                                {{ $t('en vivo los puntajes de cada partido') }}
                            </span>
                        </li>
                        <li class="font-poppinssl text-neutral">
                            {{ $t('Con mucha frecuencia ofrecemos') }}
                            <span class="font-poppinssl font-bold text-primary">
                                {{ $t(' ofertas exclusivas') }}
                            </span>
                            {{ $t('por la App') }}
                        </li>
                        <li class="font-poppinssl text-neutral">
                            {{ $t('Puede realizar ') }}
                            <span class="font-poppinssl font-bold text-primary">
                                {{ $t('depósitos y retiros ') }}
                            </span>
                            {{ $t('con') }}
                            <span class="font-poppinssl font-bold text-primary">
                                {{ $t('mucha más facilidad. ') }}
                            </span>
                        </li>
                    </ul>
                </article>
                <!-- Article for download call to action -->
                <article
                    class="mt-6 sm:mt-0 w-[90%] sm:w-[85%] h-[15%] sm:h-[30%] flex flex-col justify-start items-center sm:items-start gap-4 sm:gap-[5rem]"
                >
                    <p class="text-2xl sm:text-[3.8rem] text-neutral font-bold font-poppinssl">
                        {{ $t('¡Descargala ya!') }}
                    </p>
                    <div
                        :class="
                            device === 'iPhone'
                                ? 'justify-center items-center w-[50%]'
                                : 'gap-[3rem] sm:gap-[6rem] w-full'
                        "
                        class="h-auto flex"
                    >
                        <!-- Button for PWA download -->
                        <button
                            v-if="
                                device === 'Windows' || device === 'Android' || (device === 'Mac' || device === 'iPhone' && !hasIosUrl)
                            "
                            @click="downloadPwa()"
                            class="w-[233px] sm:w-[212px] h-[80px] sm:h-[102px] rounded-lg flex justify-center items-center hover:scale-105 transition-all ease-in-out"
                            :class="!isPwa ? 'opacity-40 hover:opacity-100' : ''"
                        >
                            <img
                                :src="pwaButtonImage"
                                class="w-[233px] sm:w-[240px] h-[80px] sm:h-[124px]"
                            />
                        </button>
                        <!-- Button for Android download -->
                        <button
                            v-if="device === 'Android'"
                            @click="downloadAndroid()"
                            class="w-[233px] sm:w-[212px] h-[80px] sm:h-[102px] rounded-lg flex justify-center items-center hover:scale-105 transition-all ease-in-out"
                            :class="isPwa ? 'opacity-40 hover:opacity-100' : ''"
                        >
                            <img
                                :src="androidButtonImage"
                                class="w-[233px] sm:w-[212px] h-[80px] sm:h-[102px]"
                            />
                        </button>

                        <button
                            v-if="(device === 'iPhone' || device === 'Mac') && hasIosUrl"
                            @click="downloadIOS()"
                            class="w-[233px] sm:w-[212px] h-[80px] sm:h-[102px] rounded-lg flex justify-center items-center hover:scale-105 transition-all ease-in-out"
                        >
                            <img
                                :src="iosButtonImage"
                                class="w-[233px] sm:w-[212px] h-[80px] sm:h-[102px]"
                            />
                        </button>
                    </div>
                </article>
            </div>
            <!-- Conditional rendering of desktop mockup image -->
            <div class="flex justify-end items-start hidden sm:block">
                <img
                    v-if="
                        appComponent.config.landing != undefined &&
                        appComponent.config.landing.app != undefined &&
                        appComponent.config.landing.app.assets != undefined &&
                        appComponent.config.landing.app.assets.five != undefined
                    "
                    :src="appComponent.config.landing.app.assets.five"
                    class="w-[602px] h-[805px] object-contain animated-image hidden md:block absolute -top-16 right-0"
                    alt="mock up"
                />
            </div>
        </section>
        <!-- Section for installation instructions on Chrome and Windows -->
        <section
            v-if="onChromeandWindows || onAppleChrome"
            class="relative w-[90%] sm:w-full h-[410px] sm:h-[237px] flex flex-col justify-start items-center sm:items-start gap-3 sm:gap-8"
        >
            <p class="text-primary text-xl text-justify ml-0 sm:ml-6">
                {{ $t('Sigue estos pasos para instalar la app fácilmente') }}
            </p>
            <article
                class="h-[60%] sm:h-[144px] w-full sm:w-[96%] mx-0 sm:mx-8 flex justify-start items-center sm:items-start sm:flex-nowrap flex-wrap gap-y-7 sm:gap-y-0 gap-x-2 sm:gap-x-16"
            >
                <!-- Step 1 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-1 sm:gap-4 justify-center items-center w-[20%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem]">
                            {{ $t('1') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-xs sm:text-lg">
                            {{ $t('Toca el icono de instalación (') }}
                            <svg class="inline-flex" width='20' height='14' viewBox='0 0 20 14' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='4' y='12.6667' width='9.55552' height='1.33333' fill='currentColor'/><path fill-rule='evenodd' clip-rule='evenodd' d='M1.55555 11.1112V1.55567H15.1113V0.00012207H0.444443C0.198984 0.00012207 0 0.199106 0 0.444565V12.2223C0 12.4678 0.198984 12.6667 0.444443 12.6667H17.1111C17.3565 12.6667 17.5555 12.4678 17.5555 12.2223V7.33343H15.9999V11.1112H1.55555Z' fill='currentColor'/><path d='M18.8884 3.8889L16.6662 6L14.444 3.8889M16.6662 5.64388L16.6662 0.444463' stroke='currentColor' stroke-width='0.888886' stroke-miterlimit='10' stroke-linecap='square'/></svg>
                            {{ $t(')') }}
                            {{ $t('que aparece en la parte ') }}
                            <span class="font-bold">{{ $t('superior de la pantalla.') }}</span>
                        </p>
                    </div>
                </div>
                <!-- Step 2 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[25%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem] text-center">
                            {{ $t('2') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('En la ventana emergente, selecciona ') }}
                            <span class="font-bold">
                                {{ $t('"Instalar" ') }}
                            </span>
                            {{ $t('para agregar la aplicacion a tu dispositivo.') }}
                        </p>
                    </div>
                </div>
            </article>
        </section>
        <!-- Section for installation instructions on Apple Safari -->
        <section
            v-if="onAppleSafari"
            class="mt-6 relative w-[90%] sm:w-full h-[410px] sm:h-[237px] flex flex-col justify-start items-center sm:items-start gap-3 sm:gap-8"
        >
            <p class="text-primary text-xl text-justify ml-0 sm:ml-6 mb-6">
                {{ $t('Sigue estos pasos para instalar la app fácilmente') }}
            </p>
            <article
                class="h-[60%] sm:h-[144px] w-full sm:w-[96%] mx-0 sm:mx-8 flex justify-start items-center sm:items-start sm:flex-nowrap flex-wrap gap-y-7 sm:gap-y-0 gap-x-2 sm:gap-x-16"
            >
                <!-- Step 1 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-1 sm:gap-4 justify-center items-center w-[20%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem]">
                            {{ $t('1') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-xs sm:text-lg">
                            {{ $t('Toca el ícono de ') }}
                            <span class="font-bold">{{ $t('"Compartir"') }}</span>
                            {{ $t('(') }}
                            <svg width='15' height='19' viewBox='0 0 15 19' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M4.04518 4.9823H1.58227C0.708407 4.9823 0 5.69071 0 6.56457V17.2185C0 18.0924 0.708406 18.8008 1.58227 18.8008H13.1856C14.0595 18.8008 14.7679 18.0924 14.7679 17.2185V6.56457C14.7679 5.69071 14.0595 4.9823 13.1856 4.9823H10.787V6.24812H13.1856C13.3604 6.24812 13.5021 6.3898 13.5021 6.56457V17.2185C13.5021 17.3933 13.3604 17.535 13.1856 17.535H1.58227C1.4075 17.535 1.26582 17.3933 1.26582 17.2185V6.56457C1.26582 6.3898 1.4075 6.24812 1.58227 6.24812H4.04518V4.9823Z' fill='currentColor'/><path d='M7.82826 0.632935V12.0521V0.632935ZM7.82826 0.632935L11.6564 3.20627L7.82826 0.632935ZM7.82826 0.632935L4.00012 3.20627L7.82826 0.632935Z' fill='currentColor'/><path d='M7.82826 0.632935V12.0521M7.82826 0.632935L11.6564 3.20627M7.82826 0.632935L4.00012 3.20627' stroke='currentColor' stroke-width='1.26582' stroke-linecap='round' stroke-linejoin='round' class="inline-flex"/></svg>

                            {{ $t(')') }}
                        </p>
                    </div>
                </div>
                <!-- Step 2 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[25%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem] text-center">
                            {{ $t('2') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('Desplázate por las opciones y selecciona ') }}
                            <span class="font-bold">
                                {{ $t('"Agregar al dock".') }}
                            </span>
                        </p>
                    </div>
                </div>
                <!-- Step 3 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[25%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem] text-center">
                            {{ $t('3') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('Aparecerá una ventana con el nombre y la URL del sitio web. ') }}
                            <br />
                            {{ $t('Toca ') }}
                            <span class="font-bold">
                                {{ $t('"Agregar" ') }}
                            </span>
                            {{ $t('y listo.') }}
                        </p>
                    </div>
                </div>
            </article>
        </section>
        <!-- Section for installation instructions when not a PWA -->
        <section
            v-if="!isPwa"
            class="mt-6 relative w-[90%] sm:w-full h-[410px] sm:h-[237px] flex flex-col justify-start items-center sm:items-start gap-3 sm:gap-8"
        >
            <p class="text-primary text-xl text-justify ml-0 sm:ml-6 mb-6">
                {{ $t('Sigue estos pasos para instalar la app fácilmente') }}
            </p>
            <article
                class="h-[60%] sm:h-[144px] w-full sm:w-[96%] mx-0 sm:mx-8 flex justify-start items-center sm:items-start sm:flex-nowrap flex-wrap gap-y-7 sm:gap-y-0 gap-x-2 sm:gap-x-16"
            >
                <!-- Step 1 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-1 sm:gap-4 justify-center items-center w-[20%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem]">
                            {{ $t('1') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center">
                        <p class="text-neutral font-poppinssl text-xs sm:text-lg">
                            {{ $t('Busca') }}
                            <span class="font-bold">
                                {{ $t('"Ajustes"') }}
                            </span>
                            {{ $t('en tu dispositivo y selecciona la opción') }}
                            <span class="font-bold">
                                {{ $t('“Seguridad”.') }}
                            </span>
                            {{ $t('Habilita') }}
                            <span class="font-bold">
                                {{ $t('“Fuentes Desconocidas”') }}
                            </span>
                            {{ $t('para ') }}
                            <span class="font-bold">
                                {{ $t('permitir la instalación*.') }}
                            </span>
                        </p>
                    </div>
                </div>
                <!-- Step 2 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[25%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem] text-center">
                            {{ $t('2') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center sm:items-start pt-0 sm:pt-2">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('Haz clic en el') }}
                            <span class="font-bold">
                                {{ $t('botón descargar') }}
                            </span>
                            {{ $t('para bajar la aplicación.') }}
                        </p>
                    </div>
                </div>
                <!-- Step 3 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[25%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem] text-center">
                            {{ $t('3') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center sm:items-start pt-0 sm:pt-2">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('Abre la carpeta de') }}
                            <span class="font-bold">
                                {{ $t('“Descargas”') }}
                            </span>
                            {{ $t('selecciona la aplicación (carpeta de la aplicación).') }}
                        </p>
                    </div>
                </div>
                <!-- Step 4 for installation -->
                <div
                    class="h-[50%] sm:h-full w-[48%] sm:w-[25%] border-1 sm:border-0 hover:border-1 border-neutral/50 rounded-lg bg-neutral-content/30 relative flex justify-start items-center gap-2 after:content-[''] after:absolute after:h-[10rem] after:w-[3rem] after:bg-neutral/20 after:opacity-40 after:-top-7 after:right-[4rem] after:rounded-t-[50%] after:rotate-[60deg] after:rounded-b-[30%] after:opacity-40 after:shadow-[2px_2px_10px_10px] after:shadow-neutral/20"
                >
                    <div class="flex gap-2 sm:gap-4 justify-center items-center w-[20%] h-full">
                        <p class="text-primary text-[3.5rem] sm:text-[5rem]">
                            {{ $t('4') }}
                        </p>
                        <div class="h-[80%] w-[1px] bg-gradient-to-t from-neutral/20 via-neutral to-neutral/20" />
                    </div>
                    <div class="w-[80%] h-full flex justify-center items-center sm:items-start pt-0 sm:pt-2">
                        <p class="text-neutral font-poppinssl text-sm sm:text-lg">
                            {{ $t('El ícono de la aplicación de') }}
                            <span class="font-bold">
                                {{ $t('doradobet.com será agregada a tu pantalla de inicio') }}
                            </span>
                            {{ $t('y') }}
                            <span class="font-bold text-primary">
                                {{ $t('¡estarás listo para jugar!') }}
                            </span>
                        </p>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>

<!-- FILE DOCUMENTED -->

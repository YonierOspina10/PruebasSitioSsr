<script lang="ts">
import { defineComponent } from 'vue';
import { useSportBookStore } from '@/stores/sportbook';
import IconClose from '@/components/icons/IconClose.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import DoorOut from '@/components/icons/DoorOut.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useGlobalStore } from '@/stores/global';
import Notification from '@/components/Notification.vue';
import ClockUser from '@/components/ClockUser.vue';
import ChangeLanguage from '@/components/ChangeLanguage.vue';
import { isTemplateExpression } from 'typescript';
import { watch } from 'vue';
import apiService from '@/services/ApiService'; // Importing API service for making requests

/**
 * Vue component definition for the main application interface.
 */
export default defineComponent({
    components: {
        ClockUser,
        Notification, // Notification component for alerts and messages
        SwiperSlide, // Swiper slide component for carousel functionality
        Swiper, // Swiper component for carousel functionality
        DoorOut, // Icon component for logout or exit action
        IconClose, // Icon component for closing actions
        CopyIcon, // Icon component for copy actions
        SettingsIcon, // Icon component for settings actions
        ChangeLanguage, // Component for changing language
    },

    /**
     * Setup function for the component, initializes reactive state.
     */
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation], // Swiper modules for functionality
        };
    },

    /**
     * Data function for the component, initializes reactive properties.
     */
    data() {
        let config = this.$config(); // Application configuration
        let zendesk: any = this.$zendesk; // Zendesk integration object
        let appComponent: any = this.$appComponent; // Reference to the app component
        let sportBookStore = useSportBookStore(); // State management for sports book
        let globalStore = useGlobalStore(); // Global state management
        let onTitles: boolean = false; // Flag for title visibility
        let openSelectLang = false; // Flag for language selection visibility
        let p: HTMLElement | null = null; // Reference to a DOM element
        let copy: boolean = false; // Flag for copy action status
        let onSaldo = false; // State variable for balance visibility
        let onViewBalance = false; // State variable for view balance
        let ligthMode = false; // State for dark mode
        let moonIcon = ''; // Icon for moon
        let sunIcon = ''; // Icon for sun
        return {
            config,
            zendesk,
            appComponent,
            sportBookStore,
            globalStore,
            onTitles,
            openSelectLang,
            copy,
            p,
            onSaldo,
            ligthMode,
            moonIcon,
            sunIcon,
            onViewBalance
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {
        this.clickD(); // Initialize click event listener
        this.localStorageC = localStorage.getItem('changeThemeColor');

    console.log(this.localStorageC);
    if (this.localStorageC == 'true') {
        // 🌞 MODO CLARO
        this.ligthMode = true;
        this.sunIcon  = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'; // sol marcado
        this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'; // luna normal

        this.appComponent.themeSportbook = true;
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config.theme_colors_ligth_desktop != undefined
        ) {
            let deviceTheme = this.appComponent.config.mobileL == ''
                ? 'theme_colors_ligth_desktop'
                : 'theme_colors_ligth_mobile';
            this.setThemeColor(deviceTheme);
            this.appComponent.gAnalytics('change_theme_color_ligth');
        }
    } else {
        // 🌙 MODO OSCURO
        this.ligthMode = false;
        this.sunIcon  = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'; // sol normal
        this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'; // luna marcada

        this.appComponent.themeSportbook = false;
        let deviceTheme = this.appComponent.config.mobileL == ''
            ? 'theme_colors_desktop'
            : 'theme_colors_mobile';
        this.setThemeColor(deviceTheme);
        this.appComponent.gAnalytics('change_theme_color_dark');
    }
    },

    methods: {
        /**
         * Toggles between light mode and dark mode.
         * @function
         */
        changeLigthMode() {
            /**
             * Indicates whether the application is in light mode.
             * @type {boolean}
             */
            this.ligthMode = !this.ligthMode;

            if (this.ligthMode) {
                /**
                 * URL of the sun icon when light mode is active.
                 * @type {string}
                 */
                this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png';

                /**
                 * URL of the moon icon when light mode is active.
                 * @type {string}
                 */
                this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png';

                localStorage.setItem('changeThemeColor', 'true');

                /**
                 * Represents whether the application uses the sportsbook theme.
                 * @type {boolean}
                 */
                this.appComponent.themeSportbook = true;

                if (this.appComponent.session.logueado) {
                    /**
                     * Saves the selected theme on the backend when the user is logged in.
                     */
                    apiService.request('save_theme_color', { choicedTheme: '1' });
                }

                /**
                 * Chooses the correct theme configuration depending on device type.
                 * @type {string}
                 */
                let deviceTheme = this.appComponent.config.mobileL == ''
                    ? 'theme_colors_ligth_desktop'
                    : 'theme_colors_ligth_mobile';

                this.setThemeColor(deviceTheme);

                /**
                 * Tracks the theme change event with Google Analytics.
                 */
                this.appComponent.gAnalytics('change_theme_color_ligth');
            } else {
                this.sunIcon  = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png';
                this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png';

                localStorage.setItem('changeThemeColor', 'false');
                this.appComponent.themeSportbook = false;

                if (this.appComponent.session.logueado) {
                    apiService.request('save_theme_color', { choicedTheme: '2' });
                }

                let deviceTheme = this.appComponent.config.mobileL == ''
                    ? 'theme_colors_desktop'
                    : 'theme_colors_mobile';

                this.setThemeColor(deviceTheme);
                this.appComponent.gAnalytics('change_theme_color_dark');
            }
        },
        setThemeColor(device) {
            let rootTailwind = document.createElement('style'); // Create a style element for Tailwind CSS variables
            rootTailwind.textContent = `
    	        :root {
				--pf: ${this.hexToHsl(this.appComponent.config[device].primary_focus)} !important;
				--sf: ${this.hexToHsl(this.appComponent.config[device].secondary_focus)} !important;
				--af: ${this.hexToHsl(this.appComponent.config[device].accent_focus)} !important;
				--su: ${this.hexToHsl(this.appComponent.config[device].success)} !important;
				--in: ${this.hexToHsl(this.appComponent.config[device].info)} !important;
				--wa: ${this.hexToHsl(this.appComponent.config[device].warning)} !important;
				--er: ${this.hexToHsl(this.appComponent.config[device].error)} !important;
				--p: ${this.hexToHsl(this.appComponent.config[device].primary)} !important;
				--pc: ${this.hexToHsl(this.appComponent.config[device].primary_content)} !important;
				--s: ${this.hexToHsl(this.appComponent.config[device].secondary)} !important;
				--sc: ${this.hexToHsl(this.appComponent.config[device].secondary_content)} !important;
				--a: ${this.hexToHsl(this.appComponent.config[device].accent)} !important;
				--ac: ${this.hexToHsl(this.appComponent.config[device].accent_content)} !important;
				--n: ${this.hexToHsl(this.appComponent.config[device].neutral)} !important;
				--nf: ${this.hexToHsl(this.appComponent.config[device].neutral_focus)} !important;
				--nc: ${this.hexToHsl(this.appComponent.config[device].neutral_content)} !important;
				--b1: ${this.hexToHsl(this.appComponent.config[device].base_100)} !important;
				--b2: ${this.hexToHsl(this.appComponent.config[device].base_200)} !important;
				--b3: ${this.hexToHsl(this.appComponent.config[device].base_300)} !important;
				--b4: ${this.hexToHsl(this.appComponent.config[device].base_400)} !important;
				--bc: ${this.hexToHsl(this.appComponent.config[device].base_content)} !important;
				--nt: ${this.hexToHsl(this.appComponent.config[device].neutral_text)} !important;
				--it: ${this.hexToHsl(this.appComponent.config[device].info_text)} !important;
				--sb: ${this.hexToHsl(this.appComponent.config[device].sportbook_color)} !important;
				--ic: ${this.hexToHsl(this.appComponent.config[device].input_border)} !important;
				--ip: ${this.hexToHsl(this.appComponent.config[device].input_placeholder)} !important;
				--ib: ${this.hexToHsl(this.appComponent.config[device].input_background)} !important;
                    }
                  [data-theme="main"] .swiper-button-prev,
                  [data-theme="main"] .swiper-button-next,
                  [data-theme="main"] .swiper-button-prev::after,
                  [data-theme="main"] .swiper-button-next::after {
                    color: ${this.appComponent.config[device].primary};
                  }
            `;

            try {
                document.body.appendChild(rootTailwind); // Append the style element to the body
            } catch (e) {
                console.log(e); // Log any errors during appending
            }
        },
        hexToHsl(H) {
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
        },
        onUserBalance() {
            // Method to toggle user balance visibility
            const params = {
                source: 'user_balances',
                subscribe: true,
                what: { profile: [] },
            };
            if (!this.onSaldo) {
                this.appComponent.refreshBalance2(); // Refresh balance if not already toggled
            }
            this.onSaldo = !this.onSaldo; // Toggle onSaldo state
        },
        onRefreshBalance2() {
            // Method to refresh balance and set view balance state
            const params = {
                source: 'user_balances',
                subscribe: true,
                what: { profile: [] },
            };
            this.appComponent.refreshBalance3(); // Call refresh balance method
            setTimeout(() => {
                this.onViewBalance = true; // Set view balance state after 5 seconds
            }, 5000);
        },
        /**
         * Sets up a click event listener to close the menu when clicking outside.
         */
        clickD() {
            document.addEventListener('click', (e: any) => {
                if (e.target.offsetParent.matches('#menuMobile') || e.target.matches('#openMenu')) {
                    // Do nothing if clicking on the mobile menu or open menu button
                }
            });
        },

        /**
         * Opens the main menu and sets the title visibility flag.
         */
        openMenu() {
            this.globalStore.onMenuMain = true; // Set global menu state to open
            this.onTitles = true; // Set title visibility to true
        },

        /**
         * Closes the main menu and hides titles.
         */
        closeMenu() {
            this.globalStore.onMenuMain = false; // Set global menu state to closed
            this.onTitles = false; // Set title visibility to false
            this.onSaldo = false; // Reset balance visibility
        },

        /**
         * Opens the sports book page based on the provided menu value.
         * @param value - The menu item containing URL and ID.
         */
        openSportBook(value) {
            if (value.MENU_URL === '/deportes' && value.MENU_ID === 'accion_envivo') {
                this.sportBookStore.page = 'live'; // Set sports book page to live
            }
        },

        /**
         * Opens the chat interface and manages visibility based on the app configuration.
         */
        onOpenChat() {
            this.closeMenu(); // Closing the menu when opening chat
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
                let ref_id: any = "cen_ifr_static"; // Reference ID for chat
                document
                    .getElementById("centribal_iframe_layout")
                    ?.classList.add("centribal_open"); // Showing chat iframe
                document
                    .getElementById("centribal_iframe_layout")
                    ?.classList.remove("centribal_hidden");
                postMessage("show_chat", "", ref_id); // Sending message to show chat
            }else{
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'open'); // Open Zendesk chat
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'show'); // Show Zendesk chat
            }
        },

        /**
         * Toggles the visibility of the service menu for mobile.
         * @param id - The identifier for the service menu.
         */
        menuService(id: any) {
            if ((document.getElementById('menuService-' + id) as any).style.display == 'block') {
                (document.getElementById('menuService-' + id) as any).style.display = 'none'; // Hide the service menu
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-secondary-focus'); // Remove focus class from title
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'rotate-180',
                ); // Remove rotation class from arrow
            } else {
                (document.getElementById('menuService-' + id) as any).style.display = 'block'; // Show the service menu
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-secondary-focus'); // Add focus class to title
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                    'rotate-180',
                ); // Add rotation class to arrow
            }
        },

        /**
         * Toggles the visibility of the service menu for desktop.
         * @param id - The identifier for the service menu.
         */
        menuServiceDesktop(id: any) {
            if ((document.getElementById('menuServiceD-' + id) as any).style.display == 'block') {
                (document.getElementById('menuServiceD-' + id) as any).style.display = 'none'; // Hide the desktop service menu
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-secondary-focus'); // Remove focus class from title
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'rotate-180',
                ); // Remove rotation class from arrow
            } else {
                (document.getElementById('menuServiceD-' + id) as any).style.display = 'block'; // Show the desktop service menu
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-secondary-focus'); // Add focus class to title
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                    'rotate-180',
                ); // Add rotation class to arrow
            }
        },

        /**
         * Copies the user ID to the clipboard.
         */
        copyID() {
            let text: any = document.getElementById('UID'); // Get the UID element
            navigator.clipboard.writeText(text.textContent); // Copy UID text to clipboard
            this.copy = true; // Set copy status to true
        },
        analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile8|layout:layout-${this.appComponent.config.layout}`,
            };
        },
    },
    computed: {
        FirstThreeMenu() {
            if (this.appComponent.session.logueado) {
                return this.config.MENU_USUARIO_LOGUEADO_MOBILE[this.appComponent.country].slice(0, 3); // Set menu for logged-in users
            } else {
                return this.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country].slice(0, 3); // Set menu for non-logged-in users
            }
        },
        customizedMenu() {
            if (this.appComponent.session.logueado) {
                return this.config.MENU_USUARIO_LOGUEADO_MOBILE[this.appComponent.country].slice(3); // Set menu for logged-in users
            } else {
                return this.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country].slice(3); // Set menu for non-logged-in users
            }
        },
    },

/**
 * Lifecycle hook executed before the component is mounted.
 * Sets up a watcher on `appComponent.session.theme_color_mode` to handle theme changes,
 * updates theme state, icons, localStorage, sportsbook theme, and triggers analytics events.
 * Also removes the global click event listener for dropdown handling.
 */
beforeMount() {
	/**
	 * Watches for changes in the `theme_color_mode` value of the session.
	 * @returns {number} The current theme mode (1 = light mode, other = dark mode).
	 */
	watch(
		() => this.appComponent.session.theme_color_mode,

		/**
		 * Callback triggered when the theme mode changes.
		 * Updates theme-related state, icons, localStorage, sportsbook theme, and analytics.
		 *
		 * @param {number} newValue - The new theme mode value.
		 * @param {number} oldValue - The previous theme mode value.
		 */
		(newValue, oldValue) => {
			console.log(`theme_color_mode changed from ${oldValue} to ${newValue}`);

			if (newValue === 1) {
				/** Indicates light mode is active. */
				this.ligthMode = true;

				/** URL of the sun icon in light mode. */
				this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png';

				/** URL of the moon icon in light mode. */
				this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png';

				localStorage.setItem('changeThemeColor', 'true');

				/** Enables sportsbook theme in light mode. */
				this.appComponent.themeSportbook = true;

				/** Selects theme colors depending on device type. */
				let deviceTheme = this.appComponent.config.mobileL == ''
					? 'theme_colors_ligth_desktop'
					: 'theme_colors_ligth_mobile';

				this.setThemeColor(deviceTheme);

				/** Tracks light mode change event. */
				this.appComponent.gAnalytics('change_theme_color_ligth');
			} else {
				localStorage.setItem('changeThemeColor', 'false');

				/** Indicates dark mode is active. */
				this.ligthMode = false;

				/** URL of the sun icon in dark mode. */
				this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png';

				/** URL of the moon icon in dark mode. */
				this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png';

				/** Disables sportsbook theme in dark mode. */
				this.appComponent.themeSportbook = false;

				let deviceTheme = this.appComponent.config.mobileL == ''
					? 'theme_colors_desktop'
					: 'theme_colors_mobile';

				this.setThemeColor(deviceTheme);

				/** Tracks dark mode change event. */
				this.appComponent.gAnalytics('change_theme_color_dark');
			}
		},
	);

	/** Removes the global click event listener for dropdown handling. */
	document.removeEventListener('click', this.handleClickDropdown);
}
});
</script>
<template>
    <!-- Mobile menu container with fixed position and gradient background -->
    <aside
        id="menuMobile"
        class="menu_mobile fixed bg-base-200 w-full md:w-96 h-full z-[9999] top-0 transition-all flex flex-col justify-start overflow-y-auto px-1 menu_desktop"
        :style="[{ left: globalStore.onMenuMain ? '0' : '-100%' }]"
    >
        <article class="relative flex flex-col justify-center items-center pt-3">
            <!-- User account section, displayed if user is logged in and not in appPOS -->
            <!-- Link to loyalty management if user is logged in and loyalty is enabled -->
             <div class="place-self-end mr-[3rem]">
                 <label
                         v-if="
                             appComponent.config != undefined &&
                             appComponent.config.swichThemeMode != undefined &&
                             appComponent.config.swichThemeMode
                         "
                         class="swap text-9xl flex justify-center items-center relative lg:hidden"
                         >
                         <img
                             :src="
                                 !ligthMode
                                 ? 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'
                                 : 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                             "
                             alt=""
                         />
                         <!-- Hidden checkbox for the switch -->
                         <input
                             type="checkbox"
                             class="hidden"
                             v-bind="analyticsAttrs('menu:toggle-theme')"
                             @click="changeLigthMode()"
                         />
                         <!-- Images for the switch states -->
                         <img
                             :src="moonIcon"
                             alt=" "
                             class="absolute opacity-100"
                             :class="!ligthMode ? 'swap-off left-[3px]' : 'swap-on left-[0px]'"
                         />
                         <img
                             :src="sunIcon"
                             alt=" "
                             class="absolute opacity-100"
                             :class="ligthMode ? 'swap-on right-[3px]' : 'swap-off right-[0px]'"
                         />
                 </label>
                             <!-- Close menu button -->
                 <div
                     class="rounded-full border border-neutral bg-error absolute right-3 top-3 flex justify-end items-center gap-3 z-[110] hover:scale-105"
                 >
                     <button
                         @click="closeMenu()"
                         v-bind="analyticsAttrs('menu:toggle')"
                         aria-label="Cerrar menu"
                     >
                         <IconClose
                             :height="23"
                             :width="23"
                             :fill="'#ffffff'"
                             :fill2="'#ee3b3f'"
                         />
                     </button>
                 </div>
             </div>
            <div
                v-if="appComponent.session.logueado && !appComponent.appPOS"
                class="flex flex-col justify-center items-center"
            >
                <div class="flex items-center justify-center gap-2">
                    <RouterLink
                        v-if="appComponent.session.logueado && config.loyalty[appComponent.country]"
                        to="/gestion/mi_lealtad"
                        @click="closeMenu()"
                        class="h-12 relative hover:scale-105"
                    >
                        <img
                            src="https://images.virtualsoft.tech/m/msjT1683841601.png"
                            alt=""
                            class="w-24 mt-[2px]"
                        />
                        <div
                            class="absolute top-[11px] left-[34px] text-primary text-center font-bold text-base w-14"
                        >
                            <span class="text-sm">{{ appComponent.loyalty.points }}</span>
                        </div>
                    </RouterLink>
                    <ClockUser
                        v-if="
                            appComponent.session.logueado &&
                            appComponent.config.header_ != undefined &&
                            appComponent.config.header_['clock'] != undefined
                                ? appComponent.config.header_['clock']
                                : appComponent.config.header['clock'] !== undefined
                                ? appComponent.config.header['clock']
                                : false
                        "
                        class="block lg:hidden"
                    />
                </div>
                <!-- Link to account management -->
                <RouterLink
                    to="/gestion/gestion_cuenta"
                    @click="closeMenu()"
                >
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1683329139.png"
                        alt=""
                    />
                </RouterLink>
                <div
                    v-if="!appComponent.appPOS"
                    class="flex flex-col justify-center items-center gap-1"
                >
                    <p class="text-neutral text-xl w-60 text-center capitalize">
                        {{ appComponent.session.nombre }}
                    </p>
                    <!-- Display user ID if certain conditions are met -->
                    <p
                        v-if="
                            (appComponent.config != undefined &&
                                appComponent.config.newViewIdInMenu != undefined &&
                                !appComponent.config.newViewIdInMenu) ||
                            (appComponent.config != undefined && appComponent.config.newViewIdInMenu == undefined)
                        "
                        class="text-neutral text-sm w-40 text-center"
                    >
                        ID: {{ appComponent.session.usuario }}
                    </p>
                </div>
                <div
                    v-if="
                        (!appComponent.appPOS &&
                            appComponent.config != undefined &&
                            appComponent.config.newViewIdInMenu != undefined &&
                            !appComponent.config.newViewIdInMenu) ||
                        (appComponent.config != undefined && appComponent.config.newViewIdInMenu == undefined)
                    "
                    class="flex flex-col justify-center items-center"
                >
                    <p class="text-neutral text-sm">{{ $t('Saldo') }}</p>
                    <div class="h-10 flex justify-around items-center bg-base-200 rounded-full gap-4 p-1">
                        <!-- Link to deposit management -->
                        <RouterLink
                            to="/gestion/deposito"
                            class="flex justify-center items-center gap-2 hover:scale-105"
                            data-analytics-label="menu:deposit"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="closeMenu()"
                        >
                            <img
                                src="https://images.virtualsoft.tech/m/msjT1682370645.png"
                                alt=""
                            />
                            <span class="saldo text-white text-base mr-2"
                                >{{ appComponent.session.moneda }}
                                {{ Math.abs(parseFloat(appComponent.saldo_total)).toFixed(2) }}</span
                            >
                        </RouterLink>
                        <!-- Button to toggle menu visibility -->
                        <RouterLink
                            @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
                            to="/gestion/deposito"
                            class="bg-success rounded-full h-7 w-7 flex justify-center items-center hover:scale-105"
                            data-analytics-label="menu:deposit"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-plus"
                                class="text-neutral text-md font-bold"
                            />
                        </RouterLink>
                    </div>
                </div>
                <div
                    v-else
                    class="flex justify-center items-center gap-6"
                >
                    <div class="flex flex-col justify-center items-center gap-2">
                        <p class="text-neutral text-sm font-bold">{{ $t('ID') }}</p>
                        <div class="h-10 w-44 flex justify-center items-center bg-base-300 rounded-full gap-4 p-1">
                            <!-- Link to account management with user ID -->
                            <RouterLink
                                to="/gestion/gestion_cuenta"
                                class="flex justify-center items-center gap-4 hover:scale-105"
                                @click="closeMenu()"
                            >
                                <img
                                    src="https://images.virtualsoft.tech/m/msj19212T1721764697.png"
                                    alt=""
                                />
                                <span class="saldo text-neutral text-base mr-2">{{
                                    appComponent.session.usuario
                                }}</span>
                            </RouterLink>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center gap-2">
                        <p class="text-neutral text-sm font-bold">{{ $t('Saldo') }}</p>
                        <div class="h-10 flex justify-center items-center bg-base-100 rounded-full gap-4 p-1">
                            <!-- Link to deposit management -->
                            <summary
                                class="flex justify-center items-center gap-1"
                                @click="onUserBalance()"
                            >
                                <img
                                    src="https://images.virtualsoft.tech/m/msjT1682370645.png"
                                    alt=""
                                    class="z-10"
                                />
                                <span class="saldo text-neutral text-xs"
                                    >{{ appComponent.session.moneda }}</span>
                                <span class="saldo text-neutral text-sm">
                                    {{ Math.abs(parseFloat(appComponent.saldo_total)).toFixed(2) }}</span
                                >
                            </summary>
                            <ul
                                class="bg-base-100 text-neutral rounded-b-box absolute top-[260px] overflow-hidden flex flex-col justify-center items-center"
                                v-if="appComponent.typeUser == 'U' && appComponent.session.wallet != '1' && onSaldo && appComponent.config.mobileL == '1'"
                            >
                                <li
                                    @click="appComponent.refreshBalance2()"
                                    class="flex flex-row justify-center items-center flex-nowrap gap-2 cursor-pointer hover:bg-info-text/10 w-full p-2"
                                >
                                    <span class="font-poppinssb text-xs xl:text-sm text-center p-0 w-[90%]">{{
                                        $t('Actualizar Saldo')
                                    }}</span>
                                    <font-awesome-icon
                                        class="text-info-text cursor-pointer text-xs xl:text-sm w-[10%]"
                                        icon="fa-solid fa-refresh"
                                    />
                                </li>
                                <hr class="border-t-1 border-solid border-info-text/10 w-11/12" />
                                <li
                                    class="cursor-pointer w-full hover:bg-info-text/10 p-2"
                                    v-if="
                                        config.header.typeBalance == undefined
                                            ? true
                                            : config.header.typeBalance.saldo_recarga
                                    "
                                >
                                    <RouterLink
                                        to="/gestion/deposito"
                                        class="text-xs xl:text-sm font-poppinssl flex flex-col justify-center items-center gap-0"
                                        data-analytics-label="menu:deposit"
                                        :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                                    >
                                        <span class="font-poppinssb text-xs xl:text-sm">{{
                                            $t('Saldo Recargas:')
                                        }}</span>
                                        <span
                                            >{{ appComponent.session.moneda }}
                                            {{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}</span
                                        >
                                    </RouterLink>
                                </li>
                                <hr class="border-t-1 border-solid border-info-text/10 w-11/12" />
                                <li
                                    class="flex flex-col justify-center items-center cursor-default w-full p-2"
                                    v-if="
                                        (config.header.typeBalance == undefined
                                            ? true
                                            : config.header.typeBalance.saldo_retiro) &&
                                        (config.header.balanceWithdraw == undefined
                                            ? true
                                            : config.header.balanceWithdraw)
                                    "
                                >
                                    <span class="font-poppinssb text-xs xl:text-sm">{{ $t('Saldo Retiro:') }}</span
                                    ><span class="font-poppinssl text-xs xl:text-sm"
                                        >{{ appComponent.session.moneda }}
                                        {{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}</span
                                    >
                                </li>
                                <hr class="border-t-1 border-solid border-info-text/10 w-11/12" />
                                <li class="flex flex-col justify-center items-center cursor-default w-full p-2">
                                    <span class="font-poppinssb text-xs xl:text-sm text-center">{{
                                        $t('Saldo freebet y bonos:')
                                    }}</span
                                    ><span
                                        v-if="onViewBalance"
                                        class="font-poppinssl text-xs xl:text-sm"
                                        >{{ appComponent.session.moneda }}
                                        {{
                                            Math.abs(
                                                (Number(appComponent.saldo_freebet) || 0) +
                                                    (Number(appComponent.saldo_bono) || 0),
                                            ).toFixed(2)
                                        }}</span
                                    >
                                    <button
                                        v-if="!onViewBalance"
                                        @click="onRefreshBalance2()"
                                        class="mt-2 border-1 rounded-md px-1 border-solid border-info-text mx-auto mb-4"
                                    >
                                        {{ $t('Consultar') }}
                                        <!-- Button to consult balance -->
                                        <font-awesome-icon
                                            class="fa-refresh2 text-info-text text-sm group-active:-rotate-[920deg] group-active:transition-none transition-all ease-in-out duration-[5500ms]"
                                            icon="fa-solid fa-refresh"
                                        />
                                    </button>
                                </li>
                                <li
                                    class="w-full flex flex-col justify-center items-center"
                                    v-if="
                                        appComponent.saldo_freeCasino != null &&
                                        true &&
                                        appComponent.saldo_freeCasino > 0 &&
                                        (config.header.typeBalance == undefined
                                            ? true
                                            : config.header.typeBalance.saldo_freeCasino)
                                    "
                                >
                                    <span class="font-poppinssb text-xs xl:text-sm">{{ $t('FreeCasino') }} </span
                                    ><span class="font-poppinssl text-xs xl:text-sm"
                                        >{{ appComponent.session.moneda }}
                                        {{ Math.abs(appComponent.saldo_freeCasino).toFixed(2) }}</span
                                    >
                                </li>
                                <li
                                    @click="appComponent.gAnalytics('deposit_profile')"
                                    class="w-full flex justify-center items-center p-2"
                                ></li>
                            </ul>
                            <!-- Button to toggle menu visibility -->
                            <RouterLink
                                @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
                                to="/gestion/deposito"
                                class="z-10 rounded-full h-7 w-7 flex justify-center items-center hover:scale-105"
                                data-analytics-label="menu:deposit"
                                :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-plus"
                                    class="text-neutral text-md font-bold"
                                />
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <hr class="w-2/3 bg-base-200 my-5 h-[1px] rounded-full" />
            </div>

            <!-- Notification component, displayed based on configuration -->
            <div
                v-if="
                    appComponent.config.header !== undefined &&
                    appComponent.config.header.notificationButton !== undefined &&
                    appComponent.config.header.notificationButton[appComponent.country] !== undefined &&
                    appComponent.config.header.notificationButton[appComponent.country]
                "
                class="absolute left-0 top-0 hover:scale-105"
            >
                <Notification />
            </div>
            <!-- Swiper component for displaying promotional GIFs -->
            <div
                v-if="appComponent.session.logueado"
                class="w-full flex justify-center items-center ml-3 gap-2"
            >
                <Swiper
                    :slidesPerView="'auto'"
                    :centeredSlides="false"
                    :centerInsufficientSlides="true"
                    :spaceBetween="10"
                    :grabCursor="true"
                    :modules="modules"
                    class="mySwiper w-full h-full flex justify-center items-center"
                >
                    <SwiperSlide
                        v-for="(item, i) in config.header != undefined &&
                        config.header.gifs != undefined &&
                        config.header.gifs[appComponent.country] != undefined
                            ? config.header.gifs[appComponent.country]
                            : []"
                        class="w-48 md:w-48 h-24 flex justify-center items-center"
                    >
                        <RouterLink
                            :key="i"
                            :to="item.redirect"
                            @click="closeMenu()"
                            aria-label="Promocionales"
                            class="w-full h-full flex justify-center items-center rounded-xl gap-2 p-2 lg:hover:scale-105"
                            :style="{
                                background:
                                    appComponent.config.name == 'Lotosports'
                                        ? item.color
                                        : `linear-gradient(to right, #1c1e2b , ${item.color})`,
                            }"
                        >
                            <img
                                v-lazy="item.imgTexto"
                                alt=""
                                width="75"
                                height="60"
                                class="h-[60px]"
                            />
                            <div class="flex justify-center items-center">
                                <img
                                    v-lazy="item.gif"
                                    alt=""
                                    width="79"
                                    height="56"
                                    class="w-32"
                                />
                            </div>
                        </RouterLink>
                    </SwiperSlide>
                </Swiper>
            </div>
            <!-- Deposit button, displayed if user is logged in -->
        </article>
        <article
            class="flex flex-col items-center mt-4"
            :class="appComponent.session.logueado ? '' : 'pt-5'"
        >
            <!-- Main container for the logged-in user's menu -->
            <div
                v-if="appComponent.session.logueado"
                class="flex flex-col w-full text-neutral items-center justify-center"
            >
                <!-- User menu list, displayed if appPOS is not active -->
                <ul
                    v-if="!appComponent.appPOS"
                    class="grid grid-cols-3 gap-1 px-2 w-full"
                    :class="appComponent.session.logueado ? 'mb-1' : 'mb-20'"
                >
                    <!-- Loop through the menu items for logged-in users -->
                    <li
                        v-for="(value, i) in FirstThreeMenu"
                        class="flex text-center justify-center items-center gap-4 rounded-md h-20"
                        :class="[
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap',
                                value.STYLE === 0 ? 'bg-base-300' : 
                                value.STYLE === 1 ? 'bg-primary' : 
                                'bg-base-300'
                        ]"
                    >
                        <!-- Router link for menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="text-yellow-400"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-1 flex justify-center items-center"
                            :class="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0 ? 'w-[69%]' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex flex-col justify-start items-center gap-2"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <span
                                    class="titles text-xs font-bold"
                                    :class="value.STYLE === 0 || value.STYLE === undefined ? 'text-neutral' : 'text-neutral-content'"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Anchor link for menu items that open in a new tab -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor link for menu items that target the top frame -->
                        <a
                            :id="value.MENU_ID"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex flex-col items-center gap-2">
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-xs text-white"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- Router link for verification action -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                    >new</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Horizontal rule for separating menu items -->
                        <hr
                            v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                            class="w-2/3 bg-base500 mb-1 mx-auto"
                        />
                        <!-- Toggle for submenu visibility -->
                        <div
                            v-if="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length != 0"
                            @click="() => (value.MENU_OPEN_SUBMENUS = !value.MENU_OPEN_SUBMENUS)"
                            class="cursor-pointer"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-chevron-down"
                                size="1x"
                                class="text-neutral"
                                :class="'arrow' + value.MENU_ID"
                            />
                        </div>
                        <!-- Submenu items -->
                        <div
                            v-if="
                                value.MENU_SUBMENUS != undefined &&
                                value.MENU_SUBMENUS.length != 0 &&
                                value.MENU_OPEN_SUBMENUS == true
                            "
                            class="w-full h-auto"
                        >
                            <ul class="grid gap-1">
                                <li v-for="submenus in value.MENU_SUBMENUS">
                                    <RouterLink
                                        :id="submenus.SUBMENU_ID"
                                        :to="config.baseUrlFx + submenus.SUBMENU_URL"
                                        active-class="bg-gradient-to-r from-secondary from-90%"
                                        v-bind="analyticsAttrs('menu:nav:' + submenus.SUBMENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                        class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-full bg-primary-focus"
                                    >
                                        <div
                                            :id="`mobile-${submenus.SUBMENU_ID}`"
                                            class="uppercase h-full w-9/12 flex justify-start items-center gap-4"
                                            :title="submenus.SUBMENU_TITLE"
                                            @click="
                                                appComponent.gAnalytics('menu_top', submenus.SUBMENU_ID);
                                                closeMenu();
                                                openSportBook(submenus);
                                            "
                                        >
                                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                                <img
                                                    class="w-8 h-8 object-contain"
                                                    v-if="
                                                        submenus.SUBMENU_ICON != undefined &&
                                                        submenus.SUBMENU_ICON != '' &&
                                                        submenus.SUBMENU_ICON.includes('https')
                                                    "
                                                    :alt="'Menu navegacion' + ' ' + submenus.SUBMENU_TITLE"
                                                    v-lazy="submenus.SUBMENU_ICON"
                                                    width="28"
                                                    height="28"
                                                />
                                                <span class="titles text-base font-medium text-neutral">{{
                                                    $t(submenus.SUBMENU_TITLE)
                                                }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul
                    v-if="!appComponent.appPOS"
                    class="grid grid-cols-4 gap-1 px-2 w-full"
                    :class="appComponent.session.logueado ? 'mb-5' : 'mb-20'"
                >
                    <!-- Loop through the menu items for logged-in users -->
                    <li
                        v-for="(value, i) in customizedMenu"
                        class="flex text-center justify-center items-center bg-base-300 gap-4 rounded-md h-20"
                        :class="[
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap',
                        ]"
                    >
                        <!-- Router link for menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="text-yellow-400"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-1 flex justify-center items-center"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            :class="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0 ? 'w-[69%]' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex flex-col justify-start items-center gap-2"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <span
                                    class="titles text-xs text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Anchor link for menu items that open in a new tab -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor link for menu items that target the top frame -->
                        <a
                            :id="value.MENU_ID"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex flex-col items-center gap-2">
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-xs text-neutral"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- Router link for verification action -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                    >new</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Horizontal rule for separating menu items -->
                        <hr
                            v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                            class="w-2/3 bg-base500 mb-1 mx-auto"
                        />
                        <!-- Toggle for submenu visibility -->
                        <div
                            v-if="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length != 0"
                            @click="() => (value.MENU_OPEN_SUBMENUS = !value.MENU_OPEN_SUBMENUS)"
                            class="cursor-pointer"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-chevron-down"
                                size="1x"
                                class="text-neutral"
                                :class="'arrow' + value.MENU_ID"
                            />
                        </div>
                        <!-- Submenu items -->
                        <div
                            v-if="
                                value.MENU_SUBMENUS != undefined &&
                                value.MENU_SUBMENUS.length != 0 &&
                                value.MENU_OPEN_SUBMENUS == true
                            "
                            class="w-full h-auto"
                        >
                            <ul class="grid gap-1">
                                <li v-for="submenus in value.MENU_SUBMENUS">
                                    <RouterLink
                                        :id="submenus.SUBMENU_ID"
                                        :to="config.baseUrlFx + submenus.SUBMENU_URL"
                                        active-class="bg-gradient-to-r from-secondary from-90%"
                                        class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-full bg-primary-focus"
                                    >
                                        <div
                                            :id="`mobile-${submenus.SUBMENU_ID}`"
                                            class="uppercase h-full w-9/12 flex justify-start items-center gap-4"
                                            :title="submenus.SUBMENU_TITLE"
                                            v-bind="analyticsAttrs('menu:nav:' + submenus.SUBMENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                            @click="
                                                appComponent.gAnalytics('menu_top', submenus.SUBMENU_ID);
                                                closeMenu();
                                                openSportBook(submenus);
                                            "
                                        >
                                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                                <img
                                                    class="w-8 h-8 object-contain"
                                                    v-if="
                                                        submenus.SUBMENU_ICON != undefined &&
                                                        submenus.SUBMENU_ICON != '' &&
                                                        submenus.SUBMENU_ICON.includes('https')
                                                    "
                                                    :alt="'Menu navegacion' + ' ' + submenus.SUBMENU_TITLE"
                                                    v-lazy="submenus.SUBMENU_ICON"
                                                    width="28"
                                                    height="28"
                                                />
                                                <span class="titles text-base font-medium text-neutral">{{
                                                    $t(submenus.SUBMENU_TITLE)
                                                }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- Alternative menu list for appPOS -->
                <ul
                    v-else
                    class="grid gap-2 py-8"
                >
                    <li
                        v-for="(value, i) in config.MENU_USUARIO_LOGUEADO_APP_POS[appComponent.country]"
                        class="uppercase h-full w-full flex flex-col justify-center items-start gap-4"
                    >
                        <!-- Router link for appPOS menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </RouterLink>
                        <!-- Anchor link for appPOS menu items that open in a new tab -->
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase"
                            v-else-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor link for appPOS menu items that target the top frame -->
                        <a
                            :id="value.MENU_ID"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus lg:hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action in appPOS -->
                        <a
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex flex-col items-center gap-2">
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-xs text-white"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </a>
                        <!-- Router link for verification action in appPOS -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                    >new</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Horizontal rule for separating appPOS menu items -->
                        <hr
                            v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                            class="w-2/3 bg-base500 mb-1 mx-auto"
                        />
                    </li>
                </ul>
            </div>

            <!-- Main container for the menu when the user is not logged in -->
            <div
                v-else
                class="flex flex-col w-full text-neutral items-center justify-center mb-4"
            >
                <ul
                    v-if="!appComponent.appPOS"
                    class="grid grid-cols-3 gap-1 px-2 mb-1 w-full"
                >
                    <!-- Loop through the menu items for logged-in users -->
                    <li
                        v-for="(value, i) in FirstThreeMenu"
                        class="flex text-center justify-center items-center gap-4 rounded-md h-20 w-full "
                        :class="[
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap',
                                value.STYLE === 0 ? 'bg-base-300' : 
                                value.STYLE === 1 ? 'bg-primary' : 
                                'bg-base-300'
                        ]"
                    >
                        <!-- Router link for menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="text-yellow-400"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-1 flex justify-center items-center"
                            :class="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0 ? 'w-[69%]' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex flex-col justify-start items-center gap-2"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <span
                                    class="titles text-xs font-bold"
                                    :class="value.STYLE === 0 || value.STYLE === undefined ? 'text-neutral' : 'text-neutral-content'"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Anchor link for menu items that open in a new tab -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor link for menu items that target the top frame -->
                        <a
                            :id="value.MENU_ID"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex flex-col items-center gap-2">
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <span
                                    class="titles text-xs text-neutral"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- Router link for verification action -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                    >new</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Horizontal rule for separating menu items -->
                        <hr
                            v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                            class="w-2/3 bg-base500 mb-1 mx-auto"
                        />
                        <!-- Toggle for submenu visibility -->
                        <div
                            v-if="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length != 0"
                            @click="() => (value.MENU_OPEN_SUBMENUS = !value.MENU_OPEN_SUBMENUS)"
                            class="cursor-pointer"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-chevron-down"
                                size="1x"
                                class="text-neutral"
                                :class="'arrow' + value.MENU_ID"
                            />
                        </div>
                        <!-- Submenu items -->
                        <div
                            v-if="
                                value.MENU_SUBMENUS != undefined &&
                                value.MENU_SUBMENUS.length != 0 &&
                                value.MENU_OPEN_SUBMENUS == true
                            "
                            class="w-full h-auto"
                        >
                            <ul class="grid gap-1">
                                <li v-for="submenus in value.MENU_SUBMENUS">
                                    <RouterLink
                                        :id="submenus.SUBMENU_ID"
                                        :to="config.baseUrlFx + submenus.SUBMENU_URL"
                                        active-class="bg-gradient-to-r from-secondary from-90%"
                                        v-bind="analyticsAttrs('menu:nav:' + submenus.SUBMENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                        class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-full bg-primary-focus"
                                    >
                                        <div
                                            :id="`mobile-${submenus.SUBMENU_ID}`"
                                            class="uppercase h-full w-9/12 flex justify-start items-center gap-4"
                                            :title="submenus.SUBMENU_TITLE"
                                            @click="
                                                appComponent.gAnalytics('menu_top', submenus.SUBMENU_ID);
                                                closeMenu();
                                                openSportBook(submenus);
                                            "
                                        >
                                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                                <img
                                                    class="w-8 h-8 object-contain"
                                                    v-if="
                                                        submenus.SUBMENU_ICON != undefined &&
                                                        submenus.SUBMENU_ICON != '' &&
                                                        submenus.SUBMENU_ICON.includes('https')
                                                    "
                                                    :alt="'Menu navegacion' + ' ' + submenus.SUBMENU_TITLE"
                                                    v-lazy="submenus.SUBMENU_ICON"
                                                    width="28"
                                                    height="28"
                                                />
                                                <span class="titles text-base font-medium text-neutral">{{
                                                    $t(submenus.SUBMENU_TITLE)
                                                }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul
                    v-if="!appComponent.appPOS"
                    class="grid grid-cols-4 gap-1 px-2"
                    :class="appComponent.session.logueado ? 'mb-5' : 'mb-1'"
                >
                    <!-- Loop through the menu items for logged-in users -->
                    <li
                        v-for="(value, i) in customizedMenu"
                        class="flex text-center justify-center items-center gap-4 rounded-md h-20 bg-base-300"
                        :class="[
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap'
                        ]"
                    >
                        <!-- Router link for menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="text-yellow-400"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-1 flex justify-center items-center"
                            :class="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0 ? 'w-[69%]' : ''"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex flex-col justify-start items-center gap-2"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <span
                                    class="titles text-xs text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Anchor link for menu items that open in a new tab -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Anchor link for menu items that target the top frame -->
                        <a
                            :id="value.MENU_ID"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary-content hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-else-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <span
                                    class="titles font-bold text-lg text-neutral"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- Button for chat action -->
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile8|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex flex-col items-center gap-2">
                                <div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
                                <img
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    class="w-8 h-8 object-contain object-center"
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles text-xs text-neutral"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- Router link for verification action -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                @click="
                                    appComponent.gAnalytics('menu_top', value.MENU_ID);
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <img
                                    class="w-8 h-8 object-cover object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                />
                                <span
                                    class="titles font-medium text-base"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <span
                                    v-if="value.ISNEW == 1"
                                    class="badge badge-sm"
                                    >new</span
                                >
                            </div>
                        </RouterLink>
                        <!-- Horizontal rule for separating menu items -->
                        <hr
                            v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                            class="w-2/3 bg-base500 mb-1 mx-auto"
                        />
                        <!-- Toggle for submenu visibility -->
                        <div
                            v-if="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length != 0"
                            @click="() => (value.MENU_OPEN_SUBMENUS = !value.MENU_OPEN_SUBMENUS)"
                            class="cursor-pointer"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-chevron-down"
                                size="1x"
                                class="text-neutral"
                                :class="'arrow' + value.MENU_ID"
                            />
                        </div>
                        <!-- Submenu items -->
                        <div
                            v-if="
                                value.MENU_SUBMENUS != undefined &&
                                value.MENU_SUBMENUS.length != 0 &&
                                value.MENU_OPEN_SUBMENUS == true
                            "
                            class="w-full h-auto"
                        >
                            <ul class="grid gap-1">
                                <li v-for="submenus in value.MENU_SUBMENUS">
                                    <RouterLink
                                        :id="submenus.SUBMENU_ID"
                                        :to="config.baseUrlFx + submenus.SUBMENU_URL"
                                        active-class="bg-gradient-to-r from-secondary from-90%"
                                        v-bind="analyticsAttrs('menu:nav:' + submenus.SUBMENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                                        class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-full bg-primary-focus"
                                    >
                                        <div
                                            :id="`mobile-${submenus.SUBMENU_ID}`"
                                            class="uppercase h-full w-9/12 flex justify-start items-center gap-4"
                                            :title="submenus.SUBMENU_TITLE"
                                            @click="
                                                appComponent.gAnalytics('menu_top', submenus.SUBMENU_ID);
                                                closeMenu();
                                                openSportBook(submenus);
                                            "
                                        >
                                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                                <img
                                                    class="w-8 h-8 object-contain"
                                                    v-if="
                                                        submenus.SUBMENU_ICON != undefined &&
                                                        submenus.SUBMENU_ICON != '' &&
                                                        submenus.SUBMENU_ICON.includes('https')
                                                    "
                                                    :alt="'Menu navegacion' + ' ' + submenus.SUBMENU_TITLE"
                                                    v-lazy="submenus.SUBMENU_ICON"
                                                    width="28"
                                                    height="28"
                                                />
                                                <span class="titles text-base font-medium text-neutral">{{
                                                    $t(submenus.SUBMENU_TITLE)
                                                }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Services section, displayed if user is logged in and not in appPOS -->
            <div
                v-if="appComponent.session.logueado && !appComponent.appPOS"
                class="w-full flex flex-col mb-3"
            >
                <p class="text-neutral text-lg font-bold ml-3 mb-2">
                    {{ $t('SERVICIOS') }}
                </p>
                <div
                    tabindex="0"
                    v-for="menu in appComponent.menus_service"
                    class="h-full flex flex-col justify-center items-center px-3 rounded-xl"
                    :class="'bg-secondary' + menu.MENU_ID"
                >
                    <button
                        class="capitalize w-full rounded-md flex justify-between items-center gap-2 px-2 py-3 bg-base-300"
                        @click="menuService(menu.MENU_ID)"
                    >
                        <div class="flex justify-start items-center gap-2 font-bold">
                            <p class="text-neutral text-md">
                                {{ $t(menu.MENU_TITLE) }}
                            </p>
                        </div>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            size="1x"
                            class="text-neutral mr-4"
                            :class="'arrow' + menu.MENU_ID"
                        />
                    </button>
                    <div
                        v-if="menu.SUBMENUS != undefined && menu.SUBMENUS != ''"
                        :id="'dropdown' + menu.MENU_ID + '-mobile'"
                        class="w-full rounded-lg grid gap-1 my-2 px-1"
                    >
                        <div
                            :id="'menuService-' + menu.MENU_ID"
                            style="display: none"
                        >
                            <RouterLink
                                v-for="submenu in menu.SUBMENUS"
                                tabindex="0"
                                :id="submenu.MENU_ID"
                                :to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
                                @Click="closeMenu()"
                                class="text-neutral text-sm px-2 py-3 grid hover:scale-105 border-b-primary-content border-b-1 last:border-b-transparent"
                                :class="'collection-item avatar-refresh ' + submenu.SUBMENU_URL.replace('.php', '')"
                                @click="
                                    menuService(menu.MENU_ID);
                                    closeMenu();
                                "
                                >{{ $t(submenu.SUBMENU_TITLE) }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Other links section, displayed if not in appPOS -->
            <div
                v-if="!appComponent.appPOS"
                class="w-full flex flex-col mb-10"
            >
                <p class="text-neutral text-lg font-bold ml-3">
                    {{ $t('OTROS') }}
                </p>
                <ul class="h-full flex flex-col justify-center items-start px-3 gap-1 ">
                    <li
                        v-for="value in config.MENU_FOOTER[appComponent.country]"
                        class="hover:scale-105 py-2 w-[90%] border-b-primary border-b-2"
                    >
                        <RouterLink
                            :to="value.MENU_URL"
                            active-class="active-link-otros"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            :aria-label="value.MENU_TITLE"
                        >
                            <div
                                :id="value.MENU_ID"
                                v-if="value.MENU_TARGET != '_blank'"
                                :title="value.MENU_TITLE"
                                @click="closeMenu()"
                            >
                                <p class="text-neutral text-md">
                                    {{ $t(value.MENU_TITLE) }}
                                </p>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-if="value.MENU_TARGET == '_blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="closeMenu()"
                        >
                            <span class="text-neutral text-lg font-bold ">
                                {{ $t(value.MENU_TITLE) }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Logout button for the user -->
            <button
                v-if="appComponent.session.logueado"
                class="bg-secondary p-2 w-3/5 flex justify-center items-center rounded-full gap-2 hover:scale-105 mb-3"
                @click="
                    appComponent.logOut();
                    closeMenu();
                "
            >
                <p class="text-md font-bold text-neutral">
                    {{ $t('CERRAR SESIÓN') }}
                </p>
                <DoorOut
                    :height="20"
                    :width="20"
                    class="ml-1 text-neutral"
                />
            </button>
        </article>
    </aside>
</template>
<style scoped>
/* Hide the scrollbar for the desktop menu */
.menu_desktop::-webkit-scrollbar {
    display: none;
}

/* Styles for the active link in the menu */
.active-link {
    background: linear-gradient(
        to right,
        #1c1e2b 28px,
        /* Dark background color for the first part */ #1c1e2b 77%,
        /* Continuation of the dark background */ transparent /* Transparent background for the rest */
    );
    border-radius: 10px; /* Rounded corners for the active link */
}

/* Styles for the span inside the active link */
.active-link > div > span {
    font-weight: normal !important; /* Normal font weight overriding other styles */
    color: #d59c00 !important; /* Gold color for the text */
}

</style>

<!-- FILE DOCUMENTED -->

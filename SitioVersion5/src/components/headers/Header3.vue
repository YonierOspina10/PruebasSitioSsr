<script lang="ts">
import Logo from '../images/Logo.vue'; // Importing the Logo component
import DetailsUser from '../DetailsUser.vue'; // Importing user details component
import { defineComponent, watch } from 'vue'; // Importing defineComponent from Vue
import MenuIcon from '../icons/MenuIcon.vue'; // Importing MenuIcon component
import DoorOut from '../icons/DoorOut.vue'; // Importing DoorOut icon component
import ExitIcon from '../icons/ExitIcon.vue'; // Importing ExitIcon component
import MessageIcon from '../icons/MessageIcon.vue'; // Importing MessageIcon component
import SearchCasinoSportbook from '../SearchCasinoSportbook.vue'; // Importing SearchCasinoSportbook component
import Search from '../Search.vue'; // Importing Search component
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper and SwiperSlide components from Swiper
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importing Swiper modules
import Notification from '@/components/Notification.vue'; // Importing Notification component
import { useGlobalStore } from '@/stores/global'; // Importing global store
import ButtonCambioMoneda from '@/components/ButtonCambioMoneda.vue'; // Importing currency change button component
import ClockUser from '@/components/ClockUser.vue';
import apiService from '@/services/ApiService'; // Importing ClockUser component
import ArrowDownFull from '../icons/ArrowDownFull.vue';
import ChangeLanguage from '../ChangeLanguage.vue';

export default defineComponent({
    components: {
        ChangeLanguage,
        ClockUser, // Registering ClockUser component
        ButtonCambioMoneda, // Registering ButtonCambioMoneda component
        Swiper, // Registering Swiper component
        Logo, // Registering Logo component
        DetailsUser, // Registering DetailsUser component
        MenuIcon, // Registering MenuIcon component
        DoorOut, // Registering DoorOut component
        ExitIcon, // Registering ExitIcon component
        MessageIcon, // Registering MessageIcon component
        Search, // Registering Search component
        SearchCasinoSportbook, // Registering SearchCasinoSportbook component
        SwiperSlide, // Registering SwiperSlide component
        Notification, // Registering Notification component
        ArrowDownFull, // Registering ArrowDownIcon component
    },
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation], // Returning Swiper modules for use
        };
    },
    data() {
        let config = this.$config(); // Fetching configuration
        let zendesk: any = this.$zendesk; // Fetching zendesk object
        let appComponent: any = this.$appComponent; // Fetching app component
        let refreshBalance = this.$refreshBalance; // Fetching refresh balance function
        let openSelectLang = false; // State for language selection dropdown
        let notifications: object = []; // Array to hold notifications
        let onMenu: boolean = false; // State for menu visibility
        let onSaldo: boolean = false; // State for balance visibility
        let onViewBalance: boolean = false; // State for viewing balance
        let onProfile: boolean = false; // State for profile visibility
        let globalStore = useGlobalStore(); // Accessing global store
        let lastExecution = Date.now(); // Timestamp for last execution
        let ligthMode = false; // State for dark mode
        let moonIcon = ''; // Icon for moon
        let sunIcon = ''; // Icon for sun
        let localStorageC = '';
        let lastUserBalanceExecution = null; // Timestamp for last user balance execution
        return {
            config,
            appComponent,
            refreshBalance,
            openSelectLang,
            onViewBalance,
            notifications,
            onMenu,
            onSaldo,
            onProfile,
            zendesk,
            globalStore,
            lastExecution,
            ligthMode,
            moonIcon,
            sunIcon,
            localStorageC,
            lastUserBalanceExecution
        };
    },
    mounted() {
        this.localStorageC = localStorage.getItem('changeThemeColor');

        console.log(this.localStorageC);
        if (this.localStorageC == 'true') {
            this.ligthMode = true;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png';
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png';
            console.log('ligthMode', this.ligthMode);
            this.appComponent.themeSportbook = true;
            if (
                this.ligthMode &&
                this.appComponent.config != undefined &&
                this.appComponent.config.theme_colors_ligth_desktop != undefined
            ) {
                let deviceTheme = '';
                if (
                    this.appComponent.config.theme_colors_ligth_desktop != undefined &&
                    this.appComponent.config.mobileL == ''
                ) {
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (
                    this.appComponent.config.theme_colors_ligth_mobile != undefined &&
                    this.appComponent.config.mobileL != ''
                ) {
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            }
        } else {
            this.ligthMode = false;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png';
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png';
            let deviceTheme = '';
            this.appComponent.themeSportbook = false;
            if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                deviceTheme = 'theme_colors_desktop';
            } else if (
                this.appComponent.config.theme_colors_mobile != undefined &&
                this.appComponent.config.mobileL != ''
            ) {
                deviceTheme = 'theme_colors_mobile';
            } else {
                deviceTheme = 'theme_colors';
            }
            this.setThemeColor(deviceTheme);

            this.appComponent.gAnalytics('change_theme_color_dark');
        }

        document.addEventListener('pointerdown', this.clickOut);
    },
    beforeMount() {
        watch(
            () => this.appComponent.session.theme_color_mode,
            (newValue, oldValue) => {
                console.log(`theme_color_mode cambió de ${oldValue} a ${newValue}`);
                // Lógica adicional según el nuevo valor
                if (newValue === 1) {
                    this.ligthMode = true;
                    this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png';
                    this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png';
                    localStorage.setItem('changeThemeColor', 'true');
                    window.dispatchEvent(new CustomEvent('themeChanged', {
                        detail: { theme: 'light' },
                    }));
                    this.appComponent.themeSportbook = true;
                    if (
                        this.ligthMode &&
                        this.appComponent.config != undefined &&
                        this.appComponent.config.theme_colors_ligth_desktop != undefined
                    ) {
                        let deviceTheme = '';
                        if (
                            this.appComponent.config.theme_colors_ligth_desktop != undefined &&
                            this.appComponent.config.mobileL == ''
                        ) {
                            deviceTheme = 'theme_colors_ligth_desktop';
                        } else if (
                            this.appComponent.config.theme_colors_ligth_mobile != undefined &&
                            this.appComponent.config.mobileL != ''
                        ) {
                            deviceTheme = 'theme_colors_ligth_mobile';
                        }
                        this.setThemeColor(deviceTheme);

                        this.appComponent.gAnalytics('change_theme_color_ligth');
                    }
                } else {
                    localStorage.setItem('changeThemeColor', 'false');
                    window.dispatchEvent(new CustomEvent('themeChanged', {
                    detail: { theme: 'dark' },
                    }));
                    this.ligthMode = false;
                    this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png';
                    this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png';
                    let deviceTheme = '';
                    this.appComponent.themeSportbook = false;
                    if (
                        this.appComponent.config.theme_colors_desktop != undefined &&
                        this.appComponent.config.mobileL == ''
                    ) {
                        deviceTheme = 'theme_colors_desktop';
                    } else if (
                        this.appComponent.config.theme_colors_mobile != undefined &&
                        this.appComponent.config.mobileL != ''
                    ) {
                        deviceTheme = 'theme_colors_mobile';
                    } else {
                        deviceTheme = 'theme_colors';
                    }
                    this.setThemeColor(deviceTheme);

                    this.appComponent.gAnalytics('change_theme_color_dark');
                }
            },
        );
    },
    beforeUnmount() {
        document.removeEventListener('pointerdown', this.clickOut);
    },
    methods: {
        /**
         * Toggles the visibility of the selected menu service.
         * @param {any} id - The ID of the menu service to toggle.
         */
        menuService(id: any) {
            const allMenus = document.querySelectorAll(
                '[id^="menuServiceDesktop-"]' // Select all menu elements
            );
            const selectedMenu = document.getElementById(
                'menuServiceDesktop-' + id // Get the selected menu by ID
            ) as HTMLElement;
            if (selectedMenu.style.display === 'block') {
                selectedMenu.style.display = 'none'; // Hide the selected menu if it's currently visible
            } else {
                allMenus.forEach((menu) => {
                    (menu as HTMLElement).style.display = 'none'; // Hide all menus
                    const menuId = menu.getAttribute('id')?.split('-')[1]; // Extract menu ID
                    const titleServiceElement = document.querySelector(
                        '.titleService-' + menuId // Select title service element
                    ) as HTMLElement;
                    const arrowElement = document.querySelector(
                        '.arrow' + menuId // Select arrow element
                    ) as HTMLElement;
                    titleServiceElement?.classList.remove('bg-secondary-focus'); // Remove focus class from title
                    arrowElement?.classList.remove('rotate-180'); // Reset arrow rotation
                });
                selectedMenu.style.display = 'block'; // Show the selected menu
                const titleServiceElement = document.querySelector(
                    '.titleService-' + id // Select title service element for the selected menu
                ) as HTMLElement;
                const arrowElement = document.querySelector(
                    '.arrow' + id // Select arrow element for the selected menu
                ) as HTMLElement;
                titleServiceElement?.classList.add('bg-secondary-focus'); // Add focus class to title
                arrowElement?.classList.add('rotate-180'); // Rotate arrow
            }
        },
        showDeposit() {
            if (
               this.appComponent.config.depositsView !== undefined &&
               this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
               this.appComponent.config.depositsView[this.appComponent.country]['switch'] === false &&
               this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] === true
           ) {
               window.localStorage.removeItem('newViewDeposit');
               window.localStorage.setItem('newViewDeposit', 'true');
               this.appComponent.showModalDepositV3 = true;
               return;
           }
           if (
               (this.appComponent.config.depositsView !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                   window.localStorage.getItem('newViewDeposit') == 'true') ||
               (!window.localStorage.getItem('newViewDeposit') &&
                   this.appComponent.config.depositsView !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['on'] &&
                   this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'] !== undefined &&
                   this.appComponent.config.depositsView[this.appComponent.country]['isDefaultView'])
           ) {
               this.appComponent.showModalDepositV3 = true; // Show deposit modal
           } else {
               this.appComponent.showModalDepositV2 = true; // Show deposit modal
           }
},

        async onRefreshBalance() {
            const button = document.getElementById('refreshBalance'); // Get refresh balance button
            const icon = (document.getElementsByClassName('fa-refresh') as HTMLCollectionOf<HTMLElement>)[0]; 

            if (Date.now() - this.lastExecution <= 5000) return;

            this.lastExecution = Date.now(); // Update last execution timestamp

            button?.setAttribute('disabled', 'true'); // Disable button
            icon?.classList.add('fa-refreshFX'); // Add animation class to refresh icon

            try {
                await this.appComponent.refreshBalance2(); // Call refresh balance function
            } catch (error) {
                console.error(error);
            } finally {
                icon?.classList.remove('fa-refreshFX'); // Remove animation class from refresh icon
                button?.removeAttribute('disabled'); // Re-enable button
            }
        },
        async onRefreshBalance2() {
            const button = document.getElementById('refreshBalance'); // Get refresh balance button
            const icon = (document.getElementsByClassName('fa-refresh2') as HTMLCollectionOf<HTMLElement>)[0];

            if (Date.now() - this.lastExecution <= 5000) return;

            this.lastExecution = Date.now(); // Update last execution timestamp

            button?.setAttribute('disabled', 'true'); // Disable button
            icon?.classList.add('fa-refreshFX'); // Add animation class to refresh icon

            try {
                await this.appComponent.refreshBalance3(); // Call refresh balance function
            } catch (error) {
                console.error(error);
            } finally {
                icon?.classList.remove('fa-refreshFX'); // Remove animation class from refresh icon
                button?.removeAttribute('disabled'); // Re-enable button
                this.onViewBalance = true; // Set view balance state to true
            }
        },
        openMenu() {
            this.globalStore.onMenuMain = true; // Open main menu
        },
        onUserBalance() {
            const now = Date.now();
            if (!this.lastUserBalanceExecution || now - this.lastUserBalanceExecution > 60000) {
                this.lastUserBalanceExecution = now;
                const params = {
                    source: 'user_balances',
                    subscribe: true,
                    what: { profile: [] },
                };
                if (!this.onSaldo) {
                    this.appComponent.refreshBalance2();
                }
            } else {
                // Optionally, show a message to the user
                // e.g. this.$toast('Please wait before refreshing again.');
            }
            if (
                this.appComponent.config.headerAssets == undefined ||
                this.appComponent.config.headerAssets.balanceSectionVersion == undefined ||
                this.appComponent.config.headerAssets.balanceSectionVersion == 1
            ) {
                this.onSaldo = !this.onSaldo;
            }
            this.onProfile = false;
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
        changeLigthMode() {
            this.ligthMode = !this.ligthMode; // Toggle light mode
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png';
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png';
            if (
                this.ligthMode &&
                this.appComponent.config != undefined &&
                this.appComponent.config.theme_colors_ligth_desktop != undefined
            ) {
                localStorage.setItem('changeThemeColor', 'true');
                window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: 'light' },
                }));
                
                this.appComponent.themeSportbook = true;
                // If light mode is enabled and light theme is defined
                if (this.appComponent.session.logueado) {
                    apiService
                        .request('save_theme_color', {
                            choicedTheme: '1', // Set light theme
                        })
                        .then((response: any) => {
                            if (response.code == 0) {
                            }
                        });
                }

                let deviceTheme = '';

                if (
                    this.appComponent.config.theme_colors_ligth_desktop != undefined &&
                    this.appComponent.config.mobileL == ''
                ) {
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (
                    this.appComponent.config.theme_colors_ligth_mobile != undefined &&
                    this.appComponent.config.mobileL != ''
                ) {
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            } else {
                localStorage.setItem('changeThemeColor', 'false');
                window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: 'dark' },
                }));
                
                this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png';
                this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png';
                this.appComponent.themeSportbook = false;
                if (this.appComponent.session.logueado) {
                    apiService
                        .request('save_theme_color', {
                            choicedTheme: '2', // Set dark theme
                        })
                        .then((response: any) => {
                            if (response.code == 0) {
                            }
                        });
                }

                let deviceTheme = '';
                if (
                    this.appComponent.config.theme_colors_desktop != undefined &&
                    this.appComponent.config.mobileL == ''
                ) {
                    deviceTheme = 'theme_colors_desktop';
                } else if (
                    this.appComponent.config.theme_colors_mobile != undefined &&
                    this.appComponent.config.mobileL != ''
                ) {
                    deviceTheme = 'theme_colors_mobile';
                }
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
        clickOut(event) {
            // Saldo
            const viewSaldo = document.getElementById('viewSaldo');
            if (viewSaldo && !viewSaldo.contains(event.target)) {
                this.onSaldo = false;
            }

            // Profile
            const profileCard = document.getElementById('profileCard');
            if (profileCard && !profileCard.contains(event.target)) {
                this.onProfile = false;
            }
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Header3|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },
});
</script>
<template>
    <header
        :class="
            config.header_.styleVersion !== undefined && config.header_.styleVersion === 2
                ? 'h-[70px] justify-between'
                : 'h-[60px] justify-start lg:justify-between'
        "
        class="bg-base-300 w-full flex items-center px-2 lg:px-4 border-b-2 border-solid border-primary fixed z-[90] -top-[1px] left-0 gap-2 lg:gap-0"
    >
        <!-- Logo and search -->
        <div
            class="relative z-10 hidden lg:flex justify-start items-center gap-4"
            :class="$route.path != '/home' ? 'in' : ''"
        >
            <div class="hidden lg:flex justify-start items-center">
                <RouterLink
                    id="ImgLogo"
                    to="/home"
                    @click="
                        onSaldo = false;
                        onProfile = false;
                    "
                    v-bind="analyticsAttrs('header:logo')"
                    class="hover:scale-105 w-44 h-12 relative"
                >
                    <img
                        v-lazy="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
                        alt=""
                        class="absolute inset-0 w-full h-full object-contain"
                    />
                </RouterLink>
            </div>
            <Search
                v-if="config.showSearchGames === undefined || !config.showSearchGames"
                class="desktop hidden md:flex absolute z-10"
            />
            <SearchCasinoSportbook
                v-else-if="config.showSearchGames !== undefined && config.showSearchGames"
                class="desktop hidden md:flex"
            />
        </div>

        <!-- New style version of the header with a horizonal menu -->
        <div
            v-if="
                appComponent.config.header_ != undefined &&
                appComponent.config.header_.styleVersion !== undefined &&
                appComponent.config.header_.styleVersion === 2
            "
            class="w-full h-full hidden md:flex"
        >
            <!-- User menu displayed when not logged in -->
            <div
                v-if="
                    !appComponent.session.logueado &&
                    appComponent.config.header_ != undefined &&
                    appComponent.config.header_.styleVersion !== undefined &&
                    appComponent.config.header_.styleVersion === 2
                "
                class="hidden md:flex h-full justify-center items-center"
            >
                <ul class="flex flex-row justify-center items-center h-full">
                    <li
                        v-for="(value, i) in config['not_login'].menu"
                        class="text-neutral h-14 w-[130px] flex flex-row justify-center items-center text-center hover:bg-base-100 transition-all duration-300 group relative"
                    >
                        <RouterLink
                            :to="value.MENU_URL"
                            @click="
                                onSaldo = false;
                                onProfile = false;
                                appComponent.gAnalytics(value.MENU_TITLE);
                            "
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="h-14 flex items-center justify-center gap-1"
                        >
                            <div class="flex justify-center items-center">
                                <span class="text-xs font-poppinssb font-semibold text-neutral">
                                    {{ value.MENU_TITLE }}
                                </span>
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    v-if="value.SUB_MENU && value.SUB_MENU?.length"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                                />
                            </div>
                        </RouterLink>

                        <!-- Submenú -->
                        <div
                            v-if="value.SUB_MENU && value.SUB_MENU?.length"
                            class="absolute top-full left-0 bg-base-200 rounded-b-lg z-50 hidden group-hover:block w-full"
                        >
                            <ul>
                                <li
                                    v-for="(subValue, subIndex) in value.SUB_MENU"
                                    class="text-neutral hover:bg-base-100 hover:rounded-b-lg transition-all duration-300 px-4 py-3 text-justify"
                                >
                                    <RouterLink
                                        :to="subValue.MENU_URL"
                                        @click="
                                            onSaldo = false;
                                            onProfile = false;
                                            appComponent.gAnalytics(subValue.MENU_TITLE);
                                        "
                                        v-bind="analyticsAttrs(`header:submenu:${subValue.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                        class="text-sm font-poppinssb font-semibold block"
                                    >
                                        {{ subValue.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- User menu displayed when logged in -->
            <div
                v-if="
                    appComponent.session.logueado &&
                    appComponent.config.header_ != undefined &&
                    appComponent.config.header_.styleVersion !== undefined &&
                    appComponent.config.header_.styleVersion === 2
                "
                class="hidden md:flex h-full items-center"
            >
                <ul class="flex flex-row justify-center items-center h-full gap-2">
                    <li
                        v-for="(value, i) in config['login'].menu"
                        class="text-white h-14 w-auto flex flex-row justify-center items-center text-center hover:bg-base-100 transition-all duration-300 group relative px-2"
                    >
                        <RouterLink
                            v-if="value.TARGET == undefined || value.TARGET == ''"
                            :to="value.MENU_URL"
                            :key="i"
                            @click="
                                onSaldo = false;
                                onProfile = false;
                                appComponent.gAnalytics(value.MENU_TITLE);
                            "
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="h-14 flex items-center justify-center gap-1"
                        >
                            <div class="flex justify-center items-center">
                                <span class="text-xs font-poppinssb font-semibold text-neutral">
                                    {{ value.MENU_TITLE }}
                                </span>
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    v-if="value.SUB_MENU && value.SUB_MENU?.length"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                                />
                            </div>
                        </RouterLink>
                        <!-- Link with target top -->
                        <a 
                            v-if="value.TARGET != undefined && value.TARGET == 'top'"
                            :href="value.MENU_URL"
                            :key="i"
                            target="_top"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="h-14 flex items-center justify-center gap-1">
                            <div class="flex justify-center items-center">
                                <span class="text-xs font-poppinssb font-semibold text-neutral">
                                    {{ value.MENU_TITLE }}
                                </span>
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    v-if="value.SUB_MENU && value.SUB_MENU?.length"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                                />
                            </div>
                        </a>
                        <!-- Link with target blank -->
                        <a 
                            v-if="value.TARGET != undefined && value.TARGET == 'blank'"
                            :href="value.MENU_URL"
                            :key="i"
                            target="_blank"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="h-14 flex items-center justify-center gap-1">
                            <div class="flex justify-center items-center">
                                <span class="text-xs font-poppinssb font-semibold text-neutral">
                                    {{ value.MENU_TITLE }}
                                </span>
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    v-if="value.SUB_MENU && value.SUB_MENU?.length"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                                />
                            </div>
                        </a>

                        <!-- Submenú -->
                        <div
                            v-if="value.SUB_MENU && value.SUB_MENU?.length"
                            class="absolute top-full left-0 bg-base-200 rounded-b-lg z-50 hidden group-hover:block w-full"
                        >
                            <ul>
                                <li
                                    v-for="(subValue, subIndex) in value.SUB_MENU"
                                    class="text-neutral hover:bg-base-100 hover:rounded-b-lg transition-all duration-300 px-4 py-3 text-justify break-words"
                                >
                                    <RouterLink
                                         v-if="subValue.TARGET == undefined || subValue.TARGET == ''"
                                        :to="subValue.MENU_URL"
                                        :key="subIndex"
                                        @click="
                                            onSaldo = false;
                                            onProfile = false;
                                            appComponent.gAnalytics(subValue.MENU_TITLE);
                                        "
                                        v-bind="analyticsAttrs(`header:submenu:${subValue.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                        class="text-xs font-poppinssb font-semibold block"
                                    >
                                        {{ subValue.MENU_TITLE }}
                                    </RouterLink>
                                    <!-- Link with target top -->
                                    <a 
                                        v-if="subValue.TARGET != undefined && subValue.TARGET == 'top'"
                                        :href="subValue.MENU_URL"
                                        :key="i"
                                        target="_top"
                                        v-bind="analyticsAttrs(`header:submenu:${subValue.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                        class="text-sm font-poppinssb font-semibold block">
                                                {{ subValue.MENU_TITLE }}
                                    </a>
                                    <a 
                                        v-if="subValue.TARGET != undefined && subValue.TARGET == 'blank'"
                                        :href="subValue.MENU_URL"
                                        :key="i"
                                        target="_blank"
                                        v-bind="analyticsAttrs(`header:submenu:${subValue.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                        class="text-sm font-poppinssb font-semibold block">
                                                {{ subValue.MENU_TITLE }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <!-- Services user loggin-->
                    <li
                        class="relative hover:bg-base-100 h-full text-neutral menu-serv pointer-events-auto dropdown dropdown-hover uppercase"
                    >
                        <a id="accion_servicios">
                            <span
                                class="flex items-center justify-center nav-label dropdown-toggle text-xs font-poppinssb font-semibold h-full w-28"
                                >{{ $t('Servicios ') }}
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                            /></span>
                        </a>
                        <ul class="bg-base-200 dropdown-content absolute w-28 hidden text-neutral p-0 pl-0 shadow-md">
                            <li
                                v-for="menu in appComponent.menus_service"
                                class="relative group hover:bg-base-100 h-14 w-full flex items-center justify-center"
                            >
                                <a
                                    :id="menu.MENU_ID"
                                    class="block p-1 w-full text-center"
                                >
                                    <span class="nav-label">{{ $t(menu.MENU_TITLE) }}</span>
                                </a>

                                <!-- Submenú -->
                                <ul
                                    v-if="menu.SUBMENUS && menu.SUBMENUS.length > 0"
                                    class="absolute top-0 right-full hidden group-hover:block bg-base-200 text-neutral w-52 z-50 shadow-md"
                                >
                                    <li
                                        v-for="submenu in menu.SUBMENUS"
                                        class="hover:bg-base-100 text-left capitalize px-4 py-2"
                                    >
                                        <RouterLink
                                            :id="submenu.MENU_ID"
                                            @click="appComponent.gAnalytics('menu_top', submenu.SUBMENU_TITLE)"
                                            :to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
                                            class="block w-full"
                                        >
                                            {{ $t(submenu.SUBMENU_TITLE) }}
                                        </RouterLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Others items displayed when loggen in -->
         <div
            v-if="appComponent.session.logueado && !appComponent.infoApp"
            class="flex justify-between lg:justify-end items-center gap-1"
            :class="
                appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2
                    ? 'w-auto md:w-0'
                    : ''
            "
        >
            <div class="in flex gap-2 ml-0 lg:ml-4 lg:hidden w-auto">
                <button
                    aria-label="search"
                    class="bg-base-200 h-12 w-12 flex justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid border-accent-content hover:scale-105"
                    @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
                    v-bind="analyticsAttrs('header:search')"
                >
                    <MenuIcon
                        :height="17"
                        :width="17"
                        class="fill-neutral"
                    />
                </button>
                <div class="in flex lg:hidden justify-start items-center">
                    <RouterLink
                        v-if="!appComponent.appPOS"
                        to="/home"
                        @click="
                            onSaldo = false;
                            onProfile = false;
                        "
                        class="w-28 hover:scale-105"
                        v-bind="analyticsAttrs('header:logo')"
                    >
                        <img
                            v-lazy="
                                config.logo_ != undefined &&
                                config.logo_['dark'] != undefined &&
                                config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? config.logo_['dark']
                                    : config.logo_['light']
                            "
                            alt=""
                        />
                    </RouterLink>
                    <RouterLink
                        v-else
                        to="/pos/menu"
                        @click="
                            onSaldo = false;
                            onProfile = false;
                        "
                        class="w-28 hover:scale-105"
                        v-bind="analyticsAttrs('header:logo')"
                    >
                        <img
                            v-lazy="
                                config.logo_ != undefined &&
                                config.logo_['dark'] != undefined &&
                                config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? config.logo_['dark']
                                    : config.logo_['light']
                            "
                            alt=""
                        />
                    </RouterLink>
                </div>
                <Search
                    v-if="config.showSearchGames === undefined || !config.showSearchGames"
                    class="small hidden md:flex lg:hidden"
                />
                <SearchCasinoSportbook
                    v-else-if="config.showSearchGames !== undefined && config.showSearchGames"
                    class="small hidden md:flex lg:hidden"
                />
            </div>
            
        </div>
         <div
            v-if="!appComponent.appPOS && appComponent.session.logueado && !appComponent.infoApp"
                class="flex justify-end items-center gap-1 lg:gap-2 h-full w-full"
            >
                <ClockUser
                    v-if="
                        appComponent.config.header_ != undefined && appComponent.config.header_['clock'] != undefined
                            ? appComponent.config.header_['clock']
                            : appComponent.config.header['clock'] !== undefined
                            ? appComponent.config.header['clock']
                            : false
                    "
                    class="hidden md:block text-base-100"
                />
                <label
                    v-if="
                        appComponent.config != undefined &&
                        appComponent.config.swichThemeMode != undefined &&
                        appComponent.config.swichThemeMode &&
                        appComponent.mobile == ''
                    "
                    class="swap text-9xl hidden justify-center items-center relative min-w-[3rem] md:flex"
                >
                    <img
                        :src="
                            !ligthMode
                                ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                                : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'
                        "
                        alt=""
                    />
                    <!-- Hidden checkbox for the switch -->
                    <input
                        type="checkbox"
                        class="hidden"
                        @click="changeLigthMode()"
                        v-bind="analyticsAttrs('header:toggle-theme')"
                    />
                    <!-- Images for the switch states -->
                    <img
                        :src="moonIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="!ligthMode ? 'swap-off -left-[0.5px]' : 'swap-on left-[5px]'"
                    />
                    <img
                        :src="sunIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="ligthMode ? 'swap-on -right-[1px]' : 'swap-off right-[5px]'"
                    />
                </label>
                <Notification
                    v-if="
                        appComponent.config.header !== undefined &&
                        appComponent.config.header.notificationButton !== undefined &&
                        appComponent.config.header.notificationButton[appComponent.country] !== undefined &&
                        appComponent.config.header.notificationButton[appComponent.country]
                    "
                    class="hidden lg:flex"
                />
                <span
                    v-if="config.header != undefined && config.header.inbox != undefined && config.header.inbox == 2"
                    @click="
                        appComponent.modal.showModal = 'message';
                        onSaldo = false;
                        onProfile = false;
                    "
                    v-bind="analyticsAttrs('header:inbox')"
                    class="in relative h-10 w-10 bg-accent rounded-full flex justify-center items-center hover:scale-105"
                >
                    <MessageIcon
                        :height="21"
                        :width="21"
                        :fill="'#ffffff'"
                    />
                    <span
                        v-if="appComponent.mensajesUnread > 0"
                        class="absolute blob top-0 right-0 w-4 h-4 bg-error/95 rounded-full text-xs text-info flex justify-center items-center"
                        >{{ appComponent.mensajesUnread }}</span
                    >
                </span>
                <RouterLink
                    v-else-if="
                        appComponent.config.header_ !== undefined && (
                        appComponent.config.header_.styleVersion === undefined ||
                        appComponent.config.header_.styleVersion !== 2)
                    "
                    to="/mensajes"
                    @click="
                        appComponent.gAnalytics('send_mail');
                        onSaldo = false;
                        onProfile = false;
                    "
                    v-bind="analyticsAttrs('header:inbox')"
                    class="in relative h-10 w-10 bg-primary rounded-full flex justify-center items-center hover:scale-105"
                >
                    <MessageIcon
                        :height="21"
                        :width="21"
                        :fill="'#ffffff'"
                    />
                    <span
                        v-if="appComponent.mensajesUnread > 0"
                        class="absolute blob top-0 right-0 w-4 h-4 bg-error/95 rounded-full text-xs text-info flex justify-center items-center"
                        >{{ appComponent.mensajesUnread }}</span
                    >
                </RouterLink>
                <div
                    class="in h-12 w-auto flex justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid gap-2 px-2"
                    :class="
                        appComponent.config.header_.styleVersion !== undefined &&
                        appComponent.config.header_.styleVersion === 2
                            ? 'border-accent bg-base-content'
                            : 'border-accent-content bg-base-200'
                    "
                >
                    <RouterLink
                        v-if="appComponent.session.logueado && config.loyalty[appComponent.country]"
                        to="/gestion/mi_lealtad"
                        class="h-full relative hidden lg:flex hover:scale-105"
                        @click="
                            onSaldo = false;
                            onProfile = false;
                            appComponent.gAnalytics('interaction_store');
                        "
                        v-bind="analyticsAttrs('header:loyalty')"
                    >
                        <div
                            v-if="appComponent.config.header_.styleVersion === undefined"
                            class="flex justify-center items-center">
                        <img
                            src="https://images.virtualsoft.tech/m/msjT1683841601.png"
                            alt=""
                            class="w-24"
                        />
                        <div
                            class="absolute top-[8px] left-[34px] text-secondary-content text-center font-bold text-base w-14"
                        >
                            <span class="text-sm">{{ appComponent.loyalty.points }}</span>
                        </div>
                        </div>
                    </RouterLink>

                    <button
                        @pointerdown.stop="
                            onProfile = !onProfile;
                            onSaldo = false;
                        "
                        class="hover:scale-105"
                        :class="
                            appComponent.config.header_.styleVersion !== undefined &&
                            appComponent.config.header_.styleVersion === 2
                                ? 'flex'
                                : 'hidden lg:flex hover:scale-105'
                        "
                        v-bind="analyticsAttrs('header:user-menu')"
                    >
                        <img
                            :src="
                                appComponent.config.header_.imgProfile != undefined
                                    ? appComponent.config.header_.imgProfile
                                    : 'https://images.virtualsoft.tech/m/msjT1683329139.png'
                            "
                            alt=""
                            :class="
                                appComponent.config.header_.styleVersion !== undefined &&
                                appComponent.config.header_.styleVersion === 2
                                    ? 'h-8 md:h-9 w-8 w-auto'
                                    : 'h-10 w-10'
                            "
                        />
                    </button>
                    <RouterLink
                        v-if="
                            appComponent.config.header_ !== undefined &&
                            appComponent.config.header_.styleVersion !== undefined &&
                            appComponent.config.header_.styleVersion == 2
                        "
                        to="/mensajes"
                        @click="
                            appComponent.gAnalytics('send_mail');
                            onSaldo = false;
                            onProfile = false;
                        "
                        v-bind="analyticsAttrs('header:inbox')"
                        class="in relative h-9 w-12 bg-base-300 border border-accent rounded-full flex justify-center items-center hover:scale-105"
                    >
                        <MessageIcon
                            :height="20"
                            :width="20"
                        fill="currentColor"
                        class="text-neutral"
                        />
                        <span
                            v-if="appComponent.mensajesUnread > 0"
                            class="absolute -top-1 -right-1 w-4 h-4 bg-error/95 rounded-full text-xs text-info flex justify-center items-center border border-accent"
                            >{{ appComponent.mensajesUnread }}</span
                        >
                    </RouterLink>
                    <ButtonCambioMoneda
                        v-if="
                            appComponent.config.header !== undefined &&
                            appComponent.config.header.currencyChangeButton !== undefined &&
                            appComponent.config.header.currencyChangeButton[appComponent.country] !== undefined &&
                            appComponent.config.header.currencyChangeButton[appComponent.country]
                        "
                        class="hidden md:flex"
                    />
                    <div class="relative flex justify-center items-center gap-2">
                        <button
                            v-if="
                                appComponent.config.header_ != undefined &&
                                appComponent.config.header_.showBalanceButton
                            "
                            id="toggleSaldoButton"
                            @pointerdown.stop="onUserBalance()"
                            v-bind="analyticsAttrs('header:balance')"
                            class="bg-accent rounded-full h-6 md:h-7 w-6 md:w-7 flex justify-center items-center hover:scale-105"
                        >
                            <font-awesome-icon
                                v-if="!onSaldo"
                                icon="fa-solid fa-plus"
                                class="text-info text-md font-bold"
                            />
                            <font-awesome-icon
                                v-else
                                icon="fa-solid fa-xmark"
                                class="text-info text-md font-bold"
                            />
                        </button>
                        <div
                            v-if="
                                appComponent.config != undefined &&
                                appComponent.config.newViewIdInMenu != undefined &&
                                appComponent.config.newViewIdInMenu &&
                                config.header_.styleVersion != 2
                            "
                            class="md:flex justify-center items-center gap-2 px-5 hidden"
                        >
                            <img
                                src="https://images.virtualsoft.tech/m/msj19212T1722345801.png"
                                alt=""
                            />
                            <span class="saldo text-neutral text-base">
                                {{ appComponent.session.usuario }}
                            </span>
                        </div>
                        <div
                            v-if="onSaldo"
                            id="viewSaldo"
                            class="absolute in top-14 right-0 w-80 lg:w-[35rem] h-auto max-h-[400px] bg-base-300 rounded-xl grid grid-cols-2 p-3 gap-3 overflow-y-auto"
                        >
                            <div class="bg-base-200 rounded-xl p-3 grid">
                                <div class="flex justify-between items-center">
                                    <p class="text-neutral text-xs">{{ $t('Saldo:') }}</p>
                                    <button
                                        @click="onRefreshBalance()"
                                        class="hover:scale-105"
                                        v-bind="analyticsAttrs('header:balance:refresh-main-balance-icon')"
                                    >
                                        <font-awesome-icon
                                            class="fa-refresh text-accent-focus text-lg cursor-pointer"
                                            icon="fa-solid fa-refresh"
                                        />
                                    </button>
                                </div>
                                <span class="text-neutral text-base mb-2"
                                    >{{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_total).toFixed(2) }}</span
                                >
                                <RouterLink
                                    to="#"
                                    @click="
                                        onSaldo = false;
                                        onProfile = false;
                                        showDeposit();
                                        appComponent.gAnalytics('profile_balance');
                                    "
                                    v-bind="analyticsAttrs('header:balance:deposit-btn')"
                                    class="bg-success h-8 w-full rounded-full text-neutral text-xs flex justify-center items-center hover:scale-105"
                                >
                                    {{ $t('Depositar') }}
                                </RouterLink>
                            </div>
                            <div class="bg-base-200 rounded-xl p-3 grid">
                                <p class="text-neutral text-xs">{{ $t('Saldo recargas:') }}</p>
                                <span class="text-neutral text-base mb-2"
                                    >{{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}</span
                                >
                                <RouterLink
                                    to="/consulta/consulta_depositos"
                                    @click="
                                        onSaldo = false;
                                        onProfile = false;
                                    "
                                    class="bg-transparent h-8 w-full rounded-full text-neutral text-xs flex justify-center items-center border-1 border-solid border-accent-focus hover:scale-105"
                                    v-bind="analyticsAttrs('header:balance:recharge-history-btn')"
                                >
                                    {{ $t('Ver histórico') }}
                                </RouterLink>
                            </div>
                            <div
                                v-if="
                                    config.header.typeBalance == undefined
                                        ? true
                                        : config.header.typeBalance.saldo_recarga
                                "
                                id="saldo_usuario"
                                class="bg-base-200 rounded-xl p-3 grid"
                            >
                                <p class="text-neutral text-xs">{{ $t('Saldo retiro:') }}</p>
                                <span class="text-neutral text-base mb-2"
                                    >{{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}</span
                                >
                                <RouterLink
                                    to="/gestion/cuenta_cobro"
                                    @click="
                                        onSaldo = false;
                                        onProfile = false;
                                    "
                                    v-bind="analyticsAttrs('header:balance:withdrawal-btn')"
                                    class="bg-transparent h-8 w-full rounded-full text-neutral text-xs flex justify-center items-center border-1 border-solid border-accent-focus hover:scale-105"
                                >
                                    {{ $t('Retirar') }}
                                </RouterLink>
                            </div>
                            <div
                                v-if="
                                    config.header.typeBalance == undefined
                                        ? true
                                        : config.header.typeBalance.saldo_freebet ||
                                          config.header.typeBalance.saldo_bono
                                "
                                id="saldo_freebet"
                                class="bg-base-200 rounded-xl p-3 grid"
                            >
                                <div
                                    class="flex justify-between items-center"
                                    :class="{ 'mb-6': !onViewBalance }"
                                >
                                    <p class="text-neutral text-xs">
                                        {{ $t('Saldo freebets y bonos:') }}
                                    </p>
                                    <button
                                        v-if="onViewBalance"
                                        @click="onRefreshBalance2()"
                                        class="hover:scale-105"
                                        v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-icon')"
                                    >
                                        <font-awesome-icon
                                            class="fa-refresh2 text-accent-focus text-lg cursor-pointer"
                                            icon="fa-solid fa-refresh"
                                        />
                                    </button>
                                </div>
                                <span
                                    class="text-neutral text-base mb-2"
                                    v-if="onViewBalance"
                                    >{{ appComponent.session.moneda }}
                                    {{
                                        Math.abs(
                                            (Number(appComponent.saldo_freebet) || 0) +
                                                (Number(appComponent.saldo_bono) || 0),
                                        ).toFixed(2)
                                    }}
                                </span>
                                <span
                                    v-if="!onViewBalance"
                                    @click="onRefreshBalance2()"
                                    class="bg-transparent h-8 w-full rounded-full text-neutral text-xs flex justify-center items-center border-1 border-solid border-accent-focus hover:scale-105 gap-x-2 cursor-pointer"
                                    v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-btn')"
                                >
                                    {{ $t('Consultar') }}
                                    <button class="hover:scale-105">
                                        <font-awesome-icon
                                            class="fa-refresh2 text-accent-focus text-lg"
                                            icon="fa-solid fa-refresh"
                                        />
                                    </button>
                                </span>
                                <RouterLink
                                    v-else
                                    to="/my-bonuses-progress"
                                    @click="
                                        onSaldo = false;
                                        onProfile = false;
                                    "
                                    class="bg-transparent h-8 w-full rounded-full text-neutral text-xs flex justify-center items-center border-1 border-solid border-accent-focus hover:scale-105"
                                >
                                    {{ $t('Ver más') }}
                                </RouterLink>
                            </div>
                            <div
                                v-if="
                                    appComponent.saldo_freeCasino != null &&
                                    true &&
                                    appComponent.saldo_freeCasino > 0 &&
                                    (config.header.typeBalance == undefined
                                        ? true
                                        : config.header.typeBalance.saldo_freeCasino)
                                "
                                id="saldo_freeCasino"
                                class="bg-base-200 rounded-xl p-3 grid"
                            >
                                <p class="text-neutral text-xs">
                                    {{ $t('Saldo free casino:') }}
                                </p>
                                <span class="text-neutral text-base mb-2"
                                    >{{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_freeCasino).toFixed(2) }}</span
                                >
                            </div>
                        </div>
                        <div
                            id="profileCard"
                            v-if="onProfile && (appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.balanceSectionVersion == undefined || appComponent.config.headerAssets.balanceSectionVersion == 1)"
                            class="absolute border-solid border-2 border-accent-content bg-base-200 in h-auto w-96 top-14 right-16 lg:right-0 rounded-xl p-2 flex flex-col justify-center items-center hover:scale-105"
                        >
                            <RouterLink
                                to="/gestion/gestion_cuenta"
                                @click="
                                    onSaldo = false;
                                    onProfile = false;
                                "
                                v-bind="analyticsAttrs('header:user-menu:my-account')"
                                class="rounded-xl flex h-full w-full justify-around items-center gap-2 p-1"
                            >
                                <img
                                    :src="
                                        appComponent.config.header_.imgProfile != undefined
                                            ? appComponent.config.header_.imgProfile
                                            : 'https://images.virtualsoft.tech/m/msjT1683329139.png'
                                    "
                                    alt=""
                                />
                                <div class="flex flex-col justify-center gap-2">
                                    <p class="text-accent font-bold w-48 text-lg text-center capitalize">
                                        {{ appComponent.session.nombre }}
                                    </p>
                                    <div class="flex flex-col justify-center items-center gap-2">
                                        <p class="text-neutral text-base text-center font-bold">
                                            ID: {{ appComponent.session.usuario }}
                                        </p>
                                        <div class="flex justify-center items-center gap-1">
                                            <span :class="'country-flags ' + appComponent.country"></span>
                                            <span class="text-neutral text-base text-center font-bold">{{
                                                appComponent.session.pais_nom
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </RouterLink>
                            <RouterLink
                                v-if="
                                    appComponent.config.bettingHistory != undefined &&
                                    appComponent.config.bettingHistory[appComponent.country] != undefined &&
                                    appComponent.config.bettingHistory[appComponent.country].show != undefined &&
                                    appComponent.config.bettingHistory[appComponent.country].show
                                "
                                @click="
                                    onSaldo = false;
                                    onProfile = false;
                                "
                                v-bind="analyticsAttrs(
                                    `header:${
                                        appComponent.config.bettingHistory[appComponent.country].text != undefined
                                            ? appComponent.config.bettingHistory[appComponent.country].text.replace(/\s+/g, '-').toLowerCase()
                                            : 'betting-history'
                                    }`
                                )"
                                class="bg-success hover:bg-success/80 transition-all w-11/12 hover:scale-105 ease-in-out text-center border-solid border-1 border-neutral/40 text-md font-poppinssb my-6 py-2 px-10 rounded-lg text-neutral"
                                :to="
                                    appComponent.config.bettingHistory[appComponent.country].url != undefined
                                        ? appComponent.config.bettingHistory[appComponent.country].url
                                        : '/consulta/consulta_tickets_online'
                                "
                            >
                                {{
                                    $t(
                                        appComponent.config.bettingHistory[appComponent.country].text != undefined
                                            ? appComponent.config.bettingHistory[appComponent.country].text
                                            : 'Historial de apuestas',
                                    )
                                }}
                            </RouterLink>
                        </div>
                        <div
                            v-if="onProfile && (appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.balanceSectionVersion != undefined && appComponent.config.headerAssets.balanceSectionVersion == 2)"
                            class="bg-gradient-to-b from-base-200 to-base-100 rounded-xl p-3 flex flex-col justify-start items-start gap-3 absolute top-14 right-0 z-10 border border-primary/50"
                        >
                            <!-- Container for user information and avatar -->
                            <div
                                class="w-full flex justify-center items-center gap-4"
                            >
                                <!-- User information section -->
                                <div
                                    class="w-full text-sm font-bold text-neutral flex flex-col gap-1 justify-center items-end"
                                >
                                    <!-- Display user name -->
                                    <span
                                        class="w-full text-xl font-semibold text-neutral leading-4 text-right min-w-[150px]"
                                    >
									{{ appComponent.session.nombre }}
								</span>
                                    <!-- Display user ID -->
                                    <span class="text-lg font-light text-neutral">
									ID:
									{{ appComponent.session.usuario }}
								</span>
                                    <!-- Display user country flag -->
                                    <span
                                        :class="
										'scale-150 country-flags ' +
										appComponent.country
									"
                                    ></span>
                                </div>
                                <!-- User avatar section -->
                                <div
                                    class="border border-neutral aspect-square w-[125px] flex justify-center items-center rounded-box"
                                >
                                    <img
                                        :src="appComponent.config.headerAssets.avatar2 != undefined ? appComponent.config.headerAssets.avatar2 : 'https://images.virtualsoft.tech/m/msj23212T1712596241.png'"
                                        alt="avatar-icon"
                                        class="rounded-box w-full aspect-square object-cover"
                                    />
                                </div>
                            </div>

                            <!-- Container for service menu buttons -->
                            <div
                                class="w-full flex items-center justify-between"
                            >
                                <!-- Loop through each service menu item -->
                                <div
                                    v-for="menu in appComponent.menus_service"
                                    :tabindex="menu.MENU_ID"
                                    class="relative w-[48%] flex flex-col"
                                    :class="'titleService-' + menu.MENU_ID"
                                >
                                    <!-- Button for each service menu item -->
                                    <button
                                        @click="menuService(menu.MENU_ID)"
                                        class="w-full h-[40px] bg-base-100 hover:bg-base-100/80 rounded-md z-30 flex justify-center items-center text-lg text-neutral font-light gap-2"
                                    >
                                        {{ $t(menu.MENU_TITLE) }}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="7"
                                            viewBox="0 0 12 7"
                                            fill="none"
                                        >
                                            <path
                                                d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989592 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989592 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                    <!-- Dropdown for submenus, if available -->
                                    <div
                                        v-if="
										menu.SUBMENUS != undefined &&
										menu.SUBMENUS != ''
									"
                                        :id="'dropdown' + menu.MENU_ID + '-mobile'"
                                    >
                                        <ul
                                            :id="
											'menuServiceDesktop-' + menu.MENU_ID
										"
                                            style="display: none"
                                            class="absolute bg-base-100 h-72 overflow-y-scroll border rounded-md z-30"
                                        >
                                            <!-- Loop through each submenu item -->
                                            <li
                                                v-for="(
												submenu, index
											) in menu.SUBMENUS"
                                                :key="index"
                                            >
                                                <!-- Router link for each submenu item -->
                                                <RouterLink
                                                    tabindex="0"
                                                    :id="submenu.MENU_ID"
                                                    :to="
													'/' +
													menu.MENU_SLUG +
													'/' +
													submenu.SUBMENU_URL
												"
                                                    class="text-neutral text-base px-2 py-3 grid hover:scale-105"
                                                    :class="
													'collection-item avatar-refresh ' +
													submenu.SUBMENU_URL.replace(
														'.php',
														''
													)
												"
                                                    @click="
													menuService(menu.MENU_ID);
												"
                                                >{{ $t(submenu.SUBMENU_TITLE) }}
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="w-full flex items-center justify-center gap-4"
                            >
                                <div
                                    tabindex="76586758"
                                    class="titleService-76586758 relative w-full flex flex-col"
                                >
                                    <button
                                        @click="menuService('76586758')"
                                        class="mx-auto w-full px-4 h-[40px] bg-gradient-to-r from-primary to-primary-content hover:bg-primary-content/80 rounded z-20 flex justify-between items-center text-lg text-neutral font-light gap-2"
                                    >
                                        <img
                                            :src="appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.coinBalance != undefined ? appComponent.config.headerAssets.coinBalance : 'https://images.virtualsoft.tech/m/msj-1212T1714083446.png'"
                                            alt="coin-icon"
                                            class="aspect-square w-[30px]"
                                        />
                                        <div
                                            class="flex justify-center items-center gap-2 text-xl font-[500]"
                                        >
                                            <span>{{ $t('Saldo') }}</span>
                                            <span class="w-full">{{
                                                    appComponent.session
                                                        .simbolo_moneda != null &&
                                                    appComponent.session
                                                        .simbolo_moneda != undefined
                                                        ? appComponent.session
                                                            .simbolo_moneda +
                                                        Math.abs(
                                                            parseFloat(
                                                                appComponent.saldo_total
                                                            )
                                                        ).toFixed(2)
                                                        : '$' +
                                                        Math.abs(
                                                            parseFloat(
                                                                appComponent.saldo_total
                                                            )
                                                        ).toFixed(2)
                                                }}</span>
                                            <button
                                                id="refreshBalance"
                                                @click="onRefreshBalance()"
                                                class="hover:scale-105 w-5"
                                            >
                                                <font-awesome-icon
                                                    class="fa-refresh text-neutral text-lg cursor-pointer"
                                                    icon="fa-solid fa-refresh"
                                                />
                                            </button>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="7"
                                            viewBox="0 0 12 7"
                                            fill="none"
                                        >
                                            <path
                                                d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989592 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989592 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                    <div :id="'dropdown76586758-mobile'">
                                        <ul
                                            id="menuServiceDesktop-76586758"
                                            style="display: none"
                                            class="absolute bg-primary-content overflow-y-scroll border rounded-md w-full"
                                        >
                                            <li
                                                class="w-full flex justify-start items-start gap-2 px-4 py-3"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <g opacity="0.5">
                                                        <path
                                                            d="M16.996 9.9975C16.9478 9.9975 16.907 9.9975 16.8643 9.9975C15.7775 9.9975 14.6888 9.9975 13.602 10.0035C13.3961 10.0035 13.1865 10.0234 12.9862 10.0732C12.3501 10.2345 11.9977 10.6966 11.8642 11.3619C11.8197 11.577 11.7974 11.8021 11.7956 12.0231C11.7881 12.7561 11.7881 13.4911 11.7993 14.2241C11.8141 15.2598 12.4855 15.9788 13.4518 15.9888C14.585 16.0007 15.7181 15.9928 16.8532 15.9948C16.8958 15.9948 16.9366 15.9948 16.9867 15.9948C16.9904 16.0346 16.9941 16.0665 16.9941 16.0963C16.9941 17.1201 16.9923 18.1439 16.9867 19.1657C16.9849 19.6397 16.7308 19.9385 16.2894 19.9883C16.1391 20.0062 15.9871 19.9982 15.8368 19.9982C10.9647 19.9982 6.09066 19.9982 1.2185 19.9982C1.0182 19.9982 0.816045 19.9903 0.619452 19.9564C0.272633 19.8986 0.111279 19.7254 0.0463662 19.3569C0.0148372 19.1736 0.00185465 18.9844 0.00185465 18.7992C0 14.8833 0 10.9675 0 7.04967C0 6.91622 0.00927324 6.78078 0.031529 6.64932C0.094587 6.28682 0.298598 6.07768 0.637999 6.02191C0.728877 6.00598 0.821609 6 0.912487 6C5.97011 6 11.0259 6 16.0835 6C16.2226 6 16.3654 6.02191 16.5008 6.05975C16.7326 6.12349 16.8829 6.29478 16.9422 6.54176C16.9756 6.68119 16.996 6.82659 16.996 6.97C17.0016 7.94398 16.9997 8.91796 16.9997 9.89194C16.9997 9.92182 16.996 9.95368 16.9923 9.99551L16.996 9.9975Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M15.9712 14.9943C15.2923 14.9943 14.6153 14.9962 13.9364 14.9924C13.7968 14.9924 13.6554 14.9754 13.5215 14.9413C13.265 14.8788 13.1066 14.7046 13.0462 14.449C13.0198 14.3316 13.0047 14.2104 13.0028 14.0911C12.9991 13.3602 12.9991 12.6293 13.0028 11.8965C13.0028 11.7696 13.0198 11.6409 13.0481 11.5178C13.1066 11.2622 13.2687 11.0993 13.5252 11.0425C13.6421 11.016 13.7628 11.0008 13.8817 11.0008C15.3017 10.9989 16.7218 11.0008 18.1419 11.0008C18.2023 11.0008 18.2626 11.0046 18.3211 11.0141C18.7133 11.0728 18.9415 11.3057 18.9887 11.7033C18.9962 11.7658 19 11.8302 19 11.8946C19 12.6217 18.9962 13.3507 18.9925 14.0778C18.9925 14.1782 18.9849 14.2805 18.9679 14.3789C18.9038 14.7349 18.6888 14.9375 18.3267 14.983C18.2381 14.9943 18.1476 14.9981 18.057 15C17.363 15 16.6671 15 15.9731 15L15.9712 14.9943ZM15.7355 12.9947C15.7355 12.4797 15.3338 12.0802 14.8152 12.0821C14.3098 12.0821 13.8911 12.4986 13.8949 13.0023C13.8986 13.4984 14.3248 13.9301 14.8152 13.932C15.3149 13.932 15.7355 13.5041 15.7355 12.9966V12.9947Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M13.9963 5H4.00559C4.00559 5 4.00186 4.98411 4 4.97617C4.03356 4.96425 4.06711 4.95234 4.10067 4.94439C4.85943 4.77361 5.6182 4.60282 6.37696 4.43203C8.42394 3.9713 10.4709 3.50659 12.5198 3.04983C12.6857 3.0121 12.8609 2.9982 13.0306 3.00018C13.2655 3.00217 13.4519 3.12331 13.5638 3.34375C13.6346 3.48078 13.6905 3.63171 13.7297 3.78263C13.8248 4.16592 13.9049 4.55516 13.9925 4.94042C13.9963 4.95631 13.9963 4.97418 14 5H13.9963Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                </svg>
                                                <div
                                                    class="w-full flex flex-col justify-center items-start"
                                                >
												<span
                                                    class="text-lg flex justify-between items-center w-full"
                                                >
													{{ $t('Saldo recargas') }}
													<button
                                                        id="refreshBalance"
                                                        @click="
															onRefreshBalance()
														"
                                                        class="hover:scale-105 w-5"
                                                    >
														<font-awesome-icon
                                                            class="fa-refresh text-neutral text-lg cursor-pointer"
                                                            icon="fa-solid fa-refresh"
                                                        />
													</button>
												</span>
                                                    <span class="text-neutral/80">
													{{
                                                            appComponent.session
                                                                .moneda
                                                        }}
													{{
                                                            Math.abs(
                                                                appComponent.saldo_recarga
                                                            ).toFixed(2)
                                                        }}
												</span>
                                                </div>
                                            </li>
                                            <hr
                                                v-if="
                                                        (config.header.typeBalance == undefined
                                                            ? true
                                                            : config.header.typeBalance.saldo_retiro) &&
                                                        (config.header.balanceWithdraw == undefined
                                                            ? true
                                                            : config.header.balanceWithdraw)
                                                    "
                                                class="w-11/12 border-t border-neutral/80 mx-auto"
                                            />
                                            <li
                                                v-if="
                                                        (config.header.typeBalance == undefined
                                                            ? true
                                                            : config.header.typeBalance.saldo_retiro) &&
                                                        (config.header.balanceWithdraw == undefined
                                                            ? true
                                                            : config.header.balanceWithdraw)
                                                    "
                                                class="w-full flex justify-start items-start gap-2 px-4 py-3"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <g
                                                        clip-path="url(#clip0_976_61)"
                                                    >
                                                        <path
                                                            d="M10.6968 12.3617C10.6326 12.4156 10.4192 12.5793 10.1454 12.5737C9.82651 12.567 9.51783 12.3377 9.25113 11.9094C9.02183 11.5415 8.66799 11.4229 8.31381 11.5961C7.96173 11.7683 7.78464 12.1581 8.00865 12.5134C8.26442 12.9184 8.58474 13.3124 8.96186 13.6034C9.22115 13.8038 9.34145 13.965 9.34039 14.2829C9.33933 14.7239 9.61379 14.9863 10.0096 14.9923C10.4072 14.998 10.6958 14.7362 10.7007 14.3044C10.7039 14.0137 10.7794 13.868 11.0792 13.7527C11.9823 13.4052 12.5718 12.4552 12.5182 11.5344C12.4607 10.5424 11.8183 9.70243 10.8605 9.41986C10.5744 9.33555 10.2615 9.34295 9.96198 9.30097C9.45751 9.23042 9.08392 8.84448 9.07051 8.38728C9.05817 7.96536 9.37955 7.54661 9.82052 7.45454C10.3137 7.35153 10.6407 7.59106 10.8887 7.9964C11.1452 8.41621 11.5364 8.53121 11.9016 8.32096C12.237 8.12799 12.3767 7.6916 12.1086 7.32542C11.8257 6.93878 11.4609 6.59235 11.0736 6.30589C10.8524 6.14256 10.6958 6.04202 10.7 5.73616C10.7067 5.25144 10.4428 5.00379 10.01 5.00767C9.59721 5.0112 9.33933 5.24862 9.34145 5.70794C9.34286 6.02614 9.22538 6.16584 8.94069 6.30872C7.33555 7.11446 7.22196 9.36059 8.75231 10.2997C9.11285 10.5209 9.58345 10.6055 10.016 10.6648C10.7229 10.7615 10.8372 10.9446 10.9371 11.098C11.1657 11.4494 11.0676 12.0502 10.6965 12.3617H10.6968Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                        <path
                                                            d="M2.66819 5.09834C2.95571 5.14455 3.24498 5.03166 3.4249 4.80483C3.6983 4.45946 4.00063 4.13314 4.33013 3.83081C5.9088 2.38054 7.95209 1.5882 10.1178 1.5942C12.4539 1.60055 14.6908 2.56751 16.2886 4.2559C17.2425 5.26379 17.9184 6.4657 18.2782 7.76957C18.3731 8.11282 18.6867 8.35165 19.0462 8.35165H19.0625C19.5853 8.35165 19.9698 7.86023 19.8319 7.36034C19.7147 6.93525 19.5687 6.51685 19.3937 6.10728C18.8854 4.9163 18.1576 3.84704 17.2308 2.92876C16.3041 2.01048 15.2246 1.28975 14.0227 0.785988C12.7777 0.264583 11.4559 0 10.0934 0C8.73102 0 7.40917 0.264583 6.16422 0.786341C4.96195 1.29011 3.8828 2.01083 2.95606 2.92911C2.6689 3.2138 2.40079 3.51296 2.15243 3.82587C1.77637 4.29965 2.05048 4.99885 2.65091 5.09551C2.65655 5.09657 2.66255 5.09728 2.66819 5.09834Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                        <path
                                                            d="M19.2031 11.0666H19.1868C18.8083 11.0666 18.4827 11.3309 18.4069 11.6981C18.0777 13.2958 17.2847 14.7644 16.094 15.9441C14.4914 17.532 12.3606 18.4062 10.094 18.4062C7.82742 18.4062 5.69665 17.5316 4.09398 15.9441C2.61725 14.4812 1.75189 12.574 1.62489 10.5269C1.57021 9.64282 1.65735 8.76546 1.87431 7.92444C1.9946 7.45913 1.67181 6.99417 1.18956 6.94231C1.18392 6.9416 1.17863 6.94125 1.17298 6.94055C0.775404 6.89751 0.407105 7.14974 0.30868 7.53356C0.103717 8.33437 0 9.15951 0 9.99983C0 11.3496 0.267052 12.6591 0.793396 13.8924C1.30175 15.0834 2.02953 16.1526 2.95627 17.0709C3.88302 17.9892 4.96252 18.7099 6.16443 19.2137C7.40938 19.7354 8.73159 20 10.0937 20C11.4557 20 12.7779 19.7354 14.0229 19.2137C15.2248 18.7099 16.3043 17.9892 17.2311 17.0709C18.1578 16.1526 18.8856 15.0834 19.3939 13.8924C19.6539 13.2831 19.8504 12.6552 19.9831 12.0128C20.084 11.5238 19.7061 11.0663 19.2024 11.0663L19.2031 11.0666Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                        <path
                                                            d="M19.3978 9.08472C19.1043 9.08367 18.8107 9.08296 18.5172 9.08226C18.1055 9.08155 17.6935 9.08155 17.2818 9.08155C16.7131 9.08155 16.1441 9.08226 15.5754 9.08226C15.4498 9.08226 15.3246 9.08226 15.1038 9.08226C15.3581 8.77005 15.5412 8.55168 15.7179 8.32731C15.991 7.98053 15.9998 7.63128 15.7476 7.38504C15.508 7.15115 15.2036 7.18749 14.9369 7.50322C14.4479 8.08213 13.9625 8.66492 13.4845 9.25547C13.1928 9.61565 13.2062 9.91904 13.5254 10.2588C14.0412 10.8077 14.563 11.3496 15.0872 11.8882C15.3669 12.1754 15.682 12.1821 15.9035 11.9225C16.1226 11.6656 16.0986 11.303 15.8315 11.0098C15.6319 10.7904 15.4209 10.5833 15.2149 10.371C15.2258 10.3364 15.2364 10.3018 15.2473 10.2672C15.3775 10.2672 15.5077 10.2672 15.6379 10.2672C16.1981 10.2672 16.7583 10.2669 17.3185 10.2665C17.7281 10.2665 18.138 10.2665 18.5476 10.2665C18.8273 10.2665 19.1071 10.2669 19.3868 10.2676C19.6867 10.2683 19.9227 10.1702 19.9865 9.80298C20.0624 9.3673 19.8359 9.08578 19.3985 9.08402L19.3978 9.08472Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_976_61">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <div
                                                    class="flex flex-col justify-center items-start"
                                                >
												<span class="text-lg">
													{{ $t('Saldo retiro') }}
												</span>
                                                    <span class="text-neutral/80">
													{{
                                                            appComponent.session
                                                                .moneda
                                                        }}
													{{
                                                            Math.abs(
                                                                appComponent.saldo_retiro
                                                            ).toFixed(2)
                                                        }}
												</span>
                                                </div>
                                            </li>
                                            <hr
                                                v-if="
                                                        (appComponent.saldo_freebet != null &&
                                                        appComponent.saldo_freebet > 0) || (appComponent.saldo_bono != null &&
                                                        appComponent.saldo_bono > 0) &&
                                                        (config.header.typeBalance == undefined
                                                            ? true
                                                            : config.header.typeBalance.saldo_freebet)
                                                    "
                                                class="w-11/12 border-t border-neutral/80 mx-auto"
                                            />
                                            <li
                                                v-if="
                                                        (appComponent.saldo_freebet != null &&
                                                        appComponent.saldo_freebet > 0) || (appComponent.saldo_bono != null &&
                                                        appComponent.saldo_bono > 0) &&
                                                        (config.header.typeBalance == undefined
                                                            ? true
                                                            : config.header.typeBalance.saldo_freebet)
                                                    "
                                                class="w-full flex justify-start items-start gap-2 px-4 py-3"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <g
                                                        clip-path="url(#clip0_976_72)"
                                                    >
                                                        <path
                                                            d="M1.71661e-05 5.62085V10.7266C0.023653 10.7894 0.0508156 10.8508 0.0698662 10.915C0.265305 11.5715 0.593742 11.8184 1.27495 11.8184C3.77438 11.8184 6.27346 11.8184 8.77288 11.8184C8.87307 11.8184 8.97326 11.8184 9.10696 11.8184V4.55617H10.9047V11.8184H11.1933C13.7534 11.8184 16.3135 11.8139 18.8732 11.823C19.2775 11.8244 19.577 11.6622 19.7386 11.3186C19.8677 11.0434 19.9781 10.7298 19.9827 10.4313C20.0071 8.92955 20.0043 7.42742 19.9845 5.92565C19.981 5.65013 19.8914 5.3605 19.7781 5.10544C19.6067 4.71915 19.292 4.51948 18.8454 4.53077C18.2305 4.54629 17.6145 4.53465 16.9764 4.53465C17.0215 4.40765 17.0593 4.30358 17.0963 4.19916C17.8146 2.17774 16.2687 -0.0496924 14.1273 0.00922136C12.3003 0.0596685 10.9746 0.989942 10.1141 2.59331C10.0799 2.65717 10.0439 2.71996 9.99455 2.80921C9.95645 2.74007 9.93493 2.70444 9.91659 2.6674C9.22479 1.27075 8.1146 0.408565 6.59519 0.0773074C4.41255 -0.398589 2.45888 1.40375 2.76438 3.61672C2.80636 3.92117 2.91255 4.21715 2.99333 4.53465C2.38373 4.53465 1.76884 4.54664 1.15466 4.53077C0.70804 4.51913 0.41065 4.7255 0.214153 5.10086C0.127722 5.26631 0.0705719 5.44728 0.000370026 5.6212L1.71661e-05 5.62085ZM11.231 4.53183C11.5658 3.68163 11.968 2.92422 12.6548 2.35237C13.1219 1.96361 13.6627 1.79075 14.2688 1.81474C14.9789 1.8426 15.5617 2.43845 15.573 3.15C15.5843 3.85732 15.0304 4.50995 14.3499 4.52548C13.3272 4.54911 12.3035 4.53147 11.231 4.53147V4.53183ZM8.76935 4.53571C7.74136 4.53571 6.75394 4.53888 5.76651 4.53465C5.07719 4.53147 4.50745 4.01077 4.42772 3.32286C4.35082 2.65964 4.79356 2.0197 5.45572 1.86201C5.98559 1.73607 6.49676 1.82849 6.95996 2.09872C7.89552 2.64447 8.36366 3.5437 8.769 4.53571H8.76935Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                        <path
                                                            d="M17.3926 20C17.9945 19.7682 18.192 19.3233 18.1811 18.6922C18.1539 17.1132 18.1719 15.5331 18.1719 13.9534V13.6514H10.9012C10.9012 13.7583 10.9012 13.8595 10.9012 13.9611C10.9012 15.8707 10.9012 17.7799 10.9005 19.6895C10.9005 19.7929 10.8895 19.8966 10.8835 20H17.3926Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                        <path
                                                            d="M9.11328 20C9.10728 19.8966 9.09635 19.7929 9.09635 19.6895C9.09529 17.7888 9.09564 15.888 9.09564 13.9873V13.6553H1.8249C1.8249 13.7428 1.8249 13.8352 1.8249 13.9273C1.8249 15.5155 1.84289 17.104 1.81608 18.6919C1.8055 19.3223 2.002 19.7682 2.60419 20H9.11328Z"
                                                            fill="white"
                                                            fill-opacity="0.5"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_976_72">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                                transform="matrix(-1 0 0 1 20 -1.52588e-05)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <div
                                                    class="flex flex-col justify-center items-start"
                                                >
												<span class="text-lg">
													{{
                                                        $t(
                                                            'Saldo freebets y bonos'
                                                        )
                                                    }}
												</span>
                                                    <span class="text-neutral/80">
													{{
                                                            appComponent.session
                                                                .moneda
                                                        }}
													{{
                                                            Math.abs(
                                                                appComponent.saldo_freebet || 0 +
                                                                appComponent.saldo_bono || 0
                                                            ).toFixed(2)
                                                        }}
												</span>
                                                </div>
                                            </li>
                                            <hr
                                                v-if="
												appComponent.saldo_freeCasino !=
													undefined &&
												appComponent.saldo_freeCasino !=
													null &&
												appComponent.saldo_freeCasino !=
													'' &&
												appComponent.saldo_freeCasino >
													0
											"
                                                class="w-11/12 border-t border-neutral/80 mx-auto"
                                            />
                                            <li
                                                v-if="
												appComponent.saldo_freeCasino !=
													undefined &&
												appComponent.saldo_freeCasino !=
													null &&
												appComponent.saldo_freeCasino !=
													'' &&
												appComponent.saldo_freeCasino >
													0
											"
                                                class="w-full flex justify-start items-start gap-2 px-4 py-3"
                                            >
                                                <svg
                                                    width="20px"
                                                    height="20px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="stroke-neutral opacity-[0.5]"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke-width="2"
                                                    />
                                                    <path
                                                        d="M15 9.94728C14.5 9.3 13.8 8.5 12 8.5C10.2 8.5 9 9.51393 9 9.94728C9 10.3806 9.06786 10.9277 10 11.5C10.7522 11.9618 12.6684 12.0439 13.5 12.5C14.679 13.1467 14.8497 13.8202 14.8497 14.0522C14.8497 14.6837 13.4175 15.4852 12 15.5C10.536 15.5153 9.5 14.7 9 14.0522"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M12 7V17"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <div
                                                    class="flex flex-col justify-center items-start"
                                                >
												<span class="text-lg">
													{{ $t('Saldo freecasino') }}
												</span>
                                                    <span class="text-neutral/80">
													{{
                                                            appComponent.session
                                                                .moneda
                                                        }}
													{{
                                                            Math.abs(
                                                                appComponent.saldo_freeCasino
                                                            ).toFixed(2)
                                                        }}
												</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            @pointerdown.stop="onUserBalance()"
                            class="flex justify-center items-center gap-1 hover:scale-105"
                            v-bind="analyticsAttrs('header:balance')"
                        >
                            <img
                                :src="appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.coinBalance != undefined ? appComponent.config.headerAssets.coinBalance : 'https://images.virtualsoft.tech/m/msjT1682370645.png'"
                                alt=""
                                class="w-6 aspect-square"
                            />
                            <span class="saldo text-neutral text-xs lg:text-sm mr-2"
                            >{{ appComponent.session.moneda }}
								{{
                                    Math.abs(parseFloat(appComponent.saldo_total)).toFixed(2)
                                }}</span
                            >
                        </button>
                    </div>
                </div>
                <Search
                    v-if="config.showSearchGames === undefined || !config.showSearchGames"
                    class="small flex md:hidden"
                />
                <SearchCasinoSportbook
                    v-else-if="config.showSearchGames !== undefined && config.showSearchGames"
                    class="small flex md:hidden"
                />
                <RouterLink
                    to="#"
                    @click="
                        appComponent.gAnalytics('deposit_profile');
                        showDeposit();
                    "
                    v-bind="analyticsAttrs('header:deposit-btn')"
                    :class="{
                        'blob in bg-success w-40 h-9 rounded-lg text-neutral text-lg hidden lg:flex justify-center items-center hover:scale-105 hover:bg-success/75':
                            appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                        'blob in bg-success h-12 w-32 hidden lg:flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105 hover:bg-success/75':
                    appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
            }"
                >
                    {{ $t('Depositar') }}
                </RouterLink>
                <button
                    class="in bg-base-200 h-12 w-14 hidden md:flex justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid border-primary hover:scale-105"
                    v-bind="analyticsAttrs('header:logout-btn')"
                    @click="
                        appComponent.gAnalytics('exit_profile');
                        appComponent.logOut();
                    "
                >
                    <DoorOut
                        :height="22"
                        :width="22"
                        class="ml-1 fill-accent-focus"
                    />
                </button>
                <ChangeLanguage v-if="config.header_ != undefined && config.header_.styleVersion != undefined && config.header_.styleVersion != 2" />
            </div>

        <!-- Others items displayed when not loggen in -->
        <div
            v-else-if="!appComponent.session.logueado || appComponent.infoApp"
            class="flex justify-between lg:justify-end items-center gap-3 w-full"
            :class="$route.path != '/home' ? 'in' : ''"
        >
            <button
                aria-label="menu"
                class="h-12 w-12 flex lg:hidden justify-center items-center rounded-full shadow-inner shadow-black/70 t hover:scale-105"
                :class="
                    config.header_.styleVersion !== undefined && config.header_.styleVersion === 2
                        ? ''
                        : 'bg-base-200 border-2 border-solid border-accent-content'
                "
                @click="openMenu()"
            >
                <MenuIcon
                    :height="20"
                    :width="20"
                    class="fill-neutral"
                />
            </button>
            <div class="flex lg:hidden justify-start items-center">
                <RouterLink
                    to="/home"
                    class="hover:scale-105 w-36 h-12 relative"
                    aria-label="Logo web"
                    v-bind="analyticsAttrs('header:logo')"
                >
                    <img
                        v-lazy="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
                        alt=""
                        class="absolute inset-0 w-full h-full object-contain"
                    />
                </RouterLink>
            </div>
            <Notification
                v-if="
                    appComponent.config.header !== undefined &&
                    appComponent.config.header.notificationButton !== undefined &&
                    appComponent.config.header.notificationButton[appComponent.country] !== undefined &&
                    appComponent.config.header.notificationButton[appComponent.country] &&
                    appComponent.infoApp &&
                    appComponent.session.logueado
                "
                class="hidden lg:flex"
            />
            <span
                v-if="
                    config.header != undefined &&
                    config.header.inbox != undefined &&
                    config.header.inbox == 2 &&
                    appComponent.infoApp &&
                    appComponent.session.logueado
                "
                @click="
                    appComponent.modal.showModal = 'message';
                    onSaldo = false;
                    onProfile = false;
                "
                class="in relative h-10 w-10 bg-accent rounded-full flex justify-center items-center hover:scale-105"
            >
                <MessageIcon
                    :height="21"
                    :width="21"
                    :fill="'#ffffff'"
                />
                <span
                    v-if="appComponent.mensajesUnread > 0"
                    class="absolute blob top-0 right-0 w-4 h-4 bg-error/95 rounded-full text-xs text-info flex justify-center items-center"
                    >{{ appComponent.mensajesUnread }}</span
                >
            </span>
            <RouterLink
                v-else-if="appComponent.infoApp && appComponent.session.logueado"
                to="/mensajes"
                @click="
                    appComponent.gAnalytics('send_mail');
                    onSaldo = false;
                    onProfile = false;
                "
                v-bind="analyticsAttrs('header:inbox')"
                class="in relative h-10 w-10 bg-accent rounded-full flex justify-center items-center hover:scale-105"
            >
                <MessageIcon
                    :height="21"
                    :width="21"
                    :fill="'#ffffff'"
                />
                <span
                    v-if="appComponent.mensajesUnread > 0"
                    class="absolute blob top-0 right-0 w-4 h-4 bg-error/95 rounded-full text-xs text-info flex justify-center items-center"
                    >{{ appComponent.mensajesUnread }}</span
                >
            </RouterLink>
            <Search
                v-if="config.showSearchGames === undefined || !config.showSearchGames"
                class="flex lg:hidden"
                :class="{
                    hidden: appComponent.infoApp && appComponent.session.logueado,
                    block: !appComponent.infoApp && !appComponent.session.logueado
                }"
            />
            <SearchCasinoSportbook
                v-else-if="config.showSearchGames !== undefined && config.showSearchGames"
                class="flex lg:hidden"
                :class="appComponent.infoApp && appComponent.session.logueado ? 'hidden' : 'block'"
            />
            <div class="hidden lg:flex justify-center items-center gap-5">
                <!-- Header style version 2 -->
                <div
                    v-if="config.header_.styleVersion !== undefined && config.header_.styleVersion === 2"
                    class="flex justify-end items-center gap-2"
                >
                    <RouterLink
                        id="accion_registro"
                        to="/registro"
                        class="bg-success h-10 w-28 flex justify-center items-center rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
                        v-bind="analyticsAttrs('header:signup-btn')"
                    >
                        {{ $t('Registrate') }}
                    </RouterLink>
                    <button
                        class="bg-primary h-10 w-36 rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
                        @click="appComponent.showModalLogin = true"
                        v-bind="analyticsAttrs('header:login-btn')"
                    >
                        {{ $t('Iniciar sesión') }}
                    </button>
                    <ChangeLanguage />
                </div>
                <!-- Default header style version -->
                <div
                    v-else
                    class="flex justify-center items-center gap-2"
                >
                    <button
                        :class="{
                'btn-pyramid bg-secondary h-10 w-44 rounded-xl text-lg text-neutral font-semibold shadow-xl hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                'bg-primary-focus h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                    appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
            }"
                        @click="appComponent.showModalLogin = true"
                        v-bind="analyticsAttrs('header:login-btn')"
                    >
                        {{ $t('Iniciar sesión') }}
                    </button>
                    <RouterLink
                        id="accion_registro"
                        to="/registro"
                        :class="{
                'btn-pyramid bg-success h-10 w-44 flex justify-center items-center rounded-xl text-lg text-neutral font-semibold shadow-xl hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                'bg-success h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                    appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
            }"
                        v-bind="analyticsAttrs('header:signup-btn')"
                    >
                        {{ $t('Registrate') }}
                    </RouterLink>
                </div>

                <label
                    v-if="
                        appComponent.config != undefined &&
                        appComponent.config.swichThemeMode != undefined &&
                        appComponent.config.swichThemeMode &&
                        appComponent.mobile == ''
                    "
                    class="swap text-9xl flex justify-center items-center relative cursor-pointer scale-110"
                >
                    <img
                        :src="
                            !ligthMode
                                ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                                : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'
                        "
                        alt=""
                    />
                    <!-- Hidden checkbox for the switch -->
                    <input
                        type="checkbox"
                        class="hidden"
                        @click="changeLigthMode()"
                        v-bind="analyticsAttrs('header:toggle-theme')"
                    />
                    <!-- Images for the switch states -->
                    <img
                        :src="moonIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="!ligthMode ? 'swap-off -left-[0.5px] absolute' : 'swap-on left-[5px] absolute'"
                    />
                    <img
                        :src="sunIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="ligthMode ? 'swap-on -right-[1px] absolute' : 'swap-off right-[5px] absolute'"
                    />
                </label>
                <ChangeLanguage v-if="config.header_ != undefined && config.header_.styleVersion != undefined && config.header_.styleVersion != 2" />
            </div>
        </div>
    </header>
</template>
<style scoped>
.button-register-desktop {
    text-shadow: 0 0 4px black; /* Adding text shadow to the register button */
}
.active-link {
    background: linear-gradient(to right, #1c1e2b 28px, #1c1e2b 77%, transparent); /* Active link background gradient */
    border-radius: 10px; /* Rounded corners for active link */
}
.active-link > div > span {
    font-weight: medium !important; /* Medium font weight for active link text */
    color: #d59c00 !important; /* Gold color for active link text */
}
.menu_desktop::-webkit-scrollbar {
    display: none; /* Hiding the scrollbar for desktop menu */
}
.ruleta_animacion {
    animation: rotate 10s linear 0s infinite; /* Animation for rotating element */
}
@keyframes rotate {
    from {
        rotate: 0deg; /* Starting rotation */
    }
    to {
        rotate: 360deg; /* Ending rotation */
    }
}
.coins_animacion {
    animation: zoom 4s ease 0s infinite; /* Animation for zooming effect */
}
@keyframes zoom {
    0% {
        scale: 1; /* Initial scale */
    }
    50% {
        scale: 1.2; /* Scale up */
    }
    100% {
        scale: 1; /* Scale back to original */
    }
}
.titles {
    animation: opcty 0.5s linear forwards; /* Animation for fading in titles */
    opacity: 0; /* Initial opacity */
}
@keyframes opcty {
    from {
        opacity: 0; /* Starting opacity */
    }
    to {
        opacity: 1; /* Ending opacity */
    }
}
.fa-refreshFX {
    animation: rotate 1s linear infinite; /* Animation for refresh icon */
}
</style>

<!-- FILE DOCUMENTED -->

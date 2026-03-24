<script lang="ts">
import { defineComponent, watch } from 'vue'; // Importing defineComponent from Vue for component definition
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing IconHandsUp component
import router from '@/router'; // Importing router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing IconHouse component
import { useGlobalStore } from '@/stores/global'; // Importing Global Store
import ClockUser from '../ClockUser.vue';
import SearchField2 from '@/components/search/SearchField2.vue'; // Importing search field component
export default defineComponent({
    data() {
        let config = this.$config(); // Fetching configuration
        let appComponent: any = this.$appComponent; // Accessing app component
        let refreshBalance = this.$refreshBalance; // Accessing refresh balance method
        let onSaldo = false; // State variable for balance visibility
        let onViewBalance = false; // State variable for view balance
        let globalStore = useGlobalStore(); // State variable for global state
        let isDropdownOpen = false
        let openSelectLang = false; // State for language selection dropdown
        let onProfile = false
        let overFlowItemsList = []; // State for overflow items in dropdown menu
        let ligthMode = false; // State for dark mode
        let moonIcon = ''; // Icon for moon
        let sunIcon = ''; // Icon for sun
        return {
            config,
            appComponent,
            refreshBalance,
            onSaldo,
            onViewBalance,
            globalStore,
            isDropdownOpen,
            openSelectLang,
            onProfile,
            ligthMode,
            moonIcon,
            sunIcon,
            overFlowItemsList
        };
    },
    components: {
        IconHandsUp, // Registering IconHandsUp component
        IconHouse, // Registering IconHouse component
        IconMenu, // Registering IconMenu component
        ClockUser,
        SearchField2
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
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv8|layout:layout-${this.appComponent.config.layout}`
            };
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
        goTo(url, id) {
            // Method to navigate to a specific URL
            if (
                id == 'accion_depositar' &&
                this.appComponent.config.showModalDeposit != undefined &&
                this.appComponent.config.showModalDeposit[this.appComponent.country]
            ) {
                this.appComponent.showModalDepositV2 = true; // Show deposit modal if conditions are met
            } else {
                this.$router.push(url); // Navigate to the specified URL
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
        logOut() {
            // Method to log out the user
            if ((window as any).ws != undefined) {
                (window as any).ws.close(); // Close WebSocket connection if exists
            }
            const vthis = this; // Preserve context
            apiService.request('logout', {}).then((response: any) => {
                // API call to log out
                if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
                    vthis.appComponent.tokenSB = ''; // Clear token
                    vthis.appComponent.session = {
                        logueado: false,
                        usuario: '',
                        nombre: '',
                        pais: '',
                        pais_nom: '',
                        pais_id: null,
                        moneda: '',
                        moneda_nom: '',
                        idioma: '',
                        utc: '',
                        token: '',
                        req_cheque: '',
                        req_doc: '',
                        fecha_crea: '',
                        fecha_actualizacion: '',
                        origen: '',
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
                        formSplaft: 'N',
                        paternal_last_name: '',
                        mother_last_name: '',
                        email: '',
                        phone: '',
                        doc_type: '',
                        nationalityid: '',
                        first_name: '',
                        identification: '',
                    }; // Reset session data
                    apiService.setAuthToken(''); // Clear auth token
                    try {
                        (window as any).altenarWSDK.set({ token: '' }); // Reset Altenar SDK token
                    } catch (e) {}
                    window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
                    vthis.appComponent.tokenUser = ''; // Clear user token
                }
            });
            this.appComponent.tokenSB = ''; // Clear token
            this.appComponent.session = {
                logueado: false,
                usuario: '',
                nombre: '',
                pais: '',
                pais_nom: '',
                pais_id: null,
                moneda: '',
                moneda_nom: '',
                idioma: '',
                utc: '',
                token: '',
                req_cheque: '',
                req_doc: '',
                fecha_crea: '',
                fecha_actualizacion: '',
                origen: '',
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
                formSplaft: 'N',
                paternal_last_name: '',
                mother_last_name: '',
                email: '',
                phone: '',
                doc_type: '',
                nationalityid: '',
                first_name: '',
                identification: '',
            }; // Reset session data
            apiService.setAuthToken(''); // Clear auth token
            this.appComponent.tokenUser = ''; // Clear user token
            window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
            this.appComponent.loadView = false; // Set loading view state
            if (this.appComponent.config.versionAltenar == '2') {
                window.location.href = '/'; // Redirect to home if version is 2
            }
            router.push('/'); // Navigate to home
            setTimeout(() => {
                this.appComponent.loadView = true; // Set loading view state after 1 second
            }, 1000);
        },
        toggleDropdown(){
            if (this.appComponent.session.logueado) {
                if (
                    this.config?.login?.menu_ != undefined
                ) {
                    this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu_'].filter(item => item.HEADER !== false);
                    this.overFlowItemsList = this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country]
                        .slice(this.maxVisibleItems)
                        .filter(item => item.TARGER !== 'chat');
                }
            } else {
                if (
                    this.config?.not_login?.menu_ != undefined
                ) {
                    this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu_'].filter(item => item.HEADER !== false);
                    this.overFlowItemsList = this.config.MENU_NOLOGUEADO[this.appComponent.country]
                        .slice(this.maxVisibleItems)
                        .filter(item => item.TARGER !== 'chat');
                }
            }
            this.isDropdownOpen = !this.isDropdownOpen
        },
        handleClickDropdown(event){
            const dropdown = this.$refs.dropdown
            if (dropdown && !dropdown.contains(event.target)){
                this.isDropdownOpen = false
            }
        },
        showDeposit(){
            this.appComponent.showModalDepositV2 = true
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
    },
    computed: {
        itemsSelected() {
            if (this.appComponent.session.logueado && this.config !== undefined && this.config.header_ !== undefined && this.config.header_.dropDownMenu !== undefined && this.config.header_.dropDownMenu === 5) {
                this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu_']; // Set menu for logged-in users
                return this.config['login']['menu_'].filter(item => item.HEADER != false) || []
            } else {
                this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu_']; // Set menu for non-logged-in users
                return this.config['not_login']['menu_'].filter(item => item.HEADER != false) || []
            }
        },
        maxVisibleItems() {
                return this.config !== undefined && this.config.header_ !== undefined && this.config.header_.dropDownMenu !== undefined && this.config.header_.dropDownMenu === 5 ? 5 : this.itemsSelected.lenght
        },
        visibleItems(){
            return (this.itemsSelected || []).slice(0, this.maxVisibleItems);
        },
        overflowItems(){
            return this.itemsSelected.slice(this.maxVisibleItems)
        }
    },
    mounted() {
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

    document.addEventListener('pointerdown', this.clickOut);

    if (this.appComponent.session.logueado) {
        if (
            this.config?.login?.menu_ != undefined
        ) {
            this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu_'].filter(item => item.HEADER !== false);
            this.overFlowItemsList = this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country]
                .slice(this.maxVisibleItems)
                .filter(item => item.TARGER !== 'chat');
        }
    } else {
        if (
            this.config?.not_login?.menu_ != undefined
        ) {
            this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu_'].filter(item => item.HEADER !== false);
            this.overFlowItemsList = this.config.MENU_NOLOGUEADO[this.appComponent.country]
                .slice(this.maxVisibleItems)
                .filter(item => item.TARGER !== 'chat');
        }
    }
    document.addEventListener('click', this.handleClickDropdown)
},

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
},
beforeUnmount() {
        document.removeEventListener('pointerdown', this.clickOut);
    },

});
</script>
<template>
    <!-- Main navigation bar container -->
    <div
        class="w-full h-[95px] flex justify-between py-1 px-1 xl:px-3"
    >
        <!-- Left section containing menu button and logo -->
        <div class="flex w-full justify-between md:justify-start lg:w-[20%] items-center gap-1">
            <!--icon menu-->
            <label
                for="main-menu"
                id="openMenu"
                class="w-8 btn btn-square btn-ghost drawer-button text-neutral text-xs"
                v-bind="analyticsAttrs('menu:toggle')"
                @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
            >
                <!-- Icon for menu button -->
                <IconMenu class="w-full h-full" />
            </label>
            <!--End icon menu-->
            <div class="flex justify-start items-center">
            <RouterLink
                id="home_accion_inicio"
                to="/home"
                v-bind="analyticsAttrs('menu:nav:home')"
                class="hover:scale-105 w-48 h-12 relative"
            >
                <img
                    id="header-logo"
                    width="282"
                    height="60"
                    class="absolute inset-0 w-full h-full object-contain"
                    v-lazy="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
                    v-bind="analyticsAttrs('header:logo')"
                    alt="Logo"
                />
            </RouterLink>
            </div>
            <SearchField2 class="md:hidden block mt-3"/>
        </div>
        <!-- Navigation menu for non-logged-in users -->
        <ol
            v-if="!appComponent.session.logueado"
            :class="
                appComponent.config.header_.dropDownMenu === 5
                    ? 'relative hidden lg:flex flex-row w-[60%] items-center justify-center gap-4'
                    : 'hidden lg:flex justify-center items-center gap-x-1 mx-4'
            "
        >
            <li
                v-for="value in config.header_.dropDownMenu !== undefined && config.header_.dropDownMenu === 5 ? visibleItems : config.MENU_USUARIO_NOLOGUEADO[
					appComponent.country
				]"
                class="rounded-xl font-bold"
            >
                <RouterLink
                    active-class="text-xl"
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                    :class="[
                        'w-full h-full flex flex-col justify-center items-center text-neutral p-1 relative transition-all',
                    ]"
                    v-if="value.TARGER == undefined"
                >
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center uppercase font-poppinssl leading-4"
                        :class="
                            appComponent.config.header_.dropDownMenu === 5
                                ? 'xl:text-base hover:text-accent-content'
                                : 'xl:text-sm'
                        "
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                </RouterLink>
                <a
                    v-if="value.TARGER !== undefined && value.TARGER == '_top'"
                    target="_top"
                    :id="value.MENU_ID"
                    :href="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px] text-[0.8rem]"
                    >{{ $t(value.MENU_TITLE) }}</a
                >
            </li>
            <li v-if="overFlowItemsList.length > 0 && config.header_.dropDownMenu !== undefined && config.header_.dropDownMenu === 5 ? overflowItems.length : ''" ref="dropdown" class="relative">
                <button
                    @click="toggleDropdown"
                    v-bind="analyticsAttrs('header:menu:more-btn')"
                    class="p-2 text-accent-content rounded flex items-center justify-center">
                    MÁS
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up transition-all duration-300 ease-in-out rotate-180"><path d="m18 15-6-6-6 6"/></svg> <!-- Placeholder for an SVG icon -->
                </button>
                <ul v-show="isDropdownOpen"
                class="absolute mt-2 w-48 bg-base-content border-1 border-neutral rounded shadow-lg z-50 right-0">
                    <li
                        v-for="value in overFlowItemsList"
                        class="flex items-center justify-center hover:bg-base-100 whitespace-nowrap text-neutral hover:text-accent-content"
                    >
                        <RouterLink
                        active-class="after:-translate-y-[78px] rounded-xl"
                        class="w-full text-center px-4 py-2"
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        v-if="value.TARGER == undefined"
                    >
                        <span
                            v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                            class="text-center uppercase font-poppinsm leading-4 text-xs"
                            >{{ $t(value.MENU_TITLE) }}</span
                        >
                    </RouterLink>
            </li>
            </ul>

            </li>
        </ol>
        <!-- Buttons for registration and login for non-logged-in users -->
        <div
            v-if="!appComponent.session.logueado"
            class="flex justify-center items-center gap-2 lg:mr-0"
        >
        <label
                    v-if="
                        appComponent.config != undefined &&
                        appComponent.config.swichThemeMode != undefined &&
                        appComponent.config.swichThemeMode &&
                        appComponent.mobile == '' &&
                        !appComponent.session.logueado
                    "
                    class="swap text-9xl hidden justify-center items-center relative md:flex"
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
                        v-bind="analyticsAttrs('header:toggle-theme')"
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
        <SearchField2 class="hidden md:flex mx-2 mt-3"/>
        <!-- Login button text -->
            <button
            class="bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content h-9 w-36 md:flex hidden justify-center items-center rounded-full text-lg text-info-text font-semibold hover:scale-105"
            v-bind="analyticsAttrs('header:login-btn')" 
            @click="appComponent.showModalLogin = true"
        >
          {{ $t('Iniciar sesión') }}
        </button>
        <RouterLink
            id="accion_registro"
            to="/registro"
            class="bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content h-9 w-36 md:flex hidden justify-center items-center rounded-full text-lg text-info-text font-semibold hover:scale-105"
            v-bind="analyticsAttrs('header:signup-btn')"
        >
          {{ $t('Registrate') }}
        </RouterLink>
        </div>
        <!-- Navigation menu for logged-in users -->
        <ol
            v-if="appComponent.session.logueado"
            :class="
                appComponent.config.header_.dropDownMenu === 5
                    ? 'relative hidden lg:flex flex-row w-[45%] items-center justify-center gap-1'
                    : 'hidden lg:flex justify-center items-center gap-x-1 mx-4'
            "
        >
            <li
                v-for="value in config.header_.dropDownMenu !== undefined && config.header_.dropDownMenu === 5 ? visibleItems : config.MENU_USUARIO_LOGUEADO[
					appComponent.country
				]"
                class="rounded-xl font-bold"
            >
                <RouterLink
                    active-class="text-accent-content"
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    :class="[
                        'w-full h-full flex flex-col justify-center items-center text-neutral p-1 relative transition-all',
                    ]"
                    v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                    v-if="value.TARGER == undefined"
                >
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center uppercase font-poppinssl leading-4"
                        :class="
                            appComponent.config.header_.dropDownMenu === 5
                                ? 'xl:text-md hover:text-accent-content'
                                : 'xl:text-sm'
                        "
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                </RouterLink>
                <a
                    v-if="value.TARGER !== undefined && value.TARGER == '_top'"
                    target="_top"
                    :id="value.MENU_ID"
                    :href="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px] text-[0.8rem]"
                    >{{ $t(value.MENU_TITLE) }}</a
                >
            </li>
            <li v-if="overFlowItemsList.length > 0 && config.header_.dropDownMenu !== undefined && config.header_.dropDownMenu === 5 ? overflowItems.length : ''" ref="dropdown" class="relative">
                <button
                    @click="toggleDropdown"
                    v-bind="analyticsAttrs('header:menu:more-btn')"
                    class="p-2 text-accent-content rounded flex items-center justify-center">
                    MÁS
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up transition-all duration-300 ease-in-out rotate-180"><path d="m18 15-6-6-6 6"/></svg> <!-- Placeholder for an SVG icon -->
                </button>
                <ul v-show="isDropdownOpen"
                class="absolute mt-2 w-48 bg-base-content border-1 border-neutral rounded shadow-lg z-50 right-0">
                    <li
                        v-for="value in overFlowItemsList"
                        class="flex justify-center items-center hover:bg-base-100 whitespace-nowrap text-neutral hover:text-accent-content"
                    >
                        <RouterLink
                        active-class="after:-translate-y-[78px] rounded-xl"
                        class="w-full text-center px-4 py-2"
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        v-if="value.TARGER == undefined"
                    >
                        <span
                            v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                            class="text-center uppercase font-poppinsm leading-4 text-xs"
                            >{{ $t(value.MENU_TITLE) }}</span
                        >
                    </RouterLink>
                </li>
            </ul>

            </li>
            </ol>
                <label
                    v-if="
                        appComponent.config != undefined &&
                        appComponent.config.swichThemeMode != undefined &&
                        appComponent.config.swichThemeMode &&
                        appComponent.mobile == '' &&
                        appComponent.session.logueado
                    "
                    class="swap text-9xl hidden justify-center items-center relative md:flex"
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
                        v-bind="analyticsAttrs('header:toggle-theme')"
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
        <!-- User actions for logged-in users -->
        <div
            class="flex justify-center items-center gap-2 "
            v-if="appComponent.session.logueado"
        >
         <ClockUser v-if="
						appComponent.config.header_ != undefined &&
						appComponent.config.header_['clock'] != undefined
							? appComponent.config.header_['clock']
							: appComponent.config.header['clock'] !== undefined
							? appComponent.config.header['clock']
							: false
					"
                    class="hidden lg:block"
                    @click="closeMenu()"
                    />
            <div
                class="indicator relative hover:scale-90 transition-all ease-in-out hidden md:flex"
                @click="appComponent.gAnalytics('send_mail')"
            >
                <span
                    class="z-0 indicator-item badge badge-primary rounded-2xl text-neutral text-xs xl:text-sm"
                    :class="[appComponent.mensajesUnread == 0 ? 'bg-base-content' : 'bg-[#23b950]']"
                >
                    {{ appComponent.mensajesUnread }}
                    <!-- Display unread messages count -->
                </span>
                <RouterLink v-bind="analyticsAttrs('header:inbox')" to="/mensajes">
                    <font-awesome-icon
                        class="text-xl xl:text-2xl icon-envelope text-neutral"
                        icon="fa-solid fa-envelope"
                    />
                </RouterLink>
            </div>
            <SearchField2 class="hidden md:flex mt-2 ml-14 md:ml-0"/>
            <div
                id="viewSaldo"
                class="relative z-0 dropdown dropdown-end group hidden md:block"
            >
                <div
                    @pointerdown.stop="onUserBalance()"
                    v-bind="analyticsAttrs('header:balance')"
                    class="px-1 xl:px-2 py-1 list-none text-center text-neutral text-base flex flex-nowrap justify-between items-center rounded-full gap-x-1 cursor-pointer bg-base-100"
                    id="saldo_usuario_principal"
                >
                    <span class="text-xs xl:text-sm font-poppinssb uppercase">{{ $t('Saldo:') }}</span>
                    <span class="text-xs xl:text-sm font-poppinssl truncate">
                        {{ appComponent.session.moneda }}
                        {{ Math.abs(parseFloat(appComponent.saldo_total)).toFixed(2) }}</span
                    >
                    <font-awesome-icon
                        class="text-xs xl:text-sm"
                        icon="fa-solid fa-chevron-down"
                    />
                </div>
                <ul
                    class="bg-base-100 text-neutral rounded-box w-full absolute overflow-hidden flex flex-col justify-center items-center border-solid"
                    v-if="appComponent.typeUser == 'U' && appComponent.session.wallet != '1' && onSaldo"
                >
                    <li
                        @click="appComponent.refreshBalance2()"
                        v-bind="analyticsAttrs('header:balance:refresh-main-balance-btn')"
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
                        v-if="config.header.typeBalance == undefined ? true : config.header.typeBalance.saldo_recarga"
                    >
                        <RouterLink
                            to="/gestion/deposito"
                            v-bind="analyticsAttrs('header:balance:recharge-btn')"
                            class="text-xs xl:text-sm font-poppinssl flex flex-col justify-center items-center gap-0"
                        >
                            <span class="font-poppinssb text-xs xl:text-sm">{{ $t('Saldo Recargas:') }}</span>
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
                            (config.header.typeBalance == undefined ? true : config.header.typeBalance.saldo_retiro) &&
                            (config.header.balanceWithdraw == undefined ? true : config.header.balanceWithdraw)
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
                                    (Number(appComponent.saldo_freebet) || 0) + (Number(appComponent.saldo_bono) || 0),
                                ).toFixed(2)
                            }}</span
                        >
                        <button
                            v-if="!onViewBalance"
                            @click="onRefreshBalance2()"
                            class="mt-2 border-1 rounded-md px-1 border-solid border-info-text mx-auto mb-1"
                            v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-btn')"
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
                            (config.header.typeBalance == undefined ? true : config.header.typeBalance.saldo_freeCasino)
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
                        class="w-full flex justify-center items-center pb-2"
                    >
                        <RouterLink
                            to="/gestion/deposito"
                            class="rounded-md px-4 bg-success text-neutral mb-2"
                            v-bind="analyticsAttrs('header:balance:deposit-btn')"
                            >{{ $t('Depositar') }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <RouterLink
            to="#"
            @click="
						appComponent.gAnalytics('deposit_profile');
						showDeposit();
					"
            v-bind="analyticsAttrs('header:deposit-btn')"   
            class="blob in font-semibold bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content w-32 h-9 rounded-lg text-info-text text-lg hidden lg:flex justify-center items-center hover:scale-105 hover:opacity-90 hover:text-neutral"
        >
          {{ $t('Depositar') }}
        </RouterLink>
        </div>
    </div>
</template>
<style scoped>

  .gold-effect {
    background-size: 300% 300%;
    animation: gradient 5s ease infinite;
    background-image: 
      linear-gradient(#594800, #cb9f38),
      linear-gradient(137.48deg, #fbe68c 10%, #b09628 45%, #594800 67%, #cb9f38 87%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>


<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing IconHandsUp component
import router from '@/router'; // Importing router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing IconHouse component
import { useGlobalStore } from '@/stores/global'; // Importing Global Store
import ClockUser from '../ClockUser.vue';
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
        return {
            config,
            appComponent,
            refreshBalance,
            onSaldo,
            onViewBalance,
            globalStore,
            isDropdownOpen,
            openSelectLang,
            onProfile
        };
    },
    components: {
        IconHandsUp, // Registering IconHandsUp component
        IconHouse, // Registering IconHouse component
        IconMenu, // Registering IconMenu component
        ClockUser
    },
    methods: {
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
            this.isDropdownOpen = !this.isDropdownOpen
        },
        handleClickDropdown(event){
            const dropdown = this.$refs.dropdown
            if (dropdown && !dropdown.contains(event.target)){
                this.isDropdownOpen = false
            }
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv4|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },
    computed: {
        itemsSelected() {
            if (this.appComponent.session.logueado && this.config !== undefined && this.config.header_ !== undefined && this.config.header_.menuVersion !== undefined && this.config.header_.menuVersion === 5) {
                this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu_']; // Set menu for logged-in users
                return this.config['login']['menu_'] || []
            }
        },
        maxVisibleItems() {
                return this.config !== undefined && this.config.header_ !== undefined && this.config.header_.menuVersion !== undefined && this.config.header_.menuVersion === 5 ? 5 : this.itemsSelected.lenght
        },
        visibleItems(){
            return this.itemsSelected.slice(0, this.maxVisibleItems)
        },
        overflowItems(){
            return this.itemsSelected.slice(this.maxVisibleItems)
        }
    },
    mounted() {
        // Lifecycle hook called after the component is mounted
        if (this.appComponent.session.logueado) {
            if (
                this.config != undefined &&
                this.config['login'] != undefined &&
                this.config['login']['menu_'] != undefined
            ) {
                this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu_']; // Set menu for logged-in users
            }
        } else {
            if (
                this.config != undefined &&
                this.config['not_login'] != undefined &&
                this.config['not_login']['menu_'] != undefined
            ) {
                this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu_']; // Set menu for non-logged-in users
            }
        }
        document.addEventListener('click', this.handleClickDropdown)
    },
    beforeMount(){
        document.removeEventListener('click', this.handleClickDropdown)
    }
});
</script>
<template>
    <!-- Main navigation bar container -->
    <div
        class="w-full h-[50px] bg-primary-content flex justify-between py-1 px-1 xl:px-3 border-y-2 border-solid border-accent-content"
    >
        <!-- Left section containing menu button and logo -->
        <div class="flex w-[40%] lg:w-[15%]">
            <!--icon menu-->
            <label
                for="main-menu"
                id="openMenu"
                class="w-6 btn btn-square btn-ghost drawer-button text-neutral text-xs lg:hidden mr-2"
                @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
            >
                <!-- Icon for menu button -->
                <IconMenu class="w-full h-full" />
            </label>
            <!--End icon menu-->
            <RouterLink
                id="home_accion_inicio"
                to="/home"
                v-bind="analyticsAttrs('menu:nav:home')"
                class="flex justify-center items-center mr-2 lg:mr-0"
            >
                <img
                    id="header-logo"
                    width="282"
                    height="60"
                    class="w-full h-full object-contain"
                    :src="config.header.logo.src"
                    alt="Logo"
                />
            </RouterLink>
        </div>
        <!-- Navigation menu for non-logged-in users -->
        <ol
            v-if="!appComponent.session.logueado"
            :class="
                appComponent.config.header_.menuVersion === 5
                    ? 'relative hidden lg:flex flex-row w-[60%] gap-2'
                    : 'justify-center items-center gap-x-1 mx-1 hidden lg:flex'
            "
        >
            <li
                v-for="value in config.MENU_NOLOGUEADO[appComponent.country]"
                class="'rounded-xl h-full w-full"
                :class="
                    appComponent.config.header_.menuVersion === 5
                        ? 'border-none text-justify'
                        : 'border-solid border-1 border-transparent hover:border-neutral-content/40'
                "
            >
                <RouterLink
                    active-class="after:-translate-y-[78px] rounded-xl "
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    :class="[
                        'w-full h-full flex flex-col justify-center items-center text-neutral p-1  relative transition-all after:duration-1000',
                        'after:w-[100px] after:h-[100px] z-1 after:rounded-full after:-z-1 overflow-hidden',
                        ' after:absolute after:top-14 after:left-1/2 after:-translate-x-1/2 rounded-xl after:bg-base-300/40 after:shadow-yellow-200 after:shadow-[inset_0px_2px_0px]',
                    ]"
                    v-if="!value.IS_MOBILE && value.TARGER == undefined"
                >
                    <IconHouse
                        v-if="
                            value.MENU_TITLE == 'HOME' ||
                            (value.MENU_TITLE == 'INICIO' && config.menu.desktopIcons !== true)
                        "
                        :width="'12px'"
                        :height="'12px'"
                        :fill="'currentColor'"
                    ></IconHouse>
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center uppercase font-poppinsm leading-4 text-xs"
                        :class="
                            appComponent.config.header_.menuVersion === 5
                                ? 'xl:text-xs hover:text-accent-focus'
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
        </ol>
        <!-- Buttons for registration and login for non-logged-in users -->
        <div
            v-if="!appComponent.session.logueado"
            class="flex justify-center items-center gap-x-2 mr-2 lg:mr-0"
        >
            <button
                id="accion_registrate"
                aria-label="register"
                class="text-center border-solid border-1 border-neutral text-neutral capitalize px-4 py-1 rounded-full hover:scale-105 font-poppinssl transition-all ease-out text-xs xl:text-sm"
                @click="appComponent.gAnalytics('menu_top', 'accion_registrate')"
            >
                <!-- Registration button text -->
                <RouterLink to="/registro">
                    {{ $t('Regístrate') }}
                </RouterLink>
            </button>
            <!-- Login button text -->
            <button
                id="accion_iniciarsesion"
                aria-label="login"
                class="text-center truncate border-solid border-1 border-success px-1 lg:px-4 py-1 bg-success leading-4 bg-gradient-to-r from-success to-success/60 rounded-full text-neutral capitalize font-poppinssl hover:scale-105 transition-all ease-out text-xs xl:text-sm"
                @click="
                    appComponent.gAnalytics('menu_top', 'accion_iniciarsesion');
                    appComponent.showModalLogin = true;
                "
            >
                {{ $t('Iniciar Sesión') }}
            </button>
        </div>
        <!-- Navigation menu for logged-in users -->
        <ol
            v-if="appComponent.session.logueado"
            :class="
                appComponent.config.header_.menuVersion === 5
                    ? 'relative hidden lg:flex flex-row w-auto'
                    : 'hidden lg:flex justify-center items-center gap-x-1 mx-4'
            "
        >
            <li
                v-for="value in config.header_.menuVersion !== undefined && config.header_.menuVersion === 5 ? visibleItems : config.MENU_USUARIO_LOGUEADO[
					appComponent.country
				]"
                class="rounded-xl h-full w-full"
                :class="
                    value.MENU_CLASS && appComponent.config.header_.menuVersion === 5
                        ? 'border-none text-justify'
                        : 'border-solid border-1 border-transparent hover:border-neutral-content/40'
                "
            >
                <RouterLink
                    active-class="after:-translate-y-[78px] rounded-xl "
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    :class="[
                        'w-full h-full flex flex-col justify-center items-center text-neutral p-1  relative transition-all after:duration-1000',
                        'after:w-[100px] after:h-[100px] z-1 after:rounded-full after:-z-1 overflow-hidden',
                        ' after:absolute after:top-14 after:left-1/2 after:-translate-x-1/2 rounded-xl after:bg-neutral-content/40 after:shadow-yellow-200 after:shadow-[inset_0px_2px_0px]',
                    ]"
                    v-if="value.TARGER == undefined"
                >
                    <IconHouse
                        v-if="
                            value.MENU_TITLE == 'HOME' ||
                            (value.MENU_TITLE == 'INICIO' && config.menu.desktopIcons !== true)
                        "
                        :width="'12px'"
                        :height="'12px'"
                        :fill="'currentColor'"
                    ></IconHouse>
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center uppercase font-poppinsm leading-4 text-xs"
                        :class="
                            appComponent.config.header_.menuVersion === 5
                                ? 'xl:text-xs hover:text-accent-focus'
                                : 'xl:text-sm'
                        "
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                    <IconHandsUp
                        v-if="value.MENU_TITLE == 'DEPOSITAR'"
                        :width="'15px'"
                        :height="'15px'"
                        :fill="'currentColor'"
                    />
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
            <li v-if="config.header_.menuVersion !== undefined && config.header_.menuVersion === 5 ? overflowItems.length : ''" ref="dropdown" class="relative">
                <button
                    @click="toggleDropdown"
                    class="p-2 text-neutral hover:text-accent-focus rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up transition-all duration-300 ease-in-out rotate-180"><path d="m18 15-6-6-6 6"/></svg> <!-- Placeholder for an SVG icon -->
                </button>
                <ul v-show="isDropdownOpen"
                class="absolute mt-2 w-48 bg-neutral border rounded shadow-lg z-50 right-0">
                    <li
                        v-for="value in overflowItems"
                        class="px-4 py-2 hover:bg-gray-100 whitespace-nowrap text-primary"
                    >
                        <RouterLink
                        active-class="after:-translate-y-[78px] rounded-xl "
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
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
            <li
                class="z-50 relative cursor-pointer dropdown dropdown-hover rounded-xl border-solid border-1 border-transparent hover:border-neutral-content/40 h-full w-full"
            >
                <span class="w-full h-full flex justify-center items-center flex-row nav-label dropdown-toggle">
                    <span class="leading-4 text-xs xl:text-sm text-neutral uppercase font-poppinsm text-center"
                        >{{ $t('Servicios ') }}<font-awesome-icon icon="fa-solid fa-chevron-down"
                    /></span>
                </span>
                <ul class="bg-neutral dropdown-content absolute hidden text-gray-700 shadow-md rounded-md">
                    <li
                        v-for="menu in appComponent.menus_service"
                        class="whitespace-no-wrap hover:bg-base-200 hover:rounded-md group"
                    >
                        <div class="dropdown dropdown-left dropdown-hover dropdown-toggle nav-label rounded-md">
                            <span class="block p-3 font-poppinssl group-hover:font-poppinsm">{{
                                $t(menu.MENU_TITLE)
                            }}</span>
                            <ul
                                v-if="menu.SUBMENUS != undefined && menu.SUBMENUS != ''"
                                class="bg-neutral dropdown-content absolute hidden text-gray-700 w-52 shadow-md rounded-md overflow-hidden"
                            >
                                <li
                                    v-for="submenu in menu.SUBMENUS"
                                    class="hover:border-solid hover:border-l-4 hover:border-primary hover:bg-base-200 whitespace-no-wrap text-left capitalize transition-all ease-in-out"
                                >
                                    <RouterLink
                                        :id="submenu.MENU_ID"
                                        :to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
                                        v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
                                        v-if="menu.TYPE != 'EXTERNAL'"
                                        class="text-sm font-poppinssl w-full h-full block p-2 hover:font-poppinssb"
                                        >{{ $t(submenu.SUBMENU_TITLE) }}
                                    </RouterLink>
                                    <RouterLink
                                        :id="submenu.MENU_ID"
                                        :to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
                                        v-bind="analyticsAttrs(`menu:nav:${ menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
                                        v-if="menu.TYPE == 'EXTERNAL'"
                                        class="text-sm font-poppinssl w-full h-full block p-2 hover:font-poppinssb"
                                        >{{ $t(submenu.SUBMENU_TITLE) }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        </ol>
        <!-- User actions for logged-in users -->
        <div
            class="flex justify-center items-center gap-1 xl:gap-3 flex-nowrap"
            v-if="appComponent.session.logueado"
        >
            <ClockUser v-if="
						appComponent.config.header_ != undefined &&
						appComponent.config.header_['clock'] != undefined
							? appComponent.config.header_['clock']
							: appComponent.config.header['clock'] !== undefined
							? appComponent.config.header['clock']
							: false
					" class="hidden md:block"/>
            <RouterLink
              v-if="
                            appComponent.session.logueado &&
                            config.loyalty[appComponent.country]
                        "
              to="/gestion/mi_lealtad"
              v-bind="analyticsAttrs(`menu:nav:support`)"
              class="h-full relative hidden lg:flex hover:scale-105"
              @click="
                            onSaldo = false;
                            onProfile = false;
                            appComponent.gAnalytics('interaction_store');
                        "
          >
            <img
                src="https://images.virtualsoft.tech/m/msjT1683841601.png"
                alt=""
                class="w-22"
            />
            <div class="absolute top-[8px] left-[34px] text-primary text-center font-bold text-base w-14">
              <span class="text-sm"
            >{{ appComponent.loyalty.points }}</span
            >
            </div>
          </RouterLink>
            <div
                class="indicator relative hover:scale-90 transition-all ease-in-out"
                @click="appComponent.gAnalytics('send_mail')"
            >
                <span
                    class="indicator-item badge badge-primary rounded-2xl text-neutral text-xs xl:text-sm"
                    :class="[appComponent.mensajesUnread == 0 ? 'bg-gray-500' : 'bg-[#23b950]']"
                >
                    {{ appComponent.mensajesUnread }}
                    <!-- Display unread messages count -->
                </span>
                <RouterLink to="/mensajes"  v-bind="analyticsAttrs(`menu:nav:inbox`)">
                    <font-awesome-icon
                        class="text-xl xl:text-2xl icon-envelope text-neutral"
                        icon="fa-solid fa-envelope"
                    />
                </RouterLink>
            </div>
            <details
                title="Saldo"
                id="saldo"
                class="relative z-50 dropdown dropdown-end group"
            >
                <summary
                    @click="onUserBalance()"
                    class="px-1 xl:px-3 py-1 list-none text-center text-neutral-content text-base flex flex-nowrap justify-between items-center rounded-full gap-x-1 border-solid border-2 lg:border-4 cursor-pointer border-primary bg-neutral"
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
                </summary>
                <ul
                    class="bg-neutral text-neutral-content rounded-box w-full absolute overflow-hidden flex flex-col justify-center items-center border-solid border-2 border-primary"
                    v-if="appComponent.typeUser == 'U' && appComponent.session.wallet != '1' && onSaldo"
                >
                    <li
                        @click="appComponent.refreshBalance2()"
                        class="flex flex-row justify-center items-center flex-nowrap gap-2 cursor-pointer hover:bg-neutral-content/10 w-full p-2"
                    >
                        <span class="font-poppinssb text-xs xl:text-sm text-center p-0 w-[90%]">{{
                            $t('Actualizar Saldo')
                        }}</span>
                        <font-awesome-icon
                            class="text-neutral-content cursor-pointer text-xs xl:text-sm w-[10%]"
                            icon="fa-solid fa-refresh"
                        />
                    </li>
                    <hr class="border-t-1 border-solid border-neutral-content/10 w-11/12" />
                    <li
                        class="cursor-pointer w-full hover:bg-neutral-content/10 p-2"
                        v-if="config.header.typeBalance == undefined ? true : config.header.typeBalance.saldo_recarga"
                    >
                        <RouterLink
                            to="/gestion/deposito"
                            v-bind="analyticsAttrs(`menu:nav:support`)"
                            class="text-xs xl:text-sm font-poppinssl flex flex-col justify-center items-center gap-0"
                        >
                            <span class="font-poppinssb text-xs xl:text-sm">{{ $t('Saldo Recargas:') }}</span>
                            <span
                                >{{ appComponent.session.moneda }}
                                {{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}</span
                            >
                        </RouterLink>
                    </li>
                    <hr class="border-t-1 border-solid border-neutral-content/10 w-11/12" />
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
                    <hr class="border-t-1 border-solid border-neutral-content/10 w-11/12" />
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
                            class="mt-2 border-1 rounded-md px-1 border-solid border-neutral-content mx-auto mb-4"
                        >
                            {{ $t('Consultar') }}
                            <!-- Button to consult balance -->
                            <font-awesome-icon
                                class="fa-refresh2 text-neutral-content text-sm group-active:-rotate-[920deg] group-active:transition-none transition-all ease-in-out duration-[5500ms]"
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
                        class="w-full flex justify-center items-center p-2"
                    >
                        <RouterLink
                            to="/gestion/deposito"
                            v-bind="analyticsAttrs(`menu:nav:support`)"
                            class="btn btn-xs bg-success bg-gradient-to-b from-success to-neutral-content/20 text-neutral rounded-xl"
                            >{{ $t('Depositar') }}
                        </RouterLink>
                    </li>
                </ul>
            </details>
            <button
                class="rounded-full font-poppinssl text-xs xl:text-sm btn bg-gray-100 btn-xs xl:btn-sm capitalize hover:shadow-inset transition-all ease-in-out"
                id="cerrar_sesion"
                @click="
                    logOut();
                    appComponent.gAnalytics('exit_profile');
                "
            >
                {{ $t('Salir') }}
                <!-- Logout button text -->
            </button>
            <div
            class="hidden lg:flex hover:scale-105"
            v-if="
                        config.header_ != undefined &&
                        config.header_.change_language != undefined
                            ? config.header_.change_language
                            : config.language.showSelectLang
                    "
        >
          <div
              class="dropdown dropdown-end flex items-center gap-1"
              @click="openSelectLang = !openSelectLang"
          >
            <div
                tabindex="0"
                class="m-1 btn btn-xs flex justify-center items-center text-sm gap-1"
            >
              <span :class="'country-flags ' + appComponent.selectFlag"></span>
              <span>{{ appComponent.lngProd }}</span>
            </div>
            <ul
                tabindex="0"
                class="menu dropdown-content bg-neutral rounded-box w-22 text-neutral-content mt-44"
                v-if="openSelectLang"
            >
              <li
                  v-for="country in appComponent.countries"
                  @click="
                                    appComponent.changeLanguage(country.name, country.flag),
                                        (openSelectLang = false)
                                "
              >
                                <span>
                                    <span :class="'country-flags ' + country.flag"></span>
                                    {{ country.name.toLocaleUpperCase() }}
                                </span>
              </li>
            </ul>
          </div>
        </div>
        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

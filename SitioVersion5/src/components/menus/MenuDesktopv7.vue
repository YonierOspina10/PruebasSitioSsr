<script lang="ts">
import { defineComponent } from 'vue';
import IconMenu from '../icons/IconMenu.vue';
import IconEnter from '../icons/IconEnter.vue';
import ArrowDownIcon from '../icons/ArrowDownIcon.vue';
import apiService from '@/services/ApiService';
import IconHandsUp from '../icons/IconHandsUp.vue';
import router from '@/router';
import IconHouse from '../icons/IconHouse.vue';
import searchIcon from '../icons/searchIcon.vue';
import Notification from '@/components/Notification.vue';
import WalletIcon from '../icons/WalletIcon.vue';
import SearchGames from '../SearchGames.vue';
import { useGlobalStore } from '@/stores/global';
import ClockUser from '../ClockUser.vue';

/**
 * Main component definition
 */
export default defineComponent({
    data() {
        // Configuration and state variables initialization
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        let refreshBalance = this.$refreshBalance;
        let onSaldo = false; // Indicates if the user balance is being tracked
        let showScroll = false; // Indicates if scrolling is needed
        let openSearch = false; // Indicates if the search component is open
        let globalStore = useGlobalStore(); // Global state management
        return {
            showScroll,
            config,
            appComponent,
            refreshBalance,
            onSaldo,
            openSearch,
            globalStore,
        };
    },
    components: {
        SearchGames,
        searchIcon,
        IconHandsUp,
        ArrowDownIcon,
        IconHouse,
        IconMenu,
        IconEnter,
        WalletIcon,
        Notification,
        ClockUser
    },
    created() {
        // Event listener for window resize to manage scroll visibility
        window.addEventListener('resize', () => {
            const bar = this.$refs.listMenu as HTMLElement;
            if (bar?.scrollWidth - bar?.clientWidth != 0) this.showScroll = true;
            else this.showScroll = false;
        });
    },
    methods: {
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv7|layout:layout-${this.appComponent.config.layout}`
            };
        },
        /**
         * Opens a URL in the top window
         * @param box - Object containing the URL to open
         */
        clickBox(box: any) {
            window.open(box.url, '_top');
        },
        /**
         * Scrolls the menu to the right
         */
        scrollRight() {
            const bar = this.$refs.listMenu as HTMLElement;
            const resultBar = bar?.scrollWidth - bar?.clientWidth;
            if (Math.trunc(bar?.scrollLeft) == resultBar - 1) {
                bar?.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                bar?.scrollTo({
                    top: 0,
                    left: bar?.scrollLeft + 80,
                    behavior: 'smooth',
                });
            }
        },
        /**
         * Navigates to a specified URL or shows a deposit modal based on conditions
         * @param url - The URL to navigate to
         * @param id - The identifier for the action
         */
        goTo(url, id) {
            if (
                id == 'accion_depositar' &&
                this.appComponent.config.showModalDeposit != undefined &&
                this.appComponent.config.showModalDeposit[this.appComponent.country]
            ) {
                this.appComponent.showModalDepositV2 = true;
            } else {
                this.$router.push(url);
            }
        },
        /**
         * Toggles user balance tracking
         */
        onUserBalance() {
            const params = {
                source: 'user_balances',
                subscribe: true,
                what: { profile: [] },
            };
            if (!this.onSaldo) {
                this.appComponent.refreshBalance2();
            }
            this.onSaldo = !this.onSaldo;
        },
        /**
         * Logs out the user and resets session data
         */
        logOut() {
            if ((window as any).ws != undefined) {
                (window as any).ws.close();
            }
            const vthis = this;
            apiService.request('logout', {}).then((response: any) => {
                if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
                    vthis.appComponent.tokenSB = '';
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
                    };
                    apiService.setAuthToken('');
                    try {
                        (window as any).altenarWSDK.set({ token: '' });
                    } catch (e) {}
                    window.localStorage.removeItem('auth_token');
                    vthis.appComponent.tokenUser = '';
                }
            });
            this.appComponent.tokenSB = '';
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
            };
            apiService.setAuthToken('');
            this.appComponent.tokenUser = '';
            window.localStorage.removeItem('auth_token');
            this.appComponent.loadView = false;
            if (this.appComponent.config.versionAltenar == '2') {
                window.location.href = '/';
            }
            router.push('/');
            setTimeout(() => {
                this.appComponent.loadView = true;
            }, 1000);
        },
    },
    mounted() {
        // Initial check for scroll visibility and menu configuration based on user session
        const bar = this.$refs.listMenu as HTMLElement;
        if (bar?.scrollWidth - bar?.clientWidth != 0) this.showScroll = true;
        else this.showScroll = false;
        if (this.appComponent.session.logueado) {
            if (
                this.config != undefined &&
                this.config['login'] != undefined &&
                this.config['login']['menu'] != undefined
            ) {
                this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] = this.config['login']['menu'];
            }
        } else {
            if (
                this.config != undefined &&
                this.config['not_login'] != undefined &&
                this.config['not_login']['menu'] != undefined
            ) {
                this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu'];
            }
        }
    },
});
</script>
<template>
    <!-- Main container for the header -->
    <div class="flex flex-col fixed z-[999] w-full">
        <!-- Top bar with logo and menu -->
        <div class="w-full h-[60px] bg-base-300 flex justify-between px-1 xl:px-3 shrink-0">
            <section class="w-full h-full flex lg:gap-x-2 xl:gap-x-7">
                <!-- Left section with menu button and logo -->
                <div
                    class="flex flex-row justify-start items-center gap-x-1 lg:gap-x-2 max-w-[200px] min-w-[120px] w-[16%]"
                >
                    <label
                        id="openMenu"
                        for="main-menu"
                        class="drawer-button text-neutral hover:cursor-pointer"
                        v-bind="analyticsAttrs('menu:toggle')"
                        @click="() => (globalStore.onMenuMain = !globalStore.onMenuMain)"
                    >
                        <IconMenu class="w-9 h-9 text-primary-content" />
                    </label>
                    <RouterLink
                        to="/home"
                        v-bind="analyticsAttrs('header:logo')"
                        class="flex justify-center items-center w-full h-full"
                    >
                        <img
                            width="100"
                            height="100"
                            class="object-contain w-full h-full"
                            :src="config.header.logo.src"
                            alt="Logo"
                        />
                    </RouterLink>
                </div>
                <!-- Menu items for non-logged-in users -->
                <ol
                    v-if="!appComponent.session.logueado"
                    class="hidden lg:flex justify-around items-center lg:gap-x-2 w-full"
                >
                    <li
                        v-for="value in config.MENU_NOLOGUEADO[appComponent.country]"
                        class="text-neutral group flex justify-center items-center"
                    >
                        <RouterLink
                            active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                            :id="value.MENU_ID"
                            :to="value.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            class="flex flex-row gap-x-2 justify-center group items-center hover:text-primary-content p-1 relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                            v-if="!value.IS_MOBILE && value.TARGER == undefined && !value.MENU_URL.includes('http')"
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt="icon"
                                    class="group-hover:brightness-75 w-9 h-9 min-w-[20px] min-h-[20px] object-contain [filter:_invert(1)_brightness(10)_contrast(1)] shrink-0"
                                />
                                <span
                                    v-if="value.MENU_MOBILE == undefined || value.MENU_MOBILE"
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                            <span class="text-center uppercase font-poppinsm leading-4 text-xs xl:text-sm">{{
                                $t(value.MENU_TITLE)
                            }}</span>
                            <ArrowDownIcon
                                v-if="value.SUB_MENU"
                                class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                            ></ArrowDownIcon>
                            <ul
                                v-if="value.SUB_MENU"
                                tabindex="0"
                                class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                            >
                                <li
                                    v-for="menu in value.SUB_MENU"
                                    class="border-solid border-b-1 border-primary-content last:border-transparent bg-primary-content/90 my-2 rounded-full shadow-[inset_-1px_-13px_17px] shadow-neutral-content/50 hover:scale-105 transition-all ease-out"
                                >
                                    <RouterLink
                                        :to="menu.MENU_URL"
                                        v-bind="analyticsAttrs(`header:submenu:${menu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                        class="flex py-2 pl-6 hover:brightness-75 font-poppinssb uppercase"
                                        >{{ menu.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </RouterLink>
                        <a
                            target="_blank"
                            active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                            :id="value.MENU_ID"
                            :href="value.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            class="flex flex-row gap-x-2 justify-center group items-center hover:text-primary-content p-1 relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                            v-if="!value.IS_MOBILE && value.TARGER == undefined && value.MENU_URL.includes('http')"
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt="icon"
                                    class="group-hover:brightness-75 w-9 h-9 min-w-[20px] min-h-[20px] object-contain [filter:_invert(1)_brightness(10)_contrast(1)] shrink-0"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                            <span class="text-center uppercase font-poppinsm leading-4 text-xs xl:text-sm">{{
                                $t(value.MENU_TITLE)
                            }}</span>
                            <ArrowDownIcon
                                v-if="value.SUB_MENU"
                                class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                            ></ArrowDownIcon>
                            <ul
                                v-if="value.SUB_MENU"
                                tabindex="0"
                                class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                            >
                                <li
                                    v-for="menu in value.SUB_MENU"
                                    class="border-solid border-b-1 border-primary-content last:border-transparent bg-primary-content/90 my-2 rounded-full shadow-[inset_-1px_-13px_17px] shadow-neutral-content/50 hover:scale-105 transition-all ease-out"
                                >
                                    <RouterLink
                                        :to="menu.MENU_URL"
                                        class="flex py-2 pl-6 hover:brightness-75 font-poppinssb uppercase"
                                        >{{ menu.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </a>
                    </li>
                </ol>
                <!-- Menu items for logged-in users -->
                <ol
                    v-else
                    class="hidden lg:flex justify-around items-center lg:gap-x-2 xl:gap-x-5 w-full"
                >
                    <li
                        v-for="value in config.MENU_USUARIO_LOGUEADO[appComponent.country]"
                        class="text-neutral group flex justify-center items-center"
                    >
                        <RouterLink
                            active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                            :id="value.MENU_ID"
                            :to="value.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            class="flex flex-row gap-x-2 justify-center items-center hover:text-primary-content p-1 group relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                            v-if="!value.IS_MOBILE && value.TARGER == undefined && !value.MENU_URL.includes('http')"
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt="icon"
                                    class="group-hover:brightness-75 min-w-[20px] min-h-[20px] w-9 h-9 object-contain [filter:_invert(1)_brightness(10)_contrast(1)] shrink-0"
                                />
                                <span
                                    v-if="value.MENU_MOBILE == undefined || value.MENU_MOBILE"
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                            <span class="text-center uppercase font-poppinsm leading-4 text-xs xl:text-sm">{{
                                $t(value.MENU_TITLE)
                            }}</span>
                            <ArrowDownIcon
                                v-if="value.SUB_MENU"
                                class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                            ></ArrowDownIcon>
                            <ul
                                v-if="value.SUB_MENU"
                                tabindex="0"
                                class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                            >
                                <li
                                    v-for="menu in value.SUB_MENU"
                                    class="border-solid border-b-1 border-primary-content last:border-transparent bg-primary-content/90 my-2 rounded-full shadow-[inset_-1px_-13px_17px] shadow-neutral-content/50 hover:scale-105 transition-all ease-out"
                                >
                                    <RouterLink
                                        :to="menu.MENU_URL"
                                        v-bind="analyticsAttrs(`header:submenu:${menu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                        class="flex py-2 pl-6 hover:brightness-75 font-poppinssb uppercase"
                                        >{{ menu.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </RouterLink>
                        <a
                            active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                            :id="value.MENU_ID"
                            target="_blank"
                            :href="value.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            class="flex flex-row gap-x-2 justify-center items-center hover:text-primary-content p-1 group relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                            v-else
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt="icon"
                                    class="group-hover:brightness-75 min-w-[20px] min-h-[20px] w-9 h-9 object-contain [filter:_invert(1)_brightness(10)_contrast(1)] shrink-0"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                            <span class="text-center uppercase font-poppinsm leading-4 text-xs xl:text-sm">{{
                                $t(value.MENU_TITLE)
                            }}</span>
                            <ArrowDownIcon
                                v-if="value.SUB_MENU"
                                class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                            ></ArrowDownIcon>
                            <ul
                                v-if="value.SUB_MENU"
                                tabindex="0"
                                class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                            >
                                <li
                                    v-for="menu in value.SUB_MENU"
                                    class="border-solid border-b-1 border-primary-content last:border-transparent bg-primary-content/90 my-2 rounded-full shadow-[inset_-1px_-13px_17px] shadow-neutral-content/50 hover:scale-105 transition-all ease-out"
                                >
                                    <RouterLink
                                        :to="menu.MENU_URL"
                                        class="flex py-2 pl-6 hover:brightness-75 font-poppinssb uppercase"
                                        >{{ menu.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </a>
                    </li>
                </ol>
            </section>
            <!-- Right section with buttons for non-logged-in users -->
            <div
                v-if="!appComponent.session.logueado"
                class="flex justify-end items-center gap-x-4 mr-2 lg:mr-0 w-auto full"
            >
                <button
                    id="accion_registrate"
                    aria-label="register"
                    v-bind="analyticsAttrs('header:signup-btn')"
                    class="text-center px-3 py-2 flex items-center rounded-full bg-primary-content hover:scale-105 transition-all ease-out hover:brightness-90 font-poppinssb uppercase text-neutral-content text-xs xl:text-sm"
                    @click="
                        appComponent.gAnalytics('menu_top', 'accion_registrate');
                        appComponent.modal.showModal = 'register';
                    "
                >
                    {{ $t('Regístrate') }}
                </button>
                <button
                    id="accion_iniciarsesion"
                    aria-label="login"
                    v-bind="analyticsAttrs('header:login-btn')"
                    class="text-center px-3 truncate py-2 bg-neutral leading-4 hover:brightness-90 rounded-full text-neutral-content uppercase font-poppinssb hover:scale-105 transition-all ease-out text-xs xl:text-sm"
                    @click="
                        appComponent.gAnalytics('menu_top', 'accion_iniciarsesion');
                        appComponent.showModalLogin = true;
                    "
                >
                    {{ $t('Iniciar Sesión') }}
                </button>
                <button
                    @click="() => (openSearch = !openSearch)"
                    v-bind="analyticsAttrs('header:search')"
                    class="mr-2 hover:scale-90 transition-all"
                >
                    <searchIcon class="w-7 h-7 fill-primary-content"></searchIcon>
                </button>
                <SearchGames
                    v-if="openSearch"
                    @close="() => (openSearch = !openSearch)"
                    class="absolute z-50 w-full lg:w-[40%] top-2 lg:top-1.5 right-0 lg:right-2"
                ></SearchGames>
            </div>
            <!-- Right section with buttons for logged-in users -->
            <div
                class="flex justify-end items-center gap-2 xl:gap-3 flex-nowrap shrink-0 w-auto h-full"
                v-else
            >
            <ClockUser
                v-if="
                appComponent.session.logueado &&
                    appComponent.config.header_ != undefined && appComponent.config.header_.clock != undefined
                        ? appComponent.config.header_.clock
                        : appComponent.config.header !== undefined && appComponent.config.header.clock !== undefined
                        ? appComponent.config.header.clock
                        : false
                "
                    class="hidden md:block"
                    />
                <Notification
                    v-if="
                        appComponent.config.header !== undefined &&
                        appComponent.config.header.notificationButton !== undefined &&
                        appComponent.config.header.notificationButton[appComponent.country] !== undefined &&
                        appComponent.config.header.notificationButton[appComponent.country]
                    "
                />
                <div
                    title="Saldo"
                    id="saldo"
                    class="relative z-50 dropdown cursor-pointer transition-all ease-in-out"
                >
                    <div
                        role="button"
                        tabindex="0"
                        @click="onUserBalance()"
                        v-bind="analyticsAttrs('header:balance')"
                        class="list-none flex flex-row rounded-l-md rounded-r-full shadow-[0px_2px_3px_1px] shadow-neutral-content/40 w-9 h-9 hover:scale-95 transition-all ease-in-out"
                        id="saldo_usuario_principal"
                    >
                        <p
                            class="-top-1 -right-1 truncate overflow-hidden w-[1.2rem] h-[1.2rem] flex justify-center items-center text-center rounded-full text-xs absolute bg-red-700 font-poppinsb text-neutral"
                        >
                            {{ appComponent.mensajesUnread }}
                        </p>
                        <span
                            class="rounded-full w-9 h-9 bg-neutral overflow-hidden flex justify-center items-center min-w-[2.25rem]"
                        >
                            <img
                                src="https://images.virtualsoft.tech/m/msj18212T1713038457.png"
                                alt="avatar"
                                class="w-full h-full object-cover"
                            />
                        </span>
                    </div>
                    <div
                        tabindex="1"
                        id="container_user_details"
                        :class="[
                            'bg-base-200 min-w-[250px] rounded-xl absolute -right-28 top-14 gap-4 dropdown-content menu',
                            'flex justify-center items-center flex-col p-5',
                            'after:absolute after:w-7 after:h-7 after:bg-base-200  after:rotate-45 after:-top-2 after:right-28',
                        ]"
                    >
                        <div
                            id="user_details"
                            class="flex flex-col justify-center items-center gap-2 w-full relative z-[99999999]"
                        >
                            <button
                                class="w-full flex flex-col justify-center items-start uppercase rounded-xl text-neutral p-1 text-lg"
                            >
                                <p class="font-poppinsb">
                                    {{ $t('Saldo Retiro:') }}
                                </p>
                                <p class="font-poppinsb">
                                    {{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}
                                </p>
                            </button>
                            <RouterLink
                                to="/gestion/deposito"
                                class="w-full flex flex-col justify-center items-start rounded-xl text-neutral uppercase text-lg p-1 transition-all"
                                v-bind="analyticsAttrs('header:balance:recharge-btn')"
                            >
                                <p class="font-poppinsb">
                                    {{ $t('Saldo Recargas:') }}
                                </p>
                                <p class="font-poppinsb">
                                    {{ appComponent.session.moneda }}
                                    {{ Math.abs(appComponent.saldo_recarga).toFixed(2) }}
                                </p>
                            </RouterLink>
                            <button
                                class="w-full flex flex-col justify-center items-start text-neutral rounded-xl text-lg p-1 uppercase"
                            >
                                <p class="font-poppinsb text-start">
                                    {{ $t('Saldo Freebet y Bonos:') }}
                                </p>
                                <p class="font-poppinsb">
                                    {{ appComponent.session.moneda }}
                                    {{
                                        Math.abs(
                                            (Number(appComponent.saldo_freebet) || 0) +
                                                (Number(appComponent.saldo_bono) || 0),
                                        ).toFixed(2)
                                    }}
                                </p>
                            </button>
                            <button
                                @click="appComponent.refreshBalance2()"
                                class="w-full p-2 mb-3 bg-primary-content text-neutral group text-lg uppercase rounded-full relative flex justify-center items-center font-poppinssb hover:brightness-95 hover:scale-95 transition-all gap-2"
                                v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-btn')"
                            >
                                {{ $t('Actualizar') }}
                                <font-awesome-icon
                                    class="group-active:rotate-180 group-active:transition-none group-active:duration-[0] transition-all ease-in-out duration-1000 text-xl xl:text-sm w-[10%] hover:scale-105 hover:brightness-90 z-1"
                                    icon="fa-solid fa-refresh"
                                />
                            </button>
                            <RouterLink
                                to="/mensajes"
                                v-bind="analyticsAttrs('header:user-menu:inbox')"
                                class="w-full p-2 bg-base-200 border border-accent-focus text-lg text-neutral uppercase rounded-full relative flex justify-center items-center font-poppinssb hover:brightness-95 hover:scale-95 transition-all gap-6"
                            >
                                <svg 
                                    width='26' 
                                    height='26' 
                                    viewBox='0 0 26 26' 
                                    fill='none' 
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M3 4C1.344 4 0 5.344 0 7V19C0 20.656 1.344 22 3 22H23C24.656 22 26 20.656 26 19V7C26 5.344 24.656 4 23 4H3ZM3 6H23C23.551 6 24 6.449 24 7V7.5L13 13.438L2 7.5V7C2 6.449 2.449 6 3 6ZM2 7.781L8.531 12.875L2.125 19.438L9.938 13.875L13 15.844L16.063 13.875L23.875 19.438L17.469 12.875L24 7.781V19C23.9945 19.154 23.9516 19.3043 23.875 19.438C23.71 19.763 23.389 20 23 20H3C2.611 20 2.29 19.764 2.125 19.438C2.04859 19.3046 2.00569 19.1536 2 19V7.781Z' fill='currentColor'/>
                                </svg>
                                {{ $t('Mensajería') }}
                                <p
                                    class="font-poppinsb -top-1 -right-0 truncate overflow-hidden w-6 h-6 flex justify-center items-center text-center rounded-full text-xs absolute bg-red-700 text-neutral"
                                >
                                    {{ appComponent.mensajesUnread }}
                                </p>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <RouterLink
                    to="/gestion/deposito"
                    id="accion_depositar"
                    v-bind="analyticsAttrs('header:deposit-btn')"
                    aria-label="register"
                    class="text-center px-7 py-2 rounded-full flex items-center bg-success hover:scale-95 transition-all ease-out hover:brightness-90 font-poppinssb uppercase text-neutral-content text-xs xl:text-sm"
                >
                    {{ $t('Depositar') }}
                </RouterLink>
                <button
                    @click="() => (openSearch = !openSearch)"
                    v-bind="analyticsAttrs('header:search')"
                    class="mr-2 hover:scale-90 transition-all"
                >
                    <searchIcon class="w-7 h-7 fill-primary-content"></searchIcon>
                </button>
                <SearchGames
                    v-if="openSearch"
                    @close="() => (openSearch = !openSearch)"
                    class="absolute z-50 w-full lg:w-[40%] top-2 lg:top-1.5 right-0 lg:right-2"
                ></SearchGames>
            </div>
        </div>
        <!-- Mobile menu for smaller screens -->
        <div class="w-full h-auto lg:hidden bg-neutral-content flex">
            <ol
                v-if="!appComponent.session.logueado"
                ref="listMenu"
                class="flex justify-start sm:justify-around items-center gap-x-2 mx-3 py-1 bg-neutral-content w-full overflow-auto"
            >
                <template v-for="value in config.MENU_NOLOGUEADO[appComponent.country]">
                    <li
                        v-if="value.MENU_MOBILE == undefined || !value.MENU_MOBILE"
                        class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                    >
                        <RouterLink
                            active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                            :id="value.MENU_ID"
                            :to="value.MENU_URL"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                            v-if="!value.IS_MOBILE && value.TARGER == undefined && !value.MENU_URL.includes('http')"
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt=""
                                    class="w-11"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                        </RouterLink>
                        <a
                            active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                            :id="value.MENU_ID"
                            target="_blank"
                            :href="value.MENU_URL"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                            v-else
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt=""
                                    class="w-11"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                        </a>
                    </li>
                    <template v-else>
                        <li
                            v-for="submenu in value.SUB_MENU"
                            class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                        >
                            <RouterLink
                                active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                                :id="value.MENU_ID"
                                :to="submenu.MENU_URL"
                                v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                                class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                                v-if="
                                    !submenu.IS_MOBILE &&
                                    submenu.TARGER == undefined &&
                                    !submenu.MENU_URL.includes('http')
                                "
                            >
                                <div class="relative">
                                    <img
                                        :src="submenu.MENU_ICON"
                                        width="15"
                                        height="15"
                                        alt=""
                                        class="w-11"
                                    />
                                    <span
                                        class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                        >{{ submenu.MENU_TEXT }}</span
                                    >
                                </div>
                            </RouterLink>
                            <a
                                active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                                :id="value.MENU_ID"
                                target="_blank"
                                :href="submenu.MENU_URL"
                                v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                                class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                                v-else
                            >
                                <div class="relative">
                                    <img
                                        :src="submenu.MENU_ICON"
                                        width="15"
                                        height="15"
                                        alt=""
                                        class="w-11"
                                    />
                                    <span
                                        class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                        >{{ submenu.MENU_TEXT }}</span
                                    >
                                </div>
                            </a>
                        </li>
                    </template>
                </template>
            </ol>
            <ol
                v-else
                ref="listMenu"
                class="flex justify-start sm:justify-around items-center gap-x-2 mx-3 py-1 bg-neutral-content w-full overflow-auto"
            >
                <template v-for="value in config.MENU_USUARIO_LOGUEADO[appComponent.country]">
                    <li
                        v-if="value.MENU_MOBILE == undefined || !value.MENU_MOBILE"
                        class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                    >
                        <RouterLink
                            active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                            :id="value.MENU_ID"
                            :to="value.MENU_URL"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                            v-if="!value.IS_MOBILE && value.TARGER == undefined && !value.MENU_URL.includes('http')"
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt=""
                                    class="w-11"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                        </RouterLink>
                        <a
                            active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                            :id="value.MENU_ID"
                            target="_blank"
                            :href="value.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                            class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                            v-else
                        >
                            <div class="relative">
                                <img
                                    :src="value.MENU_ICON"
                                    width="15"
                                    height="15"
                                    alt=""
                                    class="w-11"
                                />
                                <span
                                    class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                    >{{ value.MENU_TEXT }}</span
                                >
                            </div>
                        </a>
                    </li>
                    <template v-else>
                        <li
                            v-for="submenu in value.SUB_MENU"
                            class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                        >
                            <RouterLink
                                active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                                :id="value.MENU_ID"
                                :to="submenu.MENU_URL"
                                @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                                v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                                v-if="
                                    !submenu.IS_MOBILE &&
                                    submenu.TARGER == undefined &&
                                    !submenu.MENU_URL.includes('http')
                                "
                            >
                                <div class="relative">
                                    <img
                                        :src="submenu.MENU_ICON"
                                        width="15"
                                        height="15"
                                        alt=""
                                        class="w-11"
                                    />
                                    <span
                                        class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                        >{{ submenu.MENU_TEXT }}</span
                                    >
                                </div>
                            </RouterLink>
                            <a
                                active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                                :id="value.MENU_ID"
                                target="_blank"
                                :href="submenu.MENU_URL"
                                @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                                v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                                v-else
                            >
                                <div class="relative">
                                    <img
                                        :src="submenu.MENU_ICON"
                                        width="15"
                                        height="15"
                                        alt=""
                                        class="w-11"
                                    />
                                    <span
                                        class="bg-red-700 absolute bottom-0 right-0 rounded-full px-1 leading-3 text-[0.40rem] text-nowrap overflow-hidden max-w-[40px] text-ellipsis break-words whitespace-nowrap"
                                        >{{ submenu.MENU_TEXT }}</span
                                    >
                                </div>
                            </a>
                        </li>
                    </template>
                </template>
            </ol>
            <span
                @click="scrollRight()"
                class="bg-neutral-content relative flex justify-center items-center sm:hidden pr-3"
            >
                <ArrowDownIcon
                    v-if="showScroll"
                    class="fill-primary-content w-9 h-9 -rotate-90"
                ></ArrowDownIcon>
            </span>
        </div>
    </div>
</template>
<style scoped>
/* No scoped styles defined in this fragment */
</style>

<!-- FILE DOCUMENTED -->

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
import ThemeButton from '../ThemeButton.vue';

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
        ThemeButton
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
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {
        this.clickD(); // Initialize click event listener
    },

    methods: {
        /**
         * Sets up a click event listener to close the menu when clicking outside.
         */
        clickD() {
            document.addEventListener('click', (e: any) => {
                if (e.target.offsetParent.matches('#menuMobile') || e.target.matches('#openMenu')) {
                    // Do nothing if clicking on the mobile menu or open menu button
                } else {
                    this.closeMenu(); // Close the menu if clicking outside
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
            this.closeMenu(); // Close the menu before opening chat
            let ref_id: any = 'cen_ifr_static'; // Reference ID for chat iframe
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden'); // Show chat iframe
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open'); // Open chat iframe
                postMessage('show_chat', '', ref_id); // Post message to show chat
            } else {
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
                'data-analytics-context': `component:MenuMobile7|layout:layout-${this.appComponent.config.layout}`,
            };
        },
    },
});
</script>
<template>
    <!-- Mobile menu container with fixed position and gradient background -->
    <aside
        id="menuMobile"
        class="menu_mobile fixed bg-base-300 bg-gradient-to-r from-primary-focus/20 to-primary-focus/70 w-full md:w-[25%] h-full z-[9999] top-0 transition-all flex flex-col justify-start overflow-y-auto menu_desktop"
        :style="[{ left: globalStore.onMenuMain ? '0' : '-100%' }]"
    >
        <article class="relative flex flex-col justify-center items-center pt-10">
            <!-- User account section, displayed if user is logged in and not in appPOS -->
            <div
                v-if="appComponent.session.logueado && !appComponent.appPOS"
                class="w-full h-32 flex justify-center items-center gap-1 mt-10"
            >
                <RouterLink
                    to="/gestion/gestion_cuenta"
                    @click="closeMenu()"
                    class="w-20"
                >
                    <img
                        src="https://images.virtualsoft.tech/m/msjT1683329139.png"
                        alt=""
                        class="border-primary-content border-1 rounded-full"
                    />
                </RouterLink>
                <div
                    v-if="!appComponent.appPOS"
                    class="flex flex-col justify-center items-center gap-1"
                >
                    <p
                        class="text-neutral text-2xl w-60 text-center capitalize"
                    >
                        {{ appComponent.session.nombre }}
                    </p>
                    <div
                        class="text-neutral text-xl w-52 text-center border-primary-content h-12 border-2 rounded-full flex justify-around items-center"
                    >
                        <p>
                            ID:
                            <span id="UID">
                                {{ appComponent.session.usuario }}
                            </span>
                        </p>
                        <button
                            class="h-8 w-8 flex justify-center items-center rounded-full hover:scale-105 transition-all ease-in-out"
                            :class="
								!copy ? 'bg-accent' : 'bg-primary'
							"
                            @click="copyID()"
                        >
                            <CopyIcon
                                class="text-accent-focus"
                                :width="20"
                                :height="20"
                            />
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Close menu button -->
            <div class="absolute right-3 top-3 flex justify-end items-center gap-3 z-[110]">
                <ThemeButton @click.stop/>
                <button
                    @click="closeMenu()"
                    class="hover:scale-105"
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
            <!-- Component where the clock for the regulation is reflected -->
            <ClockUser
                v-if="
                appComponent.session.logueado &&
                    appComponent.config.header_ != undefined && appComponent.config.header_.clock != undefined
                        ? appComponent.config.header_.clock
                        : appComponent.config.header !== undefined && appComponent.config.header.clock !== undefined
                        ? appComponent.config.header.clock
                        : false
                "
                class="block md:hidden"
            />
            <!-- Deposit button, displayed if user is logged in -->
            <div
                v-if="appComponent.session.logueado"
                class="w-full h-20 flex justify-center items-center mt-5"
            >

                <RouterLink
                    class="w-9/12 h-14 bg-success rounded-full flex justify-center items-center"
                    to="/gestion/deposito"
                    @click="closeMenu()"
                    data-analytics-label="menu:deposit"
                    :data-analytics-context="`component:MenuMobile7|layout:${appComponent.config.layout}`"
                >
                    <p class="text-2xl font-bold">
                        {{ $t('DEPOSITAR') }}
                    </p>
                </RouterLink>
            </div>
        </article>
        <article
            class="flex flex-col items-center mt-4"
            :class="appComponent.session.logueado ? '' : 'pt-5'"
        >
            <!-- Main container for the logged-in user's menu -->
            <div
                v-if="appComponent.session.logueado"
                class="w-full text-neutral"
            >
                <!-- User menu list, displayed if appPOS is not active -->
                <ul
                    v-if="!appComponent.appPOS"
                    class="flex flex-col gap-5 justify-center items-center"
                    :class="appComponent.session.logueado ? 'mb-5' : 'mb-20'"
                >
                    <!-- Loop through the menu items for logged-in users -->
                    <li
                        v-for="(value, i) in config.MENU_USUARIO_LOGUEADO_MOBILE[appComponent.country]"
                        class="uppercase h-full w-full flex justify-center items-center gap-4"
                        :class="
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap'
                        "
                    >
                        <!-- Router link for menu items without a target -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="rounded-xl p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            :class="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0 ? 'w-[69%]' : 'w-9/12'"
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
                                    class="w-8 h-8 object-contain object-center"
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
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
                        <a
                            id="accion_chat"
                            target="_blank"
                            :href="value.MENU_URL"
                            v-else-if="value.TARGER == 'chat'"
                            class="p-3 bg-gradient-to-r from-primary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-2xl"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile7|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
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
                                    class="titles font-bold text-lg text-white hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </a>
                        <!-- Router link for verification action -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
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
                                                <span
                                                    class="titles text-base font-medium text-neutral"
                                                >{{
                                                        $t(
                                                            submenus.SUBMENU_TITLE
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <!-- Logout button for the user -->
                    <button
                        v-if="appComponent.session.logueado"
                        class="bg-primary-content p-2 w-3/5 flex justify-center items-center rounded-full gap-2 shadow-[inset_1px_-10px_17px_3px] shadow-primary-focus hover:scale-105"
                        @click="
                            appComponent.logOut();
                            closeMenu();
                        "
                    >
                        <p class="text-xl font-bold text-neutral">
                            {{ $t('CERRAR SESIÓN') }}
                        </p>
                        <DoorOut
                            :height="22"
                            :width="22"
                            :fill="'#ffffff'"
                            class="ml-1"
                        />
                    </button>
                    <!-- Horizontal rule for separating sections -->
                    <hr
                        v-if="!appComponent.appPOS"
                        class="w-3/4 bg-neutral mt-4"
                    />
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
                        <button
                            id="accion_chat"
                            v-else-if="value.TARGER == 'chat'"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile7|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                            :style="[{ backgroundColor: value.MENU_BG }]"
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
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
                                    class="titles font-medium text-base text-white hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </button>
                        <!-- Router link for verification action in appPOS -->
                        <RouterLink
                            v-else-if="value.TARGER == 'verify'"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :id="value.MENU_ID"
                            active-class="bg-gradient-to-r from-secondary-focus from-90%"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-secondary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
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
                class="w-full text-neutral"
            >
                <ul class="flex flex-col gap-5 justify-center items-center my-10">
                    <li
                        v-for="(value, i) in config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                        class="uppercase h-full w-full flex justify-center items-center gap-4"
                        :class="
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap'
                        "
                    >
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :id="value.MENU_ID"
                            :to="config.baseUrlFx + value.MENU_URL"
                            :active-class="
                                value.MENU_ID == 'accion_registro' ? '' : 'bg-gradient-to-r from-secondary from-90%'
                            "
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs(`${value.MENU_ID === 'accion_registro' ? 'menu:signup-btn' : 'menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-')}`)"
                            class="p-3 lg:hover:scale-105 flex justify-center items-center"
                            :class="
                                value.MENU_ID == 'accion_registro'
                                    ? 'w-10/12 rounded-full'
                                    : value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0
                                    ? 'w-[69%] hover:bg-gradient-to-r hover:from-secondary hover:from-90%'
                                    : 'w-9/12 hover:bg-gradient-to-r hover:from-secondary hover:from-90%'
                            "
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="
                                value.MENU_ID == 'accion_registro' ? (appComponent.modal.showModal = 'register') : ''
                            "
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
                                <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                    <div
                                        v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                        class="w-8 h-8"
                                        v-html="value.MENU_SVG"
                                    ></div>
                                    <img
                                        class="w-9 h-9 object-contain"
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
                                        class="titles font-bold"
                                        :class="
                                            value.MENU_ID == 'accion_registro'
                                                ? 'text-neutral-content text-2xl'
                                                : 'text-lg'
                                        "
                                        :style="[
											{ animationDelay: i + 1 + '0ms' },
											{ color: value.MENU_COLOR },
										]"
                                        >{{ $t(value.MENU_TITLE) }}</span
                                    >
                                </div>
                            </div>
                        </RouterLink>
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
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
                                    class="w-8 h-8 object-contain"
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
                        <a
                            :id="value.MENU_ID"
                            class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
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
                        <a
                            id="accion_chat"
                            target="_blank"
                            :href="value.MENU_URL"
                            v-else-if="value.TARGER == 'chat'"
                            class="p-3 bg-gradient-to-r from-primary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-2xl"
                            data-analytics-label="menu:chat"
                            :data-analytics-context="`component:MenuMobile7|layout:${appComponent.config.layout}`"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
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
                                    class="titles font-bold text-lg text-white hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </a>
                        <button
                            id="accion_inicio_sesion"
                            v-if="value.TARGER == 'inicio_sesion'"
                            class="p-3 lg:hover:scale-105 flex justify-center items-center w-10/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            data-analytics-label="menu:login-btn"
                            :data-analytics-context="`component:MenuMobile7|layout:${appComponent.config.layout}`"
                            @click="appComponent.showModalLogin = true"
                        >
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
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
                                    class="titles font-bold text-xl text-neutral-content hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('INICIAR SESIÓN') }}</span
                                >
                            </div>
                        </button>
                        <!-- Submenu toggle button -->
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
                        <!-- Submenu items, displayed if open -->
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
                class="w-4/5 flex flex-col mb-10"
            >
                <p class="text-primary-content text-lg font-bold ml-3">
                    {{ $t('SERVICIOS') }}
                </p>
                <div
                    tabindex="0"
                    v-for="menu in appComponent.menus_service"
                    class="h-full flex flex-col justify-center items-start pl-4 rounded-xl"
                    :class="'bg-secondary' + menu.MENU_ID"
                >
                    <button
                        class="capitalize w-full rounded-lg flex justify-between items-center gap-2 pt-3 pr-3"
                        @click="menuService(menu.MENU_ID)"
                    >
                        <div class="flex justify-start items-center gap-2">
                            <SettingsIcon
                                :width="25"
                                :height="25"
                            />
                            <p class="text-neutral text-lg">
                                {{ $t(menu.MENU_TITLE) }}
                            </p>
                        </div>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            size="1x"
                            class="text-neutral"
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
                                :class="
									'collection-item avatar-refresh ' +
									submenu.SUBMENU_URL.replace('.php', '')
								"
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
                class="w-3/4 flex flex-col mb-10"
            >
                <p class="text-primary-content text-lg font-bold ml-3">
                    {{ $t('OTROS') }}
                </p>
                <ul class="h-full flex flex-col justify-center items-start pl-4 rounded-xl">
                    <li
                        v-for="value in config.MENU_FOOTER[appComponent.country]"
                        class="hover:scale-105 py-2"
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
                                <span class="text-neutral text-lg font-bold">
                                    {{ $t(value.MENU_TITLE) }}
                                </span>
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
                            <span class="text-neutral text-lg font-bold">
                                {{ $t(value.MENU_TITLE) }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
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

/* Styles for SVG icons */
.svg {
    width: 30px !important; /* Fixed width for SVG icons */
    height: 35px !important; /* Fixed height for SVG icons */
}
</style>

<!-- FILE DOCUMENTED -->

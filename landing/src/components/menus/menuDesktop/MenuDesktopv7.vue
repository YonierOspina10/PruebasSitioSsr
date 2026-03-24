<script lang="ts">
import { defineComponent } from 'vue';
import IconMenu from '../../icons/IconMenu.vue';
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue';
import searchIcon from '../../icons/SearchIcon.vue';
import SearchGames from '../../searchs/searchGames/SearchGames.vue';
import { useGlobalStore } from '../../../stores/Global.ts';
import { useModalStore } from '../../../stores/Modal.ts';

/**
 * Vue component definition for the main application interface.
 */
export default defineComponent({
    components: {
        IconMenu, // Icon for the menu
        ArrowDownIcon, // Icon for dropdown functionality
        searchIcon, // Icon for search functionality
        SearchGames, // Component for searching games
    },

    /**
     * Component data properties.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let globalStore = useGlobalStore(); // Global state management store
        let onSaldo = false; // State for balance visibility
        let showScroll = false; // State for scroll visibility
        let openSearch = false; // State for search visibility
        let modals = useModalStore(); // Modal state management store

        return {
            appComponent,
            refreshBalance,
            globalStore,
            onSaldo,
            showScroll,
            openSearch,
            modals,
        };
    },

    /**
     * Lifecycle hook called when the component is created.
     * Sets up a resize event listener to manage scroll visibility.
     */
    created() {
        window.addEventListener('resize', () => {
            const bar = this.$refs.listMenu as HTMLElement; // Reference to the list menu
            if (bar?.scrollWidth - bar?.clientWidth != 0)
                this.showScroll = true; // Show scroll if necessary
            else this.showScroll = false; // Hide scroll if not necessary
        });
    },

    methods: {
        /**
         * Scrolls the list menu to the right or resets it to the start.
         */
        scrollRight() {
            const bar = this.$refs.listMenu as HTMLElement; // Reference to the list menu
            const resultBar = bar?.scrollWidth - bar?.clientWidth; // Calculate the scrollable width
            if (Math.trunc(bar?.scrollLeft) == resultBar - 1) {
                bar?.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth', // Smooth scrolling effect
                });
            } else {
                bar?.scrollTo({
                    top: 0,
                    left: bar?.scrollLeft + 80, // Scroll right by 80 pixels
                    behavior: 'smooth', // Smooth scrolling effect
                });
            }
        },

        /**
         * Navigates to a specified URL or opens a deposit modal based on conditions.
         * @param url - The URL to navigate to.
         * @param id - Identifier to determine action (e.g., deposit).
         */
        goTo(url, id) {
            if (
                id == 'accion_depositar' &&
                this.appComponent.config.showModalDeposit != undefined &&
                this.appComponent.config.showModalDeposit[this.appComponent.country]
            ) {
                this.appComponent.showModalDepositV2 = true; // Show deposit modal
            } else {
                this.$router.push(url); // Navigate to the specified URL
            }
        },

        /**
         * Toggles the visibility of the main menu.
         */
        openMenu() {
            this.globalStore.onMenuMain = !this.globalStore.onMenuMain; // Toggle menu state
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv7|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },

    /**
     * Lifecycle hook called when the component is mounted.
     * Initializes menu configuration for non-logged-in users.
     */
    mounted() {
        if (
            this.config != undefined &&
            this.config['not_login'] != undefined &&
            this.config['not_login']['menu'] != undefined
        ) {
            this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu']; // Set menu for non-logged-in users
        }
    },
});
</script>
<template>
    <!-- Main navigation container with fixed positioning -->
    <div class="w-full h-[60px] bg-base-300 flex justify-between px-1 xl:px-3 fixed z-[999]">
        <!-- Section containing the logo and menu items -->
        <section class="w-full h-full flex lg:gap-x-2 xl:gap-x-7">
            <!-- Container for logo and menu button -->
            <div
                class="flex flex-row justify-start items-center gap-x-1 lg:gap-x-2 max-w-[200px] min-w-[120px] w-[16%]"
            >
                <!-- Menu button for opening the drawer -->
                <label
                    id="openMenu"
                    for="main-menu"
                    v-bind="analyticsAttrs('menu:toggle')"
                    class="drawer-button text-neutral hover:cursor-pointer"
                    @click="openMenu()"
                >
                    <IconMenu class="w-9 h-9 text-primary-content" />
                </label>
                <!-- Logo link -->
                <RouterLink
                    to="/home"
                    v-bind="analyticsAttrs('header:logo')"
                    class="flex justify-center items-center w-full h-full"
                >
                    <img
                        width="100"
                        height="100"
                        class="object-contain w-full h-full"
                        :src="appComponent.config.header.logo.src"
                        alt="Logo"
                    />
                </RouterLink>
            </div>
            <!-- Navigation menu items -->
            <ol class="hidden lg:flex justify-around items-center lg:gap-x-2 w-full">
                <li
                    v-for="value in appComponent.config.MENU_NOLOGUEADO[appComponent.country]"
                    class="text-neutral group flex justify-center items-center"
                >
                    <!-- RouterLink for menu items -->
                    <RouterLink
                        active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        class="flex flex-row gap-x-2 justify-center group items-center hover:text-primary-content p-1 relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                        v-if="!value.IS_MOBILE && value.TARGER == undefined && !value.MENU_URL.includes('http')"
                    >
                        <!-- Menu icon and text -->
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
                            value.MENU_TITLE
                        }}</span>
                        <ArrowDownIcon
                            v-if="value.SUB_MENU"
                            class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                        ></ArrowDownIcon>
                        <!-- Submenu dropdown -->
                        <ul
                            v-if="value.SUB_MENU"
                            tabindex="0"
                            class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                        >
                            <li
                                v-for="menu in value.SUB_MENU"
                                class="border-solid border-b-1 border-primary-content last:border-transparent py-2 pl-6"
                            >
                                <RouterLink
                                    :to="menu.MENU_URL"
                                    v-bind="analyticsAttrs(`header:submenu:${menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                    class="hover:brightness-75 font-poppinssb uppercase"
                                    >{{ menu.MENU_TITLE }}</RouterLink
                                >
                            </li>
                        </ul>
                    </RouterLink>
                    <!-- External link for menu items -->
                    <a
                        target="_blank"
                        active-class="text-primary-content [&>*:nth-child(1)]:[&>*:nth-child(1)]:drop-shadow-[0px_0px_0px] [&>*:nth-child(3)]:fill-primary-content"
                        :id="value.MENU_ID"
                        :href="value.MENU_URL"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        class="flex flex-row gap-x-2 justify-center group items-center hover:text-primary-content p-1 relative transition-all after:duration-1000 dropdown dropdown-bottom dropdown-hover"
                        v-if="!value.IS_MOBILE && value.TARGER == undefined && value.MENU_URL.includes('http')"
                    >
                        <!-- Menu icon and text -->
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
                            value.MENU_TITLE
                        }}</span>
                        <ArrowDownIcon
                            v-if="value.SUB_MENU"
                            class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                        ></ArrowDownIcon>
                        <!-- Submenu dropdown -->
                        <ul
                            v-if="value.SUB_MENU"
                            tabindex="0"
                            class="dropdown-content font-poppinsb z-[1] text-neutral overflow-hidden p-2 shadow bg-neutral-content/60 rounded-xl w-52"
                        >
                            <li
                                v-for="menu in value.SUB_MENU"
                                class="border-solid border-b-1 border-primary-content last:border-transparent py-2 pl-6"
                            >
                                <RouterLink
                                    :to="menu.MENU_URL"
                                    class="hover:brightness-75 font-poppinssb uppercase"
                                    v-bind="analyticsAttrs(`header:submenu:${menu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                    >{{ menu.MENU_TITLE }}</RouterLink
                                >
                            </li>
                        </ul>
                    </a>
                </li>
            </ol>
        </section>
        <!-- Container for action buttons and search -->
        <div class="flex justify-end items-center gap-x-4 mr-2 lg:mr-0 w-auto full">
            <!-- Register button -->
            <button
                id="accion_registrate"
                aria-label="register"
                class="text-center px-3 py-2 flex items-center rounded-full bg-primary-content hover:scale-105 transition-all ease-out hover:brightness-90 font-poppinsb uppercase text-neutral-content text-xs xl:text-sm"
                @click="() => modals.addModal({ showModal: 'ModalRegister' })"
                v-bind="analyticsAttrs('header:signup-btn')"
            >
                {{ 'Regístrate' }}
            </button>
            <!-- Login button -->
            <button
                id="accion_iniciarsesion"
                aria-label="login"
                class="text-center px-3 truncate py-2 bg-neutral leading-4 hover:brightness-90 rounded-full text-neutral-content uppercase font-poppinsb hover:scale-105 transition-all ease-out text-xs xl:text-sm"
                @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                v-bind="analyticsAttrs('header:login-btn')"
            >
                {{ 'Iniciar Sesión' }}
            </button>
            <!-- Search button -->
            <button
                @click="() => (openSearch = !openSearch)"
                v-bind="analyticsAttrs('header:search')"
                class="mr-2 hover:scale-90 transition-all"
            >
                <searchIcon class="w-7 h-7 fill-primary-content"></searchIcon>
            </button>
            <!-- Search component -->
            <SearchGames
                v-if="openSearch"
                @close="() => (openSearch = !openSearch)"
                class="absolute z-50 w-full lg:w-[40%] top-2 lg:top-1.5 right-0 lg:right-2"
            ></SearchGames>
        </div>
    </div>
    <!-- Mobile navigation container -->
    <div class="w-full h-auto lg:hidden bg-neutral-content flex fixed z-[99] mt-16">
        <!-- Mobile menu items -->
        <ol
            ref="listMenu"
            class="flex justify-start sm:justify-around items-center gap-x-2 mx-3 py-1 bg-neutral-content w-full overflow-auto"
        >
            <template v-for="value in appComponent.config.MENU_NOLOGUEADO[appComponent.country]">
                <li
                    v-if="value.MENU_MOBILE == undefined || !value.MENU_MOBILE"
                    class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                >
                    <!-- RouterLink for mobile menu items -->
                    <RouterLink
                        active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
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
                    <!-- External link for mobile menu items -->
                    <a
                        active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                        :id="value.MENU_ID"
                        target="_blank"
                        :href="value.MENU_URL"
                        @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                        v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
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
                    <!-- Submenu items for mobile -->
                    <li
                        v-for="submenu in value.SUB_MENU"
                        class="text-neutral group flex justify-center items-center h-full flex-shrink-0"
                    >
                        <RouterLink
                            active-class="text-success [&>*:nth-child(1)]:[filter:_invert(1)_brightness(10)_contrast(1)]"
                            :id="value.MENU_ID"
                            :to="submenu.MENU_URL"
                            @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                            v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="flex flex-row gap-x-2 justify-center items-center p-1 relative transition-all after:duration-1000"
                            v-if="
                                !submenu.IS_MOBILE && submenu.TARGER == undefined && !submenu.MENU_URL.includes('http')
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
                            v-bind="analyticsAttrs(`header:submenu:${submenu.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
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
        <!-- Scroll button for mobile menu -->
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
</template>

<!-- FILE DOCUMENTED -->

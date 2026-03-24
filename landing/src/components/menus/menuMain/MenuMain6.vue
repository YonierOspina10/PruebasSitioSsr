<script lang="ts">
import { defineComponent } from 'vue';
import { useGlobalStore } from '../../../stores/Global.ts';
import router from '../../../router';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Setup function for component state.
     */
    setup() {
        return {};
    },

    /**
     * Component data properties.
     */
    data() {
        let config = this.$config(); // Configuration object
        let zendesk: any = this.$zendesk; // Zendesk integration
        let appComponent: any = this.$appComponent; // Application component reference
        let globalStore = useGlobalStore(); // Global state management
        let device = 'not_login'; // Device status
        let router = this.$route; // Router instance
        let menuList: any = []; // List of menu items
        let appPos: boolean = false; // Application position status
        let refreshBalance = this.$refreshBalance; // Refresh balance function
        let lastExecution = Date.now(); // Timestamp for last execution

        return {
            config,
            zendesk,
            appComponent,
            globalStore,
            device,
            router,
            menuList,
            appPos,
            refreshBalance,
            lastExecution,
        };
    },

    /**
     * Lifecycle hook called after component is mounted.
     */
    mounted() {
        this.getMenuList(); // Fetch menu list on mount
    },

    /**
     * Lifecycle hook called after component updates.
     */
    updated() {
        this.getMenuList(); // Fetch menu list on update
    },

    methods: {
        /**
         * Toggles the visibility of the menu service.
         * @param id - The ID of the menu service to toggle.
         */
        menuService(id: any) {
            const allMenus = document.querySelectorAll('[id^="menuService-"]'); // Select all menu services
            const selectedMenu = document.getElementById('menuService-' + id) as HTMLElement; // Selected menu service

            // Toggle display of selected menu
            if (selectedMenu.style.display === 'block') {
                selectedMenu.style.display = 'none';
            } else {
                allMenus.forEach((menu) => {
                    (menu as HTMLElement).style.display = 'none'; // Hide all menus
                    const menuId = menu.getAttribute('id')?.split('-')[1];
                    const titleServiceElement = document.querySelector('.titleService-' + menuId) as HTMLElement; // Title element
                    const arrowElement = document.querySelector('.arrow' + menuId) as HTMLElement; // Arrow element
                    titleServiceElement?.classList.remove('bg-secondary-focus'); // Remove focus class
                    arrowElement?.classList.remove('rotate-180'); // Remove rotation class
                });
                selectedMenu.style.display = 'block'; // Show selected menu
                const titleServiceElement = document.querySelector('.titleService-' + id) as HTMLElement; // Title element for selected menu
                const arrowElement = document.querySelector('.arrow' + id) as HTMLElement; // Arrow element for selected menu
                titleServiceElement?.classList.add('bg-secondary-focus'); // Add focus class
                arrowElement?.classList.add('rotate-180'); // Add rotation class
            }
        },

        /**
         * Closes the main menu.
         */
        closeMenu() {
            this.globalStore.onMenuMain = false; // Update global store state
        },

        /**
         * Retrieves the menu list based on application component settings.
         */
        getMenuList() {
            if (this.appComponent.mobile === '1') {
                this.menuList = this.appComponent.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country]; // Mobile menu
            } else {
                this.menuList = this.appComponent.config.MENU_NOLOGUEADO[this.appComponent.country]; // Desktop menu
            }
        },

        /**
         * Handles deposit action based on application position.
         */
        deposit() {
            if (!this.appPos) {
                this.appComponent.showModalDepositV2 = true; // Show deposit modal
            } else {
                router.push('/pos/credit-recharge'); // Navigate to credit recharge
            }
        },

        /**
         * Refreshes the balance with a cooldown mechanism.
         */
        onRefreshBalance() {
            const button = document.getElementById('refreshBalance'); // Refresh button
            button?.setAttribute('disabled', 'true'); // Disable button
            (document.getElementsByClassName('fa-refresh') as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                'fa-refreshFX',
            ); // Add animation class

            // Check cooldown period
            if (Date.now() - this.lastExecution > 5000) {
                this.appComponent.refreshBalance2(); // Refresh balance
                this.lastExecution = Date.now(); // Update last execution time
            }

            // Reset button state after timeout
            setTimeout(() => {
                (document.getElementsByClassName('fa-refresh') as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'fa-refreshFX',
                ); // Remove animation class
                button?.removeAttribute('disabled'); // Enable button
            }, 5000);
        },
        analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMain6|layout:layout-${this.appComponent.config.layout}`,
            };
        },
    },
});
</script>
<template>
    <!-- Navigation bar at the bottom of the viewport -->
    <nav
        class="fixed bottom-0 left-0 right-0 mx-auto w-auto bg-base-300 rounded-t-3xl py-4 px-6 flex flex-col justify-center items-center transition-all duration-300 ease-in-out gap-4 xl:hidden z-[60]"
        :class="[globalStore.onMenuMain ? 'h-auto' : 'h-[70px]']"
    >
        <!-- Container for buttons and links -->
        <div class="w-full flex justify-between items-center max-w-[450px]">
            <!-- Login button -->
            <button
                @click="appComponent.showModalLogin = true"
                v-bind="analyticsAttrs('header:login-btn')"
                class="w-[116px] h-[35px] bg-secondary relative hover:bg-secondary/80 rounded-xl z-20 flex justify-center items-center text-base font-normal border-2 border-accent-focus"
            >
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
                    alt=""
                    class="absolute top-[2px] left-[1px]"
                />
                {{ $t('Iniciar sesión') }}
            </button>
            <!-- Menu toggle button -->
            <button
                @click="globalStore.onMenuMain = !globalStore.onMenuMain"
                v-bind="analyticsAttrs('menu:toggle')"
                class="w-[56px] h-[56px] flex justify-center items-center bg-warning hover:bg-warning/80 rounded-full border-2 border-neutral"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    :class="[globalStore.onMenuMain ? 'transform rotate-45' : 'transform rotate-0']"
                >
                    <path
                        d="M14 2L14 26"
                        stroke="white"
                        stroke-width="4"
                        stroke-linecap="round"
                    />
                    <path
                        d="M2 14L26 14"
                        stroke="white"
                        stroke-width="4"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
            <!-- Registration link -->
            <RouterLink
                to="/registro"
                v-bind="analyticsAttrs('header:signup-btn')"
                class="w-[116px] h-[35px] bg-success hover:bg-success/80 relative rounded-xl z-20 flex justify-center items-center text-base font-normal border-2 border-neutral"
            >
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
                    alt=""
                    class="absolute top-[2px] left-[1px]"
                />
                {{ $t('Regístrate') }}
            </RouterLink>
        </div>
        <!-- Dropdown menu that appears when the main menu is active -->
        <div
            v-if="globalStore.onMenuMain"
            class="w-full transition-all duration-500 ease-in-out flex justify-center items-center flex-col gap-4 max-w-[650px]"
        >
            <!-- Grid container for menu items -->
            <div class="grid grid-cols-4 sm:grid-cols-6 place-content-center gap-y-4 w-full">
                <!-- Dynamic menu items generated from menuList -->
                <RouterLink
                    v-for="(item, index) in menuList"
                    :to="item.MENU_URL"
                    :key="index"
                    @click="globalStore.onMenuMain = false"
                    v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                    class="w-[80px] h-[80px] sm:w-[85px] md:h-[85px] rounded-xl flex flex-col justify-center items-center gap-2 border border-neutral hover:bg-primary-content m-auto capitalize p-1"
                    :class="[router.path == item.MENU_URL ? 'bg-primary-content' : 'bg-primary-focus']"
                >
                    <img
                        :src="item.MENU_ICON"
                        alt=""
                        class="w-[35px] md:w-[45px] aspect-square object-contain"
                    />
                    <span class="text-xs font-semibold leading-3 text-center">
                        {{ item.MENU_TITLE }}
                    </span>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
<style scoped>
/* Keyframes for rotation animation */
@keyframes rotate {
    from {
        rotate: 0deg; /* Starting rotation angle */
    }
    to {
        rotate: 360deg; /* Ending rotation angle */
    }
}

/* Class for applying refresh animation effect */
.fa-refreshFX {
    animation: rotate 0s linear 1s infinite; /* Infinite rotation with a 1s delay */
}
</style>

<!-- FILE DOCUMENTED -->

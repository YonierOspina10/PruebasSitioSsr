<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import Vue composition API functions
import SiwtchButton from '../siwtchButton/SiwtchButton.vue'; // Import custom component
import { useSportBookStore } from '../../stores/Sportbook.ts'; // Import store for sports book
import { useModalStore } from '../../stores/Modal'; // Import store for modals

export default defineComponent({
    components: { SiwtchButton }, // Register SiwtchButton component
    setup() {
        return {}; // Setup function returns an empty object
    },
    data() {
        let config = this.$config(); // Retrieve configuration
        let zendesk: any = this.$zendesk; // Initialize Zendesk integration
        let appComponent: any = this.$appComponent; // Reference to app component
        let device = 'not_login'; // Device status
        let onMenuProfile: boolean = false; // Menu profile toggle
        let menuList: any = []; // List of menu items
        let sportBookStore = useSportBookStore(); // Access sports book store
        let modals = useModalStore(); // Access modal store
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let lastExecution = Date.now(); // Timestamp for last execution
        return {
            config,
            zendesk,
            appComponent,
            device,
            onMenuProfile,
            menuList,
            sportBookStore,
            refreshBalance,
            lastExecution,
            modals,
        }; // Return data properties
    },
    mounted() {
        this.getMenuList(); // Fetch menu list on component mount
    },
    updated() {
        this.getMenuList(); // Fetch menu list on component update
    },
    methods: {
        /**
         * Toggles the visibility of the menu service.
         * @param id - The ID of the menu service to toggle.
         */
        menuService(id: any) {
            const allMenus = document.querySelectorAll('[id^="menuServiceDesktop-"]'); // Select all menu elements
            const selectedMenu = document.getElementById('menuServiceDesktop-' + id) as HTMLElement; // Get selected menu
            if (selectedMenu.style.display === 'block') {
                selectedMenu.style.display = 'none'; // Hide selected menu if visible
            } else {
                allMenus.forEach((menu) => {
                    (menu as HTMLElement).style.display = 'none'; // Hide all menus
                    const menuId = menu.getAttribute('id')?.split('-')[1]; // Extract menu ID
                    const titleServiceElement = document.querySelector('.titleService-' + menuId) as HTMLElement; // Get title service element
                    const arrowElement = document.querySelector('.arrow' + menuId) as HTMLElement; // Get arrow element
                    titleServiceElement?.classList.remove('bg-secondary-focus'); // Remove focus class
                    arrowElement?.classList.remove('rotate-180'); // Remove rotation class
                });
                selectedMenu.style.display = 'block'; // Show selected menu
                const titleServiceElement = document.querySelector('.titleService-' + id) as HTMLElement; // Get title service element for selected menu
                const arrowElement = document.querySelector('.arrow' + id) as HTMLElement; // Get arrow element for selected menu
                titleServiceElement?.classList.add('bg-secondary-focus'); // Add focus class
                arrowElement?.classList.add('rotate-180'); // Add rotation class
            }
        },
        /**
         * Opens the sports book based on the menu value.
         * @param value - The menu value containing URL and ID.
         */
        openSportBook(value) {
            if (value.MENU_URL === '/deportes' && value.MENU_ID === 'accion_envivo') {
                this.sportBookStore.page = 'live'; // Set sports book page to live
            }
        },
        /**
         * Retrieves the menu list based on the app component's mobile status.
         */
        getMenuList() {
            if (this.appComponent.mobile === '1') {
                this.menuList = this.appComponent.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country]; // Set mobile menu list
            } else {
                this.menuList = this.appComponent.config.MENU_NOLOGUEADO[this.appComponent.country]; // Set desktop menu list
            }
        },
        /**
         * Shows the deposit modal.
         */
        showDeposit() {
            this.appComponent.showModalDepositV2 = true; // Trigger deposit modal display
        },
        /**
         * Refreshes the user balance with a cooldown mechanism.
         */
        onRefreshBalance() {
            const button = document.getElementById('refreshBalance'); // Get refresh button
            button?.setAttribute('disabled', 'true'); // Disable button
            (document.getElementsByClassName('fa-refresh') as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                'fa-refreshFX',
            ); // Add animation class
            if (Date.now() - this.lastExecution > 5000) {
                this.appComponent.refreshBalance2(); // Call refresh balance function
                this.lastExecution = Date.now(); // Update last execution timestamp
            }
            setTimeout(() => {
                (document.getElementsByClassName('fa-refresh') as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'fa-refreshFX',
                ); // Remove animation class
                button?.removeAttribute('disabled'); // Re-enable button
            }, 5000);
        },
        onUserBalance() {}, // Placeholder for user balance method
        /**
         * Opens the chat interface based on the app component's configuration.
         */
        onOpenChat() {
            let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden'); // Show chat iframe
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open'); // Open chat iframe
                postMessage('show_chat', '', ref_id); // Post message to show chat
            } else {
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'open'); // Open Zendesk chat
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'show'); // Show Zendesk chat
            }
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Header6|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },
});
</script>
<template>
    <!-- Header section: Contains the main navigation and branding elements -->
    <header
        class="w-full h-[58px] bg-base-300 p-4 tablet:px-8 desktop:px-16 desktop:py-2 fixed top-0 left-0 right-0 flex justify-center items-center shadow-md shadow-black z-[70] text-neutral"
    >
        <!-- Container for the logo and switch button -->
        <div class="w-full flex justify-between items-center">
            <!-- Logo and switch button area -->
            <div class="w-full xl:max-w-[300px] h-full flex justify-between items-center xl:gap-4">
                <!-- Router link for logo navigation -->
                <RouterLink
                    :to="appComponent.appPOS ? '/pos/menu' : '/home'"
                    v-bind="analyticsAttrs('header:logo')"
                    class="hover:scale-110 transition-all duration-500 ease-in-out"
                >
                    <!-- Logo image -->
                    <img
                        :src="appComponent.config.logo_['light']"
                        alt="logo"
                        class="h-[40px] w-[138px] desktop:w-[115px] object-contain object-center"
                    />
                </RouterLink>
                <!-- Switch button component -->
                <SiwtchButton />
            </div>
            <!-- Menu items for larger screens -->
            <div class="hidden xl:flex justify-end items-center gap-1 w-full">
                <!-- Navigation menu list -->
                <ul class="flex justify-center items-center gap-1">
                    <li v-for="(item, i) in menuList">
                        <!-- Conditional rendering for menu items based on target -->
                        <RouterLink
                            v-if="item.TARGER == undefined"
                            :key="i"
                            :to="appComponent.config.baseUrlFx + item.MENU_URL"
                            :id="item.MENU_ID"
                            v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="rounded-xl flex justify-center gap-1 items-center hover:bg-accent-content p-2"
                        >
                            <!-- Menu icon -->
                            <img
                                :src="item.MENU_ICON"
                                alt=""
                                class="w-[20px] h-[20px] aspect-square object-contain"
                            />
                            <!-- Menu title -->
                            <span class="text-xs leading-4 text-center font-normal w-auto max-w-[110px] capitalize">
                                {{ item.MENU_TITLE }}
                            </span>
                        </RouterLink>
                        <!-- External link for menu items -->
                        <a
                            v-if="item.TARGER == 'blank'"
                            :href="item.MENU_URL"
                            target="_blank"
                            :title="item.MENU_TITLE"
                            @click="
                                appComponent.gAnalytics('menu_top', item.MENU_ID);
                                openSportBook(item);
                            "
                            class="rounded-xl flex justify-center gap-2 items-center hover:bg-accent-content p-2"
                            v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        >
                            <img
                                :src="item.MENU_ICON"
                                alt=""
                                class="w-[20px] h-[20px] aspect-square object-contain"
                            />
                            <span class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]">
                                {{ item.MENU_TITLE }}
                            </span>
                        </a>
                        <!-- Link for target top -->
                        <a
                            v-else-if="item.TARGER == 'top'"
                            :id="item.MENU_ID"
                            class="rounded-xl flex justify-center gap-2 items-center hover:bg-accent-content p-2"
                            :href="item.MENU_URL"
                            target="_top"
                            :title="item.MENU_TITLE"
                            @click="openSportBook(item)"
                            v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                        >
                            <img
                                :src="item.MENU_ICON"
                                alt=""
                                class="w-[20px] h-[20px] aspect-square object-contain"
                            />
                            <span class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]">
                                {{ item.MENU_TITLE }}
                            </span>
                        </a>
                        <!-- Button for chat interaction -->
                        <button
                            v-else-if="item.TARGER == 'chat'"
                            id="accion_chat"
                            class="rounded-xl flex justify-center gap-2 items-center hover:bg-accent-content p-2"
                            @click="
                                onOpenChat();
                                appComponent.gAnalytics('interaction_chat');
                            "
                            v-bind="analyticsAttrs('header:menu:chat')"
                        >
                            <img
                                :src="item.MENU_ICON"
                                alt=""
                                class="w-[20px] h-[20px]aspect-square object-contain"
                            />
                            <span class="text-xs leading-4 text-center font-normal w-auto max-w-[110px]">
                                {{ item.MENU_TITLE }}
                            </span>
                        </button>
                    </li>
                </ul>
                <!-- Registration link -->
                <RouterLink
                    to="/registro"
                    v-bind="analyticsAttrs('header:signup-btn')"
                    class="w-full max-w-[110px] h-full desktop:h-[31px] bg-success relative hover:bg-success/80 rounded-xl flex justify-center items-center text-sm font-normal border border-neutral shadow-inner shadow-neutral-content/50"
                >
                    <img
                        src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
                        alt=""
                        class="absolute top-[2px] left-[1px]"
                    />
                    {{ $t('Regístrate') }}
                </RouterLink>
                <!-- Login button -->
                <button
                    @click="() => modals.addModal({ showModal: 'ModalLogin6' })"
                    v-bind="analyticsAttrs('header:login-btn')"
                    class="w-full max-w-[110px] h-full desktop:h-[31px] bg-warning relative hover:bg-warning/80 rounded-xl flex justify-center items-center text-sm font-normal border border-neutral"
                >
                    <img
                        src="https://images.virtualsoft.tech/m/msj0212T1712857601.png"
                        alt=""
                        class="absolute top-[2px] left-[1px]"
                    />
                    {{ $t('Iniciar sesión') }}
                </button>
            </div>
        </div>
    </header>
</template>
<style scoped>
/* Keyframes for rotation animation */
@keyframes rotate {
    from {
        rotate: 0deg; /* Starting position */
    }
    to {
        rotate: 360deg; /* Ending position */
    }
}

/* Class for applying the rotation animation */
.fa-refreshFX {
    animation: rotate 1s linear infinite; /* Infinite rotation animation */
}
</style>

<!-- FILE DOCUMENTED -->

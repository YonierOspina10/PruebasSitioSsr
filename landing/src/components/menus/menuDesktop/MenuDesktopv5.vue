<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import IconMenu from '../../icons/IconMenu.vue'; // Importing IconMenu component
import IconEnter from '../../icons/IconEnter.vue'; // Importing IconEnter component
import { useModalStore } from '../../../stores/Modal.ts'; // Importing modal store for state management
import { useGlobalStore } from '../../../stores/Global.ts'; // Importing global store for state management

export default defineComponent({
    data() {
        // Initializing component data
        let config = this.$config(); // Fetching configuration
        let appComponent: any = this.$appComponent; // Accessing the app component
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let globalStore = useGlobalStore(); // Accessing global store
        let modals = useModalStore(); // Accessing modal store
        return {
            config,
            appComponent,
            refreshBalance,
            modals,
            globalStore,
        };
    },
    components: {
        IconMenu, // Registering IconMenu component
        IconEnter, // Registering IconEnter component
    },
    methods: {
        // Placeholder for methods (currently empty)
    },
    mounted() {
        // Lifecycle hook that runs after the component is mounted
        if (
            this.appComponent.config != undefined && // Checking if config is defined
            this.appComponent.config['not_login'] != undefined && // Checking if 'not_login' config is defined
            this.appComponent.config['not_login']['menu'] != undefined // Checking if 'menu' under 'not_login' is defined
        ) {
            // Assigning menu configuration for non-logged-in users based on the country
            this.appComponent.config.MENU_NOLOGUEADO[this.appComponent.country] =
                this.appComponent.config['not_login']['menu'];
        }
    },
});
</script>
<template>
    <!-- Main container for the header section with a full width and height -->
    <div class="w-full h-[60px] bg-primary-content flex justify-between px-1 xl:px-3">
        <!-- Section containing the logo and menu items -->
        <section class="w-full h-full flex lg:gap-x-2 xl:gap-x-7">
            <!-- Container for the logo and drawer button -->
            <div
                class="flex flex-row justify-start items-center gap-x-1 lg:gap-x-2 max-w-[200px] min-w-[120px] w-[20%]"
            >
                <!-- Drawer button for mobile view -->
                <label
                    for="main-menu"
                    class="drawer-button text-neutral lg:hidden"
                >
                    <IconMenu class="w-9 h-9" />
                </label>
                <!-- Logo link -->
                <RouterLink
                    to="/home"
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
            <!-- Navigation menu items, hidden on mobile -->
            <ol class="hidden lg:flex gap-x-2">
                <!-- List of menu items generated from the configuration -->
                <li
                    v-for="value in appComponent.config.MENU_NOLOGUEADO[appComponent.country]"
                    class="text-neutral group flex justify-center items-center w-auto"
                >
                    <!-- Individual menu link -->
                    <RouterLink
                        active-class="text-success [&>*:nth-child(1)]:drop-shadow-[0px_0px_2px]"
                        :id="value.MENU_ID"
                        :to="value.MENU_URL"
                        class="flex flex-row gap-x-3 justify-center items-center hover:text-neutral/50 p-1 relative transition-all after:duration-1000"
                        v-if="!value.IS_MOBILE && value.TARGER == undefined"
                    >
                        <img
                            :src="value.MENU_ICON"
                            width="15"
                            height="15"
                            alt=""
                            class="group-hover:brightness-75"
                        />
                        <span
                            v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                            class="text-center capitalize font-poppinsm leading-4 text-xs xl:text-sm"
                            >{{ $t(value.MENU_TITLE) }}</span
                        >
                    </RouterLink>
                </li>
            </ol>
        </section>
        <!-- Container for registration and login buttons -->
        <div class="flex justify-end items-center gap-x-4 mr-2 lg:mr-0 w-auto full">
            <!-- Registration link -->
            <RouterLink
                to="/registro"
                id="accion_registrate"
                aria-label="register"
                class="text-center px-3 h-9 flex items-center rounded-md bg-success hover:scale-105 transition-all ease-out hover:brightness-90 font-poppinsb capitalize text-neutral-content text-xs xl:text-sm"
            >
                {{ $t('Regístrate') }}
            </RouterLink>
            <!-- Login button -->
            <button
                id="accion_iniciarsesion"
                aria-label="login"
                class="text-center px-3 h-9 flex justify-center items-center gap-x-2 flex-row truncate py-3 bg-success leading-4 hover:brightness-90 rounded-md text-neutral-content capitalize font-poppinsb hover:scale-105 transition-all ease-out text-xs xl:text-sm"
                @click="() => modals.addModal({ showModal: 'ModalLogin4' })"
            >
                <IconEnter
                    class="w-4 h-4 fill-neutral-content"
                    :width="5"
                    :height="5"
                ></IconEnter>
                {{ $t('Iniciar Sesión') }}
            </button>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

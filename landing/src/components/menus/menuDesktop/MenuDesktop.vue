<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconHandsUp from '../../icons/HandsUpIcon.vue'; // Importing HandsUp icon component
import IconHouse from '../../icons/HouseIcon.vue'; // Importing House icon component
import { useModalStore } from '../../../stores/Modal'; // Importing modal store for state management

export default defineComponent({
    data() {
        // Defining reactive data properties for the component
        let config = this.$config(); // Accessing configuration object
        let appComponent: any = this.$appComponent; // Accessing application component reference
        let modals = useModalStore(); // Using modal store for managing modals
        return {
            config,
            appComponent,
            modals,
        };
    },
    components: {
        IconHandsUp, // Registering HandsUp icon component
        IconHouse, // Registering House icon component
    },
    mounted() {
        // Lifecycle hook that runs after the component is mounted
        if (
            this.config != undefined && // Checking if config is defined
            this.config['not_login'] != undefined && // Checking if 'not_login' property is defined
            this.config['not_login']['menu'] != undefined // Checking if 'menu' property is defined within 'not_login'
        ) {
            // Assigning menu configuration for non-logged-in users based on the country
            this.config.MENU_NOLOGUEADO[this.appComponent.country] = this.config['not_login']['menu'];
        }
    },
});
</script>
<template>
    <!-- Main container for the bottom navigation menu, positioned absolutely at the bottom -->
    <div class="absolute bottom-0 flex justify-center items-center w-full">
        <!-- Ordered list for menu items, styled with borders and background -->
        <ol
            :class="[
                'border-x-[0.1px] border-solid border-primary-content rounded-t',
                'before:absolute before:w-6 before:h-full before:bg-primary-content before:-left-6 before:[clip-path:_polygon(102%_0_,_0_120%_,_100%_100%)]',
                'after:absolute after:w-6 after:h-full after:bg-primary-content after:-right-6 after:[clip-path:_polygon(0_0_,_0_100%_,_100%_100%)] after:bottom-0',
            ]"
            class="flex gap-4 *:text-center justify-center items-center bg-primary-content w-[70%] relative px-5"
        >
            <!-- List item for each menu entry, dynamically generated -->
            <li
                v-for="value in config.MENU_NOLOGUEADO[appComponent.country]"
                :class="[
                    {
                        'shadow-clip bg-red-700 min-h-[35px] px-7 flex': value.SHADOW == 1,
                    },
                    value.MENU_CLASS,
                ]"
            >
                <!-- Router link for menu items that are not mobile and have no target defined -->
                <RouterLink
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    class="text-center flex justify-center items-center flex-col font-bold leading-5"
                    v-if="!value.IS_MOBILE && value.TARGER == undefined"
                >
                    <!-- Icon for the menu item if defined -->
                    <img
                        v-if="value.MENU_ICON != '' && config.menu.desktopIcons"
                        :alt="value.MENU_TITLE"
                        :src="value.MENU_ICON"
                    />
                    <!-- Default icon for 'HOME' or 'INICIO' -->
                    <IconHouse
                        v-if="
                            value.MENU_TITLE == 'HOME' ||
                            (value.MENU_TITLE == 'INICIO' && config.menu.desktopIcons !== true)
                        "
                        :width="'12px'"
                        :height="'12px'"
                        :fill="'currentColor'"
                    ></IconHouse>
                    <!-- Title of the menu item -->
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center"
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                </RouterLink>
                <!-- Anchor link for menu items that open in a new tab -->
                <a
                    class="menu-item align-middle text-center text-neutral"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_TITLE)"
                    :id="value.MENU_ID"
                    v-if="value.TARGER !== undefined && value.TARGER == 'blank'"
                    :aria-label="value.MENU_TITLE"
                    :href="value.MENU_URL"
                    target="_blank"
                    :class="value.MENU_SECCION"
                    >{{ $t(value.MENU_TITLE) }}</a
                >
                <!-- Anchor link for menu items that open in the same tab -->
                <a
                    class="menu-item align-middle text-center text-neutral"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_TITLE)"
                    :id="value.MENU_ID"
                    v-if="value.TARGER !== undefined && value.TARGER == '_top'"
                    :aria-label="value.MENU_TITLE"
                    :href="value.MENU_URL"
                    target="_top"
                    :class="value.MENU_SECCION"
                    >{{ $t(value.MENU_TITLE) }}</a
                >
            </li>
            <!-- List item for the login button -->
            <li>
                <button
                    id="accion_iniciarsesion"
                    aria-label="login"
                    class="text-center font-bold leading-5 text-neutral-content uppercase"
                    @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                >
                    {{ $t('Iniciar Sesión') }}
                </button>
            </li>
        </ol>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalStore } from '../../../stores/Modal.ts';
import IconMenu from '../../icons/IconMenu.vue';
import IconHouse from '../../icons/IconHouse.vue';

/**
 * Vue component definition for the main application component.
 */
export default defineComponent({
    components: {
        // Registering icon components for use in the template
        IconHouse,
        IconMenu,
    },

    /**
     * Component data function.
     * @returns {Object} The data properties for the component.
     */
    data() {
        // Reference to the application component
        let appComponent: any = this.$appComponent;

        // Accessing the modal store for managing modals
        let modals = useModalStore();

        return {
            appComponent,
            modals,
        };
    },
});
</script>
<template>
    <!-- Main navigation container with flex layout and styling -->
    <div
        class="w-full h-[50px] bg-primary-content flex justify-between py-1 px-1 xl:px-3 border-y-2 border-solid border-accent-content"
    >
        <!-- Left section containing menu button and logo -->
        <div class="flex w-[40%] lg:w-[15%]">
            <!-- Menu button for mobile view -->
            <label
                for="main-menu"
                class="w-6 btn btn-square btn-ghost drawer-button text-neutral text-xs lg:hidden mr-2"
            >
                <IconMenu class="w-full h-full" />
            </label>
            <!-- Logo link -->
            <RouterLink
                id="home_accion_inicio"
                to="/home"
                class="flex justify-center items-center mr-2 lg:mr-0"
            >
                <img
                    id="header-logo"
                    width="282"
                    height="60"
                    class="w-full h-full object-contain"
                    :src="appComponent.config.header.logo.src"
                    alt="Logo"
                />
            </RouterLink>
        </div>
        <!-- Navigation menu for larger screens -->
        <ol class="justify-center items-center gap-x-1 mx-1 hidden lg:flex">
            <!-- List of menu items generated from configuration -->
            <li
                v-for="value in appComponent.config.MENU_NOLOGUEADO[appComponent.country]"
                class="rounded-xl border-solid border-1 border-transparent hover:border-neutral-content/40 h-full w-full"
            >
                <!-- Router link for each menu item -->
                <RouterLink
                    active-class="after:-translate-y-[78px] rounded-xl "
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    :class="[
                        'w-full h-full flex flex-col justify-center items-center text-neutral p-1  relative transition-all after:duration-1000',
                        'after:w-[100px] after:h-[100px] z-1 after:rounded-full after:-z-1 overflow-hidden',
                        ' after:absolute after:top-14 after:left-1/2 after:-translate-x-1/2 rounded-xl after:bg-neutral-content/40 after:shadow-yellow-200 after:shadow-[inset_0px_2px_0px]',
                    ]"
                    v-if="!value.IS_MOBILE && value.TARGER == undefined"
                >
                    <!-- Icon for home menu item -->
                    <IconHouse
                        v-if="
                            value.MENU_TITLE == 'HOME' ||
                            (value.MENU_TITLE == 'INICIO' && appComponent.config.menu.desktopIcons !== true)
                        "
                        :width="'12px'"
                        :height="'12px'"
                        :fill="'currentColor'"
                    ></IconHouse>
                    <!-- Menu title -->
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center uppercase font-poppinsm leading-4 text-xs xl:text-sm"
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                </RouterLink>
                <!-- External link for specific menu items -->
                <a
                    v-if="value.TARGER !== undefined && value.TARGER == '_top'"
                    target="_top"
                    :id="value.MENU_ID"
                    :href="value.MENU_URL"
                    class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px] text-[0.8rem]"
                    >{{ $t(value.MENU_TITLE) }}</a
                >
            </li>
        </ol>
        <!-- Right section with registration and login buttons -->
        <div class="flex justify-center items-center gap-x-2 mr-2 lg:mr-0">
            <!-- Registration button -->
            <button
                id="accion_registrate"
                aria-label="register"
                class="text-center border-solid border-1 border-neutral text-white capitalize px-4 py-1 rounded-full hover:scale-105 font-poppinssl transition-all ease-out text-xs xl:text-sm"
            >
                <RouterLink to="/registro">
                    {{ $t('Regístrate') }}
                </RouterLink>
            </button>
            <!-- Login button with modal trigger -->
            <button
                id="accion_iniciarsesion"
                aria-label="login"
                class="text-center truncate border-solid border-1 border-success px-1 lg:px-4 py-1 bg-success leading-4 bg-gradient-to-r from-success to-success/60 rounded-full text-white capitalize font-poppinssl hover:scale-105 transition-all ease-out text-xs xl:text-sm"
                @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
            >
                {{ $t('Iniciar Sesión') }}
            </button>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

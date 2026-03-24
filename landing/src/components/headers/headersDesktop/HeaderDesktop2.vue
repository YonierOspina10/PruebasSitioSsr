<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconHouse from '../../icons/HouseIcon.vue'; // Importing a house icon component
import { useModalStore } from '../../../stores/Modal'; // Importing modal store for state management

export default defineComponent({
    /**
     * Component data function
     * @returns {Object} Contains appComponent and modals
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the application component
        let modals = useModalStore(); // Accessing modal store for managing modal state
        return {
            appComponent,
            modals,
        };
    },
    components: {
        IconHouse, // Registering the IconHouse component for use in the template
    },
    methods: {
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:HeaderDesktop2|layout:layout-${this.appComponent.config.layout}`
            };
        }
    }, // Placeholder for methods, currently empty
});
</script>
<template>
    <!-- Main container for the header, visible only on large screens -->
    <div class="w-full h-full bg-primary-content hidden lg:flex py-3.5">
        <!-- Logo container with centered alignment -->
        <div class="w-[17%] h-full flex justify-center items-center bg-primary-content container__logo">
            <!-- Router link for home navigation with logo image -->
            <RouterLink
                id="home_accion_inicio"
                to="/home"
                v-bind="analyticsAttrs('header:logo')"
                class="inline-block container-img w-[130px] max-w-[130px] h-full"
            >
                <img
                    id="header-logo"
                    width="282"
                    height="60"
                    class="h-full w-full object-contain my-1"
                    :src="appComponent.config.header.logo.src"
                    alt="Logo"
                />
            </RouterLink>
        </div>
        <!-- Main navigation menu -->
        <ol class="flex justify-center w-[63%]">
            <li
                v-for="value in appComponent.config.MENU_NOLOGUEADO[appComponent.country]"
                class="main-item text-center w-auto h-full font-semibold text-base rounded-xl hover:shadow-inset"
                v-bind:class="[
                    { 'shadow-clip': value.SHADOW == 1 },
                    value.MENU_CLASS,
                    value.MENU_ID == 'accion_registro' ? 'px-3' : 'px-2',
                ]"
            >
                <!-- Router link for menu items -->
                <RouterLink
                    :id="value.MENU_ID"
                    :to="value.MENU_URL"
                    @click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
                    class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px]"
                    v-if="!value.IS_MOBILE && value.TARGER == undefined"
                >
                    <div>
                        <!-- Icon for menu item -->
                        <img
                            v-if="value.MENU_ICON != '' && appComponent.config.menu.desktopIcons"
                            class="iconSideMenu shape-Sports desktop"
                            :alt="value.MENU_TITLE"
                            :src="value.MENU_ICON"
                        />
                        <IconHouse
                            v-if="
                                value.MENU_TITLE == 'HOME' ||
                                (value.MENU_TITLE == 'INICIO' && appComponent.config.menu.desktopIcons !== true)
                            "
                            :width="'12px'"
                            :height="'12px'"
                            class="fill-neutral-content"
                        ></IconHouse>
                        <div
                            v-if="value.ICON != undefined"
                            class="svg"
                            v-html="value.ICON"
                        ></div>
                    </div>
                    <!-- Menu title -->
                    <span
                        v-if="value.SUB_MENU == undefined || value.SUB_MENU == ''"
                        class="text-center w-auto uppercase font-poppinsm text-neutral-content leading-4 text-[0.8rem]"
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                </RouterLink>
                <!-- Anchor link for menu items with target defined -->
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
        <!-- Container for registration and login buttons -->
        <ol class="w-[20%] flex justify-end items-center">
            <li class="h-full">
                <!-- Registration button -->
                <button
                    id="accion_registrate"
                    aria-label="register"
                    class="text-center bg-success text-neutral uppercase px-4 h-full mr-3 rounded-xl hover:scale-105 font-medium transition-all ease-out text-sm"
                    @click="appComponent.gAnalytics('menu_top', 'accion_registrate')"
                >
                    <RouterLink to="/registro">{{ $t('Regístrate') }}</RouterLink>
                </button>
            </li>
            <li class="h-full">
                <!-- Login button -->
                <button
                    id="accion_iniciarsesion"
                    aria-label="login"
                    class="text-center uppercase bg-gradient-to-r from-[#dadada] rounded-xl to-[#898989] text-neutral px-4 font-medium hover:scale-105 h-full mr-3 transition-all ease-out text-sm"
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

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconMenu from '../../icons/Menu2Icon.vue'; // Importing IconMenu component
import MenuDesktop from '../../menus/menuDesktop/MenuDesktop.vue'; // Importing MenuDesktop component

export default defineComponent({
    components: {
        IconMenu, // Registering IconMenu component
        MenuDesktop, // Registering MenuDesktop component
    },
    data() {
        // Data function returning component's reactive state
        let appComponent: any = this.$appComponent; // Accessing appComponent from the context
        return {
            appComponent, // Returning appComponent as part of the component's state
        };
    },
    mounted() {
        // Lifecycle hook called after the component is mounted
    },
});
</script>
<template>
    <!-- Main header container with conditional classes based on app configuration -->
    <div
        id="header"
        class="header hidden lg:block h-36 bg-header z-20 relative"
        :class="{
            'header-custom':
                appComponent.config.header.headerCustom != undefined &&
                appComponent.config.header.headerCustom[appComponent.country] != undefined &&
                appComponent.config.header.headerCustom[appComponent.country],
        }"
    >
        <!-- Inner container for logo and navigation -->
        <div>
            <!-- Figure element for logo with conditional classes -->
            <figure
                class="logotipo version1 w-full absolute"
                v-bind:class="{
                    'scroll-on-top-center':
                        appComponent.config.menu_ !== undefined && appComponent.config.menu_.top_menu !== undefined
                            ? appComponent.config.menu_.top_menu
                            : appComponent.config.menu.stylePositionTop,
                }"
            >
                <!-- Router link to home with logo image -->
                <RouterLink
                    id="home_accion_inicio"
                    to="/home"
                    class="w-1/5 mx-auto my-0 mt-3 block text-center header-logo-home"
                >
                    <!-- Logo image with conditional source -->
                    <img
                        id="header-logo"
                        width="282"
                        height="60"
                        class="inline-block h-full w-full object-contain"
                        :src="
                            appComponent.config.logo_ != undefined &&
                            appComponent.config.theme_mode != undefined &&
                            appComponent.config.logo_[appComponent.config.theme_mode] != undefined
                                ? appComponent.config.logo_[appComponent.config.theme_mode]
                                : appComponent.config.header.logo.src
                        "
                        alt="Logo"
                    />
                </RouterLink>
            </figure>
        </div>
        <!-- Desktop menu component -->
        <MenuDesktop />
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

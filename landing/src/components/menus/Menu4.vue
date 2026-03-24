<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The component's reactive data properties.
     */
    data() {
        let config = this.$config(); // Retrieves configuration settings.
        let appComponent: any = this.$appComponent; // Stores the application component reference.
        let onMenu: boolean = false; // Tracks the menu open/close state.
        return {
            config,
            appComponent,
            onMenu,
        };
    },
    methods: {
        /**
         * Closes the menu by setting onMenu to false.
         */
        closeMenu() {
            this.onMenu = false; // Updates the menu state to closed.
        },
    },
});
</script>
<template>
    <!-- Main section for the navigation bar, centered and flexible layout -->
    <section class="relative w-full flex justify-center items-center">
        <!-- Navigation bar with fixed position, styled for mobile view -->
        <nav
            class="bg-primary-focus h-20 w-[101%] rounded-t-3xl flex justify-center items-center text-center p-1 fixed z-[50] -bottom-[2px] lg:hidden shadow-lg shadow-neutral"
        >
            <!-- Dynamic router links generated from menu configuration -->
            <RouterLink
                v-for="menu in appComponent.config.MENU_USER_NOLOGUEADO[appComponent.country]"
                active-class="active-link"
                :to="menu.url != undefined && menu.url != '' ? menu.url : '/home'"
                @click="closeMenu()"
                class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
            >
                <!-- Conditional icon display for each menu item -->
                <img
                    v-if="menu.icon != undefined && menu.icon != ''"
                    :src="menu.icon"
                    alt="Icon Deportes Menu Inferior"
                    class="object-cover"
                    :class="menu.title != undefined && menu.title != '' ? 'w-9 ' : 'w-14'"
                />
                <!-- Conditional title display for each menu item -->
                <span v-if="menu.title != undefined && menu.title != ''">{{ $t(menu.title) }}</span>
            </RouterLink>
        </nav>
    </section>
</template>
<style scoped>
/* Styles for the button menu */
.button__menu {
    text-shadow: 0 0 4px black; /* Adds a black text shadow for depth */
}

/* Styles for active links */
.active-link > span {
    color: white; /* Changes text color to white for active links */
}

/* Styles for additional menu items */
.menu_extra {
    transition: 0.3s linear; /* Smooth transition effect for menu items */
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuDesktopv7 from '../../menus/menuDesktop/MenuDesktopv7.vue'; // Importing a child component

export default defineComponent({
    components: {
        MenuDesktopv7, // Registering the MenuDesktopv7 component
    },

    data() {
        // Defining reactive data properties for the component
        let appComponent: any = this.$appComponent; // Accessing appComponent from the Vue instance
        let refreshBalance: any = this.$refreshBalance; // Accessing refreshBalance from the Vue instance
        return {
            appComponent,
            refreshBalance, // Returning the reactive properties
        };
    },

    directives: {
        // Custom directive for formatting numbers
        formatNumber(el, binding) {
            el.textContent = binding.value.toFixed(2); // Formatting the bound value to two decimal places
        },
    },

    methods: {
        // Method to handle box click events
        clickBox(box: any) {
            window.open(box.url, '_top'); // Opening the URL in the top window context
        },
    },
});
</script>
<template>
    <!-- Main header container with a relative position and background color -->
    <div
        id="header"
        class="relative h-auto bg-base-300"
    >
        <!-- Placeholder for additional content -->
        <div></div>
        <!-- Desktop menu component -->
        <MenuDesktopv7 />
    </div>
</template>

<!-- FILE DOCUMENTED -->

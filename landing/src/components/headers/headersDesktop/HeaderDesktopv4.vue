<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuDesktopv4 from '../../menus/menuDesktop/MenuDesktop4.vue'; // Importing a desktop menu component

export default defineComponent({
    components: {
        MenuDesktopv4, // Registering the MenuDesktopv4 component for use in this component
    },

    data() {
        // Defining the data function to return component-specific data
        let appComponent: any = this.$appComponent; // Accessing a global app component
        return {
            appComponent, // Returning the appComponent for use in the template
        };
    },
});
</script>
<template>
    <!-- Main header container with a specific ID and classes for styling -->
    <div
        id="header"
        class="relative h-auto max-h-[5rem] bg-base-300"
    >
        <!-- Desktop menu component -->
        <MenuDesktopv4 />
    </div>
</template>

<!-- FILE DOCUMENTED -->

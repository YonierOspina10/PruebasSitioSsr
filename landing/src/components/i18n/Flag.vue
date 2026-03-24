<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import '../../assets/flags.css'; // Importing CSS for flag styles

export default defineComponent({
    // Defining a Vue component
    props: {
        // Defining props for the component
        country: {
            type: String, // Type of the country prop
            default: 'ES', // Default value for the country prop
        },
    },
    data() {
        // Data function returning component's reactive data
        let appComponent: any = this.$appComponent; // Accessing a global app component
        return {
            appComponent, // Returning appComponent in the data object
        };
    },
    methods: {
        // Placeholder for component methods
    },
});
</script>
<template>
    <!-- Span element representing a country flag with dynamic classes -->
    <span
        class="w-4 h-[10px]"
        :class="`country-flags ${country.toLowerCase()}`"
    ></span>
</template>

<!-- FILE DOCUMENTED -->

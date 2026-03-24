<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    props: {
        /**
         * Text prop passed to the component, defaults to an empty string.
         */
        text: { type: String, default: '' },
    },
    data() {
        /**
         * Retrieves configuration and app component on component initialization.
         * @returns An object containing config and appComponent.
         */
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        return {
            config,
            appComponent,
        };
    },
    mounted() {
        /**
         * Logs the text prop to the console when the component is mounted.
         */
        console.log(this.text);
    },
});
</script>
<template>
    <!-- Main container for the section with full width and height of 24 units, centered flexbox layout -->
    <div class="w-full h-24 flex justify-center items-center my-3 md:my-0">
        <!-- Section element for displaying text, centered and taking 80% of the width -->
        <section
            class="text-center w-4/5"
            v-html="$t(text)"
        ></section>
    </div>
</template>

<!-- FILE DOCUMENTED -->

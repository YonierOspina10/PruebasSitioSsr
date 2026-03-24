<template>
    <!-- Main wrapper for the home section -->
    <div id="home-wrapper">
        <!-- Section containing the background image and content -->
        <section class="realtive w-full h-[650px] md:h-[700px] relative flex justify-center items-center">
            <!-- Top gradient overlay -->
            <div class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute -top-1"></div>
            <!-- Background image, conditionally rendered -->
            <img
                v-if="contingencyData !== undefined && contingencyData.imgBackground !== undefined"
                :src="contingencyData.imgBackground"
                alt=""
                class="absolute -top-8 w-full h-full object-cover object-center"
            />
            <!-- Bottom gradient overlay -->
            <div class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute -bottom-0"></div>
            <!-- Article containing main content -->
            <article class="z-10 w-full h-full max-w-[1300px] mx-auto flex flex-col justify-center items-center">
                <div class="flex flex-col justify-center items-center gap-10">
                    <!-- Main image, conditionally rendered -->
                    <img
                        v-if="contingencyData !== undefined && contingencyData.img !== undefined"
                        :src="contingencyData.img"
                        alt=""
                        class="w-[600px] aspect-auto"
                    />
                </div>
            </article>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Setup function for the component.
     * @returns An object containing component state.
     */
    setup() {
        return {};
    },

    /**
     * Data function for the component.
     * @returns An object containing component data properties.
     */
    data() {
        // Reference to the app component from the Vue instance
        let appComponent: any = this.$appComponent;

        return {
            // Exposing appComponent to the template
            appComponent,
            // Extracting contingency data from appComponent's config
            contingencyData: appComponent.config.contingency,
        };
    },
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

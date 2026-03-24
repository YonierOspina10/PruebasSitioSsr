<template>
    <!-- Main container that covers the entire screen with a semi-transparent black background -->
    <div class="in w-screen h-screen bg-neutral-content/80 fixed inset-0 flex justify-center items-center">
        <!-- Popup dialog box with a secondary background color and rounded corners -->
        <div
            class="relative bg-base-300 rounded-box min-w-[370px] max-w-[700px] min-h-[270px] text-neutral/80 py-10 px-8 md:px-10"
        >
            <!-- Close button positioned at the top right corner of the dialog -->
            <button
                class="absolute right-4 top-4 hover:scale-125"
                @click="$emit('close')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M2 2L18 18"
                        stroke="currentColor"
                        stroke-width="3"
                    />
                    <path
                        d="M18 2L2 18"
                        stroke="currentColor"
                        stroke-width="3"
                    />
                </svg> <!-- Placeholder for an SVG icon -->
            </button>
            <!-- Container for displaying the message, with scrollable overflow if content exceeds height -->
            <div
                class="h-full flex flex-col justify-start items-center w-full max-h-[70vh] overflow-y-auto rounded-box shadow-lg border border-base-200"
                v-html="message"
            ></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
export default defineComponent({
    props: {
        message: String, // Prop to receive a message string to be displayed
    },
    setup() {
        return {}; // Setup function returning an empty object (no reactive state)
    },
    data() {
        let config = this.$config(); // Fetching configuration using a custom method
        let appComponent: any = this.$appComponent; // Storing a reference to the app component
        return {
            config, // Exposing config to the template
            appComponent, // Exposing appComponent to the template
        };
    },
});
</script>
<style scoped>
/* Scoped styles for this component will be added here */
</style>

<!-- FILE DOCUMENTED -->

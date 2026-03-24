<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a modal dialog.
 * @component
 */
export default defineComponent({
    props: {
        /** Title of the modal */
        title: String, 
        /** Message displayed in the modal */
        message: String, 
        /** Text for the button */
        button: String, 
        /** Determines if the button is displayed */
        buttonX: {
            type: Boolean,
            default: true,
        },
        /** Inner HTML content for the modal */
        innerHtml: { type: String, default: '' },
    },
    data() {
        // Reference to the app component for modal control
        let appComponent: any = this.$appComponent; 
        return {
            appComponent,
        };
    },
    methods: {
        /**
         * Closes the modal by calling the closeModal method on the app component.
         */
        close() {
            this.appComponent.closeModal(); 
        },
    },
});
</script>

<template>
    <!-- Main container for the modal, covering the entire screen with a dark background -->
    <div class="in w-screen h-screen bg-black/80 fixed inset-0 flex justify-center items-center z-[999999999]">
        <!-- Modal box container -->
        <div class="modal-box w-11/12 max-w-xl bg-neutral">
            <!-- Close button for the modal -->
            <label
                @click="$emit('close')"
                class="btn btn-sm btn-circle absolute right-2 top-2"
                >✕</label
            >
            <!-- Modal title -->
            <h3 class="font-bold text-lg text-black">{{ title }}</h3>
            <!-- Modal message content -->
            <p class="py-4 text-black">{{ message }}</p>
            <!-- Action buttons in the modal -->
            <div class="modal-action text-black">
                <!-- Button to close the modal -->
                <label
                    @click="$emit('close')"
                    class="btn text-black shadow-lg"
                    >{{ button }}</label
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Scoped styles for the modal component can be added here */
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a modal.
 */
export default defineComponent({

    // Component props definition
    props: {
        /** Title of the modal */
        title: String,
        /** Message to be displayed in the modal */
        message: String,
        /** Text for the button */
        button: String,
        button2: String,
        link2: String,
        /** Determines if the close button is shown */
        buttonX: {
            type: Boolean,
            default: true,
        },
        /** Inner HTML content for the modal */
        innerHtml: { type: String, default: '' },
    },
    data() {
        // Initialize component data
        let emitter = this.$emitter(); // Event emitter for communication
        let appComponent: any = this.$appComponent; // Reference to the app component
        return {
            emitter,
            appComponent,
        };
    },
    methods: {
        /** Closes the modal */
        close() {
            this.appComponent.closeModal();
        },
        /** Accepts the modal action and emits an event */
        accept() {
            this.emitter.emit('accept:modal'); // Emit accept event
            this.appComponent.closeModal(); // Close the modal
            console.log('Se acepto el modal', this.emitter); // Log acceptance
        },
        goToLink() {
            if (this.link2) {
				this.emitter.emit('go:register');
				this.$router.push(this.link2);
				this.appComponent.closeModal();
            }
        }
    },
});
</script>
<template>
    <!-- Main container for the modal, covering the entire screen with a dark background -->
    <div class="in w-screen h-screen bg-neutral-content/80 fixed inset-0 flex justify-center items-center">
        <!-- Inner container for the modal content, with responsive width and height -->
        <div
            class="relative rounded-box min-w-[98%] sm:min-w-[370px] sm:max-w-[50%] min-h-[270px] max-h-[75%] overflow-hidden text-neutral/80"
        >
            <!-- Button to close the modal, positioned at the top right -->
            <button
                class="absolute right-6 top-5 hover:scale-125 text-neutral"
                @click="$emit('close')"
            >
                <!-- SVG icon for the close button -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <!-- Diagonal lines for the close icon -->
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
                </svg>
            </button>
            <!-- Title of the modal -->
            <h3 class="w-full p-4 bg-base-300 text-xl font-bold">
                {{ title }}
            </h3>
            <!-- Container for the message and button, with a secondary background -->
            <div class="bg-base-200 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box">
                <!-- Message displayed in the modal -->
                <p class="text-lg text-start w-full text-neutral min-h-16 max-w-2xl">
                    {{ message }}
                </p>
                <!-- Container for the action button, aligned to the right -->
                <div class="w-full flex lg:flex-row flex-col justify-end lg:items-center items-end gap-4">
                    <!-- Button to close the modal -->
                    <button
                        @click="$emit('close')"
                        class="btn btn-outline btn-primary hover:btn-primary hover:text-neutral normal-case text-base"
                    >
                        {{ button }}
                    </button>
                    <button v-if="button2" @click="goToLink"
                        class="btn btn-outline btn-primary hover:text-base-content normal-case text-base">
                        {{ button2 }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

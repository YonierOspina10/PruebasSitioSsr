<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MethodsDepositV3 from '@/components/MethodsDepositV3.vue'; // Importing methodsDeposit component
import ExitIcon from '../icons/ExitIcon.vue';

export default defineComponent({
    components: {
        MethodsDepositV3, // Registering MethodsDepositV3 component
        ExitIcon, // Registering ExitIcon component
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing appComponent from the context
        let emitter = this.$emitter(); // Accessing event emitter from the context
        let config = this.$config(); // Accessing configuration from the context
        let newView = false; // Variable to track if new view is enabled
        return {
            appComponent, // Returning appComponent for use in the template
            emitter, // Returning emitter for use in methods
            config, // Returning config for use in the template
            newView, // Returning newView for use in the template
        };
    },
    updated() {
    }, // Lifecycle hook for when the component is updated
    mounted() {
        document.querySelector('body')!.style.overflow = 'hidden'; // Disabling body scroll when modal is mounted
    }, // Lifecycle hook for when the component is mounted
    methods: {
        close() {
            this.appComponent.showModalDepositV3 = false; // Method to close the modal
            this.appComponent.infoModalDeposit = undefined; // Resetting infoModalDeposit to undefined
        },
        accept() {
            this.emitter.emit('accept:modal'); // Method to emit an 'accept' event
        },
    },
    unmounted() {
        document.querySelector('body')!.style.overflow = 'auto'; // auto body scroll when modal is unmounted
    }
});
</script>

<template>
    <!-- Main modal container, shown based on config.layout -->
    <div v-if="config.layout != 3" class="modal z-50">
        <!-- General container for modal content -->
        <div
            class="container-general w-full flex flex-col justify-center items-center"
        >
            <!-- Container for image and text with specific styles -->
            <div
                class="container-img-text w-full md:w-[820px] overflow-y-auto containar p-5 pt-8 rounded-3xl relative"
                :style="{
					backgroundColor: '#FFFFFF',
				}"
            >
                <!-- Promotion image container -->
                <div class="promotion-image w-full h-full shadow-md relative">
                    <!-- Close button to trigger close method -->
                    <label
                        @click="close()"
                        class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs -top-7 -right-2 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
                    >✕</label
                    >
                </div>
                <!-- Scrollable content area -->
                <div
                    class="w-full h-[80vh] overflow-auto text-black"
                    :style="[
						{
							borderRadius: '0px',
						},
						{
							marginTop: '0px',
						},
					]"
                >
                    <MethodsDepositV3 />
                </div>
            </div>
        </div>
    </div>
    <!-- Teleporting dialog to body for layout 3 -->
    <Teleport to="body">
        <dialog
            v-if="config.layout !== undefined && config.layout === 3"
            class="modal in w-screen h-screen bg-base-content bg-opacity-80 backdrop-blur-sm"
        >
            <!-- Dialog container with specific dimensions and styles -->
            <div
                class="modal-v3 relative rounded-box w-full h-full flex flex-col justify-center items-center min-w-[340px] max-w-[756px] min-h-[542px] max-h-[542px] sm:max-h-[522px] bg-base-200 bg-opacity-90 border-2 border-accent-focus/10"
            >
                <img src="https://images.virtualsoft.tech/m/msj0212T1747918982.png" alt="background-modal" class="hidden md:block md:absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-box opacity-25 z-1" />
                <!-- Close button for the dialog -->
                <button
                    class="absolute right-3 top-3 hover:scale-125 z-20 stroke-accent-focus fill-accent-focus"
                    @click="close()"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <MethodsDepositV3 />
            </div>
        </dialog>
    </Teleport>
</template>

<style scoped>
/* Styles for the container with rounded corners and shadow */
.containar {
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.47);
}

/* Styles for the close button */
.close-btn {
    box-shadow: inset 0px -4px 2px 0px #00000030 !important;
}

/* Styles for the modal background */
.modal {
    opacity: 0.8;
    z-index: 999 !important; /* Ensures modal is on top */
    backdrop-filter: blur(8px);
}

/* Styles for input labels */
input.FormLabel {
    color: black !important;
}

/* Styles for the submit button */
.submit-button {
    box-shadow: inset 0px -20px 9px -11px #00000030 !important;
}

/* Custom scrollbar styles */
.scrollWidth::-webkit-scrollbar {
    width: 0.5em; /* Width of the scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

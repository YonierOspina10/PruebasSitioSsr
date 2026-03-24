<script lang="ts">
import Register from '../../../../SitioVersion5/src/views/Register.vue'; // Importing Register component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import CloseIcon from '../icons/CloseIcon.vue'; // Importing CloseIcon component
import { useModalStore } from '../../stores/Modal'; // Importing modal store for state management

export default defineComponent({
    components: {
        Register, // Register component used in this component
        CloseIcon, // CloseIcon component used in this component
    },
    data() {
        // Data function returning component state
        let appComponent: any = this.$appComponent; // Reference to the app component
        let modals = useModalStore(); // Accessing modal store
        return {
            appComponent, // Exposing appComponent to the template
            modals, // Exposing modals to the template
        };
    },
    created() {
        // Lifecycle hook called after the instance is created
        window.addEventListener('resize', () => {
            // Event listener for window resize
            if (window.screen.width <= 1020)
                this.appComponent.config.mobileL = '1'; // Set mobile layout flag
            else this.appComponent.config.mobileL = ''; // Reset mobile layout flag
        });
    },
});
</script>
<template>
    <!-- Button to close the modal, emits a 'close' event -->
    <button
        @click="$emit('close')"
        class="fixed top-2 right-2 lg:right-8 hover:scale-90 transition-all z-[9999999999] rounded-full bg-neutral p-1 shadow-[inset_1px_-5px_2px] shadow-neutral-content/40"
    >
        <CloseIcon class="text-red-700 w-7 h-7 rounded-full"></CloseIcon>
    </button>

    <!-- Modal container -->
    <div class="modal z-[999999999]">
        <!-- Full-screen overlay with centered content -->
        <div class="w-full h-full overflow-auto flex justify-center items-center">
            <!-- Main content container with dynamic background -->
            <div
                :style="{
                    background: `url('${
                        (appComponent.config.mobileL == undefined || appComponent.config.mobileL == '') &&
                        appComponent.config.registro != undefined &&
                        appComponent.config.registro.bgDesktop != undefined &&
                        appComponent.config.registro.bgDesktop[appComponent.country] != undefined
                            ? appComponent.config.registro.bgDesktop[appComponent.country]
                            : appComponent.config.mobileL != undefined &&
                                appComponent.config.mobileL == 1 &&
                                appComponent.config.registro != undefined &&
                                appComponent.config.registro.bgMobile != undefined &&
                                appComponent.config.registro.bgMobile[appComponent.country] != undefined
                              ? appComponent.config.registro.bgMobile[appComponent.country]
                              : ''
                    }')`,
                }"
                class="container-general bg-cover shadow-[inset_0px_-170px_21px_-30px_,_inset_0px_-90px_21px_-30px_,_inset_0px_-340px_111px_-170px] shadow-neutral-content lg:shadow-transparent w-[90%] h-[95%] relative rounded-[66px] overflow-visible xl:overflow-hidden grid grid-cols-1 lg:grid-cols-[65%_35%] justify-items-start items-start lg:items-center p-3 lg:p-0"
            >
                <!-- Decorative span element for styling -->
                <span
                    :class="[
                        'w-[95%] h-[92%] absolute top-2/4  left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-[66px] border-solid border-6 border-primary hidden lg:block',
                        'shadow-[0px_0px_38px_8px_,_inset_0px_0px_38px_8px] shadow-primary',
                    ]"
                ></span>
                <!-- Image container with conditional rendering -->
                <div class="flex justify-start items-end w-full h-full relative">
                    <img
                        v-if="appComponent.config.mobileL == undefined || appComponent.config.mobileL == ''"
                        :src="
                            appComponent.config != undefined &&
                            appComponent.config.registro != undefined &&
                            appComponent.config.registro.imgDesktop[appComponent.country] != undefined
                                ? appComponent.config.registro.imgDesktop[appComponent.country]
                                : 'https://images.virtualsoft.tech/m/msj18212T1712932927.png'
                        "
                        alt="Character imagen"
                        class="object-contain w-full h-[88vh]"
                    />
                    <img
                        v-else
                        :src="
                            appComponent.config != undefined &&
                            appComponent.config.registro != undefined &&
                            appComponent.config.registro.imgMobile[appComponent.country] != undefined
                                ? appComponent.config.registro.imgMobile[appComponent.country]
                                : 'https://images.virtualsoft.tech/m/msj18212T1712944244.png'
                        "
                        alt="Character imagen"
                        class="object-contain w-full h-auto relative -mt-7 ml-6"
                    />
                </div>
                <!-- Container for registration component -->
                <div
                    class="h-full lg:h-[87%] lg:overflow-auto w-full lg:w-[88%] rounded-3xl pb-11 lg:pb-4 lg:[mask-image:_linear-gradient(black_85%_,_transparent)]"
                >
                    <div
                        class="border-solid border-6 border-base-300 relative rounded-3xl overflow-hidden shadow-[-1px_-3px_17px_10px] shadow-neutral-content lg:shadow-transparent"
                    >
                        <Register class="z-1 w-full h-full rounded-full"></Register>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/* Custom scrollbar styles for div elements */
div::-webkit-scrollbar {
    width: 0.5em; /* Width of the scrollbar */
    height: 8px; /* Height of the horizontal scrollbar */
}

div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow effect for the track */
    border-radius: 20px; /* Rounded corners for the track */
}

div::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0) !important; /* Color of the scrollbar thumb */
    border-radius: 20px; /* Rounded corners for the thumb */
}

/* Styles for tables within elements with the class 'paragraph-image' */
.paragraph-image table {
    color: black; /* Text color for table content */
}

/* Modal background styling */
.modal {
    background-color: rgba(0, 0, 0, 0.75) !important; /* Semi-transparent black background */
}
</style>

<!-- FILE DOCUMENTED -->

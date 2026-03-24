<template>
    <!-- Main section for the animation, fixed position with full width and centered content -->
    <section class="animation w-full fixed z-[200] flex justify-center items-center right-auto">
        <!-- Article container for the contingency message, styled with background and rounded corners -->
        <article
            class="w-full max-w-7xl bg-[#c80202] rounded-b-3xl flex justify-center items-center gap-3 sm:gap-10 py-2 sm:py-4 px-4 sm:px-8 shadow-inner shadow-black/75"
        >
            <!-- Conditional rendering of the icon based on the presence of contingencyData.icon -->
            <img
                v-if="contingencyData.icon !== undefined && contingencyData.icon !== ''"
                :src="contingencyData.icon"
                alt="ContingencyIcon"
                class="w-8 aspect-square object-contain object-center"
            />
            <!-- Displaying the contingency message or a default message if not available -->
            <p class="text-white text-center text-sm sm:text-lg">
                {{
                    contingencyData.message !== undefined &&
                    contingencyData.message[appComponent.lngProd] !== undefined &&
                    contingencyData.message[appComponent.lngProd] !== ''
                        ? contingencyData.message[appComponent.lngProd]
                        : $t(
                              'Estamos presentando una pequeña intermitencia. La seguridad de tus datos y tu dinero son nuestra prioridad.',
                          )
                }}
            </p>
        </article>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling contingency messages.
 */
export default defineComponent({
    setup() {
        return {};
    },
    data() {
        // Accessing the appComponent from the context
        let appComponent: any = this.$appComponent;
        return {
            appComponent,
            // Extracting contingency data from the appComponent configuration
            contingencyData: appComponent.config.contingency,
        };
    },
});
</script>

<style scoped>
/* Animation class for sliding in effect */
.animation {
    animation: slideIn 1s ease-in-out;
}

/* Keyframes for slideIn animation */
@keyframes slideIn {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>

<!-- FILE DOCUMENTED -->

<template>
    <!-- Button for currency exchange functionality -->
    <button
        @click="appComponent.modalCurrencyExchange = true"
        @mouseover="onCurrencyList = true"
        @mouseleave="onCurrencyList = false"
        class="currency_exchange flex justify-end items-center gap-2 rounded-full"
        :class="onCurrencyList && appComponent.config.currencyInfo != false ? 'bg-neutral w-[220px]' : ''"
    >
            <img
                v-if="onCurrencyList && appComponent.config.currencyInfo != false"
                src="https://images.virtualsoft.tech/m/msjT1696857909.png"
                alt="IconCurrencyExchange"
                class="w-8 h-5 object-contain pl-3"
            />
            <span
                v-if="onCurrencyList && appComponent.config.currencyInfo != false"
                class="text-black capitalize"
                >{{ $t('cambio de moneda') }}</span
            >
        <div
            class="in h-9 w-9 bg-base-300 rounded-full flex justify-center items-center hover:scale-105 border border-accent"
        >
            <font-awesome-icon
                icon="fa-arrow-right-arrow-left"
                class="text-neutral text-xl"
            />
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue

export default defineComponent({
    setup() {
        return {}; // Setup function returns an empty object
    },
    data() {
        let config: any = this.$config; // Accessing configuration object
        let appComponent: any = this.$appComponent; // Accessing application component object
        let onCurrencyList: boolean = false; // State variable to track currency list visibility
        return { config, appComponent, onCurrencyList }; // Returning data properties
    },
});
</script>

<style scoped>
.currency_exchange img {
    display: none; /* Hides the image by default */
}

.currency_exchange span {
    display: none; /* Hides the span by default */
}

.currency_exchange:hover img {
    display: flex; /* Displays the image on hover */
    animation: wipe-in-left 0.5s ease-in-out; /* Animation effect on hover */
}

.currency_exchange:hover span {
    display: flex; /* Displays the span on hover */
    animation: wipe-in-left 0.5s ease-in-out; /* Animation effect on hover */
}

@keyframes wipe-in-left {
    from {
        clip-path: inset(0 0 0 100%); /* Initial state of the animation */
    }
    to {
        clip-path: inset(0 0 0 0); /* Final state of the animation */
    }
}

[transition-style='in:wipe:left'] {
    animation: 2.5s cubic-bezier(0.25, 1, 0.3, 1) wipe-in-left both; /* Transition style for specific elements */
}
</style>

<!-- FILE DOCUMENTED -->

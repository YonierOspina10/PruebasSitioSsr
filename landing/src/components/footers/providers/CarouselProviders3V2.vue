<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for handling payment methods display.
 */
export default defineComponent({
    data() {
        // Retrieve configuration and app component from the context.
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        return {
            config,
            appComponent,
        };
    },
    methods: {
        /**
         * Redirects to the specified box URL based on the app component's base URL.
         * @param box - The box object containing the URL to redirect to.
         */
        clickBox(box: any) {
            window.location.href = this.appComponent.config.baseUrlFx + box.url;
        },
        /**
         * Generates a srcset string for responsive images based on the provided image URL and sizes.
         * @param imageUrl - The URL of the image.
         * @param sizes - An array of sizes for the srcset (default: [480, 768, 1024, 1440]).
         * @returns A string formatted for the srcset attribute.
         */
        getSrcset(imageUrl: string, sizes = [480, 768, 1024, 1440]) {
            if (!imageUrl) return '';
            const baseUrl = imageUrl.split('?')[0];
            return sizes.map((size) => `${baseUrl}?w=${size}&fm=webp ${size}w`).join(', ');
        },
    },
});
</script>

<template>
    <!-- Main container for payment methods, with conditional class based on lightColor configuration -->
    <div
        :class="{ light: appComponent.config.providers.lightColor }"
        class="overflow-x-auto px-5 flex flex-col pt-2 justify-center items-center w-full"
    >
        <!-- Title for the payment methods section -->
        <span class="text-info-text font-bold">{{ $t('MEDIOS DE PAGO:') }}</span>
        <!-- List of payment method icons -->
        <ul class="w-full flex flex-wrap gap-8 md:gap-16 justify-center items-center py-4 max-w-[1000px]">
            <li
                v-for="value in appComponent.config.PROVIDERS[appComponent.country]"
                class="w-[65px] h-[40px] flex flex-shrink-0"
            >
                <!-- Link to deposit management page with payment method icon -->
                <RouterLink
                    :to="appComponent.config.baseUrlFx + '/gestion/deposito'"
                    target="_blank"
                >
                    <img
                        width="65"
                        height="40"
                        :alt="value.NAME"
                        class="payment-methods object-contain h-full w-full"
                        :class="value.NAME"
                        loading="lazy"
                        v-if="value.ICON != undefined && value.showF"
                        :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                        :srcset="getSrcset(value.ICON)"
                    />
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* Styles for the payment methods footer */
.metodos-pago-footer ul {
    text-align: center; /* Center align text in the list */
    background: rgba(255, 255, 255, 0.0784313725490196); /* Semi-transparent background */
    overflow-x: auto; /* Allow horizontal scrolling */
    white-space: nowrap; /* Prevent line breaks */
}
.metodos-pago-footer ul li {
    display: inline-block; /* Display list items inline */
    margin: 15px 30px; /* Margin around list items */
}
.metodos-pago-footer.light ul {
    background: rgb(194, 0, 0); /* Background color for light mode */
}
.metodos-pago-footer.light ul li.medios-title {
    color: black; /* Text color for title in light mode */
    font-weight: 400; /* Font weight for title */
}
.metodos-pago-footer.light ul li img.Pagoefectivo {
    background: silver; /* Background for specific payment method icon */
    border-radius: 5px; /* Rounded corners */
    padding: 0 3px; /* Padding around the image */
}
/* Responsive styles for screens smaller than 768px */
@media only screen and (max-width: 768px) {
    .metodos-pago-footer ul {
        white-space: nowrap; /* Prevent line breaks */
        overflow-y: scroll; /* Allow vertical scrolling */
    }
}
</style>

<!-- FILE DOCUMENTED -->

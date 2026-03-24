<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for payment methods footer.
 */
export default defineComponent({
    data() {
        // Retrieves the app component from the context.
        let appComponent: any = this.$appComponent;
        return {
            appComponent,
        };
    },
    methods: {
        /**
         * Redirects to the specified box URL.
         * @param box - The box object containing the URL.
         */
        clickBox(box: any) {
            window.location.href = this.config.baseUrlFx + box.url;
        },
        /**
         * Generates a srcset string for responsive images.
         * @param imageUrl - The base image URL.
         * @param sizes - An array of sizes for the srcset (default: [480, 768, 1024, 1440]).
         * @returns A formatted srcset string.
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
    <!-- Main container for payment methods footer -->
    <div
        :class="{ light: appComponent.config.providers.lightColor }"
        class="metodos-pago-footer"
    >
        <ul>
            <!-- Title for payment methods -->
            <li class="medios-title align-top text-info-text">
                <span>{{ $t('MEDIOS DE PAGO:') }}</span>
            </li>
            <!-- List of payment methods -->
            <li
                v-for="value in appComponent.config.PROVIDERS[appComponent.country]"
                class="list-payments overflow-y-hidden"
            >
                <RouterLink
                    :to="appComponent.config.baseUrlFx + '/gestion/deposito'"
                    target="_blank"
                >
                    <!-- Payment method icon -->
                    <img
                        height="40"
                        width="65"
                        :alt="value.NAME"
                        loading="lazy"
                        class="payment-methods object-contain h-full w-full"
                        :class="value.NAME"
                        :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                        v-if="value.ICON != undefined && value.showF"
                        :srcset="getSrcset(value.ICON)"
                    />
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<style>
/* Styles for individual payment method list items */
.list-payments {
    width: 60px;
    height: 20px;
}

/* Styles for the payment methods footer */
.metodos-pago-footer ul {
    text-align: center;
    background: rgba(255, 255, 255, 0.0784313725490196);
    overflow-x: auto;
    white-space: nowrap;
}

/* Styles for each list item in the payment methods footer */
.metodos-pago-footer ul li {
    display: inline-block;
    margin: 15px 30px;
}

/* Styles for the footer when light mode is enabled */
.metodos-pago-footer.light ul {
    background: white;
}

/* Styles for the title in light mode */
.metodos-pago-footer.light ul li.medios-title {
    color: black;
    font-weight: 400;
}

/* Specific styles for the Pagoefectivo payment method */
.metodos-pago-footer.light ul li img.Pagoefectivo {
    background: silver;
    border-radius: 5px;
    padding: 0 3px;
}

/* Responsive styles for smaller screens */
@media only screen and (max-width: 768px) {
    .metodos-pago-footer ul {
        white-space: nowrap;
        overflow-y: scroll;
    }
}
</style>

<!-- FILE DOCUMENTED -->

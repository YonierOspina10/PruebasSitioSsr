<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component options.
 */
export default defineComponent({
    /**
     * Component props definition.
     * @type {Object}
     */
    props: {
        /**
         * Width of the component.
         * @type {Number}
         */
        width: Number,

        /**
         * Height of the component.
         * @type {Number}
         */
        height: Number,

        /**
         * Fill color of the component.
         * @type {String}
         */
        fill: String,
    },
});
</script>
<template>
    <!-- SVG container for scalable vector graphics -->
    <svg
        :width="width"
        :height="height"
        :fill="fill"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21.31 22.73"
    >
        <path
            class="cls-1"
            d="m21.06,21.14l-3.72-4c1.77-1.82,2.87-4.3,2.87-7.04C20.21,4.53,15.67,0,10.1,0S0,4.53,0,10.1s4.53,10.1,10.1,10.1c2.16,0,4.15-.68,5.8-1.84l3.78,4.06c.19.2.44.3.69.3.23,0,.46-.08.64-.25.38-.36.4-.95.05-1.34ZM1.89,10.1C1.89,5.57,5.58,1.89,10.1,1.89s8.21,3.69,8.21,8.21-3.68,8.21-8.21,8.21S1.89,14.63,1.89,10.1Z"
        />
        <path
            class="cls-1"
            d="m15.13,10.17c-.46,0-.88-.32-.98-.8-.73-3.51-4.18-3.74-4.32-3.75-.55-.03-.97-.5-.95-1.05.03-.55.54-.97,1.04-.95,1.77.08,5.34,1.3,6.18,5.33.11.54-.23,1.07-.77,1.18-.07.01-.14.02-.21.02Z"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

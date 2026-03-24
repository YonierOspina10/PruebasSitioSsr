<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component options.
 */
export default defineComponent({
    props: {
        /**
         * Width of the component.
         * @type {Number}
         * @default 24
         */
        width: {
            type: Number,
            default: 24,
        },
        /**
         * Height of the component.
         * @type {Number}
         * @default 24
         */
        height: {
            type: Number,
            default: 24,
        },
        /**
         * Fill color for the component.
         * @type {String}
         */
        fill: String,
    },
});
</script>
<template>
    <!-- SVG container for scalable vector graphics -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :fill="fill"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            :stroke="fill"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

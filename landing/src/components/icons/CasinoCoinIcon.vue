<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component options.
 */
export default defineComponent({
    /**
     * Component props.
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
    <!-- SVG container for vector graphics -->
    <svg
        :width="width"
        :height="height"
        :fill="fill"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24.07 24.1"
    >
        <path
            class="cls-1"
            d="m24.07,15.68c..."
        />
        <path
            class="cls-1"
            d="m9.59,0c..."
        />
        <path
            class="cls-1"
            d="m5.5,12.98c..."
        />
        <path
            class="cls-1"
            d="m20.32,1.06c..."
        />
        <path
            class="cls-1"
            d="m6.1,20.72c..."
        />
        <path
            class="cls-1"
            d="m5.63,2.65v.72h-.73v-.72h.73Z"
        />
        <path
            class="cls-1"
            d="m13.15,2.65v.72h-.72v-.72h.72Z"
        />
        <path
            class="cls-1"
            d="m2.24,8.68v.72h-.72v-.72h.72Z"
        />
        <path
            class="cls-1"
            d="m4.9,15.43v-.72h.73v.72h-.73Z"
        />
        <path
            class="cls-1"
            d="m15.42,11.7v.73h1.12v.75h-1.1v1.49c..."
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

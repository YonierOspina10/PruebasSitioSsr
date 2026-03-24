<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a customizable shape.
 * @component
 */
export default defineComponent({
    /**
     * Component props definition.
     * @property {Number} width - The width of the shape.
     * @property {Number} height - The height of the shape.
     * @property {String} fill - The primary fill color of the shape.
     * @property {String} fill2 - The secondary fill color of the shape.
     */
    props: {
        width: Number,
        height: Number,
        fill: String,
        fill2: String,
    },
});
</script>
<template>
    <!-- SVG container for scalable vector graphics -->
    <svg
        :width="width"
        :height="height"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24.94 24.94"
    >
        <circle
            :fill="fill"
            class="cls-1"
            cx="12.47"
            cy="12.47"
            r="12.47"
        />
        <circle
            :fill="fill2"
            class="cls-2"
            cx="12.47"
            cy="12.47"
            r="10.66"
        />
        <path
            :fill="fill"
            class="cls-1"
            d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

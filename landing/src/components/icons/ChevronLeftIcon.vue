<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component options.
 */
export default defineComponent({
    /**
     * Component props definition.
     * @property {Number} width2 - The second width property.
     * @property {Number} width - The width of the component.
     * @property {Number} height - The height of the component.
     * @property {String} fill - The fill color or pattern.
     */
    props: {
        width2: Number,
        width: Number,
        height: Number,
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
        viewBox="0 0 384 512"
    >
        <path
            d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        />
    </svg>
</template>
<style scoped>
/* Icon check class for positioning */
.iconCheck {
    position: absolute; /* Positions the element absolutely within its nearest positioned ancestor */
    left: 0; /* Aligns the element to the left */
}
</style>

<!-- FILE DOCUMENTED -->

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
     * @property {String} fill - The fill color of the component.
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
            d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
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

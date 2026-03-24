<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * @component
 */
export default defineComponent({
    // Component props definition
    props: {
        /** Width of the SVG element */
        width: Number,
        /** Height of the SVG element */
        height: Number,
        /** Fill color of the SVG element */
        fill: String,
    },
});
</script>

<template>
    <!-- SVG container with dynamic width, height, and fill properties -->
    <svg :width="width" :height="height" viewBox="0 0 17 21"  xmlns="http://www.w3.org/2000/svg">
        <path d="M6 16.5C5.45 16.5 4.97917 16.3042 4.5875 15.9125C4.19583 15.5208 4 15.05 4 14.5V2.5C4 1.95 4.19583 1.47917 4.5875 1.0875C4.97917 0.695833 5.45 0.5 6 0.5H15C15.55 0.5 16.0208 0.695833 16.4125 1.0875C16.8042 1.47917 17 1.95 17 2.5V14.5C17 15.05 16.8042 15.5208 16.4125 15.9125C16.0208 16.3042 15.55 16.5 15 16.5H6ZM6 14.5H15V2.5H6V14.5ZM2 20.5C1.45 20.5 0.979167 20.3042 0.5875 19.9125C0.195833 19.5208 0 19.05 0 18.5V5.5C0 5.21667 0.0958333 4.97917 0.2875 4.7875C0.479167 4.59583 0.716667 4.5 1 4.5C1.28333 4.5 1.52083 4.59583 1.7125 4.7875C1.90417 4.97917 2 5.21667 2 5.5V18.5H12C12.2833 18.5 12.5208 18.5958 12.7125 18.7875C12.9042 18.9792 13 19.2167 13 19.5C13 19.7833 12.9042 20.0208 12.7125 20.2125C12.5208 20.4042 12.2833 20.5 12 20.5H2Z" />
    </svg>

</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG element.
 * Accepts props for width, height, and fill color.
 */
export default defineComponent({
    // Component props definition
    props: {
        // Width of the SVG element
        width: Number,
        // Height of the SVG element
        height: Number,
        // Fill color of the SVG element
        fill: String,
    },
});
</script>

<template>
    <!-- SVG container with dynamic width, height, and fill color -->
    <svg :width="width" :height="height" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.502 1C16.8581 1 17.1817 1.20575 17.3294 1.52646L19.9182 7.15146C20.0644 7.46921 20.0118 7.84269 19.7832 8.10859L10.6925 18.6836C10.5197 18.8845 10.2665 19 10 19C9.73354 19 9.48026 18.8845 9.30754 18.6836L0.216774 8.10859C-0.0118085 7.84269 -0.0643899 7.46921 0.0818334 7.15146L2.67057 1.52646L2.7336 1.41221C2.89928 1.15767 3.18621 1 3.49797 1H16.502ZM1.97633 7.37734L10 16.7104L18.0228 7.37734L15.917 2.8H4.08301L1.97633 7.37734Z" fill="currentColor"/>
<path d="M12.9573 6.70233C13.2909 6.33082 13.8649 6.29739 14.2402 6.62762C14.6154 6.95784 14.6492 7.52613 14.3156 7.89764L10.6793 11.9476C10.5068 12.1398 10.2598 12.25 10.0002 12.25C9.74051 12.25 9.49355 12.1398 9.32103 11.9476L5.68473 7.89764C5.35117 7.52613 5.38494 6.95784 5.76019 6.62762C6.13544 6.29739 6.70946 6.33082 7.04302 6.70233L10.0002 9.99559L12.9573 6.70233Z" fill="currentColor"/>
    </svg>
</template>

<!-- FILE DOCUMENTED -->

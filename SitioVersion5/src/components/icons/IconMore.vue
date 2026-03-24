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
    <g filter="url(#filter0_i_298_13477)">
        <rect y="0.5" width="25" height="25" rx="12.5" fill="#00AB46"/>
        <line x1="12.5001" y1="8.00791" x2="12.5001" y2="17.9926" stroke="#FBFBFB" stroke-width="1.92012" stroke-linecap="round"/>
        <line x1="7.50791" y1="13.0004" x2="17.4926" y2="13.0004" stroke="#FBFBFB" stroke-width="1.92012" stroke-linecap="round"/>
    </g>
    <defs>
        <filter id="filter0_i_298_13477" x="0" y="-1.88095" width="25" height="27.381" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-2.38095"/>
            <feGaussianBlur stdDeviation="1.19048"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_298_13477"/>
        </filter>
    </defs>
    </svg>
</template>

<!-- FILE DOCUMENTED -->

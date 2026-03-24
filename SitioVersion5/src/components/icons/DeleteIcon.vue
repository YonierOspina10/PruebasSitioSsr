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
    },
});
</script>

<template>
    <!-- SVG container with dynamic width, height, and fill properties -->
    <svg :width="width" :height="height" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_1038_7989)">
            <circle cx="15.5" cy="13.5" r="10" fill="url(#paint0_linear_1038_7989)" stroke="#911919"/>
            <path d="M13 9.89453L18.8476 17.0102" stroke="#FBFBFB" stroke-width="3" stroke-linecap="round"/>
            <path d="M13 17.1055L18.7589 9.93763" stroke="#FBFBFB" stroke-width="3" stroke-linecap="round"/>
        </g>
        <defs>
            <filter id="filter0_d_1038_7989" x="0" y="0" width="31" height="31" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1038_7989"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="3"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0784314 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1038_7989"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1038_7989" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_1038_7989" x1="15.5" y1="3" x2="15.5" y2="24" gradientUnits="userSpaceOnUse">
                <stop stop-color="#BE4848"/>
                <stop offset="1" stop-color="#880B0B"/>
            </linearGradient>
        </defs>
    </svg>
</template>

<!-- FILE DOCUMENTED -->

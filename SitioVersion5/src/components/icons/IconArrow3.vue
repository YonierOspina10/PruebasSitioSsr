<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * This component accepts props to customize the SVG's dimensions and fill color.
 */
export default defineComponent({
    // Define the props that can be passed to this component
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
    <!-- SVG container with dynamic width, height, and fill color based on props -->
    <svg :width="width" :height="height" viewBox="0 0 35 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_835_10320)">
            <path d="M23.5 12.3331C24.8333 13.1029 24.8333 15.0274 23.5 15.7972L13 21.8594C11.6667 22.6292 10 21.667 10 20.1274L10 8.00301C10 6.46341 11.6667 5.50116 13 6.27096L23.5 12.3331Z" fill="#AC6822"/>
            <path d="M23.375 12.5496C24.5417 13.2231 24.5417 14.9072 23.375 15.5808L12.875 21.6433C11.7085 22.3166 10.2502 21.4746 10.25 20.1277L10.25 8.00269C10.2502 6.65579 11.7085 5.81372 12.875 6.48706L23.375 12.5496Z" stroke="#FBFBFB" stroke-width="0.5"/>
        </g>
        <defs>
            <filter id="filter0_d_835_10320" x="0" y="0" width="34.5" height="36.1304" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_835_10320"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_835_10320" result="shape"/>
            </filter>
        </defs>
    </svg>
</template>

<!-- FILE DOCUMENTED -->

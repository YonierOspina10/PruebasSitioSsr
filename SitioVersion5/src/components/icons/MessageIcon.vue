<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG element.
 * This component accepts three props: width, height, and fill.
 */
export default defineComponent({
    props: {
        /** 
         * Width of the SVG element.
         * Type: Number
         */
        width: Number,
        
        /** 
         * Height of the SVG element.
         * Type: Number
         */
        height: Number,
        
        /** 
         * Fill color for the SVG element.
         * Type: String
         */
        fill: String,
    },
});
</script>

<template>
    <!-- Placeholder for the SVG element -->
    <svg
        :width="width"
        :height="height"
        :fill="fill"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24.84 17.68"
    >
        <path
            class="icon-message"
            d="m24.84,16.02c-.06-.04-.13-.07-.18-.12-2.43-2.26-4.86-4.53-7.29-6.79-.03-.03-.08-.05-.14-.08.08-.08.12-.12.16-.16,2.43-2.34,4.85-4.67,7.28-7.01.05-.05.11-.09.17-.14v14.3Z"
        />
        <path
            class="icon-message"
            d="m.67.42C.94.19,1.24.06,1.57.02,1.71,0,1.85,0,1.98,0,8.96,0,15.94,0,22.91,0c.37,0,.74.04,1.08.27-3.86,3.71-7.7,7.41-11.56,11.13C8.51,7.74,4.6,4.09.67.42Z"
        />
        <path
            class="icon-message"
            d="m1.22,17.54c2.52-2.43,5.05-4.86,7.59-7.31.08.07.15.13.22.2.92.86,1.85,1.72,2.77,2.58.46.43.86.43,1.32,0,.93-.89,1.85-1.78,2.78-2.67.06-.06.13-.12.22-.2,2.61,2.44,5.22,4.87,7.88,7.35-.26.07-.46.15-.68.19-.14.03-.29.02-.44.02-6.95,0-13.91,0-20.86,0-.26,0-.52-.04-.78-.07,0-.02,0-.05-.01-.07Z"
        />
        <path
            class="icon-message"
            d="m7.6,9.12C5.09,11.54,2.6,13.93.07,16.37c-.03-.2-.06-.36-.06-.51C0,11.32,0,6.77,0,2.22c0-.04,0-.07.01-.16,2.54,2.36,5.05,4.7,7.59,7.06Z"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

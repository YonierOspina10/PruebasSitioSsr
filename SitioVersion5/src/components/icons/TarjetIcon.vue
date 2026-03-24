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
	<!-- SVG container with dynamic width, height, and fill color -->


    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 109 110"
         fill="none" class="md:hidden" :style="{ color: fill || undefined }">
        <path d="M9.073 57.7521H86.1934" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M86.1934 47.1822V79.6182C86.0573 92.5472 82.5187 95.8135 69.0453 95.8135H26.2211C12.5209 95.8135 9.073 92.4111 9.073 78.8924V47.1822C9.073 34.9337 11.931 30.9869 22.6825 30.3518C23.7712 30.3065 24.9509 30.2611 26.2211 30.2611H69.0453C82.7456 30.2611 86.1934 33.6635 86.1934 47.1822Z"
            stroke="currentColor" stroke-width="6.80474" stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M99.8028 31.0775V62.7876C99.8028 75.0362 96.9448 78.9829 86.1933 79.618V47.1821C86.1933 33.6633 82.7454 30.2609 69.0452 30.2609H26.221C24.9508 30.2609 23.7711 30.3063 22.6824 30.3517C22.8185 17.4226 26.3571 14.1564 39.8305 14.1564H82.6547C96.3549 14.1564 99.8028 17.5587 99.8028 31.0775Z"
            stroke="currentColor" stroke-width="6.80474" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M23.8167 81.3422H31.6193" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.3274 81.3422H56.933" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 109 110"
         fill="none" class="hidden md:block" :style="{ color: fill || undefined }">
        <path d="M9.073 57.7521H86.1934" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M86.1934 47.1822V79.6182C86.0573 92.5472 82.5187 95.8135 69.0453 95.8135H26.2211C12.5209 95.8135 9.073 92.4111 9.073 78.8924V47.1822C9.073 34.9337 11.931 30.9869 22.6825 30.3518C23.7712 30.3065 24.9509 30.2611 26.2211 30.2611H69.0453C82.7456 30.2611 86.1934 33.6635 86.1934 47.1822Z"
            stroke="currentColor" stroke-width="6.80474" stroke-linecap="round"
            stroke-linejoin="round" />
        <path
            d="M99.8028 31.0775V62.7876C99.8028 75.0362 96.9448 78.9829 86.1933 79.618V47.1821C86.1933 33.6633 82.7454 30.2609 69.0452 30.2609H26.221C24.9508 30.2609 23.7711 30.3063 22.6824 30.3517C22.8185 17.4226 26.3571 14.1564 39.8305 14.1564H82.6547C96.3549 14.1564 99.8028 17.5587 99.8028 31.0775Z"
            stroke="currentColor" stroke-width="6.80474" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M23.8167 81.3422H31.6193" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M41.3274 81.3422H56.933" stroke="currentColor" stroke-width="6.80474"
              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


</template>

<!-- FILE DOCUMENTED -->

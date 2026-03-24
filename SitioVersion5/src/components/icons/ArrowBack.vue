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
	<svg
		:width="width"
		:height="height"
		:fill="fill"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<!-- Path element defining the shape of the SVG -->
		<path
			d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

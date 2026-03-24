<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a customizable SVG element.
 * Accepts width and height as props to define the size of the SVG.
 */
export default defineComponent({
	// Define component props
	props: {
		// Width of the SVG element
		width: Number,
		// Height of the SVG element
		height: Number,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 24 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Path element defining a line with specified stroke properties -->
		<path d="M3 3L12 12L21 3" stroke-width="5" stroke-linecap="round" />
	</svg>
</template>

<!-- FILE DOCUMENTED -->

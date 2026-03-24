<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a custom SVG graphic.
 *
 * @component
 * @props {Number} width - The width of the SVG element.
 * @props {Number} height - The height of the SVG element.
 * @props {String} fill - The color used for the stroke of the paths.
 */
export default defineComponent({
	props: {
		width: Number, // Width of the SVG element
		height: Number, // Height of the SVG element
		fill: String, // Stroke color for the SVG paths
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 26 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- First path representing a line from (2,8) to (13,19) to (24,8) -->
		<path d="M2 8L13 19L24 8" :stroke="fill" stroke-width="3" />
		<!-- Second path representing a line from (7,5) to (13,11) to (19,5) -->
		<path d="M7 5L13 11L19 5" :stroke="fill" stroke-width="2" />
		<!-- Third path representing a line from (10,1) to (13,4) to (16,1) -->
		<path d="M10 1L13 4L16 1" :stroke="fill" />
	</svg>
</template>

<!-- FILE DOCUMENTED -->

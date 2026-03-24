<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a customizable SVG shape.
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color of the SVG shape */
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container with dynamic attributes for width, height, and fill color -->
	<svg
		:width="width"
		:height="height"
		:fill="fill"
		id="Capa_2"
		data-name="Capa 2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 8.19 10.27"
	>
		<!-- Polygon shape defined within the SVG -->
		<polygon class="cls-1" points="8.19 10.27 0 5.13 8.19 0 8.19 10.27" />
	</svg>
</template>

<!-- FILE DOCUMENTED -->

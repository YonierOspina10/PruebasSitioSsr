<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/**
		 * Width of the SVG element.
		 * @type {String}
		 */
		width: String,
		/**
		 * Height of the SVG element.
		 * @type {String}
		 */
		height: String,
		/**
		 * Fill color of the SVG element.
		 * @type {String}
		 */
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container with dynamic attributes for width, height, and fill color -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="fill"
		viewBox="0 0 512 512"
	>
		<!-- Path element defining the shape of the SVG icon -->
		<path
			d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

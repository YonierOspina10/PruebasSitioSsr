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
			d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

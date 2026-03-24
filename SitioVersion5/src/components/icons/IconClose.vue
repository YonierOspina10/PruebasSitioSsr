<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a customizable SVG icon.
 */
export default defineComponent({
	// Component props definition
	props: {
		// Width of the SVG icon, default is 24
		width: {
			type: Number,
			default: 24,
		},
		// Height of the SVG icon, default is 24
		height: {
			type: Number,
			default: 24,
		},
		// Fill color for the SVG icon
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container for the icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="fill"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<!-- Path element defining the icon shape -->
		<path
			stroke-linecap="round"
			:stroke="fill"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

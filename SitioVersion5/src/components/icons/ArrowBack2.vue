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
		viewBox="0 0 8 14"
	>
		<!-- Path element defining the shape of the SVG -->
        <path d="M6.87288 14.0621L0 7.18921L6.87288 0.316325L6.95506 0.242437C7.37926 -0.103809 8.00484 -0.0791779 8.40035 0.316325C8.79585 0.711827 8.82048 1.33741 8.47423 1.76161L8.40035 1.84379L3.05492 7.18921L8.40035 12.5346C8.82211 12.9564 8.82211 13.6403 8.40035 14.0621C7.97858 14.4839 7.29465 14.4839 6.87288 14.0621Z"/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

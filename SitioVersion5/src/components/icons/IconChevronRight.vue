<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG icon */
		width2: Number,
		/** Width of the SVG icon */
		width: Number,
		/** Height of the SVG icon */
		height: Number,
		/** Fill color of the SVG icon */
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
		viewBox="0 0 384 512"
	>
		<!-- Path element defining the shape of the icon -->
		<path
			d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
		/>
	</svg>
</template>

<style scoped>
/* Styles for the iconCheck class */
.iconCheck {
	position: absolute; /* Positioning the icon absolutely */
	left: 0; /* Aligning the icon to the left */
}
</style>

<!-- FILE DOCUMENTED -->

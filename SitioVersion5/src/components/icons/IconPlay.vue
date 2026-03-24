<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG play icon.
 */
export default defineComponent({
	// Component props definition
	props: {
		// Width of the SVG icon
		width: String,
		// Height of the SVG icon
		height: String,
		// Fill color of the SVG icon
		fill: String,
	},
});
</script>

<template>
	<!-- SVG element representing a play icon -->
	<svg
		class="iconPlay"
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="fill"
		viewBox="0 0 384 512"
	>
		<!-- Path element defining the shape of the play icon -->
		<path
			d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
		/>
	</svg>
</template>

<style scoped>
/* Styles specific to the play icon component */
.iconPlay {
	position: absolute; /* Positioning the icon absolutely */
	top: 50%; /* Centering the icon vertically */
	left: 30px; /* Setting the left offset */
	transform: translateY(-50%); /* Adjusting for vertical centering */
}
</style>

<!-- FILE DOCUMENTED -->

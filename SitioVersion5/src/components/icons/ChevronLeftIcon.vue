<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG icon */
		width2: Number,
	},
});
</script>

<template>
	<!-- SVG container for the icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 384 512"
		width="100%"
  		height="100%"
	>
		<!-- Path definition for the icon shape -->
		<path
			d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" fill="currentColor" 
		/>
	</svg>
</template>

<style scoped>
/* Styles specific to this component, scoped to avoid conflicts */
.iconCheck {
	position: absolute; /* Positioning the icon absolutely */
	left: 0; /* Aligning the icon to the left */
}
</style>

<!-- FILE DOCUMENTED -->

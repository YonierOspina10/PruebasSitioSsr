<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue for component definition

export default defineComponent({
	props: {
		width: String, // Prop to define the width of the SVG, expected to be a string
		height: String, // Prop to define the height of the SVG, expected to be a string
		fill: String, // Prop to define the fill color of the SVG, expected to be a string
	},
});
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="'#000000'"
		viewBox="0 0 512 512"
	>
		<path
			d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for this component can be added here */
</style>

<!-- FILE DOCUMENTED -->

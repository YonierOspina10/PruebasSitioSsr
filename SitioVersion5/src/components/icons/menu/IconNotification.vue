<script setup lang="ts">
/**
 * Define component props with TypeScript types.
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 * @property {string} fill - The fill color of the SVG element.
 */
defineProps<{ width: string; height: string; fill: string }>();
</script>
<template>
	<!-- SVG container with dynamic width, height, and fill color -->
	<svg
		:width="width"
		:height="height"
		:fill="fill"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<!-- Path element defining the shape of the SVG -->
		<path d="M12 13.1L3.15 7h17.7L12 13.1zM12 15l-9-6.5v10h18v-10L12 15z" />
	</svg>
</template>
<style scoped>
/* Scoped styles for this component (currently empty) */
</style>

<!-- FILE DOCUMENTED -->

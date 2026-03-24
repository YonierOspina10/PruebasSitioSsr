<script setup lang="ts">
/**
 * Define component props with TypeScript types.
 *
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 * @property {string} [fill] - Optional stroke color for the path.
 */
defineProps<{ width: string; height: string; fill?: string }>();
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 9 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Path element representing a line with dynamic stroke color -->
		<path
			d="M1.36328 2.21875L4.92642 5.78189L8.48956 2.21875"
			:stroke="fill"
			stroke-width="0.890785"
			stroke-linecap="round"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

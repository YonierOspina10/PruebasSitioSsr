<script setup lang="ts">
/**
 * Define component props with TypeScript types.
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 * @property {string} [fill] - Optional stroke color for the SVG paths.
 */
defineProps<{ width: string; height: string; fill?: string }>();
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 41 50"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- First path representing a circular shape with dynamic stroke color -->
		<path
			d="M20.6095 20.1097C25.6104 20.1097 29.6643 16.0557 29.6643 11.0548C29.6643 6.05399 25.6104 2 20.6095 2C15.6087 2 11.5547 6.05399 11.5547 11.0548C11.5547 16.0557 15.6087 20.1097 20.6095 20.1097Z"
			:stroke="fill"
			stroke-width="3.58283"
		/>
		<!-- Second path representing a larger circular shape with dynamic stroke color -->
		<path
			d="M38.7193 37.0851C38.7193 42.7104 38.7193 47.2718 20.6097 47.2718C2.5 47.2718 2.5 42.7104 2.5 37.0851C2.5 31.4598 10.6086 26.8984 20.6097 26.8984C30.6107 26.8984 38.7193 31.4598 38.7193 37.0851Z"
			:stroke="fill"
			stroke-width="3.58283"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

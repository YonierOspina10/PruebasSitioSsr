<script setup lang="ts">
/**
 * Define component props for width and height.
 * @typedef {Object} Props
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 */
defineProps<{ width: string; height: string }>();
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 30 32"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
	>
		<!-- Path element defining the shape of the SVG -->
		<path
			d="M7.46656 6.53412C7.76543 6.19241 8.17055 6.00047 8.59294 6.00047C9.01534 6.00047 9.42046 6.19241 9.71933 6.53412L15.5 13.1494L21.2807 6.53412C21.4286 6.36478 21.6042 6.23046 21.7975 6.13881C21.9907 6.04717 22.1979 6 22.4071 6C22.6162 6 22.8234 6.04717 23.0166 6.13881C23.2099 6.23046 23.3855 6.36478 23.5334 6.53412C23.6814 6.70346 23.7987 6.90449 23.8787 7.12574C23.9588 7.34698 24 7.58412 24 7.8236C24 8.06307 23.9588 8.30021 23.8787 8.52146C23.7987 8.74271 23.6814 8.94374 23.5334 9.11307L17.7549 15.7308L23.5334 22.3485C23.8322 22.6905 24 23.1543 24 23.6379C24 24.1216 23.8322 24.5854 23.5334 24.9274C23.2347 25.2694 22.8295 25.4615 22.4071 25.4615C21.9846 25.4615 21.5794 25.2694 21.2807 24.9274L15.5 18.3122L9.71933 24.9274C9.42059 25.2694 9.01542 25.4615 8.59294 25.4615C8.17047 25.4615 7.7653 25.2694 7.46656 24.9274C7.16783 24.5854 7 24.1216 7 23.6379C7 23.1543 7.16783 22.6905 7.46656 22.3485L13.2451 15.7308L7.46656 9.11307C7.16807 8.77094 7.00041 8.30715 7.00041 7.8236C7.00041 7.34004 7.16807 6.87626 7.46656 6.53412Z"
		/>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

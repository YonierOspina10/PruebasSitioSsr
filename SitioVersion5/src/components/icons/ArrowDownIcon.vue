<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * This component accepts props to customize the SVG's dimensions and fill color.
 */
export default defineComponent({
	// Define the props that can be passed to this component
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
	<!-- SVG container with dynamic width, height, and fill color based on props -->
	<svg
		:width="width"
		:height="height"
		:fill="fill"
		id="Capa_2"
		data-name="Capa 2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 14.75 8.39"
	>
		<!-- Path element defining the shape of the SVG graphic -->
		<path
			class="cls-1"
			d="m0,.89C.07.63.18.39.39.22c.37-.29.9-.3,1.27,0,.07.06.14.12.2.18,1.79,1.79,3.59,3.58,5.38,5.37.04.04.07.09.17.16.03-.05.05-.11.09-.15,1.8-1.81,3.61-3.61,5.42-5.41.32-.32.68-.45,1.12-.32.66.2.92,1.04.5,1.58-.06.08-.12.15-.19.21-2.01,2.01-4.03,4.02-6.04,6.03-.23.23-.47.44-.8.51h-.29c-.33-.07-.56-.28-.8-.51C4.46,5.9,2.48,3.92.49,1.95c-.22-.22-.43-.45-.49-.77v-.29Z"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

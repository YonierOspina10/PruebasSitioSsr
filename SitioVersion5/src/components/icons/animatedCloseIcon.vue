<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG element */
		width2: Number,
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color of the SVG element */
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
		version="1.1"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 22.4 22.4"
		style="enable-background: new 0 0 22.4 22.4"
		xml:space="preserve"
	>
		<!-- Path element defining the shape of the SVG graphic -->
		<path
			d="M17.91,22.4c-0.01,0-0.03,0-0.04,0c-0.03-0.04-0.06-0.08-0.09-0.12c-2.15-2.15-4.31-4.3-6.46-6.46
	c-0.04-0.04-0.08-0.07-0.13-0.11c-0.04,0.04-0.07,0.07-0.1,0.1c-2.16,2.16-4.32,4.31-6.48,6.47c-0.03,0.03-0.06,0.08-0.09,0.12
	c-0.01,0-0.03,0-0.04,0c-0.02-0.03-0.04-0.06-0.07-0.08c-1.43-1.43-2.86-2.86-4.29-4.28C0.07,18,0.03,17.98,0,17.95
	c0-0.01,0-0.03,0-0.04c0.04-0.03,0.08-0.06,0.12-0.09c2.16-2.15,4.31-4.3,6.46-6.45c0.04-0.04,0.07-0.08,0.11-0.13
	c-0.04-0.05-0.08-0.08-0.11-0.12c-2.15-2.15-4.31-4.3-6.46-6.45C0.08,4.62,0.04,4.6,0,4.56c0-0.01,0-0.03,0-0.04
	c0.06-0.05,0.12-0.1,0.18-0.16C1.55,3,2.91,1.63,4.28,0.26C4.34,0.2,4.38,0.12,4.47,0c2.28,2.28,4.51,4.51,6.77,6.76
	c2.22-2.21,4.44-4.43,6.64-6.62c1.48,1.48,2.96,2.96,4.47,4.46c-2.2,2.21-4.43,4.43-6.65,6.66c2.21,2.21,4.44,4.44,6.7,6.71
	c-0.08,0.06-0.16,0.1-0.22,0.16c-1.38,1.37-2.75,2.74-4.12,4.11C18,22.29,17.95,22.35,17.91,22.4z"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

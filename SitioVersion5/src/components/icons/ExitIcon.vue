<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 * This component accepts props for width, height, and fill colors.
 */
export default defineComponent({
	props: {
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color for the outer circle */
		fill: String,
		/** Fill color for the inner circle */
		fill2: String,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		id="Capa_2"
		data-name="Capa 2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24.94 24.94"
	>
		<!-- Outer circle with dynamic fill color -->
		<circle :fill="fill" class="exitIcon" cx="12.47" cy="12.47" r="12.47" />
		<!-- Inner circle with dynamic fill color -->
		<circle
			:fill="fill2"
			class="exitIcon"
			cx="12.47"
			cy="12.47"
			r="10.66"
		/>
		<!-- Path element for the icon's design with dynamic fill color -->
		<path
			:fill="fill"
			class="exitIcon"
			d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

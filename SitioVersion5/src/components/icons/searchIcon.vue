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
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="fill"
		viewBox="0 0 512 512"
	>
		<!-- Path element defining the shape of the SVG graphic -->
		<path
			d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

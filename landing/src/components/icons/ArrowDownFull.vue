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
			 d="M0.999969 0.000213623C0.802218 0.000256062 0.60892 0.0589275 0.44451 0.168812C0.280101 0.278696 0.151961 0.43486 0.0762911 0.617559C0.000620842 0.800259 -0.0191822 1.00129 0.0193853 1.19524C0.0579529 1.3892 0.153158 1.56736 0.292968 1.70721L5.29297 6.70721C5.4805 6.89468 5.7348 7 5.99997 7C6.26513 7 6.51944 6.89468 6.70697 6.70721L11.707 1.70721C11.8468 1.56736 11.942 1.3892 11.9806 1.19524C12.0191 1.00129 11.9993 0.800259 11.9236 0.617559C11.848 0.43486 11.7198 0.278696 11.5554 0.168812C11.391 0.0589275 11.1977 0.000256062 11 0.000213623L0.999969 0.000213623Z"/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color for the SVG paths */
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
		xmlns="http://www.w3.org/2000/svg"
		id="Capa_2"
		data-name="Capa 2"
		viewBox="0 0 30 30"
	>
		<!-- Grouping for the first layer of the SVG -->
		<g id="Capa_1-2" data-name="Capa 1">
			<g>
				<!-- Main path of the SVG graphic -->
				<path
					class="cls-2"
					d="m15,8.27c-3.68,0-6.67,2.99-6.67,6.67s2.99,6.67,6.67,6.67,6.67-2.99,6.67-6.67-2.99-6.67-6.67-6.67Zm2.99,7.48l-3.12,1.99c-.46.28-.95.4-1.35.17-.01,0-.02,0-.03-.02-.01,0-.01-.01-.01-.01-.43-.25-.4-.65-.4-.65v-4.55c0-.34.17-.47.29-.6.06-.06.12-.1.18-.14.14-.09.29-.14.45-.14.25,0,.53.11.87.34l3.12,2.04c.43.43.43,1.13,0,1.57Z"
				/>
				<!-- Additional path for detail in the SVG graphic -->
				<path
					class="cls-2"
					d="m13.41,11.92c-.06.04-.12.08-.18.14.1-.12.17-.13.18-.14Z"
				/>
				<!-- Path representing a specific feature in the SVG -->
				<path
					class="cls-2"
					d="m6.37,20.98c-.4,0-.79-.23-.96-.63-2.73-6.21-.04-10.62.07-10.8.31-.49.95-.64,1.45-.33.49.31.64.95.34,1.44-.02.03-.56.95-.83,2.48-.35,2.06-.05,4.21.9,6.37.23.53,0,1.15-.54,1.38-.14.06-.28.09-.42.09Z"
				/>
				<!-- Another path for additional detail -->
				<path
					class="cls-2"
					d="m3.02,23.36c-.38,0-.75-.21-.94-.58C-.23,18.18-.1,14.19.41,11.65c.56-2.78,1.69-4.47,1.74-4.55.32-.48.98-.61,1.46-.28.48.32.61.97.28,1.45-.02.04-.98,1.5-1.44,3.88-.62,3.19-.11,6.45,1.51,9.68.26.52.05,1.15-.47,1.41-.15.08-.31.11-.47.11Z"
				/>
				<!-- Path for another feature in the SVG -->
				<path
					class="cls-2"
					d="m23.63,20.98c.4,0,.79-.23.96-.63,2.73-6.21.04-10.62-.07-10.8-.31-.49-.95-.64-1.45-.33-.49.31-.64.95-.34,1.44.02.03.56.95.83,2.48.35,2.06.05,4.21-.9,6.37-.23.53,0,1.15.54,1.38.14.06.28.09.42.09Z"
				/>
				<!-- Final path for the SVG graphic -->
				<path
					class="cls-2"
					d="m26.98,23.36c.38,0,.75-.21.94-.58,2.31-4.6,2.18-8.59,1.67-11.13-.56-2.78-1.69-4.47-1.74-4.55-.32-.48-.98-.61-1.46-.28-.48.32-.61.97-.28,1.45.02.04.98,1.5,1.44,3.88.62,3.19.11,6.45-1.51,9.68-.26.52-.05,1.15.47,1.41.15.08.31.11.47.11Z"
				/>
			</g>
			<!-- Background rectangle for the SVG -->
			<rect class="cls-1" width="30" height="30" />
		</g>
	</svg>
</template>

<style scoped>
/* Style for the first class, no fill */
.cls-1 {
	fill: none;
}

/* Common stroke width for both classes */
.cls-1,
.cls-2 {
	stroke-width: 0px;
}

/* Fill color for the second class, bound to the fill prop */
.cls-2 {
	fill: v-bind(fill);
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue to create a component

export default defineComponent({
	props: {
		width: String, // Prop to define the width of the SVG, expected to be a string
		height: String, // Prop to define the height of the SVG, expected to be a string
		fill: String, // Prop to define the fill color of the SVG, expected to be a string
	},
});
</script>

<template>
	<!-- SVG icon -->
	<svg
		version="1.1"
		class="iconCheck"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:fill="fill"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 173.72 130.03"
		style="enable-background: new 0 0 173.72 130.03"
		xml:space="preserve"
	>
		<!-- Grouping SVG elements -->
		<g>
			<path
				d="M0,65.18c3.53-3.25,7.07-6.48,10.58-9.74c4.67-4.35,9.32-8.73,14.17-13.28c12.47,13.3,24.89,26.56,37.43,39.93
      C91.69,54.7,121.13,27.4,150.66,0c7.7,8.35,15.31,16.6,23.06,24.99C135.97,59.99,98.27,94.93,60.4,130.03
      c-0.6-0.68-1.14-1.32-1.71-1.94C39.41,107.51,20.12,86.93,0.84,66.35C0.57,66.06,0.28,65.79,0,65.52C0,65.4,0,65.29,0,65.18z"
			/>
		</g>
	</svg>
</template>

<style scoped>
.iconCheck {
	position: absolute; /* Positioning the icon absolutely within its container */
	left: 0; /* Aligning the icon to the left */
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG icon */
		width: String,
		/** Height of the SVG icon */
		height: String,
		/** Fill color of the SVG icon */
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container for the icon with dynamic attributes for width, height, and fill -->
	<svg
		class=""
		viewBox="0 0 25 25"
		:width="width"
		:height="height"
		:fill="fill"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Grouping of SVG elements with clipping path -->
		<g clip-path="url(#clip0_1_100)">
			<!-- Path element defining the shape of the icon -->
			<path
				d="M12.4532 25.0001C5.67821 25.0407 -0.134288 19.39 8.72174e-05 12.2329C0.128212 5.58517 5.61884 -0.143667 12.7907 0.000100638C19.5188 0.137618 25.1876 5.70707 24.9938 12.8642C24.8126 19.5682 19.4126 24.9845 12.4532 24.997V25.0001ZM6.88759 12.2579C6.08134 12.2548 5.44696 13.0267 5.59384 13.8175C5.66259 14.1956 5.90009 14.4519 6.15009 14.7113C7.03759 15.6302 7.91259 16.5584 8.79696 17.4835C9.41259 18.1274 10.0345 18.7649 10.6501 19.4088C10.747 19.5088 10.7938 19.4932 10.872 19.3869C11.1282 19.0306 11.3938 18.6806 11.6595 18.3305C12.6876 16.9678 13.7188 15.6114 14.7438 14.2488C15.7001 12.9767 16.6501 11.7047 17.6001 10.4295C18.1188 9.73569 18.6595 9.05748 19.1563 8.34489C19.4751 7.88546 19.5282 7.3979 19.2563 6.90721C19.0001 6.44153 18.5782 6.22588 18.0501 6.229C17.5907 6.23213 17.2563 6.47904 16.9907 6.83533C16.4751 7.53229 15.947 8.21988 15.4313 8.91684C14.4751 10.2076 13.4938 11.4828 12.5282 12.7642C11.9438 13.5393 11.3626 14.3175 10.7782 15.0957C10.5095 15.452 10.5095 15.4489 10.2157 15.1426C9.42196 14.3175 8.62509 13.4955 7.82821 12.6736C7.56884 12.4079 7.25946 12.2641 6.88446 12.2641L6.88759 12.2579Z"
				:fill="fill"
			/>
		</g>
		<!-- Definitions for reusable elements in the SVG -->
		<defs>
			<!-- Clipping path definition for the icon -->
			<clipPath id="clip0_1_100">
				<!-- Rectangle defining the clipping area -->
				<rect width="25" height="25" fill="white" />
			</clipPath>
		</defs>
	</svg>
</template>

<style scoped>
/* Styles specific to the iconCheckRounde class */

</style>

<!-- FILE DOCUMENTED -->

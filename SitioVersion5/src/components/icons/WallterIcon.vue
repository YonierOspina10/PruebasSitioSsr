<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * Accepts props for width, height, and fill color.
 */
export default defineComponent({
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
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 20 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Grouping of SVG elements with a clipping path -->
		<g clip-path="url(#clip0_357_1460)">
			<!-- Main path of the SVG graphic with dynamic fill color -->
			<path
				d="M12.0666 8.78401C12.0666 7.04226 13.5092 5.62504 15.2821 5.62504H16.0263C17.6832 5.62504 19.0263 4.28189 19.0263 2.62504V2.46144C19.0263 1.10193 17.9047 0 16.5208 0H2.61297C1.22909 0 0.107422 1.10193 0.107422 2.46144V15.1061C0.107422 16.4656 1.22909 17.5676 2.61297 17.5676H16.5208C17.9047 17.5676 19.0263 16.4656 19.0263 15.1061V14.943C19.0263 13.2861 17.6832 11.943 16.0263 11.943H15.2821C13.5092 11.943 12.0666 10.5258 12.0666 8.78401Z"
				:fill="fill"
			/>
			<!-- Secondary path of the SVG graphic with dynamic fill color -->
			<path
				d="M15.2819 6.02989C13.7204 6.02989 12.4502 7.2777 12.4502 8.81171C12.4502 10.3457 13.7204 11.5935 15.2819 11.5935H19.0261V6.03035H15.2819V6.02989ZM14.3214 9.65004C13.85 9.65004 13.468 9.27473 13.468 8.81171C13.468 8.34869 13.85 7.97338 14.3214 7.97338C14.7927 7.97338 15.1747 8.34869 15.1747 8.81171C15.1747 9.27473 14.7927 9.65004 14.3214 9.65004Z"
				:fill="fill"
			/>
		</g>
		<!-- Definitions for reusable elements in the SVG -->
		<defs>
			<!-- Clipping path definition -->
			<clipPath id="clip0_357_1460">
				<!-- Rectangle used for clipping with dynamic fill color -->
				<rect
					width="18.9189"
					height="17.5676"
					:fill="fill"
					transform="translate(0.107422)"
				/>
			</clipPath>
		</defs>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

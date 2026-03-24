<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG element.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		// Width of the SVG
		width: Number,
		// Height of the SVG
		height: Number,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 66 66"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Group element with a filter applied -->
		<g filter="url(#filter0_d_1562_1793)">
			<!-- Path element defining the shape of the SVG -->
			<path
				d="M62 0.999999C62 0.447715 61.5523 0 61 0H40.8517C39.9608 0 39.5146 1.07714 40.1446 1.70711L46.7929 8.35539C47.1834 8.74592 47.1834 9.37908 46.7929 9.76961L37.3321 19.2304C36.9416 19.6209 36.9416 20.2541 37.3321 20.6446L41.3554 24.6679C41.7459 25.0584 42.3791 25.0584 42.7696 24.6679L52.2304 15.2071C52.6209 14.8166 53.2541 14.8166 53.6446 15.2071L60.2929 21.8554C60.9229 22.4854 62 22.0392 62 21.1483V0.999999ZM61 58C61.5523 58 62 57.5523 62 57V36.8517C62 35.9608 60.9229 35.5146 60.2929 36.1446L53.6446 42.7929C53.2541 43.1834 52.6209 43.1834 52.2304 42.7929L42.7696 33.3321C42.3791 32.9416 41.7459 32.9416 41.3554 33.3321L37.3321 37.3554C36.9416 37.7459 36.9416 38.3791 37.3321 38.7696L46.7929 48.2304C47.1834 48.6209 47.1834 49.2541 46.7929 49.6446L40.1446 56.2929C39.5146 56.9229 39.9608 58 40.8517 58H61ZM4 57C4 57.5523 4.44772 58 5 58H25.1483C26.0392 58 26.4854 56.9229 25.8554 56.2929L19.2071 49.6446C18.8166 49.2541 18.8166 48.6209 19.2071 48.2304L28.6679 38.7696C29.0584 38.3791 29.0584 37.7459 28.6679 37.3554L24.6446 33.3321C24.2541 32.9416 23.6209 32.9416 23.2304 33.3321L13.7696 42.7929C13.3791 43.1834 12.7459 43.1834 12.3554 42.7929L5.70711 36.1446C5.07714 35.5146 4 35.9608 4 36.8517V57ZM5 0C4.44771 0 4 0.447715 4 1V21.1483C4 22.0392 5.07714 22.4854 5.70711 21.8554L12.3554 15.2071C12.7459 14.8166 13.3791 14.8166 13.7696 15.2071L23.2304 24.6679C23.6209 25.0584 24.2541 25.0584 24.6446 24.6679L28.6679 20.6446C29.0584 20.2541 29.0584 19.6209 28.6679 19.2304L19.2071 9.76961C18.8166 9.37908 18.8166 8.74592 19.2071 8.35539L25.8554 1.70711C26.4854 1.07714 26.0392 0 25.1483 0H5Z"
				fill="white"
			/>
		</g>
		<!-- Definitions for filters used in the SVG -->
		<defs>
			<!-- Filter definition for drop shadow effect -->
			<filter
				id="filter0_d_1562_1793"
				x="0"
				y="0"
				width="66"
				height="66"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_1562_1793"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_1562_1793"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

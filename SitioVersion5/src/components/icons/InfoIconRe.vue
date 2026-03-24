<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG element.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		// Width of the SVG element
		width: Number,
		// Height of the SVG element
		height: Number,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 22 23"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Group element with a filter applied -->
		<g filter="url(#filter0_bd_1087_5963)">
			<!-- Circle element representing a part of the SVG graphic -->
			<circle
				cx="11"
				cy="9"
				r="7.5"
				transform="rotate(-180 11 9)"
				stroke="currentColor"
				shape-rendering="crispEdges"
			/>
		</g>
		<!-- Path element defining a shape within the SVG -->
		<path
			d="M11.0069 6.1152C10.6229 6.1152 10.3072 6.00427 10.0597 5.7824C9.82077 5.552 9.7013 5.2704 9.7013 4.9376C9.7013 4.59627 9.82077 4.31467 10.0597 4.0928C10.3072 3.8624 10.6229 3.7472 11.0069 3.7472C11.3824 3.7472 11.6896 3.8624 11.9285 4.0928C12.176 4.31467 12.2997 4.59627 12.2997 4.9376C12.2997 5.2704 12.176 5.552 11.9285 5.7824C11.6896 6.00427 11.3824 6.1152 11.0069 6.1152ZM12.0949 6.8576V14H9.9061V6.8576H12.0949Z"
			fill="currentColor"
		/>
		<!-- Definitions for filters used in the SVG -->
		<defs>
			<!-- Filter definition for applying a blur effect -->
			<filter
				id="filter0_bd_1087_5963"
				x="0.44"
				y="-1.56"
				width="21.12"
				height="23.68"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feGaussianBlur in="BackgroundImageFix" stdDeviation="1.28" />
				<feComposite
					in2="SourceAlpha"
					operator="in"
					result="effect1_backgroundBlur_1087_5963"
				/>
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="2.56" />
				<feGaussianBlur stdDeviation="1.28" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="effect1_backgroundBlur_1087_5963"
					result="effect2_dropShadow_1087_5963"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect2_dropShadow_1087_5963"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

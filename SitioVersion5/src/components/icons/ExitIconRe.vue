<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a custom SVG element.
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
		viewBox="0 0 46 45"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Group element with a filter applied -->
		<g filter="url(#filter0_d_995_3950)">
			<!-- Circle element representing the main shape -->
			<circle
				cx="23"
				cy="19"
				r="18.24"
				fill="url(#paint0_linear_995_3950)"
				stroke="#BE2323"
				stroke-width="1.52"
			/>
			<!-- Path element for the first diagonal line -->
			<path
				d="M17.6123 12.4775L28.1936 25.3534"
				stroke="white"
				stroke-width="5.32"
				stroke-linecap="round"
			/>
			<!-- Path element for the second diagonal line -->
			<path
				d="M17.6123 25.5225L28.0332 12.5521"
				stroke="white"
				stroke-width="5.32"
				stroke-linecap="round"
			/>
		</g>
		<!-- Definitions for filters and gradients -->
		<defs>
			<!-- Drop shadow filter definition -->
			<filter
				id="filter0_d_995_3950"
				x="0.96"
				y="0"
				width="44.08"
				height="44.08"
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
				<feOffset dy="3.04" />
				<feGaussianBlur stdDeviation="1.52" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_995_3950"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_995_3950"
					result="shape"
				/>
			</filter>
			<!-- Linear gradient definition for the circle fill -->
			<linearGradient
				id="paint0_linear_995_3950"
				x1="23"
				y1="0"
				x2="23"
				y2="38"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#CF2032" />
				<stop offset="1" stop-color="#730510" />
			</linearGradient>
		</defs>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

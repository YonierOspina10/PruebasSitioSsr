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
		viewBox="0 0 32 31"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Group element with a filter applied -->
		<g filter="url(#filter0_d_995_4417)">
			<!-- Circle element representing a filled shape -->
			<circle cx="16" cy="12" r="12" fill="#404564" />
		</g>
		<!-- Path element for a white stroke line -->
		<path
			d="M10.8574 12H22.0003"
			stroke="white"
			stroke-width="2.57143"
			stroke-linecap="round"
		/>
		<defs>
			<!-- Definition of a filter for drop shadow effect -->
			<filter
				id="filter0_d_995_4417"
				x="0.571429"
				y="0"
				width="30.8571"
				height="30.8571"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<!-- Flood effect for background image fix -->
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<!-- Color matrix for alpha channel manipulation -->
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<!-- Offset effect for shadow positioning -->
				<feOffset dy="3.42857" />
				<!-- Gaussian blur for shadow softness -->
				<feGaussianBlur stdDeviation="1.71429" />
				<!-- Composite operation to create shadow effect -->
				<feComposite in2="hardAlpha" operator="out" />
				<!-- Color matrix for shadow color adjustment -->
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<!-- Blend modes to combine effects -->
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_995_4417"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_995_4417"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

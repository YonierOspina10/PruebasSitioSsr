<script setup lang="ts">
/**
 * Define component props with TypeScript types.
 * @typedef {Object} Props
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 * @property {string} fill - The fill color of the SVG element.
 */
defineProps<{ width: string; height: string; fill: string }>();
</script>

<template>
	<!-- SVG container with dynamic width, height, and fill color -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 25 25"
		:fill="fill"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Group element with a filter applied -->
		<g>
			<!-- Path element defining the shape of the SVG -->
			<path
				d="M16.4781 10.9897C17.507 9.58563 17.9679 7.84486 17.7684 6.11563C17.569 4.38641 16.724 2.79624 15.4025 1.66328C14.081 0.530315 12.3804 -0.061896 10.641 0.00512612C8.90163 0.0721483 7.25167 0.793461 6.02126 2.02475C4.79085 3.25605 4.07071 4.90652 4.00494 6.64597C3.93916 8.38541 4.53259 10.0856 5.6665 11.4063C6.80041 12.727 8.39117 13.5708 10.1205 13.769C11.8499 13.9672 13.5903 13.5051 14.9936 12.4752H14.9926C15.0238 12.5177 15.0585 12.5584 15.0967 12.5974L19.1878 16.6884C19.387 16.8878 19.6573 16.9999 19.9392 17C20.2211 17.0001 20.4914 16.8882 20.6908 16.689C20.8902 16.4897 21.0023 16.2194 21.0024 15.9376C21.0025 15.6557 20.8906 15.3853 20.6914 15.1859L16.6003 11.0949C16.5623 11.0564 16.5215 11.0219 16.4781 10.9897ZM16.7523 6.90499C16.7523 7.67249 16.6011 8.43246 16.3074 9.14153C16.0137 9.8506 15.5832 10.4949 15.0405 11.0376C14.4978 11.5803 13.8535 12.0108 13.1445 12.3045C12.4354 12.5982 11.6754 12.7493 10.9079 12.7493C10.1404 12.7493 9.38045 12.5982 8.67138 12.3045C7.96231 12.0108 7.31803 11.5803 6.77533 11.0376C6.23264 10.4949 5.80214 9.8506 5.50844 9.14153C5.21473 8.43246 5.06356 7.67249 5.06356 6.90499C5.06356 5.35498 5.67931 3.86844 6.77534 2.77241C7.87136 1.67638 9.3579 1.06064 10.9079 1.06064C12.4579 1.06064 13.9445 1.67638 15.0405 2.77241C16.1365 3.86844 16.7523 5.35498 16.7523 6.90499Z"
			/>
		</g>
		<!-- Definitions for filters used in the SVG -->
		<defs>
			<!-- Filter definition for drop shadow effect -->
			<filter
				id="filter0_d_1663_27894"
				x="0"
				y="0"
				width="25.0024"
				height="25"
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
					result="effect1_dropShadow_1663_27894"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_1663_27894"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

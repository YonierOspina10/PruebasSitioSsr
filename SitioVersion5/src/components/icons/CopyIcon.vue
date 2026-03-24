<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG graphic.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color of the SVG element */
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width, height, and fill properties -->
	<svg
		:width="width"
		:height="height"
		:fill="fill"
		viewBox="0 0 9 13"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- First path element defining a shape within the SVG -->
		<path
			d="M8.52239 1.73066V8.10603C8.52239 8.84354 7.91599 9.44994 7.17848 9.44994H6.88348V8.51576H7.17848C7.39154 8.51576 7.57182 8.33548 7.57182 8.12242V1.74705C7.57182 1.53399 7.39154 1.35371 7.17848 1.35371H3.70398C3.49093 1.35371 3.31065 1.53399 3.31065 1.74705V2.40261H2.37646V1.74705C2.37646 1.00954 2.98286 0.403137 3.72037 0.403137H7.19487C7.93238 0.403137 8.53878 1.00954 8.53878 1.74705L8.52239 1.73066Z"
			fill="currentColor"
		/>
		<!-- Second path element defining another shape within the SVG -->
		<path
			d="M4.91679 3.02539H1.4423C0.704787 3.02539 0.0983887 3.63179 0.0983887 4.3693V10.7447C0.0983887 11.4822 0.704787 12.0886 1.4423 12.0886H4.91679C5.6543 12.0886 6.2607 11.4822 6.2607 10.7447V4.3693C6.2607 3.63179 5.6543 3.02539 4.91679 3.02539ZM5.31013 10.7447C5.31013 10.9577 5.12985 11.138 4.91679 11.138H1.4423C1.22924 11.138 1.04896 10.9577 1.04896 10.7447V4.3693C1.04896 4.15624 1.22924 3.97596 1.4423 3.97596H4.91679C5.12985 3.97596 5.31013 4.15624 5.31013 4.3693V10.7447Z"
			fill="currentColor"
		/>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG icon.
 * @component
 */
export default defineComponent({
	// Component props definition
	props: {
		/** Width of the SVG element */
		width: Number,
		/** Height of the SVG element */
		height: Number,
		/** Fill color for the SVG path */
		fill: String,
	},
});
</script>

<template>
	<!-- SVG container with dynamic width and height based on props -->
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Background carrier for SVG -->
		<g id="SVGRepo_bgCarrier" stroke-width="0" />
		<!-- Tracer carrier for SVG stroke properties -->
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<!-- Main icon carrier containing the SVG path -->
		<g id="SVGRepo_iconCarrier">
			<!-- Path element defining the shape of the icon -->
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
				fill="#c09702"
			/>
		</g>
	</svg>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Logo component that renders an image based on provided props.
 */
export default defineComponent({
	// Component name
	name: 'Logo',
	data() {
		// Retrieve configuration and app component from the context
		let config = this.$config();
		let appComponent: any = this.$appComponent; // Type any for appComponent
		let flagInfoUser = false; // Flag to track user info state
		return {
			config,
			appComponent,
			flagInfoUser,
		};
	},
	// Define props that can be passed to the component
	props: ['url', 'height', 'width', 'c_logo'],
});
</script>

<template>
	<!-- Image element for displaying the logo -->
	<img
		:height="height"
		:width="width"
		alt="favicon"
		:class="c_logo"
		:src="url"
	/>
</template>

<!-- FILE DOCUMENTED -->

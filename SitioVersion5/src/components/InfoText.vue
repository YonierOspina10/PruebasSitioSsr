<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * This component accepts a 'text' prop and initializes data on mount.
 */
export default defineComponent({
	// Define component props
	props: {
		// 'text' prop of type String with a default value of an empty string
		text: { type: String, default: '' },
	},
	data() {
		// Retrieve configuration and application component on data initialization
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		return {
			config,
			appComponent,
		};
	},
	mounted() {
		// Log the 'text' prop value to the console when the component is mounted
		console.log(this.text);
	},
});
</script>

<template>
	<!-- Main container for the component, centered with flexbox -->
	<div class="w-full h-24 flex justify-center items-center my-3 md:my-0">
		<!-- Section to display the translated 'text' prop, using v-html for HTML rendering -->
		<section class="text-center w-4/5" v-html="$t(text)"></section>
	</div>
</template>

<!-- FILE DOCUMENTED -->

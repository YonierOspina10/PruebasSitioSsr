<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import BingoComponent from '@/views/Products/BingoComponent.vue'; // Importing BingoComponent
import BingoComponentV2 from '@/views/Products/BingoComponentV2.vue'; // Importing BingoComponentV2
import Bingos from '@/views/Promotions/Bingos.vue'; // Importing Bingos component

export default defineComponent({
	components: {
		BingoComponent, // Registering BingoComponent
		BingoComponentV2, // Registering BingoComponentV2
		Bingos, // Registering Bingos component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration using $config method
		let appComponent: any = this.$appComponent; // Accessing appComponent from context
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	mounted() {}, // Lifecycle hook for when the component is mounted
});
</script>

<template>
	<!-- Conditional rendering of BingoComponent based on appComponent configuration -->
	<bingo-component
		v-if="
			appComponent.config.bingos != undefined &&
			appComponent.config.bingos[appComponent.country] != undefined &&
			appComponent.config.bingos[appComponent.country].version !=
				undefined &&
			appComponent.config.bingos[appComponent.country].version == 2
		"
	></bingo-component>

	<!-- Conditional rendering of BingoComponentV2 if the first condition is not met -->
	<bingo-component-v2
		v-else-if="
			appComponent.config.bingos != undefined &&
			appComponent.config.bingos[appComponent.country] != undefined &&
			appComponent.config.bingos[appComponent.country].version !=
				undefined &&
			appComponent.config.bingos[appComponent.country].version == 3
		"
	></bingo-component-v2>

	<!-- Fallback to Bingos component if none of the above conditions are met -->
	<bingos v-else></bingos>
</template>

<style scoped>
/* Scoped styles for this component can be added here */
</style>

<!-- FILE DOCUMENTED -->

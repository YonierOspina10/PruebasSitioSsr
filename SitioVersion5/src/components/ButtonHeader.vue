<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * This component retrieves configuration and app component data for rendering.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * Initializes the component's data properties.
	 * @returns {Object} The data object containing config and appComponent.
	 */
	data() {
		let config = this.$config(); // Retrieves the configuration object.
		let appComponent: any = this.$appComponent; // Retrieves the app component data.
		return {
			config,
			appComponent,
		};
	},
});
</script>

<template>
	<!-- Main RouterLink for navigation, conditionally rendered based on config and appComponent -->
	<RouterLink
		v-if="
			config.header != undefined &&
			config.header.button != undefined &&
			config.header.button[appComponent.country] != undefined &&
			config.header.button[appComponent.country].BUTTON_CLASS !=
				undefined &&
			config.header.button[appComponent.country].BUTTON_LINK !=
				undefined &&
			config.header.button[appComponent.country].showButton !=
				undefined &&
			config.header.button[appComponent.country].showButton
		"
		:to="config.header.button[appComponent.country].BUTTON_LINK"
		:class="
			'button-header btn btn-sm mr-2 ' +
			config.header.button[appComponent.country].BUTTON_CLASS
		"
		@click="appComponent.gAnalytics('club_de_oro')"
	>
		<!-- Conditional rendering for button image -->
		<div
			v-if="
				config.header.button[appComponent.country].BUTTON_IMG !=
					undefined &&
				config.header.button[appComponent.country].BUTTON_IMG != null &&
				config.header.button[appComponent.country].BUTTON_IMG != ''
			"
			class="img-button-header h-full flex items-center justify-center"
		>
			<img
				:src="config.header.button[appComponent.country].BUTTON_IMG"
				alt=""
				class="object-contain w-full h-full"
				style="max-width: 83px; max-height: 21px"
			/>
		</div>
		<!-- Conditional rendering for button text -->
		<div
			v-if="
				config.header.button[appComponent.country].BUTTON_TEXT !=
					undefined &&
				config.header.button[appComponent.country].BUTTON_TEXT !=
					null &&
				config.header.button[appComponent.country].BUTTON_TEXT != ''
			"
			class="text-button-header"
		>
			<span
				v-html="config.header.button[appComponent.country].BUTTON_TEXT"
				class="px-2"
			></span>
		</div>
	</RouterLink>
</template>

<!-- FILE DOCUMENTED -->

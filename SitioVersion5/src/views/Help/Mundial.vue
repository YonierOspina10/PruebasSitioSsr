<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Defines a Vue component that retrieves configuration data.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's data object containing configuration.
	 */
	data: function () {
		let config = this.$config(); // Retrieves configuration data from the global context.
		return {
			config, // Exposes the config object to the template.
		};
	},
});
</script>

<template>
	<!-- Main container for the Framework InfoPage -->
	<div class="Framework InfoPage">
		<!-- Container for the active page title -->
		<div class="Container ActivePageTitle">
			<span class="h1">
				<!-- Translated title for the page -->
				<span>{{ $t('Mundial') }}</span>
			</span>
		</div>
		<!-- Box containing the information content -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Iframe to display external content, linked from the config -->
				<iframe
					style="width: 100%; height: 1000px"
					:src="config.linkIframe"
				></iframe>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

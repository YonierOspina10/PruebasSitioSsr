<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the main application layout.
 */
export default defineComponent({
	/**
	 * Data function that initializes component state.
	 * @returns {Object} The component's data properties.
	 */
	data: function () {
		// Retrieve configuration settings from the global config.
		let config: any = this.$config();
		// Reference to the application component.
		let appComponent: any = this.$appComponent;
		return {
			appComponent,
			config,
		};
	},
});
</script>

<template>
	<!-- Main container for the header, displayed conditionally based on layout configuration -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<!-- Framework container for the InfoPage -->
	<div class="Framework InfoPage">
		<!-- Box container for the text box without a header -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<!-- Content area for the information box -->
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container with conditional class binding -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1">
						<!-- Title with conditional text color based on layout -->
						<span
							class="font-bold text-3xl flex items-center justify-center text-neutral"

							>{{ $t('Resultados') }}</span
						>
					</span>
				</div>
				<!-- Nested box for additional information -->
				<div class="Box TextBox NoHeadBox InfoBox">
					<!-- Content area with conditional layout classes -->
					<div
						class="BoxContent InfoBoxContent"
						:class="
							(config.layout != undefined &&
								config.layout == 3) ||
							(config.layout != undefined && config.layout == 6)
								? 'flex justify-center items-center'
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Iframe for displaying external content with dynamic source -->
						<iframe
							:class="
								(config.layout != undefined &&
									config.layout == 3) ||
								(config.layout != undefined &&
									config.layout == 6)
									? 'w-full max-w-[95%] h-[700px]'
									: 'w-full h-[1000px]'
							"
							:src="
								'https://ls.sir.sportradar.com/betinaction/' +
								appComponent.lngProd
							"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

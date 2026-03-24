<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for the main application layout.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The data object containing appComponent and config.
	 */
	data: function () {
		let config = this.$config(); // Retrieves the configuration object.
		let appComponent: any = this.$appComponent; // Retrieves the application component.
		return {
			appComponent,
			config,
		};
	},
});
</script>

<template>
	<!-- Conditional rendering based on the layout configuration -->
	<div
		v-if="config.layout != 3"
		class="int-header bg-base-200 absolute w-full"
		:class="TERMINOSYCONDICIONES.length > 0 ? 'h-[65px]' : 'h-full'"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div class="Framework InfoPage">
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary'
							: ''
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Resultados') }}</span
						>
					</span>
				</div>
				<div class="Box TextBox NoHeadBox InfoBox">
					<div
						class="BoxContent InfoBoxContent"
						:class="
							config.layout != undefined && config.layout == 3
								? 'flex justify-center items-center'
								: 'w-full float-left md:px-8'
						"
					>
						<iframe
							:class="
								config.layout != undefined && config.layout == 3
									? 'w-full max-w-[80%] h-[700px]'
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

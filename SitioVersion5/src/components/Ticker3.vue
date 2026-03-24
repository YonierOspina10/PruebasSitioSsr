<template>
	<!-- Main section that conditionally renders based on header configuration -->
	<section
		v-if="
			config.header_ != undefined && config.header_.top_band != undefined
				? config.header_.top_band
				: config.header.showTicker
		"
		class="realtive h-9 w-full items-center text-neutral bg-base-300 flex justify-between z-30 ml-0 lg:ml-[69px]"
		:class="config.header_.styleVersion == 2 ? 'mt-2' : ''"
	>
		<!-- Container for the ticker display -->
		<div class="w-full h-full overflow-hidden relative flex items-center">
			<!-- Ticker that displays boxes if user is logged in -->
			<div
				v-if="
					appComponent.boxes.length > 0 &&
					appComponent.session.logueado
				"
				class="w-full block uppercase whitespace-nowrap absolute"
				:class="{ ticker3: appComponent.moving }"
			>
				<!-- Iterates over boxes to display their titles -->
				<div
					class="inline-block w-auto md:w-full h-full text-center text-sm md:text-lg px-2"
					v-for="box in appComponent.boxes"
				>
					<span
						class="mr-[500px] md:mr-0 cursor-pointer"
						@click="
							appComponent.gAnalytics('pronter');
							clickBox(box);
						"
						v-html="box.title"
					></span>
				</div>
			</div>
		</div>
		<!-- Social networks section, visible on larger screens -->
		<div class="hidden lg:flex bottom-1 gap-2 pr-24">
			<!-- Conditional rendering of social networks based on configuration -->
			<div
				v-if="
					(config.header_ != undefined &&
					config.header_.social_networks != undefined
						? config.header_.social_networks
						: config.header.showRedes) &&
					config.SOCIAL_NEWTWORKS_HEADER != undefined &&
					config.SOCIAL_NEWTWORKS_HEADER[appComponent.country] !=
						undefined
				"
				class="items-center flex-none flex text-[0.4rem] mr-3"
			>
				<!-- Iterates over social links to display icons -->
				<li
					v-for="value in config['not_login'] != undefined &&
					config['not_login'][appComponent.lngProd] != undefined &&
					config['not_login'][appComponent.lngProd]['social_links'] !=
						undefined
						? config['not_login'][appComponent.lngProd][
								'social_links'
							]
						: config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]"
					class="icons-social-header list-none"
				>
					<a
						@click="
							appComponent.gAnalytics(
								'button_social_network',
								value
							)
						"
						:href="value.SOCIAL_URL"
						target="_blank"
						:class="value.SOCIAL_ICON"
					>
						<font-awesome-icon
							:icon="
								config['not_login'] != undefined &&
								config['not_login'][appComponent.lngProd] !=
									undefined &&
								config['not_login'][appComponent.lngProd][
									'social_links'
								] != undefined
							"
						/>
					</a>
				</li>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	// Data function returning component state
	data() {
		let openSelectLang = false; // State for language dropdown visibility
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Application component reference
		let margin: number = 0; // Margin variable
		let interval: any = undefined; // Interval variable for potential use
		return {
			config,
			appComponent,
			openSelectLang,
			margin,
			interval,
		};
	},
	methods: {
		// Method to handle box click event
		clickBox(box: any) {
			window.open(box.url, '_top'); // Opens the box URL in the top window
		},
	},
	mounted() {}, // Lifecycle hook for component mounted
});
</script>
<style scoped>
.container-carousel {
	cursor: pointer; /* Pointer cursor for carousel container */
}
.container-carousel.active {
	cursor: grab !important; /* Grab cursor when active */
}
.youtube:hover {
	color: red; /* Change color on hover for YouTube icon */
}
.instagram:hover {
	color: #007bb7; /* Change color on hover for Instagram icon */
}
.twitter:hover {
	color: #3cf; /* Change color on hover for Twitter icon */
}
.facebook:hover {
	color: #3b5998; /* Change color on hover for Facebook icon */
}
</style>

<!-- FILE DOCUMENTED -->

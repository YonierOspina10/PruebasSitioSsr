<template>
	<!-- Main section for displaying jackpots, shown only if jackpotsList is defined and has items -->
	<section
		v-if="jackpotsList !== undefined && jackpotsList.length > 0"
		class="justify-center items-center px-0 lg:px-14 py-4"
		:style="{
			display: hidden ? 'none' : 'flex',
		}"
	>
		<!-- Placeholder shown while loading -->
		<AnimatedPlaceholder
			v-if="loading"
			class="w-11/12 h-[400px] max-w-[1300px] z-[40] rounded-2xl"
		/>
		<!-- Link to the jackpot main page, shown when not loading -->
		<RouterLink
			:to="
				appComponent.config.casino.playtechJackpotMain['redirect'] ??
				'new-casino'
			"
			v-else
			class="relative w-11/12 lg:w-full h-[400px] max-w-[1300px] rounded-2xl overflow-hidden hover:scale-[1.02]"
		>
			<!-- Background image for the jackpot section -->
			<img
				:src="
					appComponent.config.casino.playtechJackpotMain[
						'imgBackground'
					]
				"
				alt="background-jackpot"
				class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover z-10"
			/>
			<div
				class="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-20 flex flex-col justify-between items-center p-4"
			>
				<div class="in w-full h-[265px]">
					<!-- Desktop image for the jackpot, shown only on larger screens -->
					<img
						v-if="
							appComponent.config.casino.playtechJackpotMain[
								'imgDesktop'
							]
						"
						:src="
							appComponent.config.casino.playtechJackpotMain[
								'imgDesktop'
							]
						"
						alt="image-jackpot-desktop"
						class="hidden md:block w-full h-full object-contain"
					/>
					<!-- Mobile image for the jackpot, shown only on smaller screens -->
					<img
						v-if="
							appComponent.config.casino.playtechJackpotMain[
								'imgMobile'
							]
						"
						:src="
							appComponent.config.casino.playtechJackpotMain[
								'imgMobile'
							]
						"
						alt="image-jackpot-mobile"
						class="md:hidden w-full h-full object-contain"
					/>
				</div>
				<div
					class="hidden md:flex w-full h-max justify-center items-center gap-4"
				>
					<!-- Loop through jackpotsList to display each jackpot -->
					<div
						v-for="(jackpot, index) in jackpotsList"
						:key="index"
						class="in w-full h-[90px] p-1 bg-white bg-opacity-20 rounded-lg flex flex-col justify-center items-center"
					>
						<!-- Jackpot name, translated -->
						<h4
							v-if="
								jackpot.name != undefined && jackpot.name != ''
							"
							class="text-xl font-bold text-primary-focus"
						>
							{{ $t(jackpot.name) }}
						</h4>
						<!-- Jackpot value, always shown -->
						<span
							:id="'jackpot-playtech-' + index"
							class="w-full text-3xl text-primary-focus text-center font-extrabold"
						>
							{{ $t('UPDATING') }}
						</span>
						<!-- Jackpot description, if available -->
						<p
							v-if="
								jackpot.description != undefined &&
								jackpot.description != ''
							"
							class="text-base text-neutral/75 text-center"
							v-t
							v-html="jackpot.description"
						></p>
					</div>
				</div>
				<!-- Mobile swiper container for jackpots, shown only on smaller screens -->
				<div class="relative w-full block md:hidden">
					<swiper-container
						id="SliderJackpotsPlaytech"
						:slides-per-view="1"
						:loop="true"
						:autoplay-delay="2500"
						:autoplay-disable-on-interaction="true"
						:space-between="8"
						:centered-slides="true"
						class="w-full h-max gap-4"
					>
						<!-- Loop through jackpotsList for mobile display -->
						<swiper-slide
							v-for="(jackpot, index) in jackpotsList"
							:key="index"
							class="in w-full h-[90px] p-1 cursor-default flex flex-col justify-center items-center"
						>
							<div
								class="w-full bg-white bg-opacity-20 rounded-lg h-full flex flex-col justify-center items-center"
							>
								<!-- Jackpot name for mobile -->
								<h4
									v-if="
										jackpot.name != undefined &&
										jackpot.name != ''
									"
									class="text-xl font-bold text-primary-focus"
								>
									{{ $t(jackpot.name) }}
								</h4>
								<!-- Jackpot value for mobile -->
								<span
									:id="'jackpot2-playtech-' + index"
									class="w-full text-3xl text-primary-focus text-center font-extrabold"
								>
									{{ $t('UPDATING') }}
								</span>
								<!-- Jackpot description for mobile -->
								<p
									v-if="
										jackpot.description != undefined &&
										jackpot.description != ''
									"
									class="text-base text-neutral/75 text-center"
									v-t
									v-html="jackpot.description"
								></p>
							</div>
						</swiper-slide>
					</swiper-container>
				</div>
			</div>
		</RouterLink>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'; // Import necessary Vue functions
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Import AnimatedPlaceholder component
import { register } from 'swiper/element/bundle'; // Import Swiper registration
import { useRoute } from 'vue-router'; // Import Vue Router's useRoute function
register(); // Register Swiper components

declare var Ticker: any; // Declare Ticker variable for external use

export default defineComponent({
	components: { AnimatedPlaceholder }, // Register components used in this component
	data() {
		// Define component data
		let config = this.$config(); // Get configuration
		let appComponent: any = this.$appComponent; // Reference to app component
		let jackpotsList: any = []; // Array to hold jackpots
		let colors = undefined; // Variable for theme colors
		let loading: boolean = true; // Loading state
		let hidden: boolean = false; // Visibility state
		return {
			config,
			appComponent,
			jackpotsList,
			colors,
			loading,
			hidden,
		};
	},
	setup() {
		const route = useRoute(); // Get current route
		return { route }; // Return route for use in template
	},
	created() {
		// Lifecycle hook for component creation
		if (
			this.appComponent.config.casino !== undefined &&
			this.appComponent.config.casino.playtechJackpotMain !== undefined &&
			this.appComponent.config.casino.playtechJackpotMain[
				this.appComponent.country
			] &&
			this.appComponent.config.casino.playtechJackpotMain[
				this.appComponent.country
			].length > 0
		) {
			// Populate jackpotsList based on configuration
			this.jackpotsList =
				this.appComponent.config.casino.playtechJackpotMain[
					this.appComponent.country
				];
		}
		let deviceTheme = ''; // Variable to determine device theme
		if (
			this.appComponent.config.theme_colors_desktop != undefined &&
			this.appComponent.config.mobileL == ''
		) {
			deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
		} else if (
			this.appComponent.config.theme_colors_mobile != undefined &&
			this.appComponent.config.mobileL != ''
		) {
			deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
		}
		this.colors = this.appComponent.config[deviceTheme]; // Assign colors based on device theme
	},
	mounted() {
		// Lifecycle hook for component mounting
		let existingScript = document.querySelector(
			`script[src="${this.appComponent.config.casino.playtechJackpotMain['srcJs'] ?? 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'}"]`
		); // Check if the jackpot script is already included
		if (!existingScript) {
			// If not included, create and append the script
			const scriptJackpot = document.createElement('script');
			scriptJackpot.src =
				this.appComponent.config.casino.playtechJackpotMain['srcJs'] ??
				'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
			scriptJackpot.async = true; // Load script asynchronously
			scriptJackpot.lang = 'javascript'; // Set script language
			scriptJackpot.type = 'text/javascript'; // Set script type
			scriptJackpot.onload = () => {
				this.loadJackpot(); // Load jackpot data after script is loaded
			};
			document.head.appendChild(scriptJackpot); // Append script to document head
		} else {
			this.loadJackpot(); // Load jackpot data if script already exists
		}
		this.hidden =
			this.route.params.ProviderId !== undefined &&
			this.route.params.ProviderId !== 'PLAYTECH'; // Determine visibility based on route parameters
		watch(
			() => this.route.params.ProviderId, // Watch for changes in ProviderId
			(newProviderId) => {
				this.hidden =
					newProviderId !== undefined && newProviderId !== 'PLAYTECH'; // Update visibility based on new ProviderId
			}
		);
	},
	methods: {
		loadJackpot() {
			// Method to load jackpot data
			setTimeout(() => {
				this.loading = false; // Set loading to false after timeout
				setTimeout(() => {
					// Loop through jackpotsList to initialize ticker for each jackpot
					this.jackpotsList.forEach((jackpot: any, index: number) => {
						let tickerDesktop = new Ticker({ ...jackpot.data }); // Create ticker for desktop
						tickerDesktop.attachToTextBox(
							'jackpot-playtech-' + index // Attach ticker to corresponding text box
						);
						tickerDesktop.tick(); // Start ticker animation
						let tickerMobile = new Ticker({ ...jackpot.data }); // Create ticker for mobile
						tickerMobile.attachToTextBox(
							'jackpot2-playtech-' + index // Attach ticker to corresponding text box
						);
						tickerMobile.tick(); // Start ticker animation
					});
				}, 1000); // Delay for 1 second before initializing tickers
			}, 1000); // Initial delay for loading
		},
	},
});
</script>
<style scoped>
/* Centered text for jackpot value */
.text-jackpot-value {
	text-align: center;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
}
/* Centered title style for jackpots */
.title-jackpot {
	text-align: center;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
}
/* Centered description style for jackpots */
.description-jackpot {
	text-align: center;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}
</style>

<!-- FILE DOCUMENTED -->

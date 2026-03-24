<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MagnifyingGlass from '../icons/MagnifyingGlass.vue'; // Importing a magnifying glass icon component
import anime from 'animejs'; // Importing anime.js for animations
declare var Ticker: any; // Declaring a global variable Ticker for jackpot functionality

export default defineComponent({
	props: {
		typelobby: String, // Prop to receive the type of lobby as a string
	},
	components: {
		MagnifyingGlass, // Registering the MagnifyingGlass component
	},
	data: function () {
		let appComponent: any = this.$appComponent; // Reference to the app component
		let config = this.$config(); // Configuration object
		let categories: any = ''; // Variable to hold categories
		let flag: boolean = true; // Flag for state management
		let optionsGames: any = ''; // Options for games request
		let partnerG: any = ''; // Partner ID
		let gamesList: any = []; // List of games
		let limitConfig: any = ''; // Limit configuration for games
		let urlVirtualplay: any = ''; // URL for virtual play
		let categoriesLength: any = ''; // Length of categories
		let country: any = ''; // Country information
		return {
			appComponent,
			config,
			categories,
			flag,
			optionsGames,
			partnerG,
			limitConfig,
			urlVirtualplay,
			categoriesLength,
			country,
		};
	},
	mounted() {
		this.config = this.config; // Assigning config to the component's config
		this.limitConfig = this.config.casino.limit; // Setting limit configuration from the casino config
		this.urlVirtualplay = this.config.urlVirtualplay; // Setting the URL for virtual play
		this.partnerG = this.appComponent.partnerG; // Setting partner ID from app component
		this.country = this.appComponent.country; // Setting country from app component
		var options = {
			action: 'getOptions', // Action type for API request
			partner_id: this.partnerG, // Partner ID for API request
			country: this.appComponent.country, // Country for API request
			typelobby: this.typelobby, // Type of lobby for API request
		};
    if (this.appComponent.session.logueado) {
      options["testUser"] = this.appComponent.session.user_test == 1 ? true : false
    }
		apiService
			.requestGet(this.urlVirtualplay + '/cms/products/games/', options) // Making GET request to fetch games
			.then((response: any) => {
				var json = response.data; // Storing response data
				this.categories = json.categories; // Assigning categories from response
				this.categoriesLength = json.categories.length; // Storing length of categories
			});
		console.log(this.categories); // Logging categories to console
	},
	methods: {
		noMoreGames() {
			var vthis = this; // Reference to the component instance
			if (vthis.appComponent.gamesList.length <= 0) {
				// Check if games list is empty
				Array.prototype.forEach.call(
					document.getElementsByClassName('preload-game-top'), // Hiding top preload games
					function (el, i) {
						(
							document.getElementsByClassName('preload-game-top')[
								i
							] as HTMLElement
						).style.display = 'none';
					}
				);
				Array.prototype.forEach.call(
					document.getElementsByClassName('preload-game-bottom'), // Hiding bottom preload games
					function (el, i) {
						(
							document.getElementsByClassName(
								'preload-game-bottom'
							)[i] as HTMLElement
						).style.display = 'none';
					}
				);
				Array.prototype.forEach.call(
					document.getElementsByClassName('new-casino-no-games-text'), // Showing no games text
					function (el, i) {
						(
							document.getElementsByClassName(
								'new-casino-no-games-text'
							)[i] as HTMLElement
						).style.display = 'block';
					}
				);
			} else {
				Array.prototype.forEach.call(
					document.getElementsByClassName('new-casino-no-games-text'), // Hiding no games text
					function (el, i) {
						(
							document.getElementsByClassName(
								'new-casino-no-games-text'
							)[i] as HTMLElement
						).style.display = 'none';
					}
				);
			}
		},
		selectCategory(category) {
			console.log(category); // Logging selected category
			var vthis = this; // Reference to the component instance
			this.flag = true; // Setting flag to true
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-top'), // Hiding top preload games
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-top')[
							i
						] as HTMLElement
					).style.display = 'none';
				}
			);
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-bottom'), // Showing bottom preload games
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-bottom')[
							i
						] as HTMLElement
					).style.display = 'block';
				}
			);
			vthis.appComponent.gamesList = []; // Resetting games list
			vthis.appComponent.selections.category = {}; // Resetting selected category
			vthis.appComponent.selections.category.id = category.id; // Setting selected category ID
			vthis.appComponent.selections.provider = ''; // Resetting provider selection
			this.optionsGames = {
				action: 'getGames2', // Action type for fetching games
				partner_id: this.partnerG, // Partner ID for API request
				typelobby: this.typelobby, // Type of lobby for API request
				offset: 0, // Offset for pagination
				limit: vthis.limitConfig, // Limit for number of games
				country: this.appComponent.country, // Country for API request
			};
			if (this.appComponent.mobile == '1') {
				// Checking if mobile
				this.optionsGames.isMobile = true; // Setting mobile flag
			} else {
				this.optionsGames.isMobile = false; // Setting mobile flag
			}
			if (category.id != '' && category.id != 'all') {
				// Checking if category is valid
				this.optionsGames.category = category.id; // Setting category ID
			}
			if (
				this.appComponent.selections.provider !== '' &&
				this.appComponent.selections.provider !== undefined &&
				this.appComponent.selections.provider !== null
			) {
				this.optionsGames.provider =
					this.appComponent.selections.provider; // Setting provider if selected
			}
			window.history.pushState(
				'',
				'',
				'/new-casino/categoria/' + category.slug + '-' + category.id // Updating browser history
			);
			apiService
				.requestGet(
					this.urlVirtualplay + '/cms/products/games/',
					this.optionsGames // Making GET request to fetch games based on selected category
				)
				.then((response: any) => {
					var json = response.data; // Storing response data
					vthis.appComponent.gamesList = json.games; // Assigning games to app component
					vthis.appComponent.total_count = json.total_count; // Storing total count of games
					vthis.appComponent.offset =
						vthis.appComponent.gamesList.length; // Updating offset
					vthis.appComponent.limit =
						vthis.appComponent.gamesList.length + vthis.limitConfig; // Updating limit
					vthis.noMoreGames(); // Checking for no more games
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'), // Hiding top preload games
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
					if (
						vthis.config.casino != undefined &&
						vthis.config.casino.playtechJackpot != undefined &&
						vthis.config.casino.playtechJackpot[
							vthis.appComponent.country
						] != undefined
					) {
						var existingScript = document.querySelector(
							'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]' // Checking for existing jackpot script
						);
						if (existingScript) {
							existingScript.remove(); // Removing existing script if found
						}
						var script = document.createElement('script'); // Creating new script element
						script.src =
							'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Setting source for jackpot script
						const vthis = this; // Reference to the component instance
						script.onload = function () {
							// On script load
							vthis.appComponent.gamesList.forEach((game) => {
								// Iterating through games
								if (
									game.provider == 'PLAYTECH' &&
									game.jackpot != undefined &&
									game.jackpot == 1
								) {
									var objParams =
										vthis.config.casino.playtechJackpot[
											vthis.appComponent.country
										]; // Getting jackpot parameters
									objParams.game = game.front_game_id; // Setting game ID for jackpot
									var ticker = new Ticker(objParams); // Creating new Ticker instance
									ticker.attachToTextBox(
										'playtech-' + game.id // Attaching ticker to game ID
									);
									ticker.SetCurrencyPos('1'); // Setting currency position
									ticker.tick(); // Starting ticker
								}
							});
						};
						document.head.appendChild(script); // Appending script to document head
					}
				});
			if (vthis.appComponent.total_count < vthis.limitConfig) {
				// Checking if total count is less than limit
				vthis.appComponent.showMore = false; // Hiding "show more" button
			} else {
				vthis.appComponent.showMore = true; // Showing "show more" button
			}
		},
		selectCategoryFav() {
			this.appComponent.gamesList = []; // Resetting games list
			this.appComponent.gamesList = this.appComponent.myCasinoGames; // Assigning favorite games
			this.appComponent.total_count = this.appComponent.gamesList.length; // Updating total count
			this.appComponent.selections.category.id = 1811; // Setting category ID for favorites
		},
	},
});
</script>
<template>
	<section
		class="bg-base-content w-full h-full flex justify-center items-center px-5 lg:px-14 py-0"
	>
		<!-- Main section for displaying categories and favorites -->
		<nav
			class="in max-w-[1300px] bg-secondary lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-start items-center rounded-xl gap-2 z-30"
		>
			<!-- Navigation for categories and favorites -->
			<button
				v-if="
					appComponent != undefined && appComponent.favCasino != false
				"
				@click="selectCategoryFav()"
				class="categorys ml-2 lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
				:class="
					appComponent.selections !== undefined &&
					appComponent.selections.category !== undefined &&
					appComponent.selections.category.id == 1811
						? 'bg-primary-content blob font-bold categorysSelected'
						: 'lg:bg-secondary'
				"
			>
				<!-- Button for selecting favorite category -->
				<div
					class="lg:h-14 w-10 lg:w-14 mx-auto flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="55px"
						height="55px"
						viewBox="0 0 115 115"
						version="1.1"
					>
						<g
							id="favoritos"
							stroke="none"
							stroke-width="1"
							fill="none"
							class="stroke-primary-content"
						>
							<path
								d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
								id="Shape"
								stroke-width="4"
							></path>
						</g>
					</svg>
				</div>
				<span
					class="text-xs lg:text-sm font-bold uppercase"
					:class="
						appComponent.selections !== undefined &&
						appComponent.selections.category !== undefined &&
						appComponent.selections.category.id == 1811
							? 'text-neutral-focus'
							: 'text-base-100'
					"
					>{{ $t('Favoritos') }}</span
				>
			</button>
			<button
				v-for="category in categories"
				@click="
					selectCategory(category);
					appComponent.gAnalytics('category_live', category.title);
				"
				class="categorys lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
				:class="
					appComponent.selections !== undefined &&
					appComponent.selections.category !== undefined &&
					appComponent.selections.category.id === category.id
						? 'bg-primary-content blob font-bold categorysSelected'
						: 'lg:bg-secondary'
				"
			>
				<!-- Button for selecting each category -->
				<div
					class="h-10 lg:h-14 w-10 lg:w-14 mx-auto"
					v-html="category.icon"
				></div>
				<span
					class="text-xs lg:text-sm font-bold uppercase"
					:class="
						appComponent.selections !== undefined &&
						appComponent.selections.category !== undefined &&
						appComponent.selections.category.id === category.id
							? 'text-neutral-focus'
							: 'text-base-100'
					"
					>{{ $t(category.title) }}</span
				>
			</button>
		</nav>
	</section>
</template>
<style>
.categorys:hover div svg *,
.categorysSelected div svg * {
	fill: white; /* Change fill color to white on hover or when selected */
}
.categorys:hover * {
	color: white !important; /* Change text color to white on hover */
}
::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

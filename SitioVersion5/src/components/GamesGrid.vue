<template>
	<!-- Preloader displayed while loading games -->
	<div
		v-if="appComponent.preloaderShow"
		class="w-full h-[500px] flex justify-center items-center"
	>
		<!-- Spinner for loading indication -->
		<div
			class="w-10 h-10 border-2 border-solid border-primary rounded-full animate-spin"
		></div>
	</div>
	<!-- Section displayed when games are available -->
	<section
		v-else-if="appComponent.gamesList.length > 0"
		class="flex flex-col justify-center items-center gap-4 w-full max-w-[1156px] px-4 tablet:px-0"
	>
		<!-- Header with title and optional icon -->
		<div class="flex justify-start items-center gap-4 w-full">
			<h3 class="font-bold text-base tablet:text-2xl text-neutral">{{ $t(title) }}</h3>
			<img
				v-if="icon != ''"
				:src="icon"
				alt=""
				class="w-[30px] aspect-square object-contain"
			/>
		</div>
		<!-- Grid list of games -->
		<div class="gridList2 w-full">
			<!-- Button for each game in the games list -->
			<button
				v-for="(game, index) in appComponent.gamesList"
				:key="index"
				class="relative w-full h-full rounded-xl shadow-inner shadow-neutral-content cursor-pointer overflow-hidden m-auto"
				:class="
					' col-span-' +
					game.grid_column +
					' row-span-' +
					game.grid_row
				"
				@click="
					appComponent.openGame(game);
					appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {...game, action: config.urlVirtualplayML == undefined || appComponent.user_id == '' ? 'getGames2' : 'getGames6'});
				"
			>
				<!-- Game icon displayed if available -->
				<img
					v-show="
							game.icon_3 != undefined &&
							game.icon_3 != null &&
							game.icon_3 != ''
						"
					v-lazy="game.icon_3"
					alt=""
					class="absolute top-0 right-0 left-0 bottom-0 w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300 ease-in-out z-20 hover:z-10"
					:class="'object-' + game.object_fit"
				/>
				<!-- Overlay with game name and play button -->
				<div
					class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-2 xl:gap-4 w-full h-full xl:p-2"
				>
					<p
						class="text-neutral text-[0.8em] xl:text-base leading-3 font-bold max-w-[90%] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
					>
						{{ game.name.toLowerCase() }}
					</p>
					<button
						class="w-[90%] bg-primary text-neutral text-[0.5em] xl:text-xs leading-3 rounded-full font-bold p-1 xl:p-2 uppercase hover:scale-105"
						aria-label="Jugar ahora"
					>
						{{ $t('Jugar ahora') }}
					</button>
				</div>
			</button>
		</div>
		<!-- Load more games button if applicable -->
		<div v-if="appComponent.total_count > appComponent.offset" class="flex justify-center my-7">
			<button v-if="appComponent.showLoadMoreButton"
				class="in rounded-full bg-primary hover:bg-error/90 hover:scale-110 w-40 desktop:w-60 h-12 desktop:h-14 text-neutral font-semibold text-lg desktop:text-2xl"
				@click="loadMoreGames()"
			>
				{{ $t('Cargar mas') }}
			</button>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/ApiService';
import AppCarousel from '@/components/Carousel.vue';
import favoriteIcon from '@/components/icons/favoriteIcon.vue';
import searchIcon from '@/components/icons/searchIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue';
import IconChevronLeft from './icons/IconChevronLeft.vue';
import IconChevronRight from './icons/IconChevronRight.vue';
import ExitIcon from './icons/ExitIcon.vue';
import IconChevrondown from './icons/IconChevrondown.vue';
declare var Ticker : any; // Declare external Ticker variable
export default defineComponent({
	props: {
		category: String, // Category prop
		limit: { type: Number, default: 24 }, // Limit prop with default value
		typelobby: String, // Type of lobby prop
		title: { type: String, default: '' }, // Title prop with default value
		url: { type: String, default: '' }, // URL prop with default value
		offset: { type: Number, default: 0 }, // Offset prop with default value
		icon: { type: String, default: '' }, // Icon prop with default value
	},
	components: {
		AppCarousel, // Carousel component
		favoriteIcon, // Favorite icon component
		searchIcon, // Search icon component
		IconClose, // Close icon component
		animatedCloseIcon, // Animated close icon component
		IconChevronLeft, // Left chevron icon component
		IconChevronRight, // Right chevron icon component
		ExitIcon, // Exit icon component
		IconChevrondown, // Down chevron icon component
	},
	data: function () {
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // App component reference
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Preloader visibility state
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // Game visibility state
		let src: string = ''; // Source string
		let margin: number = 0; // Margin value
		let optionsGames: any = ''; // Options for games
		let partnerG: any = ''; // Partner group
		let limitBefore: any = ''; // Limit before value
		let urlVirtualplay: any = ''; // URL for virtual play
		let providers: any = ''; // Providers
		let providersLength: any = ''; // Length of providers
		let categories: any = ''; // Categories
		let categoriesLength: any = ''; // Length of categories
		return {
			config,
			appComponent,
			bgGame,
			preloaderShow,
			gameSelected,
			showGame,
			src,
			margin,
			optionsGames,
			partnerG,
			limitBefore,
			urlVirtualplay,
			providersLength,
			providers,
			categories,
			categoriesLength,
		};
	},
	setup() {
		const route = useRoute(); // Get current route
		let gameId: any = ref(route.params.GameId); // Game ID from route parameters
		let categoryId: any = ref(route.params.CategoryId); // Category ID from route parameters
		let providerId: any = ref(route.params.ProviderId); // Provider ID from route parameters
		return {
			route,
			gameId,
			categoryId,
			providerId,
		};
	},
	mounted() {
		this.appComponent.limitLocal = this.limit; // Set local limit
		this.urlVirtualplay = this.config.urlVirtualplay; // Set virtual play URL
		this.partnerG = this.appComponent.partnerG; // Set partner group
		// Load saved casino games from local storage
		if (
			window.localStorage.getItem('m_c_g') !== null &&
			window.localStorage.getItem('m_c_g') !== undefined
		) {
			var json_str: any = window.localStorage.getItem('m_c_g');
			this.appComponent.myCasinoGames = JSON.parse(json_str);
			this.appComponent.favCasino = true; // Set favorite casino flag
		}
		this.getCasinoGames(); // Fetch casino games
		this.appComponent.preloaderShow = false; // Hide preloader
	},
	watch:{
		$route(to, from){ // Watch for route changes
			this.resetButtonState() // Reset button state on route change
		}
	},
	methods: {
		async getCasinoGames() {
			this.appComponent.preloaderShow = true; // Show preloader
			var vthis = this; // Reference to the current context
			this.bgGame = {
				background:
					'url(' +
					this.config.casino.preloaderGame +
					')no-repeat 0 50%/cover', // Set background for preloader
			};
			this.preloaderShow = true; // Show preloader
			this.appComponent.showMore = true; // Show more games flag
			// Check if category and provider IDs are defined
			if (
				(this.categoryId == undefined ||
					this.categoryId == '' ||
					this.categoryId == 'todos-all') &&
				(this.providerId == undefined || this.providerId == '')
			) {
				this.optionsGames = {
					action:
						this.config.urlVirtualplayML == undefined ||
						this.appComponent.user_id == ''
							? 'getGames2'
							: 'getGames6', // Determine action based on user ID
					partner_id: this.appComponent.partnerG, // Partner ID
					typelobby: this.typelobby, // Type of lobby
					offset: 0, // Offset for pagination
					limit: this.limit, // Limit for number of games
					country: this.appComponent.country, // User's country
				};
				// Check if mobile
				if (this.appComponent.mobile == '1') {
					this.optionsGames.isMobile = true;
				} else {
					this.optionsGames.isMobile = false;
				}
				// Set user ID if available
				if (
					this.config.urlVirtualplayML != undefined &&
					this.appComponent.user_id != ''
				) {
					this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL
					this.optionsGames.userId = this.appComponent.user_id; // Set user ID
				}
				await Promise.race([
					apiService.requestGet(
						this.urlVirtualplay +
							(this.config.urlVirtualplayML == undefined ||
							this.appComponent.user_id == ''
								? '/cms/products/games/'
								: ''),
						this.optionsGames
					),
					new Promise((resolve, reject) => {
						setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
					}),
				])
					.then((response: any) => {
						if (response == 'timeout') {
                            vthis.appComponent.gamesList = []; // Clear games list on timeout
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
						} else {
              console.log(response.data) // Log response data
							var json = response.data; // Parse response data
							vthis.appComponent.gamesList = json.games; // Set games list
							vthis.appComponent.total_count = json.total_count; // Set total count
							vthis.appComponent.offset =
								vthis.appComponent.gamesList.length; // Update offset
							vthis.appComponent.limitLocal =
								vthis.appComponent.gamesList.length +
								this.limit; // Update local limit
							vthis.preloaderShow = false; // Hide preloader
							// Show or hide load more button based on total count
							if (
								vthis.appComponent.offset >=
								parseInt(vthis.appComponent.total_count)
							) {
								this.appComponent.showLoadMoreButton = false; // Hide load more button
							} else if (
								vthis.appComponent.offset <
								parseInt(vthis.appComponent.total_count)
							) {
								this.appComponent.showLoadMoreButton = true; // Show load more button
							}
							// Load Playtech jackpot script if applicable
							if (
								vthis.config.casino != undefined &&
								vthis.config.casino.playtechJackpot !=
									undefined &&
								vthis.config.casino.playtechJackpot[
									vthis.appComponent.country
								] != undefined
							) {
								if (
									vthis.config.casino.playtechJackpot[
										vthis.appComponent.country
										] !== undefined
								) {
									var existingScript = document.querySelector('script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]');
									if (existingScript) {
										existingScript.remove(); // Remove existing script
									}
									var script = document.createElement('script'); // Create new script element
									script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
									const vthis = this; // Reference to current context
									script.onload = function() {
										vthis.appComponent.gamesList.forEach((game) => {
											if (
												game.provider == 'PLAYTECH' &&
												game.jackpot != undefined &&
												game.jackpot == 1
											) {
												var objParams =
													vthis.config.casino.playtechJackpot[
														vthis.appComponent.country
														];
												objParams.game = game.front_game_id; // Set game ID for ticker
												var ticker = new Ticker(objParams); // Create new Ticker instance
												ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
												ticker.SetCurrencyPos('1'); // Set currency position
												ticker.tick(); // Start ticker
											}
										});
									};
									document.head.appendChild(script); // Append script to document head
								}
							}
							this.appComponent.preloaderShow = false; // Hide preloader
						}
					})
					.catch((error) => {
                        vthis.appComponent.gamesList = []; // Clear games list on error
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limitLocal = this.limit; // Reset local limit
                        vthis.preloaderShow = false; // Hide preloader
					});
			} else {
				// Handle cases where category ID is defined
				if (
					this.categoryId != undefined &&
					this.categoryId != 'todos-all'
				) {
					if (
						vthis.appComponent.offset >=
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = false; // Hide load more button
					}
					if (
						vthis.appComponent.offset <
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = true; // Show load more button
					}
					vthis.appComponent.selections.category.id =
						vthis.categoryId.split('-')[1]; // Set selected category ID
					this.optionsGames = {
						action:
							this.config.urlVirtualplayML == undefined ||
							this.appComponent.user_id == ''
								? 'getGames2'
								: 'getGames6', // Determine action based on user ID
						partner_id: this.appComponent.partnerG, // Partner ID
						category: this.categoryId.split('-')[1], // Category ID
						offset: 0, // Offset for pagination
						limit: this.limit, // Limit for number of games
						country: this.appComponent.country, // User's country
						typelobby: this.typelobby, // Type of lobby
					};
					// Check if mobile
					if (this.appComponent.mobile == '1') {
						this.optionsGames.isMobile = true;
					} else {
						this.optionsGames.isMobile = false;
					}
					// Set user ID if available
					if (
						this.config.urlVirtualplayML != undefined &&
						this.appComponent.user_id != ''
					) {
						this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL
						this.optionsGames.userId = this.appComponent.user_id; // Set user ID
					}
					Promise.race([
						apiService.requestGet(
							this.urlVirtualplay +
								(this.config.urlVirtualplayML == undefined ||
								this.appComponent.user_id == ''
									? '/cms/products/games/'
									: ''),
							this.optionsGames
						),
						new Promise((resolve, reject) => {
							setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
						}),
					])
						.then((response: any) => {
							if (response == 'timeout') {
                                vthis.appComponent.gamesList = []; // Clear games list on timeout
                                vthis.appComponent.total_count = 0; // Reset total count
                                vthis.appComponent.offset = 0; // Reset offset
                                vthis.appComponent.limitLocal = this.limit; // Reset local limit
                                vthis.preloaderShow = false; // Hide preloader
							} else {
								var json = response.data; // Parse response data
								vthis.appComponent.gamesList = json.games; // Set games list
								vthis.appComponent.total_count =
									json.total_count; // Set total count
								vthis.appComponent.offset =
									vthis.appComponent.gamesList.length; // Update offset
								vthis.appComponent.limitLocal =
									vthis.appComponent.gamesList.length +
									this.limit; // Update local limit
								// Load Playtech jackpot script if applicable
								if (
									vthis.config.casino != undefined &&
									vthis.config.casino.playtechJackpot !=
										undefined &&
									vthis.config.casino.playtechJackpot[
										vthis.appComponent.country
									] != undefined
								) {
									if (
										vthis.config.casino.playtechJackpot[
											vthis.appComponent.country
											] !== undefined
									) {
										var existingScript = document.querySelector('script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]');
										if (existingScript) {
											existingScript.remove(); // Remove existing script
										}
										var script = document.createElement('script'); // Create new script element
										script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
										const vthis = this; // Reference to current context
										script.onload = function() {
											vthis.appComponent.gamesList.forEach((game) => {
												if (
													game.provider == 'PLAYTECH' &&
													game.jackpot != undefined &&
													game.jackpot == 1
												) {
													var objParams =
														vthis.config.casino.playtechJackpot[
															vthis.appComponent.country
															];
													objParams.game = game.front_game_id; // Set game ID for ticker
													var ticker = new Ticker(objParams); // Create new Ticker instance
													ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
													ticker.SetCurrencyPos('1'); // Set currency position
													ticker.tick(); // Start ticker
												}
											});
										};
										document.head.appendChild(script); // Append script to document head
									}
								}
							}
						})
						.catch((error) => {
                            vthis.appComponent.gamesList = []; // Clear games list on error
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
						});
					if (
						vthis.appComponent.offset >=
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = false; // Hide load more button
					}
					if (
						vthis.appComponent.offset <
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = true; // Show load more button
					}
				}
				// Handle case where game ID is defined but category ID is not
				if (this.gameId != undefined && this.categoryId == undefined) {
					if (
						vthis.appComponent.offset >=
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = false; // Hide load more button
					}
					if (
						vthis.appComponent.offset <
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButtonn = true; // Show load more button
					}
				}
				// Handle case where provider ID is defined but game ID and category ID are not
				if (
					this.providerId != undefined &&
					this.gameId == undefined &&
					this.categoryId == undefined
				) {
					vthis.appComponent.selections.provider = vthis.providerId; // Set selected provider ID
					this.optionsGames = {
						action: 'getGames2', // Action for fetching games
						partner_id: this.appComponent.partnerG, // Partner ID
						offset: 0, // Offset for pagination
						limit: this.appComponent.limitLocal, // Limit for number of games
						country: this.appComponent.country, // User's country
						typelobby: this.typelobby, // Type of lobby
					};
					this.optionsGames.isMobile =
						this.appComponent.mobile == '1'; // Check if mobile
					if (this.providerId != '') {
						this.optionsGames.provider = this.providerId; // Set provider ID
					}
					// Set user ID if available
					if (
						this.config.urlVirtualplayML != undefined &&
						this.appComponent.user_id != ''
					) {
						this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL
						this.optionsGames.userId = this.appComponent.user_id; // Set user ID
					}
					Promise.race([
						apiService.requestGet(
							this.urlVirtualplay +
								(this.config.urlVirtualplayML == undefined ||
								this.appComponent.user_id == ''
									? '/cms/products/games/'
									: ''),
							this.optionsGames
						),
						new Promise((resolve, reject) => {
							setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
						}),
					])
						.then((response: any) => {
							if (response == 'timeout') {
                                vthis.appComponent.gamesList = []; // Clear games list on timeout
                                vthis.appComponent.total_count = 0; // Reset total count
                                vthis.appComponent.offset = 0; // Reset offset
                                vthis.appComponent.limitLocal = this.limit; // Reset local limit
                                vthis.preloaderShow = false; // Hide preloader
							} else {
								var json = response.data; // Parse response data
								vthis.appComponent.gamesList = json.games; // Set games list
								vthis.appComponent.total_count =
									json.total_count; // Set total count
								vthis.appComponent.offset =
									vthis.appComponent.gamesList.length; // Update offset
								vthis.appComponent.limitLocal =
									vthis.appComponent.gamesList.length +
									this.limit; // Update local limit
								// Load Playtech jackpot script if applicable
								if (
									vthis.config.casino != undefined &&
									vthis.config.casino.playtechJackpot !=
										undefined &&
									vthis.config.casino.playtechJackpot[
										vthis.appComponent.country
									] != undefined
								) {
									if (
										vthis.config.casino.playtechJackpot[
											vthis.appComponent.country
											] !== undefined
									) {
										var existingScript = document.querySelector('script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]');
										if (existingScript) {
											existingScript.remove(); // Remove existing script
										}
										var script = document.createElement('script'); // Create new script element
										script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
										const vthis = this; // Reference to current context
										script.onload = function() {
											vthis.appComponent.gamesList.forEach((game) => {
												if (
													game.provider == 'PLAYTECH' &&
													game.jackpot != undefined &&
													game.jackpot == 1
												) {
													var objParams =
														vthis.config.casino.playtechJackpot[
															vthis.appComponent.country
															];
													objParams.game = game.front_game_id; // Set game ID for ticker
													var ticker = new Ticker(objParams); // Create new Ticker instance
													ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
													ticker.SetCurrencyPos('1'); // Set currency position
													ticker.tick(); // Start ticker
												}
											});
										};
										document.head.appendChild(script); // Append script to document head
									}
								}
							}
						})
						.catch((error) => {
                            vthis.appComponent.gamesList = []; // Clear games list on error
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
						});
					if (
						vthis.appComponent.offset >=
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = false; // Hide load more button
					}
					if (
						vthis.appComponent.offset <
						parseInt(vthis.appComponent.total_count)
					) {
						this.appComponent.showLoadMoreButton = true; // Show load more button
					}
				}
			}
		},
		closeGame() {
			this.showGame = false; // Close game visibility
		},
		moveLeft() {
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino-' + this.typelobby
				) as HTMLCollectionOf<HTMLElement>
			)[0];
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			// Scroll left by 150 pixels
			(
				document.getElementsByClassName(
					'slider-casino-' + this.typelobby
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber - 150, 0);
		},
		toggleSaveToMyCasinoGames(game) {
			this.appComponent.favCasino = true; // Set favorite casino flag
			if (this.appComponent.myCasinoGames.length > 0) {
				var index = this.appComponent.myCasinoGames
					.map((x) => {
						return x.id; // Map to game IDs
					})
					.indexOf(game.id); // Find index of the game
				if (index == -1) {
					this.appComponent.myCasinoGames.push(game); // Add game to favorites
				} else {
					this.appComponent.myCasinoGames.splice(index, 1); // Remove game from favorites
					if (this.appComponent.myCasinoGames.length == 0) {
						this.getCasinoGames(); // Fetch casino games if favorites are empty
						this.appComponent.favCasino = false; // Reset favorite casino flag
					}
				}
			} else {
				this.appComponent.myCasinoGames.push(game); // Add game to favorites
			}
			var json_str = JSON.stringify(this.appComponent.myCasinoGames); // Convert favorites to JSON
			window.localStorage.setItem('m_c_g', json_str); // Save favorites to local storage
		},
		isFromSaved(id) {
			if (this.appComponent.myCasinoGames.length > 0) {
				for (
					var i = 0;
					i < this.appComponent.myCasinoGames.length;
					i++
				) {
					if (id == this.appComponent.myCasinoGames[i].id) {
						return true; // Return true if game is in favorites
					}
				}
			}
		},
		moveRight() {
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino-' + this.typelobby
				) as HTMLCollectionOf<HTMLElement>
			)[0];
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			// Scroll right by 150 pixels
			(
				document.getElementsByClassName(
					'slider-casino-' + this.typelobby
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber + 150, 0);
		},
		loadMoreGames() {
			let vthis = this; // Reference to current context
			this.preloaderShow = true; // Show preloader
			var limit = 0; // Initialize limit
			if (this.appComponent.limitLocal < this.appComponent.total_count) {
				limit = this.appComponent.limitLocal; // Set limit to local limit
			} else {
				limit =
					this.appComponent.total_count -
					this.appComponent.limitLocal; // Calculate remaining limit
				this.appComponent.showMore = false; // Hide show more flag
			}
			this.optionsGames = {
				action:
					this.config.urlVirtualplayML == undefined ||
					this.appComponent.user_id == ''
						? 'getGames2'
						: 'getGames6', // Determine action based on user ID
				partner_id: this.partnerG, // Partner ID
				offset: this.appComponent.offset, // Current offset
				limit: this.appComponent.limitLocal, // Limit for number of games
				country: this.appComponent.country, // User's country
				typelobby: this.typelobby, // Type of lobby
			};
			this.optionsGames.isMobile = this.appComponent.mobile == '1'; // Check if mobile
			// Set user ID if available
			if (
				this.config.urlVirtualplayML != undefined &&
				this.appComponent.user_id != ''
			) {
				this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL
				this.optionsGames.userId = this.appComponent.user_id; // Set user ID
			}
			// Check if category or provider is selected
			if (
				this.appComponent.selections.category != undefined &&
				this.appComponent.selections.category != ''
			) {
				this.optionsGames.category =
					this.appComponent.selections.category.id; // Set category ID
			} else if (
				this.appComponent.selections.provider != undefined &&
				this.appComponent.selections.provider != ''
			) {
				this.optionsGames.provider =
					this.appComponent.selections.provider; // Set provider ID
			}
			vthis.limitBefore = limit - this.limit; // Calculate limit before
			if (vthis.limitBefore <= 0) {
				vthis.limitBefore = this.limit; // Reset limit before if negative
			}
			if (vthis.appComponent.offset < vthis.appComponent.total_count) {
				apiService
					.requestGet(
						this.urlVirtualplay +
							(this.config.urlVirtualplayML == undefined ||
							this.appComponent.user_id == ''
								? '/cms/products/games/'
								: ''),
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Parse response data
						var games = json.games; // Get games from response
						games.forEach(function (value, key) {
							vthis.appComponent.gamesList.push(value); // Add each game to the games list
						});
						vthis.appComponent.offset =
							vthis.appComponent.gamesList.length; // Update offset
						vthis.appComponent.limitLocal = limit + this.limit; // Update local limit
						// Show or hide load more button based on total count
						if (
							vthis.appComponent.offset >=
							parseInt(vthis.appComponent.total_count)
						) {
							this.appComponent.showLoadMoreButton = false; // Hide load more button
						}
						if (
							vthis.appComponent.offset <
							parseInt(vthis.appComponent.total_count)
						) {
							this.appComponent.showLoadMoreButton = true; // Show load more button
						}
						// Load Playtech jackpot script if applicable
						if (
							vthis.config.casino != undefined &&
							vthis.config.casino.playtechJackpot != undefined &&
							vthis.config.casino.playtechJackpot[
								vthis.appComponent.country
							] != undefined
						) {
							var existingScript = document.querySelector('script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]');
							if (existingScript) {
								existingScript.remove(); // Remove existing script
							}
							var script = document.createElement('script'); // Create new script element
							script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
							const vthis = this; // Reference to current context
							script.onload = function() {
								vthis.appComponent.gamesList.forEach((game) => {
									if (
										game.provider == 'PLAYTECH' &&
										game.jackpot != undefined &&
										game.jackpot == 1
									) {
										var objParams =
											vthis.config.casino.playtechJackpot[
												vthis.appComponent.country
												];
										objParams.game = game.front_game_id; // Set game ID for ticker
										var ticker = new Ticker(objParams); // Create new Ticker instance
										ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
										ticker.SetCurrencyPos('1'); // Set currency position
										ticker.tick(); // Start ticker
									}
								});
							};
							document.head.appendChild(script); // Append script to document head
						}
					});
			} else {
				vthis.appComponent.showMore = false; // Hide show more flag
				// Show or hide load more button based on total count
				if (
					vthis.appComponent.offset >=
					parseInt(vthis.appComponent.total_count)
				) {
					this.appComponent.showLoadMoreButton = false; // Hide load more button
				}
				if (
					vthis.appComponent.offset <
					parseInt(vthis.appComponent.total_count)
				) {
					this.appComponent.showLoadMoreButton = true; // Show load more button
				}
			}
		},
		resetButtonState(){
			this.appComponent.showLoadMoreButton = true; // Reset load more button state
		}
	},
});
</script>
<style scoped>
/* Style for Playtech jackpot display */
.playtech-jackpot {
	width: 100%; /* Full width */
	color: white; /* Text color */
	border-radius: 4px; /* Rounded corners */
	display: block; /* Block display */
}

/* Grid layout for game list */
.gridList2 {
	display: grid; /* Use grid layout */
	grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); /* Responsive columns */
	grid-auto-rows: 1fr; /* Equal height rows */
	gap: 15px; /* Gap between grid items */
}

/* Aspect ratio for game buttons */
.gridList2 > button {
	aspect-ratio: 1 / 1 !important; /* Maintain square aspect ratio */
}

/* Media query for larger screens */
@media (min-width: 700px) {
	.gridList2 {
		grid-template-columns: repeat(5, minmax(75px, 220px)); /* 5 columns on larger screens */
		gap: 20px; /* Increased gap */
	}
}

/* Media query for even larger screens */
@media (min-width: 1024px) {
	.gridList2 {
		grid-template-columns: repeat(7, minmax(75px, 220px)); /* 7 columns on larger screens */
	}
}
</style>

<!-- FILE DOCUMENTED -->

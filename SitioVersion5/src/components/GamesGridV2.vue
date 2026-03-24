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
import { useGlobalStore } from '@/stores/global';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import anime from 'animejs';
declare var Ticker: any;

/**
 * Main component definition for the casino lobby.
 */
export default defineComponent({
	props: {
		/** Category of the games */
		category: String,
		/** Limit of games to display */
		limit: { type: Number, default: 24 },
		/** Type of lobby */
		typelobby: String,
		/** Title of the section */
		title: { type: String, default: '' },
		/** URL for the section */
		url: { type: String, default: '' },
		/** Offset for pagination */
		offset: { type: Number, default: 0 },
		/** Icon for the section */
		icon: { type: String, default: '' },
		/** Data object containing additional information */
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	components: {
		AnimatedPlaceholder,
		AppCarousel,
		favoriteIcon,
		searchIcon,
		IconClose,
		animatedCloseIcon,
		IconChevronLeft,
		IconChevronRight,
		ExitIcon,
		IconChevrondown,
	},
	data: function() {
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Application component reference
		let emitter: any = this.$emitter(); // Event emitter
		let storeCasinoLobby = useGlobalStore(); // Global store for casino lobby
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Preloader visibility flag
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // Flag to show game details
		let src: string = ''; // Source URL for images
		let margin: number = 0; // Margin for layout
		let optionsGames: any = ''; // Options for games
		let partnerG: any = ''; // Partner information
		let limitBefore: any = ''; // Previous limit value
		let urlVirtualplay: any = ''; // URL for virtual play
		let providers: any = ''; // Providers information
		let providersLength: any = ''; // Length of providers
		let categories: any = ''; // Categories information
		let categoriesLength: any = ''; // Length of categories
		let route = useRoute(); // Current route information
		let favorites = []; // List of favorite games
		let onSckeletonLoader = false; // Skeleton loader visibility flag
		let isVisible = true; // Visibility flag for the component
		let gamesList = []; // List of games
		let offsetSlider: number = 0; // Offset for slider
		let limitSlider: number = 0; // Limit for slider
		let limit: number = 0; // Limit for games
		let totalGames: number = 0; // Total number of games
		let limitLocal: number = 500; // Local limit for games
		let startAnime = 0; // Animation start index
		return {
			config,
			appComponent,
			bgGame,
			preloaderShow,
			gameSelected,
			showGame,
			src,
			route,
			margin,
			optionsGames,
			partnerG,
			limitBefore,
			urlVirtualplay,
			providersLength,
			providers,
			categories,
			categoriesLength,
			favorites,
			emitter,
			onSckeletonLoader,
			isVisible,
			gamesList,
			offsetSlider,
			limitSlider,
			limit,
			totalGames,
			limitLocal,
			storeCasinoLobby,
			startAnime,
		};
	},
	setup() {
		const route = useRoute(); // Access current route
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
	unmounted() {
		// Clean up event listeners on component unmount
		this.emitter.all.delete('gamesFavorites');
		this.emitter.all.delete('get:gamesList');
	},
	created() {
		// Lifecycle hook for component creation
		this.limitSlider = this.data.limit; // Set slider limit
		this.limit = this.data.limit; // Set limit
		if (this.data.user) {
			if (this.appComponent.session.logueado) {
				this.getCasinoGames(); // Fetch casino games if user is logged in
			} else {
				this.isVisible = false; // Hide if user is not logged in
			}
		} else {
			this.getCasinoGames(); // Fetch casino games if no user data
		}
	},
	mounted() {
		// Lifecycle hook for component mounting
		this.emitter.on('get:gamesList', () => {
			this.onSckeletonLoaderMore = true; // Show skeleton loader
			this.isVisible = true; // Make component visible
			if (this.data.user) {
				if (this.appComponent.session.logueado) {
					this.getCasinoGames(); // Fetch casino games if user is logged in
				} else {
					this.isVisible = false; // Hide if user is not logged in
				}
			} else {
				this.getCasinoGames(); // Fetch casino games if no user data
			}
		});
		this.appComponent.limitLocal = this.limit; // Set local limit
		this.urlVirtualplay = this.config.urlVirtualplay; // Set virtual play URL
		this.partnerG = this.appComponent.partnerG; // Set partner information
		if (
			window.localStorage.getItem('m_c_g') !== null &&
			window.localStorage.getItem('m_c_g') !== undefined &&
			this.appComponent.config.activeFavoritesWithBackend == undefined ||
			window.localStorage.getItem('m_c_g') !== null &&
			window.localStorage.getItem('m_c_g') !== undefined &&
			this.appComponent.config.activeFavoritesWithBackend == false
		) {
			var json_str: any = window.localStorage.getItem('m_c_g'); // Retrieve favorite games from local storage
			this.appComponent.myCasinoGames = JSON.parse(json_str); // Parse and set favorite games
		}
		this.emitter.on('gamesFavorites', () => {
			this.getFavoriteGames(); // Fetch favorite games on event
		});
	},
	computed: {
		/** Count of placeholders based on remaining games */
		placeholdersCount() {
			const remainingGames = parseInt(this.totalGames) - this.gamesList.length; // Calculate remaining games
			return remainingGames > parseInt(this.limit) ? parseInt(this.limit) : (remainingGames > 0 ? remainingGames : 0);
		}
	},
	methods: {
		/** Fetch favorite games for the user */
		getFavoriteGames() {
			let params = {
				user_id: this.appComponent.session.usuario, // User ID for fetching favorites
			};
			apiService.request('get_casino_favorite_ids', params).then((response) => {
				if (response.code == 0) {
					this.favorites = response.data.favorites; // Set favorites from response
					this.appComponent.gamesList.forEach((game) => {
						game.fav = false; // Initialize favorite flag
						this.favorites.forEach((id) => {
							if (game.id == id) {
								game.fav = true; // Mark game as favorite
							}
						});
					});
					if (this.favorites.length == 1) {
						this.emitter.emit('activeFav'); // Emit event if one favorite
					} else if (this.favorites.length == 0) {
						this.emitter.emit('deleteFav'); // Emit event if no favorites
					}
				} else {
					var error_mensaje = ''; // Error message initialization
					if (response.error_code != undefined) {
						error_mensaje = this.$t('ERROR' + (response.error_code).toString()); // Set error message based on error code
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Default error message
					}
					this.appComponent.modal = {
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					}; // Show error modal
				}
			});
		},
		/** Toggle saving a game to the user's favorites */
		toggleSaveToMyCasinoGames(game) {
			if (
				this.appComponent.config.activeFavoritesWithBackend != undefined &&
				this.appComponent.config.activeFavoritesWithBackend == true
			) {
				if (
					this.appComponent.session.logueado
				) {
					let params = {
						user: this.appComponent.session.usuario, // User ID
						game_id: game.id, // Game ID
						status: game.fav != undefined && game.fav == true ? 'I' : 'A', // Status based on favorite flag
					};
					apiService.request('manage_favorite_games', params).then((response) => {
						if (response.code == 0) {
							this.getFavoriteGames(); // Refresh favorites after saving
						} else {
							var error_mensaje = ''; // Error message initialization
							if (response.error_code != undefined) {
								error_mensaje = this.$t('ERROR' + (response.error_code).toString()); // Set error message based on error code
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Default error message
							}
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							}; // Show error modal
						}
					});
				} else {
					this.appComponent.showModalLogin = true; // Show login modal if not logged in
				}
			} else {
				this.appComponent.favCasino = true; // Set favorite flag for local favorites
			}
			if (
				this.appComponent.myCasinoGames.length > 0 &&
				this.appComponent.config.activeFavoritesWithBackend == undefined ||
				this.appComponent.myCasinoGames.length > 0 &&
				this.appComponent.config.activeFavoritesWithBackend == false
			) {
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
						this.getCasinoGames(); // Refresh games if no favorites left
						this.appComponent.favCasino = false; // Reset favorite flag
					}
				}
			} else {
				this.appComponent.myCasinoGames.push(game); // Add game to favorites
			}
			var json_str = JSON.stringify(this.appComponent.myCasinoGames); // Convert favorites to JSON
			window.localStorage.setItem('m_c_g', json_str); // Store favorites in local storage
		},
		/** Check if a game is saved in favorites */
		isFromSaved(id) {
			if (this.appComponent.myCasinoGames.length > 0) {
				for (var i = 0; i < this.appComponent.myCasinoGames.length; i++) {
					if (id == this.appComponent.myCasinoGames[i].id) {
						return true; // Return true if game is found in favorites
					}
				}
			}
		},
		/** Fetch casino games based on user session and parameters */
		async getCasinoGames() {
			this.onSckeletonLoader = true; // Show skeleton loader
			let optionsGames = {}; // Options for fetching games
			if (this.appComponent.session.logueado && this.data.user) {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user,
				}; // Set options for logged-in users
			} else {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
				}; // Set options for guests
			}
			try {
				await apiService
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						optionsGames,
					)
					.then((response: any) => {
						this.loading = false; // Hide loading state
						this.onSckeletonLoader = false; // Hide skeleton loader
						this.gamesList = response.data.games; // Set games list from response
						this.totalGames = response.data.total_count; // Set total games count
						this.appComponent.showLoadMoreButton = this.gamesList.length < this.totalGames; // Show load more button if applicable
						this.isVisible = response.data.games.length > 0; // Set visibility based on games fetched
					});
			} catch (e) {
				this.loading = false; // Hide loading state on error
				this.onSckeletonLoader = false; // Hide skeleton loader on error
				this.isVisible = false; // Hide component on error
			}
		},
		/** Load more games for the user */
		async loadMoreGames() {
			this.offsetSlider = parseInt(this.offsetSlider) + parseInt(this.limit); // Update offset for pagination
			this.startAnime = 0; // Reset animation start index
			this.onSckeletonLoader = true; // Show skeleton loader
			let optionsGames = {}; // Options for fetching more games
			if (this.appComponent.session.logueado && this.data.user) {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user,
				}; // Set options for logged-in users
			} else {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
				}; // Set options for guests
			}
			try {
				await apiService
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						optionsGames,
					)
					.then((response: any) => {
						this.loading = false; // Hide loading state
						this.onSckeletonLoader = false; // Hide skeleton loader
						response.data.games.forEach((game: any, index: number) => {
							this.gamesList.push(game); // Add fetched games to the list
						});
						this.totalGames = response.data.total_count; // Update total games count
						this.appComponent.showLoadMoreButton = this.gamesList.length < this.totalGames; // Show load more button if applicable
						this.isVisible = response.data.games.length > 0; // Set visibility based on games fetched
					});
			} catch (e) {
				this.loading = false; // Hide loading state on error
				this.onSckeletonLoader = false; // Hide skeleton loader on error
				this.isVisible = false; // Hide component on error
			}
		},
		/** Animation for loading more games */
		onEnterLoadMore(el: any, done: any) {
			anime({
				targets: el,
				opacity: [0, 1], // Fade in effect
				translateY: [-300, 0], // Slide in effect
				easing: 'easeInOutQuart', // Easing function
				delay: this.startAnime * 100, // Delay based on animation index
				complete: done, // Callback when animation is complete
			});
			this.startAnime += 1; // Increment animation index
		},
	},
});
</script>
<template>
	<!-- Main section for displaying the casino lobby -->
	<section
		v-if="appComponent.contingencyCasino"
		class="flex justify-center items-center py-2"
		:class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': ''"
 
	>
		<div class="h-full w-full">
			<section
				class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center"
			>
				<div
					class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"
				></div>
				<div
					class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center"
				>
					<div
						class="flex flex-col gap-8 justify-center items-center mt-10 xl:mt-0"
					>
						<p
							class="text-neutral text-xl md:text-3xl max-w-[700px] text-center"
							v-html="$t(config.contingencyCasino.message)"
						></p>
						<RouterLink
							v-if="
								config.contingencyCasino !== undefined &&
								config.contingencyCasino.button !== undefined &&
								config.contingencyCasino.button.url != undefined &&
								config.contingencyCasino.button.text != undefined
							"
							:to="config.contingencyCasino.button.url"
							class="text-shadow-xl rounded-full bg-gradient-to-b from-primary to-primary/60 text-neutral uppercase font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
						>
							{{ $t(config.contingencyCasino.button.text) }}
						</RouterLink>
					</div>
					<img
						v-if="
							config.contingencyCasino !== undefined &&
							config.contingencyCasino.img !== undefined
						"
						:src="config.contingencyCasino.img"
						alt=""
						class="object-contain w-[400px] xl:w-[600px]"
					/>
				</div>
				<img
					v-if="
						config.contingencyCasino !== undefined &&
						config.contingencyCasino.imgBackground !== undefined
					"
					:src="config.contingencyCasino.imgBackground"
					alt=""
					class="absolute w-full h-full object-cover z-10"
				/>
				<div
					class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute z-10 -bottom-0"
				></div>
			</section>
		</div>
	</section>
	<!-- Section for displaying games when no contingency is active -->
	<section
		v-if="!appComponent.contingencyCasino && gamesList.length > 0"
		class="flex justify-center items-center py-2"
		:class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': 'bg-neutral-content'"

	>
		<div class="max-w-[1300px] w-11/12">
			<div class="in relative flex justify-between items-center">
				<RouterLink
					:class="{'flex flex-row justify-center items-center gap-x-2' : config.layout != undefined && config.layout == 4, 'flex flex-row gap-10':config.layout == 5 }"
					class="uppercase font-bold text-2xl my-1 text-neutral"
					aria-label="Casino bets"
					:to="data.url"
				>
					{{ $t(data.title) }}
					<img v-if='icon' :src="icon" alt="Casino icon" class="w-8 h-8 object-contain">
				</RouterLink>
				<div
					v-if="config.layout != undefined && config.layout != 4 && config.layout != 5 && config.layout != 7"
					class="absolute w-12 h-1 bg-yellow-300 bottom-0 rounded-full"
				></div>
			</div>
			<div class="h-full w-full">
				<div class="w-full h-full flex justify-center items-center py-2"
						:class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': 'bg-neutral-content'"
>
					<ul
						class="gridList2 w-full h-full"
						:class="'slider-casino-' + data.typelobby"
					>
						<TransitionGroup
							v-show="!onSckeletonLoader"
							class="grid"
							:css="true"
							@enter="onEnterLoadMore"
						>
							<li
								v-for="(game, index) in gamesList"
								:key="index"
								class="in relative w-full h-full rounded-xl shadow-inner shadow-black cursor-pointer overflow-hidden m-auto"
								:class="
								' col-span-' + game.grid_column + ' row-span-' + game.grid_row
							"
								ref="card"
								:data-index="index"
							>
								<div class="relative w-full h-full">
									<div class="z-[99] absolute w-10 h-10 top-0 right-0">
										<button
											class="absolute w-10 h-10 top-0 right-0"
											@click="
											$event.stopPropagation;
											toggleSaveToMyCasinoGames(game);
										"
										>
											<favoriteIcon
												v-if="appComponent.config.activeFavoritesWithBackend != undefined && appComponent.config.activeFavoritesWithBackend == true"
												class="favorite-icon-view"
												:width="24"
												:height="16"
												:fill="game.fav != undefined && game.fav ? '#00d30a' : '#88be86'"
											></favoriteIcon>
											<favoriteIcon
												v-else-if="appComponent.config.activeFavoritesWithBackend == undefined || appComponent.config.activeFavoritesWithBackend == false"
												class="favorite-icon-view"
												:width="24"
												:height="16"
												:fill="isFromSaved(game.id) ? '#00d30a' : '#88be86'"
											></favoriteIcon>
										</button>
									</div>
									<span
										class="playtech-jackpot bg-primary saturate-150 z-40 text-center text-xs md:text-base"
										v-if="game.provider == 'PLAYTECH'"
										:id="'playtech-' + game.id"
									></span>
									<button
										@click="
										appComponent.gamesList.idSelect = game.id;
										appComponent.openLink = true;
										appComponent.openGame(game);
										appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino' , {...game, action: data.action});
										$event.stopPropagation();
									"
										:aria-label="game.name"
										class="flex justify-start items-start"
									>
										<img
											v-show="
											game.icon_3 != undefined &&
											game.icon_3 != null &&
											game.icon_3 != ''
										"
											:src="game.icon_3"
											alt=""
											:class="
											'absolute w-full h-full z-20 hover:z-10 aspect-square' +
											' object-' +
											game.object_fit
										"
										/>
                    <!--
                      Displays total players and table status ("En juego" / "Cerrado") if available in `dgaDataMap` for the game.
                      Player count: prefers `totalSeatedPlayers`, then `numberOfPlayers`, defaults to '0'.
                      Styled at bottom-left with gradient background and small text.
                    -->
                    <div
                        v-if="appComponent.dgaDataMap != undefined && appComponent.dgaDataMap[game.front_game_id] != undefined && appComponent.dgaDataMap[game.front_game_id]"
                        class="absolute z-20 bottom-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r from-black/30 to-black/50 text-white backdrop-blur-md shadow-md text-[11px] leading-tight space-y-0.5 min-w-[60px]"
                    >
                      <div class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span class="font-semibold">
                                              {{
                            appComponent.dgaDataMap[game.front_game_id].totalSeatedPlayers
                            ?? appComponent.dgaDataMap[game.front_game_id].numberPlayers
                            ?? '0'
                          }}
                                        </span>
                      </div>
                      <div
                          :class="{
                        'text-green-300 font-medium': appComponent.dgaDataMap[game.front_game_id].tableOpen,
                        'text-red-400 font-medium': !appComponent.dgaDataMap[game.front_game_id].tableOpen
                      }"
                      >
                        {{
                          appComponent.dgaDataMap[game.front_game_id].tableOpen
                              ? $t('En juego')
                              : $t('Cerrado')
                        }}
                      </div>
                    </div>
										<div
											class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105 absolute flex flex-col justify-center items-center gap-4 w-full h-full p-1 break-all"
										>
											<h3
												class="w-[90%] text-neutral font-bold flex justify-center items-center break-words text-base capitalize whitespace-pre-wrap"
											>
												{{ game.name.toLowerCase() }}
											</h3>
											<div class="relative w-40 h-10">
										  <!-- Borde degradado desplazado -->
										  <div
										    class="absolute inset-0 translate-x-1 translate-y-1 bg-gradient-to-r from-primary to-primary-content rounded-lg"
										  ></div>

										  <!-- Botón principal -->
										  <button
										    class="relative w-full h-full bg-primary text-neutral text-xs lg:text-base rounded-lg font-bold uppercase flex justify-center items-center gap-2 shadow-sm transition-transform"
										    aria-label="Jugar ahora"
										  >
										    {{ $t('Jugar ahora') }}
										    <svg
										      width="11"
										      height="14"
										      viewBox="0 0 11 14"
										      fill="none"
										      xmlns="http://www.w3.org/2000/svg"
										    >
										      <path
										        d="M0 12.175V1.82495C0 1.54162 0.1 1.30412 0.3 1.11245C0.5 0.920785 0.733333 0.824951 1 0.824951C1.08333 0.824951 1.17083 0.837451 1.2625 0.862451C1.35417 0.887451 1.44167 0.924951 1.525 0.974951L9.675 6.14995C9.825 6.24995 9.9375 6.37495 10.0125 6.52495C10.0875 6.67495 10.125 6.83328 10.125 6.99995C10.125 7.16662 10.0875 7.32495 10.0125 7.47495C9.9375 7.62495 9.825 7.74995 9.675 7.84995L1.525 13.025C1.44167 13.075 1.35417 13.1125 1.2625 13.1375C1.17083 13.1625 1.08333 13.175 1 13.175C0.733333 13.175 0.5 13.0791 0.3 12.8875C0.1 12.6958 0 12.4583 0 12.175Z"
										        fill="currentColor"
										      />
										    </svg>
										  </button>
										</div>
										</div>
									</button>
								</div>
							</li>
						</TransitionGroup>
						<AnimatedPlaceholder
							v-if="onSckeletonLoader"
							v-for="index in placeholdersCount"
							:key="index"
							class="w-[170px] h-[170px] aspect-square rounded-xl"
						/>
					</ul>
				</div>
			</div>
			<div class="w-full flex justify-center items-center pt-8 pb-2">
				<button
					v-if="appComponent.showLoadMoreButton && config.layout != 4 && config.layout != 5 && config.layout != 7"
					class="btn-load-more in rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[20px] rounded-br-[20px] bg-neutral hover:bg-neutral/80 w-60 h-14 text-neutral font-semibold text-xl hover:scale-105 shadow-inner shadow-secondary"
					@click="loadMoreGames()"
				>
					{{ $t('CARGAR MAS') }}
				</button>
				<button
					v-if="appComponent.showLoadMoreButton && config.layout != undefined && config.layout == 7"
					class="in rounded-full px-6 py-1 text-primary font-semibold text-xl hover:scale-105 shadow-inner shadow-secondary border-solid border-1 border-primary"
					@click="loadMoreGames()"
				>
					{{ $t('CARGAR MAS') }}
				</button>
				<div v-else-if="appComponent.showLoadMoreButton && config.layout == 4" class="flex justify-center my-7">
					<button @click="loadMoreGames()"
							class="relative group hover:brightness-90 bg-primary text-neutral uppercase font-poppinssl pl-5 flex flex-row justify-center items-center gap-x-2 h-[30px] box-content rounded-full border-solid border-2 border-primary text-sm  md:text-base">
						{{ $t('Más juegos') }}
						<span
							class="fill-neutral bg-primary rounded-full h-full w-[30px] flex justify-center items-center">
						<IconChevrondown width="15" height="15"
										 class="fill-neutral group-hover:translate-y-1 transition-all ease-in-out" />
						</span>
					</button>
				</div>
				<div v-else-if="appComponent.showLoadMoreButton && config.layout == 5" class="flex justify-center my-7">
					<button
						class="btn-load-more in rounded-lg bg-success hover:bg-neutral/80 w-60 h-14 text-secondary hover:text-success font-semibold text-xl hover:scale-105"
						@click="loadMoreGames()"
					>
						{{ $t('Cargas mas') }}
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
/* Style for Playtech jackpot indicator */
.playtech-jackpot {
	width: 100%;
	color: white;
	border-radius: 4px;
	display: block;
}

/* Grid layout for game list */
.gridList2 {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
	grid-auto-rows: minmax(75px, 1fr);
	gap: 20px;
}

/* Ensure each grid item maintains a square aspect ratio */
.gridList2 > li {
	aspect-ratio: 1 / 1 !important;
}

/* Responsive styles for larger screens */
@media (min-width: 744px) {
	.gridList2 {
		grid-template-columns: repeat(5, minmax(75px, 220px));
		gap: 20px;
	}
}

@media (min-width: 1024px) {
	.gridList2 {
		grid-template-columns: repeat(7, minmax(75px, 220px));
	}
}
</style>

<!-- FILE DOCUMENTED -->

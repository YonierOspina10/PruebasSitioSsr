<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/ApiService';
import AppCarousel from '@/components/Carousel.vue';
import favoriteIcon from '@/components/icons/favoriteIcon.vue';
import searchIcon from '@/components/icons/searchIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue';
import { useGetInfoFirestore } from '../../composables/useInfoFirestore';
import { toKebabCase } from '@/utils'; // Import function to get banners data from firestore

/**
 * Main component definition for the casino lobby.
 */
export default defineComponent({
	components: {
		AppCarousel,
		favoriteIcon,
		searchIcon,
		IconClose,
		animatedCloseIcon,
		SearchGames2: defineAsyncComponent(
			() => import('../../components/search/SearchGames.vue')
		),
		// Asynchronously load various menu and slider components
		MenuCasino3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3.vue')
		),
		MenuCasino4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino4.vue')
		),
		MenuProviders3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3.vue')
		),
		MenuProviders4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders4.vue')
		),
		SliderCasino3V2Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3V2.vue')
		),
		Carousel3Component: defineAsyncComponent(
			() => import('../../components/Carousel3.vue')
		),
		Carousel3V2Component: defineAsyncComponent(
			() => import('../../components/Carousel3V2.vue')
		),
		JackpotWinnerComponent: defineAsyncComponent(
			() => import('../../components/JackpotWinners.vue')
		),
		BannerSlider6: defineAsyncComponent(
			() => import('../../components/BannerSlider6.vue')
		),
		PromotionalCards: defineAsyncComponent(
			() => import('../../components/PromotionalCards.vue')
		),
		Menu6: defineAsyncComponent(
			() => import('../../components/menus/Menu6.vue')
		),
		SliderGamesV2: defineAsyncComponent(
			() => import('../../components/SliderGamesV2.vue')
		),
		MenuCasino6: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino6.vue')
		),
		MenuProviders6: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders6.vue')
		),
		GamesGrid: defineAsyncComponent(
			() => import('../../components/GamesGrid.vue')
		),
		Carousel7Component: defineAsyncComponent(
			() => import('../../components/Carousel7.vue')
		),
      GamesGridV3Component: defineAsyncComponent(
          () => import('../../components/GamesGridV3.vue'),
      ),
      SearchGames: defineAsyncComponent(
          () => import('../../components/SearchGames.vue'),
      ),
      CategoriesGamesComponent: defineAsyncComponent(
          () => import('../../components/CategoriesGames.vue'),
      ),
      MenuCasino3V2Component: defineAsyncComponent(
          () => import('../../components/menus/MenuCasino3V2.vue'),
      ),
      PromotionCardsComponent: defineAsyncComponent(
          () => import('../../components/PromotionCards.vue'),
      ),
      MenuProviders3V2Component: defineAsyncComponent(
          () => import('../../components/menus/MenuProviders3V2.vue'),
      ),
      SliderCasino5Component: defineAsyncComponent(
          () => import('../../components/CasinoSlider5.vue'),
      ),
      GamesGridV2Component: defineAsyncComponent(
          () => import('../../components/GamesGridV2.vue'),
      ),
      WidgetCarouselComponent: defineAsyncComponent(
          () => import('../../components/alternarWidgets/WTopEventCarousel.vue'),
      ),
      SliderGamesComponent: defineAsyncComponent(
          () => import('../../components/SliderGames.vue'),
      ),
      SliderGamesTopComponent: defineAsyncComponent(
          () => import('../../components/SliderGamesTop.vue'),
      ),
      Jackpots2Component: defineAsyncComponent(
          () => import('../../components/Jackpots2.vue'),
      ),
      TextIconComponent: defineAsyncComponent(
          () => import('../../components/TextIconComponents/TextWithIcon.vue'),
      ),
      Jackpots3Component: defineAsyncComponent(
          () => import('../../components/Jackpots3.vue'),
      ),
      BannerSlider9Component: defineAsyncComponent(
          () => import('../../components/BannerV9.vue'),
      ),
      BannerSlider8Component: defineAsyncComponent(
          () => import('../../components/BannerV8.vue'),
      ),
        Jackpots4Component: defineAsyncComponent(
            () => import('../../components/Jackpots4.vue')
        ),
      PromotionalCards: defineAsyncComponent(
          () => import('../../components/PromotionalCards.vue'),
      ),
      Menu6: defineAsyncComponent(
          () => import('../../components/menus/Menu6.vue'),
      ),
      Menu8Component: defineAsyncComponent(
          () => import('../../components/menus/Menu8.vue'),
      ),
      SliderCasino8Component: defineAsyncComponent(
          () => import('../../components/CasinoSlider8.vue'),
      ),
      SliderCasino9Component: defineAsyncComponent(
          () => import('../../components/CasinoSlider9.vue'),
      ),
      SliderNormalComponent: defineAsyncComponent(
          () => import('../../components/Carousel.vue'),
      ),
      InfoIconsComponent5: defineAsyncComponent(
          () => import('../../components/InfoIcons5.vue'),
      ),
      CardsIconsComponent: defineAsyncComponent(
          () => import('../../components/CardsIcons.vue'),
      ),
      BonusCardsComponent: defineAsyncComponent(
          () => import('../../components/BonusCards.vue'),
      ),
      InfoText: defineAsyncComponent(
          () => import('../../components/InfoText.vue'),
      ),
      InfoIconsComponent: defineAsyncComponent(
          () => import('../../components/InfoIcons.vue'),
      ),
      InfoIconsComponent3: defineAsyncComponent(
          () => import('../../components/InfoIcons3.vue'),
      ),
      CardsImageComponent: defineAsyncComponent(
          () => import('../../components/CardsImage.vue'),
      ),
      CardsNormalComponent: defineAsyncComponent(
          () => import('../../components/CardsNormal.vue'),
      ),
      SliderCasinoComponent: defineAsyncComponent(
          () => import('../../components/CasinoSlider.vue'),
      ),
      Carousel4Component: defineAsyncComponent(
          () => import('../../components/Carousel4.vue'),
      ),
      SliderCasino7Component: defineAsyncComponent(
          () => import('../../components/CasinoSlider7.vue'),
      ),
      WidgetCarousel2Component: defineAsyncComponent(
          () => import('../../components/alternarWidgets/WTopEventCarousel2.vue'),
      ),
      ReelsComponent: defineAsyncComponent(
          () => import('../../components/Reels.vue'),
      ),
      SeoP: defineAsyncComponent(() => import('../../components/SeoP.vue')),
      PromotionalCards2: defineAsyncComponent(
          () => import('../../components/PromotionalCards2.vue'),
      ),
	},
	data: function () {
		let showLoadMoreButton = true; // Load more button visibility
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Application component reference
		let gameId = ''; // Current game ID
		let urlpayments: any = ''; // URL for payments
		let auth_token = ''; // Authentication token
		let lng = ''; // Language setting
		let casinoLocal: boolean = true; // Flag for local casino
		let lobbyType: any = ''; // Type of lobby
		let searchCommand = {
			input: '', // Search input
		};
		let myCasinoGames: any = []; // User's favorite casino games
		let bgGame: any = {}; // Background game settings
		let preloaderShow: boolean = false; // Preloader visibility
		let showMore: boolean = false; // Flag to show more games
		let selections: any = ''; // Selected filters
		let categoryId = ''; // Current category ID
		let providerId = ''; // Current provider ID
		let providers: any = ''; // List of providers
		let categories: any = ''; // List of categories
		let gamesList: any = ''; // List of games
		let optionsGames: any = ''; // Options for games request
		let gameSelected: any = ''; // Selected game
		let showGame: boolean = false; // Flag to show game
		let limit: any = ''; // Limit for games
		let total_count: any = null; // Total count of games
		let offset: any = null; // Offset for pagination
		let openSearchv3: boolean = false; // Flag to open search
		let partnerG: any = ''; // Partner ID
		let logueado: any = ''; // Logged in status
		let routes: any = ''; // Application routes
		let user_id: any = ''; // User ID
		let urlVirtualplay: any = ''; // URL for virtual play
		let urlCasinoPlay: any = ''; // URL for casino play
		let providersLength: any = ''; // Length of providers list
		let categoriesLength: any = ''; // Length of categories list
		let urlGame: any = ''; // URL for game
		let limitConfig: any = ''; // Limit configuration
		let hideInputSearch: any = ''; // Flag to hide search input
		let showSearchCommandResults: any = ''; // Flag to show search results
		let sliders: any = ''; // Sliders configuration
		let urlbanner: any = ''; // URL for banners
		let limitBefore: any = ''; // Limit before loading more
		let country: any = ''; // Country setting
		let flag: boolean = true; // General flag
		let device: string = ''; // Device type
		let login: string = ''; // Login status
		let login2: string = ''; // Secondary login status
		let provOpen: boolean = false; // Flag to open providers
		let banners: any = []; // List of banners
		const components: any = ref([]); // Reactive components array

		// Determine device type based on app component
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Determine login status
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Determine secondary login status
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Load banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_virtual'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_virtual'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['virtuals'] != undefined &&
			config['components_']['virtuals'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['virtuals'][
				config['components_']['virtuals'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['virtuals'][
				config['components_']['virtuals'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['virtuals'][
						config['components_']['virtuals'].findIndex(
							(item) => item.id == 'Carousel3Component'
						)
					]['banners']
				)
			);
		} else {
			if (
				config != undefined &&
				config[device] != undefined &&
				config[device][appComponent.country] != undefined &&
				config[device][appComponent.country][appComponent.lngProd] !=
					undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				] != undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				]['virtuals'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['virtuals']
					)
				);
			}
		}

		// Populate components with banners
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['virtuals'] != undefined
		) {
			config['components_']['virtuals'].forEach((component: any) => {
				component.banners = banners;
				components.value.push(component);
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['virtuals'] !=
					undefined
			) {
				config['components'][appComponent.country]['virtuals'].forEach(
					(component: any) => {
						component.banners = banners;
						components.value.push(component);
					}
				);
			}
		}
		return {
			showLoadMoreButton,
			config,
			appComponent,
			gameId,
			urlpayments,
			auth_token,
			lng,
			casinoLocal,
			lobbyType,
			searchCommand,
			myCasinoGames,
			bgGame,
			preloaderShow,
			showMore,
			selections,
			categoryId,
			providerId,
			providers,
			categories,
			gamesList,
			optionsGames,
			gameSelected,
			showGame,
			limit,
			total_count,
			offset,
			openSearchv3,
			partnerG,
			logueado,
			routes,
			user_id,
			urlVirtualplay,
			urlCasinoPlay,
			providersLength,
			categoriesLength,
			urlGame,
			limitConfig,
			hideInputSearch,
			showSearchCommandResults,
			sliders,
			urlbanner,
			limitBefore,
			country,
			flag,
			device,
			login,
			provOpen,
			banners,
			components,
		};
	},
	setup() {
		const route = useRoute(); // Get the current route
		let gameId: any = ref(route.params.GameId); // Reactive reference for game ID
		let categoryId: any = ref(route.params.CategoryId); // Reactive reference for category ID
		let providerId: any = ref(route.params.ProviderId); // Reactive reference for provider ID
		return {
			gameId,
			categoryId,
			providerId,
		};
	},
	async created() {
		const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_virtual',{ useLogin: true, useScope: true });
		if (firestoreBanners?.length) {
			this.banners = firestoreBanners;
		}
	},
	mounted() {
        if (
            this.appComponent.config.layout != 3 &&
            this.appComponent.config.layout != 4 &&
            this.appComponent.config.layout != 5 &&
            this.appComponent.config.layout != 6 &&
			this.appComponent.config.layout != 7 &&
            this.appComponent.config.layout != 8
        ) {
            this.gamesList = []; // Initialize games list
            this.casinoLocal =
                this.config.casino.isLocalVirtualesLobby ??
                this.config.casino.isLocal; // Determine if the casino is local
            this.lobbyType = 1; // Set lobby type
            this.config = this.config; // Maintain current config
            this.limitConfig = this.config.casino.limit; // Set limit configuration
            this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
            this.urlCasinoPlay = this.config.urlCasinoPlay; // Set URL for casino play
            this.partnerG = this.appComponent.partnerG; // Set partner ID
            this.logueado = this.appComponent.session.logueado; // Set logged in status
            this.routes = this.config.routes; // Set application routes
            this.user_id = this.appComponent.user_id; // Set user ID
            this.auth_token = this.appComponent.tokenUser; // Set authentication token
            this.country = this.appComponent.country; // Set country
            this.auth_token = this.appComponent.tokenUser; // Set authentication token again
            this.lng = 'es'; // Set default language to Spanish
            // Determine if more games should be shown based on total count
            if (this.total_count < this.limitConfig) {
                this.showMore = false;
            } else {
                this.showMore = true;
            }
            // Hide preloader elements
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-bottom'),
                function(el, i) {
                    (
                        document.getElementsByClassName('preload-game-bottom')[
                            i
                            ] as HTMLElement
                    ).style.display = 'none';
                }
            );
            this.getCasinoGames(); // Fetch casino games
                }

				// Open game if game ID is defined
		if (this.gameId != undefined) {
			this.appComponent.openLink = true;
			this.appComponent.openGame({ id: this.gameId });
		}
	},
	methods: {
		/**
		 * Fetches casino games based on selected filters and options.
		 */
		getCasinoGames() {
			var vthis = this; // Reference to the component instance
			this.bgGame = {
				background:
					'url(' +
					this.config.casino.preloaderGame +
					')no-repeat 0 50%/cover', // Set background for preloader
			};
			this.preloaderShow = true; // Show preloader
			vthis.showMore = true; // Allow showing more games
			this.selections = {
				category: {
					id: '', // Selected category ID
				},
				provider: '', // Selected provider
			};
			// Check if no category or provider is selected
			if (
				(this.categoryId == undefined ||
					this.categoryId == '' ||
					this.categoryId == 'todos-all') &&
				(this.providerId == undefined || this.providerId == '')
			) {
				this.optionsGames = {
					action: 'getGames2', // Action to fetch games
					partner_id: this.partnerG, // Partner ID
					offset: 0, // Pagination offset
					limit: vthis.limitConfig, // Limit for games
					typelobby: 1, // Type of lobby
					country: this.appComponent.country, // Country
				};
				// Check if the app is running on mobile
				if (this.appComponent.mobile == '1') {
					this.optionsGames.isMobile = true;
				} else {
					this.optionsGames.isMobile = false;
				}
				// Make API request to fetch games
				apiService
					.requestGet(
						this.urlVirtualplay + '/cms/products/games/',
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Parse response data
						vthis.gamesList = json.games; // Set games list
						vthis.total_count = json.total_count; // Set total count
						vthis.offset = vthis.gamesList.length; // Update offset
						vthis.limit =
							vthis.gamesList.length + vthis.limitConfig; // Update limit
						this.preloaderShow = false; // Hide preloader
						// Hide preloader elements
						Array.prototype.forEach.call(
							document.getElementsByClassName('preload-game-top'),
							function (el, i) {
								(
									document.getElementsByClassName(
										'preload-game-top'
									)[i] as HTMLElement
								).style.display = 'none';
							}
						);
					});
				// Open game if gameId is defined
				if (this.gameId != undefined) {
					vthis.openGame({ id: vthis.gameId });
				}
			} else {
				// Handle cases where category or provider is selected
				if (
					this.categoryId != undefined &&
					this.categoryId != 'todos-all'
				) {
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-bottom'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-bottom'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
					vthis.selections.category.id =
						vthis.categoryId.split('-')[1]; // Set selected category ID
					this.optionsGames = {
						action: 'getGames2', // Action to fetch games
						partner_id: this.partnerG, // Partner ID
						category: this.categoryId.split('-')[1], // Selected category
						offset: 0, // Pagination offset
						limit: vthis.limitConfig, // Limit for games
						typelobby: 1, // Type of lobby
						country: this.appComponent.country, // Country
					};
					// Check if the app is running on mobile
					if (this.appComponent.mobile == '1') {
						this.optionsGames.isMobile = true;
					} else {
						this.optionsGames.isMobile = false;
					}
					// Make API request to fetch games
					apiService
						.requestGet(
							this.urlVirtualplay + '/cms/products/games/',
							this.optionsGames
						)
						.then((response: any) => {
							var json = response.data; // Parse response data
							vthis.gamesList = json.games; // Set games list
							vthis.total_count = json.total_count; // Set total count
							vthis.offset = vthis.gamesList.length; // Update offset
							vthis.limit =
								vthis.gamesList.length + vthis.limitConfig; // Update limit
						});
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
				}
				// Open game if gameId is defined and categoryId is not defined
				if (this.gameId != undefined && this.categoryId == undefined) {
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
					vthis.openGame({ id: vthis.gameId });
				}
				// Handle case where provider is selected
				if (
					this.providerId != undefined &&
					this.gameId == undefined &&
					this.categoryId == undefined
				) {
					vthis.selections.provider = vthis.providerId; // Set selected provider
					this.optionsGames = {
						action: 'getGames2', // Action to fetch games
						partner_id: this.partnerG, // Partner ID
						offset: 0, // Pagination offset
						limit: vthis.limitConfig, // Limit for games
						typelobby: 1, // Type of lobby
						country: this.appComponent.country, // Country
					};
					// Check if the app is running on mobile
					if (this.appComponent.mobile == '1') {
						this.optionsGames.isMobile = true;
					} else {
						this.optionsGames.isMobile = false;
					}
					if (this.providerId != '') {
						this.optionsGames.provider = this.providerId; // Set selected provider
					}
					// Make API request to fetch games
					apiService
						.requestGet(
							this.urlVirtualplay + '/cms/products/games/',
							this.optionsGames
						)
						.then((response: any) => {
							var json = response.data; // Parse response data
							vthis.gamesList = json.games; // Set games list
							vthis.total_count = json.total_count; // Set total count
							vthis.offset = vthis.gamesList.length; // Update offset
							vthis.limit =
								vthis.gamesList.length + vthis.limitConfig; // Update limit
						});
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
				}
			}
			// Fetch options for providers and categories
			var options = {
				action: 'getOptions', // Action to fetch options
				partner_id: this.partnerG, // Partner ID
				typelobby: 1, // Type of lobby
				country: this.appComponent.country, // Country
			};
      if (this.appComponent.session.logueado) {
        options["testUser"] = this.appComponent.session.user_test == 1 ? true : false
      }
			apiService
				.requestGet(
					this.urlVirtualplay + '/cms/products/games/',
					options
				)
				.then((response: any) => {
					var json = response.data; // Parse response data
					vthis.providers = json.providers; // Set providers list
					vthis.categories = json.categories; // Set categories list
					vthis.providersLength = json.providers.length; // Set providers length
					vthis.categoriesLength = json.categories.length; // Set categories length
				});
		},
		/**
		 * Opens a game based on the provided game object.
		 * @param game - The game object to open.
		 */
		openGame(game) {
			this.appComponent.gAnalytics('play_casino', {
				...game,
				action: 'getGames2',
			}); // Track game play action
			var vthis = this; // Reference to the component instance
			this.urlGame = ''; // Reset game URL
			this.gameSelected = game; // Set selected game
			// Check if user is logged in
			if (this.appComponent.session.logueado) {
				this.showGame = true; // Show game
				this.optionsGames = {
					gameid: game.id, // Game ID
					mode: 'real', // Game mode
					provider: game.provider, // Game provider
					lan: this.appComponent.lngProd, // Language
					partnerid: this.partnerG, // Partner ID
					token: this.auth_token, // Authentication token
					balance: 0, // User balance
					currency: this.appComponent.session.moneda, // User currency
					userid: this.appComponent.session.usuario, // User ID
					isMobile: '', // Mobile flag
				};
				// Check if the app is running on mobile
				if (this.appComponent.mobile == '1') {
					vthis.optionsGames.isMobile = true;
				} else {
					vthis.optionsGames.isMobile = false;
				}
				// Update browser history
				if (this.gameId == undefined) {
					window.history.pushState(
						'',
						'',
						'/virtuales-lobby/' + game.id
					);
				}
				// Set game content attributes after a delay
				setTimeout(function () {
					(
						document.getElementById('game-content') as HTMLElement
					).setAttribute('allowFullScreen', 'true');
					(
						document.getElementById('game-content') as HTMLElement
					).setAttribute(
						'src',
						vthis.urlCasinoPlay +
							'?gameid=' +
							vthis.optionsGames.gameid +
							'&mode=' +
							vthis.optionsGames.mode +
							'&provider=' +
							vthis.optionsGames.provider +
							'&lan=' +
							vthis.optionsGames.lan +
							'&partnerid=' +
							vthis.optionsGames.partnerid +
							'&token=' +
							vthis.optionsGames.token +
							'&balance=' +
							vthis.optionsGames.balance +
							'&currency=' +
							vthis.optionsGames.currency +
							'&userid=' +
							vthis.optionsGames.userid +
							'&isMobile=' +
							vthis.optionsGames.isMobile
					);
				}, 1000);
			} else {
				this.clickButtonLogin(); // Trigger login modal
			}
		},
		/**
		 * Handles search input and fetches games based on the input.
		 * @param event - The input event.
		 */
		searchEnter(event) {
			var vthis = this; // Reference to the component instance
			this.gamesList = []; // Reset games list
			if (this.searchCommand.input.length >= 3) {
				this.optionsGames = {
					action: 'getGames2', // Action to fetch games
					partner_id: this.partnerG, // Partner ID
					search: this.searchCommand.input, // Search input
					typelobby: 1, // Type of lobby
					country: this.appComponent.country, // Country
				};
				// Check if the app is running on mobile
				if (this.appComponent.mobile == '1') {
					this.optionsGames.isMobile = true;
				} else {
					this.optionsGames.isMobile = false;
				}
				// Make API request to fetch games
				apiService
					.requestGet(
						this.urlVirtualplay + '/cms/products/games/',
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Parse response data
						vthis.gamesList = json.games; // Set games list
						vthis.total_count = json.total_count; // Set total count
						vthis.offset = 0; // Reset offset
						vthis.limit = vthis.limit; // Maintain limit
					});
			} else {
				// Load more games if search input is empty
				if (this.searchCommand.input.length == 0) {
					this.loadMoreGames();
				}
			}
		},
		/**
		 * Checks if a game is saved in the user's favorites.
		 * @param id - The ID of the game to check.
		 * @returns True if the game is saved, otherwise false.
		 */
		isFromSaved(id) {
			if (this.myCasinoGames.length > 0) {
				for (var i = 0; i < this.myCasinoGames.length; i++) {
					if (id == this.myCasinoGames[i].id) {
						return true; // Game is saved
					}
				}
			}
			return false; // Game is not saved
		},
		/**
		 * Opens the login modal.
		 */
		clickButtonLogin() {
			this.appComponent.showModalLogin = true; // Show login modal
		},
		/**
		 * Selects a category and fetches corresponding games.
		 * @param category - The selected category object.
		 */
		selectCategory(category) {
			var vthis = this; // Reference to the component instance
			this.flag = true; // General flag
			// Hide preloader elements
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-top'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-top')[
							i
						] as HTMLElement
					).style.display = 'none';
				}
			);
			// Show preloader elements
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-bottom'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-bottom')[
							i
						] as HTMLElement
					).style.display = 'block';
				}
			);
			vthis.gamesList = []; // Reset games list
			vthis.selections.category.id = category.id; // Set selected category ID
			vthis.selections.provider = ''; // Reset selected provider
			this.optionsGames = {
				action: 'getGames2', // Action to fetch games
				partner_id: this.partnerG, // Partner ID
				offset: 0, // Pagination offset
				limit: vthis.limitConfig, // Limit for games
				typelobby: 1, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Check if the app is running on mobile
			if (this.appComponent.mobile == '1') {
				this.optionsGames.isMobile = true;
			} else {
				this.optionsGames.isMobile = false;
			}
			if (category.id != '' && category.id != 'all') {
				this.optionsGames.category = category.id; // Set selected category
			}
			if (
				this.selections.provider != '' &&
				this.selections.provider != undefined &&
				this.selections.provider != null
			) {
				this.optionsGames.provider = this.selections.provider; // Set selected provider
			}
			// Update browser history
			window.history.pushState(
				'',
				'',
				'/virtuales-lobby/categoria/' +
					category.slug +
					'-' +
					category.id
			);
			// Make API request to fetch games
			apiService
				.requestGet(
					this.urlVirtualplay + '/cms/products/games/',
					this.optionsGames
				)
				.then((response: any) => {
					var json = response.data; // Parse response data
					vthis.gamesList = json.games; // Set games list
					vthis.total_count = json.total_count; // Set total count
					vthis.offset = vthis.gamesList.length; // Update offset
					vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update limit
					vthis.noMoreGames(); // Check for no more games
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
				});
			// Determine if more games should be shown based on total count
			if (vthis.total_count < vthis.limitConfig) {
				vthis.showMore = false;
			} else {
				vthis.showMore = true;
			}
		},
		/**
		 * Loads more games based on current selections and pagination.
		 */
		loadMoreGames() {
			var vthis = this; // Reference to the component instance
			this.getPreloaderLoadmore(); // Show loading preloader
			this.preloaderShow = true; // Show preloader
			var limit = 0; // Initialize limit
			if (this.limit < this.total_count) {
				limit = this.limit; // Set limit to current limit
			} else {
				limit = this.total_count - this.limit; // Calculate remaining games
				this.showMore = false; // No more games to show
			}
			this.optionsGames = {
				action: 'getGames2', // Action to fetch games
				partner_id: this.partnerG, // Partner ID
				offset: vthis.offset, // Pagination offset
				limit: this.limit, // Limit for games
				typelobby: 1, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Check if the app is running on mobile
			if (this.appComponent.mobile == '1') {
				this.optionsGames.isMobile = true;
			} else {
				this.optionsGames.isMobile = false;
			}
			if (
				this.selections.category.id != '' &&
				this.selections.category.id != undefined &&
				this.selections.category.id != null &&
				this.selections.category.id != 'all'
			) {
				vthis.optionsGames.category = vthis.selections.category.id; // Set selected category
			}
			if (vthis.providerId != undefined || vthis.providerId != '') {
				vthis.optionsGames.provider = vthis.providerId; // Set selected provider
			}
			vthis.limitBefore = limit - vthis.limitConfig; // Calculate limit before loading more
			if (vthis.limitBefore <= 0) {
				vthis.limitBefore = vthis.limitConfig; // Reset limit before if negative
			}
			if (vthis.offset < vthis.total_count) {
				// Make API request to fetch more games
				apiService
					.requestGet(
						this.urlVirtualplay + '/cms/products/games/',
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Parse response data
						var games = json.games; // Get games from response
						games.forEach(function (value, key) {
							vthis.gamesList.push(value); // Add games to the list
						});
						vthis.offset = vthis.gamesList.length; // Update offset
						vthis.limit = limit + vthis.limitConfig; // Update limit
						// Hide preloader elements
						Array.prototype.forEach.call(
							document.getElementsByClassName(
								'preload-game-bottom'
							),
							function (el, i) {
								(
									document.getElementsByClassName(
										'preload-game-bottom'
									)[i] as HTMLElement
								).style.display = 'none';
							}
						);
					});
			} else {
				vthis.showMore = false; // No more games to show
				// Hide preloader elements
				Array.prototype.forEach.call(
					document.getElementsByClassName('preload-game-bottom'),
					function (el, i) {
						(
							document.getElementsByClassName(
								'preload-game-bottom'
							)[i] as HTMLElement
						).style.display = 'none';
					}
				);
			}
		},
		/**
		 * Selects a provider and fetches corresponding games.
		 * @param name - The name of the provider.
		 * @param img - The image of the provider.
		 * @param name2 - Alternative name for the provider.
		 */
		selectProvider(name: any, img: any, name2: any) {
			var vthis = this; // Reference to the component instance
			this.flag = true; // General flag
			// Show preloader elements
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-top'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-top')[
							i
						] as HTMLElement
					).style.display = 'block';
				}
			);
			// Hide preloader elements
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-bottom'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-bottom')[
							i
						] as HTMLElement
					).style.display = 'none';
				}
			);
			vthis.gamesList = []; // Reset games list
			vthis.selections.provider = name; // Set selected provider
			if (name2 != '') {
				vthis.selections.provider = name2; // Set alternative provider name
			}
			this.optionsGames = {
				action: 'getGames2', // Action to fetch games
				partner_id: this.partnerG, // Partner ID
				provider: '', // Provider filter
				offset: 0, // Pagination offset
				limit: vthis.limitConfig, // Limit for games
				typelobby: 1, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Check if the app is running on mobile
			if (this.appComponent.mobile == '1') {
				this.optionsGames.isMobile = true;
			} else {
				this.optionsGames.isMobile = false;
			}
			if (name != '') {
				this.optionsGames.provider = name; // Set selected provider
				this.providerId = name; // Update provider ID
			}
			// Update browser history
			window.history.pushState(
				'',
				'',
				'/virtuales-lobby/proveedor/' + name
			);
			// Make API request to fetch games
			apiService
				.requestGet(
					this.urlVirtualplay + '/cms/products/games/',
					this.optionsGames
				)
				.then((response: any) => {
					var json = response.data; // Parse response data
					vthis.gamesList = json.games; // Set games list
					vthis.total_count = json.total_count; // Set total count
					vthis.offset = vthis.gamesList.length; // Update offset
					vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update limit
					vthis.noMoreGames(); // Check for no more games
					// Hide preloader elements
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
				});
			vthis.showMore = true; // Allow showing more games
		},
		/**
		 * Checks if there are no more games to display.
		 */
		noMoreGames() {
			var vthis = this; // Reference to the component instance
			if (vthis.gamesList.length <= 0) {
				// Hide preloader elements
				Array.prototype.forEach.call(
					document.getElementsByClassName('preload-game-top'),
					function (el, i) {
						(
							document.getElementsByClassName('preload-game-top')[
								i
							] as HTMLElement
						).style.display = 'none';
					}
				);
				// Hide preloader elements
				Array.prototype.forEach.call(
					document.getElementsByClassName('preload-game-bottom'),
					function (el, i) {
						(
							document.getElementsByClassName(
								'preload-game-bottom'
							)[i] as HTMLElement
						).style.display = 'none';
					}
				);
				// Show no games text
				Array.prototype.forEach.call(
					document.getElementsByClassName('new-casino-no-games-text'),
					function (el, i) {
						(
							document.getElementsByClassName(
								'new-casino-no-games-text'
							)[i] as HTMLElement
						).style.display = 'block';
					}
				);
			} else {
				// Hide no games text
				Array.prototype.forEach.call(
					document.getElementsByClassName('new-casino-no-games-text'),
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
		/**
		 * Selects the user's favorite casino games.
		 */
		selectCategoryFav() {
			this.gamesList = this.myCasinoGames; // Set games list to favorite games
		},
		/**
		 * Opens the search interface.
		 */
		OpenSearchV3() {
			this.openSearchv3 = true; // Set flag to open search
		},
		/**
		 * Closes the search interface.
		 */
		CloseSearchV3() {
			this.openSearchv3 = false; // Set flag to close search
		},
		/**
		 * Scrolls the casino navigation left.
		 */
		leftScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scrolls the casino navigation right.
		 */
		rightScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Scrolls the providers navigation left.
		 */
		leftScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scrolls the providers navigation right.
		 */
		rightScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Toggles the visibility of the providers section.
		 */
		openProviders() {
			this.provOpen = !this.provOpen; // Toggle providers visibility
		},
		/**
		 * Placeholder for loading more games preloader.
		 */
		getPreloaderLoadmore() {},
		/**
		 * Toggles saving a game to the user's favorites.
		 * @param game - The game object to toggle.
		 */
		toggleSaveToMyCasinoGames(game) {
			if (this.myCasinoGames.length > 0) {
				var index = this.myCasinoGames
					.map((x) => {
						return x.id; // Map to game IDs
					})
					.indexOf(game.id); // Find index of the game
				if (index == -1) {
					this.myCasinoGames.push(game); // Add game to favorites
				} else {
					this.myCasinoGames.splice(index, 1); // Remove game from favorites
					if (this.myCasinoGames.length == 0) {
						this.selectCategory({ id: 'all', slug: 'todos' }); // Reset category if no favorites
					}
				}
			} else {
				this.myCasinoGames.push(game); // Add game to favorites
			}
		},
		/**
		 * Filters providers based on the selected filter.
		 * @param filter - The filter string to match.
		 * @returns The title of the filtered provider.
		 */
		selectionsProviderFilter(filter: any) {
			try {
				this.providerId = ''; // Reset provider ID
				this.providerId = this.providers.filter((provider) => {
					return provider.name == filter || provider.title == filter; // Filter providers
				})[0].name; // Set provider ID
				return this.providers.filter((provider) => {
					return provider.name == filter || provider.title == filter; // Return provider title
				})[0].title;
			} catch (e) {}
		},
		/**
		 * Placeholder for opening providers.
		 */
		openProviders2() {},
		/**
		 * Closes the currently opened game.
		 */
		closeGame() {
			this.showGame = false; // Hide game
			window.history.pushState('', '', '/virtuales-lobby'); // Reset browser history
			this.gameId = undefined; // Reset game ID
		},
	},
    computed: {
        analyticsAttrs() {
            let categoryName = 'VirtualBetsLobby'
            return {
                fullscreenToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:fullscreen`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                closeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:close`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                homeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:home`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                refreshToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:refresh`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                viewAll: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:view-all`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                arrowPrev: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:arrow-prev`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                arrowNext: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:arrow-next`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                game: (game: any) => ({
                    'data-analytics-id': `${game.id}`,
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:game`,
                    'data-analytics-position': `${this.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                    'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider|layout:${this.appComponent.config.layout}`,
                }),
                menu: (label: any) => ({
                    'data-analytics-label': `${label}`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`,
                }),
            };
        }
    },
});
</script>
<template>
	<!-- Container for dynamically rendered components when virtuales are enabled -->
	<div
		v-if="appComponent.virtualesEnabled"
		v-for="component in components"
		:key="component.id"
		:class="
			appComponent.config.layout == 6
				? 'flex flex-col justify-start items-center gap-8 lg:gap-10 h-full w-full px-4 pt-4 lg:px-10 lg:pt-10'
				: ''
		"
	>
		<!-- Render each component dynamically based on its configuration -->
		<component
			:is="component.id"
			:images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
			:data="component.data"
			:shadow="component.shadow"
			:url="component.url"
			:title="component.title"
			:category="component.category"
			:typelobby="component.typelobby"
			:limit="component.limit"
			:icon="component.icon"
			:top="component.top"
			:styleVersion="component.styleVersion"
		></component>
	</div>

	<!-- Container for the alert message when virtuales are disabled -->
	<div id="casino-wrapper-disabled" v-if="!appComponent.virtualesEnabled">
		<div class="container-alert">
			<!-- Image container for the first money image -->
			<div class="money-img">
				<img
					src="https://images.virtualsoft.tech/site/money.png"
					alt="money"
				/>
			</div>
			<!-- Message container for the alert -->
			<div class="message-alert">
				<!-- Close button for the alert -->
				<div class="close">
					<RouterLink :to="config.baseUrlFx"
						><i class="fa fa-times"></i
					></RouterLink>
				</div>
				<!-- Mobile icon in the alert message -->
				<i class="fa fa-mobile"></i>
				<!-- Alert message indicating the casino is not available -->
				<p>
					{{ $t('¡No es posible jugar desde este punto de venta! ') }}
				</p>
				<!-- Suggestion to play from a mobile device -->
				<p>
					{{ $t('Te invitamos a jugar desde su dispositivo móvil ') }}
				</p>
			</div>
			<!-- Image container for the second money image -->
			<div class="money-img-two">
				<img
					src="https://images.virtualsoft.tech/site/money-two.png"
					alt="money"
				/>
			</div>
		</div>
	</div>
	<div
		v-if="
			casinoLocal == true &&
			appComponent.config.layout != 3 &&
			appComponent.config.layout != 6 &&
			appComponent.config.layout != 7 &&
			appComponent.config.layout != 8
		"
	>
		<AppCarousel
			v-if="banners.length > 0"
			:height="'h-20 md:h-60'"
			:images="banners"
		/>
		<div
			id="casino-wrapper"
			v-if="
				appComponent.virtualesEnabled &&
				appComponent.session.wallet != '1'
			"
		>
			<div
				id="casino-content"
				v-if="
					lobbyType == 1 || lobbyType == '' || lobbyType == undefined
				"
				class="old-lobby h-full"
			>
				<div id="lobby-casino">
					<div
						v-if="config.casino.providersType == 4"
						class="providers-nav-casino closed bg-casino-providers nav-casino4"
					>
						<span
							id="menuRightProviders"
							class="button float-right relative block right-0 w-7 py-4 text-center bg-casino-providers -top-0 -right-1 rounded-l-2xl shadow-md"
						>
							<div class="dropdown dropdown-end">
								<div
									tabindex="0"
									class="p-0 normal-case btn-ghost btn btn-xs text-lg"
								>
									+
								</div>
								<div
									id="menuProviders"
									class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-neutral/90 text-neutral-content text-lg"
								>
									<ul class="p-4 menu compact">
										<li v-for="provider in providers">
											<a
												tabindex="0"
												@click="
													selectProvider(
														provider.name,
														provider.image,
														provider.title
													);
													appComponent.gAnalytics(
														'game_type',
														provider.title
													);
												"
												class="uppercase"
												>{{ provider.title }}</a
											>
										</li>
									</ul>
								</div>
							</div>
						</span>
						<ul
							class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
						>
							<li
								id="searchv3"
								v-bind:class="{ open: openSearchv3 }"
								class="inline-block align-bottom cursor-pointer"
							>
								<div class="">
									<div class="ng-pristine ng-valid">
										<div
											class="block-search"
											@click="OpenSearchV3()"
										>
											<div
												class="icon"
												@click="
													hideInputSearch =
														hideInputSearch
															? false
															: true
												"
											></div>
											<input
												v-show="openSearchv3"
												type="text"
												id="SearchGame"
												onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
												@blur="
													appComponent.placeholder =
														appComponent.ph
												"
												:placeholder="
													$t(
														'Search a casino game...'
													)
												"
												title="Buscar un juego..."
												v-model="searchCommand.input"
												@input="searchEnter($event)"
												trans=""
												class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
											/>
											<div
												class="search-results-container ng-hide"
												v-show="
													showSearchCommandResults
												"
												hide-on-click=""
												state-flag-var="showSearchCommandResults"
												broadcast-on-close="search.ResultsClosed"
												class-on-scroll="search-results-container-scroll,search-results-container"
											>
												<div
													class="search-results-inner casino"
												>
													<div
														class="arrow-sport"
													></div>
													<h3 trans="">
														{{
															$t('Search results')
														}}
													</h3>
													<div
														id="casino-result-search"
														keyboard-navigation=""
														result-id-prefix="search-result-casino-"
														select-result-by-id-func="selectCasinoGameFromSearchResults"
														results-ids="searchCommandResultGameIds"
														selected-result-id="selectedSearchCommandResultId"
														show-results-flag="showSearchCommandResults"
														class="ng-isolate-scope"
													></div>
												</div>
											</div>
										</div>
									</div>
									<div
										class="closed-popup-form"
										v-if="openSearchv3"
										@click="CloseSearchV3()"
									></div>
								</div>
							</li>
							<li
								class="providers-list inline-block mr-1 w-auto text-center"
								v-if="providersLength > 0"
								@click="
									selectProvider('', '', '');
									appComponent.gAnalytics(
										'game_type',
										'Todos los proveedores'
									);
								"
							>
								<a
									class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
									v-bind:class="{
										'blob':
											selections.provider == '',
									}"
									>{{ $t('Todos los proveedores') }}</a
								>
							</li>
							<li
								class="providers-list inline-block mr-1 text-center"
								v-if="
									providersLength > 0 &&
									selections.provider != ''
								"
								@click="selectProvider('', '', '')"
							>
								<a
									class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
									>{{
										selectionsProviderFilter(
											selections.provider
										)
									}}</a
								>
							</li>
							<li
								v-for="provider in providers"
								class="capitalize providers-list inline-block mr-1 text-center"
								@click="
									selectProvider(
										provider.name,
										provider.image,
										provider.title
									);
									appComponent.gAnalytics(
										'game_type',
										provider.title
									);
								"
								v-show="!selections.provider === provider.title"
							>
								<a
									class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
									v-bind:class="{
										'blob':
											selections.provider ===
											provider.title,
									}"
									>{{ provider.title }}</a
								>
							</li>
						</ul>
					</div>
					<div class="big-games-overflow" v-if="showGame">
						<div class="big-game-background">
							<div
								class="big-game-contain"
								class-on-scroll="scrolled,notscrolled"
								:style="{
									backgroundImage:
										'url(' + config.casino.bg + ')',
									backgroundSize: 'cover',
								}"
							>
								<div
									class="casual-game animate__animated animate__zoomIn animate__faster"
								>
									<div class="casino-game-contain">
										<div class="flash-game-contain">
											<div class="big-game-control">
												<div class="top-options">
													<div
														class="inline-block align-bottom"
														v-if="
															config.casino.inGame
																.deposit
														"
													>
														<label
															@click="
																appComponent.getPayments()
															"
															class="btn btn-primary w-full text-neutral"
															><span
																class="icon-deposit pr-3"
															></span>
															{{
																$t('Depositar')
															}}</label
														>
													</div>
													<div
														class="icon-delete refresh inline-block w-10 h-12 text-center text-xl"
														v-if="
															config.casino.inGame
																.refresh
														"
													>
														<a
															title="Refresh"
															@click="
																openGame(
																	gameSelected
																)
															"
                                                            v-bind="analyticsAttrs.refreshToggle"
														>
															<font-awesome-icon
																class="absolute bottom-3 left-2 text-white cursor-pointer"
																icon="fa-solid fa-refresh"
															/>
														</a>
													</div>
													<div
														class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
														v-if="
															config.casino.inGame
																.favorite
														"
													>
														<a
															title="Add to My Games"
															v-bind:class="{
																'favorite-active':
																	isFromSaved(
																		gameSelected.id
																	),
															}"
															@click="
																toggleSaveToMyCasinoGames(
																	gameSelected
																)
															"
															><span
																class="icon-star text-neutral"
															></span
														></a>
													</div>
													<div
														class="icon-delete home inline-block w-10 h-12 text-center text-lg"
														v-if="
															config.casino.inGame
																.home
														"
													>
														<a
															title="home"
															@click="closeGame()"
                                                            v-bind="analyticsAttrs.homeToggle"
															><span
																class="icon-home1 text-neutral"
															></span
														></a>
													</div>
												</div>
												<div class="icon-delete">
													<a
														title="close"
														@click="closeGame()"
                                                        v-bind="analyticsAttrs.closeToggle"
													>
														<animatedCloseIcon
															:fill="'white'"
															:width="20"
															:height="20"
															class="absolute bottom-3 left-2 text-white cursor-pointer"
															@click="
																CloseSearchV3()
															"
														></animatedCloseIcon>
													</a>
												</div>
												<div class="div-logo-j">
													<img :src="config.logo" />
												</div>
											</div>
											<iframe
												id="game-content"
												frame-control=""
												number-of-window="1"
												initial-width=""
												initial-height=""
												element-id=""
												aspect-ratio="16:9"
												ng-src=""
												src=""
                                                allow="clipboard-read; clipboard-write"
											>
											</iframe>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="all-casino-games-box"
						v-bind:class="{
							style4:
								config.casino.providersType == 4 &&
								appComponent.mobile !== 1,
						}"
					>
						<div class="fixed-element-parent">
							<div
								class="fixed-nav-wrapper-casino-view"
								id="main-header-container"
							>
								<div class="search-category-nav-contain">
									<div class="left-column-casino-nav">
										<span
											id="menuLeft"
											class="button"
											@click="leftScroll()"
											>&lt;</span
										>
										<span
											id="menuRight"
											class="button"
											@click="rightScroll()"
											>&gt;</span
										>
										<ul>
											<svg
												style="
													width: 0;
													height: 0;
													position: absolute;
												"
												aria-hidden="true"
												focusable="false"
											>
												<linearGradient
													id="SVGID_hot"
													x1="17.201"
													x2="17.201"
													y1="36.861"
													y2="-.025"
													gradientUnits="userSpaceOnUse"
												>
													<stop
														offset="0"
														stop-color="#B12509"
													></stop>
													<stop
														offset=".468"
														stop-color="#FF582C"
													></stop>
													<stop
														offset=".507"
														stop-color="#FC8D15"
													></stop>
													<stop
														offset=".547"
														stop-color="#FF8A09"
													></stop>
													<stop
														offset="1"
														stop-color="#FF7309"
													></stop>
												</linearGradient>
												<linearGradient
													id="SVGID_slots2"
													x1="585.97"
													x2="585.97"
													y1="-696.746"
													y2="-667.894"
													gradientUnits="userSpaceOnUse"
													gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
												>
													<stop
														offset="0"
														stop-color="#FF9220"
													></stop>
													<stop
														offset=".389"
														stop-color="#FFA82C"
													></stop>
													<stop
														offset=".443"
														stop-color="#FCCB8E"
													></stop>
													<stop
														offset=".493"
														stop-color="#FFD38A"
													></stop>
													<stop
														offset="1"
														stop-color="#FFCC63"
													></stop>
												</linearGradient>
												<linearGradient
													id="SVGID_slots3"
													x1="585.97"
													x2="585.97"
													y1="-696.746"
													y2="-667.894"
													gradientUnits="userSpaceOnUse"
													gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
												>
													<stop
														offset="0"
														stop-color="#FF9220"
													></stop>
													<stop
														offset=".389"
														stop-color="#FFA82C"
													></stop>
													<stop
														offset=".443"
														stop-color="#FCCB8E"
													></stop>
													<stop
														offset=".493"
														stop-color="#FFD38A"
													></stop>
													<stop
														offset="1"
														stop-color="#FFCC63"
													></stop>
												</linearGradient>
											</svg>
											<li
												v-if="
													myCasinoGames.length > 0 &&
													categoriesLength > 0 &&
													!openSearchv3
												"
												v-bind:class="{
													active:
														selections.category
															.id === '0',
												}"
												:class="
													appComponent.config
														.layout != undefined &&
													appComponent.config
														.layout == 7
														? 'bg-neutral-content mx-4 p-5 w-[30%] md:w-[10%] rounded-2xl '
														: ''
												"
												class="category-list"
												@click="selectCategoryFav()"
											>
												<div class="category-icon">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														xmlns:xlink="http://www.w3.org/1999/xlink"
														width="45px"
														height="45px"
														viewBox="0 0 115 115"
														version="1.1"
													>
														<defs>
															<linearGradient
																id="SVGID_slots"
																x1="585.97"
																x2="585.97"
																y1="-696.746"
																y2="-667.894"
																gradientUnits="userSpaceOnUse"
																gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
															>
																<stop
																	offset="0"
																	stop-color="#FF9220"
																></stop>
																<stop
																	offset=".389"
																	stop-color="#FFA82C"
																></stop>
																<stop
																	offset=".443"
																	stop-color="#FCCB8E"
																></stop>
																<stop
																	offset=".493"
																	stop-color="#FFD38A"
																></stop>
																<stop
																	offset="1"
																	stop-color="#FFCC63"
																></stop>
															</linearGradient>
														</defs>
														<g
															id="favoritos"
															stroke="none"
															stroke-width="1"
															fill="none"
															fill-rule="evenodd"
														>
															<path
																d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
																id="Shape"
																stroke="#787f90"
																stroke-width="4"
															></path>
														</g>
													</svg>
												</div>
												<div class="text-neutral">{{ $t('Favoritos') }}</div>
											</li>
											<ng-container>
												<li
													v-for="category in categories"
													class="category-list"
													v-bind:class="[
														{
															active:
																selections
																	.category
																	.id ===
																category.id,
														},
														category.title,
													]"
													:class="
														appComponent.config
															.layout !=
															undefined &&
														appComponent.config
															.layout == 7
															? 'bg-neutral-content mx-4 p-5 w-[30%] md:w-[10%] rounded-2xl '
															: ''
													"
													@click="
														selectCategory(
															category
														);
														appComponent.gAnalytics(
															'category',
															category.title
														);
													"
												>
													<div
														class="category-icon"
														v-html="category.icon"
													></div>
													<div class="category-title text-neutral">
														{{ $t(category.title) }}
													</div>
												</li>
											</ng-container>
											<li
												v-bind:class="{
													active:
														selections.category
															.id === 'all',
												}"
												:class="
													appComponent.config
														.layout != undefined &&
													appComponent.config
														.layout == 7
														? 'bg-neutral-content mx-4 p-5 w-[35%] md:w-[10%] rounded-2xl '
														: ''
												"
												@click="
													selectCategory({
														id: 'all',
														slug: 'todos',
													});
													appComponent.gAnalytics(
														'category',
														'Todos los juegos'
													);
												"
												class="category-list all-games"
												v-if="categoriesLength > 0"
											>
												<div class="category-icon">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														xmlns:xlink="http://www.w3.org/1999/xlink"
														width="45px"
														height="45px"
														viewBox="0 0 115 115"
														version="1.1"
													>
														<defs>
															<linearGradient
																id="SVGID_slots2"
																x1="585.97"
																x2="585.97"
																y1="-696.746"
																y2="-667.894"
																gradientUnits="userSpaceOnUse"
																gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
															>
																<stop
																	offset="0"
																	stop-color="#905cc9"
																></stop>
																<stop
																	offset=".389"
																	stop-color="#905cc9"
																></stop>
																<stop
																	offset=".443"
																	stop-color="#905cc9"
																></stop>
																<stop
																	offset=".493"
																	stop-color="#905cc9"
																></stop>
																<stop
																	offset="1"
																	stop-color="#905cc9"
																></stop>
															</linearGradient>
														</defs>
														<g
															id="todos"
															stroke="none"
															stroke-width="1"
															fill="none"
															fill-rule="evenodd"
														>
															<path
																d="M97.946,76.396 C94.598,76.396 91.884,73.665 91.884,70.297 C91.884,66.929 94.598,64.198 97.946,64.198 C101.294,64.198 104.008,66.929 104.008,70.297 C104.008,73.665 101.294,76.396 97.946,76.396 Z M97.946,51.796 C94.598,51.796 91.884,49.066 91.884,45.698 C91.884,42.329 94.598,39.599 97.946,39.599 C101.294,39.599 104.008,42.329 104.008,45.698 C104.008,49.066 101.294,51.796 97.946,51.796 Z M97.946,27.197 C94.598,27.197 91.884,24.466 91.884,21.098 C91.884,17.73 94.598,15 97.946,15 C101.294,15 104.008,17.73 104.008,21.098 C104.008,24.466 101.294,27.197 97.946,27.197 Z M11,88.798 L81.963,88.798 L81.963,100.995 L11,100.995 L11,88.798 Z M11,64.198 L81.963,64.198 L81.963,76.396 L11,76.396 L11,64.198 Z M11,39.599 L81.963,39.599 L81.963,51.796 L11,51.796 L11,39.599 Z M11,15 L81.963,15 L81.963,27.197 L11,27.197 L11,15 Z M97.946,88.798 C101.294,88.798 104.008,91.528 104.008,94.896 C104.008,98.264 101.294,100.995 97.946,100.995 C94.598,100.995 91.884,98.264 91.884,94.896 C91.884,91.528 94.598,88.798 97.946,88.798 Z"
																id="Shape"
																stroke="url(#SVGID_slots2)"
																stroke-width="3"
															></path>
														</g>
													</svg>
												</div>
												<div class="text-neutral">
													{{ $t('Todos los juegos') }}
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div
									v-if="config.casino.providersType == 1"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										id="menuRightProviders"
										class="button float-right relative block right-0 w-7 py-6 text-center bg-casino-providers -top-3 -right-1 rounded-l-3xl shadow-md"
									>
										<div class="dropdown dropdown-end">
											<div
												tabindex="0"
												class="p-0 normal-case btn-ghost btn btn-xs text-lg"
											>
												+
											</div>
											<div
												id="menuProviders"
												class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-neutral/90 text-neutral-content text-lg"
											>
												<ul class="p-4 menu compact">
													<li
														v-for="provider in providers"
													>
														<a
															tabindex="0"
															@click="
																selectProvider(
																	provider.name,
																	provider.image,
																	provider.title
																);
																appComponent.gAnalytics(
																	'game_type',
																	provider.title
																);
															"
															class="uppercase"
															>{{
																provider.title
															}}</a
														>
													</li>
												</ul>
											</div>
										</div>
									</span>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom cursor-pointer"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<searchIcon
															:fill="'#a7a7a7'"
															:width="15"
															:height="15"
															class="absolute top-3 left-3"
														></searchIcon>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												>
													<IconClose
														:fill="'#a7a7a7'"
														class="text-xl top-0 -left-4 text-gray-400 cursor-pointer"
														@click="CloseSearchV3()"
													></IconClose>
												</div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto text-center"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											class="providers-list inline-block mr-1 text-center"
											v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
											@click="selectProvider('', '', '')"
										>
											<a
												class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
												>{{
													selectionsProviderFilter(
														selections.provider
													)
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="capitalize providers-list inline-block mr-1 text-center"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
											v-show="
												!selections.provider ===
												provider.title
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
												v-bind:class="{
													'blob hidden':
														selections.provider ===
														provider.title,
												}"
												>{{ provider.title }}</a
											>
										</li>
									</ul>
								</div>
								<div
									v-if="config.casino.providersType == 2"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										id="menuRightProviders"
										class="button float-right block right-0 w-7 py-6 text-center bg-casino-providers -mt-3 -right-1 rounded-l-3xl shadow-md absolute"
										style="z-index: 9"
									>
										<div class="dropdown dropdown-end">
											<div
												tabindex="0"
												@click="openProviders()"
												class="p-0 normal-case btn-ghost btn btn-xs text-lg btn-prov"
											>
												<span v-if="provOpen"> - </span>
												<span v-if="!provOpen">
													+
												</span>
											</div>
										</div>
									</span>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom cursor-pointer"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												></div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto text-center"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											class="providers-list inline-block mr-1 text-center"
											v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
											@click="selectProvider('', '', '')"
										>
											<a
												class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
												>{{
													selectionsProviderFilter(
														selections.provider
													)
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="capitalize providers-list inline-block mr-1 text-center"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
											v-show="
												!selections.provider ===
												provider.name
											"
										>
											<a
												class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
												v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ===
														provider.name,
												}"
												><img
													class="img-prov"
													:src="provider.image"
													alt=""
											/></a>
										</li>
									</ul>
									<div
										class="overflow-y-auto shadow-2xl top-px h-auto w-full rounded-b-box text-neutral-content text-lg dropdown-content prov"
									>
										<ul
											class="left-column-casino-providers-nav mx-5 py-2 overflow-auto sm:overflow-hidden grid grid-cols-10 gap-2"
										>
											<li
												v-for="provider in providers"
												class="capitalize providers-list2 inline-block mr-1 text-center"
											>
												<a
													tabindex="0"
													@click="
														selectProvider(
															provider.name,
															provider.image,
															provider.title
														);
														openProviders();
													"
													class="rounded-3xl bg-base-300 font-bold py-2 px-5 block hover:blob h-10"
													><img
														class="img-prov"
														:src="provider.image"
														alt=""
												/></a>
											</li>
										</ul>
									</div>
								</div>
								<div
									v-if="config.casino.providersType == 3"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										id="menuLeftProviders"
										class="cursor-pointer button float-left relative block left-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -left-1 rounded-r-3xl shadow-md"
										@click="leftScrollProviders()"
										>&lt;</span
									>
									<span
										id="menuRightProviders"
										class="cursor-pointer button float-right relative block right-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -right-1 rounded-l-3xl shadow-md"
										@click="rightScrollProviders()"
										>&gt;</span
									>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-x-scroll bg-base-300"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom w-auto"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder,appComponent.placeholder = ''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												></div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="providers-list inline-block mr-1 w-auto"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob"
												v-bind:class="{
													'blob':
														selections.provider ===
															provider.name ||
														selections.provider ===
															provider.title,
												}"
												>{{ provider.title }}</a
											>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="wrapper-separator-games bg-base-content" id="games-casino-list">
						<div class="all-games-casino-list">
							<div class="all-casino-games-list-box">
								<div>
									<ul class="masonry">
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
                                            v-for="game in gamesList"
                                            class="in relative rounded-xl overflow-hidden inline-block hover:scale-105 animate__animated animate__zoomIn animate__faster"
                                            :class="' col-span-' + game.grid_column + ' row-span-' + game.grid_row"
                                        >
                                            <div class="relative w-full h-full">
                                                <div class="z-[99] absolute w-10 h-10 top-0 right-0">
                                                    <!-- Favorite button for each game -->
                                                    <button
                                                        class="absolute w-10 h-10 top-0 right-0"
                                                        @click="
                                                            $event.stopPropagation;
                                                            toggleSaveToMyCasinoGames(game);
                                                        "
                                                    >
                                                        <favoriteIcon
                                            v-if="
                                                appComponent.config.activeFavoritesWithBackend != undefined &&
                                                appComponent.config.activeFavoritesWithBackend == true
                                            "
                                            class="favorite-icon-view"
                                            :width="24"
                                            :height="16"
                                            :fill="game.fav != undefined && game.fav ? '#00d30a' : '#88be86'"
                                        ></favoriteIcon>
                                        <favoriteIcon
                                            v-else-if="
                                                appComponent.config.activeFavoritesWithBackend == undefined ||
                                                appComponent.config.activeFavoritesWithBackend == false
                                            "
                                            class="favorite-icon-view"
                                            :width="24"
                                            :height="16"
                                            :fill="isFromSaved(game.id) ? '#00d30a' : '#88be86'"
                                        ></favoriteIcon>
                                                    </button>
                                                </div>
                                                <!-- Jackpot indicator for Playtech games -->
                                                <span
                                                    class="playtech-jackpot absolute bg-gray-500/80 saturate-150 z-40 text-center text-sm md:text-[12px] bottom-0 font-bold"
                                                    v-if="game.provider == 'PLAYTECH'"
                                                    :id="'playtech-' + game.id"
                                                ></span>
                                                <!-- Button to play the game -->
                                                <button
                                                    @click="
                                                        appComponent.gamesList.idSelect = game.id;
                                                        appComponent.openLink = true;
                                                        appComponent.openGame(game);
                                                        $event.stopPropagation();
                                                        appComponent.gAnalytics('play_casino', {
                                                            ...game,
                                                            action: 'getGames2',
                                                        });
                                                    "
                                                    :aria-label="game.name"
                                                    class="flex justify-start items-start"
                                                    v-bind="analyticsAttrs.game(game)"
                                                >
                                                    <img
                                                        v-show="
                                                            game.icon_2 != undefined &&
                                                            game.icon_2 != null &&
                                                            game.icon_2 != ''
                                                        "
                                                        :src="game.icon_2"
                                                        alt=""
                                                        :class="
                                                            'absolute w-full h-full z-20 hover:z-10' +
                                                            ' object-' +
                                                            game.object_fit
                                                        "
                                                    />
                                                    <div
                                                        class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 absolute flex flex-col justify-center items-center gap-4 w-full h-full p-1 break-all"
                                                    >
                                                        <h3
                                                            class="w-[80%] text-neutral font-bold flex justify-center items-center break-words text-base capitalize whitespace-pre-wrap"
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
                                                    <!-- Tag image for the game -->
                                                    <img
                                                        v-if="
                                                            game.TagImage != undefined &&
                                                            game.TagImage != null &&
                                                            game.TagImage != ''
                                                        "
                                                        :src="game.TagImage"
                                                        width="60"
                                                        height="60"
                                                        :class="[
                                                            'absolute left-0 top-0',
                                                            'text-black text-sm font-bold',
                                                            'pb-[1px] z-30  w-[60px] h-[60px]',
                                                            'object-contain flex justify-center',
                                                            'items-center',
                                                        ]"
                                                        alt="Etiqueta"
                                                    />
                                                    <!-- Tag text for the game -->
                                                    <span
                                                        v-else-if="
                                                            game.TagText != undefined &&
                                                            game.TagText != null &&
                                                            game.TagText != ''
                                                        "
                                                        :class="[
                                                            'absolute left-0 top-0 m-1 text-black',
                                                            'text-sm font-bold pb-[1px] z-30',
                                                            'w-auto h-auto flex justify-center items-center',
                                                            'max-w-2xl overflow-hidden',
                                                        ]"
                                                        v-html="game.TagText"
                                                    ></span>
                                                </button>
                                            </div>
                                        </li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
									</ul>
								</div>
							</div>
							<div 
							v-if="!showLoadMoreButton && gamesList.length == 0"
							class="new-casino-no-games-text text-neutral">
								<p>{{ $t('No se encontraron juegos') }}</p>
							</div>
							<div
								class="more-casino-games-load-b"
								v-show="showMore"
							>
								<p
								v-if="showLoadMoreButton"
									load-more=""
									id="loadMoreGames"
									@click="loadMoreGames()"
									class="ng-isolate-scope"
                                v-bind="analyticsAttrs.viewAll"
								>
									<span>{{ $t('Cargar mas') }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id="casino-content "
				class="new-lobby h-full"
				v-if="lobbyType == 2"
			>
				<div id="lobby-casino bg-neutral/90">
					<div class="carousel w-full relative">
						<div class="carousel-inner w-full relative">
							<div v-for="value in sliders">
								<input
									class="carousel-open"
									type="radio"
									id="carousel-{{value.order}}"
									name="carousel"
									aria-hidden="true"
									hidden
								/>
								<div
									class="carousel-item absolute opacity-0 transition-opacity duration-700"
								>
									<img
										class="w-full block"
										:src="value.url"
										:alt="value.title"
									/>
								</div>
							</div>
							<ol class="carousel-indicators">
								<li
									v-for="value in sliders"
									class="inline-block my-0 mx-2"
								>
									<label
										for="carousel-{{value.order}}"
										class="carousel-bullet block cursor-pointer"
										>.</label
									>
								</li>
							</ol>
						</div>
					</div>
					<div
						class="big-games-overflow fixed top-0 w-full h-full z-20"
						v-if="showGame"
						style="z-index: 9999"
					>
						<div class="big-game-background w-full h-full">
							<div
								class="big-game-contain w-full h-full"
								class-on-scroll="scrolled,notscrolled"
							>
								<div
									class="casual-game animate__animated animate__zoomIn animate__faster table m-auto"
								>
									<div
										class="casino-game-contain w-full table-cell text-center"
									>
										<div
											class="flash-game-contain text-center relative inline-block m-2 align-top"
										>
											<div
												class="big-game-control absolute inline-block text-right w-full right-0 float-right bg-black h-14"
											>
												<div
													class="top-options inline-block"
												>
													<div
														class="inline-block align-bottom"
														v-if="
															config.casino.inGame
																.deposit
														"
													>
														<label
															class="btn btn-primary w-full text-neutral"
															@click="
																appComponent.getPayments()
															"
															><span
																class="icon-deposit pr-3"
															></span>
															{{
																$t('Depositar')
															}}</label
														>
													</div>
													<div
														class="icon-delete fixed right-0 top-0 w-12 h-10 text-center"
													>
														<a
															title="close"
															@click="closeGame()"
                                                            v-bind="analyticsAttrs.closeToggle"
															class="text-xl block my-3 relative text-center"
															><span
																class="icon-close"
															></span
														></a>
													</div>
													<div
														class="icon-delete refresh inline-block w-10 h-12 text-center text-lg"
														v-if="
															config.casino.inGame
																.refresh
														"
													>
														<a
															title="Refresh"
															@click="
																openGame(
																	gameSelected
																)
															"
                                                            v-bind="analyticsAttrs.refreshToggle"
															><span
																class="icon-refresh text-neutral"
															></span
														></a>
													</div>
													<div
														class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
														v-if="
															config.casino.inGame
																.favorite
														"
													>
														<a
															title="Add to My Games"
															v-bind:class="{
																'favorite-active':
																	isFromSaved(
																		gameSelected.id
																	),
															}"
															@click="
																toggleSaveToMyCasinoGames(
																	gameSelected
																)
															"
															><span
																class="icon-star text-neutral"
															></span
														></a>
													</div>
													<div
														class="icon-delete home inline-block w-10 h-12 text-center text-lg"
														v-if="
															config.casino.inGame
																.home
														"
													>
														<a
															title="home"
															@click="closeGame()"
                                                            v-bind="analyticsAttrs.homeToggle"
															><span
																class="icon-home1 text-neutral"
															></span
														></a>
													</div>
												</div>
												<div
													class="div-logo-j float-left h-14"
												>
													<img
														:src="config.logo"
														class="h-full py-3 px-7"
													/>
												</div>
											</div>
											<iframe
												id="game-content"
												frame-control=""
												number-of-window="1"
												initial-width=""
												initial-height=""
												element-id=""
												aspect-ratio="16:9"
												ng-src=""
												src=""
												class="relative mt-14 bg-black inline-block"
												style="
													width: 90vw;
													height: 90vh;
												"
                                                allow="clipboard-read; clipboard-write"
											>
											</iframe>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="all-casino-games-box">
						<div class="fixed-element-parent">
							<div
								class="fixed-nav-wrapper-casino-view bg-neutral"
								id="main-header-container"
							>
								<div class="search-category-nav-contain">
									<div
										class="left-column-casino-nav text-center"
									>
										<ul
											class="px-3 py-4 pt-8 whitespace-nowrap overflow-auto"
										>
											<li
												v-if="
													myCasinoGames.length > 0 &&
													categoriesLength > 0 &&
													!openSearchv3
												"
												v-bind:class="{
													active:
														selections.category
															.id === '0',
												}"
												class="category-list inline-block"
												@click="selectCategoryFav()"
											>
												<div class="category-icon">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														xmlns:xlink="http://www.w3.org/1999/xlink"
														width="45px"
														height="45px"
														viewBox="0 0 115 115"
														version="1.1"
													>
														<defs>
															<linearGradient
																id="SVGID_slots"
																x1="585.97"
																x2="585.97"
																y1="-696.746"
																y2="-667.894"
																gradientUnits="userSpaceOnUse"
																gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
															>
																<stop
																	offset="0"
																	stop-color="#FF9220"
																></stop>
																<stop
																	offset=".389"
																	stop-color="#FFA82C"
																></stop>
																<stop
																	offset=".443"
																	stop-color="#FCCB8E"
																></stop>
																<stop
																	offset=".493"
																	stop-color="#FFD38A"
																></stop>
																<stop
																	offset="1"
																	stop-color="#FFCC63"
																></stop>
															</linearGradient>
														</defs>
														<g
															id="favoritos"
															stroke="none"
															stroke-width="1"
															fill="none"
															fill-rule="evenodd"
														>
															<path
																d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
																id="Shape"
																stroke="#787f90"
																stroke-width="4"
															></path>
														</g>
													</svg>
												</div>
												<div class="text-neutral">{{ $t('Favoritos') }}</div>
											</li>
											<ng-container>
												<li
													v-for="category in categories"
													class="category-list inline-block px-6 cursor-pointer"
													v-bind:class="[
														{
															active:
																selections
																	.category
																	.id ===
																category.id,
														},
														category.title,
													]"
													@click="
														selectCategory(category)
													"
												>
													<div
														class="category-icon bg-gradient-to-r from-primary-content to-neutral-content rounded-lg p-2 w-16 h-16 m-auto"
														v-html="category.icon"
														v-bind:class="{
															'blob-cat':
																selections
																	.category
																	.id ===
																category.id,
														}"
													></div>
													<div
														class="category-title text-neutral font-bold"
													>
														{{ $t(category.title) }}
													</div>
												</li>
											</ng-container>
											<li
												v-bind:class="{
													active:
														selections.category
															.id === 'all',
												}"
												@click="
													selectCategory({
														id: 'all',
														slug: 'todos',
													})
												"
												class="category-list all-games inline-block cursor-pointer"
												v-if="categoriesLength > 0"
											>
												<div class="category-icon">
													<svg
														class="m-auto w-16 h-16"
														xmlns="http://www.w3.org/2000/svg"
														xmlns:xlink="http://www.w3.org/1999/xlink"
														width="45px"
														height="45px"
														viewBox="0 0 115 115"
														version="1.1"
													>
														<defs>
															<linearGradient
																id="SVGID_slots2"
																x1="585.97"
																x2="585.97"
																y1="-696.746"
																y2="-667.894"
																gradientUnits="userSpaceOnUse"
																gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)"
															>
																<stop
																	offset="0"
																	stop-color="black"
																></stop>
																<stop
																	offset=".389"
																	stop-color="black"
																></stop>
																<stop
																	offset=".443"
																	stop-color="black"
																></stop>
																<stop
																	offset=".493"
																	stop-color="black"
																></stop>
																<stop
																	offset="1"
																	stop-color="black"
																></stop>
															</linearGradient>
														</defs>
														<g
															id="todos"
															stroke="none"
															stroke-width="1"
															fill="none"
															fill-rule="evenodd"
														>
															<path
																d="M97.946,76.396 C94.598,76.396 91.884,73.665 91.884,70.297 C91.884,66.929 94.598,64.198 97.946,64.198 C101.294,64.198 104.008,66.929 104.008,70.297 C104.008,73.665 101.294,76.396 97.946,76.396 Z M97.946,51.796 C94.598,51.796 91.884,49.066 91.884,45.698 C91.884,42.329 94.598,39.599 97.946,39.599 C101.294,39.599 104.008,42.329 104.008,45.698 C104.008,49.066 101.294,51.796 97.946,51.796 Z M97.946,27.197 C94.598,27.197 91.884,24.466 91.884,21.098 C91.884,17.73 94.598,15 97.946,15 C101.294,15 104.008,17.73 104.008,21.098 C104.008,24.466 101.294,27.197 97.946,27.197 Z M11,88.798 L81.963,88.798 L81.963,100.995 L11,100.995 L11,88.798 Z M11,64.198 L81.963,64.198 L81.963,76.396 L11,76.396 L11,64.198 Z M11,39.599 L81.963,39.599 L81.963,51.796 L11,51.796 L11,39.599 Z M11,15 L81.963,15 L81.963,27.197 L11,27.197 L11,15 Z M97.946,88.798 C101.294,88.798 104.008,91.528 104.008,94.896 C104.008,98.264 101.294,100.995 97.946,100.995 C94.598,100.995 91.884,98.264 91.884,94.896 C91.884,91.528 94.598,88.798 97.946,88.798 Z"
																id="Shape"
																stroke="url(#SVGID_slots2)"
																stroke-width="3"
															></path>
														</g>
													</svg>
												</div>
												<div
													class="text-neutral"
												>
													{{ $t('Todos los juegos') }}
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div
									v-if="config.casino.providersType == 1"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										class="button float-right relative block right-0 w-7 py-6 text-center bg-casino-providers -top-3 -right-1 rounded-l-3xl shadow-md"
									>
										<div class="dropdown dropdown-end">
											<div
												tabindex="0"
												class="p-0 normal-case btn-ghost btn btn-xs text-lg"
											>
												+
											</div>
											<div
												class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-neutral/90 text-neutral-content text-lg"
											>
												<ul class="p-4 menu compact">
													<li
														v-for="provider in providers"
													>
														<a
															tabindex="0"
															@click="
																selectProvider(
																	provider.name,
																	provider.image,
																	provider.title
																);
																appComponent.gAnalytics(
																	'game_type',
																	provider.title
																);
															"
															class="uppercase text-left"
															>{{
																provider.title
															}}</a
														>
													</li>
												</ul>
											</div>
										</div>
									</span>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom cursor-pointer"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												></div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto text-center"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											class="providers-list inline-block mr-1 text-center"
											v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
											@click="selectProvider('', '', '')"
										>
											<a
												class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
												>{{
													selectionsProviderFilter(
														selections.provider
													)
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="capitalize providers-list inline-block mr-1 text-center"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
											v-show="
												!selections.provider ===
												provider.name
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
												v-bind:class="{
													'blob':
														selections.provider ===
														provider.name,
												}"
												>{{ provider.title }}</a
											>
										</li>
									</ul>
								</div>
								<div
									v-if="config.casino.providersType == 3"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										id="menuLeftProviders"
										class="cursor-pointer button float-left relative block left-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -left-1 rounded-r-3xl shadow-md"
										@click="leftScrollProviders()"
										>&lt;</span
									>
									<span
										id="menuRightProviders"
										class="cursor-pointer button float-right relative block right-0 w-7 py-6 text-center text-neutral bg-base-100 -top-2 -right-1 rounded-l-3xl shadow-md"
										@click="rightScrollProviders()"
										>&gt;</span
									>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-x-scroll bg-base-300"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom w-auto"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												></div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="providers-list inline-block mr-1 w-auto"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob"
												v-bind:class="{
													'blob':
														selections.provider ===
														provider.name,
												}"
												>{{ provider.title }}</a
											>
										</li>
									</ul>
								</div>
								<div
									v-if="config.casino.providersType == 2"
									class="providers-nav-casino closed bg-casino-providers bg-base-300"
								>
									<span
										id="menuRightProviders"
										class="button float-right block right-0 w-7 py-6 text-center bg-casino-providers -mt-3 -right-1 rounded-l-3xl shadow-md absolute"
										style="z-index: 9"
									>
										<div class="dropdown dropdown-end">
											<div
												tabindex="0"
												@click="openProviders()"
												class="p-0 normal-case btn-ghost btn btn-xs text-lg btn-prov"
											>
												<span v-if="provOpen"> - </span>
												<span v-if="!provOpen">
													+
												</span>
											</div>
										</div>
									</span>
									<ul
										class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
									>
										<li
											id="searchv3"
											v-bind:class="{
												open: openSearchv3,
											}"
											class="inline-block align-bottom cursor-pointer"
										>
											<div class="">
												<div
													class="ng-pristine ng-valid"
												>
													<div
														class="block-search"
														@click="OpenSearchV3()"
													>
														<div
															class="icon"
															@click="
																hideInputSearch =
																	hideInputSearch
																		? false
																		: true
															"
														></div>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame"
															onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
															@blur="
																appComponent.placeholder =
																	appComponent.ph
															"
															:placeholder="
																$t(
																	'Search a casino game...'
																)
															"
															title="Buscar un juego..."
															v-model="
																searchCommand.input
															"
															@input="
																searchEnter(
																	$event
																)
															"
															trans=""
															class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
														/>
														<div
															class="search-results-container ng-hide"
															v-show="
																showSearchCommandResults
															"
															hide-on-click=""
															state-flag-var="showSearchCommandResults"
															broadcast-on-close="search.ResultsClosed"
															class-on-scroll="search-results-container-scroll,search-results-container"
														>
															<div
																class="search-results-inner casino"
															>
																<div
																	class="arrow-sport"
																></div>
																<h3 trans="">
																	{{
																		$t(
																			'Search results'
																		)
																	}}
																</h3>
																<div
																	id="casino-result-search"
																	keyboard-navigation=""
																	result-id-prefix="search-result-casino-"
																	select-result-by-id-func="selectCasinoGameFromSearchResults"
																	results-ids="searchCommandResultGameIds"
																	selected-result-id="selectedSearchCommandResultId"
																	show-results-flag="showSearchCommandResults"
																	class="ng-isolate-scope"
																></div>
															</div>
														</div>
													</div>
												</div>
												<div
													class="closed-popup-form"
													v-if="openSearchv3"
													@click="CloseSearchV3()"
												></div>
											</div>
										</li>
										<li
											class="providers-list inline-block mr-1 w-auto text-center"
											v-if="providersLength > 0"
											@click="
												selectProvider('', '', '');
												appComponent.gAnalytics(
													'game_type',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-primary text-neutral hover:bg-primary-focus font-bold py-2 px-7 block"
												v-bind:class="{
													'blob':
														selections.provider ==
														'',
												}"
												>{{
													$t('Todos los proveedores')
												}}</a
											>
										</li>
										<li
											class="providers-list inline-block mr-1 text-center"
											v-if="
												providersLength > 0 &&
												selections.provider != ''
											"
											@click="selectProvider('', '', '')"
										>
											<a
												class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
												>{{
													selectionsProviderFilter(
														selections.provider
													)
												}}</a
											>
										</li>
										<li
											v-for="provider in providers"
											class="capitalize providers-list inline-block mr-1 text-center"
											@click="
												selectProvider(
													provider.name,
													provider.image,
													provider.title
												);
												appComponent.gAnalytics(
													'game_type',
													provider.title
												);
											"
											v-show="
												!selections.provider ===
												provider.name
											"
										>
											<a
												class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
												v-bind:class="{
													'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
														selections.provider ===
														provider.name,
												}"
												><img
													class="img-prov"
													:src="provider.image"
													alt=""
											/></a>
										</li>
									</ul>
									<div
										class="overflow-y-auto shadow-2xl top-px h-auto w-full rounded-b-box text-neutral-content text-lg dropdown-content prov"
									>
										<ul
											class="left-column-casino-providers-nav mx-5 py-2 overflow-auto sm:overflow-hidden grid grid-cols-10 gap-2"
										>
											<li
												v-for="provider in providers"
												class="capitalize providers-list2 inline-block mr-1 text-center"
											>
												<a
													tabindex="0"
													@click="
														selectProvider(
															provider.name,
															provider.image,
															provider.title
														);
														openProviders();
													"
													class="rounded-3xl bg-base-300 font-bold py-2 px-5 block hover:blob h-10"
													><img
														class="img-prov"
														:src="provider.image"
														alt=""
												/></a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="wrapper-separator-games bg-base-content" id="games-casino-list">
						<div class="mt-2"></div>
						<div class="all-games-casino-list">
							<div class="all-casino-games-list-box">
								<div>
									<ul
										class="masonry grid md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-7 grid-cols-2 gap-4 p-4 auto-rows-fr auto-cols-fr pt-7 grid-flow-row-dense w-full"
									>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											class="list-games-casino-view-b preload-game-top"
										></li>
										<li
											v-for="game in gamesList"
											@click="
												gamesList.idSelect = game.id
											"
											class="list-games-casino-view-b list-game-width- columns-{{game.columns}} animate__animated animate__zoomIn animate__faster rounded-xl overflow-hidden games-aspect c-subscribe-box col-span-{{game.columns}} row-span-{{game.rows}}"
											v-bind:class="[
												{
													'c-box-rgb':
														game.isBorderNeon,
												},
												'rows-' + game.rows,
											]"
										>
											<div class="rainbow" v-if="false">
												<span></span><span></span>
											</div>
											<div class="w-full h-full">
												<a
													@click="
														openGame(game);
														$event.stopPropagation();
													"
                                                    v-bind="analyticsAttrs.game(game)"
												>
													<p
														class="game-img-box-b w-full h-full m-0 bg-cover bg-center c-preview rounded-xl"
														v-bind:style="{
															'background-image':
																'url(' +
																game.icon_2 +
																')',
														}"
													></p>
													<div
														class="casino-resize-buttons absolute top-2 w-full h-full text-center"
														style="
															display: none;
															pointer-events: none;
														"
													>
														<p
															class="game-name-b-favorite text-neutral font-bold mb-0 mt-5"
														>
															<span
																:title="
																	game.name
																"
																>{{
																	game.name
																}}</span
															>
															<i
																class="favorite-icon-view"
																v-bind:class="{
																	active: isFromSaved(
																		game.id
																	),
																}"
																@click="
																	toggleSaveToMyCasinoGames(
																		game
																	)
																"
															></i>
														</p>
														<button
															class="btn-play bg-primary-content text-neutral rounded-full font-bold py-2 px-7 uppercase"
															style=""
                                                            v-bind="analyticsAttrs.game(game)"
														>
															<span>{{
																$t(
																	'Juegue ahora'
																)
															}}</span>
														</button>
													</div>
												</a>
											</div>
										</li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
										<li
											class="list-games-casino-view-b preload-game-bottom"
										></li>
									</ul>
								</div>
							</div>
							<div 
							v-if="!showLoadMoreButton && gamesList.length == 0"
							class="new-casino-no-games-text text-center text-neutral">
								<p>{{ $t('No se encontraron juegos') }}</p>
							</div>
							<div
								class="more-casino-games-load-b w-full text-center"
								v-show="showMore"
							>
								<p
								v-if="showLoadMoreButton"
									load-more=""
									id="loadMoreGames"
									@click="loadMoreGames()"
									class="btn btn-primary text-neutral rounded-full"
                                v-bind="analyticsAttrs.viewAll"
								>
									<span>{{ $t('Cargar mas') }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.old-lobby #lobby-casino {
	/* Sets the background color and size for the casino lobby */
	height: 100%; /* Full height of the parent element */
	overflow: hidden; /* Hides overflow content */
	background-size: contain; /* Ensures background image is contained within the element */
}

.old-lobby .category-icon {
	/* Styles for category icons within the old lobby */
	width: 40px; /* Fixed width for icons */
	margin: 0 auto; /* Centers the icon horizontally */
	height: 50px; /* Fixed height for icons */
}

.old-lobby li.category-list {
	/* Styles for list items in the category list */
	float: none; /* No floating, allows inline-block display */
	display: inline-block; /* Displays list items inline */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	color: #fbf2df; /* Light color for text */
	font: /* Font settings for the text */
		13px/16px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	transition: color 250ms; /* Smooth transition for color changes */
	white-space: nowrap; /* Prevents text from wrapping */
	text-overflow: ellipsis; /* Displays ellipsis for overflow text */
	overflow: hidden; /* Hides overflow content */
	padding: 0 2%; /* Horizontal padding */
	margin-bottom: 5px; /* Space below each list item */
}

/* Styles for the left navigation column in the casino lobby */
.old-lobby .left-column-casino-nav {
	text-align: center; /* Center-aligns text within the column */
	padding: 20px; /* Adds padding around the content */
}

/* Styles for the game list view with two rows in the casino lobby */
.old-lobby .list-games-casino-view-b.rows-2 {
	grid-area: span 2 / span 2 / auto / auto; /* Defines grid area for layout */
	width: 100% !important; /* Forces width to 100% */
	height: 100% !important; /* Forces height to 100% */
}

/* Styles for the navigation controls in the casino lobby */
.old-lobby #lobby-casino .flex-control-nav {
	max-width: 200px; /* Sets maximum width for the navigation */
	display: inline-table; /* Displays as an inline table */
	left: calc(50% - 100px); /* Centers the navigation horizontally */
	background: #787f90 d1; /* Sets background color */
	padding: 4px; /* Adds padding around the navigation */
	border-radius: 41px; /* Rounds the corners of the navigation */
}

/* Styles for the masonry layout in the casino lobby */
.old-lobby ul.masonry {
	padding-top: 15px; /* Adds top padding to the masonry list */
}

/* Styles for the closed state of the providers navigation in the casino lobby */
.old-lobby .providers-nav-casino.closed {
	background:hsl(var(--b3))!important; /* Sets background color for closed state */
	animation: provider-closed-animate-b 280ms ease; /* Applies animation for closing */
}

/* Styles for the top preload game list in the casino lobby */
.old-lobby li.list-games-casino-view-b.preload-game-top,
  /* Styles for the casino game list items in the old lobby view */
.old-lobby li.list-games-casino-view-b.preload-game-bottom {
	background: #787f90 26; /* Background color with opacity */
	-webkit-animation: pulset 3s infinite ease-in-out; /* Animation for WebKit browsers */
	-o-animation: pulst2 3s infinite ease-in-out; /* Animation for Opera browsers */
	-ms-animation: pulset 3s infinite ease-in-out; /* Animation for Internet Explorer */
	-moz-animation: pulset 3s infinite ease-in-out; /* Animation for Firefox */
	animation: pulset 3s infinite ease-in-out; /* Standard animation property */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* No styles defined for this media query */
}

/* Styles for the casino games list box in the old lobby */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
	width: 100%; /* Full width for the list box and its children */
	box-sizing: border-box; /* Include padding and border in the element's total width */
}

/* Styles for the overall casino games list in the old lobby */
.old-lobby .all-games-casino-list {
	box-sizing: border-box; /* Include padding and border in the element's total width */
	width: 100%; /* Full width for the games list */
	padding: 0; /* No padding */
	min-height: 750px; /* Minimum height for the games list */
	margin-bottom: 10px; /* Margin below the games list */
}

/* Styles for the casino games list items displayed as a grid */
.old-lobby .all-casino-games-list-box > div > ul {
	display: grid !important; /* Use grid layout */
	grid-template-columns: repeat(
		auto-fill,
		minmax(180px, 1fr)
	); /* Responsive grid columns */
	grid-gap: 16px; /* Gap between grid items */
	grid-auto-rows: minmax(129px, auto); /* Minimum height for grid rows */
	grid-auto-flow: dense; /* Fill the grid in a dense manner */
}

/* Styles for the game list in the old lobby view */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
	width: 100% !important; /* Ensures full width of the container */
	height: 100% !important; /* Ensures full height of the container */
	border-radius: 6px; /* Rounds the corners of the elements */
}

/* Styles for the before pseudo-element of the game image box */
.old-lobby .game-img-box-b:before {
	content: ''; /* Generates an empty content for the pseudo-element */
	display: block; /* Makes the pseudo-element a block-level element */
	position: absolute; /* Positions the pseudo-element absolutely within its parent */
	top: 0; /* Aligns to the top of the parent */
	left: 0; /* Aligns to the left of the parent */
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	z-index: 88; /* Sets the stacking order of the pseudo-element */
	background: #171a22 ed; /* Background color with a specific shade */
	opacity: 0; /* Initially hidden */
	transition: opacity 0.8s; /* Smooth transition for opacity changes */
}

/* Styles for the game image box */
.old-lobby .game-img-box-b {
	float: left; /* Allows the element to float to the left */
	width: 100%; /* Full width of the container */
	background-size: cover; /* Ensures the background image covers the entire box */
	background-repeat: no-repeat; /* Prevents the background image from repeating */
	background-position: 50% 50%; /* Centers the background image */
	height: 114px; /* Fixed height for the game image box */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	position: relative; /* Sets the positioning context for absolutely positioned children */
	display: block; /* Makes the element a block-level element */
}

.old-lobby /* Main container for the old lobby section */
.deposit-alert-contain.casino /* Container for deposit alerts specific to the casino */
.games-slider /* Slider for displaying games */
.all-games-casino-list /* Container for the list of all casino games */
ul /* Unordered list for game items */
li.list-games-casino-view-b, /* List item for individual game view */
.old-lobby .list-games-casino-view-b, /* List item for individual game view within old lobby */
.old-lobby .save-games-contain .games-slider ul > .list-games-casino-view-b {
	/* Specific list item for saved games in the slider */
	float: left; /* Aligns items to the left */
	width: 20%; /* Sets the width of each game item */
	height: auto; /* Allows height to adjust automatically */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	display: block; /* Displays the item as a block element */
	margin: 0 5px 5px 0; /* Sets margin around the item */
	animation: popup-enter 0.3s ease-in-out; /* Animation effect for item appearance */
	transform: translate3d(
		0,
		0,
		0
	); /* Enables hardware acceleration for smoother rendering */
}

.old-lobby .wrapper-separator-games {
	/* Wrapper for separating game sections */
	width: 100%; /* Full width of the container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
}

.old-lobby .wrapper-separator-games {
	/* Duplicate selector for wrapper, possibly for overriding styles */
	padding: 0 5% !important; /* Sets padding with !important to ensure it overrides other styles */
}

.old-lobby .casino-resize-buttons > div {
	/* Container for casino resize buttons */
	display: inline-block; /* Displays buttons inline */
	height: 60px; /* Fixed height for buttons */
}

/* Styles for the favorite game name in the old lobby section */
.old-lobby .deposit-alert-contain.casino .game-name-b-favorite,
.old-lobby .game-name-b-favorite {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent container */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	padding: 0 15px 0 8px; /* Adds padding: top 0, right 15px, bottom 0, left 8px */
	height: 28px; /* Sets a fixed height for the element */
	background: 0 0; /* Resets the background to transparent */
	font: /* Sets the font properties */
		12px/28px Quicksand,
		/* Font size 12px, line height 28px, primary font is Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	font-weight: 700; /* Sets the font weight to bold */
	color: #fbf2df; /* Sets the text color */
	text-decoration: none; /* Removes any text decoration (like underline) */
	white-space: unset; /* Allows text to wrap normally */
	text-overflow: ellipsis; /* Displays ellipsis (...) for overflowed text */
	position: relative; /* Positions the element relative to its normal position */
	z-index: 22; /* Sets the stacking order of the element */
	opacity: 0; /* Sets the initial opacity to 0 (invisible) */
	transition: opacity 2s; /* Smooth transition for opacity changes over 2 seconds */
	text-align: center; /* Centers the text within the element */
	margin-bottom: 0; /* Removes bottom margin */
}

.old-lobby .favorite-icon-view {
	/* Icon view for favorites in the old lobby */
	width: 24px; /* Width of the favorite icon */
	height: 16px; /* Height of the favorite icon */
	position: absolute; /* Positioning the icon absolutely within its container */
	right: 0; /* Aligns the icon to the right */
	top: 6px; /* Positions the icon 6px from the top */
	font: 14px/16px FontAwesome; /* Font settings using FontAwesome */
	color: #88be86; /* Default color of the icon */
	font-style: normal; /* Normal font style */
	text-decoration: none; /* No text decoration */
	z-index: 88; /* Stacking order of the icon */
	transition: color 250ms; /* Smooth transition for color changes */
	display: block; /* Displays the icon as a block element */
	text-align: center; /* Centers the icon text */
}

.old-lobby .favorite-icon-view.active,
.old-lobby .favorite-icon-view:hover {
	/* Active and hover states for the favorite icon */
	color: #00d30a; /* Color changes to a brighter green when active or hovered */
}

.old-lobby .casino-resize-buttons > div button span {
	/* Styles for the span inside buttons for casino resize */
	width: 100%; /* Full width of the parent element */
	height: 100%; /* Full height of the parent element */
	display: block; /* Displays the span as a block element */
	overflow: hidden; /* Hides overflow content */
	text-overflow: ellipsis; /* Displays ellipsis for overflowing text */
	padding: 0 12px; /* Horizontal padding of 12px */
	box-sizing: border-box; /* Includes padding in the element's total width and height */
}

/* Styles for the old lobby section */
.old-lobby .favorite-icon-view:before {
	content: '\f005'; /* FontAwesome icon for favorite */
}

/* Styles for casino resize buttons within the old lobby */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of the parent */
	font: /* Font settings for the button text */
		12px/29px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0 auto; /* Center the button horizontally */
}

/* Additional styles for casino resize buttons */
.old-lobby .casino-resize-buttons > div button {
	height: 30px; /* Set button height */
	display: block; /* Make button a block element */
	width: 100%; /* Set button width to 100% of the parent */
	padding: 0; /* Remove default padding */
	border: 0; /* Remove default border */
	-webkit-border-radius: 5px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 5px; /* Rounded corners for Firefox */
	border-radius: 5px; /* Standard rounded corners */
	opacity: 0; /* Initially hidden */
	transition: opacity 500ms; /* Fade-in effect for opacity */
	background: linear-gradient(
		to bottom,
		#00ff14,
		#006208
	); /* Green gradient background */
	font-weight: bold !important; /* Bold text */
	color: white; /* Text color */
	font: /* Font settings for the button text */
		12px/30px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	text-transform: uppercase; /* Uppercase text */
	cursor: pointer; /* Pointer cursor on hover */
}

/* Styles for buttons within the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of the parent container */
	font: /* Font settings for the button text */
		12px/29px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	margin: 0 auto; /* Center the button horizontally */
}

/* Container for casino resize buttons */
.old-lobby .casino-resize-buttons {
	display: block; /* Display as a block element */
	width: 100%; /* Full width of the parent */
	position: absolute; /* Positioned absolutely within the parent */
	height: 60px; /* Fixed height for the container */
	text-align: center; /* Center text within the container */
	top: 0; /* Align to the top of the parent */
	left: 0; /* Align to the left of the parent */
	right: 0; /* Align to the right of the parent */
	margin: 0; /* No margin */
	z-index: 90; /* High stacking order to appear above other elements */
}

/* Hover effect for game image box */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
	opacity: 1; /* Fully opaque on hover */
}

/* Adjust margin for paragraph within casino resize buttons on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
	margin-bottom: 35px !important; /* Override any other margin settings */
}

/* Styles for the casino game buttons on hover in the old lobby */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
	/* Resets the button position on hover */
	transform: translateX(0);
}

/* Changes the border color of the link on hover */
.old-lobby .list-games-casino-view-b:hover > a {
	/* Sets the border color to a specific shade of orange */
	border-color: #fea402;
}

/* Styles for the 'Play Now' button on hover */
.old-lobby .list-games-casino-view-b:hover .play-now-game-b > span {
	/* Resets the 3D translation and sets opacity to fully visible */
	transform: translate3d(0, 0, 0);
	opacity: 1;
}

/* Changes the color of the favorite game name on hover */
.old-lobby .list-games-casino-view-b:hover .game-name-b-favorite {
	/* Sets the text color to white */
	color: white;
}

/* Ensures opacity is set to fully visible for various elements on hover */
.old-lobby
	.list-games-casino-view-b:hover
	.casino-resize-buttons
	> div
	.game-name-b-favorite,
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button,
.old-lobby .list-games-casino-view-b:hover > a > .game-img-box-b:before {
	/* Sets opacity to fully visible */
	opacity: 1;
}

/* Styles for the game view when there are two rows */
.old-lobby .list-games-casino-view-b.rows-2 {
	/* Spans the element across two columns and two rows */
	grid-column: span 2;
	grid-row: span 2;
	/* Forces width and height to 100% */
	width: 100% !important;
	height: 100% !important;
}

/* Keyframes for the pulse animation effect used in the casino lobby */
@keyframes pulseCasino {
	0% {
		transform: scale(1); /* Initial scale of the element */
		box-shadow: 0 0 0 0 #ff9600; /* Initial box shadow with no spread */
	}
	70% {
		transform: scale(1); /* Scale remains the same */
		box-shadow: 0 0 0 7px #0c1019 0; /* Box shadow expands to 7px spread */
	}
	100% {
		transform: scale(1); /* Scale remains the same */
		box-shadow: 0 0 0 0 #ff9600 40; /* Box shadow returns to no spread */
	}
}

/* Styles for the neon effect in the old lobby */
.old-lobby .neon1 {
	border: 2px solid #dc8200; /* Border color for the neon effect */
	animation: pulseCasino 2s infinite; /* Apply pulse animation indefinitely */
}

/* Media query for screens smaller than 1260px */
@media screen and (max-width: 1260px) {
	.old-lobby .all-games-casino-list {
		padding-left: 0; /* Remove left padding for smaller screens */
	}
}

/* Media query for screens smaller than 700px */
@media screen and (max-width: 700px) {
	.old-lobby {
		/* No specific styles defined for .old-lobby */
	}

	.old-lobby .wrapper-separator-games {
		float: none; /* Disable floating for the separator */
		margin-top: 20px; /* Add top margin for spacing */
		overflow-y: scroll; /* Enable vertical scrolling */
		height: calc(100% - 110px); /* Set height based on viewport */
	}

	.old-lobby .left-column-casino-nav > ul > li {
		/* No specific styles defined for list items */
	}
}

/* Media query for screens with a maximum width of 416px */
@media only screen and (max-width: 416px) {
	/* Styles for game lists in the old lobby, ensuring single column layout */
	.old-lobby .list-game-width-100,
	.old-lobby .list-games-casino-view-b.rows-2 {
		grid-column: span 1; /* Span one column */
		grid-row: span 1; /* Span one row */
	}

	/* Styles for the casino games list box, setting grid properties */
	.old-lobby .all-casino-games-list-box > div > ul {
		grid-auto-rows: minmax(120px, auto); /* Minimum row height of 120px */
		grid-template-columns: repeat(
			auto-fill,
			minmax(115px, 1fr)
		); /* Responsive column layout */
	}
}

/* Fill colors for different states of Poker category items in the old lobby */
.old-lobby .category-list.Poker .st0 {
	fill: #d8d6ce; /* Light gray fill */
}

.old-lobby .category-list.Poker .st1 {
	fill: #eae9e5; /* Very light gray fill */
}

.old-lobby .category-list.Poker .st2 {
	fill: #b99028; /* Gold fill */
}

.old-lobby .category-list.Poker .st3 {
	fill: #656d78; /* Dark gray fill */
}

.old-lobby .category-list.Poker .st4 {
	fill: #af8527; /* Brownish gold fill */
}

/* Styles for the casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
	height: 100%; /* Set height to 100% of the parent container */
}

/* Styles for game image boxes in the old lobby with 2 columns */
.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
	height: 100% !important; /* Force height to 100% overriding other styles */
}

/* Styles for the divs inside casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
	width: 100%; /* Set width to 100% of the parent container */
}

/* Styles for the favorite icon view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
	width: 25px; /* Set width of the favorite icon */
	height: 25px; /* Set height of the favorite icon */
	font-size: 30px; /* Set font size for the icon */
	right: 5px; /* Position the icon 5px from the right */
}

/* Styles for buttons inside casino resize buttons in the old lobby with 2 rows */
.old-lobby
	.list-games-casino-view-b.rows-2
	.casino-resize-buttons
	> div
	button {
	margin-top: 20%; /* Add top margin of 20% */
	display: inline-block; /* Display buttons inline */
}

/* Styles for the search input in the old lobby */
.old-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width change in WebKit browsers */
	transition: width 2s; /* Smooth transition for width change */
	width: 84px; /* Set initial width of the search input */
}

/* Styles for the casino navigation in the left column of the old lobby */
.old-lobby .left-column-casino-nav > ul {
	width: 100%; /* Full width of the container */
	box-sizing: border-box; /* Includes padding and border in the element's total width */
	display: block; /* Displays the element as a block */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	padding-top: 10px; /* Adds space above the list */
}

/* Overflow settings for the casino navigation list */
.old-lobby .left-column-casino-nav > ul {
	overflow-x: auto; /* Enables horizontal scrolling if content overflows */
	overflow-y: hidden; /* Hides vertical overflow */
}

/* Styles for each list item in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li {
	float: none; /* Resets float property */
	display: inline-block; /* Displays list items inline */
	box-sizing: border-box; /* Includes padding and border in the element's total width */
	color: #fbf2df; /* Text color */
	font: /* Font settings for the list items */
		13px/15px Quicksand,
		/* Font size and line height */ Arial,
		Helvetica,
		sans-serif; /* Fallback fonts */
	transition: color 250ms; /* Smooth transition for color changes */
	white-space: nowrap; /* Prevents text from wrapping */
	text-overflow: ellipsis; /* Displays ellipsis for overflowed text */
	overflow: hidden; /* Hides overflowed text */
	padding: 0 2%; /* Horizontal padding */
	margin-bottom: 5px; /* Space below each list item */
	vertical-align: top; /* Aligns items to the top */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Styles for the search block in the old lobby section */
.old-lobby #searchv3 .block-search {
	height: 35px !important; /* Sets the height of the search block */
	min-width: 55px !important; /* Minimum width enforced for the search block */
	background: transparent; /* Background set to transparent */
	width: 100% !important; /* Full width of the parent container */
	max-width: 100% !important; /* Maximum width enforced to prevent overflow */
	margin: 0 !important; /* No margin around the search block */
	border: 1px solid #a7a7a7; /* Light gray border around the search block */
	border-radius: 40px; /* Rounded corners for the search block */
}

/* Styles for the search block in the old lobby section */
.old-lobby .block-search {
	padding: 0; /* No padding inside the search block */
	min-width: 35px; /* Minimum width for the search block */
	margin: 5px 5px 0 0; /* Margin applied to the search block */
	height: 30px; /* Sets the height of the search block */
	border-radius: 3px; /* Slightly rounded corners for the search block */
	background: #fff; /* White background for the search block */
}

/* Additional styles for positioning the search block */
.old-lobby .block-search {
	float: right; /* Aligns the search block to the right */
	position: relative; /* Sets positioning context for child elements */
	z-index: 1; /* Ensures the search block is above other elements */
	text-align: right; /* Aligns text to the right within the search block */
	max-width: 250px; /* Maximum width for the search block */
}

.old-lobby li#searchv3 input#SearchGame {
	/* Disables transition effects for the search input */
	transition: none !important;
	/* Changes cursor to pointer when hovering over the input */
	cursor: pointer !important;
}

.old-lobby input#SearchGame.ng-hide {
	/* Sets width to 0 when the input is hidden */
	width: 0;
	/* Smooth transition for width change over 1 second */
	transition: width 1s;
	/* Ensures the input is displayed as a block element */
	display: block !important;
	/* Aligns the input to the right */
	float: right;
	/* Removes border from the input */
	border: 0;
}

.old-lobby .block-search input[type='text'] {
	/* Sets text color for the input */
	color: #686767;
	/* Defines font properties for the input */
	font:
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Resets margin to 0 */
	margin: 0;
	/* Adds padding to the input */
	padding: 8px 5px 8px 30px;
	/* Sets background to transparent */
	background: 0 0;
	/* Positions the input relative to its container */
	position: relative;
	/* Sets stacking order for the input */
	z-index: 22;
}

.old-lobby .block-search input[type='text'] {
	/* Sets initial width to 0 for the input */
	width: 0;
	/* Removes border from the input */
	border: 0;
	/* Aligns the input vertically in the middle */
	vertical-align: middle;
	/* Smooth transition for width change over 600 milliseconds */
	transition: width 600ms;
	/* Rounds the corners of the input */
	border-radius: 3px;
}

/* Styles for the search input field in the open state of the search block */
.old-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width of the container */
	padding: 0 0 0 60px !important; /* Padding to the left for icon spacing */
	height: 100%; /* Full height of the container */
	color: #fff; /* Text color set to white */
}

/* Container for the search results */
.old-lobby .search-results-inner {
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the parent */
	padding: 10px 0 0; /* Padding at the top */
	position: relative; /* Allows absolute positioning of child elements */
	z-index: 999; /* High stacking order to appear above other elements */
	background: #fff; /* Background color set to white */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

/* Positioning for the sport arrow within the search results */
.old-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Adjusts the vertical position */
}

/* Positioning for the sport arrow within the search results */
.old-lobby .search-results-inner .arrow-sport {
	right: 50%; /* Centers the arrow horizontally */
}

/* Styles for the sport arrow */
.old-lobby .arrow-sport {
	width: 14px; /* Width of the arrow */
	height: 11px; /* Height of the arrow */
	display: block; /* Makes the arrow a block element */
	position: absolute; /* Allows positioning relative to the nearest positioned ancestor */
	right: 2px; /* Positioning from the right */
	top: -11px; /* Positioning from the top */
	z-index: 999; /* High stacking order to appear above other elements */
}

/* Styles for the h3 elements within the search results in the old lobby */
.old-lobby .search-results-inner h3 {
	font: /* Font size and line height with font family fallback */
		20px/22px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	color: /* Text color for the heading */ #121623;
	text-transform: /* Transform text to uppercase */ uppercase;
}

/* Additional styles for h3 elements in the search results */
.old-lobby .search-results-inner h3 {
	width: /* Full width of the container */ 100%;
	float: /* Float left to align with other elements */ left;
	padding: /* No padding around the heading */ 0;
	text-indent: /* Indent text by 10px */ 10px;
	text-align: /* Align text to the left */ left;
}

/* Styles for various components in the old lobby */
.old-lobby #result-search, /* Search result container */
.old-lobby .bet-container, /* Container for betting options */
.old-lobby .block-more-event, /* Block for additional events */
.old-lobby .clock .open-lang ul, /* Language selection in the clock section */
.old-lobby .conteiner-goals .hover-sp, /* Goals container with hover effect */
.old-lobby .deposit-alert-contain.casino .games-slider ul, /* Games slider in the deposit alert container */
.old-lobby .express-contain, /* Container for express betting options */
.old-lobby .fedback-info ul li textarea, /* Textarea for feedback information */
.old-lobby .form-contain.deposit .form-sign-in /* Sign-in form within the deposit container */
  /* Styles for various containers and elements within the old lobby section */
.old-lobby .general-text-list,
.old-lobby .message-contain,
.old-lobby .radio-contein-withdraw,
.old-lobby .right-betslip-contain-modern,
.old-lobby
.right-block-history.message.compose
.settings-info-contain
.form-text
textarea,
.old-lobby .search-results-inner.casino #casino-result-search,
.old-lobby .text-payment-contain,
.old-lobby .tl-new .current-time:hover ~ .tl-info .hover-sp,
.old-lobby .tl-new .tl-info:hover .hover-sp,
.old-lobby div.draws-contain {
	/* Enable vertical scrolling and hide horizontal scrolling */
	overflow-y: auto;
	overflow-x: hidden;
	/* Custom scrollbar colors */
	scrollbar-track-color: #0c0e14; /* Track color */
	scrollbar-shadow-color: #0c0e14; /* Shadow color */
	scrollbar-base-color: #373f4e; /* Base color */
	scrollbar-arrow-color: #373f4e; /* Arrow color */
}

/* Specific styles for the casino search results container */
.old-lobby .search-results-inner.casino #casino-result-search {
	/* Align the search results to the left and set dimensions */
	float: left;
	width: 100%; /* Full width */
	max-height: 450px; /* Maximum height */
	overflow-y: auto; /* Enable vertical scrolling */
	overflow-x: hidden; /* Hide horizontal scrolling */
	margin: 10px 0 0; /* Margin for spacing */
}

.old-lobby .search-no-results {
	/* Styles for the 'no results' message in the search section */
	font:
		16px/38px Quicksand,
		/* Font size and line height with font stack */ Arial,
		Helvetica,
		sans-serif;
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding for spacing */
	box-sizing: border-box; /* Includes padding in width/height calculations */
}

.old-lobby .search-no-results {
	/* Additional styles for the 'no results' message */
	float: left; /* Aligns the element to the left */
	width: 100%; /* Full width of the parent container */
	text-align: left; /* Aligns text to the left */
}

.old-lobby #menuLeft,
.old-lobby #menuRight {
	/* Hides the left and right menu elements */
	display: none; /* No display for these elements */
}

.old-lobby #menuLeftProviders {
	/* Styles for the left providers menu */
	float: left; /* Aligns the element to the left */
	width: 20px; /* Fixed width */
	padding: 13px 5px 13px 5px; /* Padding for spacing */
	background: #2e3244; /* Background color */
	color: #fff; /* Text color */
	position: absolute; /* Positioned absolutely within the parent */
	left: 0; /* Aligns to the left of the parent */
	display: block; /* Ensures the element is displayed */
	z-index: 9; /* Stacking order for overlapping elements */
}

/* Styles for the right providers menu in the old lobby */
.old-lobby #menuRightProviders {
	float: right; /* Aligns the menu to the right */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: #2e3244; /* Background color of the menu */
	color: #fff 7; /* Text color (note: the '7' seems incorrect) */
	position: absolute; /* Positions the menu absolutely within its container */
	right: 0; /* Aligns the menu to the right edge */
	display: block; /* Displays the menu as a block element */
	z-index: 9; /* Sets the stacking order of the menu */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Hides the home slider in the old lobby */
	.old-lobby div#home-slider {
		display: none; /* Hides the home slider */
	}

	/* Styles for all games category list */
	.old-lobby li.category-list.all-games {
		float: none !important; /* Overrides float property to stack items vertically */
	}

	/* Styles for the left menu in the old lobby */
	.old-lobby #menuLeft {
		float: left; /* Aligns the menu to the left */
		width: 25px; /* Sets the width of the left menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the left menu */
		color: #fff 7; /* Text color (note: the '7' seems incorrect) */
		position: absolute; /* Positions the menu absolutely within its container */
		left: 0; /* Aligns the menu to the left edge */
		display: block; /* Displays the menu as a block element */
		z-index: 0; /* Sets the stacking order of the left menu */
	}

	/* Styles for the right menu in the old lobby */
	.old-lobby #menuRight {
		float: right; /* Aligns the menu to the right */
		width: 25px; /* Sets the width of the right menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the right menu */
		color: #fff 7; /* Text color (note: the '7' seems incorrect) */
		position: absolute; /* Positions the menu absolutely within its container */
		right: 0; /* Aligns the menu to the right edge */
		display: block; /* Displays the menu as a block element */
		z-index: 0; /* Sets the stacking order of the right menu */
	}

	/* Styles for the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul {
		padding-left: 0; /* Removes left padding */
		padding-right: 0; /* Removes right padding */
	}

	/* Styles for the search element in the old lobby */
	.old-lobby li#searchv3 {
		width: 66px; /* Sets the width of the search element */
	}
}

/* Container for the search category navigation in the old lobby */
.old-lobby .search-category-nav-contain {
	width: 95%; /* Sets the width to 95% of the parent container */
	margin: 0 auto; /* Centers the container horizontally */
}

/* Responsive styles for screens smaller than 700px */
@media screen and (max-width: 700px) {
	/* Adjusts the height of SVG icons in the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul > li svg {
		height: 35px !important; /* Forces height to 35px */
	}
}

/* Styles for the casino content area in the old lobby */
.old-lobby div#casino-content {
	height: 100% !important; /* Forces height to 100% */
	padding-bottom: 0 !important; /* Removes bottom padding */
}

/* Styles for the CasinoSliderBox within the lobby casino */
.old-lobby #lobby-casino div#CasinoSliderBox {
	border-radius: 0 0 35px 35px; /* Rounds the bottom corners */
	width: 91%; /* Sets the width to 91% of the parent container */
	margin: 0 auto; /* Centers the slider box horizontally */
	overflow: hidden; /* Hides overflow content */
}

/* Styles for the home slider in the lobby casino */
.old-lobby #lobby-casino div#home-slider {
	background: #091023; /* Sets the background color */
	box-shadow: none; /* Removes any box shadow */
}

/* Styles for SVG icons in the left column casino navigation */
.old-lobby .left-column-casino-nav > ul > li svg {
	width: 40px; /* Sets the width of SVG icons */
	height: 50px; /* Sets the height of SVG icons */
}

/* Styles for the category icons within the Populares section of the old lobby */
.old-lobby .Populares .category-icon svg {
	fill: #787f90; /* Default fill color for category icons */
}

/* Styles for category icons on hover within the Populares section */
.old-lobby .Populares:hover .category-icon svg {
	fill: url(#SVGID_hot) #ffc107; /* Fill color on hover */
	transform: scale(1.1); /* Scale effect on hover */
	transition: 300ms; /* Transition duration for hover effects */
}

/* Styles for active category icons within the Populares section */
.old-lobby .Populares.active .category-icon svg {
	fill: url(#SVGID_hot) #ffc107; /* Fill color for active state */
}

/* Styles for category icons on hover within list items */
.old-lobby li:hover .category-icon svg {
	fill: url(#SVGID_slots3) #ffc107; /* Fill color on hover for list items */
	transform: scale(1.1); /* Scale effect on hover */
	transition: 300ms; /* Transition duration for hover effects */
}

/* Styles for active category icons within list items */
.old-lobby li.active .category-icon svg {
	fill: url(#SVGID_slots3) #ffc107; /* Fill color for active state */
}

/* Default styles for category icons within list items */
.old-lobby li .category-icon svg {
	fill: #787f90; /* Default fill color for category icons */
}

/* Styles for the all-games category list item */
.old-lobby li.category-list.all-games {
	border-left: 2px solid #ff9600; /* Left border for emphasis */
	margin-left: 10px; /* Left margin for spacing */
	padding-left: 15px; /* Left padding for spacing */
}

.old-lobby .fixed-element-parent {
	/* Sets the width to 100% and a high stacking order for fixed elements */
	width: 100%;
	z-index: 300;
}

.old-lobby .fixed-nav-wrapper-casino-view {
	/* Defines the width and background color for the casino view navigation wrapper */
	width: 100%;
	background: hsl(var(--bc));
}

.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed {
	/* Styles for the fixed navigation wrapper when it is scrollable */
	position: fixed; /* Fixes the element to the viewport */
	top: 0; /* Positions it at the top of the viewport */
	max-width: inherit; /* Inherits the maximum width from its parent */
	z-index: 99; /* Sets a lower stacking order than .scrollable-fixed */
	width: 100%; /* Ensures full width */
	background: hsl(var(--bc)) !important; /* Forces background color */
	padding-top: 0; /* Removes any top padding */
}

.old-lobby .fixed-element-parent .scrollable-fixed {
	/* Styles for scrollable fixed elements within the fixed element parent */
	position: fixed; /* Fixes the element to the viewport */
	z-index: 400; /* Sets a high stacking order for visibility */
}

.old-lobby .sticky {
	/* Styles for sticky elements that remain fixed at the top */
	position: fixed; /* Fixes the element to the viewport */
	top: 0; /* Positions it at the top of the viewport */
	width: 100%; /* Ensures full width */
}

/* Styles for the fixed navigation wrapper in the casino view */
.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed:before {
	content: ''; /* Empty content for the pseudo-element */
	display: block; /* Display as a block element */
	position: absolute; /* Positioned absolutely within the parent */
	height: 3px; /* Height of the pseudo-element */
	width: 100%; /* Full width of the parent */
	left: 0; /* Align to the left */
	top: -3px; /* Position above the parent */
	background: hsl(var(--bc)); /* Dark background color */
}

/* Pointer cursor for clickable elements in the old lobby */
.old-lobby [ng-click],
.old-lobby [ng-mousedown] {
	cursor: pointer; /* Change cursor to pointer on hover */
}

/* Container for all casino games */
.old-lobby .all-casino-games-box {
	width: 100%; /* Full width of the parent */
	box-sizing: border-box; /* Include padding and border in width */
	margin: 10px 0 0; /* Margin for spacing */
	z-index: 1; /* Stacking order */
	margin-top: 0; /* Reset top margin */
}

/* Disable text selection for the casino games box */
.old-lobby .all-casino-games-box {
	-moz-user-select: none; /* Firefox */
	-khtml-user-select: none; /* Older versions of Safari */
	user-select: none; /* Standard syntax */
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* Internet Explorer */
}

/* Styles for active and hovered list items in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li.active,
.old-lobby .left-column-casino-nav > ul > li:hover {
	color: #fbf2df; /* Text color for active and hovered items */
	text-shadow: /* Multiple shadows for a glowing effect */
		0 0 20px #fff,
		/* White glow */ 0 0 20px #000,
		/* Black shadow */ 0 0 0 #ffd178,
		/* Light orange shadow */ 0 0 0 #f17,
		/* Red shadow */ 0 0 0 #f17,
		/* Red shadow (duplicate) */ 0 0 80px #f17,
		/* Strong red glow */ 0 0 100px #f17,
		/* Strong red glow */ 0 0 150px #f1a; /* Light red glow */
}

/* Styles for the search input when open */
.old-lobby li#searchv3.open {
	width: 100% !important; /* Forces the search input to take full width */
}

/* Styles for the search input on hover */
.old-lobby li#searchv3:hover {
	text-shadow: none !important; /* Removes text shadow on hover */
}

/* Media query for responsive design, currently empty */
@media screen and (max-width: 1260px) {
}

/* Styles for the load more button in the casino games section */
.old-lobby .more-casino-games-load-b {
	float: left; /* Aligns the button to the left */
	width: 100%; /* Full width for the button */
	margin: 30px 0; /* Vertical margin for spacing */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	text-align: center; /* Centers the text inside the button */
	padding: 0 0 0 10px; /* Padding on the left */
	transform: translate3d(0, 0, 0); /* Enables hardware acceleration */
}

/* Styles for the paragraph element within the more-casino-games-load-b class in the old-lobby */
.old-lobby .more-casino-games-load-b > p {
	/* Font properties including size, line height, and font family */
	font:
		14px/38px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Bold font weight */
	font-weight: 700;
	/* Text color */
	color: hsl(var(--n));
	/* Transition effects for color and border on hover */
	transition:
		color 260ms,
		border 260ms;
	/* Border styling */
	border: 1px solid hsl(var(--p));
	/* Fixed height for the element */
	height: 37px;
	/* Uppercase text transformation */
	text-transform: uppercase;
	/* Background color */
	background-color: hsl(var(--p));
	/* Rounded corners */
	border-radius: 30px;
	/* Fixed width and centered margin */
	width: 300px;
	margin: 0 auto;
}

/* Styles for the paragraph element on hover */
.old-lobby .more-casino-games-load-b > p:hover {
	/* Change background color on hover */
	background-color: hsl(var(--pf));
	/* Change text color on hover */
	color: hsl(var(--n));
	/* Change cursor to pointer on hover */
	cursor: pointer;
}

/* Styles for the span element within the paragraph */
.old-lobby .more-casino-games-load-b > p > span {
	/* Inline-block display for the span */
	display: inline-block;
	/* No padding */
	padding: 0;
	/* Center text alignment */
	text-align: center;
	/* Relative positioning */
	position: relative;
}

/* Styles for the old lobby section */
.old-lobby .big-games-overflow {
	/* Full width and height, fixed position to cover the entire viewport */
	width: 100%;
	overflow: hidden; /* Prevents overflow of content */
	position: fixed; /* Sticks the element to the viewport */
	left: 0; /* Aligns to the left */
	top: 0; /* Aligns to the top */
	height: 100%; /* Full height of the viewport */
	z-index: 999999999999; /* High z-index to ensure it overlays other elements */
}

.old-lobby .div-logo-j img {
	/* Ensures the logo image takes the full height of its container */
	height: 100%;
}

.old-lobby .big-game-background {
	/* Container for the background of the big game */
	padding: 0; /* No padding */
	display: table; /* Allows for table-like layout */
	height: 100%; /* Full height of the parent */
	max-height: 100%; /* Prevents exceeding the parent's height */
	position: absolute; /* Positioned relative to the nearest positioned ancestor */
}

.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Both elements share the same layout properties */
	float: left; /* Floats the elements to the left */
	width: 100%; /* Full width of the parent */
	padding: 0; /* No padding */
	height: 100%; /* Full height of the parent */
}

/* Styles for the old lobby section */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Ensures the background covers the entire area */
	background-size: cover !important;
	/* Sets the background color to black */
	background: black;
}

/* Styles for casual game container */
.old-lobby .casual-game {
	/* Centers the casual game container */
	margin: 0 auto;
	/* Displays the container as a table for alignment */
	display: table;
}

/* Styles for casino game container */
.old-lobby .casino-game-contain {
	/* Sets a minimum height for the casino game container */
	min-height: 300px;
	/* Full width of the parent element */
	width: 100%;
	/* No padding */
	padding: 0;
	/* Displays as a table cell for vertical alignment */
	display: table-cell;
	/* Centers the container */
	margin: 0 auto;
	/* Centers text within the container */
	text-align: center;
	/* Animation for entering the popup */
	animation: popup-enter 400ms ease-in-out;
}

/* Styles for flash game container */
.old-lobby .flash-game-contain {
	/* Removes border and shadow for a clean look */
	border: none;
	border-radius: 0;
	box-shadow: none;
}

/* Additional styles for flash game container */
.old-lobby .flash-game-contain {
	/* Sets a minimum width for the container */
	min-width: 300px;
	/* Adds margin around the container */
	margin: 5px;
	/* Centers text within the container */
	text-align: center;
	/* Displays as an inline-block for layout */
	display: inline-block;
	/* Positions the container relative for absolute positioning of children */
	position: relative;
	/* Aligns the container to the top */
	vertical-align: top;
	/* Hides overflow content */
	overflow: hidden;
	/* Sets a minimum height for the container */
	min-height: 100px;
}

/* Styles for the big game control section in the old lobby */
.old-lobby .big-game-control {
	right: 0; /* Aligns the control to the right */
	float: right; /* Floats the control to the right side */
	display: inline-block; /* Allows the element to be inline with other elements */
	width: 100%; /* Sets the width to 100% of the parent container */
	text-align: right; /* Aligns text to the right */
	position: absolute; /* Positions the element absolutely within its parent */
	background: #0c1019; /* Sets the background color */
	z-index: 10; /* Sets the stacking order of the element */
}

/* Styles for the top options in the flash game container */
.old-lobby .flash-game-contain .top-options {
	display: inline-block; /* Allows the options to be inline with other elements */
}

/* Styles for the first delete icon in the casino game container */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) {
	top: 0; /* Positions the icon at the top */
	right: 0; /* Aligns the icon to the right */
	padding-right: 0; /* Removes right padding */
	background: #0c1019; /* Sets the background color */
	height: 38px; /* Sets the height of the icon */
}

/* Common styles for delete icons in the casino game container */
.old-lobby .casino-game-contain .icon-delete,
.old-lobby .casino-game-contain .icon-delete.favorite,
.old-lobby .casino-game-contain .icon-delete.popup,
.old-lobby .casino-game-contain .icon-delete.refresh {
	top: 7px; /* Positions the icons slightly below the top */
	right: 0; /* Aligns the icons to the right */
	width: 40px; /* Sets the width of the icons */
	height: 40px; /* Sets the height of the icons */
	float: none; /* Resets float property */
	display: inline-block; /* Allows the icons to be inline with other elements */
	margin-bottom: 2px; /* Adds a small margin below the icons */
}

.old-lobby .casino-game-contain .icon-delete {
	/* Sets the position of the delete icon relative to its container */
	position: relative;
	/* Hides text visually while keeping it accessible for screen readers */
	text-indent: -9999em;
}

.old-lobby .casino-game-contain .icon-delete.refresh a:before {
	/* Adds a refresh icon before the link using FontAwesome */
	content: '\f021';
	/* Sets font size and line height for the icon */
	font: 16px/40px FontAwesome;
	/* Positions the icon absolutely within the container */
	position: absolute;
	/* Positions the icon 12px from the right */
	right: 12px;
	/* Positions the icon 1px above the top of the container */
	top: -1px;
	/* Resets text indentation for the icon */
	text-indent: 0;
}

.old-lobby .casino-game-contain .icon-delete.home a:before {
	/* Adds a home icon before the link using FontAwesome */
	content: '\f015';
	/* Sets font size and line height for the icon */
	font: 23px/40px FontAwesome;
	/* Positions the icon absolutely within the container */
	position: absolute;
	/* Positions the icon 12px from the right */
	right: 12px;
	/* Positions the icon 1px above the top of the container */
	top: -1px;
	/* Resets text indentation for the icon */
	text-indent: 0;
}

.old-lobby .casino-game-contain .icon-delete.favorite a:before {
	/* Adds a favorite icon before the link using FontAwesome */
	content: '\f005';
	/* Sets font size and line height for the icon */
	font: 18px/40px FontAwesome;
	/* Positions the icon absolutely within the container */
	position: absolute;
	/* Positions the icon 12px from the right */
	right: 12px;
	/* Positions the icon 1px above the top of the container */
	top: -1px;
	/* Resets text indentation for the icon */
	text-indent: 0;
}

/* Styles for delete icons in the old lobby section of the casino game container */
.old-lobby .casino-game-contain .icon-delete.favorite a,
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active,
.old-lobby .casino-game-contain .icon-delete.favorite a:hover,
.old-lobby .casino-game-contain .icon-delete.popup a,
.old-lobby .casino-game-contain .icon-delete.refresh a,
.old-lobby .casino-game-contain .icon-home.favorite a:hover {
	width: 40px; /* Set width of the icon */
	height: 40px; /* Set height of the icon */
	background: #0c1019; /* Background color for the icon */
}

/* Styles for the first child delete icon in the old lobby section */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) a {
	width: 20px; /* Set width of the first child icon */
	margin: 0 auto; /* Center the icon horizontally */
	text-align: center; /* Center text inside the icon */
	padding: 0; /* Remove padding */
	display: block; /* Display as block element */
	position: relative; /* Position relative for absolute positioning of children */
}

/* General styles for delete icons in the old lobby section */
.old-lobby .casino-game-contain .icon-delete a {
	background: #0c1019; /* Background color for the icon */
	width: 35px; /* Set width of the icon */
	height: 35px; /* Set height of the icon */
	top: 0; /* Position at the top */
	position: static; /* Static positioning */
	-webkit-border-radius: 25px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 25px; /* Rounded corners for Mozilla browsers */
	border-radius: 25px; /* Standard rounded corners */
}

/* Styles for delete icon link within casino game container */
.old-lobby .casino-game-contain .icon-delete a {
	z-index: 99; /* Ensures the delete icon is above other elements */
	display: block; /* Makes the link a block element for better click area */
}

/* Styles for user div in flash game container */
.old-lobby .flash-game-contain .user-div {
	display: inline-block; /* Allows user divs to sit next to each other */
	float: left; /* Aligns user divs to the left */
}

/* Container for settings section, floated to the left */
.old-lobby .settings-include-contain {
	float: left; /* Aligns settings container to the left */
}

/* Navigation separator container styles */
.old-lobby .separator-contain-nav {
	float: left; /* Aligns the separator to the left */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	padding: 0 10px; /* Adds horizontal padding */
	box-shadow: 1px 0 0 #171a22; /* Adds a shadow effect to the right */
	height: 36px; /* Sets a fixed height for the separator */
	position: relative; /* Allows for absolute positioning of child elements */
}

/* Styles for balance box within settings icon container */
.old-lobby .settings-icon-contain.balance-box {
	font-weight: 400; /* Sets font weight to normal */
	transform: inherit; /* Inherits transform properties from parent */
	border: 1ps solid #ffb124; /* Sets a solid border with a specific color (note: '1ps' may be a typo for '1px') */
}

/* Additional styles for balance box settings icon container */
.old-lobby .settings-icon-contain.balance-box,
  /* Styles for the settings icon container in the old lobby with specific layout and font settings */
.old-lobby .settings-icon-contain.leng-b {
	width: auto; /* Allows the width to adjust automatically */
	text-align: left; /* Aligns text to the left */
	font: /* Sets the font properties including size, line height, and font family */
		15px/20px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	font-weight: 700; /* Sets the font weight to bold */
	position: relative; /* Positions the element relative to its normal position */
	padding: 0 18px 0 2px; /* Adds padding to the element */
}

/* Styles for the settings icon container in the old lobby */
.old-lobby .settings-icon-contain {
	float: left; /* Floats the element to the left */
	height: 20px; /* Sets a fixed height for the icon */
	cursor: pointer; /* Changes the cursor to a pointer on hover */
	width: 20px; /* Sets a fixed width for the icon */
	font: 16px/20px FontAwesome; /* Sets the font to FontAwesome with specific size and line height */
	color: #fff; /* Sets the text color to white */
	text-align: center; /* Centers the text within the container */
	margin: 8px 0 0; /* Adds margin to the top and resets margins on the sides */
	transform: rotate(0deg) translate3d(0, 0, 0); /* Applies a 3D transformation */
	transition: transform 500ms; /* Smooth transition for transform changes over 500 milliseconds */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	position: relative; /* Positions the element relative to its normal position */
}

/* Styles for the settings icon container within the old lobby */
.old-lobby .settings-icon-contain.balance-box > ul {
	float: left; /* Aligns the list to the left */
	width: 100%; /* Sets the width to 100% of the parent container */
}

/* Styles for list items within the settings icon container */
.old-lobby .settings-icon-contain.balance-box > ul > li {
	width: 100%; /* Sets each list item to take full width */
	text-align: left; /* Aligns text to the left */
	height: 11px; /* Sets a fixed height for the list items */
	position: relative; /* Positions the item relative to its normal position */
	z-index: 555; /* Sets the stacking order of the list item */
}

/* Styles for the value span within the list items */
.old-lobby .settings-icon-contain.balance-box > ul > li span.valor {
	margin-right: 5px; /* Adds space to the right of the span */
	color: #fea402; /* Sets the text color to a specific shade of orange */
}

/* Styles for the logo container in the old lobby */
.old-lobby .div-logo-j {
	float: left; /* Aligns the logo container to the left */
	padding: 5px 20px; /* Adds padding around the logo */
	height: 37px; /* Sets a fixed height for the logo container */
}

/* Styles for the circular progress indicator in the flash game container */
.old-lobby .flash-game-contain .md-progress-circular {
	position: absolute; /* Positions the progress indicator absolutely */
	top: 40%; /* Centers the indicator vertically */
	left: 50%; /* Centers the indicator horizontally */
	margin-left: -50px; /* Offsets the indicator to the left by 50px for centering */
	z-index: 6; /* Sets the stacking order of the progress indicator */
}

/* Styles for the circular progress indicator in the old lobby theme */
.old-lobby .md-progress-circular.md-theme {
	background: 0 0; /* Transparent background */
	animation: loader-animate-fade 1s linear; /* Fade animation for loading effect */
}

/* General styles for the circular progress indicator */
.old-lobby .md-progress-circular {
	width: 100px; /* Width of the progress indicator */
	height: 140px; /* Height of the progress indicator */
	display: block; /* Display as a block element */
	position: inherit; /* Inherit positioning from parent */
	margin-bottom: 0 !important; /* Remove bottom margin, overriding other styles */
	overflow: visible; /* Allow overflow to be visible */
	margin: 0 auto; /* Center the element horizontally */
	padding: 20px 0; /* Vertical padding */
}

/* Keyframes for the wobble animation */
@keyframes wobble {
	0% {
		transform: translateX(0%); /* Initial position */
	}
	15% {
		transform: translateX(-25%) rotate(-5deg); /* Move left and rotate */
	}
	30% {
		transform: translateX(20%) rotate(3deg); /* Move right and rotate */
	}
	45% {
		transform: translateX(-15%) rotate(-3deg); /* Move left and rotate */
	}
	60% {
		transform: translateX(10%) rotate(2deg); /* Move right and rotate */
	}
	75% {
		transform: translateX(-5%) rotate(-1deg); /* Move left and rotate */
	}
	100% {
		transform: translateX(0%); /* Return to initial position */
	}
}

/* Styles for the circular progress spinner in the old lobby */
.old-lobby .md-progress-circular .md-spinner-wrapper {
	/* Animation for the outer rotation of the spinner */
	-webkit-animation: outer-rotate 2.91667s linear infinite; /* Vendor prefix for Safari */
	animation: outer-rotate 2.91667s linear infinite; /* Standard animation */
}

/* Styles for the inner part of the spinner */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner {
	/* Optimizes the animation performance */
	will-change: transform;
	/* Animation for sporadic rotation of the inner spinner */
	-webkit-animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1)
		infinite; /* Vendor prefix for Safari */
	animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite; /* Standard animation */
}

/* Dimensions and positioning for the inner spinner */
.old-lobby .md-progress-circular .md-inner {
	width: 100px; /* Width of the inner spinner */
	height: 100px; /* Height of the inner spinner */
	position: relative; /* Positioning context for absolute children */
}

/* Gap styling for the themed circular progress spinner */
.old-lobby .md-progress-circular.md-theme .md-inner .md-gap {
	border-top-color: #ffb124; /* Top border color */
	border-bottom-color: #ffb124; /* Bottom border color */
}

/* Styles for the gap in the inner spinner */
.old-lobby .md-progress-circular .md-inner .md-gap {
	position: absolute; /* Positioned absolutely within the inner spinner */
	left: 49px; /* Left offset */
	right: 49px; /* Right offset */
	top: 0; /* Top offset */
	bottom: 0; /* Bottom offset */
	border-top: 5px solid #000; /* Top border styling */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
}

/* Styles for the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
	/* Positioning the left and right halves of the circular progress */
	position: absolute; /* Absolute positioning for overlap */
	top: 0; /* Aligns to the top of the parent */
	height: 100px; /* Fixed height for the progress elements */
	width: 50px; /* Fixed width for the progress elements */
	overflow: hidden; /* Hides overflow content */
}

/* Styles specifically for the left half of the circular progress */
.old-lobby .md-progress-circular .md-inner .md-left {
	left: 0; /* Aligns the left half to the left side */
}

/* Border color for the top of the half circles in the themed circular progress */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-top-color: #ffb124; /* Sets the top border color */
}

/* Border color for the left side of the left half circle in the themed circular progress */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle {
	border-left-color: #ffb124; /* Sets the left border color */
}

/* Incomplete selector for the spinner wrapper and left half circle in the old lobby */
.old-lobby
.md-progress-circular
.md-spinner-wrapper
.md-inner
.md-left
.md-half-circle,
.old-lobby
  /* Styles for the circular progress indicator and spinner wrapper */
.md-progress-circular
.md-spinner-wrapper
.md-inner
.md-right
.md-half-circle {
	/* Infinite animation iteration for continuous spinning effect */
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	/* Duration of the animation cycle */
	-webkit-animation-duration: 1.3125s;
	animation-duration: 1.3125s;
	/* Timing function for smooth animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the left and right half-circles in the progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning and sizing for the half-circles */
	position: absolute;
	top: 0;
	width: 100px; /* Fixed width for the half-circle */
	height: 100px; /* Fixed height for the half-circle */
	box-sizing: border-box; /* Include padding and border in element's total width and height */
	border-width: 15px; /* Width of the border */
	border-style: solid; /* Solid border style */
	border-color: transparent; /* Initial border color set to transparent */
	border-radius: 50%; /* Circular shape */
}

/* Specific styles for the left half-circle */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle {
	left: 0; /* Aligns the left half-circle to the left */
}

/* Styles for the right section of the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-right {
	right: 0; /* Aligns the right section to the right edge */
}

/* Styles for the left and right sections of the circular progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
	position: absolute; /* Positions elements absolutely within the parent */
	top: 0; /* Aligns the sections to the top */
	height: 100px; /* Sets the height of the sections */
	width: 50px; /* Sets the width of the sections */
	overflow: hidden; /* Hides overflow content */
}

/* Sets the border color for the right half-circle of the progress indicator */
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-right-color: #ffb124; /* Defines the right border color */
}

/* Animation settings for the right half-circle of the progress indicator */
.old-lobby
	.md-progress-circular
	.md-spinner-wrapper
	.md-inner
	.md-right
	.md-half-circle {
	-webkit-animation-name: right-wobble; /* Animation for wobbling effect */
	animation-name: right-wobble; /* Animation for wobbling effect */
}

/* Animation settings for the inner spinner of the progress indicator */
.old-lobby .md-spinner-wrapper .md-inner {
	-webkit-animation-name: spin !important; /* Spin animation for the inner element */
	animation-name: spin !important; /* Spin animation for the inner element */
}

/* Define keyframes for a spinning animation for different browsers */
@-moz-keyframes spin {
	100% {
		-moz-transform: rotate(360deg); /* Mozilla-specific rotation */
	}
}

@-webkit-keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* WebKit-specific rotation */
	}
}

@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* Standard rotation for WebKit */
		transform: rotate(360deg); /* Standard rotation for all browsers */
	}
}

/* Styles for the old lobby section with circular progress indicators */
.old-lobby
.md-progress-circular /* Circular progress indicator */
.md-spinner-wrapper /* Wrapper for the spinner */
.md-inner /* Inner part of the spinner */
.md-left /* Left section of the spinner */
.md-half-circle, /* Half-circle spinner style */
.old-lobby
.md-progress-circular /* Circular progress indicator */
.md-spinner-wrapper /* Wrapper for the spinner */
  /* Styles for the inner circular progress indicator */
.md-inner
.md-right
.md-half-circle {
	/* Infinite animation iteration */
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	/* Duration of the animation */
	-webkit-animation-duration: 1.3125s;
	animation-duration: 1.3125s;
	/* Timing function for the animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the right half-circle in the old lobby progress indicator */
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning the right half-circle */
	right: 0;
	/* Making the left border transparent */
	border-left-color: transparent;
}

/* Styles for the left and right half-circles in the old lobby progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning and sizing of the half-circles */
	position: absolute;
	top: 0;
	width: 100px;
	height: 100px;
	/* Ensuring padding and border are included in the element's total width and height */
	box-sizing: border-box;
	/* Border properties for the half-circles */
	border-width: 15px;
	border-style: solid;
	border-color: transparent;
	/* Making the half-circles circular */
	border-radius: 50%;
}

/* Styles for the add casino game button in the old lobby */
.old-lobby .add-casino-game {
	background: #1e2539; /* Background color */
	box-shadow: none; /* No shadow effect */
	text-shadow: none; /* No text shadow */
	color: #454a5a; /* Text color */
	left: calc((100% - 140px) / 2); /* Center horizontally */
	border-radius: 20%; /* Rounded corners */
}

/* Positioning and alignment for the add casino game button */
.old-lobby .add-casino-game {
	position: absolute; /* Absolute positioning */
	z-index: 99; /* High stacking order */
	top: calc((100% - 100px) / 2); /* Center vertically */
	text-align: center; /* Center text alignment */
}

/* Container for flash game content */
.old-lobby .flash-game-contain #game-content {
	background: #0c1019; /* Background color for game content */
	display: inline-block; /* Inline block display */
}

/* Styles for the game content area */
.old-lobby .flash-game-contain #game-content {
	transition: height 200ms; /* Smooth height transition */
	position: relative; /* Relative positioning */
	z-index: 5; /* Medium stacking order */
	margin-top: 55px; /* Top margin */
	overflow: hidden; /* Hide overflow content */
	width: 90vw; /* Width set to 90% of the viewport width */
	height: 90vh; /* Height set to 90% of the viewport height */
}

/* Styles for the closed popup form within the search section of the old lobby */
.old-lobby li#searchv3 .closed-popup-form {
	float: right; /* Aligns the form to the right */
	position: relative; /* Positions the form relative to its normal position */
	top: 0; /* No vertical offset */
	right: 0; /* No horizontal offset */
	z-index: 1000; /* Ensures the form appears above other elements */
	margin-top: -27px; /* Adjusts the top margin to overlap elements */
	margin-right: 14px; /* Adds space to the right */
}

/* Styles for the favorite icon in the casino game container when active */
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active:before {
	color: #b5d000; /* Sets the color of the active favorite icon */
}

/* Styles for the general preloader overlay in the old lobby */
.old-lobby .preloader-general {
	width: 100%; /* Full width of the viewport */
	background: #000; /* Black background for the preloader */
	height: 100vh; /* Full height of the viewport */
	position: absolute; /* Positions the preloader absolutely within its parent */
	left: 0; /* Aligns the preloader to the left */
	z-index: 999999999; /* High z-index to ensure it covers other elements */
}

/* Styles for images within the content section of the old lobby */
.old-lobby .content-p img {
	top: calc(
		50vh - 120px
	) !important; /* Centers the image vertically with an offset */
	width: 240px !important; /* Sets a fixed width for the image */
	left: calc(
		50% - 120px
	) !important; /* Centers the image horizontally with an offset */
	position: absolute; /* Positions the image absolutely within its parent */
}

/* Styles for the new casino no games text within the old lobby */
.old-lobby .new-casino-no-games-text {
	text-align: center; /* Center-aligns the text */
	padding: 25px; /* Adds padding around the text */
}

/* Styles for the disabled casino wrapper in the old lobby */
.old-lobby #casino-wrapper-disabled {
	background: black; /* Sets the background color to black */
	width: 100%; /* Full width of the parent container */
	min-height: 700px; /* Minimum height of 700 pixels */
	padding-top: 1px; /* Adds a small top padding */
}

/* Styles for the alert container within the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled .container-alert {
	width: 100%; /* Full width of the parent container */
}

/* Styles for the message alert within the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled .message-alert {
	width: 90%; /* Sets the width to 90% of the parent container */
	margin: 0 auto; /* Centers the alert horizontally */
	color: white; /* Sets the text color to white */
	text-align: center; /* Center-aligns the text */
	border: 1px solid #b08200; /* Adds a border with a specific color */
	border-radius: 15px; /* Rounds the corners of the border */
	padding: 20px; /* Adds padding inside the alert */
}

/* Styles for the third paragraph within the message alert */
.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(3) {
	font-weight: 900; /* Makes the font bold */
	font-size: 22px; /* Sets the font size to 22 pixels */
}

/* Styles for the old lobby when the casino wrapper is disabled */
.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(4) {
	/* Sets the font weight to lighter for the fourth paragraph in the message alert */
	font-weight: lighter;
}

/* Styles for the span elements within the message alert */
.old-lobby #casino-wrapper-disabled .message-alert span {
	/* Sets the font size to 90px for span elements */
	font-size: 90px;
}

/* Styles for the close button in the message alert */
.old-lobby #casino-wrapper-disabled .message-alert .close {
	/* Sets the width to 100%, height to 23px, and makes it a block element */
	width: 100%;
	height: 23px;
	display: block;
}

/* Styles for the span inside the close button */
.old-lobby #casino-wrapper-disabled .message-alert .close span {
	/* Floats the span to the right and sets the font size to 15px */
	float: right;
	font-size: 15px;
}

/* Styles for the first money image in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled .money-img {
	/* Sets the width to 70%, centers it with auto margins, and adds top margin */
	width: 70%;
	margin: 0 auto;
	margin-top: 100px;
}

/* Styles for the second money image in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled .money-img-two {
	/* Sets the width to 70% and centers it with auto margins */
	width: 70%;
	margin: 0 auto;
}

/* Styles for images within the money image class */
.old-lobby #casino-wrapper-disabled .money-img img,
  /* Styles for the old lobby section when the casino wrapper is disabled */
.old-lobby #casino-wrapper-disabled .money-img-two img {
	width: 100%; /* Set image width to 100% of its container */
	display: block; /* Display the image as a block element */
}

/* Styles for the close icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-times {
	float: right; /* Float the icon to the right */
	color: white; /* Set icon color to white */
}

/* Styles for the mobile icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Set font size for the mobile icon */
}

/* Media query for screens wider than 736px */
@media only screen and (min-width: 736px) {
	/* Styles for message alert in the disabled casino wrapper */
	.old-lobby #casino-wrapper-disabled .message-alert {
		width: 35%; /* Set width to 35% of the container */
		margin: 0 auto; /* Center the alert horizontally */
		color: white; /* Set text color to white */
		text-align: center; /* Center align the text */
		border: 1px solid #b08200; /* Add a border with a specific color */
		border-radius: 15px; /* Round the corners of the border */
	}

	/* Styles for money images in the disabled casino wrapper */
	.old-lobby #casino-wrapper-disabled .money-img,
	.old-lobby #casino-wrapper-disabled .money-img-two {
		width: 25%; /* Set width to 25% of the container */
	}
}

/* Styles for the casino content section in the old lobby */
.old-lobby div#casino-content {
	height: 100vh; /* Full viewport height */
	padding-bottom: 7px; /* Bottom padding */
}

/* Aspect ratio box for game images in the new lobby */
.new-lobby .games-aspect .game-img-box-b::before {
	content: ''; /* Empty content for pseudo-element */
	display: block; /* Display as block element */
	height: 0; /* Initial height */
	width: 0; /* Initial width */
	padding-bottom: calc(16 / 16 * 100%); /* Maintains aspect ratio */
}

/* Preview container styles in the new lobby */
.new-lobby .c-preview {
	background: #000; /* Fallback background color */
	background: -moz-linear-gradient(
		/* Gradient for Firefox */ -45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: -webkit-linear-gradient(
		/* Gradient for WebKit browsers */ -45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: linear-gradient(
		/* Standard gradient */ 135deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background-size: 400% 400%; /* Size of the gradient background */
	background-repeat: no-repeat; /* Prevent background repetition */
	display: flex; /* Use flexbox for layout */
	width: 500px; /* Fixed width */
	height: 500px; /* Fixed height */
	max-width: 100vw; /* Maximum width of viewport */
	max-height: 100vh; /* Maximum height of viewport */
	justify-content: center; /* Center content horizontally */
	align-items: center; /* Center content vertically */
	color: #fff; /* Text color */
	position: relative; /* Positioning context for child elements */
	cursor: pointer; /* Pointer cursor on hover */
	transition: 0.5s all; /* Smooth transition for all properties */
}

.new-lobby .c-preview:hover {
	/* Changes background position on hover for the preview element */
	background-position: 100% 100% !important;
}

.new-lobby .c-preview:hover {
	/* Applies a blur effect to the preview element on hover */
	filter: blur(10px) !important;
}

.new-lobby .list-games-casino-view-b {
	/* Sets initial opacity and defines animation properties for the casino game list */
	opacity: 0; /* Hidden by default */
	animation-name: bounceIn; /* Specifies the animation to use */
	animation-duration: 450ms; /* Duration of the animation */
	animation-timing-function: linear; /* Animation timing function */
	animation-fill-mode: forwards; /* Retains the final state of the animation */
	animation-delay: 2s; /* Delay before the animation starts */
}

@keyframes bounceIn {
	/* Defines the keyframes for the bounceIn animation */
	0% {
		opacity: 0; /* Fully transparent at the start */
		transform: scale(0.3) translate3d(0, 0, 0); /* Scaled down */
	}
	50% {
		opacity: 0.9; /* Almost fully opaque */
		transform: scale(1.1); /* Slightly scaled up */
	}
	80% {
		opacity: 1; /* Fully opaque */
		transform: scale(0.89); /* Slightly scaled down */
	}
	100% {
		opacity: 1; /* Fully opaque at the end */
		transform: scale(1) translate3d(0, 0, 0); /* Normal scale */
	}
}

.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
	/* Display the resize buttons when hovering over the game list */
	display: block !important;
}

.new-lobby li.providers-list {
	/* Set the width of provider list items, accounting for a fixed width */
	width: calc((100% - 320px) / 6);
	/* Align items vertically in the middle */
	vertical-align: middle;
}

.new-lobby .category-list:hover {
	/* Scale up the category list on hover for a zoom effect */
	-webkit-transform: scale(1.1);
	-ms-transform: scale(1.1);
	transform: scale(1.1);
}

.new-lobby .category-list {
	/* Apply a smooth transition effect for all properties */
	transition: all 0.3s ease;
}

.new-lobby .rainbow {
	/* Full width and height for the rainbow element with rotation animation */
	width: 100%;
	height: 100%;
	animation: rotate linear 8s infinite;
	position: absolute;
}

.new-lobby .rainbow span {
	/* Span element to position the rainbow correctly */
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	/* Center the span within the rainbow */
	transform: translate(-50%, -50%);
}

.new-lobby .rainbow span:after {
	/* Creates a pseudo-element after each span for visual effects */
	display: block; /* Makes the pseudo-element a block element */
	content: ''; /* Ensures the pseudo-element has no text content */
	width: 100%; /* Sets the width to 100% of the parent span */
	height: 100%; /* Sets the height to 100% of the parent span */
	position: absolute; /* Positions the pseudo-element absolutely within the span */
	left: 100%; /* Positions the pseudo-element to the right of the span */
}

.new-lobby .rainbow span:first-child {
	/* Styles for the first span in the rainbow class */
	background: #5500ff; /* Sets the background color to a shade of blue */
}

.new-lobby .rainbow span:first-child:after {
	/* Styles for the pseudo-element of the first span */
	background: #ffb000; /* Sets the background color of the pseudo-element to a shade of yellow */
}

.new-lobby .rainbow span:last-child {
	/* Styles for the last span in the rainbow class */
	background: #ff006c; /* Sets the background color to a shade of pink */
}

.new-lobby .rainbow span:last-child:after {
	/* Styles for the pseudo-element of the last span */
	background: #00ffdc; /* Sets the background color of the pseudo-element to a shade of cyan */
}

.new-lobby .c-subscribe-box {
	/* Styles for the subscription box within the new-lobby class */
	overflow: hidden; /* Hides any overflow content */
	position: relative; /* Sets the position to relative for absolute positioning of child elements */
	box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2); /* Applies a shadow effect for depth */
	border-radius: 8px; /* Rounds the corners of the box */
}

.new-lobby .c-subscribe-box__wrapper {
	/* Wrapper for the subscription box with padding and flex layout */
	padding: 4px;
	display: flex; /* Enables flexbox layout */
	flex-direction: column; /* Stacks children vertically */
	border-radius: calc(8px / 2); /* Rounds corners with half of 8px */
}

.new-lobby .c-subscribe-box__title {
	/* Title style for the subscription box */
	font-size: 1.6rem; /* Sets font size for the title */
}

.new-lobby .c-subscribe-box__desc {
	/* Description style for the subscription box */
	font-size: 0.935rem; /* Sets font size for the description */
	margin: 0.7rem auto 1.8rem; /* Vertical margins with auto horizontal centering */
	max-width: 240px; /* Limits the maximum width of the description */
}

.new-lobby .c-subscribe-box__form {
	/* Form container within the subscription box */
	margin-top: auto; /* Pushes the form to the bottom of the wrapper */
}

.new-lobby .c-form--accent input:hover,
.c-form--accent input:active,
.c-form--accent input:focus {
	/* Styles for input fields on hover, active, and focus states */
	border-color: #e85f99; /* Changes border color */
	box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Adds shadow effect */
}

.new-lobby .c-form--accent [type='submit'] {
	/* Styles for the submit button in the accent form */
	background: #e85f99; /* Sets background color */
	border-color: #e85f99; /* Matches border color with background */
	color: #fff; /* Sets text color to white */
}

/* Keyframes for a rotation animation */
@keyframes rotate {
	0% {
		transform: rotate(0); /* Initial state of rotation */
	}
	100% {
		transform: rotate(360deg); /* Final state of rotation */
	}
}

/* Styles for the search input in the new lobby */
.new-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width change in WebKit browsers */
	transition: width 2s; /* Smooth transition for width change */
	width: 84px; /* Initial width of the search input */
}

/* Styles for the block search element within the searchv3 ID */
.new-lobby #searchv3 .block-search {
	height: 35px !important; /* Fixed height with !important to override other styles */
	min-width: 55px !important; /* Minimum width with !important to ensure it is applied */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width with !important to ensure it is applied */
	max-width: 100% !important; /* Maximum width set to 100% with !important */
	margin: 0 !important; /* No margin with !important to ensure it is applied */
	border: 1px solid #a7a7a7; /* Light gray border */
	border-radius: 40px; /* Rounded corners */
}

/* General styles for block search elements in the new lobby */
.new-lobby .block-search {
	padding: 0; /* No padding */
	min-width: 35px; /* Minimum width */
	margin: 5px 5px 0 0; /* Margin on the top and right */
	height: 30px; /* Fixed height */
	border-radius: 3px; /* Slightly rounded corners */
	background: #fff; /* White background */
}

.new-lobby .block-search {
	/* Aligns the search block to the right */
	float: right;
	/* Positions the search block relative to its normal position */
	position: relative;
	/* Sets the stacking order of the search block */
	z-index: 999;
	/* Aligns text to the right within the search block */
	text-align: right;
	/* Sets the maximum width of the search block */
	max-width: 250px;
}

.new-lobby #searchv3 .block-search:before {
	/* Adds a FontAwesome search icon before the search block */
	content: '\f002' !important;
	/* Sets the font size and line height for the icon */
	font: 20px/35px FontAwesome !important;
	/* Sets the color of the icon */
	color: #979797 !important;
	/* Positions the icon absolutely within the search block */
	position: absolute;
	/* Positions the icon 10px from the left */
	left: 10px;
	/* Positions the icon at the top of the search block */
	top: 0;
}

.new-lobby li#searchv3 input#SearchGame {
	/* Disables transition effects for the search input */
	transition: none !important;
	/* Changes the cursor to a pointer when hovering over the search input */
	cursor: pointer !important;
}

.new-lobby input#SearchGame.ng-hide {
	/* Sets the width to 0 when the input is hidden */
	width: 0;
	/* Smoothly transitions the width over 1 second */
	transition: width 1s;
	/* Ensures the input is displayed as a block element */
	display: block !important;
	/* Floats the input to the right */
	float: right;
	/* Removes the border from the input */
	border: 0;
}

.new-lobby .block-search input[type='text'] {
	/* Text input styling for the search block in the new lobby */
	color: #686767; /* Text color */
	font: /* Font settings for the input */
		12px Quicksand,
		/* Primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	margin: 0; /* Reset margin */
	padding: 8px 5px 8px 30px; /* Padding for input */
	background: 0 0; /* Transparent background */
	position: relative; /* Positioning context for child elements */
	z-index: 22; /* Stacking order */
}

.new-lobby .block-search input[type='text'] {
	/* Additional styling for the search input */
	width: 0; /* Initial width set to 0 for animation */
	border: 0; /* No border */
	vertical-align: middle; /* Aligns input vertically */
	transition: width 600ms; /* Smooth transition for width change */
	border-radius: 3px; /* Rounded corners */
}

.new-lobby li#searchv3.open .block-search input[type='text'] {
	/* Styling for the search input when the search block is open */
	width: 100%; /* Full width when open */
	padding: 0 0 0 60px !important; /* Increased left padding */
	height: 100%; /* Full height */
	color: #fff; /* Text color when open */
}

.new-lobby .search-results-inner {
	/* Container for search results in the new lobby */
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the parent element */
	padding: 10px 0 0; /* Padding at the top */
	position: relative; /* Allows absolute positioning of child elements */
	z-index: 999; /* High stacking order to appear above other elements */
	background: #fff; /* White background color */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

.new-lobby .search-results-inner .arrow-sport {
	/* Positioning for the arrow indicator within search results */
	top: -6px; /* Moves the arrow up slightly */
}

.new-lobby .search-results-inner .arrow-sport {
	/* Positioning for the arrow indicator within search results */
	right: 50%; /* Centers the arrow horizontally */
}

.new-lobby .arrow-sport {
	/* Styles for the arrow indicator */
	width: 14px; /* Width of the arrow */
	height: 11px; /* Height of the arrow */
	display: block; /* Makes the arrow a block element */
	position: absolute; /* Allows positioning relative to the nearest positioned ancestor */
	right: 2px; /* Positions the arrow 2px from the right */
	top: -11px; /* Positions the arrow 11px above its normal position */
	z-index: 999; /* High stacking order to appear above other elements */
}

/* Styles for the h3 elements within the search results of the new lobby */
.new-lobby .search-results-inner h3 {
	font:
		20px/22px Quicksand,
		/* Font size and line height with font family fallback */ Arial,
		Helvetica,
		sans-serif;
	color: #121623; /* Text color */
	text-transform: uppercase; /* Transforms text to uppercase */
}

/* Additional styles for h3 elements in the new lobby search results */
.new-lobby .search-results-inner h3 {
	width: 100%; /* Full width of the parent container */
	float: left; /* Floats the element to the left */
	padding: 0; /* No padding */
	text-indent: 10px; /* Indents the first line of text */
	text-align: left; /* Aligns text to the left */
}

/* Styles for various components in the new lobby */
.new-lobby #result-search, /* Search result container */
.bet-container, /* Container for betting elements */
.block-more-event, /* Container for additional event blocks */
.clock .open-lang ul, /* Unordered list for open language options in the clock section */
.conteiner-goals .hover-sp, /* Hover state styles for goals container */
.deposit-alert-contain.casino .games-slider ul, /* Unordered list for games slider in casino deposit alert */
.express-contain, /* Container for express elements */
.fedback-info ul li textarea, /* Textarea within feedback info list items */
.form-contain.deposit .form-sign-in /* Sign-in form within deposit form container */
  /* Styles for various container elements with scrollable content */
.general-text-list,
.message-contain,
.radio-contein-withdraw,
.right-betslip-contain-modern,
.right-block-history.message.compose .settings-info-contain .form-text textarea,
.search-results-inner.casino #casino-result-search,
.text-payment-contain,
.tl-new .current-time:hover ~ .tl-info .hover-sp,
.tl-new .tl-info:hover .hover-sp,
div.draws-contain {
	overflow-y: auto; /* Enables vertical scrolling */
	overflow-x: hidden; /* Hides horizontal scrolling */
	scrollbar-track-color: #0c0e14; /* Color of the scrollbar track */
	scrollbar-shadow-color: #0c0e14; /* Shadow color for the scrollbar */
	scrollbar-base-color: #373f4e; /* Base color of the scrollbar */
	scrollbar-arrow-color: #373f4e; /* Color of the scrollbar arrows */
}

/* Specific styles for the search results container in the new lobby */
.new-lobby .search-results-inner.casino #casino-result-search {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent */
	max-height: 450px; /* Limits the maximum height */
	overflow-y: auto; /* Enables vertical scrolling */
	overflow-x: hidden; /* Hides horizontal scrolling */
	margin: 10px 0 0; /* Adds a top margin */
}

/* Styles for the search no results message in the new lobby */
.new-lobby .search-no-results {
	/* Font settings with fallback options */
	font:
		16px/38px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Text color for the message */
	color: #f2c36f;
	/* Padding for spacing */
	padding: 0 10px;
	/* Ensures padding and border are included in the element's total width and height */
	box-sizing: border-box;
}

/* Additional styles for the search no results message */
.new-lobby .search-no-results {
	/* Floats the element to the left */
	float: left;
	/* Full width of the parent container */
	width: 100%;
	/* Aligns text to the left */
	text-align: left;
}

/* Responsive styles for screens smaller than 550px */
@media screen and (max-width: 550px) {
	/* Specific width for the searchv3 list item */
	.new-lobby li#searchv3 {
		width: 66px;
	}

	/* Allows providers list items to have automatic width */
	.new-lobby li.providers-list {
		width: auto;
	}

	/* Overrides width for the open state of searchv3 list item */
	.new-lobby li#searchv3.open {
		width: 60% !important;
	}
}

.new-lobby li#searchv3.open {
	/* Sets the width of the open search item to 30% */
	width: 30%;
}

.new-lobby li#searchv3:hover {
	/* Removes text shadow on hover for the search item */
	text-shadow: none !important;
}

.new-lobby li#searchv3 .closed-popup-form {
	/* Positions the closed popup form to the right of the search item */
	float: right;
	position: relative;
	top: 0;
	right: 0;
	z-index: 1000; /* Ensures the form is above other elements */
	margin-top: -27px; /* Adjusts vertical position */
	margin-right: 14px; /* Adjusts horizontal position */
}

.new-lobby .closed-popup-form:before {
	/* Styles the icon before the closed popup form */
	font: 20px/10px FontAwesome; /* Uses FontAwesome for the icon */
	color: #979797; /* Sets the icon color */
	content: '\f00d'; /* Specifies the icon content */
	cursor: pointer; /* Changes cursor to pointer on hover */
	transition: 250ms color; /* Smooth transition for color changes */
}

.new-lobby .c-box-rgb {
	/* Styles the RGB box with a gradient background */
	position: relative;
	overflow: visible !important; /* Ensures overflow is visible */
	background: linear-gradient(
		0deg,
		#000,
		#272727
	); /* Sets a vertical gradient from black to dark gray */
}

/* Styles for the new lobby and RGB box effect */
.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
	/* Empty content for pseudo-elements */
	content: '';
	/* Positioning the pseudo-elements absolutely */
	position: absolute;
	/* Offset from the left and top */
	left: -3px;
	top: -3px;
	/* Background gradient with multiple colors */
	background: linear-gradient(
		45deg,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000,
		#fb0094,
		#0000ff,
		#00ff00,
		#ffff00,
		#ff0000
	);
	/* Set background size to create a smooth animation effect */
	background-size: 400%;
	/* Width and height adjusted to cover the parent element */
	width: calc(100% + 6px);
	height: calc(100% + 6px);
	/* Set z-index to place behind other elements */
	z-index: -1;
	/* Animation applied to create a steam effect */
	animation: steam 20s linear infinite;
	/* Rounded corners for the pseudo-elements */
	border-radius: 13px;
}

/* Animation for steam effect, moving background position */
@keyframes steam {
	0% {
		background-position: 0 0; /* Initial background position */
	}
	50% {
		background-position: 400% 0; /* Midpoint background position */
	}
	100% {
		background-position: 0 0; /* Reset to initial position */
	}
}

/* Styling for the new lobby's RGB box after pseudo-element */
.new-lobby .c-box-rgb:after {
	filter: blur(5px); /* Applies a blur effect */
}

/* Margin adjustment for the play button in the new lobby */
.new-lobby .btn-play {
	margin-top: calc(50% - 60px); /* Centers button vertically with offset */
}

/* Base styling for carousel component */
.carousel {
	position: relative; /* Positions carousel relative to its container */
}

/* Inner container of the carousel */
.carousel-inner {
	position: relative; /* Positions inner content relative to the carousel */
	overflow: hidden; /* Hides overflow content */
	width: 100%; /* Sets width to fill the parent container */
}

.carousel-open:checked + .carousel-item {
	/* Styles for the carousel item when the corresponding checkbox is checked */
	position: static; /* Positioning the item statically */
	opacity: 100; /* Fully visible */
}

.carousel-item {
	/* Base styles for each carousel item */
	position: absolute; /* Positioned absolutely within the carousel */
	opacity: 0; /* Initially hidden */
	-webkit-transition: opacity 0.6s ease-out; /* Smooth transition for opacity (WebKit) */
	transition: opacity 0.6s ease-out; /* Smooth transition for opacity */
}

.carousel-item img {
	/* Styles for images within carousel items */
	display: block; /* Ensures no extra space below the image */
	height: auto; /* Maintains aspect ratio */
	max-width: 100%; /* Responsive width */
}

.carousel-control {
	/* Styles for the carousel control buttons */
	background: rgba(0, 0, 0, 0.28); /* Semi-transparent background */
	border-radius: 50%; /* Circular buttons */
	color: #fff; /* White text color */
	cursor: pointer; /* Pointer cursor on hover */
	display: none; /* Hidden by default */
	font-size: 40px; /* Font size for the control icon */
	height: 40px; /* Height of the control button */
	line-height: 35px; /* Centering text vertically */
	position: absolute; /* Positioned absolutely within the carousel */
	top: 50%; /* Vertically centered */
	-webkit-transform: translate(0, -50%); /* Centering transform (WebKit) */
	cursor: pointer; /* Pointer cursor on hover */
	-ms-transform: translate(0, -50%); /* Centering transform (IE) */
	transform: translate(0, -50%); /* Centering transform */
	text-align: center; /* Center text within the button */
	width: 40px; /* Width of the control button */
	z-index: 10; /* Ensures the button is above other elements */
}

/* Positioning for the previous carousel control button */
.carousel-control.prev {
	left: 2%; /* Aligns the previous control button to the left */
}

/* Positioning for the next carousel control button */
.carousel-control.next {
	right: 2%; /* Aligns the next control button to the right */
}

/* Styles for carousel control buttons on hover */
.carousel-control:hover {
	background: rgba(0, 0, 0, 0.8); /* Dark background on hover */
	color: #aaaaaa; /* Light text color on hover */
}

/* Display control elements based on checked state of corresponding carousel */
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
	display: block; /* Shows the control element when the corresponding carousel is checked */
}

/* Styles for carousel indicators */
.carousel-indicators {
	list-style: none; /* Removes default list styling */
	margin: 0; /* Resets margin */
	padding: 0; /* Resets padding */
	position: absolute; /* Positions indicators absolutely within the carousel */
	bottom: 2%; /* Positions indicators near the bottom of the carousel */
	left: 0; /* Aligns indicators to the left */
	right: 0; /* Aligns indicators to the right */
	text-align: center; /* Centers the indicators */
	z-index: 10; /* Ensures indicators are above other elements */
}

/* Styles for the carousel indicators */
.carousel-indicators li {
	display: inline-block; /* Displays indicators in a horizontal line */
	margin: 0 5px; /* Adds horizontal spacing between indicators */
}

/* Base styles for carousel bullets */
.carousel-bullet {
	color: #fff; /* Sets bullet color to white */
	cursor: pointer; /* Changes cursor to pointer on hover */
	display: block; /* Makes the bullet a block element */
	font-size: 35px; /* Sets font size for the bullet */
}

/* Styles for carousel bullets on hover */
.carousel-bullet:hover {
	color: #aaaaaa; /* Changes bullet color to light gray on hover */
}

/* Styles for the first carousel bullet when the first carousel is checked */
#carousel-1:checked
~ .control-1
~ .carousel-indicators
li:nth-child(1)
.carousel-bullet,
  /* Styles for the second carousel bullet when the second carousel is checked */
#carousel-2:checked
~ .control-2
~ .carousel-indicators
li:nth-child(2)
.carousel-bullet,
  /* Styles for the third carousel bullet when the third carousel is checked */
#carousel-3:checked
~ .control-3
  /* Carousel indicators styling */
~ .carousel-indicators
li:nth-child(3) /* Targets the third indicator in the carousel */
.carousel-bullet {
	color: #428bca; /* Sets the color of the carousel bullet */
}

/* Flexbox container for casino section */
.flex.casino {
	background: #091023; /* Dark background for the casino section */
}

/* Styling for the inner carousel of the lobby casino */
#lobby-casino .carousel-inner {
	border-radius: 0 0 30px 30px; /* Rounds the bottom corners of the carousel */
}

/* Image provider styling */
.img-prov {
	height: auto; /* Maintains aspect ratio */
	width: auto; /* Maintains aspect ratio */
	max-width: 100%; /* Ensures image does not exceed container width */
	max-height: 100%; /* Ensures image does not exceed container height */
	margin: auto; /* Centers the image */
	filter: grayscale(100%); /* Applies grayscale filter to the image */
}

/* Image provider with color styling */
.img-prov.color {
	filter: grayscale(
		0%
	) !important; /* Removes grayscale filter, showing original color */
}

/* Styling for dropdown visibility */
.show-drop {
	opacity: 1 !important; /* Ensures the dropdown is fully opaque */
	visibility: visible !important; /* Ensures the dropdown is visible */
	position: relative !important; /* Sets the position to relative for proper placement */
}

/* Dropdown content for providers, initially hidden */
.dropdown-content.prov {
	opacity: 0; /* Fully transparent */
	visibility: hidden; /* Not visible */
	position: absolute; /* Positioned absolutely within its parent */
	background-color: #dfdfdf; /* Light gray background */
}

/* List items for providers in the old lobby */
.old-lobby li.providers-list {
	width: auto; /* Width adjusts automatically */
	vertical-align: middle; /* Aligns items vertically in the middle */
}

/* Visibility and opacity settings for dropdown when active */
.ver-drop {
	visibility: visible !important; /* Forces visibility */
	opacity: 1 !important; /* Fully opaque */
}

/* Hides the scrollbar for the left column casino providers navigation */
ul.left-column-casino-providers-nav::-webkit-scrollbar {
	display: none; /* Hides the scrollbar */
}

/* Style for all casino games box with specific style */
.all-casino-games-box.style4 {
	position: absolute; /* Positioned absolutely */
	margin-top: -116px !important; /* Negative margin to adjust position */
}

/* Fixed navigation wrapper for casino view with gradient background */
.all-casino-games-box.style4 .fixed-nav-wrapper-casino-view {
	background: linear-gradient(
		0deg,
		/* Gradient direction */ rgb(0 6 22) 50%,
		/* Dark color at 50% */ rgba(9, 16, 35, 0) 100%
			/* Transparent color at 100% */
	) !important; /* Forces this background style */
}

/* Styles for the right menu button */
button#menuRight {
	width: 25px; /* Fixed width for the button */
	padding: 45px 0; /* Vertical padding for button content */
	background: #262a3a; /* Background color of the button */
	color: rgba(
		255,
		255,
		255,
		0.8705882352941177
	); /* Text color with transparency */
	position: absolute; /* Positioned absolutely within the parent */
	right: 0; /* Aligns the button to the right */
	display: block; /* Displays the button as a block element */
	z-index: 10; /* Stacking order of the button */
	height: 100%; /* Full height of the parent element */
	margin-top: -5px; /* Negative margin to adjust vertical position */
	vertical-align: middle; /* Aligns the button vertically in its container */
	background: -webkit-linear-gradient(
		/* Gradient background for the button */ 90deg,
		/* Direction of the gradient */ rgb(20, 21, 24) 1%,
		/* Start color */ rgb(42, 45, 58) 48%,
		/* Middle color */ rgb(17, 18, 23) 100% /* End color */
	) !important; /* Ensures this style takes precedence */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Styles for the left menu button */
button#menuLeft {
	float: left; /* Floats the button to the left */
	width: 25px; /* Fixed width for the button */
	padding: 45px 0; /* Vertical padding for button content */
	background: #262a3a; /* Background color of the button */
	color: rgba(
		255,
		255,
		255,
		0.8705882352941177
	); /* Text color with transparency */
	position: absolute; /* Positioned absolutely within the parent */
	left: 0; /* Aligns the button to the left */
	display: block; /* Displays the button as a block element */
	z-index: 1; /* Stacking order of the button */
	margin-top: -5px; /* Negative margin to adjust vertical position */
	height: 100%; /* Full height of the parent element */
	background: -webkit-linear-gradient(
		/* Gradient background for the button */ 90deg,
		/* Direction of the gradient */ rgb(20, 21, 24) 1%,
		/* Start color */ rgb(42, 45, 58) 48%,
		/* Middle color */ rgb(17, 18, 23) 100% /* End color */
	) !important; /* Ensures this style takes precedence */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

#casino-wrapper-disabled .message-alert {
	/* Styles for the alert message when the casino wrapper is disabled */
	width: 90%; /* Sets the width of the alert message */
	margin: 0 auto; /* Centers the alert message horizontally */
	color: #fff; /* Sets the text color to white */
	text-align: center; /* Centers the text within the alert */
	border: 1px solid #b08200; /* Adds a border with a specific color */
	border-radius: 15px; /* Rounds the corners of the alert */
	padding: 20px; /* Adds padding inside the alert */
}

#casino-wrapper-disabled .money-img {
	/* Styles for the first money image when the casino wrapper is disabled */
	width: 70%; /* Sets the width of the money image */
	margin: 100px auto 0; /* Centers the image horizontally and adds top margin */
}

#casino-wrapper-disabled .money-img-two {
	/* Styles for the second money image when the casino wrapper is disabled */
	width: 70%; /* Sets the width of the second money image */
	margin: 0 auto; /* Centers the image horizontally */
}

@media only screen and (min-width: 736px) {
	/* Media query for screens wider than 736px */
	#casino-wrapper-disabled .money-img,
	#casino-wrapper-disabled .money-img-two {
		/* Styles for both money images in larger screens */
		width: 25%; /* Sets the width of the money images */
	}

	#casino-wrapper-disabled .message-alert {
		/* Styles for the alert message in larger screens */
		width: 35%; /* Sets the width of the alert message */
		margin: 0 auto; /* Centers the alert message horizontally */
		color: #fff; /* Sets the text color to white */
		text-align: center; /* Centers the text within the alert */
		border: 1px solid #b08200; /* Adds a border with a specific color */
		border-radius: 15px; /* Rounds the corners of the alert */
	}
}

/* Styles for the disabled casino wrapper */
#casino-wrapper-disabled .money-img {
	/* Center the money image with a top margin */
	margin: 100px auto 0;
}

/* Styles for images within money-img and money-img-two classes */
#casino-wrapper-disabled .money-img-two img,
#casino-wrapper-disabled .money-img img {
	/* Set images to full width and block display */
	width: 100%;
	display: block;
}

/* Styles for specific paragraphs in the message alert */
#casino-wrapper-disabled .message-alert p:nth-child(3) {
	/* Bold font weight and larger font size for emphasis */
	font-weight: 900;
	font-size: 22px;
}

#casino-wrapper-disabled .message-alert p:nth-child(4) {
	/* Lighter font weight for less emphasis */
	font-weight: lighter;
}

/* Set width for money image containers */
#casino-wrapper-disabled .money-img,
#casino-wrapper-disabled .money-img-two {
	/* Each container takes up 25% of the width */
	width: 25%;
}

/* Center the second money image container */
#casino-wrapper-disabled .money-img-two {
	/* Auto margins for horizontal centering */
	margin: 0 auto;
}

/* Styles for the close icon in the alert */
#casino-wrapper-disabled i.fa.fa-times {
	/* Float the icon to the right and set color to white */
	float: right;
	color: #fff;
}

/* Styles for the close button in the disabled casino wrapper alert message */
#casino-wrapper-disabled .message-alert .close {
	width: 100%; /* Full width of the parent */
	height: 23px; /* Fixed height */
	display: block; /* Block display for proper alignment */
}

/* Font size for mobile icon in the disabled casino wrapper */
#casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Large font size for visibility */
}

/* Container for alerts in the disabled casino wrapper */
#casino-wrapper-disabled .container-alert {
	width: 100%; /* Full width of the parent */
}

/* Main wrapper for the disabled casino section */
#casino-wrapper-disabled {
	background: #000; /* Black background */
	width: 100%; /* Full width */
	min-height: 700px; /* Minimum height for layout */
	padding-top: 1px; /* Small padding at the top */
}

/* Style for polygon elements in the Bingos category list */
li.category-list.Bingos polygon {
	fill: white !important; /* Force white fill color */
}

/* Container for casino content, taking full viewport height */
div#casino-content {
	height: 100vh; /* Full height of the viewport */
}
</style>

<!-- FILE DOCUMENTED -->

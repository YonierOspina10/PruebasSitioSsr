<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/ApiService';
import AppCarousel from '@/components/Carousel.vue';
import favoriteIcon from '@/components/icons/favoriteIcon.vue';
import searchIcon from '@/components/icons/searchIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue';
import { useGetInfoFirestore } from '../../composables/useInfoFirestore'; // Import function to get banners data from firestore
import { useFavoriteGames } from '@/composables/useFavoriteGames';
import { toKebabCase } from '@/utils';
/**
 * Main component definition for the casino live application.
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
		// Asynchronously load components for better performance
		MenuCasino3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3.vue')
		),
		MenuProviders3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3.vue')
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
		MenuCasino6: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino6.vue')
		),
		JackpotWinnerComponent: defineAsyncComponent(
			() => import('../../components/JackpotWinners.vue')
		),
		MenuProviders6: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders6.vue')
		),
		GamesGrid: defineAsyncComponent(
			() => import('../../components/GamesGrid.vue')
		),
		SliderCasino3Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3.vue')
		),
		BannerSlider6: defineAsyncComponent(
			() => import('../../components/BannerSlider6.vue')
		),
		SliderGamesV2: defineAsyncComponent(
			() => import('../../components/SliderGamesV2.vue')
		),
		Carousel7Component: defineAsyncComponent(
			() => import('../../components/Carousel7.vue')
		),
		MenuCasino4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino4.vue')
		),
		MenuProviders4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders4.vue')
		),
		JackpotsComponent: defineAsyncComponent(
			() => import('../../components/Jackpots.vue')
		),
        Jackpots4Component: defineAsyncComponent(
            () => import('../../components/Jackpots4.vue')
        ),
		JackpotPlaytechMain: defineAsyncComponent(
			() => import('@/components/JackpotPlaytech.vue')
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
		AccessMenuWidget: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/AccessMenu.vue') 
		),
		CasinoGames: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets libray
			() => import('../../components/widgetsComponents/CarouselCasino.vue') 
		),
		CarouselCategoryProviderCards: defineAsyncComponent(
			// Define an async component for categories or providers from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/CategoriesAndProviders.vue') 
		),
		JackpotsContainer: defineAsyncComponent(
			// Define an async component for jackpots from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/JackpotsContainer.vue') 
		),
	},
	/**
	 * Component data function to initialize reactive properties.
	 */
	data: function () {
		let config = this.$config(); // Configuration object
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
		let myCasinoGames: any = []; // User's favorite games
		let bgGame: any = {}; // Background game settings
		let preloaderShow: boolean = false; // Preloader visibility
		let showMore: boolean = false; // Show more games flag
		let selections: any = ''; // Selected filters
		let categoryId = ''; // Current category ID
		let providerId = ''; // Current provider ID
		let providers: any = ''; // List of providers
		let categories: any = ''; // List of categories
		let gamesList: any = ''; // List of games
		let optionsGames: any = ''; // Options for game requests
		let gameSelected: any = ''; // Selected game
		let showGame: boolean = false; // Show game flag
		let limit: any = ''; // Limit for games
		let total_count: any = null; // Total count of games
		let offset: any = null; // Offset for pagination
		let openSearchv3: boolean = false; // Search visibility flag
		let partnerG: any = ''; // Partner ID
		let logueado: any = ''; // Login status
		let routes: any = ''; // Application routes
		let showLoadMoreButton = true; // Load more button visibility
		let user_id: any = ''; // User ID
		let urlVirtualplay: any = ''; // URL for virtual play
		let urlCasinoPlay: any = ''; // URL for casino play
		let providersLength: any = ''; // Length of providers list
		let categoriesLength: any = ''; // Length of categories list
		let urlGame: any = ''; // URL for the game
		let limitConfig: any = ''; // Limit configuration
		let hideInputSearch: any = ''; // Hide search input flag
		let showSearchCommandResults: any = ''; // Show search results flag
		let sliders: any = ''; // Sliders configuration
		let urlbanner: any = ''; // URL for banners
		let limitBefore: any = ''; // Limit before loading more
		let country: any = ''; // Country setting
		let flag: boolean = true; // General flag
		let device: string = ''; // Device type
		let login: string = ''; // Login status for display
		let login2: string = ''; // Alternate login status
		let provOpen: boolean = false; // Provider open flag
		let banners: any = []; // Banners configuration
		const components: any = ref([]); // Reactive components array
		let debouncedSearch: any = null; // Debounced search function

		// Determine device type based on app component
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Set login status based on session
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Set alternate login status
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Load banners based on configuration and user session
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners'][
				'banner_live_casino'
			] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_live_casino'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['casinoLive'] != undefined &&
			config['components_']['casinoLive'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['casinoLive'][
				config['components_']['casinoLive'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['casinoLive'][
				config['components_']['casinoLive'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['casinoLive'][
						config['components_']['casinoLive'].findIndex(
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
				]['live-casino'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['live-casino']
					)
				);
			}
		}

		// Populate components with banners if available
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['casinoLive'] != undefined
		) {
			config['components_']['casinoLive'].forEach((component: any) => {
				component.banners = banners;
				components.value.push(component);
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['casinoLive'] !=
					undefined
			) {
				config['components'][appComponent.country][
					'casinoLive'
				].forEach((component: any) => {
					component.banners = banners;
					components.value.push(component);
				});
			}
		}
		return {
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
			showLoadMoreButton,
			debouncedSearch,
			toggleSaveToMyCasinoGamesComposable: null,
            getFavoriteGamesComposable: null,
            selectCategoryFavComposable: null
		};
	},
	/**
	 * Setup function to initialize route parameters.
	 */
	setup() {
		const route = useRoute(); // Get current route
		let gameId: any = ref(route.params.GameId); // Reactive reference for game ID
		let categoryId: any = ref(route.params.CategoryId); // Reactive reference for category ID
		let providerId: any = ref(route.params.ProviderId); // Reactive reference for provider ID
		return {
			route,
			gameId,
			categoryId,
			providerId,
		};
	},
	/**
	 * Lifecycle hook called when the component is mounted.
	 */
	async created() {
		const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_live_casino', { useLogin: true, useScope: true });
        if (firestoreBanners?.length) {
			this.banners = firestoreBanners;
		}
    },

	mounted() {
		const emitter = this.$root?.$options?.appContext?.config?.globalProperties?.emitter;

        // Inyect composable
        const { toggleSaveToMyCasinoGames, getFavoriteGames, selectCategoryFav } =
            useFavoriteGames(this.appComponent, emitter);

        // save the refs in the component
        this.toggleSaveToMyCasinoGamesComposable = toggleSaveToMyCasinoGames;
        this.getFavoriteGamesComposable = getFavoriteGames;
        this.selectCategoryFavComposable = selectCategoryFav;
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
                this.config.casino.isLocalLiveCasino ?? this.config.casino.isLocal; // Determine if the casino is local
            this.lobbyType = this.config.casino.lobbyType; // Set lobby type
            this.config = this.config; // Set configuration
            this.limitConfig = this.config.casino.limit; // Set limit configuration
            this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
            this.urlCasinoPlay = this.config.urlCasinoPlay; // Set URL for casino play
            this.partnerG = this.appComponent.partnerG; // Set partner ID
            this.logueado = this.appComponent.session.logueado; // Set login status
            this.routes = this.config.routes; // Set application routes
            this.user_id = this.appComponent.user_id; // Set user ID
            this.auth_token = this.appComponent.tokenUser; // Set authentication token
            this.country = this.appComponent.country; // Set country

            // Load user's favorite casino games from local storage
            if (
                window.localStorage.getItem('m_c_g') !== null &&
                window.localStorage.getItem('m_c_g') !== undefined
            ) {
                var json_str: any = window.localStorage.getItem('m_c_g');
                this.myCasinoGames = JSON.parse(json_str);
            }
            this.auth_token = this.appComponent.tokenUser; // Set authentication token again
            this.lng = 'es'; // Set default language
            // Determine if "show more" button should be displayed
            if (this.total_count < this.limitConfig) {
                this.showMore = false;
            } else {
                this.showMore = true;
            }
            // Hide preload game elements
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
            this.debouncedSearch = this.debounce(
                this.searchEnter,
                this.appComponent.config['timeDebouncedSearch'] ?? 500 // Set debounce time for search
		);
	}
	// Open game if game ID is defined
	if (this.gameId != undefined) {
			this.appComponent.openLink = true;
			this.appComponent.openGame({ id: this.gameId });
		}

		window.scrollTo(0,0)
	},
	/**
	 * Methods for the component.
	 */
	methods: {
		async toggleSaveToMyCasinoGames(game) {
            // we use the composable instead of the old logic
            await this.toggleSaveToMyCasinoGamesComposable(game);
        }, // Placeholder for method to toggle saving to my casino games

        async selectCategoryFav() {
            // we use the composable instead of the old logic
            await this.selectCategoryFavComposable(2);

            console.log('gamesList desde casino.vue', this.appComponent.gamesList);
            this.gamesList = [...this.appComponent.gamesList];
            console.log('total_count desde casino.vue', this.appComponent.total_count);
            this.total_count = this.appComponent.total_count;
        }, // Placeholder for method to select favorite category
		/**
		 * Fetch casino games based on selected filters.
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
			vthis.showMore = true; // Show more games
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
					typelobby: 2, // Type of lobby
					country: this.appComponent.country, // Country
				};
				// Set mobile flag based on app component
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
						var json = response.data; // Response data
						vthis.gamesList = json.games; // Set games list
						vthis.total_count = json.total_count; // Set total count
						vthis.offset = vthis.gamesList.length; // Update offset
						vthis.limit =
							vthis.gamesList.length + vthis.limitConfig; // Update limit
						vthis.preloaderShow = false; // Hide preloader

						if (
                                    this.appComponent.session.logueado &&
                                    this.appComponent.config.activeFavoritesWithBackend != undefined &&
                                    this.appComponent.config.activeFavoritesWithBackend == true
                                ) {
                                    this.getFavoriteGamesComposable(); // Fetch favorite games if logged in
                                }
						// Hide preload game elements
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
					this.appComponent.openLink = true;
					this.appComponent.openGame({ id: this.gameId });
				}
			} else {
				// Handle case where category is selected
				if (
					this.categoryId != undefined &&
					this.categoryId != 'todos-all'
				) {
					// Hide preload game elements
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
					let onCategory = vthis.categoryId.split('-'); // Split category ID
					if (onCategory.length === 3) {
						onCategory = vthis.categoryId.split('-')[2]; // Get specific category ID
					} else if (onCategory.length === 2) {
						onCategory = vthis.categoryId.split('-')[1]; // Get specific category ID
					}
					this.optionsGames = {
						action: 'getGames2', // Action to fetch games
						partner_id: this.partnerG, // Partner ID
						category: onCategory, // Selected category
						offset: 0, // Pagination offset
						limit: vthis.limitConfig, // Limit for games
						typelobby: 2, // Type of lobby
						country: this.appComponent.country, // Country
					};
					// Set mobile flag based on app component
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
							var json = response.data; // Response data
							vthis.gamesList = json.games; // Set games list
							vthis.total_count = json.total_count; // Set total count
							vthis.offset = vthis.gamesList.length; // Update offset
							vthis.limit =
								vthis.gamesList.length + vthis.limitConfig; // Update limit
						});
					// Hide preload game elements
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
				// Handle case where gameId is defined but categoryId is not
				if (this.gameId != undefined && this.categoryId == undefined) {
					// Hide preload game elements
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
					vthis.openGame({ id: vthis.gameId }); // Open the game
				}
				// Handle case where providerId is defined but gameId and categoryId are not
				if (
					this.providerId != undefined &&
					this.gameId == undefined &&
					this.categoryId == undefined
				) {
					vthis.selections.provider = vthis.providerId; // Set selected provider
					this.optionsGames = {
						action: 'getGames2', // Action to fetch games
						partner_id: this.partnerG, // Partner ID
						category: this.category, // Selected category
						offset: 0, // Pagination offset
						limit: vthis.limitConfig, // Limit for games
						typelobby: 2, // Type of lobby
						country: this.appComponent.country, // Country
					};
					// Set mobile flag based on app component
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
							var json = response.data; // Response data
							vthis.gamesList = json.games; // Set games list
							vthis.total_count = json.total_count; // Set total count
							vthis.offset = vthis.gamesList.length; // Update offset
							vthis.limit =
								vthis.gamesList.length + vthis.limitConfig; // Update limit
						});
					// Hide preload game elements
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
					if (this.appComponent.total_count < this.limit) {
						this.showLoadMoreButton = false; // Hide load more button if no more games
					}
				}
			}
			// Fetch options for providers and categories
			var options = {
				action: 'getOptions', // Action to fetch options
				partner_id: this.partnerG, // Partner ID
				typelobby: 2, // Type of lobby
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
					var json = response.data; // Response data
					vthis.providers = json.providers; // Set providers list
					vthis.categories = json.categories; // Set categories list
					vthis.providersLength = json.providers.length; // Set providers length
					vthis.categoriesLength = json.categories.length; // Set categories length
				});
		},
		/**
		 * Open a specific game.
		 * @param game - The game object to open.
		 */
		openGame(game) {
			var vthis = this; // Reference to the component instance
			this.urlGame = ''; // Reset game URL
			this.gameSelected = game; // Set selected game
			if (this.appComponent.session.logueado) {
				this.showGame = true; // Show game if logged in
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
				// Set mobile flag based on app component
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
						'/live-casino-vivo/' + game.id
					);
				}
				// Set game content attributes
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
				this.clickButtonLogin(); // Trigger login if not logged in
			}
		},
		/**
		 * Handle search input and fetch games based on search criteria.
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
					typelobby: 2, // Type of lobby
					country: this.appComponent.country, // Country
				};
				// Set mobile flag based on app component
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
						var json = response.data; // Response data
						vthis.gamesList = json.games; // Set games list
						vthis.total_count = json.total_count; // Set total count
						vthis.offset = 0; // Reset offset
						vthis.limit = vthis.limit; // Reset limit
					});
			} else {
				// Load more games if search input is empty
				if (this.searchCommand.input.length == 0) {
					this.loadMoreGames();
				}
			}
		},
		/**
		 * Check if a game is in the user's saved favorites.
		 * @param id - The game ID to check.
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
		 * Trigger the login modal.
		 */
		clickButtonLogin() {
			this.appComponent.showModalLogin = true; // Show login modal
		},
		/**
		 * Select a category and fetch corresponding games.
		 * @param category - The selected category object.
		 */
		selectCategory(category) {
			var vthis = this; // Reference to the component instance
			this.flag = true; // General flag
			// Hide preload game elements
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
			// Show preload game bottom elements
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
				typelobby: 2, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Set mobile flag based on app component
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
				'/live-casino-vivo/categoria/' +
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
					var json = response.data; // Response data
					vthis.gamesList = json.games; // Set games list
					vthis.total_count = json.total_count; // Set total count
					vthis.offset = vthis.gamesList.length; // Update offset
					vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update limit
					vthis.noMoreGames(); // Check for no more games
					// Hide preload game elements
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
			// Determine if "show more" button should be displayed
			if (vthis.total_count < vthis.limitConfig) {
				vthis.showMore = false;
			} else {
				vthis.showMore = true;
			}
		},
		/**
		 * Load more games based on current selections.
		 */
		loadMoreGames() {
			var vthis = this; // Reference to the component instance
			this.getPreloaderLoadmore(); // Show preloader for loading more
			this.preloaderShow = true; // Show preloader
			var limit =
				this.limit < this.total_count
					? this.limit
					: this.total_count - this.limit; // Calculate limit for loading more
			this.optionsGames = {
				action: 'getGames2', // Action to fetch games
				partner_id: this.partnerG, // Partner ID
				offset: vthis.offset, // Pagination offset
				limit: vthis.limit, // Limit for games
				typelobby: 2, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Set mobile flag based on app component
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
			vthis.limitBefore =
				vthis.limitBefore <= 0 ? vthis.limitConfig : vthis.limitBefore; // Ensure limit is not negative
			if (vthis.offset < vthis.total_count) {
				// Make API request to fetch more games
				apiService
					.requestGet(
						this.urlVirtualplay + '/cms/products/games/',
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Response data
						var games = json.games; // Fetched games
						games.forEach(function (value, key) {
							vthis.gamesList.push(value); // Add games to the list
						});
						vthis.offset = vthis.gamesList.length; // Update offset
						vthis.limit = limit + vthis.limitConfig; // Update limit
						// Hide preload game elements
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
						console.log('offset:', vthis.offset); // Log current offset
						console.log('total_count:', limit); // Log total count
						if (vthis.offset >= vthis.total_count) {
							vthis.showLoadMoreButton = false; // Hide load more button if no more games
							console.log('Botón oculto, no hay más contenido.'); // Log no more content
						}
					})
					.catch((error) => {
						console.error('Error en la solicitud:', error); // Log any errors
					});
			} else {
				vthis.showMore = false; // Hide "show more" button if no more games
				console.log('Botón oculto, no hay más contenido.'); // Log no more content
				// Hide preload game elements
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
		 * Select a provider and fetch corresponding games.
		 * @param name - The provider name.
		 * @param img - The provider image.
		 * @param name2 - Alternate provider name.
		 */
		selectProvider(name: any, img: any, name2: any) {
			var vthis = this; // Reference to the component instance
			this.flag = true; // General flag
			// Show preload game top elements
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
			// Hide preload game bottom elements
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
				vthis.selections.provider = name2; // Set alternate provider name
			}
			this.optionsGames = {
				action: 'getGames2', // Action to fetch games
				partner_id: this.partnerG, // Partner ID
				provider: '', // Selected provider
				offset: 0, // Pagination offset
				limit: vthis.limitConfig, // Limit for games
				typelobby: 2, // Type of lobby
				country: this.appComponent.country, // Country
			};
			// Set mobile flag based on app component
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
				'/live-casino-vivo/proveedor/' + name
			);
			// Make API request to fetch games
			apiService
				.requestGet(
					this.urlVirtualplay + '/cms/products/games/',
					this.optionsGames
				)
				.then((response: any) => {
					var json = response.data; // Response data
					vthis.gamesList = json.games; // Set games list
					vthis.total_count = json.total_count; // Set total count
					vthis.offset = vthis.gamesList.length; // Update offset
					vthis.limit = vthis.gamesList.length + vthis.limitConfig; // Update limit
					vthis.noMoreGames(); // Check for no more games
					// Hide preload game elements
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
					if (vthis.offset >= vthis.total_count) {
						vthis.showLoadMoreButton = false; // Hide load more button if no more games
					}
					if (vthis.offset < vthis.total_count) {
						vthis.showLoadMoreButton = true; // Show load more button if more games available
					}
				});
			vthis.showMore = true; // Show "show more" button
		},
		/**
		 * Check if there are no more games to display.
		 */
		noMoreGames() {
			var vthis = this; // Reference to the component instance
			if (vthis.gamesList.length <= 0) {
				// Hide preload game top elements
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
				// Hide preload game bottom elements
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
		 * Open the search interface.
		 */
		OpenSearchV3() {
			this.openSearchv3 = true; // Show search interface
		},
		/**
		 * Close the search interface.
		 */
		CloseSearchV3() {
			this.openSearchv3 = false; // Hide search interface
		},
		/**
		 * Scroll left in the casino navigation.
		 */
		leftScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scroll right in the casino navigation.
		 */
		rightScroll() {
			(
				document.querySelector('.left-column-casino-nav>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Scroll left in the providers navigation.
		 */
		leftScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft -= 50; // Scroll left by 50 pixels
		},
		/**
		 * Scroll right in the providers navigation.
		 */
		rightScrollProviders() {
			(
				document.querySelector('.providers-nav-casino>ul') as any
			).scrollLeft += 50; // Scroll right by 50 pixels
		},
		/**
		 * Toggle the visibility of the providers section.
		 */
		openProviders() {
			this.provOpen = !this.provOpen; // Toggle provider section visibility
		},
		/**
		 * Placeholder for loading more preloader.
		 */
		getPreloaderLoadmore() {},
		/**
		 * Filter providers based on the selected filter.
		 * @param filter - The filter string.
		 * @returns The title of the selected provider.
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
		 * Close the currently opened game.
		 */
		closeGame() {
			this.showGame = false; // Hide game
			window.history.pushState('', '', '/live-casino-vivo'); // Reset browser history
			this.gameId = undefined; // Reset game ID
		},
		/**
		 * Debounce function to limit the rate of function calls.
		 * @param func - The function to debounce.
		 * @param wait - The wait time in milliseconds.
		 * @returns A debounced version of the function.
		 */
		debounce(func, wait) {
			let timeout; // Timeout reference
			return function (...args) {
				const later = () => {
					clearTimeout(timeout); // Clear timeout
					func.apply(this, args); // Call the original function
				};
				clearTimeout(timeout); // Clear previous timeout
				timeout = setTimeout(later, wait); // Set new timeout
			};
		},
	},
    computed: {
        analyticsAttrs() {
            let categoryName = 'LiveCasinoLobby'
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
	<section
		v-if="appComponent.contingencyCasino"
		class="flex justify-center items-center py-2"
	>
		<!-- Main container for the contingency casino section -->
		<div class="h-full w-full">
			<section
				class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center"
			>
				<!-- Top gradient overlay -->
				<div
					class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"
				></div>
				<div
					class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center"
				>
					<!-- Container for the message and button -->
					<div
						class="flex flex-col gap-8 justify-center items-center mt-10 xl:mt-0"
					>
						<!-- Message displayed in the contingency casino section -->
						<p
							class="text-neutral text-xl md:text-3xl max-w-[700px] text-center"
							v-html="$t(config.contingencyCasino.message)"
						></p>
						<!-- Router link button, displayed if button configuration is available -->
						<RouterLink
							v-if="
								config.contingencyCasino !== undefined &&
								config.contingencyCasino.button !== undefined &&
								config.contingencyCasino.button.url !=
									undefined &&
								config.contingencyCasino.button.text !=
									undefined
							"
							:to="config.contingencyCasino.button.url"
							class="text-shadow-xl rounded-full bg-gradient-to-b from-primary-content to-primary-content/60 text-neutral uppercase font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
						>
							{{ $t(config.contingencyCasino.button.text) }}
						</RouterLink>
					</div>
					<!-- Image displayed in the contingency casino section -->
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
				<!-- Background image for the contingency casino section -->
				<img
					v-if="
						config.contingencyCasino !== undefined &&
						config.contingencyCasino.imgBackground !== undefined
					"
					:src="config.contingencyCasino.imgBackground"
					alt=""
					class="absolute w-full h-full object-cover z-10"
				/>
				<!-- Bottom gradient overlay -->
				<div
					class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute z-10 -bottom-0"
				></div>
			</section>
		</div>
	</section>

	<div
		v-if="
			!appComponent.contingencyCasino &&
			appComponent.liveCasinoEnabled
		"
		class="asd"
		:class="
			appComponent.config.layout == 6
				? 'flex flex-col justify-start items-center gap-8 lg:gap-10 h-full w-full px-4 pt-4 lg:px-10 lg:pt-10'
				: ''
		"
		v-for="component in components"
		:key="component.id"
	>
		<!-- Dynamically rendered component based on the configuration -->
		<component
			:is="component.id"
			:images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
			:data="['CasinoGames', 'JackpotsContainer', 'CarouselCategoryProviderCards', 'AccessMenuWidget'].includes(component.id) ?  component.data2 :  component.data "
			:shadow="component.shadow"
			:url="component.url"
			:title="component.title"
			:category="component.category"
			:typelobby="component.typelobby"
			:limit="component.limit"
			:top="component.top"
			:type="component.type"
			:id="component.id"
			:keySlide="component.keySlide"
			:icon="component.icon"
			:styleVersion="component.styleVersion"
		>
			>
		</component>
	</div>

	<div id="casino-wrapper-disabled" v-if="!appComponent.liveCasinoEnabled">
		<!-- Container for the alert message when the live casino is disabled -->
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
			config.layout != 3 &&
			!appComponent.contingencyCasino &&
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
				appComponent.liveCasinoEnabled &&
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
											<searchIcon
												:fill="'#a7a7a7'"
												:width="15"
												:height="15"
												class="absolute top-3 left-3"
											></searchIcon>
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
												:title="
													$t('Buscar un juego...')
												"
												v-model="searchCommand.input"
												@input="debouncedSearch"
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
									class="rounded-3xl bg-primary text-neutral font-bold py-2 px-7 block"
									v-bind:class="{
										' hover:bg-primary-focus blob':
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
									class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob"
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
														class="inline-block w-10 h-12 text-center text-2xl"
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
																class="text-neutral"
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
															class="text-xl bottom-1 left-2 absolute text-white cursor-pointer"
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
													appComponent.myListFavoriteGame.length > 0 &&
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
														(selectCategory(
															category
														),
														appComponent.gAnalytics(
															'category_casino',
															category.title
														))
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
														'category_live',
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
										class="button float-right relative block right-0 w-7 py-6 text-center bg-gray-500 -top-3 -right-1 rounded-l-3xl shadow-md"
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
															class=""
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
															class="absolute top-3 left-3 z-10"
														></searchIcon>
														<input
															v-show="
																openSearchv3
															"
															type="text"
															id="SearchGame2"
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
													class="closed-popup-form z-[10]"
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
													'supplier_all',
													'Todos los proveedores'
												);
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block"
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
													'supplier',
													provider.title
												);
											"
											v-show="
												!selections.provider ===
												provider.title
											"
										>
											<a
												class="rounded-3xl bg-accent table font-bold py-2 px-7 block hover:blob text-neutral"
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
													class="closed-popup-form cursor-pointer"
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
                                                            v-bind="analyticsAttrs.game(game)"7
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
				<div id="lobby-casino bg-red-700">
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
															class="text-xl block my-3 relative text-center"
                                                            v-bind="analyticsAttrs.closeToggle"
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
								class="fixed-nav-wrapper-casino-view"
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
													appComponent.myListFavoriteGame.length > 0 &&
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
														class="category-icon bg-gradient-to-t from-neutral-content to-primary-content/40 border-solid border-1 border-primary-content rounded-lg p-2 w-16 h-16 m-auto"
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
														class="category-title text-neutral"
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
															fill="white"
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
										class="button float-right relative block right-0 w-7 py-6 text-center bg-gray-200 -top-3 -right-1 rounded-l-3xl shadow-md"
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
												provider.name
											"
										>
											<a
												class="rounded-3xl bg-accent text-neutral font-bold py-2 px-7 block hover:blob uppercase"
												v-bind:class="{
													'':
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
									class="providers-nav-casino closed bg-base-300"
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
															:title="
																$t(
																	'Buscar un juego...'
																)
															"
															v-model="
																searchCommand.input
															"
															@input="
																debouncedSearch
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
																game.icon_3 +
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
								v-if="!showLoadMoreButton"
								class="new-casino-no-games-text text-center text-neutral"
							>
								<p>
									{{ $t('No se encontraron juegos') }}
								</p>
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
	/* Sets the height to fill the parent container */
	height: 100%;
	/* Hides any overflow content */
	overflow: hidden;
	/* Ensures the background image is sized to contain */
	background-size: contain;
}

.new-lobby {
	/* Sets the background color for the new lobby */
	background: #000616;
}

.old-lobby .category-icon {
	/* Sets the width of the category icon */
	width: 40px;
	/* Centers the icon horizontally */
	margin: 0 auto;
	/* Sets the height of the category icon */
	height: 50px;
}

.old-lobby li.category-list {
	/* Prevents the list item from floating */
	float: none;
	/* Displays the list item as an inline-block element */
	display: inline-block;
	/* Ensures padding and border are included in the element's total width and height */
	box-sizing: border-box;
	/* Sets the text color for the category list items */
	color: #fbf2df;
	/* Sets the font size and line height */
	font:
		13px/16px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Adds a transition effect for color changes */
	transition: color 250ms;
	/* Prevents text from wrapping to the next line */
	white-space: nowrap;
	/* Adds ellipsis for overflow text */
	text-overflow: ellipsis;
	/* Hides overflow content */
	overflow: hidden;
	/* Adds horizontal padding */
	padding: 0 2%;
	/* Adds margin below each list item */
	margin-bottom: 5px;
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
	max-width: 200px; /* Sets maximum width for the control navigation */
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
	background: hsl(var(--b3)) !important; /* Sets background color when closed */
	animation: provider-closed-animate-b 280ms ease; /* Applies animation when closed */
}

/* Styles for the top preload game list in the casino lobby */
.old-lobby li.list-games-casino-view-b.preload-game-top,
  /* Styles for the casino game list items in the old lobby */
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
}

/* Styles for the casino games list box and its children */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
	width: 100%; /* Full width for responsive design */
	box-sizing: border-box; /* Include padding and border in element's total width */
}

/* Styles for the overall casino games list */
.old-lobby .all-games-casino-list {
	box-sizing: border-box; /* Include padding and border in element's total width */
	width: 100%; /* Full width for responsive design */
	padding: 0; /* No padding */
	min-height: 750px; /* Minimum height for the list */
	margin-bottom: 10px; /* Space below the list */
}

/* Styles for the grid layout of the casino games list */
.old-lobby .all-casino-games-list-box > div > ul {
	display: grid !important; /* Use grid layout */
	grid-template-columns: repeat(
		auto-fill,
		minmax(180px, 1fr)
	); /* Responsive column layout */
	grid-gap: 16px; /* Space between grid items */
	grid-auto-rows: minmax(129px, auto); /* Minimum height for grid rows */
	grid-auto-flow: dense; /* Fill the grid efficiently */
}

/* Styles for the game list in the old lobby section */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
	width: 100% !important; /* Ensures full width of the container */
	height: 100% !important; /* Ensures full height of the container */
	border-radius: 6px; /* Rounds the corners of the elements */
}

/* Before pseudo-element for the game image box, used for overlay effects */
.old-lobby .game-img-box-b:before {
	content: ''; /* Empty content for the pseudo-element */
	display: block; /* Makes the pseudo-element a block element */
	position: absolute; /* Positions it absolutely within the parent */
	top: 0; /* Aligns to the top */
	left: 0; /* Aligns to the left */
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	z-index: 88; /* Places it above other elements */
	background: #171a22 ed; /* Background color with a slight transparency */
	opacity: 0; /* Initially hidden */
	transition: opacity 0.8s; /* Smooth transition for opacity changes */
}

/* Styles for the game image box */
.old-lobby .game-img-box-b {
	float: left; /* Floats the element to the left */
	width: 100%; /* Full width of the container */
	background-size: cover; /* Ensures the background image covers the box */
	background-repeat: no-repeat; /* Prevents background image from repeating */
	background-position: 50% 50%; /* Centers the background image */
	height: 114px; /* Fixed height for the image box */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	position: relative; /* Sets the positioning context for absolute children */
	display: block; /* Makes it a block element */
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
	animation: popup-enter 0.3s ease-in-out; /* Applies animation for entering the view */
	transform: translate3d(
		0,
		0,
		0
	); /* Enables hardware acceleration for smoother rendering */
}

.old-lobby .wrapper-separator-games {
	/* Wrapper for separating game sections */
	width: 100%; /* Full width of the parent container */
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
	/* Aligns the element to the left and sets full width */
	float: left;
	width: 100%;
	/* Ensures padding is included in the total width calculation */
	box-sizing: border-box;
	/* Sets padding for the element */
	padding: 0 15px 0 8px;
	/* Sets a fixed height for the element */
	height: 28px;
	/* Resets background to transparent */
	background: 0 0;
	/* Sets font properties including size, line height, and family */
	font:
		12px/28px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Makes the font bold */
	font-weight: 700;
	/* Sets the text color */
	color: #fbf2df;
	/* Removes text decoration */
	text-decoration: none;
	/* Allows text to wrap normally */
	white-space: unset;
	/* Handles text overflow with ellipsis */
	text-overflow: ellipsis;
	/* Positions the element relative to its normal position */
	position: relative;
	/* Sets the stacking order of the element */
	z-index: 22;
	/* Sets the initial opacity for fade-in effect */
	opacity: 0;
	/* Smooth transition for opacity change */
	transition: opacity 2s;
	/* Centers the text within the element */
	text-align: center;
	/* Removes bottom margin */
	margin-bottom: 0;
}

/* Styles for the favorite icon view within the old lobby */
.old-lobby .favorite-icon-view {
	width: 24px; /* Set the width of the icon */
	height: 16px; /* Set the height of the icon */
	position: absolute; /* Position the icon absolutely within its container */
	right: 0; /* Align the icon to the right */
	top: 6px; /* Position the icon 6px from the top */
	font: 14px/16px FontAwesome; /* Use FontAwesome font with specified size and line height */
	color: #88be86; /* Default color for the icon */
	font-style: normal; /* Normal font style */
	text-decoration: none; /* Remove text decoration */
	z-index: 88; /* Set stacking order */
	transition: color 250ms; /* Smooth transition for color changes */
	display: block; /* Display as a block element */
	text-align: center; /* Center align the icon */
}

/* Change color for active or hovered favorite icon */
svg.favorite-icon-view.active,
svg.favorite-icon-view:hover {
	color: #00d30a; /* Change color to bright green when active or hovered */
}

/* Styles for casino resize buttons within the old lobby */
.old-lobby .casino-resize-buttons > div button span {
	width: 100%; /* Full width of the parent element */
	height: 100%; /* Full height of the parent element */
	display: block; /* Display as a block element */
	overflow: hidden; /* Hide overflow content */
	text-overflow: ellipsis; /* Show ellipsis for overflowing text */
	padding: 0 12px; /* Horizontal padding */
	box-sizing: border-box; /* Include padding in width and height calculations */
}

/* Styles for the old lobby section */
.old-lobby .favorite-icon-view:before {
	/* Adds a font icon before the favorite icon view */
	content: '\f005';
}

/* Styles for casino resize buttons within the old lobby */
.old-lobby .casino-resize-buttons > div button {
	/* Sets the width of the button to 80% and defines font properties */
	width: 80%;
	font:
		12px/29px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0 auto; /* Centers the button horizontally */
}

/* Additional styles for casino resize buttons */
.old-lobby .casino-resize-buttons > div button {
	height: 30px; /* Sets the height of the button */
	display: block; /* Makes the button a block element */
	width: 100%; /* Sets the button width to 100% */
	padding: 0; /* Removes padding */
	border: 0; /* Removes border */
	-webkit-border-radius: 5px; /* Applies border radius for WebKit browsers */
	-moz-border-radius: 5px; /* Applies border radius for Mozilla browsers */
	border-radius: 5px; /* Applies border radius */
	opacity: 0; /* Sets initial opacity to 0 for fade-in effect */
	transition: opacity 500ms; /* Smooth transition for opacity change */
	background: linear-gradient(
		to bottom,
		#00ff14,
		#006208
	); /* Gradient background */
	font-weight: bold !important; /* Makes font bold */
	color: white; /* Sets text color to white */
	font:
		12px/30px Quicksand,
		Arial,
		Helvetica,
		sans-serif; /* Defines font properties */
	text-transform: uppercase; /* Transforms text to uppercase */
	cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Styles for buttons within the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of its container */
	font: /* Define font properties for the button text */
		12px/29px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	margin: 0 auto; /* Center the button horizontally */
}

/* Container for casino resize buttons */
.old-lobby .casino-resize-buttons {
	display: block; /* Display as a block element */
	width: 100%; /* Full width of the parent container */
	position: absolute; /* Positioned absolutely within the parent */
	height: 60px; /* Fixed height for the container */
	text-align: center; /* Center text within the container */
	top: 0; /* Align to the top of the parent */
	left: 0; /* Align to the left of the parent */
	right: 0; /* Align to the right of the parent */
	margin: 0; /* No margin */
	z-index: 90; /* Layering order for stacking context */
}

/* Hover effect for game image box */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
	opacity: 1; /* Fully opaque on hover */
}

/* Adjust margin for paragraph within casino resize buttons on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
	margin-bottom: 35px !important; /* Override margin to 35px on hover */
}

/* Styles for the old lobby game list in the casino view on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
	/* Resets the button position on hover */
	transform: translateX(0);
}

/* Changes the border color of the anchor element on hover */
.old-lobby .list-games-casino-view-b:hover > a {
	/* Sets the border color to a specific shade of orange */
	border-color: #fea402;
}

/* Styles for the play now button span on hover */
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

/* Styles for the game list item when it spans two rows and two columns */
.old-lobby .list-games-casino-view-b.rows-2 {
	/* Specifies the grid layout for the item */
	grid-column: span 2; /* Spans across 2 columns */
	grid-row: span 2; /* Spans across 2 rows */
	width: 100% !important; /* Forces width to 100% */
	height: 100% !important; /* Forces height to 100% */
}

/* Keyframes for the pulse animation effect used in the casino lobby */
@keyframes pulseCasino {
	0% {
		transform: scale(1); /* Initial scale of the element */
		box-shadow: 0 0 0 0 #ff9600; /* Initial box shadow with no spread */
	}
	70% {
		transform: scale(1); /* Maintain scale during the animation */
		box-shadow: 0 0 0 7px #0c1019 0; /* Box shadow with spread at 70% */
	}
	100% {
		transform: scale(1); /* Final scale of the element */
		box-shadow: 0 0 0 0 #ff9600 40; /* Reset box shadow to initial state */
	}
}

/* Styles for the neon effect in the old lobby section */
.old-lobby .neon1 {
	border: 2px solid #dc8200; /* Border color for the neon effect */
	animation: pulseCasino 2s infinite; /* Apply the pulse animation */
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
		/* No specific styles defined for .old-lobby at this breakpoint */
	}

	.old-lobby .wrapper-separator-games {
		float: none; /* Disable floating for the separator */
		margin-top: 20px; /* Add top margin for spacing */
		overflow-y: scroll; /* Enable vertical scrolling */
		height: calc(100% - 110px); /* Set height based on viewport */
	}

	.old-lobby .left-column-casino-nav > ul > li {
		/* No specific styles defined for list items in the navigation */
	}
}

/* Media query for screens with a maximum width of 416px */
@media only screen and (max-width: 416px) {
	/* Styles for game list items in old lobby */
	.old-lobby .list-game-width-100,
	.old-lobby .list-games-casino-view-b.rows-2 {
		/* Span one column and one row in the grid layout */
		grid-column: span 1;
		grid-row: span 1;
	}

	/* Styles for the casino games list box */
	.old-lobby .all-casino-games-list-box > div > ul {
		/* Set minimum row height and define column layout */
		grid-auto-rows: minmax(120px, auto);
		grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
	}
}

/* Fill colors for Poker category list items in old lobby */
.old-lobby .category-list.Poker .st0 {
	/* Color for the first state */
	fill: #d8d6ce;
}

.old-lobby .category-list.Poker .st1 {
	/* Color for the second state */
	fill: #eae9e5;
}

.old-lobby .category-list.Poker .st2 {
	/* Color for the third state */
	fill: #b99028;
}

.old-lobby .category-list.Poker .st3 {
	/* Color for the fourth state */
	fill: #656d78;
}

.old-lobby .category-list.Poker .st4 {
	/* Color for the fifth state */
	fill: #af8527;
}

/* Styles for the casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
	height: 100%; /* Set height to 100% of the parent element */
}

/* Styles for the game image box in the old lobby with 2 columns */
.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
	height: 100% !important; /* Force height to 100% overriding other styles */
}

/* Styles for the divs inside casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
	width: 100%; /* Set width to 100% of the parent element */
}

/* Styles for the favorite icon view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
	width: 25px; /* Set width of the favorite icon */
	height: 25px; /* Set height of the favorite icon */
	font-size: 30px; /* Set font size for the favorite icon */
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

.old-lobby .left-column-casino-nav > ul {
	/* Sets the width to 100% and applies box-sizing for consistent sizing */
	width: 100%;
	box-sizing: border-box;
	/* Displays the list as a block element */
	display: block;
	/* Prevents text from wrapping to the next line */
	white-space: nowrap;
	/* Adds padding to the top of the list */
	padding-top: 10px;
}

.old-lobby .left-column-casino-nav > ul {
	/* Enables horizontal scrolling while hiding vertical overflow */
	overflow-x: auto;
	overflow-y: hidden;
}

.old-lobby .left-column-casino-nav > ul > li {
	/* Resets float and displays list items inline */
	float: none;
	display: inline-block;
	/* Applies box-sizing for consistent sizing */
	box-sizing: border-box;
	/* Sets text color */
	color: #fbf2df;
	/* Defines font properties including size, line height, and font family */
	font:
		13px/15px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Adds a transition effect for color changes */
	transition: color 250ms;
	/* Prevents text from wrapping and adds ellipsis for overflow */
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	/* Adds horizontal padding and margin to the list items */
	padding: 0 2%;
	margin-bottom: 5px;
	/* Aligns items to the top and changes cursor to pointer on hover */
	vertical-align: top;
	cursor: pointer;
}

/* Styles for the search block in the old lobby section */
.old-lobby #searchv3 .block-search {
	height: 35px !important; /* Sets the height of the search block */
	min-width: 55px !important; /* Minimum width of the search block */
	background: transparent; /* Background is transparent */
	width: 100% !important; /* Full width of the parent container */
	max-width: 100% !important; /* Maximum width of the search block */
	margin: 0 !important; /* No margin around the search block */
	border: 1px solid #a7a7a7; /* Light gray border */
	border-radius: 40px; /* Rounded corners */
}

/* General styles for the search block in the old lobby section */
.old-lobby .block-search {
	padding: 0; /* No padding inside the search block */
	min-width: 35px; /* Minimum width of the search block */
	margin: 5px 5px 0 0; /* Margin on the top and right */
	height: 30px; /* Sets the height of the search block */
	border-radius: 3px; /* Slightly rounded corners */
	background: #fff; /* White background */
}

/* Additional styles for positioning the search block */
.old-lobby .block-search {
	float: right; /* Aligns the search block to the right */
	position: relative; /* Sets positioning context for child elements */
	z-index: 1; /* Stacking order of the search block */
	text-align: right; /* Aligns text to the right */
	max-width: 250px; /* Maximum width of the search block */
}

.old-lobby li#searchv3 input#SearchGame {
	/* Disable transition effects for the search input */
	transition: none !important;
	/* Change cursor to pointer to indicate clickable element */
	cursor: pointer !important;
}

.old-lobby input#SearchGame.ng-hide {
	/* Set width to 0 when the input is hidden */
	width: 0;
	/* Animate width change over 1 second */
	transition: width 1s;
	/* Ensure the input is displayed as a block element */
	display: block !important;
	/* Float the input to the right */
	float: right;
	/* Remove border */
	border: 0;
}

.old-lobby .block-search input[type='text'] {
	/* Set text color for the search input */
	color: #686767;
	/* Define font properties for the input */
	font:
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Remove default margin */
	margin: 0;
	/* Add padding for the input */
	padding: 8px 5px 8px 30px;
	/* Set background to transparent */
	background: 0 0;
	/* Position relative for potential absolute positioning of child elements */
	position: relative;
	/* Set stacking context */
	z-index: 22;
}

.old-lobby .block-search input[type='text'] {
	/* Set initial width to 0 */
	width: 0;
	/* Remove border */
	border: 0;
	/* Align input vertically in the middle */
	vertical-align: middle;
	/* Animate width change over 600 milliseconds */
	transition: width 600ms;
	/* Add rounded corners to the input */
	border-radius: 3px;
}

/* Styles for the search input field in the open state of the search block */
.old-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width of the container */
	padding: 0 0 0 60px !important; /* Padding to the left for text alignment */
	height: 100%; /* Full height of the container */
	color: #fff; /* Text color set to white */
}

/* Container for the search results, positioned relative for absolute children */
.old-lobby .search-results-inner {
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the container */
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

/* Styles for the sport arrow element */
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

/* Additional styles for h3 elements to control layout and alignment */
.old-lobby .search-results-inner h3 {
	width: /* Full width of the container */ 100%;
	float: /* Float left to align with other elements */ left;
	padding: /* No padding around the heading */ 0;
	text-indent: /* Indent text for better readability */ 10px;
	text-align: /* Align text to the left */ left;
}

/* Styles for various components in the old lobby */
.old-lobby #result-search, /* Search results container */
.old-lobby .bet-container, /* Container for betting options */
.old-lobby .block-more-event, /* Block for additional events */
.old-lobby .clock .open-lang ul, /* Language selection in the clock section */
.old-lobby .conteiner-goals .hover-sp, /* Goals container with hover effect */
.old-lobby .deposit-alert-contain.casino .games-slider ul, /* Games slider in the deposit alert section */
.old-lobby .express-contain, /* Container for express betting options */
.old-lobby .fedback-info ul li textarea, /* Textarea for feedback information */
.old-lobby .form-contain.deposit .form-sign-in /* Sign-in form within the deposit container */
  /* Styles for various elements within the old lobby section */
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

/* Styles for the casino search results container */
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
	/* Styles for the no results message in the old lobby */
	font:
		16px/38px Quicksand,
		/* Font size and line height with fallback fonts */ Arial,
		Helvetica,
		sans-serif;
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding for spacing */
	box-sizing: border-box; /* Includes padding in width calculation */
}

.old-lobby .search-no-results {
	/* Additional styles for the no results message */
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
	float: left; /* Aligns the menu to the left */
	width: 20px; /* Fixed width for the menu */
	padding: 13px 5px 13px 5px; /* Padding for spacing */
	background: #2e3244; /* Background color */
	color: #fff; /* Text color */
	position: absolute; /* Positions the menu absolutely */
	left: 0; /* Aligns the menu to the left of the parent */
	display: block; /* Displays the menu */
	z-index: 9; /* Stacking order for the menu */
}

/* Styles for the right providers menu in the old lobby */
.old-lobby #menuRightProviders {
	float: right; /* Aligns the menu to the right */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: #2e3244; /* Background color of the menu */
	color: #fff 7; /* Text color (note: '7' seems to be an error) */
	position: absolute; /* Positions the menu absolutely within its container */
	right: 0; /* Aligns the menu to the right edge */
	display: block; /* Displays the menu as a block element */
	z-index: 9; /* Sets the stacking order of the menu */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Hides the home slider in the old lobby */
	.old-lobby div#home-slider {
		display: none; /* Hides the element */
	}

	/* Styles for all games category list */
	.old-lobby li.category-list.all-games {
		float: none !important; /* Overrides float property to stack vertically */
	}

	/* Styles for the left menu in the old lobby */
	.old-lobby #menuLeft {
		float: left; /* Aligns the menu to the left */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the menu */
		color: #fff 7; /* Text color (note: '7' seems to be an error) */
		position: absolute; /* Positions the menu absolutely within its container */
		left: 0; /* Aligns the menu to the left edge */
		display: block; /* Displays the menu as a block element */
		z-index: 0; /* Sets the stacking order of the menu */
	}

	/* Styles for the right menu in the old lobby */
	.old-lobby #menuRight {
		float: right; /* Aligns the menu to the right */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: #262a3a; /* Background color of the menu */
		color: #fff 7; /* Text color (note: '7' seems to be an error) */
		position: absolute; /* Positions the menu absolutely within its container */
		right: 0; /* Aligns the menu to the right edge */
		display: block; /* Displays the menu as a block element */
		z-index: 0; /* Sets the stacking order of the menu */
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

/* Media query for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
	/* Adjusts the height of SVG icons in the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul > li svg {
		height: 35px !important; /* Forces the height to 35px */
	}
}

/* Styles for the casino content area in the old lobby */
.old-lobby div#casino-content {
	height: 100% !important; /* Forces the height to 100% */
	padding-bottom: 0 !important; /* Removes bottom padding */
}

/* Styles for the Casino Slider Box within the lobby casino */
.old-lobby #lobby-casino div#CasinoSliderBox {
	border-radius: 0 0 35px 35px; /* Rounds the bottom corners */
	width: 91%; /* Sets the width to 91% of the parent container */
	margin: 0 auto; /* Centers the slider box horizontally */
	overflow: hidden; /* Hides any overflow content */
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
	transition: 300ms; /* Smooth transition for the hover effect */
}

/* Styles for active category icons within the Populares section */
.old-lobby .Populares.active .category-icon svg {
	fill: url(#SVGID_hot) #ffc107; /* Fill color for active category icons */
}

/* Styles for category icons on hover within list items */
.old-lobby li:hover .category-icon svg {
	fill: url(#SVGID_slots3) #ffc107; /* Fill color on hover for list items */
	transform: scale(1.1); /* Scale effect on hover */
	transition: 300ms; /* Smooth transition for the hover effect */
}

/* Styles for active category icons within list items */
.old-lobby li.active .category-icon svg {
	fill: url(#SVGID_slots3) #ffc107; /* Fill color for active list item category icons */
}

/* Default styles for category icons within list items */
.old-lobby li .category-icon svg {
	fill: #787f90; /* Default fill color for category icons in list items */
}

/* Styles for the all-games category list item */
.old-lobby li.category-list.all-games {
	border-left: 2px solid #ff9600; /* Left border for the all-games category */
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
	/* Styles for the fixed navigation wrapper when it becomes scrollable */
	position: fixed; /* Fixes the element to the viewport */
	top: 0; /* Positions it at the top */
	max-width: inherit; /* Inherits the maximum width from the parent */
	z-index: 99; /* Sets a lower stacking order than .scrollable-fixed */
	width: 100%; /* Ensures full width */
	background: hsl(var(--bc)) !important; /* Ensures background color is applied */
	padding-top: 0; /* Removes any top padding */
}

.old-lobby .fixed-element-parent .scrollable-fixed {
	/* Styles for scrollable fixed elements within the fixed element parent */
	position: fixed; /* Fixes the element to the viewport */
	z-index: 400; /* Sets a higher stacking order for visibility */
}

.old-lobby .sticky {
	/* Styles for sticky elements that remain fixed at the top */
	position: fixed; /* Fixes the element to the viewport */
	top: 0; /* Positions it at the top */
	width: 100%; /* Ensures full width */
}

/* Styles for the fixed navigation wrapper in the casino view */
.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed:before {
	content: ''; /* Empty content for the pseudo-element */
	display: block; /* Display as a block element */
	position: absolute; /* Positioned absolutely within the parent */
	height: 3px; /* Height of the line */
	width: 100%; /* Full width of the parent */
	left: 0; /* Align to the left */
	top: -3px; /* Position above the parent */
	background: hsl(var(--bc)); /* Dark background color */
}

/* Cursor style for clickable elements in the old lobby */
.old-lobby [ng-click],
.old-lobby [ng-mousedown] {
	cursor: pointer; /* Change cursor to pointer for interactivity */
}

/* Container for all casino games */
.old-lobby .all-casino-games-box {
	width: 100%; /* Full width of the container */
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

/* Media query for responsive design (currently empty) */
@media screen and (max-width: 1260px) {
}

/* Styles for the load more button in the casino games section */
.old-lobby .more-casino-games-load-b {
	float: left; /* Aligns the button to the left */
	width: 100%; /* Full width for the button */
	margin: 30px 0; /* Vertical margin for spacing */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-align: center; /* Centers the text inside the button */
	padding: 0 0 0 10px; /* Padding on the left */
	transform: translate3d(
		0,
		0,
		0
	); /* Enables hardware acceleration for smoother rendering */
}

/* Styles for the paragraph element within the more-casino-games-load-b class in the old-lobby */
.old-lobby .more-casino-games-load-b > p {
	font: /* Font settings including size, line height, and font family */
		14px/38px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	font-weight: 700; /* Bold font weight */
	color: hsl(var(--n)); /* Text color */
	transition: /* Transition effects for color and border */
		color 260ms,
		border 260ms;
	border: 1px solid hsl(var(--p)); /* Border styling */
	height: 37px; /* Fixed height */
	text-transform: uppercase; /* Uppercase text transformation */
	background-color: hsl(var(--p)); /* Background color */
	border-radius: 30px; /* Rounded corners */
	width: 300px; /* Fixed width */
	margin: 0 auto; /* Centering the element */
}

/* Hover effects for the paragraph element */
.old-lobby .more-casino-games-load-b > p:hover {
	background-color: hsl(var(--pf)); /* Change background color on hover */
	color: hsl(var(--n)); /* Change text color on hover */
	cursor: pointer; /* Change cursor to pointer on hover */
}

/* Styles for the span element within the paragraph */
.old-lobby .more-casino-games-load-b > p > span {
	display: inline-block; /* Inline block display */
	padding: 0; /* No padding */
	text-align: center; /* Center text alignment */
	position: relative; /* Relative positioning */
}

/* Styles for the old lobby section */
.old-lobby .big-games-overflow {
	/* Full width and height, fixed position to cover the entire viewport */
	width: 100%;
	overflow: hidden; /* Prevents overflow of content */
	position: fixed; /* Fixed positioning to stay in place during scrolling */
	left: 0; /* Aligns to the left edge */
	top: 0; /* Aligns to the top edge */
	height: 100%; /* Full height of the viewport */
	z-index: 999999999999; /* High z-index to ensure it appears above other elements */
}

.old-lobby .div-logo-j img {
	/* Ensures the logo image takes the full height of its container */
	height: 100%;
}

.old-lobby .big-game-background {
	/* Container for the background of the big game section */
	padding: 0; /* No padding */
	display: table; /* Allows for table layout behavior */
	height: 100%; /* Full height of the parent container */
	max-height: 100%; /* Prevents exceeding the height of the parent */
	position: absolute; /* Positioned relative to the nearest positioned ancestor */
}

.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Both classes share the same layout properties */
	float: left; /* Floats elements to the left */
	width: 100%; /* Full width of the parent container */
	padding: 0; /* No padding */
	height: 100%; /* Full height of the parent container */
}

/* Styles for the old lobby section */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Ensures the background covers the entire area */
	background-size: cover !important;
	/* Sets the background color to black */
	background: black;
}

/* Centering casual game container */
.old-lobby .casual-game {
	/* Centers the element horizontally */
	margin: 0 auto;
	/* Displays the element as a table for layout purposes */
	display: table;
}

/* Styles for the casino game container */
.old-lobby .casino-game-contain {
	/* Sets a minimum height for the container */
	min-height: 300px;
	/* Full width of the parent */
	width: 100%;
	/* No padding */
	padding: 0;
	/* Displays as a table cell */
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
	/* Removes border */
	border: none;
	/* Removes border radius */
	border-radius: 0;
	/* Removes box shadow */
	box-shadow: none;
}

/* Additional styles for flash game container */
.old-lobby .flash-game-contain {
	/* Sets a minimum width */
	min-width: 300px;
	/* Adds margin around the container */
	margin: 5px;
	/* Centers text within the container */
	text-align: center;
	/* Displays as an inline-block for layout */
	display: inline-block;
	/* Positions the container relative to its normal position */
	position: relative;
	/* Aligns the container to the top */
	vertical-align: top;
	/* Hides overflow content */
	overflow: hidden;
	/* Sets a minimum height */
	min-height: 100px;
}

/* Styles for the big game control section in the old lobby */
.old-lobby .big-game-control {
	right: 0; /* Aligns the control to the right */
	float: right; /* Floats the element to the right */
	display: inline-block; /* Allows the element to be inline with other elements */
	width: 100%; /* Sets the width to 100% of the parent container */
	text-align: right; /* Aligns text to the right */
	position: absolute; /* Positions the element absolutely within the nearest positioned ancestor */
	background: #0c1019; /* Sets the background color */
	z-index: 10; /* Sets the stacking order of the element */
}

/* Styles for the top options in the flash game container */
.old-lobby .flash-game-contain .top-options {
	display: inline-block; /* Allows the element to be inline with other elements */
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
	margin-bottom: 2px; /* Adds a small margin at the bottom */
}

/* Styles for the delete icon in the old lobby section */
.old-lobby .casino-game-contain .icon-delete {
	position: relative; /* Positions the icon relative to its normal position */
	text-indent: -9999em; /* Hides the text visually while keeping it accessible for screen readers */
}

/* Styles for the delete icon when it is in the home state */
.old-lobby .casino-game-contain .icon-delete.home a:before {
	content: '\f015'; /* FontAwesome icon for home */
	font: 23px/40px FontAwesome; /* Sets font size and line height for the icon */
	position: absolute; /* Positions the icon absolutely within the parent */
	right: 12px; /* Aligns the icon 12px from the right */
	top: -1px; /* Aligns the icon 1px above the top of the parent */
	text-indent: 0; /* Resets text indent for visibility */
}

/* Styles for the delete icon when it is marked as favorite */
.old-lobby .casino-game-contain .icon-delete.favorite a:before {
	content: '\f005'; /* FontAwesome icon for favorite */
	font: 18px/40px FontAwesome; /* Sets font size and line height for the icon */
	position: absolute; /* Positions the icon absolutely within the parent */
	right: 12px; /* Aligns the icon 12px from the right */
	top: -1px; /* Aligns the icon 1px above the top of the parent */
	text-indent: 0; /* Resets text indent for visibility */
}

/* Styles for various states of the favorite delete icon */
.old-lobby .casino-game-contain .icon-delete.favorite a,
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active,
.old-lobby .casino-game-contain .icon-delete.favorite a:hover,
.old-lobby .casino-game-contain .icon-delete.popup a,
.old-lobby .casino-game-contain .icon-delete.refresh a {
	/* Additional styles for the favorite icon in different states can be added here */
}

/* Styles for the favorite icon in the old lobby when hovered */
.old-lobby .casino-game-contain .icon-home.favorite a:hover {
	width: 40px; /* Set width on hover */
	height: 40px; /* Set height on hover */
	background: #0c1019; /* Background color on hover */
}

/* Styles for the first delete icon in the old lobby */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) a {
	width: 20px; /* Set width for the first delete icon */
	margin: 0 auto; /* Center the icon horizontally */
	text-align: center; /* Center text inside the icon */
	padding: 0; /* Remove padding */
	display: block; /* Display as block element */
	position: relative; /* Position relative for absolute positioning of children */
}

/* Styles for delete icons in the old lobby */
.old-lobby .casino-game-contain .icon-delete a {
	background: #0c1019; /* Background color for delete icons */
	width: 35px; /* Set width for delete icons */
	height: 35px; /* Set height for delete icons */
	top: 0; /* Position at the top */
	position: static; /* Static positioning */
	-webkit-border-radius: 25px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 25px; /* Rounded corners for Mozilla browsers */
	border-radius: 25px; /* Standard rounded corners */
}

/* Additional styles for delete icons in the old lobby */
.old-lobby .casino-game-contain .icon-delete a {
	z-index: 99; /* Ensure the icon is above other elements */
	display: block; /* Display as block element */
}

.old-lobby .flash-game-contain .user-div {
	/* Displays user divs inline and allows them to float left */
	display: inline-block;
	float: left;
}

.old-lobby .settings-include-contain {
	/* Floats the settings include container to the left */
	float: left;
}

.old-lobby .separator-contain-nav {
	/* Styles for the navigation separator container */
	float: left; /* Floats the separator to the left */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	padding: 0 10px; /* Adds horizontal padding */
	box-shadow: 1px 0 0 #171a22; /* Adds a shadow effect to the right */
	height: 36px; /* Sets a fixed height */
	position: relative; /* Positions the element relative to its normal position */
}

.old-lobby .settings-icon-contain.balance-box {
	/* Styles for the balance box within settings icon container */
	font-weight: 400; /* Sets font weight to normal */
	transform: inherit; /* Inherits transform property from parent */
	border: 1 ps solid #ffb124; /* Sets a solid border with a specific color */
}

.old-lobby .settings-icon-contain.balance-box,
.old-lobby .settings-icon-contain.leng-b {
	/* Common styles for balance box and length box within settings icon container */
	width: auto; /* Allows width to adjust automatically */
	text-align: left; /* Aligns text to the left */
	font: /* Sets font properties */
		15px/20px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	font-weight: 700; /* Sets font weight to bold */
	position: relative; /* Positions the element relative to its normal position */
	padding: 0 18px 0 2px; /* Adds padding to the left and right */
}

/* Container for the settings icon in the old lobby */
.old-lobby .settings-icon-contain {
	float: left; /* Aligns the icon to the left */
	height: 20px; /* Sets the height of the icon */
	cursor: pointer; /* Changes cursor to pointer on hover */
	width: 20px; /* Sets the width of the icon */
	font: 16px/20px FontAwesome; /* Sets font size and line height using FontAwesome */
	color: #fff; /* Sets the text color to white */
	text-align: center; /* Centers the text within the icon */
	margin: 8px 0 0; /* Sets top margin, no margin on sides and bottom */
	transform: rotate(0deg) translate3d(0, 0, 0); /* Initial transform state */
	transition: transform 500ms; /* Smooth transition for transform changes */
	white-space: nowrap; /* Prevents text wrapping */
	position: relative; /* Sets positioning context for child elements */
}

/* Styles for the balance box within the settings icon container */
.old-lobby .settings-icon-contain.balance-box > ul {
	float: left; /* Aligns the list to the left */
	width: 100%; /* Sets the width of the list to 100% of the container */
}

/* Styles for list items within the balance box */
.old-lobby .settings-icon-contain.balance-box > ul > li {
	width: 100%; /* Sets the width of each list item to 100% */
	text-align: left; /* Aligns text to the left */
	height: 11px; /* Sets the height of the list item */
	position: relative; /* Sets positioning context for the list item */
	z-index: 555; /* Sets stacking order for the list item */
}

/* Styles for the balance value in the settings icon container */
.old-lobby .settings-icon-contain.balance-box > ul > li span.valor {
	margin-right: 5px; /* Space to the right of the value */
	color: #fea402; /* Color of the value text */
}

/* Logo container styling within the old lobby */
.old-lobby .div-logo-j {
	float: left; /* Aligns the logo to the left */
	padding: 5px 20px; /* Padding around the logo */
	height: 37px; /* Fixed height for the logo */
}

/* Progress circular loader styling within the flash game container */
.old-lobby .flash-game-contain .md-progress-circular {
	position: absolute; /* Positioned absolutely within the container */
	top: 40%; /* Vertically centered */
	left: 50%; /* Horizontally centered */
	margin-left: -50px; /* Adjusts position to center the loader */
	z-index: 6; /* Ensures the loader is above other elements */
}

/* Theme-specific styles for the circular progress loader */
.old-lobby .md-progress-circular.md-theme {
	background: 0 0; /* Transparent background */
	animation: loader-animate-fade 1s linear; /* Fade animation for the loader */
}

/* General styles for the circular progress loader */
.old-lobby .md-progress-circular {
	width: 100px; /* Fixed width for the loader */
	height: 140px; /* Fixed height for the loader */
	display: block; /* Block display for proper alignment */
	position: inherit; /* Inherits positioning from parent */
	margin-bottom: 0 !important; /* Overrides any bottom margin */
	overflow: visible; /* Allows overflow to be visible */
	margin: 0 auto; /* Centers the loader horizontally */
	padding: 20px 0; /* Padding above and below the loader */
}

/*
 * Keyframes for the 'wobble' animation.
 * This animation creates a wobbling effect by translating and rotating an element.
 */
@keyframes wobble {
	0% {
		transform: translateX(0%); /* Initial position */
	}
	15% {
		transform: translateX(-25%) rotate(-5deg); /* Move left and rotate slightly */
	}
	30% {
		transform: translateX(20%) rotate(3deg); /* Move right and rotate slightly */
	}
	45% {
		transform: translateX(-15%) rotate(-3deg); /* Move left and rotate slightly */
	}
	60% {
		transform: translateX(10%) rotate(2deg); /* Move right and rotate slightly */
	}
	75% {
		transform: translateX(-5%) rotate(-1deg); /* Move left and rotate slightly */
	}
	100% {
		transform: translateX(0%); /* Return to initial position */
	}
}

/*
 * Styles for the circular progress spinner in the old lobby.
 * Applies an infinite rotation animation to the spinner wrapper.
 */
.old-lobby .md-progress-circular .md-spinner-wrapper {
	-webkit-animation: outer-rotate 2.91667s linear infinite; /* Animation for WebKit browsers */
	animation: outer-rotate 2.91667s linear infinite; /* Standard animation for other browsers */
}

/* Styles for the circular progress spinner in the old lobby */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner {
	/* Enables smooth transformation animations */
	will-change: transform;
	/* Animation for sporadic rotation effect */
	-webkit-animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1)
		infinite;
	animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite;
}

/* Dimensions and positioning for the inner part of the circular progress spinner */
.old-lobby .md-progress-circular .md-inner {
	width: 100px; /* Width of the spinner */
	height: 100px; /* Height of the spinner */
	position: relative; /* Positioning context for absolute children */
}

/* Gap styling for the themed circular progress spinner */
.old-lobby .md-progress-circular.md-theme .md-inner .md-gap {
	border-top-color: #ffb124; /* Top border color */
	border-bottom-color: #ffb124; /* Bottom border color */
}

/* Positioning and styling for the gap in the circular progress spinner */
.old-lobby .md-progress-circular .md-inner .md-gap {
	position: absolute; /* Absolute positioning within the spinner */
	left: 49px; /* Left offset */
	right: 49px; /* Right offset */
	top: 0; /* Top offset */
	bottom: 0; /* Bottom offset */
	border-top: 5px solid #000; /* Top border styling */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
}

/* Styles for the left part of the circular progress spinner */
.old-lobby .md-progress-circular .md-inner .md-left,
  /* Styles for the right inner part of the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-right {
	position: absolute; /* Positioning the element absolutely within its parent */
	top: 0; /* Aligns the top of the element with the top of the parent */
	height: 100px; /* Sets the height of the element */
	width: 50px; /* Sets the width of the element */
	overflow: hidden; /* Hides any overflow content */
}

/* Styles for the left inner part of the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-left {
	left: 0; /* Aligns the left of the element with the left of the parent */
}

/* Sets the border-top color for the half circles in the circular progress indicator when using the theme */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-top-color: #ffb124; /* Applies a specific color to the top border */
}

/* Sets the border-left color for the left half circle in the circular progress indicator when using the theme */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle {
	border-left-color: #ffb124; /* Applies a specific color to the left border */
}

/* Styles for the left half circle in the circular progress indicator within the old lobby */
.old-lobby
.md-progress-circular
.md-spinner-wrapper
.md-inner
.md-left
.md-half-circle,
.old-lobby
.md-progress-circular
  /* Wrapper for the spinner component */
.md-spinner-wrapper
  /* Inner part of the spinner */
.md-inner
  /* Right section of the spinner */
.md-right
  /* Half-circle animation for the spinner */
.md-half-circle {
	/* Infinite animation iteration */
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	/* Duration of the animation */
	-webkit-animation-duration: 1.3125s;
	animation-duration: 1.3125s;
	/* Timing function for smooth animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the left and right half-circles in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning and sizing of the half-circles */
	position: absolute;
	top: 0;
	width: 100px;
	height: 100px;
	box-sizing: border-box;
	/* Border properties for the half-circles */
	border-width: 15px;
	border-style: solid;
	border-color: transparent;
	/* Circular shape */
	border-radius: 50%;
}

/* Positioning for the left half-circle */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle {
	left: 0;
}

/* Styles for the right section of the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-right {
	right: 0; /* Aligns the right section to the right */
}

/* Styles for the left and right sections of the circular progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
	position: absolute; /* Positions the sections absolutely within the parent */
	top: 0; /* Aligns the sections to the top */
	height: 100px; /* Sets the height of the sections */
	width: 50px; /* Sets the width of the sections */
	overflow: hidden; /* Hides any overflow content */
}

/* Sets the border color for the right half-circle in the themed circular progress indicator */
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-right-color: #ffb124; /* Defines the right border color */
}

/* Animation for the right half-circle wobble effect */
.old-lobby
	.md-progress-circular
	.md-spinner-wrapper
	.md-inner
	.md-right
	.md-half-circle {
	-webkit-animation-name: right-wobble; /* Animation for WebKit browsers */
	animation-name: right-wobble; /* Standard animation property */
}

/* Spin animation for the inner spinner wrapper */
.old-lobby .md-spinner-wrapper .md-inner {
	-webkit-animation-name: spin !important; /* Spin animation for WebKit browsers, marked important */
	animation-name: spin !important; /* Standard spin animation, marked important */
}

/* Keyframes for spin animation across different browsers */
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
		transform: rotate(360deg); /* Standard rotation */
	}
}

/* Styles for the old lobby section with circular progress indicator */
.old-lobby
.md-progress-circular /* Circular progress indicator */
.md-spinner-wrapper /* Wrapper for the spinner */
.md-inner /* Inner part of the spinner */
.md-left /* Left section of the spinner */
.md-half-circle, /* Half-circle representation of the spinner */
.old-lobby
.md-progress-circular
.md-spinner-wrapper /* Repeated structure for the spinner in old lobby */
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
	/* Timing function for smooth animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the right half-circle in the circular progress indicator within the old lobby */
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning the right half-circle */
	right: 0;
	/* Making the left border transparent */
	border-left-color: transparent;
}

/* Styles for the left and right half-circles in the circular progress indicator within the old lobby */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Absolute positioning for overlap */
	position: absolute;
	top: 0;
	/* Dimensions of the half-circles */
	width: 100px;
	height: 100px;
	/* Box model settings */
	box-sizing: border-box;
	/* Border settings for the circular shape */
	border-width: 15px;
	border-style: solid;
	border-color: transparent;
	/* Circular shape */
	border-radius: 50%;
}

.old-lobby .add-casino-game {
	/* Background color for the casino game button */
	background: #1e2539;
	/* No shadow effects for the button */
	box-shadow: none;
	/* No text shadow for the button text */
	text-shadow: none;
	/* Text color for the button */
	color: #454a5a;
	/* Center the button horizontally with a fixed width */
	left: calc((100% - 140px) / 2);
	/* Rounded corners for the button */
	border-radius: 20%;
}

.old-lobby .add-casino-game {
	/* Positioning the button absolutely within its container */
	position: absolute;
	/* Layering the button above other elements */
	z-index: 99;
	/* Center the button vertically with a fixed height */
	top: calc((100% - 100px) / 2);
	/* Center the text within the button */
	text-align: center;
}

.old-lobby .flash-game-contain #game-content {
	/* Background color for the game content area */
	background: #0c1019;
	/* Display the game content inline-block */
	display: inline-block;
}

.old-lobby .flash-game-contain #game-content {
	/* Smooth transition for height changes */
	transition: height 200ms;
	/* Positioning the game content relatively within its container */
	position: relative;
	/* Layering the game content above other elements */
	z-index: 5;
	/* Margin to create space above the game content */
	margin-top: 55px;
	/* Hide overflow content */
	overflow: hidden;
	/* Width set to 90% of the viewport width */
	width: 90vw;
	/* Height set to 90% of the viewport height */
	height: 90vh;
}

/* Styles for the closed popup form in the search section of the old lobby */
.old-lobby li#searchv3 .closed-popup-form {
	float: right; /* Aligns the form to the right */
	position: relative; /* Positions the form relative to its normal position */
	top: 0; /* No vertical offset */
	right: 0; /* No horizontal offset */
	z-index: 1000; /* Ensures the form is above other elements */
	margin-top: -27px; /* Moves the form up by 27 pixels */
	margin-right: 14px; /* Adds a right margin of 14 pixels */
}

/* Styles for the favorite icon when active in the casino game container */
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active:before {
	color: #b5d000; /* Sets the color of the active favorite icon */
}

/* Styles for the general preloader in the old lobby */
.old-lobby .preloader-general {
	width: 100%; /* Full width of the viewport */
	background: #000; /* Black background for the preloader */
	height: 100vh; /* Full height of the viewport */
	position: absolute; /* Positions the preloader absolutely */
	left: 0; /* Aligns the preloader to the left */
	z-index: 999999999; /* Very high z-index to ensure it covers other elements */
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
	position: absolute; /* Positions the image absolutely within its container */
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
	font-weight: lighter; /* Sets the font weight of the fourth paragraph to lighter */
}

.old-lobby #casino-wrapper-disabled .message-alert span {
	font-size: 90px; /* Sets the font size of span elements within the message alert to 90px */
}

.old-lobby #casino-wrapper-disabled .message-alert .close {
	width: 100%; /* Sets the width of the close button to 100% */
	height: 23px; /* Sets a fixed height for the close button */
	display: block; /* Displays the close button as a block element */
}

.old-lobby #casino-wrapper-disabled .message-alert .close span {
	float: right; /* Floats the span element to the right within the close button */
	font-size: 15px; /* Sets the font size of the span within the close button to 15px */
}

.old-lobby #casino-wrapper-disabled .money-img {
	width: 70%; /* Sets the width of the first money image to 70% */
	margin: 0 auto; /* Centers the image horizontally */
	margin-top: 100px; /* Adds a top margin of 100px */
}

.old-lobby #casino-wrapper-disabled .money-img-two {
	width: 70%; /* Sets the width of the second money image to 70% */
	margin: 0 auto; /* Centers the image horizontally */
}

.old-lobby #casino-wrapper-disabled .money-img img,
  /* Styles for the old lobby section when the casino wrapper is disabled */
.old-lobby #casino-wrapper-disabled .money-img-two img {
	width: 100%; /* Set image width to 100% of its container */
	display: block; /* Ensure the image is displayed as a block element */
}

/* Styles for the close icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-times {
	float: right; /* Float the icon to the right */
	color: white; /* Set the icon color to white */
}

/* Styles for the mobile icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Set the font size for the mobile icon */
}

/* Media query for screens wider than 736px */
@media only screen and (min-width: 736px) {
	/* Styles for the message alert in the disabled casino wrapper */
	.old-lobby #casino-wrapper-disabled .message-alert {
		width: 35%; /* Set the width of the alert message */
		margin: 0 auto; /* Center the alert message horizontally */
		color: white; /* Set the text color to white */
		text-align: center; /* Center-align the text */
		border: 1px solid #b08200; /* Add a border with a specific color */
		border-radius: 15px; /* Round the corners of the border */
	}

	/* Styles for money images in the disabled casino wrapper */
	.old-lobby #casino-wrapper-disabled .money-img,
	.old-lobby #casino-wrapper-disabled .money-img-two {
		width: 25%; /* Set the width of money images to 25% */
	}
}

/* Styles for the casino content section in the old lobby */
.old-lobby div#casino-content {
	height: 100vh; /* Sets the height to 100% of the viewport height */
}

/* Styles for the game image box in the new lobby */
.new-lobby .games-aspect .game-img-box-b::before {
	content: ''; /* Generates a pseudo-element with no content */
	display: block; /* Makes the pseudo-element a block-level element */
	height: 0; /* Initial height set to 0 */
	width: 0; /* Initial width set to 0 */
	padding-bottom: calc(16 / 16 * 100%); /* Maintains aspect ratio (1:1) */
}

/* Styles for the preview section in the new lobby */
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
	background-size: 400% 400%; /* Sets the size of the background gradient */
	background-repeat: no-repeat; /* Prevents the background from repeating */
	display: flex; /* Enables flexbox layout */
	width: 500px; /* Fixed width of 500 pixels */
	height: 500px; /* Fixed height of 500 pixels */
	max-width: 100vw; /* Maximum width set to 100% of the viewport width */
	max-height: 100vh; /* Maximum height set to 100% of the viewport height */
	justify-content: center; /* Centers content horizontally */
	align-items: center; /* Centers content vertically */
	color: #fff; /* Text color set to white */
	position: relative; /* Sets positioning context for absolute children */
	cursor: pointer; /* Changes cursor to pointer on hover */
	transition: 0.5s all; /* Smooth transition for all properties over 0.5 seconds */
}

.new-lobby .c-preview:hover {
	/* Changes background position on hover for .c-preview element within .new-lobby */
	background-position: 100% 100% !important;
}

.new-lobby .c-preview:hover {
	/* Applies a blur effect to .c-preview element on hover within .new-lobby */
	filter: blur(10px) !important;
}

.new-lobby .list-games-casino-view-b {
	/* Sets initial opacity to 0 and defines animation properties for .list-games-casino-view-b within .new-lobby */
	opacity: 0;
	animation-name: bounceIn; /* Specifies the animation to be used */
	animation-duration: 450ms; /* Duration of the animation */
	animation-timing-function: linear; /* Timing function for the animation */
	animation-fill-mode: forwards; /* Keeps the final state of the animation */
	animation-delay: 2s; /* Delay before the animation starts */
}

@keyframes bounceIn {
	/* Defines the keyframes for the bounceIn animation */
	0% {
		opacity: 0; /* Fully transparent at the start */
		transform: scale(0.3) translate3d(0, 0, 0); /* Scaled down to 30% */
	}
	50% {
		opacity: 0.9; /* Almost fully opaque at halfway point */
		transform: scale(1.1); /* Scaled up to 110% */
	}
	80% {
		opacity: 1; /* Fully opaque */
		transform: scale(0.89); /* Slightly scaled down to 89% */
	}
	100% {
		opacity: 1; /* Fully opaque at the end */
		transform: scale(1) translate3d(0, 0, 0); /* Reset to original scale */
	}
}

.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
	/* Display the resize buttons when hovering over the game list */
	display: block !important;
}

.new-lobby li.providers-list {
	/* Set the width of provider list items, accounting for a fixed margin */
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
	/* Smooth transition for all properties over 0.3 seconds */
	transition: all 0.3s ease;
}

.new-lobby .rainbow {
	/* Full width and height for the rainbow element with rotation animation */
	width: 100%;
	height: 100%;
	animation: rotate linear 8s infinite;
	/* Position the rainbow absolutely within its container */
	position: absolute;
}

.new-lobby .rainbow span {
	/* Block display for the span inside the rainbow, centering it */
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	/* Center the span using transform */
	transform: translate(-50%, -50%);
}

.new-lobby .rainbow span:after {
	/* Creates a pseudo-element after each span for visual effects */
	display: block; /* Makes the pseudo-element a block element */
	content: ''; /* Ensures the pseudo-element is rendered */
	width: 100%; /* Sets the width to fill the parent span */
	height: 100%; /* Sets the height to fill the parent span */
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
	/* Wrapper for the subscribe box in the new lobby section */
	padding: 4px; /* Padding around the content */
	display: flex; /* Use flexbox for layout */
	flex-direction: column; /* Stack children vertically */
	border-radius: calc(8px / 2); /* Rounded corners */
}

.new-lobby .c-subscribe-box__title {
	/* Title style for the subscribe box */
	font-size: 1.6rem; /* Font size for the title */
}

.new-lobby .c-subscribe-box__desc {
	/* Description style for the subscribe box */
	font-size: 0.935rem; /* Font size for the description */
	margin: 0.7rem auto 1.8rem; /* Vertical margins for spacing */
	max-width: 240px; /* Maximum width for the description */
}

.new-lobby .c-subscribe-box__form {
	/* Form container within the subscribe box */
	margin-top: auto; /* Pushes the form to the bottom of the wrapper */
}

.new-lobby .c-form--accent input:hover,
.c-form--accent input:active,
.c-form--accent input:focus {
	/* Styles for input fields in the accent form on hover, active, and focus states */
	border-color: #e85f99; /* Change border color */
	box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Add shadow effect */
}

.new-lobby .c-form--accent [type='submit'] {
	/* Styles for the submit button in the accent form */
	background: #e85f99; /* Background color for the button */
	border-color: #e85f99; /* Border color for the button */
	color: #fff; /* Text color for the button */
}

/* Define a keyframe animation for rotation */
@keyframes rotate {
	0% {
		transform: rotate(0); /* Initial state: no rotation */
	}
	100% {
		transform: rotate(360deg); /* Final state: complete rotation */
	}
}

/* Styles for the search input in the new lobby */
.new-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width changes in WebKit browsers */
	transition: width 2s; /* Smooth transition for width changes */
	width: 84px; /* Initial width of the search input */
}

/* Styles for the block search element within the search input */
.new-lobby #searchv3 .block-search {
	height: 35px !important; /* Fixed height for the search block */
	min-width: 55px !important; /* Minimum width to ensure usability */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width of the parent container */
	max-width: 100% !important; /* Prevents exceeding parent width */
	margin: 0 !important; /* Removes margin */
	border: 1px solid #a7a7a7; /* Light gray border */
	border-radius: 40px; /* Rounded corners */
}

/* General styles for the block search element */
.new-lobby .block-search {
	padding: 0; /* No padding */
	min-width: 35px; /* Minimum width for the block search */
	margin: 5px 5px 0 0; /* Margin for spacing */
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
	/* Aligns text to the right */
	text-align: right;
	/* Sets the maximum width of the search block */
	max-width: 250px;
}

.new-lobby li#searchv3 input#SearchGame {
	/* Disables transition effects for the search input */
	transition: none !important;
	/* Changes the cursor to pointer when hovering over the input */
	cursor: pointer !important;
}

.new-lobby input#SearchGame.ng-hide {
	/* Sets the width to 0 when the input is hidden */
	width: 0;
	/* Smoothly transitions the width over 1 second */
	transition: width 1s;
	/* Forces the input to be displayed as a block element */
	display: block !important;
	/* Aligns the input to the right */
	float: right;
	/* Removes the border of the input */
	border: 0;
}

.new-lobby .block-search input[type='text'] {
	/* Sets the text color of the input */
	color: #686767;
	/* Defines the font properties for the input */
	font:
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Resets margin to 0 */
	margin: 0;
	/* Adds padding to the input */
	padding: 8px 5px 8px 30px;
	/* Sets the background to transparent */
	background: 0 0;
	/* Positions the input relative to its normal position */
	position: relative;
	/* Sets the stacking order of the input */
	z-index: 22;
}

/* Styles for the search input field in the new lobby */
.new-lobby .block-search input[type='text'] {
	width: 0; /* Initial width set to 0 for hidden state */
	border: 0; /* No border for a clean look */
	vertical-align: middle; /* Aligns the input vertically in the middle */
	transition: width 600ms; /* Smooth transition for width change */
	border-radius: 3px; /* Rounded corners for the input field */
}

/* Styles for the search input when the search is open */
.new-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width when open */
	padding: 0 0 0 60px !important; /* Padding to adjust text position */
	height: 100%; /* Full height for the input */
	color: #fff; /* White text color */
}

/* Container for search results in the new lobby */
.new-lobby .search-results-inner {
	float: left; /* Floats the container to the left */
	width: 100%; /* Full width for the results container */
	padding: 10px 0 0; /* Padding for spacing */
	position: relative; /* Allows for absolute positioning of child elements */
	z-index: 999; /* High z-index to ensure visibility above other elements */
	background: #fff; /* White background for the results */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

/* Positioning for the arrow indicator in sports results */
.new-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Adjusts the vertical position of the arrow */
}

.new-lobby .search-results-inner .arrow-sport {
	/* Aligns the arrow-sport element to the center of the search results */
	right: 50%;
}

.new-lobby .arrow-sport {
	/* Styles for the arrow-sport element */
	width: 14px; /* Sets the width of the arrow */
	height: 11px; /* Sets the height of the arrow */
	display: block; /* Displays the arrow as a block element */
	position: absolute; /* Positions the arrow absolutely within its parent */
	right: 2px; /* Positions the arrow 2px from the right */
	top: -11px; /* Positions the arrow 11px above its normal position */
	z-index: 999; /* Ensures the arrow is on top of other elements */
}

.new-lobby .search-results-inner h3 {
	/* Styles for the h3 headings within the search results */
	font: /* Sets the font properties */
		20px/22px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #121623; /* Sets the text color */
	text-transform: uppercase; /* Transforms text to uppercase */
}

.new-lobby .search-results-inner h3 {
	/* Additional styles for the h3 headings */
	width: 100%; /* Sets the width to 100% of the parent */
	float: left; /* Floats the heading to the left */
	padding: 0; /* Removes any padding */
	text-indent: 10px; /* Indents the text by 10px */
	text-align: left; /* Aligns the text to the left */
}

/* Styles for various containers and elements to manage overflow and scrollbar appearance */
.new-lobby #result-search,
.bet-container,
.block-more-event,
.clock .open-lang ul,
.conteiner-goals .hover-sp,
.deposit-alert-contain.casino .games-slider ul,
.express-contain,
.fedback-info ul li textarea,
.form-contain.deposit .form-sign-in,
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
	/* Enable vertical scrolling and hide horizontal scrolling */
	overflow-y: auto;
	overflow-x: hidden;

	/* Custom scrollbar colors */
	scrollbar-track-color: #0c0e14; /* Track color */
	scrollbar-shadow-color: #0c0e14; /* Shadow color */
	scrollbar-base-color: #373f4e; /* Base color */
	scrollbar-arrow-color: #373f4e; /* Arrow color */
}

.new-lobby .search-results-inner.casino #casino-result-search {
	/* Container for search results in the casino lobby */
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the parent container */
	max-height: 450px; /* Limits the maximum height to 450px */
	overflow-y: auto; /* Enables vertical scrolling if content exceeds max height */
	overflow-x: hidden; /* Hides horizontal overflow */
	margin: 10px 0 0; /* Adds a top margin of 10px */
}

.new-lobby .search-no-results {
	/* Styles for the 'no results' message in the search */
	font: /* Sets the font properties */
		16px/38px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #f2c36f; /* Sets the text color */
	padding: 0 10px; /* Adds horizontal padding */
	box-sizing: border-box; /* Includes padding in the element's total width and height */
}

.new-lobby .search-no-results {
	/* Additional styles for the 'no results' message */
	float: left; /* Aligns the message to the left */
	width: 100%; /* Full width of the parent container */
	text-align: left; /* Aligns text to the left */
}

@media screen and (max-width: 550px) {
	/* Responsive styles for screens smaller than 550px */
	.new-lobby li#searchv3 {
		/* Styles for the search item */
		width: 66px; /* Sets a fixed width */
	}

	.new-lobby li.providers-list {
		/* Styles for the providers list items */
		width: auto; /* Allows automatic width based on content */
	}

	.new-lobby li#searchv3.open {
		/* Styles for the open state of the search item */
		width: 60% !important; /* Overrides width to 60% when open */
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
	/* Styles for the closed popup form within the search item */
	float: right; /* Aligns the form to the right */
	position: relative; /* Positions the form relative to its normal position */
	top: 0; /* No vertical offset */
	right: 0; /* No horizontal offset */
	z-index: 1000; /* Ensures the form is above other elements */
	margin-top: -27px; /* Adjusts the top margin */
	margin-right: 14px; /* Adjusts the right margin */
}

.new-lobby .c-box-rgb {
	/* Styles for the RGB color box */
	position: relative; /* Positions the box relative to its normal position */
	overflow: visible !important; /* Ensures overflow is visible */
	background: linear-gradient(
		0deg,
		#000,
		#272727
	); /* Background gradient from black to dark gray */
}

.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
	/* Pseudo-elements for additional styling of the RGB color box */
	content: ''; /* Required for pseudo-elements */
	position: absolute; /* Positions the pseudo-elements absolutely */
	left: -3px; /* Offsets the left position */
	top: -3px; /* Offsets the top position */
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
	); /* Multi-color gradient background */
	background-size: 400%; /* Scales the background gradient */
	width: calc(100% + 6px); /* Width extends beyond the box */
	height: calc(100% + 6px); /* Height extends beyond the box */
	z-index: -1; /* Places the pseudo-elements behind the box */
	animation: steam 20s linear infinite; /* Applies a continuous animation */
	border-radius: 13px; /* Rounds the corners of the pseudo-elements */
}

/* Animation for steam effect */
@keyframes steam {
	0% {
		background-position: 0 0; /* Initial background position */
	}
	50% {
		background-position: 400% 0; /* Midpoint background position for animation */
	}
	100% {
		background-position: 0 0; /* Reset to initial position */
	}
}

/* Styling for the RGB box in the new lobby */
.new-lobby .c-box-rgb:after {
	filter: blur(5px); /* Applies a blur effect to the after pseudo-element */
}

/* Button play positioning in the new lobby */
.new-lobby .btn-play {
	margin-top: calc(
		50% - 60px
	); /* Centers the button vertically with an offset */
}

/* Carousel container styling */
.carousel {
	position: relative; /* Positions the carousel relative to its parent */
}

/* Inner content of the carousel */
.carousel-inner {
	position: relative; /* Positions the inner content relative to the carousel */
	overflow: hidden; /* Hides overflow content */
	width: 100%; /* Sets width to 100% of the parent */
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
	-webkit-transition: opacity 0.6s ease-out; /* Transition effect for opacity (WebKit) */
	transition: opacity 0.6s ease-out; /* Transition effect for opacity */
}

.carousel-item img {
	/* Styles for images within carousel items */
	display: block; /* Display as a block element */
	height: auto; /* Maintain aspect ratio */
	max-width: 100%; /* Responsive width */
}

.carousel-control {
	/* Styles for the carousel control buttons */
	background: rgba(0, 0, 0, 0.28); /* Semi-transparent background */
	border-radius: 50%; /* Circular shape */
	color: #fff; /* White text color */
	cursor: pointer; /* Pointer cursor on hover */
	display: none; /* Hidden by default */
	font-size: 40px; /* Font size for the control */
	height: 40px; /* Height of the control */
	line-height: 35px; /* Center text vertically */
	position: absolute; /* Positioned absolutely within the carousel */
	top: 50%; /* Center vertically */
	-webkit-transform: translate(0, -50%); /* Adjust position (WebKit) */
	cursor: pointer; /* Pointer cursor on hover */
	-ms-transform: translate(0, -50%); /* Adjust position (IE) */
	transform: translate(0, -50%); /* Adjust position */
	text-align: center; /* Center text horizontally */
	width: 40px; /* Width of the control */
	z-index: 10; /* Ensure it appears above other elements */
}

.carousel-control.prev {
	/* Positioning the previous control button to the left with a 2% margin */
	left: 2%;
}

.carousel-control.next {
	/* Positioning the next control button to the right with a 2% margin */
	right: 2%;
}

.carousel-control:hover {
	/* Changing background and text color on hover for better visibility */
	background: rgba(0, 0, 0, 0.8);
	color: #aaaaaa;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
	/* Displaying the corresponding control when the respective carousel is checked */
	display: block;
}

.carousel-indicators {
	/* Styling for the carousel indicators */
	list-style: none; /* Removing default list styling */
	margin: 0; /* Resetting margin */
	padding: 0; /* Resetting padding */
	position: absolute; /* Positioning indicators absolutely within the carousel */
	bottom: 2%; /* Positioning indicators 2% from the bottom */
	left: 0; /* Aligning indicators to the left */
	right: 0; /* Aligning indicators to the right */
	text-align: center; /* Centering the indicators */
	z-index: 10; /* Ensuring indicators are above other elements */
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

/* Styling for the inner carousel in the lobby casino */
#lobby-casino .carousel-inner {
	border-radius: 0 0 30px 30px; /* Rounds the bottom corners of the carousel */
}

/* Image provider styling */
.img-prov {
	height: auto; /* Maintains aspect ratio */
	width: auto; /* Maintains aspect ratio */
	max-width: 100%; /* Limits width to container */
	max-height: 100%; /* Limits height to container */
	margin: auto; /* Centers the image */
	filter: grayscale(100%); /* Applies grayscale filter to the image */
}

/* Image provider with color */
.img-prov.color {
	filter: grayscale(
		0%
	) !important; /* Removes grayscale filter when color class is applied */
}

/* Show drop styling for visibility */
.show-drop {
	opacity: 1 !important; /* Ensures the element is fully opaque */
	visibility: visible !important; /* Ensures the element is visible */
	position: relative !important; /* Sets position to relative for layout purposes */
}

/* Dropdown content for providers, initially hidden */
.dropdown-content.prov {
	opacity: 0; /* Fully transparent */
	visibility: hidden; /* Not visible */
	position: absolute; /* Positioned absolutely within its parent */
	background-color: #dfdfdf; /* Light gray background */
}

/* List item styles for providers in the old lobby */
.old-lobby li.providers-list {
	width: auto; /* Automatic width based on content */
	vertical-align: middle; /* Aligns items vertically in the middle */
}

/* Styles for visible dropdown */
.ver-drop {
	visibility: visible !important; /* Forces visibility */
	opacity: 1 !important; /* Fully opaque */
}

/* Hides the scrollbar for the left column casino providers navigation */
ul.left-column-casino-providers-nav::-webkit-scrollbar {
	display: none; /* No scrollbar displayed */
}

/* Styles for the all casino games box with style4 */
.all-casino-games-box.style4 {
	position: absolute; /* Positioned absolutely within its parent */
	margin-top: -116px !important; /* Negative margin to adjust position */
}

/* Fixed navigation wrapper styles for casino view in style4 */
.all-casino-games-box.style4 .fixed-nav-wrapper-casino-view {
	background: linear-gradient(
		/* Background gradient from dark to transparent */ 0deg,
		/* Gradient direction */ rgb(0 6 22) 50%,
		/* Dark color at 50% */ rgba(9, 16, 35, 0) 100%
			/* Transparent color at 100% */
	) !important; /* Forces this style to apply */
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
	vertical-align: middle; /* Aligns the button vertically in the middle */
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
	/* Styles for alert messages when the casino wrapper is disabled */
	width: 90%; /* Sets the width of the alert message */
	margin: 0 auto; /* Centers the alert message horizontally */
	color: #fff; /* Sets the text color to white */
	text-align: center; /* Centers the text inside the alert */
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
		/* Styles for alert messages in larger screens */
		width: 35%; /* Sets the width of the alert message */
		margin: 0 auto; /* Centers the alert message horizontally */
		color: #fff; /* Sets the text color to white */
		text-align: center; /* Centers the text inside the alert */
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
	/* Lighter font weight for a softer appearance */
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
	/* Center the container horizontally */
	margin: 0 auto;
}

/* Styles for the close icon in the disabled casino wrapper */
#casino-wrapper-disabled i.fa.fa-times {
	/* Float the icon to the right and set its color */
	float: right;
	color: #fff;
}

/* Styles for the close button in the disabled casino wrapper alert */
#casino-wrapper-disabled .message-alert .close {
	width: 100%; /* Full width of the parent */
	height: 23px; /* Fixed height */
	display: block; /* Display as a block element */
}

/* Font size for mobile icon in the disabled casino wrapper */
#casino-wrapper-disabled i.fa.fa-mobile {
	font-size: 80px; /* Large font size for visibility */
}

/* Container for alerts in the disabled casino wrapper */
#casino-wrapper-disabled .container-alert {
	width: 100%; /* Full width of the parent */
}

/* Main wrapper for the disabled casino */
#casino-wrapper-disabled {
	background: #000; /* Black background */
	width: 100%; /* Full width */
	min-height: 700px; /* Minimum height for layout */
	padding-top: 1px; /* Small top padding */
}

/* Style for polygon elements in the Bingos category list */
li.category-list.Bingos polygon {
	fill: white !important; /* Force fill color to white */
}

/* Full height for the casino content area */
div#casino-content {
	height: 100vh; /* Full viewport height */
}
</style>

<!-- FILE DOCUMENTED -->

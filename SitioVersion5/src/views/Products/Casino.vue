<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/ApiService';
import AppCarousel from '@/components/Carousel.vue';
import favoriteIcon from '@/components/icons/favoriteIcon.vue';
import searchIcon from '@/components/icons/searchIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import Casino3 from '@/views/Products/Casino3.vue';
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue';
import { defineAsyncComponent } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useGetInfoFirestore } from '../../composables/useInfoFirestore'; // Import function to get banners data from firestore
import { useFavoriteGames } from '@/composables/useFavoriteGames';
import { useCasinoStore } from '@/stores/casino'
import { toKebabCase } from '@/utils';
declare var Ticker: any;

/**
 * Casino component definition.
 */
export default defineComponent({
    components: {
        // Asynchronously load various components for the casino view
        SliderNormalComponent: defineAsyncComponent(() => import('../../components/Carousel.vue')),
        BannerSlider8Component: defineAsyncComponent(() => import('../../components/BannerV8.vue')),
        InfoIconsComponent5: defineAsyncComponent(() => import('../../components/InfoIcons5.vue')),
        CardsIconsComponent: defineAsyncComponent(() => import('../../components/CardsIcons.vue')),
        BonusCardsComponent: defineAsyncComponent(() => import('../../components/BonusCards.vue')),
        InfoText: defineAsyncComponent(() => import('../../components/InfoText.vue')),
        PromotionCardsComponent: defineAsyncComponent(() => import('../../components/PromotionCards.vue')),
        InfoIconsComponent: defineAsyncComponent(() => import('../../components/InfoIcons.vue')),
        InfoIconsComponent3: defineAsyncComponent(() => import('../../components/InfoIcons3.vue')),
        CardsImageComponent: defineAsyncComponent(() => import('../../components/CardsImage.vue')),
        CardsNormalComponent: defineAsyncComponent(() => import('../../components/CardsNormal.vue')),
        SliderCasinoComponent: defineAsyncComponent(() => import('../../components/CasinoSlider.vue')),
        Carousel3Component: defineAsyncComponent(() => import('../../components/Carousel3.vue')),
        Carousel7Component: defineAsyncComponent(() => import('../../components/Carousel7.vue')),
        Carousel4Component: defineAsyncComponent(() => import('../../components/Carousel4.vue')),
        SliderCasino3Component: defineAsyncComponent(() => import('../../components/CasinoSlider3.vue')),
        SliderCasino7Component: defineAsyncComponent(() => import('../../components/CasinoSlider7.vue')),
        SliderCasino8Component: defineAsyncComponent(() => import('../../components/CasinoSlider8.vue')),
        SliderCasino5Component: defineAsyncComponent(() => import('../../components/CasinoSlider5.vue')),
        MenuCasino3Component: defineAsyncComponent(() => import('../../components/menus/MenuCasino3.vue')),
        MenuProviders3Component: defineAsyncComponent(() => import('../../components/menus/MenuProviders3.vue')),
        Menu8Component: defineAsyncComponent(() => import('../../components/menus/Menu8.vue')),
        JackpotWinnerComponent: defineAsyncComponent(
			() => import('../../components/JackpotWinners.vue')
		),
        WidgetCarouselComponent: defineAsyncComponent(
            () => import('../../components/alternarWidgets/WTopEventCarousel.vue'),
        ),
        WidgetCarousel2Component: defineAsyncComponent(
            () => import('../../components/alternarWidgets/WTopEventCarousel2.vue'),
        ),
        SearchGames: defineAsyncComponent(() => import('../../components/SearchGames.vue')),
        ReelsComponent: defineAsyncComponent(() => import('../../components/Reels.vue')),
        SeoP: defineAsyncComponent(() => import('../../components/SeoP.vue')),
        JackpotsComponent: defineAsyncComponent(() => import('../../components/Jackpots.vue')),
        Jackpots2Component: defineAsyncComponent(() => import('../../components/Jackpots2.vue')),
        Jackpots3Component: defineAsyncComponent(() => import('../../components/Jackpots3.vue')),
        BannerSlider6: defineAsyncComponent(() => import('../../components/BannerSlider6.vue')),
        PromotionalCards: defineAsyncComponent(() => import('../../components/PromotionalCards.vue')),
        PromotionalCards2: defineAsyncComponent(() => import('../../components/PromotionalCards2.vue')),
        Menu6: defineAsyncComponent(() => import('../../components/menus/Menu6.vue')),
        SliderGamesV2: defineAsyncComponent(() => import('../../components/SliderGamesV2.vue')),
        JackpotPlaytechMain: defineAsyncComponent(() => import('../../components/JackpotPlaytech.vue')),
        AppCarousel,
        favoriteIcon,
        searchIcon,
        IconClose,
        animatedCloseIcon,
        Casino3,
    },
    data: function() {
        // Initialize component data
        let lastProviderSelected: any = null
        let config = this.$config();
        let emitter: any = this.$emitter();
        let appComponent: any = this.$appComponent;
        let gameId = '';
        let urlpayments: any = '';
        let auth_token = '';
        let lng = '';
        let casinoLocal: boolean = true;
        let lobbyType: any = '';
        let searchCommand = {
            input: '',
        };
        const components: any = ref([]);
        let myCasinoGames: any = [];
        let bgGame: any = {};
        let preloaderShow: boolean = false;
        let showMore: boolean = false;
        let showLoadMoreButton = true;
        let selections: any = '';
        let categoryId = '';
        let providerId = '';
        let providers: any = '';
        let categories: any = '';
        let gamesList: any = '';
        let optionsGames: any = '';
        let gameSelected: any = '';
        let showGame: boolean = false;
        let limit: any = '';
        let total_count: any = null;
        let offset: any = null;
        let openSearchv3: boolean = false;
        let partnerG: any = '';
        let logueado: any = '';
        let routes: any = '';
        let user_id: any = '';
        let urlVirtualplay: any = '';
        let urlCasinoPlay: any = '';
        let providersLength: any = '';
        let categoriesLength: any = '';
        let urlGame: any = '';
        let limitConfig: any = '';
        let hideInputSearch: any = '';
        let showSearchCommandResults: any = '';
        let sliders: any = '';
        let urlbanner: any = '';
        let limitBefore: any = '';
        let country: any = '';
        let flag: boolean = true;
        let device: string = '';
        let login: string = '';
        let login2: string = '';
        let provOpen: boolean = false;
        let banners: any = [];
        let background: string = '';
        let timeoutPromise: any = undefined;
        let debouncedSearch: any = null;
        let storeCasinoLobby = useGlobalStore();

        // Determine device type for banner display
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

        // Set login2 status based on session
        if (appComponent.session.logueado) {
            login2 = 'login';
        } else {
            if (!appComponent.session.logueado) {
                login2 = 'not_login';
            }
        }

        // Load banners based on configuration
        if (
            config != undefined &&
            config[login2] != undefined &&
            config[login2][appComponent.lngProd] != undefined &&
            config[login2][appComponent.lngProd]['banners'] != undefined &&
            config[login2][appComponent.lngProd]['banners']['banner_casino'] != undefined
        ) {
            banners = JSON.parse(JSON.stringify(config[login2][appComponent.lngProd]['banners']['banner_casino']));
        } else if (
            config != undefined &&
            config['components_'] != undefined &&
            config['components_']['casino'] != undefined &&
            config['components_']['casino'].findIndex((item) => item.id == 'Carousel3Component') > -1 &&
            config['components_']['casino'][
                config['components_']['casino'].findIndex((item) => item.id == 'Carousel3Component')
                ] != undefined &&
            config['components_']['casino'][
                config['components_']['casino'].findIndex((item) => item.id == 'Carousel3Component')
                ]['banners'] != undefined
        ) {
            banners = JSON.parse(
                JSON.stringify(
                    config['components_']['casino'][
                        config['components_']['casino'].findIndex((item) => item.id == 'Carousel3Component')
                        ]['banners'],
                ),
            );
        } else {
            if (
                config != undefined &&
                config[device] != undefined &&
                config[device][appComponent.country] != undefined &&
                config[device][appComponent.country][appComponent.lngProd] != undefined &&
                config[device][appComponent.country][appComponent.lngProd][login] != undefined &&
                config[device][appComponent.country][appComponent.lngProd][login]['casino'] != undefined
            ) {
                banners = JSON.parse(
                    JSON.stringify(config[device][appComponent.country][appComponent.lngProd][login]['casino']),
                );
            }
        }

        // Populate components with banners
        if (config != undefined && config['components_'] != undefined && config['components_']['casino'] != undefined) {
            config['components_']['casino'].forEach((component: any) => {
                component.banners = banners;
                components.value.push(component);
            });
        } else {
            if (
                config != undefined &&
                config['components'] != undefined &&
                config['components'][appComponent.country] != undefined &&
                config['components'][appComponent.country]['casino'] != undefined
            ) {
                config['components'][appComponent.country]['casino'].forEach((component: any) => {
                    component.banners = banners;
                    components.value.push(component);
                });
            }
        }
        return {
            lastProviderSelected,
            config,
            emitter,
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
            login2,
            provOpen,
            banners,
            components,
            background,
            showLoadMoreButton,
            timeoutPromise,
            debouncedSearch,
            storeCasinoLobby,
            toggleSaveToMyCasinoGamesComposable: null,
            getFavoriteGamesComposable: null,
            selectCategoryFavComposable: null
        };
    },
    setup() {
        const route = useRoute();
        let gameId: any = ref(route.params.GameId);
        let categoryId: any = ref(route.params.CategoryId);
        let providerId: any = ref(route.params.ProviderId);
        return {
            route,
            gameId,
            categoryId,
            providerId,
        };
    },
    async created() {
        //Get banners data from Firebase
		const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_casino', { useLogin: true, useScope: true })
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
        // Watch for changes in provider ID and update games list accordingly
        if (
            this.appComponent.config.layout != 3 &&
            this.appComponent.config.layout != 4 &&
            this.appComponent.config.layout != 5 &&
            this.appComponent.config.layout != 6 &&
            this.appComponent.config.layout != 7 &&
            this.appComponent.config.layout != 8
        ) {
            watch(
                () => this.route.params.ProviderId,
                (newProviderId) => {
                    const urlParams = new URLSearchParams(window.location.search);
                    const externalClick = urlParams.get('is_external_click');
                    if (externalClick === 'true') {
                        this.gamesList = [];
                        this.storeCasinoLobby.provider = newProviderId;
                        this.appComponent.selections.provider = newProviderId;
                        this.providerId = newProviderId;
                        this.storeCasinoLobby.category = 'all';
                        this.emitter.emit('get:gamesList');
                        this.getCasinoGames();
                        window.history.replaceState({}, '', `${window.location.pathname}`);
                    }
                },
            );
        }
        // Initialize component settings based on layout
        if (
            this.appComponent.config.layout != 3 &&
            this.appComponent.config.layout != 4 &&
            this.appComponent.config.layout != 5 &&
            this.appComponent.config.layout != 6 &&
            this.appComponent.config.layout != 7 &&
            this.appComponent.config.layout != 8
        ) {
            this.gamesList = [];
            this.casinoLocal = this.config.casino.isLocal;
            this.lobbyType = this.config.casino.lobbyType;
            this.config = this.config;
            this.limitConfig = this.config.casino.limit;
            this.urlVirtualplay = this.config.urlVirtualplay;
            this.urlCasinoPlay = this.config.urlCasinoPlay;
            this.partnerG = this.appComponent.partnerG;
            this.logueado = this.appComponent.session.logueado;
            this.routes = this.config.routes;
            this.user_id = this.appComponent.user_id;
            this.auth_token = this.appComponent.tokenUser;
            this.country = this.appComponent.country;
            this.auth_token = this.appComponent.tokenUser;
            this.lng = 'es';
            if (this.total_count < this.limitConfig) {
                this.showMore = false;
            } else {
                this.showMore = true;
            }
            // Hide preload elements
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function(el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
            });
            this.getCasinoGames();
            // Load saved casino games from local storage
            if (window.localStorage.getItem('m_c_g') !== null && window.localStorage.getItem('m_c_g') !== undefined) {
                var json_str: any = window.localStorage.getItem('m_c_g');
                this.myCasinoGames = JSON.parse(json_str);
            }
            var vthis = this;
            // Listen for close game event
            window.document.addEventListener(
                'closeGameCasino',
                (e) => {
                    vthis.closeGame();
                },
                false,
            );
            // Set background based on configuration
            if (
                this.config != undefined &&
                this.config['not_login'] != undefined &&
                this.config['not_login']['backgrounds'] != undefined &&
                this.config['not_login']['backgrounds']['bg_casino'] != undefined
            ) {
                this.background = this.config['not_login']['backgrounds']['bg_casino'];
            }
            // Debounce search input
            this.debouncedSearch = this.debounce(
                this.searchEnter,
                this.appComponent.config['timeDebouncedSearch'] ?? 500,
            );
        }
        window.scrollTo(0, 0);
        this.syncRouteWithStore()
    },
    watch: {
        '$route.params'(newParams) {
            this.syncRouteWithStore()
        }
    },
    methods: {
        syncRouteWithStore() {
        const casinoStore = useCasinoStore()

        const { ProviderId, CategoryId } = this.$route.params
        if (ProviderId) {
            this.lastProviderSelected = ProviderId
            casinoStore.setProviderSelect({ name: ProviderId })
            casinoStore.setCategorySelect(null)
        } else if (CategoryId) {
            const id = String(CategoryId).split('-').pop()
            casinoStore.setCategorySelect({ id: Number(id) })
            casinoStore.setProviderSelect(null)
        } else {
            if (this.lastProviderSelected) {
                casinoStore.setProviderSelect({ name: this.lastProviderSelected })
            } else {
                casinoStore.setProviderSelect(null)
                casinoStore.setCategorySelect(null)
            }
        }
        },
        async getFavoriteGames() {
            // we use the composable instead of the old logic
            await this.getFavoriteGamesComposable();
        }, // Placeholder for method to get favorite games
        async toggleSaveToMyCasinoGames(game) {
            // we use the composable instead of the old logic
            await this.toggleSaveToMyCasinoGamesComposable(game);
        }, // Placeholder for method to toggle saving to my casino games

        async selectCategoryFav() {
            // we use the composable instead of the old logic
            await this.selectCategoryFavComposable();

            this.gamesList = [...this.appComponent.gamesList];
            this.total_count = this.appComponent.total_count;
        }, // Placeholder for method to select favorite category

        /**
         * Fetch casino games based on selected filters.
         */
        getCasinoGames() {
            var vthis = this;
            this.bgGame = {
                background: 'url(' + this.config.casino.preloaderGame + ')no-repeat 0 50%/cover',
            };
            this.preloaderShow = true;
            vthis.showMore = true;
            this.selections = {
                category: {
                    id: '',
                },
                provider: '',
            };
            // Check if category and provider are not defined
            if (
                (this.categoryId == undefined || this.categoryId == '' || this.categoryId == 'todos-all') &&
                (this.providerId == undefined || this.providerId == '')
            ) {
                this.optionsGames = {
                    action: 'getGames2',
                    partner_id: this.partnerG,
                    offset: 0,
                    limit: vthis.limitConfig,
                    country: this.appComponent.country,
                };
                // Set mobile flag
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                if (this.casinoLocal) {
                    Promise.race([
                        apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames),
                        new Promise((resolve, reject) => {
                            setTimeout(resolve, 60000, 'timeout');
                        }),
                    ])
                        .then((response: any) => {
                            if (response == 'timeout') {
                                vthis.gamesList = [];
                                vthis.total_count = 0;
                                vthis.offset = 0;
                                vthis.limit = vthis.limitConfig;
                            } else {
                                var json = response.data;
                                vthis.gamesList = json.games;
                                vthis.total_count = json.total_count;
                                vthis.offset = vthis.gamesList.length;
                                vthis.limit = vthis.gamesList.length + vthis.limitConfig;
                                vthis.preloaderShow = false;
                                // Hide preload elements
                                Array.prototype.forEach.call(
                                    document.getElementsByClassName('preload-game-top'),
                                    function(el, i) {
                                        (
                                            document.getElementsByClassName('preload-game-top')[i] as HTMLElement
                                        ).style.display = 'none';
                                    },
                                );
                                if (
                                    this.appComponent.session.logueado &&
                                    this.appComponent.config.activeFavoritesWithBackend != undefined &&
                                    this.appComponent.config.activeFavoritesWithBackend == true
                                ) {
                                    console.log('Fetching favorite games from backend');
                                    this.getFavoriteGames(); // Fetch favorite games if logged in
                                }
                                if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                                } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                                }
                                // Load Playtech jackpot script if applicable
                                if (
                                    vthis.config.casino != undefined &&
                                    vthis.config.casino.playtechJackpot != undefined &&
                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                                ) {
                                    var existingScript = document.querySelector(
                                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                                    );
                                    if (existingScript) {
                                        existingScript.remove();
                                    }
                                    var script = document.createElement('script');
                                    script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                                    const vthis = this;
                                    script.onload = function() {
                                        vthis.gamesList.forEach((game) => {
                                            if (
                                                game.provider == 'PLAYTECH' &&
                                                game.jackpot != undefined &&
                                                game.jackpot == 1
                                            ) {
                                                var objParams =
                                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                                objParams.game = game.front_game_id;
                                                var ticker = new Ticker(objParams);
                                                ticker.attachToTextBox('playtech-' + game.id);
                                                ticker.SetCurrencyPos('1');
                                                ticker.tick();
                                            }
                                        });
                                    };
                                    document.head.appendChild(script);
                                }
                            }
                        })
                        .catch((error) => {
                            vthis.gamesList = [];
                            vthis.total_count = 0;
                            vthis.offset = 0;
                            vthis.limit = vthis.limitConfig;
                        });
                }
                // Open game if gameId is defined
                if (this.gameId != undefined) {
                    vthis.openGame({ id: vthis.gameId });
                }
            } else {
                // Handle category filtering
                if (this.categoryId != undefined && this.categoryId != 'todos-all' && this.categoryId != '') {
                    this.appComponent.showLoadMoreButton = false;
                    Array.prototype.forEach.call(
                        document.getElementsByClassName('preload-game-bottom'),
                        function(el, i) {
                            (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display =
                                'none';
                        },
                    );
                    vthis.selections.category.id = vthis.categoryId.split('-')[1];
                    this.optionsGames = {
                        action: 'getGames2',
                        partner_id: this.partnerG,
                        category: this.categoryId.split('-')[1],
                        offset: 0,
                        limit: vthis.limitConfig,
                        country: this.appComponent.country,
                    };
                    // Set mobile flag
                    if (this.appComponent.mobile == '1') {
                        this.optionsGames.isMobile = true;
                    } else {
                        this.optionsGames.isMobile = false;
                    }
                    Promise.race([
                        apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames),
                        new Promise((resolve, reject) => {
                            setTimeout(resolve, 60000, 'timeout');
                        }),
                    ])
                        .then((response: any) => {
                            if (response == 'timeout') {
                                vthis.gamesList = [];
                                vthis.total_count = 0;
                                vthis.offset = 0;
                                vthis.limit = vthis.limitConfig;
                            } else {
                                var json = response.data;
                                vthis.gamesList = json.games;
                                vthis.total_count = json.total_count;
                                vthis.offset = vthis.gamesList.length;
                                vthis.limit = vthis.gamesList.length + vthis.limitConfig;
                                // Load Playtech jackpot script if applicable
                                if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                                } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                                }
                                if (
                                    vthis.config.casino != undefined &&
                                    vthis.config.casino.playtechJackpot != undefined &&
                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                                ) {
                                    var existingScript = document.querySelector(
                                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                                    );
                                    if (existingScript) {
                                        existingScript.remove();
                                    }
                                    var script = document.createElement('script');
                                    script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                                    const vthis = this;
                                    script.onload = function() {
                                        vthis.gamesList.forEach((game) => {
                                            if (
                                                game.provider == 'PLAYTECH' &&
                                                game.jackpot != undefined &&
                                                game.jackpot == 1
                                            ) {
                                                var objParams =
                                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                                objParams.game = game.front_game_id;
                                                var ticker = new Ticker(objParams);
                                                ticker.attachToTextBox('playtech-' + game.id);
                                                ticker.SetCurrencyPos('1');
                                                ticker.tick();
                                            }
                                        });
                                    };
                                    document.head.appendChild(script);
                                }
                            }
                        })
                        .catch((error) => {
                            vthis.gamesList = [];
                            vthis.total_count = 0;
                            vthis.offset = 0;
                            vthis.limit = vthis.limitConfig;
                        });
                    // Hide preload elements
                    Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                        (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                    });
                }
                // Open game if gameId is defined and categoryId is not
                if (this.gameId != undefined && this.categoryId == undefined) {
                    Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                        (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                    });
                    vthis.openGame({ id: vthis.gameId });
                    if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                        this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                    } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                        this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                    }
                }
                // Handle provider filtering
                if (this.providerId != undefined && this.gameId == undefined && this.categoryId == undefined) {
                    vthis.selections.provider = vthis.providerId;
                    this.optionsGames = {
                        action: 'getGames2',
                        partner_id: this.partnerG,
                        offset: 0,
                        limit: vthis.limitConfig,
                        country: this.appComponent.country,
                    };
                    // Set mobile flag
                    if (this.appComponent.mobile == '1') {
                        this.optionsGames.isMobile = true;
                    } else {
                        this.optionsGames.isMobile = false;
                    }
                    if (this.providerId != '') {
                        this.optionsGames.provider = this.providerId;
                    }
                    Promise.race([
                        apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames),
                        new Promise((resolve, reject) => {
                            setTimeout(resolve, 60000, 'timeout');
                        }),
                    ])
                        .then((response: any) => {
                            if (response == 'timeout') {
                                vthis.gamesList = [];
                                vthis.total_count = 0;
                                vthis.offset = 0;
                                vthis.limit = vthis.limitConfig;
                            } else {
                                var json = response.data;
                                vthis.gamesList = json.games;
                                vthis.total_count = json.total_count;
                                vthis.offset = vthis.gamesList.length;
                                vthis.limit = vthis.gamesList.length + vthis.limitConfig;
                                // Load Playtech jackpot script if applicable
                                if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                                } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                                    this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                                }
                                if (
                                    vthis.config.casino != undefined &&
                                    vthis.config.casino.playtechJackpot != undefined &&
                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                                ) {
                                    var existingScript = document.querySelector(
                                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                                    );
                                    if (existingScript) {
                                        existingScript.remove();
                                    }
                                    var script = document.createElement('script');
                                    script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                                    const vthis = this;
                                    script.onload = function() {
                                        vthis.gamesList.forEach((game) => {
                                            if (
                                                game.provider == 'PLAYTECH' &&
                                                game.jackpot != undefined &&
                                                game.jackpot == 1
                                            ) {
                                                var objParams =
                                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                                objParams.game = game.front_game_id;
                                                var ticker = new Ticker(objParams);
                                                ticker.attachToTextBox('playtech-' + game.id);
                                                ticker.SetCurrencyPos('1');
                                                ticker.tick();
                                            }
                                        });
                                    };
                                    document.head.appendChild(script);
                                }
                            }
                        })
                        .catch((error) => {
                            vthis.gamesList = [];
                            vthis.total_count = 0;
                            vthis.offset = 0;
                            vthis.limit = vthis.limitConfig;
                        });
                    // Hide preload elements
                    Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                        (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                    });
                }
            }
            // Fetch options for providers and categories
            var options = {
                action: 'getOptions',
                partner_id: this.partnerG,
                country: this.appComponent.country,
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false;
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options),
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout');
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        vthis.providers = [];
                        vthis.categories = [];
                        vthis.providersLength = 0;
                        vthis.categoriesLength = 0;
                    } else {
                        var json = response.data;
                        vthis.providers = json.providers;
                        vthis.categories = json.categories;
                        vthis.providersLength = json.providers.length;
                        vthis.categoriesLength = json.categories.length;
                    }
                })
                .catch((error) => {
                    vthis.providers = [];
                    vthis.categories = [];
                    vthis.providersLength = 0;
                    vthis.categoriesLength = 0;
                });
        },
        /**
         * Open a game based on the selected game object.
         * @param game - The game object to open.
         */
        openGame(game) {
            var vthis = this;
            this.urlGame = '';
            this.gameSelected = game;
            if (this.appComponent.session.logueado) {
                this.showGame = true;
                this.optionsGames = {
                    gameid: game.id,
                    mode: 'real',
                    provider: game.provider,
                    lan: this.appComponent.lngProd,
                    partnerid: this.partnerG,
                    token: this.auth_token,
                    balance: 0,
                    currency: this.appComponent.session.moneda,
                    userid: this.appComponent.session.usuario,
                    isMobile: '',
                };
                // Set mobile flag
                if (this.appComponent.mobile == '1') {
                    vthis.optionsGames.isMobile = true;
                } else {
                    vthis.optionsGames.isMobile = false;
                }
                if (this.gameId == undefined) {
                    window.history.pushState('', '', '/new-casino/' + game.id);
                }
                setTimeout(function() {
                    (document.getElementById('game-content') as HTMLElement).setAttribute('allowFullScreen', 'true');
                    (document.getElementById('game-content') as HTMLElement).setAttribute(
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
                        vthis.optionsGames.isMobile,
                    );
                }, 1000);
            } else {
                this.clickButtonLogin();
            }
        },
        /**
         * Handle search input and fetch games based on the input.
         * @param event - The input event.
         */
        searchEnter(event) {
            var vthis = this;
            this.gamesList = [];
            if (this.searchCommand.input.length >= 3) {
                this.optionsGames = {
                    action: 'getGames2',
                    partner_id: this.partnerG,
                    search: this.searchCommand.input,
                    country: this.appComponent.country,
                };
                // Set mobile flag
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                    .then((response: any) => {
                        var json = response.data;
                        vthis.gamesList = json.games;
                        vthis.total_count = json.total_count;
                        vthis.offset = 0;
                        vthis.showLoadMoreButton = true;
                        vthis.limit = vthis.limit;
                        if (vthis.gamesList != undefined && vthis.gamesList.length > 0) {
                            // Load Playtech jackpot script if applicable
                            if (
                                vthis.config.casino != undefined &&
                                vthis.config.casino.playtechJackpot != undefined &&
                                vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                            ) {
                                var existingScript = document.querySelector(
                                    'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                                );
                                if (existingScript) {
                                    existingScript.remove();
                                }
                                var script = document.createElement('script');
                                script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                                const vthis = this;
                                script.onload = function() {
                                    vthis.gamesList.forEach((game) => {
                                        if (
                                            game.provider == 'PLAYTECH' &&
                                            game.jackpot != undefined &&
                                            game.jackpot == 1
                                        ) {
                                            var objParams =
                                                vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                            objParams.game = game.front_game_id;
                                            var ticker = new Ticker(objParams);
                                            ticker.attachToTextBox('playtech-' + game.id);
                                            ticker.SetCurrencyPos('1');
                                            ticker.tick();
                                        }
                                    });
                                };
                                document.head.appendChild(script);
                            }
                        } else if (vthis.offset == 0 && vthis.total_count == 0) {
                            this.showLoadMoreButton = false;
                        }
                    });
            } else {
                if (this.searchCommand.input.length == 0) {
                    this.loadMoreGames();
                }
            }
        },
        /**
         * Check if a game is saved in the user's favorites.
         * @param id - The ID of the game to check.
         * @returns True if the game is saved, otherwise false.
         */
        isFromSaved(id) {
            if (this.myCasinoGames.length > 0) {
                for (var i = 0; i < this.myCasinoGames.length; i++) {
                    if (id == this.myCasinoGames[i].id) {
                        return true;
                    }
                }
            }
        },
        /**
         * Show the login modal.
         */
        clickButtonLogin() {
            this.appComponent.showModalLogin = true;
        },
        /**
         * Select a category and fetch games based on the selected category.
         * @param category - The selected category object.
         */
        selectCategory(category) {
            var vthis = this;
            this.flag = true;
            // Hide preload elements
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function(el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'block';
            });
            vthis.gamesList = [];
            vthis.selections.category.id = category.id;
            vthis.selections.provider = '';
            this.optionsGames = {
                action: 'getGames2',
                partner_id: this.partnerG,
                offset: 0,
                limit: vthis.limitConfig,
                country: this.appComponent.country,
            };
            // Set mobile flag
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true;
            } else {
                this.optionsGames.isMobile = false;
            }
            if (category.id != '' && category.id != 'all') {
                this.optionsGames.category = category.id;
            }
            if (
                this.selections.provider != '' &&
                this.selections.provider != undefined &&
                this.selections.provider != null
            ) {
                this.optionsGames.provider = this.selections.provider;
            }
            window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id);
            apiService
                .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                .then((response: any) => {
                    var json = response.data;
                    vthis.gamesList = json.games;
                    vthis.total_count = json.total_count;
                    vthis.offset = vthis.gamesList.length;
                    vthis.limit = vthis.gamesList.length + vthis.limitConfig;
                    vthis.noMoreGames();

                    if (
                            this.appComponent.session.logueado &&
                            this.appComponent.config.activeFavoritesWithBackend !== undefined &&
                            this.appComponent.config.activeFavoritesWithBackend == true
                        ) {
                            this.emitter.emit('gamesFavorites'); // Emit event for favorite games
                        }
                    // Hide preload elements
                    Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                        (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                    });
                    // Load Playtech jackpot script if applicable
                    if (
                        vthis.config.casino != undefined &&
                        vthis.config.casino.playtechJackpot != undefined &&
                        vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                    ) {
                        var existingScript = document.querySelector(
                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                        );
                        if (existingScript) {
                            existingScript.remove();
                        }
                        var script = document.createElement('script');
                        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                        const vthis = this;
                        script.onload = function() {
                            vthis.gamesList.forEach((game) => {
                                if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                    var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                    objParams.game = game.front_game_id;
                                    var ticker = new Ticker(objParams);
                                    ticker.attachToTextBox('playtech-' + game.id);
                                    ticker.SetCurrencyPos('1');
                                    ticker.tick();
                                }
                            });
                        };
                        document.head.appendChild(script);
                    }
                });
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
            var vthis = this;
            this.getPreloaderLoadmore();
            this.preloaderShow = true;
            var limit = 0;
            if (this.limit < this.total_count) {
                limit = this.limit;
            } else {
                limit = this.total_count - this.limit;
                this.showMore = false;
            }
            this.optionsGames = {
                action: 'getGames2',
                partner_id: this.partnerG,
                offset: vthis.offset,
                limit: vthis.limit,
                country: this.appComponent.country,
            };
            // Set mobile flag
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
                vthis.optionsGames.category = vthis.selections.category.id;
            }
            if (vthis.providerId != undefined || vthis.providerId != '') {
                vthis.optionsGames.provider = vthis.providerId;
            }
            vthis.limitBefore = limit - vthis.limitConfig;
            if (vthis.limitBefore <= 0) {
                vthis.limitBefore = vthis.limitConfig;
            }
            if (vthis.offset < vthis.total_count) {
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                    .then((response: any) => {
                        var json = response.data;
                        var games = json.games;
                        games.forEach(function(value, key) {
                            vthis.gamesList.push(value);
                        });
                        vthis.offset = vthis.gamesList.length;
                        vthis.limit = limit + vthis.limitConfig;
                        // Hide preload elements
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-bottom'),
                            function(el, i) {
                                (
                                    document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement
                                ).style.display = 'none';
                            },
                        );
                        console.log('vthis.offset, vthis.total_count');
                        if (vthis.offset >= vthis.total_count && vthis.searchCommand.input.length > 0) {
                            vthis.showLoadMoreButton = false;
                        }
                        // Load Playtech jackpot script if applicable
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            );
                            if (existingScript) {
                                existingScript.remove();
                            }
                            var script = document.createElement('script');
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                            const vthis = this;
                            script.onload = function() {
                                vthis.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id;
                                        var ticker = new Ticker(objParams);
                                        ticker.attachToTextBox('playtech-' + game.id);
                                        ticker.SetCurrencyPos('1');
                                        ticker.tick();
                                    }
                                });
                            };
                            document.head.appendChild(script);
                        }
                    });
            } else {
                vthis.showMore = false;
                // Hide preload elements
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function(el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
                });
            }
        },
        /**
         * Select a provider and fetch games based on the selected provider.
         * @param name - The name of the provider.
         * @param img - The image associated with the provider.
         * @param name2 - An alternative name for the provider.
         */
        selectProvider(name: any, img: any, name2: any) {
            var vthis = this;
            this.flag = true;
            // Show preload elements
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'block';
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function(el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
            });
            vthis.gamesList = [];
            vthis.selections.provider = name;
            if (name2 != '') {
                vthis.selections.provider = name2;
            }
            this.optionsGames = {
                action: 'getGames2',
                partner_id: this.partnerG,
                provider: '',
                offset: 0,
                limit: vthis.limitConfig,
                country: this.appComponent.country,
            };
            // Set mobile flag
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true;
            } else {
                this.optionsGames.isMobile = false;
            }
            if (name != '') {
                this.optionsGames.provider = name;
                this.providerId = name;
            }
            window.history.pushState('', '', '/new-casino/proveedor/' + name);
            apiService
                .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                .then((response: any) => {
                    var json = response.data;
                    vthis.gamesList = json.games;
                    vthis.total_count = json.total_count;
                    vthis.offset = vthis.gamesList.length;
                    vthis.limit = vthis.gamesList.length + vthis.limitConfig;
                    vthis.noMoreGames();
                    // Hide preload elements
                    Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                        (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                    });
                    if (vthis.offset >= vthis.total_count) {
                        vthis.showLoadMoreButton = false;
                    }
                    if (vthis.offset < vthis.total_count) {
                        vthis.showLoadMoreButton = true;
                    }
                    // Load Playtech jackpot script if applicable
                    if (
                        vthis.config.casino != undefined &&
                        vthis.config.casino.playtechJackpot != undefined &&
                        vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                    ) {
                        var existingScript = document.querySelector(
                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                        );
                        if (existingScript) {
                            existingScript.remove();
                        }
                        var script = document.createElement('script');
                        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
                        const vthis = this;
                        script.onload = function() {
                            vthis.gamesList.forEach((game) => {
                                if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                    var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                    objParams.game = game.front_game_id;
                                    var ticker = new Ticker(objParams);
                                    ticker.attachToTextBox('playtech-' + game.id);
                                    ticker.SetCurrencyPos('1');
                                    ticker.tick();
                                }
                            });
                        };
                        document.head.appendChild(script);
                    }
                });
            vthis.showMore = true;
        },
        /**
         * Handle the case where there are no more games to display.
         */
        noMoreGames() {
            var vthis = this;
            if (vthis.gamesList.length <= 0) {
                // Hide preload elements
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function(el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function(el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
                });
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function(el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'block';
                    },
                );
            } else {
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function(el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'none';
                    },
                );
            }
        },
        /**
         * Open the search interface.
         */
        OpenSearchV3() {
            this.openSearchv3 = true;
        },
        /**
         * Close the search interface.
         */
        CloseSearchV3() {
            this.openSearchv3 = false;
        },
        /**
         * Scroll left in the casino navigation.
         */
        leftScroll() {
            (document.querySelector('.left-column-casino-nav>ul') as any).scrollLeft -= 50;
        },
        /**
         * Scroll right in the casino navigation.
         */
        rightScroll() {
            (document.querySelector('.left-column-casino-nav>ul') as any).scrollLeft += 50;
        },
        /**
         * Scroll left in the providers navigation.
         */
        leftScrollProviders() {
            (document.querySelector('.providers-nav-casino>ul') as any).scrollLeft -= 50;
        },
        /**
         * Scroll right in the providers navigation.
         */
        rightScrollProviders() {
            (document.querySelector('.providers-nav-casino>ul') as any).scrollLeft += 50;
        },
        /**
         * Toggle the visibility of the providers list.
         */
        openProviders() {
            this.provOpen = !this.provOpen;
        },
        /**
         * Prepare for loading more games.
         */
        getPreloaderLoadmore() {
        },
        /**
         * Filter providers based on the selected filter.
         * @param filter - The filter string to match against provider names.
         * @returns The title of the matched provider.
         */
        selectionsProviderFilter(filter: any) {
            try {
                this.providerId = '';
                this.providerId = this.providers.filter((provider) => {
                    return provider.name == filter || provider.title == filter;
                })[0].name;
                return this.providers.filter((provider) => {
                    return provider.name == filter || provider.title == filter;
                })[0].title;
            } catch (e) {
            }
        },
        /**
         * Toggle the visibility of the providers menu.
         */
        openProviders2() {
            const otherButton: any = document.querySelector('#menuProviders');
            otherButton.classList.toggle('ver-drop');
        },
        /**
         * Close the currently opened game.
         */
        closeGame() {
            this.showGame = false;
            window.history.pushState('', '', '/new-casino');
            this.gameId = undefined;
        },
        /**
         * Create a debounced function to limit the rate of function calls.
         * @param func - The function to debounce.
         * @param wait - The number of milliseconds to wait before calling the function.
         * @returns A debounced version of the function.
         */
        debounce(func, wait) {
            let timeout;
            return function(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func.apply(this, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
    },
    computed: {
        analyticsAttrs() {
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
                    'data-analytics-label': `casino:carousel:CasinoView:view-all`,
                    'data-analytics-context': `component:CasinoSlider3V2|layout:${this.appComponent.config.layout}`
                },
                game: (game: any) => ({
                    'data-analytics-id': `${game.id}`,
                    'data-analytics-label': `casino:sidebar:similar-games`,
                    'data-analytics-position': `${this.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                    'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|source:${toKebabCase(this.appComponent.gameSelected.name ?? this.appComponent.gameSelected.id)}|component:OpenGameModal|layout:${this.appComponent.config.layout}`,
                })
            };
        }
    }
});
</script>
<template>
    <!-- Main section for displaying the contingency casino if enabled -->
    <section
        v-if="appComponent.contingencyCasino"
        class="flex justify-center items-center py-2"
    >
        <div class="h-full w-full">
            <!-- Container for the casino content -->
            <section class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center">
                <!-- Gradient overlay at the top -->
                <div class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"></div>
                <div class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center">
                    <div class="flex flex-col gap-8 justify-center items-center mt-10 xl:mt-0">
                        <!-- Message displayed in the casino -->
                        <p
                            class="text-neutral text-xl md:text-3xl max-w-[700px] text-center"
                            v-html="$t(config.contingencyCasino.message)"
                        ></p>
                        <!-- Button linking to the casino action -->
                        <RouterLink
                            v-if="
                                config.contingencyCasino !== undefined &&
                                config.contingencyCasino.button !== undefined &&
                                config.contingencyCasino.button.url != undefined &&
                                config.contingencyCasino.button.text != undefined
                            "
                            :to="config.contingencyCasino.button.url"
                            class="text-shadow-xl rounded-full bg-gradient-to-b from-primary-content to-primary-content/60 z-50 text-neutral uppercase font-bold px-5 py-3 hover:scale-105 transition-all ease-in-out"
                        >
                            {{ $t(config.contingencyCasino.button.text) }}
                        </RouterLink>
                    </div>
                    <!-- Image displayed in the casino -->
                    <img
                        v-if="config.contingencyCasino !== undefined && config.contingencyCasino.img !== undefined"
                        :src="config.contingencyCasino.img"
                        alt=""
                        class="object-contain w-[400px] xl:w-[600px]"
                    />
                </div>
                <!-- Background image for the casino -->
                <img
                    v-if="
                        config.contingencyCasino !== undefined && config.contingencyCasino.imgBackground !== undefined
                    "
                    :src="config.contingencyCasino.imgBackground"
                    alt=""
                    class="absolute w-full h-full object-cover z-10"
                />
                <!-- Gradient overlay at the bottom -->
                <div
                    class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute z-10 -bottom-0"
                ></div>
            </section>
        </div>
    </section>
    <!-- Container for local casino components -->
    <div
        v-if="
            casinoLocal == true &&
            config.layout != 3 &&
            config.layout != 4 &&
            config.layout != 5 &&
            config.layout != 6 &&
            config.layout != 7 &&
			appComponent.config.layout != 8 &&
            !appComponent.contingencyCasino
        "
        class="asd mb-4"
        v-for="component in components"
        :key="component.id"
    >
        <!-- Dynamic component rendering based on the component ID -->
        <component
            :is="component.id"
            :images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
            :shadow="component.shadow"
            :url="component.url"
            :title="component.title"
            :category="component.category"
            :typelobby="component.typelobby"
            :limit="component.limit"
            :top="component.top"
        ></component>
    </div>
    <!-- Main casino content wrapper -->
    <div
        v-if="
            casinoLocal == true &&
            config.layout != 3 &&
            config.layout != 4 &&
            config.layout != 5 &&
            appComponent.config.layout != 6 &&
            config.layout != 7 &&
			appComponent.config.layout != 8 &&
            !appComponent.contingencyCasino
        "
    >
        <div
            id="casino-wrapper"
            v-if="appComponent.casinoEnabled && appComponent.session.wallet != '1'"
        >
            <div
                id="casino-content"
                v-if="lobbyType == 1 || lobbyType == '' || lobbyType == undefined"
                class="old-lobby h-full"
            >
                <div
                    id="lobby-casino"
                    :style="{
                        backgroundImage: 'url(' + background + ')',
                        backgroundSize: 'cover',
                    }"
                >
                    <!-- Main container for the casino providers navigation, displayed only if providersType is 4 -->
                    <div
                        v-if="config.casino.providersType == 4"
                        class="providers-nav-casino overflow-auto closed bg-casino-providers nav-casino4"
                    >
                        <!-- Button to open the dropdown menu for providers -->
                        <span
                            id="menuRightProviders"
                            class="button float-right relative block right-0 w-7 py-4 text-center bg-casino-providers -top-0 -right-1 rounded-l-2xl shadow-md"
                        >
            <div class="dropdown dropdown-end">
                <!-- Button to trigger dropdown -->
                <div
                    tabindex="0"
                    class="p-0 normal-case btn-ghost btn btn-xs text-lg"
                >
                    +
                </div>
                <!-- Dropdown content containing the list of providers -->
                <div
                    id="menuProviders"
                    class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-base-100 text-neutral text-lg"
                >
                    <ul class="p-4 menu compact gap-1">
                        <!-- Loop through providers and create a list item for each -->
                        <li class="bg-base-300" v-for="provider in providers">
                            <a
                                tabindex="0"
                                @click="
                                    selectProvider(provider.name, provider.image, provider.title);
                                    appComponent.gAnalytics('game_type', provider.title);
                                "
                                class="uppercase"
                            >{{ provider.title }}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </span>
                        <!-- List of providers with search functionality -->
                        <ul
                            class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                        >
                            <!-- Search input for filtering providers -->
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
                                                @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                @blur="appComponent.placeholder = appComponent.ph"
                                                :placeholder="$t('Search a casino game...')"
                                                :title="$t('Buscar un juego...')"
                                                v-model="searchCommand.input"
                                                @input="debouncedSearch"
                                                trans=""
                                                class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                            />
                                            <!-- Container for displaying search results -->
                                            <div
                                                class="search-results-container ng-hide"
                                                v-show="showSearchCommandResults"
                                                hide-on-click=""
                                                state-flag-var="showSearchCommandResults"
                                                broadcast-on-close="search.ResultsClosed"
                                                class-on-scroll="search-results-container-scroll,search-results-container"
                                            >
                                                <div class="search-results-inner casino">
                                                    <div class="arrow-sport"></div>
                                                    <h3 trans="">{{ $t('Search results') }}</h3>
                                                    <div
                                                        id="casino-result-search"
                                                        keyboard-navigation=""
                                                        result-id-prefix="search-result-casino-"
                                                        select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                        results-ids="searchCommandResultGameIds"
                                                        selected-result-id="selectedSearchCommandResultId"
                                                        show-results-flag="showSearchCommandResults"
                                                        class="ng-isolate-scope"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Close button for the search input -->
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
                            <!-- List item for selecting all providers -->
                            <li
                                class="providers-list inline-block mr-1 w-auto text-center"
                                v-if="providersLength > 0"
                                @click="
                                    selectProvider('', '', '');
                                    appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                "
                            >
                                <a
                                    class="rounded-3xl bg-primary hover:bg-primary-focus font-bold py-2 px-7 block text-neutral"
                                    v-bind:class="{
                                        'blob':
                                            selections.provider == '',
                                            '' :
                                                selections.provider != '',
                                    }"
                                >{{ $t('Todos los proveedores') }}</a
                                >
                            </li>
                            <!-- List item for the currently selected provider -->
                            <li
                                class="providers-list inline-block mr-1 text-center"
                                v-if="providersLength > 0 && selections.provider != ''"
                                @click="selectProvider('', '', '')"
                            >
                                <a
                                    class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                >{{ selectionsProviderFilter(selections.provider) }}</a
                                >
                            </li>
                            <!-- Loop through providers and create a list item for each -->
                            <li
                                v-for="provider in providers"
                                class="capitalize providers-list inline-block mr-1 text-center"
                                @click="
                                    selectProvider(provider.name, provider.image, provider.title);
                                    appComponent.gAnalytics('game_type', provider.title);
                                "
                                v-show="!selections.provider === provider.title"
                            >
                                <a
                                    class="rounded-3xl bg-accent font-bold py-2 px-7 block hover:blob uppercase text-neutral"
                                    v-bind:class="{
                                        'blob':
                                            selections.provider === provider.title,
                                    }"
                                >{{ provider.title }}</a
                                >
                            </li>
                            <!-- List item for selecting other providers -->
                            <li
                                id="providers-list"
                                class="providers-list inline-block mr-1 w-auto text-center"
                                @click="
                                    openProviders2();
                                    appComponent.gAnalytics('game_type', 'Otros');
                                "
                            >
                                <a class="rounded-3xl bg-primary font-bold py-2 px-7 block text-neutral">{{
                                        $t('Otros')
                                    }}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- Main container for the big games section, shown based on the showGame variable -->
                    <div
                        class="big-games-overflow"
                        v-if="showGame"
                    >
                        <!-- Background for the big game area -->
                        <div class="big-game-background">
                            <!-- Container for the big game content -->
                            <div
                                class="big-game-contain"
                                class-on-scroll="scrolled,notscrolled"
                                :style="{
                                    backgroundImage: 'url(' + config.casino.bg + ')',
                                    backgroundSize: 'cover',
                                }"
                            >
                                <!-- Casual game section with animation -->
                                <div class="casual-game animate__animated animate__zoomIn animate__faster">
                                    <div class="casino-game-contain">
                                        <div class="flash-game-contain">
                                            <div class="big-game-control">
                                                <div class="top-options">
                                                    <!-- Deposit button, shown if deposit is enabled -->
                                                    <div
                                                        class="inline-block align-bottom"
                                                        v-if="config.casino.inGame.deposit"
                                                    >
                                                        <label
                                                            @click="appComponent.getPayments()"
                                                            class="btn btn-primary w-full text-neutral"
                                                        ><span class="icon-deposit pr-3"></span>
                                                            {{ $t('Depositar') }}</label
                                                        >
                                                    </div>
                                                    <!-- Refresh button, shown if refresh is enabled -->
                                                    <div
                                                        class="inline-block w-10 h-12 text-center text-2xl"
                                                        v-if="config.casino.inGame.refresh"
                                                    >
                                                        <a
                                                            title="Refresh"
                                                            @click="openGame(gameSelected)"
                                                            v-bind="analyticsAttrs.refreshToggle"
                                                        >
                                                            <font-awesome-icon
                                                                class="text-neutral"
                                                                icon="fa-solid fa-refresh"
                                                            />
                                                        </a>
                                                    </div>
                                                    <!-- Favorite button, shown if favorites are enabled -->
                                                    <div
                                                        class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
                                                        v-if="config.casino.inGame.favorite"
                                                    >
                                                        <a
                                                            title="Add to My Games"
                                                            v-bind:class="{
                                                                'favorite-active': isFromSaved(gameSelected.id),
                                                            }"
                                                            @click="toggleSaveToMyCasinoGames(gameSelected)"
                                                        ><span class="icon-star text-neutral"></span
                                                        ></a>
                                                    </div>
                                                    <!-- Home button, shown if home option is enabled -->
                                                    <div
                                                        class="icon-delete home inline-block w-10 h-12 text-center text-lg"
                                                        v-if="config.casino.inGame.home"
                                                    >
                                                        <a
                                                            title="home"
                                                            @click="closeGame()"
                                                            v-bind="analyticsAttrs.homeToggle"
                                                        ><span class="icon-home1 text-neutral"></span
                                                        ></a>
                                                    </div>
                                                </div>
                                                <!-- Close button for the game -->
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
                                                            @click="CloseSearchV3()"
                                                        ></animatedCloseIcon>
                                                    </a>
                                                </div>
                                                <!-- Logo display -->
                                                <div class="div-logo-j">
                                                    <img :src="config.logo" />
                                                </div>
                                            </div>
                                            <!-- Iframe for the game content -->
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
                    <!-- Container for all casino games -->
                    <div
                        class="all-casino-games-box"
                        v-bind:class="{
                            style4: config.casino.providersType == 4 && appComponent.mobile !== 1,
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
                                                style="width: 0; height: 0; position: absolute"
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
                                            <!-- Favorites category, shown if there are favorite games -->
                                            <li
                                                v-if="appComponent.myListFavoriteGame.length > 0 && !openSearchv3"
                                                v-bind:class="{
                                                    active: selections.category.id === '0',
                                                }"
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
                                                <!-- Loop through categories to display them -->
                                                <li
                                                    v-for="category in categories"
                                                    class="category-list cursor-pointer p-3"
                                                    @click="
                                                        selectCategory(category);
                                                        appComponent.gAnalytics('category', category.title);
                                                    "
                                                >
                                                    <div
                                                    class="p-3 hover:bg-base-300 hover:rounded-lg" 
                                                    v-bind:class="[
                                                        { 'bg-base-300 text-neutral rounded-lg p-3': selections.category.id === category.id },
                                                        category.title,
                                                    ]">
                                                        <div
                                                            class="category-icon"
                                                            v-html="category.icon"
                                                        ></div>
                                                        <div class="category-title text-neutral">
                                                            {{ $t(category.title) }}
                                                        </div>
                                                    </div>
                                                </li>
                                            </ng-container>
                                            <!-- All games category, shown if there are categories -->
                                            <li
                                                v-bind:class="{
                                                    active: selections.category.id === 'all',
                                                }"
                                                @click="
                                                    selectCategory({ id: 'all', slug: 'todos' });
                                                    appComponent.gAnalytics('category', 'Todos los juegos');
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
                                                <div class="text-neutral">{{ $t('Todos los juegos') }}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Providers navigation, shown if providersType is 1 -->
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
                                                class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-base-100 text-neutral text-lg"
                                            >
                                                <ul class="p-4 menu compact gap-1">
                                                    <!-- Loop through providers, showing the rest after the first 10 -->
                                                    <li class="bg-base-300" v-for="provider in providers.slice(10)">
                                                        <a
                                                            tabindex="0"
                                                            @click="
                                                                selectProvider(
                                                                    provider.name,
                                                                    provider.image,
                                                                    provider.title,
                                                                );
                                                                appComponent.gAnalytics('game_type', provider.title);
                                                            "
                                                        >{{ provider.title }}</a
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden icon__casino"
                                    >
                                        <!-- Search functionality for providers -->
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
                                                            @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                            id="SearchGame2"
                                                            onfocus="appComponent.ph=appComponent.placeholder;appComponent.placeholder=''"
                                                            @blur="appComponent.placeholder = appComponent.ph"
                                                            :placeholder="$t('Search a casino game...')"
                                                            :title="$t('Buscar un juego...')"
                                                            v-model="searchCommand.input"
                                                            @input="debouncedSearch"
                                                            trans=""
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                        />
                                                        <div
                                                            class="search-results-container ng-hide"
                                                            v-show="showSearchCommandResults"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                        >
                                                            <div class="search-results-inner casino">
                                                                <div class="arrow-sport"></div>
                                                                <h3 trans="">{{ $t('Search results') }}</h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                    class="ng-isolate-scope"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Close search popup -->
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
                                        <!-- All providers button -->
                                        <li
                                            class="providers-list inline-block mr-1 w-auto text-center"
                                            v-if="providersLength > 0"
                                            @click="
                                                selectProvider('', '', '');
                                                appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-primary hover:bg-primary-focus font-bold py-2 px-7 block text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider == '',
                                                        '' :
                                                        selections.provider != '',
                                                }"
                                            >{{ $t('Todos los proveedores') }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            class="providers-list inline-block mr-1 text-center"
                                            v-if="providersLength > 0 && selections.provider != ''"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral blob h-10"
                                            >{{ selectionsProviderFilter(selections.provider) }}</a
                                            >
                                        </li>
                                        <!-- Loop through first 10 providers -->
                                        <li
                                            v-for="provider in providers.slice(0, 10)"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
                                                selectProvider(provider.name, provider.image, provider.title);
                                                appComponent.gAnalytics('game_type', provider.title);
                                            "
                                            v-show="!selections.provider === provider.title"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block hover:blob hover:bg-accent-content text-neutral"
                                                v-bind:class="{
                                                    'blob hidden':
                                                        selections.provider === provider.title,
                                                }"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!-- Providers navigation, shown if providersType is 2 -->
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
                                                <span v-if="!provOpen"> + </span>
                                            </div>
                                        </div>
                                    </span>
                                    <ul
                                        class="left-column-casino-providers-nav whitespace-nowrap mx-5 py-2 overflow-auto sm:overflow-hidden"
                                    >
                                        <!-- Search functionality for providers -->
                                        <li
                                            id="searchv3"
                                            v-bind:class="{ open: openSearchv3 }"
                                            class="inline-block align-bottom cursor-pointer"
                                        >
                                            <div class="">
                                                <div class="ng-pristine ng-valid">
                                                    <div
                                                        class="block-search search__input"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                            @blur="appComponent.placeholder = appComponent.ph"
                                                            :placeholder="$t('Search a casino game...')"
                                                            :title="$t('Buscar un juego...')"
                                                            v-model="searchCommand.input"
                                                            @input="debouncedSearch"
                                                            trans=""
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                        />
                                                        <div
                                                            class="search-results-container ng-hide"
                                                            v-show="showSearchCommandResults"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                        >
                                                            <div class="search-results-inner casino">
                                                                <div class="arrow-sport"></div>
                                                                <h3 trans="">{{ $t('Search results') }}</h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                    class="ng-isolate-scope"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Close search popup -->
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
                                        <!-- All providers button -->
                                        <li
                                            class="providers-list inline-block mr-1 w-auto text-center text-neutral-content"
                                            v-if="providersLength > 0"
                                            @click="
                                                selectProvider('', '', '');
                                                appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider == '',
                                                        '' :
                                                        selections.provider != '',
                                                }"
                                            >{{ $t('Todos los proveedores') }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            class="providers-list inline-block mr-1 text-center"
                                            v-if="providersLength > 0 && selections.provider != ''"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{ selectionsProviderFilter(selections.provider) }}</a
                                            >
                                        </li>
                                        <!-- Loop through providers -->
                                        <li
                                            v-for="provider in providers"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
                                                selectProvider(provider.name, provider.image, provider.title);
                                                appComponent.gAnalytics('game_type', provider.title);
                                            "
                                            v-show="!selections.provider === provider.name"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
                                                v-bind:class="{
                                                    'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
                                                        selections.provider === provider.name,
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
                                            <!-- Loop through providers for dropdown -->
                                            <li
                                                v-for="provider in providers"
                                                class="capitalize providers-list2 inline-block mr-1 text-center"
                                            >
                                                <a
                                                    tabindex="0"
                                                    @click="
                                                        selectProvider(provider.name, provider.image, provider.title);
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
                                <!-- Providers navigation, shown if providersType is 3 -->
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
                                        <!-- Search functionality for providers -->
                                        <li
                                            id="searchv3"
                                            v-bind:class="{ open: openSearchv3 }"
                                            class="inline-block align-bottom w-auto"
                                        >
                                            <div class="">
                                                <div class="ng-pristine ng-valid">
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                            onfocus="appComponent.ph=appComponent.placeholder,appComponent.placeholder = ''"
                                                            @blur="appComponent.placeholder = appComponent.ph"
                                                            :placeholder="$t('Search a casino game...')"
                                                            :title="$t('Buscar un juego...')"
                                                            v-model="searchCommand.input"
                                                            @input="debouncedSearch"
                                                            trans=""
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                        />
                                                        <div
                                                            class="search-results-container ng-hide"
                                                            v-show="showSearchCommandResults"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                        >
                                                            <div class="search-results-inner casino">
                                                                <div class="arrow-sport"></div>
                                                                <h3 trans="">{{ $t('Search results') }}</h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                    class="ng-isolate-scope"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Close search popup -->
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
                                        <!-- All providers button -->
                                        <li
                                            class="providers-list inline-block mr-1 w-auto"
                                            v-if="providersLength > 0"
                                            @click="
                                                selectProvider('', '', '');
                                                appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-primary hover:bg-primary-focus font-bold py-2 px-7 block text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider == '',
                                                    '' :
                                                        selections.provider != '',
                                                }"
                                            >{{ $t('Todos los proveedores') }}</a
                                            >
                                        </li>
                                        <!-- Loop through providers -->
                                        <li
                                            v-for="provider in providers"
                                            class="providers-list inline-block mr-1 w-auto"
                                            @click="
                                                selectProvider(provider.name, provider.image, provider.title);
                                                appComponent.gAnalytics('game_type', provider.title);
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block hover:blob hover:bg-accent-content text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider === provider.name ||
                                                        selections.provider === provider.title,
                                                }"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Wrapper for the games list -->
                    <div
                        class="wrapper-separator-games bg-base-content"
                        id="games-casino-list"
                    >
                        <div class="all-games-casino-list">
                            <div class="all-casino-games-list-box">
                                <div>
                                    <ul class="masonry">
                                        <!-- Placeholder for loading games -->
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <!-- Loop through games to display them -->
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
                                                    v-bind="analyticsAttrs.game(game)"
                                                    :aria-label="game.name"
                                                    class="flex justify-start items-start"
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
                                                            v-bind="analyticsAttrs.game(game)"
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
                                        <!-- Placeholder for loading games -->
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Message when no games are found -->
                            <div
                                v-if="!showLoadMoreButton && gamesList.length == 0"
                                class="new-casino-no-games-text pt-10 text-primary font-bold text-2xl"
                            >
                                <p>
                                    {{ $t('No se encontraron juegos') }}
                                </p>
                            </div>
                            <!-- Load more games button -->
                            <div
                                class="more-casino-games-load-b pt-5"
                                v-show="showMore"
                            >
                                <p
                                    v-if="showLoadMoreButton"
                                    load-more=""
                                    id="loadMoreGames"
                                    @click="loadMoreGames()"
                                    v-bind="analyticsAttrs.viewAll"
                                    class="ng-isolate-scope bg-primary text-neutral hover:bg-primary-focus"
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
                                <div class="carousel-item absolute opacity-0 transition-opacity duration-700">
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
                    <!-- Overlay for big games -->
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
                                <div class="casual-game animate__animated animate__zoomIn animate__faster table m-auto">
                                    <div class="casino-game-contain w-full table-cell text-center">
                                        <div class="flash-game-contain text-center relative inline-block m-2 align-top">
                                            <div
                                                class="big-game-control absolute inline-block text-right w-full right-0 float-right bg-black h-14"
                                            >
                                                <div class="top-options inline-block">
                                                    <!-- Deposit button if enabled -->
                                                    <div
                                                        class="inline-block align-bottom"
                                                        v-if="config.casino.inGame.deposit"
                                                    >
                                                        <label
                                                            class="btn btn-primary w-full text-neutral"
                                                            @click="appComponent.getPayments()"
                                                        ><span class="icon-deposit pr-3"></span>
                                                            {{ $t('Depositar') }}</label
                                                        >
                                                    </div>
                                                    <!-- Close game button -->
                                                    <div class="icon-delete fixed right-0 top-0 w-12 h-10 text-center">
                                                        <a
                                                            title="close"
                                                            @click="closeGame()"
                                                            class="text-xl block my-3 relative text-center"
                                                            v-bind="analyticsAttrs.closeToggle"
                                                        ><span class="icon-close"></span
                                                        ></a>
                                                    </div>
                                                    <!-- Refresh game button if enabled -->
                                                    <div
                                                        class="icon-delete refresh inline-block w-10 h-12 text-center text-lg"
                                                        v-if="config.casino.inGame.refresh"
                                                    >
                                                        <a
                                                            title="Refresh"
                                                            @click="openGame(gameSelected)"
                                                            v-bind="analyticsAttrs.refreshToggle"
                                                        ><span class="icon-refresh text-neutral"></span
                                                        ></a>
                                                    </div>
                                                    <!-- Add to favorites button if enabled -->
                                                    <div
                                                        class="icon-delete favorite inline-block w-10 h-12 text-center text-lg"
                                                        v-if="config.casino.inGame.favorite"
                                                    >
                                                        <a
                                                            title="Add to My Games"
                                                            v-bind:class="{
                                                                'favorite-active': isFromSaved(gameSelected.id),
                                                            }"
                                                            @click="toggleSaveToMyCasinoGames(gameSelected)"
                                                        ><span class="icon-star text-neutral"></span
                                                        ></a>
                                                    </div>
                                                    <!-- Home button if enabled -->
                                                    <div
                                                        class="icon-delete home inline-block w-10 h-12 text-center text-lg"
                                                        v-if="config.casino.inGame.home"
                                                    >
                                                        <a
                                                            title="home"
                                                            @click="closeGame()"
                                                            v-bind="analyticsAttrs.homeToggle"
                                                        ><span class="icon-home1 text-neutral"></span
                                                        ></a>
                                                    </div>
                                                </div>
                                                <!-- Logo displayed in the game control -->
                                                <div class="div-logo-j float-left h-14">
                                                    <img
                                                        :src="config.logo"
                                                        class="h-full py-3 px-7"
                                                    />
                                                </div>
                                            </div>
                                            <!-- Iframe for the game content -->
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
                                                class="relative mt-14 bg-black inline-block"
                                                style="width: 90vw; height: 90vh"
                                            >
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Container for all casino games -->
                    <div class="all-casino-games-box">
                        <div class="fixed-element-parent">
                            <div
                                class="fixed-nav-wrapper-casino-view"
                                id="main-header-container"
                            >
                                <div class="search-category-nav-contain">
                                    <div class="left-column-casino-nav text-center">
                                        <ul class="px-3 py-4 pt-8 whitespace-nowrap overflow-auto">
                                            <!-- Favorites category if available -->
                                            <li
                                                v-if="myCasinoGames.length > 0 && categoriesLength > 0 && !openSearchv3"
                                                v-bind:class="{
                                                    active: selections.category.id === '0',
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
                                                <!-- Dynamic category list rendering -->
                                                <li
                                                    v-for="category in categories"
                                                    class="category-list inline-block px-6 cursor-pointer"
                                                    v-bind:class="[
                                                        { active: selections.category.id === category.id },
                                                        category.title,
                                                    ]"
                                                    @click="selectCategory(category)"
                                                >
                                                    <div
                                                        class="category-icon bg-gradient-to-t from-neutral-content to-primary-content/40 border-solid border-1 border-primary-content rounded-lg p-2 w-16 h-16 m-auto"
                                                        v-html="category.icon"
                                                        v-bind:class="{
                                                            'blob-cat': selections.category.id === category.id,
                                                        }"
                                                    ></div>
                                                    <div class="category-title text-neutral">
                                                        {{ $t(category.title) }}
                                                    </div>
                                                </li>
                                            </ng-container>
                                            <!-- All games category -->
                                            <li
                                                v-bind:class="{
                                                    active: selections.category.id === 'all',
                                                }"
                                                @click="selectCategory({ id: 'all', slug: 'todos' })"
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
                                <!-- Providers navigation if type 1 -->
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
                                                class="mt-9 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-56 rounded-b-box bg-base-100 text-neutral text-lg"
                                            >
                                                <ul class="p-4 menu compact gap-1">
                                                    <li class="bg-base-300" v-for="provider in providers">
                                                        <a
                                                            tabindex="0"
                                                            @click="
                                                                selectProvider(
                                                                    provider.name,
                                                                    provider.image,
                                                                    provider.title,
                                                                );
                                                                appComponent.gAnalytics('game_type', provider.title);
                                                            "
                                                            class="uppercase text-left"
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
                                        <!-- All providers button -->
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
                                                            @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                            @blur="appComponent.placeholder = appComponent.ph"
                                                            :placeholder="$t('Search a casino game...')"
                                                            :title="$t('Buscar un juego...')"
                                                            v-model="searchCommand.input"
                                                            @input="debouncedSearch"
                                                            trans=""
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                        />
                                                        <div
                                                            class="search-results-container ng-hide"
                                                            v-show="showSearchCommandResults"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                        >
                                                            <div class="search-results-inner casino">
                                                                <div class="arrow-sport"></div>
                                                                <h3 trans="">{{ $t('Search results') }}</h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                    class="ng-isolate-scope"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Close search popup -->
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
                                        <!-- All providers button -->
                                        <li
                                            class="providers-list inline-block mr-1 w-auto text-center text-neutral-content"
                                            v-if="providersLength > 0"
                                            @click="
                                                selectProvider('', '', '');
                                                appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-primary hover:bg-primary-focus font-bold py-2 px-7 block text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider == '',
                                                        '' :
                                                        selections.provider != '',
                                                }"
                                            >{{ $t('Todos los proveedores') }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            class="providers-list inline-block mr-1 text-center"
                                            v-if="providersLength > 0 && selections.provider != ''"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{ selectionsProviderFilter(selections.provider) }}</a
                                            >
                                        </li>
                                        <!-- Dynamic provider list rendering -->
                                        <li
                                            v-for="provider in providers"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
                                                selectProvider(provider.name, provider.image, provider.title);
                                                appComponent.gAnalytics('game_type', provider.title);
                                            "
                                            v-show="!selections.provider === provider.name"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block hover:blob uppercase text-neutral"
                                                v-bind:class="{
                                                    '': selections.provider === provider.name,
                                                }"
                                            >{{ provider.title }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!-- Providers navigation if type 3 -->
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
                                            v-bind:class="{ open: openSearchv3 }"
                                            class="inline-block align-bottom w-auto"
                                        >
                                            <div class="">
                                                <div class="ng-pristine ng-valid">
                                                    <div
                                                        class="block-search"
                                                        @click="OpenSearchV3()"
                                                    >
                                                        <div
                                                            class="icon"
                                                            @click="hideInputSearch = hideInputSearch ? false : true"
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
                                                            @blur="appComponent.placeholder = appComponent.ph"
                                                            :placeholder="$t('Search a casino game...')"
                                                            :title="$t('Buscar un juego...')"
                                                            v-model="searchCommand.input"
                                                            @input="debouncedSearch"
                                                            trans=""
                                                            class="ng-pristine ng-valid ng-empty ng-hide ng-touched text-neutral"
                                                        />
                                                        <div
                                                            class="search-results-container ng-hide"
                                                            v-show="showSearchCommandResults"
                                                            hide-on-click=""
                                                            state-flag-var="showSearchCommandResults"
                                                            broadcast-on-close="search.ResultsClosed"
                                                            class-on-scroll="search-results-container-scroll,search-results-container"
                                                        >
                                                            <div class="search-results-inner casino">
                                                                <div class="arrow-sport"></div>
                                                                <h3 trans="">{{ $t('Search results') }}</h3>
                                                                <div
                                                                    id="casino-result-search"
                                                                    keyboard-navigation=""
                                                                    result-id-prefix="search-result-casino-"
                                                                    select-result-by-id-func="selectCasinoGameFromSearchResults"
                                                                    results-ids="searchCommandResultGameIds"
                                                                    selected-result-id="selectedSearchCommandResultId"
                                                                    show-results-flag="showSearchCommandResults"
                                                                    class="ng-isolate-scope"
                                                                >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Close search popup -->
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
                                        <!-- All providers button -->
                                        <li
                                            class="providers-list inline-block mr-1 w-auto text-center text-neutral-content"
                                            v-if="providersLength > 0"
                                            @click="
                                                selectProvider('', '', '');
                                                appComponent.gAnalytics('game_type', 'Todos los proveedores');
                                            "
                                        >
                                            <a
                                                class="rounded-3xl bg-primary hover:bg-primary-focus font-bold py-2 px-7 block text-neutral"
                                                v-bind:class="{
                                                    'blob':
                                                        selections.provider == '',
                                                        '' :
                                                        selections.provider != '',
                                                }"
                                            >{{ $t('Todos los proveedores') }}</a
                                            >
                                        </li>
                                        <!-- Selected provider button -->
                                        <li
                                            class="providers-list inline-block mr-1 text-center"
                                            v-if="providersLength > 0 && selections.provider != ''"
                                            @click="selectProvider('', '', '')"
                                        >
                                            <a
                                                class="rounded-3xl bg-accent font-bold py-2 px-7 block text-neutral blob h-10 uppercase"
                                            >{{ selectionsProviderFilter(selections.provider) }}</a
                                            >
                                        </li>
                                        <!-- Dynamic provider list rendering -->
                                        <li
                                            v-for="provider in providers"
                                            class="capitalize providers-list inline-block mr-1 text-center"
                                            @click="
                                                selectProvider(provider.name, provider.image, provider.title);
                                                appComponent.gAnalytics('game_type', provider.title);
                                            "
                                            v-show="!selections.provider === provider.name"
                                        >
                                            <a
                                                class="rounded-3xl bg-base-300 font-bold py-2 px-7 block hover:blob h-10"
                                                v-bind:class="{
                                                    'text-neutral bg-gradient-to-r from-primary-content  to-neutral-content blob':
                                                        selections.provider === provider.name,
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
                                                        selectProvider(provider.name, provider.image, provider.title);
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
                    <!-- Wrapper for the list of casino games -->
                    <div
                        class="wrapper-separator-games bg-base-content"
                        id="games-casino-list"
                    >
                        <div class="mt-2"></div>
                        <div class="all-games-casino-list">
                            <div class="all-casino-games-list-box">
                                <div>
                                    <ul
                                        class="masonry grid md:grid-cols-5 sm:grid-cols-2 lg:grid-cols-7 grid-cols-2 gap-4 p-4 auto-rows-fr auto-cols-fr pt-7 grid-flow-row-dense w-full"
                                    >
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <li class="list-games-casino-view-b preload-game-top"></li>
                                        <!-- Dynamic game list rendering -->
                                        <li
                                            v-for="game in gamesList"
                                            @click="gamesList.idSelect = game.id"
                                            class="list-games-casino-view-b list-game-width- columns-{{game.columns}} animate__animated animate__zoomIn animate__faster rounded-xl overflow-hidden games-aspect c-subscribe-box col-span-{{game.columns}} row-span-{{game.rows}}"
                                            v-bind:class="[{ 'c-box-rgb': game.isBorderNeon }, 'rows-' + game.rows]"
                                        >
                                            <div
                                                class="rainbow"
                                                v-if="false"
                                            >
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
                                                            'background-image': 'url(' + game.icon_3 + ')',
                                                        }"
                                                    ></p>
                                                    <div
                                                        class="casino-resize-buttons absolute top-2 w-full h-full text-center"
                                                        style="
                                                            display: none;
                                                            pointer-events: none;
                                                            width: 100%;
                                                            opacity: 0.8;
                                                        "
                                                    >
                                                        <span
                                                            class="playtech-jackpot"
                                                            v-if="game.provider == 'PLAYTECH'"
                                                            :id="'playtech-' + game.id"
                                                        ></span>
                                                        <p
                                                            class="game-name-b-favorite text-neutral font-bold mb-0 mt-5"
                                                        >
                                                            <span :title="game.name">{{ game.name }}</span>
                                                            <i
                                                                class="favorite-icon-view"
                                                                v-bind:class="{ active: isFromSaved(game.id) }"
                                                                @click="toggleSaveToMyCasinoGames(game)"
                                                            ></i>
                                                        </p>
                                                        <button
                                                            class="btn-play bg-primary-content text-neutral rounded-full font-bold py-2 px-7 uppercase"
                                                            style=""
                                                            v-bind="analyticsAttrs.game(game)"
                                                        >
                                                            <span>{{ $t('Juegue ahora') }}</span>
                                                        </button>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                        <li class="list-games-casino-view-b preload-game-bottom"></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Message if no games found -->
                            <div
                                v-if="showLoadMoreButton"
                                class="new-casino-no-games-text text-center pt-10 text-primary font-bold text-2xl"
                            >
                                <p>
                                    {{ $t('No se encontraron juegos') }}
                                </p>
                            </div>
                            <!-- Load more games button -->
                            <div
                                class="more-casino-games-load-b w-full text-center pt-5"
                                v-show="showMore"
                            >
                                <p
                                    v-if="showLoadMoreButton"
                                    load-more=""
                                    id="loadMoreGames"
                                    @click="loadMoreGames()"
                                    v-bind="analyticsAttrs.viewAll"
                                    class="btn btn-primary text-neutral rounded-full"
                                >
                                    <span>{{ $t('Cargar mas') }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Alert when casino is disabled -->
        <div
            id="casino-wrapper-disabled"
            v-if="!appComponent.casinoEnabled"
        >
            <div class="container-alert">
                <div class="money-img">
                    <img
                        src="https://images.virtualsoft.tech/site/money.png"
                        alt="money"
                    />
                </div>
                <div class="message-alert">
                    <div class="close">
                        <RouterLink :to="config.baseUrlFx"><i class="fa fa-times"></i></RouterLink>
                    </div>
                    <i class="fa fa-mobile"></i>
                    <p>{{ $t('¡No es posible jugar desde este punto de venta! ') }}</p>
                    <p>{{ $t('Te invitamos a jugar desde su dispositivo móvil ') }}</p>
                </div>
                <div class="money-img-two">
                    <img
                        src="https://images.virtualsoft.tech/site/money-two.png"
                        alt="money"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Alert for disabled casino with specific layouts -->
    <div
        id="casino-wrapper-disabled"
        v-if="
            !appComponent.casinoEnabled &&
            config.layout != undefined &&
            (config.layout == 3 || config.layout == 4 || config.layout == 5 || config.layout == 7 || config.layout == 8) &&
            !appComponent.contingencyCasino
        "
    >
        <div class="container-alert">
            <div class="money-img">
                <img
                    src="https://images.virtualsoft.tech/site/money.png"
                    alt="money"
                />
            </div>
            <div class="message-alert">
                <div class="close">
                    <RouterLink :to="config.baseUrlFx"><i class="fa fa-times"></i></RouterLink>
                </div>
                <i class="fa fa-mobile"></i>
                <p>{{ $t('¡No es posible jugar desde este punto de venta! ') }}</p>
                <p>{{ $t('Te invitamos a jugar desde su dispositivo móvil ') }}</p>
            </div>
            <div class="money-img-two">
                <img
                    src="https://images.virtualsoft.tech/site/money-two.png"
                    alt="money"
                />
            </div>
        </div>
    </div>
    <!-- Casino component for specific layouts -->
    <casino3
        v-if="
            (config.layout != undefined &&
                (config.layout == 3 ||
                    config.layout == 4 ||
                    config.layout == 5 ||
                    appComponent.config.layout == 6 ||
                    config.layout == 7 ||
				config.layout == 8) &&
                !appComponent.contingencyCasino &&
                appComponent.casinoEnabled) ||
            !casinoLocal
        "
    />
</template>
<style scoped>
/* Styles for the old lobby casino section */
.old-lobby #lobby-casino {
    height: 100%; /* Full height */
    overflow: hidden; /* Hide overflow content */
    background-size: contain; /* Scale background image to contain */
}

/* Styles for the new lobby */
.new-lobby {
    background: #000616; /* Dark background color */
}

/* Styles for category icons in the old lobby */
.old-lobby .category-icon {
    width: 40px; /* Width of the category icon */
    margin: 0 auto; /* Center the icon */
    height: 50px; /* Height of the category icon */
}

/* Styles for casino icons */
.icon__casino {
    position: relative !important; /* Positioning context */
    z-index: 11 !important; /* Layering order */
}

/* Styles for category list items in the old lobby */
.old-lobby li.category-list {
    float: none; /* No floating */
    display: inline-block; /* Inline block display */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    color: #fbf2df; /* Text color */
    font: /* Font settings */ 13px/16px Quicksand,
    Arial,
    Helvetica,
    sans-serif;
    transition: color 250ms; /* Transition effect for color changes */
    white-space: nowrap; /* Prevent text wrapping */
    text-overflow: ellipsis; /* Show ellipsis for overflow text */
    overflow: hidden; /* Hide overflow text */
    padding: 0 2%; /* Horizontal padding */
    margin-bottom: 5px; /* Bottom margin */
}

/* Styles for the left column navigation in the old lobby */
.old-lobby .left-column-casino-nav {
    text-align: center; /* Center text alignment */
}

/* Styles for the game view in the old lobby */
.old-lobby .list-games-casino-view-b.rows-2 {
    grid-area: span 2 / span 2 / auto / auto; /* Grid area settings */
    width: 100% !important; /* Full width */
    height: 100% !important; /* Full height */
}

/* Styles for the navigation controls in the casino lobby */
.old-lobby #lobby-casino .flex-control-nav {
    max-width: 200px; /* Maximum width */
    display: inline-table; /* Inline table display */
    left: calc(50% - 100px); /* Center horizontally */
    background: #787f90 d1; /* Background color */
    padding: 4px; /* Padding */
    border-radius: 41px; /* Rounded corners */
}

/* Styles for masonry layout in the old lobby */
.old-lobby ul.masonry {
    padding-top: 15px; /* Top padding */
}

/* Styles for closed providers navigation in the old lobby */
.old-lobby .providers-nav-casino.closed {
    background: hsl(var(--b3))!important; /* Background color for closed state */
    animation: provider-closed-animate-b 280ms ease; /* Animation for closed state */
}

/* Styles for preloading game items in the old lobby */
.old-lobby li.list-games-casino-view-b.preload-game-top,
.old-lobby li.list-games-casino-view-b.preload-game-bottom {
    background: #787f90 26; /* Background color */
    -webkit-animation: pulset 3s infinite ease-in-out; /* Animation for webkit browsers */
    -o-animation: pulst2 3s infinite ease-in-out; /* Animation for Opera */
    -ms-animation: pulset 3s infinite ease-in-out; /* Animation for IE */
    -moz-animation: pulset 3s infinite ease-in-out; /* Animation for Firefox */
    animation: pulset 3s infinite ease-in-out; /* General animation */
}

/* Media query for screen sizes up to 550px */
@media screen and (max-width: 550px) {
    /* No specific styles defined for this media query */
}

/* Styles for the all casino games list box */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
}

/* Styles for the casino games list in the old lobby */
.old-lobby .all-games-casino-list {
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    width: 100%; /* Full width of the container */
    padding: 0; /* No padding */
    min-height: 750px; /* Minimum height for the list */
    margin-bottom: 10px; /* Space below the list */
}

/* Grid layout for the casino games list */
.old-lobby .all-casino-games-list-box > div > ul {
    display: grid !important; /* Use grid layout */
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Responsive columns */
    grid-gap: 16px; /* Space between grid items */
    grid-auto-rows: minmax(129px, auto); /* Minimum height for rows */
    grid-auto-flow: dense; /* Fill empty spaces in the grid */
}

/* Styles for individual game view containers */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
    width: 100% !important; /* Full width */
    height: 100% !important; /* Full height */
    border-radius: 6px; /* Rounded corners */
}

/* Overlay effect for game image boxes */
.old-lobby .game-img-box-b:before {
    content: ''; /* Empty content for the pseudo-element */
    display: block; /* Block display */
    position: absolute; /* Positioning relative to the parent */
    top: 0; /* Align to the top */
    left: 0; /* Align to the left */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    z-index: 88; /* Layering order */
    background: #171a22 ed; /* Background color */
    opacity: 0; /* Initially transparent */
    transition: opacity 0.8s; /* Fade effect on opacity change */
}

/* Styles for the game image box */
.old-lobby .game-img-box-b {
    float: left; /* Float to the left */
    width: 100%; /* Full width */
    background-size: cover; /* Cover background image */
    background-repeat: no-repeat; /* No repeat for background image */
    background-position: 50% 50%; /* Center background image */
    height: 114px; /* Fixed height */
    box-sizing: border-box; /* Include padding and border in total width and height */
    position: relative; /* Positioning context for absolute children */
    display: block; /* Block display */
}

/* Styles for game view containers in various contexts */
.old-lobby .deposit-alert-contain.casino .games-slider .all-games-casino-list ul li.list-games-casino-view-b,
.old-lobby .list-games-casino-view-b,
.old-lobby .save-games-contain .games-slider ul > .list-games-casino-view-b {
    float: left; /* Float to the left */
    width: 20%; /* Width of each game view */
    height: auto; /* Automatic height */
    box-sizing: border-box; /* Include padding and border in total width and height */
    display: block; /* Block display */
    margin: 0 5px 5px 0; /* Margin around the item */
    animation: popup-enter 0.3s ease-in-out; /* Animation effect on entry */
    transform: translate3d(0, 0, 0); /* 3D transform for performance */
}

/* Wrapper for separating game sections */
.old-lobby .wrapper-separator-games {
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding and border in total width and height */
}

/* Padding for the separator wrapper */
.old-lobby .wrapper-separator-games {
    padding: 0 5% !important; /* Padding on the sides */
}

/* Styles for casino resize buttons */
.old-lobby .casino-resize-buttons > div {
    display: inline-block; /* Inline block display */
    height: 60px; /* Fixed height */
}

/* Styles for favorite game name display */
.old-lobby .deposit-alert-contain.casino .game-name-b-favorite,
.old-lobby .game-name-b-favorite {
    float: left; /* Float to the left */
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding and border in total width and height */
    padding: 0 15px 0 8px; /* Padding around the text */
    height: 28px; /* Fixed height */
    background: 0 0; /* Transparent background */
    font: /* Font settings for the game name */ 12px/28px Quicksand,
    Arial,
    Helvetica,
    sans-serif;
    font-weight: 700; /* Bold font */
    color: #fbf2df; /* Text color */
    text-decoration: none; /* No underline */
    white-space: unset; /* Allow text to wrap */
    text-overflow: ellipsis; /* Ellipsis for overflow text */
    position: relative; /* Positioning context for absolute children */
    z-index: 22; /* Layering order */
    opacity: 0; /* Initially transparent */
    transition: opacity 2s; /* Fade effect on opacity change */
    text-align: center; /* Center text alignment */
    margin-bottom: 0; /* No margin below */
}

/* Styles for the favorite icon view within the old lobby */
.old-lobby .favorite-icon-view {
    width: 24px; /* Width of the favorite icon */
    height: 16px; /* Height of the favorite icon */
    position: absolute; /* Positioning the icon absolutely */
    right: 0; /* Aligns the icon to the right */
    top: 6px; /* Positions the icon 6px from the top */
    font: 14px/16px FontAwesome; /* Font settings for FontAwesome icons */
    color: #88be86; /* Default color of the icon */
    font-style: normal; /* Normal font style */
    text-decoration: none; /* No text decoration */
    z-index: 88; /* Stacking order */
    transition: color 250ms; /* Smooth color transition */
    display: block; /* Display as a block element */
    text-align: center; /* Center-aligns the icon */
}

/* Active and hover states for the favorite icon */
svg.favorite-icon-view.active,
svg.favorite-icon-view:hover {
    color: #00d30a; /* Color change on active or hover */
}

/* Styles for buttons within the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button span {
    width: 100%; /* Full width for the span */
    height: 100%; /* Full height for the span */
    display: block; /* Display as a block element */
    overflow: hidden; /* Hides overflow content */
    text-overflow: ellipsis; /* Adds ellipsis for overflow text */
    padding: 0 12px; /* Horizontal padding */
    box-sizing: border-box; /* Includes padding in width/height calculations */
}

/* Content for the favorite icon before element */
.old-lobby .favorite-icon-view:before {
    content: '\f005'; /* FontAwesome icon content */
}

/* Styles for buttons in the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
    width: 80%; /* Button width */
    font: 12px/29px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
    margin: 0 auto; /* Center the button */
}

/* Additional styles for buttons in the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
    height: 30px; /* Button height */
    display: block; /* Display as a block element */
    width: 100%; /* Full width for the button */
    padding: 0; /* No padding */
    border: 0; /* No border */
    -webkit-border-radius: 5px; /* Rounded corners for WebKit browsers */
    -moz-border-radius: 5px; /* Rounded corners for Mozilla browsers */
    border-radius: 5px; /* Standard rounded corners */
    opacity: 0; /* Initial opacity */
    transition: opacity 500ms; /* Smooth opacity transition */
    background: linear-gradient(to bottom, #00ff14, #006208); /* Gradient background */
    font-weight: bold !important; /* Bold font weight */
    color: white; /* Text color */
    font: 12px/30px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
    text-transform: uppercase; /* Uppercase text */
    cursor: pointer; /* Pointer cursor on hover */
}

/* Repeated styles for buttons in the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
    width: 80%; /* Button width */
    font: 12px/29px Quicksand, Arial, Helvetica, sans-serif; /* Font settings */
    margin: 0 auto; /* Center the button */
}

/* Styles for the casino resize buttons container */
.old-lobby .casino-resize-buttons {
    display: block; /* Display as a block element */
    width: 100%; /* Full width for the container */
    position: absolute; /* Positioning the container absolutely */
    height: 60px; /* Height of the container */
    text-align: center; /* Center-aligns content */
    top: 0; /* Aligns to the top */
    left: 0; /* Aligns to the left */
    right: 0; /* Aligns to the right */
    margin: 0; /* No margin */
    z-index: 90; /* Stacking order */
}

/* Styles for the old lobby section of the casino games view */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
    opacity: 1; /* Makes the game image box visible on hover */
}

.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
    margin-bottom: 35px !important; /* Adds bottom margin to paragraphs in resize buttons on hover */
}

.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
    transform: translateX(0); /* Resets button position on hover */
}

.old-lobby .list-games-casino-view-b:hover > a {
    border-color: #fea402; /* Changes border color of the link on hover */
}

.old-lobby .list-games-casino-view-b:hover .play-now-game-b > span {
    transform: translate3d(0, 0, 0); /* Resets 3D transformation on hover */
    opacity: 1; /* Makes the play now span visible on hover */
}

.old-lobby .list-games-casino-view-b:hover .game-name-b-favorite {
    color: white; /* Changes favorite game name color to white on hover */
}

.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div .game-name-b-favorite,
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button,
.old-lobby .list-games-casino-view-b:hover > a > .game-img-box-b:before {
    opacity: 1; /* Ensures elements are visible on hover */
}

.old-lobby .list-games-casino-view-b.rows-2 {
    grid-column: span 2; /* Spans 2 columns in grid layout */
    grid-row: span 2; /* Spans 2 rows in grid layout */
    width: 100% !important; /* Forces width to 100% */
    height: 100% !important; /* Forces height to 100% */
}

/* Keyframes for pulse animation effect on casino elements */
@keyframes pulseCasino {
    0% {
        transform: scale(1); /* Initial scale */
        box-shadow: 0 0 0 0 #ff9600; /* Initial box shadow */
    }
    70% {
        transform: scale(1); /* Maintains scale */
        box-shadow: 0 0 0 7px #0c1019 0; /* Expands box shadow */
    }
    100% {
        transform: scale(1); /* Maintains scale */
        box-shadow: 0 0 0 0 #ff9600 40; /* Resets box shadow */
    }
}

.old-lobby .neon1 {
    border: 2px solid #dc8200; /* Sets border color for neon effect */
    animation: pulseCasino 2s infinite; /* Applies pulse animation */
}

/* Media query for screens smaller than 1260px */
@media screen and (max-width: 1260px) {
    .old-lobby .all-games-casino-list {
        padding-left: 0; /* Removes left padding */
    }
}

/* Media query for screens smaller than 700px */
@media screen and (max-width: 700px) {
    .old-lobby {
        /* No specific styles for old-lobby */
    }

    .old-lobby .wrapper-separator-games {
        float: none; /* Removes float */
        margin-top: 20px; /* Adds top margin */
        overflow-y: scroll; /* Enables vertical scrolling */
        height: calc(100% - 110px); /* Sets height calculation */
    }

    .old-lobby .left-column-casino-nav > ul > li {
        /* No specific styles for list items */
    }
}

/* Media query for screens smaller than 416px */
@media only screen and (max-width: 416px) {
    .old-lobby .list-game-width-100,
    .old-lobby .list-games-casino-view-b.rows-2 {
        grid-column: span 1; /* Spans 1 column in grid layout */
        grid-row: span 1; /* Spans 1 row in grid layout */
    }

    .old-lobby .all-casino-games-list-box > div > ul {
        grid-auto-rows: minmax(120px, auto); /* Sets minimum row height */
        grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); /* Defines responsive column layout */
    }
}

/* Styles for the Poker category in the old lobby */
.old-lobby .category-list.Poker .st0 {
    fill: #d8d6ce; /* Fill color for the first state */
}

.old-lobby .category-list.Poker .st1 {
    fill: #eae9e5; /* Fill color for the second state */
}

.old-lobby .category-list.Poker .st2 {
    fill: #b99028; /* Fill color for the third state */
}

.old-lobby .category-list.Poker .st3 {
    fill: #656d78; /* Fill color for the fourth state */
}

.old-lobby .category-list.Poker .st4 {
    fill: #af8527; /* Fill color for the fifth state */
}

/* Styles for the casino view buttons in a two-row layout */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
    height: 100%; /* Full height for resize buttons */
}

.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
    height: 100% !important; /* Force full height for game image box */
}

.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
    width: 100%; /* Full width for button container */
}

.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
    width: 25px; /* Fixed width for favorite icon */
    height: 25px; /* Fixed height for favorite icon */
    font-size: 30px; /* Font size for favorite icon */
    right: 5px; /* Positioning from the right */
}

.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div button {
    margin-top: 20%; /* Margin above buttons */
    display: inline-block; /* Inline-block display for buttons */
}

/* Styles for the search input in the old lobby */
.old-lobby li#searchv3 {
    -webkit-transition: width 2s; /* Smooth transition for width change */
    transition: width 2s; /* Smooth transition for width change */
    width: 84px; /* Initial width of the search input */
}

/* Styles for the left column navigation in the casino */
.old-lobby .left-column-casino-nav > ul {
    width: 100%; /* Full width for navigation list */
    box-sizing: border-box; /* Include padding and border in width */
    display: flex; /* Block display for the list */
    white-space: nowrap; /* Prevent text wrapping */
    padding-top: 10px; /* Padding at the top */
    justify-content: center;
    align-items: center;
}

.old-lobby .left-column-casino-nav > ul {
    overflow-x: auto; /* Horizontal scroll for overflow */
    overflow-y: hidden; /* Hide vertical overflow */
}

.old-lobby .left-column-casino-nav > ul > li {
    float: none; /* No floating for list items */
    display: inline-block; /* Inline-block display for list items */
    box-sizing: border-box; /* Include padding and border in width */
    color: #fbf2df; /* Text color for navigation items */
    font: /* Font settings for navigation items */ 13px/15px Quicksand,
    Arial,
    Helvetica,
    sans-serif;
    transition: color 250ms; /* Smooth color transition */
    white-space: nowrap; /* Prevent text wrapping */
    text-overflow: ellipsis; /* Ellipsis for overflow text */
    overflow: hidden; /* Hide overflow text */
    padding: 0 2%; /* Horizontal padding for list items */
    margin-bottom: 5px; /* Margin below list items */
    vertical-align: top; /* Align items to the top */
    cursor: pointer; /* Pointer cursor on hover */
}

/* Styles for the search block in the old lobby */
.old-lobby #searchv3 .block-search {
    height: 35px !important; /* Fixed height for search block */
    min-width: 55px !important; /* Minimum width for search block */
    background: transparent; /* Transparent background */
    width: 100% !important; /* Full width for search block */
    max-width: 100% !important; /* Maximum width for search block */
    margin: 0 !important; /* No margin for search block */
    border: 1px solid #a7a7a7; /* Border styling for search block */
    border-radius: 40px; /* Rounded corners for search block */
}

.old-lobby .block-search {
    /* Container for the search block with padding and background */
    padding: 0;
    min-width: 35px; /* Minimum width for the search block */
    margin: 5px 5px 0 0; /* Margin for spacing */
    height: 30px; /* Fixed height for the search block */
    border-radius: 3px; /* Rounded corners */
    background: #fff; /* White background */
}

.old-lobby .block-search {
    /* Additional styles for the search block */
    float: right; /* Aligns the search block to the right */
    position: relative; /* Positioning context for child elements */
    z-index: 40; /* Stacking order */
    text-align: right; /* Aligns text to the right */
    max-width: 250px; /* Maximum width for the search block */
}

.old-lobby li#searchv3 input#SearchGame {
    /* Styles for the search input within the search block */
    transition: none !important; /* Disables transition effects */
    cursor: pointer !important; /* Changes cursor to pointer */
}

.old-lobby input#SearchGame.ng-hide {
    /* Styles for the hidden search input */
    width: 0; /* Initially hidden width */
    transition: width 1s; /* Transition effect for width */
    display: block !important; /* Forces display as block */
    float: right; /* Aligns to the right */
    border: 0; /* No border */
}

.old-lobby .block-search input[type='text'] {
    /* Styles for the text input in the search block */
    color: #686767; /* Text color */
    font: 12px Quicksand, /* Font family and size */ Arial,
    Helvetica,
    sans-serif;
    margin: 0; /* No margin */
    padding: 8px 5px 8px 30px; /* Padding for text input */
    background: 0 0; /* Transparent background */
    position: relative; /* Positioning context */
    z-index: 22; /* Stacking order */
}

.old-lobby .block-search input[type='text'] {
    /* Additional styles for the text input */
    width: 0; /* Initially hidden width */
    border: 0; /* No border */
    vertical-align: middle; /* Aligns input vertically */
    transition: width 600ms; /* Transition effect for width */
    border-radius: 3px; /* Rounded corners */
}

.old-lobby li#searchv3.open .block-search input[type='text'] {
    /* Styles for the text input when the search block is open */
    width: 100%; /* Full width when open */
    padding: 0 0 0 60px !important; /* Padding adjustment */
    height: 100%; /* Full height */
    color: #fff; /* Text color when open */
}

.old-lobby .search-results-inner {
    /* Container for search results */
    float: left; /* Aligns results to the left */
    width: 100%; /* Full width for results */
    padding: 10px 0 0; /* Padding for spacing */
    position: relative; /* Positioning context */
    z-index: 999; /* High stacking order */
    background: #fff; /* White background */
    border-radius: 2px; /* Slightly rounded corners */
    box-shadow: 0 45px 150px -40px #000; /* Shadow effect */
}

.old-lobby .search-results-inner .arrow-sport {
    /* Positioning for the arrow indicator */
    top: -6px; /* Adjusts vertical position */
}

.old-lobby .search-results-inner .arrow-sport {
    /* Horizontal positioning for the arrow indicator */
    right: 50%; /* Aligns to the center horizontally */
}

.old-lobby .arrow-sport {
    /* Styles for the arrow indicator */
    width: 14px; /* Width of the arrow */
    height: 11px; /* Height of the arrow */
    display: block; /* Displays as a block element */
    position: absolute; /* Absolute positioning */
    right: 2px; /* Right alignment */
    top: -11px; /* Adjusts vertical position */
    z-index: 999; /* High stacking order */
}

/* Styles for the h3 elements within the search results in the old lobby */
.old-lobby .search-results-inner h3 {
    font: 20px/22px Quicksand,
    Arial,
    Helvetica,
    sans-serif; /* Font size and line height with fallback fonts */
    color: #121623; /* Text color */
    text-transform: uppercase; /* Uppercase text */
}

/* Additional styles for h3 elements in the search results */
.old-lobby .search-results-inner h3 {
    width: 100%; /* Full width */
    float: left; /* Float to the left */
    padding: 0; /* No padding */
    text-indent: 10px; /* Indent text */
    text-align: left; /* Align text to the left */
}

/* Common styles for various containers in the old lobby */
.old-lobby #result-search,
.old-lobby .bet-container,
.old-lobby .block-more-event,
.old-lobby .clock .open-lang ul,
.old-lobby .conteiner-goals .hover-sp,
.old-lobby .deposit-alert-contain.casino .games-slider ul,
.old-lobby .express-contain,
.old-lobby .fedback-info ul li textarea,
.old-lobby .form-contain.deposit .form-sign-in,
.old-lobby .general-text-list,
.old-lobby .message-contain,
.old-lobby .radio-contein-withdraw,
.old-lobby .right-betslip-contain-modern,
.old-lobby .right-block-history.message.compose .settings-info-contain .form-text textarea,
.old-lobby .search-results-inner.casino #casino-result-search,
.old-lobby .text-payment-contain,
.old-lobby .tl-new .current-time:hover ~ .tl-info .hover-sp,
.old-lobby .tl-new .tl-info:hover .hover-sp,
.old-lobby div.draws-contain {
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling */
    scrollbar-track-color: #0c0e14; /* Color of the scrollbar track */
    scrollbar-shadow-color: #0c0e14; /* Shadow color of the scrollbar */
    scrollbar-base-color: #373f4e; /* Base color of the scrollbar */
    scrollbar-arrow-color: #373f4e; /* Arrow color of the scrollbar */
}

/* Styles for the casino search results container */
.old-lobby .search-results-inner.casino #casino-result-search {
    float: left; /* Float to the left */
    width: 100%; /* Full width */
    max-height: 450px; /* Maximum height */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling */
    margin: 10px 0 0; /* Margin at the top */
}

/* Styles for the no results found message */
.old-lobby .search-no-results {
    font: 16px/38px Quicksand,
    Arial,
    Helvetica,
    sans-serif; /* Font size and line height with fallback fonts */
    color: #f2c36f; /* Text color for no results */
    padding: 0 10px; /* Padding for the message */
    box-sizing: border-box; /* Include padding in width/height calculations */
}

/* Additional styles for the no results found message */
.old-lobby .search-no-results {
    float: left; /* Float to the left */
    width: 100%; /* Full width */
    text-align: left; /* Align text to the left */
}

/* Hide the left and right menus in the old lobby */
.old-lobby #menuLeft,
.old-lobby #menuRight {
    display: none; /* Do not display these elements */
}

/* Styles for the left providers menu */
.old-lobby #menuLeftProviders {
    float: left; /* Float to the left */
    width: 20px; /* Fixed width */
    padding: 13px 5px 13px 5px; /* Padding around the menu */
    background: #2e3244; /* Background color */
    color: #fff; /* Text color */
    position: absolute; /* Absolute positioning */
    left: 0; /* Align to the left */
    display: block; /* Display the element */
    z-index: 9; /* Stack order */
}

/* Styles for the right providers menu in the old lobby */
.old-lobby #menuRightProviders {
    float: right; /* Aligns the menu to the right */
    width: 20px; /* Sets the width of the menu */
    padding: 13px 5px 13px 5px; /* Adds padding around the menu */
    background: #2e3244; /* Background color of the menu */
    color: #fff 7; /* Text color (note: '7' seems to be an error) */
    position: absolute; /* Positions the menu absolutely */
    right: 0; /* Aligns the menu to the right edge */
    display: block; /* Displays the menu as a block element */
    z-index: 9; /* Sets the stacking order */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
    /* Hides the home slider in the old lobby */
    .old-lobby div#home-slider {
        display: none; /* Hides the element */
    }

    /* Adjusts the category list for all games */
    .old-lobby li.category-list.all-games {
        float: none !important; /* Forces the element to not float */
    }

    /* Styles for the left menu in the old lobby */
    .old-lobby #menuLeft {
        float: left; /* Aligns the menu to the left */
        width: 25px; /* Sets the width of the menu */
        padding: 30px 0; /* Adds vertical padding */
        background: #262a3a; /* Background color of the menu */
        color: #fff 7; /* Text color (note: '7' seems to be an error) */
        position: absolute; /* Positions the menu absolutely */
        left: 0; /* Aligns the menu to the left edge */
        display: block; /* Displays the menu as a block element */
        z-index: 0; /* Sets the stacking order */
    }

    /* Styles for the right menu in the old lobby */
    .old-lobby #menuRight {
        float: right; /* Aligns the menu to the right */
        width: 25px; /* Sets the width of the menu */
        padding: 30px 0; /* Adds vertical padding */
        background: #262a3a; /* Background color of the menu */
        color: #fff 7; /* Text color (note: '7' seems to be an error) */
        position: absolute; /* Positions the menu absolutely */
        right: 0; /* Aligns the menu to the right edge */
        display: block; /* Displays the menu as a block element */
        z-index: 0; /* Sets the stacking order */
    }

    /* Removes padding from the left column casino navigation */
    .old-lobby .left-column-casino-nav > ul {
        padding-left: 0; /* Removes left padding */
        padding-right: 0; /* Removes right padding */
    }

    /* Sets the width of the search element */
    .old-lobby li#searchv3 {
        width: 66px; /* Sets the width of the search element */
    }
}

/* Container for the search category navigation */
.old-lobby .search-category-nav-contain {
    width: 95%; /* Sets the width of the container */
    margin: 0 auto; /* Centers the container */
}

/* Media query for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
    /* Adjusts the height of SVG icons in the left column casino navigation */
    .old-lobby .left-column-casino-nav > ul > li svg {
        height: 35px !important; /* Forces the height of SVG icons */
    }
}

/* Styles for the casino content area */
.old-lobby div#casino-content {
    height: 100% !important; /* Forces the height to 100% */
    padding-bottom: 0 !important; /* Removes bottom padding */
}

/* Styles for the Casino Slider Box */
.old-lobby #lobby-casino div#CasinoSliderBox {
    border-radius: 0 0 35px 35px; /* Rounds the bottom corners */
    width: 91%; /* Sets the width of the slider box */
    margin: 0 auto; /* Centers the slider box */
    overflow: hidden; /* Hides overflow content */
}

/* Styles for the home slider in the lobby casino */
.old-lobby #lobby-casino div#home-slider {
    background: #091023; /* Background color of the home slider */
    box-shadow: none; /* Removes any box shadow */
}

/* Styles for SVG icons in the left column casino navigation */
.old-lobby .left-column-casino-nav > ul > li svg {
    width: 40px; /* Sets the width of SVG icons */
    height: 50px; /* Sets the height of SVG icons */
}

.old-lobby .Populares .category-icon svg {
    /* Default fill color for category icons in the Populares section */
    fill: #787f90;
}

.old-lobby .Populares:hover .category-icon svg {
    /* Fill color and transformation on hover for category icons in the Populares section */
    fill: url(#SVGID_hot) #ffc107;
    transform: scale(1.1); /* Scale up the icon */
    transition: 300ms; /* Smooth transition for the hover effect */
}

.old-lobby .Populares.active .category-icon svg {
    /* Fill color for active category icons in the Populares section */
    fill: url(#SVGID_hot) #ffc107;
}

.old-lobby li:hover .category-icon svg {
    /* Fill color and transformation on hover for category icons in list items */
    fill: url(#SVGID_slots3) #ffc107;
    transform: scale(1.1); /* Scale up the icon */
    transition: 300ms; /* Smooth transition for the hover effect */
}

.old-lobby li.active .category-icon svg {
    /* Fill color for active category icons in list items */
    fill: url(#SVGID_slots3) #ffc107;
}

.old-lobby li .category-icon svg {
    /* Default fill color for category icons in list items */
    fill: #787f90;
}

.old-lobby li.category-list.all-games {
    /* Styling for the all-games category list item */
    border-left: 2px solid #ff9600; /* Left border to highlight the item */
    margin-left: 10px; /* Left margin for spacing */
    padding-left: 15px; /* Left padding for inner spacing */
}

.old-lobby .fixed-element-parent {
    /* Container for fixed elements, full width and high z-index */
    width: 100%;
    z-index: 300; /* Layering order */
}

.old-lobby .fixed-nav-wrapper-casino-view {
    /* Fixed navigation wrapper for casino view */
    width: 100%;
    background: hsl(var(--bc)); /* Background color for the navigation */
}

.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed {
    /* Fixed position for the navigation when scrolled */
    position: fixed;
    top: 0; /* Stick to the top of the viewport */
    max-width: inherit; /* Inherit max-width from parent */
    z-index: 99; /* Layering order */
    width: 100%; /* Full width */
    background: hsl(var(--bc)) !important; /* Override background color */
    padding-top: 0; /* Remove top padding */
}

.old-lobby .fixed-element-parent .scrollable-fixed {
    /* Fixed position for scrollable elements within the parent */
    position: fixed;
    z-index: 400; /* Higher layering order */
}

.old-lobby .sticky {
    /* Sticky positioning for elements */
    position: fixed;
    top: 0; /* Stick to the top of the viewport */
    width: 100%; /* Full width */
}

.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed:before {
    /* Decorative element before the fixed navigation */
    content: ''; /* Empty content for the pseudo-element */
    display: block; /* Block display */
    position: absolute; /* Absolute positioning */
    height: 3px; /* Height of the decorative line */
    width: 100%; /* Full width */
    left: 0; /* Align to the left */
    top: -3px; /* Position above the navigation */
    background: hsl(var(--bc)); /* Background color for the decorative line */
}

.old-lobby [ng-click],
.old-lobby [ng-mousedown] {
    /* Pointer cursor for clickable elements */
    cursor: pointer;
}

.old-lobby .all-casino-games-box {
    /* Container for all casino games */
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding and border in element's total width */
    margin: 10px 0 0; /* Margin for spacing */
    z-index: 1; /* Layering order */
    margin-top: 0; /* Reset top margin */
}

.old-lobby .all-casino-games-box {
    /* User selection disabled for the games box */
    -moz-user-select: none; /* Firefox */
    -khtml-user-select: none; /* Safari */
    user-select: none; /* Standard */
    -webkit-user-select: none; /* Chrome */
    -ms-user-select: none; /* Internet Explorer */
}

/* Styles for active and hovered list items in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li.active,
.old-lobby .left-column-casino-nav > ul > li:hover {
    color: #fbf2df; /* Text color for active and hovered items */
    text-shadow: /* Multiple shadows for a glowing effect */ 0 0 20px #fff,
    0 0 20px #000,
    0 0 0 #ffd178,
    0 0 0 #f17,
    0 0 0 #f17,
    0 0 80px #f17,
    0 0 100px #f17,
    0 0 150px #f1a;
}

/* Styles for the search input when open */
.old-lobby li#searchv3.open {
    width: 100% !important; /* Forces the search input to take full width */
}

/* Removes text shadow on hover for the search input */
.old-lobby li#searchv3:hover {
    text-shadow: none !important; /* Ensures no shadow on hover */
}

/* Media query for responsive design, currently empty */
@media screen and (max-width: 1260px) {
}

/* Styles for the load more games button container */
.old-lobby .more-casino-games-load-b {
    float: left; /* Aligns the container to the left */
    width: 100%; /* Full width of the parent */
    margin: 30px 0; /* Vertical margin */
    box-sizing: border-box; /* Includes padding and border in width */
    text-align: center; /* Centers text inside the container */
    padding: 0 0 0 10px; /* Padding on the left */
    transform: translate3d(0, 0, 0); /* Enables hardware acceleration */
}

/* Styles for the paragraph inside the load more games button */
.old-lobby .more-casino-games-load-b > p {
    font: /* Font settings for the button text */ 14px/38px Quicksand,
    Arial,
    Helvetica,
    sans-serif;
    font-weight: 700; /* Bold text */
    transition: /* Smooth transition for color and border */ color 260ms,
    border 260ms;
    height: 37px; /* Fixed height */
    text-transform: uppercase; /* Uppercase text */
    border-radius: 30px; /* Rounded corners */
    width: 300px; /* Fixed width */
    margin: 0 auto; /* Center the button */
}

/* Styles for the button on hover */
.old-lobby .more-casino-games-load-b > p:hover {
    background-color: hsl(var(--pf)); /* Dark background on hover */
    color: hsl(var(--n)); /* Change text color on hover */
    cursor: pointer; /* Pointer cursor on hover */
}

/* Styles for the span inside the load more games button */
.old-lobby .more-casino-games-load-b > p > span {
    display: inline-block; /* Allows padding and alignment */
    padding: 0; /* No padding */
    text-align: center; /* Center text */
    position: relative; /* Positioning context for child elements */
}

/* Styles for the overflow container for big games */
.old-lobby .big-games-overflow {
    width: 100%; /* Full width */
    overflow: hidden; /* Hides overflow content */
    position: fixed; /* Fixed position on the screen */
    left: 0; /* Aligns to the left */
    top: 0; /* Aligns to the top */
    height: 100%; /* Full height of the viewport */
    z-index: 999999999999; /* High stacking order */
}

/* Styles for images inside the logo container */
.old-lobby .div-logo-j img {
    height: 100%; /* Full height for images */
}

/* Styles for the old lobby section */
.old-lobby .big-game-background {
    padding: 0; /* No padding */
    display: table; /* Display as a table */
    height: 100%; /* Full height */
    max-height: 100%; /* Maximum height */
    position: absolute; /* Positioned absolutely */
}

/* Styles for big game background and contain elements */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
    float: left; /* Float to the left */
    width: 100%; /* Full width */
    padding: 0; /* No padding */
    height: 100%; /* Full height */
}

/* Background properties for big game elements */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
    background-size: cover !important; /* Cover background size */
    background: black; /* Black background color */
}

/* Styles for casual game section */
.old-lobby .casual-game {
    margin: 0 auto; /* Centered margin */
    display: table; /* Display as a table */
}

/* Styles for casino game container */
.old-lobby .casino-game-contain {
    min-height: 300px; /* Minimum height */
    width: 100%; /* Full width */
    padding: 0; /* No padding */
    display: table-cell; /* Display as a table cell */
    margin: 0 auto; /* Centered margin */
    text-align: center; /* Centered text alignment */
    animation: popup-enter 400ms ease-in-out; /* Animation for popup effect */
}

/* Styles for flash game container */
.old-lobby .flash-game-contain {
    border: none; /* No border */
    border-radius: 0; /* No border radius */
    box-shadow: none; /* No box shadow */
}

/* Additional styles for flash game container */
.old-lobby .flash-game-contain {
    min-width: 300px; /* Minimum width */
    margin: 5px; /* Margin around the element */
    text-align: center; /* Centered text alignment */
    display: inline-block; /* Inline block display */
    position: relative; /* Relative positioning */
    vertical-align: top; /* Align to the top */
    overflow: hidden; /* Hide overflow */
    min-height: 100px; /* Minimum height */
}

/* Styles for big game control section */
.old-lobby .big-game-control {
    right: 0; /* Align to the right */
    float: right; /* Float to the right */
    display: inline-block; /* Inline block display */
    width: 100%; /* Full width */
    text-align: right; /* Right text alignment */
    position: absolute; /* Positioned absolutely */
    background: #0c1019; /* Dark background color */
    z-index: 10; /* High z-index for stacking */
}

/* Styles for top options in flash game container */
.old-lobby .flash-game-contain .top-options {
    display: inline-block; /* Inline block display */
}

/* Styles for delete icon in casino game container */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) {
    top: 0; /* Align to the top */
    right: 0; /* Align to the right */
    padding-right: 0; /* No right padding */
    background: #0c1019; /* Dark background color */
    height: 38px; /* Fixed height */
}

/* Styles for delete icons in casino game container */
.old-lobby .casino-game-contain .icon-delete,
.old-lobby .casino-game-contain .icon-delete.favorite,
.old-lobby .casino-game-contain .icon-delete.popup,
.old-lobby .casino-game-contain .icon-delete.refresh {
    top: 7px; /* Offset from the top */
    right: 0; /* Align to the right */
    width: 40px; /* Fixed width */
    height: 40px; /* Fixed height */
    float: none; /* No float */
    display: inline-block; /* Inline block display */
    margin-bottom: 2px; /* Margin at the bottom */
}

/* Styles for the delete icon in the old lobby section */
.old-lobby .casino-game-contain .icon-delete {
    position: relative; /* Positioning context for absolute children */
    text-indent: -9999em; /* Hides text visually while keeping it accessible */
}

/* Home delete icon styling */
.old-lobby .casino-game-contain .icon-delete.home a:before {
    content: '\f015'; /* FontAwesome icon for home */
    font: 23px/40px FontAwesome; /* Font size and line height */
    position: absolute; /* Positioned relative to the parent */
    right: 12px; /* Right alignment */
    top: -1px; /* Vertical alignment */
    text-indent: 0; /* Resets text indent for visibility */
}

/* Favorite delete icon styling */
.old-lobby .casino-game-contain .icon-delete.favorite a:before {
    content: '\f005'; /* FontAwesome icon for favorite */
    font: 18px/40px FontAwesome; /* Font size and line height */
    position: absolute; /* Positioned relative to the parent */
    right: 12px; /* Right alignment */
    top: -1px; /* Vertical alignment */
    text-indent: 0; /* Resets text indent for visibility */
}

/* Common styles for favorite delete icon links */
.old-lobby .casino-game-contain .icon-delete.favorite a,
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active,
.old-lobby .casino-game-contain .icon-delete.favorite a:hover,
.old-lobby .casino-game-contain .icon-delete.popup a,
.old-lobby .casino-game-contain .icon-delete.refresh a,
.old-lobby .casino-game-contain .icon-home.favorite a:hover {
    width: 40px; /* Fixed width */
    height: 40px; /* Fixed height */
    background: #0c1019; /* Background color */
}

/* Styles for the first child delete icon link */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) a {
    width: 20px; /* Fixed width for the first child */
    margin: 0 auto; /* Center alignment */
    text-align: center; /* Center text alignment */
    padding: 0; /* No padding */
    display: block; /* Block display */
    position: relative; /* Positioning context for absolute children */
}

/* General delete icon link styles */
.old-lobby .casino-game-contain .icon-delete a {
    background: #0c1019; /* Background color */
    width: 35px; /* Fixed width */
    height: 35px; /* Fixed height */
    top: 0; /* Top alignment */
    position: static; /* Static positioning */
    -webkit-border-radius: 25px; /* Rounded corners for WebKit browsers */
    -moz-border-radius: 25px; /* Rounded corners for Mozilla browsers */
    border-radius: 25px; /* Standard rounded corners */
}

/* Z-index and display for delete icon links */
.old-lobby .casino-game-contain .icon-delete a {
    z-index: 99; /* Stacking order */
    display: block; /* Block display */
}

/* User div styling in flash game container */
.old-lobby .flash-game-contain .user-div {
    display: inline-block; /* Inline-block display */
    float: left; /* Floats to the left */
}

/* Settings include container styling */
.old-lobby .settings-include-contain {
    float: left; /* Floats to the left */
}

/* Separator navigation container styling */
.old-lobby .separator-contain-nav {
    float: left; /* Floats to the left */
    box-sizing: border-box; /* Includes padding and border in element's total width and height */
    padding: 0 10px; /* Horizontal padding */
    box-shadow: 1px 0 0 #171a22; /* Right shadow effect */
    height: 36px; /* Fixed height */
    position: relative; /* Positioning context for absolute children */
}

/* Balance box settings icon styling */
.old-lobby .settings-icon-contain.balance-box {
    font-weight: 400; /* Normal font weight */
    transform: inherit; /* Inherits transform properties */
    border: 1 ps solid #ffb124; /* Border styling */
}

/* General settings icon container styling */
.old-lobby .settings-icon-contain.balance-box,
.old-lobby .settings-icon-contain.leng-b {
    width: auto; /* Automatic width */
    text-align: left; /* Left text alignment */
    font: 15px/20px Quicksand, Arial, Helvetica, sans-serif; /* Font family and size */
    font-weight: 700; /* Bold font weight */
    position: relative; /* Positioning context for absolute children */
    padding: 0 18px 0 2px; /* Padding for spacing */
}

.old-lobby .settings-icon-contain {
    /* Container for the settings icon in the old lobby */
    float: left; /* Aligns the icon to the left */
    height: 20px; /* Sets the height of the icon */
    cursor: pointer; /* Changes cursor to pointer on hover */
    width: 20px; /* Sets the width of the icon */
    font: 16px/20px FontAwesome; /* Uses FontAwesome for the icon font */
    color: #fff; /* Sets the icon color to white */
    text-align: center; /* Centers the icon text */
    margin: 8px 0 0; /* Adds margin to the top */
    transform: rotate(0deg) translate3d(0, 0, 0); /* Initial transform state */
    transition: transform 500ms; /* Smooth transition for transform changes */
    white-space: nowrap; /* Prevents text wrapping */
    position: relative; /* Sets positioning context for child elements */
}

.old-lobby .settings-icon-contain.balance-box > ul {
    /* Unordered list container for balance box items */
    float: left; /* Aligns the list to the left */
    width: 100%; /* Sets the width to 100% of the parent */
}

.old-lobby .settings-icon-contain.balance-box > ul > li {
    /* List item within the balance box */
    width: 100%; /* Sets the width to 100% of the parent */
    text-align: left; /* Aligns text to the left */
    height: 11px; /* Sets the height of the list item */
    position: relative; /* Sets positioning context for child elements */
    z-index: 555; /* Ensures the item is above other elements */
}

.old-lobby .settings-icon-contain.balance-box > ul > li span.valor {
    /* Span for displaying the value in the balance box */
    margin-right: 5px; /* Adds space to the right of the value */
    color: #fea402; /* Sets the color of the value text */
}

.old-lobby .div-logo-j {
    /* Container for the logo in the old lobby */
    float: left; /* Aligns the logo to the left */
    padding: 5px 20px; /* Adds padding around the logo */
    height: 37px; /* Sets the height of the logo container */
}

.old-lobby .flash-game-contain .md-progress-circular {
    /* Circular progress indicator for flash games */
    position: absolute; /* Positions the progress indicator absolutely */
    top: 40%; /* Centers the indicator vertically */
    left: 50%; /* Centers the indicator horizontally */
    margin-left: -50px; /* Offsets the indicator to center it */
    z-index: 6; /* Ensures the indicator is above other elements */
}

.old-lobby .md-progress-circular.md-theme {
    /* Theme-specific styles for the circular progress indicator */
    background: 0 0; /* Transparent background */
    animation: loader-animate-fade 1s linear; /* Fade animation for loading */
}

.old-lobby .md-progress-circular {
    /* General styles for the circular progress indicator */
    width: 100px; /* Sets the width of the indicator */
    height: 140px; /* Sets the height of the indicator */
    display: block; /* Displays the indicator as a block element */
    position: inherit; /* Inherits positioning from parent */
    margin-bottom: 0 !important; /* Removes bottom margin */
    overflow: visible; /* Allows overflow to be visible */
    margin: 0 auto; /* Centers the indicator horizontally */
    padding: 20px 0; /* Adds vertical padding */
}

@keyframes wobble {
    /* Animation keyframes for wobble effect */
    0% {
        transform: translateX(0%); /* Initial state */
    }
    15% {
        transform: translateX(-25%) rotate(-5deg); /* Moves left and rotates */
    }
    30% {
        transform: translateX(20%) rotate(3deg); /* Moves right and rotates */
    }
    45% {
        transform: translateX(-15%) rotate(-3deg); /* Moves left and rotates */
    }
    60% {
        transform: translateX(10%) rotate(2deg); /* Moves right and rotates */
    }
    75% {
        transform: translateX(-5%) rotate(-1deg); /* Moves left and rotates */
    }
    100% {
        transform: translateX(0%); /* Returns to initial state */
    }
}

/* Styles for the circular progress spinner in the old lobby */
.old-lobby .md-progress-circular .md-spinner-wrapper {
    /* Animation for the outer rotation of the spinner */
    -webkit-animation: outer-rotate 2.91667s linear infinite;
    animation: outer-rotate 2.91667s linear infinite;
}

/* Styles for the inner part of the spinner */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner {
    /* Optimizes the rendering of the transform property */
    will-change: transform;
    /* Animation for sporadic rotation of the inner spinner */
    -webkit-animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite;
    animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite;
}

/* Dimensions and positioning for the inner spinner */
.old-lobby .md-progress-circular .md-inner {
    width: 100px; /* Width of the inner spinner */
    height: 100px; /* Height of the inner spinner */
    position: relative; /* Positioning context for absolute children */
}

/* Gap styling for the themed circular progress */
.old-lobby .md-progress-circular.md-theme .md-inner .md-gap {
    border-top-color: #ffb124; /* Top border color */
    border-bottom-color: #ffb124; /* Bottom border color */
}

/* Styles for the gap in the inner spinner */
.old-lobby .md-progress-circular .md-inner .md-gap {
    position: absolute; /* Positioned relative to the inner spinner */
    left: 49px; /* Left offset */
    right: 49px; /* Right offset */
    top: 0; /* Top offset */
    bottom: 0; /* Bottom offset */
    border-top: 5px solid #000; /* Top border styling */
    box-sizing: border-box; /* Includes padding and border in element's total width and height */
}

/* Styles for the left and right halves of the spinner */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
    position: absolute; /* Positioned relative to the inner spinner */
    top: 0; /* Top offset */
    height: 100px; /* Height of the halves */
    width: 50px; /* Width of the halves */
    overflow: hidden; /* Hides overflow content */
}

/* Positioning for the left half of the spinner */
.old-lobby .md-progress-circular .md-inner .md-left {
    left: 0; /* Left offset */
}

/* Themed styling for the left half circle */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
    border-top-color: #ffb124; /* Top border color for themed halves */
}

/* Themed styling for the left half circle's left border */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle {
    border-left-color: #ffb124; /* Left border color for themed left half */
}

/* Animation settings for the half circles */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner .md-right .md-half-circle {
    -webkit-animation-iteration-count: infinite; /* Infinite animation iterations */
    animation-iteration-count: infinite; /* Infinite animation iterations */
    -webkit-animation-duration: 1.3125s; /* Duration of the animation */
    animation-duration: 1.3125s; /* Duration of the animation */
    -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1); /* Timing function for animation */
    animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1); /* Timing function for animation */
}

/* Styles for the half circles in the spinner */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
    position: absolute; /* Positioned relative to the inner spinner */
    top: 0; /* Top offset */
    width: 100px; /* Width of the half circles */
    height: 100px; /* Height of the half circles */
    box-sizing: border-box; /* Includes padding and border in element's total width and height */
    border-width: 15px; /* Border width for the half circles */
    border-style: solid; /* Solid border style */
    border-color: transparent; /* Initial border color */
    border-radius: 50%; /* Circular shape */
}

/* Positioning for the left half circle */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle {
    left: 0; /* Left offset */
}

/* Positioning for the right half of the spinner */
.old-lobby .md-progress-circular .md-inner .md-right {
    right: 0; /* Right offset */
}

/* Repeated styles for left and right halves of the spinner */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
    position: absolute; /* Positioned relative to the inner spinner */
    top: 0; /* Top offset */
    height: 100px; /* Height of the halves */
    width: 50px; /* Width of the halves */
    overflow: hidden; /* Hides overflow content */
}

/* Styles for the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
    border-right-color: #ffb124; /* Sets the right border color */
}

/* Animation for the right half-circle of the spinner */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner .md-right .md-half-circle {
    -webkit-animation-name: right-wobble; /* Animation for wobbling effect */
    animation-name: right-wobble; /* Animation for wobbling effect */
}

/* Animation for the spinner wrapper */
.old-lobby .md-spinner-wrapper .md-inner {
    -webkit-animation-name: spin !important; /* Spin animation */
    animation-name: spin !important; /* Spin animation */
}

/* Keyframes for the spin animation in Firefox */
@-moz-keyframes spin {
    100% {
        -moz-transform: rotate(360deg); /* Complete rotation */
    }
}

/* Keyframes for the spin animation in WebKit browsers */
@-webkit-keyframes spin {
    100% {
        -webkit-transform: rotate(360deg); /* Complete rotation */
    }
}

/* Keyframes for the spin animation */
@keyframes spin {
    100% {
        -webkit-transform: rotate(360deg); /* Complete rotation for WebKit */
        transform: rotate(360deg); /* Complete rotation */
    }
}

/* Animation settings for both half-circles of the spinner */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner .md-right .md-half-circle {
    -webkit-animation-iteration-count: infinite; /* Infinite animation */
    animation-iteration-count: infinite; /* Infinite animation */
    -webkit-animation-duration: 1.3125s; /* Duration of the animation */
    animation-duration: 1.3125s; /* Duration of the animation */
    -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1); /* Easing function */
    animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1); /* Easing function */
}

/* Styles for the right half-circle of the spinner */
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
    right: 0; /* Aligns to the right */
    border-left-color: transparent; /* Hides the left border */
}

/* Styles for both half-circles of the spinner */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
    position: absolute; /* Positions the half-circles absolutely */
    top: 0; /* Aligns to the top */
    width: 100px; /* Width of the half-circles */
    height: 100px; /* Height of the half-circles */
    box-sizing: border-box; /* Includes padding and border in the element's total width and height */
    border-width: 15px; /* Width of the border */
    border-style: solid; /* Solid border style */
    border-color: transparent; /* Default border color */
    border-radius: 50%; /* Makes the half-circles circular */
}

/* Styles for the add casino game button */
.old-lobby .add-casino-game {
    background: #1e2539; /* Background color */
    box-shadow: none; /* No shadow */
    text-shadow: none; /* No text shadow */
    color: #454a5a; /* Text color */
    left: calc((100% - 140px) / 2); /* Center horizontally */
    border-radius: 20%; /* Rounded corners */
}

/* Positioning for the add casino game button */
.old-lobby .add-casino-game {
    position: absolute; /* Absolute positioning */
    z-index: 99; /* High stacking order */
    top: calc((100% - 100px) / 2); /* Center vertically */
    text-align: center; /* Center text alignment */
}

/* Styles for the game content container */
.old-lobby .flash-game-contain #game-content {
    background: #0c1019; /* Background color */
    display: inline-block; /* Inline block display */
}

/* Additional styles for the game content container */
.old-lobby .flash-game-contain #game-content {
    transition: height 200ms; /* Smooth height transition */
    position: relative; /* Relative positioning */
    z-index: 5; /* Medium stacking order */
    margin-top: 55px; /* Top margin */
    overflow: hidden; /* Hides overflow content */
    width: 90vw; /* Width of 90% of the viewport width */
    height: 90vh; /* Height of 90% of the viewport height */
}

.old-lobby li#searchv3 .closed-popup-form {
    /* Aligns the closed popup form to the right */
    float: right;
    /* Positions the form relative to its normal position */
    position: relative;
    /* Sets the vertical position */
    top: 0;
    /* Sets the horizontal position */
    right: 0;
    /* Sets the stacking order of the element */
    z-index: 40;
    /* Adjusts the top margin to position the form */
    margin-top: -27px;
    /* Adjusts the right margin for spacing */
    margin-right: 14px;
}

.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active:before {
    /* Sets the color for the active favorite icon */
    color: #b5d000;
}

.old-lobby .preloader-general {
    /* Full width preloader background */
    width: 100%;
    /* Background color for the preloader */
    background: #000;
    /* Full viewport height for the preloader */
    height: 100vh;
    /* Positions the preloader absolutely */
    position: absolute;
    /* Aligns the preloader to the left */
    left: 0;
    /* High z-index to overlay other elements */
    z-index: 999999999;
}

.old-lobby .content-p img {
    /* Vertically centers the image with a specific offset */
    top: calc(50vh - 120px) !important;
    /* Sets a fixed width for the image */
    width: 240px !important;
    /* Horizontally centers the image with a specific offset */
    left: calc(50% - 120px) !important;
    /* Positions the image absolutely */
    position: absolute;
}

.old-lobby .new-casino-no-games-text {
    /* Centers the text within the container */
    text-align: center;
    /* Adds padding around the text */
    padding: 25px;
}

.old-lobby #casino-wrapper-disabled {
    /* Background color for the disabled casino wrapper */
    background: black;
    /* Full width for the wrapper */
    width: 100%;
    /* Minimum height for the wrapper */
    min-height: 700px;
    /* Adds top padding */
    padding-top: 1px;
}

.old-lobby #casino-wrapper-disabled .container-alert {
    /* Full width for the alert container */
    width: 100%;
}

.old-lobby #casino-wrapper-disabled .message-alert {
    /* Sets width and centers the alert message */
    width: 90%;
    margin: 0 auto;
    /* Text color for the alert message */
    color: white;
    /* Centers the text */
    text-align: center;
    /* Border styling for the alert message */
    border: 1px solid #b08200;
    /* Rounds the corners of the alert message */
    border-radius: 15px;
    /* Adds padding inside the alert message */
    padding: 20px;
}

.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(3) {
    /* Sets bold font weight and larger font size for the third paragraph */
    font-weight: 900;
    font-size: 22px;
}

.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(4) {
    /* Sets lighter font weight for the fourth paragraph */
    font-weight: lighter;
}

.old-lobby #casino-wrapper-disabled .message-alert span {
    /* Sets a large font size for the span element */
    font-size: 90px;
}

.old-lobby #casino-wrapper-disabled .message-alert .close {
    /* Full width for the close button */
    width: 100%;
    /* Fixed height for the close button */
    height: 23px;
    /* Displays the close button as a block element */
    display: block;
}

.old-lobby #casino-wrapper-disabled .message-alert .close span {
    /* Floats the text to the right within the close button */
    float: right;
    /* Sets font size for the close button text */
    font-size: 15px;
}

.old-lobby #casino-wrapper-disabled .money-img {
    /* Sets width for the money image */
    width: 70%;
    /* Centers the money image */
    margin: 0 auto;
    /* Adds top margin for spacing */
    margin-top: 100px;
}

.old-lobby #casino-wrapper-disabled .money-img-two {
    /* Sets width for the second money image */
    width: 70%;
    /* Centers the second money image */
    margin: 0 auto;
}

/* Styles for the old lobby when the casino wrapper is disabled */
.old-lobby #casino-wrapper-disabled .money-img img,
.old-lobby #casino-wrapper-disabled .money-img-two img {
    width: 100%; /* Set image width to 100% of the container */
    display: block; /* Display images as block elements */
}

/* Styles for the close icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-times {
    float: right; /* Float the icon to the right */
    color: white; /* Set icon color to white */
}

/* Styles for the mobile icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-mobile {
    font-size: 80px; /* Set font size for mobile icon */
}

/* Media query for screens wider than 736px */
@media only screen and (min-width: 736px) {
    /* Styles for message alert in the disabled casino wrapper */
    .old-lobby #casino-wrapper-disabled .message-alert {
        width: 35%; /* Set width to 35% of the container */
        margin: 0 auto; /* Center the alert horizontally */
        color: white; /* Set text color to white */
        text-align: center; /* Center text alignment */
        border: 1px solid #b08200; /* Add a border with a specific color */
        border-radius: 15px; /* Round the corners of the border */
    }

    /* Styles for money images in the disabled casino wrapper */
    .old-lobby #casino-wrapper-disabled .money-img,
    .old-lobby #casino-wrapper-disabled .money-img-two {
        width: 25%; /* Set width to 25% of the container */
    }
}

/* Set height for the casino content area */
.old-lobby div#casino-content {
    height: 100vh; /* Full viewport height */
}

/* Aspect ratio box for game images in the new lobby */
.new-lobby .games-aspect .game-img-box-b::before {
    content: ''; /* Empty content for the pseudo-element */
    display: block; /* Display as a block element */
    height: 0; /* No height */
    width: 0; /* No width */
    padding-bottom: calc(16 / 16 * 100%); /* Maintain aspect ratio */
}

/* Styles for the preview section in the new lobby */
.new-lobby .c-preview {
    background: #000; /* Set background color to black */
    background: -moz-linear-gradient(/* Mozilla gradient */ -45deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
    );
    background: -webkit-linear-gradient(/* Webkit gradient */ -45deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
    );
    background: linear-gradient(/* Standard gradient */ 135deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
    );
    background-size: 400% 400%; /* Set background size for animation */
    background-repeat: no-repeat; /* Prevent background repetition */
    display: flex; /* Use flexbox for layout */
    width: 500px; /* Set fixed width */
    height: 500px; /* Set fixed height */
    max-width: 100vw; /* Limit maximum width to viewport width */
    max-height: 100vh; /* Limit maximum height to viewport height */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    color: #fff; /* Set text color to white */
    position: relative; /* Set position for absolute children */
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: 0.5s all; /* Smooth transition for all properties */
}

.new-lobby .c-preview:hover {
    /* Changes background position on hover for the preview element */
    background-position: 100% 100% !important;
}

.new-lobby .c-preview:hover {
    /* Applies a blur effect on hover for the preview element */
    filter: blur(10px) !important;
}

.new-lobby .list-games-casino-view-b {
    /* Sets initial opacity and animation properties for the game list */
    opacity: 0;
    animation-name: bounceIn; /* Name of the animation to be used */
    animation-duration: 450ms; /* Duration of the animation */
    animation-timing-function: linear; /* Timing function for the animation */
    animation-fill-mode: forwards; /* Keeps the final state of the animation */
    animation-delay: 2s; /* Delay before the animation starts */
}

@keyframes bounceIn {
    /* Defines the keyframes for the bounceIn animation */
    0% {
        opacity: 0; /* Start fully transparent */
        transform: scale(0.3) translate3d(0, 0, 0); /* Start scaled down */
    }
    50% {
        opacity: 0.9; /* Midway opacity */
        transform: scale(1.1); /* Scale up slightly */
    }
    80% {
        opacity: 1; /* Fully opaque */
        transform: scale(0.89); /* Scale down slightly */
    }
    100% {
        opacity: 1; /* Fully opaque */
        transform: scale(1) translate3d(0, 0, 0); /* Final scale */
    }
}

.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
    /* Displays resize buttons on hover over the game list */
    display: block !important;
}

.new-lobby li.providers-list {
    /* Sets width and vertical alignment for provider list items */
    width: calc((100% - 320px) / 6); /* Responsive width calculation */
    vertical-align: middle; /* Aligns items vertically in the middle */
}

.new-lobby .category-list:hover {
    /* Scales up the category list on hover */
    -webkit-transform: scale(1.1); /* For Safari */
    -ms-transform: scale(1.1); /* For Internet Explorer */
    transform: scale(1.1); /* Standard scaling */
}

.new-lobby .category-list {
    /* Applies transition effects to the category list */
    transition: all 0.3s ease; /* Smooth transition for all properties */
}

.new-lobby .rainbow {
    /* Styles for the rainbow element, including animation */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    animation: rotate linear 8s infinite; /* Continuous rotation animation */
    position: absolute; /* Positioned absolutely within its parent */
}

.new-lobby .rainbow span {
    /* Styles for the span elements inside the rainbow */
    display: block; /* Block display for spans */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    position: relative; /* Positioned relative for child elements */
    transform: translate(-50%, -50%); /* Centering transformation */
}

.new-lobby .rainbow span:after {
    /* Styles for the after pseudo-element of spans */
    display: block; /* Block display */
    content: ''; /* Empty content for the pseudo-element */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    position: absolute; /* Positioned absolutely */
    left: 100%; /* Positioned to the right of the span */
}

.new-lobby .rainbow span:first-child {
    /* Background color for the first span in the rainbow */
    background: #5500ff; /* Purple color */
}

.new-lobby .rainbow span:first-child:after {
    /* Background color for the after pseudo-element of the first span */
    background: #ffb000; /* Yellow color */
}

.new-lobby .rainbow span:last-child {
    /* Background color for the last span in the rainbow */
    background: #ff006c; /* Pink color */
}

/* Styles for the new lobby section */
.new-lobby .rainbow span:last-child:after {
    background: #00ffdc; /* Sets the background color for the last child span in the rainbow class */
}

/* Container for the subscription box */
.new-lobby .c-subscribe-box {
    overflow: hidden; /* Prevents overflow of content */
    position: relative; /* Positions the box relative to its normal position */
    box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2); /* Adds a shadow effect */
    border-radius: 8px; /* Rounds the corners of the box */
}

/* Wrapper for the contents of the subscription box */
.new-lobby .c-subscribe-box__wrapper {
    padding: 4px; /* Adds padding inside the wrapper */
    display: flex; /* Uses flexbox layout */
    flex-direction: column; /* Stacks children vertically */
    border-radius: calc(8px / 2); /* Rounds the corners with half the radius of the parent */
}

/* Title style for the subscription box */
.new-lobby .c-subscribe-box__title {
    font-size: 1.6rem; /* Sets the font size for the title */
}

/* Description style for the subscription box */
.new-lobby .c-subscribe-box__desc {
    font-size: 0.935rem; /* Sets the font size for the description */
    margin: 0.7rem auto 1.8rem; /* Adds vertical margins */
    max-width: 240px; /* Limits the maximum width */
}

/* Form container style within the subscription box */
.new-lobby .c-subscribe-box__form {
    margin-top: auto; /* Pushes the form to the bottom of the box */
}

/* Styles for accentuated form inputs on hover, active, and focus states */
.new-lobby .c-form--accent input:hover,
.c-form--accent input:active,
.c-form--accent input:focus {
    border-color: #e85f99; /* Changes border color on interaction */
    box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Adds a shadow effect */
}

/* Submit button styles for accentuated forms */
.new-lobby .c-form--accent [type='submit'] {
    background: #e85f99; /* Sets background color for the submit button */
    border-color: #e85f99; /* Sets border color for the submit button */
    color: #fff; /* Sets text color for the submit button */
}

/* Keyframes for rotation animation */
@keyframes rotate {
    0% {
        transform: rotate(0); /* Initial state of rotation */
    }
    100% {
        transform: rotate(360deg); /* Final state of rotation */
    }
}

/* Search input transition effect */
.new-lobby li#searchv3 {
    -webkit-transition: width 2s; /* Transition effect for width on WebKit browsers */
    transition: width 2s; /* Transition effect for width */
    width: 84px; /* Initial width of the search input */
}

/* Styles for the search block within the search input */
.new-lobby #searchv3 .block-search {
    height: 35px !important; /* Sets height with !important to override other styles */
    min-width: 55px !important; /* Sets minimum width with !important */
    background: transparent; /* Sets background to transparent */
    width: 100% !important; /* Forces width to 100% with !important */
    max-width: 100% !important; /* Forces maximum width to 100% with !important */
    margin: 0 !important; /* Resets margin with !important */
    border: 1px solid #a7a7a7; /* Sets border color */
    border-radius: 40px; /* Rounds the corners of the search block */
}

/* General styles for the search block */
.new-lobby .block-search {
    padding: 0; /* Removes padding */
    min-width: 35px; /* Sets minimum width */
    margin: 5px 5px 0 0; /* Adds margin */
    height: 30px; /* Sets height */
    border-radius: 3px; /* Rounds the corners */
    background: #fff; /* Sets background color */
}

/* Positioning and layout for the search block */
.new-lobby .block-search {
    float: right; /* Floats the search block to the right */
    position: relative; /* Positions the search block relative to its normal position */
    z-index: 999; /* Sets a high stacking order */
    text-align: right; /* Aligns text to the right */
    max-width: 250px; /* Limits the maximum width */
}

.new-lobby li#searchv3 input#SearchGame {
    /* Disable transition effects and set cursor style for the search input */
    transition: none !important;
    cursor: pointer !important;
}

.new-lobby input#SearchGame.ng-hide {
    /* Styles for the search input when hidden (ng-hide class applied) */
    width: 0; /* Initial width set to 0 */
    transition: width 1s; /* Smooth transition for width change */
    display: block !important; /* Ensure the element is displayed */
    float: right; /* Align to the right */
    border: 0; /* Remove border */
}

.new-lobby .block-search input[type='text'] {
    /* Base styles for text input within the block search */
    color: #686767; /* Text color */
    font: 12px Quicksand,
    Arial,
    Helvetica,
    sans-serif; /* Font settings */
    margin: 0; /* Remove default margin */
    padding: 8px 5px 8px 30px; /* Padding for input */
    background: 0 0; /* Transparent background */
    position: relative; /* Positioning context for child elements */
    z-index: 22; /* Layering order */
}

.new-lobby .block-search input[type='text'] {
    /* Additional styles for text input */
    width: 0; /* Initial width set to 0 */
    border: 0; /* Remove border */
    vertical-align: middle; /* Align vertically in the middle */
    transition: width 600ms; /* Smooth transition for width change */
    border-radius: 3px; /* Rounded corners */
}

.new-lobby li#searchv3.open .block-search input[type='text'] {
    /* Styles for text input when the search block is open */
    width: 100%; /* Full width when open */
    padding: 0 0 0 60px !important; /* Padding adjustment */
    height: 100%; /* Full height */
    color: #fff; /* Text color when open */
}

.new-lobby .search-results-inner {
    /* Container for search results */
    float: left; /* Align to the left */
    width: 100%; /* Full width */
    padding: 10px 0 0; /* Padding for top */
    position: relative; /* Positioning context for child elements */
    z-index: 999; /* High layering order */
    background: #fff; /* White background */
    border-radius: 2px; /* Slightly rounded corners */
    box-shadow: 0 45px 150px -40px #000; /* Shadow effect */
}

.new-lobby .search-results-inner .arrow-sport {
    /* Positioning for the arrow indicator */
    top: -6px; /* Adjust vertical position */
}

.new-lobby .search-results-inner .arrow-sport {
    /* Horizontal positioning for the arrow indicator */
    right: 50%; /* Center horizontally */
}

.new-lobby .arrow-sport {
    /* Styles for the arrow indicator */
    width: 14px; /* Width of the arrow */
    height: 11px; /* Height of the arrow */
    display: block; /* Display as block element */
    position: absolute; /* Absolute positioning */
    right: 2px; /* Position from the right */
    top: -11px; /* Position from the top */
    z-index: 999; /* High layering order */
}

.new-lobby .search-results-inner h3 {
    /* Styles for the heading in search results */
    font: 20px/22px Quicksand,
    Arial,
    Helvetica,
    sans-serif; /* Font settings */
    color: #121623; /* Text color */
    text-transform: uppercase; /* Uppercase text */
}

.new-lobby .search-results-inner h3 {
    /* Additional styles for the heading */
    width: 100%; /* Full width */
    float: left; /* Align to the left */
    padding: 0; /* Remove padding */
    text-indent: 10px; /* Indent text */
    text-align: left; /* Align text to the left */
}

/* Styles for various containers and elements in the new lobby */
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
    scrollbar-track-color: #0c0e14;
    scrollbar-shadow-color: #0c0e14;
    scrollbar-base-color: #373f4e;
    scrollbar-arrow-color: #373f4e;
}

/* Styles for the search results container in the new lobby */
.new-lobby .search-results-inner.casino #casino-result-search {
    float: left; /* Align to the left */
    width: 100%; /* Full width */
    max-height: 450px; /* Maximum height for scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Hide horizontal scrolling */
    margin: 10px 0 0; /* Margin for spacing */
}

/* Styles for the no results message in the new lobby */
.new-lobby .search-no-results {
    font: /* Font settings for the message */ 16px/38px Quicksand,
    Arial,
    Helvetica,
    sans-serif;
    color: #f2c36f; /* Text color */
    padding: 0 10px; /* Padding for spacing */
    box-sizing: border-box; /* Include padding in width calculations */
}

/* Additional styles for the no results message */
.new-lobby .search-no-results {
    float: left; /* Align to the left */
    width: 100%; /* Full width */
    text-align: left; /* Left align text */
}

/* Responsive styles for screens smaller than 550px */
@media screen and (max-width: 550px) {
    .new-lobby li#searchv3 {
        width: 66px; /* Set width for search item */
    }

    .new-lobby li.providers-list {
        width: auto; /* Auto width for providers list */
    }

    .new-lobby li#searchv3.open {
        width: 60% !important; /* Override width when open */
    }
}

/* Styles for the open state of the search item */
.new-lobby li#searchv3.open {
    width: 30%; /* Set width when open */
}

/* Styles for hover state of the search item */
.new-lobby li#searchv3:hover {
    text-shadow: none !important; /* Remove text shadow on hover */
}

/* Styles for the closed popup form within the search item */
.new-lobby li#searchv3 .closed-popup-form {
    float: right; /* Align to the right */
    position: relative; /* Position relative for adjustments */
    top: 0; /* No vertical offset */
    right: 0; /* No horizontal offset */
    z-index: 1000; /* High z-index for stacking */
    margin-top: -27px; /* Negative margin for positioning */
    margin-right: 14px; /* Right margin for spacing */
}

/* Styles for the new lobby section */
.new-lobby .c-box-rgb {
    position: relative; /* Positioning context for child elements */
    overflow: visible !important; /* Ensures overflow is visible */
    background: linear-gradient(0deg, #000, #272727); /* Background gradient from black to dark gray */
}

/* Pseudo-elements for decorative effects */
.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
    content: ''; /* Empty content for pseudo-elements */
    position: absolute; /* Positioning relative to the parent */
    left: -3px; /* Offset to the left */
    top: -3px; /* Offset to the top */
    background: linear-gradient(/* Multi-color gradient background */ 45deg,
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
    background-size: 400%; /* Size of the background gradient */
    width: calc(100% + 6px); /* Width extends beyond the parent */
    height: calc(100% + 6px); /* Height extends beyond the parent */
    z-index: -1; /* Positioned behind other elements */
    animation: steam 20s linear infinite; /* Animation for the background */
    border-radius: 13px; /* Rounded corners */
}

/* Keyframes for the steam animation */
@keyframes steam {
    0% {
        background-position: 0 0; /* Starting position */
    }
    50% {
        background-position: 400% 0; /* Midway position */
    }
    100% {
        background-position: 0 0; /* Reset to starting position */
    }
}

/* Blur effect for the after pseudo-element */
.new-lobby .c-box-rgb:after {
    filter: blur(5px); /* Applies a blur effect */
}

/* Button styling for play button */
.new-lobby .btn-play {
    margin-top: calc(50% - 60px); /* Centering the button vertically */
}

/* Carousel container styles */
.carousel {
    position: relative; /* Positioning context for child elements */
}

/* Inner carousel styles */
.carousel-inner {
    position: relative; /* Positioning context for child elements */
    overflow: hidden; /* Hides overflow content */
    width: 100%; /* Full width */
}

/* Styles for the active carousel item */
.carousel-open:checked + .carousel-item {
    position: static; /* Changes position to static when active */
    opacity: 100; /* Fully visible */
}

/* Carousel item styles */
.carousel-item {
    position: absolute; /* Positioned absolutely within the carousel */
    opacity: 0; /* Initially hidden */
    -webkit-transition: opacity 0.6s ease-out; /* Transition for opacity */
    transition: opacity 0.6s ease-out; /* Transition for opacity */
}

/* Image styles within carousel items */
.carousel-item img {
    display: block; /* Ensures no extra space below the image */
    height: auto; /* Maintains aspect ratio */
    max-width: 100%; /* Responsive width */
}

/* Carousel control button styles */
.carousel-control {
    background: rgba(0, 0, 0, 0.28); /* Semi-transparent background */
    border-radius: 50%; /* Circular shape */
    color: #fff; /* White text color */
    cursor: pointer; /* Pointer cursor on hover */
    display: none; /* Hidden by default */
    font-size: 40px; /* Font size for the control */
    height: 40px; /* Height of the control */
    line-height: 35px; /* Centering text vertically */
    position: absolute; /* Positioned absolutely within the carousel */
    top: 50%; /* Centered vertically */
    -webkit-transform: translate(0, -50%); /* Centering transform for WebKit browsers */
    cursor: pointer; /* Pointer cursor on hover */
    -ms-transform: translate(0, -50%); /* Centering transform for IE */
    transform: translate(0, -50%); /* Centering transform */
    text-align: center; /* Center text horizontally */
    width: 40px; /* Width of the control */
    z-index: 10; /* Positioned above other elements */
}

/* Styles for the previous carousel control button */
.carousel-control.prev {
    left: 2%; /* Positioning the previous control button to the left */
}

/* Styles for the next carousel control button */
.carousel-control.next {
    right: 2%; /* Positioning the next control button to the right */
}

/* Styles for carousel control buttons on hover */
.carousel-control:hover {
    background: rgba(0, 0, 0, 0.8); /* Dark background on hover */
    color: #aaaaaa; /* Light text color on hover */
}

/* Display control elements based on checked state of carousels */
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
    display: block; /* Show corresponding control when carousel is checked */
}

/* Styles for carousel indicators */
.carousel-indicators {
    list-style: none; /* Remove default list styling */
    margin: 0; /* Reset margin */
    padding: 0; /* Reset padding */
    position: absolute; /* Positioning indicators absolutely */
    bottom: 2%; /* Positioning from the bottom */
    left: 0; /* Align to the left */
    right: 0; /* Align to the right */
    text-align: center; /* Center the indicators */
    z-index: 10; /* Ensure indicators are above other elements */
}

/* Styles for individual carousel indicator items */
.carousel-indicators li {
    display: inline-block; /* Display indicators inline */
    margin: 0 5px; /* Margin between indicators */
}

/* Styles for carousel bullet indicators */
.carousel-bullet {
    color: #fff; /* Default bullet color */
    cursor: pointer; /* Pointer cursor on hover */
    display: block; /* Block display for bullets */
    font-size: 35px; /* Font size for bullets */
}

/* Styles for carousel bullet on hover */
.carousel-bullet:hover {
    color: #aaaaaa; /* Change color on hover */
}

/* Change bullet color based on checked carousel */
#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
    color: #428bca; /* Highlight color for active bullet */
}

/* Background style for the casino section */
.flex.casino {
    background: #091023; /* Dark background for casino section */
}

/* Styles for the inner carousel in the lobby */
#lobby-casino .carousel-inner {
    border-radius: 0 0 30px 30px; /* Rounded corners for the bottom */
}

/* Styles for provider images */
.img-prov {
    height: auto; /* Maintain aspect ratio */
    width: auto; /* Maintain aspect ratio */
    max-width: 100%; /* Limit maximum width */
    max-height: 100%; /* Limit maximum height */
    margin: auto; /* Center the image */
    filter: grayscale(100%); /* Apply grayscale filter */
}

/* Styles for colored provider images */
.img-prov.color {
    filter: grayscale(0%) !important; /* Remove grayscale filter */
}

/* Styles for showing dropdown elements */
.show-drop {
    opacity: 1 !important; /* Ensure dropdown is fully visible */
    visibility: visible !important; /* Ensure dropdown is visible */
    position: relative !important; /* Maintain relative positioning */
}

/* Styles for dropdown content specific to providers */
.dropdown-content.prov {
    opacity: 0; /* Initially hidden */
    visibility: hidden; /* Initially hidden */
    position: absolute; /* Positioning dropdown absolutely */
    background-color: #dfdfdf; /* Light background color */
}

/* Styles for provider list items in the old lobby */
.old-lobby li.providers-list {
    width: auto; /* Allow auto width for list items */
    vertical-align: middle; /* Align items vertically in the middle */
}

/* Visibility and opacity settings for dropdown elements */
.ver-drop {
    visibility: visible !important; /* Ensures the dropdown is visible */
    opacity: 1 !important; /* Sets full opacity */
}

/* Hides the scrollbar for the left column casino providers navigation */
ul.left-column-casino-providers-nav::-webkit-scrollbar {
    display: none; /* Prevents scrollbar from being displayed */
}

/* Style for the casino games box with style4 */
.all-casino-games-box.style4 {
    position: absolute; /* Positions the element absolutely */
    margin-top: -116px !important; /* Adjusts the top margin */
}

/* Background gradient for the fixed navigation wrapper in style4 */
.all-casino-games-box.style4 .fixed-nav-wrapper-casino-view {
    background: linear-gradient(0deg, rgb(0 6 22) 50%, rgba(9, 16, 35, 0) 100%) !important; /* Applies a linear gradient background */
}

/* Style for Playtech jackpot elements */
.playtech-jackpot {
    width: 100%; /* Sets width to 100% */
    color: white; /* Sets text color to white */
    border-radius: 4px; /* Rounds the corners */
    display: block; /* Displays as a block element */
}

/* Style for the right menu button */
button#menuRight {
    width: 25px; /* Sets width */
    padding: 45px 0; /* Adds vertical padding */
    background: #262a3a; /* Sets background color */
    color: rgba(255, 255, 255, 0.8705882352941177); /* Sets text color with transparency */
    position: absolute; /* Positions the button absolutely */
    right: 0; /* Aligns to the right */
    display: block; /* Displays as a block element */
    z-index: 10; /* Sets stacking order */
    height: 100%; /* Sets height to 100% */
    margin-top: -5px; /* Adjusts top margin */
    vertical-align: middle; /* Aligns vertically in the middle */
    background: -webkit-linear-gradient(/* Applies a linear gradient background */ 90deg,
    rgb(20, 21, 24) 1%,
    rgb(42, 45, 58) 48%,
    rgb(17, 18, 23) 100%
    ) !important; /* Ensures the gradient is applied */
    cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Style for the left menu button */
button#menuLeft {
    float: left; /* Floats the button to the left */
    width: 25px; /* Sets width */
    padding: 45px 0; /* Adds vertical padding */
    background: #262a3a; /* Sets background color */
    color: rgba(255, 255, 255, 0.8705882352941177); /* Sets text color with transparency */
    position: absolute; /* Positions the button absolutely */
    left: 0; /* Aligns to the left */
    display: block; /* Displays as a block element */
    z-index: 1; /* Sets stacking order */
    margin-top: -5px; /* Adjusts top margin */
    height: 100%; /* Sets height to 100% */
    background: -webkit-linear-gradient(/* Applies a linear gradient background */ 90deg,
    rgb(20, 21, 24) 1%,
    rgb(42, 45, 58) 48%,
    rgb(17, 18, 23) 100%
    ) !important; /* Ensures the gradient is applied */
    cursor: pointer; /* Changes cursor to pointer on hover */
}

/* Style for alert messages when the casino wrapper is disabled */
#casino-wrapper-disabled .message-alert {
    width: 90%; /* Sets width to 90% */
    margin: 0 auto; /* Centers the alert */
    color: #fff; /* Sets text color to white */
    text-align: center; /* Centers text */
    border: 1px solid #b08200; /* Adds a border with a specific color */
    border-radius: 15px; /* Rounds the corners */
    padding: 20px; /* Adds padding */
}

/* Style for the first money image when the casino wrapper is disabled */
#casino-wrapper-disabled .money-img {
    width: 70%; /* Sets width to 70% */
    margin: 100px auto 0; /* Centers the image with top margin */
}

/* Style for the second money image when the casino wrapper is disabled */
#casino-wrapper-disabled .money-img-two {
    width: 70%; /* Sets width to 70% */
    margin: 0 auto; /* Centers the image */
}

/* Media query for screens wider than 736px */
@media only screen and (min-width: 736px) {
    /* Set width for money images in disabled casino wrapper */
    #casino-wrapper-disabled .money-img,
    #casino-wrapper-disabled.money-img-two {
        width: 25%;
    }

    /* Style for alert message in disabled casino wrapper */
    #casino-wrapper-disabled .message-alert {
        width: 35%; /* Set width of alert message */
        margin: 0 auto; /* Center the alert message */
        color: #fff; /* Text color */
        text-align: center; /* Center text alignment */
        border: 1px solid #b08200; /* Border styling */
        border-radius: 15px; /* Rounded corners */
    }
}

/* Margin for money images in disabled casino wrapper */
#casino-wrapper-disabled .money-img {
    margin: 100px auto 0; /* Top margin for spacing */
}

/* Set width and display for images within money images */
#casino-wrapper-disabled .money-img-two img,
#casino-wrapper-disabled .money-img img {
    width: 100%; /* Full width for images */
    display: block; /* Block display for images */
}

/* Style for the third paragraph in the alert message */
#casino-wrapper-disabled .message-alert p:nth-child(3) {
    font-weight: 900; /* Bold font weight */
    font-size: 22px; /* Font size */
}

/* Style for the fourth paragraph in the alert message */
#casino-wrapper-disabled .message-alert p:nth-child(4) {
    font-weight: lighter; /* Lighter font weight */
}

/* Set width for money images in disabled casino wrapper */
#casino-wrapper-disabled .money-img,
#casino-wrapper-disabled .money-img-two {
    width: 25%; /* Width for money images */
}

/* Center money image two in disabled casino wrapper */
#casino-wrapper-disabled .money-img-two {
    margin: 0 auto; /* Center alignment */
}

/* Style for close icon in alert message */
#casino-wrapper-disabled i.fa.fa-times {
    float: right; /* Float to the right */
    color: #fff; /* Icon color */
}

/* Style for close button in alert message */
#casino-wrapper-disabled .message-alert .close {
    width: 100%; /* Full width for close button */
    height: 23px; /* Height for close button */
    display: block; /* Block display */
}

/* Font size for mobile icon */
#casino-wrapper-disabled i.fa.fa-mobile {
    font-size: 80px; /* Set font size */
}

/* Full width for alert container */
#casino-wrapper-disabled .container-alert {
    width: 100%; /* Full width */
}

/* Background and dimensions for disabled casino wrapper */
#casino-wrapper-disabled {
    background: #000; /* Black background */
    width: 100%; /* Full width */
    min-height: 700px; /* Minimum height */
    padding-top: 1px; /* Top padding */
}

/* Fill color for polygons in category list */
li.category-list.Bingos polygon {
    fill: white !important; /* Force white fill color */
}

/* Full height for casino content */
div#casino-content {
    height: 100vh; /* Full viewport height */
}
</style>


<!-- FILE DOCUMENTED -->

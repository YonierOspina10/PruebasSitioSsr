<script lang="ts">
import { defineComponent, ref, watch } from 'vue'; // Import necessary Vue functions
import { useRoute } from 'vue-router'; // Import router functionality
import apiService from '@/services/ApiService'; // Import API service for data fetching
import AppCarousel from '@/components/Carousel.vue'; // Import carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Import left chevron icon
import IconChevronRight from './icons/IconChevronRight.vue'; // Import right chevron icon
import ExitIcon from './icons/ExitIcon.vue'; // Import exit icon
import IconChevrondown from './icons/IconChevrondown.vue'; // Import down chevron icon
import { useGlobalStore } from '@/stores/global'; // Import global store for state management
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Import animated placeholder component
import IconUser from '@/components/icons/IconUser.vue';
import { toKebabCase } from '@/utils'; // Import user icon component
declare var Ticker: any; // Declare Ticker variable for external library usage

export default defineComponent({
    props: {
        category: String, // Category prop
        limit: { type: Number, default: 24 }, // Limit prop with default value
        typelobby: String, // Type lobby prop
        title: { type: String, default: '' }, // Title prop with default value
        url: { type: String, default: '' }, // URL prop with default value
        offset: { type: Number, default: 0 }, // Offset prop with default value
        icon: { type: String, default: '' }, // Icon prop with default value
        styleVersion: { type: Number, default: 1 }, // Style version prop with default value
        lowerCaseText: { type: Boolean, default: false }, // Lowercase text prop
    },
    components: {
        AnimatedPlaceholder, // Register animated placeholder component
        AppCarousel, // Register carousel component
        favoriteIcon, // Register favorite icon component
        searchIcon, // Register search icon component
        IconClose, // Register close icon component
        animatedCloseIcon, // Register animated close icon component
        IconChevronLeft, // Register left chevron icon
        IconChevronRight, // Register right chevron icon
        ExitIcon, // Register exit icon
        IconChevrondown, // Register down chevron icon
        IconUser, // Register user icon component
    },
    data: function () {
        let config = this.$config(); // Get configuration
        let appComponent: any = this.$appComponent; // Get app component
        let emitter: any = this.$emitter(); // Get event emitter
        let bgGame: any = {}; // Background game object
        let preloaderShow: boolean = false; // Preloader visibility state
        let gameSelected: any = {}; // Selected game object
        let showGame: boolean = false; // Game visibility state
        let src: string = ''; // Source string
        let margin: number = 0; // Margin value
        let optionsGames: any = ''; // Options for games
        let partnerG: any = ''; // Partner identifier
        let limitBefore: any = ''; // Limit before value
        let urlVirtualplay: any = ''; // URL for virtual play
        let providers: any = ''; // Providers data
        let providersLength: any = ''; // Length of providers
        let categories: any = ''; // Categories data
        let categoriesLength: any = ''; // Length of categories
        let favorites = []; // Array to hold favorite games
        let storeCasinoLobby = useGlobalStore(); // Access global store

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:CasinoSlider3V2|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:CasinoSlider3V2|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:CasinoSlider3V2|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${appComponent.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider3V2|layout:${appComponent.config.layout}`,
            })
        }

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
            favorites,
            emitter,
            storeCasinoLobby,
            analyticsAttrs,
        };
    },
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
    unmounted() {
        this.emitter.all.delete('gamesFavorites'); // Clean up event listener on unmount

    },
    mounted() {
        watch(
            () => this.route.params.ProviderId, // Watch for changes in provider ID
            (newProviderId) => {
                const urlParams = new URLSearchParams(window.location.search); // Get URL parameters
                const externalClick = urlParams.get('is_external_click'); // Check for external click parameter
                if (externalClick === 'true') {
                    urlParams.delete('is_external_click'); // Remove parameter after use
                    this.appComponent.gamesList = []; // Reset games list
                    this.storeCasinoLobby.provider = newProviderId; // Update provider in store
                    this.appComponent.selections.provider = newProviderId; // Update provider selection
                    this.storeCasinoLobby.category = 'all'; // Reset category in store
                    this.emitter.emit('get:gamesList'); // Emit event to get games list
                    this.getCasinoGames(); // Fetch casino games
                }
            },
        );
        this.appComponent.limitLocal = this.limit; // Set local limit
        this.urlVirtualplay = this.config.urlVirtualplay; // Set virtual play URL
        this.partnerG = this.appComponent.partnerG; // Set partner identifier
        if (
            (window.localStorage.getItem('m_c_g') !== null &&
                window.localStorage.getItem('m_c_g') !== undefined &&
                this.appComponent.config.activeFavoritesWithBackend == undefined) ||
            (window.localStorage.getItem('m_c_g') !== null &&
                window.localStorage.getItem('m_c_g') !== undefined &&
                this.appComponent.config.activeFavoritesWithBackend == false)
        ) {
            var json_str: any = window.localStorage.getItem('m_c_g'); // Get favorite games from local storage
            this.appComponent.myCasinoGames = JSON.parse(json_str); // Parse and set favorite games
        }
        this.emitter.on('gamesFavorites', () => {
            this.getFavoriteGames(); // Fetch favorite games on event
        });
        this.getCasinoGames(); // Fetch casino games on mount

    },
    watch: {
        'appComponent.session.logueado': {
        handler(newVal, oldVal) {
            if (
                newVal &&
                !oldVal &&
                this.appComponent.config.activeFavoritesWithBackend
            ) {
                this.getFavoriteGames();
            }
        },
        immediate: false,
    },
    },
    methods: {
        async getCasinoGames() {
            this.appComponent.loadingGames = true; // Set loading state
            var vthis = this; // Preserve context
            this.bgGame = {
                background: 'url(' + this.config.casino.preloaderGame + ')no-repeat 0 50%/cover', // Set background for preloader
            };
            this.preloaderShow = true; // Show preloader
            this.appComponent.showMore = true; // Show more button
            if (
                (this.categoryId == undefined || this.categoryId == '' || this.categoryId == 'todos-all') &&
                (this.providerId == undefined || this.providerId == '') &&
                this.$route.path.indexOf('bingos') == -1
            ) {
                this.optionsGames = {
                    action:
                        this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                            ? 'getGames2'
                            : 'getGames6',
                    partner_id: this.appComponent.partnerG, // Set partner ID
                    typelobby: this.typelobby, // Set lobby type
                    offset: 0, // Set offset
                    limit: this.limit, // Set limit
                    country: this.appComponent.country, // Set country
                };
                if (this.appComponent.session.logueado) {
                    this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
                }
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true; // Set mobile flag
                } else {
                    this.optionsGames.isMobile = false; // Set mobile flag
                }
                if (this.config.urlVirtualplayML != undefined && this.appComponent.user_id != '') {
                    this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL for logged in users
                    this.optionsGames.userId = this.appComponent.user_id; // Set user ID
                }
                this.appComponent.loadingGames = false; // Reset loading state
                if (this.storeCasinoLobby.provider != 'all') {
                    this.optionsGames.provider = this.storeCasinoLobby.provider; // Set provider if not 'all'
                }
                await Promise.race([
                    apiService.requestGet(
                        this.urlVirtualplay +
                            (this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                                ? '/cms/products/games/'
                                : ''),
                        this.optionsGames,
                    ),
                    new Promise((resolve, reject) => {
                        setTimeout(resolve, 60000, 'timeout'); // Set timeout for request
                    }),
                ])
                    .then((response: any) => {
                        if (response == 'timeout') {
                            vthis.appComponent.gamesList = []; // Reset games list on timeout
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
                        } else {
                            var json = response.data; // Get response data
                            vthis.appComponent.gamesList = json.games; // Set games list
                            vthis.appComponent.total_count = json.total_count; // Set total count
                            vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                            vthis.appComponent.limitLocal = vthis.appComponent.gamesList.length + this.limit; // Update local limit
                            vthis.preloaderShow = false; // Hide preloader
                            if (
                                this.appComponent.session.logueado &&
                                this.appComponent.config.activeFavoritesWithBackend != undefined &&
                                this.appComponent.config.activeFavoritesWithBackend == true
                            ) {
                                this.getFavoriteGames(); // Fetch favorite games if logged in
                            }
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
                                if (
                                    vthis.config.casino !== undefined &&
                                    vthis.config.casino.playtechJackpot !== undefined &&
                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country] !== undefined
                                ) {
                                    var existingScript = document.querySelector(
                                        'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Check for existing jackpot script
                                    );
                                    if (existingScript) {
                                        existingScript.remove(); // Remove existing script
                                    }
                                    var script = document.createElement('script'); // Create new script element
                                    script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                    const vthis = this; // Preserve context
                                    script.onload = function () {
                                        vthis.appComponent.gamesList.forEach((game) => {
                                            if (
                                                game.provider == 'PLAYTECH' &&
                                                game.jackpot != undefined &&
                                                game.jackpot == 1
                                            ) {
                                                var objParams =
                                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                                objParams.game = game.front_game_id; // Set game ID for jackpot
                                                var ticker = new Ticker(objParams); // Create new Ticker instance
                                                ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
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
                        vthis.appComponent.gamesList = []; // Reset games list on error
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limitLocal = this.limit; // Reset local limit
                        vthis.preloaderShow = false; // Hide preloader
                    });
            } else {
                if (this.categoryId != undefined && this.categoryId != 'todos-all' && this.gameId == undefined) {
                    this.appComponent.showLoadMoreButton = false;
                    let onCategory = vthis.categoryId.split('-'); // Split category ID
                    if (onCategory.length === 3) {
                        onCategory = vthis.categoryId.split('-')[2]; // Get specific category part
                    } else if (onCategory.length === 2) {
                        onCategory = vthis.categoryId.split('-')[1]; // Get specific category part
                    }
                    this.storeCasinoLobby.category = onCategory; // Set category in store
                    this.storeCasinoLobby.provider = 'all'; // Reset provider in store
                    this.appComponent.selections.category.id = onCategory; // Set selected category
                    this.appComponent.loadingGames = false; // Reset loading state
                    this.optionsGames = {
                        action:
                            this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                                ? 'getGames2'
                                : 'getGames6',
                        partner_id: this.appComponent.partnerG, // Set partner ID
                        category: onCategory, // Set category
                        offset: 0, // Set offset
                        limit: this.limit, // Set limit
                        country: this.appComponent.country, // Set country
                        typelobby: this.typelobby, // Set lobby type
                    };
                    if (this.appComponent.session.logueado) {
                        this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
                    }
                    if (this.appComponent.mobile == '1') {
                        this.optionsGames.isMobile = true; // Set mobile flag
                    } else {
                        this.optionsGames.isMobile = false; // Set mobile flag
                    }
                    if (this.config.urlVirtualplayML != undefined && this.appComponent.user_id != '') {
                        this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL for logged in users
                        this.optionsGames.userId = this.appComponent.user_id; // Set user ID
                    }
                    await Promise.race([
                        apiService.requestGet(
                            this.urlVirtualplay +
                                (this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                                    ? '/cms/products/games/'
                                    : ''),
                            this.optionsGames,
                        ),
                        new Promise((resolve, reject) => {
                            setTimeout(resolve, 60000, 'timeout'); // Set timeout for request
                        }),
                    ])
                        .then((response: any) => {
                            if (response == 'timeout') {
                                vthis.appComponent.gamesList = []; // Reset games list on timeout
                                vthis.appComponent.total_count = 0; // Reset total count
                                vthis.appComponent.offset = 0; // Reset offset
                                vthis.appComponent.limitLocal = this.limit; // Reset local limit
                                vthis.preloaderShow = false; // Hide preloader
                            } else {
                                var json = response.data; // Get response data
                                vthis.appComponent.gamesList = json.games; // Set games list
                                vthis.appComponent.total_count = json.total_count; // Set total count
                                vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                                vthis.appComponent.limitLocal = vthis.appComponent.gamesList.length + this.limit; // Update local limit
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
                                    if (
                                        vthis.config.casino !== undefined &&
                                        vthis.config.casino.playtechJackpot !== undefined &&
                                        vthis.config.casino.playtechJackpot[vthis.appComponent.country] !== undefined
                                    ) {
                                        var existingScript = document.querySelector(
                                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Check for existing jackpot script
                                        );
                                        if (existingScript) {
                                            existingScript.remove(); // Remove existing script
                                        }
                                        var script = document.createElement('script'); // Create new script element
                                        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                        const vthis = this; // Preserve context
                                        script.onload = function () {
                                            vthis.appComponent.gamesList.forEach((game) => {
                                                if (
                                                    game.provider == 'PLAYTECH' &&
                                                    game.jackpot != undefined &&
                                                    game.jackpot == 1
                                                ) {
                                                    var objParams =
                                                        vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                                    objParams.game = game.front_game_id; // Set game ID for jackpot
                                                    var ticker = new Ticker(objParams); // Create new Ticker instance
                                                    ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
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
                            vthis.appComponent.gamesList = []; // Reset games list on error
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
                        });
                }
                if (this.providerId != undefined && this.gameId == undefined && this.categoryId == undefined) {
                    vthis.appComponent.selections.provider =
                        vthis.providerId.charAt(0).toUpperCase() + vthis.providerId.slice(1).toLocaleLowerCase(); // Set provider selection
                    this.storeCasinoLobby.provider = vthis.providerId; // Set provider in store
                    this.storeCasinoLobby.category = 'all'; // Reset category in store
                    this.appComponent.loadingGames = false; // Reset loading state
                    this.optionsGames = {
                        action: 'getGames2', // Set action for games retrieval
                        partner_id: this.appComponent.partnerG, // Set partner ID
                        offset: 0, // Set offset
                        limit: this.appComponent.limitLocal, // Set limit
                        country: this.appComponent.country, // Set country
                        typelobby: this.typelobby, // Set lobby type
                    };
                    if (this.appComponent.session.logueado) {
                        this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
                    }
                    this.optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag
                    if (this.providerId != '') {
                        this.optionsGames.provider = this.providerId; // Set provider if specified
                    }
                    if (this.config.urlVirtualplayML != undefined && this.appComponent.user_id != '') {
                        this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL for logged in users
                        this.optionsGames.userId = this.appComponent.user_id; // Set user ID
                    }
                    await Promise.race([
                        apiService.requestGet(
                            this.urlVirtualplay +
                                (this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                                    ? '/cms/products/games/'
                                    : ''),
                            this.optionsGames,
                        ),
                        new Promise((resolve, reject) => {
                            setTimeout(resolve, 60000, 'timeout'); // Set timeout for request
                        }),
                    ])
                        .then((response: any) => {
                            if (response == 'timeout') {
                                vthis.appComponent.gamesList = []; // Reset games list on timeout
                                vthis.appComponent.total_count = 0; // Reset total count
                                vthis.appComponent.offset = 0; // Reset offset
                                vthis.appComponent.limitLocal = this.limit; // Reset local limit
                                vthis.preloaderShow = false; // Hide preloader
                            } else {
                                var json = response.data; // Get response data
                                vthis.appComponent.gamesList = json.games; // Set games list
                                vthis.appComponent.total_count = json.total_count; // Set total count
                                vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                                vthis.appComponent.limitLocal = vthis.appComponent.gamesList.length + this.limit; // Update local limit

                                if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                                    console.log('No muestra Boton en proveedores', this.appComponent.showLoadMoreButton)
                                    vthis.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                                } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                                    console.log('Si muestra Boton en proveedores', this.appComponent.showLoadMoreButton)
                                    vthis.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                                }
                                if (
                                    vthis.config.casino != undefined &&
                                    vthis.config.casino.playtechJackpot != undefined &&
                                    vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                                ) {
                                    if (
                                        vthis.config.casino !== undefined &&
                                        vthis.config.casino.playtechJackpot !== undefined &&
                                        vthis.config.casino.playtechJackpot[vthis.appComponent.country] !== undefined
                                    ) {
                                        var existingScript = document.querySelector(
                                            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Check for existing jackpot script
                                        );
                                        if (existingScript) {
                                            existingScript.remove(); // Remove existing script
                                        }
                                        var script = document.createElement('script'); // Create new script element
                                        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                        const vthis = this; // Preserve context
                                        script.onload = function () {
                                            vthis.appComponent.gamesList.forEach((game) => {
                                                if (
                                                    game.provider == 'PLAYTECH' &&
                                                    game.jackpot != undefined &&
                                                    game.jackpot == 1
                                                ) {
                                                    var objParams =
                                                        vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                                    objParams.game = game.front_game_id; // Set game ID for jackpot
                                                    var ticker = new Ticker(objParams); // Create new Ticker instance
                                                    ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
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
                            vthis.appComponent.gamesList = []; // Reset games list on error
                            vthis.appComponent.total_count = 0; // Reset total count
                            vthis.appComponent.offset = 0; // Reset offset
                            vthis.appComponent.limitLocal = this.limit; // Reset local limit
                            vthis.preloaderShow = false; // Hide preloader
                        });
                }
                if (this.gameId != undefined && this.categoryId == undefined) {
                    if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                        this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                    } else if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                        this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                    }
                    }
            }
        },
        closeGame() {
            this.showGame = false; // Close game view
        },
        moveLeft() {
            const casinoSlide = (
                document.getElementsByClassName('slider-casino-' + this.typelobby) as HTMLCollectionOf<HTMLElement>
            )[0]; // Get casino slide element
            let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
            (
                document.getElementsByClassName('slider-casino-' + this.typelobby) as HTMLCollectionOf<HTMLElement>
            )[0].scrollTo(scrollNumber - 150, 0); // Scroll left
        },
        getFavoriteGames() {
            let params = {
                user_id: this.appComponent.session.usuario, // Set user ID for fetching favorites
            };
            apiService.request('get_casino_favorite_ids', params).then((response) => {
                if (response.code == 0) {
                    this.favorites = response.data.favorites; // Set favorites from response
                    this.favorites.forEach((id) => {
                        if (id != undefined) {
                            if (!this.appComponent.myListFavoriteGame.includes(parseInt(id))) {
                                this.appComponent.myListFavoriteGame.push(parseInt(id)); // Add to favorite list if not already present
                            }
                        }
                    });
                    this.appComponent.gamesList.forEach((game) => {
                        game.fav = false; // Reset favorite flag for each game
                        this.favorites.forEach((id) => {
                            if (game.id == id) {
                                game.fav = true; // Set favorite flag if game is in favorites
                            }
                        });
                    });
                    if (this.favorites.length == 1) {
                        this.emitter.emit('activeFav'); // Emit event if one favorite exists
                    } else if (this.favorites.length == 0) {
                        this.emitter.emit('deleteFav'); // Emit event if no favorites exist
                    }
                } else {
                    var error_mensaje = ''; // Initialize error message
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message from response
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Show notification modal
                        titleModal: this.$t('Error!'), // Set modal title
                        messageModal: error_mensaje, // Set modal message
                        buttonModal: this.$t('Aceptar'), // Set modal button text
                        orderModal: 'closeModal', // Set modal order
                    };
                }
            });
        },
        toggleSaveToMyCasinoGames(game) {
            if (
                this.appComponent.config.activeFavoritesWithBackend != undefined &&
                this.appComponent.config.activeFavoritesWithBackend == true
            ) {
                if (this.appComponent.session.logueado) {
                    let params = {
                        user: this.appComponent.session.usuario, // Set user ID
                        game_id: game.id, // Set game ID
                        status: game.fav != undefined && game.fav == true ? 'I' : 'A', // Set favorite status
                    };
                    apiService.request('manage_favorite_games', params).then((response) => {
                        if (response.code == 0) {
                            if (params.status === 'A') {
                                if (!this.appComponent.myListFavoriteGame.includes(game.id)) {
                                    this.appComponent.myListFavoriteGame.push(game.id);
                                }
                                game.fav = true;
                            } else {
                                this.appComponent.myListFavoriteGame = this.appComponent.myListFavoriteGame.filter(
                                  (id) => id !== game.id
                                );
                                game.fav = false;
                            }
                            // this.getFavoriteGames();
                            } else {
                            var error_mensaje = ''; // Initialize error message
                            if (response.error_code != undefined) {
                                error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message from response
                            }
                            if (error_mensaje == '') {
                                error_mensaje = this.$t(
                                    'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                                );
                            }
                            this.appComponent.modal = {
                                showModal: 'notification', // Show notification modal
                                titleModal: this.$t('Error!'), // Set modal title
                                messageModal: error_mensaje, // Set modal message
                                buttonModal: this.$t('Aceptar'), // Set modal button text
                                orderModal: 'closeModal', // Set modal order
                            };
                        }
                    });
                } else {
                    this.appComponent.showModalLogin = true; // Show login modal if not logged in
                }
            } else {
                this.appComponent.favCasino = true; // Set favorite casino flag
            }
            if (
                (this.appComponent.myCasinoGames.length > 0 &&
                    this.appComponent.config.activeFavoritesWithBackend == undefined) ||
                (this.appComponent.myCasinoGames.length > 0 &&
                    this.appComponent.config.activeFavoritesWithBackend == false)
            ) {
                var index = this.appComponent.myCasinoGames
                    .map((x) => {
                        return x.id; // Map to game IDs
                    })
                    .indexOf(game.id); // Find index of game ID
                if (index == -1) {
                    this.appComponent.myCasinoGames.push(game); // Add game to favorites if not present
                } else {
                    this.appComponent.myCasinoGames.splice(index, 1); // Remove game from favorites if present
                    if (this.appComponent.myCasinoGames.length == 0) {
                        this.getCasinoGames(); // Fetch casino games if no favorites left
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
                for (var i = 0; i < this.appComponent.myCasinoGames.length; i++) {
                    if (id == this.appComponent.myCasinoGames[i].id) {
                        return true; // Return true if game is in favorites
                    }
                }
            }
        },
        moveRight() {
            const casinoSlide = (
                document.getElementsByClassName('slider-casino-' + this.typelobby) as HTMLCollectionOf<HTMLElement>
            )[0]; // Get casino slide element
            let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
            (
                document.getElementsByClassName('slider-casino-' + this.typelobby) as HTMLCollectionOf<HTMLElement>
            )[0].scrollTo(scrollNumber + 150, 0); // Scroll right
        },
        loadMoreGames() {
            let vthis = this; // Preserve context
            this.preloaderShow = true; // Show preloader
            var limit = 0; // Initialize limit
            if (this.appComponent.limitLocal < this.appComponent.total_count) {
                limit = this.appComponent.limitLocal; // Set limit to local limit if less than total count
            } else {
                limit = this.appComponent.total_count - this.appComponent.limitLocal; // Calculate remaining limit
                this.appComponent.showMore = false; // Hide show more button if no more games
            }
            this.optionsGames = {
                action:
                    this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                        ? 'getGames2'
                        : 'getGames6', // Set action for games retrieval
                partner_id: this.partnerG, // Set partner ID
                offset: this.appComponent.offset, // Set offset
                limit: this.appComponent.limitLocal, // Set limit
                country: this.appComponent.country, // Set country
                typelobby: this.typelobby, // Set lobby type
            };
            if (this.appComponent.session.logueado) {
                this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
            }
            this.optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag
            if (this.config.urlVirtualplayML != undefined && this.appComponent.user_id != '') {
                this.urlVirtualplay = this.config.urlVirtualplayML; // Set virtual play URL for logged in users
                this.optionsGames.userId = this.appComponent.user_id; // Set user ID
            }
            if (this.appComponent.selections.category != undefined && this.appComponent.selections.category != '') {
                this.optionsGames.category = this.appComponent.selections.category.id; // Set category if specified
            } else if (
                this.appComponent.selections.provider != undefined &&
                this.appComponent.selections.provider != ''
            ) {
                this.optionsGames.provider = this.route.params.ProviderId; // Set provider if specified
            }
            vthis.limitBefore = limit - this.limit; // Calculate limit before
            if (vthis.limitBefore <= 0) {
                vthis.limitBefore = this.limit; // Reset limit before if negative
            }
            if (vthis.appComponent.offset < vthis.appComponent.total_count) {
                apiService
                    .requestGet(
                        this.urlVirtualplay +
                            (this.config.urlVirtualplayML == undefined || this.appComponent.user_id == ''
                                ? '/cms/products/games/'
                                : ''),
                        this.optionsGames,
                    )
                    .then((response: any) => {
                        var json = response.data; // Get response data
                        var games = json.games; // Get games from response
                        games.forEach(function (value, key) {
                            vthis.appComponent.gamesList.push(value); // Add each game to games list
                        });
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.appComponent.limitLocal = limit + this.limit; // Update local limit
                        if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                        }
                        if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                        }
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            let existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Check for existing jackpot script
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing script
                            }
                            var script = document.createElement('script'); // Create new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Preserve context
                            script.onload = function () {
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                        objParams.game = game.front_game_id; // Set game ID for jackpot
                                        var ticker = new Ticker(objParams); // Create new Ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Append script to document head
                        }
                    });
            } else {
                vthis.appComponent.showMore = false; // Hide show more button if no more games
                if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                    this.appComponent.showLoadMoreButton = false; // Hide load more button if all games loaded
                }
                if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                    this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                }
            }
        }
    },
});
</script>
<template>
    <section
        v-if="appComponent.contingencyCasino"
        class="flex justify-center items-center py-2"
        :class="
            appComponent.config != undefined &&
            appComponent.config.backgroundColorSportBook != undefined &&
            appComponent.config.backgroundColorSportBook
                ? 'bg-sportbook-color'
                : ''
        "
    >
        <div class="h-full w-full">
            <section class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center">
                <div
                    class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"
                ></div>
                <div class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center">
                    <div class="flex flex-col gap-8 justify-center items-center mt-10 xl:mt-0">
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
                        v-if="config.contingencyCasino !== undefined && config.contingencyCasino.img !== undefined"
                        :src="config.contingencyCasino.img"
                        alt=""
                        class="object-contain w-[400px] xl:w-[600px]"
                    />
                </div>
                <img
                    v-if="
                        config.contingencyCasino !== undefined && config.contingencyCasino.imgBackground !== undefined
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
    <section
        v-if="!appComponent.contingencyCasino && appComponent.gamesList.length > 0"
        class="flex justify-center items-center py-2"
        :class="
            appComponent.config != undefined &&
            appComponent.config.backgroundColorSportBook != undefined &&
            appComponent.config.backgroundColorSportBook
                ? 'bg-sportbook-color'
                : ''
        "
    >
        <div class="max-w-[1300px] w-11/12">
            <div class="in relative flex justify-between items-center">
                <div class="w-auto h-auto flex flex-col mb-4">
                    <div class="w-auto h-auto py-1 flex gap-3">
                        <img
                            v-if="icon != undefined && icon != ''"
                            :src="icon"
                            alt="Casino icon"
                            class="w-8 h-8 object-contain"
                        />
                        <RouterLink
                            :class="[
							lowerCaseText
								? 'capitalize font-light'
								: 'uppercase font-bold',
							{
								'flex flex-row justify-center items-center gap-x-2':
									config.layout != undefined &&
									config.layout == 4,
								'flex flex-row gap-10': config.layout == 5,
							},
						]"
                            class="text-xl mt-1 text-info-text"
                            aria-label="Casino bets"
                            :to="url"
                        >
                            {{ $t(title) }}
                        </RouterLink>
                    </div>
                    <!-- Underline for the title -->
                    <div
                        v-if="config.layout != 4"
                        class="h-1 w-full rounded-full"
                        :class="styleVersion == 1 ? 'bg-accent-content' : 'bg-accent'"
                    ></div>
                </div>
            </div>

            <div class="h-full w-full">
                <div
                    v-if="appComponent.loadingGames"
                    class="w-full h-full flex justify-center items-center py-2"
                >
                    <ul
                        class="gridList2 w-full h-full"
                        :class="'slider-casino-' + typelobby"
                    >
                        <AnimatedPlaceholder
                            v-for="n in limit ?? 12"
                            :key="n"
                            class="in relative w-full h-full rounded-xl shadow-inner shadow-neutral-content cursor-pointer overflow-hidden m-auto"
                            :class="'col-span-1 row-span-2'"
                        />
                    </ul>
                </div>
                <div
                    v-else
                    class="w-full h-full flex justify-center items-center py-2"
                >
                    <ul
                        v-if="appComponent.gamesList.length > 0"
                        class="gridList2 w-full h-full"
                        :class="'slider-casino-' + typelobby"
                    >
                        <li
                            v-for="game in appComponent.gamesList"
                            class="in relative w-full h-full rounded-xl shadow-inner shadow-neutral-content cursor-pointer overflow-hidden m-auto"
                            :class="[
                                ' col-span-' + game.grid_column + ' row-span-' + game.grid_row,
                                { 'hover:bg-base-content/70 hover:border-3 hover:border-accent hover:rounded-xl hover:backdrop-blur-sm': styleVersion == 2,
                                    '': styleVersion != 2
                                 }
                            ]"
                        >
                            <div class="relative w-full h-full">
                                <div
                                    v-if="
                                        appComponent.config != undefined &&
                                        appComponent.config.wsGeneral != undefined &&
                                        appComponent.config.wsGeneral.tableIds != undefined &&
                                        appComponent.config.wsGeneral.tableIds.includes(game.front_game_id)
                                    "
                                    v-for="pg in appComponent.peopleInGames"
                                    class="absolute left-0 top-2 w-20 h-6 bg-neutral-content/20 rounded-r-full shadow-[0px_3px_5px_0px_#030303ad] z-[9999999] flex justify-center items-center"
                                >
                                    <div
                                        v-if="pg.tableId == game.front_game_id"
                                        class="flex justify-center items-center gap-4"
                                    >
                                        <p class="text-neutral">
                                            {{ pg.totalSeatedPlayers }}
                                        </p>
                                        <IconUser
                                            width="20px"
                                            height="20px"
                                        />
                                    </div>
                                </div>
                                <div class="z-[99] absolute w-10 h-10 top-0 right-0">
                                    <button
                                        class="absolute w-10 h-10 top-0 right-0"
                                        @click.stop=";
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
                                <span
                                    class="playtech-jackpot absolute bg-primary/80 saturate-150 text-neutral-content z-40 text-center text-sm md:text-[12px] bottom-0 font-bold"
                                    v-if="game.provider == 'PLAYTECH'"
                                    :id="'playtech-' + game.id"
                                ></span>
                                <button
                                    @click="
                                        appComponent.gamesList.idSelect = game.id;
                                        appComponent.openLink = true;
                                        appComponent.openGame(game);
                                        appComponent.gAnalytics(
                                            route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino',
                                            {
                                                ...game,
                                                action:
                                                    config.urlVirtualplayML == undefined || appComponent.user_id == ''
                                                        ? 'getGames2'
                                                        : 'getGames6',
                                            },
                                        );
                                        $event.stopPropagation();
                                    "
                                    :aria-label="game.name"
                                    class="flex justify-start items-start"
                                    v-bind="analyticsAttrs.game(game)"
                                >
                                    <img
                                        v-show="game.icon_3 != undefined && game.icon_3 != null && game.icon_3 != ''"
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
                                            class="w-[90%] text-neutral font-bold hidden sm:flex justify-center items-center break-words text-base capitalize whitespace-pre-wrap"
                                        >
                                            {{ game.name.toLowerCase() }}
                                        </h3>
                                        <div class="relative w-30 md:w-32 h-8">
										  <!-- Borde degradado desplazado -->
										  <div
										    class="absolute inset-0 translate-x-1 translate-y-1 bg-gradient-to-r from-primary to-primary-content rounded-lg"
										  ></div>

										  <!-- Botón principal -->
										  <button
										    class="relative w-full h-full bg-primary text-neutral text-xs lg:text-md rounded-lg font-bold uppercase flex justify-center items-center gap-1 md:gap-2 shadow-sm transition-transform"
										    aria-label="Jugar ahora"
                                            v-bind="analyticsAttrs.game(game)"
										  >
										    {{ $t('Jugar ahora') }}
										    <svg
                                            class="w-3.5 h-3.5"
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
                                    <img
                                        v-if="
                                            game.TagImage != undefined && game.TagImage != null && game.TagImage != ''
                                        "
                                        :src="game.TagImage"
                                        width="60"
                                        height="60"
                                        :class="[
                                            'absolute left-0 top-0',
                                            'text-neutral-content text-sm font-bold',
                                            'pb-[1px] z-30  w-[60px] h-[60px]',
                                            'object-contain flex justify-center',
                                            'items-center',
                                        ]"
                                        alt="Etiqueta"
                                    />
                                    <span
                                        v-else-if="
                                            game.TagText != undefined && game.TagText != null && game.TagText != ''
                                        "
                                        :class="[
                                            'absolute left-0 top-0 m-1 text-neutral-content',
                                            'text-sm font-bold pb-[1px] z-30',
                                            'w-auto h-auto flex justify-center items-center',
                                            'max-w-2xl overflow-hidden',
                                        ]"
                                        v-html="game.TagText"
                                    ></span>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div v-if="appComponent.gamesList.length === 0">
                        <div class="w-full h-52 flex justify-center items-center">
                            <p class="text-neutral text-xl">
                                {{ $t('No hay juegos disponibles') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center items-center pt-8 pb-2">
                <button
                    v-if="
                        appComponent.showLoadMoreButton &&
                        config.layout != 4 &&
                        config.layout != 5 &&
                        config.layout != 7
                    "
                    class="btn-load-more in rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[20px] rounded-br-[20px] bg-primary hover:bg-primary-content w-60 h-14 text-neutral hover:text-neutral-content font-semibold text-xl hover:scale-105 shadow-inner shadow-base-300"
                    @click="loadMoreGames()"
                    v-bind="analyticsAttrs.viewAll"
                >
                    {{ $t('CARGAR MAS') }}
                </button>
                <button
                    v-if="appComponent.showLoadMoreButton && config.layout != undefined && config.layout == 7"
                    class="in rounded-full px-6 py-1 text-primary font-semibold text-xl hover:scale-105 shadow-inner shadow-base-300 border-solid border-1 border-primary-content"
                    @click="loadMoreGames()"
                    v-bind="analyticsAttrs.viewAll"
                >
                    {{ $t('CARGAR MAS') }}
                </button>
                <div
                    v-else-if="appComponent.showLoadMoreButton && config.layout == 4"
                    class="flex justify-center my-7"
                >
                    <button
                        @click="loadMoreGames()"
                        class="relative group hover:brightness-90 bg-primary text-neutral uppercase font-poppinssl pl-5 flex flex-row justify-center items-center gap-x-2 h-[30px] box-content rounded-full border-solid border-2 border-primary text-sm md:text-base"
                        v-bind="analyticsAttrs.viewAll"
                    >
                        {{ $t('Más juegos') }}
                        <span
                            class="fill-neutral bg-primary rounded-full h-full w-[30px] flex justify-center items-center"
                        >
                            <IconChevrondown
                                width="15"
                                height="15"
                                class="fill-neutral group-hover:translate-y-1 transition-all ease-in-out"
                            />
                        </span>
                    </button>
                </div>
                <div
                    v-else-if="appComponent.showLoadMoreButton && config.layout == 5"
                    class="flex justify-center my-7"
                    v-bind="analyticsAttrs.viewAll"
                >
                    <button
                        class="btn-load-more in rounded-lg bg-success hover:bg-accent-content/80 w-60 h-14 text-base-300 hover:text-success font-semibold text-xl hover:scale-105"
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
.playtech-jackpot {
    width: 100%; /* Set width for jackpot display */
    color: white; /* Set text color for jackpot display */
    display: block; /* Display as block element */
}
.gridList2 {
    display: grid; /* Use grid layout for game list */
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); /* Define responsive columns */
    grid-auto-rows: minmax(75px, 1fr); /* Define responsive rows */
    gap: 15px; /* Set gap between grid items */
}
.gridList2 > li {
    aspect-ratio: 1 / 1 !important; /* Maintain aspect ratio for grid items */
}
@media (min-width: 744px) {
    .gridList2 {
        grid-template-columns: repeat(5, minmax(75px, 220px)); /* Define columns for larger screens */
        gap: 20px; /* Set gap for larger screens */
    }
}
@media (min-width: 1024px) {
    .gridList2 {
        grid-template-columns: repeat(7, minmax(75px, 220px)); /* Define columns for even larger screens */
    }
}
</style>

<!-- FILE DOCUMENTED -->

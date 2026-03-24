<script lang="ts">
import { defineComponent, watch } from 'vue'; // Import necessary Vue functions
import apiService from '@/services/ApiService'; // Import API service for data fetching
import MoreProviders from '@/components/icons/MoreProviders.vue'; // Import MoreProviders icon component
import ExitIcon from '../icons/ExitIcon.vue'; // Import ExitIcon component
import { useGlobalStore } from '@/stores/global'; // Import global store for state management
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils'; // Import Vue Router for route management
declare var Ticker: any; // Declare Ticker variable for external library usage

export default defineComponent({
    props: {
        typelobby: String, // Define prop for lobby type
        styleVersion: {
            type: Number,
            default: 1, // Default style version
        },
    },
    components: { ExitIcon, MoreProviders }, // Register local components
    data: function () {
        let appComponent: any = this.$appComponent; // Reference to app component
        let config = this.$config(); // Configuration object
        let emitter: any = this.$emitter(); // Event emitter
        const route = useRoute(); // Get current route
        let openSearchv3: boolean = false; // State for search visibility
        let hideInputSearch: any = ''; // State for hiding search input
        let searchCommand = { input: '' }; // Object to hold search command input
        let showSearchCommandResults: any = ''; // State for showing search results
        let providersLength: any = ''; // Length of providers array
        let providers: any = ''; // Array of providers
        let optionsGames: any = ''; // Options for games fetching
        let partnerG: any = ''; // Partner identifier
        let urlVirtualplay: any = ''; // URL for virtual play API
        let limit: any = ''; // Limit for games fetching
        let flag: boolean = true; // Flag for state management
        let limitConfig: any = ''; // Configuration for limits
        let providerId = ''; // Selected provider ID
        let limitBefore: any = ''; // Previous limit value
        let preloaderShow: boolean = false; // State for preloader visibility
        let openLink: boolean = true; // State for link opening
        let onOthers: boolean = false; // State for showing other providers
        let providerSelected: string = ''; // Currently selected provider
        let isProviderSelect = false; // State for provider selection
        let storeCasinoLobby = useGlobalStore(); // Access global store

        const analyticsAttrs = {}

        return {
            appComponent,
            config,
            route,
            openSearchv3,
            hideInputSearch,
            searchCommand,
            showSearchCommandResults,
            providersLength,
            providers,
            optionsGames,
            partnerG,
            urlVirtualplay,
            limit,
            limitConfig,
            flag,
            providerId,
            limitBefore,
            preloaderShow,
            openLink,
            onOthers,
            providerSelected,
            emitter,
            isProviderSelect,
            storeCasinoLobby,
            analyticsAttrs
        };
    },
    mounted() {
        watch(
            () => this.route.params.ProviderId, // Watch for changes in ProviderId route parameter
            (newProviderId) => {
                this.isProviderSelect = !!this.providers
                    .slice(this.appComponent.mobile ? 3 : 8) // Check if the selected provider exists
                    .some(
                        (provider) =>
                            provider.name.toLocaleLowerCase() ==
                            this.appComponent.selections.provider.toLocaleLowerCase(),
                    );
            },
        );
        this.limitConfig = this.config.casino.limit; // Set limit configuration
        this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
        this.partnerG = this.appComponent.partnerG; // Set partner identifier
        this.appComponent.selections.provider = ''; // Reset selected provider
        this.$nextTick(() => {
            if (this.config.layout != undefined && this.config.layout != 4 && this.config.layout != 5) {
                let isDown = false; // State for mouse down event
                let startX; // Starting X position for dragging
                let scrollLeft; // Initial scroll position
                const slider: any = document.querySelector('.slider-casino'); // Get slider element
                const end = () => {
                    isDown = false; // Reset mouse down state
                    slider.classList.remove('active'); // Remove active class
                };
                const start = (e) => {
                    isDown = true; // Set mouse down state
                    slider.classList.add('active'); // Add active class
                    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get starting X position
                    scrollLeft = slider.scrollLeft; // Store initial scroll position
                };
                const move = (e) => {
                    this.openLink = true; // Allow link opening
                    if (!isDown) return; // Exit if not dragging
                    this.openLink = false; // Prevent link opening while dragging
                    e.preventDefault(); // Prevent default behavior
                    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
                    const dist = x - startX; // Calculate distance moved
                    slider.scrollLeft = scrollLeft - dist; // Update scroll position
                };
                (() => {
                    slider.addEventListener('mousedown', start); // Add mouse down event listener
                    slider.addEventListener('touchstart', start, {
                        passive: true,
                    }); // Add touch start event listener
                    slider.addEventListener('mousemove', move); // Add mouse move event listener
                    slider.addEventListener('touchmove', move, {
                        passive: true,
                    }); // Add touch move event listener
                    slider.addEventListener('mouseleave', end); // Add mouse leave event listener
                    slider.addEventListener('mouseup', end); // Add mouse up event listener
                    slider.addEventListener('touchend', end); // Add touch end event listener
                })();
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
            }
        });
        this.getProviders(); // Fetch providers on mount
    },
    methods: {
        OpenSearchV3() {
            this.openSearchv3 = true; // Open search modal
        },
        CloseSearchV3() {
            this.openSearchv3 = false; // Close search modal
        },
        selectProvider(name: any, img: any, name2: any) {
            var vthis = this; // Reference to current context
            this.flag = true; // Set flag state
            this.appComponent.selections.category = undefined; // Reset category selection
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'block'; // Show preload game elements
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
            });
            this.appComponent.selections.provider = name; // Set selected provider
            this.storeCasinoLobby.provider = name; // Update global store with selected provider
            this.appComponent.selections.providerImage = img; // Set provider image
            this.storeCasinoLobby.category = 'all'; // Set category to all
            this.isProviderSelect = !!this.providers
                .slice(this.appComponent.mobile ? 3 : 8) // Check if the selected provider exists
                .some(
                    (provider) =>
                        provider.name.toLocaleLowerCase() == this.appComponent.selections.provider.toLocaleLowerCase(),
                );
            if (name2 != '') {
                this.appComponent.selections.provider = name2; // Update provider selection if name2 is provided
            }
            this.optionsGames = {
                action: 'getGames2', // Action for fetching games
                partner_id: this.appComponent.partnerG, // Partner ID
                provider: name, // Selected provider
                typelobby: this.typelobby, // Lobby type
                offset: 0, // Offset for pagination
                limit: vthis.limitConfig, // Limit for games fetching
                country: this.appComponent.country, // User's country
            };
            if (this.appComponent.session.logueado) {
                this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag if logged in
            }
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true; // Set mobile flag
            } else {
                this.optionsGames.isMobile = false; // Reset mobile flag
            }
            if (name != '') {
                this.optionsGames.provider = name; // Set provider in options
                this.providerId = name; // Update provider ID
            }
            if (this.$route.path.indexOf('new-casino') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/new-casino/proveedor/' + name); // Update URL for new casino
                } else {
                    window.history.pushState('', '', '/new-casino'); // Update URL for new casino without provider
                }
            } else if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/virtuales-lobby/proveedor/' + name); // Update URL for virtual lobby
                } else {
                    window.history.pushState('', '', '/virtuales-lobby'); // Update URL for virtual lobby without provider
                }
            } else if (this.$route.path.indexOf('bingos') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/bingos/proveedor/' + name); // Update URL for bingos
                } else {
                    window.history.pushState('', '', '/bingos'); // Update URL for bingos without provider
                }
            } else {
                window.history.pushState('', '', '/live-casino-vivo/proveedor/' + name); // Update URL for live casino
            }
            this.emitter.emit('get:gamesList'); // Emit event to fetch games list
            this.appComponent.loadingGames = true; // Set loading state for games
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames), // Fetch games from API
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        vthis.appComponent.gamesList = []; // Reset games list on timeout
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.limit = vthis.limitConfig; // Reset limit
                        this.appComponent.preloaderShow = false; // Hide preloader
                    } else {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesList = json.games; // Set games list
                        vthis.appComponent.total_count = json.total_count; // Set total count
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.limit = vthis.appComponent.gamesList.length + vthis.limitConfig; // Update limit
                        this.appComponent.loadingGames = false; // Hide loading state
                        if (
                            this.appComponent.session.logueado &&
                            this.appComponent.config.activeFavoritesWithBackend != undefined &&
                            this.appComponent.config.activeFavoritesWithBackend == true
                        ) {
                            this.emitter.emit('gamesFavorites'); // Emit event for favorites
                        }
                        vthis.noMoreGames(); // Check for no more games
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-top'),
                            function (el, i) {
                                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display =
                                    'none'; // Hide preload game elements
                            },
                        );
                        if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = false; // Hide load more button if no more games
                        }
                        if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = true; // Show load more button if more games available
                        }
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            if (vthis.config.casino.playtechJackpot[vthis.appComponent.country] !== undefined) {
                                var existingScript = document.querySelector(
                                    'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                                );
                                if (existingScript) {
                                    existingScript.remove(); // Remove existing jackpot script
                                }
                                var script = document.createElement('script'); // Create new script element
                                script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                                const vthis = this; // Reference to current context
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
                    vthis.appComponent.gamesList = []; // Reset games list on error
                    vthis.appComponent.total_count = 0; // Reset total count
                    vthis.appComponent.offset = 0; // Reset offset
                    vthis.limit = vthis.limitConfig; // Reset limit
                    this.appComponent.preloaderShow = false; // Hide preloader
                });
            vthis.appComponent.showMore = true; // Show more button
        },
        openProviders2() {
            const otherButton: any = document.querySelector('#menuProviders'); // Get providers menu button
            otherButton.classList.toggle('ver-drop'); // Toggle dropdown visibility
        },
        noMoreGames() {
            var vthis = this; // Reference to current context
            if (vthis.appComponent.gamesList.length <= 0) {
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function (el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'block'; // Show no games text
                    },
                );
            } else {
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function (el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'none'; // Hide no games text
                    },
                );
            }
        },
        getPreloaderLoadmore() {
        },
        getProviders() {
            var options = {
                action: 'getOptions', // Action for fetching providers
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // User's country
                typelobby: this.typelobby, // Lobby type
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag if logged in
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options), // Fetch providers from API
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout' || response.data.providers.length == 0) {
                        this.providers = []; // Reset providers on timeout or empty response
                        this.providersLength = 0; // Reset providers length
                    } else {
                        var json = response.data; // Parse response data
                        this.providers = json.providers; // Set providers array
                        this.providersLength = json.providers.length; // Set providers length
                        if (this.appComponent.offset >= this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = false; // Hide load more button if no more providers
                        }
                        if (this.appComponent.offset < this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = true; // Show load more button if more providers available
                        }
                    }
                })
                .catch((error) => {
                    this.providers = []; // Reset providers on error
                    this.providersLength = 0; // Reset providers length
                });

            this.analyticsAttrs = {
                filterAll: {
                    'data-analytics-label': `casino:provider-filter:all`,
                    'data-analytics-context': `component:MenuProviders3|layout:${this.appComponent.config.layout}`
                },
                viewAll: {
                    'data-analytics-label': `casino:provider-filter:more`,
                    'data-analytics-context': `component:MenuProviders3|layout:${this.appComponent.config.layout}`
                },
                arrowPrev: {
                    'data-analytics-label': `casino:carousel:providers:arrow-prev`,
                    'data-analytics-context': `component:MenuProviders3|layout:${this.appComponent.config.layout}`
                },
                arrowNext: {
                    'data-analytics-label': `casino:carousel:providers:arrow-next`,
                    'data-analytics-context': `component:MenuProviders3|layout:${this.appComponent.config.layout}`
                },
                provider: (provider) => ({
                    'data-analytics-label': `casino:provider-filter:${toKebabCase(provider.name)}`,
                    'data-analytics-position': `${this.providers.findIndex((g) => g.name === provider.name) + 1}`,
                    'data-analytics-context': `component:MenuProviders3|layout:${this.appComponent.config.layout}`
                })
            };
        },
    },
});
</script>
<template>
    <section
        v-if="config.layout != undefined && config.layout != 4 && config.layout != 5"
        class="w-full h-full flex justify-center items-center"
        :class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': ''"
    >
        <nav
            class="h-24 lg:h-28 w-11/12 flex justify-center items-center rounded-l-xl lg:rounded-xl max-w-[1300px] z-[51] my-2"
        >
            <div
                class="in slider-casino flex justify-center items-center w-full h-full overflow-x-auto overflow-y-hidden"
                :class="{
                    'gap-3 relative': styleVersion != 1,
                    '': styleVersion == 1,
                }"
            >
                <button
                    class="relative rounded-lg w-full text-neutral hover:blob hover:font-bold capitalize group"
                    :class="{
                        'h-[75px]': appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country],
                        'h-[60px]': appComponent.config.iconProviders == undefined ||
                                appComponent.config.iconProviders[appComponent.country] == undefined ||
                                !appComponent.config.iconProviders[appComponent.country],
                        'bg-secondary blob font-bold p-2' : appComponent.selections.provider == '' && styleVersion == 1,
                        'bg-base-100 items-center justify-center': styleVersion != undefined && styleVersion != 1
                    }"
                    v-if="providersLength > 0"
                    @click="
                        selectProvider('', '', '');
                        providerSelected = '';
                        appComponent.selections.provider = '';
                        appComponent.selections.providerImage = '';
                        appComponent.gAnalytics('game_type', 'Todos los proveedores');
                    "
                    v-bind="analyticsAttrs.filterAll"
                >
                    <a
                        class="rounded-lg text-neutral hover:blob font-bold capitalize flex justify-center items-center tablet:text-base flex-col gap-1 text-xs"
                        :class="{
                        'h-[65px]': appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country],
                        'h-[50px]': appComponent.config.iconProviders == undefined ||
                                appComponent.config.iconProviders[appComponent.country] == undefined ||
                                !appComponent.config.iconProviders[appComponent.country],
                            'bg-base-300 text-info-text blob w-full p-2': (appComponent.selections.provider == '' || appComponent.selections.provider.toLocaleLowerCase() == providerSelected.toLocaleLowerCase()) && (styleVersion == 1 || styleVersion == undefined),
                            'bg-base-300 text-info-text': (appComponent.selections.provider != '' && appComponent.selections.provider.toLocaleLowerCase() != providerSelected.toLocaleLowerCase()) && (styleVersion == 1 || styleVersion == undefined),
                            'bg-base-300 text-neutral': (appComponent.selections.provider == '' || appComponent.selections.provider.toLocaleLowerCase() == providerSelected.toLocaleLowerCase()) && styleVersion != 1,
                            'bg-base-100 text-neutral': (appComponent.selections.provider != '' && appComponent.selections.provider.toLocaleLowerCase() != providerSelected.toLocaleLowerCase()) && styleVersion != 1,
                            
                        }"
                    >
                        <div
                            v-if="
                                appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country]
                            "
                            class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
                        >
                            <img
                                :src="
                                    appComponent.selections.providerImage == ''
                                        ? appComponent.config.iconAllProviders !== undefined &&
                                          appComponent.config.iconAllProviders[appComponent.country] !== undefined &&
                                          appComponent.config.iconAllProviders[appComponent.country] !== ''
                                            ? appComponent.config.iconAllProviders[appComponent.country]
                                            : 'https://images.virtualsoft.tech/m/msj0212T1716844653.png'
                                        : appComponent.selections.providerImage
                                "
                                class="w-full h-full object-contain"
                                alt=""
                            />
                        </div>
                        {{ isProviderSelect ? $t(appComponent.selections.provider) : $t('Todos los proveedores') }}</a
                    >
                    
                </button>
                <button
                    v-for="provider in providers.slice(0, appComponent.mobile ? 3 : 8)"
                    class="rounded-lg w-full min-w-[90px] hover:blob hover:font-bold capitalize flex relative group"
                    :class="{
                        'h-[75px]': appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country],
                        'h-[60px]': appComponent.config.iconProviders == undefined ||
                                appComponent.config.iconProviders[appComponent.country] == undefined ||
                                !appComponent.config.iconProviders[appComponent.country],
                        'bg-secondary text-base-100 blob font-bold p-2 hover:bg-secondary': (appComponent.selections.provider.toLocaleLowerCase() == provider.title.toLocaleLowerCase()) && (styleVersion == 1 || styleVersion == undefined),
                        'text-neutral bg-transparent font-bold p-2 hover:bg-secondary': (appComponent.selections.provider.toLocaleLowerCase() != provider.title.toLocaleLowerCase()) && (styleVersion == 1 || styleVersion == undefined),
                        'bg-base-100 items-center justify-center hover:scale-110': styleVersion != undefined && styleVersion != 1
                    }"
                    @click="
                        selectProvider(provider.name, provider.image, provider.title);
                        appComponent.gAnalytics('supplier', provider.title);
                        onOthers = false;
                    "
                    v-show="
                        !appComponent.selections.provider.toLocaleLowerCase() === provider.title.toLocaleLowerCase()
                    "
                    v-bind="analyticsAttrs.provider(provider)"
                >
                    <a
                        class="rounded-lg hover:blob font-bold capitalize flex justify-center items-center tablet:text-base flex-col gap-1 text-xs"
                        :class="{
                        'h-[65px]': appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country],
                        'h-[50px]': appComponent.config.iconProviders == undefined ||
                                appComponent.config.iconProviders[appComponent.country] == undefined ||
                                !appComponent.config.iconProviders[appComponent.country],
                            'bg-base-300 text-info-text blob w-full p-2': (appComponent.selections.provider.toLocaleLowerCase() == provider.title.toLocaleLowerCase())  && (styleVersion == 1 || styleVersion == undefined),
                            'bg-base-300 text-info-text w-full p-2': (appComponent.selections.provider.toLocaleLowerCase() != provider.title.toLocaleLowerCase())  && (styleVersion == 1 || styleVersion == undefined),
                            'bg-base-300 text-neutral w-auto px-5': (appComponent.selections.provider.toLocaleLowerCase() == provider.title.toLocaleLowerCase())  && styleVersion != 1,
                            'bg-base-100 text-info-text tablet:h-[45px] p-4 w-auto': (appComponent.selections.provider.toLocaleLowerCase() != provider.title.toLocaleLowerCase())  && styleVersion != 1
                        }"
                    >
                        <div
                            v-if="
                                appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] &&
                                provider.image !== undefined &&
                                provider.image != ''
                            "
                            class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
                        >
                            <img
                                :src="provider.image"
                                class="w-full h-full object-contain"
                                alt=""
                            />
                        </div>
                        {{ $t(provider.title) }}
                    </a>
                </button>
            </div>
            <div
                v-if="providers.length > parseInt(appComponent.mobile ? '3' : '8')"
                class="w-20 tablet:w-[5.3rem] flex justify-center items-center"
                :class="{
                        'h-[75px]': appComponent.config.iconProviders !== undefined &&
                                appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                appComponent.config.iconProviders[appComponent.country],
                        'h-[65px]': appComponent.config.iconProviders == undefined ||
                                appComponent.config.iconProviders[appComponent.country] == undefined ||
                                !appComponent.config.iconProviders[appComponent.country],
                }"
            ></div>
            <div
                v-if="providers.length > parseInt(appComponent.mobile ? '3' : '8')"
                class="relative"
            >
                <div class="absolute -top-10 right-0 text-center rounded-2xl flex justify-around items-start z-50">
                    <div
                        v-if="onOthers"
                        class="slider-casino overflow-y-auto bg-base-100 shadow-2xl h-96 w-64 rounded-b-2xl rounded-tl-2xl text-neutral-content text-lg ml-1 border-4 border-solid border-base-100"
                    >
                        <ul class="p-1 grid gap-1">
                            <li
                                v-for="provider in providers.slice(appComponent.mobile ? 3 : 8)"
                                class="providerLi w-full h-10 cursor-pointer flex justify-start items-center gap-2 px-2 rounded"
                                :class="
                                    providerSelected.toLocaleLowerCase() == provider.title.toLocaleLowerCase()
                                        ? 'bg-base-300/25 rounded-full'
                                        : 'bg-base-300'
                                "
                                @click="
                                    selectProvider(provider.name, provider.image, provider.title);
                                    appComponent.gAnalytics('game_type', provider.title);
                                    providerSelected = provider.title;
                                    onOthers = false;
                                "
                                v-bind="analyticsAttrs.provider(provider)"
                            >
                                <div class="w-2 h-2 bg-primary rounded-full"></div>
                                <span
                                    tabindex="0"
                                    class="capitalize text-base font-bold"
                                    :class="
                                    providerSelected.toLocaleLowerCase() == provider.title.toLocaleLowerCase()
                                        ? 'text-neutral'
                                        : 'text-neutral'
                                "
                                    >{{ $t(provider.title) }}</span
                                >
                            </li>
                        </ul>
                    </div>
                    <div
                        class="bg-base-200 flex justify-center items-center"
                        :class="{
                                'h-[75px]': appComponent.config.iconProviders !== undefined &&
                                        appComponent.config.iconProviders[appComponent.country] !== undefined &&
                                        appComponent.config.iconProviders[appComponent.country],
                                'h-[65px]': appComponent.config.iconProviders == undefined ||
                                        appComponent.config.iconProviders[appComponent.country] == undefined ||
                                        !appComponent.config.iconProviders[appComponent.country],
                                'rounded-2xl': !onOthers,
                                'rounded-r-2xl': onOthers,

                        }"
                    >
                        <button
                            tabindex="0"
                            class="w-12 lg:w-14 bg-base-300 rounded-2xl p-2 m-2 hover:scale-105"
                            @click="onOthers = !onOthers"
                            v-bind="analyticsAttrs.viewAll"
                        >
                            <font-awesome-icon
                                v-if="!onOthers"
                                icon="fa-solid fa-plus"
                                size="2x"
                                class="text-info-text"
                            />
                            <font-awesome-icon
                                v-else
                                icon="fa-solid fa-xmark"
                                size="2x"
                                class="text-info-text"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </section>
    <section
        v-else-if="config.layout != undefined && config.layout == 4"
        class="w-full flex justify-around items-center gap-x-2 bg-transparent bg-gradient-to-r from-primary/30 via-primary/30 to-primary/30 my-5 relative z-10"
    >
        <button
            v-if="providersLength > 0"
            @click="
                selectProvider('', '', '');
                appComponent.gAnalytics('game_type', 'Todos los proveedores');
            "
            :class="
                appComponent.selections.provider == ''
                    ? ' bg-neutral-content bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 relative after:top-[-4px] after:shadow-[0px_0px_6px_0px] after:shadow-neutral after:left-0 after:w-full after:absolute after:h-[5px] after:bg-neutral after:rounded-[50%] before:bottom-[-4px] before:shadow-[0px_0px_6px_0px] before:shadow-neutral before:left-0 before:w-full before:absolute before:h-[5px] before:bg-neutral before:rounded-[50%]'
                    : ''
            "
            class="w-[100px] h-[65px] tablet:w-[110px] tablet:h-[73px] flex flex-col justify-center items-center gap-1 transition-all ease-in-out duration-500 text-neutral font-poppinssl capitalize text-sm md:text-lg block p-3 hover:brightness-90 overflow-hidden"
            v-bind="analyticsAttrs.filterAll"
        >
            <div
                v-if="appComponent.config.iconAllProviders !== undefined && appComponent.config.iconAllProviders != ''"
                class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
            >
                <img
                    :src="
                        appComponent.config.iconAllProviders
                            ? appComponent.config.iconAllProviders
                            : 'https://images.virtualsoft.tech/m/msj0212T1716844653.png'
                    "
                    class="w-full h-full object-contain"
                    alt=""
                />
            </div>
            {{ $t('Todos') }}
        </button>
        <button
            v-for="provider in providers.slice(0, appComponent.mobile ? 3 : 8)"
            @click="
                selectProvider(provider.name, provider.image, provider.title);
                appComponent.gAnalytics('supplier', provider.title);
                onOthers = false;
            "
            v-show="!appComponent.selections.provider === provider.title"
            :class="
                appComponent.selections.provider.toLowerCase() === provider.title.toLowerCase()
                    ? 'transition-all ease-in-out duration-500 bg-neutral-content bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 relative after:top-[-4px] after:shadow-[0px_0px_6px_0px] after:shadow-neutral after:left-0 after:w-full after:absolute after:h-[5px] after:bg-neutral after:rounded-[50%] before:bottom-[-4px] before:shadow-[0px_0px_6px_0px] before:shadow-neutral before:left-0 before:w-full before:absolute before:h-[5px] before:bg-neutral before:rounded-[50%]'
                    : ''
            "
            class="flex flex-col justify-center items-center gap-1 text-neutral font-poppinssl capitalize text-sm md:text-lg p-3 hover:brightness-90 overflow-hidden"
            v-bind="analyticsAttrs.provider(provider)"
        >
            <div
                v-if="
                    appComponent.config.iconAllProviders !== undefined &&
                    appComponent.config.iconAllProviders != '' &&
                    provider.image &&
                    provider.image != ''
                "
                class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
            >
                <img
                    :src="provider.image"
                    class="w-full h-full object-contain"
                    alt=""
                />
            </div>
            {{ $t(provider.title) }}
        </button>
        <button
            @click="onOthers = !onOthers"
            class="cursor-pointer group"
            v-bind="analyticsAttrs.viewAll"
        >
            <MoreProviders
                :width="30"
                :class="onOthers ? 'stroke-neutral' : 'stroke-primary'"
                class="transition-all ease-in-out duration-500 group-hover:stroke-primary/50"
            />
            <div
                v-if="providers.length > parseInt(appComponent.mobile ? '3' : '8')"
                class="relative z-[60]"
            >
                <div class="absolute top-0 right-2 text-center rounded-2xl flex justify-around items-start mt-3">
                    <div
                        v-if="onOthers"
                        class="slider-casino z-50 overflow-y-auto bg-base-200 shadow-2xl h-96 w-64 rounded-b-2xl rounded-tl-2xl text-neutral-content text-lg ml-1 border-4 border-solid border-base-200"
                    >
                        <ul class="p-1 grid gap-1">
                            <li
                                v-for="provider in providers.slice(appComponent.mobile ? 3 : 8)"
                                class="providerLi w-full h-10 cursor-pointer flex justify-start items-center gap-2 px-2 rounded"
                                :class="
                                    providerSelected == provider.name
                                        ? 'bg-primary-content rounded-full'
                                        : 'bg-neutral-content bg-gradient-to-b from-primary-content/40 to-primary-content/50'
                                "
                                @click="
                                    selectProvider(provider.name, provider.image, provider.title);
                                    appComponent.gAnalytics('game_type', provider.title);
                                    onOthers = false;
                                "
                                v-bind="analyticsAttrs.provider(provider)"
                            >
                                <div class="w-2 h-2 bg-base-100 rounded-full"></div>
                                <span
                                    tabindex="0"
                                    class="capitalize text-base text-neutral font-bold"
                                    >{{ $t(provider.title) }}</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </button>
    </section>
    <section
        v-else-if="config.layout != undefined && config.layout == 5"
        class="flex justify-center items-center w-full px-5 tablet:px-8 my-5 gap-x-2"
    >
        <div
            class="flex w-auto max-w-[1300px] justify-start items-center gap-x-3 lg:gap-x-5 overflow-x-auto overflow-y-hidden"
        >
            <button
                v-if="providersLength > 0"
                @click="
                    selectProvider('', '', '');
                    appComponent.gAnalytics('game_type', 'Todos los proveedores');
                    onOthers = false;
                "
                :class="
                    appComponent.selections.provider == '' && !onOthers
                        ? 'text-neutral bg-success bg-gradient-to-b from-neutral-content/25 to-neutral-content/25 border-transparent'
                        : 'bg-base-300 text-neutral border-primary'
                "
                class="w-[100px] h-[65px] tablet:w-[110px] tablet:h-[73px] flex flex-col justify-center items-center gap-1 transition-all ease-in-out duration-500 border-solid border-1 rounded-xl font-poppinssl capitalize text-base p-1 overflow-hidden shrink-0 hover:bg-success hover:bg-gradient-to-b hover:border-transparent hover:from-neutral-content/25 hover:to-neutral-content/25 hover:text-neutral"
                v-bind="analyticsAttrs.filterAll"
            >
                <div
                    v-if="
                        appComponent.config.iconAllProviders !== undefined &&
                        appComponent.config.iconAllProviders[appComponent.country] !== undefined &&
                        appComponent.config.iconAllProviders[appComponent.country] != ''
                    "
                    class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
                >
                    <img
                        :src="
                            appComponent.config.iconAllProviders
                                ? appComponent.config.iconAllProviders
                                : 'https://images.virtualsoft.tech/m/msj0212T1716844653.png'
                        "
                        class="w-full h-full object-contain"
                        alt=""
                    />
                </div>
                {{ $t('Todos') }}
            </button>
            <button
                v-for="provider in providers.slice(0, appComponent.mobile ? 2 : 8)"
                @click="
                    selectProvider(provider.name, provider.image, provider.title);
                    appComponent.gAnalytics('supplier', provider.title);
                    onOthers = false;
                "
                v-show="!appComponent.selections.provider === provider.title"
                :class="
                    appComponent.selections.provider.toLowerCase() === provider.title.toLowerCase() && !onOthers
                        ? 'text-neutral bg-success bg-gradient-to-b from-neutral-content/25 to-neutral-content/25 border-transparent'
                        : 'bg-base-300 text-neutral border-primary'
                "
                class="w-[100px] h-[65px] tablet:w-[110px] tablet:h-[73px] flex flex-col justify-center items-center gap-1 transition-all ease-in-out duration-500 border-solid border-1 rounded-xl font-poppinssl capitalize text-base p-1 overflow-hidden shrink-0 hover:bg-success hover:bg-gradient-to-b hover:border-transparent hover:from-neutral-content/25 hover:to-neutral-content/25 hover:text-neutral"
                v-bind="analyticsAttrs.provider(provider)"
            >
                <div
                    v-if="
                        appComponent.config.iconAllProviders !== undefined &&
                        appComponent.config.iconAllProviders != '' &&
                        provider.image &&
                        provider.image != ''
                    "
                    class="w-[65px] h-[28px] mx-auto tablet:w-[80px] tablet:h-[35px]"
                >
                    <img
                        :src="provider.image"
                        class="w-full h-full object-contain"
                        alt=""
                    />
                </div>
                {{ $t(provider.title) }}
            </button>
        </div>
        <button
            @click="onOthers = !onOthers"
            class="relative w-[100px] h-[65px] tablet:w-[110px] tablet:h-[73px] flex flex-col justify-center items-center gap-1 rounded-xl font-poppinssl border-solid border-1 capitalize text-base p-1 hover:bg-success hover:bg-gradient-to-b hover:border-transparent hover:from-neutral-content/25 hover:to-neutral-content/25 hover:text-neutral transition-all ease-in-out duration-500"
            :class="
                onOthers
                    ? 'border-neutral text-neutral bg-success bg-gradient-to-b border-transparent from-neutral-content/25 to-neutral-content/25 '
                    : 'bg-base-300 text-neutral border-primary'
            "
            v-bind="analyticsAttrs.viewAll"
        >
            {{ $t('Otros') }}
            <div
                v-if="providers.length > appComponent.mobile ? 3 : 8"
                class="absolute top-[55px] tablet:top-[63px] right-2 text-center rounded-2xl flex justify-around items-start mt-3"
            >
                <div
                    v-if="onOthers"
                    class="slider-casino z-50 overflow-y-auto bg-base-300 shadow-2xl h-96 w-64 rounded-b-2xl rounded-tl-2xl text-neutral-content text-lg ml-1 border-4 border-solid border-base-200"
                >
                    <ul class="p-1 grid gap-1">
                        <li
                            v-for="provider in providers.slice(appComponent.mobile ? 3 : 8)"
                            class="providerLi w-full h-10 cursor-pointer flex justify-start items-center gap-2 px-2 rounded-full"
                            :class="
                                providerSelected == provider.name ? 'bg-primary-content rounded-full' : 'bg-neutral '
                            "
                            @click="
                                selectProvider(provider.name, provider.image, provider.title);
                                appComponent.gAnalytics('game_type', provider.title);
                                onOthers = false;
                            "
                            v-bind="analyticsAttrs.provider(provider)"
                        >
                            <div class="w-2 h-2 bg-base-100 rounded-full"></div>
                            <span
                                tabindex="0"
                                class="capitalize text-base text-neutral-content font-bold"
                                >{{ $t(provider.title) }}</span
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </button>
    </section>
</template>
<style scoped>
.slider-casino::-webkit-scrollbar {
    display: none; /* Hide scrollbar for slider */
}
.providerLi:hover > div:nth-child(1) {
    width: 2rem !important; /* Expand indicator on hover */
    transition: 0.5s ease-in-out !important; /* Smooth transition for hover effect */
}
</style>

<!-- FILE DOCUMENTED -->

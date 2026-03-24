<template>
    <!-- Main section for displaying providers, shown only if there are providers available -->
    <section
        v-if="providers.length > 0"
        class="relative w-full px-4 tablet:px-0 max-w-[1156px]"
    >
        <!-- Navigation bar for provider selection -->
        <nav
            class="relative w-full flex justify-start items-center gap-3 desktop:gap-5"
            :style="{
                'overflow-x': isSearchActive ? 'auto' : 'hidden',
            }"
        >
            <!-- Search button and input field -->
            <div class="bg-base-200 rounded-full border border-accent-focus flex justify-center items-center">
                <button
                    @click="toggleSearch"
                    class="h-[40px] desktop:h-[60px] flex justify-start items-center p-1 pl-3 hover:scale-110"
                    :class="{
                        'desktop:w-[90px] w-[60px]': !isSearchActive,
                        'desktop:w-[60px] w-[40px]': isSearchActive,
                    }"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="29"
                        viewBox="0 0 26 27"
                        fill="none"
                        class="hidden md:block"
                    >
                        <circle
                            cx="12.0192"
                            cy="12.9592"
                            r="11.0192"
                            stroke="white"
                            stroke-width="2"
                        />
                        <path
                            d="M20.1924 21.1318L25.0001 25.9395"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M8.65332 8.12928C8.72803 8.11994 8.89934 8.02224 8.97794 7.98501C9.21985 7.87042 9.41549 7.82031 9.68489 7.7722C10.3656 7.65064 11.0632 7.66923 11.7553 7.67481C12.5994 7.68162 13.3905 7.68942 14.1791 7.97419C14.7767 8.19 15.4204 8.46661 15.9753 8.77492C16.1237 8.85737 16.3041 8.95283 16.3793 9.10315"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="23"
                        viewBox="0 0 26 27"
                        fill="none"
                        class="md:hidden"
                    >
                        <circle
                            cx="12.0192"
                            cy="12.9592"
                            r="11.0192"
                            stroke="white"
                            stroke-width="2"
                        />
                        <path
                            d="M20.1924 21.1318L25.0001 25.9395"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M8.65332 8.12928C8.72803 8.11994 8.89934 8.02224 8.97794 7.98501C9.21985 7.87042 9.41549 7.82031 9.68489 7.7722C10.3656 7.65064 11.0632 7.66923 11.7553 7.67481C12.5994 7.68162 13.3905 7.68942 14.1791 7.97419C14.7767 8.19 15.4204 8.46661 15.9753 8.77492C16.1237 8.85737 16.3041 8.95283 16.3793 9.10315"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
                <div :class="{ wide: isSearchActive, narrow: !isSearchActive }">
                    <input
                        type="text"
                        placeholder="Buscar"
                        class="h-[40px] w-full desktop:h-[60px] border-none bg-base-200 text-lg text-start rounded-tr-full rounded-br-full transition-all duration-500 ease-in-out"
                        v-model="searchCommand"
                        @input="debouncedSearch"
                    />
                </div>
            </div>
            <!-- Button to select all providers -->
            <button
                class="relative flex-shrink-0 w-[80px] h-[40px] z-10 desktop:w-[123px] desktop:h-[60px] text-[12px] tablet:text-base desktop:text-xl rounded-md tablet:rounded-box shadow-inner shadow-neutral/25 border hover:bg-primary-content/90 hover:scale-105 transform transition-transform duration-300"
                :class="
                    appComponent.selections.provider == '' || appComponent.selections.provider == providerSelected
                        ? 'bg-primary'
                        : 'bg-base-200'
                "
                @click="
                    selectProvider('', '', '');
                    providerSelected = '';
                    appComponent.selections.provider = '';
                    appComponent.gAnalytics('game_type', 'Todos los proveedores');
                "
                v-bind="analyticsAttrs.filterAll"
            >
                {{ providerSelected == '' ? $t('Todos') : $t(appComponent.selections.provider) }}
                <svg
                    v-if="appComponent.selections.provider != ''"
                    :width="20"
                    :height="20"
                    id="Capa_2"
                    data-name="Capa 2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24.94 24.94"
                    class="absolute top-1 right-1 mx-auto"
                >
                    <circle
                        fill="#ffffff"
                        cx="12.47"
                        cy="12.47"
                        r="12.47"
                    />
                    <circle
                        fill="#ff0000"
                        cx="12.47"
                        cy="12.47"
                        r="10.66"
                    />
                    <path
                        fill="#ffffff"
                        d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z"
                    />
                </svg>
            </button>
            <!-- Dynamic buttons for each provider -->
            <button
                v-for="(provider, index) in providers.slice(0, appComponent.mobile ? 2 : 6)"
                :key="index"
                class="w-[80px] h-[40px] flex-shrink-0 desktop:w-[123px] desktop:h-[60px] text-[12px] tablet:text-base desktop:text-xl rounded-md tablet:rounded-box shadow-inner shadow-neutral/25 border leading-4 text-center border-accent-focus hover:bg-opacity-75 hover:scale-105 transform transition-transform duration-300"
                :class="
                    appComponent.selections.provider == provider.title
                        ? 'bg-primary'
                        : 'bg-base-200'
                "
                @click="
                    selectProvider(provider.name, provider.image, provider.title);
                    appComponent.gAnalytics('supplier', provider.title);
                    providerSelected = '';
                    onOthers = false;
                "
                v-bind="analyticsAttrs.provider(provider)"
            >
                {{ $t(provider.title) }}
            </button>
            <!-- Placeholder for additional providers if there are more than displayed -->
            <div
                v-if="providers.length > (appComponent.mobile ? 2 : 6)"
                class="w-[42px] desktop:w-[80px] h-[42px] desktop:h-[60px] aspect-square"
            ></div>
        </nav>
        <!-- Additional providers dropdown if there are more than displayed -->
        <div
            v-if="providers.length > (appComponent.mobile ? 2 : 6)"
            class="absolute right-4 tablet:right-0 top-0 bottom-0 w-[42px] desktop:w-[80px] h-[42px] desktop:h-[60px] aspect-square"
        >
            <div class="absolute right-0 top-0 text-center rounded-md flex justify-around items-start z-30">
                <div
                    v-if="onOthers"
                    class="slider-casino overflow-y-auto bg-base-300 h-96 w-56 rounded-b-md rounded-tl-md text-neutral-content text-lg desktop:text-xl ml-1 shadow-inner shadow-neutral/25"
                >
                    <ul class="p-1 grid gap-1">
                        <li
                            v-for="provider in providers.slice(appComponent.mobile ? 2 : 6)"
                            class="providerLi w-full h-10 desktop:h-14 cursor-pointer flex justify-start items-center gap-2 px-2 rounded border-secondary shadow-inner shadow-black/25"
                            :class="providerSelected == provider.title ? 'bg-primary-content' : 'bg-base-content'"
                            @click="
                                selectProvider(provider.name, provider.image, provider.title);
                                appComponent.gAnalytics('game_type', provider.title);
                                providerSelected = provider.title;
                                onOthers = false;
                            "
                            v-bind="analyticsAttrs.provider(provider)"
                        >
                            <div class="w-2 h-2 bg-neutral rounded-full"></div>
                            <span
                                tabindex="0"
                                class="capitalize text-base text-neutral font-bold"
                                >{{ $t(provider.title) }}</span
                            >
                        </li>
                    </ul>
                </div>
                <div
                    class="bg-secondary-content"
                    :class="onOthers ? 'rounded-r-2xl' : 'rounded-2xl'"
                >
                    <button
                        tabindex="0"
                        class="h-[42px] desktop:h-[60px] aspect-square rounded-md flex justify-center items-center bg-base-200 shadow-inner shadow-neutral/25 border border-accent-focus hover:bg-primary-content/90 hover:scale-105 transform transition-transform duration-300"
                        @click="onOthers = !onOthers"
                        v-bind="analyticsAttrs.viewAll"
                    >
                        <font-awesome-icon
                            v-if="!onOthers"
                            icon="fa-solid fa-plus"
                            size="2x"
                            class="text-neutral"
                        />
                        <font-awesome-icon
                            v-else
                            icon="fa-solid fa-xmark"
                            size="2x"
                            class="text-neutral"
                        />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import searchIcon from '@/components/icons/searchIcon.vue';
import MoreProviders from '@/components/icons/MoreProviders.vue';
import ExitIcon from '../icons/ExitIcon.vue';
import { toKebabCase } from '@/utils';
declare var Ticker: any; // Declare external variable Ticker
export default defineComponent({
    props: {
        typelobby: String, // Prop to receive lobby type
    },
    components: { ExitIcon, MoreProviders }, // Register components
    data: function () {
        let appComponent: any = this.$appComponent; // Reference to app component
        let config = this.$config(); // Configuration object
        let openSearchv3: boolean = false; // State for search visibility
        let hideInputSearch: any = ''; // State for hiding search input
        let searchCommand = ''; // Search command input
        let showSearchCommandResults: any = ''; // Results of the search command
        let providersLength: any = ''; // Length of providers array
        let providers: any = ''; // Array of providers
        let optionsGames: any = ''; // Options for games
        let partnerG: any = ''; // Partner ID
        let urlVirtualplay: any = ''; // URL for virtual play
        let limit: any = ''; // Limit for games
        let flag: boolean = true; // Flag for state management
        let limitConfig: any = ''; // Configuration limit
        let providerId = ''; // Selected provider ID
        let limitBefore: any = ''; // Previous limit
        let preloaderShow: boolean = false; // State for preloader visibility
        let openLink: boolean = true; // State for link visibility
        let onOthers: boolean = false; // State for showing other providers
        let providerSelected: string = ''; // Currently selected provider
        let colors: any = {}; // Color configuration
        let deviceTheme: string = 'theme_colors'; // Default device theme
        let isSearchActive: boolean = false; // State for search activation
        let debouncedSearch: any = null; // Debounced search function

        const analyticsAttrs = {};

        return {
            appComponent,
            config,
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
            colors,
            deviceTheme,
            isSearchActive,
            debouncedSearch,
            analyticsAttrs,
        };
    },
    created() {
        // Determine device theme based on configuration
        if (this.config.theme_colors_desktop != undefined && this.config.mobileL == '') {
            this.deviceTheme = 'theme_colors_desktop';
        } else if (this.config.theme_colors_mobile != undefined && this.config.mobileL != '') {
            this.deviceTheme = 'theme_colors_mobile';
        }
        this.colors = this.config[this.deviceTheme]; // Set colors based on theme
        this.debouncedSearch = this.debounce(this.searchEnter, this.appComponent.config['timeDebouncedSearch'] ?? 500); // Initialize debounced search
    },
    mounted() {
        // Set initial configurations on component mount
        this.limitConfig = this.config.casino.limit;
        this.urlVirtualplay = this.config.urlVirtualplay;
        this.partnerG = this.appComponent.partnerG;
        this.appComponent.selections.provider = ''; // Reset selected provider
        this.getProviders(); // Fetch providers
    },
    methods: {
        OpenSearchV3() {
            this.openSearchv3 = true; // Open search
        },
        CloseSearchV3() {
            this.openSearchv3 = false; // Close search
        },
        selectProvider(name: any, img: any, name2: any) {
            var vthis = this; // Reference to current context
            this.flag = true; // Set flag
            this.appComponent.selections.category = undefined; // Reset category selection
            this.isSearchActive = false; // Deactivate search
            this.searchCommand = ''; // Clear search command
            this.appComponent.preloaderShow = true; // Show preloader
            // Show preload game elements
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'block';
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
            });
            this.appComponent.gamesList = []; // Reset games list
            this.appComponent.selections.provider = name; // Set selected provider
            if (name2 != '') {
                this.appComponent.selections.provider = name2; // Override with name2 if provided
            }
            // Prepare options for fetching games
            this.optionsGames = {
                action: 'getGames2',
                partner_id: this.appComponent.partnerG,
                provider: name,
                typelobby: this.typelobby,
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
                this.optionsGames.provider = name; // Set provider in options
                this.providerId = name; // Set provider ID
            }
            // Update browser history based on route
            if (this.$route.path.indexOf('new-casino') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/new-casino/proveedor/' + name);
                } else {
                    window.history.pushState('', '', '/new-casino');
                }
            } else if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/virtuales-lobby/proveedor/' + name);
                } else {
                    window.history.pushState('', '', '/virtuales-lobby');
                }
            } else {
                window.history.pushState('', '', '/live-casino-vivo/proveedor/' + name);
            }
            // Fetch games with a timeout
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames),
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
                    } else {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesList = json.games; // Set games list
                        vthis.appComponent.total_count = json.total_count; // Set total count
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.limit = vthis.appComponent.gamesList.length + vthis.limitConfig; // Update limit
                        vthis.noMoreGames(); // Check for no more games
                        // Hide preload game elements
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-top'),
                            function (el, i) {
                                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display =
                                    'none';
                            },
                        );
                        // Show or hide load more button based on total count
                        if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = false;
                        }
                        if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = true;
                        }
                        // Handle Playtech jackpot script
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
                                    existingScript.remove(); // Remove existing script
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
                                                vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                            objParams.game = game.front_game_id; // Set game ID for jackpot
                                            var ticker = new Ticker(objParams); // Create new ticker instance
                                            ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to text box
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
                    vthis.appComponent.gamesList = []; // Reset games list on error
                    vthis.appComponent.total_count = 0; // Reset total count
                    vthis.appComponent.offset = 0; // Reset offset
                    vthis.limit = vthis.limitConfig; // Reset limit
                });
            vthis.appComponent.showMore = true; // Show more button
        },
        selectionsProviderFilter(filter: any) {
            try {
                return this.providers.filter((provider) => {
                    return provider.name == filter || provider.title == filter; // Filter providers by name or title
                })[0].title; // Return the title of the first matching provider
            } catch (e) {}
        },
        openProviders2() {
            const otherButton: any = document.querySelector('#menuProviders');
            otherButton.classList.toggle('ver-drop'); // Toggle visibility of providers menu
        },
        noMoreGames() {
            var vthis = this;
            if (vthis.appComponent.gamesList.length <= 0) {
                // Show no games message if games list is empty
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none';
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none';
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
                action: 'getOptions', // Action to fetch provider options
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country for filtering
                typelobby: this.typelobby, // Lobby type
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag if logged in
            }
            // Fetch providers with a timeout
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options),
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
                        this.providersLength = json.providers.length; // Update providers length
                        // Show or hide load more button based on total count
                        if (this.appComponent.offset >= this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = false;
                        }
                        if (this.appComponent.offset < this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = true;
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
                    'data-analytics-context': `component:MenuProviders6|layout:${this.appComponent.config.layout}`
                },
                viewAll: {
                    'data-analytics-label': `casino:provider-filter:more`,
                    'data-analytics-context': `component:MenuProviders6|layout:${this.appComponent.config.layout}`
                },
                arrowPrev: {
                    'data-analytics-label': `casino:carousel:providers:arrow-prev`,
                    'data-analytics-context': `component:MenuProviders6|layout:${this.appComponent.config.layout}`
                },
                arrowNext: {
                    'data-analytics-label': `casino:carousel:providers:arrow-next`,
                    'data-analytics-context': `component:MenuProviders6|layout:${this.appComponent.config.layout}`
                },
                provider: (provider) => ({
                    'data-analytics-label': `casino:provider-filter:${toKebabCase(provider.name)}`,
                    'data-analytics-position': `${this.providers.findIndex((g) => g.name === provider.name) + 1}`,
                    'data-analytics-context': `component:MenuProviders6|layout:${this.appComponent.config.layout}`
                })
            };
        },
        toggleSearch() {
            this.isSearchActive = !this.isSearchActive; // Toggle search activation
            this.searchCommand = ''; // Clear search command
        },
        searchEnter() {
            var vthis = this;
            this.appComponent.preloaderShow = true; // Show preloader
            if (this.searchCommand.length >= 3) {
                // Proceed with search if command length is sufficient
                this.optionsGames = {
                    action: 'getGames2',
                    partner_id: this.appComponent.partnerG,
                    search: this.searchCommand, // Set search command
                    country: this.appComponent.country, // Country for filtering
                    typelobby: -1, // Lobby type
                };
                // Set mobile flag
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                // Fetch games based on search command
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                    .then((response: any) => {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesList = json.games; // Set games list
                        vthis.appComponent.total_count = json.total_count; // Set total count
                        vthis.appComponent.offset = 0; // Reset offset
                        // Handle Playtech jackpot script
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing script
                            }
                            var script = document.createElement('script'); // Create new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Reference to current context
                            script.onload = function () {
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id; // Set game ID for jackpot
                                        var ticker = new Ticker(objParams); // Create new ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to text box
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Append script to document head
                        }
                        this.appComponent.preloaderShow = false; // Hide preloader
                    });
            } else {
                this.appComponent.gamesList = []; // Reset games list if search command is too short
                this.appComponent.preloaderShow = false; // Hide preloader
            }
        },
        debounce(func, wait) {
            let timeout; // Timeout variable for debouncing
            return function (...args) {
                const later = () => {
                    clearTimeout(timeout); // Clear timeout
                    func.apply(this, args); // Call the original function
                };
                clearTimeout(timeout); // Clear existing timeout
                timeout = setTimeout(later, wait); // Set new timeout
            };
        },
    },
});
</script>
<style scoped>
/* Hide scrollbar for slider-casino */
.slider-casino::-webkit-scrollbar {
    display: none;
}
/* Hover effect for provider list items */
.providerLi:hover > div:nth-child(1) {
    width: 2rem !important; /* Expand indicator on hover */
    transition: 0.5s ease-in-out !important; /* Smooth transition */
}
/* Animation for blob effect */
.blob {
    background: black; /* Blob color */
    border-radius: 50%; /* Circular shape */
    height: 100%; /* Full height */
    width: 100%; /* Full width */
    transform: scale(1); /* Initial scale */
    animation: pulsea 2s infinite; /* Pulsing animation */
}
/* Styles for narrow search input */
.narrow {
    width: 0;
    transition: width 1s ease-in-out; /* Smooth transition */
}
.narrow input {
    display: none; /* Hide input */
    width: 0; /* No width */
    transition: 1s width 1s ease-in-out; /* Smooth transition */
}
/* Styles for wide search input */
.wide {
    width: 70vw; /* Width for wide input */
    transition: width 1s ease-in-out; /* Smooth transition */
}
.wide input {
    display: block; /* Show input */
    width: 85vw; /* Width for input */
    transition: 1s width 1s ease-in-out; /* Smooth transition */
}
/* Media query for larger screens */
@media (min-width: 743px) {
    .wide {
        width: 360px; /* Fixed width for wide input */
        transition: width 1s ease-in-out; /* Smooth transition */
    }
    .wide input {
        display: block; /* Show input */
        width: 300px; /* Fixed width for input */
        transition: 1s width 1s ease-in-out; /* Smooth transition */
    }
}
</style>

<!-- FILE DOCUMENTED -->

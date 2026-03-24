<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import MagnifyingGlass from '../icons/MagnifyingGlass.vue';
import anime from 'animejs';
declare var Ticker: any; // Declare Ticker as a global variable

export default defineComponent({
    props: {
        typelobby: String, // Prop to receive the type of lobby
    },
    components: {
        MagnifyingGlass, // Register the MagnifyingGlass component
    },
    data: function () {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let config = this.$config(); // Configuration object
        let searchCommand = ''; // Command for search input
        let categories: any = ''; // Categories for games
        let onSearch: boolean = false; // Flag to indicate if a search is active
        let flag: boolean = true; // General flag for state management
        let optionsGames: any = ''; // Options for game requests
        let partnerG: any = ''; // Partner ID
        let gamesList: any = []; // List of games
        let limitConfig: any = ''; // Limit configuration for games
        let urlVirtualplay: any = ''; // URL for virtual play
        let categoriesLength: any = ''; // Length of categories
        let country: any = ''; // Country information
        return {
            appComponent,
            onSearch,
            config,
            categories,
            flag,
            searchCommand,
            optionsGames,
            partnerG,
            limitConfig,
            urlVirtualplay,
            categoriesLength,
            country,
        };
    },
    mounted() {
        this.config = this.config; // Assign config to the component
        this.limitConfig = this.config.casino.limit; // Set limit configuration
        this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
        this.partnerG = this.appComponent.partnerG; // Set partner ID
        this.country = this.appComponent.country; // Set country
        this.getCategories(); // Fetch categories on mount
    },
    methods: {
        onOpenGame(game, $event) {
            // Method to open a game
            if (this.appComponent.session.logueado) {
                this.appComponent.gamesListSearch.idSelect = game.id; // Set selected game ID
                this.appComponent.openLink = true; // Open game link
                this.appComponent.openGame(game); // Open the game
                this.appComponent.showGame = true; // Show game UI
                this.onSearch = false; // Reset search flag
                $event.stopPropagation(); // Prevent event bubbling
            } else {
                this.appComponent.showModalLogin = true; // Show login modal if not logged in
            }
        },
        searchEnter(event) {
            // Method to handle search input
            var vthis = this; // Preserve context
            if (this.searchCommand.length >= 3) {
                this.optionsGames = {
                    action: 'getGames2', // Action for API request
                    partner_id: this.appComponent.partnerG, // Partner ID
                    search: this.searchCommand, // Search command
                    country: this.appComponent.country, // Country
                    typelobby: -1, // Type of lobby
                };
                // Set mobile flag based on app component
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames) // API request for games
                    .then((response: any) => {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesListSearch = json.games; // Update games list
                        vthis.appComponent.total_count = json.total_count; // Update total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limit = vthis.appComponent.limit; // Set limit
                        // Check for Playtech jackpot configuration
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing jackpot script
                            }
                            var script = document.createElement('script'); // Create new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Preserve context
                            script.onload = function () {
                                // On script load, attach ticker to games with jackpots
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id; // Set game ID for ticker
                                        var ticker = new Ticker(objParams); // Create new ticker instance
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
                this.appComponent.gamesListSearch = []; // Clear search results if input is less than 3 characters
            }
        },
        noMoreGames() {
            // Method to handle no more games scenario
            var vthis = this; // Preserve context
            if (vthis.appComponent.gamesList.length <= 0) {
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload games
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide bottom preload games
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
        selectCategory(category) {
            // Method to select a game category
            var vthis = this; // Preserve context
            this.flag = true; // Set flag to true
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload games
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'block'; // Show bottom preload games
            });
            this.appComponent.gamesList = []; // Clear current games list
            this.appComponent.selections.category = {}; // Reset category selection
            this.appComponent.selections.category.id = category.id; // Set selected category ID
            this.appComponent.selections.provider = ''; // Reset provider selection
            this.optionsGames = {
                action: 'getGames2', // Action for API request
                partner_id: this.partnerG, // Partner ID
                typelobby: this.typelobby, // Type of lobby
                offset: 0, // Reset offset
                limit: vthis.limitConfig, // Set limit configuration
                country: this.appComponent.country, // Country
            };
            // Set mobile flag based on app component
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true;
            } else {
                this.optionsGames.isMobile = false;
            }
            if (category.id != '' && category.id != 'all') {
                this.optionsGames.category = category.id; // Set category ID if valid
            }
            // Update browser history based on current route
            if (this.$route.path.indexOf('new-casino') != -1) {
                window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id);
            } else if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                window.history.pushState('', '', '/virtuales-lobby/categoria/' + category.slug + '-' + category.id);
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames), // API request for games
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout promise
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        vthis.appComponent.gamesList = []; // Clear games list on timeout
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limit = vthis.limitConfig; // Reset limit
                    } else {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesList = json.games; // Update games list
                        vthis.appComponent.total_count = json.total_count; // Update total count
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.appComponent.limit = vthis.appComponent.gamesList.length + vthis.limitConfig; // Update limit
                        vthis.noMoreGames(); // Check for no more games
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-top'),
                            function (el, i) {
                                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display =
                                    'none'; // Hide top preload games
                            },
                        );
                        // Check for Playtech jackpot configuration
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing jackpot script
                            }
                            var script = document.createElement('script'); // Create new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Preserve context
                            script.onload = function () {
                                // On script load, attach ticker to games with jackpots
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id; // Set game ID for ticker
                                        var ticker = new Ticker(objParams); // Create new ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Append script to document head
                        }
                    }
                })
                .catch((error) => {
                    vthis.appComponent.gamesList = []; // Clear games list on error
                    vthis.appComponent.total_count = 0; // Reset total count
                    vthis.appComponent.offset = 0; // Reset offset
                    vthis.appComponent.limit = vthis.limitConfig; // Reset limit
                });
            if (vthis.appComponent.total_count < vthis.limitConfig) {
                vthis.appComponent.showMore = false; // Hide "show more" if total count is less than limit
            } else {
                vthis.appComponent.showMore = true; // Show "show more" if total count is sufficient
            }
        },
        selectCategoryFav() {
            // Method to select favorite category
            this.appComponent.gamesList = []; // Clear current games list
            this.appComponent.gamesList = this.appComponent.myCasinoGames; // Load favorite games
            this.appComponent.total_count = this.appComponent.gamesList.length; // Update total count
            this.appComponent.selections.category.id = 1811; // Set category ID for favorites
        },
        getCategories() {
            // Method to fetch game categories
            var options = {
                action: 'getOptions', // Action for API request
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country
                typelobby: this.typelobby, // Type of lobby
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Add test user flag if logged in
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options), // API request for categories
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout promise
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        this.categories = []; // Clear categories on timeout
                        this.categoriesLength = 0; // Reset categories length
                    } else {
                        this.categories = response.data.categories; // Update categories
                        this.categoriesLength = response.data.categories.length; // Update categories length
                    }
                })
                .catch((error) => {
                    this.categories = []; // Clear categories on error
                    this.categoriesLength = 0; // Reset categories length
                });
        },
    },
});
</script>
<template>
    <section class="w-full h-full flex justify-center items-center px-5 lg:px-14 py-0">
        <!-- Main section for displaying categories and games -->
        <nav
            class="in max-w-[1300px] bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-start items-center rounded-xl gap-4 z-30"
        >
            <button
                v-if="appComponent != undefined && appComponent.favCasino != false"
                @click="selectCategoryFav()"
                class="ml-2 categorys lg:hover:bg-primary-content hover:text-neutral border-solid border-b-1 grid justify-center items-center h-28 lg:h-36 w-28 lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 shrink-0 lg:shrink"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id == 1811
                        ? 'bg-primary-content blob font-bold categorysSelected shadow-neutral-content/50 shadow-[inset_0px_-5px_0px] border-neutral'
                        : appComponent.config.layout != undefined && appComponent.config.layout == 7
                          ? 'bg-neutral-content border-transparent'
                          : 'bg-secondary border-transparent'
                "
            >
                <div class="lg:h-14 w-12 h-12 lg:w-14 mx-auto flex items-center justify-center">
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
                    </svg> <!-- Placeholder for SVG icon -->
                </div>
                <span class="text-xs lg:text-sm font-bold uppercase text-neutral">{{ $t('Favoritos') }}</span>
            </button>
            <button
                v-for="category in categories"
                @click="
                    selectCategory(category);
                    appComponent.gAnalytics('category_live', category.title);
                "
                class="categorys transition-all ease-in-out duration-500 lg:hover:bg-primary-content hover:text-neutral border-solid border-b-1 grid justify-center items-center h-28 lg:h-36 w-28 lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 shrink-0 lg:shrink"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id === category.id
                        ? 'bg-primary-content blob font-bold categorysSelected shadow-neutral-content/50 shadow-[inset_0px_-5px_0px] border-neutral'
                        : appComponent.config.layout != undefined && appComponent.config.layout == 7
                          ? 'bg-neutral-content border-transparent'
                          : 'bg-secondary border-transparent'
                "
            >
                <div
                    class="h-12 lg:h-14 w-12 lg:w-14 mx-auto"
                    v-html="category.icon"
                ></div>
                <span class="text-xs lg:text-sm font-bold uppercase text-neutral">{{ $t(category.title) }}</span>
            </button>
        </nav>
    </section>
</template>
<style>
.categorys:hover div svg *,
.categorysSelected div svg * {
    fill: white; /* Change fill color for hover and selected states */
}
.categorys:hover * {
    color: white !important; /* Change text color on hover */
}
::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

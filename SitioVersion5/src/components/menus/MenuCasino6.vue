<template>
    <!-- Main section for displaying categories if available -->
    <section
        v-if="categories.length > 0"
        class="flex justify-center items-center flex-wrap w-full gap-2 desktop:gap-8 px-4 tablet:px-0"
    >
        <!-- Button for favorite casino category, shown conditionally -->
        <button
            v-if="appComponent != undefined && appComponent.favCasino != false"
            @click="selectCategoryFav()"
            class="desktop:w-full min-w-[75px] min-h-[60px] max-w-[170px] desktop:h-[160px] flex flex-col justify-center items-center gap-2 desktop:gap-4 rounded-box p-2 desktop:p-4 border border-secondary-content shadow-inner shadow-secondary/50 hover:scale-[1.02] transition-transform duration-300 ease-in-out bg-secondary-focus hover:bg-secondary/25"
        >
            <div class="w-1/2 aspect-square flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                class="text-[9px] desktop:text-2xl leading-3 desktop:leading-6 text-center desktop:font-bold capitalize"
                >{{ $t('Favoritos') }}</span
            >
        </button>
        <!-- Button for each category in the categories array -->
        <button
            v-for="(category, index) in categories"
            :key="index"
            :aria-label="category.MENU_TITLE"
            @click="
                selectCategory(category);
                appComponent.gAnalytics('category_live', category.title);
            "
            class="w-[75px] h-[60px] tablet:w-[100px] tablet:h-[95px] desktop:w-[150px] desktop:h-[140px] flex flex-col justify-center items-center gap-2 desktop:gap-4 rounded-box p-2 desktop:p-4 border border-base-200 shadow-inner shadow-neutral hover:scale-[1.02] transition-transform duration-300 ease-in-out bg-base-100 hover:bg-base-300"
        >
            <div
                class="w-1/2 aspect-square flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:object-contain"
                v-html="category.icon"
            ></div>
            <span
                class="text-[9px] tablet:text-base desktop:text-xl leading-3 desktop:leading-6 text-center capitalize"
                >{{ $t(category.title) }}</span
            >
        </button>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import MagnifyingGlass from '../icons/MagnifyingGlass.vue';
import anime from 'animejs';
declare var Ticker: any; // Declare external Ticker variable

export default defineComponent({
    props: {
        typelobby: String, // Prop to receive lobby type
    },
    components: {
        MagnifyingGlass, // Register MagnifyingGlass component
    },
    data: function () {
        // Define component data properties
        let appComponent: any = this.$appComponent; // Reference to app component
        let config = this.$config(); // Configuration object
        let searchCommand = ''; // Search command string
        let categories: any = ''; // Categories array
        let onSearch: boolean = false; // Search status flag
        let flag: boolean = true; // General flag for state management
        let optionsGames: any = ''; // Options for games API request
        let partnerG: any = ''; // Partner ID
        let gamesList: any = []; // List of games
        let limitConfig: any = ''; // Limit configuration for games
        let urlVirtualplay: any = ''; // URL for virtual play API
        let categoriesLength: any = ''; // Length of categories array
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
        // Lifecycle hook to initialize data after component is mounted
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
                this.appComponent.showGame = true; // Show game modal
                this.onSearch = false; // Reset search status
                $event.stopPropagation(); // Prevent event propagation
            } else {
                this.appComponent.showModalLogin = true; // Show login modal if not logged in
            }
        },
        searchEnter(event) {
            // Method to handle search input
            var vthis = this; // Preserve context
            if (this.searchCommand.length >= 3) {
                // Proceed if search command is at least 3 characters
                this.optionsGames = {
                    action: 'getGames2', // Action for API request
                    partner_id: this.appComponent.partnerG, // Partner ID
                    search: this.searchCommand, // Search term
                    country: this.appComponent.country, // Country
                    typelobby: -1, // Lobby type
                };
                // Set mobile flag based on app component
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                // Make API request to fetch games
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
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
                                // On script load, attach ticker to games
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id; // Set game ID for ticker
                                        var ticker = new Ticker(objParams); // Create new ticker instance
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
                this.appComponent.gamesListSearch = []; // Clear search results if input is too short
            }
        },
        noMoreGames() {
            // Method to handle no more games available
            var vthis = this; // Preserve context
            if (vthis.appComponent.gamesList.length <= 0) {
                // If no games are available
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide bottom preload
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
                            'none'; // Hide no games text if games are available
                    },
                );
            }
        },
        selectCategory(category) {
            // Method to select a category and fetch games
            var vthis = this; // Preserve context
            this.flag = true; // Set flag for loading state
            this.appComponent.preloaderShow = true; // Show preloader
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'block'; // Show bottom preload
            });
            this.appComponent.gamesList = []; // Clear current games list
            this.appComponent.selections.category = {}; // Reset category selection
            this.appComponent.selections.category.id = category.id; // Set selected category ID
            this.appComponent.selections.provider = ''; // Reset provider selection
            this.optionsGames = {
                action: 'getGames2', // Action for API request
                partner_id: this.partnerG, // Partner ID
                typelobby: this.typelobby, // Lobby type
                offset: 0, // Reset offset
                limit: vthis.limitConfig, // Set limit
                country: this.appComponent.country, // Country
            };
            // Set mobile flag based on app component
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true;
            } else {
                this.optionsGames.isMobile = false;
            }
            // Include category ID if valid
            if (category.id != '' && category.id != 'all') {
                this.optionsGames.category = category.id;
            }
            window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id); // Update browser history
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
                        this.appComponent.preloaderShow = false; // Hide preloader
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
                                    'none'; // Hide top preload
                            },
                        );
                        // Check for Playtech jackpot configuration
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            setTimeout(() => {
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH') {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id; // Set game ID for ticker
                                        var ticker = new Ticker(objParams); // Create new ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            }, 500);
                        }
                        this.appComponent.preloaderShow = false; // Hide preloader
                    }
                })
                .catch((error) => {
                    vthis.appComponent.gamesList = []; // Clear games list on error
                    vthis.appComponent.total_count = 0; // Reset total count
                    vthis.appComponent.offset = 0; // Reset offset
                    vthis.appComponent.limit = vthis.limitConfig; // Reset limit
                    this.appComponent.preloaderShow = false; // Hide preloader
                });
            // Determine if more games can be shown based on total count
            if (vthis.appComponent.total_count < vthis.limitConfig) {
                vthis.appComponent.showMore = false; // Hide "show more" button
            } else {
                vthis.appComponent.showMore = true; // Show "show more" button
            }
        },
        selectCategoryFav() {
            // Method to select favorite category
            this.appComponent.gamesList = []; // Clear current games list
            this.appComponent.gamesList = this.appComponent.myCasinoGames; // Set games list to favorite games
            this.appComponent.total_count = this.appComponent.gamesList.length; // Update total count
            this.appComponent.selections.category.id = 1811; // Set category ID for favorites
        },
        getCategories() {
            // Method to fetch categories from API
            var options = {
                action: 'getOptions', // Action for API request
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country
                typelobby: this.typelobby, // Lobby type
            };
            // Include test user flag if logged in
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false;
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
<style scoped>
/* Styles for category hover effects */
.categorys:hover div svg *,
.categorysSelected div svg * {
    fill: white; /* Change fill color to white on hover */
}
.categorys:hover * {
    color: white !important; /* Change text color to white on hover */
}
::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

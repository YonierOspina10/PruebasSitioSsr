<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import MagnifyingGlass from '../icons/MagnifyingGlass.vue';
import anime from 'animejs';
import { useGlobalStore } from '@/stores/global';
declare var Ticker: any; // Declare Ticker as a global variable

export default defineComponent({
    props: {
        typelobby: String, // Prop to receive the type of lobby
        styleVersion: {
            type: Number,
            default: 1, // Default style version
        },
    },
    components: {
        MagnifyingGlass, // Register the MagnifyingGlass component
    },
    data: function () {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let config = this.$config(); // Configuration object
        let emitter: any = this.$emitter(); // Event emitter
        let searchCommand = ''; // Command for search input
        let categories: any = ''; // Categories for games
        let onSearch: boolean = false; // Flag to indicate if search is active
        let flag: boolean = true; // General flag for component state
        let optionsGames: any = ''; // Options for game requests
        let partnerG: any = ''; // Partner ID
        let favMenu: boolean = false; // Flag for favorite menu visibility
        let limitConfig: any = ''; // Limit configuration for games
        let urlVirtualplay: any = ''; // URL for virtual play API
        let categoriesLength: any = ''; // Length of categories
        let country: any = ''; // Country information
        let storeCasinoLobby = useGlobalStore(); // Global store for casino lobby state
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
            favMenu,
            emitter,
            storeCasinoLobby,
        };
    },
    unmounted() {
        // Clean up event listeners when component is unmounted
        this.emitter.all.delete('activeFav');
        this.emitter.all.delete('deleteFav');
    },
    mounted() {
        // Initialize component state when mounted
        this.limitConfig = this.config.casino.limit;
        this.urlVirtualplay = this.config.urlVirtualplay;
        this.partnerG = this.appComponent.partnerG;
        this.country = this.appComponent.country;
        this.getCategories(); // Fetch categories on mount
        this.emitter.on('activeFav', () => {
            this.getFavMenu(); // Update favorite menu on event
        });
        this.emitter.on('deleteFav', () => {
            this.getFavMenu(); // Update favorite menu on event
        });
    },
    methods: {
        onOpenGame(game, $event) {
            // Open a game if the user is logged in
            if (this.appComponent.session.logueado) {
                this.appComponent.gamesListSearch.idSelect = game.id;
                this.appComponent.openLink = true;
                this.appComponent.openGame(game);
                this.appComponent.showGame = true;
                this.onSearch = false;
                $event.stopPropagation(); // Prevent event propagation
            } else {
                this.appComponent.showModalLogin = true; // Show login modal if not logged in
            }
        },
        searchEnter(event) {
            // Handle search input and fetch games based on search command
            var vthis = this;
            if (this.searchCommand.length >= 3) {
                this.optionsGames = {
                    action: 'getGames2',
                    partner_id: this.appComponent.partnerG,
                    search: this.searchCommand,
                    country: this.appComponent.country,
                    typelobby: -1,
                };
                if (this.appComponent.session.logueado) {
                    this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Check if user is a test user
                }
                this.optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames) // API request to fetch games
                    .then((response: any) => {
                        var json = response.data;
                        vthis.appComponent.gamesListSearch = json.games; // Update games list
                        vthis.appComponent.total_count = json.total_count; // Update total count of games
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limit = vthis.appComponent.limit; // Set limit
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
                            var script = document.createElement('script');
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Load jackpot script
                            const vthis = this;
                            script.onload = function () {
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id;
                                        var ticker = new Ticker(objParams); // Create a new ticker for jackpot
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
                this.appComponent.gamesListSearch = []; // Clear search results if input is less than 3 characters
            }
        },
        noMoreGames() {
            // Handle the display of "no more games" message
            var vthis = this;
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
                            'block'; // Show no games message
                    },
                );
            } else {
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function (el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'none'; // Hide no games message
                    },
                );
            }
        },
        selectBingo() {
            // Select bingo category and update app state
            this.appComponent.gamesList = [];
            this.appComponent.selections.category = {};
            this.appComponent.selections.category.id = 'lobby'; // Set selected category to lobby
            this.appComponent.selections.provider = ''; // Reset provider selection
            window.history.pushState('', '', '/bingos'); // Update browser history
        },
        selectCategory(category) {
            // Select a category and fetch corresponding games
            this.appComponent.loadingGames = true; // Set loading state
            var vthis = this;
            this.flag = true; // Set flag for loading
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload games
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'block'; // Show bottom preload games
            });
            this.appComponent.gamesList = []; // Clear current games list
            this.appComponent.selections.category = {};
            this.appComponent.selections.category.id = category.id; // Set selected category ID
            this.storeCasinoLobby.category = category.id; // Update global store with selected category
            this.appComponent.selections.provider = ''; // Reset provider selection
            this.storeCasinoLobby.provider = 'all'; // Set provider to all
            this.optionsGames = {
                action: 'getGames2',
                partner_id: this.partnerG,
                typelobby: this.typelobby,
                offset: 0,
                limit: vthis.limitConfig,
                country: this.appComponent.country,
            };
            if (this.appComponent.session.logueado) {
                this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Check if user is a test user
            }
            this.optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag
            if (category.id != '' && category.id != 'all') {
                this.optionsGames.category = category.id; // Set category ID in options
            } else {
                this.storeCasinoLobby.category = 'all'; // Set global store category to all
            }
            // Update browser history based on current route and selected category
            if (this.$route.path.indexOf('new-casino') != -1) {
                if (category != '') {
                    window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id);
                } else {
                    window.history.pushState('', '', '/new-casino');
                }
            } else {
                if (this.$route.path.indexOf('live-casino-vivo') != -1) {
                    if (category != '') {
                        window.history.pushState(
                            '',
                            '',
                            '/live-casino-vivo/categoria/' + category.slug + '-' + category.id,
                        );
                    } else {
                        window.history.pushState('', '', '/live-casino-vivo');
                    }
                } else if (this.$route.path.indexOf('bingos') != -1) {
                    if (category != '') {
                        window.history.pushState('', '', '/bingos/categoria/' + category.slug + '-' + category.id);
                    } else {
                        window.history.pushState('', '', '/bingos');
                    }
                } else {
                    if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                        if (category != '') {
                            window.history.pushState(
                                '',
                                '',
                                '/virtuales-lobby/categoria/' + category.slug + '-' + category.id,
                            );
                        } else {
                            window.history.pushState('', '', '/virtuales-lobby');
                        }
                    } else {
                        window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id);
                    }
                }
            }
            this.emitter.emit('get:gamesList'); // Emit event to fetch games list
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames), // API request to fetch games
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        vthis.appComponent.gamesList = []; // Clear games list on timeout
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limit = vthis.limitConfig; // Reset limit
                        this.appComponent.loadingGames = false; // Reset loading state
                    } else {
                        var json = response.data;
                        vthis.appComponent.gamesList = json.games; // Update games list
                        vthis.appComponent.total_count = json.total_count; // Update total count
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.appComponent.limit = vthis.appComponent.gamesList.length + vthis.limitConfig; // Update limit
                        vthis.noMoreGames(); // Check for no more games
                        this.appComponent.loadingGames = false; // Reset loading state
                        if (
                            this.appComponent.session.logueado &&
                            this.appComponent.config.activeFavoritesWithBackend !== undefined &&
                            this.appComponent.config.activeFavoritesWithBackend == true
                        ) {
                            this.emitter.emit('gamesFavorites'); // Emit event for favorite games
                        }
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-top'),
                            function (el, i) {
                                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display =
                                    'none'; // Hide top preload games
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
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing jackpot script
                            }
                            var script = document.createElement('script');
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Load jackpot script
                            const vthis = this;
                            script.onload = function () {
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country];
                                        objParams.game = game.front_game_id;
                                        var ticker = new Ticker(objParams); // Create a new ticker for jackpot
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game
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
                    this.appComponent.loadingGames = false; // Reset loading state
                });
            if (vthis.appComponent.total_count < vthis.limitConfig) {
                vthis.appComponent.showMore = false; // Hide "show more" button if total count is less than limit
            } else {
                vthis.appComponent.showMore = true; // Show "show more" button
            }
        },
        selectCategoryFav() {
            // Select favorite category and fetch corresponding games
            this.appComponent.loadingGames = true; // Set loading state
            if (
                this.appComponent.config.activeFavoritesWithBackend == undefined ||
                this.appComponent.config.activeFavoritesWithBackend == false
            ) {
                this.appComponent.gamesList = []; // Clear games list
                this.appComponent.gamesList = this.appComponent.myCasinoGames; // Load favorite games
                this.appComponent.total_count = this.appComponent.gamesList.length; // Update total count
                this.appComponent.selections.category.id = 1811; // Set selected category ID for favorites
            } else if (
                this.appComponent.config.activeFavoritesWithBackend != undefined &&
                this.appComponent.config.activeFavoritesWithBackend == true
            ) {
                let params = {
                    action: 'getGames2',
                    partner_id: this.partnerG,
                    typelobby: this.typelobby,
                    offset: 0,
                    limit: this.limitConfig,
                    country: this.appComponent.country,
                    favorite: this.appComponent.myListFavoriteGame.join(','), // Join favorite games into a string
                };
                if (this.appComponent.mobile == '1') {
                    params.is_mobile = true; // Set mobile flag
                }
                apiService.requestGet(this.urlVirtualplay, params).then((response: any) => {
                    if (response.status == 200 || response.status == 'ok') {
                        this.appComponent.gamesList = response.data.games; // Update games list with favorites
                        this.appComponent.total_count = response.data.total_count; // Update total count
                        this.appComponent.loadingGames = false; // Reset loading state
                        if (this.appComponent.session.logueado) {
                            this.emitter.emit('gamesFavorites'); // Emit event for favorite games
                        }
                    }
                });
            }
        },
        getFavMenu() {
            // Fetch favorite menu status for the user
            let params = {
                user_id: this.appComponent.session.usuario, // User ID
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country information
            };
            apiService.request('exist_user_favorite_games', params).then((response) => {
                if (response.code == 0) {
                    this.favMenu = response.data.ExistFavorites; // Update favorite menu visibility
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Show notification modal
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Modal message
                        buttonModal: this.$t('Aceptar'), // Modal button text
                        orderModal: 'closeModal', // Modal close order
                    };
                }
            });
        },
        getCategories() {
            // Fetch categories for games
            var options = {
                action: 'getOptions',
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country information
                typelobby: this.typelobby, // Type of lobby
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Check if user is a test user
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options), // API request to fetch categories
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
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
            if (
                this.appComponent.session.logueado &&
                this.appComponent.config.activeFavoritesWithBackend !== undefined &&
                this.appComponent.config.activeFavoritesWithBackend == true
            ) {
                this.getFavMenu(); // Fetch favorite menu if applicable
            }
        },
        // Method to mount SVG content into a shadow DOM
        shadowSVG(element, svgString) {
            // Check if the element exists
            if (!element) return

            // Check if the element is already a shadow DOM host
            if (!element.shadowRoot) {
              const shadow = element.attachShadow({ mode: 'open' })
              shadow.innerHTML = svgString
            } else {
              element.shadowRoot.innerHTML = svgString
            }
}
    },
});
</script>
<template>
    <section
        v-if="config.layout != undefined && config.layout != 4 && config.layout != 5"
        class="w-full h-full flex justify-center items-center px-5 lg:px-14 py-0"
        :class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': ''"
 
    >
        <!-- Main section for displaying categories and search functionality -->
        <nav
            class="in max-w-[1300px] bg-base-300 lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-start items-center rounded-xl gap-2 z-30"
        >
            <!-- Button for favorites category -->
            <button
                v-if="
                    (appComponent.myListFavoriteGame.length > 0) ||
                    (typelobby != undefined && typelobby != '' && typelobby != 3 && favMenu) ||
                    (appComponent.config.activeFavoritesWithBackend == undefined && true && appComponent.favCasino) ||
                    (appComponent.config.activeFavoritesWithBackend == false && true && appComponent.favCasino)
                "
                @click="selectCategoryFav()"
                class="categorys ml-2 lg:hover:bg-secondary hover:text-neutral grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id == 1811
                        ? 'bg-primary blob font-bold categorysSelected'
                        : 'lg:bg-base-300'
                "
            >
                <div class="lg:h-14 w-10 lg:w-14 mx-auto flex items-center justify-center">
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
                            class="stroke-primary"
                        >
                            <path
                                d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                                id="Shape"
                                stroke-width="4"
                            ></path>
                        </g>
                    </svg> <!-- Placeholder for SVG icon -->
                </div>
                <span
                    class="text-xs lg:text-sm font-bold uppercase"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id == 1811
                            ? 'text-base-100'
                            : 'text-neutral'
                    "
                    >{{ $t('Favoritos') }}</span
                >
            </button>
            <!-- Button for bingo category -->
            <button
                v-if="
                    typelobby != undefined &&
                    typelobby != '' &&
                    typelobby == 3 &&
                    appComponent.config.bingos != undefined &&
                    appComponent.config.bingos[appComponent.country] != undefined &&
                    appComponent.config.bingos[appComponent.country].lobby != undefined &&
                    appComponent.config.bingos[appComponent.country].lobby
                "
                @click="selectBingo()"
                class="categorys ml-2 lg:hover:bg-secondary hover:text-neutral grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id != undefined &&
                    appComponent.selections.category.id == 'lobby'
                        ? 'bg-primary blob font-bold categorysSelected'
                        : 'lg:bg-base-300'
                "
            >
                <div class="lg:h-14 w-10 lg:w-14 mx-auto flex items-center justify-center">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        style="enable-background: new 0 0 50 50"
                        xml:space="preserve"
                    >
                        <g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M28.6,24.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1,0-0.2-0.1-0.3-0.1
                c-1.2-0.6-2.6-0.9-4.1-0.9c-0.8,0-1.5,0.1-2.2,0.3c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1
                c-3.5,1.3-6.1,4.6-6.1,8.5c0,1,0.2,1.9,0.4,2.7c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.3
                c1.4,3.2,4.7,5.4,8.5,5.4c4,0,7.4-2.5,8.7-6c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0.1-0.2,0.1-0.3
                c0.2-0.7,0.3-1.4,0.3-2.1C32.9,28.5,31.2,25.7,28.6,24.1z M26.1,34.2c-0.3,0.4-0.7,0.8-1.2,1c-0.5,0.3-1.1,0.4-1.7,0.4
                s-1.2-0.1-1.7-0.4c-0.5-0.3-0.9-0.6-1.2-1c-0.3-0.4-0.4-0.9-0.4-1.5c0-0.5,0.1-0.9,0.3-1.3c0.2-0.3,0.4-0.6,0.7-0.9s0.6-0.4,1-0.5
                c-0.3-0.1-0.5-0.3-0.7-0.5c-0.2-0.2-0.4-0.4-0.6-0.7c-0.1-0.3-0.2-0.6-0.2-1.1c0-0.5,0.1-0.9,0.4-1.3s0.6-0.7,1.1-0.9
                c0.4-0.2,0.9-0.3,1.5-0.3s1,0.1,1.5,0.3c0.4,0.2,0.8,0.5,1,0.9c0.3,0.4,0.4,0.8,0.4,1.3c0,0.6-0.1,1.1-0.4,1.4
                c-0.3,0.3-0.6,0.6-1,0.8c0.3,0.1,0.7,0.3,1,0.5c0.3,0.2,0.5,0.5,0.7,0.9c0.2,0.3,0.3,0.8,0.3,1.3C26.5,33.3,26.4,33.8,26.1,34.2z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M33.2,34.1c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.2-0.1,0.3c-1.4,3.7-5,6.4-9.3,6.4
                c-4.1,0-7.6-2.4-9.1-5.9c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3c-0.3-0.9-0.4-1.8-0.4-2.8
                c0-4.1,2.7-7.6,6.4-9c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.8-0.2,1.7-0.3,2.6-0.3
                c1.6,0,3,0.4,4.4,1c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.1,0.3,0.2c2.8,1.7,4.7,4.7,4.7,8.2
                C33.5,32.5,33.4,33.3,33.2,34.1z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M22.3,29.4c0.3,0.1,0.5,0.2,0.8,0.2c0.3,0,0.6-0.1,0.8-0.2c0.3-0.1,0.5-0.3,0.6-0.6c0.1-0.2,0.2-0.5,0.2-0.8
                c0-0.3-0.1-0.6-0.2-0.8c-0.2-0.2-0.4-0.4-0.6-0.6c-0.3-0.1-0.5-0.2-0.8-0.2c-0.3,0-0.6,0.1-0.8,0.2c-0.3,0.1-0.5,0.3-0.6,0.6
                c-0.2,0.2-0.2,0.5-0.2,0.8c0,0.3,0.1,0.6,0.2,0.8C21.9,29.1,22.1,29.3,22.3,29.4z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M10.4,29.9c-0.4,0.3-0.7,0.5-0.9,0.7C9.2,30.9,9.1,31,9,31.1h1.5c0.1-0.5,0.2-1,0.3-1.5
                C10.7,29.7,10.5,29.8,10.4,29.9z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M36.5,29c0.3,0.2,0.7,0.3,1.2,0.3c0.4,0,0.8-0.1,1.2-0.3c0.3-0.2,0.6-0.5,0.8-0.8c0.2-0.3,0.3-0.7,0.3-1.1
                c0-0.4-0.1-0.8-0.3-1.1c-0.2-0.3-0.5-0.6-0.8-0.8c-0.3-0.2-0.7-0.3-1.2-0.3c-0.4,0-0.8,0.1-1.2,0.3c-0.3,0.2-0.6,0.5-0.8,0.8
                c-0.2,0.3-0.3,0.6-0.3,1c0.3,0.6,0.6,1.3,0.9,1.9C36.3,28.9,36.4,29,36.5,29z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo"
                                    d="M24.1,30.9c-0.3-0.2-0.6-0.2-1-0.2s-0.7,0.1-1,0.3c-0.3,0.2-0.5,0.4-0.7,0.7c-0.2,0.3-0.3,0.6-0.3,1
                c0,0.4,0.1,0.7,0.3,1c0.2,0.3,0.4,0.5,0.7,0.7c0.3,0.2,0.6,0.2,1,0.2s0.7-0.1,1-0.2c0.3-0.2,0.5-0.4,0.7-0.7
                c0.2-0.3,0.3-0.6,0.3-1c0-0.4-0.1-0.7-0.3-1C24.7,31.3,24.4,31.1,24.1,30.9z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M49.9,26.1C49.3,20.9,45,16.7,39.7,16c-3.4-0.4-6.6,0.6-9,2.4c-0.2,0.1-0.2,0.4,0,0.6c0,0,0,0,0,0
                c0.1,0.2,0.4,0.2,0.5,0.1c2.3-1.8,5.3-2.7,8.5-2.2c4.9,0.7,8.7,4.5,9.3,9.3c0.8,6.2-4,11.6-10.1,12c-0.2,0-0.4,0.2-0.4,0.4
                c0,0,0,0,0,0c0,0.2,0.2,0.4,0.4,0.4C45.6,38.6,50.8,32.8,49.9,26.1z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M8.7,37.8c-5-1.5-8.5-6.3-7.8-11.8c0.7-5,4.8-8.8,9.9-9.3c2.8-0.2,5.4,0.5,7.5,2c0.2,0.2,0.6,0.1,0.7-0.2
                c0,0,0,0,0,0c0.1-0.2,0-0.3-0.2-0.4c-2.1-1.5-4.8-2.4-7.7-2.2C5.3,16.3,0.5,20.8,0,26.5c-0.5,5.7,3.2,10.6,8.4,12.1
                c0.2,0.1,0.4,0,0.5-0.2c0,0,0,0,0,0C9.1,38.2,9,37.9,8.7,37.8z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M9,35.2c-3.7-1.1-6.3-4.6-5.7-8.6c0.5-3.7,3.5-6.5,7.3-6.8c2.1-0.2,4,0.4,5.5,1.5c0.2,0.1,0.4,0,0.5-0.2
                c0,0,0,0,0,0c0-0.1,0-0.3-0.1-0.3c-1.6-1.1-3.5-1.7-5.7-1.6c-4.3,0.3-7.8,3.6-8.1,7.7c-0.4,4.2,2.4,7.8,6.2,8.9
                c0.1,0,0.3,0,0.3-0.1c0,0,0,0,0,0C9.3,35.5,9.2,35.3,9,35.2z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M46.3,25c-0.5-3.7-3.5-6.7-7.3-7.2c-2.4-0.3-4.7,0.4-6.4,1.7c-0.1,0.1-0.1,0.3,0,0.4c0,0,0,0,0,0
                c0.1,0.1,0.3,0.1,0.4,0c1.6-1.3,3.8-1.9,6.1-1.6c3.5,0.5,6.2,3.2,6.6,6.7c0.5,4.5-2.9,8.3-7.2,8.6c-0.2,0-0.3,0.2-0.3,0.3
                c0,0,0,0,0,0c0,0.2,0.1,0.3,0.3,0.3C43.2,34,46.9,29.8,46.3,25z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M28.8,23.5c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1,0-0.2-0.1-0.3-0.1c-1.3-0.6-2.8-1-4.4-1
                c-0.9,0-1.7,0.1-2.6,0.3c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-3.7,1.4-6.4,4.9-6.4,9
                c0,1,0.2,1.9,0.4,2.8c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.3c1.5,3.5,5,5.9,9.1,5.9
                c4.3,0,7.9-2.7,9.3-6.4c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0.1-0.2,0.1-0.3c0.2-0.8,0.3-1.6,0.3-2.4
                C33.5,28.3,31.6,25.2,28.8,23.5z M32.6,33.9c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.2-0.1,0.3
                c-1.3,3.5-4.7,6-8.7,6c-3.8,0-7-2.2-8.5-5.4c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3
                c-0.3-0.9-0.4-1.8-0.4-2.7c0-3.9,2.5-7.2,6.1-8.5c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2-0.1,0.3-0.1
                c0.7-0.2,1.5-0.3,2.2-0.3c1.5,0,2.9,0.3,4.1,0.9c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.1,0.3,0.2
                c2.6,1.6,4.3,4.4,4.3,7.6C32.9,32.5,32.8,33.2,32.6,33.9z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M25.6,30.6c-0.3-0.2-0.6-0.4-1-0.5c0.4-0.2,0.7-0.4,1-0.8c0.3-0.3,0.4-0.8,0.4-1.4c0-0.5-0.1-0.9-0.4-1.3
                c-0.3-0.4-0.6-0.7-1-0.9c-0.4-0.2-0.9-0.3-1.5-0.3s-1,0.1-1.5,0.3c-0.4,0.2-0.8,0.5-1.1,0.9s-0.4,0.8-0.4,1.3
                c0,0.4,0.1,0.8,0.2,1.1c0.1,0.3,0.3,0.5,0.6,0.7c0.2,0.2,0.5,0.3,0.7,0.5c-0.3,0.1-0.7,0.3-1,0.5s-0.5,0.5-0.7,0.9
                c-0.2,0.3-0.3,0.8-0.3,1.3c0,0.5,0.1,1,0.4,1.5c0.3,0.4,0.7,0.8,1.2,1c0.5,0.3,1.1,0.4,1.7,0.4s1.2-0.1,1.7-0.4
                c0.5-0.3,0.9-0.6,1.2-1c0.3-0.4,0.4-0.9,0.4-1.5c0-0.5-0.1-0.9-0.3-1.3C26.1,31.1,25.8,30.8,25.6,30.6z M21.7,28.8
                c-0.2-0.2-0.2-0.5-0.2-0.8c0-0.3,0.1-0.6,0.2-0.8c0.2-0.2,0.4-0.4,0.6-0.6c0.3-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.8,0.2
                c0.3,0.1,0.5,0.3,0.6,0.6c0.2,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.6-0.2,0.8c-0.1,0.2-0.4,0.4-0.6,0.6c-0.3,0.1-0.5,0.2-0.8,0.2
                c-0.3,0-0.6-0.1-0.8-0.2C22.1,29.3,21.9,29.1,21.7,28.8z M24.9,33.5c-0.2,0.3-0.4,0.5-0.7,0.7c-0.3,0.2-0.6,0.2-1,0.2
                s-0.7-0.1-1-0.2c-0.3-0.2-0.5-0.4-0.7-0.7c-0.2-0.3-0.3-0.6-0.3-1c0-0.4,0.1-0.7,0.3-1c0.2-0.3,0.4-0.5,0.7-0.7
                c0.3-0.2,0.6-0.3,1-0.3s0.7,0.1,1,0.2c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.6,0.3,1C25.1,32.9,25,33.2,24.9,33.5z"
                                ></path>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M10.6,3.7h2.5c0.5,0,0.9,0.1,1.4,0.2c0.4,0.1,0.8,0.3,1,0.6c0.3,0.3,0.4,0.7,0.4,1.3c0,0.4-0.1,0.7-0.2,1
                c-0.1,0.3-0.3,0.5-0.5,0.7c-0.2,0.2-0.4,0.3-0.6,0.3c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.6,0.4C15.8,8.6,16,8.8,16.1,9
                c0.1,0.3,0.2,0.6,0.2,0.9c0,0.5-0.1,0.9-0.3,1.3c-0.2,0.4-0.5,0.7-0.9,0.9c-0.4,0.2-0.9,0.3-1.5,0.3h-3V3.7z M11.8,7.5h1.5
                c0.3,0,0.6-0.1,0.8-0.2c0.2-0.1,0.4-0.3,0.5-0.6c0.1-0.2,0.2-0.5,0.2-0.7c0-0.5-0.2-0.8-0.5-1c-0.3-0.2-0.7-0.3-1.2-0.3h-1.3V7.5z
                 M11.8,11.4h1.7c0.4,0,0.8-0.1,1-0.2c0.2-0.1,0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8c0-0.4-0.1-0.8-0.4-1.1
                c-0.3-0.3-0.7-0.4-1.3-0.4h-1.6V11.4z"
                                ></path>
                                <path
                                    class="stBingo1"
                                    d="M18.5,5.1c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5c0-0.2,0.1-0.4,0.2-0.5c0.2-0.1,0.3-0.2,0.5-0.2
                c0.1,0,0.3,0,0.4,0.1C19,3.8,19.1,3.9,19.1,4c0.1,0.1,0.1,0.2,0.1,0.4c0,0.2-0.1,0.4-0.2,0.5S18.7,5.1,18.5,5.1z M17.9,12.3V7H19
                v5.4H17.9z"
                                ></path>
                                <path
                                    class="stBingo1"
                                    d="M23.9,6.8c0.4,0,0.7,0.1,1.1,0.2c0.3,0.1,0.6,0.4,0.8,0.7C26,8.1,26.1,8.5,26.1,9v3.3h-1.2V9.2
                c0-0.5-0.1-0.9-0.4-1.2c-0.3-0.2-0.6-0.4-1-0.4c-0.3,0-0.5,0.1-0.8,0.2s-0.4,0.3-0.6,0.6C22,8.8,22,9.1,22,9.4v3h-1.2V7H22v1
                c0-0.1,0.1-0.3,0.3-0.5C22.5,7.3,22.7,7.1,23,7C23.3,6.9,23.6,6.8,23.9,6.8z"
                                ></path>
                                <path
                                    class="stBingo1"
                                    d="M32.1,12.3v-1c0,0.1-0.1,0.3-0.3,0.5c-0.2,0.2-0.4,0.4-0.7,0.5c-0.3,0.2-0.6,0.2-1,0.2c-0.5,0-1-0.1-1.4-0.4
                c-0.4-0.2-0.7-0.6-1-1c-0.2-0.4-0.4-0.9-0.4-1.5c0-0.6,0.1-1.1,0.4-1.5c0.2-0.4,0.6-0.8,1-1C29,6.9,29.5,6.8,30,6.8
                c0.4,0,0.7,0.1,1,0.2c0.3,0.1,0.5,0.3,0.7,0.5C31.9,7.7,32,7.9,32.1,8V7h1.2v5.4H32.1z M30.3,15.2c-0.4,0-0.8,0-1.2-0.1
                c-0.4-0.1-0.7-0.2-0.9-0.4s-0.5-0.3-0.6-0.6l0.8-0.7c0.1,0.1,0.2,0.2,0.3,0.4s0.3,0.2,0.6,0.3c0.3,0.1,0.6,0.1,1,0.1
                c0.4,0,0.7-0.1,1-0.2s0.5-0.4,0.6-0.7c0.1-0.3,0.2-0.6,0.2-0.9v-0.2h1.1v0.2c0,0.6-0.1,1.1-0.4,1.5c-0.3,0.4-0.6,0.7-1.1,0.9
                C31.3,15.1,30.8,15.2,30.3,15.2z M28.4,9.7c0,0.4,0.1,0.7,0.3,1c0.2,0.3,0.4,0.5,0.7,0.7c0.3,0.2,0.6,0.2,0.9,0.2
                c0.3,0,0.6-0.1,0.9-0.2c0.3-0.2,0.5-0.4,0.6-0.7C32,10.4,32,10,32,9.7c0-0.4-0.1-0.7-0.2-1c-0.2-0.3-0.4-0.5-0.6-0.7
                c-0.3-0.2-0.6-0.2-0.9-0.2c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.2-0.5,0.4-0.7,0.7C28.5,8.9,28.4,9.3,28.4,9.7z"
                                ></path>
                                <path
                                    class="stBingo1"
                                    d="M37.4,12.5c-0.6,0-1.1-0.1-1.5-0.4c-0.4-0.2-0.8-0.6-1-1c-0.3-0.4-0.4-0.9-0.4-1.4c0-0.5,0.1-1,0.4-1.5
                c0.3-0.4,0.6-0.8,1-1s0.9-0.4,1.5-0.4c0.6,0,1.1,0.1,1.5,0.4c0.4,0.3,0.8,0.6,1,1c0.2,0.4,0.4,0.9,0.4,1.5c0,0.5-0.1,1-0.4,1.4
                c-0.2,0.4-0.6,0.8-1,1C38.4,12.4,37.9,12.5,37.4,12.5z M37.4,11.5c0.4,0,0.7-0.1,0.9-0.2c0.3-0.2,0.5-0.4,0.6-0.7
                c0.1-0.3,0.2-0.6,0.2-1c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.4-0.5-0.6-0.7c-0.3-0.2-0.6-0.2-0.9-0.2c-0.4,0-0.7,0.1-0.9,0.2
                c-0.3,0.2-0.5,0.4-0.6,0.7c-0.2,0.3-0.2,0.6-0.2,1c0,0.4,0.1,0.7,0.2,1c0.1,0.3,0.4,0.5,0.6,0.7C36.7,11.5,37,11.5,37.4,11.5z"
                                ></path>
                            </g>
                            <g>
                                <circle
                                    class="stBingo1"
                                    cx="10"
                                    cy="38.6"
                                    r="0.4"
                                ></circle>
                            </g>
                            <g>
                                <circle
                                    class="stBingo1"
                                    cx="19.5"
                                    cy="19.6"
                                    r="0.4"
                                ></circle>
                            </g>
                            <g>
                                <circle
                                    class="stBingo1"
                                    cx="31.7"
                                    cy="20.7"
                                    r="0.4"
                                ></circle>
                            </g>
                            <g>
                                <circle
                                    class="stBingo1"
                                    cx="37.4"
                                    cy="38.6"
                                    r="0.4"
                                ></circle>
                            </g>
                            <g>
                                <path
                                    class="stBingo1"
                                    d="M40.8,25.4c-0.3-0.5-0.7-0.9-1.2-1.2c-0.5-0.3-1-0.4-1.6-0.4c-0.4,0-0.7,0.1-1,0.2s-0.5,0.2-0.6,0.3l3.4-4
                h-1.6l-2.8,3.4c-0.4,0.4-0.7,0.9-0.9,1.4c0,0.1-0.1,0.2-0.1,0.3c-1-1.3-2.3-2.4-3.7-3.3c-0.1-0.1-0.2-0.1-0.4-0.2
                c-0.1-0.1-0.2-0.1-0.4-0.2c-0.1-0.1-0.3-0.1-0.4-0.2c-1.8-0.9-3.8-1.3-5.9-1.3c-1.2,0-2.3,0.2-3.5,0.4c-0.1,0-0.3,0.1-0.4,0.1
                c-0.1,0-0.3,0.1-0.4,0.1c-0.1,0-0.3,0.1-0.4,0.1c-2,0.8-3.8,2-5.3,3.6c0-0.2-0.1-0.4-0.1-0.6c-0.1-0.4-0.3-0.7-0.6-1
                c-0.3-0.3-0.6-0.5-1-0.6c-0.4-0.2-0.9-0.2-1.4-0.2c-0.5,0-1,0.1-1.4,0.2c-0.4,0.1-0.8,0.3-1,0.6c-0.3,0.2-0.5,0.5-0.7,0.7
                c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.2-0.1,0.3-0.1,0.3L7.9,25c0,0,0.1-0.1,0.2-0.3c0.1-0.2,0.3-0.4,0.5-0.6c0.2-0.2,0.5-0.4,0.8-0.6
                c0.3-0.2,0.7-0.3,1.1-0.3c0.6,0,1.1,0.1,1.4,0.4c0.3,0.3,0.5,0.8,0.5,1.5c0,0.3-0.1,0.7-0.3,1.1c-0.2,0.4-0.5,0.8-0.9,1.2
                c-0.4,0.4-0.7,0.8-1.2,1.2c-0.4,0.4-0.8,0.8-1.2,1.1c-0.4,0.3-0.8,0.6-1.1,0.9c-0.3,0.2-0.6,0.4-0.7,0.6v1.1h3.4
                c0,0.3,0,0.6,0,0.9c0,1.3,0.2,2.6,0.6,3.8c0,0.1,0.1,0.3,0.1,0.4c0,0.1,0.1,0.3,0.2,0.4c0.1,0.1,0.1,0.3,0.2,0.4
                c1.4,3.3,4.2,5.9,7.6,7.1l0,0l0.3,0.1c0,0,0,0,0,0c0,0,0,0,0,0l0.4,0.2c0.2,0.1,0.5,0,0.5-0.3h0c0.1-0.2,0-0.5-0.3-0.5l-0.7-0.2
                c-3.2-1.1-5.8-3.5-7.2-6.5c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.1-0.3-0.2-0.4c0-0.1-0.1-0.3-0.1-0.4c-0.4-1.2-0.6-2.4-0.6-3.7
                c0-0.3,0-0.6,0-0.9c0-0.4,0.1-0.8,0.1-1.2c0.2-1.1,0.5-2.1,1-3c0.3-0.7,0.8-1.4,1.2-2.1c1.4-1.9,3.5-3.4,5.8-4.3
                c0.1,0,0.3-0.1,0.4-0.1c0.1,0,0.3-0.1,0.4-0.1c0.1,0,0.3-0.1,0.4-0.1c1-0.2,2-0.4,3-0.4c2,0,3.9,0.5,5.5,1.3
                c0.1,0.1,0.3,0.1,0.4,0.2c0.1,0.1,0.3,0.1,0.4,0.2c0.1,0.1,0.3,0.1,0.4,0.2c1.5,0.9,2.8,2.2,3.8,3.7c0.7,1,1.2,2.2,1.6,3.4
                c0.3,1,0.4,2.1,0.4,3.2c0,1-0.1,2-0.4,2.9c0,0.1-0.1,0.3-0.1,0.4c0,0.1-0.1,0.3-0.1,0.4c0,0.1-0.1,0.3-0.1,0.4
                c-1.5,4-5.1,7-9.5,7.8l-1.2,0.2c-0.2,0-0.4,0.3-0.4,0.5c0,0.2,0.3,0.4,0.5,0.4l1.4-0.2l0,0c4.6-0.9,8.4-4.1,10-8.3
                c0-0.1,0.1-0.3,0.1-0.4c0-0.1,0.1-0.3,0.1-0.4c0-0.1,0.1-0.3,0.1-0.4c0.3-1,0.4-2.1,0.4-3.2c0-1-0.1-1.9-0.3-2.8
                c0.3,0.1,0.6,0.1,1,0.1c0.7,0,1.3-0.1,1.8-0.4c0.5-0.3,1-0.7,1.3-1.2c0.3-0.5,0.5-1.1,0.5-1.7C41.2,26.4,41.1,25.9,40.8,25.4z
                 M10.4,31.1H9c0.1-0.1,0.2-0.2,0.5-0.4c0.3-0.2,0.6-0.4,0.9-0.7c0.1-0.1,0.3-0.2,0.4-0.3C10.6,30.1,10.5,30.6,10.4,31.1z
                 M39.6,28.2c-0.2,0.3-0.5,0.6-0.8,0.8c-0.3,0.2-0.7,0.3-1.2,0.3c-0.4,0-0.8-0.1-1.2-0.3c-0.1-0.1-0.2-0.1-0.3-0.2
                c-0.2-0.7-0.5-1.3-0.9-1.9c0-0.4,0.1-0.7,0.3-1c0.2-0.3,0.5-0.6,0.8-0.8c0.3-0.2,0.7-0.3,1.2-0.3c0.4,0,0.8,0.1,1.2,0.3
                c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.3,0.3,0.7,0.3,1.1C40,27.5,39.8,27.9,39.6,28.2z"
                                ></path>
                            </g>
                            <g>
                                <circle
                                    class="stBingo1"
                                    cx="22.4"
                                    cy="45.6"
                                    r="0.8"
                                ></circle>
                            </g>
                        </g>
                    </svg> <!-- Placeholder for SVG icon -->
                </div>
                <span
                    class="text-xs lg:text-sm font-bold uppercase"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id == 1811
                            ? 'text-base-100'
                            : 'text-neutral'
                    "
                    >{{ $t('Bingos en vivo') }}</span
                >
            </button>
            <!-- Dynamic buttons for each category -->
            <button
                v-for="category in categories"
                @click="
                    selectCategory(category);
                    appComponent.gAnalytics('category_live', category.title);
                "
                class="categorys hover:text-neutral grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
                :class="{
                    'bg-secondary blob font-bold categorysSelected text-base-100': appComponent.selections?.category?.id === category.id,
                    'lg:bg-base-300': appComponent.selections?.category?.id !== category.id,
                    'border-3 border-accent hover:border-neutral hover:bg-base-100 hover:text-neutral': styleVersion != undefined && styleVersion != 1,
                    'lg:hover:bg-secondary': styleVersion == 1
                    }
                    "
            >
                <!-- Render category icon -->
                <div
                    class="h-10 lg:h-14 w-10 lg:w-14 mx-auto flex items-center justify-center"
                    :ref="element => shadowSVG(element, category.icon)">
                </div>
                <span
                    class="text-xs lg:text-sm font-bold uppercase"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id === category.id
                            ? 'text-white'
                            : 'text-info-text'
                    "
                    >{{ $t(category.title) }}</span
                >
            </button>
        </nav>
    </section>
    <section
        v-else-if="config.layout != undefined && config.layout == 4"
        class="w-full h-full flex justify-center items-center py-0 relative"
    >
        <!-- Section for layout 4 -->
        <nav
            class="in w-full lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-between items-center rounded-xl gap-2 z-30"
        >
            <template v-for="category in categories">
                <button
                    v-if="category.title == 'Nuevos'"
                    @click="
                        selectCategory(category);
                        appComponent.gAnalytics('category_live', category.title);
                    "
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id === category.id
                            ? 'bg-neutral '
                            : 'bg-gray-300 contrast-75'
                    "
                    class="transition-all ease-in-out duration-500 text-secondary font-poppinssb relative group h-[33px] md:w-[120px] md:h-[55px] mr-10 md:mr-20 uppercase lg:px-0 px-3"
                >
                    Nuevos <!-- Button for new games category -->
                    <span
                        :class="
                            appComponent.selections !== undefined &&
                            appComponent.selections.category !== undefined &&
                            appComponent.selections.category.id === category.id
                                ? ' bg-neutral shadow-neutral'
                                : 'bg-gray-300 shadow-gray-300'
                        "
                        class="scale-[0.6] md:scale-100 w-[33px] h-[11px] transition-all ease-in-out duration-500 right-[-21px] md:right-[-25px] top-[-2.1px] md:top-0 absolute rounded-full shadow-[0px_44px_0px_,_0px_14px_0px_,_20px_14px_0px_,_0px_29px_0px_,_24px_44px_0px_,_39px_29px_0px_,_37px_0px_0px]"
                    ></span>
                </button>
            </template>
            <!-- Button for favorites category in layout 4 -->
            <button
                v-if="favMenu"
                @click="selectCategoryFav()"
                class="categorys grid justify-center items-center h-full w-auto gap-1 px-2 py-1 border-solid border-2"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id == 1811
                        ? 'border-neutral rounded-xl bg-secondary/25 blob font-bold categorysSelected'
                        : 'border-transparent'
                "
            >
                <svg
                    class="h-10 w-10 lg:w-10 lg:h-10 mx-auto"
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
                        class="stroke-primary"
                    >
                        <path
                            d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                            id="Shape"
                            stroke-width="4"
                        ></path>
                    </g>
                </svg> <!-- Placeholder for SVG icon -->
                <span
                    class="text-xs lg:text-sm font-poppinssb uppercase"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id == 1811
                            ? 'text-base-100'
                            : 'text-neutral'
                    "
                    >{{ $t('Favoritos') }}</span
                >
            </button>
            <!-- Dynamic buttons for each category in layout 4 -->
            <template v-for="category in categories">
                <button
                    v-if="category.title != 'Nuevos'"
                    @click="
                        selectCategory(category);
                        appComponent.gAnalytics('category_live', category.title);
                    "
                    class="categorys grid justify-center items-center h-full w-auto gap-1 px-2 py-1 transition-all ease-in-out border-solid border-2"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id === category.id
                            ? 'border-solid border-2 border-neutral rounded-xl bg-primary/25 blob font-bold categorysSelected'
                            : 'border-transparent'
                    "
                >
                    <!-- Render category icon -->
                    <div
                        class="h-10 w-10 lg:w-10 lg:h-10 mx-auto"
                        v-html="category.icon"
                    ></div>
                    <span
                        class="text-xs lg:text-sm font-poppinssb uppercase"
                        :class="
                            appComponent.selections !== undefined &&
                            appComponent.selections.category !== undefined &&
                            appComponent.selections.category.id === category.id
                                ? 'text-base-100'
                                : 'text-neutral'
                        "
                        >{{ $t(category.title) }}</span
                    >
                </button>
            </template>
            <div class="relative">
                <!-- Magnifying glass icon -->
                <MagnifyingGlass
                    :height="20"
                    :width="20"
                    class="absolute top-3 left-3 fill-secondary"
                />
                <!-- Search input -->
                <input
                    type="text"
                    name=""
                    id="SearchGame"
                    class="w-52 h-12 pl-10 px-6 mr-3 lg:mr-8 rounded-full bg-neutral-content bg-gradient-to-b from-secondary/20 to-secondary/20 border-1 border-solid border-secondary text-neutral flex hover:ml-1"
                    :placeholder="$t('Buscar juegos')"
                    v-model="searchCommand"
                    @input="searchEnter($event)"
                />
            </div>
        </nav>
        <div
            v-if="appComponent.gamesListSearch.length > 0"
            class="slider-search absolute w-[350px] max-h-[500px] bg-base-300 top-[63px] right-4 z-50 border-3 border-solid border-secondary rounded-3xl grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
        >
            <!-- Search results slider -->
            <div
                v-for="game in appComponent.gamesListSearch"
                class="in bg-primary/50 relative rounded-xl h-36 w-full flex justify-center items-center p-2 hover:scale-105"
                href="javascript:;"
                :aria-label="game.name"
            >
            <!-- Game icon -->
                <img
                    :src="game.icon_3"
                    alt=""
                    class="h-32 rounded-xl"
                />
                <div class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all">
                    <p class="text-neutral text-lg text-center font-bold flex justify-center items-center">
                        {{ game.name }} <!-- Game name -->
                    </p>
                    <!-- Play button -->
                    <button
                        class="bg-primary text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                        aria-label="Play"
                        @click="
                            onOpenGame(game, $event);
                            onSearch = false;
                            appComponent.gamesListSearch = [];
                            searchCommand = '';
                        "
                    >
                        {{ $t('Jugar ahora') }} <!-- Button text -->
                    </button>
                </div>
            </div>
            <button
                class="bottom-0 h-10 rounded-xl bg-primary hover:scale-105 flex justify-center items-center"
                @click="
                    onSearch = !onSearch;
                    appComponent.gamesListSearch = [];
                    searchCommand = '';
                "
            >
                <!-- Close icon -->
                <font-awesome-icon
                    icon="fa-solid fa-xmark"
                    class="text-neutral text-2xl font-bold"
                />
            </button>
        </div>
    </section>
    <section
        v-else-if="config.layout != undefined && config.layout == 5"
        class="flex justify-center items-center w-full"
    >
        <!-- Section for layout 5 -->
        <nav
            class="in lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-between items-center rounded-xl gap-1 z-30 max-w-[1300px] w-11/12"
        >
            <!-- Button for favorites category in layout 5 -->
            <button
                v-if="favMenu"
                @click="selectCategoryFav()"
                class="categorys ml-2 relative lg:hover:bg-secondary hover:text-neutral grid justify-center items-center h-full min-h-[90px] lg:h-28 min-w-[80px] w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 border-solid border-2 border-secondary"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id == 1811
                        ? 'bg-primary border-transparent blob font-bold categorysSelected'
                        : 'bg-base-300 border-secondary'
                "
            >
                <div class="w-10 h-10 mx-auto flex items-center justify-center">
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
                            class="stroke-primary"
                        >
                            <path
                                d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                                id="Shape"
                                stroke-width="4"
                            ></path>
                        </g>
                    </svg> <!-- Placeholder for SVG icon -->
                </div>
                <span
                    class="text-xs lg:text-sm font-poppinssl capitalize"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id == 1811
                            ? 'text-base-100'
                            : 'text-neutral'
                    "
                    >{{ $t('Favoritos') }}</span
                >
                <!-- Background image for button -->
                <img
                    src="https://images.virtualsoft.tech/m/msj17212T1712007346.png"
                    alt="background-button"
                    class="w-full h-full object-fill absolute top-0 left-0 rounded-xl"
                />
            </button>
            <!-- Dynamic buttons for each category in layout 5 -->
            <button
                v-for="category in categories"
                @click="
                    selectCategory(category);
                    appComponent.gAnalytics('category_live', category.title);
                "
                class="categorys relative ml-2 lg:hover:bg-secondary hover:text-neutral grid justify-center items-center h-full min-h-[90px] lg:h-28 min-w-[100px] w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 border-solid border-2 border-secondary"
                :class="
                    appComponent.selections !== undefined &&
                    appComponent.selections.category !== undefined &&
                    appComponent.selections.category.id === category.id
                        ? 'bg-primary border-transparent blob categorysSelected'
                        : 'bg-base-300 border-secondary'
                "
            >
                <!-- Render category icon -->
                <div
                    class="h-12 w-12 mx-auto svg-category"
                    v-html="category.icon"
                ></div>
                <span
                    class="text-xs lg:text-sm font-poppinssl capitalize px-2"
                    :class="
                        appComponent.selections !== undefined &&
                        appComponent.selections.category !== undefined &&
                        appComponent.selections.category.id === category.id
                            ? 'text-base-100'
                            : 'text-neutral'
                    "
                    >{{ $t(category.title) }}</span
                >
                <!-- Background image for button -->
                <img
                    src="https://images.virtualsoft.tech/m/msj17212T1712007346.png"
                    alt="background-button"
                    class="w-full h-full object-fill absolute top-0 left-0 rounded-xl"
                />
            </button>
        </nav>
    </section>
</template>
<style>
.categorys:hover div svg *,
.categorysSelected div svg * {
    fill: white; /* Change SVG fill color on hover and when selected */
}

::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}
.svg-category svg {
    width: 100%; /* Set SVG width to 100% */
    height: 100%; /* Set SVG height to 100% */
}
</style>

<!-- FILE DOCUMENTED -->

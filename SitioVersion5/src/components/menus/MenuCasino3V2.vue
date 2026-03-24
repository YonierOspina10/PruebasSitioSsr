<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import MagnifyingGlass from '../icons/MagnifyingGlass.vue';
import anime from 'animejs';
import { useGlobalStore } from '@/stores/global';
import { useRoute } from 'vue-router';
declare var Ticker: any; // Declare Ticker variable for external library usage
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
        let emitter: any = this.$emitter(); // Event emitter
        let storeCasinoLobby = useGlobalStore(); // Global store for casino lobby
        let searchCommand = ''; // Command for search input
        let categories: any = ''; // Categories for games
        let onSearch: boolean = false; // Flag to indicate if search is active
        let flag: boolean = true; // General flag variable
        let optionsGames: any = ''; // Options for games API request
        let partnerG: any = ''; // Partner identifier
        let favMenu: boolean = false; // Flag for favorite menu visibility
        let limitConfig: any = ''; // Limit configuration for games
        let urlVirtualplay: any = ''; // URL for virtual play API
        let categoriesLength: any = ''; // Length of categories array
        let country: any = ''; // Country identifier
        return {
            appComponent,
            onSearch,
            config,
            categories,
            flag,
            storeCasinoLobby,
            searchCommand,
            optionsGames,
            partnerG,
            limitConfig,
            urlVirtualplay,
            categoriesLength,
            country,
            favMenu,
            emitter,
        };
    },
    setup() {
        const route = useRoute(); // Get current route
        let gameId: any = ref(route.params.GameId); // Reactive reference for game ID
        let categoryId: any = ref(route.params.CategoryId); // Reactive reference for category ID
        let providerId: any = ref(route.params.ProviderId); // Reactive reference for provider ID
        return {
            gameId,
            categoryId,
            providerId,
        };
    },
    unmounted() {
        this.emitter.all.delete('activeFav'); // Remove activeFav event listener
        this.emitter.all.delete('deleteFav'); // Remove deleteFav event listener
    },
    created() {
        if (this.categoryId) {
            this.storeCasinoLobby.category = this.categoryId.split('-')[1]; // Set category from route parameter
        } else {
            this.storeCasinoLobby.category = 'all'; // Default to 'all' category
        }
    },
    mounted() {
        this.limitConfig = this.config.casino.limit; // Set limit configuration
        this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
        this.partnerG = this.appComponent.partnerG; // Set partner identifier
        this.country = this.appComponent.country; // Set country identifier
        this.getCategories(); // Fetch categories on mount
        this.emitter.on('activeFav', () => {
            this.getFavMenu(); // Update favorite menu on activeFav event
        });
        this.emitter.on('deleteFav', () => {
            this.getFavMenu(); // Update favorite menu on deleteFav event
        });
    },
    methods: {
        onOpenGame(game, $event) {
            if (this.appComponent.session.logueado) {
                this.appComponent.gamesListSearch.idSelect = game.id; // Select game ID
                this.appComponent.openLink = true; // Set open link flag
                this.appComponent.openGame(game); // Open the selected game
                this.appComponent.showGame = true; // Show game details
                this.onSearch = false; // Reset search flag
                $event.stopPropagation(); // Prevent event propagation
            } else {
                this.appComponent.showModalLogin = true; // Show login modal if not logged in
            }
        },
        searchEnter(event) {
            var vthis = this; // Preserve context
            if (this.searchCommand.length >= 3) {
                this.optionsGames = {
                    action: 'getGames2', // Action for API request
                    partner_id: this.appComponent.partnerG, // Partner ID
                    search: this.searchCommand, // Search command
                    country: this.appComponent.country, // Country identifier
                    typelobby: -1, // Type of lobby
                };
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true; // Set mobile flag if applicable
                } else {
                    this.optionsGames.isMobile = false; // Set mobile flag to false
                }
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames) // API request for games
                    .then((response: any) => {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesListSearch = json.games; // Update games list
                        vthis.appComponent.total_count = json.total_count; // Update total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.appComponent.limit = vthis.appComponent.limit; // Set limit
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                            ); // Check for existing jackpot script
                            if (existingScript) {
                                existingScript.remove(); // Remove existing script if found
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
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game ID
                                        ticker.SetCurrencyPos('1'); // Set currency position
                                        ticker.tick(); // Start ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Append script to document head
                        }
                    });
            } else {
                this.appComponent.gamesListSearch = []; // Clear games list if search command is too short
            }
        },
        noMoreGames() {
            var vthis = this; // Preserve context
            if (vthis.appComponent.gamesList.length <= 0) {
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide top preload elements
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide bottom preload elements
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
            if (this.$route.path.indexOf('new-casino') != -1) {
                if (category != '') {
                    window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id); // Update URL for new casino category
                } else {
                    window.history.pushState('', '', '/new-casino'); // Update URL to new casino
                }
            } else {
                if (this.$route.path.indexOf('live-casino-vivo') != -1) {
                    if (category != '') {
                        window.history.pushState(
                            '',
                            '',
                            '/live-casino-vivo/categoria/' + category.slug + '-' + category.id, // Update URL for live casino category
                        );
                    } else {
                        window.history.pushState('', '', '/live-casino-vivo'); // Update URL to live casino
                    }
                } else {
                    if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                        if (category != '') {
                            window.history.pushState(
                                '',
                                '',
                                '/virtuales-lobby/categoria/' + category.slug + '-' + category.id, // Update URL for virtual lobby category
                            );
                        } else {
                            window.history.pushState('', '', '/virtuales-lobby'); // Update URL to virtual lobby
                        }
                    } else {
                        window.history.pushState('', '', '/new-casino/categoria/' + category.slug + '-' + category.id); // Default to new casino category
                    }
                }
            }
            this.emitter.emit('get:gamesList'); // Emit event to get games list
        },
        selectCategoryFav() {
            if (
                this.appComponent.config.activeFavoritesWithBackend == undefined ||
                this.appComponent.config.activeFavoritesWithBackend == false
            ) {
                this.appComponent.gamesList = []; // Clear games list
                this.appComponent.gamesList = this.appComponent.myCasinoGames; // Set games list to favorite games
                this.appComponent.total_count = this.appComponent.gamesList.length; // Update total count
                this.appComponent.selections.category.id = 1811; // Set category ID for favorites
            } else if (
                this.appComponent.config.activeFavoritesWithBackend != undefined &&
                this.appComponent.config.activeFavoritesWithBackend == true
            ) {
                let params = {
                    user_id: this.appComponent.session.usuario, // User ID for favorites
                    offset: 0, // Offset for pagination
                    limit: this.limitConfig, // Limit for favorites
                    is_mobile: false, // Mobile flag
                };
                if (this.appComponent.mobile == '1') {
                    params.is_mobile = true; // Set mobile flag if applicable
                }
                apiService.request('get_user_favorite_products', params).then((response) => {
                    if (response.code == 0) {
                        this.appComponent.gamesList = response.data.products; // Update games list with favorites
                        this.appComponent.total_count = response.data.total_count; // Update total count
                        if (this.appComponent.session.logueado) {
                            this.emitter.emit('gamesFavorites'); // Emit event for favorite games
                        }
                    } else {
                        var error_mensaje = ''; // Error message variable
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message from code
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                            );
                        }
                        this.appComponent.modal = {
                            showModal: 'notification', // Show notification modal
                            titleModal: this.$t('Error!'), // Modal title
                            messageModal: error_mensaje, // Modal message
                            buttonModal: this.$t('Aceptar'), // Modal button text
                            orderModal: 'closeModal', // Modal order
                        };
                    }
                });
            }
        },
        getFavMenu() {
            let params = {
                user_id: this.appComponent.session.usuario, // User ID for favorites
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country identifier
            };
            apiService.request('exist_user_favorite_games', params).then((response) => {
                if (response.code == 0) {
                    this.favMenu = response.data.ExistFavorites; // Update favorite menu visibility
                } else {
                    var error_mensaje = ''; // Error message variable
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message from code
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Show notification modal
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Modal message
                        buttonModal: this.$t('Aceptar'), // Modal button text
                        orderModal: 'closeModal', // Modal order
                    };
                }
            });
        },
        getCategories() {
            var options = {
                action: 'getOptions', // Action for API request
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // Country identifier
                typelobby: this.typelobby, // Type of lobby
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag if applicable
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options), // API request for categories
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout for request
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
    },
});
</script>
<template>
    <!-- Main section for the casino lobby layout -->
    <section
        v-if="config.layout != undefined && config.layout != 4 && config.layout != 5"
        class="w-full h-full flex justify-center items-center px-5 lg:px-14 py-0"
    >
        <!-- Navigation for categories -->
        <nav
            class="in max-w-[1300px] bg-secondary lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-start items-center rounded-xl gap-[20px] z-30"
        >
            <!-- Button for favorites category -->
            <button
                v-if="
                    favMenu ||
                    (appComponent.config.activeFavoritesWithBackend == undefined && true && appComponent.favCasino) ||
                    (appComponent.config.activeFavoritesWithBackend == false && true && appComponent.favCasino)
                "
                @click="selectCategoryFav()"
                class="categorys ml-2 lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
                :class="
                    storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                        ? 'bg-primary-content blob font-bold categorysSelected'
                        : 'lg:bg-secondary'
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
                <span
                    class="text-xs lg:text-sm font-bold uppercase"
                    :class="
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                            ? 'text-neutral-focus'
                            : 'text-base-100'
                    "
                    >{{ $t('Favoritos') }}</span
                >
            </button>
            <!-- Button for each category -->
            <button
                v-for="category in categories"
                @click="
                    selectCategory(category);
                    appComponent.gAnalytics('category_live', category.title);
                "
                class="categorys lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full lg:h-36 w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1"
                :class="
                    storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                        ? 'bg-primary-content blob font-bold categorysSelected'
                        : 'lg:bg-secondary'
                "
            >
                <!-- Render category icon -->
                <div
                    class="h-10 lg:h-14 w-10 lg:w-14 mx-auto"
                    v-html="category.icon"
                ></div>
                <span
                    class="text-xs lg:text-sm font-bold uppercase"
                    :class="
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                            ? 'text-neutral-focus'
                            : 'text-base-100'
                    "
                    >{{ $t(category.title) }}</span
                >
            </button>
        </nav>
    </section>
    <!-- Section for layout type 4 -->
    <section
        v-else-if="config.layout != undefined && config.layout == 4"
        class="w-full h-full flex justify-center items-center py-0 relative"
    >
        <nav
            class="in w-full lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-between items-center rounded-xl gap-2 z-30"
        >
            <template v-for="category in categories">
                <!-- Button for 'Nuevos' category -->
                <button
                    v-if="category.title == 'Nuevos'"
                    @click="
                        selectCategory(category);
                        appComponent.gAnalytics('category_live', category.title);
                    "
                    :class="
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                            ? 'bg-base-100 '
                            : 'bg-gray-300 contrast-75'
                    "
                    class="transition-all ease-in-out duration-500 text-primary font-poppinssb relative group h-[33px] md:w-[120px] md:h-[55px] mr-10 md:mr-20 uppercase lg:px-0 px-3"
                >
                    Nuevos <!-- Button label -->
                    <span
                        :class="
                            storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                                ? ' bg-base-100 shadow-base-100'
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
                    storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                        ? 'border-base-100 rounded-xl bg-primary/25 blob font-bold categorysSelected'
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
                        class="stroke-primary-content"
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
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                            ? 'text-neutral-focus'
                            : 'text-base-100'
                    "
                    >{{ $t('Favoritos') }}</span
                >
            </button>
            <template v-for="category in categories">
                <!-- Button for each category except 'Nuevos' -->
                <button
                    v-if="category.title != 'Nuevos'"
                    @click="
                        selectCategory(category);
                        appComponent.gAnalytics('category_live', category.title);
                    "
                    class="categorys grid justify-center items-center h-full w-auto gap-1 px-2 py-1 transition-all ease-in-out border-solid border-2"
                    :class="
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                            ? 'border-solid border-2 border-base-100 rounded-xl bg-primary/25 blob font-bold categorysSelected'
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
                            storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                                ? 'text-neutral-focus'
                                : 'text-base-100'
                        "
                        >{{ $t(category.title) }}</span
                    >
                </button>
            </template>
            <!-- Search input with magnifying glass icon -->
            <div class="relative">
                <MagnifyingGlass
                    :height="20"
                    :width="20"
                    class="absolute top-3 left-3 fill-primary"
                />
                <input
                    type="text"
                    name=""
                    id="SearchGame"
                    class="w-52 h-12 pl-10 px-6 mr-3 lg:mr-8 rounded-full bg-base-content bg-gradient-to-b from-primary/20 to-primary/20 border-1 border-solid border-primary text-base-100 flex hover:ml-1"
                    :placeholder="$t('Buscar juegos')"
                    v-model="searchCommand"
                    @input="searchEnter($event)"
                />
            </div>
        </nav>
        <!-- Search results slider -->
        <div
            v-if="appComponent.gamesListSearch.length > 0"
            class="slider-search absolute w-[350px] max-h-[500px] bg-secondary top-[63px] right-4 z-50 border-3 border-solid border-primary rounded-3xl grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
        >
            <div
                v-for="game in appComponent.gamesListSearch"
                class="in bg-primary-content/50 relative rounded-xl h-36 w-full flex justify-center items-center p-2 hover:scale-105"
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
                    <p class="text-base-100 text-lg text-center font-bold flex justify-center items-center">
                        {{ game.name }} <!-- Game name -->
                    </p>
                    <!-- Play button -->
                    <button
                        class="bg-primary-content text-base-100 text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                        aria-label="Play"
                        @click="
                            onOpenGame(game, $event);
                            onSearch = false;
                            appComponent.gamesListSearch = [];
                            searchCommand = '';
                        "
                    >
                        {{ $t('Jugar ahora') }} <!-- Button label -->
                    </button>
                </div>
            </div>
            <!-- Button to close search results -->
            <button
                class="bottom-0 h-10 rounded-xl bg-primary-content hover:scale-105 flex justify-center items-center"
                @click="
                    onSearch = !onSearch;
                    appComponent.gamesListSearch = [];
                    searchCommand = '';
                "
            >
                <!-- Icon for closing search -->
                <font-awesome-icon
                    icon="fa-solid fa-xmark"
                    class="text-base-100 text-2xl font-bold"
                />
            </button>
        </div>
    </section>
    <!-- Section for layout type 5 -->
    <section
        v-else-if="config.layout != undefined && config.layout == 5"
        class="flex justify-center items-center w-full"
    >
        <nav
            class="in lg:bg-transparent py-2 flex overflow-hidden overflow-x-auto justify-between items-center rounded-xl gap-1 z-30 max-w-[1300px] w-11/12"
        >
            <!-- Button for favorites category in layout 5 -->
            <button
                v-if="favMenu"
                @click="selectCategoryFav()"
                class="categorys ml-2 relative lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full min-h-[90px] lg:h-28 min-w-[80px] w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 border-solid border-2 border-primary"
                :class="
                    storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                        ? 'bg-primary-focus border-transparent blob font-bold categorysSelected'
                        : 'bg-secondary border-primary'
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
                <span
                    class="text-xs lg:text-sm font-poppinssl capitalize"
                    :class="
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === '1811'
                            ? 'text-neutral-focus'
                            : 'text-base-100'
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
            <!-- Button for each category -->
            <button
                v-for="category in categories"
                @click="
                    selectCategory(category);
                    appComponent.gAnalytics('category_live', category.title);
                "
                class="categorys relative ml-2 lg:hover:bg-primary hover:text-base-100 grid justify-center items-center h-full min-h-[90px] lg:h-28 min-w-[100px] w-auto lg:w-36 gap-1 lg:gap-0 rounded-xl px-2 py-1 border-solid border-2 border-primary"
                :class="
                    storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                        ? 'bg-primary-focus border-transparent blob categorysSelected'
                        : 'bg-secondary border-primary'
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
                        storeCasinoLobby.category !== undefined && storeCasinoLobby.category === category.id
                            ? 'text-neutral-focus'
                            : 'text-base-100'
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
/* Styles for category buttons on hover and selection */
.categorys:hover div svg *,
.categorysSelected div svg * {
    fill: white; /* Change fill color on hover and selection */
}
.categorys:hover * {
    color: white !important; /* Change text color on hover */
}
::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
}
.svg-category svg {
    width: 100%; /* Set width for SVG category icons */
    height: 100%; /* Set height for SVG category icons */
}
</style>

<!-- FILE DOCUMENTED -->
<script lang="ts">
import apiService from '../../../services/ApiService.ts'; // Importing the API service for making requests
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import MagnifyingGlass from '../../icons/MagnifyingGlassIcon.vue'; // Importing MagnifyingGlass icon component
import CloseIcon from '../../icons/CloseIcon.vue'; // Importing CloseIcon component
import searchIcon from '../../icons/SearchIcon.vue'; // Importing SearchIcon component

declare var Ticker: any; // Declaring a global variable Ticker

export default defineComponent({
    props: {
        tableColumns: Object, // Prop for table column definitions
        data: Object, // Prop for data to be displayed
        loading: Boolean, // Prop indicating loading state
    },
    components: { MagnifyingGlass, searchIcon, CloseIcon }, // Registering local components
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let onSearch: boolean = false; // State indicating if a search is active
        let searchCommand = ''; // Search input command
        let optionsGames: any = ''; // Options for games search
        let urlVirtualplay: any = ''; // URL for virtual play
        let src: string = ''; // Source URL (not used in this fragment)
        let showGame: boolean = false; // State indicating if a game should be shown
        let gameSelected: any = {}; // Object for the selected game
        return {
            appComponent,
            onSearch,
            searchCommand,
            optionsGames,
            urlVirtualplay,
            src,
            showGame,
            gameSelected,
        };
    },
    emits: ['button:action', 'close'], // Events emitted by the component
    mounted() {
        this.urlVirtualplay = this.appComponent.config.urlVirtualplay; // Setting the URL for virtual play on mount
    },
    methods: {
        closeAction() {
            this.$emit('close'); // Emitting close event
        },
        buttonAction(item) {
            this.$emit('button:action', item); // Emitting button action event with item
        },
        onOpenGame(game, $event) {
            // Method to handle opening a game
            if (this.appComponent.session.logueado) {
                // Check if user is logged in
                this.appComponent.gamesListSearch.idSelect = game.id; // Set selected game ID
                this.appComponent.openLink = true; // Indicate that a link should be opened
                this.appComponent.openGame(game); // Open the selected game
                this.appComponent.showGame = true; // Show the game
                this.onSearch = false; // Reset search state
                $event.stopPropagation(); // Stop event propagation
            } else {
                this.appComponent.showModalLogin = true; // Show login modal if not logged in
            }
        },
        searchEnter(event) {
            var vthis = this; // Reference to the current context
            if (this.searchCommand.length >= 3) {
                // Check if search command is long enough
                this.optionsGames = {
                    // Set options for games search
                    action: 'getGames2',
                    partner_id: this.appComponent.partnerG,
                    search: this.searchCommand,
                    country: this.appComponent.country,
                    typelobby: -1,
                };
                // Set mobile option based on app component state
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                apiService // Making a GET request to fetch games
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames)
                    .then((response: any) => {
                        var json = response.data; // Parsing response data
                        vthis.appComponent.gamesListSearch = json.games; // Updating games list
                        vthis.appComponent.total_count = json.total_count; // Updating total count
                        vthis.appComponent.offset = 0; // Resetting offset
                        vthis.appComponent.limit = vthis.appComponent.limit; // Setting limit
                        // Check for Playtech jackpot configuration
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Check for existing jackpot script
                            );
                            if (existingScript) {
                                existingScript.remove(); // Remove existing script if found
                            }
                            var script = document.createElement('script'); // Create a new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set script source
                            const vthis = this; // Reference to the current context
                            script.onload = function () {
                                // On script load
                                vthis.appComponent.gamesList.forEach((game) => {
                                    // Iterate through games list
                                    if (
                                        game.provider == 'PLAYTECH' && // Check if provider is Playtech
                                        game.jackpot != undefined &&
                                        game.jackpot == 1
                                    ) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                        objParams.game = game.front_game_id; // Set game ID in parameters
                                        var ticker = new Ticker(objParams); // Create a new Ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to text box
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
    },
});
</script>
<template>
    <!-- Main container for the search component with dynamic padding based on layout configuration -->
    <div
        class="lg:p-0"
        :class="appComponent.config.layout != undefined && appComponent.config.layout == 5 ? 'p-4' : 'px-1'"
    >
        <!-- Container for the search input and icon with dynamic styling based on layout -->
        <div
            class="flex flex-row flex-nowrap justify-start items-center px-6 p-4 w-full lg:mb-5"
            :class="
                appComponent.config.layout != undefined && appComponent.config.layout == 5
                    ? 'bg-base-300 h-12 rounded-md '
                    : 'h-14 bg-neutral-content bg-gradient-to-t from-neutral/20 to-neutral/20 rounded-full'
            "
        >
            <!-- Search icon with dynamic fill color based on layout -->
            <searchIcon
                fill="white"
                class="w-6 h-6"
                :class="
                    appComponent.config.layout != undefined && appComponent.config.layout == 5
                        ? 'fill-neutral'
                        : 'fill-primary-content'
                "
            ></searchIcon>
            <!-- Input field for search with dynamic placeholder and styling -->
            <input
                type="text"
                name=""
                id="SearchGame"
                class="text-neutral placeholder:text-neutral/40 font-poppinssl bg-transparent border-none ring-0 w-full"
                :class="
                    appComponent.config.layout != undefined && appComponent.config.layout == 5
                        ? ''
                        : 'placeholder:font-poppinsb'
                "
                :placeholder="'Buscar juegos'"
                v-model="searchCommand"
                @input="searchEnter($event)"
            />
            <!-- Close button displayed conditionally based on layout -->
            <button
                v-if="appComponent.config.layout != undefined && appComponent.config.layout == 7"
                @click="closeAction()"
            >
                <CloseIcon class="text-neutral/40 w-8 h-8"></CloseIcon>
            </button>
        </div>
        <!-- Dropdown for search results displayed conditionally based on games list -->
        <div
            v-if="appComponent.gamesListSearch.length > 0"
            class="slider-search absolute w-[320px] lg:w-[350px] max-h-[500px] z-50 bg-secondary top-[60px] lg:top-[60px] border-1 border-solid border-secondary-content rounded-md grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
        >
            <!-- Iterates over the search results to display each game -->
            <div
                v-for="game in appComponent.gamesListSearch"
                class="in relative h-36 w-full flex justify-center items-center p-2 hover:scale-105"
                :class="
                    appComponent.config.layout != undefined && appComponent.config.layout == 5
                        ? 'bg-primary-content  rounded-xl'
                        : 'bg-secondary-content/10'
                "
                href="javascript:;"
                :aria-label="game.name"
            >
                <!-- Game icon -->
                <img
                    :src="game.icon_3"
                    alt=""
                    class="h-32 rounded-xl"
                />
                <!-- Container for game name and action button -->
                <div class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all">
                    <!-- Game name display -->
                    <p class="text-neutral text-lg text-center font-bold flex justify-center items-center">
                        {{ game.name }}
                    </p>
                    <!-- Button to play the game with dynamic styling -->
                    <button
                        class="text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                        :class="
                            appComponent.config.layout != undefined && appComponent.config.layout == 5
                                ? 'bg-success'
                                : 'bg-primary-content'
                        "
                        aria-label="Play"
                        @click="
                            onOpenGame(game, $event);
                            onSearch = false;
                            appComponent.gamesListSearch = [];
                            searchCommand = '';
                        "
                    >
                        {{ 'Jugar ahora' }}
                    </button>
                </div>
            </div>
            <!-- Button to close the search results -->
            <button
                class="bottom-0 h-10 rounded-xl bg-success hover:scale-105 flex justify-center items-center"
                @click="
                    onSearch = !onSearch;
                    appComponent.gamesListSearch = [];
                    searchCommand = '';
                "
            >
                <font-awesome-icon
                    icon="fa-solid fa-xmark"
                    class="text-neutral text-2xl font-bold"
                />
            </button>
        </div>
    </div>
</template>
<style scoped>
/* Hides the scrollbar for the slider-search element in WebKit browsers */
.slider-search::-webkit-scrollbar {
    display: none; /* Prevents the scrollbar from being displayed */
}
</style>

<!-- FILE DOCUMENTED -->

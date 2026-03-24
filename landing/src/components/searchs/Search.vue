<script lang="ts">
import apiService from '../../services/ApiService'; // Importing the API service for making requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MagnifyingGlass from '../icons/MagnifyingGlassIcon.vue'; // Importing the MagnifyingGlass icon component
import CloseIcon from '../icons/CloseIcon.vue'; // Importing the Close icon component
import { useModalStore } from '../../stores/Modal'; // Importing the modal store for managing modals
declare var Ticker: any; // Declaring a global variable Ticker

export default defineComponent({
    props: {
        tableColumns: Object, // Prop for table column definitions
        data: Object, // Prop for data to be displayed
        loading: Boolean, // Prop to indicate loading state
    },
    components: { MagnifyingGlass, CloseIcon }, // Registering local components
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let onSearch: boolean = false; // State to track if search is active
        let searchCommand = ''; // Command for search input
        let optionsGames: any = ''; // Options for games search
        let urlVirtualplay: any = ''; // URL for virtual play API
        let src: string = ''; // Source for additional resources
        let showGame: boolean = false; // State to control game display
        let gameSelected: any = {}; // Object to hold selected game details
        let modals = useModalStore(); // Accessing modal store
        return {
            appComponent,
            onSearch,
            modals,
            searchCommand,
            optionsGames,
            urlVirtualplay,
            src,
            showGame,
            gameSelected,
        };
    },
    emits: ['button:action'], // Emitting button action event
    created() {
        this.$watch(
            () => this.$route, // Watching for route changes
            () => {
                this.appComponent.gamesListSearch = []; // Resetting search results on route change
                this.onSearch = false; // Deactivating search
                this.searchCommand = ''; // Clearing search command
            },
        );
    },
    mounted() {
        this.urlVirtualplay = this.appComponent.config.urlVirtualplay; // Setting the virtual play URL on mount
    },
    methods: {
        buttonAction(item) {
            this.$emit('button:action', item); // Emitting button action with item
        },
        searchEnter() {
            var vthis = this; // Storing reference to 'this'
            if (this.searchCommand.length >= 3) { // Checking if search command is at least 3 characters
                this.optionsGames = {
                    action: 'getGames2', // Action for fetching games
                    partner_id: (window as any).cconfig.partner, // Partner ID from global config
                    search: this.searchCommand, // Search command
                    country: this.appComponent.country, // Country from app component
                    typelobby: -1, // Lobby type
                };
                // Setting mobile flag based on app component state
                if (this.appComponent.mobile == '1') {
                    this.optionsGames.isMobile = true;
                } else {
                    this.optionsGames.isMobile = false;
                }
                apiService
                    .requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames) // Making API request
                    .then((response: any) => {
                        var json = response.data; // Parsing response data
                        vthis.appComponent.gamesListSearch = json.games; // Updating games list search
                        vthis.appComponent.total_count = json.total_count; // Updating total count
                        vthis.appComponent.offset = 0; // Resetting offset
                        vthis.appComponent.limit = vthis.appComponent.limit; // Maintaining limit
                        // Checking for Playtech jackpot configuration
                        if (
                            vthis.appComponent.config.casino != undefined &&
                            vthis.appComponent.config.casino.playtechJackpot != undefined &&
                            vthis.appComponent.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            var existingScript = document.querySelector(
                                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]', // Checking for existing script
                            );
                            if (existingScript) {
                                existingScript.remove(); // Removing existing script if found
                            }
                            var script = document.createElement('script'); // Creating new script element
                            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Setting script source
                            const vthis = this; // Storing reference to 'this'
                            script.onload = function () { // Defining onload behavior for the script
                                vthis.appComponent.gamesList.forEach((game) => {
                                    if (game.provider == 'PLAYTECH' && game.jackpot != undefined && game.jackpot == 1) {
                                        var objParams = vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Getting jackpot parameters
                                        objParams.game = game.front_game_id; // Setting game ID
                                        var ticker = new Ticker(objParams); // Creating new Ticker instance
                                        ticker.attachToTextBox('playtech-' + game.id); // Attaching ticker to game ID
                                        ticker.SetCurrencyPos('1'); // Setting currency position
                                        ticker.tick(); // Starting ticker
                                    }
                                });
                            };
                            document.head.appendChild(script); // Appending script to document head
                        }
                    });
            } else {
                this.appComponent.gamesListSearch = []; // Clearing search results if command is too short
            }
        },
    },
});
</script>
<template>
    <!-- Conditional rendering based on app component states -->
    <div
        v-if="appComponent.casinoEnabled && appComponent.liveCasinoEnabled && appComponent.virtualesEnabled"
        class="flex h-full gap-3 justify-center items-center lg:justify-start rounded-md lg:rounded-full p-1 z-50"
		:class="
			onSearch == true
				? 'w-full absolute md:relative bg-base-300'
				: 'relative w-auto'
		"
    >
        <button
            v-if="!appComponent.infoApp"
            class="bg-base-200 h-12 w-12 flex justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid border-primary-content hover:scale-105"
            aria-label="search"
            @click="
                onSearch = !onSearch;
                appComponent.gamesListSearch = [];
                searchCommand = '';
            "
            data-analytics-label="header:search"
            :data-analytics-context="`component:Search|layout:layout-${appComponent.config.layout}`"
        >
        <!-- Displaying magnifying glass when not searching -->
            <MagnifyingGlass
                v-if="onSearch == false"
                :height="20"
                :width="20"
                class="fill-accent-focus"
            />
        <!-- Displaying close icon when searching -->
            <CloseIcon
                v-else
                class="fill-neutral w-7 h-7"
            ></CloseIcon>
        </button>
        <!-- Input field for search command, shown only when searching -->
        <input
            v-if="onSearch"
            type="text"
            name=""
            id="SearchGame"
            class="w-80 h-12 px-6 rounded-full bg-base-200 border-1 border-solid border-primary text-neutral flex hover:scale-105 hover:ml-1 relative md:absolute left-0 md:left-full"
            :placeholder="$t('Buscar juegos')"
            v-model="searchCommand"
            @input="searchEnter()"
        />
        <!-- Container for search results, shown only if there are results -->
        <div
            v-if="appComponent.gamesListSearch.length > 0"
            class="slider-search absolute w-[350px] max-h-[500px] bg-secondary top-[60px] lg:top-[50px] border-3 border-solid border-base-200 rounded-3xl grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
        >
            <!-- Iterating over search results -->
            <div
                v-for="game in appComponent.gamesListSearch"
                class="in bg-secondary-content relative rounded-xl h-36 w-full flex justify-center items-center p-2 hover:scale-105"
                href="javascript:;"
                :aria-label="game.name"
            >
                <!-- Image for game icon -->
                <img
                    :src="game.icon_3"
                    alt=""
                    class="h-32 rounded-xl"
                />
                <div class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"> <!-- Container for game details -->
                    <p class="text-neutral text-lg text-center font-bold flex justify-center items-center"> <!-- Game name display -->
                        {{ game.name }}
                    </p>
                    <button
                        class="bg-base-100 text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                        aria-label="Play"
                        @click="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
                    >
                        {{ $t('Jugar ahora') }} <!-- Play now button text -->
                    </button>
                </div>
            </div>
            <button
                class="bottom-0 h-10 rounded-xl bg-base-100 hover:scale-105 flex justify-center items-center"
                @click="
                    onSearch = !onSearch;
                    appComponent.gamesListSearch = [];
                    searchCommand = '';
                "
            >
                <CloseIcon class="fill-neutral w-7 h-7"></CloseIcon> <!-- Close icon for button -->
            </button>
        </div>
    </div>
</template>
<style scoped>
.slider-search::-webkit-scrollbar {
    display: none; /* Hiding the scrollbar for the search results */
}
</style>

<!-- FILE DOCUMENTED -->

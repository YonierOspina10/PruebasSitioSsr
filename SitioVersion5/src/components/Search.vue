<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MagnifyingGlass from '../components/icons/MagnifyingGlass.vue'; // Importing the MagnifyingGlass component
declare var Ticker: any; // Declaring a global variable Ticker

export default defineComponent({
	props: {
		tableColumns: Object, // Prop for table column definitions
		data: Object, // Prop for data to be displayed
		loading: Boolean, // Prop to indicate loading state
	},
	components: { MagnifyingGlass }, // Registering the MagnifyingGlass component
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component
		let onSearch: boolean = false; // State to track if search is active
		let searchCommand = ''; // Command for search input
		let optionsGames: any = ''; // Options for games search
		let urlVirtualplay: any = ''; // URL for virtual play API
		let src: string = ''; // Source for game assets
		let showGame: boolean = false; // State to control game display
		let gameSelected: any = {}; // Object to hold selected game details
		let debouncedSearch: any = null; // Variable for debounced search function
		return {
			config,
			appComponent,
			onSearch,
			searchCommand,
			optionsGames,
			urlVirtualplay,
			src,
			showGame,
			gameSelected,
			debouncedSearch,
		};
	},
	emits: ['button:action'], // Emitting button action event
	created() {
		this.$watch(
			() => this.$route, // Watching for route changes
			(toParams) => {
				this.appComponent.gamesListSearch = []; // Resetting search results
				this.onSearch = false; // Deactivating search
				this.searchCommand = ''; // Clearing search command
			}
		);
	},
	mounted() {
		this.urlVirtualplay = this.config.urlVirtualplay; // Setting the URL for virtual play
		this.debouncedSearch = this.debounce(
			// Initializing debounced search function
			this.searchEnter,
			this.appComponent.config['timeDebouncedSearch'] ?? 500 // Default debounce time
		);
	},
	methods: {
		buttonAction(item) {
			this.$emit('button:action', item); // Emitting button action with item
		},
		searchEnter(event) {
			var vthis = this; // Storing reference to 'this'
			if (this.searchCommand.length >= 3) {
				// Checking if search command is valid
				this.optionsGames = {
					// Setting options for games search
					action: 'getGames2',
					partner_id: this.appComponent.partnerG,
					search: this.searchCommand,
					country: this.appComponent.country,
					typelobby: -1,
				};
				if (this.appComponent.mobile == '1') {
					// Checking if mobile
					this.optionsGames.isMobile = true; // Setting mobile option
				} else {
					this.optionsGames.isMobile = false; // Setting non-mobile option
				}
				apiService
					.requestGet(
						// Making API request to get games
						this.urlVirtualplay + '/cms/products/games/',
						this.optionsGames
					)
					.then((response: any) => {
						var json = response.data; // Parsing response data
						vthis.appComponent.gamesListSearch = json.games; // Updating games list
						vthis.appComponent.total_count = json.total_count; // Updating total count
						vthis.appComponent.offset = 0; // Resetting offset
						vthis.appComponent.limit = vthis.appComponent.limit; // Maintaining limit
						if (
							vthis.config.casino != undefined &&
							vthis.config.casino.playtechJackpot != undefined &&
							vthis.config.casino.playtechJackpot[
								vthis.appComponent.country
							] != undefined
						) {
							var existingScript = document.querySelector(
								// Checking for existing script
								'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
							);
							if (existingScript) {
								existingScript.remove(); // Removing existing script if found
							}
							var script = document.createElement('script'); // Creating new script element
							script.src =
								'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Setting script source
							const vthis = this; // Storing reference to 'this'
							script.onload = function () {
								// Defining onload behavior for the script
								vthis.appComponent.gamesList.forEach((game) => {
									// Iterating through games list
									if (
										game.provider == 'PLAYTECH' &&
										game.jackpot != undefined &&
										game.jackpot == 1
									) {
										var objParams =
											vthis.config.casino.playtechJackpot[
												vthis.appComponent.country
											]; // Retrieving jackpot parameters
										objParams.game = game.front_game_id; // Setting game ID
										var ticker = new Ticker(objParams); // Creating a new Ticker instance
										ticker.attachToTextBox(
											// Attaching ticker to the game
											'playtech-' + game.id
										);
										ticker.SetCurrencyPos('1'); // Setting currency position
										ticker.tick(); // Starting the ticker
									}
								});
							};
							document.head.appendChild(script); // Appending script to document head
						}
					});
			} else {
				this.appComponent.gamesListSearch = []; // Clearing search results if command is invalid
			}
		},
		onOpenGame(game, $event) {
			if (this.appComponent.session.logueado) {
				// Checking if user is logged in
				this.appComponent.gamesListSearch.idSelect = game.id; // Setting selected game ID
				this.appComponent.openLink = true; // Indicating to open link
				this.appComponent.openGame(game); // Opening the selected game
				this.appComponent.showGame = true; // Showing the game
				this.onSearch = false; // Deactivating search
				$event.stopPropagation(); // Preventing event propagation
			} else {
				this.appComponent.showModalLogin = true; // Showing login modal if not logged in
			}
		},
		debounce(func, wait) {
			let timeout; // Variable to hold timeout reference
			return function (...args) {
				// Returning debounced function
				const later = () => {
					clearTimeout(timeout); // Clearing timeout
					func.apply(this, args); // Calling the original function
				};
				clearTimeout(timeout); // Clearing existing timeout
				timeout = setTimeout(later, wait); // Setting new timeout
			};
		},
	},
});
</script>
<template>
	<!-- Main container for the search functionality -->
	<div
	v-if="appComponent.casinoEnabled && appComponent.liveCasinoEnabled && appComponent.virtualesEnabled"
		class="flex h-full gap-3 justify-center items-center lg:justify-start rounded-md lg:rounded-full p-1 z-50"
		:class="
			onSearch == true
				? 'w-full absolute md:relative bg-base-300'
				: 'relative w-auto'
		"
	>
		<!-- Button to toggle search visibility -->
		<button
            v-if="!appComponent.infoApp"
			class="bg-base-300 h-12 w-12 flex justify-center items-center rounded-full shadow-inner shadow-black/70 hover:scale-105"
			:class="config.header_.styleVersion == 2 ? 'border-2 border-solid border-accent' : 'border-2 border-solid border-primary'"
			aria-label="search"
			@click="
				onSearch = !onSearch;
				appComponent.gamesListSearch = [];
				searchCommand = '';
			"
			data-analytics-label="header:search"
            :data-analytics-context="`component:Search|layout:layout-${appComponent.config.layout}`"
		>
			<MagnifyingGlass
				v-if="onSearch == false"
				:height="20"
				:width="20"
                class="fill-accent-focus"
			/>
			<font-awesome-icon
				v-else
				icon="fa-solid fa-xmark"
				class="text-neutral text-3xl font-bold"
			/>
		</button>
		<!-- Input field for search command -->
		<input
			v-if="onSearch"
			type="text"
			name=""
			id="SearchGame"
			class="w-80 h-12 px-6 rounded-full bg-base-200 border-1 border-solid border-primary text-neutral flex hover:scale-105 hover:ml-1 relative md:absolute left-0 md:left-full"
			:placeholder="$t('Buscar juegos')"
			v-model="searchCommand"
			@input="debouncedSearch"
			autocomplete="off"
		/>
		<!-- Container for displaying search results -->
		<div
			v-if="appComponent.gamesListSearch.length > 0"
			class="slider-search absolute z-[100] w-[350px] max-h-[500px] bg-secondary top-[60px] lg:top-[50px] border-3 border-solid border-secondary-content rounded-3xl grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
		>
			<!-- Iterating through search results -->
			<div
				v-for="game in appComponent.gamesListSearch"
				class="in bg-secondary-content relative rounded-xl h-36 w-full flex justify-center items-center p-2 hover:scale-105"
				href="javascript:;"
				:aria-label="game.name"
			>
				<img :src="game.icon_3" alt="" class="h-32 rounded-xl" />
				<div
					class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
				>
					<p
						class="text-info text-lg text-center font-bold flex justify-center items-center"
					>
						{{ game.name }}
					</p>
					<!-- Button to play the selected game -->
					<button
						class="bg-base-100 text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
						aria-label="Play"
						@click="
							onOpenGame(game, $event);
							onSearch = false;
							appComponent.gamesListSearch = [];
							searchCommand = '';
						"
					>
						{{ $t('Jugar ahora') }}
					</button>
				</div>
			</div>
			<!-- Button to close the search results -->
			<button
				class="bottom-0 h-10 rounded-xl bg-base-100 hover:scale-105 flex justify-center items-center"
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
/* Hiding the scrollbar for the slider search */
.slider-search::-webkit-scrollbar {
	display: none;
}
</style>

<!-- FILE DOCUMENTED -->

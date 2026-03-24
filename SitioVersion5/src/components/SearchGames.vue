<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MagnifyingGlass from '../components/icons/MagnifyingGlass.vue'; // Importing a magnifying glass icon component
import searchIcon from './icons/searchIcon.vue'; // Importing a search icon component
import IconClose from './icons/IconClose.vue'; // Importing a close icon component
import SearchIcon2 from '@/components/icons/SearchIcon2.vue'; // Importing another search icon component
declare var Ticker: any; // Declaring a global variable Ticker

export default defineComponent({
	props: {
		tableColumns: Object, // Prop for table column configuration
		data: Object, // Prop for data to be displayed
		loading: Boolean, // Prop to indicate loading state
		width: {
			type: Boolean, // Prop to control width
			default: false, // Default value for width
		},
	},
	components: { MagnifyingGlass, searchIcon, IconClose, SearchIcon2 }, // Registering local components
	data() {
		let config = this.$config(); // Getting configuration from the app
		let appComponent: any = this.$appComponent; // Accessing the app component
		let onSearch: boolean = false; // State to track if a search is active
		let searchCommand = ''; // Command for the search input
		let optionsGames: any = ''; // Options for games search
		let urlVirtualplay: any = ''; // URL for virtual play
		let src: string = ''; // Source for images or other content
		let showGame: boolean = false; // State to control game display
		let gameSelected: any = {}; // Object to hold the selected game
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
		};
	},
	emits: ['button:action', 'close'], // Emitting events for button actions and close
	created() {
		this.$watch(
			() => this.$route, // Watching for route changes
			(toParams) => {
				this.appComponent.gamesListSearch = []; // Resetting the games list on route change
				this.onSearch = false; // Resetting search state
				this.searchCommand = ''; // Clearing search command
			}
		);
	},
	mounted() {
		this.urlVirtualplay = this.config.urlVirtualplay; // Setting the URL for virtual play on mount
	},
	methods: {
		closeAction() {
			this.$emit('close'); // Emitting close event
		},
		buttonAction(item) {
			this.$emit('button:action', item); // Emitting button action event with item
		},
		searchEnter(event) {
			var vthis = this; // Storing reference to 'this'
			if (this.searchCommand.length >= 3) {
				// Checking if search command length is sufficient
				this.optionsGames = {
					action: 'getGames2', // Action for fetching games
					partner_id: this.appComponent.partnerG, // Partner ID from app component
					search: this.searchCommand, // Search command
					country: this.appComponent.country, // Country from app component
					typelobby: -1, // Type of lobby
				};
				if (this.appComponent.mobile == '1') {
					// Checking if the app is in mobile mode
					this.optionsGames.isMobile = true; // Setting mobile option
				} else {
					this.optionsGames.isMobile = false; // Setting non-mobile option
				}
				apiService
					.requestGet(
						this.urlVirtualplay + '/cms/products/games/', // API endpoint for games
						this.optionsGames // Options for the request
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
							setTimeout(() => {
								vthis.appComponent.gamesListSearch.forEach(
									(game) => {
										if (game.provider == 'PLAYTECH') {
											// Checking if game provider is PLAYTECH
											var objParams =
												vthis.config.casino
													.playtechJackpot[
													vthis.appComponent.country
												]; // Getting jackpot parameters
											objParams.game = game.front_game_id; // Setting game ID
											var ticker = new Ticker(objParams); // Creating a new Ticker instance
											ticker.attachToTextBox(
												'playtech-' + game.id // Attaching ticker to the game ID
											);
											ticker.SetCurrencyPos('1'); // Setting currency position
											ticker.tick(); // Starting the ticker
										}
									}
								);
							}, 500); // Delay for ticker setup
						}
					});
			} else {
				this.appComponent.gamesListSearch = []; // Clearing games list if search command is too short
			}
		},
		onOpenGame(game, $event) {
			if (this.appComponent.session.logueado) {
				// Checking if user is logged in
				this.appComponent.gamesListSearch.idSelect = game.id; // Setting selected game ID
				this.appComponent.openLink = true; // Indicating that a link should be opened
				this.appComponent.openGame(game); // Opening the selected game
				this.appComponent.showGame = true; // Showing the game
				this.onSearch = false; // Resetting search state
				$event.stopPropagation(); // Preventing event propagation
			} else {
				this.appComponent.showModalLogin = true; // Showing login modal if not logged in
			}
		},
	},
});
</script>
<template>
	<!-- Main container for the search component -->
	<div
		class="lg:p-0"
		:class="
			config.layout != undefined && config.layout == 5 ? 'p-4' : 'px-1',
			width ? 'flex justify-center items-center relative' : ''
		"
	>
		<!-- Search input container -->
		<div
			class="flex flex-row flex-nowrap justify-start items-center px-6 p-4 lg:mb-5"
			:class="
				config.layout != undefined && config.layout == 5
					? 'bg-base-300 h-12 rounded-md '
					: 'h-14 bg-neutral-content bg-gradient-to-t from-neutral/20 to-neutral/20 rounded-full',
				width ? 'max-w-[1300px] w-full md:w-11/12' : 'w-full'
			"
		>
			<SearchIcon2
				fill="white"
				class="w-6 h-6"
				:class="
					config.layout != undefined && config.layout == 5
						? 'fill-neutral'
						: 'fill-primary-content'
				"
			></SearchIcon2>
			<!-- Search input field -->
			<input
				type="text"
				name=""
				id="SearchGame"
				class="text-neutral placeholder:text-neutral/40 font-poppinssl bg-transparent border-none ring-0 w-full"
				:class="
					config.layout != undefined && config.layout == 5
						? ''
						: 'placeholder:font-poppinsb'
				"
				:placeholder="$t('Buscar juegos')"
				v-model="searchCommand"
				@input="searchEnter($event)"
			/>
			<!-- Close button for search -->
			<button
				v-if="config.layout != undefined && config.layout == 7"
				@click="closeAction()"
			>
				<IconClose class="text-neutral/40 w-8 h-8"></IconClose>
			</button>
		</div>
		<!-- Dropdown for displaying search results -->
		<div
			v-if="appComponent.gamesListSearch.length > 0"
			class="slider-search absolute w-[320px] lg:w-[350px] max-h-[500px] z-50 bg-secondary top-[60px] lg:top-[60px] border-1 border-solid border-secondary-content rounded-md grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
			:class="width ? 'left-14' : ''"
		>
			<!-- Loop through each game in the search results -->
			<div
				v-for="game in appComponent.gamesListSearch"
				class="in relative h-36 w-full flex justify-center items-center p-2 hover:scale-105"
				:class="
					config.layout != undefined && config.layout == 5
						? 'bg-primary-content  rounded-xl'
						: 'bg-secondary-content/10'
				"
				href="javascript:;"
				:aria-label="game.name"
			>
				<img :src="game.icon_3" alt="" class="h-32 rounded-xl" />
				<!-- Game icon -->
				<div
					class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
				>
					<p
						class="text-neutral text-lg text-center font-bold flex justify-center items-center"
					>
						{{ game.name }}
						<!-- Displaying the game name -->
					</p>
					<!-- Button to play the game -->
					<button
						class="text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
						:class="
							config.layout != undefined && config.layout == 5
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
						{{ $t('Jugar ahora') }}
						<!-- Button text for playing the game -->
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
/* Hiding the scrollbar for the search results */
.slider-search::-webkit-scrollbar {
	display: none;
}
</style>

<!-- FILE DOCUMENTED -->

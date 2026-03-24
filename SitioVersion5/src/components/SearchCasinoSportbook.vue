<script lang="ts">
import { defineComponent } from 'vue';
import MagnifyingGlass from '../components/icons/MagnifyingGlass.vue';// Importing the MagnifyingGlass icon component
import apiService from '@/services/ApiService';// Importing the API service for making requests
import Sportbook from '@/views/Products/Sportbook.vue';
declare var Ticker: any; // Declaring a global variable Ticker

export default defineComponent({
  components: { MagnifyingGlass },// Registering components for use in the template
  data() {
    const appComponent: any = this.$appComponent;

    return {
      appComponent,// Reference to the app component
      onSearch: false, // State to track if the search is active
      searchCommand: '', // The current search command input by the user
      results: {
        games: [],
        sportbook: {
          events: [],
        },
      },
      loadingProgress: 0, // Progress indicator for loading
      debouncedSearch: null,
      urlVirtualplay:
          appComponent?.config?.urlVirtualplay?.startsWith('http')
              ? appComponent.config.urlVirtualplay
              : (window as any)?.cconfig?.urlVirtualplay || 'https://gameservice.virtualsoft.bet',
    };
  },
  created() {
    this.debouncedSearch = this.debounce(this.searchEnter, 500); // Setting up a debounced search function 
    this.$watch(
        () => this.$route,
        () => {
          this.clearResults();// Clearing the games list on route change
          this.onSearch = false; // Resetting search state
          this.searchCommand = ''; // Clearing the search command
        }
    );
  },
  mounted() {
    this.startLoadingAnimation();  // Starting the loading animation when the component is mounted
  },
  methods: {
    getEventDateParts(event) {
        if (!event?.date) {
        return { date: '', time: '' }
        }

        const [date, time] = event.date.split(' - ')
        return { date, time }
    },
    startLoadingAnimation() {
      setInterval(() => {
        this.loadingProgress = (this.loadingProgress + 2) % 100; // Incrementing loading progress
      }, 10000); // Every 10 seconds
    },

    async searchEnter() {
      if (this.searchCommand.length < 3) { // Checking if the search command is at least 3 characters
        this.clearResults();
        return;
      }

      const searchText = this.searchCommand.toLowerCase(); // Filtering games based on search command
      const partnerId = this.appComponent.partnerG;
      const country = this.appComponent.country;

      const paramsSports = { partner_id: partnerId, search: this.searchCommand, country };
        apiService
        .request('platform_browser', paramsSports)
        .then((response: any) => {
            const sportbook = response?.data?.sportbook || { events: [] };

            this.results.sportbook.events = sportbook.events || [];
        })
        .catch((err: any) => {
            console.error('Error cargando sports:', err);
            this.results.sportbook = { events: [] };
        });

        console.log(Sportbook, "sportbook")
      const optionsGames: any = {
        action: 'getGames2',
        partner_id: (window as any).cconfig?.partner || 0,
        search: this.searchCommand,
        country,
        typelobby: -1,
        isMobile: this.appComponent.mobile == '1',
      };

      const url = `${this.urlVirtualplay}/cms/products/games/`;

      apiService
          .requestGet(url, optionsGames)
          .then((response: any) => {
            const json = response?.data || {};
            const games = json?.games || [];

            this.results.games = games;
            this.handlePlaytechJackpots(games);
          })
          .catch((err: any) => {
            console.error('Error cargando juegos:', err);
            this.results.games = [];
          });
    },
    handlePlaytechJackpots(games: any[]) {
      if (
          this.appComponent.config?.casino?.playtechJackpot &&
          this.appComponent.config.casino.playtechJackpot[this.appComponent.country]
      ) {
        const existingScript = document.querySelector(
            'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
        ); // Checking for existing jackpot script
        if (existingScript) existingScript.remove(); // Removing existing script if found

        const script = document.createElement('script'); // Creating a new script element
        script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Setting the source for the script
        const vthis = this; // Preserving context for the onload function

        script.onload = function () {
          games.forEach((game) => {
            if (game.provider === 'PLAYTECH' && game.jackpot == 1) {
              const objParams =
                  vthis.appComponent.config.casino.playtechJackpot[vthis.appComponent.country]; // Getting jackpot parameters
              objParams.game = game.front_game_id; // Setting the game ID
              const ticker = new Ticker(objParams); // Creating a new Ticker instance
              ticker.attachToTextBox('playtech-' + game.id); // Attaching ticker to the game
              ticker.SetCurrencyPos('1'); // Setting currency position
              ticker.tick(); // Starting the ticker
            }
          });
        };
        document.head.appendChild(script); // Appending the script to the document head
      }
    },

    clearResults() {
      this.results = { // Resetting results to empty
        games: [],
        sportbook: { events: [] },
      };
    },

    debounce(func: Function, wait: number) {
      let timeout: any; // Timeout variable for debouncing
      return function (...args: any[]) {
        clearTimeout(timeout); // Clearing the timeout
        timeout = setTimeout(() => func.apply(this, args), wait); // Setting a new timeout
      };
    },
    onOpenGame(game, $event) {
                if (this.appComponent.session.logueado) { // Checking if the user is logged in
                    this.appComponent.gamesListSearch.idSelect = game.id; // Setting selected game ID
                    this.appComponent.openLink = true; // Indicating that a link should be opened
                    this.appComponent.openGame(game); // Opening the selected game
                    this.appComponent.showGame = true; // Showing the game
                    this.onSearch = false; // Resetting search state
                    $event.stopPropagation(); // Stopping event propagation
                    this.appComponent.gamesListSearch.results = []; // Clearing search results
                } else {
                    this.appComponent.showModalLogin = true; // Showing login modal if not logged in
                }
            },
  },
});
</script>
<template>
    <div class="search-container flex flex-col gap-4"> <!-- Main container for the search functionality -->
        <!-- Conditional class based on search state -->
        <div
            class="bg-base-300 flex h-full gap-3 justify-center items-center lg:justify-start rounded-md lg:rounded-full p-1 z-50"
            :class="onSearch ? 'w-full absolute md:relative top-0 left-0 right-0 lg:w-auto' : 'w-auto'"
        >
            <button
                v-if="!appComponent.infoApp"
                class="bg-base-300 border-2 border-primary-content h-12 w-12 sm:h-14 sm:w-14 lg:h-12 lg:w-12 aspect-square flex justify-center items-center rounded-full shadow-inner shadow-black/70 hover:scale-105"
                aria-label="search"
                @click="() => {
                        onSearch = !onSearch;
                        if (!onSearch) {
                            results.games = [];
                            results.sportbook.events = [];
                            searchCommand = '';
                        }
                    }"
                data-analytics-label="header:search"
                :data-analytics-context="`component:SearchCasinoSportbook|layout:layout-${appComponent.config.layout}`"    
            >
                <!-- Displaying magnifying glass icon when not searching -->
                <MagnifyingGlass
                    v-if="!onSearch"
                    :height="20"
                    :width="20"
                    class="fill-accent-focus"
                />
                <!-- Displaying close icon when searching -->
                <font-awesome-icon
                    v-else
                    icon="fa-solid fa-xmark"
                    class="text-neutral text-3xl font-poppinsm font-bold"
                />
            </button>
            <!-- Input field for search command -->
            <input
                v-if="onSearch"
                type="text"
                class="w-80 h-12 lg:h-12 px-6 rounded-full bg-neutral-content border-1 border-solid border-primary-content text-neutral flex hover:scale-105 hover:ml-1"
                :placeholder="$t('Buscar apuestas o juegos')"
                v-model="searchCommand"
                @input="debouncedSearch"
            />
        </div>
        <!-- Container for displaying search results -->
        <div
            v-if="
                onSearch &&
                (results.games.length > 0 ||
                    results.sportbook.events?.length > 0)
            "
            class="slider-search z-50 left-[40px] right-0 lg:left-[170px] w-[330px] absolute lg:w-[350px] max-h-[500px] bg-secondary top-[60px] lg:top-[60px] border-3 border-solid border-secondary-content rounded-3xl grid justify-center items-center p-2 gap-1 overflow-x-hidden overflow-y-auto"
        >
            <!-- Container for sports events -->
            <div
                v-if="results.sportbook.events?.length > 0"
                class="sports-events grid gap-4 py-3"
            >
                <!-- Individual event card -->
                <div
                    v-for="event in results.sportbook.events"
                    :key="event.id"
                    class="event-card rounded-xl overflow-hidden justify-items-center"
                >
                    <!-- Template for live events -->
                    <template v-if="event.live">
                        <div
  class="event-card-live group rounded-xl overflow-hidden shadow-lg w-[88%] h-auto flex flex-col justify-between
         border-b-1 border-accent bg-base-100 hover:bg-base-200 transition-colors duration-200"
>

                            <!-- Header for event card -->
                            <div
  class="header bg-secondary-focus group-hover:bg-secondary-content
         flex justify-between items-center p-4 h-10 border-b-1 border-accent-content
         transition-colors duration-200"
>

                                <div class="flex items-center gap-2 w-full justify-between">
                                    <!-- Icon for the sport -->
                                    <!-- <img
                                        :src="event.icon_sport"
                                        alt="Sport Icon"
                                        class="icon w-5 h-5"
                                    /> -->
                                    <span class="text-neutral font-poppinsm font-bold text-sm"
                                        >{{ event.sport }} - {{ event.country }}</span
                                    >
                                    <svg class="text-accent" width="16" height="16" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C12.5333 0 14.7292 0.816667 16.5875 2.45C18.4458 4.08333 19.55 6.11667 19.9 8.55C19.5667 8.38333 19.2208 8.25417 18.8625 8.1625C18.5042 8.07083 18.1333 8.01667 17.75 8C17.4333 6.78333 16.8625 5.7 16.0375 4.75C15.2125 3.8 14.2 3.08333 13 2.6V3C13 3.55 12.8042 4.02083 12.4125 4.4125C12.0208 4.80417 11.55 5 11 5H9V7C9 7.28333 8.90417 7.52083 8.7125 7.7125C8.52083 7.90417 8.28333 8 8 8H6V10H12C12.1833 10 12.3542 10.0458 12.5125 10.1375C12.6708 10.2292 12.7917 10.3583 12.875 10.525C12.5917 10.975 12.375 11.45 12.225 11.95C12.075 12.45 12 12.9667 12 13.5C12 14.55 12.2708 15.525 12.8125 16.425C13.3542 17.325 13.9083 18.1667 14.475 18.95C13.7917 19.2833 13.075 19.5417 12.325 19.725C11.575 19.9083 10.8 20 10 20ZM9 17.95V16C8.45 16 7.97917 15.8042 7.5875 15.4125C7.19583 15.0208 7 14.55 7 14V13L2.2 8.2C2.15 8.5 2.10417 8.8 2.0625 9.1C2.02083 9.4 2 9.7 2 10C2 12.0167 2.6625 13.7833 3.9875 15.3C5.3125 16.8167 6.98333 17.7 9 17.95ZM17.2 19.9C17.1167 19.8333 17.0583 19.75 17.025 19.65C16.8417 19.0667 16.5833 18.525 16.25 18.025C15.9167 17.525 15.5583 17.0333 15.175 16.55C14.825 16.1167 14.5417 15.6417 14.325 15.125C14.1083 14.6083 14 14.0667 14 13.5C14 12.5333 14.3417 11.7083 15.025 11.025C15.7083 10.3417 16.5333 10 17.5 10C18.4667 10 19.2917 10.3417 19.975 11.025C20.6583 11.7083 21 12.5333 21 13.5C21 14.0667 20.8875 14.6042 20.6625 15.1125C20.4375 15.6208 20.1583 16.1 19.825 16.55C19.4417 17.0333 19.0833 17.525 18.75 18.025C18.4167 18.525 18.1583 19.0667 17.975 19.65C17.9417 19.75 17.8833 19.8333 17.8 19.9C17.7167 19.9667 17.6167 20 17.5 20C17.3833 20 17.2833 19.9667 17.2 19.9ZM17.5 17.175C17.6667 16.8917 17.85 16.6292 18.05 16.3875C18.25 16.1458 18.4417 15.9 18.625 15.65C18.8583 15.3333 19.0625 14.9958 19.2375 14.6375C19.4125 14.2792 19.5 13.9 19.5 13.5C19.5 12.95 19.3042 12.4792 18.9125 12.0875C18.5208 11.6958 18.05 11.5 17.5 11.5C16.95 11.5 16.4792 11.6958 16.0875 12.0875C15.6958 12.4792 15.5 12.95 15.5 13.5C15.5 13.9 15.5875 14.2792 15.7625 14.6375C15.9375 14.9958 16.1417 15.3333 16.375 15.65C16.575 15.9 16.7708 16.1458 16.9625 16.3875C17.1542 16.6292 17.3333 16.8917 17.5 17.175ZM16.6125 14.3875C16.3708 14.1458 16.25 13.85 16.25 13.5C16.25 13.15 16.3708 12.8542 16.6125 12.6125C16.8542 12.3708 17.15 12.25 17.5 12.25C17.85 12.25 18.1458 12.3708 18.3875 12.6125C18.6292 12.8542 18.75 13.15 18.75 13.5C18.75 13.85 18.6292 14.1458 18.3875 14.3875C18.1458 14.6292 17.85 14.75 17.5 14.75C17.15 14.75 16.8542 14.6292 16.6125 14.3875Z" fill="currentColor"/>
                                     </svg>
                                </div>
                                <!-- Icon for the country -->
                                <!-- <img
                                    :src="event.icon_country"
                                    alt="Country Icon"
                                    class="icon w-5 h-5 rounded"
                                /> -->
                            </div>
                            <div
                                class="content relative flex-grow bg-cover bg-bottom-10 flex flex-col justify-between p-3"
                                :style="{
                                    backgroundImage: `url(${event.background})`,
                                    backgroundPosition: `${event.bg_position || 'center center'}`,
                                }"
                            >
                                <div class="relative flex w-full">
                                    <div class="league-info flex justify-between items-center z-10 relative w-full py-1">
                                        <div class="flex items-center gap-1 w-[85%]">
                                            <span
                                                class="bg-error saturate-200 hue-rotate-[-20deg] text-neutral px-2 py-[0.1rem] text-xs font-poppinsm"
                                                >EN VIVO</span
                                            >
                                        </div>
                                        <div class="live-indicator flex items-center gap-2">
                                            <!-- ICONO -->
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="17"
                                                                height="11"
                                                                viewBox="0 0 17 11"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M9.48438 5.50061C9.48438 6.04427 9.04366 6.48498 8.5 6.48498C7.95634 6.48498 7.51562 6.04427 7.51562 5.50061C7.51562 4.95695 7.95634 4.51624 8.5 4.51624C9.04366 4.51624 9.48438 4.95695 9.48438 5.50061Z"
                                                                    fill="#FEFEFE"
                                                                    stroke="white"
                                                                    stroke-width="0.03125"
                                                                />
                                                                <path
                                                                    d="M6.2579 3.50785C5.77009 4.05693 5.50066 4.76588 5.50066 5.50035C5.50066 6.23482 5.77009 6.94377 6.2579 7.49285M10.7429 7.49285C11.2307 6.94377 11.5001 6.23482 11.5001 5.50035C11.5001 4.76588 11.2307 4.05693 10.7429 3.50785M4.66509 1.91504C3.75612 2.88749 3.25049 4.16892 3.25049 5.50004C3.25049 6.83116 3.75612 8.11259 4.66509 9.08504M12.3351 9.08504C13.2441 8.11259 13.7497 6.83116 13.7497 5.50004C13.7497 4.16892 13.2441 2.88749 12.3351 1.91504"
                                                                    stroke="white"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                                <path
                                                                    d="M14.0937 10.5C15.3214 9.12388 15.9999 7.34417 15.9999 5.5C15.9999 3.65583 15.3214 1.87612 14.0937 0.5M2.90621 0.5C1.6785 1.87612 1 3.65583 1 5.5C1 7.34417 1.6785 9.12388 2.90621 10.5"
                                                                    stroke="white"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>

                                            <!-- TIEMPO -->
                                            <span class="text-neutral text-xs shrink-0">
                                                {{ event.time_live }}
                                            </span>

                                            <!-- PROGRESS BAR -->
                                            <div class="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                                                <div
                                                                class="progress-bar"
                                                                :style="{ width: `${loadingProgress}%` }"
                                                            ></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <span
                                class="bg-primary font-poppinsm text-black-300 px-2 py-[0.1rem] text-xs"
                                    >{{ event.league }}</span
                                >
                                <div class="teams grid grid-cols-[1fr_auto_1fr] items-center z-10 mt-4 gap-6">
                                    <!-- Team 1 -->
                                    <div class="team flex flex-col items-center text-center">
                                        <p class="team-name text-neutral font-poppinsm font-semibold break-words">
                                        {{ event.team_name_1 }}
                                        </p>
                                    </div>

                                    <!-- VS -->
                                    <p class="text-neutral font-poppinsm text-sm text-center">
                                        VS.
                                    </p>

                                    <!-- Team 2 -->
                                    <div class="team flex flex-col items-center text-center">
                                        <p class="team-name text-neutral font-poppinsm font-semibold break-words">
                                        {{ event.team_name_2 }}
                                        </p>
                                    </div>
                                </div>
                                <div class="cta-button text-center z-10 relative mt-4 mb-2">
                                    <!-- Call to action button -->
                                    <a
                                        :href="`/${event.link_event}`"
                                        class="bg-primary text-neutral font-poppinsm font-bold py-1 px-8 rounded-full hover:bg-primary-focus transition text-base"
                                    >
                                        ¡VER MÁS!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- Card for non-live events -->
                    <template v-else>
                        <div
                            class="event-card-live group rounded-xl overflow-hidden shadow-lg w-[88%] h-auto flex flex-col justify-between
         border-b-1 border-accent bg-base-100 hover:bg-base-200 transition-colors duration-200"
                        >
                            <!-- Header for event card -->
                            <div
                                class="header bg-secondary-focus group-hover:bg-secondary-content
         flex justify-between items-center p-4 h-10 border-b-1 border-accent-content
         transition-colors duration-200"
                            >
                                <div class="flex items-center gap-2 w-full justify-between">
                                    <!-- Icon for the sport -->
                                    <!-- <img
                                        :src="event.icon_sport"
                                        alt="Sport Icon"
                                        class="icon w-5 h-5"
                                    /> -->
                                    <span class="text-neutral font-poppinsm font-bold text-sm"
                                        >{{ event.sport }} - {{ event.country }}</span
                                    >
                                    <svg class="text-accent" width="16" height="16" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C12.5333 0 14.7292 0.816667 16.5875 2.45C18.4458 4.08333 19.55 6.11667 19.9 8.55C19.5667 8.38333 19.2208 8.25417 18.8625 8.1625C18.5042 8.07083 18.1333 8.01667 17.75 8C17.4333 6.78333 16.8625 5.7 16.0375 4.75C15.2125 3.8 14.2 3.08333 13 2.6V3C13 3.55 12.8042 4.02083 12.4125 4.4125C12.0208 4.80417 11.55 5 11 5H9V7C9 7.28333 8.90417 7.52083 8.7125 7.7125C8.52083 7.90417 8.28333 8 8 8H6V10H12C12.1833 10 12.3542 10.0458 12.5125 10.1375C12.6708 10.2292 12.7917 10.3583 12.875 10.525C12.5917 10.975 12.375 11.45 12.225 11.95C12.075 12.45 12 12.9667 12 13.5C12 14.55 12.2708 15.525 12.8125 16.425C13.3542 17.325 13.9083 18.1667 14.475 18.95C13.7917 19.2833 13.075 19.5417 12.325 19.725C11.575 19.9083 10.8 20 10 20ZM9 17.95V16C8.45 16 7.97917 15.8042 7.5875 15.4125C7.19583 15.0208 7 14.55 7 14V13L2.2 8.2C2.15 8.5 2.10417 8.8 2.0625 9.1C2.02083 9.4 2 9.7 2 10C2 12.0167 2.6625 13.7833 3.9875 15.3C5.3125 16.8167 6.98333 17.7 9 17.95ZM17.2 19.9C17.1167 19.8333 17.0583 19.75 17.025 19.65C16.8417 19.0667 16.5833 18.525 16.25 18.025C15.9167 17.525 15.5583 17.0333 15.175 16.55C14.825 16.1167 14.5417 15.6417 14.325 15.125C14.1083 14.6083 14 14.0667 14 13.5C14 12.5333 14.3417 11.7083 15.025 11.025C15.7083 10.3417 16.5333 10 17.5 10C18.4667 10 19.2917 10.3417 19.975 11.025C20.6583 11.7083 21 12.5333 21 13.5C21 14.0667 20.8875 14.6042 20.6625 15.1125C20.4375 15.6208 20.1583 16.1 19.825 16.55C19.4417 17.0333 19.0833 17.525 18.75 18.025C18.4167 18.525 18.1583 19.0667 17.975 19.65C17.9417 19.75 17.8833 19.8333 17.8 19.9C17.7167 19.9667 17.6167 20 17.5 20C17.3833 20 17.2833 19.9667 17.2 19.9ZM17.5 17.175C17.6667 16.8917 17.85 16.6292 18.05 16.3875C18.25 16.1458 18.4417 15.9 18.625 15.65C18.8583 15.3333 19.0625 14.9958 19.2375 14.6375C19.4125 14.2792 19.5 13.9 19.5 13.5C19.5 12.95 19.3042 12.4792 18.9125 12.0875C18.5208 11.6958 18.05 11.5 17.5 11.5C16.95 11.5 16.4792 11.6958 16.0875 12.0875C15.6958 12.4792 15.5 12.95 15.5 13.5C15.5 13.9 15.5875 14.2792 15.7625 14.6375C15.9375 14.9958 16.1417 15.3333 16.375 15.65C16.575 15.9 16.7708 16.1458 16.9625 16.3875C17.1542 16.6292 17.3333 16.8917 17.5 17.175ZM16.6125 14.3875C16.3708 14.1458 16.25 13.85 16.25 13.5C16.25 13.15 16.3708 12.8542 16.6125 12.6125C16.8542 12.3708 17.15 12.25 17.5 12.25C17.85 12.25 18.1458 12.3708 18.3875 12.6125C18.6292 12.8542 18.75 13.15 18.75 13.5C18.75 13.85 18.6292 14.1458 18.3875 14.3875C18.1458 14.6292 17.85 14.75 17.5 14.75C17.15 14.75 16.8542 14.6292 16.6125 14.3875Z" fill="currentColor"/>
                                    </svg>

                                    <!-- Icon for the country -->
                                    <!-- <img
                                        :src="event.icon_country"
                                        alt="Country Icon"
                                        class="icon w-5 h-5 rounded"
                                    /> -->
                                </div>
                            </div>
                            <div class="content flex flex-col items-center py-3">
                                <div class="league-info flex items-center gap-2">
                                    <!-- Icon for the league -->
                                    <!-- <img
                                        :src="event.icon_league"
                                        alt="League Icon"
                                        class="icon w-6 h-6"
                                    /> -->
                                    <!-- <span class="text-neutral font-poppinsm">{{ event.league }}</span> --> <!-- Displaying league name -->
                                </div>
<div class="flex w-full justify-between px-4">
    <!-- FECHA -->
    <div class="flex items-center gap-1  fill-primary">
        
        <svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23438 0.440625 1.94063C0.734375 1.64688 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64688 13.0594 1.94063C13.3531 2.23438 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5ZM1.5 13.5H12V6H1.5V13.5ZM1.5 4.5H12V3H1.5V4.5Z"/>
        </svg>

        <span class="text-neutral font-poppinsm text-xs">
            {{ getEventDateParts(event).date }}
        </span>
    </div>

    <!-- HORA -->
    <div class="flex items-center gap-1 fill-primary">
        
        <svg width="14" height="14" viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
        <path d="M4.11563 12.9656C3.29688 12.6094 2.58438 12.1281 1.97813 11.5219C1.37188 10.9156 0.890625 10.2031 0.534375 9.38438C0.178125 8.56563 0 7.6875 0 6.75C0 5.8125 0.178125 4.93438 0.534375 4.11563C0.890625 3.29688 1.37188 2.58437 1.97813 1.97812C2.58438 1.37187 3.29688 0.890625 4.11563 0.534375C4.93438 0.178125 5.8125 0 6.75 0C7.6875 0 8.56563 0.178125 9.38438 0.534375C10.2031 0.890625 10.9156 1.37187 11.5219 1.97812C12.1281 2.58437 12.6094 3.29688 12.9656 4.11563C13.3219 4.93438 13.5 5.8125 13.5 6.75C13.5 7.6875 13.3219 8.56563 12.9656 9.38438C12.6094 10.2031 12.1281 10.9156 11.5219 11.5219C10.9156 12.1281 10.2031 12.6094 9.38438 12.9656C8.56563 13.3219 7.6875 13.5 6.75 13.5C5.8125 13.5 4.93438 13.3219 4.11563 12.9656ZM8.85 9.9L9.9 8.85L7.5 6.45V3H6V7.05L8.85 9.9ZM6.75 12C8.2125 12 9.45313 11.4906 10.4719 10.4719C11.4906 9.45312 12 8.2125 12 6.75C12 5.2875 11.4906 4.04688 10.4719 3.02812C9.45313 2.00937 8.2125 1.5 6.75 1.5C5.2875 1.5 4.04688 2.00937 3.02813 3.02812C2.00938 4.04688 1.5 5.2875 1.5 6.75C1.5 8.2125 2.00938 9.45312 3.02813 10.4719C4.04688 11.4906 5.2875 12 6.75 12Z"/>
        </svg>

        <span class="text-neutral font-poppinsm text-xs">
            {{ getEventDateParts(event).time }}
        </span>
    </div>
</div>


                                <div class="teams grid grid-cols-[1fr_auto_1fr] items-center z-10 mt-4 gap-6">
                                    <!-- Team 1 -->
                                    <div class="team flex flex-col items-center text-center">
                                        <p class="team-name text-neutral font-poppinsm font-semibold break-words">
                                        {{ event.team_name_1 }}
                                        </p>
                                    </div>

                                    <!-- VS -->
                                    <p class="text-neutral font-poppinsm text-sm text-center">
                                        VS.
                                    </p>

                                    <!-- Team 2 -->
                                    <div class="team flex flex-col items-center text-center">
                                        <p class="team-name text-neutral font-poppinsm font-semibold break-words">
                                        {{ event.team_name_2 }}
                                        </p>
                                    </div>
                                </div>
                                <div class="cta-button text-center z-10 relative mt-4 mb-2">
                                    <!-- Call to action button -->
                                    <a
                                        :href="`/${event.link_event}`"
                                        class="bg-primary text-neutral font-poppinsm font-bold py-1 px-8 rounded-full hover:bg-primary-focus transition text-base"
                                    >
                                        ¡VER MÁS! <!-- Button text -->
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
          <!-- Games -->
          <div
              v-if="results.games.length > 0"
              class="games grid gap-4"
          >
            <!-- Individual game card -->
            <div
                v-for="game in results.games"
                :key="game.id"
                class="game-card bg-secondary-content relative rounded-xl h-36 w-[88%] flex justify-center items-center p-2 hover:scale-105 transition-transform mx-auto"
            >
              <div class="h-32 w-full flex justify-center items-center overflow-hidden rounded-lg bg-base-300">
                <img
                    :src="game.icon_3"
                    alt="Game Icon"
                    class="object-cover w-full h-full"
                />
              </div>

              <div class="content flex flex-col justify-center items-center gap-2 w-full h-full p-2 break-all">
                <p class="game-name text-neutral text-lg text-center font-poppinsm font-bold leading-tight line-clamp-2">
                  {{ game.name }}
                </p>
                <button
                    class="cta-button bg-base-100 text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                    @click="onOpenGame(game, $event)"
                >
                  {{ $t('Jugar ahora') }}
                </button>
              </div>
            </div>
          </div>
          <button
              class="bottom-0 h-10 w-[88%] rounded-full bg-primary hover:scale-105 flex justify-center items-center mx-auto transition"
              aria-label="Cerrar resultados"
              @click="() => {
                onSearch = false;
                results.games = [];
                results.sportbook.events = [];
                searchCommand = '';
              }"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                class="fill-neutral w-7 h-7"
            >
              <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7
                     86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256
                     41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3
                     297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256
                     342.6 150.6z"
              />
            </svg>
          </button>

        </div>
    </div>
</template>
<style scoped>
.slider-search::-webkit-scrollbar {
    display: none; /* Hiding the scrollbar for the search slider */
}
@keyframes fill {
    0% {
        width: 0%; /* Initial width for the fill animation */
    }
    100% {
        width: 100%; /* Final width for the fill animation */
    }
}
.progress-bar-container {
    position: relative; /* Positioning for the progress bar container */
    width: 100%; /* Full width for the container */
    height: 5px; /* Fixed height for the progress bar */
    background-color: rgba(209, 213, 219, 0.67); /* Background color for the container */
    border-radius: 5px; /* Rounded corners for the container */
    overflow: hidden; /* Hiding overflow for the progress bar */
}
.progress-bar {
    right: 0; /* Aligning to the right */
    height: 100%; /* Full height for the progress bar */
    background-color: white; /* Background color for the progress bar */
    animation: fill 0.8s linear infinite alternate; /* Animation for the progress bar */
}
</style>

<!-- FILE DOCUMENTED -->

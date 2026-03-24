<script lang="ts">
import {defineComponent, ref} from "vue"; // Import necessary functions from Vue
import { register } from "swiper/element/bundle"; // Import Swiper component registration
import apiService from '../../../../SitioVersion5/src/services/ApiService.ts'; // Import API service for data fetching
import { useModalStore } from "../../stores/Modal";
import { toKebabCase } from '@/utils'; // Import modal store for managing modal state

// Function to simulate loading a component with a delay
const loadComponent = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    },5000) // Resolve after 5 seconds
  })
}
register(); // Register Swiper components

export default defineComponent({
  props:{
    // Define component props with default values
    category: { type: String, default: '1' },
    limit: { type: String, default: '20' },
    typelobby: { type: String, default: '0' },
    top: { type: Boolean, default: false },
    decorationBar: { type: Boolean, default: true },
    lowerCaseText: { type: Boolean, default: false },
    title: { type: String, default: 'Top Casino' },
    url: { type: String, default: '' },
    keySlide: { type: Number, default: 1000 },
    styleVersion: { type: Number, default: 1 },
    action: { type: String, default: 'getGames2' },
    user: { type: Boolean, default: false },
    type: { type: Number, default: 1 },
    icon: {type: String, default : ''}
  },
  async setup(){
    const dataComponent = ref(await loadComponent()) // Load component data asynchronously
    return{
      dataComponent // Return the loaded data
    }
  },
  data(){
    // Define component data properties
    let appComponent: any = this.$appComponent; // Reference to the app component
    let bgGame: any = {}; // Background game object
    let preloaderShow: boolean = false; // Preloader visibility state
    let modals = useModalStore(); // Modal store instance
    let gamesList: any = []; // List of games
    let gameSelected: any = {}; // Selected game object
    let showGame: boolean = false; // Game display state
    let src: string = ''; // Source URL for images
    let margin: number = 0; // Margin value
      const analyticsAttrs = {}; // Object to hold analytics attributes
    return{
      appComponent,
      bgGame,
      preloaderShow,
      gamesList,
      gameSelected,
      showGame,
      src,
      margin,
      modals,
        analyticsAttrs
    };
  },
  mounted(){
    // Lifecycle hook to fetch games based on type
    if (this.type === 1) {
      this.getCasinoGames(); // Fetch casino games if type is 1
    } else if (this.type === 2) {
      this.getCasinoGames2(); // Fetch casino games if type is 2
    }

      this.analyticsAttrs = {
          viewAll: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
              'data-analytics-context': `component:SliderCasino5|layout:${this.appComponent.config.layout}`
          },
          arrowPrev: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
              'data-analytics-context': `component:SliderCasino5|layout:${this.appComponent.config.layout}`
          },
          arrowNext: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
              'data-analytics-context': `component:SliderCasino5|layout:${this.appComponent.config.layout}`
          },
          game: (game: any) => ({
              'data-analytics-id': `${game.id}`,
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
              'data-analytics-position': `${this.gamesList.findIndex((g: any) => g.id === game.id) + 1}`,
              'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasino5|layout:${this.appComponent.config.layout}`,
          })
      }
  },
  methods:{
    async getCasinoGames() {
      // Method to fetch casino games
      this.bgGame = {
        background:
            'url(' + this.appComponent.config.casino.preloaderGame + ')no-repeat 0 50%/cover', // Set background image
      };
      this.preloaderShow = true; // Show preloader
      let optionsGames = {
        action: 'getGames2', // Action type for API request
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Lobby type
        limit: this.limit, // Limit of games to fetch
        category: this.category, // Game category
        country: this.appComponent.country, // User's country
        isMobile: false, // Mobile flag
      };
      optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag based on app component
      await apiService
          .requestGet(
              this.appComponent.config.urlVirtualplay + '/cms/products/games/', // API endpoint
              optionsGames // Request options
          )
          .then((response: any) => {
            var json = response.data; // Parse response data
            this.gamesList = json.games; // Assign games to the list
            Array.prototype.forEach.call(
                document.getElementsByClassName('preload-game-top'),
                function (el, i) {
                  (
                      document.getElementsByClassName('preload-game-top')[
                          i
                          ] as HTMLElement
                  ).style.display = 'none'; // Hide preloader elements
                }
            );
          });
    },
    async getCasinoGames2() {
      // Method to fetch casino games with different parameters
      let optionsGames = {};
      optionsGames = {
        action: this.action, // Action type for API request
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Lobby type
        limit: 25, // Limit of games to fetch
        category: 'all', // Fetch all categories
        provider: 'all', // Fetch all providers
        country: this.appComponent.country, // User's country
        isMobile: this.appComponent.mobile == '1', // Mobile flag
      };
      try {
        await apiService
            .requestGet(
                this.appComponent.config.urlVirtualplayPython
                    ? this.appComponent.config.urlVirtualplayPython
                    : 'https://gameservice.virtualsoft.tech/', // API endpoint
                optionsGames // Request options
            )
            .then((response: any) => {
              this.gamesList = response.data.games; // Assign games to the list
            });
      } catch (e) {} // Catch and ignore errors
    },
  }
})
</script>
<template>
  <section
      v-if="gamesList.length > 0"
      class="flex justify-center items-center w-full"
  >
    <div class="w-[90%] lg:w-full">
      <div class="in relative flex justify-between items-center">
        <h3
            :class="[
						lowerCaseText ? 'capitalize font-light' : 'uppercase font-bold'
					]"
            class="text-neutral text-xl mt-1 border-solid border-b-2 border-neutral flex flex-row justify-start items-center gap-x-2 w-full"
            aria-label="Casino bets"
        >
          {{ $t(title) }} // Display title with translation
          <img v-if='icon' :src="icon" alt="" class="w-8 h-8 object-contain"> // Display icon if provided
        </h3>
      </div>
      <div class="h-full w-full">
        <div class="w-full h-full flex  items-center justify-between flex-row p-1 my-2"
        >
          <button
              class="cursor-pointer hover:scale-125 ml-0 lg:ml-3"
              :class="'slidePrev' + keySlide"
              v-bind="analyticsAttrs.arrowPrev"
          >
          </button>
          <swiper-container
              :slidesPerView="'auto'"
              :centeredSlides="false"
              :spaceBetween="10"
              :grabCursor="true"
              :navigation="{
							nextEl: '.slideNext' + keySlide,
							prevEl: '.slidePrev' + keySlide,
						}"
              :mousewheel="true"
              :mousewheel-force-to-axis="true"
              :free-mode="true"
              :direction="'horizontal'"
              :loop="true"
              class="mySwiper swiper-h w-full h-full flex justify-start items-center px-[2%] md:px-[2%] gap-x-8 max-w-[91%] md:max-w-[97%]"
          >
            <swiper-slide
                v-for="game in gamesList"
                :style="bgGame"
                :class="
								styleVersion == 2
									? 'border-solid border-2 border-[#3d4958] w-40 h-40 mr-14'
									: styleVersion == 3
									? 'w-[7.6rem] h-[5.4rem] md:w-[13rem] md:h-36 border-solid border-1 border-primary mr-8 md:mr-5'
									: 'h-48 w-48  mr-2'
							"
                class="in relative rounded-xl overflow-hidden inline-block mr-2"
            >
              <button
                  @click="
									gamesList.idSelect = game.id;
									appComponent.openGame(game);
									$event.stopPropagation();
									appComponent.gAnalytics('play_casino', {...game, action: type === 1 ? 'getGames2' : action}); // Track analytics event
								"
                  class="relative w-full h-full"
                  v-bind="analyticsAttrs.game(game)"
              >
                <img
                    v-show="
										game.icon_3 != undefined &&
										game.icon_3 != null &&
										game.icon_3 != ''
									"
                    v-lazy="game.icon_3"
                    alt=""
                    :class="
										'absolute top-0 w-full h-full z-20 hover:z-10' +
										' object-' +
										game.object_fit
									"
                />
                <div
                    class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
                >
                  <p
                      class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
                  >
                    {{ game.name.toLowerCase() }} // Display game name
                  </p>
                  <button
                      class="w-40 bg-accent-focus text-neutral text-xs lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
                      aria-label="Jugar ahora"
                      v-bind="analyticsAttrs.game(game)"
                  >
                    {{ $t('Jugar ahora') }} // Display play button text with translation
                  </button>
                </div>
<!-- Display if top is true -->
                <span
                    v-if="top"
                    class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
                >{{ $t('TOP') }}</span
                >
                <img
                    v-if="game.TagImage != undefined && game.TagImage != null && game.TagImage != ''"
                    :src="game.TagImage"
                    width="60"
                    height="60"
                    :class="['absolute left-0 top-0',
                  'text-black text-sm font-bold', 'pb-[1px] z-30  w-[60px] h-[60px]',
                   'object-contain flex justify-center', 'items-center']"
                    alt="Etiqueta"
                >
                <span
                    v-else-if="game.TagText != undefined && game.TagText != null && game.TagText != ''"
                    :class="['absolute left-0 top-0 m-1 text-black',
                  'text-sm font-bold pb-[1px] z-30', 'w-auto h-auto flex justify-center items-center',
                  'max-w-2xl overflow-hidden']"
                    v-html="game.TagText"
                ></span>
              </button>
            </swiper-slide>
          </swiper-container>
          <button
              aria-label="Right"
              class="cursor-pointer hover:scale-125 mr-0 lg:mr-3"
              :class="'slideNext' + keySlide"
                v-bind="analyticsAttrs.arrowNext"
          >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.slider-casino::-webkit-scrollbar {
  display: none; /* Hide scrollbar for the slider */
}
.arrow:hover :nth-child(1) {
  color: white; /* Change color on hover */
}
</style>

<!-- FILE DOCUMENTED -->

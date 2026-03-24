<script lang="ts">
import {defineComponent, ref} from "vue"; // Import necessary functions from Vue
import { register } from "swiper/element/bundle"; // Import Swiper component registration
import apiService from '../../../../SitioVersion5/src/services/ApiService.ts'; // Import API service for data fetching
import { useModalStore } from "../../stores/Modal";
import { toKebabCase } from '@/utils'; // Import modal store for state management

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
      dataComponent // Return reactive reference
    }
  },
  data(){
    // Define component data properties
    let appComponent: any = this.$appComponent; // Reference to app component
    let bgGame: any = {}; // Background game object
    let preloaderShow: boolean = false; // Preloader visibility state
    let modals = useModalStore(); // Modal store instance
    let gamesList: any = []; // List of games
    let gameSelected: any = {}; // Selected game object
    let showGame: boolean = false; // Game display state
    let src: string = ''; // Source URL
    let colors: any = {}; // Color configuration
    let margin: number = 0; // Margin value
      let analyticsAttrs = {}
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
      colors,
        analyticsAttrs
    };
  },
  created() {
    // Lifecycle hook to determine device theme based on configuration
    if (
        this.appComponent.config.theme_colors_desktop != undefined &&
        this.appComponent.config.mobileL == ''
    ) {
      this.deviceTheme = 'theme_colors_desktop'; // Set desktop theme
    } else if (
        this.appComponent.config.theme_colors_mobile != undefined &&
        this.appComponent.config.mobileL != ''
    ) {
      this.deviceTheme = 'theme_colors_mobile'; // Set mobile theme
    }
    this.colors = this.appComponent.config[this.deviceTheme]; // Assign colors based on theme
  },
  mounted(){
    // Lifecycle hook to fetch games based on type
    if (this.type === 1) {
      this.getCasinoGames(); // Fetch casino games
    } else if (this.type === 2) {
      this.getCasinoGames2(); // Fetch alternative casino games
    }

    this.analyticsAttrs = {
          viewAll: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                  'data-analytics-context': `component:SliderCasinoV2|layout:${this.appComponent.config.layout}`
          },
          arrowPrev: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                  'data-analytics-context': `component:SliderCasinoV2|layout:${this.appComponent.config.layout}`
          },
          arrowNext: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                  'data-analytics-context': `component:SliderCasinoV2|layout:${this.appComponent.config.layout}`
          },
          game: (game: any) => ({
              'data-analytics-id': `${game.id}`,
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
              'data-analytics-position': `${this.gamesList.findIndex((g: any) => g.id === game.id) + 1}`,
              'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasinoV2|layout:${this.appComponent.config.layout}`,
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
        offset: 0, // Pagination offset
        typelobby: this.typelobby, // Lobby type
        limit: this.limit, // Limit of games to fetch
        category: this.category, // Game category
        country: this.appComponent.country, // User's country
        isMobile: false, // Mobile flag
      };
      optionsGames.isMobile = this.appComponent.mobile == '1'; // Determine if mobile
      await apiService
          .requestGet(
              this.appComponent.config.urlVirtualplay + '/cms/products/games/',
              optionsGames // API request with options
          )
          .then((response: any) => {
            var json = response.data; // Parse response data
            this.gamesList = json.games; // Assign games to list
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
      // Method to fetch alternative casino games
      let optionsGames = {};
      optionsGames = {
        action: this.action, // Action type for API request
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Pagination offset
        typelobby: this.typelobby, // Lobby type
        limit: 25, // Limit of games to fetch
        category: 'all', // Game category
        provider: 'all', // Game provider
        country: this.appComponent.country, // User's country
        isMobile: this.appComponent.mobile == '1', // Mobile flag
      };
      try {
        await apiService
            .requestGet(
                this.appComponent.config.urlVirtualplayPython
                    ? this.appComponent.config.urlVirtualplayPython
                    : 'https://gameservice.virtualsoft.tech/',
                optionsGames // API request with options
            )
            .then((response: any) => {
              this.gamesList = response.data.games; // Assign games to list
            });
      } catch (e) {} // Handle errors silently
    },
  }
})
</script>
<template>
  <!-- Main section for displaying games -->
  <section
      v-if="gamesList.length > 0" 
      class="w-full flex justify-center items-center gap-0 tablet:gap-4 desktop:gap-0 max-w-[1155px] mt-8 md:mt-6"
  >
    <!-- Left navigation button -->
    <button id="buttonLeftGamesV2" class="hover:scale-125 mt-9" v-bind="analyticsAttrs.arrowPrev">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 14 23"
          fill="none"
      >
        <path
            d="M0.939438 10.7673C0.353652 11.3531 0.353651 12.3029 0.939438 12.8887L10.4854 22.4346C11.0712 23.0204 12.0209 23.0204 12.6067 22.4346C13.1925 21.8488 13.1925 20.8991 12.6067 20.3133L4.12142 11.828L12.6067 3.34272C13.1925 2.75694 13.1925 1.80719 12.6067 1.2214C12.0209 0.635615 11.0712 0.635615 10.4854 1.2214L0.939438 10.7673ZM5.49902 10.328L2.0001 10.328L2.0001 13.328L5.49902 13.328L5.49902 10.328Z"
            fill="white"
        />
      </svg> <!-- Placeholder for SVG icon -->
    </button>
    <div
        class="flex flex-col justify-center items-start gap-2 w-[90%] desktop:w-[97%]"
    >
      <!-- Link to game URL with title and icon -->
      <RouterLink
          :to="url"
          class="flex justify-center items-center gap-4"
      >
        <h3 class="font-bold text-base tablet:text-xl">
          {{ $t(title) }} <!-- Title of the game section -->
        </h3>
          <!-- Game icon -->
        <img
            v-if="icon != ''"
            :src="icon"
            alt=""
            class="w-[30px] aspect-square object-contain"
        />
      </RouterLink>
      <!-- Swiper container for game slides -->
      <swiper-container
          id="SliderGamesV2"
          :slides-per-view="'auto'"
          :loop="true"
          :space-between="10"
          :centered-slides="false"
          :free-mode="true"
          :mousewheel="true"
          :mousewheel-force-to-axis="true"
          :direction="'horizontal'"
          :controller-control="'.swiper-3'"
          :injectStyles="[
					`
			.swiper-button-prev,
			.swiper-button-next,
			.swiper-button-prev::after,
			.swiper-button-next::after {
				color: ${colors.base_100};
				width: 20px;
				height: 20px;
				margin-top: -5px;
			}`,
				]"
          class="w-full"
      >
        <!-- Slide for each game in the games list -->
        <swiper-slide
            v-for="(game, index) in gamesList"
            :key="index"
            class="relative w-[70px] h-[70px] tablet:w-[78px] tablet:h-[78px] desktop:w-[133px] desktop:h-[133px] rounded-lg shadow-inner shadow-black cursor-pointer overflow-hidden"
            @click="
						appComponent.openGame(game);
						appComponent.gAnalytics('play_casino', {...game, action: type === 1 ? 'getGames2' : action});
					"
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
              class="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300 ease-in-out"
              :class="'object-' + game.object_fit"
          />
        </swiper-slide>
      </swiper-container>
    </div>
    <!-- Right navigation button -->
    <button id="buttonRightGamesV2" class="hover:scale-125 mt-9" v-bind="analyticsAttrs.arrowNext">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 14 23"
          fill="none"
      >
        <path
            d="M13.0612 12.8887C13.647 12.3029 13.647 11.3531 13.0612 10.7673L3.51526 1.2214C2.92947 0.635614 1.97973 0.635614 1.39394 1.2214C0.808154 1.80719 0.808154 2.75694 1.39394 3.34272L9.87922 11.828L1.39394 20.3133C0.808154 20.8991 0.808154 21.8488 1.39394 22.4346C1.97973 23.0204 2.92947 23.0204 3.51526 22.4346L13.0612 12.8887ZM10.835 13.328H12.0005V10.328H10.835V13.328Z"
            fill="white"
        />
      </svg> <!-- Placeholder for SVG icon -->
    </button>
  </section>
</template>

<!-- FILE DOCUMENTED -->

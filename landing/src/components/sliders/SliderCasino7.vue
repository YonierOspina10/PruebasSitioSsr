<script lang="ts">
import {defineComponent, ref} from "vue"; // Import necessary functions from Vue
import { register } from "swiper/element/bundle"; // Import Swiper registration
import apiService from '../../../../SitioVersion5/src/services/ApiService.ts'; // Import API service for data fetching
import { useModalStore } from "../../stores/Modal";
import { toKebabCase } from '@/utils'; // Import modal store for managing modals

/**
 * Asynchronously loads a component with a delay.
 * @returns {Promise<Object>} A promise that resolves to an empty object after 5 seconds.
 */
const loadComponent = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    },5000)
  })
}

register(); // Register Swiper components

export default defineComponent({
  props:{
    category: { type: String, default: '1' }, // Category prop with default value
    limit: { type: String, default: '20' }, // Limit prop with default value
    typelobby: { type: String, default: '0' }, // Type of lobby prop with default value
    top: { type: Boolean, default: false }, // Top prop to indicate if it's a top game
    decorationBar: { type: Boolean, default: true }, // Decoration bar visibility
    lowerCaseText: { type: Boolean, default: false }, // Lowercase text option
    title: { type: String, default: 'Top Casino' }, // Title prop with default value
    url: { type: String, default: '' }, // URL prop for navigation
    keySlide: { type: Number, default: 1000 }, // Key for slide identification
    styleVersion: { type: Number, default: 1 }, // Style version prop
    action: { type: String, default: 'getGames2' }, // Action prop for API call
    user: { type: Boolean, default: false }, // User prop to indicate user status
    type: { type: Number, default: 1 }, // Type prop to determine game type
    icon: {type: String, default : ''} // Icon prop for displaying an icon
  },
  async setup(){
    const dataComponent = ref(await loadComponent()) // Load component data asynchronously
    return{
      dataComponent // Return the loaded component data
    }
  },
  data(){
    let appComponent: any = this.$appComponent; // Reference to the app component
    let bgGame: any = {}; // Background game object
    let preloaderShow: boolean = false; // Preloader visibility state
    let modals = useModalStore(); // Modal store for managing modals
    let gamesList: any = []; // List of games
    let gameSelected: any = {}; // Selected game object
    let showGame: boolean = false; // State to show game details
    let src: string = ''; // Source string for images
    let margin: number = 0; // Margin value for layout
      const analyticsAttrs = {}; // Object to hold analytics attributes for tracking user interactions
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
        analyticsAttrs,
    };
  },
  mounted(){
    // Fetch games based on the type prop when the component is mounted
    if (this.type === 1) {
      this.getCasinoGames(); // Fetch casino games
    } else if (this.type === 2) {
      this.getCasinoGames2(); // Fetch alternative casino games
    }

      this.analyticsAttrs = {
          viewAll: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
              'data-analytics-context': `component:SliderCasino7|layout:${this.appComponent.config.layout}`
          },
          arrowPrev: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
              'data-analytics-context': `component:SliderCasino7|layout:${this.appComponent.config.layout}`
          },
          arrowNext: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
              'data-analytics-context': `component:SliderCasino7|layout:${this.appComponent.config.layout}`
          },
          game: (game: any) => ({
              'data-analytics-id': `${game.id}`,
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
              'data-analytics-position': `${this.gamesList.findIndex((g: any) => g.id === game.id) + 1}`,
              'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasino7|layout:${this.appComponent.config.layout}`,
          })
      }
  },
  methods:{
    /**
     * Fetches casino games from the API and updates the gamesList.
     */
    async getCasinoGames() {
      this.bgGame = {
        background:
            'url(' + this.appComponent.config.casino.preloaderGame + ')no-repeat 0 50%/cover', // Set background for preloader
      };
      this.preloaderShow = true; // Show preloader
      let optionsGames = {
        action: 'getGames2', // Action for API request
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Type of lobby
        limit: this.limit, // Limit of games to fetch
        category: this.category, // Category of games
        country: this.appComponent.country, // Country from app component
        isMobile: false, // Mobile flag
      };
      optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag based on app component
      await apiService
          .requestGet(
              this.appComponent.config.urlVirtualplay + '/cms/products/games/', // API endpoint
              optionsGames // Options for the API request
          )
          .then((response: any) => {
            var json = response.data; // Parse response data
            this.gamesList = json.games; // Update games list with fetched data
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
    /**
     * Fetches alternative casino games from the API and updates the gamesList.
     */
    async getCasinoGames2() {
      let optionsGames = {};
      optionsGames = {
        action: this.action, // Action for API request
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Type of lobby
        limit: 25, // Limit of games to fetch
        category: 'all', // Fetch all categories
        provider: 'all', // Fetch from all providers
        country: this.appComponent.country, // Country from app component
        isMobile: this.appComponent.mobile == '1', // Mobile flag
      };
      try {
        await apiService
            .requestGet(
                this.appComponent.config.urlVirtualplayPython
                    ? this.appComponent.config.urlVirtualplayPython
                    : 'https://gameservice.virtualsoft.tech/', // API endpoint
                optionsGames // Options for the API request
            )
            .then((response: any) => {
              this.gamesList = response.data.games; // Update games list with fetched data
            });
      } catch (e) {} // Handle errors silently
    },
  }
})
</script>

<template>
  <!-- Main section for displaying games if the gamesList is not empty -->
  <section
    v-if="gamesList.length > 0"
    class="flex flex-col justify-center items-center w-full bg-transparent"
  >
    <div class=" w-11/12 z-50 max-w-[1300px] md:max-w-[1400px]">
      <div class="in relative flex justify-between items-center mt-9">
        <div class="w-auto h-auto flex">
          <img v-if='icon' :src="icon" alt="" class="w-8 h-8 object-contain"> <!-- Display icon if available -->
          <div class="w-auto h-auto px-5">
            <h3
                class="uppercase font-bold text-xl mt-1"
                :class="textStyle == 2 ? 'text-primary-content' : 'text-success'"
                aria-label="Casino bets"
            >
              {{ $t(title) }} <!-- Display title -->
            </h3>
            <div
                class="h-1 w-full rounded-full"
                :class="textStyle == 2 ? 'bg-primary-content' : 'bg-success'"
            >
            </div>
          </div>
        </div>
        <div v-if="appComponent.config.layout != undefined" class="flex gap-2">
          <button
              class="cursor-pointer hover:scale-125"
              :class="'slidePrev' + title.replace(/ .*/,'') + keySlide"
                v-bind="analyticsAttrs.arrowPrev"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-left"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
          <button
              class="cursor-pointer hover:scale-125"
              :class="'slideNext'+ title.replace(/ .*/,'') + keySlide"
                v-bind="analyticsAttrs.arrowNext"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
        </div>
      </div>
      <div class="h-full w-full">
        <div class="w-full h-full flex items-center justify-center py-9 ml-9 relative "
             :class="appComponent.config != undefined && appComponent.config.mobileL == 1 || styleVersion == 2 || styleVersion == 3 || styleVersion == 4 ? 'before:content-[\'\'] before:absolute\n'+
                     'before:h-full before:w-[30px] before:top-0 before:right-0 before:bg-base-content before:z-10 ' +
                    'before:shadow-[-20px_0px_20px_10px] before:shadow-base-content' : ''">
          <!-- Swiper container for displaying game slides -->
          <swiper-container
              :slidesPerView="'auto'"
              :centeredSlides="false"
              :spaceBetween="10"
              :grabCursor="true"
              :navigation="{
							nextEl: '.slideNext' + title.replace(/ .*/,'') + keySlide,
							prevEl: '.slidePrev' + title.replace(/ .*/,'') + keySlide,
						}"
              :mousewheel="true"
              :mousewheel-force-to-axis="true"
              :free-mode="true"
              :direction="'horizontal'"
              :loop="true"
              class="mySwiper swiper-h w-full h-full flex justify-start items-center max-w-[1300px]"
          >
            <!-- Slide for each game in the gamesList -->
            <swiper-slide
                v-for="game in gamesList"
                :style="bgGame"
                :class="
                    styleVersion == 2
									? 'border-solid border-3 border-primary-content rounded-3xl h-32 w-[20rem] md:w-[25rem] mr-8 md:mr-14'
									: styleVersion == 3
									? 'w-[12rem] h-[10rem] md:w-[13rem] md:h-36 rounded-2xl mr-8 md:mr-5'
									: styleVersion == 4
									? ' w-[12rem] h-[10rem] md:w-[13rem] md:h-36 rounded-2xl mr-8 md:mr-5 border-solid border-3 border-primary-content'
									: 'h-32  mr-[2rem] rounded-xl w-[20rem]'
							"
                class="in relative  overflow-hidden inline-block "
            >
              <button
                  @click="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
                  class="relative w-full h-full"
                    v-bind="analyticsAttrs.game(game)"
              >
                <img
                    v-show="
										game.icon_2 != undefined &&
										game.icon_2 != null &&
										game.icon_2 != ''
									"
                    v-lazy="game.icon_2"
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
                    {{ game.name.toLowerCase() }} <!-- Display game name -->
                  </p>
                  <button
                      class="w-40 bg-secondary text-neutral text-xs lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
                      aria-label="Jugar ahora"
                      v-bind="analyticsAttrs.game(game)"
                  >
                    {{ $t('Jugar ahora') }} <!-- Button text -->
                  </button>
                </div>
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
        </div>
      </div>
    </div>
    <div class="w-full h-8 flex justify-end z-50 mr-8">
      <RouterLink
          v-if="url != undefined && url != ''"
          :to="url"
          class="w-44 h-auto rounded-full font-bold text-xl text-primary-content border-2 border-primary-content hover:text-neutral-content hover:bg-primary-content text-center"
            aria-label="Ver más juegos"
                v-bind="analyticsAttrs.viewAll"
      >
        {{$t('VER MÁS')}} <!-- Link to view more games -->
      </RouterLink>
    </div>
  </section>
</template>

<!-- FILE DOCUMENTED -->

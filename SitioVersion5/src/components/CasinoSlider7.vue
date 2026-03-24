<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import Vue composition API functions
import apiService from '@/services/ApiService'; // Import API service for making requests
import AppCarousel from '@/components/Carousel.vue'; // Import carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Import left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue'; // Import right chevron icon component
import ExitIcon from './icons/ExitIcon.vue'; // Import exit icon component
import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper and SwiperSlide components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/pagination'; // Import Swiper pagination CSS
import 'swiper/css/navigation'; // Import Swiper navigation CSS
import 'swiper/css/autoplay'; // Import Swiper autoplay CSS
import { register } from 'swiper/element/bundle';
import { toKebabCase } from '@/utils'; // Register Swiper elements
register(); // Register Swiper elements

export default defineComponent({
  props: {
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
    icon: { type: String, default: '' },
    textStyle: { type: Number, default: 1 }
  },
  components: {
    // Register local components
    AppCarousel,
    favoriteIcon,
    searchIcon,
    IconClose,
    animatedCloseIcon,
    IconChevronLeft,
    IconChevronRight,
    ExitIcon,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation], // Swiper modules for functionality
    };
  },
  data: function () {
    // Initialize component data
    let config = this.$config(); // Get configuration
    let appComponent: any = this.$appComponent; // Get app component reference
    let bgGame: any = {}; // Background game object
    let preloaderShow: boolean = false; // Preloader visibility flag
    let gamesList: any = []; // List of games
    let gameSelected: any = {}; // Selected game object
    let showGame: boolean = false; // Flag to show game details
    let src: string = ''; // Source URL for images
    let margin: number = 0; // Margin value for layout

      const analyticsAttrs = {
          viewAll: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
              'data-analytics-context': `component:CasinoSlider7|layout:${appComponent.config.layout}`
          },
          arrowPrev: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
              'data-analytics-context': `component:CasinoSlider7|layout:${appComponent.config.layout}`
          },
          arrowNext: {
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
              'data-analytics-context': `component:CasinoSlider7|layout:${appComponent.config.layout}`
          },
          game: (game: any) => ({
              'data-analytics-id': `${game.id}`,
              'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
              'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
              'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider7|layout:${appComponent.config.layout}`,
          })
      }

    return {
      config,
      appComponent,
      bgGame,
      preloaderShow,
      gamesList,
      gameSelected,
      showGame,
      src,
      margin,
        analyticsAttrs
    };
  },
  mounted() {
    // Lifecycle hook called after component is mounted
    if (this.type === 1) {
      this.getCasinoGames(); // Fetch casino games if type is 1
    } else if (this.type === 2) {
      this.getCasinoGames2(); // Fetch casino games if type is 2
    }
  },
  methods: {
    async getCasinoGames() {
      // Fetch casino games from API
      this.bgGame = {
        background:
            'url(' + this.config.casino.preloaderGame + ')no-repeat 0 50%/cover', // Set background image
      };
      this.preloaderShow = true; // Show preloader
      let optionsGames = {
        action: 'getGames2', // API action
        partner_id: this.appComponent.partner, // Partner ID
        offset: 0, // Pagination offset
        typelobby: this.typelobby, // Type of lobby
        limit: this.limit, // Limit of games to fetch
        category: this.category, // Game category
        country: this.appComponent.country, // User country
        isMobile: false, // Mobile flag
      };
      optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag based on app component
      await apiService
          .requestGet(
              this.config.urlVirtualplay + '/cms/products/games/', // API endpoint
              optionsGames // Request options
          )
          .then((response: any) => {
            var json = response.data; // Parse response data
            this.gamesList = json.games; // Set games list from response
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
      // Fetch casino games from a different API endpoint
      let optionsGames = {};
      if (this.appComponent.session.logueado && this.user) {
        optionsGames = {
          action: this.action, // API action
          partner_id: this.appComponent.partnerG, // Partner ID
          offset: 0, // Pagination offset
          typelobby: this.typelobby, // Type of lobby
          limit: 25, // Limit of games to fetch
          category: 'all', // Game category
          provider: 'all', // Game provider
          country: this.appComponent.country, // User country
          isMobile: this.appComponent.mobile == '1', // Mobile flag
          userId: this.appComponent.session.id_user, // User ID
        };
      } else {
        optionsGames = {
          action: this.action, // API action
          partner_id: this.appComponent.partnerG, // Partner ID
          offset: 0, // Pagination offset
          typelobby: this.typelobby, // Type of lobby
          limit: 25, // Limit of games to fetch
          category: 'all', // Game category
          provider: 'all', // Game provider
          country: this.appComponent.country, // User country
          isMobile: this.appComponent.mobile == '1', // Mobile flag
        };
      }
      try {
        await apiService
            .requestGet(
                this.appComponent.config.urlVirtualplayPython
                    ? this.appComponent.config.urlVirtualplayPython
                    : 'https://gameservice.virtualsoft.tech/', // API endpoint
                optionsGames // Request options
            )
            .then((response: any) => {
              this.gamesList = response.data.games; // Set games list from response
            });
      } catch (e) {} // Catch and ignore errors
    },
  },
});
</script>
<template>
  <section
      v-if="gamesList.length > 0"
      class="flex flex-col justify-center items-center w-full"
      :class="config.layout != undefined && config.layout == 4 || config.layout == 5 ? '' : 'bg-transparent'"
  >
    <div class=" w-11/12 z-50 max-w-[1300px] md:max-w-[1400px]"> <!-- Main container for games -->
      <div class="in relative flex justify-between items-center mt-9"> <!-- Header container -->
        <div class="w-auto h-auto flex"> <!-- Icon and title container -->
          <img v-if='icon' :src="icon" alt="" class="w-8 h-8 object-contain"> <!-- Conditional icon display -->
          <div class="w-auto h-auto px-5"> <!-- Title container -->
            <h3
                class="uppercase font-bold text-xl mt-1"
                :class="textStyle == 2 ? 'text-primary-content' : 'text-success'"
                aria-label="Casino bets"
            >
              {{ $t(title) }} <!-- Title text -->
            </h3>
            <div
                class="h-1 w-full rounded-full"
                :class="textStyle == 2 ? 'bg-primary-content' : 'bg-success'"
            >
            </div>
          </div>
        </div>
        <div v-if="config.layout != undefined" class="flex gap-2"> <!-- Navigation buttons container -->
          <button
              class="cursor-pointer hover:scale-125"
              :class="'slidePrev' + title.replace(/ .*/,'') + keySlide"
                aria-label="Left"
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
                aria-label="Right"
                v-bind="analyticsAttrs.arrowNext"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
        </div>
      </div>
      <div class="h-full w-full"> <!-- Container for Swiper -->
        <div class="w-full h-full flex items-center justify-center py-9 ml-9 relative "
              :class="config != undefined && config.mobileL == 1 || styleVersion == 2 || styleVersion == 3 || styleVersion == 4 ? 'before:content-[\'\'] before:absolute\n'+
                     'before:h-full before:w-[30px] before:top-0 before:right-0 before:bg-base-content before:z-10 ' +
                    'before:shadow-[-20px_0px_20px_10px] before:shadow-base-content' : ''"> <!-- Conditional styling for layout -->
          <button
              v-if="config.layout != undefined && config.layout == 4 || config.layout == 5"
              class="cursor-pointer hover:scale-125 ml-0 lg:ml-3"
              :class="'slidePrev'+ title.replace(/ .*/,'') + keySlide"
                aria-label="Left"
                v-bind="analyticsAttrs.arrowPrev"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-left"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
          <swiper-container
              :slidesPerView="'auto'"
              :centeredSlides="false"
              :spaceBetween="10"
              :grabCursor="true"
              :modules="modules"
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
                  @click="
									gamesList.idSelect = game.id;
									appComponent.openGame(game);
									$event.stopPropagation();
									appComponent.gAnalytics('play_casino', {...game, action: type === 1 ? 'getGames2' : action});
								"
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
                    class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
                >
                  <p
                      class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
                  >
                    {{ game.name.toLowerCase() }}
                  </p>
                  <div class="relative w-30 md:w-32 h-8">
										  <!-- Borde degradado desplazado -->
										  <div
										    class="absolute inset-0 translate-x-1 translate-y-1 bg-gradient-to-r from-primary to-primary-content rounded-lg"
										  ></div>

										  <!-- Botón principal -->
										  <button
										    class="relative w-full h-full bg-primary text-neutral text-xs lg:text-md rounded-lg font-bold uppercase flex justify-center items-center gap-1 md:gap-2 shadow-sm transition-transform"
										    aria-label="Jugar ahora"
                                            v-bind="analyticsAttrs.game(game)"
										  >
										    {{ $t('Jugar ahora') }}
										    <svg
                                            class="w-3.5 h-3.5"
										      viewBox="0 0 11 14"
										      fill="none"
										      xmlns="http://www.w3.org/2000/svg"
										    >
										      <path
										        d="M0 12.175V1.82495C0 1.54162 0.1 1.30412 0.3 1.11245C0.5 0.920785 0.733333 0.824951 1 0.824951C1.08333 0.824951 1.17083 0.837451 1.2625 0.862451C1.35417 0.887451 1.44167 0.924951 1.525 0.974951L9.675 6.14995C9.825 6.24995 9.9375 6.37495 10.0125 6.52495C10.0875 6.67495 10.125 6.83328 10.125 6.99995C10.125 7.16662 10.0875 7.32495 10.0125 7.47495C9.9375 7.62495 9.825 7.74995 9.675 7.84995L1.525 13.025C1.44167 13.075 1.35417 13.1125 1.2625 13.1375C1.17083 13.1625 1.08333 13.175 1 13.175C0.733333 13.175 0.5 13.0791 0.3 12.8875C0.1 12.6958 0 12.4583 0 12.175Z"
										        fill="currentColor"
										      />
										    </svg>
										  </button>
										</div>
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
          <button
              v-if="config.layout != undefined && config.layout == 4 || config.layout == 5"
              aria-label="Right"
              class="cursor-pointer hover:scale-125 mr-0 lg:mr-3"
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
    </div>
    <div class="w-full h-8 flex justify-end z-50 mr-8"> <!-- Link to view more games -->
      <RouterLink
          v-if="url != undefined && url != ''"
          :to="url"
          class="w-44 h-auto rounded-full font-bold text-xl text-primary-content border-2 border-primary-content hover:text-neutral-content hover:bg-primary-content text-center"
            aria-label="View more games"
            v-bind="analyticsAttrs.viewAll"
      > <!-- Link styling -->
        {{$t('VER MÁS')}} <!-- Link text -->
      </RouterLink>
    </div>
  </section>
</template>

<!-- FILE DOCUMENTED -->

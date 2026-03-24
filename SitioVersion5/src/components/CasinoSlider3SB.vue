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
import 'swiper/css'; // Import Swiper CSS for styling
import 'swiper/css/pagination'; // Import Swiper pagination CSS
import 'swiper/css/navigation'; // Import Swiper navigation CSS
import 'swiper/css/autoplay'; // Import Swiper autoplay CSS
import { nextTick } from '@vue/runtime-dom'; // Import nextTick for DOM updates
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules
import { register } from 'swiper/element/bundle'; // Register Swiper elements
import router from '@/router';
import { toKebabCase } from '@/utils'; // Import router for navigation
register(); // Register Swiper components

export default defineComponent({
    props: {
        category: { type: String, default: '1' }, // Category prop with default value
        limit: { type: String, default: '25' }, // Limit prop with default value
        typelobby: { type: String, default: '0' }, // Type lobby prop with default value
        top: { type: Boolean, default: false }, // Top prop to indicate if it's a top game
        title: { type: String, default: 'Games' }, // Title prop with default value
        keySlide: { type: Number, default: Math.floor(Math.random() * 1000) }, // Unique key for slides
        url: { type: String, default: '' }, // URL prop for navigation
        action: { type: String, default: 'getGames2' }, // Action prop for API calls
        user: { type: Boolean, default: false }, // User prop to check if user is logged in
        type: { type: Number, default: 1 }, // Type prop to determine game type
    },
    components: {
        AppCarousel,
        favoriteIcon,
        searchIcon,
        IconClose,
        animatedCloseIcon,
        IconChevronLeft,
        IconChevronRight,
        ExitIcon,
    },
    setup() {
        return { modules: [Autoplay, Pagination, Navigation] }; // Return Swiper modules for use
    },
    data: function() {
        let config = this.$config(); // Retrieve configuration
        let appComponent: any = this.$appComponent; // Reference to app component
        let bgGame: any = {}; // Background game object
        let preloaderShow: boolean = false; // Preloader visibility state
        let gamesList: any = []; // List of games
        let gameSelected: any = {}; // Selected game object
        let showGame: boolean = false; // State to show game details
        let src: string = ''; // Source for images
        let margin: number = 0; // Margin value for layout

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:CasinoSlider3SB|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:CasinoSlider3SB|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:CasinoSlider3SB|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider3SB|layout:${appComponent.config.layout}`,
            })
        };

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
            analyticsAttrs,
        };
    },
    mounted() {
        // Lifecycle hook to fetch games based on type
        if (this.type === 1) {
            this.getCasinoGames(); // Fetch casino games
        } else if (this.type === 2) {
            this.getCasinoGames2(); // Fetch alternative casino games
        }
        let count = 0; // Counter for interval
        const intervalSwiper = setInterval(() => {
            count++;
            try {
                const swiperEl = document.querySelector(
                    '.swiper-container-games-' + this.keySlide,
                ) as any; // Select Swiper element
                if (swiperEl || count > 10) {
                    clearInterval(intervalSwiper); // Clear interval if element is found or count exceeds 10
                    const buttonNext = document.querySelector(
                        '.slideNext' + this.keySlide,
                    ); // Select next button
                    const buttonPrev = document.querySelector(
                        '.slidePrev' + this.keySlide,
                    ); // Select previous button
                    buttonPrev?.addEventListener('click', function(e) {
                        e.preventDefault(); // Prevent default action
                        swiperEl?.swiper.slidePrev(); // Slide to previous
                    });
                    buttonNext?.addEventListener('click', function(e) {
                        e.preventDefault(); // Prevent default action
                        swiperEl?.swiper.slideNext(); // Slide to next
                    });
                }
            } catch (e) {
                console.log(e); // Log any errors
            }
        }, 1000); // Run every second
    },

  unmounted(){},
    methods: {
        goTo() {
            router.push(this.url); // Navigate to the specified URL
        },
        getCasinoGames() {
            this.preloaderShow = true; // Show preloader
            let optionsGames = {
                action: 'getGames2', // Action for API call
                partner_id: this.appComponent.partner, // Partner ID from app component
                offset: 0, // Offset for pagination
                typelobby: this.typelobby, // Type lobby
                limit: this.limit, // Limit of games to fetch
                category: this.category, // Category of games
                country: this.appComponent.country, // Country from app component
                isMobile: false, // Mobile flag
            };
            optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag based on app component
            apiService
                .requestGet(
                    this.config.urlVirtualplay + '/cms/products/games/',
                    optionsGames,
                )
                .then((response: any) => {
                    let json = response.data; // Parse response data
                    this.gamesList = json.games; // Set games list from response
                });
        },
        async getCasinoGames2() {
            let optionsGames = {}; // Initialize options for API call
            if (this.appComponent.session.logueado && this.user) {
                optionsGames = {
                    action: this.action, // Action for API call
                    partner_id: this.appComponent.partnerG, // Partner ID from app component
                    offset: 0, // Offset for pagination
                    typelobby: this.typelobby, // Type lobby
                    limit: 25, // Limit of games to fetch
                    category: 'all', // Fetch all categories
                    provider: 'all', // Fetch all providers
                    country: this.appComponent.country, // Country from app component
                    isMobile: this.appComponent.mobile == '1', // Mobile flag
                    userId: this.appComponent.session.id_user, // User ID from session
                };
            } else {
                optionsGames = {
                    action: this.action, // Action for API call
                    partner_id: this.appComponent.partnerG, // Partner ID from app component
                    offset: 0, // Offset for pagination
                    typelobby: this.typelobby, // Type lobby
                    limit: 25, // Limit of games to fetch
                    category: 'all', // Fetch all categories
                    provider: 'all', // Fetch all providers
                    country: this.appComponent.country, // Country from app component
                    isMobile: this.appComponent.mobile == '1', // Mobile flag
                };
            }
            try {
                await apiService
                    .requestGet(
                        this.appComponent.config.urlVirtualplayPython
                            ? this.appComponent.config.urlVirtualplayPython
                            : 'https://gameservice.virtualsoft.tech/',
                        optionsGames,
                    )
                    .then((response: any) => {
                        this.gamesList = response.data.games; // Set games list from response
                    });
            } catch (e) {
            }
        },
    },
});
</script>
<template>
    <section class="container"> <!-- Main container for the component -->
        <div
            v-if="gamesList.length !== undefined && gamesList.length > 0"
            class="content"
        >
            <div class="headerComponent"> <!-- Header section for the component -->
                <h3 class="title"> <!-- Title of the section -->
                    <RouterLink :to="url"> <!-- Router link for navigation -->
                        {{ $t(title) }} <!-- Translated title -->
                    </RouterLink>
                </h3>
                <div
                    class="separador absolute w-12 h-1 bg-accent bottom-0 rounded-full"
                ></div>
                <div class="arrows append-buttons"> <!-- Container for navigation buttons -->
                    <button
                        aria-label="Left"
                        id="swiper-button-prev"
                        :class="'slidePrev' + keySlide"
                        v-bind="analyticsAttrs.arrowPrev"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L10.8 12Z"
                            />
                        </svg> <!-- Placeholder for SVG icon -->
                    </button>
                    <button
                        aria-label="Right"
                        id="swiper-button-next"
                        :class="'slideNext' + keySlide"
                        v-bind="analyticsAttrs.arrowNext"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l3.9-3.9Z"
                            />
                        </svg> <!-- Placeholder for SVG icon -->
                    </button>
                </div>
            </div>
            <swiper-container
                id="swiper-container-games"
                class="mySwiper"
                :class="'swiper-container-games-' + keySlide"
                :slides-per-view="'auto'"
                :centered-slides="false"
                :space-between="10"
                :modules="modules"
                :navigation="{
					nextEl: '.slideNext' + keySlide,
					prevEl: '.slidePrev' + keySlide,
				}"
                :keyboard="true"
                :mousewheel="true"
                :mousewheel-force-to-axis="true"
                :direction="'horizontal'"
                :loop="true"
            >
                <swiper-slide v-for="game in gamesList" class="swiper-slide-games"> <!-- Loop through games list -->
                    <button
                        @click="
							gamesList.idSelect = game.id;
							appComponent.openGame(game);
							appComponent.gAnalytics('play_casino', {...game, action: 'getGames2 - Sportbook'});
							$event.stopPropagation();
						"
                        class="slideButton"
                        v-bind="analyticsAttrs.game(game)"
                    >
                        <img
                            v-show="
								game.icon_3 != undefined &&
								game.icon_3 != null &&
								game.icon_3 != ''
							"
                            :src="game.icon_3"
                            class="imgGame"
                        />
                      <!--
                        Displays total players and table status ("En juego" / "Cerrado") if available in `dgaDataMap` for the game.
                        Player count: prefers `totalSeatedPlayers`, then `numberOfPlayers`, defaults to '0'.
                        Styled at bottom-left with gradient background and small text.
                      -->
                      <div
                          v-if="appComponent.dgaDataMap != undefined && appComponent.dgaDataMap[game.front_game_id] != undefined && appComponent.dgaDataMap[game.front_game_id]"
                          class="absolute z-20 bottom-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r from-black/30 to-black/50 text-white backdrop-blur-md shadow-md text-[11px] leading-tight space-y-0.5 min-w-[60px]"
                      >
                        <div class="flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          <span class="font-semibold">
                                              {{
                              appComponent.dgaDataMap[game.front_game_id].totalSeatedPlayers
                              ?? appComponent.dgaDataMap[game.front_game_id].numberPlayers
                              ?? '0'
                            }}
                                        </span>
                        </div>
                        <div
                            :class="{
                        'text-green-300 font-medium': appComponent.dgaDataMap[game.front_game_id].tableOpen,
                        'text-red-400 font-medium': !appComponent.dgaDataMap[game.front_game_id].tableOpen
                      }"
                        >
                          {{
                            appComponent.dgaDataMap[game.front_game_id].tableOpen
                                ? $t('En juego')
                                : $t('Cerrado')
                          }}
                        </div>
                      </div>
                        <div class="infoGame"> <!-- Container for game information -->
                            <p>
                                {{ game.name.toLowerCase() }} <!-- Game name in lowercase -->
                            </p>
                            <button
                                v-bind="analyticsAttrs.game(game)">
                                {{ $t('Jugar ahora') }} <!-- Button text for playing now -->
                            </button>
                        </div>
                        <span v-if="top" class="top bg-accent">{{ $t('TOP') }}</span> <!-- Conditional rendering for top label -->
                    </button>
                </swiper-slide>
            </swiper-container>
        </div>
    </section>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

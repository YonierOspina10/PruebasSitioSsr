<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppCarousel from '@/components/Carousel.vue'; // Importing the carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Importing the favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Importing the search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Importing the close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Importing the animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Importing the left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue'; // Importing the right chevron icon component
import ExitIcon from './icons/ExitIcon.vue'; // Importing the exit icon component
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper components for carousel functionality
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importing Swiper modules for additional features
import 'swiper/css'; // Importing Swiper CSS
import 'swiper/css/pagination'; // Importing Swiper pagination CSS
import 'swiper/css/navigation'; // Importing Swiper navigation CSS
import 'swiper/css/autoplay'; // Importing Swiper autoplay CSS
import { register } from 'swiper/element/bundle';
import { toKebabCase } from '@/utils'; // Registering Swiper elements
register(); // Registering Swiper elements for use

export default defineComponent({
	props: {
		// Defining component props with default values
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
	},
	components: {
		// Registering local components
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
		// Setting up the component with Swiper modules
		return {
			modules: [Autoplay, Pagination, Navigation],
		};
	},
	data: function () {
		// Defining component data properties
		let config = this.$config(); // Accessing configuration
		let appComponent: any = this.$appComponent; // Accessing application component
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Preloader visibility state
		let gamesList: any = []; // List of games
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // State to show game details
		let src: string = ''; // Source URL for game
		let margin: number = 0; // Margin value for layout

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:CasinoSlider5|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:CasinoSlider5|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:CasinoSlider5|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider5|layout:${appComponent.config.layout}`,
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
            analyticsAttrs,
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		if (this.type === 1) {
			this.getCasinoGames(); // Fetch casino games if type is 1
		} else if (this.type === 2) {
			this.getCasinoGames2(); // Fetch casino games if type is 2
		}
	},
	methods: {
		// Defining component methods
		async getCasinoGames() {
			// Method to fetch casino games
			this.bgGame = {
				background:
					'url(' +
					this.config.casino.preloaderGame +
					')no-repeat 0 50%/cover', // Setting background for preloader
			};
			this.preloaderShow = true; // Show preloader
			let optionsGames = {
				// Options for API request
				action: 'getGames2',
				partner_id: this.appComponent.partner,
				offset: 0,
				typelobby: this.typelobby,
				limit: this.limit,
				category: this.category,
				country: this.appComponent.country,
				isMobile: false,
			};
			optionsGames.isMobile = this.appComponent.mobile == '1'; // Determine if mobile
			await apiService
				.requestGet(
					this.config.urlVirtualplay + '/cms/products/games/',
					optionsGames
				)
				.then((response: any) => {
					var json = response.data; // Parse response data
					this.gamesList = json.games; // Set games list from response
					Array.prototype.forEach.call(
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							// Hide preloader elements
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none';
						}
					);
				});
		},
		async getCasinoGames2() {
			// Method to fetch casino games with different parameters
			let optionsGames = {};
			if (this.appComponent.session.logueado && this.user) {
				// If user is logged in
				optionsGames = {
					action: this.action,
					partner_id: this.appComponent.partnerG,
					offset: 0,
					typelobby: this.typelobby,
					limit: 25,
					category: 'all',
					provider: 'all',
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user, // Include user ID
				};
			} else {
				// If user is not logged in
				optionsGames = {
					action: this.action,
					partner_id: this.appComponent.partnerG,
					offset: 0,
					typelobby: this.typelobby,
					limit: 25,
					category: 'all',
					provider: 'all',
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
				};
			}
			try {
				await apiService
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						optionsGames
					)
					.then((response: any) => {
						this.gamesList = response.data.games; // Set games list from response
					});
			} catch (e) {
				// Handle errors silently
			}
		},
	},
});
</script>
<template>
	<!-- Section for displaying a list of games if available -->
	<section
		v-if="gamesList.length > 0"
		class="flex justify-center items-center w-full"
	>
		<!-- Container for the game list, responsive width -->
		<div class="w-[90%] lg:w-full">
			<!-- Header for the game list -->
			<div class="in relative flex justify-between items-center">
				<h3
					:class="[
						lowerCaseText
							? 'capitalize font-light'
							: 'uppercase font-bold',
					]"
					class="text-neutral text-xl mt-1 border-solid border-b-2 border-neutral flex flex-row justify-start items-center gap-x-2 w-full"
					aria-label="Casino bets"
				>
					{{ $t(title) }}
					<!-- Icon displayed next to the title if available -->
					<img
						v-if="icon"
						:src="icon"
						alt=""
						class="w-8 h-8 object-contain"
					/>
				</h3>
			</div>
			<!-- Main container for the game items -->
			<div class="h-full w-full">
				<div
					class="w-full h-full flex items-center justify-between flex-row p-1 my-2"
				>
					<!-- Button for sliding to the previous game -->
					<button
						class="cursor-pointer hover:scale-125 ml-0 lg:ml-3"
						:class="'slidePrev' + keySlide"
                        v-bind="analyticsAttrs?.arrowPrev"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-left"
							class="text-neutral/50 text-2xl hover:text-neutral"
						/>
					</button>
					<!-- Swiper container for the game slides -->
					<swiper-container
						:slidesPerView="'auto'"
						:centeredSlides="false"
						:spaceBetween="10"
						:grabCursor="true"
						:modules="modules"
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
						<!-- Slide for each game in the games list -->
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
							<!-- Button to interact with the game -->
							<button
								@click="
									gamesList.idSelect = game.id;
									appComponent.openGame(game);
									$event.stopPropagation();
									appComponent.gAnalytics('play_casino', {
										...game,
										action:
											type === 1 ? 'getGames2' : action,
									});
								"
								class="relative w-full h-full"
                                v-bind="analyticsAttrs.game(game)"
							>
								<!-- Game icon displayed if available -->
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
								<!-- Overlay with game name and action button -->
								<div
									class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
								>
									<p
										class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
									>
										{{ game.name.toLowerCase() }}
									</p>
									<!-- Button to play the game -->
									<button
										class="w-40 bg-accent-focus text-neutral text-xs lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
										aria-label="Jugar ahora"
                                        v-bind="analyticsAttrs.game(game)"
									>
										{{ $t('Jugar ahora') }}
									</button>
								</div>
								<!-- Top label displayed if applicable -->
								<span
									v-if="top"
									class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
									>{{ $t('TOP') }}</span
								>
								<!-- Tag image displayed if available -->
								<img
									v-if="
										game.TagImage != undefined &&
										game.TagImage != null &&
										game.TagImage != ''
									"
									:src="game.TagImage"
									width="60"
									height="60"
									:class="[
										'absolute left-0 top-0',
										'text-black text-sm font-bold',
										'pb-[1px] z-30  w-[60px] h-[60px]',
										'object-contain flex justify-center',
										'items-center',
									]"
									alt="Etiqueta"
								/>
								<!-- Tag text displayed if TagImage is not available -->
								<span
									v-else-if="
										game.TagText != undefined &&
										game.TagText != null &&
										game.TagText != ''
									"
									:class="[
										'absolute left-0 top-0 m-1 text-black',
										'text-sm font-bold pb-[1px] z-30',
										'w-auto h-auto flex justify-center items-center',
										'max-w-2xl overflow-hidden',
									]"
									v-html="game.TagText"
								></span>
							</button>
						</swiper-slide>
					</swiper-container>
					<!-- Button for sliding to the next game -->
					<button
						aria-label="Right"
						class="cursor-pointer hover:scale-125 mr-0 lg:mr-3"
						:class="'slideNext' + keySlide"
                        v-bind="analyticsAttrs?.arrowNext"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-right"
							class="text-neutral/50 text-2xl hover:text-neutral"
						/>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
/* Hide the scrollbar for the .slider-casino element in WebKit browsers */
.slider-casino::-webkit-scrollbar {
	display: none;
}

/* Change the color of the first child element of .arrow on hover */
.arrow:hover :nth-child(1) {
	color: white;
}
</style>

<!-- FILE DOCUMENTED -->

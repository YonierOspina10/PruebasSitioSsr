<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import apiService from '@/services/ApiService'; // Import API service for data fetching
import AppCarousel from '@/components/Carousel.vue'; // Import carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Import left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue'; // Import right chevron icon component
import ExitIcon from './icons/ExitIcon.vue'; // Import exit icon component
import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper components for carousel functionality
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules for additional features
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/pagination'; // Import Swiper pagination CSS
import 'swiper/css/navigation'; // Import Swiper navigation CSS
import 'swiper/css/autoplay'; // Import Swiper autoplay CSS
import { register } from 'swiper/element/bundle'; // Register Swiper elements
import IconUser from '@/components/icons/IconUser.vue'; // Import user icon component
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils'; // Import Vue Router for route handling
register(); // Register Swiper elements

export default defineComponent({
	props: {
		category: { type: String, default: '1' }, // Category prop with default value
		limit: { type: String, default: '20' }, // Limit prop with default value
		typelobby: { type: String, default: '0' }, // Type of lobby prop with default value
		top: { type: Boolean, default: false }, // Top prop to indicate if it's a top game
		decorationBar: { type: Boolean, default: true }, // Decoration bar visibility prop
		lowerCaseText: { type: Boolean, default: false }, // Lowercase text prop
		title: { type: String, default: 'Top Casino' }, // Title prop with default value
		url: { type: String, default: '' }, // URL prop
		keySlide: { type: Number, default: 1000 }, // Key for slide identification
		styleVersion: { type: Number, default: 1 }, // Style version prop
		action: { type: String, default: 'getGames2' }, // Action prop for API calls
		user: { type: Boolean, default: false }, // User prop to indicate user status
		type: { type: Number, default: 1 }, // Type prop for game type
		icon: { type: String, default: '' }, // Icon prop for displaying an icon
	},
	components: {
		IconUser, // Register user icon component
		AppCarousel, // Register carousel component
		favoriteIcon, // Register favorite icon component
		searchIcon, // Register search icon component
		IconClose, // Register close icon component
		animatedCloseIcon, // Register animated close icon component
		IconChevronLeft, // Register left chevron icon component
		IconChevronRight, // Register right chevron icon component
		ExitIcon, // Register exit icon component
		Swiper, // Register Swiper component
		SwiperSlide, // Register SwiperSlide component
	},
	setup() {
		const route = useRoute(); // Get current route
		return {
			route, // Return route for use in template
			modules: [Autoplay, Pagination, Navigation], // Return Swiper modules for use
		};
	},
	data: function () {
		let config = this.$config(); // Get configuration
		let appComponent: any = this.$appComponent; // Get app component
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Preloader visibility state
		let gamesList: any = []; // List of games
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // State to show game details
		let src: string = ''; // Source URL for images
		let margin: number = 0; // Margin value

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:CasinoSlider3|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:CasinoSlider3|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:CasinoSlider3|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.game)}|component:CasinoSlider3|layout:${appComponent.config.layout}`,
            })
        }

		return {
			config, // Return config
			appComponent, // Return app component
			bgGame, // Return background game object
			preloaderShow, // Return preloader visibility state
			gamesList, // Return list of games
			gameSelected, // Return selected game object
			showGame, // Return show game state
			src, // Return source URL
			margin, // Return margin value
            analyticsAttrs // Return analytics attributes for tracking
		};
	},
	mounted() {
		if (this.type === 1) { // Check if type is 1
			this.getCasinoGames(); // Fetch casino games
		} else if (this.type === 2) { // Check if type is 2
			this.getCasinoGames2(); // Fetch alternative casino games
		}
	},
	methods: {
		async getCasinoGames() {
			this.bgGame = { // Set background game style
				background:
					'url(' +
					this.config.casino.preloaderGame +
					')no-repeat 0 50%/cover',
			};
			this.preloaderShow = true; // Show preloader
			let optionsGames = { // Options for API request
				action: 'getGames2',
				partner_id: this.appComponent.partner,
				offset: 0,
				typelobby: this.typelobby,
				limit: this.limit,
				category: this.category,
				country: this.appComponent.country,
				isMobile: false,
			};
      if (this.appComponent.session.logueado) { // Check if user is logged in
        optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
      }
			optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag
			await apiService // Make API request
				.requestGet(
					this.config.urlVirtualplay + '/cms/products/games/',
					optionsGames
				)
				.then((response: any) => {
					var json = response.data; // Get response data
					this.gamesList = json.games; // Set games list from response
					Array.prototype.forEach.call( // Hide preloader elements
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
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
			let optionsGames = {}; // Initialize options for API request
			if (this.appComponent.session.logueado && this.user) { // Check if user is logged in and user prop is true
				optionsGames = { // Set options for logged in user
					action: this.action,
					partner_id: this.appComponent.partnerG,
					offset: 0,
					typelobby: this.typelobby,
					limit: 25,
					category: 'all',
					provider: 'all',
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user,
				};
			} else { // For non-logged in users
				optionsGames = { // Set options for non-logged in user
					action: this.action,
					partner_id: this.appComponent.partnerG,
					offset: 0,
					typelobby: this.typelobby,
					limit: 25,
					category: 'all',
					provider: 'all',
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1'
				};
			}
      if (this.appComponent.session.logueado) { // Check if user is logged in
        optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false; // Set test user flag
      }
			try {
				await apiService // Make API request
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						optionsGames
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
	<!-- Main container for the casino section, visible only if certain features are enabled -->
	<div v-if="appComponent.casinoEnabled && appComponent.liveCasinoEnabled && appComponent.virtualesEnabled">
		<!-- Section for displaying games if the games list is not empty -->
		<section
			v-if="gamesList.length > 0"
			class="flex justify-center items-center w-full py-2"
			:class="
				(config.layout != undefined && config.layout == 4) ||
				config.layout == 5
					? ''
					: 'bg-transparent'
			"
		>
			<div
				:class="
					config.layout != undefined && config.layout == 4
						? 'w-[90%] lg:w-full'
						: 'max-w-[1300px] w-11/12 z-30'
				"
			>
				<!-- Header section for the games display -->
				<div
					class="in relative flex justify-between items-center"
					:class="
						config.layout != undefined && config.layout == 4
							? 'pl-[9%] md:pl-[3%]'
							: ''
					"
				>
				<div class="w-auto h-auto flex flex-col mb-4">
                    <div class="w-auto h-auto py-1 flex gap-3">
                        <!-- Conditional rendering of the icon -->
                        <img
							v-if="icon != undefined && icon != ''"
                            :src=icon
                            alt=""
                            class="w-8 h-8 object-contain"
                        />
                        <!-- Title of the section -->
                        <h3
						:class="[
							lowerCaseText
								? 'capitalize font-light'
								: 'uppercase font-bold',
							{
								'flex flex-row justify-center items-center gap-x-2':
									config.layout != undefined &&
									config.layout == 4,
								'flex flex-row gap-10': config.layout == 5,
							},
						]"
						class="text-xl mt-1 text-info-text"
						aria-label="Casino bets"
					>
						{{ $t(title) }} <!-- Display title -->
					</h3>
                    </div>
                    <!-- Underline for the title -->
                    <div
						v-if="decorationBar && config.layout != 4"
						class="h-1 w-full rounded-full bg-accent"
						
					></div>
                </div>
					<!-- Navigation buttons for the carousel -->
					<div
						v-if="
							config.layout == undefined ||
							(config.layout != undefined && config.layout != 4)
						"
						class="flex gap-2"
						:class="
							config.layout != undefined && config.layout == 4
								? ' w-full justify-between px-3'
								: ''
						"
					>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slidePrev' + keySlide"
                            v-bind="analyticsAttrs.arrowPrev"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-left"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slideNext' + keySlide"
                            v-bind="analyticsAttrs.arrowNext"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-right"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
					</div>
				</div>
				<!-- Container for the games display -->
				<div class="h-full w-full">
					<div
						class="w-full h-full flex items-center"
						:class="
							config.layout != undefined && config.layout == 4
								? 'justify-between flex-row p-1 my-2'
								: 'justify-center py-2'
						"
					>
						<button
							v-if="
								config.layout != undefined && config.layout == 4
							"
							class="cursor-pointer hover:scale-125 ml-0 lg:ml-3"
							:class="'slidePrev' + keySlide"
                            v-bind="analyticsAttrs.arrowPrev"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-left"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
						<!-- Swiper container for the games -->
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
							class="mySwiper swiper-h w-full h-full flex justify-start items-center"
							:class="
								config.layout != undefined && config.layout == 4
									? 'px-[2%] md:px-[2%] gap-x-8 max-w-[91%] md:max-w-[97%]'
									: 'max-w-[1300px]'
							"
						>
							<!-- Swiper slide for each game in the games list -->
							<swiper-slide
								v-for="game in gamesList"
								:style="bgGame"
								:class="
									styleVersion == 2
										? 'border-solid border-2 border-[#3d4958] w-40 h-40 mr-14'
										: styleVersion == 3
										? 'w-[7.6rem] h-[5.4rem] md:w-[13rem] md:h-36 border-solid border-1 border-primary mr-8 md:mr-5'
										: 'h-48 w-48 mr-2'
								"
								class="in relative rounded-xl overflow-hidden inline-block mr-2"
							>
								<!-- Display player count if applicable -->
								<div
									v-if="
										appComponent.config != undefined &&
										appComponent.config.wsGeneral !=
											undefined &&
										appComponent.config.wsGeneral
											.tableIds != undefined &&
										appComponent.config.wsGeneral.tableIds.includes(
											game.front_game_id
										)
									"
									v-for="pg in appComponent.peopleInGames"
									class="absolute left-0 top-2 w-20 h-6 bg-neutral-content/20 rounded-r-full shadow-[0px_3px_5px_0px_#030303ad] z-[9999999] flex justify-center items-center"
								>
								</div>
								<!-- Button to open game details -->
								<button
									@click="
										gamesList.idSelect = game.id;
										appComponent.openGame(game);
										$event.stopPropagation();
										appComponent.gAnalytics(
											route.path.includes(
												'/live-casino-vivo'
											)
												? 'play_now_live'
												: 'play_casino',
											{
												...game,
												action:
													type === 1
														? 'getGames2' +
														  (route.path.includes(
																'/home'
														  )
																? ' - Home'
																: '')
														: action,
											}
										);
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
									<div
										:class="
											styleVersion == 4
												? 'hover:bg-base-content/70 hover:border-3 hover:border-accent hover:rounded-xl hover:backdrop-blur-sm'
												: 'hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105'
										"
										class="z-10 hover:z-20 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
									>
										<p
											class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
										>
											{{ game.name.toLowerCase() }} <!-- Display game name -->
										</p>
										<div class="relative w-40 h-10">
										  <!-- Borde degradado desplazado -->
										  <div
										    class="absolute inset-0 translate-x-1 translate-y-1 bg-gradient-to-r from-primary to-primary-content rounded-lg"
										  ></div>

										  <!-- Botón principal -->
										  <button
										    class="relative w-full h-full bg-primary text-neutral text-xs lg:text-base rounded-lg font-bold uppercase flex justify-center items-center gap-2 shadow-sm transition-transform"
										    aria-label="Jugar ahora"
                                            v-bind="analyticsAttrs.game(game)"
										  >
										    {{ $t('Jugar ahora') }}
										    <svg
										      width="11"
										      height="14"
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
						<button
							v-if="
								config.layout != undefined && config.layout == 4
							"
							aria-label="Right"
							class="cursor-pointer hover:scale-125 mr-0 lg:mr-3"
							:class="'slideNext' + keySlide"
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
		</section>
	</div>
</template>
<style scoped>
/* Hide the scrollbar for the slider */
.slider-casino::-webkit-scrollbar {
	display: none;
}
/* Change color of the arrow on hover */
.arrow:hover :nth-child(1) {
	color: white;
}
</style>

<!-- FILE DOCUMENTED -->

<template>
	<!-- Main section for displaying the game slider, centered on the page -->
	<section class="flex justify-center items-center w-full my-6"
	:class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': ''"
 >
		
		<!-- Conditional rendering based on isVisible property -->
		<div
			v-if="isVisible"
			class="flex flex-col justify-center items-center gap-0 w-11/12 max-w-[1300px]"
		>
			<!-- Header section with title and navigation buttons -->
			<div class="in w-full flex justify-between items-end mb-1 z-20">
				<div class="w-full flex justify-start items-center gap-1">
					<h3 class="in uppercase text-neutral text-xl mt-1 font-bold">
						{{ $t(data.title) }}
					</h3>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 24 24"
						class="fill-primary"
					>
						<path
							d="m15.35 20l-1.95 1.925q-.575.575-1.4.575t-1.4-.575L8.65 20H6q-.825 0-1.413-.588T4 18v-2.65L2.075 13.4Q1.5 12.825 1.5 12t.575-1.4L4 8.65V6q0-.825.588-1.413T6 4h2.65l1.95-1.925Q11.175 1.5 12 1.5t1.4.575L15.35 4H18q.825 0 1.413.588T20 6v2.65l1.925 1.95q.575.575.575 1.4t-.575 1.4L20 15.35V18q0 .825-.588 1.413T18 20h-2.65ZM12 14.475l1.925 1.15q.275.175.537-.012t.188-.513l-.5-2.175l1.7-1.475q.25-.225.15-.537t-.45-.338l-2.225-.175l-.875-2.075q-.125-.3-.45-.3t-.45.3l-.875 2.075l-2.225.175q-.35.025-.45.338t.15.537l1.7 1.475l-.5 2.175q-.075.325.188.513t.537.012L12 14.475Z"
						/>
					</svg>
				</div>
				<div class="flex justify-center items-center gap-6">
					<!-- Button for sliding to the previous game -->
					<button
						aria-label="Left"
						class="cursor-pointer hover:scale-125 hover:text-primary"
						:class="'slidePrev' + keySlide"
                        v-bind="analyticsAttrs.arrowPrev"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-left"
							class="text-neutral/50 text-3xl"
						/>
					</button>
					<!-- Button for sliding to the next game -->
					<button
						aria-label="Right"
						class="cursor-pointer hover:scale-125 hover:text-primary"
						:class="'slideNext' + keySlide"
                        v-bind="analyticsAttrs.arrowNext"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-right"
							class="text-neutral/50 text-3xl"
						/>
					</button>
				</div>
			</div>
			<!-- Container for the game slider -->
			<div class="relative w-full z-20">
				<!-- Skeleton loader displayed while loading games -->
				<section
					v-if="onSckeletonLoader"
					class="flex justify-between items-center flex-nowrap gap-2 w-full h-full overflow-x-auto"
				>
					<AnimatedPlaceholder
						v-for="index in 7"
						:key="index"
						class="w-[190px] h-[190px] aspect-square rounded-xl"
					/>
				</section>
				<!-- Swiper container for the game slides -->
				<swiper-container
					v-show="!onSckeletonLoader"
					class="mySwiper w-full"
					:slides-per-view="'auto'"
					:space-between="20"
					:mousewheel="true"
					:mousewheel-force-to-axis="true"
					:free-mode="true"
					:direction="'horizontal'"
					:class="'swiper-container' + keySlide"
					:navigation="{
						nextEl: '.slideNext' + keySlide,
						prevEl: '.slidePrev' + keySlide,
					}"
				>
					<TransitionGroup class="grid" :css="true" @enter="onEnter">
						<!-- Individual game slide -->
						<swiper-slide
							v-for="(game, index) in gamesList"
							:key="index"
							ref="card"
							:data-index="index"
							class=""
						>
							<!-- Button for selecting a game -->
							<button
								@click="
									$event.stopPropagation();
									gamesList.idSelect = game.id;
									appComponent.openGame(game);
									appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {...game, action: data.action});
								"
								class="relative w-full h-full rounded-xl"
                                v-bind="analyticsAttrs.game(game)"
							>
								<div
									class="absolute top-0 w-full h-full z-20 hover:z-10"
								>
									<!-- Game icon image -->
									<img
										v-show="
											game.icon_3 !== undefined &&
											game.icon_3 !== null &&
											game.icon_3 !== ''
										"
										:src="game.icon_3"
										alt=""
										:class="
											'w-full h-full rounded-xl' +
											' object-' +
											game.object_fit
										"
									/>
									<!-- Index number displayed on the game card -->
									<span
										class="absolute left-1 -bottom-10 h-full numberTop flex justify-center items-center text-[140px]"
									>{{ index + 1 }}</span
									>
								</div>
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
								<!-- Overlay with game name and play button -->
								<div
									class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all rounded-xl"
								>
									<p
										class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
									>
										{{ game.name.toLowerCase() }}
									</p>
									<!-- Play now button -->
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
								<!-- Top badge for featured games -->
								<span
									v-if="data.top"
									class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
								>{{ $t('TOP') }}</span
								>
                <!-- Tag image for the game -->
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
                <!-- Tag text for the game -->
                <span
                    v-else-if="game.TagText != undefined && game.TagText != null && game.TagText != ''"
                    :class="['absolute left-0 top-0 m-1 text-black',
                  'text-sm font-bold pb-[1px] z-30', 'w-auto h-auto flex justify-center items-center',
                  'max-w-2xl overflow-hidden']"
                    v-html="game.TagText"
                ></span>
							</button>
						</swiper-slide>
					</TransitionGroup>
				</swiper-container>
			</div>
		</div>
	</section>
</template>
<!-- API endpoint for fetching games -->
<!-- api2.virtualsoft.tech/?action=getGames2&partner_id=0&offset=0&limit=24&country=pe&isMobile=false&category=0&userId=136&provider=PARIPLAY&search=king -->
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import apiService from '@/services/ApiService';
import CasinoSlider3V2 from '@/components/CasinoSlider3V2.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import { useGlobalStore } from '@/stores/global';
register();
import anime from 'animejs';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils';
export default defineComponent({
	components: { AnimatedPlaceholder, ExitIcon, CasinoSlider3V2 },
	props: {
		// Data prop for passing game information
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		// Configuration and state variables for the component
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let gamesList: any = ref([]);
		let onMoreGames: boolean = false;
		let loadMoreGamesList: any = ref([]);
		let offsetSlider: number = 0;
		let limitSlider: number = 0;
		let showMore: boolean = true;
		let loading: boolean = true;
		let loadingGame: boolean = true;
		let startAnime: number = 0;
		let colors = {};
		let optionsGames = {};
		let keySlide: number = Math.floor(Math.random() * 1000);
		let emitter = this.$emitter();
		let storeCasinoLobby = useGlobalStore();
		let onSckeletonLoader: boolean = true;
		let isVisible: boolean = true;
		let deviceTheme: string = 'theme_colors';

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:view-all`,
                'data-analytics-context': `component:SliderGamesTop|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:arrow-prev`,
                'data-analytics-context': `component:SliderGamesTop|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:arrow-next`,
                'data-analytics-context': `component:SliderGamesTop|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:game`,
                'data-analytics-position': `${gamesList.value.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderGamesTop|layout:${appComponent.config.layout}`,
            })
        }

		return {
			config,
			appComponent,
			gamesList,
			onMoreGames,
			loadMoreGamesList,
			offsetSlider,
			limitSlider,
			showMore,
			loading,
			startAnime,
			loadingGame,
			colors,
			optionsGames,
			keySlide,
			emitter,
			storeCasinoLobby,
			onSckeletonLoader,
			isVisible,
			deviceTheme,
            analyticsAttrs,
		};
	},
	setup() {
		// Setup function for reactive route parameters
		const route = useRoute();
		let gameId: any = ref(route.params.GameId);
		let categoryId: any = ref(route.query.categoria);
		let providerId: any = ref(route.query.proveedor);
		return {
			route,
			gameId,
			categoryId,
			providerId,
		};
	},
	created() {
		// Lifecycle hook for component initialization
		if (
			this.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		)
			this.deviceTheme = 'theme_colors_desktop';
		else if (
			this.config.theme_colors_mobile != undefined &&
			this.config.mobileL != ''
		)
			this.deviceTheme = 'theme_colors_mobile';
		this.colors = this.config[this.deviceTheme];
		this.getCasinoGames();
	},
	mounted() {
		// Lifecycle hook for setting up event listeners
		this.emitter.on('get:gamesList', () => {
			this.onSckeletonLoader = true;
			this.isVisible = true;
			this.getCasinoGames();
		});
		let count = 0;
		const intervalSwiper = setInterval(() => {
			count++;
			try {
				const swiperEl = document.querySelector(
					'.swiper-container' + this.keySlide,
				) as any;
				if (swiperEl || count > 10) {
					clearInterval(intervalSwiper);
					const buttonNext = document.querySelector(
						'.slideNext' + this.keySlide,
					);
					const buttonPrev = document.querySelector(
						'.slidePrev' + this.keySlide,
					);
					// Event listeners for navigation buttons
					buttonPrev?.addEventListener('click', function(e) {
						e.preventDefault();
						swiperEl?.swiper.slidePrev();
					});
					buttonNext?.addEventListener('click', function(e) {
						e.preventDefault();
						swiperEl?.swiper.slideNext();
					});
				}
			} catch (e) {
				console.log(e);
			}
		}, 1000);
	},
	unmounted() {
		// Cleanup event listeners on component unmount
		this.emitter.off('get:gamesList');
	},
	methods: {
		// Method to fetch casino games from the API
		async getCasinoGames() {
			this.onSckeletonLoader = true;
			this.optionsGames = {
				action: this.data.action,
				partner_id: this.appComponent.partnerG,
				offset: this.offsetSlider,
				typelobby: this.data.typelobby,
				limit: this.data.limit,
				category: this.storeCasinoLobby.category,
				provider: this.storeCasinoLobby.provider,
				country: this.appComponent.country,
				isMobile: this.appComponent.mobile == '1',
			};
      // Check if user is logged in and set test user option
      if (this.appComponent.session.logueado) {
        this.optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false
      }
			try {
				await apiService
					.requestGet(
						this.appComponent.config.urlVirtualplayPython
							? this.appComponent.config.urlVirtualplayPython
							: 'https://gameservice.virtualsoft.tech/',
						this.optionsGames,
					)
					.then((response: any) => {
						this.loading = false;
						this.onSckeletonLoader = false;
						this.gamesList = response.data.games; 
						this.isVisible = response.data.games.length > 0;
					});
			} catch (e) {
				console.log(e);
				this.loading = false;
				this.onSckeletonLoader = false;
				this.isVisible = false;
			}
		},
		// Animation for entering game elements
		onEnter(el: any, done: any) {
			anime({
				targets: el,
				opacity: [0, 1],
				translateX: [300, 0],
				duration: 750,
				easing: 'easeInOutQuart',
				delay: el.dataset.index * 100, 
				complete: done,
			});
		},
	},
});
</script>
<style scoped>
/* Styles for the swiper container */
swiper-container {
	width: 100%;
	height: 100%;
}
/* Styles for individual swiper slides */
swiper-slide {
	text-align: center;
	font-size: 18px;
	background: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* Specific dimensions and aspect ratio for game slides */
swiper-slide {
	display: block;
	width: 190px;
	height: 190px;
	aspect-ratio: 1 / 1;
	object-fit: contain;
}
/* Styles for the index number overlay */
.numberTop {
	background: linear-gradient(180deg, #000000 0%, transparent 75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke-width: 1px;
	-webkit-text-stroke-color: #ffffff;
	font-weight: 700;
	background-clip: text;
	animation: effect 3s infinite;
}
/* Styles for the title text */
.tittle {
	background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 700;
	background-clip: text;
}
/* Keyframes for the text effect animation */
@keyframes effect {
	0% {
		text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.9));
		opacity: 0.7;
	}
	50% {
		text-shadow: 0 0 0 10px rgba(255, 255, 255);
		filter: drop-shadow(15px 15px 15px rgba(0, 0, 0, 0));
		opacity: 1;
	}
	100% {
		text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.9));
		opacity: 0.7;
	}
}
</style>

<!-- FILE DOCUMENTED -->

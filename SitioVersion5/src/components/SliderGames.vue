<template>
	<!-- Main section that is conditionally rendered based on isVisible -->
	<section
		v-if="isVisible"
		class="flex justify-center items-center w-full my-6"
		:class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&appComponent.config.backgroundColorSportBook? 'bg-sportbook-color': ''"
 
	>
		<!-- Container for the title and navigation buttons -->
		<div
			class="flex flex-col justify-center items-center gap-0 w-11/12 max-w-[1300px] z-50"
		>
			<!-- Header with title and navigation buttons -->
			<div class="w-full flex justify-between items-center">
				<h3 class="in uppercase w-full text-neutral text-xl font-bold">
					{{ $t(data.title) }}
				</h3>
				<!-- Navigation buttons for sliding -->
				<div class="flex justify-center items-center gap-6">
					<button
						aria-label="Left"
						class="cursor-pointer hover:scale-125 hover:text-secondary"
						:class="'slidePrev' + keySlide"
                        v-bind="analyticsAttrs.arrowPrev"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-left"
							class="text-neutral/50 text-3xl"
						/>
					</button>
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
			<!-- Container for the game display -->
			<div class="relative w-full h-[170px]">
				<!-- Skeleton loader displayed while loading games -->
				<section
					v-if="onSckeletonLoader"
					class="w-full h-full flex justify-start items-center gap-2 overflow-x-auto"
				>
					<AnimatedPlaceholder
						v-for="index in 7"
						:key="index"
						class="w-[170px] h-[170px] aspect-square rounded-xl"
					/>
				</section>
				<!-- Swiper container for displaying games -->
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
						<!-- Loop through gamesList to display each game -->
						<swiper-slide
							v-for="(game, index) in gamesList.slice(0, limit)"
							:key="index"
							ref="card"
							:data-index="index"
						>
							<!-- Button for each game -->
							<button
								@click="
									gamesList.idSelect = game.id;
									appComponent.openGame(game);
									$event.stopPropagation();
									appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {...game, action: data.action});
								"
								class="relative w-full h-full rounded-xl"
                                v-bind="analyticsAttrs.game(game)"
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
										'absolute top-0 w-full h-full rounded-xl z-20 hover:z-10' +
										' object-' +
										game.object_fit
									"
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
								<!-- Overlay with game name and play button -->
								<div
									class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all rounded-xl"
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
								<!-- Top badge if applicable -->
								<span
									v-if="data.top"
									class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
								>{{ $t('TOP') }}</span
								>
								<!-- Game tag image if available -->
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
								<!-- Game tag text if available -->
								<span
									v-else-if="game.TagText != undefined && game.TagText != null && game.TagText != ''"
									:class="['absolute left-0 top-0 m-1 text-black',
                  'text-sm font-bold pb-[1px] z-30', 'w-auto h-auto flex justify-center items-center',
                  'max-w-2xl overflow-hidden']"
									v-html="game.TagText"
								></span>
							</button>
						</swiper-slide>
						<!-- Placeholder for additional games -->
						<swiper-slide
							v-if="gamesList.length > 0"
							:key="gamesList.length - 1"
							ref="card"
							:data-index="gamesList.length - 1"
							class="w-24"
						>
						</swiper-slide>
					</TransitionGroup>
				</swiper-container>
				<!-- Load more button -->
				<div
					class="in absolute right-0 bottom-0 w-20 h-full z-10 bg-base-200/75 rounded-l-2xl hover:bg-primary/80"
				>
					<button
						@click="onLoadMore()"
						class="w-full h-full flex justify-center items-center shadow-inner rounded-xl hover:scale-[1.02] loadMore cursor-pointer text-accent-focus/50 shadow-accent-focus/50"
                        v-bind="analyticsAttrs.viewAll"
					>
						<font-awesome-icon icon="fa-solid fa-plus" size="4x" />
					</button>
				</div>
			</div>
		</div>
	</section>
	<!-- Section for loading more games -->
	<section
		v-if="onMoreGames"
		class="in fixed top-0 right-0 bg-black/80 w-screen h-screen flex justify-center items-center z-[999]"
	>
		<!-- Modal for displaying more games -->
		<article
			class="relative w-[90%] lg:w-[70%] h-[90%] p-2 md:p-4 bg-base-300 rounded-xl"
		>
			<!-- Close button for the modal -->
			<button
				@click="onCloseLoadMore()"
				class="absolute top-3 right-3 mx-auto hover:scale-105 z-[1000]"
			>
				<svg :width="30" :height="30" id="Capa_2" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg"
					 viewBox="0 0 24.94 24.94">
					<circle fill="#ffffff" cx="12.47" cy="12.47" r="12.47" />
					<circle fill="#ee3b3f" cx="12.47" cy="12.47" r="10.66" />
					<path fill="#ffffff"
						  d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z" />
				</svg>
			</button>
			<!-- Header for the modal -->
			<div
				class="in relative h-auto flex justify-center items-center w-full mb-4"
			>
				<h2
					class="uppercase text-neutral font-bold text-2xl my-1"
					aria-label="Casino bets"
				>
					{{ $t(data.title) }}
				</h2>
				<div
					class="absolute w-20 h-1 bg-yellow-300 bottom-0 rounded-full"
				></div>
			</div>
			<!-- Loading state for more games -->
			<div
				v-if="loading"
				class="w-full gridList justify-center items-start gap-2 overflow-y-auto"
			>
				<AnimatedPlaceholder
					v-for="index in placeholdersCount"
					:key="index"
					class="aspect-square rounded-xl"
				/>
			</div>
			<!-- Display of loaded games -->
			<div
				v-show="!loading"
				class="gridList w-full h-[95%] overflow-y-auto"
			>
				<TransitionGroup
					class="grid"
					:css="true"
					@enter="onEnterLoadMore"
				>
					<!-- Loop through loadMoreGamesList to display each game -->
					<button
						v-for="(game, index) in loadMoreGamesList"
						:key="index"
						@click="
							gamesList.idSelect = game.id;
							appComponent.openGame(game);
							$event.stopPropagation();
							appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {...game, action: data.action});
						"
						class="relative w-full h-full aspect-square rounded-xl"
						ref="card"
						:data-index="index"
                        v-bind="analyticsAttrs.game(game)"
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
								'absolute top-0 w-full h-full rounded-xl z-20 hover:z-10' +
								' object-' +
								game.object_fit
							"
						/>
						<!-- Overlay with game name and play button -->
						<div
							class="z-10 hover:z-20 hover:bg-base-300/60 hover:backdrop-blur-sm transition-transform duration-200 hover:scale-105 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full aspect-square p-2 break-all rounded-xl"
						>
							<p
								class="text-neutral text-xs xl:text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
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
						<!-- Top badge if applicable -->
						<span
							v-if="data.top"
							class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
						>{{ $t('TOP') }}</span
						>
						<!-- Game tag image if available -->
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
						<!-- Game tag text if available -->
						<span
							v-else-if="game.TagText != undefined && game.TagText != null && game.TagText != ''"
							:class="['absolute left-0 top-0 m-1 text-black',
                  'text-sm font-bold pb-[1px] z-30', 'w-auto h-auto flex justify-center items-center',
                  'max-w-2xl overflow-hidden']"
							v-html="game.TagText"
						></span>
					</button>
				</TransitionGroup>
				<!-- Skeleton loader for more games -->
				<AnimatedPlaceholder
					v-if="onSckeletonLoaderMore && !loading"
					v-for="index in placeholdersCount"
					:key="index"
					class="aspect-square rounded-xl"
				/>
				<!-- Load more button for additional games -->
				<div
					class="w-full flex justify-center items-center col-span-full"
				>
					<button
						v-if="showMore && !loading"
						class="in btn-pyramid bg-accent-content hover:bg-accent-content/80 w-60 py-4 text-neutral font-semibold text-xl hover:scale-105 shadow-inner shadow-secondary mb-6"
						@click="onLoadMore()"
                        v-bind="analyticsAttrs.viewAll"
					>
						{{ $t('CARGAR MAS') }}
					</button>
				</div>
			</div>
		</article>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { register } from 'swiper/element/bundle';
import apiService from '@/services/ApiService';
import CasinoSlider3V2 from '@/components/CasinoSlider3V2.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
register();
import anime from 'animejs';
import { useGlobalStore } from '@/stores/global';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils';
export default defineComponent({
	components: { AnimatedPlaceholder, ExitIcon, CasinoSlider3V2 },
	props: {
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
		let gamesList: any = [];
		let onMoreGames: boolean = false;
		let moreGames: boolean = false;
		let loadMoreGamesList: any = ref([]);
		let offsetSlider: number = 0;
		let limitSlider: number = 0;
		let showMore: boolean = true;
		let loading: boolean = true;
		let loadingGame: boolean = true;
		let startAnime: number = 0;
		let keySlide: number = Math.floor(Math.random() * 1000);
		let storeCasinoLobby = useGlobalStore();
		let emitter = this.$emitter();
		let onSckeletonLoader: boolean = true;
		let onSckeletonLoaderMore: boolean = true;
		let isVisible: boolean = true;
		let limit: number = this.data.limit;
		let totalGames: number = 0;
		let limitLocal: number = 500;

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:view-all`,
                'data-analytics-context': `component:SliderGames|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:arrow-prev`,
                'data-analytics-context': `component:SliderGames|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:arrow-next`,
                'data-analytics-context': `component:SliderGames|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.data['title'])}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderGames|layout:${appComponent.config.layout}`,
            })
        }
		return {
			config,
			appComponent,
			gamesList,
			onMoreGames,
			moreGames,
			loadMoreGamesList,
			offsetSlider,
			limitSlider,
			showMore,
			loading,
			startAnime,
			loadingGame,
			keySlide,
			emitter,
			storeCasinoLobby,
			onSckeletonLoader,
			onSckeletonLoaderMore,
			isVisible,
			limit,
			totalGames,
			limitLocal,
            analyticsAttrs,
		};
	},
	setup() {
		// Setup function to define reactive properties
		const route = useRoute();
		let gameId: any = ref(route.params.GameId);
		let categoryId: any = ref(route.params.CategoryId);
		let providerId: any = ref(route.params.ProviderId);
		return {
			route,
			gameId,
			categoryId,
			providerId,
		};
	},
	methods: {
		// Fetch casino games based on user session and parameters
		async getCasinoGames() {
			this.onSckeletonLoader = true;
			let optionsGames = {};
			if (this.appComponent.session.logueado && this.data.user) {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.data.category ?? this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user,
        };
			} else {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitSlider,
					category: this.data.category ?? this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
				};
			}
      if(this.appComponent.session.logueado){
        optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false
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
						this.loading = false;
						this.onSckeletonLoader = false;
						this.gamesList = response.data.games; 
						this.totalGames = response.data.total_count;
						this.moreGames =
							response.data.total_count <= this.limit;
						this.isVisible = response.data.games.length > 0;
					});
			} catch (e) {
				this.loading = false;
				this.onSckeletonLoader = false;
				this.isVisible = false;
			}
		},
		// Fetch more casino games when requested
		async getMoreCasinoGames() {
			if (this.loadMoreGamesList.length === 0) {
				this.limitSlider = parseInt(this.limit);
				this.offsetSlider = 0;
				setTimeout(() => {
					this.loading = false;
					this.onSckeletonLoaderMore = false;
					this.showMore = this.gamesList.length > this.limitSlider;
					this.loadMoreGamesList = this.gamesList.slice(
						this.offsetSlider,
						this.limitSlider,
					);
				}, 500);
			} else if (
				this.loadMoreGamesList.length > 0 &&
				this.loadMoreGamesList.length < this.gamesList.length &&
				this.gamesList.length <= this.totalGames &&
				this.offsetSlider < this.gamesList.length
			) {
				this.offsetSlider = parseInt(this.offsetSlider) + parseInt(this.limit);
				this.limitSlider = parseInt(this.limitSlider) + parseInt(this.limit);
				setTimeout(() => {
					this.loading = false;
					this.onSckeletonLoaderMore = false;
					this.showMore = this.gamesList.length >= this.limitSlider;
					if (this.limitSlider < this.totalGames) {
						let moreGameslist = this.gamesList.slice(
							this.offsetSlider,
							this.limitSlider,
						);
						moreGameslist.forEach((game: any, index: number) => {
							this.loadMoreGamesList.push(game);
						});
					} else {
						let moreGameslist = this.gamesList.slice(
							this.offsetSlider,
						);
						moreGameslist.forEach((game: any, index: number) => {
							this.loadMoreGamesList.push(game);
						});
						this.showMore = false;
					}
				}, 500);
			} else {
				this.limitLocal = this.limitLocal + 500;
				if (this.limitLocal <= this.totalGames) {
					await this.getMoreGames();
				} else {
					this.limitLocal = this.totalGames;
					await this.getMoreGames().then(() => {
						this.loading = false;
						this.onSckeletonLoaderMore = false;
						this.showMore = false;
					});
				}
			}
		},
		// Trigger loading of more games
		onLoadMore() {
			this.loading = this.loadMoreGamesList.length === 0;
			this.onMoreGames = true;
			this.onSckeletonLoaderMore = true;
			this.startAnime = 0;
			this.getMoreCasinoGames();
		},
		// Close the load more modal
		onCloseLoadMore() {
			this.limitSlider = this.data.limit;
			this.offsetSlider = 0;
			this.limit = this.data.limit;
			this.onMoreGames = false;
			this.startAnime = 0;
			this.loadMoreGamesList = [];
			this.showMore = true;
		},
		// Animation for entering load more section
		onEnterLoadMore(el: any, done: any) {
			anime({
				targets: el,
				opacity: [0, 1],
				translateY: [-300, 0],
				easing: 'easeInOutQuart',
				delay: this.startAnime * 100, 
				complete: done,
			});
			this.startAnime += 1;
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
		// Fetch additional games based on current state
		async getMoreGames() {
			let optionsGames = {};
			if (this.appComponent.session.logueado && this.data.user) {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitLocal,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
					userId: this.appComponent.session.id_user,
				};
			} else {
				optionsGames = {
					action: this.data.action,
					partner_id: this.appComponent.partnerG,
					offset: this.offsetSlider,
					typelobby: this.data.typelobby,
					limit: this.limitLocal,
					category: this.storeCasinoLobby.category,
					provider: this.storeCasinoLobby.provider,
					country: this.appComponent.country,
					isMobile: this.appComponent.mobile == '1',
				};
			}
      if(this.appComponent.session.logueado){
        optionsGames.testUser = this.appComponent.session.user_test == 1 ? true : false
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
						this.gamesList = [
							...this.gamesList,
							...response.data.games,
						];
						this.totalGames = response.data.total_count;
						setTimeout(() => {
							this.loading = false;
							this.onSckeletonLoaderMore = false;
							this.showMore =
								this.gamesList.length > this.limitSlider;
							let moreGameslist = this.gamesList.slice(
								this.offsetSlider,
								this.limitSlider,
							);
							moreGameslist.forEach(
								(game: any, index: number) => {
									this.loadMoreGamesList.push(game);
								},
							);
						}, 1000);
					});
			} catch (e) {
			}
		},
	},
	// Lifecycle hook for component creation
	created() {
		this.limitSlider = 500;
		if (this.categoryId != undefined) {
			this.storeCasinoLobby.category = this.categoryId.split('-');
			if (this.storeCasinoLobby.category.length === 3) {
				this.storeCasinoLobby.category = this.categoryId.split('-')[2];
			} else if (this.storeCasinoLobby.category.length === 2) {
				this.storeCasinoLobby.category = this.categoryId.split('-')[1];
			}
		}
		if (this.data.user) {
			if (this.appComponent.session.logueado) {
				this.getCasinoGames();
			} else {
				this.isVisible = false;
			}
		} else {
			this.getCasinoGames();
		}
	},
	// Lifecycle hook for component unmounting
	unmounted() {
		this.emitter.all.delete('get:gamesList');
	},
	// Lifecycle hook for component mounting
	mounted() {
		this.emitter.on('get:gamesList', () => {
			this.onSckeletonLoaderMore = true;
			this.isVisible = true;
			if (this.data.user) {
				if (this.appComponent.session.logueado) {
					this.getCasinoGames();
				} else {
					this.isVisible = false;
				}
			} else {
				this.getCasinoGames();
			}
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
	// Computed property for calculating placeholders count
	computed: {
		placeholdersCount() {
			const remainingGames = parseInt(this.totalGames) - this.loadMoreGamesList.length;
			return remainingGames > parseInt(this.limit) ? parseInt(this.limit) : (remainingGames > 0 ? remainingGames : 0);
		},
	},
});
</script>
<style scoped>
/* Styles for swiper container */
swiper-container {
	width: 100%;
	height: 100%;
}
/* Styles for swiper slide */
swiper-slide {
	text-align: center;
	font-size: 18px;
	background: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* Styles for individual swiper slide */
swiper-slide {
	display: block;
	width: 170px;
	height: 170px;
	aspect-ratio: 1 / 1;
	object-fit: contain;
}
/* Title styling */
.tittle {
	background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 700;
	background-clip: text;
}
/* Load more button styling */
.loadMore {
	background: linear-gradient(180deg, #ffffff 10%, #c9c9c9 75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: 700;
	background-clip: text;
}
/* Grid list styling */
.gridList {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
	place-content: start;
	gap: 15px;
}
/* Responsive grid list styling */
@media (min-width: 768px) {
	.gridList {
		grid-template-columns: repeat(5, minmax(7rem, 1fr));
	}
}
</style>

<!-- FILE DOCUMENTED -->

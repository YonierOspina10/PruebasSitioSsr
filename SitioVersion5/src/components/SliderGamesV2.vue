<template>
	<!-- Main section for displaying games if the gamesList is not empty -->
	<section
		v-if="gamesList.length > 0"
		class="w-full flex justify-center items-center gap-0 tablet:gap-4 desktop:gap-0 max-w-[1155px]"
	>
		<!-- Button to navigate to the previous game in the slider -->
		<button :class="'slidePrev' + keySlide" class="hover:scale-125 mt-9" v-bind="analyticsAttrs.arrowPrev">
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
			</svg>
		</button>
		<div
			class="flex flex-col justify-center items-start gap-2 w-[90%] desktop:w-[97%]"
		>
			<!-- Router link to navigate to the game category -->
			<RouterLink
				:to="url"
				class="flex justify-center items-center gap-4"
			>
				<!-- Title of the game category -->
				<h3 class="font-bold text-base tablet:text-xl text-neutral">
					{{ $t(title) }}
				</h3>
				<!-- Game category icon, displayed if available -->
				<img
					v-if="icon != ''"
					:src="icon"
					alt=""
					class="w-[30px] aspect-square object-contain"
				/>
			</RouterLink>
			<!-- Swiper container for displaying games in a slider format -->
			<swiper-container
				:slides-per-view="'auto'"
				:loop="true"
				:space-between="10"
				:centered-slides="false"
				:free-mode="true"
				:mousewheel="true"
				:mousewheel-force-to-axis="true"
				:direction="'horizontal'"
				:navigation="{
								nextEl: '.slideNext' + keySlide,
								prevEl: '.slidePrev' + keySlide,
							}"
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
				<!-- Swiper slide for each game in the gamesList -->
				<swiper-slide
					v-for="(game, index) in gamesList"
					:key="index"
					class="relative w-[70px] h-[70px] tablet:w-[78px] tablet:h-[78px] desktop:w-[133px] desktop:h-[133px] rounded-lg shadow-inner shadow-black cursor-pointer overflow-hidden"
					@click="
						appComponent.openGame(game);
						appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {...game, action: type === 1 ? 'getGames2' + (route.path.includes('/home') ? ' - Home' : '') : action});
					"
                    v-bind="analyticsAttrs.game(game)"
				>
					<!-- Game icon, displayed if available -->
					<img
						v-show="
							game.icon_3 != undefined &&
							game.icon_3 != null &&
							game.icon_3 != ''
						"
						v-lazy="game.icon_3"
						alt=""
						class="absolute top-0 right-0 left-0 bottom-0 w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300 ease-in-out z-20 hover:z-10"
						:class="'object-' + game.object_fit"
					/>
					<!-- Overlay with game name and play button -->
					<div
						class="z-10 hover:z-20 hover:bg-black/50 absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-2 xl:gap-4 w-full h-full xl:p-2"
					>
						<!-- Game name displayed in lowercase -->
						<p
							class="text-neutral text-[0.8em] xl:text-base leading-3 font-bold max-w-[90%] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
						>
							{{ game.name.toLowerCase() }}
						</p>
						<!-- Button to play the game -->
						<button
							class="w-[90%] bg-primary text-neutral text-[0.5em] xl:text-xs leading-3 rounded-full font-bold p-1 xl:p-2 uppercase hover:scale-105"
							aria-label="Jugar ahora"
                            v-bind="analyticsAttrs.game(game)"
						>
							{{ $t('Jugar ahora') }}
						</button>
					</div>
				</swiper-slide>
			</swiper-container>
		</div>
		<!-- Button to navigate to the next game in the slider -->
		<button :class="'slideNext' + keySlide" class="hover:scale-125 mt-9" v-bind="analyticsAttrs.arrowNext">
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
			</svg>
		</button>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { register } from 'swiper/element/bundle'; // Importing Swiper for slider functionality
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils'; // Importing Vue Router's useRoute for route handling
register(); // Registering Swiper elements

export default defineComponent({
	props: {
		// Props for component configuration with default values
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
	setup() {
		const route = useRoute(); // Getting the current route
		return {
			route,
		};
	},
	data() {
		// Initializing component data
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Reference to the app component
		let colors: any = {}; // Object to hold color configurations
		let deviceTheme: string = 'theme_colors'; // Default theme
		let gamesList: any = []; // Array to hold the list of games

        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:SliderGamesV2|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:SliderGamesV2|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:SliderGamesV2|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderGamesV2|layout:${appComponent.config.layout}`,
            })
        }

		return {
			config,
			appComponent,
			colors,
			deviceTheme,
			gamesList,
            analyticsAttrs,
		};
	},
	created() {
		// Lifecycle hook for component creation
		if (
			this.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		) {
			this.deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
		} else if (
			this.config.theme_colors_mobile != undefined &&
			this.config.mobileL != ''
		) {
			this.deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
		}
		this.colors = this.config[this.deviceTheme]; // Assign colors based on the theme
	},
	mounted() {
		// Lifecycle hook for component mounting
		if (this.type === 1) {
			this.getCasinoGames(); // Fetch casino games if type is 1
		} else if (this.type === 2) {
			this.getCasinoGames2(); // Fetch casino games if type is 2
		}
		let count = 0; // Counter for the interval
		const intervalSwiper = setInterval(() => {
			count++;
			try {
				const swiperEl = document.getElementById(
					'SliderGamesV2'
				) as any; // Get the Swiper element
				if (swiperEl || count > 10) {
					clearInterval(intervalSwiper); // Clear the interval if Swiper is found or count exceeds 10
					const buttonLeft =
						document.getElementById('buttonLeftGamesV2'); // Get the left button
					const buttonRight =
						document.getElementById('buttonRightGamesV2'); // Get the right button
					buttonLeft?.addEventListener('click', (e) => {
						e.preventDefault(); // Prevent default button action
						swiperEl?.swiper.slidePrev(); // Slide to the previous game
					});
					buttonRight?.addEventListener('click', (e) => {
						e.preventDefault(); // Prevent default button action
						swiperEl?.swiper.slideNext(); // Slide to the next game
					});
				}
			} catch (e) {
				console.log(e); // Log any errors
			}
		}, 1000); // Check every second
	},
	methods: {
		// Method to fetch casino games
		async getCasinoGames() {
			let optionsGames = {
				action: 'getGames2', // Action type for the API request
				partner_id: this.appComponent.partner, // Partner ID from app component
				offset: 0, // Offset for pagination
				typelobby: this.typelobby, // Type of lobby
				limit: this.limit, // Limit of games to fetch
				category: this.category, // Game category
				country: this.appComponent.country, // User's country
				isMobile: false, // Flag for mobile
			};
			optionsGames.isMobile = this.appComponent.mobile == '1'; // Set mobile flag based on app component
			await apiService
				.requestGet(
					this.config.urlVirtualplay + '/cms/products/games/',
					optionsGames
				)
				.then((response: any) => {
					this.gamesList = response.data.games; // Update gamesList with fetched games
				});
		},
		// Method to fetch casino games with user-specific options
		async getCasinoGames2() {
			let optionsGames = {};
			if (this.appComponent.session.logueado && this.user) {
				optionsGames = {
					action: this.action, // Action type for the API request
					partner_id: this.appComponent.partnerG, // Partner ID from app component
					offset: 0, // Offset for pagination
					typelobby: this.typelobby, // Type of lobby
					limit: 25, // Limit of games to fetch
					category: 'all', // Fetch all categories
					provider: 'all', // Fetch all providers
					country: this.appComponent.country, // User's country
					isMobile: this.appComponent.mobile == '1', // Flag for mobile
					userId: this.appComponent.session.id_user, // User ID from session
				};
			} else {
				optionsGames = {
					action: this.action, // Action type for the API request
					partner_id: this.appComponent.partnerG, // Partner ID from app component
					offset: 0, // Offset for pagination
					typelobby: this.typelobby, // Type of lobby
					limit: 25, // Limit of games to fetch
					category: 'all', // Fetch all categories
					provider: 'all', // Fetch all providers
					country: this.appComponent.country, // User's country
					isMobile: this.appComponent.mobile == '1', // Flag for mobile
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
						this.gamesList = response.data.games; // Update gamesList with fetched games
					});
			} catch (e) {}
		},
	},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

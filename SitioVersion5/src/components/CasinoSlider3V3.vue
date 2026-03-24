<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import router from '@/router'; // Import router for navigation
import apiService from '@/services/ApiService'; // Import API service for data fetching
import AppCarousel from '@/components/Carousel.vue'; // Import carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Import left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue'; // Import right chevron icon component
import ExitIcon from './icons/ExitIcon.vue';
import { toKebabCase } from '@/utils'; // Import exit icon component

export default defineComponent({
	props: {
		gamesList: { type: Object, default: [] }, // Define props with default value
        category: { type: String, default: 'all' }, // Define category prop with default value
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
	data: function () {
		let config = this.$config(); // Get configuration
		let appComponent: any = this.$appComponent; // Reference to app component
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Preloader visibility state
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // Game display state
		let src: string = ''; // Source string for images
		let margin: number = 0; // Margin value for

        const getNames = appComponent.config?.newCasino || {};
        let category = this.category || 'all';
        if (getNames[category]) {
            category = getNames[category];
        }
        const analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:view-all`,
                'data-analytics-context': `component:CasinoSlider3V3|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-prev`,
                'data-analytics-context': `component:CasinoSlider3V3|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-next`,
                'data-analytics-context': `component:CasinoSlider3V3|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(category)}:game`,
                'data-analytics-position': `${this.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider3V3|layout:${appComponent.config.layout}`,
            })
        };

		return {
			config,
			appComponent,
			bgGame,
			preloaderShow,
			gameSelected,
			showGame,
			src,
			margin,
            analyticsAttrs,
		};
	},
	mounted() {
		this.$nextTick(() => {
			let isDown = false; // Flag for mouse/touch interaction
			let startX; // Starting X position for dragging
			let scrollLeft; // Initial scroll position
			const slider = document.querySelector('.slider-casino') as HTMLElement | null; // Reference to the slider element

			if (!slider) return;

			const end = () => {
				isDown = false; // Reset flag on interaction end
				slider.classList.remove('active'); // Remove active class
			};
			const start = (e) => {
				isDown = true; // Set flag on interaction start
				slider.classList.add('active'); // Add active class
				startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get starting X position
				scrollLeft = slider.scrollLeft; // Store initial scroll position
			};
			const move = (e) => {
				this.appComponent.openLink = true; // Set link open state
				if (!isDown) return; // Exit if not dragging
				this.appComponent.openLink = false; // Reset link open state
				e.preventDefault(); // Prevent default behavior
				const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
				const dist = x - startX; // Calculate distance moved
				slider.scrollLeft = scrollLeft - dist; // Update scroll position
			};
			(() => {
				slider.addEventListener('mousedown', start); // Add mouse down event
				slider.addEventListener('touchstart', start, { passive: true }); // Add touch start event
				slider.addEventListener('mousemove', move); // Add mouse move event
				slider.addEventListener('touchmove', move, { passive: true }); // Add touch move event
				slider.addEventListener('mouseleave', end); // Add mouse leave event
				slider.addEventListener('mouseup', end); // Add mouse up event
				slider.addEventListener('touchend', end); // Add touch end event
			})();
			Array.prototype.forEach.call(
				document.getElementsByClassName('preload-game-bottom'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-bottom')[
							i
						] as HTMLElement
					).style.display = 'none'; // Hide preload game elements
				}
			);
		});
	},
	methods: {
		moveLeft() {
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0]; // Reference to the slider element
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			(
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber - 150, 0); // Scroll left by 150 pixels
		},
		moveRight() {
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0]; // Reference to the slider element
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			(
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber + 150, 0); // Scroll right by 150 pixels
		},
		navigate(game: any) {
			if (this.appComponent.session.logueado) {
				// Check if user is logged in
				if (game.url.includes('/deportes')) {
					// Check if game URL is for sports
					this.$router.push(game.url); // Navigate to game URL
				} else {
					this.appComponent.openLink = true; // Set link open state
					this.appComponent.openGame(game); // Open selected game
				}
			} else {
				this.appComponent.showModalLogin = true; // Show login modal if not logged in
			}
		},
	},
});
</script>
<template>
	<!-- Main section for displaying games list -->
	<section
		v-if="gamesList.length > 0"
		class="w-11/12 flex justify-center items-center"
	>
		<div class="w-full flex flex-col justify-center items-center gap-2">
			<div class="h-full w-full flex justify-center items-center">
				<div
					class="w-full h-full flex justify-center items-center gap-2"
				>
					<!-- Button to scroll left -->
					<button
						@click="moveLeft()"
						aria-label="Left"
						class="arrow hover:scale-105 bg-[#4A5160] rounded-full h-10 w-10 flex justify-center items-center"
                        v-bind="analyticsAttrs.arrowPrev"
					>
						<font-awesome-icon
							icon="fa-solid fa-angle-left"
							class="text-neutral/50 text-2xl hover:text-neutral"
						/>
					</button>
					<!-- Slider for displaying games -->
					<ul
						class="slider-casino whitespace-nowrap w-full h-full overflow-x-auto overflow-y-hidden max-w-[600px]"
					>
						<!-- Loop through gamesList to display each game -->
						<li
							v-for="game in gamesList"
							:style="bgGame"
							class="in relative rounded-xl overflow-hidden inline-block mr-2 h-32 w-32"
						>
							<div class="relative w-full h-full">
								<a
									@click="
										navigate(game);
										$event.stopPropagation();
										appComponent.gAnalytics('show_view', {
											nombre: game.name,
										});
									"
									:aria-label="game.name"
                                    v-bind="analyticsAttrs.game(game)"
								>
									<img
										v-show="
											game.icon_3 != undefined &&
											game.icon_3 != null &&
											game.icon_3 != ''
										"
										:src="game.icon_3"
										alt=""
										class="absolute w-full h-full z-20 hover:z-10"
									/>
									<div
										class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
									>
										<p
											class="text-sm max-w-[90px] text-neutral text-center font-bold flex justify-center items-center break-words capitalize"
										>
											{{ game.name.toLowerCase() }}
											<!-- Display game name -->
										</p>
										<button
											class="bg-base-100 text-neutral text-[10px] rounded-full font-bold px-2 uppercase hover:scale-105"
											aria-label="Play"
                                            v-bind="analyticsAttrs.game(game)"
										>
											{{ $t('Jugar ahora') }}
											<!-- Play button text -->
										</button>
									</div>
								</a>
							</div>
						</li>
					</ul>
					<!-- Button to scroll right -->
					<button
						@click="moveRight()"
						aria-label="Right"
						class="arrow hover:scale-105 bg-[#4A5160] rounded-full h-10 w-10 flex justify-center items-center"
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
</template>
<style scoped>
.slider-casino::-webkit-scrollbar {
	display: none; /* Hide scrollbar for the slider */
}
.arrow:hover :nth-child(1) {
	color: white; /* Change color on hover for arrow buttons */
}
</style>

<!-- FILE DOCUMENTED -->

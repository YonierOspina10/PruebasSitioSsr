<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import { useRoute } from 'vue-router'; // Importing Vue Router for route management
import apiService from '@/services/ApiService'; // Importing API service for HTTP requests
import AppCarousel from '@/components/Carousel.vue'; // Importing carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Importing favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Importing search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Importing close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Importing animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Importing left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue';
import { toKebabCase } from '@/utils'; // Importing right chevron icon component

export default defineComponent({
	props: {
		category: String, // Prop for game category
		limit: String, // Prop for the limit of games to fetch
	},
	components: {
		AppCarousel, // Registering carousel component
		favoriteIcon, // Registering favorite icon component
		searchIcon, // Registering search icon component
		IconClose, // Registering close icon component
		animatedCloseIcon, // Registering animated close icon component
		IconChevronLeft, // Registering left chevron icon component
		IconChevronRight, // Registering right chevron icon component
	},
	data: function () {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Accessing application component data
		let bgGame: any = {}; // Background game object
		let preloaderShow: boolean = false; // Flag to show/hide preloader
		let gamesList: any = []; // List of games
		let gameSelected: any = {}; // Selected game object
		let showGame: boolean = false; // Flag to show/hide game details
		let openLink: boolean = true; // Flag to control link opening
		let src: string = ''; // Source URL for the game

		return {
			config,
			appComponent,
			bgGame,
			preloaderShow,
			gamesList,
			gameSelected,
			showGame,
			openLink,
			src,
		};
	},
    computed: {
        analyticsAttrs() {
            const getNames = this.appComponent.config?.newCasino || {};
            let categoryName = this.category || 'all';
            if (getNames[categoryName]) {
                categoryName = getNames[categoryName];
            }
            return {
                fullscreenToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:fullscreen`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                closeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:close`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                homeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:home`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                refreshToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:refresh`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                viewAll: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:view-all`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                arrowPrev: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:arrow-prev`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                arrowNext: {
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:arrow-next`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`
                },
                game: (game: any) => ({
                    'data-analytics-id': `${game.id}`,
                    'data-analytics-label': `casino:carousel:${toKebabCase(categoryName)}:game`,
                    'data-analytics-position': `${this.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                    'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider|layout:${this.appComponent.config.layout}`,
                }),
                menu: (label: any) => ({
                    'data-analytics-label': `${label}`,
                    'data-analytics-context': `component:CasinoSlider|layout:${this.appComponent.config.layout}`,
                }),
            };
        }
    },
	mounted() {
		this.$nextTick(() => {
			let isDown = false; // Flag for mouse/touch down state
			let startX; // Starting X position for dragging
			let scrollLeft; // Initial scroll position
			const slider: any = document.querySelector('.slider-casino'); // Selecting the slider element

			const end = () => {
				// Function to handle end of dragging
				isDown = false;
				slider.classList.remove('active');
			};

			const start = (e) => {
				// Function to handle start of dragging
				isDown = true;
				slider.classList.add('active');
				startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get starting X position
				scrollLeft = slider.scrollLeft; // Store initial scroll position
			};

			const move = (e) => {
				// Function to handle dragging movement
				this.openLink = true; // Allow link opening
				if (!isDown) return; // Exit if not dragging
				this.openLink = false; // Prevent link opening during drag
				e.preventDefault(); // Prevent default behavior
				const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
				const dist = x - startX; // Calculate distance moved
				slider.scrollLeft = scrollLeft - dist; // Update scroll position
			};

			(() => {
				// Immediately invoked function to add event listeners
				slider.addEventListener('mousedown', start); // Mouse down event
				slider.addEventListener('touchstart', start, { passive: true }); // Touch start event
				slider.addEventListener('mousemove', move); // Mouse move event
				slider.addEventListener('touchmove', move, { passive: true }); // Touch move event
				slider.addEventListener('mouseleave', end); // Mouse leave event
				slider.addEventListener('mouseup', end); // Mouse up event
				slider.addEventListener('touchend', end); // Touch end event
			})();

			Array.prototype.forEach.call(
				// Hiding preload game elements
				document.getElementsByClassName('preload-game-bottom'),
				function (el, i) {
					(
						document.getElementsByClassName('preload-game-bottom')[
							i
						] as HTMLElement
					).style.display = 'none'; // Set display to none
				}
			);
		});
		this.getCasinoGames(); // Fetch casino games on mount
	},
	methods: {
		getCasinoGames() {
			// Method to fetch casino games
			this.bgGame = {
				// Set background game style
				background:
					'url(' +
					this.config.casino.preloaderGame +
					')no-repeat 0 50%/cover',
			};
			this.preloaderShow = true; // Show preloader
			let optionsGames = {
				// Options for fetching games
				action: 'getGames2',
				partner_id: this.appComponent.partner,
				offset: 0,
				limit: this.limit,
				category: this.category,
				country: this.appComponent.country,
				isMobile: false,
			};
			if (this.appComponent.mobile == '1') {
				// Check if mobile
				optionsGames.isMobile = true; // Set mobile flag
			} else {
				optionsGames.isMobile = false; // Set mobile flag
			}
			apiService // Making API request to fetch games
				.requestGet(
					this.config.urlVirtualplay + '/cms/products/games/',
					optionsGames
				)
				.then((response: any) => {
					// Handling response
					var json = response.data; // Parse response data
					this.gamesList = json.games; // Set games list
					Array.prototype.forEach.call(
						// Hiding preload game elements
						document.getElementsByClassName('preload-game-top'),
						function (el, i) {
							(
								document.getElementsByClassName(
									'preload-game-top'
								)[i] as HTMLElement
							).style.display = 'none'; // Set display to none
						}
					);
				});
		},
		openGame(game) {
			// Method to open a selected game
			if (this.openLink) {
				// Check if link can be opened
				var vthis = this; // Preserve context
				if (this.appComponent.session.logueado) {
					// Check if user is logged in
					this.showGame = true; // Show game details
					let optionsGames = {
						// Options for opening the game
						gameid: game.id,
						mode: 'real',
						provider: game.provider,
						lan: this.appComponent.lngProd,
						partnerid: this.appComponent.partner,
						token: this.appComponent.tokenUser,
						balance: 0,
						currency: this.appComponent.session.moneda,
						userId: this.appComponent.session.id_user,
						isMobile: false,
					};
					if (this.appComponent.mobile == '1') {
						// Check if mobile
						optionsGames.isMobile = true; // Set mobile flag
					} else {
						optionsGames.isMobile = false; // Set mobile flag
					}
					this.src = // Construct the source URL for the game
						vthis.config.urlCasinoPlay +
						'?gameid=' +
						optionsGames.gameid +
						'&mode=' +
						optionsGames.mode +
						'&provider=' +
						optionsGames.provider +
						'&lan=' +
						optionsGames.lan +
						'&partnerid=' +
						optionsGames.partnerid +
						'&token=' +
						optionsGames.token +
						'&balance=' +
						optionsGames.balance +
						'&currency=' +
						optionsGames.currency +
						'&userid=' +
						optionsGames.userid +
						'&isMobile=' +
						optionsGames.isMobile;
				} else {
					this.clickButtonLogin(); // Trigger login if not logged in
				}
			}
		},
		clickButtonLogin() {
			// Method to show login modal
			this.appComponent.showModalLogin = true; // Show login modal
		},
		closeGame() {
			// Method to close the game
			this.showGame = false; // Hide game details
		},
		moveLeft() {
			// Method to scroll the slider left
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0]; // Get the slider element
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			(
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber - 200, 0); // Scroll left by 200 pixels
		},
		moveRight() {
			// Method to scroll the slider right
			const casinoSlide = (
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0]; // Get the slider element
			let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
			(
				document.getElementsByClassName(
					'slider-casino'
				) as HTMLCollectionOf<HTMLElement>
			)[0].scrollTo(scrollNumber + 200, 0); // Scroll right by 200 pixels
		},
	},
});
</script>
<template>
	<!-- Main container for the framework -->
	<div class="Framework mt-8">
		<!-- Router link for navigating to the new casino page -->
		<RouterLink
			class="my-title uppercase"
			aria-label="Casino bets"
			to="/new-casino"
			v-bind="analyticsAttrs.menu('menu:nav:casino')"
			>{{ $t('Visualizacion Juegos Casino') }}</RouterLink
		>
	</div>

	<!-- Overlay for big games, shown conditionally based on 'showGame' -->
	<div
		class="big-games-overflow fixed top-0 w-full h-full z-20"
		v-if="showGame"
		style="z-index: 99999 !important"
		id="big-games"
	>
		<!-- Background for the big game section -->
		<div class="big-game-background w-full h-full">
			<!-- Container for the big game, with dynamic background image -->
			<div
				class="big-game-contain w-full h-full"
				class-on-scroll="scrolled,notscrolled"
				:style="{
					backgroundImage: 'url(' + config.casino.bg + ')',
					backgroundSize: 'cover',
				}"
			>
				<!-- Casual game container with animation -->
				<div
					class="casual-game animate__animated animate__zoomIn animate__faster table m-auto"
				>
					<!-- Main container for casino game controls -->
					<div
						class="casino-game-contain w-full table-cell text-center"
					>
						<!-- Flash game container -->
						<div
							class="flash-game-contain text-center relative inline-block m-2 align-top"
						>
							<!-- Control panel for the big game -->
							<div
								class="big-game-control absolute inline-block text-right w-full right-0 float-right bg-black h-14"
							>
								<!-- Deposit option, shown conditionally -->
								<div
									class="top-options inline-block px-5 py-1"
									v-if="config.casino.inGame.deposit"
								></div>
								<!-- Container for control icons -->
								<div class="top-options inline-block">
									<!-- Close game icon -->
									<div
										class="icon-delete absolute right-0 top-0 w-12 h-10 text-center cursor-pointer"
										@click="closeGame()"
                                        v-bind="analyticsAttrs.closeToggle"
									>
										<a title="close">
											<animatedCloseIcon
												:fill="'white'"
												:width="20"
												:height="20"
												class="text-xl bottom-1 left-2 absolute text-white cursor-pointer"
												@click="closeGame()"
											></animatedCloseIcon>
										</a>
									</div>
									<!-- Refresh game icon, shown conditionally -->
									<div
										class="icon-delete refresh inline-block w-10 h-12 text-center text-lg"
										v-if="config.casino.inGame.refresh"
									>
										<a
											title="Refresh"
											@click="openGame(gameSelected)"
                                            v-bind="analyticsAttrs.refreshToggle"
											><span
												class="icon-refresh text-base-100"
											></span
										></a>
									</div>
									<!-- Home icon, shown conditionally -->
									<div
										class="icon-delete home inline-block w-10 h-12 text-center text-lg"
										v-if="config.casino.inGame.home"
									>
										<a title="home" @click="closeGame()"
                                           v-bind="analyticsAttrs.homeToggle"
											><span
												class="icon-home1 text-base-100"
											></span
										></a>
									</div>
								</div>
								<!-- Logo container -->
								<div class="div-logo-j float-left h-14">
									<img
										v-lazy="config.logo"
										class="h-full py-3 px-7"
									/>
								</div>
							</div>
							<!-- Iframe for game content -->
							<iframe
								id="game-content"
								number-of-window="1"
								aspect-ratio="16:9"
								:src="src"
                                allow="clipboard-read; clipboard-write"
								class="relative mt-14 bg-black inline-block"
								style="width: 90vw; height: 90vh"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Wrapper for casino content -->
	<div class="mt-10 mb-10">
		<div id="casino-wrapper">
			<!-- Main content area for the casino lobby -->
			<div id="casino-content" class="new-lobby h-full">
				<!-- Lobby container for casino games -->
				<div id="lobby-casino">
					<!-- Separator for games list -->
					<div class="wrapper-separator-games bg-base-content" id="games-casino-list">
						<div class="mt-2"></div>
						<!-- Container for all casino games -->
						<div class="all-games-casino-list">
							<div class="all-casino-games-list-box">
								<div>
									<!-- Button to move left in the game list -->
									<button
										class="btn absolute moveLeft"
										@click="moveLeft()"
										aria-label="Left"
                                        v-bind="analyticsAttrs.arrowPrev"
									>
										<IconChevronLeft
											:width="5"
											:height="10"
										/>
									</button>
									<!-- Button to move right in the game list -->
									<button
										class="btn absolute right-0 moveRight"
										@click="moveRight()"
										aria-label="Right"
                                        v-bind="analyticsAttrs.arrowNext"
									>
										<IconChevronRight
											:width="5"
											:height="10"
										/>
									</button>
									<!-- Container for the game list with scrolling -->
									<div snap-duration="100">
										<ul
											class="whitespace-nowrap w-full ml-5 casino-c overflow-x-scroll overflow-y-hidden slider-casino"
										>
											<!-- Loop through games in the gamesList -->
											<li
												v-for="game in gamesList"
												@click="
													gamesList.idSelect = game.id
												"
												:style="bgGame"
												class="list-games-casino-view-b list-game-width- animate__animated animate__zoomIn animate__faster rounded-xl overflow-hidden games-aspect c-subscribe-box inline-block mr-5 h-52"
												:class="{
													'c-box-rgb':
														game.isBorderNeon,
													'w-72':
														config.casino
															.lobbyType == 1,
													'w-52':
														config.casino
															.lobbyType == 2,
												}"
											>
												<div class="w-full h-full">
													<!-- Game link with click event to open the game -->
													<a
														@click="
															openGame(game);
															$event.stopPropagation();
														"
														href="javascript:;"
														:aria-label="game.name"
                                                        v-bind="analyticsAttrs.game(game)"
													>
														<!-- Game image -->
														<p
															class="game-img-box-b w-full h-full m-0 bg-cover bg-center c-preview rounded-xl"
															v-lazy:background-image="
																game.icon_2
															"
														></p>
														<!-- Play button container, hidden by default -->
														<div
															class="casino-resize-buttons absolute top-2 w-full h-full text-center"
															style="
																display: none;
																pointer-events: none;
															"
														>
															<button
																class="btn-play bg-primary-content text-base-100 rounded-full font-bold py-2 px-7 uppercase"
																aria-label="Play"
                                                                v-bind="analyticsAttrs.game(game)"
															>
																Juegue ahora
															</button>
														</div>
													</a>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
/* Styles for the lobby casino section in the old lobby layout */
.old-lobby #lobby-casino {
	height: 100%; /* Full height of the parent container */
	overflow: hidden; /* Hides overflow content */
	background-size: contain; /* Ensures background image is contained within the element */
}

/* Styles for category icons within the old lobby */
.old-lobby .category-icon {
	width: 40px; /* Fixed width for category icons */
	margin: 0 auto; /* Centers the icon horizontally */
	height: 50px; /* Fixed height for category icons */
}

/* Styles for list items in the category list */
.old-lobby li.category-list {
	float: none; /* No floating for list items */
	display: inline-block; /* Allows for inline display while maintaining block properties */
	box-sizing: border-box; /* Includes padding and border in the element's total width and height */
	color: #fbf2df; /* Light color for text */
	font: /* Font properties for the text */
		13px/16px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	transition: color 250ms; /* Smooth transition for color changes */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	text-overflow: ellipsis; /* Displays ellipsis for overflowed text */
	overflow: hidden; /* Hides overflow content */
	padding: 0 2%; /* Horizontal padding */
	margin-bottom: 5px; /* Space below each list item */
}
/* Styles for the left column navigation in the old lobby */
.old-lobby .left-column-casino-nav {
	text-align: center; /* Center-aligns text within the navigation */
	padding: 20px; /* Adds padding around the navigation */
}

/* Styles for the game list view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 {
	grid-area: span 2 / span 2 / auto / auto; /* Defines grid area for layout */
	width: 100% !important; /* Forces width to 100% */
	height: 100% !important; /* Forces height to 100% */
}

/* Styles for the list items in the providers list */
.old-lobby li.providers-list {
	display: inline-block; /* Displays list items inline */
	vertical-align: top; /* Aligns items to the top */
	color: #fbf2df; /* Sets text color */
	font: /* Sets font properties */
		12px/32px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-transform: uppercase; /* Transforms text to uppercase */
	height: 32px; /* Sets fixed height for list items */
}

/* Styles for the navigation controls in the casino lobby */
.old-lobby #lobby-casino .flex-control-nav {
	max-width: 200px; /* Sets maximum width for the navigation */
	display: inline-table; /* Displays as an inline table */
	left: calc(50% - 100px); /* Centers the navigation horizontally */
	background: #787f90 d1; /* Sets background color */
	padding: 4px; /* Adds padding around the navigation */
	border-radius: 41px; /* Rounds the corners of the navigation */
}
.old-lobby .providers-nav-casino {
	/* Center-aligns text within the casino providers navigation */
	text-align: center;
	/* Floats the element to the left */
	float: left;
	/* Sets the width to 100% of the parent container */
	width: 100%;
	/* Ensures padding and border are included in the element's total width and height */
	box-sizing: border-box;
	/* Sets the background color */
	background: #09132f;
	/* Adds margin at the top and bottom */
	margin: 20px 0 0px;
	/* Removes padding */
	padding: 0;
	/* Applies an animation for opening the provider */
	animation: provider-open-animate-b 500ms ease-in-out;
	/* Hides overflow content */
	overflow: hidden;
	/* Sets a maximum height for the element */
	max-height: 500px;
	/* Sets a fixed height */
	height: 43px;
}

.old-lobby ul.masonry {
	/* Adds padding at the top of the masonry list */
	padding-top: 15px;
}

.old-lobby .providers-nav-slider-casino.closed {
	/* Applies an animation for closing the provider */
	animation: provider-closed-animate-b 280ms ease;
	/* Sets a maximum height when closed */
	max-height: 46px;
}

.old-lobby li.list-games-casino-view-b.preload-game-top,
.old-lobby li.list-games-casino-view-b.preload-game-bottom {
	/* Sets a background color with a transparency value */
	background: #787f90 26;
	/* Applies a pulsing animation effect */
	-webkit-animation: pulset 3s infinite ease-in-out;
	-o-animation: pulst2 3s infinite ease-in-out;
	-ms-animation: pulset 3s infinite ease-in-out;
	-moz-animation: pulset 3s infinite ease-in-out;
	/* Standard animation property for pulsing effect */
	animation: pulset 3s infinite ease-in-out;
}
/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Adjusts padding for the casino providers navigation list on smaller screens */
	.old-lobby .providers-nav-casino > ul {
		padding-left: 25px; /* Sets left padding */
		padding-right: 25px; /* Sets right padding */
	}
}

/* Styles for the casino providers navigation list */
.old-lobby .providers-nav-casino > ul {
	float: left; /* Aligns the list to the left */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-align: center; /* Centers text within the list */
	padding: 0; /* Resets padding */
	font-size: 0; /* Hides text size for child elements */
	height: auto; /* Allows height to adjust based on content */
	overflow: hidden; /* Hides overflow content */
	margin: 2px 0; /* Sets vertical margin */
	padding-top: 4px; /* Adds top padding */
	display: inline-block; /* Allows the element to be inline while maintaining block properties */
	overflow-x: hidden; /* Hides horizontal overflow */
	width: 100%; /* Sets width to full */
	white-space: nowrap; /* Prevents text from wrapping */
	padding-left: 30px; /* Sets left padding */
}

/* Styles for each list item in the casino providers navigation */
.old-lobby .providers-nav-casino > ul > li {
	display: inline-block; /* Displays list items inline */
	vertical-align: top; /* Aligns items to the top */
	color: #fbf2df; /* Sets text color */
	font: /* Defines font properties */
		12px/32px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Fallback font */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	text-transform: uppercase; /* Transforms text to uppercase */
	height: 32px; /* Sets fixed height for list items */
}
/* Styles for the casino games list box within the old lobby */
.old-lobby .all-casino-games-list-box,
.old-lobby .all-casino-games-list-box > div,
.old-lobby .all-casino-games-list-box > div > ul {
	width: 100%; /* Set width to 100% for full container usage */
	box-sizing: border-box; /* Include padding and border in element's total width and height */
}

/* Styles for the overall casino games list */
.old-lobby .all-games-casino-list {
	box-sizing: border-box; /* Include padding and border in element's total width and height */
	width: 100%; /* Set width to 100% for full container usage */
	padding: 0; /* Remove default padding */
	min-height: 750px; /* Set minimum height for the list */
	margin-bottom: 10px; /* Add margin below the list */
}

/* Styles for the game list within the casino games list box */
.old-lobby .all-casino-games-list-box > div > ul {
	display: grid !important; /* Use grid layout for the game list */
	grid-template-columns: repeat(
		auto-fill,
		minmax(180px, 1fr)
	); /* Create responsive columns */
	grid-gap: 16px; /* Set gap between grid items */
	grid-auto-rows: minmax(129px, auto); /* Set minimum height for grid rows */
	grid-auto-flow: dense; /* Optimize space usage in the grid */
}

/* Styles for the game view container and its elements */
.old-lobby .list-games-casino-view-b,
.old-lobby .list-games-casino-view-b .game-img-box-b,
.old-lobby .list-games-casino-view-b > div {
	width: 100% !important; /* Set width to 100% for full container usage */
	height: 100% !important; /* Set height to 100% for full container usage */
	border-radius: 6px; /* Apply rounded corners to the elements */
}
/* Styles for the old lobby section */
.old-lobby .game-img-box-b:before {
	/* Pseudo-element for overlay effect */
	content: ''; /* Empty content for the pseudo-element */
	display: block; /* Display as a block element */
	position: absolute; /* Positioned absolutely within the parent */
	top: 0; /* Align to the top */
	left: 0; /* Align to the left */
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	z-index: 88; /* Stack order for overlay */
	background: #171a22 ed; /* Background color with a potential typo 'ed' */
	opacity: 0; /* Initially hidden */
	transition: opacity 0.8s; /* Smooth transition for opacity changes */
}

.old-lobby .game-img-box-b {
	/* Styles for the game image box */
	float: left; /* Float to the left */
	width: 100%; /* Full width of the container */
	background-size: cover; /* Cover the background area */
	background-repeat: no-repeat; /* Prevent background repetition */
	background-position: 50% 50%; /* Center the background image */
	height: 114px; /* Fixed height */
	box-sizing: border-box; /* Include padding and border in element's total width and height */
	position: relative; /* Position relative for absolute positioning of children */
	display: block; /* Display as a block element */
}

.old-lobby
/* Container for deposit alerts in the casino section */
	.deposit-alert-contain.casino

	/* Slider for displaying games */
	.games-slider

	/* List container for all casino games */
	.all-games-casino-list

	ul
	/* List item style for games in the casino view */
	li.list-games-casino-view-b,
	.old-lobby .list-games-casino-view-b,
	.old-lobby .save-games-contain .games-slider ul > .list-games-casino-view-b {
	float: left; /* Aligns items to the left */
	width: 20%; /* Sets the width of each game item */
	height: auto; /* Allows height to adjust based on content */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	display: block; /* Displays list items as block elements */
	margin: 0 5px 5px 0; /* Sets margin around list items */
	animation: popup-enter 0.3s ease-in-out; /* Applies animation for entering effect */
	transform: translate3d(
		0,
		0,
		0
	); /* Enables hardware acceleration for smoother animations */
}

/* Wrapper for separating games in the old lobby */
.old-lobby .wrapper-separator-games {
	width: 100%; /* Full width of the parent container */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
	position: relative; /* Positions the element relative to its normal position */
}

/* Padding for the separator in the old lobby */
.old-lobby .wrapper-separator-games {
	padding: 0 5% !important; /* Sets horizontal padding with !important to override other styles */
}

/* Style for casino resize buttons in the old lobby */
.old-lobby .casino-resize-buttons > div {
	display: inline-block; /* Displays buttons inline */
	height: 60px; /* Fixed height for buttons */
}
/* Styles for the favorite game name in the old lobby section */
.old-lobby .deposit-alert-contain.casino .game-name-b-favorite,
.old-lobby .game-name-b-favorite {
	/* Aligns the element to the left and sets full width */
	float: left;
	width: 100%;
	/* Ensures padding is included in the total width calculation */
	box-sizing: border-box;
	/* Sets horizontal padding */
	padding: 0 15px 0 8px;
	/* Sets a fixed height for the element */
	height: 28px;
	/* Resets background to transparent */
	background: 0 0;
	/* Sets font properties including size, line height, and family */
	font:
		12px/28px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Makes the font bold */
	font-weight: 700;
	/* Sets the text color */
	color: #fbf2df;
	/* Removes text decoration (e.g., underline) */
	text-decoration: none;
	/* Allows text to wrap normally */
	white-space: unset;
	/* Handles overflow with ellipsis */
	text-overflow: ellipsis;
	/* Positions the element relative to its normal position */
	position: relative;
	/* Sets the stacking order of the element */
	z-index: 22;
	/* Sets initial opacity to 0 for fade-in effect */
	opacity: 0;
	/* Smooth transition for opacity change */
	transition: opacity 2s;
	/* Centers the text within the element */
	text-align: center;
	/* Removes bottom margin */
	margin-bottom: 0;
}
.old-lobby .favorite-icon-view {
	/* Set dimensions for the favorite icon view */
	width: 24px; /* Width of the icon */
	height: 16px; /* Height of the icon */
	position: absolute; /* Positioning relative to the nearest positioned ancestor */
	right: 0; /* Align to the right */
	top: 6px; /* Offset from the top */
	font: 14px/16px FontAwesome; /* Font settings using FontAwesome */
	color: #88be86; /* Default icon color */
	font-style: normal; /* Normal font style */
	text-decoration: none; /* No text decoration */
	z-index: 88; /* Stacking order */
	transition: color 250ms; /* Smooth color transition on hover */
	display: block; /* Display as a block element */
	text-align: center; /* Center align text/icon */
}
.old-lobby .favorite-icon-view.active,
.old-lobby .favorite-icon-view:hover {
	/* Change color when active or hovered */
	color: #00d30a; /* Active/hover color */
}
.old-lobby .casino-resize-buttons > div button span {
	/* Style for button spans within casino resize buttons */
	width: 100%; /* Full width of the parent */
	height: 100%; /* Full height of the parent */
	display: block; /* Display as a block element */
	overflow: hidden; /* Hide overflow content */
	text-overflow: ellipsis; /* Show ellipsis for overflow text */
	padding: 0 12px; /* Horizontal padding */
	box-sizing: border-box; /* Include padding in width/height calculations */
}
/* Style for the favorite icon in the old lobby section */
.old-lobby .favorite-icon-view:before {
	content: '\f005'; /* Font Awesome star icon */
}

/* Container for casino resize buttons */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of the container */
	font: /* Font settings for the button text */
		12px/29px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0 auto; /* Center the button horizontally */
}

/* Button styles for casino resize buttons */
.old-lobby .casino-resize-buttons > div button {
	height: 30px; /* Fixed height for buttons */
	display: block; /* Display as block element */
	width: 100%; /* Full width of the parent container */
	padding: 0; /* No padding */
	border: 0; /* No border */
	-webkit-border-radius: 5px; /* Rounded corners for WebKit browsers */
	-moz-border-radius: 5px; /* Rounded corners for Mozilla browsers */
	border-radius: 5px; /* Standard rounded corners */
	opacity: 0; /* Initially hidden */
	transition: opacity 500ms; /* Smooth transition for opacity changes */
	background: linear-gradient(
		to bottom,
		#00ff14,
		#006208
	); /* Green gradient background */
	font-weight: bold !important; /* Bold text */
	color: white; /* Text color */
	font: /* Font settings for the button text */
		12px/30px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	text-transform: uppercase; /* Uppercase text */
	cursor: pointer; /* Pointer cursor on hover */
}
/* Styles for buttons within the casino resize buttons container */
.old-lobby .casino-resize-buttons > div button {
	width: 80%; /* Set button width to 80% of the parent container */
	font: /* Font properties for the button text */
		12px/29px Quicksand,
		/* Font size and line height for Quicksand */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	margin: 0 auto; /* Center the button horizontally */
}

/* Container for casino resize buttons */
.old-lobby .casino-resize-buttons {
	display: block; /* Display as a block element */
	width: 100%; /* Full width of the parent */
	position: absolute; /* Positioned absolutely within the parent */
	height: 60px; /* Fixed height for the container */
	text-align: center; /* Center text within the container */
	top: 0; /* Align to the top of the parent */
	left: 0; /* Align to the left of the parent */
	right: 0; /* Align to the right of the parent */
	margin: 0; /* No margin */
	z-index: 90; /* High stacking order to appear above other elements */
}

/* Hover effect for game image box */
.old-lobby .list-games-casino-view-b:hover .game-img-box-b:before {
	opacity: 1; /* Fully visible on hover */
}

/* Adjust margin for paragraph within casino resize buttons on hover */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div > p {
	margin-bottom: 35px !important; /* Override any other margin settings */
}
/* Styles for the old lobby section of the casino games view */
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button {
	/* Button transforms on hover to reset position */
	transform: translateX(0);
}

.old-lobby .list-games-casino-view-b:hover > a {
	/* Changes border color of the link on hover */
	border-color: #fea402;
}

.old-lobby .list-games-casino-view-b:hover .play-now-game-b > span {
	/* Transforms and sets opacity for the play now button on hover */
	transform: translate3d(0, 0, 0);
	opacity: 1;
}

.old-lobby .list-games-casino-view-b:hover .game-name-b-favorite {
	/* Changes text color of the favorite game name on hover */
	color: white;
}

.old-lobby
	.list-games-casino-view-b:hover
	.casino-resize-buttons
	> div
	.game-name-b-favorite,
.old-lobby .list-games-casino-view-b:hover .casino-resize-buttons > div button,
.old-lobby .list-games-casino-view-b:hover > a > .game-img-box-b:before {
	/* Sets opacity to 1 for various elements on hover */
	opacity: 1;
}

.old-lobby .list-games-casino-view-b.rows-2 {
	/* Defines grid layout and dimensions for the game view in rows-2 class */
	grid-column: span 2; /* Spans 2 columns */
	grid-row: span 2; /* Spans 2 rows */
	width: 100% !important; /* Forces width to 100% */
	height: 100% !important; /* Forces height to 100% */
}
/* Keyframes for the pulse animation effect used in the casino lobby */
@keyframes pulseCasino {
	0% {
		transform: scale(1); /* Initial scale of the element */
		box-shadow: 0 0 0 0 #ff9600; /* No shadow at the start */
	}
	70% {
		transform: scale(1); /* Maintain scale during the animation */
		box-shadow: 0 0 0 7px #0c1019 0; /* Shadow effect at 70% */
	}
	100% {
		transform: scale(1); /* Final scale of the element */
		box-shadow: 0 0 0 0 #ff9600 40; /* Shadow returns to none */
	}
}

/* Styling for the neon effect on elements within the old lobby */
.old-lobby .neon1 {
	border: 2px solid #dc8200; /* Border color for neon effect */
	animation: pulseCasino 2s infinite; /* Apply pulse animation */
}

/* Media query for screens with a maximum width of 1260px */
@media screen and (max-width: 1260px) {
	.old-lobby .all-games-casino-list {
		padding-left: 0; /* Remove left padding for smaller screens */
	}
}

/* Media query for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
	.old-lobby {
		/* Additional styles can be added here for small screens */
	}
	.old-lobby .wrapper-separator-games {
		float: none; /* Disable floating for the separator */
		margin-top: 110px; /* Set top margin for spacing */
		overflow-y: scroll; /* Enable vertical scrolling */
		height: calc(100% - 110px); /* Set height based on available space */
	}
	.old-lobby .left-column-casino-nav > ul > li {
		/* Additional styles can be added here for list items */
	}
}
/* Media query for screens with a maximum width of 416px */
@media only screen and (max-width: 416px) {
	/* Styles for game list items in old lobby with specific classes */
	.old-lobby .list-game-width-100,
	.old-lobby .list-games-casino-view-b.rows-2 {
		/* Span one column and one row in the grid layout */
		grid-column: span 1;
		grid-row: span 1;
	}
	/* Styles for the casino games list box */
	.old-lobby .all-casino-games-list-box > div > ul {
		/* Set minimum row height and define responsive column layout */
		grid-auto-rows: minmax(120px, auto);
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
}

/* Styles for the Poker category list in the old lobby */
.old-lobby .category-list.Poker .st0 {
	/* Fill color for the first state */
	fill: #d8d6ce;
}
.old-lobby .category-list.Poker .st1 {
	/* Fill color for the second state */
	fill: #eae9e5;
}
.old-lobby .category-list.Poker .st2 {
	/* Fill color for the third state */
	fill: #b99028;
}
.old-lobby .category-list.Poker .st3 {
	/* Fill color for the fourth state */
	fill: #656d78;
}
.old-lobby .category-list.Poker .st4 {
	/* Fill color for the fifth state */
	fill: #af8527;
}
/* Styles for the casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons {
	height: 100%; /* Set height to 100% of the parent element */
}

/* Styles for game image boxes in the old lobby with 2 columns */
.old-lobby .list-games-casino-view-b.columns-2 .game-img-box-b {
	height: 100% !important; /* Force height to 100% overriding other styles */
}

/* Styles for the divs inside casino resize buttons in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .casino-resize-buttons > div {
	width: 100%; /* Set width to 100% of the parent element */
}

/* Styles for the favorite icon view in the old lobby with 2 rows */
.old-lobby .list-games-casino-view-b.rows-2 .favorite-icon-view {
	width: 25px; /* Set width of the favorite icon */
	height: 25px; /* Set height of the favorite icon */
	font-size: 30px; /* Set font size for the icon */
	right: 5px; /* Position the icon 5px from the right */
}

/* Styles for buttons inside casino resize buttons in the old lobby with 2 rows */
.old-lobby
	.list-games-casino-view-b.rows-2
	.casino-resize-buttons
	> div
	button {
	margin-top: 20%; /* Add top margin of 20% */
	display: inline-block; /* Display buttons inline */
}

/* Styles for the search input in the old lobby */
.old-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width change in WebKit browsers */
	transition: width 2s; /* Smooth transition for width change */
	width: 84px; /* Set initial width of the search input */
}
/* Styles for the casino navigation in the left column of the old lobby */
.old-lobby .left-column-casino-nav > ul {
	float: left; /* Aligns the navigation list to the left */
	width: 100%; /* Full width of the parent container */
	box-sizing: border-box; /* Includes padding and border in the element's total width */
	display: block; /* Displays the element as a block */
	white-space: nowrap; /* Prevents text from wrapping to the next line */
	padding-top: 10px; /* Adds space above the navigation list */
}

/* Overflow settings for the navigation list */
.old-lobby .left-column-casino-nav > ul {
	overflow-x: auto; /* Enables horizontal scrolling if content overflows */
	overflow-y: hidden; /* Hides vertical overflow */
}

/* Styles for individual list items in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li {
	float: none; /* Resets float for list items */
	display: inline-block; /* Displays list items inline */
	box-sizing: border-box; /* Includes padding and border in the element's total width */
	color: #fbf2df; /* Sets the text color */
	font: /* Defines font properties */
		13px/15px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	transition: color 250ms; /* Smooth transition for color changes */
	white-space: nowrap; /* Prevents text from wrapping */
	text-overflow: ellipsis; /* Displays ellipsis for overflowing text */
	overflow: hidden; /* Hides overflow content */
	padding: 0 2%; /* Adds horizontal padding */
	margin-bottom: 5px; /* Adds space below each list item */
	vertical-align: top; /* Aligns items to the top */
	cursor: pointer; /* Changes cursor to pointer on hover */
}
/* Styles for the search block in the old lobby section */
.old-lobby #searchv3 .block-search {
	height: 55px !important; /* Sets the height of the search block */
	min-width: 55px !important; /* Sets the minimum width of the search block */
	background: transparent; /* Makes the background transparent */
	width: 100% !important; /* Sets the width to 100% of the parent container */
	max-width: 100% !important; /* Ensures the maximum width is also 100% */
	margin: 0 !important; /* Resets margin to 0 */
	margin-top: 10px !important; /* Adds a top margin of 10px */
	margin-bottom: 5px !important; /* Adds a bottom margin of 5px */
	border: 1px solid #ff9600; /* Adds a solid border with a specific color */
	border-radius: 40px; /* Rounds the corners of the border */
}

/* Styles for the search block in the old lobby section */
.old-lobby .block-search {
	padding: 0; /* Removes padding from the search block */
	min-width: 35px; /* Sets the minimum width of the search block */
	margin: 5px 5px 0 0; /* Sets margin with specific values for each side */
	height: 30px; /* Sets the height of the search block */
	border-radius: 3px; /* Rounds the corners of the border */
	background: #fff; /* Sets the background color to white */
}

/* Additional styles for the search block in the old lobby section */
.old-lobby .block-search {
	float: right; /* Aligns the search block to the right */
	position: relative; /* Sets the position to relative for positioning context */
	z-index: 999; /* Sets a high stacking order for the search block */
	text-align: right; /* Aligns text to the right within the block */
	max-width: 250px; /* Sets the maximum width of the search block */
}
/* Styles for the search icon in the old lobby section */
.old-lobby #searchv3 .block-search:before {
	content: '\f002' !important; /* FontAwesome search icon */
	font: 33px/50px FontAwesome !important; /* Font size and line height */
	color: #ff9600 !important; /* Icon color */
	position: absolute; /* Positioning relative to the nearest positioned ancestor */
	left: 10px; /* Left offset */
	top: 0; /* Top offset */
}

/* Styles for the search input in the old lobby section */
.old-lobby li#searchv3 input#SearchGame {
	transition: none !important; /* Disable transition effects */
	cursor: pointer !important; /* Change cursor to pointer on hover */
}

/* Styles for the hidden search input in the old lobby section */
.old-lobby input#SearchGame.ng-hide {
	width: 0; /* Width set to 0 when hidden */
	transition: width 1s; /* Transition effect for width change */
	display: block !important; /* Ensure the input is displayed as a block */
	float: right; /* Float the input to the right */
	border: 0; /* Remove border */
}

/* Styles for the text input in the search block */
.old-lobby .block-search input[type='text'] {
	color: #686767; /* Text color */
	font: /* Font stack for the input text */
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0; /* Remove default margin */
	padding: 8px 5px 8px 30px; /* Padding for the input */
	background: 0 0; /* Transparent background */
	position: relative; /* Positioning relative to the normal flow */
	z-index: 22; /* Stacking order */
}
/* Styles for the search input field in the old lobby */
.old-lobby .block-search input[type='text'] {
	width: 0; /* Initial width set to 0 for hidden state */
	border: 0; /* No border for a clean look */
	vertical-align: middle; /* Aligns input vertically in the middle */
	transition: width 600ms; /* Smooth transition for width change */
	border-radius: 3px; /* Rounded corners for the input field */
}

/* Styles for the search input field when the search is open */
.old-lobby li#searchv3.open .block-search input[type='text'] {
	width: 100%; /* Full width when open */
	padding: 0 0 0 60px !important; /* Padding to position text inside */
	height: 100%; /* Full height to match container */
	color: #fff; /* White text color for visibility */
}

/* Styles for the search results container */
.old-lobby .search-results-inner {
	float: left; /* Floats the container to the left */
	width: 100%; /* Full width of the parent */
	padding: 10px 0 0; /* Padding for spacing */
	position: relative; /* Allows for absolute positioning of children */
	z-index: 999; /* High z-index to ensure visibility above other elements */
	background: #fff; /* White background for the results */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

/* Styles for the arrow indicator in the sports section */
.old-lobby .search-results-inner .arrow-sport {
	top: -6px; /* Positions the arrow slightly above its normal position */
}
/* Positioning the arrow-sport element within the search results */
.old-lobby .search-results-inner .arrow-sport {
	right: 50%; /* Aligns the element to the center horizontally */
}

/* Styles for the arrow-sport element */
.old-lobby .arrow-sport {
	width: 14px; /* Sets the width of the arrow */
	height: 11px; /* Sets the height of the arrow */
	display: block; /* Makes the element a block-level element */
	position: absolute; /* Positions the element absolutely within its parent */
	right: 2px; /* Positions the element 2px from the right */
	top: -11px; /* Positions the element 11px above its normal position */
	z-index: 999; /* Ensures the element is on top of other elements */
}

/* Styles for the h3 headings within the search results */
.old-lobby .search-results-inner h3 {
	font: /* Sets the font properties for the heading */
		20px/22px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #121623; /* Sets the text color */
	text-transform: uppercase; /* Transforms text to uppercase */
}

/* Additional styles for the h3 headings */
.old-lobby .search-results-inner h3 {
	width: 100%; /* Sets the width to 100% of the parent */
	float: left; /* Floats the heading to the left */
	padding: 0; /* Removes any padding */
	text-indent: 10px; /* Indents the text by 10px */
	text-align: left; /* Aligns the text to the left */
}
/* Styles for various elements within the .old-lobby class */

/* Search result container */
.old-lobby #result-search,
/* Bet container */
.old-lobby .bet-container,
/* Block for more events */
.old-lobby .block-more-event,
/* Language selection dropdown */
.old-lobby .clock .open-lang ul,
/* Hover state for goals container */
.old-lobby .conteiner-goals .hover-sp,
/* Games slider within deposit alert for casino */
.old-lobby .deposit-alert-contain.casino .games-slider ul,
/* Express betting container */
.old-lobby .express-contain,
/* Feedback information textarea */
.old-lobby .fedback-info ul li textarea,
/* Sign-in form within deposit container */
.old-lobby .form-contain.deposit .form-sign-in,
/* General text list */
.old-lobby .general-text-list,
/* Message container */
.old-lobby .message-contain,
/* Radio container for withdrawals */
.old-lobby .radio-contein-withdraw,
/* Modern right betslip container */
.old-lobby .right-betslip-contain-modern,
/* Right block history, message compose, settings info, and form text area */
.old-lobby
	.right-block-history.message.compose
	.settings-info-contain
	.form-text
	textarea,
/* Casino search results inner container */
.old-lobby .search-results-inner.casino #casino-result-search,
/* Text payment container */
.old-lobby .text-payment-contain,
/* Hover state for current time info */
.old-lobby .tl-new .current-time:hover ~ .tl-info .hover-sp,
/* Hover state for timeline info */
.old-lobby .tl-new .tl-info:hover .hover-sp,
/* Draws container */
.old-lobby div.draws-contain {
	/* Enable vertical scrolling and hide horizontal scrolling */
	overflow-y: auto;
	overflow-x: hidden;
	/* Custom scrollbar colors */
	scrollbar-track-color: #0c0e14;
	scrollbar-shadow-color: #0c0e14;
	scrollbar-base-color: #373f4e;
	scrollbar-arrow-color: #373f4e;
}
.old-lobby .search-results-inner.casino #casino-result-search {
	/* Container for search results in the casino section */
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the parent element */
	max-height: 450px; /* Limits the maximum height */
	overflow-y: auto; /* Enables vertical scrolling if content exceeds max height */
	overflow-x: hidden; /* Hides horizontal overflow */
	margin: 10px 0 0; /* Adds margin at the top */
}
.old-lobby .search-no-results {
	/* Styles for the 'no results' message */
	font: /* Font properties for the text */
		16px/38px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding on left and right */
	box-sizing: border-box; /* Includes padding in width calculation */
}
.old-lobby .search-no-results {
	/* Additional styles for the 'no results' message */
	float: left; /* Aligns the message to the left */
	width: 100%; /* Full width of the parent element */
	text-align: left; /* Aligns text to the left */
}
.old-lobby #menuLeft,
.old-lobby #menuRight {
	/* Hides the left and right menu elements in the old lobby */
	display: none; /* No display for these elements */
}
/* Styles for the old lobby menu on the left side */
.old-lobby #menuLeftProviders {
	float: left; /* Aligns the menu to the left */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: hsl(var(--af)); /* Background color of the menu */
	color: hsl(var(--n)); /* Text color of the menu */
	position: absolute; /* Positions the menu absolutely */
	left: 0; /* Aligns the menu to the left edge */
	display: block; /* Displays the menu as a block element */
	z-index: 99999; /* Ensures the menu is on top of other elements */
}

/* Styles for the old lobby menu on the right side */
.old-lobby #menuRightProviders {
	float: right; /* Aligns the menu to the right */
	width: 20px; /* Sets the width of the menu */
	padding: 13px 5px 13px 5px; /* Adds padding around the menu */
	background: hsl(var(--af)); /* Background color of the menu */
	color: hsl(var(--n)); /* Text color of the menu */
	position: absolute; /* Positions the menu absolutely */
	right: 0; /* Aligns the menu to the right edge */
	display: block; /* Displays the menu as a block element */
	z-index: 99999; /* Ensures the menu is on top of other elements */
}

/* Media query for screens with a maximum width of 550px */
@media screen and (max-width: 550px) {
	/* Hides the home slider in the old lobby */
	.old-lobby div#home-slider {
		display: none; /* Hides the element */
	}

	/* Adjusts the category list for all games */
	.old-lobby li.category-list.all-games {
		float: none !important; /* Overrides float property to stack vertically */
	}

	/* Styles for the left menu in the old lobby */
	.old-lobby #menuLeft {
		float: left; /* Aligns the menu to the left */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: hsl(var(--af)); /* Background color of the menu */
		color: hsl(var(--n)); /* Text color of the menu */
		position: absolute; /* Positions the menu absolutely */
		left: 0; /* Aligns the menu to the left edge */
		display: block; /* Displays the menu as a block element */
		z-index: 1000; /* Ensures the menu is on top of other elements */
	}

	/* Styles for the right menu in the old lobby */
	.old-lobby #menuRight {
		float: right; /* Aligns the menu to the right */
		width: 25px; /* Sets the width of the menu */
		padding: 30px 0; /* Adds vertical padding */
		background: hsl(var(--af)); /* Background color of the menu */
		color: hsl(var(--n)); /* Text color of the menu */
		position: absolute; /* Positions the menu absolutely */
		right: 0; /* Aligns the menu to the right edge */
		display: block; /* Displays the menu as a block element */
		z-index: 1000; /* Ensures the menu is on top of other elements */
	}

	/* Styles for the casino providers navigation */
	.old-lobby .providers-nav-casino > ul {
		padding-left: 25px; /* Adds left padding */
		padding-right: 25px; /* Adds right padding */
		overflow-x: scroll; /* Allows horizontal scrolling */
	}

	/* Styles for the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul {
		padding-left: 0; /* Removes left padding */
		padding-right: 0; /* Removes right padding */
	}

	/* Styles for the search element in the old lobby */
	.old-lobby li#searchv3 {
		width: 66px; /* Sets the width of the search element */
	}
}
/* Container for the search category navigation in the old lobby */
.old-lobby .search-category-nav-contain {
	width: 95%; /* Sets the width of the container to 95% of its parent */
	margin: 0 auto; /* Centers the container horizontally */
}

/* Responsive styles for screens with a maximum width of 700px */
@media screen and (max-width: 700px) {
	/* Adjusts the height of SVG icons in the left column casino navigation */
	.old-lobby .left-column-casino-nav > ul > li svg {
		height: 35px !important; /* Forces the height to 35px */
	}
}

/* Styles for the casino content area in the old lobby */
.old-lobby div#casino-content {
	height: 100% !important; /* Forces the height to 100% */
	padding-bottom: 0 !important; /* Removes bottom padding */
}

/* Styles for the CasinoSliderBox within the lobby casino */
.old-lobby #lobby-casino div#CasinoSliderBox {
	border-radius: 0 0 35px 35px; /* Rounds the bottom corners */
	width: 91%; /* Sets the width to 91% of its parent */
	margin: 0 auto; /* Centers the slider box horizontally */
	overflow: hidden; /* Hides overflow content */
}

/* Styles for the home slider within the lobby casino */
.old-lobby #lobby-casino div#home-slider {
	background: #091023; /* Sets the background color */
	box-shadow: none; /* Removes any box shadow */
}

/* Styles for SVG icons in the left column casino navigation */
.old-lobby .left-column-casino-nav > ul > li svg {
	width: 40px; /* Sets the width of the SVG icons */
	height: 50px; /* Sets the height of the SVG icons */
}
.old-lobby .Populares .category-icon svg {
	/* Default fill color for category icons in the Populares section */
	fill: #787f90;
}
.old-lobby .Populares:hover .category-icon svg {
	/* Fill color and transformation for category icons on hover in the Populares section */
	fill: url(#SVGID_hot) #ffc107; /* Gradient fill on hover */
	transform: scale(1.1); /* Slightly enlarge the icon */
	transition: 300ms; /* Smooth transition effect */
}
.old-lobby .Populares.active .category-icon svg {
	/* Fill color for active category icons in the Populares section */
	fill: url(#SVGID_hot) #ffc107; /* Gradient fill for active state */
}
.old-lobby li:hover .category-icon svg {
	/* Fill color and transformation for category icons on hover in list items */
	fill: url(#SVGID_slots3) #ffc107; /* Gradient fill on hover */
	transform: scale(1.1); /* Slightly enlarge the icon */
	transition: 300ms; /* Smooth transition effect */
}
.old-lobby li.active .category-icon svg {
	/* Fill color for active category icons in list items */
	fill: url(#SVGID_slots3) #ffc107; /* Gradient fill for active state */
}
.old-lobby li .category-icon svg {
	/* Default fill color for category icons in list items */
	fill: #787f90; /* Standard fill color */
}
.old-lobby li.category-list.all-games {
	/* Styling for the all-games category list item */
	border-left: 2px solid #ff9600; /* Left border to highlight the item */
	margin-left: 10px; /* Left margin for spacing */
	padding-left: 15px; /* Padding on the left for better alignment */
}
.old-lobby .fixed-element-parent {
	/* Container for fixed elements within the old lobby */
	float: left; /* Aligns the element to the left */
	width: 100%; /* Full width of the parent */
	position: relative; /* Establishes a positioning context for absolute children */
	z-index: 300; /* Stacking order for overlapping elements */
}
.old-lobby .fixed-nav-wrapper-casino-view {
	/* Navigation wrapper for casino view in the old lobby */
	float: left; /* Aligns the element to the left */
	width: 100%; /* Full width of the parent */
	background: hsl(var(--bc)); /* Dark background color */
}
.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed {
	/* Fixed navigation wrapper that becomes scrollable */
	position: fixed; /* Fixes the element in place during scrolling */
	top: 0; /* Positions the element at the top of the viewport */
	max-width: inherit; /* Inherits the maximum width from the parent */
	z-index: 99; /* Stacking order for overlapping elements */
	width: 100%; /* Full width of the viewport */
	background: hsl(var(--bc)) !important; /* Dark background color with !important to override other styles */
	padding-top: 0; /* No padding at the top */
}
.old-lobby .fixed-element-parent .scrollable-fixed {
	/* Fixed element that is scrollable within the fixed element parent */
	position: fixed; /* Fixes the element in place during scrolling */
	z-index: 400; /* Stacking order for overlapping elements */
}
.old-lobby .sticky {
	/* Sticky element that remains fixed at the top */
	position: fixed; /* Fixes the element in place during scrolling */
	top: 0; /* Positions the element at the top of the viewport */
	width: 100%; /* Full width of the viewport */
}
/* Styles for the fixed navigation wrapper in the casino view */
.old-lobby .fixed-nav-wrapper-casino-view.scrollable-fixed:before {
	content: ''; /* Empty content for pseudo-element */
	display: block; /* Display as a block element */
	position: absolute; /* Positioned absolutely within the parent */
	height: 3px; /* Height of the line */
	width: 100%; /* Full width of the parent */
	left: 0; /* Align to the left */
	top: -3px; /* Position above the parent */
	background: hsl(var(--bc)); /* Dark background color */
}

/* Cursor style for clickable elements */
.old-lobby [ng-click],
.old-lobby [ng-mousedown] {
	cursor: pointer; /* Change cursor to pointer for interactivity */
}

/* Container for all casino games */
.old-lobby .all-casino-games-box {
	float: left; /* Float to the left */
	width: 100%; /* Full width of the parent */
	box-sizing: border-box; /* Include padding and border in width */
	margin: 10px 0 0; /* Margin for spacing */
	position: relative; /* Position relative for child elements */
	z-index: 9; /* Stack order for overlapping elements */
	margin-top: 0; /* Reset top margin */
}

/* Disable text selection for the games box */
.old-lobby .all-casino-games-box {
	-moz-user-select: none; /* Firefox */
	-khtml-user-select: none; /* Older versions of Safari */
	user-select: none; /* Standard syntax */
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* Internet Explorer */
}
/* Styles for active and hovered list items in the casino navigation */
.old-lobby .left-column-casino-nav > ul > li.active,
.old-lobby .left-column-casino-nav > ul > li:hover {
	color: #fbf2df; /* Text color for active and hovered items */
	text-shadow: /* Multiple shadows for a glowing effect */
		0 0 20px #fff,
		/* White glow */ 0 0 20px #000,
		/* Black shadow */ 0 0 0 #ffd178,
		/* Light orange shadow */ 0 0 0 #f17,
		/* Red shadow */ 0 0 0 #f17,
		/* Red shadow (duplicate) */ 0 0 80px #f17,
		/* Intense red glow */ 0 0 100px #f17,
		/* Intense red glow */ 0 0 150px #f1a; /* Light red glow */
}

/* Styles for the search input when open */
.old-lobby li#searchv3.open {
	width: 89% !important; /* Override width to 89% when open */
}

/* Styles for the search input on hover */
.old-lobby li#searchv3:hover {
	text-shadow: none !important; /* Remove text shadow on hover */
}

/* Styles for active links in the providers navigation */
.old-lobby .providers-nav-casino > ul > li > a.active {
	background: linear-gradient(
		to bottom,
		#ffc87a,
		#ff9600,
		#9f5d00
	); /* Gradient background */
	color: #171a22; /* Text color for active links */
	font-weight: bold; /* Bold text for emphasis */
}
/* Styles for the casino navigation links in the old lobby */
.old-lobby .providers-nav-casino > ul > li > a:hover {
	background: #393d49; /* Background color on hover */
}

@media screen and (max-width: 1260px) {
	/* Adjust padding for casino navigation links on smaller screens */
	.old-lobby .providers-nav-casino > ul > li > a {
		padding: 0 10px; /* Reduced padding for better fit */
	}
}

/* Base styles for casino navigation links */
.old-lobby .providers-nav-casino > ul > li > a {
	text-decoration: none; /* Remove underline from links */
	float: left; /* Align links horizontally */
	color: #fbf2df; /* Text color */
	display: block; /* Make the link a block element */
	padding: 0 15px; /* Horizontal padding */
	box-sizing: border-box; /* Include padding in width/height calculations */
	transition: color 260ms; /* Smooth color transition */
	border-radius: 5px; /* Rounded corners */
	height: 100%; /* Full height */
	width: 100%; /* Full width */
}

/* Styles for the load more button for casino games */
.old-lobby .more-casino-games-load-b {
	float: left; /* Align button horizontally */
	width: 100%; /* Full width */
	margin: 30px 0; /* Vertical margin */
	box-sizing: border-box; /* Include padding in width/height calculations */
	text-align: center; /* Center text inside the button */
	padding: 0 0 0 10px; /* Padding on the left */
	transform: translate3d(0, 0, 0); /* Enable hardware acceleration */
}
/* Styles for the paragraph element within the more-casino-games-load-b class in the old-lobby */
.old-lobby .more-casino-games-load-b > p {
	font: /* Font properties including size, line height, and font family */
		14px/38px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	font-weight: 700; /* Bold font weight */
	color: hsl(var(--n)); /* Text color */
	transition: /* Transition effects for color and border */
		color 260ms,
		border 260ms;
	border: 1px solid hsl(var(--p)); /* Border styling */
	height: 37px; /* Fixed height */
	text-transform: uppercase; /* Uppercase text transformation */
	background-color: hsl(var(--p)); /* Background color */
	border-radius: 30px; /* Rounded corners */
	width: 300px; /* Fixed width */
	margin: 0 auto; /* Centering the element */
}

/* Hover state styles for the paragraph element */
.old-lobby .more-casino-games-load-b > p:hover {
	background-color: hsl(var(--pf)); /* Change background color on hover */
	color: hsl(var(--n)); /* Change text color on hover */
	cursor: pointer; /* Change cursor to pointer on hover */
}

/* Styles for the span element within the paragraph */
.old-lobby .more-casino-games-load-b > p > span {
	display: inline-block; /* Inline-block display for span */
	padding: 0; /* No padding */
	text-align: center; /* Center text alignment */
	position: relative; /* Relative positioning for potential absolute children */
}
/* Styles for the old lobby section */
.old-lobby .big-games-overflow {
	/* Full width and height for the overflow container */
	width: 100%;
	/* Hides overflow content */
	overflow: hidden;
	/* Fixed positioning to cover the entire viewport */
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	/* High z-index to ensure it appears above other elements */
	z-index: 999999999999;
}

/* Styles for the logo image within the old lobby */
.old-lobby .div-logo-j img {
	/* Sets the image height to fill the container */
	height: 100%;
}

/* Background styles for the big game section */
.old-lobby .big-game-background {
	/* No padding for the background */
	padding: 0;
	/* Display as a table for layout purposes */
	display: table;
	/* Full height to cover the parent container */
	height: 100%;
	/* Maximum height to prevent overflow */
	max-height: 100%;
	/* Absolute positioning to allow for layering */
	position: absolute;
}

/* Common styles for both background and contain elements */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Float elements to the left for horizontal alignment */
	float: left;
	/* Full width for both elements */
	width: 100%;
	/* No padding for these elements */
	padding: 0;
	/* Full height to match the parent container */
	height: 100%;
}
/* Styles for the old lobby section */
.old-lobby .big-game-background,
.old-lobby .big-game-contain {
	/* Ensures the background covers the entire area */
	background-size: cover !important;
	/* Sets the background color to black */
	background: black;
}

/* Styles for casual game container */
.old-lobby .casual-game {
	/* Centers the casual game container */
	margin: 0 auto;
	/* Displays the container as a table for alignment */
	display: table;
}

/* Styles for casino game container */
.old-lobby .casino-game-contain {
	/* Sets a minimum height for the casino game container */
	min-height: 300px;
	/* Full width of the parent element */
	width: 100%;
	/* No padding */
	padding: 0;
	/* Displays as a table cell for alignment */
	display: table-cell;
	/* Centers the container */
	margin: 0 auto;
	/* Centers text within the container */
	text-align: center;
	/* Animation for entering the popup */
	animation: popup-enter 400ms ease-in-out;
}

/* Styles for flash game container */
.old-lobby .flash-game-contain {
	/* Removes border and shadow for a clean look */
	border: none;
	border-radius: 0;
	box-shadow: none;
}

/* Additional styles for flash game container */
.old-lobby .flash-game-contain {
	/* Sets a minimum width for the flash game container */
	min-width: 300px;
	/* Margin around the container */
	margin: 5px;
	/* Centers text within the container */
	text-align: center;
	/* Displays as an inline-block for layout */
	display: inline-block;
	/* Positions the container relative for absolute positioning of children */
	position: relative;
	/* Aligns the container to the top */
	vertical-align: top;
	/* Hides overflow content */
	overflow: hidden;
	/* Sets a minimum height for the flash game container */
	min-height: 100px;
}
/* Styles for the big game control section in the old lobby */
.old-lobby .big-game-control {
	right: 0; /* Aligns the control to the right */
	float: right; /* Floats the element to the right */
	display: inline-block; /* Allows the element to be inline with other elements */
	width: 100%; /* Sets the width to 100% of the parent container */
	text-align: right; /* Aligns text to the right */
	position: absolute; /* Positions the element absolutely within the nearest positioned ancestor */
	background: #0c1019; /* Sets the background color */
	z-index: 10; /* Sets the stacking order of the element */
}

/* Styles for the top options in the flash game container */
.old-lobby .flash-game-contain .top-options {
	display: inline-block; /* Allows the element to be inline with other elements */
}

/* Styles for the first delete icon in the casino game container */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) {
	position: fixed; /* Fixes the position relative to the viewport */
	top: 0; /* Aligns the icon to the top */
	right: 0; /* Aligns the icon to the right */
	padding-right: 0; /* Removes right padding */
	background: #0c1019; /* Sets the background color */
	height: 38px; /* Sets the height of the icon */
}

/* Common styles for delete icons in the casino game container */
.old-lobby .casino-game-contain .icon-delete,
.old-lobby .casino-game-contain .icon-delete.favorite,
.old-lobby .casino-game-contain .icon-delete.popup,
.old-lobby .casino-game-contain .icon-delete.refresh {
	top: 0; /* Aligns the icons to the top */
	right: 0; /* Aligns the icons to the right */
	width: 40px; /* Sets the width of the icons */
	height: 40px; /* Sets the height of the icons */
	float: none; /* Resets float property */
	display: inline-block; /* Allows the icons to be inline with other elements */
	margin-bottom: 2px; /* Adds a bottom margin for spacing */
}
.old-lobby .casino-game-contain .icon-delete {
	/* Sets the position of the delete icon relative to its container */
	position: relative;
	/* Hides text for accessibility, as the icon is represented by an image */
	text-indent: -9999em;
}
.old-lobby .casino-game-contain .icon-delete a:before {
	/* Uses FontAwesome to display a delete icon */
	content: '\f00d';
	/* Sets font size and line height for the icon */
	font: 25px/25px FontAwesome;
	/* Sets the color of the icon */
	color: #fff;
	/* Positions the icon absolutely within the container */
	position: absolute;
	/* Positions the icon to the right */
	right: -1px;
	/* Positions the icon slightly from the top */
	top: 5px;
	/* Resets text-indent for the icon */
	text-indent: 0;
}
.old-lobby .casino-game-contain .icon-delete.refresh a:before {
	/* Uses FontAwesome to display a refresh icon */
	content: '\f021';
	/* Sets font size and line height for the refresh icon */
	font: 16px/40px FontAwesome;
	/* Positions the refresh icon absolutely within the container */
	position: absolute;
	/* Positions the icon to the right */
	right: 12px;
	/* Positions the icon slightly from the top */
	top: -1px;
	/* Resets text-indent for the icon */
	text-indent: 0;
}
.old-lobby .casino-game-contain .icon-delete.home a:before {
	/* Uses FontAwesome to display a home icon */
	content: '\f015';
	/* Sets font size and line height for the home icon */
	font: 23px/40px FontAwesome;
	/* Positions the home icon absolutely within the container */
	position: absolute;
	/* Positions the icon to the right */
	right: 12px;
	/* Positions the icon slightly from the top */
	top: -1px;
	/* Resets text-indent for the icon */
	text-indent: 0;
}
/* Styles for the delete icon in the favorite section of the casino game container */
.old-lobby .casino-game-contain .icon-delete.favorite a:before {
	content: '\f005'; /* FontAwesome icon content */
	font: 18px/40px FontAwesome; /* Font size and line height */
	position: absolute; /* Positioning the icon absolutely */
	right: 12px; /* Positioning from the right */
	top: -1px; /* Positioning from the top */
	text-indent: 0; /* No text indentation */
}

/* Common styles for various states of the favorite delete icon links */
.old-lobby .casino-game-contain .icon-delete.favorite a,
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active,
.old-lobby .casino-game-contain .icon-delete.favorite a:hover,
.old-lobby .casino-game-contain .icon-delete.popup a,
.old-lobby .casino-game-contain .icon-delete.refresh a,
.old-lobby .casino-game-contain .icon-home.favorite a:hover {
	width: 40px; /* Fixed width for the icon */
	height: 40px; /* Fixed height for the icon */
	background: #0c1019; /* Background color */
}

/* Specific styles for the first child delete icon link */
.old-lobby .casino-game-contain .icon-delete:nth-child(1) a {
	width: 20px; /* Reduced width for the first icon */
	margin: 0 auto; /* Centering the icon */
	text-align: center; /* Centering text inside the icon */
	padding: 0; /* No padding */
	display: block; /* Display as block element */
	position: relative; /* Relative positioning for further adjustments */
}
.old-lobby .casino-game-contain .icon-delete a {
	/* Background color for the delete icon link */
	background: #0c1019;
	/* Set width and height for the icon */
	width: 35px;
	height: 35px;
	/* Positioning at the top of the container */
	top: 0;
	/* Static positioning for the link */
	position: static;
	/* Rounded corners for the icon */
	-webkit-border-radius: 25px; /* For older WebKit browsers */
	-moz-border-radius: 25px; /* For older Firefox browsers */
	border-radius: 25px; /* Standard border-radius property */
}
.old-lobby .casino-game-contain .icon-delete a {
	/* Ensures the link is above other elements */
	z-index: 99;
	/* Display as a block element */
	display: block;
}
.old-lobby .flash-game-contain .user-div {
	/* Inline-block display for user divs */
	display: inline-block;
	/* Float to the left for layout */
	float: left;
}
.old-lobby .settings-include-contain {
	/* Float to the left for layout */
	float: left;
}
.old-lobby .separator-contain-nav {
	/* Float to the left for layout */
	float: left;
	/* Use border-box sizing model */
	box-sizing: border-box;
	/* Padding for spacing */
	padding: 0 10px;
	/* Shadow effect for visual separation */
	box-shadow: 1px 0 0 #171a22;
	/* Set height for the separator */
	height: 36px;
	/* Relative positioning for child elements */
	position: relative;
}
.old-lobby .settings-icon-contain.balance-box {
	/* Sets font weight to normal and inherits transform properties */
	font-weight: 400;
	/* Inherits transform properties from parent */
	transform: inherit;
	/* Defines a solid border with a specific color */
	border: 1px solid #ffb124;
}

.old-lobby .settings-icon-contain.balance-box,
.old-lobby .settings-icon-contain.leng-b {
	/* Sets width to auto and aligns text to the left */
	width: auto;
	text-align: left;
	/* Defines font properties including size, line height, and family */
	font:
		15px/20px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	/* Sets font weight to bold */
	font-weight: 700;
	/* Positions the element relative to its normal position */
	position: relative;
	/* Adds padding to the element */
	padding: 0 18px 0 2px;
}

.old-lobby .settings-icon-contain {
	/* Floats the element to the left */
	float: left;
	/* Sets a fixed height for the element */
	height: 20px;
	/* Changes cursor to pointer on hover */
	cursor: pointer;
	/* Sets a fixed width for the element */
	width: 20px;
	/* Defines font properties for FontAwesome icons */
	font: 16px/20px FontAwesome;
	/* Sets text color to white */
	color: #fff;
	/* Centers text within the element */
	text-align: center;
	/* Adds margin to the top and bottom */
	margin: 8px 0 0;
	/* Applies a 3D transformation with no rotation */
	transform: rotate(0deg) translate3d(0, 0, 0);
	/* Defines a transition effect for transform changes */
	transition: transform 500ms;
	/* Prevents text from wrapping */
	white-space: nowrap;
	/* Positions the element relative to its normal position */
	position: relative;
}
/* Styles for the settings icon container within the old lobby */
.old-lobby .settings-icon-contain.balance-box > ul {
	float: left; /* Aligns the list to the left */
	width: 100%; /* Sets the width to full */
}

/* Styles for list items within the settings icon container */
.old-lobby .settings-icon-contain.balance-box > ul > li {
	width: 100%; /* Sets the width of each list item to full */
	text-align: left; /* Aligns text to the left */
	height: 11px; /* Sets a fixed height for list items */
	position: relative; /* Positions the item relative to its normal position */
	z-index: 555; /* Sets the stacking order of the item */
}

/* Styles for the value span within list items */
.old-lobby .settings-icon-contain.balance-box > ul > li span.valor {
	margin-right: 5px; /* Adds space to the right of the span */
	color: #fea402; /* Sets the text color */
}

/* Styles for the logo container within the old lobby */
.old-lobby .div-logo-j {
	float: left; /* Aligns the logo container to the left */
	padding: 5px 20px; /* Adds padding around the logo */
	height: 37px; /* Sets a fixed height for the logo container */
}

/* Styles for the circular progress indicator in the flash game container */
.old-lobby .flash-game-contain .md-progress-circular {
	position: absolute; /* Positions the progress indicator absolutely */
	top: 40%; /* Centers the indicator vertically */
	left: 50%; /* Centers the indicator horizontally */
	margin-left: -50px; /* Offsets the indicator to center it */
	z-index: 6; /* Sets the stacking order of the progress indicator */
}
.old-lobby .md-progress-circular.md-theme {
	/* Sets the background to transparent and applies a fade animation to the loader */
	background: 0 0;
	animation: loader-animate-fade 1s linear;
}

.old-lobby .md-progress-circular {
	/* Defines the size and positioning of the circular progress indicator */
	width: 100px; /* Width of the progress circular */
	height: 140px; /* Height of the progress circular */
	display: block; /* Displays the element as a block */
	position: inherit; /* Inherits the position from its parent */
	margin-bottom: 0 !important; /* Removes bottom margin, overriding other styles */
	overflow: visible; /* Allows overflow content to be visible */
	margin: 0 auto; /* Centers the element horizontally */
	padding: 20px 0; /* Adds vertical padding */
}

@keyframes wobble {
	/* Defines the keyframes for the wobble animation */
	0% {
		transform: translateX(0%); /* Initial position */
	}
	15% {
		transform: translateX(-25%) rotate(-5deg); /* Moves left and rotates */
	}
	30% {
		transform: translateX(20%) rotate(3deg); /* Moves right and rotates */
	}
	45% {
		transform: translateX(-15%) rotate(-3deg); /* Moves left and rotates */
	}
	60% {
		transform: translateX(10%) rotate(2deg); /* Moves right and rotates */
	}
	75% {
		transform: translateX(-5%) rotate(-1deg); /* Moves left and rotates */
	}
	100% {
		transform: translateX(0%); /* Returns to initial position */
	}
}
/* Styles for the spinner wrapper in the old lobby section */
.old-lobby .md-progress-circular .md-spinner-wrapper {
	-webkit-animation: outer-rotate 2.91667s linear infinite; /* Animation for outer rotation */
	animation: outer-rotate 2.91667s linear infinite; /* Animation for outer rotation */
}

/* Styles for the inner spinner element with sporadic rotation */
.old-lobby .md-progress-circular .md-spinner-wrapper .md-inner {
	will-change: transform; /* Optimizes performance for transform changes */
	-webkit-animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1)
		infinite; /* Animation for sporadic rotation */
	animation: sporadic-rotate 0.8s cubic-bezier(0.35, 0, 0.25, 1) infinite; /* Animation for sporadic rotation */
}

/* Dimensions and positioning for the inner spinner */
.old-lobby .md-progress-circular .md-inner {
	width: 100px; /* Width of the inner spinner */
	height: 100px; /* Height of the inner spinner */
	position: relative; /* Positioning context for absolute children */
}

/* Gap styling for the themed inner spinner */
.old-lobby .md-progress-circular.md-theme .md-inner .md-gap {
	border-top-color: #ffb124; /* Top border color for the gap */
	border-bottom-color: #ffb124; /* Bottom border color for the gap */
}

/* Styles for the gap element within the inner spinner */
.old-lobby .md-progress-circular .md-inner .md-gap {
	position: absolute; /* Positioned absolutely within the inner spinner */
	left: 49px; /* Left offset */
	right: 49px; /* Right offset */
	top: 0; /* Top offset */
	bottom: 0; /* Bottom offset */
	border-top: 5px solid #000; /* Top border styling */
	box-sizing: border-box; /* Includes padding and border in element's total width and height */
}
/* Styles for the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
	/* Positioning the left and right halves of the circular progress */
	position: absolute; /* Absolute positioning for overlap */
	top: 0; /* Aligns to the top of the parent */
	height: 100px; /* Fixed height for the progress elements */
	width: 50px; /* Fixed width for the progress elements */
	overflow: hidden; /* Hides overflow content */
}

/* Styles specifically for the left half of the circular progress */
.old-lobby .md-progress-circular .md-inner .md-left {
	left: 0; /* Aligns the left half to the left */
}

/* Border color for the top part of the half-circles in the themed circular progress */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-top-color: #ffb124; /* Sets the top border color */
}

/* Border color for the left part of the left half-circle in the themed circular progress */
.old-lobby .md-progress-circular.md-theme .md-inner .md-left .md-half-circle {
	border-left-color: #ffb124; /* Sets the left border color */
}

/* Incomplete selector for the spinner wrapper in the old lobby */
.old-lobby
	.md-progress-circular
	.md-spinner-wrapper
	.md-inner
	.md-left
	.md-half-circle,
.old-lobby
/* Styles for the circular progress indicator and its components */
	.md-progress-circular
	.md-spinner-wrapper
	.md-inner
	.md-right
	.md-half-circle {
	/* Infinite animation iteration for continuous spinning effect */
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	/* Duration of the animation cycle */
	-webkit-animation-duration: 1.3125s;
	animation-duration: 1.3125s;
	/* Timing function for smooth animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the left and right half-circles in the progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning and sizing for the half-circles */
	position: absolute;
	top: 0;
	width: 100px; /* Fixed width for the half-circles */
	height: 100px; /* Fixed height for the half-circles */
	box-sizing: border-box; /* Include padding and border in element's total width and height */
	border-width: 15px; /* Width of the border */
	border-style: solid; /* Solid border style */
	border-color: transparent; /* Initial border color set to transparent */
	border-radius: 50%; /* Circular shape */
}

/* Specific styles for the left half-circle */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle {
	left: 0; /* Aligns the left half-circle to the left */
}
/* Styles for the right section of the circular progress indicator in the old lobby */
.old-lobby .md-progress-circular .md-inner .md-right {
	right: 0; /* Aligns the right section to the right */
}

/* Styles for the left and right sections of the circular progress indicator */
.old-lobby .md-progress-circular .md-inner .md-left,
.old-lobby .md-progress-circular .md-inner .md-right {
	position: absolute; /* Positions the sections absolutely within the parent */
	top: 0; /* Aligns the sections to the top */
	height: 100px; /* Sets the height of the sections */
	width: 50px; /* Sets the width of the sections */
	overflow: hidden; /* Hides any overflow content */
}

/* Sets the border color for the right half-circle of the progress indicator */
.old-lobby .md-progress-circular.md-theme .md-inner .md-right .md-half-circle {
	border-right-color: #ffb124; /* Defines the right border color */
}

/* Animation for the right half-circle of the progress indicator */
.old-lobby
	.md-progress-circular
	.md-spinner-wrapper
	.md-inner
	.md-right
	.md-half-circle {
	-webkit-animation-name: right-wobble; /* Animation for webkit browsers */
	animation-name: right-wobble; /* Standard animation for other browsers */
}

/* Animation for the inner spinner of the progress indicator */
.old-lobby .md-spinner-wrapper .md-inner {
	-webkit-animation-name: spin !important; /* Spin animation for webkit browsers */
	animation-name: spin !important; /* Standard spin animation for other browsers */
}
/* Define keyframes for a spinning animation for different browsers */
@-moz-keyframes spin {
	100% {
		-moz-transform: rotate(360deg); /* Mozilla-specific rotation */
	}
}
@-webkit-keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* WebKit-specific rotation */
	}
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg); /* Standard rotation for WebKit */
		transform: rotate(360deg); /* Standard rotation */
	}
}

/* Styles for the old lobby section with a circular progress indicator */
.old-lobby
	.md-progress-circular /* Circular progress indicator component */
	.md-spinner-wrapper /* Wrapper for the spinner */
	.md-inner /* Inner part of the spinner */
	.md-left /* Left section of the spinner */
	.md-half-circle, /* Half-circle style for the spinner */
.old-lobby
	.md-progress-circular /* Circular progress indicator component */
	.md-spinner-wrapper /* Wrapper for the spinner */
/* Main animation properties for the half-circle elements */
	.md-inner
	.md-right
	.md-half-circle {
	/* Set animation to repeat indefinitely */
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	/* Duration of the animation cycle */
	-webkit-animation-duration: 1.3125s;
	animation-duration: 1.3125s;
	/* Timing function for smooth animation */
	-webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
	animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
}

/* Styles for the right half-circle in the old lobby progress circular component */
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning the right half-circle */
	right: 0;
	/* Make the left border transparent for visual effect */
	border-left-color: transparent;
}

/* Common styles for both left and right half-circles in the old lobby progress circular component */
.old-lobby .md-progress-circular .md-inner .md-left .md-half-circle,
.old-lobby .md-progress-circular .md-inner .md-right .md-half-circle {
	/* Positioning the half-circles absolutely within their container */
	position: absolute;
	top: 0;
	/* Set dimensions for the half-circles */
	width: 100px;
	height: 100px;
	/* Ensure padding and borders are included in the element's total width and height */
	box-sizing: border-box;
	/* Define border properties */
	border-width: 15px;
	border-style: solid;
	border-color: transparent; /* Initial border color set to transparent */
	/* Create circular shape */
	border-radius: 50%;
}
.old-lobby .add-casino-game {
	/* Background color for the casino game button */
	background: #1e2539;
	/* No box shadow applied */
	box-shadow: none;
	/* No text shadow applied */
	text-shadow: none;
	/* Text color for the button */
	color: #454a5a;
	/* Center the button horizontally with a fixed width */
	left: calc((100% - 140px) / 2);
	/* Rounded corners for the button */
	border-radius: 20%;
}
.old-lobby .add-casino-game {
	/* Positioning the button absolutely within its container */
	position: absolute;
	/* Ensures the button is above other elements */
	z-index: 99;
	/* Center the button vertically with a fixed height */
	top: calc((100% - 100px) / 2);
	/* Center the text within the button */
	text-align: center;
}
.old-lobby .flash-game-contain #game-content {
	/* Background color for the game content area */
	background: #0c1019;
	/* Display the game content inline-block */
	display: inline-block;
}
.old-lobby .flash-game-contain #game-content {
	/* Smooth transition for height changes */
	transition: height 200ms;
	/* Positioning relative to its normal position */
	position: relative;
	/* Z-index to stack the game content above other elements */
	z-index: 5;
	/* Margin to create space above the game content */
	margin-top: 45px;
	/* Hide overflow content */
	overflow: hidden;
	/* Width set to 90% of the viewport width */
	width: 90vw;
	/* Height set to 90% of the viewport height */
	height: 90vh;
}
.old-lobby li#searchv3 .closed-popup-form {
	/* Aligns the closed popup form to the right */
	float: right;
	/* Positions the form relative to its normal position */
	position: relative;
	/* Adjusts the vertical position */
	top: 0;
	/* Adjusts the horizontal position */
	right: 0;
	/* Sets the stacking order of the element */
	z-index: 1000;
	/* Adds a negative margin to position the form above other elements */
	margin-top: -35px;
	/* Adds space to the right of the form */
	margin-right: 20px;
}
.old-lobby .closed-popup-form:before {
	/* Sets the font style and size for the icon */
	font: 20px/10px FontAwesome;
	/* Sets the color of the icon */
	color: #fbf2df;
	/* Inserts the FontAwesome icon before the form */
	content: '\f00d';
	/* Changes the cursor to a pointer when hovering over the icon */
	cursor: pointer;
	/* Adds a transition effect for color changes */
	transition: 250ms color;
}
.old-lobby .casino-game-contain .icon-delete.favorite a.favorite-active:before {
	/* Sets the color of the icon for active favorite items */
	color: #b5d000;
}
.old-lobby .preloader-general {
	/* Sets the width of the preloader to cover the entire viewport */
	width: 100%;
	/* Sets the background color of the preloader */
	background: #000;
	/* Sets the height of the preloader to cover the entire viewport height */
	height: 100vh;
	/* Positions the preloader absolutely within its container */
	position: absolute;
	/* Aligns the preloader to the left of the viewport */
	left: 0;
	/* Sets a very high stacking order to ensure visibility over other elements */
	z-index: 999999999;
}
.old-lobby .content-p img {
	/* Center the image vertically and horizontally with specific offsets */
	top: calc(50vh - 120px) !important; /* Vertical position */
	width: 240px !important; /* Fixed width for the image */
	left: calc(50% - 120px) !important; /* Horizontal position */
	position: absolute; /* Positioning the image absolutely within the parent */
}
.old-lobby .new-casino-no-games-text {
	/* Style for the text when no games are available */
	text-align: center; /* Center the text */
	padding: 25px; /* Padding around the text */
}
.old-lobby #casino-wrapper-disabled {
	/* Styles for the disabled casino wrapper */
	background: black; /* Black background for the wrapper */
	width: 100%; /* Full width of the parent */
	min-height: 700px; /* Minimum height to ensure visibility */
	padding-top: 1px; /* Small padding at the top */
}
.old-lobby #casino-wrapper-disabled .container-alert {
	/* Styles for the alert container within the disabled wrapper */
	width: 100%; /* Full width of the parent */
}
.old-lobby #casino-wrapper-disabled .message-alert {
	/* Styles for the alert message */
	width: 90%; /* Width of the alert message */
	margin: 0 auto; /* Center the alert message */
	color: white; /* White text color for visibility */
	text-align: center; /* Center the text within the alert */
	border: 1px solid #b08200; /* Border with a specific color */
	border-radius: 15px; /* Rounded corners for the alert */
	padding: 20px; /* Padding inside the alert */
}
/* Styles for the alert message in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(3) {
	font-weight: 900; /* Bold font weight for emphasis */
	font-size: 22px; /* Font size for the third paragraph */
}

/* Styles for the fourth paragraph in the alert message */
.old-lobby #casino-wrapper-disabled .message-alert p:nth-child(4) {
	font-weight: lighter; /* Lighter font weight for a less prominent text */
}

/* Styles for spans within the alert message */
.old-lobby #casino-wrapper-disabled .message-alert span {
	font-size: 90px; /* Large font size for spans to highlight important information */
}

/* Styles for the close button in the alert message */
.old-lobby #casino-wrapper-disabled .message-alert .close {
	width: 100%; /* Full width for the close button */
	height: 23px; /* Fixed height for the close button */
	display: block; /* Display as a block element */
}

/* Styles for the text within the close button */
.old-lobby #casino-wrapper-disabled .message-alert .close span {
	float: right; /* Aligns the text to the right */
	font-size: 15px; /* Font size for the close button text */
}

/* Styles for the first money image in the alert message */
.old-lobby #casino-wrapper-disabled .money-img {
	width: 70%; /* Sets the width to 70% of the parent container */
	margin: 0 auto; /* Centers the image horizontally */
	margin-top: 100px; /* Adds top margin for spacing */
}

/* Styles for the second money image in the alert message */
.old-lobby #casino-wrapper-disabled .money-img-two {
	width: 70%; /* Sets the width to 70% of the parent container */
	margin: 0 auto; /* Centers the image horizontally */
}
/* Styles for the disabled casino wrapper in the old lobby */
.old-lobby #casino-wrapper-disabled .money-img img,
.old-lobby #casino-wrapper-disabled .money-img-two img {
	/* Set images to take full width and display as block elements */
	width: 100%;
	display: block;
}

/* Styles for the close icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-times {
	/* Float the close icon to the right and set its color to white */
	float: right;
	color: white;
}

/* Styles for the mobile icon in the disabled casino wrapper */
.old-lobby #casino-wrapper-disabled i.fa.fa-mobile {
	/* Set the font size for the mobile icon */
	font-size: 80px;
}

/* Media query for screens wider than 736px */
@media only screen and (min-width: 736px) {
	.old-lobby #casino-wrapper-disabled .message-alert {
		/* Style for alert messages in the disabled casino wrapper */
		width: 35%; /* Set width to 35% */
		margin: 0 auto; /* Center the alert */
		color: white; /* Set text color to white */
		text-align: center; /* Center align text */
		border: 1px solid #b08200; /* Add a border with a specific color */
		border-radius: 15px; /* Round the corners of the alert */
	}
	.old-lobby #casino-wrapper-disabled .money-img,
	.old-lobby #casino-wrapper-disabled .money-img-two {
		/* Set width for money images in the disabled casino wrapper */
		width: 25%; /* Set width to 25% */
	}
}
/* Styles for the casino content area in the old lobby */
.old-lobby div#casino-content {
	height: 100vh; /* Full viewport height */
	padding-bottom: 7px; /* Bottom padding */
}

/* Styles for the game image box in the new lobby */
.new-lobby .games-aspect .game-img-box-b::before {
	content: ''; /* Empty content for pseudo-element */
	display: block; /* Display as block element */
	height: 0; /* Initial height */
	width: 0; /* Initial width */
	padding-bottom: calc(16 / 16 * 100%); /* Aspect ratio for the box */
}

/* Styles for the preview section in the new lobby */
.new-lobby .c-preview {
	background: #000; /* Fallback background color */
	background: -moz-linear-gradient(
		/* Gradient for Firefox */ -45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: -webkit-linear-gradient(
		/* Gradient for WebKit browsers */ -45deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background: linear-gradient(
		/* Standard gradient */ 135deg,
		#000000 0%,
		#000000 25%,
		#1e539e 50%,
		#ff3083 75%,
		#7800a8 100%
	);
	background-size: 400% 400%; /* Size of the background gradient */
	background-repeat: no-repeat; /* Prevent background repetition */
	display: flex; /* Use flexbox for layout */
	width: 500px; /* Fixed width */
	height: 500px; /* Fixed height */
	max-width: 100vw; /* Maximum width of viewport */
	max-height: 100vh; /* Maximum height of viewport */
	justify-content: center; /* Center content horizontally */
	align-items: center; /* Center content vertically */
	color: #fff; /* Text color */
	position: relative; /* Positioning context for absolute children */
	cursor: pointer; /* Pointer cursor on hover */
	transition: 0.5s all; /* Smooth transition for all properties */
}
.new-lobby .c-preview:hover {
	/* Changes background position on hover for the preview element */
	background-position: 100% 100% !important;
}
.new-lobby .c-preview:hover {
	/* Applies a blur effect to the preview element on hover */
	filter: blur(10px) !important;
}
.new-lobby .list-games-casino-view-b {
	/* Sets initial opacity and defines animation properties for the game list */
	opacity: 0; /* Hidden initially */
	animation-name: bounceIn; /* Specifies the animation to use */
	animation-duration: 450ms; /* Duration of the animation */
	animation-timing-function: linear; /* Animation timing function */
	animation-fill-mode: forwards; /* Keeps the final state of the animation */
	animation-delay: 2s; /* Delay before the animation starts */
}
@keyframes bounceIn {
	/* Defines the keyframes for the bounceIn animation */
	0% {
		opacity: 0; /* Fully transparent at the start */
		transform: scale(0.3) translate3d(0, 0, 0); /* Scaled down */
	}
	50% {
		opacity: 0.9; /* Almost fully visible */
		transform: scale(1.1); /* Slightly scaled up */
	}
	80% {
		opacity: 1; /* Fully visible */
		transform: scale(0.89); /* Slightly scaled down */
	}
	100% {
		opacity: 1; /* Fully visible at the end */
		transform: scale(1) translate3d(0, 0, 0); /* Original scale */
	}
}
.new-lobby .list-games-casino-view-b:hover .casino-resize-buttons {
	/* Display the resize buttons when hovering over the game list */
	display: block !important;
}
.new-lobby li.providers-list {
	/* Set the width of provider list items to a calculated value */
	width: calc((100% - 320px) / 6);
}
.new-lobby .category-list:hover {
	/* Scale up the category list on hover for a zoom effect */
	-webkit-transform: scale(1.1);
	-ms-transform: scale(1.1);
	transform: scale(1.1);
}
.new-lobby .category-list {
	/* Apply a transition effect for smooth scaling */
	transition: all 0.3s ease;
}
.new-lobby .rainbow {
	/* Full-width and height element with a rotating animation */
	width: 100%;
	height: 100%;
	animation: rotate linear 8s infinite;
	position: absolute;
}
.new-lobby .rainbow span {
	/* Span element for positioning within the rainbow */
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	transform: translate(-50%, -50%);
}
.new-lobby .rainbow span:after {
	/* Creates a pseudo-element after each span for visual effects */
	display: block; /* Makes the pseudo-element a block element */
	content: ''; /* Required for the pseudo-element to display */
	width: 100%; /* Sets the width to fill the parent element */
	height: 100%; /* Sets the height to fill the parent element */
	position: absolute; /* Positions the pseudo-element absolutely within the span */
	left: 100%; /* Positions the pseudo-element to the right of the span */
}
.new-lobby .rainbow span:first-child {
	/* Styles for the first span in the rainbow class */
	background: #5500ff; /* Sets the background color to a shade of blue */
}
.new-lobby .rainbow span:first-child:after {
	/* Styles for the pseudo-element of the first span */
	background: #ffb000; /* Sets the background color of the pseudo-element to a shade of yellow */
}
.new-lobby .rainbow span:last-child {
	/* Styles for the last span in the rainbow class */
	background: #ff006c; /* Sets the background color to a shade of pink */
}
.new-lobby .rainbow span:last-child:after {
	/* Styles for the pseudo-element of the last span */
	background: #00ffdc; /* Sets the background color of the pseudo-element to a shade of cyan */
}
.new-lobby .c-subscribe-box {
	/* Styles for the subscription box within the new-lobby class */
	overflow: hidden; /* Hides any overflow content */
	position: relative; /* Sets the position to relative for absolute positioning of children */
	box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2); /* Adds a shadow effect for depth */
	border-radius: 8px; /* Rounds the corners of the box */
	vertical-align: bottom; /* Aligns the box to the bottom of its container */
}
.new-lobby .c-subscribe-box__wrapper {
	/* Wrapper for the subscription box with padding and flex layout */
	padding: 4px;
	display: flex; /* Enables flexbox layout */
	flex-direction: column; /* Stacks child elements vertically */
	border-radius: calc(8px / 2); /* Rounds corners with half of 8px */
}
.new-lobby .c-subscribe-box__title {
	/* Title style for the subscription box */
	font-size: 1.6rem; /* Sets font size for the title */
}
.new-lobby .c-subscribe-box__desc {
	/* Description style for the subscription box */
	font-size: 0.935rem; /* Sets font size for the description */
	margin: 0.7rem auto 1.8rem; /* Sets vertical margins with auto horizontal centering */
	max-width: 240px; /* Limits the maximum width of the description */
}
.new-lobby .c-subscribe-box__form {
	/* Form container within the subscription box */
	margin-top: auto; /* Pushes the form to the bottom of the wrapper */
}
.new-lobby .c-form--accent input:hover,
.c-form--accent input:active,
.c-form--accent input:focus {
	/* Styles for input fields in accent form on hover, active, and focus states */
	border-color: #e85f99; /* Changes border color */
	box-shadow: 0 0 0 3px rgba(232, 94, 152, 0.25); /* Adds shadow effect */
}
.new-lobby .c-form--accent [type='submit'] {
	/* Styles for the submit button in accent form */
	background: #e85f99; /* Sets background color */
	border-color: #e85f99; /* Sets border color */
	color: #fff; /* Sets text color to white */
}
/* Animation for rotating elements */
@keyframes rotate {
	0% {
		transform: rotate(0); /* Initial state of rotation */
	}
	100% {
		transform: rotate(360deg); /* Final state of rotation */
	}
}

/* Styles for the search input in the new lobby */
.new-lobby li#searchv3 {
	-webkit-transition: width 2s; /* Smooth transition for width changes in WebKit browsers */
	transition: width 2s; /* Smooth transition for width changes */
	width: 84px; /* Initial width of the search input */
}

/* Styles for the block search element within the searchv3 */
.new-lobby #searchv3 .block-search {
	height: 35px !important; /* Fixed height with !important to override other styles */
	min-width: 55px !important; /* Minimum width with !important to ensure it is applied */
	background: transparent; /* Transparent background */
	width: 100% !important; /* Full width with !important to ensure it is applied */
	max-width: 100% !important; /* Maximum width set to 100% with !important */
	margin: 0 !important; /* No margin with !important to ensure it is applied */
	border: 1px solid #a7a7a7; /* Light gray border */
	border-radius: 40px; /* Rounded corners */
}

/* General styles for block search elements in the new lobby */
.new-lobby .block-search {
	padding: 0; /* No padding */
	min-width: 35px; /* Minimum width */
	margin: 5px 5px 0 0; /* Margin on top and right */
	height: 30px; /* Fixed height */
	border-radius: 3px; /* Slightly rounded corners */
	background: #fff; /* White background */
}
.new-lobby .block-search {
	/* Aligns the search block to the right side of the container */
	float: right;
	/* Positions the search block relative to its normal position */
	position: relative;
	/* Sets the stacking order of the search block */
	z-index: 999;
	/* Aligns text to the right within the search block */
	text-align: right;
	/* Sets a maximum width for the search block */
	max-width: 250px;
}

.new-lobby #searchv3 .block-search:before {
	/* Adds a FontAwesome search icon before the search block */
	content: '\f002' !important;
	/* Sets the font size and line height for the icon */
	font: 20px/35px FontAwesome !important;
	/* Sets the color of the icon */
	color: #979797 !important;
	/* Positions the icon absolutely within the search block */
	position: absolute;
	/* Positions the icon 10px from the left */
	left: 10px;
	/* Positions the icon at the top of the search block */
	top: 0;
}

.new-lobby li#searchv3 input#SearchGame {
	/* Disables transition effects for the search input */
	transition: none !important;
	/* Changes the cursor to a pointer when hovering over the input */
	cursor: pointer !important;
}

.new-lobby input#SearchGame.ng-hide {
	/* Sets the width to 0 when the input is hidden */
	width: 0;
	/* Animates the width change over 1 second */
	transition: width 1s;
	/* Ensures the input is displayed as a block element */
	display: block !important;
	/* Floats the input to the right */
	float: right;
	/* Removes the border from the input */
	border: 0;
}
.new-lobby .block-search input[type='text'] {
	/* Text input styling within the block-search class in the new-lobby context */
	color: #686767; /* Text color */
	font: /* Font properties for the input text */
		12px Quicksand,
		Arial,
		Helvetica,
		sans-serif;
	margin: 0; /* No margin */
	padding: 8px 5px 8px 30px; /* Padding for the input */
	background: 0 0; /* Transparent background */
	position: relative; /* Positioning context for child elements */
	z-index: 22; /* Stacking order */
}

.new-lobby .block-search input[type='text'] {
	/* Additional styling for the text input */
	width: 0; /* Initial width set to 0 for animation */
	border: 0; /* No border */
	vertical-align: middle; /* Aligns the input vertically */
	transition: width 600ms; /* Smooth transition for width change */
	border-radius: 3px; /* Rounded corners */
}

.new-lobby li#searchv3.open .block-search input[type='text'] {
	/* Styling for the text input when the search is open */
	width: 100%; /* Full width when open */
	padding: 0 0 0 60px !important; /* Increased left padding */
	height: 100%; /* Full height */
	color: #fff; /* Text color changes to white */
}
.new-lobby .search-results-inner {
	/* Container for search results in the new lobby */
	float: left; /* Aligns the container to the left */
	width: 100%; /* Full width of the parent element */
	padding: 10px 0 0; /* Padding at the top, no padding on sides and bottom */
	position: relative; /* Allows absolute positioning of child elements */
	z-index: 999; /* High stacking order to ensure visibility */
	background: #fff; /* White background color */
	border-radius: 2px; /* Slightly rounded corners */
	box-shadow: 0 45px 150px -40px #000; /* Shadow effect for depth */
}

.new-lobby .search-results-inner .arrow-sport {
	/* Positioning for the arrow indicator within search results */
	top: -6px; /* Moves the arrow up slightly */
}

.new-lobby .search-results-inner .arrow-sport {
	/* Positioning for the arrow indicator within search results */
	right: 50%; /* Centers the arrow horizontally */
}

.new-lobby .arrow-sport {
	/* Styles for the arrow indicator */
	width: 14px; /* Width of the arrow */
	height: 11px; /* Height of the arrow */
	display: block; /* Makes the arrow a block element */
	position: absolute; /* Allows positioning relative to the nearest positioned ancestor */
	right: 2px; /* Positions the arrow 2px from the right */
	top: -11px; /* Positions the arrow 11px above its normal position */
	z-index: 999; /* High stacking order to ensure visibility */
}
/* Styles for the h3 elements within the search results of the new lobby */
.new-lobby .search-results-inner h3 {
	font:
		20px/22px Quicksand,
		/* Font size and line height with font family */ Arial,
		Helvetica,
		sans-serif; /* Fallback fonts */
	color: #121623; /* Text color */
	text-transform: uppercase; /* Transform text to uppercase */
}

/* Additional styles for h3 elements in the search results */
.new-lobby .search-results-inner h3 {
	width: 100%; /* Full width of the container */
	float: left; /* Float to the left */
	padding: 0; /* No padding */
	text-indent: 10px; /* Indent text by 10px */
	text-align: left; /* Align text to the left */
}

/* Styles for various elements within the new lobby */
.new-lobby #result-search, /* Search result container */
.bet-container, /* Container for betting elements */
.block-more-event, /* Block for more event options */
.clock .open-lang ul, /* Unordered list for open language options in the clock section */
.conteiner-goals .hover-sp, /* Hover state for goals container */
.deposit-alert-contain.casino .games-slider ul, /* Unordered list for games slider in deposit alert container */
.express-contain, /* Container for express elements */
.fedback-info ul li textarea, /* Textarea within feedback info list items */
.form-contain.deposit .form-sign-in /* Sign-in form within deposit form container */
/* Styles for various container elements with scrollable content */
.general-text-list,
.message-contain,
.radio-contein-withdraw,
.right-betslip-contain-modern,
.right-block-history.message.compose .settings-info-contain .form-text textarea,
.search-results-inner.casino #casino-result-search,
.text-payment-contain,
.tl-new .current-time:hover ~ .tl-info .hover-sp,
.tl-new .tl-info:hover .hover-sp,
div.draws-contain {
	overflow-y: auto; /* Enables vertical scrolling */
	overflow-x: hidden; /* Hides horizontal scrolling */
	scrollbar-track-color: #0c0e14; /* Color of the scrollbar track */
	scrollbar-shadow-color: #0c0e14; /* Shadow color of the scrollbar */
	scrollbar-base-color: #373f4e; /* Base color of the scrollbar */
	scrollbar-arrow-color: #373f4e; /* Color of the scrollbar arrows */
}

/* Specific styles for the search results container in the new lobby */
.new-lobby .search-results-inner.casino #casino-result-search {
	float: left; /* Aligns the element to the left */
	width: 100%; /* Sets the width to 100% of the parent */
	max-height: 450px; /* Limits the maximum height */
	overflow-y: auto; /* Enables vertical scrolling */
	overflow-x: hidden; /* Hides horizontal scrolling */
	margin: 10px 0 0; /* Adds margin to the top */
}
.new-lobby .search-no-results {
	/* Font settings for the no results message */
	font:
		16px/38px Quicksand,
		/* Font size and line height with primary font */ Arial,
		/* Fallback font */ Helvetica,
		/* Fallback font */ sans-serif; /* Generic fallback font */
	color: #f2c36f; /* Text color */
	padding: 0 10px; /* Padding for spacing */
	box-sizing: border-box; /* Include padding in width/height calculations */
}

.new-lobby .search-no-results {
	/* Layout settings for the no results message */
	float: left; /* Aligns the element to the left */
	width: 100%; /* Full width of the container */
	text-align: left; /* Aligns text to the left */
}

@media screen and (max-width: 550px) {
	/* Responsive styles for screens smaller than 550px */
	.new-lobby li#searchv3 {
		width: 66px; /* Fixed width for search item */
	}
	.new-lobby li.providers-list {
		width: auto; /* Automatic width for providers list */
	}
	.new-lobby li#searchv3.open {
		width: 60% !important; /* Overrides width to 60% when open */
	}
}
.new-lobby li#searchv3.open {
	/* Sets the width of the open search list item to 30% */
	width: 30%;
}
.new-lobby li#searchv3:hover {
	/* Removes text shadow on hover for the search list item */
	text-shadow: none !important;
}
.new-lobby li#searchv3 .closed-popup-form {
	/* Styles for the closed popup form within the search list item */
	float: right; /* Aligns the form to the right */
	position: relative; /* Positions the form relative to its normal position */
	top: 0; /* No vertical offset */
	right: 0; /* No horizontal offset */
	z-index: 1000; /* Ensures the form appears above other elements */
	margin-top: -27px; /* Adjusts the top margin to overlap */
	margin-right: 14px; /* Adds space to the right */
}
.new-lobby .closed-popup-form:before {
	/* Styles the pseudo-element before the closed popup form */
	font: 20px/10px FontAwesome; /* Sets font size and line height using FontAwesome */
	color: #979797; /* Sets the color of the icon */
	content: '\f00d'; /* Uses FontAwesome icon for closing */
	cursor: pointer; /* Changes cursor to pointer on hover */
	transition: 250ms color; /* Smooth transition for color changes */
}
.new-lobby .c-box-rgb {
	/* Styles for the RGB color box within the new lobby */
	position: relative; /* Positions the box relative to its normal position */
	overflow: visible !important; /* Ensures overflow is visible */
	background: linear-gradient(
		0deg,
		#000,
		#272727
	); /* Sets a vertical gradient background */
}
.new-lobby .c-box-rgb:before,
.c-box-rgb:after {
	/* Creates a pseudo-element before and after the .c-box-rgb element */
	content: '';
	position: absolute; /* Positions the pseudo-elements absolutely within the parent */
	left: -3px; /* Offsets the element 3px to the left */
	top: -3px; /* Offsets the element 3px to the top */
	background: linear-gradient(
		/* Applies a linear gradient background */ 45deg,
		/* Sets the angle of the gradient */ #fb0094,
		/* Color stop 1 */ #0000ff,
		/* Color stop 2 */ #00ff00,
		/* Color stop 3 */ #ffff00,
		/* Color stop 4 */ #ff0000,
		/* Color stop 5 */ #fb0094,
		/* Color stop 6 */ #0000ff,
		/* Color stop 7 */ #00ff00,
		/* Color stop 8 */ #ffff00,
		/* Color stop 9 */ #ff0000 /* Color stop 10 */
	);
	background-size: 400%; /* Sets the size of the background gradient */
	width: calc(
		100% + 6px
	); /* Width is 100% of the parent plus 6px for the offsets */
	height: calc(
		100% + 6px
	); /* Height is 100% of the parent plus 6px for the offsets */
	z-index: -1; /* Places the pseudo-elements behind the content */
	animation: steam 20s linear infinite; /* Applies an infinite animation named 'steam' */
	border-radius: 13px; /* Rounds the corners of the pseudo-elements */
}
/* Keyframes for steam animation, creating a looping background movement */
@keyframes steam {
	0% {
		background-position: 0 0; /* Initial background position */
	}
	50% {
		background-position: 400% 0; /* Midpoint background position for animation */
	}
	100% {
		background-position: 0 0; /* Reset to initial position */
	}
}

/* Styles for the new lobby section, specifically for the RGB box effect */
.new-lobby .c-box-rgb:after {
	filter: blur(5px); /* Applies a blur effect to the RGB box */
}

/* Styles for the play button in the new lobby section */
.new-lobby .btn-play {
	margin-top: calc(
		50% - 60px
	); /* Centers the button vertically with an offset */
}

/* Base styles for the carousel component */
.carousel {
	position: relative; /* Positions the carousel relative to its container */
}

/* Inner container of the carousel, managing overflow and width */
.carousel-inner {
	position: relative; /* Positions the inner carousel relative to the carousel */
	overflow: hidden; /* Hides overflow content */
	width: 100%; /* Sets the width to fill the parent container */
}
.carousel-open:checked + .carousel-item {
	/* Styles for the carousel item when the corresponding checkbox is checked */
	position: static; /* Positions the item in the normal document flow */
	opacity: 100; /* Fully visible */
}
.carousel-item {
	/* Base styles for each carousel item */
	position: absolute; /* Positions the item absolutely within the carousel */
	opacity: 0; /* Initially hidden */
	-webkit-transition: opacity 0.6s ease-out; /* Smooth transition for opacity (WebKit) */
	transition: opacity 0.6s ease-out; /* Smooth transition for opacity */
}
.carousel-item img {
	/* Styles for images within carousel items */
	display: block; /* Ensures no extra space below the image */
	height: auto; /* Maintains aspect ratio */
	max-width: 100%; /* Responsive image scaling */
}
.carousel-control {
	/* Styles for the carousel control buttons */
	background: rgba(0, 0, 0, 0.28); /* Semi-transparent background */
	border-radius: 50%; /* Circular buttons */
	color: #fff; /* White text color */
	cursor: pointer; /* Pointer cursor on hover */
	display: none; /* Hidden by default */
	font-size: 40px; /* Large font size for visibility */
	height: 40px; /* Fixed height */
	line-height: 35px; /* Centers text vertically */
	position: absolute; /* Positions the control buttons absolutely */
	top: 50%; /* Vertically centers the buttons */
	-webkit-transform: translate(
		0,
		-50%
	); /* Adjusts position for WebKit browsers */
	cursor: pointer; /* Pointer cursor on hover */
	-ms-transform: translate(0, -50%); /* Adjusts position for IE */
	transform: translate(0, -50%); /* Adjusts position for modern browsers */
	text-align: center; /* Centers text horizontally */
	width: 40px; /* Fixed width */
	z-index: 10; /* Ensures buttons are above other elements */
}
.carousel-control.prev {
	/* Positioning the previous control button to the left with a 2% margin */
	left: 2%;
}
.carousel-control.next {
	/* Positioning the next control button to the right with a 2% margin */
	right: 2%;
}
.carousel-control:hover {
	/* Styling for the control buttons on hover: dark background and light text color */
	background: rgba(0, 0, 0, 0.8);
	color: #aaaaaa;
}
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
	/* Displaying the corresponding control when the respective carousel is checked */
	display: block;
}
.carousel-indicators {
	/* Styling for the carousel indicators: removing default list styles and positioning */
	list-style: none;
	margin: 0;
	padding: 0;
	position: absolute;
	bottom: 2%;
	left: 0;
	right: 0;
	text-align: center;
	z-index: 10; /* Ensuring indicators are above other elements */
}
/* Styles for the carousel indicators */
.carousel-indicators li {
	display: inline-block; /* Displays indicators in a horizontal line */
	margin: 0 5px; /* Adds horizontal spacing between indicators */
}

/* Base style for carousel bullets */
.carousel-bullet {
	color: #fff; /* Sets the bullet color to white */
	cursor: pointer; /* Changes cursor to pointer on hover */
	display: block; /* Makes the bullet a block element */
	font-size: 35px; /* Sets the font size for the bullet */
}

/* Style for carousel bullet on hover */
.carousel-bullet:hover {
	color: #aaaaaa; /* Changes bullet color to light gray on hover */
}

/* Styles for the active carousel bullet based on checked state of radio buttons */
#carousel-1:checked
	~ .control-1
	~ .carousel-indicators
	li:nth-child(1)
	.carousel-bullet,
#carousel-2:checked
	~ .control-2
	~ .carousel-indicators
	li:nth-child(2)
	.carousel-bullet,
#carousel-3:checked
	~ .control-3
/* Carousel indicators styling */
    ~ .carousel-indicators
    li:nth-child(3) /* Targeting the third indicator in the carousel */
    .carousel-bullet {
	color: #428bca; /* Set bullet color to a shade of blue */
}

/* Flex container for casino section */
.flex.casino {
	background: #091023; /* Dark background for the casino section */
}

/* Inner carousel styling for the lobby casino */
#lobby-casino .carousel-inner {
	border-radius: 0 0 30px 30px; /* Rounded corners at the bottom */
}

/* Padding for casino container */
.casino-c {
	padding: 10px; /* Standard padding for the casino component */
}

/* Styling for left and right movement buttons */
.moveLeft,
.moveRight {
	z-index: 9; /* Ensure buttons are above other elements */
	height: 207px; /* Fixed height for buttons */
	padding: 0; /* No padding for buttons */
}

/* Left movement button specific styling */
button.moveLeft {
	border-radius: 0 10px 10px 0; /* Rounded corners on the right side */
}

/* Right movement button specific styling */
button.moveRight {
	border-radius: 10px 0 0 10px; /* Rounded corners on the left side */
}
.my-title {
	/* Center-aligns the text */
	text-align: center;
	/* Sets the spacing between letters */
	letter-spacing: 0px;
	/* Sets the text color to white */
	color: #ffffff;
	/* Applies a shadow effect to the text */
	text-shadow: 0px 3px 6px #00000029;
	/* Sets the opacity of the text */
	opacity: 1;
	/* Applies a left margin with important priority */
	margin-left: 2.5rem !important;
	/* Makes the font bold */
	font-weight: bold;
	/* Sets the font size */
	font-size: 20px;
	/* Changes the cursor to pointer on hover */
	cursor: pointer;
}

.slider-casino::-webkit-scrollbar {
	/* Hides the scrollbar for WebKit browsers */
	display: none;
}

.slider-casino {
	/* Hides the scrollbar for Internet Explorer and Edge */
	-ms-overflow-style: none;
	/* Hides the scrollbar for Firefox */
	scrollbar-width: none;
}
</style>

<!-- FILE DOCUMENTED -->

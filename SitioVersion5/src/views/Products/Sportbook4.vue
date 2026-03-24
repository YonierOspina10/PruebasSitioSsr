<template>
    <!-- Main section for displaying the sportsbook if contingencySportbook is enabled -->
    <section
        v-if="appComponent.contingencySportbook"
        class="flex justify-center items-center"
    >
        <div class="h-full w-full">
            <!-- Inner section for layout and styling -->
            <section
                class="w-full h-full relative flex justify-center items-center py-16"
            >
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 z-20 justify-items-center items-center gap-20 sm:gap-0"
                >
                    <div
                        class="flex flex-col gap-8 justify-center items-center "
                    >
                        <!-- Main heading for the casino promotion -->
                        <h2 class="font-bold font-poppinsm text-[2.5rem] text-primary text-center w-full sm:w-[56%] leading-10">
                            {{ $t(' Prueba tu suerte en nuestro casino') }}
                        </h2>
                        <div class="flex flex-col justify-center items-center gap-5">
                            <!-- Promotional text about the sportsbook -->
                            <p class="text-xl w-[90%] text-center font-poppinssl">
                                {{ $t('Mientras el') }}
                                <span class="font-bold">
								  {{ $t('sportbook') }}
								</span>
                                {{ $t('se prepara') }}
                                <span class="font-bold">
								  {{ $t('para ti.') }}
								</span>
                            </p>
                            <p class="text-2xl font-poppinssl">
                                {{ $t('¡La ') }}
                                <span class="font-bold">
								  {{ $t('emoción') }}
								</span>
                                {{ $t('no se detiene!') }}
                            </p>
                        </div>
                        <!-- Call to action for spinning and winning -->
                        <p class="bg-primary/80 saturate-150 px-16 sm:px-10 py-1 font-poppinssl">
                            {{ $t('¡GIRA APUESTA Y') }}
                            <span class="font-bold">
								{{ $t('GANA AHORA!') }}
							</span>
                        </p>
                        <!-- Conditional router link for the sportsbook button -->
                        <RouterLink
                            v-if="
								config.contingencySportbook !== undefined &&
								config.contingencySportbook.button !== undefined &&
								config.contingencySportbook.button.url != undefined &&
								config.contingencySportbook.button.text != undefined
							"
                            :to="config.contingencySportbook.button.url"
                            class="text-shadow-xl rounded-xl bg-success to-primary-content/60 text-neutral text-xl uppercase font-poppinsm p-4 hover:scale-105 transition-all z-50 ease-in-out shadow-[0px_3px_8px_-2px] shadow-base-content border-1 border-base-100"
                        >
                            {{ $t(config.contingencySportbook.button.text) }}
                        </RouterLink>
                    </div>
                    <!-- Conditional image display for the sportsbook -->
                    <img
                        v-if="
							config.contingencySportbook !== undefined &&
							config.contingencySportbook.img !== undefined
						"
                        :src="config.contingencySportbook.img"
                        alt=""
                        class="object-contain "
                    />
                </div>
                <!-- Background image for the sportsbook -->
                <img
                    v-if="
						config.contingencySportbook !== undefined &&
						config.contingencySportbook.imgBackground !== undefined
					"
                    :src="config.contingencySportbook.imgBackground"
                    alt=""
                    class="absolute w-full h-full object-cover z-10"
                />
                <!-- Gradient overlay for the bottom of the section -->
                <div
                    class="w-full h-32 bg-gradient-to-t from-base-content to-transparent absolute z-10 -bottom-0"
                ></div>
            </section>
        </div>
    </section>
    <!-- Loading state for the sportsbook -->
    <div
        v-if="sportBookStore.loading && !appComponent.contingencySportbook"
        class="flex w-full h-screen items-center"
        :class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&
        appComponent.config.backgroundColorSportBook
        ? 'bg-sportbook-color'
        : 'bg-neutral-content'
        "
    >
        <div class="flex-1"></div>
        <div class="flex flex-col w-12/12">
            <svg
                fill="none"
                class="w-12 h-12 animate-spin fill-primary stroke-2"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                />
            </svg>
        </div>
        <div class="flex-1"></div>
    </div>
    <!-- Main content area for the sportsbook -->
    <main
        class="w-full py-2 pl-2 pr-2"
        :class="appComponent.config != undefined && appComponent.config.backgroundColorSportBook != undefined &&
        appComponent.config.backgroundColorSportBook
        ? 'bg-sportbook-color'
        : 'bg-base-content'
        "
    >
        <div id="SportBook" class=""></div>
        <!-- Conditional rendering of various components based on route and state -->
        <div
            v-if="
				(($route.fullPath.includes('/deportes') && !appComponent.appPOS) ||
					$route.fullPath.includes('/apuestas') || $route.fullPath.includes('/deportes-en-vivo')) &&
				(sportBookStore.page === 'overview' || sportBookStore.page === 'live') &&
				!appComponent.appPOS
			"
            class="hidden"
        >
            <CarouselBannerAsideSB
                id="carousel-banners-asideL"
                :banners="bannersL"
            />
            <CarouselBannerAsideSB
                id="carousel-banners-asideR"
                :banners="bannersR"
            />
            <RetirementNotesSB
                id="retirement-notes-aside"
                v-show="appComponent.session.logueado"
            />
            <CasinoSlider3SB
                v-if="games.length > 0"
                id="casino-slider-first"
                :limit="games[0].limit"
                :typelobby="games[0].typelobby"
                :category="games[0].category"
                :keySlide="games[0].keySlide"
                :title="games[0].title"
                :top="games[0].top"
                :url="games[0].url"
                :action="games[0].action"
                :user="games[0].user"
                :type="games[0].type"
            />
            <CarouselBannerCenterSB
                id="banners-center-first"
                :banners="bannersC"

            />
            <CasinoSlider3SB
                v-if="games.length > 1"
                id="casino-slider-last"
                :limit="games[1].limit"
                :typelobby="games[1].typelobby"
                :category="games[1].category"
                :keySlide="games[1].keySlide"
                :title="games[1].title"
                :top="games[1].top"
                :url="games[1].url"
                :action="games[1].action"
                :user="games[1].user"
                :type="games[1].type"
            />
            <JackpotsSB
                v-if="
					appComponent.config.jackpot !== undefined &&
					appComponent.config.jackpot[appComponent.country] !== undefined &&
					appComponent.config.jackpot[appComponent.country] &&
					appComponent.config.jackpot2 !== undefined &&
					appComponent.config.jackpot2[appComponent.country] !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook &&
					!isJackpot4active

				"
                id="jackpots-v1"
                :data="jackpotsParams"
            />

          <Jackpots3SB
              v-if="
					appComponent.config.jackpot3 !== undefined &&
					appComponent.config.jackpot3[appComponent.country] !== undefined &&
					appComponent.config.jackpot3[appComponent.country] &&
					appComponent.config.jackpot2 !== undefined &&
					appComponent.config.jackpot2[appComponent.country] !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook
				"
                id="JackpotWinnerComponent"
            />
          <Jackpots4SB
              v-if="
					appComponent.config.jackpot4 !== undefined &&
					appComponent.config.jackpot4[appComponent.country] !== undefined &&
					appComponent.config.jackpot4[appComponent.country] &&
					appComponent.config.jackpot2 !== undefined &&
					appComponent.config.jackpot2[appComponent.country] !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook
				"
                id="jackpots-v1"
            />
            <Jackpots2SB
                v-if="
					appComponent.config.jackpot2 !== undefined &&
					appComponent.config.jackpot2[appComponent.country] !== undefined &&
					appComponent.config.jackpot2[appComponent.country].on !== undefined &&
					appComponent.config.jackpot2[appComponent.country].on &&
					appComponent.config.jackpot2[appComponent.country].onSportbook !== undefined &&
					appComponent.config.jackpot2[appComponent.country].onSportbook
				"
                id="jackpots-v2"
                :data="jackpotsParams"
            />
        </div>
    </main>
</template>
<script>
import { useCookies } from 'vue3-cookies'; // Importing cookies management
import { useSportBookStore } from '@/stores/sportbook'; // Importing the store for sportsbook state management
import CasinoSlider3SB from '@/components/CasinoSlider3SB.vue'; // Importing casino slider component
import CarouselBannerAsideSB from '@/components/CarouselBannerAsideSB.vue'; // Importing aside banner carousel component
import CarouselBannerCenterSB from '@/components/CarouselBannerCenterSB.vue'; // Importing center banner carousel component
import RetirementNotesSB from '@/components/RetirementNotesSB.vue'; // Importing retirement notes component
import Jackpots2SB from '@/components/Jackpots2SB.vue'; // Importing second jackpots component
import JackpotsSB from '@/components/JackpotsSB.vue'; // Importing first jackpots component
import Jackpots4SB from '@/components/Jackpots4SB.vue'; // Importing fourt jackpots component
import Jackpots3SB from '@/components/Jackpots3SB.vue'; // Importing fourt jackpots component
import { getBetSlipCustomMsg } from '@/utils/configHome.js';
import { watch } from 'vue'; // Importing utility function for bet slip messages
import { useGetInfoFirestore } from '../../composables/useInfoFirestore'; // Import function to get banners data from firestore

export default {
    components: {
        JackpotsSB, // Registering jackpots component
        RetirementNotesSB, // Registering retirement notes component
        CarouselBannerCenterSB, // Registering center banner carousel component
        CasinoSlider3SB, // Registering casino slider component
        CarouselBannerAsideSB, // Registering aside banner carousel component
        Jackpots2SB, // Registering second jackpots component
        Jackpots4SB, // Registering fourt jackpots component
        Jackpots3SB, // Registering fourt jackpots component
    },
    setup() {
        const { cookies } = useCookies(); // Setting up cookies for the component
        return {
            cookies, // Exposing cookies to the template
        };
    },
    data() {
        // Initializing component data
        let config = this.$config(); // Configuration object
        let appComponent = this.$appComponent; // Application component state
        let sportBookStore = useSportBookStore(); // Accessing the sportsbook store
        let renderComponente = undefined; // Placeholder for component rendering
        let colors = {}; // Placeholder for color settings
        let bannersL = []; // Left banners array
        let bannersC = []; // Center banners array
        let bannersR = []; // Right banners array
        let games = []; // Games array
        let login2 = ''; // Login state
        let device = ''; // Device type
        let view = ''; // Current view
        let element = undefined; // Placeholder for DOM elements
        let shadow = undefined; // Placeholder for shadow elements
        let elementCssJs = undefined; // Placeholder for CSS/JS elements
        let elementShadow = undefined; // Placeholder for shadow elements
        let elementMain = undefined; // Placeholder for main elements
        let observer = undefined; // Mutation observer for DOM changes
        let isMobile = false; // Mobile device flag
        let isTablet = false; // Tablet device flag
        let isDesktop = false; // Desktop device flag
        let isJackpot4active = this.$appComponent.config != undefined && this.$appComponent.config.jackpot4 != undefined &&
            this.$appComponent.config.jackpot4[this.$appComponent.country] != undefined && this.$appComponent.config.jackpot4[this.$appComponent.country]
                ? true
                : false
        ;
        let backgroundColor = 'none'; // Background color setting
        let deviceTheme = 'theme_colors'; // Default device theme
        let propSB = {
            routerType: 'memory', // Router type for sportsbook
            clearBetSlip: true, // Flag to clear bet slip
            clearReceipt: true, // Flag to clear receipt
        };
        let jackpotsParams = {}; // Parameters for jackpots
        let currentTheme = localStorage.getItem('changeThemeColor');
        return {
            currentTheme,
            config,
            appComponent,
            sportBookStore,
            renderComponente,
            colors,
            bannersL,
            bannersC,
            bannersR,
            login2,
            device,
            games,
            view,
            element,
            shadow,
            elementCssJs,
            elementShadow,
            elementMain,
            observer,
            isMobile,
            isTablet,
            isDesktop,
            backgroundColor,
            deviceTheme,
            propSB,
            isJackpot4active,
            jackpotsParams,
        };
    },
    methods: {
        // Method to get theme_colors
        getThemeColors() {
            const isThemeChange = localStorage.getItem('changeThemeColor') === 'true';
            const isMobile = this.appComponent?.config?.mobileL === '1';

            if (isThemeChange) {
                if (!isMobile && this.config.theme_colors_ligth_desktop) {
                    return this.config.theme_colors_ligth_desktop;
                }
                if (isMobile && this.config.theme_colors_ligth_mobile) {
                    return this.config.theme_colors_ligth_mobile;
                }
            } else {
                if (!isMobile && this.config.theme_colors_desktop) {
                    return this.config.theme_colors_desktop;
                }
                if (isMobile && this.config.theme_colors_mobile) {
                    return this.config.theme_colors_mobile;
                }
            }

            // if not exist
            return this.config.theme_colors || {};
        },
        // Method to get sportsbook data
        getSportBook() {
            let betSlipCustomMsg = getBetSlipCustomMsg(this.appComponent); // Get custom message for bet slip
            let props = {
                page: this.sportBookStore.page, // Current page
                eventId: this.sportBookStore.eventId, // Current event ID
                sportId: this.sportBookStore.sportId, // Current sport ID
                categoryIds: this.sportBookStore.categoryIds, // Current category IDs
                championshipIds: this.sportBookStore.championshipIds, // Current championship IDs
                shareCode: this.sportBookStore.shareCode, // Share code for betting
                betSlipCustomMessage: betSlipCustomMsg, // Custom message for bet slip
                ...this.propSB, // Spread operator for additional properties
                onRouteChange: (args) => { // Callback for route changes
                    if (args.page !== 'overview') {
                        if (args.page === 'championship') {
                            history.pushState(
                                null,
                                '',
                                '/' +
                                this.view +
                                '/liga/' +
                                args.championshipIds[0],
                            );
                        } else if (args.page === 'sport') {
                            history.pushState(
                                null,
                                '',
                                '/' + this.view + '/' + args.sportId,
                            );
                        } else if (args.page === 'category') {
                            history.pushState(
                                null,
                                '',
                                '/' +
                                this.view +
                                '/pais/' +
                                args.categoryIds[0],
                            );
                        } else if (
                            args.page === 'event' ||
                            args.page === 'liveEvent'
                        ) {
                            history.pushState(
                                null,
                                '',
                                '/' + this.view + '/partido/' + args.eventId,
                            );
                        } else {
                            this.appComponent.gAnalytics(
                                'access_interaction',
                                args.page,
                            );
                            history.pushState(null, '', '/' + this.view);
                        }
                    } else {
                        history.pushState(null, '', '/' + this.view);
                    }
                },
                onRouterLoad: () => { // Callback for router load
                    if (this.$route.fullPath.includes('deportes')) {
                        this.view = 'deportes'; // Set view to sports
                    } else if (this.$route.fullPath.includes('apuestas')) {
                        this.view = 'apuestas'; // Set view to bets
                    }
                },
                onSignInButtonClick: () => { // Callback for sign-in button click
                    this.appComponent.showModalLogin = true; // Show login modal
                },
            }; // Properties for sportsbook integration
            if (!this.appComponent.config.altenar2.src.includes('-stage')) {
                props = {
                    ...props,
                    onBetPlacement: (betIds) => { // Callback for bet placement
                        try {
                            window.fPlaceBetSuccess(
                                betIds,
                                this.appComponent.session.moneda,
                            );
                        } catch (e) {
                        }
                    },
                    onEventSelect: (args) => { // Callback for event selection
                        try {
                            window.fSportbookEventDetailCallback(args);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                };
            } else {
                console.log('DESARROLLO'); // Log for development mode
            }
            let count = 1; // Counter for checking SDK load
            let checkInterval = setInterval(() => {
                count++;
                if (window.altenarWSDK !== undefined && count < 1000) {
                    clearInterval(checkInterval); // Clear interval if SDK is loaded
                    window.ASB = window.altenarWSDK.addSportsBook({
                        props,
                        container: document.getElementById('SportBook'), // Container for sportsbook
                    });
                    this.sportBookStore.loading = false; // Set loading to false
                }
            }, 500);
        },
        /**
         * Retrieves and initializes components based on the current route and page state.
         * This function checks if the current route is related to sports or betting and if the
         * current page is either 'overview' or 'live'. If conditions are met, it attempts to
         * find and manipulate DOM elements related to the sports book.
         */
        getComponents() {
            // Check if the current route is related to sports or betting and if the page is 'overview' or 'live'
            if (
                (this.$route.fullPath.includes('/deportes') ||
                    this.$route.fullPath.includes('/apuestas') ||
                    this.$route.fullPath.includes('/deportes-en-vivo')) &&
                (this.sportBookStore.page === 'overview' ||
                    this.sportBookStore.page === 'live')
            ) {
                try {
                    let count = 0; // Counter for the number of attempts to find the sport book element
                    // Set an interval to repeatedly check for the sport book element
                    let time = setInterval(() => {
                        const sportBookElement = document.getElementById('SportBook'); // Get the sport book element by ID
                        // Check if the sport book element and its first child exist
                        if (
                            sportBookElement !== null &&
                            sportBookElement.childNodes[0] !== null
                        ) {
                            this.element =
                                sportBookElement.childNodes[0]; // Assign the first child to this.element
                            // Check if the element has a shadow root
                            if (this.element.shadowRoot !== '' && this.element.shadowRoot !== null) {
                                this.shadow = this.element.shadowRoot; // Assign the shadow root to this.shadow
                                // Check if the shadow root has a last child and a div with a last child
                                if (
                                    this.shadow.lastChild !== null &&
                                    this.shadow.querySelector('div')
                                        .lastChild !== null
                                ) {
                                    clearInterval(time); // Clear the interval if the element is found
                                    this.elementCssJs = this.shadow.lastChild; // Assign the last child of the shadow to this.elementCssJs
                                    this.elementShadow =
                                        this.shadow.querySelector(
                                            'div',
                                        ).lastChild; // Assign the last child of the div to this.elementShadow
                                    // Determine the device type based on the number of 'aside' elements
                                    if (
                                        this.elementShadow.querySelectorAll(
                                            'aside',
                                        ).length === 0
                                    )
                                        this.isMobile = true; // Set isMobile to true if no 'aside' elements
                                    if (
                                        this.elementShadow.querySelectorAll(
                                            'aside',
                                        ).length === 1
                                    )
                                        this.isTablet = true; // Set isTablet to true if one 'aside' element
                                    if (
                                        this.elementShadow.querySelectorAll(
                                            'aside',
                                        ).length === 2
                                    )
                                        this.isDesktop = true; // Set isDesktop to true if two 'aside' elements
                                    // Check if the main element exists
                                    if (
                                        this.elementShadow.querySelector(
                                            'main',
                                        ) !== null
                                    ) {
                                        this.elementMain =
                                            this.elementShadow.querySelector(
                                                'main',
                                            ); // Assign the main element to this.elementMain
                                        // Set a style attribute for the main element
                                        this.elementMain.setAttribute(
                                            'style',
                                            'gap: 10px 0px !important;',
                                        );
                                        // Destructure theme colors from the configuration
                                        const {
                                            secondary: secondaryColor = '#ffffff',
                                            neutral: neutralColor = '#000000',
                                            secondary_content: secondaryColorContent = '#ffffff',
                                            success: successColor = '#00ff00',
                                            error: errorColor = '#ff0000',
                                            primary: primaryColor = '#0000ff',
                                            primary_content: primaryContentColor = '#ffffff',
                                            accent_focus: focusColor = '#ffff00',
                                            base_100: base100Color = '#cccccc',
                                            accent: accentColor = '#ff00ff',
                                            info_text: infoColor = 'ffffff',
                                        } = this.getThemeColors();
                                        // Create a style element for banners aside
                                        const stylesBannersAside =
                                            document.createElement('style');
                                        stylesBannersAside.textContent = `
												.carouselButton {
													width: 100%;
													height: 100%;
													background: none;
													padding: 0px;
													border: none;
													cursor: pointer !important;
												}
												.carouselButton:hover {
													scale: 1.02 !important;
												}
												#swiper-slide-banners-aside {
													width: 100%;
													height: 100%;
													border-radius: 8px;
													cursor: pointer !important;
												}
												.banner {
													width: 100%;
													height: 100%;
													object-fit: contain;
													object-position: center;
													border-radius: 8px;
													cursor: pointer !important;
												}
												#retirement-notes-aside {
													width: 100%;
													height: 100%;
													border-radius: 8px;
													background-color: ${base100Color};
													color: ${neutralColor};
												}
												.retirement-notes-container {
													grid-column: 1 / 2;
												}
												.retirement-notes-content {
													width: 100%;
													height: 100%;
													overflow: hidden;
													display: block;
													background-color: ${base100Color};
													border-width: 0px;
													border-color: ${secondaryColor};
													border-style: solid;
													border-radius: 8px;
												}
												.retirement-notes-title {
													padding: 14px !important;
													background: ${base100Color};
													color: ${neutralColor};
													text-transform: uppercase;
													font-family: Roboto, sans-serif;
													font-size: 16px;
													font-style: normal;
													font-weight: 700;
													line-height: 18px;
													display: flex;
													justify-content: between;
													align-items: center;
													cursor: pointer !important;
												}
												.retirement-notes-title span {
													width: 100%;
													height: 100%;
												}
												.retirement-notes-title svg {
													width: 25px;
													height: 25px;
													fill: ${neutralColor};
												}
												.retirement-notes-table {
													display: flex;
													flex-direction: column;
													justify-content: center;
													align-items: center;
													gap: 5px;
													padding: 14px !important;
													background: ${base100Color};
													color: ${neutralColor};
													text-transform: uppercase;
													font-family: Roboto, sans-serif;
													font-size: 16px;
													font-style: normal;
													font-weight: 700;
													line-height: 18px;
												}
												.retirement-notes {
													width: 100%;
													height: 100%;
													display: flex;
													justify-content: space-between;
													align-items: center;
													gap: 5px;
													padding: 5px;
													border-radius: 5px;
													color: ${neutralColor};
													background: ${base100Color};
												}
												.retirement-notes img {
													width: 30px;
													height: 30px;
													object-fit: contain;
												}
												.retirement-notes div {
													width: 90px;
													display: flex;
													flex-direction: column;
													justify-content: center;
													align-items: start;
												}
												.retirement-notes div .nota {
													font-size: 8px;
												}
												.retirement-notes div .numero {
													font-size: 12px;
													font-weight: bold;
												}
												@media (max-width: 600px) {
														.retirement-notes div {
															width: 50%;
														}
														.retirement-notes div .nota {
															font-size: 12px;
														}
														.retirement-notes div .numero {
															font-size: 16px;
														}
														.retirement-notes .valor {
															width: 150px;
															padding-right: 10px;
															font-size: 20px;
														}
														.retirement-notes {
															padding: 5px 10px;
														}
														.retirement-notes .button-anular {
															padding: 4px 8px;
														}
												}
												.retirement-notes .valor {
												  width: 60px;
												  text-align: right;
													font-size: 14px;
													font-weight: bold;
												}
												.retirement-notes .button-anular {
													border-radius: 10px;
													border: none;
													padding: 5px 8px;
													font-size: 15px;
													font-weight: bold;
													color: ${neutralColor};
													background: ${successColor};
													cursor: pointer !important;
												}
												.retirement-notes .button-anular:hover {
													background: ${errorColor};
												}
												.skeleton-loading {
													width: 100%;
													height: 46px;
													background: ${secondaryColorContent};
													border-radius: 5px;
												}
												.emptyRetirement {
													width: 100%;
													height: 46px;
													display: flex;
													justify-content: center;
													align-items: center;
													color: ${neutralColor};
													font-size: 10px;
													text-align: center;
													border-radius: 5px;
												}
												.modal {
													padding: 14px;
													display: flex;
													flex-direction: column;
													justify-content: center;
													align-items: center;
													gap: 14px;
													color: ${neutralColor};
												}
												.subtitle {
													margin: 0;
												}
												.message {
													text-align: center;
													margin: 0;
												}
												.buttons {
													display: flex;
													justify-content: end;
													align-items: center;
													gap: 10px;
												}
												.cancel {
													border-radius: 10px;
													border: none;
													padding: 5px 8px;
													font-size: 15px;
													font-weight: bold;
													color: ${neutralColor};
													background: ${errorColor};
													cursor: pointer !important;
												}
												.cancel:hover {
													background: ${errorColor};
													opacity: 0.8;
												}
												.accept {
													border-radius: 10px;
													border: none;
													padding: 5px 8px;
													font-size: 15px;
													font-weight: bold;
													color: ${neutralColor};
													background: ${successColor};
													cursor: pointer !important;
												}
												.accept:hover {
													background: ${successColor};
													opacity: 0.8;
												}
											`;
                                        // Append the styles for banners aside to the element
                                        this.elementCssJs.appendChild(
                                            stylesBannersAside,
                                        );
                                        // Create a style element for banners center
                                        const stylesBannersCenter =
                                            document.createElement('style');
                                        stylesBannersCenter.textContent = `
												#swiper-slide-banners-center {
													cursor: pointer !important;
													width: 100%;
													height: 100%;
													border-radius: 8px;
												}
												.bannerCenter {
													width: 100%;
													height: 100%;
													object-fit: contain;
													object-position: center;
													border-radius: 8px;
													cursor: pointer !important;
												}
											`;
                                        // Append the styles for banners center to the element
                                        this.elementCssJs.appendChild(
                                            stylesBannersCenter,
                                        );
                                        // Create a style element for casino games
                                        const stylesCasinoGames =
                                            document.createElement('style');
                                        stylesCasinoGames.textContent = `
													#topCasinoComponent {
															height: auto;
															width: 100%;
													}
													.container {
														width: 100%;
														height: 100%;
													}
													.content {
														width: 100%;
														height: 100%;
														display: flex;
														flex-direction: column;
														justify-content: center;
														align-items: center;
													}
													.headerComponent {
														position: relative;
														height: 32px;
														width: 100%;
														display: flex;
														justify-content: center;
														align-items: center;
														cursor: default;
													}
													.separador {
														position: absolute;
														bottom: 2px;
														left: 0px;
														width: 35px;
														height: 4px;
														background-color: ${primaryColor};
														border-radius: 9999px;
													}
													.arrows {
														display: flex;
														justify-content: center;
														align-items: center;
														cursor: pointer !important;
													}
													#swiper-container-games {
														width: 100%;
														height: 100%;
													}
													.swiper-slide-games {
														position: relative;
														max-width: 190px;
														height: 190px;
														text-align: center;
														font-size: 18px;
														background: none;
														display: inline-block;
														border-radius: 12px;
														cursor: pointer !important;
													}
													.title {
														width: 100%;
														color: ${neutralColor};
														font-size: 20px;
														font-weight: bold;
														text-transform: uppercase;
													}
													a {
														text-decoration: none;
														color: ${infoColor} !important;
													}
													.slideButton {
														width: 100%;
														height: 100%;
														background: none;
														padding: 0px;
														border: none;
													}
													#swiper-button-prev {
														background: none;
														padding: 0px;
														border: none;
														cursor: pointer !important;
														color: ${neutralColor};
													}
													#swiper-button-prev:hover {
														scale: 1.25 !important;
														color: ${primaryColor} !important;
													}
													#swiper-button-next {
														background: none;
														padding: 0px;
														border: none;
														cursor: pointer !important;
														color: ${neutralColor};
													}
													#swiper-button-next:hover {
														scale: 1.25 !important;
														color: ${primaryColor} !important;
													}
													.imgGame {
														width: 190px;
														height: 190px;
														position: absolute;
														top: 0px;
														left: 0px;
														object-fit: cover;
														object-position: center;
														border-radius: 8px;
														cursor: pointer !important;
														z-index: 20 !important;
													}
													.imgGame:hover {
														z-index: 10 !important;
													}
													.infoGame {
														position: absolute;
														top: 0px;
														left: 0px;
														width: 175px;
														height: 175px;
														display: flex;
														flex-direction: column;
														justify-content: center;
														align-items: center;
														padding: 8px;
														word-break: break-all;
														border-radius: 8px;
														background-color: #00000095;
														z-index: 10 !important;
														cursor: pointer !important;
													}
													.infoGame:hover {
														z-index: 20 !important;
													}
													.infoGame > p {
														color: white;
														font-size: 16px;
														font-weight: bold;
														max-width: 120px;
														width: 100%;
														height: auto;
														display: flex;
														justify-content: center;
														align-items: center;
														text-align: center;
														overflow-wrap: break-word;
														text-transform: capitalize;
														white-space: pre-wrap;
													}
													.infoGame > button {
														width: 140px;
														background-color: ${focusColor};
														color: ${base100Color};
														font-size: 12px;
														font-weight: bold;
														border-radius: 9999px;
														text-transform: uppercase;
														cursor: pointer !important;
														padding: 8px;
													}
													.infoGame > button:hover {
														background-color: ${accentColor};
														color: ${base100Color};
														scale: 1.05;
													}
													.top {
														position: absolute;
														right: 4px;
														top: 4px;
														width: 24px;
														height: 24px;
														color: ${base100Color};
														font-size: 13px;
														font-weight: bold;
														padding: 5px;
														z-index: 30;
														background-color: ${accentColor};
														display: flex;
														justify-content: center;
														align-items: center;
														border-radius: 9999px;
													}
												}
											`;
                                        // Append the styles for casino games to the element
                                        this.elementCssJs.appendChild(
                                            stylesCasinoGames,
                                        );
                                        const stylesJackpotsV3 =
                                         document.createElement('style');
                                        stylesJackpotsV3.textContent = `
                                         /* Global styles for Swiper navigation */
                                         .mySwiper .swiper-button-next,
                                         .mySwiper .swiper-button-prev {
                                             color: hsl(var(--bc)) !important; /* texto principal según tema */
                                         }

                                         /* Hide navigation on mobile */
                                         @media (max-width: 1023px) {
                                             .mySwiper .swiper-button-next,
                                             .mySwiper .swiper-button-prev {
                                                 display: none !important;
                                             }
                                         }

                                         /* =============================== */
                                         /* Jackpot Section                 */
                                         /* =============================== */
                                         .jackpot-section {
                                           width: 100%;
                                           height: 9rem; /* equivalente a h-36 */
                                           background-color: hsl(var(--b3)); /* fondo terciario según tema */
                                           display: flex;
                                           justify-content: center;
                                           align-items: center;
                                           position: relative;
                                           border-top: 1px solid hsl(var(--p)); /* borde con color primario */
                                           border-bottom: 1px solid hsl(var(--p));
                                         }

                                         @media (min-width: 768px) {
                                           .jackpot-section {
                                             height: 11rem; /* equivalente a md:h-44 */
                                           }
                                         }

                                         .jackpot-background {
                                           position: absolute;
                                           width: 100%;
                                           height: 100%;
                                           object-fit: fill;
                                           top: 0;
                                           left: 0;
                                           border-radius: 1.5rem;
                                           user-select: none;
                                         }

                                         /* =============================== */
                                         /* Swiper                          */
                                         /* =============================== */
                                         .jackpot-swiper {
                                           width: 100%;
                                           height: 100%
                                         }

                                         .jackpot-slide {
                                           width: 14rem !important; /* ~w-56 */
                                         }

                                         @media (min-width: 768px) {
                                           .jackpot-slide {
                                             width: 29.6rem !important; /* md:w-[474.667px] */
                                           }
                                         }

                                         /* =============================== */
                                         /* Jackpot Card                    */
                                         /* =============================== */
                                         .jackpot-card-winner {
                                           position: relative;
                                           width: 14rem;
                                           height: 80%;
                                           margin: 0 auto;
                                           cursor: pointer;
                                         }

                                         @media (min-width: 768px) {
                                           .jackpot-card-winner {
                                             width: 24rem;
                                           }
                                         }

                                         .jackpot-content {
                                           width: 100%;
                                           height: 100%;
                                           border-radius: 0.75rem 0.75rem 0 0;
                                           display: flex;
                                           flex-direction: column;
                                           justify-content: center;
                                           align-items: center;
                                           gap: 0.75rem;
                                           padding: 1rem;
                                           backdrop-filter: blur(4px);
                                           background-position: center;
                                           background-repeat: no-repeat;
                                           background-size: 100% 100%;
                                         }

                                         .jackpot-header {
                                           display: flex;
                                           align-items: center;
                                           gap: 0.5rem;
                                           transition: opacity 0.3s;
                                         }

                                         .jackpot-icon {
                                           height: 2rem;
                                         }

                                         .jackpot-name {
                                           font-weight: bold;
                                           font-size: 1.5rem;
                                           color: hsl(var(--p)); /* color primario del tema */
                                         }

                                         .jackpot-value {
                                           color: hsl(var(--n)); /* texto neutro del tema */
                                           transition: opacity 0.3s;
                                         }
                                         .overlay-body p {
  margin: 0;           /* elimina márgenes verticales */
  padding: 0;          /* sin relleno extra */
  white-space: nowrap;
}
                                         .jackpot-amount {
                                           font-weight: bold;
                                           font-size: 1.5rem;
                                           color: hsl(var(--n)); /* texto base del tema */
                                         }

                                         /* =============================== */
                                         /* Hover overlay                   */
                                         /* =============================== */
                                         .jackpot-overlay {
                                            width:100%;
                                            height: 100%;
                                           position: absolute;
                                           top: 0.5rem;
                                           bottom: 0.5rem;
                                           left: 0.75rem;
                                           right: 0.75rem;
                                             padding-bottom: 0.60rem;
  padding-right: 0.60rem;
                                           background-color: hsl(var(--b1) / 0.3); /* fondo con transparencia dinámica */
                                           backdrop-filter: blur(6px);
                                           border-radius: 0.5rem;
                                           text-align: center;
                                           color: hsl(var(--bc)); /* texto del tema */
                                           opacity: 0;
                                           transition: opacity 0.3s;
                                           display: flex;
                                           flex-direction: column;
                                           justify-content: center;
                                           align-items: center;
                                         }

                                         .jackpot-card-winner:hover .jackpot-overlay {
                                           opacity: 1;
                                         }

                                         .jackpot-card-winner:hover .jackpot-header,
                                         .jackpot-card-winner:hover .jackpot-value {
                                           opacity: 0;
                                         }

                                         /* =============================== */
                                         /* Overlay: con ganadores          */
                                         /* =============================== */
                                         .overlay-header {
                                           width: 100%;
                                           margin-top: 0.50rem;
                                           border-bottom: 1px solid hsl(var(--n) / 0.3); /* línea neutra con transparencia */
                                         }

                                         .overlay-header p {
                                           font-size: 0.875rem;
                                           color: hsl(var(--n)); /* texto neutro */
                                         }

                                         .overlay-header span {
                                           font-weight: 600;
                                         }

                                         .overlay-body {
                                           width: 100%;
                                           display: flex;
                                           flex-direction: column;
                                         }

                                         .winner-name {
                                           font-weight: bold;
                                           font-size: 1rem;
                                           color: hsl(var(--n));
                                         }

                                         .winner-date {
                                           font-size: 0.75rem;
                                           color: hsl(var(--n) / 0.8);
                                         }

                                         .winner-amount {
                                           font-weight: bold;
                                           font-size: 1.25rem;
                                           color: hsl(var(--n));
                                         }

                                         .winner-amount .currency {
                                           color: hsl(var(--p)); /* color primario */
                                         }

                                         /* =============================== */
                                         /* Overlay: sin ganadores          */
                                         /* =============================== */

                                         .no-winner-text {
                                           font-size: 0.9rem;
                                           font-weight: 500;
                                           color: hsl(var(--n));
                                           line-height: 1.4;
                                         }
                                         `
                                        this.elementCssJs.appendChild(
                                            stylesJackpotsV3,
                                        );
                                        // Create a style element for jackpots
                                        const stylesJackpotsV2 =
                                            document.createElement('style');
                                        stylesJackpotsV2.textContent = `

                                                .jackpot-img1 {
                                                  width: 35%;
                                                }

                                                .jackpot-value1 {
                                                  width: 65%;
                                                }

                                                .jackpot-background {
                                                  object-fit: fill;
                                                  width: 100%;
                                                  height: 100%;
                                                  position: absolute;
                                                  top: 0;
                                                  left: 0;
                                                  z-index: 0;
                                                  user-select: none;
                                                  background-color: hsl(var(--bc));
                                                  border-radius: 1.5rem;
                                                }

                                                .jackpot-section4 {
                                                  width: 100%;
                                                  height: 136px !important;
                                                  overflow: hidden;
                                                  position: relative;
                                                  display: flex;
                                                  justify-content: center;
                                                  align-items: center;
                                                }

                                                @media (min-width: 340px) {
                                                  .jackpot-section4 {
                                                    height: 350px !important;
                                                  }
                                                }

                                                @media (min-width: 1024px) {
                                                  .jackpot-section4 {
                                                    height: 136px !important;
                                                  }
                                                }

                                                .jackpots-fond {
                                                  position: relative;
                                                  z-index: 1;
                                                  width: 100%;
                                                  margin-left: auto;
                                                  margin-right: auto;
                                                  height: 90%;
                                                  gap: 2rem;
                                                  top: 0;
                                                  background: linear-gradient(
                                                      to bottom right,
                                                      hsl(var(--pc)) ,
                                                      hsl(var(--pc) 20%),
                                                      hsl(var(--pc))
                                                  );
                                                  padding: 0.125rem;
                                                  border-radius: 1.5rem;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpots-fond {
                                                    width: 100%;
                                                    gap: 0;
                                                  }
                                                }

                                                .jackpots-container {
                                                  display: flex;
                                                  flex-direction: column;
                                                  justify-content: center;
                                                  align-items: center;
                                                  position: relative;
                                                  z-index: 1;
                                                  width: 98%;
                                                  margin-left: auto;
                                                  margin-right: auto;
                                                  height: 98%;
                                                  gap: 0.75rem;
                                                  top: 0;
                                                  background-color: hsl(var(--b3));
                                                  border-radius: 1.5rem;
                                                  padding: 0.25rem;
                                                  border: 1px solid transparent;
                                                  background: linear-gradient(45deg, #F9DD21, black, #F9DD21);
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpots-container {
                                                    gap: 0;
                                                  }
                                                }

                                                .jackpot-title {
                                                  width: 30%;
                                                  position: relative;
                                                  z-index: 50;
                                                  top: 0.75rem;
                                                  max-width: 580px;
                                                }

                                                button {
                                                  background: none;
                                                  border: none;
                                                  cursor: pointer;
                                                  padding: 0;
                                                }

                                                .jackpotPrice4 {
                                                  background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
                                                  -webkit-background-clip: text;
                                                  -webkit-text-fill-color: transparent;
                                                  background-clip: text;
                                                  text-fill-color: transparent;
                                                  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-title {
                                                    width: 15%;
                                                    top: 0.5rem;
                                                  }
                                                }


                                                .jackpots-wrapper {
                                                  width: 95%;
                                                  display: flex;
                                                  flex-direction: column;
                                                  justify-content: center;
                                                  align-items: center;
                                                  gap: 0.75rem;
                                                  overflow: hidden;
                                                  height: 100%;
                                                  z-index: 50;
                                                  padding-right: 0;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpots-wrapper {
                                                    flex-direction: row;
                                                    gap: 1rem;
                                                    height: 100%;
                                                    padding-right: 0.25rem;
                                                  }
                                                }

                                                .jackpot-card4 {
                                                  position: relative;
                                                  width: 23rem;
                                                  height: 5rem;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-card4 {
                                                    width: 65rem;
                                                    height: 4rem;
                                                  }
                                                }

                                                .jackpot-card-top {
                                                  position: absolute;
                                                  width: 100%;
                                                  height: 100%;
                                                  display: flex;
                                                  justify-content: space-between;
                                                  align-items: center;
                                                  text-align: center;
                                                  font-weight: bold;
                                                  bottom: 0;
                                                  margin-left: auto;
                                                  margin-right: auto;
                                                  font-size: 1.5rem;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-card-top {
                                                    font-size: 1.25rem;
                                                  }
                                                }

                                                .jackpot-card-image {
                                                  width: 7rem;
                                                  height: 100%;
                                                  object-fit: contain;
                                                }

                                                .jackpot-card-button4 {
                                                  position: absolute;
                                                  top: -0.25rem;
                                                  right: 0;
                                                  z-index: 70;
                                                  width: 15px;
                                                  height: 15px;
                                                  cursor: pointer;
                                                  transition: all 300ms;
                                                }

                                                .jackpot-card-button4:hover {
                                                  transform: scale(1.05);
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-card-button4 {
                                                    top: 0;
                                                    right: -0.75rem;
                                                  }
                                                }

                                                @media (min-width: 768px) {
                                                  .jackpot-card-button4 {
                                                    width: 30px;
                                                    height: 30px;
                                                  }
                                                }

                                                .jackpot-card-bottom {
                                                  position: absolute;
                                                  bottom: 0;
                                                  height: 100%;
                                                  width: 100%;
                                                  padding-top: 0;
                                                  padding-bottom: 0;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-card-bottom {
                                                    padding-top: 0.5rem;
                                                    padding-bottom: 0.5rem;
                                                  }
                                                }

                                                .jackpot-card-bottom-image {
                                                  position: absolute;
                                                  width: 100%;
                                                  height: 100%;
                                                  object-position: center;
                                                }

                                                @media (min-width: 640px) {
                                                  .jackpot-card-bottom-image {
                                                    height: 90%;
                                                  }
                                                }
												.jackpotPrice {
													background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
													-webkit-background-clip: text;
													-webkit-text-fill-color: transparent;
													text-fill-color: transparent;
													background-clip: text;
													text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
													font-size: 1.3rem;
													transition: -webkit-text-fill-color 2s ease, text-fill-color 2s ease;
													position: absolute;
													bottom: 4px;
													width: 100%;
													height: 100%;
													display: flex;
													justify-content: center;
													align-items: center;
													text-align: center;
													font-weight: bold;
													margin-left: auto;
													margin-right: auto;
												}
												.currency-symbol {
													font-size: 10px;
													margin-right: 2px;
												}
												@media (min-width: 768px) {
													.jackpotPrice {
														font-size: 19px;
													}
												}
												@media (min-width: 1024px) {
													.jackpotPrice {
														font-size: 21px;
													}
												}
												.swiper-slide-active > div > div > div.jackpotPrice {
													-webkit-text-fill-color: ${primaryContentColor};
												}
												.jackpot-swiper-container > .swiper-slide-active {
													transform: scale(1.2);
													transition-duration: 1s;
												}
												.swiper-slide-prev, .swiper-slide-next {
													transform: scale(1);
													transition-duration: 1s;
												}
												.jackpot-section {
													display: flex;
													justify-content: center;
													align-items: center;
													width: 100%;
												}
												.jackpot-article {
													display: flex;
													justify-content: center;
													align-items: center;
													width: 100%;
													height: 280px;
												 	z-index: 40;
												 	max-width: 450px;
												}
												.jackpot-loading {
													width: 100%;
													height: 100%;
													border-radius: 16px
												}
												.jackpot-container {
													position: relative;
													display: flex;
													flex-direction: column;
													justify-content: center;
													align-items: center;
													gap: 20px;
													width: 100%;
													height: 100%;
													max-width: 670px;
												}
												.jackpot-image-background-mobile {
													width: 100%;
													height: 100%;
													position: absolute;
													top: 0;
													left: 0;
													bottom: 0;
													right: 0;
													object-fit: contain;
													aspect-ratio: auto;
													z-index: 10;
												}
												.jackpot-image-background-desktop {
													display: none;
													width: 100%;
													height: 100%;
													position: absolute;
													top: 0;
													left: 0;
													bottom: 0;
													right: 0;
													object-fit: contain;
													aspect-ratio: auto;
													z-index: 10;
												}
												.jackpot-image-title-mobile {
													display: block;
													width: 92%;
													height: 35%;
													object-fit: contain;
													aspect-ratio: auto;
													z-index: 20;
													margin-top: 10px;
												}
												.jackpot-image-title-desktop {
													display: none;
													width: 80%;
													height: 35%;
													object-fit: contain;
													aspect-ratio: auto;
													z-index: 20;
												}
												.jackpot-button-info {
													position: absolute;
													top: 22px;
													right: 12px;
													z-index: 70;
													cursor: pointer;
													background: none;
													border: none;
												}
												.jackpot-button-info svg {
													width: 18px;
													height: 18px;
												}
												.jackpot-swiper-container {
													width: 90%;
													height: 35%;
													display: flex;
													justify-content: center;
													align-items: center;
													z-index: 30;
												}
												.jackpot-swiper-slide {
													position: relative;
													width: 50%;
													height: 100%;
													display: flex;
													flex-direction: column;
													justify-content: center;
													align-items: center;
												}
												.jackpot-swiper-slide-img {
													width: 50%;
													height: 35%;
													object-fit: contain;
													aspect-ratio: auto;
													z-index: 40
												}
												.jackpot-swiper-slide-gif {
													position: absolute;
													width: 85%;
													height: 90%;
													object-fit: center;
													aspect-ratio: auto;
													z-index: 60;
												}
												.jackpot-swiper-slide-container {
													position: relative;
													width: 75%;
													display: flex;
													justify-content: center;
													align-items: center;
													cursor: pointer;
												}
												.jackpot-swiper-slide-container-image {
													width: 100%;
													height: 100%;
													object-fit: contain;
													object-position: center;
													z-index: 40;
													aspect-ratio: auto;
												}
												.jackpot-swiper-slide-container-price {
													position: absolute;
													bottom: 10px;
													width: 100%;
													height: 40%;
													display: flex;
													justify-content: center;
													align-items: center;
													z-index: 50;
												}
												@media (min-width: 768px) {
													.jackpot-article {
														max-width: 1300px;
													}
													.jackpot-swiper-slide {
														width: 35%;
														height: 100%;
														display: flex;
														justify-content: center;
														align-items: center;
													}
													.jackpot-swiper-slide-img {
														height: 30%;
													}
													.jackpot-image-background-mobile {
														display: none;
													}
													.jackpot-image-background-desktop {
														display: block;
													}
													.jackpot-image-title-mobile {
														margin-top: 0;
													}
												}
												@media (min-width: 1024px) {
													.jackpot-article {
														height: 300px;
													}
													.jackpot-swiper-container {
														height: 45%;
													}
													.jackpot-image-background-mobile {
														display: none;
													}
													.jackpot-image-background-desktop {
														display: block;
													}
													.jackpot-image-title-mobile {
														display: none;
														height: 40%;
													}
													.jackpot-image-title-desktop {
														display: flex;
													}
													.jackpot-swiper-container {
														height: 35%;
													}
												}
												.jackpots-v1 {
												  width: 100%;
												  display: flex;
												  justify-content: center;
												  align-items: center;
												}
												.containerJackpot {
												  width: 91.666667%;
												  height: 100%;
												  max-width: 1300px;
												  display: flex;
												  flex-wrap: wrap;
												  justify-content: space-around;
												  align-items: center;
												  gap: 0.5rem;
												  padding: 0.5rem;
												  z-index: 40;
												  background: linear-gradient(to bottom, #ffffff20, transparent);
													backdrop-filter: blur(5px);
													border: 1px solid #ffffff40;
													border-radius: 15px;
												}
												.jackpot-card {
												  position: relative;
												  width: 350px;
												  height: 218px;
												  cursor: pointer;
												  transition: transform 0.3s ease;
												}
												.jackpot-card:hover {
												  transform: scale(1.05);
												}
												.jackpot-card-gif {
												  position: absolute;
												  top: 0.5rem;
												  width: 100%;
												  height: 90%;
												  object-fit: cover;
												  object-position: center;
												  z-index: 50;
												}
												.jackpot-card-div {
												  position: absolute;
												  top: 1rem;
												  height: 50%;
												  width: 100%;
												  display: flex;
												  justify-content: center;
												  align-items: center;
												  z-index: 40;
												}
												.jackpot-card-div-image {
												  width: 100%;
												  height: 100%;
												  object-fit: contain;
												  object-position: center;
												}
												.jackpot-card-button {
												  position: absolute;
												  top: 1.25rem;
												  right: 1rem;
												  z-index: 70;
												  width: 35px;
													height: 35px;
												  cursor: pointer;
												  transition: all 0.3s;
													background: none;
													border: none;
												}
												@media (min-width: 768px) {
												  .jackpot-card-button {
													top: 2.5rem;
													right: 2.5rem;
												  }
												}
												.jackpot-card-button:hover {
												  transform: scale(1.25);
												}
												.jackpot-card-button-div {
												  position: absolute;
												  bottom: 0;
												  height: 50%;
												  width: 100%;
												  display: flex;
												  justify-content: center;
												  align-items: center;
												  z-index: 40;
												}
												.jackpot-card-button-image {
												  position: absolute;
												  width: 60%;
												  height: 100%;
												  object-fit: contain;
												  object-position: center;
												}
												.jackpotPrice2 {
												  position: absolute;
												  width: 100%;
												  height: 100%;
												  display: flex;
												  justify-content: center;
												  align-items: center;
												  text-align: center;
												  font-size: 1.3rem;
												  font-weight: bold;
												  bottom: 0;
												  margin-left: auto;
												  margin-right: auto;
												  background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
													-webkit-background-clip: text;
													-webkit-text-fill-color: transparent;
													background-clip: text;
													text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
													margin-bottom: 1px;
												}
											`;
                                        // Append the styles for jackpots to the element
                                        this.elementCssJs.appendChild(
                                            stylesJackpotsV2,
                                        );
                                        // Create a script element for Swiper CDN
                                        const jsSwiperCDN =
                                            document.createElement('script');
                                        jsSwiperCDN.setAttribute(
                                            'src',
                                            'https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js',
                                        );
                                        // Append the Swiper script to the element
                                        this.elementCssJs.appendChild(
                                            jsSwiperCDN,
                                        );

                                        // Device specific adjustments
                                        if (this.isDesktop) {
                                            // Get the left aside element from the shadow DOM
                                            const asideL =
                                                this.elementShadow.firstChild
                                                    .childNodes[0];
                                            // Get the right aside element from the shadow DOM
                                            const asideR =
                                                this.elementShadow.lastChild
                                                    .childNodes[0];
                                            // Disable scrolling on the right aside element
                                            this.elementShadow.lastChild.setAttribute(
                                                'data-scrollable',
                                                'false',
                                            );
                                            // Get the left banner element by its ID
                                            const bannerAsideL =
                                                document.getElementById(
                                                    'carousel-banners-asideL',
                                                );
                                            // Append the left banner to the left aside
                                            asideL.appendChild(bannerAsideL);
                                            // Check if the user is logged in
                                            if (
                                                !this.appComponent.session
                                                    .logueado
                                            ) {
                                                // Get the retirement notes element by its ID
                                                const retirementNotes =
                                                    document.getElementById(
                                                        'retirement-notes-aside',
                                                    );
                                                // Append the retirement notes to the right aside
                                                asideR.appendChild(
                                                    retirementNotes,
                                                );
                                            }
                                            // Get the right banner element by its ID
                                            const bannerAsideR =
                                                document.getElementById(
                                                    'carousel-banners-asideR',
                                                );
                                            // Append the right banner to the right aside
                                            asideR.appendChild(bannerAsideR);
                                            // Check if the current route includes '/deportes-en-vivo'
                                            if (this.$route.fullPath.includes('/deportes-en-vivo')) {
                                                // Get the first child of the main element
                                                const childrenMainNth1 = this.elementMain.childNodes[0];
                                                // Set grid area for the first child
                                                childrenMainNth1.setAttribute(
                                                    'style',
                                                    'grid-area: 2 / 1 / auto / 2 !important;',
                                                );
                                                console.log('this.games', this.games);
                                                // Check if there are games available and casino features are enabled
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Get the first casino games slider by its ID
                                                    const casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first',
                                                        );
                                                    // Set grid area and margin for the first casino games slider
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 1 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the first casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                } else {
                                                    // Create a new div for casino games if none are available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area and margin for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 1 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Get the center banner element by its ID
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first',
                                                    );
                                                // Set grid area and margin for the center banner
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                );
                                                // Append the center banner to the main element
                                                this.elementMain.appendChild(
                                                    bannerCenterFirst,
                                                );
                                            } else {
                                                // Get the third child of the main element
                                                const childrenMainNth2 =
                                                    this.elementMain.childNodes[2];
                                                // Set grid area for the third child
                                                if (childrenMainNth2) {
                                                    childrenMainNth2.setAttribute(
                                                        'style',
                                                        'grid-area: 4 / 1 / auto / o !important;',
                                                    );
                                                }
                                                // Check if there are games available and casino features are enabled
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Get the first casino games slider by its ID
                                                    const casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first',
                                                        );
                                                    // Set grid area and margin for the first casino games slider
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the first casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                } else {
                                                    // Create a new div for casino games if none are available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area and margin for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Get the fourth child of the main element
                                                const childrenMainNth3 =
                                                    this.elementMain.childNodes[3];
                                                // Set grid area for the fourth child
                                                if (childrenMainNth3) {
                                                childrenMainNth3.setAttribute(
                                                    'style',
                                                    'grid-area: 6 / 1 / auto / o !important;',
                                                );
                                                }
                                                // Get the center banner element by its ID
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first',
                                                    );
                                                // Set grid area and margin for the center banner
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 5 / 1 / auto / o !important; margin: auto !important;',
                                                );
                                                // Append the center banner to the main element
                                                this.elementMain.appendChild(
                                                    bannerCenterFirst,
                                                );
                                                // Get the fifth child of the main element
                                                const childrenMainNth4 =
                                                    this.elementMain.childNodes[4];
                                                // Set grid area for the fifth child
                                                if (childrenMainNth4) {
                                                childrenMainNth4.setAttribute(
                                                    'style',
                                                    'grid-area: 8 / 1 / auto / o !important;',
                                                );
                                                }
                                                // Check if there are more than one game available and casino features are enabled
                                                if (this.games.length > 1 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Get the last casino games slider by its ID
                                                    const casinoGamesMainLast =
                                                        document.getElementById(
                                                            'casino-slider-last',
                                                        );
                                                    // Set grid area and margin for the last casino games slider
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 7 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the last casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainLast,
                                                    );
                                                } else {
                                                    // Create a new div for the last casino games if none are available
                                                    const casinoGamesMainLast =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area and margin for the new div
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 7 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainLast,
                                                    );
                                                }
                                                // Check if jackpot2 configuration is enabled for the current country
                                                if (
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    // Get the jackpot2 component by its ID
                                                    const jackpot2Component =
                                                        document.getElementById(
                                                            'jackpots-v2',
                                                        );
                                                    // Set grid area and margin for the jackpot2 component
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the jackpot2 component to the main element
                                                    this.elementMain.appendChild(
                                                        jackpot2Component,
                                                    );
                                                } else {
                                                    // Create a new div for jackpot2 if not enabled
                                                    const jackpot2Component =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area and margin for the new div
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        jackpot2Component,
                                                    );
                                                }
                                                // Check if the sixth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[5] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the sixth child of the main element
                                                    const childrenMainNth5 =
                                                        this.elementMain
                                                            .childNodes[5];
                                                    // Set grid area for the sixth child
                                                    if (childrenMainNth5) {
                                                    childrenMainNth5.setAttribute(
                                                        'style',
                                                        'grid-area: 10 / 1 / auto / 2 !important;',
                                                    );
                                                    }
                                                } else {
                                                    // Create a new div for the sixth child if not available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 10 / 1 / auto / 2 !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Check if jackpot configuration is enabled for the current country
                                                if (
                                                    this.appComponent.config.jackpot !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    // Get the jackpot component by its ID
                                                    const jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1',
                                                        );
                                                    // Set grid area and margin for the jackpot component
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the jackpot component to the main element
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                } else {
                                                    // Create a new div for jackpot if not enabled
                                                    const jackpotComponent =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Set grid area and margin for the new div
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Append the new div to the main element
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                }

                                                if (
                                                    this.appComponent.config.jackpot4 !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    const jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1',
                                                        );
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                } else
                                                if (
                                                    this.appComponent.config.jackpot3 !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                     const jackpotComponent =
                                                        document.getElementById('JackpotWinnerComponent');
                                                    if (jackpotComponent) {
                                                        jackpotComponent.setAttribute(
                                                            'style',
                                                            'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                        );
                                                        this.elementMain.appendChild(jackpotComponent);
                                                    }
                                                }

                                                // Check if the seventh child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[6] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the seventh child of the main element
                                                    const childrenMainNth7 =
                                                        this.elementMain
                                                            .childNodes[6];
                                                    // Set grid area for the seventh child
                                                    if (childrenMainNth7) {
                                                    childrenMainNth7.setAttribute(
                                                        'style',
                                                        'grid-area: 12 / 1 / auto / o !important;',
                                                    );
                                                    }
                                                }
                                                // Check if the eighth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[7] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the eighth child of the main element
                                                    const childrenMainNth7 =
                                                        this.elementMain
                                                            .childNodes[7];
                                                    // Set grid area for the eighth child
                                                    if (childrenMainNth7) {
                                                    childrenMainNth7.setAttribute(
                                                        'style',
                                                        'grid-area: 13 / 1 / auto / 2 !important;',
                                                    );
                                                    }
                                                }
                                                // Check if the ninth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[8] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the ninth child of the main element
                                                    const childrenMainNth8 =
                                                        this.elementMain
                                                            .childNodes[8];
                                                    // Set grid area for the ninth child
                                                    if (childrenMainNth8) {
                                                    childrenMainNth8.setAttribute(
                                                        'style',
                                                        'grid-area: 14 / 1 / auto / 2 !important;',
                                                    );
                                                    }
                                                }
                                                // Check if the tenth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[9] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the tenth child of the main element
                                                    const childrenMainNth9 =
                                                        this.elementMain
                                                            .childNodes[9];
                                                    // Set grid area for the tenth child
                                                    childrenMainNth9.setAttribute(
                                                        'style',
                                                        'grid-area: 15 / 1 / auto / 2 !important;',
                                                    );
                                                }
                                                // Check if the eleventh child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[10] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the eleventh child of the main element
                                                    const childrenMainNth10 =
                                                        this.elementMain
                                                            .childNodes[10];
                                                    // Set grid area for the eleventh child
                                                    childrenMainNth10.setAttribute(
                                                        'style',
                                                        'grid-area: 16 / 1 / auto / 2 !important;',
                                                    );
                                                }
                                                // Check if the twelfth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[11] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Get the twelfth child of the main element
                                                    const childrenMainNth11 =
                                                        this.elementMain
                                                            .childNodes[11];
                                                    // Set grid area for the twelfth child
                                                    childrenMainNth11.setAttribute(
                                                        'style',
                                                        'grid-area: 17 / 1 / auto / 2 !important;',
                                                    );
                                                }
                                            }
                                        } else if (this.isTablet) {
                                            // Selects the 'aside' element from the shadow DOM
                                            const asideL =
                                                this.elementShadow.querySelector(
                                                    'aside',
                                                );
                                            // Checks if the user is logged in
                                            if (
                                                !this.appComponent.session
                                                    .logueado
                                            ) {
                                                // Gets the retirement notes element by ID
                                                const retirementNotes =
                                                    document.getElementById(
                                                        'retirement-notes-aside',
                                                    );
                                                // Appends the retirement notes to the first div in the aside
                                                asideL
                                                    .querySelector('div')
                                                    .appendChild(
                                                        retirementNotes,
                                                    );
                                            }
                                            // Gets the banner element for the left aside
                                            const bannerAsideL =
                                                document.getElementById(
                                                    'carousel-banners-asideL',
                                                );
                                            // Appends the banner to the first div in the aside
                                            asideL
                                                .querySelector('div')
                                                .appendChild(bannerAsideL);
                                            // Checks if the current route includes '/deportes-en-vivo'
                                            if (this.$route.fullPath.includes('/deportes-en-vivo')) {
                                                // Selects the first child of the main element
                                                const childrenMainNth1 = this.elementMain.childNodes[0];
                                                // Sets the grid area for the first child
                                                childrenMainNth1.setAttribute(
                                                    'style',
                                                    'grid-area: 2 / 1 / auto / 2 !important;',
                                                );
                                                // Checks if there are games available and if casino features are enabled
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Gets the casino games slider element
                                                    const casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first',
                                                        );
                                                    // Sets the grid area and margin for the casino games slider
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 1 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                } else {
                                                    // Creates a new div for casino games if none are available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area and margin for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 1 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Gets the first center banner element
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first',
                                                    );
                                                // Sets the grid area and margin for the center banner
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                );
                                                // Appends the center banner to the main element
                                                this.elementMain.appendChild(
                                                    bannerCenterFirst,
                                                );
                                            } else {
                                                // Selects the third child of the main element
                                                const childrenMainNth2 =
                                                    this.elementMain.childNodes[2];
                                                // Sets the grid area for the third child
                                                if (childrenMainNth2) {
                                                childrenMainNth2.setAttribute(
                                                    'style',
                                                    'grid-area: 4 / 1 / auto / 2 !important;',
                                                );
                                                }
                                                // Checks if there are games available and if casino features are enabled
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Gets the casino games slider element
                                                    const casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first',
                                                        );
                                                    // Sets the grid area and margin for the casino games slider
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                } else {
                                                    // Creates a new div for casino games if none are available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area and margin for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 3 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Selects the fourth child of the main element
                                                const childrenMainNth3 =
                                                    this.elementMain.childNodes[3];
                                                // Sets the grid area for the fourth child
                                                if (childrenMainNth3) {
                                                childrenMainNth3.setAttribute(
                                                    'style',
                                                    'grid-area: 6 / 1 / auto / 2 !important;',
                                                );
                                                }
                                                // Gets the first center banner element
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first',
                                                    );
                                                // Sets the grid area and margin for the center banner
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 5 / 1 / auto / o !important; margin: auto !important;',
                                                );
                                                // Appends the center banner to the main element
                                                this.elementMain.appendChild(
                                                    bannerCenterFirst,
                                                );
                                                // Selects the fifth child of the main element
                                                const childrenMainNth4 =
                                                    this.elementMain.childNodes[4];
                                                // Sets the grid area for the fifth child
                                                if (childrenMainNth4) {
                                                childrenMainNth4.setAttribute(
                                                    'style',
                                                    'grid-area: 8 / 1 / auto / 2 !important;',
                                                );
                                                }
                                                // Checks if there are more than one game available and if casino features are enabled
                                                if (this.games.length > 1 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) {
                                                    // Gets the casino games slider element for the last games
                                                    const casinoGamesMainLast =
                                                        document.getElementById(
                                                            'casino-slider-last',
                                                        );
                                                    // Sets the grid area and margin for the casino games slider
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 7 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the casino games slider to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainLast,
                                                    );
                                                } else {
                                                    // Creates a new div for the last casino games if none are available
                                                    const casinoGamesMainLast =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area and margin for the new div
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 7 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainLast,
                                                    );
                                                }
                                                // Checks if the jackpot2 configuration is enabled for the current country
                                                if (
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    // Gets the jackpot2 component element
                                                    const jackpot2Component =
                                                        document.getElementById(
                                                            'jackpots-v2',
                                                        );
                                                    // Sets the grid area and margin for the jackpot2 component
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the jackpot2 component to the main element
                                                    this.elementMain.appendChild(
                                                        jackpot2Component,
                                                    );
                                                } else {
                                                    // Creates a new div for the jackpot2 component if not enabled
                                                    const jackpot2Component =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area and margin for the new div
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        jackpot2Component,
                                                    );
                                                }
                                                // Checks if the sixth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[5] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[5]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the sixth child of the main element
                                                    const childrenMainNth5 =
                                                        this.elementMain
                                                            .childNodes[5];
                                                    // Sets the grid area for the sixth child
                                                    if (childrenMainNth5) {
                                                    childrenMainNth5.setAttribute(
                                                        'style',
                                                        'grid-area: 10 / 1 / auto / o !important;',
                                                    );
                                                    }
                                                } else {
                                                    // Creates a new div for the sixth child if not available
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area for the new div
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 10 / 1 / auto / o !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst,
                                                    );
                                                }
                                                // Checks if the jackpot configuration is enabled for the current country
                                                if (
                                                    this.appComponent.config.jackpot !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    // Gets the jackpot component element
                                                    const jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1',
                                                        );
                                                    // Sets the grid area and margin for the jackpot component
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the jackpot component to the main element
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                } else {
                                                    // Creates a new div for the jackpot component if not enabled
                                                    const jackpotComponent =
                                                        document.createElement(
                                                            'div',
                                                        );
                                                    // Sets the grid area and margin for the new div
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    // Appends the new div to the main element
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                }

                                                if (
                                                    this.appComponent.config.jackpot4 !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    const jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1',
                                                        );
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                    this.elementMain.appendChild(
                                                        jackpotComponent,
                                                    );
                                                } else
                                                if (
                                                    this.appComponent.config.jackpot3 !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                     const jackpotComponent =
                                                        document.getElementById('JackpotWinnerComponent');
                                                    if (jackpotComponent) {
                                                        jackpotComponent.setAttribute(
                                                            'style',
                                                            'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                        );
                                                        this.elementMain.appendChild(jackpotComponent);
                                                    };
                                                }

                                                // Checks if the seventh child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[6] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[6]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the seventh child of the main element
                                                    const childrenMainNth7 =
                                                        this.elementMain
                                                            .childNodes[6];
                                                    // Sets the grid area for the seventh child
                                                    if (childrenMainNth7) {
                                                    childrenMainNth7.setAttribute(
                                                        'style',
                                                        'grid-area: 12 / 1 / auto / o !important;',
                                                    );
                                                    }
                                                }
                                                // Checks if the eighth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[7] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[7]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the eighth child of the main element
                                                    const childrenMainNth8 =
                                                        this.elementMain
                                                            .childNodes[7];
                                                    // Sets the grid area for the eighth child
                                                    if (childrenMainNth8) {
                                                    childrenMainNth8.setAttribute(
                                                        'style',
                                                        'grid-area: 13 / 1 / auto / o !important;',
                                                    );
                                                    }
                                                }
                                                // Checks if the ninth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[8] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[8]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the ninth child of the main element
                                                    const childrenMainNth9 =
                                                        this.elementMain
                                                            .childNodes[8];
                                                    // Sets the grid area for the ninth child
                                                    childrenMainNth9.setAttribute(
                                                        'style',
                                                        'grid-area: 14 / 1 / auto / o !important;',
                                                    );
                                                }
                                                // Checks if the tenth child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[9] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the tenth child of the main element
                                                    const childrenMainNth10 =
                                                        this.elementMain
                                                            .childNodes[9];
                                                    // Sets the grid area for the tenth child
                                                    childrenMainNth10.setAttribute(
                                                        'style',
                                                        'grid-area: 15 / 1 / auto / o !important;',
                                                    );
                                                }
                                                // Checks if the eleventh child is not one of the specified IDs
                                                if (
                                                    this.elementMain
                                                        .childNodes[10] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    // Selects the eleventh child of the main element
                                                    const childrenMainNth11 =
                                                        this.elementMain
                                                            .childNodes[10];
                                                    // Sets the grid area for the eleventh child
                                                    childrenMainNth11.setAttribute(
                                                        'style',
                                                        'grid-area: 16 / 1 / auto / o !important;',
                                                    );
                                                }
                                            }
                                        } else if (this.isMobile) { // Check if the device is mobile
                                            if (this.$route.fullPath.includes('/deportes-en-vivo')) { // Check if the current route includes a specific path
                                                const childrenMainNth1 = this.elementMain.childNodes[0]; // Get the first child node of elementMain
                                                childrenMainNth1.setAttribute(
                                                    'style',
                                                    'grid-area: 1 / 1 / auto / 2 !important;', // Set CSS grid area for the first child
                                                );
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) { // Check if games are available and certain features are enabled
                                                    const casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first', // Get the casino slider element
                                                        );
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 2 / 1 / auto / o !important; margin: auto !important;', // Set CSS grid area and margin for the casino games
                                                    );
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst, // Append the casino games element to elementMain
                                                    );
                                                } else {
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div', // Create a new div for casino games if none are available
                                                        );
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 2 / 1 / auto / 2 !important; margin: auto !important;', // Set CSS grid area and margin
                                                    );
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst, // Append the new div to elementMain
                                                    );
                                                }
                                                const childrenMainNth2 = this.elementMain.childNodes[1]; // Get the second child node of elementMain
                                                if (childrenMainNth2) {
                                                childrenMainNth2.setAttribute(
                                                    'style',
                                                    'grid-area: 3 / 1 / auto / 2 !important;', // Set CSS grid area for the second child
                                                );
                                                }
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first', // Get the first banner element
                                                    );
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 4 / 1 / auto / 2 !important; margin: auto !important;', // Set CSS grid area and margin for the banner
                                                );
                                                this.elementMain.appendChild(
                                                    bannerCenterFirst, // Append the banner element to elementMain
                                                );
                                            } else {
                                                const childrenMainNth3 =
                                                    this.elementMain
                                                        .childNodes[3]; // Get the fourth child node of elementMain
                                                        if (childrenMainNth3) {
                                                childrenMainNth3.setAttribute(
                                                    'style',
                                                    'grid-area: 5 / 1 / auto / 2 !important;', // Set CSS grid area for the fourth child
                                                );
                                                        }
                                                let retirementNotes =
                                                    document.createElement('div'); // Create a new div for retirement notes
                                                if (!this.appComponent.session.logueado) { // Check if the user is logged in
                                                    retirementNotes =
                                                        document.getElementById(
                                                            'retirement-notes-aside', // Get the retirement notes element if logged in
                                                        );
                                                }
                                                retirementNotes.setAttribute(
                                                    'style',
                                                    'grid-area: 4 / 1 / auto / 2 !important; max-width: 96vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin for retirement notes
                                                );
                                                const childrenMainNth4 =
                                                    this.elementMain
                                                        .childNodes[4]; // Get the fifth child node of elementMain
                                                        if (childrenMainNth4) {
                                                childrenMainNth4.setAttribute(
                                                    'style',
                                                    'grid-area: 6 / 1 / auto / 2 !important;', // Set CSS grid area for the fifth child
                                                );
                                                        }
                                                const childrenMainNth5 =
                                                    this.elementMain
                                                        .childNodes[5]; // Get the sixth child node of elementMain
                                                        if (childrenMainNth5) {
                                                childrenMainNth5.setAttribute(
                                                    'style',
                                                    'grid-area: 7 / 1 / auto / 2 !important;', // Set CSS grid area for the sixth child
                                                );
                                                        }
                                                const childrenMainNth6 =
                                                    this.elementMain
                                                        .childNodes[6]; // Get the seventh child node of elementMain
                                                if (childrenMainNth6) {
                                                childrenMainNth6.setAttribute(
                                                    'style',
                                                    'grid-area: 8 / 1 / auto / 2 !important;', // Set CSS grid area for the seventh child
                                                );
                                                        }
                                                let casinoGamesMainFirst =
                                                    document.createElement(
                                                        'div', // Create a new div for casino games
                                                    );
                                                if (this.games.length > 0 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) { // Check if games are available and certain features are enabled
                                                    casinoGamesMainFirst =
                                                        document.getElementById(
                                                            'casino-slider-first', // Get the casino slider element
                                                        );
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / 2 !important; max-width: 95vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin for the casino games
                                                    );
                                                } else {
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 9 / 1 / auto / 2 !important; max-width: 95vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin
                                                    );
                                                }
                                                const childrenMainNth7 =
                                                    this.elementMain
                                                        .childNodes[7]; // Get the eighth child node of elementMain
                                                        if (childrenMainNth7) {
                                                childrenMainNth7.setAttribute(
                                                    'style',
                                                    'grid-area: 10 / 1 / auto / 2 !important;', // Set CSS grid area for the eighth child
                                                );
                                                        }
                                                const bannerCenterFirst =
                                                    document.getElementById(
                                                        'banners-center-first', // Get the first banner element
                                                    );
                                                bannerCenterFirst.setAttribute(
                                                    'style',
                                                    'grid-area: 11 / 1 / auto / 2 !important; max-width: 90vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin for the banner
                                                );
                                                const childrenMainNth8 =
                                                    this.elementMain
                                                        .childNodes[8]; // Get the ninth child node of elementMain
                                                        if (childrenMainNth8) {
                                                childrenMainNth8.setAttribute(
                                                    'style',
                                                    'grid-area: 12 / 1 / auto / 2 !important;', // Set CSS grid area for the ninth child
                                                );
                                                        }
                                                let casinoGamesMainLast =
                                                    document.createElement(
                                                        'div', // Create a new div for the last casino games
                                                    );
                                                if (this.games.length > 1 && (this.appComponent.casinoEnabled && this.appComponent.liveCasinoEnabled && this.appComponent.virtualesEnabled)) { // Check if more than one game is available and certain features are enabled
                                                    casinoGamesMainLast =
                                                        document.getElementById(
                                                            'casino-slider-last', // Get the last casino slider element
                                                        );
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 13 / 1 / auto / 2 !important; max-width: 90vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin for the last casino games
                                                    );
                                                } else {
                                                    casinoGamesMainLast.setAttribute(
                                                        'style',
                                                        'grid-area: 13 / 1 / auto / 2 !important; max-width: 90vw !important; margin: auto !important;', // Set CSS grid area, max-width, and margin
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[9] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[9] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[9]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth9 =
                                                        this.elementMain
                                                            .childNodes[9]; // Get the tenth child node of elementMain
                                                    childrenMainNth9.setAttribute(
                                                        'style',
                                                        'grid-area: 14 / 1 / auto / 2 !important;', // Set CSS grid area for the tenth child
                                                    );
                                                } else {
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div', // Create a new div for casino games if none are available
                                                        );
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 14 / 1 / auto / 2 !important;', // Set CSS grid area for the new div
                                                    );
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst, // Append the new div to elementMain
                                                    );
                                                }
                                                let jackpot2Component =
                                                    document.createElement(
                                                        'div', // Create a new div for jackpot2 component
                                                    );
                                                if (
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].on &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    jackpot2Component =
                                                        document.getElementById(
                                                            'jackpots-v2', // Get the jackpot2 element if conditions are met
                                                        );
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 15 / 1 / auto / o !important; margin: auto !important;', // Set CSS grid area and margin for jackpot2
                                                    );
                                                } else {
                                                    jackpot2Component.setAttribute(
                                                        'style',
                                                        'grid-area: 15 / 1 / auto / o !important; margin: auto !important;', // Set CSS grid area and margin
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[10] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[10] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[10]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth10 =
                                                        this.elementMain
                                                            .childNodes[10]; // Get the eleventh child node of elementMain
                                                    childrenMainNth10.setAttribute(
                                                        'style',
                                                        'grid-area: 16 / 1 / auto / 2 !important;', // Set CSS grid area for the eleventh child
                                                    );
                                                } else {
                                                    const casinoGamesMainFirst =
                                                        document.createElement(
                                                            'div', // Create a new div for casino games if none are available
                                                        );
                                                    casinoGamesMainFirst.setAttribute(
                                                        'style',
                                                        'grid-area: 16 / 1 / auto / 2 !important;', // Set CSS grid area for the new div
                                                    );
                                                    this.elementMain.appendChild(
                                                        casinoGamesMainFirst, // Append the new div to elementMain
                                                    );
                                                }
                                                let jackpotComponent =
                                                    document.createElement(
                                                        'div', // Create a new div for jackpot component
                                                    );
                                                if (
                                                    this.appComponent.config.jackpot !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1', // Get the jackpot element if conditions are met
                                                        );
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 17 / 1 / auto / o !important; margin: auto !important;', // Set CSS grid area and margin for jackpot
                                                    );
                                                } else {
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 17 / 1 / auto / o !important; margin: auto !important;', // Set CSS grid area and margin
                                                    );
                                                }

                                                if (
                                                    this.appComponent.config.jackpot4 !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot4[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                    jackpotComponent =
                                                        document.getElementById(
                                                            'jackpots-v1', // Get the jackpot4 element if conditions are met
                                                        );
                                                    jackpotComponent.setAttribute(
                                                        'style',
                                                        'grid-area: 17 / 1 / auto / o !important; margin: auto !important;',
                                                    );
                                                } else
                                                if (
                                                    this.appComponent.config.jackpot3 !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot3[this.appComponent.country] &&
                                                    this.appComponent.config.jackpot2 !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country] !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook !== undefined &&
                                                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                                                ) {
                                                     const jackpotComponent =
                                                        document.getElementById('JackpotWinnerComponent');
                                                    if (jackpotComponent) {
                                                        jackpotComponent.setAttribute(
                                                            'style',
                                                            'grid-area: 11 / 1 / auto / o !important; margin: auto !important;',
                                                        );
                                                        this.elementMain.appendChild(jackpotComponent);
                                                    }
                                                }

                                                if (
                                                    this.elementMain
                                                        .childNodes[11] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[11] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[11]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth11 =
                                                        this.elementMain
                                                            .childNodes[11]; // Get the twelfth child node of elementMain
                                                    childrenMainNth11.setAttribute(
                                                        'style',
                                                        'grid-area: 18 / 1 / auto / 2 !important;', // Set CSS grid area for the twelfth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[12] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[12] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[12]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[12]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[12]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[12]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[12]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[12]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth12 =
                                                        this.elementMain
                                                            .childNodes[12]; // Get the thirteenth child node of elementMain
                                                    childrenMainNth12.setAttribute(
                                                        'style',
                                                        'grid-area: 19 / 1 / auto / 2 !important;', // Set CSS grid area for the thirteenth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[13] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[13] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[13]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[13]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[13]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[13]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[13]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[13]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth13 =
                                                        this.elementMain
                                                            .childNodes[13]; // Get the fourteenth child node of elementMain
                                                    childrenMainNth13.setAttribute(
                                                        'style',
                                                        'grid-area: 20 / 1 / auto / 2 !important;', // Set CSS grid area for the fourteenth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[14] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[14] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[14]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[14]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[14]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[14]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[14]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[14]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth14 =
                                                        this.elementMain
                                                            .childNodes[14]; // Get the fifteenth child node of elementMain
                                                    childrenMainNth14.setAttribute(
                                                        'style',
                                                        'grid-area: 21 / 1 / auto / 2 !important;', // Set CSS grid area for the fifteenth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[15] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[15] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[15]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[15]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[15]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[15]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[15]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[15]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth15 =
                                                        this.elementMain
                                                            .childNodes[15]; // Get the sixteenth child node of elementMain
                                                    childrenMainNth15.setAttribute(
                                                        'style',
                                                        'grid-area: 22 / 1 / auto / 2 !important;', // Set CSS grid area for the sixteenth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[16] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[16] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[16]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[16]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[16]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[16]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[16]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[16]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth16 =
                                                        this.elementMain
                                                            .childNodes[16]; // Get the seventeenth child node of elementMain
                                                    childrenMainNth16.setAttribute(
                                                        'style',
                                                        'grid-area: 23 / 1 / auto / 2 !important;', // Set CSS grid area for the seventeenth child
                                                    );
                                                }
                                                if (
                                                    this.elementMain
                                                        .childNodes[17] !==
                                                    null &&
                                                    this.elementMain
                                                        .childNodes[17] !==
                                                    undefined &&
                                                    this.elementMain.childNodes[17]
                                                        .id !==
                                                    'casino-slider-first' &&
                                                    this.elementMain.childNodes[17]
                                                        .id !==
                                                    'casino-slider-last' &&
                                                    this.elementMain.childNodes[17]
                                                        .id !==
                                                    'banners-center-first' &&
                                                    this.elementMain.childNodes[17]
                                                        .id !== 'jackpots-v2' &&
                                                    this.elementMain.childNodes[17]
                                                        .id !== 'jackpots-v1' &&
                                                    this.elementMain.childNodes[17]
                                                        .id !== 'jackpots-v4'
                                                ) {
                                                    const childrenMainNth17 =
                                                        this.elementMain
                                                            .childNodes[17]; // Get the eighteenth child node of elementMain
                                                    childrenMainNth17.setAttribute(
                                                        'style',
                                                        'grid-area: 24 / 1 / auto / 2 !important;', // Set CSS grid area for the eighteenth child
                                                    );
                                                }
                                                this.elementMain.insertBefore(
                                                    bannerCenterFirst, 
                                                    childrenMainNth7
                                                );
                                                this.elementMain.insertBefore(
                                                    retirementNotes,
                                                    childrenMainNth3, // Insert retirement notes before the third child
                                                );
                                                this.elementMain.insertBefore(
                                                    casinoGamesMainFirst,
                                                    childrenMainNth6, // Insert first casino games before the sixth child
                                                );
                                                this.elementMain.insertBefore(
                                                    bannerCenterFirst,
                                                    childrenMainNth7, // Insert banner before the seventh child
                                                );
                                                this.elementMain.insertBefore(
                                                    casinoGamesMainLast,
                                                    childrenMainNth8, // Insert last casino games before the eighth child
                                                );
                                                this.elementMain.appendChild(
                                                    jackpot2Component, // Append jackpot2 component to elementMain
                                                );
                                                this.elementMain.appendChild(
                                                    jackpotComponent, // Append jackpot component to elementMain
                                                );
                                            }
                                        }
                                    }
                                } else {
                                    count++;
                                    if (count === 100) {
                                        clearInterval(time);
                                    }
                                }
                            } else {
                                count++;
                                if (count === 100) {
                                    clearInterval(time);
                                }
                            }
                        } else {
                            count++;
                            if (count === 100) {
                                clearInterval(time);
                            }
                        }
                    }, 100);
                } catch (e) {
                    console.error('Error en getComponents', e);
                }
            } else {
                this.sportBookStore.loading = false;
            }
        },
        async bannersFromFirestore() {
        const fsBannerR = await useGetInfoFirestore(this.config, this.appComponent, 'banner_right', { useLogin: true, useScope: true })
        if (fsBannerR?.length) this.bannersR = fsBannerR

        const fsBannerL = await useGetInfoFirestore(this.config, this.appComponent, 'banner_left', { useLogin: true, useScope: true })
        if (fsBannerL?.length) this.bannersL = fsBannerL

        const fsBannerC = await useGetInfoFirestore(this.config, this.appComponent, 'banner_center', { useLogin: true, useScope: true })
        if (fsBannerC?.length) this.bannersC = fsBannerC
        },

    },
    async created() {
        if (this.appComponent.config !== undefined && this.appComponent.config.jackpot2 !== undefined && this.appComponent.config.jackpot2[this.appComponent.country] !== undefined && this.appComponent.config.jackpot2[this.appComponent.country]['params'] !== undefined) {
            this.jackpotsParams = this.appComponent.config.jackpot2[this.appComponent.country]['params'];
        }
        await this.bannersFromFirestore()
    },
    beforeMount() {
        // Set background color based on configuration
        if (
            this.appComponent.config['sportBookVersion'].backgroundColor !==
            undefined &&
            this.appComponent.config['sportBookVersion'].backgroundColor !== ''
        ) {
            this.backgroundColor =
                this.appComponent.config['sportBookVersion'].backgroundColor;
        }
        // Determine device theme based on configuration
        if (
            this.config.theme_colors_desktop !== undefined &&
            this.config.mobileL === ''
        )
            this.deviceTheme = 'theme_colors_desktop';
        else if (
            this.config.theme_colors_mobile !== undefined &&
            this.config.mobileL !== ''
        )
            this.deviceTheme = 'theme_colors_mobile';
        this.colors = this.config[this.deviceTheme]; // Set colors based on theme
        // Merge additional properties from configuration
        if (
            this.appComponent.config['sportBookVersion'].props !== undefined &&
            this.appComponent.config['sportBookVersion'].props !== ''
        ) {
            this.propSB = {
                ...this.propSB,
                ...this.appComponent.config['sportBookVersion'].props,
            };
        }
        // Determine device type for banners
        if (this.appComponent.mobile === '') {
            this.device = 'bannersDesktop';
        } else if (this.appComponent.mobile === '1') {
            this.device = 'bannersMobile';
        }
        // Set login state based on session
        if (this.appComponent.session.logueado) {
            this.login = 'login';
        } else {
            this.login = 'notLogin';
        }
        if (this.appComponent.session.logueado) {
            this.login2 = 'login';
        } else {
            this.login2 = 'not_login';
        }
        // Load games from configuration
        if (
            this.appComponent.config.sportBookVersion.games !== undefined &&
            this.appComponent.config.sportBookVersion.games[
                this.appComponent.country
                ] !== undefined &&
            this.appComponent.config.sportBookVersion.games[
                this.appComponent.country
                ].length > 0
        ) {
            this.games =
                this.appComponent.config.sportBookVersion.games[
                    this.appComponent.country
                    ];
        }
        // Load banners based on login state and language
        if (
            this.appComponent.config[this.login2] !== undefined &&
            this.appComponent.config[this.login2][this.appComponent.lngProd] !==
            undefined &&
            this.appComponent.config[this.login2][this.appComponent.lngProd][
                'banners'
                ] !== undefined
        ) {
            if (
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_right'] !== undefined
            ) {
                this.bannersR = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            this.appComponent.lngProd
                            ]['banners']['banner_right'],
                    ),
                );
                this.bannersR = this.bannersR.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            }
            if (
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_left'] !== undefined
            ) {
                this.bannersL = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            this.appComponent.lngProd
                            ]['banners']['banner_left'],
                    ),
                );
                this.bannersL = this.bannersL.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            }
            if (
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_center'] !== undefined
            ) {
                this.bannersC = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            this.appComponent.lngProd
                            ]['banners']['banner_center'],
                    ),
                );
                this.bannersC = this.bannersC.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            } else {
                if (
                    this.appComponent.config[this.login2][
                        this.appComponent.lngProd
                        ]['banners']['banner_center'] !== undefined
                ) {
                    this.bannersC = JSON.parse(
                        JSON.stringify(
                            this.appComponent.config[this.login2][
                                this.appComponent.lngProd
                                ]['banners']['banner_center'],
                        ),
                    );
                    this.bannersC = this.bannersC.filter((e) => {
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            return true;
                        }
                        const currentDate = new Date();
                        if (
                            e.startDate !== undefined &&
                            e.startDate !== '' &&
                            e.date !== undefined &&
                            e.date !== ''
                        ) {
                            const startDate = new Date(e.startDate);
                            const endDate = new Date(e.date);
                            return (
                                currentDate.getTime() >= startDate.getTime() &&
                                currentDate.getTime() <= endDate.getTime()
                            );
                        }
                        if (
                            (e.startDate !== undefined || e.startDate !== '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            const startDate = new Date(e.startDate);
                            return currentDate.getTime() >= startDate.getTime();
                        }
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date !== undefined || e.date !== '')
                        ) {
                            const endDate = new Date(e.date);
                            return currentDate.getTime() <= endDate.getTime();
                        }
                        return true;
                    });
                }
            }
        } else if (
            this.appComponent.config[this.device] !== undefined &&
            this.appComponent.config[this.device][this.appComponent.country] !==
            undefined &&
            this.appComponent.config[this.device][this.appComponent.country][
                this.appComponent.lngProd
                ] !== undefined &&
            this.appComponent.config[this.device][this.appComponent.country][
                this.appComponent.lngProd
                ][this.login] !== undefined
        ) {
            if (
                this.appComponent.config[this.login2] !== undefined && this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ] !== undefined && this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners'] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_right'] !== undefined
            ) {
                this.bannersR = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            appComponent.lngProd
                            ]['banners']['banner_right'],
                    ),
                );
                this.bannersR = this.bannersR.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            } else {
                if (
                    this.appComponent.config[this.device][
                        this.appComponent.country
                        ][this.appComponent.lngProd][this.login]['banner-right'] !==
                    undefined
                ) {
                    this.bannersR = JSON.parse(
                        JSON.stringify(
                            this.appComponent.config[this.device][
                                this.appComponent.country
                                ][this.appComponent.lngProd][this.login][
                                'banner-right'
                                ],
                        ),
                    );
                    this.bannersR = this.bannersR.filter((e) => {
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            return true;
                        }
                        const currentDate = new Date();
                        if (
                            e.startDate !== undefined &&
                            e.startDate !== '' &&
                            e.date !== undefined &&
                            e.date !== ''
                        ) {
                            const startDate = new Date(e.startDate);
                            const endDate = new Date(e.date);
                            return (
                                currentDate.getTime() >= startDate.getTime() &&
                                currentDate.getTime() <= endDate.getTime()
                            );
                        }
                        if (
                            (e.startDate !== undefined || e.startDate !== '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            const startDate = new Date(e.startDate);
                            return currentDate.getTime() >= startDate.getTime();
                        }
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date !== undefined || e.date !== '')
                        ) {
                            const endDate = new Date(e.date);
                            return currentDate.getTime() <= endDate.getTime();
                        }
                        return true;
                    });
                }
            }
            if (
                this.appComponent.config !== undefined &&
                this.appComponent.config[this.login2] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners'] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_left'] !== undefined
            ) {
                this.bannersL = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            appComponent.lngProd
                            ]['banners']['banner_left'],
                    ),
                );
                this.bannersL = this.bannersL.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            } else {
                if (
                    this.appComponent.config[this.device][
                        this.appComponent.country
                        ][this.appComponent.lngProd][this.login]['banner-left'] !==
                    undefined
                ) {
                    this.bannersL = JSON.parse(
                        JSON.stringify(
                            this.appComponent.config[this.device][
                                this.appComponent.country
                                ][this.appComponent.lngProd][this.login][
                                'banner-left'
                                ],
                        ),
                    );
                    this.bannersL = this.bannersL.filter((e) => {
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            return true;
                        }
                        const currentDate = new Date();
                        if (
                            e.startDate !== undefined &&
                            e.startDate !== '' &&
                            e.date !== undefined &&
                            e.date !== ''
                        ) {
                            const startDate = new Date(e.startDate);
                            const endDate = new Date(e.date);
                            return (
                                currentDate.getTime() >= startDate.getTime() &&
                                currentDate.getTime() <= endDate.getTime()
                            );
                        }
                        if (
                            (e.startDate !== undefined || e.startDate !== '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            const startDate = new Date(e.startDate);
                            return currentDate.getTime() >= startDate.getTime();
                        }
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date !== undefined || e.date !== '')
                        ) {
                            const endDate = new Date(e.date);
                            return currentDate.getTime() <= endDate.getTime();
                        }
                        return true;
                    });
                }
            }
            if (
                this.appComponent.config !== undefined &&
                this.appComponent.config[this.login2] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners'] !== undefined &&
                this.appComponent.config[this.login2][
                    this.appComponent.lngProd
                    ]['banners']['banner_center'] !== undefined
            ) {
                this.bannersC = JSON.parse(
                    JSON.stringify(
                        this.appComponent.config[this.login2][
                            appComponent.lngProd
                            ]['banners']['banner_center'],
                    ),
                );
                this.bannersC = this.bannersC.filter((e) => {
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        return true;
                    }
                    const currentDate = new Date();
                    if (
                        e.startDate !== undefined &&
                        e.startDate !== '' &&
                        e.date !== undefined &&
                        e.date !== ''
                    ) {
                        const startDate = new Date(e.startDate);
                        const endDate = new Date(e.date);
                        return (
                            currentDate.getTime() >= startDate.getTime() &&
                            currentDate.getTime() <= endDate.getTime()
                        );
                    }
                    if (
                        (e.startDate !== undefined || e.startDate !== '') &&
                        (e.date === undefined || e.date === '')
                    ) {
                        const startDate = new Date(e.startDate);
                        return currentDate.getTime() >= startDate.getTime();
                    }
                    if (
                        (e.startDate === undefined || e.startDate === '') &&
                        (e.date !== undefined || e.date !== '')
                    ) {
                        const endDate = new Date(e.date);
                        return currentDate.getTime() <= endDate.getTime();
                    }
                    return true;
                });
            } else {
                if (
                    this.appComponent.config[this.device][
                        this.appComponent.country
                        ][this.appComponent.lngProd][this.login][
                        'banner-center'
                        ] !== undefined
                ) {
                    this.bannersC = JSON.parse(
                        JSON.stringify(
                            this.appComponent.config[this.device][
                                this.appComponent.country
                                ][this.appComponent.lngProd][this.login][
                                'banner-center'
                                ],
                        ),
                    );
                    this.bannersC = this.bannersC.filter((e) => {
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            return true;
                        }
                        const currentDate = new Date();
                        if (
                            e.startDate !== undefined &&
                            e.startDate !== '' &&
                            e.date !== undefined &&
                            e.date !== ''
                        ) {
                            const startDate = new Date(e.startDate);
                            const endDate = new Date(e.date);
                            return (
                                currentDate.getTime() >= startDate.getTime() &&
                                currentDate.getTime() <= endDate.getTime()
                            );
                        }
                        if (
                            (e.startDate !== undefined || e.startDate !== '') &&
                            (e.date === undefined || e.date === '')
                        ) {
                            const startDate = new Date(e.startDate);
                            return currentDate.getTime() >= startDate.getTime();
                        }
                        if (
                            (e.startDate === undefined || e.startDate === '') &&
                            (e.date !== undefined || e.date !== '')
                        ) {
                            const endDate = new Date(e.date);
                            return currentDate.getTime() <= endDate.getTime();
                        }
                        return true;
                    });
                }
            }
        }
    },
    mounted() {
        // Detectar cambio de tema cada 500ms
        this.checkThemeInterval = setInterval(() => {
            const newTheme = localStorage.getItem('changeThemeColor');
            if (newTheme !== this.currentTheme) {
                this.currentTheme = newTheme;
                this.getComponents(); // Reinyecta estilos
            }
        }, 500);
        let regex = /(\d+)/g; // Regular expression for extracting numbers
        // Determine the current page based on route parameters
        if (this.$route.params.DeporteId === 'lottery') {
            this.sportBookStore.page =
                this.appComponent.config['sportBookVersion'].lotteryPage !==
                undefined &&
                this.appComponent.config['sportBookVersion'].lotteryPage !== ''
                    ? this.appComponent.config['sportBookVersion'].lotteryPage
                    : 'toto';
        } else if (this.$route.params.DeporteId === 'historial-bonos') {
            this.sportBookStore.page =
                this.appComponent.config['sportBookVersion'].customPage2 !==
                undefined &&
                this.appComponent.config['sportBookVersion'].customPage2 !== ''
                    ? this.appComponent.config['sportBookVersion'].customPage2
                    : 'custom2';
        } else if (this.$route.params.DeporteId === 'zona-copas') {
            this.sportBookStore.page =
                this.appComponent.config['sportBookVersion'].copaPage !==
                undefined &&
                this.appComponent.config['sportBookVersion'].copaPage !== ''
                    ? this.appComponent.config['sportBookVersion'].copaPage
                    : 'custom2';
        } else if (this.$route.params.DeporteId !== undefined) {
            let str = this.$route.params.DeporteId;
            let matches = str.match(regex);
            this.sportBookStore.sportId = Number(matches[0]); // Set sport ID
        } else if (this.$route.params.PartidoId !== undefined) {
            this.sportBookStore.eventId = Number(this.$route.params.PartidoId); // Set event ID
        } else if (this.$route.params.PaisId !== undefined) {
            this.sportBookStore.categoryIds = [Number(this.$route.params.PaisId)]; // Set event ID
        } else if (this.$route.params.LigaId !== undefined) {
            let str = this.$route.params.LigaId;
            if (str.includes('ligue1')) {
                str = str.replace('ligue1', '');
            }
            let matches = str.match(regex);
            this.sportBookStore.championshipIds = [Number(matches[0])]; // Set championship IDs
        } else if (
            this.$route.fullPath.includes('/deportes-en-vivo') ||
            this.$route.fullPath.includes('/apuestas-en-vivo')
        ) {
            this.sportBookStore.page = 'live'; // Set page to live
        }
        const urlObj = new URL(window.location.href); // Create URL object from current location
        const pageParam = urlObj.searchParams.get('page'); // Get page parameter from URL
        if (pageParam) {
            this.sportBookStore.page = pageParam; // Set page from URL parameter
        }
        const shareCodeParam = urlObj.searchParams.get('shareCode'); // Get share code parameter from URL
        if (shareCodeParam) {
            this.sportBookStore.shareCode = shareCodeParam; // Set share code from URL parameter
        }
        try {
            this.$router.replace({ path: this.$route.path }); // Replace router path
        } catch (e) {
            console.error('Error al intentar eliminar las querys de la ruta:', e); // Log error
        }
        const existingScript = document.getElementById('altenarWSDK'); // Check for existing SDK script
        if (existingScript) {
            existingScript.parentNode.removeChild(existingScript); // Remove existing script
        }
        const script = document.createElement('script'); // Create new script element
        script.setAttribute('id', 'altenarWSDK'); // Set script ID
        script.setAttribute('type', 'text/javascript'); // Set script type
        script.setAttribute('src', this.appComponent.config.altenar2.src); // Set script source
        document.body.appendChild(script); // Append script to body
        script.addEventListener('load', () => { // Add load event listener
            this.sportBookStore.loadedAltenarSdk = true; // Set SDK loaded flag
            try {
                let integration = ''; // Integration variable
                let culture = ''; // Culture variable
                let oddsFormat = 0; // Odds format variable
                let theme = ''; // Theme variable
                if (this.cookies.get('lng') !== undefined) { // Check for language cookie
                    switch (this.cookies.get('lng')) {
                        case 'es':
                            culture = 'es-ES'; // Set culture for Spanish
                            break;
                        case 'en':
                            culture = 'en-GB'; // Set culture for English
                            break;
                        case 'pt':
                            culture = 'pt-BR'; // Set culture for Portuguese
                            break;
                        default:
                            culture =
                                this.appComponent.config.altenar2[
                                    this.appComponent.country
                                    ] !== undefined &&
                                this.appComponent.config.altenar2[
                                    this.appComponent.country
                                    ].culture !== undefined
                                    ? this.appComponent.config.altenar2[
                                        this.appComponent.country
                                        ].culture
                                    : this.appComponent.config.altenar2.culture
                                        ? this.appComponent.config.altenar2.culture
                                        : 'es-ES'; // Default culture
                            break;
                    }
                }
                if (
                    this.appComponent.config.altenar2[
                        this.appComponent.country
                        ] !== undefined &&
                    this.appComponent.config.altenar2[this.appComponent.country]
                        .integration !== undefined
                ) {
                    integration =
                        this.appComponent.config.altenar2[
                            this.appComponent.country
                            ].integration; // Set integration from config
                } else if (
                    this.appComponent.config.altenar2.integration !== undefined
                ) {
                    integration = this.appComponent.config.altenar2.integration; // Set integration from config
                }
                if (
                    this.appComponent.skinIdITN !== undefined &&
                    this.appComponent.skinIdITN !== ''
                ) {
                    integration = this.appComponent.skinIdITN; // Set integration from skin ID
                }
                if (
                    this.appComponent.config.altenar2[
                        this.appComponent.country
                        ] !== undefined &&
                    this.appComponent.config.altenar2[this.appComponent.country]
                        .oddsFormat !== undefined
                ) {
                    oddsFormat =
                        this.appComponent.config.altenar2[
                            this.appComponent.country
                            ].oddsFormat; // Set odds format from config
                } else if (
                    this.appComponent.config.altenar2.oddsFormat !== undefined
                ) {
                    oddsFormat = this.appComponent.config.altenar2.oddsFormat; // Set odds format from config
                }
                if (this.appComponent.themeSportbook) {
                    theme = 'light'; // Default theme
                } else {
                    theme = 'dark'; // Update theme based on app component
                }
                watch(() => this.appComponent.themeSportbook,
                    (newValue, oldValue) => {
                        if (newValue === true) {
                            theme = 'light'; // Update theme based on app component
                            window.altenarWSDK.set({
                                themeName: theme,
                            });
                        } else {
                            theme = 'dark'; // Update theme based on app component
                            window.altenarWSDK.set({
                                themeName: theme,
                            });

                        }
                    },
                );
                window.altenarWSDK.init({ // Initialize SDK
                    integration: integration,
                    culture: culture,
                    oddsFormat: oddsFormat,
                    token: this.appComponent.tokenSB, // Set token for SDK
                    themeName: theme,
                });

                setTimeout(() => {
                    this.sportBookStore.betSlipMobile = false; // Set mobile bet slip flag
                    this.getSportBook(); // Fetch sportsbook data
                }, 500);
            } catch (e) {
            }
        });
        let targetNode = document.getElementById('SportBook'); // Target node for mutation observer
        this.observer = new MutationObserver((mutationsList) => { // Create mutation observer
            for (let mutation of mutationsList) {
                if (
                    mutation.type === 'childList' &&
                    mutation.addedNodes.length > 0
                ) {
                    this.sportBookStore.loading = false; // Set loading to false
                    this.appComponent.config.loadSportbook = true; // Update config to indicate sportsbook is loaded
                    setTimeout(() => {
                        this.getComponents(); // Fetch components after delay
                    }, 2000);
                }
            }
        });
        let config = { childList: true, subtree: true }; // Observer configuration
        this.observer.observe(targetNode, config); // Start observing target node
    },
    beforeDestroy() {
        clearInterval(this.checkThemeInterval);
    },
    updated() {
        const checkAltenarWSDK = () => { // Function to check SDK status
            if (window.altenarWSDK && typeof window.altenarWSDK.set === 'function') {
                window.altenarWSDK.set({ token: this.appComponent.tokenSB }); // Set token in SDK
                clearInterval(intervalId); // Clear interval
                console.log('Se ingreso correctamente a la funcion de AltenarWSDK'); // Log success
            } else {
                console.error('Segun window.altenarWSDK.set no es una funcion'); // Log error
            }
        };
        const intervalId = setInterval(checkAltenarWSDK, 1000); // Set interval to check SDK
    },
    beforeUnmount() {
        this.sportBookStore.betSlipMobile = true; // Set mobile bet slip flag
        this.sportBookStore.setValues(
            'overview',
            undefined,
            undefined,
            undefined,
            undefined,
        ); // Reset sportsbook values

        if (this.changeColor) {
            clearInterval(this.changeColor);
        }
    },
    unmounted() {
        try {
            if (window.altenarWSDK && typeof window.altenarWSDK.set === 'function') {
                window.altenarWSDK.set({ token: this.appComponent.tokenSB }); // Set token in SDK
            } else {
                console.error('window.altenarWSDK.set no es una función o window.altenarWSDK no está definido'); // Log error
            }
        } catch (e) {
            console.error('Error al intentar llamar a window.altenarWSDK.set:', e); // Log error
        }
        this.observer.disconnect(); // Disconnect mutation observer
        if (window.ASB && typeof window.ASB.remove === 'function') {
            window.ASB.remove(); // Remove sportsbook instance
        } else {
            console.warn('window.ASB o window.ASB.remove no está definido'); // Log warning
        }
        this.sportBookStore.setValues(
            'overview',
            undefined,
            undefined,
            undefined,
            undefined,
        ); // Reset sportsbook values
        this.sportBookStore.loading = true; // Set loading to true
        this.sportBookStore.betSlipMobile = true; // Set mobile bet slip flag
    },
};
</script>
<style scoped>
</style>

<!-- FILE DOCUMENTED -->

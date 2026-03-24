<template>
    <!-- Main section for displaying top events, centered with padding -->
    <section class="py-2 relative flex flex-col justify-between items-start max-w-[1300px] mx-auto w-11/12"
    v-if="appComponent.config.sportbookStyle == undefined && providerSportbook === 'ITN'">
        <!-- Article container for the carousel, with a maximum width and centered alignment -->
        <article class=" z-20 relative flex flex-col justify-between items-start">
            <div v-if="title !== undefined && title !== null && title !== '' && title !== 'null'" class="w-auto h-auto flex flex-col mb-4">
                <div class="w-auto h-auto py-1 flex gap-3">
                    <img v-if="icon" :src="icon" alt="Icon" class="w-8 h-8 object-contain" /> <!-- Display icon if available -->
                    <h3
                        :class="[lowerCaseText ? 'capitalize font-light' : 'uppercase font-bold']"
                        class="text-neutral text-xl mt-1"
                        aria-label="Casino bets"
                    >
                        {{ title }} <!-- Display title -->
                    </h3>
                </div>
                <div
                    v-if="decorationBar"
                    class="h-1 w-full rounded-full"
                    :class="
							styleVersion === 1
								? 'bg-accent-content'
								: 'bg-accent'"
                ></div> <!-- Decoration bar -->
            </div>
            <!-- Placeholder for the top events carousel -->
            <div id="WTopEventsCarousel"></div>
        </article>
    </section>
    <!-- Main section for displaying top events, with conditional classes based on layout configuration -->
	<section
		v-if="appComponent.config.sportbookStyle != undefined &&
				appComponent.config.sportbookStyle == 1 && providerSportbook === 'ITN'"
		class="flex flex-col justify-center items-center w-full bg-transparent"
	>
		<!-- Wrapper for the content with responsive width -->
		<div class="w-11/12 max-w-[1300px]">
			<!-- Header section with icon and title -->
			<div class="in relative flex justify-between items-center mt-9">
				<div class="w-auto h-auto flex flex-col">
					<div class="w-auto h-auto py-1 flex gap-3 ">
						<!-- Conditional rendering of the icon -->
						<img
							v-if="icon != undefined && icon != ''"
							:src="icon"
							alt=""
							class="w-8 h-8 object-contain"
						/>
						<!-- Title of the section -->
						<h3
							class="uppercase font-bold text-xl mt-1"
							:class="
								textStyle == 2
									? 'text-primary-content'
									: 'text-neutral'
							"
							aria-label="Casino bets"
						>
							{{ $t(title != undefined ? title : 'TOP APUESTAS DEPORTIVAS' ) }}
						</h3>
					</div>
					<!-- Underline for the title -->
						<div
							class="h-1 w-full rounded-full"
							:class="
								textStyle == 2
									? 'bg-primary-content'
									: 'bg-accent'
							"
						></div>
				</div>
				<!-- Navigation buttons for the carousel -->
					<div
						v-if="
							appComponent.config.layout == undefined ||
							(appComponent.config.layout != undefined && appComponent.config.layout != 4)
						"
						class="flex gap-2"
						:class="
							appComponent.config.layout != undefined && appComponent.config.layout == 4
								? ' w-full justify-between px-3'
								: ''
						"
					>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slidePrev' + keySlide"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-left"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slideNext' + keySlide"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-right"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
					</div>
			</div>
			<!-- Container for the main content area -->
			<div
				class="py-2 flex justify-center items-center"
				:class="
					appComponent.config.layout != undefined && appComponent.config.layout == 4
						? ''
						: appComponent.config.layout != undefined && appComponent.config.layout == 5
							? 'my-3'
							: 'bg-transparent'
				"
			>
				<article
					:class="[
						appComponent.config.layout != undefined && appComponent.config.layout == 5
							? ' '
							: 'w-11/12',
					]"
					class="max-w-[1300px] z-20 flex justify-center items-center"
				>
					<!-- Placeholder for the widget carousel -->
					<div id="WTopEventsCarousel"></div>
				</article>
			</div>
		</div>
	</section>
</template>
<script>
import { useSportBookStore } from '../../stores/Sportbook'; // Importing the sport book store
import { useCookies } from 'vue3-cookies'; // Importing cookie handling
import { ref } from 'vue'; // Importing ref for reactive data

/**
 * Asynchronously loads a component with a delay.
 * @returns {Promise<Object>} A promise that resolves to an empty object after 10 seconds.
 */
const loadComponent = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({});
        }, 10000);
    });
};

export default {
    props: {
        title: { type: String, default: '' },
        url: { type: String, default: '' },
        icon: { type: String, default: '' },
        textStyle: { type: Number, default: 1 },
        lowerCaseText: { type: Boolean, default: false },
        decorationBar: { type: Boolean, default: true },
        styleVersion: { type: Number, default: 2 },
    },

    async setup() {
        const dataComponent = ref(await loadComponent()); // Reactive reference to loaded component data
        const { cookies } = useCookies(); // Using cookies for session management
        return {
            dataComponent,
            cookies, // Exposing cookies for use in the template
        };
    },

    data() {
        let appComponent = this.$appComponent; // Reference to the app component
        let colors = undefined; // Placeholder for colors
        let sportBookStore = useSportBookStore(); // Accessing the sport book store
        let backgroundOverride = {
            sport: {},
            event: {},
        }; // Object to override background settings
        let providerSportbook = 'ITN' // Reactive variable for sportsbook provider
        return {
            appComponent,
            sportBookStore,
            colors,
            backgroundOverride,
            providerSportbook,
        };
    },

    methods: {
        /**
         * Initializes the widget for displaying top events.
         */
        getWidget() {
            let count = 1; // Counter for checking SDK availability
            let checkInterval = setInterval(() => {
                count++;
                if (window.altenarWSDK !== undefined && count < 1000) {
                    clearInterval(checkInterval); // Stop checking once SDK is available
                    window.WTE = window.altenarWSDK.addWidget({
                        widget: 'WTopEventsCarousel', // Widget type
                        props: {
                            scrollerControls: 3, // Number of scroller controls
                            showScorePreview: true, // Option to show score preview
                            variants: {
                                OddChangeIndicator: 0,
                                BannerEventBoxCompetitors: 0,
                                BannerEventBox: 4,
                            },
                            backgroundOverride: this.backgroundOverride, // Background settings
                            onEventSelect: (event) => {
                                // Event handler for event selection
                                this.appComponent.gAnalytics('attemp_bet', event.event.name); // Analytics tracking
                                let urlRedirect = `/deportes/partido/${event.id}`; // Redirect URL
                                if (event['liveTime']) {
                                    urlRedirect = urlRedirect + '?page=liveEvent'; // Append query for live events
                                }
                                this.$router.push(urlRedirect); // Navigate to event page
                                this.sportBookStore.eventId = event.id; // Store selected event ID
                                try {
                                    window.fSportbookEventDetailCallback(event); // Callback for event details
                                } catch (e) {
                                    console.log(e); // Log errors
                                }
                            },
                            onOddSelect: (odd) => {
                                // Event handler for odd selection
                                this.$router.push(`/deportes/partido/${odd.eventId}`); // Navigate to odd's event page
                                this.sportBookStore.eventId = odd.eventId; // Store selected odd's event ID
                            },
                        },
                        tokens: this.tokens, // Pass tokens to the widget
                        container: document.getElementById('WTopEventsCarousel'), // Container for the widget
                    });
                }
            }, 500); // Check every 500ms
        },
    },

    created() {
        // Check for background configuration and set it
        if (
            this.appComponent.config.backgroundCardsTopEvents !== undefined &&
            this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country] !== undefined
        ) {
            this.backgroundOverride = this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country];
        }

        if (this.appComponent.config.providerSportbook !== undefined && this.appComponent.config.providerSportbook !== null && this.appComponent.config.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.config.providerSportbook;
        }

        if (this.appComponent.providerSportbook !== undefined && this.appComponent.providerSportbook !== null && this.appComponent.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.providerSportbook;
        }
    },

    mounted() {
        if (this.providerSportbook === 'ITN') {
            // Determine device theme based on configuration
            if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '')
                this.deviceTheme = 'theme_colors_desktop';
            else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '')
                this.deviceTheme = 'theme_colors_mobile';

            this.colors = this.appComponent.config[this.deviceTheme]; // Set colors based on device theme
            const existingScript = document.getElementById('altenarWSDK'); // Check for existing SDK script
            if (existingScript) {
                existingScript.parentNode.removeChild(existingScript); // Remove existing script if found
            }
            const script = document.createElement('script'); // Create new script element
            script.setAttribute('id', 'altenarWSDK'); // Set script ID
            script.setAttribute('type', 'text/javascript'); // Set script type
            script.setAttribute('src', this.appComponent.config.altenar2.src); // Set script source
            typeof window.runOnceOnFirstInteraction === "function" && window.runOnceOnFirstInteraction(
                () => {
                    setTimeout(() => {
                        console.log("[Altenar SDK] Loading script after first interaction");
                        document.body.appendChild(script); // Append script to the body
                    }, 1000);
                },
            )
            script.addEventListener('load', () => {
                // Event listener for script load
                this.sportBookStore.loadedAltenarSdk = true; // Mark SDK as loaded
                try {
                    let integration = ''; // Placeholder for integration type
                    let culture = ''; // Placeholder for culture setting
                    let oddsFormat = 0; // Placeholder for odds format
                    if (this.cookies.get('lng') !== undefined) {
                        // Check for language cookie
                        switch (this.cookies.get('lng')) {
                            case 'es':
                                culture = 'es-ES'; // Spanish culture
                                break;
                            case 'en':
                                culture = 'en-GB'; // English culture
                                break;
                            case 'pt':
                                culture = 'pt-BR'; // Portuguese culture
                                break;
                            default:
                                culture =
                                    this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                                    this.appComponent.config.altenar2[this.appComponent.country].culture !== undefined
                                        ? this.appComponent.config.altenar2[this.appComponent.country].culture // Default culture from config
                                        : this.appComponent.config.altenar2.culture
                                            ? this.appComponent.config.altenar2.culture // Fallback culture
                                            : 'es-ES'; // Default to Spanish
                                break;
                        }
                    }
                    // Determine integration type from configuration
                    if (
                        this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                        this.appComponent.config.altenar2[this.appComponent.country].integration !== undefined
                    ) {
                        integration = this.appComponent.config.altenar2[this.appComponent.country].integration;
                    } else if (this.appComponent.config.altenar2.integration !== undefined) {
                        integration = this.appComponent.config.altenar2.integration;
                    }
                    // Determine odds format from configuration
                    if (
                        this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                        this.appComponent.config.altenar2[this.appComponent.country].oddsFormat !== undefined
                    ) {
                        oddsFormat = this.appComponent.config.altenar2[this.appComponent.country].oddsFormat;
                    } else if (this.appComponent.config.altenar2.oddsFormat !== undefined) {
                        oddsFormat = this.appComponent.config.altenar2.oddsFormat;
                    }
                    // Initialize the Altenar SDK with configuration
                    window.altenarWSDK.init({
                        integration: integration,
                        culture: culture,
                        oddsFormat: oddsFormat,
                        token: this.appComponent.tokenSB, // Token for authentication
                    });
                    this.getWidget(); // Call to initialize the widget
                } catch (e) {
                } // Catch and ignore errors
                this.sportBookStore.flagSportBook = true; // Set flag indicating sport book is ready
            });
        }
    },
};
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

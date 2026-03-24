<template>
    <!-- Main section for displaying top events, with conditional classes based on layout configuration -->
    <section
        v-if="appComponent.config.sportbookStyle == undefined && providerSportbook === 'ITN'"
        class="py-2 flex justify-center items-center"
        :class="
            config.layout != undefined && config.layout == 4
                ? ''
                : config.layout != undefined && config.layout == 5
                ? 'my-3'
                : ''
        "
    >
        <!-- Article container for the widget, with conditional width based on layout configuration -->
        <article
            :class="[config.layout != undefined && config.layout == 5 ? ' ' : 'w-11/12']"
            class="max-w-[1300px] z-20 relative flex flex-col justify-between items-start"
        >
            <div
                v-if="title !== undefined && title !== null && title !== '' && title !== 'null'"
                class="w-auto h-auto flex flex-col mb-4"
            >
                <div class="w-auto h-auto py-1 flex gap-3">
                    <img
                        v-if="icon"
                        :src="icon"
                        alt="Icon"
                        class="w-8 h-8 object-contain"
                    />
                    <!-- Display icon if available -->
                    <h3
                        :class="[lowerCaseText ? 'capitalize font-light' : 'uppercase font-bold']"
                        class="text-neutral text-xl mt-1"
                        aria-label="Casino bets"
                    >
                        {{ title }}
                        <!-- Display title -->
                    </h3>
                </div>
                <div
                    v-if="decorationBar"
                    class="h-1 w-full rounded-full"
                    :class="styleVersion === 1 ? 'bg-accent-content' : 'bg-accent'"
                ></div>
                <!-- Decoration bar -->
            </div>
            <!-- Placeholder for the top events carousel widget -->
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
        <div class="w-11/12 z-50 max-w-[1300px]">
            <!-- Header section with icon and title -->
            <div class="in relative flex justify-between items-center mt-9">
                <div class="w-auto h-auto flex flex-col">
                    <div class="w-auto h-auto py-1 flex gap-3">
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
                            :class="textStyle == 2 ? 'text-primary-content' : 'text-neutral'"
                            aria-label="Casino bets"
                        >
                            {{ $t(title != undefined ? title : 'TOP APUESTAS DEPORTIVAS') }}
                        </h3>
                    </div>
                    <!-- Underline for the title -->
                    <div
                        class="h-1 w-full rounded-full"
                        :class="textStyle == 2 ? 'bg-primary-content' : 'bg-accent'"
                    ></div>
                </div>
            </div>
            <!-- Container for the main content area -->
            <div
                class="py-2 flex justify-center items-center"
                :class="
                    config.layout != undefined && config.layout == 4
                        ? ''
                        : config.layout != undefined && config.layout == 5
                        ? 'my-3'
                        : 'bg-transparent'
                "
            >
                <article
                    :class="[config.layout != undefined && config.layout == 5 ? ' ' : 'w-11/12']"
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
import { useSportBookStore } from '@/stores/sportbook'; // Importing the sports book store
import { useCookies } from 'vue3-cookies';
import { watch } from 'vue'; // Importing cookie management

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
    setup() {
        const { cookies } = useCookies(); // Using cookies in the setup function
        return {
            cookies,
        };
    },
    data() {
        // Initializing component data
        let config = this.$config(); // Fetching configuration
        let appComponent = this.$appComponent; // Accessing the application component
        let colors = undefined; // Placeholder for colors
        let sportBookStore = useSportBookStore(); // Accessing the sports book store
        let backgroundOverride = {
            sport: {},
            event: {},
            championship: {},
        }; // Object to override background settings
        let providerSportbook = 'ITN' // Reactive variable for sportsbook provider
        let tokensWidget = {}
        return {
            config,
            appComponent,
            sportBookStore,
            colors,
            backgroundOverride,
            providerSportbook,
            tokensWidget
        };
    },
    methods: {
        // Method to get the widget and set it up
        getWidget() {
            let count = 1; // Counter for checking widget loading
            let checkInterval = setInterval(() => {
                count++;
                if (window.altenarWSDK !== undefined && count < 1000) {
                    clearInterval(checkInterval); // Stop checking if SDK is loaded
                    window.WTE = window.altenarWSDK.addWidget({
                        widget: 'WTopEventsCarousel', // Widget name
                        props: {
                            scrollerControls: 3, // Number of scroller controls
                            showScorePreview: true, // Show score preview option
                            variants: {
                                OddChangeIndicator: 0, // Variant for odd change indicator
                                BannerEventBoxCompetitors: 0, // Variant for competitors banner
                                BannerEventBox: 4, // Variant for event box
                            },
                            backgroundOverride: this.backgroundOverride, // Background settings
                            onEventSelect: (event) => {
                                // Event handler for event selection
                                this.appComponent.gAnalytics('attemp_bet', event.event.name);
                                let urlRedirect = `/deportes/partido/${event.id}`; // Redirect URL
                                if (event['liveTime']) {
                                    urlRedirect = urlRedirect + '?page=liveEvent'; // Append live event query
                                }
                                this.$router.push(urlRedirect); // Navigate to the event page
                                this.sportBookStore.eventId = event.id; // Store selected event ID
                                try {
                                    window.fSportbookEventDetailCallback(event); // Callback for event details
                                } catch (e) {
                                    console.log(e); // Log errors
                                }
                            },
                            onOddSelect: (odd) => {
                                // Event handler for odd selection
                                this.$router.push(
                                    `/deportes/partido/${odd.eventId}`, // Navigate to the selected odd's event page
                                );
                                this.sportBookStore.eventId = odd.eventId; // Store selected odd's event ID
                            },
                        },
                        tokens: this.tokensWidget, // Pass tokens to the widget
                        container: document.getElementById('WTopEventsCarousel'), // Container for the widget
                    });
                }
            }, 500); // Check every 500ms
        },
        // Method to transform background override arrays to objects if empty
        transformsArray() {
            if (Array.isArray(this.backgroundOverride.sport) && this.backgroundOverride.sport.length === 0) {
                this.backgroundOverride.sport = {}; // Convert to object if empty
            }
            if (Array.isArray(this.backgroundOverride.event) && this.backgroundOverride.event.length === 0) {
                this.backgroundOverride.event = {}; // Convert to object if empty
            }
            if (
                Array.isArray(this.backgroundOverride.championship) &&
                this.backgroundOverride.championship.length === 0
            ) {
                this.backgroundOverride.championship = {}; // Convert to object if empty
            }
        },
    },
    created() {
        // Lifecycle hook for component creation
        if (
            this.appComponent.config.backgroundCardsTopEvents !== undefined &&
            this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country] !== undefined
        ) {
            this.backgroundOverride = this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country]; // Set background override based on country
        }

        if (
            this.appComponent.config.providerSportbook !== undefined &&
            this.appComponent.config.providerSportbook !== null &&
            this.appComponent.config.providerSportbook !== ''
        ) {
            this.providerSportbook = this.appComponent.config.providerSportbook;
        }

        if (
            this.appComponent.providerSportbook !== undefined &&
            this.appComponent.providerSportbook !== null &&
            this.appComponent.providerSportbook !== ''
        ) {
            this.providerSportbook = this.appComponent.providerSportbook;
        }
    },
    mounted() {
        if (this.providerSportbook === 'ITN') {
            // Lifecycle hook for component mounting
            this.transformsArray(); // Transform background arrays
            if (this.config.theme_colors_desktop != undefined && this.config.mobileL == '')
                this.deviceTheme = 'theme_colors_desktop'; // Set device theme for desktop
            else if (this.config.theme_colors_mobile != undefined && this.config.mobileL != '')
                this.deviceTheme = 'theme_colors_mobile'; // Set device theme for mobile
            this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
            if (this.appComponent.config['topEventsTokens'] !== undefined) {
                this.tokensWidget = this.appComponent.config['topEventsTokens']; // Retrieve tokens if available
            }
            const existingScript = document.getElementById('altenarWSDK'); // Check for existing SDK script
            if (!existingScript) {
                const script = document.createElement('script'); // Create new script element
                script.setAttribute('id', 'altenarWSDK'); // Set script ID
                script.setAttribute('type', 'text/javascript'); // Set script type
                script.setAttribute('src', this.appComponent.config.altenar2.src); // Set script source
                document.body.appendChild(script); // Append script to the body
                script.addEventListener('load', () => {
                    this.sportBookStore.loadedAltenarSdk = true; // Mark SDK as loaded
                    try {
                        let integration = ''; // Initialize integration variable
                        let culture = ''; // Initialize culture variable
                        let oddsFormat = 0; // Initialize odds format variable
                        let theme = ''; // Theme variable
                        if (this.cookies.get('lng') !== undefined) {
                            // Determine culture based on cookie language
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
                                            ? this.appComponent.config.altenar2[this.appComponent.country].culture // Use country-specific culture if available
                                            : this.appComponent.config.altenar2.culture
                                                ? this.appComponent.config.altenar2.culture // Fallback to default culture
                                                : 'es-ES'; // Default to Spanish culture
                                    break;
                            }
                        }
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].integration !== undefined
                        ) {
                            integration = this.appComponent.config.altenar2[this.appComponent.country].integration; // Get integration from country-specific config
                        } else if (this.appComponent.config.altenar2.integration !== undefined) {
                            integration = this.appComponent.config.altenar2.integration; // Fallback to default integration
                        }
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].oddsFormat !== undefined
                        ) {
                            oddsFormat = this.appComponent.config.altenar2[this.appComponent.country].oddsFormat; // Get odds format from country-specific config
                        } else if (this.appComponent.config.altenar2.oddsFormat !== undefined) {
                            oddsFormat = this.appComponent.config.altenar2.oddsFormat; // Fallback to default odds format
                        }
                        if (this.appComponent.themeSportbook) {
                            theme = 'light'; // Default theme
                        } else {
                            theme = 'dark'; // Update theme based on app component
                        }
                        watch(
                            () => this.appComponent.themeSportbook,
                            (newValue, oldValue) => {
                                if (newValue === true) {
                                    theme = 'light'; // Update theme based on app component
                                } else {
                                    theme = 'dark'; // Update theme based on app component
                                }
                                window.altenarWSDK.set({
                                    themeName: theme,
                                });
                            },
                        );
                        // Initialize the Altenar SDK with configuration
                        window.altenarWSDK.init({
                            integration: integration,
                            culture: culture,
                            oddsFormat: oddsFormat,
                            token: this.appComponent.tokenSB,
                            themeName: theme,
                        });
                        this.getWidget(); // Call method to get the widget
                    } catch (e) {} // Catch and ignore errors
                    this.sportBookStore.flagSportBook = true; // Set flag indicating sports book is ready
                });
            } else {
                setTimeout(() => {
                    this.getWidget();
                }, 1000);
            }

        }
    },
};
</script>
<style lang=""></style>

<!-- FILE DOCUMENTED -->

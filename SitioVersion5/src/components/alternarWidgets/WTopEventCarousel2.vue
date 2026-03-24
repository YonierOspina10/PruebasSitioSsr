<template>
    <!-- Main section container for the component -->
    <section
        v-if="providerSportbook === 'ITN'"
        class="flex flex-col justify-center items-center w-full bg-transparent"
    >
        <!-- Wrapper for the content with responsive width -->
        <div class="w-11/12 z-50 max-w-[1300px] md:max-w-[1400px]">
            <!-- Header section with icon and title -->
            <div class="in relative flex justify-between items-center mt-9">
                <div class="w-auto h-auto flex">
                    <!-- Conditional rendering of the icon -->
                    <img
                        v-if="icon"
                        :src="icon"
                        alt=""
                        class="w-8 h-8 object-contain"
                    />
                    <div class="w-auto h-auto px-5">
                        <!-- Title of the section -->
                        <h3
                            class="uppercase font-bold text-xl mt-1"
                            :class="textStyle == 2 ? 'text-primary-content' : 'text-success'"
                            aria-label="Casino bets"
                        >
                            {{ $t(title) }}
                        </h3>
                        <!-- Underline for the title -->
                        <div
                            class="h-1 w-full rounded-full"
                            :class="textStyle == 2 ? 'bg-primary-content' : 'bg-success'"
                        ></div>
                    </div>
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
        <!-- Link to view more content -->
        <div class="w-full h-8 flex justify-end z-50 mr-8 mt-2">
            <RouterLink
                :to="url"
                class="w-44 h-auto rounded-full font-bold text-xl text-primary-content border-2 border-primary-content hover:text-neutral-content hover:bg-primary-content text-center"
            >
                {{ $t('VER MÁS') }}
            </RouterLink>
        </div>
    </section>
</template>
<script>
import { useSportBookStore } from '@/stores/sportbook'; // Importing the sport book store
import { useCookies } from 'vue3-cookies';
import { watch } from 'vue'; // Importing cookie handling library

export default {
    props: {
        // Props for the component with default values
        tokens: {
            type: Object,
            default: () => {
                return {};
            },
        },
        title: { type: String, default: 'TOP APUESTAS DEPORTIVAS' },
        keySlide: { type: Number, default: 1000 },
        url: { type: String, default: '' },
        icon: { type: String, default: '' },
        textStyle: { type: Number, default: 1 },
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
        let appComponent = this.$appComponent; // Accessing app component
        let colors = undefined; // Placeholder for colors
        let sportBookStore = useSportBookStore(); // Accessing the sport book store
        let backgroundOverride = {
            sport: {},
            event: {},
        }; // Object to override background settings
        let providerSportbook = 'ITN'; // Reactive variable for sportsbook provider
        return {
            config,
            appComponent,
            sportBookStore,
            colors,
            backgroundOverride,
            providerSportbook,
        };
    },
    methods: {
        // Method to initialize the widget
        getWidget() {
            window.WTE = window.altenarWSDK.addWidget({
                widget: 'WTopEventsCarousel', // Widget type
                props: {
                    scrollerControls: 3, // Number of scroller controls
                    showScorePreview: true, // Option to show score preview
                    variants: {
                        OddChangeIndicator: 0, // Variant settings
                        BannerEventBoxCompetitors: 0,
                        BannerEventBox: 4,
                    },
                    backgroundOverride: this.backgroundOverride, // Background settings
                    onEventSelect: (event) => {
                        // Event handler for event selection
                        this.appComponent.gAnalytics('attemp_bet', event.event.name);
                        this.$router.push(`/deportes/partido/${event.id}`); // Navigate to event page
                        this.sportBookStore.eventId = event.id; // Store selected event ID
                    },
                    onOddSelect: (odd) => {
                        // Event handler for odd selection
                        this.$router.push(`/deportes/partido/${odd.eventId}`); // Navigate to event page
                        this.sportBookStore.eventId = odd.eventId; // Store selected odd event ID
                    },
                },
                tokens: this.tokens, // Tokens for the widget
                container: document.getElementById('WTopEventsCarousel'), // Container for the widget
            });
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
            if (this.config.theme_colors_desktop != undefined && this.config.mobileL == '')
                this.deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
            else if (this.config.theme_colors_mobile != undefined && this.config.mobileL != '')
                this.deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
            this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
            if (document.getElementById('altenarWSDK') === null) {
                // Check if the SDK script is not already loaded
                const script = document.createElement('script');
                script.setAttribute('id', 'altenarWSDK'); // Set script ID
                script.setAttribute('type', 'text/javascript'); // Set script type
                script.setAttribute('src', this.appComponent.config.altenar2.src); // Set script source
                document.body.appendChild(script); // Append script to body
                script.addEventListener('load', () => {
                    // Event listener for script load
                    try {
                        let integration = ''; // Variable for integration settings
                        let culture = ''; // Variable for culture settings
                        let oddsFormat = 0; // Variable for odds format
                        let theme = ''; // Theme variable
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
                                        this.appComponent.config.altenar2[this.appComponent.country].culture !==
                                            undefined
                                            ? this.appComponent.config.altenar2[this.appComponent.country].culture
                                            : this.appComponent.config.altenar2.culture
                                            ? this.appComponent.config.altenar2.culture
                                            : 'es-ES'; // Default culture
                                    break;
                            }
                        }
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].integration !== undefined
                        ) {
                            integration = this.appComponent.config.altenar2[this.appComponent.country].integration; // Set integration from country config
                        } else if (this.appComponent.config.altenar2.integration !== undefined) {
                            integration = this.appComponent.config.altenar2.integration; // Set integration from global config
                        }
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].oddsFormat !== undefined
                        ) {
                            oddsFormat = this.appComponent.config.altenar2[this.appComponent.country].oddsFormat; // Set odds format from country config
                        } else if (this.appComponent.config.altenar2.oddsFormat !== undefined) {
                            oddsFormat = this.appComponent.config.altenar2.oddsFormat; // Set odds format from global config
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
                        // Initialize the Altenar SDK with the settings
                        window.altenarWSDK.init({
                            integration: integration,
                            culture: culture,
                            oddsFormat: oddsFormat,
                            token: this.appComponent.tokenSB,
                            themeName: theme,
                        });
                        this.getWidget(); // Call method to get the widget
                    } catch (e) {}
                    this.sportBookStore.flagSportBook = true; // Set flag in the store
                });
            } else {
                // If SDK is already loaded, call getWidget after a delay
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

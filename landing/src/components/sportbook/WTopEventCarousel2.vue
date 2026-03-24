<template>
    <!-- Main section container with flex layout, centered content, and transparent background -->
    <section v-if="providerSportbook === 'ITN'" class="flex flex-col justify-center items-center w-full bg-transparent">
        <!-- Inner container with responsive width and maximum width constraints -->
        <div class="w-11/12 z-50 max-w-[1300px] md:max-w-[1400px]">
            <!-- Header section with relative positioning and margin-top -->
            <div class="in relative flex justify-between items-center mt-9">
                <!-- Container for icon and title -->
                <div class="w-auto h-auto flex">
                    <!-- Conditional rendering of icon image -->
                    <img
                        v-if="icon"
                        :src="icon"
                        alt=""
                        class="w-8 h-8 object-contain"
                    />
                    <!-- Container for title and underline -->
                    <div class="w-auto h-auto px-5">
                        <!-- Title with dynamic class based on textStyle prop -->
                        <h3
                            class="uppercase font-bold text-xl mt-1"
                            :class="textStyle == 2 ? 'text-primary-content' : 'text-success'"
                            aria-label="Casino bets"
                        >
                            {{ $t(title) }}
                        </h3>
                        <!-- Underline with dynamic class based on textStyle prop -->
                        <div
                            class="h-1 w-full rounded-full"
                            :class="textStyle == 2 ? 'bg-primary-content' : 'bg-success'"
                        ></div>
                    </div>
                </div>
            </div>
            <!-- Content section with conditional classes based on config.layout -->
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
                <!-- Article container with conditional width class -->
                <article
                    :class="[config.layout != undefined && config.layout == 5 ? ' ' : 'w-11/12']"
                    class="max-w-[1300px] z-20 flex justify-center items-center"
                >
                    <!-- Placeholder for WTopEventsCarousel widget -->
                    <div id="WTopEventsCarousel"></div>
                </article>
            </div>
        </div>
        <!-- Footer section with link to more content -->
        <div class="w-full h-8 flex justify-end z-50 mr-8 mt-2">
            <!-- RouterLink component for navigation -->
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
import { useCookies } from 'vue3-cookies'; // Importing cookie management

export default {
    props: {
        tokens: {
            // Prop for tokens, default is an empty object
            type: Object,
            default: () => {
                return {};
            },
        },
        title: { type: String, default: 'TOP APUESTAS DEPORTIVAS' }, // Prop for title
        keySlide: { type: Number, default: 1000 }, // Prop for slide key
        url: { type: String, default: '' }, // Prop for URL
        icon: { type: String, default: '' }, // Prop for icon
        textStyle: { type: Number, default: 1 }, // Prop for text style
    },
    setup() {
        const { cookies } = useCookies(); // Using cookies in setup
        return {
            cookies,
        };
    },
    data() {
        let config = this.$config(); // Getting configuration
        let appComponent = this.$appComponent; // Reference to app component
        let colors = undefined; // Variable for colors
        let sportBookStore = useSportBookStore(); // Using sport book store
        let backgroundOverride = {
            // Object for background overrides
            sport: {},
            event: {},
        };
        let providerSportbook = 'ITN' // Reactive variable for sportsbook provider
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
        getWidget() {
            // Method to get the widget
            window.WTE = window.altenarWSDK.addWidget({
                // Adding widget to window
                widget: 'WTopEventsCarousel', // Widget type
                props: {
                    // Widget properties
                    scrollerControls: 3,
                    showScorePreview: true,
                    variants: {
                        OddChangeIndicator: 0,
                        BannerEventBoxCompetitors: 0,
                        BannerEventBox: 4,
                    },
                    backgroundOverride: this.backgroundOverride, // Background override
                    onEventSelect: (event) => {
                        // Event select handler
                        this.appComponent.gAnalytics('attemp_bet', event.event.name); // Analytics tracking
                        this.$router.push(`/deportes/partido/${event.id}`); // Routing to event
                        this.sportBookStore.eventId = event.id; // Setting event ID in store
                    },
                    onOddSelect: (odd) => {
                        // Odd select handler
                        this.$router.push(`/deportes/partido/${odd.eventId}`); // Routing to odd event
                        this.sportBookStore.eventId = odd.eventId; // Setting event ID in store
                    },
                },
                tokens: this.tokens, // Passing tokens
                container: document.getElementById('WTopEventsCarousel'), // Container for widget
            });
        },
    },
    created() {
        if (
            // Checking for background configuration
            this.appComponent.config.backgroundCardsTopEvents !== undefined &&
            this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country] !== undefined
        ) {
            this.backgroundOverride = this.appComponent.config.backgroundCardsTopEvents[this.appComponent.country]; // Setting background override
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
            if (
                // Determining device theme
                this.config.theme_colors_desktop != undefined &&
                this.config.mobileL == ''
            )
                this.deviceTheme = 'theme_colors_desktop'; // Setting desktop theme
            else if (this.config.theme_colors_mobile != undefined && this.config.mobileL != '')
                this.deviceTheme = 'theme_colors_mobile'; // Setting mobile theme
            this.colors = this.config[this.deviceTheme]; // Assigning colors based on theme
            if (document.getElementById('altenarWSDK') === null) {
                // Checking if SDK script is loaded
                const script = document.createElement('script'); // Creating script element
                script.setAttribute('id', 'altenarWSDK'); // Setting script ID
                script.setAttribute('type', 'text/javascript'); // Setting script type
                script.setAttribute('src', this.appComponent.config.altenar2.src); // Setting script source
                typeof window.runOnceOnFirstInteraction === "function" && window.runOnceOnFirstInteraction(
                    () => {
                        setTimeout(() => {
                            console.log("[Altenar SDK] Loading script after first interaction");
                            document.body.appendChild(script); // Append script to the body
                        }, 1000);
                    },
                )
                script.addEventListener('load', () => {
                    // Adding load event listener
                    try {
                        let integration = ''; // Variable for integration
                        let culture = ''; // Variable for culture
                        let oddsFormat = 0; // Variable for odds format
                        if (this.cookies.get('lng') !== undefined) {
                            // Checking for language cookie
                            switch (
                                this.cookies.get('lng') // Setting culture based on language
                                ) {
                                case 'es':
                                    culture = 'es-ES';
                                    break;
                                case 'en':
                                    culture = 'en-GB';
                                    break;
                                case 'pt':
                                    culture = 'pt-BR';
                                    break;
                                default:
                                    culture =
                                        this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                                        this.appComponent.config.altenar2[this.appComponent.country].culture !== undefined
                                            ? this.appComponent.config.altenar2[this.appComponent.country].culture
                                            : this.appComponent.config.altenar2.culture
                                                ? this.appComponent.config.altenar2.culture
                                                : 'es-ES'; // Default culture
                                    break;
                            }
                        }
                        if (
                            // Setting integration based on configuration
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].integration !== undefined
                        ) {
                            integration = this.appComponent.config.altenar2[this.appComponent.country].integration;
                        } else if (this.appComponent.config.altenar2.integration !== undefined) {
                            integration = this.appComponent.config.altenar2.integration;
                        }
                        if (
                            // Setting odds format based on configuration
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].oddsFormat !== undefined
                        ) {
                            oddsFormat = this.appComponent.config.altenar2[this.appComponent.country].oddsFormat;
                        } else if (this.appComponent.config.altenar2.oddsFormat !== undefined) {
                            oddsFormat = this.appComponent.config.altenar2.oddsFormat;
                        }
                        window.altenarWSDK.init({
                            // Initializing SDK
                            integration: integration,
                            culture: culture,
                            oddsFormat: oddsFormat,
                            token: this.appComponent.tokenSB, // Passing token
                        });
                        this.getWidget(); // Calling getWidget method
                    } catch (e) {
                    } // Catching errors silently
                    this.sportBookStore.flagSportBook = true; // Setting flag in store
                });
            } else {
                setTimeout(() => {
                    // Delayed call to getWidget if SDK is already loaded
                    this.getWidget();
                }, 1000);
            }
        }
    },
};
</script>
<style lang=""></style>

<!-- FILE DOCUMENTED -->

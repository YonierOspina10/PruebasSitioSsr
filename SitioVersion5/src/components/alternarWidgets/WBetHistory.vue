<template>
    <!-- Main container for the WBetHistory component -->
	<div v-if="providerSportbook === 'ITN'" id="WBetHistory" class="w-full h-full"></div>
</template>

<script>
import { useSportBookStore } from '@/stores/sportbook'; // Importing the sport book store for state management
import { useCookies } from 'vue3-cookies'; // Importing cookie management library
import { watch } from 'vue'; // Importing watch function from Vue for reactive data handling
export default {
    // Vue component setup
    setup() {
        const { cookies } = useCookies(); // Initialize cookies for the component
        return {
            cookies, // Expose cookies to the template
        };
    },
    data() {
        // Component data properties
        let config = this.$config(); // Retrieve configuration settings
        let appComponent = this.$appComponent; // Reference to the application component
        let colors = undefined; // Variable to hold theme colors
        let sportBookStore = useSportBookStore(); // Access the sport book store
        let deviceTheme = 'theme_colors'; // Default device theme
        let tokens = {}; // Object to hold tokens for betting history
        let providerSportbook = 'ITN'; // Reactive variable for sportsbook provider
        return { config, appComponent, colors, sportBookStore, deviceTheme, tokens, providerSportbook }; // Return data properties
    },
    methods: {
        // Method to initialize the betting widget
        getWidget() {
            let count = 1; // Counter for checking SDK availability
            let checkInterval = setInterval(() => {
                count++;
                // Check if the Altenar SDK is loaded
                if (window.altenarWSDK !== undefined && count < 1000) {
                    clearInterval(checkInterval); // Stop checking once SDK is available
                    // Add the betting history widget to the specified container
                    window.WBH = window.altenarWSDK.addWidget({
                        widget: 'WBetHistory',
                        props: {},
                        tokens: this.tokens,
                        container: document.getElementById('WBetHistory'),
                    });
                }
            }, 500); // Check every 500ms
        },
    },
    created() {
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
            // Lifecycle hook called after the component is mounted
            if (this.config.theme_colors_desktop != undefined && this.config.mobileL == '')
                this.deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
            else if (this.config.theme_colors_mobile != undefined && this.config.mobileL != '')
                this.deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
            this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
            if (this.config['betHistoryTokens'] !== undefined) {
                this.tokens = this.config['betHistoryTokens']; // Retrieve tokens if available
            }
            const existingScript = document.getElementById('altenarWSDK'); // Check for existing SDK script
            if (!existingScript) {
                const script = document.createElement('script'); // Create a new script element
                script.setAttribute('id', 'altenarWSDK'); // Set script ID
                script.setAttribute('type', 'text/javascript'); // Set script type
                script.setAttribute('src', this.config.altenar2.src); // Set script source from config
                document.body.appendChild(script); // Append script to the body
                script.addEventListener('load', () => {
                    // Event listener for when the script has loaded
                    try {
                        let integration = ''; // Variable for integration type
                        let culture = ''; // Variable for culture settings
                        let oddsFormat = 0; // Variable for odds format
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
                                    // Fallback to default culture based on app component config
                                    culture =
                                        this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                                        this.appComponent.config.altenar2[this.appComponent.country].culture !== undefined
                                            ? this.appComponent.config.altenar2[this.appComponent.country].culture
                                            : this.appComponent.config.altenar2.culture
                                                ? this.appComponent.config.altenar2.culture
                                                : 'es-ES'; // Default to Spanish
                                    break;
                            }
                        }
                        // Determine integration type based on app component config
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].integration !== undefined
                        ) {
                            integration = this.appComponent.config.altenar2[this.appComponent.country].integration;
                        } else if (this.appComponent.config.altenar2.integration !== undefined) {
                            integration = this.appComponent.config.altenar2.integration;
                        }
                        // Determine odds format based on app component config
                        if (
                            this.appComponent.config.altenar2[this.appComponent.country] !== undefined &&
                            this.appComponent.config.altenar2[this.appComponent.country].oddsFormat !== undefined
                        ) {
                            oddsFormat = this.appComponent.config.altenar2[this.appComponent.country].oddsFormat;
                        } else if (this.appComponent.config.altenar2.oddsFormat !== undefined) {
                            oddsFormat = this.appComponent.config.altenar2.oddsFormat;
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
                        // Initialize the Altenar SDK with the determined settings
                        window.altenarWSDK.init({
                            integration: integration,
                            culture: culture,
                            oddsFormat: oddsFormat,
                            token: this.appComponent.tokenSB,
                            themeName: theme,
                        });

                        setTimeout(() => {
                            this.getWidget(); // Call method to get the widget after a delay
                        }, 500);
                    } catch (e) {
                        // Catch and ignore any errors during SDK initialization
                    }
                    this.sportBookStore.loadedAltenarSdk = true; // Mark SDK as loaded in the store
                });
            } else {
                setTimeout(() => {
                    this.getWidget(); // Call method to get the widget after a delay
                }, 1000);
            }
        }
    },
};
</script>

<style scoped>
/* Scoped styles for the WBetHistory component */
</style>

<!-- FILE DOCUMENTED -->

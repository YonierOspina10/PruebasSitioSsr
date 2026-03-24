<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import searchIcon from '@/components/icons/searchIcon.vue';
import MoreProviders from '@/components/icons/MoreProviders.vue';
import ExitIcon from '../icons/ExitIcon.vue';
import { toKebabCase } from '@/utils';
declare var Ticker: any; // Declare a global variable Ticker
export default defineComponent({
    props: {
        typelobby: String, // Prop to receive the type of lobby
    },
    components: { ExitIcon, MoreProviders }, // Register local components
    data: function () {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let config = this.$config(); // Configuration object
        let openSearchv3: boolean = false; // State for search visibility
        let hideInputSearch: any = ''; // State for hiding search input
        let searchCommand = {
            input: '', // Search command input
        };
        let showSearchCommandResults: any = ''; // State for showing search results
        let providersLength: any = ''; // Length of providers
        let providers: any = ''; // List of providers
        let optionsGames: any = ''; // Options for games
        let partnerG: any = ''; // Partner ID
        let urlVirtualplay: any = ''; // URL for virtual play
        let limit: any = ''; // Limit for games
        let flag: boolean = true; // Flag for state management
        let limitConfig: any = ''; // Configuration for limit
        let providerId = ''; // Selected provider ID
        let limitBefore: any = ''; // Previous limit
        let preloaderShow: boolean = false; // State for showing preloader
        let openLink: boolean = true; // State for link visibility
        let onOthers: boolean = false; // State for showing other providers
        let providerSelected: string = ''; // Selected provider name

        const analyticsAttrs = {};
        
        return {
            appComponent,
            config,
            openSearchv3,
            hideInputSearch,
            searchCommand,
            showSearchCommandResults,
            providersLength,
            providers,
            optionsGames,
            partnerG,
            urlVirtualplay,
            limit,
            limitConfig,
            flag,
            providerId,
            limitBefore,
            preloaderShow,
            openLink,
            onOthers,
            providerSelected,
            analyticsAttrs
        };
    },
    mounted() {
        this.config = this.config; // Assign config to this.config
        this.limitConfig = this.config.casino.limit; // Set limit configuration
        this.urlVirtualplay = this.config.urlVirtualplay; // Set URL for virtual play
        this.partnerG = this.appComponent.partnerG; // Set partner ID
        this.appComponent.selections.provider = ''; // Reset selected provider
        this.$nextTick(() => {
            if (this.config.layout != undefined && this.config.layout != 4 && this.config.layout != 5) {
                let isDown = false; // Flag for mouse down state
                let startX; // Starting X position for dragging
                let scrollLeft; // Initial scroll position
                const slider: any = document.querySelector('.slider-casino'); // Reference to the slider element
                const end = () => {
                    isDown = false; // Reset mouse down flag
                    slider.classList.remove('active'); // Remove active class
                };
                const start = (e) => {
                    isDown = true; // Set mouse down flag
                    slider.classList.add('active'); // Add active class
                    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get starting X position
                    scrollLeft = slider.scrollLeft; // Store initial scroll position
                };
                const move = (e) => {
                    this.openLink = true; // Allow link opening
                    if (!isDown) return; // Exit if not dragging
                    this.openLink = false; // Prevent link opening while dragging
                    e.preventDefault(); // Prevent default behavior
                    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
                    const dist = x - startX; // Calculate distance moved
                    slider.scrollLeft = scrollLeft - dist; // Update scroll position
                };
                (() => {
                    // Add event listeners for mouse and touch events
                    slider.addEventListener('mousedown', start);
                    slider.addEventListener('touchstart', start, { passive: true });
                    slider.addEventListener('mousemove', move);
                    slider.addEventListener('touchmove', move, { passive: true });
                    slider.addEventListener('mouseleave', end);
                    slider.addEventListener('mouseup', end);
                    slider.addEventListener('touchend', end);
                })();
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
            }
        });
        this.getProviders(); // Fetch providers on mount
    },
    methods: {
        OpenSearchV3() {
            this.openSearchv3 = true; // Open search
        },
        CloseSearchV3() {
            this.openSearchv3 = false; // Close search
        },
        selectProvider(name: any, img: any, name2: any) {
            var vthis = this; // Reference to the Vue instance
            this.flag = true; // Set flag to true
            this.appComponent.selections.category = undefined; // Reset category selection
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'block'; // Show preload game elements
            });
            Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
            });
            this.appComponent.gamesList = []; // Reset games list
            this.appComponent.selections.provider = name; // Set selected provider
            if (name2 != '') {
                this.appComponent.selections.provider = name2; // Override provider if name2 is provided
            }
            this.optionsGames = {
                action: 'getGames2', // Action for fetching games
                partner_id: this.appComponent.partnerG, // Partner ID
                provider: name, // Selected provider
                typelobby: this.typelobby, // Type of lobby
                offset: 0, // Offset for pagination
                limit: vthis.limitConfig, // Limit for games
                country: this.appComponent.country, // User's country
            };
            if (this.appComponent.mobile == '1') {
                this.optionsGames.isMobile = true; // Set mobile flag
            } else {
                this.optionsGames.isMobile = false; // Reset mobile flag
            }
            if (name != '') {
                this.optionsGames.provider = name; // Set provider in options
                this.providerId = name; // Set provider ID
            }
            if (this.$route.path.indexOf('new-casino') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/new-casino/proveedor/' + name); // Update URL for new casino
                } else {
                    window.history.pushState('', '', '/new-casino'); // Update URL for new casino without provider
                }
            } else if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                if (name != '') {
                    window.history.pushState('', '', '/virtuales-lobby/proveedor/' + name); // Update URL for virtual lobby
                } else {
                    window.history.pushState('', '', '/virtuales-lobby'); // Update URL for virtual lobby without provider
                }
            } else {
                window.history.pushState('', '', '/live-casino-vivo/proveedor/' + name); // Update URL for live casino
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', this.optionsGames), // Fetch games from API
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        vthis.appComponent.gamesList = []; // Reset games list on timeout
                        vthis.appComponent.total_count = 0; // Reset total count
                        vthis.appComponent.offset = 0; // Reset offset
                        vthis.limit = vthis.limitConfig; // Reset limit
                    } else {
                        var json = response.data; // Parse response data
                        vthis.appComponent.gamesList = json.games; // Set games list
                        vthis.appComponent.total_count = json.total_count; // Set total count
                        vthis.appComponent.offset = vthis.appComponent.gamesList.length; // Update offset
                        vthis.limit = vthis.appComponent.gamesList.length + vthis.limitConfig; // Update limit
                        vthis.noMoreGames(); // Check for no more games
                        Array.prototype.forEach.call(
                            document.getElementsByClassName('preload-game-top'),
                            function (el, i) {
                                (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display =
                                    'none'; // Hide preload game elements
                            },
                        );
                        if (vthis.appComponent.offset >= parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = false; // Hide load more button if all games are loaded
                        }
                        if (vthis.appComponent.offset < parseInt(vthis.appComponent.total_count)) {
                            this.appComponent.showLoadMoreButton = true; // Show load more button if more games are available
                        }
                        if (
                            vthis.config.casino != undefined &&
                            vthis.config.casino.playtechJackpot != undefined &&
                            vthis.config.casino.playtechJackpot[vthis.appComponent.country] != undefined
                        ) {
                            if (
                                vthis.config.casino !== undefined &&
                                vthis.config.casino.playtechJackpot !== undefined &&
                                vthis.config.casino.playtechJackpot[vthis.appComponent.country] !== undefined
                            ) {
                                setTimeout(() => {
                                    vthis.appComponent.gamesList.forEach((game) => {
                                        if (
                                            game.provider == 'PLAYTECH' &&
                                            game.jackpot != undefined &&
                                            game.jackpot == 1
                                        ) {
                                            var objParams =
                                                vthis.config.casino.playtechJackpot[vthis.appComponent.country]; // Get jackpot parameters
                                            objParams.game = game.front_game_id; // Set game ID for jackpot
                                            var ticker = new Ticker(objParams); // Create a new Ticker instance
                                            ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to game element
                                            ticker.SetCurrencyPos('1'); // Set currency position
                                            ticker.tick(); // Start ticker
                                        }
                                    });
                                }, 500);
                            }
                        }
                    }
                })
                .catch((error) => {
                    vthis.appComponent.gamesList = []; // Reset games list on error
                    vthis.appComponent.total_count = 0; // Reset total count
                    vthis.appComponent.offset = 0; // Reset offset
                    vthis.limit = vthis.limitConfig; // Reset limit
                });
            vthis.appComponent.showMore = true; // Show more option
        },
        selectionsProviderFilter(filter: any) {
            try {
                return this.providers.filter((provider) => {
                    return provider.name == filter || provider.title == filter; // Filter providers by name or title
                })[0].title; // Return the title of the first matching provider
            } catch (e) {}
        },
        openProviders2() {
            const otherButton: any = document.querySelector('#menuProviders'); // Reference to the providers menu button
            otherButton.classList.toggle('ver-drop'); // Toggle visibility of the providers menu
        },
        noMoreGames() {
            var vthis = this; // Reference to the Vue instance
            if (vthis.appComponent.gamesList.length <= 0) {
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-top'), function (el, i) {
                    (document.getElementsByClassName('preload-game-top')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
                Array.prototype.forEach.call(document.getElementsByClassName('preload-game-bottom'), function (el, i) {
                    (document.getElementsByClassName('preload-game-bottom')[i] as HTMLElement).style.display = 'none'; // Hide preload game elements
                });
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function (el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'block'; // Show no games text
                    },
                );
            } else {
                Array.prototype.forEach.call(
                    document.getElementsByClassName('new-casino-no-games-text'),
                    function (el, i) {
                        (document.getElementsByClassName('new-casino-no-games-text')[i] as HTMLElement).style.display =
                            'none'; // Hide no games text
                    },
                );
            }
        },
        getPreloaderLoadmore() {
        },
        getProviders() {
            var options = {
                action: 'getOptions', // Action for fetching provider options
                partner_id: this.partnerG, // Partner ID
                country: this.appComponent.country, // User's country
                typelobby: this.typelobby, // Type of lobby
            };
            if (this.appComponent.session.logueado) {
                options['testUser'] = this.appComponent.session.user_test == 1 ? true : false; // Set test user option if logged in
            }
            Promise.race([
                apiService.requestGet(this.urlVirtualplay + '/cms/products/games/', options), // Fetch providers from API
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 60000, 'timeout'); // Timeout after 60 seconds
                }),
            ])
                .then((response: any) => {
                    if (response == 'timeout') {
                        this.providers = []; // Reset providers on timeout
                        this.providersLength = 0; // Reset providers length
                    } else {
                        var json = response.data; // Parse response data
                        this.providers = json.providers; // Set providers list
                        this.providersLength = json.providers.length; // Set providers length
                        if (this.appComponent.offset >= this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = false; // Hide load more button if all providers are loaded
                        }
                        if (this.appComponent.offset < this.appComponent.total_count) {
                            this.appComponent.showLoadMoreButton = true; // Show load more button if more providers are available
                        }
                    }
                })
                .catch((error) => {
                    this.providers = []; // Reset providers on error
                    this.providersLength = 0; // Reset providers length
                });

            this.analyticsAttrs = {
                filterAll: {
                    'data-analytics-label': `casino:provider-filter:all`,
                    'data-analytics-context': `component:MenuProviders4|layout:${this.appComponent.config.layout}`
                },
                viewAll: {
                    'data-analytics-label': `casino:provider-filter:more`,
                    'data-analytics-context': `component:MenuProviders4|layout:${this.appComponent.config.layout}`
                },
                arrowPrev: {
                    'data-analytics-label': `casino:carousel:providers:arrow-prev`,
                    'data-analytics-context': `component:MenuProviders4|layout:${this.appComponent.config.layout}`
                },
                arrowNext: {
                    'data-analytics-label': `casino:carousel:providers:arrow-next`,
                    'data-analytics-context': `component:MenuProviders4|layout:${this.appComponent.config.layout}`
                },
                provider: (provider) => ({
                    'data-analytics-label': `casino:provider-filter:${toKebabCase(provider.name)}`,
                    'data-analytics-position': `${this.providers.findIndex((g) => g.name === provider.name) + 1}`,
                    'data-analytics-context': `component:MenuProviders4|layout:${this.appComponent.config.layout}`
                })
            };
        },
    },
});
</script>
<template>
    <section class="flex justify-center items-center w-full px-4 my-5 gap-x-2">
        <!-- Main section for provider selection -->
        <div
            class="flex w-auto max-w-[1300px] justify-start xl:justify-center items-center gap-x-3 lg:gap-x-5 overflow-x-auto"
        >
            <!-- Container for provider buttons -->
            <button
                v-if="providersLength > 0"
                @click="
                    selectProvider('', '', '');
                    appComponent.gAnalytics('game_type', 'Todos los proveedores');
                    onOthers = false;
                "
                :class="
                    appComponent.selections.provider == '' && !onOthers
                        ? 'text-neutral bg-primary-content shadow-neutral-content/50 shadow-[inset_0px_-5px_0px] border-neutral'
                        : 'bg-neutral text-neutral-content border-transparent'
                "
                class="transition-all ease-in-out duration-500 border-solid border-b-1 rounded-full font-poppinssb capitalize text-lg block px-3 py-2 overflow-hidden shrink-0 hover:bg-primary-content hover:text-neutral"
                v-bind="analyticsAttrs.filterAll"
            >
                {{ $t('Todos') }} <!-- Button for selecting all providers -->
            </button>
            <button
                v-for="provider in providers.slice(0, appComponent.mobile ? 2 : 8)"
                @click="
                    selectProvider(provider.name, provider.image, provider.title);
                    appComponent.gAnalytics('supplier', provider.title);
                    onOthers = false;
                "
                v-show="!appComponent.selections.provider === provider.title"
                :class="
                    appComponent.selections.provider.toLowerCase() === provider.title.toLowerCase() && !onOthers
                        ? 'text-neutral bg-primary-content shadow-neutral-content/50 shadow-[inset_0px_-5px_0px] border-neutral'
                        : 'bg-neutral text-neutral-content border-transparent'
                "
                class="transition-all ease-in-out duration-500 border-solid border-b-1 rounded-full font-poppinssb capitalize text-lg block px-3 py-2 overflow-hidden shrink-0 hover:bg-primary-content hover:text-neutral"
                v-bind="analyticsAttrs.provider(provider)"
            >
                {{ $t(provider.title) }} <!-- Button for selecting individual providers -->
            </button>
        </div>
        <button
            v-if="providers.length > parseInt(appComponent.mobile ? '3' : '8')"
            @click="onOthers = !onOthers"
            class="rounded-full font-poppinssb capitalize text-lg px-3 py-2 relative hover:bg-primary-content hover:text-neutral transition-all ease-in-out duration-500"
            :class="
                onOthers
                    ? 'shadow-neutral-content/50 shadow-[inset_0px_-5px_0px] border-solid border-b-1 border-neutral bg-primary-content text-neutral'
                    : 'bg-neutral text-neutral-content'
            "
            v-bind="analyticsAttrs.viewAll"
        >
            {{ $t('Otros') }} <!-- Button to show more providers -->
            <div
                v-if="providers.length > appComponent.mobile ? 3 : 8"
                class="relative z-[60]"
            >
                <div class="absolute top-0 right-2 text-center rounded-2xl flex justify-around items-start mt-3">
                    <div
                        v-if="onOthers"
                        class="slider-casino z-50 overflow-y-auto bg-secondary shadow-2xl h-96 w-64 rounded-b-2xl rounded-tl-2xl text-neutral-content text-lg ml-1 border-4 border-solid border-secondary-content"
                    >
                        <ul class="p-1 grid gap-1">
                            <li
                                v-for="provider in providers.slice(appComponent.mobile ? 2 : 8)"
                                class="providerLi w-full h-10 cursor-pointer flex justify-start items-center gap-2 px-2 rounded-full"
                                :class="
                                    providerSelected == provider.name
                                        ? 'bg-primary-content rounded-full'
                                        : 'bg-neutral '
                                "
                                @click="
                                    selectProvider(provider.name, provider.image, provider.title);
                                    appComponent.gAnalytics('game_type', provider.title);
                                    onOthers = false;
                                "
                                v-bind="analyticsAttrs.provider(provider)"
                            >
                                <div class="w-2 h-2 bg-neutral-focus rounded-full"></div>
                                <span
                                    tabindex="0"
                                    class="capitalize text-base text-neutral-content font-bold"
                                    >{{ $t(provider.title) }}</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </button>
    </section>
</template>
<style scoped>
.slider-casino::-webkit-scrollbar {
    display: none; /* Hide scrollbar for the slider */
}
.providerLi:hover > div:nth-child(1) {
    width: 2rem !important; /* Increase width of the indicator on hover */
    transition: 0.5s ease-in-out !important; /* Smooth transition for hover effect */
}
</style>

<!-- FILE DOCUMENTED -->

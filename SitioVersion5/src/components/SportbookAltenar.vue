<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getBetSlipCustomMsg } from '@/utils/configHome.js';
declare var AltenarSportsbook: any;

/**
 * Vue component definition for the betting interface.
 */
export default defineComponent({
    props: {
        /** Fixed page identifier */
        pageFixed: String,
    },
    data: function () {
        let config = this.$config(); // Configuration object
        let appComponent: any = this.$appComponent; // Application component reference
        let loadingM = true; // Loading state
        let emitter = this.$emitter(); // Event emitter
        return {
            config,
            appComponent,
            loadingM,
            emitter,
        };
    },
    setup() {
        const route = useRoute(); // Access the current route
        let PartidoId: any = ref(route.params.PartidoId); // Match ID from route parameters
        let LigaId: any = ref(route.params.LigaId); // League ID from route parameters
        let DeporteId: any = ref(route.params.DeporteId); // Sport ID from route parameters
        let PaisId: any = ref(route.params.PaisId); // Country ID from route parameters
        let socialshare: any = ref(route.params.socialshare); // Social share parameter from route
        return {
            PartidoId,
            LigaId,
            DeporteId,
            PaisId,
            socialshare,
        };
    },
    unmounted() {},
    mounted() {
        // Load BIA if version is not '2'
        if (this.appComponent.config.versionAltenar != '2') {
            this.emitter.on('loadBiaReload', () => {
                this.loadBia(); // Reload BIA on event
            });
        }
        this.loadBia(); // Initial load of BIA
    },
    methods: {
        /**
         * Loads the BIA betting interface.
         */
        loadBia() {
            console.log('loadBia2'); // Debug log
            // Clear the BIA client container if it exists
            if (document.getElementById('BIA_client_container') != undefined) {
                (document.getElementById('BIA_client_container') as any).innerHTML = '';
            }
            var lng = this.appComponent.lngProd; // Get the language from app component
            // Set language based on app component's language
            if (lng == 'en') {
                lng = 'en';
            } else if (lng == 'pt') {
                lng = 'PT-BR';
            } else {
                lng = 'es-ES';
            }
            var mobile = false; // Mobile flag
            if (this.appComponent.mobile == '1') {
                mobile = true; // Set mobile flag if applicable
            }
            var options: any = {
                token: this.appComponent.tokenSB, // Token for the sportsbook
                skinid: this.appComponent.skinIdITN, // Skin ID for the interface
                walletcode: this.appComponent.walletCodeITN, // Wallet code
                full: true, // Full interface flag
                page: this.pageFixed, // Fixed page identifier
                lang: lng, // Language setting
                fixed: false, // Fixed layout flag
                mobile: mobile, // Mobile flag
                isHashMode: false, // Hash mode flag
                isHashClassesMode: false, // Hash classes mode flag
                banners: {}, // Banners configuration
                eventid: '', // Event ID
                champids: '', // Championship IDs
                sportids: '', // Sport IDs
                catids: '', // Category IDs
                hashchangecallback: null, // Callback for hash change
                statechangecallback: null, // Callback for state change
                loadcallback: null, // Callback for load completion
                placebetcallback: null, // Callback for placing bets
                betSlipCustomMessage: getBetSlipCustomMsg(this.appComponent), // Custom message for bet slip
            };
            // Configure banners based on conditions
            options.banners = {
                bottomRight: {
                    url: this.config.urlSkin + 'banner-right',
                    link: '#',
                    height: '800px',
                },
                bottomLeft: {
                    url: this.config.urlSkin + 'banner-left',
                    link: '#',
                    height: '800px',
                },
                aboveHighlights: {
                    url: this.config.urlSkin + 'banner-topcenter',
                    link: '#',
                    height: this.appComponent.mobile == '' ? '' : '',
                },
            };
            // Adjust banners if token is empty
            if (this.appComponent.tokenSB == '') {
                options.banners = {
                    bottomRight: {
                        url: this.config.urlSkin + 'banner-rightnl',
                        link: '#',
                        height: '800px',
                    },
                    bottomLeft: {
                        url: this.config.urlSkin + 'banner-leftnl',
                        link: '#',
                        height: '800px',
                    },
                    aboveHighlights: {
                        url: this.config.urlSkin + 'banner-topcenternl',
                        link: '#',
                        height: this.appComponent.mobile == '' ? '' : '',
                    },
                };
            }
            // Further banner configurations based on partner and token conditions
            if (
                this.appComponent.tokenSB != '' &&
                this.appComponent.tokenSB != undefined &&
                (this.appComponent.partner == '0' ||
                    this.appComponent.partner == '8' ||
                    this.appComponent.partner == '14' ||
                    this.appComponent.partner == '13')
            ) {
                options.banners = {
                    bottomRight: {
                        url: this.config.urlSkin + 'banner-right',
                        link: '#',
                        height: '800px',
                    },
                    bottomLeft: {
                        url: this.config.urlSkin + 'banner-left',
                        link: '#',
                        height: '800px',
                    },
                    aboveHighlights: {
                        url: this.config.urlSkin + 'banner-topcenter',
                        link: '#',
                        height: this.appComponent.mobile == '' ? '' : '',
                    },
                };
            }
            if (
                this.appComponent.tokenSB != '' &&
                this.appComponent.tokenSB != undefined &&
                (this.appComponent.partner == '0' ||
                    this.appComponent.partner == '8' ||
                    this.appComponent.partner == '14') &&
                this.appComponent.mobile == '1'
            ) {
                options.banners = {
                    bottomRight: {
                        url: this.config.urlSkin + 'banner-right',
                        link: '#',
                        height: '800px',
                    },
                    bottomLeft: {
                        url: this.config.urlSkin + 'banner-left',
                        link: '#',
                        height: '800px',
                    },
                    aboveHighlights: {
                        url: this.config.urlSkin + 'banner-topcenter',
                        link: '#',
                    },
                };
            }
            if (
                (this.appComponent.tokenSB == '' || this.appComponent.tokenSB == undefined) &&
                (this.appComponent.partner == '0' ||
                    this.appComponent.partner == '8' ||
                    this.appComponent.partner == '14')
            ) {
                options.banners = {
                    bottomRight: {
                        url: this.config.urlSkin + 'banner-rightnl',
                        link: '#',
                        height: '800px',
                    },
                    bottomLeft: {
                        url: this.config.urlSkin + 'banner-leftnl',
                        link: '#',
                        height: '800px',
                    },
                    aboveHighlights: {
                        url: this.config.urlSkin + 'banner-topcenternl',
                        link: '#',
                        height: this.appComponent.mobile == '' ? '' : '',
                    },
                };
            }
            if (
                (this.appComponent.tokenSB == '' || this.appComponent.tokenSB == undefined) &&
                (this.appComponent.partner == '0' ||
                    this.appComponent.partner == '8' ||
                    this.appComponent.partner == '14') &&
                this.appComponent.mobile == '1'
            ) {
                options.banners = {
                    bottomRight: {
                        url: this.config.urlSkin + 'banner-rightnl',
                        link: '#',
                        height: '800px',
                    },
                    bottomLeft: {
                        url: this.config.urlSkin + 'banner-leftnl',
                        link: '#',
                        height: '800px',
                    },
                    aboveHighlights: {
                        url: this.config.urlSkin + 'banner-topcenternl',
                        link: '#',
                    },
                };
            }
            // Set event, championship, sport, and category IDs if defined
            if (this.PartidoId != undefined) {
                options.eventid = this.PartidoId;
                options.page = '';
            }
            if (this.LigaId != undefined) {
                options.champids = this.LigaId;
                options.page = '';
            }
            if (this.DeporteId != undefined) {
                options.sportids = this.DeporteId;
                options.page = '';
            }
            if (this.PaisId != undefined) {
                options.catids = this.PaisId;
                options.page = '';
            }
            let queryString = window.location.search; // Get query string from URL
            let urlParams = new URLSearchParams(queryString); // Parse query string
            if (urlParams.has('socialshare')) {
                options.betReservationCode = urlParams.get('socialshare'); // Get social share code if present
            }
            var vthis = this; // Preserve context for callbacks
            // Callback for hash changes
            options.hashchangecallback = function (_hash) {
                if (_hash === '/casino') {
                    window.location.href = '/new-casino'; // Redirect on specific hash
                }
            };
            // Callback for placing bets
            options.placebetcallback = function (object) {
                try {
                    if (vthis.appComponent.config.allowShareBet == true) {
                        vthis.appComponent.sharing = {
                            url: window.location.origin + '/deportes?socialshare=' + object[0].betId,
                            title: 'Mira la apuesta que hice',
                            description:
                                '¡Mira los partidos en mi ticket de apuestas en ' +
                                window.location.hostname +
                                ' y haz las mismas con un solo toque.',
                            quote: '',
                            hashtags: '',
                            twitterUser: '',
                        };
                        setTimeout(() => {
                            vthis.appComponent.sharing = {
                                url: '',
                                title: '',
                                description: '',
                                quote: '',
                                hashtags: '',
                                twitterUser: '',
                            };
                        }, 10000); // Clear sharing data after 10 seconds
                    }
                    (window as any).fPlaceBetSuccess(object, vthis.appComponent.session.moneda); // Success callback
                } catch (e) {}
            };
            // Callback for state changes
            options.statechangecallback = function (object) {
                try {
                    (window as any).fSportbookStateChange(object); // Handle state change
                } catch (e) {}
                if (vthis.appComponent.mobile == '1') {
                    const scroll: any = document.getElementById('main-layout');
                    scroll?.scrollTo(0, 0); // Scroll to top on mobile
                }
            };
            // Callback for additional event details
            options.geteventdetailsadditionalinfocallback = function (object) {
                try {
                    (window as any).fSportbookEventDetailCallback(object); // Handle event detail callback
                } catch (e) {}
            };
            // Callback for load completion
            options.loadcallback = function (object) {
                vthis.loadingM = false; // Set loading state to false
            };
            // Load BIA based on version
            if (this.config.versionAltenar == '2') {
                options.token = this.appComponent.tokenSB; // Set token for version 2
                try {
                    (window as any).altenarWSDK.set({ token: this.appComponent.tokenSB }); // Set SDK token
                } catch (e) {}
                setTimeout(() => {
                    (window as any).altenarWSDK.addSportsBook({
                        props: {
                            onRouterLoad: () => {
                                vthis.loadingM = false; // Set loading state on router load
                            },
                            onRouteChange: (data) => {
                                if (vthis.appComponent.mobile == '1') {
                                    document.getElementById('main-layout')?.scrollTo(0, 0); // Scroll to top on route change
                                }
                            },
                            onBetPlacement: ({ betIds }) => {
                                try {
                                    if (vthis.appComponent.config.allowShareBet == true) {
                                        vthis.appComponent.sharing = {
                                            url: window.location.origin + '/deportes?socialshare=' + betIds[0].betId,
                                            title: 'Mira la apuesta que hice',
                                            description:
                                                '¡Mira los partidos en mi ticket de apuestas en ' +
                                                window.location.hostname +
                                                ' y haz las mismas con un solo toque.',
                                            quote: '',
                                            hashtags: '',
                                            twitterUser: '',
                                        };
                                        setTimeout(() => {
                                            vthis.appComponent.sharing = {
                                                url: '',
                                                title: '',
                                                description: '',
                                                quote: '',
                                                hashtags: '',
                                                twitterUser: '',
                                            };
                                        }, 10000); // Clear sharing data after 10 seconds
                                    }
                                    (window as any).fPlaceBetSuccess(betIds, vthis.appComponent.session.moneda); // Success callback
                                } catch (e) {}
                            },
                        },
                        container: document
                            .getElementById('BIA_client_container')
                            ?.appendChild(document.createElement('div')), // Append new div to container
                    });
                }, 1);
            } else {
                setTimeout(() => {
                    var BIA = new AltenarSportsbook('#BIA_client_container', options); // Initialize BIA for other versions
                }, 1);
            }
        },
    },
});
</script>

<template>
    <!-- Main loading screen while BIA is loading -->
    <div
        v-if="loadingM"
        class="flex w-full h-screen items-center shadow-lg bg-white"
    >
        <div class="flex-1"></div>
        <div class="flex flex-col w-12/12">
            <svg
                fill="none"
                class="w-12 h-12 animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fill-rule="evenodd"
                />
            </svg> <!-- Placeholder for SVG content -->
        </div>
        <div class="flex-1"></div>
    </div>
    <!-- Main wrapper for the betting content -->
    <div id="deportes-wrapper">
        <div id="deportes-content">
            <div id="BIA_client_container"></div> <!-- Container for the BIA client -->
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

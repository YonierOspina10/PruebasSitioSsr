<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { useRoute } from 'vue-router'; // Importing useRoute for accessing route parameters
import { ref } from 'vue'; // Importing ref for creating reactive references
declare var AltenarSportsbook: any; // Declaring a global variable for AltenarSportsbook

export default defineComponent({
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let loadingM = true; // State variable to track loading status
		return {
			config,
			appComponent,
			loadingM,
		};
	},
	setup() {
		const route = useRoute(); // Getting the current route
		let PartidoId: any = ref(route.params.PartidoId); // Reactive reference for PartidoId from route params
		let LigaId: any = ref(route.params.LigaId); // Reactive reference for LigaId from route params
		let DeporteId: any = ref(route.params.DeporteId); // Reactive reference for DeporteId from route params
		let PaisId: any = ref(route.params.PaisId); // Reactive reference for PaisId from route params
		return {
			PartidoId,
			LigaId,
			DeporteId,
			PaisId,
		};
	},
	unmounted() {
		var tags = document.getElementsByTagName('script'); // Getting all script tags in the document
		for (var i = tags.length; i >= 0; i--) {
			// Looping through script tags in reverse order
			if (
				tags[i] &&
				tags[i].getAttribute('src') != null &&
				(tags[i] as any)
					.getAttribute('src')
					.indexOf('https://sb2integration-altenar2.biahosted.com') !=
					-1
			)
				(tags[i].parentNode as any).removeChild(tags[i]); // Removing specific script tags from the document
		}
	},
	mounted() {
		var script = document.createElement('script'); // Creating a new script element
		script.async = false; // Setting script loading to synchronous
		script.src = this.config.altenar; // Setting the source of the script
		document.head.appendChild(script); // Appending the script to the document head
		var vthis = this; // Storing reference to the component instance
		if ((window as any).AltenarSportsbook == undefined) {
			// Checking if AltenarSportsbook is not defined
			setTimeout(() => {
				vthis.loadBia(); // Loading BIA after a delay if not defined
			}, 1000);
		} else {
			this.loadBia(); // Loading BIA immediately if defined
		}
	},
	methods: {
		loadBia() {
			if (document.getElementById('BIA_client_container') != undefined) {
				(
					document.getElementById('BIA_client_container') as any
				).innerHTML = ''; // Clearing the content of the BIA client container
			}
			var lng = this.appComponent.lngProd; // Getting the language from app component
			if (lng == 'en') {
				lng = 'en'; // Setting language to English
			} else if (lng == 'pt') {
				lng = 'PT-BR'; // Setting language to Brazilian Portuguese
			} else {
				lng = 'es-ES'; // Defaulting to Spanish
			}
			var mobile = false; // Initializing mobile flag
			if (this.appComponent.mobile == '1') {
				mobile = true; // Setting mobile flag based on app component
			}
			var options: any = {
				// Defining options for BIA
				token: this.appComponent.tokenSB, // Token for authentication
				skinid: this.appComponent.skinIdITN, // Skin ID for UI customization
				walletcode: this.appComponent.walletCodeITN, // Wallet code for transactions
				full: true, // Full mode enabled
				page: 'vfec', // Initial page setting
				lang: lng, // Language setting
				fixed: false, // Fixed layout option
				mobile: mobile, // Mobile layout option
				isHashMode: false, // Hash mode setting
				isHashClassesMode: false, // Hash classes mode setting
				banners: {}, // Placeholder for banners
				eventid: '', // Event ID placeholder
				champids: '', // Championship IDs placeholder
				sportids: '', // Sport IDs placeholder
				catids: '', // Category IDs placeholder
				hashchangecallback: null, // Callback for hash change
				statechangecallback: null, // Callback for state change
				loadcallback: null, // Callback for load event
				placebetcallback: null, // Callback for placing bets
			};
			options.banners = {
				// Defining banner options
				bottomRight: {
					url: this.config.urlSkin + 'banner-right', // URL for bottom right banner
					link: '#', // Link for bottom right banner
					height: '800px', // Height for bottom right banner
				},
				bottomLeft: {
					url: this.config.urlSkin + 'banner-left', // URL for bottom left banner
					link: '#', // Link for bottom left banner
					height: '800px', // Height for bottom left banner
				},
				aboveHighlights: {
					url: this.config.urlSkin + 'banner-topcenter', // URL for above highlights banner
					link: '#', // Link for above highlights banner
					height: this.appComponent.mobile == '' ? '200vw' : '100vw', // Height based on mobile status
				},
			};
			if (
				this.appComponent.tokenSB != '' &&
				this.appComponent.tokenSB != undefined &&
				(this.appComponent.partner == '0' ||
					this.appComponent.partner == '8' ||
					this.appComponent.partner == '14' ||
					this.appComponent.partner == '13')
			) {
				options.banners = {
					// Re-defining banners based on conditions
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
						height:
							this.appComponent.mobile == '' ? '200vw' : '100vw',
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
					// Adjusting banners for mobile users
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
						height: '100vw',
					},
				};
			}
			if (
				(this.appComponent.tokenSB == '' ||
					this.appComponent.tokenSB == undefined) &&
				(this.appComponent.partner == '0' ||
					this.appComponent.partner == '8' ||
					this.appComponent.partner == '14')
			) {
				options.banners = {
					// Setting banners when no token is available
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
						url: this.config.urlSkin + 'banner-topcenternl',
						link: '#',
						height:
							this.appComponent.mobile == '' ? '200vw' : '100vw',
					},
				};
			}
			if (
				(this.appComponent.tokenSB == '' ||
					this.appComponent.tokenSB == undefined) &&
				(this.appComponent.partner == '0' ||
					this.appComponent.partner == '8' ||
					this.appComponent.partner == '14') &&
				this.appComponent.mobile == '1'
			) {
				options.banners = {
					// Adjusting banners for mobile users without token
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
						url: this.config.urlSkin + 'banner-topcenternl',
						link: '#',
						height: '100vw',
					},
				};
			}
			if (this.PartidoId != undefined) {
				// Setting event ID if PartidoId is defined
				options.eventid = this.PartidoId;
				options.page = '';
			}
			if (this.LigaId != undefined) {
				// Setting championship IDs if LigaId is defined
				options.champids = this.LigaId;
				options.page = '';
			}
			if (this.DeporteId != undefined) {
				// Setting sport IDs if DeporteId is defined
				options.sportids = this.DeporteId;
				options.page = '';
			}
			if (this.PaisId != undefined) {
				// Setting category IDs if PaisId is defined
				options.catids = this.PaisId;
				options.page = '';
			}
			var vthis = this; // Storing reference to the component instance
			options.hashchangecallback = function (_hash) {
				// Callback for hash changes
				if (_hash === '/casino') {
					window.location.href = '/new-casino'; // Redirecting to new casino page
				}
			};
			options.placebetcallback = function (object) {
				// Callback for placing bets
				try {
					(window as any).fPlaceBetSuccess(
						object,
						vthis.appComponent.session.moneda // Handling successful bet placement
					);
				} catch (e) {}
			};
			options.statechangecallback = function (object) {
				// Callback for state changes
				if (vthis.appComponent.mobile == '1') {
					const scroll: any = document.getElementById('main-layout'); // Scrolling to top on mobile
					scroll?.scrollTo(0, 0);
				}
			};
			options.loadcallback = function (object) {
				// Callback for load event
				vthis.loadingM = false; // Updating loading status
			};
			if (this.config.versionAltenar == '2') {
				// Checking for Altenar version
				options = (window as any).optionsAltenarV2; // Using version 2 options
				options.token = this.appComponent.tokenSB; // Setting token for version 2
				var BIA = (window as any).altenarWSDK
					.init(options)(window as any)
					.altenarWSDK.addSportsBook({
						// Initializing BIA with options
						props: {
							onRouterLoad: () => {
								vthis.loadingM = false; // Updating loading status on router load
							},
							onRouteChange: (data) => {
								if (vthis.appComponent.mobile == '1') {
									const scroll: any =
										document.getElementById('main-layout'); // Scrolling to top on route change for mobile
									scroll?.scrollTo(0, 0);
								}
							},
							onBetPlacement: ({ betIds }) => {
								// Handling bet placement
								try {
									(window as any).fPlaceBetSuccess(
										betIds,
										vthis.appComponent.session.moneda // Handling successful bet placement
									);
								} catch (e) {}
							},
						},
						container: (
							document.getElementById(
								'BIA_client_container2'
							) as any
						).appendChild(document.createElement('div')), // Appending BIA client container
					});
			} else {
				var BIA = new AltenarSportsbook( // Initializing AltenarSportsbook for version 1
					'#BIA_client_container',
					options
				);
			}
		},
	},
});
</script>
<template>
	<!-- Main loading screen displayed while loading data -->
	<div
		v-if="loadingM"
		class="flex w-full h-screen items-center shadow-lg bg-white"
	>
		<div class="flex-1"></div>
		<div class="flex flex-col w-12/12">
			<!-- Loading spinner icon -->
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
			</svg>
		</div>
		<div class="flex-1"></div>
	</div>
	<!-- Wrapper for sports content -->
	<div id="deportes-wrapper">
		<!-- Content area for sports -->
		<div id="deportes-content">
			<!-- Container for BIA client -->
			<div id="BIA_client_container"></div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

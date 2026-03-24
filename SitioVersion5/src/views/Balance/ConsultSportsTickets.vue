<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import { useRoute } from 'vue-router'; // Importing useRoute for route management
import { ref } from 'vue'; // Importing ref for reactive references
import WBetHistory from '@/components/alternarWidgets/WBetHistory.vue'; // Importing WBetHistory component
declare var AltenarSportsbook: any; // Declaring a global variable for AltenarSportsbook

export default defineComponent({
	components: { WBetHistory, MenuUser, MenuUser3 }, // Registering components
	data: function () {
		let config = this.$config(); // Getting configuration
		let appComponent: any = this.$appComponent; // Getting application component
		let loadingM = true; // Loading state
		return {
			config,
			appComponent,
			loadingM,
		};
	},
	setup() {
		const route = useRoute(); // Accessing the current route
		let PartidoId: any = ref(route.params.PartidoId); // Reactive reference for PartidoId
		let LigaId: any = ref(route.params.LigaId); // Reactive reference for LigaId
		let DeporteId: any = ref(route.params.DeporteId); // Reactive reference for DeporteId
		let PaisId: any = ref(route.params.PaisId); // Reactive reference for PaisId
		return {
			PartidoId,
			LigaId,
			DeporteId,
			PaisId,
		};
	},
	unmounted() {
		var tags = document.getElementsByTagName('script'); // Getting all script tags
		for (var i = tags.length; i >= 0; i--) {
			if (
				tags[i] &&
				tags[i].getAttribute('src') != null &&
				(tags[i] as any)
					.getAttribute('src')
					.indexOf('https://sb2integration-altenar2.biahosted.com') !=
					-1
			)
				(tags[i].parentNode as any).removeChild(tags[i]); // Removing specific script tags
		}
	},
	mounted() {
		if (this.config.sportBookVersion === undefined) {
			// Checking if sportBookVersion is undefined
			var entryBia = false; // Flag for BIA entry
			var tags = document.getElementsByTagName('script'); // Getting all script tags
			for (var i = tags.length; i >= 0; i--) {
				if (
					tags[i] &&
					tags[i].getAttribute('src') != null &&
					(tags[i] as any)
						.getAttribute('src')
						.indexOf(
							'https://sb2widgetsstatic-altenar2.biahosted'
						) != -1
				)
					entryBia = true; // Setting entryBia to true if a specific script is found
			}
			console.log('loadBia'); // Logging loadBia
			const vthis = this; // Storing context
			if (!entryBia || vthis.config.versionAltenar != '2') {
				// Checking conditions to load script
				var script = document.createElement('script'); // Creating a new script element
				script.async = false; // Setting async to false
				script.src = this.config.altenar; // Setting script source
				script.addEventListener('load', function () {
					// Adding load event listener
					if (vthis.config.versionAltenar == '2') {
						(
							document.getElementById(
								'BIA_client_container4'
							) as any
						).innerHTML = ''; // Clearing container
						var options = (window as any).optionsAltenarV2; // Getting options for Altenar
						var BIA = (window as any).altenarWSDK.init(options); // Initializing Altenar SDK
					}
					vthis.loadBia(); // Calling loadBia method
				});
				document.head.appendChild(script); // Appending script to head
			} else {
				vthis.loadBia(); // Calling loadBia method if conditions are met
			}
		}
	},
	methods: {
		loadBia() {
			if (document.getElementById('BIA_client_container4') != undefined) {
				(
					document.getElementById('BIA_client_container4') as any
				).innerHTML = ''; // Clearing the BIA client container
			}
			var lng = this.appComponent.lngProd; // Getting language from appComponent
			if (lng == 'en') {
				lng = 'en'; // Setting language to English
			} else if (lng == 'pt') {
				lng = 'PT-BR'; // Setting language to Brazilian Portuguese
			} else {
				lng = 'es-ES'; // Defaulting to Spanish
			}
			var mobile = false; // Mobile flag
			if (this.appComponent.mobile == '1') {
				mobile = true; // Setting mobile flag if applicable
			}
			var options: any = {
				// Options for BIA
				token: this.appComponent.tokenSB,
				skinid: this.appComponent.skinIdITN,
				walletcode: this.appComponent.walletCodeITN,
				full: true,
				page: 'mybets',
				lang: lng,
				fixed: false,
				mobile: mobile,
				isHashMode: false,
				isHashClassesMode: false,
				banners: {},
				eventid: '',
				champids: '',
				sportids: '',
				catids: '',
				hashchangecallback: null,
				statechangecallback: null,
				loadcallback: null,
				placebetcallback: null,
			};
			options.banners = {
				// Setting default banners
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
					// Setting banners based on conditions
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
						height: '200vw',
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
					// Setting mobile-specific banners
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
					// Setting banners for unauthenticated users
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
						height: '200vw',
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
					// Setting mobile-specific banners for unauthenticated users
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
			var vthis = this; // Storing context for callbacks
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
						vthis.appComponent.session.moneda
					);
				} catch (e) {}
			};
			options.statechangecallback = function (object) {
				// Callback for state changes
				if (vthis.appComponent.mobile == '1') {
					const scroll: any = document.getElementById('main-layout');
					scroll?.scrollTo(0, 0); // Scrolling to top on mobile
				}
			};
			options.loadcallback = function (object) {
				// Callback for load events
				vthis.loadingM = false; // Setting loading state to false
			};
			if (this.config.versionAltenar == '2') {
				// Checking for Altenar version
				options.token = this.appComponent.tokenSB; // Setting token
				options.page = 'betHistory'; // Setting page to bet history
				options.routerType = 'memory'; // Setting router type
				try {
					(window as any).altenarWSDK.set({
						token: this.appComponent.tokenSB, // Setting token in SDK
					});
				} catch (e) {}
				setTimeout(() => {
					// Delayed execution for SDK setup
					try {
						(window as any).altenarWSDK.set({
							page: 'betHistory',
							routerType: 'memory',
						});
					} catch (e) {}
					(window as any).altenarWSDK.addSportsBook({
						// Adding sports book to SDK
						props: {
							page: 'betHistory',
							routerType: 'memory',
							onRouterLoad: () => {
								vthis.loadingM = false; // Setting loading state to false on load
							},
							onRouteChange: (data) => {
								// Handling route changes
								if (vthis.appComponent.mobile == '1') {
									document
										.getElementById('main-layout')
										?.scrollTo(0, 0); // Scrolling to top on mobile
								}
							},
							onBetPlacement: ({ betIds }) => {
								// Handling bet placement
								try {
									(window as any).fPlaceBetSuccess(
										betIds,
										vthis.appComponent.session.moneda
									);
								} catch (e) {}
							},
						},
						container: document
							.getElementById('BIA_client_container4')
							?.appendChild(document.createElement('div')), // Appending new div to container
					});
				}, 1000); // 1 second delay
			} else {
				var BIA = new AltenarSportsbook( // Initializing AltenarSportsbook
					'#BIA_client_container4',
					options
				);
			}
		},
	},
});
</script>
<template>
	<!-- Header for layout type 3 -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Header for layout type 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta h-full"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Consulta tickets') }}</span
						>
					</span>
				</div>
				<!-- Menu and content area -->
				<div
					class="justify-between itc w-full mx-auto ActivePageTitle2"
					:class="
						config.layout != undefined && config.layout !== 3
							? 'flex'
							: ''
					"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'consulta_tickets_online'"
						:MENU_ID="'5'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'consulta_tickets_online'"
						:MENU_ID="'5'"
					/>
					<!-- Loading and content area -->
					<div
						v-if="config.sportBookVersion === undefined"
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? 'mt-2'
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<!-- Loading spinner -->
						<div
							v-if="loadingM"
							class="flex w-full h-screen items-center shadow-lg"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-300'
									: 'bg-white '
							"
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
								</svg>
							</div>
							<div class="flex-1"></div>
						</div>
						<!-- BIA client container -->
						<div id="deportes-wrapper">
							<div id="deportes-content">
								<div id="BIA_client_container4"></div>
							</div>
						</div>
					</div>
					<!-- Content for specific sport book versions -->
					<div
						v-else-if="
							config.sportBookVersion.type === 2 ||
							config.sportBookVersion.type === 4
						"
						class="BoxContent TermsContentBox HelpContentBox w-auto py-4 md:py-8 bg-base-400"
						:class="
							config.layout != undefined && config.layout == 3
								? 'text-neutral rounded-b-xl px-4 md:px-8 overflow-auto min-h-[400px]'
								: 'md:w-[73%] float-left px-4 md:px-8 text-neutral-content rounded-xl overflow-auto min-h-[400px]'
						"
					>
						<WBetHistory />
						<!-- Betting history component -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
div#deportes-wrapper {
	padding-top: 0px !important; /* Ensuring no padding at the top of deportes-wrapper */
}
</style>

<!-- FILE DOCUMENTED -->

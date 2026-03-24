<script lang="ts">
import AppHeaderMobile2 from '../components/headers/HeaderMobile2.vue'; // Mobile header component
import ApptopBarDownload from '../components/topBarDownload.vue'; // Top bar download component
import AppHeaderDesktopv2 from '../components/headers/HeaderDesktopv2.vue'; // Desktop header component
import Footer3 from '../components/footers/Footer3.vue'; // Footer component
import MenuMobile from '../components/menus/MenuMobile.vue'; // Mobile menu component
import { defineAsyncComponent, defineComponent, ref } from 'vue'; // Vue composition API functions
import Header3 from '@/components/headers/Header3.vue'; // Header component
import Menu3 from '@/components/menus/Menu3.vue'; // Menu component
import Ticker3 from '@/components/Ticker3.vue'; // Ticker component
import { useSportBookStore } from '@/stores/sportbook'; // Store for sports betting
import VideoPlayer from '@/components/VideoPlayer.vue'; // Video player component
import ModalNotificationToast from '@/components/modals/ModalNotificationToast.vue'; // Notification modal component
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Contingency alert component
import MenuMain3 from '@/components/menus/MenuMain3.vue'; // Main menu component
import ContingencyView from '@/views/ContingencyView.vue'; // Contingency view component
import LabelRedirect from '@/components/LabelRedirect.vue'; // Label redirect component
import { useCookies } from 'vue3-cookies'; // Cookie management

export default defineComponent({
	components: {
		ContingencyView, // Registering ContingencyView component
		MenuMain3, // Registering MenuMain3 component
		ContingencyAlert, // Registering ContingencyAlert component
		VideoPlayer, // Registering VideoPlayer component
		AppHeaderMobile2, // Registering mobile header component
		AppHeaderDesktopv2, // Registering desktop header component
		ApptopBarDownload, // Registering top bar download component
		Footer3, // Registering footer component
		MenuMobile, // Registering mobile menu component
		Header3, // Registering Header3 component
		Menu3, // Registering Menu3 component
		Ticker3, // Registering Ticker3 component
		ModalNotificationToast, // Registering notification modal component
		LabelRedirect, // Registering LabelRedirect component
		SliderCasino3Component: defineAsyncComponent(
			// Asynchronously loading CasinoSlider3 component
			() => import('../components/CasinoSlider3.vue')
		),
	},
	setup() {
		const { cookies } = useCookies(); // Using cookies for session management
		return {
			cookies, // Exposing cookies to the template
		};
	},
	methods: {
		clickBox(box: any) {
			// Method to handle box click events
			window.open(box.url, '_top'); // Opens the URL in the top window
		},
	},
	data() {
		let openSelectLang = false; // State for language selection visibility
		let config = this.$config(); // Configuration object
		let zendesk: any = this.$zendesk; // Zendesk integration
		let appComponent: any = this.$appComponent; // Application component state
		let sportBookStore = useSportBookStore(); // Sports book store instance
		let desactiveLabel: boolean = false; // State for label activation
		const components: any = ref([]); // Reactive reference for components
		let banners: any = []; // Array to hold banner data
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // Login state

		// Determine device type based on app component state
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Determine login state
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Fetch banners based on configuration and user state
		if (
			config != undefined &&
			config[device] != undefined &&
			config[device][appComponent.country] != undefined &&
			config[device][appComponent.country][appComponent.lngProd] !=
				undefined &&
			config[device][appComponent.country][appComponent.lngProd][login] !=
				undefined &&
			config[device][appComponent.country][appComponent.lngProd][login][
				'casino'
			] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[device][appComponent.country][appComponent.lngProd][
						login
					]['casino']
				)
			);
		}

		// Populate components based on configuration
		if (
			config != undefined &&
			config['components'] != undefined &&
			config['components'][appComponent.country] != undefined &&
			config['components'][appComponent.country]['layout'] != undefined
		) {
			config['components'][appComponent.country]['layout'].forEach(
				(component: any) => {
					component.banners = banners; // Assign banners to component
					components.value.push(component); // Add component to reactive array
				}
			);
		}
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
			openSelectLang, // Exposing openSelectLang to the template
			components, // Exposing components to the template
			zendesk, // Exposing zendesk to the template
			sportBookStore, // Exposing sportBookStore to the template
			desactiveLabel, // Exposing desactiveLabel to the template
		};
	},
	mounted() {
		setTimeout(() => {
			// Delayed execution for Zendesk integration
			try {
				if (
					this.appComponent.config.zendesk[this.appComponent.country]
						.name !== 'centribal'
				) {
					this.zendesk.zE(
						this.config.zendesk[this.appComponent.country].name,
						'hide'
					);
					this.zendesk.$on('close', () => {
						this.zendesk.zE(
							this.config.zendesk[this.appComponent.country].name,
							'hide'
						);
					});
				}
			} catch (e) {}
		}, 1000);
		if (this.cookies.get('cookies-app') == 'true') {
			this.appComponent.showLabel = false; // Hide label if cookies consent is given
		}
		if (
			(window as any).cordova_iab != undefined &&
			(window as any).apt != undefined &&
			(window as any).versionApp != undefined
		) {
			this.desactiveLabel = true; // Deactivate label if certain conditions are met
		}
	},
	watch: {},
});
</script>
<template>
	<!-- Main container for the application -->
	<div class="w-full ">
		<main
			id="main-layout"
			class="main-layout flex-grow block overflow-x-hidden text-neutral-content bg-base-content"
		>
			<Header3
				v-if="
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					appComponent.viewActual.indexOf('/landing/sorteos') == -1
				"
			/>
			<!-- Conditional rendering of LabelRedirect component -->
			<div
				v-if="
				    !appComponent.infoApp &&
					appComponent.labelRedirect &&
					appComponent.showLabel &&
					!desactiveLabel &&
					appComponent.config.labelRedirect !== undefined &&
					appComponent.config.labelRedirect[appComponent.country] !==
						undefined &&
					appComponent.config.labelRedirect[appComponent.country]
						.system !== undefined &&
					(appComponent.config.labelRedirect[
						appComponent.country
					].system.indexOf(appComponent.platformApp) > -1 ||
						appComponent.config.labelRedirect[appComponent.country]
							.system == 'all')
				"
				class="mt-[58px]"
			>
				<LabelRedirect />
			</div>
			<!-- Placeholder for spacing when LabelRedirect is not shown -->
			<div v-else class="h-[58px]"></div>
			<MenuMain3
				v-if="
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					appComponent.viewActual.indexOf('/landing/sorteos') == -1
				"
			/>
			<Ticker3
				v-if="
				    !appComponent.infoApp &&
					(config.header_ != undefined &&
					config.header_.top_band != undefined
						? config.header_.top_band
						: config.header.showTicker) &&
					appComponent.boxes.length > 0 &&
					appComponent.session.logueado &&
					appComponent.viewActual.indexOf('/landing/sorteos') == -1
				"
			/>
			<ModalNotificationToast
				v-if="
					appComponent.config.header !== undefined &&
					appComponent.config.header.notificationButton !==
						undefined &&
					appComponent.config.header.notificationButton[
						appComponent.country
					] !== undefined &&
					appComponent.config.header.notificationButton[
						appComponent.country
					]
				"
			/>
			<div
				class="main-container ml-0 max-w-screen relative bg-base-content"
				:class="[
					(config.header_ != undefined &&
					config.header_.top_band != undefined
						? config.header_.top_band
						: config.header.showTicker) &&
					appComponent.boxes.length > 0 &&
					appComponent.session.logueado
						? '-mt-[1px]'
						: '',
					appComponent.viewActual.indexOf('/landing/sorteos') == -1
						? 'lg:ml-[68px]'
						: '',
				]"
			>
				<ContingencyAlert
					v-if="appComponent.contingency"
					class="top-[59px] left-0"
				/>
				<ContingencyView
					v-if="
						appComponent.contingency &&
						($route.path.includes('new-casino') ||
							$route.path.includes('casino') ||
							$route.path.includes('registro') ||
							$route.path.includes('lobby') ||
							$route.path.includes('torneos') ||
							$route.path.includes('shop') ||
							$route.path.includes('sorteos') ||
							$route.path.includes('trabaja'))
					"
					class="py-8"
				/>
				<RouterView v-else />
				<!-- Default router view for nested routes -->
			</div>
			<!-- Dynamic component rendering based on route -->
			<div v-for="component in components" :key="component.id">
				<component
					v-if="$route.fullPath == component.path"
					:is="component.id"
					:images="component.banners"
					:shadow="component.shadow"
					:url="component.url"
					:title="component.title"
					:category="component.category"
					:typelobby="component.typelobby"
					:limit="component.limit"
					:top="component.top"
				></component>
			</div>
			<Menu3
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					appComponent.viewActual.indexOf('/landing/sorteos') == -1 &&
					appComponent.appPOS == false
				"
			/>
			<Footer3
                v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					appComponent.appPOS == false
				"
				class="ml-0 md:w-[calc(100% - 68px)]"
				:class="
					appComponent.viewActual.indexOf('/landing/sorteos') == -1
						? 'lg:ml-[68px]'
						: ''
				"
			/>
		</main>
	</div>
</template>
<style scoped>
/* Styles for the main layout and container */
.main-layout,
.main-container {
	margin-top: 0.8px; /* Margin for top spacing */
	border-top: none; /* No top border */
	display: block; /* Block display */
	position: relative; /* Relative positioning */
	background-size: contain !important; /* Background size */
}
</style>

<!-- FILE DOCUMENTED -->

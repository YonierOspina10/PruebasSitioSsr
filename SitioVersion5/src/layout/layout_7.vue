<script lang="ts">
import AppHeaderMobile2 from '../components/headers/HeaderMobile2.vue'; // Import mobile header component
import ApptopBarDownload from '../components/topBarDownload.vue'; // Import top bar download component
import AppHeaderDesktopv2 from '../components/headers/HeaderDesktopv2.vue'; // Import desktop header component
import MenuMobile from '../components/menus/MenuMobile.vue'; // Import mobile menu component
import { defineAsyncComponent, defineComponent, ref } from 'vue'; // Import Vue composition API functions
import Ticker3 from '@/components/Ticker3.vue'; // Import ticker component
import { useSportBookStore } from '@/stores/sportbook'; // Import store for sports betting
import VideoPlayer from '@/components/VideoPlayer.vue'; // Import video player component
import ModalNotificationToast from '@/components/modals/ModalNotificationToast.vue'; // Import notification modal component
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Import contingency alert component
import ContingencyView from '@/views/ContingencyView.vue'; // Import contingency view component
import HeaderDesktopv6 from '@/components/headers/HeaderDesktopv6.vue'; // Import another desktop header component
import MenuMobile7 from '@/components/menus/MenuMobile7.vue'; // Import another mobile menu component
import LabelRedirect from '@/components/LabelRedirect.vue'; // Import label redirect component
import { useCookies } from 'vue3-cookies'; // Import cookies management
import AppFooter from '../components/footers/AppFooter.vue'; // Import footer component
import MenuMobile8 from '@/components/menus/MenuMobile8.vue';
import Menu5 from '@/components/menus/Menu5.vue';

export default defineComponent({
	components: {
		ContingencyView, // Register contingency view component
		ContingencyAlert, // Register contingency alert component
		VideoPlayer, // Register video player component
		AppHeaderMobile2, // Register mobile header component
		AppHeaderDesktopv2, // Register desktop header component
		ApptopBarDownload, // Register top bar download component
		MenuMobile, // Register mobile menu component
		Ticker3, // Register ticker component
		AppFooter, // Register footer component
		ModalNotificationToast, // Register notification modal component
		HeaderDesktopv6, // Register another desktop header component
		MenuMobile7, // Register another mobile menu component
		MenuMobile8, // Register another mobile menu component
		LabelRedirect, // Register label redirect component
		Menu5, // Register another menu component
	},
	methods: {
		/**
		 * Opens a URL in the top window.
		 * @param {any} box - The object containing the URL to open.
		 */
		clickBox(box: any) {
			window.open(box.url, '_top'); // Open the URL in the top window
		},
	},
	data() {
		let openSelectLang = false; // State for language selection visibility
		let config = this.$config(); // Retrieve configuration
		let zendesk: any = this.$zendesk; // Retrieve Zendesk instance
		let appComponent: any = this.$appComponent; // Retrieve application component data
		let sportBookStore = useSportBookStore(); // Access the sports book store
		const components: any = ref([]); // Reactive reference for components
		let banners: any = []; // Array to hold banner data
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // User login state
		let desactiveLabel: boolean = false; // State for label visibility
		let pending = () => {
			console.log('pending..'); // Log pending state
		};
		let fallback = () => {
			console.log('fallback..'); // Log fallback state
		};
		let resolve = () => {
			console.log('resolve..'); // Log resolve state
		};
		// Determine device type based on app component
		if (appComponent.mobile == '') {
			device = 'bannersDesktop'; // Default to desktop banners
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile'; // Set to mobile banners
			}
		}
		// Determine login state
		if (appComponent.session.logueado) {
			login = 'login'; // User is logged in
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin'; // User is not logged in
			}
		}
		// Load banners based on configuration and user state
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
			); // Parse and store casino banners
		}
		// Load components based on configuration
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
			config, // Return configuration
			appComponent, // Return application component data
			openSelectLang, // Return language selection state
			components, // Return components array
			zendesk, // Return Zendesk instance
			sportBookStore, // Return sports book store
			pending, // Return pending function
			fallback, // Return fallback function
			resolve, // Return resolve function
			desactiveLabel, // Return label visibility state
		};
	},
	setup() {
		const { cookies } = useCookies(); // Access cookies
		return {
			cookies, // Return cookies
		};
	},
	mounted() {
		setTimeout(() => {
			try {
				// Hide Zendesk if the name is not 'centribal'
				if (
					this.appComponent.config.zendesk[this.appComponent.country]
						.name !== 'centribal'
				) {
					this.zendesk.zE(
						this.config.zendesk[this.appComponent.country].name,
						'hide'
					); // Hide Zendesk widget
					this.zendesk.$on('close', () => {
						this.zendesk.zE(
							this.config.zendesk[this.appComponent.country].name,
							'hide'
						); // Hide Zendesk on close event
					});
				}
			} catch (e) {}
		}, 1000); // Delay execution for 1 second
		// Check cookie for app label visibility
		if (this.cookies.get('cookies-app') == 'true') {
			this.appComponent.showLabel = false; // Hide label if cookie is set
		}
		// Check for Cordova IAB and app version
		if (
			(window as any).cordova_iab != undefined &&
			(window as any).apt != undefined &&
			(window as any).versionApp != undefined
		) {
			this.desactiveLabel = true; // Disable label if conditions are met
		}
        if (
            this.appComponent.config.zendesk[this.appComponent.country].name ==
            'centribal'
        ) {
            (window as any).addEventListener('message', function (e) {
                // Listen for messages from the window
                if (e.data.status === 'hide') {
                    // Check if the message indicates to hide the chat
                    document
                        .getElementById('centribal_iframe_layout')
                        ?.classList.remove('centribal_open'); // Remove open class
                    document
                        .getElementById('centribal_iframe_layout')
                        ?.classList.add('centribal_hidden'); // Add hidden class
                }
            });
        }
	},
	watch: {}, // Watchers can be defined here
});
</script>
<template>
	<!-- Main container for the application layout -->
	<div class="w-full">
		<main
			id="main-layout"
			class="flex-grow block overflow-x-hidden text-neutral-content bg-base-content"
		>
            <div id="centribal_iframe_layout" class="centribal_hidden"></div>
			<!-- Desktop header component -->
			<HeaderDesktopv6
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
			<!-- Redirect label component -->
			<div
				v-if="
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
				class="mt-[113px] md:mt-[58px]"
			>
				<LabelRedirect />
				<!-- Render label redirect component -->
			</div>
			<MenuMobile7 v-if="config.header !== undefined && config.header.menuVersion !== undefined 
				? config.header.menuVersion == 6 
				: config.header_ !== undefined && config.header_.menuVersion !== undefined 
				? config.header_.menuVersion == 6 
				: false"/>
			<MenuMobile8 v-if="config.header_ !== undefined && config.header_.menuVersion !== undefined 
				? config.header_.menuVersion == 8 
				: false" />
			<!-- Render mobile menu component -->
			<!-- Notification modal component -->
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
			<!-- Main container for dynamic content -->
			<div
				class="main-container ml-0 max-w-screen relative"
				:class="
					(config.header_ != undefined &&
					config.header_.top_band != undefined
						? config.header_.top_band
						: config.header.showTicker) &&
					appComponent.boxes.length > 0 &&
					appComponent.session.logueado
						? (appComponent.config.header_ != undefined &&
							appComponent.config.header_.style_header != undefined &&
							appComponent.config.header_.style_header == 'gnp'
								? 'mt-[131px] md:mt-[121px]'
								: 'mt-[136px] md:mt-[88px]')
						: appComponent.labelRedirect &&
							  appComponent.showLabel &&
							  !desactiveLabel &&
							  appComponent.config.labelRedirect !== undefined &&
							  appComponent.config.labelRedirect[
									appComponent.country
							  ] !== undefined &&
							  appComponent.config.labelRedirect[
									appComponent.country
							  ].system !== undefined &&
							  (appComponent.config.labelRedirect[
									appComponent.country
							  ].system.indexOf(appComponent.platformApp) > -1 ||
									appComponent.config.labelRedirect[
										appComponent.country
									].system == 'all')
							? ''
							: appComponent.config.header_ !=undefined && appComponent.config.header_.style_header != undefined && appComponent.config.header_.style_header == 'gnp'
								? 'mt-[95px]'
								: 'mt-[110px] md:mt-[58px]'
				"
			>
				<ContingencyAlert
					v-if="appComponent.contingency"
					class="left-0"
					:class="appComponent.config.header_ !=undefined && appComponent.config.header_.style_header != undefined && appComponent.config.header_.style_header == 'gnp'
                            ? 'top-[90px]'
							: 'top-[59px]'
					"  
				/>
				<!-- Contingency view component -->
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
				<!-- Render router view for dynamic routing -->
			</div>
			<Menu5
				v-if="
					appComponent.config.menuMobile_ !== undefined &&
					appComponent.config.menuMobile_.version_style !== undefined &&
					appComponent.config.menuMobile_.version_style == 2 &&
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
			<!-- Footer component -->
			<AppFooter
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter'
				"
			/>
		</main>
	</div>
</template>
<style scoped>
/* Styles for main layout and container */
.main-layout,
.main-container {
	margin-top: 0.8px; /* Set top margin */
	border-top: none; /* Remove top border */
	display: block; /* Display as block */
	position: relative; /* Set position to relative */
	background-size: contain !important; /* Ensure background size is contained */
}
</style>

<!-- FILE DOCUMENTED -->

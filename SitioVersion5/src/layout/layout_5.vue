<script lang="ts">
import { RouterView } from 'vue-router'; // Import RouterView for routing
import AppHeaderMobile5 from '../components/headers/HeaderMobile5.vue'; // Mobile header component
import ApptopBarDownload from '../components/topBarDownload.vue'; // Top bar download component
import AppHeaderDesktopv5 from '../components/headers/HeaderDesktopv5.vue'; // Desktop header component
import AppFooter from '../components/footers/AppFooter.vue'; // Main footer component
import Footer3 from '../components/footers/Footer3.vue'; // Footer variant 3
import Footer4 from '../components/footers/Footer4.vue'; // Footer variant 4
import MenuMobile2 from '../components/menus/MenuMobile2.vue'; // Mobile menu variant 2
import MenuMobile5 from '../components/menus/MenuMobile5.vue'; // Mobile menu variant 5
import MenuMobile4 from '../components/menus/MenuMobile4.vue'; // Mobile menu variant 4
import MenuMobile from '../components/menus/MenuMobile.vue'; // General mobile menu
import Menu4 from '../components/menus/Menu4.vue'; // Menu variant 4
import { defineComponent, defineAsyncComponent } from 'vue'; // Vue composition API
import { Button } from 'flowbite-vue'; // Button component from Flowbite
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Contingency alert component
import ContingencyView from '@/views/ContingencyView.vue'; // Contingency view component
import LabelRedirect from '@/components/LabelRedirect.vue'; // Label redirect component
import { useCookies } from 'vue3-cookies'; // Cookie management

export default defineComponent({
	components: {
		ContingencyView, // Registering ContingencyView component
		ContingencyAlert, // Registering ContingencyAlert component
		Button, // Registering Button component
		AppHeaderMobile5, // Registering mobile header component
		AppHeaderDesktopv5, // Registering desktop header component
		ApptopBarDownload, // Registering top bar download component
		Footer3, // Registering Footer3 component
		Footer4, // Registering Footer4 component
		AppFooter, // Registering main footer component
		MenuMobile2, // Registering MenuMobile2 component
		MenuMobile, // Registering general mobile menu component
		MenuMobile4, // Registering MenuMobile4 component
		MenuMobile5, // Registering MenuMobile5 component
		Menu4, // Registering Menu4 component
		SliderCasino3Component: defineAsyncComponent(
			// Asynchronously loading CasinoSlider3 component
			() => import('../components/CasinoSlider3.vue')
		),
	},
	setup() {
		const { cookies } = useCookies(); // Using cookies in setup
		return {
			cookies, // Exposing cookies to the template
		};
	},
	data() {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Accessing app component
		let showChat = false; // State for chat visibility
		let desactiveLabel: boolean = false; // State for label activation
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
			showChat, // Exposing showChat to the template
			desactiveLabel, // Exposing desactiveLabel to the template
		};
	},
	mounted() {
		let vthis = this; // Reference to the Vue instance
		if (
			this.appComponent.config.zendesk != undefined && // Check if zendesk config exists
			this.appComponent.config.zendesk[this.appComponent.country] !=
				undefined && // Check if country-specific zendesk config exists
			this.appComponent.config.zendesk[this.appComponent.country].name !=
				undefined && // Check if zendesk name exists
			this.appComponent.config.zendesk[this.appComponent.country].name ==
				'centribal' // Check if zendesk name is 'centribal'
		) {
			(window as any).addEventListener('message', function (e) {
				// Listening for messages from the window
				if (e.data.status === 'hide') {
					// If the message status is 'hide'
					document
						.getElementById('centribal_iframe_layout')
						?.classList.remove('centribal_iframe_open'); // Remove open class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_hidden'); // Add hidden class
					vthis.showChat = false; // Set showChat to false
				}
			});
		}
		if (this.cookies.get('cookies-app') == 'true') {
			// Check if cookies-app cookie is true
			this.appComponent.showLabel = false; // Hide label if cookie is set
		}
		if (
			(window as any).cordova_iab != undefined && // Check if cordova_iab is defined
			(window as any).apt != undefined && // Check if apt is defined
			(window as any).versionApp != undefined // Check if versionApp is defined
		) {
			this.desactiveLabel = true; // Disable label if conditions are met
		}
	},
	methods: {
		onOpenChat() {
			// Method to toggle chat visibility
			let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal' // Check if zendesk name is 'centribal'
			) {
				if (!this.showChat) {
					// If chat is not visible
					document
						.getElementById('centribal_iframe_layout')
						?.classList.remove('centribal_iframe_hidden'); // Remove hidden class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_open'); // Add open class
					this.showChat = true; // Set showChat to true
					postMessage('show_chat', '', ref_id); // Send message to show chat
				} else {
					// If chat is visible
					document
						.getElementById('centribal_iframe_layout')
						?.classList.remove('centribal_iframe_open'); // Remove open class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_hidden'); // Add hidden class
					this.showChat = false; // Set showChat to false
					postMessage('hide_chat', '', ref_id); // Send message to hide chat
				}
			}
		},
		onOpenChatMobile() {
			// Method to hide chat on mobile
			let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal' // Check if zendesk name is 'centribal'
			) {
				document
					.getElementById('centribal_iframe_layout')
					?.classList.remove('centribal_iframe_open'); // Remove open class
				document
					.getElementById('centribal_iframe_layout')
					?.classList.add('centribal_iframe_hidden'); // Add hidden class
				postMessage('hide_chat', '', ref_id); // Send message to hide chat
			}
		},
	},
});
</script>
<template>
	<!-- Main container for the mobile drawer layout -->
	<div class="drawer drawer-mobile">
		<label for="main-menu"></label>
		<input id="main-menu" type="checkbox" class="drawer-toggle" />
		<!-- Main content area -->
		<main
			v-if="appComponent.loadView"
			id="main-layout"
			class="main-layout flex-grow block overflow-x-hidden text-neutral-content drawer-content bg-base-content"
		>
			<ApptopBarDownload
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					(config.header_ != undefined &&
					config.header_.dowload_app != undefined
						? config.header_.dowload_app
						: config.header != undefined &&
							config.header.showDownloadApp != undefined &&
							config.header.showDownloadApp[
								appComponent.country
							] != undefined &&
							config.header.showDownloadApp[appComponent.country])
				"
			/>
			<div class="sticky top-0 z-[60]">
				<AppHeaderMobile5
					v-if="
						appComponent.viewActual != '/banner-right' &&
						appComponent.viewActual != '/banner-left' &&
						appComponent.viewActual != '/banner-rightnl' &&
						appComponent.viewActual != '/banner-leftnl' &&
						appComponent.viewActual != '/banner-topcenternl' &&
						appComponent.viewActual != '/banner-topcenter'
					"
				/>
				<div class="hidden lg:block z-[99999999] relative">
					<AppHeaderDesktopv5
						v-if="
							appComponent.viewActual != '/banner-right' &&
							appComponent.viewActual != '/banner-left' &&
							appComponent.viewActual != '/banner-rightnl' &&
							appComponent.viewActual != '/banner-leftnl' &&
							appComponent.viewActual != '/banner-topcenternl' &&
							appComponent.viewActual != '/banner-topcenter' &&
							appComponent.viewActual != '/landing/app'
						"
					/>
				</div>
				<LabelRedirect
					v-if="
						appComponent.labelRedirect &&
						appComponent.showLabel &&
						!desactiveLabel &&
						appComponent.config.labelRedirect !== undefined &&
						appComponent.config.labelRedirect[
							appComponent.country
						] !== undefined &&
						appComponent.config.labelRedirect[appComponent.country]
							.system !== undefined &&
						(appComponent.config.labelRedirect[
							appComponent.country
						].system.indexOf(appComponent.platformApp) > -1 ||
							appComponent.config.labelRedirect[
								appComponent.country
							].system == 'all')
					"
				/>
			</div>
			<Menu4
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
			<div
				class="main-container"
				:class="
					appComponent.viewActual == '/banner-right' ||
					appComponent.viewActual == '/banner-left' ||
					appComponent.viewActual == '/banner-rightnl' ||
					appComponent.viewActual == '/banner-leftnl' ||
					appComponent.viewActual == '/banner-topcenternl' ||
					appComponent.viewActual == '/banner-topcenter'
						? ''
						: appComponent.openMenu5
							? 'lg:grid lg:grid-cols-[18%_82%] transition-all duration-300'
							: 'lg:grid lg:grid-cols-[8%_90%] transition-all duration-300'
				"
			>
				<MenuMobile5
					v-if="
						appComponent.viewActual != '/banner-right' &&
						appComponent.viewActual != '/banner-left' &&
						appComponent.viewActual != '/banner-rightnl' &&
						appComponent.viewActual != '/banner-leftnl' &&
						appComponent.viewActual != '/banner-topcenternl' &&
						appComponent.viewActual != '/banner-topcenter'
					"
					class="hidden lg:block"
				/>
				<div
					class=""
					:class="
						appComponent.viewActual == '/banner-right' ||
						appComponent.viewActual == '/banner-left' ||
						appComponent.viewActual == '/banner-rightnl' ||
						appComponent.viewActual == '/banner-leftnl' ||
						appComponent.viewActual == '/banner-topcenternl' ||
						appComponent.viewActual == '/banner-topcenter'
							? 'h-full'
							: 'lg:pt-4 lg:px-4 lg:rounded-2xl'
					"
				>
					<ContingencyAlert
						v-if="appComponent.contingency"
						class="top-20 md:top-14 lg:top-0 left-0"
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
						class="pt-8"
					/>
					<RouterView v-else />
					<!-- Default router view for nested routes -->
					<Footer4
						class="rounded-xl"
						v-if="
							appComponent.viewActual != '/banner-right' &&
							appComponent.viewActual != '/banner-left' &&
							appComponent.viewActual != '/banner-rightnl' &&
							appComponent.viewActual != '/banner-leftnl' &&
							appComponent.viewActual != '/banner-topcenternl' &&
							appComponent.viewActual != '/banner-topcenter' &&
							config.footer.styleVersion == 5
						"
					/>
				</div>
			</div>
		</main>
		<MenuMobile2
			v-if="
				appComponent.viewActual != '/banner-right' &&
				appComponent.viewActual != '/banner-left' &&
				appComponent.viewActual != '/banner-rightnl' &&
				appComponent.viewActual != '/banner-leftnl' &&
				appComponent.viewActual != '/banner-topcenternl' &&
				appComponent.viewActual != '/banner-topcenter' &&
				config.partner == '8'
			"
		/>
		<MenuMobile5
			v-if="
				appComponent.viewActual != '/banner-right' &&
				appComponent.viewActual != '/banner-left' &&
				appComponent.viewActual != '/banner-rightnl' &&
				appComponent.viewActual != '/banner-leftnl' &&
				appComponent.viewActual != '/banner-topcenternl' &&
				appComponent.viewActual != '/banner-topcenter' &&
				config.partner !== '8'
			"
		/>
	</div>
	<!-- Chat iframe layout for Zendesk integration -->
	<div
		v-if="
			config.zendesk !== undefined &&
			config.zendesk[appComponent.country].name !== undefined &&
			config.zendesk[appComponent.country].name === 'centribal'
		"
		class="fixed bottom-3 left-4"
	>
		<div id="centribal_iframe_layout" class="centribal_iframe_hidden"></div>
		<!-- Chat button to toggle chat visibility -->
		<button
			@click="(onOpenChat(), appComponent.gAnalytics('interaction_chat'))"
			class="hidden lg:flex justify-center items-center bg-primary border-2 border-neutral shadow-inner shadow-black/50 rounded-full w-20 h-20 hover:scale-105"
		>
			<img
				v-if="!showChat"
				alt="centribalChatIcon"
				:src="config.zendesk[appComponent.country].img"
				class="w-14 aspect-square object-contain rounded-full"
			/>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
				viewBox="0 0 24 24"
			>
				<path
					fill="#242637"
					d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
				/>
			</svg>
		</button>
	</div>
</template>
<style>
/* Main container styles */
.main-container {
	margin-top: 0px; /* No margin at the top */
	border-top: none; /* No border at the top */
	display: block; /* Display as block */
	position: relative; /* Relative positioning */
	background-size: contain !important; /* Background size set to contain */
}
</style>

<!-- FILE DOCUMENTED -->

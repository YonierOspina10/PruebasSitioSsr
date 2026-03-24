<script lang="ts">
import AppHeaderMobile2 from '../components/headers/HeaderMobile2.vue'; // Import mobile header component
import ApptopBarDownload from '../components/topBarDownload.vue'; // Import top bar download component
import AppHeaderDesktopv2 from '../components/headers/HeaderDesktopv2.vue'; // Import desktop header component
import AppFooter from '../components/footers/AppFooter.vue'; // Import main footer component
import Footer3 from '../components/footers/Footer3.vue'; // Import alternative footer component
import MenuMobile2 from '../components/menus/MenuMobile2.vue'; // Import mobile menu component 2
import MenuMobile from '../components/menus/MenuMobile.vue'; // Import mobile menu component
import { defineComponent } from 'vue'; // Import Vue's defineComponent function
import { Button } from 'flowbite-vue'; // Import Button component from Flowbite
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Import contingency alert component
import ContingencyView from '@/views/ContingencyView.vue'; // Import contingency view component
import LabelRedirect from '@/components/LabelRedirect.vue'; // Import label redirect component
import { useCookies } from 'vue3-cookies'; // Import useCookies hook from vue3-cookies

export default defineComponent({
	components: {
		ContingencyView, // Register ContingencyView component
		ContingencyAlert, // Register ContingencyAlert component
		Button, // Register Button component
		AppHeaderMobile2, // Register mobile header component
		AppHeaderDesktopv2, // Register desktop header component
		ApptopBarDownload, // Register top bar download component
		Footer3, // Register alternative footer component
		AppFooter, // Register main footer component
		MenuMobile2, // Register mobile menu component 2
		MenuMobile, // Register mobile menu component
		LabelRedirect, // Register label redirect component
	},
	setup() {
		const { cookies } = useCookies(); // Initialize cookies for use in the component
		return {
			cookies, // Expose cookies to the template
		};
	},
	data() {
		let config = this.$config(); // Retrieve configuration settings
		let appComponent: any = this.$appComponent; // Access the app component
		let showChat = false; // State to control chat visibility
		let desactiveLabel: boolean = false; // State to control label activation
		return {
			config, // Expose config to the template
			appComponent, // Expose appComponent to the template
			showChat, // Expose showChat to the template
			desactiveLabel, // Expose desactiveLabel to the template
		};
	},
	mounted() {
		let vthis = this; // Reference to the component instance
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
						?.classList.remove('centribal_iframe_open'); // Remove open class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_hidden'); // Add hidden class
					vthis.showChat = false; // Update showChat state
				}
			});
		}
		if (this.cookies.get('cookies-app') == 'true') {
			// Check if cookies-app cookie is set to true
			this.appComponent.showLabel = false; // Hide label if cookie is present
		}
		if (
			(window as any).cordova_iab != undefined &&
			(window as any).apt != undefined &&
			(window as any).versionApp != undefined
		) {
			this.desactiveLabel = true; // Deactivate label if certain conditions are met
		}
	},
	methods: {
		onOpenChat() {
			// Method to toggle chat visibility
			let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal'
			) {
				if (!this.showChat) {
					// If chat is currently hidden
					document
						.getElementById('centribal_iframe_layout')
						?.classList.remove('centribal_iframe_hidden'); // Remove hidden class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_open'); // Add open class
					this.showChat = true; // Update showChat state
					postMessage('show_chat', '', ref_id); // Send message to show chat
				} else {
					// If chat is currently visible
					document
						.getElementById('centribal_iframe_layout')
						?.classList.remove('centribal_iframe_open'); // Remove open class
					document
						.getElementById('centribal_iframe_layout')
						?.classList.add('centribal_iframe_hidden'); // Add hidden class
					this.showChat = false; // Update showChat state
					postMessage('hide_chat', '', ref_id); // Send message to hide chat
				}
			}
		},
		onOpenChatMobile() {
			// Method to hide chat on mobile
			let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal'
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
	<div>
		<main
			v-if="appComponent.loadView"
			id="main-layout"
			class="main-layout flex-grow block overflow-x-hidden text-neutral-content bg-base-content"
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
			<AppHeaderMobile2
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter'
				"
			/>
			<AppHeaderDesktopv2
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
			<LabelRedirect
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
			/>
			<div class="main-container">
				<!-- Main container for the content -->
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
				<!-- Default router view if no contingency -->
			</div>
			<AppFooter
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					(config.footer.styleVersion != 4 ||
						config.footer.styleVersion == undefined)
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
					config.footer.styleVersion == 4
				"
			/>
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
		<MenuMobile
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
	<div
		id="centribal_chat"
		v-if="
			config.zendesk !== undefined &&
			config.zendesk[appComponent.country] !== undefined &&
			config.zendesk[appComponent.country].name !== undefined &&
			config.zendesk[appComponent.country].name === 'centribal'
		"
		class="fixed bottom-3 left-4 z-50"
	>
		<div id="centribal_iframe_layout" class="centribal_iframe_hidden"></div>
		<!-- Iframe layout for chat -->
		<button
			@click="(onOpenChat(), appComponent.gAnalytics('interaction_chat'))"
			class="hidden sm:flex justify-center items-center bg-primary border-2 border-neutral shadow-inner shadow-black/50 rounded-full w-20 h-20 hover:scale-105"
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
.main-container {
	margin-top: 0px; /* No margin at the top */
	border-top: none; /* No border at the top */
	display: block; /* Display as block */
	position: relative; /* Relative positioning */
	background-size: contain !important; /* Ensure background size is contained */
}
</style>

<!-- FILE DOCUMENTED -->

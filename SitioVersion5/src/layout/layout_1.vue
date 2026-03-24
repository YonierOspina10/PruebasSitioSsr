<script lang="ts">
import { RouterView } from 'vue-router'; // Import RouterView for routing
import AppHeaderMobile from '../components/headers/HeaderMobile.vue'; // Import mobile header component
import ApptopBarDownload from '../components/topBarDownload.vue'; // Import top bar download component
import AppHeaderDesktop from '../components/headers/HeaderDesktop.vue'; // Import desktop header component
import AppFooter from '../components/footers/AppFooter.vue'; // Import footer component
import MenuMobile from '../components/menus/MenuMobile.vue'; // Import mobile menu component
import { defineComponent } from 'vue'; // Import defineComponent for component definition
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Import contingency alert component
import ContingencyView from '@/views/ContingencyView.vue'; // Import contingency view component
import LabelRedirect from '@/components/LabelRedirect.vue'; // Import label redirect component
import { useCookies } from 'vue3-cookies'; // Import useCookies for cookie management

export default defineComponent({
	components: {
		ContingencyView, // Register contingency view component
		ContingencyAlert, // Register contingency alert component
		AppHeaderMobile, // Register mobile header component
		AppHeaderDesktop, // Register desktop header component
		ApptopBarDownload, // Register top bar download component
		AppFooter, // Register footer component
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
		let appComponent: any = this.$appComponent; // Access application component data
		let desactiveLabel: boolean = false; // Initialize label activation state
		return {
			config, // Expose config to the template
			appComponent, // Expose appComponent to the template
			desactiveLabel, // Expose desactiveLabel to the template
		};
	},
	mounted() {
		// Check if cookies consent has been given
		if (this.cookies.get('cookies-app') == 'true') {
			this.appComponent.showLabel = false; // Hide label if consent is given
		}
		// Check for specific conditions related to the app environment
		if (
			(window as any).cordova_iab != undefined &&
			(window as any).apt != undefined &&
			(window as any).versionApp != undefined
		) {
			this.desactiveLabel = true; // Deactivate label if conditions are met
		}
	},
});
</script>
<template>
	<!-- Main container for the mobile drawer layout -->
	<div class="drawer drawer-mobile"
	:class="appComponent.config.background_desktop !== undefined && appComponent.config.background_desktop !== '' ? '' : 'bg-base-content'">
		<label for="main-menu"></label>
		<input id="main-menu" type="checkbox" class="drawer-toggle" />
		<!-- Main content area, shown if loadView is true -->
		<main
			v-if="appComponent.loadView"
			id="main-layout"
			class="main-layout flex-grow block overflow-x-hidden text-neutral-content drawer-content"
		>
			<!-- Top bar download component, conditionally rendered -->
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
			<!-- Mobile header component, conditionally rendered -->
			<AppHeaderMobile
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter'
				"
			/>
			<!-- Label redirect component, conditionally rendered -->
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
			<!-- Desktop header component, conditionally rendered -->
			<AppHeaderDesktop
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
			<!-- Main container for content, with dynamic classes based on route -->
			<div
				class="main-container"
				:class="[
					$route.path == '/home' ||
						$route.path == '/' ||
						$route.path == '' ||
						$route.path == '/torneos' ||
						$route.path == '/sorteos',
					config.layout == undefined || config.layout == 1 && $route.path == '/wallet'
						? 'absolute top-0 left-0'
						: '',
				]"
			>
				<!-- Contingency alert component, conditionally rendered -->
				<ContingencyAlert
					v-if="appComponent.contingency"
					class="top-16 md:top-14 lg:top-0 left-0"
				/>
				<!-- Contingency view component, conditionally rendered -->
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
				<!-- Router view for dynamic routing -->
				<RouterView v-else />
			</div>
			<!-- Footer component, conditionally rendered -->
			<AppFooter
				v-if="
					appComponent.viewActual != '/banner-right' &&
					appComponent.viewActual != '/banner-left' &&
					appComponent.viewActual != '/banner-rightnl' &&
					appComponent.viewActual != '/banner-leftnl' &&
					appComponent.viewActual != '/banner-topcenternl' &&
					appComponent.viewActual != '/banner-topcenter' &&
					!appComponent.appPOS
				"
			/>
		</main>
		<!-- Mobile menu component, conditionally rendered -->
		<MenuMobile
			v-if="
				appComponent.viewActual != '/banner-right' &&
				appComponent.viewActual != '/banner-left' &&
				appComponent.viewActual != '/banner-rightnl' &&
				appComponent.viewActual != '/banner-leftnl' &&
				appComponent.viewActual != '/banner-topcenternl' &&
				appComponent.viewActual != '/banner-topcenter'
			"
		/>
	</div>
</template>
<style>
/* Styles for the main container */
.main-container {
	margin-top: 0.8px; /* Margin at the top */
	border-top: 1px solid #d0af27; /* Top border style */
	display: block; /* Display as block */
	position: relative; /* Relative positioning */
	background-size: contain !important; /* Background size setting */
}
</style>

<!-- FILE DOCUMENTED -->

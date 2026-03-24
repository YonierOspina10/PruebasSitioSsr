<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling the installation prompt of a Progressive Web App (PWA).
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's reactive data properties.
	 */
	data() {
		let config = this.$config(); // Configuration object from the global context
		let appComponent: any = this.$appComponent; // Reference to the app component
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let showBar: boolean = true; // Flag to control visibility of the download bar
		return {
			config,
			appComponent,
			refreshBalance,
			showBar,
			isInstalled: false, // Flag to check if the app is installed
			installPromptEvent: null, // Event for the install prompt
		};
	},
	/**
	 * Lifecycle hook called when the component is created.
	 */
	created() {
		// Check if the app is installed in standalone mode
		this.isInstalled = window.matchMedia(
			'(display-mode: standalone)'
		).matches;

		// Event listener for when the app is installed
		window.addEventListener('appinstalled', () => {
			this.isInstalled = true; // Update the installed status
		});

		// Event listener for the before install prompt
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault(); // Prevent the default prompt
			this.installPromptEvent = event; // Store the event for later use
		});
	},
	methods: {
		/**
		 * Toggles the visibility of the download bar.
		 */
		closeDwlApp() {
			this.showBar = !this.showBar; // Toggle the showBar flag
		},
		/**
		 * Triggers the installation prompt for the PWA.
		 */
		installPWA() {
			if (this.installPromptEvent) {
				this.installPromptEvent.prompt(); // Show the install prompt
				this.installPromptEvent.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted the installation'); // Log acceptance
					} else {
						console.log('User canceled the installation'); // Log cancellation
					}
					this.installPromptEvent = null; // Clear the event
				});
			}
		},
	},
});
</script>

<template>
	<!-- Main container for the download bar, shown conditionally -->
	<div
		style="
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0px;
		"
		class="dwl bg-primary-content col-12 d-block d-md-none"
		v-show="
			showBar &&
			!isInstalled &&
			(config.header_ != undefined &&
			config.header_.dowload_app != undefined
				? config.header_.dowload_app
				: config.header != undefined &&
					config.header.showDownloadAppPWA != undefined &&
					config.header.showDownloadAppPWA[appComponent.country] !=
						undefined &&
					config.header.showDownloadAppPWA[appComponent.country])
		"
	>
		<!-- Clickable area to trigger PWA installation -->
		<div style="width: 100%; text-align: center" @click="installPWA">
			<span
				class="text-white"
				style="box-shadow: inset 0px -15px 13px #00000038"
				>{{ $t('Descargar App') }}</span
			>
		</div>
		<!-- Close button for the download bar -->
		<div class="cls-dwl text-white cursor-pointer" @click="closeDwlApp()">
			<svg
				class="iconShape SideMenuCloseIcon"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				id="Capa_1"
				x="0px"
				y="0px"
				width="512px"
				height="512px"
				viewBox="0 0 348.333 348.334"
				style="enable-background: new 0 0 348.333 348.334"
				xml:space="preserve"
			>
				<g>
					<path
						d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
						fill="#FFFFFF"
					></path>
				</g>
			</svg>
		</div>
	</div>
	<!-- Alternative download bar shown when the app is not installed -->
	<div
		class="dwl bg-primary-content col-12 d-block d-md-none"
		v-show="
			showBar &&
			!(config.header_ != undefined &&
			config.header_.dowload_app != undefined
				? config.header_.dowload_app
				: config.header != undefined &&
					config.header.showDownloadAppPWA != undefined &&
					config.header.showDownloadAppPWA[appComponent.country] !=
						undefined &&
					config.header.showDownloadAppPWA[appComponent.country])
		"
	>
		<!-- Router link to the landing page for the app -->
		<RouterLink to="/landing/app" class="">
			<span
				style="
					width: 23px;
					position: absolute;
					padding-top: 10px;
					margin-left: 10px;
				"
				><svg
					viewBox="19.932999999999996 68.509 228.155 228.155"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M101.885 207.092c7.865 0 14.241 6.376 14.241 14.241v61.09c0 7.865-6.376 14.24-14.241 14.24-7.864 0-14.24-6.375-14.24-14.24v-61.09c0-7.864 6.376-14.24 14.24-14.24z"
						fill="white"
					/>
					<path
						d="M69.374 133.645c-.047.54-.088 1.086-.088 1.638v92.557c0 9.954 7.879 17.973 17.66 17.973h94.124c9.782 0 17.661-8.02 17.661-17.973v-92.557c0-.552-.02-1.1-.066-1.638H69.374z"
						fill="white"
					/>
					<path
						d="M166.133 207.092c7.865 0 14.241 6.376 14.241 14.241v61.09c0 7.865-6.376 14.24-14.241 14.24-7.864 0-14.24-6.375-14.24-14.24v-61.09c0-7.864 6.376-14.24 14.24-14.24zM46.405 141.882c7.864 0 14.24 6.376 14.24 14.241v61.09c0 7.865-6.376 14.241-14.24 14.241-7.865 0-14.241-6.376-14.241-14.24v-61.09c-.001-7.865 6.375-14.242 14.241-14.242zM221.614 141.882c7.864 0 14.24 6.376 14.24 14.241v61.09c0 7.865-6.376 14.241-14.24 14.241-7.865 0-14.241-6.376-14.241-14.24v-61.09c0-7.865 6.376-14.242 14.241-14.242zM69.79 127.565c.396-28.43 25.21-51.74 57.062-54.812h14.312c31.854 3.073 56.666 26.384 57.062 54.812H69.79z"
						fill="white"
					/>
					<path
						d="M74.743 70.009l15.022 26.02M193.276 70.009l-15.023 26.02"
						fill="none"
						stroke="white"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M114.878 102.087c.012 3.974-3.277 7.205-7.347 7.216-4.068.01-7.376-3.202-7.388-7.176v-.04c-.011-3.975 3.278-7.205 7.347-7.216 4.068-.011 7.376 3.2 7.388 7.176v.04zM169.874 102.087c.012 3.974-3.277 7.205-7.347 7.216-4.068.01-7.376-3.202-7.388-7.176v-.04c-.011-3.975 3.278-7.205 7.347-7.216 4.068-.011 7.376 3.2 7.388 7.176v.04z"
						fill="#41d500"
					/></svg
			></span>
			<span
				class="text-white"
				style="box-shadow: inset 0px -15px 13px #00000038"
				>{{ $t('Descargar App') }}</span
			>
		</RouterLink>
		<!-- Close button for the alternative download bar -->
		<div class="cls-dwl text-white cursor-pointer" @click="closeDwlApp()">
			<svg
				class="iconShape SideMenuCloseIcon"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				version="1.1"
				id="Capa_1"
				x="0px"
				y="0px"
				width="512px"
				height="512px"
				viewBox="0 0 348.333 348.334"
				style="enable-background: new 0 0 348.333 348.334"
				xml:space="preserve"
			>
				<g>
					<path
						d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
						fill="#FFFFFF"
					></path>
				</g>
			</svg>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

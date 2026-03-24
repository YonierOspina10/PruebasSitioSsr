<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing the ExitIcon component
import { useCookies } from 'vue3-cookies'; // Importing the useCookies function from vue3-cookies

export default defineComponent({
	components: {
		ExitIcon, // Registering the ExitIcon component
	},
	data() {
		let config: any = this.$config(); // Retrieving the configuration object
		let appComponent: any = this.$appComponent; // Retrieving the app component object
		return {
			config, // Exposing the config object to the template
			appComponent, // Exposing the appComponent object to the template
			isInstalled: false, // State to track if the app is installed
			installPromptEvent: null, // Event to handle the installation prompt
		};
	},
	setup() {
		const { cookies } = useCookies(); // Using cookies in the setup function
		return {
			cookies, // Exposing cookies to the template
		};
	},
	mounted() {}, // Lifecycle hook for when the component is mounted
	created() {
		this.isInstalled = window.matchMedia(
			'(display-mode: standalone)' // Checking if the app is in standalone mode
		).matches;
		window.addEventListener('appinstalled', () => {
			this.isInstalled = true; // Updating state when the app is installed
		});
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault(); // Preventing the default prompt
			this.installPromptEvent = event; // Storing the prompt event
		});
	},
	methods: {
		closeDwlApp() {
			this.showBar = !this.showBar; // Toggling the visibility of the download bar
		},
		installPWA() {
			if (this.installPromptEvent) {
				this.installPromptEvent.prompt(); // Prompting the installation
				this.installPromptEvent.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('Usuario aceptó la instalación'); // Logging if the user accepted the installation
					} else {
						console.log('Usuario canceló la instalación'); // Logging if the user canceled the installation
					}
					this.installPromptEvent = null; // Resetting the prompt event
				});
			}
		},
		close() {
			this.appComponent.labelRedirect = false; // Hiding the label redirect
			this.cookies.set('cookies-app', 'true'); // Setting a cookie to indicate the app has been interacted with
			this.appComponent.showLabel = false; // Hiding the label
		},
		redirect() {
			window.open(
				this.appComponent.config.labelRedirect != undefined &&
					this.appComponent.config.labelRedirect[
						this.appComponent.country
					] != undefined &&
					this.appComponent.config.labelRedirect[
						this.appComponent.country
					].url != undefined
					? this.appComponent.config.labelRedirect[
							this.appComponent.country
						].url
					: '' // Opening the redirect URL if it exists
			);
		},
	},
});
</script>
<template>
	<!-- Main container for the download prompt, shown if the app is not installed and conditions are met -->
	<div
		v-if="
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
		class="w-full h-14 bg-success flex justify-center items-center gap-4 relative"
	>
		<div>
			<p class="text-neutral">
				{{
					$t(
						appComponent.config.labelRedirect != undefined &&
							appComponent.config.labelRedirect[
								appComponent.country
							] != undefined &&
							appComponent.config.labelRedirect[
								appComponent.country
							].text != undefined
							? appComponent.config.labelRedirect[
									appComponent.country
								].text
							: ''
					)
				}}
			</p>
		</div>
		<div class="w-auto h-auto flex justify-center items-center">
			<!-- Button to install the PWA -->
			<button
				class="w-36 h-10 bg-neutral rounded-full flex justify-center items-center gap-2 hover:scale-105 shadow-[inset_1px_-1px_2px] shadow-neutral-content/70"
				@click="installPWA()"
			>
				<img
					:src="
						appComponent.config.labelRedirect != undefined &&
						appComponent.config.labelRedirect[
							appComponent.country
						] != undefined &&
						appComponent.config.labelRedirect[appComponent.country]
							.icon != undefined
							? appComponent.config.labelRedirect[
									appComponent.country
								].icon
							: ''
					"
					alt="icon"
				/>
				<span class="text-neutral-content/50 font-bold">
					{{
						$t(
							appComponent.config.labelRedirect != undefined &&
								appComponent.config.labelRedirect[
									appComponent.country
								] != undefined &&
								appComponent.config.labelRedirect[
									appComponent.country
								].textButton != undefined
								? appComponent.config.labelRedirect[
										appComponent.country
									].textButton
								: ''
						)
					}}
				</span>
			</button>
		</div>
		<div
			class="w-auto h-auto flex justify-center items-center absolute right-3"
		>
			<!-- Button to close the download prompt -->
			<button
				@click="close()"
				class="hover:scale-105"
				aria-label="Cerrar menu"
			>
				<ExitIcon
					:height="23"
					:width="23"
					:fill="'#ffffff'"
					:fill2="'#ee3b3f'"
				/>
			</button>
		</div>
	</div>
	<!-- Alternative container for the download prompt, shown if the app is installed or conditions are not met -->
	<div
		v-if="
			!(config.header_ != undefined &&
			config.header_.dowload_app != undefined
				? config.header_.dowload_app
				: config.header != undefined &&
					config.header.showDownloadAppPWA != undefined &&
					config.header.showDownloadAppPWA[appComponent.country] !=
						undefined &&
					config.header.showDownloadAppPWA[appComponent.country])
		"
		class="w-full h-14 bg-success flex justify-center items-center gap-4 relative"
	>
		<div>
			<p class="text-neutral">
				{{
					$t(
						appComponent.config.labelRedirect != undefined &&
							appComponent.config.labelRedirect[
								appComponent.country
							] != undefined &&
							appComponent.config.labelRedirect[
								appComponent.country
							].text != undefined
							? appComponent.config.labelRedirect[
									appComponent.country
								].text
							: ''
					)
				}}
			</p>
		</div>
		<div class="w-auto h-auto flex justify-center items-center">
			<!-- Button to redirect to the app download link -->
			<button
				class="w-36 h-10 bg-neutral rounded-full flex justify-center items-center gap-2 hover:scale-105 shadow-[inset_1px_-1px_2px] shadow-neutral-content/70"
				@click="redirect()"
			>
				<img
					:src="
						appComponent.config.labelRedirect != undefined &&
						appComponent.config.labelRedirect[
							appComponent.country
						] != undefined &&
						appComponent.config.labelRedirect[appComponent.country]
							.icon != undefined
							? appComponent.config.labelRedirect[
									appComponent.country
								].icon
							: ''
					"
					alt="icon"
				/>
				<span class="text-neutral-content/50 font-bold">
					{{
						$t(
							appComponent.config.labelRedirect != undefined &&
								appComponent.config.labelRedirect[
									appComponent.country
								] != undefined &&
								appComponent.config.labelRedirect[
									appComponent.country
								].textButton != undefined
								? appComponent.config.labelRedirect[
										appComponent.country
									].textButton
								: ''
						)
					}}
				</span>
			</button>
		</div>
		<div
			class="w-auto h-auto flex justify-center items-center absolute right-3"
		>
			<!-- Button to close the download prompt -->
			<button
				@click="close()"
				class="hover:scale-105"
				aria-label="Cerrar menu"
			>
				<ExitIcon
					:height="23"
					:width="23"
					:fill="'#ffffff'"
					:fill2="'#ee3b3f'"
				/>
			</button>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

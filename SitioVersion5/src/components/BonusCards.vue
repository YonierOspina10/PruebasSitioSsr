<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for managing home icons display based on user session and device type.
 */
export default defineComponent({
	data() {
		// Retrieve configuration and application component data
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let HOME_ICONS: any = []; // Array to hold home icon data
		return {
			config,
			appComponent,
			HOME_ICONS,
		};
	},
	created() {
		// Determine which home icons to display based on user session and device type
		if (!this.appComponent.session.logueado && this.appComponent.mobile) {
			this.HOME_ICONS =
				this.config.HOME_ICONS_V3_NOLOGUEADO_MOBILE[
					this.appComponent.country
				];
		} else {
			if (
				!this.appComponent.session.logueado &&
				!this.appComponent.mobile
			) {
				this.HOME_ICONS =
					this.config.HOME_ICONS_V3_NOLOGUEADO_DESKTOP[
						this.appComponent.country
					];
			} else {
				if (
					this.appComponent.session.logueado &&
					!this.appComponent.mobile
				) {
					this.HOME_ICONS =
						this.config.HOME_ICONS_V3_LOGUEADO_DESKTOP[
							this.appComponent.country
						];
				} else {
					if (
						this.appComponent.session.logueado &&
						this.appComponent.mobile
					) {
						this.HOME_ICONS =
							this.config.HOME_ICONS_V3_LOGUEADO_MOBILE[
								this.appComponent.country
							];
					}
				}
			}
		}
		// Set the MENU_NEWTAB property based on the URL format
		if (this.HOME_ICONS != undefined && this.HOME_ICONS.length > 0) {
			this.HOME_ICONS.forEach(function (element) {
				if (
					element.MENU_URL.indexOf('http') != -1 ||
					element.MENU_URL.indexOf('www') != -1
				) {
					element.MENU_NEWTAB = true; // Open in new tab if URL is external
				} else {
					element.MENU_NEWTAB = false; // Open in the same tab if URL is internal
				}
			});
		}
	},
	methods: {
		/**
		 * Opens a given URL in a new browser tab.
		 * @param {string} url - The URL to open.
		 */
		goToLink(url) {
			console.log(url); // Log the URL for debugging
			window.open(url, '_blank'); // Open the URL in a new tab
		},
	},
});
</script>

<template>
	<!-- Main section for displaying home icons -->
	<section class="py-2 md:py-10 flex justify-center">
		<div
			class="in flex flex-wrap justify-center items-center h-auto max-w-[1300px] w-11/12 gap-6 md:gap-10 xl:gap-[2.4rem]"
		>
			<!-- Loop through HOME_ICONS to create icon elements -->
			<div
				v-for="item in HOME_ICONS"
				class="hover:scale-105 transition-all ease-in-out p-1 gap-y-1 w-[65px] h-[65px] md:w-[130px] md:h-[130px] bg-neutral-content border-solid border-2 border-[#3D4958ff] flex flex-col justify-center items-center rounded-xl md:rounded-3xl shrink-0"
			>
				<!-- Router link for internal navigation -->
				<RouterLink
					v-if="!item.MENU_NEWTAB"
					:to="item.MENU_URL"
					class="w-full h-full"
				>
					<img
						width="125"
						height="125"
						class="h-[34.8px] min-h-[34.8px] max-h-[34.8px] md:h-[83.3px] mb-1 md:mb-0 md:min-h-[83.3px] md:max-h-[83.3px] object-contain"
						:src="item.img"
						alt="Bonus image"
					/>
					<div
						class="flex items-center justify-center h-[30%] w-full"
					>
						<p
							class="text-white text-center px-0 md:px-2 text-[0.50rem] leading-3 md:text-xs capitalize"
						>
							{{ $t(item.text) }}
							<!-- Translated text for the icon -->
						</p>
					</div>
				</RouterLink>
				<!-- Anchor tag for external links -->
				<a
					v-else
					@click="goToLink(item.MENU_URL)"
					class="w-full h-full"
				>
					<img
						width="125"
						height="125"
						class="h-[34.8px] min-h-[34.8px] max-h-[34.8px] md:h-[83.3px] mb-1 md:mb-0 md:min-h-[83.3px] md:max-h-[83.3px] object-contain"
						:src="item.img"
						alt="Bonus image"
					/>
					<div
						class="flex items-center justify-center h-[30%] w-full"
					>
						<p
							class="text-white text-center px-0 md:px-2 text-[0.50rem] leading-3 md:text-xs capitalize"
						>
							{{ $t(item.text) }}
							<!-- Translated text for the icon -->
						</p>
					</div>
				</a>
			</div>
		</div>
	</section>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

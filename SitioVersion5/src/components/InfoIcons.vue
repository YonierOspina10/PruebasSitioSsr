<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import traced from './icons/traced.vue'; // Importing the traced component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving the configuration object
		let appComponent: any = this.$appComponent; // Accessing the application component
		let login2: string = ''; // Variable to hold login status
		let INFO_ICONS: any = []; // Array to hold information icons
		return {
			config,
			login2,
			appComponent,
			INFO_ICONS,
		};
	},
	components: {
		traced, // Registering the traced component
	},
	created() {
		this.onInfoIcons(); // Calling the method to initialize info icons on component creation
	},
	mounted() {
		this.$watch(
			() => this.appComponent.session.logueado, // Watching the logged-in status
			(res: any) => {
				this.onInfoIcons(); // Updating info icons when logged-in status changes
			}
		);
	},
	methods: {
		onInfoIcons() {
			// Method to determine which info icons to display based on login status and configuration
			if (this.appComponent.session.logueado) {
				this.login2 = 'login'; // Set login status to 'login'
			} else {
				if (!this.appComponent.session.logueado) {
					this.login2 = 'not_login'; // Set login status to 'not_login'
				}
			}
			// Check if the configuration for the current login status and language exists
			if (
				this.config != undefined &&
				this.config[this.login2] != undefined &&
				this.config[this.login2][this.appComponent.lngProd] !=
					undefined &&
				this.config[this.login2][this.appComponent.lngProd][
					'HOME_ICONS'
				] != undefined
			) {
				this.INFO_ICONS =
					this.config[this.login2][this.appComponent.lngProd][
						'HOME_ICONS'
					]; // Assigning the home icons based on the configuration
			} else {
				// Handling cases for non-logged-in users based on device type
				if (
					!this.appComponent.session.logueado &&
					this.appComponent.mobile
				) {
					this.INFO_ICONS =
						this.config.INFO_ICONS_NOLOGUEADO_MOBILE[
							this.appComponent.country
						]; // Mobile icons for non-logged-in users
				} else {
					if (
						!this.appComponent.session.logueado &&
						!this.appComponent.mobile
					) {
						this.INFO_ICONS =
							this.config.INFO_ICONS_NOLOGUEADO_DESKTOP[
								this.appComponent.country
							]; // Desktop icons for non-logged-in users
					} else {
						if (
							this.appComponent.session.logueado &&
							!this.appComponent.mobile
						) {
							this.INFO_ICONS =
								this.config.INFO_ICONS_LOGUEADO_DESKTOP[
									this.appComponent.country
								]; // Desktop icons for logged-in users
						} else {
							if (
								this.appComponent.session.logueado &&
								this.appComponent.mobile
							) {
								this.INFO_ICONS =
									this.config.INFO_ICONS_LOGUEADO_MOBILE[
										this.appComponent.country
									]; // Mobile icons for logged-in users
							}
						}
					}
				}
			}
			// Setting the MENU_NEWTAB property based on the URL format
			this.INFO_ICONS.forEach(function (element) {
				if (
					element.MENU_URL.indexOf('http') != -1 ||
					element.MENU_URL.indexOf('www') != -1
				) {
					element.MENU_NEWTAB = true; // Open in new tab if URL is external
				} else {
					element.MENU_NEWTAB = false; // Do not open in new tab for internal links
				}
			});
		},
	},
});
</script>

<template>
	<section>
		<!-- Main section for home content -->
		<div
			v-if="config.homePage.styleVersion == 1"
			id="home-content"
			class="version1 home-slider"
		>
			<!-- Container for animated icons -->
			<div
				class="animated flex justify-center items-center flex-wrap py-8 gap-y-8 xl:px-30"
			>
				<!-- Loop through INFO_ICONS to create icon links -->
				<div
					v-for="value in INFO_ICONS"
					class="container-slide w-2/4 xl:w-1/4 h-full flex items-center justify-center"
					style=""
				>
					<RouterLink
						@click="appComponent.gAnalytics('sub_menu', value)"
						:to="value.MENU_URL"
						:title="$t(value.MENU_TITLE)"
						data-use="preload"
						itemprop="url"
						:aria-label="value.MENU_TITLE"
						class="hover:scale-105 transition-all ease-in-out"
					>
						<!-- Container for each icon with gradient background -->
						<div
							class="flex justify-center items-center bg-gradient-to-b from-neutral to-gray-200 p-2 rounded-2xl font-poppinsb text-gray-700 scale-top-[-25px] left-[-5px] scale-[.8] md:scale-100 w-[190px] md:w-[270px] h-[62px] relative"
						>
							<!-- Image container for icon -->
							<div
								class="container-img absolute left-[8px] w-[40px] h-[40px]"
								style="z-index: 2"
							>
								<img
									v-lazy="value.MENU_ICON"
									width="35"
									height="15"
									alt="sports bets, casino"
									class="w-full h-full object-contain"
								/>
							</div>
							<!-- Traced component for additional visual effect -->
							<traced
								class="absolute top-[-49px] left-[-8px] z-1"
								:class="[
									value.MENU_CLASS_DIV == undefined ||
									value.MENU_CLASS_DIV == ''
										? 'fill-primary-content'
										: value.MENU_CLASS_DIV,
								]"
								:width="'145'"
								:height="'150'"
							/>
							<!-- Title for the icon -->
							<span
								class="font-poppinsb pl-16 md:pl-12 text-gray-600/90 text-xs md:text-xl max-w-[131px] md:max-w-[200px]"
								>{{ $t(value.MENU_TITLE) }}</span
							>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
/* Styles for home slider version 1 */
.home-slider.version1 > div .container-slide a {
	max-width: none; /* Allow links to take full width */
}
</style>

<!-- FILE DOCUMENTED -->

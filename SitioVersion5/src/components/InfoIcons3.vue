<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import traced from './icons/traced.vue'; // Importing a traced icon component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving the configuration object
		let appComponent: any = this.$appComponent; // Accessing the application component
		let INFO_ICONS: any = []; // Array to hold information icons
		let login2: string = ''; // Variable to determine login status
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
		// Lifecycle hook that runs when the component is created
		if (this.appComponent.session.logueado) {
			this.login2 = 'login'; // Setting login status to 'login' if logged in
		} else {
			if (!this.appComponent.session.logueado) {
				this.login2 = 'not_login'; // Setting login status to 'not_login' if not logged in
			}
		}
		// Checking if the configuration for the current login status and language exists
		if (
			this.config != undefined &&
			this.config[this.login2] != undefined &&
			this.config[this.login2][this.appComponent.lngProd] != undefined &&
			this.config[this.login2][this.appComponent.lngProd][
				'NEW_HOME_ICONS'
			] != undefined
		) {
			this.INFO_ICONS =
				this.config[this.login2][this.appComponent.lngProd][
					'NEW_HOME_ICONS'
				]; // Assigning the new home icons to INFO_ICONS
		} else {
			// Handling different cases for logged in and mobile/desktop
			if (
				!this.appComponent.session.logueado &&
				this.appComponent.mobile
			) {
				if (
					this.config &&
					this.config.INFO_ICONS_NOLOGUEADO_MOBILE &&
					this.appComponent &&
					this.appComponent.country &&
					this.config.INFO_ICONS_NOLOGUEADO_MOBILE[this.appComponent.country]
				) {
					this.INFO_ICONS =
						this.config.INFO_ICONS_NOLOGUEADO_MOBILE[
							this.appComponent.country
						];
				} // Assigning mobile icons for not logged in users
			} else {
				if (
					!this.appComponent.session.logueado &&
					!this.appComponent.mobile
				) {
					this.INFO_ICONS =
						this.config.INFO_ICONS_NOLOGUEADO_DESKTOP[
							this.appComponent.country
						]; // Assigning desktop icons for not logged in users
				} else {
					if (
						this.appComponent.session.logueado &&
						!this.appComponent.mobile
					) {
						this.INFO_ICONS =
							this.config.INFO_ICONS_LOGUEADO_DESKTOP[
								this.appComponent.country
							]; // Assigning desktop icons for logged in users
					} else {
						if (
							this.appComponent.session.logueado &&
							this.appComponent.mobile
						) {
							if (
								this.config &&
								this.config.INFO_ICONS_LOGUEADO_MOBILE &&
								this.appComponent &&
								this.appComponent.country &&
								this.config.INFO_ICONS_LOGUEADO_MOBILE[this.appComponent.country]
							) {
								this.INFO_ICONS =
									this.config.INFO_ICONS_LOGUEADO_MOBILE[
										this.appComponent.country
									]; // Assigning mobile icons for logged in users
							}
						}
					}
				}
			}
		}
		// Setting the MENU_NEWTAB property based on the MENU_URL
		if (this.INFO_ICONS != undefined && this.INFO_ICONS.length > 0) {
			this.INFO_ICONS.forEach(function (element) {
				if (
					element.MENU_URL.indexOf('http') != -1 ||
					element.MENU_URL.indexOf('www') != -1
				) {
					element.MENU_NEWTAB = true; // Open in new tab if URL is external
				} else {
					element.MENU_NEWTAB = false; // Do not open in new tab if URL is internal
				}
			});
		}
	},
	methods:{
		analyticsAttrs(label:string) {
			return {
				'data-analytics-label': label,
				'data-analytics-context': `component:InfoIcons3|layout:layout-${this.appComponent.config.layout}`
			};
    	},
	}
});
</script>

<template>
	<section class="flex justify-center items-center pt-8 pb-4 w-full">
		<!-- Main section for home content with flex layout -->
		<div
			id="home-content"
			class="version1 home-slider1 flex flex-wrap w-11/12 max-w-[1300px] gap-4 z-50"
		>
			<!-- Looping through INFO_ICONS to create slides -->
			<div
				v-for="(value, index) in INFO_ICONS"
				class="container-slide1 mx-auto flex justify-center items-center"
				:class="$route.path != '/home' ? 'in' : ''"
			>
				<RouterLink
					:to="value.MENU_URL"
					v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
					:title="$t(value.MENU_TITLE)"
					data-use="preload"
					itemprop="url"
					:aria-label="value.MENU_TITLE"
					:data-analytics-label="`home:shortcut:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
					:data-analytics-position="(index as number) + 1"
					:data-analytics-context="`component:InfoIcons3|layout:layout-${appComponent.config.layout}`"
					@click="appComponent.gAnalytics('sub_menu', value)"
					:class="
						appComponent.config.name == 'Lotosports' ||
						(value.MENU_ICON_STYLE != undefined &&
							value.MENU_ICON_STYLE == 1)
							? 'w-40 lg:w-52 h-14 lg:h-16 justify-around p-1'
							: 'w-40 lg:w-60 h-12 lg:h-16 relative justify-center'
					"
					class="hover:scale-[1.02] flex items-center rounded-2xl bg-base-300 text-neutral"
				>
					<div
						:class="
							appComponent.config.name == 'Lotosports' ||
							(value.MENU_ICON_STYLE != undefined &&
								value.MENU_ICON_STYLE == 1)
								? 'h-full aspect-square'
								: 'container-img absolute -left-5 -bottom-1 lg:-bottom-3 lg:-left-7 w-16 lg:w-28 h-16 lg:h-28'
						"
					>
						<img
							v-lazy="value.MENU_ICON"
							alt="sports bets, casino"
							class="w-full h-full object-contain"
							width="98"
							height="98"
						/>
					</div>
					<span
						:class="
							appComponent.config.name == 'Lotosports' ||
							(value.MENU_ICON_STYLE != undefined &&
								value.MENU_ICON_STYLE == 1)
								? 'text-sm text-center w-[60%]'
								: 'font-poppins flex h-full text-center justify-center items-center font-bold ml-[30px] lg:ml-14 mt-0 text-[12px] lg:text-lg leading-none max-w-[100px] lg:max-w-[120px]'
						"
					>
						{{ $t(value.MENU_TITLE) }}
						<!-- Displaying the menu title -->
					</span>
				</RouterLink>
			</div>
		</div>
	</section>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->

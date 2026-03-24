<template>
	<!-- Main section containing the slider and navigation buttons -->
	<section
		class="w-full flex justify-center items-center gap-0 max-w-[1156px]"
	>
		<!-- Button to navigate to the previous slide, hidden on tablet -->
		<button id="buttonLeftMenu6" class="hover:scale-125 tablet:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 14 23"
				fill="none"
			>
				<path
					d="M0.939438 10.7673C0.353652 11.3531 0.353651 12.3029 0.939438 12.8887L10.4854 22.4346C11.0712 23.0204 12.0209 23.0204 12.6067 22.4346C13.1925 21.8488 13.1925 20.8991 12.6067 20.3133L4.12142 11.828L12.6067 3.34272C13.1925 2.75694 13.1925 1.80719 12.6067 1.2214C12.0209 0.635615 11.0712 0.635615 10.4854 1.2214L0.939438 10.7673ZM5.49902 10.328L2.0001 10.328L2.0001 13.328L5.49902 13.328L5.49902 10.328Z"
					fill="white"
				/>
			</svg>
		</button>
		<!-- Swiper container for the slider -->
		<swiper-container
			id="MenuSlider6"
			:slides-per-view="'auto'"
			:mousewheel="true"
			:mousewheel-force-to-axis="true"
			:direction="'horizontal'"
			:controller-control="'.swiper-4'"
			:free-mode="true"
			:breakpoints="{
				320: {
					spaceBetween: 10,
				},
				740: {
					spaceBetween: 20,
				},
			}"
			:injectStyles="[
				`
			.swiper-button-prev,
			.swiper-button-next,
			.swiper-button-prev::after,
			.swiper-button-next::after {
				color: ${colors.neutral};
				width: 30px;
				height: 30px;
				margin-top: -8px;
			}`,
			]"
			class="w-[90%] tablet:w-auto tablet:mx-auto tablet:pl-5 desktop:pl-10"
		>
			<!-- Slides generated from INFO_ICONS array -->
			<swiper-slide
				v-for="(item, index) in INFO_ICONS"
				:key="index"
				class="w-[70px] h-[70px] tablet:w-[75px] tablet:h-[75px] desktop:w-[125px] desktop:h-[125px]"
			>
				<!-- Router link for each icon, with dynamic properties -->
				<RouterLink
					:to="item.MENU_URL"
					:key="index"
					:aria-label="item.MENU_TITLE"
					:data-analytics-label="`home:shortcut:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
					:data-analytics-position="(index as number) + 1"
					:data-analytics-context="`component:Menu6|layout:layout-${appComponent.config.layout}`"
					@click="appComponent.gAnalytics('sub_menu', item)"
					active-class="scale-110"
					class="w-full h-full flex flex-col justify-center items-center gap-2 desktop:gap-4 rounded-xl p-2 border-2 hover:scale-[1.02] transition-transform duration-300 ease-in-out bg-base-300 border-base-200 shadow-sm"
				>
					<!-- Lazy-loaded icon image -->
					<img
						v-lazy="item.MENU_ICON"
						alt="sports bets, casino"
						class="w-1/2 aspect-square object-contain"
					/>
					<!-- Title of the menu item -->
					<span
						class="text-xs desktop:text-lg leading-3 desktop:leading-5 text-center capitalize"
						>{{ $t(item.MENU_TITLE) }}</span
					>
				</RouterLink>
			</swiper-slide>
		</swiper-container>
		<!-- Button to navigate to the next slide, hidden on tablet -->
		<button id="buttonRightMenu6" class="hover:scale-125 tablet:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 14 23"
				fill="none"
			>
				<path
					d="M13.0612 12.8887C13.647 12.3029 13.647 11.3531 13.0612 10.7673L3.51526 1.2214C2.92947 0.635614 1.97973 0.635614 1.39394 1.2214C0.808154 1.80719 0.808154 2.75694 1.39394 3.34272L9.87922 11.828L1.39394 20.3133C0.808154 20.8991 0.808154 21.8488 1.39394 22.4346C1.97973 23.0204 2.92947 23.0204 3.51526 22.4346L13.0612 12.8887ZM10.835 13.328H12.0005V10.328H10.835V13.328Z"
					fill="white"
				/>
			</svg>
		</button>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import traced from '../icons/traced.vue';
import { register } from 'swiper/element/bundle';
// Register Swiper component
register();
export default defineComponent({
	// Component data properties
	data() {
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Reference to app component
		let INFO_ICONS: any = []; // Array to hold menu icons
		let login2: string = ''; // Login state variable
		let colors: any = {}; // Object to hold color configurations
		let deviceTheme: string = 'theme_colors'; // Default theme
		return {
			config,
			login2,
			appComponent,
			INFO_ICONS,
			colors,
			deviceTheme,
		};
	},
	components: {
		traced, // Imported component
	},
	created() {
		// Determine the theme based on device and configuration
		if (
			this.appComponent.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		) {
			this.deviceTheme = 'theme_colors_desktop';
		} else if (
			this.appComponent.config.theme_colors_mobile != undefined &&
			this.appComponent.config.mobileL != ''
		) {
			this.deviceTheme = 'theme_colors_mobile';
		}
		this.colors = this.appComponent.config[this.deviceTheme]; // Set colors based on theme
		// Set login state
		if (this.appComponent.session.logueado) {
			this.login2 = 'login';
		} else {
			if (!this.appComponent.session.logueado) {
				this.login2 = 'not_login';
			}
		}
		// Load icons based on login state and language
		if (
			this.config[this.login2] != undefined &&
			this.config[this.login2][this.appComponent.lngProd] != undefined &&
			this.config[this.login2][this.appComponent.lngProd][
				'NEW_HOME_ICONS'
			] != undefined
		) {
			this.INFO_ICONS =
				this.config[this.login2][this.appComponent.lngProd][
					'NEW_HOME_ICONS'
				];
		} else {
			if (
				!this.appComponent.session.logueado &&
				this.appComponent.mobile
			) {
				this.INFO_ICONS =
					this.config.INFO_ICONS_NOLOGUEADO_MOBILE[
						this.appComponent.country
					];
			} else {
				if (
					!this.appComponent.session.logueado &&
					!this.appComponent.mobile
				) {
					this.INFO_ICONS =
						this.config.INFO_ICONS_NOLOGUEADO_DESKTOP[
							this.appComponent.country
						];
				} else {
					if (
						this.appComponent.session.logueado &&
						!this.appComponent.mobile
					) {
						this.INFO_ICONS =
							this.config.INFO_ICONS_LOGUEADO_DESKTOP[
								this.appComponent.country
							];
					} else {
						if (
							this.appComponent.session.logueado &&
							this.appComponent.mobile
						) {
							this.INFO_ICONS =
								this.config.INFO_ICONS_LOGUEADO_MOBILE[
									this.appComponent.country
								];
						}
					}
				}
			}
		}
		// Set new tab property for each icon
		if (this.INFO_ICONS != undefined && this.INFO_ICONS.length > 0) {
			this.INFO_ICONS.forEach(function (element) {
				element.MENU_NEWTAB =
					element.MENU_URL.indexOf('http') != -1 ||
					element.MENU_URL.indexOf('www') != -1;
			});
		}
	},
	mounted() {
		let count = 0; // Counter for interval
		const intervalSwiper = setInterval(() => {
			count++;
			try {
				const swiperEl = document.getElementById('MenuSlider6') as any; // Get swiper element
				if (swiperEl || count > 10) {
					clearInterval(intervalSwiper); // Clear interval if swiper is found or count exceeds 10
					const buttonLeft =
						document.getElementById('buttonLeftMenu6'); // Left button
					const buttonRight =
						document.getElementById('buttonRightMenu6'); // Right button
					// Add event listener for left button
					buttonLeft?.addEventListener('click', (e) => {
						e.preventDefault();
						swiperEl?.swiper.slidePrev(); // Slide to previous
					});
					// Add event listener for right button
					buttonRight?.addEventListener('click', (e) => {
						e.preventDefault();
						swiperEl?.swiper.slideNext(); // Slide to next
					});
				}
			} catch (e) {
				console.log(e); // Log any errors
			}
		}, 1000); // Check every second
	},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper and SwiperSlide components from Swiper
import 'swiper/css'; // Importing Swiper CSS styles
import 'swiper/css/pagination'; // Importing Swiper pagination styles
import 'swiper/css/navigation'; // Importing Swiper navigation styles
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importing Swiper modules for navigation, pagination, and autoplay

export default defineComponent({
	components: {
		Swiper, // Registering Swiper component
		SwiperSlide, // Registering SwiperSlide component
	},
	data() {
		let config = this.$config(); // Retrieving configuration object
		let appComponent: any = this.$appComponent; // Storing app component reference
		let login2: string = ''; // Initializing login status variable
		let HOME_ICONS: any = []; // Initializing array for home icons
		return {
			config, // Exposing config to the template
			login2, // Exposing login status to the template
			appComponent, // Exposing app component to the template
			HOME_ICONS, // Exposing home icons to the template
			modules: [Pagination, Autoplay, Navigation], // Exposing Swiper modules to the template
		};
	},
  created() {
    this.setIcons();
  },
  methods: {
    setIcons() {
      if (this.appComponent.session.logueado) {
        this.login2 = 'login';
      } else {
        this.login2 = 'not_login';
      }

      if (
          this.config != undefined &&
          this.config[this.login2] != undefined &&
          this.config[this.login2][this.appComponent.lngProd] != undefined &&
          this.config[this.login2][this.appComponent.lngProd]['HOME_ICONS'] !=
          undefined
      ) {
        this.HOME_ICONS =
            this.config[this.login2][this.appComponent.lngProd]['HOME_ICONS'];
      } else {
        if (!this.appComponent.session.logueado && this.appComponent.mobile) {
          this.HOME_ICONS =
              this.config.HOME_ICONS_NOLOGUEADO_MOBILE[
                  this.appComponent.country
                  ];
        } else if (
            !this.appComponent.session.logueado &&
            !this.appComponent.mobile
        ) {
          this.HOME_ICONS =
              this.config.HOME_ICONS_NOLOGUEADO_DESKTOP[
                  this.appComponent.country
                  ];
        } else if (
            this.appComponent.session.logueado &&
            !this.appComponent.mobile
        ) {
          this.HOME_ICONS =
              this.config.HOME_ICONS_LOGUEADO_DESKTOP[
                  this.appComponent.country
                  ];
        } else if (
            this.appComponent.session.logueado &&
            this.appComponent.mobile
        ) {
          this.HOME_ICONS =
              this.config.HOME_ICONS_LOGUEADO_MOBILE[
                  this.appComponent.country
                  ];
        }
      }

      if (this.HOME_ICONS) {
        this.HOME_ICONS = this.HOME_ICONS.map((element) => ({
          ...element,
          MENU_NEWTAB:
              element.MENU_URL.includes('http') ||
              element.MENU_URL.includes('www'),
        }));
      }
    },
	analyticsAttrs(label:string) {
      return {
          'data-analytics-label': label,
          'data-analytics-context': `component:CardsIcons|layout:layout-${this.appComponent.config.layout}`
      };
    }
  },
  watch: {
    'appComponent.session.logueado'(newVal, oldVal) {
      this.setIcons();
    },
    'appComponent.lngProd'(newVal, oldVal) {
      this.setIcons();
    },
    'appComponent.country'(newVal, oldVal) {
      this.setIcons();
    },
    'appComponent.mobile'(newVal, oldVal) {
      this.setIcons();
    },
  },
});
</script>
<template>
	<!-- Main section for home page content based on style version -->
	<section
		v-if="
			config.homePage.styleVersion == 1 &&
			(config.layout == undefined ||
				(config.layout != undefined && config.layout != 5))
		"
	>
		<!-- Container for home content with specific classes for styling -->
		<div id="home-content" class="version1 home-slider">
			<!-- Grid layout for displaying home icons -->
			<div
				class="animated grid md:grid-flow-col auto-cols-fr justify-center mt-8 grid-cols-2"
			>
				<!-- Loop through HOME_ICONS to create individual icon containers -->
				<div
					v-for="(value, index) in HOME_ICONS"
					:class="value.MENU_SECCION"
					class="container-slide"
					style=""
				>
					<!-- Router link for icons that do not open in a new tab -->
					<RouterLink
						@click="appComponent.gAnalytics('sub_menu', value)"
						v-if="!value.MENU_NEWTAB"
						:id="`icons-${value.MENU_ID}`"
						:data-analytics-label="`home:shortcut:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
						:data-analytics-position="(index as number) + 1"
						:data-analytics-context="`component:CardsIcons|layout:layout-${config.layout}`"
						class="SideLink Link-SportsLobbySection"
						:to="value.MENU_URL"
						v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
						:title="$t(value.MENU_TITLE)"
						data-use="preload"
						itemprop="url"
						:aria-label="value.MENU_TITLE"
					>
						<!-- Circle container for icon -->
						<div
							class="circle blob white"
							v-bind:class="[
							    {
							        'border-solid border-4 border-success': value.MENU_ID === 'accion_registro',
							    },
							    value.MENU_ID !== 'accion_registro'
							        ? (value.MENU_CLASS_BORDER ?? 'border-2 border-solid border-base-300')
							        : ''
							]"
						>
							<!-- Inner div for background color -->
							<div
								:class="[
									value.MENU_CLASS_DIV == undefined
										? 'bg-base-300'
										: value.MENU_CLASS_DIV,
								]"
							>
								<picture>
									<!-- Source for webp image format -->
									<source
										type="image/webp"
										:srcset="value.MENU_ICON"
									/>
									<!-- Fallback image -->
									<img
										v-lazy="value.MENU_ICON"
										width="86"
										height="15"
										alt="sports bets, casino"
									/>
								</picture>
							</div>
						</div>
						<!-- Text label for the icon -->
						<span
							:class="[
								{
									'bg-success rounded-lg ':
										value.MENU_ID == 'accion_registro',
									'bg-base-100': value.MENU_ID != 'accion_registro'
								},
							]"
							class="p-1 rounded font-bold text-neutral transform"
							>{{ $t(value.MENU_TITLE) }}</span
						>
					</RouterLink>
					<!-- Anchor tag for icons that open in a new tab -->
					<a
						v-else
						:id="`icons-${value.MENU_ID}`"
						class="SideLink Link-SportsLobbySection"
						:href="value.MENU_URL"
						:title="$t(value.MENU_TITLE)"
						data-use="preload"
						itemprop="url"
						:aria-label="value.MENU_TITLE"
					>
						<!-- Circle container for icon -->
						<div
							class="circle blob white"
							v-bind:class="[
							    {
							        'border-solid border-4 border-success': value.MENU_ID === 'accion_registro',
							    },
							    value.MENU_ID !== 'accion_registro'
							        ? (value.MENU_CLASS_BORDER ?? 'border-2 border-solid border-base-300')
							        : ''
							]"
						>
							<!-- Inner div for background color -->
							<div
								:class="[
									value.MENU_CLASS_DIV == undefined
										? 'bg-base-300'
										: value.MENU_CLASS_DIV,
								]"
							>
								<picture>
									<!-- Source for webp image format -->
									<source
										type="image/webp"
										:srcset="value.MENU_ICON"
									/>
									<!-- Fallback image -->
									<img
										v-lazy="value.MENU_ICON"
										width="86"
										height="15"
										alt="sports bets, casino"
									/>
								</picture>
							</div>
						</div>
						<!-- Text label for the icon -->
						<span
							:class="[
								{
									'bg-success rounded-lg ':
										value.MENU_ID == 'accion_registro',
									'bg-base-100': value.MENU_ID != 'accion_registro'
								},
							]"
							class="p-1 rounded font-bold text-neutral transform"
							>{{ $t(value.MENU_TITLE) }}</span
						>
					</a>
				</div>
			</div>
		</div>
	</section>
	<!-- Section for home page content when style version is 2 -->
	<section
		v-else-if="config.homePage.styleVersion == 2"
		class="py-6 px-0 lg:px-20 flex flex-col gap-y-10"
	>
		<!-- Swiper component for displaying icons in a carousel format -->
		<swiper
			:init="false"
			:slidesPerView="3"
			:spaceBetween="10"
			:navigation="true"
			:breakpoints="{
				'880': {
					slidesPerView: 6,
					spaceBetween: 30,
				},
			}"
			:modules="modules"
			class="w-full justify-center items-center flex px-4 container-cards"
		>
			<!-- Loop through HOME_ICONS to create individual swiper slides -->
			<swiper-slide
				v-for="value in HOME_ICONS"
				class="flex justify-center items-center hover:brightness-90"
			>
				<!-- Router link for each icon -->
				<RouterLink
					@click="appComponent.gAnalytics('sub_menu', value)"
					:id="`icons-${value.MENU_ID}`"
					:to="value.MENU_URL"
					v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
					:class="value.MENU_SECCION"
					class="after:w-full after:z-1 after:h-[0.1%] after:bg-primary after:absolute after:bottom-0 after:left-0 after:shadow-primary after:shadow-[0px_10px_20px_19px] lg:after:shadow-[0px_-2px_20px_19px] lg:after:shadow-primary relative overflow-hidden border-solid border-1 md:border-2 border-primary p-2 rounded-lg w-[80px] h-[70px] md:w-[135px] md:h-[120px] hover:scale-95 transition-all ease-in-out flex justify-center items-start"
				>
					<!-- Title for the icon -->
					<p
						:class="
							value.MENU_TITLE.indexOf(' ') >= 0
								? 'first-line:text-primary brightness-125 text-neutral font-bold first-line:font-light max-w-[90px]'
								: 'font-bold text-neutral'
						"
						class="text-xs lg:text-lg break-words text-center leading-3 lg:leading-4 drop-shadow-[0px_2px_1px_black] capitalize z-1"
					>
						{{ $t(value.MENU_TITLE) }}
					</p>
					<!-- Icon image -->
					<img
						:src="value.MENU_ICON"
						alt=""
						class="object-contain w-[40px] h-[40px] md:w-[100px] md:h-[80px] absolute bottom-0 left-1/2 -translate-x-1/2 z-1"
					/>
					<!-- Background image for the icon -->
					<img
						:src="
							value.MENU_BG != undefined
								? value.MENU_BG
								: 'https://images.virtualsoft.tech/m/msj15212T1708696971.png'
						"
						alt=""
						class="z-0 w-full h-full absolute top-0 left-0 opacity-100"
					/>
				</RouterLink>
			</swiper-slide>
		</swiper>
		<!-- Template for additional registration link if applicable -->
		<template v-for="value in HOME_ICONS">
			<div
				v-if="value.MENU_ID == 'accion_registro'"
				class="w-full flex justify-center items-center"
			>
				<!-- Router link for registration -->
				<RouterLink
					to="/registro"
					class="hover:brightness-90 overflow-hidden relative rounded-lg bg-neutral-content text-neutral bg-gradient-to-r from-success/60 to-success/75 px-2 md:px-4 border-solid border-success/75 border-2 hover:scale-95 transition-all ease-in-out text-sm md:text-xl flex flex-row justify-center items-center gap-x-3"
				>
					<span class="font-poppinssl z-1">{{
						$t(value.MENU_TITLE)
					}}</span>
					<!-- Icon for registration -->
					<img
						:src="
							value._MENU_TITLE
								? value.MENU_TITLE
								: 'https://images.virtualsoft.tech/m/msj18212T1708463819.png'
						"
						alt="Registro"
						class="w-10 h-10 z-1 md:w-14 md:h-14 object-contain"
					/>
					<!-- Background image for registration link -->
					<img
						src="https://images.virtualsoft.tech/m/msj15212T1708706959.png"
						alt=""
						class="absolute left-10 md:left-16"
					/>
				</RouterLink>
			</div>
		</template>
	</section>
	<!-- Section for home page content when style version is 3 -->
	<section v-else-if="config.homePage.styleVersion == 3">
		<!-- Container for icons with flex layout -->
		<div
			class="w-full h-auto my-5 flex justify-center items-center flex-wrap gap-4"
		>
			<!-- Router link for each icon -->
			<RouterLink
				v-for="value in HOME_ICONS"
				:to="value.MENU_URL"
				v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
				:class="[
					'w-24 md:w-28 h-24 md:h-28 text-xs md:text-base transition-all ease-in-out hover:brightness-110',
					'relative flex flex-col justify-start items-center overflow-hidden bg-secondary rounded-2xl',
					'border-solid border-2 border-primary',
				]"
			>
				<!-- Icon image -->
				<img
					:src="value.MENU_ICON"
					alt=""
					class="w-8 h-8 md:w-10 md:h-10 mt-4 object-contain"
				/>
				<!-- Title for the icon -->
				<p
					class="text-neutral z-10 text-center w-full flex-grow-0 overflow-hidden text-ellipsis p-1 md:p-2 leading-4 relative align-middle font-poppinssl text-xs"
				>
					{{ value.MENU_TITLE }}
				</p>
				<!-- Background image for the icon -->
				<img
					src="https://images.virtualsoft.tech/m/msj17212T1712007346.png"
					alt="background-button"
					class="w-full h-full object-fill absolute top-0 left-0"
				/>
			</RouterLink>
		</div>
	</section>
	<!-- Section for home page content when style version is 4 -->
	<section v-else-if="config.homePage.styleVersion == 4"
	class="flex flex-col justify-center items-center w-full bg-transparent">
		<!-- Container for icons with flex layout -->
		<div
			class="w-full md:w-11/12 max-w-[1300px] h-auto flex justify-center items-center flex-wrap mx-1 md:mx-0 mb-5 gap-3 md:gap-12"
		>
			<!-- Router link for each icon -->
			<RouterLink
				v-for="(value, index) in HOME_ICONS"
				:to="value.MENU_URL"
				:data-analytics-label="`home:shortcut:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
				:data-analytics-position="(index as number) + 1"
                :data-analytics-context="`component:CardsIcons|layout:layout-${appComponent.config.layout}`"
				:class="[
					'w-36 md:w-56 h-32 md:h-40 text-xs md:text-base transition-all ease-in-out',
					'relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-t from-base-100 to-base-content hover:to-base-100 rounded-2xl',
					'border-solid border-2 border-accent hover:border-accent-focus',
				]"
			>
			<div class="relative flex flex-col justify-center items-center gap-2">
				<!-- Icon image -->
				<img
					:src="value.MENU_ICON"
					alt=""
					class="w-18 h-18 md:w-36 md:h-24 object-contain"
				/>
				<!-- Title for the icon -->
				<p
					class="text-neutral z-10 text-center w-full flex-grow-0 overflow-hidden text-ellipsis relative align-middle font-poppinssl font-bold text-md"
				>
					{{ value.MENU_TITLE }}
				</p>
			</div>
			</RouterLink>
		</div>
	</section>
</template>
<style>
/* Styles for navigation buttons in the card swiper component */
.container-cards .swiper-button-prev,
.container-cards .swiper-button-next {
	color: rgb(255, 255, 255); /* Set button text color to white */
	top: var(
		--swiper-navigation-top-offset,
		20%
	); /* Position from the top, with a fallback value */
}

.container-cards .swiper-button-prev:after,
.container-cards .swiper-button-next:after {
	font-size: 15px; /* Set font size for the button icons */
}

.container-cards .swiper-button-prev {
	left: var(
		--swiper-navigation-sides-offset,
		-4px
	); /* Position the previous button to the left, with a fallback value */
}

.container-cards .swiper-button-next {
	right: var(
		--swiper-navigation-sides-offset,
		-4px
	); /* Position the next button to the right, with a fallback value */
}
</style>

<!-- FILE DOCUMENTED -->

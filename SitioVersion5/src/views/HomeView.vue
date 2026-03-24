
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'; // Import necessary Vue functions
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Import a component for animated placeholders
import { getPromotional2 } from '@/utils/configHome'; // Import utility function to get promotional data
import { useGetInfoFirestore } from '../composables/useInfoFirestore'; // Import function to get banners data from firestore

export default defineComponent({
	components: {
		AnimatedPlaceholder, // Register the AnimatedPlaceholder component
		SliderNormalComponent: defineAsyncComponent(
			// Define an async component for normal slider
			() => import('../components/Carousel.vue') // Lazy load Carousel component
		),
		BannerSlider8Component: defineAsyncComponent(
			// Define an async component for Banner Slider 8
			() => import('../components/BannerV8.vue') // Lazy load BannerV8 component
		),
		BannerSlider9Component: defineAsyncComponent(
			// Define an async component for Banner Slider 9
			() => import('../components/BannerV9.vue') // Lazy load BannerV9 component
		),
		InfoIconsComponent5: defineAsyncComponent(
			// Define an async component for Info Icons 5
			() => import('../components/InfoIcons5.vue') // Lazy load InfoIcons5 component
		),
		CardsIconsComponent: defineAsyncComponent(
			// Define an async component for Cards Icons
			() => import('../components/CardsIcons.vue') // Lazy load CardsIcons component
		),
		BonusCardsComponent: defineAsyncComponent(
			// Define an async component for Bonus Cards
			() => import('../components/BonusCards.vue') // Lazy load BonusCards component
		),
		InfoText: defineAsyncComponent(
			// Define an async component for Info Text
			() => import('../components/InfoText.vue') // Lazy load InfoText component
		),
		PromotionCardsComponent: defineAsyncComponent(
			// Define an async component for Promotion Cards
			() => import('../components/PromotionCards.vue') // Lazy load PromotionCards component
		),
		InfoIconsComponent: defineAsyncComponent(
			// Define an async component for Info Icons
			() => import('../components/InfoIcons.vue') // Lazy load InfoIcons component
		),
		TextIconComponent: defineAsyncComponent(
			// Define an async component for Text with Icon
			() => import('../components/TextIconComponents/TextWithIcon.vue') // Lazy load TextWithIcon component
		),
		InfoIconsComponent3: defineAsyncComponent(
			// Define an async component for Info Icons 3
			() => import('../components/InfoIcons3.vue') // Lazy load InfoIcons3 component
		),
		CardsImageComponent: defineAsyncComponent(
			// Define an async component for Cards Image
			() => import('../components/CardsImage.vue') // Lazy load CardsImage component
		),
		CardsNormalComponent: defineAsyncComponent(
			// Define an async component for Normal Cards
			() => import('../components/CardsNormal.vue') // Lazy load CardsNormal component
		),
		SliderCasinoComponent: defineAsyncComponent(
			// Define an async component for Casino Slider
			() => import('../components/CasinoSlider.vue') // Lazy load CasinoSlider component
		),
		Carousel3Component: defineAsyncComponent(
			// Define an async component for Carousel 3
			() => import('../components/Carousel3.vue') // Lazy load Carousel3 component
		),
		Carousel7Component: defineAsyncComponent(
			// Define an async component for Carousel 7
			() => import('../components/Carousel7.vue') // Lazy load Carousel7 component
		),
		Carousel4Component: defineAsyncComponent(
			// Define an async component for Carousel 4
			() => import('../components/Carousel4.vue') // Lazy load Carousel4 component
		),
		SliderCasino3Component: defineAsyncComponent(
			// Define an async component for Casino Slider 3
			() => import('../components/CasinoSlider3.vue') // Lazy load CasinoSlider3 component
		),
		SliderCasino7Component: defineAsyncComponent(
			// Define an async component for Casino Slider 7
			() => import('../components/CasinoSlider7.vue') // Lazy load CasinoSlider7 component
		),
		SliderCasino8Component: defineAsyncComponent(
			// Define an async component for Casino Slider 8
			() => import('../components/CasinoSlider8.vue') // Lazy load CasinoSlider8 component
		),
		SliderCasino9Component: defineAsyncComponent(
			// Define an async component for Casino Slider 9
			() => import('../components/CasinoSlider9.vue') // Lazy load CasinoSlider9 component
		),
		SliderCasino5Component: defineAsyncComponent(
			// Define an async component for Casino Slider 5
			() => import('../components/CasinoSlider5.vue') // Lazy load CasinoSlider5 component
		),
		MenuCasino3Component: defineAsyncComponent(
			// Define an async component for Menu Casino 3
			() => import('../components/menus/MenuCasino3.vue') // Lazy load MenuCasino3 component
		),
		MenuProviders3Component: defineAsyncComponent(
			// Define an async component for Menu Providers 3
			() => import('../components/menus/MenuProviders3.vue') // Lazy load MenuProviders3 component
		),
		Menu8Component: defineAsyncComponent(
			// Define an async component for Menu 8
			() => import('../components/menus/Menu8.vue') // Lazy load Menu8 component
		),
		WidgetCarouselComponent: defineAsyncComponent(
			// Define an async component for Widget Carousel
			() => import('../components/alternarWidgets/WTopEventCarousel.vue') // Lazy load WTopEventCarousel component
		),
		WidgetCarousel2Component: defineAsyncComponent(
			// Define an async component for Widget Carousel 2
			() => import('../components/alternarWidgets/WTopEventCarousel2.vue') // Lazy load WTopEventCarousel2 component
		),
		SearchGames: defineAsyncComponent(
			// Define an async component for Search Games
			() => import('../components/SearchGames.vue') // Lazy load SearchGames component
		),
		ReelsComponent: defineAsyncComponent(
			// Define an async component for Reels
			() => import('../components/Reels.vue') // Lazy load Reels component
		),
		SeoP: defineAsyncComponent(() => import('../components/SeoP.vue')), // Define an async component for SEO
		JackpotsComponent: defineAsyncComponent(
			// Define an async component for Jackpots
			() => import('../components/Jackpots.vue') // Lazy load Jackpots component
		),
		Jackpots2Component: defineAsyncComponent(
			// Define an async component for Jackpots 2
			() => import('../components/Jackpots2.vue') // Lazy load Jackpots2 component
		),
		Jackpots3Component: defineAsyncComponent(
			// Define an async component for Jackpots 3
			() => import('../components/Jackpots3.vue') // Lazy load Jackpots3 component
		),
        JackpotWinnerComponent: defineAsyncComponent(
            // Define an async component for Jackpots 3
            () => import('../components/JackpotWinners.vue') // Lazy load Jackpots3 component
        ),
		BannerSlider6: defineAsyncComponent(
			// Define an async component for Banner Slider 6
			() => import('../components/BannerSlider6.vue') // Lazy load BannerSlider6 component
		),
		PromotionalCards: defineAsyncComponent(
			// Define an async component for Promotional Cards
			() => import('../components/PromotionalCards.vue') // Lazy load PromotionalCards component
		),
		PromotionalCards2: defineAsyncComponent(
			// Define an async component for Promotional Cards 2
			() => import('../components/PromotionalCards2.vue') // Lazy load PromotionalCards2 component
		),
		Menu6: defineAsyncComponent(
			// Define an async component for Menu 6
			() => import('../components/menus/Menu6.vue') // Lazy load Menu6 component
		),
		SliderGamesV2: defineAsyncComponent(
			// Define an async component for Slider Games V2
			() => import('../components/SliderGamesV2.vue') // Lazy load SliderGamesV2 component
		),
		JackpotPlaytechMain: defineAsyncComponent(
			// Define an async component for Playtech Jackpot
			() => import('@/components/JackpotPlaytech.vue') // Lazy load JackpotPlaytech component
		),
		AccessMenuWidget: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets library
			() => import('../components/widgetsComponents/AccessMenu.vue') 
		),
		CasinoGames: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets libray
			() => import('../components/widgetsComponents/CarouselCasino.vue') 
		),
		CarouselCategoryProviderCards: defineAsyncComponent(
			// Define an async component for categories or providers from @tecnologia-general/virtualsoft-widgets library
			() => import('../components/widgetsComponents/CategoriesAndProviders.vue') 
		),
		JackpotsContainer: defineAsyncComponent(
			// Define an async component for jackpots from @tecnologia-general/virtualsoft-widgets library
			() => import('../components/widgetsComponents/JackpotsContainer.vue') 
		),
	},
	data() {
		let config = this.$config(); // Retrieve configuration data
		let appComponent: any = this.$appComponent; // Get application component data
		let banners: any = []; // Initialize banners array
		let data: any = []; // Initialize data array
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // Initialize login status
		let login2: string = ''; // Initialize alternate login status
		const components: any = ref([]); // Reactive reference for components
		let background: string = ''; // Initialize background variable
		let loading: boolean = true; // Loading state
		let PROMOTIONS: any = []; // Initialize promotions array

		// Determine device type based on app component mobile status
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Set login status based on session state
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Set alternate login status based on session state
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		PROMOTIONS = getPromotional2(appComponent); // Get promotional data

		// Retrieve banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_home'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_home'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['home'] != undefined &&
			config['components_']['home'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['home'][
				config['components_']['home'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['home'][
				config['components_']['home'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['home'][
						config['components_']['home'].findIndex(
							(item) => item.id == 'Carousel3Component'
						)
					]['banners']
				)
			);
		} else {
			if (
				config != undefined &&
				config[device] != undefined &&
				config[device][appComponent.country] != undefined &&
				config[device][appComponent.country][appComponent.lngProd] !=
					undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				] != undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				]['home'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['home']
					)
				);
			}
		}

		// Retrieve bonus promotion data based on configuration
		if (
			config != undefined &&
			config['BONUS_PROMOTION'] != undefined &&
			config['BONUS_PROMOTION'][appComponent.country] != undefined &&
			config['BONUS_PROMOTION'][appComponent.country][
				appComponent.lngProd
			] != undefined &&
			config['BONUS_PROMOTION'][appComponent.country][
				appComponent.lngProd
			][login] != undefined
		) {
			data = JSON.parse(
				JSON.stringify(
					config['BONUS_PROMOTION'][appComponent.country][
						appComponent.lngProd
					][login]
				)
			);
		}

		// Populate components with banners and data
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['home'] != undefined
		) {
			config['components_']['home'].forEach((component: any) => {
				component.banners = banners; // Assign banners to component
				component.data = data; // Assign data to component
				components.value.push(component); // Add component to reactive array
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['home'] != undefined
			) {
				config['components'][appComponent.country]['home'].forEach(
					(component: any) => {
						component.banners = banners; // Assign banners to component
						component.data = data; // Assign data to component
						components.value.push(component); // Add component to reactive array
					}
				);
			}
		}
		return {
			config, // Return configuration data
			appComponent, // Return application component data
			banners, // Return banners
			data, // Return data
			device, // Return device type
			login, // Return login status
			components, // Return reactive components array
			background, // Return background variable
			loading, // Return loading state
			PROMOTIONS, // Return promotions
		};
	},
	beforeMount() {
		// Set background image before component mounts
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['backgrounds'] != undefined &&
			this.config['not_login']['backgrounds']['bg_home'] != undefined
		) {
			this.background =
				this.config['not_login']['backgrounds']['bg_home']; // Assign background image
		}
	},
	//Get banners data from Firebase
    async created() {
        const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_home', { useLogin: true, useScope: true });
        if (firestoreBanners?.length) {
            this.banners = firestoreBanners;
        }
    },
    watch: {
        async 'appComponent.session.logueado'(newVal) {
            const login2 = newVal ? 'login' : 'not_login';
			//Get banners data from Firebase
            let fsbanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_home', { useLogin: true, useScope: true });
            if (fsbanners?.length) {
                this.banners = fsbanners;
                return;
            }
			//Get banners data from config
			let cfbanners: any[] = []
            if (this.config?.[login2]?.[this.appComponent.lngProd]?.banners?.banner_home) {
                cfbanners = JSON.parse(
                    JSON.stringify(this.config[login2][this.appComponent.lngProd].banners.banner_home),
                );
            }
			this.banners = cfbanners
        },
    },

    mounted() {
        // Set loading state to false after a timeout
        setTimeout(() => {
            this.loading = false; // Update loading state
        }, 1000);
    },
});
</script>
<template>
	<!-- Main container for the component, conditionally rendered based on layout -->
	<div
		v-if="appComponent.config.layout != 6"
		v-show="!loading"
		:style="{
			backgroundImage: 'url(' + background + ')',
			backgroundSize: 'cover',
		}"
	>
		<!-- Loop through components and render each one -->
		<div v-for="component in components" :key="component.id">
			<component
                :class="appComponent.infoApp && !(
                    component.id == 'Carousel3Component' ||
                    component.id == 'JackpotsComponent' ||
                    component.id == 'Jackpots2Component' ||
                    component.id == 'Jackpots3Component' ||
                    component.id == 'SeoP'
                )
                    ? 'hidden'
                    : ''
                "
				:is="component.id"
				:promotions="PROMOTIONS"
				:images="['Carousel','Banner', 'Slider'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
				:shadow="component.shadow"
				:media="component.data"
				:data="component.data2"
				:url="component.url"
				:title="component.title"
				:category="component.category"
				:typelobby="component.typelobby"
				:limit="component.limit"
				:decorationBar="component.decorationBar"
				:lowerCaseText="component.lowerCaseText"
				:top="component.top"
				:eventCount="component.eventCount"
				:sportId="component.sportId"
				:reelsCategories="component.reelsCategories"
				:keySlide="component.keySlide"
				:colorBg="component.colorBg"
				:styleVersion="component.styleVersion"
				:bannersWidget="component.bannersWidget"
				:type="component.type"
				:tokens="component.tokens"
				:action="component.action"
				:user="component.user"
				:icon="component.icon"
				:textStyle="component.textStyle"
				:text="component.text"
				:decorationText="component.decorationText"
				:widthF="component.widthF"
			></component>
		</div>
	</div>
	<!-- Alternative layout for when layout equals 6 -->
	<div
		v-else-if="appComponent.config.layout == 6"
		v-show="!loading"
		class="flex flex-col justify-start items-center gap-8 lg:gap-6 h-full w-full px-0 pt-4 tablet:px-4 desktop:px-16 lg:pt-6"
	>
		<!-- Loop through components and render each one with index -->
		<component
			v-for="(component, index) in components"
			:key="index"
			:is="component.id"
			:images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
			:shadow="component.shadow"
			:media="component.data"
			:data="component.data"
			:url="component.url"
			:title="component.title"
			:category="component.category"
			:typelobby="component.typelobby"
			:limit="component.limit"
			:decorationBar="component.decorationBar"
			:lowerCaseText="component.lowerCaseText"
			:top="component.top"
			:eventCount="component.eventCount"
			:sportId="component.sportId"
			:reelsCategories="component.reelsCategories"
			:keySlide="component.keySlide"
			:colorBg="component.colorBg"
			:styleVersion="component.styleVersion"
			:bannersWidget="component.bannersWidget"
			:type="component.type"
			:tokens="component.tokens"
			:action="component.action"
			:user="component.user"
			:icon="component.icon"
			:textStyle="component.textStyle"
			:text="component.text"
			:decorationText="component.decorationText"
		></component>
	</div>
</template>

<!-- FILE DOCUMENTED -->
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFavoriteGames } from '@/composables/useFavoriteGames';
import { useGlobalStore } from '@/stores/global';
import { useGetInfoFirestore } from '../../composables/useInfoFirestore';
/**
 * Main component definition for the casino layout.
 */
export default defineComponent({
	components: {
		// Asynchronously load various components used in the layout
		SearchGames2: defineAsyncComponent(
			() => import('../../components/search/SearchGames.vue')
		),
		Carousel3V2Component: defineAsyncComponent(
			() => import('../../components/Carousel3V2.vue')
		),
		GamesGridV3Component: defineAsyncComponent(
			() => import('../../components/GamesGridV3.vue')
		),
		SearchGames: defineAsyncComponent(
			() => import('../../components/SearchGames.vue')
		),
		Carousel7Component: defineAsyncComponent(
			() => import('../../components/Carousel7.vue')
		),
		CategoriesGamesComponent: defineAsyncComponent(
			() => import('../../components/CategoriesGames.vue')
		),
		MenuCasino3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3.vue')
		),
		MenuCasino3V2Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3V2.vue')
		),
		MenuCasino4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino4.vue')
		),
		MenuCasino6: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino6.vue')
		),
		PromotionCardsComponent: defineAsyncComponent(
			() => import('../../components/PromotionCards.vue')
		),
		MenuProviders3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3.vue')
		),
		MenuProviders4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders4.vue')
		),
		MenuProviders6: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders6.vue')
		),
		MenuProviders3V2Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3V2.vue')
		),
		SliderCasino3Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3.vue')
		),
		SliderCasino5Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider5.vue')
		),
		SliderCasino3V2Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3V2.vue')
		),
		GamesGridV2Component: defineAsyncComponent(
			() => import('../../components/GamesGridV2.vue')
		),
		GamesGrid: defineAsyncComponent(
			() => import('../../components/GamesGrid.vue')
		),
		WidgetCarouselComponent: defineAsyncComponent(
			() =>
				import('../../components/alternarWidgets/WTopEventCarousel.vue')
		),
		SliderGamesComponent: defineAsyncComponent(
			() => import('../../components/SliderGames.vue')
		),
		SliderGamesTopComponent: defineAsyncComponent(
			() => import('../../components/SliderGamesTop.vue')
		),
		JackpotsComponent: defineAsyncComponent(
			() => import('../../components/Jackpots.vue')
		),
		Jackpots2Component: defineAsyncComponent(
			() => import('../../components/Jackpots2.vue')
		),
		JackpotWinnerComponent: defineAsyncComponent(
			() => import('../../components/JackpotWinners.vue')
		),
        Jackpots4Component: defineAsyncComponent(
            () => import('../../components/Jackpots4.vue')
        ),
		TextIconComponent: defineAsyncComponent(
			() => import('../../components/TextIconComponents/TextWithIcon.vue')
		),
		Jackpots3Component: defineAsyncComponent(
			() => import('../../components/Jackpots3.vue')
		),
		BannerSlider6: defineAsyncComponent(
			() => import('../../components/BannerSlider6.vue')
		),
		BannerSlider9Component: defineAsyncComponent(
			() => import('../../components/BannerV9.vue')
		),
		BannerSlider8Component: defineAsyncComponent(
			() => import('../../components/BannerV8.vue')
		),
		PromotionalCards: defineAsyncComponent(
			() => import('../../components/PromotionalCards.vue')
		),
		Menu6: defineAsyncComponent(
			() => import('../../components/menus/Menu6.vue')
		),
		SliderGamesV2: defineAsyncComponent(
			() => import('../../components/SliderGamesV2.vue')
		),
		Menu8Component: defineAsyncComponent(
			() => import('../../components/menus/Menu8.vue')
		),
		SliderCasino8Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider8.vue')
		),
		SliderCasino9Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider9.vue')
		),
		JackpotPlaytechMain: defineAsyncComponent(
			() => import('@/components/JackpotPlaytech.vue')
		),
		SliderNormalComponent: defineAsyncComponent(
			() => import('../../components/Carousel.vue')
		),
		InfoIconsComponent5: defineAsyncComponent(
			() => import('../../components/InfoIcons5.vue')
		),
		CardsIconsComponent: defineAsyncComponent(
			() => import('../../components/CardsIcons.vue')
		),
		BonusCardsComponent: defineAsyncComponent(
			() => import('../../components/BonusCards.vue')
		),
		InfoText: defineAsyncComponent(
			() => import('../../components/InfoText.vue')
		),
		InfoIconsComponent: defineAsyncComponent(
			() => import('../../components/InfoIcons.vue')
		),
		InfoIconsComponent3: defineAsyncComponent(
			() => import('../../components/InfoIcons3.vue')
		),
		CardsImageComponent: defineAsyncComponent(
			() => import('../../components/CardsImage.vue')
		),
		CardsNormalComponent: defineAsyncComponent(
			() => import('../../components/CardsNormal.vue')
		),
		SliderCasinoComponent: defineAsyncComponent(
			() => import('../../components/CasinoSlider.vue')
		),
		Carousel3Component: defineAsyncComponent(
			() => import('../../components/Carousel3.vue')
		),
		Carousel4Component: defineAsyncComponent(
			() => import('../../components/Carousel4.vue')
		),
		SliderCasino7Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider7.vue')
		),
		WidgetCarousel2Component: defineAsyncComponent(
			() =>
				import(
					'../../components/alternarWidgets/WTopEventCarousel2.vue'
				)
		),
		ReelsComponent: defineAsyncComponent(
			() => import('../../components/Reels.vue')
		),
		SeoP: defineAsyncComponent(() => import('../../components/SeoP.vue')),
		PromotionalCards2: defineAsyncComponent(
			() => import('../../components/PromotionalCards2.vue')
		),
		AccessMenuWidget: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/AccessMenu.vue') 
		),
		CasinoGames: defineAsyncComponent(
			// Define an async component for carousel games from @tecnologia-general/virtualsoft-widgets libray
			() => import('../../components/widgetsComponents/CarouselCasino.vue') 
		),
		CarouselCategoryProviderCards: defineAsyncComponent(
			// Define an async component for categories or providers from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/CategoriesAndProviders.vue') 
		),
		JackpotsContainer: defineAsyncComponent(
			// Define an async component for jackpots from @tecnologia-general/virtualsoft-widgets library
			() => import('../../components/widgetsComponents/JackpotsContainer.vue') 
		),
	},
	data() {
		// Declare reactive data properties for the component
		let promotions: any = [];
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Access application component
		let banners: any = []; // Store banner data
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // User login status
		let login2: string = ''; // Alternate login status
		let bgGame: any = {}; // Background game data
		let preloaderShow: boolean = false; // Preloader visibility
		let showMore: boolean = false; // Show more toggle
		let selections: any = ''; // User selections
		let categoryId = ''; // Selected category ID
		let providerId = ''; // Selected provider ID
		let optionsGames: any = ''; // Game options
		let partnerG: any = ''; // Partner information
		let limitConfig: any = ''; // Limit configuration
		let urlVirtualplay: any = ''; // URL for virtual play
		let gamesList: any = ''; // List of games
		let limit: any = ''; // Limit for games
		let total_count: any = null; // Total count of items
		let offset: any = null; // Offset for pagination
		let providers: any = ''; // List of providers
		let categories: any = ''; // List of categories
		let providersLength: any = ''; // Length of providers
		let categoriesLength: any = ''; // Length of categories
		const components: any = ref([]); // Reactive array for components
		let storeCasinoLobby = useGlobalStore(); // Global store for casino lobby state
				// Determine device type based on app component
		let favoriteGames: any[] = [];
		// device
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else if (appComponent.mobile == '1') {
			device = 'bannersMobile';
		}

		// Set login status based on session
		login = appComponent.session.logueado ? 'login' : 'notLogin';
		login2 = appComponent.session.logueado ? 'login' : 'not_login';

		// banners
				// Retrieve banners based on configuration and user login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_casino'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_casino'
					]
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
				]['casino'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['casino']
				)
			);
			}
		}

		// Populate components based on configuration
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['casino'] != undefined
		) {
			config['components_']['casino'].forEach((component: any) => {
				components.value.push(component);
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['casino'] !=
					undefined
			) {
			config['components'][appComponent.country]['casino'].forEach(
				(component: any) => {
						component.banners = banners; // Assign banners to component
					components.value.push(component);
				}
			);
		}
		}
		return {
			promotions,
			config,
			appComponent,
			banners,
			device,
			login,
			components,
			bgGame,
			preloaderShow,
			showMore,
			selections,
			categoryId,
			providerId,
			partnerG,
			optionsGames,
			limitConfig,
			limit,
			urlVirtualplay,
			gamesList,
			total_count,
			offset,
			categories,
			providers,
			categoriesLength,
			providersLength,
			favoriteGames,
			storeCasinoLobby
		};
	},
	setup() {
		const route = useRoute(); // Access the current route
		let gameId: any = ref(route.params.GameId); // Reactive reference for game ID
		let categoryId: any = ref(route.params.CategoryId); // Reactive reference for category ID
		let providerId: any = ref(route.params.ProviderId); // Reactive reference for provider ID
		return {
			gameId,
			categoryId,
			providerId,
		};
	},
	async created() {
		//Get banners data from Firebase
		const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_casino', { useLogin: true, useScope: true });
		if (firestoreBanners?.length) {
			this.banners = firestoreBanners;
        }
    },
	mounted() {
		// Set background color if layout is not 6
		if (this.appComponent.config.layout != 6) {
			this.$nextTick(() => {
				(
					document.getElementsByClassName(
						'main-container'
					) as HTMLCollectionOf<HTMLElement>
				)[0].style.setProperty(
					'background-color',
					'transparent',
					'important'
				);
			});
		}
		// Open game if game ID is defined
		if (this.gameId != undefined) {
			this.appComponent.openLink = true;
			this.appComponent.openGame({ id: this.gameId });
		}
		this.loadFavorites();
	},
	methods: {
		async loadFavorites() {
			const emitter = this.$root?.$options?.appContext?.config?.globalProperties?.emitter;
			const { getFavoriteGames } = useFavoriteGames(this.appComponent, emitter);
			this.favoriteGames = await getFavoriteGames();
		},
	},
	watch: {
    	'$route.path': {
        	immediate: true,
        	handler() {
            	if (this.storeCasinoLobby) {
                	this.storeCasinoLobby.category = 'all';
                	this.storeCasinoLobby.provider = 'all';
            	}
        	}
	    }
	},
});
</script>

<template>
	<!-- Main container for rendering components dynamically -->
	<div
		v-for="component in components"
		:key="component.id"
		:class="
			appComponent.config.layout == 6
				? 'flex flex-col justify-start items-center gap-8 lg:gap-6 h-full w-full px-0 pt-4 tablet:px-4 desktop:px-16 lg:pt-6'
				: ''
		"
	>
		<!-- Dynamically render each component with its respective props -->
		<component
			:is="component.id"
			:images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
			:shadow="component.shadow"
			:url="component.url"
			:title="component.title"
			:category="component.category"
			:typelobby="component.typelobby"
			:limit="component.limit"
			:top="component.top"
			:data="['CasinoGames', 'JackpotsContainer', 'CarouselCategoryProviderCards', 'AccessMenuWidget'].includes(component.id) ?  component.data2 :  component.data "
			:type="component.type"
			:action="component.action"
			:user="component.user"
			:icon="component.icon"
			:media="component.promotions"
			:decorationBar="component.decorationBar"
			:lowerCaseText="component.lowerCaseText"
			:width="component.width"
			:styleVersion="component.styleVersion"
			:keySlide="component.keySlide"
		></component>
	</div>
</template>

<!-- FILE DOCUMENTED -->

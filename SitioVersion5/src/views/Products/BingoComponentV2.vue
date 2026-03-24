<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'; // Import necessary Vue functions and components
import AppCarousel from '@/components/Carousel.vue'; // Import main carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import { useGetInfoFirestore } from '../../composables/useInfoFirestore'; // Import function to get banners data from firestore

export default defineComponent({
	components: {
		AppCarousel, // Register AppCarousel component
		favoriteIcon, // Register favoriteIcon component
		searchIcon, // Register searchIcon component
		IconClose, // Register IconClose component
		animatedCloseIcon, // Register animatedCloseIcon component
		// Define async components for lazy loading
		lobbyBingos: defineAsyncComponent(
			() => import('../../views/Promotions/Bingos.vue') // Async import for Bingo promotions view
		),
		MenuCasino3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3.vue') // Async import for Casino menu component
		),
		MenuProviders3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3.vue') // Async import for Providers menu component
		),
		SliderCasino3V2Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3V2.vue') // Async import for Casino slider component
		),
		Carousel3Component: defineAsyncComponent(
			() => import('../../components/Carousel3.vue') // Async import for Carousel3 component
		),
		Carousel3V2Component: defineAsyncComponent(
			() => import('../../components/Carousel3V2.vue') // Async import for Carousel3V2 component
		),
		MenuCasino6: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino6.vue') // Async import for Casino menu component
		),
		MenuProviders6: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders6.vue') // Async import for Providers menu component
		),
		GamesGrid: defineAsyncComponent(
			() => import('../../components/GamesGrid.vue') // Async import for Games grid component
		),
		SliderCasino3Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3.vue') // Async import for Casino slider component
		),
		BannerSlider6: defineAsyncComponent(
			() => import('../../components/BannerSlider6.vue') // Async import for Banner slider component
		),
		SliderGamesV2: defineAsyncComponent(
			() => import('../../components/SliderGamesV2.vue') // Async import for SliderGamesV2 component
		),
		Carousel7Component: defineAsyncComponent(
			() => import('../../components/Carousel7.vue') // Async import for Carousel7 component
		),
		MenuCasino4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino4.vue') // Async import for Casino menu component
		),
		MenuProviders4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders4.vue') // Async import for Providers menu component
		),
	},
	data: function () {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Reference to the application component
		let device: string = ''; // Device type (desktop/mobile)
		let login: string = ''; // Login status
		let login2: string = ''; // Alternative login status
		let banners: any = []; // Array to hold banner data
		const components: any = ref([]); // Reactive reference for components
		const components2: any = ref([]); // Another reactive reference for components

		// Determine device type based on appComponent.mobile value
		if (appComponent.mobile == '') {
			device = 'bannersDesktop'; // Set to desktop banners
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile'; // Set to mobile banners
			}
		}

		// Determine login status based on session
		if (appComponent.session.logueado) {
			login = 'login'; // User is logged in
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin'; // User is not logged in
			}
		}

		// Set alternative login status
		if (appComponent.session.logueado) {
			login2 = 'login'; // User is logged in
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login'; // User is not logged in
			}
		}

		// Retrieve banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_bingo'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_bingo'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['bingo'] != undefined &&
			config['components_']['bingo'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['bingo'][
				config['components_']['bingo'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['bingo'][
				config['components_']['bingo'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['bingo'][
						config['components_']['bingo'].findIndex(
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
				]['bingo'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['bingo']
					)
				);
			}
		}

		// Populate components with banners based on configuration
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['bingo'] != undefined
		) {
			config['components_']['bingo'].forEach((component: any) => {
				component.banners = banners; // Assign banners to component
				components.value.push(component); // Add component to components array
				components2.value.push(component); // Add component to components2 array
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['bingo'] != undefined
			) {
				config['components'][appComponent.country]['bingo'].forEach(
					(component: any) => {
						component.banners = banners; // Assign banners to component
						components.value.push(component); // Add component to components array
						components2.value.push(component); // Add component to components2 array
					}
				);
			}
		}

		// Insert lobby component into components2 array if MenuCasino3Component is present
		components2.value.forEach((item: any, index) => {
			if (item.id == 'MenuCasino3Component') {
				const lobby = {
					id: 'lobbyBingos', // Define lobby component
				};
				components2.value = components2.value.splice(0, index + 1); // Trim components2 array
				components2.value.push(lobby); // Add lobby component
			}
		});

		// Return reactive data properties
		return {
			config,
			appComponent,
			device,
			login,
			banners,
			components,
			components2,
		};
	},
	async created(){
		const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_bingo', { useLogin: true, useScope: true });
		if (firestoreBanners?.length) {
			this.banners = firestoreBanners
        }
	},
	mounted() {
		// Check if lobby configuration exists and set category ID if on Bingo route
		if (
			this.appComponent.config.bingos != undefined &&
			this.appComponent.config.bingos[this.appComponent.country] !=
				undefined &&
			this.appComponent.config.bingos[this.appComponent.country].lobby !=
				undefined &&
			this.appComponent.config.bingos[this.appComponent.country].lobby
		) {
			if (
				this.$route.fullPath == '/bingos' ||
				this.$route.fullPath == '/bingos/'
			)
				this.appComponent.selections.category.id = 'lobby'; // Set category ID to lobby
		}

		// Update login status based on session
		if (this.appComponent.session.logueado) {
			this.login = 'login'; // User is logged in
		} else {
			if (!this.appComponent.session.logueado) {
				this.login = 'notLogin'; // User is not logged in
			}
		}

		// Determine device type based on appComponent.mobile value
		if (this.appComponent.mobile == '') {
			this.device = 'bannersDesktop'; // Set to desktop banners
		} else {
			if (this.appComponent.mobile == '1') {
				this.device = 'bannersMobile'; // Set to mobile banners
			}
		}

		// Retrieve banners based on configuration and login status
		if (
			this.config != undefined &&
			this.config[this.device] != undefined &&
			this.config[this.device][this.appComponent.country] != undefined &&
			this.config[this.device][this.appComponent.country][
				this.appComponent.lngProd
			] != undefined &&
			this.config[this.device][this.appComponent.country][
				this.appComponent.lngProd
			][this.login] != undefined &&
			this.config[this.device][this.appComponent.country][
				this.appComponent.lngProd
			][this.login]['bingo'] != undefined
		) {
			this.banners = JSON.parse(
				JSON.stringify(
					this.config[this.device][this.appComponent.country][
						this.appComponent.lngProd
					][this.login]['bingo']
				)
			);
		}
	},
});
</script>
<template>
	<!-- Main container for the component, conditionally rendered based on contingencyCasino -->
	<div
		v-if="!appComponent.contingencyCasino"
		:class="
			appComponent.config.layout == 6
				? 'flex flex-col justify-start items-center gap-8 lg:gap-10 h-full w-full px-4 pt-4 lg:px-10 lg:pt-10'
				: ''
		"
		v-for="component in appComponent.selections != undefined &&
		appComponent.selections.category != undefined &&
		appComponent.selections.category.id != undefined &&
		appComponent.selections.category.id != '' &&
		appComponent.selections.category.id == 'lobby'
			? components2
			: components"
		:key="component.id"
	>
		<!-- Dynamic component rendering based on component ID -->
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
			:type="component.type"
			:id="component.id"
			:keySlide="component.keySlide"
		>
			></component
		>
	</div>
</template>
<style scoped>
/* Scoped styles for this component can be added here */
</style>

<!-- FILE DOCUMENTED -->

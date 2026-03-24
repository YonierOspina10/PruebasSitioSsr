<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useGetInfoFirestore } from '../composables/useInfoFirestore';
import router from '@/router';

export default defineComponent({
	components: {
		// Asynchronously load various components for better performance
		SliderNormalComponent: defineAsyncComponent(
			() => import('../components/Carousel.vue')
		),
		CardsIconsComponent: defineAsyncComponent(
			() => import('../components/CardsIcons.vue')
		),
		BonusCardsComponent: defineAsyncComponent(
			() => import('../components/BonusCards.vue')
		),
		PromotionCardsComponent: defineAsyncComponent(
			() => import('../components/PromotionCards.vue')
		),
		InfoIconsComponent: defineAsyncComponent(
			() => import('../components/InfoIcons.vue')
		),
		TextIconComponent: defineAsyncComponent(
			() => import('../components/TextIconComponents/TextWithIcon.vue')
		),
		InfoIconsComponent3: defineAsyncComponent(
			() => import('../components/InfoIcons3.vue')
		),
		CardsImageComponent: defineAsyncComponent(
			() => import('../components/CardsImage.vue')
		),
		CardsNormalComponent: defineAsyncComponent(
			() => import('../components/CardsNormal.vue')
		),
		SliderCasinoComponent: defineAsyncComponent(
			() => import('../components/CasinoSlider.vue')
		),
		Carousel3Component: defineAsyncComponent(
			() => import('../components/Carousel3.vue')
		),
		Carousel4Component: defineAsyncComponent(
			() => import('../components/Carousel4.vue')
		),
		SliderCasino3Component: defineAsyncComponent(
			() => import('../components/CasinoSlider3.vue')
		),
		WidgetCarouselComponent: defineAsyncComponent(
			() => import('../components/alternarWidgets/WTopEventCarousel.vue')
		),
		ReelsComponent: defineAsyncComponent(
			() => import('../components/Reels.vue')
		),
		SeoP: defineAsyncComponent(() => import('../components/SeoP.vue')),
		JackpotsComponent: defineAsyncComponent(
			() => import('../components/Jackpots.vue')
		),
	},
	data() {
		// Initialize component data
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Access application component
		let banners: any = []; // Array to hold banner data
		let data: any = []; // Array to hold additional data
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // Login status
		let login2: string = ''; // Alternate login status
		const components: any = ref([]); // Reactive reference for components
		let background: string = ''; // Background image URL

		// Determine device type based on app component
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
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Fetch banners based on configuration and login state
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
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_landing'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_landing'
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
				]['landing'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['landing']
					)
				);
			}
		}
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
		if (
			config != undefined &&
			config['components'] != undefined &&
			config['components'][appComponent.country] != undefined &&
			config['components'][appComponent.country]['home_landing'] !=
				undefined
		) {
			// Populate components for home landing
			config['components'][appComponent.country]['home_landing'].forEach(
				(component: any) => {
					component.banners = banners; // Assign banners to component
					component.data = data; // Assign data to component
					components.value.push(component); // Add component to reactive array
				}
			);
			setTimeout(() => {
				router.push('/home'); // Redirect to home after 4 seconds
			}, 4000);
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['home'] != undefined
			) {
				// Populate components for home
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
			config,
			appComponent,
			banners,
			data,
			device,
			login,
			components,
			background,
		};
	},
	//Get banners data from Firebase
    async created() {
        const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_home', { useLogin: true, useScope: true });
        if (firestoreBanners?.length) {
            this.banners = firestoreBanners;
        }
    },
	mounted() {
		// Set background image if available in configuration
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['backgrounds'] != undefined &&
			this.config['not_login']['backgrounds']['bg_home'] != undefined
		) {
			this.background =
				this.config['not_login']['backgrounds']['bg_home'];
		}
	},
});
</script>
<template>
	<!-- Main container with dynamic background image -->
	<div
		:style="{
			backgroundImage: 'url(' + background + ')',
			backgroundSize: 'cover',
		}"
	>
		<!-- Loop through components and render each one -->
		<div v-for="component in components" :key="component.id">
			<component
				:is="component.id"
				:images="['Carousel','Banner'].some(p => String(component.id).startsWith(p)) ? banners : component.banners"
				:shadow="component.shadow"
				:media="component.data"
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
			></component>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

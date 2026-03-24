<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useGetInfoFirestore } from '../../composables/useInfoFirestore';

/**
 * Main component definition for the casino section.
 */
export default defineComponent({
	components: {
		// Asynchronously load the MenuCasino3 component
		MenuCasino3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino3.vue')
		),
		// Asynchronously load the MenuCasino4 component
		MenuCasino4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuCasino4.vue')
		),
		// Asynchronously load the MenuProviders3 component
		MenuProviders3Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders3.vue')
		),
		JackpotWinnerComponent: defineAsyncComponent(
			() => import('../../components/JackpotWinners.vue')
		),
		// Asynchronously load the MenuProviders4 component
		MenuProviders4Component: defineAsyncComponent(
			() => import('../../components/menus/MenuProviders4.vue')
		),
		// Asynchronously load the SliderCasino3V2 component
		SliderCasino3V2Component: defineAsyncComponent(
			() => import('../../components/CasinoSlider3V2.vue')
		),
	},
	data() {
		// Retrieve configuration and application component
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let banners: any = [];
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // Login status
		let login2: string = ''; // Alternate login status
		const components: any = ref([]); // Reactive array for components

		// Determine device type based on appComponent's mobile property
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Set login status based on session information
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

		// Fetch banners based on various configuration conditions
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners']['banner_live_casino'] !=
				undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_live_casino'
					]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['casino'] != undefined &&
			config['components_']['casino'].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_']['casino'][
				config['components_']['casino'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_']['casino'][
				config['components_']['casino'].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_']['casino'][
						config['components_']['casino'].findIndex(
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
				]['casinoLive'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['casinoLive']
					)
				);
			}
		}

		// Populate components array with banners for casinoLive components
		if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_']['casinoLive'] != undefined
		) {
			config['components_']['casinoLive'].forEach((component: any) => {
				component.banners = banners; // Assign banners to component
				components.value.push(component); // Add component to reactive array
			});
		} else {
			if (
				config != undefined &&
				config['components'] != undefined &&
				config['components'][appComponent.country] != undefined &&
				config['components'][appComponent.country]['casinoLive'] !=
					undefined
			) {
				config['components'][appComponent.country][
					'casinoLive'
				].forEach((component: any) => {
					component.banners = banners; // Assign banners to component
					components.value.push(component); // Add component to reactive array
				});
			}
		}
		return {
			config,
			appComponent,
			banners,
			device,
			login,
			components,
		};
	},
	mounted() {
		// Log the components to the console after the component is mounted
		console.log(this.components);
	},
});
</script>

<template>
	<!-- Loop through components and render each one dynamically -->
	<div v-for="component in components" :key="component.id">
		<component
			:is="component.id"
			:images="component.banners"
			:shadow="component.shadow"
			:url="component.url"
			:title="component.title"
			:category="component.category"
			:typelobby="component.typelobby"
			:limit="component.limit"
			:top="component.top"
		></component>
	</div>
</template>

<!-- FILE DOCUMENTED -->

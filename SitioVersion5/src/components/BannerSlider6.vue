<template>
	<!-- Swiper container for displaying a carousel of images -->
	<swiper-container
		v-if="imagesCarouselRender.length > 0"
		:slides-per-view="1"
		:loop="true"
		:mousewheel-force-to-axis="true"
		:pagination="true"
		:pagination-clickable="true"
		:autoplay="true"
		:centered-slides="true"
		:autoplay-delay="3000"
		:autoplay-disable-on-interaction="false"
		:autoplay-pause-on-mouse-enter="true"
		:mousewheel="true"
		:direction="'horizontal'"
		:controller-control="'.swiper-1'"
		:injectStyles="[
			`
		.swiper-pagination-bullet {
		width: 20px;
		height: 8px;
		border-radius: 10px;
		background: #FFF;
		}
		.swiper-pagination-bullet-active {
		width: 40px;
		height: 8px;
		border-radius: 10px;
		background: #FFF;
		}
		@media (min-width: 1024px) {
		.swiper-pagination-bullet {
		width: 40px;
		height: 10px;
		border-radius: 10px;
		background: #FFF;
		}
		.swiper-pagination-bullet-active {
		width: 80px;
		height: 10px;
		border-radius: 10px;
		background: #FFF;
		}
		}
		`,
		]"
		class="w-full h-full max-w-[1156px] px-4 tablet:px-0"
	>
		<!-- Swiper slide for each banner image -->
		<swiper-slide
			v-for="(banner, index) in imagesCarouselRender"
			:key="banner.id"
			data-analytics-label="promo:banner:hero"
        	:data-analytics-id="banner.id"
			:data-analytics-position="index + 1"
       		:data-analytics-context="`component:BannerSlider6|layout:layout-${appComponent.config.layout}`"
			class="max-h-[220px] tablet:max-h-[280px] desktop:max-h-[447px] cursor-pointer overflow-hidden rounded-[15px] tablet:rounded-[30px] border tablet:border-2 border-primary-content/75"
		>
		<RouterLink :to="banner.redirect != undefined && banner.redirect != '' ? banner.redirect : '/'">
			<!-- Image element for the banner -->
			<img
				v-if="banner.urlFondo != '' && banner.urlFondo != undefined"
				:src="banner.urlFondo"
				alt=""
				class="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-1000 ease-in-out"
			/>
		</RouterLink>
		</swiper-slide>
	</swiper-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import { register } from 'swiper/element/bundle'; // Importing Swiper registration
import { useGetInfoFirestore } from '../composables/useInfoFirestore'; // Import function to get banners data from firestore

register(); // Registering Swiper elements

export default defineComponent({
	props: {
		type: { type: String, default: 'banner_home' }, // Prop to define the type of banner
	},
	setup() {
		return {}; // Setup function returns an empty object
	},
	data() {
		let imagesCarouselRender: any = []; // Array to hold images for the carousel
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Application component reference
		let device: string = 'bannersDesktop'; // Default device type
		let login: string = ''; // Login status variable
		let login2: string = ''; // Alternate login status variable
		let banners: any = []; // Array to hold banner data

		// Determine device type based on app component's mobile status
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Determine login status
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Set alternate login status
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Fetch banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners'][this.type] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][this.type]
				)
			);
		} else if (
			config != undefined &&
			config['components_'] != undefined &&
			config['components_'][this.type.replace('banner_', '')] != undefined &&
			config['components_'][this.type.replace('banner_', '')].findIndex(
				(item) => item.id == 'Carousel3Component'
			) > -1 &&
			config['components_'][this.type.replace('banner_', '')][
				config['components_'][this.type.replace('banner_', '')].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			] != undefined &&
			config['components_'][this.type.replace('banner_', '')][
				config['components_'][this.type.replace('banner_', '')].findIndex(
					(item) => item.id == 'Carousel3Component'
				)
			]['banners'] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config['components_'][this.type.replace('banner_', '')][
						config['components_'][this.type.replace('banner_', '')].findIndex(
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
				config[device][appComponent.country][appComponent.lngProd][login] !=
					undefined &&
				config[device][appComponent.country][appComponent.lngProd][login][
					this.type.replace('banner_', '')
				] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][appComponent.lngProd][login][
							this.type.replace('banner_', '')
						]
					)
				);
			}
		}
		return {
			imagesCarouselRender,
			banners,
			appComponent
		};
	},
	async created() {
    	this.applyAndFilterBanners(this.banners)
		const config = this.$config()
		const appComponent: any = this.$appComponent
		//The “key” must be in the format ‘banner_keyWord’.
		const key = this.type.includes("banner") ? this.type : `banner_${this.type}`
		//Get banners data from Firebase
		const firestoreBanners = await useGetInfoFirestore(config, appComponent, key, { useLogin: true, useScope: true })
		if (firestoreBanners?.length) {
			this.applyAndFilterBanners(firestoreBanners)
		}
 	},

	methods: {
		applyAndFilterBanners(list: any[]) {
			this.banners = list || []
			this.imagesCarouselRender = this.banners.filter((e: any) => {
			if (e === "null" || e === null){
				return false
			}
			if (
				(e.startDate == undefined || e.startDate == '') &&
				(e.date == undefined || e.date == '')
			) {
				return true; // Include if no date restrictions
			}
			let currentDate = new Date(); // Get current date
			currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
			if (
				e.startDate != undefined &&
				e.startDate != '' &&
				e.date != undefined &&
				e.date != ''
			) {
				let startDate = new Date(e.startDate); // Parse start date
				let endDate = new Date(e.date); // Parse end date
				return (
					currentDate.getTime() >= startDate.getTime() && // Check if current date is within range
					currentDate.getTime() <= endDate.getTime()
				);
			}
			if (
				(e.startDate != undefined || e.startDate != '') &&
				(e.date == undefined || e.date == '')
			) {
				let startDate = new Date(e.startDate); // Parse start date
				return currentDate.getTime() >= startDate.getTime(); // Check if current date is after start date
			}
			if (
				(e.startDate == undefined || e.startDate == '') &&
				(e.date != undefined || e.date != '')
			) {
				let endDate = new Date(e.date); // Parse end date
				return currentDate.getTime() <= endDate.getTime(); // Check if current date is before end date
			}
			return true; // Default case
			});
		},
	}	
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

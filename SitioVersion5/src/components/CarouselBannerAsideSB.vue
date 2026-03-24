<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary functions from Vue
import apiService from '@/services/ApiService'; // Import API service for data fetching
import AppCarousel from '@/components/Carousel.vue'; // Import carousel component
import favoriteIcon from '@/components/icons/favoriteIcon.vue'; // Import favorite icon component
import searchIcon from '@/components/icons/searchIcon.vue'; // Import search icon component
import IconClose from '@/components/icons/IconClose.vue'; // Import close icon component
import animatedCloseIcon from '@/components/icons/animatedCloseIcon.vue'; // Import animated close icon component
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Import left chevron icon component
import IconChevronRight from './icons/IconChevronRight.vue'; // Import right chevron icon component
import ExitIcon from './icons/ExitIcon.vue'; // Import exit icon component
import 'swiper/css'; // Import Swiper CSS for styling
import 'swiper/css/pagination'; // Import Swiper pagination styles
import 'swiper/css/navigation'; // Import Swiper navigation styles
import 'swiper/css/autoplay'; // Import Swiper autoplay styles
import { register } from 'swiper/element/bundle'; // Register Swiper elements
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules
register(); // Register Swiper modules

export default defineComponent({
	props: {
		banners: { type: Object, default: [] }, // Define 'banners' prop with default value
	},
	components: {
		AppCarousel, // Register AppCarousel component
		favoriteIcon, // Register favoriteIcon component
		searchIcon, // Register searchIcon component
		IconClose, // Register IconClose component
		animatedCloseIcon, // Register animatedCloseIcon component
		IconChevronLeft, // Register IconChevronLeft component
		IconChevronRight, // Register IconChevronRight component
		ExitIcon, // Register ExitIcon component
	},
	setup() {
		return {
			modules: [Autoplay, Pagination, Navigation], // Return Swiper modules for use in the template
		};
	},
	data: function () {
		let config = this.$config(); // Get configuration object
		let appComponent: any = this.$appComponent; // Get application component reference
		let colors: any = {}; // Initialize colors object
		let deviceTheme: string = 'theme_colors'; // Set default device theme
		return {
			config, // Return config object
			appComponent, // Return app component reference
			colors, // Return colors object
			deviceTheme, // Return device theme
		};
	},
	created() {
		// Lifecycle hook to set device theme based on configuration
		if (
			this.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		)
			this.deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
		else if (
			this.config.theme_colors_mobile != undefined &&
			this.config.mobileL != ''
		)
			this.deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
		this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
	},
	mounted() {},
	methods: {
		goToLink(link) {
			window.open(link, '_top'); // Open the specified link in the top window
		},
	},
});
</script>

<template>
	<section class="">
		<!-- Main section for displaying the Swiper carousel -->
		<swiper-container
			v-if="
				banners !== undefined && banners !== null && banners?.length > 0
			"
			id="swiper-container-banners"
			class="mySwiper"
			:space-between="10"
			:slides-per-view="'auto'"
			:autoplay-delay="3000"
			:autoplay-disable-on-interaction="false"
			:autoplay-pause-on-mouse-enter="true"
			:mousewheel="true"
			:mousewheel-force-to-axis="true"
			:direction="'horizontal'"
			:pagination="{
				clickable: true,
				renderBullet: (index, className) => {
					return (
						`<span class=&quot;` +
						className +
						`&quot;>` +
						(index + 1) +
						`</span>`
					);
				},
			}"
			:modules="modules"
			:injectStyles="[
				`
		.swiper-pagination-bullet {
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		font-size: 12px;
		color: #000;
		opacity: 1;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.2);
		}
		.swiper-pagination-bullet-active {
		color: #fff;
		width: 40px;
		background: ${colors.primary};
		}
		`,
			]"
		>
			<!-- Swiper slides for each banner -->
			<swiper-slide
				v-for="(banner, index) in banners"
				id="swiper-slide-banners-aside"
		        :data-analytics-id="banner.id"
        		:data-analytics-position="index + 1"
				data-analytics-label="promo:banner:mid"
        		:data-analytics-context="`component:CarouselBannerAsideSB|layout:layout-${appComponent.config.layout}`"
			>
				<button
					@click="goToLink(banner?.redirect)"
					class="carouselButton"
				>
					<img :src="banner?.url" class="banner" />
					<!-- Display banner image -->
				</button>
			</swiper-slide>
		</swiper-container>
	</section>
</template>

<style scoped>
.slider-casino::-webkit-scrollbar {
	display: none; /* Hide scrollbar for the slider */
}
.arrow:hover :nth-child(1) {
	color: white; /* Change color on hover for the first child of arrow */
}
</style>

<!-- FILE DOCUMENTED -->

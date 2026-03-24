<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import Vue composition API functions
import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper components for Vue
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules for functionality
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/pagination'; // Import Swiper pagination CSS
import 'swiper/css/navigation'; // Import Swiper navigation CSS

export default defineComponent({
	props: {
		images: Array, // Prop to receive an array of images
	},
	components: {
		Swiper, // Register Swiper component
		SwiperSlide, // Register SwiperSlide component
	},
  setup() {
		return {
			pagination: {
				clickable: true, // Enable clickable pagination bullets
				bulletClass: 'swiper-pagination-bullett', // Class for pagination bullets
				bulletActiveClass: 'swiper-pagination-bullett-active', // Class for active pagination bullet
				renderBullet: function (index, className) { // Function to render custom pagination bullets
					return (
						'<span class="mr-2 cursor-pointer hover:scale-110 mb-52 z-50' +
						className +
						'"></span>'
					);
				},
			},
			modules: [Autoplay, Pagination, Navigation], // Swiper modules to be used
		};
	},
	data() {
		let config = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Reference to the app component
		let imagesCarousel: any = this.images; // Reference to the images prop
		let imagesCarouselRender: any = undefined; // Rendered images for the carousel
		let interval: any = undefined; // Interval for autoplay
		let margin: number = 0; // Margin for layout
		let openLink: boolean = true; // Flag to control link opening
        let colors: any = {}; // Colors object for theming
		return {
			config,
			appComponent,
			imagesCarousel,
			imagesCarouselRender,
			interval,
			margin,
			openLink,
            colors
		};
	},
	watch: {
        images: {
            handler(newImages: any) {
                this.imagesCarousel = newImages;
                this.imagesCarouselRender = this.filterImagesByDates();
            },
        },
    },

    beforeMount() {
        this.imagesCarouselRender = this.filterImagesByDates();
    },
	mounted() {
        // Lifecycle hook to set device theme based on configuration
        let deviceTheme: string = 'theme_colors'; // Default device theme
        if (
            this.config.theme_colors_desktop != undefined &&
            this.config.mobileL == ''
        )
            deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
        else if (
            this.config.theme_colors_mobile != undefined &&
            this.config.mobileL != ''
        )
            deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
        this.colors = this.config[deviceTheme]; // Assign colors based on device theme
    },
	methods: {
		goToLink(link) { // Method to open a link
			window.open(link, '_top'); // Open link in the top window
		},
		filterImagesByDates() {
            return (this.imagesCarousel || []).filter((e: any) => {
                if (e === 'null' || e === null) return false;

                if ((!e.startDate || e.startDate === '') && (!e.date || e.date === '')) return true;

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                if (e.startDate && e.date) {
                    const startDate = new Date(e.startDate);
                    const endDate = new Date(e.date);
                    return currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime();
                }

                if (e.startDate && (!e.date || e.date === '')) {
                    const startDate = new Date(e.startDate);
                    return currentDate.getTime() >= startDate.getTime();
                }

                if ((!e.startDate || e.startDate === '') && e.date) {
                    const endDate = new Date(e.date);
                    return currentDate.getTime() <= endDate.getTime();
                }

                return true;
            });
        },
	},
});
</script>
<template>
	<section
		v-if="imagesCarouselRender.length > 0"
		class="w-full h-[600px] lg:h-[700px] -mb-32 md:-mb-40"
		:class="config.layout != undefined && config.layout == 4 ? 'after:absolute after:w-full after:h-40 after:bg-primary-content after:brightness-[0.6] after:left-0 after:z-1 after:bottom-0 relative after:shadow-primary-content after:shadow-[0px_-55px_100px_0px_,_0px_-6px_13px_7px]': ''"
	>
		<!-- Swiper Carrousel -->
		<Swiper
			:spaceBetween="0"
			:slidesPerView="1"
			:centeredSlides="true"
			:loop="true"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false,
			}"
			:navigation="true"
			:modules="modules"
			class="mySwiper relative"
            :class="appComponent.skeleton ? 'container-loading' : ''"
            :style="{
                '--swiper-navigation-color': colors.primary,
            }"
		>
			<SwiperSlide
				v-for="(banner, i) in imagesCarouselRender"
				:key="banner.id"
				data-analytics-label="promo:banner:hero"
        		:data-analytics-id="banner.id"
    		    :data-analytics-position="i + 1"
    		    :data-analytics-context="`component:Carousel3|layout:layout-${appComponent.config.layout}`"
				class="w-full h-full z-1"
				:id="'banner-' + i"
        :class="appComponent.skeleton ? 'conten-loading' : ''"
			>
				<div
					v-if="!appComponent.skeleton"
					class="w-full h-full flex justify-center items-center"
				>
					<img
						v-if="banner.urlFondo != '' && banner.urlFondo != undefined && i == 0"
						fetchpriority="high"
						:src="banner.urlFondo"
						alt=""
						width="960"
						height="540"
						class="w-full h-full object-cover object-top z-10"
					/>
					<img
						v-else-if="banner.urlFondo != '' && banner.urlFondo != undefined && i > 0"
						v-lazy="banner.urlFondo"
						alt=""
						width="960"
						height="540"
						class="w-full h-full object-cover object-top z-10"
					/>
					<div
						class="absolute -bottom-1 w-full h-60 bg-gradient-to-t from-neutral-content z-10"
					></div>
					<div
						class="w-full h-full flex flex-col md:flex-row items-center mt-0 md:mt-10 gap-0 md:gap-10 z-20 pb-52"
						:class="
							banner.url == '' ||
							banner.url == undefined ||
							banner.urlImg2 == '' ||
							banner.urlImg2 == undefined
								? 'absolute top-40 md:top-0 justify-center'
								: 'absolute top-0 justify-start md:justify-center'
						"
					>
						<button
							v-if="banner.url != '' && banner.url != undefined"
							@click="goToLink(banner.redirect); appComponent.gAnalytics('interaction_carrusel', banner.alt)"
							:class="$route.path != '/home' ? 'in': ''"
							class="w-[250px] lg:w-[450px] h-[250px] lg:h-[450px] flex justify-center items-center hover:scale-105"
							aria-label="Imagen promocion"
						>
							<img
								v-if="i == 0"
								fetchpriority="high"
								:src="banner.url"
								alt=""
								width="250"
								height="250"
								class="w-full h-full object-contain object-center"
							/>
							<img
								v-else
								v-lazy="banner.url"
								alt=""
								width="250"
								height="250"
								class="w-full h-full object-contain object-center"
							/>
						</button>
						<button
							v-if="banner.urlImg2 != '' && banner.urlImg2 != undefined"
							@click="goToLink(banner.redirect); ; appComponent.gAnalytics('interaction_carrusel', banner.alt)"
							:class="$route.path == '/' ? 'in': ''"
							class="w-[250px] lg:w-[450px] h-[250px] lg:h-[450px] flex justify-center items-center hover:scale-105"
							aria-label="Imagen promocion"
						>
							<img
								v-if="i == 0"
								fetchpriority="high"
								:src="banner.urlImg2"
								alt=""
								width="250"
								height="250"
								class="w-full h-full object-contain object-center"
							/>
							<img
								v-else
								v-lazy="banner.urlImg2"
								alt=""
								width="250"
								height="250"
								class="w-full h-full object-contain object-center"
							/>
						</button>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	</section>
</template>
<style scoped>
::v-deep .swiper-button-next,
::v-deep .swiper-button-prev {
  color: white !important; /* Puedes cambiar a cualquier color que desees */
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5)); /* Opcional: para mejorar la visibilidad */
}
.container-carousel {
	cursor: pointer; /* Pointer cursor for carousel container */
}
.container-carousel.active {
	cursor: grab !important; /* Grab cursor for active carousel */
}
.swiper {
	width: 100%; /* Full width for Swiper */
	height: 100%; /* Full height for Swiper */
}
.autoplay-progress {
	position: absolute; /* Positioning for autoplay progress */
	right: 16px; /* Right alignment */
	bottom: 16px; /* Bottom alignment */
	z-index: 10; /* Layering order */
	width: 48px; /* Width of progress indicator */
	height: 48px; /* Height of progress indicator */
	display: flex; /* Flexbox for centering */
	align-items: center; /* Center vertically */
	justify-content: center; /* Center horizontally */
	font-weight: bold; /* Bold text for progress */
	color: var(--swiper-theme-color); /* Theme color for progress */
}
.autoplay-progress svg {
	--progress: 0; /* Custom property for progress */
	position: absolute; /* Absolute positioning */
	left: 0; /* Left alignment */
	top: 0px; /* Top alignment */
	z-index: 10; /* Layering order */
	width: 100%; /* Full width for SVG */
	height: 100%; /* Full height for SVG */
	stroke-width: 4px; /* Stroke width for SVG */
	stroke: var(--swiper-theme-color); /* Theme color for stroke */
	fill: none; /* No fill for SVG */
	stroke-dashoffset: calc(125.6 * (1 - var(--progress))); /* Dash offset for progress */
	stroke-dasharray: 125.6; /* Total length of the dash */
	transform: rotate(-90deg); /* Rotate for proper alignment */
}
</style>

<!-- FILE DOCUMENTED -->

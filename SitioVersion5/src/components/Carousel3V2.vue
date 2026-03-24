<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/**
 * Component definition for a carousel that displays images with navigation and autoplay features.
 */
export default defineComponent({
	props: {
		/** Array of images to be displayed in the carousel */
		images: Array,
		/** Title of the carousel, defaults to "CASINO" */
		title: {
			type: String,
			default: "CASINO"
		}
	},
	components: {
		/** Swiper component for the carousel */
		Swiper,
		/** SwiperSlide component for individual slides */
		SwiperSlide,
	},
	setup() {
		return {
			/** Pagination configuration for the Swiper component */
			pagination: {
				clickable: true,
				dynamicBullets: true,
				/** Custom rendering of pagination bullets */
				renderBullet: function (index, className) {
					return (
						'<span class="w-5 md:w-10 h-2 md:h-4 rounded-full bg-primary border border-white cursor-pointer hover:scale-110 ' +
						className +
						'"></span>'
					);
				},
			},
			/** Swiper modules to be used */
			modules: [Autoplay, Pagination, Navigation], 
		};
	},
	data() {
		/** Configuration object for the component */
		let config = this.$config(); 
		/** Reference to the app component */
		let appComponent: any = this.$appComponent; 
		/** Images for the carousel */
		let imagesCarousel: any = this.images; 
		/** Rendered images for the carousel after filtering */
		let imagesCarouselRender: any = undefined; 
		return {
			config,
			appComponent,
			imagesCarousel,
			imagesCarouselRender
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
	methods: {
		/** Opens a link in the top window */
		goToLink(link) {
			window.open(link, '_top');
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
	<!-- Main section for the carousel, displayed if there are images to render -->
	<section
		v-if="imagesCarouselRender.length > 0"
		class="w-full h-[400px]  flex flex-col justify-center items-center "
		:class="[config.layout != undefined && config.layout == 4 ? 'after:absolute after:w-full after:h-1 md:after:h-40 after:bg-primary-content after:brightness-[0.6] after:left-0 after:z-1 after:bottom-0 relative after:shadow-primary-content md:after:shadow-primary-content after:shadow-[1px_-3px_7px_8px_,_0px_-10px_33px_17px] md:after:shadow-[0px_-55px_100px_0px_,_0px_-6px_13px_7px]': ' mb-6', config.layout != undefined && config.layout == 5 ? 'md:h-[400px] lg:h-[436px]': 'md:-mb-32 lg:-mb-40 bg-gradient-to-b from-base-300 via-base-300 to-neutral-content md:h-[500px] lg:h-[700px]']"
	>
		<!-- Title displayed for layouts other than 4 and 5 -->
		<span
			v-if="config.layout != undefined && config.layout != 4 && config.layout != 5"
			class="w-full text-primary text-4xl font-semibold mb-2 flex justify-center items-center md:hidden"
			>{{ $t(this.title)}}
		</span>
		<!-- Swiper component for the image carousel -->
		<Swiper
			:spaceBetween="0"
			:slidesPerView="1"
			:centeredSlides="true"
			:loop="true"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false,
			}"
			:navigation="appComponent.mobile == '' ? true : false"
			:modules="modules"
			:class="[config.layout != undefined && config.layout == 4 ? 'w-full h-full rounded-none' : ' rounded-2xl', config.layout != undefined && config.layout == 5 ? 'w-[91%] mt-4' : 'w-[328px] h-[328px] md:w-full  md:rounded-none']"
			class="mySwiper  md:h-full flex flex-col justify-center items-center container-layout"
		>
			<!-- Individual slide for each banner in the carousel -->
			<SwiperSlide
				v-for="(banner, index) in imagesCarouselRender"
				:key="banner.id"
				data-analytics-label="promo:banner:hero"
				:data-analytics-id="banner.id"
				:data-analytics-position="index + 1"
				:data-analytics-context="`component:Carousel3V2|layout:layout-${appComponent.config.layout}`"
				class="w-full h-full z-1"
			>
				<div class="w-full h-full flex justify-center items-center">
          <img
              v-if="(banner.urlFondo || banner.url)"
              :src="banner.urlFondo ? banner.urlFondo : banner.url"
              alt=""
              class="w-full h-full object-cover object-top z-10"
          />
					<!-- Gradient overlay for specific layouts -->
					<div
						v-if="config.layout == undefined || config.layout != undefined && config.layout != 5"
						class="absolute hidden md:flex -bottom-1 w-full h-60 bg-gradient-to-t from-base-content z-10"
					></div>
				</div>
				<!-- Button overlay for each slide -->
				<div
					class="absolute top-0 w-full flex justify-center items-center mt-5 md:mt-10 gap-1 md:gap-10 z-20"
				>
					<button
						@click="goToLink(banner.redirect)"
						:class="config.layout != undefined && config.layout == 5 ? 'lg:h-[346px]': 'lg:h-[500px]'"
						data-analytics-label="promo:banner:hero"
						:data-analytics-id="banner.id"
      					:data-analytics-position="banner.id"
            			:data-analytics-context="`component:Carousel3V2|layout:layout-${appComponent.config.layout}`"
						class="in w-[310px] md:w-[500px] lg:w-[850px] h-[250px] md:h-[350px]  flex justify-center items-center"
					>
						<img
							v-if="banner.url != undefined && banner.url != ''"
							:src="banner.url"
							class="w-full h-full object-contain object-center md:flex hover:scale-[1.02]"
							:class="appComponent.config.mobileL !== '' ? 'hidden' : ''"
						/>
					</button>
				</div>
			</SwiperSlide>
		</Swiper>
	</section>
</template>
<style scoped>
::v-deep .swiper-button-next,
::v-deep .swiper-button-prev {
  color: hsl(var(--p)); /* Puedes cambiar a cualquier color que desees */
}
/* Container for the carousel with pointer cursor */
.container-carousel {
	cursor: pointer;
}
/* Active state for the carousel container */
.container-carousel.active {
	cursor: grab !important;
}
/* Swiper component styles */
.swiper {
	width: 100%;
	height: 100%;
}
/* Progress indicator for autoplay feature */
.autoplay-progress {
	position: absolute;
	right: 16px;
	bottom: 16px;
	z-index: 10;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: var(--swiper-theme-color);
}
/* Styles for the autoplay progress SVG */
.autoplay-progress svg {
	--progress: 0;
	position: absolute;
	left: 0;
	top: 0px;
	z-index: 10;
	width: 100%;
	height: 100%;
	stroke-width: 4px;
	stroke: var(--swiper-theme-color);
	fill: none;
	stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
	stroke-dasharray: 125.6;
	transform: rotate(-90deg);
}
</style>

<!-- FILE DOCUMENTED -->

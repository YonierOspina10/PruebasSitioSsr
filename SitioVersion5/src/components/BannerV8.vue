<template>
    <!-- Placeholder displayed while loading -->
    <AnimatedPlaceholder
        v-if="loading"
        class="w-[90%] md:w-[98%] h-[440px] md:h-[640px] mx-auto rounded-2xl"
    />
    <!-- Section containing banners, shown when banners are available and not loading -->
    <section
        v-if="banners.length > 0"
        v-show="!loading"
        class="relative w-full flex flex-col justify-center items-center gap-8 pt-8 md:pt-0"
    >
        <!-- Left navigation button for the swiper -->
        <button
            data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
            id="swiper-button-left"
            :class="'slidePrev-' + keySlide"
            class="group hidden md:block absolute left-5 top-[50%] z-30 w-[20px] h-[30px] md:w-[27px] md:h-[37px] md:-mt-5 text-primary hover:scale-110"
        >
            <!-- Flecha principal -->
            <ChevronLeftIcon
                class="text-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
            />

            <!-- Flecha secundaria (hover), más pequeña y desplazada -->
            <ChevronLeftIcon
                class="absolute right-[-5px] md:right-[-5px] top-1/2 -translate-y-1/2 max-w-[15px] md:max-w-[25px] max-h-[25px] text-transparent group-hover:text-primary-content transition-all duration-300"
            />
        </button>
        <!-- Swiper container for displaying banners -->
        <swiper-container
            :slides-per-view="'auto'"
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
            :controller-control="'.swiper-2'"
            :style="{
                '--swiper-pagination-color': colors.primary,
            }"
            :injectStyles="[
                `
			.swiper-pagination-bullet {
			width: 5px;
			height: 5px;
			border-radius: 10px;
			border: 1px solid ${colors.primary};
			opacity: 1;
			}
			.swiper-pagination-bullet-active {
			width: 8px;
			height: 8px;
			border-radius: 10px;
			}
			@media (min-width: 1024px) {
			.swiper-pagination-bullet {
			width: 8px;
			height: 8px;
			border-radius: 10px;
			border: 1px solid ${colors.primary};
			opacity: 1;
			}
			.swiper-pagination-bullet-active {
			width: 10px;
			height: 10px;
			border-radius: 10px;
			}
			}
			`,
            ]"
            class="relative w-full h-[440px] md:h-[640px]"
            :class="'swiper-container-' + keySlide"
        >
            <!-- Individual swiper slide for each banner -->
            <swiper-slide
                v-for="(banner, index) in banners"
                data-analytics-label="promo:banner:hero"
                :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
                :key="index"
                :data-analytics-id="banner.id"
                :data-analytics-position="index + 1"
                class="w-[85vw] md:w-full h-full mx-auto relative"
            >
                <RouterLink
                    :to="banner.redirect"
                    class="w-full h-full md:flex justify-center items-end"
                >
                    <!-- Background image for the banner -->
                    <img
                        v-if="banner.urlFondo || banner.url"
                        :src="banner.urlFondo ? banner.urlFondo : banner.url"
                        alt=""
                        class="absolute top-0 left-0 right-0 w-[95%] mx-auto md:w-full h-full object-cover z-10 rounded-lg"
                    />
                    <!-- Main image for the banner -->
                    <div class="hidden md:block relative w-[95%] md:w-[40%] md:z-20 h-full">
                        <img
                            v-if="banner.url"
                            v-lazy="banner.url"
                            alt=""
                            class="h-full object-cover md:object-contain w-full hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    <!-- Secondary image for the banner -->
                    <div class="hidden md:block relative w-[95%] md:w-[40%] md:z-20 h-full -ml-[10px]">
                        <img
                            v-if="banner.urlImg2"
                            v-lazy="banner.urlImg2"
                            alt=""
                            class="h-full object-cover md:object-contain w-full hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    <!-- Gradient overlay for mobile view -->
                    <div
                        class="absolute -bottom-1 w-full h-60 left-0 right-0 bg-gradient-to-t from-base-content md:hidden"
                    ></div>
                </RouterLink>
            </swiper-slide>
        </swiper-container>
        <!-- Right navigation button for the swiper -->
        <button
            data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
            id="swiper-button-right"
            :class="'slideNext-' + keySlide"
            class="group hidden md:block absolute right-5 top-[50%] z-30 w-[20px] h-[30px] md:w-[27px] md:h-[37px] md:-mt-5 text-primary hover:scale-110 rotate-180"
        >
            <!-- Flecha principal -->
            <ChevronLeftIcon
                class="text-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
            />

            <!-- Flecha secundaria (hover), más pequeña y desplazada -->
            <ChevronLeftIcon
                class="absolute right-[-2px] md:right-[-5px] top-1/2 -translate-y-1/2 max-w-[15px] md:max-w-[25px] max-h-[25px] text-transparent group-hover:text-primary-content transition-all duration-300"
            />
        </button>
        <!-- Component for top events carousel -->
        <div
            class="w-full h-52 md:absolute md:bottom-8 md:right-8 md:w-[40%] hover:scale-105 transition-all duration-500 z-[10] md:z-[50]"
        >
            <component :is="WTopEventsCarousel" />
        </div>
        <!-- Decorative line at the bottom of the section -->
        <div
            class="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[1px] bg-primary z-[50]"
            style="clip-path: polygon(0 50%, 5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%)"
        ></div>
    </section>
</template>
<script setup lang="ts">
import { useAppcomponentStore } from '@/stores/AppComponent';
import { getColors, getImages } from '../utils/configHome';
import { defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { useSwiperSetup } from '../composables/useSwiper';
import Button from '@/components/buttons/Button.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import ChevronLeftIcon from './icons/ChevronLeftIcon.vue';
import { useGetInfoFirestore } from '../composables/useInfoFirestore';
// Asynchronously import the top events carousel component
const WTopEventsCarousel = defineAsyncComponent(() => import('@/components/alternarWidgets/WTopEventCarousel.vue'));

// Define component props
const props = defineProps({
    component: {
        type: String,
        default: null,
    },
});

// Access the application component store
const appComponent = useAppcomponentStore().appComponent;
// Reactive reference for banners
let banners = ref([]);
// Reactive reference for colors
const colors = ref({
    primary: '#FFFFFF',
});
// Reactive reference for loading state
const loading = ref(false);


const loadBanners = async () => {
    // Function to update banners
    loading.value = true;
    let firestoreBanner = await useGetInfoFirestore(appComponent.config, appComponent, 'banner_home', {
        useLogin: true,
        useScope: true,
    });
    banners.value =
    Array.isArray(firestoreBanner) && firestoreBanner.length
      ? firestoreBanner
      : getImages(appComponent, appComponent.mobile);
    loading.value = false;
};

// Determine device theme based on app component
let deviceTheme = appComponent.mobile == '' ? 'theme_colors_desktop' : 'theme_colors_mobile';
colors.value = getColors(appComponent, deviceTheme);

// Generate a random key for the slide
const keySlide = Math.random().toString(36).substring(7);

// Setup swiper functionality
const { setupSwiper } = useSwiperSetup(keySlide, colors, loading);

// Watcher for session login state to update banners accordingly
watch(
  () => appComponent.session.logueado,
  () => loadBanners(),
);

// Lifecycle hook for component mounted
onMounted(() => {
    console.log('mounted');
    loadBanners();
});

</script>
<style scoped>
/* Hide child paths of left swiper button SVG */
#swiper-button-left > svg > path.child {
    display: none;
}
/* Show child paths of left swiper button SVG on hover */
#swiper-button-left:hover > svg > path.child {
    display: block;
}
/* Hide child paths of right swiper button SVG */
#swiper-button-right > svg > path.child {
    display: none;
}
/* Show child paths of right swiper button SVG on hover */
#swiper-button-right:hover > svg > path.child {
    display: block;
}
</style>

<!-- FILE DOCUMENTED -->

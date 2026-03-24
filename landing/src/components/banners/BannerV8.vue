<template>
    <!-- Main section for displaying banners, shown only if there are banners and not loading -->
    <section
        v-if="banners.length > 0"
        v-show="!loading"
        class="relative w-full flex flex-col justify-center items-center gap-8 pt-8"
    >
        <!-- Button to navigate to the previous slide, hidden on small screens -->
        <button
            data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
            id="swiper-button-left"
            class="hidden md:block absolute left-5 top-[50%] z-30 w-[20px] h-[30px] md:w-[27px] md:h-[37px] md:-mt-5 fill-primary hover:scale-110 rotate-180"
            :class="'slidePrev-' + keySlide"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="38"
                viewBox="0 0 28 38"
                class="hidden md:block"
            >
                <path
                    d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                />
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                    class="child"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                viewBox="0 0 28 38"
                class="md:hidden"
            >
                <path
                    d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                />
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                    class="child"
                />
            </svg>
        </button>
        <!-- Swiper container for the banner slides -->
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
			width: 10px;
			height: 10px;
			border-radius: 10px;
			border: 1px solid ${colors.primary};
			opacity: 1;
			}
			.swiper-pagination-bullet-active {
			width: 15px;
			height: 15px;
			border-radius: 10px;
			}
			@media (min-width: 1024px) {
			.swiper-pagination-bullet {
			width: 15px;
			height: 15px;
			border-radius: 10px;
			border: 1px solid ${colors.primary};
			opacity: 1;
			}
			.swiper-pagination-bullet-active {
			width: 20px;
			height: 20px;
			border-radius: 10px;
			}
			}
			`,
            ]"
            class="relative w-full h-[440px] md:h-[640px]"
            :class="'swiper-container-' + keySlide"
        >
            <!-- Loop through banners to create slides -->
            <swiper-slide
                v-for="(banner, index) in banners"
                :key="index"
                class="w-[85vw] md:w-full h-full mx-auto relative"
                data-analytics-label="promo:banner:hero"
                :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
                :data-analytics-id="banner.id"
                :data-analytics-position="index + 1"
            >
                <!-- Link to redirect on banner click -->
                <RouterLink
                    :to="banner.redirect"
                    class="w-full h-full md:flex justify-center items-end"
                >
                    <!-- Background image for the banner -->
                    <img
                        v-if="banner.urlFondo"
                        :srcset="getSrcset(banner.urlFondo)"
                        loading="lazy"
                        :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                        alt=""
                        class="absolute top-0 left-0 right-0 w-[95%] mx-auto md:w-full h-full object-cover z-10 rounded-lg"
                    />
                    <!-- Main banner image -->
                    <div class="hidden md:block relative w-[95%] md:w-[40%] md:z-20 h-full">
                        <img
                            v-if="banner.url"
                            :srcset="getSrcset(banner.url)"
                            loading="lazy"
                            :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                            alt=""
                            class="h-full object-cover md:object-contain w-full hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    <!-- Secondary banner image, hidden on small screens -->
                    <div class="hidden md:block relative w-[95%] md:w-[40%] md:z-20 h-full -ml-[10px]">
                        <img
                            v-if="banner.urlImg2"
                            :srcset="getSrcset(banner.urlImg2)"
                            loading="lazy"
                            :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                            alt=""
                            class="h-full object-cover md:object-contain w-full hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    <!-- Gradient overlay for mobile view -->
                    <div
                        class="absolute -bottom-1 w-full h-60 left-0 right-0 bg-gradient-to-t from-neutral-content md:hidden"
                    ></div>
                </RouterLink>
            </swiper-slide>
        </swiper-container>
        <!-- Button to navigate to the next slide, hidden on small screens -->
        <button
            data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:BannerV8|layout:layout-${appComponent.config.layout}`"
            id="swiper-button-right"
            class="hidden md:block absolute right-5 top-[50%] z-30 w-[20px] h-[30px] md:w-[27px] md:h-[37px] md:-mt-5 fill-primary hover:scale-110"
            :class="'slideNext-' + keySlide"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="38"
                viewBox="0 0 28 38"
                class="hidden md:block"
            >
                <path
                    d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                />
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                    class="child"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                viewBox="0 0 28 38"
                class="md:hidden"
            >
                <path
                    d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                />
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                    class="child"
                />
            </svg>
        </button>
        <!-- Suspense wrapper for loading state -->
        <Suspense>
            <div
                class="w-full h-52 md:absolute md:bottom-8 md:right-8 md:w-[40%] hover:scale-105 transition-all duration-500 z-[10] md:z-[50]"
            >
                <component :is="WTopEventsCarousel" />
            </div>
        </Suspense>
        <!-- Decorative line at the bottom of the section -->
        <div
            class="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[1px] bg-primary z-[50]"
            style="clip-path: polygon(0 50%, 5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%)"
        ></div>
    </section>
</template>
<script setup lang="ts">
import { useAppcomponentStore } from '../../stores/AppComponent'; // Importing store for app component state
import { getColors, getImages } from '../../utils/configHome'; // Utility functions for colors and images
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'; // Vue composition API functions
import { useSwiperSetup } from '../../composables/useSwiper'; // Custom composable for swiper setup
import { useGetInfoFirestore } from '../../composables/useInfoFirestore' //Import function to get banners data from firestore

// Asynchronously importing the WTopEventsCarousel component
const WTopEventsCarousel = defineAsyncComponent(() => import('../../components/sportbook/WTopEventCarousel.vue'));

// Defining component props
const props = defineProps({
    component: {
        type: String,
        default: null,
    },
});

// Accessing app component state from the store
const appComponent = useAppcomponentStore().appComponent;
// Reactive reference for colors
const colors = ref({
    primary: '#FFFFFF',
});
// Reactive reference for loading state
const loading = ref(false);
let banners = ref([]);

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

// Function to generate srcset for responsive images
const getSrcset = (imageUrl: string, sizes = [480, 768, 1024, 1440]) => {
    if (!imageUrl) return '';
    const baseUrl = imageUrl.split('?')[0];
    return sizes.map((size) => `${baseUrl}?w=${size}&fm=webp ${size}w`).join(', ');
};

// Determining device theme based on app component state
let deviceTheme = appComponent.mobile == '' ? 'theme_colors_desktop' : 'theme_colors_mobile';
colors.value = getColors(appComponent, deviceTheme); // Setting colors based on the theme

// Generating a unique key for the slide
const keySlide = Math.random().toString(36).substring(7);

// Setting up swiper with the generated key and colors
const { setupSwiper } = useSwiperSetup(keySlide, colors, loading);

// Watcher for session login state to update banners accordingly
watch(
  () => appComponent.session.logueado,
  () => loadBanners(),
); 

// Lifecycle hook to run setupSwiper on component mount
onMounted(() => {
    console.log('mounted');
    loadBanners();
    setupSwiper();
});


</script>
<style scoped>
/* Styles for the left swiper button */
#swiper-button-left > svg > path.child {
    display: none;
}
/* Show child path on hover for left button */
#swiper-button-left:hover > svg > path.child {
    display: block;
}
/* Styles for the right swiper button */
#swiper-button-right > svg > path.child {
    display: none;
}
/* Show child path on hover for right button */
#swiper-button-right:hover > svg > path.child {
    display: block;
}
</style>

<!-- FILE DOCUMENTED -->

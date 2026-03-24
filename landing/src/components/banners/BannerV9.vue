<template>
    <!-- Main container for the loading state and banners section -->
    <AnimatedPlaceholder
        v-if="loading"
        class="w-[90%] md:w-[98%] max-w-[1112px] h-[543px] mx-auto rounded-2xl my-4"
    />

    <!-- Section displayed when not loading and banners are available -->
    <section
        v-else-if="!loading && banners.length > 0"
        class="w-full h-full max-h-[543px] max-w-[1112px] flex justify-center mx-auto my-4"
    >
        <!-- Main swiper container for the banners -->
        <swiper-container
            ref="mainSwiper"
            :style="{
                '--swiper-pagination-color': colors.primary,
            }"
            class="mySwiper w-[95%] lg:w-full max-w-[834px]"
            thumbs-swiper=".mySwiper2"
            loop="true"
            autoplay-delay="5000"
            autoplay-disable-on-interaction="false"
            space-between="10"
            pagination="true"
            controller-control=".mySwiper2"
            :injectStyles="[
                `
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
			border: 1px solid ${colors.primary};
			opacity: 1;
                }
                .swiper-pagination-bullet-active {
                    width: 11px;
                    height: 11px;
                }
            `,
            ]"
        >
            <!-- Individual swiper slide for each banner -->
            <swiper-slide
                v-for="(banner, index) in banners"
                :key="index"
                :data-analytics-id="banner.id"
                :data-analytics-position="index"
                data-analytics-label="promo:banner:hero"
                :data-analytics-context="`component:BannerV9|layout:layout-${appComponent.config.layout}`"
                class="w-full h-full rounded-xl overflow-hidden"
            >
                <!-- Link to the banner's redirect URL -->
                <RouterLink
                    :to="banner.redirect"
                    class="w-full h-full"
                >
                    <!-- Lazy-loaded image for the banner -->
                    <img
                        v-if="banner.url"
                        v-lazy="banner.url"
                        alt=""
                        class="w-full h-full object-contain"
                    />
                </RouterLink>
            </swiper-slide>
        </swiper-container>

        <!-- Secondary swiper container for thumbnail navigation -->
        <swiper-container
            class="mySwiper2 w-full max-w-[240px] hidden lg:block"
            space-between="36"
            slides-per-view="3"
            free-mode="true"
            direction="vertical"
            watch-slides-progress="true"
        >
            <!-- Individual swiper slide for each thumbnail banner -->
            <swiper-slide
                v-for="(banner, index) in banners2"
                :key="index"
                @click="onThumbClick(index)"
                class="w-full h-[157px] rounded-lg overflow-hidden"
            >
                <!-- Lazy-loaded image for the thumbnail -->
                <img
                    v-if="banner.url"
                    v-lazy="banner.url"
                    alt=""
                    class="w-full h-full object-contain"
                />
            </swiper-slide>
        </swiper-container>
    </section>
</template>
<script setup lang="ts">
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store
import { getColors, getImagesCasino } from '../../utils/configHome'; // Importing utility functions for colors and images
import { onMounted, ref, computed } from 'vue'; // Importing Vue composition API functions
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Importing a placeholder component
import { useGetInfoFirestore } from '../../composables/useInfoFirestore' //Import function to get banners data from firestore
import { register } from 'swiper/element/bundle'; // Importing Swiper element bundle for carousel functionality
register(); // Registering Swiper elements


// Defining component props
const props = defineProps({
    component: {
        type: String, // Prop type is String
        default: null, // Default value is null
    },
});

let banners = ref([]); 
// Accessing the app component from the store
const appComponent = useAppcomponentStore().appComponent;
const banners2 = computed(() => [...banners.value, ...banners.value]); //Duplicating banners for additional display

// Defining loading state
const loading = ref(true);

// Defining reactive colors object with a primary color
const colors = ref({
    primary: '#FFFFFF', // Default primary color
});

const loadBanners = async () => {
    loading.value = true;
    // Function to update banners
    let firestoreBanner = await useGetInfoFirestore(appComponent.config, appComponent,  'banner_casino', {
        useLogin: true,
        useScope: true,
    });
    banners.value =
    Array.isArray(firestoreBanner) && firestoreBanner.length
      ? firestoreBanner
      : getImagesCasino(appComponent, appComponent.mobile);
    loading.value = false;  
};


// Determining device theme based on mobile status
let deviceTheme = appComponent.mobile == '' ? 'theme_colors_desktop' : 'theme_colors_mobile';

// Setting colors based on app component and device theme
colors.value = getColors(appComponent, deviceTheme);

// Creating a reference for the main Swiper instance
const mainSwiper = ref(null);

// Function to handle thumbnail click events
const onThumbClick = (index: number) => {
    // Navigating to the appropriate slide based on the index
    if (index > banners.value.length - 1) {
        mainSwiper.value.swiper.slideTo(index - banners.value.length); // Adjusting index for duplicated banners
    } else {
        mainSwiper.value.swiper.slideTo(index); // Navigating to the original index
    }
};

// Lifecycle hook to set loading state after component is mounted
onMounted(() => {
    loadBanners();
    setTimeout(() => {
        loading.value = false; // Setting loading to false after 2 seconds
    }, 2000);
});
</script>

<style scoped>


/* Hides the active thumbnail slide */
.mySwiper2 .swiper-slide-thumb-active {
    display: none;
}

/* Sets opacity for the next sibling of the active thumbnail */
.mySwiper2 .swiper-slide-thumb-active + * {
    opacity: 1; /* Makes the next sibling fully opaque */
}
</style>

<!-- FILE DOCUMENTED -->
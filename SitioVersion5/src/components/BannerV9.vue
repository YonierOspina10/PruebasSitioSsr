<template>
	<!-- Placeholder shown while loading -->
	<AnimatedPlaceholder
		v-if="loading"
		class="w-[90%] md:w-[98%] max-w-[1112px] h-[543px] mx-auto rounded-2xl my-4"
	/>
	<!-- Section displayed when not loading and banners are available -->
	<section
		v-else-if="!loading && banners.length > 0"
		class="w-full h-full max-h-[543px] max-w-[1112px] flex justify-center mx-auto my-4"
	>
		<!-- Main swiper container for displaying banners -->
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
				width: 5px;
			height: 5px;
			border: 1px solid ${colors.primary};
			opacity: 1;
			}
			.swiper-pagination-bullet-active {
			width: 8px;
			height: 8px;
			}
			`,
			]"
		>
			<!-- Slide for each banner -->
			<swiper-slide
				v-for="(banner, index) in banners"
				:key="index"
				class="w-full h-full rounded-xl overflow-hidden"
				data-analytics-label="promo:banner:hero"
		        :data-analytics-id="banner.id"
      			:data-analytics-position="index +1 "
            	:data-analytics-context="`component:BannerV9|layout:layout-${appComponent.config.layout}`"
			>
				<div @click="handleBannerClick(banner)" class="w-full h-full cursor-pointer">
					<!-- Lazy-loaded image for the banner -->
					<img
						v-if="banner.url"
						v-lazy="banner.url"
						alt=""
						class="w-full h-full object-contain"
					/>
				</div>
			</swiper-slide>
		</swiper-container>
		<!-- Thumbnail swiper container for additional banners -->
		<swiper-container
			class="mySwiper2 w-full max-w-[240px] hidden lg:block"
			space-between="36"
			slides-per-view="3"
			free-mode="true"
			direction="vertical"
			watch-slides-progress="true"
		>
			<!-- Slide for each thumbnail banner -->
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
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing store for app component state
import { getColors, getImagesCasino, getImagesCasinoLive, getImagesVirtuals } from '../utils/configHome'; // Importing utility functions for colors and images
import {  onMounted, ref, watch, computed } from 'vue'; // Importing Vue composition API functions
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Importing animated placeholder component
import { register } from 'swiper/element/bundle'; // Importing Swiper registration
import { useGetInfoFirestore } from '../composables/useInfoFirestore' //Import function to get banners data from firestore
import { openGame } from '@/utils';
import { useRouter } from 'vue-router'
register(); // Registering Swiper components
// Defining component props
const props = defineProps({
	typelobby: {
		type: String,
		default: '0',
	}
});

//State
const store = useAppcomponentStore()
const appComponent: any = store.appComponent // Get application component data
const config = appComponent?.config// configuration data
let banners = ref([]); // Fetching banners based on app component state
const loading = ref(true); // Defining loading state
const mainSwiper = ref(null); // Reference for the main swiper instance
const colors = ref({primary: '#FFFFFF'});  // Defining reactive color state
const banners2 = computed(() => [...banners.value, ...banners.value]);
const router = useRouter()
const loadBanners = async () => {
let fsCasino: any[] | null = null; // banner_casino from firestore
let fsLive: any[] | null = null; // banner_live_casino from firestore
let fsVirtual: any[] | null = null; // banner_virtual from firestore
    // Get images data from firestore
    try {
        [fsCasino, fsLive, fsVirtual] = await Promise.all([
            useGetInfoFirestore(config, appComponent, 'banner_casino', { useLogin: true, useScope: true }),
            useGetInfoFirestore(config, appComponent, 'banner_live_casino', { useLogin: true, useScope: true }),
            useGetInfoFirestore(config, appComponent, 'banner_virtual', { useLogin: true, useScope: true }),
        ]);
    } catch (e) {
        console.error('[BannerV9] Firestore error', e);
    }
    if (props.typelobby == '0') {
        banners.value = fsCasino?.length ? fsCasino : getImagesCasino(appComponent, appComponent.mobile);
    } else if (props.typelobby == '1') {
        banners.value = fsVirtual?.length ? fsVirtual : getImagesVirtuals(appComponent, appComponent.mobile);
    } else if (props.typelobby == '2') {
        banners.value = fsLive?.length ? fsLive : getImagesCasinoLive(appComponent, appComponent.mobile);
    }
};

const handleBannerClick = (banner: any) => {
  const redirect = banner.redirect || ''

  // detectar game
  const match = redirect.match(/^\/new-casino\/(\d+)/)

  if (match) {
    const gameId = match[1]

    const game = appComponent.gamesList?.find(
      g => String(g.id) === String(gameId)
    )

    openGame(game || { id: gameId }, appComponent)
    return
  }

  if (redirect.startsWith('/')) {
    router.push(redirect)
    return
  }

  window.open(redirect, '_blank')
}

// Determining device theme based on app component state
let deviceTheme =
	appComponent.mobile == '' ? 'theme_colors_desktop' : 'theme_colors_mobile';

// Fetching colors based on app component and device theme
colors.value = getColors(appComponent, deviceTheme);


// Function to handle thumbnail click and navigate to the corresponding main banner
const onThumbClick = (index: number) => {
	if (index > banners.value.length - 1) {
		mainSwiper.value.swiper.slideTo(index - banners.value.length); // Navigate to corresponding main banner
	} else {
		mainSwiper.value.swiper.slideTo(index); // Navigate to clicked thumbnail
	}
};

// Watcher for session login state to update banners accordingly
watch(
  () => appComponent.session?.logueado,
  () => loadBanners(),
);

// Lifecycle hook to set loading state after a delay
onMounted(() => {
	loadBanners();
	setTimeout(() => {
		loading.value = false; // Set loading to false after 2 seconds
	}, 2000);
});

</script>

<style scoped>
.mySwiper2 .swiper-slide-thumb-active {
	display: none; /* Hide active thumbnail slide */
}
.mySwiper2 .swiper-slide-thumb-active + * {
	opacity: 1; /* Set opacity for the next slide after active */
}
</style>

<!-- FILE DOCUMENTED -->

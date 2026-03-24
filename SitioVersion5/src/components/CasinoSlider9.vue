<template>
	<!-- Main section that is conditionally rendered based on visibility and data availability -->
	<section v-if="isVisible && !dataEmpty" class="w-full px-2 md:px-4 flex justify-center items-center gap-3 my-8">
		<div
            :class="computedClass"
			@mouseenter="handleMouseEnter"
			class="w-full max-w-[90%] md:max-w-[80%] flex flex-col justify-center items-center gap-3 transition-all duration-500 mx-auto z-0"
		>
			<!-- Conditional rendering for icon and title -->
			<div
				v-if="props.data['icon'] || props.data['title']"
				class="w-full flex justify-start items-center gap-2"
			>
				<div v-if="props.data['icon']" v-html="props.data['icon']" class="w-[20px] h-[20px] text-primary"></div>
				<h2 v-if="props.data['title']" class="text-lg md:text-xl font-light text-neutral">
					{{ $t(props.data['title']) }}</h2>
			</div>
			<div class="relative w-full flex justify-center items-center gap-4">
				<!-- Gradient background for mobile view -->
				<div
					class="absolute md:hidden w-16 h-full -left-1 top-0 bottom-0 z-[25] bg-gradient-to-r from-neutral-content/75 to-transparent"></div>
				<!-- Left navigation button -->
				<button
					id="swiper-button-left"
					:class="'slidePrev-' + keySlide"
					:disabled="dataEmpty"
                    class="group w-[20px] h-[30px] md:w-[27px] md:h-[37px] text-primary hover:scale-110 absolute md:static left-2 top-0 bottom-0 m-auto z-30"
                    v-bind="analyticsAttrs.arrowPrev"
				>
					<!-- Flecha principal -->
					<ChevronLeftIcon
						class="text-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
					/>

					<!-- Flecha secundaria (hover), más pequeña y desplazada -->
					<ChevronLeftIcon
						class="absolute right-[-5px] md:right-[-5px] top-1/2 -translate-y-1/2 
							max-w-[15px] md:max-w-[25px] max-h-[25px]
							text-transparent group-hover:text-primary-content
							transition-all duration-300"
					/>
				</button>

				<!-- Loading state with animated placeholders -->
				<div v-if="loading" class="w-[90%] overflow-hidden z-20">
					<div
						class="flex gap-4 w-full place-content-center">
						<AnimatedPlaceholder
							v-for="index in 6"
							:key="index"
							class="w-[121px] h-[97px] md:w-[154px] md:h-[124px] rounded-2xl m-auto"
						/>
					</div>
				</div>
				<!-- Content display when not loading -->
				<div v-else class="w-[90%] flex justify-center items-center z-20">
					<swiper-container
						v-show="!dataEmpty"
						class="w-full"
						:class="'swiper-container-' + keySlide"
						:slides-per-view="'auto'"
						:space-between="20"
						:breakpoints="{
							768: {
								spaceBetween: 32,
							},
						}"
						:mousewheel="true"
						:mousewheel-force-to-axis="true"
						:free-mode="true"
						:direction="'horizontal'"
						:navigation="{
							enabled: false,
							nextEl: '.slideNext' + keySlide,
							prevEl: '.slidePrev' + keySlide,
						}"
					>
						<swiper-slide
							v-for="(game, index) in games"
							:key="index"
							ref="card"
							:data-index="index"
							class="w-[121px] h-[97px] md:w-40 md:h-32 rounded-xl bg-secondary cursor-pointer"
						>
							<CardGame8 :game="game" :attributes-analytics="analyticsAttrs.game(game)" />  <!-- Card component for each game -->
						</swiper-slide>
					</swiper-container>
					<!-- Message when no games are available -->
					<div
						v-if="dataEmpty"
						class="w-full h-[97px] md:h-[124px] flex justify-center items-center"
					>
						<p class="w-full text-center text-primary">{{ $t('No hay juegos disponibles') }}</p>
					</div>
				</div>
				<!-- Right navigation button -->
				<button
					id="swiper-button-right"
					:class="'slideNext-' + keySlide"
					:disabled="dataEmpty"
					class="group w-[20px] h-[30px] md:w-[27px] md:h-[37px] text-primary hover:scale-110 absolute md:static right-2 top-0 bottom-0 m-auto z-30 rotate-180"
                    v-bind="analyticsAttrs.arrowNext"
				>
					<!-- Flecha principal -->
					<ChevronLeftIcon
						class="text-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
					/>

					<!-- Flecha secundaria (hover), más pequeña y desplazada -->
					<ChevronLeftIcon
						class="absolute right-[-5px] md:right-[-5px] top-1/2 -translate-y-1/2 
							max-w-[15px] md:max-w-[25px] max-h-[25px]
							text-transparent group-hover:text-primary-content
							transition-all duration-300"
					/>
				</button>
				<!-- Gradient background for mobile view -->
				<div
					class="absolute md:hidden w-16 h-full -right-1 top-0 bottom-0 z-[25] bg-gradient-to-l from-neutral-content/75 to-transparent"></div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed, onUnmounted } from 'vue';  // Vue composition API imports
import { storeToRefs } from 'pinia';  // Pinia store reference
import { useRouter } from 'vue-router';  // Vue Router for navigation
import { useCasinoStore } from '@/stores/casino';  // Import casino store
import apiService from '@/services/ApiService';  // API service for data fetching
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';  // Placeholder component
import CardGame8 from '@/components/cards/CardGame8.vue';  // Game card component
import { register } from 'swiper/element/bundle';  // Swiper registration
import { useAppcomponentStore } from '@/stores/AppComponent';  // App component store
import ChevronLeftIcon from './icons/ChevronLeftIcon.vue';
import { toKebabCase } from '@/utils';
register();  // Register Swiper elements

// Define component props
const props = defineProps({
	data: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

const appComponent = useAppcomponentStore().appComponent;  // Access app component store
const casinoStore = useCasinoStore();  // Access casino store
const { providerSelect, categorySelect } = storeToRefs(casinoStore);  // Store references
const router = useRouter();  // Router instance
const redirectUrl = ref('');  // Redirect URL reference
const keySlide: number = Math.floor(Math.random() * 100000);  // Random key for slide
const games = ref([]);  // Games data reference
const error = ref(null);  // Error reference
const loading = ref(true);  // Loading state reference
const isVisible = ref(false);  // Visibility state reference
const dataEmpty = ref(false);  // Data empty state reference
const opacityClass = ref('opacity-100');
const isDesktop = computed(() => window.innerWidth >= 1280) as any;  // Computed property for desktop check
const computedClass = computed(() => {
    return isDesktop.value ? opacityClass.value : '';  // Compute class based on desktop check
});

const analyticsAttrs = {
    viewAll: {
        'data-analytics-label': `casino:carousel:${props.data['title'].toLowerCase().replace(/\s+/g, '-')}:view-all`,
        'data-analytics-context': `component:CasinoSlider9|layout:${appComponent.config.layout}`
    },
    arrowPrev: {
        'data-analytics-label': `casino:carousel:${props.data['title'].toLowerCase().replace(/\s+/g, '-')}:arrow-prev`,
        'data-analytics-context': `component:CasinoSlider9|layout:${appComponent.config.layout}`
    },
    arrowNext: {
        'data-analytics-label': `casino:carousel:${props.data['title'].toLowerCase().replace(/\s+/g, '-')}:arrow-next`,
        'data-analytics-context': `component:CasinoSlider9|layout:${appComponent.config.layout}`
    },
    game: (game: any) => ({
        'data-analytics-id': `${game.id}`,
        'data-analytics-label': `casino:carousel:${props.data['title'].toLowerCase().replace(/\s+/g, '-')}:game`,
        'data-analytics-position': `${games.value.findIndex((g) => g.id === game.id) + 1}`,
        'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:CasinoSlider9|layout:${appComponent.config.layout}`,
    })
}

// Handle window resize event
const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1280;  // Update desktop check on resize
};

// Mouse enter event handler
const handleMouseEnter = () => {
	if (props.data['mouseleave']) {
		opacityClass.value = 'opacity-100';  // Set opacity to 100 on mouse enter
	}
};

// Mouse leave event handler


// Fetch games data from API
const getGames = async () => {
  useSlider();  // Initialize slider functionality
	loading.value = true;  // Set loading state
	let params = {
			action: props.data['action'],  // Action parameter
			partner_id: appComponent?.partnerG ?? null,  // Partner ID
			country: appComponent?.country ?? null,  // Country parameter
			offset: 0,  // Pagination offset
			limit: props.data['limit'],  // Limit for number of games
      		typelobby: props.data['typelobby'],  // Type of lobby
			isMobile: appComponent.mobile == '1',  // Mobile check
			provider: props.data['provider'] ?? (providerSelect.value === null ? undefined : providerSelect.value?.name),  // Provider selection
			category: props.data['category'] ?? (categorySelect.value === null ? undefined : categorySelect.value?.id) // Category selection
		}
	if(props.data['user']){  // Check if user data is present
		params['userId'] = appComponent.session.id_user  // Add user ID to parameters
	}
	await apiService
		.requestGet(appComponent.config.urlVirtualplayPython ?? 'https://gameservice.virtualsoft.tech/', params)  // API request
		.then((response: any) => {
		games.value = response.data.games;  // Set games data from response
		if (appComponent.myListFavoriteGame?.length) {
			games.value.forEach(game => {
			game.fav = appComponent.myListFavoriteGame.includes(game.id);
			});
		}

			loading.value = false;  // Reset loading state
			dataEmpty.value = games.value.length === 0;  // Check if data is empty
		})
		.catch((err) => {
			error.value = err;  // Set error if request fails
			games.value = [];  // Reset games data
			loading.value = false;  // Reset loading state
			dataEmpty.value = true;  // Set data empty state
		});
};

// Initialize slider functionality
const useSlider = () => {
  let count = 0;  // Counter for initialization attempts
  const intervalSwiper = setInterval(() => {
    count++;
    try {
      const swiperElements = document.querySelectorAll('.swiper-container-' + keySlide) as NodeListOf<Element>;  // Select swiper elements
      if (swiperElements.length > 0 || count > 10) {  // Check if swiper elements are found or max attempts reached
        clearInterval(intervalSwiper);  // Clear interval
        const buttonNext = document.querySelector('.slideNext-' + keySlide);  // Select next button
        const buttonPrev = document.querySelector('.slidePrev-' + keySlide);  // Select previous button
        swiperElements.forEach((swiperEl) => {
          buttonPrev?.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default action
            (swiperEl as any).swiper.slidePrev();  // Slide to previous
          });
          buttonNext?.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default action
            (swiperEl as any).swiper.slideNext();  // Slide to next
          });
        });
      }
    } catch (e) {
      console.log(e);  // Log any errors
    }
  }, 1000);  // Check every second
}

// Construct redirect URL based on current route and selected options
const urlRedirect = () => {
	const currentUrl = router.currentRoute.value.fullPath;  // Get current route
	const providerName = providerSelect.value?.name || '';  // Get provider name
	const category = categorySelect.value !== null ? categorySelect.value : '';  // Get category
	let newPath: string;  // New path for redirect
	if (currentUrl.includes('new-casino')) {  // Check for new casino route
		if (category) {
			newPath = providerName
				? `/new-casino/categoria/${category.id}/proveedor/${providerName}`
				: `/new-casino/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/new-casino/proveedor/${providerName}` : '/new-casino';
		}
	} else if (currentUrl.includes('virtuales-lobby')) {  // Check for virtual lobby route
		if (category) {
			newPath = providerName
				? `/virtuales-lobby/categoria/${category.id}/proveedor/${providerName}`
				: `/virtuales-lobby/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/virtuales-lobby/proveedor/${providerName}` : '/virtuales-lobby';
		}
	} else if (currentUrl.includes('live-casino-vivo')) {  // Check for live casino route
		if (category) {
			newPath = providerName
				? `/live-casino-vivo/categoria/${category.id}/proveedor/${providerName}`
				: `/live-casino-vivo/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/live-casino-vivo/proveedor/${providerName}` : '/live-casino-vivo';
		}
	} else {  // Default case
		if (category) {
			newPath = providerName
				? `/new-casino/categoria/${category.id}/proveedor/${providerName}`
				: `/new-casino/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/new-casino/proveedor/${providerName}` : '/new-casino';
		}
	}
	redirectUrl.value = newPath;  // Set redirect URL
};

// Lifecycle hook for component mounted
onMounted(() => {
    window.addEventListener('resize', handleResize);  // Add resize event listener
  if(props.data['user']){  // Check if user data is present
    if(appComponent.session.logueado){  // Check if user is logged in
      isVisible.value = true  // Set visibility to true
      getGames();  // Fetch games
    }else{
      isVisible.value = false  // Set visibility to false
    }
  }else{
    isVisible.value = true  // Set visibility to true
    getGames();  // Fetch games
  }
	urlRedirect();  // Construct redirect URL
  useSlider();  // Initialize slider functionality
});

// Lifecycle hook for component unmounted
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);  // Remove resize event listener
});

// Watchers for reactive properties
watch([providerSelect, categorySelect], () => {
  if(props.data['user']){  // Check if user data is present
    if(appComponent.session.logueado){  // Check if user is logged in
      getGames();  // Fetch games
    }
  }else{
    getGames();  // Fetch games
  }
	urlRedirect();  // Construct redirect URL
});

// Watch for changes in login state
watch(() => appComponent.session.logueado, () => {
  if(props.data['user']){  // Check if user data is present
    if(appComponent.session.logueado){  // Check if user is logged in
      isVisible.value = true  // Set visibility to true
      getGames();  // Fetch games
    }else{
      isVisible.value = false  // Set visibility to false
    }
  }
});
</script>
<style scoped>
@media (min-width: 768px) {
	#swiper-button-left > svg > path.child {
		display: none !important;  /* Hide child paths in left button on larger screens */
	}
	#swiper-button-right > svg > path.child {
		display: none !important;  /* Hide child paths in right button on larger screens */
	}
}
#swiper-button-left > svg > path.child {
	display: block;  /* Show child paths in left button */
}
#swiper-button-left:hover > svg > path.child {
	display: block !important;  /* Show child paths in left button on hover */
}
#swiper-button-right > svg > path.child {
	display: block;  /* Show child paths in right button */
}
#swiper-button-right:hover > svg > path.child {
	display: block !important;  /* Show child paths in right button on hover */
}

.opacity-100 {
	opacity: 1;  /* Class for 100% opacity */
}
</style>

<!-- FILE DOCUMENTED -->

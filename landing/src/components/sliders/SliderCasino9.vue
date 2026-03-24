<template>
	<!-- Main section that displays games if data is not empty -->
	<section v-if="!dataEmpty" class="w-full px-2 md:px-4 flex justify-center items-center gap-3 my-8">
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
				<div v-if="props.data['icon']" v-html="props.data['icon']" class="w-[20px] h-[20px] fill-primary"></div>
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
					class="group w-[20px] h-[30px] md:w-[27px] md:h-[37px] fill-primary hover:scale-110 absolute md:static left-2 top-0 bottom-0 m-auto z-30"
                    v-bind="analyticsAttrs.arrowPrev"
				>
					<!-- Flecha principal -->
					<ChevronLeftIcon
						class="fill-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
					/>

					<!-- Flecha secundaria (hover), más pequeña y desplazada -->
					<ChevronLeftIcon
						class="absolute right-[-5px] md:right-[-5px] top-1/2 -translate-y-1/2 
							max-w-[15px] md:max-w-[25px] max-h-[25px]
							fill-transparent group-hover:fill-primary-content
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
				<!-- Display games when not loading -->
				<div v-else class="w-[90%] flex justify-center items-center z-20">
					<swiper-container
						v-show="!dataEmpty"
						class="w-full"
						:class="'swiper-container-' + keySlide"
						:slides-per-view="'auto'"
						:space-between="20"
						:breakpoints="{ 768: { spaceBetween: 40, } }"
						:mousewheel="true"
						:mousewheel-force-to-axis="true"
						:free-mode="true"
						:direction="'horizontal'"
						:navigation="{ enabled: false, nextEl: '.slideNext' + keySlide, prevEl: '.slidePrev' + keySlide, }"
					>
						<swiper-slide
							v-for="(game, index) in games"
							:key="index"
							ref="card"
							:data-index="index"
							class="w-[121px] h-[97px] md:w-[154px] md:h-[124px] rounded-xl bg-accent cursor-pointer"
						>
							<CardGame8 :game="game" :analytics-attrs="analyticsAttrs.game(game)" />
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
					class="group w-[20px] h-[30px] md:w-[27px] md:h-[37px] fill-primary hover:scale-110 absolute md:static right-2 top-0 bottom-0 m-auto z-30 rotate-180"
                    v-bind="analyticsAttrs.arrowNext"
				>
					<!-- Flecha principal -->
					<ChevronLeftIcon
						class="fill-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
					/>

					<!-- Flecha secundaria (hover), más pequeña y desplazada -->
					<ChevronLeftIcon
						class="absolute right-[-5px] md:right-[-5px] top-1/2 -translate-y-1/2 
							max-w-[15px] md:max-w-[25px] max-h-[25px]
							fill-transparent group-hover:fill-primary-content
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';  // Importing Vue composition API functions
import { storeToRefs } from 'pinia';  // Importing Pinia store helper
import { useRouter } from 'vue-router';  // Importing Vue Router
import { useCasinoStore } from '@/stores/casino';  // Importing casino store
import apiService from '@/services/ApiService';  // Importing API service
import Button from '@/components/buttons/Button.vue';  // Importing Button component
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';  // Importing AnimatedPlaceholder component
import CardGame8 from '@/components/cards/CardGame8.vue';  // Importing CardGame8 component
import { register } from 'swiper/element/bundle';  // Importing Swiper registration
import { useAppcomponentStore } from '@/stores/AppComponent';
import { toKebabCase } from '@/utils';  // Importing AppComponent store
register();  // Registering Swiper elements

// Defining props for the component
const props = defineProps({
	data: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

// Using stores and router
const appComponent = useAppcomponentStore().appComponent;  // Accessing app component from store
const casinoStore = useCasinoStore();  // Accessing casino store
const { providerSelect, categorySelect } = storeToRefs(casinoStore);  // Destructuring store references
const router = useRouter();  // Initializing router
const redirectUrl = ref('');  // Reactive reference for redirect URL
const keySlide: number = Math.floor(Math.random() * 100000);  // Random key for slide identification
const games = ref([]);  // Reactive reference for games array
const error = ref(null);  // Reactive reference for error handling
const loading = ref(true);  // Reactive reference for loading state
const dataEmpty = ref(false);  // Reactive reference for data empty state
const opacityClass = ref('opacity-100');
const isDesktop = computed(() => window.innerWidth >= 1280) as any;  // Computed property for desktop detection
const computedClass = computed(() => {
    return isDesktop.value ? opacityClass.value : '';  // Dynamic class based on desktop detection
});

// Function to handle window resize
const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1280;  // Update desktop detection on resize
};

// Function to handle mouse enter event
const handleMouseEnter = () => {
	if (props.data['mouseleave']) {
		opacityClass.value = 'opacity-100';  // Set opacity to 100 on mouse enter
	}
};

const analyticsAttrs = {
    viewAll: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:view-all`,
        'data-analytics-context': `component:SliderCasino9|layout:${appComponent.config.layout}`
    },
    arrowPrev: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:arrow-prev`,
        'data-analytics-context': `component:SliderCasino9|layout:${appComponent.config.layout}`
    },
    arrowNext: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:arrow-next`,
        'data-analytics-context': `component:SliderCasino9|layout:${appComponent.config.layout}`
    },
    game: (game: any) => ({
        'data-analytics-id': `${game.id}`,
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:game`,
        'data-analytics-position': `${games.value.findIndex((g: any) => g.id === game.id) + 1}`,
        'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasino9|layout:${appComponent.config.layout}`,
    })
}

// Function to fetch games from API
const getGames = async () => {
	loading.value = true;  // Set loading state to true
	await apiService
		.requestGet(appComponent.config.urlVirtualplayPython ?? 'https://gameservice.virtualsoft.tech/', {
			action: props.data['action'],  // Action parameter for API request
			partner_id: appComponent?.partnerG ?? null,  // Partner ID parameter
			country: appComponent?.country ?? null,  // Country parameter
			offset: 0,  // Offset for pagination
			limit: props.data['limit'],  // Limit for number of games
			isMobile: appComponent.mobile == '1',  // Mobile detection
			provider: providerSelect.value === null ? undefined : providerSelect.value?.name,  // Provider parameter
			category: categorySelect.value === null ? undefined : categorySelect.value?.id,  // Category parameter
		})
		.then((response: any) => {
			games.value = response.data.games;  // Set games from API response
			loading.value = false;  // Set loading state to false
			dataEmpty.value = games.value.length === 0;  // Check if games array is empty
		})
		.catch((err) => {
			error.value = err;  // Set error if API request fails
			games.value = [];  // Clear games array
			loading.value = false;  // Set loading state to false
			dataEmpty.value = true;  // Set data empty state to true
		});
};

// Function to construct redirect URL based on current route and selected provider/category
const urlRedirect = () => {
	const currentUrl = router.currentRoute.value.fullPath;  // Get current route
	const providerName = providerSelect.value?.name || '';  // Get provider name
	const category = categorySelect.value !== null ? categorySelect.value : '';  // Get category
	let newPath: string;  // Variable to hold new path
	if (currentUrl.includes('new-casino')) {
		if (category) {
			newPath = providerName
				? `/new-casino/categoria/${category.id}/proveedor/${providerName}`
				: `/new-casino/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/new-casino/proveedor/${providerName}` : '/new-casino';
		}
	} else if (currentUrl.includes('virtuales-lobby')) {
		if (category) {
			newPath = providerName
				? `/virtuales-lobby/categoria/${category.id}/proveedor/${providerName}`
				: `/virtuales-lobby/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/virtuales-lobby/proveedor/${providerName}` : '/virtuales-lobby';
		}
	} else if (currentUrl.includes('live-casino-vivo')) {
		if (category) {
			newPath = providerName
				? `/live-casino-vivo/categoria/${category.id}/proveedor/${providerName}`
				: `/live-casino-vivo/categoria/${category.id}`;
		} else {
			newPath = providerName ? `/live-casino-vivo/proveedor/${providerName}` : '/live-casino-vivo';
		}
	} else {
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
    getGames();  // Fetch games on mount
	urlRedirect();  // Set redirect URL on mount
	let count = 0;  // Counter for swiper initialization
	const intervalSwiper = setInterval(() => {
		count++;
		try {
			const swiperElements = document.querySelectorAll('.swiper-container-' + keySlide) as NodeListOf<Element>;  // Select swiper elements
			if (swiperElements.length > 0 || count > 10) {
				clearInterval(intervalSwiper);  // Clear interval if swiper elements are found
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
});

// Lifecycle hook for component unmounted
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);  // Remove resize event listener
});

// Watcher for provider and category changes
watch([providerSelect, categorySelect], () => {
	getGames();  // Fetch games on change
	urlRedirect();  // Update redirect URL on change
});
</script>
<style scoped>
@media (min-width: 768px) {
	#swiper-button-left > svg > path.child {
		display: none !important;  /* Hide child SVG path on larger screens */
	}
	#swiper-button-right > svg > path.child {
		display: none !important;  /* Hide child SVG path on larger screens */
	}
}
#swiper-button-left > svg > path.child {
	display: block;  /* Show child SVG path on smaller screens */
}
#swiper-button-left:hover > svg > path.child {
	display: block !important;  /* Ensure child SVG path is shown on hover */
}
#swiper-button-right > svg > path.child {
	display: block;  /* Show child SVG path on smaller screens */
}
#swiper-button-right:hover > svg > path.child {
	display: block !important;  /* Ensure child SVG path is shown on hover */
}
.opacity-100 {
	opacity: 1;  /* Class for 100% opacity */
}
</style>

<!-- FILE DOCUMENTED -->

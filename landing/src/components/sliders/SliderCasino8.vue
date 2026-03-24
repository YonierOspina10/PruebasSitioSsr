<template>
	<!-- Main section for displaying games, shown only if there are games available -->
	<section v-if="games.length > 0" class="w-full px-2 md:px-4 flex flex-col justify-center items-center gap-4 mb-8 mt-10 md:max-w-[80%] max-w-[90%] gap-6 place-self-center">
		<!-- Container for navigation buttons and game display -->
		<div class="w-full flex justify-around items-center pb-10 md:pb-0">
			<!-- Left navigation button for the swiper -->
			<button
			id="swiper-button-left"
			:class="'slidePrev-' + keySlide"
			class="group flex justify-center items-center relative min-w-[20px] md:min-w-[50px] z-50"
            v-bind="analyticsAttrs.arrowPrev"
			>
			<!-- Flecha principal -->
			<ChevronLeftIcon
				class="fill-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
			/>

			<!-- Flecha secundaria (hover), más pequeña y desplazada -->
			<ChevronLeftIcon
				class="absolute right-[-2px] md:right-[4px] top-1/2 -translate-y-1/2 
					max-w-[15px] md:max-w-[25px] max-h-[25px]
					fill-transparent group-hover:fill-primary-content
					transition-all duration-300"
			/>
			</button>
			<!-- Loading placeholder shown while games are being fetched -->
			<div v-if="loading" class="w-[95%] h-[220px] md:h-[303px] overflow-hidden">
				<div
					class="grid grid-cols-6 grid-rows-2 gap-x-4 gap-y-10 md:gap-y-14 w-[800px] md:w-full place-content-center">
					<AnimatedPlaceholder
						v-for="index in 12"
						:key="index"
						class="w-[110px] h-[90px] md:w-[153px] md:h-[123px] rounded-2xl m-auto"
					/>
				</div>
			</div>
			<!-- Game display area, shown when loading is complete -->
			<div v-else class="w-full max-w-[85%] md:max-w-[90%]">
				<!-- Swiper container for mobile view -->
				<swiper-container
          v-if="games.length > 0"
					class="w-full h-[220px] md:hidden"
					:class="'swiper-container-' + keySlide"
					:slides-per-view="'auto'"
					:space-between="20"
					:mousewheel="true"
					:mousewheel-force-to-axis="true"
					:free-mode="true"
					:direction="'horizontal'"
					:grid-rows="2"
					:navigation="{
						enabled: false,
						nextEl: '.slideNext' + keySlide,
						prevEl: '.slidePrev' + keySlide,
					}"
				>
					<!-- Individual game slide -->
					<swiper-slide
						v-for="(game, index) in games"
						:key="index"
						ref="card"
						:data-index="index"
						class="w-[120px] h-[100px] rounded-xl bg-secondary cursor-pointer"
					>
						<CardGame8 :game="game" :analytics-attrs="analyticsAttrs.game(game)" />
					</swiper-slide>
				</swiper-container>
        <!-- Swiper container for desktop view -->
        <swiper-container
          v-if="games.length > 0"
          class="w-full h-[303px] hidden md:block"
          :class="'swiper-container-' + keySlide"
          :slides-per-view="'auto'"
          :space-between="40"
          :mousewheel="true"
          :mousewheel-force-to-axis="true"
          :free-mode="true"
          :direction="'horizontal'"
          :grid-rows="2"
          :navigation="{
						enabled: false,
						nextEl: '.slideNext' + keySlide,
						prevEl: '.slidePrev' + keySlide,
					}"
        >
          <!-- Individual game slide for desktop -->
          <swiper-slide
            v-for="(game, index) in games"
            :key="index"
            ref="card"
            :data-index="index"
            class="w-[153px] h-[123px] rounded-xl bg-base-300 cursor-pointer"
          >
            <CardGame8 :game="game" :analytics-attrs="analyticsAttrs.game(game)" />
          </swiper-slide>
        </swiper-container>
        <!-- Message displayed when no games are available -->
        <div v-else class="w-full h-[303px] flex justify-center items-center">
          <p class="text-center text-primary">{{ $t('No hay juegos disponibles') }}</p>
        </div>
			</div>
			<!-- Right navigation button for the swiper -->
			<button
			id="swiper-button-right"
			:class="'slideNext-' + keySlide"
			class="group flex justify-center items-center rotate-180 relative min-w-[20px] md:min-w-[50px] z-50"
            v-bind="analyticsAttrs.arrowNext"
			>
			<!-- Flecha principal -->
			<ChevronLeftIcon
				class="fill-primary-content max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] transition-all duration-300"
			/>

			<!-- Flecha secundaria (hover), más pequeña y desplazada -->
			<ChevronLeftIcon
				class="absolute right-[-2px] md:right-[4px] top-1/2 -translate-y-1/2 
					max-w-[15px] md:max-w-[25px] max-h-[25px]
					fill-transparent group-hover:fill-primary-content
					transition-all duration-300"
			/>
			</button>
		</div>
		<!-- Button to redirect to more games -->
		<Button type="link" :action="redirectUrl" v-bind="analyticsAttrs.viewAll">{{ 'Más juegos' }}</Button>
	</section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'; // Importing Vue composition API functions
import { storeToRefs } from 'pinia'; // Importing Pinia store helper
import { useRouter } from 'vue-router'; // Importing Vue Router for navigation
import { useCasinoStore, useAppcomponentStore } from '../../stores'; // Importing stores
import apiService from '../../services/ApiService'; // Importing API service for data fetching
import Button from '../../components/buttons/Button.vue'; // Importing Button component
import AnimatedPlaceholder from '../../components/AnimatedPlaceholder.vue'; // Importing AnimatedPlaceholder component
import CardGame8 from '../../components/cards/CardGame8.vue'; // Importing CardGame8 component
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue';
import { toKebabCase } from '@/utils';
// Defining component props
const props = defineProps({
	data: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

// Accessing app component and casino store
const appComponent = useAppcomponentStore().appComponent;
const casinoStore = useCasinoStore();
const { providerSelect, categorySelect } = storeToRefs(casinoStore);
const router = useRouter(); // Router instance for navigation
const redirectUrl = ref(''); // Reactive reference for redirect URL
const keySlide: number = Math.floor(Math.random() * 1000); // Random key for swiper slides
const games = ref([]); // Reactive reference for games data
const error = ref(null); // Reactive reference for error handling
const loading = ref(true); // Reactive reference for loading state

// Function to fetch games from the API
const getGames = async () => {
	loading.value = true; // Set loading state to true
	await apiService
		.requestGet(appComponent.config.urlVirtualplayPython ?? 'https://gameservice.virtualsoft.tech/', {
			action: props.data['action'],
			partner_id: appComponent?.partnerG ?? null,
			country: appComponent?.country ?? null,
			offset: 0,
			limit: props.data['limit'],
      typelobby: props.data['typelobby'],
			isMobile: appComponent.mobile == '1',
			provider: providerSelect.value === null ? undefined : providerSelect.value?.name,
			category: categorySelect.value === null ? undefined : categorySelect.value?.id,
		})
		.then((response: any) => {
			games.value = response.data.games; // Update games data with response
			loading.value = false; // Set loading state to false
		})
		.catch((err) => {
      error.value = err; // Capture error
      loading.value = false; // Set loading state to false
    });
};

// Function to construct redirect URL based on current route and selected filters
const urlRedirect = () => {
	const currentUrl = router.currentRoute.value.fullPath; // Get current route path
	const providerName = providerSelect.value?.name || ''; // Get selected provider name
	const category = categorySelect.value !== null ? categorySelect.value : ''; // Get selected category
	let newPath: string; // Variable to hold new path

	// Construct new path based on current URL and selected filters
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
	redirectUrl.value = newPath; // Update redirect URL
};

const analyticsAttrs = {
    viewAll: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:view-all`,
        'data-analytics-context': `component:SliderCasino8|layout:${appComponent.config.layout}`
    },
    arrowPrev: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:arrow-prev`,
        'data-analytics-context': `component:SliderCasino8|layout:${appComponent.config.layout}`
    },
    arrowNext: {
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:arrow-next`,
        'data-analytics-context': `component:SliderCasino8|layout:${appComponent.config.layout}`
    },
    game: (game: any) => ({
        'data-analytics-id': `${game.id}`,
        'data-analytics-label': `casino:carousel:${toKebabCase(props.data.title)}:game`,
        'data-analytics-position': `${games.value.findIndex((g: any) => g.id === game.id) + 1}`,
        'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasino8|layout:${appComponent.config.layout}`,
    })
}

// Lifecycle hook to run code when component is mounted
onMounted(() => {
	setTimeout(() => {
		// Load Swiper script if not already loaded
		if (document.getElementById('swiper-element-bundle') === null) {
			const cdnSwiper = document.createElement('script');
			cdnSwiper.id = 'swiper-element-bundle';
			cdnSwiper.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
			document.head.appendChild(cdnSwiper);
			cdnSwiper.onload = () => {
				console.log('Swiper loaded'); // Log when Swiper is loaded
			};
		}
		getGames(); // Fetch games
		urlRedirect(); // Construct redirect URL
		let count = 0; // Counter for interval
		const intervalSwiper = setInterval(() => {
			count++;
			try {
				const swiperElements = document.querySelectorAll('.swiper-container-' + keySlide) as NodeListOf<Element>;
				if (swiperElements.length > 0 || count > 10) {
					clearInterval(intervalSwiper); // Clear interval if swiper elements are found
					const buttonNext = document.querySelector('.slideNext-' + keySlide);
					const buttonPrev = document.querySelector('.slidePrev-' + keySlide);
					swiperElements.forEach((swiperEl) => {
						// Add event listeners for navigation buttons
						buttonPrev?.addEventListener('click', function(e) {
							e.preventDefault();
							(swiperEl as any).swiper.slidePrev(); // Navigate to previous slide
						});
						buttonNext?.addEventListener('click', function(e) {
							e.preventDefault();
							(swiperEl as any).swiper.slideNext(); // Navigate to next slide
						});
					});
				}
			} catch (e) {
				console.log(e); // Log any errors
			}
		}, 1000);
	}, 4000); // Delay before executing the code
});

// Watch for changes in provider and category selections to fetch games and update redirect URL
watch([providerSelect, categorySelect], () => {
	getGames(); // Fetch games
	urlRedirect(); // Update redirect URL
});
</script>
<style scoped>
/* Styles for the left swiper button */
#swiper-button-left > svg > path.child {
	display: none; /* Hide child path by default */
}
/* Show child path on hover */
#swiper-button-left:hover > svg > path.child {
	display: block;
}
/* Styles for the right swiper button */
#swiper-button-right > svg > path.child {
	display: none; /* Hide child path by default */
}
/* Show child path on hover */
#swiper-button-right:hover > svg > path.child {
	display: block;
}
</style>

<!-- FILE DOCUMENTED -->

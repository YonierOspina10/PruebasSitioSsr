<template>
    <section 
      v-if="jackpotsList.length > 0"
    class="bg-base-300 w-full h-36 md:h-44 relative flex justify-center items-center border-y-1 border-y-primary" style="background-color: #1E202B;">
        <!-- Desktop background image -->
        <img
            v-if="data2['imgBackgroundDesktop'] && data2['imgBackgroundDesktop'] != ''"
            :src="data2['imgBackgroundDesktop']"
            alt="background-jackpot-desktop"
            class="object-fill w-full h-full absolute top-0 left-0 select-none bg-base-content rounded-3xl"
        />
        <swiper-container
            :modules="modules"
            :slides-per-view="isDesktop ? 3 : 1.25"
            :space-between="10"
            :loop="false"             
            :autoplay="false"        
            :centered-slides="false"  
            :mousewheel="true"
            :mousewheel-force-to-axis="true"
            :navigation="appComponent.mobile == '1' ? true : false"
            class="mySwiper w-full"
            :injectStyles="[
                `
        .swiper-button-prev,
        .swiper-button-next,
        .swiper-button-prev::after,
        .swiper-button-next::after {
          color: white !important;
          width: 20px;
          height: 20px;
          margin-top: -5px;
          margin-right: -10px;
        }
        .swiper-wrapper {
        @media (min-width: 768px) {
            justify-content: center;
        }`,

            ]"
        >
            <swiper-slide
                v-for="jackpot in jackpotsList" :key="jackpot.id"
                class="w-56 md:w-[474.667px]"
            >
                <div class="relative w-56 md:w-96 h-28 mx-auto group cursor-pointer">
                    <!-- Jackpot Card Content -->
                    <div
                        class="w-full h-full rounded-t-xl flex flex-col justify-center items-center gap-3 p-4 backdrop-blur-sm bg-center bg-no-repeat"
                        :style="{
                        backgroundImage: `url(${jackpot.image2 || 'https://images.virtualsoft.tech/ms/msj0212T1760633438.png'})`,
                        backgroundSize: '100% 100%'
                        }"
                    >


                    <!-- Row 1: Icon and Name -->
                    <div class="flex items-center gap-2 group-hover:hidden">
                            <img 
                            :src="jackpot.image" 
                            class="h-8"
                            alt=""
                            >
                            <span class="font-bold text-2xl text-primary" >{{ jackpot.name }}</span>
                        </div>
                        <!-- Row 2: Value -->
                        <div class="text-neutral group-hover:hidden">
                            <span class="font-bold text-2xl" :id="`jackpot_${jackpot.id}`">
                                {{ jackpot.currency || '' }}{{ new Intl.NumberFormat('en-US').format(jackpot.currentValue) }}
                            </span>
                        </div>    
                    </div>

                    <!-- Hover Overlay -->
                    <div
                        v-if="jackpot.totalWinners > 0"
                        class="absolute py-2 inset-2 left-3 right-3 bg-neutral-content/40 backdrop-blur-sm p-3 rounded-lg text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center"
                    >
                        <div class="w-full pb-1 mt-1 border-b border-neutral/50">
                            <p class="text-sm whitespace-nowrap text-neutral">{{ $t('Ganadores:') }} <span class="font-semibold text-neutral">{{ jackpot.totalWinners }}</span></p>
                        </div>
                        <div class="w-full flex flex-col gap-0.5">
                            <p class="font-bold text-base whitespace-nowrap text-neutral">{{$t('Último ganador : ')}} {{jackpot.UserId}}</p>
                            <p class="text-xs whitespace-nowrap text-neutral">{{ jackpot.lastWinDate }}</p>
                            <p class="font-bold text-neutral text-lg whitespace-nowrap">
                                <span class="text-primary">
                                    {{$t('S/')}}
                                </span>
                                {{ jackpot.lastWinAmount }}
                            </p>
                        </div>
                    </div>
                    <!-- Hover Overlay cuando NO hay ganadores -->
                    <div
                        v-else
                        class="absolute top-2 bottom-2 left-4 right-4 bg-neutral-content/40 backdrop-blur-sm p-3 rounded-lg text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center"
                    >
                        <p class="text-center text-neutral text-sm md:text-base font-medium leading-tight">
                        {{ $t('¡El Jackpot sigue creciendo! Aún nadie lo ha ganado, ¿serás tú el próximo afortunado?') }}
                        </p>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'; // Vue composition API imports for reactivity and lifecycle
import { Swiper, SwiperSlide } from 'swiper/vue'; // Swiper components for creating carousels
import { Navigation, Autoplay } from 'swiper/modules'; // Swiper modules for navigation and autoplay functionality
import { useScreenSize } from '@/composables/useScreenSize'; // Custom composable to detect screen size
import { useAppcomponentStore } from '@/stores/AppComponent'; // Pinia store for accessing app-wide configuration
import type { Jackpot } from '@/interface'; // Type definition for Jackpot objects
const currentJackpotValues = ref([])

// Define props for the component
const props = defineProps<{
    data?: {
        timeIntegers?: number;
        timeDecimals?: number;
    }[];
}>();

// Computed properties to get time intervals from props with default values
const timeIntegers = computed(() => props.data?.[0]?.timeIntegers ?? 2000);
const timeDecimals = computed(() => props.data?.[0]?.timeDecimals ?? 50);

// Interval for slider movement
const interval = ref<number | null>(null); 
// Detect if the screen width corresponds to desktop devices
const { isDesktop } = useScreenSize(1024);

// Define Swiper modules used in this component
const modules = [Navigation, Autoplay];

// Reactive reference to the global app component store
let appComponent = ref<any>(useAppcomponentStore().appComponent);

// Reactive reference to jackpot configuration data from the app config
let data2 = ref<any>(appComponent.value.config.jackpotsWinners);

// Reactive object to store theme color configuration
let colors = ref({});

// Reactive reference to store the list of jackpots
const jackpotsList = ref([]);

// Initialize the jackpots list using the store's jackpot winners data
jackpotsList.value = appComponent.value.jackpotWinnersList;

/**
 * Function that simulates jackpot counters increasing their values periodically.
 * It finds DOM elements by their IDs and updates the displayed value incrementally.
 */
const jackpotIntervals = new Map(); // Stores active interval timers for each jackpot by its unique ID, preventing multiple intervals from running simultaneously for the same jackpot.
const loading = ref(false); // Reactive variable indicating whether the component has finished initializing jackpot counters (currently unused but available for UI state handling).

const startJackpotCounters = () => {
  jackpotsList.value.forEach(jackpot => { // Iterate through all jackpots in the reactive list.
    const element = document.getElementById(`jackpot_${jackpot.id}`); // Retrieve the DOM element corresponding to the current jackpot using its unique ID.
    if (!element) return; // If the element does not exist in the DOM, skip to the next jackpot.

    // Clear any existing interval for this jackpot to prevent overlapping increments.
    if (jackpotIntervals.has(jackpot.id)) {
      clearInterval(jackpotIntervals.get(jackpot.id)); // Stop the previous interval.
      jackpotIntervals.delete(jackpot.id); // Remove the interval reference from the Map.
    }

    let value = jackpot.currentValue || 0; // Initialize the starting value of the jackpot counter, using 0 as a fallback.
    const currency = jackpot.currency ? jackpot.currency.trim() : ''; // Ensure currency is a valid string, removing any unwanted whitespace.

    // Create a new interval timer for this jackpot, which will increment its displayed value periodically.
    const interval = setInterval(() => {
      value += 1; // Increase the jackpot amount by 1 unit on each interval tick.
      if (element) {
        // Update the DOM element's text content with the formatted value and its currency prefix.
        element.textContent = `${currency}${new Intl.NumberFormat('en-US').format(value)}`;
      } else {
        // If the element no longer exists (e.g., the component was destroyed or the DOM updated),
        // clear the interval to avoid memory leaks and remove its reference from the Map.
        clearInterval(interval);
        jackpotIntervals.delete(jackpot.id);
      }
    }, 2000); // The interval duration is set to 2000 milliseconds (2 seconds).

    // Store the active interval reference in the Map, indexed by the jackpot ID,
    // allowing future cleanup or updates without duplicating intervals.
    jackpotIntervals.set(jackpot.id, interval);
  });
};


/**
 * Function that determines which color configuration to use based on
 * whether the device is mobile or desktop and whether the light or default theme is active.
 */
const colorsConfig = () => {
    if (appComponent.value.mobile == '1' && appComponent.value.config.theme_colors_mobile != undefined) {
        // Use mobile color theme
        colors.value = appComponent.value.config.theme_colors_mobile;
    } else if (appComponent.value.mobile == '' && appComponent.value.config.theme_colors_desktop != undefined) {
        // Use desktop color theme
        colors.value = appComponent.value.config.theme_colors_desktop;
    } else if (appComponent.value.mobile == '' && appComponent.value.config.theme_colors_desktop_ligth != undefined) {
        // Use desktop light color theme
        colors.value = appComponent.value.config.theme_colors_desktop_ligth;
    } else if (appComponent.value.mobile == '1' && appComponent.value.config.theme_colors_mobile_ligth != undefined) {
        // Use mobile light color theme
        colors.value = appComponent.value.config.theme_colors_mobile_ligth;
    }
};

const updateJackpotFromDOM = (jackpot) => {
  if (jackpotIntervals.has(jackpot.id)) {
    clearInterval(jackpotIntervals.get(jackpot.id)!);
    jackpotIntervals.delete(jackpot.id);
  }

  let element = document.getElementById(`jackpot_${jackpot.id}`);
  if (element) {
    if (!jackpot.counterStyle || jackpot.counterStyle == 2) {
      let value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
      if (!isNaN(value)) {
        const id = setInterval(() => {
          const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
          value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
          value += 1;
          elements.forEach((element) => {
            element.textContent = new Intl.NumberFormat('en-US').format(value).toString();
          });
        }, timeIntegers.value);
        jackpotIntervals.set(jackpot.id, id);
      }
    } else if (jackpot.counterStyle == 1) {
      let value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
      if (!isNaN(value)) {
        const id = setInterval(() => {
          const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
          value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
          value += 0.09;
          elements.forEach((element) => {
            element.textContent = new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(value).toString();
          });
        }, timeDecimals.value);
        jackpotIntervals.set(jackpot.id, id);
      }
    }
  }
};

/**
 * Watcher that reacts to changes in the jackpot list from the store.
 * It reinitializes counters and updates jackpot values when the list changes.
 */
watch(() => appComponent.value.jackpotWinnersList, (newVal) => {
    jackpotsList.value = newVal; // Update the local jackpot list

    if (jackpotsList.value.length < 3) clearInterval(interval.value); // Stop updating if fewer than 3 jackpots

    // Delay initialization to ensure DOM is ready
    setTimeout(() => {
        jackpotsList.value.forEach((jackpot: Jackpot) => {
            currentJackpotValues.value.push({
                id: jackpot.id,
                current: jackpot.currentValue,
            });
        });

        loading.value = true; // Indicate loading complete

        // Update DOM jackpot values after small delay
        setTimeout(() => {
            jackpotsList.value.forEach((jackpot: Jackpot) => {
                updateJackpotFromDOM(jackpot);
            });
        }, 500);
    }, 1000);
});

/**
 * Lifecycle hook that runs once the component is mounted.
 * It initializes jackpot counters and applies color configuration.
 */
onMounted(() => {
    // Delay starting counters to ensure DOM elements are available
    setTimeout(() => {
        startJackpotCounters();
    }, 500);

    // Load color configuration based on device and theme
    colorsConfig();
});
</script>

<style>
/* Global styles for Swiper navigation */
.mySwiper .swiper-button-next,
.mySwiper .swiper-button-prev {
    color: white !important;
}

/* Hide navigation on mobile */
@media (max-width: 1023px) {
    .mySwiper .swiper-button-next,
    .mySwiper .swiper-button-prev {
        display: none !important;
    }
}
</style>


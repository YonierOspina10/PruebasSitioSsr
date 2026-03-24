<template>
  <section 
    v-if="jackpotsList.length > 0"

  class="jackpot-section">
    <!-- Desktop background image -->
    <img
      v-if="data2['imgBackgroundDesktop'] && data2['imgBackgroundDesktop'] != ''"
      :src="data2['imgBackgroundDesktop']"
      alt="background-jackpot-desktop"
      class="jackpot-background"
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
      class="jackpot-swiper"
      :injectStyles="[`
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
        }
        @media (max-width: 768px) {
            gap: 3rem;
        }
            `
        ]"
    >
      <swiper-slide
        v-for="jackpot in jackpotsList"
        :key="jackpot.id"
        class="jackpot-slide"
      >
        <div class="jackpot-card-winner">
          <div
            class="jackpot-content"
            :style="{ backgroundImage: `url(${jackpot.image2 || 'https://images.virtualsoft.tech/ms/msj0212T1760633438.png'})` }"
          >
            <!-- Row 1: Icon and Name -->
            <div class="jackpot-header">
              <img :src="jackpot.image" class="jackpot-icon" alt="" />
              <span class="jackpot-name">{{ jackpot.name }}</span>
            </div>

            <!-- Row 2: Value -->
            <div class="jackpot-value">
              <span class="jackpot-amount" :id="`jackpot_${jackpot.id}`">
                                {{ jackpot && jackpot.currency ? jackpot.currency : '' }}{{ jackpot && jackpot.currentValue ? new Intl.NumberFormat('en-US').format(jackpot.currentValue) : '' }}
            </span>
            </div>
          </div>

          <!-- Hover Overlay con ganadores -->
          <div
            v-if="jackpot.totalWinners > 0"
            class="jackpot-overlay jackpot-overlay--winners"
          >
            <div class="overlay-header">
              <p>{{ $t('Ganadores:') }} <span>{{ jackpot.totalWinners }}</span></p>
            </div>
            <div class="overlay-body">
              <p class="winner-name">{{ $t('Último ganador : ') }} {{ jackpot.UserId }}</p>
              <p class="winner-date">{{ jackpot.lastWinDate }}</p>
              <p class="winner-amount">
                <span class="currency">{{ $t('S/') }}</span>
                {{ jackpot.lastWinAmount }}
              </p>
            </div>
          </div>

          <!-- Hover Overlay sin ganadores -->
          <div
            v-else
            class="jackpot-overlay jackpot-overlay--no-winners"
          >
            <p class="no-winner-text">
              {{ $t('¡El Jackpot sigue creciendo! Aún nadie lo ha ganado, ¿serás tú el próximo afortunado?') }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </section>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'; // Vue composition API imports for reactivity and lifecycle
import { Swiper, SwiperSlide } from 'swiper/vue'; // Swiper components for creating carousels
import { Navigation, Autoplay } from 'swiper/modules'; // Swiper modules for navigation and autoplay functionality
import { useScreenSize } from '@/composables/useScreenSize'; // Custom composable to detect screen size
import { useAppcomponentStore } from '@/stores/AppComponent'; // Pinia store for accessing app-wide configuration
import type { Jackpot } from '@/interface'; // Type definition for Jackpot objects

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


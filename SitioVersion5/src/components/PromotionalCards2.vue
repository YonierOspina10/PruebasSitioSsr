<script setup lang="ts">
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'; // Imports the left-chevron icon component.
import { onMounted, onUnmounted, ref, watch } from 'vue'; // Imports Vue lifecycle and reactivity utilities.
import { useTouchEvent } from '@/composables/useTouchEvent'; // Imports custom composable for touch and drag events.
import { useRedirect } from '@/composables/useRedirect'; // Imports custom composable to handle redirection.
import { useScreenSize } from '@/composables/useScreenSize'; // Imports composable to detect screen size.
import type { Promotional } from '@/interface/IPromotionals'; // Imports type definition for promotional items.
import { useAppcomponentStore } from '@/stores/AppComponent'; // Imports the global store containing app config.
import { useGetInfoFirestore } from '../composables/useInfoFirestore'; // Import function to get banners data from firestore

const emits = defineEmits<{ (e: 'onClickModal', isOpen: boolean): void }>(); // Defines component event emitter for closing the modal.
const bonuses = ref<Promotional[]>([]); // Reactive array containing promotions or home cards.
const sourceType = ref<'promotions' | 'home_cards'>('promotions'); // Tracks which source is being used.

const appComponent = useAppcomponentStore().appComponent; // Accesses the global configuration object.
const currentIndex = ref(0); // Current index for the slider (not directly used in rotation logic here).
const cardWidthPercentage = ref(100 / 3); // Width percentage for each card based on item count.

const { handleMouseDown, isDragging, isRedirect } = useTouchEvent(); // Gets touch/drag handlers and redirect flag.
const { redirect } = useRedirect(isRedirect); // Gets redirect handler to navigate when clicking a slide.
const { isDesktop } = useScreenSize(); // Detects if the user is on desktop.

const loadBanners = async () => { // Loads and prepares promotional banners or home cards.
  let banner_promotions: any[] = []; // Temporary array for incoming banners.
  let type: 'promotions' | 'home_cards' = 'promotions'; // Default type is promotions.

  const isLogged = appComponent.session?.logueado; // Checks if the user is logged in.
  const lng = appComponent.lngProd; // Gets the current language.
  const country = appComponent.country; // Gets the current country.

  //Get banners data from Firebase
  const firestoreBanners = await useGetInfoFirestore(appComponent.config, appComponent, 'banner_promotions', { useLogin: true, useScope: true });
  if (firestoreBanners?.length) {
      banner_promotions = firestoreBanners;
      type = 'promotions';
  } else {
      if (isLogged) {
          // Loads logged-in config.
          banner_promotions =
              appComponent.config?.login?.[lng]?.banners?.banner_promotions || // Gets promotions for logged user.
              appComponent.config?.login?.[lng]?.HOME_IMG_CARD || // Fallback to home card images.
              [];
      } else {
          // Loads non-logged-in config.
          banner_promotions =
              appComponent.config?.not_login?.[lng]?.banners?.banner_promotions || // Gets promotions for guest user.
              appComponent.config?.not_login?.[lng]?.HOME_IMG_CARD || // Fallback to home card images.
              [];
      }

      if (!banner_promotions.length) {
          // If no promotions found, load HOME_CARDS from global window config.
          const cards = isLogged
              ? (window as any).cconfig.HOME_CARDS_IMAGES_LOGUEADO // Logged-in home cards.
              : (window as any).cconfig.HOME_CARDS_IMAGES_NOLOGUEADO; // Guest home cards.

          banner_promotions = cards?.[country]?.[lng] || []; // Loads cards by country and language.
          type = 'home_cards'; // Sets source type to home cards.
      }
  }

  if (type === 'home_cards') { // Maps home card format to a unified structure.
    banner_promotions = banner_promotions.map((e, i) => ({
      url: e.url || e.MENU_IMG_URL, // Maps image URL.
      redirect: e.redirect || e.MENU_URL || '/', // Maps redirection URL.
      id: e.id || e.MENU_ID || `home_${i}`, // Generates or maps ID.
    }));
  }

  if (type === 'promotions') { // Filters promotions based on start and end dates.
    const now = new Date(); // Gets current date.

    bonuses.value = banner_promotions.filter((item) => { // Filters valid promotions.
      const start = item.startDate ? new Date(item.startDate.replace(' ', 'T')) : null; // Parses start date.
      const end = item.date ? new Date(item.date.replace(' ', 'T')) : null; // Parses end date.

      if (start && end) return now >= start && now <= end; // Valid in range.
      if (start && !end) return now >= start; // Valid after start.
      if (!start && end) return now <= end; // Valid until end.
      return true; // If no dates, always valid.
    });
  } else {
    bonuses.value = banner_promotions; // If home_cards, assign directly.
  }

  sourceType.value = type; // Stores the type used for this load.

  const n = bonuses.value.length; // Number of cards.
  if (n <= 1) cardWidthPercentage.value = 100; // One card takes full width.
  else if (n === 2) cardWidthPercentage.value = 50; // Two cards split width.
  else cardWidthPercentage.value = 33.33; // Three or more use third width.
};

onMounted(() => { // Runs on component mount.
  loadBanners(); // Loads banners initially.
  const slideAuto = setInterval(() => moveSlider('right'), 8000); // Auto-slide every 8 seconds.
  onUnmounted(() => clearInterval(slideAuto)); // Clears interval when component unmounts.
});

watch(
  () => appComponent.session?.logueado, // Watches login status.
  () => loadBanners() // Reloads banners if login state changes.
);

const moveSlider = (direction: 'left' | 'right') => { // Moves slider manually or via auto-loop.
  if (!bonuses.value.length) return; // Prevents sliding if no items.

  if (direction === 'left') { // Slide left: rotate items.
    const last = bonuses.value.pop(); // Takes last element.
    if (last) bonuses.value = [last, ...bonuses.value]; // Moves it to the front.
  } else {
    const first = bonuses.value.shift(); // Takes first element.
    if (first) bonuses.value = [...bonuses.value, first]; // Moves it to the end.
  }
};

const onCloseModal = (): void => emits('onClickModal', false); // Emits event to close modal.
</script>


<template>
  <!-- Main container for the slider -->
  <div
    class="h-auto w-[90%] md:w-[80%] mx-auto flex justify-between items-center p-4 my-8 relative z-0 overflow-hidden rounded-2xl bg-transparent">
    <!-- Left button -->
    <button data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`"  v-if="bonuses.length > 1" @click="moveSlider('left')"
      class="group flex justify-center items-center h-auto relative min-w-[20px] md:min-w-[50px] z-50">
      <ChevronLeftIcon class="text-primary-content max-w-[50px] max-h-[50px]" />
      <ChevronLeftIcon
        class="absolute right-[-2px] md:right-1 top-1/2 -translate-y-1/2 max-w-[10px] md:max-w-[30px] max-h-[30px] text-transparent group-hover:text-primary-content transition-all duration-300" />
    </button>

    <!-- Slider Section -->
    <section class="w-full h-full flex justify-center items-center relative overflow-hidden"
      @mousedown="handleMouseDown" @touchstart="handleMouseDown">
      <div 
                 class="flex transition-transform duration-700 ease-in-out" :style="{
        width: `${bonuses.length * cardWidthPercentage}%`,
        transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
      }">
        <div v-for="(slide, index) in bonuses" :key="index" class="flex-shrink-0 px-2 transition-all duration-700"
        data-analytics-label="promo:banner:mid"
            :data-analytics-id="slide.idValue"
            :data-analytics-position="index +1"
                :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`"
          :style="{
            width: `${cardWidthPercentage}%`,
            cursor: isDragging ? 'grab' : 'pointer',
          }">
          <RouterLink :to="sourceType === 'promotions'
                            ? slide.redirect
                            : slide.MENU_URL" :id="slide.idValue">
          <img v-if="sourceType === 'promotions'
                                ? slide.url
                                : slide.MENU_IMG_URL"
                :src="sourceType === 'promotions'
                                ? slide.url
                                : slide.MENU_IMG_URL" 
                alt="" draggable="false" @click.stop="onCloseModal"
            class="w-full h-full object-contain rounded-2xl drop-shadow-lg" />
          </RouterLink>
                </div>
            </div>
        </section>

    <!-- Right button -->
    <button 
      data-analytics-label="promo:carousel:arrow-next"
      :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`" v-if="bonuses.length > 1" @click="moveSlider('right')"
      class="group flex justify-center items-center h-auto relative min-w-[20px] md:min-w-[50px] z-50">
      <ChevronLeftIcon class="text-primary-content max-w-[50px] max-h-[50px] rotate-180" />
      <ChevronLeftIcon
        class="absolute left-[-2px] md:left-1 top-1/2 -translate-y-1/2 max-w-[10px] md:max-w-[30px] max-h-[30px] text-transparent group-hover:text-primary-content transition-all duration-300 rotate-180" />
    </button>
  </div>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->
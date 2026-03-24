<script setup lang="ts">
/**
 * Imports necessary Vue composition API functions and other utilities.
 */
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { useAppcomponentStore } from '@/stores/AppComponent';
import { getJackpot } from '@/utils/configHome';
import { getJackpotServices } from '@/services/jackpots/getJackpotServices';
import type { Jackpot, CurrentJackpot, DataJackpot } from '@/interface/IJackpot';
import { useGeneralStore } from '@/stores/general';
import {useScreenSize} from "@/composables/useScreenSize";
import {useTouchEvent} from "@/composables/useTouchEvent";

/**
 * Reactive references and variables used in the component.
 */
let appComponent = ref<any>(useAppcomponentStore().appComponent); // Reference to the app component store
const jackpotActive = useGeneralStore(); // General store for managing active state
const cardWidthPercentage = ref<number>(100 / 3); // Percentage width for jackpot cards
const jackpotsList = ref<Jackpot[]>([]); // List of jackpots
const currentJackpotValues = ref<CurrentJackpot[]>([]); // Current values of jackpots
const interval = ref<number | null>(null); // Interval for slider movement
const { isDesktop } = useScreenSize(640); // Determines if the screen size is desktop
const loading = ref<boolean>(false); // Loading state for jackpots
const jackpotIntervals = new Map<number, number>(); // Map to store intervals for each jackpot
const data = ref<DataJackpot>(getJackpot(appComponent.value)); // Data for jackpot configuration

/**
 * Lifecycle hook: Runs when the component is mounted.
 * Sets the component as active in the general store.
 */
onMounted(() => {
  jackpotActive.setComponentActive(true);
});

/**
 * Initializes the jackpots list from the app component store.
 */
jackpotsList.value = appComponent.value.jackpotsList;

/**
 * Updates the jackpot value in the DOM based on its counter style.
 * @param {Jackpot} jackpot - The jackpot object to update.
 */
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
            element.textContent = new Intl.NumberFormat().format(value).toString();
          });
        }, 2000);
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
        }, 200);
        jackpotIntervals.set(jackpot.id, id);
      }
    }
  }
};

/**
 * Lifecycle hook: Runs when the component is unmounted.
 * Clears the active state and intervals.
 */
onUnmounted(() => {
  jackpotActive.setComponentActive(false);
});

/**
 * Watches for changes in the jackpots list and updates the DOM accordingly.
 * @param {Array} newVal - The new value of the jackpots list.
 */
watch(() => appComponent.value.jackpotsList, (newVal) => {
  jackpotsList.value = newVal;
  if (jackpotsList.value.length < 3) clearInterval(interval.value);

  jackpotIntervals.forEach((id) => clearInterval(id));
  jackpotIntervals.clear();

  setTimeout(() => {
    jackpotsList.value.forEach((jackpot: Jackpot) => {
      currentJackpotValues.value.push({
        id: jackpot.id,
        current: jackpot.currentValue,
      });
    });
    loading.value = true;

    setTimeout(() => {
      jackpotsList.value.forEach((jackpot: Jackpot) => {
        updateJackpotFromDOM(jackpot);
      });
    }, 500);
  }, 1000);
});

/**
 * Moves the slider in the specified direction.
 * @param {'right' | 'left'} direction - The direction to move the slider.
 */
const moveSlider = (direction: 'right' | 'left') => {
  clearInterval(interval.value);
  if (direction === 'left') {
    const last = jackpotsList.value.pop(); // Remueve el último elemento
    if (last !== undefined) {
      jackpotsList.value = [last, ...jackpotsList.value]; // Coloca el último al inicio
    }
  } else if (direction === 'right') {
    const first = jackpotsList.value.shift(); // Remueve el primer elemento
    if (first !== undefined) {
      jackpotsList.value = [...jackpotsList.value, first]; // Coloca el primero al final
    }
  }
  if (jackpotsList.value.length >= 3) {
    interval.value = setInterval(() => {
      moveSlider('right');
    }, 4000);
  }
};

/**
 * Handles touch events for dragging the slider.
 */
const { handleMouseDown, isDragging } = useTouchEvent(moveSlider);

/**
 * Lifecycle hook: Runs when the component is unmounted.
 * Clears the interval for slider movement.
 */
onUnmounted(() => {
  jackpotActive.setComponentActive(false);
  clearInterval(interval.value);
  jackpotIntervals.forEach((id) => clearInterval(id));
  jackpotIntervals.clear();
});
</script>
<template>
    <!-- Main section for displaying jackpots -->
  <section
      v-if="jackpotsList.length > 0"
      class="w-full h-[320px] sm:h-[300px] lg:h-[200px] overflow-hidden relative flex justify-center items-center"
  >
      <!-- Container for the jackpot slider -->
    <div class="relative z-1 w-[90%] sm:w-[77%] mx-auto h-[90%] gap-8 sm:gap-0 top-0 bg-gradient-to-br from-primary-content via-primary-content/20 to-primary-content p-0.5 rounded-3xl">
        <!-- Inner container for the slider content -->
        <div
          class="flex flex-col justify-center items-center relative z-1 w-full mx-auto h-full gap-3 sm:gap-0 top-0 bg-base-300 rounded-3xl p-1"
      >
        <!-- Background image for the slider -->
        <img
            :src="
				isDesktop
					? data != undefined &&
					  data.imgBackgroundDesktop &&
					  data.imgBackgroundDesktop != ''
						? data.imgBackgroundDesktop
						: 'https://images.virtualsoft.tech/site/ecuabet/Gif/Gif%20escritorio%20.gif'
					: data != undefined &&
					  data.imgBackgroundMobile &&
					  data.imgBackgroundMobile != ''
					? data.imgBackgroundMobile
					: 'https://images.virtualsoft.tech/site/ecuabet/Gif/GIF%20MOBILE%20.gif'
			"
            alt=""
            class="object-fill w-full h-full absolute top-0 left-0 z-0 select-none bg-base-content rounded-3xl"
            draggable="false"
        />

        <!-- Title image for the slider -->
        <img
            :src="
					isDesktop
						? data != undefined &&
						  data.imgTitleDesktop &&
						  data.imgTitleDesktop != ''
							? data.imgTitleDesktop
							: 'https://images.virtualsoft.tech/m/msj0212T1732658797.png'
						: data != undefined &&
						  data.imgTitleMobile &&
						  data.imgTitleMobile != ''
						? data.imgTitleMobile
						: 'https://images.virtualsoft.tech/m/msj0212T1732658797.png'
				"
            alt=""
            class="w-[80%] sm:w-auto relative z-50 top-3 sm:top-[0.1rem]"
            draggable="false"
        />

        <!-- Container for the jackpot cards -->
        <div
            class="w-[95%] flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 overflow-hidden sm:h-auto h-full z-50 pr-0 sm:pr-1"
        >
        <!-- Loop through each jackpot in the list -->
          <div
              v-for="(jackpot, index) in jackpotsList"
              class="relative w-[23rem] sm:w-[65rem] h-20 sm:h-24"
          >
            <!-- Container for the jackpot card -->
            <div class="absolute bottom-0 h-full w-full py-0 sm:py-2 place-items-center">
                <!-- Background image for the jackpot card -->
              <img
                  :src="jackpot.image2"
                  alt=""
                  class="absolute w-full h-full sm:h-[90%] object-center"
              />
                <!-- Information button for the jackpot -->
              <button
                  v-if="jackpot.information && jackpot.information != ''"
                  :data-analytics-label="`casino:jackpot:${jackpot.name.toLowerCase().replace(/\s+/g, '-')}`"
                  :data-analytics-context="`component:Jackpots4|layout:layout-${appComponent.config.layout}`"
                  class="absolute -top-1 sm:-top-0 right-4 md:right-1 z-[70] w-[15px] h-[15px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-105 transition-all duration-300"
                  @click="appComponent.JackpotInformation = jackpot.information ?? ''">
                  <!-- SVG icon for the information button -->
                <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_6066_71449)">
                    <path d="M4 10.0809C4 5.60293 4 3.36293 5.391 1.97193C6.782 0.580933 9.021 0.580933 13.5 0.580933C17.978 0.580933 20.218 0.580933 21.609 1.97193C23 3.36293 23 5.60193 23 10.0809C23 14.5589 23 16.7989 21.609 18.1899C20.218 19.5809 17.979 19.5809 13.5 19.5809C9.022 19.5809 6.782 19.5809 5.391 18.1899C4 16.7989 4 14.5599 4 10.0809Z" fill="#FFCC00"/>
                    <path d="M13.742 15.0809V10.0809C13.742 9.60993 13.742 9.37393 13.596 9.22693C13.449 9.08093 13.214 9.08093 12.742 9.08093M13.492 6.08093H13.501H13.492Z" fill="#808080"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7419 6.08093C12.7419 5.66672 13.0777 5.33093 13.4919 5.33093H13.5009C13.9152 5.33093 14.2509 5.66672 14.2509 6.08093C14.2509 6.49515 13.9152 6.83093 13.5009 6.83093H13.4919C13.0777 6.83093 12.7419 6.49515 12.7419 6.08093ZM13.3905 8.35583C13.6098 8.38524 13.8888 8.46077 14.1245 8.6948L14.1281 8.6984L14.1281 8.69842C14.3624 8.93436 14.4377 9.21395 14.4671 9.43286C14.4921 9.61998 14.492 9.84157 14.492 10.0466C14.4919 10.0581 14.4919 10.0696 14.4919 10.0809V15.0809C14.4919 15.4951 14.1562 15.8309 13.7419 15.8309C13.3277 15.8309 12.9919 15.4951 12.9919 15.0809V10.0809C12.9919 9.98188 12.9919 9.90156 12.9908 9.83208C12.9213 9.83097 12.841 9.83093 12.7419 9.83093C12.3277 9.83093 11.9919 9.49515 11.9919 9.08093C11.9919 8.66672 12.3277 8.33093 12.7419 8.33093C12.7534 8.33093 12.7649 8.33093 12.7764 8.33092C12.9818 8.33084 13.2034 8.33076 13.3905 8.35583Z" fill="black"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_6066_71449" x="0" y="0.580933" width="27" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6066_71449"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6066_71449" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </button>
                <!-- Jackpot price and currency -->
              <div class="jackpotPrice absolute md:w-[80%] w-full h-full flex justify-between items-center text-center font-bold bottom-0 mx-auto text-4xl">
                <!-- Jackpot image -->
                <div class="w-[35%]">
                  <img
                      :src="jackpot.image"
                      alt=""
                      class="w-36"
                  />
                </div>
                <!-- Jackpot value -->
                <div class="w-[65%]">

                  <span>{{ jackpot.currency ? jackpot.currency : '' }}</span> <!-- Currency -->
                  <span :id="`jackpot_${jackpot.id}`">
                  {{
                      new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(jackpot.currentValue)
                    }}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
  Styles for the jackpot price text:
  - Applies a gradient background to the text.
  - Uses transparent text fill to display the gradient.
  - Adds a shadow effect for better visibility.
*/
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text; /* Clips the background to the text */
    -webkit-text-fill-color: transparent; /* Makes the text transparent to show the gradient */
    background-clip: text; /* Ensures compatibility for non-webkit browsers */
    text-fill-color: transparent; /* Ensures compatibility for non-webkit browsers */
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5); /* Adds a shadow for better readability */
}
</style>

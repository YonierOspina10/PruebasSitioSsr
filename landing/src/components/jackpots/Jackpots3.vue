<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { useAppcomponentStore } from '@/stores/AppComponent';
import { useScreenSize } from '../../composables/useScreenSize';
import { useTouchEvent } from '../../composables/useTouchEvent';
import { getJackpot } from '../../utils/configHome';
import { useModalStore } from '../../stores/Modal';
import type { Jackpot, CurrentJackpot, DataJackpot } from '../../interfaces/IJackpot';
import { useGeneralStore } from '../../stores/general';

// Reactive reference to the app component state
let appComponent = ref<any>(useAppcomponentStore().appComponent);
// Reactive reference to the modal store
let modals = ref<any>(useModalStore());
// General store for jackpot state management
const jackpotActive = useGeneralStore();
// Percentage width for jackpot cards
const cardWidthPercentage = ref<number>(100 / 3);
// List of jackpots
const jackpotsList = ref<Jackpot[]>([]);
// Current values of jackpots
const currentJackpotValues = ref<CurrentJackpot[]>([]);
// Interval for automatic slider movement
const interval = ref<number | null>(null);
// Screen size detection for responsive design
const { isDesktop } = useScreenSize(640);
// Loading state for jackpots
const loading = ref<boolean>(false);
// Data for jackpot configuration
const data = ref<DataJackpot>(getJackpot(appComponent.value));

const props = defineProps<{
    data: any;
}>();

// Lifecycle hook to run when the component is mounted
onMounted(() => {
    jackpotActive.setComponentActive(true); // Set the active component in the store
    interval.value = setInterval(() => {
        moveSlider('right'); // Move the slider every 4 seconds
    }, 4000);
});

// Function to update jackpot values in the DOM
const updateJackpotFromDOM = (jackpot) => {
    let element = document.getElementById(`jackpot_${jackpot.id}`);
    if (element) {
        // Update logic based on counter style
        if (!jackpot.counterStyle || jackpot.counterStyle == 2) {
            let value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
            if (!isNaN(value)) {
                setInterval(() => {
                    const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
                    value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
                    value += 1; // Increment value by 1
                    elements.forEach((element) => {
                        element.textContent = new Intl.NumberFormat().format(value).toString(); // Format and update text
                    });
                }, props.data['timeIntegers'] ?? 2000);
            }
        } else if (jackpot.counterStyle == 1) {
            let value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
            if (!isNaN(value)) {
                setInterval(() => {
                    const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
                    value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
                    value += 0.09; // Increment value by 0.09
                    elements.forEach((element) => {
                        element.textContent = new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                            .format(value)
                            .toString(); // Format and update text
                    });
                }, props.data['timeDecimals'] ?? 50);
            }
        }
    }
};

// Lifecycle hook to run when the component is unmounted
onUnmounted(() => {
    jackpotActive.setComponentActive(false); // Reset the active component in the store
});

// Watcher to react to changes in the jackpots list
watch(
    () => appComponent.value.jackpotsList,
    (newVal) => {
        jackpotsList.value = newVal; // Update jackpots list
        if (jackpotsList.value.length < 3) clearInterval(interval.value); // Clear interval if less than 3 jackpots
        setTimeout(() => {
            jackpotsList.value.forEach((jackpot: Jackpot) => {
                currentJackpotValues.value.push({
                    id: jackpot.id,
                    current: jackpot.currentValue, // Store current jackpot values
                });
            });
            loading.value = true; // Set loading to true
            setTimeout(() => {
                jackpotsList.value.forEach((jackpot: Jackpot) => {
                    updateJackpotFromDOM(jackpot); // Update DOM for each jackpot
                });
            }, 500);
        }, 1000);
    },
);

// Function to move the slider left or right
const moveSlider = (direction: 'right' | 'left') => {
    clearInterval(interval.value); // Clear existing interval
    if (direction === 'left') {
        const last = jackpotsList.value.pop(); 
        if (last !== undefined) {
            jackpotsList.value = [last, ...jackpotsList.value]; // Move last item to the front
        }
    } else if (direction === 'right') {
        const first = jackpotsList.value.shift(); 
        if (first !== undefined) {
            jackpotsList.value = [...jackpotsList.value, first]; // Move first item to the end
        }
    }
    if (jackpotsList.value.length >= 3) {
        interval.value = setInterval(() => {
            moveSlider('right'); // Restart interval if there are enough jackpots
        }, 4000);
    }
};

// Touch event handling for slider movement
const { handleMouseDown, isDragging } = useTouchEvent(moveSlider);

// Lifecycle hook to clear interval on unmount
onUnmounted(() => {
    clearInterval(interval.value); // Clear interval to prevent memory leaks
});
</script>
<template>
    <!-- Main section for jackpot display -->
    <section
        class="w-full h-[70px] sm:h-[300px] lg:h-[600px] overflow-hidden fixed sm:relative top-[55px] sm:top-0 z-[60] md:z-[9]"
    >
        <!-- Container for jackpot images and information -->
        <div
            class="flex flex-row sm:flex-col justify-center items-center relative z-1 w-full h-full gap-8 sm:gap-0 top-0 sm:top-[-10px] lg:top-[-34px]"
        >
            <!-- Image displayed based on screen size -->
            <img
                :src="
                    isDesktop
                        ? data != undefined && data.imgTitleDesktop && data.imgTitleDesktop != ''
                            ? data.imgTitleDesktop
                            : 'https://images.virtualsoft.tech/m/msj0212T1732658797.png'
                        : data != undefined && data.imgTitleMobile && data.imgTitleMobile != ''
                          ? data.imgTitleMobile
                          : 'https://images.virtualsoft.tech/m/msj0212T1732658797.png'
                "
                alt=""
                class="w-[30%] sm:w-[40%] relative z-50 select-none top-0 sm:top-[70px] max-w-[580px]"
                draggable="false"
            />
            <!-- Container for jackpot cards -->
            <div
                class="w-[30%] sm:w-[60%] flex justify-start items-center overflow-hidden sm:h-auto h-full max-w-[900px] z-50"
                @mousedown="handleMouseDown"
                @touchstart="handleMouseDown"
            >
                <!-- Jackpot card display when loading -->
                <div
                    v-if="loading"
                    v-for="(jackpot, index) in jackpotsList"
                    class="flex-shrink-0 h-[70px] sm:h-[230px] flex flex-col justify-center items-center relative select-none"
                    :class="isDragging ? 'cursor-grab' : ''"
                    :style="
                        !isDesktop
                            ? {
                                  width: `100%`,
                              }
                            : {
                                  width: `${cardWidthPercentage}%`,
                              }
                    "
                >
                    <!-- Container for jackpot details -->
                    <div
                        class="flex flex-col justify-center items-center"
                        :style="{
                            transform: `scale(${index != 1 && jackpotsList.length >= 3 ? 0.7 : 1})`,
                        }"
                    >
                        <!-- GIF image for jackpot -->
                        <img
                            v-if="jackpot.gif && jackpot.gif != ''"
                            :src="jackpot.gif"
                            alt=""
                            class="absolute select-none"
                            draggable="false"
                        />
                        <!-- Button for jackpot information modal -->
                        <button
                            v-if="
                                jackpot.information !== undefined &&
                                jackpot.information !== '' &&
                                jackpot.information !== null
                            "
                            @click="
                                () => {
                                    if (
                                        jackpot.information !== undefined &&
                                        jackpot.information !== '' &&
                                        jackpot.information !== null
                                    ) {
                                        modals.addModal({
                                            showModal: 'ModalJackpot',
                                            messageModal: jackpot.information ?? '',
                                        });
                                    }
                                }
                            "
                            class="absolute top-0 -right-1 sm:top-2 sm:right-2 flex justify-center items-center [&>*]:stroke-neutral-content rounded-full bg-primary-content sm:text-base w-[10px] h-[10px] sm:h-[20px] sm:w-[20px] bg-gradient-to-b from-neutral-content/0 to-neutral-content/30"
                        >
                            <svg
                                width="70%"
                                height="70%"
                                viewBox="0 0 7 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.09766 5.74609H3.55464V12.3492"
                                    stroke-width="1.10372"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M0.751953 12.5H6.04983"
                                    stroke-width="1.10372"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M3.40037 3.44136C3.1574 3.44136 2.91988 3.36931 2.71785 3.23432C2.51583 3.09933 2.35837 2.90747 2.26539 2.68299C2.17241 2.45851 2.14808 2.21151 2.19548 1.9732C2.24288 1.7349 2.35989 1.516 2.53169 1.34419C2.7035 1.17238 2.9224 1.05538 3.1607 1.00798C3.39901 0.960579 3.64601 0.984907 3.87049 1.07789C4.09497 1.17087 4.28683 1.32833 4.42182 1.53035C4.55681 1.73238 4.62886 1.9699 4.62886 2.21287C4.62886 2.53868 4.49943 2.85116 4.26904 3.08154C4.03866 3.31193 3.72618 3.44136 3.40037 3.44136Z"
                                />
                            </svg>
                        </button>
                        <!-- Main jackpot image -->
                        <img
                            v-if="jackpot.image != undefined"
                            :src="
                                jackpot.image != ''
                                    ? jackpot.image
                                    : 'https://images.virtualsoft.tech/m/msj0212T1732564721.png'
                            "
                            alt=""
                            class="w-[60%] h-[30%] object-contain scale-[1.4] sm:scale-100 max-w-[151px] max-h-[41px]"
                            draggable="false"
                        />
                        <!-- Secondary jackpot image -->
                        <div class="flex justify-center items-center h-[70%]">
                            <img
                                v-if="jackpot.image2 != undefined"
                                :src="
                                    jackpot.image2 != ''
                                        ? jackpot.image2
                                        : 'https://images.virtualsoft.tech/m/msj19212T1732557661.png'
                                "
                                alt=""
                                class="w-[100%] h-full object-contain max-w-[233px] max-h-[95px]"
                                draggable="false"
                            />
                            <!-- Jackpot current value display -->
                            <p
                                :id="`jackpot_${jackpot.id}`"
                                class="absolute font-poppinsm text-xs sm:text-3xl max-w-[52%] sm:max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                                {{
                                    new Intl.NumberFormat().format(
                                        currentJackpotValues.find((item) => item.id == jackpot.id)?.current,
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Background image for the section -->
        <img
            :src="
                isDesktop
                    ? data != undefined && data.imgBackgroundDesktop && data.imgBackgroundDesktop != ''
                        ? data.imgBackgroundDesktop
                        : 'https://images.virtualsoft.tech/m/msj19212T1732551689.png'
                    : data != undefined && data.imgBackgroundMobile && data.imgBackgroundMobile != ''
                      ? data.imgBackgroundMobile
                      : 'https://images.virtualsoft.tech/m/msj19212T1732551689.png'
            "
            alt=""
            :class="{ 'border-y-2 border-primary-content border-solid': !isDesktop }"
            class="object-fill w-full h-full absolute top-0 left-0 z-0 select-none bg-neutral-content"
            draggable="false"
        />
    </section>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

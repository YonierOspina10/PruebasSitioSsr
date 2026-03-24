<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon.vue';
import { useAppcomponentStore } from '../../stores/AppComponent';
import { useTouchEvent } from '../../composables/useTouchEvent';
import { useRedirect } from '../../composables/useRedirect';
import { useScreenSize } from '../../composables/useScreenSize';
import type { Promotional } from '../../interfaces/IPromotionals';

const props = defineProps<{ promotions: Promotional[] }>();
const emits = defineEmits<{ (e: 'onClickModal', isOpen: boolean): void }>();

const appComponent = ref<any>(useAppcomponentStore().appComponent);
const bonuses = ref<Promotional[]>([]);
const currentIndex = ref(0);
const cardWidthPercentage = ref(100 / 3);

const { handleMouseDown, isDragging, isRedirect } = useTouchEvent();
const { redirect } = useRedirect(isRedirect);
const { isDesktop } = useScreenSize();

// ✅ Un solo estilo para ambos modos
watch(isDesktop, (val) => {
    cardWidthPercentage.value = val ? 100 / 3 : 100; // 3 tarjetas desktop, 1 tarjeta mobile
});

onMounted(() => {
    if (props.promotions?.length > 0) bonuses.value = props.promotions;
    cardWidthPercentage.value = isDesktop.value ? 100 / 3 : 100;

    const slideAuto = setInterval(() => moveSlider('right'), 8000);
    onUnmounted(() => clearInterval(slideAuto));
});

const moveSlider = (direction: 'left' | 'right') => {
    if (!bonuses.value.length) return;

    if (direction === 'left') {
        const last = bonuses.value.pop();
        if (last) bonuses.value = [last, ...bonuses.value];
    } else {
        const first = bonuses.value.shift();
        if (first) bonuses.value = [...bonuses.value, first];
    }
};

const getSrcsetFm = (imageUrl: string) => {
    if (!imageUrl) return '';
    const baseUrl = imageUrl.split('?')[0];
    return `${baseUrl}?fm=webp`;
};

// Function to close the modal
const onCloseModal = (): void => {
    emits('onClickModal', false); // Emit event to close modal
};
</script>
<template>
    <!-- Main container for the slider -->
    <div
        class="h-auto w-[90%] md:w-[80%] mx-auto flex justify-between items-center p-4 my-8 relative z-0 rounded-2xl bg-transparent"
    >
        <!-- Left button -->
        <button
            v-if="bonuses.length > 1"
            data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`"
            @click="moveSlider('left')"
            class="group flex items-center justify-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative z-50 shrink-0"
        >
            <ChevronLeftIcon class="text-primary-content max-w-[50px] max-h-[50px]" />
            <ChevronLeftIcon
                class="absolute right-[-2px] md:right-1 top-1/2 -translate-y-1/2 max-w-[10px] md:max-w-[30px] max-h-[30px] text-transparent group-hover:text-primary-content transition-all duration-300"
            />
        </button>

        <!-- Slider Section -->
        <section
            class="w-full h-full flex justify-center items-center relative overflow-hidden"
            @mousedown="handleMouseDown"
            @touchstart="handleMouseDown"
        >
            <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{
                width: `${bonuses.length * cardWidthPercentage}%`,
                transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
            }"
            >
            <div
            v-for="(slide, index) in bonuses"
                    data-analytics-label="promo:banner:mid"
                    :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`"
                    :data-analytics-id="slide.MENU_ID"
                    :data-analytics-position="index + 1"
                    :key="index"
                    class="flex-shrink-0 px-2 transition-all duration-700"
                    :style="{
            width: `${cardWidthPercentage}%`,
            cursor: isDragging ? 'grab' : 'pointer',
          }"
                    @click="redirect(slide.MENU_URL || '')"
                >
                    <img
                        v-if="slide.MENU_IMG_URL"
                        :srcset="getSrcsetFm(slide.MENU_IMG_URL)"
                        alt=""
                        draggable="false"
                        @click.stop="onCloseModal"
                        class="w-full h-full object-contain rounded-2xl drop-shadow-lg"
                    />

                </div>
            </div>
        </section>

        <!-- Right button -->
        <button
            v-if="bonuses.length > 1"
            data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:PromotionalCards2|layout:layout-${appComponent.config.layout}`"
            @click="moveSlider('right')"
            class="group flex items-center justify-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative z-50 shrink-0"
        >
            <ChevronLeftIcon
                class="text-primary-content max-w-[50px] max-h-[50px] rotate-180"
            />
            <ChevronLeftIcon
                class="absolute left-[-2px] md:left-1 top-1/2 -translate-y-1/2 max-w-[10px] md:max-w-[30px] max-h-[30px] text-transparent group-hover:text-primary-content transition-all duration-300 rotate-180"
            />
        </button>
    </div>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->

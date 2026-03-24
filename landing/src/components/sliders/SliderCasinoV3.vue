<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import Vue composition API functions
import { register } from 'swiper/element/bundle'; // Import Swiper registration
import apiService from '../../../../SitioVersion5/src/services/ApiService.ts'; // Import API service
import { useModalStore } from '../../stores/Modal';
import { toKebabCase } from '@/utils'; // Import modal store

/**
 * Asynchronously loads a component with a delay.
 * @returns {Promise<Object>} A promise that resolves to an empty object after 5 seconds.
 */
const loadComponent = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({});
        }, 5000);
    });
};

register(); // Register Swiper elements

export default defineComponent({
    props: {
        gamesList: Object, // List of games passed as a prop
        keySlide: { type: Number, default: 1000 }, // Slide key with a default value
        top: { type: Boolean, default: false }, // Boolean prop to indicate top position
        styleVersion: { type: Number, default: 1 }, // Version of the style with a default value
        decorationBar: { type: Boolean, default: true }, // Boolean prop for decoration bar visibility
        title: { type: String, default: '' }, // Title of the slider
    },

    async setup() {
        const dataComponent = ref(await loadComponent()); // Load component data asynchronously
        return {
            dataComponent, // Expose dataComponent to the template
        };
    },

    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let modals = useModalStore(); // Access modal store
        let analyticsAttrs = {
            viewAll: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
                'data-analytics-context': `component:SliderCasinoV3|layout:${appComponent.config.layout}`
            },
            arrowPrev: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
                'data-analytics-context': `component:SliderCasinoV3|layout:${appComponent.config.layout}`
            },
            arrowNext: {
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
                'data-analytics-context': `component:SliderCasinoV3|layout:${appComponent.config.layout}`
            },
            game: (game: any) => ({
                'data-analytics-id': `${game.id}`,
                'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
                'data-analytics-position': `${this.gamesList.findIndex((g: any) => g.id === game.id) + 1}`,
                'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasinoV3|layout:${appComponent.config.layout}`,
            })
        }
        return {
            appComponent, // Expose appComponent to the template
            modals, // Expose modals to the template
            analyticsAttrs, // Expose analytics attributes to the template
        };
    },
});
</script>
<template>
    <!-- Section for displaying a list of games, shown only if gamesList has items -->
    <section
        v-if="gamesList.length > 0"
        class="flex justify-center items-center w-full"
    >
        <!-- Container for the section content, responsive width -->
        <div class="w-[90%] lg:w-full">
            <!-- Header and decoration bar for the section -->
            <div class="in relative flex justify-between items-center pl-[9%] md:pl-[3%]">
                <!-- Title of the section with optional icon -->
                <h3
                    :class="[lowerCaseText ? 'capitalize font-light' : 'uppercase font-bold']"
                    class="text-neutral text-xl mt-1 flex flex-row justify-center items-center gap-x-2"
                    aria-label="Casino bets"
                >
                    {{ title }}
                    <img
                        v-if="icon"
                        :src="icon"
                        alt=""
                        class="w-8 h-8 object-contain"
                    />
                </h3>
                <!-- Optional decoration bar under the title -->
                <div
                    v-if="decorationBar && appComponent.config.layout != 4"
                    class="absolute w-12 h-1 bg-yellow-300 bottom-0 rounded-full"
                ></div>
            </div>
            <!-- Main content area for the games -->
            <div class="h-full w-full">
                <div class="w-full h-full flex items-center justify-between flex-row p-1 my-2">
                    <!-- Button for sliding to the previous game -->
                    <button
                        class="cursor-pointer hover:scale-125 ml-0 lg:ml-3"
                        :class="'slidePrev' + keySlide"
                        v-bind="analyticsAttrs.arrowPrev"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-angle-left"
                            class="text-neutral/50 text-2xl hover:text-neutral"
                        />
                    </button>
                    <!-- Swiper container for displaying games in a carousel -->
                    <swiper-container
                        :slidesPerView="'auto'"
                        :centeredSlides="false"
                        :spaceBetween="10"
                        :grabCursor="true"
                        :navigation="{
                            nextEl: '.slideNext' + keySlide,
                            prevEl: '.slidePrev' + keySlide,
                        }"
                        :mousewheel="true"
                        :mousewheel-force-to-axis="true"
                        :free-mode="true"
                        :direction="'horizontal'"
                        :loop="true"
                        class="mySwiper swiper-h w-full h-full flex justify-start items-center px-[2%] md:px-[2%] gap-x-8 max-w-[91%] md:max-w-[97%]"
                    >
                        <!-- Individual game slide -->
                        <swiper-slide
                            v-for="game in gamesList"
                            :style="bgGame"
                            :class="
                                styleVersion == 2
                                    ? 'border-solid border-2 border-[#3d4958] w-40 h-40 mr-14'
                                    : styleVersion == 3
                                      ? 'w-[7.6rem] h-[5.4rem] md:w-[13rem] md:h-36 border-solid border-1 border-primary mr-8 md:mr-5'
                                      : 'h-48 w-48  mr-2'
                            "
                            class="in relative rounded-xl overflow-hidden inline-block mr-2"
                        >
                            <!-- Button for each game with modal trigger -->
                            <button
                                @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                                class="relative w-full h-full"
                                v-bind="analyticsAttrs.game(game)"
                            >
                                <!-- Game icon with lazy loading -->
                                <img
                                    v-show="game.icon_3 != undefined && game.icon_3 != null && game.icon_3 != ''"
                                    v-lazy="game.icon_3"
                                    alt=""
                                    :class="
                                        'absolute top-0 w-full h-full z-20 hover:z-10' + ' object-' + game.object_fit
                                    "
                                />
                                <!-- Overlay with game name and play button -->
                                <div
                                    class="z-10 hover:z-20 hover:bg-neutral-content/50 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all"
                                >
                                    <p
                                        class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
                                    >
                                        {{ game.name.toLowerCase() }}
                                    </p>
                                    <button
                                        class="w-40 bg-accent-focus text-neutral text-xs lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
                                        aria-label="Jugar ahora"
                                        v-bind="analyticsAttrs.game(game)"
                                    >
                                        {{ 'Jugar ahora' }}
                                    </button>
                                </div>
                                <!-- Optional 'TOP' label -->
                                <span
                                    v-if="top"
                                    class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
                                    >{{ 'TOP' }}</span
                                >
                                <!-- Optional game tag image -->
                                <img
                                    v-if="game.TagImage != undefined && game.TagImage != null && game.TagImage != ''"
                                    :src="game.TagImage"
                                    width="60"
                                    height="60"
                                    :class="[
                                        'absolute left-0 top-0',
                                        'text-black text-sm font-bold',
                                        'pb-[1px] z-30  w-[60px] h-[60px]',
                                        'object-contain flex justify-center',
                                        'items-center',
                                    ]"
                                    alt="Etiqueta"
                                />
                                <!-- Optional game tag text -->
                                <span
                                    v-else-if="game.TagText != undefined && game.TagText != null && game.TagText != ''"
                                    :class="[
                                        'absolute left-0 top-0 m-1 text-black',
                                        'text-sm font-bold pb-[1px] z-30',
                                        'w-auto h-auto flex justify-center items-center',
                                        'max-w-2xl overflow-hidden',
                                    ]"
                                    v-html="game.TagText"
                                ></span>
                            </button>
                        </swiper-slide>
                    </swiper-container>
                    <!-- Button for sliding to the next game -->
                    <button
                        class="cursor-pointer hover:scale-125 mr-0 lg:mr-3"
                        :class="'slideNext' + keySlide"
                        v-bind="analyticsAttrs.arrowNext"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-angle-right"
                            class="text-neutral/50 text-2xl hover:text-neutral"
                        />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
/* Hide the scrollbar for the .slider-casino element in WebKit browsers */
.slider-casino::-webkit-scrollbar {
    display: none;
}

/* Change the color of the first child element on hover for .arrow */
.arrow:hover :nth-child(1) {
    color: white;
}
</style>

<!-- FILE DOCUMENTED -->

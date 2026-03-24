<template>
    <!-- Main section for displaying jackpots, visible only if jackpotsList is defined and has items -->
    <section
        v-if="jackpotsList !== undefined && jackpotsList.length > 0"
        class="w-full flex justify-center items-center z-[50]"
    >
        <!-- Article container for jackpot display -->
        <article
            class="w-11/12 max-w-[450px] md:max-w-[1300px] h-[280px] md:h-[50vw] lg:h-[600px] z-[20] flex justify-center items-center my-5"
        >
            <!-- Placeholder shown while loading -->
            <AnimatedPlaceholder
                v-if="loading"
                class="w-full h-full rounded-2xl"
            />
            <div
                v-else
                class="relative w-full h-[90%] flex flex-col justify-center items-center gap-5"
            >
                <!-- Mobile background image -->
                <img
                    v-if="data2['imgBackgroundMobile'] && data2['imgBackgroundMobile'] != ''"
                    :src="data2['imgBackgroundMobile']"
                    alt="background-jackpot-mobile"
                    class="md:hidden absolute top-0 bottom-0 left-0 right-0 w-full h-full object-contain aspect-auto z-10"
                />
                <!-- Desktop background image -->
                <img
                    v-if="data2['imgBackgroundDesktop'] && data2['imgBackgroundDesktop'] != ''"
                    :src="data2['imgBackgroundDesktop']"
                    alt="background-jackpot-desktop"
                    class="hidden md:block absolute top-0 bottom-0 left-0 right-0 w-full h-full object-contain aspect-auto z-10"
                />
                <!-- Mobile title image -->
                <img
                    v-if="data2['imgTitleMobile'] && data2['imgTitleMobile'] != ''"
                    :src="data2['imgTitleMobile']"
                    alt="title-jackpot-mobile"
                    class="md:hidden w-11/12 h-[35%] object-contain aspect-auto z-20 mt-5 md:mt-0"
                />
                <!-- Desktop title image -->
                <img
                    v-if="data2['imgTitleDesktop'] && data2['imgTitleDesktop'] != ''"
                    :src="data2['imgTitleDesktop']"
                    alt="title-jackpot-desktop"
                    class="hidden md:flex w-[80%] h-[35%] object-contain aspect-auto z-20"
                />
                <!-- Swiper container for jackpot cards -->
                <swiper-container
                    id="SliderJackpotsCards"
                    :slides-per-view="'auto'"
                    :centered-slides="true"
                    :loop="true"
                    :autoplay-delay="3000"
                    :speed="1000"
                    :autoplay-pause-on-mouse-enter="true"
                    :mousewheel="true"
                    :mousewheel-force-to-axis="true"
                    :direction="'horizontal'"
                    class="w-[88%] h-[45%] md:h-[30%] lg:h-[45%] z-30"
                >
                    <!-- Individual jackpot slide -->
                    <swiper-slide
                        v-for="(jackpot, index) in jackpotsList"
                        :key="index"
                        class="relative flex flex-col justify-center items-center w-[35%] h-[70%] md:h-[80%] hover:scale-105 cursor-pointer lg:mt-8"
                    >
                        <!-- Jackpot GIF if available -->
                        <img
                            v-if="jackpot.gif && jackpot.gif != ''"
                            :src="jackpot.gif"
                            alt=""
                            class="absolute top-2 w-[85%] h-[85%] object-cover object-center z-[60]"
                        />
                        <!-- Jackpot image if available -->
                        <img
                            v-if="jackpot.image && jackpot.image != ''"
                            :src="jackpot.image"
                            alt=""
                            class="w-[50%] h-[35%] md:h-[30%] object-contain object-center z-40 aspect-auto"
                        />
                        <div class="relative w-[80%] h-[45%] lg:h-[55%] flex justify-center items-center">
                            <!-- Second jackpot image if available -->
                            <img
                                v-if="jackpot.image2 && jackpot.image2 != ''"
                                :src="jackpot.image2"
                                alt=""
                                class="w-full h-full object-contain object-center z-40 aspect-auto"
                            />
                            <div class="absolute bottom-2 h-[80%] w-full flex justify-center items-center z-50">
                                <!-- Jackpot price display based on counter style -->
                                <div
                                    v-if="!jackpot.counterStyle || jackpot.counterStyle === 2"
                                    class="jackpotPrice absolute w-full h-full flex justify-center items-center text-center font-bold -bottom-1 md:bottom-0 mx-auto"
                                >
                                    <span>{{ jackpot.currency ? jackpot.currency : '' }}</span>
                                    <span :id="`jackpot_${jackpot.id}`">
                                        {{ Intl.NumberFormat().format(currentJackpotValues[index]) }}
                                    </span>
                                </div>
                                <div
                                    v-else-if="jackpot.counterStyle === 1"
                                    class="jackpotPrice absolute w-full h-full flex justify-center items-center text-center font-bold -bottom-1 md:bottom-0 mx-auto"
                                >
                                    <span>{{ jackpot.currency ? jackpot.currency : '' }}</span>
                                    <span :id="`jackpot_${jackpot.id}`">
                                        {{
                                            new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(currentJackpotValues[index])
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </article>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
export default defineComponent({
    components: {
        AnimatedPlaceholder,
        ExitIcon,
    },
    props: {
        // Prop to receive the jackpot configuration
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        // Configuration and state variables for the component
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        let jackpotsList: any = [];
        let winner: boolean = false;
        let loading: boolean = true;
        let colors: any = {};
        let deviceTheme: string = 'theme_colors';
        let currentJackpotValues: any = ref([]);
        let data2: any = {};
        return {
            config,
            appComponent,
            jackpotsList,
            winner,
            loading,
            colors,
            deviceTheme,
            currentJackpotValues,
            data2,
        };
    },
    created() {
        // Determine the device theme based on configuration
        if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
            this.deviceTheme = 'theme_colors_desktop';
        } else if (
            this.appComponent.config.theme_colors_mobile != undefined &&
            this.appComponent.config.mobileL != ''
        ) {
            this.deviceTheme = 'theme_colors_mobile';
        }
        this.colors = this.appComponent.config[this.deviceTheme];
        this.data2 = this.appComponent.config.jackpot2[this.appComponent.country] || {};
        // Watch for changes in the jackpots list and update accordingly
        watch(
            () => this.appComponent.jackpotsList,
            (newVal) => {
                if (
                    this.appComponent.config.jackpot2 != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country] != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country].on != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country].on
                ) {
                    this.jackpotsList = newVal;
                    // Duplicate jackpots if there are between 2 and 5
                    if (this.jackpotsList.length > 1 && this.jackpotsList.length < 6) {
                        this.jackpotsList = this.jackpotsList.concat(this.jackpotsList);
                    }
                    setTimeout(() => {
                        this.jackpotsList.forEach((jackpot: any) => {
                            if (jackpot.counterStyle === 1) {
                                jackpot.currentValue = parseFloat(jackpot.currentValue).toFixed(2);
                            }
                            this.currentJackpotValues.push(jackpot.currentValue);
                        });
                        this.loading = false;
                        setTimeout(() => {
                            const updateJackpotFromDOM = (jackpot) => {
                                let element = document.getElementById(`jackpot_${jackpot.id}`);
                                if (element) {
                                    // Increment jackpot value based on counter style
                                    if (!jackpot.counterStyle || jackpot.counterStyle == 2) {
                                        let value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
                                        if (!isNaN(value)) {
                                            setInterval(() => {
                                                const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
                                                value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
                                                value += 1;
                                                elements.forEach((element) => {
                                                    element.textContent = new Intl.NumberFormat()
                                                        .format(value)
                                                        .toString();
                                                });
                                            }, this.data['timeIntegers'] ?? 2000);
                                        }
                                    } else if (jackpot.counterStyle == 1) {
                                        let value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
                                        if (!isNaN(value)) {
                                            setInterval(() => {
                                                const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
                                                value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
                                                value += 0.09;
                                                elements.forEach((element) => {
                                                    element.textContent = new Intl.NumberFormat('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })
                                                        .format(value)
                                                        .toString();
                                                });
                                            }, this.data['timeDecimals'] ?? 50);
                                        }
                                    }
                                }
                            };
                            this.jackpotsList.forEach((jackpot) => {
                                updateJackpotFromDOM(jackpot);
                            });
                        }, 1000);
                    }, 2000);
                }
            },
            { deep: true },
        );
    },
    mounted() {
        // Load Swiper CSS and JS for the carousel functionality
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);
        const swiperScript = document.createElement('script');
        swiperScript.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
        swiperScript.onload = () => {
            this.initializeSwiper();
        };
        document.head.appendChild(swiperScript);
    },
    methods: {
        // Initialize Swiper with specific settings
        initializeSwiper() {
            this.swiper = new Swiper('#SliderJackpotsCards', {
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true,
                },
                speed: 1000,
                mousewheel: true,
                direction: 'horizontal',
            });
        },
    },
});
</script>
<style scoped>
/* Styles for jackpot price display */
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    font-size: 1.1rem;
    transition:
        -webkit-text-fill-color 2s ease,
        text-fill-color 2s ease;
}
/* Responsive font size adjustments */
@media (min-width: 768px) {
    .jackpotPrice {
        font-size: 30px;
    }
}
@media (min-width: 1024px) {
    .jackpotPrice {
        font-size: 40px;
    }
}
/* Active slide styles */
.swiper-slide-active > div > div > div.jackpotPrice {
    -webkit-text-fill-color: v-bind(colors?.primary_content);
}
.swiper-slide-active {
    transform: scale(1.2);
    transition-duration: 1s;
}
.swiper-slide-prev,
.swiper-slide-next {
    transform: scale(1);
    transition-duration: 1s;
}
</style>

<!-- FILE DOCUMENTED -->

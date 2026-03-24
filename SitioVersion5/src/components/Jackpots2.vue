<template>
    <!-- Main section for displaying jackpots, visible only if jackpotsList is defined and has items -->
    <section
        v-if="jackpotsList !== undefined && jackpotsList.length > 0"
        class="w-full flex justify-center items-center"
    >
        <!-- Article container for jackpot display -->
        <article
            class="w-11/12 max-w-[450px] md:max-w-[1300px] h-[280px] md:h-[50vw] lg:h-[600px] z-[40] flex justify-center items-center my-5"
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
                    :loop-fill-group-with-blank="true"
                    :loop-add-blank-slides="5"
                    :autoplay-delay="2000"
                    :autoplay-disable-on-interaction="true"
                    :speed="1000"
                    :mousewheel="true"
                    :mousewheel-force-to-axis="true"
                    :direction="'horizontal'"
                    class="w-[88%] h-[45%] md:h-[30%] lg:h-[45%] z-30"
                >
                    <!-- Individual jackpot slide -->
                    <swiper-slide
                        v-for="(jackpot, index) in jackpotsList"
                        :key="index"
                        class="relative flex flex-col justify-center items-center w-[35%] h-[70%] md:h-[80%] lg:mt-8"
                    >
                        <!-- GIF for jackpot if available -->
                        <img
                            v-if="jackpot.gif && jackpot.gif != ''"
                            :src="jackpot.gif"
                            alt="jackpot-gif"
                            class="absolute top-2 w-[85%] h-[85%] object-cover object-center z-[60]"
                        />
                        <!-- Image for jackpot if available -->
                        <img
                            v-if="jackpot.image && jackpot.image != ''"
                            :src="jackpot.image"
                            alt="jackpot-image"
                            class="w-[50%] h-[35%] md:h-[30%] object-contain object-center z-40 aspect-auto"
                        />
                        <!-- Button for jackpot information -->
                        <button
                            v-if="jackpot.information && jackpot.information != ''"
                            class="absolute top-5 right-4 md:top-10 md:right-10 z-[70] w-[15px] h-[15px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
                            @click="
                                () => {
                                    appComponent.JackpotInformation = jackpot.information ?? '';
                                }
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 47"
                                fill="none"
                            >
                                <g filter="url(#filter0_d_2549_25)">
                                    <circle
                                        cx="23.8582"
                                        cy="21.857"
                                        r="17.7594"
                                        transform="rotate(-180 23.8582 21.857)"
                                        stroke="url(#paint0_linear_2549_25)"
                                        stroke-width="2.23445"
                                    />
                                    <path
                                        d="M23.8728 17.3623C23.0147 17.3623 22.3092 17.1144 21.7563 16.6187C21.2224 16.1038 20.9555 15.4746 20.9555 14.731C20.9555 13.9683 21.2224 13.3391 21.7563 12.8433C22.3092 12.3285 23.0147 12.0711 23.8728 12.0711C24.7117 12.0711 25.3981 12.3285 25.932 12.8433C26.485 13.3391 26.7614 13.9683 26.7614 14.731C26.7614 15.4746 26.485 16.1038 25.932 16.6187C25.3981 17.1144 24.7117 17.3623 23.8728 17.3623ZM26.3038 19.0211V34.9805H21.4131V19.0211H26.3038Z"
                                        fill="url(#paint1_linear_2549_25)"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_2549_25"
                                        x="0.540131"
                                        y="0.759629"
                                        width="46.6363"
                                        height="46.6364"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                    >
                                        <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="2.22078" />
                                        <feGaussianBlur stdDeviation="2.22078" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="out"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.97 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_2549_25"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_2549_25"
                                            result="shape"
                                        />
                                    </filter>
                                    <linearGradient
                                        id="paint0_linear_2549_25"
                                        x1="23.8582"
                                        y1="40.7336"
                                        x2="23.8582"
                                        y2="2.98039"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#FFBB00" />
                                        <stop
                                            offset="1"
                                            stop-color="#997000"
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint1_linear_2549_25"
                                        x1="24.6445"
                                        y1="11.2862"
                                        x2="24.613"
                                        y2="40.7345"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="#FFBB00" />
                                        <stop
                                            offset="1"
                                            stop-color="#997000"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                        <div class="relative w-[80%] h-[45%] lg:h-[55%] flex justify-center items-center">
                            <!-- Second image for jackpot if available -->
                            <img
                                v-if="jackpot.image2 && jackpot.image2 != ''"
                                :src="jackpot.image2"
                                alt="jackpot-image-2"
                                class="w-full h-full object-contain object-center z-40 aspect-auto"
                            />
                            <div class="absolute bottom-2 h-[80%] w-full flex justify-center items-center z-50">
                                <!-- Jackpot price display for default style -->
                                <div
                                    v-if="!jackpot.counterStyle || jackpot.counterStyle === 2"
                                    class="jackpotPrice absolute w-full h-full flex justify-center items-center text-center font-bold -bottom-1 md:bottom-0 mx-auto"
                                >
                                    <span>{{ jackpot.currency ? jackpot.currency : '' }}</span>
                                    <span :id="`jackpot_${jackpot.id}`">
                                        {{ Intl.NumberFormat().format(currentJackpotValues[index]) }}
                                    </span>
                                </div>
                                <!-- Jackpot price display for counter style 1 -->
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
import { register } from 'swiper/element/bundle';
register();
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
        let jackpotsList: any = appComponent.jackpotsList; 
        let winner: boolean = false; 
        let loading: boolean = true; 
        let colors: any = {}; 
        let deviceTheme: string = 'theme_colors'; 
        let currentJackpotValues: any = ref([]); 
        let data2: any = {};
        let informationHtml: string = ''; 
        let intervalId: number | undefined;
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
            informationHtml,
            intervalId,
        };
    },
    created() {
        // Determine the theme based on configuration
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
        // Watch for changes in jackpotsList and update accordingly
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
    mounted() {},
    beforeUnmount() {
        // Clear interval if it exists to prevent memory leaks
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
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
    font-size: 1rem;
    transition:
        -webkit-text-fill-color 2s ease,
        text-fill-color 2s ease;
}

/* Responsive font size for jackpot price */
@media (min-width: 768px) {
    .jackpotPrice {
        font-size: 32px;
    }
}
@media (min-width: 1024px) {
    .jackpotPrice {
        font-size: 42px;
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

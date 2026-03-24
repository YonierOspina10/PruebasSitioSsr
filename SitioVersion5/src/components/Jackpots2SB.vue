<template>
    <!-- Main container for the jackpot section -->
    <div class="jackpot-section">
        <!-- Section displayed if jackpotsList is defined and has items -->
        <section
            v-if="jackpotsList !== undefined && jackpotsList.length > 0"
            class="jackpot-section"
        >
            <!-- Article containing jackpot information -->
            <article class="jackpot-article">
                <!-- Placeholder shown while loading -->
                <AnimatedPlaceholder
                    v-if="loading"
                    class="jackpot-loading"
                />
                <!-- Container for jackpot details when not loading -->
                <div
                    v-else
                    class="jackpot-container"
                >
                    <!-- Mobile background image for jackpot -->
                    <img
                        v-if="data2['imgBackgroundMobile'] != undefined"
                        :src="data2['imgBackgroundMobile']"
                        alt="background-jackpot-mobile"
                        class="jackpot-image-background-mobile"
                    />
                    <!-- Desktop background image for jackpot -->
                    <img
                        v-if="data2['imgBackgroundDesktop'] != undefined"
                        :src="data2['imgBackgroundDesktop']"
                        alt="background-jackpot-desktop"
                        class="jackpot-image-background-desktop"
                    />
                    <!-- Mobile title image for jackpot -->
                    <img
                        v-if="data2['imgTitleMobile'] != undefined"
                        :src="data2['imgTitleMobile']"
                        alt="title-jackpot-mobile"
                        class="jackpot-image-title-mobile"
                    />
                    <!-- Desktop title image for jackpot -->
                    <img
                        v-if="data2['imgTitleDesktop'] != undefined"
                        :src="data2['imgTitleDesktop']"
                        alt="title-jackpot-desktop"
                        class="jackpot-image-title-desktop"
                    />
                    <!-- Swiper container for jackpot slides -->
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
                        class="jackpot-swiper-container mySwiper"
                    >
                        <!-- Swiper slide for each jackpot in the list -->
                        <swiper-slide
                            v-for="(jackpot, index) in jackpotsList"
                            :key="index"
                            class="jackpot-swiper-slide"
                            @click="appComponent.JackpotInformation = jackpot.information ?? ''"
                        >
                            <!-- GIF image for jackpot if available -->
                            <img
                                v-if="jackpot.gif && jackpot.gif != ''"
                                :src="jackpot.gif"
                                alt=""
                                class="jackpot-swiper-slide-gif"
                            />
                            <!-- Standard image for jackpot if available -->
                            <img
                                v-if="jackpot.image && jackpot.image != ''"
                                :src="jackpot.image"
                                alt=""
                                class="jackpot-swiper-slide-img"
                            />
                            <!-- Button for jackpot information if available -->
                            <button
                                v-if="jackpot.information && jackpot.information != ''"
                                class="jackpot-button-info"
                                @click="appComponent.JackpotInformation = jackpot.information ?? ''"
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
                            <!-- Container for additional jackpot slide content -->
                            <div class="jackpot-swiper-slide-container">
                                <!-- Secondary image for jackpot if available -->
                                <img
                                    v-if="jackpot.image2 && jackpot.image2 != ''"
                                    :src="jackpot.image2"
                                    alt=""
                                    class="jackpot-swiper-slide-container-image"
                                />
                                <!-- Container for jackpot price display -->
                                <div class="jackpot-swiper-slide-container-price">
                                    <!-- Price display for standard counter style -->
                                    <div
                                        v-if="!jackpot.counterStyle || jackpot.counterStyle === 2"
                                        class="jackpotPrice"
                                    >
                                        <span>{{ jackpot.currency ? jackpot.currency : '' }}</span>
                                        <span :id="`jackpot_${jackpot.id}`">
                                            {{ Intl.NumberFormat().format(currentJackpotValues[index]) }}
                                        </span>
                                    </div>
                                    <!-- Price display for alternate counter style -->
                                    <div
                                        v-else-if="jackpot.counterStyle === 1"
                                        class="jackpotPrice"
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
        <!-- Empty div displayed if no jackpots are available -->
        <div v-else></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import apiService from '@/services/ApiService';
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
        // Set colors and data2 based on the selected theme
        this.colors = this.appComponent.config[this.deviceTheme];
        this.data2 = this.appComponent.config.jackpot2[this.appComponent.country] || {};
        // Watch for changes in the jackpotsList and update accordingly
        watch(
            () => this.appComponent.jackpotsList,
            (newVal) => {
                if (
                    this.appComponent.config.jackpot2 != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country] != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country].on != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country].on &&
                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook != undefined &&
                    this.appComponent.config.jackpot2[this.appComponent.country].onSportbook
                ) {
                    this.jackpotsList = newVal;
                    // Duplicate jackpots if there are between 1 and 5
                    if (this.jackpotsList.length > 1 && this.jackpotsList < 6) {
                        this.jackpotsList = this.jackpotsList.concat(this.jackpotsList);
                    }
                    // Format jackpot values and update loading state
                    this.jackpotsList.forEach((jackpot: any) => {
                        if (jackpot.counterStyle === 1) {
                            jackpot.currentValue = parseFloat(jackpot.currentValue).toFixed(2);
                        }
                        this.currentJackpotValues.push(jackpot.currentValue);
                    });
                    this.loading = false;
                    // Set up intervals for updating jackpot values in the DOM
                    setTimeout(() => {
                        let count = 0;
                        let time = setInterval(() => {
                            const sportBookElement = document.getElementById('SportBook');
                            if (sportBookElement !== null && sportBookElement.childNodes[0] !== null) {
                                clearInterval(time);
                                const element = sportBookElement.childNodes[0];
                                if (element.shadowRoot !== '' && element.shadowRoot !== null) {
                                    const shadow = element.shadowRoot;
                                    const elementShadow = shadow.querySelector('div').lastChild;
                                    const updateJackpotFromDOM = (jackpot) => {
                                        let element = elementShadow.querySelector(`#jackpot_${jackpot.id}`);
                                        console.log(element);
                                        if (element) {
                                            // Update value for standard counter style
                                            if (!jackpot.counterStyle || jackpot.counterStyle == 2) {
                                                let value = parseInt(
                                                    element.textContent.trim().replace(/,/g, '') || '0',
                                                );
                                                if (!isNaN(value)) {
                                                    setInterval(() => {
                                                        const elements = elementShadow.querySelectorAll(
                                                            `#jackpot_${jackpot.id}`,
                                                        );
                                                        value = parseInt(
                                                            element.textContent.trim().replace(/,/g, '') || '0',
                                                        );
                                                        value += 1;
                                                        elements.forEach((element) => {
                                                            element.textContent = new Intl.NumberFormat()
                                                                .format(value)
                                                                .toString();
                                                        });
                                                    }, this.data['timeIntegers'] ?? 2000);
                                                }
                                            // Update value for alternate counter style
                                            } else if (jackpot.counterStyle == 1) {
                                                let value = parseFloat(
                                                    element.textContent.trim().replace(/,/g, '') || '0',
                                                );
                                                if (!isNaN(value)) {
                                                    setInterval(() => {
                                                        const elements = elementShadow.querySelectorAll(
                                                            `#jackpot_${jackpot.id}`,
                                                        );
                                                        value = parseFloat(
                                                            element.textContent.trim().replace(/,/g, '') || '0',
                                                        );
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
                                    // Update all jackpots from the DOM
                                    this.jackpotsList.forEach((jackpot) => {
                                        updateJackpotFromDOM(jackpot);
                                    });
                                }
                            } else {
                                count++;
                                if (count > 10) {
                                    clearInterval(time);
                                }
                            }
                        }, 500);
                    }, 1000);
                }
            },
        );
    },
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

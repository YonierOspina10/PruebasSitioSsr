<template>
    <!-- Main section for displaying jackpots, centered on the page -->
    <section class="jackpots-v1 w-full flex justify-center items-center">
        <!-- Conditional rendering of jackpots list if available -->
        <div
            v-if="jackpotsList !== undefined && jackpotsList.length > 0"
            class="jackpots-v1 w-full flex justify-center items-center"
        >
            <!-- Container for jackpot cards, responsive layout -->
            <article
                class="containerJackpot w-11/12 h-full max-w-[1300px] flex flex-wrap justify-around items-center gap-2 px-2 z-[40]"
            >
                <!-- Loop through each jackpot in the jackpotsList -->
                <div
                    v-for="(jackpot, index) in jackpotsList"
                    :key="index"
                    class="jackpot-card relative w-[350px] h-[218px] hover:scale-105 cursor-pointer"
                >
                    <!-- Display jackpot GIF -->
                    <img
                        :src="jackpot.gif"
                        alt=""
                        class="jackpot-card-gif absolute top-2 w-full h-[90%] object-cover object-center z-50"
                    />
                    <!-- Container for jackpot image -->
                    <div class="jackpot-card-div absolute top-4 h-1/2 w-full flex justify-center items-center z-40">
                        <img
                            :src="jackpot.image"
                            alt=""
                            class="jackpot-card-div-image w-full h-full object-contain object-center"
                        />
                    </div>
                    <!-- Button to show jackpot information if available -->
                    <button
                        :data-analytics-label="`casino:jackpot:${jackpot.name.toLowerCase().replace(/\s+/g, '-')}`"
                        :data-analytics-context="`component:JackpotsSB|layout:layout-${appComponent.config.layout}`"
                        v-if="jackpot.information && jackpot.information != ''"
                        class="jackpot-card-button absolute top-5 right-4 md:top-10 md:right-10 z-[70] w-[15px] h-[15px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
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
                    <!-- Container for jackpot price display -->
                    <div
                        class="jackpot-card-button-div absolute bottom-0 h-1/2 w-full flex justify-center items-center z-40"
                    >
                        <img
                            :src="jackpot.image2"
                            alt=""
                            class="jackpot-card-button-image absolute w-[60%] h-full object-contain object-center"
                        />
                        <!-- Display jackpot price based on counter style -->
                        <span
                            v-if="!jackpot.counterStyle || jackpot.counterStyle === 2"
                            class="jackpotPrice2 absolute w-full h-full flex justify-center items-center text-center font-bold bottom-0 mx-auto"
                        >
                            <span>{{ jackpot.currency ? jackpot.currency : '' }}</span>
                            <span :id="`jackpot_${jackpot.id}`">
                                {{ Intl.NumberFormat().format(currentJackpotValues[index]) }}
                            </span>
                        </span>
                        <span
                            v-else-if="jackpot.counterStyle === 1"
                            class="jackpotPrice2 absolute w-full h-full flex justify-center items-center text-center font-bold bottom-0 mx-auto"
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
                        </span>
                    </div>
                </div>
            </article>
        </div>
        <!-- Fallback empty div if no jackpots are available -->
        <div
            v-else
            class="jackpots-v1 w-full flex justify-center items-center"
        ></div>
    </section>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import JackpotCard from './JackpotCard.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import apiService from '@/services/ApiService';
export default defineComponent({
    components: {
        ExitIcon,
        JackpotCard,
    },
    props: {
        // Prop to receive the jackpot configuration
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        // Initialize component data
        let config = this.$config(); 
        let appComponent: any = this.$appComponent; 
        let jackpotsList: any = appComponent.jackpotsList; 
        let winner: boolean = false; 
        let currentJackpotValues: any = [];
        return {
            config,
            appComponent,
            jackpotsList,
            winner,
            currentJackpotValues,
        };
    },
    created() {
        // Watch for changes in the jackpots list and update accordingly
        if (
            this.config.jackpot != undefined &&
            this.config.jackpot[(window as any).cconfig.countryL] != undefined &&
            this.config.jackpot[(window as any).cconfig.countryL]
        ) {
            watch(
                () => this.appComponent.jackpotsList,
                (newVal) => {
                    this.jackpotsList = newVal;
                    this.jackpotsList.forEach((jackpot: any) => {
                        // Format current value based on counter style
                        if (jackpot.counterStyle === 1) {
                            jackpot.currentValue = parseFloat(jackpot.currentValue).toFixed(2);
                        }
                        this.currentJackpotValues.push(jackpot.currentValue);
                    });
                    // Set up interval to update jackpot values in the DOM
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
                                            // Update jackpot value based on counter style
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
                },
            );
        }
    },
    mounted() {
        // Check for winner status after a delay
        setTimeout(() => {
            if (this.appComponent.loyalty_price !== undefined && this.appComponent.loyalty_price.id !== null) {
                this.winner = true;
            }
        }, 2000);
    },
});
</script>
<style scoped>
/* Styles for the jackpot container with a gradient background and blur effect */
.containerJackpot {
    background: linear-gradient(to bottom, #ffffff20, transparent);
    backdrop-filter: blur(5px);
    border: 1px solid #ffffff40;
    border-radius: 15px;
}
/* Styles for jackpot price text with gradient and shadow effects */
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 3px;
}
/* Styles for jackpot information text with gradient and shadow effects */
.jackpotInfo {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
/* Animation for intro effect */
.intro {
    animation: intro 6s ease 0s forwards;
}
/* Keyframes for intro animation */
@keyframes intro {
    0% {
        opacity: 0;
        scale: 2;
    }
    50% {
        opacity: 0;
        scale: 2;
    }
    75% {
        opacity: 1;
        scale: 1;
    }
    100% {
        opacity: 1;
        scale: 1;
    }
}
/* Animation for zoom effect */
.zoom {
    animation: zoom 10s ease 0s infinite;
}
/* Keyframes for zoom animation */
@keyframes zoom {
    0% {
        scale: 1.3;
    }
    50% {
        scale: 1.4;
    }
    100% {
        scale: 1.3;
    }
}
</style>

<!-- FILE DOCUMENTED -->

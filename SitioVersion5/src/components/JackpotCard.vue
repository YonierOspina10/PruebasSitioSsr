<template>
    <!-- Main container for the jackpot display with hover effect -->
    <div class="relative w-[350px] h-[218px] hover:scale-105 cursor-pointer">
        <!-- GIF image displayed at the top of the container -->
        <img
            :src="data.gif"
            alt=""
            class="absolute top-2 w-full h-[90%] object-cover object-center z-50"
        />
        <!-- Image overlay centered in the upper half of the container -->
        <div class="absolute top-4 h-1/2 w-full flex justify-center items-center z-40">
            <img
                :src="data.image"
                alt=""
                class="w-full h-full object-contain object-center"
            />
        </div>
        <!-- Button to show jackpot information if available -->
        <button
            :data-analytics-label="`casino:jackpot:${data.name.toLowerCase().replace(/\s+/g, '-')}`"
            :data-analytics-context="`component:JackpotCard|layout:layout-${appComponent.config.layout}`"
            v-if="data.information && data.information != ''"
            class="absolute top-5 right-4 md:top-10 md:right-10 z-[70] w-[15px] h-[15px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
            @click="appComponent.JackpotInformation = data.information ?? ''"
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
        <!-- Container for the jackpot price display -->
        <div class="absolute bottom-0 h-1/2 w-full flex justify-center items-center z-40">
            <!-- Secondary image displayed at the bottom -->
            <img
                :src="data.image2"
                alt=""
                class="absolute w-[60%] h-full object-contain object-center"
            />
            <!-- Jackpot price display based on counter style -->
            <div
                v-if="!data.counterStyle || data.counterStyle === 2"
                class="jackpotPrice absolute w-full h-full flex justify-center items-center text-center font-bold bottom-0 mx-auto"
            >
                <span>{{ data.currency ? data.currency : '' }}</span>
                <span :id="`jackpot_${data.id}`">
                    {{ Intl.NumberFormat().format(jackPot) }}
                </span>
            </div>
            <div
                v-else-if="data.counterStyle === 1"
                class="jackpotPrice absolute w-full h-full flex justify-center items-center text-center font-bold bottom-0 mx-auto"
            >
                <span>{{ data.currency ? data.currency : '' }}</span>
                <span :id="`jackpot_${data.id}`">
                    {{
                        new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(jackPot)
                    }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAppcomponentStore } from '@/stores/AppComponent';

// Define props for the component, expecting a data object
const props = defineProps<{
    data: any;
    params: any;
}>();

// Access the app component store
const appComponent = useAppcomponentStore().appComponent;

// Reactive reference for the jackpot value
let jackPot = ref<number>(props.data.currentValue);

let jackpotInterval: number | undefined

// Function to update the jackpot display from the DOM
const updateJackpotFromDOM = (jackpot) => {
    let element = document.getElementById(`jackpot_${jackpot.id}`);
    if (element) {
        // Update logic for counter style 2
        if (!jackpot.counterStyle || jackpot.counterStyle == 2) {
            let value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
            if (!isNaN(value)) {
                jackpotInterval = window.setInterval(() => {
                    const elements = document.querySelectorAll(`#jackpot_${jackpot.id}`);
                    value = parseInt(element.textContent.trim().replace(/,/g, '') || '0');
                    value += 1;
                    elements.forEach((element) => {
                        element.textContent = new Intl.NumberFormat().format(value).toString();
                    });
                }, props.params['timeIntegers'] ?? 2000);
            }
        // Update logic for counter style 1
        } else if (jackpot.counterStyle == 1) {
            let value = parseFloat(element.textContent.trim().replace(/,/g, '') || '0');
            if (!isNaN(value)) {
                jackpotInterval = window.setInterval(() => {
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
                }, props.params['timeDecimals'] ?? 50);
            }
        }
    }
};

// Lifecycle hook to run when the component is mounted
onMounted(() => {
    let element = document.getElementById(`jackpot_${props.data.id}`);
    do {
        element = document.getElementById(`jackpot_${props.data.id}`);
        if (element) {
            updateJackpotFromDOM(props.data);
        }
    } while (!element);
});

onUnmounted(() => {
    if(jackpotInterval){
        clearInterval(jackpotInterval)        
    }
})
</script>
<style scoped>
/* Styles for the jackpot price display */
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    font-size: 22px;
}
</style>

<!-- FILE DOCUMENTED -->

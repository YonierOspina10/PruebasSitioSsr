<template>
    <!-- Main container for the component with relative positioning and hover effect -->
    <div class="relative w-[350px] h-[218px] hover:scale-105 cursor-pointer">
        <!-- GIF image displayed at the top of the container -->
        <img
            :src="data.gif"
            alt=""
            class="absolute top-2 w-full h-[90%] object-cover object-center z-50"
        />
        <!-- Container for the secondary image, centered at the top -->
        <div class="absolute top-4 h-1/2 w-full flex justify-center items-center z-40">
            <img
                :src="data.image"
                :srcset="getSrcsetFm(data.image)"
                alt=""
                class="w-full h-full object-contain object-center"
            />
        </div>
        <!-- Button to show modal with information if available -->
        <button
            :data-analytics-label="`casino:jackpot:${data.name}`"
            :data-analytics-context="`component:JackpotCard|layout:layout-${appComponent?.config?.layout ?? ''}`"
            v-if="data.information && data.information != ''"
            class="absolute top-5 right-4 md:top-10 md:right-10 z-[70] w-[15px] h-[15px] md:w-[30px] md:h-[30px] cursor-pointer hover:scale-125 transition-all duration-300"
            @click="() => { modals?.addModal?.({ showModal: 'ModalJackpot', messageModal: data.information ?? '' }) }"
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
                        <stop offset="0" stop-color="#FFBB00" />
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
                        <stop offset="0" stop-color="#FFBB00" />
                        <stop
                            offset="1"
                            stop-color="#997000"
                        />
                    </linearGradient>
                </defs>
            </svg>
        </button>
        <!-- Container for the jackpot price display at the bottom -->
        <div class="absolute bottom-0 h-1/2 w-full flex justify-center items-center z-40">
            <img
                :src="data.image2"
                :srcset="getSrcsetFm(data.image2)"
                alt=""
                class="absolute w-[60%] h-full object-contain object-center"
            />
            <!-- Display for jackpot price based on counter style -->
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
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useModalStore } from '../../stores/Modal';
import { useAppcomponentStore } from '@/stores/AppComponent';
import { getActivePinia } from 'pinia';
// Protecciones: en algunos entornos (microfrontends/SS) Pinia podría no estar disponible durante el montaje.
// Hacemos las llamadas a las stores solo si Pinia está activo para evitar que un error de Pinia rompa el setup del componente.

// Fallback seguro para modals
let modals: any = {
    addModal: (_: any) => {},
};

// appComponent como computed re-asignable; por defecto vacío
let appComponent: any = computed(() => null);

// Solo intentar obtener las stores si Pinia está inicializado
if (getActivePinia()) {
    try {
        const modalStore = useModalStore();
        if (modalStore) modals = modalStore;
    } catch (e) {
        // ignore
    }

    try {
        const appComponentStore = useAppcomponentStore();
        if (appComponentStore) appComponent = computed(() => appComponentStore.appComponent);
    } catch (e) {
        // ignore
    }
}

// Function to generate srcset for images based on the provided URL
const getSrcsetFm = (imageUrl: string) => {
    if (!imageUrl) return '';
    const baseUrl = imageUrl.split('?')[0];
    // Normalizar duplicados como: /v7/_vsimg_/m/v7/_vsimg_/... => /v7/_vsimg_/...
    const normalized = baseUrl.replace(/(\/v7\/(?:_vsimg_|vsimg)_\/)+/g, '/v7/_vsimg_/');
    // También cubrir variantes sin guion bajo o con doble slashes accidentales
    const cleaned = normalized.replace(/\/+(?=v7\/)/g, '/');
    return `${cleaned}?fm=webp`;
};

// Define props for the component, expecting a data object
const props = defineProps<{
    data: any;
    params: any;
}>();

// Reactive reference for the jackpot value initialized from props
let jackPot = ref<number>(props.data.currentValue ?? 0);

let jackpotInterval: number | undefined

// Function to update the jackpot display based on the DOM element
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
                },  props.params?.['timeIntegers'] ?? 2000);
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
                }, props.params?.['timeDecimals'] ?? 200);
            }
        }
    }
};

// Lifecycle hook to run when the component is mounted
onMounted(() => {
    // Intentamos actualizar cuando el elemento esté disponible en el DOM.
    // Evitamos bucles busy-wait cambiando a check con setTimeout hasta 1s (evita bloqueo en montaje en SSR o enclaves sin DOM inmediato)
    const maxRetries = 20;
    let attempts = 0;
    const check = () => {
        const element = document.getElementById(`jackpot_${props.data.id}`);
        if (element) {
            updateJackpotFromDOM(props.data);
            return;
        }
        attempts++;
        if (attempts < maxRetries) setTimeout(check, 50);
    };
    check();
});

onUnmounted(() => {
    if(jackpotInterval){
        clearInterval(jackpotInterval)
    }
})
</script>

<style scoped>
/* Styles for the jackpot price display with gradient and text effects */
.jackpotPrice {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    font-size: 22px;
}
</style>

<!-- FILE DOCUMENTED -->

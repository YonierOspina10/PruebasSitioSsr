<script setup lang="ts">
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store
import { onMounted, ref, watch } from 'vue'; // Importing Vue composition API functions
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Importing a placeholder component for loading state
import { useGlobalStore } from '@/stores/global'; // Importing global store
import { useCasinoStore } from '@/stores/casino'; // Importing casino store
import { storeToRefs } from 'pinia'; // Importing utility to convert store state to refs
import { useGetDataCasino } from '@/composables/useGetDataCasino'; // Importing a composable for fetching casino data
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'; // Importing Vue Router functions
import apiService from '@/services/ApiService';

const loadingLocal = ref(true); // Reactive reference to track loading state
const props = defineProps({ // Defining component props
    component: {
        type: String,
        default: null,
    },
    typelobby: String,
    data: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

const appComponent = useAppcomponentStore().appComponent; // Accessing app component from store
const router = useRouter(); // Getting router instance
const route = useRoute(); // Getting route instance
const dataList = ref([]); // Reactive reference for storing data list
const storeCasinoLobby = useGlobalStore(); // Accessing global store
const itemsLoading = ref(0); // Reactive reference for loading items count
const casinoStore = useCasinoStore(); // Accessing casino store
const keySlide: number = Math.floor(Math.random() * 100000); // Generating a random key for slide navigation
const { providerSelect, categorySelect } = storeToRefs(casinoStore); // Destructuring refs from casino store
const { categories, providers, loading } = useGetDataCasino({ // Fetching categories and providers data
    action: props.data['action'],
    partner_id: appComponent?.partnerG ?? null,
    country: appComponent.country,
    typelobby: props.typelobby,
});

// Function to handle selection of categories or providers
function handleSelect(item: any) {
    if (props.data['type'] === 'categories') {
        if (categorySelect.value !== null && categorySelect.value?.id === item.id) {
            casinoStore.setCategorySelect(null); // Deselecting category
            casinoStore.setProviderSelect(null); // Deselecting provider
            updateUrl(null, 'categories'); // Updating URL
        } else {
            casinoStore.setCategorySelect(item); // Selecting category
            casinoStore.setProviderSelect(null); // Deselecting provider
            updateUrl(item, 'categories'); // Updating URL
        }
    } else {
        if (providerSelect.value !== null && providerSelect.value?.name === item.name) {
            casinoStore.setProviderSelect(null); // Deselecting provider
            casinoStore.setCategorySelect(null); // Deselecting category
            updateUrl(null, 'providers'); // Updating URL
        } else {
            casinoStore.setProviderSelect(item); // Selecting provider
            casinoStore.setCategorySelect(null); // Deselecting category
            updateUrl(item, 'providers'); // Updating URL
        }
    }
}

// Function to set the data list based on the type of data
function setDataList() {
    loadingLocal.value = true; // Setting loading state to true
    if (props.data['type'] === 'categories') {
        dataList.value = categories.value; // Assigning categories to dataList
    } else {
        dataList.value = providers.value; // Assigning providers to dataList
    }
    loadingLocal.value = loading.value; // Updating loading state
}

// Function to update the URL based on selected item and type
function updateUrl(item: any, type: string) {
    let newPath = '';
    if (type === 'categories') {
        if (router.currentRoute.value.path.includes('new-casino')) {
            newPath = item ? `/new-casino/categoria/${item.slug}-${item.id}` : '/new-casino';
        } else if (router.currentRoute.value.path.includes('live-casino-vivo')) {
            newPath = item ? `/live-casino-vivo/categoria/${item.slug}-${item.id}` : '/live-casino-vivo';
        } else if (router.currentRoute.value.path.includes('bingos')) {
            newPath = item ? `/bingos/categoria/${item.slug}-${item.id}` : '/bingos';
        } else if (router.currentRoute.value.path.includes('virtuales-lobby')) {
            newPath = item ? `/virtuales-lobby/categoria/${item.slug}-${item.id}` : '/virtuales-lobby';
        } else {
            newPath = `/new-casino/categoria/${item.slug}-${item.id}`;
        }
    } else {
        if (router.currentRoute.value.path.includes('new-casino')) {
            newPath = item ? `/new-casino/proveedor/${item.name}` : '/new-casino';
        } else if (router.currentRoute.value.path.includes('live-casino-vivo')) {
            newPath = item ? `/live-casino-vivo/proveedor/${item.name}` : '/live-casino-vivo';
        } else if (router.currentRoute.value.path.includes('bingos')) {
            newPath = item ? `/bingos/proveedor/${item.name}` : '/bingos';
        } else if (router.currentRoute.value.path.includes('virtuales-lobby')) {
            newPath = item ? `/virtuales-lobby/proveedor/${item.name}` : '/virtuales-lobby';
        } else {
            newPath = `/live-casino-vivo/proveedor/${item.name}`;
        }
    }
    router.push(newPath); // Navigating to the new path
}

onMounted(() => { // Lifecycle hook that runs when the component is mounted
    setDataList(); // Setting the data list on mount
});

watch(loading, () => { // Watching the loading state for changes
    setDataList(); // Updating the data list when loading changes
});

onBeforeRouteLeave(() => {
  if (appComponent.selections?.category?.id === 1811) {
    appComponent.selections.category = undefined;
    casinoStore.setCategorySelect(undefined);
  }
});
</script>

<template>
    <!-- Main section for the component -->
    <section class="w-full sm:w-full mx-auto mt-10">
        <!-- Conditional rendering based on loading state -->
        <div
            v-if="loadingLocal"
            class="flex justify-center items-center gap-8 sm:gap-12"
        >
            <!-- Looping through loading items -->
            <AnimatedPlaceholder
                v-for="index in itemsLoading"
                :key="index"
                class="sm:w-1/6 w-[30%] h-20 sm:h-32 rounded-xl"
            />
        </div>
        <!-- Container for slides and navigation buttons -->
        <div class="flex relative items-center justify-center gap-4 sm:gap-8 w-[80%] place-self-center px-8">
            <!-- Button for navigating left -->
            <button
                id="swiper-button-left"
                class="w-[20px] h-[30px] md:w-[27px] md:h-[37px] fill-primary hover:scale-110 rotate-180 absolute md:static left-2 top-0 bottom-0 m-auto z-30"
                :class="'slidePrev-' + keySlide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="38"
                    viewBox="0 0 28 38"
                    class="hidden md:block"
                >
                    <path
                        d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                    />
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                        class="child"
                    />
                </svg> <!-- Placeholder for SVG icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="30"
                    viewBox="0 0 28 38"
                    class="md:hidden"
                >
                    <path
                        d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                    />
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                        class="child"
                    />
                </svg> <!-- Placeholder for SVG icon -->
            </button>
            <swiper-container
                v-if="!loadingLocal"
                :slides-per-view="'auto'"
                :mousewheel="true"
                :mousewheel-force-to-axis="true"
                :free-mode="true"
                :direction="'horizontal'"
                class="w-[80%] md:w-full"
                :space-between="45"
                :centeredSlides="false"
                :navigation="{
                    nextEl: '.slideNext-' + keySlide,
                    prevEl: '.slidePrev-' + keySlide,
                }"
            >
            
                    <!-- Button for favorites category -->
                <swiper-slide
                    v-if="appComponent.myListFavoriteGame.length > 0"
                    class="sm:w-[191px] w-[40%]"
                >
                    <button
                        @click="() => {
                            appComponent.selections.category = { id: 1811, name: 'Favoritos' };
                            casinoStore.setCategorySelect({ id: 1811, name: 'Favoritos' });
                        }"
                        class="w-full h-20 sm:h-32 bg-transparent rounded-xl font-poppinssl text-lg sm:text-2xl cursor-pointer"
                        :class="
                            appComponent.selections?.category?.id == 1811
                                ? 'bg-primary font-bold categorysSelected'
                                : 'lg:bg-base-300'
                        "
                    >
                        <div class="w-full h-full flex justify-center items-center rounded-xl bg-gradient-to-r from-primary/80 to-primary/50 text-neutral-content gap-4">
                            <span
                            class="leading-none sm:leading-normal ml-1 sm:ml-4 mt-0 sm:mt-2 sm:w-1/2 w-[60%] font-poppinssl font-semibold"
                            :class="
                                appComponent.selections !== undefined &&
                                appComponent.selections.category !== undefined &&
                                appComponent.selections.category.id == 1811
                                    ? 'text-base-100'
                                    : 'text-neutral'
                            "
                            >{{ $t('Favoritos') }}</span
                        >
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="47px"
                                height="47px"
                                viewBox="0 0 115 115"
                                version="1.1"
                            >
                                <g
                                    id="favoritos"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    class="stroke-primary"
                                >
                                    <path
                                        d="M57.9993776,9.94607905 L73.505026,40.9349949 C73.5820171,41.0889771 73.7306279,41.1955113 73.902515,41.2205781 L108.573575,46.1891895 C109.005978,46.2518567 109.179656,46.7764704 108.86632,47.0772728 L83.7779658,71.198762 C83.6535267,71.3187249 83.596231,71.4915072 83.6257741,71.6598133 L89.548717,105.720316 C89.6221271,106.145557 89.1700282,106.469636 88.782387,106.269101 L57.7719853,90.1878099 C57.6180031,90.1081331 57.4344778,90.1081331 57.2804956,90.1878099 L26.2700939,106.269101 C25.8824527,106.469636 25.4294586,106.145557 25.5037639,105.720316 L31.4267068,71.6598133 C31.4553546,71.4915072 31.3989542,71.3187249 31.2745151,71.198762 L6.18616097,47.0772728 C5.87282512,46.7764704 6.04560746,46.2518567 6.47890618,46.1891895 L41.1499659,41.2205781 C41.321853,41.1955113 41.4704637,41.0889771 41.5474548,40.9349949 L57.0531033,9.94607905 C57.2464763,9.55933308 57.8060046,9.55933308 57.9993776,9.94607905 Z"
                                        id="Shape"
                                        stroke-width="4"
                                    ></path>
                                </g>
                            </svg> <!-- Placeholder for SVG icon -->
                        </div>
                    </button>
                </swiper-slide>
                <!-- Looping through dataList for slides -->
                <swiper-slide
                    v-for="(item, index) in dataList"
                    :key="index"
                    @click="handleSelect(item)"
                    class="sm:w-[191px] w-[40%] h-20 sm:h-32 bg-transparent rounded-xl font-poppinssl text-lg sm:text-2xl hover:border-1 hover:border-secondary-focus hover:leading-none cursor-pointer bg-cover"
                    :style="{
                        backgroundImage: `url(${
                            item.icon == ''
                                ? 'https://images.virtualsoft.tech/m/msj19212T1734472183.png'
                                : item.icon == 'www'
                                  ? 'https://images.virtualsoft.tech/m/msj19212T1734472183.png'
                                  : item.icon
                        })`,
                    }"
                >
                    <span
                        class="w-full h-full flex flex-col justify-center items-start rounded-xl"
                        :class="
                            index % 2 === 0
                                ? 'bg-gradient-to-r from-base-200/80 to-base-200/50 text-neutral'
                                : 'bg-gradient-to-r from-primary/80 to-primary/50 text-neutral-content'
                        "
                    >
                        <span class="leading-none sm:leading-normal ml-1 sm:ml-4 mt-0 sm:mt-2 sm:w-1/2 w-[60%] font-poppinssl font-semibold"> <!-- Title styling -->
                            {{ $t(item.title) }} <!-- Title binding -->
                        </span>
                    </span>
                </swiper-slide>
            </swiper-container>
            <button
                id="swiper-button-right"
                class="w-[20px] h-[30px] md:w-[27px] md:h-[37px] fill-primary hover:scale-110 absolute md:static right-2 top-0 bottom-0 m-auto z-30"
                :class="'slideNext-' + keySlide"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="38"
                    viewBox="0 0 28 38"
                    class="hidden md:block"
                >
                    <path
                        d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                    />
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                        class="child"
                    />
                </svg> <!-- Placeholder for SVG icon -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="30"
                    viewBox="0 0 28 38"
                    class="md:hidden"
                >
                    <path
                        d="M6.87249 3.38475L10.0147 0.339432L27.1295 16.9365C27.4053 17.2024 27.6243 17.5186 27.7737 17.867C27.9231 18.2153 28 18.5889 28 18.9662C28 19.3435 27.9231 19.717 27.7737 20.0654C27.6243 20.4137 27.4053 20.73 27.1295 20.9959L10.0147 37.6016L6.87545 34.5562L22.9389 18.9705L6.87249 3.38475Z"
                    />
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M0 8.87972L1.93343 7L12.4643 17.2445C12.6341 17.4086 12.7688 17.6038 12.8607 17.8189C12.9527 18.0339 13 18.2645 13 18.4973C13 18.7302 12.9527 18.9608 12.8607 19.1758C12.7688 19.3908 12.6341 19.586 12.4643 19.7502L1.93343 30L0.00182247 28.1203L9.88583 18.5L0 8.87972Z"
                        class="child"
                    />
                </svg> <!-- Placeholder for SVG icon -->
            </button>
        </div>
    </section>
</template>

<style scoped>
@media (min-width: 768px) {
    #swiper-button-left > svg > path.child {
        display: none !important; /* Hiding child paths for left button on larger screens */
    }
    #swiper-button-right > svg > path.child {
        display: none !important; /* Hiding child paths for right button on larger screens */
    }
}
#swiper-button-left > svg > path.child {
    display: block; /* Displaying child paths for left button on smaller screens */
}
#swiper-button-left:hover > svg > path.child {
    display: block !important; /* Ensuring child paths are displayed on hover */
}
#swiper-button-right > svg > path.child {
    display: block; /* Displaying child paths for right button on smaller screens */
}
#swiper-button-right:hover > svg > path.child {
    display: block !important; /* Ensuring child paths are displayed on hover */
}
.opacity-50 {
    opacity: 0.5; /* Class for 50% opacity */
}
.opacity-100 {
    opacity: 1; /* Class for 100% opacity */
}
</style>

<!-- FILE DOCUMENTED -->

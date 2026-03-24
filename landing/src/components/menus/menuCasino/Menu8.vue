<template>
    <!-- Main section container for the component, centered with padding and margin -->
    <section class="w-full flex justify-center items-center px-2 md:px-4 my-8">
        <!-- Loading state display with animated placeholders -->
        <div
            v-if="loadingLocal"
            class="bg-neutral-focus/90 w-[85%] md:w-[90%] h-[40px] flex justify-center items-center rounded-full gap-4 mx-8 md:max-w-[1112px] md:mx-auto"
        >
            <AnimatedPlaceholder
                v-for="index in 8"
                :key="index"
                class="md:block hidden w-[100px] md:w-[150px] h-[25px] rounded-full"
            />
            <AnimatedPlaceholder
                v-for="index in 3"
                :key="index"
                class="block md:hidden w-[100px] md:w-[150px] h-[25px] rounded-full"
            />
        </div>
        <!-- Main content display when not loading -->
        <div
            v-else
            class="flex rounded-full w-[96%] md:w-[90%] px-2 md:max-w-[1112px] mx-auto"
        >
            <!-- Left navigation button for swiper -->
            <button
                id="swiper-button-left"
                class="w-[30px] h-[30px] md:w-[28px] md:h-[28px] bg-base-100 hover:bg-neutral rounded-full fill-accent-focus hover:fill-base-300 hover:scale-110 rotate-180 relative md:static left-0 md:left-2 top-0 bottom-0 m-auto z-10 flex justify-center items-center"
                :class="'slidePrev-' + keySlide"
            >
                <IconChevronRight class="w-[20px] h-[20px]"/>
            </button>
            <!-- Swiper container for displaying items -->
            <swiper-container
                v-if="dataList.length > 0"
                :slides-per-view="'auto'"
                :mousewheel="true"
                :mousewheel-force-to-axis="true"
                :free-mode="true"
                :direction="'horizontal'"
                class="bg-base-300 w-[85%] md:w-[90%] h-[40px] rounded-full px-2 md:max-w-[1112px] mx-auto"
            >
                <!-- Individual swiper slide for each item in dataList -->
                <swiper-slide
                    v-for="(item, index) in dataList"
                    :key="index"
                    @click="handleSelect(item)"
                    class="min-w-[140px] md:min-w-[150px] w-auto text-neutral px-2 mx-2 h-[25px] whitespace-nowrap flex justify-center items-center rounded-full text-base hover:bg-primary hover:text-neutral-content hover:font-poppinsb cursor-pointer my-auto"
                    :class="
                        (categorySelect !== null && categorySelect?.id === item.id) ||
                        (providerSelect !== null && providerSelect?.name === item.name)
                            ? 'bg-primary text-neutral-content font-poppinsb'
                            : 'font-poppinssl'
                    "
                >
                    {{ item.title }}
                </swiper-slide>
            </swiper-container>
            <!-- Message displayed when there are no items in dataList -->
            <span
                v-else
                class="w-full h-[40px] flex justify-center items-center text-neutral"
            >
                {{ $t('No hay proveedores') }}
            </span>
            <!-- Right navigation button for swiper -->
            <button
                id="swiper-button-right"
                class="w-[30px] h-[30px] md:w-[28px] md:h-[28px] bg-base-100 hover:bg-neutral rounded-full fill-accent-focus hover:fill-base-300 hover:scale-110 md:static relative top-0 bottom-0 m-auto z-10 flex justify-center items-center"
                :class="'slideNext-' + keySlide"
            >
                <IconChevronRight class="w-[20px] h-[20px]"/>
            </button>
        </div>
    </section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGetDataCasino } from '../../../composables/useGetDataCasino.ts';
import AnimatedPlaceholder from '../../../components/AnimatedPlaceholder.vue';
import { useCasinoStore, useAppcomponentStore } from '../../../stores';
import { useRoute, useRouter } from 'vue-router';
import IconChevronRight from '../../../../../SitioVersion5/src/components/icons/IconChevronRight.vue';
// Define component props with default values
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

// Initialize router and route for navigation
const router = useRouter();
const route = useRoute();

// Access app component and casino store state
const appComponent = useAppcomponentStore().appComponent;
const casinoStore = useCasinoStore();

// Generate a random key for slide animations
const keySlide: number = Math.floor(Math.random() * 100000);

// Create reactive references for selected providers and categories
const { providerSelect, categorySelect } = storeToRefs(casinoStore);
const loadingLocal = ref(true); // Loading state
const dataList = ref([]); // List of data items

// Fetch categories and providers based on props data
const { categories, providers, loading } = useGetDataCasino({
    action: props.data['action'],
    partner_id: appComponent?.partnerG ?? null,
    country: appComponent.country,
    typelobby: props.data['typelobby'],
});

// Handle selection of categories or providers
function handleSelect(item: any) {
    if (props.data['type'] === 'categories') {
        if (categorySelect.value !== null && categorySelect.value?.id === item.id) {
            casinoStore.setCategorySelect(null);
            casinoStore.setProviderSelect(null);
            if (props.data['updateUrl']) {
                updateUrl(null, 'categories');
            }
        } else {
            casinoStore.setCategorySelect(item);
            casinoStore.setProviderSelect(null);
            if (props.data['updateUrl']) {
                updateUrl(item, 'categories');
            }
        }
    } else {
        if (providerSelect.value !== null && providerSelect.value?.name === item.name) {
            casinoStore.setProviderSelect(null);
            casinoStore.setCategorySelect(null);
            if (props.data['updateUrl']) {
                updateUrl(null, 'providers');
            }
        } else {
            casinoStore.setProviderSelect(item);
            casinoStore.setCategorySelect(null);
            if (props.data['updateUrl']) {
                updateUrl(item, 'providers');
            }
        }
    }
}

// Update the URL based on selected item and type
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
            newPath = `/new-casino/proveedor/${item.name}`;
        }
    }
    router.push(newPath); // Navigate to the new path
}

// Set the data list based on the type of data
function setDataList() {
    if (props.data['type'] === 'categories') {
        dataList.value = categories.value; // Set categories
    } else {
        dataList.value = providers.value; // Set providers
    }
}

// Lifecycle hook to run on component mount
onMounted(() => {
    setTimeout(() => {
        if (document.getElementById('swiper-element-bundle') === null) {
            const cdnSwiper = document.createElement('script');
            cdnSwiper.id = 'swiper-element-bundle';
            cdnSwiper.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
            document.head.appendChild(cdnSwiper);
            cdnSwiper.onload = () => {
                console.log('Swiper loaded'); // Log when Swiper is loaded
                loadingLocal.value = false; // Update loading state
            };
        } else {
            loadingLocal.value = false; // Update loading state if already loaded
        }
        setDataList(); // Set the data list after loading
    }, 3000);
});

// Watch for changes in loading state to update data list
watch(loading, () => {
    setDataList();
});

// Watch for changes in loadingLocal state to update selected category/provider
watch(loadingLocal, (newVal) => {
    if (props.data.updateUrl) {
        if (!newVal) {
            const { ProviderId, CategoryId } = route.params;
            if (CategoryId) {
                const category = dataList.value.find((cat) => cat.id === parseInt(CategoryId as string));
                if (category) {
                    casinoStore.setCategorySelect(category); // Set selected category
                }
            }
            if (ProviderId) {
                const provider = dataList.value.find((prov) => prov.name === ProviderId);
                if (provider) {
                    casinoStore.setProviderSelect(provider); // Set selected provider
                }
            }
        }
    }
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

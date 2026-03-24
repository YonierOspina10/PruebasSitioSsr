<template>
    <!-- Main section for displaying the loading state or the data list -->
    <section class="w-full flex justify-center items-center px-2 my-8">
        <!-- Loading state with animated placeholders -->
        <div
            v-if="loadingLocal"
            class="bg-base-200/90 w-[85%] md:w-[90%] h-[40px] flex justify-center items-center rounded-full gap-4 mx-8 md:max-w-[1112px] md:mx-auto"
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
        <!-- Data list display when not loading -->
        <div
            v-else
            class="flex rounded-full w-[90%] md:w-[80%] mx-auto"
        >
            <!-- Left navigation button -->
            <button
                id="swiper-button-left"
                class="w-[30px] h-[30px] md:w-[28px] md:h-[28px] bg-base-200 hover:bg-neutral rounded-full fill-accent-focus hover:fill-base-100 hover:scale-110 rotate-180 relative md:static left-0 md:left-2 top-0 bottom-0 m-auto z-10 flex justify-center items-center"
                :class="'slidePrev-' + keySlide"
            >
                <IconChevronRight class="w-[20px] h-[20px]"/>
            </button>
            <!-- Swiper container for displaying slides -->
            <swiper-container
                v-if="dataList.length > 0"
                :slides-per-view="'auto'"
                :mousewheel="true"
                :mousewheel-force-to-axis="true"
                :free-mode="true"
                :direction="'horizontal'"
                :navigation="{
                    nextEl: '.slideNext-' + keySlide,
                    prevEl: '.slidePrev-' + keySlide,
                }"
                class="w-[85%] md:w-[90%] h-[40px] px-2 mx-auto"
            >
                <!-- Individual slide for each item in dataList -->
                <swiper-slide
                    v-for="(item, index) in dataList"
                    :key="index"
                    @click="handleSelect(item)"
                    class="min-w-[130px] md:min-w-[150px] w-auto text-neutral md:px-2 md:mx-2 h-[25px] flex justify-center whitespace-nowrap items-center rounded-full text-base hover:border-neutral hover:border-solid hover:border-1 cursor-pointer my-auto"
                    :class="
                        (categorySelect !== null && categorySelect?.id === item.id) ||
                        (providerSelect !== null && providerSelect?.name === item.name)
                            ? 'bg-primary text-neutral-content font-poppinsb'
                            : 'bg-base-400 font-poppinssl'
                    "
                >
                    {{ item.title }}
                </swiper-slide>
            </swiper-container>
            <!-- Message when there are no items to display -->
            <span
                v-else
                class="w-full h-[40px] flex justify-center items-center text-neutral"
            >
                {{ $t('No hay proveedores') }}
            </span>
            <!-- Right navigation button -->
            <button
                id="swiper-button-right"
                class="w-[30px] h-[30px] md:w-[28px] md:h-[28px] bg-base-200 hover:bg-neutral rounded-full fill-accent-focus hover:fill-base-100 hover:scale-110 md:static relative top-0 bottom-0 m-auto z-10 flex justify-center items-center"
                :class="'slideNext-' + keySlide"
            >
                <IconChevronRight class="w-[20px] h-[20px]"/>
            </button>
        </div>
    </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useGetDataCasino } from '@/composables/useGetDataCasino';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import { useCasinoStore } from '@/stores/casino';
import { useRoute, useRouter } from 'vue-router';
import { register } from 'swiper/element/bundle';
import IconChevronRight from '../icons/IconChevronRight.vue';
register();

// Define component props
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {};
        },
    },
});

// Router and route instances
const router = useRouter();
const route = useRoute();
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;

// Casino store reference
const casinoStore = useCasinoStore();
const keySlide: number = Math.floor(Math.random() * 100000); // Random key for slide navigation
const { providerSelect, categorySelect } = storeToRefs(casinoStore); // Reactive references to store state
const loadingLocal = ref(true); // Local loading state
const dataList = ref([]); // List of data items

// Fetch categories and providers based on props
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
            newPath = `/live-casino-vivo/proveedor/${item.name}`;
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
    loadingLocal.value = false; // Update loading state
}

// Lifecycle hook to run on component mount
onMounted(() => {
    if (document.getElementById('swiper-element-bundle') === null) {
        const cdnSwiper = document.createElement('script');
        cdnSwiper.id = 'swiper-element-bundle';
        cdnSwiper.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
        document.head.appendChild(cdnSwiper);
        cdnSwiper.onload = () => {
            console.log('Swiper loaded'); // Log when Swiper is loaded
        };
    }
    setDataList(); // Initialize data list
});

// Watch for loading state changes to update data list
watch(loading, () => {
    setDataList();
});

// Watch for local loading state changes to update selected items
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

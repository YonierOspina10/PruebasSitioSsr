<template>
    <section
        class="w-full h-full mx-auto"
        :class="maxWidthClass"
        aria-label="Casino navigation menu"
    >
        <!-- Providers Navigation -->
        <ProvidersNav
            v-if="data.componentType === 'providersCasino'"
            :providers="providers"
            :value="null"
            :update-url="data.UpdateBrowserURL"
            :variant="data.variant"
            :show-all-button="data.showAllButton"
            :show-all-button-props="{
                name: data.textButton,
            }"
            :keyboard="data.NavigateKeyBoard"
            :mousewheel="data.navigateMouseWheel"
            :show-search="data.showSearchGames"
            :show-more-button="data.showMoreGamesButton"
            :show-nav-buttons="data.showNavButtons"
            :items-per-slide="data.itemsPerSlide"
            :analytics-attrs="analyticsAttrsProviders"
            @select="
                (provider: any) => {
                    onSelectItem(provider, data);
                }
            "
        />
        <!-- Categories Navigation -->
        <CategoriesNav
            v-if="data.componentType === 'categoriesCasino'"
            :categories="categories"
            :update-url="data.UpdateBrowserURL"
            :keyboard="data.NavigateKeyBoard"
            :mousewheel="data.navigateMouseWheel"
            :variant="data.variant"
            :show-all-button="data.showAllButton"
            :show-all-button-props="{
                icon: data.iconButton,
                title: data.textButton,
            }"
            :show-search="data.showSearchGames"
            :show-more-button="data.showMoreGamesButton"
            :show-nav-buttons="data.showNavButtons"
            :items-per-slide="data.itemsPerSlide"
            @select="
                (category: any) => {
                    onSelectItem(category, data);
                }
            "
        />
    </section>
</template>

<script lang="ts" setup>
/*
 * @fileoverview CategoriesAndProviders
 *
 * Dynamic navigation component for casino widgets that displays game providers
 * or categories using components from @tecnologia-general/virtualsoft-widgets library.
 * Supports both provider and category navigation modes with customizable styling.
 *
 * @component CategoriesAndProviders
 * @requires @tecnologia-general/virtualsoft-widgets
 */
// ============== IMPORTS ==============
import ApiService from '@/services/ApiService';
import { useGlobalStore } from '@/stores/global';
import { NavProviders as ProvidersNav, NavCategories as CategoriesNav } from '@tecnologia-general/virtualsoft-widgets';
import { getCurrentInstance, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils';

// ============== SETUP & COMPOSABLES ==============

const route = useRoute();
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
const emitter = instance?.appContext.config.globalProperties.$emitter;
let storeCasinoLobby = useGlobalStore();

// ============== PROPS ==============

const { data } = defineProps(['data']);

// ============== STATE (Refs) ==============

const providers = ref([]);
const categories = ref([]);
const config = (window as any).cconfig;
let typelobby = '0';

console.log(providers.value);

// ============== COMPUTED ==============

// Max width class based on layout configuration
const maxWidthClass = computed(() => (config.layout_ === 8 ? 'max-h-[543px] max-w-[1112px]' : 'w-11/12 h-full max-w-[1300px]'));

// ============== METHODS ==============

const analyticsAttrsProviders = {
    filterAll: {
        'data-analytics-label': `casino:${data.componentType === 'providersCasino' ? 'provider' : 'category'}-filter:all`,
        'data-analytics-context': `component:CategoriesAndProviders|layout:${appComponent.config.layout}`
    },
    viewAll: {
        'data-analytics-label': `casino:${data.componentType === 'providersCasino' ? 'provider' : 'category'}-filter:all`,
        'data-analytics-context': `component:CategoriesAndProviders|layout:${appComponent.config.layout}`
    },
    arrowPrev: {
        'data-analytics-label': `casino:carousel:${data.componentType === 'providersCasino' ? 'providers' : 'categories'}:arrow-prev`,
        'data-analytics-context': `component:CategoriesAndProviders|layout:${appComponent.config.layout}`
    },
    arrowNext: {
        'data-analytics-label': `casino:carousel:${data.componentType === 'providersCasino' ? 'providers' : 'categories'}:arrow-next`,
        'data-analytics-context': `component:CategoriesAndProviders|layout:${appComponent.config.layout}`
    },
    provider: (provider) => ({
        'data-analytics-label': `casino:${data.componentType === 'providersCasino' ? 'provider' : 'category'}-filter:${toKebabCase(provider.name)}`,
        'data-analytics-position': `${data.componentType === 'providersCasino' ? providers.value.findIndex((g) => g.id === provider.id) + 1: categories.value.findIndex((g) => g.id === provider.id) + 1}`,
        'data-analytics-context': `component:CategoriesAndProviders|layout:${appComponent.config.layout}`
    })
};


function getData() {
    let options = {
        action: 'getOptions',
        partner_id: appComponent.partnerG,
        country: appComponent.country,
        typelobby: data.typelobby,
    };
    if (appComponent.session.logueado) {
        options['testUser'] = appComponent.session.user_test == 1;
    }

    // API request
    ApiService.requestGet(appComponent.config.urlVirtualplay + '/cms/products/games/', options).then(
        (response: any) => {
            providers.value = response.data.providers;
            categories.value = formatCategoriesIcon(response.data.categories);
        },
    );
}

function onSelectItem(item, data) {
    updateBrowserUrl(item.name, data.componentType);
    // Update global state based on selection type
    if (data.type === 'providersCasino') {
        appComponent.gAnalytics('supplier', item.title);
        storeCasinoLobby.provider = item.name;
    } else {
        appComponent.gAnalytics('category_live', item.title);
        storeCasinoLobby.category = item.id;
    }
    emitter()?.emit('get:gamesList');
}

function updateBrowserUrl(itemName, type) {
    const routeMap = {
        'new-casino': '/new-casino',
        'virtuales-lobby': '/virtuales-lobby',
        'live-casino-vivo': '/live-casino-vivo',
    };
    let routeName = type === 'providersCasino' ? 'proveedor' : 'categoria';
    const baseRoute = Object.keys(routeMap).find((key) => route.path.includes(key));
    if (!baseRoute) return;
    const url = itemName ? `${routeMap[baseRoute]}/${routeName}/${itemName}` : routeMap[baseRoute];
    window.history.pushState('', '', url);
}

// Normalizes categories to ensure all have an 'icon' field
function formatCategoriesIcon(categories) {
    return categories.map((category) => {
        // If already has icon, return without modification
        if (category.icon) {
            return category;
        }
        // Look for alternative fields (image or imagen)
        const iconValue = category.image || category.imagen;
        if (iconValue) {
            // Add icon from alternative field
            return {
                ...category,
                icon: iconValue,
            };
        }
        // If no icon available, assign empty string
        return {
            ...category,
            icon: '',
        };
    });
}

// ============== LIFE CYCLE ==============
onMounted(() => {
    getData();
});
</script>

<style scoped></style>

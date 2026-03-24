<template>
    <div class="w-full">
        <img :src="Banner" alt="" class="w-full h-full object-cover bg-base-300 -mt-2">
    </div>

    <div class="justify-items-center">


        <loyalty-info-user-v2 class="mt-4" v-if="appComponent?.session?.logueado" :loyalty="loyalty"
            :myloyalty="myloyalty"></loyalty-info-user-v2>

        <div class="w-full overflow-x-auto w-[90%]">
            <div class="flex gap-3 my-4 px-2 whitespace-nowrap md:justify-center">

                <!-- Niveles -->
                <button @click="currentSection = 'niveles'" :class="[
                    'group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-base-300 font-semibold transition hover:bg-primary hover:text-neutral-content',
                    currentSection === 'niveles' ? 'text-primary hover:text-neutral-content' : 'text-neutral'
                ]">
                    <DiamontIcon width="20" height="20" :class="currentSection === 'niveles'
                        ? 'text-primary group-hover:text-neutral-content'
                        : 'group-hover:text-neutral-content'" />
                    Niveles
                </button>

                <!-- Premios -->
                <button @click="currentSection = 'tienda'" :class="[
                    'group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-base-300 font-semibold transition hover:bg-primary hover:text-neutral-content',
                    currentSection === 'tienda' ? 'text-primary' : 'text-neutral'
                ]">
                    <GiftIcon width="20" height="20" :class="currentSection === 'tienda'
                        ? 'text-primary group-hover:text-neutral-content'
                        : 'group-hover:text-neutral-content'" />
                    Premios
                </button>

                <!-- Puntos calificables -->
                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'puntos'" :class="[
                    'group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-base-300 font-semibold transition hover:bg-primary hover:text-neutral-content',
                    currentSection === 'puntos' ? 'text-primary' : 'text-neutral'
                ]">
                    <InsigniaIcon width="20" height="20" :class="currentSection === 'puntos'
                        ? 'text-primary group-hover:text-neutral-content'
                        : 'group-hover:text-neutral-content'" />
                    Puntos calificables
                </button>

                <!-- Transacciones -->
                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'transacciones'" :class="[
                    'group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-base-300 font-semibold transition hover:bg-primary hover:text-neutral-content',
                    currentSection === 'transacciones' ? 'text-primary' : 'text-neutral'
                ]">
                    <ClockIcon width="20" height="20" :class="currentSection === 'transacciones'
                        ? 'text-primary group-hover:text-neutral-content'
                        : 'group-hover:text-neutral-content'" />
                    Transacciones
                </button>

                <!-- Cambio de nivel -->
                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'cambios'" :class="[
                    'group flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-base-300 font-semibold transition hover:bg-primary hover:text-neutral-content',
                    currentSection === 'cambios' ? 'text-primary' : 'text-neutral'
                ]">
                    <ChangeIcon width="20" height="20" :class="currentSection === 'cambios'
                        ? 'text-primary group-hover:text-neutral-content'
                        : 'group-hover:text-neutral-content'" />
                    Cambio de nivel
                </button>

            </div>
        </div>

        <!-- CONTENIDO DINÁMICO POR SECCIÓN -->

        <!-- SECTION 2: Niveles de lealtad -->
        <div class="w-[90%] bg-base-300 rounded-2xl" v-if="currentSection === 'niveles'">
            <loyalty-leves :loyalty="loyalty" :myloyalty="myloyalty" />
        </div>

        <!-- SECTION 3: Lealtad niveles -->
        <div class="w-[90%] bg-base-300 rounded-2xl" v-if="currentSection === 'tienda'">
            <ShopBonuses3 />
        </div>

        <!-- SECTION 4: puntos -->
        <div class="w-[90%] bg-base-300 rounded-2xl" v-if="currentSection === 'puntos'">
            <p>{{ appComponent?.config?.consultLoyaltyQualify?.form?.description }}</p>
            <PointsLevelV2 :data="tableData" :loading="loading" :columns="columnsPoints"
                :filters-config="appComponent?.config?.consultLoyaltyQualify?.form?.[appComponent.country] || []"
                :description="appComponent?.config?.consultLoyaltyQualify?.description" :total-count="totalCount"
                :rows-per-page="rowsPerPage" :current-page="currentPage" @filters-changed="applyFilters"
                @page-changed="goToPage" section="puntos" />

        </div>

        <!-- SECTION 5: Transacciones -->
        <div class="w-[90%] bg-base-300 rounded-2xl" v-if="currentSection === 'transacciones'">
            <p>{{ appComponent?.config?.consultLoyaltyTransaccions?.form?.description }}</p>

            <PointsLevelV2 :data="tableData" :loading="loading" :columns="columnsTransactions"
                :filters-config="appComponent?.config?.consultLoyaltyTransaccions?.form?.[appComponent.country] || []"
                :description="appComponent?.config?.consultLoyaltyTransaccions?.description" :total-count="totalCount"
                :rows-per-page="rowsPerPage" :current-page="currentPage" @filters-changed="applyFilters"
                @page-changed="goToPage" />
        </div>

        <!-- SECTION 6: Cambios de nivel -->
        <div class="w-[90%] bg-base-300 rounded-2xl"
            v-if="currentSection === 'cambios' && appComponent?.session?.logueado">
            <level-history></level-history>
        </div>
    </div>
    <TablePointsV2 :loyalty="loyalty" />
    <VideoLoyalty />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import LoyaltyLeves from '@/components/LoyaltyLeves.vue';
import ShopBonuses3 from '../Config/ShopBonuses3.vue';
import PointsLevelV2 from '@/components/PointsLevelV2.vue';
import LoyaltyInfoUserV2 from '@/components/LoyaltyInfoUserV2.vue';
import LevelHistory from '@/components/LevelHistory.vue';
import apiService from "@/services/ApiService";
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing app component store
import DiamontIcon from '@/components/icons/DiamontIcon.vue';
import GiftIcon from '@/components/icons/GiftIcon.vue';
import InsigniaIcon from '@/components/icons/InsigniaIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import ChangeIcon from '@/components/icons/ChangeIcon.vue';
import VideoLoyalty from '@/components/VideoLoyalty.vue';
import PromotionalCards2 from '@/components/PromotionalCards2.vue';
import TablePointsV2 from '@/components/TablePointsV2.vue';
const appComponent = useAppcomponentStore().appComponent; // Accesses global app configuration from the store

const currentSection = ref('niveles'); // Tracks the currently visible UI section
const tableData = ref([]); // Holds table data returned by API
const loading = ref(false); // Tracks loading state for API calls
const loyalty = ref(null); // Stores global loyalty program information
const Banner = ref(''); // Stores banner image URL
const myloyalty = ref(null); // Stores user-specific loyalty data
const backgroundView = ref(''); // Stores background image URL for the page
const columnsPoints = ref([]); // Stores mapped column config for qualify points
const columnsTransactions = ref([]); // Stores mapped column config for transactions
const rowsPerPage = 5; // Sets number of items displayed per page
const currentPage = ref(1); // Tracks the current page in paginator

function mapColumns(configColumns = []) { // Maps backend column configuration to table-friendly format
    if (!configColumns.length) return []; // Returns empty array if no config provided
    return Object.entries(configColumns[0]).map(([key, label]) => ({ // Converts backend object to key-label pairs
        key, // Table key used in data rendering
        label // Display label shown in header
    }));
}

function goToPage(page) { // Handles page change in paginator
    currentPage.value = page; // Updates current page

    if (currentSection.value === "puntos") { // If qualify-points tab is active
        loadQualifyPoints(); // Reload qualify points
    } else if (currentSection.value === "transacciones") { // If transactions tab is active
        loadTransactions(); // Reload transactions
    }
}

async function getLoyaltyInformation() { // Fetches global loyalty program info from API
    try {
        const response = await apiService.request("loyalty_information", { // Calls backend endpoint
            country: window.appComponent?.country // Sends current user's country
        });

        if (response.code === 0) { // Checks success code
            loyalty.value = response.data.loyalty; // Saves loyalty program information
        }
    } catch (error) {
        console.error("Error fetching loyalty information:", error); // Logs API errors
    }
}

async function getMyLoyaltyInformation() { // Fetches user-specific loyalty info
    try {
        let response = await apiService.request("my_loyalty", {
            country: window.appComponent?.country
        });
        if (response.code === 0) {
            myloyalty.value = response.data.loyalty[0];
        }
    } catch (error) {
        console.error("Error fetching user loyalty information:", error); // Logs API errors
    }
}

const currentFilters = ref({ // Stores current table filters
    type: null, // Transaction type filter
    from: null, // Start date filter
    to: null // End date filter
});

function applyFilters(filters) {
    const old = currentFilters.value;

    const changed =
        old.type !== filters.type ||
        old.from !== filters.from ||
        old.to !== filters.to;

    if (!changed) return;

    currentFilters.value = filters;
    currentPage.value = 1;

    if (currentSection.value === "puntos") {
        loadQualifyPoints();
    } else if (currentSection.value === "transacciones") {
        loadTransactions();
    }
}


async function loadQualifyPoints() { // Loads qualify points from backend
    loading.value = true; // Enables loading state

    const params = { // Sets API parameters
        from_date: currentFilters.value.from
            ? new Date(currentFilters.value.from).getTime() / 1000 // Converts date to Unix timestamp
            : null,

        to_date: currentFilters.value.to
            ? new Date(currentFilters.value.to).getTime() / 1000 // Converts date to Unix timestamp
            : null,

        transactionType: currentFilters.value.type || null, // Sends selected transaction type

        count: rowsPerPage, // Sends rows per page
        start: (currentPage.value - 1) * rowsPerPage, // Sends starting index
    };

    const response = await apiService.request("get_qualify_points", params); // Calls API for qualify points

    tableData.value = response.data || []; // Stores data or empty array
    totalCount.value = Number(response.total_count || 0); // Stores total number of items for pagination

    loading.value = false; // Ends loading state
}

const totalCount = ref(0); // Stores total number of results returned by API

async function loadTransactions() { // Loads loyalty transactions from backend
    loading.value = true; // Enables loading state

    const params = { // Defines API parameters
        from_date: currentFilters.value.from
            ? new Date(currentFilters.value.from).getTime() / 1000
            : null,

        to_date: currentFilters.value.to
            ? new Date(currentFilters.value.to).getTime() / 1000
            : null,

        transactionType: currentFilters.value.type || null, // Sends selected type filter

        count: rowsPerPage, // Rows per page
        start: (currentPage.value - 1) * rowsPerPage, // Offset based on current page
    };

    const response = await apiService.request("get_transactions_loyalty", params); // Calls API

    tableData.value = response.data || []; // Saves returned transaction list
    totalCount.value = Number(response.total_count || 0); // Saves number of total records

    loading.value = false; // Turns off loading state
}

watch(currentSection, async (section) => {
    currentFilters.value = { type: null, from: null, to: null };
    currentPage.value = 1;

    if (section === "puntos") {
        await loadQualifyPoints();
    }

    if (section === "transacciones") {
        await loadTransactions();
    }
});
watch(() => appComponent?.session?.logueado, (isLogged) => {
    if (isLogged) {
        getMyLoyaltyInformation();
    }
});
onMounted(() => { // Executes initialization when component mounts
    if (appComponent?.session?.logueado) { // Checks if user is logged in
        getMyLoyaltyInformation(); // Loads user's loyalty info
    }

    getLoyaltyInformation(); // Loads global loyalty program info

    backgroundView.value = appComponent?.config?.loyaltyProgramView?.backgraundView || ''; // Loads background URL
    Banner.value = appComponent?.config?.loyaltyProgramView?.firstBanner || ''; // Loads banner URL

    const qualifyCfg = appComponent?.config?.consultLoyaltyQualify?.tableColumns?.[appComponent.country]; // Retrieves qualify points column config
    if (qualifyCfg) {
        columnsPoints.value = mapColumns(qualifyCfg);// Maps qualify points columns
    }

    const transactCfg = appComponent?.config?.consultLoyaltyTransaccions?.tableColumns?.[appComponent.country]; // Retrieves transaction column config
    if (transactCfg) {
        columnsTransactions.value = mapColumns(transactCfg); // Maps transaction columns
    }
});
</script>

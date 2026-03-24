<template>
    <div class="w-full">
        <img :src="Banner" alt="" class="w-full h-full object-cover rounded-xl bg-base-300">
    </div>

    <div class="justify-items-center pb-10" :style="{ backgroundImage: `url('${backgroundView}')` }">


        <div class="w-full flex flex-col justify-center items-center gap-6 my-8 text-neutral">

            <h2 class="in text-3xl lg:text-4xl font-semibold text-center">
                {{ $t('¡Bienvenido a DoradoClub!') }}
            </h2>

            <div class="grid gap-3 text-center text-base lg:text-lg font-normal">
                <p class="in">
                    {{ $t('El programa de beneficios de Doradobet que te da increíbles premios solo por jugar.') }}
                </p>
                <p class="in">
                    {{ $t('Con DoradoClub, por cada apuesta que hagas acumulas puntos que podrás canjear por premios.')
                    }}
                </p>
            </div>
            <!-- BOTONES DE SECCIÓN -->
            <div class="grid grid-cols-2 md:grid-flow-col md:auto-cols-auto gap-3 my-6 justify-center md:justify-start">
                <button @click="currentSection = 'tablePoints'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'tablePoints' ? 'bg-secondary-focus' : 'bg-secondary hover:bg-secondary-focus'
                ]">
                    DoradoClub
                </button>

                <button @click="currentSection = 'niveles'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'niveles' ? 'bg-secondary-focus' : 'bg-secondary hover:bg-secondary-focus'
                ]">
                    Niveles de lealtad
                </button>

                <button @click="currentSection = 'tienda'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'tienda' ? 'bg-success' : 'bg-success hover:bg-success-content'
                ]">
                    Ir a la Tienda de premios
                </button>

                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'puntos'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'puntos' ? 'bg-secondary-focus' : 'bg-secondary hover:bg-secondary-focus'
                ]">
                    Puntos calificables
                </button>

                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'transacciones'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'transacciones' ? 'bg-secondary-focus' : 'bg-secondary hover:bg-secondary-focus'
                ]">
                    Transacciones
                </button>

                <button v-if="appComponent?.session?.logueado" @click="currentSection = 'cambios'" :class="[
                    'px-4 py-2 rounded-lg text-neutral font-semibold',
                    currentSection === 'cambios' ? 'bg-secondary-focus' : 'bg-secondary hover:bg-secondary-focus'
                ]">
                    Cambios de nivel
                </button>
            </div>


        </div>
        <loyalty-info-user v-if="appComponent?.session?.logueado" :loyalty="loyalty"
            :myloyalty="myloyalty"></loyalty-info-user>


        <!-- CONTENIDO DINÁMICO POR SECCIÓN -->

        <!-- SECTION 1: DoradoClub -->
        <div class="w-[90%]" v-if="currentSection === 'tablePoints'">
            <table-points :loyalty="loyalty" />
        </div>

        <!-- SECTION 2: Niveles de lealtad -->
        <div class="w-[90%]" v-if="currentSection === 'niveles'">
            <loyalty-leves :loyalty="loyalty" :myloyalty="myloyalty" />
        </div>

        <!-- SECTION 3: Lealtad niveles -->
        <div v-if="currentSection === 'tienda'">
            <ShopBonuses4 />
        </div>

        <!-- SECTION 4: puntos -->
        <div class="w-[90%]" v-if="currentSection === 'puntos'">
            <p>{{ appComponent?.config?.consultLoyaltyQualify?.form?.description }}</p>
            <points-level :data="tableData" :loading="loading" :columns="columnsPoints"
                :filters-config="appComponent?.config?.consultLoyaltyQualify?.form?.[appComponent.country] || []"
                :description="appComponent?.config?.consultLoyaltyQualify?.description" :total-count="totalCount"
                :rows-per-page="rowsPerPage" :current-page="currentPage" @filters-changed="applyFilters"
                @page-changed="goToPage" section="puntos" />

        </div>

        <!-- SECTION 5: Transacciones -->
        <div class="w-[90%]" v-if="currentSection === 'transacciones'">
            <p>{{ appComponent?.config?.consultLoyaltyTransaccions?.form?.description }}</p>

            <points-level :data="tableData" :loading="loading" :columns="columnsTransactions"
                :filters-config="appComponent?.config?.consultLoyaltyTransaccions?.form?.[appComponent.country] || []"
                :description="appComponent?.config?.consultLoyaltyTransaccions?.description" :total-count="totalCount"
                :rows-per-page="rowsPerPage" :current-page="currentPage" @filters-changed="applyFilters"
                @page-changed="goToPage" />
        </div>

        <!-- SECTION 6: Cambios de nivel -->
        <div class="w-[90%]" v-if="currentSection === 'cambios' && appComponent?.session?.logueado">
            <level-history :loyalty="loyalty"></level-history>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'; // Imports Vue reactivity tools and lifecycle hooks
import TablePoints from '@/components/TablePoints.vue'; // Imports table component for qualify points
import LoyaltyLeves from '@/components/LoyaltyLeves.vue'; // Imports loyalty levels visual component
import ShopBonuses4 from '../Config/ShopBonuses4.vue'; // Imports bonus configuration component
import PointsLevel from '@/components/PointsLevel.vue'; // Imports component that displays loyalty points requirements
import LoyaltyInfoUser from '@/components/LoyaltyInfoUser.vue'; // Imports component with user's loyalty info
import LevelHistory from '@/components/LevelHistory.vue'; // Imports component showing user's level history
import apiService from "@/services/ApiService"; // Imports API service wrapper
import { useAppcomponentStore } from '@/stores/AppComponent'; // Imports global app store

const appComponent = useAppcomponentStore().appComponent; // Accesses global app configuration from the store

const currentSection = ref('tablePoints'); // Tracks the currently visible UI section

const Banner = ref(''); // Stores banner image URL
const tableData = ref([]); // Holds table data returned by API
const loading = ref(false); // Tracks loading state for API calls
const loyalty = ref(null); // Stores global loyalty program information
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
        const response = await apiService.request("my_loyalty", { // Calls backend endpoint
            country: window.appComponent?.country // Sends user's country to backend
        });

        if (response.code === 0) { // Checks success code
            myloyalty.value = response.data.loyalty[0]; // Saves first loyalty record for user
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

function applyFilters(filters) { // Applies filters to reload data
    currentFilters.value = filters; // Updates reactive filter object
    currentPage.value = 1; // Resets paginator to first page

    if (currentSection.value === "puntos") { // Reload points if points tab is active
        loadQualifyPoints();
    } else if (currentSection.value === "transacciones") { // Reload transactions if transaction tab is active
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

<template>
    <div :class="appComponent?.config?.loyalty_type?.version === 4
        ? ''
        : 'border border-neutral'"
        class="w-full flex flex-col gap-6 h-full justify-around backdrop-blur-sm bg-transparent/5 text-neutral rounded-3xl p-6">
        <div class="flex flex-wrap gap-4 my-4"
            :class="appComponent?.config?.loyalty_type?.version === 4 ? 'justify-start' : 'justify-end'">
            <!-- Texto versión 4 -->
            <p :class="appComponent?.config?.loyalty_type?.version === 4
                ? 'md:text-start w-full text-neutral text-center'
                : 'hidden'">
                Revisa tus movimientos de cambio de nivel.
            </p>

            <div class="flex flex-wrap gap-4 my-4">
                <template v-for="field in appComponent?.config?.consultLoyaltyHistory?.form?.[appComponent.country] || []"
                    :key="field.name">

                    <!-- Filtro tipo fecha -->
                    <div v-if="field.type === 'date'" class="flex flex-col w-full md:w-auto min-w-[12rem] basis-auto">
                        <span class="text-sm text-neutral">{{ field.label }}</span>
                        <div class="relative">
                            <FunnelIcon
                                class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral w-5 h-5" />
                            <input type="date" v-model="dateModel[field.name]" :placeholder="field.placeholder"
                                @blur="onDateBlur(field.name)"
                                class="border rounded-full pl-10 pr-4 py-1 bg-base-200 text-neutral w-full" />
                        </div>
                    </div>

                    <!-- Filtro tipo select -->
                    <div v-else-if="field.type === 'select' && field.options?.length"
                        class="flex flex-col w-full md:w-auto min-w-[12rem] basis-auto">
                        <label class="text-sm text-neutral">{{ field.label }}</label>
                        <div class="relative">
                            <FunnelIcon
                                class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral w-5 h-5" />
                            <select v-model="filterType"
                                class="border rounded-full pl-10 pr-4 py-1 bg-base-200 text-neutral w-full">
                                <option value="">{{ field.placeholder || 'Seleccione' }}</option>
                                <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                </template>
            </div>
        </div>

        <div v-for="(item, idx) in report" :key="idx"
            class="w-full bg-gradient-to-r from-base-content to-base-200 rounded-2xl p-6 flex flex-col gap-4 h-full justify-around"
            :class="appComponent?.config?.loyalty_type?.version === 4
                ? ''
                : 'border-b border-b-neutral'">

            <!-- GRID DE 6 COLUMNAS -->
            <div class="grid grid-cols-1 md:grid-cols-6 md:divide-y-0 md:divide-x divide-accent gap-0 items-start">

                <!-- Columna 1: siempre visible -->
                <div class="flex items-center gap-4 md:col-span-2 p-2 cursor-pointer" @click="toggleRow(idx)">
                    <!-- ANTERIOR -->
                    <div class="flex flex-col gap-2 h-full justify-around w-full">
                        <div class="text-xs font-semibold text-neutral">ANTERIOR</div>
                        <div class="flex items-center gap-1 bg-secondary p-3 rounded-full w-full justify-start">
                            <img v-if="getLevelImage(item.previous_level)" :src="getLevelImage(item.previous_level)"
                                class="w-5 h-5 rounded-full object-cover" />
                            <span class="text-sm text-neutral font-semibold">{{ getLevelName(item.previous_level)
                                }}</span>
                        </div>
                    </div>

                    <!-- ICONO EN LA MITAD -->
                    <img class="rotate-90 w-8 h-8 self-center" :src="icons.greenUpIcon" alt="" />

                    <!-- ACTUAL -->
                    <div class="flex flex-col gap-2 h-full justify-around w-full">
                        <div class="text-xs font-semibold text-neutral">ACTUAL</div>
                        <div :class="appComponent?.config?.loyalty_type?.version === 4
                            ? 'border border-accent'
                            : 'border-b border-accent'"
                            class="flex items-center gap-1 bg-secondary p-3 rounded-full w-full justify-start">
                            <img v-if="getLevelImage(item.current_level)" :src="getLevelImage(item.current_level)"
                                class="w-5 h-5 rounded-full object-cover" />
                            <span class="text-sm text-neutral font-semibold">{{ getLevelName(item.current_level)
                                }}</span>
                        </div>
                    </div>

                    <!-- Flechita para mobile -->
                    <div class="md:hidden ml-auto">
                        <svg v-if="!expandedRows[idx]" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </div>
                </div>

                <!-- COLUMNAS EXTRA -->
                <div class="col-span-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-accent w-full space-y-1 md:space-y-0 m-1"
                    :class="{ 'hidden md:flex': !expandedRows[idx] }">


                    <!-- Fecha -->
                    <div class="flex-1 flex flex-col gap-2 p-2">
                        <div class="text-xs font-semibold text-neutral/80">FECHA DE CAMBIO</div>
                        <div class="flex items-center gap-2 text-neutral">📅 {{ formatPeriod(item.change_date) }}</div>
                    </div>
                    <!-- Puntos -->
                    <div class="flex-1 flex flex-col gap-2 p-2">
                        <div class="text-xs font-semibold text-neutral/80">PUNTOS AL CAMBIO *</div>
                        <div class="text-neutral font-semibold">{{ item.points_for_change }}</div>
                    </div>
                    <!-- Motivo -->
                    <div class="flex-1 flex flex-col gap-2 p-2">
                        <div class="text-xs font-semibold text-neutral/80">MOTIVO</div>
                        <div class="flex gap-2 text-neutral">
                            <img class="w-5 h-5" :class="getReasonIcon(item.reason).class"
                                :src="getReasonIcon(item.reason).icon" alt="" />
                            {{ formatReason(item.reason) }}
                        </div>
                    </div>
                    <!-- Periodo -->
                    <div class="flex-1 flex flex-col gap-2 p-2">
                        <div class="text-xs font-semibold text-neutral/80">PERIODO</div>
                        <div class="text-neutral">{{ formatPeriod(item.period) }}</div>
                    </div>
                </div>

            </div>


        </div>
        <div class="w-full justify-items-center">
            <tr v-if="report.length === 0">
                <td colspan="6" class="py-6 text-neutral/70">
                    No se encontraron resultados
                </td>
            </tr>
            <p class=""><strong>*Puntos al cambio:</strong> es la cantidad de puntos que alcanzaste para
                que se realizara un cambio de nivel.</p>
        </div>
        <!-- PAGINACIÓN -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 py-4">

            <button class="px-3 py-1 rounded disabled:opacity-40" :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)">
                «
            </button>

            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :disabled="page === '...'"
                class="px-3 py-1 rounded" :class="[
                    page === currentPage ? 'bg-primary text-neutral-content' : 'text-neutral',
                    page === '...' ? 'cursor-default opacity-60' : ''
                ]">
                {{ page }}
            </button>

            <button class="px-3 py-1 rounded disabled:opacity-40" :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)">
                »
            </button>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"; // Imports Vue reactivity utilities.
import apiService from "@/services/ApiService"; // API request service.
import { useAppcomponentStore } from '@/stores/AppComponent'; // Pinia store for global app component.
import FunnelIcon from "./icons/FunnelIcon.vue"; // Imports the funnel icon component.

const report = ref([]); // Stores the full report data.
const appComponent = useAppcomponentStore().appComponent; // Retrieves global app component configuration.
const filterType = ref(""); // Selected filter for 'reason'.
const rowsPerPage = 5;
const totalCount = ref(0);
const loading = ref(false);

// PAGINATION
const currentPage = ref(1); // Current page number.

const totalPages = computed(() =>
    Math.ceil(totalCount.value / rowsPerPage)
);

const visiblePages = computed(() => {
    const pages = []; // Stores visible page numbers.
    const total = totalPages.value; // Total page count.
    let start = Math.max(currentPage.value - 2, 1); // Starting page shown.
    let end = Math.min(start + 4, total); // Ending page shown.
    if (end - start < 4) start = Math.max(end - 4, 1); // Adjusts range if needed.

    for (let i = start; i <= end; i++) pages.push(i); // Pushes normal page numbers.
    if (start > 1) pages.unshift('...'); // Adds ellipsis before if needed.
    if (end < total) pages.push('...'); // Adds ellipsis after if needed.
    return pages; // Returns visible page list.
});

const expandedRows = ref([]); // Stores open/closed state for each row.
function toggleRow(idx) {
    expandedRows.value[idx] = !expandedRows.value[idx]; // Toggles individual row.
}

function formatPeriod(periodStr) {
    const dates = periodStr.split(" - "); // Splits start and end dates.
    return dates.map(d => d.replace(/-/g, "/")).join(" - "); // Formats both sides.
}
function goToPage(page) {
    if (page === '...') return;
    currentPage.value = page;
    loadReportChangeLevel();
}
// We store previous values to compare for changes
function onDateBlur(fieldName) {
    // If the value of the date field has changed
    if (dateModel.value[fieldName] !== previousDates.value[fieldName]) {
        // Update the previous value with the new one
        previousDates.value[fieldName] = dateModel.value[fieldName];
        // Reset pagination to the first page
        currentPage.value = 1;
        // Reload the report data from the API
        loadReportChangeLevel();
    }
}
// Reactive model for storing date values
const dateModel = ref({
    from_date: "",  // Start date value
    to_date: "",    // End date value
});

// Reactive object to store previous date values for comparison
const previousDates = ref({ ...dateModel.value });


// API
async function loadReportChangeLevel() {
    loading.value = true;

    const params = {
        from_date: dateModel.value.from_date
            ? new Date(dateModel.value.from_date).getTime() / 1000
            : null,

        to_date: dateModel.value.to_date
            ? new Date(dateModel.value.to_date).getTime() / 1000
            : null,

        transactionType: filterType.value || null,

        count: rowsPerPage,
        start: (currentPage.value - 1) * rowsPerPage,
    };

    const res = await apiService.request("get_report_change_loyalty_level", params);
    report.value = res?.data || [];
    totalCount.value = Number(res?.total_count || 0);

    loading.value = false;
}

onMounted(() => loadReportChangeLevel()); // Loads data when component mounts.

const icons = computed(() => {
    return appComponent?.config?.loyaltyProgramView?.commonIcons || {};
    // Retrieves common icons from global configuration.
});

// Helpers
function getLevelImage(level) {
    // coerce to number safely
    const lvl = Number(level);                     // convert string "0"/"1" to number
    if (!Number.isFinite(lvl) || lvl <= 0) return ""; // return empty if 0, negative or invalid

    const levels = appComponent?.config?.loyalty_levels_settings; // Retrieves level settings.
    if (!levels) return ""; // Safety fallback.

    const item = levels[lvl - 1]; // lvl guaranteed > 0
    if (!item) return ""; // If missing, return empty.

    const numbersMap = [ // Number-to-word mapping for dynamic keys.
        "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"
    ];
    const key = `ImageLevel${numbersMap[lvl - 1]}`;
    return item[key] || ""; // Returns image or fallback.
}

function getLevelName(level) {
    const levels = appComponent?.config?.loyalty_levels_settings; // Level configuration list.
    if (!levels) return `Nivel ${level}`; // Fallback name.

    const item = levels[level - 1]; // Retrieves level entry.
    if (!item) return `Nivel ${level}`; // Fallback if missing.

    const numbersMap = [ // Same mapping as before.
        "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"
    ];

    const key = `NameLevel${numbersMap[level - 1]}`; // Builds name key.
    return item[key] || `Nivel ${level}`; // Returns name or fallback.
}

// Raw values of 'reason'
const availableTypes = computed(() => {
    return [...new Set(report.value.map(r => r.reason))];
    // Extracts unique 'reason' types from the report.
});

// Translated select values
const reasonMap = {
    promotion: "Ascenso",
    initial_assignment: "Asignación inicial",
    tenure: "Mantenimiento",
    demotion: "Descenso"
};

// Select options siempre fijas
const translatedTypes = computed(() =>
    Object.entries(reasonMap).map(([key, label]) => ({ value: key, label }))
);

// Función para mostrar texto traducido
function formatReason(reason) {
    return reasonMap[reason] || reason;
}

function getReasonIcon(reason) {
    const i = icons.value || {}; // Retrieves icons set.

    const iconsMap = { // Maps reason to icon + rotation class.
        promotion: {
            icon: i.greenUpIcon,
            class: ""
        },
        initial_assignment: {
            icon: i.greenUpIcon,
            class: "rotate-90"
        },
        tenure: {
            icon: i.greenUpIcon,
            class: "rotate-90"
        },
        demotion: {
            icon: i.redDownIcon,
            class: ""
        }
    };

    return iconsMap[reason] || { icon: "", class: "" }; // Returns icon object or fallback.
}

</script>

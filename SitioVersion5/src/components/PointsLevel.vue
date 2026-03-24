<template>
    <div :class="appComponent?.config?.loyalty_type?.version === 4
        ? ''
        : 'border border-neutral'" class="w-full backdrop-blur-sm bg-transparent/5 text-neutral rounded-3xl p-6">
        <p :class="appComponent?.config?.loyalty_type?.version === 4
            ? 'text-start'
            : 'text-center'" class="text-neutral" v-html="description"></p>

        <!-- FILTROS -->
        <div :class="appComponent?.config?.loyalty_type?.version === 4
            ? 'justify-start'
            : 'justify-end'" class="flex flex-wrap gap-4 my-4">

            <div v-for="field in filtersConfig" :key="field.name" class="flex flex-col w-full sm:w-[12rem]">
                <label class="text-sm text-neutral">{{ field.label }}</label>

                <div class="relative">
                    <FunnelIcon v-if="field.type === 'select' || field.type === 'date'"
                        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral w-5 h-5" />

                    <select v-if="field.type === 'select'" v-model="filters[field.name]" @change="emitFilters"
                        class="border rounded-full pl-10 pr-4 py-1 bg-base-200 text-neutral w-full">
                        <option value="">{{ field.placeholder || 'Todos' }}</option>
                        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                            {{ opt.name }}
                        </option>
                    </select>

                    <input v-else-if="field.type === 'date'" type="date" v-model="filters[field.name]"
                        @blur="emitFilters"
                        class="border rounded-full pl-10 pr-4 py-1 bg-base-200 text-neutral w-full" />

                    <input v-else type="text" v-model="filters[field.name]" @blur="emitFilters"
                        class="border rounded-full pl-4 pr-4 py-1 bg-base-200 text-neutral w-full" />
                </div>
            </div>

        </div>
        <div v-if="loading" class="text-center py-4 text-accent">
            Cargando...
        </div>
        <div v-if="paginatedData.length === 0 && !loading" class="text-center py-6 text-neutral/70 font-semibold">
            No se encontraron resultados
        </div>
        <div v-else>

            <!-- TABLA -->
            <table class="w-full text-left border-collapse text-neutral table-fixed">
                <thead class="text-neutral">
                    <!-- DESKTOP: todas las columnas -->
                    <tr class="hidden md:table-row">
                        <th v-for="(col, index) in columnsOrdered" :key="col.key" class="p-3" :class="getAlignClass(index)">
                            {{ col.label }}
                        </th>
                    </tr>

                    <!-- MÓVIL: solo 2 columnas -->
                    <tr class="md:hidden">
                        <th class="p-3 text-left">Movimiento</th>
                        <th class="p-3 text-right">Puntos</th>
                    </tr>
                </thead>


                <tbody>
                    <tr v-for="item in paginatedData" :key="item.id"
                        class="border-b border-neutral/10 transition-colors" :class="item.movement === 'in'
                            ? 'hover:border-success'
                            : 'hover:border-error'">

                        <!-- MÓVIL: 2 columnas -->
                        <td class="p-3 md:hidden">
                            <div class="flex items-center gap-2">
                                <img :src="item.movement === 'in' ? greenUp : redDown"
                                    class="w-10 h-10 inline-block mr-2" />
                                <div class="flex flex-col">
                                    <span class="font-semibold">{{ translateType(item.type) }}</span>
                                    <span class="text-sm text-neutral/70">{{ formatDateOnly(item.date) }} - {{ item.id
                                        }}</span>
                                </div>
                            </div>
                        </td>

                        <td class="p-3 md:hidden text-right font-semibold">
                            {{ item.movement === 'in' ? '+' : '-' }} {{ item.points }}
                        </td>

                        <!-- DESKTOP: todas las columnas -->
                        <td v-for="(col, index) in columnsOrdered" :key="col.key" class="p-3 hidden md:table-cell"
                            :class="getAlignClass(index)">
                            <template v-if="col.key === 'movement'">
                                <img :src="item.movement === 'in' ? greenUp : redDown"
                                    class="w-10 h-10 inline-block mr-2" />
                                <span>{{ translateType(item.type) }}</span>
                            </template>

                            <template v-else-if="col.key === 'type'">
                                {{ translateType(item.type) }}
                            </template>

                            <template v-else-if="col.key === 'points'">
                                {{ item.movement === 'in' ? '+' : '-' }} {{ item.points }}
                            </template>

                            <template v-else>
                                <span v-if="col.key === 'date'">{{ formatDateOnly(item.date) }}</span>
                                <span v-else>{{ item[col.key] }}</span>
                            </template>

                        </td>
                    </tr>
                </tbody>

            </table>

            <!-- EXPORTAR -->
            <div class="flex gap-3 justify-end my-4">
                <button @click="exportToPDF" :class="appComponent?.config?.loyalty_type?.version === 4
                    ? 'border-primary border-1 text-primary gap-2 font-semibold'
                    : 'bg-secondary text-neutral'"
                    class="flex w-full md:w-auto px-4 py-2 rounded-lg hover:bg-secondary-focus">
                    Descargan en PDF
                    <icon-download></icon-download>
                </button>
                <button @click="exportToExcel" :class="appComponent?.config?.loyalty_type?.version === 4
                    ? 'border-primary border-1 text-primary gap-2 font-semibold'
                    : 'bg-secondary text-neutral '"
                    class="flex w-full md:w-auto px-4 py-2 rounded-lg hover:bg-secondary-focus">
                    Descargar en XLSX
                    <icon-download></icon-download>
                </button>
            </div>
            <!-- PAGINACIÓN -->
            <div class="flex items-center justify-center gap-2 py-4">

                <button class="px-3 py-1 rounded disabled:opacity-40" :disabled="props.currentPage === 1"
                    @click="goToPage(props.currentPage - 1)">
                    «
                </button>

                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :disabled="page === '...'"
                    class="px-3 py-1 rounded text-neutral" :class="[
                        page === props.currentPage ? 'bg-primary text-neutral-content' : '',
                        page === '...' ? 'cursor-default opacity-60' : ''
                    ]">
                    {{ page }}
                </button>

                <button class="px-3 py-1 rounded disabled:opacity-40" :disabled="props.currentPage === totalPages"
                    @click="goToPage(props.currentPage + 1)">
                    »
                </button>

            </div>
        </div>

    </div>
</template>


<script setup>// Start of Vue’s <script setup> block

import { ref, computed, watch } from 'vue'; // Import reactive and computed utilities from Vue
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import Pinia store composable
import IconDownload from '@/components/icons/IconDownload.vue'; // Import a download icon component
import FunnelIcon from './icons/FunnelIcon.vue'; // Import a funnel/filter icon component

const appComponent = useAppcomponentStore().appComponent; // Access the appComponent config object from the store
const filterDateFrom = ref(""); // Reactive variable for the “date from” filter
const filterDateTo = ref(""); // Reactive variable for the “date to” filter
const filters = ref({});
const filterType = ref(""); // Reactive filter by type
const emit = defineEmits(['filters-changed', 'page-changed']);

watch(filterType, () => {
    emit("filters-changed", {
        type: filterType.value || null,
        from: filterDateFrom.value || null,
        to: filterDateTo.value || null
    });
});

const greenUp = appComponent?.config?.loyaltyProgramView?.commonIcons?.greenUpIcon; // Extract “green up arrow icon” from config
const redDown = appComponent?.config?.loyaltyProgramView?.commonIcons?.redDownIcon; // Extract “red down arrow icon” from config

function emitFilters() {
    emit('filters-changed', {
        type: filters.value.transactionType || null,
        from: filters.value.from_date || null,
        to: filters.value.to_date || null
    });
}

const props = defineProps({
    data: { type: Array, required: true },
    loading: Boolean,
    columns: Array,
    description: String,
    section: String,
    filtersConfig: { type: Array, default: () => [] },
    // NUEVOS
    totalCount: { type: Number, default: 0 },
    rowsPerPage: { type: Number, default: 5 },
    currentPage: { type: Number, default: 1 }
});

const columnsOrdered = computed(() => {
    if (!props.columns) return [];

    const movementCol = props.columns.find(col => col.key === 'movement');
    const otherCols = props.columns.filter(col => col.key !== 'movement');

    // Movimiento SIEMPRE primero
    return movementCol ? [movementCol, ...otherCols] : props.columns;
});

async function exportToExcel() { // Function to export filtered/paginated data to XLSX
    const XLSX = await import("xlsx"); // Dynamically import xlsx library

    const now = new Date(); // Current date and time
    const fecha = now.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const hora = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // Format as HH-MM-SS
    const sectionName = props.section === "puntos" // Select filename suffix depending on the section
        ? "reporte_lealtad_puntos_calificables"
        : "reporte_lealtad_transacciones";

    const filename = `Virtualsoft_${fecha}_${hora}_${sectionName}.xlsx`; // Final filename

    const data = paginatedData.value.map(item => { // Build XLSX rows based on visible paginated data
        const row = {};
        props.columns.forEach(col => {
            let val = item[col.key]; // Get raw value for column

            if (col.key === "movement") val = item.movement === "in" ? "Entrada" : "Salida"; // Translate movement field
            if (col.key === "type") val = translateType(item.type); // Translate type
            if (col.key === "points") val = (item.movement === "in" ? "+" : "-") + item.points; // Show + or - for points
            if (col.key === "date") val = formatDateOnly(item.date); // Format date

            row[col.label] = val; // Use column label as XLSX header
        });
        return row;
    });

    const ws = XLSX.utils.json_to_sheet(data); // Create worksheet from JSON
    const wb = XLSX.utils.book_new(); // Create workbook
    XLSX.utils.book_append_sheet(wb, ws, "Página"); // Append sheet named "Página"

    XLSX.writeFile(wb, filename); // Download XLSX file
}
const paginatedData = computed(() => {
    return Array.isArray(props.data) ? props.data : [];
});

async function exportToPDF() {
}
const typeMap = {
    casino: "Casino",
    live_casino: "Casino en vivo",
    expired_points: "Puntos expirados",
    sportbook: "Apuestas deportivas",
    redeemed_gifts: "Regalos canjeados",
    restart_lvl: "Reinicio de nivel"
};

function translateType(type) {
    return typeMap[type] || type;
}

function getAlignClass(index) { // Set text alignment per column
    if (index === 0) return 'text-left'; // First column: left aligned
    if (index === props.columns.length - 1) return 'text-right'; // Last column: right aligned
    return 'text-center'; // Middle columns: center aligned
}

const availableTypes = computed(() => Object.keys(typeMap));


const totalPages = computed(() =>
    Math.ceil(props.totalCount / props.rowsPerPage)
);


function goToPage(page) {
    if (page >= 1 && page <= totalPages.value && page !== '...') {
        emit("page-changed", page);
    }
}


const visiblePages = computed(() => { // Build pagination blocks with ellipsis
    const pages = [];
    const total = totalPages.value;
    const current = props.currentPage;

    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1); // Show all if few pages
    }

    pages.push(1);

    if (current > 3) pages.push('...'); // Leading ellipsis

    const start = Math.max(2, current - 1); // Middle pages
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) pages.push('...'); // Trailing ellipsis

    pages.push(total);

    return pages;
});

function formatDateOnly(datetime) { // Return only date portion
    if (!datetime) return ''; // Handle empty/null
    return datetime.split(' ')[0]; // Extract YYYY-MM-DD
}

</script>

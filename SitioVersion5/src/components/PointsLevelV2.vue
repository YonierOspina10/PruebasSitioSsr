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
            <table class="w-full text-left text-neutral table-fixed">
                <tbody>
                    <tr v-for="item in paginatedData" :key="item.id">
                        <td colspan="2" class="py-2">
                            <!-- WRAPPER que sí acepta estilos bonitos -->
                            <div class="bg-gradient-to-r from-base-content to-base-300 
                   p-4 border-1 border-neutral/20 rounded-2xl ">

                                <!-- ---- AQUÍ VA TODO EL CONTENIDO DE TU FILA ---- -->
                                <div class="flex items-center justify-between">

                                    <!-- COLUMNA 1 -->
                                    <div class="flex items-center gap-3">

                                        <img v-if="columnsMap.movement"
                                            :src="item.movement === 'in' ? greenUp : redDown"
                                            class="w-12 h-12 object-contain" />

                                        <div class="flex flex-col">
                                            <span v-if="columnsMap.type || columnsMap.movement"
                                                class="font-semibold text-neutral">
                                                {{ translateType(item.type) }}
                                            </span>

                                            <div class="flex gap-2">
                                                <span v-if="columnsMap.id" class="text-sm text-neutral/60">
                                                    ID: {{ item.id }}
                                                </span>
                                                <span v-if="columnsMap.date" class="text-sm text-neutral/70">
                                                    {{ formatDateOnly(item.date) }}
                                                </span>
    
                                            </div>
                                        </div>
                                    </div>

                                    <!-- COLUMNA 2 -->
                                    <span v-if="columnsMap.points" class="text-right font-semibold">
                                        {{ item.movement === 'in' ? '+' : '-' }}{{ item.points }}
                                    </span>

                                </div>
                                <!-- ---- FIN DEL CONTENIDO ---- -->

                            </div>
                        </td>
                    </tr>

                </tbody>

            </table>
            <!-- PAGINACIÓN -->
            <div class="flex justify-end gap-2 py-4">

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
const columnsMap = computed(() => {
    const cols = props.columns || [];
    const map = {};
    cols.forEach(col => {
        map[col.key] = true;
    });
    return map;
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

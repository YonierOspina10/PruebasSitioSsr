<template>
    <section
        class="w-full h-full mx-auto"
        :class="maxWidthClass"
        aria-label="Jackpots"
    >
        <!-- Jackpots Container -->
        <JackpotsContainer
            v-if="jackpotsList.length"
            :jackpots="jackpotsList"
            :variant="data.variant"
            :container-image="data.containerImage"
            :container-title="data.showTitle? data.containerTitle: ''"
            :count-integers="data.countIntegers"
            :count-decimals="data.countDecimals"
            @select-info="(jackpot: any) => selectInfo(jackpot)"
        />
    </section>
</template>

<script lang="ts" setup>
/*
 * @fileoverview JackpotsContainer
 *
 * jackpots for casino  using JackpotsContainer from
 * @tecnologia-general/virtualsoft-widgets library.
 * Fetches and displays Jaackpots.
 *
 * @component JackpotsContainer
 * @requires @tecnologia-general/virtualsoft-widgets
 */
// ============== IMPORTS ==============
import ApiService from '@/services/ApiService';
import { useGlobalStore } from '@/stores/global';
import { JackpotsContainer } from '@tecnologia-general/virtualsoft-widgets';
import { getCurrentInstance, ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

// ============== SETUP & COMPOSABLES ==============

const route = useRoute();
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
const emitter = instance?.appContext.config.globalProperties.$emitter;
let storeCasinoLobby = useGlobalStore();

// ============== PROPS ==============

const { data } = defineProps(['data']);

// ============== STATE (Refs) ==============

let jackpotsData = [];
const jackpotsList = ref([]);
const config = (window as any).cconfig;

// ============== COMPUTED ==============

// Max width class based on layout configuration
const maxWidthClass = computed(() => (config.layout_ === 8 ? 'max-w-[1112px]' : 'max-w-[1300px]'));

// ============== METHODS ==============

function getJackpotsData() {
    if (appComponent?.jackpotsList && appComponent.jackpotsList.length > 0) {
        jackpotsData = appComponent.jackpotsList;
        jackpotsList.value = formatJackpots(jackpotsData);
    }
}

function formatJackpots(jackpots) {
    const formattedJackpot = [];
    jackpots.forEach((jackpot) => {
        const item = {
            id: jackpot.id,
            mainImage: jackpot.image,
            imageFrame: jackpot.image2,
            animation: jackpot.gif,
            decimal: jackpot.counterStyle !== 1 ? true : false,
            currency: jackpot.currency,
            currentValue: jackpot.currentValue,
            information: jackpot.information,
        };
        formattedJackpot.push(item);
    });
    return formattedJackpot;
}

function selectInfo(jackpot) {
    appComponent.JackpotInformation = jackpot.information ?? '';
}

// ============== WATCH ==============
watch(
  () => appComponent?.jackpotsList,
  (newVal, oldVal) => {
    // Avoid updating if the arrays are the same
    if(newVal.length === oldVal.length || newVal === oldVal) return
    jackpotsData = appComponent.jackpotsList;
    jackpotsList.value = formatJackpots(jackpotsData);
  },
);

// ============== LIFE CYCLE ==============
onMounted( () => {
    getJackpotsData();
});
</script>

<style scoped></style>

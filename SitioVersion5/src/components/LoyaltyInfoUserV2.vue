<template>
    <p class="p-4 text-neutral text-xl font-semibold">Ser parte de Ecuabet <strong class="text-primary">siempre te da
            más para ganar</strong> </p>
    <div class="loyalty-bg w-[90%] backdrop-blur-sm bg-transparent/5 text-neutral rounded-3xl p-6 border border-accent-focus relative overflow-hidden"
        v-if="myloyalty" :class="currentLevel === 0 ? 'bg-gradient-to-b from-base-content to-base-300' : ''"
        :style="backgroundUrl ? { '--bg-url': `url(${backgroundUrl})` } : {}">
        <div v-if="currentLevel === 0" class="text-center py-10 px-4">
            <div>
                <p class="text-2xl font-bold text-accent mb-3">¡Tu camino empieza aquí!</p>

                <p class="text-neutral text-lg">
                    Para desbloquear el Nivel 1, revisa los requisitos y activa tu progreso.
                </p>

                <img src="https://images.virtualsoft.tech/ms/msj0212T1764195093.png"
                    class="w-[7rem] h-[7rem] p-4 place-self-center" alt="">
                <strong class="text-accent">¡Descúbrelos ahora y empieza a ganar beneficios!</strong>
            </div>
        </div>

        <div v-else>
            <!-- HEADER -->
            <div class="flex justify-between items-start">
                <div class="flex items-center mb-4 gap-2">
                    <div class="bg-primary rounded-full p-2 border-netral border-1">
                        <IconPerson class=" w-10 h-10 text-neutral-content" />
                    </div>
                    <div>
                        <p class="font-semibold text-lg">{{ appComponent.session.nombre }}</p>
                        <div class="bg-primary flex py-1 px-2 rounded-full">
                            <p class="text-black font-light text-sm">
                                <strong class="flex flex-col md:flex-row gap-1 md:gap-2">
                                    <span>{{ formattedInitialDate }} -</span>
                                    <span>{{ formattedExpirationDate }}</span>
                                </strong>
                            </p>
                            <!-- ÍCONO DE INFORMACIÓN -->
                            <div class="text-black px-1 relative"> <!-- quitar group del contenedor -->

                                <!-- ICONO envuelto en group -->
                                <div class="group inline-block cursor-pointer">
                                    <!-- TOOLTIP -->
                                    <div class="absolute left-1/2 -translate-x-1/2 top-7 w-64 rounded-xl bg-base-300 text-neutral p-3 text-sm shadow-lg
                   opacity-0 pointer-events-none
                   group-hover:opacity-100 z-10">
                                        Aquí puedes ver cuánto tiempo permaneces en tu nivel: desde la fecha en que lo
                                        alcanzaste hasta el día en que expiran los puntos que te ayudaron a conseguirlo.
                                    </div>

                                    <!-- ICON -->
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.5 12.75C8.74083 12.75 8.94271 12.6685 9.10563 12.5056C9.26854 12.3427 9.35 12.1408 9.35 11.9V8.5C9.35 8.25917 9.26854 8.05729 9.10563 7.89438C8.94271 7.73146 8.74083 7.65 8.5 7.65C8.25917 7.65 8.05729 7.73146 7.89438 7.89438C7.73146 8.05729 7.65 8.25917 7.65 8.5V11.9C7.65 12.1408 7.73146 12.3427 7.89438 12.5056C8.05729 12.6685 8.25917 12.75 8.5 12.75ZM8.5 5.95C8.74083 5.95 8.94271 5.86854 9.10563 5.70563C9.26854 5.54271 9.35 5.34083 9.35 5.1C9.35 4.85917 9.26854 4.65729 9.10563 4.49438C8.94271 4.33146 8.74083 4.25 8.5 4.25C8.25917 4.25 8.05729 4.33146 7.89438 4.49438C7.73146 4.65729 7.65 4.85917 7.65 5.1C7.65 5.34083 7.73146 5.54271 7.89438 5.70563C8.05729 5.86854 8.25917 5.95 8.5 5.95ZM8.5 17C7.32417 17 6.21917 16.7769 5.185 16.3306C4.15083 15.8844 3.25125 15.2788 2.48625 14.5138C1.72125 13.7488 1.11563 12.8492 0.669375 11.815C0.223125 10.7808 0 9.67583 0 8.5C0 7.32417 0.223125 6.21917 0.669375 5.185C1.11563 4.15083 1.72125 3.25125 2.48625 2.48625C3.25125 1.72125 4.15083 1.11563 5.185 0.669375C6.21917 0.223125 7.32417 0 8.5 0C9.67583 0 10.7808 0.223125 11.815 0.669375C12.8492 1.11563 13.7488 1.72125 14.5138 2.48625C15.2788 3.25125 15.8844 4.15083 16.3306 5.185C16.7769 6.21917 17 7.32417 17 8.5C17 9.67583 16.7769 10.7808 16.3306 11.815C15.8844 12.8492 15.2788 13.7488 14.5138 14.5138C13.7488 15.2788 12.8492 15.8844 11.815 16.3306C10.7808 16.7769 9.67583 17 8.5 17ZM8.5 15.3C10.3983 15.3 12.0063 14.6413 13.3238 13.3238C14.6413 12.0063 15.3 10.3983 15.3 8.5C15.3 6.60167 14.6413 4.99375 13.3238 3.67625C12.0063 2.35875 10.3983 1.7 8.5 1.7C6.60167 1.7 4.99375 2.35875 3.67625 3.67625C2.35875 4.99375 1.7 6.60167 1.7 8.5C1.7 10.3983 2.35875 12.0063 3.67625 13.3238C4.99375 14.6413 6.60167 15.3 8.5 15.3Z"
                                            fill="currentColor" />
                                    </svg>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="p-2 justify-items-center">
                    <p class="text-sm font-thin text-neutral text-center">
                        PUNTOS ACOMULADOS
                    </p>
                    <p class="font-bold text-4xl">{{ myloyalty.pointsQualifying }}</p>
                </div>
            </div>
            <div class="flex w-full justify-between mt-4">

                <!-- NIVEL ACTUAL -->
                <div>
                    <p class="text-sm">TU NIVEL</p>
                    <div class="flex bg-base-400 border-primary border-1 items-center p-2 rounded-full">
                        <div
                            class="p-[1px] rounded-full bg-gradient-to-b mr-2 from-neutral via-transparent to-neutral aspect-square">
                            <img :src="currentLevelImage"
                                class="w-5 h-5 bg-base-400 object-contain rounded-full aspect-square" alt="">
                        </div>
                        <p class="font-semibold text-neutral">
                            {{ currentLevelName }}
                        </p>
                    </div>
                </div>

                <!-- SIGUIENTE NIVEL -->
                <div v-if="isMaxLevel">
                    <div class="flex bg-base-400 border-primary border-1 items-center p-2 rounded-full">
                        <p class="font-semibold text-neutral flex gap-2">
                            <img class="w-5 h-5" src="https://images.virtualsoft.tech/ms/msj0212T1764712046.png" alt="">
                            Meta alcanzada
                        </p>
                    </div>
                </div>
                <div v-if="!isMaxLevel">
                    <p class="text-sm">PRÓXIMO NIVEL</p>
                    <div class="flex bg-base-400 items-center p-2 rounded-full">

                        <div
                            class="p-[1px] rounded-full bg-gradient-to-b mr-2 from-neutral via-transparent to-neutral aspect-square">
                            <img :src="nextLevelImage"
                                class="w-5 h-5 bg-base-400 object-contain rounded-full aspect-square" alt="">
                        </div>
                        <p class="font-semibold text-neutral">
                            {{ nextLevelName }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- NIVELES -->
            <div class="flex w-full">
                <!-- PROGRESO -->
                <div class="w-full px-4 content-center my-4">
                    <div class="relative w-full bg-accent-focus h-3 rounded-full mt-6">

                        <!-- RELLENO DE PROGRESO -->
                        <div class="bg-success h-3 rounded-full" :style="{ width: progressPercent + '%' }"></div>

                        <!-- INDICADOR DE PUNTOS MÍNIMOS PARA MANTENER NIVEL -->
                        <div class="absolute -top-10 flex flex-col text-neutral text-sm leading-tight pointer-events-none w-max"
                            :style="{
                                left: maintainPercent + '%',
                                transform:
                                    maintainPercent >= 90
                                        ? 'translateX(-100%)'
                                        : maintainPercent <= 10
                                            ? 'translateX(0%)'
                                            : 'translateX(-50%)',
                                textAlign: maintainPercent >= 90 ? 'right' : 'center',
                            }" :class="{
                                'items-center': maintainPercent < 90,
                                'items-end': maintainPercent >= 90,
                            }">
                            <p class="leading-tight text-neutral mb-1">
                                <strong class="text-neutral">{{ pointsToMaintainLevel }}</strong>
                            </p>

                            <div class="w-5 h-8 bg-warning rounded-full border-4 border-neutral"></div>
                            <!-- ICONO -->
                            <p class="text-[10px] leading-tight text-neutral">
                                Meta para mantener el nivel: <strong class="">{{ currentLevelName }}</strong>
                            </p>


                        </div>

                    </div>

                    <p v-if="!isMaxLevel" class="mt-12 text-end hidden md:block">
                        Te faltan <strong class="">{{ pointsNextLevel }}</strong> puntos para el nivel:
                        <strong>{{ nextLevel }}</strong>
                    </p>
                </div>
            </div>
            <p class="mt-12 text-center  md:hidden">
                Te faltan <strong class="">{{ pointsNextLevel }}</strong> puntos para el nivel:
                <strong>{{ nextLevel }}</strong>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppcomponentStore } from '@/stores/AppComponent';
import IconPerson from "./icons/IconPerson.vue";
const appComponent = useAppcomponentStore().appComponent;

// Props
const props = defineProps({
    loyalty: { type: Object, required: true },      // API: getLoyaltyLevels
    myloyalty: { type: Object, required: true }     // API: my_loyalty
});


const validLevels = computed(() => {
    return Object.entries(props.loyalty)
        .filter(([key]) => key.startsWith("Level"))
        .map(([key, value]) => ({
            level: Number(key.replace("Level", "")),
            points: Number(value)
        }))
        .filter(l => l.level >= 1 && l.level <= 6)
        .filter(l => l.points > 0)
        .sort((a, b) => a.level - b.level);
});

const currentLevel = computed(() => props.myloyalty?.level ?? 0);

const pointsToMaintainLevel = computed(() => {
    return props.loyalty[`Level${currentLevel.value}`] ?? 0;
});
const nextLevel = computed(() => currentLevel.value + 1);
const backgroundUrl = computed(() => {
    const lvl = currentLevel.value;
    if (!lvl) return "";

    const bg = appComponent?.config?.loyaltyProgramView?.backgraundsLeves?.[`level${lvl}`];

    return bg || "";
});
const maintainPercent = computed(() => {
    if (isMaxLevel.value) return 100;
    const min = props.loyalty[`Level${currentLevel.value}`] ?? 0;
    const max = props.loyalty[`Level${nextLevel.value}`] ?? 0;
    if (!max) return 0;
    return (min / max) * 100;
});

const progressPercent = computed(() => {
    const pts = Number(props.myloyalty?.pointsQualifying ?? 0);
    const min = Number(pointsToMaintainLevel.value ?? 0);

    // Si es el último nivel, comparamos contra puntos mínimos para mantener
    if (isMaxLevel.value) {
        if (!min) return 0;
        return Math.min(100, Math.max(0, (pts / min) * 100));
    }

    // Caso normal para niveles intermedios
    const max = props.loyalty[`Level${nextLevel.value}`] ?? 0;
    if (!max) return 0;

    return Math.min(100, Math.max(0, (pts / max) * 100));
});

// -------------------------------------------
// IMÁGENES Y CONFIG
// -------------------------------------------
const levelSettings = computed(() => {
    return appComponent?.config?.loyalty_levels_settings || [];
});

const levelWord = (n) => {
    const map = ["One", "Two", "Three", "Four", "Five", "Six"];
    return map[n - 1];
};

const currentLevelImage = computed(() => {
    const n = currentLevel.value;
    if (!n) return "";
    const settings = levelSettings.value[n - 1];
    return settings?.[`ImageLevel${levelWord(n)}`] || "";
});

const currentLevelName = computed(() => {
    const n = currentLevel.value;
    if (!n) return "";
    const settings = levelSettings.value[n - 1];
    return settings?.[`NameLevel${levelWord(n)}`] || "";
});

const nextLevelImage = computed(() => {
    if (isMaxLevel.value) return "";
    const n = nextLevel.value;
    const settings = levelSettings.value[n - 1];
    return settings?.[`ImageLevel${levelWord(n)}`] || "";
});

const nextLevelName = computed(() => {
    if (isMaxLevel.value) return "";
    const n = nextLevel.value;
    const settings = levelSettings.value[n - 1];
    return settings?.[`NameLevel${levelWord(n)}`] || "";
});

const pointsNextLevel = computed(() => {
    if (isMaxLevel.value) return 0;
    const next = props.loyalty[`Level${nextLevel.value}`];
    return next ? next - props.myloyalty.pointsQualifying : 0;
});
const formattedInitialDate = computed(() => {
    if (!props.myloyalty?.initialDate) return "";
    return props.myloyalty.initialDate.split(" ")[0].replace(/-/g, "/");
});

const formattedExpirationDate = computed(() => {
    if (!props.myloyalty?.levelExpirationDate) return "";
    return props.myloyalty.levelExpirationDate.split(" ")[0].replace(/-/g, "/");
});

const isMaxLevel = computed(() => {
    return nextLevel.value > levelSettings.value.length;
});

</script>
<style scoped>
.loyalty-bg::before {
    content: "";
    position: absolute;
    inset: 0;

    /* Imagen dinámica desde la variable CSS */
    background-image: var(--bg-url);
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;

    /* Gradiente para difuminar transparente → imagen */
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    mask-repeat: no-repeat;
    mask-position: left center;

    opacity: 0.8;
    /* Ajusta la opacidad de la imagen */

    z-index: -1;
}
</style>

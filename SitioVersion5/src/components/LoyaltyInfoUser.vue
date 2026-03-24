<template>
    <div class="w-[90%] backdrop-blur-sm bg-transparent/5 text-neutral rounded-3xl p-6 border border-neutral"
        v-if="myloyalty">
        <div v-if="currentLevel === 0" class="text-center py-10 px-4">
            <p class="text-2xl font-bold text-accent mb-3">¡Tu camino empieza aquí!</p>
            <p class="text-neutral text-lg mb-4">
                Para desbloquear el Nivel 1, revisa los requisitos y activa tu progreso.
                <br>
            <div
                class="p-[1px] rounded-full bg-gradient-to-b from-neutral via-transparent to-neutral aspect-square place-self-center mb-4">
                <img src="https://images.virtualsoft.tech/ms/msj0212T1764185303.png"
                    class="w-[7rem] h-[7rem] p-4 object-contain rounded-full bg-neutral-content aspect-square" alt="">
            </div>

            <strong class="text-accent ">¡Descúbrelos ahora y empieza a ganar beneficios!</strong>
            </p>
        </div>
        <div v-else>
            <!-- HEADER -->
            <div class="flex justify-between items-start">
                <div class="flex items-center">
                    <img class="bg-base-300 rounded-full p-2 mr-2"
                        src="https://images.virtualsoft.tech/ms/msj0212T1763676228.png" alt="">
                    <div>
                        <p class="font-semibold text-lg">{{ appComponent.session.nombre }}</p>
                        <p class="">Nivel del jugador</p>
                    </div>
                </div>
                <!-- CONTADOR EXPIRACIÓN -->
                <div class="relative mt-6 bg-base-200 rounded-xl p-3 hidden md:block pr-10">

                    <!-- ÍCONO DE INFORMACIÓN -->
                    <div class="absolute top-2 right-2">
                        <div class="group relative cursor-pointer">

                            <!-- TOOLTIP -->
                            <div class="absolute left-1/2 -translate-x-1/2 bottom-8
                w-64 rounded-xl bg-base-300 text-neutral p-3 text-sm shadow-lg
                opacity-0 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-[-4px] z-10">
                                Aquí puedes ver cuánto tiempo permaneces en tu nivel: desde la fecha en que lo
                                alcanzaste
                                hasta el día en que expiran los puntos que te ayudaron a conseguirlo.
                            </div>

                            <!-- ICONO -->
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.5 12.75C8.74083 12.75 8.94271 12.6685 9.10563 12.5056C9.26854 12.3427 9.35 12.1408 9.35 11.9V8.5C9.35 8.25917 9.26854 8.05729 9.10563 7.89438C8.94271 7.73146 8.74083 7.65 8.5 7.65C8.25917 7.65 8.05729 7.73146 7.89438 7.89438C7.73146 8.05729 7.65 8.25917 7.65 8.5V11.9C7.65 12.1408 7.73146 12.3427 7.89438 12.5056C8.05729 12.6685 8.25917 12.75 8.5 12.75ZM8.5 5.95C8.74083 5.95 8.94271 5.86854 9.10563 5.70563C9.26854 5.54271 9.35 5.34083 9.35 5.1C9.35 4.85917 9.26854 4.65729 9.10563 4.49438C8.94271 4.33146 8.74083 4.25 8.5 4.25C8.25917 4.25 8.05729 4.33146 7.89438 4.49438C7.73146 4.65729 7.65 4.85917 7.65 5.1C7.65 5.34083 7.73146 5.54271 7.89438 5.70563C8.05729 5.86854 8.25917 5.95 8.5 5.95ZM8.5 17C7.32417 17 6.21917 16.7769 5.185 16.3306C4.15083 15.8844 3.25125 15.2788 2.48625 14.5138C1.72125 13.7488 1.11563 12.8492 0.669375 11.815C0.223125 10.7808 0 9.67583 0 8.5C0 7.32417 0.223125 6.21917 0.669375 5.185C1.11563 4.15083 1.72125 3.25125 2.48625 2.48625C3.25125 1.72125 4.15083 1.11563 5.185 0.669375C6.21917 0.223125 7.32417 0 8.5 0C9.67583 0 10.7808 0.223125 11.815 0.669375C12.8492 1.11563 13.7488 1.72125 14.5138 2.48625C15.2788 3.25125 15.8844 4.15083 16.3306 5.185C16.7769 6.21917 17 7.32417 17 8.5C17 9.67583 16.7769 10.7808 16.3306 11.815C15.8844 12.8492 15.2788 13.7488 14.5138 14.5138C13.7488 15.2788 12.8492 15.8844 11.815 16.3306C10.7808 16.7769 9.67583 17 8.5 17ZM8.5 15.3C10.3983 15.3 12.0063 14.6413 13.3238 13.3238C14.6413 12.0063 15.3 10.3983 15.3 8.5C15.3 6.60167 14.6413 4.99375 13.3238 3.67625C12.0063 2.35875 10.3983 1.7 8.5 1.7C6.60167 1.7 4.99375 2.35875 3.67625 3.67625C2.35875 4.99375 1.7 6.60167 1.7 8.5C1.7 10.3983 2.35875 12.0063 3.67625 13.3238C4.99375 14.6413 6.60167 15.3 8.5 15.3Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                    </div>


                    <vue-countdown :time="expirationMs" v-slot="{ days, hours, minutes }">
                        <div class="grid grid-cols-3 text-center text-neutral font-semibold">
                            <div>
                                <p>Días</p>
                                {{ days }}
                            </div>
                            <div>
                                <p>Horas</p>
                                {{ hours }}
                            </div>
                            <div>
                                <p>Minutos</p>
                                {{ minutes }}
                            </div>
                        </div>
                    </vue-countdown>
                </div>


                <div class="text-right bg-base-200 border-b border-accent p-2 rounded-xl">
                    <p class="text-xl text-neutral font-bold">
                        Tus puntos: {{ myloyalty.pointsQualifying }}
                    </p>
                </div>
            </div>
            <!-- CONTADOR EXPIRACIÓN -->
            <div class="mt-6 bg-base-200 rounded-xl p-3  md:hidden">
                <vue-countdown :time="expirationMs" v-slot="{ days, hours, minutes }">
                    <div class="grid grid-cols-3 text-center text-neutral font-semibold">
                        <div>
                            <p>Días</p>
                            {{ days }}
                        </div>
                        <div>
                            <p>Horas</p>
                            {{ hours }}
                        </div>
                        <div>
                            <p>Minutos</p>
                            {{ minutes }}
                        </div>
                    </div>
                </vue-countdown>
            </div>
            <!-- NIVELES -->
            <div class="flex w-full justify-between mt-6">

                <!-- NIVEL ACTUAL -->
                <div class="flex flex-col items-center">
                    <div
                        class="p-[1px] rounded-full bg-gradient-to-b from-neutral via-transparent to-neutral aspect-square">
                        <img :src="currentLevelImage"
                            class="w-20 h-20 object-contain rounded-full bg-base-200 aspect-square" alt="">
                    </div>
                    <p class="text-accent mt-2">
                        Nv. {{ currentLevel }}
                    </p>

                    <p class="font-semibold text-lg text-neutral">
                        {{ currentLevelName }}
                    </p>
                </div>
                <!-- PROGRESO -->
                <div class="w-full px-4 content-center">
                    <div class="relative w-full bg-accent-focus h-3 rounded-full mt-6">

                        <!-- INDICADOR DE PUNTOS MÍNIMOS PARA MANTENER NIVEL -->
                        <div class="absolute -top-12 flex flex-col text-neutral text-sm leading-tight pointer-events-none w-max"
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
                            <p class="mb-1">
                                Meta para mantener <br> el nivel:
                                <strong class="text-accent">{{ currentLevelName }}</strong>
                            </p>

                            <img :src="appComponent.config.loyaltyProgramView.currencyIcon"
                                class="w-6 h-6 bg-neutral rounded-full border-base-100 border-3" />

                            <p class="mb-1">
                                <strong class="text-neutral">{{ pointsToMaintainLevel }}</strong>
                            </p>
                        </div>



                        <!-- RELLENO DE PROGRESO -->
                        <div class="bg-secondary h-3 rounded-full" :style="{ width: progressPercent + '%' }"></div>

                    </div>

                    <p v-if="!isMaxLevel" class="mt-8 text-end hidden md:block">
                        Te faltan <strong class="text-accent">{{ pointsNextLevel }}</strong> puntos para el nivel:
                        <strong>{{ nextLevel }}</strong>
                    </p>
                </div>
                <!-- SIGUIENTE NIVEL -->
                <div v-if="!isMaxLevel" class="flex flex-col items-center">
                    <div
                        class="p-[1px] rounded-full bg-gradient-to-b from-neutral via-transparent to-neutral aspect-square">
                        <img :src="nextLevelImage"
                            class="w-20 h-20 object-contain rounded-full bg-base-200 aspect-square" alt="">
                    </div>

                    <p class="text-accent mt-2">
                        Nv. {{ nextLevel }}
                    </p>
                    <p class="font-semibold text-lg text-neutral">
                        {{ nextLevelName }}
                    </p>
                </div>
                <div v-if="isMaxLevel" class="flex flex-col items-center">
                    <div
                        class="p-[1px] rounded-full bg-gradient-to-b from-neutral via-transparent to-neutral aspect-square">
                        <img src="https://images.virtualsoft.tech/ms/msj0212T1764712046.png"
                            class="w-20 h-20 object-contain rounded-full bg-base-200 aspect-square" alt="">
                    </div>
                    <p class="text-accent text-center mt-2">
                       Meta alcanzada
                    </p>
                </div>

            </div>
            <p class="mt-3 text-center  md:hidden">
                Te faltan <strong class="text-accent">{{ pointsNextLevel }}</strong> puntos para el nivel:
                <strong>{{ nextLevel }}</strong>
            </p>
        </div>
    </div>
</template>

<script setup>// Start of the Vue single-file component's <script setup> block
import { ref, computed, onMounted } from "vue"; // Import Vue composition API helpers: ref, computed, onMounted
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import a Pinia (or similar) store composable for app component data

const appComponent = useAppcomponentStore().appComponent; // Get the `appComponent` state or property from the store instance

const props = defineProps({ // Define the component's props using the <script setup> helper
    loyalty: { type: Object, required: true }, // `loyalty` prop: an Object and required
    myloyalty: { type: Object, required: true } // `myloyalty` prop: an Object and required
});

const currentLevel = computed(() => props.myloyalty?.level ?? 0);

const pointsToMaintainLevel = computed(() => { // Computed property for points required to maintain the current level
    return props.loyalty[`Level${currentLevel.value}`] ?? 0; // Return the points threshold for the current level or 0 if undefined
});
const maintainPercent = computed(() => {
    if (isMaxLevel.value) return 100;
    const min = props.loyalty[`Level${currentLevel.value}`] ?? 0; // `min` is the points threshold for current level or 0
    const max = props.loyalty[`Level${nextLevel.value}`] ?? 0; // `max` is the points threshold for next level or 0

    if (!max) return 0; // If there is no next level threshold, return 0 to avoid division by zero
    return (min / max) * 100; // Return the ratio of min to max as a percentage
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


const nextLevel = computed(() => currentLevel.value + 1); // Computed property for the next level number (current + 1)

const levelSettings = computed(() => { // Computed property to retrieve level settings from the app component configuration
    return appComponent?.config?.loyalty_levels_settings || []; // Return settings array or empty array if not present
});

const levelWord = (n) => { // Helper function that maps a numeric level to a word (1 -> "One", 2 -> "Two", etc.)
    const map = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]; // Array of words for levels 1-10
    return map[n - 1]; // Return the corresponding word for the given level number (`n - 1` for zero-based index)
};

const currentLevelImage = computed(() => { // Computed property that returns the image URL for the current level
    const n = currentLevel.value; // Current numeric level
    if (!n) return ""; // If level is falsy (e.g., 0), return empty string
    const settings = levelSettings.value[n - 1]; // Get the settings object for the current level (indexing into settings array)
    return settings?.[`ImageLevel${levelWord(n)}`] || ""; // Return the configured image field or empty string if missing
});

const currentLevelName = computed(() => { // Computed property that returns the display name for the current level
    const n = currentLevel.value; // Current numeric level
    if (!n) return ""; // If no level, return empty string
    const settings = levelSettings.value[n - 1]; // Get level settings for current level
    return settings?.[`NameLevel${levelWord(n)}`] || ""; // Return the configured name field or empty string if missing
});
const nextLevelImage = computed(() => {
    if (isMaxLevel.value) return "";
    const n = nextLevel.value;
    const settings = levelSettings.value[n - 1]; // Get settings for the next level
    return settings?.[`ImageLevel${levelWord(n)}`] || ""; // Return the configured next-level image or empty string
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

const expirationMs = computed(() => { // Computed property that returns milliseconds remaining until level expiration
    if (!props.myloyalty
        ?.levelExpirationDate) return 0; // If `levelExpirationDate` is missing, return 0

    const fixed = props.myloyalty
        .levelExpirationDate.replace(
            /(\d{2})-(\d{2})-(\d{4})/,
            "$2/$1/$3"
        ); // Reformat a date string from "DD-MM-YYYY" to "MM/DD/YYYY" to satisfy `Date` parsing in JS
    return new Date(fixed).getTime() - Date.now(); // Return the difference between the parsed expiration date and current time in milliseconds
});
const isMaxLevel = computed(() => {
    return nextLevel.value > levelSettings.value.length;
});

</script>
<style>
.gradient-ring {
    width: 100px;
    height: 100px;
    padding: 4px;
    /* espacio para que el borde se vea */
    border-radius: 50%;
    background:
        conic-gradient(white, var(--base-200), white, var(--base-200), white) border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #10141a;
    /* fondo interno igual al tuyo */
    padding: 10px;
    /* evita que la imagen tape el borde */
    object-fit: contain;
}
</style>
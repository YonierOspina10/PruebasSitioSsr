<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import CloseIcon from '../icons/CloseIcon.vue'; // Importing CloseIcon component
import AndroidIcon from '../icons/AndroidIcon.vue'; // Importing AndroidIcon component

export default defineComponent({
    components: {
        CloseIcon, // Registering CloseIcon component
        AndroidIcon, // Registering AndroidIcon component
    },
    data() {
        // Data function returning component state
        let appComponent: any = this.$appComponent; // Reference to the app component
        let refreshBalance = this.$refreshBalance; // Reference to the refresh balance method
        let showBar: boolean = true; // State variable to control visibility of a bar
        return {
            appComponent, // Exposing appComponent to the template
            refreshBalance, // Exposing refreshBalance to the template
            showBar, // Exposing showBar to the template
        };
    },
});
</script>
<template>
    <!-- Main container for the download bar, shown conditionally based on 'showBar' -->
    <div
        class="bg-primary-content hover:opacity-95 flex justify-start items-center flex-row shadow-[inset_0px_-15px_13px] shadow-neutral-content/25"
        v-if="showBar"
    >
        <!-- Router link to the app landing page with icon and text -->
        <RouterLink
            to="/landing/app"
            class="flex justify-center items-center w-full h-full p-2"
        >
            <AndroidIcon class="w-8 h-8 mr-auto" />
            <span class="text-neutral uppercase mr-auto font-bold">{{ $t('Descargar App') }}</span>
        </RouterLink>
        <!-- Button to close the download bar -->
        <button
            aria-label="Close bar download"
            @click="() => (showBar = !showBar)"
            class="cursor-pointer hover:scale-90 transition hover:opacity-80 p-2"
        >
            <CloseIcon class="fill-neutral w-8 h-8" />
        </button>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

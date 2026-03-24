<script lang="ts">
import { defineComponent, computed, ref } from 'vue'; // Import necessary Vue functions
import { useAppComponent } from '../composables/useAppComponent'; // Import custom composable for app component logic
import ContingencyAlert from '../components/ContingencyAlert.vue'; // Import ContingencyAlert component
import ContingencyView from '../views/ContingencyView.vue'; // Import ContingencyView component
import AppFooter from '../components/footers/footers/Footer8.vue'; // Import AppFooter component
import CustomHeaderMobile from '../components/headers/customHeaderMobile.vue'; // Import mobile header component
import CustomHeaderDesktop from '../components/headers/customHeaderDesktop.vue'; // Import desktop header component
import CentribalChat from '../components/chat/ChatCentribal.vue'; // Import CentribalChat component
import { useGeneralStore } from '../stores/general'; // Import general store for state management

const topBar = () => import('../components/topBar/topBarDownload.vue'); // Lazy load topBar component

export default defineComponent({
    name: 'Layout8', // Define the component name
    components: {
        CustomHeaderDesktop, // Register desktop header component
        CustomHeaderMobile, // Register mobile header component
        ContingencyView, // Register contingency view component
        ContingencyAlert, // Register contingency alert component
        topBar, // Register topBar component
        AppFooter, // Register app footer component
        CentribalChat, // Register CentribalChat component
    },
    data() {
        const topView: boolean = ref(false); // Reactive reference for top view state
        return {
            topView, // Return top view state
        };
    },
    setup() {
        const { appComponent, background } = useAppComponent(); // Destructure app component and background from composable
        const isVisibleJackpot = computed(() => useGeneralStore().isComponentActive); // Computed property for jackpot visibility
        const backgroundImage = computed(() => {
            if (background.value && background.value != '') { // Check if background value is set
                if (background.value.includes('http')) { // If background is a URL
                    return background.value; // Return the URL
                }
                return new URL(`../assets/images/${background.value}`, import.meta.url).href; // Construct URL for local image
            }
            return ''; // Return empty string if no background
        });
        const showTopBar = computed(() => {
            const headerConfig = appComponent.config.header_; // Get header configuration
            const showDownloadApp =
                headerConfig?.dowload_app ?? appComponent.config.header?.showDownloadApp?.[appComponent.country]; // Determine if download app should be shown
            return !!showDownloadApp; // Return boolean value
        });
        return {
            appComponent, // Return app component
            backgroundImage, // Return computed background image
            showTopBar, // Return computed top bar visibility
            isVisibleJackpot, // Return computed jackpot visibility
        };
    },
});
</script>

<template>
    <div class="bg-cover bg-center bg-base-content"> <!-- Main container with background cover and center alignment -->
        <topBar v-if="showTopBar" /> <!-- Conditionally render topBar if showTopBar is true -->
        <ContingencyAlert
            v-if="appComponent.contingency"
            class="top-[55px] left-0 lg:top-0"
        />
        <div class="inset-x-0 top-0 z-[150] w-full h-auto sticky general-container py-0"> <!-- Sticky container for headers -->
            <CustomHeaderMobile /> <!-- Render mobile header -->
            <customHeaderDesktop /> <!-- Render desktop header -->
        </div>
        <!-- Section for main content -->
        <section
            class="relative"
            :class="isVisibleJackpot ? 'top-[55px] sm:top-[55px] lg:top-[100px]' : 'top-[55px] sm:top-[100px]'"
        >
            <RouterView /> <!-- Render router view for nested routes -->
            <AppFooter /> <!-- Render app footer -->
        </section>
    </div>
    <!-- Conditionally render CentribalChat based on zendesk configuration -->
    <CentribalChat
        v-if="
            appComponent.config.zendesk !== undefined &&
            appComponent.config.zendesk[appComponent.country] !== undefined &&
            appComponent.config.zendesk[appComponent.country].name !== undefined &&
            appComponent.config.zendesk[appComponent.country].name === 'centribal'
        "
    />
</template>

<!-- FILE DOCUMENTED -->

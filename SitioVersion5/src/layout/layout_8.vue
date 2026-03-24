<script lang="ts">
import { defineComponent, computed } from 'vue'; // Import necessary functions from Vue
import { useAppComponent } from '@/composables/useAppComponent'; // Import custom composable for app component state
import Footer8 from '@/components/footers/Footer8.vue'; // Import footer component
import HeaderDesktopMobile3 from '@/components/headers/HeaderDesktopMobile3.vue'; // Import mobile/desktop header component
import HeaderDesktop3 from '@/components/headers/HeaderDesktop3.vue'; // Import desktop header component
import CentribalChat from '@/components/ChatCentribal.vue'; // Import chat component
import { useGeneralStore } from '@/stores/general'; // Import general store for state management
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Import contingency alert component
import ContingencyView from '@/views/ContingencyView.vue'; // Import contingency view component

export default defineComponent({
    name: 'Layout8', // Define the name of the component
    components: {
        ContingencyAlert, // Register contingency alert component
        ContingencyView, // Register contingency view component
        HeaderDesktop3, // Register desktop header component
        HeaderDesktopMobile3, // Register mobile/desktop header component
        Footer8, // Register footer component
        CentribalChat, // Register chat component
    },
    setup() {
        const isVisibleJackpot = computed(() => useGeneralStore().isComponentActive); // Compute visibility of jackpot based on store state
        const { appComponent, background } = useAppComponent(); // Destructure app component and background from composable
        const backgroundImage = computed(() => {
            if (background.value && background.value != '') { // Check if background value is set
                if (background.value.includes('http')) { // If background is a URL
                    return background.value; // Return the URL
                }
                return new URL(`../assets/images/${background.value}`, import.meta.url).href; // Construct URL for local asset
            }
            return ''; // Return empty string if no background
        });
        return {
            appComponent, // Expose app component to template
            backgroundImage, // Expose computed background image to template
            isVisibleJackpot, // Expose computed jackpot visibility to template
        };
    }
});
</script>

<template>
    <!-- Main container with background cover and center alignment -->
    <div class="bg-cover bg-center bg-base-content">
        <!-- Show alert if contingency is active -->
        <ContingencyAlert
            v-if="appComponent.contingency"
            class="top-[55px] left-0 lg:top-0"
        />
        <!-- Conditional rendering based on current view -->
        <header-desktop-mobile3
            v-if="
                appComponent.viewActual != '/banner-right' &&
                appComponent.viewActual != '/banner-left' &&
                appComponent.viewActual != '/banner-rightnl' &&
                appComponent.viewActual != '/banner-leftnl' &&
                appComponent.viewActual != '/banner-topcenternl' &&
                appComponent.viewActual != '/banner-topcenter'
            "
        />
        <!-- Conditional rendering based on current view -->
        <header-desktop3
            v-if="
                appComponent.viewActual != '/banner-right' &&
                appComponent.viewActual != '/banner-left' &&
                appComponent.viewActual != '/banner-rightnl' &&
                appComponent.viewActual != '/banner-leftnl' &&
                appComponent.viewActual != '/banner-topcenternl' &&
                appComponent.viewActual != '/banner-topcenter'
            "
        />
        <!-- Section for main content with relative positioning -->
        <section
            class="relative text-neutral-content bg-base-content"
            :class="isVisibleJackpot ? 'top-[50px] sm:top-[55px] lg:top-[100px]' : 'top-[55px] sm:top-[140px]'"
        >
        <!-- Show contingency view based on route path and contingency state -->
            <ContingencyView
                v-if="
                    appComponent.contingency &&
                    ($route.path.includes('new-casino') ||
                        $route.path.includes('casino') ||
                        $route.path.includes('registro') ||
                        $route.path.includes('lobby') ||
                        $route.path.includes('torneos') ||
                        $route.path.includes('shop') ||
                        $route.path.includes('sorteos') ||
                        $route.path.includes('trabaja') ||
                        $route.path.includes('bingos'))
                "
                class="py-8"
            />
            <RouterView v-else/> <!-- Default router view if no contingency view -->
            <Footer8 /> <!-- Footer component -->
        </section>
    </div>
    <!-- Show chat component based on Zendesk configuration -->
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

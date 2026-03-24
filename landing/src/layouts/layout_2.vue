<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'; // Import Vue functions for component definition
import ContingencyAlert from '@/components/ContingencyAlert.vue'; // Import ContingencyAlert component
import ContingencyView from '@/views/ContingencyView.vue'; // Import ContingencyView view

export default defineComponent({
    components: {
        ContingencyView, // Register ContingencyView component
        ContingencyAlert, // Register ContingencyAlert component
        topBar: defineAsyncComponent(
            // Define topBar as an asynchronously loaded component
            () => import('../components/topBar/topBarDownload.vue'), // Lazy load topBar component
        ),
        AppHeaderDesktop: defineAsyncComponent(
            // Define AppHeaderDesktop as an asynchronously loaded component
            () => import('../components/headers/headersDesktop/HeaderDesktop2.vue'), // Lazy load desktop header component
        ),
        AppHeaderMobile: defineAsyncComponent(
            // Define AppHeaderMobile as an asynchronously loaded component
            () => import('../components/headers/headersMobile/HeaderMobile.vue'), // Lazy load mobile header component
        ),
        AppFooter: defineAsyncComponent(
            // Define AppFooter as an asynchronously loaded component
            () => import('../components/footers/footers/Footer2.vue'), // Lazy load footer component
        ),
    },
    data() {
        let appComponent: any = this.$appComponent; // Access appComponent from the Vue instance
        let background: any = // Determine background based on appComponent properties
            appComponent.mobile && appComponent.config.backgroundMobileDefault != undefined
                ? appComponent.config.backgroundMobileDefault // Use mobile background if applicable
                : !appComponent.mobile && appComponent.config.backgroundDefault != undefined
                  ? appComponent.config.backgroundDefault // Use default background if applicable
                  : ''; // Fallback to an empty string if no background is set
        return {
            appComponent, // Return appComponent for use in the template
            background, // Return background for use in the template
        };
    },
    mounted() {
        let appComponent: any = this.$appComponent; // Access appComponent when the component is mounted
    },
    methods: {
        getImg() {
            // Method to get the image URL based on the background property
            if (this.background.includes('http'))
                return this.background; // Return the background if it's a valid URL
            else
                return new URL(`../assets/images/${this.background}`, import.meta.url).href; // Construct URL for local image // Return the constructed URL
        },
    },
});
</script>
<template>
    <!-- Main container for the application with background styling -->
    <div class="bg-cover bg-center bg-base-content">
        <!-- Conditional rendering of the top bar based on app configuration -->
        <topBar
            v-if="
                appComponent.config.header_ != undefined && appComponent.config.header_.dowload_app != undefined
                    ? appComponent.config.header_.dowload_app
                    : appComponent.config.header != undefined &&
                      appComponent.config.header.showDownloadApp != undefined &&
                      appComponent.config.header.showDownloadApp[appComponent.country] != undefined &&
                      appComponent.config.header.showDownloadApp[appComponent.country]
            "
        />
        <!-- Conditional rendering of a contingency alert -->
        <ContingencyAlert v-if="appComponent.contingency" />
        <!-- Mobile header component -->
        <AppHeaderMobile />
        <!-- Desktop header component -->
        <AppHeaderDesktop />
        <!-- Main content area for routing views -->
        <RouterView />
    </div>
    <!-- Footer component for the application -->
    <AppFooter />
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

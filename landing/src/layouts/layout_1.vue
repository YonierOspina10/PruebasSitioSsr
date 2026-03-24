<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import ContingencyView from '@/views/ContingencyView.vue';

/**
 * Default export of the component definition.
 */
export default defineComponent({
    components: {
        // Synchronously imported component
        ContingencyView,

        // Asynchronously imported components
        topBar: defineAsyncComponent(() => import('../components/topBar/topBarDownload.vue')),
        AppHeaderDesktop: defineAsyncComponent(() => import('../components/headers/headersDesktop/HeaderDesktop.vue')),
        ContingencyAlert: defineAsyncComponent(() => import('@/components/ContingencyAlert.vue')),
        AppHeaderMobile: defineAsyncComponent(() => import('../components/headers/headersMobile/HeaderMobile.vue')),
        AppFooter: defineAsyncComponent(() => import('../components/footers/footers/Footer2.vue')),
    },

    /**
     * Data function returning component's reactive state.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let background: any =
            appComponent.mobile && appComponent.config.backgroundMobileDefault != undefined
                ? appComponent.config.backgroundMobileDefault // Mobile background
                : !appComponent.mobile && appComponent.config.backgroundDefault != undefined
                  ? !appComponent.mobile && appComponent.config.backgroundDefault // Desktop background
                  : '';

        return {
            appComponent,
            background,
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {},

    methods: {
        /**
         * Returns the image URL based on the background property.
         * @returns {string} The URL of the background image.
         */
        getImg() {
            if (this.background.includes('http'))
                return this.background; // Return URL if it's an absolute path
            else return new URL(`../assets/images/${this.background}`, import.meta.url).href; // Construct URL for relative path
        },
    },
});
</script>
<template>
    <!-- Main container for the background and layout -->
    <div class="bg-cover bg-center">
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
        <!-- Mobile header component -->
        <AppHeaderMobile />
        <!-- Alert for contingency situations -->
        <ContingencyAlert v-if="appComponent.contingency" />
        <!-- Desktop header component -->
        <AppHeaderDesktop />
        <!-- Contingency view displayed based on routing conditions -->
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
                    $route.path.includes('trabaja'))
            "
            class="py-8"
        />
        <!-- Router view for displaying routed components -->
        <RouterView v-else />
    </div>
    <!-- Footer component of the application -->
    <AppFooter />
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

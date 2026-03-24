<script>
import { defineComponent, defineAsyncComponent } from 'vue';

/**
 * Default export of the Vue component.
 */
export default defineComponent({
    components: {
        /**
         * Asynchronously loads the top bar download component.
         */
        ApptopBarDownload: defineAsyncComponent(() => import('../components/topBar/topBarDownload.vue')),
        /**
         * Asynchronously loads the desktop header version 5 component.
         */
        AppHeaderDesktopv5: defineAsyncComponent(
            () => import('../components/headers/headersDesktop/HeaderDesktopv5.vue'),
        ),
        /**
         * Asynchronously loads the contingency alert component.
         */
        ContingencyAlert: defineAsyncComponent(() => import('@/components/ContingencyAlert.vue')),
        /**
         * Asynchronously loads the mobile header version 5 component.
         */
        AppHeaderMobile5: defineAsyncComponent(() => import('../components/headers/headersMobile/HeaderMobile5.vue')),
        /**
         * Asynchronously loads the menu version 4 component.
         */
        Menu4: defineAsyncComponent(() => import('../components/menus/Menu4.vue')),
        /**
         * Asynchronously loads the mobile menu version 5 component.
         */
        MenuMobile5: defineAsyncComponent(() => import('../components/menus/menuMobile/MenuMobile5.vue')),
        /**
         * Asynchronously loads the footer version 4 component.
         */
        Footer4: defineAsyncComponent(() => import('../components/footers/footers/Footer4.vue')),
    },
    /**
     * Data function returning component-specific data.
     */
    data() {
        /**
         * Reference to the app component from the context.
         */
        let appComponent = this.$appComponent;
        return {
            appComponent,
        };
    },
});
</script>
<template>
    <!-- Main container for the mobile drawer layout -->
    <div class="drawer drawer-mobile">
        <!-- Label for the main menu toggle -->
        <label for="main-menu"></label>
        <!-- Checkbox input for toggling the drawer -->
        <input
            id="main-menu"
            type="checkbox"
            class="drawer-toggle"
        />
        <!-- Main content area of the application -->
        <main
            id="main-layout"
            class="main-layout flex-grow block overflow-x-hidden text-neutral-content drawer-content bg-base-content"
        >
            <!-- Conditional component for downloading the app -->
            <ApptopBarDownload
                v-if="
                    appComponent.config.header_ != undefined && appComponent.config.header_.dowload_app != undefined
                        ? appComponent.config.header_.dowload_app
                        : appComponent.config.header != undefined &&
                          appComponent.config.header.showDownloadApp != undefined &&
                          appComponent.config.header.showDownloadApp[appComponent.country] != undefined &&
                          appComponent.config.header.showDownloadApp[appComponent.country]
                "
            />
            <!-- Sticky header section -->
            <div class="sticky z-[60]">
                <!-- Mobile header component -->
                <AppHeaderMobile5 />
                <!-- Desktop header component, hidden on smaller screens -->
                <div class="hidden lg:block z-[99999999] relative">
                    <AppHeaderDesktopv5 />
                </div>
                <!-- Conditional alert for contingencies -->
                <ContingencyAlert
                    v-if="appComponent.contingency"
                    class="relative top-[0rem] left-0"
                />
            </div>
            <!-- Main menu component -->
            <Menu4 />
            <!-- Main container for layout with grid structure -->
            <div class="main-container lg:grid lg:grid-cols-[18%_82%]">
                <!-- Mobile menu component, hidden on larger screens -->
                <MenuMobile5 class="hidden lg:block" />
                <!-- Content area with padding and rounded corners -->
                <div class="lg:pt-4 lg:px-4 lg:rounded-2xl">
                    <!-- Router view for dynamic content rendering -->
                    <RouterView />
                    <!-- Footer component with rounded corners -->
                    <Footer4 class="rounded-xl" />
                </div>
            </div>
        </main>
        <!-- Mobile menu component outside the main layout -->
        <MenuMobile5 />
    </div>
</template>
<style>
/* Main container styling */
.main-container {
    margin-top: 0px; /* No top margin */
    border-top: none; /* No top border */
    display: block; /* Block display */
    position: relative; /* Relative positioning */
    background-size: contain !important; /* Background size set to contain, overrides other styles */
}
</style>

<!-- FILE DOCUMENTED -->

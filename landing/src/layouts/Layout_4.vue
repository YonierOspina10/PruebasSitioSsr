<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

/**
 * Default export of the component definition.
 */
export default defineComponent({
    components: {
        /**
         * Asynchronously imports the top bar download component.
         */
        AppTopBarDownload: defineAsyncComponent(() => import('../components/topBar/topBarDownload.vue')),
        /**
         * Asynchronously imports the desktop header version 4 component.
         */
        AppHeaderDesktopv4: defineAsyncComponent(
            () => import('../components/headers/headersDesktop/HeaderDesktopv4.vue'),
        ),
        /**
         * Asynchronously imports the contingency alert component.
         */
        ContingencyAlert: defineAsyncComponent(() => import('@/components/ContingencyAlert.vue')),
        /**
         * Asynchronously imports the mobile header version 4 component.
         */
        AppHeaderMobile: defineAsyncComponent(() => import('../components/headers/headersMobile/HeaderMobile4.vue')),
        /**
         * Asynchronously imports the mobile menu version 4 component.
         */
        MenuMobile4: defineAsyncComponent(() => import('../components/menus/menuMobile/MenuMobile4.vue')),
        /**
         * Asynchronously imports the footer version 4 component.
         */
        Footer4: defineAsyncComponent(() => import('../components/footers/footers/Footer4.vue')),
    },
    /**
     * Component's data function.
     * @returns {Object} The data object containing appComponent.
     */
    data() {
        let appComponent: any = this.$appComponent; // Retrieves the appComponent from the context
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
        <!-- Checkbox input to toggle the drawer menu -->
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
            <!-- Conditional rendering of the top bar download component -->
            <AppTopBarDownload
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
            <!-- Desktop header and contingency alert, visible only on larger screens -->
            <div class="hidden lg:block z-[99999999] relative">
                <AppHeaderDesktopv4 />
                <ContingencyAlert
                    v-if="appComponent.contingency"
                    class="top-[59px] left-0"
                />
            </div>
            <!-- Main container for the application content -->
            <div class="main-container bg-base-content">
                <!-- Router view for rendering matched components -->
                <RouterView />
            </div>
            <!-- Footer component -->
            <Footer4 />
        </main>
        <!-- Mobile menu component -->
        <MenuMobile4 />
    </div>
</template>

<!-- FILE DOCUMENTED -->

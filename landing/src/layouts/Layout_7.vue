<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

/**
 * Default export of the Vue component.
 */
export default defineComponent({
    components: {
        /**
         * Asynchronously imports the HeaderDesktopV6 component.
         */
        HeaderDesktopv6: defineAsyncComponent(() => import('../components/headers/headersDesktop/HeaderDesktopV6.vue')),

        /**
         * Asynchronously imports the ContingencyAlert component.
         */
        ContingencyAlert: defineAsyncComponent(() => import('@/components/ContingencyAlert.vue')),

        /**
         * Asynchronously imports the MenuMobile7 component.
         */
        MenuMobile7: defineAsyncComponent(() => import('../components/menus/menuMobile/MenuMobile7.vue')),

        /**
         * Asynchronously imports the Footer component.
         */
        Footer: defineAsyncComponent(() => import('../components/footers/footers/Footer.vue')),
    },

    /**
     * Returns the component's data.
     */
    data() {
        /**
         * Reference to the app component from the context.
         * @type {any}
         */
        let appComponent: any = this.$appComponent;

        return {
            appComponent,
        };
    },
});
</script>
<template>
    <!-- Main container for the entire layout -->
    <div class="w-full">
        <!-- Main content area with specific classes for styling and layout -->
        <main
            id="main-layout"
            class="flex-grow block overflow-x-hidden text-neutral-content bg-base-content"
        >
            <!-- Desktop header component -->
            <HeaderDesktopv6 />
            <!-- Contingency alert displayed conditionally based on app state -->
            <ContingencyAlert
                v-if="appComponent.contingency"
                class="top-[59px] left-0"
            />
            <!-- Mobile menu component -->
            <MenuMobile7 />
            <!-- Main section containing the router view for dynamic content -->
            <section class="main-container ml-0 max-w-screen relative mt-[90px] md:mt-[58px]">
                <RouterView />
            </section>
            <!-- Footer component -->
            <Footer class="lg:pl-[68px]" />
        </main>
    </div>
</template>

<!-- FILE DOCUMENTED -->

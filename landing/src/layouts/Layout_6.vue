<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

/**
 * Main component definition using Vue's Composition API.
 */
export default defineComponent({
    components: {
        // Asynchronously import Header6 component
        Header6: defineAsyncComponent(() => import('../components/headers/Header6.vue')),
        // Asynchronously import ContingencyAlert component
        ContingencyAlert: defineAsyncComponent(() => import('@/components/ContingencyAlert.vue')),
        // Asynchronously import Footer6 component
        Footer6: defineAsyncComponent(() => import('../components/footers/footers/Footer6.vue')),
        // Asynchronously import MenuMain6 component
        MenuMain6: defineAsyncComponent(() => import('../components/menus/menuMain/MenuMain6.vue')),
    },
    setup() {
        // Setup function for composition API, currently returns an empty object
        return {};
    },
    data() {
        // Retrieve configuration and component references
        let config = this.$config();
        let zendesk: any = this.$zendesk;
        let appComponent: any = this.$appComponent;
        return {
            config,
            zendesk,
            appComponent,
        };
    },
});
</script>

<template>
    <!-- Main container for the component with a secondary background -->
    <div class="relative bg-base-content w-full h-full">
        <!-- Header component -->
        <Header6 />
        <main
            class="mt-[58px] w-full mb-14 desktop:mb-20 max-w-[1728px] mx-auto flex flex-col justify-center items-center"
        >
            <!-- Conditional rendering of ContingencyAlert based on appComponent state -->
            <ContingencyAlert
                v-if="appComponent.contingency"
                class="fixed top-[4.2rem] left-0"
            />
            <!-- Router view for nested routes -->
            <RouterView />
        </main>
        <!-- Footer component -->
        <Footer6 />
        <!-- Main menu component -->
        <MenuMain6 />
    </div>
</template>

<style scoped>
/* Global body styles can be defined here if needed */
body {
}
</style>

<!-- FILE DOCUMENTED -->

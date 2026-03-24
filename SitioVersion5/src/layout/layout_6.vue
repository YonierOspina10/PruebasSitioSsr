<template>
    <!-- Main container for the component, with relative positioning and full width/height -->
    <div class="relative bg-base-content w-full h-full">
        <!-- Header component -->
        <Header6 />
        <!-- Conditional rendering of the LabelRedirect component based on various appComponent properties -->
        <div
            v-if="
                appComponent.labelRedirect &&
                appComponent.showLabel &&
                !desactiveLabel &&
                appComponent.config.labelRedirect !== undefined &&
                appComponent.config.labelRedirect[appComponent.country] !== undefined &&
                appComponent.config.labelRedirect[appComponent.country].system !== undefined &&
                (appComponent.config.labelRedirect[appComponent.country].system.indexOf(appComponent.platformApp) >
                    -1 ||
                    appComponent.config.labelRedirect[appComponent.country].system == 'all')
            "
            class="mt-[60px]"
        >
            <LabelRedirect />
        </div>
        <!-- Main content area -->
        <main class="mt-[58px] w-full pb-14 desktop:pb-20 max-w-[1728px] mx-auto bg-base-content">
            <!-- ContingencyAlert component displayed if appComponent.contingency is true -->
            <ContingencyAlert
                v-if="appComponent.contingency"
                class="top-[59px] left-0"
            />
            <!-- ContingencyView component displayed based on specific route conditions -->
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
            <!-- RouterView component for displaying matched components based on the current route -->
            <RouterView v-else />
        </main>
        <!-- Footer component displayed if appComponent.appPOS is false -->
        <Footer6 v-if="!appComponent.appPOS" />
        <!-- Main menu component -->
        <MenuMain6 />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header6 from '@/components/headers/Header6.vue';
import MenuMain6 from '@/components/menus/MenuMain6.vue';
import BannerSlider6 from '@/components/BannerSlider6.vue';
import PromotionalCards from '@/components/PromotionalCards.vue';
import Footer6 from '@/components/footers/Footer6.vue';
import SliderGamesV2 from '@/components/SliderGamesV2.vue';
import Menu6 from '@/components/menus/Menu6.vue';
import LabelRedirect from '@/components/LabelRedirect.vue';
import { useCookies } from 'vue3-cookies';
import ContingencyAlert from '@/components/ContingencyAlert.vue';
import ContingencyView from '@/views/ContingencyView.vue';

export default defineComponent({
    // Registering components used in this component
    components: {
        ContingencyView,
        ContingencyAlert,
        SliderGamesV2,
        Footer6,
        PromotionalCards,
        BannerSlider6,
        MenuMain6,
        Header6,
        Menu6,
        LabelRedirect,
    },
    setup() {
        // Using vue3-cookies to manage cookies
        const { cookies } = useCookies();
        return {
            cookies,
        };
    },
    data() {
        // Initializing component data properties
        let config = this.$config();
        let zendesk: any = this.$zendesk;
        let appComponent: any = this.$appComponent;
        let desactiveLabel: boolean = false;
        return {
            config,
            zendesk,
            appComponent,
            desactiveLabel,
        };
    },
    mounted() {
        // Check cookie value to determine if the label should be shown
        if (this.cookies.get('cookies-app') == 'true') {
            this.appComponent.showLabel = false;
        }
        // Check for specific global variables to deactivate the label
        if (
            (window as any).cordova_iab != undefined &&
            (window as any).apt != undefined &&
            (window as any).versionApp != undefined
        ) {
            this.desactiveLabel = true;
        }
    },
});
</script>

<style scoped>
/* Global styles for the body can be added here */
body {
}
</style>

<!-- FILE DOCUMENTED -->

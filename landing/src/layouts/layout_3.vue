<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useCookies } from 'vue3-cookies';
import ContingencyAlert from '@/components/ContingencyAlert.vue';

/**
 * Vue component definition for the main application.
 */
export default defineComponent({
    components: {
        // Synchronously imported component
        ContingencyAlert,

        // Asynchronously imported components
        Header: defineAsyncComponent(() => import('../components/headers/Header.vue')),
        Footer: defineAsyncComponent(() => import('../components/footers/footers/Footer.vue')),
        MenuDown: defineAsyncComponent(() => import('../components/menus/menusDownMobile/MenuDownMobile.vue')),
        MenuMain: defineAsyncComponent(() => import('../components/menus/menuMain/MenuMain.vue')),
        LabelRedirect: defineAsyncComponent(() => import('../components/labelRedirect/LabelRedirect.vue')),
    },

    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let zendesk: any = this.$zendesk; // Reference to the Zendesk instance
        let desactiveLabel: boolean = false; // Flag for label activation
        return {
            appComponent,
            zendesk,
            desactiveLabel,
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {
        setTimeout(() => {
            try {
                // Check if the Zendesk name is not 'centribal'
                if (this.appComponent.config.zendesk[this.appComponent.country].name !== 'centribal') {
                    // Hide Zendesk widget
                    this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'hide');
                    // Event listener for Zendesk close event
                    this.zendesk.$on('close', () => {
                        this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'hide');
                    });
                }
            } catch (e) {}
        }, 1000); // Delay execution by 1 second

        // Check cookie for app label visibility
        if (this.cookies.get('cookies-app') == 'true') {
            this.appComponent.showLabel = false; // Hide label if cookie is set
        }
    },

    /**
     * Setup function for composition API.
     * @returns {Object} The setup properties.
     */
    setup() {
        const { cookies } = useCookies(); // Use cookies from vue3-cookies
        return {
            cookies,
        };
    },
});
</script>
<template>
    <Suspense>
        <template #default>
            <!-- Header component displayed when content is loaded -->
            <Header />
        </template>
        <template #fallback>
            <!-- Loading placeholder for Header component -->
            <div class="w-full h-[60px] fixed z-50 conten-loading">
                <div
                    v-if="appComponent.config.mobileL != undefined && appComponent.config.mobileL == 1"
                    class="w-full h-full flex justify-between items-center px-2"
                >
                    <div class="h-full w-full flex gap-6 items-center justify-between">
                        <span
                            v-for="item in 3"
                            :key="item"
                            class="w-[140px] h-[29.86px] even:h-[32.85px] odd:w-[42px] odd:h-[42px] odd:rounded-full conten-loading block"
                        ></span>
                    </div>
                </div>
                <div
                    v-else
                    class="w-full h-full flex justify-between items-center px-4"
                >
                    <div class="h-full flex gap-6 items-center [&>*:nth-child(2)]:rounded-full">
                        <span
                            v-for="item in 2"
                            :key="item"
                            class="w-[154px] h-[32px] conten-loading block even:w-[42px] even:h-[42px]"
                        ></span>
                    </div>
                    <div
                        class="h-full flex justify-between gap-5 items-center [&>*:nth-child(3)]:w-[51.45px] [&>*:nth-child(3)]:h-[21px]"
                    >
                        <span
                            v-for="item in 3"
                            :key="item"
                            class="w-[154px] h-[35px] conten-loading block"
                        ></span>
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
    <LabelRedirect
        class="mt-[58px]"
        v-if="
            appComponent.labelRedirect &&
            appComponent.showLabel &&
            !desactiveLabel &&
            appComponent.config.labelRedirect !== undefined &&
            appComponent.config.labelRedirect[appComponent.country] !== undefined &&
            appComponent.config.labelRedirect[appComponent.country].system !== undefined &&
            appComponent.config.labelRedirect[appComponent.country].system.indexOf(appComponent.platformApp) > -1
        "
    />
    <Suspense>
        <template #default>
            <!-- Main menu component displayed when content is loaded -->
            <MenuMain />
        </template>
        <template #fallback>
            <!-- Loading placeholder for MenuMain component -->
            <div
                class="h-0 md:h-screen w-[69px] hover:w-[255px] container-loading z-40 fixed transition-all ease-in-out p-2"
            >
                <div class="h-full w-full flex flex-col items-center justify-start gap-3">
                    <span
                        v-for="item in 12"
                        :key="item"
                        class="h-[49px] w-full conten-loading rounded-lg"
                    ></span>
                </div>
            </div>
        </template>
    </Suspense>
    <section
        class="main-container w-full lg:pl-[68px] min-h-[500px] bg-base-content"
        :class="
            (appComponent.config.labelRedirect !== undefined &&
                appComponent.config.labelRedirect[appComponent.country] !== undefined &&
                appComponent.config.labelRedirect[appComponent.country].system !== undefined &&
                appComponent.config.labelRedirect[appComponent.country].system.indexOf(appComponent.platformApp) > -1 ==
                    false) ||
            !appComponent.showLabel ||
            !appComponent.labelRedirect
                ? 'pt-[58px]'
                : ''
        "
    >
        <!-- Contingency alert displayed based on appComponent.contingency -->
        <ContingencyAlert
            v-if="appComponent.contingency"
            class="top-[59px]"
        />
        <!-- Router view for displaying matched components -->
        <RouterView />
    </section>
    <Suspense>
        <template #default>
            <!-- Footer component displayed when content is loaded -->
            <MenuDown class="z-40" />
        </template>
        <template #fallback>
            <!-- Loading placeholder for MenuDown component -->
            <div class="w-full h-[70px] md:h-0 md:w-0 fixed z-[100] -bottom-1 left-0 container-loading rounded-none">
                <div class="h-full w-full flex justify-between items-center p-2">
                    <span
                        v-for="item in 3"
                        :key="item"
                        class="w-[154px] even:w-[56px] even:h-[56px] even:rounded-full h-[35px] conten-loading block"
                    ></span>
                </div>
            </div>
        </template>
    </Suspense>
    <Suspense>
        <template #default>
            <!-- Footer component displayed when content is loaded -->
            <Footer class="lg:pl-[68px]" />
        </template>
        <template #fallback>
            <!-- Loading placeholder for Footer component -->
            <div class="h-auto w-full">
                <div
                    class="flex justify-center items-center px-2 pt-0 lg:pt-10 w-screen overflow-hidden ml-0 lg:ml-[68px]"
                >
                    <div
                        class="h-full w-[80%] max-w-[1300px] pb-16 ml-0 lg:-ml-[70px] flex flex-col justify-start items-center gap-0 md:gap-5"
                    >
                        <div class="h-auto w-full grid grid-cols-2 md:grid-cols-4 py-5 px-2 max-w-[1000px]">
                            <div
                                v-for="item in 4"
                                :key="item"
                                class="w-full h-full flex flex-col justify-start items-start [&>*:nth-child(1)]:h-[24.5px] gap-y-5 gap-x-5 lg:gap-x-20 max-w-[1000px]"
                            >
                                <span
                                    v-for="item in 7"
                                    :key="item"
                                    class="w-11/12 h-[13.6px] rounded-lg conten-loading mb-3 py-2"
                                ></span>
                            </div>
                        </div>
                        <div class="flex justify-center items-center flex-col w-full h-auto">
                            <div class="w-32 h-[15.68px] conten-loading"></div>
                            <div
                                class="w-full h-full flex flex-wrap gap-8 md:gap-16 justify-center items-start py-4 max-w-[1000px]"
                            >
                                <span
                                    v-for="item in 18"
                                    :key="item"
                                    class="w-[65px] h-[40px] flex flex-shrink-0 conten-loading"
                                ></span>
                            </div>
                        </div>
                        <div class="w-full grid grid-cols-1 md:grid-cols-3 h-auto my-[14px] gap-y-9 gap-x-4">
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <div class="w-full h-[40px] flex justify-center">
                                    <div class="h-[13.6px] w-[106.4px] conten-loading"></div>
                                </div>
                                <div class="h-full w-full flex flex-col items-center">
                                    <div class="h-[13.6px] w-[68.79px] conten-loading mb-2"></div>
                                    <div class="flex justify-center items-center h-[49px] w-[396.53px]">
                                        <span
                                            v-for="item in 4"
                                            :key="item"
                                            class="h-[43.2px] w-[39px] my-[5px] mx-[10px] conten-loading"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full h-full flex flex-col justify-start items-center">
                                <div class="w-full h-auto flex justify-center pb-5">
                                    <div class="h-[13.6px] w-[106.4px] conten-loading"></div>
                                </div>
                                <div class="w-full flex flex-wrap justify-center gap-3 items-center">
                                    <span
                                        v-for="item in 7"
                                        :key="item"
                                        class="w-[70px] h-[70px] flex flex-shrink-0 conten-loading"
                                    ></span>
                                </div>
                                <div class="w-full h-[50.46px] flex justify-center items-center">
                                    <span class="w-[46px] h-[50.46px] conten-loading"></span>
                                </div>
                                <div class="w-full h-[80.5px] flex flex-col justify-center items-center py-4">
                                    <span
                                        v-for="item in 3"
                                        :key="item"
                                        class="w-11/12 h-[10px] rounded-lg conten-loading mb-3 py-2"
                                    ></span>
                                </div>
                            </div>
                            <div class="w-full h-full flex flex-col justify-start items-center gap-2">
                                <div class="w-full h-[51px] flex justify-center items-center">
                                    <span class="w-[150px] h-[51px] conten-loading"></span>
                                </div>
                                <div class="w-full h-[51px] flex justify-center items-center">
                                    <span class="w-[150px] h-[51px] conten-loading"></span>
                                </div>
                                <div class="w-full h-[175px] flex flex-col justify-center items-center">
                                    <span
                                        v-for="item in 6"
                                        :key="item"
                                        class="w-11/12 h-[10px] rounded-lg conten-loading mb-3 py-2"
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-[85px] mb-[14px] flex flex-col justify-start items-center gap-2">
                            <span class="w-[119.14px] h-[13.6px] conten-loading"></span>
                            <span class="w-[150px] h-[37.5px] conten-loading"></span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

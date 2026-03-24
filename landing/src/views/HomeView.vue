<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useGetInfoFirestore } from '../composables/useInfoFirestore'
import {
    getDevice,
    getComponents,
    getInfoIcons,
    getImages,
    getHomeIcons,
    getPromotional2,
    updateMenuFooterLight,
    updateProviders,
} from '../utils/configHome';

/**
 * Main component definition for the application.
 */
export default defineComponent({
    components: {
        // Asynchronously load various banner and slider components
        SliderNormalComponent: defineAsyncComponent(() => import('../components/banners/BannerV2.vue')),
        BannerSlider8Component: defineAsyncComponent(() => import('../components/banners/BannerV8.vue')),
        BannerSlider9Component: defineAsyncComponent(() => import('../components/banners/BannerV9.vue')),
        SliderCasino3Component: defineAsyncComponent(() => import('../components/sliders/SliderCasino.vue')),
        SliderCasino5Component: defineAsyncComponent(() => import('../components/sliders/SliderCasino5.vue')),
        SliderCasino7Component: defineAsyncComponent(() => import('../components/sliders/SliderCasino7.vue')),
        SliderCasino8Component: defineAsyncComponent(() => import('../components/sliders/SliderCasino8.vue')),
        SliderCasino9Component: defineAsyncComponent(() => import('../components/sliders/SliderCasino9.vue')),
        SliderGamesV2: defineAsyncComponent(() => import('../components/sliders/SliderGamesV2.vue')),
        Carousel3Component: defineAsyncComponent(() => import('../components/banners/BannerV1.vue')),
        Carousel7Component: defineAsyncComponent(() => import('../components/banners/BannerV7.vue')),
        InfoText: defineAsyncComponent(() => import('../components/infoText/InfoText.vue')),
        InfoIconsComponent: defineAsyncComponent(() => import('../components/infoIcons/InfoIcons4.vue')),
        TextIconComponent: defineAsyncComponent(() => import('../components/TextIconComponents/TextWithIcon.vue')),
        InfoIconsComponent3: defineAsyncComponent(() => import('../components/infoIcons/InfoIcons.vue')),
        InfoIconsComponent5: defineAsyncComponent(() => import('../components/infoIcons/InfoIcons5.vue')),
        CardsIconsComponent: defineAsyncComponent(() => import('../components/infoIcons/InfoIcons3.vue')),
        CardsImageComponent: defineAsyncComponent(() => import('../components/cardsIcons/CardIcons.vue')),
        WidgetCarouselComponent: defineAsyncComponent(() => import('../components/sportbook/WTopEventCarousel.vue')),
        WidgetCarousel2Component: defineAsyncComponent(() => import('../components/sportbook/WTopEventCarousel2.vue')),
        SeoP: defineAsyncComponent(() => import('../components/seo/SeoP.vue')),
        Jackpots2Component: defineAsyncComponent(() => import('../components/jackpots/Jackpots2.vue')),
        Jackpots3Component: defineAsyncComponent(() => import('../components/jackpots/Jackpots3.vue')),
        JackpotsComponent: defineAsyncComponent(() => import('../components/jackpots/Jackpots.vue')),
        BannerSlider6: defineAsyncComponent(() => import('../components/banners/BannerV6.vue')),
        Menu6: defineAsyncComponent(() => import('../components/menus/Menu6.vue')),
        Menu8Component: defineAsyncComponent(() => import('../components/menus/menuCasino/Menu8.vue')),
        PromotionalCards: defineAsyncComponent(() => import('../components/promotionalCards/PromotionalCards.vue')),
        SearchGames: defineAsyncComponent(() => import('../components/searchs/searchGames/SearchGames.vue')),
        PromotionalCards2: defineAsyncComponent(() => import('../components/promotionalCards/PromotionalCards2.vue')),
    },
    data() {
        // Initialize component data
        let appComponent: any = this.$appComponent; // Reference to the app component
        let images: any = []; // Array to hold images
        let HOME_ICONS: any = []; // Array to hold home icons
        let PROMOTIONS: any = []; // Array to hold promotional data
        let INFO_ICONS: any = []; // Array to hold information icons
        const components: any = ref([]); // Reactive reference for components
        const device = getDevice(appComponent); // Get device information
        getComponents(appComponent, components.value); // Populate components
        INFO_ICONS = getInfoIcons(appComponent); // Get information icons
        images = getImages(appComponent, device); // Get images based on device
        HOME_ICONS = getHomeIcons(appComponent); // Get home icons
        updateMenuFooterLight(appComponent); // Update footer menu light settings
        updateProviders(appComponent); // Update providers
        PROMOTIONS = getPromotional2(appComponent); // Get promotional data
        return {
            appComponent,
            INFO_ICONS,
            HOME_ICONS,
            PROMOTIONS,
            components,
            images,
        };
    },
    async created() {
        const appComponent: any = this.$appComponent;
        const config = appComponent?.config;
        const device = getDevice(appComponent);

        const firestoreBanner = await useGetInfoFirestore(config, appComponent, 'banner_home', {
            useLogin: true,
            useScope: true,
        });
        if (firestoreBanner?.length) {
            this.images = firestoreBanner;
        } else {
            this.images = getImages(appComponent, device);
        }
    },
});
</script>
<template>
    <!-- Loop through components and render them dynamically -->
    <template
        v-for="component in components"
        :key="component.id"
    >
        <KeepAlive>
            <Suspense>
                <template #default>
                    <component
                        :class="appComponent.infoApp && !(
                            component.id == 'Carousel3Component' ||
                            component.id == 'JackpotsComponent' ||
                            component.id == 'Jackpots2Component' ||
                            component.id == 'Jackpots3Component' ||
                            component.id == 'SeoP'
                        )
                            ? 'hidden'
                            : ''
                        "
                        :is="component.id"
                        :icons="INFO_ICONS"
                        :images="images"
                        :component="component.component"
                        :homeIcons="HOME_ICONS"
                        :promotions="PROMOTIONS"
                        :data="component.data2"
                        :url="component.url"
                        :title="component.title"
                        :category="component.category"
                        :typelobby="component.typelobby"
                        :limit="component.limit"
                        :decorationBar="component.decorationBar"
                        :lowerCaseText="component.lowerCaseText"
                        :top="component.top"
                        :eventCount="component.eventCount"
                        :sportId="component.sportId"
                        :reelsCategories="component.reelsCategories"
                        :keySlide="component.keySlide"
                        :colorBg="component.colorBg"
                        :styleVersion="component.styleVersion"
                        :bannersWidget="component.bannersWidget"
                        :type="component.type"
                        :tokens="component.tokens"
                        :action="component.action"
                        :user="component.user"
                        :icon="component.icon"
                        :textStyle="component.textStyle"
                        :text="component.text"
                        :decorationText="component.decorationText"
                    >
                    </component>
                </template>
                <template #fallback>
                    <!-- Fallback content for loading states based on component type -->
                    <div
                        v-if="component.id == 'Carousel3Component'"
                        class="w-full h-[600px] lg:h-[700px] -mb-32 md:-mb-40 bg-neutral-content"
                    ></div>
                    <div
                        v-else-if="component.id == 'InfoIconsComponent3'"
                        class="h-[140px] md:h-[98px] flex items-center justify-center"
                    >
                        <div
                            class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 justify-items-center items-center h-[98px] md:h-full max-w-[1300px] w-11/12"
                        >
                            <span
                                v-for="item in 4"
                                :key="item"
                                class="w-[140px] lg:w-60 h-[42px] md:h-[56px] rounded-xl conten-loading"
                            ></span>
                        </div>
                    </div>
                    <div
                        v-else-if="component.id == 'SliderNormalComponent'"
                        class="w-full h-[100px] lg:h-[280px]"
                    ></div>
                    <div
                        v-else-if="component.id == 'WidgetCarouselComponent'"
                        class="h-[151px] md:h-[151px] flex items-center justify-center p-2"
                    >
                        <div class="overflow-x-hidden max-w-[1300px] w-11/12 relative z-10">
                            <div class="flex items-end justify-start gap-2 justify-items-center">
                                <span
                                    v-for="item in 4"
                                    class="w-[400px] h-[136px] rounded-xl container-loading shrink-0"
                                >
                                    <div
                                        :key="item"
                                        class="h-full w-full flex items-end justify-center gap-5"
                                    >
                                        <span
                                            v-for="item in 3"
                                            :key="item"
                                            class="h-20 w-[30%] rounded-lg mb-2 conten-loading"
                                        ></span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="component.id == 'SliderCasino3Component'"
                        class="h-[210px] flex items-center justify-center"
                    >
                        <div class="max-w-[1300px] w-11/12">
                            <div class="w-[108.25px] h-[24.5px] conten-loading mt-[3.5px]"></div>
                            <div class="overflow-x-hidden py-2">
                                <div class="flex items-end justify-start gap-2 justify-items-center">
                                    <span
                                        v-for="item in 9"
                                        :key="item"
                                        class="w-[168px] h-[168px] rounded-xl conten-loading shrink-0"
                                    >
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="component.id == 'JackpotsComponent'"
                        class="h-[460px] flex items-center justify-center"
                    >
                        <div class="max-w-[1300px] w-11/12">
                            <div class="w-full h-[450px] md:h-[250px] rounded-xl container-loading flex justify-center items-center">
                                <div class="flex flex-col md:flex-row items-end justify-start gap-4 md:gap-2 justify-items-center">
                                    <span
                                        v-if="appComponent.mobileL == 1"
                                        v-for="item in 3"
                                        class="w-[300px] md:w-[400px] h-[220px] rounded-xl conten-loading shrink-0"
                                    >

                                    </span>
                                    <span
                                        v-else
                                        v-for="item in 2"
                                        class="w-[300px] h-[200px] rounded-xl conten-loading shrink-0"
                                    >

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="component.id == 'CardsImageComponent'"
                        class="h-[210px] flex items-center justify-center"
                    >
                        <div class="max-w-[1300px] w-11/12">
                            <div class="w-[108.25px] h-[24.5px] conten-loading mt-[3.5px]"></div>
                            <div class="overflow-x-scroll py-2">
                                <div class="flex items-end justify-start gap-2 justify-items-center">
                                    <span
                                        v-for="item in 9"
                                        :key="item"
                                        class="w-[322px] h-[222px] rounded-lg conten-loading shrink-0"
                                    >
                                        <div class="h-full w-full flex items-center justify-center">
                                            <span class="h-20 w-[30%] rounded-lg mb-2 conten-loading"></span>
                                            <span class="h-20 w-[30%] rounded-lg mb-2 conten-loading"></span>
                                            <span class="h-20 w-[30%] rounded-lg mb-2 conten-loading"></span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="component.id == 'BannerSlider8Component'"
                        class="w-full h-[600px] lg:h-[700px] -mb-32 md:-mb-40 conten-loading"
                    ></div>
                </template>
            </Suspense>
        </KeepAlive>
    </template>
</template>
<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

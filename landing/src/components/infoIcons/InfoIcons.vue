<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a home slider that displays icons with links.
 */
export default defineComponent({
    props: {
        /**
         * Version of the style to be applied to the component.
         * @default 1
         */
        styleVersion: {
            type: Number,
            default: 1,
        },
        /**
         * Object containing icon data for the component.
         */
        icons: Object,
    },
    data() {
        // Reference to the app component for analytics tracking.
        let appComponent: any = this.$appComponent;
        return {
            appComponent,
        };
    },
    methods: {
        /**
         * Generates a srcset string for the image URL to support webp format.
         * @param imageUrl - The original image URL.
         * @returns A formatted srcset string for webp images.
         */
        getSrcsetFm(imageUrl: string) {
            if (!imageUrl) return '';
            const baseUrl = imageUrl.split('?')[0];
            return `${baseUrl}?fm=webp`;
        },
    },
    created() {},
});
</script>

<template>
    <!-- Main section for the home slider, centered with padding and full width -->
    <section class="flex justify-center items-center pt-8 pb-4 w-full">
        <!-- Container for home content with specific styling and layout -->
        <div
            id="home-content"
            class="version1 home-slider1 flex flex-wrap w-11/12 max-w-[1300px] gap-4 z-20"
        >
            <!-- Loop through each icon and create a link for it -->
            <div
                v-for="(value,index) in icons"
                class="container-slide1 mx-auto flex justify-center items-center"
                :class="$route.path != '/home' ? 'in' : ''"
            >
                <RouterLink
                    :to="value.MENU_URL"
                    :title="$t(value.MENU_TITLE)"
                    data-use="preload"
                    itemprop="url"
                    :data-analytics-label="`home:shortcut:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`"
                    :data-analytics-position="index + 1"
                    :data-analytics-id="value.id"
                    :data-analytics-context="`component:InfoIcons|layout:layout-${appComponent.config.layout}`"
                    :aria-label="value.MENU_TITLE"
                    @click="appComponent.gAnalytics('sub_menu', value)"
                    :class="
                        styleVersion == 2
                            ? 'w-40 lg:w-52 h-14 lg:h-16 justify-around p-1'
                            : 'w-40 lg:w-60 h-12 lg:h-16 relative justify-center'
                    "
                    class="hover:scale-[1.02] flex items-center rounded-2xl bg-base-300 text-neutral"
                    :style="[
                        { backgroundColor: value.MENU_CLASS },
                        {
                            color: value.MENU_COLOR == undefined ? '#525252' : value.MENU_COLOR,
                        },
                    ]"
                >
                    <!-- Container for the icon image -->
                    <div
                        :class="
                            styleVersion == 2
                                ? 'h-full aspect-square'
                                : 'container-img absolute -left-5 -bottom-1 lg:-bottom-3 lg:-left-7 w-16 lg:w-28 h-16 lg:h-28'
                        "
                    >
                        <img
                            fetchpriority="high"
                            :srcset="getSrcsetFm(value.MENU_ICON)"
                            loading="lazy"
                            :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                            alt="sports bets, casino"
                            class="w-full h-full object-contain"
                            width="98"
                            height="98"
                        />
                    </div>
                    <!-- Text label for the icon -->
                    <span
                        :class="
                            styleVersion == 2
                                ? 'text-sm text-center w-[60%]'
                                : 'font-poppins flex h-full text-center justify-center items-center font-bold ml-[30px] lg:ml-14 mt-0 text-[12px] lg:text-lg leading-none max-w-[100px] lg:max-w-[120px]'
                        "
                    >
                        {{ $t(value.MENU_TITLE) }}
                    </span>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

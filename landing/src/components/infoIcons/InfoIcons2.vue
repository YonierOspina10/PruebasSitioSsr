<script lang="ts">
import { defineComponent } from 'vue';
import traced from '../icons/TracedIcon.vue';

/**
 * Vue component definition for handling login icons.
 */
export default defineComponent({
    data() {
        // Reference to the app component
        let appComponent: any = this.$appComponent;
        // Login state variable
        let login2: string = '';
        // Array to hold information icons
        let INFO_ICONS: any = [];
        return {
            login2,
            appComponent,
            INFO_ICONS,
        };
    },
    components: {
        traced, // Imported traced icon component
    },
    created() {
        // Check for desktop configuration when not logged in
        if (
            !this.appComponent.mobile &&
            this.appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP != undefined &&
            this.appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP[this.appComponent.country] != undefined
        ) {
            this.INFO_ICONS = this.appComponent.config.HOME_ICONS_NOLOGUEADO_DESKTOP[this.appComponent.country];
        }
        // Check for 'not login' configuration
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config['not_login'] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd]['HOME_ICONS'] != undefined
        ) {
            this.INFO_ICONS = this.appComponent.config['not_login'][this.appComponent.lngProd]['HOME_ICONS'];
        } else if (
            this.appComponent.mobile &&
            this.appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE != undefined &&
            this.appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE[this.appComponent.country] != undefined
        ) {
            // Check for mobile configuration when not logged in
            this.INFO_ICONS = this.appComponent.config.INFO_ICONS_NOLOGUEADO_MOBILE[this.appComponent.country];
        } else if (
            !this.appComponent.mobile &&
            this.appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP != undefined &&
            this.appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP[this.appComponent.country] != undefined
        ) {
            // Fallback to desktop configuration when not logged in
            this.INFO_ICONS = this.appComponent.config.INFO_ICONS_NOLOGUEADO_DESKTOP[this.appComponent.country];
        }
        // Determine if menu links should open in a new tab
        this.INFO_ICONS.forEach(function (element) {
            if (element.MENU_URL.indexOf('http') != -1 || element.MENU_URL.indexOf('www') != -1) {
                element.MENU_NEWTAB = true; // Set to open in new tab
            } else {
                element.MENU_NEWTAB = false; // Set to open in the same tab
            }
        });
    },
});
</script>
<template>
    <!-- Section containing information icons for the homepage -->
    <section class="info-icons">
        <!-- Conditional rendering based on style version -->
        <div
            v-if="appComponent.config.homePage.styleVersion == 1"
            id="home-content"
            class="version1 home-slider"
        >
            <!-- Container for animated flex items -->
            <div class="animated flex justify-center items-center flex-wrap py-8 gap-y-8 xl:px-30">
                <!-- Loop through INFO_ICONS to create individual icon containers -->
                <div
                    v-for="value in INFO_ICONS"
                    class="container-slide w-2/4 xl:w-1/4 h-full flex items-center justify-center"
                    style=""
                >
                    <!-- Router link for navigation with analytics tracking -->
                    <RouterLink
                        @click="appComponent.gAnalytics('sub_menu', value)"
                        :to="value.MENU_URL"
                        :title="$t(value.MENU_TITLE)"
                        data-use="preload"
                        itemprop="url"
                        :aria-label="value.MENU_TITLE"
                        class="hover:scale-105 transition-all ease-in-out"
                    >
                        <!-- Container for icon and title -->
                        <div
                            class="flex justify-center items-center bg-gradient-to-b from-neutral to-gray-200 p-2 rounded-2xl font-poppinsb text-gray-700 scale-top-[-25px] left-[-5px] scale-[.8] md:scale-100 w-[190px] md:w-[270px] h-[62px] relative"
                        >
                            <!-- Image container for the icon -->
                            <div
                                class="container-img absolute left-[8px] w-[40px] h-[40px]"
                                style="z-index: 2"
                            >
                                <img
                                    v-lazy="value.MENU_ICON"
                                    width="35"
                                    height="15"
                                    alt="sports bets, casino"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                            <!-- Traced element for decorative purposes -->
                            <traced
                                class="absolute top-[-49px] left-[-8px] z-1"
                                :class="[
                                    value.MENU_CLASS_DIV == undefined || value.MENU_CLASS_DIV == ''
                                        ? 'fill-primary-content'
                                        : value.MENU_CLASS_DIV,
                                ]"
                                :width="'145'"
                                :height="'150'"
                            />
                            <!-- Title of the menu item -->
                            <span
                                class="font-poppinsb pl-16 md:pl-12 text-gray-600/90 text-xs md:text-xl max-w-[131px] md:max-w-[200px]"
                                >{{ $t(value.MENU_TITLE) }}</span
                            >
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
/* Styles for the home slider version 1 */
.home-slider.version1 > div .container-slide a {
    max-width: none; /* Removes any maximum width restriction on anchor elements */
}
</style>

<!-- FILE DOCUMENTED -->

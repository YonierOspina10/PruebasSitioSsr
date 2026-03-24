<script lang="ts">
import { defineComponent } from 'vue';
import HeaderDesktopv5 from '../headersDesktop/HeaderDesktopv5.vue';

/**
 * Vue component definition for the main application component.
 */
export default defineComponent({
    components: {
        // Registering the HeaderDesktopv5 component for use in this component.
        HeaderDesktopv5,
    },

    /**
     * Component's reactive data properties.
     * @returns {Object} The data object containing appComponent.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the global app component.
        return {
            appComponent,
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     * Initializes social networks configuration if certain conditions are met.
     */
    mounted() {
        if (
            this.appComponent.config != undefined && // Check if config exists.
            this.appComponent.config['not_login'] != undefined && // Check if 'not_login' exists in config.
            this.appComponent.config['not_login'][this.appComponent.lngProd] != undefined && // Check if language-specific 'not_login' exists.
            this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'] != undefined // Check if 'social_links' exists for the current language.
        ) {
            // Assign social links to the SOCIAL_NETWORKS_HEADER for the current country.
            this.appComponent.config.SOCIAL_NEWTWORKS_HEADER[this.appComponent.country] =
                this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'];
        }
    },

    /**
     * Methods available in the component.
     */
    methods: {
        /**
         * Opens a URL in the top window when a box is clicked.
         * @param {Object} box - The box object containing the URL.
         */
        clickBox(box: any) {
            window.open(box.url, '_top'); // Open the specified URL in the top window.
        },
    },
});
</script>
<template>
    <!-- Main container for the header section -->
    <div>
        <!-- Conditional navbar container based on route names -->
        <div
            class="w-full transition duration-200 ease-in-out text-neutral bg-primary-focus z-[60] h-[35px] max-h-[35px]"
            v-if="
                $route.name != 'banner-right' &&
                $route.name != 'banner-left' &&
                $route.name != 'banner-rightnl' &&
                $route.name != 'banner-leftnl' &&
                $route.name != 'banner-topcenternl' &&
                $route.name != 'banner-topcenter'
            "
        >
            <!-- Navbar container with flex properties -->
            <div class="mx-auto navbar max-w-none min-h-0 h-full font-light p-0 flex items-center justify-end">
                <template>
                    <!-- Social networks section, conditionally rendered -->
                    <div
                        v-if="
                            (appComponent.config.header_ != undefined &&
                            appComponent.config.header_.social_networks != undefined
                                ? appComponent.config.header_.social_networks
                                : appComponent.config.header.showRedes) &&
                            appComponent.config.SOCIAL_NEWTWORKS_HEADER != undefined &&
                            appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country] != undefined
                        "
                        class="items-center justify-end flex mr-2 text-xs ml-auto"
                    >
                        <!-- Social network links -->
                        <a
                            @click="appComponent.gAnalytics('button_social_network', value)"
                            :aria-label="value.SOCIAL_ICON"
                            v-for="value in appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]"
                            :href="value.SOCIAL_URL"
                            target="_blank"
                            class="icons-social-header"
                        >
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: value.SOCIAL_ICON }" />
                        </a>
                    </div>
                </template>
                <!-- Upper fringe ticker section, conditionally rendered -->
                <div
                    v-if="
                        (appComponent.config.header_ != undefined && appComponent.config.header_.top_band != undefined
                            ? appComponent.config.header_.top_band
                            : appComponent.config.header.showTicker) &&
                        appComponent.boxes.length > 0 &&
                        appComponent.session.logueado
                    "
                    class="ticker-mobile items-baseline text-start md:text-end flex justify-start md:justify-end md:w-[65%]"
                >
                    <!-- Ticker viewport -->
                    <div
                        class="viewport"
                        v-bind:class="{ moving: appComponent.moving }"
                    >
                        <!-- Ticker boxes -->
                        <div
                            class="box flex justify-start md:justify-end"
                            v-for="box in appComponent.boxes"
                        >
                            <span
                                @click="clickBox(box)"
                                v-html="box.title"
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Desktop header component, hidden on small screens -->
        <div class="block lg:hidden">
            <HeaderDesktopv5></HeaderDesktopv5>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

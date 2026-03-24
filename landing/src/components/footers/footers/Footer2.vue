<script lang="ts">
import AppCarouselProviders from '../providers/CarouselProviders2.vue'; // Import carousel provider component
import AppMenuFooter from '../menuFooters/MenuFooter2.vue'; // Import footer menu component
import AppSocialNetworks from '../socialNetworks/SocialNetworks2.vue'; // Import social networks component
import AppSponsors from '../sponsors/Sponsors2.vue'; // Import sponsors component
import AppCopyright from '../copyright/Copyright2.vue'; // Import copyright component
import { defineComponent } from 'vue';
import AppComplaintsBook from './../complaintsBook/ComplaintsBook.vue'; // Import defineComponent from Vue

export default defineComponent({
    components: {
        AppComplaintsBook,
        AppCarouselProviders, // Register carousel provider component
        AppMenuFooter, // Register footer menu component
        AppSocialNetworks, // Register social networks component
        AppSponsors, // Register sponsors component
        AppCopyright, // Register copyright component
    },
    data() {
        let appComponent: any = this.$appComponent; // Retrieve app component from Vue instance
        return {
            appComponent, // Return app component in data
        };
    },
    methods: {
        /**
         * Redirects to a specified URL based on the box parameter.
         * @param box - Object containing URL information.
         */
        clickBox(box: any) {
            window.location.href = this.appComponent.config.baseUrlFx + box.url; // Navigate to the constructed URL
        },
    },
    mounted() {
        // Check if configuration for social links exists
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config['not_login'] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd] != undefined &&
            this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'] != undefined
        ) {
            // Assign social links to the app component's configuration
            this.appComponent.config.SOCIAL_NEWTWORKS[this.appComponent.country] =
                this.appComponent.config['not_login'][this.appComponent.lngProd]['social_links'];
        }
    },
});
</script>
<template>
    <!-- Footer section of the webpage -->
    <footer
        class="pb-7 text-info-text bg-base-300"
        :class="appComponent.config.providers.lightColor ? 'light' : ''"
        :style="{
            'background-color':
                appComponent.config.footer_ != undefined && appComponent.config.footer_.background != undefined
                    ? appComponent.config.footer_.background
                    : appComponent.config.footer != undefined &&
                        appComponent.config.footer.backgroundColor != undefined &&
                        appComponent.config.footer.backgroundColor != ''
                      ? appComponent.config.footer.backgroundColor
                      : '#ededed',
        }"
    >
        <!-- Carousel for payment providers, shown based on configuration -->
        <app-carousel-providers
            v-if="
                appComponent.config.footer_ != undefined && appComponent.config.footer_.show_payments != undefined
                    ? appComponent.config.footer_.show_payments
                    : appComponent.config.providers.showFooterProviders
            "
        ></app-carousel-providers>

        <!-- Footer menu, shown based on configuration -->
        <app-menu-footer
            v-if="
                appComponent.config.footer_ != undefined && appComponent.config.footer_.show_menu != undefined
                    ? appComponent.config.footer_.show_menu
                    : appComponent.config.footer.showMenuFooter
            "
        ></app-menu-footer>

        <div class="w-10/12 mx-auto">
            <!-- Grid layout for social networks, sponsors, and copyright -->
            <div class="grid md:grid-flow-col auto-cols-fr justify-center mt-4 mb-[9.5rem] mx-auto grid-cols-1 gap-y-9">
                <!-- Social networks section, shown based on configuration -->
                <app-social-networks
                    v-if="
                        appComponent.config.footer_ != undefined &&
                        appComponent.config.footer_.show_social_networks != undefined
                            ? appComponent.config.footer_.show_social_networks
                            : appComponent.config.footer.showSocial
                    "
                ></app-social-networks>

                <!-- Sponsors section, shown based on configuration -->
                <app-sponsors
                    v-if="
                        appComponent.config.footer_ != undefined &&
                        appComponent.config.footer_.show_partners != undefined
                            ? appComponent.config.footer_.show_partners == 1
                            : appComponent.config.footer.showPartners
                    "
                ></app-sponsors>

                <!-- Copyright section -->
                <app-copyright> </app-copyright>
            </div>
            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
        </div>
    </footer>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

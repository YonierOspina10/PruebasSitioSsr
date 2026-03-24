<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import AppMenuFooter3v3 from '../menuFooters/MenuFooter3v3.vue'; // Importing footer component
import AppSocialNetworks from '../socialNetworks/SocialNetworks.vue'; // Importing social networks component
import CarouselProviders3V2 from '../providers/CarouselProviders3V2.vue'; // Importing providers carousel component
import AppSponsors from '../sponsors/Sponsors.vue'; // Importing sponsors component
import AppCopyright from '../copyright/Copyright.vue'; // Importing copyright component
import Sponsors from '../sponsors/Sponsors.vue'; // Importing sponsors component (duplicate)
import Copyright from '../copyright/Copyright.vue';
import AppComplaintsBook from './../complaintsBook/ComplaintsBook.vue'; // Importing copyright component (duplicate)

export default defineComponent({
    components: {
        AppComplaintsBook,
        // Registering components for use in this component
        Copyright,
        Sponsors,
        AppMenuFooter3v3,
        AppSocialNetworks,
        AppSponsors,
        AppCopyright,
        CarouselProviders3V2,
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing global app component
        let lightColor: boolean = false; // State variable for light color theme
        let STYLE_VERSION = // Determining style version from app configuration
            appComponent.config.footer != undefined && appComponent.config.footer['styleVersion'] != undefined
                ? appComponent.config.footer['styleVersion']
                : [];
        let MENU_FOOTER_LIGHT = // Fetching light menu footer configuration
            appComponent.config['MENU_FOOTER_LIGHT'] != undefined &&
            appComponent.config['MENU_FOOTER_LIGHT'][appComponent.country] != undefined
                ? appComponent.config['MENU_FOOTER_LIGHT'][appComponent.country]
                : [];
        let PROVIDERS = // Fetching providers configuration
            appComponent.config['PROVIDERS'] != undefined &&
            appComponent.config['PROVIDERS'][appComponent.country] != undefined
                ? appComponent.config['PROVIDERS'][appComponent.country]
                : [];
        let SOCIAL_NEWTWORKS = // Fetching social networks configuration
            appComponent.config['SOCIAL_NEWTWORKS'] != undefined &&
            appComponent.config['SOCIAL_NEWTWORKS'][appComponent.country] != undefined
                ? appComponent.config['SOCIAL_NEWTWORKS'][appComponent.country]
                : [];
        let SPONSORS = // Fetching sponsors configuration
            appComponent.config.footer != undefined &&
            appComponent.config.footer['sponsors'] != undefined &&
            appComponent.config.footer['sponsors'][appComponent.country] != undefined
                ? appComponent.config.footer['sponsors'][appComponent.country]
                : [];
        let COPYRIGHT = // Fetching copyright information
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['copyright'] != undefined
                ? appComponent.config.footer[appComponent.country]['copyright']
                : '';
        let LICENSE = // Fetching license information
            appComponent.config.footer != undefined && appComponent.config.footer['license'] != undefined
                ? appComponent.config.footer['license']
                : [];
        let DOWLOAD_APP_URL = // Fetching download app URL
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['downloadAppUrl'] != undefined
                ? appComponent.config.footer[appComponent.country]['downloadAppUrl']
                : [];
        let SHOW_VIRTUALSOFT = // Determining whether to show VirtualSoft
            appComponent.config.footer_ != undefined && appComponent.config.footer_['show_virtualsoft'] != undefined
                ? appComponent.config.footer_['show_virtualsoft']
                : appComponent.config.footer['virtualsoft'] != undefined
                  ? appComponent.config.footer['virtualsoft']
                  : false;
        let TEXT_INFO = // Fetching additional text information
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['textInfo'] != undefined
                ? appComponent.config.footer[appComponent.country]['textInfo']
                : '';
        let SHOW_DOWNLOAD_APP = // Determining whether to show download app option
            appComponent.config.footer_ != undefined && appComponent.config.footer_['show_download_app'] != undefined
                ? appComponent.config.footer_['show_download_app']
                : appComponent.config.footer != undefined &&
                    appComponent.config.footer[appComponent.country] != undefined &&
                    appComponent.config.footer[appComponent.country]['showDownloadApp'] != undefined
                  ? appComponent.config.footer[appComponent.country]['showDownloadApp']
                  : false;
        let SHOW_VIRTUALSOFT_COPYRIGHT = // Determining whether to show VirtualSoft copyright
            appComponent.config.footer_ != undefined && appComponent.config.footer_.show_virtualsoft != undefined
                ? appComponent.config.footer_.show_virtualsoft
                : appComponent.config.footer.virtualsoft_right != undefined
                  ? appComponent.config.footer.virtualsoft_right
                  : false;

        return {
            // Returning data properties for use in the template
            appComponent,
            lightColor,
            STYLE_VERSION,
            MENU_FOOTER_LIGHT,
            PROVIDERS,
            SOCIAL_NEWTWORKS,
            SHOW_VIRTUALSOFT_COPYRIGHT,
            SPONSORS,
            COPYRIGHT,
            LICENSE,
            DOWLOAD_APP_URL,
            SHOW_VIRTUALSOFT,
            TEXT_INFO,
            SHOW_DOWNLOAD_APP,
        };
    },
    methods: {
        /**
         * Redirects to a specified URL when a box is clicked.
         * @param box - The box object containing the URL.
         */
        clickBox(box: any) {
            window.location.href = this.config.baseUrlFx + box.url; // Navigating to the specified URL
        },
    },
});
</script>
<template>
    <!-- Footer section of the webpage, containing various components for navigation and information -->
    <footer
        class="in w-full px-2 flex justify-center items-center bg-neutral-content bg-gradient-to-b from-base-300/60 to-base-300/30 py-9"
    >
        <!-- Container for footer content, adjusts styling based on lightColor configuration -->
        <div
            class="flex flex-col justify-center items-center text-info-text"
            :class="appComponent.config.providers.lightColor ? 'light' : ''"
        >
            <!-- Conditional rendering of footer menu component -->
            <appmenufooter3v3
                v-if="
                    appComponent.config.footer_ != undefined && appComponent.config.footer_.show_menu != undefined
                        ? appComponent.config.footer_.show_menu && appComponent.config.footer.styleVersion == 5
                        : appComponent.config.footer.showMenuFooter && appComponent.config.footer.styleVersion == 5
                "
            >
                <!-- Conditional rendering of carousel for payment providers -->
                <carouselproviders3v2
                    v-if="
                        appComponent.config.footer_ != undefined &&
                        appComponent.config.footer_.show_payments != undefined
                            ? appComponent.config.footer_.show_payments
                            : appComponent.config.providers.showFooterProviders
                    "
                    :providers="PROVIDERS"
                >
                    <!-- Grid layout for social networks and sponsors -->
                    <div
                        class="grid grid-cols-2 lg:grid-cols-3 justify-items-center py-10 max-w-[1250px] mx-auto text-info-text gap-7"
                    >
                        <!-- Conditional rendering of social networks component -->
                        <appsocialnetworks
                            v-if="
                                appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.show_social_networks != undefined
                                    ? appComponent.config.footer_.show_social_networks
                                    : appComponent.config.footer.showSocial
                            "
                            :networks="SOCIAL_NEWTWORKS"
                        >
                            <!-- Conditional rendering of sponsors component -->
                            <appsponsors
                                v-if="
                                    appComponent.config.footer_ != undefined &&
                                    appComponent.config.footer_.show_partners != undefined
                                        ? appComponent.config.footer_.show_partners == 1
                                        : appComponent.config.footer.showPartners
                                "
                                :sponsors="SPONSORS"
                                :copyright="COPYRIGHT"
                            >
                                <!-- Copyright information component -->
                                <appcopyright
                                    class="col-span-3 lg:col-span-1"
                                    :license="LICENSE"
                                    :pathdownloadapp="DOWLOAD_APP_URL"
                                    :showvirtualsoft="SHOW_VIRTUALSOFT_COPYRIGHT"
                                    :textinfo="TEXT_INFO"
                                    :showdownloadapp="SHOW_DOWNLOAD_APP"
                                >
                                </appcopyright></appsponsors
                        ></appsocialnetworks>
                    </div> </carouselproviders3v2
            ></appmenufooter3v3>
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

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the footer section of the application.
 * It includes properties for displaying app download links and license information.
 */
export default defineComponent({
    props: {
        license: String, // License information to be displayed
        pathDownloadApp: {
            type: String,
            default: 'landing/app', // Default path for downloading the app
        },
        textInfo: String, // Additional text information to be displayed
        showVirtualsoft: Boolean, // Flag to show/hide Virtualsoft branding
        showDownloadApp: Boolean, // Flag to show/hide Android download link
        showDownloadAppIos: Boolean, // Flag to show/hide iOS download link
    },
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let imgAppIos =
            appComponent.config.footer_ != undefined && appComponent.config.footer_['imgAppIos'] != undefined
                ? appComponent.config.footer_['imgAppIos'] // iOS app image URL
                : 'https://images.virtualsoft.tech/m/msj0212T1739909673.png'; // Default iOS image URL
        let imgAppAndroid =
            appComponent.config.footer_ != undefined && appComponent.config.footer_['imgAppAndroid'] != undefined
                ? appComponent.config.footer_['imgAppAndroid'] // Android app image URL
                : 'https://images.virtualsoft.tech/m/msjT1666886104.png'; // Default Android image URL
        return {
            appComponent,
            imgAppIos,
            imgAppAndroid,
        };
    },
    computed: {
        iosDownloadUrl(): string {
            const footer = this.appComponent.config.footer_;
            const footerCountry = this.appComponent.config.footer?.[this.appComponent.country];

            return (
                footer?.url_download_app_ios ??
                footerCountry?.downloadAppUrlIos ??
                ''
            );
        },
        isAppleDevice(): boolean {
            const ua = navigator.userAgent;

            const isIOS = /iPhone|iPad|iPod|Mac/.test(ua);

            return isIOS;
        }
    },
    methods: {
        handleIosDownload() {
            this.appComponent.gAnalytics('ios_download');

            const url =
                this.appComponent.config.footer_?.url_download_app_ios ??
                this.appComponent.config.footer?.[this.appComponent.country]?.downloadAppUrlIos;

            const isExternalUrl = typeof url === 'string' && /^https?:\/\//i.test(url);

            if (this.isAppleDevice && isExternalUrl) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                this.$router.push('/landing/app-pwa');
            }
        },
        /**
         * Checks if the application version is defined.
         * @returns {boolean} True if the version is defined, otherwise false.
         */
        activeVersionApp() {
            return (window as any).versionApp != undefined; // Version is not defined
        },
    },
});
</script>

<template>
    <!-- Main container for the copyright footer -->
    <div class="copyright-footer flex flex-col justify-start items-center gap-5">
        <!-- Displays additional text information if provided -->
        <span
            v-if="textInfo"
            v-html="textInfo"
        ></span>
        <div class="flex gap-2">
            <!-- Android download link, shown if the flag is true -->
            <RouterLink
                v-if="showDownloadApp"
                @click="appComponent.gAnalytics('android_download')"
                :to="pathDownloadApp"
                id="accion_descargaandroid"
            >
                <img
                    :src="imgAppAndroid"
                    class="mx-auto hover:scale-105 transition-all ease-in-out"
                    height="51"
                    width="150"
                    alt="apk"
                />
                <!-- Displays app version if available -->
                <div
                    v-if="activeVersionApp()"
                    class="pb-5 text-info-text text-lg font-bold"
                >
                    <p>
                        {{ $t('Version de app: ') }}
                        <span>
                            {{
                                appComponent.config['versionApp'] != undefined ? appComponent.config['versionApp'] : ''
                            }}
                        </span>
                    </p>
                </div>
            </RouterLink>
            <!-- iOS download link, shown if the flag is true -->
            <a
                v-if="
                    appComponent.config.footer_?.show_download_app_ios ??
                    appComponent.config.footer?.[appComponent.country]?.showDownloadAppIos
                "
                @click.prevent="handleIosDownload"
                href="#"
                id="accion_descargaios"
                >
                <img
                    :src="appComponent.config.footer_?.imgAppIos ?? 'https://images.virtualsoft.tech/m/msj0212T1739909673.png'"
                    class="mx-auto hover:scale-105 transition-all ease-in-out"
                    height="51"
                    width="150"
                    alt="apk_ios"
                />
                </a>
        </div>
        <!-- Placeholder for eGaming seal -->
        <div
            class="egaming"
            id="ceg-4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
            data-ceg-seal-id="4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
            data-ceg-image-size="25"
            data-ceg-image-type="basic-small"
        ></div>
        <!-- Displays the license information -->
        <p
            class="break-words text-info-text max-w-[280px] text-center"
            v-html="license"
        ></p>
    </div>
</template>

<style scoped>
/* Scoped styles for the footer component can be added here */
</style>

<!-- FILE DOCUMENTED -->

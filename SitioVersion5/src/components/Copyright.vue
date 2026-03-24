<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the footer section of the application.
 */
export default defineComponent({
    data() {
        // Retrieve configuration and application component data
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        return {
            config,
            appComponent,
        };
    },
    computed: {
        iosDownloadUrl(): string {
            const footer = this.config.footer_;
            const footerCountry = this.config.footer?.[this.appComponent.country];

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
                this.config.footer_?.url_download_app_ios ??
                this.config.footer?.[this.appComponent.country]?.downloadAppUrlIos;

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
            if ((window as any).versionApp != undefined) {
                return true;
            } else {
                return false;
            }
        },
    },
});
</script>

<template>
    <!-- Main container for the copyright footer -->
    <div class="copyright-footer">
        <!-- Right section of the footer with conditional layout classes -->
        <div
      class="footer-right text-center text-info-text"
            :class="
                appComponent.config.layout != undefined && appComponent.config.layout == 7
                    ? 'flex flex-col-reverse'
                    : ''
            "
        >
            <!-- Conditional rendering of footer text information -->
            <div
                v-if="
                    config.footer != undefined &&
                    config.footer[appComponent.country] != undefined &&
                    config.footer[appComponent.country].textInfo != undefined &&
                    config.footer[appComponent.country].textInfo != ''
                "
                v-html="config.footer[appComponent.country].textInfo"
            ></div>
            <!-- Container for download app buttons -->
            <div class="flex gap-2 justify-center">
                <!-- Android download link -->
                <RouterLink
                    v-if="
                        config.footer_ != undefined && config.footer_.show_download_app != undefined
                            ? config.footer_.show_download_app
                            : config.footer != undefined &&
                              config.footer[appComponent.country] != undefined &&
                              config.footer[appComponent.country].showDownloadApp != undefined &&
                              config.footer[appComponent.country].showDownloadApp &&
                              appComponent.country != 'mx' &&
                              appComponent.country != 'cl'
                    "
                    @click="appComponent.gAnalytics('android_download')"
                    :to="config.footer_ != undefined && config.footer_.url_download_app != undefined
                        ? config.footer_.url_download_app
                        : config.footer[appComponent.country].downloadAppUrl != undefined
                        ? config.footer[appComponent.country].downloadAppUrl :
                        '/landing/app'"
                    id="accion_descargaandroid"
                    :class="{
                        'block': appComponent.config.layout == 7 && (
                            config.footer_?.version_style == 3 || 
                            (!config.footer_?.version_style && config.footer?.styleVersion == 3)
                         ),
                        'hidden md:block': appComponent.config.layout == 7 && (
                            config.footer_?.version_style == 4 || 
                            (!config.footer_?.version_style && config.footer?.styleVersion == 4)
                         ),
                    }"
                >
                    <img
                        :src="
                            config.footer_ !== undefined && config.footer_.imgAppAndroid !== undefined
                                ? config.footer_.imgAppAndroid
                                : 'https://images.virtualsoft.tech/m/msjT1666886104.png'
                        "
                        class="mx-auto img-info"
                        height="118"
                        width="600"
                        alt="apk"
                    />
                    <!-- Display app version if available -->
                    <div
                        v-if="activeVersionApp()"
                        class="pb-5 text-info-text text-lg font-bold"
                    >
                        <p>
                            {{ $t('Version de app: ') }}
                            <span>
                                {{ config.versionApp }}
                            </span>
                        </p>
                    </div>
                </RouterLink>
                <!-- iOS download link -->
                <a
                v-if="
                    config.footer_?.show_download_app_ios ??
                    config.footer?.[appComponent.country]?.showDownloadAppIos
                "
                @click.prevent="handleIosDownload"
                href="#"
                id="accion_descargaios"
                :class="{
                    'block': appComponent.config.layout == 7 && (
                    config.footer_?.version_style == 3 ||
                    (!config.footer_?.version_style && config.footer?.styleVersion == 3)
                    ),
                    'hidden md:block': appComponent.config.layout == 7 && (
                    config.footer_?.version_style == 4 ||
                    (!config.footer_?.version_style && config.footer?.styleVersion == 4)
                    )
                }"
                >
                <img
                    :src="config.footer_?.imgAppIos ?? 'https://images.virtualsoft.tech/m/msj0212T1739909673.png'"
                    class="mx-auto img-info"
                    height="118"
                    width="600"
                    alt="apk_ios"
                />
                </a>
            </div>
            <!-- eGaming seal container -->
            <div
                class="egaming"
                id="ceg-4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
                data-ceg-seal-id="4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
                data-ceg-image-size="25"
                data-ceg-image-type="basic-small"
            ></div>
            <!-- License information display -->
            <p
                class="break-words text-neutral"
                v-if="config.footer_?.license_ ? config.footer_?.license_ : config.footer?.license"
                :class="
                    appComponent.config.layout !== undefined && appComponent.config.layout == 3
                        ? 'max-w-[280px]'
                        : ''"
                v-html="config.footer_?.license_ ? config.footer_?.license_ : config.footer?.license"
            >
            </p>
        </div>
        <!-- Virtualsoft description section -->
        <div
            v-if="
                (config.footer_ != undefined && config.footer_.show_virtualsoft != undefined
                    ? config.footer_.show_virtualsoft
                    : config.footer.virtualsoft) &&
                config.layout != 3 &&
                config.footer.styleVersion != 4
            "
            class="footer-description w-full text-center"
            style="font-weight: 400"
        >
            <span
                class="text-neutral"
                >{{ $t('Sitio Desarrollado Por') }}</span
            >
            <a
                target="_blank"
                href="https://virtualsoftlatam.com/"
                style="font-weight: bold"
            >
                <img
                    alt="virtualsoft"
                    v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                    class="mx-auto img-info"
                    height="118"
                    width="600"
                />
            </a>
        </div>
        <!-- Regulation icons section -->
        <div
            class="footer-regulation flex justify-center items-center"
            v-if="config != undefined && config.FOOTER_REGULATION != undefined && config.FOOTER_REGULATION.length > 0"
        >
            <a
                v-for="value in config.FOOTER_REGULATION"
                class="regulation-icon"
                aria-label="Regultarions bets"
                :href="value.MENU_URL"
                target="_blank"
            >
                <img
                    :src="value.MENU_ICON"
                    alt="Footer regulation bets"
                    class="m-auto h-full w-full object-contain"
                    width="100"
                    height="50"
                />
            </a>
        </div>
    </div>
</template>

<style>
/* Style for images in the footer */
.img-info {
    width: 150px;
    margin: 15px 0px;
}

/* Margin for the footer description */
.footer-description {
    margin-bottom: 1rem;
}

/* Padding for the footer right section's unordered list */
.footer-right ul {
    padding: 10px 0 0 0;
}

/* Inline display for paragraph elements in the footer right section */
.footer-right p {
    display: inline-block;
}

/* Style for regulation icons */
.regulation-icon {
    width: auto;
    height: 50px;
    display: inline-block;
}

/* Style for regulation images in the footer */
.footer-regulation a img {
    display: inline-block;
    max-width: 170px;
    vertical-align: middle;
    padding: 0 10px;
    max-height: 77px;
}

/* Margin for the footer regulation section */
.footer-regulation {
    margin-top: 20px;
}
</style>

<!-- FILE DOCUMENTED -->

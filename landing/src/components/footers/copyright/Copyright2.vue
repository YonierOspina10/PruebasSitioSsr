<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The component's data object containing appComponent.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component from the Vue instance.
        return {
            appComponent,
        };
    },
    methods: {
        /**
         * Checks if the versionApp property is defined on the window object.
         * @returns {boolean} True if versionApp is defined, otherwise false.
         */
        activeVersionApp() {
            if ((window as any).versionApp != undefined) {
                return true; // versionApp is defined.
            } else {
                return false; // versionApp is not defined.
            }
        },
    },
});
</script>
<template>
    <!-- Footer container with right alignment and centered text -->
    <div class="footer-right text-center">
        <!-- Conditional display of footer text information based on app configuration -->
        <div
            v-if="
                appComponent.config.footer != undefined &&
                appComponent.config.footer[appComponent.country] != undefined &&
                appComponent.config.footer[appComponent.country].textInfo != undefined &&
                appComponent.config.footer[appComponent.country].textInfo != ''
            "
            v-html="appComponent.config.footer[appComponent.country].textInfo"
        ></div>

        <!-- Conditional router link for downloading the app, with analytics tracking -->
        <router-link
            v-if="
                appComponent.config.footer_ != undefined && appComponent.config.footer_.show_download_app != undefined
                    ? appComponent.config.footer_.show_download_app
                    : appComponent.config.footer != undefined &&
                      appComponent.config.footer[appComponent.country] != undefined &&
                      appComponent.config.footer[appComponent.country].showDownloadApp != undefined &&
                      appComponent.config.footer[appComponent.country].showDownloadApp
            "
            @click="appComponent.gAnalytics('android_download')"
            :to="appComponent.config.footer[appComponent.country].downloadAppUrl"
            id="accion_descargaandroid"
            :class="{
                'hidden md:block': appComponent.config.layout != undefined && appComponent.config.layout == 7,
            }"
        >
            <!-- Image for the app download link -->
            <img
                v-lazy="$t('https://images.virtualsoft.tech/m/msjT1666886104.png')"
                class="mx-auto img-info"
                height="118"
                width="600"
                alt="apk"
            />
            <!-- Display of app version if active -->
            <div
                v-if="activeVersionApp()"
                class="pb-5 text-neutral text-lg font-bold"
            >
                <p>
                    {{ $t('Version de app: ') }}
                    <span>
                        {{ appComponent.config.versionApp }}
                    </span>
                </p>
            </div>
        </router-link>

        <!-- eGaming seal container with specific attributes -->
        <div
            class="egaming"
            id="ceg-4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
            data-ceg-seal-id="4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
            data-ceg-image-size="25"
            data-ceg-image-type="basic-small"
        ></div>

        <!-- Conditional display of footer license information -->
        <p
            class="break-words text-neutral"
            v-if="appComponent.config.footer.license"
            :class="
                appComponent.config.layout !== undefined && appComponent.config.layout == 3
                    ? 'max-w-[280px]'
                    : ''
            "
        >
            {{ appComponent.config.footer.license }}
        </p>
    </div>
    <!-- Footer section that conditionally renders based on appComponent configuration -->
    <div
        v-if="
            (appComponent.config.footer_ != undefined && appComponent.config.footer_.show_virtualsoft != undefined
                ? appComponent.config.footer_.show_virtualsoft
                : appComponent.config.footer.virtualsoft) &&
            appComponent.config.layout != 3 &&
            appComponent.config.footer.styleVersion != 4
        "
        class="footer-description w-full text-center"
        style="font-weight: 400"
    >
        <!-- Text indicating the site was developed by Virtualsoft -->
        <span
            class="text-neutral"
            >{{ $t('Sitio Desarrollado Por') }}</span
        >
        <!-- Link to Virtualsoft website with an image -->
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
    <!-- Footer section for displaying regulations, shown conditionally based on app configuration -->
    <div
        class="footer-regulation flex justify-center items-center"
        v-if="
            appComponent.config != undefined &&
            appComponent.config.FOOTER_REGULATION != undefined &&
            appComponent.config.FOOTER_REGULATION.length > 0
        "
    >
        <!-- Loop through each regulation item and create a link with an icon -->
        <a
            v-for="value in appComponent.config.FOOTER_REGULATION"
            class="regulation-icon"
            aria-label="Regultarions bets"
            :href="value.MENU_URL"
            target="_blank"
        >
            <!-- Regulation icon image -->
            <img
                :src="value.MENU_ICON"
                alt="Footer regulation bets"
                class="m-auto h-full w-full object-contain"
                width="100"
                height="50"
            />
        </a>
    </div>
</template>
<style>
/* Styles for image information display */
.img-info {
    width: 150px; /* Fixed width for image */
    margin: 15px 0px; /* Vertical margin */
}

/* Description styling in the footer */
.footer-description {
    margin-bottom: 1rem; /* Space below the description */
}

/* Styling for the right section of the footer */
.footer-right ul {
    padding: 10px 0 0 0; /* Padding at the top */
}

/* Paragraph styling in the right footer section */
.footer-right p {
    display: inline-block; /* Inline display for paragraph */
}

/* Icon styling for regulations */
.regulation-icon {
    width: auto; /* Automatic width */
    height: 50px; /* Fixed height */
    display: inline-block; /* Inline display for icon */
}

/* Image styling for regulation links */
.footer-regulation a img {
    display: inline-block; /* Inline display for image */
    max-width: 170px; /* Maximum width */
    vertical-align: middle; /* Aligns image vertically */
    padding: 0 10px; /* Horizontal padding */
    max-height: 77px; /* Maximum height */
}

/* Margin for regulation section in the footer */
.footer-regulation {
    margin-top: 20px; /* Space above the regulation section */
}
</style>

<!-- FILE DOCUMENTED -->

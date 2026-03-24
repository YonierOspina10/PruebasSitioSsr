<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The data object containing component state.
     */
    data() {
        // Reference to the app component from the Vue instance.
        let appComponent: any = this.$appComponent;
        return {
            appComponent, // Exposing appComponent in the component's data.
        };
    },
});
</script>
<template>
    <!-- Main footer container for social media links -->
    <div
        id="siguenos-footer"
        class="text-center"
    >
        <!-- Conditional rendering of the social widget based on configuration -->
        <div
            v-if="
                appComponent.config.footer_ != undefined && appComponent.config.footer_.social_widget != undefined
                    ? appComponent.config.footer_.social_widget
                    : appComponent.config.footer != undefined &&
                      appComponent.config.footer[appComponent.country] != undefined &&
                      appComponent.config.footer[appComponent.country].social_widget != undefined &&
                      appComponent.config.footer[appComponent.country].social_widget.show
            "
            class="social_widget social-networks"
        >
            <!-- Facebook like button -->
            <div class="social_widget-fb">
                <div
                    class="fb-like"
                    :href="appComponent.config.footer[appComponent.country].social_widget.facebook"
                    target="_blank"
                    data-layout="button_count"
                    data-action="like"
                    data-size="small"
                    data-show-faces="false"
                    data-share="false"
                ></div>
            </div>
            <!-- Twitter follow button -->
            <div class="social_widget-tw">
                <a
                    :href="appComponent.config.footer[appComponent.country].social_widget.twitter"
                    target="_blank"
                    class="twitter-follow-button text-info-text"
                    :class="
                        appComponent.config.layout !== undefined && appComponent.config.layout == 3
                            ? ''
                            : ''
                    "
                    data-lang="es"
                    data-show-count="false"
                    >Follow @doradobet</a
                >
            </div>
        </div>
        <!-- Text indicating to follow on social media -->
        <span
            class="my-2 text-info-text"
            >{{ $t('Síguenos en') }}</span
        >
        <!-- Container for additional social media links -->
        <div
            class="redes-sociales text-info-text"
        >
            <!-- List of social media links -->
            <ul class="flex justify-center items-center gap-4">
                <li
                    v-for="value in appComponent.config['not_login'] != undefined &&
                    appComponent.config['not_login'][appComponent.lngProd] != undefined &&
                    appComponent.config['not_login'][appComponent.lngProd]['social_links'] != undefined
                        ? appComponent.config['not_login'][appComponent.lngProd]['social_links']
                        : appComponent.config.SOCIAL_NEWTWORKS[appComponent.country]"
                    class="hover:scale-125"
                    @click="appComponent.gAnalytics('button_social_network', value)"
                >
                    <!-- Individual social media icon link -->
                    <a
                        class="icons-socials text-info-text"
                        :class="
                            (value.SOCIAL_NAME,
                            appComponent.config.layout !== undefined && appComponent.config.layout == 3
                                ? 'transition-all hover:scale-105'
                                : '')
                        "
                        :href="value.SOCIAL_URL"
                        target="_blank"
                        :aria-label="value.SOCIAL_NAME"
                    >
                        <font-awesome-icon
                            :id="'1.1 RRSS – ' + value.SOCIAL_NAME"
                            v-if="value.SOCIAL_ICON != undefined"
                            :icon="
                                appComponent.config['not_login'] != undefined &&
                                appComponent.config['not_login'][appComponent.lngProd] != undefined &&
                                appComponent.config['not_login'][appComponent.lngProd]['social_links'] != undefined
                                    ? { prefix: 'fab', iconName: value.SOCIAL_ICON }
                                    : value.SOCIAL_ICON
                            "
                        />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scope>
/* Main class for social icons with a specified font size */
.icons-socials {
    font-size: 39px !important; /* Overrides any other font size */
}

/* Facebook icon hover effect */
.icons-socials.Facebook:hover {
    color: #3b5998 !important; /* Changes color on hover */
}

/* Twitter icon hover effect with drop shadow */
.icons-socials.Twitter:hover {
    color: rgb(0, 0, 0) !important; /* Changes color on hover */
    filter: drop-shadow(1px 0px 0px hsl(var(--b1))) /* Adds right drop shadow */
        drop-shadow(-1px 0px 0px hsl(var(--b1))) !important; /* Adds left drop shadow */
}

/* Instagram icon hover effect */
.icons-socials.Instagram:hover {
    color: #ca0284 !important; /* Changes color on hover */
}

/* Whatsapp icon hover effect */
.icons-socials.Whatsapp:hover {
    color: #128c7e !important; /* Changes color on hover */
}

/* Youtube icon hover effect */
.icons-socials.Youtube:hover {
    color: #c4302b !important; /* Changes color on hover */
}

/* LinkedIn icon hover effect */
.icons-socials.LinkedIN:hover {
    color: #0b66c2 !important; /* Changes color on hover */
}

/* Telegram icon hover effect */
.icons-socials.Telegram:hover {
    color: #229ed9 !important; /* Changes color on hover */
}
/* Change color to white on hover for Threads social icon */
.icons-socials.Threads:hover {
    color: #ffffff !important;
}

/* Change color to black on hover for Tiktok social icon */
.icons-socials.Tiktok:hover {
    color: #000000 !important;
}

/* Add top margin to the footer section */
div#siguenos-footer {
    margin-top: 1rem;
}

/* Remove default padding from the unordered list in social networks */
.redes-sociales ul {
    padding-left: 0;
}

/* Set full width and fixed height for social networks container */
.social-networks {
    width: 100%;
    height: 40px;
}

/* Style for Facebook social widget */
.social_widget-fb {
    display: inline-block; /* Aligns widget inline */
    vertical-align: top; /* Aligns widget to the top */
    padding: 0 3px; /* Horizontal padding */
}

/* Style for Twitter social widget */
.social_widget-tw {
    display: inline-block; /* Aligns widget inline */
    padding: 0 3px; /* Horizontal padding */
}
</style>

<!-- FILE DOCUMENTED -->

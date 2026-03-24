<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling network data.
 */
export default defineComponent({
    /**
     * Component props definition.
     * @property {Object} networks - The networks object passed to the component.
     */
    props: {
        networks: Object,
    },

    /**
     * Component data function.
     * @returns {Object} The component's reactive data properties.
     */
    data() {
        /**
         * Reference to the app component instance.
         * @type {any}
         */
        let appComponent: any = this.$appComponent;

        return {
            appComponent,
        };
    },
});
</script>
<template>
    <!-- Main footer section for social media links -->
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
                    class="twitter-follow-button"
                    :class="
                        appComponent.config.layout !== undefined && appComponent.config.layout == 3
                            ? 'text-info-text'
                            : ''
                    "
                    data-lang="es"
                    data-show-count="false"
                    >Follow @doradobet</a
                >
            </div>
        </div>
        <!-- Text prompting users to follow on social media -->
        <span class="my-2 text-info-text">{{ $t('Síguenos en') }}</span>
        <!-- List of social media icons -->
        <ul
            class="flex justify-center items-center my-4 flex-wrap"
            :class="appComponent.config.layout !== undefined && appComponent.config.layout == 4 ? 'gap-6' : 'gap-4'"
        >
            <!-- Iterates through social networks to create list items -->
            <li
                v-for="value in networks"
                class="hover:scale-125"
            >
                <a
                    class="icons-socials text-info-text hover:scale-105 text-5xl transition-all ease-in-out"
                    :href="value.SOCIAL_URL"
                    target="_blank"
                    :aria-label="value.SOCIAL_NAME"
                >
                    <!-- Font Awesome icon for each social network -->
                    <font-awesome-icon
                        :id="'1.1 RRSS – ' + value.SOCIAL_NAME"
                        v-if="value.SOCIAL_ICON != undefined"
                        :icon="networks != undefined
									? {
											prefix: 'fab',
											iconName: value.SOCIAL_ICON.includes('x') ? 'x-twitter' : value.SOCIAL_ICON,
										}
									: value.SOCIAL_ICON"
                        class="transition-all ease-in-out"
                    />
                </a>
            </li>
        </ul>
    </div>
</template>
<style scope>
/* Facebook icon hover effect */
.icons-socials.Facebook:hover {
    color: #3b5998 !important; /* Change color to Facebook blue */
}

/* Twitter icon hover effect */
.icons-socials.Twitter:hover {
    color: red !important; /* Change color to red */
    /* Apply drop-shadow effect */
    filter: drop-shadow(1px 0px 0px hsl(var(--b1))) drop-shadow(-1px 0px 0px hsl(var(--b1))) !important;
}

/* Instagram icon hover effect */
.icons-socials.Instagram:hover {
    color: #ca0284 !important; /* Change color to Instagram pink */
}

/* Whatsapp icon hover effect */
.icons-socials.Whatsapp:hover {
    color: #128c7e !important; /* Change color to Whatsapp green */
}

/* Youtube icon hover effect */
.icons-socials.Youtube:hover {
    color: #c4302b !important; /* Change color to Youtube red */
}

/* LinkedIn icon hover effect */
.icons-socials.LinkedIN:hover {
    color: #0b66c2 !important; /* Change color to LinkedIn blue */
}

/* Telegram icon hover effect */
.icons-socials.Telegram:hover {
    color: #229ed9 !important; /* Change color to Telegram blue */
}

/* Threads icon hover effect */
.icons-socials.Threads:hover {
    color: #ffffff !important; /* Change color to white */
    /* Apply drop-shadow effect */
    filter: drop-shadow(1px 0px 0px hsl(var(--b1))) drop-shadow(-1px 0px 0px hsl(var(--b1)));
}

/* Tiktok icon hover effect */
.icons-socials.Tiktok:hover {
    color: #000000 !important; /* Change color to black */
}
</style>

<!-- FILE DOCUMENTED -->

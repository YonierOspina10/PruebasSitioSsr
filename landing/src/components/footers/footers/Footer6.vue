<script lang="ts">
import { defineComponent } from 'vue';
import AppComplaintsBook from './../complaintsBook/ComplaintsBook.vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    components: { AppComplaintsBook },
    /**
     * Setup function for the component.
     * @returns An empty object for reactive state.
     */
    setup() {
        return {};
    },

    /**
     * Data function to initialize component state.
     * @returns An object containing configuration, app component, and zendesk instance.
     */
    data() {
        let config = this.$config(); // Fetches the configuration object.
        let appComponent: any = this.$appComponent; // References the app component.
        let zendesk: any = this.$zendesk; // References the zendesk instance.
        return {
            config,
            appComponent,
            zendesk,
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     * Updates the footer menu configuration if certain conditions are met.
     */
    mounted() {
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config['not_login'] != undefined &&
            this.appComponent.config['not_login']['menu_footer'] != undefined
        ) {
            this.appComponent.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
                this.config['not_login']['menu_footer']; // Sets the footer menu based on config.
        }
    },

    /**
     * Methods available in the component.
     */
    methods: {
        /**
         * Scrolls the main layout to the top.
         */
        scrollTop() {
            const scroll: any = document.getElementById('main-layout'); // Gets the main layout element.
            if (scroll != undefined) {
                scroll.scrollTo(0, 0); // Scrolls to the top.
            }
        },

        /**
         * Opens a modal with information based on the provided parameter.
         * @param param - The parameter to determine which modal to show.
         */
        openModalInfo(param: any) {
            if (param == 'accion_modal') {
                this.appComponent.modal.showModal = 'data'; // Sets the modal to show data.
                this.appComponent.infoModal.dataText =
                    'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Sets the modal text.
            }
        },

        /**
         * Opens the Zendesk chat.
         */
        onOpenChat() {
            this.zendesk.zE(this.appComponent.config.zendesk[this.appComponent.country].name, 'open'); // Opens the Zendesk chat.
            this.zendesk.zE(this.appComponent.config.zendesk[this.appComponent.country].name, 'show'); // Shows the Zendesk chat.
        },

        /**
         * Checks if the application version is defined.
         * @returns True if the version is defined, otherwise false.
         */
        activeVersionApp() {
            if ((window as any).versionApp != undefined) {
                return true; // Version is defined.
            } else {
                return false; // Version is not defined.
            }
        },
    },
});
</script>
<template>
    <!-- Footer section of the webpage, contains navigation links and social media widgets -->
    <footer
        class="bg-base-300 rounded-t-[25px] desktop:rounded-t-[50px] pb-32 xl:pb-24 px-4 pt-8 tablet:px-8 w-full flex flex-col justify-start items-center gap-4 desktop:gap-20"
    >
        <!-- Main section for footer navigation links, displayed conditionally based on configuration -->
        <section
            class="w-full grid grid-cols-2 tablet:grid-cols-4 justify-center items-start gap-y-14 gap-x-5 desktop:gap-x-20 py-5 mx-auto max-w-[1155px]"
            v-if="
                appComponent.config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
                appComponent.config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
            "
        >
            <!-- Loop through each menu item in the footer -->
            <div
                v-for="value in appComponent.config.MENU_FOOTER_LIGHT[appComponent.country]"
                class="flex flex-col justify-center items-start"
            >
                <span class="text-info-text text-start desktop:text-xl font-bold mb-3">{{ $t(value.MENU_TITLE) }}</span>
                <ul class="flex flex-col justify-center items-start gap-y-2">
                    <!-- Loop through each submenu item -->
                    <li
                        v-for="submenu in value.MENU_LIST"
                        class="w-full text-start py-1"
                    >
                        <!-- Link for submenu item that opens in the same tab -->
                        <RouterLink
                            v-if="submenu.TARGER == 'self'"
                            :to="submenu.MENU_URL"
                            :aria-label="submenu.MENU_TITLE"
                        >
                            <span
                                :id="`footer-${submenu.MENU_ID}`"
                                :aria-label="submenu.MENU_TITLE"
                                :class="submenu.MENU_SECCION"
                                @click="
                                    scrollTop();
                                    openModalInfo(submenu.MENU_ID);
                                    appComponent.gAnalytics('interaction_footer', {
                                        section: value.MENU_TITLE,
                                        element: submenu.MENU_TITLE,
                                    });
                                "
                                class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
                                >{{ $t(submenu.MENU_TITLE) }}</span
                            >
                        </RouterLink>
                        <!-- Link for submenu item that opens in a new tab -->
                        <a
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'blank'"
                            :aria-label="submenu.MENU_TITLE"
                            :href="submenu.MENU_URL"
                            target="_blank"
                            :class="submenu.MENU_SECCION"
                            class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
                            >{{ $t(submenu.MENU_TITLE) }}</a
                        >
                        <!-- Button for submenu item that opens a chat -->
                        <button
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'chat'"
                            @click="onOpenChat()"
                            :aria-label="submenu.MENU_TITLE"
                            :class="submenu.MENU_SECCION"
                            class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
                        >
                            {{ $t(submenu.MENU_TITLE) }}
                        </button>
                    </li>
                </ul>
            </div>
        </section>
        <!-- Section for social media links and copyright information -->
        <section class="flex flex-col justify-start items-center w-full gap-6 max-w-[1155px]">
            <!-- Conditional rendering of social media widget -->
            <div
                v-if="
                    appComponent.config.footer_ != undefined && appComponent.config.footer_.social_widget != undefined
                        ? appComponent.config.footer_.social_widget
                        : appComponent.config.footer != undefined &&
                          appComponent.config.footer[appComponent.country] != undefined &&
                          appComponent.config.footer[appComponent.country].social_widget != undefined &&
                          appComponent.config.footer[appComponent.country].social_widget.show
                "
                class="social_widget social-networks mb-8"
            >
                <div class="social_widget-fb">
                    <!-- Facebook like button -->
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
                <div class="social_widget-tw">
                    <!-- Twitter follow button -->
                    <a
                        :href="appComponent.config.footer[appComponent.country].social_widget.twitter"
                        target="_blank"
                        class="twitter-follow-button text-info-text"
                        data-lang="es"
                        data-show-count="false"
                        >Follow @doradobet</a
                    >
                </div>
            </div>
            <div class="flex justify-center items-center flex-col gap-4">
                <span class="text-info-text text-xl">{{ $t('Síguenos en:') }}</span>
                <ul class="flex justify-center items-center gap-8">
                    <!-- Loop through social links -->
                    <li
                        v-for="value in appComponent.config['not_login'] != undefined &&
                        appComponent.config['not_login'][appComponent.lngProd] != undefined &&
                        appComponent.config['not_login'][appComponent.lngProd]['social_links'] != undefined
                            ? appComponent.config['not_login'][appComponent.lngProd]['social_links']
                            : appComponent.config.SOCIAL_NEWTWORKS[appComponent.country]"
                        @click="appComponent.gAnalytics('button_social_network', value)"
                    >
                        <a
                            class="transition-all text-info-text hover:scale-105"
                            :href="value.SOCIAL_URL"
                            target="_blank"
                            :aria-label="value.SOCIAL_NAME"
                        >
                            <div
                                v-html="value.SOCIAL_ICON"
                                class="icons-socials w-[40px] h-[40px] tablet:w-[60px] tablet:h-[60px] aspect-square border rounded-full p-2 flex justify-center items-center hover:scale-110 transition-transform duration-300 ease-in-out"
                                :class="value.SOCIAL_NAME"
                            ></div>
                        </a>
                    </li>
                </ul>
            </div>
            <hr class="bg-neutral-focus h-[2px] w-[70%] desktop::w-2/3 rounded-full border-none my-2" />
            <div class="copyright-footer w-full flex justify-center items-center flex-col gap-4">
                <div class="footer-right text-center">
                    <!-- Conditional rendering of footer text information -->
                    <div
                        v-if="
                            appComponent.config.footer != undefined &&
                            appComponent.config.footer[appComponent.country] != undefined &&
                            appComponent.config.footer[appComponent.country].textInfo != undefined &&
                            appComponent.config.footer[appComponent.country].textInfo != ''
                        "
                        v-html="appComponent.config.footer[appComponent.country].textInfo"
                        class="max-w-xl desktop:max-w-5xl text-info-text text-center flex justify-center items-center mx-auto gap-2 text-xs desktop:text-base"
                    ></div>
                </div>
                <span class="text-info-text">{{ $t('Sitio Desarrollado Por') }}</span>
                <div
                    class="flex justify-center items-center gap-0 tablet:gap-20 flex-col tablet:flex-row desktop:flex-col"
                >
                    <!-- Conditional rendering of Virtualsoft logo -->
                    <div
                        v-if="
                            appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.show_virtualsoft != undefined
                                ? appComponent.config.footer_.show_virtualsoft
                                : appComponent.config.footer.virtualsoft
                        "
                    >
                        <a
                            target="_blank"
                            href="https://virtualsoftlatam.com/"
                            class="w-[150px]"
                        >
                            <img
                                alt="virtualsoft"
                                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                                height="61"
                                width="300"
                                class="w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
                            />
                        </a>
                    </div>
                    <div class="flex flex-col tablet:flex-row justify-center items-center tablet:gap-8">
                        <!-- Conditional rendering of +18 Years logo -->
                        <div
                            v-if="
                                appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.show_18_more != undefined
                                    ? appComponent.config.footer_.show_18_more
                                    : appComponent.config.footer.show18text
                            "
                            class="flex justify-center items-center w-[80px] h-[80px] aspect-square"
                        >
                            <img
                                v-lazy="appComponent.config.footer.show18text.src"
                                width="63"
                                height="63"
                                alt="+18 Años"
                                class="w-full h-full object-contain"
                            />
                        </div>
                        <!-- Link to download the app -->
                        <RouterLink
                            v-if="
                                appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.show_download_app != undefined
                                    ? appComponent.config.footer_.show_download_app
                                    : appComponent.config.footer != undefined &&
                                      appComponent.config.footer[appComponent.country] != undefined &&
                                      appComponent.config.footer[appComponent.country].showDownloadApp != undefined &&
                                      appComponent.config.footer[appComponent.country].showDownloadApp
                            "
                            @click="appComponent.gAnalytics('android_download')"
                            :to="appComponent.config.footer[appComponent.country].downloadAppUrl"
                            id="accion_descargaandroid"
                            class="hover:scale-110 transition-transform duration-300 ease-in-out"
                        >
                            <img
                                v-lazy="$t('https://images.virtualsoft.tech/m/msjT1666886104.png')"
                                class="mx-auto img-info"
                                height="118"
                                width="600"
                                alt="apk"
                            />
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
            </div>
        </section>
    </footer>
</template>
<style scoped>
/* Social media icons styling */
.icons-socials {
    font-size: 60px !important; /* Sets the font size for social icons */
}

/* Hover effect for Facebook icon */
.icons-socials.Facebook:hover {
    color: #3b5998 !important; /* Changes color on hover */
}

/* Hover effect for X icon */
.icons-socials.X:hover {
    color: rgb(0, 0, 0) !important; /* Changes color on hover */
}

/* Hover effect for Instagram icon */
.icons-socials.Instagram:hover {
    color: #ca0284 !important; /* Changes color on hover */
}

/* Hover effect for Whatsapp icon */
.icons-socials.Whatsapp:hover {
    color: #128c7e !important; /* Changes color on hover */
}

/* Hover effect for Youtube icon */
.icons-socials.Youtube:hover {
    color: #c4302b !important; /* Changes color on hover */
}

/* Hover effect for LinkedIn icon */
.icons-socials.LinkedIN:hover {
    color: #0b66c2 !important; /* Changes color on hover */
}

/* Hover effect for Telegram icon */
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
    display: inline-block; /* Allows elements to sit next to each other */
    vertical-align: top; /* Aligns the widget to the top */
    padding: 0 3px; /* Adds horizontal padding */
}

/* Style for Twitter social widget */
.social_widget-tw {
    display: inline-block; /* Allows elements to sit next to each other */
    padding: 0 3px; /* Adds horizontal padding */
}
</style>

<!-- FILE DOCUMENTED -->

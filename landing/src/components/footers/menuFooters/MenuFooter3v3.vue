<script lang="ts">
import { defineComponent } from 'vue';
import AppSocialNetworks from '../socialNetworks/SocialNetworks.vue';

/**
 * Vue component definition for the main application component.
 */
export default defineComponent({
    /**
     * Component's reactive data properties.
     * @returns {Object} The data object containing configuration, app component, and zendesk instance.
     */
    data() {
        let config = this.$config(); // Retrieves the application configuration.
        let appComponent: any = this.$appComponent; // Reference to the application component.
        let zendesk: any = this.$zendesk; // Reference to the Zendesk instance.
        return {
            config,
            appComponent,
            zendesk,
        };
    },

    /**
     * Components used within this component.
     */
    components: {
        AppSocialNetworks, // Social networks component.
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {
        // Checks if the configuration for the footer menu is defined and assigns it.
        if (
            this.appComponent.config != undefined &&
            this.appComponent.config['not_login'] != undefined &&
            this.appComponent.config['not_login']['menu_footer'] != undefined
        ) {
            this.appComponent.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
                this.appComponent.config['not_login']['menu_footer'];
        }
    },

    /**
     * Methods available in the component.
     */
    methods: {
        /**
         * Opens a modal with information based on the provided parameter.
         * @param {any} param - The parameter to determine which modal to open.
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
    },
});
</script>
<template>
    <!-- Main container for the footer menu, displayed conditionally based on configuration -->
    <div
        v-if="
            appComponent.config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
            appComponent.config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
        "
        class="w-full flex flex-col md:flex-row justify-center items-center"
    >
        <!-- Grid container for footer items, responsive layout with conditional text alignment -->
        <div
            class="grid grid-cols-2 md:grid-cols-4 justify-center items-start gap-y-5 gap-x-5 lg:gap-x-12 pb-10 px-10 w-full max-w-[1250px] border-solid border-b-1 border-neutral"
            :class="{
                'text-center':
                    appComponent.config.footer_ != undefined && appComponent.config.footer_.version_style != undefined
                        ? appComponent.config.footer_.version_style == 2
                        : appComponent.config.footer.styleVersion == 2,
            }"
        >
            <!-- Loop through each footer menu item -->
            <div
                v-for="value in appComponent.config.MENU_FOOTER_LIGHT[appComponent.country]"
                class="flex flex-col justify-center items-start"
            >
                <!-- Title for each menu item -->
                <span class="text-neutral text-start text-sm md:text-xl font-bold">{{ $t(value.MENU_TITLE) }}</span>
                <!-- List of submenu items -->
                <ul class="flex flex-col justify-center items-start leading-4">
                    <!-- Loop through each submenu item -->
                    <li
                        v-for="submenu in value.MENU_LIST"
                        class="w-full text-start"
                    >
                        <!-- Router link for submenu targeting the same window -->
                        <RouterLink
                            v-if="submenu.TARGER == 'self'"
                            :to="submenu.MENU_URL"
                            :aria-label="submenu.MENU_TITLE"
                        >
                            <span
                                :id="`footer-${submenu.MENU_ID}`"
                                :aria-label="submenu.MENU_TITLE"
                                :class="submenu.MENU_SECCION"
                                @click="openModalInfo(submenu.MENU_ID)"
                                class="text-neutral hover:underline text-xs font-light text-start"
                                >{{ $t(submenu.MENU_TITLE) }}</span
                            >
                        </RouterLink>
                        <!-- Anchor link for submenu targeting a new tab -->
                        <a
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'blank'"
                            :aria-label="submenu.MENU_TITLE"
                            :href="submenu.MENU_URL"
                            target="_blank"
                            :class="submenu.MENU_SECCION"
                            class="text-neutral hover:underline text-xs font-light text-start"
                            >{{ $t(submenu.MENU_TITLE) }}</a
                        >
                        <!-- Button for submenu targeting chat functionality -->
                        <button
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'chat'"
                            @click="onOpenChat()"
                            :aria-label="submenu.MENU_TITLE"
                            :class="submenu.MENU_SECCION"
                            class="text-neutral hover:text-accent-focus text-xs lg:text-sm text-start"
                        >
                            {{ $t(submenu.MENU_TITLE) }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

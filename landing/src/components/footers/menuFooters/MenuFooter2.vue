<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for the main application component.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let appComponent: any = this.$appComponent; // Reference to the global app component
        return {
            appComponent, // Exposing appComponent to the template
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     * Updates the MENU_FOOTER_LIGHT configuration if certain conditions are met.
     */
    mounted() {
        if (
            this.config != undefined && // Check if config is defined
            this.config['not_login'] != undefined && // Check if not_login is defined
            this.config['not_login']['menu_footer'] != undefined // Check if menu_footer is defined
        ) {
            this.config.MENU_FOOTER_LIGHT[this.appComponent.country] = this.config['not_login']['menu_footer']; // Assign menu_footer to the corresponding country
        }
    },

    methods: {
        /**
         * Scrolls the main layout to the top.
         */
        scrollTop() {
            const scroll: any = document.getElementById('main-layout'); // Get the main layout element
            if (scroll != undefined) {
                scroll.scrollTo(0, 0); // Scroll to the top
            }
        },

        /**
         * Opens a modal with information based on the provided parameter.
         * @param {any} param - The parameter to determine which modal to show.
         */
        openModalInfo(param: any) {
            if (param == 'accion_modal') {
                // Check if the parameter matches
                this.appComponent.modal.showModal = 'data'; // Set modal visibility
                this.appComponent.infoModal.dataText =
                    'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Set modal text
            }
        },
    },
});
</script>
<template>
    <!-- Main footer container with dynamic background and visibility based on configuration -->
    <div
        class="bg-base-300 footer block pt-6"
        :style="{
            background:
                appComponent.config.footer != undefined && appComponent.config.footer.background != undefined
                    ? appComponent.config.footer.background
                    : '',
        }"
        v-if="
            appComponent.config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
            appComponent.config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
        "
    >
        <!-- Inner container for footer content with styling and border -->
        <div class="container-footer w-10/12 mx-auto block pb-6 border-b-1 border-solid border-[#d5d5d5]">
            <!-- Footer sections arranged in a grid layout -->
            <div
                class="footer-section grid md:grid-flow-col auto-cols-fr justify-center mt-4 grid-cols-2 gap-4"
                :class="[
                    {
                        'text-center':
                            appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.version_style != undefined
                                ? appComponent.config.footer_.version_style == 2
                                : appComponent.config.footer.styleVersion == 2,
                    },
                    {
                        'border-primary-content border-b-2':
                            appComponent.config.layout != undefined && appComponent.config.layout == 7,
                    },
                ]"
            >
                <!-- Loop through footer menu items -->
                <div
                    v-for="value in appComponent.config.MENU_FOOTER_LIGHT[appComponent.country]"
                    class="footer-menu"
                >
                    <!-- Menu title with dynamic styling -->
                    <span
                        class="uppercase text-lg font-bold ng-scope ng-binding text-neutral-text"
                        >{{ $t(value.MENU_TITLE) }}</span
                    >
                    <!-- Submenu list -->
                    <ul class="my-3 text-info-text">
                        <!-- Loop through submenu items -->
                        <li
                            v-for="submenu in value.MENU_LIST"
                            class="my-2 py-2 md:p-0"
                        >
                            <!-- RouterLink for internal navigation -->
                            <RouterLink
                                @click="
                                    appComponent.gAnalytics('interaction_footer', {
                                        section: value.MENU_TITLE,
                                        element: submenu.MENU_TITLE,
                                    })
                                "
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
                                    "
                                    >{{ $t(submenu.MENU_TITLE) }}</span
                                >
                            </RouterLink>
                            <!-- Anchor link for external navigation -->
                            <a
                                :id="submenu.MENU_ID"
                                v-if="submenu.TARGER == 'blank'"
                                :aria-label="submenu.MENU_TITLE"
                                :href="submenu.MENU_URL"
                                target="_blank"
                                :class="submenu.MENU_SECCION"
                                >{{ $t(submenu.MENU_TITLE) }}</a
                            >
                            <a
                                :id="submenu.MENU_ID"
                                v-if="submenu.TARGER == '_top'"
                                :aria-label="submenu.MENU_TITLE"
                                :href="submenu.MENU_URL"
                                target="_top"
                                :class="submenu.MENU_SECCION"
                                >{{ $t(submenu.MENU_TITLE) }}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>

<!-- FILE DOCUMENTED -->

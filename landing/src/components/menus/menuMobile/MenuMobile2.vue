<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import IconClose from '../../icons/CloseIcon.vue'; // Importing CloseIcon component
import SelectLanguage from '../../i18n/SelectLanguage.vue'; // Importing SelectLanguage component

export default defineComponent({
    components: {
        IconClose, // Registering IconClose component
        SelectLanguage, // Registering SelectLanguage component
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing appComponent from Vue instance
        let openSelectLang = false; // State to track if language selection is open
        return {
            appComponent, // Returning appComponent for use in the template
            openSelectLang, // Returning openSelectLang state
        };
    },
    methods: {
        /**
         * Opens the chat interface if the current configuration matches 'centribal'.
         */
        onOpenChat() {
            if (
                this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal' // Check if the current country configuration is 'centribal'
            ) {
                let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_iframe_hidden'); // Remove hidden class to show chat
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_iframe_open'); // Add class to open chat
                postMessage('show_chat', '', ref_id); // Send message to show chat
            }
            this.closeMenuMobile(); // Close mobile menu after opening chat
        },

        /**
         * Closes the mobile menu by unchecking the main menu checkbox.
         */
        closeMenuMobile() {
            (document.getElementById('main-menu') as any).checked = false; // Uncheck main menu
        },

        /**
         * Toggles the display of a service menu based on its current state.
         * @param id - The identifier for the service menu to toggle.
         */
        menuService(id: any) {
            if (
                (document.getElementById('menuService-' + id) as any).style.display == 'block' // Check if the service menu is currently displayed
            ) {
                (document.getElementById('menuService-' + id) as any).style.display = 'none'; // Hide the service menu
            } else {
                (document.getElementById('menuService-' + id) as any).style.display = 'block'; // Show the service menu
            }
        },
    },
});
</script>
<template>
    <!-- Main container for the side drawer, hidden on large screens -->
    <div class="drawer-side overflow-y-hidden lg:hidden z-50">
        <!-- Overlay label for closing the sidebar -->
        <label
            for="main-menu"
            class="drawer-overlay"
        ></label>
        <!-- Sidebar container -->
        <aside
            class="flex flex-col border-r border-neutral-content bg-neutral-content text-neutral lg:hidden h-full fixed top-0 left-0 w-full"
        >
            <!-- Section for the sidebar content -->
            <section class="h-auto bg-gradient-to-b from-accent-content to-neutral-content overflow-y-auto">
                <!-- Navbar container -->
                <div class="mx-auto navbar max-w-none h-11 min-h-0 w-full flex justify-between">
                    <!-- Language selection component -->
                    <SelectLanguage
                        v-if="
                            appComponent.config.header_ != undefined &&
                            appComponent.config.header_.change_language != undefined
                                ? appComponent.config.header_.change_language
                                : appComponent.config.language.showSelectLang
                        "
                    />
                    <!-- Close sidebar label -->
                    <label
                        for="main-menu"
                        aria-label="close sidebar"
                        class="drawer-overlay"
                    >
                        <IconClose class="fill-neutral w-8 h-8" />
                    </label>
                </div>
                <!-- Main content area of the sidebar -->
                <div class="h-full w-full">
                    <div class="menu flex flex-col p-4 compact">
                        <div>
                            <!-- Menu items list -->
                            <ul class="flex flex-col gap-6">
                                <li
                                    v-for="value in appComponent.config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                                    v-bind:class="{ shadow: value.SHADOW == 1 }"
                                    :class="value.MENU_SECCION"
                                >
                                    <!-- Router link for menu items -->
                                    <RouterLink
                                        :id="`mobile-${value.MENU_ID}`"
                                        class="text-base font-bold"
                                        :class="
                                            value.MENU_ID == 'accion_registro'
                                                ? 'bg-success'
                                                : '' || value.MENU_ID == 'accion_inicio'
                                                  ? 'bg-primary-content text-neutral-content'
                                                  : ''
                                        "
                                        v-if="value.TARGER !== 'blank' && value.TARGER !== 'chat'"
                                        :to="appComponent.config.baseUrlFx + value.MENU_URL"
                                        :title="value.MENU_TITLE"
                                        @click="closeMenuMobile()"
                                    >
                                        <!-- Icon for menu item -->
                                        <span
                                            v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                            :class="'text-3xl pr-3 ' + value.MENU_ICON"
                                        ></span>
                                        <img
                                            class="mr-3"
                                            width="25"
                                            height="25"
                                            v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                            :alt="value.MENU_TITLE"
                                            v-lazy="value.MENU_ICON"
                                        />
                                        <span>{{ $t(value.MENU_TITLE) }}</span>
                                        <div
                                            v-if="value.ICON != undefined"
                                            class="svg"
                                            v-html="value.ICON"
                                        ></div>
                                    </RouterLink>
                                    <!-- External link for menu items -->
                                    <a
                                        :id="value.MENU_ID"
                                        class="text-xl"
                                        v-if="value.TARGER == 'blank'"
                                        :href="value.MENU_URL"
                                        target="_blank"
                                        :title="value.MENU_TITLE"
                                        @click="closeMenuMobile()"
                                    >
                                        <span
                                            v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                            :class="'text-2xl pr-3 ' + value.MENU_ICON"
                                        ></span>
                                        <img
                                            class="mr-3"
                                            width="25"
                                            height="25"
                                            v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                            :alt="value.MENU_TITLE"
                                            v-lazy="value.MENU_ICON"
                                        />
                                        <span>{{ $t(value.MENU_TITLE) }}</span>
                                        <div
                                            v-if="value.ICON != undefined"
                                            class="svg"
                                            v-html="value.ICON"
                                        ></div>
                                    </a>
                                    <!-- Button for chat action -->
                                    <button
                                        id="accion_chat"
                                        v-if="value.TARGER == 'chat'"
                                        @click="onOpenChat()"
                                        class="text-base font-bold"
                                    >
                                        <span
                                            v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                            :class="'text-2xl pr-3 ' + value.MENU_ICON"
                                        ></span>
                                        <img
                                            class="mr-3"
                                            width="25"
                                            height="25"
                                            v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                            :alt="value.MENU_TITLE"
                                            v-lazy="value.MENU_ICON"
                                        />
                                        <span>{{ $t(value.MENU_TITLE) }}</span>
                                        <div
                                            v-if="value.ICON != undefined"
                                            class="svg"
                                            v-html="value.ICON"
                                        ></div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="pt-10">
                            <!-- Section for additional menu items -->
                            <ul>
                                <li class="">
                                    <span class="text-neutral font-bold text-xl">{{ $t('OTROS') }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li v-for="value in appComponent.config.MENU_FOOTER[appComponent.country]">
                                    <!-- Router link for footer menu items -->
                                    <RouterLink
                                        :id="value.MENU_ID"
                                        v-if="value.MENU_TARGET != '_blank'"
                                        :to="value.MENU_URL"
                                        :title="value.MENU_TITLE"
                                        @click="closeMenuMobile()"
                                    >
                                        <span> {{ $t(value.MENU_TITLE) }} </span>
                                    </RouterLink>
                                    <!-- External link for footer menu items -->
                                    <a
                                        :id="value.MENU_ID"
                                        v-if="value.MENU_TARGET == '_blank'"
                                        :href="value.MENU_URL"
                                        target="_blank"
                                        :title="value.MENU_TITLE"
                                        @click="closeMenuMobile()"
                                    >
                                        <span> {{ $t(value.MENU_TITLE) }} </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </aside>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

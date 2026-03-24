<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconClose from '../../icons/CloseIcon.vue'; // Importing a close icon component
import SelectLanguage from '../../i18n/SelectLanguage.vue'; // Importing a language selection component

export default defineComponent({
    components: {
        IconClose, // Registering the close icon component
        SelectLanguage, // Registering the language selection component
    },
    data() {
        let appComponent: any = this.$appComponent; // Storing the app component reference
        let openSelectLang = false; // State to track if the language selector is open
        return {
            appComponent, // Exposing appComponent to the template
            openSelectLang, // Exposing openSelectLang to the template
        };
    },
    methods: {
        /**
         * Opens the chat interface if the current configuration matches 'centribal'.
         */
        onOpenChat() {
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
                let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_iframe_hidden'); // Removing hidden class to show chat
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_iframe_open'); // Adding open class to display chat
                postMessage('show_chat', '', ref_id); // Sending a message to show the chat
            }
            this.closeMenuMobile(); // Closing the mobile menu after opening chat
        },

        /**
         * Closes the mobile menu by unchecking the main menu checkbox.
         */
        closeMenuMobile() {
            (document.getElementById('main-menu') as any).checked = false; // Unchecking the main menu
        },

        /**
         * Toggles the display of a service menu based on its current state.
         * @param id - The identifier for the service menu to toggle.
         */
        menuService(id: any) {
            if ((document.getElementById('menuService-' + id) as any).style.display == 'block') {
                (document.getElementById('menuService-' + id) as any).style.display = 'none'; // Hides the service menu if currently displayed
            } else {
                (document.getElementById('menuService-' + id) as any).style.display = 'block'; // Shows the service menu if currently hidden
            }
        },
    },
});
</script>
<template>
    <!-- Main container for the sidebar drawer, hidden on large screens -->
    <div class="drawer-side overflow-y-hidden lg:hidden z-50">
        <!-- Overlay for the main menu -->
        <label
            for="main-menu"
            class="drawer-overlay"
        ></label>
        <!-- Sidebar menu container -->
        <aside
            class="flex flex-col border-r border-neutral-content bg-base-300 text-neutral lg:hidden w-3/4 h-full fixed top-0 left-0"
        >
            <!-- Sticky header section of the sidebar -->
            <div
                class="sticky inset-x-0 top-0 z-50 w-full py-1 transition duration-200 ease-in-out border-b lg:block border-base-300 text-neutral"
            >
                <div class="mx-auto navbar grid max-w-none justify-end h-11 min-h-0">
                    <div>
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
                </div>
            </div>
            <!-- Scrollable menu section -->
            <div class="overflow-y-scroll top-24 absolute h-full w-full pb-52">
                <div class="menu flex flex-col p-4 pt-2 compact">
                    <div>
                        <ul>
                            <!-- Dynamic list of menu items for unauthenticated users -->
                            <li
                                v-for="value in appComponent.config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                                v-bind:class="{ shadow: value.SHADOW == 1 }"
                                :class="value.MENU_SECCION"
                            >
                                <!-- Router link for regular menu items -->
                                <RouterLink
                                    :id="`mobile-${value.MENU_ID}`"
                                    class="uppercase"
                                    v-if="value.TARGER !== 'blank' && value.TARGER !== 'chat'"
                                    :to="appComponent.config.baseUrlFx + value.MENU_URL"
                                    :title="value.MENU_TITLE"
                                    @click="closeMenuMobile()"
                                >
                                    <span
                                        v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                        :class="'text-2xl pr-3 ' + value.MENU_ICON"
                                    ></span>
                                    <img
                                        class="mr-3"
                                        width="20"
                                        height="20"
                                        v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                        :alt="`Icon ${value.MENU_TITLE}`"
                                        v-lazy="value.MENU_ICON"
                                    />
                                    <span>{{ $t(value.MENU_TITLE) }}</span>
                                    <div
                                        v-if="value.ICON != undefined"
                                        class="svg"
                                        v-html="value.ICON"
                                    ></div>
                                </RouterLink>
                                <!-- External link for menu items that open in a new tab -->
                                <a
                                    :id="value.MENU_ID"
                                    class="uppercase"
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
                                        width="20"
                                        height="20"
                                        v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                        :alt="`Icon ${value.MENU_TITLE}`"
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
                                    class="uppercase"
                                >
                                    <span
                                        v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                        :class="'text-2xl pr-3 ' + value.MENU_ICON"
                                    ></span>
                                    <img
                                        class="mr-3"
                                        width="20"
                                        height="20"
                                        v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                        :alt="`Icon ${value.MENU_TITLE}`"
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
                    <!-- Additional menu section for other options -->
                    <div
                        v-if="!appComponent.appPOS"
                        class=""
                    >
                        <ul>
                            <li class="menu-title">
                                <span class="text-neutral">{{ $t('OTROS') }}</span>
                            </li>
                        </ul>
                        <ul>
                            <!-- Dynamic list of footer menu items -->
                            <li v-for="value in appComponent.config.MENU_FOOTER[appComponent.country]">
                                <RouterLink
                                    :id="value.MENU_ID"
                                    v-if="value.MENU_TARGET != '_blank'"
                                    :to="value.MENU_URL"
                                    :title="value.MENU_TITLE"
                                    @click="closeMenuMobile()"
                                >
                                    <span> {{ $t(value.MENU_TITLE) }} </span>
                                </RouterLink>
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
        </aside>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

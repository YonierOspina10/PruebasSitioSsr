<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import IconClose from '../../icons/IconClose.vue'; // Importing IconClose component
import { useGlobalStore } from '../../../stores/Global.ts'; // Importing global store

export default defineComponent({
    components: {
        IconClose, // Registering IconClose component
    },
    data() {
        // Defining component data
        let config = this.$config(); // Retrieving configuration
        let appComponent: any = this.$appComponent; // Accessing app component
        let openSelectLang = false; // State for language selection visibility
        let globalStore = useGlobalStore(); // Accessing global store
        return {
            config,
            appComponent,
            openSelectLang,
            globalStore,
        };
    },
    mounted() {
        // Lifecycle hook called after component is mounted
        if (
            this.appComponent.config != undefined && // Checking if config exists
            this.appComponent.config['not_login'] != undefined && // Checking for 'not_login' config
            this.appComponent.config['not_login']['menu'] != undefined // Checking for 'menu' in 'not_login'
        ) {
            // Assigning menu configuration for non-logged-in users
            this.appComponent.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country] =
                this.appComponent.config['not_login']['menu'];
        }
    },
    methods: {
        onOpenChat() {
            // Method to handle opening chat
            if (
                this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal' // Checking if the chat service is 'centribal'
            ) {
                let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_iframe_hidden'); // Removing hidden class from iframe
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_iframe_open'); // Adding open class to iframe
                postMessage('show_chat', '', ref_id); // Sending message to show chat
            }
            this.closeMenuMobile(); // Closing mobile menu after opening chat
        },
        closeMenuMobile() {
            // Method to close the mobile menu
            (document.getElementById('main-menu') as any).checked = false; // Unchecking the main menu checkbox
        },
    },
});
</script>
<template>
    <!-- Main container for the side drawer, includes styling for overflow and positioning -->
    <div
        class="drawer-side overflow-y-hidden w-3/4 lg:w-full lg:mt-0 mt-[95px] lg:relative after:absolute after:bg-gradient-to-b from-base-300/30 via-base-300/30 to-base-300/5 after:rounded-b-[200px] after:w-[0.09rem] after:h-1/2 after:top-0 after:right-0"
    >
        <!-- Overlay for the main menu -->
        <label
            for="main-menu"
            class="drawer-overlay"
        ></label>
        <!-- Sidebar content area -->
        <aside class="flex flex-col bg-primary-content text-neutral h-[800px]">
            <!-- Button to close the mobile menu -->
            <button
                aria-label="Close"
                @click="closeMenuMobile()"
                class="absolute text-neutral -top-2 right-0 z-50 block lg:hidden"
            >
                <IconClose class="w-5" />
            </button>
            <!-- Scrollable area for the menu items -->
            <div class="overflow-y-scroll absolute h-full w-full">
                <div class="menu flex flex-col p-4 pt-5 compact">
                    <div>
                        <ul>
                            <!-- Loop through menu items based on configuration -->
                            <li
                                v-for="value in appComponent.config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                                class="mb-2 rounded-md"
                                :class="[
                                    {
                                        'bg-success text-neutral-content':
                                            value.SHADOW == 1 &&
                                            (value.MENU_SECCION == undefined || value.MENU_SECCION == ''),
                                    },
                                    {
                                        'bg-neutral text-primary-content':
                                            value.SHADOW == 2 &&
                                            (value.MENU_SECCION == undefined || value.MENU_SECCION == ''),
                                    },
                                ]"
                                :style="value.MENU_SECCION"
                            >
                                <!-- Router link for menu items -->
                                <RouterLink
                                    active-class="text-neutral rounded bg-primary lg:bg-primary-content duration-500 transition-all ease-in-out shadow-[inset_0px_-2px_0px_,_inset_0px_2px_0px] shadow-success"
                                    :id="`mobile-${value.MENU_ID}`"
                                    :class="{
                                        'flex flex-row-reverse': value.SHADOW == 1 || value.SHADOW == 2,
                                    }"
                                    class="capitalize py-3 flex"
                                    v-if="value.TARGER !== 'blank' && value.TARGER !== 'chat'"
                                    :to="value.MENU_URL"
                                    :title="value.MENU_TITLE"
                                    @click="closeMenuMobile()"
                                >
                                    <!-- Icon for menu item -->
                                    <span
                                        v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                        :class="'text-2xl pr-3' + value.MENU_ICON"
                                    ></span>
                                    <!-- Image for menu item -->
                                    <img
                                        class="mr-1 object-contain"
                                        :class="
                                            value.SHADOW == 1 || value.SHADOW == 2
                                                ? 'w-11 h-11 drop-shadow-[0px_0px_1px_white]'
                                                : 'w-7 h-7 '
                                        "
                                        width="20"
                                        height="20"
                                        v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                        :alt="value.MENU_TITLE"
                                        v-lazy="value.MENU_ICON"
                                    />
                                    <!-- Title of the menu item -->
                                    <span class="font-poppinssb w-full">{{ $t(value.MENU_TITLE) }}</span>
                                    <!-- SVG icon for menu item -->
                                    <div
                                        v-if="value.ICON != undefined"
                                        class="svg"
                                        v-html="value.ICON"
                                    ></div>
                                </RouterLink>
                                <!-- External link for menu items -->
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
                                    class="uppercase relative mt-3"
                                >
                                    <div
                                        class="absolute bg-primary w-[124%] h-full flex items-center justify-start left-[-18px] gap-x-3 py-4 pl-8 -top-2"
                                    >
                                        <span
                                            v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                            :class="'text-2xl ' + value.MENU_ICON"
                                        ></span>
                                        <img
                                            width="22"
                                            height="22"
                                            v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                            :alt="value.MENU_TITLE"
                                            v-lazy="value.MENU_ICON"
                                        />
                                        <span class="ml-5 text-sm font-poppinssl">{{ $t(value.MENU_TITLE) }}</span>
                                        <div
                                            v-if="value.ICON != undefined"
                                            class="svg"
                                            v-html="value.ICON"
                                        ></div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>
<style scoped>
/* Hide the scrollbar for webkit browsers (Chrome, Safari) */
::-webkit-scrollbar {
    display: none; /* Prevents the scrollbar from being displayed */
}
</style>

<!-- FILE DOCUMENTED -->

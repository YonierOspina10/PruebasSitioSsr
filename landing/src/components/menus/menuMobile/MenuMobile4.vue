<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import IconClose from '../../icons/IconClose.vue'; // Importing IconClose component

export default defineComponent({
    components: {
        IconClose, // Registering IconClose component
    },
    data() {
        // Defining reactive data properties
        let appComponent: any = this.$appComponent; // Accessing global appComponent
        return {
            appComponent, // Returning appComponent for use in the template
        };
    },
    mounted() {
        // Lifecycle hook called after the component is mounted
        if (
            this.appComponent.config != undefined && // Checking if config exists
            this.appComponent.config['not_login'] != undefined && // Checking if not_login exists
            this.appComponent.config['not_login']['menu'] != undefined // Checking if menu exists
        ) {
            // Assigning menu configuration for mobile when not logged in
            this.appComponent.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country] =
                this.appComponent.config['not_login']['menu'];
        }
    },
    methods: {
        onOpenChat() {
            // Method to handle opening the chat
            if (
                this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal' // Checking if the zendesk name is 'centribal'
            ) {
                let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_iframe_hidden'); // Removing hidden class from iframe layout
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_iframe_open'); // Adding open class to iframe layout
                postMessage('show_chat', '', ref_id); // Sending message to show chat
            }
            this.closeMenuMobile(); // Closing the mobile menu
        },
        closeMenuMobile() {
            // Method to close the mobile menu
            (document.getElementById('main-menu') as any).checked = false; // Unchecking the main menu checkbox
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile4|layout:layout-${this.appComponent.config.layout}`
            };
        },
    },
});
</script>
<template>
    <!-- Main container for the side drawer -->
    <div class="drawer-side overflow-y-hidden w-3/4 mt-[80px]">
        <!-- Overlay for the main menu -->
        <label
            for="main-menu"
            class="drawer-overlay"
        ></label>
        <!-- Sidebar menu with conditional styling -->
        <aside
            class="flex flex-col bg-primary bg-gradient-to-r from-base-300/70 to-base-300/80 text-neutral"
            :class="{
                'border-r-2 border-solid border-primary ':
                    appComponent.config.layout != undefined && appComponent.config.layout == 5,
            }"
        >
            <!-- Button to close the mobile menu -->
            <button
                aria-label="Close"
                @click="closeMenuMobile()"
                class="absolute text-neutral right-0 z-50"
            >
                <IconClose class="w-5" />
            </button>
            <!-- Scrollable container for menu items -->
            <div class="overflow-y-scroll absolute h-full w-full">
                <div class="menu flex flex-col p-4 pt-5 compact">
                    <div>
                        <ul>
                            <!-- Loop through menu items based on configuration -->
                            <li
                                v-for="value in appComponent.config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                                class="mb-2"
                                :class="[
                                    { shadow: value.SHADOW == 1 },
                                    value.MENU_SECCION,
                                    value.TARGER == 'chat'
                                        ? ''
                                        : 'bg-gradient-to-r from-bg-base-300/50 to-transparent rounded-xl border-solid border-l-1 border-primary  hover:to-primary/50 hover:scale-95',
                                ]"
                            >
                                <!-- Router link for regular menu items -->
                                <RouterLink
                                    active-class="bg-primary/70 border-l-2 border-solid border-neutral"
                                    :id="`mobile-${value.MENU_ID}`"
                                    class="uppercase py-3"
                                    v-if="value.TARGER !== 'blank' && value.TARGER !== 'chat'"
                                    v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                    :to="value.MENU_URL"
                                    :title="value.MENU_TITLE"
                                    @click="closeMenuMobile()"
                                >
                                    <!-- Icon for menu item -->
                                    <span
                                        v-if="value.MENU_ICON != '' && !value.MENU_ICON.includes('https')"
                                        :class="'text-2xl pr-3 ' + value.MENU_ICON"
                                    ></span>
                                    <img
                                        class="mr-3"
                                        width="22"
                                        height="22"
                                        v-if="value.MENU_ICON != '' && value.MENU_ICON.includes('https')"
                                        :alt="value.MENU_TITLE"
                                        v-lazy="value.MENU_ICON"
                                    />
                                    <span class="font-poppinssl">{{ $t(value.MENU_TITLE) }}</span>
                                    <div
                                        v-if="value.ICON != undefined"
                                        class="svg"
                                        v-html="value.ICON"
                                    ></div>
                                </RouterLink>
                                <!-- External link for blank target menu items -->
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
/* Hide the scrollbar for webkit browsers (e.g., Chrome, Safari) */
::-webkit-scrollbar {
    display: none; /* Prevents the scrollbar from being displayed */
}
</style>

<!-- FILE DOCUMENTED -->

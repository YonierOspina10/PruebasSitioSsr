<script lang="ts">
import { defineComponent } from 'vue';
import { useGlobalStore } from '../../../stores/Global.ts';

/**
 * Vue component definition for handling chat functionality.
 */
export default defineComponent({
    props: {
        /**
         * List of menu items passed as a prop.
         */
        menuList: Object,
    },

    data() {
        /**
         * Initializes component data properties.
         * @returns {Object} Contains appComponent, zendesk, and globalStore.
         */
        let appComponent: any = this.$appComponent;
        let zendesk: any = this.$zendesk;
        let globalStore = useGlobalStore();
        return {
            appComponent,
            zendesk,
            globalStore,
        };
    },

    mounted() {
        // Lifecycle hook for when the component is mounted.
    },

    methods: {
        /**
         * Scrolls the main layout to the top.
         */
        scrollTop() {
            const scroll: any = document.getElementById('main-layout');
            if (scroll != undefined) {
                scroll.scrollTo(0, 0);
            }
        },

        /**
         * Closes the main menu by updating the global store state.
         */
        closeMenu() {
            this.globalStore.onMenuMain = false;
        },

        /**
         * Opens the chat interface and manages its visibility.
         */
        onOpenChat() {
            this.closeMenu();
            window.addEventListener('message', function (e) {
                if (e.data.status === 'hide') {
                    document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_open');
                    document.getElementById('centribal_iframe_layout')?.classList.add('centribal_hidden');
                }
            });

            // Check if the chat iframe element already exists
            const chat: any = document.getElementById('centribal_iframe_layout');
            if (chat) {
                // If the chat iframe exists, set its reference ID
                let ref_id: any = 'cen_ifr_static';
                // Add the 'centribal_open' class to make the iframe visible
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open');
                // Remove the 'centribal_hidden' class to ensure the iframe is not hidden
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden');
                // Post a message to show the chat
                postMessage('show_chat', '', ref_id);
            } else {
                // Create a div element to contain the chat iframe
                const div = document.createElement('div');
                div.setAttribute('id', 'centribal_iframe_layout');
                div.classList.add('centribal_hidden');
                document.querySelector('body')?.appendChild(div);

                // Create and configure the script element for the chat iframe
                const script = document.createElement('script');
                script.setAttribute('id', 'cen_snippet_static');
                script.setAttribute('control_iframe', '');
                script.setAttribute('src', this.appComponent.config.zendesk[this.appComponent.country].key);
                script.setAttribute('type', 'text/javascript');
                document.querySelector('body')?.appendChild(script);

                // Set the reference ID for the chat iframe
                let ref_id: any = 'cen_ifr_static';
                // Create the iframe element and set its source URL
                const iframe = document.createElement('iframe');
                iframe.setAttribute('id', ref_id);
                iframe.src = this.appComponent.config.zendesk[this.appComponent.country].key;
                document.getElementById('centribal_iframe_layout')?.appendChild(iframe);

                // Set up the onload event for the iframe
                iframe.onload = function () {
                    // Add the 'centribal_open' class to make the iframe visible after a delay
                    setTimeout(() => {
                        document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open');
                    }, 1000);
                    // Remove the 'centribal_hidden' class to ensure the iframe is not hidden
                    document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden');
                    // Post a message to show the chat
                    postMessage('show_chat', '', ref_id);
                };
            }
        },
    },
});
</script>
<template>
    <!-- Main container for the footer menu, centered and full width -->
    <div class="w-full flex justify-center items-center">
        <!-- Grid container for menu items, responsive layout with gaps -->
        <div
            class="grid grid-cols-2 md:grid-cols-4 justify-center items-start gap-y-5 gap-x-5 lg:gap-x-20 py-5 px-2 w-auto max-w-[1000px]"
        >
            <!-- Loop through menuList to create each menu section -->
            <div
                v-for="value in menuList"
                class="flex flex-col justify-center items-start"
            >
                <!-- Title of the menu section -->
                <span class="text-info-text text-start text-lg font-semibold mb-3">{{ $t(value.MENU_TITLE) }}</span>
                <!-- List of submenu items -->
                <ul class="flex flex-col justify-center items-start gap-y-2">
                    <!-- Loop through MENU_LIST to create each submenu item -->
                    <li
                        v-for="submenu in value.MENU_LIST"
                        class="w-full text-start py-2"
                    >
                        <!-- RouterLink for internal links -->
                        <RouterLink
                            v-if="submenu.TARGER == 'self'"
                            :to="submenu.MENU_URL"
                            :aria-label="submenu.MENU_TITLE"
                        >
                            <!-- Submenu item with click event for analytics -->
                            <span
                                :id="`footer-${submenu.MENU_ID}`"
                                :aria-label="submenu.MENU_TITLE"
                                :class="submenu.MENU_SECCION"
                                @click="
                                    scrollTop();
                                    appComponent.gAnalytics('interaction_footer', {
                                        section: value.MENU_TITLE,
                                        element: submenu.MENU_TITLE,
                                    });
                                "
                                class="text-info-text hover:text-secondary text-xs lg:text-sm text-start"
                                >{{ $t(submenu.MENU_TITLE) }}</span
                            >
                        </RouterLink>
                        <!-- Anchor tag for external links -->
                        <a
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'blank'"
                            :aria-label="submenu.MENU_TITLE"
                            :href="submenu.MENU_URL"
                            target="_blank"
                            :class="submenu.MENU_SECCION"
                            class="text-info-text hover:text-secondary text-xs lg:text-sm text-start"
                            >{{ $t(submenu.MENU_TITLE) }}</a
                        >
                        <!-- Button for chat functionality -->
                        <button
                            :id="submenu.MENU_ID"
                            v-if="submenu.TARGER == 'chat'"
                            @click="onOpenChat()"
                            :aria-label="submenu.MENU_TITLE"
                            :class="submenu.MENU_SECCION"
                            class="text-info-text hover:text-secondary text-xs lg:text-sm text-start"
                        >
                            {{ $t(submenu.MENU_TITLE) }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

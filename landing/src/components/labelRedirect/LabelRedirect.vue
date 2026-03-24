<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import ExitIcon from '../icons/ExitIcon.vue'; // Importing ExitIcon component
import { useCookies } from 'vue3-cookies'; // Importing useCookies for cookie management

export default defineComponent({
    components: {
        ExitIcon, // Registering ExitIcon component
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing appComponent from the context
        return {
            appComponent, // Returning appComponent for use in the template
        };
    },
    setup() {
        const { cookies } = useCookies(); // Using cookies for cookie management
        return {
            cookies, // Returning cookies for use in the template
        };
    },
    methods: {
        /**
         * Closes the component by updating appComponent properties
         * and setting a cookie to remember the action.
         */
        close() {
            this.appComponent.labelRedirect = false; // Disabling label redirect
            this.cookies.set('cookies-app', 'true'); // Setting a cookie to indicate closure
            this.appComponent.showLabel = false; // Hiding the label
        },
        /**
         * Redirects the user to a URL based on appComponent configuration
         * and the current country.
         */
        redirect() {
            window.open(
                this.appComponent.config.labelRedirect != undefined && // Checking if labelRedirect is defined
                    this.appComponent.config.labelRedirect[this.appComponent.country] != undefined && // Checking if labelRedirect for the current country is defined
                    this.appComponent.config.labelRedirect[this.appComponent.country].url != undefined // Checking if the URL is defined
                    ? this.appComponent.config.labelRedirect[this.appComponent.country].url // Returning the URL if all conditions are met
                    : '', // Returning an empty string if conditions are not met
            );
        },
    },
});
</script>
<template>
    <!-- Main container for the header section with styling for height, background, and flex layout -->
    <div class="w-full h-14 bg-success flex justify-center items-center gap-4 relative">
        <!-- Container for the text label -->
        <div>
            <p class="text-neutral">
                {{
                    $t(
                        appComponent.config.labelRedirect != undefined &&
                            appComponent.config.labelRedirect[appComponent.country] != undefined &&
                            appComponent.config.labelRedirect[appComponent.country].text != undefined
                            ? appComponent.config.labelRedirect[appComponent.country].text
                            : '',
                    )
                }}
            </p>
        </div>
        <!-- Container for the main action button -->
        <div class="w-auto h-auto flex justify-center items-center">
            <button
                class="w-36 h-10 bg-neutral rounded-full flex justify-center items-center gap-2 hover:scale-105 shadow-[inset_1px_-1px_2px] shadow-neutral-content/70"
                @click="redirect()"
            >
                <img
                    :src="
                        appComponent.config.labelRedirect != undefined &&
                        appComponent.config.labelRedirect[appComponent.country] != undefined &&
                        appComponent.config.labelRedirect[appComponent.country].icon != undefined
                            ? appComponent.config.labelRedirect[appComponent.country].icon
                            : ''
                    "
                    alt="icon"
                />
                <span class="text-neutral-content/50 font-bold">
                    {{
                        $t(
                            appComponent.config.labelRedirect != undefined &&
                                appComponent.config.labelRedirect[appComponent.country] != undefined &&
                                appComponent.config.labelRedirect[appComponent.country].textButton != undefined
                                ? appComponent.config.labelRedirect[appComponent.country].textButton
                                : '',
                        )
                    }}
                </span>
            </button>
        </div>
        <!-- Container for the close button, positioned absolutely to the right -->
        <div class="w-auto h-auto flex justify-center items-center absolute right-3">
            <button
                @click="close()"
                class="hover:scale-105"
                aria-label="Cerrar menu"
            >
                <ExitIcon
                    :height="23"
                    :width="23"
                    :fill="'#ffffff'"
                    :fill2="'#ee3b3f'"
                />
            </button>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

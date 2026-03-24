<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for handling Facebook login.
 */
export default defineComponent({
    /**
     * Component's reactive data properties.
     * @returns An object containing component data.
     */
    data() {
        return {};
    },

    /**
     * Component's props definition.
     */
    props: {
        /** Facebook App ID, required for SDK initialization. */
        appId: {
            type: String,
            required: true,
        },
        /** Type of the component, defaults to 'normal'. */
        type: {
            type: String,
            default: 'normal',
        },
        /** Text to be displayed, if any. */
        text: {
            type: String,
        },
        /** Theme of the component, defaults to 'dark'. */
        theme: {
            type: String,
            default: 'dark',
        },
        /** Additional CSS classes for styling. */
        classes: {
            type: String,
        },
        /** Inline styles for the component. */
        styles: {
            type: String,
        },
    },

    /**
     * Lifecycle hook called after the component is mounted.
     * Loads the Facebook SDK and initializes Facebook.
     */
    mounted() {
        this.loadFacebookSDK(document, 'script', 'facebook-jssdk');
        this.initFacebook();
    },

    /**
     * Events emitted by the component.
     */
    emits: ['loggedIn', 'loginFailed'],

    methods: {
        /**
         * Initiates Facebook login process.
         * Emits 'loggedIn' or 'loginFailed' based on the response.
         */
        async logInWithFacebook() {
            await this.loadFacebookSDK(document, 'script', 'facebook-jssdk');
            await this.initFacebook();
            const globalThis = this;
            (window as any).FB.login(function (response) {
                if (response.authResponse) globalThis.$emit('loggedIn', response);
                else globalThis.$emit('loginFailed');
            });
            return false;
        },

        /**
         * Initializes the Facebook SDK with the provided App ID.
         */
        async initFacebook() {
            const { appId } = this;
            (window as any).fbAsyncInit = function () {
                (window as any).FB.init({
                    appId: appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v13.0',
                });
                (window as any).FB.AppEvents.logPageView();
            };
        },

        /**
         * Loads the Facebook SDK script dynamically.
         * @param d - Document object.
         * @param s - Script tag type.
         * @param id - ID for the script element.
         */
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        },
    },
});
</script>
<template>
    <!-- 
  Button elements for logging in with Facebook.
  The buttons are conditionally rendered based on the 'type' and 'theme' properties.
-->

    <button
        @click="logInWithFacebook"
        class="minimal btn-def"
        v-if="type === 'minimal'"
    ></button>

    <button
        @click="logInWithFacebook"
        v-else-if="type === 'custom'"
        :class="classes"
        :style="styles"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style="display: inline-block; margin-right: 5px"
            width="18px"
            height="18px"
            fill="#4267B2"
            viewBox="0 0 512 512"
        >
            <path
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
            /></svg
        >{{ text || 'Login with Facebook' }}
    </button>

    <button
        @click="logInWithFacebook"
        class="normal btn-def"
        :class="{ dark: theme === 'dark', light: theme === 'light' }"
        v-else
    >
        <span>Login with <b>Facebook</b></span>
    </button>
</template>

<!-- FILE DOCUMENTED -->

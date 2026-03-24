<script lang="ts">
import { defineComponent } from 'vue';
import router from '../../../router';
import apiService from '../../../services/ApiService.js';
import MenuDesktopv5 from '../../menus/menuDesktop/MenuDesktopv5.vue';

/**
 * Vue component definition for the main application.
 */
export default defineComponent({
    components: {
        MenuDesktopv5, // Registers the MenuDesktopv5 component
    },

    /**
     * Component data function.
     * @returns {Object} The component's data properties.
     */
    data() {
        let config = this.$config(); // Retrieves configuration settings
        let appComponent: any = this.$appComponent; // References the application component
        let refreshBalance = this.$refreshBalance; // References the refresh balance function
        return {
            config,
            appComponent,
            refreshBalance,
        };
    },

    /**
     * Custom directive to format numbers.
     */
    directives: {
        formatNumber(el, binding) {
            el.textContent = binding.value.toFixed(2); // Formats the number to two decimal places
        },
    },

    methods: {
        /**
         * Opens a URL in the top window.
         * @param {Object} box - The box object containing the URL.
         */
        clickBox(box: any) {
            window.open(box.url, '_top'); // Opens the specified URL
        },

        /**
         * Logs out the user and resets session data.
         */
        logOut() {
            if ((window as any).ws != undefined) {
                (window as any).ws.close(); // Closes the WebSocket connection if it exists
            }
            const vthis = this; // Stores reference to 'this'

            // Sends a logout request to the API
            apiService.request('logout', {}).then((response: any) => {
                if (response.code == 0) {
                    vthis.appComponent.tokenSB = ''; // Resets token
                    vthis.appComponent.session = {
                        // Resets session data
                        logueado: false,
                        usuario: '',
                        nombre: '',
                        pais: '',
                        pais_nom: '',
                        pais_id: null,
                        moneda: '',
                        moneda_nom: '',
                        idioma: '',
                        utc: '',
                        token: '',
                        req_cheque: '',
                        req_doc: '',
                        fecha_crea: '',
                        fecha_actualizacion: '',
                        origen: '',
                        casino_enabled: '',
                        verifcedula_ant: '',
                        verifcedula_post: '',
                        verifcedula_ant_paprob: '',
                        verifcedula_post_paprob: '',
                        wallet: '',
                        last_login_date: null,
                        last_login_ip: '',
                        cedula: '',
                        celular: '',
                        fecha_nacim: '',
                        iframemini_bannerleft: '',
                        iframemini_bannerright: '',
                        verifcelular: '',
                        formSplaft: 'N',
                        paternal_last_name: '',
                        mother_last_name: '',
                        email: '',
                        phone: '',
                        doc_type: '',
                        nationalityid: '',
                        first_name: '',
                        identification: '',
                    };
                    apiService.setAuthToken(''); // Clears the authentication token
                    window.localStorage.removeItem('auth_token'); // Removes auth token from local storage
                    vthis.appComponent.tokenUser = ''; // Resets user token
                }
            });

            // Resets session data again for safety
            this.appComponent.tokenSB = '';
            this.appComponent.session = {
                logueado: false,
                usuario: '',
                nombre: '',
                pais: '',
                pais_nom: '',
                pais_id: null,
                moneda: '',
                moneda_nom: '',
                idioma: '',
                utc: '',
                token: '',
                req_cheque: '',
                req_doc: '',
                fecha_crea: '',
                fecha_actualizacion: '',
                origen: '',
                casino_enabled: '',
                verifcedula_ant: '',
                verifcedula_post: '',
                verifcedula_ant_paprob: '',
                verifcedula_post_paprob: '',
                wallet: '',
                last_login_date: null,
                last_login_ip: '',
                cedula: '',
                celular: '',
                fecha_nacim: '',
                iframemini_bannerleft: '',
                iframemini_bannerright: '',
                verifcelular: '',
                formSplaft: 'N',
                paternal_last_name: '',
                mother_last_name: '',
                email: '',
                phone: '',
                doc_type: '',
                nationalityid: '',
                first_name: '',
                identification: '',
            };
            apiService.setAuthToken(''); // Clears the authentication token again
            try {
                (window as any).altenarWSDK.set({ token: '' }); // Resets Altenar SDK token
            } catch (e) {}
            this.appComponent.tokenUser = ''; // Resets user token again
            window.localStorage.removeItem('auth_token'); // Removes auth token from local storage again
            this.appComponent.loadView = false; // Disables loading view

            // Redirects to home if specific version is detected
            if (this.appComponent.config.versionAltenar == '2') {
                window.location.href = '/';
            }
            router.push('/'); // Navigates to the home route
            setTimeout(() => {
                this.appComponent.loadView = true; // Re-enables loading view after a delay
            }, 1000);
        },
    },
});
</script>
<template>
    <!-- Main container for the mobile ticker, displayed conditionally based on appComponent properties -->
    <div
        v-if="
            (appComponent.config.header_ != undefined && appComponent.config.header_.top_band != undefined
                ? appComponent.config.header_.top_band
                : appComponent.config.header.showTicker) &&
            appComponent.boxes.length > 0 &&
            appComponent.session.logueado
        "
        class="ticker-mobile items-baseline md:hidden text-neutral text-start md:text-end"
    >
        <!-- Viewport for scrolling boxes, class changes based on appComponent state -->
        <div
            class="viewport"
            v-bind:class="{ moving: appComponent.moving }"
        >
            <!-- Iterates over boxes in appComponent to create individual box elements -->
            <div
                class="box"
                v-for="box in appComponent.boxes"
            >
                <!-- Clickable span that displays the title of the box -->
                <span
                    @click="clickBox(box)"
                    v-html="box.title"
                ></span>
            </div>
        </div>
    </div>

    <!-- Header container, sticky at the top with a maximum height -->
    <div
        id="header"
        class="h-auto max-h-[5rem] sticky top-0"
    >
        <!-- Desktop menu component -->
        <MenuDesktopv5 />
    </div>
</template>

<!-- FILE DOCUMENTED -->

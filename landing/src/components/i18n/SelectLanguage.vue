<script lang="ts">
import { defineComponent } from 'vue';
import Flag from './Flag.vue';
import { useGlobalStore } from '../../stores/Global.ts';
import { useCookies } from 'vue3-cookies';

/**
 * Vue component definition for language selection.
 */
export default defineComponent({
    props: {
        /**
         * Language prop with a default value of 'ES'.
         */
        language: {
            type: String,
            default: 'ES',
        },
    },
    components: {
        /**
         * Flag component for displaying country flags.
         */
        Flag,
    },
    data() {
        /**
         * Global store instance for state management.
         */
        let globalStore = useGlobalStore();
        /**
         * Reference to the app component.
         */
        let appComponent: any = this.$appComponent;
        /**
         * State to control the visibility of language selection.
         */
        let openSelectLang: boolean = false;
        /**
         * Selected language.
         */
        let selectLang: string = '';
        /**
         * List of countries with their corresponding flags.
         */
        let countries: any = [
            { name: 'es', flag: 'es' },
            { name: 'en', flag: 'us' },
            { name: 'pt', flag: 'br' },
        ];
        return {
            appComponent,
            openSelectLang,
            globalStore,
            selectLang,
            countries,
        };
    },
    setup() {
        /**
         * Cookie management instance.
         */
        const { cookies } = useCookies();
        return {
            cookies,
        };
    },
    created() {
        /**
         * Initialize language settings based on app configuration and cookies.
         */
        if (
            this.appComponent.config.language != undefined &&
            this.appComponent.config.language.languageDafault != undefined
        ) {
            const selectLanguage = this.countries.find(
                (element) => element.name == this.appComponent.config.language.languageDafault,
            );
            /**
             * Set global store language based on the selected language.
             */
            this.globalStore.language = {
                name: selectLanguage.name,
                flag: selectLanguage.flag,
            };
        }
        /**
         * Retrieve language from cookies and update global store and i18n locale.
         */
        if (this.cookies.get('lng') != undefined) {
            this.globalStore.language.name = this.cookies.get('lng');
            this.$i18n.locale = this.globalStore.language.name;
        }
        /**
         * Retrieve flag from cookies and update global store.
         */
        if (this.cookies.get('fla') != undefined) {
            this.globalStore.language.flag = this.cookies.get('fla');
        }
    },
    methods: {
        /**
         * Change the application language and update cookies.
         * @param country - The selected country code.
         * @param flag - The corresponding flag code.
         */
        changeLanguage(country, flag) {
            this.globalStore.language = { name: country, flag: flag };
            this.$i18n.locale = country;
            this.cookies.set('lng', country);
            this.cookies.set('fla', flag);
        },
    },
});
</script>
<template>
    <!-- Dropdown container for language selection -->
    <div
        class="dropdown dropdown-end items-center gap-1 hover:scale-105"
        @click="openSelectLang = !openSelectLang"
        data-analytics-label="header:change-language"
        :data-analytics-context="`component:SelectLanguage|layout:layout-${appComponent.config.layout}`"
    >
        <!-- Button to display the currently selected language -->
        <div
            tabindex="0"
            role="button"
            class="m-1 btn btn-xs bg-accent-focus flex justify-center items-center text-sm gap-1"
        >
            <Flag :country="globalStore.language.flag" />
            <span>{{ globalStore.language.name }}</span>
        </div>
        <!-- Dropdown menu containing the list of available languages -->
        <ul
            tabindex="0"
            class="menu dropdown-content bg-accent-focus rounded-box w-22 text-base-content"
        >
            <!-- List item for each country in the countries array -->
            <li
                v-for="country in countries"
                @click="
                    changeLanguage(country.name, country.flag);
                    openSelectLang = false;
                "
            >
                <span>
                    <Flag :country="country.flag" />
                    {{ country.name.toLocaleUpperCase() }}
                </span>
            </li>
        </ul>
    </div>
</template>

<!-- FILE DOCUMENTED -->

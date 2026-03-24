<script lang="ts">
import { defineComponent, watch } from 'vue'; // Importing defineComponent from Vue
    
export default defineComponent({
    data() {
        let config = this.$config(); // Fetching configuration
        let appComponent: any = this.$appComponent; // Fetching app component
        let openSelectLang = false; // State for language selection dropdown
        return {
            config,
            appComponent,
            openSelectLang
        };
    }
});
</script>
<template>
    <div
        class="hidden lg:flex hover:scale-105"
        v-if="
            config.header_ != undefined && config.header_.change_language != undefined
                ? config.header_.change_language
                : config.language.showSelectLang
        "
    >
        <div
            class="dropdown dropdown-end flex items-center gap-1"
            @click="openSelectLang = !openSelectLang"
        >
            <div
                tabindex="0"
                class="m-1 btn btn-xs bg-accent-focus flex justify-center items-center text-sm gap-1"
            >
                <span :class="'country-flags ' + appComponent.selectFlag"></span>
                <span>{{ appComponent.lngProd }}</span>
            </div>
            <ul
                tabindex="0"
                class="menu dropdown-content bg-accent-focus rounded-box w-22 text-base-content mt-44"
                v-if="openSelectLang"
            >
                <li
                    v-for="country in appComponent.countries"
                    @click="appComponent.changeLanguage(country.name, country.flag), (openSelectLang = false)"
                >
                    <span>
                        <span :class="'country-flags ' + country.flag"></span>
                        {{ country.name.toLocaleUpperCase() }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

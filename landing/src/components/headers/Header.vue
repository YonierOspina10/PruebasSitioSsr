<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuIcon from '../icons/MenuIcon.vue'; // Importing MenuIcon component
import SearchIcon from '../icons/SearchIcon.vue'; // Importing SearchIcon component
import Flag from '../i18n/Flag.vue'; // Importing Flag component for language selection
import SelectLanguage from '../i18n/SelectLanguage.vue'; // Importing SelectLanguage component
import { useGlobalStore } from '../../stores/Global'; // Importing global store for state management
import { useModalStore } from '../../stores/Modal'; // Importing modal store for managing modals
import Search from '../searchs/Search.vue'; // Importing Search component
import SearchCasinoSportbook from '../searchs/SearchCasinoSportbook.vue'; // Importing SearchCasinoSportbook component
import ArrowDownFull from '../icons/ArrowDownFull.vue';
export default defineComponent({
    components: {
        SearchCasinoSportbook, // Registering SearchCasinoSportbook component
        MenuIcon, // Registering MenuIcon component
        Search, // Registering Search component
        Flag, // Registering Flag component
        SelectLanguage, // Registering SelectLanguage component
        SearchIcon, // Registering SearchIcon component
        ArrowDownFull
    },
    data() {
        let globalStore = useGlobalStore(); // Accessing global store
        let appComponent: any = this.$appComponent; // Storing app component reference
        let modals = useModalStore(); // Accessing modal store
        let ligthMode = false; // State for dark mode
        let moonIcon = ''; // Icon for moon
        let sunIcon = ''; // Icon for sun
        let localStorageC = '';
        return {
            modals, // Exposing modals to the template
            appComponent, // Exposing appComponent to the template
            globalStore, // Exposing globalStore to the template
            ligthMode,
            moonIcon,
            sunIcon,
            localStorageC
        };
    },
    mounted() {
        this.localStorageC = localStorage.getItem('changeThemeColor')

        console.log(this.localStorageC);
        if (this.localStorageC == 'true') {
            this.appComponent.themeSportbook = true;
            this.ligthMode = true;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
            console.log('ligthMode', this.ligthMode);
            if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined){
                let deviceTheme = '';
                if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                    console.log('entraa D');
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                    console.log('entraa M');
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            }
        }
        else {
            this.ligthMode = false;
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
            let deviceTheme = '';
            if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                deviceTheme = 'theme_colors_desktop';
            } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                deviceTheme = 'theme_colors_mobile';
            }
            this.setThemeColor(deviceTheme);

            this.appComponent.gAnalytics('change_theme_color_dark');
        }
    }, // Lifecycle hook for when the component is mounted
    methods: {
        openMenu() { // Method to toggle the main menu visibility
            this.globalStore.onMenuMain = !this.globalStore.onMenuMain; // Toggle menu state
        },
        getSrcset(imageUrl: string, sizes = [480, 768, 1024, 1440]) { // Method to generate srcset for responsive images
            if (!imageUrl) return ''; // Return empty string if no image URL is provided
            const baseUrl = imageUrl.split('?')[0]; // Extract base URL from image URL
            return sizes.map((size) => `${baseUrl}?w=${size}&fm=webp ${size}w`).join(', '); // Generate srcset string
        },
        hexToHsl(H) {
            if (H !== undefined) {
                let r = 0,
                    g = 0,
                    b = 0;
                if (H.length == 4) {
                    r = '0x' + H[1] + H[1]; // Convert shorthand hex to full hex
                    g = '0x' + H[2] + H[2];
                    b = '0x' + H[3] + H[3];
                } else if (H.length == 7) {
                    r = '0x' + H[1] + H[2]; // Convert full hex to RGB
                    g = '0x' + H[3] + H[4];
                    b = '0x' + H[5] + H[6];
                }
                r /= 255; // Normalize red
                g /= 255; // Normalize green
                b /= 255; // Normalize blue
                let cmin = Math.min(r, g, b),
                    cmax = Math.max(r, g, b),
                    delta = cmax - cmin,
                    h = 0,
                    s = 0,
                    l = 0;
                if (delta == 0) h = 0; // No hue if delta is 0
                else if (cmax == r) h = ((g - b) / delta) % 6; // Calculate hue
                else if (cmax == g) h = (b - r) / delta + 2;
                else h = (r - g) / delta + 4;
                h = Math.round(h * 60); // Convert hue to degrees
                if (h < 0) h += 360; // Adjust hue if negative
                l = (cmax + cmin) / 2; // Calculate lightness
                s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Calculate saturation
                s = +(s * 100).toFixed(1); // Convert saturation to percentage
                l = +(l * 100).toFixed(1); // Convert lightness to percentage
                return '' + h + ' ' + s + '% ' + l + '%'; // Return HSL string
            } else {
                return ''; // Return empty string if input is undefined
            }
        },
        changeLigthMode() {
            this.ligthMode = !this.ligthMode; // Toggle light mode
            this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
            this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
            localStorage.setItem('changeThemeColor', 'true');
            this.appComponent.themeSportbook = true;
            if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined) {

                let deviceTheme = '';

                if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                    deviceTheme = 'theme_colors_ligth_desktop';
                } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                    deviceTheme = 'theme_colors_ligth_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_ligth');
            }
            else {
                localStorage.setItem('changeThemeColor', 'false');
                this.appComponent.themeSportbook = false;
                this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
                this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'

                let deviceTheme = '';
                if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                    deviceTheme = 'theme_colors_desktop';
                } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                    deviceTheme = 'theme_colors_mobile';
                }
                this.setThemeColor(deviceTheme);

                this.appComponent.gAnalytics('change_theme_color_dark');
            }
        },
        setThemeColor(device){
            let rootTailwind = document.createElement('style'); // Create a style element for Tailwind CSS variables
            rootTailwind.textContent = `
    	        :root {
				--pf: ${this.hexToHsl(this.appComponent.config[device].primary_focus)} !important;
				--sf: ${this.hexToHsl(this.appComponent.config[device].secondary_focus)} !important;
				--af: ${this.hexToHsl(this.appComponent.config[device].accent_focus)} !important;
				--su: ${this.hexToHsl(this.appComponent.config[device].success)} !important;
				--in: ${this.hexToHsl(this.appComponent.config[device].info)} !important;
				--wa: ${this.hexToHsl(this.appComponent.config[device].warning)} !important;
				--er: ${this.hexToHsl(this.appComponent.config[device].error)} !important;
				--p: ${this.hexToHsl(this.appComponent.config[device].primary)} !important;
				--pc: ${this.hexToHsl(this.appComponent.config[device].primary_content)} !important;
				--s: ${this.hexToHsl(this.appComponent.config[device].secondary)} !important;
				--sc: ${this.hexToHsl(this.appComponent.config[device].secondary_content)} !important;
				--a: ${this.hexToHsl(this.appComponent.config[device].accent)} !important;
				--ac: ${this.hexToHsl(this.appComponent.config[device].accent_content)} !important;
				--n: ${this.hexToHsl(this.appComponent.config[device].neutral)} !important;
				--nf: ${this.hexToHsl(this.appComponent.config[device].neutral_focus)} !important;
				--nc: ${this.hexToHsl(this.appComponent.config[device].neutral_content)} !important;
				--b1: ${this.hexToHsl(this.appComponent.config[device].base_100)} !important;
				--b2: ${this.hexToHsl(this.appComponent.config[device].base_200)} !important;
				--b3: ${this.hexToHsl(this.appComponent.config[device].base_300)} !important;
				--b4: ${this.hexToHsl(this.appComponent.config[device].base_400)} !important;
				--bc: ${this.hexToHsl(this.appComponent.config[device].base_content)} !important;
				--nt: ${this.hexToHsl(this.appComponent.config[device].neutral_text)} !important;
				--it: ${this.hexToHsl(this.appComponent.config[device].info_text)} !important;
				--sb: ${this.hexToHsl(this.appComponent.config[device].sportbook_color)} !important;
				--ic: ${this.hexToHsl(this.appComponent.config[device].input_border)} !important;
				--ip: ${this.hexToHsl(this.appComponent.config[device].input_placeholder)} !important;
				--ib: ${this.hexToHsl(this.appComponent.config[device].input_background)} !important;
                    }
                  [data-theme="main"] .swiper-button-prev,
                  [data-theme="main"] .swiper-button-next,
                  [data-theme="main"] .swiper-button-prev::after,
                  [data-theme="main"] .swiper-button-next::after {
                    color: ${this.appComponent.config[device].primary};
                  }
            `;

            try {
                document.body.appendChild(rootTailwind); // Append the style element to the body
            } catch (e) {
                console.log(e); // Log any errors during appending
            }
        },
        showModalLogin() {
            if (this.appComponent.config.modalLoginVersion != undefined && this.appComponent.config.modalLoginVersion == 1) {
                this.modals.addModal({ showModal: 'ModalLoginV3' });
            } else if (this.appComponent.config.modalLoginVersion != undefined && this.appComponent.config.modalLoginVersion == 2) {
                this.modals.addModal({ showModal: 'ModalLogin6' });
            } else {
                this.modals.addModal({ showModal: 'ModalLogin' });
            }
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Header|layout:layout-${this.appComponent.config.layout}`
            };
        },
    },
});
</script>
<template>
    <header
        :class="
            appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2
                ? 'h-[70px] justify-between'
                : 'h-[60px] justify-start lg:justify-between'
        "
        class="bg-base-300 w-full flex items-center px-2 lg:px-4 border-b-2 border-solid border-primary-content fixed z-40 -top-[1px] left-0 gap-2 lg:gap-0"
    >
        <!-- Main header container with styling for layout and responsiveness -->
        <div
            v-if="true"
            class="relative hidden lg:flex justify-start items-center gap-4 in"
        >
            <!-- Logo and search components container for large screens -->
            <div class="hidden lg:flex justify-start items-center min-[154px] w-[154px] h-[38px]">
                <RouterLink
                    id="ImgLogo"
                    to="/home"
                    aria-label="Image logo"
                    class="w-44 hover:scale-105 flex justify-center"
                    v-bind="analyticsAttrs('header:logo')"
                >
                    <img
                        :srcset="
                            getSrcset(
                                appComponent.config.logo_ != undefined &&
                                    !appComponent.themeSportbook &&
                                    appComponent.config.logo_['dark'] != undefined &&
                                    appComponent.config.logo_['light'] != undefined
                                    ? appComponent.config.logo_['dark']
                                    : appComponent.config.logo_ != undefined &&
                                    appComponent.themeSportbook &&
                                    appComponent.config.logo_['dark'] != undefined &&
                                    appComponent.config.logo_['light'] != undefined
                                    ? appComponent.config.logo_['light']
                                    : appComponent.config.logo,
                            )
                        "
                        loading="lazy"
                        :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                        alt="Logo"
                        class="object-contain"
                    />
                </RouterLink>
            </div>
            <Search
                v-if="appComponent.config.showSearchGames === undefined || !appComponent.config.showSearchGames"
                class="hidden lg:flex absolute z-10"
            />
            <SearchCasinoSportbook
                v-else-if="appComponent.config.showSearchGames !== undefined && appComponent.config.showSearchGames"
                class="hidden lg:flex"
            />
        </div>

        <!-- New style version of the header with a horizonal menu -->
        <div
            v-if="
                appComponent.config.header_ != undefined &&
                appComponent.config.header_.styleVersion !== undefined &&
                appComponent.config.header_.styleVersion === 2
            "
            class="w-full h-full hidden md:flex"
        >
            <!-- User menu displayed when not logged in -->
            <div
                v-if="
                    appComponent.config.header_ != undefined &&
                    appComponent.config.header_.styleVersion !== undefined &&
                    appComponent.config.header_.styleVersion === 2
                "
                class="hidden md:flex h-full justify-center items-center"
            >
                <ul class="flex flex-row justify-center items-center h-full">
                    <li
                        v-for="(value) in appComponent.config['not_login'].menu"
                        class="text-neutral h-14 w-[120px] flex flex-row justify-center items-center text-center hover:bg-base-100 transition-all duration-300 group relative"
                    >
                        <RouterLink
                            :to="value.MENU_URL"
                            @click="
                                appComponent.onSaldo = false;
                                appComponent.onProfile = false;
                                appComponent.gAnalytics(value.MENU_TITLE);
                            "
                            v-bind="analyticsAttrs(`header:menu:${value.MENU_TITLE}`)"
                            class="h-14 flex items-center justify-center gap-1"
                        >
                            <div class="flex justify-center items-center">
                                <span class="text-xs font-poppinssb font-semibold text-neutral">
                                    {{ value.MENU_TITLE }}
                                </span>
                                <ArrowDownFull
                                    :height="15"
                                    :width="15"
                                    v-if="value.SUB_MENU && value.SUB_MENU?.length"
                                    class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 fill-neutral"
                                />
                            </div>
                        </RouterLink>

                        <!-- Submenú -->
                        <div
                            v-if="value.SUB_MENU && value.SUB_MENU?.length"
                            class="absolute top-full left-0 bg-base-200 rounded-b-lg z-50 hidden group-hover:block w-full"
                        >
                            <ul>
                                <li
                                    v-for="(subValue) in value.SUB_MENU"
                                    class="text-neutral hover:bg-base-100 hover:rounded-b-lg transition-all duration-300 px-4 py-3 text-justify"
                                >
                                    <RouterLink
                                        :to="subValue.MENU_URL"
                                        @click="
                                            appComponent.onSaldo = false;
                                            appComponent.onProfile = false;
                                            appComponent.gAnalytics(subValue.MENU_TITLE);
                                        "
                                        v-bind="analyticsAttrs(`header:submenu:${subValue.MENU_TITLE}`)"
                                        class="text-sm font-poppinssb font-semibold block"
                                    >
                                        {{ subValue.MENU_TITLE }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex justify-between lg:justify-end items-center gap-3 in"
             :class="
                appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2
                    ? 'w-full md:w-0'
                    : 'w-full'
            ">
            <!-- Container for menu button and search components for small screens -->
            <button
                aria-label="menu"
                @click="openMenu()"
                v-bind="analyticsAttrs('header:menu')"
                class="bg-base-200 h-12 w-12 flex lg:hidden justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid border-accent-content hover:scale-105"
            >
                <MenuIcon
                    :height="20"
                    :width="20"
                    class="fill-neutral"
                />
            </button>
            <div class="flex lg:hidden justify-center items-center w-[154px] h-[38px]">
                <RouterLink
                    to="/home"
                    class="w-full h-full hover:scale-105"
                    aria-label="Logo web"
                    v-bind="analyticsAttrs('header:logo')"
                >
                    <img
                        fetchpriority="high"
                        :srcset="
                            getSrcset(
                                appComponent.config.logo_ != undefined &&
                                    !appComponent.themeSportbook &&
                                    appComponent.config.logo_['dark'] != undefined &&
                                    appComponent.config.logo_['light'] != undefined
                                    ? appComponent.config.logo_['dark']
                                    : appComponent.config.logo_ != undefined &&
                                    appComponent.themeSportbook &&
                                    appComponent.config.logo_['dark'] != undefined &&
                                    appComponent.config.logo_['light'] != undefined
                                    ? appComponent.config.logo_['light']
                                    : appComponent.config.logo,
                            )
                        "
                        loading="lazy"
                        :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                        alt="Logo img"
                        class="w-full h-auto"
                    />
                </RouterLink>
            </div>
            <Search
                v-if="appComponent.config.showSearchGames === undefined || !appComponent.config.showSearchGames"
                class="flex lg:hidden"
            />
            <SearchCasinoSportbook
                v-else-if="appComponent.config.showSearchGames !== undefined && appComponent.config.showSearchGames"
                class="flex lg:hidden"
            />
            <div class="hidden lg:flex justify-center items-center gap-5">
                <!-- Header style version 2 -->
                <div
                    v-if="appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2"
                    class="flex justify-end items-center gap-2"
                >
                    <RouterLink
                        id="accion_registro"
                        to="/registro"
                        v-bind="analyticsAttrs('header:signup-btn')"    
                        class="bg-success h-10 w-28 flex justify-center items-center rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
                    >
                        {{ $t('Registrate') }}
                    </RouterLink>
                    <button
                        class="bg-primary h-10 w-36 rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
                        v-bind="analyticsAttrs('header:login-btn')"
                        @click="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
                    >
                        {{ $t('Iniciar sesión') }}
                    </button>
                    <ChangeLanguage />
                </div>
                <!-- Default header style version -->
                <div
                    v-else
                    class="flex justify-center items-center gap-2"
                >
                <!-- Container for login and registration buttons, and language selection for large screens -->
                <button
                    @click="() => showModalLogin()"
                    v-bind="analyticsAttrs('header:login-btn')"
                    :class="{
                        'bg-secondary h-10 w-44 rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105 btn-pyramid [text-shadow:_0_0_4px_black]': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                        'bg-primary-focus h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                            appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
                    }"
                >
                    {{ $t('Iniciar sesión') }}
                </button>
                <RouterLink
                    id="accion_registro_home"
                    to="/registro"
                    v-bind="analyticsAttrs('header:signup-btn')"
                    :class="{
                        'bg-success btn-pyramid h-10 w-44 flex justify-center items-center rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105': appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.ctaButtonVersion == undefined || appComponent.config.headerAssets.ctaButtonVersion == 1,
                        'bg-success h-12 px-6 flex justify-center items-center rounded-lg text-base font-semibold text-neutral-content shadow-lg hover:scale-105':
                            appComponent.config.headerAssets != undefined && appComponent.config.headerAssets.ctaButtonVersion != undefined && appComponent.config.headerAssets.ctaButtonVersion == 2
                    }"
                >
                    {{ $t('Registrate') }}
                </RouterLink>
                </div>
                <label
                    v-if="
                appComponent.config != undefined && appComponent.config.swichThemeMode != undefined
                && appComponent.config.swichThemeMode && appComponent.mobile == ''
                "
                    class="swap text-9xl flex justify-center items-center relative cursor-pointer scale-110"
                >
                    <img
                        :src="
                  !ligthMode
                  ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                  : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'"
                        alt=""
                    />
                    <!-- Hidden checkbox for the switch -->
                    <input
                        type="checkbox"
                        class="hidden"
                        v-bind="analyticsAttrs('header:toggle-theme')"
                        @click="changeLigthMode()"
                    />
                    <!-- Images for the switch states -->
                    <img
                        :src="moonIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="!ligthMode ? 'swap-off -left-[0.5px] absolute' : 'swap-on left-[5px] absolute'"
                    />
                    <img
                        :src="sunIcon"
                        alt=" "
                        class="absolute opacity-100"
                        :class="ligthMode ? 'swap-on -right-[1px] absolute' : 'swap-off right-[5px] absolute'"
                    />
                </label>
                <SelectLanguage
                    v-if="
                        appComponent.config.header_ != undefined &&
                        appComponent.config.header_.change_language != undefined
                            ? appComponent.config.header_.change_language
                            : appComponent.config.language.showSelectLang
                    "
                />
            </div>
        </div>
    </header>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

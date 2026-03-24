<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import IconMenu from '../../icons/Menu2Icon.vue'; // Importing IconMenu component
import SelectLanguage from '../../i18n/SelectLanguage.vue'; // Importing SelectLanguage component
import MenuMobile from '../../../components/menus/menuMobile/MenuMobile.vue'; // Importing MenuMobile component
import MenuMobile2 from '../../../components/menus/menuMobile/MenuMobile2.vue'; // Importing MenuMobile2 component

export default defineComponent({
    components: {
        MenuMobile, // Registering MenuMobile component
        MenuMobile2, // Registering MenuMobile2 component
        IconMenu, // Registering IconMenu component
        SelectLanguage, // Registering SelectLanguage component
    },
    data() {
        // Data function returning component state
        let appComponent: any = this.$appComponent; // Reference to the app component
        let flagInfoUser = false; // Flag for user info visibility
        let openSelectLang = false; // Flag for language selection visibility
        let notificationsUnread = 0; // Count of unread notifications
        let notifications: object = []; // Array to hold notifications

        return {
            appComponent, // Exposing appComponent to the template
            flagInfoUser, // Exposing flagInfoUser to the template
            openSelectLang, // Exposing openSelectLang to the template
            notificationsUnread, // Exposing notificationsUnread to the template
            notifications, // Exposing notifications to the template
            MenuMobile, // Exposing MenuMobile component to the template
        };
    },
    mounted() {
        // Lifecycle hook called after the component is mounted
    },
    methods: {
        getLogoUrl() {
            return this.appComponent.config.logo_ != undefined &&
            this.appComponent.config.theme_mode != undefined &&
            this.appComponent.config.logo_[this.appComponent.config.theme_mode] != undefined
                ? this.appComponent.config.logo_[this.appComponent.config.theme_mode]
                : this.appComponent.config.menuMobile.logo.url;
        },

        buildImgUrl(imageUrl: string, w?: number) {
            if (!imageUrl) return '';
            const imgixHost = this.appComponent.config !=undefined && this.appComponent.config.urlApi != undefined &&
                this.appComponent.config.urlApi.prefixImg != undefined
                ? this.appComponent.config.urlApi.prefixImg
                :'images.virtualsoft.tech/m';


            try {
                const normalized = (() => {
                    const s = String(imageUrl).trim();
                    if (s.startsWith('http://') || s.startsWith('https://')) return s;
                    if (s.startsWith('//')) return `${window.location.protocol}${s}`;
                    if (s.startsWith('/')) return `${window.location.origin}${s}`;
                    if (s.startsWith('m/')) return `${window.location.origin}/${s}`;
                    return `${window.location.origin}/${s}`;
                })();

                const srcUrl = new URL(normalized);

                // Si viene del origen o trae /m/, reescribe a Imgix (igual que main.js: /m/ -> /)
                const needsImgix = /\/m\//.test(srcUrl.pathname) || /images\./i.test(srcUrl.host) || /virtualsoft\.tech$/i.test(srcUrl.host);
                const imgixPath = srcUrl.pathname.replace('/m/', '/');
                const targetUrl = needsImgix ? new URL(`https://${imgixHost}${imgixPath}`) : new URL(srcUrl.toString());

                const sp = new URLSearchParams(srcUrl.search);

                if (typeof w === 'number' && !Number.isNaN(w)) {
                    sp.set('w', String(w));
                }

                // Defaults de compresión/formato si faltan
                if (!sp.has('auto') && !sp.has('fm')) {
                    sp.set('auto', 'format,compress');
                }
                if (!sp.has('fit')) sp.set('fit', 'max');

                // Compresión más agresiva por defecto (respetar si ya viene q/dpr)
                const mobileFlag = this.appComponent && this.appComponent.config && this.appComponent.config.mobileL != undefined
                    ? this.appComponent.config.mobileL
                    : '0';
                const isMobile = String(mobileFlag) === '1';
                if (!sp.has('q')) sp.set('q', isMobile ? '70' : '78');
                if (!sp.has('dpr')) sp.set('dpr', '2');

                targetUrl.search = sp.toString();
                return targetUrl.toString();
            } catch (e) {
                const baseUrl = String(imageUrl).split('?')[0];
                const qs: string[] = [];
                if (typeof w === 'number') qs.push(`w=${w}`);
                qs.push('auto=format,compress');
                qs.push('fit=max');
                const mobileFlag = this.appComponent && this.appComponent.config && this.appComponent.config.mobileL != undefined
                    ? this.appComponent.config.mobileL
                    : '0';
                const isMobile = String(mobileFlag) === '1';
                qs.push(`q=${isMobile ? '70' : '78'}`);
                qs.push('dpr=2');
                return `${baseUrl}?${qs.join('&')}`;
            }
        },

        buildSrcset(imageUrl: string, widths: number[]) {
            const uniq = Array.from(new Set(widths)).sort((a, b) => a - b);
            return uniq.map((w) => `${this.buildImgUrl(imageUrl, w)} ${w}w`).join(', ');
        },

        // Logo del header (mobile): slot visual ~75px, genera 1x/2x/3x
        getImgAttrsHeaderLogo(imageUrl: string, displayWidth = 88) {
            if (!imageUrl) return { src: '', srcset: '', sizes: '' };
            const w1 = Math.max(1, Math.round(displayWidth));
            const widths = [w1, w1 * 2, w1 * 3];
            return {
                src: this.buildImgUrl(imageUrl, w1),
                srcset: this.buildSrcset(imageUrl, widths),
                sizes: `${w1}px`,
            };
        },
    },
});
</script>
<template>
    <!-- Main navigation container with sticky positioning and dynamic background -->
    <div
        id="nav"
        class="inset-x-0 top-0 w-full transition duration-200 ease-in-out border-b border-neutral-content text-neutral sticky bg-opacity-70 z-30"
        :class="[
            appComponent.config.headerBar != undefined && appComponent.config.headerBar.bg != undefined
                ? appComponent.config.headerBar.bg
                : 'bg-base-300',
        ]"
        v-if="
            $route.name != 'banner-right' &&
            $route.name != 'banner-left' &&
            $route.name != 'banner-rightnl' &&
            $route.name != 'banner-leftnl' &&
            $route.name != 'banner-topcenternl' &&
            $route.name != 'banner-topcenter'
        "
    >
        <!-- Navbar container with responsive design -->
        <div class="mx-auto navbar max-w-none min-h-0 h-16 md:h-10 font-light p-0 drawer">
            <!-- Checkbox for drawer toggle -->
            <input
                id="main-menu"
                type="checkbox"
                class="drawer-toggle"
            />
            <!-- Drawer content area -->
            <div class="drawer-content">
                <!-- Button to open the drawer on mobile -->
                <label
                    for="main-menu"
                    class="btn btn-square btn-ghost drawer-button lg:hidden"
                >
                    <IconMenu />
                </label>
            </div>
            <!-- Mobile menu component -->
            <MenuMobile />
            <!-- Logo container for mobile view -->
            <div
                class="flex items-center flex-none lg:hidden h-[42px] w-[75px]"
                v-if="appComponent.config.menuMobile.logo.show"
            >
                <!-- Router link for homepage or POS menu based on app state -->
                <RouterLink
                    v-if="!appComponent.appPOS"
                    to="/"
                    class="p-0 flex-0 btn btn-ghost nuxt-link-active w-full h-full"
                    aria-label="Homepage"
                >
                    <!-- Logo image with dynamic source -->
                    <img
                        :src="getImgAttrsHeaderLogo(getLogoUrl(), 75).src"
                        :srcset="getImgAttrsHeaderLogo(getLogoUrl(), 75).srcset"
                        :sizes="getImgAttrsHeaderLogo(getLogoUrl(), 75).sizes"
                        alt="Logo"
                        width="75"
                        height="18"
                        decoding="async"
                        fetchpriority="high"
                        loading="eager"
                        class="header-logo w-full h-full object-contain"
                    />
                </RouterLink>
                <RouterLink
                    v-else
                    to="/pos/menu"
                    class="p-0 flex-0 btn btn-ghost nuxt-link-active w-full h-full"
                    aria-label="Homepage"
                >
                    <!-- Logo image for POS menu -->
                    <img
                        :src="getImgAttrsHeaderLogo(getLogoUrl(), 75).src"
                        :srcset="getImgAttrsHeaderLogo(getLogoUrl(), 75).srcset"
                        :sizes="getImgAttrsHeaderLogo(getLogoUrl(), 75).sizes"
                        alt="Logo"
                        width="75"
                        height="18"
                        decoding="async"
                        fetchpriority="high"
                        loading="eager"
                        class="header-logo w-full h-full object-contain"
                    />
                </RouterLink>
            </div>
            <!-- Right side controls including registration and login buttons -->
            <div class="ml-auto mr-3">
                <div class="flex-1"></div>
                <!-- Registration button -->
                <RouterLink
                    :to="appComponent.config.menuMobile.urlRegistro"
                    class="btn btn-sm btn-success lg:hidden mr-2 text-neutral"
                    aria-label="Homepage"
                >
                    {{ $t('Regístrate') }}
                </RouterLink>
                <!-- Login button -->
                <button
                    aria-label="Login"
                    class="btn btn-sm btn-primary lg:hidden text-neutral"
                >
                    <label
                        class=""
                        for="m-modal-login"
                        @click="appComponent.showModalLogin = true"
                    >{{ $t('Entrar') }}</label
                    >
                </button>
                <!-- Social networks icons container -->
                <div
                    v-if="
                        appComponent.config.header.showRedes &&
                        appComponent.config.SOCIAL_NEWTWORKS_HEADER != undefined &&
                        appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country] != undefined
                    "
                    class="items-center flex-none hidden lg:flex mr-2 text-xs"
                >
                    <!-- Social network links -->
                    <a
                        :aria-label="value.SOCIAL_ICON"
                        v-for="value in appComponent.config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]"
                        :href="value.SOCIAL_URL"
                        target="_blank"
                        class="text-2xl p-0.5"
                    >
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: value.SOCIAL_ICON }" />
                    </a>
                </div>
            </div>
            <!-- Language selection component -->
            <SelectLanguage
                v-if="
                    appComponent.config.header_ != undefined && appComponent.config.header_.change_language != undefined
                        ? appComponent.config.header_.change_language
                        : appComponent.config.language.showSelectLang
                "
                class="hidden lg:block"
            />
        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

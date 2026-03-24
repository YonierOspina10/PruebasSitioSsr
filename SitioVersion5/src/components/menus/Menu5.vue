<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { RouterView } from 'vue-router'; // Importing RouterView for routing
import IconClose from '../icons/IconClose.vue'; // Importing icon components
import WhistleIcon from '../icons/WhistleIcon.vue';
import CasinoCoinIcon from '../icons/CasinoCoinIcon.vue';
import FlagsIcon from '../icons/FlagsIcon.vue';
import LiveIcon from '../icons/LiveIcon.vue';
import WalletIcon from '../icons/WalletIcon.vue';
import ProfileIcon from '../icons/ProfileIcon.vue';
import ExitIcon from '../icons/ExitIcon.vue';
import LiveIcon2 from '@/components/icons/LiveIcon2.vue'; // Importing additional icon component

export default defineComponent({
    components: {
        // Registering components for use in the template
        LiveIcon2,
        IconClose,
        WhistleIcon,
        CasinoCoinIcon,
        FlagsIcon,
        LiveIcon,
        WalletIcon,
        ProfileIcon,
        ExitIcon,
    },
    data() {
        // Defining reactive data properties
        let config = this.$config(); // Accessing configuration
        let appComponent: any = this.$appComponent; // Accessing application component
        let onMenu: boolean = false; // State to track menu visibility
        return {
            config,
            appComponent,
            onMenu,
        };
    },
    methods: {
        // Defining methods for component functionality
        closeMenu() {
            // Method to close the menu
            this.onMenu = false; // Set menu state to closed
        },
        showDeposit() {
            // Method to show deposit modal
            this.appComponent.showModalDepositV2 = true; // Trigger deposit modal
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Menu5|layout:layout-${this.appComponent.config.layout}`
            };
        },
    },
});
</script>
<template>
    <!-- Main container for the component -->
    <section class="relative w-full flex justify-center items-center">
        <nav
            v-if="appComponent.session.logueado"
            class="bg-base-300 h-20 w-[101%] flex justify-around items-center text-center fixed z-[51] -bottom-[2px] lg:hidden shadow-lg shadow-neutral"
        >
            <RouterLink
                active-class="active-link"
                :to="
                    config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined
                        ? config.MENU_USER[appComponent.country][0].url
                        : '/deportes'
                "
                v-bind="analyticsAttrs(`header:menu:${config.MENU_USER[appComponent.country][0].title.toLowerCase().replace(/\s/g, '-')}`)"
                @click="closeMenu()"
                class="w-full h-full max-w-[20%] flex flex-col justify-center items-center gap-1 text-xs font-semibold"
            >
                <img
                    v-if="config.MENU_USER && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][0].icon.includes('https')"
                    :src="config.MENU_USER[appComponent.country][0].icon"
                    alt="Icon Deportes Menu Inferior"
                    class="w-9 aspect-square"
                />
                <div
                    :class="$route.fullPath == '/deportes' ? 'text-accent-content' : 'text-neutral'"
                    v-if="config.MENU_USER && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][0].icon.includes('<svg')"
                    class="text-neutral"
                    v-html="config.MENU_USER[appComponent.country][0].icon"
                ></div>
                <WhistleIcon
                    v-if="config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined"
                    :height="30"
                    :width="30"
                    :class="$route.fullPath == '/deportes' ? 'fill-accent-content' : 'fill-neutral'"
                />
                <span :class="$route.fullPath == '/deportes' ? 'text-accent-content' : 'text-neutral'">{{
                        $t(
                            config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined
                                ? 'Deportivas'
                                : config.MENU_USER[appComponent.country][0].title,
                        )
                    }}</span>
            </RouterLink>
            <RouterLink
                active-class="active-link"
                :to="
                    config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined
                        ? config.MENU_USER[appComponent.country][1].url
                        : '/new-casino'
                "
                v-bind="analyticsAttrs(`header:menu:${config.MENU_USER[appComponent.country][1].title.toLowerCase().replace(/\s/g, '-')}`)"
                @click="closeMenu()"
                class="w-full h-full max-w-[20%] flex flex-col justify-center items-center gap-1 text-neutral text-xs font-semibold"
            >
                <img
                    v-if="config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][1].icon.includes('https')"
                    :src="config.MENU_USER[appComponent.country][1].icon"
                    alt="Icon Futbol Menu Inferior"
                    class="w-9 aspect-square"
                />
                <div
                    :class="$route.fullPath == '/new-casino' ? 'text-accent-content' : 'text-neutral'"
                    v-if="config.MENU_USER && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][1].icon.includes('<svg')"
                    class="text-neutral"
                    v-html="config.MENU_USER[appComponent.country][1].icon"
                ></div>
                <CasinoCoinIcon
                    v-if="config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined"
                    :height="30"
                    :width="30"
                    :class="$route.fullPath == '/new-casino' ? 'fill-accent-content' : 'fill-neutral'"
                />
                <span :class="$route.fullPath == '/new-casino' ? 'text-accent-content' : 'text-neutral'">{{
                        $t(
                            config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined
                                ? 'Casino'
                                : config.MENU_USER[appComponent.country][1].title,
                        )
                    }}</span>
            </RouterLink>
            <div
                v-if="
                    appComponent.config.avatarMenuUser === undefined ||
                    appComponent.config.avatarMenuUser
                "
                class="w-full max-w-[20%] relative flex justify-center items-center"
            >
                <button
                    class="absolute bg-neutral w-20 h-20 rounded-full top-[-55px] border-2 border-secondary"
                    @click="
                        onMenu = !onMenu;
                        appComponent.gAnalytics('menu_mobile');
                    "
                >
                    <img
                        :src="
                            config.img_menu_mobile !== undefined
                                ? config.img_menu_mobile
                                : 'https://images.virtualsoft.tech/m/msjT1683329139.png'
                        "
                        alt=""
                        class="w-full h-full"
                    />
                    <ExitIcon
                        v-if="onMenu"
                        :height="23"
                        :width="23"
                        :fill="'#ffffff'"
                        :fill2="'#FF0000'"
                        class="blob w-7 h-7 absolute top-0 right-0 shadow-lg"
                    />
                </button>
            </div>
            <button
                v-else
                @click="
                        onMenu = !onMenu;
                        appComponent.gAnalytics('menu_mobile');
                    "
                v-bind="analyticsAttrs('header:user-menu')"
                class="w-full h-full max-w-[20%] flex flex-col justify-center items-center gap-1 text-neutral text-xs font-semibold bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content shadow-inner shadow-accent-content/50"
            >
                <span class="text-neutral">{{ $t('Cuenta') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 24 34" fill="none">
                    <path
                        d="M12 0C13.6953 0 15.3525 0.498516 16.762 1.43251C18.1716 2.3665 19.2702 3.69402 19.919 5.24719C20.5677 6.80036 20.7375 8.50943 20.4067 10.1583C20.076 11.8071 19.2597 13.3217 18.0609 14.5104C16.8622 15.6992 15.3349 16.5087 13.6722 16.8367C12.0095 17.1647 10.2861 16.9963 8.71986 16.353C7.15363 15.7096 5.81496 14.6202 4.87312 13.2223C3.93128 11.8245 3.42857 10.1811 3.42857 8.5L3.43714 8.1311C3.533 5.94278 4.47704 3.87562 6.07238 2.36072C7.66772 0.845821 9.79121 0.000126552 12 0ZM15.4286 20.4C17.7019 20.4 19.882 21.2955 21.4895 22.8896C23.0969 24.4837 24 26.6457 24 28.9V30.6C24 31.5017 23.6388 32.3665 22.9958 33.0042C22.3528 33.6418 21.4807 34 20.5714 34H3.42857C2.51926 34 1.64719 33.6418 1.00421 33.0042C0.361223 32.3665 0 31.5017 0 30.6V28.9C0 26.6457 0.903059 24.4837 2.51051 22.8896C4.11797 21.2955 6.29814 20.4 8.57143 20.4H15.4286Z"
                        fill="currentColor" />
                </svg>
            </button>
            <RouterLink
                active-class="active-link"
                :to="
                    config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined
                        ? config.MENU_USER[appComponent.country][2].url
                        : '/virtuales-lobby'
                "
                v-bind="analyticsAttrs(`header:menu:${config.MENU_USER[appComponent.country][2].title.toLowerCase().replace(/\s/g, '-')}`)"
                @click="closeMenu()"
                class="w-full h-full max-w-[20%] flex flex-col justify-center items-center gap-1 text-neutral text-xs font-semibold"
            >
                <img
                    v-if="config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][2].icon.includes('https')"
                    :src="config.MENU_USER[appComponent.country][2].icon"
                    alt="Icon Deportes Menu Inferior"
                    class="w-9 aspect-square"
                />
                <div
                    :class="$route.fullPath == '/virtuales-lobby' ? 'text-accent-content' : 'text-neutral'"
                    v-if="config.MENU_USER && config.MENU_USER[appComponent.country] !== undefined && config.MENU_USER[appComponent.country][2].icon.includes('<svg')"
                    class="text-neutral"
                    v-html="config.MENU_USER[appComponent.country][2].icon"
                ></div>
                <FlagsIcon
                    v-if="config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined"
                    :height="30"
                    :width="40"
                    :class="$route.fullPath == '/virtuales-lobby' ? 'fill-accent-content' : 'fill-neutral'"
                />
                <span :class="$route.fullPath == '/virtuales-lobby' ? 'text-accent-content' : 'text-neutral'">{{
                        $t(
                            config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined
                                ? 'Virtuales'
                                : config.MENU_USER[appComponent.country][2].title,
                        )
                    }}</span>
            </RouterLink>
            <RouterLink
                active-class="active-link"
                :to="
                    config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined
                        ? config.MENU_USER[appComponent.country][3].url
                        : '/live-casino-vivo'
                "
                v-bind="analyticsAttrs(`header:menu:${config.MENU_USER[appComponent.country][3].title.toLowerCase().replace(/\s/g, '-')}`)"
                @click="closeMenu()"
                class="w-full h-full max-w-[20%] flex flex-col justify-center items-center gap-1 text-neutral text-xs font-semibold"
            >
                <img
                    v-if="config.MENU_USER !== undefined && config.MENU_USER[appComponent.country] !== undefined"
                    :src="config.MENU_USER[appComponent.country][3].icon"
                    alt="Icon  Menu Inferior"
                    class="w-9 aspect-square"
                />
                <LiveIcon
                    v-if="config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined"
                    :height="30"
                    :width="30"
                    :class="$route.fullPath == '/live-casino-vivo' ? 'fill-accent-content' : 'fill-neutral'"
                />
                <span
                    class="w-12 leading-none text-center"
                    :class="$route.fullPath == '/live-casino-vivo' ? 'text-accent-content' : 'text-neutral'"
                >{{
                        $t(
                            config.MENU_USER == undefined || config.MENU_USER[appComponent.country] == undefined
                                ? 'En vivo'
                                : config.MENU_USER[appComponent.country][3].title,
                        )
                    }}</span
                >
            </RouterLink>
        </nav>
        <nav
            v-else
            class="menu_user bg-primary fixed -bottom-1 left-0 z-[100] flex justify-around items-center gap-2 h-[70px] w-full lg:hidden p-2"
        >
            <!-- Login button text -->
            <button
                class="bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content h-9 w-36 flex justify-center items-center rounded-full text-lg text-info-text font-semibold shadow-xl hover:scale-105"
                @click="appComponent.showModalLogin = true"
                v-bind="analyticsAttrs('header:login-btn')"
            >
                {{ $t('Iniciar sesión') }}
            </button>
            <RouterLink
                to="/home"
                class="w-16 h-16 rounded-full flex justify-center items-center"
                aria-label="Redireccion pagina principal"
                v-bind="analyticsAttrs('header:logo')"
            >
                <img
                    :src="config.header.logoUrl2"
                    alt=""
                    class=""
                />
                <!-- Logo image -->
            </RouterLink>

            <RouterLink
                id="accion_registro"
                to="/registro"
                class="bg-gradient-to-r from-accent-content via-secondary-focus to-accent-content h-9 w-36 flex justify-center items-center rounded-full text-lg text-info-text font-semibold shadow-xl hover:scale-105"
                v-bind="analyticsAttrs('header:signup-btn')"
            >
                {{ $t('Registrate') }}
            </RouterLink>
        </nav>
        <article
            :class="
                appComponent.config.bettingHistory != undefined &&
                appComponent.config.bettingHistory[appComponent.country] != undefined &&
                appComponent.config.bettingHistory[appComponent.country].show != undefined &&
                appComponent.config.bettingHistory[appComponent.country].show
                    ? 'gap-2'
                    : 'gap-8'
            "
            class="menu_extra w-72 h-36 fixed z-[50] bg-secondary-focus/40 rounded-t-full shadow-md shadow-black flex justify-center items-center lg:hidden"
            :style="[{ bottom: onMenu ? '65px' : '-300px' }, { opacity: onMenu ? '1' : '0' }]"
        >
            <div
                class="bg-secondary w-72 h-36 fixed backdrop-blur-[1px] z-[1] rounded-t-full shadow-md shadow-black flex justify-center items-center lg:hidden"
            ></div>
            <RouterLink
                :to="config.MENU_USER_EXTRA == undefined ? '/mensajes' : config.MENU_USER_EXTRA[0].url"
                @click="onMenu = false"
                v-bind="analyticsAttrs('header:user-menu:inbox')"
                class="flex flex-col justify-center items-center mt-16 z-10 indicator relative hover:scale-90 transition-all ease-in-out"
            >
                <img
                    v-if="config.MENU_USER_EXTRA != undefined"
                    :src="config.MENU_USER_EXTRA[0].icon"
                    class="w-[30px] h-[30px]"
                />
                <span
                    class="z-0 indicator-item badge badge-primary rounded-2xl text-neutral text-xs xl:text-sm left-4"
                    :class="[appComponent.mensajesUnread == 0 ? 'bg-gray-500' : 'bg-[#23b950]']"
                >
                    {{ appComponent.mensajesUnread }}
                    <!-- Display unread messages count -->
                </span>
                <font-awesome-icon
                    v-if="config.MENU_USER_EXTRA == undefined || config.MENU_USER_EXTRA[0].icon == undefined"
                    class="text-2xl icon-envelope text-neutral"
                    icon="fa-solid fa-envelope"
                />
                <p class="text-sm text-neutral">
                    {{ $t(config.MENU_USER_EXTRA == undefined ? 'Mensajes' : config.MENU_USER_EXTRA[0].title) }}
                </p>
            </RouterLink>
            <div class="flex flex-col justify-center items-center z-10">
                <div class="flex flex-row justify-center items-center gap-x-4">
                    <RouterLink
                        to="#"
                        @click="
                            onMenu = false;
                            showDeposit();
                        "
                        v-bind="analyticsAttrs('header:user-menu:deposit-btn')"
                        class="flex flex-col justify-center items-center"
                        :class="
                            (appComponent.config != undefined &&
                                appComponent.config.newViewIdInMenu != undefined &&
                                !appComponent.config.newViewIdInMenu) ||
                            (appComponent.config != undefined && appComponent.config.newViewIdInMenu == undefined)
                                ? 'mb-12'
                                : 'mb-4'
                        "
                    >
                        <img
                            src="https://images.virtualsoft.tech/m/msjT1683330578.png"
                            alt=""
                            :width="
                                (appComponent.config != undefined &&
                                    appComponent.config.newViewIdInMenu != undefined &&
                                    !appComponent.config.newViewIdInMenu) ||
                                (appComponent.config != undefined && appComponent.config.newViewIdInMenu == undefined)
                                    ? '40'
                                    : '27'
                            "
                            :height="40"
                            class="scale-125"
                        />
                        <p class="text-sm text-neutral">
                            {{ $t('Depositar') }}
                            <!-- Translated text for deposit -->
                        </p>
                    </RouterLink>
                    <RouterLink
                        v-if="
                            appComponent.config.bettingHistory != undefined &&
                            appComponent.config.bettingHistory[appComponent.country] != undefined &&
                            appComponent.config.bettingHistory[appComponent.country].show != undefined &&
                            appComponent.config.bettingHistory[appComponent.country].show
                        "
                        :to="
                            appComponent.config.bettingHistory[appComponent.country].url != undefined
                                ? appComponent.config.bettingHistory[appComponent.country].url
                                : '/consulta/consulta_tickets_online'
                        "
                        @click="onMenu = false"
                        class="flex flex-col justify-center items-center mb-12"
                    >
                        <img
                            :src="
                                appComponent.config.bettingHistory[appComponent.country].img != undefined
                                    ? appComponent.config.bettingHistory[appComponent.country].img
                                    : 'https://images.virtualsoft.tech/m/msj0212T1704401123.png'
                            "
                            alt=""
                            width="40"
                            height="40"
                            class="scale-125"
                        />
                        <p class="text-sm text-neutral text-center">
                            {{
                                $t(
                                    appComponent.config.bettingHistory[appComponent.country].text != undefined
                                        ? appComponent.config.bettingHistory[appComponent.country].text
                                        : 'Historial',
                                )
                            }}
                        </p>
                    </RouterLink>
                </div>
                <div
                    v-if="
                        appComponent.config != undefined &&
                        appComponent.config.newViewIdInMenu != undefined &&
                        appComponent.config.newViewIdInMenu
                    "
                    class="flex justify-center items-center mb-8"
                >
                    <RouterLink
                        to="/gestion/gestion_cuenta"
                        class="flex flex-col justify-center items-center hover:scale-105"
                        @click="closeMenu()"
                        v-bind="analyticsAttrs('header:user-menu:my-account-id-icon')"
                    >
                        <img
                            src="https://images.virtualsoft.tech/m/msj19212T1722345801.png"
                            alt=""
                        />
                        <span class="saldo text-neutral text-base">{{ appComponent.session.usuario }}</span>
                        <!-- Display user session information -->
                    </RouterLink>
                </div>
            </div>
            <RouterLink
                :to="config.MENU_USER_EXTRA == undefined ? '/gestion/gestion_cuenta' : config.MENU_USER_EXTRA[2].url"
                @click="onMenu = false"
                v-bind="analyticsAttrs('header:user-menu:my-account-profile-icon')"
                class="flex flex-col justify-center items-center gap-1 mt-16 z-10"
            >
                <img
                    v-if="config.MENU_USER_EXTRA != undefined && config.MENU_USER_EXTRA[2].icon != undefined"
                    :src="config.MENU_USER_EXTRA[2].icon"
                    class="w-[30px] h-[30px]"
                />
                <ProfileIcon
                    v-if="config.MENU_USER_EXTRA == undefined || config.MENU_USER_EXTRA[2].icon == undefined"
                    :height="32"
                    :width="29"
                    :fill="'#fff'"
                />
                <p class="text-sm text-neutral max-w-[50px] text-center leading-3">
                    {{ $t(config.MENU_USER_EXTRA == undefined ? 'Mi Perfil' : config.MENU_USER_EXTRA[2].title) }}
                </p>
            </RouterLink>
        </article>
    </section>
</template>
<style scoped>
.button__menu {
    text-shadow: 0 0 4px black; /* Text shadow for button */
}

.active-link > span {
    color: white; /* Active link text color */
}

.menu_extra {
    transition: 0.3s linear; /* Smooth transition for menu */
}
</style>

<!-- FILE DOCUMENTED -->

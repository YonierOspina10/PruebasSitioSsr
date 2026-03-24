<script setup lang="ts">
import Btn from '../buttons/Btn.vue'; // Import button component
import { headerSocial } from '@/utils'; // Import social header data
import SocialNetWork from '@/components/socialNetwork/socialNetWork.vue'; // Import social network component
import { onMounted, reactive, ref } from 'vue'; // Import Vue composition API functions
import { menuFloatingUserLogin, sessionUser, useAppHeaderMenu, useAppSocialNetwork } from '@/composables/useAppHeader'; // Import composables for header menu and social network
import IconMenu from '@/components/icons/menu/IconMenu.vue'; // Import menu icon component
import MenuMobile3 from '@/components/menus/MenuMobile3.vue'; // Import mobile menu component
import FloatingMenu from '@/components/menus/FloatingMenu.vue'; // Import floating menu component
import type { MenuFloating } from '@/interface/IMenu'; // Import MenuFloating type
import NotificationAlert from '@/components/notification/NotificationAlert.vue'; // Import notification alert component
import BalanceUser from '@/components/BalanceUser.vue'; // Import user balance component
import router from '@/router'; // Import router for navigation
import IconArrow from '@/components/icons/Arrow/IconArrow.vue'; // Import arrow icon component
import IconProfile from '@/components/icons/IconProfile.vue'; // Import profile icon component
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import app component store
import SearchField from '@/components/search/SearchField.vue'; // Import search field component
import ThemeButton from '@/components/ThemeButton.vue';
import { RouterLink } from 'vue-router';

let appComponentData = ref<any>(useAppcomponentStore().appComponent); // Reactive reference for app component data
const { config, notificationMessages } = useAppHeaderMenu(); // Destructure config and notification messages from header menu composable
const { menuUser } = menuFloatingUserLogin(); // Get user menu from floating menu composable
let { appComponent } = sessionUser(); // Get session user data
const openMenuMobile = ref<boolean>(false); // Reactive reference for mobile menu state
const openSelectLang = ref<boolean[]>(false); // Reactive reference for language selection dropdown
const flagInfoUser = ref<boolean>(false); // Reactive reference for user info modal state
const isOpen = ref<boolean>(false); // Reactive reference for menu open state
const menuFloating = reactive<{ data: MenuFloating[] }>({ data: [] }); // Reactive object for floating menu data
const { servicio } = useAppHeaderMenu(); // Get service data from header menu composable
const activeSubmenu = ref<string | null>(null); // Reactive reference for active submenu
const { socialNetworkHeader } = useAppSocialNetwork(); // Get social network header data

// Populate header social items with available social network data
headerSocial.forEach((headerItem, index) => {
    const socialItem = socialNetworkHeader.value[index];
    if (socialItem) {
        Object.keys(headerItem).forEach((key) => {
            if (headerItem[key] === '' && socialItem[key]) {
                headerItem[key] = socialItem[key];
            }
        });
    }
});

// Lifecycle hook to run when component is mounted
onMounted(() => {
    menuFloatinMenu(); // Initialize floating menu data
});

// Function to set floating menu data
const menuFloatinMenu = (): void => {
    menuFloating.data = menuUser; // Assign user menu to floating menu data
};

// Function to toggle mobile menu visibility
const onOpenMenuMobile = (): void => {
    isOpen.value = !isOpen.value; // Toggle menu open state
    openMenuMobile.value = true; // Set mobile menu state to open
};

// Function to handle modal click event
const onClickModal = (): void => {
    isOpen.value = false; // Close menu
    openMenuMobile.value = false; // Close mobile menu
};

// Function to close modal and navigate to a specific path
const closeModalDetails = (path): void => {
    router.push(path); // Navigate to the specified path
    flagInfoUser.value = false; // Close user info modal
};

// Function to open a URL in the top window
const clickBox = (box: any) => {
    window.open(box.url, '_top'); // Open URL in top window
};

// Function to log out the user
const logOut = () => {
    appComponent.gAnalytics('exit_profile'); // Track analytics event for logout
    appComponent.logOut(); // Call logout method
};

// Function to generate analytics attributes 
const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:HeaderDesktopMobile3|layout:layout-${appComponent.config.layout}}`
});

// Function to toggle submenu visibility
const toggleMenu = (menuId: string): void => {
    activeSubmenu.value = activeSubmenu.value === menuId ? null : menuId; // Toggle active submenu
};

// Function to open the main menu
const openMenu = (): void => {
    activeSubmenu.value = true; // Set active submenu to true
};

// Function to close the main menu
const closeMenu = (): void => {
    activeSubmenu.value = null; // Reset active submenu
};

// Function to close all menus
const closeAllMenus = (): void => {
    activeSubmenu.value = null; // Reset active submenu
};
</script>

<template>
    <!-- Main navigation container -->
    <div v-bind="$attrs" id="nav" :class="[
    'inset-x-0 top-0 z-[170] w-full min-h-[50px] h-[55px] fixed general-container py-2',
    'transition duration-200 ease-in-out',
    'text-neutral','md:translate-x-0','bg-base-300 header__menu'
  ]">
        <!-- Mobile menu button and search field -->
        <div class="w-full min-w-[288px] h-full md:hidden flex justify-center relative items-center px-2">
            <icon-menu width="34px" height="34px"
                       class="cursor-pointer absolute left-2 top-1 transform fill-neutral-content"
                       v-bind="analyticsAttrs('menu:toggle')"
                       @click="onOpenMenuMobile" />
            <SearchField class="cursor-pointer absolute left-[3.5rem] transform z-[100]" />
            <notification-alert
                v-if="appComponent.session.logueado"
                :notification-count="notificationMessages"
                event-analitic=""
                url="/mensajes"
                v-bind="analyticsAttrs('header:inbox')"
                class="cursor-pointer absolute left-[6rem] transform"
                w="33px"
                h="33px"
            />
            <!-- Logo with router link -->
            <div class="absolute left-1/2 transform -translate-x-1/2 top-2">
                <router-link 
                    to="/home" 
                    v-bind="analyticsAttrs('header:logo')"
                    class="w-full flex justify-center items-center"
                >
                    <img :src="appComponent.config.logo" alt="image_logo" class="w-[100px] h-[30px] object-contain" />
                </router-link>
            </div>
            <balance-user v-if="appComponent.session.logueado"
                          :show-balance="true"
                          :is-relative="true"
                          width="110px"
                          height="15px"
                          text-size="12px"
                          class="cursor-pointer absolute right-2 top-3 transform font-poppinssl" />
            <menu-mobile3 :is-open="isOpen" @on-click-modal="onClickModal" />
        </div>
        <!-- User login buttons for non-logged in users -->
        <div v-if="!appComponent.session.logueado"
        class="w-full h-full min-w-[288px] items-center justify-end gap-[20px] top-0 right-1 hidden md:flex md:h-16 px-2 fixed">
        <div>
            <ThemeButton></ThemeButton>
        </div>
            <div class="flex items-center gap-[20px] relative border-l-1 pl-5 border-neutral">
                <btn
                    w="100px"
                    h="33px"
                    :text="$t('Iniciar Sesión')"
                    bg="transparent"
                    :is-visible-line="true"
                    :is-visible-line-mobile="false"
                    v-bind="analyticsAttrs('header:login-btn')"
                    class="text-neutral text-[14px] font-normal rounded-[10px] hover:text-primary hover:scale-[1.1] border-none"
                    id="accion_iniciarsesion"
                    @click="appComponent.gAnalytics('menu_top', 'accion_iniciarsesion'); appComponent.showModalLogin=true"
                />
                <router-link 
                    to="/registro"
                    v-bind="analyticsAttrs('header:singup-btn')"
                >
                    <btn
                        w="100px"
                        h="30px"
                        :text="$t('Regístrate')"
                        :is-visible-line-mobile="false"
                        :is-visible-line="false"
                        class="text-neutral text-[14px] font-normal rounded-[10px] hover:scale-[1.1] bg-success"
                    />
                </router-link>
            </div>
            <div class="flex items-center rounded-full gap-1 bg-base-300 p-2">
                <social-net-work :custom-icons="headerSocial"/>
            </div>
        </div>
        <!-- User information and notifications for logged in users -->
        <div v-if="appComponent.session.logueado"
             class="w-full h-full min-w-[288px] items-center justify-end gap-[0.75rem] absolute top-0 right-0 hidden lg:flex px-3">
            <div class="flex justify-center items-center h-[50px] text-center grow-[20]">
                <div
                    v-if="(config.header_ != undefined && config.header_.top_band != undefined ? config.header_.top_band : config.header.showTicker) && appComponent.boxes.length > 0 && appComponent.session.logueado"
                    class="ticker-mobile items-baseline hidden text-start md:text-end md:flex justify-start md:justify-end md:w-[65%]">
                    <div class="viewport" v-bind:class="{moving: appComponent.moving}">
                        <div class="box flex justify-start md:justify-end" v-for="box in appComponent.boxes">
                            <span @click="clickBox(box); appComponent.gAnalytics('pronter')" v-html="box.title"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ThemeButton></ThemeButton>
            </div>
            <hr class="w-[2px] h-[35px] bg-neutral border-0 rotate-180" />
            <div class="flex flex-col justify-center items-center gap-1">
                <div class="relative group" @mouseleave="closeAllMenus">
                    <!-- Botón del menú -->
                    <button
                        v-bind="analyticsAttrs('header:services')"
                        class="flex items-center gap-2 font-bold text-primary font-poppinssl text-[13px] button__menu"
                    >
                        {{ $t('servicios') }}
                        <icon-arrow
                            width="9px"
                            height="8px"
                            class="group-hover:rotate-[180deg] group-hover:transition group-hover:duration-400 ml-2 stroke-primary"
                        />
                    </button>

                    <!-- Submenú -->
                    <div
                        class="sub__menu absolute top-full mt-[0.67rem] left-[-5rem] backdrop-blur-sm bg-base-300/40 text-neutral min-w-[240px] rounded-md shadow-lg transition-all duration-200 ease-in-out z-[170]"
                        @mouseenter="openMenu" @mouseleave="closeMenu"
                    >
                        <ul>
                            <li
                                v-for="menu in appComponentData.menus_service"
                                :key="menu.MENU_ID"
                                class="py-2 cursor-pointer relative group z-[170]"
                            >
          <span
              class="flex items-center gap-2 pl-2 hover:border-l-2 hover:border-neutral py-2"
              v-bind="analyticsAttrs(`header:services:menu-${menu.MENU_TITLE.toLowerCase().replace(' ', '-')}`)"
              @click="toggleMenu(menu.MENU_ID)"
          >
            {{ $t(menu.MENU_TITLE) }}
            <icon-arrow
                width="9px"
                height="8px"
                :class="{
                'rotate-180 transition-transform duration-200': activeSubmenu === menu.MENU_ID,
              }"
                class="ml-2 stroke-neutral"
            />
          </span>

                                <!-- Submenú del item -->
                                <ul
                                    v-if="activeSubmenu === menu.MENU_ID"
                                    class="pl-4 mt-2 rounded-md pb-[2rem]"
                                >
                                    <li
                                        v-for="submenu in menu.SUBMENUS"
                                        :key="submenu.MENU_SLUG"
                                        class="py-1 cursor-pointer text-neutral ml-2 hover:scale-90"
                                    >
                                        <router-link 
                                            v-bind="analyticsAttrs(`header:services:submenu-${submenu.SUBMENU_TITLE.toLowerCase().replace(' ', '-')}`)"
                                            :to="
												'/' +
												menu.MENU_SLUG +
												'/' +
												submenu.SUBMENU_URL
										">
                                            {{ $t(submenu.SUBMENU_TITLE) }}
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center gap-2 grow-0 rounded-full bg-base-200 h-12 p-2">
                <notification-alert
                    :notification-count="notificationMessages"
                    event-analitic=""
                    v-bind="analyticsAttrs('header:inbox')"
                    url="/mensajes"
                />
                <!---Burbuja de usuario--->
                <div class="relative group">
                    <!-- Círculo de perfil -->
                    <div class="circle__profile-container w-full px-4 cursor-pointer hover:scale-105 transition-transform duration-200">
                        <!-- El círculo principal -->
                        <div class="circle__profile bg-primary flex items-center justify-center">
                            <icon-profile width="24px" height="24px" class="stroke-neutral-content"/>
                        </div>
                    </div>

                    <!-- Contenido visible al hover -->
                    <div
                        class="hidden group-hover:flex items-center justify-center absolute top-[4.5rem] left-0
           backdrop-blur-sm bg-base-300/80 border-[1.5px] border-base-300/60 text-neutral w-[180px] h-[90px] rounded-md shadow-lg
           transition-all duration-200 ease-in-out z-[14]"
                    >
                        <div class="flex items-center justify-center gap-[1rem] h-full px-1 mx-auto">
                            <RouterLink
                                to="/gestion/gestion_cuenta"
                                v-bind="analyticsAttrs('header:my-account')"
                                class="circle__profile-container-id cursor-pointer transition-transform duration-200">
                                <div class="circle__profile-spin-id border-[1.5px] border-primary"></div>
                                <div
                                    class="circle__profile-submenu bg-primary border-[1.5px] border-neutral flex items-center justify-center">
                                    <icon-profile width="24px" height="24px" class="stroke-neutral-content" />
                                </div>
                            </RouterLink>
                            <div class="flex flex-col items-start justify-start">
                <span :title="appComponent.session.nombre ? appComponent.session.nombre : 'User name'"
                      class="font-poppinsm text-primary text-base  max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">{{
                        appComponent.session.nombre ? appComponent.session.nombre : 'User name'
                    }}</span>
                                <span class="text-neutral font-poppinsm text-sm"> ID:  {{ appComponent.session.usuario
                                    }}</span>
                                <div class="flex justify-start items-center gap-1">
                                    <div class="flex justify-start items-center gap-1">
											<span
                                                :class="'country-flags ' + appComponent.country"
                                            ></span>
                                        <span
                                            class="text-neutral text-base text-start font-poppinssl"
                                        >{{ appComponent.session.pais_nom }}</span
                                        >
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div v-if="appComponent.session.logueado" class="flex flex-col items-start justify-start mb-1 ">
                    <p :title="appComponent.session.nombre ? appComponent.session.nombre : 'User name'"
                       class="text-start font-normal font-poppinssb text-[13px] max-w-[300px] sm:max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {{ appComponent.session.nombre ? appComponent.session.nombre : 'User name' }} </p>
                    <BalanceUser :show-balance="true" height="10px"/>
                </div>

                <router-link to="/gestion/deposito">
                    <btn
                        @click="appComponent.showModalDepositV2 = true"
                        id="accion_depositar"
                        w="100px"
                        h="22px"
                        :text="$t('Recargar')"
                        font-weight="font-poppinsm"
                        v-bind="analyticsAttrs('header:deposit-btn')"
                        class="text-neutral bg-success text-[13px] font-normal rounded-[8px] hover:scale-[1.1] "
                        :is-visible-line="false"
                        :is-visible-line-mobile="false"
                    />
                </router-link>
            </div>
            <hr class="w-[2px] h-[35px] bg-neutral border-0 rotate-180"/>
            <div class="flex justify-center items-center gap-[1rem] h-[50px] text-center grow-0">
                <btn
                    @click="logOut"
                    w="60px"
                    h="22px"
                    :text="$t('Salir')"
                    v-bind="analyticsAttrs('header:logout-btn')"
                    font-weight="font-poppinsm"
                    class="text-neutral bg-secondary text-[13px] font-normal rounded-[8px] hover:scale-[1.1]"
                    :is-visible-line="false"
                    :is-visible-line-mobile="false"
                />
                <div class="items-center flex-none"
                     v-if="appComponent.config.header_ != undefined && appComponent.config.header_.change_language != undefined ? appComponent.config.header_.change_language : appComponent.config.language.showSelectLang">
                    <div class="dropdown dropdown-end relative">
                        <div 
                            tabindex="0"  
                            class="m-1 btn btn-xs mt-4 gap-2 mb-[1rem] mr-5 bg-secondary text-neutral" 
                            v-bind="analyticsAttrs('header:change-language')"
                            @click="openSelectLang = true"
                        >
                            <span :class="'country-flags ' + appComponent.selectFlag"></span>
                            <span>{{ appComponent.lngProd }}</span>

                        </div>
                        <ul 
                            tabindex="0" 
                            class="p-2 menu dropdown-content bg-secondary rounded-box w-24 text-neutral"
                            v-if="openSelectLang"
                        >
                            <li 
                                v-for="country in appComponent.countries"
                                v-bind="analyticsAttrs(`header:change-language:${country.name.toLocaleLowerCase()}`)"
                                @click="appComponent.changeLanguage(country.name, country.flag); 
                                openSelectLang = false"
                            >
                <span>
                  <span :class="'country-flags ' + country.flag"></span> {{ country.name.toLocaleUpperCase() }}
                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- Floating menu for logged in users -->
    <div v-if="appComponent.session.logueado" :style="{borderRadius:'20px'}" id="nav" :class="[
    { 'hidden': openMenuMobile, 'z-[60] visible': !openMenuMobile && !appComponent.showGame },
    { 'z-[9999]': appComponent.showGame },
    'flex items-center justify-center inset-x-0 bottom-0 fixed w-full sm:w-[400px] min-w-[200px] max-w-[500px] min-h-[64px] h-[63px] general-container py-2 mx-auto',
    'transition duration-200 ease-in-out','bg-base-300/50 backdrop-blur-sm',
    'text-neutral', 'lg:translate-x-0','visible lg:hidden'
  ]">
        <floating-menu :menu-data-list="menuFloating.data" /> <!-- Floating menu component -->
    </div>
    <!-- Floating menu for non-logged in users -->
    <div v-if="!appComponent.session.logueado" id="nav" :class="[
    { 'hidden': openMenuMobile, 'z-[60] visible': !openMenuMobile },
    'flex items-center justify-center inset-x-0 bottom-0 z-[11] w-full min-h-[64px] h-[63px] fixed general-container py-4 mx-auto',
    'transition duration-200 ease-in-out',
    'text-neutral', 'lg:translate-x-0','bg-base-300/50 backdrop-blur-sm','visible md:hidden'
  ]">
        <div class="flex items-center justify-around mx-auto gap-[0.75rem] relative">
            <btn
                w="100px"
                h="33px"
                :text="$t('Iniciar Sesión')"
                bg="transparent"
                :is-visible-line="false"
                :is-visible-line-mobile="true"
                v-bind="analyticsAttrs('header:login-btn')"
                class="text-[14px] font-normal rounded-[10px] text-primary hover:scale-[1.1] border-none"
                id="accion_iniciarsesion"
                @click="appComponent.gAnalytics('menu_top', 'accion_iniciarsesion'); appComponent.showModalLogin=true"
            />
            <router-link   
                v-bind="analyticsAttrs('header:signup-btn')"
                to="/registro"
            >
                <btn
                    w="100px"
                    h="30px"
                    :text="$t('Regístrate')"
                    :is-visible-line-mobile="false"
                    class="text-neutral text-[16px] font-normal rounded-[10px] hover:scale-[1.1] bg-success"
                    :is-visible-line="false"
                />
            </router-link>
        </div>
    </div>
    <!-- User info modal -->
    <Teleport v-if="flagInfoUser" to="body">
        <div class="modal detalle-usuario  items-center">
            <div
                class="modal-box rounded-2xl text-neutral-content relative flex justify-center items-center flex-col text-center">
                <label for="my-modal-3" @click="flagInfoUser=false"
                       class="absolute right-2 top-2 cursor-pointer text-right block text-xl hover:text-red-700">
                    <font-awesome-icon class="icon-cross" icon="fa-solid fa-close" />
                </label>
                <div class="usuario-pais-detaller">
                    <font-awesome-icon icon="fa-solid fa-user" size="2x" class="mr-3" />
                    {{ appComponent.session.nombre }} - No. {{ appComponent.session.usuario }}
                    <div class="usuario-pais-detaller mt-3 ">
                        <span :class="'country-flags ' + appComponent.country"></span>
                        <span>{{ appComponent.session.pais_nom }}</span>
                    </div>
                    <div class="usuario-pais-detaller"
                         v-if="config.header != undefined && config.header.buttonsDetails != undefined && config.header.buttonsDetails">
                        <button class="btn btn-primary mt-3 text-neutral mx-2"
                                @click="closeModalDetails('/consulta/consulta_tickets_online')">
                            <a>
                                <label class="cursor-pointer text-right block">{{ $t('Mis Apuestas') }}</label>
                            </a>
                        </button>
                        <button class="btn btn-primary mt-3 text-neutral mx-2"
                                @click="closeModalDetails('/gestion/deposito')">
                            <a>
                                <label class="cursor-pointer text-right block">{{ $t('Depositar') }}</label>
                            </a>
                        </button>
                        <button class="btn btn-primary mt-3 text-neutral mx-2"
                                @click="closeModalDetails('/gestion/cuenta_cobro')">
                            <a>
                                <label class="cursor-pointer text-right block">{{ $t('Retirar') }}</label>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.header__menu {
    position: fixed !important; /* Fixes the header menu position */
}

.group:hover > .absolute {
    opacity: 1; /* Shows the absolute positioned elements on hover */
    max-height: 300px; /* Sets maximum height for dropdown */
    overflow-y: auto; /* Enables vertical scrolling if content overflows */
}

.group:hover > .absolute > ul > .group:hover > .absolute {
    opacity: 1; /* Shows nested dropdowns on hover */
    max-height: 200px; /* Sets maximum height for nested dropdown */
    overflow-y: auto; /* Enables vertical scrolling for nested dropdown */
}

.sub__menu {
    opacity: 0; /* Hides submenu by default */
    visibility: hidden; /* Hides submenu from layout */
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out; /* Smooth transition for visibility */
}

.group:hover .sub__menu {
    opacity: 1; /* Shows submenu on hover */
    visibility: visible; /* Makes submenu visible in layout */
}

.circle__profile-container-id {
    position: relative; /* Positions the profile container */
    width: 40px; /* Sets width for profile container */
    height: 40px; /* Sets height for profile container */
    display: flex; /* Enables flexbox layout */
    justify-content: center; /* Centers content horizontally */
    align-items: center; /* Centers content vertically */
}

.circle__profile-container {
    position: relative; /* Positions the profile container */
    height: 70px; /* Sets height for profile container */
    display: flex; /* Enables flexbox layout */
    justify-content: center; /* Centers content horizontally */
    align-items: center; /* Centers content vertically */
}

.circle__profile {
    position: absolute; /* Positions the profile circle */
    height: 30px; /* Sets height for profile circle */
    width: 30px; /* Sets width for profile circle */
    border-radius: 50%; /* Makes the profile circle round */
    z-index: 1; /* Sets stacking order */
}

.circle__profile-submenu {
    position: absolute; /* Positions the submenu profile circle */
    height: 40px; /* Sets height for submenu profile circle */
    width: 40px; /* Sets width for submenu profile circle */
    border-radius: 50%; /* Makes the submenu profile circle round */
    z-index: 1; /* Sets stacking order */
}

.circle__profile-spin {
    position: absolute; /* Positions the spinning profile circle */
    top: 16px; /* Positions spinning circle */
    width: 38px; /* Sets width for spinning circle */
    height: 38px; /* Sets height for spinning circle */
    border-radius: 50%; /* Makes the spinning circle round */
    clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%, 0% 100%, 50% 100%, 50% 50%, 100% 50%, 100% 0%, 50% 0%); /* Creates a unique shape */
    transform: rotate(90deg); /* Rotates the spinning circle */
    transition: transform 0.5s ease-in-out; /* Smooth transition for rotation */
}

.circle__profile-spin-id {
    position: absolute; /* Positions the spinning profile circle for ID */
    width: 50px; /* Sets width for spinning circle */
    height: 50px; /* Sets height for spinning circle */
    border-radius: 50%; /* Makes the spinning circle round */
    clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%, 0% 100%, 50% 100%, 50% 50%, 100% 50%, 100% 0%, 50% 0%); /* Creates a unique shape */
    transform: rotate(90deg); /* Rotates the spinning circle */
    transition: transform 0.5s ease-in-out; /* Smooth transition for rotation */
}
</style>

<!-- FILE DOCUMENTED -->

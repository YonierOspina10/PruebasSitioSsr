<script setup lang="ts">
import Btn from '@/components/buttons/Btn.vue';
import { useAppHeaderMenu, userBalance } from '@/composables/useAppHeader.ts';
import { onMounted, reactive, ref } from 'vue';
import type { MenuList } from '@/interface/IMenu';
import { useAppcomponentStore } from '@/stores/AppComponent';
import IconCloseMenu from '@/components/icons/menu/IconCloseMenu.vue';
import IconProfile from '@/components/icons/IconProfile.vue';
import IconCloseSession from '@/components/icons/menu/IconCloseSession.vue';
import BalanceUser from '@/components/BalanceUser.vue';
import apiService from '@/services/ApiService';
import router from '@/router';
import { watch } from '@vue/runtime-dom';

/**
 * Props definition for the component.
 * @property {boolean} isOpen - Indicates if the menu is open.
 */
const props = defineProps<{
    isOpen: boolean;
}>();

/**
 * Emits definition for the component.
 * @emits onClickModal - Event emitted when the modal is clicked.
 * @param {boolean} isOpen - Indicates if the modal is open.
 */
const emits = defineEmits<{
    (e: 'onClickModal', isOpen: boolean): void;
}>();

const appComponent = useAppcomponentStore().appComponent;
const { menu_not_login, menu_login, footer } = useAppHeaderMenu();
const { currency, saldo } = userBalance();

/**
 * Reactive state for the menu list.
 * @type {Object}
 * @property {MenuList[]} data - Array of menu items.
 */
const menuList = reactive<{ data: MenuList[] }>({ data: [] });

/**
 * Ref for storing the heights of the lists.
 * @type {number[]}
 */
const listHeights = ref<number[]>([]);

/**
 * Ref for tracking the open state of submenus.
 * @type {boolean[]}
 */
const openSubMenuIndexes = ref<boolean[]>([]);

/**
 * Ref for tracking the open state of the language selection dropdown.
 * @type {boolean}
 */
const openSelectLang = ref<boolean[]>(false);

onMounted(() => {});

/**
 * Watcher for the isOpen prop to toggle body overflow style.
 * @param {boolean} newVal - The new value of the isOpen prop.
 */
watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },
);

/**
 * Handles the click event on the modal.
 */
const onClickModal = (): void => {
    const isOpen: boolean = false;
    emits('onClickModal', isOpen);
};

/**
 * Toggles the display of a submenu.
 * @param {number} index - The index of the submenu to toggle.
 */
const toggleList = (index: number) => {
    if (!openSubMenuIndexes.value[index]) {
        const menu = appComponent.menus_service[index];
        const totalHeight = menu.SUBMENUS.length * 40;
        listHeights.value[index] = totalHeight;
    } else {
        listHeights.value[index] = 0;
    }
    openSubMenuIndexes.value[index] = !openSubMenuIndexes.value[index];
};

/**
 * Logs out the user and clears the session data.
 */
const logOut = () => {
    appComponent.gAnalytics('exit_profile');
    if ((window as any).ws != undefined) {
        (window as any).ws.close();
    }
    const vthis = this;
    apiService.request('logout', {}).then((response: any) => {
        if (response.code == 0) {
            vthis.appComponent.tokenSB = '';
            vthis.appComponent.session = {
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
            apiService.setAuthToken('');
            try {
                (window as any).altenarWSDK.set({ token: '' });
            } catch (e) {}
            window.localStorage.removeItem('auth_token');
            vthis.appComponent.tokenUser = '';
            if (
                this.appComponent.config.zendesk != undefined &&
                this.appComponent.config.zendesk[this.appComponent.country] != undefined &&
                this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal'
            ) {
                const scriptRemove = document.getElementById('cen_snippet_static');
                const divIframeRemove = document.getElementById('centribal_iframe_layout');
                if (scriptRemove) {
                    scriptRemove.remove();
                    divIframeRemove?.remove();
                    const div = document.createElement('div');
                    div.setAttribute('id', 'centribal_iframe_layout');
                    div.classList.add('centribal_hidden');
                    if (this.appComponent.config.layout === 3) {
                        document.querySelector('body')?.appendChild(div);
                    } else if (this.appComponent.config.layout === 2) {
                        const divChat = document.getElementById('centribal_chat');
                        divChat?.appendChild(div);
                    }
                    setTimeout(() => {
                        const script = document.createElement('script');
                        script.setAttribute('id', 'cen_snippet_static');
                        script.setAttribute('control_iframe', '');
                        script.setAttribute('type', 'text/javascript');
                        script.setAttribute('src', this.appComponent.config.zendesk[this.appComponent.country].key);
                        document.querySelector('body')?.appendChild(script);
                    }, 500);
                }
            }
        }
    });
    appComponent.tokenSB = '';
    appComponent.session = {
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
    apiService.setAuthToken('');
    appComponent.tokenUser = '';
    window.localStorage.removeItem('auth_token');
    appComponent.loadView = false;
    if (appComponent.config.versionAltenar == '2') {
        window.location.href = '/';
    }
    router.push('/');
    setTimeout(() => {
        appComponent.loadView = true;
    }, 1000);
};

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:MenuMobile3|layout:layout-${appComponent.config.layout}`
})

</script>
<template>
    <!-- Main container for the mobile menu, visible if isOpen is true -->
    <div
        v-if="isOpen"
        id="search-input"
        :class="[
            'transition-transform ease-in-out duration-500',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'fixed top-0 left-0 w-full min-w-[330px] h-[100vh]',
            'bg-[#181818CC] backdrop-blur-[8px] z-[150]',
            'overflow-y-auto',
            'translate-x-0',
            'p-5',
        ]"
    >
        <!-- Language selection dropdown, displayed if change_language or showSelectLang is true -->
        <div
            class="items-center flex-none absolute left-[5px] top-[0px]"
            v-if="
                appComponent.config.header_ != undefined && appComponent.config.header_.change_language != undefined
                    ? appComponent.config.header_.change_language
                    : appComponent.config.language.showSelectLang
            "
        >
            <div class="dropdown dropdown-end">
                <!-- Button to open the language selection dropdown -->
                <div
                    tabindex="0"
                    class="m-1 btn btn-xs mt-4 gap-2 mb-[1rem] mr-5"
                    @click="openSelectLang = true"
                >
                    <span :class="'country-flags ' + appComponent.selectFlag"></span>
                    <span>{{ appComponent.lngProd }}</span>
                </div>
                <!-- List of available languages -->
                <ul
                    tabindex="0"
                    class="p-2 menu dropdown-content bg-neutral rounded-box w-24 text-neutral-content"
                    v-if="openSelectLang"
                >
                    <!-- Loop through each country to display its flag and name -->
                    <li
                        v-for="country in appComponent.countries"
                        @click="
                            appComponent.changeLanguage(country.name, country.flag);
                            openSelectLang = false;
                        "
                    >
                        <span>
                            <span :class="'country-flags ' + country.flag"></span>
                            {{ country.name.toLocaleUpperCase() }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Close button for the mobile menu -->
        <div
            class="absolute right-[5px] top-[10px] hover:scale-[1.1] cursor-pointer"
            @click="onClickModal"
        >
            <icon-close-menu
                width="30px"
                fill="none"
                height="30px"
            />
        </div>
        <!-- Content for users who are not logged in -->
        <div
            v-if="!appComponent.session.logueado"
            class="w-full h-[90vh] overflow-y-auto custom-scroll"
        >
            <div class="w-[full] h-full mt-[20px]">
                <div class="flex items-center justify-center gap-[3rem] relative">
                    <!-- Button to open the login modal -->
                    <btn
                        w="100px"
                        h="33px"
                        :text="$t('Iniciar Sesión')"
                        color="#FFFFFF"
                        bg="transparent"
                        bg-line="#FFDE00"
                        :is-visible-line="false"
                        :is-visible-line-mobile="true"
                        class="text-[14px] font-normal rounded-[10px] hover:text-[#FFDE00] hover:scale-[1.1] border-none relative top-[0.45rem]"
                        id="accion_iniciarsesion"
                        @click="appComponent.showModalLogin = true"
                    />
                    <!-- Link to the registration page -->
                    <router-link
                        @click="onClickModal"
                        to="/registro"
                        v-bind="analyticsAttrs(`menu:nav:registro`)"
                    >
                        <btn
                            w="100px"
                            h="33px"
                            :text="$t('Regístrate')"
                            color="primary"
                            bg="#0F700F"
                            class="text-neutral text-[14px] font-normal rounded-[10px] hover:scale-[1.1]"
                            :is-visible-line="false"
                        />
                    </router-link>
                </div>
                <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                <div class="w-[360px] mx-auto">
                    <!-- List of menu items for users who are not logged in -->
                    <ul
                        class="list-square pl-2 mt-5 flex flex-col justify-start items-start gap-[10px] max-h-[454px] custom-scroll font-medium scroll-menu"
                    >
                        <!-- Loop through each menu item -->
                        <li
                            class="flex flex-row items-center gap-[8px] min-h-[45px] cursor-pointer"
                            v-for="(item, index) in menu_not_login"
                            :key="index"
                        >
                            <!-- Link to the menu item URL -->
                            <router-link
                                :to="item.MENU_URL"
                                v-bind="analyticsAttrs(`menu:nav:${item.MENU_URL}`)"
                                @click="onClickModal"
                                class="flex items-center gap-[0.75rem]"
                            >
                                <div
                                    v-html="item.MENU_ICON"
                                    class="[&>*]:fill-primary-content [&>*]:w-[17px] [&>*]:h-[17px]"
                                ></div>
                                <p class="text-[17px] text-neutral">{{ item.MENU_TITLE }}</p>
                            </router-link>
                        </li>
                    </ul>
                    <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                    <div class="w-[360px] mx-auto h-[262px]"></div>
                    <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                    <div class="w-[360px] mx-auto h-[312px]">
                        <!-- List of footer menu items -->
                        <ul class="w-full h-full flex flex-col justify-between">
                            <!-- Loop through each footer menu item -->
                            <li
                                v-for="element in footer"
                                class="mb-2"
                            >
                                <!-- Link to the footer menu item URL -->
                                <router-link
                                    :to="element.MENU_URL"
                                    v-bind="analyticsAttrs(`menu:nav:${element.MENU_URL}`)"
                                    @click="onClickModal"
                                    class="text-neutral text-[17px] cursor-pointer"
                                >
                                    {{ $t(element.MENU_TITLE) }}</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content for users who are logged in -->
        <div
            v-if="appComponent.session.logueado"
            class="w-full flex flex-col justify-center items-center gap-[0.75rem]"
        >
            <div class="flex flex-col gap-[0.75rem]">
                <div class="circle__profile-container">
                    <div class="circle__profile-spin border-[2px] border-primary-content"></div>
                    <div
                        class="circle__profile bg-primary-content flex items-center justify-center"
                    >
                        <icon-profile
                            width="60px"
                            height="80px"
                            fill="#000002"
                        />
                    </div>
                </div>
                <p class="text-center font-normal font-poppinssb text-[17px]">
                    {{ appComponent.session.nombre ? appComponent.session.nombre : 'User name' }}
                </p>
                <balance-user
                    text-color="#000002"
                    :show-balance="true"
                />
            </div>
            <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
            <div class="w-[360px] mx-auto">
                <!-- List of menu items for users who are logged in -->
                <ul
                    class="list-square pl-2 flex flex-col justify-start items-start gap-[10px] max-h-[454px] custom-scroll font-medium scroll-menu"
                >
                    <!-- Loop through each menu item -->
                    <li
                        class="flex flex-row items-center gap-[8px] min-h-[45px] cursor-pointer"
                        v-for="(item, index) in menu_not_login"
                        :key="index"
                    >
                        <!-- Link to the menu item URL -->
                        <router-link
                            :to="item.MENU_URL"
                            v-bind="analyticsAttrs(`menu:nav:${item.MENU_URL}`)"
                            @click="onClickModal"
                            class="flex items-center gap-[0.75rem]"
                        >
                            <div
                                v-html="item.MENU_ICON"
                                class="[&>*]:fill-primary-content [&>*]:w-[16px] [&>*]:h-[16px]"
                            ></div>
                            <p class="text-[15px] text-neutral">{{ $t(item.MENU_TITLE) }}</p>
                        </router-link>
                    </li>
                </ul>
                <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                <div class="w-[360px] mx-auto h-[262px]">
                    <p class="text-neutral">UNO</p>
                </div>
                <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                <!-- Dropdown for services menu -->
                <div
                    v-if="appComponent.session.logueado"
                    class="dropdown w-full max-h-[400px] mx-auto"
                >
                    <h3 class="text-[17px] font-poppinssb py-2 cursor-pointer">
                        {{ $t('SERVICIOS') }}
                    </h3>
                    <ul class="listSettings">
                        <!-- Loop through each service menu item -->
                        <li
                            v-for="(menu, index) in appComponent.menus_service"
                            :key="'item1-' + index"
                            class="mb-2 text-black measuringWrapper"
                        >
                            <p
                                id="grow"
                                class="text-neutral text-[15px] font-poppinssb cursor-pointer capitalize"
                                @click="toggleList(index)"
                            >
                                {{ $t(menu.MENU_TITLE) }}
                            </p>
                            <!-- List of submenu items, displayed if the submenu is open -->
                            <ul
                                id="list"
                                v-show="openSubMenuIndexes[index]"
                                :style="{
                                    maxHeight: listHeights[index] + 'px',
                                    transition: 'max-height 0.3s ease',
                                }"
                                class="pl-4 overflow-hidden submenu"
                            >
                                <!-- Loop through each submenu item -->
                                <router-link
                                    :to="submenu.MENU_URL"
                                    @click="onClickModal"
                                >
                                    <li
                                        v-for="(submenu, subIndex) in menu.SUBMENUS"
                                        :key="'submenu1-' + subIndex"
                                        class="mb-2 text-neutral text-[15px] cursor-pointer h-auto"
                                    >
                                        {{ $t(submenu.SUBMENU_TITLE) }}
                                    </li>
                                </router-link>
                            </ul>
                        </li>
                    </ul>
                </div>
                <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                <div class="w-[360px] mx-auto h-[312px]">
                    <!-- List of footer menu items -->
                    <ul class="w-full h-full flex flex-col justify-around">
                        <!-- Loop through each footer menu item -->
                        <li
                            v-for="element in footer"
                            class="mb-[0.75rem]"
                        >
                            <!-- Link to the footer menu item URL -->
                            <router-link
                                :to="element.MENU_URL"
                                v-bind="analyticsAttrs(`menu:nav:${element.MENU_URL}`)"
                                @click="onClickModal"
                                class="text-neutral text-[17px] cursor-pointer"
                            >
                                {{ $t(element.MENU_TITLE) }}</router-link
                            >
                        </li>
                    </ul>
                </div>
                <hr class="border-primary-content h-[1px] w-[360px] mx-auto mt-4 mb-4" />
                <!-- Button to log out the user -->
                <div
                    class="bg-primary-content w-[160px] h-[38px] rounded-full flex mx-auto hover:scale-[1.1] cursor-pointer"
                    @click="logOut"
                >
                    <span
                        class="flex flex-row items-center gap-[0.75rem] my-auto px-2 mx-auto text-[17px] text-[#000002] font-semibold"
                        >{{ $t('Salir') }}
                        <icon-close-session
                            width="16px"
                            height="16px"
                            fill="#000002"
                    /></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Custom scroll styling for touch devices */
.custom-scroll {
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for WebKit browsers */
.custom-scroll::-webkit-scrollbar {
    width: 3px;
    height: 0;
}

/* Transparent scrollbar thumb for WebKit browsers */
.custom-scroll::-webkit-scrollbar-thumb {
    background-color: transparent;
}

/* Transparent scrollbar track for WebKit browsers */
.custom-scroll::-webkit-scrollbar-track {
    background-color: transparent;
}

/* Styling for list settings with hidden overflow and transition */
.listSettings {
    overflow-y: hidden;
    transition: height 0.5s ease;
}

/* Container for profile circle with relative positioning and overflow hidden */
.circle__profile-container {
    position: relative;
    margin: 20px;
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* Profile circle with absolute positioning and border radius */
.circle__profile {
    position: absolute;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    z-index: 1;
}

/* Spinning profile circle with border and transition */
.circle__profile-spin {
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    transform: rotate(90deg);
    transition: transform 0.5s ease-in-out;
}

/* Grow list with hidden overflow and transition for max height */
#grow #list {
    height: 0;
    overflow: hidden;
    transition: max-height 0.39s ease;
}
</style>

<!-- FILE DOCUMENTED -->

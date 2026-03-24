<script lang="ts">
import { defineComponent } from 'vue';
import { useSportBookStore } from '../../../stores/Sportbook.ts';
import CloseIcon from '../../icons/CloseIcon.vue';
import SettingsIcon from '../../icons/SettingsIcon.vue';
import CopyIcon from '../../icons/CopyIcon.vue';
import DoorOut from '../../icons/DoorOut.vue';
import { register } from 'swiper/element/bundle';
import { useGlobalStore } from '../../../stores/Global.ts';
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue';
import { useModalStore } from '../../../stores/Modal';
register();

export default defineComponent({
    components: {
        DoorOut,
        CloseIcon,
        CopyIcon,
        SettingsIcon,
        ArrowDownIcon,
    },
    data() {
        let zendesk: any = this.$zendesk;
        let appComponent: any = this.$appComponent;
        let sportBookStore = useSportBookStore();
        let globalStore = useGlobalStore();
        let onTitles: boolean = false;
        let openSelectLang = false;
        let p: HTMLElement | null = null;
        let copy: boolean = false;
        let modals = useModalStore();
        return {
            zendesk,
            appComponent,
            sportBookStore,
            globalStore,
            onTitles,
            openSelectLang,
            copy,
            p,
            modals,
        };
    },
    mounted() {
        this.clickD();
    },
    methods: {
        /**
         * Adds a click event listener to the document to close the menu when clicking outside of it.
         */
        clickD() {
            document.addEventListener('click', (e: any) => {
                if (e.target.offsetParent.matches('#menuMobile') || e.target.matches('#openMenu')) {
                } else {
                    this.closeMenu();
                }
            });
        },
        /**
         * Opens the menu by setting the global store's onMenuMain to true and onTitles to true.
         */
        openMenu() {
            this.globalStore.onMenuMain = true;
            this.onTitles = true;
        },
        /**
         * Closes the menu by setting the global store's onMenuMain to false and onTitles to false.
         */
        closeMenu() {
            this.globalStore.onMenuMain = false;
            this.onTitles = false;
        },
        /**
         * Opens the sport book page if the menu URL is '/deportes' and the menu ID is 'accion_envivo'.
         * @param value - The menu item value.
         */
        openSportBook(value) {
            if (value.MENU_URL === '/deportes' && value.MENU_ID === 'accion_envivo') {
                this.sportBookStore.page = 'live';
            }
        },
        /**
         * Toggles the display of the service menu for the given ID.
         * @param id - The ID of the service menu.
         */
        menuService(id: any) {
            if ((document.getElementById('menuService-' + id) as any).style.display == 'block') {
                (document.getElementById('menuService-' + id) as any).style.display = 'none';
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-secondary-focus');
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'rotate-180',
                );
            } else {
                (document.getElementById('menuService-' + id) as any).style.display = 'block';
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-secondary-focus');
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                    'rotate-180',
                );
            }
        },
        /**
         * Toggles the display of the desktop service menu for the given ID.
         * @param id - The ID of the desktop service menu.
         */
        menuServiceDesktop(id: any) {
            if ((document.getElementById('menuServiceD-' + id) as any).style.display == 'block') {
                (document.getElementById('menuServiceD-' + id) as any).style.display = 'none';
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.remove('bg-secondary-focus');
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.remove(
                    'rotate-180',
                );
            } else {
                (document.getElementById('menuServiceD-' + id) as any).style.display = 'block';
                (
                    document.getElementsByClassName('titleService-' + id) as HTMLCollectionOf<HTMLElement>
                )[0]?.classList.add('bg-secondary-focus');
                (document.getElementsByClassName('arrow' + id) as HTMLCollectionOf<HTMLElement>)[0]?.classList.add(
                    'rotate-180',
                );
            }
        },
        /**
         * Copies the content of the element with ID 'UID' to the clipboard.
         */
        copyID() {
            let text: any = document.getElementById('UID');
            navigator.clipboard.writeText(text.textContent);
            this.copy = true;
        },
        analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile7|layout:layout-${this.appComponent.config.layout}`,
            };
        },
    },
});
</script>
<template>
    <aside
        id="menuMobile"
        class="menu_mobile fixed bg-base-300 bg-gradient-to-r from-primary-focus/20 to-primary-focus/70 w-full md:w-[25%] h-full z-[101] top-0 transition-all flex flex-col justify-start overflow-y-auto menu_desktop"
        :style="[{ left: globalStore.onMenuMain ? '0' : '-100%' }]"
    >
        <article class="relative flex flex-col justify-center items-center pt-10">
            <!-- Container for the close button, positioned at the top-right corner -->
            <div class="absolute right-3 top-3 flex justify-end items-center gap-3 z-[110]">
                <!-- Button to close the menu -->
                <button
                    @click="closeMenu()"
                    v-bind="analyticsAttrs('menu:toggle')"
                    class="hover:scale-105"
                    aria-label="Cerrar menu"
                >
                    <!-- Close icon component with specified dimensions and colors -->
                    <IconClose
                        :height="23"
                        :width="23"
                        :fill="'#ffffff'"
                        :fill2="'#ee3b3f'"
                    />
                </button>
            </div>
        </article>
        <article class="flex flex-col items-center mt-4">
            <div class="w-full">
                <ul class="flex flex-col gap-5 justify-center items-center my-10">
                    <!-- Loop through each menu item for the mobile view -->
                    <li
                        v-for="(value, i) in appComponent.config.MENU_NOLOGUEADO_MOBILE[appComponent.country]"
                        class="uppercase h-full w-full flex justify-center items-center gap-4"
                        :class="
                            value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length == 0
                                ? 'flex-col'
                                : 'flex-wrap'
                        "
                    >
                        <!-- Router link for menu items without a target attribute -->
                        <RouterLink
                            v-if="value.TARGER == undefined"
                            :id="value.MENU_ID"
                            :to="appComponent.config.baseUrlFx + value.MENU_URL"
                            :active-class="
                                value.MENU_ID == 'accion_registro' ? '' : 'bg-gradient-to-r from-secondary from-90%'
                            "
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            v-bind="analyticsAttrs(`${value.MENU_ID === 'accion_registro' ? 'menu:signup-btn' : 'menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                            class="p-3 h-[52.5px] lg:hover:scale-105 flex justify-center items-center"
                            :class="
                                value.MENU_ID == 'accion_registro'
                                    ? 'w-10/12 rounded-full'
                                    : value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS != 0
                                      ? 'w-[69%] hover:bg-gradient-to-r hover:from-secondary hover:from-90%'
                                      : 'w-9/12 hover:bg-gradient-to-r hover:from-secondary hover:from-90%'
                            "
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="() => modals.addModal({ showModal: 'ModalRegister' })"
                        >
                            <!-- Container for the menu item content -->
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                v-if="value.TARGER !== 'blank'"
                                :title="value.MENU_TITLE"
                                @click="
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                    <!-- SVG icon for the menu item -->
                                    <div
                                        v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                        class="w-8 h-8"
                                        v-html="value.MENU_SVG"
                                    ></div>
                                    <!-- Image icon for the menu item if it is a URL -->
                                    <img
                                        class="w-9 h-9 object-contain"
                                        v-if="
                                            (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                            value.MENU_ICON != undefined &&
                                            value.MENU_ICON != '' &&
                                            value.MENU_ICON.includes('https')
                                        "
                                        :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                        v-lazy="value.MENU_ICON"
                                        width="28"
                                        height="28"
                                    />
                                    <!-- Title for the menu item -->
                                    <span
                                        class="titles font-bold"
                                        :class="
                                            value.MENU_ID == 'accion_registro' ? 'text-neutral-content text-xl' : 'text-sm'
                                        "
                                        :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                        >{{ $t(value.MENU_TITLE) }}</span
                                    >
                                </div>
                            </div>
                        </RouterLink>
                        <!-- External link for menu items with a target attribute of 'blank' -->
                        <a
                            :id="value.MENU_ID"
                            v-bind:class="{ shadow: value.SHADOW == 1 }"
                            class="p-3 h-[52.5px] hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            v-if="value.TARGER == 'blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <!-- Container for the menu item content -->
                            <div
                                :id="`mobile-${value.MENU_ID}`"
                                class="uppercase h-full w-full flex justify-start items-center gap-4"
                                :title="value.MENU_TITLE"
                                @click="
                                    closeMenu();
                                    openSportBook(value);
                                "
                            >
                                <!-- Icon for the menu item if it is not a URL -->
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <!-- SVG icon for the menu item -->
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <!-- Image icon for the menu item if it is a URL -->
                                <img
                                    class="w-8 h-8 object-contain"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <!-- Title for the menu item -->
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <!-- Additional icon for the menu item -->
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- External link for menu items with a target attribute of 'top' -->
                        <a
                            :id="value.MENU_ID"
                            class="p-3 h-[52.5px] hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-full"
                            v-if="value.TARGER == 'top'"
                            :href="value.MENU_URL"
                            target="_top"
                            :title="value.MENU_TITLE"
                            @click="
                                closeMenu();
                                openSportBook(value);
                            "
                        >
                            <!-- Container for the menu item content -->
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <!-- Icon for the menu item if it is not a URL -->
                                <span
                                    v-if="
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https')
                                    "
                                    :class="'text-base pr-3 ' + value.MENU_ICON"
                                >
                                </span>
                                <!-- SVG icon for the menu item -->
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <!-- Image icon for the menu item if it is a URL -->
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <!-- Title for the menu item -->
                                <span
                                    class="titles font-bold text-lg"
                                    :style="[{ animationDelay: i + 1 + '0ms' }, { color: value.MENU_COLOR }]"
                                    >{{ $t(value.MENU_TITLE) }}</span
                                >
                                <!-- Additional icon for the menu item -->
                                <div
                                    v-if="value.ICON != undefined"
                                    class="svg"
                                    v-html="value.ICON"
                                ></div>
                            </div>
                        </a>
                        <!-- External link for menu items with a target attribute of 'chat' -->
                        <a
                            id="accion_chat"
                            target="_blank"
                            :href="value.MENU_URL"
                            v-else-if="value.TARGER == 'chat'"
                            class="p-3 h-[52.5px] bg-gradient-to-r from-primary-focus hover:from-90% lg:hover:scale-105 flex justify-center items-center w-9/12 rounded-2xl"
                        >
                            <!-- Container for the chat button content -->
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <!-- SVG icon for the chat button -->
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <!-- Image icon for the chat button if it is a URL -->
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <!-- Title for the chat button -->
                                <span
                                    class="titles font-bold text-lg text-white hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('Chat') }}</span
                                >
                            </div>
                        </a>
                        <!-- Button to open the login modal -->
                        <button
                            id="accion_inicio_sesion"
                            v-if="value.TARGER == 'inicio_sesion'"
                            class="p-3 lg:hover:scale-105 flex justify-center items-center w-10/12 rounded-full"
                            :style="[{ backgroundColor: value.MENU_BG }]"
                            @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                        >
                            <!-- Container for the login button content -->
                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                <!-- SVG icon for the login button -->
                                <div
                                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                                    class="w-8 h-8"
                                    v-html="value.MENU_SVG"
                                ></div>
                                <!-- Image icon for the login button if it is a URL -->
                                <img
                                    class="w-8 h-8"
                                    v-if="
                                        (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                                        value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
                                    "
                                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                                    v-lazy="value.MENU_ICON"
                                    width="28"
                                    height="28"
                                />
                                <!-- Title for the login button -->
                                <span
                                    class="titles font-bold text-xl text-neutral-content hover:text-primary"
                                    :style="[{ animationDelay: '200ms' }]"
                                    >{{ $t('INICIAR SESIÓN') }}</span
                                >
                            </div>
                        </button>
                        <!-- Arrow icon to toggle the display of submenus -->
                        <div
                            v-if="value.MENU_SUBMENUS != undefined && value.MENU_SUBMENUS.length != 0"
                            @click="() => (value.MENU_OPEN_SUBMENUS = !value.MENU_OPEN_SUBMENUS)"
                            class="cursor-pointer"
                        >
                            <ArrowDownIcon
                                class="fill-accent-focus w-4 shrink-0 group-hover:fill-primary-content"
                                :class="value.MENU_OPEN_SUBMENUS ? 'rotate-180 ' : ''"
                            ></ArrowDownIcon>
                        </div>
                        <!-- Container for the submenus -->
                        <div
                            v-if="
                                value.MENU_SUBMENUS != undefined &&
                                value.MENU_SUBMENUS.length != 0 &&
                                value.MENU_OPEN_SUBMENUS == true
                            "
                            class="w-full h-auto"
                        >
                            <ul class="grid gap-1">
                                <!-- Loop through each submenu item -->
                                <li v-for="submenus in value.MENU_SUBMENUS">
                                    <RouterLink
                                        :id="submenus.SUBMENU_ID"
                                        :to="appComponent.config.baseUrlFx + submenus.SUBMENU_URL"
                                        active-class="bg-gradient-to-r from-secondary from-90%"
                                        class="p-3 hover:bg-gradient-to-r hover:from-secondary hover:from-90% lg:hover:scale-105 flex justify-center items-center w-full bg-primary-focus"
                                    >
                                        <!-- Container for the submenu item content -->
                                        <div
                                            :id="`mobile-${submenus.SUBMENU_ID}`"
                                            class="uppercase h-full w-9/12 flex justify-start items-center gap-4"
                                            :title="submenus.SUBMENU_TITLE"
                                            @click="
                                                closeMenu();
                                                openSportBook(submenus);
                                            "
                                        >
                                            <div class="uppercase h-full w-full flex justify-start items-center gap-4">
                                                <!-- Image icon for the submenu item if it is a URL -->
                                                <img
                                                    class="w-8 h-8 object-contain"
                                                    v-if="
                                                        submenus.SUBMENU_ICON != undefined &&
                                                        submenus.SUBMENU_ICON != '' &&
                                                        submenus.SUBMENU_ICON.includes('https')
                                                    "
                                                    :alt="'Menu navegacion' + ' ' + submenus.SUBMENU_TITLE"
                                                    v-lazy="submenus.SUBMENU_ICON"
                                                    width="28"
                                                    height="28"
                                                />
                                                <!-- Title for the submenu item -->
                                                <span class="titles text-base font-medium text-neutral">{{
                                                    $t(submenus.SUBMENU_TITLE)
                                                }}</span>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- Container for the footer menu items, displayed if appPOS is false -->
            <div
                v-if="!appComponent.appPOS"
                class="w-3/4 flex flex-col mb-10"
            >
                <!-- Title for the footer menu section -->
                <p class="text-primary-content text-lg font-bold ml-3">
                    {{ $t('OTROS') }}
                </p>
                <!-- List of footer menu items -->
                <ul class="h-full flex flex-col justify-center items-start pl-4 rounded-xl">
                    <!-- Loop through each footer menu item -->
                    <li
                        v-for="value in appComponent.config.MENU_FOOTER[appComponent.country]"
                        class="hover:scale-105 py-2"
                    >
                        <!-- Router link for footer menu items without a target attribute of '_blank' -->
                        <RouterLink
                            :to="value.MENU_URL"
                            active-class="active-link-otros"
                            :aria-label="value.MENU_TITLE"
                        >
                            <div
                                :id="value.MENU_ID"
                                v-if="value.MENU_TARGET != '_blank'"
                                :title="value.MENU_TITLE"
                                @click="closeMenu()"
                            >
                                <!-- Title for the footer menu item -->
                                <span class="text-neutral text-lg font-bold">
                                    {{ $t(value.MENU_TITLE) }}
                                </span>
                            </div>
                        </RouterLink>
                        <!-- External link for footer menu items with a target attribute of '_blank' -->
                        <a
                            :id="value.MENU_ID"
                            v-if="value.MENU_TARGET == '_blank'"
                            :href="value.MENU_URL"
                            target="_blank"
                            :title="value.MENU_TITLE"
                            @click="closeMenu()"
                        >
                            <!-- Title for the footer menu item -->
                            <span class="text-neutral text-lg font-bold">
                                {{ $t(value.MENU_TITLE) }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    </aside>
</template>
<style scoped>
/* Hide the scrollbar for the menu_desktop class */
.menu_desktop::-webkit-scrollbar {
    display: none;
}

/* Style for active links */
.active-link {
    background: linear-gradient(to right, #1c1e2b 28px, #1c1e2b 77%, transparent);
    border-radius: 10px;
}

/* Style for the span inside active links */
.active-link > div > span {
    font-weight: normal !important;
    color: #d59c00 !important;
}

/* Style for SVG elements */
.svg {
    width: 30px !important;
    height: 35px !important;
}
</style>

<!-- FILE DOCUMENTED -->

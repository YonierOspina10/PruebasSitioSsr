<script setup lang="ts">
import IconHome from '../icons/IconHome.vue'; // Importing the home icon component
import IconArrow from '../../components/icons/Arrow/IconArrow.vue'; // Importing the arrow icon component
import { onMounted, reactive } from 'vue'; // Importing Vue's lifecycle hook and reactive function
import { useAppHeaderMenu } from '../../composables/useAppHeader.ts'; // Importing custom composable for app header menu
import { MenuList } from '../../interfaces'; // Importing MenuList interface for type definitions
import SearchField from '../../components/search/SearchField.vue'; // Importing the search field component

// Destructuring menu items and logos from the app header menu composable
const { menu_not_login, logo_splash, logo, appComponent } = useAppHeaderMenu();

// Reactive state for the menu list
const menuList = reactive<{ data: MenuList[] }>([]);

// Default menu item structure with logo
const menuWithImage: MenuList = {
    BG_COLOR: '',
    MENU_CLASS: '',
    TEXT_COLOR: '',
    MENU_ID: 'menu_logo',
    MENU_TITLE: '',
    MENU_URL: '',
    MENU_ICON: '',
    MENU_SECCION: '',
    MENU_COLOR: '',
    SUB_MENU: [],
    MENU_LOGO: true,
};

// Function to add menu items to the menu list
const addMenu = (menuItems: MenuList[]): void => {
    const updatedMenuItems = [...menuItems]; // Create a copy of the menu items
    if (!appComponent.mobileL) {
        updatedMenuItems.slice(0, 4); // Limit to first 4 items if not on mobile
    }
    // Insert logo menu item if not already present
    if (!updatedMenuItems.some((item) => item.MENU_LOGO === true)) {
        const middleIndex = Math.floor(updatedMenuItems.length / 2);
        updatedMenuItems.splice(middleIndex, 0, { ...menuWithImage });
    }
    // Filter out duplicate logo items and update the reactive menu list
    menuList.data = updatedMenuItems.filter((value, index, self) => {
        if (value.MENU_LOGO === true) {
            return index === self.findIndex((t) => t.MENU_LOGO === true);
        }
        return true;
    });
};

// Function to generate srcset for images with webp format
const getSrcsetFm = (imageUrl: string) => {
    if (!imageUrl) return ''; // Return empty string if no image URL
    const baseUrl = imageUrl.split('?')[0]; // Extract base URL
    return `${baseUrl}?fm=webp`; // Return formatted URL for webp
};

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:customHeaderDesktop|layout:layout-${appComponent.config.layout}}`
});

// Lifecycle hook to add menu items on component mount
onMounted(() => {
    addMenu(menu_not_login); // Add menu items for not logged in users
});
</script>

<template>
    <!-- Main container for the header menu -->
    <div
        :class="[
            'w-full min-h-[50px] h-[50px] bg-base-content hidden md:flex py-3.5 fixed inset-x-0 top-[51px] px-2 z-[140]',
        ]"
    >
        <!-- Flex container for menu items -->
        <ul class="w-full flex justify-between items-center gap-x-8  px-4 relative top-[0.35rem]">
            <router-link
                to="/home"
                v-bind="analyticsAttrs('header:logo')"
                class="z-60"
            >
                <icon-home
                    width="18px"
                    height="16px"
                    class="fill-primary"
                />
            </router-link>
            <div class="w-[80%] justify-around flex items-center">
                <!-- Loop through menu items -->
                <div
                    v-for="(item, index) in menuList.data"
                    :key="item.MENU_ID"
                    class="relative group justify-center items-center"
                >
                    <button
                        v-if="!item.MENU_LOGO"
                        class="w-full flex items-center gap-2 text-lg relative group"
                        v-bind="analyticsAttrs(`header:menu:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                    >
                        <div
                            v-if="item.MENU_ICON"
                            v-html="item.MENU_ICON"
                            class="w-full h-full  text-primary-content"
                        />
                        <span class="relative flex items-center">
                            <template v-if="item.MENU_URL">
                                <router-link :to="item.MENU_URL">
                                    <span class="text-[15px] font-poppinssl text-nowrap text-primary-content">
                                        {{ $t(item.MENU_TITLE) }}
                                    </span>
                                </router-link>
                            </template>
                            <template v-else>
                                <span class="text-[15px] font-poppinssl text-nowrap text-primary-content">
                                    {{ $t(item.MENU_TITLE) }}
                                </span>
                            </template>
                            <!-- Animated border under the text -->
                            <span
                                class="absolute bottom-0 left-0 w-full md:w-1/2 h-[2px] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 bg-primary-content"
                            ></span>
                        </span>
                        <icon-arrow
                            width="9px"
                            height="8px"
                            v-if="item.SUB_MENU && item.SUB_MENU?.length"
                            class="ml-1 transform transition-transform duration-300 group-hover:rotate-180 stroke-primary-content"
                        />
                    </button>
                    <!-- Logo display -->
                    <div
                        v-if="item.MENU_LOGO"
                        class="relative text-3xl font-bold text-neutral w-[140px] h-[40px] mx-auto cursor-pointer"
                    >
                        <router-link v-bind="analyticsAttrs('header:logo')" to="/home">
                            <!-- First image (visible by default) -->
                             <img
                            v-lazy="
                                appComponent?.config?.logo_ != undefined &&
                                appComponent?.config?.logo_['dark'] != undefined &&
                                appComponent?.config?.logo_['light'] != undefined &&
                                !appComponent?.themeSportbook
                                ? appComponent.config.logo_['dark']
                                : appComponent.config.logo_['light']
                            "
                            alt="Logo"
                            class="absolute inset-0 w-full h-full object-contain"
                            />
                            <!-- Segunda imagen (visible al hover) -->
                            <img
                                v-lazy="
                                    appComponent?.config?.logo_splash != undefined &&
                                    appComponent?.config?.logo_splash['dark'] != undefined &&
                                    appComponent?.config?.logo_splash['light'] != undefined &&
                                    !appComponent?.themeSportbook
                                        ? appComponent.config.logo_splash['dark']
                                        : appComponent.config.logo_splash['light']
                                "
                                alt="Logo_splash"
                                class="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 hover:opacity-100"
                            />
                            
                        </router-link>
                    </div>
                    <!-- Dropdown for sub-menu -->
                    <ul
                        v-if="item.SUB_MENU?.length"
                        :class="[
                            'absolute top-full left-1/2 -translate-x-1/2',
      'min-w-[205px] backdrop-blur-sm bg-secondary/40 border-[0.5px] border-secondary/60 text-neutral mt-[0.60rem] rounded-b-lg shadow-xl',
      'invisible scale-95 group-hover:visible group-hover:scale-100 transition-all transform origin-top'
                        ]"
                    >
                        <li
                            v-for="(subItem, i) in item.SUB_MENU"
                            :key="subItem.MENU_ID"
                            class="w-full relative flex items-center px-2 py-2 cursor-pointer overflow-hidden group"
                        >
                            <router-link
                                :to="subItem.MENU_URL"
                                v-bind="analyticsAttrs(`header:submenu:${subItem.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                class="flex w-full"
                            >
                                <span
                                    class="w-full absolute right-0 top-[5px] bottom-[5px] hover:border-l-2 hover:border-neutral"
                                ></span>
                                <!-- Sub-menu icon -->
                                <div
                                    v-if="item.MENU_ICON"
                                    v-html="item.MENU_ICON"
                                    class="w-[2rem] h-full  text-neutral"
                                />
                                <!-- Sub-menu title -->
                                <p class="flex-1 text-neutral text-[14px] whitespace-nowrap font-poppinssl">
                                    {{ $t(subItem.MENU_TITLE) }}
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Search field component -->
            <search-field class="z-60 relative" />
        </ul>
    </div>
</template>

<style scoped>
.group:hover {
    z-index: 10; /* Increase z-index on hover for visibility */
}
.group:hover .group-hover {
    display: block; /* Show group-hover elements on hover */
    opacity: 1; /* Set opacity to 1 on hover */
    visibility: visible; /* Make visible on hover */
    transition: opacity 0.3s ease-in-out; /* Smooth transition for opacity */
}
.menudektop3 {
    position: fixed !important; /* Fix position for the top menu */
}
</style>

<!-- FILE DOCUMENTED -->

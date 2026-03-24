<script setup lang="ts">
import IconHome from '../icons/IconHome.vue'; // Import home icon component
import IconArrow from '../../components/icons/Arrow/IconArrow.vue'; // Import arrow icon component
import { onMounted, reactive } from 'vue'; // Import Vue composition API functions
import { useAppHeaderMenu } from '../../composables/useAppHeader.ts'; // Import custom composable for app header menu
import type { MenuList } from '@/interface/IMenu'; // Import type definition for MenuList
import SearchField from '@/components/search/SearchField.vue'; // Import search field component
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import app component store

const { menu_login, colorsDesktop, logo_splash, logo, servicio } = useAppHeaderMenu(); // Destructure menu data from composable
const appComponent = useAppcomponentStore().appComponent; // Get app component state from store
const menuList = reactive<MenuList[]>([]); // Create a reactive array for menu items

/**
 * Adds a logo item to the menu and filters duplicates.
 * @param menuItems - The array of menu items to modify.
 */
const addMenuColors = (menuItems: MenuList[]): void => {
    const menuWithImage: MenuList = { MENU_LOGO: true }; // Define a menu item with logo
    menuItems.splice(2, 0, menuWithImage); // Insert logo item at index 2
    menuList.value = menuItems.filter((value, index, self) => {
        if (value.MENU_LOGO === true) {
            return index === self.findIndex((t) => t.MENU_LOGO === true); // Filter out duplicate logo items
        }
        return true; // Keep other menu items
    });
};

onMounted(() => {
    // Lifecycle hook that runs when the component is mounted
    if (appComponent.session.logueado) {
        // Check if the user is logged in
        menuList.data = menu_login; // Set menu list to logged-in menu
    } else {
        menuList.data = menu_login; // Set menu list to logged-out menu (same as logged-in in this case)
    }
    addMenuColors(menuList.data); // Add logo item and filter menu list
});

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:MenuMobileTwo|layout:layout-${appComponent.config.layout}`
});

</script>
<template>
    <!-- Main navigation container with sticky positioning and responsive design -->
    <div
        :class="[
            'w-full min-h-[50px] h-[51px]',
            'bg-[#000000] hidden lg:flex py-3.5 sticky inset-x-0 top-5',
            'flex items-center px-2 justify-between z-[30]',
        ]"
    >
        <!-- Link to home with an icon -->
        <router-link
            to="/home"
            v-bind="analyticsAttrs(`menu:nav:home`)"
            class="cursor-pointer hover:scale-[1.1]"
        >
            <icon-home
                width="18px"
                height="16px"
                fill="none"
            />
        </router-link>
        <!-- Navigation menu -->
        <nav class="w-[95%] flex justify-center">
            <ul class="w-auto flex items-center font-medium text-sm justify-center gap-[7rem]">
                <!-- Menu items generated from menuList -->
                <li
                    class="p-4 lg:px-10 relative group"
                    v-for="(item, index) in menuList.value"
                    :key="index"
                >
                    <!-- Conditional link for menu logo -->
                    <router-link
                        to="/home"
                        v-bind="analyticsAttrs(`menu:nav:home`)"
                        v-if="item.MENU_LOGO"
                        class="relative w-[130px] h-[35px] text-slate-800 hover:text-slate-900 text-center cursor-pointer flex justify-center items-center"
                    >
                        <img
                            :src="logo"
                            alt="logo"
                            class="absolute w-full h-full block group-hover:hidden object-fill"
                        />
                        <img
                            :src="logo_splash"
                            alt="logo splash"
                            class="absolute w-full h-full hidden group-hover:block object-fill"
                        />
                    </router-link>
                    <!-- Link for menu item without logo -->
                    <router-link
                        :to="item.MENU_URL"
                        v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                        v-else
                        class="cursor-pointer flex items-center gap-[0.50rem] group"
                    >
                        <img
                            v-if="item.MENU_ICON"
                            :src="item.MENU_ICON"
                            alt="icon__menu"
                            width="16px"
                            height="16px"
                            class="object-fill"
                        />
                        <span
                            class="text-[15px] group relative"
                            :style="{ color: colorsDesktop.primary_content }"
                        >
                            {{ $t(item.MENU_TITLE) }}
                            <span
                                :style="{ background: colorsDesktop.primary_content }"
                                class="absolute bottom-0 left-0 w-[100%] md:w-[50%] h-[2px] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                            ></span>
                        </span>
                        <icon-arrow
                            width="9px"
                            height="8px"
                            :fill="colorsDesktop.primary_content"
                            v-if="item.SUB_MENU"
                            class="group-hover:rotate-[180deg] group-hover:transition group-hover:duration-300 group-hover:delay-150"
                        />
                    </router-link>
                    <!-- Sub-menu for items with sub-menu -->
                    <ul
                        v-if="item.SUB_MENU"
                        :class="[
                            'absolute top-full left-[50%] -translate-x-1/2 min-w-[240px]',
                            'p-2 border border-[#333333]',
                            'rounded-b-lg shadow-xl',
                            'backdrop-blur-sm bg-[#333333]/40',
                            'opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-[0.75rem]',
                        ]"
                    >
                        <!-- Sub-menu items -->
                        <li
                            v-for="(subItem, subIndex) in item.SUB_MENU"
                            :key="subIndex"
                            class="w-full flex items-center gap-[0.30rem] relative p-2 cursor-pointer z-10"
                        >
                            <router-link
                                :to="subItem.MENU_URL"
                                v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                                class="flex gap-[0.50rem]"
                            >
                                <span
                                    class="w-full absolute left-[-0.45rem] top-[15%] bottom-[15%] hover:border-l-2 hover:border-white"
                                ></span>
                                <img
                                    v-if="subItem.MENU_ICON"
                                    :src="subItem.MENU_ICON"
                                    alt="icon__menu"
                                    width="16px"
                                    height="16px"
                                    class="object-contain"
                                />
                                <p class="hover:bg-slate-50 flex items-center text-white text-[14px]">
                                    {{ $t(subItem.MENU_TITLE) }}
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- Search field positioned to the right -->
        <div class="w-[5%] relative z-30 right-[6rem]">
            <search-field class="absolute top-0 right-[10px] transform bottom-0 z-60" />
        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

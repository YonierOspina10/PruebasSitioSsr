<script setup lang="ts">
import Btn from '../buttons/Btn.vue'; // Importing button component
import IconMenu from '../icons/Menu/IconMenu.vue'; // Importing menu icon component
import { headerSocial } from '../../utils'; // Importing social header data
import SocialNetWork from '../../components/socialNetwork/socialNetWork.vue'; // Importing social network component
import { useModalStore } from '../../stores/Modal'; // Importing modal store for managing modals
import { onMounted, ref } from 'vue'; // Importing Vue composition API functions
import { useAppSocialNetwork, sessionUser } from '../../composables/useAppHeader.ts'; // Importing composables for app header
import MenuMobileTwo from '../../components/menus/menuMobile/MenuMobileTwo.vue'; // Importing mobile menu component
import SearchField from '../search/SearchField.vue'; // Importing search field component

const modals = useModalStore(); // Initializing modal store
const isOpen = ref<boolean>(false); // State for mobile menu open/close
const openMenuMobile = ref<boolean>(false); // State for mobile menu visibility
const Apcomponent = ref<any>(''); // Reference for application component
const logo = ref<string>(''); // Reference for logo URL

// Function to get the source set for images
const getSrcsetFm = (imageUrl: string) => {
    if (!imageUrl) return ''; // Return empty if no image URL
    const baseUrl = imageUrl.split('?')[0]; // Extract base URL from image URL
    return `${baseUrl}?fm=webp`; // Return formatted URL for webp image
};

// Lifecycle hook that runs when the component is mounted
onMounted(() => {
    const { appComponent } = sessionUser(); // Get session user data
    logo.value =
        appComponent.config.logo_ != undefined &&
        appComponent.config.theme_mode != undefined &&
        appComponent.config.logo_[appComponent.config.theme_mode] != undefined
            ? appComponent.config.logo_[appComponent.config.theme_mode] // Set logo based on theme mode
            : appComponent.config.menuMobile.logo.url; // Fallback to mobile logo URL
    Apcomponent.value = appComponent; // Set application component reference
    const { socialNetwork } = useAppSocialNetwork(); // Get social network data
    headerSocial.forEach((headerItem, index) => { // Iterate over header social items
        const socialItem = socialNetwork.value[index]; // Get corresponding social item
        if (socialItem) {
            Object.keys(headerItem).forEach((key) => { // Iterate over keys of header item
                if (headerItem[key] === '' && socialItem[key]) { // If header item key is empty and social item key exists
                    headerItem[key] = socialItem[key]; // Assign social item key to header item key
                }
            });
        }
    });
});

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:customHeaderMobile|layout:layout-${Apcomponent.value.config.layout}}`
});

// Function to toggle mobile menu visibility
const onOpenMenuMobile = (): void => {
    isOpen.value = !isOpen.value; // Toggle isOpen state
    openMenuMobile.value = !openMenuMobile.value; // Toggle openMenuMobile state
};

// Function to close modal and mobile menu
const onClickModal = (): void => {
    isOpen.value = false; // Close mobile menu
    openMenuMobile.value = false; // Close modal
};
</script>

<template>
    <!-- Main navigation container -->
    <div
        id="nav"
        :class="[
            'inset-x-0 top-0 z-[170] w-full min-h-[50px] h-[55px] fixed general-container py-2',
            'transition duration-200 ease-in-out border-b border-neutral-content',
            'text-neutral',
            'md:translate-x-0',
            'bg-base-content header__menu',
        ]"
    >
        <!-- Mobile view navigation -->
        <div class="w-full min-w-[288px] h-full lg:hidden flex justify-center items-center relative">
            <icon-menu
                width="34px"
                height="34px"
                v-bind="analyticsAttrs('menu:toggle')"
                class="cursor-pointer absolute left-2 top-1 transform"
                @click="onOpenMenuMobile"
            />
            <SearchField class="cursor-pointer absolute left-[4.3rem] transform z-[100]" />
            <router-link
                to="/home"
                v-bind="analyticsAttrs('header:logo')"
                class="w-full flex justify-center items-center"
            >
                <img
                    :srcset="getSrcsetFm(logo)"
                    alt="image_logo"
                    class="w-[100px] h-[30px] object-contain"
                />
            </router-link>
            <menu-mobile-two
                :is-open="isOpen"
                @on-click-modal="onClickModal"
            />
        </div>
        <!-- Desktop view navigation -->
        <div
            class="w-full h-full min-w-[288px] items-center justify-end gap-[20px] top-0 right-1 hidden md:flex md:h-16 px-2 fixed">
            <div class="flex items-center gap-[20px] relative border-l-1 pl-5 border-neutral">
                <btn
                    w="100px"
                    h="33px"
                    :text="$t('Iniciar Sesión')"
                    bg="transparent"
                    :is-visible-line="true"
                    :is-visible-line-mobile="false"
                    v-bind="analyticsAttrs('header:login-btn')"
                    class="text-neutral text-[14px] font-normal rounded-[10px] hover:text-primary hover:scale-[1.1] border-none font-poppinssl"
                    id="accion_iniciarsesion"
                    @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                />
                <router-link to="/registro">
                    <btn
                        w="100px"
                        h="30px"
                        :text="$t('Regístrate')"
                        :is-visible-line-mobile="false"
                        :is-visible-line="false"
                        v-bind="analyticsAttrs('header:signup-btn')"
                        class="text-neutral text-[14px] font-normal font-poppinssl rounded-[10px] hover:scale-[1.1] bg-success"
                    />
                </router-link>
            </div>
            <div class="flex items-center rounded-full gap-1 bg-base-200 p-2">
                <social-net-work :custom-icons="headerSocial"/>
            </div>
        </div>
    </div>
    <!-- Mobile menu container -->
    <div
        id="nav"
        :class="[
            { hidden: openMenuMobile, 'z-[60] visible': !openMenuMobile },
            'flex items-center justify-center inset-x-0 bottom-0 z-[11] w-full min-h-[64px] h-[63px] fixed general-container py-4 mx-auto',
            'transition duration-200 ease-in-out',
            'rounded-xl',
            'text-neutral',
            'lg:translate-x-0',
            'bg-base-300/50 backdrop-blur-sm',
            'visible md:hidden',
        ]"
    >
        <div class="flex items-center justify-around mx-auto gap-[0.75rem] relative">
            <btn
                w="100px"
                h="30px"
                :text="$t('Iniciar Sesión')"
                bg="transparent"
                :is-visible-line="false"
                :is-visible-line-mobile="true"
                v-bind="analyticsAttrs('header:login-btn')"
                class="text-primary text-[14px] font-normal rounded-[10px] hover:text-primary hover:scale-[1.1] border-none font-poppinssl"
                id="accion_iniciarsesion"
                @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
            />
            <router-link to="/registro">
                <btn
                    w="100px"
                    h="29px"
                    :text="$t('Regístrate')"
                    color="primary"
                    v-bind="analyticsAttrs('header:signup-btn')"
                    class="text-neutral bg-success text-[16px] font-normal rounded-[10px] hover:scale-[1.1] font-poppinssl"
                    :is-visible-line-mobile="false"
                    :is-visible-line="false"
                />
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.header__menu {
    position: fixed !important; /* Ensures the header menu is fixed at the top */
}
</style>

<!-- FILE DOCUMENTED -->

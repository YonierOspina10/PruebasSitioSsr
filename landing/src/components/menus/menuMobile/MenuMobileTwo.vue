<script setup lang="ts">
import IconCloseMenu from '../../icons/IconCloseMenu.vue'; // Import close menu icon component
import Btn from '../../buttons/Btn.vue'; // Import button component
import { useModalStore } from '../../../stores/Modal'; // Import modal store for managing modal state
import { useAppHeaderMenu } from '../../../composables/useAppHeader.ts'; // Import composable for app header menu
import { defineAsyncComponent, onMounted, reactive, watch } from 'vue'; // Import Vue composition API functions
import { MenuList } from '../../../interfaces'; // Import MenuList interface for type safety
import { useAppcomponentStore } from '../../../stores/AppComponent'; // Import app component store
import { getDevice, getPromotional2 } from '../../../utils/configHome'; // Import utility functions for device and promotions
import { useCentribalChat } from '../../../composables/useChatCentribal.ts'; // Import composable for chat functionality

// Get app component from store
const appComponent = useAppcomponentStore().appComponent;

// Define an async component for promotional cards
const promotionalCard2 = defineAsyncComponent(() => import('../../promotionalCards/PromotionalCards2.vue'));

// Destructure chat functionality from the chat composable
const { showChat, onOpenChat } = useCentribalChat();

// Define props for the component
const props = defineProps({
    isOpen: Boolean, // Prop to determine if the modal is open
});

// Define emits for the component
const emits = defineEmits<{
    (e: 'onClickModal', isOpen: boolean): void; // Emit event when modal is clicked
}>();

// Initialize modal store
const modals = useModalStore();

// Destructure menu and footer from the app header menu composable
const { menu_not_login, footer } = useAppHeaderMenu();

// Create a reactive object to hold the menu list data
const menuList = reactive<{ data: MenuList[] }>({ data: [] });
let PROMOTIONS: any = []; // Variable to hold promotional data

// Lifecycle hook to run code when the component is mounted
onMounted(() => {
    getDevice(appComponent); // Call function to get device information
    PROMOTIONS = getPromotional2(appComponent); // Fetch promotional data
    menuList.data = menu_not_login // Map and filter menu items
        .map((item: any) => {
            const { MENU_LOGO, ...rest } = item; // Destructure to remove MENU_LOGO
            return rest; // Return the rest of the item
        })
        .filter((item) => Object.keys(item).length > 0); // Filter out empty items
});

// Watch for changes in the isOpen prop to manage body overflow style
watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden'; // Disable body scroll when modal is open
        } else {
            document.body.style.overflow = ''; // Enable body scroll when modal is closed
        }
    },
);

// Function to handle closing the modal
const onCloseModal = (): void => {
    const isOpen: boolean = false; // Set isOpen to false
    emits('onClickModal', isOpen); // Emit event to notify parent component
};

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:MenuMobileTwo|layout:layout-${appComponent.config.layout}`
});

</script>
<template>
    <!-- Main container for the modal -->
    <div class="absolute left-0 top-[44px] w-full">
        <!-- Search input container with transition effects -->
        <div
            id="search-input"
            :class="[
                'transition-transform ease-in-out duration-500',
                isOpen ? 'translate-x-0' : '-translate-x-full',
                'absolute top-0 left-0 w-full min-w-[330px] h-[100vh]',
                'bg-base-content backdrop-blur-[4px] z-[60]',
                'translate-x-0',
                'p-5',
                'overflow-y-auto',
            ]"
        >
            <!-- Close menu icon with click event to close modal -->
            <icon-close-menu
                width="30px"
                height="32px"
                class="absolute right-[1rem] top-[5px] font-semibold cursor-pointer hover:scale-[1.1] fill-primary-content"
                @click="onCloseModal"
            />
            <!-- Container for main content of the modal -->
            <div class="w-full h-[90vh] overflow-y-auto custom-scroll">
                <div class="w-[full] h-full mt-[20px]">
                    <!-- Button container with flex layout -->
                    <div class="flex items-center justify-center gap-[3rem] relative">
                        <!-- Button for login action -->
                        <btn
                            w="100px"
                            h="33px"
                            :text="$t('Iniciar Sesión')"
                            bg="transparent"
                            bg-line="bg-primary-content"
                            :is-visible-line="false"
                            :is-visible-line-mobile="true"
                            class="text-[15px] font-normal font-poppinssl text-neutral rounded-[10px] hover:text-primary-content hover:scale-[1.1] border-none relative top-0"
                            id="accion_iniciarsesion"
                            @click="() => modals.addModal({ showModal: 'ModalLogin7' })"
                        />
                        <!-- Button for registration action -->
                        <router-link to="/registro"  v-bind="analyticsAttrs(`menu:nav:login`)" >
                            <btn
                                w="100px"
                                h="30px"
                                :text="$t('Regístrate')"
                                :is-visible-line="false"
                                :is-visible-line-mobile="false"
                                class="text-neutral text-[14px] font-normal rounded-[10px] hover:scale-[1.1] bg-success"
                            />
                        </router-link>
                    </div>
                    <!-- Horizontal rule for separation -->
                    <hr class="border-primary-content h-[1px] w-full mx-auto mt-6 mb-6" />
                    <div class="w-full mx-auto">
                        <!-- List of menu items -->
                        <ul
                            class="list-square pl-2 mt-5 flex flex-col justify-start items-start gap-[10px] max-h-[454px] custom-scroll font-medium scroll-menu"
                        >
                            <li
                                class="flex flex-row items-center gap-[8px] min-h-[45px] cursor-pointer"
                                v-for="(item, index) in menuList.data"
                                :key="index"
                            >
                                <!-- Router link for menu items that are not chat -->
                                <router-link
                                    v-if="item.TARGER !== 'chat'"
                                    :to="item.MENU_URL"
                                    v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                    @click="onCloseModal"
                                    class="flex items-center gap-[0.75rem]"
                                >
                                    <span
                                    v-if="item.MENU_ICON"
                                    v-html="item.MENU_ICON"
                                    class="w-[17px] h-[17px] inline-block"
                                    ></span>

                                    <p class="text-[15px] text-neutral font-poppinssl">{{ $t(item.MENU_TITLE) }}</p>
                                </router-link>
                                <!-- Button for chat target menu items -->
                                <button
                                    v-if="item.TARGER !== undefined && item.TARGER == 'chat'"
                                    class="flex items-center gap-[0.75rem]"
                                    @click="onOpenChat()"
                                >
                                    <img
                                        v-if="item.MENU_ICON"
                                        :src="item.MENU_ICON"
                                        alt="icon__menu"
                                        width="17px"
                                        height="17px"
                                        class="object-contain"
                                    />
                                    <p class="text-[15px] text-neutral font-poppinssl">{{ $t(item.MENU_TITLE) }}</p>
                                </button>
                            </li>
                        </ul>
                        <!-- Horizontal rule for separation -->
                        <hr class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4" />
                        <div class="w-full mx-auto h-[262px]">
                            <!-- Dynamic component for promotional cards -->
                            <component
                                :is="promotionalCard2"
                                :promotions="PROMOTIONS"
                                @onClickModal="onCloseModal"
                                class="w-full h-full scale-90 relative mx-auto cursor-pointer"
                            />
                        </div>
                        <!-- Horizontal rule for separation -->
                        <hr class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4" />
                        <div class="w-full mx-auto h-[312px]">
                            <!-- List of footer items -->
                            <ul class="w-full h-full flex flex-col justify-between">
                                <li
                                    v-for="element in footer"
                                    class="mb-2"
                                >
                                    <router-link
                                        :to="element.MENU_URL"
                                        v-bind="analyticsAttrs(`menu:nav:${element.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
                                        @click="onCloseModal"
                                    >
                                        <p class="text-neutral font-poppinssl text-[17px] cursor-pointer">
                                            {{ $t(element.MENU_TITLE) }}
                                        </p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Custom scrollbar styles for the modal */
.custom-scroll {
    -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on touch devices */
    overflow-y: scroll; /* Enable vertical scrolling */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}
.custom-scroll::-webkit-scrollbar {
    width: 0; /* Hide scrollbar for WebKit browsers */
    height: 0; /* Hide scrollbar for WebKit browsers */
}
.custom-scroll::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make scrollbar thumb transparent */
}
.custom-scroll::-webkit-scrollbar-track {
    background-color: transparent; /* Make scrollbar track transparent */
}
</style>

<!-- FILE DOCUMENTED -->

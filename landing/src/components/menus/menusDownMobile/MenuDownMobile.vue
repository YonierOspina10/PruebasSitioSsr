<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import WhistleIcon from '../../icons/WhistleIcon.vue'; // Importing WhistleIcon component
import CasinoCoinIcon from '../../icons/CasinoCoinIcon.vue'; // Importing CasinoCoinIcon component
import FlagsIcon from '../../icons/FlagsIcon.vue'; // Importing FlagsIcon component
import LiveIcon from '../../icons/LiveIcon.vue'; // Importing LiveIcon component
import WalletIcon from '../../icons/WalletIcon.vue'; // Importing WalletIcon component
import ProfileIcon from '../../icons/ProfileIcon.vue'; // Importing ProfileIcon component
import ExitIcon from '../../icons/ExitIcon.vue'; // Importing ExitIcon component
import LiveIcon2 from '../../icons/LiveIcon2.vue'; // Importing LiveIcon2 component
import { useModalStore } from '../../../stores/Modal'; // Importing useModalStore for modal state management

export default defineComponent({
    components: {
        // Registering components for use in the template
        LiveIcon2,
        WhistleIcon,
        CasinoCoinIcon,
        FlagsIcon,
        LiveIcon,
        WalletIcon,
        ProfileIcon,
        ExitIcon,
    },
    data() {
        // Defining reactive data properties for the component
        let appComponent: any = this.$appComponent; // Reference to the app component
        let onMenu: boolean = false; // State to track if the menu is open
        let modals = useModalStore(); // Accessing modal store for managing modals
        return {
            appComponent,
            onMenu,
            modals,
        };
    },
    methods: {
        // Defining methods for the component
        closeMenu() {
            // Method to close the menu
            this.onMenu = false; // Setting onMenu to false to indicate the menu is closed
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDownMobile|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },
});
</script>
<template>
    <!-- Main section for mobile menu, hidden on large screens -->
    <section class="menu-mobile-down relative w-full flex justify-center items-center lg:hidden">
        <!-- Navigation bar for user actions, fixed at the bottom of the screen -->
        <nav
            class="menu_user fixed -bottom-1 left-0 flex justify-around items-center gap-2 h-[70px] w-full lg:hidden p-2"
            :class="appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2 ? 'bg-base-300' : 'bg-base-200'"
            >
            <div 
				v-if="appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2"
				class="flex justify-between items-center gap-6">
				<RouterLink
				id="accion_registro"
				to="/registro"
				class="bg-success h-12 w-32 flex justify-center items-center rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105l"
			>
				{{ $t('Registrarse') }}
				<!-- Translated text for registration -->
			</RouterLink>
			<RouterLink
				to="/home"
                v-bind="analyticsAttrs('menu:nav:home')"
				class="w-16 h-16 rounded-full flex justify-center items-center"
				aria-label="Redireccion pagina principal"
			>
				<img :src="appComponent.config.header.logoUrl2" alt="" class="" />
				<!-- Logo image -->
			</RouterLink>
			<button
				class="bg-primary h-12 w-36 rounded-xl text-lg text-info font-semibold shadow-xl hover:scale-105"
                @click="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
			>
				{{ $t('Iniciar sesión') }}
				<!-- Translated text for login -->
			</button>
			</div>
			<div 
				v-else
				class="flex justify-between items-center">
            <!-- Button for user login, triggers modal on click -->
            <button
                class="bg-secondary h-10 w-44 rounded-xl text-lg text-info font-semibold shadow-xl btn-pyramid "
                @click="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
            >
                {{ $t('Iniciar sesión') }}
            </button>
            <!-- Router link to home page -->
            <RouterLink
                to="/home"
                v-bind="analyticsAttrs('menu:nav:home')"
                class="w-16 h-16 rounded-full flex justify-center items-center shadow-lg"
                aria-label="Redireccion pagina principal"
            >
            </RouterLink>
            <!-- Router link for registration, conditional class based on country -->
            <RouterLink
                id="mobile_accion_registro"
                to="/registro"
                :class="appComponent.country == 'br' ? '' : 'btn-pyramid'"
                class="button__menu bg-gradient-to-t from-neutral-content/20 to-neutral-content/20 bg-success h-10 w-44 flex justify-center items-center rounded-xl text-lg text-info font-semibold"
            >
                {{ $t('Registrate') }}
            </RouterLink>
            </div>
        </nav>
    </section>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

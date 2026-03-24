<script setup lang="ts">
import Btn from '@/components/buttons/Btn.vue'; // Importing button component
import { useAppHeaderMenu, userBalance } from '@/composables/useAppHeader.ts'; // Composables for header menu and user balance
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'; // Vue composition API functions
import type { MenuList } from '@/interface/IMenu'; // Type definition for menu list
import { useAppcomponentStore } from '@/stores/AppComponent'; // Store for application component state
import IconCloseMenu from '@/components/icons/menu/IconCloseMenu.vue'; // Icon for closing menu
import IconProfile from '@/components/icons/IconProfile.vue'; // Icon for user profile
import IconCloseSession from '@/components/icons/menu/IconCloseSession.vue'; // Icon for closing session
import BalanceUser from '@/components/BalanceUser.vue'; // Component for displaying user balance
import apiService from '@/services/ApiService'; // API service for backend communication
import router from '@/router'; // Router for navigation
import { watch } from '@vue/runtime-dom'; // Watcher for reactive properties
import { getDevice, getPromotional2 } from '@/utils/configHome'; // Utility functions for device and promotional data
import ThemeButton from '@/components/ThemeButton.vue';

// Asynchronously import the promotional card component
const promotionalCard2 = defineAsyncComponent(
	() => import('@/components/PromotionalCards2.vue')
);

// Define props for the component
const props = defineProps<{
	isOpen: boolean; // Indicates if the modal is open
}>();

// Define emitted events for the component
const emits = defineEmits<{
	(e: 'onClickModal', isOpen: boolean): void; // Event emitted when modal is clicked
}>();

const appComponent = useAppcomponentStore().appComponent; // Access application component state
const { config, menu_not_login, menu_login, footer } = useAppHeaderMenu(); // Destructure header menu configuration
const { currency, saldo } = userBalance(); // Destructure user balance data
const menuList = reactive<{ data: MenuList[] }>({ data: [] }); // Reactive menu list
const listHeights = ref<number[]>([]); // Heights for submenu lists
const openSubMenuIndexes = ref<boolean[]>([]); // Track open/closed state of submenus
let PROMOTIONS: any = []; // Promotions data
const showChat = ref<boolean>(false); // State for chat visibility
const flagInfoUser = ref<boolean>(false); // Flag for user info modal visibility

// Function to handle click event for user info
const onHandleClickId = () => {
	flagInfoUser.value = true; // Set flag to true to show user info modal
};

// Function to close modal and navigate to a specific path
const closeModalDetails = (path) => {
	router.push(path); // Navigate to the specified path
	flagInfoUser.value = false; // Close user info modal
};

// Lifecycle hook that runs when the component is mounted
onMounted(() => {
	getDevice(appComponent); // Get device information
	PROMOTIONS = getPromotional2(appComponent); // Fetch promotional data
	// Set menu list based on user login status
	if (appComponent.session.logueado) {
		menuList.data = menu_login;
	} else {
		menuList.data = menu_not_login;
	}
	// Clean up menu list by removing logo and empty items
	menuList.data = menuList.data
		.map((item) => {
			const { MENU_LOGO, ...rest } = item; // Destructure to remove logo
			return rest; // Return the rest of the item
		})
		.filter((item) => Object.keys(item).length > 0); // Filter out empty items
});

// Watcher for changes in user login status
watch(
	() => appComponent.session.logueado,
	(newLogueado) => {
		// Update menu list based on new login status
		if (newLogueado) {
			menuList.data = menu_login;
		} else {
			menuList.data = menu_not_login;
		}
	},
	{ immediate: true } // Trigger immediately on component mount
);

// Watcher for changes in modal open state
watch(
	() => props.isOpen,
	(newVal) => {
		// Toggle body overflow based on modal state
		if (newVal) {
			document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
		} else {
			document.body.style.overflow = ''; // Restore scrolling when modal is closed
		}
	}
);

// Function to emit modal click event
const onClickModal = (): void => {
	const isOpenValue: boolean = false; // Set modal open state to false
	emits('onClickModal', isOpenValue); // Emit event
};

// Function to toggle submenu visibility
const toggleList = (index: number) => {
	if (!openSubMenuIndexes.value[index]) {
		const menu = appComponent.menus_service[index]; // Get the menu item
		const totalHeight = menu.SUBMENUS.length * 40; // Calculate total height for submenu
		listHeights.value[index] = totalHeight; // Set height for the submenu
	} else {
		listHeights.value[index] = 0; // Reset height if submenu is closed
	}
	openSubMenuIndexes.value[index] = !openSubMenuIndexes.value[index]; // Toggle submenu open state
};

// Function to log out the user
const logOut = () => {
	appComponent.gAnalytics('exit_profile'); // Track analytics event
	appComponent.logOut(); // Call log out function
};

// Function to open or close chat
const onOpenChat = () => {
	let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
	if (appComponent.config.zendesk[appComponent.country].name == 'centribal') {
		if (!showChat.value) {
			// Show chat if currently hidden
			document
				.getElementById('centribal_iframe_layout')
				?.classList.remove('centribal_iframe_hidden');
			document
				.getElementById('centribal_iframe_layout')
				?.classList.add('centribal_iframe_open');
			showChat.value = true; // Set chat visibility to true
			postMessage('show_chat', '', ref_id); // Send message to show chat
		} else {
			// Hide chat if currently shown
			document
				.getElementById('centribal_iframe_layout')
				?.classList.remove('centribal_iframe_open');
			document
				.getElementById('centribal_iframe_layout')
				?.classList.add('centribal_iframe_hidden');
			showChat.value = false; // Set chat visibility to false
			postMessage('hide_chat', '', ref_id); // Send message to hide chat
		}
	}
};

const analyticsAttrs = (label: string) => ({
  'data-analytics-label': label,
  'data-analytics-context': `component:MenuMobile3|layout:layout-${appComponent.config.layout}`,
});

</script>
<template>
	<!-- Main container for the modal, shown based on isOpen prop -->
	<div
		v-if="isOpen"
		id="search-input"
		:class="[
			'transition-transform ease-in-out duration-500',
			isOpen ? 'translate-x-0' : '-translate-x-full',
			'h-full fixed top-0 left-0 w-full min-w-[330px]',
			'bg-base-content backdrop-blur-[8px] z-[180]',
			'overflow-y-auto custom-scroll',
			'pb-[13rem]',
			'translate-x-0',
			'px-4',
			appComponent.session.logueado ? 'mb-0' : '',
		]"
		:style="{
			height: appComponent.session.logueado
				? '100vh'
				: 'calc(100vh - 51px)',
		}"
	>
		<!-- Content for users not logged in -->
		<div
			v-if="!appComponent.session.logueado"
			class="w-full flex justify-center items-center gap-[0.75rem]"
		>
			<div class="w-full flex justify-center flex-col items-end mt-3">
				<div class="flex justify-start items-center">
					<div>
						<ThemeButton></ThemeButton>
					</div>
					<div
						class="hover:scale-[1.1] cursor-pointer z-30"
						@click="onClickModal"
					>
						<icon-close-menu
							width="30px"
							fill="none"
							height="30px"
							class="fill-primary"
						/>
					</div>
				</div>
				<div class="w-full flex items-center justify-center gap-[3rem]">
					<btn
						w="100px"
						h="33px"
						:text="$t('Iniciar Sesión')"
						bg="transparent"
						:is-visible-line="false"
						:is-visible-line-mobile="true"
						class="text-neutral text-[15px] font-normal rounded-[10px] hover:text-[#FFDE00] hover:scale-[1.1] top-[0.45rem] font-poppinssl"
						id="accion_iniciarsesion"
						@click="appComponent.showModalLogin = true"
					/>
					<router-link @click="onClickModal" to="/registro" v-bind="analyticsAttrs(`menu:nav:login`)">
						<btn
							w="100px"
							h="33px"
							:text="$t('Regístrate')"
							color="primary"
							:is-visible-line="false"
							:is-visible-line-mobile="false"
							class="text-neutral text-[15px] font-normal rounded-[10px] hover:scale-[1.1] font-poppinssl bg-success"
						/>
					</router-link>
				</div>
				<hr
					class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
				/>
				<div class="w-full mx-auto">
					<ul
						class="list-square pl-2 flex flex-col justify-start items-start gap-[10px] custom-scroll font-medium scroll-menu"
						:style="{ maxHeight: menuList.data.length * 60 + 'px' }"
					>
						<li
						class="w-full flex flex-row items-center gap-[8px] min-h-[45px] cursor-pointer"
						v-for="item in menuList.data"
						:key="item.MENU_ID"
					>
						<RouterLink
							v-if="item.TARGER == undefined"
							:to="item.MENU_URL"
							v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
							@click="onClickModal"
							class="flex items-center justify-center gap-[0.75rem]"
						>
							
							<div
								v-if="item.MENU_ICON"
								v-html="item.MENU_ICON"
								class="w-[1.8rem] h-[1.8rem] text-primary [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
							/>
							<p class="text-[17px] text-neutral font-poppinssl">
								{{ $t(item.MENU_TITLE) }}
							</p>
						</RouterLink>
						<a
							v-else-if="item.TARGER == 'chat'"
							id="accion_chat"
							class="text-[17px] text-neutral font-poppinssl flex items-center gap-[0.75rem]"
							@click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[1.8rem] h-[1.8rem] text-primary [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
							/>
							<span
								class="text-[17px] text-neutral font-poppinssl leading-4 text-center font-normal w-auto max-w-[110px]"
							>
								{{ $t(item.MENU_TITLE) }}
							</span>
						</a>
					</li>
					</ul>
					<hr
						class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
					/>
					<div class="w-full mx-auto h-[262px]">
						<component
							:is="promotionalCard2"
							:promotions="[PROMOTIONS[0]]"
							@onClickModal="onClickModal"
							class="w-full h-full scale-90 relative mx-auto cursor-pointer"
						/>
					</div>
					<hr
						class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
					/>
					<div class="w-full mx-auto h-[312px]">
						<ul
							class="w-full pl-2 h-full flex flex-col justify-between"
						>
							<li v-for="element in footer" class="mb-2">
								<router-link
									:to="element.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${element.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									@click="onClickModal"
									class="text-neutral text-[17px] cursor-pointer font-poppinssl"
								>
									{{ $t(element.MENU_TITLE) }}
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- Content for logged-in users -->
		<div
			v-if="appComponent.session.logueado"
			class="w-full flex flex-col justify-center items-center gap-[0.75rem]"
		>
		<div class="w-full flex justify-end items-end mt-3">
				<div class="mr-[1rem]">
					<ThemeButton></ThemeButton>
				</div>
				<div
					class="hover:scale-[1.1] cursor-pointer z-30"
					@click="onClickModal"
				>
					<icon-close-menu
						width="30px"
						fill="none"
						height="30px"
						class="fill-primary"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-[0.75rem] max-h-[312px] mt-[-3rem]">
				<div class="circle__profile-container">
					<div
						class="circle__profile-spin border-[2px] border-primary"
					></div>
					<div
						class="circle__profile bg-primary flex items-center justify-center"
					>
						<icon-profile
							width="50px"
							height="60px"
							class="stroke-neutral-content"
						/>
					</div>
				</div>
				<div
					class="justify-center items-center gap-2 px-5 flex flex-col"
				>
					<p
						:title="
							appComponent.session.nombre
								? appComponent.session.nombre
								: 'User name'
						"
						class="text-start font-semibold font-poppinssl text-[16px] max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis text-primary"
					>
						{{
							appComponent.session.nombre
								? appComponent.session.nombre
								: 'User name'
						}}
					</p>
					<span
						class="text-neutral text-base font-poppinssl text-[16px] text-start max-w-[100px] flex gap-[0.20rem]"
						><div class="font-semibold">ID:</div>
						{{ appComponent.session.usuario }}</span
					>
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
				<balance-user
					@onCloseModal="onClickModal"
					:show-balance="true"
					text-custom="left-[10em]"
					class="mx-auto"
				/>
			</div>
			<hr
				class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
			/>
			<div class="w-full mx-auto">
				<ul
					class="list-square pl-2 flex flex-col justify-start items-start gap-[10px] custom-scroll font-medium scroll-menu"
					:style="{ maxHeight: menuList.data.length * 60 + 'px' }"
				>
					<li
						class="w-full flex flex-row items-center gap-[8px] min-h-[45px] cursor-pointer"
						v-for="item in menuList.data"
						:key="item.MENU_ID"
					>
						<RouterLink
							v-if="item.TARGER == undefined"
							:to="item.MENU_URL"
							v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
							@click="onClickModal"
							class="flex items-center gap-[0.75rem]"
						>
							
							<div
								v-if="item.MENU_ICON"
								v-html="item.MENU_ICON"
								class="w-[1.8rem] h-[1.8rem] text-primary [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
							/>
							<p class="text-[17px] text-neutral font-poppinssl">
								{{ $t(item.MENU_TITLE) }}
							</p>
						</RouterLink>
						<a
							v-else-if="item.TARGER == 'chat'"
							id="accion_chat"
							class="text-[17px] text-neutral font-poppinssl flex items-center gap-[0.75rem]"
							@click="
								onOpenChat();
								appComponent.gAnalytics('interaction_chat');
							"
						>
							<img
								:src="item.MENU_ICON"
								alt=""
								class="w-[1.8rem] h-[1.8rem] text-primary [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
							/>
							<span
								class="text-[17px] text-neutral font-poppinssl leading-4 text-center font-normal w-auto max-w-[110px]"
							>
								{{ $t(item.MENU_TITLE) }}
							</span>
						</a>
					</li>
				</ul>
				<hr
					class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
				/>
				<div class="w-full mx-auto h-[262px]">
					<component
						:is="promotionalCard2"
						:promotions="[PROMOTIONS[0]]"
						@onClickModal="onClickModal"
						class="w-full h-full scale-90 relative mx-auto"
					/>
				</div>
				<hr
					class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
				/>
				<div
					v-if="appComponent.session.logueado"
					class="dropdown w-full max-h-[400px] mx-auto"
				>
					<h3
						class="text-[17px] font-poppinssl py-2 cursor-pointer text-neutral first-letter-capitalize"
					>
						{{ $t('Servicios') }}
					</h3>
					<ul class="listSettings">
						<li
							v-for="(menu, index) in appComponent.menus_service"
							:key="'item1-' + index"
							class="mb-2 text-black measuringWrapper"
						>
							<p
								id="grow"
								class="text-neutral text-[15px] font-poppinssl cursor-pointer capitalize"
								@click="toggleList(index)"
							>
								{{ $t(menu.MENU_TITLE) }}
							</p>
							<ul
								id="list"
								v-show="openSubMenuIndexes[index]"
								:style="{
									maxHeight: listHeights[index] + 'px',
									transition: 'max-height 0.3s ease',
								}"
								class="pl-4 overflow-hidden submenu"
							>
								<li
									v-for="(submenu, subIndex) in menu.SUBMENUS"
									:key="'submenu1-' + subIndex"
									class="mb-2 text-neutral text-[15px] cursor-pointer h-auto font-poppinssl"
								>
									<router-link
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
										@click="onClickModal"
									>
										<p>{{ $t(submenu.SUBMENU_TITLE) }}</p>
									</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<hr
					class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
				/>
				<div class="w-full mx-auto h-[312px]">
					<ul class="w-full h-full flex flex-col justify-around">
						<li v-for="element in footer" class="mb-[0.75rem]">
							<router-link
								:to="element.MENU_URL"
								v-bind="analyticsAttrs(`menu:nav:${element.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
								@click="onClickModal"
								class="text-neutral text-[17px] cursor-pointer font-poppinssl"
							>
								{{ $t(element.MENU_TITLE) }}
							</router-link>
						</li>
					</ul>
				</div>
				<hr
					class="border-primary-content h-[1px] w-full mx-auto mt-4 mb-4"
				/>
				<div
					class="bg-primary w-[180px] h-[38px] rounded-full flex mx-auto hover:scale-[1.1] cursor-pointer"
					@click="logOut"
				>
					<span
						class="flex flex-row items-center gap-[0.75rem] my-auto px-2 mx-auto text-[17px] text-neutral-content font-semibold"
						>{{ $t('Cerrar sesión')
						}}<icon-close-session
							width="16px"
							height="16px"
							class="fill-neutral-content"
					/></span>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal for user details, shown based on flagInfoUser state -->
	<Teleport v-if="flagInfoUser" to="body">
		<div class="modal detalle-usuario items-center">
			<div
				class="modal-box rounded-2xl text-neutral-content relative flex justify-center items-center flex-col text-center"
			>
				<label
					for="my-modal-3"
					@click="flagInfoUser = false"
					class="absolute right-2 top-2 cursor-pointer text-right block text-xl hover:text-red-700"
				>
					<font-awesome-icon
						class="icon-cross"
						icon="fa-solid fa-close"
					/>
				</label>
				<div class="usuario-pais-detaller">
					<font-awesome-icon
						icon="fa-solid fa-user"
						size="2x"
						class="mr-3"
					/>
					{{ appComponent.session.nombre }} - No.
					{{ appComponent.session.usuario }}
					<div class="usuario-pais-detaller mt-3">
						<span
							:class="'country-flags ' + appComponent.country"
						></span>
						<span>{{ appComponent.session.pais_nom }}</span>
					</div>
					<div
						class="usuario-pais-detaller"
						v-if="
							config.header != undefined &&
							config.header.buttonsDetails != undefined &&
							config.header.buttonsDetails
						"
					>
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="
								closeModalDetails(
									'/consulta/consulta_tickets_online'
								)
							"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Mis Apuestas') }}</label
								>
							</a>
						</button>
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="closeModalDetails('/gestion/deposito')"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Depositar') }}</label
								>
							</a>
						</button>
						<button
							class="btn btn-primary mt-3 text-neutral mx-2"
							@click="closeModalDetails('/gestion/cuenta_cobro')"
						>
							<a>
								<label
									class="cursor-pointer text-right block"
									>{{ $t('Retirar') }}</label
								>
							</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>
<style scoped>
/* Custom scrollbar styles */
.custom-scroll {
	-webkit-overflow-scrolling: touch; /* Enable smooth scrolling on touch devices */
	overflow-y: scroll; /* Enable vertical scrolling */
	scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.custom-scroll::-webkit-scrollbar {
	width: 3px; /* Width of the scrollbar */
	height: 0; /* Height of the scrollbar */
}

.custom-scroll::-webkit-scrollbar-thumb {
	background-color: transparent; /* Make scrollbar thumb transparent */
}

.custom-scroll::-webkit-scrollbar-track {
	background-color: transparent; /* Make scrollbar track transparent */
}

/* Settings for the settings list */
.listSettings {
	overflow-y: hidden; /* Hide vertical overflow */
	transition: height 0.5s ease; /* Smooth height transition */
}

/* Image display settings */
img {
	display: block; /* Display images as block elements */
	object-fit: contain; /* Maintain aspect ratio of images */
}

/* Profile container styles */
.circle__profile-container {
	position: relative; /* Position relative for absolute children */
	margin: 20px; /* Margin around the profile container */
	width: 140px; /* Fixed width for the profile container */
	height: 140px; /* Fixed height for the profile container */
	display: flex; /* Flexbox for centering */
	justify-content: center; /* Center items horizontally */
	align-items: center; /* Center items vertically */
	overflow: hidden; /* Hide overflow */
}

/* Profile circle styles */
.circle__profile {
	position: absolute; /* Position absolute for layering */
	height: 120px; /* Fixed height for the profile circle */
	width: 120px; /* Fixed width for the profile circle */
	border-radius: 50%; /* Make it circular */
	z-index: 1; /* Layer above other elements */
}

/* Spinning effect for profile circle */
.circle__profile-spin {
	position: absolute; /* Position absolute for spinning effect */
	top: 0; /* Align to top */
	left: 0; /* Align to left */
	width: 140px; /* Fixed width for spinning circle */
	height: 140px; /* Fixed height for spinning circle */
	border-radius: 50%; /* Make it circular */
	transform: rotate(90deg); /* Initial rotation */
	transition: transform 0.5s ease-in-out; /* Smooth rotation transition */
}

/* Settings for growing submenu */
#grow #list {
	height: 0; /* Initial height for hidden submenu */
	overflow: hidden; /* Hide overflow */
	transition: max-height 0.39s ease; /* Smooth height transition */
}
</style>

<!-- FILE DOCUMENTED -->

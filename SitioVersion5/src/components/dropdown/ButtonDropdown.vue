<script lang="ts" setup>
import { ref } from 'vue'; // Importing the ref function from Vue for reactive state management
import type { MenuListDropTown } from '@/interface/IMenu'; // Importing type definition for menu list
import MenuItem from '@/components/menus/MenuItem.vue'; // Importing the MenuItem component

const isOpen = ref<Record<string, boolean>>({}); // Reactive object to track open/closed state of dropdown menus

// Definition of the menu list with its properties and submenus
const menuList: MenuListDropTown[] = [
	{
		MENU_ID: '3',
		MENU_TITLE: 'Gestión',
		MENU_SLUG: 'gestion',
		MENU_EDITAR: 'true',
		MENU_ELIMINAR: 'false',
		MENU_ADICIONAR: 'true',
		SUBMENUS: [
			{
				SUBMENU_ID: '136',
				SUBMENU_URL: 'deposito',
				SUBMENU_TITLE: 'Depositar',
			},
			{
				SUBMENU_ID: '102',
				SUBMENU_URL: 'cuenta_cobro_anular',
				SUBMENU_TITLE: 'Anular Nota Retiro',
			},
			{
				SUBMENU_ID: '189',
				SUBMENU_URL: 'cuentasbancarias',
				SUBMENU_TITLE: 'Cuentas bancarias',
			},
			{
				SUBMENU_ID: '41',
				SUBMENU_URL: 'cuenta_cobro',
				SUBMENU_TITLE: 'Retirar',
			},
			{
				SUBMENU_ID: '500',
				SUBMENU_URL: 'verificar_cuenta',
				SUBMENU_TITLE: 'Verificar Cuenta',
			},
			{
				SUBMENU_ID: '121',
				SUBMENU_URL: 'cambiar-clave',
				SUBMENU_TITLE: 'Cambiar Contraseña',
			},
			{
				SUBMENU_ID: '195',
				SUBMENU_URL: 'misbonos',
				SUBMENU_TITLE: 'Mis Bonos',
			},
			{
				SUBMENU_ID: '87',
				SUBMENU_URL: 'gestion_cuenta',
				SUBMENU_TITLE: 'Mi Cuenta',
			},
			{
				SUBMENU_ID: '136', // Unique identifier for the submenu
				SUBMENU_URL: 'deposito', // URL for the submenu
				SUBMENU_TITLE: 'Depositar', // Title of the submenu
			},
		],
	},
	{
		MENU_ID: '5',
		MENU_TITLE: 'Consultas',
		MENU_SLUG: 'consulta',
		MENU_EDITAR: 'false',
		MENU_ELIMINAR: 'false',
		MENU_ADICIONAR: 'true',
		SUBMENUS: [
			{
				SUBMENU_ID: '100',
				SUBMENU_URL: 'consulta_tickets_online',
				SUBMENU_TITLE: 'Consulta de apuestas deportivas',
			},
			{
				SUBMENU_ID: '184',
				SUBMENU_URL: 'consulta_tickets_casino',
				SUBMENU_TITLE: 'Informe de apuestas casino',
			},
			{
				SUBMENU_ID: '186',
				SUBMENU_URL: 'consulta_depositos',
				SUBMENU_TITLE: 'Consultar depositos',
			},
			{
				SUBMENU_ID: '100', // Unique identifier for the submenu
				SUBMENU_URL: 'consulta_tickets_online', // URL for the submenu
				SUBMENU_TITLE: 'Consulta de apuestas deportivas', // Title of the submenu
			},
			{
				SUBMENU_ID: '88',
				SUBMENU_URL: 'mi_lealtad',
				SUBMENU_TITLE: 'Mi Lealtad',
			},
		],
	},
];

// Function to toggle the dropdown state of a menu based on its ID
const toggleDropdown = (menuId: string) => {
	isOpen.value[menuId] = !isOpen.value[menuId]; // Toggle the open state for the specified menu
};

// Function to handle redirection to a submenu URL
const redirectPageSubMenu = (url: string) => {
	console.log('Redirigiendo a:', url); // Log the URL for debugging purposes
};
</script>

<template>
	<div>
		<!-- Loop through each menu in the menuList -->
		<div
			v-for="menu in menuList"
			:key="menu.MENU_ID"
			class="relative inline-block text-left mb-4"
		>
			<!-- Button to toggle the dropdown menu -->
			<button
				type="button"
				class="inline-flex justify-center w-full rounded-md border border-gray-300 bg-yellow-400 text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
				@click="toggleDropdown(menu.MENU_ID)"
			>
				<!-- Display the menu title -->
				<span>{{ menu.MENU_TITLE }}</span>
				<svg
					class="ml-2 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<!-- Dropdown menu that appears when the menu is open -->
			<div
				v-if="isOpen[menu.MENU_ID]"
				class="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<!-- List of submenu items -->
				<ul class="py-1">
					<MenuItem
						v-for="submenu in menu.SUBMENUS"
						:key="submenu.SUBMENU_ID"
						:item="submenu"
						@redirect="redirectPageSubMenu"
					/>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Scoped styles can be added here if needed */
</style>

<!-- FILE DOCUMENTED -->

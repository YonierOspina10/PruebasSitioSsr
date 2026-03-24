<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { RouterView } from 'vue-router'; // Importing RouterView for routing functionality

export default defineComponent({
	data() {
		let config = this.$config(); // Fetching configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let onMenu: boolean = false; // State variable to track menu visibility
		return {
			config,
			appComponent,
			onMenu,
		};
	},
	methods: {
		/**
		 * Closes the menu by setting onMenu to false
		 */
		closeMenu() {
			this.onMenu = false;
		},
		/**
		 * Shows the deposit modal by setting the corresponding property to true
		 */
		showDeposit() {
			this.appComponent.showModalDepositV2 = true;
		},
	},
});
</script>

<template>
	<!-- Main section containing the navigation menus -->
	<section class="relative w-full flex justify-center items-center">
		<!-- Navigation for logged-in users -->
		<nav
			v-if="
				appComponent.session.logueado &&
				config.MENU_USER != undefined &&
				config.MENU_USER[appComponent.country] != undefined
			"
			class="bg-primary-focus h-20 w-[101%] rounded-t-3xl flex justify-center items-center text-center p-1 fixed z-[100] -bottom-[2px] lg:hidden shadow-lg shadow-white"
		>
			<RouterLink
				v-for="menu in config.MENU_USER[appComponent.country]"
				active-class="active-link"
				:to="
					menu.url != undefined && menu.url != '' ? menu.url : '/home'
				"
				@click="closeMenu()"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<!-- Menu icon -->
				<img
					v-if="menu.icon != undefined && menu.icon != ''"
					:src="menu.icon"
					alt="Icon Deportes Menu Inferior"
					class="object-cover"
					:class="
						menu.title != undefined && menu.title != ''
							? 'w-9 '
							: 'w-14'
					"
				/>
				<!-- Menu title -->
				<span v-if="menu.title != undefined && menu.title != ''">{{
					$t(menu.title)
				}}</span>
			</RouterLink>
		</nav>
		<!-- Navigation for non-logged-in users -->
		<nav
			v-else-if="
				!appComponent.session.logueado &&
				config.MENU_USER_NOLOGUEADO != undefined &&
				config.MENU_USER_NOLOGUEADO[appComponent.country] != undefined
			"
			class="bg-primary-focus h-20 w-[101%] rounded-t-3xl flex justify-center items-center text-center p-1 fixed z-[100] -bottom-[2px] lg:hidden shadow-lg shadow-white"
		>
			<RouterLink
				v-for="menu in config.MENU_USER_NOLOGUEADO[
					appComponent.country
				]"
				active-class="active-link"
				:to="
					menu.url != undefined && menu.url != '' ? menu.url : '/home'
				"
				@click="closeMenu()"
				class="w-full h-full max-w-[20%] flex flex-col justify-around items-center text-neutral text-xs font-semibold"
			>
				<!-- Menu icon -->
				<img
					v-if="menu.icon != undefined && menu.icon != ''"
					:src="menu.icon"
					alt="Icon Deportes Menu Inferior"
					class="object-cover"
					:class="
						menu.title != undefined && menu.title != ''
							? 'w-9 '
							: 'w-14'
					"
				/>
				<!-- Menu title -->
				<span v-if="menu.title != undefined && menu.title != ''">{{
					$t(menu.title)
				}}</span>
			</RouterLink>
		</nav>
	</section>
</template>

<style scoped>
/* Styles for the menu button */
.button__menu {
	text-shadow: 0 0 4px black; /* Adds a black shadow to the text */
}

/* Styles for the active link */
.active-link > span {
	color: white; /* Changes the text color to white for active links */
}

/* Styles for extra menu transitions */
.menu_extra {
	transition: 0.3s linear; /* Smooth transition effect for menu items */
}
</style>

<!-- FILE DOCUMENTED -->

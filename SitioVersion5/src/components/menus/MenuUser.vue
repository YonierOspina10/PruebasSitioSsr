<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a menu that displays a list of submenus.
 */
export default defineComponent({
	// Component props definition
	props: {
		/** The current page identifier */
		page: String,
		/** The identifier for the menu */
		MENU_ID: String,
	},
	data() {
		// Retrieve configuration and app component references
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let menu: any = []; // Initialize an empty menu array
		return {
			config,
			appComponent,
			menu,
		};
	},
	mounted() {
		// Check if menus_service is defined in the app component
		if (this.appComponent.menus_service != undefined) {
			// Iterate through the menus_service to find the matching MENU_ID
			this.appComponent.menus_service.forEach((value) => {
				if (this.MENU_ID == value.MENU_ID) {
					this.menu = value; // Assign the found menu to the menu variable
				}
			});
		}
	},
    updated() {
        console.log(this.page);
    }
});
</script>

<template>
	<!-- Main container for the terms list, visible only on medium and larger screens -->
	<div
		class="TermsList HelpList md:w-1/4 w-full float-left hidden md:block"
		v-if="menu != undefined"
	>
		<!-- Ordered list for the menu items -->
		<ol class="MenuList L">
			<!-- List item for each submenu, dynamically bound to the submenu data -->
			<li
				class="waves-effect btn text-left inline-block w-full mb-1.5 h-auto shadow-md bg-base-400 text-neutral"
				v-for="submenu in menu.SUBMENUS"
                :class="{
                    'border-accent': page == submenu.SUBMENU_URL
                }"
			>
				<RouterLink
					:id="submenu.MENU_ID"
					:to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
					@click="
						appComponent.gAnalytics(
							menu.MENU_SLUG == 'consulta'
								? 'menu_query'
								: 'sub_menu_account',
							submenu
						)
					"
				>
					<!-- Display the submenu title, translated using the $t function -->
					<span class="PageName N">{{
						$t(submenu.SUBMENU_TITLE)
					}}</span>
				</RouterLink>
			</li>
		</ol>
	</div>
</template>

<!-- FILE DOCUMENTED -->

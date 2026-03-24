<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a menu slider.
 */
export default defineComponent({
	// Component props definition
	props: {
		page: String, // Current page identifier
		MENU_ID: String, // Identifier for the menu
	},

	// Component data function
	data() {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Reference to the application component
		let menu: any = []; // Initialize menu as an empty array
		return {
			config,
			appComponent,
			menu,
		};
	},

	// Lifecycle hook called after the component is mounted
	mounted() {
		// Check if menus_service is defined and populate the menu
		if (this.appComponent.menus_service != undefined) {
			this.appComponent.menus_service.forEach((value) => {
				if (this.MENU_ID == value.MENU_ID) {
					this.menu = value; // Assign the matching menu
				}
			});
		}

		// Wait for the next DOM update cycle
		this.$nextTick(() => {
			let isDown = false; // Flag to track mouse/touch state
			let startX; // Initial X position
			let scrollLeft; // Initial scroll position
			const slider: any = document.querySelector('.scrollMenu'); // Reference to the scroll menu

			// Function to handle the end of the drag
			const end = () => {
				isDown = false; // Reset the flag
				slider.classList.remove('active'); // Remove active class
			};

			// Function to handle the start of the drag
			const start = (e) => {
				isDown = true; // Set the flag to true
				slider.classList.add('active'); // Add active class
				startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get initial X position
				scrollLeft = slider.scrollLeft; // Get initial scroll position
			};

			// Function to handle the dragging movement
			const move = (e) => {
				this.appComponent.openLink = true; // Set openLink to true
				if (!isDown) return; // Exit if not dragging
				this.appComponent.openLink = false; // Reset openLink
				const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
				const dist = x - startX; // Calculate distance moved
				slider.scrollLeft = scrollLeft - dist; // Update scroll position
			};

			// Immediately invoked function to add event listeners
			(() => {
				slider.addEventListener('mousedown', start); // Mouse down event
				slider.addEventListener('touchstart', start, { passive: true }); // Touch start event
				slider.addEventListener('mousemove', move); // Mouse move event
				slider.addEventListener('touchmove', move, { passive: true }); // Touch move event
				slider.addEventListener('mouseleave', end); // Mouse leave event
				slider.addEventListener('mouseup', end); // Mouse up event
				slider.addEventListener('touchend', end); // Touch end event
			})();
		});
	},
});
</script>

<template>
	<!-- Main container for the menu, displayed if menu is defined -->
	<div class="w-full scrollMenu flex justify-start pb-0 overflow-x-auto" v-if="menu != undefined">
		<!-- Ordered list for the scrollable menu items -->
		<ol class="" v-for="submenu in menu.SUBMENUS" :key="submenu.SUBMENU_ID">
			<!-- RouterLink for each submenu item -->
			<RouterLink
				active-class="bg-base-100 text-primary"
				:id="submenu.MENU_ID"
				:to="'/' + menu.MENU_SLUG + '/' + submenu.SUBMENU_URL"
				@click="appComponent.gAnalytics('sub_menu_account', submenu)"
				class="in flex items-center justify-center text-center h-16 px-3 rounded-t-lg bg-neutral-content text-neutral text-xs lg:text-sm font-semibold w-full leading-4"
            >
                <span>{{ $t(submenu.SUBMENU_TITLE) }}</span>
			</RouterLink>
		</ol>
	</div>
</template>

<style scoped>
/* Active link styling */
.active--link {
	background-color: #242637 !important; /* Background color for active link */
	color: #ffffff !important; /* Text color for active link */
}

/* Hide the scrollbar for the scroll menu */
.scrollMenu::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

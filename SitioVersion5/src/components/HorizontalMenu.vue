<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a scrollable menu.
 */
export default defineComponent({
	props: {
		// Prop to receive an object containing menu data.
		object: Object,
	},
	data: function () {
		// Declare local data variables.
		let data: any;
		let appComponent: any = this.$appComponent; // Reference to the application component.
		let menu: any = []; // Array to hold menu items.
		return {
			data,
			appComponent,
			menu,
		};
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted.
		this.$nextTick(() => {
			let isDown = false; // Flag to track mouse/touch state.
			let startX; // Variable to store the starting X position.
			let scrollLeft; // Variable to store the initial scroll position.
			const slider: any = document.querySelector('.scrollMenu'); // Reference to the scrollable menu.

			// Function to handle the end of the dragging action.
			const end = () => {
				isDown = false; // Reset the dragging flag.
				slider.classList.remove('active'); // Remove active class from the slider.
			};

			// Function to handle the start of the dragging action.
			const start = (e) => {
				isDown = true; // Set dragging flag to true.
				slider.classList.add('active'); // Add active class to the slider.
				startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get the starting X position.
				scrollLeft = slider.scrollLeft; // Store the current scroll position.
			};

			// Function to handle the dragging movement.
			const move = (e) => {
				this.appComponent.openLink = true; // Set openLink to true to indicate a link is being interacted with.
				if (!isDown) return; // Exit if not dragging.
				this.appComponent.openLink = false; // Reset openLink.
				const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get the current X position.
				const dist = x - startX; // Calculate the distance moved.
				slider.scrollLeft = scrollLeft - dist; // Update the scroll position.
			};

			// Immediately invoked function to add event listeners for mouse and touch events.
			(() => {
				slider.addEventListener('mousedown', start); // Add mousedown event listener.
				slider.addEventListener('touchstart', start, { passive: true }); // Add touchstart event listener.
				slider.addEventListener('mousemove', move); // Add mousemove event listener.
				slider.addEventListener('touchmove', move, { passive: true }); // Add touchmove event listener.
				slider.addEventListener('mouseleave', end); // Add mouseleave event listener.
				slider.addEventListener('mouseup', end); // Add mouseup event listener.
				slider.addEventListener('touchend', end); // Add touchend event listener.
			})();
		});
	},
});
</script>

<template>
	<!-- Main container for the scrollable menu, visible only if the object prop is defined. -->
	<div class="w-full flex" v-if="object != undefined">
		<!-- Ordered list for the scrollable menu items with horizontal overflow. -->
		<ol
			class="scrollMenu flex pb-0 overflow-x-auto max-w-[1200px] w-full sm:w-[36%]"
		>
			<!-- RouterLink for each submenu item, dynamically generated from the object prop. -->
			<RouterLink
				v-for="submenu in object.SUBMENUS"
				active-class="bg-secondary text-primary"
				:id="object.MENU_ID"
				:to="'/' + object.MENU_SLUG + '/' + submenu.SUBMENU_URL"
				@click="appComponent.gAnalytics('sub_menu_account', object)"
				class="in flex items-center justify-center text-center h-16 hover:bg-secondary rounded-t-lg shadow-secondary/50 shadow-[inset_0px_0px_20px_20px] text-neutral hover:text-primary text-xs lg:text-sm font-semibold w-full leading-4"
				v-bind:class="object.SUBMENU_URL ? 'Active' : ''"
				>{{ $t(submenu.SUBMENU_TITLE) }}
			</RouterLink>
		</ol>
	</div>
</template>

<style scoped>
/* Hide the scrollbar for the scrollable menu. */
.scrollMenu::-webkit-scrollbar {
	display: none;
}
</style>

<!-- FILE DOCUMENTED -->

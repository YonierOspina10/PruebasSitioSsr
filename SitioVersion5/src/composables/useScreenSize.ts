import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Custom Composition API function to determine if the screen size is
 * above a specified minimum width, indicating a desktop view.
 *
 * @param {number} minWidth - The minimum width to consider as desktop (default is 1024).
 * @returns {Object} - An object containing the reactive property `isDesktop`.
 */
export function useScreenSize(minWidth = 1024) {
	// Reactive reference to track if the current screen size is desktop
	const isDesktop = ref<boolean>(false);

	// Variable to hold the timeout ID for debouncing resize events
	let resizeTimeout: ReturnType<typeof setTimeout>;

	/**
	 * Updates the `isDesktop` value based on the current window width.
	 */
	const updateScreenSize = () => {
		isDesktop.value = window.innerWidth >= minWidth;
	};

	/**
	 * Handles the resize event, debouncing the update to avoid excessive calls.
	 */
	const onResize = () => {
		clearTimeout(resizeTimeout); // Clear the previous timeout
		resizeTimeout = setTimeout(updateScreenSize, 1000); // Set a new timeout
	};

	// Lifecycle hook that runs when the component is mounted
	onMounted(() => {
		updateScreenSize(); // Initial check for screen size
		window.addEventListener('resize', onResize); // Add resize event listener
	});

	// Lifecycle hook that runs when the component is unmounted
	onUnmounted(() => {
		window.removeEventListener('resize', onResize); // Clean up event listener
	});

	// Return the reactive property for external use
	return {
		isDesktop,
	};
}

// FILE DOCUMENTED

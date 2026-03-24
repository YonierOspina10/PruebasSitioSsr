import { ref, computed } from 'vue'; // Importing ref and computed from Vue for reactive state management
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store for state access

/**
 * Custom composition function to manage application component state.
 * @returns {Object} An object containing the appComponent state and the computed background property.
 */
export function useAppComponent() {
	const appComponent = useAppcomponentStore().appComponent; // Accessing the appComponent state from the store

	/**
	 * Computed property that determines the background based on the device type.
	 * @returns {string} The appropriate background value based on mobile or desktop configuration.
	 */
	const background = computed(() => {
		const config = appComponent.config; // Accessing the configuration from appComponent
		if (appComponent.mobile) {
			// Checking if the device is mobile
			return config.background_mobile // Returning mobile background if available
				? config.background_mobile
				: config.backgroundMobileDefault; // Fallback to default mobile background
		} else if (!appComponent.mobile) {
			// Checking if the device is desktop
			return config.background_desktop // Returning desktop background if available
				? config.background_desktop
				: config.backgroundDefault; // Fallback to default desktop background
		}
		return ''; // Default return if no conditions are met
	});

	// Returning the appComponent state and the computed background property
	return {
		appComponent,
		background,
	};
}

// FILE DOCUMENTED

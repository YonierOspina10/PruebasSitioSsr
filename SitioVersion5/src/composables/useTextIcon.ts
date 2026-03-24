import { useAppcomponentStore } from '@/stores/AppComponent';

/**
 * Custom hook to retrieve the TextIcon configuration from the app component store.
 *
 * @returns {Object} An object containing the TextIcon configuration.
 */
export function useAppIonVhtml() {
	// Access the appComponent from the app component store
	const appComponent = useAppcomponentStore().appComponent;
	// Extract the TextIcon configuration from the appComponent
	const TextIcon = appComponent.config.TextIcon;

	// Return an object containing the TextIcon
	return {
		TextIcon,
	};
}

// FILE DOCUMENTED

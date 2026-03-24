import { ref } from 'vue'; // Importing the 'ref' function from Vue for reactive state management
import { defineStore } from 'pinia'; // Importing 'defineStore' from Pinia for store definition

/**
 * Defines a global store using Pinia.
 * This store manages global state for the application.
 *
 * @returns {Object} The state variables of the store.
 */
export const useGlobalStore = defineStore('global', () => {
	// Reactive reference for the provider state, initialized to 'all'
	const provider = ref<string>('all');
	// Reactive reference for the category state, initialized to 'all'
	const category = ref<string>('all');
	// Reactive reference for the main menu visibility state, initialized to false
	const onMenuMain = ref<boolean>(false);

	// Returning the state variables for use in components
	return { provider, category, onMenuMain };
});

// FILE DOCUMENTED

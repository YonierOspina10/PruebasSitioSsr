import { ref, watch } from 'vue'; // Importing the ref function from Vue for reactive state management
import { defineStore } from 'pinia'; // Importing defineStore from Pinia for state management
import { useRoute } from 'vue-router';
/**
 * Creates a Pinia store named 'casino'.
 * This store manages the state related to casino providers and categories.
 */
export const useCasinoStore = defineStore('casino', () => {
	// Reactive reference for the selected provider
	const providerSelect = ref(null);
	// Reactive reference for the selected category
	const categorySelect = ref(null);
	// Reactive reference for the current offset in pagination
	const offsetSelect = ref(0);
	// Reactive reference for the total count of items
	const totalCountSelect = ref(0);
	// Accessing the current route
	const route = useRoute();
	
	// Watcher to reset selected category and provider when the route path changes
	watch(
		() => route.path.split('/')[1], // Watching the route path for changes
		() => {
			categorySelect.value = null; // Resetting the selected category
			providerSelect.value = null; // Resetting the selected provider
		},
		{ immediate: true }
	)

	/**
	 * Sets the selected provider.
	 * @param {any} provider - The provider to be set.
	 */
	function setProviderSelect(provider: any) {
		providerSelect.value = provider; // Updates the providerSelect reference
	}

	/**
	 * Sets the selected category.
	 * @param {any} category - The category to be set.
	 */
	function setCategorySelect(category: any) {
		categorySelect.value = category; // Updates the categorySelect reference
	}

	/**
	 * Sets the current offset for pagination.
	 * @param {any} offset - The offset value to be set.
	 */
	function setOffsetSelect(offset: any) {
		offsetSelect.value = offset; // Updates the offsetSelect reference
	}

	/**
	 * Sets the total count of items.
	 * @param {any} totalCount - The total count value to be set.
	 */
	function setTotalCountSelect(totalCount: any) {
		totalCountSelect.value = totalCount; // Updates the totalCountSelect reference
	}

	// Exposing the state and actions for use in components
	return {
		providerSelect,
		categorySelect,
		offsetSelect,
		totalCountSelect,
		setProviderSelect,
		setCategorySelect,
		setOffsetSelect,
		setTotalCountSelect,
	};
});

// FILE DOCUMENTED

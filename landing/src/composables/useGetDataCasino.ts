import { ref, toValue, watchEffect } from 'vue'; // Importing Vue composition API functions
import { useAppcomponentStore } from '../stores'; // Importing the app component store
import apiService from '../services/ApiService.ts'; // Importing the API service for data requests

/**
 * Custom composition function to fetch casino data.
 * 
 * @param {any} params - Parameters to be sent with the API request.
 * @returns {Object} - An object containing categories, providers, loading state, and error state.
 */
export function useGetDataCasino(params: any) {
	const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
	let parsedParams = toValue(params); // Converting reactive params to a plain value
	const providers = ref([]); // Reactive reference for providers data
	const categories = ref([]); // Reactive reference for categories data
	const loading = ref(true); // Reactive reference for loading state
	const error = ref(null); // Reactive reference for error state

	/**
	 * Function to fetch data from the API.
	 * Sets loading state, handles response, and updates providers and categories.
	 */
	const getData = () => {
		loading.value = true; // Set loading to true before the request
		apiService
			.requestGet(
				appComponent.config.urlVirtualplay ?
					appComponent.config.urlVirtualplay + '/cms/products/games/' : 'https://gameservice.virtualsoft.tech/', 
				parsedParams // Sending parsed parameters with the request
			)
			.then((response: any) => {
				providers.value = response.data.providers; // Updating providers with response data
				categories.value = response.data.categories; // Updating categories with response data
				loading.value = false; // Set loading to false after data is fetched
			})
			.catch((err) => (error.value = err)); // Handling errors and updating error state
	};

	// Watch for changes and trigger data fetching
	watchEffect(() => {
		getData(); // Call getData whenever dependencies change
	});

	// Return reactive references for use in components
	return { categories, providers, loading, error };
}

// FILE DOCUMENTED

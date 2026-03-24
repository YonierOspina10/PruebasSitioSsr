import { ref, toValue, watchEffect } from 'vue'; // Importing Vue composition API functions
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store
import apiService from '@/services/ApiService'; // Importing the API service for making requests

/**
 * Custom composition function to fetch casino data.
 * 
 * @param {any} params - Parameters to be used in the API request.
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
	 * It updates the loading state and handles the response or error.
	 */
	const getData = () => {
		loading.value = true; // Set loading to true before the request
		apiService
			.requestGet(
				appComponent.config.urlVirtualplay ?
					appComponent.config.urlVirtualplay + '/cms/products/games/' : 'https://gameservice.virtualsoft.tech/', 
				parsedParams // Parameters for the API request
			)
			.then((response: any) => {
				providers.value = response.data.providers; // Update providers with response data
				categories.value = response.data.categories; // Update categories with response data
				loading.value = false; // Set loading to false after the request completes
			})
			.catch((err) => (error.value = err)); // Capture and store any errors
	};

	// Watch for changes in parsedParams and call getData if action is defined
	watchEffect(() => {
		if (parsedParams.action !== undefined){
			getData(); // Fetch data if action is present
		}
	});

	// Return the reactive references for use in components
	return { categories, providers, loading, error };
}

// FILE DOCUMENTED

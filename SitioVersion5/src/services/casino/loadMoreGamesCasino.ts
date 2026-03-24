import { ref, toValue, watchEffect } from 'vue'; // Importing Vue composition API functions
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the store for app component state

/**
 * Asynchronously loads more casino games based on provided parameters.
 * 
 * @param {any} params - The parameters to be used for fetching games.
 * @returns {Promise<any[]>} - A promise that resolves to an array containing the game list and error state.
 */
export async function loadMoreGamesCasino(params: any) : Promise<any[]> {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component state from the store
    let parsedParams = toValue(params); // Converting reactive parameters to their current value
    const gameList = ref([]); // Reactive reference to hold the list of games
    const error = ref(null); // Reactive reference to hold any error that occurs during the fetch

    /**
     * Function to load more games by making an API request.
     */
    const loadMore = () => {
        apiService
            .requestGet(
                appComponent.config.urlVirtualplay ? // Conditional URL based on app component configuration
                    appComponent.config.urlVirtualplay + '/cms/products/games/' : 'https://gameservice.virtualsoft.tech/', 
                parsedParams) // Passing parsed parameters to the API request
            .then((response: any) => {
                gameList.value = response.data.games; // Updating the game list with the response data
            })
            .catch((err) => (error.value = err)); // Capturing any error that occurs during the request
    };

    watchEffect(() => {
        loadMore(); // Automatically calls loadMore whenever dependencies change
    });

    return { gameList, error }; // Returning the game list and error state
}

// FILE DOCUMENTED

import { ref } from 'vue'; // Importing ref for reactive state management
import { defineStore } from 'pinia'; // Importing defineStore to create a Pinia store

// Defining a new store named 'sportbook'
export const useSportBookStore = defineStore('sportbook', () => {
    const page = ref<string>('overview'); // Reactive reference for the current page
    const routerType = ref<string>('hash'); // Reactive reference for the router type
    const sportId = ref<any>(undefined); // Reactive reference for the selected sport ID
    const eventId = ref<any>(undefined); // Reactive reference for the selected event ID
    const championshipIds = ref<any>(undefined); // Reactive reference for championship IDs
    const categoryIds = ref<any>(undefined); // Reactive reference for category IDs
    const loading = ref<boolean>(true); // Reactive reference for loading state
    const betSlipMobile = ref<boolean>(true); // Reactive reference for mobile bet slip visibility
    const loadedAltenarSdk = ref<boolean>(false); // Reactive reference for Altenar SDK loading status

    // Function to set multiple values in the store
    function setValues(pg, sprt, evnt, champ, cat) {
        page.value = pg; // Set the current page
        sportId.value = sprt; // Set the selected sport ID
        eventId.value = evnt; // Set the selected event ID
        championshipIds.value = champ; // Set championship IDs
        categoryIds.value = cat; // Set category IDs
    }

    // Returning the state and actions of the store
    return {
        page,
        routerType,
        sportId,
        championshipIds,
        categoryIds,
        eventId,
        setValues,
        loading,
        betSlipMobile,
        loadedAltenarSdk,
    };
});

// FILE DOCUMENTED

import { defineStore } from 'pinia'; // Importing defineStore from Pinia for state management

// Defining a new store named 'general'
export const useGeneralStore = defineStore('general', {
    // State of the store
    state: () => ({
        isComponentActive: false, // Boolean to track component activation status
    }),
    actions: {
        // Action to update the component activation status
        setComponentActive(status) {
            this.isComponentActive = status; // Set the state based on the provided status
        },
    },
});

// FILE DOCUMENTED

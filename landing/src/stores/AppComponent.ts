import { defineStore } from 'pinia'; // Importing defineStore from Pinia for state management

// Defining a Pinia store named 'AppComponent'
export const useAppcomponentStore = defineStore('AppComponent', {
    state: () => ({
        appComponent: null, // State variable to hold the current app component
    }),
    actions: {
        // Action to set the app component
        setAppComponent(component) {
            this.appComponent = component; // Updating the state with the new component
        },
    },
});

// FILE DOCUMENTED

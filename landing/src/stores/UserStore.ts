import { defineStore } from 'pinia'; // Importing defineStore from Pinia for state management
import { ref } from 'vue'; // Importing ref from Vue for reactive references

// Defining a Pinia store named 'UserStore'
export const useUserStore = defineStore('UserStore', () => {
    const loggedIn = ref(false); // Reactive reference to track login status

    // Function to toggle the loggedIn state
    function increment() {
        loggedIn.value = !loggedIn.value; // Toggle the value of loggedIn
    }

    // Exposing the state and function for use in components
    return { loggedIn, increment };
});

// FILE DOCUMENTED

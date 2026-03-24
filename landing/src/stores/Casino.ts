import { ref } from 'vue'; // Importing ref for reactive state
import { defineStore } from 'pinia'; // Importing defineStore for state management

// Defining a Pinia store named 'Casino'
export const useCasinoStore = defineStore('Casino', () => {
    const providerSelect = ref(null); // Reactive reference for selected provider
    const categorySelect = ref(null); // Reactive reference for selected category

    // Function to set the selected provider
    function setProviderSelect(provider: any) {
        providerSelect.value = provider; // Update providerSelect with the new provider
    }

    // Function to set the selected category
    function setCategorySelect(category: any) {
        categorySelect.value = category; // Update categorySelect with the new category
    }

    // Exposing state and actions from the store
    return {
        providerSelect,
        categorySelect,
        setProviderSelect,
        setCategorySelect,
    };
});

// FILE DOCUMENTED

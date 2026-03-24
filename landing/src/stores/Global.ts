import { ref } from 'vue'; // Importing ref for reactive state
import { defineStore } from 'pinia'; // Importing defineStore to create a Pinia store

// Defining a global store with the identifier 'global'
export const useGlobalStore = defineStore('global', () => {
    const provider = ref<string>('all'); // Reactive state for provider, default is 'all'
    const category = ref<string>('all'); // Reactive state for category, default is 'all'
    const language = ref<object>({ name: 'es', flag: 'es' }); // Reactive state for language with default values
    const onMenuMain = ref<boolean>(false); // Reactive state for menu visibility, default is false

    return { provider, category, onMenuMain, language }; // Exposing state variables
});

// FILE DOCUMENTED

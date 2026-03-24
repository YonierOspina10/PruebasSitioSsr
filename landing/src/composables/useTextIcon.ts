import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store

// Function to use application icon and text configuration
export function useAppIonVhtml() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const TextIcon = appComponent.config.TextIcon; // Extracting the TextIcon configuration
    return {
        TextIcon, // Returning the TextIcon for use in components
    };
}

// FILE DOCUMENTED

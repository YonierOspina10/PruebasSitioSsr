import { computed } from 'vue'; // Importing computed from Vue for reactive properties
import { useAppcomponentStore } from '../stores/AppComponent'; // Importing the store for app component state

export function useAppComponent() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing appComponent from the store

    const background = computed(() => {
        // Creating a computed property for background
        const config = appComponent.config; // Accessing configuration from appComponent
        if (appComponent.mobile) {
            // Checking if the app is in mobile mode
            return config.background_mobile // Returning mobile background if available
                ? config.background_mobile
                : config.backgroundMobileDefault; // Fallback to default mobile background
        } else if (!appComponent.mobile) {
            // Checking if the app is in desktop mode
            return config.background_desktop // Returning desktop background if available
                ? config.background_desktop
                : config.backgroundDefault; // Fallback to default desktop background
        }
        return ''; // Default return if no conditions are met
    });

    return {
        // Returning appComponent and background for use in components
        appComponent,
        background,
    };
}

// FILE DOCUMENTED

import { computed } from 'vue'; // Importing the computed function from Vue for reactive properties
import { useAppcomponentStore } from '../stores/AppComponent'; // Importing the app component store for state management

/**
 * Custom composable to manage social network configurations.
 * @returns {Object} An object containing social network and header information.
 */
export function useAppSocialNetwork() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store

    // Computed property for social networks based on the current country
    const socialNetwork = computed(() => {
        const config = appComponent.config; // Accessing the configuration from the app component
        if (config.SOCIAL_NEWTWORKS) {
            // Checking if social networks are defined
            return config.SOCIAL_NEWTWORKS[appComponent.country]; // Returning the social networks for the current country
        }
    });

    // Computed property for social network header based on the current country
    const socialNetworkHeader = computed(() => {
        const config = appComponent.config; // Accessing the configuration from the app component
        if (config.SOCIAL_NEWTWORKS_HEADER) {
            // Checking if social network headers are defined
            return config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]; // Returning the header for the current country
        }
    });

    return {
        socialNetworkHeader, // Exposing the social network header
        socialNetwork, // Exposing the social network
    };
}

/**
 * Custom composable to manage the app header menu.
 * @returns {Object} An object containing menu items and other related configurations.
 */
export function useAppHeaderMenu() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const menu_not_login = appComponent.config.not_login.menu_; // Menu items for users not logged in
    const menu_login = []; // Placeholder for menu items for logged-in users
    const colorsDesktop = appComponent.config.theme_colors_desktop; // Desktop theme colors
    const footer = appComponent.config.MENU_FOOTER[appComponent.country]; // Footer configuration based on the current country

    // Determining the logo based on theme mode or fallback to mobile logo
    const logo =
        appComponent.config.logo_ != undefined && // Checking if logo configuration exists
        appComponent.config.theme_mode != undefined && // Checking if theme mode is defined
        appComponent.config.logo_[appComponent.config.theme_mode] != undefined // Checking if logo for the current theme mode exists
            ? appComponent.config.logo_[appComponent.config.theme_mode] // Returning the logo for the current theme mode
            : appComponent.config.menuMobile.logo.url; // Fallback to mobile logo URL

    const prueba = appComponent; // Storing the app component for potential debugging or inspection
    const logo_splash = appComponent.config.logo_splash; // Splash logo configuration

    return {
        prueba, // Exposing the app component for inspection
        logo, // Exposing the logo
        footer, // Exposing the footer configuration
        logo_splash, // Exposing the splash logo
        colorsDesktop, // Exposing desktop theme colors
        menu_not_login, // Exposing menu items for not logged in users
        menu_login, // Exposing menu items for logged in users (currently empty)
        appComponent, // Exposing the app component
    };
}

/**
 * Function to retrieve the session user information.
 * @returns {Object} An object containing the app component.
 */
export function sessionUser() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    return {
        appComponent, // Exposing the app component
    };
}


// FILE DOCUMENTED

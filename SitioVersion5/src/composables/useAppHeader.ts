import { computed } from 'vue'; // Importing computed from Vue for reactive state management
import { useAppcomponentStore } from '../stores/AppComponent'; // Importing the app component store

/**
 * Custom composition function to manage social network configurations.
 * @returns {Object} An object containing social network and header configurations.
 */
export function useAppSocialNetwork() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const socialNetwork = computed(() => {
        const config = appComponent.config; // Getting the configuration from the app component
        if (config.SOCIAL_NEWTWORKS) {
            // Checking if social networks are defined
            return config.SOCIAL_NEWTWORKS[appComponent.country]; // Returning social networks based on the country
        }
    });
    const socialNetworkHeader = computed(() => {
        const config = appComponent.config; // Getting the configuration from the app component
        if (config.SOCIAL_NEWTWORKS_HEADER) {
            // Checking if social networks header is defined
            return config.SOCIAL_NEWTWORKS_HEADER[appComponent.country]; // Returning header based on the country
        }
    });
    return {
        socialNetworkHeader, // Exposing social network header
        socialNetwork, // Exposing social network
    };
}

/**
 * Custom composition function to manage header menu configurations.
 * @returns {Object} An object containing various menu and configuration details.
 */
export function useAppHeaderMenu() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const menu_not_login = appComponent.config.not_login.menu_; // Menu configuration for not logged in users
    const menu_login = appComponent.config.login.menu_; // Menu configuration for logged in users
    const colorsDesktop = appComponent.config.theme_colors_desktop; // Desktop theme colors
    const footer = appComponent.config.MENU_FOOTER[appComponent.country]; // Footer configuration based on the country
    const logo =
        appComponent.config.logo_ != undefined && // Checking if logo configuration exists
        appComponent.config.theme_mode != undefined && // Checking if theme mode is defined
        appComponent.config.logo_[appComponent.config.theme_mode] != undefined // Checking if logo for the current theme mode exists
            ? appComponent.config.logo_[appComponent.config.theme_mode] // Returning logo for the current theme mode
            : appComponent.config.menuMobile.logo.url; // Fallback to mobile logo URL
    const userLogin = appComponent.config.MENU_USUARIO_LOGUEADO[appComponent.country]; // User login menu based on the country
    const notificationMessages = appComponent.mensajesUnread; // Unread notification messages
    const logo_splash = appComponent.config.logo_splash; // Splash logo configuration
    const config = appComponent.config; // Getting the configuration from the app component
    return {
        notificationMessages, // Exposing unread notification messages
        userLogin, // Exposing user login menu
        logo, // Exposing logo
        footer, // Exposing footer configuration
        logo_splash, // Exposing splash logo
        colorsDesktop, // Exposing desktop theme colors
        menu_login, // Exposing login menu
        menu_not_login, // Exposing not login menu
        config, // Exposing configuration
    };
}

/**
 * Custom composition function to manage user balance information.
 * @returns {Object} An object containing currency and balance details.
 */
export function userBalance() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const currency = appComponent.session.moneda; // Getting the currency from the session
    const saldo = Math.abs(parseFloat(appComponent.saldo_total)).toFixed(2); // Calculating and formatting the total balance
    return {
        currency, // Exposing currency
        saldo, // Exposing formatted balance
    };
}

/**
 * Custom composition function to retrieve session user information.
 * @returns {Object} An object containing the app component.
 */
export function sessionUser() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    return {
        appComponent, // Exposing the app component
    };
}

/**
 * Custom composition function to manage floating menu for logged-in users.
 * @returns {Object} An object containing user menu details.
 */
export function menuFloatingUserLogin() {
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
    const menuUser = appComponent.config.MENU_USER; // User menu configuration
    return {
        menuUser, // Exposing user menu
    };
}


// FILE DOCUMENTED

import { ref } from 'vue'; // Importing the ref function from Vue for reactive state management
import apiService from '@/services/ApiService'; // Importing the apiService for making API requests
import { useRouter } from 'vue-router'; // Importing useRouter for navigation

/**
 * Custom hook for handling Google Sign-In functionality.
 * @param {any} appComponent - The main application component that contains necessary properties and methods.
 * @returns {Object} - An object containing the signInWithGoogle function, disabledLogin state, and modal state.
 */
export function useGoogleSignIn(appComponent: any) {
    const disabledLogin = ref(false); // Reactive state to manage login button disabled state
    const modal = ref({}); // Reactive state to manage modal visibility and content
    const router = useRouter(); // Router instance for navigation

    /**
     * Initiates Google Sign-In process.
     * @param {any} userGoogle - The Google user object containing credential information.
     */
    const signInWithGoogle = async (userGoogle: any) => {
        const params = {
            id_token: userGoogle.credential, // Google ID token for authentication
            country: appComponent.country, // Country information from the app component
            type: 1, // Type of authentication
        };
        disabledLogin.value = true; // Disable login button during the request
        try {
            const response = await apiService.request('external_auth', params); // API request for authentication
            if (response.code === 0) {
                handleSuccessfulGoogleLogin(response); // Handle successful login
            } else {
                handleAuthError(response); // Handle authentication error
            }
        } catch (error) {
            console.error('Error en Google login:', error); // Log error to console
            modal.value = {
                showModal: 'notification', // Show notification modal
                titleModal: 'Error!', // Modal title
                messageModal: 'Ocurrió un error inesperado. Intente más tarde.', // Modal message
                buttonModal: 'Aceptar', // Modal button text
                orderModal: 'closeModal', // Modal close order
            };
        } finally {
            disabledLogin.value = false; // Re-enable login button after request completion
        }
    };

    /**
     * Handles successful Google login response.
     * @param {any} response - The response object from the authentication API.
     */
    const handleSuccessfulGoogleLogin = (response: any) => {
        appComponent.tokenUser = response.data.auth_token; // Store auth token in app component
        apiService.setAuthToken(response.data.auth_token); // Set auth token in apiService
        window.localStorage.setItem('auth_token', response.data.auth_token); // Store auth token in local storage
        const redirectUrl = response.data.redirectUrl || '/deportes'; // Determine redirect URL
        if (redirectUrl.startsWith('/')) {
            router.push(redirectUrl); // Navigate to internal route
        } else {
            window.location.href = redirectUrl; // Redirect to external URL
        }
        if (typeof appComponent.refreshBalance === 'function') {
            appComponent.refreshBalance(); // Refresh user balance if method exists
        }
        setTimeout(() => {
            appComponent.$emitter?.emit('ready:googleLogin'); // Emit event after 2 seconds
        }, 2000);
    };

    /**
     * Handles authentication error response.
     * @param {any} response - The response object from the authentication API.
     */
    const handleAuthError = (response: any) => {
        const errorMensaje = response.error_code
            ? `ERROR ${response.error_code}` // Construct error message based on error code
            : 'Ocurrió un error inesperado. Intente más tarde.'; // Default error message
        modal.value = {
            showModal: 'notification', // Show notification modal
            titleModal: 'Error!', // Modal title
            messageModal: errorMensaje, // Modal message
            buttonModal: 'Aceptar', // Modal button text
            orderModal: 'closeModal', // Modal close order
        };
    };

    return {
        signInWithGoogle, // Expose signInWithGoogle function
        disabledLogin, // Expose disabledLogin state
        modal, // Expose modal state
    };
}


// FILE DOCUMENTED

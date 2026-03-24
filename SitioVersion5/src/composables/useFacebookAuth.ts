import { ref } from 'vue'; // Importing the ref function from Vue for reactive state management
import apiService from '@/services/ApiService'; // Importing the apiService for making API requests
import { useRouter } from 'vue-router'; // Importing useRouter for navigation

/**
 * Custom hook for handling Facebook authentication.
 * @param {any} appComponent - The main application component that holds state and methods.
 * @returns {Object} - Contains methods and reactive properties for Facebook authentication.
 */
export function useFacebookAuth(appComponent: any) {
    const disabledLogin = ref(false); // Reactive state to manage login button disabled state
    const modal = ref({}); // Reactive state for modal configuration
    const router = useRouter(); // Router instance for navigation

    /**
     * Signs in the user with Facebook using the provided user data.
     * @param {any} userFacebook - The Facebook user data containing authentication response.
     */
    const signInWithFacebook = async (userFacebook: any) => {
        const params = {
            id_token: userFacebook.authResponse.accessToken, // Access token from Facebook auth response
            country: appComponent.country, // Country from the app component
            type: 2, // Type of authentication
        };
        disabledLogin.value = true; // Disable login button during the request
        try {
            const response = await apiService.request('external_auth', params); // API request for authentication
            if (response.code === 0) {
                handleSuccessfulFacebookLogin(response); // Handle successful login
            } else {
                handleAuthError(response); // Handle authentication error
            }
        } catch (error) {
            console.error('Error en Facebook login:', error); // Log error to console
            modal.value = {
                showModal: 'notification', // Modal type
                titleModal: 'Error!', // Modal title
                messageModal: 'Ocurrió un error inesperado. Intente más tarde.', // Modal message
                buttonModal: 'Aceptar', // Modal button text
                orderModal: 'closeModal', // Modal action
            };
        } finally {
            disabledLogin.value = false; // Re-enable login button after request
        }
    };

    /**
     * Handles successful Facebook login response.
     * @param {any} response - The response object from the authentication API.
     */
    const handleSuccessfulFacebookLogin = (response: any) => {
        appComponent.tokenUser = response.data.auth_token; // Store user token in app component
        apiService.setAuthToken(response.data.auth_token); // Set token in API service
        window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
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
            appComponent.$emitter?.emit('ready:facebookLogin'); // Emit event after delay
        }, 2000);
    };

    /**
     * Handles failed Facebook login attempt.
     */
    const signInWithFacebookFailed = () => {
        modal.value = {
            showModal: 'notification', // Modal type
            titleModal: 'Error!', // Modal title
            messageModal: 'La autenticación con Facebook falló. Intente nuevamente.', // Modal message
            buttonModal: 'Aceptar', // Modal button text
            orderModal: 'closeModal', // Modal action
        };
    };

    /**
     * Handles authentication errors from the API response.
     * @param {any} response - The response object containing error details.
     */
    const handleAuthError = (response: any) => {
        const errorMensaje = response.error_code
            ? `ERROR ${response.error_code}` // Error message with error code
            : 'Ocurrió un error inesperado. Intente más tarde.'; // Generic error message
        modal.value = {
            showModal: 'notification', // Modal type
            titleModal: 'Error!', // Modal title
            messageModal: errorMensaje, // Modal message
            buttonModal: 'Aceptar', // Modal button text
            orderModal: 'closeModal', // Modal action
        };
    };

    return {
        signInWithFacebook, // Method to sign in with Facebook
        signInWithFacebookFailed, // Method to handle failed sign in
        disabledLogin, // Reactive state for login button
        modal, // Reactive state for modal configuration
    };
}


// FILE DOCUMENTED

import { ref } from 'vue';

/**
 * Custom composition function to manage password visibility toggle.
 * @returns {Object} An object containing the password visibility state and the toggle function.
 */
export function usePasswordToggle() {
    // Reactive reference to track the visibility state of the password
    const isPasswordVisible = ref(false);

    /**
     * Toggles the visibility of the password.
     * Updates the isPasswordVisible reference to its opposite value.
     */
    const togglePasswordVisibility = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
    };

    // Exposing the state and the toggle function for external use
    return {
        isPasswordVisible,
        togglePasswordVisibility,
    };
}


// FILE DOCUMENTED

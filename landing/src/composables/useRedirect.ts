import router from '../router'; // Importing the router for navigation
import { ref } from 'vue'; // Importing ref for reactive references

// Function to handle redirection based on a reactive boolean
export function useRedirect(isRedirect: ref<boolean>) {
    // Redirect function that takes an optional URL
    const redirect = (url?: string) => {
        if (!isRedirect.value) return; // Exit if redirection is not allowed
        if (url && url.trim() !== '') {
            // Check if URL is provided and not empty
            const isExternal = url.includes('http') || /^[\w-]+\.[a-z]{2,}/i.test(url); // Determine if the URL is external
            if (isExternal) {
                // Handle external URLs
                const completeUrl = url.includes('http') ? url : `http://${url}`; // Ensure URL has http
                window.open(completeUrl, '_blank'); // Open external URL in a new tab
            } else {
                // Handle internal URLs
                const internalUrl = url.startsWith('/') ? url : `/${url}`; // Format internal URL
                router.push(internalUrl); // Navigate to internal URL
            }
        }
    };
    return {
        redirect, // Return the redirect function
    };
}

// FILE DOCUMENTED

import router from '@/router'; // Importing the router instance for navigation
import { ref } from 'vue'; // Importing the ref function from Vue for reactive references

/**
 * Custom hook to handle redirection based on a reactive boolean value.
 *
 * @param {ref<boolean>} isRedirect - A reactive reference indicating whether redirection is allowed.
 * @returns {Object} - An object containing the redirect function.
 */
export function useRedirect(isRedirect: ref<boolean>) {
	/**
	 * Redirects to a specified URL if redirection is allowed.
	 *
	 * @param {string} [url] - The URL to redirect to. If not provided, no action is taken.
	 */
	const redirect = (url?: string) => {
		if (!isRedirect.value) return; // Exit if redirection is not allowed
		if (url && url.trim() !== '') {
			// Proceed only if a valid URL is provided
			// Determine if the URL is external based on its format
			const isExternal =
				url.includes('http') || /^[\w-]+\.[a-z]{2,}/i.test(url);
			if (isExternal) {
				// Construct the complete URL if it does not already include 'http'
				const completeUrl = url.includes('http')
					? url
					: `http://${url}`;
				window.open(completeUrl, '_blank'); // Open external URL in a new tab
			} else {
				// Ensure the internal URL starts with a '/'
				const internalUrl = url.startsWith('/') ? url : `/${url}`;
				router.push(internalUrl); // Navigate to the internal URL
			}
		}
	};
	return {
		redirect, // Return the redirect function for external use
	};
}

// FILE DOCUMENTED

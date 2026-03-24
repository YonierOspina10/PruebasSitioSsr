import { reactive } from 'vue';

/**
 * Reactive object to hold social media information.
 * Each entry contains the name, icon, and URL of a social media platform.
 *
 * @typedef {Object} SocialMedia
 * @property {string} SOCIAL_NAME - The name of the social media platform.
 * @property {string} SOCIAL_ICON - The icon associated with the social media platform.
 * @property {string} SOCIAL_URL - The URL link to the social media platform.
 */

export const headerSocial = reactive<{ [key: string]: any }>([
	{ SOCIAL_NAME: '', SOCIAL_ICON: '', SOCIAL_URL: '' }, // Placeholder for first social media entry
	{ SOCIAL_NAME: '', SOCIAL_ICON: '', SOCIAL_URL: '' }, // Placeholder for second social media entry
	{ SOCIAL_NAME: '', SOCIAL_ICON: '', SOCIAL_URL: '' }, // Placeholder for third social media entry
	{ SOCIAL_NAME: '', SOCIAL_ICON: '', SOCIAL_URL: '' }, // Placeholder for fourth social media entry
]);

// FILE DOCUMENTED

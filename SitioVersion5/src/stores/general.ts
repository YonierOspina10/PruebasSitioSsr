import { defineStore } from 'pinia';

/**
 * Creates a Pinia store named 'general'.
 * This store manages the state related to component activation.
 */
export const useGeneralStore = defineStore('general', {
	/**
	 * The state of the store.
	 * @returns {Object} The initial state of the store.
	 */
	state: () => ({
		/**
		 * Indicates whether the component is active.
		 * @type {boolean}
		 */
		isComponentActive: false,
	}),
	actions: {
		/**
		 * Sets the active status of the component.
		 * @param {boolean} status - The new active status of the component.
		 */
		setComponentActive(status) {
			this.isComponentActive = status; // Updates the state with the new status
		},
	},
});

// FILE DOCUMENTED

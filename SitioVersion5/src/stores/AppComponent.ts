import { defineStore } from 'pinia';

/**
 * Creates a Pinia store for managing application components.
 * @returns {Object} The store containing state and actions.
 */
export const useAppcomponentStore = defineStore('AppComponent', {
	/**
	 * The state of the store, containing the current application component.
	 * @type {Object|null}
	 */
	state: () => ({
		appComponent: null,
	}),
	actions: {
		/**
		 * Sets the current application component in the store.
		 * @param {Object} component - The component to be set as the current application component.
		 */
		setAppComponent(component) {
			this.appComponent = component;
		},
	},
});

// FILE DOCUMENTED

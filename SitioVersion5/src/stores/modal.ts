import { defineStore } from 'pinia';

/**
 * Modal store definition using Pinia for state management.
 * This store manages the state and actions related to a modal dialog.
 */
export const useModalStore = defineStore('modal', {
	/**
	 * State of the modal.
	 * @returns {Object} The state object containing modal properties.
	 */
	state: () => ({
		open: false, // Indicates if the modal is currently open
		widthModal: 'auto', // Width of the modal
		heightModal: 'auto', // Height of the modal
		title: '', // Title of the modal
		message: '', // Message content of the modal
		/**
		 * Default action to be executed when the modal's action button is clicked.
		 * @function
		 */
		action: () => {
			console.log('Action'); // Logs 'Action' to the console
		},
		/**
		 * Default action to be executed when the modal's cancel button is clicked.
		 * @function
		 */
		cancel: () => {
			console.log('Cancel'); // Logs 'Cancel' to the console
		},
		actionText: 'Aceptar', // Text for the action button
		cancelText: 'none', // Text for the cancel button
		image: '', // Image URL to be displayed in the modal
		widthImage: 'auto', // Width of the image
		heightImage: 'auto', // Height of the image
		lineDecoration: false, // Indicates if line decoration is applied
		loading: false, // Indicates if the modal is in a loading state
	}),
	getters: {},
	actions: {
		/**
		 * Resets the modal state to its initial values.
		 */
		reset() {
			this.open = false; // Close the modal
			this.title = ''; // Reset title
			this.message = ''; // Reset message
			this.action = () => {
				console.log('Action'); // Reset default action
			};
			this.cancel = () => {
				console.log('Cancel'); // Reset default cancel action
			};
			this.actionText = 'Aceptar'; // Reset action button text
			this.cancelText = 'none'; // Reset cancel button text
			this.image = ''; // Reset image URL
			this.widthImage = 'auto'; // Reset image width
			this.heightImage = 'auto'; // Reset image height
			this.widthModal = 'auto'; // Reset modal width
			this.heightModal = 'auto'; // Reset modal height
			this.lineDecoration = false; // Reset line decoration
			this.loading = false; // Reset loading state
		},
	},
});

// FILE DOCUMENTED

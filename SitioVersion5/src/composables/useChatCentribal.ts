import { ref } from 'vue';

/**
 * Custom composable function to manage the visibility of the Centribal chat.
 * @returns {Object} An object containing the chat visibility state and the function to toggle chat visibility.
 */
export function useCentribalChat() {
	// Reactive reference to track the visibility of the chat
	const showChat = ref(false);

	/**
	 * Toggles the visibility of the chat iframe.
	 * If the chat is currently hidden, it will be shown; otherwise, it will be hidden.
	 */
	const onOpenChat = () => {
		const refId = 'cen_ifr_static'; // Identifier for the chat iframe
		const chatLayout = document.getElementById('centribal_iframe_layout'); // Get the chat layout element

		if (!chatLayout) return; // Exit if the chat layout element is not found

		if (!showChat.value) {
			// Check if the chat is currently hidden
			chatLayout.classList.remove('centribal_iframe_hidden'); // Remove hidden class
			chatLayout.classList.add('centribal_iframe_open'); // Add open class
			showChat.value = true; // Update the visibility state to true
			postMessage('show_chat', '', refId); // Send a message to show the chat
		} else {
			// If the chat is currently visible
			chatLayout.classList.remove('centribal_iframe_open'); // Remove open class
			chatLayout.classList.add('centribal_iframe_hidden'); // Add hidden class
			showChat.value = false; // Update the visibility state to false
			postMessage('hide_chat', '', refId); // Send a message to hide the chat
		}
	};

	// Return the reactive state and the toggle function
	return {
		showChat,
		onOpenChat,
	};
}

// FILE DOCUMENTED

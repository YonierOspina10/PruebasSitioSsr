<script setup lang="ts">
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store for state management
import { useCentribalChat } from '@/composables/useChatCentribal'; // Importing chat composable for chat functionalities
import { onMounted, onUnmounted } from 'vue'; // Importing lifecycle hooks from Vue

const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
const { showChat, onOpenChat } = useCentribalChat(); // Destructuring showChat state and onOpenChat method from chat composable

// Lifecycle hook that runs when the component is mounted
onMounted(() => {
	window.addEventListener('message', handleChatClose); // Adding event listener for 'message' events
});

// Lifecycle hook that runs when the component is unmounted
onUnmounted(() => {
	window.removeEventListener('message', handleChatClose); // Removing event listener for 'message' events
});

// Function to handle chat close event based on message received
const handleChatClose = (event: MessageEvent) => {
	if (event.data.status === 'hide') {
		// Checking if the message status is 'hide'
		const chatLayout = document.getElementById('centribal_iframe_layout'); // Getting the chat layout element
		chatLayout?.classList.remove('centribal_iframe_open'); // Removing the open class
		chatLayout?.classList.add('centribal_iframe_hidden'); // Adding the hidden class
		showChat.value = false; // Updating the showChat state to false
	}
};
</script>

<template>
	<!-- Main container for the chat component -->
	<div id="centribal_chat" class="fixed bottom-3 left-4 z-[200]">
		<!-- Layout for the chat iframe, initially hidden -->
		<div id="centribal_iframe_layout" class="centribal_iframe_hidden"></div>
		<!-- Button to open the chat -->
		<button
			@click="
				onOpenChat(); // Triggering the chat open function
				appComponent.gAnalytics('interaction_chat'); // Logging the interaction for analytics
			"
			class="hidden sm:flex justify-center items-center bg-primary border-2 border-base-100 shadow-inner shadow-black/50 rounded-full w-20 h-20 hover:scale-105"
		>
			<!-- Chat icon displayed when chat is not shown -->
			<img
				v-if="!showChat"
				alt="centribalChatIcon"
				:src="appComponent.config.zendesk[appComponent.country].img"
				class="w-14 aspect-square object-contain rounded-full"
			/>
			<!-- SVG icon displayed when chat is shown -->
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				width="35"
				height="35"
				viewBox="0 0 24 24"
			>
				<path
					fill="#242637"
					d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
				/>
			</svg>
		</button>
	</div>
</template>

<style scoped>
/* Scoped styles for the chat component can be added here */
</style>

<!-- FILE DOCUMENTED -->

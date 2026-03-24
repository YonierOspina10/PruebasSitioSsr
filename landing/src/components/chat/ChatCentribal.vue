<script setup lang="ts">
import { useAppcomponentStore } from '../../stores/AppComponent'; // Importing the app component store for state management
import { useCentribalChat } from '../../composables/useChatCentribal'; // Importing chat composable for chat functionalities
import { onMounted, onUnmounted } from 'vue'; // Importing lifecycle hooks from Vue

const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
const { showChat, onOpenChat } = useCentribalChat(); // Destructuring chat state and open function from the chat composable

// Lifecycle hook to add event listener when component is mounted
onMounted(() => {
    window.addEventListener('message', handleChatClose); // Listening for messages to handle chat close
});

// Lifecycle hook to remove event listener when component is unmounted
onUnmounted(() => {
    window.removeEventListener('message', handleChatClose); // Cleaning up event listener
});

// Function to handle chat close event based on message received
const handleChatClose = (event: MessageEvent) => {
    if (event.data.status === 'hide') { // Check if the message indicates to hide the chat
        const chatLayout = document.getElementById('centribal_iframe_layout'); // Get the chat layout element
        chatLayout?.classList.remove('centribal_iframe_open'); // Remove class to close chat layout
        showChat.value = false; // Update showChat state to false
    }
};
</script>

<template>
    <!-- Main container for the chat component -->
    <div
        id="centribal_chat"
        class="fixed bottom-3 left-4 z-[200]"
    >
        <!-- Click event to open the chat -->
        <button
            @click="onOpenChat()"
            class="hidden sm:flex justify-center items-center bg-primary border-2 border-neutral shadow-inner shadow-black/50 rounded-full w-20 h-20 hover:scale-105"
        >
            <img
                v-if="!showChat"
                alt="centribalChatIcon"
                :src="appComponent.config.zendesk[appComponent.country].img"
                class="w-14 aspect-square object-contain rounded-full"
            />
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

import { ref } from 'vue'; // Importing the 'ref' function from Vue for reactive state management
import { useAppcomponentStore } from '../stores/AppComponent'; // Importing the app component store for accessing application state

/**
 * Custom hook to manage the Centribot chat functionality.
 * @returns {Object} An object containing the reactive showChat state and the onOpenChat function.
 */
export function useCentribalChat() {
    const showChat = ref(false); // Reactive reference to control the visibility of the chat
    const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store

    /**
     * Function to handle the opening of the chat.
     * It sets up an event listener for messages and manages the chat iframe.
     */
    const onOpenChat = () => {
        // Adding an event listener for messages from the chat
        window.addEventListener('message', function (e) {
            // Check if the message indicates to hide the chat
            if (e.data.status === 'hide') {
                // Remove the 'centribal_open' class and add 'centribal_hidden' class to hide the chat
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_open');
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_hidden');
            }
        });

        const chat: any = document.getElementById('centribal_iframe_layout'); // Getting the chat iframe layout element
        if (chat) {
            let ref_id: any = 'cen_ifr_static'; // Reference ID for the iframe
            // Adding classes to show the chat
            document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open');
            document.getElementById('centribal_iframe_layout')?.classList.add('left-0');
            document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden');
            postMessage('show_chat', '', ref_id); // Sending a message to show the chat
        } else {
            // If the chat layout does not exist, create it
            const scriptInit = document.createElement('script'); // Creating a script element for the Centribot SDK
            scriptInit.setAttribute('src', 'https://cwcentribot.centribal.com/sdk_v1.js'); // Setting the source of the script
            document.querySelector('body')?.appendChild(scriptInit); // Appending the script to the body

            const div = document.createElement('div'); // Creating a div for the chat layout
            div.setAttribute('id', 'centribal_iframe_layout'); // Setting the ID for the div
            document.querySelector('body')?.appendChild(div); // Appending the div to the body

            const script = document.createElement('script'); // Creating a script element for the chat snippet
            script.setAttribute('id', 'cen_snippet_static'); // Setting the ID for the script
            script.setAttribute('control_iframe', ''); // Setting an attribute for controlling the iframe
            script.setAttribute('src', appComponent.config.zendesk[appComponent.country].key); // Setting the source from the app component config
            script.setAttribute('type', 'text/javascript'); // Setting the type of the script
            document.querySelector('body')?.appendChild(script); // Appending the script to the body

            let ref_id: any = 'cen_ifr_static'; // Reference ID for the iframe
            const iframe = document.createElement('iframe'); // Creating the iframe element
            iframe.setAttribute('id', ref_id); // Setting the ID for the iframe
            iframe.src = appComponent.config.zendesk[appComponent.country].key; // Setting the source of the iframe
            document.getElementById('centribal_iframe_layout')?.appendChild(iframe); // Appending the iframe to the chat layout

            // Setting up an onload event for the iframe
            iframe.onload = function () {
                setTimeout(() => {
                    // Adding classes to show the chat after a delay
                    document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open');
                    document.getElementById('centribal_iframe_layout')?.classList.add('left-0');
                }, 1000); // Delay of 1000ms before showing the chat
                postMessage('show_chat', '', ref_id); // Sending a message to show the chat
            };
        }
    };

    return {
        showChat, // Exposing the showChat reactive state
        onOpenChat, // Exposing the onOpenChat function
    };
}


// FILE DOCUMENTED

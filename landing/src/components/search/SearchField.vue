<script setup lang="ts">
import IconLupa from '../../components/icons/Menu/IconLupa.vue'; // Importing the search icon component
import { onBeforeUnmount, onMounted, ref } from 'vue'; // Importing Vue composition API functions
import { useAppcomponentStore } from '../../stores/AppComponent.ts'; // Importing the application component store
import apiService from '@/services/ApiService'; // Importing the API service for making requests

const appComponent = useAppcomponentStore().appComponent; // Accessing the app component from the store
const searchQuery = ref(''); // Reactive reference for the search query input
const inputWidth = ref('0px'); // Reactive reference for the input width
const inputHeight = ref('0px'); // Reactive reference for the input height
const inputWidthCard = ref('0px'); // Reactive reference for the card input width
const inputHeightCard = ref('0px'); // Reactive reference for the card input height
const inputVisibility = ref('hidden'); // Reactive reference for input visibility
const inputVisibilityCard = ref('hidden'); // Reactive reference for card input visibility
const showHeight = ref(false); // Reactive reference to control height visibility
const searchContainer = ref<HTMLElement | null>(null); // Reference for the search container element
const searchInput = ref<HTMLElement | null>(null); // Reference for the search input element
const urlVirtualplay = ref<any>(''); // Reactive reference for the virtual play URL
const onSearch = ref<boolean>(false); // Reactive reference to track search state
let debouncedSearch: any = null; // Variable to hold the debounced search function

// Function to toggle the visibility and dimensions of the search input
const toggleInput = () => {
    if (inputWidth.value === '0px') {
        inputWidth.value = '340px'; // Set input width to 340px
        inputVisibility.value = 'visible'; // Make input visible
        setTimeout(() => {
            showHeight.value = true; // Show height after a delay
            inputHeight.value = '530px'; // Set input height to 530px
        }, 200);
    } else {
        inputWidth.value = '0px'; // Reset input width
        inputVisibility.value = 'hidden'; // Hide input
        showHeight.value = false; // Hide height
        inputHeight.value = '0px'; // Reset input height
        searchQuery.value = ''; // Clear search query
        inputWidthCard.value = '0px'; // Reset card input width
        inputHeightCard.value = '0px'; // Reset card input height
        inputVisibilityCard.value = 'hidden'; // Hide card input
        showHeight.value = false; // Hide height
    }
};

// Function to handle search input when the user presses enter
const searchEnter = (event: Event) => {
    if (searchQuery.value.length >= 3) { // Check if the search query is at least 3 characters
        const optionsGames = {
            action: 'getGames2', // Action type for the API request
            partner_id: appComponent.partnerG, // Partner ID from the app component
            search: searchQuery.value, // Search query
            country: appComponent.country, // Country from the app component
            typelobby: -1, // Lobby type
            isMobile: appComponent.mobile === '1' ? true : false, // Check if the device is mobile
        };
        apiService.requestGet(urlVirtualplay.value + '/cms/products/games/', optionsGames).then((response: any) => {
            appComponent.gamesListSearch = response.data.games; // Update the games list with search results
            appComponent.total_count = response.data.total_count; // Update total count of games
            appComponent.offset = 0; // Reset offset
            appComponent.limit = appComponent.limit; // Maintain limit
            if (appComponent.gamesListSearch.length > 0) { // If there are search results
                if (inputWidthCard.value === '0px') {
                    inputWidthCard.value = '340px'; // Set card input width to 340px
                    inputVisibilityCard.value = 'visible'; // Make card input visible
                    setTimeout(() => {
                        showHeight.value = true; // Show height after a delay
                        inputHeightCard.value = '530px'; // Set card input height to 530px
                    }, 600);
                } else {
                    inputWidthCard.value = '0px'; // Reset card input width
                    inputHeightCard.value = 'hidden'; // Hide card input height
                    showHeight.value = false; // Hide height
                    inputHeightCard.value = '0px'; // Reset card input height
                }
            }
            // Check for Playtech jackpot configuration
            if (appComponent.config.casino?.playtechJackpot?.[appComponent.country]) {
                const existingScript = document.querySelector(
                    'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]',
                );
                if (existingScript) {
                    existingScript.remove(); // Remove existing jackpot script if present
                }
                const script = document.createElement('script'); // Create a new script element
                script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js'; // Set the script source
                script.onload = () => { // On script load
                    appComponent.gamesList.forEach((game) => {
                        if (game.provider === 'PLAYTECH' && game.jackpot === 1) { // Check for Playtech games with jackpot
                            const objParams = appComponent.config.casino.playtechJackpot[appComponent.country]; // Get jackpot parameters
                            objParams.game = game.front_game_id; // Set game ID
                            const ticker = new Ticker(objParams); // Create a new ticker instance
                            ticker.attachToTextBox('playtech-' + game.id); // Attach ticker to the game element
                            ticker.SetCurrencyPos('1'); // Set currency position
                            ticker.tick(); // Start the ticker
                        }
                    });
                };
                document.head.appendChild(script); // Append the script to the document head
            }
        });
    } else {
        appComponent.gamesListSearch = []; // Clear search results if query is too short
    }
};

// Debounce function to limit the rate of function execution
const debounce = (func: Function, wait: number) => {
    let timeout: any; // Variable to hold the timeout
    return function (...args: any[]) {
        clearTimeout(timeout); // Clear the previous timeout
        timeout = setTimeout(() => func.apply(this, args), wait); // Set a new timeout
    };
};

// Function to handle clicks outside the search container
const handleClickOutside = (event: MouseEvent) => {
    if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
        inputWidth.value = '0px'; // Reset input width
        inputVisibility.value = 'hidden'; // Hide input
        showHeight.value = false; // Hide height
        inputHeight.value = '0px'; // Reset input height
        inputWidthCard.value = '0px'; // Reset card input width
        inputHeightCard.value = '0px'; // Reset card input height
        inputVisibilityCard.value = 'hidden'; // Hide card input
    }
};

// Lifecycle hook to run code on component mount
onMounted(() => {
    urlVirtualplay.value = appComponent.config.urlVirtualplay; // Set the virtual play URL
    debouncedSearch = debounce(searchEnter, appComponent.config['timeDebouncedSearch'] ?? 500); // Initialize debounced search
    document.addEventListener('click', handleClickOutside); // Add event listener for clicks outside
});

// Lifecycle hook to run code before component unmount
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside); // Remove event listener
});

// Function to handle opening a game when clicked
const onOpenGame = (game, $event) => {
    if (appComponent.session.logueado) { // Check if the user is logged in
        appComponent.gamesListSearch.idSelect = game.id; // Set selected game ID
        appComponent.openLink = true; // Open game link
        appComponent.openGame(game); // Open the game
        appComponent.showGame = true; // Show game
        onSearch.value = false; // Reset search state
        $event.stopPropagation(); // Stop event propagation
    } else {
        appComponent.showModalLogin = true; // Show login modal if not logged in
    }
};
</script>
<template>
    <!-- Main container for the search functionality -->
    <div
        v-bind="$attrs"
        class="flex items-center justify-end gap-[0.50rem]"
        ref="searchContainer"
    >
        <!-- Button to toggle the search input -->
        <button data-analytics-label="header:search" :data-analytics-context="`component:SearchField|layout:layout-${appComponent.config.layout}`" @click="toggleInput">
            <!-- Search icon for non-mobile devices -->
            <div class="flex justify-center items-center cursor-pointer hover:scale-[1.1] relative">
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1741900426.png"
                    v-if="appComponent.mobile == '' || appComponent.mobile == '0'"
                    class="w-[18px] h-[18px] flex justify-center items-center relative"
                />
            </div>
            <!-- Search icon for mobile devices -->
            <span
                v-if="appComponent.mobile != '' && appComponent.mobile != '0'"
                class="rounded-full flex justify-center items-center hover:scale-105 bg-primary text-neutral-content"
            >
              <div class="flex justify-center items-center cursor-pointer hover:scale-[1.1] relative w-[32px] h-[32px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-[20px] h-[20px] flex justify-center items-center relative"
                    >
                    <path
                        d="M15 9.16666C15 5.945 12.3883 3.33332 9.16663 3.33332C5.94496 3.33332 3.33329 5.945 3.33329 9.16666C3.33329 12.3883 5.94496 15 9.16663 15C12.3883 15 15 12.3883 15 9.16666ZM16.6666 9.16666C16.6666 10.9375 16.0515 12.5638 15.0252 13.8468L18.0892 16.9108L18.1461 16.9743C18.4131 17.3016 18.3942 17.7841 18.0892 18.0892C17.7841 18.3943 17.3016 18.4131 16.9742 18.1461L16.9108 18.0892L13.8468 15.0252C12.5638 16.0515 10.9374 16.6667 9.16663 16.6667C5.02449 16.6667 1.66663 13.3088 1.66663 9.16666C1.66663 5.02452 5.02449 1.66666 9.16663 1.66666C13.3088 1.66666 16.6666 5.02452 16.6666 9.16666Z"
                    />
                </svg>
                </div>
            </span>
        </button>
        <!-- Search input container -->
        <div
            class="rounded-full absolute"
            :style="{ width: inputWidth, visibility: inputVisibility }"
            :class="
                appComponent.mobile == '' || appComponent.mobile == '0'
                    ? 'right-[30px] h-[30px]'
                    : 'h-[34px] left-[35px] w-[22.9rem]'
            "
        >
            <!-- Search input field -->
            <input
                v-model="searchQuery"
                @input="debouncedSearch"
                ref="searchInput"
                id="search-input"
                placeholder="Buscar..."
                type="text"
                :style="{ width: inputWidth }"
                class="rounded-full border-[2px] border-primary-content text-gray-600 absolute top-0 transform"
                :class="
                    appComponent.mobile == ''
                        ? 'right-[2px] h-[30px]'
                        : 'h-[34px] left-[5px] w-[22rem] bg-neutral-focus'
                "
            />
        </div>
    </div>
    <!-- Container for displaying search results -->
    <div
        v-if="appComponent.gamesListSearch.length > 0"
        id="search-input-two"
        class="w-full bg-neutral border-[2px] border-primary-content absolute z-[60] top-[42px] right-[60px] transition-all duration-300 ease-out p-2"
        :style="{
            width: inputWidthCard,
            height: 'auto',
            maxHeight: '430px',
            visibility: inputVisibilityCard,
            display: 'flex',
            flexDirection: 'column',
        }"
    >
        <div class="bg-base-200/80 rounded-lg shadow-lg flex-1 overflow-auto p-1">
            <!-- Loop through the search results and display each game -->
            <div
                v-for="game in appComponent.gamesListSearch"
                :key="game.id"
                class="bg-base-200 relative rounded-xl h-36 w-full flex justify-center items-center gap-1 p-1 mb-4"
            >
                <img
                    :src="game.icon_3"
                    alt=""
                    class="h-32 rounded-xl"
                />
                <div class="flex flex-col justify-center items-center gap-4 w-full h-full p-2 break-all">
                    <p class="text-neutral text-lg text-center font-bold">{{ game.name }}</p>
                    <!-- Button to play the game -->
                    <button
                        class="bg-secondary text-neutral text-sm w-40 rounded-full font-bold p-2 uppercase hover:scale-105"
                        @click="onOpenGame(game, $event)"
                    >
                        Play Now
                    </button>
                </div>
            </div>
            <!-- Button to close the search results -->
            <button
                @click="toggleInput"
                :style="{ visibility: inputVisibilityCard, color: '#FFFFFF' }"
                class="bg-gray-600 hover:bg-gray-400 text-neutral p-2 rounded-md mt-4 w-full"
            >
                X
            </button>
        </div>
    </div>
</template>
<style scoped>
/* Styles for the search input field */
#search-input {
    padding: 10px; /* Padding for the input */
    font-size: 16px; /* Font size for the input */
    border: 2px solid #ccc; /* Border style for the input */
    border-radius: 25px; /* Rounded corners for the input */
    outline: none; /* Remove outline */
    transition:
        500ms width ease-in-out, /* Transition for width */
        500ms padding ease-in-out, /* Transition for padding */
        500ms border-radius ease-in-out; /* Transition for border radius */
}

/* Styles for the search results container */
#search-input-two {
    width: 310px !important; /* Fixed width for the results container */
    padding: 10px; /* Padding for the container */
    font-size: 16px; /* Font size for the container */
    border: 2px solid #ccc; /* Border style for the container */
    border-radius: 10px; /* Rounded corners for the container */
    outline: none; /* Remove outline */
    transition:
        width 500ms ease-in-out, /* Transition for width */
        height 900ms ease-in-out; /* Transition for height */
}

/* Custom scrollbar styles */
.scroll__custom::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* Shadow for the scrollbar track */
    border-radius: 10px; /* Rounded corners for the track */
    background-color: #f5f5f5; /* Background color for the track */
}
.scroll__custom::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
    background-color: #f5f5f5; /* Background color for the scrollbar */
}
.scroll__custom::-webkit-scrollbar-thumb {
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* Shadow for the thumb */
    background-color: #555; /* Background color for the thumb */
}
</style>

<!-- FILE DOCUMENTED -->

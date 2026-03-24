import { ref, computed } from 'vue'; // Importing reactive reference and computed properties from Vue
import { defineStore } from 'pinia'; // Importing the defineStore function from Pinia for state management

/**
 * Counter store definition using Pinia.
 * This store manages a simple counter state.
 */
export const useCounterStore = defineStore('counter', () => {
	const count = ref(0); // Reactive reference for the counter value, initialized to 0
	const doubleCount = computed(() => count.value * 2); // Computed property that returns double the count value

	/**
	 * Increments the counter value by 1.
	 */
	function increment() {
		count.value++; // Increases the count value by 1
	}

	// Exposing state and actions for use in components
	return { count, doubleCount, increment };
});

// FILE DOCUMENTED

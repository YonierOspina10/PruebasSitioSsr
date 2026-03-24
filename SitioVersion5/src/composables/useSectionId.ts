import { ref } from 'vue'; // Importing the ref function from Vue for reactive state management
import { useRoute } from 'vue-router'; // Importing useRoute to access route parameters

/**
 * Custom Composition API function to manage section ID from the route.
 * @returns {Object} An object containing the reactive sectionId reference.
 */
export function useSectionId() {
    const route = useRoute(); // Accessing the current route object
    const sectionId = ref(route.params.sectionId); // Creating a reactive reference for sectionId from route parameters
    return { sectionId }; // Returning the sectionId reference
}


// FILE DOCUMENTED

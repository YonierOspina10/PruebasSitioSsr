import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router functions
import HomeView from '../views/HomeView.vue'; // Import HomeView component
import PathNotFound from '../views/PathNotFound.vue'; // Import PathNotFound component

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Set up history mode with base URL
    routes: [
        // Define application routes
        {
            path: '', // Root path
            name: 'home', // Route name
            component: HomeView, // Component to render
        },
        {
            path: '/home', // Path for home view
            name: 'home2', // Alternate route name
            component: HomeView, // Component to render
        },
        {
            path: '/:pathMatch(.*)*', // Catch-all route for unmatched paths
            name: 'pathNotFound', // Route name for not found paths
            component: PathNotFound, // Component to render for not found
        },
    ],
});

export default router; // Export the router instance

// FILE DOCUMENTED

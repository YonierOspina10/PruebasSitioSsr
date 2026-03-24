import { onMounted, onUnmounted } from 'vue';

/**
 * Custom composition function to handle event emission and lifecycle hooks.
 *
 * @param {Object} emitter - The event emitter instance used to listen and manage events.
 */
export function useEmitter(emitter) {
    // Lifecycle hook that runs when the component is mounted
    onMounted(() => {
        // Listen for the 'close:modalPromotion' event and update the browser history
        emitter.on('close:modalPromotion', () => {
            window.history.pushState('', '', '/promociones-bonos/');
        });
    });

    // Lifecycle hook that runs when the component is unmounted
    onUnmounted(() => {
        // Remove all listeners associated with the 'accept:modal' event
        emitter.all.delete('accept:modal');
    });
}


// FILE DOCUMENTED

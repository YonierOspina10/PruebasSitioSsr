import { ref, onMounted, onUnmounted } from 'vue';

// Custom hook to handle touch and mouse events for slider movement
export function useTouchEvent(
    moveSlider: (direction: 'left' | 'right') => void, // Function to move the slider
) {
    const startX = ref<number | null>(null); // Initial touch/mouse position
    const isDragging = ref(false); // Indicates if dragging is in progress
    const isRedirect = ref(true); // Indicates if the movement is a redirect

    // Handles the start of a touch/mouse event
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX; // Get X position
        startX.value = clientX; // Set starting X position
        isDragging.value = true; // Set dragging state to true
        isRedirect.value = true; // Allow redirect
    };

    // Handles movement during a touch/mouse event
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging.value || startX.value === null) return; // Exit if not dragging
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX; // Get current X position
        const deltaX = clientX - startX.value; // Calculate movement distance
        if (Math.abs(deltaX) > 5) {
            isRedirect.value = false; // Movement is significant enough to not be a redirect
        }
        if (Math.abs(deltaX) > 50) {
            moveSlider(deltaX > 0 ? 'left' : 'right'); // Move slider based on direction
            isDragging.value = false; // End dragging
        }
    };

    // Handles the end of a touch/mouse event
    const handleMouseUp = () => {
        startX.value = null; // Reset starting position
        isDragging.value = false; // End dragging
    };

    // Adds event listeners for mouse and touch events
    const addEventListeners = () => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);
    };

    // Removes event listeners for mouse and touch events
    const removeEventListeners = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
    };

    // Lifecycle hook to add event listeners when component is mounted
    onMounted(() => {
        addEventListeners();
    });

    // Lifecycle hook to remove event listeners when component is unmounted
    onUnmounted(() => {
        removeEventListeners();
    });

    return {
        handleMouseDown, // Expose mouse down handler
        isDragging, // Expose dragging state
        isRedirect, // Expose redirect state
    };
}

// FILE DOCUMENTED

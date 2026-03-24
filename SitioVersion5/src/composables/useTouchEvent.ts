import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Custom hook to handle touch and mouse events for slider movement.
 *
 * @param moveSlider - Function to move the slider in a specified direction.
 *                     Accepts 'left' or 'right' as arguments.
 */
export function useTouchEvent(
	moveSlider: (direction: 'left' | 'right') => void
) {
	// Reference to store the initial X position of the touch/mouse event
	const startX = ref<number | null>(null);
	// Flag to indicate if the slider is currently being dragged
	const isDragging = ref(false);
	// Flag to determine if the event should be redirected
	const isRedirect = ref(true);

	/**
	 * Handles the mouse down or touch start event.
	 *
	 * @param event - The mouse or touch event.
	 */
	const handleMouseDown = (event: MouseEvent | TouchEvent) => {
		const clientX =
			'touches' in event ? event.touches[0].clientX : event.clientX;
		startX.value = clientX; // Set the starting X position
		isDragging.value = true; // Set dragging flag to true
		isRedirect.value = true; // Allow redirection initially
	};

	/**
	 * Handles the mouse move or touch move event.
	 *
	 * @param event - The mouse or touch event.
	 */
	const handleMouseMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging.value || startX.value === null) return; // Exit if not dragging or startX is null
		const clientX =
			'touches' in event ? event.touches[0].clientX : event.clientX;
		const deltaX = clientX - startX.value; // Calculate the distance moved

		// Check if the movement exceeds the threshold for redirection
		if (Math.abs(deltaX) > 5) {
			isRedirect.value = false; // Disable redirection if moved enough
		}
		// Check if the movement exceeds the threshold for slider movement
		if (Math.abs(deltaX) > 50) {
			moveSlider(deltaX > 0 ? 'left' : 'right'); // Move the slider based on direction
			isDragging.value = false; // Stop dragging after moving
		}
	};

	/**
	 * Handles the mouse up or touch end event.
	 */
	const handleMouseUp = () => {
		startX.value = null; // Reset the starting X position
		isDragging.value = false; // Set dragging flag to false
	};

	/**
	 * Adds event listeners for mouse and touch events.
	 */
	const addEventListeners = () => {
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('touchend', handleMouseUp);
		document.addEventListener('touchmove', handleMouseMove);
	};

	/**
	 * Removes event listeners for mouse and touch events.
	 */
	const removeEventListeners = () => {
		document.removeEventListener('mouseup', handleMouseUp);
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('touchend', handleMouseUp);
		document.removeEventListener('touchmove', handleMouseMove);
	};

	// Lifecycle hook to add event listeners when the component is mounted
	onMounted(() => {
		addEventListeners();
	});

	// Lifecycle hook to remove event listeners when the component is unmounted
	onUnmounted(() => {
		removeEventListeners();
	});

	// Expose the handleMouseDown function and state variables
	return {
		handleMouseDown,
		isDragging,
		isRedirect,
	};
}

// FILE DOCUMENTED

import { ref, onMounted, onUnmounted } from 'vue';

// Custom composition function to track screen size
export function useScreenSize(minWidth = 1024) {
    // Reactive reference to determine if the screen is desktop size
    const isDesktop = ref<boolean>(false);
    let resizeTimeout: ReturnType<typeof setTimeout>;

    // Function to update the isDesktop value based on window width
    const updateScreenSize = () => {
        isDesktop.value = window.innerWidth >= minWidth;
    };

    // Function to handle resize events with debouncing
    const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScreenSize, 1000);
    };

    // Lifecycle hook to set initial screen size and add event listener
    onMounted(() => {
        updateScreenSize();
        window.addEventListener('resize', onResize);
    });

    // Lifecycle hook to remove event listener on component unmount
    onUnmounted(() => {
        window.removeEventListener('resize', onResize);
    });

    // Expose the isDesktop reactive reference
    return {
        isDesktop,
    };
}

// FILE DOCUMENTED

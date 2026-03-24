import { ref, onMounted } from 'vue';

/**
 * Custom hook to set up Swiper functionality.
 *
 * @param {string} keySlide - Unique identifier for the slide elements.
 * @param {Object} colors - Object containing color configurations (not used in this fragment).
 * @param {Object} loading - Reactive reference to track loading state.
 * @returns {Object} - Object containing the setupSwiper function.
 */
export function useSwiperSetup(keySlide, colors, loading) {
    /**
     * Initializes the Swiper library and sets up event listeners for navigation buttons.
     */
    const setupSwiper = () => {
        // Check if the Swiper script is already loaded
        if (document.getElementById('swiper-element-bundle') === null) {
            const cdnSwiper = document.createElement('script');
            cdnSwiper.id = 'swiper-element-bundle';
            cdnSwiper.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
            document.head.appendChild(cdnSwiper);
            // On script load, update loading state and reveal images
            cdnSwiper.onload = () => {
                console.log('Swiper loaded');
                loading.value = false; // Set loading to false
                document.querySelectorAll('.swiper-slide:not(:first-child) img').forEach((img) => {
                    img.classList.remove('hidden'); // Remove hidden class from images
                });
            };
        }

        let count = 0; // Counter for the number of attempts to find swiper elements
        const intervalSwiper = setInterval(() => {
            count++;
            try {
                // Select all swiper container elements based on the keySlide
                const swiperElements = document.querySelectorAll('.swiper-container-' + keySlide);
                // If swiper elements are found or count exceeds 10, clear the interval
                if (swiperElements.length > 0 || count > 10) {
                    clearInterval(intervalSwiper);
                    const buttonNext = document.querySelector('.slideNext-' + keySlide);
                    const buttonPrev = document.querySelector('.slidePrev-' + keySlide);
                    swiperElements.forEach((swiperEl) => {
                        // Add event listener for previous button
                        buttonPrev?.addEventListener('click', function (e) {
                            e.preventDefault(); // Prevent default button action
                            swiperEl.swiper.slidePrev(); // Navigate to previous slide
                        });
                        // Add event listener for next button
                        buttonNext?.addEventListener('click', function (e) {
                            e.preventDefault(); // Prevent default button action
                            swiperEl.swiper.slideNext(); // Navigate to next slide
                        });
                    });
                }
            } catch (e) {
                console.log(e); // Log any errors encountered
            }
        }, 1000); // Check every second for swiper elements
    };

    // Lifecycle hook that runs when the component is mounted
    onMounted(() => {
        console.log('mounted'); // Log when the component is mounted
        setupSwiper(); // Call the setupSwiper function
    });

    return {
        setupSwiper, // Expose the setupSwiper function
    };
}


// FILE DOCUMENTED

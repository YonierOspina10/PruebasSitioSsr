import { ref, onMounted } from 'vue';

/**
 * Custom hook to set up Swiper functionality.
 *
 * @param {string} keySlide - Unique identifier for the slide elements.
 * @param {Array<string>} colors - Array of colors to be used in the swiper.
 * @param {Ref<boolean>} loading - Reactive reference to indicate loading state.
 * @returns {Object} - Contains the setupSwiper function.
 */
export function useSwiperSetup(keySlide, colors, loading) {
	/**
	 * Initializes the Swiper library and sets up event listeners for navigation buttons.
	 * It loads the Swiper script if it hasn't been loaded yet.
	 */
	const setupSwiper = () => {
		setTimeout(() => {
			// Check if the Swiper script is already loaded
			if (document.getElementById('swiper-element-bundle') === null) {
				const cdnSwiper = document.createElement('script');
				cdnSwiper.id = 'swiper-element-bundle';
				cdnSwiper.src =
					'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
				document.head.appendChild(cdnSwiper);
				// Log when the Swiper script has loaded and update loading state
				cdnSwiper.onload = () => {
					console.log('Swiper loaded');
					loading.value = false;
				};
			}
			let count = 0;
			// Set an interval to check for swiper elements
			const intervalSwiper = setInterval(() => {
				count++;
				try {
					const swiperElements = document.querySelectorAll(
						'.swiper-container-' + keySlide
					);
					// If swiper elements are found or count exceeds 10, clear the interval
					if (swiperElements.length > 0 || count > 10) {
						clearInterval(intervalSwiper);
						const buttonNext = document.querySelector(
							'.slideNext-' + keySlide
						);
						const buttonPrev = document.querySelector(
							'.slidePrev-' + keySlide
						);
						// Set up event listeners for navigation buttons
						swiperElements.forEach((swiperEl) => {
							buttonPrev?.addEventListener('click', function (e) {
								e.preventDefault();
								swiperEl.swiper.slidePrev();
							});
							buttonNext?.addEventListener('click', function (e) {
								e.preventDefault();
								swiperEl.swiper.slideNext();
							});
						});
					}
				} catch (e) {
					// Log any errors encountered during the setup
					console.log(e);
				}
			}, 1000);
		}, 4000); // Delay the setup by 4 seconds
	};

	// Lifecycle hook that runs when the component is mounted
	onMounted(() => {
		console.log('mounted');
		setupSwiper();
	});

	// Return the setupSwiper function for external use
	return {
		setupSwiper,
	};
}

// FILE DOCUMENTED

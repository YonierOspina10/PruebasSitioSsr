<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    images: Array, // Array of image objects to be displayed in the carousel
    height: String, // Height of the carousel
    shadow: Boolean // Flag to determine if shadow should be applied
  },
  data() {
    let config = this.$config(); // Configuration object
    let appComponent: any = this.$appComponent; // Reference to the app component
    let slideIndex = 1; // Current index of the slide
    let imagesCarousel: any = this.images; // Carousel images
    let openLink: boolean = true; // Flag to control link opening
    let interval: any = undefined; // Interval for automatic slide transition
    return {
      openLink,
      config,
      appComponent,
      slideIndex,
      imagesCarousel,
      interval
    }
  },
  mounted() {
    // Filter images based on their start and end dates
    this.imagesCarousel = this.imagesCarousel.filter((e) => {
      if (e === "null" || e === null) {
        return false
      }
      if ((e.startDate == undefined || e.startDate == "") && (e.date == undefined || e.date == "")) {
        return true
      }
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if ((e.startDate != undefined && e.startDate != "") && (e.date != undefined && e.date != "")) {
        var startDate = new Date(e.startDate);
        var endDate = new Date(e.date);
        return currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()
      }
      if ((e.startDate != undefined || e.startDate != "") && (e.date == undefined || e.date == "")) {
        var startDate = new Date(e.startDate);
        return currentDate.getTime() >= startDate.getTime()
      }
      if ((e.startDate == undefined || e.startDate == "") && (e.date != undefined || e.date != "")) {
        var endDate = new Date(e.date);
        return currentDate.getTime() <= endDate.getTime()
      }
      return true
    });
    this.$nextTick(() => {
      let isDown = false; // Flag to track mouse/touch down state
      let startX; // Initial X position for slide movement
      let moveSlider; // Direction of slide movement
      const slider: any = document.querySelector('.container-carousel'); // Reference to the carousel container
      const end = () => {
        // Function to handle the end of slide movement
        if (isDown == true && moveSlider == 0) {
          this.moveSlide(-1) // Move to previous slide
        } else if (isDown == true && moveSlider == 1) {
          this.moveSlide(1) // Move to next slide
        }
        moveSlider = undefined; // Reset moveSlider
        isDown = false; // Reset isDown
        slider.classList.remove('active'); // Remove active class from slider
      }
      const start = (e) => {
        // Function to handle the start of slide movement
        isDown = true; // Set isDown to true
        slider.classList.add('active'); // Add active class to slider
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get initial X position
      }
      const move = (e) => {
        // Function to handle slide movement
        this.openLink = true; // Allow link opening
        if (!isDown) return; // Exit if not dragging
        this.openLink = false; // Prevent link opening during drag
        e.preventDefault(); // Prevent default behavior
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get current X position
        const dist = (x - startX); // Calculate distance moved
        if (dist > 0) {
          moveSlider = 0; // Set moveSlider to previous
        } else if (dist < 0) {
          moveSlider = 1; // Set moveSlider to next
        }
      }
      // Add event listeners for mouse and touch events
      (() => {
        slider.addEventListener('mousedown', start);
        slider.addEventListener('touchstart', start, { passive: true });
        slider.addEventListener('mousemove', move);
        slider.addEventListener('touchmove', move, { passive: true });
        slider.addEventListener('mouseleave', end);
        slider.addEventListener('mouseup', end);
        slider.addEventListener('touchend', end);
      })();
    });
    this.showSlide(this.slideIndex); // Show the initial slide
    this.interval = setInterval(() => {
      this.moveSlideInterval(1) // Automatically move to the next slide every 5 seconds
    }, 5000);
  },
  methods: {
    goToLink(link) {
      // Open the specified link if openLink is true
      if (this.openLink) {
        window.open(link, '_top');
      }
    },
    moveSlide(moveStep) {
      // Move to the next or previous slide
      clearInterval(this.interval) // Clear the interval
      this.showSlide(this.slideIndex += moveStep); // Show the updated slide
    },
    moveSlideInterval(moveStep) {
      // Move to the next slide at regular intervals
      this.showSlide(this.slideIndex += moveStep); // Show the updated slide
    },
    currentSlide(n) {
      // Show the slide corresponding to the given index
      clearInterval(this.interval) // Clear the interval
      this.showSlide(this.slideIndex = n); // Show the specified slide
    },
    showSlide(n) {
      // Display the slide corresponding to the index n
      let i;
      const slides = document.getElementsByClassName("slide"); // Get all slide elements
      const dots = document.getElementsByClassName('dot'); // Get all dot elements
      if (n > slides.length) { this.slideIndex = 1 } // Loop back to the first slide
      if (n < 1) { this.slideIndex = slides.length } // Loop to the last slide
      for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden'); // Hide all slides
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('bg-white', 'bg-opacity-100', 'active-dot'); // Reset dot styles
        dots[i].classList.add('bg-gray-800', 'bg-opacity-50', 'border-solid', 'border', 'border-white/20'); // Set inactive dot styles
      }
      if (slides[this.slideIndex - 1] != undefined) {
        slides[this.slideIndex - 1].classList.remove('hidden'); // Show the current slide
        dots[this.slideIndex - 1].classList.remove('bg-gray-800', 'bg-opacity-50', 'border-solid', 'border', 'border-white/20'); // Set active dot styles
        dots[this.slideIndex - 1].classList.add('bg-white', 'bg-opacity-100', 'active-dot'); // Highlight the active dot
      }
    }
  }
})
</script>
<template>
  <div
    :class="[{'relative after:absolute after:w-full after:h-1 after:bottom-0 after:brightness-[0.6] after:shadow-[1px_-3px_16px_13px_,_0px_-10px_50px_20px] after:shadow-primary-content': config.layout != undefined && config.layout == 4},
    {'rounded-xl': config.layout != undefined && config.layout == 5}]" 
    class="relative carousel container-carousel w-full h-full">
    <div id="item1" class="slide carousel-item w-full" v-for="(img, i) in imagesCarousel">
      <div  data-analytics-label="promo:banner:hero"
            :data-analytics-context="`component:Carousel|layout:layout-${appComponent.config.layout}`"
            :data-analytics-id="img.id"
            :data-analytics-position="i + 1"
            class="w-full" @click="goToLink(img.redirect), appComponent.gAnalytics('interaction_carrusel', img.alt)">
        <div :class="{'shadow-container' : shadow }"></div> <!-- Optional shadow container -->
        <img width="1423" height="280" :src="img.url" class="w-full h-full" :alt="img.alt" :class="{'img-shadow-container' : shadow}" /> <!-- Image element -->
      </div>
    </div> 
    <div class="absolute z-10 flex space-x-8 md:space-x-3 -translate-x-1/2 bottom-1 md:bottom-3 left-1/2">
      <button type="button" v-for="(img, i)  in imagesCarousel" class="dot w-3 h-3 rounded-full" aria-current="false" :aria-label="'Slide'+ i+1" @click="currentSlide(i+1)"></button> <!-- Dot indicators for slides -->
    </div>
    <button data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:Carousel|layout:layout-${appComponent.config.layout}`"
            type="button" class="absolute top-0 left-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(-1)">
      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-gray-800/30 group-hover:bg-white/20 dark:group-hover:bg-gray-800/60">
          <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> <!-- Previous slide button -->
          <span class="sr-only">Previous</span>
      </span>
      </button>
      <button 
            data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:Carousel|layout:layout-${appComponent.config.layout}`"
            type="button" class="absolute top-0 right-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(1)">
      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-gray-800/30 group-hover:bg-white/20 dark:group-hover:bg-gray-800/60">
          <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> <!-- Next slide button -->
          <span class="sr-only">Next</span>
      </span>
    </button>
  </div> 
</template>
<style scoped>
.container-carousel {
  cursor: pointer; /* Pointer cursor for the carousel */
}
.container-carousel.active {
  cursor: grab !important; /* Grab cursor when active */
}
.shadow-container {
  //z-index: 10; /* Optional z-index for shadow */
  position: absolute; /* Positioning for shadow */
  top: -1px; /* Top offset */
  left: -5px; /* Left offset */
  width: 101%; /* Full width */
  height: 101%; /* Full height */
  opacity: 0.9; /* Opacity for shadow effect */
  box-shadow: inset 0px 0px 20px 19px rgb(0 0 0); /* Shadow effect */
}
@media only screen and (max-width: 600px) {
  .shadow-container {
    box-shadow: inset 0 0 8px 2px #000 !important; /* Adjust shadow for small screens */
  }
}
.img-shadow-container {
  //z-index: -1; /* Optional z-index for image shadow */
  //position: relative; /* Optional positioning for image shadow */
}
</style>

<!-- FILE DOCUMENTED -->

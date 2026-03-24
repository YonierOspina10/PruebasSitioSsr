<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    images: Array, // Array of image objects to be displayed in the carousel
    height: String, // Height of the carousel (not used in this fragment)
    shadow: Boolean // Boolean to determine if shadow effect is applied
  },
  data() {
    let config = this.$config(); // Configuration object
    let appComponent: any = this.$appComponent; // Reference to the app component
    let slideIndex = 1; // Current index of the slide being displayed
    let imagesCarousel: any = this.images; // Carousel images filtered from props
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
        // Function to handle the end of a slide movement
        if (isDown == true && moveSlider == 0) {
          this.moveSlide(-1) // Move to the previous slide
        } else if (isDown == true && moveSlider == 1) {
          this.moveSlide(1) // Move to the next slide
        }
        moveSlider = undefined; // Reset moveSlider
        isDown = false; // Reset isDown flag
        slider.classList.remove('active'); // Remove active class from slider
      }
      const start = (e) => {
        // Function to handle the start of a slide movement
        isDown = true; // Set isDown to true
        slider.classList.add('active'); // Add active class to slider
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Get initial X position
      }
      const move = (e) => {
        // Function to handle the movement of the slide
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
      (() => {
        // Add event listeners for mouse and touch events
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
      // Move to the next or previous slide based on moveStep
      clearInterval(this.interval) // Clear the interval to prevent conflicts
      this.showSlide(this.slideIndex += moveStep); // Update slide index and show the slide
    },
    moveSlideInterval(moveStep) {
      // Move to the next slide at regular intervals
      this.showSlide(this.slideIndex += moveStep); // Update slide index and show the slide
    },
    currentSlide(n) {
      // Set the current slide to the specified index
      clearInterval(this.interval) // Clear the interval to prevent conflicts
      this.showSlide(this.slideIndex = n); // Update slide index and show the slide
    },
    showSlide(n) {
      // Display the slide corresponding to the current index
      let i;
      const slides = document.getElementsByClassName("slide"); // Get all slide elements
      const dots = document.getElementsByClassName('dot'); // Get all dot indicators
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
      }
    }
  }
})
</script>
<template>
  <!-- Main section for the carousel component -->
  <section class="w-full h-full flex justify-center items-center">
    <div
        class="relative carousel container-carousel w-[95%] h-[15rem] md:h-[35rem] rounded-3xl my-10 ">
      <!-- Carousel items generated from imagesCarousel array -->
      <div id="item1" class="slide carousel-item w-full" v-for="(img, i) in imagesCarousel"
        data-analytics-label="promo:banner:hero"
        :data-analytics-id="img.id"
        :data-analytics-position="i + 1"
        :data-analytics-context="`component:BannerV7|layout:layout-${appComponent.config.layout}`"
        >
        <div class="w-full" @click="goToLink(img.redirect), appComponent.gAnalytics('interaction_carrusel', img.alt)">
          <div :class="{'shadow-container' : shadow }"></div>
          <img width="1423" height="280" :src="img.url" class="w-full h-full" :alt="img.alt" :class="{'img-shadow-container' : shadow}" />
        </div>
      </div>
      <!-- Button to move to the previous slide -->
      <button data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:BannerV7|layout:layout-${appComponent.config.layout}`" type="button" class="absolute -top-3 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(-1)">
      </button>
      <!-- Button to move to the next slide -->
      <button data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:BannerV7|layout:layout-${appComponent.config.layout}`" type="button" class="absolute -top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(1)">
      </button>
    </div>
  </section>
</template>
<style scoped>
.container-carousel {
  cursor: pointer; /* Pointer cursor for the carousel */
}
.container-carousel.active {
  cursor: grab !important; /* Grab cursor when active */
}
.shadow-container {
  position: absolute; /* Positioning for shadow effect */
  top: -1px;
  left: -5px;
  width: 101%; /* Full width for shadow */
  height: 101%; /* Full height for shadow */
  opacity: 0.9; /* Slightly transparent shadow */
  box-shadow: inset 0px 0px 20px 19px rgb(0 0 0); /* Shadow effect */
}
@media only screen and (max-width: 600px) {
  .shadow-container {
    box-shadow: inset 0 0 8px 2px #000 !important; /* Adjust shadow for smaller screens */
  }
}
</style>

<!-- FILE DOCUMENTED -->

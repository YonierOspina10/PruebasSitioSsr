<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    images: Array, // Array of image objects to be displayed in the carousel
    height: String, // Height of the carousel (not used in the code)
    shadow: Boolean // Boolean to determine if shadow effect is applied
  },
  data() {
    let config = this.$config(); // Configuration object
    let appComponent: any =  this.$appComponent; // Reference to the app component
    let slideIndex = 1; // Current index of the slide being displayed
    let imagesCarousel: any[] = []; // Carousel images filtered from props
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
    this.$watch(
      () => this.images,
      (newVal) => {
        this.imagesCarousel = newVal.filter((e) => {
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
      },
      { immediate: true }
    );

    this.$nextTick(() => {
      let isDown = false; // Flag to track mouse/touch interaction
      let startX; // Initial position of the touch/mouse
      let moveSlider; // Direction of the slide movement
      const slider: any = document.querySelector('.container-carousel'); // Reference to the carousel container
      const end = () => {
        // Determine the slide movement direction based on interaction
        if (isDown == true && moveSlider == 0) {
          this.moveSlide(-1)
        } else if (isDown == true && moveSlider == 1) {
          this.moveSlide(1)
        }
        moveSlider = undefined; // Reset moveSlider
        isDown = false; // Reset isDown flag
        slider.classList.remove('active'); // Remove active class from slider
      }
      const start = (e) => {
        isDown = true; // Set isDown to true on interaction start
        slider.classList.add('active'); // Add active class to slider
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Capture initial position
      }
      const move = (e) => {
        this.openLink = true; // Allow link opening
        if (!isDown) return; // Exit if not interacting
        this.openLink = false; // Prevent link opening during slide movement
        e.preventDefault(); // Prevent default behavior
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft; // Current position
        const dist = (x - startX); // Distance moved
        if (dist > 0) {
          moveSlider = 0; // Move left
        } else if (dist < 0) {
          moveSlider = 1; // Move right
        }
      }
      // Add event listeners for mouse/touch interactions
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
      clearInterval(this.interval) // Clear the interval to prevent conflicts
      this.showSlide(this.slideIndex += moveStep); // Move to the next slide
    },
    moveSlideInterval(moveStep) {
      this.showSlide(this.slideIndex += moveStep); // Move to the next slide based on interval
    },
    currentSlide(n) {
      clearInterval(this.interval) // Clear the interval to prevent conflicts
      this.showSlide(this.slideIndex = n); // Show the specified slide
    },
    showSlide(n) {
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
        dots[i].classList.add('bg-gray-800', 'bg-opacity-50', 'border-solid', 'border', 'border-white/20'); // Apply inactive styles
      }
      if (slides[this.slideIndex - 1] != undefined) {
        slides[this.slideIndex - 1].classList.remove('hidden'); // Show the current slide
      }
    }
  }
})
</script>
<template>
  <section class="w-full h-full flex justify-center items-center">
    <div
        class="relative carousel container-carousel w-[95%] h-[15rem] md:h-[35rem] rounded-3xl my-10 ">
      <div id="item1" class="slide carousel-item w-full" v-for="(img, i) in imagesCarousel"
              data-analytics-label="promo:banner:hero"
              :data-analytics-id="img.id"
      			  :data-analytics-position="i +1"
              :data-analytics-context="`component:Carousel7|layout:layout-${appComponent.config.layout}`">
        <div class="w-full" @click="goToLink(img.redirect), appComponent.gAnalytics('interaction_carrusel', img.alt)">
          <div :class="{'shadow-container' : shadow }"></div>
          <img width="1423" height="280" :src="img.url" class="w-full h-full" :alt="img.alt" :class="{'img-shadow-container' : shadow}" />
        </div>
      </div>
      <button 
            data-analytics-label="promo:carousel:arrow-prev"
            :data-analytics-context="`component:Carousel7|layout:layout-${appComponent.config.layout}`"
            type="button" class="absolute -top-3 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(-1)">
        <font-awesome-icon
            icon="fa-solid fa-angle-left"
            class="text-neutral text-2xl hover:text-neutral h-10 md:h-20"
        />
      </button>
      <button data-analytics-label="promo:carousel:arrow-next"
            :data-analytics-context="`component:Carousel7|layout:layout-${appComponent.config.layout}`" 
            type="button" class="absolute -top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" @click="moveSlide(1)">
        <font-awesome-icon
            icon="fa-solid fa-angle-right"
            class="text-neutral text-2xl hover:text-neutral h-10 md:h-20"
        />
      </button>
    </div>
  </section>
</template>
<style scoped>
.container-carousel {
  cursor: pointer; /* Cursor style for the carousel */
}
.container-carousel.active {
  cursor: grab !important; /* Cursor style when the carousel is active */
}
.shadow-container {
  /* Styles for the shadow effect on images */
  position: absolute;
  top: -1px;
  left: -5px;
  width: 101%;
  height: 101%;
  opacity: 0.9;
  box-shadow: inset 0px 0px 20px 19px rgb(0 0 0);
}
@media only screen and (max-width: 600px) {
  .shadow-container {
    box-shadow: inset 0 0 8px 2px #000 !important; /* Adjust shadow for smaller screens */
  }
}
.img-shadow-container {
  /* Styles for images with shadow effect */
}
</style>

<!-- FILE DOCUMENTED -->

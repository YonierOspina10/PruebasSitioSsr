<script lang="ts">
import { defineComponent, ref } from "vue"; // Import necessary functions from Vue
import { Swiper, SwiperSlide } from "swiper/vue"; // Import Swiper and SwiperSlide components
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Import Swiper modules for functionality
import "swiper/css"; // Import Swiper CSS
import "swiper/css/pagination"; // Import Swiper pagination CSS
import "swiper/css/navigation"; // Import Swiper navigation CSS

export default defineComponent({
  props: {
    images: Array, // Define a prop 'images' that expects an array
  },
  components: {
    Swiper, // Register Swiper component
    SwiperSlide, // Register SwiperSlide component
  },
  setup() {
    return {
      pagination: {
          clickable: true, // Enable clickable pagination bullets
          renderBullet: function (index, className) { // Custom bullet rendering function
            return '<span class="' + className + '">' + (index + 1) + '</span>'; // Return bullet HTML
          },
        },
      modules: [Autoplay, Pagination, Navigation], // Register Swiper modules
    };
  },
  data() {
    let config = this.$config(); // Retrieve configuration
    let appComponent: any = this.$appComponent; // Reference to app component
    let imagesCarousel: any = this.images; // Reference to images prop
    let imagesCarouselRender: any = undefined; // Placeholder for filtered images
    return {
      config,
      appComponent,
      imagesCarousel,
      imagesCarouselRender,
    };
  },
  beforeMount() {
    // Filter images based on date criteria before the component mounts
    this.imagesCarouselRender = this.imagesCarousel.filter((e: any) => {
      if (
        (e.startDate == undefined || e.startDate == "") &&
        (e.date == undefined || e.date == "")
      ) {
        return true; // Include image if no date constraints
      }
      var currentDate = new Date(); // Get current date
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
      if (
        e.startDate != undefined &&
        e.startDate != "" &&
        e.date != undefined &&
        e.date != ""
      ) {
        var startDate = new Date(e.startDate); // Parse start date
        var endDate = new Date(e.date); // Parse end date
        return (
          currentDate.getTime() >= startDate.getTime() && // Check if current date is within range
          currentDate.getTime() <= endDate.getTime()
        );
      }
      if (
        (e.startDate != undefined || e.startDate != "") &&
        (e.date == undefined || e.date == "")
      ) {
        var startDate = new Date(e.startDate); // Parse start date
        return currentDate.getTime() >= startDate.getTime(); // Check if current date is after start date
      }
      if (
        (e.startDate == undefined || e.startDate == "") &&
        (e.date != undefined || e.date != "")
      ) {
        var endDate = new Date(e.date); // Parse end date
        return currentDate.getTime() <= endDate.getTime(); // Check if current date is before end date
      }
      return true; // Default case
    });
  },
  mounted() {
    // Lifecycle hook for additional logic after component is mounted
  },
  methods: {
    goToLink(link) {
      window.open(link, "_top"); // Open the provided link in the top window
    },
  },
});
</script>

<template>
  <section
    v-if="imagesCarouselRender.length > 0"
    class="w-full h-[400px] lg:h-[476px] flex flex-col justify-center items-center py-6 px-0 lg:px-10"
  >
    <Swiper
      :spaceBetween="0"
      :slidesPerView="1"
      :centeredSlides="true"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      :modules="modules"
      class="mySwiper w-[328px] lg:w-full h-[328px] lg:h-full flex flex-col justify-center items-center rounded-3xl"
    >
      <SwiperSlide
        v-for="(banner, index) in imagesCarouselRender"
        data-analytics-label="promo:banner:hero"
        :data-analytics-id="banner.id"
        :data-analytics-position="index + 1"
        :data-analytics-context="`component:Carousel4|layout:layout-${appComponent.config.layout}`"
        class="w-full h-full z-1"
      >
        <div class="w-full h-full flex justify-center items-center">
          <img
            v-if="
              banner != '' &&
              banner != undefined &&
              banner.urlFondo != '' &&
              banner.urlFondo != undefined
            "
            :src="banner.urlFondo"
            alt=""
            class="w-full h-full object-cover object-top z-10"
          />
          <div
            class="absolute hidden lg:flex -bottom-1 w-full h-60 bg-gradient-to-t from-neutral-content z-10"
          ></div>
        </div>
        <div
          class="absolute top-0 w-full flex justify-center items-center mt-5 md:mt-10 gap-1 lg:gap-10 z-20"
        >
          <button
            @click="goToLink(banner.redirect)"
            class="in w-[310px] lg:w-[850px] h-[250px] lg:h-[376px] flex justify-center items-center"
          >
            <img
              v-if="banner.url != undefined && banner.url != ''"
              :src="banner.url"
              class="w-full h-full object-contain object-center lg:flex hover:scale-[1.02]"
            />
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from "vue"; // Importing defineComponent from Vue for component definition
import { register } from "swiper/element/bundle"; // Importing Swiper registration for usage in the component
import BannerV3 from "./BannerV3.vue"; // Importing the BannerV3 component
register(); // Registering Swiper elements

export default defineComponent({
  props: {
    images: Object, // Defining a prop 'images' of type Object
  },
  components: {
    BannerV3 // Registering the BannerV3 component locally
  },
  data() {
    let appComponent: any = this.$appComponent; // Storing appComponent from the context
    let imagesCarouselRender: any = undefined; // Initializing imagesCarouselRender as undefined
    return {
      appComponent,
      imagesCarouselRender, // Returning data properties
    };
  },
  setup() {
    return {}; // Setup function returning an empty object
  },
  methods: {
    /**
     * Returns the image URL based on the provided name.
     * If the name includes 'http', it returns the name directly.
     * Otherwise, it constructs a URL using the base URL and the name.
     * @param {string} name - The name of the image.
     * @returns {string} - The complete image URL.
     */
    getImg(name: string) {
      if (name.includes("http")) return name; // Return the name if it's a full URL
      else {
        const baseUrl = new URL(import.meta.url).origin + "/landing/"; // Constructing base URL
        return new URL(baseUrl + name).href; // Returning the full image URL
      }
    },
  },
  created() {
    // Filtering images based on their date properties
    this.imagesCarouselRender = this.images.filter((e: any) => {
      if (
        (e.startDate == undefined || e.startDate == "") &&
        (e.date == undefined || e.date == "")
      ) {
        return true; // Include image if no date constraints
      }
      var currentDate = new Date(); // Getting the current date
      currentDate.setHours(0, 0, 0, 0); // Resetting time to midnight
      if (
        e.startDate != undefined &&
        e.startDate != "" &&
        e.date != undefined &&
        e.date != ""
      ) {
        var startDate = new Date(e.startDate); // Parsing start date
        var endDate = new Date(e.date); // Parsing end date
        return (
          currentDate.getTime() >= startDate.getTime() &&
          currentDate.getTime() <= endDate.getTime() // Checking if current date is within range
        );
      }
      if (
        (e.startDate != undefined || e.startDate != "") &&
        (e.date == undefined || e.date == "")
      ) {
        var startDate = new Date(e.startDate); // Parsing start date
        return currentDate.getTime() >= startDate.getTime(); // Checking if current date is after start date
      }
      if (
        (e.startDate == undefined || e.startDate == "") &&
        (e.date != undefined || e.date != "")
      ) {
        var endDate = new Date(e.date); // Parsing end date
        return currentDate.getTime() <= endDate.getTime(); // Checking if current date is before end date
      }
      return true; // Default case
    });
  },
});
</script>

<template>
  <!-- Conditional rendering of BannerV3 or swiper-container based on appComponent layout -->
  <BannerV3 :images-carousel-render="imagesCarouselRender" v-if="appComponent.config.layout != undefined && appComponent.config.layout == 4"/>
  <swiper-container
      v-else
    :spaceBetween="0"
    :slidesPerView="1"
    :centeredSlides="true"
    :loop="false"
    navigation="true"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper relative h-[100px] lg:h-[280px]"
    :class="appComponent.skeleton ? 'container-loading' : ''"
  >
    <!-- Rendering swiper-slide for each banner in imagesCarouselRender -->
    <swiper-slide
      lazy="true"
      v-for="(banner, i) in imagesCarouselRender"
      :key="banner.id"
        data-analytics-label="promo:banner:hero"
        :data-analytics-id="banner.id"
        :data-analytics-position="i + 1"
        :data-analytics-context="`component:BannerV2|layout:layout-${appComponent.config.layout}`"
      class="w-full z-1"
      :id="'banner-' + i"
    >
      <RouterLink :to="banner.redirect">
        <img
          v-if="Number(i) == 0"
          width="1920"
          height="280"
          :src="banner.url"
          :alt="`Slider ${banner.alt}`"
          class="w-full h-full z-10"
          loading="lazy"
        />
        <img
          v-else
          width="1920"
          height="280"
          v-lazy="{src: banner.url, delay: 3000}"
          :alt="`Slider ${banner.alt}`"
          class="w-full h-full z-10"
          loading="lazy"
        />
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
/* Styles for Swiper navigation buttons */
swiper-container::part(button-next),
swiper-container::part(button-prev) {
  color: hsl(var(--b1)); /* Setting color for navigation buttons */
  width: 20px; /* Width of navigation buttons */
  height: 20px; /* Height of navigation buttons */
}

/* Styles for active pagination bullet */
swiper-container::part(bullet-active) {
  background-color: hsl(var(--b1)); /* Setting background color for active bullet */
}
</style>

<!-- FILE DOCUMENTED -->

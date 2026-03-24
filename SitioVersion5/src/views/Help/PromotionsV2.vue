<script lang="ts">
import {defineComponent, ref} from "vue"; // Import necessary functions from Vue
import {useRoute} from "vue-router"; // Import useRoute for accessing route parameters
import PromotionsCards from "@/components/PromotionsCards.vue"; // Import PromotionsCards component
import PromotionsCategoryCards from "@/components/PromotionsCategoryCards.vue"; // Import PromotionsCategoryCards component
import NewViewPromotions from "@/components/NewViewPromotions.vue" // Import NewViewPromotions component

export default defineComponent({
  components: // Register components for use in this component
      {
        PromotionsCards,
        PromotionsCategoryCards,
        NewViewPromotions
  },
  data(){ // Define reactive data properties
    let config = this.$config(); // Retrieve configuration
    let appComponent: any = this.$appComponent; // Get application component reference
    let emitter = this.$emitter(); // Get event emitter
    let bonuses: any = []; // Initialize bonuses array
    return {
      config,
      appComponent,
      emitter,
      bonuses,
    };
  },
  setup() { // Setup function for composition API
    const route = useRoute(); // Access current route
    let sectionId: any = ref(route.params.sectionId); // Create a reactive reference for sectionId
    return {
      sectionId,
    };
  },
  unmounted() { // Lifecycle hook for cleanup when component is unmounted
    this.emitter.all.delete('accept:modal'); // Remove event listener for modal acceptance
  },
  mounted() { // Lifecycle hook for actions after component is mounted
    this.emitter.on('close:modalPromotion', () => { // Listen for close modal event
      window.history.pushState('', '', '/promociones-bonos/'); // Update browser history
    });
    // Check for promotions in the configuration based on login status and language
    if (
        this.config != undefined &&
        this.config['not_login'] != undefined &&
        this.config['not_login'][this.appComponent.lngProd] != undefined &&
        this.config['not_login'][this.appComponent.lngProd]['promotions'] !=
        undefined
    ) {
      this.bonuses =
          this.config['not_login'][this.appComponent.lngProd]['promotions']; // Assign bonuses for not logged in users
    } else if (
        this.config != undefined &&
        this.config.promotions != undefined &&
        this.config.promotions[this.appComponent.country] != undefined &&
        this.config.promotions[this.appComponent.country][
            this.appComponent.lngProd
            ] != undefined
    ){
      this.bonuses =
          this.config.promotions[this.appComponent.country][
              this.appComponent.lngProd
              ]; // Assign bonuses for logged in users
    }
    
    if (!Array.isArray(this.bonuses)) {
      this.bonuses = [];
    }
    // Filter bonuses based on date validity
    this.bonuses = this.bonuses.filter((e) => {
		if (e === "null" || e === null){ // Exclude null values
			return false
		}
      if (
          (e.startDate == undefined || e.startDate == '') &&
          (e.date == undefined || e.date == '')
      ) {
        return true; // Include if no date constraints
      }
      var currentDate = new Date(); // Get current date
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
      if (
          e.startDate != undefined &&
          e.startDate != '' &&
          e.date != undefined &&
          e.date != ''
      ) {
        var startDate = new Date(e.startDate); // Parse start date
        var endDate = new Date(e.date); // Parse end date
        return (
            currentDate.getTime() >= startDate.getTime() &&
            currentDate.getTime() <= endDate.getTime() // Include if current date is within range
        );
      }
      if (
          (e.startDate != undefined || e.startDate != '') &&
          (e.date == undefined || e.date == '')
      ) {
        var startDate = new Date(e.startDate); // Parse start date
        return currentDate.getTime() >= startDate.getTime(); // Include if current date is after start date
      }
      if (
          (e.startDate == undefined || e.startDate == '') &&
          (e.date != undefined || e.date != '')
      ) {
        var endDate = new Date(e.date); // Parse end date
        return currentDate.getTime() <= endDate.getTime(); // Include if current date is before end date
      }
      return true; // Default to include
    });
    // If sectionId is defined, trigger promotion click
    if (this.sectionId != undefined) {
      this.promotionClick(
          this.bonuses.filter((item: any) => {
            return item.slug.replaceAll(' ', '-').toLowerCase() == this.sectionId; // Match sectionId with bonus slug
          })[0]
      );
    }
    console.log(this.config.promotions.bg) // Log background configuration for promotions
  },
  methods: {
    promotionClick(item) { // Method to handle promotion click
      this.appComponent.promotionModal = item; // Set the promotion modal item
      window.history.pushState(
          '',
          '',
          '/promociones-bonos/' + item.slug.replaceAll(' ', '-').toLowerCase() // Update browser history with promotion slug
      );
    },
  },
})
</script>
<template>
  <NewViewPromotions :data="appComponent.promotionModal" v-if="appComponent.promotionView"/> <!-- Render NewViewPromotions if promotionView is true -->
  <div v-if="!appComponent.promotionView" class="overflow-hidden "> <!-- Main container for promotions -->
     <!-- Image styling -->
      <div class="relative w-full">
          <img
                :src="config.promotions[appComponent.country].bg"
                alt=""
                class="in w-full h-full object-cover">
          <div class="absolute -bottom-1 left-0 right-0 h-52 bg-gradient-to-t from-neutral-content to-transparent"></div>
      </div>
    <div v-if="config.layout != undefined && config.layout == 3 || config.layout == 5 && !appComponent.promotionView"
         class="w-full h-auto mb-20"
         :class="config.layout != undefined && config.layout == 5 ? '' : ' bg-neutral-content'"
      >
      <div :class="config.layout != undefined && config.layout == 5 ? ' ': 'ml-7 sm:ml-56' " class="pt-1 flex flex-col  w-52 "> <!-- Title container -->
        <p class="text-neutral text-3xl font-bold z-1"> <!-- Title text -->
          {{$t('Promociones')}} <!-- Translated title -->
        </p>
        <div class="w-full border-b-4 rounded-full border-solid border-primary z-1" :class="config.layout != undefined && config.layout == 5 ? 'hidden': 'lg:flex'"></div> <!-- Decorative line -->
      </div>
      <div
          class="Framework InfoPage rounded-xl"
          :class="[
			config.layout != undefined && config.layout == 3 || config.layout == 5
				? ' max-w-[1100px]'
				: ' w-11/12 max-w-[1100px]'
      , config.layout != undefined && config.layout == 5 ? 'px-0 pt-0': 'shadow-md  mx-auto']"
      >
        <PromotionsCategoryCards :data="bonuses"/> <!-- Render PromotionsCategoryCards with bonuses data -->
      </div>
      <div
          v-if="config.layout != undefined && config.layout != 5"
          class="absolute -bottom-2 w-full h-60 bg-gradient-to-t from-neutral-content"
      ></div>
    </div>
  </div>
</template>

<!-- FILE DOCUMENTED -->

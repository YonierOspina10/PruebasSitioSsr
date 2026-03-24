<script lang="ts">
import { defineComponent } from 'vue';
import { register } from 'swiper/element/bundle';
register(); // Registers Swiper elements for use in the component

export default defineComponent({
  props: {
    type: { type: String, default: 'banner_home' }, // Defines a prop 'type' with a default value
  },
  setup() {
    return {}; // Setup function returns an empty object
  },
  data() {
    let imagesCarouselRender: any = []; // Array to hold images for the carousel
    let config = this.$config(); // Retrieves configuration object
    let appComponent: any = this.$appComponent; // Retrieves app component data
    let device: string = 'bannersDesktop'; // Default device type
    let login: string = ''; // Login status variable
    let login2: string = ''; // Alternate login status variable
    let banners: any = []; // Array to hold banner data

    // Determines device type based on app component's mobile status
    if (appComponent.mobile == '') {
      device = 'bannersDesktop';
    } else {
      if (appComponent.mobile == '1') {
        device = 'bannersMobile';
      }
    }

    login = 'notLogin'; // Sets login status
    login2 = 'not_login'; // Sets alternate login status

    // Checks configuration for banners based on various conditions
    if (
        config != undefined &&
        config[login2] != undefined &&
        config[login2][appComponent.lngProd] != undefined &&
        config[login2][appComponent.lngProd]['banners'] != undefined &&
        config[login2][appComponent.lngProd]['banners'][this.type] != undefined
    ) {
      banners = JSON.parse(
          JSON.stringify(
              config[login2][appComponent.lngProd]['banners'][this.type]
          )
      );
    } else if (
        config != undefined &&
        config['components_'] != undefined &&
        config['components_'][this.type.replace('banner_', '')] != undefined &&
        config['components_'][this.type.replace('banner_', '')].findIndex(
            (item) => item.id == 'Carousel3Component'
        ) > -1 &&
        config['components_'][this.type.replace('banner_', '')][
            config['components_'][this.type.replace('banner_', '')].findIndex(
                (item) => item.id == 'Carousel3Component'
            )
            ] != undefined &&
        config['components_'][this.type.replace('banner_', '')][
            config['components_'][this.type.replace('banner_', '')].findIndex(
                (item) => item.id == 'Carousel3Component'
            )
            ]['banners'] != undefined
    ) {
      banners = JSON.parse(
          JSON.stringify(
              config['components_'][this.type.replace('banner_', '')][
                  config['components_'][this.type.replace('banner_', '')].findIndex(
                      (item) => item.id == 'Carousel3Component'
                  )
                  ]['banners']
          )
      );
    } else {
      // Fallback to check device-specific banners
      if (
          config != undefined &&
          config[device] != undefined &&
          config[device][appComponent.country] != undefined &&
          config[device][appComponent.country][appComponent.lngProd] !=
          undefined &&
          config[device][appComponent.country][appComponent.lngProd][login] !=
          undefined &&
          config[device][appComponent.country][appComponent.lngProd][login][
              this.type.replace('banner_', '')
              ] != undefined
      ) {
        banners = JSON.parse(
            JSON.stringify(
                config[device][appComponent.country][appComponent.lngProd][login][
                    this.type.replace('banner_', '')
                    ]
            )
        );
      }
    }
    return {
      imagesCarouselRender,
      banners, // Returns the banners array for use in the template
      appComponent
    };
  },
  created() {
    // Filters banners based on date conditions
    this.imagesCarouselRender = this.banners.filter((e: any) => {
      if (
          (e.startDate == undefined || e.startDate == '') &&
          (e.date == undefined || e.date == '')
      ) {
        return true; // No date restrictions
      }
      let currentDate = new Date(); // Gets the current date
      currentDate.setHours(0, 0, 0, 0); // Resets time to midnight
      if (
          e.startDate != undefined &&
          e.startDate != '' &&
          e.date != undefined &&
          e.date != ''
      ) {
        let startDate = new Date(e.startDate); // Parses start date
        let endDate = new Date(e.date); // Parses end date
        return (
            currentDate.getTime() >= startDate.getTime() &&
            currentDate.getTime() <= endDate.getTime() // Checks if current date is within range
        );
      }
      if (
          (e.startDate != undefined || e.startDate != '') &&
          (e.date == undefined || e.date == '')
      ) {
        let startDate = new Date(e.startDate); // Parses start date
        return currentDate.getTime() >= startDate.getTime(); // Checks if current date is after start date
      }
      if (
          (e.startDate == undefined || e.startDate == '') &&
          (e.date != undefined || e.date != '')
      ) {
        let endDate = new Date(e.date); // Parses end date
        return currentDate.getTime() <= endDate.getTime(); // Checks if current date is before end date
      }
      return true; // Default case
    });
  },
});
</script>

<template>
  <div class="mt-4 md:mt-6">
  </div>
  <!-- Swiper container for displaying banners -->
  <swiper-container
      v-if="imagesCarouselRender.length > 0"
      :slides-per-view="1"
      :loop="true"
      :mousewheel-force-to-axis="true"
      :pagination="true"
      :pagination-clickable="true"
      :autoplay="true"
      :centered-slides="true"
      :autoplay-delay="3000"
      :autoplay-disable-on-interaction="false"
      :autoplay-pause-on-mouse-enter="true"
      :mousewheel="true"
      :direction="'horizontal'"
      :controller-control="'.swiper-1'"
      :injectStyles="[
			`
		.swiper-pagination-bullet {
		width: 20px;
		height: 8px;
		border-radius: 10px;
		background: #FFF;
		}
		.swiper-pagination-bullet-active {
		width: 40px;
		height: 8px;
		border-radius: 10px;
		background: #FFF;
		}
		@media (min-width: 1024px) {
		.swiper-pagination-bullet {
		width: 40px;
		height: 10px;
		border-radius: 10px;
		background: #FFF;
		}
		.swiper-pagination-bullet-active {
		width: 80px;
		height: 10px;
		border-radius: 10px;
		background: #FFF;
		}
		}
		`,
		]"
      class="w-full h-full max-w-[1156px] px-4 tablet:px-0"
  >
    <!-- Swiper slide for each banner -->
    <swiper-slide
        v-for="(banner, index) in imagesCarouselRender"
        :key="index"
        data-analytics-label="promo:banner:hero"
        :data-analytics-id="banner.id"
        :data-analytics-position="index + 1"
        :data-analytics-context="`component:BannerSlider6|layout:layout-${appComponent.config.layout}`"
        class="max-h-[220px] tablet:max-h-[280px] desktop:max-h-[447px] cursor-pointer overflow-hidden rounded-[15px] tablet:rounded-[30px] border tablet:border-2 border-primary-content/75"
    >
      <RouterLink :to="banner.redirect">
        <!-- Image element for the banner -->
        <img
            v-if="banner.urlFondo != '' && banner.urlFondo != undefined"
            :src="banner.urlFondo"
            alt=""
            class="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-1000 ease-in-out"
        />
        </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>

<!-- FILE DOCUMENTED -->

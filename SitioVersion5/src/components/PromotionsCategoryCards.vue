<script lang="ts">
import { defineComponent } from "vue"; // Importing the defineComponent function from Vue
import { Swiper, SwiperSlide } from 'swiper/vue'; // Importing Swiper and SwiperSlide components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importing Swiper modules for functionality
import 'swiper/css'; // Importing Swiper CSS
import 'swiper/css/pagination'; // Importing Swiper pagination CSS
import 'swiper/css/navigation'; // Importing Swiper navigation CSS
import 'swiper/css/autoplay'; // Importing Swiper autoplay CSS
import { register } from 'swiper/element/bundle'; // Registering Swiper elements
import { useGetInfoFirestore } from '@/composables/useInfoFirestore';
register(); // Registering Swiper elements globally

export default defineComponent({
  components: { // Declaring components used in this component
    Swiper,
    SwiperSlide
  },
  setup() { // Setup function for composition API
    return {
      modules: [Autoplay, Pagination, Navigation], // Defining Swiper modules to be used
    };
  },
  props: { // Defining props for the component
    data: Object, // Data prop to receive an object
    h2Clase: String // h2Clase prop to receive a string
  },
  data() { // Data function returning component's reactive state
    let config = this.$config(); // Retrieving configuration
    let appComponent: any = this.$appComponent; // Retrieving app component reference
    let emitter = this.$emitter(); // Retrieving event emitter
    let selecType: any = 0; // Initializing selected type
    return {
      config,
      appComponent,
      emitter,
      selecType,
      promotions: [] as any[],
      usingFirestore: false,
      loading: true,
    }
  },

  async mounted() {
    await this.loadPromotions();
  },
  methods: {
    async loadPromotions() {
      this.loading = true;
      this.promotions = [];
      this.usingFirestore = false;

      try {
        const docs = await useGetInfoFirestore(
          this.$config(),
          this.$appComponent,
          'promotions',
          {
            // Promotions depend on device and login state
            useScope: false,   // desktop / mobile
            useLogin: false,   // login / not_login
          }
        );

        if (docs && docs.length) {
          // Firestore has priority
          this.promotions = docs;
          this.usingFirestore = true;
        } else {
          // Fallback to static config data
          this.promotions = Array.isArray(this.data) ? this.data : [];
          this.usingFirestore = false;
        }

      } catch (error) {
        console.warn('Firestore promotions failed, using config data', error);
        this.promotions = Array.isArray(this.data) ? this.data : [];
        this.usingFirestore = false;
      } finally {
        this.loading = false;
      }
    },
    promotionClick(item) { // Method to handle promotion click
      if (item.showButton && item.buttonUrl) {
        window.open(item.buttonUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      this.appComponent.promotionModal = item; // Setting the promotion modal item
      let cleanSlug = item.slug.replaceAll(' ', '-').toLowerCase(); // Cleaning the slug for URL
      cleanSlug = cleanSlug.replace(/[^a-z0-9\-_]/g, ''); // Removing invalid characters from slug
      window.history.pushState(
        '',
        '',
        `/promociones-bonos/` + cleanSlug // Updating the browser's URL
      );
      this.appComponent.promotionView = true; // Setting promotion view to true
    },
    handleButtonClick(item) {
      if (!item.showButton) {
        this.promotionClick(item);
        return;
      }
      if (item.buttonUrl) {
        window.open(item.buttonUrl, '_blank', 'noopener,noreferrer');
      }
    }
  },
});
</script>
<template>
  <div v-if="loading">
    <p>Cargando promociones...</p>
  </div>
  <div v-else>
    <!-- Main container for the component -->
    <div class="ml-3" :class="{ 'hidden': config.layout != undefined && config.layout == 5 }">
      <span class="text-neutral text-lg pr-8">
        {{ $t('Selecciona el tipo de bono:') }} <!-- Label for selecting bonus type -->
      </span>
      <select v-model.number="selecType" name="typeBono" class="bg-base-300 text-neutral rounded-xl h-11">
        <option value="0">{{ $t('Total') }}</option> <!-- Option for total -->
        <option value="1">{{ $t('Apuestas deportivas') }}</option> <!-- Option for sports betting -->
        <option v-if="appComponent.casinoEnabled && appComponent.virtualesEnabled && appComponent.liveCasinoEnabled"
          value="2">{{ $t('Casino') }}</option> <!-- Option for casino, conditionally rendered -->
      </select>
    </div>
    <section class="ml-3">
      <article v-if="selecType == 1 || selecType == 0" class="mt-8">
        <div class="flex gap-4 items-center">
          <div v-if="config.promotions != undefined &&
            config.promotions[appComponent.country]?.iconApuesDepor != undefined" class="svg"
            :class="config.layout != undefined && config.layout == 5 ? 'order-2' : 'order-1'"
            v-html="config.promotions[appComponent.country].iconApuesDepor"></div>

          <div>
            <h3 class="text-neutral text-xl"
              :class="config.layout != undefined && config.layout == 5 ? 'font-poppinssl' : 'font-bold'">
              {{ $t('Apuestas Deportivas') }}
            </h3>
            <div class="w-full border-b-4 rounded-full border-solid border-primary z-1"
              :class="config.layout != undefined && config.layout == 5 ? 'hidden' : 'lg:flex'"></div>
          </div>
        </div>

        <!-- LAYOUT 5 (SWIPER) -->
        <div v-if="config.layout != undefined && config.layout == 5">
          <section class="flex justify-center items-center w-full">
            <div class="w-full z-50">
              <div class="in relative flex justify-end items-center"
                :class="config.layout != undefined && config.layout == 4 ? 'pl-[9%] md:pl-[3%]' : ''">
                <div class="flex gap-2">
                  <button class="cursor-pointer hover:scale-125" :class="'slidePrev' + 150">
                    <font-awesome-icon icon="fa-solid fa-angle-left"
                      class="text-neutral/50 text-2xl hover:text-neutral" />
                  </button>
                  <button class="cursor-pointer hover:scale-125" :class="'slideNext' + 150">
                    <font-awesome-icon icon="fa-solid fa-angle-right"
                      class="text-neutral/50 text-2xl hover:text-neutral" />
                  </button>
                </div>
              </div>

              <div class="h-full w-full">
                <div class="w-full h-full flex items-center justify-center py-2">
                  <swiper-container :slidesPerView="'auto'" :centeredSlides="false" :spaceBetween="10"
                    :grabCursor="true" :modules="modules" :navigation="{
                      nextEl: '.slideNext' + 150,
                      prevEl: '.slidePrev' + 150,
                    }" :mousewheel="true" :mousewheel-force-to-axis="true" :free-mode="true" :direction="'horizontal'"
                    class="mySwiper swiper-h w-full h-full flex justify-start items-center">
                    <swiper-slide v-for="item in (promotions.length ? promotions : data)" :key="item.id || item.slug"
                      class="in relative rounded-xl overflow-hidden inline-block mr-2 w-auto">
                      <div v-if="item.type === 1 || item.type === '1'"
                        class="w-[300px] h-[200px] relative group rounded-xl cursor-pointer border-2 border-solid border-accent hover:border-neutral"
                        @click="!item.showButton && promotionClick(item)">
                        <img :src="item.urlImage" class="rounded-xl w-full h-full" />
                        <button
                          v-if="item.showButton"
                          class="absolute bottom-6 left-4 px-3 py-1 font-poppinssl group-hover:scale-110 transition-all ease-in-out bg-base-300 rounded-md text-sm text-neutral border-solid border-2 border-primary"
                          @click.stop="handleButtonClick(item)"
                        >
                            {{ item.buttonText }} <!-- Button to view promotion -->
                        </button>
                      </div>
                    </swiper-slide>
                  </swiper-container>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- GRID NORMAL -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:pr-0 pr-3">
          <template v-for="item in (promotions.length ? promotions : data).filter(item => item.isExpired != true)"
            :key="item.id || item.slug">

            <div v-if="item.type === 1 || item.type === '1'"
              class="w-full relative group rounded-xl cursor-pointer border-1 border-solid border-accent hover:border-neutral"
              @click="!item.showButton && promotionClick(item)">
              <img :src="item.urlImage" class="rounded-xl" />
              <button
                v-if="item.showButton"
                class="absolute bottom-6 left-9 px-8 group-hover:scale-110 transition-all ease-in-out rounded-md text-xl text-neutral shadow-[inset_0px_-3px_2px_0px_#00000085] max-w-[80%] break-words whitespace-normal"
                :class="config.layout != undefined && config.layout == 5 ? 'bg-base-300' : 'bg-success'"
                @click.stop="handleButtonClick(item)"
              >
                  {{ item.buttonText }} <!-- Button to view promotion -->
              </button>
            </div>
          </template>
        </div>
      </article>

      <article
        v-if="selecType == 2 || selecType == 0 && (appComponent.casinoEnabled && appComponent.virtualesEnabled && appComponent.liveCasinoEnabled)"
        class="mt-8"> <!-- Article for casino promotions -->
        <div class="flex gap-4 items-center">
          <div v-if="config.promotions != undefined &&
            config.promotions[appComponent.country].iconCasino != undefined" class="svg"
            :class="config.layout != undefined && config.layout == 5 ? 'order-2 ' : 'order-1'"
            v-html="config.promotions[appComponent.country].iconCasino"></div>
          <div>
            <h3 class="text-neutral text-xl"
              :class="config.layout != undefined && config.layout == 5 ? 'font-poppinssl' : ' font-bold'">
              {{ $t('Casino') }} <!-- Title for casino -->
            </h3>
            <div class="w-full border-b-4 rounded-full border-solid border-primary z-1"
              :class="config.layout != undefined && config.layout == 5 ? 'hidden' : 'lg:flex'"></div>
            <!-- Decorative line -->
          </div>
        </div>
        <div v-if="config.layout != undefined && config.layout == 5">
          <section class="flex justify-center items-center w-full">
            <div class="w-full z-50">
              <div class="in relative flex justify-end items-center"
                :class="config.layout != undefined && config.layout == 4 ? 'pl-[9%] md:pl-[3%]' : ''">
                <div class="flex gap-2">
                  <!-- Buttons for navigating between games -->
                  <button class="cursor-pointer hover:scale-125" :class="'slidePrev2' + 150">
                    <font-awesome-icon icon="fa-solid fa-angle-left"
                      class="text-neutral/50 text-2xl hover:text-neutral" />
                  </button>
                  <button class="cursor-pointer hover:scale-125" :class="'slideNext2' + 150">
                    <font-awesome-icon icon="fa-solid fa-angle-right"
                      class="text-neutral/50 text-2xl hover:text-neutral" />
                  </button>
                </div>
              </div>
              <div class="h-full w-full">
                <div class="w-full h-full flex items-center justify-center py-2">
                  <!-- Carousel of games using Swiper component -->
                  <swiper-container :slidesPerView="'auto'" :centeredSlides="false" :spaceBetween="10"
                    :grabCursor="true" :modules="modules" :navigation="{
                      nextEl: '.slideNext2' + 150,
                      prevEl: '.slidePrev2' + 150,
                    }" :mousewheel="true" :mousewheel-force-to-axis="true" :free-mode="true" :direction="'horizontal'"
                    class="mySwiper swiper-h w-full h-full flex justify-start items-center">
                    <swiper-slide v-for="item in (promotions.length ? promotions : data)"
                      class="in relative rounded-xl overflow-hidden inline-block mr-2 w-auto">
                      <div v-if='item.type === 2'
                        class="w-[300px] h-[200px] relative group rounded-xl cursor-pointer group border-1 border-solid border-accent hover:border-neutral"
                        @click="!item.showButton && promotionClick(item)"> <!-- Click event to handle promotion selection -->
                        <img :src="item.urlImage" class="rounded-xl w-full h-full ">
                        <button
                          v-if="item.showButton"
                          class="absolute bottom-6 left-4 px-3 py-1 font-poppinssl group-hover:scale-110 transition-all ease-in-out bg-base-300 rounded-md text-sm text-neutral border-solid border-2 border-primary  max-w-[85%] break-words whitespace-normal"
                          @click.stop="handleButtonClick(item)"
                        >
                            {{ item.buttonText }} <!-- Button to view promotion -->
                        </button>
                      </div>
                    </swiper-slide>
                  </swiper-container>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div v-else class="grid grid-cols-1  md:grid-cols-3 gap-4 mt-4 md:pr-0 pr-3">
          <template v-for="item in (promotions.length ? promotions : data).filter(item => item.isExpired != true)">
            <div v-if='item.type === 2 || item.type === "2"'
              class="w-full relative rounded-xl cursor-pointer group border-1 border-solid border-accent hover:border-neutral"
              @click="!item.showButton && promotionClick(item)"> <!-- Click event to handle promotion selection -->
              <img :src="item.urlImage" class="rounded-xl">
              <button
                v-if="item.showButton"
                class="absolute bottom-6 left-9 px-8 group-hover:scale-110 transition-all ease-in-out  rounded-md text-xl text-neutral shadow-[inset_0px_-3px_2px_0px_#00000085] max-w-[80%] break-words whitespace-normal"
                :class="config.layout != undefined && config.layout == 5 ? 'bg-base-300' : 'bg-success'"
                @click.stop="handleButtonClick(item)"
              >
                  {{ item.buttonText }} <!-- Button to view promotion -->
              </button>
            </div>
          </template>
        </div>
      </article>
    </section>
  </div>
</template>

<!-- FILE DOCUMENTED -->

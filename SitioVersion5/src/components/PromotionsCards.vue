<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useGetInfoFirestore } from '@/composables/useInfoFirestore';
/**
 * Vue component definition for displaying promotions.
 */
export default defineComponent({
  props: { /** Data object containing promotion details. */
    data: Object,
    /** CSS class for the H2 element. */
    h2Clase: String
  },

  data() {
    /** Reference to the app component. */
    let appComponent: any = this.$appComponent;
    /** Event emitter for communication. */
    let emitter = this.$emitter();
    /** Configuration object. */
    let config = this.$config();

    return {
      config,
      appComponent,
      emitter,
      claseH2: this.h2Clase,
      // Final promotions source (Firestore or config)
      promotions: [] as any[],
      // Flag to know which source is being used
      usingFirestore: false,

      loading: true,
    };
  },

  async mounted() {
    await this.loadPromotions();
  },
  unmounted() {
    /** Clean up event listener when component is unmounted. */
    this.emitter.all.delete('accept:modal');
  },
  methods: {
    // Load promotions from Firestore with fallback to config
    async loadPromotions() {
      this.loading = true;

      try {
        const docs = await useGetInfoFirestore(
          this.config,
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
    promotionClick(item: any) {
      this.appComponent.modal.showModal = 'promotion';
      /** Set the selected promotion item. */
      this.appComponent.promotionModal = item;
      /** Clean the slug for the URL. */
      let cleanSlug = item.slug.replaceAll(' ', '-').toLowerCase();
      cleanSlug = cleanSlug.replace(/[^a-z0-9\-_]/g, '');
      /** Update the browser's URL without reloading the page. */
      window.history.pushState(
        '',
        '',
        '/promociones-bonos/' + cleanSlug
      );
    },
  },
})
</script>

<template>
  <!-- Main container for displaying promotion items -->
        <div v-if="promotions.length > 0" v-for="item in promotions.filter(item => item.isExpired !== true)" :key="item.id" :class="[
    'relative promotion-item promotiom-' + item.id,
    'group in',
    config.promotions != undefined && config.promotions[appComponent.country] != undefined && config.promotions[appComponent.country].version != undefined && config.promotions[appComponent.country].version == 3
      ? 'shadow-[0px_0px_9px_3px] md:shadow-[0px_0px_15px_7px] shadow-primary md:shadow-primary rounded-xl hover:brightness-90 transition-all ease-in-out relative after:-z-1 after:top-[-1px] after:shadow-[0px_-4px_4px] after:shadow-neutral after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:absolute after:h-[5px] after:bg-base-400 after:rounded-[50%]'
      : 'shadow-md rounded-xl'
  ]">
            <!-- Header section of the promotion item -->
            <div class="promotion-item-head"></div>
            <!-- Body section of the promotion item with click event -->
            <div class="promotion-item-body h-full flex flex-col justify-center items-center cursor-pointer"
                 @click="promotionClick(item)">
                <!-- Image section of the promotion -->
                <div class="promotion-button w-full object-contain object-center" style="">
                    <img :src="item.urlImage" />
                </div>
                <!-- Conditional display of promotion text based on configuration -->
                <span
                    class="bg-base-400 group-hover:bg-accent-content shadow-[inset_0px_0px_20px_18px] shadow-neutral-content/10 group-hover:text-neutral transition-all ease-in-out text-neutral-content absolute rounded-full px-2 md:px-10 py-0 md:py-1 leading-4 text-[0.50rem] md:text-sm uppercase font-poppinssb -bottom-1 md:-bottom-2 -left-0 md:-left-1"
                    v-if="config.promotions != undefined && config.promotions[appComponent.country] != undefined && config.promotions[appComponent.country].version != undefined && config.promotions[appComponent.country].version == 3">
        {{ $t('Conócelo aquí') }}
      </span>
                <!-- Fallback display for promotion item text -->
                <div v-else class="promotion-item-text h-full w-full flex justify-between items-center bg-base-200">
                    <h2 :class="claseH2" class='w-2/3 lg:w-full max-w-[200px] h-auto text-neutral'>
                        {{ $t(item.title) }}
                    </h2>
                    <!-- Button to view promotion details -->
                    <button type="button"
                            class="detail-bono text-neutral hover:bg-success hover:text-neutral hover:border-none transition">
                        {{ $t('VER') }}
                    </button>
                </div>
            </div>
        </div>

    <div
        v-else
        class="font-semibold py-14 text-neutral"
    >
                            <span>{{
                                    $t('En el momento no hay promociones disponibles')
                                }}</span>
    </div>
</template>

<!-- FILE DOCUMENTED -->

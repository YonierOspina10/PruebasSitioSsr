<script lang="ts">
/**
 * Component: Jackpots4SB
 * This Vue component displays a list of jackpots with dynamic images and values.
 * It adjusts the layout and images based on the screen size (desktop or mobile).
 */
import { defineComponent, watch } from 'vue';

export default defineComponent({
    data() {
        return {
            /**
             * Reference to the global app component.
             */
            appComponent: this.$appComponent,

            /**
             * List of jackpots fetched from the global app component.
             */
            jackpotsList: this.$appComponent.jackpotsList,

            /**
             * Array to store the current values of jackpots.
             */
            currentJackpotValues: [] as number[],

            /**
             * Stores active intervals for counters.
             */
            intervals: [] as any[],

            /**
             * Desktop title image for the jackpot section.
             */
            imgTitleDesktop: this.$appComponent.config != undefined && this.$appComponent.config.jackpot2 != undefined &&
            this.$appComponent.config.jackpot2[this.$appComponent.country] != undefined && this.$appComponent.config.jackpot2[this.$appComponent.country].imgTitleDesktop != undefined
                ? this.$appComponent.config.jackpot2[this.$appComponent.country].imgTitleDesktop
                :  '',

            /**
             * Mobile title image for the jackpot section.
             */
            imgTitleMobile: this.$appComponent.config != undefined && this.$appComponent.config.jackpot2 != undefined &&
            this.$appComponent.config.jackpot2[this.$appComponent.country] != undefined && this.$appComponent.config.jackpot2[this.$appComponent.country].imgTitleMobile != undefined
                ? this.$appComponent.config.jackpot2[this.$appComponent.country].imgTitleMobile
                :  '',

            /**
             * Boolean indicating if the screen size is desktop.
             */
            isDesktop: window.innerWidth >= 640,

            /**
             * Desktop background image for the jackpot section.
             */
            imgBackgroundDesktop: this.$appComponent.config != undefined && this.$appComponent.config.jackpot2 != undefined &&
            this.$appComponent.config.jackpot2[this.$appComponent.country] != undefined && this.$appComponent.config.jackpot2[this.$appComponent.country].imgBackgroundDesktop != undefined
                ? this.$appComponent.config.jackpot2[this.$appComponent.country].imgBackgroundDesktop
                :  '',

            /**
             * Mobile background image for the jackpot section.
             */
            imgBackgroundMobile: this.$appComponent.config != undefined && this.$appComponent.config.jackpot2 != undefined &&
            this.$appComponent.config.jackpot2[this.$appComponent.country] != undefined && this.$appComponent.config.jackpot2[this.$appComponent.country].imgBackgroundMobile != undefined
                ? this.$appComponent.config.jackpot2[this.$appComponent.country].imgBackgroundMobile
                :  '',
        };
    },
    created() {
        /**
         * Lifecycle hook: created
         * Initializes the current jackpot values and sets up a resize event listener.
         */
        this.initializeJackpots();

        watch(
            () => this.appComponent.jackpotsList,
            (newVal) => {
                this.jackpotsList = newVal;
                this.clearIntervals();
                this.initializeJackpots();
            },
            { deep: true }
        );

        window.addEventListener('resize', this.updateScreenSize);
    },
    beforeUnmount() {
        /**
         * Lifecycle hook: beforeUnmount
         * Removes the resize event listener before the component is destroyed.
         */
        window.removeEventListener('resize', this.updateScreenSize);
        this.clearIntervals();
    },
    methods: {
        /**
         * Updates the `isDesktop` property based on the current window width.
         */
        updateScreenSize() {
            this.isDesktop = window.innerWidth >= 640;
        },

        /**
         * Initializes jackpot values and starts animated counters.
         */
        initializeJackpots() {
            this.currentJackpotValues = [];

            this.jackpotsList.forEach((jackpot: any, index: number) => {

                /**
                 * Determines initial value based on counterStyle.
                 * counterStyle 1 → decimal
                 * counterStyle 2 or undefined → integer
                 */
                let value =
                    jackpot.counterStyle === 1
                        ? parseFloat(jackpot.currentValue)
                        : parseInt(jackpot.currentValue);

                this.currentJackpotValues.push(value);

                this.startCounter(jackpot, index);
            });
        },

        /**
         * Starts animated counter depending on counterStyle.
         */
        startCounter(jackpot: any, index: number) {

            // Integer style
            if (!jackpot.counterStyle || jackpot.counterStyle === 2) {

                const interval = setInterval(() => {
                    this.currentJackpotValues[index] += 1;
                }, 2000);

                this.intervals.push(interval);

            // Decimal style
            } else if (jackpot.counterStyle === 1) {

                const interval = setInterval(() => {
                    this.currentJackpotValues[index] =
                        parseFloat(this.currentJackpotValues[index].toString()) + 0.09;
                }, 200);

                this.intervals.push(interval);
            }
        },

        /**
         * Clears all active counter intervals.
         */
        clearIntervals() {
            this.intervals.forEach((interval) => clearInterval(interval));
            this.intervals = [];
        },
    },
});
</script>
<template>
    <!-- The main section for displaying jackpots, only visible if jackpotsList is not empty -->
    <section v-if="jackpotsList && jackpotsList.length > 0" class="jackpot-section4">
        <div class="jackpots-fond">
            <div class="jackpots-container">
                <!-- Background image for the jackpot section, changes based on screen size -->
                <img
                    :src="isDesktop ? imgBackgroundDesktop : imgBackgroundMobile"
                    alt="Jackpot Title"
                    class="jackpot-background"
                />

                <!-- Title image for the jackpot section, changes based on screen size -->
                <img
                    :src="isDesktop ? imgTitleDesktop : imgTitleMobile"
                    alt="Jackpot Title"
                    class="jackpot-title"
                />
                <article class="jackpots-wrapper">
                    <!-- Loop through each jackpot in jackpotsList and render a card -->
                    <div
                        v-for="(jackpot, index) in jackpotsList"
                        :key="index"
                        class="jackpot-card4"
                    >
                        <div class="jackpot-card-bottom">
                            <!-- Image for the bottom part of the jackpot card -->
                            <img :src="jackpot.image2" alt="" class="jackpot-card-bottom-image" />
                            <!-- Button to display additional jackpot information -->
                            <button
                                v-if="jackpot.information"
                                class="jackpot-card-button4"
                                :data-analytics-label="`casino:jackpot:${jackpot.name.toLowerCase().replace(/\s+/g, '-')}`"
                                :data-analytics-context="`component:Jackpots4SB|layout:layout-${appComponent.config.layout}`"
                                @click="appComponent.JackpotInformation = jackpot.information"
                            >
                                <!-- SVG icon for the button -->
                                <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_6066_71449)">
                                        <path d="M4 10.0809C4 5.60293 4 3.36293 5.391 1.97193C6.782 0.580933 9.021 0.580933 13.5 0.580933C17.978 0.580933 20.218 0.580933 21.609 1.97193C23 3.36293 23 5.60193 23 10.0809C23 14.5589 23 16.7989 21.609 18.1899C20.218 19.5809 17.979 19.5809 13.5 19.5809C9.022 19.5809 6.782 19.5809 5.391 18.1899C4 16.7989 4 14.5599 4 10.0809Z" fill="#FFCC00"/>
                                        <path d="M13.742 15.0809V10.0809C13.742 9.60993 13.742 9.37393 13.596 9.22693C13.449 9.08093 13.214 9.08093 12.742 9.08093M13.492 6.08093H13.501H13.492Z" fill="#808080"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7419 6.08093C12.7419 5.66672 13.0777 5.33093 13.4919 5.33093H13.5009C13.9152 5.33093 14.2509 5.66672 14.2509 6.08093C14.2509 6.49515 13.9152 6.83093 13.5009 6.83093H13.4919C13.0777 6.83093 12.7419 6.49515 12.7419 6.08093ZM13.3905 8.35583C13.6098 8.38524 13.8888 8.46077 14.1245 8.6948L14.1281 8.6984L14.1281 8.69842C14.3624 8.93436 14.4377 9.21395 14.4671 9.43286C14.4921 9.61998 14.492 9.84157 14.492 10.0466C14.4919 10.0581 14.4919 10.0696 14.4919 10.0809V15.0809C14.4919 15.4951 14.1562 15.8309 13.7419 15.8309C13.3277 15.8309 12.9919 15.4951 12.9919 15.0809V10.0809C12.9919 9.98188 12.9919 9.90156 12.9908 9.83208C12.9213 9.83097 12.841 9.83093 12.7419 9.83093C12.3277 9.83093 11.9919 9.49515 11.9919 9.08093C11.9919 8.66672 12.3277 8.33093 12.7419 8.33093C12.7534 8.33093 12.7649 8.33093 12.7764 8.33092C12.9818 8.33084 13.2034 8.33076 13.3905 8.35583Z" fill="black"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_6066_71449" x="0" y="0.580933" width="27" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="4"/>
                                            <feGaussianBlur stdDeviation="2"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6066_71449"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6066_71449" result="shape"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                            <!-- Jackpot price and currency display -->
                            <div class="jackpotPrice4 jackpot-card-top">
                                <div class="jackpot-img1">
                                    <!-- Image for the jackpot -->
                                    <img :src="jackpot.image" alt="" class="jackpot-card-image" />
                                </div>
                                <div class="jackpot-value1">
                                  <span>
                                    <span>{{ jackpot.currency }}</span>
                                    <span
                                      v-if="!jackpot.counterStyle || jackpot.counterStyle === 2"
                                      :id="`jackpot_${jackpot.id}`"
                                    >
                                      {{ Intl.NumberFormat().format(currentJackpotValues[index]) }}
                                    </span>
                                    <span
                                      v-else-if="jackpot.counterStyle === 1"
                                      :id="`jackpot_${jackpot.id}`"
                                    >
                                      {{
                                        new Intl.NumberFormat('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }).format(currentJackpotValues[index])
                                      }}
                                    </span>

                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.jackpot-img1 {
  width: 35%;
}

.jackpot-value1 {
  width: 65%;
}

.jackpot-background {
  object-fit: fill;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  user-select: none;
  background-color: hsl(var(--bc));
  border-radius: 1.5rem; /* 3 * 0.5rem */
}

.jackpot-section4 {
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 640px) {
  .jackpot-section4 {
    height: 300px;
  }
}

@media (min-width: 1024px) {
  .jackpot-section4 {
    height: 200px;
  }
}

.jackpots-fond {
  position: relative;
  z-index: 1;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 90%;
  gap: 2rem; /* 8 * 0.25rem */
  top: 0;
  background: linear-gradient(
      to bottom right,
      hsl(var(--pc)) ,
      hsl(var(--pc) 20%),
      hsl(var(--pc))
  );
  padding: 0.125rem; /* 0.5 * 0.25rem */
  border-radius: 1.5rem; /* 3 * 0.5rem */
  border: 1px solid #F9DD21;
}

@media (min-width: 640px) {
  .jackpots-fond {
    width: 77%;
    gap: 0;
  }
}

.jackpots-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  gap: 0.75rem; /* 3 * 0.25rem */
  top: 0;
  background-color: hsl(var(--b3));
  border-radius: 1.5rem; /* 3 * 0.5rem */
  padding: 0.25rem; /* 1 * 0.25rem */
}

@media (min-width: 640px) {
  .jackpots-container {
    gap: 0;
  }
}

.jackpot-title {
  width: 30%;
  position: relative;
  z-index: 50;
  top: 0.75rem; /* 3 * 0.25rem */
  max-width: 580px;
}

@media (min-width: 640px) {
  .jackpot-title {
    width: 11%;
    top: -0.75rem;
  }
}


.jackpots-wrapper {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
  height: 100%;
  z-index: 50;
  padding-right: 0;
}

@media (min-width: 640px) {
  .jackpots-wrapper {
    flex-direction: row;
    gap: 1rem;
    height: auto;
    padding-right: 0.25rem;
  }
}

.jackpot-card4 {
  position: relative;
  width: 23rem;
  height: 5rem;
}

@media (min-width: 640px) {
  .jackpot-card4 {
    width: 65rem;
    height: 6rem;
  }
}

.jackpot-card-top {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-weight: bold;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5rem;
}

@media (min-width: 640px) {
  .jackpot-card-top {
    font-size: 2.25rem;
  }
}

.jackpot-card-image {
  width: 9rem;
  height: 100%;
  object-fit: contain;
}

.jackpot-card-button4 {
  position: absolute;
  top: -0.25rem;
  right: 0;
  z-index: 70;
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: all 300ms;
}

.jackpot-card-button4:hover {
  transform: scale(1.05);
}

@media (min-width: 640px) {
  .jackpot-card-button4 {
    top: 0;
    right: -0.75rem;
  }
}

@media (min-width: 768px) {
  .jackpot-card-button4 {
    width: 30px;
    height: 30px;
  }
}

.jackpot-card-bottom {
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
}

@media (min-width: 640px) {
  .jackpot-card-bottom {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}

.jackpot-card-bottom-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-position: center;
}

@media (min-width: 640px) {
  .jackpot-card-bottom-image {
    height: 90%;
  }
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.jackpotPrice4 {
  background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

</style>
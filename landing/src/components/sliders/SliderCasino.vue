<script lang="ts">
import { defineComponent, ref } from "vue"; // Import necessary Vue functions
import apiService from "../../../../SitioVersion5/src/services/ApiService.ts"; // Import API service for data fetching
import { useModalStore } from "../../stores/Modal";
import { toKebabCase } from '@/utils'; // Import modal store for managing modals

// Define the structure of the AppComponent interface
interface AppComponent {
  config: {
    casino: {
      preloaderGame: string; // URL for the preloader game image
    };
    urlVirtualplay: string; // Base URL for virtual play
    urlVirtualplayPython?: string; // Optional URL for Python-based virtual play
  };
  country: string; // Country code
  mobile: string; // Mobile flag
}

// Define the structure of the Slider interface
interface Slider {
  gamesList: any[]; // List of games in the slider
  currentIndex: number; // Current index of the displayed game
}

// Function to simulate loading a component with a delay
const loadComponent = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    },5000) // Simulate a 5-second loading time
  })
}

export default defineComponent({
  props: {
    category: { type: String, default: "1" }, // Category of games
    limit: { type: String, default: "20" }, // Limit of games to fetch
    typelobby: { type: String, default: "0" }, // Type of lobby
    top: { type: Boolean, default: false }, // Flag for top games
    decorationBar: { type: Boolean, default: true }, // Flag for decoration bar visibility
    lowerCaseText: { type: Boolean, default: false }, // Flag for text casing
    title: { type: String, default: "Top Casino" }, // Title of the section
    url: { type: String, default: "" }, // URL for additional resources
    keySlide: { type: Number, default: 1000 }, // Key for the slider
    styleVersion: { type: Number, default: 1 }, // Version of the style to apply
    action: { type: String, default: "getGames2" }, // Action to perform for fetching games
    user: { type: Boolean, default: false }, // User flag
    type: { type: Number, default: 1 }, // Type of component
    icon: { type: String, default: "" }, // Icon URL
  },
  async setup() {
    const dataComponent = ref(await loadComponent()); // Load component data asynchronously
    return {
      dataComponent,
    };
  },
  data() {
      const analyticsAttrs = {}
    return {
      appComponent: (this as any).$appComponent as AppComponent, // App component data
      bgGame: {} as any, // Background game data
      preloaderShow: false, // Flag to show preloader
      sliders: {} as { [key: number]: Slider }, // Object to hold sliders by key
      modals: useModalStore(), // Modal store instance
      src: "", // Source for images or other resources
      margin: 0, // Margin for layout
      startX: 0, // Starting X position for touch/mouse events
      moving: false, // Flag to indicate if sliding is in progress
      threshold: 50, // Threshold for touch/mouse movement
        analyticsAttrs
    };
  },
  mounted() {
    // Fetch games based on the type of component
    if (this.type === 1) {
      this.getCasinoGames(this.keySlide);
    } else if (this.type === 2) {
      this.getCasinoGames2(this.keySlide);
    }

    this.analyticsAttrs = {
        viewAll: {
            'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:view-all`,
            'data-analytics-context': `component:SliderCasino|layout:${this.appComponent.config.layout}`
        },
        arrowPrev: {
            'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-prev`,
            'data-analytics-context': `component:SliderCasino|layout:${this.appComponent.config.layout}`
        },
        arrowNext: {
            'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:arrow-next`,
            'data-analytics-context': `component:SliderCasino|layout:${this.appComponent.config.layout}`
        },
        game: (game: any) => ({
            'data-analytics-id': `${game.id}`,
            'data-analytics-label': `casino:carousel:${toKebabCase(this.title)}:game`,
            'data-analytics-position': `${this.sliders[this.keySlide].gamesList.findIndex((g: any) => g.id === game.id) + 1}`,
            'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|component:SliderCasino|layout:${this.appComponent.config.layout}`,
        })
    }
  },
  methods: {
    // Handle touch start event
    handleTouchStart(event: TouchEvent) {
      this.stopAutoSlide(); // Stop auto sliding
      this.startX = event.touches[0].clientX; // Record starting X position
      this.startY = event.touches[0].clientY; // Record starting Y position
      this.moving = false; // Reset moving flag
      (event.currentTarget as HTMLElement).classList.add('touch-active'); // Add active class
    },
    // Handle touch move event
    handleTouchMove(event: TouchEvent) {
      if (!this.moving) {
        const moveX = event.touches[0].clientX; // Current X position
        const moveY = event.touches[0].clientY; // Current Y position
        const deltaX = this.startX - moveX; // Calculate horizontal movement
        const deltaY = this.startY - moveY; // Calculate vertical movement
        if (Math.abs(deltaX) > this.threshold) { // Check if movement exceeds threshold
          if (deltaX > 0) {
            this.nextSlide(this.keySlide); // Move to next slide
          } else {
            this.prevSlide(this.keySlide); // Move to previous slide
          }
          this.moving = true; // Set moving flag
          this.startX = moveX; // Update starting X position
        }
        if (Math.abs(deltaY) > this.threshold) { // Check vertical movement
          this.moving = true; // Set moving flag
          this.startY = moveY; // Update starting Y position
        }
      }
    },
    // Handle touch end event
    handleTouchEnd(event: TouchEvent) {
      if (this.moving) {
        event.preventDefault(); // Prevent default action if moving
      } else {
        this.startAutoSlide(); // Start auto sliding
        (event.currentTarget as HTMLElement).classList.remove('touch-active'); // Remove active class
      }
    },
    // Handle button touch end event
    handleButtonTouchEnd(event: TouchEvent) {
      if (!this.moving) {
          if(this.appComponent.config.modalLoginVersion != undefined && this.appComponent.config.modalLoginVersion == 1) {
            this.modals.addModal({ showModal: 'ModalLoginV3' }); // Show login modal version 3
          } else if (this.appComponent.config.modalLoginVersion == 2) {
              this.modals.addModal({ showModal: 'ModalLogin6' }); // Show login modal6
          } else {
              this.modals.addModal({ showModal: 'ModalLogin' }); // Show login modal
          }

      }
      event.preventDefault(); // Prevent default action
    },
    // Handle mouse down event
    handleMouseDown(event: MouseEvent) {
      this.stopAutoSlide(); // Stop auto sliding
      this.startX = event.clientX; // Record starting X position
      this.moving = false; // Reset moving flag
      document.addEventListener("mousemove", this.handleMouseMove); // Add mouse move listener
      document.addEventListener("mouseup", this.handleMouseUp); // Add mouse up listener
      event.preventDefault(); // Prevent default action
    },
    // Handle mouse move event
    handleMouseMove(event: MouseEvent) {
      if (!this.moving) {
        const moveX = event.clientX; // Current X position
        const deltaX = this.startX - moveX; // Calculate horizontal movement
        if (Math.abs(deltaX) > this.threshold) { // Check if movement exceeds threshold
          if (deltaX > 0) {
            this.nextSlide(this.keySlide); // Move to next slide
          } else {
            this.prevSlide(this.keySlide); // Move to previous slide
          }
          this.moving = true; // Set moving flag
          this.startX = moveX; // Update starting X position
        }
        event.preventDefault(); // Prevent default action
      }
    },
    // Handle mouse up event
    handleMouseUp() {
      this.startAutoSlide(); // Start auto sliding
      this.moving = false; // Reset moving flag
      document.removeEventListener("mousemove", this.handleMouseMove); // Remove mouse move listener
      document.removeEventListener("mouseup", this.handleMouseUp); // Remove mouse up listener
    },
    // Fetch casino games based on the keySlide
    async getCasinoGames(keySlide: number) {
      this.bgGame = {
        background: `url(${this.appComponent.config.casino.preloaderGame}) no-repeat 0 50%/cover`, // Set background for preloader
      };
      this.preloaderShow = true; // Show preloader
      const optionsGames = {
        action: "getGames2", // Action to fetch games
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Type of lobby
        limit: this.limit, // Limit of games to fetch
        category: this.category, // Category of games
        country: this.appComponent.country, // Country code
        isMobile: this.appComponent.mobile == "1", // Mobile flag
      };
      try {
        const response = await apiService.requestGet(
            `${this.appComponent.config.urlVirtualplay}/cms/products/games/`, // API endpoint for fetching games
            optionsGames
        );
        const json = response.data; // Parse response data
        this.sliders[keySlide] = { gamesList: json.games, currentIndex: 0 }; // Store games in sliders
        Array.prototype.forEach.call(
            document.getElementsByClassName("preload-game-top"),
            (el) => (el as HTMLElement).style.display = "none" // Hide preloader elements
        );
      } catch (error) {
        console.error("Error fetching casino games:", error); // Log error
      }
    },
    // Fetch casino games using a different method
    async getCasinoGames2(keySlide: number) {
      const optionsGames = {
        action: this.action, // Action to fetch games
        partner_id: (window as any).cconfig.partner, // Partner ID from global config
        offset: 0, // Offset for pagination
        typelobby: this.typelobby, // Type of lobby
        limit: 25, // Limit of games to fetch
        category: "all", // Category of games
        provider: "all", // Provider of games
        country: this.appComponent.country, // Country code
        isMobile: this.appComponent.mobile == "1", // Mobile flag
      };
      try {
        const response = await apiService.requestGet(
            this.appComponent.config.urlVirtualplayPython
                ? this.appComponent.config.urlVirtualplayPython
                : "https://gameservice.virtualsoft.tech/", // API endpoint for fetching games
            optionsGames
        );
        this.sliders[keySlide] = { gamesList: response.data.games, currentIndex: 0 }; // Store games in sliders
      } catch (error) {
        console.error("Error fetching casino games2:", error); // Log error
      }
    },
    // Move to the next slide
    nextSlide(keySlide: number) {
      if (this.sliders[keySlide]) {
        this.sliders[keySlide].currentIndex =
            (this.sliders[keySlide].currentIndex + 1) %
            this.sliders[keySlide].gamesList.length; // Update current index
        this.updateSlidePosition(keySlide); // Update slide position
      }
    },
    // Move to the previous slide
    prevSlide(keySlide: number) {
      if (this.sliders[keySlide]) {
        this.sliders[keySlide].currentIndex =
            (this.sliders[keySlide].currentIndex -
                1 +
                this.sliders[keySlide].gamesList.length) %
            this.sliders[keySlide].gamesList.length; // Update current index
        this.updateSlidePosition(keySlide); // Update slide position
      }
    },
    // Update the position of the slide based on the current index
    updateSlidePosition(keySlide: number) {
      const container = document.querySelector(
          `.carousel-container[data-key="${keySlide}"]`
      ) as HTMLElement; // Select the carousel container
      if (!container || !this.sliders[keySlide]) return; // Exit if container or slider is not found
      const slideWidth = document.querySelector(".slide")?.clientWidth || 0; // Get width of a slide
      const gap = 10; // Gap between slides
      const totalSlides = this.sliders[keySlide].gamesList.length; // Total number of slides
      const visibleWidth = container.clientWidth; // Width of the visible area
      const visibleSlides = Math.floor(visibleWidth / (slideWidth + gap)); // Calculate visible slides
      const maxVisibleIndex = Math.max(totalSlides - visibleSlides, 0); // Calculate max visible index
      this.sliders[keySlide].currentIndex = Math.min(
          this.sliders[keySlide].currentIndex,
          maxVisibleIndex // Ensure current index does not exceed max
      );
      const translateX =
          this.sliders[keySlide].currentIndex * (slideWidth + gap); // Calculate translation for slide
      container.style.transform = `translateX(-${translateX}px)`; // Apply translation
    },
    // Get the class for the slide based on the style version
    getSlideClass() {
      return this.styleVersion == 2
										? 'border-solid border-2 border-[#3d4958] w-40 h-40 mr-14'
										: this.styleVersion == 3
										? 'w-[7.6rem] h-[5.4rem] md:w-[13rem] md:h-36 border-solid border-1 border-primary mr-8 md:mr-5'
										: 'h-48 w-48'; // Default style
    },
    // Get the image class based on object fit property
    getImageClass(objectFit: string) {
      return `absolute top-0 w-full h-full z-20 object-${objectFit}`; // Class for image styling
    },
    // Stop auto sliding
    stopAutoSlide() {
    },
    // Start auto sliding
    startAutoSlide() {
    },
  },
});
</script>
<template>
  <!-- Main slider component for displaying casino games -->
  <SliderCasinoV3
      class="relative z-10"
      v-if="
      appComponent.config.layout != undefined && appComponent.config.layout == 4
    "
      :games-list="sliders[keySlide]?.gamesList"
      :top="top"
      :style-version="styleVersion"
      :decoration-bar="decorationBar"
  />
  <!-- Section for displaying games if available -->
  <section
      v-if="
      sliders[keySlide]?.gamesList.length > 0 &&
      appComponent.config.layout != undefined &&
      appComponent.config.layout != 4
    "
      class="flex justify-center items-center w-full"
  >
    <div class="max-w-[1300px] w-11/12 relative">
      <div class="relative flex justify-between items-center">
        <div class="w-auto h-auto flex flex-col mb-4">
          <div class="w-auto h-auto py-1 flex gap-3">
            <img v-if="icon" :src="icon" alt="Icon" class="w-8 h-8 object-contain" /> <!-- Display icon if available -->
        <h3
            :class="[
            lowerCaseText ? 'capitalize font-light' : 'uppercase font-bold',
          ]"
            class="text-neutral text-xl mt-1"
            aria-label="Casino bets"
        >
          {{ title }} <!-- Display title -->
           </h3>
          </div>
        <div
            v-if="decorationBar"
            class="h-1 w-full rounded-full"
            :class="
							styleVersion == 1
								? 'bg-accent-content'
								: 'bg-accent'"
        ></div> <!-- Decoration bar -->
        </div>
        
        <div class="flex gap-1">
          <button
              @click="prevSlide(keySlide)"
              class="cursor-pointer hover:scale-125 transition-transform duration-300 p-4"
              aria-label="Previous slide"
              v-bind="analyticsAttrs.arrowPrev"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-left"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
          <button
              @click="nextSlide(keySlide)"
              class="cursor-pointer hover:scale-125 transition-transform duration-300 p-4"
              aria-label="Next slide"
              v-bind="analyticsAttrs.arrowNext"
          >
            <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="text-neutral/50 text-2xl hover:text-neutral"
            />
          </button>
        </div>
      </div>
      <div class="h-full w-full">
        <div class="h-full w-full overflow-hidden">
          <div
              class="carousel-container flex"
              :data-key="keySlide"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              @mousedown="handleMouseDown"
          >
            <div
                v-for="(game, index) in sliders[keySlide]?.gamesList"
                :key="index"
                :class="getSlideClass() + ' relative group'"
                class="slide rounded-xl overflow-hidden"
            >
              <button
                  @touchend="handleButtonTouchEnd"
                  @click.stop="() => appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 1
                       ? modals.addModal({ showModal: 'ModalLoginV3' })
                       : appComponent.config.modalLoginVersion != undefined && appComponent.config.modalLoginVersion == 2
                       ? modals.addModal({ showModal: 'ModalLogin6' })
                       : modals.addModal({ showModal: 'ModalLogin' })"
                  class="relative w-full h-full"
                  aria-label="Play game"
                    v-bind="analyticsAttrs.game(game)"
              >
                <img
                    v-show="game.icon_3"
                    v-lazy="game.icon_3"
                    alt="Game image"
                    :class="
                    getImageClass(game.object_fit) +
                    ' duration-300 z-20 hover:z-10 '
                  "
                />
                <!--
                  Displays total players and table status ("En juego" / "Cerrado") if available in `dgaDataMap` for the game.
                  Player count: prefers `totalSeatedPlayers`, then `numberOfPlayers`, defaults to '0'.
                  Styled at bottom-left with gradient background and small text.
                -->
                <div
                    v-if="appComponent.dgaDataMap != undefined && appComponent.dgaDataMap[game.front_game_id] != undefined && appComponent.dgaDataMap[game.front_game_id]"
                    class="absolute z-20 bottom-2 left-2 px-2 py-1 rounded-lg bg-gradient-to-r from-black/30 to-black/50 text-white backdrop-blur-md shadow-md text-[11px] leading-tight space-y-0.5 min-w-[60px]"
                >
                  <div class="flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span class="font-semibold">
                                              {{
                        appComponent.dgaDataMap[game.front_game_id].totalSeatedPlayers
                        ?? appComponent.dgaDataMap[game.front_game_id].numberOfPlayers
                        ?? '0'
                      }}
                                            </span>
                  </div>
                  <div
                      :class="{
                                                'text-green-300 font-medium': appComponent.dgaDataMap[game.front_game_id].tableOpen,
                                                'text-red-400 font-medium': !appComponent.dgaDataMap[game.front_game_id].tableOpen
                                              }"
                  >
                    {{
                      appComponent.dgaDataMap[game.front_game_id].tableOpen
                          ? $t('En juego')
                          : $t('Cerrado')
                    }}
                  </div>
                </div>
                <div
                    class="absolute bottom-0 z-10 hover:z-20 h-full w-full flex flex-col justify-center items-center gap-4 p-2 duration-300"
                    :class="
											styleVersion == 4
												? 'hover:bg-base-content/70 hover:border-3 hover:border-accent hover:rounded-xl hover:backdrop-blur-sm'
												: 'hover:bg-neutral-content/50'
										"
                >
                  <p
                      class="text-neutral text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
                  >
                    {{ game.name.toLowerCase() }} <!-- Display game name -->
                  </p>
                  <button
                      class="w-40 bg-secondary text-neutral text-xs lg:text-base rounded-full font-bold p-2 uppercase hover:scale-105 transition-transform duration-300"
                      aria-label="Play now"
                      v-bind="analyticsAttrs.game(game)"
                  >
                    {{ "Jugar ahora" }} <!-- Play now button -->
                  </button>
                </div>
                <span
                    v-if="top"
                    class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
                >{{ "TOP" }}</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.carousel-container {
  display: flex; /* Flexbox layout for carousel */
  transition: transform 0.3s ease-in-out; /* Smooth transition for slide movement */
}
.slide {
  flex: 0 0 auto; /* Prevent slides from shrinking */
  width: 200px; /* Fixed width for slides */
  height: 200px; /* Fixed height for slides */
  margin-right: 10px; /* Margin between slides */
}
.slide img {
  width: 100%; /* Full width for images */
  height: 100%; /* Full height for images */
  object-fit: cover; /* Cover the slide area */
}
.slidePrev {
  left: 0; /* Position for previous slide */
}
.slideNext {
  right: 0; /* Position for next slide */
}
.game-hover-content {
  display: none; /* Initially hide hover content */
  position: absolute; /* Absolute positioning */
  top: 0; /* Align to top */
  left: 0; /* Align to left */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  z-index: 1; /* Layer above other content */
  color: white; /* Text color */
  justify-content: center; /* Center content */
  align-items: center; /* Center content */
  display: flex; /* Flexbox for content alignment */
  text-align: center; /* Center text */
}
.slide:hover .game-hover-content {
  display: flex; /* Show hover content on slide hover */
}
.touch-active .game-hover-content {
  display: flex !important; /* Force display of hover content when touch is active */
}
</style>

<!-- FILE DOCUMENTED -->

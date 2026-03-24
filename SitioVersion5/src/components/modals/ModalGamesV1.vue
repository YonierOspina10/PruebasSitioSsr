<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import ExitIcon from '../icons/ExitIcon.vue';
import { toKebabCase } from '@/utils'; // Importing the ExitIcon component

export default defineComponent({
  data() {
    // Initializing component data
    let config = this.$config(); // Fetching configuration data
    let emitter = this.$emitter(); // Fetching event emitter
    let appComponent: any = this.$appComponent; // Fetching application component reference
    let src: string = ''; // Initializing source string for iframe

    return {
      config, // Exposing config to the template
      emitter, // Exposing emitter to the template
      appComponent, // Exposing appComponent to the template
      src, // Exposing src to the template
      isFullscreen: false,
      showFullscreenMenu: false,
    };
  },
  mounted() {
    this.updateViewportHeight();

    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        'resize',
        this.updateViewportHeight
      );
    }

    window.addEventListener('orientationchange', this.updateViewportHeight);
  },

  beforeUnmount() {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        'resize',
        this.updateViewportHeight
      );
    }

    window.removeEventListener('orientationchange', this.updateViewportHeight);
  },
  methods: {
    updateViewportHeight() {
      if (!this.isFullscreen) return;
        
      const height = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
        
      const modal = document.getElementById('big-games');
      if (modal) {
        modal.style.height = `${height}px`;
      }
    },
    // Method to close the game and navigate to the appropriate route
    closeGame() {
      this.isFullscreen = false;
      this.showFullscreenMenu = false;
      if (this.$route.path.indexOf('new-casino') != -1) {
        window.history.pushState('', '', '/new-casino'); // Navigate to new-casino
      } else {
        if (this.$route.path.indexOf('live-casino-vivo') != -1) {
          window.history.pushState('', '', '/live-casino-vivo'); // Navigate to live-casino-vivo
        } else {
          if (this.$route.path.indexOf('virtuales-lobby') != -1) {
            window.history.pushState('', '', '/virtuales-lobby'); // Navigate to virtuales-lobby
          }
        }
      }
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
        
      this.$nextTick(() => {
        if (this.isFullscreen) {
          this.updateViewportHeight();
        
          const el = document.getElementById('big-games');
          if (el?.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
          } else if ((el as any)?.webkitRequestFullscreen) {
            (el as any).webkitRequestFullscreen();
          }
        } else {
          this.showFullscreenMenu = false;
        
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        }
      });
    },
    toggleFullscreenMenu() {
      this.showFullscreenMenu = !this.showFullscreenMenu;
    },
  },
    computed: {
        analyticsAttrs() {
            return {
                fullscreenToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:fullscreen`,
                    'data-analytics-context': `component:ModalGamesV1|layout:${this.appComponent.config.layout}`,
                },
                closeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:close`,
                    'data-analytics-context': `component:ModalGamesV1|layout:${this.appComponent.config.layout}`,
                },
                homeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:home`,
                    'data-analytics-context': `component:ModalGamesV1|layout:${this.appComponent.config.layout}`,
                },
                refreshToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:refresh`,
                    'data-analytics-context': `component:ModalGamesV1|layout:${this.appComponent.config.layout}`,
                },
            };
        }
    },
  components: { ExitIcon }, // Registering the ExitIcon component
});
</script>

<template>
  <!-- Main modal container for the game, displayed conditionally based on appComponent.showGame -->
  <div
      class="inModal fixed left-0 top-0 w-full h-full bg-base-300 flex flex-col items-center gap-2 py-3 md:py-3"
      v-if="appComponent.showGame"
      :style="{ zIndex: isFullscreen ? 99999 : 999 }"
      id="big-games"
  >
    <div class="w-[85vw] md:w-[95vw] flex flex-col gap-4 md:gap-4">
      <div class="w-full flex justify-between items-center" :class="{ 'hidden': isFullscreen }" > <!-- Header section of the modal -->
        <img
            v-lazy="
                              config.logo_ != undefined &&
                config.logo_['dark'] != undefined &&
                config.logo_['light'] != undefined &&
                !appComponent.themeSportbook
                  ? config.logo_['dark']
                  : config.logo_['light']
                  "
            class="h-10"
        />
        <div class="h-full flex justify-center items-center gap-4"> <!-- Controls section -->
          <font-awesome-icon
              v-if="config.casino.inGame.refresh"
              icon="fa-solid fa-rotate-right"
              size="1x"
              class="text-neutral text-2xl cursor-pointer"
              v-bind="analyticsAttrs.refreshToggle"
              @click="appComponent.openGame(appComponent.gameSelected)"
          />
          <button
              class="flex items-center z-200 justify-center w-9 h-9 p-2 rounded-full bg-primary"
              @click="toggleFullscreen"
              v-bind="analyticsAttrs.fullscreenToggle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 16H4C4.28333 16 4.52083 16.0958 4.7125 16.2875C4.90417 16.4792 5 16.7167 5 17C5 17.2833 4.90417 17.5208 4.7125 17.7125C4.52083 17.9042 4.28333 18 4 18H1C0.716667 18 0.479167 17.9042 0.2875 17.7125C0.0958333 17.5208 0 17.2833 0 17V14C0 13.7167 0.0958333 13.4792 0.2875 13.2875C0.479167 13.0958 0.716667 13 1 13C1.28333 13 1.52083 13.0958 1.7125 13.2875C1.90417 13.4792 2 13.7167 2 14V16ZM16 16V14C16 13.7167 16.0958 13.4792 16.2875 13.2875C16.4792 13.0958 16.7167 13 17 13C17.2833 13 17.5208 13.0958 17.7125 13.2875C17.9042 13.4792 18 13.7167 18 14V17C18 17.2833 17.9042 17.5208 17.7125 17.7125C17.5208 17.9042 17.2833 18 17 18H14C13.7167 18 13.4792 17.9042 13.2875 17.7125C13.0958 17.5208 13 17.2833 13 17C13 16.7167 13.0958 16.4792 13.2875 16.2875C13.4792 16.0958 13.7167 16 14 16H16ZM2 2V4C2 4.28333 1.90417 4.52083 1.7125 4.7125C1.52083 4.90417 1.28333 5 1 5C0.716667 5 0.479167 4.90417 0.2875 4.7125C0.0958333 4.52083 0 4.28333 0 4V1C0 0.716667 0.0958333 0.479167 0.2875 0.2875C0.479167 0.0958333 0.716667 0 1 0H4C4.28333 0 4.52083 0.0958333 4.7125 0.2875C4.90417 0.479167 5 0.716667 5 1C5 1.28333 4.90417 1.52083 4.7125 1.7125C4.52083 1.90417 4.28333 2 4 2H2ZM16 2H14C13.7167 2 13.4792 1.90417 13.2875 1.7125C13.0958 1.52083 13 1.28333 13 1C13 0.716667 13.0958 0.479167 13.2875 0.2875C13.4792 0.0958333 13.7167 0 14 0H17C17.2833 0 17.5208 0.0958333 17.7125 0.2875C17.9042 0.479167 18 0.716667 18 1V4C18 4.28333 17.9042 4.52083 17.7125 4.7125C17.5208 4.90417 17.2833 5 17 5C16.7167 5 16.4792 4.90417 16.2875 4.7125C16.0958 4.52083 16 4.28333 16 4V2Z" fill="#FBFBFB"/>
            </svg>
          </button>
          <button
              @click="
                      appComponent.showGame = false;
                      closeGame();
                    "
              class="flex items-center justify-center w-9 h-9 rounded-full bg-red-500"
              v-bind="analyticsAttrs.closeToggle"
          >
            <font-awesome-icon
                icon="fa-solid fa-xmark"
                class="text-white text-base"
            />
          </button>
          <div v-if="config.casino.inGame.home"> <!-- Conditional rendering for home icon -->
            <a
                title="home"
                @click="appComponent.showGame = false"
                v-bind="analyticsAttrs.homeToggle"
            ><span class="icon-home1 text-neutral"></span
            ></a>
          </div>
        </div>
      </div>
      <div
          class="transition-all duration-300 flex-1 flex"
          :class="isFullscreen 
            ? 'fixed inset-0 z-[500] bg-black overflow-hidden pointer-events-none' 
            : 'overflow-hidden'"
        >
        <iframe
            id="game-content"
            number-of-window="1"
            aspect-ratio="16:9"
            :src="appComponent.src"
            class="transition-all duration-300 pointer-events-auto"
            :class="isFullscreen ? 'w-screen h-full rounded-none m-0' : 'w-full h-[80vh] rounded-xl md:h-[85vh] md:m-auto'"
            allow="clipboard-read; clipboard-write"
        ></iframe>
      </div>
    </div>
    <div
        v-if="isFullscreen"
        class="fixed top-0 left-0 w-full z-[650] pointer-events-auto"
    >
      <div class="relative w-full bg-base-100 rounded-bl-2xl rounded-br-2xl">
        <div
            class="overflow-hidden transition-all duration-300"
            :class="showFullscreenMenu ? 'max-h-60' : 'max-h-0'"
        >
          <div
              class="px-4 pt-4 pb-5 mx-auto w-[95%] max-w-2xl flex gap-3 transition-opacity duration-200"
              :class="showFullscreenMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          >
            <button
                @click="
                    appComponent.showGame = false;
                    closeGame();
                  "
                class="flex-1 border-2 border-neutral rounded-full p-3 flex items-center justify-center gap-2 text-white whitespace-nowrap"
                v-bind="analyticsAttrs.closeToggle"
            >
              <span>Cerrar juego</span>
              <font-awesome-icon
                  icon="fa-solid fa-xmark"
                  class="text-2xl"
              />
            </button>

            <button
                @click="toggleFullscreen"
                class="flex-1 border-2 border-neutral rounded-full p-3 flex items-center justify-center gap-2 text-white whitespace-nowrap z-10"
                v-bind="analyticsAttrs.fullscreenToggle"
            >
              <span>Salir de pantalla completa</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.09425 14.148L1.27125 16.9713C1.13275 17.1096 0.958667 17.1804 0.749 17.1838C0.5395 17.1869 0.36225 17.1161 0.21725 16.9713C0.0724167 16.8263 0 16.6506 0 16.4443C0 16.2378 0.0724167 16.0621 0.21725 15.9173L3.0405 13.0943H0.84425C0.63175 13.0943 0.453667 13.0223 0.31 12.8785C0.166167 12.7347 0.0942501 12.5565 0.0942501 12.344C0.0942501 12.1313 0.166167 11.9533 0.31 11.8098C0.453667 11.6661 0.63175 11.5943 0.84425 11.5943H4.6905C4.9465 11.5943 5.16117 11.6808 5.3345 11.854C5.50767 12.0273 5.59425 12.242 5.59425 12.498V16.3443C5.59425 16.5568 5.52233 16.7348 5.3785 16.8785C5.23467 17.0223 5.0565 17.0943 4.844 17.0943C4.63133 17.0943 4.45325 17.0223 4.30975 16.8785C4.16608 16.7348 4.09425 16.5568 4.09425 16.3443V14.148ZM13.0943 14.148V16.3443C13.0943 16.5568 13.0223 16.7348 12.8785 16.8785C12.7347 17.0223 12.5565 17.0943 12.344 17.0943C12.1313 17.0943 11.9533 17.0223 11.8098 16.8785C11.6661 16.7348 11.5943 16.5568 11.5943 16.3443V12.498C11.5943 12.242 11.6808 12.0273 11.854 11.854C12.0273 11.6808 12.242 11.5943 12.498 11.5943H16.3443C16.5568 11.5943 16.7348 11.6662 16.8785 11.81C17.0223 11.9538 17.0943 12.132 17.0943 12.3445C17.0943 12.5572 17.0223 12.7353 16.8785 12.8788C16.7348 13.0224 16.5568 13.0943 16.3443 13.0943H14.148L16.9713 15.9173C17.1096 16.0557 17.1804 16.2298 17.1838 16.4395C17.1869 16.649 17.1161 16.8263 16.9713 16.9713C16.8263 17.1161 16.6506 17.1885 16.4443 17.1885C16.2378 17.1885 16.0621 17.1161 15.9173 16.9713L13.0943 14.148ZM3.0405 4.09425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537917 0 0.74425 0C0.95075 0 1.12642 0.0724167 1.27125 0.21725L4.09425 3.0405V0.844251C4.09425 0.63175 4.16617 0.453667 4.31 0.310001C4.45383 0.166167 4.632 0.0942505 4.8445 0.0942505C5.05717 0.0942505 5.23525 0.166167 5.37875 0.310001C5.52242 0.453667 5.59425 0.63175 5.59425 0.844251V4.6905C5.59425 4.9465 5.50767 5.16117 5.3345 5.3345C5.16117 5.50767 4.9465 5.59425 4.6905 5.59425H0.84425C0.63175 5.59425 0.453667 5.52233 0.31 5.3785C0.166167 5.23467 0.0942501 5.0565 0.0942501 4.844C0.0942501 4.63133 0.166167 4.45325 0.31 4.30975C0.453667 4.16608 0.63175 4.09425 0.84425 4.09425H3.0405ZM14.148 4.09425H16.3443C16.5568 4.09425 16.7348 4.16617 16.8785 4.31C17.0223 4.45383 17.0943 4.632 17.0943 4.8445C17.0943 5.05717 17.0223 5.23525 16.8785 5.37875C16.7348 5.52242 16.5568 5.59425 16.3443 5.59425H12.498C12.242 5.59425 12.0273 5.50767 11.854 5.3345C11.6808 5.16117 11.5943 4.9465 11.5943 4.6905V0.844251C11.5943 0.63175 11.6662 0.453667 11.81 0.310001C11.9538 0.166167 12.132 0.0942505 12.3445 0.0942505C12.5572 0.0942505 12.7353 0.166167 12.8788 0.310001C13.0224 0.453667 13.0943 0.63175 13.0943 0.844251V3.0405L15.9173 0.21725C16.0557 0.0789167 16.2298 0.00808339 16.4395 0.00475006C16.649 0.00158339 16.8263 0.0724167 16.9713 0.21725C17.1161 0.36225 17.1885 0.537917 17.1885 0.74425C17.1885 0.95075 17.1161 1.12642 16.9713 1.27125L14.148 4.09425Z" fill="#FBFBFB"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="relative w-full h-2 flex justify-center">
          <div class="absolute -top-6 w-16 h-16 bg-base-100 rounded-full"></div>
          <button
              @click="toggleFullscreenMenu"
              class="absolute w-10 h-10 rounded-full bg-base-100 flex items-center justify-center shadow-lg"
              v-bind="analyticsAttrs.fullscreenToggle"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="10"
                viewBox="0 0 24 14"
                fill="none"
                class="transition-transform duration-300"
                :class="showFullscreenMenu ? 'rotate-180' : ''"
            >
              <path
                  d="M12 14L0 2L2.1 0L12 9.8L21.9 0L24 2L12 14Z"
                  fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes circle-in-center {
  from {
    clip-path: circle(0%);
  }
  to {
    clip-path: circle(125%);
  }
}
/* Animation for modal appearance */
.inModal {
  animation: 2.5s cubic-bezier(0.25, 1, 0.3, 1) circle-in-center both;
}
</style>

<!-- FILE DOCUMENTED -->

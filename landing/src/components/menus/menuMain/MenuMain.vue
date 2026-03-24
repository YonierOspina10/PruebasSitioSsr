<script lang="ts">
import { defineComponent } from "vue"; // Importing the defineComponent function from Vue
import { useGlobalStore } from "../../../stores/Global.ts"; // Importing the global store for state management
import ExitIcon from "../../icons/ExitIcon.vue"; // Importing the ExitIcon component
import SelectLanguage from "../../i18n/SelectLanguage.vue";
import apiService from '../../../../../SitioVersion5/src/services/ApiService.ts'; // Importing the SelectLanguage component

export default defineComponent({
  components: {
    SelectLanguage, // Registering the SelectLanguage component
    ExitIcon, // Registering the ExitIcon component
  },
  data() {
    let appComponent: any = this.$appComponent; // Reference to the app component
    let onTitles: boolean = false; // State to track if titles are displayed
    let globalStore = useGlobalStore(); // Accessing the global store
    let openSelectLang: boolean = false; // State to track if the language selector is open
    let currentIndex: number = 0; // Current index for carousel navigation
    let isBlocked: boolean = false; // State to block navigation in the carousel
    let gifs: any = appComponent.config.gifs != undefined && appComponent.config.gifs.length > 0 ? appComponent.config.gifs : 
                    appComponent.config.header != undefined && appComponent.config.header.gifs != undefined && appComponent.config.header.gifs[appComponent.country] != undefined && appComponent.config.header.gifs[appComponent.country].length > 0 ? appComponent.config.header.gifs[appComponent.country] : []; // Fetching GIFs based on configuration
    let ligthMode = false; // State for dark mode
    let moonIcon = ''; // Icon for moon
    let sunIcon = ''; // Icon for sun
    let localStorageC = '';
    return {
      appComponent,
      onTitles,
      globalStore,
      openSelectLang,
      currentIndex, 
      isBlocked, 
      gifs,
        ligthMode,
        moonIcon,
        sunIcon,
        localStorageC
    };
  },
  created() {
    // Lifecycle hook called after the component is created
    if (
        this.appComponent.config["not_login"] != undefined &&
        this.appComponent.config["not_login"]["menu_"] != undefined
    ) {
      // Setting up menu configuration for users not logged in
      this.appComponent.config.MENU_NOLOGUEADO = {
        [this.appComponent.config.countryL]: [],
      };
      this.appComponent.config.MENU_NOLOGUEADO[
          this.appComponent.config.countryL
          ] = this.appComponent.config["not_login"]["menu_"];
      this.appComponent.config.MENU_NOLOGUEADO_MOBILE = {
        [this.appComponent.config.countryL]: [],
      };
      this.appComponent.config.MENU_NOLOGUEADO_MOBILE[
          this.appComponent.config.countryL
          ] = this.appComponent.config["not_login"]["menu_"];
    }
  },
  mounted() {
      this.localStorageC = localStorage.getItem('changeThemeColor')

      console.log(this.localStorageC);
      if (this.localStorageC == 'true') {
          this.ligthMode = true;
          this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
          this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
          console.log('ligthMode', this.ligthMode);
          if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined){
              let deviceTheme = '';
              if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                  console.log('entraa D');
                  deviceTheme = 'theme_colors_ligth_desktop';
              } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                  console.log('entraa M');
                  deviceTheme = 'theme_colors_ligth_mobile';
              }
              this.setThemeColor(deviceTheme);

              this.appComponent.gAnalytics('change_theme_color_ligth');
          }
      }
      else {
          this.ligthMode = false;
          this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
          this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
          let deviceTheme = '';
          if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
              deviceTheme = 'theme_colors_desktop';
          } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
              deviceTheme = 'theme_colors_mobile';
          }
          this.setThemeColor(deviceTheme);

          this.appComponent.gAnalytics('change_theme_color_dark');
      }
  },
  methods: {
    /**
     * Generates a srcset string for responsive images.
     * @param {string} imageUrl - The base URL of the image.
     * @param {number[]} sizes - An array of sizes for the srcset.
     * @returns {string} - The generated srcset string.
     */
    getSrcset(imageUrl: string, sizes = [480, 768, 1024, 1440]) {
      if (!imageUrl) return ""; // Return empty string if no image URL is provided
      const baseUrl = imageUrl.split("?")[0]; // Extracting base URL
      return sizes
          .map(size => `${baseUrl}?w=${size}&fm=webp ${size}w`) // Generating srcset entries
          .join(", "); // Joining entries with a comma
    },
    onOpenChat() {
      this.closeMenu(); // Closing the menu when opening chat
      window.addEventListener("message", function (e) {
        if (e.data.status === "hide") {
          // Hiding chat iframe based on message
          document
              .getElementById("centribal_iframe_layout")
              ?.classList.remove("centribal_open");
          document
              .getElementById("centribal_iframe_layout")
              ?.classList.add("centribal_hidden");
        }
      });
      const chat: any = document.getElementById("centribal_iframe_layout"); // Getting chat iframe element
      if (chat) {
        let ref_id: any = "cen_ifr_static"; // Reference ID for chat
        document
            .getElementById("centribal_iframe_layout")
            ?.classList.add("centribal_open"); // Showing chat iframe
        document
            .getElementById("centribal_iframe_layout")
            ?.classList.remove("centribal_hidden");
        postMessage("show_chat", "", ref_id); // Sending message to show chat
      } else {
        const div = document.createElement("div");
        div.setAttribute("id", "centribal_iframe_layout"); // Creating chat iframe layout
        div.classList.add("centribal_hidden");
        document.querySelector("body")?.appendChild(div); // Appending layout to body
        const script = document.createElement("script");
        script.setAttribute("id", "cen_snippet_static");
        script.setAttribute("control_iframe", ""); // Control iframe attribute
        script.setAttribute(
            "src",
            this.appComponent.config.zendesk[this.appComponent.country].key // Script source for Zendesk
        );
        script.setAttribute("type", "text/javascript");
        document.querySelector("body")?.appendChild(script); // Appending script to body
        let ref_id: any = "cen_ifr_static"; // Reference ID for chat
        const iframe = document.createElement("iframe");
        iframe.setAttribute("id", ref_id); // Setting ID for iframe
        iframe.src =
            this.appComponent.config.zendesk[this.appComponent.country].key; // Setting source for iframe
        document.getElementById("centribal_iframe_layout")?.appendChild(iframe); // Appending iframe to layout
        iframe.onload = function () {
          setTimeout(() => {
            document
                .getElementById("centribal_iframe_layout")
                ?.classList.add("centribal_open"); // Showing chat iframe after loading
          }, 1000);
          document
              .getElementById("centribal_iframe_layout")
              ?.classList.remove("centribal_hidden");
          postMessage("show_chat", "", ref_id); // Sending message to show chat
        };
      }
    },
    openMenu() {
      this.globalStore.onMenuMain = true; // Opening main menu in global store
      this.onTitles = true; // Setting titles to be displayed
    },
    closeMenu() {
      this.globalStore.onMenuMain = false; // Closing main menu in global store
      this.onTitles = false; // Hiding titles
    },
      hexToHsl(H) {
          if (H !== undefined) {
              let r = 0,
                  g = 0,
                  b = 0;
              if (H.length == 4) {
                  r = '0x' + H[1] + H[1]; // Convert shorthand hex to full hex
                  g = '0x' + H[2] + H[2];
                  b = '0x' + H[3] + H[3];
              } else if (H.length == 7) {
                  r = '0x' + H[1] + H[2]; // Convert full hex to RGB
                  g = '0x' + H[3] + H[4];
                  b = '0x' + H[5] + H[6];
              }
              r /= 255; // Normalize red
              g /= 255; // Normalize green
              b /= 255; // Normalize blue
              let cmin = Math.min(r, g, b),
                  cmax = Math.max(r, g, b),
                  delta = cmax - cmin,
                  h = 0,
                  s = 0,
                  l = 0;
              if (delta == 0) h = 0; // No hue if delta is 0
              else if (cmax == r) h = ((g - b) / delta) % 6; // Calculate hue
              else if (cmax == g) h = (b - r) / delta + 2;
              else h = (r - g) / delta + 4;
              h = Math.round(h * 60); // Convert hue to degrees
              if (h < 0) h += 360; // Adjust hue if negative
              l = (cmax + cmin) / 2; // Calculate lightness
              s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Calculate saturation
              s = +(s * 100).toFixed(1); // Convert saturation to percentage
              l = +(l * 100).toFixed(1); // Convert lightness to percentage
              return '' + h + ' ' + s + '% ' + l + '%'; // Return HSL string
          } else {
              return ''; // Return empty string if input is undefined
          }
      },
      changeLigthMode() {
          this.ligthMode = !this.ligthMode; // Toggle light mode
          this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png'
          this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png'
          localStorage.setItem('changeThemeColor', 'true');
          this.appComponent.themeSportbook = true;
          if(this.ligthMode && this.appComponent.config != undefined && this.appComponent.config.theme_colors_ligth_desktop != undefined) {
              console.log(this.appComponent.themeSportbook);
              let deviceTheme = '';

              if (this.appComponent.config.theme_colors_ligth_desktop != undefined && this.appComponent.config.mobileL == '') {
                  deviceTheme = 'theme_colors_ligth_desktop';
              } else if (this.appComponent.config.theme_colors_ligth_mobile != undefined && this.appComponent.config.mobileL != '') {
                  deviceTheme = 'theme_colors_ligth_mobile';
              }
              this.setThemeColor(deviceTheme);

              this.appComponent.gAnalytics('change_theme_color_ligth');
          }
          else {
              this.moonIcon = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png'
              this.sunIcon = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png'
              localStorage.setItem('changeThemeColor', 'false');
              this.appComponent.themeSportbook = false;
              console.log(this.appComponent.themeSportbook);
              let deviceTheme = '';
              if (this.appComponent.config.theme_colors_desktop != undefined && this.appComponent.config.mobileL == '') {
                  deviceTheme = 'theme_colors_desktop';
              } else if (this.appComponent.config.theme_colors_mobile != undefined && this.appComponent.config.mobileL != '') {
                  deviceTheme = 'theme_colors_mobile';
              }
              this.setThemeColor(deviceTheme);

              this.appComponent.gAnalytics('change_theme_color_dark');
          }
      },
     setThemeColor(device){
          let rootTailwind = document.createElement('style'); // Create a style element for Tailwind CSS variables
          rootTailwind.textContent = `
    	        :root {
				--pf: ${this.hexToHsl(this.appComponent.config[device].primary_focus)} !important;
				--sf: ${this.hexToHsl(this.appComponent.config[device].secondary_focus)} !important;
				--af: ${this.hexToHsl(this.appComponent.config[device].accent_focus)} !important;
				--su: ${this.hexToHsl(this.appComponent.config[device].success)} !important;
				--in: ${this.hexToHsl(this.appComponent.config[device].info)} !important;
				--wa: ${this.hexToHsl(this.appComponent.config[device].warning)} !important;
				--er: ${this.hexToHsl(this.appComponent.config[device].error)} !important;
				--p: ${this.hexToHsl(this.appComponent.config[device].primary)} !important;
				--pc: ${this.hexToHsl(this.appComponent.config[device].primary_content)} !important;
				--s: ${this.hexToHsl(this.appComponent.config[device].secondary)} !important;
				--sc: ${this.hexToHsl(this.appComponent.config[device].secondary_content)} !important;
				--a: ${this.hexToHsl(this.appComponent.config[device].accent)} !important;
				--ac: ${this.hexToHsl(this.appComponent.config[device].accent_content)} !important;
				--n: ${this.hexToHsl(this.appComponent.config[device].neutral)} !important;
				--nf: ${this.hexToHsl(this.appComponent.config[device].neutral_focus)} !important;
				--nc: ${this.hexToHsl(this.appComponent.config[device].neutral_content)} !important;
				--b1: ${this.hexToHsl(this.appComponent.config[device].base_100)} !important;
				--b2: ${this.hexToHsl(this.appComponent.config[device].base_200)} !important;
				--b3: ${this.hexToHsl(this.appComponent.config[device].base_300)} !important;
				--b4: ${this.hexToHsl(this.appComponent.config[device].base_400)} !important;
				--bc: ${this.hexToHsl(this.appComponent.config[device].base_content)} !important;
				--nt: ${this.hexToHsl(this.appComponent.config[device].neutral_text)} !important;
				--it: ${this.hexToHsl(this.appComponent.config[device].info_text)} !important;
				--sb: ${this.hexToHsl(this.appComponent.config[device].sportbook_color)} !important;
				--ic: ${this.hexToHsl(this.appComponent.config[device].input_border)} !important;
				--ip: ${this.hexToHsl(this.appComponent.config[device].input_placeholder)} !important;
				--ib: ${this.hexToHsl(this.appComponent.config[device].input_background)} !important;
                    }
                  [data-theme="main"] .swiper-button-prev,
                  [data-theme="main"] .swiper-button-next,
                  [data-theme="main"] .swiper-button-prev::after,
                  [data-theme="main"] .swiper-button-next::after {
                    color: ${this.appComponent.config[device].primary};
                  }
            `;

          try {
              document.body.appendChild(rootTailwind); // Append the style element to the body
          } catch (e) {
              console.log(e); // Log any errors during appending
          }
      },
  },
});
</script>
<template>
  <!-- Mobile menu container -->
  <aside
      class="menu_mobile fixed bg-base-200 w-full h-full z-50 top-0 p-3 transition-all flex flex-col justify-start lg:hidden overflow-y-auto"
      :style="[{ left: globalStore.onMenuMain ? '0' : '-100%' }]"
  >
    <article class="relative flex flex-col justify-center items-center">
      <label
              v-if="
                appComponent.config != undefined && appComponent.config.swichThemeMode != undefined
                && appComponent.config.swichThemeMode
                "
              class="swap text-9xl absolute left-1 top-1 cursor-pointer z-[110] flex justify-center items-center"
          >
              <img
                  :src="
                  !ligthMode
                  ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
                  : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'"
                  alt=""
              />
              <!-- Hidden checkbox for the switch -->
              <input
                  type="checkbox"
                  class="hidden"
                  @click="changeLigthMode()"
              />
              <!-- Images for the switch states -->
              <img
                  :src="moonIcon"
                  alt=" "
                  class="absolute opacity-100"
                  :class="!ligthMode ? 'swap-off -left-[0.5px]' : 'swap-on left-[5px]'"
              />
              <img
                  :src="sunIcon"
                  alt=" "
                  class="absolute opacity-100"
                  :class="ligthMode ? 'swap-on -right-[1px]' : 'swap-off right-[5px]'"
              />
          </label>
      <div
          class="absolute right-0 top-0 flex justify-end items-center gap-3 z-[110]"
      >
        <div class="lg:flex hover:scale-105">
          <SelectLanguage v-if="
						appComponent.config.header_ != undefined &&
						appComponent.config.header_.change_language != undefined
							? appComponent.config.header_.change_language
							: appComponent.config.language.showSelectLang
					" />
        </div>
        <button
            @click="closeMenu()"
            class="hover:scale-105"
            aria-label="Cerrar menu"
        >
          <ExitIcon
              :height="23"
              :width="23"
              :fill="'#ffffff'"
              :fill2="'#ee3b3f'"
          />
        </button>
      </div>
      <div class="w-full flex justify-center items-center gap-2 mt-12">
        <div id="carousel" class="carousel-container w-full h-full flex overflow-hidden relative">
          <div
              v-if="!appComponent.appPOS && !appComponent.infoApp && gifs.length > 0"
              id="carousel-inner" class="carousel-inner flex transition-transform duration-300 gap-3">
            <div
                v-for="(item, i) in gifs"
                :key="i"
                class="carousel-item w-[175px] md:w-56 h-20 flex-shrink-0 rounded-xl"
                :style="{
                background: item.color,
              }"
            >
              <RouterLink
                  :to="item.redirect"
                  @click="closeMenu()"
                  aria-label="Promocionales"
                  class="w-full h-full flex justify-center items-center rounded-xl gap-2 p-2 lg:hover:scale-105"
              >
                <img
                    :srcset="getSrcset(item.imgTexto)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    alt=""
                    width="75"
                    height="60"
                    class="h-[60px]"
                />
                <div class="flex justify-center items-center">
                  <img
                      :srcset="getSrcset(item.gif)"
                      loading="lazy"
                      :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                      alt=""
                      width="79"
                      height="56"
                      class="w-32"
                  />
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <hr v-if="!appComponent.appPOS && !appComponent.infoApp && (appComponent.config.headerAssets == undefined || appComponent.config.headerAssets.balanceSectionVersion == undefined || appComponent.config.headerAssets.balanceSectionVersion == 1)" class="w-2/3 bg-base500 mt-4" />
    </article>
    <article class="flex flex-col mt-4">
      <div class="w-full">
        <ul class="grid gap-2">
          <li
              v-for="(value, i) in appComponent.config.MENU_NOLOGUEADO_MOBILE[
              appComponent.country
            ]"
              class="uppercase h-full w-full flex flex-col justify-center items-start gap-4"
              :class="appComponent.infoApp && !(
                                value.MENU_ID == 'accion_lealtad' ||
                                value.MENU_ID == 'accion_promociones' ||
                                value.MENU_ID == 'accion_sorteos' ||
                                value.MENU_ID == 'accion_torneos' ||
                                value.MENU_ID == 'accion_chat_mobile' ||
                                value.MENU_ID == 'accion_chat'
                            )
                            ? 'hidden pt-6'
                            : 'block'
                        "
          >
            <RouterLink
                v-if="value.TARGER == undefined"
                :id="value.MENU_ID"
                :to="appComponent.config.baseUrlFx + value.MENU_URL"
                active-class="bg-gradient-to-r from-primary from-90%"
                v-bind:class="{ shadow: value.SHADOW == 1 }"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                :style="[{ backgroundColor: value.MENU_BG }]"
            >
              <div
                  :id="`mobile-${value.MENU_ID}`"
                  class="uppercase h-full w-full flex justify-start items-center gap-4"
                  v-if="value.TARGER !== 'blank'"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <span
                    v-if="
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    !value.MENU_ICON.includes('https')
                  "
                    :class="'text-base pr-3 ' + value.MENU_ICON"
                >
                </span>
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    class="titles font-medium text-base text-neutral"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </RouterLink>
            <a
                :id="value.MENU_ID"
                v-bind:class="{ shadow: value.SHADOW == 1 }"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                :style="[{ backgroundColor: value.MENU_BG }]"
                v-if="value.TARGER == 'blank'"
                :href="value.MENU_URL"
                target="_blank"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <div
                  :id="`mobile-${value.MENU_ID}`"
                  class="uppercase h-full w-full flex justify-start items-center gap-4"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <span
                    v-if="
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    !value.MENU_ICON.includes('https')
                  "
                    :class="'text-base pr-3 ' + value.MENU_ICON"
                >
                </span>
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    class="titles font-medium text-base text-neutral"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </a>
            <a
                :id="value.MENU_ID"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                v-if="value.TARGER == 'top'"
                :href="value.MENU_URL"
                target="_top"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <div
                  class="uppercase h-full w-full flex justify-start items-center gap-4"
              >
                <span
                    v-if="
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    !value.MENU_ICON.includes('https')
                  "
                    :class="'text-base pr-3 ' + value.MENU_ICON"
                >
                </span>
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    class="titles font-medium text-base text-neutral"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </a>
            <button
                id="accion_chat"
                v-if="value.TARGER == 'chat'"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% lg:hover:scale-105 flex justify-center items-center uppercase bg-base-100"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                @click="onOpenChat()"
            >
              <div
                  class="uppercase h-full w-full flex justify-start items-center gap-4"
              >
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    class="titles w-full text-start font-normal text-base text-neutral"
                    :style="[{ animationDelay: '200ms' }]"
                >{{ $t("Chat") }}</span
                >
              </div>
            </button>
            <hr
                v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM && !appComponent.infoApp"
                class="w-2/3 bg-base500 mb-1 mx-auto"
            />
          </li>
        </ul>
      </div>
      <div class="px-1 my-4 ml-3">
        <p class="menu-title text-neutral text-base font-bold">
          {{ $t("OTROS") }}
        </p>
        <ul class="grid gap-2 mt-2">
          <li
              v-for="value in appComponent.config.MENU_FOOTER[
              appComponent.country
            ]"
              class="hover:scale-105 py-2"
              :class="appComponent.infoApp && !(
                                value.MENU_ID == 'accion_terminoscondiciones' ||
                                value.MENU_ID == 'accion_politicaprivacidad' ||
                                value.MENU_ID == 'accion_contactenos' ||
                                value.MENU_ID == 'accion_juegoresponsable' ||
                                value.MENU_ID == 'accion_blog'
                            )
                            ? 'hidden  pt-10'
                            : 'block'
                            "
          >
            <RouterLink
                :to="value.MENU_URL"
                active-class="active-link-otros"
                :aria-label="value.MENU_TITLE"
            >
              <div
                  :id="value.MENU_ID"
                  v-if="value.MENU_TARGET != '_blank'"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <span class="text-neutral text-sm">
                  {{ $t(value.MENU_TITLE) }}
                </span>
              </div>
            </RouterLink>
            <a
                :id="value.MENU_ID"
                v-if="value.MENU_TARGET == '_blank'"
                :href="value.MENU_URL"
                target="_blank"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <span class="text-neutral text-sm">
                {{ $t(value.MENU_TITLE) }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </article>
  </aside>
  <!-- Desktop menu container -->
  <aside
      class="menu_desktop w-[69px] hover:w-[255px] h-screen fixed top-0 left-0 bg-base-200 transition-all ease-in-out duration-300 hidden lg:block py-2 px-2 z-30 overflow-x-hidden"
      @mouseover="openMenu()"
      @mouseleave="closeMenu()"
  >
    <article class="flex flex-col w-full justify-center items-center"
             :class="{
                'px-2': globalStore.onMenuMain && onTitles,
                'mt-[60px]': appComponent.config.header_.styleVersion === undefined || appComponent.config.header_.styleVersion === 1,
                'mt-[70px]': appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2,

            }"
    >
      <div
          v-if="gifs && gifs.length > 0"
          class="h-auto mb-2 flex flex-col justify-center items-center gap-3 pb-3"
      >
        <RouterLink
            v-for="(item, i) in gifs"
            :key="i"
            :aria-label="'img-promotion-' + i"
            :to="item.redirect"
            class="flex justify-center items-center rounded-xl gap-2 hover:scale-105"
            :class="onTitles ? 'w-56 h-20 p-2' : 'w-[55px] h-[49px] p-1'"
            :style="{
            background: item.color,
          }"
        >
          <img
              v-if="onTitles"
              :srcset="getSrcset(item.imgTexto)"
              loading="lazy"
              :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
              alt=""
              width="85"
              height="65"
              class="h-[65px] mr-3"
          />
          <div class="relative flex justify-center items-center w-auto">
            <img
                width="87.41"
                height="62.49"
                :srcset="getSrcset(item.gif)"
                loading="lazy"
                :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                alt=""
                :class="onTitles ? 'w-28' : 'w-14'"
            />
          </div>
        </RouterLink>
        <hr class="w-2/3 bg-base500 mt-2" />
      </div>
      <div class="w-full justify-center items-center">
        <ul class="grid gap-2">
          <li
              v-for="(value, i) in appComponent.config.MENU_NOLOGUEADO[
              appComponent.country
            ]"
              class="uppercase h-full w-full flex flex-col justify-center items-start gap-4"
          >
            <RouterLink
                v-if="value.TARGER == undefined"
                :to="appComponent.config.baseUrlFx + value.MENU_URL"
                active-class="bg-gradient-to-r from-primary from-90%"
                v-bind:class="{ shadow: value.SHADOW == 1 }"
                class="rounded-xl p-3 w-full hover:scale-105 flex justify-center items-center"
                :class="{
                                'bg-base-300':  value.MENU_BG == undefined,
                                'hover:bg-gradient-to-r hover:from-primary hover:from-90%': appComponent.config.header_.styleVersion == undefined,
                                'hover:bg-base-100 group': appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2
                            }"
                :style="[{ backgroundColor: value.MENU_BG }]"
            >
              <div
                  :id="`mobile-${value.MENU_ID}`"
                  class="uppercase h-full w-full flex items-center gap-4"
                  :class="onTitles ? 'justify-start' : 'justify-center'"
                  v-if="value.TARGER !== 'blank'"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    v-if="onTitles"
                    class="titles text-neutral text-base"
                                    :class="appComponent.config.header_.styleVersion !== undefined && appComponent.config.header_.styleVersion === 2 ? 'font-semibold group-hover:text-neutral-text' : 'font-medium'"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    :class="
                    globalStore.onMenuMain && onTitles ? 'block' : 'hidden'
                  "
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </RouterLink>
            <a
                :id="value.MENU_ID"
                v-bind:class="{ shadow: value.SHADOW == 1 }"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                :style="[{ backgroundColor: value.MENU_BG }]"
                v-if="value.TARGER == 'blank'"
                :href="value.MENU_URL"
                target="_blank"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <div
                  :id="`mobile-${value.MENU_ID}`"
                  class="uppercase h-full w-full flex items-center gap-4"
                  :class="onTitles ? 'justify-start' : 'justify-center'"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    v-if="onTitles"
                    class="titles font-normal text-base text-neutral"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    :class="
                    globalStore.onMenuMain && onTitles ? 'block' : 'hidden'
                  "
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </a>
            <a
                :id="value.MENU_ID"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:scale-105 flex justify-center items-center uppercase"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                v-if="value.TARGER == 'top'"
                :href="value.MENU_URL"
                target="_top"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <div
                  class="uppercase h-full w-full flex items-center gap-4"
                  :class="onTitles ? 'justify-start' : 'justify-center'"
              >
                <span
                    v-if="
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    !value.MENU_ICON.includes('https')
                  "
                    :class="'text-base pr-3 ' + value.MENU_ICON"
                >
                </span>
                <div
                    v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                    class="w-8 h-8"
                    v-html="value.MENU_SVG"
                ></div>
                <img
                    class="w-8 h-8"
                    v-if="
                    (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                    value.MENU_ICON != undefined &&
                    value.MENU_ICON != '' &&
                    value.MENU_ICON.includes('https')
                  "
                    :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                    :srcset="getSrcset(value.MENU_ICON)"
                    loading="lazy"
                    :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                    width="28"
                    height="28"
                />
                <span
                    v-if="onTitles"
                    class="titles font-normal text-base text-neutral"
                    :style="[
                    { animationDelay: i + 1 + '0ms' }
                  ]"
                >{{ $t(value.MENU_TITLE) }}</span
                >
                <div
                    :class="
                    globalStore.onMenuMain && onTitles ? 'block' : 'hidden'
                  "
                    v-if="value.ICON != undefined"
                    class="svg"
                    v-html="value.ICON"
                ></div>
              </div>
            </a>
            <button
                @click="onOpenChat()"
                id="accion_chat"
                v-if="value.TARGER == 'chat'"
                class="rounded-xl p-3 w-full hover:bg-gradient-to-r hover:from-primary hover:from-90% hover:to-transparent hover:scale-105 flex justify-center items-center uppercase bg-base-100"
                :class="value.MENU_BG == undefined ? 'bg-base-300' : ''"
                :style="[{ backgroundColor: value.MENU_BG }]"
            >
              <div
                  v-if="value.MENU_SVG != undefined && value.MENU_SVG != ''"
                  class="w-8 h-8"
                  v-html="value.MENU_SVG"
              ></div>
              <img
                  class="w-8 h-8"
                  v-if="
                  (value.MENU_SVG == undefined || value.MENU_SVG == '') &&
                  value.MENU_ICON != undefined &&
                  value.MENU_ICON != '' &&
                  value.MENU_ICON.includes('https')
                "
                  :alt="'Menu navegacion' + ' ' + value.MENU_TITLE"
                  :srcset="getSrcset(value.MENU_ICON)"
                  loading="lazy"
                  :sizes="'(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'"
                  width="28"
                  height="28"
              />
              <span
                  v-if="onTitles"
                  class="w-full text-start titles font-normal text-base text-neutral"
                  :style="[{ animationDelay: '200ms' }]"
              >{{ $t("Chat") }}</span
              >
            </button>
            <hr
                v-if="value.BORDER_BOTTOM !== undefined && value.BORDER_BOTTOM"
                class="w-2/3 bg-base500 mb-1 mx-auto"
            />
          </li>
        </ul>
      </div>
    <div v-if="onTitles" class="w-full flex flex-col justify-center items-center pl-3 mt-4">
        <p class="text-neutral text-sm font-bold w-full text-start">
          {{ $t("OTROS") }}
        </p>
        <ul class="w-full flex flex-col justify-center items-center gap-2 mt-2">
          <li
              v-for="value in appComponent.config.MENU_FOOTER[
              appComponent.country
            ]"
              class="hover:scale-105 w-full text-start py-1"
          >
            <RouterLink :to="value.MENU_URL" active-class="active-link-otros">
              <div
                  :id="value.MENU_ID"
                  v-if="value.MENU_TARGET != '_blank'"
                  :title="value.MENU_TITLE"
                  @click="closeMenu()"
              >
                <span class="text-neutral text-sm">
                  {{ $t(value.MENU_TITLE) }}
                </span>
              </div>
            </RouterLink>
            <a
                :id="value.MENU_ID"
                v-if="value.MENU_TARGET == '_blank'"
                :href="value.MENU_URL"
                target="_blank"
                :title="value.MENU_TITLE"
                @click="closeMenu()"
            >
              <span class="text-neutral text-sm">
                {{ $t(value.MENU_TITLE) }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </article>
  </aside>
</template>
<style scoped>
/* Hides the scrollbar for the desktop menu */
.menu_desktop::-webkit-scrollbar {
  display: none;
}
</style>

<!-- FILE DOCUMENTED -->

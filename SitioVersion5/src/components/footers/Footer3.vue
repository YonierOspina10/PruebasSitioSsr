<script lang="ts">
import AppCarouselProviders3 from "../CarouselProviders3.vue"; // Importing the carousel component for providers
import AppMenuFooter3 from "../menus/MenuFooter3.vue"; // Importing the first version of the footer menu
import AppMenuFooter3v2 from "../menus/MenuFooter3V2.vue"; // Importing the second version of the footer menu
import AppSocialNetworks from "../SocialNetworks.vue"; // Importing the social networks component
import AppSponsors from "../Sponsors.vue"; // Importing the sponsors component
import AppCopyright from "../Copyright.vue"; // Importing the copyright component
import { defineComponent } from "vue"; // Importing the defineComponent function from Vue
import CarouselProviders3V2 from "../CarouselProviders3V2.vue"; // Importing the second version of the carousel component for providers
import SeoP2 from "../SeoP2.vue";
import AppComplaintsBook from '@/components/ComplaintsBook.vue'; // Importing the SEO component

export default defineComponent({
  components: {
      AppComplaintsBook,
    AppCarouselProviders3, // Registering the carousel component for providers
    AppMenuFooter3, // Registering the first version of the footer menu
    AppMenuFooter3v2, // Registering the second version of the footer menu
    AppSocialNetworks, // Registering the social networks component
    AppSponsors, // Registering the sponsors component
    AppCopyright, // Registering the copyright component
    CarouselProviders3V2, // Registering the second version of the carousel component for providers
    SeoP2 // Registering the SEO component
  },
  data() {
    let config = this.$config(); // Retrieving configuration data
    let appComponent: any = this.$appComponent; // Retrieving the application component
    return {
      config, // Exposing the configuration data to the template
      appComponent, // Exposing the application component to the template
    };
  },
  methods: {
    clickBox(box: any) { // Method to handle box click events
      window.location.href = this.config.baseUrlFx + box.url; // Redirecting to the specified URL
    },
    analyticsAttrs(label:string) {
      return {
          'data-analytics-label': label,
          'data-analytics-context': `component:Footer3|layout:layout-${this.appComponent.config.layout}`
      };
    }
  },
});
</script>
<template>
  <footer
    v-if="appComponent.config.footer_.style == undefined || appComponent.config.footer_.style == 1"
    class="in page-footer w-full px-2 flex justify-center items-center bg-gradient-to-b from-base-content via-base-300 to-base-300 to-50% pt-0 lg:pt-10"
  >
    <div
      class="w-[80%] max-w-[1300px] flex flex-col justify-center items-center ml-0 lg:-ml-[70px] text-info-text"
    >
      <SeoP2 v-if="
          appComponent.config.footer_ != undefined &&
          appComponent.config.footer_.show_seo != undefined "/> <!-- SEO component conditionally rendered based on config -->
      <AppMenuFooter3
        v-if="
          config.footer_ != undefined && config.footer_.show_menu != undefined
            ? config.footer_.show_menu && config.footer.styleVersion != 4
            : config.footer.showMenuFooter && config.footer.styleVersion != 4
        "
      /> <!-- First version of the footer menu conditionally rendered -->
      <AppMenuFooter3v2
        v-if="
          config.footer_ != undefined && config.footer_.show_menu != undefined 
            ? config.footer_.show_menu && config.footer.styleVersion == 4
            : config.footer.showMenuFooter && config.footer.styleVersion == 4
        "
      /> <!-- Second version of the footer menu conditionally rendered -->
      <hr 
        :class="config.footer.styleVersion == 4 ? 'h-[0.1px] opacity-20': 'h-[2px]'"
        class="w-full  rounded-full border-none my-2 bg-base-300"
      /> <!-- Horizontal rule with dynamic class based on style version -->
      <CarouselProviders3V2
        v-if="
          config.footer_ != undefined &&
          config.footer_.show_payments != undefined
            ? config.footer_.show_payments
            : config.providers.showFooterProviders
        "
      /> <!-- Carousel for providers conditionally rendered -->
      <hr
        :class="config.footer.styleVersion == 4 ? 'h-[0.1px] opacity-20': 'h-[2px]'"
        class="w-full rounded-full border-none my-2 bg-base-300"
      /> <!-- Another horizontal rule with dynamic class -->
      <div
        v-if="
          config.footer_ != undefined &&
          config.footer_.version_style != undefined
            ? config.footer_.version_style == 3
            : config.footer.styleVersion == 3
        "
        class="bg-base-300 version3 footer block pb-16"
      >
        <div class="w-full mx-auto">
          <div
            class="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 mb-4 mx-auto gap-y-9 gap-x-4"
          >
            <AppSocialNetworks
              v-if="
                config.footer_ != undefined &&
                config.footer_.show_social_networks != undefined
                  ? config.footer_.show_social_networks
                  : config.footer.showSocial
              "
            /> <!-- Social networks component conditionally rendered -->
            <AppSponsors
              v-if="
                config.footer_ != undefined &&
                config.footer_.show_partners != undefined
                  ? config.footer_.show_partners == 1
                  : config.footer.showPartners
              "
            /> <!-- Sponsors component conditionally rendered -->
            <AppCopyright /> <!-- Copyright component rendered -->
          </div>
            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
          <div
            v-if="
              config.footer_ != undefined &&
              config.footer_.show_virtualsoft != undefined
                ? config.footer_.show_virtualsoft
                : config.footer.virtualsoft
            "
            class="footer-description w-full text-center"
            style="font-weight: 400"
          >
            <span class="text-neutral">{{
              $t("Sitio Desarrollado Por")
            }}</span> <!-- Text indicating the site developer -->
            <a
              target="_blank"
              href="https://virtualsoftlatam.com/"
              style="font-weight: bold"
            >
              <img
                alt="virtualsoft"
                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                class="mx-auto img-info"
                height="118"
                width="600"
              />
            </a> <!-- Link to the developer's site with an image -->
          </div>
        </div>
      </div>
      <div
        v-if="
          config.footer_ != undefined &&
          config.footer_.version_style != undefined
            ? config.footer_.version_style == 4
            : config.footer.styleVersion == 4
        "
        class="bg-base-300 version3 footer block pb-16"
      >
        <div class="w-10/12 mx-auto">
          <div
            class="container__footer"
          >
            <AppCopyright class="text-info-text text-xs leading-5" /> <!-- Copyright component rendered with specific styles -->
          </div>
            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
          <div
            v-if="
              config.footer_ != undefined &&
              config.footer_.show_virtualsoft != undefined
                ? config.footer_.show_virtualsoft
                : config.footer.virtualsoft
            "
            class="footer-description w-full text-center"
            style="font-weight: 400"
          >
            <span class="text-neutral">{{
              $t("Sitio Desarrollado Por")
            }}</span> <!-- Text indicating the site developer -->
            <a
              target="_blank"
              href="https://virtualsoftlatam.com/"
              style="font-weight: bold"
            >
              <img
                alt="virtualsoft"
                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                class="mx-auto img-info"
                height="118"
                width="600"
              />
            </a> <!-- Link to the developer's site with an image -->
          </div>
        </div>
      </div>
    </div>
  </footer>
  <footer
    v-if="appComponent.config.footer_.style == 2"
    class="in page-footer w-full px-2 flex justify-center items-center bg-gradient-to-b from-base-content via-base-300 to-base-300 pt-0 lg:pt-10"
  >
    <div
      class="w-[80%] max-w-[1300px] flex flex-col justify-center items-center text-info-text"
    >
      <SeoP2 v-if="
          appComponent.config.footer_ != undefined &&
          appComponent.config.footer_.show_seo != undefined "/> <!-- SEO component conditionally rendered based on config -->
      <AppMenuFooter3
        v-if="
          config.footer_ != undefined && config.footer_.show_menu != undefined
            ? config.footer_.show_menu && config.footer.styleVersion != 4
            : config.footer.showMenuFooter && config.footer.styleVersion != 4
        "
      />
      <hr
        class="w-full  rounded-full border-none my-2 bg-neutral h-[2px]"
      /> <!-- Horizontal rule with dynamic class based on style version -->
      <CarouselProviders3V2
        v-if="
          config.footer_ != undefined &&
          config.footer_.show_payments != undefined
            ? config.footer_.show_payments
            : config.providers.showFooterProviders
        "
      /> <!-- Carousel for providers conditionally rendered -->
      <hr
        class="w-full  rounded-full border-none my-2 bg-neutral h-[2px]"
      /> <!-- Another horizontal rule with dynamic class -->
      <div
        v-if="
          config.footer_ != undefined &&
          config.footer_.version_style != undefined
            ? config.footer_.version_style == 3
            : config.footer.styleVersion == 3
        "
        class="version3 footer pb-16 block"
      >
        <div class="w-full mx-auto">
          <div
            class="w-full grid grid-cols-1 md:grid-cols-3 justify-center mb-4 mx-auto gap-y-9 gap-x-4"
          >
            <AppSocialNetworks
              v-if="
                config.footer_ != undefined &&
                config.footer_.show_social_networks != undefined
                  ? config.footer_.show_social_networks
                  : config.footer.showSocial
              "
            /> <!-- Social networks component conditionally rendered -->
            <AppSponsors
              v-if="
                config.footer_ != undefined &&
                config.footer_.show_partners != undefined
                  ? config.footer_.show_partners == 1
                  : config.footer.showPartners
              "
            /> <!-- Sponsors component conditionally rendered -->
            <AppCopyright /> <!-- Copyright component rendered -->
          </div>
            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
          <div
            v-if="
              config.footer_ != undefined &&
              config.footer_.show_virtualsoft != undefined
                ? config.footer_.show_virtualsoft
                : config.footer.virtualsoft
            "
            class="footer-description w-full text-center"
            style="font-weight: 400"
          >
            <span class="text-neutral">{{
              $t("Sitio Desarrollado Por")
            }}</span> <!-- Text indicating the site developer -->
            <a
              target="_blank"
              href="https://virtualsoftlatam.com/"
              style="font-weight: bold"
            >
              <img
                alt="virtualsoft"
                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                class="mx-auto img-info"
                height="118"
                width="600"
              />
            </a> <!-- Link to the developer's site with an image -->
          </div>
        </div>
      </div>
    </div>
  </footer>
    <footer
        v-else-if="appComponent.config.footer_.style == 3"
        class="in page-footer px-2 flex flex-col justify-center items-center bg-gradient-to-b from-base-content via-base-300 to-base-300 to-50% pt-10 pb-32 lg:pb-16 gap-10 lg:ml-[68px]"
    >
        <div
            v-if="
              config.footer_ != undefined &&
              config.footer_.show_payments != undefined
                ? config.footer_.show_payments
                : config.providers.showFooterProviders
            "
            class="flex flex-col justify-center items-center w-11/12 max-w-[1300px] gap-4 mx-auto"
        >
            <!-- Title for the payment methods section -->
            <span class="text-lg text-info-text font-bold">{{ $t('MEDIOS DE PAGO:') }}</span>
            <!-- List of payment methods -->
            <div class="w-full flex overflow-x-auto overflow-y-hidden carousel">
                <ul
                    class="w-full flex md:flex-wrap gap-4 justify-center items-center"
                >
                    <!-- Iterating over payment providers based on the country -->
                    <li
                        v-for="value in config.PROVIDERS[appComponent.country]"
                        class="w-32 md:w-[140px] h-16 md:h-[72px] bg-base-200 rounded-lg flex justify-center items-center p-2 lg:p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-xl shadow-base-content/25"
                    >
                        <RouterLink
                            :to="config.baseUrlFx + '/gestion/deposito'"
                            v-bind="analyticsAttrs(`menu:nav:${config.baseUrlFx + '/gestion/deposito'}`)"
                            target="_blank"
                            class="h-10 md:h-full w-20 md:w-full"
                        >
                            <!-- Payment method icon -->
                            <img
                                width="65"
                                height="40"
                                :alt="value.NAME"
                                class="object-contain h-full w-full"
                                :class="value.NAME"
                                v-if="value.ICON != undefined && value.showF"
                                v-lazy="value.ICON"
                            />
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class=" w-11/12 max-w-[1300px] flex flex-col justify-center items-center gap-10">
            <div class="w-full max-w-[800px] flex justify-between lg:justify-around items-center">
                <ul
                    v-if="
                        config.footer_ != undefined &&
                        config.footer_.show_social_networks != undefined
                          ? config.footer_.show_social_networks
                          : config.footer.showSocial
                      "
                    class="flex justify-center items-center gap-8"
                >
                    <!-- Loop through social links based on configuration -->
                    <li
                        v-for="value in config['not_login'] != undefined &&
                        config['not_login'][appComponent.lngProd] != undefined &&
                        config['not_login'][appComponent.lngProd]['social_links'] !=
                            undefined
                            ? config['not_login'][appComponent.lngProd][
                                    'social_links'
                                ]
                            : config.SOCIAL_NEWTWORKS[appComponent.country]"
                        class="hover:scale-125"
                        @click="
                            appComponent.gAnalytics('button_social_network', value)
                        "
                    >
                        <a
                            class="icons-socials"
                            :class="
                                (value.SOCIAL_NAME,
                                appComponent.config.layout !== undefined &&
                                appComponent.config.layout == 3
                                    || appComponent.config.layout !== undefined && appComponent.config.layout == 7 ? 'transition-all hover:scale-105'
                                    : '')
                            "
                            :href="value.SOCIAL_URL"
                            target="_blank"
                            :aria-label="value.SOCIAL_NAME"
                        >
                            <!-- Font Awesome icon for social media -->
                            <font-awesome-icon
                                :id="'1.1 RRSS – ' + value.SOCIAL_NAME"
                                v-if="value.SOCIAL_ICON != undefined"
                                :icon="
                                    config['not_login'] != undefined &&
                                    config['not_login'][appComponent.lngProd] !=
                                        undefined &&
                                    config['not_login'][appComponent.lngProd][
                                        'social_links'
                                    ] != undefined
                                        ? {
                                                prefix: 'fab',
                                                iconName: value.SOCIAL_ICON,
                                            }
                                        : value.SOCIAL_ICON
                                "
                                class="lg:w-10 w-8 aspect-square text-info-text hover:text-primary transition-all duration-300 ease-in-out"
                            />
                        </a>
                    </li>
                </ul>
                <img
                    v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_18_more != undefined
                        ? appComponent.config.footer_.show_18_more
                        : appComponent.config.footer.show18text"
                    src="https://images.virtualsoft.tech/m/msj0212T1752613763.png"
                    alt="+18"
                    class="lg:w-16 w-14 aspect-square"
                />
                <div class="hidden lg:flex justify-center items-center">
                    <RouterLink
                        id="ImgLogo"
                        to="/home"
                        v-bind="analyticsAttrs('menu:nav:home')"
                        class="w-44 hover:scale-105"
                    >
                        <img
                            v-lazy="
                                config.logo_ != undefined &&
                                config.logo_['dark'] != undefined &&
                                config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? config.logo_['dark']
                                    : config.logo_['light']
                            "
                            alt=""
                            width="154"
                            height="32"
                        />
                    </RouterLink>
                </div>
                <div
                    class="egaming w-16 flex"
                    id="ceg-4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
                    data-ceg-seal-id="4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
                    data-ceg-image-size="25"
                    data-ceg-image-type="basic-small"
                ></div>
            </div>
            <div class="lg:hidden flex justify-center items-center -my-4">
                <RouterLink
                    id="ImgLogo"
                    to="/home"
                    v-bind="analyticsAttrs('menu:nav:home')"
                    class="w-44 hover:scale-105"
                >
                    <img
                        v-lazy="
                                config.logo_ != undefined &&
                                config.logo_['dark'] != undefined &&
                                config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? config.logo_['dark']
                                    : config.logo_['light']
                            "
                        alt=""
                        width="154"
                        height="32"
                    />
                </RouterLink>
            </div>
            <ul class="flex flex-wrap lg:flex-row justify-center items-center gap-4 lg:gap-6 w-full text-info-text text-base">
                <li
                    v-for="value in appComponent.config.MENU_FOOTER[appComponent.country]"
                    class="hover:scale-110 transition-all duration-300 ease-in-out"
                >
                    <RouterLink
                        :to="value.MENU_URL"
                        v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
                        :aria-label="value.MENU_TITLE"
                        class="underline cursor-pointer text-info-text"
                    >
                        {{ $t(value.MENU_TITLE) }}
                    </RouterLink>
                </li>
            </ul>
            <p
                class="break-words text-info-text"
                v-if="appComponent.config.footer.license"
                v-t
            >
                {{ appComponent.config.footer.license }}
            </p>
        </div>
    </footer>
</template>
<style scoped>
.carousel {
    overflow-x: auto;
    scrollbar-width: thin; /* For Firefox */
}
.page-footer {
  padding-top: 0px; /* Top padding for the footer */
  color: white; /* Text color for the footer */
  font-size: 0.8rem; /* Font size for the footer text */
  font-weight: 300; /* Font weight for the footer text */
  line-height: 1.4em; /* Line height for the footer text */
}
#derechos-autor {
  text-align: center; /* Center alignment for copyright text */
  font-weight: normal; /* Normal font weight for copyright text */
}
.promociones {
  color: #ffe400; /* Color for promotions text */
  font-weight: 700; /* Bold font weight for promotions text */
  font-size: 13px; /* Font size for promotions text */
}
.img {
  display: inline-block; /* Inline block display for images */
  max-width: 170px; /* Maximum width for images */
  vertical-align: middle; /* Vertical alignment for images */
  padding: 0 10px; /* Padding around images */
  max-height: 77px; /* Maximum height for images */
}
</style>

<!-- FILE DOCUMENTED -->

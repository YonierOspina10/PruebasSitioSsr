<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuFooter from './../menuFooters/MenuFooter.vue'; // Importing MenuFooter component
import CarouselProviders from './../providers/carouselProviders.vue'; // Importing CarouselProviders component
import SocialNetworks from './../socialNetworks/SocialNetworks.vue'; // Importing SocialNetworks component
import Sponsors from './../sponsors/Sponsors.vue'; // Importing Sponsors component
import Copyright from './../copyright/Copyright.vue'; // Importing Copyright component
import SeoP2 from "../../seo/SeoP2.vue";
import AppComplaintsBook from './../complaintsBook/ComplaintsBook.vue';

export default defineComponent({
    components: {
        AppComplaintsBook,
        MenuFooter, // Registering MenuFooter component
        CarouselProviders, // Registering CarouselProviders component
        SocialNetworks, // Registering SocialNetworks component
        Sponsors, // Registering Sponsors component
        Copyright, // Registering Copyright component
        SeoP2 // Registering SeoP2 component
    },
    data() {
        // Defining reactive data properties for the component
        let appComponent: any = this.$appComponent; // Reference to the app component
        let lightColor: boolean = false; // State to determine if light color theme is used
        let STYLE_VERSION =
            appComponent.config.footer != undefined && appComponent.config.footer['styleVersion'] != undefined
                ? appComponent.config.footer['styleVersion'] // Fetching style version from config
                : [];
        let MENU_FOOTER_LIGHT =
            appComponent.config['MENU_FOOTER_LIGHT'] != undefined &&
            appComponent.config['MENU_FOOTER_LIGHT'][appComponent.country] != undefined
                ? appComponent.config['MENU_FOOTER_LIGHT'][appComponent.country] // Fetching light menu footer configuration
                : [];
        let PROVIDERS =
            appComponent.config['PROVIDERS'] != undefined &&
            appComponent.config['PROVIDERS'][appComponent.country] != undefined
                ? appComponent.config['PROVIDERS'][appComponent.country] // Fetching providers configuration
                : [];
        let SOCIAL_NEWTWORKS =
					appComponent.config['not_login'][appComponent.lngProd] != undefined &&
					appComponent.config['not_login'][appComponent.lngProd]['social_links'] !=
						undefined
						? appComponent.config['not_login'][appComponent.lngProd][
								'social_links'
							]
						:  appComponent.config['SOCIAL_NEWTWORKS'] != undefined &&
            appComponent.config['SOCIAL_NEWTWORKS'][appComponent.country] != undefined
                ? appComponent.config['SOCIAL_NEWTWORKS'][appComponent.country] // Fetching social networks configuration
                : [];
        let SPONSORS =
            appComponent.config != undefined && appComponent.config['SPONSORS_']
                ? appComponent.config['SPONSORS_'] // Fetching sponsors configuration
                : appComponent.config.footer != undefined &&
                    appComponent.config.footer['sponsors'] != undefined &&
                    appComponent.config.footer['sponsors'][appComponent.country] != undefined
                  ? appComponent.config.footer['sponsors'][appComponent.country] // Fallback to footer sponsors
                  : [];
        let COPYRIGHT =
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['copyright'] != undefined
                ? appComponent.config.footer[appComponent.country]['copyright'] // Fetching copyright information
                : '';
        let LICENSE =
            appComponent.config.footer_ != undefined && appComponent.config.footer_.license_ != undefined
                ? appComponent.config.footer_.license_ // Fetching license information
                : appComponent.config.footer != undefined && appComponent.config.footer['license'] != undefined
                ? appComponent.config.footer['license']
                : '';
        let DOWLOAD_APP_URL =
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['downloadAppUrl'] != undefined
                ? appComponent.config.footer[appComponent.country]['downloadAppUrl'] // Fetching download app URL
                : [];
        let SHOW_VIRTUALSOFT =
            appComponent.config.footer_ != undefined && appComponent.config.footer_['show_virtualsoft'] != undefined
                ? appComponent.config.footer_['show_virtualsoft'] // Fetching visibility of Virtualsoft
                : appComponent.config.footer['virtualsoft'] != undefined
                  ? appComponent.config.footer['virtualsoft'] // Fallback to footer virtualsoft visibility
                  : false;
        let TEXT_INFO =
            appComponent.config.footer != undefined &&
            appComponent.config.footer[appComponent.country] != undefined &&
            appComponent.config.footer[appComponent.country]['textInfo'] != undefined
                ? appComponent.config.footer[appComponent.country]['textInfo'] // Fetching additional text information
                : '';
        let SHOW_DOWNLOAD_APP =
            appComponent.config.footer_ != undefined && appComponent.config.footer_['show_download_app'] != undefined
                ? appComponent.config.footer_['show_download_app'] // Fetching visibility of download app button
                : appComponent.config.footer != undefined &&
                    appComponent.config.footer[appComponent.country] != undefined &&
                    appComponent.config.footer[appComponent.country]['showDownloadApp'] != undefined
                  ? appComponent.config.footer[appComponent.country]['showDownloadApp'] // Fallback to footer download app visibility
                  : false;
        let SHOW_DOWNLOAD_APP_IOS =
            appComponent.config.footer_ != undefined &&
            appComponent.config.footer_['show_download_app_ios'] != undefined
                ? appComponent.config.footer_['show_download_app_ios'] // Fetching visibility of iOS download app button
                : appComponent.config.footer != undefined &&
                    appComponent.config.footer[appComponent.country] != undefined &&
                    appComponent.config.footer[appComponent.country]['showDownloadAppIos'] != undefined
                  ? appComponent.config.footer[appComponent.country]['showDownloadAppIos'] // Fallback to footer iOS download app visibility
                  : false;
        let SHOW_VIRTUALSOFT_COPYRIGHT =
            appComponent.config.footer_ != undefined && appComponent.config.footer_.show_virtualsoft != undefined
                ? appComponent.config.footer_.show_virtualsoft // Fetching visibility of Virtualsoft copyright
                : appComponent.config.footer.virtualsoft_right != undefined
                  ? appComponent.config.footer.virtualsoft_right // Fallback to footer virtualsoft copyright visibility
                  : false;
        return {
            appComponent, // Exposing appComponent to the template
            lightColor, // Exposing lightColor to the template
            STYLE_VERSION, // Exposing STYLE_VERSION to the template
            MENU_FOOTER_LIGHT, // Exposing MENU_FOOTER_LIGHT to the template
            PROVIDERS, // Exposing PROVIDERS to the template
            SOCIAL_NEWTWORKS, // Exposing SOCIAL_NEWTWORKS to the template
            SHOW_VIRTUALSOFT_COPYRIGHT, // Exposing SHOW_VIRTUALSOFT_COPYRIGHT to the template
            SPONSORS, // Exposing SPONSORS to the template
            COPYRIGHT, // Exposing COPYRIGHT to the template
            LICENSE, // Exposing LICENSE to the template
            DOWLOAD_APP_URL, // Exposing DOWLOAD_APP_URL to the template
            SHOW_VIRTUALSOFT, // Exposing SHOW_VIRTUALSOFT to the template
            TEXT_INFO, // Exposing TEXT_INFO to the template
            SHOW_DOWNLOAD_APP, // Exposing SHOW_DOWNLOAD_APP to the template
            SHOW_DOWNLOAD_APP_IOS, // Exposing SHOW_DOWNLOAD_APP_IOS to the template
        };
    },
     methods: {
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:Footer|layout:layout-${this.appComponent.config.layout}`
            };
        }
    },
});
</script>
<template>
    <footer
        v-if="appComponent.config.footer_.style == undefined || appComponent.config.footer_.style == 1"
        class="in page-footer w-full px-2 flex justify-center items-center bg-gradient-to-b from-neutral-content via-base-300 to-base-300 to-50% pt-0"
    >
        <div
            class="w-[80%] max-w-[1300px] flex flex-col justify-center items-center ml-0 lg:-ml-[70px] text-info-text"
        >
            <SeoP2 v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_seo_landing != undefined && appComponent.config.footer_.show_seo_landing"/>
            <MenuFooter :menuList="MENU_FOOTER_LIGHT" /> <!-- Rendering MenuFooter with light menu list -->
            <hr
                :class="lightColor ? 'h-[0.1px] opacity-20' : 'h-[2px]'"
                class="w-full rounded-full border-none my-2 bg-base-300"
            />
            <CarouselProviders :providers="PROVIDERS" /> <!-- Rendering CarouselProviders with providers list -->
            <hr
                :class="STYLE_VERSION == 4 ? 'h-[0.1px] opacity-20' : 'h-[2px]'"
                class="w-full rounded-full border-none my-2 bg-base-300"
            />
            <div class="bg-base-300 version3 footer block pb-16">
                <div class="w-full mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-3 justify-center mt-4 mb-4 mx-auto gap-y-9 gap-x-4">
                        <SocialNetworks
                            v-if="
                                appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.show_social_networks != undefined
                                    ? appComponent.config.footer_.show_social_networks
                                    : appComponent.config.footer.showSocial
                            "
                            :networks="SOCIAL_NEWTWORKS" /> <!-- Rendering SocialNetworks if configured to show -->
                        <Sponsors
                            v-if="
                                appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.show_partners != undefined
                                    ? appComponent.config.footer_.show_partners == 1
                                    : appComponent.config.footer.showPartners
                            "
                            :sponsors="SPONSORS"
                            :copyright="COPYRIGHT" /> <!-- Rendering Sponsors if configured to show -->
                        <Copyright
                            :license="LICENSE"
                            :pathDownloadApp="DOWLOAD_APP_URL"
                            :showVirtualsoft="SHOW_VIRTUALSOFT_COPYRIGHT"
                            :textInfo="TEXT_INFO"
                            :showDownloadApp="SHOW_DOWNLOAD_APP"
                            :showDownloadAppIos="SHOW_DOWNLOAD_APP_IOS" /> <!-- Rendering Copyright component with various props -->
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
                            appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.show_virtualsoft != undefined
                                ? appComponent.config.footer_.show_virtualsoft
                                : appComponent.config.footer.virtualsoft
                        "
                        class="footer-description w-full text-center font-normal"
                    >
                        <span class="text-neutral">{{ $t('Sitio Desarrollado Por') }}</span>
                        <a
                            target="_blank"
                            href="https://virtualsoftlatam.com/"
                            class="font-bold"
                        >
                            <img
                                alt="Virtualsoft"
                                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                                class="mx-auto"
                                height="38"
                                width="150"
                            /> <!-- Rendering Virtualsoft logo with lazy loading -->
                        </a>
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
            <SeoP2 v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_seo_landing != undefined && appComponent.config.footer_.show_seo_landing"/> <!-- SEO component conditionally rendered based on config -->
            <AppMenuFooter3
                v-if="
          appComponent.config.footer_ != undefined && appComponent.config.footer_.show_menu != undefined
            ? appComponent.config.footer_.show_menu && appComponent.onfig.footer.styleVersion != 4
            : appComponent.config.footer.showMenuFooter && appComponent.config.footer.styleVersion != 4
        "
            />
            <hr
                class="w-full  rounded-full border-none my-2 bg-neutral h-[2px]"
            /> <!-- Horizontal rule with dynamic class based on style version -->
            <CarouselProviders3V2
                v-if="
          appComponent.config.footer_ != undefined &&
          appComponent.config.footer_.show_payments != undefined
            ? appComponent.config.footer_.show_payments
            : appComponent.config.providers.showFooterProviders
        "
            /> <!-- Carousel for providers conditionally rendered -->
            <hr
                class="w-full  rounded-full border-none my-2 bg-neutral h-[2px]"
            /> <!-- Another horizontal rule with dynamic class -->
            <div
                v-if="
          appComponent.config.footer_ != undefined &&
          appComponent.config.footer_.version_style != undefined
            ? appComponent.config.footer_.version_style == 3
            : appComponent.config.footer.styleVersion == 3
        "
                class="version3 footer pb-16 block"
            >
                <div class="w-full mx-auto">
                    <div
                        class="w-full grid grid-cols-1 md:grid-cols-3 justify-center mb-4 mx-auto gap-y-9 gap-x-4"
                    >
                        <AppSocialNetworks
                            v-if="
                appComponent.config.footer_ != undefined &&
                appComponent.config.footer_.show_social_networks != undefined
                  ? appComponent.config.footer_.show_social_networks
                  : appComponent.config.footer.showSocial
              "
                        /> <!-- Social networks component conditionally rendered -->
                        <AppSponsors
                            v-if="
                appComponent.config.footer_ != undefined &&
                appComponent.config.footer_.show_partners != undefined
                  ? appComponent.config.footer_.show_partners == 1
                  : appComponent.config.footer.showPartners
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
              appComponent.config.footer_ != undefined &&
              appComponent.config.footer_.show_virtualsoft != undefined
                ? appComponent.config.footer_.show_virtualsoft
                : appComponent.config.footer.virtualsoft
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
        class="in page-footer px-2 flex flex-col justify-center items-center bg-gradient-to-b from-base-content via-base-300 to-base-300 to-50% pt-10 pb-32 lg:pb-16 gap-10"
    >
        <div
            v-if="
              appComponent.config.footer_ != undefined &&
              appComponent.config.footer_.show_payments != undefined
                ? appComponent.config.footer_.show_payments
                : appComponent.config.providers.showFooterProviders
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
                        v-for="value in appComponent.config.PROVIDERS[appComponent.country]"
                        class="w-32 md:w-[140px] h-16 md:h-[72px] bg-base-200 rounded-lg flex justify-center items-center p-2 lg:p-4 hover:scale-105 transition-transform duration-300 ease-in-out shadow-xl shadow-base-content/25"
                    >
                        <RouterLink
                            :to="appComponent.config.baseUrlFx + '/gestion/deposito'"
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
                        appComponent.config.footer_ != undefined &&
                        appComponent.config.footer_.show_social_networks != undefined
                          ? appComponent.config.footer_.show_social_networks
                          : appComponent.config.footer.showSocial
                      "
                    class="flex justify-center items-center gap-8"
                >
                    <!-- Loop through social links based on configuration -->
                    <li
                        v-for="value in appComponent.config['not_login'] != undefined &&
                        appComponent.config['not_login'][appComponent.lngProd] != undefined &&
                        appComponent.config['not_login'][appComponent.lngProd]['social_links'] !=
                            undefined
                            ? appComponent.config['not_login'][appComponent.lngProd][
                                    'social_links'
                                ]
                            : appComponent.config.SOCIAL_NEWTWORKS[appComponent.country]"
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
                                    appComponent.config['not_login'] != undefined &&
                                    appComponent.config['not_login'][appComponent.lngProd] !=
                                        undefined &&
                                    appComponent.config['not_login'][appComponent.lngProd][
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
                                appComponent.config.logo_ != undefined &&
                                appComponent.config.logo_['dark'] != undefined &&
                                appComponent.config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? appComponent.config.logo_['dark']
                                    : appComponent.config.logo_['light']
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
                                appComponent.config.logo_ != undefined &&
                                appComponent.config.logo_['dark'] != undefined &&
                                appComponent.config.logo_['light'] != undefined &&
                                !appComponent.themeSportbook
                                    ? appComponent.config.logo_['dark']
                                    : appComponent.config.logo_['light']
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
            >
                {{ $t(appComponent.config.footer.license) }}
            </p>
        </div>
    </footer>
    <!-- Style footer version 5 -->
			<footer
				v-if="
					appComponent.config.footer_ != undefined &&
					appComponent.config.footer_.style != undefined && 
                    appComponent.config.footer_.style == 5
				"
				class="w-full flex flex-col justify-center items-center gap-4 bg-base-300">
				<!-- SEO component displayed conditionally based on footer configuration -->
				<SeoP2 v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_seo != undefined"/>
		<!-- Horizontal line separator -->
		<hr 
		v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_.logo !== undefined || appComponent.config.footer_.copyright !== undefined || (appComponent.config.footer_.show_18_more !== undefined && appComponent.config.footer_.show_18_more.on))"
		class="line-hr w-[85%] md:w-[95%] bg-neutral max-w-full mx-auto" />
		<!-- Section for logo and owner information -->
		<section 
			v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_.logo !== undefined || appComponent.config.footer_.copyright !== undefined || (appComponent.config.footer_.show_18_more !== undefined && appComponent.config.footer_.show_18_more.on))"
			class="w-[90%] md:w-[95%] flex flex-col md:flex-row justify-center md:justify-between items-center max-w-[600px] mx-auto gap-6 md:gap-0">
			<!-- Logo link to home, displayed if logo is configured -->
			<RouterLink
				v-if="appComponent.config['footer_'].logo"
				to="/home"
				class="w-40 md:w-52 h-14 hover:scale-110 cursor-pointer transition-all duration-500"
			>
				<!-- Logo image with lazy loading -->
				<img v-lazy="appComponent.config['footer_'].logo" alt="logo"
					 class="w-full h-full object-contain aspect-auto" />
			</RouterLink>
			<!-- Owner image link, displayed if owner information is configured -->
			<div class="flex flex-col justify-center items-center">
				<span 
					v-if="appComponent.config.footer_ !== undefined && appComponent.config.footer_.copyright !== undefined"
					class="text-base text-neutral font-semibold font-poppinssb">{{ $t(appComponent.config.footer_.copyright) }}</span>
				<div class="flex justify-center items-center">
					<div
						v-if="appComponent.config['footer_']['show_18_more'] !== undefined && appComponent.config['footer_']['show_18_more'].on !== undefined && appComponent.config['footer_']['show_18_more'].on"
						class="w-40 md:w-52 h-12 cursor-pointer transition-all duration-500"
					>
						<!-- Owner image with lazy loading -->
						<img v-lazy="appComponent.config['footer_']['show_18_more'].img" alt="owner"
							 class="w-full h-full object-contain aspect-auto" />
					</div>
					<div
						v-if="appComponent.config['footer_'] !== undefined && appComponent.config['footer_']['owner'] !== undefined"
						class="w-40 md:w-52 h-12 cursor-pointer transition-all duration-500"
					>
						<!-- Owner image with lazy loading -->
						<img v-lazy="appComponent.config['footer_']['owner']" alt="owner"
							 class="w-full h-full object-contain aspect-auto" />
					</div>
				</div>
			</div>
		</section>
		<!-- Horizontal line separator -->
		<hr 
		v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_league !== undefined || (appComponent.config.footer_.show_partners !== undefined && appComponent.config.footer_.show_partners))"
		class="line-hr w-[85%] md:w-[95%] bg-neutral max-w-full mx-auto" />
		<!-- Section for league logo and sponsors -->
		<section
			v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_league !== undefined || (appComponent.config.footer_.show_partners !== undefined && appComponent.config.footer_.show_partners))"
			class="w-[85%] md:w-[95%] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 max-w-[1112px] mx-auto">
			<!-- League logo displayed if configured -->
			<img v-if="appComponent.config['footer_'].league" v-lazy="appComponent.config['footer_'].league" alt="league"
				 class="w-full md:w-96 h-18 object-contain aspect-auto" />
			<!-- List of sponsors displayed conditionally based on configuration -->
			<ul
				v-if="
					appComponent.config.footer_ != undefined &&
					appComponent.config.footer_.show_partners != undefined &&
					appComponent.config.footer_.show_partners
				  "
				class="flex justify-center items-center flex-wrap"
			>
				<!-- Sponsor images displayed in a list -->
				<li v-for="sponsor in SPONSORS" class="w-[70px] h-[70px]">
					<img :alt="sponsor.title" :src="sponsor.img" class="w-full h-full aspect-square object-contain" />
				</li>
			</ul>
		</section>
		<!-- Horizontal line separator -->
		<hr 
		v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_.show_payments !== undefined && appComponent.config.footer_.show_payments || (appComponent.config.footer_.show_download_app != undefined && appComponent.config.footer_.show_download_app) || (appComponent.config.footer_.show_download_app_ios != undefined && appComponent.config.footer_.show_download_app_ios) || (appComponent.config.footer_.license !== undefined && appComponent.config.footer_.license != ''))"
		class="line-hr w-[85%] md:w-[95%] bg-neutral max-w-full mx-auto" />
		<!-- Section for payment methods and app download link -->
		<section
			v-if="appComponent.config.footer_ !== undefined && (appComponent.config.footer_.show_payments !== undefined && appComponent.config.footer_.show_payments || (appComponent.config.footer_.show_download_app != undefined && appComponent.config.footer_.show_download_app) || (appComponent.config.footer_.show_download_app_ios != undefined && appComponent.config.footer_.show_download_app_ios) || (appComponent.config.footer_.license !== undefined && appComponent.config.footer_.license != ''))"
			class="w-[90%] md:w-full flex flex-col md:flex-row justify-center items-center max-w-[1112px] mx-auto gap-6 md:gap-0">
			<div
				v-if="
					appComponent.config.footer_ != undefined &&
					appComponent.config.footer_.show_payments != undefined && appComponent.config.footer_.show_payments
				  "
				class="w-full md:w-[50%] flex flex-col justify-center items-center gap-6"
			>
				<!-- Payment methods title -->
				<span class="text-base text-neutral font-poppinsm font-semibold">{{ $t('Medios de pago') }}</span>
				<!-- List of payment provider logos -->
				<ul class="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-md">
					<li v-for="provider in PROVIDERS" class="w-[60px] h-[60px] flex justify-center items-center">
						<img :alt="provider.NAME" :src="provider.ICON"
							 class="w-full h-full aspect-square object-contain" />
					</li>
				</ul>
			</div>
			<div class="w-full md:w-[25%] flex justify-center items-center gap-4">
				<!-- App download link displayed conditionally -->
				 <div class="flex flex-col justify-center items-center gap-2">
				<RouterLink
					@click="appComponent.gAnalytics('android_download')"
					:to="appComponent.config.footer_.download_app_url !== undefined ? appComponent.config.footer_.download_app_url : '/landing/app-pwa'"
					v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_download_app != undefined && appComponent.config.footer_.show_download_app"
					class="w-full flex flex-col justify-center items-center"
				>
					<!-- App download image -->
					<img src="https://images.virtualsoft.tech/m/msjT1666886104.png" alt="app"
						 class="w-[125px] h-[46px] object-contain aspect-auto" />
						
                </RouterLink>
				<RouterLink
					@click="appComponent.gAnalytics('ios_download')"
					:to="appComponent.config.footer_.download_app_url_ios !== undefined ? appComponent.config.footer_.download_app_url_ios : '/landing/app-pwa'"
					v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.show_download_app_ios != undefined && appComponent.config.footer_.show_download_app_ios"
					class="w-full flex flex-col justify-center items-center"
				>
					<!-- App IOS download image -->
					<img src="https://images.virtualsoft.tech/m/msj0212T1739909673.png" alt="app"
						 class="w-[125px] h-[46px] object-contain aspect-auto" />
						
                </RouterLink>
				 <div
        		    class="egaming w-[83px] h-[90px] object-contain aspect-auto"
        		    id="ceg-4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
        		    data-ceg-seal-id="4e1f3aee-39ec-46a7-8984-6b1b0a00002a"
        		    data-ceg-image-size="25"
        		    data-ceg-image-type="basic-small"
        		></div>
		</div>
			</div>
			<!-- License information displayed -->
				<span 
				v-if="appComponent.config.footer_.license !== undefined && appComponent.config.footer_.license != ''"
				class="w-full md:w-[70%] text-base font-medium font-poppinsm text-neutral text-center text-justify">{{ $t(appComponent.config.footer_.license) }}</span>
		</section>
		<!-- Horizontal line separator -->
		<hr 
		v-if="appComponent.config.footer_ != undefined && ((appComponent.config.footer_.textInfo != undefined && appComponent.config.footer_.textInfo != '') || (appComponent.config.footer_.show_virtualsoft != undefined && appComponent.config.footer_.show_virtualsoft))"
		class="line-hr w-[85%] md:w-[95%] bg-neutral max-w-full mx-auto" />
		<section 
		v-if="appComponent.config.footer_ != undefined && ((appComponent.config.footer_.textInfo != undefined && appComponent.config.footer_.textInfo != '') || (appComponent.config.footer_.show_virtualsoft != undefined && appComponent.config.footer_.show_virtualsoft))"
		class="w-[90%] md:w-[95%] flex flex-col justify-center items-center gap-8 max-w-[1112px] mx-auto"
		>
			<div v-if="appComponent.config.footer_ != undefined && appComponent.config.footer_.textInfo != undefined && appComponent.config.footer_.textInfo != ''">
				<div class="text-sm font-medium font-poppinsm text-neutral flex flex-col justify-center items-center text-center" v-html="appComponent.config.footer_.textInfo"></div>
			</div>
			<div
            v-if="
              appComponent.config.footer_ != undefined &&
              appComponent.config.footer_.show_virtualsoft != undefined && appComponent.config.footer_.show_virtualsoft
            "
            class="w-full flex flex-col items-center justify-center text-center gap-5"
          >
            <span class="text-sm font-medium font-poppinsm text-neutral">{{
              $t("Sitio Desarrollado Por")
            }}</span> <!-- Text indicating the site developer -->
            <a
              target="_blank"
              href="https://virtualsoftlatam.com/"
            >
              <img
                alt="virtualsoft"
                v-lazy="'https://images.virtualsoft.tech/m/msjT1666886395.png'"
                height="58"
                width="200"
              />
            </a> <!-- Link to the developer's site with an image -->
          </div>
		</section>
		<!-- Horizontal line separator -->
		<hr class="line-hr w-[85%] md:w-[95%] bg-neutral max-w-full mx-auto" />
		<!-- Section for footer menu displayed conditionally -->
		<section
			v-if="
				appComponent.config.footer_ != undefined &&
				appComponent.config.footer_.show_menu != undefined
				  ? appComponent.config.footer_.show_menu
				  : appComponent.config.footer.showMenuFooter
			  "
			class="w-[90%] md:w-[95%] grid grid-cols-2 md:flex justify-around items-start gap-8 md:gap-16 max-w-[1112px] mx-auto"
		>
			<!-- Menu items iterated from menuFooter -->
			<div v-for="menu in MENU_FOOTER_LIGHT" class="flex flex-col gap-2">
				<!-- Menu title -->
				<span class="text-base font-semibold font-poppinsm text-primary">{{ $t(menu.MENU_TITLE) }}</span>
				<!-- Submenu items -->
				<ul class="flex flex-col gap-1">
					<li v-for="submenu in menu.MENU_LIST" class="text-sm font-light hover:text-primary text-info-text">
						<!-- RouterLink for self-targeting submenu -->
						<RouterLink
							v-if="submenu.TARGER == 'self'"
							:to="submenu.MENU_URL"
							:aria-label="submenu.MENU_TITLE"
							@click="appComponent.gAnalytics('interaction_footer', {section: menu.MENU_TITLE, element: submenu.MENU_TITLE})"
						>
							<span
								:id="`footer-${submenu.MENU_ID}`"
								:aria-label="submenu.MENU_TITLE"
							>
								{{ $t(submenu.MENU_TITLE) }}
							</span>
						</RouterLink>
						<!-- External link for blank-target submenu -->
						<a
							v-if="submenu.TARGER == 'blank'"
							:id="submenu.MENU_ID"
							:aria-label="submenu.MENU_TITLE"
							:href="submenu.MENU_URL"
							target="_blank"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</a>
						<!-- Top-target link for submenu -->
						<a
							v-if="submenu.TARGER == '_top'"
							:id="submenu.MENU_ID"
							:aria-label="submenu.MENU_TITLE"
							:href="submenu.MENU_URL"
							target="_top"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</a>
					</li>
				</ul>
			</div>
		</section>
		<!-- Section for social networks displayed conditionally -->
		<section
			v-if="
				appComponent.config.footer_ != undefined &&
				appComponent.config.footer_.show_social_networks != undefined
				  ? appComponent.config.footer_.show_social_networks
				  : appComponent.config.footer.showSocial
			  "
			class="w-full mb-10 md:my-10 flex justify-center items-center max-w-[1112px] md:mb-auto"
		>
			<!-- List of social media icons -->
			<ul class="w-full flex justify-around md:justify-center items-center md:gap-14">
				<li v-for="value in SOCIAL_NEWTWORKS"
					class="bg-primary rounded-full flex items-center justify-center z-[9] hover:scale-125 w-[45px] h-[45px] object-contain transition-all duration-300">
					<a
						class="icons-socials flex justify-center items-center"
						:href="value.SOCIAL_URL"
						target="_blank"
						:aria-label="value.SOCIAL_NAME"
					>
						<!-- Font Awesome icon for social media -->
						<font-awesome-icon
							:id="'1.1 RRSS – ' + value.SOCIAL_NAME"
							v-if="value.SOCIAL_ICON != undefined"
							class="z-20 text-white w-[25px] h-[25px]"
							:icon="appComponent.config['not_login'] != undefined && appComponent.config['not_login'][appComponent.lngProd] != undefined  && appComponent.config['not_login'][appComponent.lngProd]['social_links'] != undefined ? { prefix: 'fab', iconName: value.SOCIAL_ICON } : value.SOCIAL_ICON"
						/>
					</a>
				</li>
			</ul>
		</section>
		<!-- Bottom container for additional logos and SVGs -->
		<div class="relative w-full h-[45px] bg-primary flex justify-center items-center">
			<!-- Logo link to home, displayed if configured -->
			<RouterLink v-if="appComponent.config['footer'].logo2"
						to="/home"
						class="w-full flex justify-center items-center gap-6 overflow-hidden  z-10"
			>
				<!-- Animated logo images -->
				<img
					v-for="index in 35"
					:key="index"
					v-lazy="appComponent.config['footer'].logo2"
					alt="logo"
					class="logo-animation-bottom w-[95px] h-[17px] object-contain hover:scale-110 transition-all duration-700"
				/>
			</RouterLink>
		</div>
        <div 
			v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
        	    appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
        	    appComponent.config.footer_.complaintsBook_.on
        	"
			class="w-full flex justify-center items-center">
            <AppComplaintsBook/>
        </div>
	
			</footer>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

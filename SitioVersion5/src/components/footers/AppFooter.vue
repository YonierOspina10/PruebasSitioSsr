<script lang="ts">
import AppCarouselProviders from '../CarouselProviders.vue'; // Importing the carousel providers component
import AppMenuFooter from '../menus/MenuFooter.vue'; // Importing the footer menu component
import AppSocialNetworks from '../SocialNetworks.vue'; // Importing the social networks component
import AppSponsors from '../Sponsors.vue'; // Importing the sponsors component
import AppCopyright from '../Copyright.vue'; // Importing the copyright component
import AppComplaintsBook from '../ComplaintsBook.vue'; // Importing the complaints book component
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import SeoP2 from '../SeoP2.vue';
import { getSponsors, getProviders, getLicense, getMenuFooterLight, getSocialMedia } from '../../utils/configHome.js';

export default defineComponent({
	components: {
		AppCarouselProviders, // Registering the carousel providers component
		AppMenuFooter, // Registering the footer menu component
		AppSocialNetworks, // Registering the social networks component
		AppSponsors, // Registering the sponsors component
		AppCopyright, // Registering the copyright component
        AppComplaintsBook, // Registering the complaints book component
		SeoP2
	},
	data() {
		let config = this.$config(); // Retrieving the application configuration
		let appComponent: any = this.$appComponent; // Storing the application component reference
		// Fetch sponsors based on app component configuration
		let sponsors = getSponsors(appComponent);
		// Fetch payment providers based on app component configuration
		let providers = getProviders(appComponent);
		// Fetch license information based on app component configuration
		let license = getLicense(appComponent);
		// Fetch footer menu items based on app component configuration
		let menuFooter = getMenuFooterLight(appComponent);
		// Fetch social media links based on app component configuration
		let socialMedia = getSocialMedia(appComponent);
		return {
			config, // Exposing the config to the template
			appComponent, // Exposing the appComponent to the template
			sponsors, // Exposing sponsors to the template
			providers, // Exposing providers to the template
			license, // Exposing license to the template
			menuFooter, // Exposing menuFooter to the template
			socialMedia, // Exposing socialMedia to the template
		};
	},
	methods: {
		/**
		 * Redirects to a specified URL based on the box object.
		 * @param {any} box - The box object containing the URL to redirect to.
		 */
		clickBox(box: any) {
			window.location.href = this.config.baseUrlFx + box.url; // Redirecting to the constructed URL
		},
	},
	mounted() {
		// Checking if the configuration and necessary properties are defined
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login'][this.appComponent.lngProd] != undefined &&
			this.config['not_login'][this.appComponent.lngProd][
				'social_links'
			] != undefined
		) {
			// Assigning social links to the corresponding country in the configuration
			this.config.SOCIAL_NEWTWORKS[this.appComponent.country] =
				this.config['not_login'][this.appComponent.lngProd][
					'social_links'
				];
		}
	},
});
</script>
<template>
	<!-- Main template for the Vue component -->
	<footer>
		<!-- Main footer container -->
		<div
			class="page-footer text-neutral bg-base-300"
			:class="
				config.providers.lightColor
					? 'light'
					: ''
			"
			:style="{
				'background-color':
					config.footer_ != undefined &&
					config.footer_.background != undefined
						? config.footer_.background
						: '',
			}"
		>
			<!-- Carousel for payment providers -->
			<AppCarouselProviders
				v-if="
					config.footer_ != undefined &&
					config.footer_.show_payments != undefined && config.footer_.version_style != 5
						? config.footer_.show_payments
						: config.providers.showFooterProviders != undefined && config.providers.showFooterProviders && config.footer_.version_style != 5
						? config.providers.showFooterProviders
						: undefined
				"
			></AppCarouselProviders>
			<!-- Footer menu -->
			<AppMenuFooter
				v-if="
					config.footer_ != undefined &&
					config.footer_.show_menu != undefined && config.footer_.version_style != 5
						? config.footer_.show_menu
						: config.footer.showMenuFooter != undefined && config.footer.showMenuFooter && config.footer_.version_style != 5
						? config.footer.showMenuFooter
						: undefined
				"
			></AppMenuFooter>
			<!-- Conditional layout based on version style -->
			<div
				v-if="
					config.footer_ != undefined &&
					config.footer_.version_style != undefined
						? config.footer_.version_style == 1
						: config.footer.styleVersion == 1
				"
				class="flex flex-col items-center justify-center"
			>
				<!-- Main footer links -->
				<div
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_menu != undefined
							? config.footer_.show_menu
							: config.footer.showMenuFooter
					"
					id="mainfooter"
					class="w-full py-3.5 bg-base-200"
				>
					<div class="w-[100%] col s12 m12 l12">
						<ul
							class="flex justify-center items-center flex-col md:flex-row gap-y-3"
						>
							<!-- Loop through footer menu items -->
							<li
								v-for="value in config.MENU_FOOTER[
									appComponent.country
								]"
								class="text-[1.3rem] not-italic font-light font-sans main-item menu-home selected px-10"
							>
								<!-- Router link for internal menu items -->
								<RouterLink
									:to="value.MENU_URL"
									class="menu-item w-full text-center"
								>
									<span
										class="menu-item_Center text-neutral"
										v-if="value.TYPE !== 'EXTERNAL'"
										>{{ $t(value.MENU_TITLE) }}</span
									></RouterLink
								>
								<!-- Anchor link for external menu items -->
								<a
									:target="value.MENU_TARGET"
									:href="value.MENU_URL"
									class="menu-item w-full text-center"
								>
									<span
										class="menu-item_Center flex items-center text-neutral"
										v-if="value.TYPE === 'EXTERNAL'"
										>{{ $t(value.MENU_TITLE) }}</span
									></a
								>
							</li>
						</ul>
					</div>
				</div>
				<!-- Social networks section -->
				<div
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_social_networks != undefined
							? config.footer_.show_social_networks
							: config.footer.showSocial
					"
					id="siguenos-footer"
					class="col-12 col-md-4"
				>
					<!-- Social widget for Facebook and Twitter -->
					<div
						v-if="
							config.footer_ != undefined &&
							config.footer_.social_widget != undefined
								? config.footer_.social_widget
								: config.footer != undefined &&
									config.footer[appComponent.country] !=
										undefined &&
									config.footer[appComponent.country]
										.social_widget != undefined &&
									config.footer[appComponent.country]
										.social_widget.show
						"
						class="social_widget"
						style="width: 100%; height: 40px"
					>
						<div
							class="social_widget-fb"
							style="
								display: inline-block;
								vertical-align: top;
								padding: 0 3px;
							"
						>
							<div
								class="fb-like"
								data-href="{{config.footer[appComponent.country].social_widget.facebook}}"
								data-layout="button_count"
								data-action="like"
								data-size="small"
								data-show-faces="false"
								data-share="false"
							></div>
						</div>
						<div
							class="social_widget-tw"
							style="display: inline-block; padding: 0 3px"
						>
							<a
								:href="
									config.footer[appComponent.country]
										.social_widget.twitter
								"
								class="twitter-follow-button"
								data-lang="es"
								data-show-count="false"
								>Follow @doradobet</a
							>
						</div>
					</div>
					<h5 class="text-sm font-light">$t('Síguenos en')</h5>
					<div class="redes-sociales">
						<ul style="">
							<!-- Loop through social networks -->
							<li
								v-for="value in config.SOCIAL_NEWTWORKS[
									appComponent.country
								]"
							>
								<a :href="value.SOCIAL_URL" target="_blank"
									><span class="hidden"
										>{{ value.SOCIAL_NAME }} Doradobet</span
									>
									<span
										v-if="value.SOCIAL_ICON != undefined"
										v-html="value.SOCIAL_ICON"
									></span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- Partners section -->
				<div
					v-if="
						config.footer_ != undefined &&
						config.footer_.show_partners != undefined
							? config.footer_.show_partners == 1
							: config.footer.showPartners
					"
					class="col-12 col-md-4"
				>
					<div
						class="div-text ng-binding"
						style="
							font-weight: bold;
							font-size: 13px;
							margin-top: 15px;
						"
					>
						Patrocinador Oficial:
					</div>
					<div class="redes-sociales" style="padding-top: 0px">
						<ul>
							<li class="ng-scope">
								<div class="ng-binding ng-scope">
									<img
										alt="alianza-lima"
										src="https://images.doradobet.com/sports/LOGO-ALIANZA-LIMA.png"
										style="height: 90px"
									/>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!-- Copyright and additional information -->
				<div class="col-12 col-md-4 copyright-footer">
					<div
						class="footer-right"
						v-if="
							config.footer_ != undefined &&
							config.footer_.show_18_more != undefined
								? config.footer_.show_18_more
								: config.footer.show18text
						"
					>
						<ul class="flex justify-center">
							<li>
								<img
									:src="config.footer.show18text.src"
									width="40"
									alt="+18 Años"
								/>
							</li>
						</ul>
						<a
							v-if="config.partner == '0'"
							href="/landing/app"
							id="accion_descargaandroid"
							><img
								:src="
									$t(
										'https://images.virtualsoft.tech/m/msjT1666886104.png'
									)
								"
								style="
									width: 150px;
									margin-top: 5px;
									margin-bottom: 5px;
								"
						/></a>
						<div class="egaming" id="egaming"></div>
						<p class="" v-html="$t(config.footer.license)"></p>
					</div>
					<div
						v-if="
							config.footer_ != undefined &&
							config.footer_.show_virtualsoft != undefined
								? config.footer_.show_virtualsoft
								: config.footer.virtualsoft
						"
						class="footer-description flex flex-col items-center justify-center text-neutral"
						style="font-weight: 400"
					>
						<span v-t>Desarrollado Por</span>
						<a
							target="_blank"
							href="https://virtualsoftlatam.com/"
							style="font-weight: bold"
						>
							<img
								alt="virtualsoft"
								src="https://images.virtualsoft.tech/m/msjT1666886395.png"
								style="width: 175px"
								class="m-auto"
						/></a>
					</div>
					<p
						id="derechos-autor"
						class=""
						v-if="
							config.footer[appComponent.country] != undefined &&
							config.footer[appComponent.country].copyright !=
								undefined
						"
					>
						<span
							v-html="
								$t(
									config.footer[appComponent.country]
										.copyright
								)
							"
						></span>
					</p>
				</div>

                <div class="w-full flex justify-center items-center">
                    <AppComplaintsBook
                        v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                    ></AppComplaintsBook>
                </div>
			</div>
			<!-- Additional footer styles based on version -->
			<div
				v-if="
					config.footer_ != undefined &&
					config.footer_.version_style != undefined
						? config.footer_.version_style == 2
						: config.footer.styleVersion == 2
				"
				class="bg-base-300 version2 pt-5 pb-20 border-primary border-solid text-sm"
			>
				<div class="w-10/12 mx-auto">
					<div class="col-12 col-md-4">
						<AppSponsors
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_partners != undefined
									? config.footer_.show_partners == 1
									: config.footer.showPartners
							"
						></AppSponsors>
                        <AppComplaintsBook
                            v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                                appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                                appComponent.config.footer_.complaintsBook_.on
                            "
                        ></AppComplaintsBook>
						<AppSocialNetworks
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_social_networks != undefined
									? config.footer_.show_social_networks
									: config.footer.showSocial
							"
						></AppSocialNetworks>
						<AppCopyright></AppCopyright>
					</div>
                    <div class="w-full flex justify-center items-center">
                        <AppComplaintsBook
                            v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                        ></AppComplaintsBook>
                    </div>
				</div>
			</div>
			<div
				v-if="
					config.footer_ != undefined &&
					config.footer_.version_style != undefined
						? config.footer_.version_style == 3
						: config.footer.styleVersion == 3
				"
				class="bg-base-300 version3 footer block"
				:style="{
					background:
						config.footer != undefined &&
						config.footer.background != undefined
							? config.footer.background
							: '',
				}"
			>
				<div class="w-10/12 mx-auto">
					<div
						class="grid md:grid-flow-col auto-cols-fr justify-center mt-4 mb-[9.5rem] mx-auto grid-cols-1 gap-y-9"
					>
						<AppSocialNetworks
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_social_networks != undefined
									? config.footer_.show_social_networks
									: config.footer.showSocial
							"
						></AppSocialNetworks>
						<AppSponsors
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_partners != undefined
									? config.footer_.show_partners == 1
									: config.footer.showPartners
							"
						></AppSponsors>
						<AppCopyright></AppCopyright>
					</div>
                    <div class="w-full flex justify-center items-center">
                        <AppComplaintsBook
                            v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                        ></AppComplaintsBook>
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
				class="bg-base-300 version3 footer block"
				:style="{
					background:
						config.footer != undefined &&
						config.footer.background != undefined
							? config.footer.background
							: '',
				}"
			>
				<div class="w-10/12 mx-auto">
					<div
						class="flex flex-col md:grid md:grid-flow-col md:auto-cols-fr justify-center my-4 mb-[9.5rem] mx-auto md:grid-cols-1 gap-y-9"
					>
						<div
							v-if="
								appComponent.config.layout != undefined &&
								appComponent.config.layout == 7 &&
								(appComponent.country == 'mx' ||
									appComponent.country == 've' ||
									appComponent.country == 'cl')
							"
						>
							<AppSocialNetworks
								v-if="
									config.footer_ != undefined &&
									config.footer_.show_social_networks !=
										undefined
										? config.footer_.show_social_networks
										: config.footer.showSocial
								"
							></AppSocialNetworks>
							<RouterLink
								v-if="
									config.footer_ != undefined &&
									config.footer_.show_download_app !=
										undefined
										? config.footer_.show_download_app
										: config.footer != undefined &&
											config.footer[
												appComponent.country
											] != undefined &&
											config.footer[appComponent.country]
												.showDownloadApp != undefined &&
											config.footer[appComponent.country]
												.showDownloadApp
								"
								@click="
									appComponent.gAnalytics('android_download')
								"
								:to="
									config.footer[appComponent.country]
										.downloadAppUrl
								"
								id="accion_descargaandroid"
								class="hidden md:block"
							>
								<img
									v-lazy="
										$t(
											'https://images.virtualsoft.tech/m/msjT1666886104.png'
										)
									"
									class="mx-auto img-info"
									height="118"
									width="600"
									alt="apk"
								/>
							</RouterLink>
						</div>
						<AppSocialNetworks
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_social_networks != undefined
									? config.footer_.show_social_networks
									: config.footer.showSocial
							"
							:class="
								appComponent.country == 'mx' ||
								appComponent.country == 've' ||
								appComponent.country == 'cl'
									? 'hidden'
									: ''
							"
						>
						</AppSocialNetworks>
						<RouterLink
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_download_app != undefined
									? config.footer_.show_download_app
									: config.footer != undefined &&
										config.footer[appComponent.country] !=
											undefined &&
										config.footer[appComponent.country]
											.showDownloadApp != undefined &&
										config.footer[appComponent.country]
											.showDownloadApp &&
										(appComponent.country == 'pe' ||
											appComponent.country == 'br' ||
											appComponent.country == 'pa')
							"
							@click="appComponent.gAnalytics('android_download')"
							:to="
								config.footer[appComponent.country]
									.downloadAppUrl
							"
							id="accion_descargaandroid"
							class="block md:hidden"
						>
							<img
								v-lazy="
									$t(
										'https://images.virtualsoft.tech/m/msjT1666886104.png'
									)
								"
								class="mx-auto img-info"
								height="118"
								width="600"
								alt="apk"
							/>
						</RouterLink>
						<AppCopyright
							v-if="
								appComponent.config.layout != undefined &&
								appComponent.config.layout == 7 &&
								(appComponent.country == 'pe' ||
									appComponent.country == 'br' ||
									appComponent.country == 'pa')
							"
							:class="
								appComponent.config.layout != undefined &&
								appComponent.config.layout == 7
									? 'md:block hidden'
									: ''
							"
						></AppCopyright>
						<AppSponsors
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_partners != undefined
									? config.footer_.show_partners == 1
									: config.footer.showPartners
							"
						></AppSponsors>
						<RouterLink
							v-if="
								appComponent.config.layout != undefined &&
								appComponent.config.layout == 7 &&
								config.footer_ != undefined &&
								config.footer_.show_download_app != undefined
									? config.footer_.show_download_app
									: config.footer != undefined &&
										config.footer[appComponent.country] !=
											undefined &&
										config.footer[appComponent.country]
											.showDownloadApp != undefined &&
										config.footer[appComponent.country]
											.showDownloadApp &&
										(appComponent.country == 'mx' ||
											appComponent.country == 've' ||
											appComponent.country == 'cl')
							"
							@click="appComponent.gAnalytics('android_download')"
							:to="
								config.footer[appComponent.country]
									.downloadAppUrl
							"
							id="accion_descargaandroid"
							class="md:hidden block"
						>
							<img
								v-lazy="
									$t(
										'https://images.virtualsoft.tech/m/msjT1666886104.png'
									)
								"
								class="mx-auto img-info"
								height="118"
								width="600"
								alt="apk"
							/>
						</RouterLink>
						<AppCopyright
							:class="
								appComponent.config.layout != undefined &&
								appComponent.config.layout == 7 &&
								appComponent.country != 'mx' &&
								appComponent.country != 've' &&
								appComponent.country != 'cl'
									? 'block md:hidden'
									: ''
							"
						></AppCopyright>
					</div>
                    <div class="w-full flex justify-center items-center">
                        <AppComplaintsBook
                            v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                        ></AppComplaintsBook>
                    </div>
				</div>
			</div>
			<!-- Style footer version 5 -->
			 <div
				v-if="
					config.footer_ != undefined &&
					config.footer_.version_style != undefined
						? config.footer_.version_style == 5
						: config.footer[appComponent.country].styleVersion == 5
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
				<li v-for="sponsor in sponsors" class="w-[70px] h-[70px]">
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
					<li v-for="provider in providers" class="w-[60px] h-[60px] flex justify-center items-center">
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
			<div v-for="menu in menuFooter" class="flex flex-col gap-2">
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
				<li v-for="value in socialMedia"
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
	
			</div>

		</div>
	</footer>
</template>
<style>
.footer {
	/* Removes the top border width for the footer */
	border-top-width: 0;
}
.footer {
	/* Sets the margin and padding for the footer */
	margin-top: 0;
	padding-top: 15px;
	font-weight: 400; /* Normal font weight */
}
.footer .footer-section {
	/* Styles for individual sections within the footer */
	text-align: left; /* Aligns text to the left */
	font-size: 12px; /* Sets font size */
	line-height: 20px; /* Sets line height for readability */
	margin: 0 auto !important; /* Centers the section with auto margins */
	padding-bottom: 27px; /* Adds padding at the bottom */
	border-bottom: 1px solid #d5d5d5; /* Adds a light gray bottom border */
}
.footer .container-footer {
	/* Padding for the footer container */
	padding-bottom: 25px; /* Adds padding at the bottom */
}
.footer span.title {
	/* Styles for the title within the footer */
	font-size: 15px; /* Sets font size for the title */
	font-weight: bold; /* Makes the title bold */
}
.page-footer {
	/* General styles for the page footer */
	padding-top: 0px; /* No padding at the top */
	background-color: #ededed; /* Light gray background color */
	color: white; /* Sets text color to white */
	font-size: 0.8rem; /* Sets font size */
	font-weight: 300; /* Light font weight */
	line-height: 1.4em; /* Sets line height for readability */
}
#derechos-autor {
	/* Styles for the copyright section */
	text-align: center; /* Centers the text */
	font-weight: normal; /* Normal font weight */
}
.promociones {
	/* Styles for promotional text */
	color: #ffe400; /* Yellow color for promotions */
	font-weight: 700; /* Bold font weight */
	font-size: 13px; /* Sets font size */
}
.img {
	/* Styles for images within the footer */
	display: inline-block; /* Displays images inline */
	max-width: 170px; /* Maximum width for images */
	vertical-align: middle; /* Aligns images vertically in the middle */
	padding: 0 10px; /* Horizontal padding */
	max-height: 77px; /* Maximum height for images */
}
</style>

<!-- FILE DOCUMENTED -->

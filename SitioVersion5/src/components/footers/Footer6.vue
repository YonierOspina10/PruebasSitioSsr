<template>
	<!-- Footer container with background and rounded corners -->
	<footer
		class="bg-base-300 rounded-t-[25px] desktop:rounded-t-[50px] pb-32 xl:pb-24 px-4 pt-8 tablet:px-8 w-full flex flex-col justify-start items-center gap-4 desktop:gap-20"
	>
		<!-- Main section for footer menu, displayed conditionally based on config -->
		<section
			class="w-full grid grid-cols-2 tablet:grid-cols-4 justify-center items-start gap-y-14 gap-x-5 desktop:gap-x-20 py-5 mx-auto max-w-[1155px]"
			v-if="
				config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
				config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
			"
		>
			<!-- Loop through footer menu items -->
			<div
				v-for="value in config.MENU_FOOTER_LIGHT[appComponent.country]"
				class="flex flex-col justify-center items-start"
			>
				<!-- Menu title -->
				<span
					class="text-info-text text-start desktop:text-xl font-bold mb-3"
					>{{ $t(value.MENU_TITLE) }}</span
				>
				<!-- Submenu list -->
				<ul class="flex flex-col justify-center items-start gap-y-2">
					<!-- Loop through submenu items -->
					<li
						v-for="submenu in value.MENU_LIST"
						class="w-full text-start py-1"
					>
						<!-- Router link for submenu targeting self -->
						<RouterLink
							v-if="submenu.TARGER == 'self'"
							:to="submenu.MENU_URL"
							:aria-label="submenu.MENU_TITLE"
						>
							<span
								:id="`footer-${submenu.MENU_ID}`"
								:aria-label="submenu.MENU_TITLE"
								:class="submenu.MENU_SECCION"
								@click="
									scrollTop();
									openModalInfo(submenu.MENU_ID);
									appComponent.gAnalytics(
										'interaction_footer',
										{
											section: value.MENU_TITLE,
											element: submenu.MENU_TITLE,
										}
									);
								"
								class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
								>{{ $t(submenu.MENU_TITLE) }}</span
							>
						</RouterLink>
						<!-- Anchor link for submenu targeting blank -->
						<a
							:id="submenu.MENU_ID"
							v-if="submenu.TARGER == 'blank'"
							:aria-label="submenu.MENU_TITLE"
							:href="submenu.MENU_URL"
							target="_blank"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
							>{{ $t(submenu.MENU_TITLE) }}</a
						>
						<!-- Button for submenu targeting chat -->
						<button
							:id="submenu.MENU_ID"
							v-if="submenu.TARGER == 'chat'"
							@click="onOpenChat()"
							:aria-label="submenu.MENU_TITLE"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:text-neutral-text text-sm desktop:text-lg text-start"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</button>
					</li>
				</ul>
			</div>
		</section>
		<!-- Section for social media links and copyright information -->
		<section
			class="flex flex-col justify-start items-center w-full gap-6 max-w-[1155px]"
		>
			<!-- Social widget section, displayed conditionally -->
			<div
				v-if="
					config.footer_ != undefined &&
					config.footer_.social_widget != undefined
						? config.footer_.social_widget
						: config.footer != undefined &&
							config.footer[appComponent.country] != undefined &&
							config.footer[appComponent.country].social_widget !=
								undefined &&
							config.footer[appComponent.country].social_widget
								.show
				"
				class="social_widget social-networks mb-8"
			>
				<!-- Facebook like button -->
				<div class="social_widget-fb">
					<div
						class="fb-like"
						:href="
							config.footer[appComponent.country].social_widget
								.facebook
						"
						target="_blank"
						data-layout="button_count"
						data-action="like"
						data-size="small"
						data-show-faces="false"
						data-share="false"
					></div>
				</div>
				<!-- Twitter follow button -->
				<div class="social_widget-tw">
					<a
						:href="
							config.footer[appComponent.country].social_widget
								.twitter
						"
						target="_blank"
						class="twitter-follow-button text-info-text"
						data-lang="es"
						data-show-count="false"
						>Follow @doradobet</a
					>
				</div>
			</div>
			<!-- Section for additional social links -->
			<div class="flex justify-center items-center flex-col gap-4">
				<span class="text-info-text text-xl">{{
					$t('Síguenos en:')
				}}</span>
				<ul class="flex justify-center items-center gap-8">
					<!-- Loop through social links -->
					<li
						v-for="value in config['not_login'] != undefined &&
						config['not_login'][appComponent.lngProd] !=
							undefined &&
						config['not_login'][appComponent.lngProd][
							'social_links'
						] != undefined
							? config['not_login'][appComponent.lngProd][
									'social_links'
								]
							: config.SOCIAL_NEWTWORKS[appComponent.country]"
						@click="
							appComponent.gAnalytics(
								'button_social_network',
								value
							)
						"
					>
						<a
							class="transition-all text-info-text hover:scale-105"
							:href="value.SOCIAL_URL"
							target="_blank"
							:aria-label="value.SOCIAL_NAME"
						>
							<div
								v-html="value.SOCIAL_ICON"
								class="icons-socials w-[40px] h-[40px] tablet:w-[60px] tablet:h-[60px] aspect-square border rounded-full p-2 flex justify-center items-center hover:scale-110 transition-transform duration-300 ease-in-out"
								:class="value.SOCIAL_NAME"
							></div>
						</a>
					</li>
				</ul>
			</div>
			<!-- Horizontal rule for separation -->
			<hr
				class="bg-neutral-focus h-[2px] w-[70%] desktop::w-2/3 rounded-full border-none my-2"
			/>
			<!-- Copyright information section -->
			<div
				class="copyright-footer w-full flex justify-center items-center flex-col gap-4"
			>
				<div class="footer-right text-center">
					<!-- Conditional display of footer text information -->
					<div
						v-if="
							config.footer != undefined &&
							config.footer[appComponent.country] != undefined &&
							config.footer[appComponent.country].textInfo !=
								undefined &&
							config.footer[appComponent.country].textInfo != ''
						"
						v-html="config.footer[appComponent.country].textInfo"
						class="max-w-xl desktop:max-w-5xl text-info-text text-center flex justify-center items-center mx-auto gap-2 text-xs desktop:text-base"
					></div>
				</div>
				<span class="text-info-text">{{
					$t('Sitio Desarrollado Por')
				}}</span>
				<!-- Section for partner logos and app download link -->
				<div
					class="flex justify-center items-center gap-0 tablet:gap-20 flex-col tablet:flex-row desktop:flex-col"
				>
					<div
						v-if="
							config.footer_ != undefined &&
							config.footer_.show_virtualsoft != undefined
								? config.footer_.show_virtualsoft
								: config.footer.virtualsoft
						"
					>
						<a
							target="_blank"
							href="https://virtualsoftlatam.com/"
							class="w-[150px]"
						>
							<img
								alt="virtualsoft"
								v-lazy="
									'https://images.virtualsoft.tech/m/msjT1666886395.png'
								"
								height="61"
								width="300"
								class="w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
							/>
						</a>
					</div>
					<div
						class="flex flex-col tablet:flex-row justify-center items-center tablet:gap-8"
					>
						<!-- Conditional display of age restriction logo -->
						<div
							v-if="
								config.footer_ != undefined &&
								config.footer_.show_18_more != undefined
									? config.footer_.show_18_more
									: config.footer.show18text
							"
							class="flex justify-center items-center w-[80px] h-[80px] aspect-square"
						>
							<img
								v-lazy="config.footer.show18text.src"
								width="63"
								height="63"
								alt="+18 Años"
								class="w-full h-full object-contain"
							/>
						</div>
						<!-- Router link for app download -->
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
											.showDownloadApp
							"
							@click="appComponent.gAnalytics('android_download')"
							:to="
								config.footer[appComponent.country]
									.downloadAppUrl
							"
							id="accion_descargaandroid"
							class="hover:scale-110 transition-transform duration-300 ease-in-out"
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
							<!-- Display app version if available -->
							<div
								v-if="activeVersionApp()"
								class="pb-5 text-info-text text-lg font-bold"
							>
								<p>
									{{ $t('Version de app: ') }}
									<span>
										{{ config.versionApp }}
									</span>
								</p>
							</div>
						</RouterLink>
					</div>
				</div>
			</div>

            <div class="w-full flex justify-center items-center">
                <AppComplaintsBook
                    v-if="appComponent.config != undefined && appComponent.config.footer_ != undefined &&
                            appComponent.config.footer_.complaintsBook_ != undefined && appComponent.config.footer_.complaintsBook_.on != undefined &&
                            appComponent.config.footer_.complaintsBook_.on
                        "
                ></AppComplaintsBook>
            </div>
		</section>
	</footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppComplaintsBook from '@/components/ComplaintsBook.vue';
export default defineComponent({
    components: { AppComplaintsBook },
	// Setup function for component
	setup() {
		return {};
	},
	// Data function to initialize component state
	data() {
		let config = this.$config(); // Fetch configuration
		let appComponent: any = this.$appComponent; // Access app component
		let zendesk: any = this.$zendesk; // Access Zendesk integration
		return {
			config,
			appComponent,
			zendesk,
		};
	},
	// Lifecycle hook called after component is mounted
	mounted() {
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['menu_footer'] != undefined
		) {
			// Set footer menu for the current country
			this.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
				this.config['not_login']['menu_footer'];
		}
	},
	methods: {
		// Scroll to the top of the main layout
		scrollTop() {
			const scroll: any = document.getElementById('main-layout');
			if (scroll != undefined) {
				scroll.scrollTo(0, 0);
			}
		},
		// Open modal with information based on parameter
		openModalInfo(param: any) {
			if (param == 'accion_modal') {
				this.appComponent.modal.showModal = 'data';
				this.appComponent.infoModal.dataText =
					'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo';
			}
		},
		// Open chat using Zendesk
		onOpenChat() {
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'open'
			);
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'show'
			);
		},
		// Check if the app version is active
		activeVersionApp() {
			if ((window as any).versionApp != undefined) {
				return true;
			} else {
				return false;
			}
		},
	},
});
</script>
<style scoped>
/* Style for social media icons */
.icons-socials {
	font-size: 60px !important;
	//width: 60px !important;
	//height: 60px !important;
}
/* Hover effects for specific social media icons */
.icons-socials.Facebook:hover {
	color: #3b5998 !important;
}
.icons-socials.X:hover {
	color: rgb(0, 0, 0) !important;
}
.icons-socials.Instagram:hover {
	color: #ca0284 !important;
}
.icons-socials.Whatsapp:hover {
	color: #128c7e !important;
}
.icons-socials.Youtube:hover {
	color: #c4302b !important;
}
.icons-socials.LinkedIN:hover {
	color: #0b66c2 !important;
}
.icons-socials.Telegram:hover {
	color: #229ed9 !important;
}
.icons-socials.Threads:hover {
	color: #ffffff !important;
}
.icons-socials.Tiktok:hover {
	color: #000000 !important;
}
/* Margin for the footer social links section */
div#siguenos-footer {
	margin-top: 1rem;
}
/* Reset padding for social links list */
.redes-sociales ul {
	padding-left: 0;
}
/* Style for social networks container */
.social-networks {
	width: 100%;
	height: 40px;
}
/* Style for Facebook widget */
.social_widget-fb {
	display: inline-block;
	vertical-align: top;
	padding: 0 3px;
}
/* Style for Twitter widget */
.social_widget-tw {
	display: inline-block;
	padding: 0 3px;
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the footer section of the application.
 */
export default defineComponent({
	/**
	 * Component data function that initializes configuration and app component.
	 * @returns {Object} The data object containing config and appComponent.
	 */
	data() {
		let config = this.$config(); // Fetches the configuration object.
		let appComponent: any = this.$appComponent; // References the application component.
		let zendesk: any = this.$zendesk; // Zendesk integration object
		return {
			config,
			appComponent,
			zendesk
		};
	},

	/**
	 * Lifecycle hook that runs after the component is mounted.
	 * Sets the footer menu based on the configuration if available.
	 */
	mounted() {
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['menu_footer'] != undefined
		) {
			this.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
				this.config['not_login']['menu_footer']; // Assigns footer menu based on country.
		}
	},

	methods: {
		/**
		 * Scrolls the main layout to the top.
		 */
		scrollTop() {
			const scroll: any = document.getElementById('main-layout'); // Gets the main layout element.
			if (scroll != undefined) {
				scroll.scrollTo(0, 0); // Scrolls to the top.
			}
		},

		/**
		 * Opens a modal with information based on the provided parameter.
		 * @param {any} param - The parameter to determine which modal to show.
		 */
		openModalInfo(param: any) {
			if (param == 'accion_modal') {
				this.appComponent.modal.showModal = 'data'; // Sets the modal to show.
				this.appComponent.infoModal.dataText =
					'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Sets the modal text.
			}
		},
		/**
         * Opens the chat interface and manages visibility based on the app configuration.
         */
        onOpenChat() {
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
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
            }else{
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'open'); // Open Zendesk chat
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'show'); // Show Zendesk chat
            }
        },
	},
});
</script>

<template>
	<!-- Main footer container with conditional rendering based on configuration -->
	<div
		class="bg-base-300 footer block"
		:style="{
			background:
				config.footer != undefined &&
				config.footer.background != undefined
					? config.footer.background
					: '',
		}"
		v-if="
			config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
			config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
		"
	>
		<!-- Container for footer content -->
		<div class="container-footer w-10/12 mx-auto block">
			<!-- Footer sections displayed in a grid layout -->
			<div
				class="footer-section grid md:grid-flow-col auto-cols-fr justify-center mt-4 grid-cols-2 gap-4"
				:class="[
					{
						'text-center':
							config.footer_ != undefined &&
							config.footer_.version_style != undefined
								? config.footer_.version_style == 2
								: config.footer.styleVersion == 2,
					},
					{
						'border-primary-content border-b-2':
							config.layout != undefined && config.layout == 7,
					},
				]"
			>
				<!-- Loop through footer menu items -->
				<div
					v-for="value in config.MENU_FOOTER_LIGHT[
						appComponent.country
					]"
					class="footer-menu"
				>
					<span
						class="uppercase text-lg font-bold ng-scope ng-binding text-neutral"
						>{{ $t(value.MENU_TITLE) }}</span
					>
					<!-- Submenu list -->
					<ul class="my-3 text-info-text">
						<li
							v-for="submenu in value.MENU_LIST"
							class="my-2 py-2 md:p-0 text-neutral"
						>
							<!-- Router link for internal navigation -->
							<RouterLink
								@click="
									appComponent.gAnalytics(
										'interaction_footer',
										{
											section: value.MENU_TITLE,
											element: submenu.MENU_TITLE,
										}
									)
								"
								v-if="submenu.TARGER == 'self'"
								:to="submenu.MENU_URL"
								:aria-label="submenu.MENU_TITLE"
								:data-analytics-label="(() => {
										const id = String(submenu.MENU_ID || '').trim().toLowerCase();
										const title = String(submenu.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin') || id.includes('terms') || title.includes('terms');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica') || id.includes('privacy') || title.includes('privacy');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons')) || id.includes('responsible') || title.includes('responsible');
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuFooter|layout:${appComponent.config.layout}`"
							>
								<span
									:id="`footer-${submenu.MENU_ID}`"
									:aria-label="submenu.MENU_TITLE"
									:class="submenu.MENU_SECCION"
									:data-analytics-label="(() => {
										const id = String(submenu.MENU_ID || '').trim().toLowerCase();
										const title = String(submenu.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin') || id.includes('terms') || title.includes('terms');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica') || id.includes('privacy') || title.includes('privacy');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons')) || id.includes('responsible') || title.includes('responsible');
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuFooter|layout:${appComponent.config.layout}`"
									@click="
										scrollTop();
										openModalInfo(submenu.MENU_ID);
									"
									>{{ $t(submenu.MENU_TITLE) }}</span
								>
							</RouterLink>
							<!-- External link for new tab navigation -->
							<a
								:id="submenu.MENU_ID"
								v-if="submenu.TARGER == 'blank'"
								:aria-label="submenu.MENU_TITLE"
								:href="submenu.MENU_URL"
								:data-analytics-label="(() => {
										const id = String(submenu.MENU_ID || '').trim().toLowerCase();
										const title = String(submenu.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin') || id.includes('terms') || title.includes('terms');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica') || id.includes('privacy') || title.includes('privacy');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons')) || id.includes('responsible') || title.includes('responsible');
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuFooter|layout:${appComponent.config.layout}`"
								target="_blank"
								:class="submenu.MENU_SECCION"
								>{{ $t(submenu.MENU_TITLE) }}</a
							>
							<!-- Link for top navigation -->
							<a
								:id="submenu.MENU_ID"
								v-if="submenu.TARGER == '_top'"
								:aria-label="submenu.MENU_TITLE"
								:href="submenu.MENU_URL"
								:data-analytics-label="(() => {
										const id = String(submenu.MENU_ID || '').trim().toLowerCase();
										const title = String(submenu.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin') || id.includes('terms') || title.includes('terms');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica') || id.includes('privacy') || title.includes('privacy');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons')) || id.includes('responsible') || title.includes('responsible');
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuFooter|layout:${appComponent.config.layout}`"
								target="_top"
								:class="submenu.MENU_SECCION"
								>{{ $t(submenu.MENU_TITLE) }}</a
							>
							<button
								:id="submenu.MENU_ID"
								v-if="submenu.TARGER == 'chat'"
								@click="onOpenChat()"
								:data-analytics-label="(() => {
										const id = String(submenu.MENU_ID || '').trim().toLowerCase();
										const title = String(submenu.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin') || id.includes('terms') || title.includes('terms');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica') || id.includes('privacy') || title.includes('privacy');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons')) || id.includes('responsible') || title.includes('responsible');
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuFooter|layout:${appComponent.config.layout}`"
								:aria-label="submenu.MENU_TITLE"
								:class="submenu.MENU_SECCION"
								class="text-neutral text-xs lg:text-sm text-start"
							>
								{{ $t(submenu.MENU_TITLE) }}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
/* No styles defined in this fragment */
</style>

<!-- FILE DOCUMENTED -->

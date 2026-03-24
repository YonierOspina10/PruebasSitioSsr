<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for the footer menu.
 */
export default defineComponent({
	/**
	 * Component data function.
	 * @returns {Object} The component's data properties.
	 */
	data() {
		let config = this.$config(); // Retrieves configuration settings.
		let appComponent: any = this.$appComponent; // Accesses the application component.
		let zendesk: any = this.$zendesk; // Accesses the Zendesk integration.
		return {
			config,
			appComponent,
			zendesk,
		};
	},

	/**
	 * Lifecycle hook called after the component is mounted.
	 */
	mounted() {
		// Checks if the configuration for the footer menu is defined and sets it.
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['menu_footer'] != undefined
		) {
			this.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
				this.config['not_login']['menu_footer'];
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
				this.appComponent.modal.showModal = 'data'; // Sets the modal to show data.
				this.appComponent.infoModal.dataText =
					'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Sets the modal text.
			}
		},

		/**
		 * Opens the chat based on the application's configuration.
		 */
		onOpenChat() {
			let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat iframe.
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal'
			) {
				// If the country is 'centribal', show the specific chat iframe.
				document
					.getElementById('centribal_iframe_layout')
					?.classList.remove('centribal_hidden');
				document
					.getElementById('centribal_iframe_layout')
					?.classList.add('centribal_open');
				postMessage('show_chat', '', ref_id); // Sends a message to show the chat.
			} else {
				// For other configurations, use the Zendesk API to open the chat.
				this.zendesk.zE(
					this.config.zendesk[this.appComponent.country].name,
					'open'
				);
				this.zendesk.zE(
					this.config.zendesk[this.appComponent.country].name,
					'show'
				);
			}
		},
	},
});
</script>

<template>
	<!-- Main container for the footer menu, displayed if the menu is defined for the country -->
	<div
		class="w-full flex justify-center items-center"
		v-if="
			config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
			config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
		"
	>
		<!-- Grid layout for footer items -->
		<div
			class="grid grid-cols-2 md:grid-cols-4 justify-center items-start gap-y-5 gap-x-5 lg:gap-x-20 py-5 px-2 w-auto max-w-[1000px]"
			:class="{
				'text-center':
					config.footer_ != undefined &&
					config.footer_.version_style != undefined
						? config.footer_.version_style == 2
						: config.footer.styleVersion == 2,
			}"
		>
			<!-- Loop through each menu item in the footer -->
			<div
				v-for="value in config.MENU_FOOTER_LIGHT[appComponent.country]"
				class="flex flex-col justify-center items-start"
                :class="appComponent.infoApp ? 'pt-32' : ''"
			>
				<!-- Menu title -->
				<span
					class="text-info-text text-start text-lg font-semibold mb-3"
					>{{ $t(value.MENU_TITLE) }}</span
				>
				<!-- Submenu list -->
				<ul class="flex flex-col justify-center items-start gap-y-2">
					<!-- Loop through each submenu item -->
					<li
						v-for="submenu in value.MENU_LIST"
						class="w-full text-start py-2"
                        :class="appComponent.infoApp && (
                            submenu.MENU_ID == 'accion_retiros' ||
                            submenu.MENU_ID == 'accion_depositos' ||
                            submenu.MENU_ID == 'accion_envivo' ||
                            submenu.MENU_ID == 'accion_casinoslots'
                        )
                        ? 'hidden'
                        : 'block'
                        "
					>
						<RouterLink
							v-if="submenu.TARGER == 'self'"
							:to="submenu.MENU_URL"
							:aria-label="submenu.MENU_TITLE"
						>
							<!-- Submenu link for self-targeting -->
							<span
								:id="`footer-${submenu.MENU_ID}`"
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

									return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
								})()"
								:data-analytics-context="`component:MenuFooter3|layout:${appComponent.config.layout}`"
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
								class="text-info-text hover:font-bold text-xs lg:text-sm text-start"
								>{{ $t(submenu.MENU_TITLE) }}</span
							>
						</RouterLink>
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

								return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
							})()"
							:data-analytics-context="`component:MenuFooter3|layout:${appComponent.config.layout}`"
							target="_blank"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:font-bold text-xs lg:text-sm text-start"
							>{{ $t(submenu.MENU_TITLE) }}</a
						>
						<button
							:id="submenu.MENU_ID"
							v-if="submenu.TARGER == 'chat'"
							@click="onOpenChat()"
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

								return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
							})()"
							:data-analytics-context="`component:MenuFooter3|layout:${appComponent.config.layout}`"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:font-bold text-xs lg:text-sm text-start"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style>
/* No styles defined in this fragment */
</style>

<!-- FILE DOCUMENTED -->

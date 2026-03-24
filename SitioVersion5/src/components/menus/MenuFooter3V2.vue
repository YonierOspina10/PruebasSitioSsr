<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import AppSocialNetworks from '../SocialNetworks.vue'; // Importing the AppSocialNetworks component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving the configuration object
		let appComponent: any = this.$appComponent; // Accessing the app component instance
		let zendesk: any = this.$zendesk; // Accessing the Zendesk instance
		return {
			config,
			appComponent,
			zendesk,
		};
	},
	components: {
		AppSocialNetworks, // Registering the AppSocialNetworks component
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted
		if (
			this.config != undefined &&
			this.config['not_login'] != undefined &&
			this.config['not_login']['menu_footer'] != undefined
		) {
			// Checking if the footer menu configuration exists
			this.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
				this.config['not_login']['menu_footer']; // Assigning the footer menu to the appropriate country
		}
	},
	methods: {
		openModalInfo(param: any) {
			// Method to open a modal with information
			if (param == 'accion_modal') {
				this.appComponent.modal.showModal = 'data'; // Setting the modal to show data
				this.appComponent.infoModal.dataText =
					'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Setting the modal text
			}
		},
		onOpenChat() {
			// Method to open the Zendesk chat
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'open'
			); // Opening the chat
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'show'
			); // Showing the chat
		},
	},
});
</script>
<template>
	<!-- Main container for the footer menu, displayed if the menu exists for the current country -->
	<div
		class="w-full flex flex-col md:flex-row justify-center items-center"
		v-if="
			config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
			config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
		"
	>
		<!-- Grid container for footer menu items -->
		<div
			class="grid grid-cols-2 md:grid-cols-4 justify-center items-start gap-y-5 gap-x-5 lg:gap-x-12 py-5 px-2 w-auto max-w-[1000px]"
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
			>
				<span
					class="text-info-text text-start text-sm font-medium mb-3"
					>{{ $t(value.MENU_TITLE) }}</span
				>
				<!-- List of submenu items -->
				<ul class="flex flex-col justify-center items-start">
					<li
						v-for="submenu in value.MENU_LIST"
						class="w-full text-start py-2"
					>
						<RouterLink
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
							:data-analytics-context="`component:MenuFooter3V2|layout:${appComponent.config.layout}`"
						>
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
  return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
})()"
								:data-analytics-context="`component:MenuFooter3V2|layout:${appComponent.config.layout}`"
								:class="submenu.MENU_SECCION"
								@click="openModalInfo(submenu.MENU_ID)"
								class="text-info-text hover:text-white text-xs font-light text-start"
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
  return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
})()"
							:data-analytics-context="`component:MenuFooter3V2|layout:${appComponent.config.layout}`"
							target="_blank"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:text-white text-xs font-light text-start"
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
  return `footer:link:${String(submenu.MENU_ID || submenu.MENU_TITLE || 'link').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
})()"
							:data-analytics-context="`component:MenuFooter3V2|layout:${appComponent.config.layout}`"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:text-accent-focus text-xs lg:text-sm text-start"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</button>
					</li>
				</ul>
			</div>
		</div>
		<AppSocialNetworks class="text-info-text m-0" />
		<!-- Social networks component -->
	</div>
</template>
<style>
/* No styles defined in this fragment */
</style>

<!-- FILE DOCUMENTED -->

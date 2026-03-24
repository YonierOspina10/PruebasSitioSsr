<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import AppSocialNetworks from '../SocialNetworks.vue'; // Importing a child component for social networks

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration data
		let appComponent: any = this.$appComponent; // Accessing the application component
		let zendesk: any = this.$zendesk; // Accessing the Zendesk integration
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
			// Setting the footer menu for non-logged-in users based on configuration
			this.config.MENU_FOOTER_LIGHT[this.appComponent.country] =
				this.config['not_login']['menu_footer'];
		}
	},
	methods: {
		openModalInfo(param: any) {
			// Method to open a modal with information based on the parameter
			if (param == 'accion_modal') {
				this.appComponent.modal.showModal = 'data'; // Triggering modal display
				this.appComponent.infoModal.dataText =
					'En Latinbet queremos brindarte la mejor atención, es por eso que te ofrecemos dos canales para resolver tus dudas: Whatsapp, correo'; // Setting modal text
			}
		},
		onOpenChat() {
			// Method to open the Zendesk chat
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'open'
			);
			this.zendesk.zE(
				this.config.zendesk[this.appComponent.country].name,
				'show'
			);
		},
	},
});
</script>
<template>
	<!-- Main container for the footer menu, displayed conditionally based on configuration -->
	<div
		v-if="
			config.MENU_FOOTER_LIGHT[appComponent.country] != undefined &&
			config.MENU_FOOTER_LIGHT[appComponent.country].length > 0
		"
		class="w-full flex flex-col md:flex-row justify-center items-center"
	>
		<!-- Grid container for footer items -->
		<div
			class="grid grid-cols-2 md:grid-cols-4 justify-center items-start gap-y-5 gap-x-5 lg:gap-x-12 pb-10 px-10 w-full max-w-[1250px] border-solid border-b-1 border-base-100"
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
					class="text-info-text text-start text-sm md:text-xl font-bold"
					>{{ $t(value.MENU_TITLE) }}</span
				>
				<!-- List of submenu items -->
				<ul class="flex flex-col justify-center items-start leading-4">
					<li
						v-for="submenu in value.MENU_LIST"
						class="w-full text-start"
					>
						<!-- Router link for internal navigation -->
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
							:data-analytics-context="`component:MenuFooter3V3|layout:${appComponent.config.layout}`"
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
								:data-analytics-context="`component:MenuFooter3V3|layout:${appComponent.config.layout}`"
								:class="submenu.MENU_SECCION"
								@click="openModalInfo(submenu.MENU_ID)"
								class="text-info-text hover:underline text-xs font-light text-start"
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
							:data-analytics-context="`component:MenuFooter3V3|layout:${appComponent.config.layout}`"
							target="_blank"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:underline text-xs font-light text-start"
							>{{ $t(submenu.MENU_TITLE) }}</a
						>
						<!-- Button to open chat -->
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
							:data-analytics-context="`component:MenuFooter3V3|layout:${appComponent.config.layout}`"
							:class="submenu.MENU_SECCION"
							class="text-info-text hover:text-secondary text-xs lg:text-sm text-start"
						>
							{{ $t(submenu.MENU_TITLE) }}
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style></style>

<!-- FILE DOCUMENTED -->

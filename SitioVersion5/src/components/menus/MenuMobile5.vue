<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import IconClose from '../icons/IconClose.vue'; // Importing IconClose component

export default defineComponent({
	components: {
		IconClose, // Registering IconClose component
	},
	data() {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Accessing app component
		let openSelectLang = false; // State for language selection visibility
		return {
			config,
			appComponent,
			openSelectLang,
		};
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted
		if (this.appComponent.session.logueado) {
			// Check if user is logged in
			if (
				this.config != undefined &&
				this.config['login'] != undefined &&
				this.config['login']['menu'] != undefined
			) {
				// Assigning logged-in user menu to the mobile menu
				this.config.MENU_USUARIO_LOGUEADO_MOBILE[
					this.appComponent.country
				] = this.config['login']['menu'];
			}
		} else {
			if (
				this.config != undefined &&
				this.config['not_login'] != undefined &&
				this.config['not_login']['menu'] != undefined
			) {
				// Assigning non-logged-in user menu to the mobile menu
				this.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country] =
					this.config['not_login']['menu'];
			}
		}
	},
	methods: {
		onOpenChat() {
			// Method to open chat interface
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal'
			) {
				let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
				document
					.getElementById('centribal_iframe_layout')
					?.classList.remove('centribal_iframe_hidden'); // Show chat iframe
				document
					.getElementById('centribal_iframe_layout')
					?.classList.add('centribal_iframe_open'); // Open chat iframe
				postMessage('show_chat', '', ref_id); // Send message to show chat
			}
			this.closeMenuMobile(); // Close mobile menu
		},
		closeMenuMobile() {
			// Method to close the mobile menu
			(document.getElementById('main-menu') as any).checked = false; // Uncheck the main menu checkbox
		},
		hola() {
			// Placeholder method
			this.closeMenuMobile(); // Close mobile menu
		},
		analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile5|layout:layout-${this.appComponent.config.layout}`,
            };
        },
	},
});
</script>
<template>
	<!-- Main container for the side drawer -->
	<div
		class="drawer-side overflow-y-hidden w-3/4 lg:w-full lg:mt-0 mt-[95px] lg:relative after:absolute after:bg-gradient-to-b from-base-300/30 via-base-300/30 to-base-300/5 after:rounded-b-[200px] after:w-[0.09rem] after:h-1/2 after:top-0 after:right-0"
	>
		<label for="main-menu" class="drawer-overlay"></label>
		<!-- Overlay for the drawer -->
		<aside class="flex flex-col bg-primary-content text-neutral">
			<!-- Sidebar container -->
			<button
				aria-label="Close"
				@click="closeMenuMobile()"
				class="absolute text-neutral -top-2 right-0 z-50 block lg:hidden"
			>
				<IconClose class="w-5" />
				<!-- Close button with IconClose -->
			</button>
			<div class="overflow-y-scroll absolute h-full w-full">
				<!-- Scrollable content area -->
				<div class="menu flex flex-col p-4 pt-5 compact">
					<!-- Menu container -->
					<div
						v-if="appComponent.mobile == ''"
						class="w-full h-8 mb-5 flex items-center"
						:class="
							appComponent.openMenu5
								? 'justify-end'
								: 'justify-center'
						"
					>
						<button
							class="w-10 h-10 rounded-full bg-accent flex justify-center items-center hover:scale-105 transition-all ease-in-out"
							@click="
								appComponent.openMenu5 = !appComponent.openMenu5
							"
						>
							<font-awesome-icon
								v-if="appComponent.openMenu5"
								icon="fa-solid fa-angle-left"
								class="text-secondary text-2xl hover:text-neutral"
							/>
							<font-awesome-icon
								v-else
								icon="fa-solid fa-angle-right"
								class="text-secondary text-2xl hover:text-neutral"
							/>
						</button>
					</div>
					<div>
						<ul>
							<li
								v-for="value in appComponent.session.logueado
									? config.MENU_USUARIO_LOGUEADO_MOBILE[
											appComponent.country
										]
									: config.MENU_NOLOGUEADO_MOBILE[
											appComponent.country
										]"
								class="mb-2 rounded-md"
								:class="[
									{
										'bg-success text-base-content':
											value.SHADOW == 1 &&
											(value.MENU_SECCION == undefined ||
												value.MENU_SECCION == ''),
									},
									{
										'bg-base-300 text-neutral-text':
											value.SHADOW == 2 &&
											(value.MENU_SECCION == undefined ||
												value.MENU_SECCION == ''),
									},
									{
										'flex justify-center items-center w-11/12':
											!appComponent.openMenu5,
									},
								]"
								:style="value.MENU_SECCION"
							>
								<RouterLink
									active-class="text-neutral rounded bg-primary lg:bg-primary-content duration-500 transition-all ease-in-out shadow-[inset_0px_-2px_0px_,_inset_0px_2px_0px] shadow-success"
									:id="`mobile-${value.MENU_ID}`"
									:class="{
										'flex flex-row-reverse':
											value.SHADOW == 1 ||
											value.SHADOW == 2,
									}"
									class="capitalize py-3 flex w-full h-full items-center justify-center"
									v-if="
										value.TARGER !== 'blank' &&
										value.TARGER !== 'chat'
									"
									:to="value.MENU_URL"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
									v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
								>
									<span
										v-if="
											value.MENU_ICON != '' &&
											!value.MENU_ICON.includes('https')
										"
										:class="
											'text-2xl pr-3' + value.MENU_ICON
										"
									></span>
									<img
										class="mr-1 object-contain"
										:class="
											value.SHADOW == 1 ||
											value.SHADOW == 2
												? 'w-11 h-11 drop-shadow-[0px_0px_1px_white]'
												: 'w-7 h-7 '
										"
										width="20"
										height="20"
										v-if="
											value.MENU_ICON != '' &&
											value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<span
										v-if="appComponent.openMenu5"
										class="font-poppinssb w-full"
										>{{ $t(value.MENU_TITLE) }}</span
									>
									<div
										v-if="value.ICON != undefined"
										class="svg"
										v-html="value.ICON"
									></div>
								</RouterLink>
								<a
									:id="value.MENU_ID"
									class="uppercase"
									v-if="value.TARGER == 'blank'"
									:href="value.MENU_URL"
									target="_blank"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
									v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
								>
									<span
										v-if="
											value.MENU_ICON != '' &&
											!value.MENU_ICON.includes('https')
										"
										:class="
											'text-2xl pr-3 ' + value.MENU_ICON
										"
									></span>
									<img
										class="mr-3"
										width="20"
										height="20"
										v-if="
											value.MENU_ICON != '' &&
											value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<span>{{ $t(value.MENU_TITLE) }}</span>
									<div
										v-if="value.ICON != undefined"
										class="svg"
										v-html="value.ICON"
									></div>
								</a>
								<button
									id="accion_chat"
									v-if="value.TARGER == 'chat'"
									@click="onOpenChat()"
									class="uppercase relative mt-3"
									data-analytics-label="menu:chat"
									:data-analytics-context="`component:MenuMobile5|layout:${appComponent.config.layout}`"
								>
									<div
										class="absolute bg-primary w-[124%] h-full flex items-center justify-start left-[-18px] gap-x-3 py-4 pl-8 -top-2"
									>
										<span
											v-if="
												value.MENU_ICON != '' &&
												!value.MENU_ICON.includes(
													'https'
												)
											"
											:class="
												'text-2xl ' + value.MENU_ICON
											"
										></span>
										<img
											width="22"
											height="22"
											v-if="
												value.MENU_ICON != '' &&
												value.MENU_ICON.includes(
													'https'
												)
											"
											:alt="value.MENU_TITLE"
											v-lazy="value.MENU_ICON"
										/>
										<span
											class="ml-5 text-sm font-poppinssl"
											>{{ $t(value.MENU_TITLE) }}</span
										>
										<div
											v-if="value.ICON != undefined"
											class="svg"
											v-html="value.ICON"
										></div>
									</div>
								</button>
							</li>
						</ul>
					</div>
					<div
						v-if="appComponent.session.logueado"
						class="my-4 lg:hidden block"
					>
						<span class="text-neutral font-poppinssb">{{
							$t('SERVICIOS')
						}}</span>
						<div
							tabindex="0"
							v-for="menu in appComponent.menus_service"
							class="flex flex-col gap-y-2 my-4"
						>
							<label class="capitalize flex gap-x-3 ml-2">
								<input
									type="checkbox"
									class="hidden"
									@click="() => (menu.open = !menu.open)"
								/>
								<font-awesome-icon
									icon="fa-solid fa-sliders"
									class="text-2xl"
								/>
								<span class="font-poppinssl">{{
									$t(menu.MENU_TITLE)
								}}</span>
							</label>
							<ul
								v-if="
									menu.SUBMENUS != undefined &&
									menu.SUBMENUS != ''
								"
								:class="menu.open != true ? 'hidden' : 'block'"
								class="in border-l-1 border-primary border-dashed rounded-xl w-full bg-gradient-to-r from-neutral-content/50"
							>
								<li
									v-for="submenu in menu.SUBMENUS"
									tabindex="0"
								>
									<RouterLink
										:id="submenu.MENU_ID"
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										class="font-poppinssl text-xs"
										active-class="bg-primary"
										@click="
											() => {
												closeMenuMobile();
												appComponent.menus_service?.forEach(
													(item) =>
														(item.open = false)
												);
											}
										"
										>{{ $t(submenu.SUBMENU_TITLE) }}
									</RouterLink>
								</li>
							</ul>
						</div>
					</div>
					<div
						:class="appComponent.session.logueado ? '' : 'mt-6'"
						class="ml-4 lg:hidden block"
					>
						<ul>
							<li
								v-for="value in config.MENU_FOOTER[
									appComponent.country
								]"
							>
								<RouterLink
									active-class="bg-primary border-l-2 border-solid border-base-100"
									class="hover:primary/50"
									:id="value.MENU_ID"
									v-if="value.MENU_TARGET != '_blank'"
									:to="value.MENU_URL"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
									:data-analytics-label="(() => {
										const id = String(value.MENU_ID || '').trim().toLowerCase();
										const title = String(value.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons'));
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(value.MENU_ID || value.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuMobile5|layout:${appComponent.config.layout}`"
								>
									<span class="font-poppinssl">
										{{ $t(value.MENU_TITLE) }}
									</span>
								</RouterLink>
								<a
									:id="value.MENU_ID"
									v-if="value.MENU_TARGET == '_blank'"
									:href="value.MENU_URL"
									target="_blank"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
									:data-analytics-label="(() => {
										const id = String(value.MENU_ID || '').trim().toLowerCase();
										const title = String(value.MENU_TITLE || '').trim().toLowerCase();
										const isTerms = id.includes('termin') || title.includes('términ') || title.includes('termin');
										const isPrivacy = id.includes('privac') || id.includes('politica') || title.includes('privac') || title.includes('política') || title.includes('politica');
										const isResponsible = id.includes('respons') || id.includes('juegorespons') || title.includes('respons') || (title.includes('juego') && title.includes('respons'));
										if (isTerms) return 'footer:link:terms';
										if (isPrivacy) return 'footer:link:privacy';
										if (isResponsible) return 'footer:link:responsible-gaming';
										return `footer:link:${String(value.MENU_ID || value.MENU_TITLE || 'link').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`;
									})()"
									:data-analytics-context="`component:MenuMobile5|layout:${appComponent.config.layout}`"
								>
									<span> {{ $t(value.MENU_TITLE) }} </span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</aside>
	</div>
</template>
<style scoped>
::-webkit-scrollbar {
	display: none; /* Hides the scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

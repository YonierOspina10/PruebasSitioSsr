<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import IconClose from '../icons/IconClose.vue'; // Importing the IconClose component

export default defineComponent({
	components: {
		IconClose, // Registering the IconClose component
	},
	data() {
		let config = this.$config(); // Fetching configuration data
		let appComponent: any = this.$appComponent; // Accessing the app component
		let openSelectLang = false; // State variable to track language selection visibility
		return {
			config,
			appComponent,
			openSelectLang,
		};
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted
		if (this.appComponent.session.logueado) {
			// Check if the user is logged in
			if (
				this.config != undefined &&
				this.config['login'] != undefined &&
				this.config['login']['menu'] != undefined
			) {
				// Assigning the logged-in user's menu to the mobile menu configuration
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
				// Assigning the non-logged-in user's menu to the mobile menu configuration
				this.config.MENU_NOLOGUEADO_MOBILE[this.appComponent.country] =
					this.config['not_login']['menu'];
			}
		}
	},
	methods: {
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile4|layout:layout-${this.appComponent.config.layout}`
            };
        },
		onOpenChat() {
			// Method to open the chat interface
			if (
				this.appComponent.config.zendesk[this.appComponent.country]
					.name == 'centribal'
			) {
				let ref_id: any = 'cen_ifr_static'; // Reference ID for the chat
				document
					.getElementById('centribal_iframe_layout')
					?.classList.remove('centribal_iframe_hidden'); // Show chat iframe
				document
					.getElementById('centribal_iframe_layout')
					?.classList.add('centribal_iframe_open'); // Open chat iframe
				postMessage('show_chat', '', ref_id); // Send message to show chat
			}
			this.closeMenuMobile(); // Close the mobile menu
		},
		closeMenuMobile() {
			// Method to close the mobile menu
			(document.getElementById('main-menu') as any).checked = false; // Uncheck the main menu checkbox
		},
		hola() {
			// Placeholder method that closes the mobile menu
			this.closeMenuMobile();
		},
	},
});
</script>
<template>
	<!-- Main container for the side drawer -->
	<div class="drawer-side overflow-y-hidden w-3/4 mt-[80px]">
		<label for="main-menu" class="drawer-overlay"></label>
		<!-- Overlay for the drawer -->
		<aside
			class="flex flex-col bg-primary bg-gradient-to-r from-base-content/70 to-base-content/80 text-base-100"
			:class="{
				'border-r-2 border-solid border-primary ':
					config.layout != undefined && config.layout == 5,
			}"
		>
			<!-- Button to close the menu -->
			<button
				aria-label="Close"
				@click="closeMenuMobile()"
				class="absolute text-base-100 right-0 z-50"
			>
				<IconClose class="w-5" />
				<!-- Icon for closing the menu -->
			</button>
			<div class="overflow-y-scroll absolute h-full w-full">
				<div class="menu flex flex-col p-4 pt-5 compact">
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
								class="mb-2"
								:class="[
									{ shadow: value.SHADOW == 1 },
									value.MENU_SECCION,
									value.TARGER == 'chat'
										? ''
										: 'bg-gradient-to-r from-base-content/50 to-transparent rounded-xl border-solid border-l-1 border-primary  hover:to-primary/50 hover:scale-95',
								]"
							>
								<RouterLink
									active-class="bg-primary/70 border-l-2 border-solid border-base-100"
									:id="`mobile-${value.MENU_ID}`"
									class="uppercase py-3"
									v-if="
										value.TARGER !== 'blank' &&
										value.TARGER !== 'chat'
									"
									:to="value.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
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
										width="22"
										height="22"
										v-if="
											value.MENU_ICON != '' &&
											value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<span class="font-poppinssl">{{
										$t(value.MENU_TITLE)
									}}</span>
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
					<div v-if="appComponent.session.logueado" class="my-4">
						<span class="text-base-100 font-poppinssb">{{
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
								class="in border-l-1 border-primary border-dashed rounded-xl w-full bg-gradient-to-r from-base-content/50"
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
										v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
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
						class="ml-4"
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
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s+/g, '-')}`)"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
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
/* Hide the scrollbar for the component */
::-webkit-scrollbar {
	display: none;
}
</style>

<!-- FILE DOCUMENTED -->

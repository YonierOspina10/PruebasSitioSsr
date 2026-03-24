<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import IconClose from '../icons/IconClose.vue'; // Importing the IconClose component
import ThemeButton from '../ThemeButton.vue';

export default defineComponent({
	components: {
		IconClose, // Registering the IconClose component
		ThemeButton
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let openSelectLang = false; // State to manage language selection dropdown visibility
		return {
			config,
			appComponent,
			openSelectLang,
		};
	},
	methods: {
		/**
		 * Opens the chat interface if the current country is 'centribal'.
		 */
		onOpenChat() {
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
			this.closeMenuMobile(); // Close mobile menu after opening chat
		},
		/**
		 * Closes the mobile menu by unchecking the main menu checkbox.
		 */
		closeMenuMobile() {
			(document.getElementById('main-menu') as any).checked = false; // Uncheck the main menu
		},
		/**
		 * Toggles the visibility of the service menu based on its current state.
		 * @param id - The ID of the service menu to toggle.
		 */
		menuService(id: any) {
			if (
				(document.getElementById('menuService-' + id) as any).style
					.display == 'block'
			) {
				(
					document.getElementById('menuService-' + id) as any
				).style.display = 'none'; // Hide the service menu
			} else {
				(
					document.getElementById('menuService-' + id) as any
				).style.display = 'block'; // Show the service menu
			}
		},
		analyticsAttrs(label: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuMobile|layout:layout-${this.appComponent.config.layout}`,
            };
        },
	},
});
</script>
<template>
	<!-- Main container for the side drawer -->
	<div class="drawer-side overflow-y-hidden w-3/4 lg:hidden">
		<label for="main-menu" class="drawer-overlay"></label>
		<!-- Overlay for the main menu -->
		<aside
			class="flex flex-col border-r border-neutral-content bg-base-300 text-neutral lg:hidden"
		>
			<!-- Sticky header for the drawer -->
			<div
				class="sticky inset-x-0 top-0 z-50 w-full py-1 transition duration-200 ease-in-out border-b lg:block border-neutral-content text-neutral"
			>
				<div
					class="mx-auto navbar grid max-w-none justify-end h-11 min-h-0"
				>
					<div>
						<RouterLink
							class="lvl desktop h-7 bg-base-300 py-0 px-3 rounded-3xl cursor-pointer items-center flex-none"
							v-if="
								appComponent.session.logueado &&
								config.loyalty[appComponent.country]
							"
							to="/consulta/mi_lealtad"
							@click="closeMenuMobile()"
						>
							<span class="font-bold align-middle pr-1"
								>{{ $t('Puntos:') }}
								{{ appComponent.loyalty.points }}</span
							>
						</RouterLink>
						<!-- Language selection dropdown -->
						<div
							class="items-center flex-none"
							v-if="
								config.header_ != undefined &&
								config.header_.change_language != undefined
									? config.header_.change_language
									: config.language.showSelectLang
							"
						>
							<!-- Dropdown menu for language selection -->
							<div class="dropdown dropdown-end">
								<!-- Button to open the language selection dropdown -->
								<div
									tabindex="0"
									class="m-1 btn btn-xs mt-4 gap-2 mb-[1rem] mr-5"
									@click="openSelectLang = true"
								>
									<!-- Display the selected country's flag -->
									<span
										:class="
											'country-flags ' +
											appComponent.selectFlag
										"
									></span>
									<!-- Display the selected language -->
									<span>{{ appComponent.lngProd }}</span>
								</div>
								<!-- Dropdown menu content -->
								<ul
									tabindex="0"
									class="p-2 menu dropdown-content bg-base-300 rounded-box w-24 text-neutral"
									v-if="openSelectLang"
								>
									<!-- List of available countries for language selection -->
									<li
										v-for="country in appComponent.countries"
										@click="
											appComponent.changeLanguage(
												country.name,
												country.flag
											);
											openSelectLang = false;
										"
									>
										<!-- Display the country's flag and name -->
										<span>
											<span
												:class="
													'country-flags ' +
													country.flag
												"
											></span>
											{{
												country.name.toLocaleUpperCase()
											}}
										</span>
									</li>
								</ul>
							</div>
						</div>
						<ThemeButton class="block md:hidden"/>
						<!-- Close button for the menu -->
						<button
							aria-label="Close"
							@click="closeMenuMobile()"
							class="text-neutral"
						>
							<IconClose />
						</button>
					</div>
					<!-- Container for the bonus progress link -->
					<div class="w-full justify-end items-center">
						<!-- Link to the bonus progress page, visible only if the user is logged in and the bonus header is enabled -->
						<RouterLink
							v-if="
								appComponent.session.logueado &&
								config.header.bono_header
							"
							class="m-1 btn btn-xs w-28 flex justify-center items-center bg-white relative rounded-full"
							to="/my-bonuses-progress"
						>
							<!-- Image for the bonus icon -->
							<img
								src="https://images.virtualsoft.tech/m/msjT1682713611.png"
								alt=""
								class="absolute scale-[.45] -left-[35px] -top-[27px]"
							/>
							<!-- Text for the bonus link -->
							<span class="ml-3">{{ $t('Mis bonos') }}</span>
						</RouterLink>
					</div>
				</div>
			</div>
			<!-- Scrollable menu container -->
			<div class="overflow-y-scroll top-24 absolute h-full w-full pb-52 text-neutral">
				<div class="menu flex flex-col p-4 pt-2 compact">
					<!-- Container for the menu items when the user is not logged in -->
					<div v-if="!appComponent.session.logueado">
						<ul>
							<!-- Loop through the menu items for non-logged-in users -->
							<li
								v-for="value in config.MENU_NOLOGUEADO_MOBILE[
									appComponent.country
								]"
								v-bind:class="{ shadow: value.SHADOW == 1 }"
								:class="value.MENU_SECCION"
							>
								<!-- Router link for menu items with internal navigation -->
								<RouterLink
									:id="`mobile-${value.MENU_ID}`"
									class="uppercase"
									v-if="
										value.TARGER !== 'blank' &&
										value.TARGER !== 'chat'
									"
									:to="config.baseUrlFx + value.MENU_URL"
									:title="value.MENU_TITLE"
									@click="closeMenuMobile()"
									:data-analytics-label="`menu:nav:${value.MENU_TITLE .trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
									:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
								>
									<!-- Display menu icon if available and not a URL -->
									<span
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
										"
										:class="
											'text-2xl pr-3 ' + value.MENU_ICON
										"
									></span>
									<!-- Display menu icon if it is a URL -->
									<img
										class="mr-3"
										width="20"
										height="20"
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<div
                                    	v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    	class="text-neutral"
                                    	v-html="value.MENU_ICON"
                                	></div>
									<!-- Display menu title -->
									<span>{{ $t(value.MENU_TITLE) }}</span>
									<!-- Display additional icon if available -->
									<div
										v-if="value.ICON != undefined"
										class="svg"
										v-html="value.ICON"
									></div>
								</RouterLink>
								<!-- External link for menu items that open in a new tab -->
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
									<!-- Display menu icon if available and not a URL -->
									<span
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
										"
										:class="
											'text-2xl pr-3 ' + value.MENU_ICON
										"
									></span>
									<!-- Display menu icon if it is a URL -->
									<img
										class="mr-3"
										width="20"
										height="20"
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
									<!-- Display menu title -->
									<span>{{ $t(value.MENU_TITLE) }}</span>
									<!-- Display additional icon if available -->
									<div
										v-if="value.ICON != undefined"
										class="svg"
										v-html="value.ICON"
									></div>
								</a>
								<!-- Button to open chat for menu items with chat target -->
								<button
									id="accion_chat"
									v-if="value.TARGER == 'chat'"
									@click="onOpenChat()"
									class="uppercase"
									data-analytics-label="menu:chat"
									:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
								>
									<!-- Display menu icon if available and not a URL -->
									<span
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
										"
										:class="
											'text-2xl pr-3 ' + value.MENU_ICON
										"
									></span>
									<!-- Display menu icon if it is a URL -->
									<img
										class="mr-3"
										width="20"
										height="20"
										v-if="
											value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
										"
										:alt="value.MENU_TITLE"
										v-lazy="value.MENU_ICON"
									/>
									<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
									<!-- Display menu title -->
									<span>{{ $t(value.MENU_TITLE) }}</span>
									<!-- Display additional icon if available -->
									<div
										v-if="value.ICON != undefined"
										class="svg"
										v-html="value.ICON"
									></div>
								</button>
							</li>
						</ul>
					</div>

					<!-- Container for the menu items when the user is logged in -->
					<div v-if="appComponent.session.logueado">
						<!-- Loop through the menu items for logged-in users -->
						<li
							v-if="!appComponent.appPOS"
							v-for="value in config.MENU_USUARIO_LOGUEADO_MOBILE[
								appComponent.country
							]"
							v-bind:class="{ shadow: value.SHADOW == 1 }"
							:class="value.MENU_SECCION"
						>
							<!-- Router link for menu items with internal navigation -->
							<RouterLink
								:id="`mobile-${value.MENU_ID}`"
								class="uppercase"
								v-if="
									value.TARGER !== 'blank' &&
									value.TARGER !== 'chat'
								"
								:to="config.baseUrlFx + value.MENU_URL"
								:title="value.MENU_TITLE"
								@click="closeMenuMobile()"
								v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
							>
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</RouterLink>
							<!-- External link for menu items that open in a new tab -->
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
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</a>
							<!-- Button to open chat for menu items with chat target -->
							<button
								id="accion_chat"
								v-if="value.TARGER == 'chat'"
								@click="onOpenChat()"
								class="uppercase"
								data-analytics-label="menu:chat"
								:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
							>
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</button>
						</li>
						<!-- Loop through the menu items for logged-in users with POS app -->
						<li
							v-else
							v-for="value in config
								.MENU_USUARIO_LOGUEADO_APP_POS[
								appComponent.country
							]"
							v-bind:class="{ shadow: value.SHADOW == 1 }"
							:class="value.MENU_SECCION"
						>
							<!-- Router link for menu items with internal navigation -->
							<RouterLink
								:id="`mobile-${value.MENU_ID}`"
								class="uppercase"
								v-if="
									value.TARGER !== 'blank' &&
									value.TARGER !== 'chat'
								"
								:to="config.baseUrlFx + value.MENU_URL"
								:title="value.MENU_TITLE"
								@click="closeMenuMobile()"
								v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
							>
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</RouterLink>
							<!-- External link for menu items that open in a new tab -->
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
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</a>
							<!-- Button to open chat for menu items with chat target -->
							<button
								id="accion_chat"
								v-if="value.TARGER == 'chat'"
								@click="onOpenChat()"
								class="uppercase"
								data-analytics-label="menu:chat"
								:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
							>
								<!-- Display menu icon if available and not a URL -->
								<span
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        !value.MENU_ICON.includes('https') && !value.MENU_ICON.includes('<svg')
									"
									:class="'text-2xl pr-3 ' + value.MENU_ICON"
								></span>
								<!-- Display menu icon if it is a URL -->
								<img
									class="mr-3"
									width="20"
									height="20"
									v-if="
										value.MENU_ICON != undefined &&
                                        value.MENU_ICON != '' &&
                                        value.MENU_ICON.includes('https')
									"
									:alt="value.MENU_TITLE"
									v-lazy="value.MENU_ICON"
								/>
								<div
                                    v-if="value.MENU_ICON != undefined && value.MENU_ICON != '' && value.MENU_ICON.includes('<svg')"
                                    class="text-neutral"
                                    v-html="value.MENU_ICON"
                                ></div>
								<!-- Display menu title -->
								<span>{{ $t(value.MENU_TITLE) }}</span>
								<!-- Display additional icon if available -->
								<div
									v-if="value.ICON != undefined"
									class="svg"
									v-html="value.ICON"
								></div>
							</button>
						</li>
					</div>

					<!-- Container for the service menu items when the user is logged in and not using the POS app -->
					<div
						v-if="
							appComponent.session.logueado &&
							!appComponent.appPOS
						"
					>
						<li tabindex="0" class="mt-4 menu-title">
							<span class="text-neutral">{{
								$t('SERVICIOS')
							}}</span>
						</li>
						<!-- Loop through the service menu items -->
						<li
							tabindex="0"
							v-for="menu in appComponent.menus_service"
						>
							<!-- Link to toggle the visibility of the service menu -->
							<a
								class="capitalize"
								@click="menuService(menu.MENU_ID)"
							>
								<font-awesome-icon
									icon="fa-solid fa-sliders"
                                    class="w-8 h-8"
									size="2x"
								/>
								<div>{{ $t(menu.MENU_TITLE) }}</div>
							</a>
							<!-- Submenu items for the service menu -->
							<ul
								v-if="
									menu.SUBMENUS != undefined &&
									menu.SUBMENUS != ''
								"
								:id="'dropdown' + menu.MENU_ID + '-mobile'"
								class="w-full top-12"
							>
								<div
									:id="'menuService-' + menu.MENU_ID"
									style="display: none"
								>
									<!-- Loop through the submenu items -->
									<li
										v-for="submenu in menu.SUBMENUS"
										tabindex="0"
										:class="
											'collection-item avatar-refresh ' +
											submenu.SUBMENU_URL.replace(
												'.php',
												''
											)
										"
										class="pl-5"
									>
										<!-- Router link for submenu items -->
										<RouterLink
											:id="submenu.MENU_ID"
											:to="
												'/' +
												menu.MENU_SLUG +
												'/' +
												submenu.SUBMENU_URL
											"
											class="title refresh"
											@click="
												closeMenuMobile();
												menuService(menu.MENU_ID);
											"
											>{{ $t(submenu.SUBMENU_TITLE) }}
										</RouterLink>
									</li>
								</div>
							</ul>
						</li>
					</div>

					<!-- Container for the footer menu items when the user is not using the POS app -->
					<div v-if="!appComponent.appPOS" class="">
						<ul>
							<li class="menu-title">
								<span class="text-neutral">{{
									$t('OTROS')
								}}</span>
							</li>
						</ul>
						<ul>
							<!-- Loop through the footer menu items -->
							<li
								v-for="value in config.MENU_FOOTER[
									appComponent.country
								]"
							>
								<!-- Router link for footer menu items with internal navigation -->
								<RouterLink
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
									:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
								>
									<span> {{ $t(value.MENU_TITLE) }} </span>
								</RouterLink>
								<!-- External link for footer menu items that open in a new tab -->
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
									:data-analytics-context="`component:MenuMobile|layout:${appComponent.config.layout}`"
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
/* Styles for SVG icons */
.svg {
	enable-background: new 0 0 481.045 481.045; /* Set the background for SVG */
	width: 22px !important; /* Set width of SVG */
	height: 25px !important; /* Set height of SVG */
}
</style>

<!-- FILE DOCUMENTED -->

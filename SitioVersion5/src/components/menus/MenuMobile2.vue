<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import IconClose from '../icons/IconClose.vue'; // Importing IconClose component
import BalanceUser from '@/components/BalanceUser.vue'; // Importing BalanceUser component

export default defineComponent({
	components: {
		IconClose, // Registering IconClose component
		BalanceUser, // Registering BalanceUser component
	},
	data() {
		let config = this.$config(); // Fetching configuration data
		let appComponent: any = this.$appComponent; // Accessing the app component
		let openSelectLang = false; // State to control language selection dropdown
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
			openSelectLang, // Exposing openSelectLang to the template
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
				let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
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
		 * Closes the mobile menu.
		 */
		closeMenuMobile() {
			console.log('closeMenuMobile'); // Log action
			this.appComponent.menuMobile2 = false; // Set mobile menu state to closed
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
                'data-analytics-context': `component:MenuMobile2|layout:layout-${this.appComponent.config.layout}`,
            };
        },
	},
});
</script>
<template>
	<!-- Main container for the mobile menu, shown based on appComponent.menuMobile2 state -->
	<div
		v-if="appComponent.menuMobile2"
		class="fixed top-0 right-0 bg-base-content w-full lg:hidden h-screen overflow-y-auto z-[99999]"
	>
		<!-- Background for the mobile menu -->
		<div class="bg-base-300 scroll">
			<!-- Header section with language selection and close button -->
			<div class="flex justify-between items-center px-5">
				<!-- Language selection dropdown, shown based on config settings -->
				<div
					class="items-center flex-none"
					v-if="
						config.header_ != undefined &&
						config.header_.change_language != undefined
							? config.header_.change_language
							: config.language.showSelectLang
					"
				>
					<div class="dropdown dropdown-end">
						<!-- Button to open language selection -->
						<div
							tabindex="0"
							class="m-1 btn btn-xs mt-4 gap-2 mb-[1rem] mr-5"
							@click="openSelectLang = true"
						>
							<span
								:class="
									'country-flags ' + appComponent.selectFlag
								"
							></span>
							<span>{{ appComponent.lngProd }}</span>
						</div>
						<!-- Dropdown menu for language selection -->
						<ul
							tabindex="0"
							class="p-2 menu dropdown-content bg-base-100 rounded-box w-24 text-neutral-content"
							v-if="openSelectLang"
						>
							<!-- List of countries for language selection -->
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
								<span>
									<span
										:class="'country-flags ' + country.flag"
									></span>
									{{ country.name.toLocaleUpperCase() }}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- Button to close the mobile menu -->
				<button
					aria-label="Close"
					@click="appComponent.menuMobile2 = false"
					class="text-neutral"
				>
					<IconClose />
				</button>
			</div>
			<!-- User session section, shown if the user is logged in -->
			<section class="flex items-center justify-center pt-8">
				<div
					v-if="appComponent.session.logueado"
					class="flex flex-col items-center justify-center gap-4"
				>
					<RouterLink to="/gestion/gestion_cuenta">
						<img
							src="https://images.virtualsoft.tech/m/msjT1698704997.png"
							alt=""
							class="h-24"
						/>
					</RouterLink>
					<div class="text-center">
						<p class="text-neutral text-lg w-60 capitalize">
							{{ appComponent.session.nombre }}
						</p>
					</div>
					<!-- Loyalty points link, shown if user is logged in and loyalty config is available -->
					<RouterLink
						class="flex items-center justify-center"
						v-if="
							appComponent.session.logueado &&
							config.loyalty[appComponent.country]
						"
						to="/consulta/mi_lealtad"
						@click="closeMenuMobile()"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1698767959.png"
							class="mr-3"
							width="15"
							height="15"
							alt="start"
						/>
						<span class="font-bold align-middle pr-1"
							>{{ $t('Puntos') }}
							{{ appComponent.loyalty.points }}</span
						>
					</RouterLink>
					<BalanceUser class="z-50" />
					<!-- BalanceUser component for displaying user balance -->
				</div>
			</section>
			<!-- Main menu section -->
			<section class="h-auto bg-gradient-to-t from-base-content">
				<div class="h-full w-full">
					<div class="menu flex flex-col p-4 compact">
						<!-- Menu for users not logged in -->
						<div v-if="!appComponent.session.logueado">
							<ul class="flex flex-col gap-6">
								<li
									v-for="value in config
										.MENU_NOLOGUEADO_MOBILE[
										appComponent.country
									]"
									v-bind:class="{ shadow: value.SHADOW == 1 }"
									:class="value.MENU_SECCION"
								>
									<RouterLink
										:id="`mobile-${value.MENU_ID}`"
										class="text-base font-bold"
										:class="
											value.MENU_ID == 'accion_registro'
												? 'bg-success'
												: '' ||
													  value.MENU_ID ==
															'accion_inicio'
													? 'bg-primary-content text-base-content'
													: ''
										"
										v-if="
											value.TARGER !== 'blank' &&
											value.TARGER !== 'chat'
										"
										:to="config.baseUrlFx + value.MENU_URL"
										:title="value.MENU_TITLE"
										v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
										@click="closeMenuMobile()"
									>
										<span
											v-if="
												value.MENU_ICON != '' &&
												!value.MENU_ICON.includes(
													'https'
												)
											"
											:class="
												'text-3xl pr-3 ' +
												value.MENU_ICON
											"
										></span>
										<img
											class="mr-3"
											width="25"
											height="25"
											v-if="
												value.MENU_ICON != '' &&
												value.MENU_ICON.includes(
													'https'
												)
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
									</RouterLink>
									<a
										:id="value.MENU_ID"
										class="text-xl"
										v-if="value.TARGER == 'blank'"
										:href="value.MENU_URL"
										target="_blank"
										:title="value.MENU_TITLE"
										v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
										@click="closeMenuMobile()"
									>
										<span
											v-if="
												value.MENU_ICON != '' &&
												!value.MENU_ICON.includes(
													'https'
												)
											"
											:class="
												'text-2xl pr-3 ' +
												value.MENU_ICON
											"
										></span>
										<img
											class="mr-3"
											width="25"
											height="25"
											v-if="
												value.MENU_ICON != '' &&
												value.MENU_ICON.includes(
													'https'
												)
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
										data-analytics-label="menu:chat"
										:data-analytics-context="`component:MenuMobile2|layout:${appComponent.config.layout}`"
										@click="onOpenChat()"
										class="text-base font-bold"
									>
										<span
											v-if="
												value.MENU_ICON != '' &&
												!value.MENU_ICON.includes(
													'https'
												)
											"
											:class="
												'text-2xl pr-3 ' +
												value.MENU_ICON
											"
										></span>
										<img
											class="mr-3"
											width="25"
											height="25"
											v-if="
												value.MENU_ICON != '' &&
												value.MENU_ICON.includes(
													'https'
												)
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
									</button>
								</li>
							</ul>
						</div>
						<!-- Menu for logged-in users -->
						<div
							v-if="appComponent.session.logueado"
							class="pt-10 flex flex-col gap-6"
						>
							<li
								v-for="value in config
									.MENU_USUARIO_LOGUEADO_MOBILE[
									appComponent.country
								]"
								v-bind:class="{ shadow: value.SHADOW == 1 }"
								:class="value.MENU_SECCION"
							>
								<RouterLink
									:id="`mobile-${value.MENU_ID}`"
									class="text-base font-bold"
									:class="
										value.MENU_ID == 'accion_inicio'
											? 'bg-primary-content text-base-content'
											: '' ||
												  value.MENU_ID ==
														'accion_depositar'
												? 'bg-success'
												: ''
									"
									v-if="
										value.TARGER !== 'blank' &&
										value.TARGER !== 'chat'
									"
									:to="config.baseUrlFx + value.MENU_URL"
									:title="value.MENU_TITLE"
									v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
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
										width="25"
										height="25"
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
								</RouterLink>
								<a
									:id="value.MENU_ID"
									class="text-base font-bold"
									v-if="value.TARGER == 'blank'"
									:href="value.MENU_URL"
									target="_blank"
									:title="value.MENU_TITLE"
									v-bind="analyticsAttrs('menu:nav:' + value.MENU_TITLE.toLowerCase().replace(/\s+/g,'-'))"
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
										width="25"
										height="25"
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
									data-analytics-label="menu:chat"
									:data-analytics-context="`component:MenuMobile2|layout:${appComponent.config.layout}`"
									@click="onOpenChat()"
									class="text-base"
								>
									<span
										v-if="
											value.MENU_ICON != '' &&
											!value.MENU_ICON.includes('https')
										"
										:class="
											'text-2xl pr-10 ' + value.MENU_ICON
										"
									></span>
									<img
										class="mr-3"
										width="25"
										height="25"
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
								</button>
							</li>
						</div>
						<!-- Services section for logged-in users -->
						<div v-if="appComponent.session.logueado">
							<li tabindex="0" class="mt-4">
								<span class="text-neutral font-bold text-xl">{{
									$t('SERVICIOS')
								}}</span>
							</li>
							<li
								tabindex="0"
								v-for="menu in appComponent.menus_service"
							>
								<a
									class="capitalize"
									@click="menuService(menu.MENU_ID)"
								>
									<font-awesome-icon
										icon="fa-solid fa-sliders"
										size="2x"
									/>
									<div>{{ $t(menu.MENU_TITLE) }}</div>
								</a>
								<!-- Submenu for services, shown if available -->
								<ul
									v-if="
										menu.SUBMENUS != undefined &&
										menu.SUBMENUS != ''
									"
									:id="'dropdown' + menu.MENU_ID + '-mobile'"
									class="border-l-1 border-gray-300 border-dashed bg-[#1b1b1b] w-full top-12"
								>
									<div
										:id="'menuService-' + menu.MENU_ID"
										style="display: none"
									>
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
						<!-- Other links section -->
						<div class="pt-10">
							<ul>
								<li class="">
									<span
										class="text-neutral font-bold text-xl"
										>{{ $t('OTROS') }}</span
									>
								</li>
							</ul>
							<ul>
								<li
									v-for="value in config.MENU_FOOTER[
										appComponent.country
									]"
								>
									<RouterLink
										:id="value.MENU_ID"
										v-if="value.MENU_TARGET != '_blank'"
										:to="value.MENU_URL"
										:title="value.MENU_TITLE"
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
										:data-analytics-context="`component:MenuMobile2|layout:${appComponent.config.layout}`"
										@click="closeMenuMobile()"
									>
										<span>
											{{ $t(value.MENU_TITLE) }}
										</span>
									</RouterLink>
									<a
										:id="value.MENU_ID"
										v-if="value.MENU_TARGET == '_blank'"
										:href="value.MENU_URL"
										target="_blank"
										:title="value.MENU_TITLE"
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
										:data-analytics-context="`component:MenuMobile2|layout:${appComponent.config.layout}`"
										@click="closeMenuMobile()"
									>
										<span>
											{{ $t(value.MENU_TITLE) }}
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<style>
/* Styles for scrollable container */
.scroll {
	max-height: 100%; /* Maximum height for scrolling */
	overflow-y: auto; /* Enable vertical scrolling */
	&::-webkit-scrollbar {
		width: 0em; /* Hide scrollbar width */
		height: 0em; /* Hide scrollbar height */
	}
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow for scrollbar track */
		border-radius: 20px; /* Rounded corners for scrollbar track */
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgb(
			217,
			217,
			217
		) !important; /* Color for scrollbar thumb */
		border-radius: 20px; /* Rounded corners for scrollbar thumb */
	}
}

/* Styles for SVG icons */
.svg {
	enable-background: new 0 0 481.045 481.045; /* Enable background for SVG */
	width: 30px !important; /* Set width for SVG */
	height: 35px !important; /* Set height for SVG */
}
</style>

<!-- FILE DOCUMENTED -->

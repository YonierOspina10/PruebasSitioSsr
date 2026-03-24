<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing an icon component
import router from '@/router'; // Importing the router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing another icon component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component instance
		let refreshBalance = this.$refreshBalance; // Method to refresh balance
		let onSaldo = false; // State variable to track balance visibility
		let onViewBalance = false; // State variable to track balance view
		return {
			config,
			appComponent,
			refreshBalance,
			onSaldo,
			onViewBalance,
		};
	},
	components: {
		IconHandsUp, // Registering the IconHandsUp component
		IconHouse, // Registering the IconHouse component
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside); // Adding event listener for clicks outside the component
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside); // Removing event listener before component unmounts
	},
	methods: {
		analyticsAttrs(label:string) {
			return {
				'data-analytics-label': label,
				'data-analytics-context': `component:MenuDesktopv2|layout:layout-${this.appComponent.config.layout}`
			};
    	},
		handleClickOutside(event) {
			const menu = this.$refs.menu; // Reference to the menu element
			if (menu && !menu.contains(event.target)) {
				// Check if the click is outside the menu
				this.onSaldo = false; // Hide balance if clicked outside
			}
		},
		goTo(url, id) {
			if (
				id == 'accion_depositar' && // Check if the action is to deposit
				this.appComponent.config.showModalDeposit != undefined && // Check if modal should be shown
				this.appComponent.config.showModalDeposit[
					this.appComponent.country
				]
			) {
				this.appComponent.showModalDepositV2 = true; // Show deposit modal
			} else {
				this.$router.push(url); // Navigate to the specified URL
			}
		},
		onUserBalance(event) {
			event.preventDefault(); // Prevent default action
			const params = {
				source: 'user_balances', // Source for balance updates
				subscribe: true, // Subscribe to balance updates
				what: { profile: [] }, // Profile data to retrieve
			};
			if (!this.onSaldo) {
				// If balance is not currently shown
				this.appComponent.refreshBalance2(); // Refresh balance
			}
			this.onSaldo = !this.onSaldo; // Toggle balance visibility
		},
		onRefreshBalance2() {
			const params = {
				source: 'user_balances', // Source for balance updates
				subscribe: true, // Subscribe to balance updates
				what: { profile: [] }, // Profile data to retrieve
			};
			this.appComponent.refreshBalance3(); // Refresh balance
			setTimeout(() => {
				this.onViewBalance = true; // Set view balance state after 5 seconds
			}, 5000);
		},
		logOut() {
			if ((window as any).ws != undefined) {
				// Check if WebSocket exists
				(window as any).ws.close(); // Close WebSocket connection
			}
			const vthis = this; // Preserve context for API call
			apiService.request('logout', {}).then((response: any) => {
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					// Check if logout was successful
					vthis.appComponent.tokenSB = ''; // Clear session token
					vthis.appComponent.session = {
						// Reset session data
						logueado: false,
						usuario: '',
						nombre: '',
						pais: '',
						pais_nom: '',
						pais_id: null,
						moneda: '',
						moneda_nom: '',
						idioma: '',
						utc: '',
						token: '',
						req_cheque: '',
						req_doc: '',
						fecha_crea: '',
						fecha_actualizacion: '',
						origen: '',
						casino_enabled: '',
						verifcedula_ant: '',
						verifcedula_post: '',
						verifcedula_ant_paprob: '',
						verifcedula_post_paprob: '',
						wallet: '',
						last_login_date: null,
						last_login_ip: '',
						cedula: '',
						celular: '',
						fecha_nacim: '',
						iframemini_bannerleft: '',
						iframemini_bannerright: '',
						verifcelular: '',
						formSplaft: 'N',
						paternal_last_name: '',
						mother_last_name: '',
						email: '',
						phone: '',
						doc_type: '',
						nationalityid: '',
						first_name: '',
						identification: '',
					};
					apiService.setAuthToken(''); // Clear authentication token
					try {
						(window as any).altenarWSDK.set({ token: '' }); // Reset SDK token
					} catch (e) {}
					window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
					vthis.appComponent.tokenUser = ''; // Clear user token
					if (
						this.appComponent.config.zendesk != undefined && // Check if Zendesk configuration exists
						this.appComponent.config.zendesk[
							this.appComponent.country
						] != undefined &&
						this.appComponent.config.zendesk[
							this.appComponent.country
						].name == 'centribal'
					) {
						const scriptRemove =
							document.getElementById('cen_snippet_static'); // Get Zendesk script element
						const divIframeRemove = document.getElementById(
							'centribal_iframe_layout' // Get iframe layout element
						);
						if (scriptRemove) {
							scriptRemove.remove(); // Remove Zendesk script
							divIframeRemove?.remove(); // Remove iframe layout if exists
							const div = document.createElement('div'); // Create new div for iframe layout
							div.setAttribute('id', 'centribal_iframe_layout');
							div.classList.add('centribal_hidden'); // Add hidden class
							if (this.appComponent.config.layout === 3) {
								document
									.querySelector('body')
									?.appendChild(div); // Append to body for layout 3
							} else if (this.appComponent.config.layout === 2) {
								const divChat =
									document.getElementById('centribal_chat'); // Get chat element
								divChat?.appendChild(div); // Append to chat for layout 2
							}
							setTimeout(() => {
								const script = document.createElement('script'); // Create new script element for Zendesk
								script.setAttribute('id', 'cen_snippet_static');
								script.setAttribute('control_iframe', '');
								script.setAttribute('type', 'text/javascript');
								script.setAttribute(
									'src',
									this.appComponent.config.zendesk[
										this.appComponent.country
									].key // Set source to Zendesk key
								);
								document
									.querySelector('body')
									?.appendChild(script); // Append script to body
							}, 500);
						}
					}
				}
			});
			this.appComponent.tokenSB = ''; // Clear session token
			this.appComponent.session = {
				// Reset session data
				logueado: false,
				usuario: '',
				nombre: '',
				pais: '',
				pais_nom: '',
				pais_id: null,
				moneda: '',
				moneda_nom: '',
				idioma: '',
				utc: '',
				token: '',
				req_cheque: '',
				req_doc: '',
				fecha_crea: '',
				fecha_actualizacion: '',
				origen: '',
				casino_enabled: '',
				verifcedula_ant: '',
				verifcedula_post: '',
				verifcedula_ant_paprob: '',
				verifcedula_post_paprob: '',
				wallet: '',
				last_login_date: null,
				last_login_ip: '',
				cedula: '',
				celular: '',
				fecha_nacim: '',
				iframemini_bannerleft: '',
				iframemini_bannerright: '',
				verifcelular: '',
				formSplaft: 'N',
				paternal_last_name: '',
				mother_last_name: '',
				email: '',
				phone: '',
				doc_type: '',
				nationalityid: '',
				first_name: '',
				identification: '',
			};
			apiService.setAuthToken(''); // Clear authentication token
			this.appComponent.tokenUser = ''; // Clear user token
			window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
			this.appComponent.loadView = false; // Set loading view state
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirect to home if version is 2
			}
			router.push('/'); // Navigate to home
			setTimeout(() => {
				this.appComponent.loadView = true; // Set loading view state after 1 second
			}, 1000);
		},
	},
});
</script>
<template>
	<!-- Main container for the header -->
	<div class="w-full h-full bg-primary-content flex py-3.5">
		<!-- Logo container -->
		<div
			class="w-[17%] h-full flex justify-center items-center bg-primary-content container__logo"
		>
			<RouterLink
				id="home_accion_inicio"
				to="/home"
				v-bind="analyticsAttrs('menu:nav:home')"
				class="inline-block container-img w-[130px] max-w-[130px] h-full"
			>
				<img
					id="header-logo"
					width="282"
					height="60"
					class="h-full w-full object-contain my-1"
					:src="config.header.logo.src"
					alt="Logo"
				/>
			</RouterLink>
		</div>
		<!-- Navigation menu for non-logged-in users -->
		<ol
			v-if="!appComponent.session.logueado"
			style="display: flex"
			class="justify-center w-[63%]"
		>
			<li
				v-for="value in config.MENU_NOLOGUEADO[appComponent.country]"
				class="main-item text-center w-auto h-full font-semibold text-base rounded-xl hover:shadow-inset"
				v-bind:class="[
					{ 'shadow-clip': value.SHADOW == 1 },
					value.MENU_CLASS,
					value.MENU_ID == 'accion_registro' ? 'px-3' : 'px-2',
				]"
			>
				<RouterLink
					:id="value.MENU_ID"
					:to="value.MENU_URL"
					v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
					@click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
					class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px]"
					v-if="!value.IS_MOBILE && value.TARGER == undefined"
				>
					<div
						class=""
						v-bind:class="{
							'inline-block w-5': config.partner == 6,
						}"
					>
						<img
							v-if="
								value.MENU_ICON != '' &&
								config.menu.desktopIcons
							"
							class="iconSideMenu shape-Sports desktop"
							:alt="value.MENU_TITLE"
							:src="value.MENU_ICON"
						/>
						<IconHouse
							v-if="
								value.MENU_TITLE == 'HOME' ||
								(value.MENU_TITLE == 'INICIO' &&
									config.menu.desktopIcons !== true)
							"
							:width="'12px'"
							:height="'12px'"
							:fill="'currentColor'"
						></IconHouse>
						<div
							v-if="value.ICON != undefined"
							class="svg"
							v-html="value.ICON"
						></div>
					</div>
					<span
						v-if="
							value.SUB_MENU == undefined || value.SUB_MENU == ''
						"
						class="text-center w-auto uppercase font-poppinsm leading-4 text-[0.8rem]"
						>{{ $t(value.MENU_TITLE) }}</span
					>
					<!-- Dropdown for sub-menu items -->
					<div
						class="dropdown dropdown-hover text-center cursor-pointer h-full w-full"
						v-if="
							value.SUB_MENU != undefined && value.SUB_MENU != ''
						"
					>
						<label
							tabindex="0"
							class="text-center flex items-center justify-center h-full w-full"
							>{{ $t(value.MENU_TITLE) }}</label
						>
						<ul
							tabindex="0"
							class="dropdown-content menu p-2 shadow bg-primary-content rounded-box w-auto text-break break-words"
						>
							<li v-for="item in value.SUB_MENU">
								<RouterLink
									class="font-poppism"
									:id="item.MENU_ID"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											'accion_iniciarsesion'
										)
									"
									:to="item.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									>{{ $t(item.MENU_TITLE) }}
								</RouterLink>
							</li>
						</ul>
					</div>
				</RouterLink>
				<a
					v-if="value.TARGER !== undefined && value.TARGER == '_top'"
					target="_top"
					:id="value.MENU_ID"
					:href="value.MENU_URL"
					@click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
					class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px] text-[0.8rem]"
					>{{ $t(value.MENU_TITLE) }}</a
				>
				<!-- Dropdown for casino menu -->
				<div
					v-if="value.MENU_ID == 'accion_casinoenvivo'"
					id="dropdown-casino"
					class="z-10 dropdown-casino animated fadeInDown"
					style="animation-duration: 0.5s"
				>
					<ul class="text-center">
						<span
							v-if="config.menu.casinoEnabled && value.NOLOGUEADO"
						>
							<li
								v-for="value in config.MENU_USUARIO_CASINO"
								class="main-item menu-home selected"
							>
								<RouterLink
									v-bind:class="{
										active:
											appComponent.page == value.MENU_URL,
									}"
									:id="value.MENU_ID"
									:to="value.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									:aria-label="value.MENU_ID"
									class="menu-item align-middle text-center text-neutral"
								>
									<span
										:class="value.MENU_CLASS"
										class="menu-item_Center"
										>{{ $t(value.MENU_TITLE) }}</span
									>
								</RouterLink>
							</li>
						</span>
					</ul>
				</div>
				<!-- Dropdown for sports betting menu -->
				<div
					v-if="
						value.MENU_ID == 'accion_deportivas' &&
						config.menu.subMenuApuestas
					"
					id="dropdown-casino"
					class="z-10 dropdown-casino animated fadeInDown"
					style="animation-duration: 0.5s"
				>
					<ul class="text-center">
						<span>
							<li
								v-for="value in config.MENU_USUARIO_APUESTAS"
								class="main-item menu-home selected"
							>
								<RouterLink
									v-bind:class="{
										active:
											appComponent.page == value.MENU_URL,
									}"
									:id="value.MENU_ID"
									:aria-label="value.MENU_ID"
									:to="value.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									class="menu-item align-middle text-center text-neutral"
								>
									<span
										:class="
											value.MENU_CLASS +
											'menu-item_Center'
										"
										>{{ $t(value.MENU_TITLE) }}</span
									>
								</RouterLink>
							</li>
						</span>
					</ul>
				</div>
			</li>
		</ol>
		<!-- Navigation for logged-in users -->
		<ol
			v-if="!appComponent.session.logueado"
			class="w-[20%] flex justify-end items-center"
		>
			<li class="h-full">
				<button
					id="accion_registrate"
					aria-label="register"
					class="text-center bg-success text-neutral uppercase px-4 h-full mr-3 rounded-xl hover:scale-105 font-medium transition-all ease-out text-sm"
					@click="
						appComponent.gAnalytics('menu_top', 'accion_registrate')
					"
				>
					<RouterLink to="/registro" v-bind="analyticsAttrs(`menu:nav:login`)">
						{{ $t('Regístrate') }}
						<!-- Register button text -->
					</RouterLink>
				</button>
			</li>
			<li class="h-full">
				<button
					id="accion_iniciarsesion"
					aria-label="login"
					class="text-center uppercase bg-gradient-to-r from-[#dadada] rounded-xl to-[#898989] text-neutral px-4 font-medium hover:scale-105 h-full mr-3 transition-all ease-out text-sm"
					@click="
						appComponent.gAnalytics(
							'menu_top',
							'accion_iniciarsesion'
						);
						appComponent.showModalLogin = true; // Show login modal
					"
				>
					{{ $t('Iniciar Sesión') }}
					<!-- Login button text -->
				</button>
			</li>
		</ol>
		<!-- Navigation for logged-in users -->
		<ol
			v-if="appComponent.session.logueado"
			style="width: 80%; display: flex"
			class="justify-center"
		>
			<li
				v-for="value in config.MENU_USUARIO_LOGUEADO[
					appComponent.country
				]"
				class="main-item text-center w-auto h-full font-semibold text-base rounded-xl hover:shadow-inset"
				v-bind:class="[
					{ 'shadow-clip': value.SHADOW == 1 },
					value.MENU_CLASS,
					value.MENU_ID == 'accion_depositar' ? 'px-5' : 'px-2',
				]"
			>
				<a
					:id="value.MENU_ID"
					@click="
						appComponent.gAnalytics('menu_top', value.MENU_ID);
						goTo(value.MENU_URL, value.MENU_ID);
					"
					class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px]"
					v-if="!value.IS_MOBILE"
				>
					<div
						class=""
						v-bind:class="{
							'inline-block w-5': config.partner == 6,
						}"
					>
						<img
							v-if="
								value.MENU_ICON != '' &&
								config.menu.desktopIcons
							"
							class="iconSideMenu shape-Sports desktop"
							:alt="value.MENU_TITLE"
							:src="value.MENU_ICON"
						/>
						<IconHouse
							v-if="
								value.MENU_TITLE == 'HOME' ||
								(value.MENU_TITLE == 'INICIO' &&
									config.menu.desktopIcons !== true)
							"
							:width="'12px'"
							:height="'12px'"
							:fill="'currentColor'"
						></IconHouse>
						<div
							v-if="value.ICON != undefined"
							class="svg"
							v-html="value.ICON"
						></div>
					</div>
					<span
						v-if="
							value.SUB_MENU == undefined || value.SUB_MENU == ''
						"
						class="text-center w-auto uppercase font-poppinsm leading-4 text-[0.8rem]"
						>{{ $t(value.MENU_TITLE) }}</span
					>
					<div
						class="text-[11px] font-sans uppercase text-center text-neutral flex justify-center"
						v-if="value.MENU_TITLE == 'DEPOSITAR'"
					></div>
					<!-- Dropdown for sub-menu items -->
					<div
						class="dropdown dropdown-hover text-center cursor-pointer h-full w-full"
						v-if="
							value.SUB_MENU != undefined && value.SUB_MENU != ''
						"
					>
						<label
							tabindex="0"
							class="text-center flex items-center justify-center h-full w-full"
							>{{ $t(value.MENU_TITLE) }}</label
						>
						<ul
							tabindex="0"
							class="dropdown-content menu p-2 shadow bg-primary-content rounded-box w-auto text-break break-words"
						>
							<li v-for="item in value.SUB_MENU">
								<RouterLink
									:id="item.MENU_ID"
									@click="
										appComponent.gAnalytics(
											'menu_top',
											'accion_iniciarsesion'
										)
									"
									:to="item.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									>{{ $t(item.MENU_TITLE) }}
								</RouterLink>
							</li>
						</ul>
					</div>
				</a>
				<!-- Dropdown for sports betting menu -->
				<div
					v-if="
						value.MENU_ID == 'accion_deportivas' &&
						config.menu.subMenuApuestas
					"
					id="dropdown-casino"
					class="z-10 dropdown-casino animated fadeInDown"
					style="animation-duration: 0.5s"
				>
					<ul class="text-center">
						<span>
							<li
								v-for="value in config.MENU_USUARIO_APUESTAS"
								class="main-item menu-home selected"
							>
								<RouterLink
									v-bind:class="{
										active:
											appComponent.page == value.MENU_URL,
									}"
									:id="value.MENU_ID"
									:aria-label="value.MENU_ID"
									:to="value.MENU_URL"
									v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									class="menu-item align-middle text-center text-neutral"
								>
									<span
										:class="
											value.MENU_CLASS +
											'menu-item_Center'
										"
										>{{ $t(value.MENU_TITLE) }}</span
									>
								</RouterLink>
							</li>
						</span>
					</ul>
				</div>
			</li>
			<!-- Dropdown for services menu -->
			<li
				style="z-index: 40 !important; display: block"
				class="pointer-events-auto dropdown dropdown-hover pl-2 main-item text-center w-auto h-full uppercase font-semibold text-base rounded-xl hover:shadow-inset"
			>
				<a
					id="accion_servicios"
					style="vertical-align: middle"
					class="w-full h-full flex justify-center items-center flex-col max-w-[113px]"
				>
					<span
						class="nav-label dropdown-toggle inline-flex font-poppinsm text-[0.8rem]"
						>{{ $t('Servicios ')
						}}<font-awesome-icon
							class="ml-2"
							icon="fa-solid fa-chevron-down"
					/></span>
				</a>
				<ul
					class="bg-neutral dropdown-content absolute hidden text-gray-700 p-0 pl-0 shadow-md"
					style="padding-left: 0px !important"
				>
					<li
						v-for="menu in appComponent.menus_service"
						class="whitespace-no-wrap text-left hover:bg-base-400 p-3"
					>
						<div class="dropdown dropdown-left dropdown-hover">
							<a
								:id="menu.MENU_ID"
								class="block whitespace-no-wrap dropdown-toggle"
							>
								<span class="nav-label font-poppinsm">{{
									$t(menu.MENU_TITLE)
								}}</span
								><span class="caret"></span>
							</a>
							<ul
								v-if="
									menu.SUBMENUS != undefined &&
									menu.SUBMENUS != ''
								"
								class="bg-neutral dropdown-content absolute hidden text-gray-700 ml-24 -mt-1 p-0 w-52 shadow-md"
								style="padding-left: 0px !important"
							>
								<li
									v-for="submenu in menu.SUBMENUS"
									class="hover:bg-base-400 whitespace-no-wrap text-left capitalize p-2"
								>
									<RouterLink
										:id="submenu.MENU_ID"
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										v-if="menu.TYPE != 'EXTERNAL'"
										class="title refresh font-poppinsm"
										>{{ $t(submenu.SUBMENU_TITLE) }}
									</RouterLink>
									<RouterLink
										:id="submenu.MENU_ID"
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										v-if="menu.TYPE == 'EXTERNAL'"
										class="title refresh font-poppinsm"
										>{{ $t(submenu.SUBMENU_TITLE) }}
									</RouterLink>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</li>
		</ol>
		<!-- User notifications and logout button -->
		<div
			class="w-[40%] flex justify-center items-center gap-8 lg:gap-2 flex-wrap"
			v-if="appComponent.session.logueado"
		>
			<div
				class="indicator w-1/12 relative right-1 mr-5 xl:mr-0"
				@click="appComponent.gAnalytics('send_mail')"
			>
				<div
					class="indicator-item badge badge-primary rounded-2xl text-neutral mt-1"
					:class="[
						appComponent.mensajesUnread == 0
							? 'bg-gray-500'
							: 'bg-[#23b950]',
					]"
				>
					{{ appComponent.mensajesUnread }}
					<!-- Display unread messages count -->
				</div>
				<RouterLink to="/mensajes">
					<font-awesome-icon
						class="text-3xl icon-envelope fill-nuetral"
						size="2x"
						icon="fa-solid fa-envelope"
					/>
				</RouterLink>
			</div>
			<!-- Balance details dropdown -->
			<details
				ref="menu"
				title="Saldo"
				id="saldo"
				class="balance-style-v1 p-0 dropdown dropdown-end rounded-2xl btn-primary btn-sm bg-[#434343] hidden xl:inline-block mx-0 w-[80%] xl:w-[65%]"
				:open="onSaldo"
				v-if="
					appComponent.session.wallet != '1' &&
					(config.header_ != undefined &&
					config.header_.balance_style != undefined
						? config.header_.balance_style == 1
						: config.header.styleBalance[appComponent.country] == 1)
				"
			>
				<summary
					@click="onUserBalance"
					class="normal-case text-left text-neutral w-full flex justify-center items-center"
					id="saldo_usuario_principal"
				>
					<span
						class="w-full flex items-center justify-center cursor-pointer"
					>
						<div class="text-balance text-center">
							<span
								class="font-light inline-block text-left text-[12px] font-poppinssl uppercase mr-1"
								>{{ $t('Saldo:') }}</span
							>
							<span
								class="saldo font-medium font-poppinsm hidden xl:inline-block"
							>
								{{ appComponent.session.moneda }}
								<!-- Display currency -->
								{{
									Math.abs(
										parseFloat(appComponent.saldo_total)
									).toFixed(2)
								}}
								<!-- Display total balance -->
							</span>
						</div>
						<font-awesome-icon
							size="2x"
							class="mas-saldos m-0 w-[10%]"
							icon="fa-solid fa-chevron-down"
						/>
					</span>
				</summary>
				<!-- Balance details list -->
				<ul
					class="p-2 menu z-[99999] max-w-[200px] mx-auto relative bg-base-100 text-base-content rounded-box w-auto uppercase mr-[1.5rem]"
					v-if="
						appComponent.typeUser == 'U' &&
						appComponent.session.wallet != '1' &&
						onSaldo
					"
				>
					<li
						@click="refreshBalance()"
						id="button-refrescar-saldo"
						class="leading-0 py-1 flex items-center justify-between flex-nowrap flex-row"
					>
						<a class="font-bold refresh">{{
							$t('Actualizar Saldo')
						}}</a>
						<font-awesome-icon
							class="text-black cursor-pointer"
							icon="fa-solid fa-refresh"
						/>
					</li>
					<li
						id="saldo_usuario"
						class="leading-0 py-1"
						v-if="
							config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_recarga
						"
					>
						<a class="font-bold">{{ $t('Saldo Recargas:') }}</a>
						<a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(appComponent.saldo_recarga).toFixed(2)
							}}
						</a>
						<!-- Display recharge balance -->
					</li>
					<li
						id="saldo_usuario_segundo"
						class="leading-0 py-1"
						v-if="
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_retiro) &&
							(config.header.balanceWithdraw == undefined
								? true
								: config.header.balanceWithdraw)
						"
					>
						<a class="font-bold">{{ $t('Saldo Retiro:') }}</a>
						<a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{ Math.abs(appComponent.saldo_retiro).toFixed(2) }}
						</a>
						<!-- Display withdrawal balance -->
					</li>
					<li
						id="saldo_freebet_bonos"
						class="leading-0 py-1 flex justify-center items-start"
					>
						<a class="font-bold">
							{{ $t('Saldo freebet y bonos:') }}
						</a>
						<a v-if="onViewBalance" class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									(Number(appComponent.saldo_freebet) || 0) +
										(Number(appComponent.saldo_bono) || 0)
								).toFixed(2)
							}}
						</a>
						<!-- Display freebet and bonus balance -->
						<button
							v-if="!onViewBalance"
							@click="onRefreshBalance2()"
							class="group mt-2 border-1 border-solid border-base-content mx-auto mb-4"
						>
							{{ $t('Consultar') }}
							<!-- Consult button -->
							<font-awesome-icon
								class="fa-refresh2 text-base-content text-sm group-active:-rotate-[920deg] group-active:transition-none transition-all ease-in-out duration-[5500ms]"
								icon="fa-solid fa-refresh"
							/>
						</button>
					</li>
					<li
						id="saldo_freeCasino"
						class="leading-0 py-1"
						v-if="
							appComponent.saldo_freeCasino != null &&
							true &&
							appComponent.saldo_freeCasino > 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_freeCasino)
						"
					>
						<a class="font-bold">{{ $t('FreeCasino') }} </a>
						<a class="saldo"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(appComponent.saldo_freeCasino).toFixed(
									2
								)
							}}
						</a>
						<!-- Display free casino balance -->
					</li>
					<div class="flex flex-col justify-center items-center">
						<div
							@click="appComponent.gAnalytics('deposit_profile')"
							class="btn btn-xs text-neutral w-auto block mx-auto my-1 rounded-xl"
							style="
								background: linear-gradient(
									0deg,
									rgba(0, 82, 6, 1) 0%,
									rgba(0, 173, 31, 1) 100%
								);
							"
						>
							<RouterLink
								to="/gestion/deposito"
								class="leading-loose"
								>{{ $t('Depositar') }}
							</RouterLink>
						</div>
						<div
							v-if="
								config.header.cancelWithdraw !== undefined &&
								config.header.cancelWithdraw
							"
							@click="
								appComponent.showModalCancelWithdraw = true;
								appComponent.gAnalytics('cancel_withdraw');
							"
							class="btn btn-xs text-neutral w-auto block mx-auto my-1 rounded-xl"
							style="
								background: linear-gradient(
									0deg,
									rgba(0, 82, 6, 1) 0%,
									rgba(0, 173, 31, 1) 100%
								);
							"
						>
							<a class="leading-loose">Anular Retiros</a>
						</div>
					</div>
				</ul>
			</details>
			<!-- Logout button -->
			<button
				class="rounded-[25px] font-normal normal-case text-[12px] btn bg-gray-100 btn-sm w-[10rem] capitalize font-poppinssl hover:shadow-inset transition-all xl:w-2/12 ease-in-out"
				id="cerrar_sesion"
				@click="
					logOut();
					appComponent.gAnalytics('exit_profile');
				"
			>
				{{ $t('Salir') }}
				<!-- Logout button text -->
			</button>
		</div>
	</div>
</template>
<style scoped>
details[open] {
	display: block; /* Display block when details are open */
}

.svg-inline--fa.fa-envelope {
	color: #434343 !important; /* Set color for envelope icon */
}

.balance-style-v1 {
	background: #434343 !important; /* Background color for balance style */
}

@media screen and (min-width: 700px) {
	.exit {
		border-top: 2px solid #0000001f !important; /* Top border for exit button */
		border-bottom: 2px solid white !important; /* Bottom border for exit button */
		box-shadow:
			0px 1px 4px 0px #00000029,
			/* Shadow effect for exit button */ inset -1px -5px 4px 0px
				#0000000f; /* Inset shadow effect */
		border: none; /* Remove border */
	}
}

.mas-saldos {
	display: inline-block; /* Display inline for saldo icon */
	width: 16px; /* Width for saldo icon */
	font-size: 0.8rem !important; /* Font size for saldo icon */
	text-align: right; /* Align text to the right */
	float: right; /* Float to the right */
	margin-top: 7px; /* Margin top for saldo icon */
}

.svg {
	enable-background: new 0 0 481.045 481.045; /* Enable background for SVG */
	width: 22px !important; /* Width for SVG */
	height: 25px !important; /* Height for SVG */
	margin-top: -20px; /* Negative margin top for positioning */
	position: absolute; /* Absolute positioning */
	margin-left: -15px; /* Negative margin left for positioning */
}
</style>

<!-- FILE DOCUMENTED -->

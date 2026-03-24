<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing an icon component
import router from '@/router'; // Importing the router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing another icon component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component
		let refreshBalance = this.$refreshBalance; // Method to refresh balance
		return {
			config,
			appComponent,
			refreshBalance,
		};
	},
	components: {
		IconHandsUp, // Registering the IconHandsUp component
		IconHouse, // Registering the IconHouse component
	},
	methods: {
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv3|layout:layout-${this.appComponent.config.layout}`
            };
        },
		goTo(url, id) {
			// Method to navigate to a specific URL or show a modal based on conditions
			if (
				id == 'accion_depositar' &&
				this.appComponent.config.showModalDeposit != undefined &&
				this.appComponent.config.showModalDeposit[
					this.appComponent.country
				]
			) {
				this.appComponent.showModalDepositV2 = true; // Show deposit modal
			} else {
				this.$router.push(url); // Navigate to the specified URL
			}
		},
		logOut() {
			// Method to log out the user
			if ((window as any).ws != undefined) {
				(window as any).ws.close(); // Close WebSocket connection if it exists
			}
			const vthis = this; // Preserve 'this' context
			apiService.request('logout', {}).then((response: any) => {
				// API call to log out
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					vthis.appComponent.tokenSB = ''; // Clear session token
					vthis.appComponent.session = {
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
					}; // Resetting session data
					apiService.setAuthToken(''); // Clear authentication token
					try {
						(window as any).altenarWSDK.set({ token: '' }); // Resetting SDK token
					} catch (e) {}
					window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
					vthis.appComponent.tokenUser = ''; // Clear user token
				}
			});
			this.appComponent.tokenSB = ''; // Clear session token
			this.appComponent.session = {
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
			}; // Resetting session data
			apiService.setAuthToken(''); // Clear authentication token
			this.appComponent.tokenUser = ''; // Clear user token
			window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
			this.appComponent.loadView = false; // Set loading view to false
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirect to home if version is 2
			}
			router.push('/'); // Navigate to home
			setTimeout(() => {
				this.appComponent.loadView = true; // Set loading view to true after timeout
			}, 1000);
		},
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		class="w-full h-full bg-base-300 flex text-neutral uppercase font-light"
	>
		<!-- Logo container -->
		<div
			class="w-[17%] h-full flex justify-center items-center bg-primary-content container__logo"
		>
			<RouterLink
				id="home_accion_inicio"
				to="/home"
				v-bind="analyticsAttrs(`menu:nav:home`)"
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
		<!-- Menu for non-logged in users -->
		<ol
			v-if="!appComponent.session.logueado"
			class="justify-center items-center flex w-[63%] gap-x-5"
		>
			<li
				v-for="value in config.MENU_NOLOGUEADO[appComponent.country]"
				class="text-center h-full text-base"
			>
				<RouterLink
					active-class="border-solid border-b-2 border-primary-content"
					:id="value.MENU_ID"
					:to="value.MENU_URL"
					v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
					@click="appComponent.gAnalytics('menu_top', value.MENU_ID)"
					class="align-middle text-center w-full h-full flex justify-center items-center flex-col hover:border-b-2 hover:border-solid hover:border-neutral transition-all ease-in-out"
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
						class="text-center w-auto uppercase font-poppinssl leading-4 text-sm"
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
									v-bind="analyticsAttrs(`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
									>{{ $t(item.MENU_TITLE) }}</RouterLink
								>
							</li>
						</ul>
					</div>
				</RouterLink>
			</li>
		</ol>
		<!-- Login and Register buttons for non-logged in users -->
		<ol
			v-if="!appComponent.session.logueado"
			class="w-[20%] flex justify-center items-center gap-x-3"
		>
			<li>
				<button
					id="accion_iniciarsesion"
					aria-label="login"
					class="text-center bg-primary-content rounded-md px-2 py-1 hover:scale-105 transition-all ease-out text-sm"
					@click="
						appComponent.gAnalytics(
							'menu_top',
							'accion_iniciarsesion'
						);
						appComponent.showModalLogin = true;
					"
				>
					{{ $t('Iniciar Sesión') }}
				</button>
			</li>
			<li>
				<button
					id="accion_registrate"
					aria-label="register"
					class="text-center bg-success rounded-md px-2 py-1 hover:scale-105 transition-all ease-out text-sm"
					@click="
						appComponent.gAnalytics('menu_top', 'accion_registrate')
					"
				>
					<RouterLink to="/registro" v-bind="analyticsAttrs(`menu:nav:inbox`)">
						{{ $t('Regístrate') }}
					</RouterLink>
				</button>
			</li>
		</ol>
		<!-- Menu for logged in users -->
		<ol
			v-if="appComponent.session.logueado"
			class="flex items-center justify-center w-[80%] gap-x-3"
		>
			<li
				v-for="value in config.MENU_USUARIO_LOGUEADO[
					appComponent.country
				]"
				class="text-center w-auto h-full text-base"
			>
				<RouterLink
					active-class="border-solid border-b-2 border-primary-content"
					:to="value.MENU_URL"
					v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
					:id="value.MENU_ID"
					@click="
						appComponent.gAnalytics('menu_top', value.MENU_ID);
						goTo(value.MENU_URL, value.MENU_ID);
					"
					class="align-middle text-center w-full h-full flex justify-center items-center flex-col border-transparent border-0 border-solid hover:border-b-2 focus:border-primary-content hover:border-solid hover:border-neutral transition-all ease-in-out"
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
						class="text-center w-auto uppercase font-poppinssl leading-4 text-sm"
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
									>{{ $t(item.MENU_TITLE) }}</RouterLink
								>
							</li>
						</ul>
					</div>
				</RouterLink>
				<!-- Dropdown for casino menu -->
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
			<!-- Services dropdown -->
			<li
				class="block z-[40] pointer-events-auto dropdown dropdown-hover main-item text-center w-auto h-full uppercase text-base"
			>
				<a
					id="accion_servicios"
					style="vertical-align: middle"
					class="w-full h-full flex justify-center items-center flex-col max-w-[113px] mr-8"
				>
					<span
						class="dropdown-toggle flex justify-center items-center text-sm font-poppinssl"
						>{{ $t('Servicios ')
						}}<font-awesome-icon
							class="ml-2"
							icon="fa-solid fa-chevron-down"
					/></span>
				</a>
				<ul
					class="dropdown-content absolute hidden text-neutral bg-[#232A38ff] p-0 pl-0 shadow-md"
					style="padding-left: 0px !important"
				>
					<li
						v-for="menu in appComponent.menus_service"
						class="whitespace-no-wrap text-left hover:bg-black p-3"
					>
						<div class="dropdown dropdown-left dropdown-hover">
							<a
								:id="menu.MENU_ID"
								class="block whitespace-no-wrap dropdown-toggle"
							>
								<span
									class="nav-label font-poppinssl text-sm"
									>{{ $t(menu.MENU_TITLE) }}</span
								><span class="caret"></span>
							</a>
							<!-- Submenus for services -->
							<ul
								v-if="
									menu.SUBMENUS != undefined &&
									menu.SUBMENUS != ''
								"
								class="bg-[#232A38ff] dropdown-content absolute hidden text-neutral -mt-1 p-0 w-52 shadow-md"
								style="padding-left: 0px !important"
							>
								<li
									v-for="submenu in menu.SUBMENUS"
									class="hover:bg-black whitespace-no-wrap text-left capitalize p-2"
								>
									<RouterLink
										:id="submenu.MENU_ID"
										@click="
											appComponent.gAnalytics(
												'menu_top',
												submenu.SUBMENU_TITLE
											)
										"
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
										v-if="menu.TYPE != 'EXTERNAL'"
										class="title refresh font-poppinssl text-sm"
										>{{
											$t(submenu.SUBMENU_TITLE)
										}}</RouterLink
									>
									<RouterLink
										:id="submenu.MENU_ID"
										@click="
											appComponent.gAnalytics(
												'menu_top',
												submenu.SUBMENU_TITLE
											)
										"
										:to="
											'/' +
											menu.MENU_SLUG +
											'/' +
											submenu.SUBMENU_URL
										"
										v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
										v-if="menu.TYPE == 'EXTERNAL'"
										class="title refresh font-poppinssl text-sm"
										>{{
											$t(submenu.SUBMENU_TITLE)
										}}</RouterLink
									>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</li>
		</ol>
		<!-- User balance and logout button -->
		<div
			class="w-[25%] flex justify-center items-center gap-2"
			v-if="appComponent.session.logueado"
		>
			<div
				class="indicator w-1/12 relative right-1"
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
				<RouterLink to="/mensajes" v-bind="analyticsAttrs(`menu:nav:inbox`)">
					<font-awesome-icon
						class="text-3xl icon-envelope fill-neutral"
						size="2x"
						icon="fa-solid fa-envelope"
					/>
				</RouterLink>
			</div>
			<!-- Balance dropdown -->
			<div
				title="Saldo"
				id="saldo"
				class="balance-style-v1 dropdown dropdown-end dropdown-hover rounded-2xl btn-primary btn-sm hidden bg-[#434343] md:inline-block mx-0 w-8/12"
				v-if="
					appComponent.session.wallet != '1' &&
					(config.header_ != undefined &&
					config.header_.balence_style != undefined
						? config.header_.balence_style == 1
						: config.header.styleBalance[appComponent.country] == 1)
				"
			>
				<div
					tabindex="0"
					class="normal-case text-left text-neutral"
					id="saldo_usuario_principal"
				>
					<span class="flex items-center justify-center">
						<div class="text-balance w-[90%] text-center">
							<span
								class="disponible font-poppinssl uppercase mr-1"
								>{{ $t('Saldo:') }}</span
							>
							<span class="saldo font-medium font-poppinsm">
								{{ appComponent.session.moneda }}
								{{
									Math.abs(
										parseFloat(appComponent.saldo_total)
									).toFixed(2)
								}}
							</span>
						</div>
						<font-awesome-icon
							size="2x"
							class="mas-saldos m-0 w-[10%]"
							icon="fa-solid fa-chevron-down"
						/>
					</span>
				</div>
				<!-- Balance details dropdown -->
				<ul
					tabindex="0"
					class="p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box w-auto uppercase"
					v-if="
						appComponent.typeUser == 'U' &&
						appComponent.session.wallet != '1'
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
						<a class="font-bold">{{ $t('Saldo Recargas:') }}</a
						><a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_recarga)
								).toFixed(2)
							}}</a
						>
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
						<a class="font-bold">{{ $t('Saldo Retiro:') }}</a
						><a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_retiro)
								).toFixed(2)
							}}</a
						>
					</li>
					<li
						id="saldo_usuario_tercero"
						class="leading-0 py-1"
						v-if="
							appComponent.saldo_bono !== '' &&
							appComponent.saldo_bono != undefined &&
							appComponent.saldo_bono != null &&
							appComponent.saldo_bono != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_bono)
						"
					>
						<a class="font-bold">{{ $t('Bonos por liberar:') }}</a
						><a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_bono)
								).toFixed(2)
							}}</a
						>
					</li>
					<li
						id="saldo_freebet"
						class="leading-0 py-1"
						v-if="
							appComponent.saldo_freebet !== '' &&
							appComponent.saldo_freebet != undefined &&
							appComponent.saldo_freebet != null &&
							appComponent.saldo_freebet != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_freebet)
						"
					>
						<a class="font-bold">{{ $t('Freebet') }} </a
						><a class="saldo font-light"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_freebet)
								).toFixed(2)
							}}</a
						>
					</li>
					<li
						id="saldo_freeCasino"
						class="leading-0 py-1"
						v-if="
							appComponent.saldo_freeCasino !== '' &&
							appComponent.saldo_freeCasino != undefined &&
							appComponent.saldo_freeCasino != null &&
							appComponent.saldo_freeCasino != 0 &&
							(config.header.typeBalance == undefined
								? true
								: config.header.typeBalance.saldo_freeCasino)
						"
					>
						<a class="font-bold">{{ $t('FreeCasino') }} </a
						><a class="saldo"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_freeCasino)
								).toFixed(2)
							}}</a
						>
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
								 v-bind="analyticsAttrs(`menu:nav:support`)"
								class="leading-loose"
								>{{ $t('Depositar') }}</RouterLink
							>
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
			</div>
			<div
				title="Saldo"
				id="saldo"
				class="dropdown dropdown-end dropdown-hover rounded-2xl btn-primary btn-sm hidden bg-[#434343] md:inline-block mx-0 w-8/12"
				v-if="
					appComponent.session.wallet != '1' &&
					(config.header_ != undefined &&
					config.header_.balance_style != undefined
						? config.header_.balance_style == 3
						: config.header.styleBalance[appComponent.country] == 3)
				"
			>
				<div
					tabindex="0"
					class="normal-case text-left text-neutral flex justify-between items-center"
					id="saldo_usuario_principal"
				>
					<span class="ml-4">
						<span class="disponible">{{ $t('Saldo:') }}</span>
						<span class="saldo font-semibold"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_total)
								).toFixed(2)
							}}</span
						>
					</span>
					<font-awesome-icon
						size="2x"
						class="mas-saldos"
						icon="fa-solid fa-chevron-down"
					/>
				</div>
				<ul
					tabindex="0"
					class="p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box uppercase w-full"
					v-if="
						appComponent.typeUser == 'U' &&
						appComponent.session.wallet != '1'
					"
					style="
						background: linear-gradient(
							313deg,
							#70707059,
							transparent
						);
						border: 2px solid #fff;
					"
				>
					<div class="header-style flex justify-between">
						<div class="balance-general">
							<div class="title-balance">
								<a
									class="font-bold text-gray-600 capitalize p-0"
									>{{ $t('Balance General') }}</a
								>
							</div>
							<div class="balance-money">
								<a
									class="font-bold text-gray-600 capitalize p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(appComponent.saldo_total)
										).toFixed(2)
									}}</a
								>
							</div>
						</div>
						<div
							class="refresh-button"
							@click="refreshBalance()"
							id="button-refrescar-saldo"
						>
							<font-awesome-icon
								class="text-gray-700 cursor-pointer fa-xs"
								icon="fa-solid fa-refresh"
							/>
						</div>
						<div class="player flex flex-col items-center">
							<a
								class="text-gray-600 text-xs font-bold text-center p-0 pt-2"
								>{{ $t('ID de jugador:') }}</a
							>
							<a class="p-0 text-gray-600">{{
								appComponent.session.usuario
							}}</a>
							<RouterLink
								@click="
									appComponent.gAnalytics('deposit_profile')
								"
								class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl text-center leading-[0]"
								to="/gestion/deposito"
								 v-bind="analyticsAttrs(`menu:nav:support`)"
								style="
									background: linear-gradient(
										0deg,
										rgba(0, 82, 6, 1) 0%,
										rgba(0, 173, 31, 1) 100%
									);
								"
							>
								{{ $t('Depositar') }}
							</RouterLink>
						</div>
					</div>
					<hr
						class="my-1"
						style="
							border-top: 1px solid #70707052;
							width: 100%;
							margin: auto;
						"
					/>
					<div class="body-balance text-gray-600">
						<ul class="flex flex-col p-0">
							<li
								v-if="
									config.header.typeBalance == undefined
										? true
										: config.header.typeBalance
												.saldo_recarga
								"
								class="flex w-full justify-between flex-row items-center h-5 capitalize"
							>
								<font-awesome-icon
									class="p-0"
									icon="fa-solid fa-money-check-dollar"
								/>{{ $t('Saldo Recargas') }}
								<a class="font-bold text-xs p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(
												appComponent.saldo_recarga
											)
										).toFixed(2)
									}}</a
								>
							</li>
							<li
								v-if="
									config.header.typeBalance == undefined
										? true
										: config.header.typeBalance.saldo_retiro
								"
								class="flex w-full justify-between flex-row items-center h-5 capitalize"
							>
								<font-awesome-icon
									class="p-0"
									icon="fa-solid fa-money-check-dollar"
								/>{{ $t('Saldo Retiros') }}
								<a class="font-bold text-xs p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(
												appComponent.saldo_retiro
											)
										).toFixed(2)
									}}</a
								>
							</li>
							<li
								v-if="
									appComponent.saldo_freeCasino !== '' &&
									appComponent.saldo_freeCasino !=
										undefined &&
									appComponent.saldo_freeCasino != null &&
									appComponent.saldo_freeCasino != 0 &&
									(config.header.typeBalance == undefined
										? true
										: config.header.typeBalance
												.saldo_freeCasino)
								"
								class="flex w-full justify-between flex-row items-center h-5 capitalize"
							>
								<font-awesome-icon
									class="p-0"
									icon="fa-solid fa-money-check-dollar"
								/>{{ $t('FreeCasino')
								}}<a class="font-bold text-xs p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(
												appComponent.saldo_freeCasino
											)
										).toFixed(2)
									}}</a
								>
							</li>
							<li
								v-if="
									appComponent.saldo_bono !== '' &&
									appComponent.saldo_bono != undefined &&
									appComponent.saldo_bono != null &&
									appComponent.saldo_bono != 0 &&
									(config.header.typeBalance == undefined
										? true
										: config.header.typeBalance.saldo_bono)
								"
								class="flex w-full justify-between flex-row items-center h-5 capitalize"
							>
								<font-awesome-icon
									class="p-0"
									icon="fa-solid fa-money-check-dollar"
								/>{{ $t('Bonos por liberar')
								}}<a class="font-bold text-xs p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(appComponent.saldo_bono)
										).toFixed(2)
									}}</a
								>
							</li>
							<li
								v-if="
									appComponent.saldo_freebet !== '' &&
									appComponent.saldo_freebet != undefined &&
									appComponent.saldo_freebet != null &&
									appComponent.saldo_freebet != 0 &&
									(config.header.typeBalance == undefined
										? true
										: config.header.typeBalance
												.saldo_freebet)
								"
								class="flex w-full justify-between flex-row items-center h-5 capitalize"
							>
								<font-awesome-icon
									class="p-0"
									icon="fa-solid fa-money-check-dollar"
								/>{{ $t('Freebet')
								}}<a class="font-bold text-xs p-0"
									>{{ appComponent.session.moneda }}
									{{
										Math.abs(
											parseFloat(
												appComponent.saldo_freebet
											)
										).toFixed(2)
									}}</a
								>
							</li>
						</ul>
					</div>
					<hr
						class="my-1"
						style="
							border-top: 1px solid #70707052;
							width: 100%;
							margin: auto;
						"
					/>
					<div
						class="footer-balance text-gray-600 flex justify-between capitalize"
					>
						<a class="font-bold p-0">{{ $t('Balance general') }}</a>
						<a class="font-bold p-0"
							>{{ appComponent.session.moneda }}
							{{
								Math.abs(
									parseFloat(appComponent.saldo_total)
								).toFixed(2)
							}}</a
						>
					</div>
				</ul>
			</div>
			<!-- Logout button -->
			<button
				class="exit btn bg-gray-100 btn-sm w-2/12 capitalize font-poppinssl hover:shadow-inset transition-all ease-in-out"
				id="cerrar_sesion"
				@click="
					logOut();
					appComponent.gAnalytics('exit_profile');
				"
			>
				{{ $t('Salir') }}
			</button>
		</div>
	</div>
</template>
<style scoped>
.container__logo {
	/* Styles for the logo container */
	clip-path: polygon(
		0 0,
		100% 0%,
		78% 100%,
		0% 100%
	); /* Custom shape for the logo */
}
.svg {
	/* Styles for SVG icons */
	enable-background: new 0 0 481.045 481.045; /* Enable background for SVG */
	width: 22px !important; /* Set width */
	height: 25px !important; /* Set height */
	margin-top: -20px; /* Adjust top margin */
	position: absolute; /* Position absolutely */
	margin-left: -15px; /* Adjust left margin */
}
</style>

<!-- FILE DOCUMENTED -->

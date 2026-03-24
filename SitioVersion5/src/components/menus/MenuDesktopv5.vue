<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import IconEnter from '../icons/IconEnter.vue'; // Importing IconEnter component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import IconHandsUp from '../icons/IconHandsUp.vue'; // Importing IconHandsUp component
import router from '@/router'; // Importing router for navigation
import IconHouse from '../icons/IconHouse.vue'; // Importing IconHouse component
import WalletIcon from '../icons/WalletIcon.vue'; // Importing WalletIcon component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing the app component
		let refreshBalance = this.$refreshBalance; // Accessing refresh balance method
		let onSaldo = false; // State variable to track balance visibility
		return {
			config,
			appComponent,
			refreshBalance,
			onSaldo,
		};
	},
	components: {
		IconHandsUp,
		IconHouse,
		IconMenu,
		IconEnter,
		WalletIcon,
	},
	methods: {
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:MenuDesktopv5|layout:layout-${this.appComponent.config.layout}`
            };
        },
		/**
		 * Navigate to a specified URL or show deposit modal based on conditions.
		 * @param {string} url - The URL to navigate to.
		 * @param {string} id - The identifier for the action.
		 */
		goTo(url, id) {
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
		/**
		 * Toggle user balance visibility and refresh balance if not already displayed.
		 */
		onUserBalance() {
			const params = {
				source: 'user_balances',
				subscribe: true,
				what: { profile: [] },
			};
			if (!this.onSaldo) {
				this.appComponent.refreshBalance2(); // Refresh balance
			}
			this.onSaldo = !this.onSaldo; // Toggle balance visibility
		},
		/**
		 * Log out the user and clear session data.
		 */
		logOut() {
			if ((window as any).ws != undefined) {
				(window as any).ws.close(); // Close WebSocket connection if exists
			}
			const vthis = this; // Preserve context for promise
			apiService.request('logout', {}).then((response: any) => {
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					vthis.appComponent.tokenSB = ''; // Clear token
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
					apiService.setAuthToken(''); // Clear auth token
					try {
						(window as any).altenarWSDK.set({ token: '' }); // Reset SDK token
					} catch (e) {}
					window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
					vthis.appComponent.tokenUser = ''; // Clear user token
				}
			});
			this.appComponent.tokenSB = ''; // Clear token
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
			apiService.setAuthToken(''); // Clear auth token
			this.appComponent.tokenUser = ''; // Clear user token
			window.localStorage.removeItem('auth_token'); // Remove auth token from local storage
			this.appComponent.loadView = false; // Set loading state
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirect to home if version is 2
			}
			router.push('/'); // Navigate to home
			setTimeout(() => {
				this.appComponent.loadView = true; // Reset loading state after timeout
			}, 1000);
		},
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted
		if (this.appComponent.session.logueado) {
			if (
				this.config != undefined &&
				this.config['login'] != undefined &&
				this.config['login']['menu_'] != undefined
			) {
				this.config.MENU_USUARIO_LOGUEADO[this.appComponent.country] =
					this.config['login']['menu_']; // Set logged-in user menu
			}
		} else {
			if (
				this.config != undefined &&
				this.config['not_login'] != undefined &&
				this.config['not_login']['menu_'] != undefined
			) {
				this.config.MENU_NOLOGUEADO[this.appComponent.country] =
					this.config['not_login']['menu_']; // Set not logged-in user menu
			}
		}
	},
});
</script>
<template>
	<!-- Main container for the header with navigation and user actions -->
	<div
		class="w-full h-[60px] bg-primary-content flex justify-between px-1 xl:px-3"
	>
		<section class="w-full h-full flex lg:gap-x-2 xl:gap-x-7">
			<!-- Logo and menu button section -->
			<div
				class="flex flex-row justify-start items-center gap-x-1 lg:gap-x-2 max-w-[200px] min-w-[120px] w-[20%]"
			>
				<label
					for="main-menu"
					class="drawer-button text-base-100 lg:hidden"
				>
					<IconMenu class="w-9 h-9" />
				</label>
				<RouterLink
					to="/home"
					v-bind="analyticsAttrs('menu:nav:home')"
					class="flex justify-center items-center w-full h-full"
				>
					<img
						width="100"
						height="100"
						class="object-contain w-full h-full"
						:src="config.header.logo.src"
						alt="Logo"
					/>
				</RouterLink>
			</div>
			<!-- Navigation menu for non-logged-in users -->
			<ol
				v-if="!appComponent.session.logueado"
				class="hidden lg:flex gap-x-2"
			>
				<li
					v-for="value in config.MENU_NOLOGUEADO[
						appComponent.country
					]"
					class="text-base-100 group flex justify-center items-center w-auto"
				>
					<RouterLink
						active-class="text-success [&>*:nth-child(1)]:drop-shadow-[0px_0px_2px]"
						:id="value.MENU_ID"
						:to="value.MENU_URL"
						v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
						@click="
							appComponent.gAnalytics('menu_top', value.MENU_ID)
						"
						class="flex flex-row gap-x-3 justify-center items-center hover:text-base-100/50 p-1 relative transition-all after:duration-1000"
						v-if="!value.IS_MOBILE && value.TARGER == undefined"
					>
						<img
							:src="value.MENU_ICON"
							width="15"
							height="15"
							alt=""
							class="group-hover:brightness-75"
						/>
						<span
							v-if="
								value.SUB_MENU == undefined ||
								value.SUB_MENU == ''
							"
							class="text-center capitalize font-poppinsm leading-4 text-xs xl:text-sm"
							>{{ $t(value.MENU_TITLE) }}</span
						>
					</RouterLink>
				</li>
			</ol>
			<!-- Navigation menu for logged-in users -->
			<ol
				v-else
				class="hidden lg:flex justify-center items-center lg:gap-x-2 xl:gap-x-5"
			>
				<li
					v-for="value in config.MENU_USUARIO_LOGUEADO[
						appComponent.country
					]"
					class="w-full h-full text-base-100"
					:class="value.MENU_CLASS"
				>
					<RouterLink
						active-class="text-success [&>*:nth-child(1)]:drop-shadow-[1px_1px_1px]"
						:id="value.MENU_ID"
						:to="value.MENU_URL"
						v-bind="analyticsAttrs(`menu:nav:${value.MENU_TITLE.toLowerCase().replace(/\s/g, '-')}`)"
						@click="
							appComponent.gAnalytics('menu_top', value.MENU_ID)
						"
						:class="[
							'w-full h-full group flex flex-row gap-x-3 justify-center hover:text-base-100/50  items-center p-1  relative transition-all',
						]"
						v-if="value.TARGER == undefined"
					>
						<img
							:src="value.MENU_ICON"
							width="15"
							height="15"
							alt=""
							class="group-hover:brightness-75"
						/>
						<span
							v-if="
								value.SUB_MENU == undefined ||
								value.SUB_MENU == ''
							"
							class="text-center capitalize font-poppinsm leading-4 text-xs xl:text-sm"
							>{{ $t(value.MENU_TITLE) }}</span
						>
					</RouterLink>
					<a
						v-if="
							value.TARGER !== undefined && value.TARGER == '_top'
						"
						target="_top"
						:id="value.MENU_ID"
						:href="value.MENU_URL"
						@click="
							appComponent.gAnalytics('menu_top', value.MENU_ID)
						"
						class="align-middle text-center menu-desk w-full h-full flex justify-center items-center flex-col max-w-[110px] text-[0.8rem]"
						>{{ $t(value.MENU_TITLE) }}</a
					>
				</li>
				<li
					class="z-50 relative cursor-pointer dropdown dropdown-hover h-full w-full hover:hover:text-base-100/50 text-base-100 flex items-center justify-center"
				>
					<span class="nav-label dropdown-toggle">
						<span
							class="leading-4 text-xs xl:text-sm capitalize font-poppinsm text-center flex justify-center items-center gap-x-2"
							>{{ $t('Servicios ')
							}}<font-awesome-icon
								icon="fa-solid fa-chevron-down"
						/></span>
					</span>
					<ul
						class="bg-base-100 dropdown-content absolute top-14 hidden text-gray-700 shadow-md rounded-md"
					>
						<li
							v-for="menu in appComponent.menus_service"
							class="whitespace-no-wrap hover:bg-base-200 hover:rounded-md group"
						>
							<div
								class="dropdown dropdown-left dropdown-hover dropdown-toggle nav-label rounded-md"
							>
								<span
									class="block p-3 font-poppinssl group-hover:font-poppinsm"
									>{{ $t(menu.MENU_TITLE) }}</span
								>
								<ul
									v-if="
										menu.SUBMENUS != undefined &&
										menu.SUBMENUS != ''
									"
									class="bg-base-100 dropdown-content absolute hidden text-gray-700 w-52 shadow-md rounded-md overflow-hidden"
								>
									<li
										v-for="submenu in menu.SUBMENUS"
										class="hover:border-solid hover:border-l-4 hover:border-success hover:bg-base-200 whitespace-no-wrap text-left capitalize transition-all ease-in-out"
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
											v-if="menu.TYPE != 'EXTERNAL'"
											class="text-sm font-poppinssl w-full h-full block p-2 hover:font-poppinssb"
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
											v-bind="analyticsAttrs(`menu:nav:${menu.MENU_SLUG + submenu.SUBMENU_URL.toLowerCase().replace(/\s+/g, '-')}`)"
											v-if="menu.TYPE == 'EXTERNAL'"
											class="text-sm font-poppinssl w-full h-full block p-2 hover:font-poppinssb"
											>{{ $t(submenu.SUBMENU_TITLE) }}
										</RouterLink>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</li>
			</ol>
		</section>
		<!-- User action buttons for non-logged-in users -->
		<div
			v-if="!appComponent.session.logueado"
			class="flex justify-end items-center gap-x-4 mr-2 lg:mr-0 w-auto full"
		>
			<RouterLink
				to="/registro"
				v-bind="analyticsAttrs(`menu:nav:login`)"
				id="accion_registrate"
				aria-label="register"
				class="text-center px-3 h-9 flex items-center rounded-md bg-success hover:scale-105 transition-all ease-out hover:brightness-90 font-poppinsb capitalize text-base-content text-xs xl:text-sm"
				@click="
					appComponent.gAnalytics('menu_top', 'accion_registrate')
				"
			>
				{{ $t('Regístrate') }}
			</RouterLink>
			<button
				id="accion_iniciarsesion"
				aria-label="login"
				class="text-center px-3 h-9 flex justify-center items-center gap-x-2 flex-row truncate py-3 bg-success leading-4 hover:brightness-90 rounded-md text-base-content capitalize font-poppinsb hover:scale-105 transition-all ease-out text-xs xl:text-sm"
				@click="
					appComponent.gAnalytics('menu_top', 'accion_iniciarsesion');
					appComponent.showModalLogin = true;
				"
			>
				<IconEnter
					class="w-4 h-4 fill-base-content"
					:width="5"
					:height="5"
				></IconEnter>
				{{ $t('Iniciar Sesión') }}
			</button>
		</div>
		<!-- User action buttons for logged-in users -->
		<div
			class="flex justify-end items-center gap-2 xl:gap-3 flex-nowrap shrink-0 w-auto h-full"
			v-else
		>
			<RouterLink
				to="/mensajes"
				v-bind="analyticsAttrs(`menu:nav:support`)"
				@click="appComponent.gAnalytics('send_mail')"
				class="w-10 lg:w-11 h-9 transition-all ease-in-out hover:scale-95 rounded-md p-0 flex justify-center items-center relative hover:brightness-90 shadow-[inset_0px_-1.5px_0px_,_inset_0px_1.5px_0px_,_inset_0px_-16.1px_14px_-15px_,_inset_0px_16.1px_14px_-15px] shadow-warning"
			>
				<p
					class="top-1 right-1 truncate overflow-hidden w-[1.2rem] h-[1.2rem] flex justify-center items-center rounded-full text-xs absolute bg-base-content bg-gradient-to-b from-success to-success/70 text-base-100"
				>
					{{ appComponent.mensajesUnread }}
				</p>
				<img
					class="w-[58%]"
					src="https://images.virtualsoft.tech/m/msj17212T1709847984.png"
					alt=""
				/>
			</RouterLink>
			<details
				title="Saldo"
				id="saldo"
				class="relative z-50 dropdown dropdown-end cursor-pointer transition-all ease-in-out"
			>
				<summary
					@click="onUserBalance()"
					class="list-none flex flex-row rounded-l-md rounded-r-full shadow-[0px_2px_3px_1px] shadow-base-content/40 w-auto h-9"
					id="saldo_usuario_principal"
				>
					<div
						class="bg-base-content bg-gradient-to-b from-success to-success/60 z-1 rounded-md flex flex-row gap-x-2 justify-center items-center px-2"
					>
						<p
							class="capitalize font-poppinssb text-base-100 text-xs xl:text-sm hidden lg:block"
						>
							{{ $t('Cartera') }}
						</p>
						<WalletIcon
							:width="15"
							:height="15"
							:fill="'white'"
							class="w-[12px] h-[12px]"
						/>
					</div>
					<div
						class="rounded-r-full border-solid border-1 border-success pl-4 gap-x-2 shrink-0 flex justify-between items-center flex-nowrap -ml-1"
					>
						<div
							class="h-full flex justify-start items-center gap-x-1"
						>
							<p
								class="whitespace-nowrap font-poppinssl text-base-100 max-w-[99px] overflow-hidden text-ellipsis text-xs xl:text-sm"
							>
								{{ appComponent.session.moneda }}
								{{
									Math.abs(
										parseFloat(appComponent.saldo_total)
									).toFixed(2)
								}}
							</p>
							<img
								src="https://images.virtualsoft.tech/m/msj0212T1710348987.png"
								alt="money"
								width="20"
								height="20"
								class="mr-2 lg:mr-0"
							/>
						</div>
						<span
							class="rounded-full w-9 h-9 bg-base-100 overflow-hidden lg:flex justify-center items-center hidden"
						>
							<img
								src="https://images.virtualsoft.tech/m/msjT1683329139.png"
								alt="avatar"
								class="w-full h-full object-cover"
							/>
						</span>
					</div>
				</summary>
				<div
					v-if="
						appComponent.typeUser == 'U' &&
						appComponent.session.wallet != '1' &&
						onSaldo
					"
					class="bg-primary-content w-full rounded-xl absolute border-solid border-1 border-primary top-10 gap-4 flex justify-center items-center flex-col p-2"
				>
					<div
						class="flex flex-col lg:flex-row w-full justify-center items-center gap-5"
					>
						<span
							class="rounded-full w-9 h-9 lg:w-11 lg:h-11 bg-base-100 overflow-hidden flex justify-center items-center shrink-0"
						>
							<img
								src="https://images.virtualsoft.tech/m/msjT1683329139.png"
								alt="avatar"
								class="w-full h-full object-cover"
							/>
						</span>
						<span class="flex flex-col gap-y-1">
							<p
								class="font-poppinsb text-success uppercase max-w-[140px] text-xs overflow-hidden whitespace-nowrap text-ellipsis max-h-[50px]"
							>
								{{ $t('USERNAME:') }}
								<span
									class="text-base-100 font-poppinssl uppercase whitespace-normal break-words ml-1"
									>{{ appComponent.session.nombre }}</span
								>
							</p>
							<p
								class="font-poppinsb text-success uppercase max-w-[140px] text-xs overflow-hidden whitespace-nowrap text-ellipsis max-h-[50px]"
							>
								{{ $t('No:') }}
								<span
									class="text-base-100 font-poppinssl uppercase whitespace-normal break-words ml-1"
									>{{ appComponent.session.usuario }}</span
								>
							</p>
						</span>
					</div>
					<div
						class="flex flex-col justify-center items-center gap-2 w-full relative z-[99999999]"
					>
						<button
							@click="appComponent.refreshBalance2()"
							class="w-full flex flex-col justify-center group items-center bg-secondary/50 rounded-xl text-base-100 text-xs p-1 relative hover:bg-secondary transition-all"
						>
							<p class="font-poppinssb text-success">
								{{ $t('Saldo:') }}
							</p>
							<p class="font-poppinssl text-sm">
								{{ appComponent.session.moneda }}
								{{
									Math.abs(appComponent.saldo_total).toFixed(
										2
									)
								}}
							</p>
							<font-awesome-icon
								class="text-success group-active:rotate-180 group-active:transition-none group-active:duration-[0] transition-all ease-in-out duration-1000 absolute top-1 right-2 cursor-pointer text-xs xl:text-sm w-[10%] hover:scale-105 hover:brightness-90 z-1"
								icon="fa-solid fa-refresh"
							/>
						</button>
						<button
							class="w-full flex flex-col justify-center items-center bg-secondary/50 rounded-xl text-base-100 text-xs p-1"
						>
							<p class="font-poppinsb text-success">
								{{ $t('Saldo Retiro:') }}
							</p>
							<p class="font-poppinssl text-sm">
								{{ appComponent.session.moneda }}
								{{
									Math.abs(appComponent.saldo_retiro).toFixed(
										2
									)
								}}
							</p>
						</button>
						<RouterLink
							to="/gestion/deposito"
							v-bind="analyticsAttrs(`menu:nav:support`)"
							class="w-full flex flex-col justify-center items-center bg-secondary/50 rounded-xl text-base-100 text-xs p-1 hover:bg-secondary transition-all"
						>
							<p class="font-poppinsb text-success">
								{{ $t('Saldo Recargas:') }}
							</p>
							<p class="font-poppinssl text-sm">
								{{ appComponent.session.moneda }}
								{{
									Math.abs(
										appComponent.saldo_recarga
									).toFixed(2)
								}}
							</p>
						</RouterLink>
						<button
							class="w-full flex flex-col justify-center items-center bg-secondary/50 rounded-xl text-base-100 text-xs p-1"
						>
							<p class="font-poppinsb text-success">
								{{ $t('Saldo Freebet y Bonos:') }}
							</p>
							<p class="font-poppinssl text-sm">
								{{ appComponent.session.moneda }}
								{{
									Math.abs(
										appComponent.saldo_freebet +
											appComponent.saldo_bono
									).toFixed(2)
								}}
							</p>
						</button>
					</div>
				</div>
			</details>
			<RouterLink
				to="/gestion/deposito"
				v-bind="analyticsAttrs(`menu:nav:support`)"
				id="accion_registrate"
				aria-label="register"
				class="text-center px-2 lg:px-3 h-9 rounded-md hidden lg:flex items-center bg-success hover:scale-95 transition-all ease-out hover:brightness-90 font-poppinsb capitalize text-base-content text-xs xl:text-sm"
				@click="
					appComponent.gAnalytics('menu_top', 'accion_registrate')
				"
			>
				{{ $t('Depositar') }}
			</RouterLink>
			<button
				class="hover:brightness-90 hover:scale-95 bg-base-content/60 bg-grandient-to-b from-primary to-primary w-9 h-9 rounded-full p-0 flex justify-center items-center transition-all ease-in-out"
				id="cerrar_sesion"
				@click="
					logOut();
					appComponent.gAnalytics('exit_profile');
				"
			>
				<IconEnter
					class="w-[50%] h-[50%] fill-success"
					:width="5"
					:height="5"
				></IconEnter>
			</button>
		</div>
	</div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

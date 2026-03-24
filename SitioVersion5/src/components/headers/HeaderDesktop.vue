<script lang="ts">
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import Logo from '../images/Logo.vue'; // Importing Logo component
import ClockUser from '../ClockUser.vue'; // Importing ClockUser component
import DetailsUser from '../DetailsUser.vue'; // Importing DetailsUser component
import BalanceUser from '../BalanceUser.vue'; // Importing BalanceUser component
import MenuDesktop from '../menus/MenuDesktop.vue'; // Importing MenuDesktop component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '@/services/ApiService'; // Importing apiService for API calls
import router from '@/router'; // Importing router for navigation
import Bonus from '../Bonus.vue'; // Importing Bonus component
import ButtonCambioMoneda from '@/components/ButtonCambioMoneda.vue'; // Importing ButtonCambioMoneda component
import { faDivide } from '@fortawesome/free-solid-svg-icons';

export default defineComponent({
	components: {
		ButtonCambioMoneda, // Registering ButtonCambioMoneda component
		IconMenu, // Registering IconMenu component
		Logo, // Registering Logo component
		ClockUser, // Registering ClockUser component
		DetailsUser, // Registering DetailsUser component
		BalanceUser, // Registering BalanceUser component
		MenuDesktop, // Registering MenuDesktop component
		Bonus, // Registering Bonus component
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing appComponent
		let refreshBalance = this.$refreshBalance; // Accessing refreshBalance method
		let margin: number = 0; // Initializing margin for bonuses display
		let bonuses: any = []; // Array to hold bonuses
		let modalBonus: boolean = false; // State for bonus modal visibility
		let onSaldo = false; // State for user balance visibility
		let onViewBalance = false; // State for balance view
		return {
			config, // Returning configuration
			appComponent, // Returning appComponent
			refreshBalance, // Returning refreshBalance method
			bonuses, // Returning bonuses array
			margin, // Returning margin
			modalBonus, // Returning modalBonus state
			onSaldo, // Returning onSaldo state
			onViewBalance, // Returning onViewBalance state
		};
	},
	mounted() {
		// Lifecycle hook that runs after the component is mounted
		this.appComponent.bono_header != undefined &&
		this.appComponent.bono_header.length > 0
			? (this.bonuses = this.appComponent.bono_header) // Assigning bonuses if available
			: (this.bonuses = []); // Resetting bonuses if not available
		setInterval(() => {
			this.margin++; // Incrementing margin for animation
			if (this.bonuses.length === this.margin) this.margin = 0; // Resetting margin if it exceeds bonuses length
		}, 4000); // Interval set to 4000ms

		document.addEventListener('pointerdown', this.clickOut);
	},
	beforeUnmount() {
        document.removeEventListener('pointerdown', this.clickOut);
    },
	directives: {
		// Custom directive for formatting numbers
		formatNumber(el, binding) {
			el.textContent = binding.value.toFixed(2); // Formatting number to two decimal places
		},
	},
	methods: {
		clickOut(event) {
            // Saldo
            const viewSaldo = document.getElementById('viewSaldo');
            if (viewSaldo && !viewSaldo.contains(event.target)) {
                this.onSaldo = false;
            }

            // Profile
            const profileCard = document.getElementById('profileCard');
            if (profileCard && !profileCard.contains(event.target)) {
                this.onProfile = false;
            }
        },
		// Method to handle box click events
		clickBox(box: any) {
			window.open(box.url, '_top'); // Opening the URL in the top window
		},
		// Method to log out the user
		logOut() {
			if ((window as any).ws != undefined) {
				(window as any).ws.close(); // Closing WebSocket connection if it exists
			}
			const vthis = this; // Storing reference to 'this'
			apiService.request('logout', {}).then((response: any) => {
				if (response.code == 0) {
                    if ((window as any).posthog){
                        (window as any).posthog?.reset()
                    }
					vthis.appComponent.tokenSB = ''; // Clearing token
					vthis.appComponent.session = {
						// Resetting session data
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
					apiService.setAuthToken(''); // Clearing auth token
					window.localStorage.removeItem('auth_token'); // Removing auth token from local storage
					vthis.appComponent.tokenUser = ''; // Clearing user token
				}
			});
			this.appComponent.tokenSB = ''; // Clearing token
			this.appComponent.session = {
				// Resetting session data
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
			apiService.setAuthToken(''); // Clearing auth token
			try {
				(window as any).altenarWSDK.set({ token: '' }); // Resetting Altenar SDK token
			} catch (e) {} // Catching any errors silently
			this.appComponent.tokenUser = ''; // Clearing user token
			window.localStorage.removeItem('auth_token'); // Removing auth token from local storage
			this.appComponent.loadView = false; // Setting loadView to false
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirecting to home if version is 2
			}
			router.push('/'); // Navigating to home route
			setTimeout(() => {
				this.appComponent.loadView = true; // Setting loadView to true after timeout
			}, 1000); // Timeout set to 1000ms
		},
		// Method to toggle user balance visibility
		onUserBalance() {
			this.onSaldo = !this.onSaldo; // Toggling onSaldo state
			if (this.onSaldo) {
				this.appComponent.refreshBalance2(); // Refreshing balance if onSaldo is true
			}
		},
		// Method to refresh user balance
		onRefreshBalance2() {
			const params = {
				source: 'user_balances', // Source for balance refresh
				subscribe: true, // Subscription flag
				what: { profile: [] }, // Profile data
			};
			this.appComponent.refreshBalance3(); // Calling refreshBalance3 method
			setTimeout(() => {
				this.onViewBalance = true; // Setting onViewBalance to true after timeout
			}, 5000); // Timeout set to 5000ms
		},
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:HeaderDesktop|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>
<template>
	<!-- Ticker component for displaying messages when the user is logged in -->
	<div
		v-if="
			(config.header_ != undefined && config.header_.top_band != undefined
				? config.header_.top_band
				: config.header.showTicker) &&
			appComponent.boxes.length > 0 &&
			appComponent.session.logueado
		"
		class="ticker-mobile items-baseline md:hidden text-neutral text-center"
	>
		<!-- Viewport for the ticker, with a moving class if appComponent.moving is true -->
		<div class="viewport" v-bind:class="{ moving: appComponent.moving }">
			<!-- Loop through each box in appComponent.boxes and display its title -->
			<div class="box" v-for="box in appComponent.boxes">
				<!-- Clickable span that opens the box URL in the top window -->
				<span @click="clickBox(box)" v-html="box.title"></span>
			</div>
		</div>
	</div>
	<!-- Header Container -->
	<div
		id="header"
		class="header hidden lg:block h-36 z-20 bg-base-content"
		:class="{
			'header-custom':
				config.header.headerCustom != undefined &&
				config.header.headerCustom[appComponent.country] != undefined &&
				config.header.headerCustom[appComponent.country],
		}"
	>
		<div>
			<figure
				class="logotipo version1 w-full absolute"
				v-bind:class="{
					'scroll-on-top-center':
						config.menu_ !== undefined &&
						config.menu_.top_menu !== undefined
							? config.menu_.top_menu
							: config.menu.stylePositionTop,
				}"
			>
				<!-- Router link to the home page -->
				<RouterLink
					id="home_accion_inicio"
					to="/home"
					v-bind="analyticsAttrs('header:logo')"
					class="w-1/5 mx-auto my-0 mt-3 block text-center header-logo-home"
				>
					<!-- Logo image with dynamic source based on configuration -->
					<img
						id="header-logo"
						width="282"
						height="60"
						class="inline-block h-full w-full object-contain"
						v-lazy="
                            config.logo_ != undefined &&
                            config.logo_['dark'] != undefined &&
                            config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                                ? config.logo_['dark']
                                : config.logo_['light']
                        "
						alt="Logo"
					/>
				</RouterLink>
			</figure>
			<div v-if="appComponent.session.logueado" class="px-1">
				<div
					class="ml-auto card w-[400px] overflow-visible text-neutral pt-2"
				>
					<div
						class="h-full flex flex-wrap p-0 justify-end items-center gap-1"
					>
						<!-- Indicator for unread messages -->
						<div
							class="indicator w-1/12 relative right-1"
							v-bind="analyticsAttrs('header:inbox')"
							@click="appComponent.gAnalytics('send_mail')"
						>
							<!-- Badge displaying the number of unread messages -->
							<div
								class="indicator-item badge badge-primary rounded-2xl text-neutral mt-1 bg-base-300"
							>
								{{ appComponent.mensajesUnread }}
							</div>
							<!-- Conditional rendering of the message icon based on configuration -->
							<span
								v-if="
									config.header != undefined &&
									config.header.inbox != undefined &&
									config.header.inbox == 2
								"
								@click="
									appComponent.modal.showModal = 'message'
								"
							>
								<font-awesome-icon
									class="text-3xl icon-envelope"
									size="2x"
									icon="fa-solid fa-envelope"
								/>
							</span>
							<!-- Router link to the messages page if the condition is not met -->
							<RouterLink v-else to="/mensajes">
								<font-awesome-icon
									class="text-3xl icon-envelope"
                                    :class="{
                                'text-neutral': config.partner == 2,
							}"
									size="2x"
									icon="fa-solid fa-envelope"
								/>
							</RouterLink>
						</div>

						<!-- Container for displaying user balance information -->
						<div
							title="Saldo"
							id="viewSaldo"
							class="relative hidden md:inline-block mx-0"
							v-if="
								appComponent.session.wallet != '1' &&
								(config.header_ != undefined &&
								config.header_.balance_style != undefined
									? config.header_.balance_style == 1
									: config.header.styleBalance[
											appComponent.country
										] == 1)
							"
						>
							<!-- Button to toggle user balance visibility -->
							<button
								@pointerdown.stop="onUserBalance()"
								v-bind="analyticsAttrs('header:balance')"
								class="normal-case text-left text-neutral cursor-pointer rounded-2xl btn-sm bg-base-100"
								id="saldo_usuario_principal"
							>
								<span>
									<!-- Label for balance -->
									<span
										class="font-light inline-block text-left text-[12px]"
										>{{ $t('Saldo:') }}</span
									>
									<!-- Display user balance -->
									<span class="saldo font-semibold"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												parseFloat(
													appComponent.saldo_total
												)
											).toFixed(2)
										}}</span
									>
								</span>
								<!-- Icon for dropdown -->
								<font-awesome-icon
									size="2x"
									class="mas-saldos"
									icon="fa-solid fa-chevron-down"
								/>
							</button>
							<!-- Dropdown menu for balance details -->
							<ul
								class="absolute top-10 right-0 p-2 w-52 bg-base-100 text-neutral rounded-box uppercase z-[100] shadow shadow-lg"
								v-if="
									appComponent.typeUser == 'U' &&
									appComponent.session.wallet != '1' &&
									onSaldo
								"
							>
								<!-- Option to refresh balance -->
								<li
									@click="appComponent.refreshBalance2()"
									v-bind="analyticsAttrs('header:balance:refresh-main-balance')"
									id="button-refrescar-saldo"
									class="py-1"
								>
									<a class="font-bold refresh">{{
										$t('Actualizar Saldo')
									}}</a>
									<font-awesome-icon
										class="absolute text-neutral cursor-pointer top-4 right-3"
										icon="fa-solid fa-refresh"
									/>
								</li>
								<!-- Display recharge balance -->
								<li
									id="saldo_usuario"
									class="flex flex-col py-1"
									v-if="
										config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_recarga
									"
								>
									<a class="font-bold">{{
										$t('Saldo Recargas:')
									}}</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_recarga
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display withdrawal balance -->
								<li
									id="saldo_usuario_segundo"
									class="flex flex-col py-1"
									v-if="
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_retiro) &&
										(config.header.balanceWithdraw ==
										undefined
											? true
											: config.header.balanceWithdraw)
									"
								>
									<a class="font-bold">{{
										$t('Saldo Retiro:')
									}}</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_retiro
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display bonus balance -->
								<li
									id="saldo_usuario_tercero"
									class="flex flex-col py-1"
									v-if="
										appComponent.saldo_bono != null &&
										true &&
										appComponent.saldo_bono > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_bono)
									"
								>
									<a class="font-bold">{{
										$t('Bonos por liberar:')
									}}</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_bono
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display freebet balance -->
								<li
									id="saldo_freebet"
									class="flex flex-col py-1"
									v-if="
										appComponent.saldo_freebet != null &&
										true &&
										appComponent.saldo_freebet > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_freebet)
									"
								>
									<a class="font-bold"
										>{{ $t('Freebet') }}
									</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_freebet
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display free casino balance -->
								<li
									id="saldo_freeCasino"
									class="flex flex-col py-1"
									v-if="
										appComponent.saldo_freeCasino != null &&
										true &&
										appComponent.saldo_freeCasino > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_freeCasino)
									"
								>
									<a class="font-bold"
										>{{ $t('FreeCasino') }}
									</a>
									<a class="saldo"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_freeCasino
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display combined freebet and bonus balance -->
								<li
									id="saldo_freebet_bonos"
									class="flex flex-col py-1"
								>
									<a class="text-base font-bold">{{
										$t('Saldo freebet y bonos:')
									}}</a>
									<a v-if="onViewBalance" class="saldo"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												(Number(
													appComponent.saldo_freebet
												) || 0) +
													(Number(
														appComponent.saldo_bono
													) || 0)
											).toFixed(2)
										}}</a
									>
									<button
										v-if="!onViewBalance"
										@click="onRefreshBalance2()"
										v-bind="analyticsAttrs('header:balance:refresh-freebet-bonus-btn')"
										class="group mt-2 rounded-md p-1 border-1 border-solid border-neutral mx-auto mb-4"
									>
										{{ $t('Consultar') }}
										<font-awesome-icon
											class="fa-refresh2 text-neutral text-sm group-active:-rotate-[920deg] group-active:transition-none transition-all ease-in-out duration-[5500ms]"
											icon="fa-solid fa-refresh"
										/>
									</button>
								</li>
								<!-- Button to navigate to deposit page -->
								<div
									@click="
										appComponent.gAnalytics(
											'deposit_profile'
										)
									"
									class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl"
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
										v-bind="analyticsAttrs('header:balance:deposit-btn')"
										class="leading-loose"
										>{{ $t('Depositar') }}
									</RouterLink>
								</div>
							</ul>
						</div>

						<!-- Container for displaying user balance information -->
						<div
							title="Saldo"
							id="viewSaldo"
							class="dropdown dropdown-end rounded-2xl md:inline-block mx-0 h-8 border-solid border-4 cursor-pointer border-primary-content bg-gradient-to-b from-neutral via-neutral to-shadow2 w-2/4 bg-neutral z-50"
							v-if="
								appComponent.session.wallet != '1' &&
								(config.header_ != undefined &&
								config.header_.balance_style != undefined
									? config.header_.balance_style == 2
									: config.header.styleBalance[
											appComponent.country
										] == 2)
							"
							style="border: 2px solid"
						>
							<!-- Summary section for user balance -->
							<div
								@pointerdown.stop="onUserBalance()"
								class="text-center text-neutral-content text-base h-full flex justify-between items-center mx-3 leading-4"
								id="saldo_usuario_principal"
							>
								<span class="" style="color: #4e4e4e">
									<!-- Label for balance -->
									<span class="saldo">{{
										$t('Saldo:')
									}}</span>
									<!-- Display user balance -->
									<span class="saldo font-semibold">
										{{ appComponent.session.moneda }}
										{{
											Math.abs(
												parseFloat(
													appComponent.saldo_total
												)
											).toFixed(2)
										}}
									</span>
								</span>
								<!-- Icon for dropdown -->
								<font-awesome-icon
									size="1x"
									class="-top-1 right-3"
									icon="fa-solid fa-chevron-down"
								/>
							</div>
							<!-- Dropdown menu for balance details -->
							<ul
								style="
									background: linear-gradient(
										130deg,
										#e6e6e5,
										transparent
									);
								"
								class="menu bg-neutral text-neutral-content rounded-box w-full"
								v-if="
									appComponent.typeUser == 'U' &&
									appComponent.session.wallet != '1' &&
									onSaldo
								"
							>
								<!-- Display general balance -->
								<span
									id="saldo_usuario"
									class="title-menu leading-0 bg-gradient-to-b from-light2 via-primary-content to-shadow2 bg-primary-content text-neutral px-2 flex items-center rounded-t-xl"
									v-if="
										config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_recarga
									"
								>
									<a class="font-light subtitle-menu"
										>{{ $t('Saldo:') }}
										<span class="font-bold"
											>{{ appComponent.session.moneda }}
											{{
												Math.abs(
													appComponent.saldo_total
												).toFixed(2)
											}}</span
										></a
									>
									<font-awesome-icon
										size="1x"
										class="mas-saldos chevron-down absolute -top-1 right-2 fa fa-chevron-down text-neutral"
										icon="fa-solid fa-chevron-down"
									/>
								</span>
								<!-- Option to refresh balance -->
								<li
									@click="appComponent.refreshBalance2()"
									id="button-refrescar-saldo"
									class="leading-0 py-1 px-1"
								>
									<a class="refresh font-bold">{{
										$t('Actualizar Saldo')
									}}</a>
									<font-awesome-icon
										class="absolute text-neutral cursor-pointer -top-1 -right-2"
										icon="fa-solid fa-refresh"
									/>
								</li>
								<hr
									style="
										border-top: 1px solid #70707052;
										width: 90%;
										margin: auto;
									"
								/>
								<!-- Display recharge balance -->
								<li
									id="saldo_usuario"
									class="leading-0 py-1 px-1"
									v-if="
										config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_recarga
									"
								>
									<a class="font-bold">{{
										$t('Saldo Recargas:')
									}}</a>
									<RouterLink
										to="/gestion/deposito"
										v-bind="analyticsAttrs('header:deposit-btn')"
										class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_recarga
											).toFixed(2)
										}}
									</RouterLink>
								</li>
								<hr
									style="
										border-top: 1px solid #70707052;
										width: 90%;
										margin: auto;
									"
								/>
								<!-- Display withdrawal balance -->
								<li
									id="saldo_usuario_segundo"
									class="leading-0 py-1 px-1"
									v-if="
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_retiro) &&
										(config.header.balanceWithdraw ==
										undefined
											? true
											: config.header.balanceWithdraw)
									"
								>
									<a class="font-bold">{{
										$t('Saldo Retiro:')
									}}</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_retiro
											).toFixed(2)
										}}</a
									>
								</li>
								<hr
									style="
										border-top: 1px solid #70707052;
										width: 90%;
										margin: auto;
									"
									v-if="
										appComponent.saldo_bono != null &&
										true &&
										appComponent.saldo_bono > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_bono)
									"
								/>
								<!-- Display bonus balance -->
								<li
									id="saldo_usuario_tercero"
									class="leading-0 py-1 px-1"
									v-if="
										appComponent.saldo_bono != null &&
										true &&
										appComponent.saldo_bono > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_bono)
									"
								>
									<a class="font-bold">{{
										$t('Bonos por liberar:')
									}}</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_bono
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display freebet balance -->
								<li
									id="saldo_freebet"
									class="leading-0 py-1 px-1"
									v-if="
										appComponent.saldo_freebet != null &&
										true &&
										appComponent.saldo_freebet > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_freebet)
									"
								>
									<a class="font-bold"
										>{{ $t('Freebet') }}
									</a>
									<a class="saldo font-light"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_freebet
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Display free casino balance -->
								<li
									id="saldo_freeCasino"
									class="leading-0 py-1 px-1"
									v-if="
										appComponent.saldo_freeCasino != null &&
										true &&
										appComponent.saldo_freeCasino > 0 &&
										(config.header.typeBalance == undefined
											? true
											: config.header.typeBalance
													.saldo_freeCasino)
									"
								>
									<a class="font-bold"
										>{{ $t('FreeCasino') }}
									</a>
									<a class="saldo"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_freeCasino
											).toFixed(2)
										}}</a
									>
								</li>
								<!-- Button to navigate to deposit page -->
								<div
									@click="
										appComponent.gAnalytics(
											'deposit_profile'
										)
									"
									class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl"
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
										v-bind="analyticsAttrs('header:deposit-btn')"
										class="saldo font-light leading-loose"
										>{{ $t('Depositar') }}
									</RouterLink>
								</div>
							</ul>
						</div>

						<!-- Container for displaying user balance information -->
						<div
							title="Saldo"
							id="viewSaldo"
							class="dropdown dropdown-end dropdown-hover rounded-2xl btn-primary btn-sm hidden md:inline-block mx-0 w-8/12"
							v-if="
								appComponent.session.wallet != '1' &&
								(config.header_ != undefined &&
								config.header_.balance_style != undefined
									? config.header_.balance_style == 3
									: config.header.styleBalance[
											appComponent.country
										] == 3)
							"
						>
							<!-- Summary section for user balance -->
							<div
								@pointerdown.stop="onUserBalance()"
								class="normal-case text-left text-neutral"
								id="saldo_usuario_principal"
							>
								<span class="">
									<!-- Label for balance -->
									<span
										class="font-light inline-block text-left text-[12px]"
										>{{ $t('Saldo:') }}</span
									>
									<!-- Display user balance -->
									<span class="saldo font-semibold"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												parseFloat(
													appComponent.saldo_total
												)
											).toFixed(2)
										}}</span
									>
								</span>
								<!-- Icon for dropdown -->
								<font-awesome-icon
									size="2x"
									class="mas-saldos"
									icon="fa-solid fa-chevron-down"
								/>
							</div>
							<!-- Dropdown menu for balance details -->
							<ul
								class="p-2 menu dropdown-content bg-neutral text-neutral-content rounded-box uppercase w-full"
								v-if="
									appComponent.typeUser == 'U' &&
									appComponent.session.wallet != '1' &&
									onSaldo
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
											<!-- Label for general balance -->
											<a
												class="font-bold text-gray-600 capitalize p-0"
												>{{ $t('Balance General') }}</a
											>
										</div>
										<div class="balance-money">
											<!-- Display general balance -->
											<a
												class="font-bold text-gray-600 capitalize p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														parseFloat(
															appComponent.saldo_total
														)
													).toFixed(2)
												}}</a
											>
										</div>
									</div>
									<!-- Button to refresh balance -->
									<div
										class="refresh-button"
										@click="appComponent.refreshBalance2()"
										id="button-refrescar-saldo"
									>
										<font-awesome-icon
											class="text-neutral cursor-pointer"
											icon="fa-solid fa-refresh"
										/>
									</div>
									<div
										class="player flex flex-col items-center"
									>
										<!-- Label for player ID -->
										<a
											class="text-gray-600 text-xs font-bold text-center p-0 pt-2"
											>{{ $t('ID de jugador:') }}</a
										>
										<!-- Display player ID -->
										<a class="p-0 text-gray-600">{{
											appComponent.session.usuario
										}}</a>
										<!-- Button to navigate to deposit page -->
										<RouterLink
											@click="
												appComponent.gAnalytics(
													'deposit_profile'
												)
											"
											class="btn btn-xs text-neutral w-24 block mx-auto my-1 rounded-xl text-center leading-[0]"
											to="/gestion/deposito"
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
										<!-- Display recharge balance -->
										<li
											v-if="
												config.header.typeBalance ==
												undefined
													? true
													: config.header.typeBalance
															.saldo_recarga
											"
											class="flex w-full justify-between flex-row items-center h-5 capitalize"
										>
											<font-awesome-icon
												class="p-0"
												icon="fa-solid fa-money-check-dollar"
											/>
											{{ $t('Saldo Recargas') }}
											<a class="font-bold text-xs p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														appComponent.saldo_recarga
													).toFixed(2)
												}}</a
											>
										</li>
										<!-- Display withdrawal balance -->
										<li
											v-if="
												config.header.typeBalance ==
												undefined
													? true
													: config.header.typeBalance
															.saldo_retiro
											"
											class="flex w-full justify-between flex-row items-center h-5 capitalize"
										>
											<font-awesome-icon
												class="p-0"
												icon="fa-solid fa-money-check-dollar"
											/>
											{{ $t('Saldo Retiros') }}
											<a class="font-bold text-xs p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														appComponent.saldo_retiro
													).toFixed(2)
												}}</a
											>
										</li>
										<!-- Display free casino balance -->
										<li
											v-if="
												appComponent.saldo_freeCasino !=
													null &&
												true &&
												appComponent.saldo_freeCasino >
													0 &&
												(config.header.typeBalance ==
												undefined
													? true
													: config.header.typeBalance
															.saldo_freeCasino)
											"
											class="flex w-full justify-between flex-row items-center h-5 capitalize"
										>
											<font-awesome-icon
												class="p-0"
												icon="fa-solid fa-money-check-dollar"
											/>
											{{ $t('FreeCasino')
											}}<a class="font-bold text-xs p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														appComponent.saldo_freeCasino
													).toFixed(2)
												}}</a
											>
										</li>
										<!-- Display bonus balance -->
										<li
											v-if="
												appComponent.saldo_bono !=
													null &&
												true &&
												appComponent.saldo_bono > 0 &&
												(config.header.typeBalance ==
												undefined
													? true
													: config.header.typeBalance
															.saldo_bono)
											"
											class="flex w-full justify-between flex-row items-center h-5 capitalize"
										>
											<font-awesome-icon
												class="p-0"
												icon="fa-solid fa-money-check-dollar"
											/>
											{{ $t('Bonos por liberar')
											}}<a class="font-bold text-xs p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														appComponent.saldo_bono
													).toFixed(2)
												}}</a
											>
										</li>
										<!-- Display freebet balance -->
										<li
											v-if="
												appComponent.saldo_freebet !=
													null &&
												true &&
												appComponent.saldo_freebet >
													0 &&
												(config.header.typeBalance ==
												undefined
													? true
													: config.header.typeBalance
															.saldo_freebet)
											"
											class="flex w-full justify-between flex-row items-center h-5 capitalize"
										>
											<font-awesome-icon
												class="p-0"
												icon="fa-solid fa-money-check-dollar"
											/>
											{{ $t('Freebet')
											}}<a class="font-bold text-xs p-0"
												>{{
													appComponent.session.moneda
												}}
												{{
													Math.abs(
														appComponent.saldo_freebet
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
									<!-- Label for general balance -->
									<a class="font-bold p-0">{{
										$t('Balance general')
									}}</a>
									<!-- Display general balance -->
									<a class="font-bold p-0"
										>{{ appComponent.session.moneda }}
										{{
											Math.abs(
												appComponent.saldo_total
											).toFixed(2)
										}}</a
									>
								</div>
							</ul>
						</div>

						<!-- Container for displaying user balance information -->
						<div
							title="Saldo"
							id="saldo"
							class="dropdown dropdown-end dropdown-hover rounded-2xl btn btn-primary btn-sm hidden md:block"
							@click="appComponent.checkBalanceQuisk()"
							v-if="appComponent.session.wallet == '1'"
						>
							<!-- Inner container for balance information -->
							<div
								tabindex="0"
								class="normal-case text-left"
								id="saldo_usuario_principal"
							>
								<!-- Label for updating balance -->
								<span
									class="font-light inline-block text-left text-[12px] text-neutral"
									>{{ $t('Actualizar Saldo') }}</span
								>
								<!-- Icon for dropdown -->
								<i
									class="mas-saldos fa fa-chevron-down text-neutral"
									aria-hidden="true"
								></i>
							</div>
						</div>

						<!-- Button for logging out the user -->
						<div
							class="rounded-[25px] font-normal text-[12px] btn btn-primary btn-sm w-3/12 uppercase"
							id="cerrar_sesion"
							@click="
								logOut();
								appComponent.gAnalytics('exit_profile'); // Sends analytics event for exiting profile
							"
						>
							<!-- Link for logging out with conditional class binding -->
							<a
								v-bind:class="{
									uppercase:
										appComponent.themeG == 'tribetmx', // Adds uppercase class if themeG is 'tribetmx'
								}"
								v-bind="analyticsAttrs('header:logout-btn')"
								class="rounded-[25px] text-neutral"
								>{{ $t('Salir') }}</a
							>
						</div>

						<!-- Container for wallet selection -->
						<div
							class="saldo wallet"
							@click="appComponent.selectWallet()"
							v-if="
								appComponent.typeUser == 'U' &&
								config.wallets != undefined &&
								config.wallets.length > 1
							"
						>
							<!-- Link for changing wallet -->
							<a
								id="saldo_usuario_principal"
								class="header-wallet btn btn-primary btn-sm rounded-2xl waves-effect text-neutral"
							>
								<!-- Label for changing wallet -->
								<span
									class="font-light inline-block text-left text-[12px] capitalize mr-2"
									>{{ $t('Cambiar billetera') }}</span
								>
								<!-- Image for the first wallet -->
								<img
									class="wallet_selected w-7"
									v-if="appComponent.session.wallet === '0'"
									:src="config.wallets[0].img"
								/>
								<!-- Image for the second wallet -->
								<img
									class="wallet_selected w-7"
									v-if="appComponent.session.wallet === '1'"
									:src="config.wallets[1].img"
								/>
							</a>
						</div>

						<!-- Container for currency change button -->
						<div
							v-if="
								appComponent.config.header !== undefined &&
								appComponent.config.header
									.currencyChangeButton !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								] !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								]
							"
							class="w-full flex justify-end items-center"
						>
							<!-- Button for changing currency -->
							<ButtonCambioMoneda class="mr-2 mt-1" />
						</div>
					</div>
					<div
						style="text-align: center"
						v-if="appComponent.session.formSplaft == 'S'"
					>
						<label
							@click="appComponent.modal.showModal = 'splaft'"
							class="btn btn-xs"
							>{{ $t('Actualizar Formulario SPLAFT') }}</label
						>
					</div>
				</div>
			</div>
			<!-- Container for displaying bonus information -->
			<div
				class="h-28 w-80 ml-auto overflow-hidden hover:scale-105"
				v-if="
					config.header != undefined &&
					config.header.bono_header != undefined &&
					config.header.bono_header &&
					appComponent.bono_header != undefined &&
					appComponent.bono_header.length > 0
				"
			>
				<!-- Inner container for bonus items with transition effect -->
				<div
					class="h-full w-full mt-4 flex transition-all"
					:style="{
						marginLeft: margin === 0 ? 0 : `-${margin}00%`,
						width:
							bonuses.length === 0 ? 0 : `${bonuses.length}00%`,
					}"
				>
					<!-- Bonus component for each bonus item -->
					<Bonus
						:bonus="bonus"
						v-for="bonus in appComponent.bono_header"
					/>
				</div>
			</div>
		</div>
		<MenuDesktop />
	</div>
</template>
<style scoped>
/* Class for displaying balance information */
.mas-saldos {
	display: inline-block; /* Allows the element to be inline while maintaining block properties */
	width: 16px; /* Sets the width of the element */
	font-size: 0.8rem !important; /* Sets the font size, overriding other styles if necessary */
	text-align: right; /* Aligns text to the right */
	float: right; /* Floats the element to the right */
	margin-top: 7px; /* Adds a top margin for spacing */
}

/* Class for the header logo on the home page */
.header-logo-home {
	width: 300px; /* Sets the width of the logo */
	height: 60px; /* Sets the height of the logo */
}
</style>

<!-- FILE DOCUMENTED -->

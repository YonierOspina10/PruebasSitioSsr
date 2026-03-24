<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	data: function () {
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for handling events
		let step_1: boolean = false; // Step 1 flag
		let step_2: boolean = false; // Step 2 flag
		let wallet_options: boolean = false; // Wallet options visibility flag
		let wallet_config: boolean = false; // Wallet configuration visibility flag
		return {
			appComponent,
			emitter,
			step_1,
			step_2,
			wallet_options,
			wallet_config,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on component unmount
	},
	created() {
		if (this.appComponent.config.wallets != undefined) {
			// Check if wallets are defined
			var countWallets = this.appComponent.config.wallets; // Get wallets from config
			if (countWallets.length > 1) {
				this.wallet_options = true; // Show wallet options if more than one wallet
			} else {
				if (countWallets[0].id === 1) {
					// Check if the first wallet is the specific one
					this.wallet_config = true; // Show wallet configuration
					this.step_1 = true; // Set step 1 to true
					this.step_2 = false; // Set step 2 to false
				}
			}
		} else {
			this.$router.push('/home'); // Redirect to home if no wallets are defined
		}
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Listen for 'accept:modal' event
			this.acceptModal(); // Call acceptModal method when event is triggered
		});
	},
	methods: {
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'wallets_send') {
				// Check modal type
				window.location.href =
					this.appComponent.config.baseUrlFx + 'deportes?frm=lgn'; // Redirect to specific URL
			} else {
				if (this.appComponent.modal.orderModal == 'QFBET') {
					// Check for QFBET modal
					if (
						(document.getElementById('quiskForm') as any) !=
						undefined
					) {
						(document.getElementById('quiskForm') as any).remove(); // Remove existing form if it exists
					}
					var f = document.createElement('form'); // Create a new form element
					f.setAttribute('name', 'quiskForm'); // Set form name
					f.setAttribute('id', 'quiskForm'); // Set form ID
					f.setAttribute('method', 'post'); // Set form method
					f.setAttribute(
						'action',
						this.appComponent.config.QuiskUrlRegister // Set form action URL
					);
					var i = document.createElement('input'); // Create input for merchant key
					i.setAttribute('type', 'text');
					i.setAttribute('name', 'merchantKey');
					i.setAttribute(
						'value',
						this.appComponent.config.QuiskMerchantKey // Set merchant key value
					);
					i.setAttribute('hidden', 'true'); // Hide input
					var phone = document.createElement('input'); // Create input for phone
					phone.setAttribute('type', 'text');
					phone.setAttribute('name', 'phone');
					phone.setAttribute(
						'value',
						this.appComponent.session.celular // Set phone value
					);
					phone.setAttribute('hidden', 'true'); // Hide input
					f.appendChild(phone); // Append phone input to form
					var s = document.createElement('input'); // Create submit button
					s.setAttribute('type', 'submit');
					s.setAttribute('value', 'Submit');
					s.setAttribute('hidden', 'true'); // Hide submit button
					f.appendChild(i); // Append merchant key input to form
					f.appendChild(s); // Append submit button to form
					document.getElementsByTagName('body')[0].appendChild(f); // Append form to body
					(document as any).quiskForm.target = 'login'; // Set form target
					(document.getElementById('quiskForm') as any).action =
						this.appComponent.config.QuiskUrlRegister; // Set action URL again
					var child = window.open(
						'',
						'login',
						'width=500,height=550,toolbar=-100' // Open new window for login
					);
					(document as any).quiskForm.submit(); // Submit the form
				}
			}
			this.appComponent.closeModal(); // Close the modal
		},
		backStep() {
			if (this.step_1) {
				// If currently on step 1
				this.refuseConfig(); // Call refuseConfig method
			} else if (this.step_2) {
				// If currently on step 2
				this.wallet_options = false; // Hide wallet options
				this.wallet_config = true; // Show wallet configuration
				this.step_1 = true; // Set step 1 to true
				this.step_2 = false; // Set step 2 to false
			}
		},
		aceptConfig() {
			this.step_1 = false; // Hide step 1
			this.step_2 = true; // Show step 2
		},
		refuseConfig() {
			this.step_1 = false; // Hide step 1
			this.step_2 = false; // Hide step 2
			this.wallet_options = true; // Show wallet options
		},
		walletSelected(id) {
			const vthis = this; // Preserve context
			const data = {
				wallet: id, // Prepare data for API request
			};
			apiService.request('wallet_config', data).then((response: any) => {
				// Make API request
				if (response.code == 0) {
					// Check response code
					if (id === 1 && response.msg == 'configWallet') {
						// Check if wallet ID is 1 and message is configWallet
						vthis.wallet_options = false; // Hide wallet options
						vthis.wallet_config = true; // Show wallet configuration
						vthis.step_1 = true; // Set step 1 to true
						vthis.step_2 = false; // Set step 2 to false
					} else {
						window.location.href =
							vthis.appComponent.config.baseUrlFx +
							'/deportes?frm=lgn'; // Redirect to specific URL
					}
				} else {
					var error_mensaje = ''; // Initialize error message
					if (response.error_code != undefined) {
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Translate error message
						);
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
						);
					}
					this.appComponent.modal = {
						showModal: 'notification', // Show notification modal
						titleModal: this.$t('Error!'), // Set modal title
						messageModal: error_mensaje, // Set modal message
						buttonModal: this.$t('Aceptar'), // Set button text
						orderModal: 'closeModal', // Set modal order
					};
				}
			});
		},
		sendWallet() {
			if (
				this.appComponent.session.cedula != '' &&
				this.appComponent.session.celular != '' &&
				this.appComponent.session.fecha_nacim != ''
			) {
				// Check if session data is complete
				var data = {
					cedula: this.appComponent.session.cedula, // Prepare data for API request
					celular: this.appComponent.session.celular,
					fecha_nacim: this.appComponent.session.fecha_nacim,
				};
				apiService
					.request('wallets_send', data) // Make API request
					.then((response: any) => {
						if (response.code == 0) {
							// Check response code
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Mensaje'), // Set modal title
								messageModal: this.$t(
									'Tu billetera ha sido configurada correctamente.' // Success message
								),
								buttonModal: this.$t('Aceptar'), // Set button text
								orderModal: 'wallets_send', // Set modal order
							};
						} else {
							if (response.error_code == 'QFBET') {
								// Check for specific error code
								this.appComponent.modal = {
									showModal: 'notification', // Show notification modal
									titleModal: this.$t('Mensaje'), // Set modal title
									messageModal: this.$t(
										'Primero complete el proceso de autenticación rápida y luego vuelva a hacer clic en el botón Enviar' // Instruction message
									),
									buttonModal: this.$t('Aceptar'), // Set button text
									orderModal: 'QFBET', // Set modal order
								};
							} else {
								var error_mensaje = ''; // Initialize error message
								if (response.error_code != undefined) {
									error_mensaje = this.$t(
										'ERROR' + response.error_code.toString() // Translate error message
									);
								}
								if (error_mensaje == '') {
									error_mensaje = this.$t(
										'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
									);
								}
								this.appComponent.modal = {
									showModal: 'notification', // Show notification modal
									titleModal: this.$t('Error!'), // Set modal title
									messageModal: error_mensaje, // Set modal message
									buttonModal: this.$t('Aceptar'), // Set button text
									orderModal: 'closeModal', // Set modal order
								};
							}
						}
					});
			} else {
				this.appComponent.modal = {
					showModal: 'notification', // Show notification modal
					titleModal: this.$t('Mensaje'), // Set modal title
					messageModal: this.$t(
						'Es necesario actualizar su información personal, para hacerlo debes ingresar a la billetera y dirigirte a tu cuenta.' // Instruction message
					),
					buttonModal: this.$t('Aceptar'), // Set button text
					orderModal: 'closeModal', // Set modal order
				};
			}
		},
	},
});
</script>
<template>
	<!-- Main wrapper for wallets component -->
	<div
		id="wallets-wrapper"
		class="content-wrapper h-[100%] w-[100%] z-[9999] fixed bg-success"
	>
		<!-- Header section for the wallet interface -->
		<div class="header_wallet">
			<div class="max-w-screen-lg m-auto flex justify-between">
				<img
					id="header-logo"
					:src="appComponent.config.header.logo.src"
					width="180"
					alt="Logo"
				/>
				<!-- Logout button with analytics tracking -->
				<div
					class="rounded-[25px] font-normal normal-case text-[12px]"
					id="cerrar_sesion"
					@click="
						appComponent.logOut();
						appComponent.gAnalytics('exit_profile');
					"
				>
					<a
						class="rounded-[25px] btn btn-sm btn-primary inline-block float-right text-neutral mt-2"
						>{{ $t('Salir') }}</a
					>
				</div>
			</div>
		</div>
		<!-- Wallet options panel -->
		<div id="wallet_options" class="panel" v-if="wallet_options">
			<div class="Container ActivePageTitle max-w-screen-lg m-auto mb-5">
				<span class="h1 tittle">
					<span class="text-neutral text-xl">{{
						$t('Billeteras')
					}}</span>
				</span>
			</div>
			<div class="register-input-view">
				<div class="form-wrapper">
					<!-- Wallet selection form -->
					<div
						id="wallet_select"
						class="msform max-w-screen-sm px-2 m-auto"
						name="wallet_select"
					>
						<div class="form-row-1 header-text mb-5 mt-5">
							<div class="form-col">
								<div class="form-col-title div-inline-block">
									{{
										$t(
											'Por favor selecciona una billetera para continuar'
										)
									}}
								</div>
							</div>
						</div>
						<div class="form-row-1">
							<!-- Loop through available wallets -->
							<div
								class="form-col w-[49%] inline-block align-top"
								v-for="value in appComponent.config.wallets"
							>
								<button
									class="wallet-b"
									@click="walletSelected(value.id)"
								>
									<img
										:src="value.img"
										:alt="value.walletName"
									/>
									<span>{{ value.walletName }}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="advert-wrapper"></div>
				<div class="clear"></div>
			</div>
		</div>
		<!-- Wallet configuration section -->
		<div id="wallet_config" v-if="wallet_config">
			<div id="step_1" v-if="step_1">
				<div class="Container ActivePageTitle text-neutral">
					<span class="h1">
						<span>{{ $t('Paso 1') }}</span>
					</span>
					<div
						class="backStep mb-2"
						id="backStep"
						@click="backStep()"
					>
						<i class="fa fa-chevron-left"></i>
						<a class="btn btn-sm btn-neutral waves-effect ml-2">{{
							$t('Regresar')
						}}</a>
					</div>
				</div>
				<div class="form-wrapper-step1 max-w-screen-sm px-2 m-auto">
					<div class="form-1">
						<div class="f1">
							<img :src="appComponent.config.wallets[1].img" />
						</div>
						<div class="f2">
							<span>{{
								$t(
									'Es necesario configurar tu cuenta para usar esta Billetera'
								)
							}}</span
							><br /><br />
							<span class="quest">{{
								$t('¿Desea configurar su cuenta Quisk?')
							}}</span>
						</div>
					</div>
					<div class="form-row-1 mt-3 flex">
						<div
							class="form-col w-[49%] inline-block align-top mr-1"
						>
							<input
								@click="aceptConfig()"
								type="submit"
								id="acept"
								name="acept"
								class="submit action-button btn btn-neutral w-full"
								:value="$t('Aceptar')"
							/>
						</div>
						<div
							class="form-col w-[49%] inline-block align-top ml-1"
						>
							<input
								@click="refuseConfig()"
								type="submit"
								id="refuse"
								name="refuse"
								class="submit action-button btn btn-neutral w-full"
								:value="$t('Rechazar')"
							/>
						</div>
					</div>
				</div>
			</div>
			<div id="step_2" v-if="step_2">
				<div class="Container ActivePageTitle text-neutral">
					<span class="h1">
						<span>{{ $t('Paso 2') }}</span>
					</span>
					<div
						class="backStep mb-2"
						id="backStep"
						@click="backStep()"
					>
						<i class="fa fa-chevron-left"></i>
						<a
							class="btn btn-sm btn-neutral btn waves-effect ml-2"
							>{{ $t('Regresar') }}</a
						>
					</div>
				</div>
				<div class="form-wrapper-step1 max-w-screen-sm px-2 m-auto">
					<div class="form-1">
						<div class="config_title text-neutral">
							<span>{{
								$t('Configuración billetera QUISK')
							}}</span>
							<img
								class="inline-block"
								:src="appComponent.config.wallets[1].img"
							/>
						</div>
						<div class="form-row">
							<div class="loader-dbt">
								<img :src="appComponent.config.logoLoader" />
							</div>
							<div
								id="form_wallets"
								class="msform ng-pristine ng-valid"
								name="form_micuenta"
							>
								<fieldset class="form_quisk">
									<div class="form-row">
										<div
											class="form-col w-[49%] inline-block align-top"
										>
											<div class="form-col-title">
												<spam>{{ $t('Cédula:') }}</spam>
											</div>
											<div
												class="form-col-content div-input w-full"
											>
												<input
													class="descripcion w-full"
													type="text"
													id="cedula"
													name="cedula"
													v-model="
														appComponent.session
															.cedula
													"
													:placeholder="$t('Cédula')"
													maxlength="100"
												/>
											</div>
										</div>
										<div
											class="form-col w-[49%] inline-block align-top mt-3"
										>
											<div
												class="form-col-title ng-binding"
											>
												<spam>{{
													$t('Celular:')
												}}</spam>
											</div>
											<div
												class="form-col-content div-input w-full"
											>
												<input
													class="descripcion w-full"
													type="text"
													id="celular"
													name="celular"
													v-model="
														appComponent.session
															.celular
													"
													:placeholder="$t('Celular')"
													maxlength="100"
												/>
											</div>
										</div>
										<div
											class="form-col w-[49%] inline-block align-top mt-3"
										>
											<div
												class="form-col-title ng-binding"
											>
												<spam>{{
													$t(
														'Fecha de Nacimiento:(aaaa-mm-dd)'
													)
												}}</spam>
												<span class="asterisc-form"
													>*</span
												>
											</div>
											<div
												class="form-col-content div-input w-full"
											>
												<input
													class="descripcion w-full"
													type="text"
													id="fecha_nacim"
													name="fecha_nacim"
													v-model="
														appComponent.session
															.fecha_nacim
													"
													:placeholder="
														$t(
															'Fecha de Nacimiento:(aaaa-mm-dd)'
														)
													"
													maxlength="10"
												/>
											</div>
										</div>
									</div>
									<div>
										<input
											name="sendWallet"
											id="sendWallet"
											class="submit action-button btn btn-primary w-full text-neutral mt-3"
											@click="sendWallet()"
											:value="$t('Confirmar')"
										/>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scope>
/* Loader style for Angular state */
.angular-state-loader {
	background: white;
}
/* Header logo style */
img#header-logo {
	width: auto !important;
	max-height: 86px !important;
}
/* App header style */
app-header {
	background: white !important;
}
/* Background color for social media section */
#redes {
	background-color: rgb(247 247 247);
}
/* Home background color */
app-home {
	background: #277b3f;
}
/* Menu item background color */
.menu div > li:nth-child(1) {
	background: #32994e;
}
/* Background color for menu */
.menu-bg {
	background: #3f3f3f;
}
/* Menu item hover effect */
.menu .menu-list div div > li:first-child:nth-last-child(8),
.menu .menu-list div div > li:first-child:nth-last-child(8) ~ li {
	background: #363636;
}
/* Gradient background for menu */
.menu {
	background: linear-gradient(
		90deg,
		rgba(180, 133, 0, 0) 0,
		rgba(180, 133, 0, 0) 35px,
		#32994e 40px,
		#32994e 11%,
		#32994e 25%,
		#11431f 45%,
		#11431f 50%,
		#11431f 55%,
		#32994e 75%,
		#32994e 89%,
		#32994e calc(100% - 55px),
		rgba(180, 133, 0, 0) calc(100% - 50px),
		rgba(180, 133, 0, 0)
	);
}
/* Menu login item padding */
body.nologueado .menu-list.version1 li.menu-login:last-child {
	padding-right: 40px;
	padding-left: 33px !important;
}
/* Margin and border for router outlet */
router-outlet + * {
	margin-top: 0 !important;
	border-top: 1px solid #575757 !important;
}
/* Mobile menu background */
app-menu-mobile {
	background: white;
}
/* Sign in button style */
.HeaderMenu .SignInBTN {
	background: #d50000 !important;
}
/* Main menu button style */
.HeaderMenu .MainMenuBTN {
	color: white;
	background: #fafafa !important;
	border-right: none !important;
	padding: 1em 0.8rem;
}
/* Button text style */
.MainMenuBTN .ButtonText {
	background: #277b3f;
	height: 2px;
}
/* Button text before pseudo-element */
.MainMenuBTN .ButtonText:before {
	width: 100%;
}
/* Button text before and after pseudo-elements */
.MainMenuBTN .ButtonText:before,
.MainMenuBTN .ButtonText:after {
	height: 3px;
	background: #277b3f;
}
/* Light footer background */
.page-footer.light {
	background-color: white !important;
}
/* Login button style */
button#btnLogin {
	background: #64b163 !important;
}
/* Sign up link style */
a.Button.AccountButton.SignUpLink {
	border: 1px solid #64b163;
	color: #64b163;
	background: white !important;
}
/* Dialog content style */
div#logindialog .dialog__content {
	border: transparent;
}
/* Show password button style */
.FormItem-Password .ShowLoginPassBTN {
	background-color: #e31d1a;
}
/* Menu item hover effect */
.menu .menu-list li:hover,
.menu div > li:nth-last-child(1) > a:hover {
	background: #2c8c47 !important;
}
/* Copyright footer style */
.copyright-footer {
	color: #5d5d5d;
	margin: 0 auto;
}
/* Footer display style */
.footer {
	display: block;
}
/* Footer right display style */
.footer-right {
	display: inline-block;
}
/* Header saldo background */
.header-saldo {
	background: #00833c;
}
/* Message action link color */
a#accion_mensajes {
	color: #00833c;
}
/* Logged in menu item style */
body.logueado .menu div > li:nth-last-child(1) > a {
	background: #32994e;
	padding-left: 10px !important;
}
/* Last menu item padding */
.menu div > li:nth-last-child(1) {
	padding-left: 0 !important;
}
/* Additional saldo color */
.mas-saldos {
	color: #ffffff;
}
/* Header saldo hover effect */
.header-saldo:hover {
	background: #006b31 !important;
}
/* Info page background */
.Framework.InfoPage,
#promocion-wrapper {
	background: #216b36;
}
/* Info box content color */
.InfoBoxContent {
	color: white;
}
/* Active terms list item style */
.TermsList .MenuList li.Active {
	background: #c02828;
	color: white;
	border: 2px solid #c02828;
}
/* Hover effect for terms list items */
.TermsList .MenuList li:hover {
	background: #c02828;
	color: white;
}
/* Hover effect for terms list item links */
.TermsList .MenuList li:hover a {
	color: white;
}
/* Action button style */
.msform .action-button {
	background: #00b151;
}
/* Home slider circle border */
.home-slider.version1 > div .container a .circle {
	border: 1px solid #2ea751;
}
/* Wallet selection background and padding */
div#wallet_select {
	background: white;
	border-radius: 10px;
	padding: 10px 25px 35px;
}
/* Wallet button style */
button.wallet-b {
	border: 1px solid #00b151;
	color: #636363;
	width: calc(100% - 30px);
	padding: 15px 30px;
	margin: 0 15px;
	min-width: 141px;
	text-align: center;
	border-radius: 10px;
}
/* Wallet button image style */
button.wallet-b img {
	width: 90%;
	padding-bottom: 10px;
}
/* Wallet button hover and focus effect */
button.wallet-b:hover,
button.wallet-b:focus {
	border: 2px solid #00b151;
	outline: none;
	box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
}
/* Quisk form fieldset style */
fieldset.form_quisk {
	background: transparent;
	width: 100%;
	box-shadow: none;
}
/* Quisk form row padding */
fieldset.form_quisk .form-row > div {
	padding: 0 5px;
}
/* Wallet configuration title style */
body.wallet .config_title {
	background: #006b31;
	width: calc(100% + 30px);
	display: block;
	padding: 8px 0;
	position: relative;
	top: -20px;
	left: -15px;
	border-radius: 5px 5px 0 0;
	font-weight: bold;
}
/* Wallet configuration title image style */
body.wallet .config_title img {
	width: 14px;
	margin-left: 15px;
}
/* Wallet view style */
body.wallet .view {
	border-top: 0;
	margin-top: 0;
	padding-top: 30px;
}
/* Active page title style */
body.wallet .ActivePageTitle span.tittle {
	display: inline-block;
}
.header_wallet .exit {
	width: 90px;
}
#wallet_config .form-1 {
	text-align: center;
	padding: 20px 15px;
	background: #ffffff;
	border-radius: 5px;
}
#wallet_config .form-1 .f1 {
	width: 30%;
	display: inline-block;
	padding: 15px;
	border-right: 1px solid #6b6b6b;
}
#wallet_config .form-1 .f2 {
	width: 69%;
	display: inline-block;
	vertical-align: top;
	padding: 15px;
	color: #6b6b6b;
}
.wallet_alert {
	height: 100%;
	width: 100%;
	background-color: #2c8c47;
	position: absolute;
	z-index: 1000;
	top: 0;
}
.wallet_alert > div {
	padding: 50px;
	font-size: 100%;
	text-align: center;
}
.wallet_alert a > button {
	background: #64b163 !important;
	z-index: 1;
	padding: 1.286em 2.429em;
	border: 1px solid transparent;
	text-align: center;
	margin: 0;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
}
.wallet_alert a:hover > button {
	background: white !important;
}
.wallet_alert i.wallet {
	float: none;
	padding-right: 5px;
}
.saldo.wallet {
	width: 150px !important;
}
.wallet_selected {
	position: absolute;
	height: 23px;
	width: auto;
	margin-left: 7px;
	margin-top: 3px;
}
body.wallet div#main {
	background: #2c8c47 !important;
	height: 100vh;
	padding-top: 0;
}
.header_wallet {
	background: white;
	top: 0;
	height: 42px;
	margin-bottom: 10px;
	padding: 0 !important;
}
.header_wallet > div {
	max-width: 80%;
	margin: 0 auto;
}
body.wallet .ActivePageTitle .h1 {
	float: right;
}
/* Back step button style */
body.wallet div#backStep {
	display: inline-block;
	float: left;
	padding: 7px;
	cursor: pointer;
}
/* Back step button icon style */
body.wallet div#backStep i {
	padding-right: 10px;
}
/* Header logo style */
.header_wallet img#header-logo {
	width: auto;
	height: 46px;
	float: left;
}
/* Home wrapper background */
#home-wrapper {
	background: #277b3f;
}
/* Side menu background */
.SideMenu {
	background: #2c8c47;
}
/* Side menu item background */
.SideMenuList .SectionItem {
	background: white;
}
/* Side menu item link color */
.SideMenuList .SectionItem a {
	color: #2c8c47 !important;
}
/* Side menu title background */
.SideMenuTitle {
	background: #2c8c47;
}
/* Dropdown menu display style */
.saldo .dropdown-menu.show {
	display: block;
	position: absolute;
	top: 34px;
}
/* Header wallet background */
.header-wallet {
	background: #2c8c47 !important;
}
/* Header wallet display style */
.header-wallet {
	display: inline-block;
	border-radius: 25px;
	height: 29px;
	margin-top: 5px;
	padding-top: 0px;
	padding-left: 13px !important;
	padding-right: 12px !important;
	margin-right: 0px;
	line-height: 28px;
	text-transform: none;
	width: 100%;
	text-align: left;
}
/* Header wallet list style */
.header-wallet {
	list-style-type: none;
	padding-right: 10px;
}
/* Dropdown content item color */
.saldo .dropdown-content li > span,
.saldo .dropdown-content li > a {
	color: #5d5d5d;
}
/* Dropdown collection item background */
.saldo .collection .collection-item {
	background-color: white;
}
/* Dropdown collection item hover effect */
.saldo .collection .collection-item:hover {
	background-color: rgb(235 235 235);
}
/* Refresh icon color */
.fa-refresh {
	color: #00833c;
	font-size: 15px;
}
/* User balance link color */
a#saldo_usuario_principal {
	color: white;
}
/* Sign out icon color */
i.fa.fa-sign-out {
	color: white;
}
/* Dropdown content item color */
.dropdown-content li > span,
.dropdown-content li > a {
	color: white;
}
/* Logged in services display style */
body.logueado #dropdownservicios-mobile .consulta_tickets_online {
	display: block !important;
}
/* Side menu link hover effect */
.SideMenuList .SideLink:hover,
.SideMenuList .SideLink:active {
	background: #0e471e;
}
/* Register and contact background */
div#register-wrapper,
div#contacto-wrapper {
	background: #277b3f;
}
/* Progress bar active item style */
#progressbar li.active span {
	background: #fff !important;
	font-weight: 700 !important;
	color: #313131 !important;
	border-radius: 0 15px 15px 0;
}
/* Progress bar item style */
#progressbar li span {
	background: transparent;
	color: white;
}
/* Panel registration padding */
div#panelRegistro {
	padding: 0 10px;
}
/* Progress bar padding */
#progressbar {
	padding-top: 0;
}
/* Progress bar item height */
#progressbar li {
	height: 48px;
}
/* Progress bar item span style */
#progressbar li span {
	margin-left: 0;
}
/* Active page title registration style */
.ActivePageTitle .h1.registro {
	float: none;
}
/* Text step style */
div#text-paso {
	border-radius: 0 0 15px 15px;
	background: #484848;
	color: white;
	max-width: 100px;
	padding: 5px;
	margin: -10px auto;
}
/* Action button width */
.msform .action-button {
	width: 100%;
}
/* Panel registration padding */
div#panelRegistro {
	padding: 0;
}
/* Progress bar span display */
#progressbar span {
	display: block !important;
}
/* Progress bar item before display */
#progressbar li:before {
	display: none !important;
}
/* Progress bar width */
#progressbar {
	width: 70%;
}
/* Progress bar item width */
#progressbar li {
	width: calc(100% / 3 - 3px) !important;
}
/* Media query for mobile devices */
@media (max-width: 810px) {
	.progress-just li {
		width: calc(100% / 3 - 2.5px) !important;
		margin-right: 0 !important;
		padding-top: 0 !important;
		padding-bottom: 0 !important;
		height: 32px !important;
	}
	div#register-wrapper {
		padding: 0;
	}
	.ActivePageTitle {
		font-size: 9px;
		padding: 5px 0 0 15px;
		max-width: none !important;
		border-bottom: none;
		margin-bottom: 0;
		width: 100%;
	}
}
/* Media query for larger devices */
@media (min-width: 810px) {
	input.next.action-button,
	input.previous.action-button,
	input#guardar {
		width: calc(50% / 2 - 5px);
		display: inline-block;
		border-radius: 5px;
		max-height: 40px;
		vertical-align: bottom;
		margin: 10px;
	}
	div#text-paso {
		border-radius: 15px;
		margin: 4px auto;
		font-size: 11px;
	}
}
/* Media query for mobile devices */
@media (max-width: 810px) {
	#progressbar {
		width: 100%;
	}
	#wallet_config > div {
		max-width: 97%;
	}
	#wallet_config .ActivePageTitle {
		max-width: 95%;
	}
	#wallet_config .form-wrapper-step1,
	form#wallet_select {
		width: 96% !important;
		min-width: auto !important;
	}
	#wallet_select .form-row-1:last-child > div {
		width: 50% !important;
	}
	button.wallet-b {
		min-width: auto !important;
	}
	input#acept {
		margin: 0 auto !important;
		width: 100% !important;
	}
	input#refuse {
		margin: 0 auto !important;
		width: 100% !important;
		float: none !important;
	}
	#wallet_config .form-1 .f2 {
		width: 100%;
	}
	#wallet_config .form-1 .f1 {
		border-bottom: 1px solid #6b6b6b;
		border-right: none !important;
	}
	div#register-wrapper,
	div#contacto-wrapper {
		padding: 0;
	}
	span.dropdown-button.active {
		background: #2d6d3f;
		color: white;
	}
	header {
		background: white;
	}
	menumobile {
		background: white;
		z-index: 999 !important;
	}
}
fieldset.form_quisk {
	background: transparent;
	width: 100%;
	box-shadow: none;
}
fieldset.form_quisk .form-row > div {
	padding: 0 5px;
}
.form-wrapper-step1 {
	width: 30%;
	margin: 0 auto;
	min-width: 460px;
}
.form-row-1 {
	text-align: center;
}
#wallet_config .config_title {
	background: #006b31;
	width: calc(100% + 30px);
	display: block;
	padding: 8px 0;
	position: relative;
	top: -20px;
	left: -15px;
	border-radius: 5px 5px 0 0;
	font-weight: bold;
}
#wallet_config .config_title img {
	width: 14px;
	margin-left: 15px;
}
#wallet_config .view {
	border-top: 0;
	margin-top: 0;
	padding-top: 30px;
}
#wallet_config .ActivePageTitle span.tittle {
	display: inline-block;
}
#wallet_config .exit {
	background: #30b054;
	width: 90px;
}
#mainfooter {
	border-top: 1px solid #595959 !important;
	border-bottom: 1px solid #595959 !important;
	background: #363636 !important;
}
.version1.row.footer {
	margin-top: 0 !important;
}
#mainfooter a:hover {
	color: #2c8c47 !important;
}
@media (max-width: 810px) {
	#mainfooter {
		display: none;
	}
}
</style>

<!-- FILE DOCUMENTED -->

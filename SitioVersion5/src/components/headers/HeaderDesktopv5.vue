<script lang="ts">
import IconMenu from '../icons/IconMenu.vue'; // Importing the IconMenu component
import Logo from '../images/Logo.vue'; // Importing the Logo component
import ClockUser from '../ClockUser.vue'; // Importing the ClockUser component
import DetailsUser from '../DetailsUser.vue'; // Importing the DetailsUser component
import BalanceUser from '../BalanceUser.vue'; // Importing the BalanceUser component
import MenuDesktopv2 from '../menus/MenuDesktopv2.vue'; // Importing the MenuDesktopv2 component
import MenuDesktopv3 from '../menus/MenuDesktopv3.vue'; // Importing the MenuDesktopv3 component
import MenuDesktopv4 from '../menus/MenuDesktopv4.vue'; // Importing the MenuDesktopv4 component
import MenuDesktopv5 from '../menus/MenuDesktopv5.vue'; // Importing the MenuDesktopv5 component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import router from '@/router'; // Importing the router for navigation

export default defineComponent({
	components: {
		IconMenu,
		Logo,
		ClockUser,
		DetailsUser,
		BalanceUser,
		MenuDesktopv2,
		MenuDesktopv4,
		MenuDesktopv5,
		MenuDesktopv3,
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let refreshBalance = this.$refreshBalance; // Accessing the refresh balance method
		return {
			config,
			appComponent,
			refreshBalance,
		};
	},
	directives: {
		formatNumber(el, binding) {
			el.textContent = binding.value.toFixed(2); // Formatting number to two decimal places
		},
	},
	methods: {
		clickBox(box: any) {
			window.open(box.url, '_top'); // Opening the box URL in the top window
		},
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
					vthis.appComponent.tokenSB = ''; // Clearing the token
					vthis.appComponent.session = {
						// Resetting the session object
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
					apiService.setAuthToken(''); // Clearing the authentication token
					window.localStorage.removeItem('auth_token'); // Removing auth token from local storage
					vthis.appComponent.tokenUser = ''; // Clearing the user token
				}
			});
			this.appComponent.tokenSB = ''; // Clearing the token again
			this.appComponent.session = {
				// Resetting the session object again
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
			apiService.setAuthToken(''); // Clearing the authentication token again
			try {
				(window as any).altenarWSDK.set({ token: '' }); // Setting the Altenar SDK token
			} catch (e) {}
			this.appComponent.tokenUser = ''; // Clearing the user token again
			window.localStorage.removeItem('auth_token'); // Removing auth token from local storage again
			this.appComponent.loadView = false; // Setting loadView to false
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirecting to home if version is 2
			}
			router.push('/'); // Navigating to home route
			setTimeout(() => {
				this.appComponent.loadView = true; // Setting loadView to true after timeout
			}, 1000);
		},
	},
});
</script>
<template>
	<!-- Main container for the header and ticker -->
	<div
		v-if="
			(config.header_ != undefined && config.header_.top_band != undefined
				? config.header_.top_band
				: config.header.showTicker) &&
			appComponent.boxes.length > 0 &&
			appComponent.session.logueado
		"
		class="ticker-mobile items-baseline md:hidden text-neutral text-start md:text-end"
	>
		<!-- Viewport for the ticker items -->
		<div class="viewport" v-bind:class="{ moving: appComponent.moving }">
			<!-- Box for each ticker item -->
			<div class="box" v-for="box in appComponent.boxes">
				<span @click="clickBox(box)" v-html="box.title"></span>
				<!-- Clickable box title -->
			</div>
		</div>
	</div>
	<!-- Header container -->
	<div id="header" class="h-auto max-h-[5rem] sticky top-0">
		<div>
			<!-- User session check -->
			<div v-if="appComponent.session.logueado" class="px-1">
				<!-- Card displaying user balance -->
				<div class="ml-auto card w-96 overflow-visible text-neutral">
					<div class="flex flex-wrap p-0 justify-end">
						<!-- Dropdown for balance if wallet is enabled -->
						<div
							title="Saldo"
							id="saldo"
							class="dropdown dropdown-end dropdown-hover rounded-2xl btn btn-primary btn-sm hidden md:block"
							@click="appComponent.checkBalanceQuisk()"
							v-if="appComponent.session.wallet == '1'"
						>
							<div
								tabindex="0"
								class="normal-case text-left"
								id="saldo_usuario_principal"
							>
								<span
									class="font-light inline-block text-left text-[12px]"
									>{{ $t('Actualizar Saldo') }}</span
								>
								<i
									class="mas-saldos fa fa-chevron-down text-neutral"
									aria-hidden="true"
								></i>
							</div>
						</div>
						<!-- Wallet selection if multiple wallets are available -->
						<div
							class="saldo wallet"
							@click="appComponent.selectWallet()"
							v-if="
								appComponent.typeUser == 'U' &&
								config.wallets != undefined &&
								config.wallets.length > 1
							"
						>
							<a
								id="saldo_usuario_principal"
								class="header-wallet btn btn-primary btn-sm rounded-2xl waves-effect text-neutral"
								><span
									class="font-light inline-block text-left text-[12px] capitalize mr-2"
									>{{ $t('Cambiar billetera') }}</span
								>
								<img
									class="wallet_selected w-7"
									v-if="appComponent.session.wallet === '0'"
									:src="config.wallets[0].img" />
								<img
									class="wallet_selected w-7"
									v-if="appComponent.session.wallet === '1'"
									:src="config.wallets[1].img"
							/></a>
						</div>
					</div>
					<!-- Button to update SPLAFT form if applicable -->
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
		</div>
		<!-- Conditional rendering of menu components based on configuration -->
		<MenuDesktopv3 v-if="config.header.menuVersion == 2" />
		<MenuDesktopv4 v-else-if="config.header.menuVersion == 4" />
		<MenuDesktopv5 v-else-if="config.header.menuVersion == 5" />
		<MenuDesktopv2 v-else />
	</div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

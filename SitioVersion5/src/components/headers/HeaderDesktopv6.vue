<script lang="ts">
import IconMenu from '../icons/IconMenu.vue'; // Importing IconMenu component
import Logo from '../images/Logo.vue'; // Importing Logo component
import ClockUser from '../ClockUser.vue'; // Importing ClockUser component
import DetailsUser from '../DetailsUser.vue'; // Importing DetailsUser component
import BalanceUser from '../BalanceUser.vue'; // Importing BalanceUser component
import MenuDesktopv2 from '../menus/MenuDesktopv2.vue'; // Importing MenuDesktopv2 component
import MenuDesktopv3 from '../menus/MenuDesktopv3.vue'; // Importing MenuDesktopv3 component
import MenuDesktopv4 from '../menus/MenuDesktopv4.vue'; // Importing MenuDesktopv4 component
import MenuDesktopv6 from '../menus/MenuDesktopv7.vue'; // Importing MenuDesktopv6 component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '@/services/ApiService'; // Importing apiService for API calls
import router from '@/router'; // Importing router for navigation
import MenuDesktopv8 from '../menus/MenuDesktopv8.vue';

export default defineComponent({
	components: {
		IconMenu,
		Logo,
		ClockUser,
		DetailsUser,
		BalanceUser,
		MenuDesktopv2,
		MenuDesktopv4,
		MenuDesktopv6,
		MenuDesktopv3,
		MenuDesktopv8
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing app component
		let refreshBalance = this.$refreshBalance; // Accessing refresh balance method
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
			window.open(box.url, '_top'); // Opening the URL in the top window
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
					apiService.setAuthToken(''); // Clearing authentication token
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
			apiService.setAuthToken(''); // Clearing authentication token
			try {
				(window as any).altenarWSDK.set({ token: '' }); // Resetting Altenar SDK token
			} catch (e) {}
			this.appComponent.tokenUser = ''; // Clearing user token
			window.localStorage.removeItem('auth_token'); // Removing auth token from local storage
			this.appComponent.loadView = false; // Disabling view loading
			if (this.appComponent.config.versionAltenar == '2') {
				window.location.href = '/'; // Redirecting to home if version is 2
			}
			router.push('/'); // Navigating to home route
			setTimeout(() => {
				this.appComponent.loadView = true; // Re-enabling view loading after timeout
			}, 1000);
		},
	},
});
</script>
<template>
	<div class="flex flex-col fixed z-[99] w-full">
		<!-- Main container for the header -->
		<div
			v-if="
				(config.header_ != undefined &&
				config.header_.top_band != undefined
					? config.header_.top_band
					: config.header.showTicker) &&
				appComponent.boxes.length > 0 &&
				appComponent.session.logueado
			"
			class="ticker-mobile items-baseline text-start text-info-text md:text-end flex justify-start md:justify-center bg-base-300"
		>
			<!-- Viewport for ticker content -->
			<div class="viewport" :class="{ moving: appComponent.moving }">
				<div
					class="box md:flex justify-start md:justify-end"
					v-for="box in appComponent.boxes"
					:key="box.title"
				>
					<span @click="clickBox(box)" v-html="box.title"></span>
					<!-- Clickable box title -->
				</div>
			</div>
		</div>
		<!-- Header container -->
		<div id="header" class="relative h-auto bg-base-300">
			<div>
				<!-- Conditional rendering for logged-in users -->
				<div v-if="appComponent.session.logueado" class="px-1">
					<!-- Card for user balance display -->
					<div
						class="ml-auto card w-96 overflow-visible text-neutral"
					>
						<div class="flex flex-wrap p-0 justify-end">
							<!-- Flex container for balance options -->
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
									<!-- Balance update text -->
									<i
										class="mas-saldos fa fa-chevron-down text-neutral"
										aria-hidden="true"
									></i>
									<!-- Dropdown icon -->
								</div>
							</div>
							<!-- Wallet selection for users with multiple wallets -->
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
									<!-- Change wallet text -->
									<img
										class="wallet_selected w-7"
										v-if="
											appComponent.session.wallet === '0'
										"
										:src="config.wallets[0].img" />
									<!-- Display selected wallet image -->
									<img
										class="wallet_selected w-7"
										v-if="
											appComponent.session.wallet === '1'
										"
										:src="config.wallets[1].img"
								/></a>
							</div>
						</div>
						<!-- Conditional rendering for SPLAFT form update -->
						<div
							style="text-align: center"
							v-if="appComponent.session.formSplaft == 'S'"
						>
							<label
								@click="appComponent.modal.showModal = 'splaft'"
								class="btn btn-xs"
								>{{ $t('Actualizar Formulario SPLAFT') }}</label
							>
							<!-- Button to update SPLAFT form -->
						</div>
					</div>
				</div>
			</div>
			<MenuDesktopv3 v-if="config.header.menuVersion == 2" />
			<!-- Conditional rendering of menu version 3 -->
			<MenuDesktopv4 v-else-if="config.header.menuVersion == 4" />
			<!-- Conditional rendering of menu version 4 -->
			<MenuDesktopv6 v-else-if="config.header.menuVersion == 6" />
			<!-- Conditional rendering of menu version 6 -->
			<MenuDesktopv8 v-else-if="config.header_ !== undefined && config.header_.menuVersion !== undefined
			? config.header_.menuVersion == 8 
			:config.header !== undefined && config.header.menuVersion !== undefined 
			? config.header.menuVersion == 8 
			: false" />
			<!-- Conditional rendering of menu version 6 -->
			<MenuDesktopv2 v-else />
			<!-- Default menu rendering -->
		</div>
	</div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

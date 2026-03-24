<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import router from '@/router'; // Importing router for navigation
import apiService from '@/services/ApiService'; // Importing API service for making requests

// Focus directive to set focus on an element when mounted
const focus = {
	mounted: (event) => {
		event.focus(); // Focus on the event target
	},
};

export default defineComponent({
	components: { MenuUser, MenuUser3 }, // Registering components
	data() {
		// Defining reactive data properties
		let config = this.$config(); // Configuration object
		let emitter = this.$emitter(); // Event emitter
		let appComponent: any = this.$appComponent; // Application component reference
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let credit_cards: any = []; // Array to hold credit card information
		let cardAdd: any = {
			// Object to hold new card details
			num_tarjeta: '',
			expiry_month: '',
			expiry_year: '',
			cvc: '',
			currency: '',
		};
		let flag: boolean = true; // Flag for some condition
		let buttonEnabled: boolean = false; // Button enabled state
		let mobile: any; // Mobile state
		let requireValidation: boolean = false; // Validation requirement flag
		let idCard: number = 0; // ID of the selected card
		let debitedValue: string = ''; // Value debited from the card
		let debitedValue1: string = ''; // First part of the debited value
		let debitedValue2: string = ''; // Second part of the debited value
		let debitedValue3: string = ''; // Third part of the debited value
		let showModalAddCard: boolean = false; // Modal visibility for adding a card
		let itemSelected: any = {}; // Selected item for operations
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			credit_cards,
			cardAdd,
			flag,
			buttonEnabled,
			mobile,
			requireValidation,
			idCard,
			debitedValue,
			debitedValue1,
			debitedValue2,
			debitedValue3,
			showModalAddCard,
			itemSelected,
		};
	},
	unmounted() {
		// Cleanup when component is unmounted
		this.emitter.all.delete('accept:modal'); // Remove event listener
	},
	mounted() {
		// Lifecycle hook when component is mounted
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Accept modal event
		});
		if (this.appComponent.session.wallet == '1') {
			router.push('/home'); // Redirect to home if wallet is active
		}
		this.getCreditCards(); // Fetch credit cards on mount
	},
	methods: {
		// Method to accept modal actions
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'delete_credit_card') {
				const params = {
					id: this.itemSelected.id, // ID of the selected card to delete
				};
				apiService
					.request('delete_credit_card', params) // API request to delete card
					.then((response) => {
						if (response.code == 0) {
							// Successful deletion response
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Satisfactorio!'), // Success title
								messageModal: this.$t(
									'Tarjeta de crédito eliminada satisfactoriamente.' // Success message
								),
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Close modal order
							};
							this.getCreditCards(); // Refresh credit cards list
							this.cardAdd = {
								// Reset cardAdd object
								num_tarjeta: '',
								expiry_month: '',
								expiry_year: '',
								cvc: '',
								currency: '',
							};
							this.itemSelected = {}; // Clear selected item
						} else {
							// Handle error response
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Error message based on error code
								);
							}
							if (
								error_mensaje == '' &&
								response.data != undefined
							) {
								error_mensaje = this.$t(response.data); // Fallback error message
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Transacción fallida!'), // Failure title
								messageModal: error_mensaje, // Failure message
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Close modal order
							};
						}
					});
			}
			this.appComponent.closeModal(); // Close modal after action
		},
		// Method to fetch credit cards
		getCreditCards() {
			apiService.request('get_credit_cards', {}).then((response: any) => {
				if (response.code == 0) {
					this.credit_cards = response.data.cards; // Update credit cards list
				}
			});
		},
		// Method to add a new card
		addCard() {
			console.log(this.cardAdd.num_tarjeta); // Log card number
			console.log(this.cardAdd.expiry_month); // Log expiry month
			console.log(this.cardAdd.expiry_year); // Log expiry year
			console.log(this.cardAdd.cvc); // Log CVC
			console.log(this.cardAdd.currency); // Log currency
			if (
				this.cardAdd.num_tarjeta == '' ||
				this.cardAdd.num_tarjeta == null ||
				this.cardAdd.num_tarjeta == undefined ||
				this.cardAdd.expiry_month == '' ||
				this.cardAdd.expiry_month == null ||
				this.cardAdd.expiry_month == undefined ||
				this.cardAdd.expiry_year == '' ||
				this.cardAdd.expiry_year == null ||
				this.cardAdd.expiry_year == undefined ||
				this.cardAdd.cvc == '' ||
				this.cardAdd.cvc == null ||
				this.cardAdd.cvc == undefined ||
				this.cardAdd.currency == '' ||
				this.cardAdd.currency == null ||
				this.cardAdd.currency == undefined
			) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'), // Error title
					messageModal: this.$t('Ingresa todos los campos.'), // Error message
					buttonModal: this.$t('Aceptar'), // Button text
					orderModal: 'closeModal', // Close modal order
				};
				return false; // Exit if validation fails
			}
			this.addCardFunction(); // Proceed to add card function
		},
		// Method to validate card details
		validCard() {
			if (
				this.debitedValue1 !== '' &&
				this.debitedValue1 !== null &&
				this.debitedValue1 !== undefined &&
				this.debitedValue2 !== '' &&
				this.debitedValue2 !== null &&
				this.debitedValue2 !== undefined &&
				this.debitedValue3 !== '' &&
				this.debitedValue3 !== null &&
				this.debitedValue3 !== undefined
			) {
				this.debitedValue =
					this.debitedValue1.toString() +
					'.' +
					this.debitedValue2.toString() +
					this.debitedValue3.toString(); // Construct debited value
				apiService
					.request('valid_credit_card', {
						debitedValue: this.debitedValue,
						id: this.idCard, // ID of the card to validate
					})
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Satisfactorio!'), // Success title
								messageModal: this.$t(
									'Tarjeta de crédito agregada satisfactoriamente.' // Success message
								),
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Close modal order
							};
							this.showModalAddCard = false; // Hide add card modal
							this.getCreditCards(); // Refresh credit cards list
							this.cardAdd = {
								// Reset cardAdd object
								num_tarjeta: '',
								expiry_month: '',
								expiry_year: '',
								cvc: '',
								currency: '',
							};
							this.debitedValue = ''; // Clear debited value
						} else {
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Transacción fallida!'), // Failure title
								messageModal: error_mensaje, // Failure message
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'closeModal', // Close modal order
							};
						}
					});
			}
		},
		// Function to handle card addition
		addCardFunction() {
			this.buttonEnabled = true; // Enable button
			const params = {
				num_tarjeta: this.cardAdd.num_tarjeta.replace(/ /g, ''), // Clean card number
				expiry_month: this.cardAdd.expiry_month, // Expiry month
				expiry_year: this.cardAdd.expiry_year, // Expiry year
				cvc: this.cardAdd.cvc, // CVC
				currency: this.cardAdd.currency, // Currency
			};
			apiService
				.request('register_credit_card', params) // API request to register card
				.then((response: any) => {
					if (response.code == 0) {
						if (response.data.id !== null) {
							this.requireValidation = true; // Set validation requirement
							this.idCard = response.data.id; // Store card ID
							this.buttonEnabled = false; // Disable button
							this.getCreditCards(); // Refresh credit cards list
							return false; // Exit if validation is required
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Satisfactorio!'), // Success title
							messageModal: this.$t(
								'Tarjeta de crédito agregada satisfactoriamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Close modal order
						};
						this.buttonEnabled = false; // Disable button
						this.showModalAddCard = false; // Hide add card modal
						this.getCreditCards(); // Refresh credit cards list
						this.cardAdd = {
							// Reset cardAdd object
							num_tarjeta: '',
							expiry_month: '',
							expiry_year: '',
							cvc: '',
							currency: '',
						};
						this.buttonEnabled = false; // Disable button
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Transacción fallida!'), // Failure title
							messageModal: error_mensaje, // Failure message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Close modal order
						};
					}
				});
		},
		// Method to show the add card modal
		addCardNew() {
			this.showModalAddCard = true; // Show add card modal
		},
		// Method to delete a card
		deleteCard(item) {
			this.itemSelected = item; // Set selected item for deletion
			this.appComponent.modal = {
				showModal: 'notification',
				titleModal: this.$t('Eliminar la tarjeta de crédito'), // Deletion title
				messageModal: this.$t(
					'¿Esta seguro que desea eliminar la tarjeta de crédito?' // Deletion confirmation message
				),
				buttonModal: this.$t('Aceptar'), // Button text
				orderModal: 'delete_credit_card', // Delete card order
			};
		},
		// Method to format card number input
		cc_format_num_tarjeta(value: any) {
			value = value.target.value.toString(); // Convert input to string
			if (value.length > 19) {
				this.cardAdd.num_tarjeta = null; // Reset if too long
			} else {
				this.cardAdd.num_tarjeta = value; // Set formatted value
			}
		},
		// Method to format expiry month input
		cc_format_expiry_month(value: any) {
			value = value.target.value.toString(); // Convert input to string
			if (value.length > 2 || parseInt(value) > 12) {
				this.cardAdd.expiry_month = null; // Reset if invalid
			} else {
				this.cardAdd.expiry_month = value; // Set formatted value
			}
		},
		// Method to format expiry year input
		cc_format_expiry_year(value: any) {
			value = value.target.value.toString(); // Convert input to string
			if (value.length > 2) {
				this.cardAdd.expiry_year = null; // Reset if too long
			} else {
				this.cardAdd.expiry_year = value; // Set formatted value
			}
		},
		// Method to format CVC input
		cc_format_cvc(value: any) {
			value = value.target.value.toString(); // Convert input to string
			if (value.length > 3) {
				this.cardAdd.cvv = null; // Reset if too long
			} else {
				this.cardAdd.cvv = value; // Set formatted value
			}
		},
		// Method to allow only integer input
		onlyInteger(e) {
			var keynum = e.which; // Get key code
			if (keynum >= 48 && keynum <= 57 && keynum >= 96 && keynum <= 105) {
				return true; // Allow number keys
			} else {
				return /\d/.test(String.fromCharCode(keynum)); // Allow numeric input
			}
		},
		// Method to activate a card
		activateCard(item) {
			this.idCard = item.id; // Set ID of the card to activate
			this.requireValidation = true; // Set validation requirement
			this.cardAdd = {
				// Populate cardAdd with selected card details
				num_tarjeta: item.cuenta,
				expiry_month: '',
				expiry_year: '',
				cvc: '',
				currency: '',
			};
			this.showModalAddCard = true; // Show add card modal
		},
	},
});
</script>
<template>
	<!-- Header for the layout -->
	<div
		v-if="config.layout != 3"
		class="int-header h-[65px] bg-base-200 absolute w-full"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main container for the account information page -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title of the active page -->
				<div class="Container ActivePageTitle">
					<span class="h1">
						<span class="text-neutral font-bold text-3xl">{{
							$t('Depósitos')
						}}</span>
					</span>
				</div>
				<!-- Menu and content area -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'tarjetas-credito'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'tarjetas-credito'"
						:MENU_ID="'3'"
					/>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div class="Container InfoContent shadow-md">
							<!-- Form for withdrawing amount -->
							<div
								id="formWithdrawAmount"
								class="GeneralForm WithdrawForm WithdrawAmount bg-base-400 text-neutral p-5 rounded-xl"
								novalidate="novalidate"
							>
								<div class="col col-md-2 w-full inline-block">
									<div class="add-card-c float-right">
										<!-- Button to add a new card -->
										<button
											@click="
												addCardNew();
												appComponent.gAnalytics(
													'credit_card'
												);
											"
											class="add-card btn w-30 text-neutral bg-success"
											data-use="preload"
										>
											<span
												class="ButtonText ng-binding ng-scope"
												>{{
													$t('Añadir una Tarjeta')
												}}</span
											>
										</button>
									</div>
									<li
										class="FormItem fldCurrency"
										id="fldCurrency"
									>
										<label class="FormLabel">{{
											$t(
												'Nota: Todas las Tarjetas deben estar registradas para recargar su cuenta Justbet/Acropolis. Agregue su tarjeta de débito/crédito y comience el proceso de registro.'
											)
										}}</label>
									</li>
								</div>
								<ul class="AmountFields">
									<!-- Loop through credit cards -->
									<div
										class="card-c"
										v-for="item in credit_cards"
									>
										<div
											class="card_ w-full rounded-box mb-3 rounded-box"
											:class="{
												'collapse collapse-plus collapse-open':
													mobile,
											}"
										>
											<input
												type="checkbox"
												class="md:hidden"
											/>
											<div
												class="collapse-title text-xl font-medium"
											>
												<div
													class="row metodos-pago grid grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6"
												>
													<div>
														<img
															style="
																width: auto;
																height: auto;
																max-height: 55px;
															"
															:src="item.imagen"
														/>
													</div>
													<div
														class="col-span-3 lg:col-span-2"
													>
														<div
															class="hidden md:block"
														>
															<label
																class="FormLabel inline-block pr-2"
																style="
																	font-size: 12px;
																	color: gray;
																"
																>{{
																	$t(
																		'Número de la Tarjeta'
																	)
																}}</label
															>
														</div>
														<label
															class="FormLabel div-inline-block font-bold"
															>{{
																item.cuenta
															}}</label
														>
													</div>
													<div
														class="col-span-3 lg:col-span-1"
													>
														<div
															class="hidden md:block"
														>
															<label
																class="FormLabel inline-block pr-2"
																style="
																	font-size: 12px;
																	color: gray;
																"
																>{{
																	$t('Estado')
																}}</label
															>
														</div>
														<label
															class="FormLabel div-inline-block"
															v-if="
																item.state ==
																'A'
															"
															>{{
																$t('Activa')
															}}</label
														>
														<label
															class="FormLabel div-inline-block"
															v-if="
																item.state ==
																'I'
															"
															>{{
																$t('Inactiva')
															}}</label
														>
														<label
															class="FormLabel div-inline-block"
															v-if="
																item.state ==
																'P'
															"
															>{{
																$t('Pendiente')
															}}</label
														>
													</div>
													<div
														style=""
														class="col-span-1 hidden md:block"
														v-if="item.state == 'P'"
													>
														<div class="add-card-c">
															<!-- Button to activate pending card -->
															<button
																@click="
																	activateCard(
																		item
																	)
																"
																class="btn add-card w-full text-neutral bg-success"
																data-use="preload"
															>
																<span
																	class="ButtonText ng-binding ng-scope"
																	>{{
																		$t(
																			'Verificar'
																		)
																	}}</span
																>
															</button>
														</div>
													</div>
													<div
														style=""
														class="col-span-1 hidden md:block"
													>
														<div class="add-card-c">
															<!-- Button to delete card -->
															<button
																@click="
																	deleteCard(
																		item
																	)
																"
																class="btn add-card w-full text-neutral bg-success"
																data-use="preload"
															>
																<span
																	class="ButtonText ng-binding ng-scope"
																	>{{
																		$t(
																			'Eliminar'
																		)
																	}}</span
																>
															</button>
														</div>
													</div>
												</div>
											</div>
											<div class="collapse-content">
												<div
													class="col col-md-2 w-1/2 inline-block"
												>
													<div
														style=""
														class="col-span-1 p-1"
														v-if="item.state == 'P'"
													>
														<div class="add-card-c">
															<!-- Button to activate pending card -->
															<button
																@click="
																	activateCard(
																		item
																	)
																"
																class="btn add-card w-full text-neutral bg-success"
																data-use="preload"
															>
																<span
																	class="ButtonText ng-binding ng-scope"
																	>{{
																		$t(
																			'Verificar'
																		)
																	}}</span
																>
															</button>
														</div>
													</div>
												</div>
												<div
													class="col col-md-2 w-1/2 inline-block"
												>
													<div
														style=""
														class="col-span-1 p-1"
													>
														<div class="add-card-c">
															<!-- Button to delete card -->
															<button
																@click="
																	deleteCard(
																		item
																	)
																"
																class="btn add-card w-full text-neutral bg-success"
																data-use="preload"
															>
																<span
																	class="ButtonText ng-binding ng-scope"
																	>{{
																		$t(
																			'Eliminar'
																		)
																	}}</span
																>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<li
										style="
											margin-bottom: 10px;
											margin-top: 10px;
											border-top: 1px solid #9e99ac;
											padding-top: 5px;
										"
										class="FormItem fldAmount"
										id="fldAmount"
										v-if="credit_cards.length == 0"
									>
										<div class="row">
											<div
												style="
													width: 100%;
													display: inline-block;
													vertical-align: top;
												"
												class="col col-md-12"
											>
												<label
													class="FormLabel div-inline-block float-right"
													style="
														width: 100%;
														font-size: 12px;
														color: gray;
														text-align: center;
													"
												>
													{{
														$t(
															'Sin tarjetas de crédito agregadas' // Message when no cards are added
														)
													}}
												</label>
											</div>
										</div>
									</li>
									<li
										style="
											margin-bottom: 10px;
											margin-top: 10px;
											border-top: 1px solid #9e99ac;
											padding-top: 5px;
										"
										v-if="
											config.creditCards != undefined &&
											config.creditCards.showInfo
										"
										class="FormItem fldAmount"
										id="fldAmount"
									>
										<div class="row">
											<div
												style="
													width: 100%;
													display: inline-block;
													vertical-align: top;
												"
												class="col col-md-12"
											>
												<label
													class="FormLabel div-inline-block float-right"
													style="
														width: 100%;
														font-size: 12px;
														color: gray;
														text-align: justify;
													"
												>
													<h2>
														JustBet Card
														Registration
														Instructions
													</h2>
													<p>
														1. Login into your Just
														bet account.
													</p>
													<p>
														2. Go to managing, then
														select the “Deposit” or
														“Manage Cards” tab.
													</p>
													<p>
														3. Click “Add Card” and
														input the credit/debit
														card information.
													</p>
													<p>
														4. Once card is added,
														follow the instructions
														that pop up.
													</p>
													<p>
														5. To confirm
														registration: Contact
														your financial
														institution to confirm
														amount that was
														automatically charged to
														your account. Once
														confirmed, your
														financial institution
														will remove charges.
													</p>
													<p>
														6. After receiving
														confirmation from
														financial institution,
														please input the amount
														charged to your account
														in pop up.
													</p>
													<p>
														7. Once the amount is
														correct, the card
														registration should be
														successful.
													</p>
													<p>
														8. Card Registration is
														complete.
													</p>
												</label>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal for adding a new card -->
	<div
		v-if="showModalAddCard"
		class="modal text-neutral items-center bg-neutral-content bg-opacity-75"
		id="add-card"
	>
		<div class="modal-box rounded-2xl bg-base-100">
			<div
				class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8 bg-base-100 p-5 rounded-2xl"
			>
				<div class="Container InfoContent row">
					<div class="tittle-c">
						<label class="inline-block">
							<h2 class="font-bold">
								{{ $t('Añadir nueva tarjeta') }}
							</h2>
						</label>
						<label
							for="m-modal-login"
							class="pt-2 cursor-pointer text-right float-right inline-block text-neutral"
							@click="showModalAddCard = false"
						>
							<font-awesome-icon icon="fa-solid fa-close" />
						</label>
					</div>
					<div class="grid gap-4">
						<div class="card-img text-white">
							<div class="px-2 mt-28 cardAdd text-center">
								<h5 v-if="cardAdd.num_tarjeta != ''">
									{{ cardAdd.num_tarjeta }}
								</h5>
								<h5 v-if="cardAdd.num_tarjeta == ''">
									0000 0000 0000 0000
								</h5>
							</div>
							<div class="px-2 mt-2 cardAdd text-right mr-8">
								<span v-if="cardAdd.expiry_month != ''">{{
									cardAdd.expiry_month
								}}</span>
								<span v-if="cardAdd.expiry_month == ''"
									>00</span
								>
								<span v-if="cardAdd.expiry_year != null"
									>/</span
								>
								<span v-if="cardAdd.expiry_year != ''">{{
									cardAdd.expiry_year
								}}</span>
								<span v-if="cardAdd.expiry_year == ''">00</span>
							</div>
							<div class="px-2 mt-2 cardAdd text-right mr-8">
								<span v-if="cardAdd.cvc != ''">{{
									cardAdd.cvc
								}}</span>
								<span v-if="cardAdd.cvc == ''">000</span>
							</div>
						</div>
						<div class="card rounded-lg h-auto bg-base-100 text-neutral">
							<div class="flex h-full w-full">
								<div
									class="p-3 right_side h-auto w-full rounded-r-lg"
								>
									<div v-if="!requireValidation">
										<!-- Input for card number -->
										<div class="mt-4 relative">
											<input
												class="input_number h-12 w-full transition-all px-2 outline-none focus:border-blue-900 my-input-num-card bg-input-background text-neutral placeholder-input-placeholder"
												type="text"
												placeholder="0000 0000 0000 0000"
												v-model="cardAdd.num_tarjeta"
												v-on:input="
													cc_format_num_tarjeta(
														$event
													)
												"
												onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
												v-mask="
													'0000 0000 0000 0000 0000'
												"
											/>
											<label
												class="text-xs absolute -top-5 left-0"
												>{{
													$t('Número de la Tarjeta')
												}}</label
											>
										</div>
										<!-- Input for expiry month and year -->
										<div class="mt-9 w-full flex gap-3">
											<div class="relative w-full">
												<input
													class="input_expiry h-12 w-full transition-all px-2 outline-none focus:border-blue-900 bg-input-background text-neutral placeholder-input-placeholder"
													placeholder="00"
													v-model="
														cardAdd.expiry_month
													"
													v-on:input="
														cc_format_expiry_month(
															$event
														)
													"
													onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
												/>
												<label
													class="text-xs absolute -top-5 left-0"
													>{{
														$t('Vencimiento Mes')
													}}</label
												>
											</div>
											<div class="relative w-full">
												<input
													class="input_expiry h-12 w-full transition-all px-2 outline-none focus:border-blue-900 bg-input-background text-neutral placeholder-input-placeholder"
													placeholder="00"
													v-model="
														cardAdd.expiry_year
													"
													v-on:input="
														cc_format_expiry_year(
															$event
														)
													"
													onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
												/>
												<label
													class="text-xs absolute -top-5 left-0"
													>{{
														$t('Vencimiento Año')
													}}</label
												>
											</div>
											<div class="relative w-full">
												<input
													class="input_cvv h-12 w-full transition-all px-2 outline-none focus:border-blue-900 bg-input-background text-neutral placeholder-input-placeholder"
													type="text"
													placeholder="000"
													v-model="cardAdd.cvc"
													v-on:input="
														cc_format_cvc($event)
													"
													onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
												/>
												<label
													class="text-xs absolute -top-5 left-0"
													>{{
														$t('Código Seguridad')
													}}</label
												>
											</div>
										</div>
										<!-- Input for currency selection -->
										<div
											class="mt-9 mb-5 relative text-center"
										>
											<select
												class="select w-5/12 text-center bg-input-background text-neutral placeholder-input-placeholder"
												v-model="cardAdd.currency"
											>
												<option value="">
													{{
														$t('Seleccione opción')
													}}
												</option>
												<option>
													{{
														appComponent.session
															.moneda
													}}
												</option>
											</select>
											<label
												class="text-xs absolute -top-5 left-0 w-9/12"
												>{{ $t('Moneda') }}</label
											>
										</div>
									</div>
									<div v-if="requireValidation">
										<!-- Input for validation of debited amount -->
										<div class="mt-5 relative">
											<div
												class="grid grid-cols-3 gap-4 pb-6"
												v-if="requireValidation"
											>
												<div class="col-span-3">
													<label class="label">
														<span
															class="label-text my-label text-neutral"
															>{{
																$t(
																	'Para verificar la propiedad, se ha debitado una cantidad aleatoria de su tarjeta. Comuníquese con su institución financiera para confirmar e indicar el monto que se cargó automáticamente en su cuenta. Una vez confirmado, su institución financiera eliminará los cargos.' // Validation instructions
																)
															}}</span
														>
													</label>
												</div>
											</div>
											<div class="digits">
												<input
													id="debitedValue"
													class="input_number h-12 w-full border border-black transition-all rounded-lg px-2 outline-none focus:border-blue-900 my-input"
													maxlength="1"
													type="text"
													v-model="debitedValue1"
													@input="onlyInteger($event)"
												/>
												<label style="font-size: 20px"
													>.</label
												>
												<input
													id="debitedValue2"
													class="input_number h-12 w-full border border-black transition-all rounded-lg px-2 outline-none focus:border-blue-900 my-input"
													maxlength="1"
													type="text"
													v-model="debitedValue2"
													@input="onlyInteger($event)"
												/>
												<input
													id="debitedValue3"
													class="input_number h-12 w-full border border-black transition-all rounded-lg px-2 outline-none focus:border-blue-900 my-input"
													maxlength="1"
													type="text"
													v-model="debitedValue3"
													@input="onlyInteger($event)"
												/>
											</div>
										</div>
									</div>
									<label class="label">
										<span class="label-text my-label text-neutral">{{
											$t(
												'Solo se permiten tarjetas distribuidas en Jamaica.'
											)
										}}</span>
									</label>
									<div class="" v-if="!requireValidation">
										<!-- Button to add card -->
										<button
											class="pay_now outline-none rounded-lg text-neutral h-12 w-full bg-success text-sm cursor-pointer transition-all hover:bg-success/80"
											@click="addCard()"
										>
											{{ $t('Agregar') }}
										</button>
									</div>
									<div class="" v-if="requireValidation">
										<!-- Button to validate card -->
										<button
											class="pay_now outline-none rounded-lg text-neutral h-12 w-full bg-success text-sm cursor-pointer transition-all hover:bg-success/80"
											@click="validCard()"
										>
											{{ $t('Validar') }}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.text-qr {
	font-weight: 300; /* Style for QR text */
}
span.slash {
	position: absolute; /* Positioning for slash */
	font-size: 17px;
	margin: 10px 0 0 3px;
	color: black; /* Color for slash */
}
.my-input {
	font-size: 20px; /* Font size for input */
	margin: auto;
	display: inline-block;
	max-width: 33px; /* Max width for input */
	border-radius: 0 !important; /* No border radius */
	text-align: center; /* Center text */
	margin: 2px; /* Margin for input */
}
.my-input-num-card {
	letter-spacing: 2px; /* Letter spacing for card number */
	text-align: center; /* Center text */
}
.digits {
	text-align: center; /* Center text for digits */
}
.my-label {
	text-align: center; /* Center text for label */
}
@media (max-width: 800px) {
	.left_side {
		display: none; /* Hide left side on small screens */
	}
	.right_side {
		width: 100%; /* Full width for right side */
		border-top-left-radius: 9px; /* Border radius for top left */
		border-bottom-left-radius: 9px; /* Border radius for bottom left */
	}
}
.warning {
	border: 1px solid red !important; /* Warning style */
}
.card {
	background: #d4d4d4; /* Background color for card */
	border-radius: 15px; /* Border radius for card */
	border: none; /* No border */
	height: 200px; /* Height for card */
}
.image-background {
	background: black; /* Background color for image */
}
.dots span {
	height: 5px; /* Height for dots */
	width: 5px; /* Width for dots */
	margin-right: 3px; /* Margin for dots */
	margin-bottom: 2px !important; /* Margin for dots */
	background-color: rgb(255, 255, 255); /* Color for dots */
	border-radius: 50%; /* Round dots */
	display: inline-block; /* Display as inline block */
}
.number {
	font-size: 14px; /* Font size for number */
}
.cardAdd h5 {
	font-weight: bold; /* Bold font for card number */
	font-size: 22px !important; /* Font size for card number */
	color: #979797; /* Color for card number */
}
.cardAdd span {
	font-weight: bold; /* Bold font for card details */
	font-size: 18px !important; /* Font size for card details */
	color: #979797; /* Color for card details */
}
button#accion_depositarvalor,
.add-card {
	border: none; /* No border for buttons */
}
.deposit-c,
.add-card-c {
	padding: 2px; /* Padding for containers */
	border-radius: 9px; /* Border radius for containers */
	margin-left: 10px; /* Margin for containers */
}
li#fldCurrency {
	font-weight: bold; /* Bold font for currency field */
	margin-bottom: 15px; /* Margin for currency field */
}
.card-c .card_ {
	background: linear-gradient(
		0deg,
		rgb(216 216 216) 0%,
		rgb(234 234 234) 100% /* Gradient background for card */
	);
	border: 3px solid white; /* White border for card */
	box-shadow: rgb(0 0 0 / 20%) 0px 2px 6px; /* Shadow for card */
}
button.add-card.btn.w-30.text-neutral::before {
	content: ''; /* Content for button before
	background: url(/assets/images/add_card.svg); /* Background image for button */
	width: 45px; /* Width for button image */
	height: 45px; /* Height for button image */
	position: absolute; /* Positioning for button image */
	background-size: cover; /* Cover background for button image */
	background-repeat: no-repeat; /* No repeat for button image */
	margin-right: -84px; /* Margin for button image */
	margin-top: 35px; /* Margin for button image */
}
.card-img {
	background: url(https://images.virtualsoft.tech/m/msjT1650494523.png); /* Background image for card */
	background-repeat: no-repeat; /* No repeat for card background */
	background-size: contain; /* Contain background for card */
	height: 205px; /* Height for card */
}
.my-input-num-card,
input.input_expiry,
input.input_cvv,
select.select {
	text-align: center; /* Center text for inputs */
	border: 2px solid black; /* Black border for inputs */
	border-radius: 55px; /* Border radius for inputs */
}
.tittle-c {
	border-bottom: 2px solid black; /* Bottom border for title */
	margin-bottom: 12px; /* Margin for title */
}
</style>

<!-- FILE DOCUMENTED -->

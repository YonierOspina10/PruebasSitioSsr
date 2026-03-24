<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import ModalAlert from '@/components/modals/ModalAlert.vue';
import IconCloseMenu from '../icons/menu/IconCloseMenu.vue';

/**
 * Component for adding a card and processing payments.
 */
export default defineComponent({
	props: {
		/** Data passed to the component containing card information */
		dataInfo: {
			type: Object,
			default: {},
		},
	},
	components: {
		/** Modal component for alerts */
		ModalAlert,
		IconCloseMenu
	},
	data() {
		/** Configuration and state variables for the component */
		let config = this.$config();
		let emitter = this.$emitter();
		let appComponent: any = this.$appComponent;
		let textButton = 'Depositar'; // Button text
		let cardAdd: any = {
			num_tarjeta: '', // Card number
			expiry_month: '', // Expiry month
			expiry_year: '', // Expiry year
			cvv: '', // Card verification value
			amount: null, // Amount to deposit
			productId: '', // Product ID
			saveCard: false, // Flag to save card
			saveCardShow: false, // Flag to show save card option
		};
		let buttonEnabledCard: boolean = false; // Button enabled state
		let modalValidate: boolean = false; // Modal validation state
		return {
			cardAdd,
			modalValidate,
			textButton,
			buttonEnabledCard,
			config,
			emitter,
			appComponent,
		};
	},
	mounted() {
		/** Lifecycle hook to set card information from props */
		this.cardAdd = this.dataInfo.cardAdd;
	},
	methods: {
		/**
		 * Retrieves card information and encodes it in base64.
		 * @returns {string} Base64 encoded card information.
		 */
		getCardInfo() {
			const cardInfo = {
				card: {
					cardNumber: this.cardAdd.num_tarjeta.replace(/ /g, ''),
					cardHolder: this.appComponent.session.nombre,
					cvv: this.cardAdd.cvv,
					expirationDate: {
						month: this.cardAdd.expiry_month,
						year: this.cardAdd.expiry_year,
					},
				},
			};
			return btoa(JSON.stringify(cardInfo));
		},
		/**
		 * Validates card information and initiates the card addition process.
		 * @returns {boolean} False if validation fails.
		 */
		addCard() {
			if (
				this.cardAdd.num_tarjeta == '' ||
				this.cardAdd.num_tarjeta == null ||
				this.cardAdd.expiry_month == '' ||
				this.cardAdd.expiry_month == null ||
				this.cardAdd.expiry_year == '' ||
				this.cardAdd.expiry_year == null ||
				this.cardAdd.cvv == '' ||
				this.cardAdd.cvv == null ||
				this.cardAdd.amount == '' ||
				this.cardAdd.amount == null ||
				this.cardAdd.productId == '' ||
				this.cardAdd.productId == null
			) {
				this.appComponent.modalAlert.unshift({
					type: 'error',
					message: 'Datos incompletos o erróneos',
				});
				return false;
			} else {
				this.authenticationCardFunction();
			}
		},
		/**
		 * Handles the authentication process for adding a card.
		 */
		authenticationCardFunction() {
			this.buttonEnabledCard = true;
			const cardInfo = this.getCardInfo();
			const params = {
				data: cardInfo,
				amount: this.cardAdd.amount,
				productId: this.cardAdd.productId,
				saveCard: this.cardAdd.saveCard,
			};
			this.textButton = 'Estamos validando la información...';
			apiService
				.request('authentication_add_card', params)
				.then((response: any) => {
					if (response.code == 0) {
						const setupInfo = response.data.result;
						localStorage.setItem(
							'setupData',
							JSON.stringify(response.data.result)
						);
						const iframe = document.createElement('iframe');
						iframe.setAttribute('id', 'cardinal_collection_iframe');
						iframe.setAttribute('name', 'collectionIframe');
						iframe.setAttribute('height', '1');
						iframe.setAttribute('width', '1');
						iframe.style.display = 'none';
						document.body.appendChild(iframe);
						const form = document.createElement('form');
						form.setAttribute('id', 'cardinal_collection_form');
						form.setAttribute('method', 'POST');
						form.setAttribute(
							'action',
							setupInfo.deviceDataCollectionUrl
						);
						form.setAttribute('target', 'collectionIframe');
						const input = document.createElement('input');
						input.setAttribute(
							'id',
							'cardinal_collection_form_input'
						);
						input.setAttribute('name', 'JWT');
						input.setAttribute('type', 'hidden');
						input.setAttribute('value', setupInfo.jwt);
						form.appendChild(input);
						document.body.appendChild(form);
						form.submit();
						const vthis = this;
						window.addEventListener('message', messageHandler, {
							once: true,
						});

						function messageHandler(event) {
							let origen =
								'https://centinelapistag.cardinalcommerce.com';
							if (
								vthis.appComponent.config.origin3DS !=
								undefined &&
								vthis.appComponent.config.origin3DS[
								vthis.appComponent.country
								] != undefined &&
								vthis.appComponent.config.origin3DS[
								vthis.appComponent.country
								] != '' &&
								vthis.appComponent.config.origin3DS[
									vthis.appComponent.country
								].setup != undefined &&
								vthis.appComponent.config.origin3DS[
									vthis.appComponent.country
								].setup != ''
							) {
								origen =
									vthis.appComponent.config.origin3DS[
										vthis.appComponent.country
									].setup;
							}
							if (
								event.origin ===
								'https://centinelapi.cardinalcommerce.com' ||
								event.origin === origen
							) {
								console.log(
									'Device data collection completado!'
								);
								vthis.gpEnrollment(
									response.data.result.orderReference
								);
								form.remove();
								iframe.remove();
							}
						}
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (response.data.result != undefined) {
							error_mensaje = this.$t(response.data.result);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.buttonEnabledCard = false;
						this.emitter.emit('closeModalAddCard');
					}
				})
				.catch((e) => {
					console.log(e);
				});
		},
		/**
		 * Handles the enrollment process after card authentication.
		 * @param {string} orderData - The order reference data.
		 */
		gpEnrollment(orderData) {
			const cardData = this.getCardInfo();
			const setupData = JSON.parse(localStorage.getItem('setupData'));
			this.textButton = 'Continuamos validando...';
			const params = {
				...setupData,
				cardData,
				orderReference: orderData,
				amount: this.cardAdd.amount,
				productId: this.cardAdd.productId,
				saveCard: this.cardAdd.saveCard,
			};
			apiService
				.request('authentication_add_card', params)
				.then((response: any) => {
					if (response.code == 0) {
						this.modalValidate = true;
						const enrollmentInfo = response.data.result;
						localStorage.setItem(
							'enrollmentInfo',
							JSON.stringify(enrollmentInfo)
						);
						if (
							enrollmentInfo.status !== 'PENDING_AUTHENTICATION'
						) {
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Correcto'),
								messageModal: this.$t(
									'Depósito realizado correctamente'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.emitter.emit('closeModalAddCard');
							return;
						}
						const setupData = JSON.parse(
							localStorage.getItem('setupData')
						);
						const modalIframe =
							document.getElementById('modalBackdrop');
						const iframe = document.createElement('iframe');
						iframe.setAttribute('id', 'step_up_iframe');
						iframe.setAttribute('name', 'stepUpIframe');
						iframe.setAttribute('height', '500px');
						iframe.setAttribute('width', '400px');
						iframe.style.display = 'block';
						iframe.style.border = 'none';
						iframe.style.marginLeft = 'auto';
						iframe.style.marginRight = 'auto';
						iframe.style.backgroundColor = 'white';
						modalIframe.appendChild(iframe);
						const form = document.createElement('form');
						form.setAttribute('id', 'step_up_form');
						form.setAttribute('name', 'stepup');
						form.setAttribute('method', 'POST');
						form.setAttribute('action', enrollmentInfo.stepUpUrl);
						form.setAttribute('target', 'stepUpIframe');
						const input = document.createElement('input');
						input.setAttribute('id', 'step_up_form_jwt_input');
						input.setAttribute('name', 'JWT');
						input.setAttribute('type', 'hidden');
						input.setAttribute('value', enrollmentInfo.jwt);
						const input2 = document.createElement('input');
						input2.setAttribute('id', 'MD');
						input2.setAttribute('name', 'MD');
						input2.setAttribute('type', 'hidden');
						input2.setAttribute('value', setupData.transaction.id);
						form.appendChild(input);
						form.appendChild(input2);
						document.body.appendChild(form);
						console.log('Formulario creado!');
						form.submit();
						const vthis = this;
						window.addEventListener('message', messageHandler, {
							once: true,
						});

						function messageHandler(event) {
							let origen = 'https://checkoutv2.greenpay.me';
							if (
								vthis.appComponent.config.origin3DS !=
								undefined &&
								vthis.appComponent.config.origin3DS[
								vthis.appComponent.country
								] != undefined &&
								vthis.appComponent.config.origin3DS[
								vthis.appComponent.country
								] != '' &&
								vthis.appComponent.config.origin3DS[
									vthis.appComponent.country
								].enrollment != undefined &&
								vthis.appComponent.config.origin3DS[
									vthis.appComponent.country
								].enrollment != ''
							) {
								origen =
									vthis.appComponent.config.origin3DS[
										vthis.appComponent.country
									].enrollment;
							}
							if (
								event.origin !==
								'https://checkoutv2.greenpaysbx.me' &&
								event.origin !== origen
							) {
								return;
							}
							if (event.data === 'closeIframe') {
								const iframe =
									document.getElementById('step_up_iframe');
								const modalIframe =
									document.getElementById('modalBackdrop');
								if (iframe) {
									iframe.style.display = 'none';
									modalIframe.style.display = 'none';
									console.log(
										'Proceso de autenticación completado!'
									);
									vthis.gpValidate(orderData);
								}
								vthis.modalValidate = false;
							}
						}
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (
							response.data != undefined &&
							response.data.result != undefined
						) {
							error_mensaje = this.$t(response.data.result);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.buttonEnabledCard = false;
						this.emitter.emit('closeModalAddCard');
					}
				});
		},
		/**
		 * Validates the final step of the payment process.
		 * @param {string} orderData - The order reference data.
		 */
		gpValidate(orderData) {
			this.textButton = 'Estamos por finalizar...';
			const cardData = this.getCardInfo();
			const { authenticationTransactionId, code } = JSON.parse(
				localStorage.getItem('enrollmentInfo')
			);
			const params = {
				orderReference: orderData,
				validateFinal: true,
				authenticationTransactionId,
				transactionId: code,
				cardData,
				productId: this.cardAdd.productId,
				saveCard: this.cardAdd.saveCard,
			};
			apiService
				.request('authentication_add_card', params)
				.then((response: any) => {
					if (response.code == 0) {
						const validateInfo = response.data.result;
						localStorage.setItem(
							'validateInfo',
							JSON.stringify(validateInfo)
						);
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Correcto'),
							messageModal: this.$t(
								'Depósito realizado correctamente'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.emitter.emit('closeModalAddCard');
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (
							response.data != undefined &&
							response.data.result != undefined
						) {
							error_mensaje = this.$t(response.data.result);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.buttonEnabledCard = false;
						this.emitter.emit('closeModalAddCard');
					}
				});
		},
		/**
		 * Formats the card number input.
		 * @param {Event} value - The input event.
		 */
		cc_format_num_tarjeta(event: any) {
			let value = event.target.value.replace(/\D/g, ""); // digits only

			// Detect AMEX (34 / 37)
			const isAmex = value.startsWith("34") || value.startsWith("37");
			const maxDigits = isAmex ? 15 : 16;

			// Cut extra digits
			if (value.length > maxDigits) {
				value = value.slice(0, maxDigits);
			}

			// Apply grouping (every 4 digits)
			const formatted = value.replace(/(.{4})/g, "$1 ").trim();

			this.cardAdd.num_tarjeta = formatted;
			this.cardAdd.isAmex = isAmex;
		}

		,
		/**
		 * Formats the expiry month input.
		 * @param {Event} value - The input event.
		 */
		cc_format_expiry_month(value: any) {
			value = value.target.value.toString();
			if (value.length > 2 || parseInt(value) > 12) {
				this.cardAdd.expiry_month = 12;
			} else if (parseInt(value) < 0) {
				this.cardAdd.expiry_month = 1;
			} else if (value === '00') {
				this.cardAdd.expiry_month = '01';
			} else {
				this.cardAdd.expiry_month = value;
			}
		},
		/**
		 * Formats the expiry year input.
		 * @param {Event} value - The input event.
		 */
		cc_format_expiry_year(value: any) {
			const input = value.target.value.toString(); // Raw input as string
			const currentYear = new Date().getFullYear() % 100; // Current year in YY format
			// Allow empty value (user deleting)
			if (input === "") {
				this.cardAdd.expiry_year = "";
				return;
			}
			// Limit to 2 digits
			if (input.length > 2) {
				this.cardAdd.expiry_year = input.slice(0, 2);
				return;
			}
			const year = parseInt(input, 10);
			// If not a number, reset
			if (isNaN(year)) {
				this.cardAdd.expiry_year = "";
				return;
			}
			// Only validate when user has typed both digits
			if (input.length === 2 && year < currentYear) {
				this.cardAdd.expiry_year = currentYear.toString(); // Force minimum year
				return;
			}
			// Normal typing flow
			this.cardAdd.expiry_year = input;
		},
		/**
		 * Formats the CVC input.
		 * @param {Event} value - The input event.
		 */
		cc_format_cvc(value: any) {
			let input = value.target.value.replace(/\s+/g, ""); // remove spaces
			const maxLength = this.cardAdd.isAmex ? 4 : 3;
			if (input.length > maxLength) {
				input = input.slice(0, maxLength);
			}
			this.cardAdd.cvv = input;
		},
		validate_cvc() {
			const length = this.cardAdd.cvv?.length || 0;

			if (this.cardAdd.isAmex && length !== 4) {
				this.cardAdd.cvv = "";
				return false;
			}

			if (!this.cardAdd.isAmex && length !== 3) {
				this.cardAdd.cvv = "";
				return false;
			}

			return true;
		}

	},
});
</script>
<template>
	<!-- Modal for adding a card -->
	<div :class="modalValidate ? 'hidden' : 'block'"
		class="modal text-base-content items-center bg-base-content bg-opacity-75 z-[9999] flex justify-center"
		id="add-card">
		<div class="modal-box rounded-2xl bg-base-300">
			<div
				class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8 bg-base-300 p-5 rounded-2xl">
				<div class="Container InfoContent row">
					<div class="tittle-c flex items-center justify-between">
						<label class="inline-block">
							<h2 class="font-bold text-neutral">{{ $t('Depositar') }}</h2>
						</label>
						<label for="m-modal-login"
							class="pt-2 cursor-pointer text-right float-right inline-block text-accent-focus" @click="
								appComponent.closeModal();
							emitter.emit('closeModalAddCard');
							">
							<IconCloseMenu width="20" height="20" class="text-accent-focus"/>
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
								<span v-if="cardAdd.expiry_month == ''">00</span>
								<span v-if="cardAdd.expiry_year != null">/</span>
								<span v-if="cardAdd.expiry_year != ''">{{
									cardAdd.expiry_year
								}}</span>
								<span v-if="cardAdd.expiry_year == ''">00</span>
							</div>
							<div class="px-2 mt-2 cardAdd text-right mr-8">
								<span v-if="cardAdd.cvv != ''">{{
									cardAdd.cvv
								}}</span>
								<span v-if="cardAdd.cvv == ''">000</span>
							</div>
						</div>
						<div class="rounded-lg h-auto bg-base-200 border-1 border-input-background">
							<div class="flex h-full w-full">
								<div class="p-3 right_side h-auto w-full rounded-r-lg">
									<div>
										<div class="mt-4 relative">
											<input
												class="input_number border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900 my-input-num-card"
												type="text" placeholder="0000 0000 0000 0000"
												v-model="cardAdd.num_tarjeta" v-on:input="
													cc_format_num_tarjeta(
														$event
													)
													" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;
                         if(event.target.value.length > 18) return false
                        " />
											<label class="text-xs absolute -top-5 left-0 text-neutral">{{
												$t('Número de la Tarjeta')
											}}</label>
										</div>
										<div class="mt-9 w-full flex gap-3">
											<div class="relative w-full">
												<input
													class="input_expiry border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
													placeholder="00" v-model="cardAdd.expiry_month
														" v-on:input="
														cc_format_expiry_month(
															$event
														)
														" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false; if(event.target.value.length > 1) return false;" />
												<label class="text-xs absolute -top-5 left-0 text-neutral">{{
													$t('Vencimiento Mes')
												}}</label>
											</div>
											<div class="relative w-full">
												<input
													class="input_expiry border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
													placeholder="00" v-model="cardAdd.expiry_year
														" v-on:input="
														cc_format_expiry_year(
															$event
														)
														" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false; if(event.target.value.length > 1) return false;" />
												<label class="text-xs absolute -top-5 left-0 text-neutral">{{
													$t('Vencimiento Año')
												}}</label>
											</div>
											<div class="relative w-full">
												<input
													class="input_cvv border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
													type="text" placeholder="000" v-model="cardAdd.cvv"
													@input="cc_format_cvc($event)" @blur="validate_cvc()"
													onkeypress="if ( isNaN(String.fromCharCode(event.keyCode)) ) return false;" />
												<label class="text-xs absolute -top-5 left-0 text-neutral">{{
													$t('Código Seguridad')
												}}</label>
											</div>
										</div>
										<div v-if="
											cardAdd.Commission !=
											undefined &&
											cardAdd.Commission != null &&
											cardAdd.Commission != ''
										" class="mt-9 mb-5 flex flex-col justify-center items-center text-center gap-8">
											<div class="relative w-full cursor-not-allowed">
												<span
													class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full">{{
														cardAdd.amount }}</span>
												<label class="text-xs absolute -top-5 left-0 text-neutral">{{
													$t('Monto solicitado')
												}}</label>
											</div>
											<div class="relative w-full cursor-not-allowed">
												<span
													class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full">{{
														(
															cardAdd.amount *
															(cardAdd.Commission /
																100)
														).toFixed(2)
													}}</span>
												<label class="text-xs absolute -top-5 left-0">{{
													$t('Valor comisión')
												}}
													({{
														cardAdd.Commission
													}}%)</label>
											</div>
											<div class="relative w-full cursor-not-allowed">
												<span
													class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full">{{
														cardAdd.amount +
														cardAdd.amount *
														(cardAdd.Commission /
															100)
													}}</span>
												<label class="text-xs absolute -top-5 left-0">{{ $t('Total') }}</label>
											</div>
										</div>
										<div v-else class="mt-9 mb-5 relative text-center">
											<div class="relative w-full">
												<input
													class="input_cvv border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
													type="number" placeholder="000" v-model="cardAdd.amount" disabled
													onkeypress="return event.charCode >= 46 && event.charCode <= 57" />
												<label class="text-xs absolute -top-5 left-0 text-neutral">{{ $t('Valor') }}</label>
											</div>
										</div>
										<div class="relative w-full flex pb-3" v-if="cardAdd.saveCardShow">
											<input type="checkbox" v-model="cardAdd.saveCard" />
											<label class="text-xs -top-5 left-0 pl-3">{{
												$t(
													'Guardar tarjeta de crédito'
												)
											}}</label>
										</div>
									</div>
									<div class="text-center">
										<button @click="addCard()" :disabled="buttonEnabledCard" :class="buttonEnabledCard
												? 'bg-green-500/70 cursor-not-allowed'
												: 'cursor-pointer bg-primary hover:bg-primary-focus'
											" class="pay_now outline-none rounded-3xl text-neutral h-12 w-full text-sm transition-all">
											{{ $t(textButton) }}
											<svg v-if="buttonEnabledCard" aria-hidden="true" role="status"
												class="inline w-4 h-4 mr-3 text-neutral animate-spin"
												viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="#E5E7EB" />
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentColor" />
											</svg>
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
	<!-- Modal for validation feedback -->
	<div :class="modalValidate ? 'block' : 'hidden'"
		class="modal z-[99999] flex justify-center items-center overflow-hidden">
		<div id="modalBackdrop" class="modal-box modal-backdrop min-h-[400px]"></div>
	</div>
</template>
<style scoped>
/* Global styles for text color */
* {
	color: black;
}

/* Styles for card number display */
.cardAdd h5 {
	font-weight: bold;
	font-size: 22px !important;
	color: #979797;
}

/* Styles for card details display */
.cardAdd span {
	font-weight: bold;
	font-size: 18px !important;
	color: #979797;
}

/* Background image for card section */
.card-img {
	background: url(https://images.virtualsoft.tech/m/msjT1650494523.png);
	background-repeat: no-repeat;
	background-size: contain;
	height: 205px;
}

/* Title styles */
.tittle-c {
	border-bottom: 2px solid hsl(var(--af));
	margin-bottom: 12px;
}

/* Input styles for card number */
.my-input-num-card {
	letter-spacing: 2px;
	text-align: center;
}

/* Input styles for card details */
.my-input-num-card,
input.input_expiry,
input.input_cvv {
	background-color: white;
	text-align: center;
	border: 2px solid black;
	border-radius: 55px;
}

/* Responsive styles for smaller screens */
@media (max-width: 800px) {
	.right_side {
		width: 100%;
		border-top-left-radius: 9px;
		border-bottom-left-radius: 9px;
	}
}
</style>

<!-- FILE DOCUMENTED -->

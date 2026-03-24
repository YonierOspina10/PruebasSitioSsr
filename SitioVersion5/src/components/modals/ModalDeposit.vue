<script lang="ts">
import { defineComponent, toRaw } from 'vue'; // Import necessary Vue functions
import apiService from '@/services/ApiService'; // Import API service for making requests
import IconCheckv2 from '../icons/IconCheckv2.vue'; // Import icon components
import IconChevrondown from '../icons/IconChevrondown.vue';
import IconChevronup from '../icons/IconChevronup.vue';
import IconSliders from '../icons/IconSliders.vue';
import { useCookies } from 'vue3-cookies'; // Import cookies management

export default defineComponent({
	props: {
		dataInfo: Object, // Prop to receive data information
	},
	components: {
		IconCheckv2,
		IconChevrondown,
		IconChevronup,
		IconSliders,
	},
	data() {
		let emitter = this.$emitter(); // Event emitter for communication
		let appComponent: any = this.$appComponent; // Reference to the app component
		let data: any = this.dataInfo; // Data received from props
		let showModalVerifyPhone: boolean = false; // State for phone verification modal
		let info: any = []; // Array to hold information
		let name: string = 'Todos'; // Default name
		let objectKeys: any = []; // Keys of the data object
		let paramsModal: any = {}; // Parameters for modal
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let config = this.$config(); // Configuration object
		let showTools: boolean = false; // State for showing tools
		let inputChecked: string = 'asd'; // Checked input value
		let showFilter: boolean = false; // State for showing filter
		let showPayment: boolean = false; // State for showing payment options
		let minPayment: number = 0; // Minimum payment amount
		let maxPayment: number = 0; // Maximum payment amount
		let emailVerifyPhone: string = ''; // Email for phone verification
		let selectInfo: any = []; // Selected information
		let cvv: any = {}; // CVV information
		let modelCards: any = {}; // Model cards information
		let showModalNeedApproval: boolean = false; // State for approval modal
		let amount: number = 0; // Payment amount
		let selectButton: any = ''; // Selected button
		let showModalDataText: boolean = false; // State for showing data text modal
		let showModalVerifyCodePhone: boolean = false; // State for verifying phone code
		let dataText: string = ''; // Text for data modal
		let dataTitle: string = ''; // Title for data modal
		let dataImg: string = ''; // Image for data modal
		return {
			emitter,
			inputChecked,
			paramsModal,
			name,
			objectKeys,
			dataText,
			selectInfo,
			cvv,
			refreshBalance,
			modelCards,
			dataTitle,
			showModalVerifyCodePhone,
			showModalDataText,
			dataImg,
			emailVerifyPhone,
			showModalNeedApproval,
			showModalVerifyPhone,
			info,
			config,
			minPayment,
			maxPayment,
			amount,
			appComponent,
			showPayment,
			selectButton,
			showFilter,
			showTools,
			data,
		};
	},
	watch: {
		dataInfo: function (val) {
			this.data = this.dataInfo; // Watcher to update data when props change
		},
	},
	setup() {
		const { cookies } = useCookies(); // Setup cookies for tracking
		return { cookies };
	},
	updated() {},
	mounted() {
		const vthis = this; // Reference to the component instance
		const params = {
			is_popup: true, // Parameter for API request
		};
		apiService.request('get_payments2', params).then(function (
			response: any
		) {
			vthis.name; // Accessing name variable
			vthis.info = response; // Storing response data
			vthis.objectKeys = Object.keys(response.data); // Getting keys from response data
			vthis.objectKeys.forEach((item) => {
				if (vthis.info.data[item].data != undefined) {
					vthis.selectInfo = vthis.selectInfo.concat(
						vthis.info.data[item].data // Concatenating data to selectInfo
					);
				}
			});
			if (response.code != 0) {
				var error_mensaje = ''; // Variable to hold error message
				if (response.error_code != undefined) {
					error_mensaje = vthis.$t(
						'ERROR' + response.error_code.toString() // Translating error message
					);
				}
				if (error_mensaje == '') {
					error_mensaje = vthis.$t(
						'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
					);
				}
				vthis.appComponent.modal = {
					showModal: 'notification', // Modal type
					titleModal: vthis.$t('Error!'), // Modal title
					messageModal: error_mensaje, // Modal message
					buttonModal: vthis.$t('Aceptar'), // Modal button text
					orderModal: 'closeModal', // Modal action
				};
			}
		});
	},
	methods: {
		changeFilter(item) {
			this.selectInfo = this.info.data[item].data; // Change selected info based on filter
			this.name = item; // Update name based on selected filter
		},
		close() {
			this.appComponent.closeModal(); // Close the modal
		},
		accept() {
			this.emitter.emit('accept:modal'); // Emit accept event
		},
		changeValue(item, id) {
			this.selectButton = id; // Set selected button ID
			this.showPayment = true; // Show payment options
			let select: any = this.$refs.items; // Reference to items
			select.forEach((item, index) => {
				select[index].classList.add('border-black', 'shadow-none'); // Reset styles
				select[index].classList.remove(
					'shadow-outsidesuccess',
					'border-success'
				);
				select[index].childNodes[1].classList.add('hidden'); // Hide check icon
			});
			select[item].classList.remove('border-black', 'shadow-none'); // Highlight selected item
			select[item].childNodes[1].classList.remove('hidden'); // Show check icon
			select[item].classList.add(
				'border-success',
				'shadow-outsidesuccess'
			);
			select[item].childNodes[1].classList.add('block'); // Show check icon
			let valueNumber: any = this.selectInfo.filter((item) => {
				return item?.id == id; // Filter selected item
			});
			this.amount = valueNumber[0]?.valor; // Set amount from selected item
			this.minPayment = valueNumber[0]?.min; // Set minimum payment
			this.maxPayment = valueNumber[0]?.max; // Set maximum payment
		},
		depositSubmit() {
			let item = this.paramsModal; // Get parameters for deposit
			let routeSucess = ''; // Route for success
			if (
				this.appComponent.config.depositos != undefined &&
				this.appComponent.config.depositos.ThankYouDeposit !=
					undefined &&
				this.appComponent.config.depositos.ThankYouDeposit[
					this.appComponent.country
				] != undefined &&
				this.appComponent.config.depositos.ThankYouDeposit[
					this.appComponent.country
				].show
			) {
				routeSucess = this.config.urlSkin + 'graciasdeposito'; // Success route
			} else {
				routeSucess = this.config.urlSkin + 'gestion/deposito/correcto'; // Default success route
			}
			const params = {
				amount: this.amount, // Amount to deposit
				payer: {
					status_urls: {
						cancel:
							this.config.urlSkin + 'gestion/deposito/pendiente', // Cancel URL
						fail: this.config.urlSkin + 'gestion/deposito/error', // Fail URL
						success: routeSucess, // Success URL
					},
					forProduct: 'casino', // Product type
					'1tap': true, // One tap payment
				},
				service: this.selectButton, // Selected service
				vs_utm_campaign: '', // UTM campaign
				vs_utm_campaign2: '', // UTM campaign 2
			};
			let vs_utm_campaign = ''; // UTM campaign variable
			let vs_utm_source = ''; // UTM source variable
			let vs_utm_medium = ''; // UTM medium variable
			let vs_utm_content = ''; // UTM content variable
			let vs_utm_term = ''; // UTM term variable
			let stParam = ''; // String for UTM parameters
			if (this.cookies.get('vs_utm_campaign') !== '') {
				vs_utm_campaign = this.cookies.get('vs_utm_campaign'); // Get UTM campaign from cookies
				params.vs_utm_campaign = vs_utm_campaign; // Set UTM campaign in params
			}
			if (this.cookies.get('vs_utm_campaign2') !== '') {
				params.vs_utm_campaign2 = this.cookies.get('vs_utm_campaign2'); // Set UTM campaign 2 in params
			}
			if (this.cookies.get('vs_utm_source') !== '') {
				vs_utm_source = this.cookies.get('vs_utm_source'); // Get UTM source from cookies
			}
			if (this.cookies.get('vs_utm_medium') !== '') {
				vs_utm_medium = this.cookies.get('vs_utm_medium'); // Get UTM medium from cookies
			}
			if (this.cookies.get('vs_utm_content') !== '') {
				vs_utm_content = this.cookies.get('vs_utm_content'); // Get UTM content from cookies
			}
			if (this.cookies.get('vs_utm_term') !== '') {
				vs_utm_term = this.cookies.get('vs_utm_term'); // Get UTM term from cookies
			}
			if (vs_utm_campaign !== '') {
				stParam = stParam + '&vs_utm_campaign=' + vs_utm_campaign; // Append UTM campaign to string
			}
			if (vs_utm_source !== '') {
				stParam = stParam + '&vs_utm_source=' + vs_utm_source; // Append UTM source to string
			}
			if (vs_utm_content !== '') {
				stParam = stParam + '&vs_utm_content=' + vs_utm_content; // Append UTM content to string
			}
			if (vs_utm_term !== '') {
				stParam = stParam + '&vs_utm_term=' + vs_utm_term; // Append UTM term to string
			}
			if (vs_utm_medium !== '') {
				stParam = stParam + '&vs_utm_medium=' + vs_utm_medium; // Append UTM medium to string
			}
			apiService.request('deposit', params).then((response: any) => {
				if (response.code == 0) {
					if (response.data.necesitaVerificacionCelular) {
						this.showModalVerifyPhone = true; // Show phone verification modal
						this.emailVerifyPhone = response.data.emailUser; // Set email for verification
					} else {
						if (response.data.necesitaAprobacion) {
							this.showModalNeedApproval = true; // Show approval modal
							const data = {
								riskId: response.data.riskId, // Risk ID for approval
								stateRisk: response.data.stateRisk, // State of risk
							};
							const vthis = this; // Reference to component instance
							var estadoDeposito = setInterval(
								intervaloEstadoDeposito,
								5000 // Check deposit status every 5 seconds
							);

							function intervaloEstadoDeposito() {
								apiService
									.request('deposit', data) // Request deposit status
									.then((response2: any) => {
										response2 = response2.data; // Get response data
										if (response2.code == 0) {
											if (
												response2.data.stateRisk === 1
											) {
												vthis.dataTitle =
													"<div class='text-qr'>" +
													response2.data.dataText +
													'</div>' +
													vthis.$t(
														'¡Solicitud de depósito aprobado!' // Success message
													);
												vthis.dataText = vthis.$t(
													'Ya puedes continuar con tu proceso de depósito.' // Continue deposit message
												);
												vthis.dataImg =
													response2.data.dataImg; // Image for modal
												vthis.showModalDataText = true; // Show data text modal
												window.clearInterval(
													estadoDeposito // Clear interval
												);
												vthis.deposit(response2); // Call deposit function
											} else if (
												response2.data.stateRisk === 2
											) {
												vthis.dataTitle =
													"<div class='text-qr'>" +
													response2.data.dataText +
													'</div>' +
													vthis.$t(
														'¡Solicitud de depósito rechazado!' // Rejected message
													);
												vthis.dataText = vthis.$t(
													'Lo sentimos... Por favor intenta de nuevo mas tarde.' // Retry message
												);
												vthis.dataImg =
													response2.data.dataImg; // Image for modal
												vthis.showModalDataText = true; // Show data text modal
												window.clearInterval(
													estadoDeposito // Clear interval
												);
											}
										}
									});
							}
						} else {
							this.deposit(response); // Call deposit function
						}
					}
				} else {
					var error_mensaje = ''; // Variable to hold error message
					error_mensaje = this.$t(
						'ERROR' + response.error_code.toString() // Translate error message
					);
					if (error_mensaje == '') {
						error_mensaje = this.$t('ERROR_GENERAL'); // Default error message
					}
					this.appComponent.modal = {
						showModal: 'notification', // Modal type
						titleModal: this.$t('Error!'), // Modal title
						messageModal: error_mensaje, // Modal message
						buttonModal: this.$t('Aceptar'), // Modal button text
						orderModal: 'closeModal', // Modal action
					};
				}
			});
			if (this.appComponent.modal.orderModal == 'acceptVerifyPhone') {
				this.showModalVerifyCodePhone = true; // Show verification code modal
			} else {
				if (this.appComponent.modal.orderModal == 'closeModal') {
					this.appComponent.closeModal(); // Close modal
				} else {
					if (
						this.appComponent.modal.orderModal ==
						'creditCardPayment'
					) {
						this.refreshBalance(); // Refresh balance
						this.modelCards[item.id] = ''; // Reset model cards
						this.cvv[item.id] = ''; // Reset CVV
					}
				}
			}
			this.appComponent.closeModal(); // Close modal
		},
		deposit(res) {
			let item = this.paramsModal; // Get parameters for deposit
			try {
				(window as any).fDepositSuccess(
					this.appComponent.session.usuario,
					this.amount,
					this.appComponent.session.moneda // Call success function
				);
			} catch (e) {}
			if (
				this.selectButton != '3999' &&
				this.selectButton != '4001' &&
				this.selectButton != '3997'
			) {
				if (res.data.dataImg != '' && res.data.dataImg != undefined) {
					this.appComponent.modal.showModal = 'data'; // Show data modal
					this.appComponent.infoModal = res.data; // Set modal info
				} else {
					if (res.data.target == '_blank') {
						window.open(res.data.details.action, '_blank'); // Open link in new tab
					} else {
						window.location.href = res.data.details.action; // Redirect to action
					}
				}
			} else {
				this.showModalDataText = true; // Show data text modal
				this.appComponent.modal = {
					showModal: 'notification', // Modal type
					titleModal: this.$t('Exito'), // Modal title
					messageModal: this.$t(
						'Solicitud de deposito creada satisfactoriamente . ' // Success message
					),
					buttonModal: this.$t('Aceptar'), // Modal button text
					orderModal: 'closeModal', // Modal action
				};
				let responseTest = res.data.details.action; // Get action from response
				responseTest = res.data.codeFrame.replace('\/"', '/'); // Clean action URL
			}
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal z-[999999999]">
		<!-- General container for modal content -->
		<div
			class="container-general w-11/12 max-w-3xl flex flex-col justify-center items-center"
		>
			<!-- Container for image and text -->
			<div
				class="container-img-text w-11/12 max-w-lg overflow-y-auto containar p-5 rounded-3xl relative"
			>
				<!-- Promotion image container -->
				<div class="promotion-image w-full h-full shadow-md relative">
					<!-- Close button for modal -->
					<label
						@click="close()"
						class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs top-0 right-0 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
						>✕</label
					>
				</div>
				<!-- Payment methods title -->
				<p
					v-show="!showTools"
					class="w-full bg-[#eaeff1] text-[#838383] text-left text-sm pl-5 py-2 uppercase font-poppinsb"
				>
					{{ $t('Métodos de pago') }}
				</p>
				<!-- Filter button and options -->
				<div class="relative">
					<button
						v-if="showFilter"
						@click="showTools = !showTools"
						class="w-full bg-[#f9f9fa] hover:bg-base-200 text-black text-sm font-medium text-left px-5 py-2 capitalize flex justify-between"
					>
						<p>{{ $t(name) }}</p>
						<IconChevrondown
							:width="'15'"
							:height="'15'"
							:fill="'#7c7c7c'"
						/>
					</button>
					<!-- Close button for tools -->
					<div
						v-show="showTools"
						class="w-full -top-2 left-0 h-[1px] absolute"
						style="z-index: 6"
					>
						<label
							@click="showTools = false"
							class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs top-0 right-[-11px] shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
							>✕</label
						>
					</div>
					<!-- Tools dropdown -->
					<div
						v-show="showTools"
						class="w-full top-0 left-0 h-[225px] bg-white absolute overflow-y-auto overflow-x-hidden shadow-outside"
						style="z-index: 5"
					>
						<!-- Filter options -->
						<div v-for="(item, i) in info.data">
							<label
								:for="'filter-' + i"
								@click="
									showTools = false;
									changeFilter(i);
								"
								class="flex justify-between cursor-pointer w-full gap-x-10 bg-white border-solid border-b-1 border-graycontent text-black px-2 py-3 text-left hover:bg-gray-100"
							>
								<input
									:id="'filter-' + i"
									type="radio"
									:value="'filter-' + i"
									v-model="inputChecked"
								/>
								<p class="w-[60%] md:w-[80%]">{{ i }}</p>
								<p class="font-poppins text-[#5c5e66] pr-4">
									{{ item.length }}
								</p>
							</label>
						</div>
					</div>
				</div>
				<!-- Container for payment options -->
				<div
					class="h-[190px] max-h-[190px] flex justify-start p-2 flex-wrap items-center overflow-auto gap-3"
				>
					<!-- Payment option buttons -->
					<button
						@click="changeValue(index, item?.id)"
						ref="items"
						v-for="(item, index) in selectInfo"
						class="w-[117px] md:w-[123px] h-[80px] bg-white border-solid border-1 border-black relative flex flex-col flex-shrink-0 hover:scale-105 transition-all ease-in-out"
					>
						<div class="w-full h-[50%]">
							<img
								:src="item?.imagen"
								v-if="
									item?.imagen != '' &&
									item?.imagen != null &&
									item?.imagen != undefined
								"
								alt=""
								class="p-3 mt-2 object-contain w-full h-full"
							/>
						</div>
						<IconCheckv2
							class="absolute top-1 right-1 hidden"
							:width="'15'"
							:height="'15'"
							:fill="'#2aa564'"
						/>
						<p
							class="h-[50%] w-full leading-4 text-center flex justify-center items-center text-sm font-medium text-black overflow-hidden break-words p-1"
						>
							{{ item?.nombre }}
						</p>
					</button>
				</div>
				<!-- Divider for payment section -->
				<div
					v-if="showPayment"
					class="divider block h-[0.1rem] bg-gray-300"
				></div>
				<!-- Payment submission section -->
				<div
					v-if="showPayment"
					class="bg-white w-full rounded-xl flex flex-row justify-center items-center gap-6 py-9 shadow-outside"
				>
					<div
						class="flex flex-col justify-center items-center relative w-[40%]"
					>
						<input
							type="number"
							class="inputNumber text-black rounded-full w-full"
							placeholder="Cantidad"
							v-model="amount"
						/>
						<p
							class="text-black absolute top-12 left-0 md:left-4 text-xs"
						>
							{{ $t('Min:') }} {{ minPayment }}
						</p>
						<p
							class="text-black absolute top-12 right-0 md:right-4 text-xs"
						>
							{{ $t('Max:') }} {{ maxPayment }}
						</p>
					</div>
					<!-- Submit button for deposit -->
					<button
						@click="depositSubmit()"
						class="bg-[#008e0f] w-[40%] px-4 py-2 rounded-full md:text-2xl shadow-inside hover:scale-105 transition-all ease-in-out"
					>
						{{ $t('Depositar') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.containar {
	background: rgb(255, 255, 255); /* Background color for container */
	border-radius: 16px; /* Rounded corners */
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
	border: 1px solid rgba(255, 255, 255, 0.47); /* Border styling */
}

.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important; /* Shadow for close button */
}

.modal {
	background-color: #0000004f !important; /* Background color for modal */
}

.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important; /* Shadow for submit button */
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	data() {
		// Data function returning component state
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for handling events
		let page: any = 0; // Current page number for pagination
		let itemSelect: any = {}; // Selected withdrawal item
		let loadingTable: boolean = false; // Loading state for the table
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let withdrawals: any = []; // Array to hold withdrawal requests
		let selectValue: number = 0; // Selected withdrawal value

		return {
			appComponent,
			selectValue,
			itemSelect,
			refreshBalance,
			loadingTable,
			page,
			emitter,
			withdrawals,
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.$nextTick(() => {
			// Ensures the DOM is updated before executing the following code
			this.emitter.on('accept:modal', () => {
				this.acceptModal(); // Event listener for accepting modal
			});
			this.getWithdrawals(0); // Fetch withdrawals on mount
		});
	},
	methods: {
		close() {
			// Method to close the withdrawal cancellation modal
			this.appComponent.showModalCancelWithdraw = false;
		},
		acceptModal() {
			// Method to handle acceptance of the modal
			const vthis = this; // Reference to the component instance
			if (this.appComponent.modal.orderModal == 'withdraw_cancel') {
				let params = {
					id: this.itemSelect, // Parameters for the API request
				};
				apiService
					.request('withdraw_cancel', params) // API call to cancel withdrawal
					.then((response: any) => {
						if (response.code == 0) {
							// Successful response handling
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('OK!'),
								messageModal: this.$t(
									'La nota de retiro ha sido anulada satisfactoriamente. Este valor se aumentara en saldo disponible para Apostar.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.getWithdrawals(0); // Refresh withdrawals list
							vthis.refreshBalance(); // Refresh balance
						} else {
							// Error response handling
							var error_mensaje = '';
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
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
						}
					});
			}
			this.appComponent.closeModal(); // Close the modal after processing
		},
		getWithdrawals(state) {
			// Method to fetch withdrawal requests based on state
			const paramsWithdrawals = {
				State: state, // State parameter for filtering withdrawals
				count: 10, // Number of withdrawals to fetch
				start: 0, // Starting index for pagination
			};
			apiService
				.request('get_withdrawals', paramsWithdrawals) // API call to get withdrawals
				.then((response: any) => {
					if (response.code == 0) {
						this.withdrawals =
							response.data.withdrawal_requests.request; // Update withdrawals data
					}
				});
		},
		withdrawCancel(item: any) {
			// Method to initiate withdrawal cancellation
			if (item != 0) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Anular Nota de Retiro'),
					messageModal:
						this.$t(
							'¿ Esta seguro que desea eliminar la nota de retiro #'
						) +
						item +
						'?',
					buttonModal: this.$t('Aceptar'),
					orderModal: 'withdraw_cancel', // Set order for modal
				};
				this.itemSelect = item; // Set selected item for cancellation
			}
		},
	},
});
</script>
<template>
	<!-- Main modal container for withdrawal cancellation -->
	<div class="modal z-[99999999] font-poppinsm">
		<!-- General container for modal content -->
		<div
			class="container-general w-full flex flex-col justify-center items-center"
		>
			<!-- Container for image and text -->
			<div
				class="container-img-text w-full md:w-[400px] overflow-y-auto containar p-5 rounded-3xl relative flex flex-col justify-center items-center"
			>
				<!-- Promotion image area -->
				<div
					class="promotion-image w-full h-full bg-red-700 shadow-md relative"
				>
					<!-- Close button for the modal -->
					<label
						@click="close()"
						class="close-btn btn btn-xs flex justify-center items-center btn-circle bg-gray-700 absolute text-base -top-3 -right-2 shadow-lg text-white transition ease-in-out hover:bg-red-700 hover:scale-105 z-1"
						>✕</label
					>
				</div>
				<!-- Content area for withdrawal selection -->
				<div
					class="w-full h-[369px] overflow-auto text-black text-center"
				>
					<p class="font-semibold text-xl px-11 leading-6 mb-4">
						{{ $t('SELECCIONE LA NOTA DE RETIRO A ELIMINAR') }}
					</p>
					<!-- Conditional rendering for withdrawals list -->
					<div
						v-if="withdrawals.length > 0"
						class="flex flex-col justify-center items-center gap-y-2 h-auto w-auto"
					>
						<!-- Button for each withdrawal item -->
						<button
							v-for="item in withdrawals"
							@click="selectValue = item.id"
							:class="
								selectValue == item.id
									? 'active text-white scale-[.99]'
									: 'inactive'
							"
							class="w-full h-16 bg-[#DADADA] cursor-pointer rounded-lg flex justify-between items-center px-3 hover:scale-[.99] transition-all ease-in-out focus:bg-[#b2dbb7] hover:bg-[#b2dbb7]"
						>
							<!-- Item details -->
							<div
								class="flex justify-center items-center gap-x-2"
							>
								<div
									class="w-9 h-9 bg-[#EDD777] rounded-full border-1 border-solid border-white flex justify-center items-center"
								>
									<img
										:src="
											$t(
												'https://images.virtualsoft.tech/m/msjT1683819705.png'
											)
										"
										alt=""
										class="w-full h-full object-contain p-1"
									/>
								</div>
								<div
									class="flex justify-start items-start flex-col"
								>
									<p class="text-xs">
										{{ $t('N° Nota de retiro') }}
									</p>
									<p class="text-xs font-medium">
										{{ item?.id }}
									</p>
								</div>
							</div>
							<p class="font-medium">
								{{ item.amount }}
								<span>{{ appComponent.session.moneda }}</span>
							</p>
						</button>
					</div>
					<!-- Message for no pending withdrawals -->
					<div
						v-else
						class="w-full h-3/4 flex justify-center items-center"
					>
						<p>{{ $t('No tienes notas de retiro pendientes') }}</p>
					</div>
				</div>
				<!-- Button to confirm withdrawal cancellation -->
				<span
					@click="withdrawCancel(selectValue)"
					class="text-white rounded-2xl mt-3 px-6 btn bg-green-800 border-solid border-2 border-success2 hover:scale-95"
					style="background: linear-gradient(1deg, #2b653c, #19af21)"
					:class="selectValue == 0 ? 'disabled' : ''"
					>anular</span
				>
			</div>
		</div>
	</div>
</template>
<style scoped>
.active {
	/* Styles for active withdrawal item */
	background: linear-gradient(
		360deg,
		#00510f,
		#006c14,
		#36b614,
		#079e0f
	) !important;
}
.inactive {
	/* Styles for inactive withdrawal item */
	background: linear-gradient(
		360deg,
		#d3d3d3,
		#c7c7c7,
		#ffffff,
		#ededed
	) !important;
}
.containar {
	/* Styles for the main container */
	background: rgb(255, 255, 255);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.47);
}
.close-btn {
	/* Styles for the close button */
	box-shadow: inset 0px -4px 2px 0px #00000030 !important;
}
.modal {
	/* Styles for the modal background */
	background-color: #0000004f !important;
}
</style>

<!-- FILE DOCUMENTED -->

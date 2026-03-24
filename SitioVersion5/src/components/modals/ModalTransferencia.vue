<template>
	<!-- Main section covering the full screen with a semi-transparent black background -->
	<section
		class="w-screen h-screen bg-black/75 flex justify-center items-center absolute top-0 right-0"
	>
		<!-- Article container for the modal content -->
		<article
			class="relative flex flex-col justify-center items-center w-96 bg-base-300 text-black rounded-box p-8 z-[9999]"
		>
			<!-- Button to close the modal -->
			<button
				@click="appComponent.modalTransferencia = false"
				class="absolute top-2 right-2 z-[999] hover:scale-110"
			>
				<ExitIcon
					:height="23"
					:width="23"
					:fill="'#ffffff'"
					:fill2="'#ee3b3f'"
				/>
			</button>
			<!-- Title of the modal -->
			<h2 class="text-2xl font-bold uppercase mb-4 text-neutral">
				{{ $t('Transferencia') }}
			</h2>
			<div class="w-full flex flex-col justify-center items-start gap-4">
				<!-- Dropdown for selecting the bank -->
				<div class="form-control w-full">
					<label class="label">
						<span v-if="!depositBankDisabled" class="label-text text-neutral
						">{{
							$t('Banco')
						}}</span>
						<span v-else class="label-text text-neutral">{{
							$t('Buscando bancos')
						}}</span>
					</label>
					<select
						:disabled="depositBankDisabled"
						v-model="selectAccount"
						class="select select-bordered border-input-border bg-input-background text-neutral"
					>
						<option disabled selected>
							{{ $t('Elegir banco') }}
						</option>
						<!-- Options generated from the transfer list -->
						<option
							v-for="item in transferList"
							:value="item"
						>
							{{ item.nmbancoTransf }}
						</option>
					</select>
				</div>
				<!-- Display account details if an account is selected -->
				<div
					v-if="selectAccount !== undefined"
					class="bg-base-300 w-full p-2 rounded-box border border-primary flex flex-col justify-center items-start gap-2 text-neutral"
				>
					<p class="font-bold">
						{{ selectAccount.nmTitularCuentaTransf }}
					</p>
					<p class="text-sm">
						{{ selectAccount.rifTitularCuentaTransf }}
					</p>
					<p class="text-sm">
						{{ selectAccount.nuCuentaBancoTransf }}
					</p>
				</div>
				<!-- Input for the deposit amount -->
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text text-neutral">{{ $t('Monto') }}</span>
					</label>
					<input
						@keyup="onChangeValueDeposit(valueDeposit)"
						v-model="valueDeposit.input"
						type="number"
						class="input input-bordered w-full border-input-border bg-input-background text-neutral"
					/>
					<label class="label">
						<span
							v-if="valueDeposit.msg != ''"
							class="label-text-alt text-error"
							>{{ valueDeposit.msg }}</span
						>
					</label>
				</div>
				<!-- Input for the transfer reference -->
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text text-neutral">{{
							$t('Referencia de la transferencia')
						}}</span>
					</label>
					<input
						type="text"
						v-model="valueRef.input"
						@keyup="onChangeValueDeposit(valueRef)"
						class="input input-bordered w-full border-input-border bg-input-background text-neutral"
					/>
					<label class="label">
						<span
							v-if="valueRef.msg != ''"
							class="label-text-alt text-error"
							>{{ valueRef.msg }}</span
						>
					</label>
				</div>
				<!-- Input for the transfer date -->
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text text-neutral">{{
							$t('Fecha de transferencia')
						}}</span>
					</label>
					<input
						type="date"
						v-model="valueDate.input"
						@keyup="onChangeOperationDate(valueDate)"
						@change="onChangeOperationDate(valueDate)"
						class="input input-bordered w-full input_date border-input-border bg-input-background text-neutral"
					/>
					<label class="label">
						<span
							v-if="valueDate.msg != ''"
							class="label-text-alt text-error"
							>{{ valueDate.msg }}</span
						>
					</label>
				</div>
				<!-- Button to submit the deposit -->
				<div class="w-full flex justify-center items-center">
					<button
						@click="onSubmitDeposit()"
						:disabled="depositButtonDisabled"
						v-if="!loading"
						class="btn btn-primary text-neutral hover:bg-primary/50"
					>
						{{ $t('Depositar') }}
					</button>
					<!-- Loading button state -->
					<button
						v-else
						disabled
						class="btn text-white hover:bg-primary/50"
					>
						<svg
							aria-hidden="true"
							role="status"
							class="inline w-4 h-4 mr-3 text-white animate-spin"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						{{ $t('Depositar') }}
					</button>
				</div>
			</div>
		</article>
	</section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import ExitIcon from '@/components/icons/ExitIcon.vue';
export default defineComponent({
	components: { ExitIcon },
	setup() {
		return {};
	},
	data() {
		// Configuration and state variables for the component
		let config = this.$config();
		let appComponent: any = this.$appComponent;
		let depositButtonDisabled: boolean = true; // Button disabled state
		let depositBankDisabled: boolean = true; // Bank selection disabled state
		let selectAccount: any = undefined; // Selected bank account
		let transferList: any = undefined; // List of banks for transfer
		let loading: boolean = false; // Loading state for API calls
		let valueDeposit: any = {
			input: appComponent.pasarelaSelected['amountInit'], // Initial deposit amount
			msg: '', // Message for validation feedback
			color: '', // Color for validation feedback
			validate: false, // Validation state
		};
		let valueRef: any = {
			input: '', // Input for transfer reference
			msg: '', // Message for validation feedback
			color: '', // Color for validation feedback
			validate: false, // Validation state
		};
		let valueDate: any = {
			input: '', // Input for transfer date
			msg: '', // Message for validation feedback
			color: '', // Color for validation feedback
			validate: false, // Validation state
		};
		return {
			config,
			appComponent,
			depositButtonDisabled,
			depositBankDisabled,
			selectAccount,
			transferList,
			valueDeposit,
			valueRef,
			valueDate,
			loading,
		};
	},
	methods: {
		// Fetches the list of bank accounts for transfer
		getAccounts() {
			this.loading = true;
			let params = {
				type: 'getBank',
				productId: this.appComponent.pasarelaSelected['id'],
				site_id: '0',
				isMobile: '',
			};
			apiService
				.request('deposit_by_transfer', params)
				.then((response: any) => {
					if (response.code == 0) {
						this.transferList = response.data.result; // Set transfer list
						this.depositBankDisabled = false; // Enable bank selection
						this.loading = false; // Stop loading
					}
				});
		},
		// Validates the deposit value input
		onChangeValueDeposit(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Empty field message
				e.color = 'yellow-300'; // Warning color
				e.validate = false; // Set validation to false
			} else {
				e.msg = ''; // Clear message
				e.color = 'green-600'; // Success color
				e.validate = true; // Set validation to true
			}
			// Update button disabled state based on validation
			this.depositButtonDisabled = !(
				(this.valueDeposit.validate || this.valueDeposit.input > 0) &&
				this.valueRef.validate &&
				this.valueDate.validate
			);
		},
		// Validates the operation date input
		onChangeOperationDate(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Empty field message
				e.color = 'yellow-300'; // Warning color
				e.validate = false; // Set validation to false
			} else {
				e.msg = ''; // Clear message
				e.color = 'green-600'; // Success color
				e.validate = true; // Set validation to true
			}
			// Update button disabled state based on validation
			this.depositButtonDisabled = !(
				(this.valueDeposit.validate || this.valueDeposit.input > 0) &&
				this.valueRef.validate &&
				this.valueDate.validate
			);
		},
		// Submits the deposit request
		onSubmitDeposit() {
			this.loading = true; // Set loading state
			let params = {
				type: 'deposit',
				amount: this.valueDeposit.input, // Deposit amount
				bankId: this.selectAccount.idbancoTransf, // Selected bank ID
				date: this.valueDate.input, // Transfer date
				reference: this.valueRef.input, // Transfer reference
				productId: this.appComponent.pasarelaSelected['id'], // Product ID
			};
			apiService
				.request('deposit_by_transfer', params)
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modalTransferencia = false; // Close modal on success
						this.loading = false; // Stop loading
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Exito'), // Success title
							messageModal: this.$t(
								'El deposito ha sido generado' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Modal order
						};
					} else {
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'), // Error title
							messageModal: this.$t(response.data.result), // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Modal order
						};
						this.loading = false; // Stop loading on error
					}
				});
		},
	},
	mounted() {
		console.log(this.appComponent.pasarelaSelected['amountInit']); // Log initial amount
		this.getAccounts(); // Fetch bank accounts on mount
	},
});
</script>
<style scoped>
/* Custom styles for the date input calendar picker indicator */
.input_date[type='date']::-webkit-calendar-picker-indicator {
	background-color: #d1d5da; /* Background color for the indicator */
	border-radius: 10%; /* Rounded corners for the indicator */
	padding: 4px; /* Padding for the indicator */
}
</style>

<!-- FILE DOCUMENTED -->

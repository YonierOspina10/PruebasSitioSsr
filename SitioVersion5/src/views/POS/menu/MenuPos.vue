<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import CardInfo from '@/views/POS/components/CardInfo.vue';
import apiService from '@/services/ApiService';

/**
 * Component definition for cash flow summary.
 */
export default defineComponent({
	components: {
		CardInfo, // Registering CardInfo component for use in the template
	},
	data() {
		// Configuration and state initialization
		let config: any = this.$config(); // Fetching configuration
		let emitter: any = this.$emitter(); // Event emitter for communication
		let appComponent: any = this.$appComponent; // Reference to the app component
		let dataI = moment(new Date().toISOString()).format('YYYY-MM-DD'); // Initial start date
		let dataF = moment(new Date().toISOString()).format('YYYY-MM-DD'); // Initial end date
		let bets = 0; // Total bets
		let recharge = 0; // Total recharge
		let retirement = 0; // Total retirement
		let outputsCash = 0; // Total outputs in cash
		let balance = 0; // Current balance
		let flowCashSummary: any = []; // Summary of cash flow data
		return {
			config,
			appComponent,
			dataI,
			dataF,
			bets,
			recharge,
			retirement,
			outputsCash,
			balance,
			flowCashSummary,
			emitter,
		};
	},
	unmounted() {
		// Cleanup event listener on component unmount
		this.emitter.all.delete('accept:modal');
	},
	mounted() {
		// Set up event listener for modal acceptance
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal when event is triggered
		});
	},
	methods: {
		/**
		 * Formats a date string to a specified format.
		 * @param dateString - The date string to format.
		 * @param format - The format to apply.
		 * @returns Formatted date string.
		 */
		formatDate2(dateString: any, format: string) {
			const date = new Date(dateString);
			return moment(date).format(format); // Return formatted date
		},
		/**
		 * Closes the modal in the app component.
		 */
		closeModal() {
			this.appComponent.closeModal(); // Close modal
		},
		/**
		 * Submits the date range for cash flow summary retrieval.
		 */
		onSubmit() {
			let start_date = new Date(this.dataI); // Parse start date
			let end_date = new Date(this.dataF); // Parse end date
			let from_date_send = parseInt(
				start_date
					.setHours(start_date.getHours() + 24) // Adjust start date for API
					.toString()
					.slice(0, 10)
			);
			let to_date_send = parseInt(
				end_date
					.setHours(end_date.getHours() + 24) // Adjust end date for API
					.toString()
					.slice(0, 10)
			);
			const params = {
				type_report: '1', // Report type
				startDate: from_date_send, // Start date for API
				endDate: to_date_send, // End date for API
				count: 1000, // Number of records to fetch
				start: 0, // Starting index for records
			};
			console.log(params); // Log parameters for debugging
			apiService
				.request('get_flow_cash_summary', params) // API request for cash flow summary
				.then((response: any) => {
					if (response.code == 0) {
						// Successful response handling
						this.bets = 0;
						this.recharge = 0;
						this.retirement = 0;
						this.outputsCash = 0;
						this.balance = 0;
						this.flowCashSummary = response.data; // Store response data
						this.flowCashSummary.forEach((element) => {
							// Aggregate values from response
							this.bets =
								this.bets +
								parseFloat(element['valueInputCash']);
							this.recharge =
								this.recharge +
								parseFloat(element['valueInputsRecharge']);
							this.retirement =
								this.retirement +
								parseFloat(
									element['valueOutputsNotesRetirement']
								);
							this.outputsCash =
								this.outputsCash +
								parseFloat(element['valueOutputsCash']);
							this.balance =
								this.balance + parseFloat(element['balance']);
						});
					} else {
						// Error handling for unsuccessful response
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Modal type
							titleModal: this.$t('Error!'), // Modal title
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action on button click
						};
					}
				});
		},
	},
});
</script>

<template>
	<!-- Main container for the cash flow summary component -->
	<div class="relative bg-base-200">
		<div class="mx-auto w-full h-full pb-10">
			<div>
				<div class="pt-2 flex flex-wrap">
					<div class="w-full">
						<!-- Input fields for date range and submit button -->
						<div
							class="py-5 pl-1 flex items-center justify-center gap-4"
						>
							<input
								type="text"
								v-model="dataI"
								class="rounded-xl w-44 text-center text-neutral-content"
							/>
							<input
								type="text"
								v-model="dataF"
								class="rounded-xl w-44 text-center text-neutral-content"
							/>
							<button
								@click="onSubmit()"
								class="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-xl py-2 rounded shadow hover:shadow-md h-11 w-16"
							>
								<i class="fas fa-search"></i>
								<!-- Search icon -->
							</button>
						</div>
					</div>
					<div class="flex justify-center w-full lg:w-6/12 xl:w-3/12">
						<!-- Total balance display -->
						<div
							class="relative w-11/12 flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
						>
							<div class="flex-auto p-4">
								<div class="flex flex-wrap">
									<div
										class="relative w-full max-w-full flex-grow flex-1"
									>
										<h5
											class="text-neutral-content uppercase font-bold text-xs"
										>
											{{ $t('Saldo Total') }}
											<!-- Total balance label -->
										</h5>
										<span
											class="font-semibold text-xl text-neutral-content"
										>
											{{ appComponent.session.moneda }}
											<!-- Currency symbol -->
											{{
												Math.abs(
													parseFloat(
														appComponent.saldo_total
													)
												).toFixed(2)
											}}
										</span>
									</div>
									<div
										class="relative w-auto pl-4 flex-initial"
									>
										<div
											class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
											:class="'bg-green-400'"
										>
											<i :class="'fa fa-dollar'"></i>
											<!-- Dollar icon -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- CardInfo components for displaying various financial metrics -->
					<div class="w-full lg:w-6/12 xl:w-3/12">
						<CardInfo
							icon-c="fa fa-money-bill-transfer"
							title-c="Balance"
							:amount-c="balance"
							color-icon="bg-green-500"
							stat-arrow="up fill-green-500"
							:date-i="dataI"
							:date-f="dataF"
						/>
					</div>
					<div class="w-full lg:w-6/12 xl:w-3/12">
						<CardInfo
							icon-c="fa fa-soccer-ball "
							title-c="Apuestas"
							:amount-c="bets"
							color-icon="bg-orange-500"
							stat-arrow="up fill-green-500"
							:date-i="dataI"
							:date-f="dataF"
						/>
					</div>
					<div class="w-full lg:w-6/12 xl:w-3/12">
						<CardInfo
							icon-c="fa fa-arrows-up-to-line"
							title-c="Depósitos"
							:amount-c="recharge"
							color-icon="bg-orange-500"
							stat-arrow="up fill-green-500"
							:date-i="dataI"
							:date-f="dataF"
						/>
					</div>
					<div class="w-full lg:w-6/12 xl:w-3/12">
						<CardInfo
							icon-c="fa fa-arrows-down-to-line "
							title-c="Retiros"
							:amount-c="retirement"
							color-icon="bg-red-500"
							:date-i="dataI"
							:date-f="dataF"
						/>
					</div>
					<div class="w-full lg:w-6/12 xl:w-3/12">
						<CardInfo
							icon-c="fas fa-award"
							title-c="Premios"
							:amount-c="outputsCash"
							color-icon="bg-red-500"
							:date-i="dataI"
							:date-f="dataF"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

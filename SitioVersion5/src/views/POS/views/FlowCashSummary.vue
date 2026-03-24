<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the form component
import AppTable from '@/components/Table.vue'; // Importing the table component
import parseIsoDate from 'yup/lib/util/isodate'; // Importing a utility function to parse ISO dates

export default defineComponent({
	components: {
		AppTable, // Registering the AppTable component
		AppForm, // Registering the AppForm component
	},
	data() {
		// Defining reactive data properties for the component
		let config: any = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter: any = this.$emitter(); // Event emitter for communication
		let tableColumns: any = []; // Array to hold table column definitions
		let loadingTable: any = false; // Loading state for the table
		let flowCash: any = []; // Data for cash flow
		let loadingForm = true; // Loading state for the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Additional text for the form
		let fields: any =
			this.$config != undefined &&
			this.$config().pos != undefined &&
			this.$config().pos.flowCashSummary != undefined &&
			this.$config().pos.flowCashSummary.form != undefined &&
			this.$config().pos.flowCashSummary.form[
				this.$appComponent['country']
			] != undefined
				? this.$config().pos.flowCashSummary.form[
						this.$appComponent['country']
					]
				: []; // Fields for the form based on configuration
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
		let resetForm = true; // State to reset the form
		return {
			config,
			appComponent,
			emitter,
			loadingForm,
			titleForm,
			textDownForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			widthForm,
			refreshBalance,
			resetForm,
			tableColumns,
			flowCash,
			loadingTable,
		};
	},
	unmounted() {
		// Cleanup when the component is unmounted
		this.emitter.all.delete('accept:modal'); // Remove event listener for modal acceptance
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal on event
		});
		this.fields.forEach((field) => {
			// Iterate over form fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assign options to the corresponding key
				Object.assign(this.arraySelects, options); // Merge options into arraySelects
			}
		});
		if (
			this.config != undefined &&
			this.config.pos != undefined &&
			this.config.pos.flowCashSummary.tableColumns != undefined &&
			this.config.pos.flowCashSummary.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.pos.flowCashSummary.tableColumns[
					this.appComponent.country
				]; // Set table columns based on configuration
		}
		console.log(this.tableColumns); // Log the table columns for debugging
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let frontDate = parseIsoDate(values.frontDate); // Parse front date
			let date = new Date(frontDate); // Convert to Date object
			let frontD: any;
			let toDate = parseIsoDate(values.toDate); // Parse to date
			let tDate = new Date(toDate); // Convert to Date object
			let toD: any;
			if (this.appComponent.pwa) {
				// Check if the app is a PWA
				frontD = parseInt(
					date.setHours(date.getHours()).toString().slice(0, 10)
				); // Set front date for PWA
				toD = parseInt(
					tDate.setHours(tDate.getHours()).toString().slice(0, 10)
				); // Set to date for PWA
			} else {
				frontD = parseInt(
					date
						.setHours(date.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Set front date for non-PWA
				toD = parseInt(
					tDate
						.setHours(tDate.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Set to date for non-PWA
			}
			let params: any = {
				startDate: frontD, // Start date parameter
				endDate: toD, // End date parameter
				count: 10, // Count parameter for request
			};
			console.log(params); // Log parameters for debugging
			apiService
				.request('get_flow_cash_summary', params) // Make API request
				.then((response: any) => {
					if (response.code == 0) {
						// Handle successful response
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							); // Translate error message based on error code
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Modal title
							messageModal: error_mensaje, // Modal message
							buttonModal: this.$t('Aceptar'), // Modal button text
							orderModal: 'closeModal', // Order for modal action
						};
					}
				});
		},
		changeSelect: function (event: any) {
			// Method to handle changes in select inputs
		},
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close modal action
		},
		acceptModal() {
			// Method to accept modal actions
			if (this.appComponent.modal.orderModal == 'acceptExclusion') {
				let param = {
					auth_token: localStorage.getItem('auth_token'), // Get auth token from local storage
				};
				apiService
					.request('restore_login_site', param) // Make API request to restore login
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Mensaje'), // Modal title
								messageModal: this.$t(
									'Se aplicó la Autoexclusion correctamente.'
								), // Modal message
								buttonModal: this.$t('Aceptar'), // Modal button text
								orderModal: 'acceptExclusion', // Order for modal action
							};
						}
					});
			}
			this.appComponent.closeModal(); // Close modal action
		},
	},
	updated() {
		// Lifecycle hook called after the component is updated
		setTimeout(() => {
			this.resetForm = true; // Reset form state after a delay
		}, 200);
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<!-- Framework container for the InfoPage -->
	<div
		class="Framework InfoPage mi-cuenta overflow-y-hidden bg-neutral-content"
		v-if="appComponent.session.logueado"
	>
		<!-- Box container for the content -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1 flex items-center justify-center">
						<span
							class="font-bold text-3xl"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-primary'
									: 'text-neutral'
							"
							>{{ $t('F.C. Resumido') }}</span
						>
					</span>
				</div>
				<!-- Row container for form and table -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<!-- Box content for terms and help -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Container for form -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200 text-neutral'
									: 'bg-neutral text-neutral-content'
							"
						>
							<AppForm
								v-if="resetForm"
								:loading="loadingForm"
								:title="titleForm"
								:fields="fields"
								:styleWidth="widthForm"
								:arraySelects="arraySelects"
								:model="model"
								:textDown="textDownForm"
								:textButton="'BUSCAR'"
								@onSubmit:form="onSubmit($event)"
								@changeSelect:form="changeSelect($event)"
							/>
						</div>
						<!-- Table container for displaying data -->
						<div
							class="table-grid p-5 pb-20 rounded-xl shadow-md"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200'
									: 'bg-neutral'
							"
						>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="flowCash"
									:loading="loadingTable"
								/>
							</div>
						</div>
					</div>
					<!-- Gradient background at the bottom -->
					<div
						class="absolute -bottom-2 w-full h-24 bg-gradient-to-t from-neutral-content"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

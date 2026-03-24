<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import AppTable from '@/components/Table.vue'; // Importing the AppTable component
import parseIsoDate from 'yup/lib/util/isodate'; // Importing a utility function to parse ISO dates

export default defineComponent({
	components: {
		AppTable, // Registering the AppTable component
		AppForm, // Registering the AppForm component
	},
	data() {
		let config: any = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let emitter = this.$emitter(); // Getting the event emitter
		let tableColumns: any = []; // Initializing an array for table columns
		let loadingTable: any = false; // State to track loading status of the table
		let flowCash: any = []; // Array to hold flow cash data
		let loadingForm = true; // State to track loading status of the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text to display below the form
		let fields: any =
			this.$config != undefined &&
			this.$config().pos != undefined &&
			this.$config().pos.flowCash != undefined &&
			this.$config().pos.flowCash.form != undefined &&
			this.$config().pos.flowCash.form[this.$appComponent['country']] !=
				undefined
				? this.$config().pos.flowCash.form[
						this.$appComponent['country']
					]
				: []; // Retrieving form fields based on country configuration
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
		let resetForm = true; // State to track if the form should be reset
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
		}; // Returning data properties for the component
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing modal on event trigger
		});
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to the select field
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		if (
			this.config != undefined &&
			this.config.pos != undefined &&
			this.config.pos.flowCash.tableColumns != undefined &&
			this.config.pos.flowCash.tableColumns[this.appComponent.country] !=
				undefined
		) {
			this.tableColumns =
				this.config.pos.flowCash.tableColumns[
					this.appComponent.country
				]; // Setting table columns based on country configuration
		}
		console.log(this.tableColumns); // Logging table columns for debugging
	},
	methods: {
		onSubmit(values: any) {
			let frontDate = parseIsoDate(values.frontDate); // Parsing front date from form values
			let date = new Date(frontDate); // Creating a Date object from front date
			let frontD: any;
			let toDate = parseIsoDate(values.toDate); // Parsing to date from form values
			let tDate = new Date(toDate); // Creating a Date object from to date
			let toD: any;
			if (this.appComponent.pwa) {
				frontD = parseInt(
					date.setHours(date.getHours()).toString().slice(0, 10)
				); // Adjusting front date for PWA
				toD = parseInt(
					tDate.setHours(tDate.getHours()).toString().slice(0, 10)
				); // Adjusting to date for PWA
			} else {
				frontD = parseInt(
					date
						.setHours(date.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Adjusting front date for non-PWA
				toD = parseInt(
					tDate
						.setHours(tDate.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Adjusting to date for non-PWA
			}
			let params: any = {
				ticketId: values.ticketId, // Ticket ID from form values
				startDate: frontD, // Start date for the request
				endDate: toD, // End date for the request
				count: 10, // Count parameter for the request
			};
			console.log(params); // Logging parameters for debugging
			apiService
				.request('get_flow_cash', params) // Making API request to get flow cash
				.then((response: any) => {
					if (response.code == 0) {
						// Handle successful response
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							); // Translating error message based on error code
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.modal = {
							showModal: 'notification', // Modal configuration for error notification
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Message to display in the modal
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Order for closing the modal
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for change select event
		closeModal() {
			this.appComponent.closeModal(); // Method to close the modal
		},
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'acceptExclusion') {
				let param = {
					auth_token: localStorage.getItem('auth_token'), // Retrieving auth token from local storage
				};
				apiService
					.request('restore_login_site', param) // Making API request to restore login
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification', // Modal configuration for success notification
								titleModal: this.$t('Mensaje'), // Title for the modal
								messageModal: this.$t(
									'Se aplicó la Autoexclusion correctamente.'
								), // Success message
								buttonModal: this.$t('Aceptar'), // Button text for the modal
								orderModal: 'acceptExclusion', // Order for accepting exclusion
							};
						}
					});
			}
			this.appComponent.closeModal(); // Closing the modal
		},
	},
	updated() {
		setTimeout(() => {
			this.resetForm = true; // Resetting the form state after update
		}, 200);
	},
});
</script>
<template>
	<!-- Header section for layout 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<!-- Main container for the InfoPage, visible if user is logged in -->
	<div
		class="Framework InfoPage mi-cuenta overflow-y-hidden bg-neutral-content"
		v-if="appComponent.session.logueado"
	>
		<!-- Box for displaying information -->
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
							>{{ $t('Flujo de caja') }}</span
						>
					</span>
				</div>
				<!-- Row for content layout -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<!-- Box for terms and help content -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Container for info content -->
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
						<!-- Table container for displaying flow cash data -->
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
					<!-- Gradient background at the bottom of the page -->
					<div
						class="absolute -bottom-2 w-full h-24 bg-gradient-to-t from-neutral-content"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

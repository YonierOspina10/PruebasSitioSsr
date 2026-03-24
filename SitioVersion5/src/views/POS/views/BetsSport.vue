<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import apiService from '@/services/ApiService'; // Importing API service for requests
import parseIsoDate from 'yup/lib/util/isodate'; // Importing date parsing utility

export default defineComponent({
	components: {
		VPagination, // Registering VPagination component
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
		AppTable, // Registering AppTable component
	},
	data() {
		let config: any = this.$config(); // Retrieving configuration
		let emitter: any = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let loadingForm = true; // State for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text below the form
		let tableColumns: any = []; // Columns for the table
		let selfExclusion: any = []; // Data for self-exclusion
		let itemSelect: any = {}; // Selected item
		let fields: any =
			this.$config != undefined &&
			this.$config().pos != undefined &&
			this.$config().pos.betsSport != undefined &&
			this.$config().pos.betsSport.form != undefined &&
			this.$config().pos.betsSport.form[this.$appComponent['country']] !=
				undefined
				? this.$config().pos.betsSport.form[
						this.$appComponent['country']
					]
				: []; // Fields for the form based on configuration
		let arraySelects: any = {}; // Array for select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
		let totalCount: any = 0; // Total count for pagination
		let pages: any; // Pages for pagination
		let loadingTable: any = false; // State for loading table
		let page: any; // Current page
		let page2: any; // Secondary page
		let filtro_nota: any = ''; // Filter for notes
		let resetForm = true; // State to reset form
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			loadingForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			titleForm,
			textDownForm,
			widthForm,
			tableColumns,
			selfExclusion,
			totalCount,
			pages,
			loadingTable,
			page,
			filtro_nota,
			page2,
			itemSelect,
			resetForm,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Event listener for modal acceptance
			this.appComponent.closeModal(); // Close modal on event
		});
		this.fields.forEach((field) => {
			// Iterate over fields to populate select options
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
			this.config.pos.betsSport.tableColumns != undefined &&
			this.config.pos.betsSport.tableColumns[this.appComponent.country] !=
				undefined
		) {
			this.tableColumns =
				this.config.pos.betsSport.tableColumns[
					this.appComponent.country
				]; // Set table columns based on configuration
		}
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let frontDate = parseIsoDate(values.frontDate); // Parse front date
			let date = new Date(frontDate); // Create date object from front date
			let frontD: any;
			let toDate = parseIsoDate(values.toDate); // Parse to date
			let tDate = new Date(toDate); // Create date object from to date
			let toD: any;
			if (values.periodId != '0') {
				// Check if periodId is not zero
				frontD = parseInt(
					date.setHours(date.getHours()).toString().slice(0, 10)
				); // Set front date hours and convert to integer
				toD = parseInt(
					tDate.setHours(tDate.getHours()).toString().slice(0, 10)
				); // Set to date hours and convert to integer
			} else {
				frontD = parseInt(
					date
						.setHours(date.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Adjust front date for periodId zero
				toD = parseInt(
					tDate
						.setHours(tDate.getHours() + 24)
						.toString()
						.slice(0, 10)
				); // Adjust to date for periodId zero
			}
			let params: any = {
				where: {
					bet_id: values.betId, // Bet ID for the request
					from_date: frontD, // Front date for the request
					to_date: toD, // To date for the request
				},
			};
			apiService.request('bet_history', params).then((response: any) => {
				// API request for bet history
				if (response.code == 0) {
					this.selfExclusion = response.data.bets; // Set selfExclusion data on success
				} else {
					var error_mensaje = ''; // Initialize error message
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
						// Set modal properties for error notification
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
				}
			});
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal(); // Close modal
		},
		acceptModal() {
			// Method to accept modal
			this.appComponent.closeModal(); // Close modal
		},
	},
	updated() {
		setTimeout(() => {
			// Reset form state after update
			this.resetForm = true; // Reset form state
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
	<!-- Main content area for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta overflow-y-hidden bg-neutral-content"
		v-if="appComponent.session.logueado"
	>
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
							>{{ $t('Deportivas') }}</span
						>
					</span>
				</div>
				<!-- Content area for form and table -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Form container -->
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
						<!-- Table container for displaying self-exclusion data -->
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
									:data="selfExclusion"
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

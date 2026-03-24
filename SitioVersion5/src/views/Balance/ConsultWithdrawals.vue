<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing useCookies for cookie management
import { defineComponent } from 'vue'; // Importing defineComponent to create a Vue component
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import apiService from '@/services/ApiService'; // Importing apiService for API requests
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import moment from 'moment'; // Importing moment.js for date manipulation

export default defineComponent({
	components: { MenuUser, MenuUser3, AppForm, AppTable, VPagination }, // Registering components
	data() {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving app component reference
		let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
		let data: any = []; // Data array for storing withdrawal requests
		let titleForm: string = ''; // Title for the form
		let widthForm: any = {}; // Width configuration for the form
		let textDownForm: string = ''; // Additional text for the form
		let fields: any =
			this.$config().consultWithdrawals.form[
				this.$appComponent['country']
			]; // Fields configuration based on country
		let arraySelects: any = {}; // Object for storing select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let page: any = 0; // Current page for pagination
		let page2: any; // Second page variable for pagination
		let pages: any; // Total number of pages
		let totalCount: any = 0; // Total count of withdrawal requests
		let itemSelect: any = {}; // Selected item object
		let tableColumns: any = []; // Columns configuration for the table
		let loadingTable: boolean = false; // Loading state for the table
		let loadingForm = true; // Loading state for the form
		let fontColorForm: string = ''; // Font color for the form
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			data,
			titleForm,
			widthForm,
			textDownForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			page,
			page2,
			totalCount,
			pages,
			itemSelect,
			tableColumns,
			loadingTable,
			loadingForm,
			fontColorForm,
		};
	},
	setup() {
		const { cookies } = useCookies(); // Setting up cookies for the component
		return { cookies }; // Returning cookies for use in the template
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Listening for 'accept:modal' event
			this.acceptModal(); // Calling acceptModal method on event
		});
		if (
			this.config != undefined &&
			this.config.retiros != undefined &&
			this.config.consultWithdrawals.tableColumns != undefined &&
			this.config.consultWithdrawals.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.consultWithdrawals.tableColumns[
					this.appComponent.country
				]; // Setting table columns based on configuration
		}
		this.fields.forEach((field) => {
			// Iterating over form fields
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					// Iterating over options for select fields
					opt.Id = opt.value; // Setting Id for option
					opt.Name = opt.name; // Setting Name for option
				});
				let options: object = {}; // Creating options object
				options[field.optionsKey] = field.options; // Assigning options to the key
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		this.model.fecha_ini = moment(new Date()).format('YYYY-MM-DD'); // Setting initial start date
		this.model.fecha_fin = moment(new Date()).format('YYYY-MM-DD'); // Setting initial end date
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning model for initial state
		if (
			this.appComponent.config['consultWithdrawals'] != undefined &&
			this.appComponent.config['consultWithdrawals']['fontColorForm'] !=
				undefined
		) {
			this.fontColorForm =
				this.appComponent.config['consultWithdrawals']['fontColorForm']; // Setting font color from config
		}
	},
	methods: {
		acceptModal() {
			this.appComponent.closeModal(); // Closing modal from app component
		},
		getData() {
			let from_date = new Date(this.model.fecha_ini); // Parsing start date
			let to_date = new Date(this.model.fecha_fin); // Parsing end date
			let from_date_send = parseInt(
				from_date
					.setHours(from_date.getHours() + 24)
					.toString()
					.slice(0, 10)
			); // Preparing start date for API request
			let to_date_send = parseInt(
				to_date
					.setHours(to_date.getHours() + 24)
					.toString()
					.slice(0, 10)
			); // Preparing end date for API request
			const params = {
				from_date: from_date_send, // Start date parameter
				to_date: to_date_send, // End date parameter
				count: 10, // Number of items to fetch
				start: this.page * 10, // Pagination start index
			};
			this.loadingTable = true; // Setting loading state for table
			apiService
				.request('get_withdrawals', params) // Making API request for withdrawals
				.then((response: any) => {
					if (response.code == 0) {
						// Checking response code
						for (
							var i = 0;
							i <
							response.data.withdrawal_requests.request.length;
							i++
						) {
							response.data.withdrawal_requests.request[
								i
							].cuenta_id =
								response.data.withdrawal_requests.request[i].id; // Mapping account ID
							response.data.withdrawal_requests.request[
								i
							].estado =
								response.data.withdrawal_requests.request[
									i
								].status; // Mapping status
							response.data.withdrawal_requests.request[i].medio =
								response.data.withdrawal_requests.request[
									i
								].payment_system_name; // Mapping payment system name
							response.data.withdrawal_requests.request[
								i
							].fecha_crea =
								response.data.withdrawal_requests.request[
									i
								].date; // Mapping creation date
							response.data.withdrawal_requests.request[
								i
							].fecha_pago =
								response.data.withdrawal_requests.request[
									i
								].date_payment; // Mapping payment date
							response.data.withdrawal_requests.request[i].valor =
								response.data.withdrawal_requests.request[
									i
								].amount; // Mapping amount
							response.data.withdrawal_requests.request[
								i
							].moneda = this.appComponent.session.moneda; // Mapping currency
							if (
								response.data.withdrawal_requests.request[i]
									.estado == '0'
							) {
								response.data.withdrawal_requests.request[
									i
								].estado = this.$t('Activo'); // Translating status to 'Active'
							} else {
								if (
									response.data.withdrawal_requests.request[i]
										.estado == '3'
								) {
									response.data.withdrawal_requests.request[
										i
									].estado = this.$t('Pagado'); // Translating status to 'Paid'
								} else {
									if (
										response.data.withdrawal_requests
											.request[i].estado == '-1'
									) {
										response.data.withdrawal_requests.request[
											i
										].estado = this.$t('Cancelado'); // Translating status to 'Cancelled'
									} else {
										if (
											response.data.withdrawal_requests
												.request[i].estado == '4'
										) {
											response.data.withdrawal_requests.request[
												i
											].estado = this.$t('Rechazado'); // Translating status to 'Rejected'
										}
									}
								}
							}
						}
						this.data = JSON.parse(
							JSON.stringify(
								response.data.withdrawal_requests.request
							)
						); // Storing withdrawal requests data
						this.totalCount = parseInt(response.total_count); // Storing total count of requests
						this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
						this.pages = parseInt(this.pages) + 1; // Adjusting total pages
						this.loadingTable = false; // Resetting loading state for table
					}
				});
		},
		updateHandler(handler: any) {
			this.page = handler - 1; // Updating current page based on handler
			this.getData(); // Fetching data for the updated page
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting current page
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.consultWithdrawals.tableColumns != undefined &&
				this.config.consultWithdrawals.tableColumns[
					this.appComponent.country
				] != undefined
			) {
				this.tableColumns =
					this.config.consultWithdrawals.tableColumns[
						this.appComponent.country
					]; // Updating table columns based on configuration
			}
			this.getData(); // Fetching data
		},
		buttonAction(item) {}, // Placeholder for button action method
	},
});
</script>
<template>
	<!-- Header section for the layout -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header h-[65px] bg-base-200 absolute w-full"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content container for the InfoPage -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Consulta de retiros') }}</span
						>
					</span>
				</div>
				<!-- Menu and form container -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'consulta_retiros'"
						:MENU_ID="'5'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'consulta_tickets_casino'"
						:MENU_ID="'5'"
					/>
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
							class="Container InfoContent mb-5 shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'rounded-b-xl'
									: 'rounded-xl'
							"
						>
							<AppForm
								:loading="loadingForm"
								:title="titleForm"
								:fields="fields"
								:styleWidth="widthForm"
								:arraySelects="arraySelects"
								:model="model"
								:fontColorForm="fontColorForm"
								:textDown="textDownForm"
								:textButton="'Buscar'"
								@onSubmit:form="getData()"
							/>
						</div>
						<!-- Table container -->
						<div
							class="table-grid p-5 rounded-xl shadow-md bg-base-400"

						>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="data"
									:loading="loadingTable"
									@button:action="buttonAction($event)"
								/>
							</div>
							<!-- Pagination component -->
							<v-pagination
								v-if="totalCount > 0"
								v-model="page2"
								:pages="pages"
								:range-size="1"
								active-color="#DCEDFF"
                                :class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
								@update:modelValue="updateHandler"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

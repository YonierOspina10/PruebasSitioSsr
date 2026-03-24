<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing cookie management library
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import apiService from '@/services/ApiService'; // Importing API service for data fetching
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import moment from 'moment'; // Importing moment.js for date manipulation

export default defineComponent({
	components: { MenuUser, MenuUser3, AppForm, AppTable, VPagination }, // Registering components
	data() {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
		let data: any = []; // Initializing data array
		let titleForm: string = ''; // Initializing form title
		let widthForm: any = {}; // Initializing form width
		let textDownForm: string = ''; // Initializing text below form
		let fields: any =
			this.$config().consultDeposits.form[this.$appComponent['country']]; // Retrieving form fields based on country
		let arraySelects: any = {}; // Initializing array for select options
		let model: any = {}; // Initializing model for form data
		let modelInitial: any = {}; // Initializing initial model for form data
		let page: any = 0; // Initializing current page
		let page2: any; // Initializing secondary page variable
		let pages: any; // Initializing total pages variable
		let totalCount: any = 0; // Initializing total count of items
		let itemSelect: any = {}; // Initializing selected item
		let tableColumns: any = []; // Initializing table columns
		let loadingTable: boolean = false; // Initializing loading state for table
		let loadingForm = true; // Initializing loading state for form
		let fontColorForm: string = ''; // Initializing font color for form
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
			// Setting up event listener for modal acceptance
			this.acceptModal();
		});
		if (
			this.config != undefined &&
			this.config.retiros != undefined &&
			this.config.consultDeposits.tableColumns != undefined &&
			this.config.consultDeposits.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.consultDeposits.tableColumns[
					this.appComponent.country
				]; // Setting table columns based on configuration
		}
		this.fields.forEach((field) => {
			// Iterating over form fields to process select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					// Assigning Id and Name to each option
					opt.Id = opt.value;
					opt.Name = opt.name;
				});
				let options: object = {};
				options[field.optionsKey] = field.options; // Creating options object for select
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		this.model.fecha_ini = moment(new Date()).format('YYYY-MM-DD'); // Setting initial start date
		this.model.fecha_fin = moment(new Date()).format('YYYY-MM-DD'); // Setting initial end date
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning model for initial state
		if (
			this.appComponent.config['consultDeposits'] != undefined &&
			this.appComponent.config['consultDeposits']['fontColorForm'] !=
				undefined
		) {
			this.fontColorForm =
				this.appComponent.config['consultDeposits']['fontColorForm']; // Setting font color from configuration
		}
	},
	methods: {
		acceptModal() {
			this.appComponent.closeModal(); // Closing modal on acceptance
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
				from_date: from_date_send,
				to_date: to_date_send,
				count: 10, // Number of items per page
				start: this.page * 10, // Calculating start index for pagination
			};
			this.loadingTable = true; // Setting loading state for table
			apiService.request('get_deposits', params).then((response: any) => {
				// Fetching data from API
				if (response.code == 0) {
					for (
						var i = 0;
						i < response.data.deposits_requests.request.length;
						i++
					) {
						// Processing each deposit request
						response.data.deposits_requests.request[i].recarga_id =
							response.data.deposits_requests.request[i].Id; // Mapping Id to recarga_id
						response.data.deposits_requests.request[i].fecha_crea =
							response.data.deposits_requests.request[i].date; // Mapping date to fecha_crea
						response.data.deposits_requests.request[i].medio =
							response.data.deposits_requests.request[
								i
							].paymentMethod; // Mapping payment method
						response.data.deposits_requests.request[i].proveedor =
							response.data.deposits_requests.request[
								i
							].externalId; // Mapping external ID to proveedor
						response.data.deposits_requests.request[i].valor =
							response.data.deposits_requests.request[i].amount; // Mapping amount to valor
						response.data.deposits_requests.request[
							i
						].valor_promocional =
							response.data.deposits_requests.request[i].bonus; // Mapping bonus to valor_promocional
						response.data.deposits_requests.request[i].total =
							response.data.deposits_requests.request[i].total; // Mapping total
						response.data.deposits_requests.request[i].moneda =
							this.appComponent.session.moneda; // Setting currency from session
					}
					this.data = JSON.parse(
						JSON.stringify(response.data.deposits_requests.request)
					); // Storing fetched data
					this.totalCount = parseInt(response.total_count); // Storing total count of items
					this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
					this.pages = parseInt(this.pages) + 1; // Adjusting for pagination
					this.loadingTable = false; // Resetting loading state for table
				}
			});
		},
		updateHandler(handler: any) {
			this.page = handler - 1; // Updating current page based on pagination
			this.getData(); // Fetching data for the new page
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting current page
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.consultDeposits.tableColumns != undefined &&
				this.config.consultDeposits.tableColumns[
					this.appComponent.country
				] != undefined
			) {
				this.tableColumns =
					this.config.consultDeposits.tableColumns[
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
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content area for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title section -->
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

							>{{ $t('Consulta de depósitos') }}</span
						>
					</span>
				</div>
				<!-- User menu and form section -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'consulta_depositos'"
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
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<!-- Form for deposit consultation -->
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
						<!-- Table for displaying deposit data -->
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

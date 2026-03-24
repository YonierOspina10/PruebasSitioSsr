<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing cookie management from vue3-cookies
import { defineComponent } from 'vue'; // Importing defineComponent for Vue component definition
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import apiService from '@/services/ApiService'; // Importing API service for backend requests
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
		let bets: any = []; // Initializing bets array
		let titleForm: string = ''; // Initializing title for the form
		let widthForm: any = {}; // Initializing width for the form
		let textDownForm: string = ''; // Initializing text below the form
		let fields: any =
			this.$config().consultCasinoTickets.form[
				this.$appComponent['country']
			]; // Retrieving form fields based on country
		let arraySelects: any = {}; // Initializing array for select options
		let model: any = {}; // Initializing model for form data
		let modelInitial: any = {}; // Initializing initial model for form data
		let page: any = 0; // Initializing current page
		let page2: any; // Initializing second page variable
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
			bets,
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
		console.log(this.$appComponent['country'], 'COUNTRY'); // Logging the country for debugging
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Listening for modal acceptance event
		});
		if (
			this.config != undefined &&
			this.config.retiros != undefined &&
			this.config.consultCasinoTickets.tableColumns != undefined &&
			this.config.consultCasinoTickets.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.consultCasinoTickets.tableColumns[
					this.appComponent.country
				]; // Setting table columns based on configuration
		}
		if (
			this.appComponent.config['consultCasinoTickets'] != undefined &&
			this.appComponent.config['consultCasinoTickets']['fontColorForm'] !=
				undefined
		) {
			this.fontColorForm =
				this.appComponent.config['consultCasinoTickets'][
					'fontColorForm'
				]; // Setting font color for the form
		}
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					opt.Id = opt.value; // Mapping option value to Id
					opt.Name = opt.name; // Mapping option name
				});
				let options: object = {};
				options[field.optionsKey] = field.options; // Creating options object
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		this.model.fecha_ini = moment(new Date()).format('YYYY-MM-DD'); // Setting initial start date
		this.model.fecha_fin = moment(new Date()).format('YYYY-MM-DD'); // Setting initial end date
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning the model for initial state
	},
	methods: {
		acceptModal() {
			this.appComponent.closeModal(); // Closing the modal
		},
		getTickets() {
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
				where: {
					from_date: from_date_send,
					to_date: to_date_send,
				},
				count: 10, // Number of items to fetch
				start: this.page * 10, // Pagination start index
			};
			this.loadingTable = true; // Setting loading state for table
			apiService
				.request('bet_casino_history', params) // Making API request
				.then((response: any) => {
					if (response.code == 0) {
						for (var i = 0; i < response.data.bets.length; i++) {
							response.data.bets[i].ticket_id =
								response.data.bets[i].Id; // Mapping Id to ticket_id
							response.data.bets[i].categoria =
								response.data.bets[i].category; // Mapping category
							response.data.bets[i].juego =
								response.data.bets[i].game; // Mapping game
							response.data.bets[i].fecha_crea =
								response.data.bets[i].date; // Mapping creation date
							response.data.bets[i].vlr_apuesta =
								response.data.bets[i].bet; // Mapping bet value
							response.data.bets[i].vlr_premio =
								response.data.bets[i].win; // Mapping win value
							response.data.bets[i].moneda =
								this.appComponent.session.moneda; // Mapping currency
							response.data.bets[i].estado =
								response.data.bets[i].state; // Mapping state
							if (response.data.bets[i].estado == '0') {
								response.data.bets[i].estado =
									this.$t('Pendiente'); // Translating state
							} else {
								if (response.data.bets[i].estado == '1') {
									response.data.bets[i].estado =
										this.$t('Perdida'); // Translating state
								} else {
									if (response.data.bets[i].estado == '2') {
										response.data.bets[i].estado =
											this.$t('Devuelta'); // Translating state
									} else {
										if (
											response.data.bets[i].estado == '3'
										) {
											response.data.bets[i].estado =
												this.$t('Ganada'); // Translating state
										}
									}
								}
							}
						}
						this.bets = JSON.parse(
							JSON.stringify(response.data.bets)
						); // Storing bets data
						this.totalCount = parseInt(response.total_count); // Storing total count
						this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
						this.pages = parseInt(this.pages) + 1; // Adjusting total pages
						this.loadingTable = false; // Resetting loading state for table
					}
				});
		},
		updateHandler(handler: any) {
			this.page = handler - 1; // Updating current page based on handler
			this.getTickets(); // Fetching tickets for the updated page
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting current page
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.consultCasinoTickets.tableColumns != undefined &&
				this.config.consultCasinoTickets.tableColumns[
					this.appComponent.country
				] != undefined
			) {
				this.tableColumns =
					this.config.consultCasinoTickets.tableColumns[
						this.appComponent.country
					]; // Updating table columns based on configuration
			}
			this.getTickets(); // Fetching tickets
		},
		onSubmit(values: any) {
			console.log(values); // Logging submitted values
			console.log(this.model); // Logging current model state
		},
		buttonAction(item) {}, // Placeholder for button action
	},
});
</script>
<template>
	<!-- Header section based on layout configuration -->
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

							>{{ $t('Consulta tickets casino') }}</span
						>
					</span>
				</div>
				<!-- Menu and content area -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'consulta_tickets_casino'"
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
						<!-- Form for ticket consultation -->
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
								@onSubmit:form="getTickets()"
							/>
						</div>
						<!-- Table for displaying ticket data -->
						<div
							class="table-grid p-5 rounded-xl shadow-md bg-base-400"
						>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="bets"
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

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import apiService from '@/services/ApiService'; // Importing apiService for API requests
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import router from '@/router'; // Importing router for navigation

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppTable, // Registering AppTable component
		AppForm, // Registering AppForm component
		VPagination, // Registering VPagination component
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving app component
		let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
		let bonuses: any = []; // Initializing bonuses array
		let filter: any = 'A'; // Initializing filter with default value
		let titleForm: string = ''; // Initializing title for the form
		let widthForm: any = {}; // Initializing width for the form
		let textDownForm: string = ''; // Initializing text below the form
		let fields: any =
			this.$config().myBonus.form[this.$appComponent['country']]; // Retrieving form fields based on country
		let arraySelects: any = {}; // Initializing array for select options
		let model: any = {}; // Initializing model for form data
		let modelInitial: any = {}; // Initializing initial model for form data
		let page: any = 0; // Initializing current page
		let page2: any; // Initializing second page variable
		let pages: any; // Initializing total pages variable
		let totalCount: any = 0; // Initializing total count of bonuses
		let itemSelect: any = {}; // Initializing selected item
		let tableColumns: any = []; // Initializing table columns
		let loadingTable: boolean = false; // Initializing loading state for table
		let loadingForm = true; // Initializing loading state for form
		let fontColorForm: string = ''; // Initializing font color for form
		let recaptcha: boolean =
			this.$config().myBonus.recaptcha != undefined &&
			this.$config().myBonus.recaptcha.show != undefined
				? this.$config().myBonus.recaptcha.show
				: false; // Flag for reCAPTCHA visibility
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			bonuses,
			filter,
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
			recaptcha
		};
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
			this.config.myBonus != undefined &&
			this.config.myBonus.tableColumns != undefined &&
			this.config.myBonus.tableColumns[this.appComponent.country] !=
				undefined
		) {
			this.tableColumns =
				this.config.myBonus.tableColumns[this.appComponent.country]; // Setting table columns based on configuration
		}
		this.fields.forEach((field) => {
			// Iterating over form fields
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					// Iterating over options to set Id and Name
					opt.Id = opt.value;
					opt.Name = opt.name;
				});
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to arraySelects
				Object.assign(this.arraySelects, options);
			}
		});
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning the initial model
		this.getBonus(this.filter); // Fetching bonuses based on the filter
		if (
			this.appComponent.config['myBonus'] != undefined &&
			this.appComponent.config['myBonus']['fontColorForm'] != undefined
		) {
			this.fontColorForm =
				this.appComponent.config['myBonus']['fontColorForm']; // Setting font color for form
		}
	},
	methods: {
		acceptModal() {
			this.appComponent.closeModal(); // Closing the modal
		},
		getBonus(state) {
			const params = {
				state: state, // Setting state parameter for API request
				count: 10, // Setting count for pagination
				start: this.page * 10, // Calculating start index for pagination
			};
			this.loadingTable = true; // Setting loading state for table
			apiService
				.request('get_my_bonuses', params) // Making API request to fetch bonuses
				.then((response: any) => {
					if (response.code == 0) {
						for (var i = 0; i < response.data.length; i++) {
							// Iterating over response data
							response.data[i].id = response.data[i].bonus_id; // Mapping bonus_id to id
							response.data[i].prom_id = response.data[i].prom_id; // Mapping prom_id
							response.data[i].tipo = response.data[i].bonus_type; // Mapping bonus_type to tipo
							response.data[i].fecha_creacion =
								response.data[i].creation_date; // Mapping creation_date
							response.data[i].fecha_expiracion =
								response.data[i].expiration_date; // Mapping expiration_date
							response.data[i].valor_bono =
								response.data[i].bonus_value; // Mapping bonus_value
							response.data[i].rollower =
								response.data[i].rollower; // Mapping rollower
							response.data[i].apuestas = response.data[i].bets; // Mapping bets
							response.data[i].rollower_faltante =
								response.data[i].missing_rollower; // Mapping missing_rollower
							if (response.data[i].bonus_type == '2') {
								response.data[i].tipo =
									this.$t('Bono depósito'); // Translating bonus type
							} else {
								if (response.data[i].bonus_type == '3') {
									response.data[i].tipo =
										this.$t('Bono no depósito'); // Translating bonus type
								} else {
									if (response.data[i].bonus_type == '5') {
										response.data[i].tipo =
											this.$t('Bono casino'); // Translating bonus type
									} else {
										if (
											response.data[i].bonus_type == '6'
										) {
											response.data[i].tipo =
												this.$t('Bono freebet'); // Translating bonus type
										}
									}
								}
							}
							this.appComponent.gAnalytics(
								'bonus_interaction',
								response.data[i].tipo // Tracking bonus interaction
							);
							if (response.data[i].state == 'R') {
								response.data[i].estado = this.$t('Redimido'); // Translating state
							} else {
								if (response.data[i].state == 'E') {
									response.data[i].estado =
										this.$t('Expirado'); // Translating state
								} else {
									if (response.data[i].state == 'P') {
										response.data[i].estado =
											this.$t('Pendiente'); // Translating state
									} else {
										if (response.data[i].state == 'A') {
											response.data[i].estado =
												this.$t('Activo'); // Translating state
										}
									}
								}
							}
						}
						this.bonuses = JSON.parse(
							JSON.stringify(response.data) // Cloning response data to bonuses
						);
						this.totalCount = parseInt(response.total_count); // Setting total count of bonuses
						this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
						this.pages = parseInt(this.pages) + 1; // Adjusting total pages
						this.loadingTable = false; // Resetting loading state for table
					}
				});
		},
		updateHandler(handler: any) {
			this.page = handler - 1; // Updating current page based on handler
			this.getBonus(this.filter); // Fetching bonuses with updated filter
		},
		buttonAction(item) {
			router.push('/promociones-bonos'); // Navigating to promotions page
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		onSubmit(values: any) {
			values.timeRequest = true; // Setting timeRequest flag
			apiService
				.request('user_code_bonus', values) // Making API request to submit bonus code
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification', // Setting modal properties for success
							titleModal: this.$t('Satisfactorio!'),
							messageModal: this.$t(
								'Bono agregado satisfactoriamente.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.getBonus(this.filter); // Fetching bonuses after submission
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting model to initial state
						);
					} else if (response.code == 1811) {
						this.appComponent.disabledButtonForm = true; // Disabling button on specific error
						let timeLogin: any = localStorage.getItem('timeLogin'); // Retrieving login time
						let valorNumber = parseInt(timeLogin); // Parsing login time to integer
						let sumMinutes = new Date();
						sumMinutes.setTime(
							valorNumber + this.config.restrictionTime * 1000 // Calculating expiration time
						);
						let interval = setInterval(() => {
							this.appComponent.count =
								sumMinutes.getTime() - new Date().getTime(); // Updating countdown
							this.appComponent.disabledCount = true; // Disabling countdown
							if (sumMinutes.getTime() <= new Date().getTime()) {
								this.appComponent.disabledCount = false; // Enabling countdown when time is up
								this.appComponent.disabledButtonForm = false; // Enabling button when time is up
								clearInterval(interval); // Clearing interval
							}
						}, 1000);
					} else {
						var error_mensaje = '';
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Setting error message based on error code
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting modal properties for error
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting current page
			if (
				this.config != undefined &&
				this.config.myBonus != undefined &&
				this.config.myBonus.tableColumns != undefined &&
				this.config.myBonus.tableColumns[this.appComponent.country] !=
					undefined
			) {
				this.tableColumns =
					this.config.myBonus.tableColumns[this.appComponent.country]; // Setting table columns based on configuration
			}
			if (this.filter !== '1') {
				this.tableColumns = this.tableColumns.filter(function (obj) {
					return obj.name !== 'delete'; // Filtering out delete column if filter is not '1'
				});
			}
			this.getBonus(this.filter); // Fetching bonuses with updated filter
		},
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

							>{{ $t('Mis Bonos') }}</span
						>
					</span>
				</div>
				<!-- Menu and form content -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'misbonos'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'misbonos'"
						:MENU_ID="'3'"
					/>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div
                            v-if="!appComponent.infoApp"
							class="Container InfoContent mb-5 shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral rounded-b-xl'
									: 'text-neutral-content rounded-xl'
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
								:textButton="'Obtener'"
								:recaptcha="recaptcha"
								@onSubmit:form="onSubmit($event)"
								@changeSelect:form="changeSelect($event)"
							/>
						</div>
						<!-- Table and pagination section -->
						<div
							class="table-grid p-5 rounded-xl shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
						>
							<div class="AmountBox filtro-nota mb-5">
								<label
									class="FormLabel block md:inline-block pr-3 text-neutral"
									for="valor"
									>{{ $t('Estado:') }}</label
								>
								<div
									class="AmountContainer block md:inline-block"
								>
									<select
										id="filtro_nota"
										v-model="filter"
										@change="update()"
										class="select select-bordered w-full bg-input-background border-input-border border-1 text-input-placeholder"
									>
										<option value="A">
											{{ $t('Activo') }}
										</option>
										<option value="R">
											{{ $t('Redimido') }}
										</option>
										<option value="E">
											{{ $t('Expirado') }}
										</option>
										<option value="C">
											{{ $t('Cancelado') }}
										</option>
									</select>
								</div>
							</div>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="bonuses"
									:loading="loadingTable"
									@button:action="buttonAction($event)"
								/>
							</div>
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

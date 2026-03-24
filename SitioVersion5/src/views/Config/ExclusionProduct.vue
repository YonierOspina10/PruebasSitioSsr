<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent } from 'vue'; // Importing defineComponent for Vue component definition
import AppTable from '@/components/Table.vue'; // Importing table component
import router from '@/router'; // Importing router for navigation
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import { Pagination } from 'flowbite-vue'; // Importing pagination from Flowbite Vue

export default defineComponent({
	components: {
		Pagination, // Registering pagination component
		VPagination, // Registering Vue 3 pagination component
		MenuUser, // Registering user menu component
		MenuUser3, // Registering alternative user menu component
		AppForm, // Registering form component
		AppTable, // Registering table component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let loadingForm = true; // State for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text below the form
		let tableColumns: any = []; // Columns for the table
		let selfExclusion: any = []; // Data for self-exclusion
		let itemSelect: any = {}; // Selected item
		let fields: any =
			this.$config().autoExclusionProduct.form[
				this.$appComponent['country']
			]; // Form fields based on country
		let arraySelects: any = {}; // Array for select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let totalCount: any = 0; // Total count of items
		let pages: any; // Number of pages for pagination
		let loadingTable: any = false; // State for loading table
		let page: any; // Current page number
		let page2: any; // Another page variable for pagination
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
		let isActiveExclusion = this.config != undefined && // Check if exclusion is active
			this.config.autoExclusionProduct != undefined &&
			this.config.autoExclusionProduct.active != undefined &&
			this.config.autoExclusionProduct.active[this.appComponent.country] != undefined &&
			this.config.autoExclusionProduct.active[this.appComponent.country];

		if (!isActiveExclusion) {
			// If exclusion is not active, redirect to home
			this.appComponent.modal = {
				// Set modal for notification
				showModal: 'notification',
				titleModal: this.$t('Atención'),
				messageModal: this.$t(
					'Esta funcionalidad no esta activa en tu país.'
				),
				buttonModal: this.$t('Aceptar'),
				orderModal: 'closeModal',
			};
			router.push( '/home' ); // Navigate to home page
			return; // Exit mounted lifecycle hook
		}

		this.emitter.on('accept:modal', () => {
			// Event listener for accepting modal
			this.appComponent.closeModal(); // Close modal on event
		});
		apiService.request('get_type_games', {}).then((response: any) => {
			// API request to get game types
			if (response.code == 0) {
				// Check for successful response
				for (var i = 0; i < response.data.length; i++) {
					// Iterate through response data
					response.data[i].value = response.data[i].Id; // Set value for select options
					response.data[i].name = response.data[i].Name; // Set name for select options
				}
				Object.assign(this.arraySelects, {
					// Assigning game types to arraySelects
					typeProductsList: response.data,
				});
			}
			console.log(response); // Log response for debugging
		});
		this.fields.forEach((field) => {
			// Iterate through form fields
			if (
				field.type == 'select' && // Check if field is a select type
				field.options != undefined && // Ensure options are defined
				field.options.length > 0 // Ensure options array is not empty
			) {
				let options: object = {}; // Create options object
				options[field.optionsKey] = field.options; // Assign options to the key
				Object.assign(this.arraySelects, options); // Add options to arraySelects
			}
		});
		if (
			this.config != undefined && // Check if config is defined
			this.config.autoExclusionProduct != undefined && // Check if autoExclusionProduct is defined
			this.config.autoExclusionProduct.tableColumns != undefined && // Check if tableColumns are defined
			this.config.autoExclusionProduct.tableColumns[
				this.appComponent.country
			] != undefined // Check if tableColumns for the country are defined
		) {
			this.tableColumns =
				this.config.autoExclusionProduct.tableColumns[
					this.appComponent.country
				]; // Assign table columns based on country
		}
		this.getAutoExclusionProduct(); // Fetch auto-exclusion products
	},
	methods: {
		acceptModal(item: any) {
			// Method to accept modal action
			const vthis = this; // Preserve context
			let params = [
				{
					id_exclusion_typeGame: item.id, // Parameter for API request
				},
			];
			apiService
				.request('delete_typeGame_exclusion', params) // API request to delete exclusion
				.then((response: any) => {
					if (response.code == 0) {
						// Check for successful response
						this.appComponent.modal = {
							// Set modal for success notification
							showModal: 'notification',
							titleModal: this.$t('OK!'),
							messageModal: this.$t(
								'Esta Autoexclusion ha sido cancelada satisfactoriamente.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.getAutoExclusionProduct(); // Refresh auto-exclusion products
						vthis.refreshBalance(); // Refresh balance
					} else {
						var error_mensaje = ''; // Initialize error message
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Set error message based on response
						);
						if (error_mensaje == '') {
							// Fallback for empty error message
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							// Set modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
			this.appComponent.closeModal(); // Close modal after action
			this.appComponent.disabledButtonWithdraw = false; // Enable withdraw button
		},
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				Note: values.detalle, // Note from form values
				product: {
					Id: values.Product, // Product ID from form values
					value: values.Product, // Product value from form values
				},
				to_date: values.AutoExclution_date, // Date from form values
			};
			apiService
				.request('set_autoexclusion_product', params) // API request to set auto-exclusion
				.then((response: any) => {
					if (response.code == 0) {
						// Check for successful response
						this.appComponent.modal = {
							// Set modal for success notification
							showModal: 'notification',
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Se aplicó la Autoexclusion correctamente.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Reset model to initial state
						);
						this.getAutoExclusionProduct(); // Refresh auto-exclusion products
						this.resetForm = false; // Set reset form state
					} else {
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							// Check for error code
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Set error message based on response
							);
						}
						if (error_mensaje == '') {
							// Fallback for empty error message
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							);
						}
						this.appComponent.modal = {
							// Set modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		changeSelect: function (event: any) {
			// Method to handle select change
			this.getAutoExclusionProduct(); // Refresh auto-exclusion products
		},
		updateHandler(handler: any) {
			// Method to handle pagination update
			this.page = handler - 1; // Update current page
			this.getAutoExclusionProduct(); // Refresh auto-exclusion products
		},
		update() {
			// Method to update component state
			this.pages = 0; // Reset pages
			this.page = 0; // Reset current page
			if (
				this.config != undefined && // Check if config is defined
				this.config.autoExclusionProduct != undefined && // Check if autoExclusionProduct is defined
				this.config.autoExclusionProduct.tableColumns != undefined && // Check if tableColumns are defined
				this.config.autoExclusionProduct.tableColumns[
					this.appComponent.country
				] != undefined // Check if tableColumns for the country are defined
			) {
				this.tableColumns =
					this.config.autoExclusionProduct.tableColumns[
						this.appComponent.country
					]; // Assign table columns based on country
			}
			this.tableColumns = this.tableColumns.filter(function (obj) {
				// Filter out undefined columns
				return obj;
			});
			this.getAutoExclusionProduct(); // Refresh auto-exclusion products
		},
		closeModal() {
			// Method to close modal
			if (this.appComponent.modal.orderModal == 'closeModal') {
				// Check modal order
				this.getAutoExclusionProduct(); // Refresh auto-exclusion products
			}
			this.appComponent.closeModal(); // Close modal
		},
		getAutoExclusionProduct() {
			// Method to fetch auto-exclusion products
			const params = {
				count: 10, // Number of items to fetch
				start: this.page * 10, // Start index for pagination
			};
			apiService
				.request('get_autoexclusion_product', params) // API request to get auto-exclusion products
				.then((response: any) => {
					if (response.code == 0) {
						// Check for successful response
						for (var i = 0; i < response.data.length; i++) {
							// Iterate through response data
							response.data[i].id = response.data[i].Id; // Set ID for each item
							response.data[i].tipo =
								response.data[i].type_product; // Set type for each item
							response.data[i].fecha_crea =
								response.data[i].to_date; // Set creation date for each item
							response.data[i].estado = response.data[i].state; // Set state for each item
							if (response.data[i].state == '1') {
								// Check state
								response.data[i].estado = 'Activa'; // Set state to 'Active'
							} else {
								if (response.data[i].state == '2') {
									// Check for inactive state
									response.data[i].estado = 'Inactiva'; // Set state to 'Inactive'
									response.data[i].button_show = true; // Show button for inactive state
								} else {
									if (response.data[i].state == '3') {
										// Check for canceled state
										response.data[i].estado = 'Cancelada'; // Set state to 'Canceled'
										response.data[i].button_show = true; // Show button for canceled state
									}
								}
							}
						}
						this.selfExclusion = JSON.parse(
							JSON.stringify(response.data) // Store response data in selfExclusion
						);
						this.totalCount = parseInt(response.total_count); // Set total count of items
						this.pages = parseInt(this.totalCount) / 10; // Calculate total pages
						this.pages = parseInt(this.pages) + 1; // Increment pages for pagination
						this.loadingTable = false; // Set loading state for table
						console.log(this.selfExclusion); // Log self-exclusion data for debugging
					}
				});
		},
		buttonAction(item) {
			// Method to handle button action
			this.acceptModal(item); // Accept modal action
			this.getAutoExclusionProduct(); // Refresh auto-exclusion products
		},
	},
	updated() {
		setTimeout(() => {
			// Timeout to reset form state
			this.resetForm = true; // Reset form state
		}, 200);
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Alternative header for layout 3 -->
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
		class="Framework InfoPage mi-cuenta overflow-y-hidden"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content w-full mx-auto'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Autoexclusión Parcial') }}</span
						>
					</span>
				</div>
				<!-- User menu and form area -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'autoexclusion-parcial'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'autoexclusion-parcial'"
						:MENU_ID="'3'"
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
							class="p-5 shadow-md bg-base-400 text-neutral rounded-xl"
							style="margin-bottom: 10px"
						>
							<span
								v-if="
									config.autoExclusionProduct != undefined &&
									config.autoExclusionProduct.principalInfo !=
										undefined &&
									config.autoExclusionProduct.principalInfo !=
										null
								"
								v-html="config.autoExclusionProduct
											.principalInfo"
								>
							</span>
							<br />
							<div class="flex gap-2 pt-4">
								<span
									v-if="
										config.autoExclusionProduct !=
											undefined &&
										config.autoExclusionProduct
											.infoAfterExclusion != undefined &&
										config.autoExclusionProduct
											.infoAfterExclusion != null
									"
									v-html="config.autoExclusionProduct
											.infoAfterExclusion"
									>
								</span>
							</div>
							<div class="flex gap-2 pt-4">
								<span
									v-if="
										config.autoExclusionProduct !=
											undefined &&
										config.autoExclusionProduct
											.InfoDetallada != undefined &&
										config.autoExclusionProduct
											.InfoDetallada != null
									"
									v-html="config.autoExclusionProduct
											.InfoDetallada"
									>
								</span>
							</div>
						</div>
						<!-- Form for auto-exclusion -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
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
								:textButton="'GUARDAR'"
								@onSubmit:form="onSubmit($event)"
								@changeSelect:form="changeSelect($event)"
							/>
						</div>
						<!-- Table for displaying self-exclusion data -->
						<div
							class="table-grid p-5 pb-20 rounded-xl shadow-md bg-base-300 mb-8"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200'
									: 'bg-base-400'
							"
						>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="selfExclusion"
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
								@update:modelValue="updateHandler"
								:class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
								class="flex gap-4"
							/>
						</div>
					</div>
					<!-- Background gradient at the bottom -->
					<div
						class="hidden absolute -bottom-2 w-full h-24 bg-gradient-to-t from-neutral-content"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

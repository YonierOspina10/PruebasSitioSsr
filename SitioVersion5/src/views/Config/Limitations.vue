<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import AppTable from '@/components/Table.vue'; // Importing table component
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import router from '@/router'; // Importing router for navigation
import { Pagination } from 'flowbite-vue'; // Importing pagination from Flowbite Vue

export default defineComponent({
	components: {
		Pagination, // Registering Pagination component
		VPagination, // Registering VPagination component
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
		AppTable, // Registering AppTable component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let loadingForm = true; // State for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text below the form
		let tableColumns: any = []; // Columns for the table
		let selfLimitation: any = []; // Self limitation data
		let itemSelect: any = {}; // Selected item
		let fields: any =
			this.$config().limitations.form[this.$appComponent['country']]; // Form fields based on country
		let arraySelects: any = {}; // Array for select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let totalCount: any = 0; // Total count of items
		let pages: any; // Number of pages for pagination
		let loadingTable: any = false; // State for loading table
		let page: any; // Current page number
		let page2: any; // Secondary page number for pagination
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
			selfLimitation,
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
			let isActiveLimitations = this.config != undefined && // Check if exclusion is active
			this.config.limitations != undefined &&
			this.config.limitations.active != undefined &&
			this.config.limitations.active[this.appComponent.country] != undefined &&
			this.config.limitations.active[this.appComponent.country];

		if (!isActiveLimitations) {
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
		this.fields.forEach((field) => {
			// Iterate through fields to populate select options
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
			this.config.limitations != undefined &&
			this.config.limitations.tableColumns != undefined &&
			this.config.limitations.tableColumns[this.appComponent.country] !=
				undefined
		) {
			this.tableColumns =
				this.config.limitations.tableColumns[this.appComponent.country]; // Set table columns based on configuration
		}
		this.getLimitProduct(); // Fetch initial product limits
	},
	methods: {
		acceptModal(item: any) {
			const vthis = this; // Preserve context
			let params = [
				{
					id_exclusion_typeGame: item.id, // Parameter for deletion
				},
			];
			console.log('delete params', params); // Log delete parameters
			apiService
				.request('delete_typeGame_exclusion', params) // API request to delete exclusion
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							// Show success modal
							showModal: 'notification',
							titleModal: this.$t('OK!'),
							messageModal: this.$t(
								'Limitación ha sido cancelada satisfactoriamente.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.getLimitProduct(); // Refresh limit product data
						vthis.refreshBalance(); // Refresh balance
					} else {
						var error_mensaje = ''; // Error message initialization
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Fetch error message based on error code
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.modal = {
							// Show error modal
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
			let params = {
				type: values.type, // Type of limitation
				time_limitation: values.time_limitation, // Time limitation
				amount: values.amount, // Amount for limitation
				note: values.note, // Note for limitation
			};
			apiService
				.request('set_user_limits', params) // API request to set user limits
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							// Show success modal
							showModal: 'notification',
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Se aplicó la limitación correctamente. En caso de tener dudas comunícate con soporte.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Reset model to initial state
						);
						this.getLimitProduct(); // Refresh limit product data
						this.resetForm = false; // Set reset form state
					} else {
						var error_mensaje = ''; // Error message initialization
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Fetch error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.modal = {
							// Show error modal
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		updateHandler(handler: any) {
			this.page = handler - 1; // Update current page based on handler
			this.getLimitProduct(); // Refresh limit product data
		},
		update() {
			this.pages = 0; // Reset pages
			this.page = 0; // Reset current page
			if (
				this.config != undefined &&
				this.config.limitations != undefined &&
				this.config.limitations.tableColumns != undefined &&
				this.config.limitations.tableColumns[
					this.appComponent.country
				] != undefined
			) {
				this.tableColumns =
					this.config.limitations.tableColumns[
						this.appComponent.country // Set table columns based on configuration
					];
			}
			this.tableColumns = this.tableColumns.filter(function (obj) {
				return obj; // Filter out any undefined columns
			});
			this.getLimitProduct(); // Refresh limit product data
		},
		closeModal() {
			if (this.appComponent.modal.orderModal == 'closeModal') {
				this.getLimitProduct(); // Refresh limit product data if closing modal
			}
			this.appComponent.closeModal(); // Close modal
		},
		getLimitProduct() {
			const params = {
				count: 10, // Number of items to fetch
				start: this.page * 10, // Starting index for pagination
			};
			apiService.request('user_limits', params).then((response: any) => {
				if (response.code == 0) {
					for (var i = 0; i < response.data.details.length; i++) {
						if (response.data.details[i].cancel == false)
							response.data.details[i].button_show = true; // Show button if not canceled
						if (response.data.details[i].status == 'A') {
							response.data.details[i].status = 'Activa'; // Active status
						} else {
							if (response.data.details[i].status == 'I') {
								response.data.details[i].status = 'Inactiva'; // Inactive status
								response.data.details[i].button_show = true; // Show button if inactive
							} else {
								if (response.data.details[i].status == 'C') {
									response.data.details[i].status =
										'Cancelada'; // Canceled status
									response.data.details[i].button_show = true; // Show button if canceled
								}
							}
						}
					}
					this.selfLimitation = JSON.parse(
						JSON.stringify(response.data.details) // Update self limitation data
					);
					this.totalCount = parseInt(response.total_count); // Update total count
					this.pages = parseInt(this.totalCount) / 10; // Calculate total pages
					this.pages = parseInt(this.pages) + 1; // Increment pages
					this.loadingTable = false; // Set loading state to false
					console.log(this.selfLimitation); // Log self limitation data
				}
			});
		},
		buttonAction(item) {
			this.acceptModal(item); // Accept modal action for the item
			this.getLimitProduct(); // Refresh limit product data
		},
	},
	updated() {
		setTimeout(() => {
			this.resetForm = true; // Reset form state after update
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
		class="hidden int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content area for logged-in users -->
	<div
		v-if="appComponent.session.logueado"
		class="Framework InfoPage mi-cuenta overflow-y-hidden"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title container -->
				<div
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content w-full mx-auto'
							: 'ActivePageTitle2'
					"
					class="Container ActivePageTitle"
				>
					<span class="h1">
						<span
							class="text-neutral font-bold text-3xl"

							>{{ $t('Limitaciones') }}</span
						>
					</span>
				</div>
				<!-- User menu and content area -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:MENU_ID="'3'"
						:page="'limitaciones'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:MENU_ID="'3'"
						:page="'limitaciones'"
					/>
					<div
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
						class="BoxContent TermsContentBox HelpContentBox w-full"
					>
						<!-- Form container -->
						<div
							class="p-5 shadow-md bg-base-400 text-neutral rounded-b-xl"
							style="margin-bottom: 10px"
						>
							<span
								v-if="
									config.limitations != undefined &&
									config.limitations.principalInfo !=
										undefined &&
									config.limitations.principalInfo != null
								"
								v-html="config.limitations.principalInfo"
							></span>
						</div>
						<!-- AppForm component for user input -->
						<div
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
							class="Container InfoContent mb-5 rounded-xl shadow-md bg-base-400"
						>
							<AppForm
								v-if="resetForm"
								:arraySelects="arraySelects"
								:fields="fields"
								:loading="loadingForm"
								:model="model"
								:styleWidth="widthForm"
								:textButton="'GUARDAR'"
								:textDown="textDownForm"
								:title="titleForm"
								@onSubmit:form="onSubmit($event)"
							/>
						</div>
						<!-- Table and pagination container -->
						<div
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200'
									: 'bg-base-400'
							"
							class="table-grid p-5 pb-20 rounded-xl shadow-md bg-base-300 mb-8"
						>
							<div class="overflow-x-auto">
								<AppTable
									:data="selfLimitation"
									:loading="loadingTable"
									:tableColumns="tableColumns"
									@button:action="buttonAction($event)"
								/>
							</div>
							<v-pagination
								v-if="totalCount > 0"
								v-model="page2"
								:pages="pages"
								:range-size="1"
								active-color="#DCEDFF"
								class="flex gap-4"
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

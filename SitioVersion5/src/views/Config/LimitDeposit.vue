<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import router from '@/router'; // Importing router for navigation

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		let loadingForm = true; // State variable to track loading status of the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Additional text for the form
		let fields: any =
			this.$config().limitDeposit.form[this.$appComponent['country']]; // Fields for the form based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
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
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Event listener for modal acceptance
			this.appComponent.closeModal(); // Close the modal
		});
		this.fields.forEach((field) => {
			// Iterate over fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to the select
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				type: 'deposit', // Type of request
				limits: [
					{
						deposit_limit: values.max_day_deposit, // Daily deposit limit
						period: 1,
						period_type: 2,
					},
					{
						deposit_limit: values.max_week_deposit, // Weekly deposit limit
						period: 1,
						period_type: 3,
					},
					{
						deposit_limit: values.max_month_deposit, // Monthly deposit limit
						period: 1,
						period_type: 4,
					},
				],
			};
			apiService
				.request('set_user_limits', params) // Making API request to set user limits
				.then((response: any) => {
					// Handling the response
					if (response.code == 0) {
						// Success case
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Límites de depósito han sido enviados, quedan pendientes de aprobación.'
							), // Message for the modal
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting the model to initial state
						);
					} else {
						// Error case
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Error message for the modal
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		closeModal() {
			this.appComponent.closeModal(); // Method to close the modal
		},
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
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
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Límites de Depósito') }}</span
						>
					</span>
				</div>
				<!-- Main content area -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'limit-deposito'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'limit-deposito'"
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
						<div
							class="p-5 shadow-md bg-base-400"
							style="margin-bottom: 10px"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral rounded-b-xl'
									: 'bg-neutral text-neutral-content rounded-xl'
							"
						>
							<span
								v-if="
									config.limitDeposit != undefined &&
									config.limitDeposit.principalInfo !=
										undefined &&
									config.limitDeposit.principalInfo != null
								"
								>{{ $t(config.limitDeposit.principalInfo) }}
							</span>
						</div>
						<!-- Form container -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-secondary text-neutral'
									: 'bg-neutral text-neutral-content'
							"
						>
							<AppForm
								:loading="loadingForm"
								:title="titleForm"
								:fields="fields"
								:styleWidth="widthForm"
								:arraySelects="arraySelects"
								:model="model"
								:textDown="textDownForm"
								:textButton="'Guardar'"
								@onSubmit:form="onSubmit($event)"
								@changeSelect:form="changeSelect($event)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the application component
		let emitter: any = this.$emitter(); // Getting the event emitter
		let loadingForm = true; // State to manage loading status of the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text to display below the form
		let fields: any =
			this.$config != undefined &&
			this.$config().pos != undefined &&
			this.$config().pos.creditRecharge != undefined &&
			this.$config().pos.creditRecharge.form != undefined &&
			this.$config().pos.creditRecharge.form[
				this.$appComponent['country']
			] != undefined
				? this.$config().pos.creditRecharge.form[
						this.$appComponent['country']
					]
				: []; // Retrieving form fields based on country configuration
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model to bind form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
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
		}; // Returning data properties for the component
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.appComponent.closeModal(); // Closing the modal when accepted
		});
		this.fields.forEach((field) => {
			// Iterating over fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to the select key
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				numberClient: values.numberUser, // Client number from form
				idClient: values.docnumber, // Client ID from form
				emailClient: values.email, // Client email from form
				phoneClient: values.phone, // Client phone from form
			};
			apiService
				.request('get_client_recharge', params) // Making API request for client recharge
				.then((response: any) => {
					// Handling the response
					if (response.code == 0) {
						// Checking for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for notification
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(''), // Message for the modal
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Action to perform on button click
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Translating error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for error notification
							titleModal: this.$t('Error!'), // Title for the error modal
							messageModal: error_mensaje, // Error message for the modal
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Action to perform on button click
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
	<!-- Header section for layout 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<!-- Main container for the InfoPage when user is logged in -->
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
						<!-- Title for the recharge section -->
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Recarga Credito') }}</span
						>
					</span>
				</div>
				<!-- Row for content alignment -->
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
						<!-- Container for the main content with styling -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200 text-neutral'
									: 'bg-neutral text-neutral-content'
							"
						>
							<!-- AppForm component for user input -->
							<AppForm
								:loading="loadingForm"
								:title="titleForm"
								:fields="fields"
								:styleWidth="widthForm"
								:arraySelects="arraySelects"
								:model="model"
								:textDown="textDownForm"
								:textButton="'Buscar'"
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

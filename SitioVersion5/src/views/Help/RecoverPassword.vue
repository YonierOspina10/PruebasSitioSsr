<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the app component
		let backgroundForm = this.$config().contact.background; // Getting the background for the contact form
		let titleForm: string = this.$t('Recuperar clave'); // Setting the title for the form
		let textUp: string = this.$t(
			this.$config().recuperarClave.notaText.text // Getting the upper text for the form
		);
		let loadingForm = false; // Initial state for loading indicator
		let textDownForm: string = ''; // Placeholder for lower text in the form
		let fields: any =
			this.$config().recuperarClave.form[this.$appComponent['country']]; // Retrieving form fields based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state for form data
		let widthForm: any = {}; // Object to hold form width settings
		let recaptcha: boolean = this.$config().recuperarClave.recaptcha.show; // Flag to show/hide reCAPTCHA
		return {
			config,
			emitter,
			appComponent,
			loadingForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			textUp,
			titleForm,
			backgroundForm,
			textDownForm,
			widthForm,
			recaptcha,
			isRecaptchaRendered: false, // Flag to track reCAPTCHA rendering
		};
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
			// Iterating through form fields
			if (
				field.type == 'select' && // Checking if the field is a select type
				field.options != undefined && // Ensuring options are defined
				field.options.length > 0 // Checking if options array is not empty
			) {
				let options: object = {}; // Creating an options object
				options[field.optionsKey] = field.options; // Assigning options to the key
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		setTimeout(() => {
			// Delaying the loading state change
			this.loadingForm = true; // Setting loading state to true
		}, 100);
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			apiService
				.request('reset_user_password', values) // Making API request to reset user password
				.then((response: any) => {
					// Handling the API response
					if (response.code == 0) {
						// Checking for successful response
						this.appComponent.modal = {
							// Setting up modal for success notification
							showModal: 'notification',
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order of modal actions
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting the model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							// Checking if error code is defined
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Translating error message
							);
						}
						if (error_mensaje == '') {
							// Fallback for unexpected errors
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
							);
						}
						this.appComponent.modal = {
							// Setting up modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Error!'), // Title for the error modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order of modal actions
						};
					}
				});
		},
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Closing the modal
		},
	},
});
</script>
<template>
	<!-- Main form component for user password recovery -->
	<AppForm
		:loading="loadingForm"
		:title="titleForm"
		:backgroundForm="backgroundForm"
		:textUp="textUp"
		:fields="fields"
		:styleWidth="false"
		:arraySelects="arraySelects"
		:model="model"
		:textDown="textDownForm"
		:textButton="'Enviar'"
		:recaptcha="recaptcha"
		@onSubmit:form="onSubmit($event)"
	/>
</template>

<!-- FILE DOCUMENTED -->

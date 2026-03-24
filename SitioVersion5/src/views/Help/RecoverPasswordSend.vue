<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import { useRoute } from 'vue-router'; // Importing the useRoute function for route management
import router from '@/router'; // Importing the router instance

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component
		let backgroundForm = this.$config().contact.background; // Getting the background for the contact form
		let titleForm: string = this.$t('Recuperar clave'); // Setting the title for the form
		let textUp: string = this.$t(
			'La nueva clave debe de contener minimo 6 caracteres, una minuscula, una mayuscula y un número'
		); // Instruction text for password requirements
		let loadingForm = false; // State to manage loading status
		let textDownForm: string = ''; // Placeholder for additional text below the form
		let fields: any =
			this.$config().recuperarClave.form2[this.$appComponent['country']]; // Retrieving form fields based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state for form data
		let widthForm: any = {}; // Object to manage form width
		let recaptcha: boolean =
			this.$config() != undefined &&
			this.$config().recuperarClave != undefined &&
			this.$config().recuperarClave.recaptcha2 != undefined &&
			this.$config().recuperarClave.recaptcha2.show != undefined
				? this.$config().recuperarClave.recaptcha2.show // Checking if reCAPTCHA should be shown
				: false;

		if (this.$route.path.includes('-activar')) {
			// Checking if the route includes '-activar'
			textUp = this.$t(
				'Para activar tu cuenta, crea una nueva contraseña y confírmala, al instante podrás acceder a tu cuenta de manera normal.'
			); // Updating instruction text for account activation
		}
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
		};
	},
	setup() {
		const route = useRoute(); // Using the route for accessing route parameters
		let tokenP: any = ref(route.params.tokenP); // Creating a reactive reference for the token parameter
		return {
			tokenP,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listeners on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up an event listener for modal acceptance
			this.appComponent.closeModal(); // Closing the modal
			router.push('/'); // Redirecting to the home route
		});
		this.fields.forEach((field) => {
			// Iterating over form fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to the corresponding key
				Object.assign(this.arraySelects, options); // Merging options into the arraySelects object
			}
		});
		setTimeout(() => {
			this.loadingForm = true; // Setting loading state after a delay
		}, 100);
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			values.reset_code = this.tokenP; // Adding the reset code to the submitted values
			apiService
				.request('reset_password', values) // Making an API request to reset the password
				.then((response: any) => {
					if (response.code == 0) {
						// Checking for a successful response
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for success notification
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Contraseña cambiada satisfactoriamente.'
							), // Success message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Action to perform on button click
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting the model to its initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Retrieving error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for error notification
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Action to perform on button click
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

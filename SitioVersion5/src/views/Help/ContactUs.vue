<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving the configuration object
		let emitter = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		let backgroundForm = this.$config().contact.background; // Getting the background configuration for the contact form
		let titleForm: string = this.$t('Contáctanos'); // Localizing the title for the contact form
		let textUp: string = this.$t(
			'En Doradobet buscamos agentes y comercializadores que nos ayuden a seguir formando la marca con mayor proyección en latinoamerica.'
		); // Localizing the introductory text for the form
		let loadingForm = false; // State to track loading status of the form
		let textDownForm: string =
			'<p style="text-align: center;">' +
			this.$t('textDownFormContact') +
			'</p>'; // Localizing the closing text for the form
		let fields: any = []; // Array to hold form fields
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Object to hold form model data
		let modelInitial: any = {}; // Object to hold initial model data
		let widthForm: any = {}; // Object to hold form width configuration
		let recaptcha: boolean =
			this.$config().contact.recaptcha.show !== undefined
				? this.$config().contact.recaptcha.show // Checking if reCAPTCHA should be shown
				: false;
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let fontColorForm: string = ''; // Variable to hold font color for the form

		// Setting font color based on configuration
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['Contáctanos'] != undefined &&
			config['forms']['Contáctanos']['fontColorForm'] != undefined
		) {
			fontColorForm = config['forms']['Contáctanos']['fontColorForm'];
		} else {
			if (
				config != undefined &&
				config['contact'] != undefined &&
				config['contact']['fontColorForm'] != undefined
			) {
				fontColorForm = config['contact']['fontColorForm'];
			}
		}

		// Setting fields based on configuration
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['Contáctanos'] != undefined &&
			config['forms']['Contáctanos']['inputs'] != undefined
		) {
			fields = JSON.parse(
				JSON.stringify(config['forms']['Contáctanos']['inputs'])
			);
		} else {
			if (
				config != undefined &&
				config['contact'] != undefined &&
				config['contact']['form'] != undefined &&
				config['contact']['form'][this.$appComponent['country']] !=
					undefined
			) {
				fields = JSON.parse(
					JSON.stringify(
						config['contact']['form'][this.$appComponent['country']]
					)
				);
			}
		}

		// Returning data properties for the component
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
			textUp,
			titleForm,
			backgroundForm,
			textDownForm,
			widthForm,
			recaptcha,
			fontColorForm,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing modal on event
		});
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning select options to arraySelects
				Object.assign(this.arraySelects, options);
			}
		});
		setTimeout(() => {
			this.loadingForm = true; // Setting loading state after a delay
		}, 100);
		if (
            this.config != undefined &&
            this.config['forms'] != undefined &&
            this.config['forms']['Contáctanos'] != undefined &&
            this.config['forms']['Contáctanos']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Contáctanos']['description'];
            }
	},
	methods: {
		onSubmit(values: any) {
			apiService
				.request('user_feedback', values) // Sending user feedback to the API
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification', // Setting modal properties for success notification
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Se ha enviado correctamente el mensaje, muchas gracias por querer contactarnos, lo antes posible te estaremos respondiendo.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting the model to initial state
						);
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Localizing error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting modal properties for error notification
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		closeModal() {
			this.appComponent.closeModal(); // Method to close the modal
		},
	},
});
</script>
<template>
	<!-- Main form component for user contact -->
	<AppForm
		:loading="loadingForm"
		:windowFrame="true"
		:title="titleForm"
		:backgroundForm="backgroundForm"
		:textUp="textUp"
		:fields="fields"
		:styleWidth="false"
		:arraySelects="arraySelects"
		:model="model"
		:textDown="textDownForm"
		:fontColorForm="fontColorForm"
		:textButton="'Enviar'"
		:recaptcha="recaptcha"
		@onSubmit:form="onSubmit($event)"
	/>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import AppFormWorkWithUs from '@/components/FormWorkWithUsEcuabet.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import { bool } from 'yup'; // Importing the bool validation from Yup

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
    AppFormWorkWithUs,
	},
	data: function () {
    let config = this.$config(); // Retrieving the configuration object
		let emitter = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the app component
		let loadingForm = false; // State to track if the form is loading
		let titleForm: string = this.$t('Trabaja con nosotros'); // Title for the form
		let textUp: string = this.$t(
			'En Doradobet buscamos agentes y comercializadores que nos ayuden a seguir formando la marca con mayor proyección en latinoamerica.'
		); // Text above the form
		let textDownForm: string = this.$t(''); // Text below the form
		let backgroundForm: string = this.$config().forms !== undefined && this.$config().forms['¿Quieres ser Agente DoradoBet?'] !== undefined && this.$config().forms['¿Quieres ser Agente DoradoBet?'].background ? this.$config().forms['¿Quieres ser Agente DoradoBet?'].background : this.$config().workWithUs.background; // Background for the form
		let backgroundSize: string = this.$config().workWithUs.backgroundSize; // Background size for the form
		let fields: any = []; // Array to hold form fields
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let recaptcha: boolean =
			this.$config().workWithUs.recaptcha.show !== undefined
				? this.$config().workWithUs.recaptcha.show // Recaptcha visibility
				: false;
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let fontColorForm: string = ''; // Font color for the form

		// Determine the font color for the form based on configuration
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['¿Quieres ser Agente DoradoBet?'] != undefined &&
			config['forms']['¿Quieres ser Agente DoradoBet?'][
				'fontColorForm'
			] != undefined
		) {
			fontColorForm =
				config['forms']['¿Quieres ser Agente DoradoBet?'][
					'fontColorForm'
				];
		} else {
			if (
				config != undefined &&
				config['workWithUs'] != undefined &&
				config['workWithUs']['fontColorForm'] != undefined
			) {
				fontColorForm = config['workWithUs']['fontColorForm'];
			}
		}

		// Retrieve form fields based on configuration
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['¿Quieres ser Agente DoradoBet?'] != undefined &&
			config['forms']['¿Quieres ser Agente DoradoBet?']['inputs'] !=
				undefined
		) {
			fields = JSON.parse(
				JSON.stringify(
					config['forms']['¿Quieres ser Agente DoradoBet?']['inputs']
				)
			);
		} else {
			if (
				config != undefined &&
				config['workWithUs'] != undefined &&
				config['workWithUs']['form'] != undefined &&
				config['workWithUs']['form'][this.$appComponent['country']] !=
					undefined
			) {
				fields = JSON.parse(
					JSON.stringify(
						config['workWithUs']['form'][
							this.$appComponent['country']
						]
					)
				);
			}
		}
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
			textUp,
			textDownForm,
			backgroundForm,
			backgroundSize,
			widthForm,
			recaptcha,
			fontColorForm,
		};
	},
  computed: {
    /**
     * Determines whether the "Work With Us" form version for "¿Quieres ser Agente DoradoBet?" is active.
     *
     * This function checks the presence of specific configuration properties related to the
     * "¿Quieres ser Agente DoradoBet?" form inside the global config object. It returns true
     * only if all required visual assets (`characterImage`, `titleImage`, and `textImage`) are defined.
     *
     * @returns {boolean} True if the special version of the form is properly configured and active; otherwise, false.
     */
    isWorkWithUsVersion(): boolean {
      const config = this.$config();
      const formConfig = config?.forms?.['¿Quieres ser Agente DoradoBet?'];

      return (
          formConfig !== undefined &&
          typeof formConfig.characterImage === 'string' && formConfig.characterImage.trim() !== '' &&
          typeof formConfig.titleImage === 'string' && formConfig.titleImage.trim() !== '' &&
          typeof formConfig.textImage === 'string' && formConfig.textImage.trim() !== ''
      );
    }
  },
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal on event
		});
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning select options
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		setTimeout(() => {
			this.loadingForm = true; // Set loading state after timeout
		}, 100);
		apiService.request('get_countries', {}).then((response: any) => {
			if (response && response.code == 0) {
				for (var i = 0; i < response.data.length; i++) {
					response.data[i].value = response.data[i].Id; // Mapping country ID to value
					response.data[i].name = response.data[i].Name; // Mapping country name
				}
				Object.assign(this.arraySelects, {
					countryList: response.data, // Adding country list to arraySelects
				});
				this.loadingForm = true; // Set loading state to true
			}
		});
		if (
            this.config != undefined &&
            this.config['forms'] != undefined &&
            this.config['forms']['¿Quieres ser Agente DoradoBet?'] != undefined &&
            this.config['forms']['¿Quieres ser Agente DoradoBet?']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['¿Quieres ser Agente DoradoBet?']['description'];
            }
	},
	methods: {
		onSubmit(values: any) {
			values.country = this.arraySelects['countryList'].filter(
				(x) => x.Id == values.country
			)[0]; // Set selected country object
			values.department = this.arraySelects['departmentList'].filter(
				(x) => x.Id == values.department
			)[0]; // Set selected department object
			apiService.request('work_with_us', values).then((response: any) => {
				if (response && response.code == 0) {
					this.appComponent.modal = {
						showModal: 'notification', // Show notification modal
						titleModal: this.$t('Mensaje'), // Modal title
						messageModal: this.$t(
							'El mensaje se ha enviado correctamente. Muchas gracias por su interes en nuestra plataforma, pronto nos comunicaremos con usted.'
						), // Success message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Order to close modal
					};
					this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Reset model to initial state
					this.appComponent.gAnalytics('successful_register_agent'); // Track successful registration
				} else {
					var error_mensaje = ''; // Initialize error message
					if (response.error_code != undefined) {
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Set error message based on error code
						);
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
						);
					}
					this.appComponent.modal = {
						showModal: 'notification', // Show notification modal
						titleModal: this.$t('Error!'), // Modal title
						messageModal: error_mensaje, // Error message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Order to close modal
					};
				}
			});
		},
    /**
     * Handles the submission of the "Work With Us" form.
     *
     * This function:
     * - Replaces the `country` and `department` IDs in the form values with their full objects from predefined select arrays.
     * - Sends the form data to the `work_with_us` API endpoint.
     * - Handles the API response:
     *    - If successful (`code == 0`), sets a success flag and tracks the registration with Google Analytics.
     *    - If there's an error, displays a notification modal with an appropriate translated error message.
     *
     * @param {any} values - The form values submitted by the user.
     */
    onSubmit2(values: any) {
      values.country = this.arraySelects['countryList'].filter(
          (x) => x.Id == values.country
      )[0]; // Set selected country object
      values.department = this.arraySelects['departmentList'].filter(
          (x) => x.Id == values.department
      )[0]; // Set selected department object
      apiService.request('work_with_us', values).then((response: any) => {
        if (response && response.code == 0) {
          this.appComponent.submittedSuccessfully = true;
          this.appComponent.gAnalytics('successful_register_agent'); // Track successful registration
        } else {
          var error_mensaje = ''; // Initialize error message
          if (response.error_code != undefined) {
            error_mensaje = this.$t(
                'ERROR' + response.error_code.toString() // Set error message based on error code
            );
          }
          if (error_mensaje == '') {
            error_mensaje = this.$t(
                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
            );
          }
          this.appComponent.modal = {
            showModal: 'notification', // Show notification modal
            titleModal: this.$t('Error!'), // Modal title
            messageModal: error_mensaje, // Error message
            buttonModal: this.$t('Aceptar'), // Button text
            orderModal: 'closeModal', // Order to close modal
          };
        }
      });
    },
    changeSelect: function (event: any) {
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get options key
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Clone arraySelects
			if (optionsKey == 'countryList') {
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value) // Filter departments based on selected country
					.map((x) => x.departments)[0];
				departments.forEach((department) => {
					department.value = department.Id; // Map department ID to value
					department.name = department.Name; // Map department name
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Add department list to arraySelects
				});
				this.model['department'] = ''; // Reset department model
			}
		},
		closeModal() {
			this.appComponent.closeModal(); // Close modal
		},
	},
});
</script>
<template>
  <!--
  Renders the custom "Work With Us" form (AppFormWorkWithUs) if the corresponding version is active.

  Props used:
  - loading: Displays the loading state while the form is initializing or submitting.
  - styleWidth / windowFrame: Control the visual layout of the form.
  - title, backgroundForm, fontColorForm, background-size: Visual and style configuration of the form.
  - fields: Dynamic structure of the form fields.
  - arraySelects: Option lists (e.g., countries and departments).
  - model: Object containing the form values (v-model).
  - textDown: Additional text displayed at the bottom of the form.
  - textButton: Custom text for the submit button.

  Events:
  - @onSubmit2:form → Triggers the onSubmit2 function when the form is submitted.
  - @changeSelect:form → Triggers changeSelect when a select-type field changes.
  -->
  <AppFormWorkWithUs
      v-if="isWorkWithUsVersion"
      :loading="loadingForm"
      :styleWidth="false"
      :windowFrame="false"
      :title="titleForm"
      :backgroundForm="backgroundForm"
      :fontColorForm="fontColorForm"
      :background-size="backgroundSize"
      :fields="fields"
      :arraySelects="arraySelects"
      :model="model"
      :textDown="textDownForm"
      :textButton="'¡QUIERO MI AGENCIA!'"
      @onSubmit2:form="onSubmit2($event)"
      @changeSelect:form="changeSelect($event)"
  />

  <AppForm
      v-else
      :loading="loadingForm"
      :styleWidth="false"
      :windowFrame="false"
      :title="titleForm"
      :textUp="textUp"
      :backgroundForm="backgroundForm"
      :fontColorForm="fontColorForm"
      :background-size="backgroundSize"
      :fields="fields"
      :arraySelects="arraySelects"
      :model="model"
      :textDown="textDownForm"
      :textButton="'Enviar'"
      :recaptcha="recaptcha"
      @onSubmit:form="onSubmit($event)"
      @changeSelect:form="changeSelect($event)"
  />
</template>

<!-- FILE DOCUMENTED -->

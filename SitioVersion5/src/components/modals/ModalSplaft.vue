<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import apiService from '@/services/ApiService'; // Importing apiService for API requests

export default defineComponent({
	components: {
		AppForm, // Registering AppForm component
	},
	data() {
		// Defining reactive data properties for the component
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let loadingForm = false; // Loading state for the form
		let titleForm: string = ''; // Title for the form
		let textUp: string = this.$t(
			"<h3 class='font-bold text-lg text-center'>FORMATO DE DECLARACIÓN - CLIENTE GANADOR DE PREMIOS MAYORES A S/. 8\MIL</h3><div class='text-justify'>Declaro bajo juramento que la información consignada es verdadera y actual, y que la consigno de manera voluntaria a solicitud de Interplay Word SAC, en el marco de las normas para la prevención del lavado de activos y financiamiento del terrorismo</div><div class='py-4 text-justify'><b>Autorizo a Interplay Word SAC a remitirla a la UIF-Perú</b> en caso dicha entidad, o quien haga sus veces, lo requiera</div>"
		); // Text displayed above the form
		let textDownForm: string = ''; // Text displayed below the form
		let fields: any =
			this.$config().splaft.form[this.$appComponent['country']]; // Form fields based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let recaptcha: boolean = this.$config().splaft.recaptcha.show; // ReCAPTCHA visibility
		let modalConfirm: boolean = false; // State for confirmation modal
		let itemChange: string = ''; // Track which field has changed

		return {
			config,
			appComponent,
			emitter,
			refreshBalance,
			loadingForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			titleForm,
			textUp,
			textDownForm,
			widthForm,
			recaptcha,
			modalConfirm,
			itemChange,
		};
	},
	unmounted() {
		// Cleanup when component is unmounted
		this.emitter.all.delete('accept:modal'); // Remove event listener for modal acceptance
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal on event
		});
		this.fields.forEach((field) => {
			// Iterate over form fields to populate select options
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
		apiService.request('get_countries2', {}).then((response: any) => {
			// API request to fetch countries
			if (response.code == 0) {
				for (var i = 0; i < response.data.length; i++) {
					response.data[i].value = response.data[i].Id; // Set value for each country
					response.data[i].name = response.data[i].Name; // Set name for each country
				}
				Object.assign(this.arraySelects, {
					nationalityList: response.data, // Add nationality list to arraySelects
				});
				// Populate model with session data
				this.model.paternal_last_name =
					this.appComponent.session.paternal_last_name;
				this.model.mother_last_name =
					this.appComponent.session.mother_last_name;
				this.model.first_name = this.appComponent.session.first_name;
				this.model.nationality_id =
					this.appComponent.session.nationalityid;
				this.model.doc_type = this.appComponent.session.doc_type;
				this.model.doc_nationality =
					this.appComponent.session.nationalityid;
				this.model.identification =
					this.appComponent.session.identification;
				this.model.email = this.appComponent.session.email;
				this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Clone model for initial state
				this.loadingForm = true; // Set loading state to true
			}
		});
	},
	methods: {
		close() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close modal
		},
		onSubmit(values: any) {
			// Method to handle form submission
			apiService.request('send_form', values).then((response: any) => {
				this.close(); // Close modal after submission
				if (response.code == 0) {
					// Check for successful response
					this.appComponent.modalAlert.unshift({
						type: 'success',
						message: 'El formulario se envío correctamente.', // Success message
					});
					this.refreshBalance(); // Refresh balance after successful submission
				} else {
					var error_mensaje = ''; // Initialize error message
					if (response.error_code != undefined) {
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Translate error message
						);
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
						);
					}
					this.appComponent.modalAlert.unshift({
						type: 'error',
						message: error_mensaje, // Display error message
					});
				}
			});
		},
		changeField(event: any) {
			// Method to handle field change
			this.itemChange = event.item.name; // Track changed field
			let value = event.event.target.value; // Get new value
			this.modalConfirm = true; // Show confirmation modal
		},
		cancelChange() {
			// Method to cancel field change
			this.model[this.itemChange] = this.modelInitial[this.itemChange]; // Revert to initial value
			this.modalConfirm = false; // Hide confirmation modal
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal">
		<!-- Modal box with specific styles -->
		<div
			class="modal-box modal-box-splaft w-11/12 max-w-3xl text-black pr-2 pl-2"
			:class="
				config.layout != undefined && config.layout == 3
					? 'bg-secondary' // Background color based on layout
					: 'bg-base-100'
			"
		>
			<!-- Close button for the modal -->
			<div class="container-modal mb-5">
				<label
					@click="close()"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
			</div>
			<!-- AppForm component for the form -->
			<AppForm
				:loading="loadingForm"
				:title="titleForm"
				:fields="fields"
				:styleWidth="widthForm"
				:textUp="textUp"
				:backgroundForm="'transparent'"
				:arraySelects="arraySelects"
				:model="model"
				:textDown="textDownForm"
				:textButton="'Enviar'"
				:recaptcha="recaptcha"
				@onSubmit:form="onSubmit($event)"
				@changeField:form="changeField($event)"
			/>
		</div>
	</div>
	<!-- Confirmation modal for field changes -->
	<div v-if="modalConfirm" class="modal z-[999999999]">
		<div class="modal-box w-11/12 max-w-5xl">
			<label
				@click="cancelChange()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<h3
				class="font-bold text-lg text-black"
				v-html="'Confirmación'"
			></h3>
			<p
				class="py-4 text-black"
				v-html="'Seguro que esa es la respuesta correcta?'"
			></p>
			<div class="modal-action text-black">
				<label @click="modalConfirm = false" class="btn text-black"
					>Aceptar</label
				>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

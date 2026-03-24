<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data() {
		// Data properties for the component
		let showSecondModal: boolean = false; // Controls visibility of the second modal
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let loadingForm = false; // Loading state for the form
		let idUser: any; // User ID
		let titleForm: string = ''; // Title for the form
		let textUp: string = this.$t(
			"<h3 class='font-bold text-lg text-center'>Actualización de datos</div>"
		); // Text for the update modal
		let textUp2: string = this.$t(
			"<h3 class='font-bold text-lg text-center'>Restablecer cuenta</div>"
		); // Text for the reset account modal
		let textDownForm: string = ''; // Text for the bottom of the form
		let fields: any =
			this.$config().reset1.form[this.$appComponent['country']]; // Form fields for reset1 based on country
		let fields2: any =
			this.$config().reset2.form[this.$appComponent['country']]; // Form fields for reset2 based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let modalConfirm: boolean = false; // Controls visibility of confirmation modal
		let itemChange: string = ''; // Tracks the changed item
		return {
			idUser,
			showSecondModal,
			appComponent,
			emitter,
			refreshBalance,
			loadingForm,
			fields,
			fields2,
			arraySelects,
			model,
			modelInitial,
			titleForm,
			textUp,
			textUp2,
			textDownForm,
			widthForm,
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
			// Iterate over fields to populate select options
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
		this.loadingForm = true; // Set loading state to true
	},
	methods: {
		close() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close the modal
		},
		onSubmit(values: any) {
			// Method to handle form submission
			this.loadingForm = false; // Set loading state to false
			apiService.request('user_query', values).then((response: any) => {
				// Make API request for user query
				apiService
					.request('get_countries2', {})
					.then((response: any) => {
						// Make API request for countries
						if (response.code == 0) {
							for (var i = 0; i < response.data.length; i++) {
								response.data[i].value = response.data[i].Id; // Set value for select options
								response.data[i].name = response.data[i].Name; // Set name for select options
							}
							Object.assign(this.arraySelects, {
								nationalityList: response.data, // Add nationality list to arraySelects
							});
						}
					});
				this.showSecondModal = true; // Show the second modal
				this.loadingForm = true; // Set loading state to true
				if (response.code == 0) {
					this.idUser = response.data.userId; // Store user ID from response
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
						message: error_mensaje, // Push error message to modal alert
					});
					this.close(); // Close the modal
				}
			});
		},
		onSubmit2(values: any) {
			// Method to handle second form submission
			values.id = this.idUser; // Assign user ID to values
			apiService
				.request('register_user_account', values) // Make API request to register user account
				.then((response: any) => {
					this.close(); // Close the modal
					if (response.code == 0) {
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
							message: error_mensaje, // Push error message to modal alert
						});
					}
				});
		},
		changeField(event: any) {
			// Method to handle field change
			this.itemChange = event.item.name; // Store the name of the changed item
			let value = event.event.target.value; // Get the new value
			this.modalConfirm = true; // Show confirmation modal
		},
		cancelChange() {
			// Method to cancel changes
			this.model[this.itemChange] = this.modelInitial[this.itemChange]; // Revert to initial value
			this.modalConfirm = false; // Hide confirmation modal
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal">
		<!-- Modal box with specific styling -->
		<div
			class="modal-box modal-box-splaft w-11/12 max-w-3xl text-black pr-2 pl-2"
		>
			<!-- Container for modal close button -->
			<div class="container-modal mb-5">
				<label
					@click="close()"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
			</div>
			<!-- First form displayed if showSecondModal is false -->
			<AppForm
				v-if="!showSecondModal"
				:loading="loadingForm"
				:title="titleForm"
				:fields="fields"
				:styleWidth="widthForm"
				:backgroundForm="'transparent'"
				:arraySelects="arraySelects"
				:model="model"
				:textUp="textUp2"
				:textDown="textDownForm"
				:textButton="'Enviar'"
				@onSubmit:form="onSubmit($event)"
				@changeField:form="changeField($event)"
			/>
			<!-- Second form displayed if showSecondModal is true -->
			<AppForm
				v-else
				:loading="loadingForm"
				:title="titleForm"
				:fields="fields2"
				:styleWidth="widthForm"
				:backgroundForm="'transparent'"
				:arraySelects="arraySelects"
				:model="model"
				:textUp="textUp"
				:textDown="textDownForm"
				:textButton="'Enviar'"
				@onSubmit:form="onSubmit2($event)"
				@changeField:form="changeField($event)"
			/>
		</div>
	</div>
	<!-- Confirmation modal displayed if modalConfirm is true -->
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import AppForm from '@/components/Form.vue';
import ModalAlert from '@/components/modals/ModalAlert.vue';
export default defineComponent({
	components: {
		AppForm, // Component for the form
		ModalAlert, // Component for modal alerts
	},
	data() {
		let appComponent: any = this.$appComponent; // Reference to the application component
		let emitter = this.$emitter(); // Event emitter for communication
		let config = this.$config(); // Configuration object
		let fields: any =
			this.$config() != undefined &&
			this.$config().form != undefined &&
			this.$config().form[this.$appComponent['titleModalGenericForm']] !=
				undefined &&
			this.$config().form[this.$appComponent['titleModalGenericForm']]
				.inputs != undefined
				? this.$config().form[
						this.$appComponent['titleModalGenericForm']
					].inputs // Form fields based on configuration
				: [];
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let responseRegister: any = {}; // Response from registration
		let background: string = ''; // Background style
		let windowFrame: boolean = false; // Flag for window frame visibility
		let loadView = true; // Flag to control loading state
		let title: any = ''; // Title for the modal
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let modelInitial: any = {}; // Initial model state
		let onModal: boolean = false; // Flag to control modal visibility
		let message: string = ''; // Message to display in modal
		let params: any = {}; // Parameters for API request
		return {
			config,
			emitter,
			appComponent,
			fields,
			arraySelects,
			model,
			responseRegister,
			background,
			windowFrame,
			loadView,
			title,
			refreshBalance,
			modelInitial,
			onModal,
			message,
			params,
		};
	},
	mounted() {
		if (
			this.config.form.hasOwnProperty(
				this.appComponent.titleModalGenericForm
			)
		) {
			this.title =
				this.config.form[this.appComponent.titleModalGenericForm].title; // Set modal title from config
		}
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Close modal on accept event
		});
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assign select options to arraySelects
				Object.assign(this.arraySelects, options);
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			this.onModal = true; // Show modal on submit
			this.params = {
				personsInfluenceOnSportingEvents:
					values.personsInfluenceOnSportingEvents,
				OfficialMincetur: values.OfficialMincetur,
			}; // Prepare parameters for API request
			this.message = this.$t(
				'Al confirmar, aceptas que la información es correcta. ¿Está seguro que deseas guardar estos cambios?'
			); // Confirmation message
			console.log(this.params); // Log parameters for debugging
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		recachParams() {
			this.appComponent.disabledButtonForm = false; // Enable form button
			this.onModal = false; // Hide modal
			this.params = {}; // Reset parameters
		},
		reedm() {
			apiService
				.request('send_form2', this.params) // Send API request
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modalAlert.unshift({
							type: 'success',
							message: 'Formulario enviado exitosamente', // Success message
						});
						this.closeModal(); // Close modal on success
						this.refreshBalance(); // Refresh balance
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial)
						); // Reset model to initial state
					} else {
						var error_mensaje = '';
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Generic error message
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for error modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to perform on button click
						};
					}
				});
		},
		closeModal() {
			this.appComponent.closeModal(); // Close modal
		},
	},
});
</script>
<template>
	<!-- Modal displayed when onModal is true -->
	<div v-if="onModal" class="modal z-[999999999]">
		<div
			class="container-general bg-white rounded-xl p-5 flex flex-col gap-y-6 justify-center items-center"
		>
			<h3 class="text-center text-black font-poppinssb" v-t>
				{{ title }}
				<!-- Modal title -->
			</h3>
			<div class="w-1/2">
				<p class="text-center text-black font-poppinssl" v-t>
					{{ message }}
					<!-- Confirmation message -->
				</p>
			</div>
			<div class="flex w-full gap-x-7 justify-center items-center">
				<button
					@click="recachParams()"
					class="text-white px-6 rounded-full uppercase mt-4 bg-gradient-to-t from-[#652b2b] to-[#af1919] border-1 border-solid border-red-700 hover:scale-105"
					v-t
				>
					{{ $t('Cancel') }}
					<!-- Cancel button -->
				</button>
				<button
					@click="(reedm(), (onModal = false))"
					class="ext-white px-6 rounded-full uppercase mt-4 bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105"
					v-t
				>
					{{ $t('Aceptar') }}
					<!-- Accept button -->
				</button>
			</div>
		</div>
	</div>
	<!-- Modal displayed when onModal is false -->
	<div v-if="!onModal" class="modal z-[999999999]">
		<div
			class="container-general w-11/12 max-w-3xl flex flex-col justify-center items-center h-[98%]"
		>
			<div
				class="cointainer-tile bg-neutral w-11/12 max-w-3xl rounded-t-lg flex justify-center items-center h-16 relative"
			>
				<h3
					class="font-bold text-md md:text-xl text-success text-center w-3/5"
				>
					{{ $t(title) }}
					<!-- Title for the form modal -->
				</h3>
			</div>
			<div
				class="w-11/12 max-w-3xl overflow-y-auto bg-neutral rounded-b-lg"
			>
				<AppForm
					:loading="loadView"
					:title="''"
					:fields="fields"
					:styleWidth="true"
					:window-frame="false"
					:arraySelects="arraySelects"
					:model="model"
					:text-button="'Enviar'"
					@onSubmit:form="onSubmit($event)"
					@changeSelect:form="changeSelect($event)"
				/>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

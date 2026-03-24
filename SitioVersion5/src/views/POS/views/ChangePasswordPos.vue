<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data: function () {
		let config: any = this.$config(); // Retrieving configuration settings
		let emitter: any = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the app component
		let loadingForm = true; // State to manage loading status of the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text to display below the form
		let fields: any =
			this.$config != undefined &&
			this.$config().changePassword != undefined &&
			this.$config().changePassword.form != undefined &&
			this.$config().changePassword.form[this.$appComponent['country']] !=
				undefined
				? this.$config().changePassword.form[
						this.$appComponent['country']
					]
				: []; // Fields for the change password form based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state for the form
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance: any = this.$refreshBalance; // Function to refresh balance
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
		this.emitter.all.delete('accept:modal'); // Clean up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Set up event listener for modal acceptance
			this.appComponent.closeModal(); // Close the modal when accepted
		});
		this.fields.forEach((field) => {
			// Iterate through fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assign options to the select key
				Object.assign(this.arraySelects, options); // Merge options into arraySelects
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				password: values.current_password, // Current password from form
				new_password: values.password, // New password from form
			};
			apiService
				.request('update_user_password', params) // API request to update password
				.then((response: any) => {
					if (response.code == 0) {
						// Check for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Contraseña cambiada satisfactoriamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Reset model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Fallback error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close the modal
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
		class="Framework InfoPage mi-cuenta bg-neutral-content"
		v-if="appComponent.session.logueado"
	>
		<!-- Box for displaying information -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title container -->
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

							>{{ $t('Cambiar Contraseña') }}</span
						>
					</span>
				</div>
				<!-- Content area for the form -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Instructions for password requirements -->
						<div
							class="p-5 shadow-md bg-base-400"
							style="margin-bottom: 10px"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral rounded-b-xl'
									: 'text-neutral rounded-xl'
							"
						>
							{{ $t('La nueva clave tiene que tener') }}
							<span
								v-if="
									config.passwordPrincipal != undefined &&
									config.passwordPrincipal.passwordChange !=
										undefined &&
									config.passwordPrincipal.passwordChange !=
										null
								"
								>{{ config.passwordPrincipal.passwordChange }}
								{{ $t('caracteres y debe de contener') }}</span
							>
							{{
								$t(
									'mínimo una minúscula, una mayúscula y un número'
								)
							}}
							<br /><span
								v-if="
									config.passwordPrincipal != undefined &&
									config.passwordPrincipal.textPassword !=
										undefined &&
									config.passwordPrincipal
										.DaysExpirePassword != undefined &&
									config.passwordPrincipal
										.DaysExpirePassword != null
								"
								v-t="{
									path: config.passwordPrincipal.textPassword,
									args: {
										password:
											config.passwordPrincipal
												.DaysExpirePassword,
									},
								}"
							></span>
						</div>
						<!-- Form container -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
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

<script lang="ts">
import { Form, Field } from 'vee-validate'; // Import Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Import Yup for schema validation
import { defineComponent } from 'vue'; // Import defineComponent to create a Vue component
import apiService from '@/services/ApiService'; // Import apiService for making API requests

export default defineComponent({
	components: {
		Form, // Register Form component
		Field, // Register Field component
	},
	props: {
		data: { type: Object, default: { id: '', logo: '' } }, // Define props with default values
	},
	data() {
		let config = this.$config(); // Retrieve configuration
		let emitter = this.$emitter(); // Retrieve event emitter
		let appComponent: any = this.$appComponent; // Reference to the app component
		let modelConfigMethods: any = {
			friUsername: '', // Initialize friUsername
			friPhoneNumber: '', // Initialize friPhoneNumber
		};
		const schema = Yup.object().shape({}); // Define validation schema using Yup
		return {
			config,
			emitter,
			appComponent,
			modelConfigMethods,
			schema,
		};
	},
	methods: {
		confirmedMethods() {
			const params = {
				id: this.data.id, // Get id from props
				friUsername: this.modelConfigMethods.friUsername, // Get friUsername from data
				friPhoneNumber: this.modelConfigMethods.friPhoneNumber, // Get friPhoneNumber from data
			};
			apiService
				.request('configured_method', params) // Make API request with parameters
				.then((response: any) => {
					if (response.code == 0) {
						// Check for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Satisfactorio!'), // Set modal title
							messageModal: this.$t('Método de pago configurado'), // Set modal message
							buttonModal: this.$t('Aceptar'), // Set button text
							orderModal: 'updateMethods', // Set order for modal actions
						};
					} else {
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							// Check for specific error code
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Translate error message
							);
						}
						if (
							error_mensaje == '' &&
							response.data != undefined &&
							typeof response.data == 'string'
						) {
							error_mensaje = this.$t(response.data); // Translate data error message
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal for error
							titleModal: this.$t('Transacción fallida!'), // Set modal title for error
							messageModal: error_mensaje, // Set error message
							buttonModal: this.$t('Aceptar'), // Set button text
							orderModal: 'closeModal', // Set order for modal actions
						};
					}
				});
		},
	},
});
</script>
<template>
	<!-- Main modal container with overlay -->
	<div
		class="modal text-base-content items-center bg-base-content bg-opacity-75 z-[9999]"
	>
		<!-- Modal box with rounded corners -->
		<div class="modal-box rounded-2xl overflow-visible max-w-[28rem]">
			<!-- Promotion image section -->
			<div
				class="promotion-image w-full h-full bg-red-700 shadow-md relative"
			>
				<!-- Close button for the modal -->
				<label
					@click="appComponent.closeModal()"
					class="close-btn btn btn-xs flex justify-center items-center btn-circle bg-gray-700 absolute text-base -top-3 -right-2 shadow-lg text-white transition ease-in-out hover:bg-red-700 hover:scale-105 z-1"
					>✕</label
				>
			</div>
			<!-- Container for form data -->
			<div class="container-data">
				<!-- Image display section -->
				<div
					class="w-full h-[151px] mb-5 flex justify-center items-center"
				>
					<img
						width="240"
						height="240"
						class="w-full h-full object-contain p-10"
						:src="data.logo"
					/>
				</div>
				<!-- Form for user input -->
				<Form
					@submit="confirmedMethods()"
					:validation-schema="schema"
					v-slot="{ errors }"
				>
					<!-- Username input field -->
					<div class="form-control mb-4">
						<Field
							id="friUsername"
							name="friUsername"
							:class="{ 'is-invalid': errors.friUsername }"
							:placeholder="$t('Usuario fri')"
							required="true"
							v-model="modelConfigMethods.friUsername"
							style="box-shadow: 0px 0px 0px 1px #cacaca"
							class="input input-bordered bg-input-background border-solid m-1 border-3 py-7 border-input-border text-center rounded-full text-neutral placeholder:text-input-placeholder"
							type="text"
						/>
						<!-- Error message for username field -->
						<div
							v-if="errors.friUsername != undefined"
							class="invalid-feedback alert alert-warning p-1 bg-error/20 text-error shadow-lg rounded-t-lg flex justify-center mb-3 flex-row gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="w-6 h-6 mx-2 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								></path>
							</svg>
							{{ errors.friUsername }}
							<!-- Display error message -->
						</div>
					</div>
					<!-- Phone number input field -->
					<div class="form-control">
						<Field
							style="box-shadow: 0px 0px 0px 1px #cacaca"
							class="input input-bordered bg-input-background border-solid m-1 border-3 py-7 border-input-border text-neutral text-center rounded-full placeholder:text-input-placeholder"
							type="number"
							id="friPhoneNumber"
							:class="{ 'is-invalid': errors.friPhoneNumber }"
							name="friPhoneNumber"
							:placeholder="$t('Teléfono')"
							v-model="modelConfigMethods.friPhoneNumber"
						/>
						<!-- Error message for phone number field -->
						<div
							v-if="errors.friPhoneNumber != undefined"
							class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-t-lg flex justify-center mb-3 gap-0"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="w-6 h-6 mx-2 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								></path>
							</svg>
							{{ $t(errors.friPhoneNumber) }}
							<!-- Display error message -->
						</div>
					</div>
					<!-- Submit button for the form -->
					<div class="modal-action flex justify-center items-center">
						<button
							type="submit"
							aria-label="Login"
							for="m-modal-login"
							class="bg-success2 px-8 py-2 text-white rounded-xl border-2 border-solid border-success hover:scale-105 capitalize"
							style="
								background: linear-gradient(
									357deg,
									rgb(7, 80, 4),
									rgb(7, 191, 64)
								);
							"
							:disabled="
								modelConfigMethods.friUsername == '' &&
								modelConfigMethods.friPhoneNumber == ''
							"
						>
							{{ $t('Guardar') }}
							<!-- Button text -->
						</button>
					</div>
				</Form>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import apiService from '@/services/ApiService'; // Importing the apiService for API requests

export default defineComponent({
	props: {
		dataInfo: {
			// Prop to receive data information
			type: Object, // Expecting an object type
			default: {}, // Default value is an empty object
		},
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		let codeVerifyPhone: string = ''; // Initializing the verification code as an empty string
		return {
			codeVerifyPhone, // Exposing the verification code to the template
			config, // Exposing the config to the template
			emitter, // Exposing the emitter to the template
			appComponent, // Exposing the app component to the template
		};
	},
	methods: {
		verifyCodePhone() {
			// Method to verify the phone code
			const params = {
				// Parameters for the API request
				email: this.dataInfo.emailVerifyPhone, // Email from dataInfo prop
				code: this.codeVerifyPhone, // Verification code from data
			};
			apiService
				.request('verify_code_phone', params) // Making API request to verify the phone code
				.then((response: any) => {
					// Handling the response
					if (response.code == 0) {
						// Check if the response code indicates success
						this.appComponent.modal = {
							// Setting up the modal for success notification
							showModal: 'notification',
							titleModal: this.$t('Verificado!'), // Title for the modal
							messageModal: this.$t(
								'Su celular se a verificado correctamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Order action for the modal
						};
					} else {
						// Handling error case
						this.appComponent.modal = {
							// Setting up the modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: this.$t(
								'El código introducido no coincide, por favor intente nuevamente.' // Error message
							),
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Order action for the modal
						};
					}
				});
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal">
		<!-- Box for modal content -->
		<div class="modal-box">
			<!-- Close button for the modal -->
			<label
				@click="appComponent.closeModal()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<!-- Title of the modal -->
			<h3 class="font-bold text-lg text-center">
				{{ $t('Introduce código enviado a su celular') }}
				<!-- Instruction for user -->
			</h3>
			<br />
			<!-- Input field for the verification code -->
			<input
				id="verification-mobile-code"
				v-focus
				minlength="6"
				maxlength="6"
				class="form-control wedding-input-text text-center wizard-input-pad input input-bordered shadowlogin rounded-full h-16 bg-base-200 border-2 border-solid border-white pl-6 w-full mx-auto"
				type="text"
				name="taxCode"
				v-model="codeVerifyPhone"
				placeholder="Introduce código 6 dígitos"
			/>
			<!-- Action buttons for the modal -->
			<div class="modal-action flex justify-center items-center">
				<!-- Button to trigger the verification method -->
				<label
					@click="verifyCodePhone()"
					class="btn btn-success hover:bg-success/70"
					>{{ $t('Aceptar') }}</label
				>
			</div>
		</div>
	</div>
</template>
<style scoped>
/* Global style for text color */
* {
	color: black; /* Setting text color to black for all elements */
}
</style>

<!-- FILE DOCUMENTED -->

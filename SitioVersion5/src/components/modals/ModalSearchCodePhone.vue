<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import apiService from '@/services/ApiService'; // Importing the apiService for making API requests

export default defineComponent({
	props: {
		dataInfo: {
			// Prop to receive data information
			type: Object,
			default: {},
		},
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component
		let codeVerifyPhone: string = ''; // Variable to hold the phone verification code
		let openCount: boolean = false; // Flag to control the visibility of the countdown
		return {
			codeVerifyPhone,
			config,
			emitter,
			appComponent,
			openCount,
		};
	},
	methods: {
		verifyCodePhone() {
			// Method to verify the phone code
			const params = {
				// Parameters for the API request
				type: 2,
				code: this.codeVerifyPhone, // Code entered by the user
				ticked: this.dataInfo.tickedCheckPhone, // Checkbox state from dataInfo
			};
			apiService.request('verify_phone', params).then((response: any) => {
				// API call to verify phone
				if (response.code == 0) {
					// Successful verification
					this.appComponent.modal = {
						// Setting modal properties for success notification
						showModal: 'notification',
						titleModal: this.$t('Verificado!'), // Translated title
						messageModal: this.$t(
							'Su celular se a verificado correctamente.'
						), // Success message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'verifyPhoneSuccess', // Modal order identifier
					};
				} else {
					// Verification failed
					var error_mensaje = ''; // Variable to hold error message
					if (response.error_code != undefined) {
						// Check if error code exists
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString()
						); // Translate error message
					}
					if (error_mensaje == '') {
						// Default error message if no specific error
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
						);
					}
					this.appComponent.modal = {
						// Setting modal properties for error notification
						showModal: 'notification',
						titleModal: this.$t('Error!'), // Translated title
						messageModal: error_mensaje, // Error message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Modal order identifier
					};
				}
			});
		},
		resendCode() {
			// Method to resend the verification code
			if (!this.appComponent.disabledOtherCount) {
				// Check if resending is allowed
				this.emitter.emit('resend:code'); // Emit event to resend code
			} else {
				// If resending is restricted
				let timeOP: any = localStorage.getItem('timeOtherPeticions'); // Retrieve last request time
				let numberValue = parseInt(timeOP); // Parse time to integer
				let sumMinutes = new Date(); // Create a new date object
				sumMinutes.setTime(
					numberValue + this.config.otherRestrictionTime * 1000
				); // Calculate the next allowed time
				let interval = setInterval(() => {
					// Set up a countdown interval
					this.openCount = true; // Show countdown
					if (sumMinutes.getTime() <= new Date().getTime()) {
						// Check if countdown is complete
						this.openCount = false; // Hide countdown
						clearInterval(interval); // Clear the interval
					}
				}, 1000); // Interval set to 1 second
			}
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal">
		<!-- Modal box for content -->
		<div class="modal-box flex flex-col justify-center items-center">
			<!-- Close button for the modal -->
			<label
				@click="appComponent.closeModal()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<!-- Title of the modal -->
			<h3 class="font-bold text-lg text-center">
				{{ $t('Introduce código enviado a su celular') }}
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
				:placeholder="$t('Introduce código 6 dígitos')"
			/>
			<!-- Countdown message if openCount is true -->
			<div v-if="openCount" class="text-primary">
				{{ $t('Intente de nuevo en: ') }}
				<!-- Countdown instruction -->
				<vue-countdown
					v-if="openCount"
					:time="appComponent.otherCount"
					:interval="100"
					v-slot="{ minutes, seconds }"
					class="text-primary font-poppinsm text-base md:text-lg text-center z-1"
				>
					{{ minutes }} : {{ seconds }}
				</vue-countdown>
				{{ $t(' segundos.') }}
			</div>
			<!-- Action buttons for the modal -->
			<div class="modal-action flex justify-center items-center">
				<!-- Button to resend the code -->
				<label
					@click="resendCode()"
					class="btn btn-secondary text-base-100"
					>{{ $t('Reenviar Código') }}</label
				>
				<!-- Button to verify the code -->
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
/* Global styles for text color */
* {
	color: black; /* Set text color to black for all elements */
}
</style>

<!-- FILE DOCUMENTED -->

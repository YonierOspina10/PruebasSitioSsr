<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	props: {
		title: String, // Prop for the modal title
		message: String, // Prop for the modal message
		button: String, // Prop for the button text
	},
	data() {
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component instance
		return {
			emitter,
			appComponent,
		};
	},
	methods: {
		// Method to close the modal
		close() {
			this.appComponent.closeModal(); // Calls the closeModal method from the app component
		},
		// Method to close the modal and hide the deposit modal
		close2() {
			this.appComponent.closeModal(); // Calls the closeModal method
			this.appComponent.showModalDepositV2 = false; // Hides the deposit modal
		},
		// Method to send a confirmation email
		sendConfirmEmail() {
			apiService
				.request('send_confirm_email', {}) // Sends a request to send confirmation email
				.then((response: any) => {
					if (response.code == 0) {
						// Checks if the response code indicates success
						this.appComponent.modal = {
							showModal: 'notification', // Sets the modal type to notification
							titleModal: this.$t('Confirmar correo'), // Translates the title for the modal
							messageModal: this.$t(
								'Hemos enviado una mensaje a tu correo electrónico, debes confirmarlo para continuar con el proceso de actualización de cuenta'
							), // Translates the message for the modal
							buttonModal: this.$t('Aceptar'), // Translates the button text
							orderModal: 'closeModal', // Sets the order for closing the modal
						};
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Translates error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Sets the modal type to notification
							titleModal: this.$t('Error!'), // Translates the title for the error modal
							messageModal: error_mensaje, // Sets the error message
							buttonModal: this.$t('Aceptar'), // Translates the button text
							orderModal: 'closeModal', // Sets the order for closing the modal
						};
					}
				});
		},
	},
});
</script>

<template>
	<!-- Main modal container with background and styling -->
	<div
		class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
	>
		<!-- Modal box with specific width and rounded corners -->
		<div class="modal-box bg-base-300 text-neutral rounded-2xl w-10/12 md:w-8/12 max-w-2xl">
			<!-- Close button for the modal -->
			<label
				@click="close()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<!-- Container for modal content -->
			<div class="flex flex-col justify-center items-center">
				<!-- Displaying the translated modal message -->
				<div v-html="$t('modalConfirmEmail')"></div>
				<br />
				<!-- Link to trigger sending confirmation email -->
				<div @click="sendConfirmEmail()">
					<a class="text-neutral italic underline">{{
						$t('¿No me llega el mensaje?')
					}}</a>
				</div>
				<!-- Container for the button to accept and close the modal -->
				<div
					class="paragraph-image h-auto max-h-[24rem] mt-6 flex flex-col items-center"
				>
					<!-- Accept button to close the modal -->
					<button
						@click="close2()"
						class="bg-gradient-to-b from-[#66cc33] to-[#52b34b] p-4 rounded-xl text-neutral transition ease-in-out hover:scale-105"
					>
						{{ $t('Aceptar') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>

<!-- FILE DOCUMENTED -->

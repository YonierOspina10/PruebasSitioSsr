<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import apiService from '@/services/ApiService'; // Importing the apiService for making API requests

export default defineComponent({
	props: {
		dataInfo: {
			// Prop to receive data information
			type: Object, // Expecting an object type
			default: {}, // Default value is an empty object
		},
	},
	data() {
		let config = this.$config(); // Accessing the configuration object
		let emitter = this.$emitter(); // Accessing the event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		return {
			config, // Returning the config object
			emitter, // Returning the emitter
			appComponent, // Returning the app component
		};
	},
	methods: {
		acceptVerifyPhone() {
			// Method to accept and verify phone number
			const params = {
				email: this.dataInfo.emailVerifyPhone, // Extracting email from dataInfo
			};
			apiService.request('verify_phone', params).then((response: any) => {
				// Making API request to verify phone
				if (response.code == 0) {
					// Checking if the response code is successful
					this.appComponent.modal = {
						// Setting modal properties for notification
						showModal: 'notification', // Type of modal to show
						titleModal: this.$t('Código enviado'), // Title of the modal
						messageModal: this.$t(
							'Se ha enviado un código de 6 dígitos a su celular' // Message to display
						),
						buttonModal: this.$t('Aceptar'), // Button text for modal
						orderModal: 'acceptVerifyPhone', // Order identifier for modal
					};
				}
			});
		},
	},
});
</script>

<template>
	<div class="modal">
		<!-- Main modal container -->
		<div class="modal-box">
			<!-- Box for modal content -->
			<label
				@click="appComponent.closeModal()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<h3 class="font-bold text-lg">{{ $t('Verificar su celular') }}</h3>
			<!-- Modal title -->
			<p class="py-4">
				<!-- Paragraph for instructions -->
				{{
					$t(
						'Para Depositar por este método debe verificar su celular.'
					)
				}}<br /><br />{{ $t('Desea verificar su celular ?') }}
			</p>
			<div class="modal-action">
				<!-- Container for action buttons -->
				<label
					@click="acceptVerifyPhone()"
					class="btn btn-success hover:bg-success/70"
					>{{ $t('Verificar') }}</label
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
* {
	color: black; /* Set text color to black for all elements */
}
</style>

<!-- FILE DOCUMENTED -->

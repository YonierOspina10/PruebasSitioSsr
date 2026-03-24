<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import { useRoute } from 'vue-router'; // Importing the router to access route parameters
import router from '@/router'; // Importing the router instance

export default defineComponent({
	// Defining the Vue component
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component
		let validoT: boolean = true; // Initializing a validation flag
		return {
			config,
			emitter,
			appComponent,
			validoT,
		};
	},
	setup() {
		const route = useRoute(); // Accessing the current route
		let tokenP: any = ref(route.params.tokenP); // Creating a reactive reference for the token parameter
		return {
			tokenP,
		};
	},
	unmounted() {
		// Cleanup when the component is unmounted
		this.emitter.all.delete('accept:modal'); // Removing the event listener for 'accept:modal'
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing the modal on event
			router.push('/'); // Redirecting to the home page
		});
		if (this.tokenP != '' && this.tokenP != undefined) {
			this.validoT = false; // Setting validation flag to false if token is present
			this.confirm(); // Calling the confirm method to validate the token
		}
	},
	methods: {
		confirm() {
			// Method to confirm the token validation
			const params = {
				reset_code: this.tokenP, // Preparing parameters for the API request
			};
			apiService
				.request('update_validation', params) // Making the API request
				.then((response: any) => {
					if (response.code == 0) {
						// Handling successful response
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Actualización pendiente'), // Title for the modal
							messageModal: this.$t(
								'Ahora debe esperar la confirmación de su actualización por parte de un operador para finalizar el proceso' // Message for the modal
							),
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Order of modal actions
						};
					} else {
						// Handling error response
						var error_mensaje = ''; // Initializing error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'), // Title for the error modal
							messageModal: error_mensaje, // Error message for the modal
							buttonModal: this.$t('Aceptar'), // Button text for the modal
							orderModal: 'closeModal', // Order of modal actions
						};
					}
				});
		},
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Closing the modal
		},
	},
});
</script>
<template>
	<!-- Main container for the update data component -->
	<div class="update-data">
		<!-- Header section with gradient background -->
		<div
			class="int-header h-auto bg-base-200 absolute w-full"
		></div>
		<!-- Title of the update data section -->
		<span
			class="text-neutral font-bold text-3xl relative z-1 lg:w-10/12 xl:w-8/12 w-12/12 mx-auto block pt-4 px-2"
			>{{ $t('Actualización de datos') }}</span
		>
		<!-- Main content area for displaying validation messages -->
		<div
			class="Framework InfoPage lg:w-10/12 xl:w-8/12 w-12/12 bg-neutral mx-auto my-3 rounded-xl shadow-md"
		>
			<div class="Box TextBox NoHeadBox InfoBox">
				<div class="BoxContent InfoBoxContent p-5 text-neutral-content">
					<!-- Conditional message based on validation status -->
					<span v-if="!validoT">{{
						$t('Estamos validando la información...')
					}}</span>
					<span v-if="validoT">{{
						$t(
							'No cuentas con una actualización de datos pendiente'
						)
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

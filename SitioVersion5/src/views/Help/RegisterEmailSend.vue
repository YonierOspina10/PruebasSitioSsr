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
		let email: any = ref(route.params.email); // Creating a reactive reference for email from route parameters
		let tokenP: any = ref(route.params.tokenP); // Creating a reactive reference for token from route parameters
		return {
			email,
			tokenP,
		};
	},
	unmounted() {
		// Cleanup when the component is unmounted
		this.emitter.all.delete('accept:modal'); // Removing the event listener for modal acceptance
	},
	mounted() {
		// Lifecycle hook called after the component is mounted
		this.emitter.on('accept:modal', () => {
			this.appComponent.closeModal(); // Closing the modal when the event is triggered
			router.push('/'); // Redirecting to the home page
		});
		if (
			this.email != '' &&
			this.email != undefined &&
			this.tokenP != undefined &&
			this.tokenP != undefined
		) {
			this.submit(); // Submitting the form if email and token are valid
			window.history.pushState('', '', '/verificar-email'); // Updating the browser history
			this.email = null; // Clearing the email reference
			this.tokenP = null; // Clearing the token reference
		}
	},
	methods: {
		submit() {
			// Method to submit the email validation request
			const params = {
				email: this.email, // Email parameter for the request
				code: this.tokenP, // Token parameter for the request
			};
			apiService.request('email_valid', params).then((response: any) => {
				// Handling the API response
				if (response.code == 0) {
					// If the response indicates success
					this.appComponent.modal = {
						showModal: 'notification', // Modal type
						titleModal: this.$t('Mensaje'), // Modal title
						messageModal: this.$t(
							'Registro validado satisfactoriamente.' // Success message
						),
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Action to perform on button click
					};
				} else {
					var error_mensaje = ''; // Variable to hold error message
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
						showModal: 'notification', // Modal type
						titleModal: this.$t('Error!'), // Modal title
						messageModal: error_mensaje, // Error message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Action to perform on button click
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
		<!-- Title of the validation process -->
		<span
			class="text-neutral font-bold text-3xl relative z-1 lg:w-10/12 xl:w-8/12 w-12/12 mx-auto block pt-4 px-2"
			>{{ $t('Validación email') }}</span
		>
		<!-- Container for the information box -->
		<div
			class="Framework InfoPage lg:w-10/12 xl:w-8/12 w-12/12 bg-neutral mx-auto my-3 rounded-xl shadow-md"
		>
			<!-- Inner box for displaying validation status -->
			<div class="Box TextBox NoHeadBox InfoBox">
				<div class="BoxContent InfoBoxContent p-5 text-neutral-content">
					<!-- Message indicating that validation is in progress -->
					<span>{{ $t('Estamos validando la información...') }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

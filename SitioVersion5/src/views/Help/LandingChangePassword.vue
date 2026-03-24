<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import { configure, Field, Form } from 'vee-validate'; // Importing validation functions and components from vee-validate
import apiService from '@/services/ApiService'; // Importing API service for making requests
import DoorOut from '@/components/icons/DoorOut.vue'; // Importing DoorOut icon component
import { Input } from 'flowbite-vue'; // Importing Input component from Flowbite Vue
import * as Yup from 'yup'; // Importing Yup for schema validation

// Configuring vee-validate to validate on various events
configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: true,
	validateOnModelUpdate: true,
});

export default defineComponent({
	components: {
		Input, // Registering Input component
		DoorOut, // Registering DoorOut icon component
		AppForm, // Registering AppForm component
		Form, // Registering Form component from vee-validate
		Field, // Registering Field component from vee-validate
	},
	data() {
		let appComponent: any = this.$appComponent; // Accessing app component
		let config: any = this.$config(); // Accessing configuration
		let emitter = this.$emitter(); // Accessing event emitter
		let model: any = {}; // Initializing model object
		let modelInitial: any = {}; // Initializing initial model object
		let modelForm: any = this.model; // Accessing model form
		let refreshBalance = this.$refreshBalance; // Accessing refresh balance method
		let fields: any =
			this.$config().landingChangePassword.form[
				this.$appComponent['country']
			]; // Accessing fields configuration based on country
		let clearError: boolean = true; // Flag to clear errors
		let form = {
			// Initializing form data
			current_password: '',
			password: '',
			password2: '',
		};
		const schema = Yup.object().shape({
			// Defining validation schema using Yup
			current_password: Yup.string().required(
				this.$t('Contraseña es requerida.') // Required validation for current password
			),
			password: Yup.string()
				.min(
					6,
					this.$t('La contraseña debe tener al menos 6 caracteres.') // Minimum length validation
				)
				.max(
					30,
					this.$t(
						'La longitud de la contrasena debe ser inferior o igual a 30 caracteres.' // Maximum length validation
					)
				)
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\[\]\\`~!@#$%^&*()_+={};:<>|.,?"'-]+$/,
					this.$t(
						'La contrasena debe contener números, mayúsculas y minúsculas.' // Pattern validation for password
					)
				)
				.required(this.$t('Contraseña es requerida.')), // Required validation for new password
			password2: Yup.string()
				.min(
					6,
					this.$t('La contraseña debe tener al menos 6 caracteres.') // Minimum length validation for confirmation password
				)
				.required(this.$t('Por favor repita la contraseña')) // Required validation for confirmation password
				.oneOf(
					[Yup.ref('password'), null],
					this.$t('Contraseña y confirmar contraseña no coinciden.') // Validation to check if passwords match
				),
		});
		let confirtPassword = ''; // Variable to hold confirmed password
		let invalidPassword = false; // Flag to indicate if password is invalid
		let page: number = 1; // Current page number
		let lastPage: boolean = true; // Flag to indicate if it's the last page
		return {
			appComponent,
			config,
			emitter,
			model,
			modelInitial,
			refreshBalance,
			form,
			confirtPassword,
			invalidPassword,
			fields,
			modelForm,
			clearError,
			page,
			lastPage,
			schema,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.confirtPassword = ''; // Resetting confirmed password
			this.appComponent.closeModal(); // Closing modal
			this.$router.push('/'); // Redirecting to home page
		});
	},
	methods: {
		forgetPassword() {
			// Method to handle password reset
			let params = {
				email: this.appComponent.session.email, // Getting email from session
			};
			apiService
				.request('reset_user_password', params) // Making API request to reset password
				.then((response: any) => {
					if (response.code == 0) {
						// Checking for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for success notification
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.' // Success message
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting model to initial state
						);
						this.appComponent.gAnalytics('exit_profile'); // Tracking analytics event
						this.appComponent.logOut(); // Logging out user
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Setting error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for error notification
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		onInvalidSubmit({ errors }) {
			// Method to handle invalid form submission
			this.clearError = true; // Resetting clear error flag
			if (
				this.config != undefined &&
				this.config.registro != undefined &&
				this.config.registro.steps != undefined &&
				this.config.registro.steps[this.appComponent.country] !=
					undefined &&
				this.config.registro.steps[this.appComponent.country]
			) {
				let fieldsPage: any = []; // Array to hold fields for the current page
				this.fields
					.filter((field) => {
						return field.page == this.page; // Filtering fields for the current page
					})
					.forEach((item: any) => {
						fieldsPage.push(item.name); // Adding field names to the array
					});
				var common = fieldsPage.filter(
					(x) => Object.keys(errors).indexOf(x) !== -1 // Finding common fields with errors
				);
				if (common.length == 0) {
					// If no common errors
					if (
						this.page <
						this.config.registro.steps[this.appComponent.country] // Checking if there are more pages
					) {
						this.page++; // Incrementing page number
						this.clearError = false; // Setting clear error flag to false
						if (
							this.page ==
							this.config.registro.steps[
								this.appComponent.country
							]
						) {
							this.lastPage = true; // Setting last page flag
						}
					}
				}
			}
		},
		onSubmit() {
			// Method to handle form submission
			console.log(this.form); // Logging form data
			let params = {
				password: this.form.current_password, // Current password
				new_password: this.form.password, // New password
			};
			apiService
				.request('update_user_password', params) // Making API request to update password
				.then((response: any) => {
					if (response.code == 0) {
						// Checking for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for success notification
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Contraseña cambiada satisfactoriamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.refreshBalance(); // Refreshing balance
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Resetting model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Setting error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Setting up modal for error notification
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for change select method
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal(); // Closing modal
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal fixed w-full h-full">
		<div class="w-full h-full overflow-auto">
			<!-- Background image -->
			<img
				class="absolute w-full h-full object-cover"
				:src="config.landingChangePassword.bg"
				alt="bg"
			/>
			<!-- Content container -->
			<div class="relative flex flex-col items-center gap-4 pt-8">
				<!-- Close button container -->
				<div class="w-full flex flex-col items-end">
					<button
						class="in bg-secondary-content h-12 w-12 flex justify-center items-center rounded-full shadow-inner shadow-black/70 border-2 border-solid border-secondary-focus hover:scale-105"
						@click="
							appComponent.gAnalytics('exit_profile');
							appComponent.logOut();
						"
					>
						<DoorOut
							:height="22"
							:width="22"
							:fill="'#ffffff'"
							class="ml-1"
						/>
					</button>
				</div>
				<!-- Title -->
				<h1 class="text-3xl font-poppinsb font-bold text-primary">
					{{ $t('CAMBIO DE CONTRASEÑA') }}
				</h1>
				<!-- Instruction text -->
				<p class="text-neutral text-lg text-center w-[75%] lg:w-[35%]">
					{{
						$t(
							'¡Hola! Parece que ha llegado el momento de actualizar tu contraseña. Cambiala ahora mismo, ya que ha caducado ¡Gracias por tu consideración!'
						)
					}}
				</p>
			</div>
			<!-- Main content area -->
			<main
				class="w-full flex flex-col lg:flex-row justify-center items-center gap-20 lg:gap-96 mt-10 pb-10"
			>
				<!-- Icon display -->
				<div
					class="flex justify-center items-center opacity-90 ml-0 lg:ml-20"
				>
					<img
						class="relative h-[20rem] lg:h-[30rem]"
						:src="config.landingChangePassword.icon"
						alt="icon"
					/>
				</div>
				<!-- Form container -->
				<div class="w-[28rem] pb-20 lg:pb-0">
					<Form
						@submit="onSubmit"
						@invalid-submit="onInvalidSubmit"
						:validation-schema="schema"
						v-slot="{ errors }"
						class="flex flex-col gap-6 p-12 py-14 bg-secondary rounded-3xl text-neutral shadow-[0px_2px_18px] shadow-neutral-content"
					>
						<!-- Current password field -->
						<div class="form-control">
							<label class="mb-2 ml-1">{{
								$t('Ingrese la contrasena actual:')
							}}</label>
							<Field
								v-model="form.current_password"
								id="current_password"
								type="password"
								name="current_password"
								:placeholder="
									$t('Ingrese la contrasena actual')
								"
								autocomplete="current-password"
								class="rounded-lg bg-input-background h-12 placeholder-input-placeholder text-neutral"
							/>
							<!-- Error message for current password -->
							<div
								v-if="errors.current_password != undefined"
								class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-lg mt-2 flex justify-center mb-3 gap-0"
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
								{{ errors.current_password }}
							</div>
						</div>
						<!-- New password field -->
						<div class="form-control">
							<label class="mb-2 ml-1">{{
								$t('Ingrese la contrasena nueva:')
							}}</label>
							<Field
								v-model="form.password"
								id="password"
								type="password"
								name="password"
								:placeholder="$t('Ingrese la contrasena nueva')"
								autocomplete="password"
								class="rounded-lg bg-input-background h-12 placeholder-input-placeholde text-neutral"
							/>
							<!-- Error message for new password -->
							<div
								v-if="errors.password != undefined"
								class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-lg mt-2 flex justify-center mb-3 gap-0"
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
								{{ errors.password }}
							</div>
						</div>
						<!-- Confirm new password field -->
						<div class="form-control">
							<label class="mb-2 ml-1">{{
								$t('Confirme la contrasena nueva:')
							}}</label>
							<Field
								v-model="form.password2"
								id="password2"
								type="password"
								name="password2"
								:placeholder="
									$t('Confirme la contrasena nueva')
								"
								autocomplete="password2"
								class="rounded-lg bg-input-background h-12 placeholder-input-placeholde text-neutral"
							/>
							<!-- Error message for confirmation password -->
							<div
								v-if="errors.password2 != undefined"
								class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-lg mt-2 flex justify-center mb-3 gap-0"
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
								{{ errors.password2 }}
							</div>
						</div>
						<!-- Link to reset password -->
						<div class="flex justify-center items-center">
							<h1 @click="forgetPassword" class="cursor-pointer">
								{{ $t('¿Olvidaste su contraseña?') }}
							</h1>
						</div>
						<!-- Submit button -->
						<div class="flex justify-center">
							<button class="bg-success w-32 h-10 rounded-xl">
								{{ $t('Guardar') }}
							</button>
						</div>
					</Form>
				</div>
			</main>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

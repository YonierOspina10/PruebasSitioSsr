<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import AppForm from '@/components/Form.vue'; // Importing a custom form component
import { configure, Field, Form } from 'vee-validate'; // Importing validation utilities from vee-validate
import apiService from '@/services/ApiService'; // Importing API service for making requests
import { Input } from 'flowbite-vue'; // Importing Input component from Flowbite Vue
import * as Yup from 'yup'; // Importing Yup for schema validation
import router from '@/router'; // Importing router for navigation

// Configuring validation behavior
configure({
	validateOnBlur: true, // Validate on blur event
	validateOnChange: true, // Validate on change event
	validateOnInput: true, // Validate on input event
	validateOnModelUpdate: true, // Validate on model update
});

// Defining the Vue component
export default defineComponent({
	components: {
		Input, // Registering Input component
		AppForm, // Registering AppForm component
		Form, // Registering Form component from vee-validate
		Field, // Registering Field component from vee-validate
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing application component
		let emitter = this.$emitter(); // Accessing event emitter
		let clientId: any =
			(window as any).cconfig.facebookLoginClienId != undefined
				? (window as any).cconfig.facebookLoginClienId // Getting Facebook client ID from global config
				: '';
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let count = 0; // Counter for login attempts
		let disabledCount = false; // Flag to disable login button
		let login = {
			// Object to hold login credentials
			email: '',
			password: '',
		};
		// Defining validation schema using Yup
		const schema = Yup.object().shape({
			email: Yup.string().required(
				this.$t('Se requiere correo electrónico') // Email is required
			),
			password: Yup.string()
				.min(
					4,
					this.$t('La contraseña debe tener al menos 4 caracteres.') // Password must be at least 4 characters
				)
				.required(this.$t('Contraseña es requerida.')), // Password is required
		});
		return {
			config,
			clientId,
			appComponent,
			emitter,
			refreshBalance,
			login,
			schema,
			count,
			disabledCount,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Event listener for modal acceptance
			this.appComponent.closeModal(); // Close modal when event is emitted
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let data = {
				// Data to be sent to the API
				username: values.email,
				password: values.password,
				typeApp: 1,
				timeRequest: true,
				in_app: true,
			};
			this.appComponent.disabledLogin = true; // Disable login button
			if (!this.appComponent.contingency) {
				// Check for contingency
				apiService
					.request('login', data) // Make API request for login
					.then((response: any) => {
						// Handle response
						if (response.code == 0) {
							// Successful login
							this.appComponent.firstReqBalance = false; // Reset balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Store token
							this.appComponent.user_id = response.data.user_id; // Store user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Store channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Store platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Store user token
							apiService.setAuthToken(response.data.auth_token); // Set auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Store auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enable menu flag
							this.appComponent.frm = 'lgn'; // Set form type
							try {
								(window as any).fLoadSuccess(
									this.appComponent.user_id,
									this.appComponent.frm // Call success function
								);
							} catch (e) {}
							this.refreshBalance(); // Refresh balance
							this.appComponent.loadJsAltenar(); // Load additional scripts
							if (this.appComponent.depositFromLanding != null) {
								// Check for landing deposit
								router.push('/gestion/deposito'); // Navigate to deposit page
							} else {
								router.push('/pos/menu'); // Navigate to menu page
							}
							try {
								if (
									(window as any).optimoveSDK != undefined &&
									(window as any).optimoveSDK.API != undefined
								) {
									(window as any).optimoveSDK.API.reportEvent(
										'login',
										{},
										null,
										this.appComponent.session.usuario // Report login event
									);
								}
							} catch (e) {}
							setTimeout(() => {
								this.emitter.emit('ready:login'); // Emit ready login event
							}, 2000);
						} else if (response.code == 1811) {
							// Handle specific error code
							this.appComponent.disabledLogin = true; // Disable login button
							let timeLogin: any =
								localStorage.getItem('timeLogin'); // Get login time from local storage
							let valorNumber = parseInt(timeLogin); // Parse login time
							let sumMinutes = new Date(); // Create date object
							sumMinutes.setTime(
								valorNumber + this.config.restrictionTime * 1000 // Set time for restriction
							);
							let interval = setInterval(() => {
								// Start interval for countdown
								this.count =
									sumMinutes.getTime() - new Date().getTime(); // Calculate remaining time
								this.disabledCount = true; // Disable count flag
								if (
									sumMinutes.getTime() <= new Date().getTime() // Check if time is up
								) {
									this.appComponent.disabledLogin = false; // Enable login button
									this.disabledCount = false; // Reset count flag
									clearInterval(interval); // Clear interval
								}
							}, 1000);
						} else {
							// Handle other errors
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Get error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								// Set modal for error notification
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.appComponent.disabledLogin = false; // Enable login button
						}
					})
					.catch((e) => {
						// Handle request error
						this.appComponent.modal = {
							// Set modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Mensaje!'),
							messageModal: this.$t(
								'La solicitud no pudo ser procesada, intente nuevamente por favor.' // Request processing error message
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.disabledCount = false; // Reset count flag
						this.appComponent.disabledLogin = false; // Enable login button
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hide login modal after timeout
				}, 1000);
			}
		},
		showpass() {
			// Method to toggle password visibility
			var pwd: any = document.getElementById('loginPassword'); // Get password input element
			if (pwd.type === 'password') {
				pwd.type = 'text'; // Change type to text
			} else {
				pwd.type = 'password'; // Change type back to password
			}
		},
		signInWithGoogle(userGoogle) {
			// Method for Google sign-in
			const params = {
				// Parameters for API request
				id_token: userGoogle.credential, // Google ID token
				country: this.appComponent.country, // User's country
				type: 1, // Type of authentication
			};
			this.appComponent.disabledLogin = true; // Disable login button
			if (!this.appComponent.contingency) {
				// Check for contingency
				apiService
					.request('external_auth', params) // Make API request for external authentication
					.then((response: any) => {
						// Handle response
						if (response.code == 0) {
							// Successful authentication
							this.appComponent.firstReqBalance = false; // Reset balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Store token
							this.appComponent.user_id = response.data.user_id; // Store user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Store channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Store platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Store user token
							apiService.setAuthToken(response.data.auth_token); // Set auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Store auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enable menu flag
							this.appComponent.frm = 'lgn'; // Set form type
							this.refreshBalance(); // Refresh balance
						} else {
							// Handle errors
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Get error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								// Set modal for error notification
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.appComponent.disabledLogin = false; // Enable login button
						}
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hide login modal after timeout
				}, 1000);
			}
		},
		signInWithFacebook(userFacebook) {
			// Method for Facebook sign-in
			const params = {
				// Parameters for API request
				id_token: userFacebook.authResponse.accessToken, // Facebook access token
				country: this.appComponent.country, // User's country
				type: 2, // Type of authentication
			};
			this.appComponent.disabledLogin = true; // Disable login button
			if (!this.appComponent.contingency) {
				// Check for contingency
				apiService
					.request('external_auth', params) // Make API request for external authentication
					.then((response: any) => {
						// Handle response
						if (response.code == 0) {
							// Successful authentication
							this.appComponent.firstReqBalance = false; // Reset balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Store token
							this.appComponent.user_id = response.data.user_id; // Store user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Store channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Store platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Store user token
							apiService.setAuthToken(response.data.auth_token); // Set auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Store auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enable menu flag
							this.appComponent.frm = 'lgn'; // Set form type
							this.refreshBalance(); // Refresh balance
						} else {
							// Handle errors
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Get error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								// Set modal for error notification
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.appComponent.disabledLogin = false; // Enable login button
						}
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hide login modal after timeout
				}, 1000);
			}
		},
		signInWithFacebookFailed() {
			// Method for handling Facebook sign-in failure
			var error_mensaje = this.$t(
				'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
			);
			this.appComponent.modal = {
				// Set modal for error notification
				showModal: 'notification',
				titleModal: this.$t('Error!'),
				messageModal: error_mensaje,
				buttonModal: this.$t('Aceptar'),
				orderModal: 'closeModal',
			};
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
				:src="
					config != undefined &&
					config.pos != undefined &&
					config.pos.bg != undefined
						? config.pos.bg
						: 'https://images.virtualsoft.tech/m/msj-1212T1703866525.png'
				"
				alt="bg"
			/>
			<!-- Main content area -->
			<main class="h-full w-full flex justify-center items-center">
				<!-- Modal box for login form -->
				<div
					v-if="config.layout != 6"
					class="modal-box rounded-2xl bg-white overflow-visible"
				>
					<!-- Header section -->
					<div
						class="flex flex-col justify-center items-center relative h-20 w-full mb-5"
					>
						<h2
							class="text-secondary text-4xl font-bold mt-10 uppercase"
						>
							{{ $t('Iniciar sesión') }}
							<!-- Login title -->
						</h2>
					</div>
					<!-- Form component with validation -->
					<Form
						@submit="onSubmit"
						:validation-schema="schema"
						v-slot="{ errors }"
					>
						<!-- Email input field -->
						<div class="form-control mb-2 mx-10">
							<label class="label pl-6">
								<span
									class="label-text text-base text-secondary"
									>{{ $t('Correo Electrónico') }}</span
								>
							</label>
							<Field
								id="loginUsername"
								name="email"
								:class="{ 'is-invalid': errors.email }"
								:placeholder="$t('Correo electrónico')"
								required="true"
								autocomplete="usuario"
								v-model="login.email"
								class="input input-bordered shadowlogin rounded-full h-16 bg-base-200 border-2 border-solid border-white pl-6"
								type="text"
							/>
							<!-- Error message for email -->
							<div
								v-if="errors.email != undefined"
								class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
								{{ errors.email }}
								<!-- Display error message -->
							</div>
						</div>
						<!-- Password input field -->
						<div class="form-control relative mx-10">
							<label class="label pl-6">
								<span
									class="label-text text-base text-secondary"
									>{{ $t('Contraseña') }}</span
								>
							</label>
							<Field
								class="input input-bordered shadowlogin rounded-full h-16 bg-base-200 border-2 border-solid border-white pl-6"
								type="password"
								id="loginPassword"
								:class="{ 'is-invalid': errors.password }"
								name="password"
								:placeholder="$t('Contraseña')"
								v-model="login.password"
								autocomplete="current-password"
							/>
							<!-- Button to toggle password visibility -->
							<button
								type="button"
								class="absolute top-[53px] right-6"
								id="showpass"
								@click="showpass()"
							>
								<font-awesome-icon
									class="text-xl text-gray-400"
									icon="fa-solid fa-eye"
								/>
							</button>
							<!-- Error message for password -->
							<div
								v-if="errors.password != undefined"
								class="invalid-feedback alert alert-warning p-1 bg-orange-300/20 text-orange-600/60 shadow-lg rounded-full flex justify-center mb-3 gap-0"
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
								<!-- Display error message -->
							</div>
						</div>
						<!-- Countdown and submit button -->
						<div class="grid mt-8 mx-10">
							<div
								v-if="disabledCount"
								class="cursor-pointer text-secondary text-lg hover:underline mx-auto hover:scale-105 pb-2"
							>
								{{ $t('Intente de nuevo en: ') }}
								<vue-countdown
									v-if="disabledCount"
									:time="count"
									:interval="100"
									v-slot="{ seconds }"
									class="text-black font-poppinsm text-base md:text-lg text-center z-1"
								>
									{{ seconds }}
									<!-- Display remaining seconds -->
								</vue-countdown>
								{{ $t(' segundos.') }}
							</div>
							<!-- Submit button -->
							<button
								v-show="!appComponent.disabledLogin"
								type="submit"
								@click="appComponent.gAnalytics('popup_login')"
								aria-label="Login"
								for="m-modal-login"
								:disabled="appComponent.disabledLogin"
								class="btn text-neutral text-base bg-accent-focus w-56 h-12 mx-auto hover:scale-105"
							>
								{{ $t('Iniciar sesión') }}
							</button>
							<!-- Loading button -->
							<button
								v-show="appComponent.disabledLogin"
								disabled
								class="btn text-neutral text-base bg-accent-focus w-56 h-12 mx-auto hover:scale-105"
							>
								<svg
									aria-hidden="true"
									role="status"
									class="inline w-4 h-4 mr-3 text-white animate-spin"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="#E5E7EB"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
								{{ $t('Iniciar sesión') }}
								<!-- Button text -->
							</button>
						</div>
					</Form>
					<!-- Partner-specific information -->
					<div
						v-if="appComponent.partner == 16"
						class="info-container bg-gray-300 rounded-xl p-3 mt-3 flex justify-center items-center flex-col text-sm"
						style="box-shadow: inset 0px 0px 16px 0px #0000001c"
					>
						<p class="text-gray-600 text-center mb-2">
							{{
								$t(
									'Hemos actualizado nuestra plataforma, puedes restablecer tu cuenta haciendo clic aquí:'
								)
							}}
						</p>
						<!-- Button to reset account -->
						<button
							@click="
								appComponent.showModalLogin = false;
								appComponent.modal.showModal = 'reset';
							"
							class="btn modal-button uppercase bg-success text-neutral p-3 rounded-xl font-bold"
							style="
								box-shadow:
									inset 0px -4px #0000004d,
									0px -1px 6px 0px #0000004d;
							"
						>
							{{ $t('RESTABLECER CUENTA') }}
							<!-- Button text -->
						</button>
					</div>
				</div>
				<!-- Alternative modal layout -->
				<dialog
					v-else
					class="modal w-screen h-screen bg-neutral-content/50 flex justify-center items-center"
				>
					<!-- Images for alternative layout -->
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1712238363.png"
						alt=""
						class="in lg:hidden absolute top-0 bottom-0 right-0 left-0 object-center object-contain w-full h-full max-w-[500px] max-h-[550px] m-auto"
					/>
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1712601712.png"
						alt=""
						class="in hidden lg:flex absolute top-0 bottom-0 right-0 left-0 object-center object-contain w-full h-full lg:w-[800px] max-h-[745px] m-auto"
					/>
					<!-- Section for login form -->
					<section
						class="in relative aspect-auto h-full w-11/12 max-w-[320px] lg:w-[800px] lg:max-w-none lg:max-h-[745px] max-h-[525px] lg:max-h-none lg:h-auto p-10 flex flex-col lg:flex-row z-50 justify-start lg:justify-center lg:items-center items-start"
					>
						<img
							src="https://images.virtualsoft.tech/m/msj23212T1712608160.png"
							alt=""
							class="w-1/2 h-[450px] object-contain hidden lg:flex"
						/>
						<div
							class="flex flex-col justify-center items-center lg:items-start w-full lg:w-[40%]"
						>
							<h2
								class="font-[500] text-3xl w-full text-center text-neutral"
							>
								{{ $t('Iniciar sesión') }}
								<!-- Login title -->
							</h2>
							<!-- Form component with validation -->
							<Form
								@submit="onSubmit"
								:validation-schema="schema"
								v-slot="{ errors }"
								class="w-full"
							>
								<!-- Email input field -->
								<div class="form-control w-full">
									<label class="label">
										<span
											class="label-text text-neutral text-neutral"
											>{{ $t('Correo') }}</span
										>
									</label>
									<div
										class="input input-bordered border-neutral flex items-center gap-1 pr-0 bg-secondary-focus focus:border-none w-full h-[50px]"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											class="w-8 h-8 opacity-70 text-neutral"
										>
											<path
												d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
											/>
											<path
												d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
											/>
										</svg>
										<Field
											id="loginUsername"
											name="email"
											:class="{
												'is-invalid': errors.email,
											}"
											:placeholder="
												$t(
													'Ingrese su correo electrónico'
												)
											"
											required="true"
											autocomplete="usuario"
											v-model="login.email"
											class="w-full bg-transparent border-none h-full text-lg"
											type="text"
										/>
									</div>
									<!-- Error message for email -->
									<label class="label">
										<span
											v-if="errors.email != undefined"
											class="label-text-alt flex invalid-feedback w-full bg-error/20 text-error shadow-lg rounded-full justify-center items-center gap-0"
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
											{{ errors.email }}
											<!-- Display error message -->
										</span>
									</label>
								</div>
								<!-- Password input field -->
								<div class="form-control w-full">
									<label class="label">
										<span
											class="label-text text-neutral text-neutral"
											>{{ $t('Contraseña') }}</span
										>
									</label>
									<div
										class="relative input input-bordered border-neutral flex items-center gap-1 pr-0 bg-secondary-focus w-full h-[50px]"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											class="w-8 h-8 opacity-70 text-neutral"
										>
											<path
												fill-rule="evenodd"
												d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
												clip-rule="evenodd"
											/>
										</svg>
										<Field
											class="w-full bg-transparent border-none h-full text-lg"
											type="password"
											id="loginPassword"
											:class="{
												'is-invalid': errors.password,
											}"
											name="password"
											:placeholder="$t('Contraseña')"
											v-model="login.password"
											autocomplete="current-password"
										/>
										<!-- Button to toggle password visibility -->
										<button
											type="button"
											class="absolute top-[15px] right-3"
											id="showpass"
											@click="showpass()"
										>
											<font-awesome-icon
												class="text-xl text-gray-400"
												icon="fa-solid fa-eye"
											/>
										</button>
									</div>
									<!-- Error message for password -->
									<label class="label">
										<span
											v-if="errors.password != undefined"
											class="label-text-alt flex invalid-feedback w-full bg-error/20 text-error shadow-lg rounded-full justify-center items-center gap-0"
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
											<!-- Display error message -->
										</span>
									</label>
								</div>
								<!-- Countdown and submit button -->
								<div
									v-if="disabledCount"
									class="cursor-pointer text-secondary text-lg hover:underline mx-auto hover:scale-105 pb-2"
								>
									{{ $t('Intente de nuevo en: ') }}
									<vue-countdown
										v-if="disabledCount"
										:time="count"
										:interval="100"
										v-slot="{ seconds }"
										class="text-black font-poppinsm text-base md:text-lg text-center z-1"
									>
										{{ seconds }}
										<!-- Display remaining seconds -->
									</vue-countdown>
									{{ $t(' segundos.') }}
								</div>
								<!-- Submit button -->
								<button
									v-show="!appComponent.disabledLogin"
									type="submit"
									@click="
										appComponent.gAnalytics('popup_login')
									"
									:disabled="appComponent.disabledLogin"
									class="h-14 btn btn-block btn-success hover:bg-success/75 hover:text-neutral text-lg my-4 capitalize border-neutral"
								>
									{{ $t('Inicia Sesión') }}
									<!-- Button text -->
								</button>
								<!-- Loading button -->
								<button
									v-show="appComponent.disabledLogin"
									disabled
									class="h-14 btn btn-block btn-success hover:bg-success/75 hover:text-neutral text-lg my-4 capitalize border-neutral"
								>
									<svg
										aria-hidden="true"
										role="status"
										class="inline w-4 h-4 mr-3 text-white animate-spin"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
									{{ $t('Iniciar sesión') }}
									<!-- Button text -->
								</button>
							</Form>
							<!-- Link for password recovery -->
							<div
								class="w-full flex flex-col justify-center items-center gap-6 z-50"
							>
								<RouterLink
									to="/recuperar-clave"
									@click="
										appComponent.showModalLogin = false;
										appComponent.gAnalytics(
											'forgot_password'
										);
									"
									class="mx-auto text-success font-light text-base hover:text-success/75 hover:scale-105"
									>{{ $t('¿Olvidaste tu contraseña?') }}
									<!-- Link text -->
								</RouterLink>
							</div>
						</div>
						<!-- Additional image for mobile view -->
						<img
							src="https://images.virtualsoft.tech/m/msj0212T1712246738.png"
							alt=""
							class="w-[50%] absolute bottom-5 right-0 aspect-auto z-10 lg:hidden"
						/>
					</section>
				</dialog>
			</main>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

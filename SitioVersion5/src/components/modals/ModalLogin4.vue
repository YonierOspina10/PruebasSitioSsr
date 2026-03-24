<script lang="ts">
import { Form, Field } from 'vee-validate'; // Importing Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Importing Yup for schema validation
import { defineComponent } from 'vue'; // Importing defineComponent to create a Vue component
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import FacebookLogin from '../FacebookLogin.vue'; // Importing FacebookLogin component
declare var optimoveSDK: any; // Declaring optimoveSDK variable for external SDK usage
import router from '@/router'; // Importing router for navigation
import IconClose from '../icons/IconClose.vue'; // Importing IconClose component

export default defineComponent({
	components: {
		Form, // Registering Form component
		FacebookLogin, // Registering FacebookLogin component
		Field, // Registering Field component
		IconClose, // Registering IconClose component
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component instance
		let emitter = this.$emitter(); // Getting the event emitter
		let clientId: any =
			(window as any).cconfig.facebookLoginClienId != undefined
				? (window as any).cconfig.facebookLoginClienId // Getting Facebook client ID from global config
				: '';
		let refreshBalance = this.$refreshBalance; // Method to refresh balance
		let count = 0; // Counter for login attempts
		let disabledCount = false; // Flag to disable login button
		let login = {
			email: '', // User email
			password: '', // User password
		};
		const schema = Yup.object().shape({
			// Defining validation schema for form
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
		let acceptModalHandler: (() => void) | null = null;
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
			acceptModalHandler,
			checkMultiLogin: false,
            lastFormValues: null,
		};
	},
	unmounted() {
		if (this.acceptModalHandler) {
            this.emitter.off('accept:modal', this.acceptModalHandler); // Cleaning up event listener on component unmount
        }
	},
	mounted() {
		this.acceptModalHandler = () => {
            if (this.appComponent.modal?.orderModal === 'multi-login') {
                this.checkMultiLogin = true;
                if (this.lastFormValues) {
                    this.onSubmit(this.lastFormValues);
                }
                return;
            }
            // Listening for modal acceptance event
            this.closeLoginModal(); // Closing modal when event is triggered
        };
        this.emitter.on('accept:modal', this.acceptModalHandler);
        this.emitter.on('go:register', () => {
            this.closeLoginModal();
        });
	},
	methods: {
		closeLoginModal() {
            this.appComponent.showModalLogin = false;
            this.appComponent.disabledLogin = false;
            this.appComponent.closeModal();
        },
		onSubmit(values: any) {
			this.lastFormValues = values; // Store the latest submitted form values for possible login retry

			// Method to handle form submission
			let data = {
				username: values.email, // User email from form
				password: values.password, // User password from form
				timeRequest: true, // Flag for time request
			};
			if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                dataSend.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }
			this.appComponent.disabledLogin = true; // Disabling login button
			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('login', data) // Making login request
					.then((response: any) => {
						if (response.code == 0) {
							// Successful login
							this.appComponent.firstReqBalance = false; // Resetting balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Storing token
							this.appComponent.user_id = response.data.user_id; // Storing user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Storing channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Storing platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Storing user token
							apiService.setAuthToken(response.data.auth_token); // Setting auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Storing auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enabling menu flag
							this.appComponent.frm = 'lgn'; // Setting form type to login
							try {
								(window as any).fLoadSuccess(
									this.appComponent.user_id,
									this.appComponent.frm // Reporting successful load
								);
							} catch (e) {}
							this.refreshBalance(); // Refreshing balance
							this.appComponent.loadJsAltenar(); // Loading additional scripts
							if (this.appComponent.depositFromLanding != null) {
								// Checking if redirecting from landing
								router.push('/gestion/deposito'); // Redirecting to deposit page
							} else {
								if (
									(this.config != undefined &&
										this.config.general != undefined) ||
									(this.config != undefined &&
										this.config.general_ != undefined)
								) {
									if (
										this.$route.path == '/registro' ||
										this.$route.path ==
											'/registro/:Codigo' ||
										this.$route.path ==
											'/registro/aff/:Codigo2' ||
										this.$route.path ==
											'/registro/a/:Codigo3' ||
										this.$route.path ==
											'/landing/registro' ||
										this.$route.path == '/landing/casino' ||
										this.$route.path ==
											'/landing/registro-casino' ||
										this.$route.path ==
											'/landing/deportivas' ||
										this.$route.path ==
											'/landing/registro-deportivas' ||
										this.$route.path ==
											'/landing/registro-corto' ||
										this.$route.path ==
											'/landing/registro-corto/:Codigo' ||
										this.$route.path ==
											'/landing/registro-corto/aff/:Codigo2' ||
										this.$route.path ==
											'/landing/registro-corto/a/:Codigo3' ||
										this.$route.path ==
											'/landing/registro-corto-loto' ||
										this.$route.path == '/casino/bono' ||
										this.$route.path == '/apuestas/bono'
									) {
										router.push('/deportes'); // Redirecting to sports page
									} else if (
										this.config != undefined &&
										this.config.general_ != undefined &&
										this.config.general_
											.isRedirectableLogin != undefined &&
										this.config.general_
											.isRedirectableLogin == true
									) {
										router.push(
											this.config.general_ != undefined &&
												this.config.general_
													.urlRedirectableLogin !=
													undefined
												? this.config.general_
														.urlRedirectableLogin
												: '/deportes' // Redirecting based on config
										);
									} else if (
										this.config != undefined &&
										this.config.general[
											this.appComponent.country
										] != undefined &&
										this.config.general[
											this.appComponent.country
										].isRedirectableLogin != undefined &&
										this.config.general[
											this.appComponent.country
										].isRedirectableLogin == true
									) {
										router.push(
											this.config.general != undefined &&
												this.config.general[
													this.appComponent.country
												] != undefined &&
												this.config.general[
													this.appComponent.country
												].urlRedirectableLogin !=
													undefined
												? this.config.general[
														this.appComponent
															.country
													].urlRedirectableLogin
												: '/deportes' // Redirecting based on country config
										);
									}
								} else {
									if (
										response.data.redirectUrl == '/betshop/'
									) {
										window.location.href =
											response.data.redirectUrl; // Redirecting to betshop
									} else if (
										response.data.redirectUrl != undefined
									) {
										router.push(response.data.redirectUrl); // Redirecting to specified URL
									}
								}
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
										this.appComponent.session.usuario // Reporting login event
									);
								}
							} catch (e) {}
							setTimeout(() => {
								this.emitter.emit('ready:login'); // Emitting ready login event after delay
							}, 2000);
						} else if (response.error_code === 300263) {
                            this.appComponent.crossCountryRegister = { // Store cross-country registration data in app cache (non-persistent)
                                email: response.data.details.email, // User email returned by backend
                                name: response.data.details.name, // User first name returned by backend
                                lastname: response.data.details.lastname, // User last name returned by backend
                                natalityDate: response.data.details.natalityDate, // User birth date returned by backend
                                countryFrom: response.data.details.countryName, // Country where the original account was created
                            };

                            this.appComponent.modal = { // Configure modal to inform the user about detected existing account
                                showModal: 'notification', // Modal type: notification
                                titleModal: this.$t('Cuenta detectada'), // Modal title (translated)
                                messageModal: this.$t( // Modal message explaining the multi-login situation
                                    'Hemos detectado que ya tienes una cuenta. Para jugar en, necesitas una cuenta local. ¿Quieres crearla usando tus datos ya registrados?'
                                ),
                                buttonModal: this.$t('No, continuar con mi cuenta'), // Primary button text: continue with existing account
                                buttonModal2: this.$t('Sí, crear cuenta en'), // Secondary button text: create a local account
                                orderModal: 'multi-login', // Modal behavior identifier for multi-login flow
                                link2: '/registro', // Redirect link for creating a new local account
                            };

                            this.modalStore.loading = false; // Disable loading state after processing response

						} else if (response.code == 1811) {
							// Handling specific error code
							this.appComponent.disabledLogin = true; // Disabling login button
							let timeLogin: any =
								localStorage.getItem('timeLogin'); // Retrieving login time from local storage
							let valorNumber = parseInt(timeLogin); // Parsing login time to integer
							let sumMinutes = new Date(); // Creating date object for time calculation
							sumMinutes.setTime(
								valorNumber + this.config.restrictionTime * 1000 // Setting time limit for login attempts
							);
							let interval = setInterval(() => {
								this.count =
									sumMinutes.getTime() - new Date().getTime(); // Updating countdown
								this.disabledCount = true; // Disabling count flag
								if (
									sumMinutes.getTime() <= new Date().getTime()
								) {
									this.appComponent.disabledLogin = false; // Enabling login button
									this.disabledCount = false; // Resetting count flag
									clearInterval(interval); // Clearing interval
								}
							}, 1000);
						} else {
							var error_mensaje = ''; // Variable for error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Getting error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Setting modal properties for error notification
								titleModal: this.$t('Error!'), // Modal title
								messageModal: error_mensaje, // Modal message
								buttonModal: this.$t('Aceptar'), // Modal button text
								orderModal: 'closeModal', // Modal close order
							};
							this.appComponent.disabledLogin = false; // Enabling login button
						}
					})
					.catch((e) => {
						this.appComponent.modal = {
							showModal: 'notification', // Setting modal properties for request error
							titleModal: this.$t('Mensaje!'), // Modal title
							messageModal: this.$t(
								'La solicitud no pudo ser procesada, intente nuevamente por favor.' // Error message for request failure
							),
							buttonModal: this.$t('Aceptar'), // Modal button text
							orderModal: 'closeModal', // Modal close order
						};
						this.disabledCount = false; // Resetting count flag
						this.appComponent.disabledLogin = false; // Enabling login button
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hiding login modal after timeout
				}, 1000);
			}
		},
		showpass() {
			// Method to toggle password visibility
			var pwd: any = document.getElementById('loginPassword'); // Getting password input element
			if (pwd.type === 'password') {
				pwd.type = 'text'; // Changing type to text to show password
			} else {
				pwd.type = 'password'; // Changing type back to password
			}
		},
		signInWithGoogle(userGoogle) {
			// Method to handle Google sign-in
			const params = {
				id_token: userGoogle.credential, // Google ID token
				country: this.appComponent.country, // User country
				type: 1, // Type of authentication
			};
			this.appComponent.disabledLogin = true; // Disabling login button
			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('external_auth', params) // Making external authentication request
					.then((response: any) => {
						if (response.code == 0) {
							// Successful authentication
							this.appComponent.firstReqBalance = false; // Resetting balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Storing token
							this.appComponent.user_id = response.data.user_id; // Storing user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Storing channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Storing platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Storing user token
							apiService.setAuthToken(response.data.auth_token); // Setting auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Storing auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enabling menu flag
							this.appComponent.frm = 'lgn'; // Setting form type to login
							this.refreshBalance(); // Refreshing balance
						} else {
							var error_mensaje = ''; // Variable for error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Getting error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Setting modal properties for error notification
								titleModal: this.$t('Error!'), // Modal title
								messageModal: error_mensaje, // Modal message
								buttonModal: this.$t('Aceptar'), // Modal button text
								orderModal: 'closeModal', // Modal close order
							};
							this.appComponent.disabledLogin = false; // Enabling login button
						}
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hiding login modal after timeout
				}, 1000);
			}
		},
		signInWithFacebook(userFacebook) {
			// Method to handle Facebook sign-in
			const params = {
				id_token: userFacebook.authResponse.accessToken, // Facebook access token
				country: this.appComponent.country, // User country
				type: 2, // Type of authentication
			};
			this.appComponent.disabledLogin = true; // Disabling login button
			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('external_auth', params) // Making external authentication request
					.then((response: any) => {
						if (response.code == 0) {
							// Successful authentication
							this.appComponent.firstReqBalance = false; // Resetting balance request flag
							this.appComponent.tokenSB = response.data.tokenSB; // Storing token
							this.appComponent.user_id = response.data.user_id; // Storing user ID
							this.appComponent.channel_id =
								response.data.channel_id; // Storing channel ID
							this.appComponent.id_platform =
								response.data.id_platform; // Storing platform ID
							this.appComponent.tokenUser =
								response.data.auth_token; // Storing user token
							apiService.setAuthToken(response.data.auth_token); // Setting auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Storing auth token in local storage
							);
							this.appComponent.flagMenu = true; // Enabling menu flag
							this.appComponent.frm = 'lgn'; // Setting form type to login
							this.refreshBalance(); // Refreshing balance
						} else {
							var error_mensaje = ''; // Variable for error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Getting error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Setting modal properties for error notification
								titleModal: this.$t('Error!'), // Modal title
								messageModal: error_mensaje, // Modal message
								buttonModal: this.$t('Aceptar'), // Modal button text
								orderModal: 'closeModal', // Modal close order
							};
							this.appComponent.disabledLogin = false; // Enabling login button
						}
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hiding login modal after timeout
				}, 1000);
			}
		},
		signInWithFacebookFailed() {
			// Method to handle failed Facebook sign-in
			var error_mensaje = this.$t(
				'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
			);
			this.appComponent.modal = {
				showModal: 'notification', // Setting modal properties for error notification
				titleModal: this.$t('Error!'), // Modal title
				messageModal: error_mensaje, // Modal message
				buttonModal: this.$t('Aceptar'), // Modal button text
				orderModal: 'closeModal', // Modal close order
			};
		},
	},
});
</script>
<template>
	<div
		class="modal text-base-content items-center bg-base-content bg-opacity-75"
	>
		<div
			class="modal-box py-14 rounded-2xl bg-gradient-to-b from-primary-focus to-secondary/50 bg-primary-focus overflow-visible max-w-[38rem] border-solid border-1 border-primary"
		>
			<div class="flex flex-col justify-center items-center w-full mb-8">
				<label
					for="m-modal-login"
					class="absolute right-2 top-2 cursor-pointer flex justify-center items-center text-3xl font-bold text-base-100 w-11 h-11 hover:scale-105"
					@click="appComponent.showModalLogin = false"
				>
					<IconClose />
					<!-- Close icon for modal -->
				</label>
				<img :src="config.logo" alt="" class="w-[50%]" />
				<!-- Logo image -->
			</div>
			<Form
				@submit="onSubmit"
				:validation-schema="schema"
				v-slot="{ errors }"
			>
				<div class="form-control mb-2 mx-10">
					<Field
						id="loginUsername"
						name="email"
						:class="{ 'is-invalid': errors.email }"
						:placeholder="$t('Correo electrónico')"
						required="true"
						autocomplete="usuario"
						v-model="login.email"
						class="input input-bordered h-16 bg-secondary font-poppinssl text-xl text-base-100 placeholder:text-primary border-1 border-solid border-primary pl-6"
						type="text"
					/>
					<div
						v-if="errors.email != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-primary-content text-base-100 shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
						<!-- Displaying email error message -->
					</div>
				</div>
				<div class="mt-6 form-control relative mx-10">
					<Field
						class="input input-bordered h-16 bg-secondary font-poppinssl text-xl text-base-100 placeholder:text-primary border-1 border-solid border-primary pl-6"
						type="password"
						id="loginPassword"
						:class="{ 'is-invalid': errors.password }"
						name="password"
						:placeholder="$t('Contraseña')"
						v-model="login.password"
						autocomplete="current-password"
					/>
					<button
						type="button"
						class="absolute top-[23px] right-6"
						id="showpass"
						@click="showpass()"
					>
						<font-awesome-icon
							class="text-xl text-primary"
							icon="fa-solid fa-eye"
						/>
					</button>
					<div
						v-if="errors.password != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-primary-content text-base-100 shadow-lg rounded-full flex justify-center mb-3 gap-0"
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
						<!-- Displaying password error message -->
					</div>
				</div>
				<div class="grid mt-8 mx-10">
					<div
						v-if="disabledCount"
						class="cursor-pointer text-primary text-lg hover:underline mx-auto hover:scale-105 pb-2"
					>
						{{ $t('Intente de nuevo en: ') }}
						<vue-countdown
							v-if="disabledCount"
							:time="count"
							:interval="100"
							v-slot="{ seconds }"
							class="text-primary font-poppinsm text-base md:text-lg text-center z-1"
						>
							{{ seconds }}
						</vue-countdown>
						{{ $t(' segundos.') }}
					</div>
					<button
						v-show="!appComponent.disabledLogin"
						type="submit"
						@click="appComponent.gAnalytics('popup_login')"
						aria-label="Login"
						for="m-modal-login"
						:disabled="appComponent.disabledLogin"
						class="btn text-base-content font-poppinssb text-xl capitalize rounded-xl bg-success w-full h-16 mx-auto hover:scale-105 border-none"
					>
						{{ $t('Iniciar sesión') }}
						<!-- Button text -->
					</button>
					<button
						v-show="appComponent.disabledLogin"
						disabled
						class="btn text-base-content font-poppinssb text-xl capitalize rounded-xl bg-success w-full h-16 mx-auto hover:scale-105 border-none"
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
						<!-- Button text for loading state -->
					</button>
					<div class="flex justify-between my-6">
						<RouterLink
							to="/recuperar-clave"
							@click="
								((appComponent.showModalLogin = false),
								appComponent.gAnalytics('forgot_password'))
							"
							class="text-primary text-md underline hover:text-base-100 transition-all ease-in-out font-poppinssl brightness-125"
						>
							{{ $t('¿Olvidaste su contraseña?') }}
							<!-- Link text -->
						</RouterLink>
						<RouterLink
							v-if="
								appComponent.config.showRegisterButton ==
									undefined ||
								appComponent.config.showRegisterButton[
									appComponent.country
								] == undefined ||
								appComponent.config.showRegisterButton[
									appComponent.country
								]
							"
							to="/registro"
							@click="
								((appComponent.showModalLogin = false),
								appComponent.gAnalytics('popup_register'))
							"
							class="text-primary text-md underline hover:text-base-100 transition-all ease-in-out font-poppinssl brightness-125"
						>
							{{ $t('Regístrate') }}
							<!-- Link text -->
						</RouterLink>
					</div>
				</div>
			</Form>
			<div
				v-if="appComponent.partner == 16"
				class="info-container bg-gray-300 rounded-xl p-3 mt-3 flex justify-center items-center flex-col text-sm"
				style="box-shadow: inset 0px 0px 16px 0px #0000001c"
			>
				<p class="text-gray-600 text-center mb-2">
					{{
						$t(
							'Hemos actualizado nuestra plataforma, puedes restablecer tu cuenta haciendo clic aquí:' // Message for account reset
						)
					}}
				</p>
				<button
					@click="
						appComponent.showModalLogin = false;
						appComponent.modal.showModal = 'reset';
					"
					class="btn modal-button uppercase bg-success text-base-100 p-3 rounded-xl font-bold"
					style="
						box-shadow:
							inset 0px -4px #0000004d,
							0px -1px 6px 0px #0000004d;
					"
				>
					{{ $t('RESTABLECER CUENTA') }}
					<!-- Button text for account reset -->
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.modal {
	visibility: visible !important; /* Ensuring modal is visible */
	opacity: 1 !important; /* Ensuring modal is fully opaque */
	pointer-events: all !important; /* Allowing pointer events on modal */
}
</style>

<!-- FILE DOCUMENTED -->

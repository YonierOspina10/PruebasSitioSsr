<script lang="ts">
/**
 * TypeScript script section for the Vue component.
 * This section contains the logic and data handling for the component.
 */
import { Form, Field } from 'vee-validate'; // Import Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Import Yup for schema validation
import { defineComponent } from 'vue'; // Import defineComponent to create a Vue component
import apiService from '@/services/ApiService'; // Import apiService for API requests
import FacebookLogin from '../FacebookLogin.vue'; // Import FacebookLogin component
import router from '@/router'; // Import router for navigation
import { useModalStore } from '@/stores/modal'; // Import modal store for managing modal state

export default defineComponent({
	components: {
		Form, // Register Form component
		FacebookLogin, // Register FacebookLogin component
		Field, // Register Field component
	},
	data() {
		let config = this.$config(); // Retrieve configuration settings
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let clientId: any =
			(window as any).cconfig.facebookLoginClienId != undefined
				? (window as any).cconfig.facebookLoginClienId // Get Facebook client ID from global config
				: '';
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let count = 0; // Counter for login attempts
		let disabledCount = false; // Flag to disable count
		let login = {
			email: '', // User email for login
			password: '', // User password for login
		};
		const schema = Yup.object().shape({
			// Validation schema for login form
			email: Yup.string().required(this.$t('Email is required')), // Email is required
			password: Yup.string()
				.min(
					4,
					this.$t('La contraseña debe tener al menos 4 caracteres.') // Password must be at least 4 characters
				)
				.required(this.$t('Contraseña es requerida.')), // Password is required
		});
		const modalStore = useModalStore(); // Initialize modal store
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
			modalStore,
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
        };
		this.emitter.on('accept:modal', () => {
			this.acceptModalHandler();
			this.appComponent.closeModal();
		});

	},
	methods: {
		closeLoginModal() {
          this.appComponent.showModalLogin = false;
          this.appComponent.disabledLogin = false;
          this.$emit('close');
        },
		onSubmit(values: any) {
            this.lastFormValues = values; // Store the latest submitted form values for possible login retry

			// Handle form submission
			let data = {
				username: values.email, // Set username from form values
				password: values.password, // Set password from form values
				timeRequest: true, // Flag for time request
			};
			this.appComponent.disabledLogin = true; // Disable login button during request
			if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }
			this.appComponent.disabledLogin = true; // Disable login button to prevent multiple submissions
			if (!this.appComponent.contingency) {
				// Check if not in contingency mode
				apiService
					.request('login', data) // Send login request
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
							this.appComponent.frm = 'lgn'; // Set form type to login
							try {
								(window as any).fLoadSuccess(
									this.appComponent.user_id,
									this.appComponent.frm // Call success function with user ID and form type
								);
							} catch (e) {}
							this.appComponent.loadJsAltenar(); // Load additional scripts
							this.refreshBalance(); // Refresh balance
							
							if (this.appComponent.depositFromLanding != null) {
								// Check if redirecting from landing
								router.push('/gestion/deposito'); // Redirect to deposit management
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
										router.push('/deportes'); // Redirect to sports page
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
														.urlRedirectableLogin // Redirect to configurable URL
												: '/deportes'
										);
									} else if (
										this.config != undefined &&
										this.config.general != undefined &&
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
													].urlRedirectableLogin // Redirect to country-specific URL
												: '/deportes'
										);
									}
								} else {
									if (
										response.data.redirectUrl == '/betshop/'
									) {
										window.location.href =
											response.data.redirectUrl; // Redirect to betshop
									} else if (
										response.data.redirectUrl != undefined
									) {
										router.push(response.data.redirectUrl); // Redirect to specified URL
									}
								}
							}

                            try {
                                if ((window as any).optimoveSDK != undefined && (window as any).optimoveSDK.API != undefined) {
                                    (window as any).optimoveSDK.API.reportEvent( // Report login event to optimoveSDK
                                        'login',
                                        {},
                                        null,
                                        this.appComponent.session.usuario,
                                    );
                                }
                            } catch (e) {
                                console.log(e); // Log any errors
                            }
							setTimeout(() => {
								// Delay for further actions
								this.emitter.emit('ready:login'); // Emit event for ready state
								if (
									this.appComponent.config.versionAltenar !=
									'2' // Check version for additional actions
								) {
									this.emitter.emit('loadBiaReload'); // Emit reload event
								}
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
							// Handle login restriction
							this.appComponent.disabledLogin = true; // Disable login button
							let timeLogin: any =
								localStorage.getItem('timeLogin'); // Get login time from local storage
							let valorNumber = parseInt(timeLogin); // Parse login time to integer
							let sumMinutes = new Date(); // Create new date object
							sumMinutes.setTime(
								valorNumber + this.config.restrictionTime * 1000 // Set time limit for login
							);
							let interval = setInterval(() => {
								// Start interval for countdown
								this.count =
									sumMinutes.getTime() - new Date().getTime(); // Calculate remaining time
								this.disabledCount = true; // Disable count
								if (
									sumMinutes.getTime() <= new Date().getTime()
								) {
									this.appComponent.disabledLogin = false; // Enable login button after time expires
									this.disabledCount = false; // Reset disabled count
									clearInterval(interval); // Clear interval
								}
							}, 1000);
						} else if (response.error_code == 300017) {
							// Handle password reset request
							delete data.password; // Remove password from data
							let dataSend2 = {
								forActivate: true, // Flag for activation
								email: data.username, // Email for password reset
							};
							this.appComponent.showModalLogin = false; // Hide login modal
							this.modalStore.action = () => {
								// Define action for modal store
								this.modalStore.loading = true; // Set loading state
								apiService
									.request('reset_user_password', dataSend2) // Send password reset request
									.then((response: any) => {
										// Handle response
										if (response.code == 0) {
											// Successful password reset
											this.appComponent.modal = {
												showModal: 'notification', // Show notification modal
												titleModal: this.$t('Mensaje'), // Set modal title
												messageModal: this.$t(
													'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.' // Set modal message
												),
												buttonModal: this.$t('Aceptar'), // Set modal button
												orderModal: 'closeModal', // Set modal order
											};
										} else {
											var error_mensaje = ''; // Initialize error message
											if (
												response.error_code != undefined
											) {
												error_mensaje = this.$t(
													'ERROR' +
														response.error_code.toString() // Set error message based on error code
												);
											}
											if (error_mensaje == '') {
												error_mensaje = this.$t(
													'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
												);
											}
											this.appComponent.modal = {
												showModal: 'notification', // Show notification modal
												titleModal: this.$t('Error!'), // Set modal title
												messageModal: error_mensaje, // Set modal message
												buttonModal: this.$t('Aceptar'), // Set modal button
												orderModal: 'closeModal', // Set modal order
											};
										}
										this.modalStore.loading = false; // Reset loading state
									});
							};
							this.appComponent.modal = {
								showModal: 'updatePasswordEmail', // Show update password email modal
								orderModal: 'closeModal', // Set modal order
							};
							this.appComponent.disabledLogin = false; // Enable login button
						} else {
							var error_mensaje = ''; // Initialize error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Set error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							if (response.error_code == 30001) {
								this.appComponent.gAnalytics('password_locked'); // Track password locked event
							}
							if (response.error_code == 30002) {
								this.appComponent.gAnalytics('user_exist'); // Track user exists event
							}
							if (response.error_code == 30003) {
								this.appComponent.gAnalytics(
									'incorret_password' // Track incorrect password event
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set modal message
								buttonModal: this.$t('Aceptar'), // Set modal button
								orderModal: 'closeModal', // Set modal order
							};
							this.appComponent.disabledLogin = false; // Enable login button
						}
					})
					.catch((e) => {
						this.appComponent.disabledLogin = false; // Enable login button on error
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hide login modal after timeout
				}, 1000);
			}
		},
		showpass() {
			// Toggle password visibility
			var pwd: any = document.getElementById('loginPassword'); // Get password input element
			if (pwd.type === 'password') {
				pwd.type = 'text'; // Change type to text to show password
			} else {
				pwd.type = 'password'; // Change type to password to hide password
			}
		},
		signInWithGoogle(userGoogle) {
			// Handle Google sign-in
			console.log('Handle the response', userGoogle); // Log Google response
			const params = {
				id_token: userGoogle.credential, // Get ID token from Google response
				country: this.appComponent.country, // Include country information
				type: 1, // Set type for Google sign-in
			};
			this.appComponent.disabledLogin = true; // Disable login button during request
			if (!this.appComponent.contingency) {
				// Check if not in contingency mode
				apiService
					.request('external_auth', params) // Send external authentication request
					.then((response: any) => {
						// Handle response
						if (response.code == 0) {
							// Successful sign-in
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
							this.appComponent.frm = 'lgn'; // Set form type to login
							this.refreshBalance(); // Refresh balance
						} else {
							var error_mensaje = ''; // Initialize error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Set error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set modal message
								buttonModal: this.$t('Aceptar'), // Set modal button
								orderModal: 'closeModal', // Set modal order
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
			// Handle Facebook sign-in
			console.log('Handle the response', userFacebook); // Log Facebook response
			const params = {
				id_token: userFacebook.authResponse.accessToken, // Get access token from Facebook response
				country: this.appComponent.country, // Include country information
				type: 2, // Set type for Facebook sign-in
			};
			this.appComponent.disabledLogin = true; // Disable login button during request
			if (!this.appComponent.contingency) {
				// Check if not in contingency mode
				apiService
					.request('external_auth', params) // Send external authentication request
					.then((response: any) => {
						// Handle response
						if (response.code == 0) {
							// Successful sign-in
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
							this.appComponent.frm = 'lgn'; // Set form type to login
							this.refreshBalance(); // Refresh balance
						} else {
							var error_mensaje = ''; // Initialize error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Set error message based on error code
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set modal message
								buttonModal: this.$t('Aceptar'), // Set modal button
								orderModal: 'closeModal', // Set modal order
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
			// Handle failed Facebook sign-in
			var error_mensaje = this.$t(
				'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
			);
			this.appComponent.modal = {
				showModal: 'notification', // Show notification modal
				titleModal: this.$t('Error!'), // Set modal title
				messageModal: error_mensaje, // Set modal message
				buttonModal: this.$t('Aceptar'), // Set modal button
				orderModal: 'closeModal', // Set modal order
			};
		},
		analyticsAttrs(label:string, context?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': context || `step:fill-form|step-num:1|component:AppLogin|layout:layout-${this.appComponent.config.layout}`
            };
        },
	},
});
</script>
<template>
	<!-- Main template for the Vue component -->
	<!-- Contains the structure and layout of the component's UI -->
	<!-- Modal container for login functionality -->
	<div
		class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
	>
		<!-- Box for modal content with rounded corners -->
		<div class="modal-box rounded-2xl overflow-visible max-w-[28rem] bg-base-300">
			<!-- Logo link at the top of the modal -->
			<a class="-mt-36 absolute w-full left-0" title="">
				<img
					width="240"
					height="240"
					class="m-auto"
					v-lazy="
  					  	(config.logo_?.dark && config.logo_?.light)
  					    ? (appComponent.themeSportbook ? config.logo_.light : config.logo_.dark)
  					    : config.header?.logo?.src
  					"
					alt=""
				/>
			</a>
			<!-- Close button for the modal -->
			<div class="flex justify-end">
				<label
					for="m-modal-login"
					v-bind="analyticsAttrs('auth:login:close-modal')"
					class="cursor-pointer text-right block text-2xl w-4 transition ease-in-out hover:scale-105 text-neutral"
					@click="appComponent.showModalLogin = false"
				>
					<font-awesome-icon icon="fa-solid fa-close" />
				</label>
			</div>
			<!-- Form for user login -->
			<Form
				@submit="onSubmit"
				:validation-schema="schema"
				v-slot="{ errors }"
			>
				<!-- Email input field -->
				<div class="form-control mb-4">
					<label class="label">
						<span class="label-text text-base text-neutral"
                        >{{
							$t('Correo Electrónico')
						}}</span>
					</label>
					<Field
						id="loginUsername"
						name="email"
						:class="{
                            'is-invalid': errors.email,
						    'border-error': errors.email != undefined,
						    'border-input-border': errors.email == undefined
						 }"
						:placeholder="$t('Correo electrónico')"
						required="true"
						autocomplete="usuario"
						v-model="login.email"
						v-bind="analyticsAttrs(`auth:login:field:email`)"
						class="input input-bordered bg-input-background text-neutral placeholder-input-placeholder"
						type="text"
					/>
					<!-- Error message for email input -->
					<div
						v-if="errors.email != undefined"
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
						{{ errors.email }}
					</div>
				</div>
				<!-- Password input field -->
				<div class="form-control">
					<label class="label">
						<span class="label-text text-base text-neutral"
                        >{{
							$t('Contraseña')
						}}</span>
					</label>
					<Field
						class="input bg-input-background text-neutral placeholder-input-placeholder"
						type="password"
						id="loginPassword"
						 v-bind="analyticsAttrs(`auth:login:field:password`)"
						:class="{
                            'is-invalid': errors.password,
						    'border-error': errors.password != undefined,
						    'border-input-border': errors.password == undefined
                        }"
						name="password"
						:placeholder="$t('Contraseña')"
						v-model="login.password"
						autocomplete="current-password"
					/>
					<!-- Error message for password input -->
					<div
						v-if="errors.password != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-error/20 text-error shadow-lg rounded-t-lg flex justify-center mb-3 gap-0"
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
						{{ $t(errors.password) }}
					</div>
					<!-- Button to toggle password visibility -->
					<button
						type="button"
						class="absolute mt-[3.4rem] right-[8%]"
						id="showpass"
						@click="showpass()"
					>
						<font-awesome-icon
							class="text-xl text-neutral/60"
							icon="fa-solid fa-eye"
						/>
					</button>
					<!-- Link to password recovery -->
					<RouterLink
						to="/recuperar-clave"
						v-bind="analyticsAttrs('auth:login:link:forgot-password')"
						@click="
							((appComponent.showModalLogin = false),
							appComponent.gAnalytics('forgot_password'))
						"
					>
						<label class="label">
							<a class="label-text-alt"></a>
							<label
								for="m-modal-login"
								class="cursor-pointer hover:underline text-neutral"
								>{{ $t('Olvido su contraseña?') }}</label
							>
						</label>
					</RouterLink>
				</div>
				<!-- Modal action buttons -->
				<div class="modal-action">
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
						v-bind="analyticsAttrs('auth:login:link:register')"
						class="btn bg-success text-neutral hover:bg-green-600"
						@click="
							((appComponent.showModalLogin = false),
							appComponent.gAnalytics('popup_register'))
						"
						target="_self"
						:to="config.menuMobile.urlRegistro"
						>{{ $t('Regístrate') }}
					</RouterLink>
					<!-- Submit button for login -->
					<button
						v-show="!appComponent.disabledLogin"
						@click="appComponent.gAnalytics('popup_login')"
						v-bind="analyticsAttrs('auth:login:submit', 'step:submit|step-num:2|component:AppLogin|layout:layout-' + appComponent.config.layout)"
						type="submit"
						aria-label="Login"
						for="m-modal-login"
						class="btn btn-primary"
						:class="
							appComponent.config.partner == '8'
								? 'text-neutral-content'
								: 'text-neutral'
						"
					>
						{{ $t('Acceder') }}
					</button>
					<!-- Disabled button indicating loading state -->
					<button
						v-show="appComponent.disabledLogin"
						disabled
						@click=""
						class="btn btn-primary bg-primary fill-primary"
						:class="
							appComponent.config.partner == '8'
								? 'text-neutral-content'
								: 'text-neutral'
						"
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
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						{{ $t('Acceder') }}
					</button>
				</div>
				<!-- Countdown message for disabled login -->
				<div
					v-if="disabledCount"
					class="cursor-pointer text-secondary text-lg hover:underline mx-auto hover:scale-105 pb-2 flex justify-center items-center pt-5"
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
					</vue-countdown>
					{{ $t(' segundos.') }}
				</div>
			</Form>
			<!-- Information container for account reset -->
			<div
				v-if="
					appComponent.partner == 16 &&
					appComponent.config.resetAccount.show
				"
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
					v-bind="analyticsAttrs('auth:login:button:reset-account')"
					class="btn inline-block cursor-pointer uppercase bg-success text-white p-3 rounded-xl font-bold"
					style="
						box-shadow:
							inset 0px -4px #0000004d,
							0px -1px 6px 0px #0000004d;
					"
				>
					{{ $t('RESTABLECER CUENTA') }}
				</button>
			</div>
			<!-- Action area for users without an account -->
			<div
				v-if="appComponent.partner == 16"
				class="modal-action w-full bg-base-100 rounded-b-xl h-14 flex justify-center items-center cursor-pointer text-sm"
			>
				<span class="text-neutral text-lg hover:scale-105">
					{{ $t('¿No tienes una cuenta?') }}</span
				>
				<a
					href="/registro"
					class="text-neutral font-bold text-sm hover:scale-105 underline"
					v-bind="analyticsAttrs('auth:login:link:register')"
					>{{ $t('Regístrate') }}</a
				>
			</div>
			<!-- Google login button -->
			<GoogleLogin
				:callback="signInWithGoogle"
				prompt
				v-bind="analyticsAttrs('auth:login:google','step:submit|step-num:2|component:AppLogin|layout:layout-'+appComponent.config.layout)"
				class="w-full mt-8 flex justify-center items-center"
				@click="appComponent.gAnalytics('login_google')"
				v-if="
					appComponent.config.loginGoogle != undefined &&
					appComponent.config.loginGoogle[appComponent.country] &&
					!appComponent.disabledLogin
				"
			/>
			<!-- Facebook login button -->
			<div
				v-if="
					appComponent.config.loginFacebook != undefined &&
					appComponent.config.loginFacebook[appComponent.country]
				"
				class="flex items-center justify-center"
			>
				<facebook-login
					@click="appComponent.gAnalytics('login_facebook')"
					:appId="clientId"
					@loggedIn="signInWithFacebook"
					@loginFailed="signInWithFacebookFailed"
					:type="'custom'"
					:text="$t('Iniciar sesión con Facebook')"
					:class="'w-auto bg-white border-[1px] transition-all ease-in-out border-solid border-[#dadce0] px-[12px] h-[40px] mt-4 text-gray-600 rounded-md hover:bg-blue-50/30 font-medium'"
				>
				</facebook-login>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

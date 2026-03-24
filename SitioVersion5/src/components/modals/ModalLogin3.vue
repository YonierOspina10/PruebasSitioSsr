<script lang="ts">
import { Form, Field } from 'vee-validate'; // Importing Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Importing Yup for schema validation
import { defineComponent } from 'vue'; // Importing defineComponent for creating Vue components
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import FacebookLogin from '../FacebookLogin.vue'; // Importing FacebookLogin component
declare var optimoveSDK: any; // Declaring optimoveSDK variable for external SDK usage
import router from '@/router'; // Importing router for navigation
import { useModalStore } from '@/stores/modal';
import CarouselLogin from '@/components/CarouselLogin.vue'; // Importing modal store for managing modal state
import { useGetInfoFirestore } from '../../composables/useInfoFirestore';

export default defineComponent({
	components: {
        CarouselLogin,
		Form, // Registering Form component
		FacebookLogin, // Registering FacebookLogin component
		Field, // Registering Field component
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Accessing the app component
		let emitter = this.$emitter(); // Getting the event emitter
		let clientId: any =
			(window as any).cconfig.facebookLoginClienId != undefined
				? (window as any).cconfig.facebookLoginClienId // Getting Facebook client ID from global config
				: '';
		let refreshBalance = this.$refreshBalance; // Method to refresh balance
		let count = 0; // Counter for login attempts
		let disabledCount = false; // Flag to disable login button
        let viewToken = false; // Flag to toggle token visibility
        let buttonTokenDisabled = false; // Flag to toggle token visibility
		let login = {
			// Object to hold login credentials
			email: '',
			password: '',
            token2AF: '',
		};
        let tokenError = ''; // Variable to hold token error messages
		const schema = Yup.object().shape({
			// Validation schema for form fields
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
		const modalStore = useModalStore(); // Using modal store for managing modal state
        let banners: any = undefined; // Placeholder for banners

        // Retrieve banners based on configuration and login status
        if (
            config != undefined &&
            config['not_login'] != undefined &&
            config['not_login'][appComponent.lngProd] != undefined &&
            config['not_login'][appComponent.lngProd]['banners'] != undefined &&
            config['not_login'][appComponent.lngProd]['banners']['banner_login'] !=
            undefined
        ) {
            banners = JSON.parse(
                JSON.stringify(
                    config['not_login'][appComponent.lngProd]['banners'][
                        'banner_login'
                        ]
                )
            );
        }
		let acceptModalHandler: (() => void) | null = null;

		return {
			config,
			clientId,
			appComponent,
			emitter,
			modalStore,
			refreshBalance,
			login,
			schema,
			count,
			disabledCount,
            banners,
            viewToken,
            tokenError,
            buttonTokenDisabled,
			checkMultiLogin: false,
            lastFormValues: null,
			acceptModalHandler,
			
		};
	},
	//Get banners data from Firebase
    async created() {
        const appForBanner = {
            ...this.appComponent,
            session: { ...(this.appComponent?.session ?? {}), logueado: false },
        };
        const firestoreBanners = await useGetInfoFirestore(this.config, appForBanner, 'banner_login', {
            useLogin: true,
            useScope: true,
        });
        if (firestoreBanners?.length) {
            this.banners = firestoreBanners;
        }
    },
	unmounted() {
        if (this.acceptModalHandler) {
          this.emitter.off('accept:modal', this.acceptModalHandler);
        }
        window.removeEventListener('keydown', this.handleEnterKey);
    },
	mounted() {
		this.acceptModalHandler = () => {
            if (this.pendingMultiLogin) {
                this.pendingMultiLogin = false;
                this.checkMultiLogin = true;
                this.onSubmit(this.lastFormValues);
                return;
            }
        };

        this.emitter.on('accept:modal', this.acceptModalHandler);
        this.emitter.on('go:register', () => {
            this.closeLoginModal();
        });
        window.addEventListener('keydown', this.handleEnterKey);
	},
	methods: {
        closeLoginModal() {
          this.appComponent.showModalLogin = false;
          this.appComponent.disabledLogin = false;
          this.$emit('close');
        },
		onSubmit(values: any) {
			// Method to handle form submission
			this.lastFormValues = values; // Store the latest submitted form values for possible login retry
			let dataSend = {
				// Data to be sent to the API
				username: values.email,
				password: values.password,
                token2AF: values.token2AF == '' ? null : values.token2AF,
				timeRequest: true,
			};
			this.appComponent.disabledLogin = true; // Disabling login button
            if (values.token2AF !== undefined) {
                this.buttonTokenDisabled = true;
            }
			if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                dataSend.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('login', dataSend) // Sending login request
					.then((response: any) => {
						// Handling response
						if (response.code == 0) {
							// Successful login

                            if(response.reqTokenGoogle && dataSend.token2AF == null) {
                                this.viewToken = true; // Enabling token view if required
                                return
                            }else {
                                this.appComponent.firstReqBalance = false; // Setting balance request flag
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
                                this.appComponent.frm = 'lgn'; // Setting form type
                                try {
                                    (window as any).fLoadSuccess(
                                        this.appComponent.user_id,
                                        this.appComponent.frm // Reporting successful load
                                    );
                                } catch (e) {}
                                this.refreshBalance(); // Refreshing balance
                                this.appComponent.loadJsAltenar(); // Loading additional scripts
                            }
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
												: '/deportes' // Redirecting based on configuration
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
													].urlRedirectableLogin
												: '/deportes' // Redirecting based on country-specific configuration
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
										this.appComponent.session.usuario // Reporting login event to optimoveSDK
									);
								}
							} catch (e) {}
							setTimeout(() => {
								this.emitter.emit('ready:login'); // Emitting event after login is ready
							}, 2000);
						} else if (response.error_code == 300263) {
                            this.appComponent.crossCountryRegister = {
                                email: response.data.details.email,
                                name: response.data.details.name,
                                lastname: response.data.details.lastname,
                                natalityDate: response.data.details.natalityDate,
                                countryFrom: response.data.details.countryName,
                            };
                            this.pendingMultiLogin = true;

                            this.modals.addModal({ // Show error modal
                                showModal: 'ModalNotification',
                                titleModal: this.$t('Cuenta detectada'),
                                messageModal: this.$t(
                                    'Hemos detectado que ya tienes una cuenta. Para jugar en, necesitas una cuenta local. ¿Quieres crearla usando tus datos ya registrados?'
                                ),
                                buttonModal: this.$t('No, continuar con mi cuenta'),
                                orderModal: 'multi-login',
                                buttonModal2: this.$t('Sí, crear cuenta en'),
                                link2: '/registro',
                            });
                            this.appComponent.disabledLogin = false; // Enabling login button      
						} else if (response.code == 1811) {
							// Handling specific error code
							this.appComponent.disabledLogin = true; // Disabling login button
							let timeLogin: any =
								localStorage.getItem('timeLogin'); // Retrieving login time from local storage
							let valorNumber = parseInt(timeLogin); // Parsing login time
							let sumMinutes = new Date(); // Creating a new date object
							sumMinutes.setTime(
								valorNumber + this.config.restrictionTime * 1000 // Setting time for restriction
							);
							let interval = setInterval(() => {
								// Setting up interval for countdown
								this.count =
									sumMinutes.getTime() - new Date().getTime(); // Calculating remaining time
								this.disabledCount = true; // Disabling countdown
								if (
									sumMinutes.getTime() <= new Date().getTime()
								) {
									this.appComponent.disabledLogin = false; // Enabling login button after countdown
									this.disabledCount = false; // Resetting countdown flag
									clearInterval(interval); // Clearing interval
								}
							}, 1000);
						} else if (response.error_code == 300017) {
							// Handling password reset case
							delete dataSend.password; // Removing password from data
							let dataSend2 = {
								// Data for password reset request
								forActivate: true,
								email: dataSend.username,
							};
							this.appComponent.showModalLogin = false; // Hiding login modal
							this.modalStore.action = () => {
								// Setting action for modal store
								this.modalStore.loading = true; // Setting loading state
								apiService
									.request('reset_user_password', dataSend2) // Sending password reset request
									.then((response: any) => {
										if (response.code == 0) {
											// Successful password reset
											this.appComponent.modal = {
												showModal: 'notification',
												titleModal: this.$t('Mensaje'),
												messageModal: this.$t(
													'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.'
												), // Notification message
												buttonModal: this.$t('Aceptar'),
												orderModal: 'closeModal',
											};
										} else {
											var error_mensaje = ''; // Variable for error message
											if (
												response.error_code != undefined
											) {
												error_mensaje = this.$t(
													'ERROR' +
														response.error_code.toString() // Setting error message based on error code
												);
											}
											if (error_mensaje == '') {
												error_mensaje = this.$t(
													'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
												);
											}
											this.appComponent.modal = {
												showModal: 'notification',
												titleModal: this.$t('Error!'),
												messageModal: error_mensaje,
												buttonModal: this.$t('Aceptar'),
												orderModal: 'closeModal',
											};
										}
										this.modalStore.loading = false; // Resetting loading state
									});
							};
							this.appComponent.modal = {
								showModal: 'updatePasswordEmail', // Showing password update modal
								orderModal: 'closeModal',
							};
							this.appComponent.disabledLogin = false; // Enabling login button
						} else {
							var error_mensaje = ''; // Variable for error message
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
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.appComponent.disabledLogin = false; // Enabling login button
						}
					})
					.catch((e) => {
						// Handling request errors
						console.log(e); // Logging error
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Mensaje!'),
							messageModal: this.$t(
								'La solicitud no pudo ser procesada, intente nuevamente por favor.' // Error message for request failure
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.disabledCount = false; // Resetting countdown flag
						this.appComponent.disabledLogin = false; // Enabling login button
					});
			} else {
				setTimeout(() => {
					this.appComponent.showModalLogin = false; // Hiding login modal after timeout
				}, 1000);
			}
		},
        validateToken(){
            if(this.viewToken) {
                if(!this.login.token2AF) {
                    this.tokenError = this.$t('El código de autenticación es requerido');
                }else if(this.login.token2AF.length < 6) {
                    this.tokenError = this.$t('Código inválido. Verifica el código e intenta nuevamente');
                } else {
                    this.tokenError = '';
                }
            }else {
                this.tokenError = '';
            }
        },
        handleEnterKey(event: KeyboardEvent) {
            if (this.viewToken && event.key === 'Enter') {
                event.preventDefault(); // 🚫 Previene el submit del formulario anterior
                this.onSubmit(this.login); // ✅ Llama a tu función actual
            }
        },
		showpass() {
			// Method to toggle password visibility
			var pwd: any = document.getElementById('loginPassword'); // Getting password input element
			if (pwd.type === 'password') {
				pwd.type = 'text'; // Changing type to text to show password
			} else {
				pwd.type = 'password'; // Changing type back to password to hide it
			}
		},
		signInWithGoogle(userGoogle) {
			// Method to handle Google sign-in
			const params = {
				// Parameters for Google sign-in request
				id_token: userGoogle.credential,
				country: this.appComponent.country,
				type: 1,
			};
			this.appComponent.disabledLogin = true; // Disabling login button
			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('external_auth', params) // Sending external auth request
					.then((response: any) => {
						if (response.code == 0) {
							// Successful sign-in
							this.appComponent.firstReqBalance = false; // Setting balance request flag
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
							this.appComponent.frm = 'lgn'; // Setting form type
							this.refreshBalance(); // Refreshing balance
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
						} else {
							var error_mensaje = ''; // Variable for error message
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
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
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
				// Parameters for Facebook sign-in request
				id_token: userFacebook.authResponse.accessToken,
				country: this.appComponent.country,
				type: 2,
			};
			this.appComponent.disabledLogin = true; // Disabling login button
			if (!this.appComponent.contingency) {
				// Checking if not in contingency mode
				apiService
					.request('external_auth', params) // Sending external auth request
					.then((response: any) => {
						if (response.code == 0) {
							// Successful sign-in
							this.appComponent.firstReqBalance = false; // Setting balance request flag
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
							this.appComponent.frm = 'lgn'; // Setting form type
							this.refreshBalance(); // Refreshing balance
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
						} else {
							var error_mensaje = ''; // Variable for error message
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
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
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
				showModal: 'notification',
				titleModal: this.$t('Error!'),
				messageModal: error_mensaje,
				buttonModal: this.$t('Aceptar'),
				orderModal: 'closeModal',
			};
		},
		analyticsAttrs(label:string, context?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': context || `step:fill-form|step-num:1|component:ModalLogin3|layout:layout-${this.appComponent.config.layout}`
            };
        },
	},
});
</script>
<template>
	<div
		class="modal text-base-content items-center bg-neutral-content bg-opacity-75"
	>
	    <div
		v-if="appComponent.config.modalLogin !== undefined && appComponent.config.modalLogin === 2 && !viewToken"
		class="modal-box rounded-2xl bg-base-300 overflow-visible border border-accent">
			<div
				class="flex flex-col justify-center items-center relative h-10 w-full mb-5"
			>
			<button
				@click="
				    appComponent.showModalLogin = false;
                    appComponent.disabledLogin = false;
                "
				v-bind="analyticsAttrs('auth:login:close-modal')"
				class="absolute top-2 right-2 w-10 h-10 flex justify-center items-center cursor-pointer hover:scale-105 bg-gradient-to-b from-[#CF2032] to-[#730510] rounded-full border border-[#BE2323]"
			>
				<font-awesome-icon
					icon="fa-solid fa-xmark"
					size="2x"
					class="text-info-text"
				/>
			</button>
			</div>

            <div v-if="
                    appComponent.config != undefined && appComponent.config.isActiveBanerLogin != undefined &&
                    appComponent.config.isActiveBanerLogin == true
                "
                 class="w-full h-[25%] flex justify-center items-center pb-3">
                <CarouselLogin :images="banners"/>
            </div>

			<Form
				@submit="onSubmit"
				:validation-schema="schema"
				v-slot="{ errors }"
			>
				<div class="form-control mx-10">
					<label class="label pl-6">
						<span class="label-text text-base text-neutral">{{
							$t('Correo Electrónico')
						}}</span>
					</label>
					<Field
						id="loginUsername"
						name="email"
						:class="{ 'is-invalid': errors.email }"
						:placeholder="$t('Correo electrónico')"
						required="true"
						autocomplete="usuario"
						v-model="login.email"
						v-bind="analyticsAttrs('auth:login:field:email')"
						class="input input-bordered shadowlogin rounded-2xl h-14 bg-transparent text-neutral border-2 border-solid border-neutral pl-6 placeholder-input-placeholder"
						type="text"
					/>
					<div
						v-if="errors.email != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
				<div class="form-control relative mx-10">
					<label class="label pl-6">
						<span class="label-text text-base text-neutral">{{
							$t('Contraseña')
						}}</span>
					</label>
					<Field
						class="input input-bordered shadowlogin rounded-2xl h-14 bg-transparent text-neutral border-2 border-solid border-neutral pl-6 placeholder-input-placeholder"
						type="password"
						id="loginPassword"
						:class="{ 'is-invalid': errors.password }"
						name="password"
						:placeholder="$t('Contraseña')"
						v-model="login.password"
						v-bind="analyticsAttrs('auth:login:field:password')"
						autocomplete="current-password"
					/>
					<button
						type="button"
						class="absolute top-[53px] right-6"
						id="showpass"
						@click="showpass()"
					>
						<font-awesome-icon
							class="text-xl text-neutral"
							icon="fa-solid fa-eye"
						/>
					</button>
					<div
						v-if="errors.password != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 gap-0"
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
						class="cursor-pointer text-neutral text-lg hover:underline mx-auto hover:scale-105 pb-2"
					>
						{{ $t('Intente de nuevo en: ') }}
						<!-- Countdown message -->
						<vue-countdown
							v-if="disabledCount"
							:time="count"
							:interval="100"
							v-slot="{ seconds }"
							class="text-info font-poppinsm text-base md:text-lg text-center z-1"
						>
							{{ seconds }}
						</vue-countdown>
						{{ $t(' segundos.') }}
						<!-- Seconds message -->
					</div>
					<div class="flex items-center justify-center gap-3">
						<RouterLink
                        id="accion_registro"
                        to="/registro"
						 v-bind="analyticsAttrs('auth:login:link:register')"
						@click="appComponent.showModalLogin = false"
                        class="text-neutral text-base bg-success w-32 h-12 hover:scale-105 rounded-xl text-center flex items-center justify-center font-semibold"
                    >
                        {{ $t('Registrate') }}
                    </RouterLink>
					<button
						v-show="!appComponent.disabledLogin"
						type="submit"
						@click="appComponent.gAnalytics('popup_login')"
						aria-label="Login"
						for="m-modal-login"
						:disabled="appComponent.disabledLogin"
						v-bind="analyticsAttrs('auth:login:submit','step:submit|step-num:2|component:ModalLogin3|layout:layout-'+appComponent.config.layout)"
						class="text-neutral text-base bg-primary w-32 h-12 cursor-pointer hover:scale-105 rounded-xl text-center items-center justify-center font-semibold"
					>
						{{ $t('Acceder') }}
						<!-- Button text -->
					</button>
					<button
						v-show="appComponent.disabledLogin"
						disabled
						class="text-neutral text-base bg-primary w-32 h-12 hover:scale-105 rounded-xl text-center items-center justify-center font-semibold"
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
						{{ $t('Acceder') }}
						<!-- Loading button text -->
					</button>
					</div>
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
								class="cursor-pointer text-accent text-lg underline mx-auto hover:scale-105 my-2"
								>{{ $t('¿Olvidaste su contraseña?') }}</label
							>
						</label>
					</RouterLink>
					<GoogleLogin
						:callback="signInWithGoogle"
						prompt
						class="w-full mt-8 flex justify-center items-center"
						@click="appComponent.gAnalytics('login_google')"
						v-if="
							appComponent.config.loginGoogle != undefined &&
							appComponent.config.loginGoogle[
								appComponent.country
							]
						"
					/>
				</div>
			</Form>
    </div>
        <div
		v-else-if="appComponent.config.modalLogin == undefined && !viewToken"
		class="modal-box rounded-2xl bg-base-300 overflow-visible">
			<div
				class="flex flex-col justify-center items-center relative h-20 w-full mb-5"
			>
				<label
					for="m-modal-login"
					class="shadowlogin absolute right-2 top-2 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral bg-secondary w-11 h-11 rounded-full border-3 border-solid border-white hover:scale-105"
                    @click="
                        appComponent.showModalLogin = false;
                        appComponent.disabledLogin = false;
                    "
				>
					<font-awesome-icon icon="fa-solid fa-close" />
				</label>
				<h2 class="text-neutral text-4xl font-bold mt-10 uppercase">
					{{ $t('Iniciar sesión') }}
					<!-- Title for the login modal -->
				</h2>
			</div>

            <div v-if="
                    appComponent.config != undefined && appComponent.config.isActiveBanerLogin != undefined &&
                    appComponent.config.isActiveBanerLogin == true
                "
                 class="w-full h-[25%] flex justify-center items-center pb-3">
                <CarouselLogin :images="banners"/>
            </div>

			<Form
				@submit="onSubmit"
				:validation-schema="schema"
				v-slot="{ errors }"
			>
				<div class="form-control mb-2 mx-10">
					<label class="label pl-6">
						<span class="label-text text-base text-neutral">{{
							$t('Correo Electrónico')
						}}</span>
					</label>
					<Field
						id="loginUsername"
						name="email"
						:class="{ 'is-invalid': errors.email }"
						:placeholder="$t('Correo electrónico')"
						required="true"
						autocomplete="usuario"
						v-model="login.email"
						v-bind="analyticsAttrs('auth:login:field:email')"
						class="input input-bordered shadowlogin rounded-full h-16 bg-input-background text-neutral border-2 border-solid border-neutral pl-6 placeholder-input-placeholder"
						type="text"
					/>
					<div
						v-if="errors.email != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
				<div class="form-control relative mx-10">
					<label class="label pl-6">
						<span class="label-text text-base text-neutral">{{
							$t('Contraseña')
						}}</span>
					</label>
					<Field
						class="input input-bordered shadowlogin rounded-full h-16 bg-input-background text-neutral border-2 border-solid border-neutral pl-6 placeholder-input-placeholder"
						type="password"
						id="loginPassword"
						 v-bind="analyticsAttrs('auth:login:field:password')"
						:class="{ 'is-invalid': errors.password }"
						name="password"
						:placeholder="$t('Contraseña')"
						v-model="login.password"
						autocomplete="current-password"
					/>
					<button
						type="button"
						class="absolute top-[53px] right-6"
						id="showpass"
						@click="showpass()"
					>
						<font-awesome-icon
							class="text-xl text-secondary"
							icon="fa-solid fa-eye"
						/>
					</button>
					<div
						v-if="errors.password != undefined"
						class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 gap-0"
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
						class="cursor-pointer text-neutral text-lg hover:underline mx-auto hover:scale-105 pb-2"
					>
						{{ $t('Intente de nuevo en: ') }}
						<!-- Countdown message -->
						<vue-countdown
							v-if="disabledCount"
							:time="count"
							:interval="100"
							v-slot="{ seconds }"
							class="text-info font-poppinsm text-base md:text-lg text-center z-1"
						>
							{{ seconds }}
						</vue-countdown>
						{{ $t(' segundos.') }}
						<!-- Seconds message -->
					</div>
					<button
						v-show="!appComponent.disabledLogin"
						type="submit"
						@click="appComponent.gAnalytics('popup_login')"
						aria-label="Login"
						for="m-modal-login"
						:disabled="appComponent.disabledLogin"
						v-bind="analyticsAttrs('auth:login:submit','step:submit|step-num:2|component:ModalLogin3|layout:layout-'+appComponent.config.layout)"
						class="btn text-neutral text-base bg-primary w-56 h-12 mx-auto hover:scale-105"
					>
						{{ $t('Iniciar sesión') }}
						<!-- Button text -->
					</button>
					<button
						v-show="appComponent.disabledLogin"
						disabled
						class="btn text-info text-base bg-primary w-56 h-12 mx-auto hover:scale-105"
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
						<!-- Loading button text -->
					</button>
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
								class="cursor-pointer text-neutral text-lg hover:underline mx-auto hover:scale-105"
								>{{ $t('¿Olvidaste su contraseña?') }}</label
							>
						</label>
					</RouterLink>
					<GoogleLogin
						:callback="signInWithGoogle"
						prompt
						v-bind="analyticsAttrs('auth:login:google','step:submit|step-num:2|component:ModalLogin3|layout:layout-'+appComponent.config.layout)"
						class="w-full mt-8 flex justify-center items-center"
						@click="appComponent.gAnalytics('login_google')"
						v-if="
							appComponent.config.loginGoogle != undefined &&
							appComponent.config.loginGoogle[
								appComponent.country
							]
						"
					/>
				</div>
				<div
					@click="
						((appComponent.showModalLogin = false),
						appComponent.gAnalytics('popup_register'))
					"
					target="_self"
					:to="config.menuMobile.urlRegistro"
					class="mt-0  w-full bg-neutral rounded-b-xl h-14 flex justify-center items-center cursor-pointer gap-2"
				>
					<!-- Message for users without an account -->
					<span class="text-neutral-content text-lg hover:scale-105">{{
						$t('¿No tienes una cuenta?')
					}}</span>
					<RouterLink
						to="/registro"
						@click="appComponent.gAnalytics('popup_register')"
						v-bind="analyticsAttrs('auth:login:link:register')"
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
						class="text-neutral-content font-bold text-lg hover:scale-105 hover:underline"
					>
						{{ $t('Regístrate') }}
						<!-- Register button text -->
					</RouterLink>
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
							'Hemos actualizado nuestra plataforma, puedes restablecer tu cuenta haciendo clic aquí:'
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
					<!-- Reset account button text -->
				</button>
			</div>
    </div>
        <div
            v-else-if="viewToken"
            class="modal-box rounded-2xl bg-base-300 flex flex-col justify-center relative overflow-visible h-2/3"
        >
            <label
                for="m-modal-login"
                class="shadowlogin absolute right-2 top-2 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral bg-secondary w-11 h-11 rounded-full border-3 border-solid border-white hover:scale-105"
                @click="
                        appComponent.showModalLogin = false;
                        appComponent.disabledLogin = false;
                    "
            >
                <font-awesome-icon icon="fa-solid fa-close" />
            </label>
            <div
                class="flex flex-col gap-4 justify-center items-center relative h-1/2 w-full pb-6"
            >

                <div class="w-full flex flex-col items-center gap-3 justify-center">
                    <img
                        src="https://images.virtualsoft.tech/m/msj0212T1758818078.png"
                        alt=""
                        width="154"
                        height="32"
                    />
                    <h2 class="text-3xl font-semibold text-neutral">
                        {{$t('Ingrese el token')}}
                    </h2>
                    <p class="text-md font-poppinssl text-center text-neutral">
                        {{
                            $t('Escribe el código de seguridad, en tu aplicación de autenticación.')
                        }}
                    </p>
                </div>

            </div>
            <Form
                :validation-schema="schema"
                :validation-schema-context="{ isTokenView: viewToken }"
                @submit.prevent="onSubmit"
            >
                <div class="form-control mb-2 mx-10">
                    <input
                        :placeholder="$t('Token')"
                        type="text"
                        name="token2AF"
                        v-model="login.token2AF"
                        @blur="validateToken"
                        @keyup.enter="onSubmit(login)"
                        :class="{ 'is-invalid': tokenError }"
                        class="input input-bordered shadowlogin rounded-full h-16 bg-input-background text-neutral border-2 border-solid border-neutral pl-6 placeholder-input-placeholder"
                    />
                    <div
                        v-if="tokenError"
                        class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
                        {{ tokenError}}
                        <!-- Displaying email error message -->
                    </div>

                    <div class="flex flex-col mt-4">
                        <div
                            v-if="disabledCount"
                            class="cursor-pointer text-neutral text-lg hover:underline mx-auto hover:scale-105 pb-2"
                        >
                            {{ $t('Intente de nuevo en: ') }}
                            <!-- Countdown message -->
                            <vue-countdown
                                v-if="disabledCount"
                                :time="count"
                                :interval="100"
                                v-slot="{ seconds }"
                                class="text-info font-poppinsm text-base md:text-lg text-center z-1"
                            >
                                {{ seconds }}
                            </vue-countdown>
                            {{ $t(' segundos.') }}
                            <!-- Seconds message -->
                        </div>
                        <div class="flex w-full gap-6">
                            <button
                                @click="
                                        viewToken = false;
                                        appComponent.disabledLogin = false;
                                    "
                                class="w-1/2 mt-2 sm:mt-5 h-10 bg-transparent border-1 border-primary text-primary hover:bg-primary hover:text-neutral py-6 rounded-lg hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold flex justify-center items-center"
                            >
                                    <span>
                                        {{$t('Cancelar')}}
                                    </span>

                            </button>
                            <button
                                    type="submit"
                                    v-if="!buttonTokenDisabled"
                                    @click="onSubmit(login)"
                                    class="w-1/2 mt-2 sm:mt-5 h-10 bg-primary-content text-neutral-content py-6 rounded-lg flex justify-center items-center hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold">
                                    <span>
                                        {{$t('Continuar')}}
                                    </span>
                            </button>
                            <button
                                v-else-if="buttonTokenDisabled"
                                disabled
                                class="w-1/2 mt-2 sm:mt-5 h-10 bg-primary-content text-neutral-content py-6 rounded-lg flex justify-center items-center hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold"
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
                                <span>
                                        {{ $t('Continuar') }}
                                    </span>
                                <!-- Loading button text -->
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
	</div>
</template>
<style scoped>
.modal {
	visibility: visible !important; /* Ensuring modal is visible */
	opacity: 1 !important; /* Ensuring modal is fully opaque */
	pointer-events: all !important; /* Allowing pointer events on modal */
}

.modal-box {
	padding: 0px !important; /* Removing padding from modal box */
}

.shadowlogin {
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.342); /* Adding shadow effect to login elements */
}
</style>

<!-- FILE DOCUMENTED -->

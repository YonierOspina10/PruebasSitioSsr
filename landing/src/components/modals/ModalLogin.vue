<script lang="ts">
import { Form, Field } from 'vee-validate'; // Import Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Import Yup for schema validation
import { defineComponent } from 'vue'; // Import defineComponent to create a Vue component
import apiService from '../../services/ApiService'; // Import apiService for API requests
import FacebookLogin from '../logginSocialNetworks/Facebook.vue'; // Import Facebook login component
declare var optimoveSDK: any; // Declare optimoveSDK variable for external SDK usage
import router from '../../router/index.js'; // Import router for navigation
import CloseIcon from '../icons/CloseIcon.vue'; // Import CloseIcon component
import EyeIcon from '../icons/EyeIcon.vue'; // Import EyeIcon component
import { useModalStore } from '../../stores/Modal'; // Import modal store for modal management

export default defineComponent({
    components: {
        Form, // Register Form component
        EyeIcon, // Register EyeIcon component
        FacebookLogin, // Register FacebookLogin component
        Field, // Register Field component
        CloseIcon, // Register CloseIcon component
    },
    data() {
        let appComponent: any = this.$appComponent; // Reference to the app component
        let emitter = this.$emitter(); // Reference to emitter
        let clientId: any =
            (window as any).cconfig != undefined && (window as any).cconfig.facebookLoginClienId != undefined
                ? (window as any).cconfig.facebookLoginClienId // Get Facebook client ID from global config
                : '';
        let count = 0; // Counter for countdown
        let disabledCount = false; // Flag to disable countdown
        let modals = useModalStore(); // Access modal store
        let viewToken = false; // Flag to toggle token visibility
        let buttonTokenDisabled = false; // Flag to toggle token visibility
        let login = {
            // Object to hold login credentials
            email: '',
            password: '',
            token2AF: '',
        };
        let refreshBalance = this.$refreshBalance; // Method to refresh balance
        let tokenError = ''; // Variable to hold token error messages
        const schema = Yup.object().shape({ // Validation schema for form
            email: Yup.string().required(this.$t('Se requiere correo electrónico')), // Email validation
            password: Yup.string()
                .min(4, this.$t('La contraseña debe tener al menos 4 caracteres.')) // Password minimum length validation
                .required(this.$t('Contraseña es requerida.')), // Password required validation
        });
        let acceptModalHandler: (() => void) | null = null;
        return {
            clientId, // Return clientId
            appComponent, // Return appComponent
            emitter, // Return emitter
            login, // Return login object
            schema, // Return validation schema
            count, // Return count
            disabledCount, // Return disabledCount
            modals, // Return modals
            viewToken,
            tokenError,
            buttonTokenDisabled,
            refreshBalance,
            checkMultiLogin: false,
            lastFormValues: null,
            acceptModalHandler,
        };
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
        onSubmit(values: any) { // Method to handle form submission
            this.lastFormValues = values; // Store the latest submitted form values for possible login retry
            let data = {
                username: values.email, // Prepare data for login
                password: values.password,
                token2AF: values.token2AF == '' ? null : values.token2AF,
                timeRequest: true,
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

            this.disabledLogin = true; // Disable login button during request
            if (values.token2AF !== undefined) {
                this.buttonTokenDisabled = true;
            }
            apiService.request('login', data).then((response: any) => { // API call for login
                if (response.code == 0) { // Check for successful response
                    if(response.reqTokenGoogle && dataSend.token2AF == null) {
                        this.viewToken = true; // Enabling token view if required
                        return
                    }else {
                        apiService.setAuthToken(response.data.auth_token); // Set authentication token
                        this.$emit('close'); // Emit close event
                        window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
                        try {
                            (window as any).fLoadSuccess(this.appComponent.user_id, this.appComponent.frm); // Call external function on success
                        } catch (e) {}
                        if (response.data.redirectUrl == '/betshop/') { // Redirect based on response
                            window.location.href = response.data.redirectUrl;
                        } else if (response.data.redirectUrl != undefined) {
                            router.push(response.data.redirectUrl); // Navigate to redirect URL
                        } else {
                            router.push('/deportes'); // Default navigation
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
                    }
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
                } else { // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message based on error code
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    this.modals.addModal({ // Show error modal
                        showModal: 'ModalNotification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    });
                }
                this.disabledLogin = false; // Re-enable login button
            });
        },
        showpass() { // Method to toggle password visibility
            var pwd: any = document.getElementById('loginPassword'); // Get password input element
            if (pwd.type === 'password') {
                pwd.type = 'text'; // Change type to text to show password
            } else {
                pwd.type = 'password'; // Change type back to password
            }
        },
        signInWithGoogle(userGoogle) { // Method to handle Google sign-in
            console.log('Handle the response', userGoogle); // Log Google response
            const params = {
                id_token: userGoogle.credential, // Prepare parameters for API request
                country: this.appComponent.country,
                type: 1,
            };
            this.disabledLogin = true; // Disable login button during request
            apiService.request('external_auth', params).then((response: any) => { // API call for external authentication
                if (response.code == 0) { // Check for successful response
                    this.appComponent.firstReqBalance = false; // Update app component state
                    this.appComponent.tokenSB = response.data.tokenSB; // Set tokenSB
                    this.appComponent.user_id = response.data.user_id; // Set user ID
                    this.appComponent.channel_id = response.data.channel_id; // Set channel ID
                    this.appComponent.id_platform = response.data.id_platform; // Set platform ID
                    this.appComponent.tokenUser = response.data.auth_token; // Set user token
                    apiService.setAuthToken(response.data.auth_token); // Set authentication token
                    this.appComponent.showModalLogin = false; // Hide login modal
                    window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
                    this.appComponent.flagMenu = true; // Update menu flag
                    this.appComponent.frm = 'lgn'; // Set form identifier
                    this.appComponent.loadView = false; // Update load view state
                    this.refreshBalance(); // Refresh user balance
                } else { // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message based on error code
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    this.appComponent.modal = { // Show error modal
                        showModal: 'notification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
        signInWithFacebook(userFacebook) { // Method to handle Facebook sign-in
            console.log('Handle the response', userFacebook); // Log Facebook response
            const params = {
                id_token: userFacebook.authResponse.accessToken, // Prepare parameters for API request
                country: this.appComponent.country,
                type: 2,
            };
            this.disabledLogin = true; // Disable login button during request
            apiService.request('external_auth', params).then((response: any) => { // API call for external authentication
                if (response.code == 0) { // Check for successful response
                    this.appComponent.firstReqBalance = false; // Update app component state
                    this.appComponent.tokenSB = response.data.tokenSB; // Set tokenSB
                    this.appComponent.user_id = response.data.user_id; // Set user ID
                    this.appComponent.channel_id = response.data.channel_id; // Set channel ID
                    this.appComponent.id_platform = response.data.id_platform; // Set platform ID
                    this.appComponent.tokenUser = response.data.auth_token; // Set user token
                    apiService.setAuthToken(response.data.auth_token); // Set authentication token
                    this.appComponent.showModalLogin = false; // Hide login modal
                    window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
                    this.appComponent.flagMenu = true; // Update menu flag
                    this.appComponent.frm = 'lgn'; // Set form identifier
                    this.appComponent.loadView = false; // Update load view state
                    this.refreshBalance(); // Refresh user balance
                } else { // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message based on error code
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde', // Default error message
                        );
                    }
                    this.modals.addModal({ // Show error modal
                        showModal: 'ModalNotification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    });
                }
            });
        },
        signInWithFacebookFailed() { // Method to handle failed Facebook sign-in
            var error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Default error message
            this.modals.addModal({ // Show error modal
                showModal: 'ModalNotification',
                titleModal: this.$t('Error!'),
                messageModal: error_mensaje,
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
            });
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
        analyticsAttrs(label:string, context?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': context || `step:fill-form|step-num:1|component:ModalLogin|layout:layout-${this.appComponent.config.layout}`
            };
        },
    },
});
</script>
<template>

    <!-- Teleport the modal to the body element -->
    <Teleport to="body">
    <div
        class="fixed flex justify-center inset-0 text-neutral-content items-center bg-neutral-content bg-opacity-75 w-full h-full z-[101]"
    >
        <div
        v-if="appComponent.config.modalLogin !== undefined && appComponent.config.modalLogin === 2 && !viewToken"
		class="modal-box rounded-2xl bg-base-300 overflow-visible border border-accent">
			<div
				class="flex flex-col justify-center items-center relative h-10 w-full mb-5"
			>
			<button
				@click="$emit('close')"
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
                        v-bind="analyticsAttrs('auth:login:field:password')"
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
                        v-bind="analyticsAttrs('auth:login:submit','step:submit|step-num:2|component:ModalLogin|layout:layout-'+appComponent.config.layout)"
						:disabled="appComponent.disabledLogin"
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
                        v-bind="analyticsAttrs('auth:login:google','step:submit|step-num:2|component:ModalLogin|layout:layout-'+appComponent.config.layout)"
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
        class="rounded-2xl bg-base-300 overflow-visible w-[91.666667%] max-w-lg scale-90">
            <div class="flex flex-col justify-center items-center relative h-20 w-full mb-5">
                <label
                    for="m-modal-login"
                    class="shadowlogin absolute right-2 top-2 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral bg-secondary w-11 h-11 rounded-full border-2 border-solid border-white hover:scale-105"
                    @click="$emit('close')"
                >
                    <CloseIcon class="fill-neutral w-2/3"></CloseIcon> <!-- Close button with icon -->
                </label>
                <h2 class="text-neutral text-4xl font-bold mt-10 uppercase">
                    {{ $t('Iniciar sesión') }} <!-- Login title -->
                </h2>
            </div>
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
            >
                <div class="form-control mb-2 mx-10">
                    <label class="label pl-6">
                        <span class="label-text text-base text-neutral">{{ $t('Correo Electrónico') }}</span> <!-- Email label -->
                    </label>
                    <Field
                        id="loginUsername"
                        name="email"
                        :class="{ 'is-invalid': errors.email }"
                        :placeholder="$t('Correo electrónico')"
                        required="true"
                        autocomplete="usuario"
                        v-model="login.email"
                        class="input input-bordered shadowlogin rounded-full h-16 bbg-input-background text-neutral border-2 border-solid border-neutral pl-6"
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
                        {{ errors.email }} <!-- Display email error -->
                    </div>
                </div>
                <div class="form-control relative mx-10">
                    <label class="label pl-6">
                        <span class="label-text text-base text-neutral">{{ $t('Contraseña') }}</span> <!-- Password label -->
                    </label>
                    <Field
                        class="input input-bordered shadowlogin rounded-full h-16 bg-input-background text-neutral border-2 border-solid border-neutral pl-6"
                        type="password"
                        id="loginPassword"
                        :class="{ 'is-invalid': errors.password }"
                        name="password"
                        :placeholder="$t('Contraseña')"
                        v-model="login.password"
                        autocomplete="current-password"
                    />
                    <!-- Toggle password visibility -->
                    <button
                        type="button"
                        class="absolute top-1/2 translate-y-1/2 right-6"
                        id="showpass"
                        @click="showpass()"
                    >
                        <EyeIcon class="w-6 h-6 fill-secondary"></EyeIcon> <!-- Eye icon for showing/hiding password -->
                    </button>
                    <!-- Error message for password -->
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
                        {{ errors.password }} <!-- Display password error -->
                    </div>
                </div>
                <div class="grid mt-8 mx-10">
                    <!-- Countdown display when disabled -->
                    <div
                        v-if="disabledCount"
                        class="cursor-pointer text-neutral text-lg hover:underline mx-auto hover:scale-105 pb-2"
                    >
                        {{ $t('Intente de nuevo en: ') }} <!-- Countdown label -->
                        <vue-countdown
                            v-if="disabledCount"
                            :time="count"
                            :interval="100"
                            v-slot="{ seconds }"
                            class="text-neutral font-poppinsm text-base md:text-lg text-center z-1"
                        >
                            {{ seconds }} <!-- Display countdown seconds -->
                        </vue-countdown>
                        {{ $t(' segundos.') }} <!-- Countdown seconds label -->
                    </div>
                    <!-- Show login button if not disabled -->
                    <button
                        v-show="!disabledLogin"
                        type="submit"
                        aria-label="Login"
                        for="m-modal-login"
                        :disabled="disabledLogin"
                        v-bind="analyticsAttrs('auth:login:submit','step:submit|step-num:2|component:ModalLogin|layout:layout-'+appComponent.config.layout)"
                        class="btn text-info text-base bg-primary w-56 h-12 mx-auto hover:scale-105"
                    >
                        {{ $t('Iniciar sesión') }} <!-- Login button text -->
                    </button>
                    <!-- Show disabled login button -->
                    <button
                        v-show="disabledLogin"
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
                        {{ $t('Iniciar sesión') }} <!-- Disabled login button text -->
                    </button>
                    <!-- Link to password recovery -->
                    <RouterLink
                        to="/recuperar-clave"
                        v-bind="analyticsAttrs('auth:login:link:forgot-password')"
                        @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('forgot_password'))"
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
                    <!-- Google login callback -->
                    <GoogleLogin
                        :callback="signInWithGoogle"
                        prompt
                        class="w-full mt-8 flex justify-center items-center"
                        v-bind="analyticsAttrs('auth:login:google','step:submit|step-num:2|component:ModalLogin|layout:layout-'+appComponent.config.layout)"
                        @click="appComponent.gAnalytics('login_google')"
                        v-if="
                            appComponent.config.loginGoogle != undefined &&
                            appComponent.config.loginGoogle[appComponent.country]
                        "
                    />
                </div>
                <div
                    @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('popup_register'))"
                    target="_self"
                    :to="'/home'"
                    class="modal-action w-full bg-neutral rounded-b-xl h-14 flex justify-center items-center cursor-pointer"
                >
                    <span class="text-neutral-content text-lg hover:scale-105">{{ $t('¿No tienes una cuenta?') }}</span> <!-- Registration prompt -->
                    <RouterLink
                        to="/registro"
                        v-bind="analyticsAttrs('auth:login:link:register')"
                        @click="appComponent.gAnalytics('popup_register')"
                        v-if="true"
                        class="text-neutral-content font-bold text-lg hover:scale-105 hover:underline"
                    >
                        {{ $t('Regístrate') }} <!-- Registration link text -->
                    </RouterLink>
                </div>
            </Form>
            <!-- Conditional display for specific partner -->
            <div
                v-if="appComponent.partner == 16"
                class="info-container bg-gray-300 rounded-xl p-3 mt-3 flex justify-center items-center flex-col text-sm"
                style="box-shadow: inset 0px 0px 16px 0px #0000001c"
            >
                <p class="text-gray-600 text-center mb-2">
                    {{ $t('Hemos actualizado nuestra plataforma, puedes restablecer tu cuenta haciendo clic aquí:') }} <!-- Update message -->
                </p>
                <button
                    @click="
                        appComponent.showModalLogin = false;
                        appComponent.modal.showModal = 'reset';
                    "
                    v-bind="analyticsAttrs('auth:login:link:reset-account')"
                    class="btn modal-button uppercase bg-success text-neutral p-3 rounded-xl font-bold"
                    style="
                        box-shadow:
                            inset 0px -4px #0000004d,
                            0px -1px 6px 0px #0000004d;
                    "
                >
                    {{ $t('RESTABLECER CUENTA') }} <!-- Reset account button text -->
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
    </Teleport>
</template>
<style scoped>
.shadowlogin {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.342); /* Shadow effect for login elements */
}
</style>

<!-- FILE DOCUMENTED -->

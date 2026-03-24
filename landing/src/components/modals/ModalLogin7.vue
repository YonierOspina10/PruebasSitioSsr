<script lang="ts">
import { Form, Field } from 'vee-validate'; // Import Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Import Yup for schema validation
import { defineComponent } from 'vue'; // Import defineComponent for creating Vue components
import apiService from '../../services/ApiService'; // Import apiService for API requests
import FacebookLogin from '../logginSocialNetworks/Facebook.vue'; // Import Facebook login component
declare var optimoveSDK: any; // Declare optimoveSDK for external usage
import router from '@/router'; // Import router for navigation
import ExitIconModalEcuabet from '../icons/ExitIconModalEcuabet.vue'; // Import exit icon component
import EyeIcon from '../icons/EyeIcon.vue'; // Import eye icon component for password visibility toggle
import EyesCloseIcon from '../icons/EyesCloseIcon.vue';
import { useModalStore } from '../../stores/Modal'; // Import modal store for managing modal state

export default defineComponent({
    components: {
        EyeIcon, // Register EyeIcon component
        EyesCloseIcon, // Register EyeIcon component
        ExitIconModalEcuabet, // Register ExitIconModalEcuabet component
        Form, // Register Form component from vee-validate
        FacebookLogin, // Register FacebookLogin component
        Field, // Register Field component from vee-validate
    },
    data() {
        let config = this.$config(); // Retrieve configuration
        let appComponent: any = this.$appComponent; // Get app component reference
        let emitter = this.$emitter(); // Get event emitter
        let clientId: any =
            (window as any).cconfig.facebookLoginClienId != undefined
                ? (window as any).cconfig.facebookLoginClienId // Get Facebook client ID from global config
                : '';
        let refreshBalance = this.$refreshBalance; // Get refresh balance function
        let modals = useModalStore(); // Get modal store instance
        let count = 0; // Initialize countdown variable
        let disabledCount = false; // Flag to disable login button
        let viewToken = false; // Flag to toggle token visibility
        let buttonTokenDisabled = false; // Flag to toggle token visibility
        let login = { // Object to hold login credentials
            email: '',
            password: '',
            token2AF: '',
        };
        let tokenError = ''; // Variable to hold token error messages
        const schema = Yup.object().shape({ // Define validation schema using Yup
            email: Yup.string().required(this.$t('Se requiere correo electrónico')), // Email is required
            password: Yup.string()
                .min(4, this.$t('La contraseña debe tener al menos 4 caracteres.')) // Password must be at least 4 characters
                .required(this.$t('Contraseña es requerida.')), // Password is required
        });
        const modalStore = useModalStore(); // Get modal store instance
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
            modals,
            viewToken,
            tokenError,
            buttonTokenDisabled,
            passwordVisible: false,
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
        this.appComponentRef = this.$appComponent;

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
            this.lastFormValues = values;
            let data = { // Prepare data for login request
                username: values.email,
                password: values.password,
                token2AF: values.token2AF == '' ? null : values.token2AF,
                timeRequest: true,
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }
            this.appComponent.disabledLogin = true; // Disable login button
            if (values.token2AF !== undefined){
                this.buttonTokenDisabled = true;
            }
            apiService.request('login', data).then((response: any) => { // Send login request
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
                            console.log(e); // Log error if reporting fails
                        }
                    }
                } else if (response.code == 1811) { // Handle login restriction
                    this.appComponent.disabledLogin = true; // Disable login
                    let timeLogin: any = localStorage.getItem('timeLogin'); // Get login time from local storage
                    let valorNumber = parseInt(timeLogin); // Parse time as integer
                    let sumMinutes = new Date(); // Create date object for countdown
                    sumMinutes.setTime(valorNumber + this.config.restrictionTime * 1000); // Set countdown end time
                    let interval = setInterval(() => { // Start countdown interval
                        this.count = sumMinutes.getTime() - new Date().getTime(); // Update countdown
                        this.disabledCount = true; // Set disabled count flag
                        if (sumMinutes.getTime() <= new Date().getTime()) { // Check if countdown has ended
                            this.appComponent.disabledLogin = false; // Re-enable login
                            this.disabledCount = false; // Reset disabled count flag
                            clearInterval(interval); // Clear interval
                        }
                    }, 1000);
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
                } else if (response.error_code == 300017) { // Handle password reset request
                    delete data.password; // Remove password from data
                    let dataSend2 = { // Prepare data for password reset request
                        forActivate: true,
                        email: data.username,
                    };
                    this.appComponent.showModalLogin = false; // Hide login modal
                    this.modalStore.action = () => { // Define action for modal store
                        this.modalStore.loading = true; // Set loading state
                        apiService.request('reset_user_password', dataSend2).then((response: any) => { // Send password reset request
                            if (response.code == 0) { // Check for successful response
                                this.appComponent.modal = { // Show success modal
                                    showModal: 'notification',
                                    titleModal: this.$t('Mensaje'),
                                    messageModal: this.$t(
                                        'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.',
                                    ),
                                    buttonModal: this.$t('Aceptar'),
                                    orderModal: 'closeModal',
                                };
                            } else {
                                var error_mensaje = ''; // Initialize error message
                                if (response.error_code != undefined) {
                                    error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Set error message based on error code
                                }
                                if (error_mensaje == '') {
                                    error_mensaje = this.$t(
                                        'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                                    ); // Default error message
                                }
                                this.appComponent.modal = { // Show error modal
                                    showModal: 'notification',
                                    titleModal: this.$t('Error!'),
                                    messageModal: error_mensaje,
                                    buttonModal: this.$t('Aceptar'),
                                    orderModal: 'closeModal',
                                };
                            }
                            this.modalStore.loading = false; // Reset loading state
                        });
                    };
                    this.appComponent.modal = { // Show password update modal
                        showModal: 'updatePasswordEmail',
                        orderModal: 'closeModal',
                    };
                    this.appComponent.disabledLogin = false; // Re-enable login
                } else { // Handle other errors
                    var error_mensaje = ''; // Initialize error message
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Set error message based on error code
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.modals.addModal({ // Show error modal
                        showModal: 'Modal',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    });
                    this.appComponent.disabledLogin = false; // Re-enable login
                }
            });
        },
        showpass() { // Method to toggle password visibility
            const pwd = document.getElementById('loginPassword')
            if (pwd.type === 'password') {
                pwd.type = 'text'
                this.passwordVisible = true
            } else {
                pwd.type = 'password'
                this.passwordVisible = false
            }
        },
        signInWithGoogle(userGoogle) { // Method to handle Google sign-in
            const params = { // Prepare parameters for Google sign-in request
                id_token: userGoogle.credential,
                country: this.appComponent.country,
                type: 1,
            };
            this.appComponent.disabledLogin = true; // Disable login button
            if (!this.appComponent.contingency) { // Check for contingency
                apiService.request('external_auth', params).then((response: any) => { // Send external authentication request
                    if (response.code == 0) { // Check for successful response
                        this.appComponent.firstReqBalance = false; // Set first request balance flag
                        this.appComponent.tokenSB = response.data.tokenSB; // Set tokenSB from response
                        this.appComponent.user_id = response.data.user_id; // Set user ID from response
                        this.appComponent.channel_id = response.data.channel_id; // Set channel ID from response
                        this.appComponent.id_platform = response.data.id_platform; // Set platform ID from response
                        this.appComponent.tokenUser = response.data.auth_token; // Set user token from response
                        apiService.setAuthToken(response.data.auth_token); // Set authentication token
                        window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
                        this.appComponent.flagMenu = true; // Set flag for menu visibility
                        this.appComponent.frm = 'lgn'; // Set form identifier
                        this.refreshBalance(); // Refresh balance
                    } else { // Handle error response
                        var error_mensaje = ''; // Initialize error message
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Set error message based on error code
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            ); // Default error message
                        }
                        this.appComponent.modal = { // Show error modal
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.appComponent.disabledLogin = false; // Re-enable login
                    }
                });
            } else {
                setTimeout(() => { // Hide login modal after timeout
                    this.appComponent.showModalLogin = false;
                }, 1000);
            }
        },
        signInWithFacebook(userFacebook) { // Method to handle Facebook sign-in
            const params = { // Prepare parameters for Facebook sign-in request
                id_token: userFacebook.authResponse.accessToken,
                country: this.appComponent.country,
                type: 2,
            };
            this.appComponent.disabledLogin = true; // Disable login button
            if (!this.appComponent.contingency) { // Check for contingency
                apiService.request('external_auth', params).then((response: any) => { // Send external authentication request
                    if (response.code == 0) { // Check for successful response
                        this.appComponent.firstReqBalance = false; // Set first request balance flag
                        this.appComponent.tokenSB = response.data.tokenSB; // Set tokenSB from response
                        this.appComponent.user_id = response.data.user_id; // Set user ID from response
                        this.appComponent.channel_id = response.data.channel_id; // Set channel ID from response
                        this.appComponent.id_platform = response.data.id_platform; // Set platform ID from response
                        this.appComponent.tokenUser = response.data.auth_token; // Set user token from response
                        apiService.setAuthToken(response.data.auth_token); // Set authentication token
                        window.localStorage.setItem('auth_token', response.data.auth_token); // Store token in local storage
                        this.appComponent.flagMenu = true; // Set flag for menu visibility
                        this.appComponent.frm = 'lgn'; // Set form identifier
                        this.refreshBalance(); // Refresh balance
                    } else { // Handle error response
                        var error_mensaje = ''; // Initialize error message
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Set error message based on error code
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            ); // Default error message
                        }
                        this.appComponent.modal = { // Show error modal
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.appComponent.disabledLogin = false; // Re-enable login
                    }
                });
            } else {
                setTimeout(() => { // Hide login modal after timeout
                    this.appComponent.showModalLogin = false;
                }, 1000);
            }
        },
        signInWithFacebookFailed() { // Method to handle failed Facebook sign-in
            var error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Set error message
            this.appComponent.modal = { // Show error modal
                showModal: 'notification',
                titleModal: this.$t('Error!'),
                messageModal: error_mensaje,
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
            };
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
    },
});
</script>
<template>
    <div class="modal w-screen h-screen text-neutral-content items-center bg-neutral-content bg-opacity-75"> <!-- Modal container for login -->
        <div v-if="!viewToken" class="modal-box rounded-3xl rounded-[3rem] overflow-visible bg-secondary w-full"> <!-- Modal box with rounded corners -->
            <div class="flex justify-center items-center relative h-16 w-full border-primary border-solid border-b"> <!-- Header section with centered content -->
                <label
                    for="m-modal-login"
                    class="absolute right-1 -top-3 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral w-20 h-20 hover:scale-105"
                    @click="$emit('close')"
                >
                    <ExitIconModalEcuabet class="w-52 h-52 fill-primary-content" /> <!-- Exit icon -->
                </label>
                <img
                    :src="
                        appComponent.config != undefined && appComponent.config.logo != undefined
                            ? appComponent.config.logo
                            : 'https://images.virtualsoft.tech/m/msj8212T1732770157.png'
                    "
                />
            </div>
            <div
                class="bg-base-300 rounded-l-[3rem] rounded-b-[3rem] pt-10"
            >
                <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors }"
                >
                    <!-- Email input container -->
                    <div class="form-control mb-5 mx-5">
                        <label class="label pl-2">
                            <span class="label-text text-xl text-neutral">{{
                                $t('Correo Electrónico')
                            }}</span>
                        </label>
                        <!-- Email input field -->
                        <Field
                            id="loginUsername"
                            name="email"
                            :class="{ 'is-invalid': errors.email }"
                            :placeholder="$t('Correo electrónico')"
                            required="true"
                            autocomplete="usuario"
                            v-model="login.email"
                            class="input input-bordered shadowlogin rounded-2xl h-12 bg-input-backgraund border-2 border-solid border-input-border pl-6 placeholder-input-placeholder text-neutral"
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
                            {{ errors.email }} <!-- Display email error -->
                        </div>
                    </div>
                    <div class="form-control relative mx-5"> <!-- Password input container -->
                        <label class="label pl-2">
                            <span class="label-text text-xl text-neutral">{{ $t('Contraseña') }}</span> <!-- Password label -->
                        </label>
                        <!-- Password input container -->
                        <div
                            class="input input-bordered shadowlogin rounded-2xl h-12 bg-input-backgraund border-2 pl-0 border-solid border-input-border flex justify-between items-center text-neutral"
                        >
                            <!-- Password input field -->
                            <Field
                                class="bg-transparent border-transparent w-11/12 rounded-l-2xl"
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
                                class="w-20 h-full px-9"
                                id="showpass"
                                @click="showpass()"
                            >
                                <EyeIcon
                                    v-if="passwordVisible"
                                    class="w-6 h-6 fill-accent-focus"
                                />
                                <EyesCloseIcon
                                    v-else
                                    class="w-6 h-6 fill-accent-focus stroke-accent-focus"
                                />
                            </button>
                        </div>
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
                            {{ errors.password }} <!-- Display password error -->
                        </div>
                    </div>
                    <!-- Countdown display when login is disabled -->
                    <div class="grid py-5 mx-10 justify-center"> <!-- Container for additional options -->
                        <div
                            v-if="disabledCount"
                            class="cursor-pointer text-secondary text-lg hover:underline mx-auto hover:scale-105 pb-2"
                        >
                            {{ $t('Intente de nuevo en: ') }} <!-- Countdown label -->
                            <vue-countdown
                                v-if="disabledCount"
                                :time="count"
                                :interval="100"
                                v-slot="{ seconds }"
                                class="text-black font-poppinsm text-base md:text-lg text-center z-1"
                            >
                                {{ seconds }} <!-- Display countdown seconds -->
                            </vue-countdown>
                            {{ $t(' segundos.') }} <!-- Countdown suffix -->
                        </div>
                        <!-- Link to password recovery -->
                        <RouterLink
                            to="/recuperar-clave"
                            @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('forgot_password'))"
                        >
                            <label class="label">
                                <a class="label-text-alt"></a>
                                <label
                                    for="m-modal-login"
                                    class="cursor-pointer text-neutral-focus/80 text-base hover:underline mx-auto hover:scale-105 underline"
                                    >{{ $t('¿Olvidaste la contraseña?') }}</label
                                >
                            </label>
                        </RouterLink>
                        <div class="flex justify-center items-center gap-3 w-full h-12 mt-2"> <!-- Container for buttons -->
                            <!-- Link to registration page -->
                            <RouterLink
                                to="/registro"
                                @click="
                                    ((appComponent.showModalLogin = false), appComponent.gAnalytics('popup_register'))"
                                v-if="
                                    appComponent.config.showRegisterButton == undefined ||
                                    appComponent.config.showRegisterButton[appComponent.country] == undefined ||
                                    appComponent.config.showRegisterButton[appComponent.country]
                                "
                                class="text-primary text-lg bg-transparent w-32 h-10 mx-auto hover:scale-105 rounded-lg border-1 border-primary flex justify-center items-center"
                            >
                                <span>
                                    {{ $t('Regístrate') }} <!-- Registration button text -->
                                </span>
                            </RouterLink>
                            <!-- Login button -->
                            <button
                                v-show="!appComponent.disabledLogin"
                                type="submit"
                                @click="appComponent.gAnalytics('popup_login')"
                                aria-label="Login"
                                for="m-modal-login"
                                :disabled="appComponent.disabledLogin"
                                class="text-white text-lg bg-success w-32 h-10 mx-auto hover:scale-105 rounded-lg"
                            >
                                {{ $t('Acceder') }} <!-- Login button text -->
                            </button>
                        </div>
                        <!-- Disabled login button -->
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
                            {{ $t('Iniciar sesión') }} <!-- Disabled button text -->
                        </button>
                        <!-- Google login component -->
                        <GoogleLogin
                            :callback="signInWithGoogle"
                            prompt
                            class="w-full mt-8 flex justify-center items-center"
                            @click="appComponent.gAnalytics('login_google')"
                            v-if="
                                appComponent.config.loginGoogle != undefined &&
                                appComponent.config.loginGoogle[appComponent.country]
                            "
                        />
                    </div>
                </Form>
            </div>
        </div>
        <div
            v-else-if="viewToken"
            class="modal-box rounded-2xl bg-base-200 flex flex-col justify-center relative overflow-visible h-2/3"
        >
            <label
                for="m-modal-login"
                class="absolute right-1 -top-3 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral w-20 h-20 hover:scale-105"
                @click="
                        appComponent.showModalLogin = false;
                        appComponent.disabledLogin = false;
                    "
            >
                <ExitIconModalEcuabet class="w-52 h-52 fill-primary-content" /> <!-- Exit icon -->
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
    visibility: visible !important; /* Ensure modal is visible */
    opacity: 1 !important; /* Set modal opacity */
    pointer-events: all !important; /* Enable pointer events for modal */
}
.modal-box {
    padding: 0px !important; /* Remove padding from modal box */
}
.shadowlogin {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.342); /* Set shadow for login input */
}
</style>

<!-- FILE DOCUMENTED -->

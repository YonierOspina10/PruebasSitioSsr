<script lang="ts">
import { Form, Field } from 'vee-validate'; // Importing Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Importing Yup for schema validation
import { defineComponent } from 'vue'; // Importing defineComponent for creating Vue components
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import FacebookLogin from '../FacebookLogin.vue'; // Importing FacebookLogin component
declare var optimoveSDK: any; // Declaring optimoveSDK variable for external SDK usage
import router from '@/router'; // Importing router for navigation
import { useModalStore } from '@/stores/modal';
import ExitIconModalEcuabet from '@/components/icons/ExitIconModalEcuabet.vue';
import EyesIcon from '@/components/icons/EyesIcon.vue';
import EmailIcon from '@/components/icons/EmailIcon.vue';
import PadLockIcon from '@/components/icons/PadLockIcon.vue';
import EyesCloseIcon from '@/components/icons/EyesCloseIcon.vue';

export default defineComponent({
    components: {
        EyesCloseIcon,
        PadLockIcon,
        EmailIcon,
        EyesIcon,
        Form,
        Field,
        FacebookLogin,
        ExitIconModalEcuabet
    },
    data() {
        let config = this.$config(); // Retrieving configuration settings
        let appComponent: any = this.$appComponent; // Accessing the app component
        let emitter = this.$emitter(); // Getting the event emitter
        let show = false; // Flag to show/hide elements
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
        let bannerImageD = '';
        let bannerImageM = '';
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
                .required(this.$t('Contraseña es requerida.')
                ), // Password is required
        });
        const modalStore = useModalStore(); // Using modal store for managing modal state
        let acceptModalHandler: (() => void) | null = null;

        return {
            config,
            appComponent,
            emitter,
            clientId,
            refreshBalance,
            count,
            disabledCount,
            login,
            bannerImageD,
            bannerImageM,
            schema,
            modalStore,
            acceptModalHandler,
            show,
            viewToken,
            tokenError,
            buttonTokenDisabled,
            checkMultiLogin: false,
            lastFormValues: null,
        }
    },
    unmounted() {
        if (this.acceptModalHandler) {
            this.emitter.off('accept:modal', this.acceptModalHandler); // Cleaning up event listener on component unmount
        }
        window.removeEventListener('keydown', this.handleEnterKey);
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
        this.emitter.on('accept:modal', this.acceptModalHandler);
        this.emitter.on('go:register', () => {
            this.closeLoginModal();
        });
        this.getBannerImage()

        window.addEventListener('keydown', this.handleEnterKey);
    },
    methods: {
        closeLoginModal() {
            this.appComponent.showModalLogin = false;
            this.appComponent.disabledLogin = false;
            this.appComponent.closeModal();
        },
        getBannerImage() {
            // Method to get banner image
            if (this.appComponent != undefined && this.appComponent.config != undefined && this.appComponent.config.modalLoginV3 != undefined &&
                this.appComponent.config.modalLoginV3.banner != undefined && this.appComponent.config.modalLoginV3.bannerMobile != undefined) {

                return this.bannerImageD = this.appComponent.config.modalLoginV3.banner, this.bannerImageM = this.appComponent.config.modalLoginV3.bannerMobile
            }
            return this.bannerImageD = '', this.bannerImageM = '';
        },
        validateToken() {
            if (this.viewToken) {
                if (!this.login.token2AF) {
                    this.tokenError = this.$t('El código de autenticación es requerido');
                } else if (this.login.token2AF.length < 6) {
                    this.tokenError = this.$t('Código inválido. Verifica el código e intenta nuevamente');
                } else {
                    this.tokenError = '';
                }
            } else {
                this.tokenError = '';
            }
        },
        handleEnterKey(event: KeyboardEvent) {
            if (this.viewToken && event.key === 'Enter') {
                event.preventDefault(); // 🚫 Previene el submit del formulario anterior
                this.onSubmit(this.login); // ✅ Llama a tu función actual
            }
        },
        onSubmit(values: any) {
            this.lastFormValues = values; // Store the latest submitted form values for possible login retry

            let dataSend: any = { // Build the payload to be sent to the login API
                username: values.email, // User email used as the login identifier
                password: values.password, // User password from the login form
                token2AF: values.token2AF == '' ? null : values.token2AF, // Send null if 2FA token is empty, otherwise send its value
                timeRequest: true, // Indicates the request should be tracked/timed by the backend
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                dataSend.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

            this.appComponent.disabledLogin = true; // Disable login button to prevent multiple submissions

            if (values.token2AF !== undefined) { // If the 2FA token field exists
                this.buttonTokenDisabled = true; // Disable token button to avoid duplicate actions
            }
            if (!this.appComponent.contingency) {
                // Checking if not in contingency mode
                apiService
                    .request('login', dataSend) // Sending login request
                    .then((response: any) => {
                        // Handling response
                        if (response.code == 0) {
                            // Successful login
                            if (response.reqTokenGoogle && dataSend.token2AF == null) {
                                this.viewToken = true; // Enabling token view if required
                                return
                            } else {
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
                                } catch (e) { }
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
                            } catch (e) { }
                            setTimeout(() => {
                                this.emitter.emit('ready:login'); // Emitting event after login is ready
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

                        }
                        else if (response.code == 1811) {
                            // Handling specific error codeytt
                            this.appComponent.disabledLogin = true; // Disabling login button867998
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
                            this.closeLoginModal(); // Hiding login modal
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
                    this.closeLoginModal(); // Hiding login modal after timeout
                }, 1000);
            }
        },
        showpass() {
            // Method to toggle password visibility
            var pwd: any = document.getElementById('loginPassword'); // Getting password input element
            if (pwd.type === 'password') {
                pwd.type = 'text'; // Changing type to text to show password
                this.show = true;
            } else {
                pwd.type = 'password'; // Changing type back to password to hide it
                this.show = false;
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
                    this.closeLoginModal(); // Hiding login modal after timeout
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
                    this.closeLoginModal(); // Hiding login modal after timeout
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
        triggerBlurValidation(event: Event) {
            if (event && event.target) {
                (event.target as HTMLInputElement).dispatchEvent(
                    new Event('change', { bubbles: true })
                );
            }
        },
        analyticsAttrs(label:string, context?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': context || `step:fill-form|step-num:1|component:ModalLoginV3|layout:layout-${this.appComponent.config.layout}`
            };
        },
    }
});
</script>
<template>
    <div class="fixed inset-0 z-[101] flex items-center justify-center bg-base-content bg-opacity-50">
        <div class="bg-base-content/10 backdrop-blur-md rounded-2xl shadow-xl w-full md:w-[98%] max-w-[931px] h-full md:h-[95%] lg:max-h-[579px] border-0 sm:border-2 border-primary-focus flex item-center justify-between
                relative overflow-hidden">
            <div class="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center w-full">

                <!-- Close modal on click -->
                <label for="m-modal-login"
                    v-bind="analyticsAttrs('auth:login:close-modal')"
                    class="absolute right-0 top-0 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral w-20 h-20 hover:scale-105"
                    @click="closeLoginModal">
                    <ExitIconModalEcuabet class="w-60 h-60 fill-accent-focus" /> <!-- Exit icon -->
                </label>

                <!-- Banner -->
                <div
                    class="w-full h-[216px] md:h-[96%] lg:h-[531px] bg-cover rounded-t-2xl hidden sm:flex justify-center items-center flex-col gap-4 sm:gap-8">
                    <img alt="" :src="bannerImageD"
                        class="hidden sm:block h-[216px] md:h-[90%] lg:h-[531px] w-full md:w-[90%]">
                </div>

                <div class="w-full h-[316px] md:h-[531px] bg-cover bg-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none sm:hidden block"
                    :style="{ backgroundImage: `url(${bannerImageM})` }"></div>

                <!-- Login Form -->
                <div v-if="!viewToken"
                    class="w-full p-6 md:p-4 lg:p-8 flex flex-col justify-center sm:border-t-0 border-t-1 border-primary-content rounded-t-xl">
                    <div class="w-full hidden  sm:flex flex-col items-center gap-5 md:gap-4 lg:gap-12">
                        <img v-lazy="appComponent.config.logo_ != undefined &&
                            appComponent.config.logo_['dark'] != undefined &&
                            appComponent.config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                            ? appComponent.config.logo_['dark']
                            : appComponent.config.logo_['light']
                            " alt="" width="154" height="32" class="hidden sm:block " />
                        <div class="leading-2">
                            <p
                                class="text-3xl md:text-xl lg:text-3xl font-semibold text-center mb-0 md:mb-0 lg:mb-4 text-neutral">
                                {{ $t('Bienvenido') }}
                                <hr class="bg-transparent border-0">
                                <span class="text-lg md:text-base lg:text-lg font-poppinsm font-light leading-9">
                                    {{ $t('Ingresa tus datos para iniciar sesión') }}
                                </span>
                            </p>

                        </div>
                    </div>
                    <div class="w-full mt-0 md:mt-5 sm:hidden block justify-items-center">
                        <img v-lazy="appComponent.config.logo_ != undefined &&
                            appComponent.config.logo_['dark'] != undefined &&
                            appComponent.config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                            ? appComponent.config.logo_['dark']
                            : appComponent.config.logo_['light']
                            " alt="" width="154" height="32" class="" />
                        <h2 class="text-2xl font-medium text-neutral mt-6">
                            {{ $t('Iniciar sesión') }}
                        </h2>
                    </div>

                    <div class="w-full flex flex-col mt-3 md:mt-0 lg:mt-6 md:gap-2 lg:gap-8">
                        <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
                            <div class="mb-4 md:mb-1 lg:mb-8">
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1"></label>
                                <div
                                    class="w-full px-0 sm:px-4 py-2 bg-transparent sm:bg-base-content/10 border-transparent border-b-1 border-b-primary flex relative backdrop-blur-md rounded-t-md">
                                    <EmailIcon class="w-[36px] h-[36px] sm:block" />
                                    <Field id="loginUsername" name="email" :class="{ 'is-invalid': errors.email }"
                                        :placeholder="$t('Correo electrónico')" required="true" autocomplete="usuario"
                                        v-model="login.email"
                                        v-bind="analyticsAttrs(`auth:login:field:email`)"
                                        class="w-full py-2 bg-transparent placeholder-neutral border-transparent text-neutral"
                                        type="text" />
                                </div>
                                <div v-if="errors.email != undefined"
                                    class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="w-6 h-6 mx-2 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                        </path>
                                    </svg>
                                    {{ errors.email }}
                                    <!-- Displaying email error message -->
                                </div>
                            </div>
                            <div class="mb-4 md:mb-1 lg:mb-6">
                                <label for="password" class="block text-sm font-medium text-gray-700 mb-1"></label>
                                <div
                                    class="w-full px-0 sm:px-4 py-2 bg-transparent sm:bg-base-content/10 border-transparent border-b-1 border-b-primary flex relative backdrop-blur-md rounded-t-md">
                                    <PadLockIcon class="w-[36px] h-[36px] sm:block" />
                                    <Field type="password" id="loginPassword" :class="{ 'is-invalid': errors.password }"
                                        name="password" :placeholder="$t('Contraseña')" v-model="login.password"
                                        required="true" autocomplete="current-password"
                                        v-bind="analyticsAttrs(`auth:login:field:password`)"
                                        class="w-full  py-2 bg-transparent placeholder-neutral border-transparent text-neutral" />
                                    <button
                                        type="button" 
                                        class="absolute top-4 sm:top-5 right-6" id="showpass"
                                        @click="showpass()">
                                        <EyesIcon v-if="show" class="w-6 h-6 fill-accent-focus" />
                                        <EyesCloseIcon v-if="!show"
                                            class="w-6 h-6 fill-accent-focus stroke-accent-focus" />
                                    </button>
                                </div>
                                <div v-if="errors.password != undefined"
                                    class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 gap-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="w-6 h-6 mx-2 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                        </path>
                                    </svg>
                                    {{ errors.password }}
                                    <!-- Displaying password error message -->
                                </div>
                            </div>
                            <button 
                                type="submit"
                                v-show="!appComponent.disabledLogin"
                                v-bind="analyticsAttrs('auth:login:submit', 'step:submit|step-num:2|component:ModalLoginV3|layout:layout-' + appComponent.config.layout)"
                                class="w-full mt-2 sm:mt-5 h-[60px] bg-gradient-to-b from-accent to-primary text-neutral py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold">
                                {{ $t('Iniciar sesión') }}
                            </button>
                            <button v-show="appComponent.disabledLogin" disabled
                                class="w-full mt-2 sm:mt-5 h-[60px] bg-primary-content text-neutral-content py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold">
                                <svg aria-hidden="true" role="status"
                                    class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                {{ $t('Iniciar sesión') }}
                                <!-- Loading button text -->
                            </button>
                        </Form>
                        <div class="mt-6 md:mt-1 lg:mt-6 flex flex-col items-center gap-4 sm:gap-0">
                            <div class="w-full
                                 flex justify-center items-center h-5 gap-2">
                                <!-- Message for users without an account -->
                                <span class="text-neutral text-lg hover:scale-105">{{
                                    $t('¿Nuevo en Doradobet?')
                                    }}</span>
                                <RouterLink 
                                to="/registro" 
                                @click="closeLoginModal();
                                appComponent.gAnalytics('popup_register')" v-if="
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
                                class="text-neutral font-bold text-lg hover:scale-105 underline">
                                    {{ $t('¡Crea tu cuenta!') }}
                                    <!-- Register button text -->
                                </RouterLink>
                            </div>
                            <!-- Link to password recovery -->
                            <RouterLink 
                                to="/recuperar-clave"
                                @click="closeLoginModal(); 
                                appComponent.gAnalytics('forgot_password')" 
                                class=""
                                v-bind="analyticsAttrs('auth:login:link:forgot-password')"
                            >
                                <label class="label">
                                    <a class="label-text-alt"></a>
                                    <label for="m-modal-login"
                                        class="cursor-pointer text-neutral text-base hover:underline mx-auto hover:scale-105 underline">{{
                                            $t('Restaurar contraseña') }}</label>
                                </label>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div v-else-if="viewToken"
                    class="w-full p-6 md:p-4 lg:p-8 flex flex-col justify-center sm:border-t-0 border-t-1 border-primary-content rounded-t-xl">
                    <div class="w-full hidden  sm:flex flex-col items-center gap-5 ">
                        <img v-lazy="appComponent.config.logo_ != undefined &&
                            appComponent.config.logo_['dark'] != undefined &&
                            appComponent.config.logo_['light'] != undefined &&
                            !appComponent.themeSportbook
                            ? appComponent.config.logo_['dark']
                            : appComponent.config.logo_['light']
                            " alt="" width="154" height="32" class="hidden sm:block " />

                        <div class="w-full flex flex-col items-center gap-3 justify-center">
                            <img src="https://images.virtualsoft.tech/m/msj0212T1758818078.png" alt="" width="154"
                                height="32" />
                            <h2 class="text-3xl font-semibold text-neutral">
                                {{ $t('Ingrese el token') }}
                            </h2>
                            <p class="text-md font-poppinssl text-center text-neutral">
                                {{
                                    $t('Escribe el código de seguridad, en tu aplicación de autenticación.')
                                }}
                            </p>
                        </div>
                    </div>

                    <div class="w-full mt-0 md:mt-5 sm:hidden block flex flex-col items-start gap-3">
                        <h2 class="text-2xl font-semibold text-neutral">
                            {{ $t('Ingrese el token') }}
                        </h2>
                        <p class="text-md font-poppinssl text-center">
                            {{
                                $t('Escribe el código de seguridad, en tu aplicación de autenticación.')
                            }}
                        </p>
                    </div>

                    <div class="w-full flex flex-col mt-3 md:mt-0 lg:mt-6  gap-8 md:gap-2 lg:gap-8">
                        <Form :validation-schema="schema" :validation-schema-context="{ isTokenView: viewToken }"
                            @submit.prevent="onSubmit">
                            <div class="mb-4 md:mb-1 lg:mb-6">
                                <label for="token2FA" class="block text-sm font-medium text-gray-700 mb-1"></label>
                                <div
                                    class="w-full px-0 sm:px-4 py-2 bg-transparent sm:bg-base-content/10 border-transparent border-b-1 border-b-primary flex relative backdrop-blur-md rounded-t-md">
                                    <PadLockIcon class="w-[36px] h-[36px] hidden sm:block" />
                                    <input type="text" name="token2AF" v-model="login.token2AF" @blur="validateToken"
                                        @keyup.enter="onSubmit(login)" :class="{ 'is-invalid': tokenError }"
                                        class="w-full px-10 py-2 bg-transparent placeholder-neutral border-transparent text-neutral" />
                                </div>
                                <div v-if="tokenError"
                                    class="invalid-feedback alert alert-warning p-1 bg-error/20 text-neutral shadow-lg rounded-full flex justify-center mb-3 gap-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        class="w-6 h-6 mx-2 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                        </path>
                                    </svg>
                                    {{ tokenError }}
                                    <!-- Displaying password error message -->
                                </div>
                            </div>
                            <div class="w-full flex justify-center items-center gap-3">
                                <button @click="
                                    viewToken = false;
                                appComponent.disabledLogin = false;
                                "
                                    class="w-1/2 mt-2 sm:mt-5 h-10 bg-transparent border-1 border-primary text-primary hover:bg-primary hover:text-neutral py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold flex justify-center items-center">
                                    <span>
                                        {{ $t('Cancelar') }}
                                    </span>

                                </button>
                                <button type="submit" v-if="!buttonTokenDisabled" @click="onSubmit(login)"
                                    class="w-1/2 mt-2 sm:mt-5 h-10 bg-primary-content text-neutral-content py-2 rounded-lg flex justify-center items-center hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold">
                                    <span>
                                        {{ $t('Continuar') }}
                                    </span>
                                </button>
                                <button v-else-if="buttonTokenDisabled" disabled
                                    class="w-1/2 mt-2 sm:mt-5 h-10 bg-primary-content text-neutral-content py-2 rounded-lg flex justify-center items-center hover:bg-primary transition-colors duration-200 font-poppinsm text-lg font-semibold">
                                    <svg aria-hidden="true" role="status"
                                        class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor" />
                                    </svg>
                                    <span>
                                        {{ $t('Continuar') }}
                                    </span>
                                    <!-- Loading button text -->
                                </button>
                            </div>
                        </Form>
                        <div class="mt-4 md:mt-1 lg:mt-4 flex flex-col items-center gap-4 sm:gap-0">
                            <div class="w-full
                                 flex justify-center items-center h-5 gap-2">
                                <!-- Message for users without an account -->
                                <span class="text-neutral text-lg hover:scale-105">{{
                                    $t('¿Nuevo en Doradobet?')
                                    }}</span>
                                <RouterLink 
                                    to="/registro"
                                    @click="closeLoginModal(); appComponent.gAnalytics('popup_register')" v-if="
                                        appComponent.config.showRegisterButton ==
                                        undefined ||
                                        appComponent.config.showRegisterButton[
                                        appComponent.country
                                        ] == undefined ||
                                        appComponent.config.showRegisterButton[
                                        appComponent.country
                                        ]
                                    " 
                                    class="text-neutral font-bold text-lg hover:scale-105 underline"
                                    v-bind="analyticsAttrs('auth:login:link:register')"     
                                >
                                    {{ $t('¡Crea tu cuenta!') }}
                                    <!-- Register button text -->
                                </RouterLink>
                            </div>
                            <!-- Link to password recovery -->
                            <RouterLink 
                                to="/recuperar-clave"
                                v-bind="analyticsAttrs('auth:login:link:forgot-password')"
                                @click="closeLoginModal();
                                appComponent.gAnalytics('forgot_password')"
                                class="">
                                <label class="label">
                                    <a class="label-text-alt"></a>
                                    <label for="m-modal-login"
                                        class="cursor-pointer text-neutral text-base hover:underline mx-auto hover:scale-105 underline">{{
                                            $t('Restaurar contraseña') }}</label>
                                </label>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

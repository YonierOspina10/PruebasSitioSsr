<script lang="ts">
import { Form, Field } from 'vee-validate'; // Importing Form and Field components from vee-validate
import * as Yup from 'yup'; // Importing Yup for schema validation
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '../../services/ApiService'; // Importing apiService for API requests
import { useModalStore } from '../../stores/Modal'; // Importing modal store for modal management
import IconClose from '../icons/CloseIcon.vue'; // Importing CloseIcon component
import EyeIcon from '../icons/EyeIcon.vue'; // Importing EyeIcon component
import router from '@/router'; // Importing router for navigation

export default defineComponent({
    components: {
        EyeIcon, // Registering EyeIcon component
        Form, // Registering Form component
        Field, // Registering Field component
        IconClose, // Registering IconClose component
    },
    data() {
        let appComponent: any = this.$appComponent; // Accessing app component
        let modals = useModalStore(); // Using modal store
        let login = {
            // Initializing login object
            email: '', // Email field
            password: '', // Password field
        };
        let disabledLogin = false; // Flag to disable login button
        const schema = Yup.object().shape({
            // Defining validation schema
            email: Yup.string().required(this.$t('Email is required')), // Email validation
            password: Yup.string() // Password validation
                .min(4, this.$t('La contraseña debe tener al menos 4 caracteres.')) // Minimum length
                .required(this.$t('Contraseña es requerida.')), // Required field
        });
        let acceptModalHandler: (() => void) | null = null;
        return {
            appComponent, // Returning app component
            disabledLogin, // Returning disabledLogin flag
            login, // Returning login object
            schema, // Returning validation schema
            modals, // Returning modals
            checkMultiLogin: false,
            lastFormValues: null,
            acceptModalHandler,
        };
    },
    methods: {
        closeLoginModal() {
          this.appComponent.showModalLogin = false;
          this.appComponent.disabledLogin = false;
          this.$emit('close');
        },
        onSubmit(values: any) {
            this.lastFormValues = values; // Store the latest submitted form values for possible login retry

            // Method to handle form submission
            let data = {
                // Preparing data for API request
                username: values.email, // Mapping email to username
                password: values.password, // Mapping password
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

            apiService.request('login', data).then((response: any) => {
                // Making API request
                if (response.code == 0) {
                    // Checking for successful response
                    apiService.setAuthToken(response.data.auth_token); // Setting auth token
                    this.$emit('close'); // Emitting close event
                    window.localStorage.setItem('auth_token', response.data.auth_token); // Storing auth token in local storage
                    try {
                        (window as any).fLoadSuccess(
                            // Calling fLoadSuccess function
                            this.appComponent.user_id, // Passing user ID
                            this.appComponent.frm, // Passing form data
                        );
                    } catch (e) {} // Catching any errors
                    if (response.data.redirectUrl == '/betshop/') {
                        // Redirecting based on response
                        window.location.href = response.data.redirectUrl; // Redirecting to betshop
                    } else if (response.data.redirectUrl != undefined) {
                        // Checking for other redirect URLs
                        router.push(response.data.redirectUrl); // Pushing to router
                    } else {
                        router.push('/deportes'); // Default redirect
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
                                    'Hemos detectado que ya tienes una cuenta.776576 Para jugar en, necesitas una cuenta local. ¿Quieres crearla usando tus datos ya registrados?'
                                ),
                                buttonModal: this.$t('No, continuar con mi cuenta'),
                                orderModal: 'multi-login',
                                buttonModal2: this.$t('Sí, crear cuenta en'),
                                link2: '/registro',
                            });
                            this.appComponent.disabledLogin = false; // Enabling login button                        
                } else {
                    // Handling error response
                    var error_mensaje = ''; // Initializing error message
                    if (response.error_code != undefined) {
                        // Checking for error code
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Setting error message
                    }
                    if (error_mensaje == '') {
                        // Default error message if none set
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                    if (response.error_code == 30001) {
                        // Handling specific error codes
                        this.appComponent.gAnalytics('password_locked'); // Tracking password locked event
                    }
                    if (response.error_code == 30002) {
                        this.appComponent.gAnalytics('user_exist'); // Tracking user exists event
                    }
                    if (response.error_code == 30003) {
                        this.appComponent.gAnalytics('incorret_password'); // Tracking incorrect password event
                    }
                    this.appComponent.modal = {
                        // Setting modal for error notification
                        showModal: 'notification', // Modal type
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Modal message
                        buttonModal: this.$t('Aceptar'), // Modal button text
                        orderModal: 'closeModal', // Modal order
                    };
                }
            });
        },
        showpass() {
            // Method to toggle password visibility
            var pwd: any = document.getElementById('loginPassword'); // Getting password input element
            if (pwd.type === 'password') {
                // Checking if password is hidden
                pwd.type = 'text'; // Changing to text to show password
            } else {
                pwd.type = 'password'; // Changing back to password to hide
            }
        },
    },
});
</script>
<template>
    <!-- Main container for the modal, fixed position covering the entire viewport -->
    <div class="text-neutral-content items-center bg-neutral-content bg-opacity-75 fixed inset-0 flex justify-center">
        <!-- Modal box containing the content -->
        <div class="modal-box rounded-2xl overflow-visible max-w-[28rem] ">
            <!-- Logo link -->
            <a
                class="-mt-36 absolute w-full left-0"
                title=""
            >
                <!-- Logo image -->
                <img
                    width="80"
                    height="100"
                    class="m-auto"
                    :src="appComponent.config.header.logo.src"
                />
            </a>
            <!-- Close button for the modal -->
            <button
                class="cursor-pointer text-right block text-2xl w-4 transition ease-in-out hover:scale-105 ml-auto"
                @click="$emit('close')"
            >
                <IconClose class="fill-neutral-content w-5 h-5"></IconClose>
            </button>
            <!-- Form for user login -->
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
            >
                <!-- Email input field -->
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text text-base">{{ $t('Correo Electrónico') }}</span>
                    </label>
                    <Field
                        id="loginUsername"
                        name="email"
                        :class="{
                            'is-invalid': errors.email,
						    'border-error': errors.email != undefined,
						    'border-neutral-focus': errors.email == undefined
						 }"
                        :placeholder="$t('Correo electrónico')"
                        required="true"
                        autocomplete="usuario"
                        v-model="login.email"
                        class="input input-bordered"
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
                        <span class="label-text text-base">{{ $t('Contraseña') }}</span>
                    </label>
                    <Field
                        class="input input-bordered"
                        type="password"
                        id="loginPassword"
                        :class="{
                            'is-invalid': errors.password,
						    'border-error': errors.password != undefined,
						    'border-neutral-focus': errors.password == undefined
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
                        class="absolute mt-[3.4rem] right-9"
                        id="showpass"
                        @click="showpass()"
                    >
                        <EyeIcon class="w-6 h-6 fill-neutral-content"></EyeIcon>
                    </button>
                    <!-- Link to password recovery -->
                    <RouterLink
                        to="/recuperar-clave"
                        @click="
                            appComponent.showModalLogin = false;
                            appComponent.gAnalytics('forgot_password');
                        "
                    >
                        <label class="label">
                            <a class="label-text-alt"></a>
                            <label
                                for="m-modal-login"
                                class="text-neutral cursor-pointer hover:underline"
                                >{{ $t('Olvido su contraseña?') }}</label
                            >
                        </label>
                    </RouterLink>
                </div>
                <!-- Modal action buttons -->
                <div class="modal-action">
                    <RouterLink
                        v-if="
                            appComponent.config.showRegisterButton == undefined ||
                            appComponent.config.showRegisterButton[appComponent.country] == undefined ||
                            appComponent.config.showRegisterButton[appComponent.country]
                        "
                        class="btn bg-success text-neutral hover:bg-green-600"
                        @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('popup_register'))"
                        target="_self"
                        :to="appComponent.config.menuMobile.urlRegistro"
                        >{{ $t('Regístrate') }}
                    </RouterLink>
                    <!-- Submit button for login -->
                    <button
                        @click="appComponent.gAnalytics('popup_login')"
                        type="submit"
                        aria-label="Login"
                        for="m-modal-login"
                        class="btn btn-primary text-neutral"
                        v-bind:class="{ 'btn-disable': disabledLogin }"
                    >
                        {{ $t('Acceder') }}
                    </button>
                </div>
            </Form>
            <!-- Information container for specific partner -->
            <div
                v-if="appComponent.partner == 16"
                class="info-container bg-gray-300 rounded-xl p-3 mt-3 flex justify-center items-center flex-col text-sm"
                style="box-shadow: inset 0px 0px 16px 0px #0000001c"
            >
                <p class="text-gray-600 text-center mb-2">
                    {{ $t('Hemos actualizado nuestra plataforma, puedes restablecer tu cuenta haciendo clic aquí:') }}
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
                </button>
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

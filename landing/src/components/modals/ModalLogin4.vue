<script lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { defineComponent } from 'vue';
import { useModalStore } from '../../stores/Modal';
import apiService from '../../services/ApiService.ts';
import FacebookLogin from '../logginSocialNetworks/Facebook.vue';
declare var optimoveSDK: any;
import router from '@/router';
import IconClose from '../icons/IconClose.vue';

export default defineComponent({
    components: {
        Form,
        FacebookLogin,
        Field,
        IconClose,
    },
    data() {
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        let emitter = this.$emitter();
        let modals = useModalStore();
        let clientId: any =
            (window as any).cconfig.facebookLoginClienId != undefined
                ? (window as any).cconfig.facebookLoginClienId
                : '';
        let refreshBalance = this.$refreshBalance;
        let count = 0;
        let disabledCount = false;
        let login = {
            email: '',
            password: '',
        };
        const schema = Yup.object().shape({
            email: Yup.string().required(this.$t('Se requiere correo electrónico')),
            password: Yup.string()
                .min(4, this.$t('La contraseña debe tener al menos 4 caracteres.'))
                .required(this.$t('Contraseña es requerida.')),
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
            modals,
            checkMultiLogin: false,
            lastFormValues: null,
            acceptModalHandler,
        };
    },
    unmounted() {
        if (this.acceptModalHandler) {
          this.emitter.off('accept:modal', this.acceptModalHandler);
        }
    },
    mounted() {
        this.acceptModalHandler = () => {
            if (this.pendingMultiLogin) {
                this.pendingMultiLogin = false;
                this.checkMultiLogin = true;
                this.onSubmit(this.lastFormValues);
                return;
            }
            this.closeLoginModal();
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
          this.$emit('close');
        },
        /**
         * Handles the form submission for login.
         * @param {Object} values - The form values.
         */
        onSubmit(values: any) {
            this.lastFormValues = values; 
            let data = {
                username: values.email,
                password: values.password,
                timeRequest: true,
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }
            this.appComponent.disabledLogin = true;
            if (!this.appComponent.contingency) {
                apiService
                    .request('login', data)
                    .then((response: any) => {
                        if (response.code == 0) {
                            this.appComponent.firstReqBalance = false;
                            this.appComponent.tokenSB = response.data.tokenSB;
                            this.appComponent.user_id = response.data.user_id;
                            this.appComponent.channel_id = response.data.channel_id;
                            this.appComponent.id_platform = response.data.id_platform;
                            this.appComponent.tokenUser = response.data.auth_token;
                            apiService.setAuthToken(response.data.auth_token);
                            window.localStorage.setItem('auth_token', response.data.auth_token);
                            this.appComponent.flagMenu = true;
                            this.appComponent.frm = 'lgn';
                            try {
                                (window as any).fLoadSuccess(this.appComponent.user_id, this.appComponent.frm);
                            } catch (e) {}
                            this.refreshBalance();
                            this.appComponent.loadJsAltenar();
                            if (this.appComponent.depositFromLanding != null) {
                                router.push('/gestion/deposito');
                            } else {
                                if (
                                    (this.config != undefined && this.config.general != undefined) ||
                                    (this.config != undefined && this.config.general_ != undefined)
                                ) {
                                    if (
                                        this.$route.path == '/registro' ||
                                        this.$route.path == '/registro/:Codigo' ||
                                        this.$route.path == '/registro/aff/:Codigo2' ||
                                        this.$route.path == '/registro/a/:Codigo3' ||
                                        this.$route.path == '/landing/registro' ||
                                        this.$route.path == '/landing/casino' ||
                                        this.$route.path == '/landing/registro-casino' ||
                                        this.$route.path == '/landing/deportivas' ||
                                        this.$route.path == '/landing/registro-deportivas' ||
                                        this.$route.path == '/landing/registro-corto' ||
                                        this.$route.path == '/landing/registro-corto/:Codigo' ||
                                        this.$route.path == '/landing/registro-corto/aff/:Codigo2' ||
                                        this.$route.path == '/landing/registro-corto/a/:Codigo3' ||
                                        this.$route.path == '/landing/registro-corto-loto' ||
                                        this.$route.path == '/casino/bono' ||
                                        this.$route.path == '/apuestas/bono'
                                    ) {
                                        router.push('/deportes');
                                    } else if (
                                        this.config != undefined &&
                                        this.config.general_ != undefined &&
                                        this.config.general_.isRedirectableLogin != undefined &&
                                        this.config.general_.isRedirectableLogin == true
                                    ) {
                                        router.push(
                                            this.config.general_ != undefined &&
                                                this.config.general_.urlRedirectableLogin != undefined
                                                ? this.config.general_.urlRedirectableLogin
                                                : '/deportes',
                                        );
                                    } else if (
                                        this.config != undefined &&
                                        this.config.general[this.appComponent.country] != undefined &&
                                        this.config.general[this.appComponent.country].isRedirectableLogin !=
                                            undefined &&
                                        this.config.general[this.appComponent.country].isRedirectableLogin == true
                                    ) {
                                        router.push(
                                            this.config.general != undefined &&
                                                this.config.general[this.appComponent.country] != undefined &&
                                                this.config.general[this.appComponent.country].urlRedirectableLogin !=
                                                    undefined
                                                ? this.config.general[this.appComponent.country].urlRedirectableLogin
                                                : '/deportes',
                                        );
                                    }
                                } else {
                                    if (response.data.redirectUrl == '/betshop/') {
                                        window.location.href = response.data.redirectUrl;
                                    } else if (response.data.redirectUrl != undefined) {
                                        router.push(response.data.redirectUrl);
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
                                        this.appComponent.session.usuario,
                                    );
                                }
                            } catch (e) {}
                            setTimeout(() => {
                                this.emitter.emit('ready:login');
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
                            this.appComponent.disabledLogin = true;
                            let timeLogin: any = localStorage.getItem('timeLogin');
                            let valorNumber = parseInt(timeLogin);
                            let sumMinutes = new Date();
                            sumMinutes.setTime(valorNumber + this.config.restrictionTime * 1000);
                            let interval = setInterval(() => {
                                this.count = sumMinutes.getTime() - new Date().getTime();
                                this.disabledCount = true;
                                if (sumMinutes.getTime() <= new Date().getTime()) {
                                    this.appComponent.disabledLogin = false;
                                    this.disabledCount = false;
                                    clearInterval(interval);
                                }
                            }, 1000);
                        } else {
                            var error_mensaje = '';
                            if (response.error_code != undefined) {
                                error_mensaje = this.$t('ERROR' + response.error_code.toString());
                            }
                            if (error_mensaje == '') {
                                error_mensaje = this.$t(
                                    'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                                );
                            }
                            this.appComponent.modal = {
                                showModal: 'notification',
                                titleModal: this.$t('Error!'),
                                messageModal: error_mensaje,
                                buttonModal: this.$t('Aceptar'),
                                orderModal: 'closeModal',
                            };
                            this.appComponent.disabledLogin = false;
                        }
                    })
                    .catch((e) => {
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje!'),
                            messageModal: this.$t('La solicitud no pudo ser procesada, intente nuevamente por favor.'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.disabledCount = false;
                        this.appComponent.disabledLogin = false;
                    });
            } else {
                setTimeout(() => {
                    this.appComponent.showModalLogin = false;
                }, 1000);
            }
        },
        /**
         * Toggles the visibility of the password field.
         */
        showpass() {
            var pwd: any = document.getElementById('loginPassword');
            if (pwd.type === 'password') {
                pwd.type = 'text';
            } else {
                pwd.type = 'password';
            }
        },
        /**
         * Handles Google sign-in.
         * @param {Object} userGoogle - The Google user object.
         */
        signInWithGoogle(userGoogle) {
            const params = {
                id_token: userGoogle.credential,
                country: this.appComponent.country,
                type: 1,
            };
            this.appComponent.disabledLogin = true;
            if (!this.appComponent.contingency) {
                apiService.request('external_auth', params).then((response: any) => {
                    if (response.code == 0) {
                        this.appComponent.firstReqBalance = false;
                        this.appComponent.tokenSB = response.data.tokenSB;
                        this.appComponent.user_id = response.data.user_id;
                        this.appComponent.channel_id = response.data.channel_id;
                        this.appComponent.id_platform = response.data.id_platform;
                        this.appComponent.tokenUser = response.data.auth_token;
                        apiService.setAuthToken(response.data.auth_token);
                        window.localStorage.setItem('auth_token', response.data.auth_token);
                        this.appComponent.flagMenu = true;
                        this.appComponent.frm = 'lgn';
                        this.refreshBalance();
                    } else {
                        var error_mensaje = '';
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString());
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            );
                        }
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.appComponent.disabledLogin = false;
                    }
                });
            } else {
                setTimeout(() => {
                    this.appComponent.showModalLogin = false;
                }, 1000);
            }
        },
        /**
         * Handles Facebook sign-in.
         * @param {Object} userFacebook - The Facebook user object.
         */
        signInWithFacebook(userFacebook) {
            const params = {
                id_token: userFacebook.authResponse.accessToken,
                country: this.appComponent.country,
                type: 2,
            };
            this.appComponent.disabledLogin = true;
            if (!this.appComponent.contingency) {
                apiService.request('external_auth', params).then((response: any) => {
                    if (response.code == 0) {
                        this.appComponent.firstReqBalance = false;
                        this.appComponent.tokenSB = response.data.tokenSB;
                        this.appComponent.user_id = response.data.user_id;
                        this.appComponent.channel_id = response.data.channel_id;
                        this.appComponent.id_platform = response.data.id_platform;
                        this.appComponent.tokenUser = response.data.auth_token;
                        apiService.setAuthToken(response.data.auth_token);
                        window.localStorage.setItem('auth_token', response.data.auth_token);
                        this.appComponent.flagMenu = true;
                        this.appComponent.frm = 'lgn';
                        this.refreshBalance();
                    } else {
                        var error_mensaje = '';
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString());
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            );
                        }
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.appComponent.disabledLogin = false;
                    }
                });
            } else {
                setTimeout(() => {
                    this.appComponent.showModalLogin = false;
                }, 1000);
            }
        },
        /**
         * Handles Facebook sign-in failure.
         */
        signInWithFacebookFailed() {
            var error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
            this.appComponent.modal = {
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
    <!-- Modal container with background and opacity settings -->
    <div class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75">
        <!-- Modal box with padding, rounded corners, gradient background, and border -->
        <div
            class="modal-box py-14 rounded-2xl bg-gradient-to-b from-primary-focus to-secondary/50 bg-primary-focus overflow-visible max-w-[38rem] border-solid border-1 border-primary"
        >
            <!-- Container for the close button and logo -->
            <div class="flex flex-col justify-center items-center w-full mb-8">
                <!-- Close button for the modal -->
                <label
                    for="m-modal-login"
                    class="absolute right-2 top-2 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral w-11 h-11 hover:scale-105"
                    @click="$emit('close')"
                >
                    <IconClose />
                </label>
                <!-- Logo image -->
                <img
                    :src="config.logo"
                    alt=""
                    class="w-[50%]"
                />
            </div>
            <!-- Form for login with validation schema and error handling -->
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
            >
                <!-- Email input field with validation -->
                <div class="form-control mb-2 mx-10">
                    <Field
                        id="loginUsername"
                        name="email"
                        :class="{ 'is-invalid': errors.email }"
                        :placeholder="$t('Correo electrónico')"
                        required="true"
                        autocomplete="usuario"
                        v-model="login.email"
                        class="input input-bordered h-16 bg-secondary font-poppinssl text-xl text-neutral placeholder:text-primary border-1 border-solid border-primary pl-6"
                        type="text"
                    />
                    <!-- Error message for email field -->
                    <div
                        v-if="errors.email != undefined"
                        class="invalid-feedback alert alert-warning p-1 bg-primary-content text-neutral shadow-lg rounded-full flex justify-center mb-3 flex-row gap-0"
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
                <!-- Password input field with validation and toggle visibility button -->
                <div class="mt-6 form-control relative mx-10">
                    <Field
                        class="input input-bordered h-16 bg-secondary font-poppinssl text-xl text-neutral placeholder:text-primary border-1 border-solid border-primary pl-6"
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
                        class="absolute top-[23px] right-6"
                        id="showpass"
                        @click="showpass()"
                    >
                        <font-awesome-icon
                            class="text-xl text-primary"
                            icon="fa-solid fa-eye"
                        />
                    </button>
                    <!-- Error message for password field -->
                    <div
                        v-if="errors.password != undefined"
                        class="invalid-feedback alert alert-warning p-1 bg-primary-content text-neutral shadow-lg rounded-full flex justify-center mb-3 gap-0"
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
                <!-- Container for submit button and countdown timer -->
                <div class="grid mt-8 mx-10">
                    <!-- Countdown timer for retrying login -->
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
                    <!-- Submit button for login -->
                    <button
                        v-show="!appComponent.disabledLogin"
                        type="submit"
                        @click="appComponent.gAnalytics('popup_login')"
                        aria-label="Login"
                        for="m-modal-login"
                        :disabled="appComponent.disabledLogin"
                        class="btn text-neutral-content font-poppinssb text-xl capitalize rounded-xl bg-success w-full h-16 mx-auto hover:scale-105 border-none"
                    >
                        {{ $t('Iniciar sesión') }}
                    </button>
                    <!-- Disabled submit button with loading spinner -->
                    <button
                        v-show="appComponent.disabledLogin"
                        disabled
                        class="btn text-neutral-content font-poppinssb text-xl capitalize rounded-xl bg-success w-full h-16 mx-auto hover:scale-105 border-none"
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
                    </button>
                    <!-- Links for password recovery and registration -->
                    <div class="flex justify-between my-6">
                        <!-- Link to password recovery page -->
                        <RouterLink
                            to="/recuperar-clave"
                            @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('forgot_password'))"
                            class="text-primary text-md underline hover:text-neutral transition-all ease-in-out font-poppinssl brightness-125"
                        >
                            {{ $t('¿Olvidaste su contraseña?') }}
                        </RouterLink>
                        <!-- Link to registration page -->
                        <RouterLink
                            v-if="
                                appComponent.config.showRegisterButton == undefined ||
                                appComponent.config.showRegisterButton[appComponent.country] == undefined ||
                                appComponent.config.showRegisterButton[appComponent.country]
                            "
                            to="/registro"
                            @click="((appComponent.showModalLogin = false), appComponent.gAnalytics('popup_register'))"
                            class="text-primary text-md underline hover:text-neutral transition-all ease-in-out font-poppinssl brightness-125"
                        >
                            {{ $t('Regístrate') }}
                        </RouterLink>
                    </div>
                </div>
            </Form>
            <!-- Information container for account reset -->
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
<style scoped>
/* Ensure the modal is visible and interactive */
.modal {
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: all !important;
}
</style>

<!-- FILE DOCUMENTED -->

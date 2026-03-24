<script lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { defineComponent } from 'vue';
import apiService from '../../services/ApiService.ts';
import FacebookLogin from '../logginSocialNetworks/Facebook.vue';
declare var optimoveSDK: any;
import router from '../../router';
import { useModalStore } from '../../stores/Modal.ts';

export default defineComponent({
    components: {
        Form,
        FacebookLogin,
        Field,
    },
    data() {
        let config = this.$config();
        let appComponent: any = this.$appComponent;
        let emitter = this.$emitter();
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
        const modals = useModalStore();
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
            };
            if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                data.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

            apiService.request('login', data).then((response: any) => {
                if (response.code == 0) {
                    apiService.setAuthToken(response.data.auth_token);
                    this.$emit('close');
                    window.localStorage.setItem('auth_token', response.data.auth_token);
                    try {
                        (window as any).fLoadSuccess(this.appComponent.user_id, this.appComponent.frm);
                    } catch (e) {}
                    if (response.data.redirectUrl == '/betshop/') {
                        window.location.href = response.data.redirectUrl;
                    } else if (response.data.redirectUrl != undefined) {
                        router.push(response.data.redirectUrl);
                    } else {
                        router.push('/deportes');
                    }
                    try {
                        if ((window as any).optimoveSDK != undefined && (window as any).optimoveSDK.API != undefined) {
                            (window as any).optimoveSDK.API.reportEvent(
                                'login',
                                {},
                                null,
                                this.appComponent.session.usuario,
                            );
                        }
                    } catch (e) {
                        console.log(e);
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
                    this.modals.addModal({
                        showModal: 'ModalNotification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    });
                }
            });
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
            console.log('Handle the response', userGoogle);
            const params = {
                id_token: userGoogle.credential,
                country: this.appComponent.country,
                type: 1,
            };
            this.disabledLogin = true;
            apiService.request('external_auth', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.firstReqBalance = false;
                    this.appComponent.tokenSB = response.data.tokenSB;
                    this.appComponent.user_id = response.data.user_id;
                    this.appComponent.channel_id = response.data.channel_id;
                    this.appComponent.id_platform = response.data.id_platform;
                    this.appComponent.tokenUser = response.data.auth_token;
                    apiService.setAuthToken(response.data.auth_token);
                    this.appComponent.showModalLogin = false;
                    window.localStorage.setItem('auth_token', response.data.auth_token);
                    this.appComponent.flagMenu = true;
                    this.appComponent.frm = 'lgn';
                    this.appComponent.loadView = false;
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
                }
            });
        },
        /**
         * Handles Facebook sign-in.
         * @param {Object} userFacebook - The Facebook user object.
         */
        signInWithFacebook(userFacebook) {
            console.log('Handle the response', userFacebook);
            const params = {
                id_token: userFacebook.authResponse.accessToken,
                country: this.appComponent.country,
                type: 2,
            };
            this.disabledLogin = true;
            apiService.request('external_auth', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.firstReqBalance = false;
                    this.appComponent.tokenSB = response.data.tokenSB;
                    this.appComponent.user_id = response.data.user_id;
                    this.appComponent.channel_id = response.data.channel_id;
                    this.appComponent.id_platform = response.data.id_platform;
                    this.appComponent.tokenUser = response.data.auth_token;
                    apiService.setAuthToken(response.data.auth_token);
                    this.appComponent.showModalLogin = false;
                    window.localStorage.setItem('auth_token', response.data.auth_token);
                    this.appComponent.flagMenu = true;
                    this.appComponent.frm = 'lgn';
                    this.appComponent.loadView = false;
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
                    this.modals.addModal({
                        showModal: 'ModalNotification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    });
                }
            });
        },
        /**
         * Handles Facebook sign-in failure.
         */
        signInWithFacebookFailed() {
            var error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde');
            this.modals.addModal({
                showModal: 'ModalNotification',
                titleModal: this.$t('Error!'),
                messageModal: error_mensaje,
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
            });
        },
    },
});
</script>
<template>
    <!-- Teleport the modal to the body element -->
    <Teleport to="body">
        <!-- Dialog element for the modal with full screen dimensions and background -->
        <dialog class="modal w-screen h-screen bg-black/80 flex justify-center items-center">
            <!-- Image for mobile view, hidden on tablets -->
            <img
                v-if="appComponent.themeSportbook"
                :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundMobile != undefined ? appComponent.config.modalLoginAssets.backgroundMobile : 'https://images.virtualsoft.tech/m/msj0212T1712238363.png'"
                alt=""
                class="in tablet:hidden absolute top-0 bottom-0 right-0 left-0 object-center object-contain h-full w-11/12 max-w-[330px] tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] max-h-[545px] tablet:max-h-none tablet:h-auto m-auto"
            />
            <img
                v-else
                :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundMobileDark != undefined ? appComponent.config.modalLoginAssets.backgroundMobileDark : 'https://images.virtualsoft.tech/m/msj0212T1712238363.png'"
                alt=""
                class="in tablet:hidden absolute top-0 bottom-0 right-0 left-0 object-center object-contain h-full w-11/12 max-w-[330px] tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] max-h-[545px] tablet:max-h-none tablet:h-auto m-auto"
            />
            <!-- Image for tablet view, hidden on mobile -->
            <img
                v-if="appComponent.themeSportbook"
                :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundDesktop != undefined ? appComponent.config.modalLoginAssets.backgroundDesktop : 'https://images.virtualsoft.tech/m/msj0212T1712601712.png'"
                alt=""
                class="in hidden tablet:flex absolute top-0 bottom-0 right-0 left-0 object-center object-contain h-full w-11/12 max-w-[320px] tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] max-h-[525px] tablet:max-h-none tablet:h-auto m-auto"
            />
            <img
                v-else
                :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundDesktopDark != undefined ? appComponent.config.modalLoginAssets.backgroundDesktopDark : 'https://images.virtualsoft.tech/m/msj0212T1712601712.png'"
                alt=""
                class="in hidden tablet:flex absolute top-0 bottom-0 right-0 left-0 object-center object-contain h-full w-11/12 max-w-[320px] tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] max-h-[525px] tablet:max-h-none tablet:h-auto m-auto"
            />
            <!-- Section containing the modal content -->
            <section
                class="relative aspect-auto h-screen tablet:h-auto w-screen tablet:w-[800px] max-w-none tablet:max-w-none tablet:max-h-[745px] tablet:max-h-none p-2 pb-20 flex flex-col tablet:flex-row z-50 justify-end tablet:justify-center tablet:items-center items-start tablet:gap-4"
            >
              <div class="w-full flex justify-center mt-12 mb-0 tablet:mt-0 tablet:mb-0 tablet:hidden z-40">
                <img
                    src="https://images.virtualsoft.tech/ms/msj0212T1765308884.png"
                    class="w-[250px] h-auto object-contain"
                    alt=""
                />
              </div>

              <div class="w-full flex justify-center mt-4 mb-2 tablet:mt-0 tablet:mb-0 tablet:hidden z-40">
                <img
                    src="https://images.virtualsoft.tech/ms/msj0212T1765308824.png"
                    class="w-auto h-auto object-contain"
                    alt=""
                />
              </div>
              <!-- Close button for the modal -->
                <button
                    @click="
                        $emit('close');
                        login = {
                            email: '',
                            password: '',
                        };
                    "
                    class="absolute top-12 right-8 tablet:top-10 tablet:right-24 scale-110 hover:scale-125"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4214 0.395347C2.15578 0.138801 1.80002 -0.00315563 1.43075 5.32402e-05C1.06148 0.00326211 0.70824 0.151379 0.447116 0.412503C0.185992 0.673627 0.0378748 1.02687 0.034666 1.39614C0.0314571 1.76541 0.173413 2.12117 0.42996 2.38679L7.88448 9.84131L0.42996 17.2958C0.295446 17.4258 0.188153 17.5812 0.114341 17.753C0.0405299 17.9248 0.00167818 18.1096 5.31756e-05 18.2966C-0.00157183 18.4836 0.0340624 18.6691 0.104877 18.8422C0.175691 19.0153 0.280267 19.1725 0.412503 19.3047C0.544739 19.437 0.701987 19.5415 0.875071 19.6124C1.04816 19.6832 1.23361 19.7188 1.42061 19.7172C1.60762 19.7156 1.79242 19.6767 1.96425 19.6029C2.13608 19.5291 2.29148 19.4218 2.4214 19.2873L9.87593 11.8328L17.3305 19.2873C17.5961 19.5438 17.9518 19.6858 18.3211 19.6826C18.6904 19.6794 19.0436 19.5312 19.3047 19.2701C19.5659 19.009 19.714 18.6558 19.7172 18.2865C19.7204 17.9172 19.5784 17.5615 19.3219 17.2958L11.8674 9.84131L19.3219 2.38679C19.5784 2.12117 19.7204 1.76541 19.7172 1.39614C19.714 1.02687 19.5659 0.673627 19.3047 0.412503C19.0436 0.151379 18.6904 0.00326211 18.3211 5.32402e-05C17.9518 -0.00315563 17.5961 0.138801 17.3305 0.395347L9.87593 7.84987L2.4214 0.395347Z" fill="white"/>
                  </svg>
                </button>
                <!-- Image for tablet view, hidden on mobile -->
                <img
                    :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.leftImage != undefined ? appComponent.config.modalLoginAssets.leftImage : 'https://images.virtualsoft.tech/m/msj23212T1712608160.png'"
                    alt=""
                    class="w-[40%] h-[450px] object-contain hidden tablet:flex -ml-4"
                />
                <!-- Container for the login form -->
                <div class="flex flex-col justify-center items-center tablet:items-start w-full tablet:max-w-[215px] mb-5">
                    <!-- Title for the login form -->
                    <h2 class="text-2xl w-full font-bold text-center text-neutral">
                  {{ $t('Iniciar sesión') }}
                    </h2>
                    <!-- Login form with validation schema and error handling -->
                    <Form
                        @submit="onSubmit"
                        :validation-schema="schema"
                        v-slot="{ errors }"
                        class="w-full"
                    >
                        <!-- Email input field with validation -->
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text text-base text-neutral">{{ $t('Correo') }}</span>
                            </label>
                            <div
                                class="input input-bordered flex items-center gap-1 pr-0 border-input-border placeholder-input-placeholder w-full h-[40px]"
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
                                    :class="{ 'is-invalid': errors.email }"
                                    :placeholder="$t('Ingrese correo')"
                                    required="true"
                                    autocomplete="usuario"
                                    v-model="login.email"
                                    class="w-full bg-transparent placeholder:text-sm border-none h-full text-sm ml-2"
                                    type="text"
                                />
                            </div>
                            <!-- Error message for email field -->
                            <label
                                class="label"
                                v-if="errors.email != undefined"
                            >
                                <span
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
                                </span>
                            </label>
                        </div>
                        <!-- Password input field with validation and toggle visibility button -->
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text text-base text-neutral">{{ $t('Contraseña') }}</span>
                            </label>
                            <div
                                class="relative input input-bordered text-white flex items-center gap-1 pr-0 border-input-border placeholder-input-placeholder w-full h-[40px]"
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
                                    class="w-full bg-transparent border-none placeholder:text-sm h-full ml-2 text-sm pl-1 pr-10"
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
                                    class="absolute top-[10px] right-3"
                                    id="showpass"
                                    @click="showpass()"
                                >
                                    <font-awesome-icon
                                        class="text-xl text-gray-400"
                                        icon="fa-solid fa-eye"
                                    />
                                </button>
                            </div>
                            <!-- Error message for password field -->
                            <label
                                class="label"
                                v-if="errors.password != undefined"
                            >
                                <span
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
                                </span>
                            </label>
                        </div>
                        <!-- Countdown timer for retrying login -->
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
                            </vue-countdown>
                            {{ $t(' segundos.') }}
                        </div>
                        <!-- Submit button for login -->
                        <button
                            v-show="!appComponent.disabledLogin"
                            type="submit"
                            @click="appComponent.gAnalytics('popup_login')"
                            :disabled="appComponent.disabledLogin"
                            class="btn btn-block btn-primary mt-6 mb-2 !h-[40px] !min-h-[30px] hover:bg-primar/75 text-sm my-2 capitalize text-neutral"
                        >
                            {{ $t('Inicia Sesión') }}
                        </button>
                        <!-- Disabled submit button with loading spinner -->
                        <button
                            v-show="appComponent.disabledLogin"
                            disabled
                            class="btn btn-block btn-success !h-[40px] !min-h-[30px] hover:bg-success/75 text-neutral text-sm my-4 capitalize"
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
                    </Form>
                    <!-- Links for password recovery and registration -->
                    <div class="w-full flex flex-col justify-center items-center gap-4 z-50">
                        <!-- Link to password recovery page -->
                        <RouterLink
                            to="/recuperar-clave"
                            @click="
                                appComponent.showModalLogin = false;
                                appComponent.gAnalytics('forgot_password');
                            "
                            class="mx-auto text-neutral font-light underline text-sm hover:text-neutral/75 hover:scale-105"
                            >{{ $t('¿Olvidaste tu contraseña?') }}
                        </RouterLink>
                        <!-- Link to registration page -->
                        <span class="flex flex-col justify-center items-center gap-1 cursor-default text-neutral text-sm text-center"
                            >{{ $t('¿No tienes una cuenta?')
                            }}<a
                                href="/registro"
                                class="text-neutral font-light hover:text-primary/75 hover:scale-105 cursor-pointer underline"
                                >{{ $t('Registrate') }}</a
                            ></span
                        >
                    </div>
                </div>
            </section>
        </dialog>
    </Teleport>
</template>
<style scoped>
/* Ensure the modal is visible and interactive */
.modal {
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: all !important;
}

/* Remove padding from the modal box */
.modal-box {
    padding: 0px !important;
}

/* Add shadow effect to the login modal */
.shadowlogin {
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.342);
}
</style>

<!-- FILE DOCUMENTED -->

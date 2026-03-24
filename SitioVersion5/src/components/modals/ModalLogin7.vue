<script lang="ts">
import { Form, Field } from 'vee-validate'; // Import Form and Field components from vee-validate for form handling
import * as Yup from 'yup'; // Import Yup for schema validation
import { defineComponent, ref } from 'vue'; // Import Vue's defineComponent and ref for component definition and reactivity
import apiService from '@/services/ApiService'; // Import the API service for making requests
import FacebookLogin from '../FacebookLogin.vue'; // Import FacebookLogin component
import { useModalStore } from '@/stores/modal'; // Import modal store for managing modal state
import { useGoogleSignIn } from '@/composables/useGoogleSignIn'; // Import Google sign-in composable
import { useFacebookAuth } from '@/composables/useFacebookAuth'; // Import Facebook authentication composable
import { usePasswordToggle } from '@/composables/useTogglePasswordVisibility'; // Import password visibility toggle composable
import ExitIconModalEcuabet from '@/components/icons/ExitIconModalEcuabet.vue'; // Import exit icon component
import router from '@/router'; // Import router for navigation
import EyesCloseIcon from '../icons/EyesCloseIcon.vue';
import EyeIcon from '../icons/EyesIcon.vue';
export default defineComponent({
    components: {
            ExitIconModalEcuabet, // Register exit icon component
            Form, // Register Form component
            FacebookLogin, // Register FacebookLogin component
            Field, // Register Field component
            EyeIcon, // Register EyeIcon component
            EyesCloseIcon, // Register EyeIcon component
        },
    data() {
        let config = this.$config(); // Retrieve configuration
        let appComponent: any = this.$appComponent; // Reference to app component
        let emitter = this.$emitter(); // Event emitter for communication
        let clientId: any =
            (window as any).cconfig.facebookLoginClienId != undefined
                ? (window as any).cconfig.facebookLoginClienId // Get Facebook client ID from global config
                : '';
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let count = 0; // Counter for disabled login timer
        let disabledCount = false; // Flag to indicate if login is disabled
        let viewToken = false; // Flag to toggle token visibility
        let buttonTokenDisabled = false; // Flag to toggle token visibility
        let login = { // Object to hold login credentials
            email: '',
            password: '',
            token2AF: '',
        };
        let tokenError = ''; // Variable to hold token error messages
        const schema = Yup.object().shape({ // Validation schema for form
            email: Yup.string().required(this.$t('Se requiere correo electrónico')), // Email is required
            password: Yup.string()
                .min(4, this.$t('La contraseña debe tener al menos 4 caracteres.')) // Password must be at least 4 characters
                .required(this.$t('Contraseña es requerida.')), // Password is required
        });
        const modalStore = useModalStore(); // Use modal store for managing modal state
        let acceptModalHandler: (() => void) | null = null;


        return {
                config,
                clientId,
                appComponent,
                emitter,
                modalStore,
                acceptModalHandler,
                refreshBalance,
                login,
                schema,
                count,
                disabledCount,
                viewToken,
                tokenError,
                buttonTokenDisabled,
                checkMultiLogin: false,
                lastFormValues: null,
            };
    },
    unmounted() {
        if (this.acceptModalHandler) {
          this.emitter.off('accept:modal', this.acceptModalHandler); // Clean up event listener on component unmount
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
        window.addEventListener('keydown', this.handleEnterKey);
    },
    setup() {
        const { signInWithGoogle, disabledLogin: googleDisabledLogin, modal: googleModal } = useGoogleSignIn(this); // Google sign-in logic
        const {
            signInWithFacebook,
            disabledLogin: facebookDisabledLogin,
            modal: facebookModal,
        } = useFacebookAuth(this); // Facebook sign-in logic
        const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle(); // Password visibility toggle logic
        return {
            googleDisabledLogin,
            googleModal,
            facebookDisabledLogin,
            facebookModal,
            isPasswordVisible,
            togglePasswordVisibility,
            signInWithGoogle,
            signInWithFacebook,
        };
    },
    methods: {
        closeLoginModal() {
            const app = this.appComponent;
            if (!app) return;

            app.showModalLogin = false;
            app.disabledLogin = false;
            app.closeModal();
        },
        onSubmit(values: any) { // Method to handle form submission
            this.lastFormValues = values;
              let dataSend = { // Data to be sent to the API
                  username: values.email,
                  password: values.password,
                  token2AF: values.token2AF == '' ? null : values.token2AF,
                  timeRequest: true,
              };
              if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                dataSend.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
              }

              this.appComponent.disabledLogin = true; // Disable login button
              if (values.token2AF !== undefined){
                  this.buttonTokenDisabled = true;
              }
              if (!this.appComponent.contingency) { // Check if contingency is not active
                  apiService
                      .request('login', dataSend) // Make login request
                      .then((response: any) => { // Handle response
                          if (response.code == 0) { // Successful login

                              if(response.reqTokenGoogle && dataSend.token2AF == null) {
                                  this.viewToken = true; // Enabling token view if required
                                  return
                              }else {
                                  this.appComponent.firstReqBalance = false; // Update balance request status
                                  this.appComponent.tokenSB = response.data.tokenSB; // Store token
                                  this.appComponent.user_id = response.data.user_id; // Store user ID
                                  this.appComponent.channel_id = response.data.channel_id; // Store channel ID
                                  this.appComponent.id_platform = response.data.id_platform; // Store platform ID
                                  this.appComponent.tokenUser = response.data.auth_token; // Store user token
                                  apiService.setAuthToken(response.data.auth_token); // Set auth token in API service
                                  window.localStorage.setItem('auth_token', response.data.auth_token); // Store auth token in local storage
                                  this.appComponent.flagMenu = true; // Enable menu flag
                                  this.appComponent.frm = 'lgn'; // Set form type to login
                                  try {
                                      (window as any).fLoadSuccess(this.appComponent.user_id, this.appComponent.frm); // Call external success function
                                  } catch (e) {}
                                  this.refreshBalance(); // Refresh balance
                                  this.appComponent.loadJsAltenar(); // Load additional scripts
                              }
                              if (this.appComponent.depositFromLanding != null) { // Check if redirecting from landing page
                                  router.push('/gestion/deposito'); // Redirect to deposit page
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
                                          router.push('/deportes'); // Redirect to sports page
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
                                          ); // Redirect to configurable login URL
                                      } else if (
                                          this.config != undefined &&
                                          this.config.general != undefined &&
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
                                          ); // Redirect to country-specific login URL
                                      }
                                  } else {
                                      if (response.data.redirectUrl == '/betshop/') {
                                          window.location.href = response.data.redirectUrl; // Redirect to betshop
                                      } else if (response.data.redirectUrl != undefined) {
                                          router.push(response.data.redirectUrl); // Redirect to specified URL
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
                                          this.appComponent.session.usuario, // Report login event
                                      );
                                  }
                              } catch (e) {}
                              setTimeout(() => {
                                  this.emitter.emit('ready:login'); // Emit event indicating login is ready
                              }, 2000);
                          } else if (response.code == 1811) { // Handle login restriction
                              this.appComponent.disabledLogin = true; // Disable login
                              let timeLogin: any = localStorage.getItem('timeLogin'); // Get login time from local storage
                              let valorNumber = parseInt(timeLogin); // Parse login time
                              let sumMinutes = new Date(); // Create date object for countdown
                              sumMinutes.setTime(valorNumber + this.config.restrictionTime * 1000); // Set countdown end time
                              let interval = setInterval(() => { // Start countdown interval
                                  this.count = sumMinutes.getTime() - new Date().getTime(); // Update countdown
                                  this.disabledCount = true; // Set disabled count flag
                                  if (sumMinutes.getTime() <= new Date().getTime()) { // Check if countdown is complete
                                      this.appComponent.disabledLogin = false; // Enable login
                                      this.disabledCount = false; // Reset disabled count flag
                                      clearInterval(interval); // Clear interval
                                  }
                              }, 1000);
                          } else if (response.error_code == 300017) { // Handle password reset request
                              delete dataSend.password; // Remove password from data
                              let dataSend2 = { // Data for password reset
                                  forActivate: true,
                                  email: dataSend.username,
                              };
                              this.closeLoginModal(); // Hiding login modal
                              this.modalStore.action = () => { // Define action for modal store
                                  this.modalStore.loading = true; // Set loading state
                                  apiService.request('reset_user_password', dataSend2).then((response: any) => { // Request password reset
                                      if (response.code == 0) { // Successful password reset
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
                              this.appComponent.disabledLogin = false; // Enable login
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
                              this.appComponent.disabledLogin = false; // Enable login
                          }
                      })
                      .catch((e) => { // Handle request error
                          console.log(e); // Log error
                          this.appComponent.modal = { // Show error modal
                              showModal: 'notification',
                              titleModal: this.$t('Mensaje!'),
                              messageModal: this.$t('La solicitud no pudo ser procesada, intente nuevamente por favor.'),
                              buttonModal: this.$t('Aceptar'),
                              orderModal: 'closeModal',
                          };
                          this.disabledCount = false; // Reset disabled count flag
                          this.appComponent.disabledLogin = false; // Enable login
                      });
              } else {
                  setTimeout(() => {
                      this.closeLoginModal(); // Hiding login modal after timeout
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
    },
});
</script>
<template>
    <div class="modal w-screen h-screen text-neutral-content items-center bg-neutral-content bg-opacity-75"> <!-- Modal container with full screen and background opacity -->
        <div v-if="!viewToken" class="modal-box rounded-3xl rounded-[3rem] overflow-visible bg-base-300 w-full"> <!-- Modal box with rounded corners and secondary background -->
            <div class="flex justify-center items-center relative h-16 w-full border-primary border-solid border-b"> <!-- Header section with centered content -->
                <!-- Close modal on click -->
                <label
                    for="m-modal-login"
                    class="absolute right-1 -top-3 cursor-pointer flex justify-center items-center text-3xl font-bold text-neutral w-20 h-20 hover:scale-105"
                    @click="closeLoginModal"
                >
                    <ExitIconModalEcuabet class="w-52 h-52 fill-primary-content" /> <!-- Exit icon -->
                </label>
                <!-- Logo image -->
                <img
                    :src="
                        appComponent.config != undefined && appComponent.config.logo != undefined
                            ? appComponent.config.logo
                            : 'https://images.virtualsoft.tech/m/msj8212T1732770157.png'
                    "
                />
            </div>
            <!-- Background image for modal content -->
            <div
                class="bg-base-300 rounded-l-[3rem] rounded-b-[3rem] pt-10"
            >
                <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors }"
                >
                    <div class="form-control mb-5 mx-5"> <!-- Email input container -->
                        <label class="label pl-2"> <!-- Email label -->
                            <span class="label-text text-base text-xl text-neutral">{{
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
                            </svg> <!-- Placeholder for SVG icon -->
                            {{ errors.email }} <!-- Display email error message -->
                        </div>
                    </div>
                    <div class="form-control relative mx-5"> <!-- Password input container -->
                        <label class="label pl-2"> <!-- Password label -->
                            <span class="label-text text-xl text-neutral">{{ $t('Contraseña') }}</span> <!-- Password label -->
                        </label>
                        <div
                            class="input input-bordered shadowlogin rounded-2xl h-12 bg-input-backgraund border-2 pl-0 border-solid border-input-border flex justify-between items-center text-neutral"
                        >
                            <Field
                                class="bg-transparent border-transparent w-11/12 rounded-l-2xl"
                                :type="isPasswordVisible ? 'text' : 'password'"
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
                                class="w-20 pl-10 h-full"
                                @click="togglePasswordVisibility"
                            >
                                <!-- Eye icon for visibility toggle -->
                                <EyeIcon
                                    v-if="!isPasswordVisible"
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
                            </svg> <!-- Placeholder for SVG icon -->
                            {{ errors.password }} <!-- Display password error message -->
                        </div>
                    </div>
                    <div class="grid py-5 mx-10 justify-center"> <!-- Container for additional controls -->
                        <!-- Countdown display for disabled login -->
                        <div
                            v-if="disabledCount"
                            class="cursor-pointer text-base-300 text-lg hover:underline mx-auto hover:scale-105 pb-2"
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
                            {{ $t(' segundos.') }} <!-- Countdown seconds label -->
                        </div>
                        <!-- Link to password recovery -->
                        <RouterLink
                            to="/recuperar-clave"
                            @click="closeLoginModal(); appComponent.gAnalytics('forgot_password')"
                        >
                            <label class="label">
                                <a class="label-text-alt"></a>
                                <label
                                    for="m-modal-login"
                                    class="cursor-pointer text-neutral text-base hover:underline mx-auto hover:scale-105 underline"
                                    >{{ $t('¿Olvidaste la contraseña?') }}</label
                                >
                            </label>
                        </RouterLink>
                        <!-- Container for buttons -->
                        <div class="flex justify-center items-center gap-3 w-full h-12 mt-2">
                            <!-- Link to registration page -->
                            <RouterLink
                                to="/registro"
                                @click="
                                    closeLoginModal(); appComponent.gAnalytics('popup_register')"
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
                            <!-- Show login button if not disabled -->
                            <button
                                v-show="!appComponent.disabledLogin"
                                type="submit"
                                @click="appComponent.gAnalytics('popup_login')"
                                aria-label="Login"
                                for="m-modal-login"
                                :disabled="appComponent.disabledLogin"
                                class="text-neutral text-lg bg-success w-32 h-10 mx-auto hover:scale-105 rounded-lg"
                            >
                                {{ $t('Acceder') }} <!-- Login button text -->
                            </button>
                        </div>
                        <!-- Show disabled login button if login is disabled -->
                        <button
                            v-show="appComponent.disabledLogin"
                            disabled
                            class="btn text-neutral text-base bg-secondary w-56 h-12 mx-auto hover:scale-105"
                        >
                            <svg
                                aria-hidden="true"
                                role="status"
                                class="inline w-4 h-4 mr-3 text-neutral animate-spin"
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
                            </svg> <!-- Placeholder for SVG icon -->
                            {{ $t('Iniciar sesión') }} <!-- Disabled login button text -->
                        </button>
                        <!-- Callback for Google login -->
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
                @click="closeLoginModal"
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
    pointer-events: all !important; /* Allow pointer events */
}
.modal-box {
    padding: 0px !important; /* Remove padding from modal box */
}
.shadowlogin {
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.342); /* Add shadow effect to login inputs */
}
</style>

<!-- FILE DOCUMENTED -->

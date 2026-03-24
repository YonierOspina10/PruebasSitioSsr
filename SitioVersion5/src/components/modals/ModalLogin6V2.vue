<template>
  <Teleport to="body">
    <!-- Modal dialog for login -->
    <dialog
        class="modal fixed inset-0 w-screen h-screen bg-black/80 flex justify-center items-center overflow-hidden"
    >
      <!-- Image for mobile view -->
      <img
          v-if="appComponent.themeSportbook"
          :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundMobile != undefined ? appComponent.config.modalLoginAssets.backgroundMobile : 'https://images.virtualsoft.tech/m/msj0212T1712238363.png'"
          alt=""
          class="in tablet:hidden absolute top-0 bottom-0 right-0 left-0 object-center object-cover h-screen w-screen tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] tablet:max-h-none tablet:h-auto m-auto"
      />
      <img
          v-else
          :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.backgroundMobileDark != undefined ? appComponent.config.modalLoginAssets.backgroundMobileDark : 'https://images.virtualsoft.tech/m/msj0212T1712238363.png'"
          alt=""
          class="in tablet:hidden absolute top-0 bottom-0 right-0 left-0 object-center object-cover h-screen w-screen tablet:w-[800px] tablet:max-w-none tablet:max-h-[745px] tablet:max-h-none tablet:h-auto m-auto"
      />
      <!-- Image for tablet view -->
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
      <!-- Main content section for the modal -->
      <section
          class="relative w-screen tablet:w-[800px] max-h-screen overflow-hidden pt-safe pb-safe p-10 mb-5 tablet:p-0 flex flex-col tablet:flex-row z-50 justify-start tablet:justify-center items-start tablet:items-center tablet:gap-8"
      >
        <div class="w-full flex justify-center mt-12 mb-0 tablet:mt-0 tablet:mb-0 tablet:hidden z-40">
          <img
              :src="
                appComponent.config.modalLoginAssets &&
                appComponent.config.modalLoginAssets.mobileTopImage
                  ? appComponent.config.modalLoginAssets.mobileTopImage
                  : ''
              "
              class="w-[250px] h-auto object-contain"
              alt=""
          />
        </div>
        <div class="w-full flex justify-center mt-2 mb-4 tablet:mt-0 tablet:mb-0 tablet:hidden z-40">
          <img
              :src="
                appComponent.config.modalLoginAssets &&
                appComponent.config.modalLoginAssets.mobileCenterImg
                  ? appComponent.config.modalLoginAssets.mobileCenterImg
                  : ''
              "
              class="w-[400px] h-auto object-contain"
              alt=""
          />
        </div>
        <!-- Close button for the modal -->
        <button
            @click="
						appComponent.showModalLogin = false;
						login = {
							email: '',
							password: '',
						};
					"
            class="absolute top-14 right-6 tablet:top-10 tablet:right-24 scale-110 hover:scale-125 tablet:hidden"
        >
          <img
              :src="
                appComponent.themeSportbook
                  ? appComponent.config.modalLoginAssets.iconCloseDark
                  : appComponent.config.modalLoginAssets.iconClose
              "
              class="w-6 h-6 object-contain"
              alt="close modal"
          />
        </button>
        <!-- Close button for the modal desktop and tablet -->
        <button
            @click="
						appComponent.showModalLogin = false;
						login = {
							email: '',
							password: '',
						};
					"
            class="absolute top-5 tablet:top-10 right-4 tablet:right-28 scale-110 hover:scale-125 hidden tablet:flex"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              class="stroke-primary"
          >
            <circle
                cx="11.2389"
                cy="11.3491"
                r="10.0866"
            />
            <line
                x1="8.18273"
                y1="8.99651"
                x2="14.1791"
                y2="14.9929"
                stroke-width="1.5"
                stroke-linecap="round"
            />
            <line
                x1="8.29785"
                y1="14.9936"
                x2="14.2942"
                y2="8.99718"
                stroke-width="1.5"
                stroke-linecap="round"
            />
          </svg>
        </button>
        <!-- Image for tablet view -->
        <img
            :src="appComponent.config.modalLoginAssets != undefined && appComponent.config.modalLoginAssets.leftImage != undefined ? appComponent.config.modalLoginAssets.leftImage : 'https://images.virtualsoft.tech/m/msj23212T1712608160.png'"
            alt=""
            class="w-[40%] h-[450px] object-contain hidden tablet:flex -ml-4"
        />
        <!-- Container for form elements -->
        <div
            class="flex flex-col justify-center items-center tablet:items-start w-full tablet:max-w-[215px]"
        >
          <!-- FORM MOBILE-->
          <div class="w-full tablet:hidden">
            <!-- Title for the login form -->
            <h2
                class="text-2xl w-full font-bold text-center text-neutral"
            >
              {{ $t('Iniciar sesión') }}
            </h2>
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
                class="w-full"
            >
              <div class="form-control w-full">
                <label class="label">
                  <!-- Email label -->
                  <span
                      class="label-text text-sm text-neutral"
                  >{{ $t('Correo') }}</span
                  >
                  <span class="text-error font-bold">*</span>
                </label>
                <!-- Input container for email -->
                <div
                    class="input flex items-center gap-1 pr-0 border-input-border placeholder-input-placeholder bg-input-background w-full h-[40px]"
                >
                  <img
                      :src="
                        appComponent.themeSportbook
                          ? appComponent.config.modalLoginAssets.iconEmailDark
                          : appComponent.config.modalLoginAssets.iconEmail
                      "
                      class="w-5 h-5 object-contain ml-1"
                      alt="email icon"
                  />
                  <Field
                      id="loginUsername"
                      name="email"
                      :class="{ 'is-invalid': errors.email }"
                      :placeholder="$t('Ingrese correo')"
                      required="true"
                      autocomplete="usuario"
                      v-model="login.email"
                      class="w-full bg-transparent text-neutral placeholder:text-sm border-none h-full text-sm ml-2"
                      type="text"
                  />
                </div>
                <label
                    class="label"
                    v-if="errors.email != undefined"
                >
                  <!-- Error message for email -->
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
              <div class="form-control w-full mt-2">
                <label class="label">
                  <!-- Password label -->
                  <span
                      class="label-text text-sm text-neutral"
                  >{{ $t('Contraseña') }}</span
                  >
                  <span class="text-error font-bold">*</span>
                </label>
                <!-- Input container for password -->
                <div
                    class="relative input flex items-center gap-1 pr-0 border-input-border placeholder-input-placeholder bg-input-background w-full h-[40px]"
                >
                  <img
                      :src="
                        appComponent.themeSportbook
                          ? appComponent.config.modalLoginAssets.iconPasswordLockDark
                          : appComponent.config.modalLoginAssets.iconPasswordLock
                      "
                      class="w-5 h-5 object-contain ml-1"
                      alt="password lock"
                  />

                  <!-- Input -->
                  <Field
                      class="w-full bg-transparent text-neutral placeholder:text-sm border-none h-full text-sm ml-2 pr-10"
                      :type="showPassword ? 'text' : 'password'"
                      id="loginPassword"
                      :class="{ 'is-invalid': errors.password }"
                      name="password"
                      :placeholder="$t('Contraseña')"
                      v-model="login.password"
                      autocomplete="current-password"
                  />
                  <button
                      type="button"
                      @click="togglePassword"
                      class="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center"
                  >
                    <img
                        :src="
                          showPassword
                            ? (
                                appComponent.themeSportbook
                                  ? appComponent.config.modalLoginAssets.iconEyeDark
                                  : appComponent.config.modalLoginAssets.iconEye
                              )
                            : (
                                appComponent.themeSportbook
                                  ? appComponent.config.modalLoginAssets.iconEyeOffDark
                                  : appComponent.config.modalLoginAssets.iconEyeOff
                              )
                        "
                        class="w-5 h-5 object-contain"
                        alt="toggle password visibility"
                    />
                  </button>
                  <button
                      type="button"
                      class="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center"
                      id="showpass"
                      @click="showpass()"
                  >
                  </button>
                </div>
                <label
                    class="label"
                    v-if="errors.password != undefined"
                >
                  <!-- Error message for password -->
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
              <!-- Countdown message when login is disabled -->
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
              <button
                  v-show="!appComponent.disabledLogin"
                  type="submit"
                  @click="appComponent.gAnalytics('popup_login')"
                  :disabled="appComponent.disabledLogin"
                  class="h-[40px] tablet:h-[48px] btn btn-block btn-primary hover:bg-primary/75 text-lg my-4 capitalize text-neutral mt-5"
              >
                {{ $t('Inicia Sesión') }}
              </button>
              <button
                  v-show="appComponent.disabledLogin"
                  disabled
                  class="h-[40px] btn btn-block btn-primary hover:bg-primary/75 text-neutral text-lg my-4 capitalize"
              >
                <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
                {{ $t('Iniciar sesión') }}
              </button>
            </Form>
          </div>
          <!-- FORM DESKTOP and TABLET -->
          <div class="w-full hidden tablet:block mt-4 tablet:mt-0">
            <!-- Title for the login form -->
            <h2
                class="font-[500] text-3xl w-full text-start text-neutral"
            >
              {{ $t('Iniciar sesión') }}
            </h2>
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ errors }"
                class="w-full"
            >
              <div class="form-control w-full">
                <label class="label">
                  <!-- Email label -->
                  <span
                      class="label-text text-base text-neutral"
                  >{{ $t('Correo') }}</span
                  >
                </label>
                <!-- Input container for email -->
                <div
                    class="input input-bordered flex items-center gap-1 pr-0  border-input-border placeholder-input-placeholder w-full h-[40px]"
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
                      class="w-full bg-transparent border-none h-full text-lg"
                      type="text"
                  />
                </div>
                <label
                    class="label"
                    v-if="errors.email != undefined"
                >
                  <!-- Error message for email -->
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
              <div class="form-control w-full">
                <label class="label">
                  <!-- Password label -->
                  <span
                      class="label-text text-base text-neutral"
                  >{{ $t('Contraseña') }}</span
                  >
                </label>
                <!-- Input container for password -->
                <div
                    class="relative input input-bordered flex items-center gap-1 pr-0 border-input-border placeholder-input-placeholder w-full h-[40px]"
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
                      class="w-full bg-transparent border-none h-full text-lg"
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
                <label
                    class="label"
                    v-if="errors.password != undefined"
                >
                  <!-- Error message for password -->
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
              <!-- Countdown message when login is disabled -->
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
              <button
                  v-show="!appComponent.disabledLogin"
                  type="submit"
                  @click="appComponent.gAnalytics('popup_login')"
                  :disabled="appComponent.disabledLogin"
                  class="h-[40px] tablet:h-[48px] btn btn-block btn-success hover:bg-success/75 text-lg my-4 capitalize text-neutral"
              >
                {{ $t('Inicia Sesión') }}
              </button>
              <button
                  v-show="appComponent.disabledLogin"
                  disabled
                  class="h-[40px] btn btn-block btn-success hover:bg-success/75 text-neutral text-lg my-4 capitalize"
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
          </div>
          <!-- Links for password recovery and registration -->
          <div
              class="w-full flex flex-col justify-center items-center gap-4 z-50"
          >
            <RouterLink
                to="/recuperar-clave"
                @click="
								appComponent.showModalLogin = false;
								appComponent.gAnalytics('forgot_password');
							"
                class="mx-auto text-neutral font-bold underline text-lg hover:scale-105"
            >{{ $t('¿Olvidaste tu contraseña?') }}
            </RouterLink>
            <span
                class="flex flex-col justify-center items-center cursor-default font-bold text-neutral text-lg text-center"
            >{{ $t('¿No tienes una cuenta?')
              }}<a
                  href="/registro"
                  class="text-neutral font-bold hover:scale-105 cursor-pointer underline"
              >{{ $t('Registrate') }}</a
              ></span
            >
          </div>
        </div>
      </section>
    </dialog>
  </Teleport>
</template>
<script lang="ts">
import { Form, Field } from 'vee-validate'; // Importing Form and Field components from vee-validate
import * as Yup from 'yup'; // Importing Yup for validation schema
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import apiService from '@/services/ApiService'; // Importing API service for making requests
import FacebookLogin from '../FacebookLogin.vue'; // Importing FacebookLogin component
declare var optimoveSDK: any; // Declaring optimoveSDK variable
import router from '@/router'; // Importing router for navigation
import { useModalStore } from '@/stores/modal'; // Importing modal store for state management
export default defineComponent({
  components: {
    Form, // Registering Form component
    FacebookLogin, // Registering FacebookLogin component
    Field, // Registering Field component
  },
  data() {
    let config = this.$config(); // Getting configuration
    let appComponent: any = this.$appComponent; // Accessing app component
    let emitter = this.$emitter(); // Getting event emitter
    let clientId: any =
        (window as any).cconfig.facebookLoginClienId != undefined
            ? (window as any).cconfig.facebookLoginClienId
            : ''; // Getting Facebook client ID from window config
    let refreshBalance = this.$refreshBalance; // Getting refresh balance method
    let count = 0; // Countdown timer
    let disabledCount = false; // Flag for disabling login
    let showPassword = false; // Flag for showing password
    let login = {
      email: '', // Email input
      password: '', // Password input
    };
    const schema = Yup.object().shape({
      email: Yup.string().required(
          this.$t('Se requiere correo electrónico') // Email validation
      ),
      password: Yup.string()
          .min(
              4,
              this.$t('La contraseña debe tener al menos 4 caracteres.') // Password minimum length validation
          )
          .required(this.$t('Contraseña es requerida.')), // Password required validation
    });
    const modalStore = useModalStore(); // Using modal store
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
      showPassword,
      acceptModalHandler,
      checkMultiLogin: false,
      lastFormValues: null,
    };
  },
  unmounted() {
    document.body.classList.remove('no-scroll');
    if (this.acceptModalHandler) {
            this.emitter.off('accept:modal', this.acceptModalHandler); // Cleaning up event listener on component unmount
    }
  },
  mounted() {
    document.body.classList.add('no-scroll');
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
  },
  methods: {
    closeLoginModal() {
                this.appComponent.showModalLogin = false;
                this.appComponent.disabledLogin = false;
                this.appComponent.closeModal();
    },
    onSubmit(values: any) {
      this.lastFormValues = values;
      let dataSend = {
        username: values.email, // Sending email as username
        password: values.password, // Sending password
        timeRequest: true, // Flag for time request
      };
      if (this.checkMultiLogin) { // If login is retried after multi-account confirmation
                dataSend.checkMultiLogin = "true"; // Inform backend to allow multi-login flow
            }

      this.appComponent.disabledLogin = true; // Disabling login button
      if (!this.appComponent.contingency) {
        apiService
            .request('login', dataSend) // Making login request
            .then((response: any) => {
              if (response.code == 0) {
                // Successful login response handling
                this.appComponent.firstReqBalance = false;
                this.appComponent.tokenSB = response.data.tokenSB;
                this.appComponent.user_id = response.data.user_id;
                this.appComponent.channel_id =
                    response.data.channel_id;
                this.appComponent.id_platform =
                    response.data.id_platform;
                this.appComponent.tokenUser =
                    response.data.auth_token;
                apiService.setAuthToken(response.data.auth_token); // Setting auth token
                window.localStorage.setItem(
                    'auth_token',
                    response.data.auth_token // Storing auth token in local storage
                );
                this.appComponent.flagMenu = true;
                this.appComponent.frm = 'lgn';
                try {
                  (window as any).fLoadSuccess(
                      this.appComponent.user_id,
                      this.appComponent.frm
                  ); // Reporting successful load
                } catch (e) {}
                this.refreshBalance(); // Refreshing balance
                this.appComponent.loadJsAltenar(); // Loading additional scripts
                if (this.appComponent.depositFromLanding != null) {
                  router.push('/gestion/deposito'); // Redirecting to deposit management
                } else {
                  // Handling redirection based on config and route
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
                      router.push('/deportes'); // Redirecting to sports
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
                              : '/deportes'
                      ); // Redirecting based on config
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
                              : '/deportes'
                      ); // Redirecting based on country config
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
                        this.appComponent.session.usuario
                    ); // Reporting login event
                  }
                } catch (e) {}
                setTimeout(() => {
                  this.emitter.emit('ready:login'); // Emitting ready event after delay
                }, 2000);
              } else if (response.code == 1811) {
                // Handling login restriction
                this.appComponent.disabledLogin = true;
                let timeLogin: any =
                    localStorage.getItem('timeLogin');
                let valorNumber = parseInt(timeLogin);
                let sumMinutes = new Date();
                sumMinutes.setTime(
                    valorNumber + this.config.restrictionTime * 1000
                );
                let interval = setInterval(() => {
                  this.count =
                      sumMinutes.getTime() - new Date().getTime(); // Updating countdown
                  this.disabledCount = true; // Enabling countdown display
                  if (
                      sumMinutes.getTime() <= new Date().getTime()
                  ) {
                    this.appComponent.disabledLogin = false; // Re-enabling login
                    this.disabledCount = false; // Disabling countdown display
                    clearInterval(interval); // Clearing interval
                  }
                }, 1000);
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

              } else if (response.error_code == 300017) {
                // Handling password reset request
                delete dataSend.password;
                let dataSend2 = {
                  forActivate: true,
                  email: dataSend.username,
                  ...dataSend,
                };
                delete dataSend2.username;
                this.appComponent.showModalLogin = false;
                this.modalStore.action = async () => {
                  this.modalStore.loading = true; // Setting loading state
                  await apiService
                      .request('reset_user_password', dataSend2)
                      .then((response: any) => {
                        if (response.code == 0) {
                          this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje'),
                            messageModal: this.$t(
                                'Se ha enviado correctamente el mensaje, te llegara un correo electronico con la información.'
                            ),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                          }; // Showing success notification
                        } else {
                          var error_mensaje = '';
                          if (
                              response.error_code != undefined
                          ) {
                            error_mensaje = this.$t(
                                'ERROR' +
                                response.error_code.toString()
                            ); // Getting error message
                          }
                          if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                            ); // Default error message
                          }
                          this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: error_mensaje,
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                          }; // Showing error notification
                        }
                        this.modalStore.loading = false; // Resetting loading state
                      });
                };
                this.appComponent.modal = {
                  showModal: 'updatePasswordEmail',
                  orderModal: 'closeModal',
                }; // Showing password update modal
                this.appComponent.disabledLogin = false; // Re-enabling login
              } else {
                var error_mensaje = '';
                if (response.error_code != undefined) {
                  error_mensaje = this.$t(
                      'ERROR' + response.error_code.toString()
                  ); // Getting error message
                }
                if (error_mensaje == '') {
                  error_mensaje = this.$t(
                      'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                  ); // Default error message
                }
                this.appComponent.modal = {
                  showModal: 'notification',
                  titleModal: this.$t('Error!'),
                  messageModal: error_mensaje,
                  buttonModal: this.$t('Aceptar'),
                  orderModal: 'closeModal',
                }; // Showing error notification
                this.appComponent.disabledLogin = false; // Re-enabling login
              }
            })
            .catch((e) => {
              console.log(e);
              this.appComponent.modal = {
                showModal: 'notification',
                titleModal: this.$t('Mensaje!'),
                messageModal: this.$t(
                    'La solicitud no pudo ser procesada, intente nuevamente por favor.'
                ),
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
              }; // Showing request error notification
              this.disabledCount = false; // Resetting countdown state
              this.appComponent.disabledLogin = false; // Re-enabling login
            });
      } else {
        setTimeout(() => {
          this.appComponent.showModalLogin = false; // Closing modal after delay
        }, 1000);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    showpass() {
      // Toggle password visibility
      var pwd: any = document.getElementById('loginPassword');
      if (pwd.type === 'password') {
        pwd.type = 'text'; // Show password
      } else {
        pwd.type = 'password'; // Hide password
      }
    },
    signInWithGoogle(userGoogle) {
      const params = {
        id_token: userGoogle.credential, // Google ID token
        country: this.appComponent.country, // User's country
        type: 1, // Type of login
      };
      this.appComponent.disabledLogin = true; // Disabling login button
      if (!this.appComponent.contingency) {
        apiService
            .request('external_auth', params) // Making external auth request
            .then((response: any) => {
              if (response.code == 0) {
                // Successful response handling
                this.appComponent.firstReqBalance = false;
                this.appComponent.tokenSB = response.data.tokenSB;
                this.appComponent.user_id = response.data.user_id;
                this.appComponent.channel_id =
                    response.data.channel_id;
                this.appComponent.id_platform =
                    response.data.id_platform;
                this.appComponent.tokenUser =
                    response.data.auth_token;
                apiService.setAuthToken(response.data.auth_token); // Setting auth token
                window.localStorage.setItem(
                    'auth_token',
                    response.data.auth_token // Storing auth token in local storage
                );
                this.appComponent.flagMenu = true;
                this.appComponent.frm = 'lgn';
                this.refreshBalance(); // Refreshing balance
              } else {
                var error_mensaje = '';
                if (response.error_code != undefined) {
                  error_mensaje = this.$t(
                      'ERROR' + response.error_code.toString()
                  ); // Getting error message
                }
                if (error_mensaje == '') {
                  error_mensaje = this.$t(
                      'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                  ); // Default error message
                }
                this.appComponent.modal = {
                  showModal: 'notification',
                  titleModal: this.$t('Error!'),
                  messageModal: error_mensaje,
                  buttonModal: this.$t('Aceptar'),
                  orderModal: 'closeModal',
                }; // Showing error notification
                this.appComponent.disabledLogin = false; // Re-enabling login
              }
            });
      } else {
        setTimeout(() => {
          this.appComponent.showModalLogin = false; // Closing modal after delay
        }, 1000);
      }
    },
    signInWithFacebook(userFacebook) {
      const params = {
        id_token: userFacebook.authResponse.accessToken, // Facebook access token
        country: this.appComponent.country, // User's country
        type: 2, // Type of login
      };
      this.appComponent.disabledLogin = true; // Disabling login button
      if (!this.appComponent.contingency) {
        apiService
            .request('external_auth', params) // Making external auth request
            .then((response: any) => {
              if (response.code == 0) {
                // Successful response handling
                this.appComponent.firstReqBalance = false;
                this.appComponent.tokenSB = response.data.tokenSB;
                this.appComponent.user_id = response.data.user_id;
                this.appComponent.channel_id =
                    response.data.channel_id;
                this.appComponent.id_platform =
                    response.data.id_platform;
                this.appComponent.tokenUser =
                    response.data.auth_token;
                apiService.setAuthToken(response.data.auth_token); // Setting auth token
                window.localStorage.setItem(
                    'auth_token',
                    response.data.auth_token // Storing auth token in local storage
                );
                this.appComponent.flagMenu = true;
                this.appComponent.frm = 'lgn';
                this.refreshBalance(); // Refreshing balance
              } else {
                var error_mensaje = '';
                if (response.error_code != undefined) {
                  error_mensaje = this.$t(
                      'ERROR' + response.error_code.toString()
                  ); // Getting error message
                }
                if (error_mensaje == '') {
                  error_mensaje = this.$t(
                      'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                  ); // Default error message
                }
                this.appComponent.modal = {
                  showModal: 'notification',
                  titleModal: this.$t('Error!'),
                  messageModal: error_mensaje,
                  buttonModal: this.$t('Aceptar'),
                  orderModal: 'closeModal',
                }; // Showing error notification
                this.appComponent.disabledLogin = false; // Re-enabling login
              }
            });
      } else {
        setTimeout(() => {
          this.appComponent.showModalLogin = false; // Closing modal after delay
        }, 1000);
      }
    },
    signInWithFacebookFailed() {
      // Handling Facebook login failure
      var error_mensaje = this.$t(
          'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
      );
      this.appComponent.modal = {
        showModal: 'notification',
        titleModal: this.$t('Error!'),
        messageModal: error_mensaje,
        buttonModal: this.$t('Aceptar'),
        orderModal: 'closeModal',
      }; // Showing error notification
    },
  },
});
</script>
<style scoped>
:root {
  --safe-top: env(safe-area-inset-top, 12px);
  --safe-bottom: env(safe-area-inset-bottom, 12px);
}

.pt-safe {
  padding-top: var(--safe-top);
}

.pb-safe {
  padding-bottom: var(--safe-bottom);
}

:global(body.no-scroll) {
  overflow: hidden !important;
  height: 100vh !important;
  width: 100vw !important;
  position: fixed !important;
  inset: 0 !important;
}

.modal {
  visibility: visible !important; /* Ensures modal is visible */
  opacity: 1 !important; /* Ensures modal is fully opaque */
  pointer-events: all !important; /* Allows interaction with modal */
  overflow: hidden !important;
}

.modal-box {
  padding: 0px !important; /* Removes padding from modal box */
}

.shadowlogin {
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.342); /* Adds shadow effect to login modal */
}
</style>

<!-- FILE DOCUMENTED -->

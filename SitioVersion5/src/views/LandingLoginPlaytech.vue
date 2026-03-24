<script lang="ts">
import { defineComponent } from 'vue';
import AppForm from '@/components/Form.vue';
import { configure, Field, Form } from 'vee-validate';
import apiService from '@/services/ApiService';
import { Input } from 'flowbite-vue';
import * as Yup from 'yup';
import router from '@/router';

// Configure vee-validate to validate on various events
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
});

export default defineComponent({
    components: {
        Input,
        AppForm,
        Form,
        Field,
    },
    data() {
        // Initialize component data
        let config = this.$config();
        let appComponent = this.$appComponent;
        let emitter = this.$emitter();
        let login = {
            email: '',
            password: '',
        };
        // Define validation schema using Yup
        const schema = Yup.object().shape({
            email: Yup.string().required(this.$t('Se requiere usuario')),
            password: Yup.string().required(this.$t('Se requiere contraseña.')),
        });
        return {
            config,
            appComponent,
            emitter,
            login,
            schema,
            count: 0,
            disabledCount: false,
        };
    },
    methods: {
        // Handle form submission
        async onSubmit(values: any) {
            const data = {
                username: values.email,
                password: values.password,
                typeApp: 1,
                timeRequest: true,
                in_app: true,
            };
            this.appComponent.disabledLogin = true; // Disable login button during request
            if (!this.appComponent.contingency) {
                try {
                    const response = await apiService.request('login_poker_playtech', data);
                    console.log('Respuesta de la API:', response); 
                    if (response && response.code === 0) {
                        // Successful login handling
                        const authToken = response.data.auth_token;
                        const userId = response.data.user_id;
                        const balance = response.data.balance;
                        const sid = response.data.sid;
                        const loginUrl = `htcmd:login?username=${userId}&externalToken=${authToken}`;
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Inició sesión'),
                            messageModal: this.$t('Se inició sesión correctamente'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        (window as any).location = loginUrl; // Redirect to login URL
                        this.appComponent.flagMenu = true;
                        this.appComponent.frm = 'lgn';
                        this.appComponent.user_id = userId;
                        this.appComponent.auth_token = authToken;
                        this.appComponent.balance = balance;
                    } else if (response.code === 1811) {
                        // Handle login restriction
                        this.handleLoginRestriction();
                    } else {
                        // Handle error response
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
                } catch (error) {
                    console.error('Error en la solicitud de login:', error);
                    this.showError(this.$t('La solicitud no pudo ser procesada, intente nuevamente por favor.'));
                } finally {
                    this.appComponent.disabledLogin = false; // Re-enable login button
                }
            } else {
                this.showError(this.$t('Debe estar conectado a internet para poder realizar el login.'));
                this.appComponent.disabledLogin = false; // Re-enable login button
            }
        },
        // Manage login restriction timing
        handleLoginRestriction() {
            try {
                const timeLogin = localStorage.getItem('timeLogin');
                const valorNumber = parseInt(timeLogin || '0');
                const sumMinutes = new Date(valorNumber + this.config.restrictionTime * 1000);
                const interval = setInterval(() => {
                    this.count = sumMinutes.getTime() - new Date().getTime();
                    this.disabledCount = true;
                    if (sumMinutes.getTime() <= new Date().getTime()) {
                        this.appComponent.disabledLogin = false; // Re-enable login button
                        this.disabledCount = false;
                        clearInterval(interval); // Clear interval when time is up
                    }
                }, 1000);
            } catch (error) {
                console.error('Error al manejar la restricción de login:', error);
                this.showError(this.$t('Error al manejar la restricción de login.'));
            }
        },
        // Toggle password visibility
        showPass() {
            const pwd = document.getElementById('loginPassword')!;
            pwd.type = pwd.type === 'password' ? 'text' : 'password';
        },
        // Show error message in modal
        showError(message: string) {
            this.appComponent.modal = {
                showModal: 'notification',
                titleModal: this.$t('Error!'),
                messageModal: message,
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
            };
        },
    },
});
</script>
<template>
    <Teleport to="body">
        <!-- Main overlay for login modal -->
        <div class="fixed inset-0 z-[998] bg-black bg-opacity-75 flex items-center justify-center">
            <!-- Background for desktop view -->
            <div
                class="absolute inset-0 md:block"
                :style="{
                    backgroundImage: 'url(' + config.landingLoginPlaytech.bgDesktop + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }"
            ></div>
            <!-- Background for mobile view -->
            <div
                class="absolute inset-0 md:hidden"
                :style="{
                    backgroundImage: 'url(' + config.landingLoginPlaytech.bgMobile + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }"
            ></div>
            <!-- Left image for desktop view -->
            <div
                class="hidden md:block absolute"
                :style="{
                    left: '23%',
                    backgroundImage: 'url(' + config.landingLoginPlaytech.imgLeftImage + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '25vw',
                    height: '50vh',
                }"
            ></div>
            <!-- Right image for desktop view -->
            <div
                class="hidden md:block absolute"
                :style="{
                    right: '25%' /* Proporcional al ancho de la pantalla */,
                    backgroundImage: 'url(' + config.landingLoginPlaytech.imgRightImage + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '22vw',
                    height: '47vh' /* 50% de la altura de la pantalla */,
                }"
            ></div>
            <!-- Top image for mobile view -->
            <div
                class="block md:hidden absolute top-44 mt-5 left-0 right-0 mx-auto w-[350px] h-[350px] bg-cover bg-center z-10"
                :style="{
                    backgroundImage: 'url(' + config.landingLoginPlaytech.imgTopImage + ')',
                }"
            ></div>
            <!-- Logo container -->
            <div
                class="absolute top-10 md:right-1/2 md:translate-x-1/2 right-20 md:top-28 w-full flex justify-center items-center"
                :style="{
                    backgroundImage: 'url(' + config.landingLoginPlaytech.logo + ')',
                    backgroundSize: 'contain' /* Ajusta el tamaño del logo */,
                    backgroundPosition: 'center' /* Centra la imagen */,
                    backgroundRepeat: 'no-repeat',
                    height: '30px' /* Ajusta la altura del contenedor del logo */,
                    width: 'auto' /* Ajusta el ancho automáticamente para mantener la proporción */,
                }"
            ></div>
            <!-- Login form container -->
            <div
                class="relative z-10 bg-accent-content p-6 md:p-8 rounded-2xl w-full max-w-[350px] md:max-w-[350px] max-h-[350px] border-4 border-primary-focus shadow-[inset_0_0_2px_1px_white]"
            >
                <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors }"
                >
                    <!-- Email input field -->
                    <div class="mb-5">
                        <label
                            for="email"
                            class="block text-sm text-white mb-2"
                        >
                            {{ $t('Usuario:') }}
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-content">
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </span>
                            <Field
                                id="loginUsername"
                                name="email"
                                :class="[
                                    'input w-full p-4 pl-12 rounded-full border-2 bg-secondary text-white',
                                    errors.email ? 'border-red-500' : 'border-accent-focus',
                                ]"
                                v-model="login.email"
                                type="text"
                            />
                        </div>
                        <div
                            v-if="errors.email"
                            class="text-red-500 text-sm mt-1"
                        >
                            {{ errors.email }}
                        </div>
                    </div>
                    <!-- Password input field -->
                    <div class="mb-6 relative">
                        <label
                            for="password"
                            class="block text-sm text-white mb-2"
                        >
                            {{ $t('Contraseña:') }}
                        </label>
                        <div class="relative">
                            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-content">
                                <font-awesome-icon icon="fa-solid fa-key" />
                            </span>
                            <Field
                                id="loginPassword"
                                name="password"
                                :class="[
                                    'input w-full p-4 pl-12 rounded-full border-2 bg-secondary text-white',
                                    errors.password ? 'border-red-500' : 'border-accent-focus',
                                ]"
                                v-model="login.password"
                                type="password"
                            />
                        </div>
                        <button
                            type="button"
                            @click="showPass"
                            class="absolute top-10 right-[15px] text-gray-500"
                        >
                            <font-awesome-icon icon="fa-solid fa-eye" />
                        </button>
                        <div
                            v-if="errors.password"
                            class="text-red-500 text-sm mt-1"
                        >
                            {{ errors.password }}
                        </div>
                    </div>
                    <!-- Submit button -->
                    <div class="mb-6">
                        <button
                            v-show="!appComponent.disabledLogin"
                            class="btn bg-primary-focus text-black w-full h-12 rounded-full shadow-md border-none"
                            style="text-transform: none"
                        >
                            {{ $t('Iniciar sesión') }}
                        </button>
                        <button
                            v-show="appComponent.disabledLogin"
                            class="btn bg-primary-focus text-black w-full h-12 rounded-full shadow-md border-none"
                            style="text-transform: none"
                            disabled
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
                    </div>
                </Form>
            </div>
        </div>
    </Teleport>
</template>

<!-- FILE DOCUMENTED -->

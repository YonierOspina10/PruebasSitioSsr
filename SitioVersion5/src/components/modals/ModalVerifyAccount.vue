<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import { AucoSDK } from 'auco-sdk-integration';

/**
 * Vue component definition for account verification modal.
 */
export default defineComponent({
    data() {
        // Initialize component data properties
        let config: any = this.$config(); // Configuration object
        let appComponent: any = this.$appComponent; // Application component reference
        let emitter: any = this.$emitter(); // Event emitter
        let zendesk: any = this.$zendesk; // Zendesk integration
        let text: any = ''; // Text content for the modal
        let img: string = ''; // Image source for the modal
        let stateVerify = null; // Verification state
        let loader: boolean = true; // Loader visibility state
        let modalAuco: boolean = false; // Modal visibility state for Auco
        return {
            config,
            appComponent,
            emitter,
            text,
            img,
            stateVerify,
            loader,
            modalAuco,
            zendesk,
        };
    },
    mounted() {
        // Lifecycle hook to initialize component
        this.init();
    },
    methods: {
        /**
         * Initializes the component by requesting account verification status.
         */
        init() {
            apiService.request('verification_account', {}).then((response) => {
                if (response.code == 0) {
                    this.stateVerify = response.data.Verification_status; // Set verification status
                    this.text = response.data.Template; // Set template text
                    this.validImg(); // Validate and set image based on verification status
                    this.loader = false; // Hide loader
                } else if (response.code != 0) {
                    this.validImg(); // Validate and set image
                    this.loader = false; // Hide loader
                } else {
                    var error_mensaje = ''; // Error message variable
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Modal type
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Modal message
                        buttonModal: this.$t('Aceptar'), // Modal button text
                        orderModal: 'closeModal', // Modal action
                    };
                }
            });
        },
        /**
         * Validates and sets the image based on the verification state.
         */
        validImg() {
            if (this.stateVerify == null) {
                this.img =
                    this.config != undefined &&
                    this.config.modalVerifyAccount != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country] != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country].iconDefault != undefined
                        ? this.config.modalVerifyAccount[this.appComponent.country].iconDefault
                        : '';
            } else if (this.stateVerify == 0) {
                this.img =
                    this.config != undefined &&
                    this.config.modalVerifyAccount != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country] != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country].iconCheck != undefined
                        ? this.config.modalVerifyAccount[this.appComponent.country].iconCheck
                        : '';
            } else if (this.stateVerify == 1) {
                this.img =
                    this.config != undefined &&
                    this.config.modalVerifyAccount != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country] != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country].iconRefused != undefined
                        ? this.config.modalVerifyAccount[this.appComponent.country].iconRefused
                        : '';
            } else if (this.stateVerify == 2) {
                this.img =
                    this.config != undefined &&
                    this.config.modalVerifyAccount != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country] != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country].iconPending != undefined
                        ? this.config.modalVerifyAccount[this.appComponent.country].iconPending
                        : '';
            } else if (this.stateVerify == 3) {
                this.img =
                    this.config != undefined &&
                    this.config.modalVerifyAccount != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country] != undefined &&
                    this.config.modalVerifyAccount[this.appComponent.country].iconBlock != undefined
                        ? this.config.modalVerifyAccount[this.appComponent.country].iconBlock
                        : '';
            }
        },
        /**
         * Verifies the user through Jumio service.
         */
        verifyJumio() {
            apiService.request('verifica_jumio', {}).then((response: any) => {
                if (response.code == 0) {
                    if (response.data.url != undefined) {
                        window.location.href = response.data.url; // Redirect to the provided URL
                    } else {
                        if (response.data.code != undefined && response.data.key != undefined) {
                            this.modalAuco = true; // Show Auco modal
                            setTimeout(() => {
                                AucoSDK({
                                    iframeId: 'myIframe', // ID of the iframe for Auco SDK
                                    sdkType: 'validation', // Type of SDK operation
                                    language: 'es', // Language for the SDK
                                    keyPublic: response.data.key, // Public key for SDK
                                    events: {
                                        onSDKReady: () => {
                                            console.log('onSDKReady'); // Log when SDK is ready
                                        },
                                        onSDKClose: (similarity: any) => {
                                            console.log('similarity', similarity); // Log similarity result on SDK close
                                        },
                                    },
                                    env: 'PROD', // Environment for SDK
                                    sdkData: {
                                        document: response.data.code, // Document code for SDK
                                    },
                                });
                            }, 500);
                        }
                    }
                } else {
                    var error_mensaje = ''; // Error message variable
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Get error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Modal type
                        titleModal: this.$t('Error!'), // Modal title
                        messageModal: error_mensaje, // Modal message
                        buttonModal: this.$t('Aceptar'), // Modal button text
                        orderModal: 'closeModal', // Modal action
                    };
                }
            });
        },
        /**
         * Opens the chat support based on the application configuration.
         */
        onOpenChat() {
            let ref_id: any = 'cen_ifr_static'; // Reference ID for chat
            if (this.appComponent.config.zendesk[this.appComponent.country].name == 'centribal') {
                document.getElementById('centribal_iframe_layout')?.classList.remove('centribal_hidden'); // Show chat iframe
                document.getElementById('centribal_iframe_layout')?.classList.add('centribal_open'); // Open chat iframe
                postMessage('show_chat', '', ref_id); // Post message to show chat
            } else {
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'open'); // Open Zendesk chat
                this.zendesk.zE(this.config.zendesk[this.appComponent.country].name, 'show'); // Show Zendesk chat
            }
        },
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:ModalVerifyAccount|layout:layout-${this.appComponent.config.layout}`
            };
        },
    },
});
</script>
<template>
    <!-- Main modal container for account verification -->
    <div class="modal z-[99999]">
        <div
            class="container-general bg-gradient-to-b from-neutral to-primary rounded-3xl flex flex-col justify-center items-center overflow-hidden h-[90%] w-[90%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] shadow-[0px_3px_6px_0px] shadow-neutral-content/50"
        >
            <!-- Top half of the modal displaying the verification image -->
            <div
                class="w-[98%] h-1/2 bg-secondary-content mt-2 rounded-t-3xl flex justify-center items-center relative before:content-[''] before:absolute before:bottom-5 before:right-1/2 before:translate-x-1/2 before:w-[29%] before:h-[3%] before:bg-neutral-content/10 before:z-50 before:rounded-[50%] before:shadow-[2px_0px_7px] before:shadow-neutral-content/10"
            >
                <!-- Dynamic image source based on verification state -->
                <img
                    :src="img"
                    alt="ico"
                    class="z-50"
                />
            </div>
            <!-- Bottom half of the modal displaying text and buttons -->
            <div
                class="w-[98%] h-1/2 bg-base-300 mb-2 rounded-b-3xl relative flex flex-col items-center before:content-[''] before:absolute before:top-0 before:right-1/2 before:translate-x-1/2 before:w-[110%] before:h-52 before:bg-base-300 before:rounded-[90%] before:-mt-20"
                :class="
                    stateVerify == null
                        ? 'justify-center'
                        : stateVerify == 0 || stateVerify == 1 || stateVerify == 3
                          ? 'pt-5'
                          : ''
                "
            >
                <!-- Render HTML content for the text -->
                <div
                    class="h-auto w-4/5 relative flex flex-col text-neutral items-center text-center"
                    v-html="$t(text)"
                />
                <div
                    class="h-1/2 bg-base-300 mb-1 rounded-b-3xl relative flex gap-2"
                    :class="
                        stateVerify == 1 || stateVerify == 0
                            ? 'justify-center items-end w-[98%]'
                            : stateVerify == 3
                              ? 'w-[92%] justify-end items-end'
                              : 'justify-center items-center w-full'
                    "
                >
                    <!-- Button for retrying verification -->
                    <button
                        v-if="stateVerify == null || stateVerify == 2"
                        class="w-[35%] h-[35%] border-3 border-success rounded-xl shadow-[0px_3px_6px_0px] shadow-neutral-content/50 hover:scale-105 transition-all ease-in-out"
                        @click="appComponent.session.user_verification = false"
                    >
                        <p class="text-success font-bold bg-clip-text">{{ $t('En otro momento') }}</p>
                    </button>
                    <!-- Button for verifying through Jumio -->
                    <button
                        v-if="stateVerify == null || stateVerify == 1 || stateVerify == 2"
                        class="h-[40%] rounded-xl border-3 shadow-[0px_3px_6px_0px] shadow-neutral-content/50 hover:scale-105 transition-all ease-in-out"
                        :class="
                            stateVerify == 1
                                ? 'w-[55%] bg-secondary border-secondary'
                                : 'w-[35%] bg-success border-success'
                        "
                        @click="verifyJumio()"
                    >
                        <p class="text-info font-bold bg-clip-text">
                            {{ stateVerify == 1 ? $t('VOLVER A INTENTAR') : $t('¡Verifica ahora!') }}
                        </p>
                    </button>
                    <!-- Button for redirecting to sports page -->
                    <RouterLink
                        v-if="stateVerify == 0"
                        to="/deportes"
                        v-bind="analyticsAttrs('menu:nav:sports')"
                        class="w-[35%] h-[40%] bg-success border-3 border-success rounded-xl shadow-[0px_3px_6px_0px] shadow-neutral-content/50 hover:scale-105 transition-all ease-in-out flex justify-center items-center"
                    >
                        <p class="text-info font-bold bg-clip-text">{{ $t('Apostar ahora') }}</p>
                    </RouterLink>
                    <!-- Button for opening support chat -->
                    <button
                        v-if="stateVerify == 3"
                        class="h-[40%] rounded-xl shadow-[0px_3px_6px_0px] flex justify-center items-center gap-2 shadow-neutral-content/50 hover:scale-105 transition-all ease-in-out w-[52%] lg:w-[39%] bg-gradient-to-r from-neutral-content to-primary"
                        @click="onOpenChat()"
                    >
                        <span>
                            <img
                                src="https://images.virtualsoft.tech/site/doradobet/Webp/Home/chat%20(1).webp"
                                alt=""
                            />
                        </span>
                        <p>
                            {{ $t('Chat de soporte') }} // Support chat text
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for Auco SDK -->
    <div
        class="modal"
        v-if="modalAuco"
    >
        <div class="modal-box modal-box-splaft w-full h-full max-w-3xl text-black pr-2 pl-2">
            <div class="container-modal mb-5">
                <!-- Close Auco modal -->
                <label
                    @click="modalAuco = false"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label>
            </div>
            <iframe
                id="myIframe"
                className="h-full w-full border-0 pt-12"
                allow="camera;microphone"
            />
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

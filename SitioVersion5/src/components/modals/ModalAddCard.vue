<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import IconCloseMenu from '../icons/menu/IconCloseMenu.vue';
import AnimatedPlaceholder from '../AnimatedPlaceholder.vue';
/**
 * Component for adding a credit card.
 */
export default defineComponent({
    components: {
        IconCloseMenu,
        AnimatedPlaceholder
    },
    props: {
        dataInfo: {
            type: Object,
            default: {},
        },
    },
    data() {
        // Configuration and state variables
        let config = this.$config();
        let emitter = this.$emitter();
        let appComponent: any = this.$appComponent;
        let refreshBalance = this.$refreshBalance;
        let prueba: any = false;
        let cardAdd: any = {
            num_tarjeta: '',
            expiry_month: '',
            expiry_year: '',
            cvv: '',
            amount: null,
            productId: '',
            saveCard: false,
            saveCardShow: false,
        };
        let authentication: any = { token: '', requestId: '', referenceId: '', deviceDataCollectionUrl: '' };
        let buttonEnabledCard: boolean = false;
        let dataIframe: any = { stepUpUrl: '' };
        let requiredName = false;
        let loadingTerracall: boolean = false;
        let loadingOTP: boolean = false
        let showProcess: boolean = false;
        let showOtp: boolean = false;
        let isLoading: boolean = true;
        return {
            refreshBalance,
            cardAdd,
            buttonEnabledCard,
            config,
            emitter,
            appComponent,
            authentication,
            prueba,
            dataIframe,
            requiredName,
            loadingTerracall,
            loadingOTP,
            showProcess,
            showOtp,
            isLoading,
        };
    },
    mounted() {
        // Set initial card data and event listener for modal acceptance
        this.cardAdd = this.dataInfo.cardAdd;
        this.emitter.on('accept:modal', () => {
            this.acceptModal();
        });
        this.getPayments();

        setTimeout(() => {
            this.isLoading = false;
        }, 2000)
    },
    methods: {
        /**
         * Adds a card after validating the input fields.
         */
        addCard() {
            if (
                this.cardAdd.num_tarjeta == '' ||
                this.cardAdd.num_tarjeta == null ||
                this.cardAdd.expiry_month == '' ||
                this.cardAdd.expiry_month == null ||
                this.cardAdd.expiry_year == '' ||
                this.cardAdd.expiry_year == null ||
                this.cardAdd.cvv == '' ||
                this.cardAdd.cvv == null ||
                this.cardAdd.amount == '' ||
                this.cardAdd.amount == null ||
                this.cardAdd.productId == '' ||
                this.cardAdd.productId == null
            ) {
                // Show notification modal for missing fields
                this.appComponent.modal = {
                    showModal: 'notification',
                    titleModal: this.$t('Error!'),
                    messageModal: this.$t('Ingresa todos los campos.'),
                    buttonModal: this.$t('Aceptar'),
                    orderModal: 'closeModal',
                };
                return false;
            }
            // Call authentication or add card function based on requirement
            if (this.cardAdd.requireAuth) {
                this.authenticationCardFunction();
            } else {
                this.addCardFunction();
            }
        },
        /**
         * Function to handle card addition logic.
         */
        addCardFunction() {
            this.buttonEnabledCard = true;
            const params = {
                num_tarjeta: this.cardAdd.num_tarjeta.replace(/ /g, ''),
                expiry_month: this.cardAdd.expiry_month,
                expiry_year: this.cardAdd.expiry_year,
                cvv: this.cardAdd.cvv,
                amount: this.cardAdd.amount,
                productId: this.cardAdd.productId,
                saveCard: this.cardAdd.saveCard,
                requestId: this.authentication.requestId,
                referenceId: this.authentication.referenceId,
                holderName: this.cardAdd.holderName || undefined,
            };
            apiService.request('register_credit_card', params).then((response: any) => {
                if (response.code == 0) {
                    // Handle 3D Secure authentication
                    if (response.data.code == 'PG402-05') {
                        this.dataIframe = {
                            stepUpUrl: response.data.stepUpUrl,
                        };
                        let iframe = document.createElement('iframe') as any;
                        iframe.id = 'step_up_iframe';
                        iframe.name = 'stepUpIframe';
                        iframe.width = '400';
                        iframe.height = '560';
                        iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
                        iframe.style.background = 'white';
                        iframe.style.border = 'none';
                        iframe.style.marginLeft = 'auto';
                        iframe.style.marginRight = 'auto';
                        iframe.style.display = 'block';
                        let container = document.getElementById('add-card') as any;
                        container.appendChild(iframe);
                        const vthis = this;
                        let count = 0;
                        iframe.addEventListener('load', function () {
                            iframe.addEventListener('load', function () {
                                count++;
                                const params = {
                                    num_tarjeta: vthis.cardAdd.num_tarjeta.replace(/ /g, ''),
                                    expiry_month: vthis.cardAdd.expiry_month,
                                    expiry_year: vthis.cardAdd.expiry_year,
                                    cvv: vthis.cardAdd.cvv,
                                    amount: vthis.cardAdd.amount,
                                    productId: vthis.cardAdd.productId,
                                    saveCard: vthis.cardAdd.saveCard,
                                    requestId: vthis.authentication.requestId,
                                    referenceId: vthis.authentication.referenceId,
                                    stepUpUrl: response.data.stepUpUrl,
                                    idTransaction: response.data.idTransaction,
                                    transactionOriginal: response.data.transactionOriginal,
                                };
                                if (count == 1) {
                                    vthis.validation3D(params);
                                }
                            });
                        });
                        let step_up_form = document.createElement('form');
                        step_up_form.id = 'step_up_form';
                        step_up_form.action = response.data.stepUpUrl;
                        step_up_form.method = 'POST';
                        step_up_form.target = 'stepUpIframe';
                        let step_up_form_jwt_input = document.createElement('input');
                        step_up_form_jwt_input.id = 'step_up_form_jwt_input';
                        step_up_form_jwt_input.type = 'hidden';
                        step_up_form_jwt_input.name = 'JWT';
                        step_up_form_jwt_input.value = response.data.token;
                        step_up_form.appendChild(step_up_form_jwt_input);
                        container.appendChild(step_up_form);
                        step_up_form.submit();
                    } else if (
                        response.dataVisaNet !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country] !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country]
                    ) {
                        this.buttonEnabledCard = false;
                        this.cardAdd = {
                            num_tarjeta: '',
                            expiry_month: '',
                            expiry_year: '',
                            cvv: '',
                            amount: '',
                            productId: '',
                            saveCard: false,
                            saveCardShow: false,
                            requireAuth: false,
                        };
                        this.emitter.emit('closeModalAddCard');
                        this.appComponent.closeModal();
                        this.appComponent.modalVisaNetDepositData = response.dataVisaNet;
                        this.appComponent.modalVisaNetDeposit = true;
                    } else if (
                        response.data.abreviado === 'TERRACAL' &&
                        this.appComponent.config.modalTerracall !== undefined &&
                        this.appComponent.config.modalTerracall[this.appComponent.country] !== undefined &&
                        this.appComponent.config.modalTerracall[this.appComponent.country]
                    ) {
                        this.loadingTerracall = true;
                        this.showProcess = true;
                        this.showOtp = false;
                        // Create and submit the Cardinal iframe for authentication
                        this.$nextTick(() => {
                            const container = document.getElementById('add-card-process') as HTMLElement;
                            if (container) container.innerHTML = '';
                        
                            const domain = response.data.stepUpUrl
                            const accessToken = response.data.accessToken;
                            const domainBase = new URL(domain).origin;
                        
                            const iframe = document.createElement('iframe');
                            iframe.id = 'cardinal_collection_iframe';
                            iframe.name = 'collectionIframe';
                            iframe.width = '1';
                            iframe.height = '1';
                            iframe.style.display = 'none';
                            container.appendChild(iframe);
                        
                            const form = document.createElement('form');
                            form.id = 'cardinal_collection_form';
                            form.method = 'POST';
                            form.target = 'collectionIframe';
                            form.action = domain; // Sandbox URL
                            form.innerHTML = `<input type="hidden" name="JWT" value="${accessToken}">`;
                            container.appendChild(form);
                        
                            form.submit();

                            // Listen for messages from the Cardinal iframe
                            const onMessage = (event: any) => {
                                // Verify the origin of the message
                                if (event.origin === domainBase) {

                                    // Parse the event data
                                    let data;
                                    if (typeof event.data === 'string') {
                                        try {
                                            data = JSON.parse(event.data);
                                        } catch (error) {
                                            console.log('Ocurrio un error', error);
                                            return;
                                        }
                                    } else {
                                        data = event.data;
                                    }
                                    // Handle the message based on its type and status
                                    if (data.MessageType == "profile.completed" && data.Status == true) {
                                        // Prepare data for payment confirmation
                                        data['transactionId'] = response.data.transactionOriginal; // Original transaction ID
                                        data['token'] = response.data.token; // Access token
                                        let params = {
                                                    response: data,
                                                    productId: this.cardAdd.productId
                                        };
                                             // Sends deposit request with response and service details.
                                            apiService.request('event_payment_confirm', params).then((response) => {
                                                if (
                                                    response.data.code == 'PG402-05'
                                                ) {
                                                    this.loadingTerracall = true;
                                                    this.showProcess = false;
                                                    this.showOtp = true;
                                                    this.$nextTick(() => {
                                                        const container = document.getElementById('add-card-otp') as HTMLElement;
                                                        if (container) container.innerHTML = '';
                                                    
                                                        const domain = response.data.stepUpUrl
                                                        const accessToken = response.data.accessToken;
                                                    
                                                        const iframe = document.createElement('iframe');
                                                        iframe.id = 'step_up_iframe';
                                                        iframe.name = 'stepUpIframe';
                                                        iframe.width = '400';
                                                        iframe.height = '600';
                                                        iframe.style.display = 'block';
                                                        iframe.style.border = 'none';
                                                        iframe.style.margin = 'auto';
                                                        container.appendChild(iframe);
                                                    
                                                        const form = document.createElement('form');
                                                        form.method = 'POST';
                                                        form.target = 'stepUpIframe';
                                                        form.action = domain; // Sandbox URL
                                                        form.innerHTML = `
                                                            <input type="hidden" name="JWT" value="${accessToken}">
                                                            <input type="hidden" value=${response.data.transactionOriginal} name="MD" />
                                                            `;
                                                        container.appendChild(form);
                                                    
                                                        form.submit();
                                                    
                                                        let loadCount = 0;
                                                        iframe.addEventListener('load', () => {
                                                          loadCount++;
                                                        
                                                          if (loadCount === 1) {
                                                            this.loadingTerracall = false;
                                                            return;
                                                          }

                                                          if (loadCount === 2) {
                                                            this.loadingOTP = true
                                                            return;
                                                          }
                                                    
                                                          if (loadCount === 3) {
                                                            this.loadingOTP = false
                                                            this.showProcess = false;
                                                            this.showOtp = false;
                                                                iframe.remove();
                                                                
                                                                this.appComponent.modal = {
                                                                  showModal: 'notification',
                                                                  titleModal: this.$t('Satisfactorio!'),
                                                                  messageModal: this.$t('El deposito fue enviado correctamente, en los proximos minutos se vera reflejado en el saldo.'),
                                                                  buttonModal: this.$t('Aceptar'),
                                                                  orderModal: 'closeModal'
                                                                };
                                                            
                                                                this.refreshBalance();
                                                                this.emitter.emit('closeModalAddCard');
                                                          }
                                                        });
                                                    });
                                                } else if (
                                                    response.data.code == 'PG200-00'
                                                ) {
                                                    this.appComponent.modal = {
                                                    showModal: 'notification',
                                                    titleModal: this.$t('Satisfactorio!'),
                                                    messageModal: this.$t('El deposito fue enviado correctamente, en los proximos minutos se vera reflejado en el saldo.'),
                                                    buttonModal: this.$t('Aceptar'),
                                                    orderModal: 'closeModal'
                                                    };
                                                    this.buttonEnabledCard = false;
                                                    this.refreshBalance();
                                                    this.cardAdd = {
                                                        num_tarjeta: '',
                                                        expiry_month: '',
                                                        expiry_year: '',
                                                        cvv: '',
                                                        amount: '',
                                                        productId: '',
                                                        saveCard: false,
                                                        saveCardShow: false,
                                                        requireAuth: false,
                                                    };
                                                    this.emitter.emit('closeModalAddCard');
                                                    this.buttonEnabledCard = false;
                                                } else {
                                                    // Handle error response
                                                    var error_mensaje = '';
                                                    if (response.error_code != undefined) {
                                                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                                                    }
                                                    if (response.data.result != undefined) {
                                                        error_mensaje = this.$t(response.data.result);
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
                                                    this.buttonEnabledCard = false;
                                                    this.emitter.emit('closeModalAddCard');
                                                }
                                            console.log("Depósito realizado con éxito:", response);
                                        });
                                    } else {
                                        // Handle error response
                                        var error_mensaje = '';
                                        if (response.error_code != undefined) {
                                            error_mensaje = this.$t('ERROR' + response.error_code.toString());
                                        }
                                        if (response.data.result != undefined) {
                                            error_mensaje = this.$t(response.data.result);
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
                                        this.buttonEnabledCard = false;
                                        this.emitter.emit('closeModalAddCard');
                                    }
                                
                                    window.removeEventListener('message', onMessage);
                                    this.loadingTerracall  = false;
                                }
                            };
                        
                            window.addEventListener('message', onMessage);
                        });
                    } else {
                        // Show success notification modal
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Satisfactorio!'),
                            messageModal: this.$t('Depósito generado satisfactoriamente.'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.buttonEnabledCard = false;
                        this.refreshBalance();
                        this.cardAdd = {
                            num_tarjeta: '',
                            expiry_month: '',
                            expiry_year: '',
                            cvv: '',
                            amount: '',
                            productId: '',
                            saveCard: false,
                            saveCardShow: false,
                            requireAuth: false,
                        };
                        this.emitter.emit('closeModalAddCard');
                        this.buttonEnabledCard = false;
                    }
                } else {
                    // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (response.data.result != undefined) {
                        error_mensaje = this.$t(response.data.result);
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
                    this.buttonEnabledCard = false;
                    this.emitter.emit('closeModalAddCard');
                }
            });
        },
        /**
         * Function to handle card authentication.
         */
        authenticationCardFunction() {
            this.buttonEnabledCard = true;
            const params = {
                num_tarjeta: this.cardAdd.num_tarjeta.replace(/ /g, ''),
                expiry_month: this.cardAdd.expiry_month,
                expiry_year: this.cardAdd.expiry_year,
                productId: this.cardAdd.productId,
                cvv: this.cardAdd.cvv,
            };
            apiService
                .request('authentication_add_card', params)
                .then((response: any) => {
                    if (response.code == 0) {
                        this.authentication.token = response.data.token;
                        this.authentication.requestId = response.data.requestId;
                        this.authentication.referenceId = response.data.referenceId;
                        this.authentication.deviceDataCollectionUrl = response.data.deviceDataCollectionUrl;
                        let form = document.createElement('form');
                        form.method = 'POST';
                        form.action = response.data.deviceDataCollectionUrl;
                        form.target = 'collectionIframe';
                        let input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'JWT';
                        input.value = response.data.token;
                        form.appendChild(input);
                        document.body.appendChild(form);
                        form.submit();
                        let vthis = this;
                        window.addEventListener('message', messageHandler, { once: true });
                        function messageHandler(event) {
                            let rsp = JSON.parse(event.data);
                            if (
                                (event.origin === 'https://centinelapistag.cardinalcommerce.com' ||
                                    event.origin === 'https://centinelapi.cardinalcommerce.com') &&
                                vthis.dataIframe.stepUpUrl == '' &&
                                rsp.SessionId == vthis.authentication.referenceId
                            ) {
                                if (rsp.MessageType == 'profile.completed') {
                                    if (rsp.Status) {
                                        vthis.addCardFunction();
                                        form.remove();
                                    }
                                }
                            }
                        }
                    } else {
                        // Handle error response
                        var error_mensaje = '';
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString());
                        }
                        if (response.data.result != undefined) {
                            error_mensaje = this.$t(response.data.result);
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
                        this.buttonEnabledCard = false;
                        this.emitter.emit('closeModalAddCard');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        /**
         * Validates the 3D Secure response.
         */
        validation3D(value: any) {
            apiService.request('payment_challenge', value).then((response: any) => {
                if (response.code == 0) {
                    // Show success notification modal
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Satisfactorio!'),
                        messageModal: this.$t('Depósito generado satisfactoriamente.'),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                    this.buttonEnabledCard = false;
                    this.refreshBalance();
                    this.cardAdd = {
                        num_tarjeta: '',
                        expiry_month: '',
                        expiry_year: '',
                        cvv: '',
                        amount: '',
                        productId: '',
                        saveCard: false,
                        saveCardShow: false,
                        requireAuth: false,
                    };
                    this.emitter.emit('closeModalAddCard');
                    this.dataIframe.stepUpUrl = '';
                    this.buttonEnabledCard = false;
                } else {
                    // Handle error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (response.data.result != undefined) {
                        error_mensaje = this.$t(response.data.result);
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
                    this.buttonEnabledCard = false;
                }
            });
        },
        /**
         * Formats the card number input.
         */
        cc_format_num_tarjeta(value: any) {
            value = value.target.value.toString();
            if (value.length > 19) {
                this.cardAdd.num_tarjeta = null;
            } else {
                this.cardAdd.num_tarjeta = value;
            }
        },
        /**
         * Formats the expiry month input.
         */
        cc_format_expiry_month(value: any) {
            value = value.target.value.toString();
            if (value.length > 2 || parseInt(value) > 12) {
                this.cardAdd.expiry_month = null;
            } else {
                this.cardAdd.expiry_month = value;
            }
        },
        /**
         * Formats the expiry year input.
         */
        cc_format_expiry_year(value: any) {
            value = value.target.value.toString();
            if (value.length > 2) {
                this.cardAdd.expiry_year = null;
            } else {
                this.cardAdd.expiry_year = value;
            }
        },
        /**
         * Formats the CVV input.
         */
        cc_format_cvc(value: any) {
            value = value.target.value.toString();
            if (value.length > 3) {
                this.cardAdd.cvv = null;
            } else {
                this.cardAdd.cvv = value;
            }
        },
        /**
         * Accepts the modal based on the order.
         */
        acceptModal() {
            if (this.appComponent.modal.orderModal == 'acceptAddCard') {
            }
        },

        getPayments(){
            apiService.request('get_payments2', {}).then((response: any) => {
                if (response.code == 0) {
                    for (let i = 0; i < response.data.length; i++) {
                      if (response.data[i].requiredName === true) {
                        this.appComponent.requiredName = true;
                        break;
                      }
                    }
                    if (this.appComponent.requiredName === undefined) {
                      this.appComponent.requiredName = false;
                    }
                    console.log('requiredName', this.appComponent.requiredName);
                }
            });
        }
    },
});
</script>

<template>
    <!-- Modal for adding a credit card -->
    <div
        class="modal text-base-content items-center bg-base-content bg-opacity-75 z-[15000]"
        id="add-card"
    >
        <div
            class="modal-box rounded-2xl relative bg-base-300"
            v-if="dataIframe.stepUpUrl == ''"
        >
            <div
                v-if="!showProcess && !showOtp"
                class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8 bg-base-300 p-5 rounded-2xl"
            >
                    <div v-if="isLoading" class="Container InfoContent row">
                        <div class="tittle-c flex items-center justify-between">
                            <AnimatedPlaceholder class="w-16 h-3 bg-base-100 rounded-lg"/>
                            <AnimatedPlaceholder class="w-6 h-6 bg-base-100 rounded-full mb-2"/>
                        </div>
                        <div class="grid gap-4">
                            <AnimatedPlaceholder class="w-[350px] h-[228px] bg-base-100 rounded-lg"/>
                            <div class="rounded-lg h-auto border-1 border-input-background">
                                <div class="flex h-full w-full">
                                    <div class="p-3 right_side h-auto w-full rounded-r-lg">
                                        <AnimatedPlaceholder class="w-16 h-4 bg-base-100 rounded-lg mb-4"/>
                                        <AnimatedPlaceholder class="w-full h-10 bg-base-100 rounded-lg mb-4"/>
                                        <div class="w-full flex gap-3 mb-4">
                                            <div v-for="n in 3" :key="n" class="flex-col w-full">
                                                <AnimatedPlaceholder class="w-16 h-4 bg-base-100 rounded-lg mb-4"/>
                                                <AnimatedPlaceholder class="w-full h-10 bg-base-100 rounded-lg"/>
                                            </div>
                                        </div>
                                        <AnimatedPlaceholder class="w-16 h-4 bg-base-100 rounded-lg mb-4"/>
                                        <AnimatedPlaceholder class="w-full h-10 bg-base-100 rounded-lg mb-4"/>
                                        <div class="w-full flex gap-3 mb-4">
                                            <AnimatedPlaceholder class="w-4 h-4 bg-base-100 rounded-full mb-4"/>
                                            <AnimatedPlaceholder class="w-16 h-4 bg-base-100 rounded-lg"/>
                                        </div>
                                        <AnimatedPlaceholder class="w-full h-10 bg-base-100 rounded-lg mb-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div 
                    v-else class="Container InfoContent row">
                    <div class="tittle-c flex items-center justify-between">
                        <label class="inline-block">
                            <h2 class="font-bold text-neutral">{{ $t('Depositar') }}</h2>
                        </label>
                        <label
                            for="m-modal-login"
                            class="pt-2 cursor-pointer text-right float-right inline-block text-accent-focus"
                            @click="
                                appComponent.closeModal();
                                emitter.emit('closeModalAddCard');
                            "
                        >
                            <IconCloseMenu width="20" height="20" class="text-accent-focus"/>
                        </label>
                    </div>
                    <div class="grid gap-4">
                        <div class="card-img text-white">
                            <div class="px-2 mt-28 cardAdd text-center">
                                <h5 v-if="cardAdd.num_tarjeta != ''">
                                    {{ cardAdd.num_tarjeta }}
                                </h5>
                                <h5 v-if="cardAdd.num_tarjeta == ''">0000 0000 0000 0000</h5>
                            </div>
                            <div 
                                v-if="appComponent.requiredName"
                                class="px-2 cardAdd text-center">
                                <h3 v-if="cardAdd.holderName != ''">
                                    {{ cardAdd.holderName }}
                                </h3>
                                <h3 v-if="cardAdd.holderName == ''">Titular</h3>
                            </div>
                            <div class="px-2 mt-1 cardAdd text-right mr-8">
                                <span v-if="cardAdd.expiry_month != ''">{{ cardAdd.expiry_month }}</span>
                                <span v-if="cardAdd.expiry_month == ''">00</span>
                                <span v-if="cardAdd.expiry_year != null">/</span>
                                <span v-if="cardAdd.expiry_year != ''">{{ cardAdd.expiry_year }}</span>
                                <span v-if="cardAdd.expiry_year == ''">00</span>
                            </div>
                            <div class="px-2 mt-1 cardAdd text-right mr-8">
                                <span v-if="cardAdd.cvv != ''">{{ cardAdd.cvv }}</span>
                                <span v-if="cardAdd.cvv == ''">000</span>
                            </div>
                        </div>
                        <div class="rounded-lg h-auto bg-base-200 border-1 border-input-background">
                            <div class="flex h-full w-full">
                                <div class="p-3 right_side h-auto w-full rounded-r-lg">
                                    <div>
                                        <div 
                                            v-if="appComponent.requiredName"
                                            class="mt-4 relative">
                                            <input
                                                class="input_number border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900 my-input-num-card"
                                                type="text"
                                                placeholder="Nombre del titular"
                                                v-model="cardAdd.holderName"
                                            />
                                            <label class="text-xs absolute -top-5 left-0 text-neutral">{{
                                                $t('Nombre del titular')
                                            }}</label>
                                        </div>
                                        <div class="mt-6 relative">
                                            <input
                                                class="input_number border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900 my-input-num-card"
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                v-model="cardAdd.num_tarjeta"
                                                v-on:input="cc_format_num_tarjeta($event)"
                                                onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;
                         if(event.target.value.length > 18) return false
                        "
                                                v-mask="'0000 0000 0000 0000 0000'"
                                            />
                                            <label class="text-xs absolute -top-5 left-0 text-neutral">{{
                                                $t('Número de la Tarjeta')
                                            }}</label>
                                        </div>
                                        <div class="mt-9 w-full flex gap-3">
                                            <div class="relative w-full">
                                                <input
                                                    class="input_expiry border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
                                                    placeholder="00"
                                                    v-model="cardAdd.expiry_month"
                                                    v-on:input="cc_format_expiry_month($event)"
                                                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false; if(event.target.value.length > 1) return false;"
                                                />
                                                <label class="text-xs absolute -top-5 left-0 text-neutral">{{
                                                    $t('Vencimiento Mes')
                                                }}</label>
                                            </div>
                                            <div class="relative w-full">
                                                <input
                                                    class="input_expiry border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
                                                    placeholder="00"
                                                    v-model="cardAdd.expiry_year"
                                                    v-on:input="cc_format_expiry_year($event)"
                                                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false; if(event.target.value.length > 1) return false;"
                                                />
                                                <label class="text-xs absolute -top-5 left-0 text-neutral">{{
                                                    $t('Vencimiento Año')
                                                }}</label>
                                            </div>
                                            <div class="relative w-full">
                                                <input
                                                    class="input_cvv border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
                                                    type="text"
                                                    placeholder="000"
                                                    v-model="cardAdd.cvv"
                                                    v-on:input="cc_format_cvc($event)"
                                                    onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false; if(event.target.value.length > 2) return false;"
                                                />
                                                <label class="text-xs absolute -top-5 left-0 text-neutral">{{
                                                    $t('Código Seguridad')
                                                }}</label>
                                            </div>
                                        </div>
                                        <div
                                            v-if="
                                                cardAdd.Commission != undefined &&
                                                cardAdd.Commission != null &&
                                                cardAdd.Commission != ''
                                            "
                                            class="mt-9 mb-5 flex flex-col justify-center items-center text-center gap-8"
                                        >
                                            <div class="relative w-full cursor-not-allowed">
                                                <span
                                                    class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full"
                                                    >{{ cardAdd.amount }}</span
                                                >
                                                <label class="text-xs absolute -top-5 left-0">{{
                                                    $t('Monto solicitado')
                                                }}</label>
                                            </div>
                                            <div class="relative w-full cursor-not-allowed">
                                                <span
                                                    class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full"
                                                    >{{
                                                        (cardAdd.amount * (cardAdd.Commission / 100)).toFixed(2)
                                                    }}</span
                                                >
                                                <label class="text-xs absolute -top-5 left-0"
                                                    >{{ $t('Valor comisión') }} ({{ cardAdd.Commission }}%)</label
                                                >
                                            </div>
                                            <div class="relative w-full cursor-not-allowed">
                                                <span
                                                    class="h-12 w-full transition-all px-2 outline-none border-2 border-base-content border-solid flex justify-center items-center rounded-full"
                                                    >{{
                                                        cardAdd.amount + cardAdd.amount * (cardAdd.Commission / 100)
                                                    }}</span
                                                >
                                                <label class="text-xs absolute -top-5 left-0">{{ $t('Total') }}</label>
                                            </div>
                                        </div>
                                        <div
                                            v-else
                                            class="mt-9 mb-5 relative text-center"
                                        >
                                            <div class="relative w-full">
                                                <input
                                                    disabled
                                                    class="input_cvv border-primary bg-input-background text-neutral h-12 w-full transition-all px-2 outline-none focus:border-blue-900"
                                                    type="number"
                                                    placeholder="000"
                                                    v-model="cardAdd.amount"
                                                    onkeypress="return event.charCode >= 46 && event.charCode <= 57"
                                                />
                                                <label class="text-xs absolute -top-5 left-0 text-neutral">{{ $t('Valor') }}</label>
                                            </div>
                                        </div>
                                        <div
                                            class="relative w-full flex pb-3"
                                            v-if="cardAdd.saveCardShow"
                                        >
                                            <input
                                                type="checkbox"
                                                v-model="cardAdd.saveCard"
                                                class="rounded-full border-primary bg-input-background"
                                            />
                                            <label class="text-xs -top-5 left-0 pl-3 text-neutral">{{
                                                $t('Guardar tarjeta de crédito')
                                            }}</label>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button
                                            class="pay_now outline-none rounded-3xl text-neutral h-12 w-full bg-primary text-sm cursor-pointer transition-all hover:bg-primary-focus"
                                            @click="addCard()"
                                            v-hide="buttonEnabledCard"
                                        >
                                            {{ $t('Depositar') }}
                                        </button>
                                        <button
                                            v-hide="!buttonEnabledCard"
                                            disabled
                                            class="pay_now outline-none rounded-3xl text-neutral h-12 w-full bg-green-500 text-sm cursor-pointer transition-all hover:bg-green-800"
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
                                            </svg>
                                            {{ $t('Depositar') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Process and OTP containers -->
            <div 
              id="add-card-process" 
              v-if="showProcess && !showOtp"
              class="relative z-[10] hidden"
            ></div>
            <!-- OTP Container -->
            <div 
              id="add-card-otp" 
              v-if="showOtp"
              class="relative z-[10]"
            ></div>

            <!-- Loading OTP Transition -->
            <transition name="fade">
                <div
                  v-if="loadingOTP"
                  class="absolute inset-0 flex items-center justify-center bg-neutral/70 backdrop-blur-sm z-[300]"
                >
                  <div
                    class="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-2xl border border-gray-300 text-center"
                  >
                    <svg
                      class="animate-spin h-10 w-10 mb-3 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <p class="text-neutral font-semibold text-base mt-1">
                      {{ $t('Validando OTP, por favor espera...') }}
                    </p>
                  </div>
                </div>
            </transition>


        </div>
    </div>
    <iframe
        id="cardinal_collection_iframe"
        name="collectionIframe"
        width="1"
        height="1"
    ></iframe>
    

</template>

<style scoped>
/* Global styles for text color */
* {
    color: black;
}

/* Styles for card number display */
.cardAdd h5 {
    font-weight: bold;
    font-size: 22px !important;
    color: #979797;
}

/* Styles for card number display */
.cardAdd h3 {
    font-weight: bold;
    color: #979797;
}

/* Styles for card details display */
.cardAdd span {
    font-weight: bold;
    font-size: 18px !important;
    color: #979797;
}

/* Background image for card display */
.card-img {
    background: url(https://images.virtualsoft.tech/m/msjT1650494523.png);
    background-repeat: no-repeat;
    background-size: contain;
    height: 205px;
}

/* Title styles */
.tittle-c {
    border-bottom: 2px solid hsl(var(--af));
    margin-bottom: 12px;
}

/* Input styles for card number */
.my-input-num-card {
    letter-spacing: 2px;
    text-align: center;
}

/* Input styles for card details */
.my-input-num-card,
input.input_expiry,
input.input_cvv {
    background-color: white;
    text-align: center;
    border: 2px solid black;
    border-radius: 55px;
}

/* Responsive styles for smaller screens */
@media (max-width: 800px) {
    .right_side {
        width: 100%;
        border-top-left-radius: 9px;
        border-bottom-left-radius: 9px;
    }
}
</style>

<!-- FILE DOCUMENTED -->

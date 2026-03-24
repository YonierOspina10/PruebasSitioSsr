<script lang="ts">
// Importing the useCookies function from the vue3-cookies library for cookie management
import { useCookies } from 'vue3-cookies';
// Importing defineComponent from Vue to define a new component
import { defineComponent, reactive } from 'vue';
// Importing the router instance for navigation
import router from '@/router';
// Importing the apiService for making API calls
import apiService from '@/services/ApiService';
// Importing ArrowDown icon component
import ArrowDown from '@/components/icons/ArrowDownIcon.vue';
// Importing IconCheckV2 icon component
import IconCheckV2 from '@/components/icons/IconCheckv2.vue';
// Importing Button component from Flowbite Vue library
import { Button } from 'flowbite-vue';
// Importing ExitIcon component
import ExitIcon from '@/components/icons/ExitIcon.vue';
// Importing AppForm component
import AppForm from '@/components/Form.vue';
// Importing useRoute from Vue Router for route management
import { useRoute } from 'vue-router';
// Importing AnimatedPlaceholder component
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import MethodsDepositV3 from '@/components/MethodsDepositV3.vue';
import IconClose from './icons/IconClose.vue';
// Focus directive to automatically focus an element when mounted
const focus = {
    mounted: (event) => {
        event.focus(); // Sets focus on the event target
    },
};

type PaymentStep =
    | 'payment-method-selection'
    | 'gateway-selection'
    | 'deposit-method-selection'
    | 'payment-data-entry'
    | 'operation-validation';

interface PaymentStateProps {
    active: boolean;
    currentStep: PaymentStep | null;
}

interface PaymentProcessUpdate {
    isPaymentActive?: boolean;
    currentStep?: PaymentStep | null;
}

// Exporting the component definition
export default defineComponent({
    /**
     * Vue.js directives used in the component.
     *
     * @type {Object}
     */
    directives: {
        /**
         * Custom directive to manage focus on elements.
         *
         * @type {Object}
         */
        focus,
    },
    /**
     * Components registered for use within the Vue instance.
     * Each component can be utilized in the template section of the Vue component.
     */
    components: {
        MethodsDepositV3,
        /**
         * AnimatedPlaceholder component for displaying a placeholder with animation.
         */
        AnimatedPlaceholder,

        /**
         * AppForm component for handling form submissions and validations.
         */
        AppForm,

        /**
         * IconCheckV2 component representing a checkmark icon.
         */
        IconCheckV2,

        /**
         * ExitIcon component for displaying an exit or close icon.
         */
        ExitIcon,
        /**
         * IconClose component for displaying an exit or close icon.
         */
        IconClose,

        /**
         * Button component for creating clickable buttons with various styles.
         */
        Button,

        /**
         * ArrowDown component representing a downward arrow icon.
         */
        ArrowDown,
    },
    data() {
        // Retrieve configuration settings
        let config = this.$config();
        // Get the event emitter instance
        let emitter = this.$emitter();
        // Reference to the main application component
        let appComponent: any = this.$appComponent;
        // Function to refresh the balance
        let refreshBalance = this.$refreshBalance;

        // Modal parameters
        let paramsModal: any = {};

        // Payment gateways and methods
        let pasarelas_pago: any = []; // Array of payment gateways
        let pasarelas_pago_v2: Array<any> = []; // Version 2 of payment gateways
        let metodos_pago: any = []; // Array of payment methods
        let methods_payments: any = []; // Array of payment methods
        let metodos_pago_info: any = []; // Information about payment methods
        let credit_cards: any = []; // Array of credit cards
        let metodos_pago_crypto: any = []; // Array of cryptocurrency payment methods
        let config_methods: any = []; // Configuration for payment methods
        let cant_metodos_online = 0; // Count of online payment methods
        let flag_m = false; // Flag for a specific condition
        let model: any = {}; // Model object for data binding
        let modelCards: any = {}; // Model for card information
        let cvv: any = {}; // CVV information object
        let buttonEnabled: boolean = true; // Button enabled state
        let buttonEnabledCard: boolean = false; // Card button enabled state
        let modalMetodos: boolean = false; // Modal visibility for payment methods
        let numberPay: number = 10; // Number of payments
        let selectedPayment: any; // Selected payment method
        let selectedPasarela: any; // Selected payment gateway
        let amountPayment: any = null; // Amount to be paid
        let id_pasarela: any; // ID of the selected payment gateway
        let mobile: any; // Mobile number
        let loadingM = false; // Loading state
        let selLabelClick = false; // Label click state
        let numAccountZelle = 0
        let numAccountPaypal = 0
        let arraySelects = {};
        let otherView = false
        let disabledButton: boolean = true;
        let idAccountSelect = '';
        // Object to hold card addition details
        let cardAdd: any = {
            num_tarjeta: '', // Card number
            expiry_month: '', // Expiry month
            expiry_year: '', // Expiry year
            cvv: '', // CVV code
            amount: null, // Amount for the transaction
            productId: '', // Product ID associated with the payment
            saveCard: false, // Flag to save card information
            saveCardShow: false, // Flag to show save card option
            requireAuth: false, // Flag to require authentication
        };

        let dataOtherView = {
            nameP: '',
            id: ''
        }

        // Modal visibility states
        let showModalVerifyCodePhone: boolean = false; // Verify phone code modal
        let showModalDataText: boolean = false; // Data text modal
        let showModalNeedApproval: boolean = false; // Approval needed modal
        let showModalAddCard: boolean = false; // Add card modal

        // Verification details
        let emailVerifyPhone: string = ''; // Email for phone verification
        let codeVerifyPhone: string = ''; // Verification code for phone
        let orderModal: string = ''; // Order details for modal
        let dataText: string = ''; // Text data for modal
        let dataTitle: string = ''; // Title data for modal
        let dataImg: string = ''; // Image data for modal
        let onRecharge: boolean = false; // Flag for recharge state
        let currenciesList: any = []; // List of available currencies
        let currencySelected: any = {}; // Selected currency object
        let step: number = 1; // Current step in a process
        let methodSelected: any = {}; // Selected payment method object
        let disabledButtonDeposit: boolean = true; // Deposit button disabled state
        let disableAddCardButton: boolean = false;

        // Object to hold deposit value details
        let valueDeposit: any = {
            input: '', // Input value for deposit
            msg: '', // Message related to deposit
            color: '', // Color indication for deposit
            validate: false, // Validation state for deposit
        };

        // Object to hold operation value details
        let valueOperation: any = {
            input: '', // Input value for operation
            msg: '', // Message related to operation
            color: '', // Color indication for operation
            validate: false, // Validation state for operation
        };

        // Object to hold date value details
        let valueDate: any = {
            input: '', // Input value for date
            msg: '', // Message related to date
            color: '', // Color indication for date
            validate: false, // Validation state for date
        };

        const paymentFlowState = reactive<PaymentStateProps>({
            active: false,
            currentStep: null,
        });
        let zelleSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.9893 95H45.0748C44.5827 95 44.1107 94.8092 43.7628 94.4695C43.4148 94.1298 43.2193 93.6691 43.2193 93.1888V82.82H25.5586C24.8803 82.819 24.2301 82.5556 23.7505 82.0874C23.2709 81.6192 23.001 80.9846 23 80.3225V71.945C23.0004 71.385 23.1924 70.8413 23.5455 70.4L54.8137 31.4675H26.9609C26.2813 31.4675 25.6295 31.204 25.1489 30.7349C24.6684 30.2658 24.3984 29.6296 24.3984 28.9662V19.6775C24.3984 18.3013 25.5471 17.18 26.957 17.18H43.2077V6.81125C43.2077 5.81375 44.0414 5 45.0633 5H55.9778C56.9997 5 57.8334 5.81375 57.8334 6.81125V17.18H74.4414C75.8513 17.18 77 18.3013 77 19.6775V27.6912C76.999 28.2482 76.8085 28.789 76.4583 29.2288L44.9942 68.5325H74.4414C75.8513 68.5325 77 69.6537 77 71.03V80.3187C77 80.9815 76.7306 81.6171 76.2508 82.0861C75.7711 82.555 75.1203 82.819 74.4414 82.82H57.8449V93.1888C57.8449 93.6691 57.6494 94.1298 57.3014 94.4695C56.9534 94.8092 56.4815 95 55.9893 95Z" fill="currentColor"/></svg>`
        let paypalSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52.0489 8C63.7364 8 73.0447 16.375 75.1489 26.9458C82.9781 30.9625 87.8031 39.7667 86.1781 49.0583L85.9864 50.0208L85.7864 50.925C84.5905 56.3051 81.6502 61.1393 77.4229 64.6756C73.1956 68.2119 67.9182 70.2522 62.4114 70.4792L61.3822 70.5H55.3281L53.1739 84.2875C52.8846 86.1351 51.9824 87.8316 50.6122 89.1043C49.242 90.377 47.4836 91.1518 45.6197 91.3042L44.9406 91.3333H36.7072C34.6028 91.3338 32.5762 90.538 31.0343 89.1059C29.4924 87.6737 28.5494 85.7112 28.3947 83.6125L28.3739 83H21.3322C20.1804 82.9999 19.0411 82.7609 17.9862 82.2983C16.9314 81.8356 15.9839 81.1593 15.2036 80.3121C14.4233 79.4648 13.8271 78.465 13.4526 77.3757C13.0782 76.2864 12.9336 75.1313 13.0281 73.9833L13.0989 73.3792L21.6656 18.5708C22.106 15.7501 23.4987 13.1652 25.6121 11.2458C27.7255 9.32648 30.4323 8.1884 33.2822 8.02083L34.0156 8H52.0531H52.0489ZM74.9156 37.1125L74.8781 37.2625C73.3903 43.1856 69.9674 48.4425 65.1525 52.1992C60.3375 55.9559 54.406 57.9974 48.2989 58H40.6031L37.3531 78.8333H37.3614L36.7072 83H44.9406L47.0947 69.2125C47.4017 67.2494 48.4001 65.4605 49.9098 64.1686C51.4194 62.8766 53.3411 62.1667 55.3281 62.1667H61.3822C65.1736 62.166 68.8515 60.8727 71.8088 58.5002C74.7661 56.1277 76.8262 52.8177 77.6489 49.1167L77.8531 48.2125C78.2896 46.2624 78.2506 44.2358 77.7393 42.3039C77.2281 40.372 76.2596 38.5915 74.9156 37.1125ZM52.0531 16.3333H34.0072C33.0942 16.3338 32.2066 16.6342 31.4809 17.1882C30.7552 17.7423 30.2316 18.5194 29.9906 19.4L29.8947 19.8583L21.3322 74.6667H29.5656L32.3697 56.7125C32.6592 54.8643 33.5621 53.1672 34.9331 51.8945C36.3041 50.6217 38.0635 49.8473 39.9281 49.6958L40.6031 49.6667H48.2947C57.0447 49.6667 64.6697 43.7167 66.7947 35.2375C67.3419 33.0593 67.3996 30.7869 66.9636 28.5837C66.5276 26.3805 65.6088 24.3014 64.2733 22.4957C62.9378 20.69 61.2187 19.2028 59.2397 18.1408C57.2607 17.0789 55.071 16.4687 52.8281 16.3542L52.0489 16.3333H52.0531Z" fill="currentColor"/></svg>`
        let loadingError: boolean = false;
        // Return the data object containing all the defined variables
        return {
            loadingError,
            noGateways: false,
            zelleSVG,
			paypalSVG,
            numberPay,
            config,
            emitter,
            amountPayment,
            appComponent,
            refreshBalance,
            paramsModal,
            pasarelas_pago,
            pasarelas_pago_v2,
            metodos_pago,
            methods_payments,
            credit_cards,
            metodos_pago_crypto,
            config_methods,
            cant_metodos_online,
            flag_m,
            model,
            modelCards,
            cvv,
            buttonEnabled,
            buttonEnabledCard,
            modalMetodos,
            selectedPayment,
            selectedPasarela,
            id_pasarela,
            mobile,
            loadingM,
            selLabelClick,
            cardAdd,
            showModalVerifyCodePhone,
            showModalDataText,
            showModalNeedApproval,
            showModalAddCard,
            emailVerifyPhone,
            codeVerifyPhone,
            orderModal,
            dataText,
            dataTitle,
            dataImg,
            onRecharge,
            currenciesList,
            currencySelected,
            step,
            methodSelected,
            valueDeposit,
            valueOperation,
            valueDate,
            disabledButtonDeposit,
            metodos_pago_info,
            paymentFlowState,
            numAccountZelle,
            arraySelects,
            dataOtherView,
            otherView,
            disabledButton,
            idAccountSelect,
            numAccountPaypal,
            disableAddCardButton
        };
    },
    /**
     * Setup function for the component.
     *
     * @returns {Object} An object containing the cookies and route objects.
     */
    setup() {
        // Retrieves the cookies object for managing browser cookies.
        const { cookies } = useCookies();

        // Retrieves the current route object for accessing route information.
        const route = useRoute();

        // Returns the cookies and route objects for use in the component.
        return { cookies, route };
    },
    mounted() {
        // Assigns a function to copy a string to the clipboard
        (window as any).copyStringToClipboard = function(string) {
            let textarea; // Variable to hold the textarea element
            let result; // Variable to store the result of the copy command
            try {
                textarea = document.createElement('textarea'); // Create a textarea element
                textarea.setAttribute('readonly', true); // Set textarea as readonly
                textarea.setAttribute('contenteditable', true); // Make textarea editable
                textarea.style.position = 'fixed'; // Fix position to avoid scrolling
                textarea.value = string; // Set the value of textarea to the string to copy
                document.body.appendChild(textarea); // Append textarea to the body
                textarea.focus(); // Focus on the textarea
                textarea.select(); // Select the content of the textarea
                const range = document.createRange(); // Create a range object
                range.selectNodeContents(textarea); // Select the contents of the textarea
                const sel = window.getSelection() as any; // Get the current selection
                sel.removeAllRanges(); // Clear any existing selections
                sel.addRange(range); // Add the new range to the selection
                textarea.setSelectionRange(0, textarea.value.length); // Set selection range
                result = document.execCommand('copy'); // Execute the copy command
            } catch (err) {
                console.error(err); // Log any errors to the console
                result = null; // Set result to null on error
            } finally {
                document.body.removeChild(textarea); // Remove textarea from the body
            }
            if (!result) { // If copy command failed
                const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0; // Check if the platform is Mac
                const copyHotkey = isMac ? '⌘C' : 'CTRL+C'; // Determine the copy hotkey
                result = prompt(`Press ${copyHotkey}`, string); // Prompt user to copy manually
                if (!result) {
                    return false; // Return false if user cancels
                }
            }
            window.alert('Código copiado!'); // Alert user that the code has been copied
            return true; // Return true indicating success
        };
        // Check if depositFromLanding is not null
        if (this.appComponent.depositFromLanding != null) {
            this.appComponent.disabledButtonForm = true; // Disable the button form
            setTimeout(() => {
                // Set the model value based on depositFromLanding
                this.model[this.appComponent.depositFromLanding.service.id] =
                    this.appComponent.depositFromLanding.amount;
                this.MetodoPago(this.appComponent.depositFromLanding.service); // Call payment method
            }, 1000); // Delay execution by 1 second
        }
        // Event listener for accepting modal
        this.emitter.on('accept:modal', () => {
            this.appComponent.closeModal(); // Close the modal
            this.acceptModal(); // Accept the modal
            this.appComponent.gAnalytics('deposit_accept'); // Track analytics event
        });
        // Event listener for closing card addition modal
        this.emitter.on('closeModalAddCard', () => {
            // Reset card addition form fields
            this.cardAdd = {
                num_tarjeta: '',
                expiry_month: '',
                expiry_year: '',
                cvv: '',
                amount: null,
                productId: '',
                saveCard: false,
                saveCardShow: false,
                requireAuth: false,
            };
        });
        this.loadingM = true; // Set loading state to true
        // Redirect to home if wallet session is active
        if (this.appComponent.session.wallet == '1') {
            router.push('/home'); // Navigate to home route
        }
        // Check the current route and fetch payments accordingly
        if (this.route.path == '/landing/depositos' || this.route.path == '/landing/depositos-ecuador') {
            this.getPaymentsLanding(); // Fetch landing payments
        } else {
            this.getPayments(); // Fetch general payments
        }
        // Set payment methods info based on config
        this.metodos_pago_info =
            this.config != undefined && this.config.deposists != undefined ? this.config.deposists : [];
        // Fetch credit card payments if configured
        if (
            this.config.depositos != undefined &&
            this.config.depositos.creditCardsPayments != undefined &&
            this.config.depositos.creditCardsPayments[this.appComponent.country] != undefined &&
            this.config.depositos.creditCardsPayments[this.appComponent.country] &&
            this.config.depositos.creditCardsPayments && window.location.href.indexOf('/landing/depositos') == -1
        ) {
            apiService.request('get_credit_cards', {}).then((response: any) => {
                if (response.code == 0) {
                    let cc: any = []; // Array to hold active credit cards
                    response.data.cards.forEach((item: any) => {
                        if (item.state == 'A') {
                            cc.push(item); // Add active cards to the array
                        }
                    });
                    this.credit_cards = cc; // Assign active cards to the component
                }
                this.loadingM = false; // Set loading state to false
            });
        }
        // Fetch crypto payments if configured
        if (
            this.config.depositos != undefined &&
            this.config.depositos.cryptoPayments != undefined &&
            this.config.depositos.cryptoPayments
        ) {
            const params = {
                is_crypto: true, // Parameter to indicate crypto payments
            };
            apiService.request('get_payments2', params).then((response: any) => {
                if (response.code == 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        // Clean up max and min values
                        response.data[i].max = response.data[i].max.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        response.data[i].min = response.data[i].min.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        this.model[response.data[i].id] =
                            this.appComponent.DefaultAmountDeposits ?? response.data[i].valor; // Set model value
                    }
                    this.metodos_pago_crypto = response.data; // Assign crypto payment methods
                    // Check for coupons configuration
                    if (
                        this.config.coupons[this.appComponent.country] != undefined &&
                        this.config.coupons[this.appComponent.country].show != undefined &&
                        this.config.coupons[this.appComponent.country].show
                    ) {
                        this.metodos_pago_crypto.unshift({
                            id: 'coupons', // Add coupon option to the beginning of the array
                            imagen: '',
                            imagentxt: 'Cupón de Recarga',
                            max: '0',
                            min: '0',
                            nombre: 'Introduzca su cupón de recarga',
                            pasarela: '',
                            pasarelatxt:
                                this.config.partner_name != undefined
                                    ? this.config.partner_name
                                    : this.config.name + ' Cupones',
                            tiempo: null,
                            valor: null,
                        });
                    }
                } else {
                    // Handle case where response code is not 0
                    if (
                        this.config.coupons[this.appComponent.country] != undefined &&
                        this.config.coupons[this.appComponent.country].show != undefined &&
                        this.config.coupons[this.appComponent.country].show
                    ) {
                        this.metodos_pago_crypto.unshift({
                            id: 'coupons', // Add coupon option to the beginning of the array
                            imagen: '',
                            max: '0',
                            min: '0',
                            nombre: 'Cupón',
                            pasarela: '',
                            tiempo: null,
                            valor: null,
                        });
                    }
                }
                this.loadingM = false; // Set loading state to false
            });
        }
        // Check for currency change button configuration
        if (
            this.appComponent.config.header !== undefined &&
            this.appComponent.config.header.currencyChangeButton !== undefined &&
            this.appComponent.config.header.currencyChangeButton[this.appComponent.country] !== undefined &&
            this.appComponent.config.header.currencyChangeButton[this.appComponent.country]
        ) {
            apiService.request('user_currency', {}).then((response: any) => {
                if (response.code === 0 && response.data.length > 0) {
                    response.data.forEach((item) => {
                        if (item.Currency === this.appComponent.session.moneda) {
                            this.currenciesList.push(item);
                        }
                    });
                    this.loadingSpin = false;
                } else {
                    var error_mensaje = '';
                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
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
        }

        if (  this.config.depositos != undefined &&
            this.config.depositos.creditCardsPayments != undefined &&
            this.config.depositos.creditCardsPayments[this.appComponent.country] != undefined &&
            this.config.depositos.creditCardsPayments[this.appComponent.country] &&
            window.location.href.indexOf('/landing/depositos') == -1 ) {
            apiService.request('provider_credit_cards_details', {}).then((response: any) => {
                console.log(response);
                if (response.code == 0) {
                    if(response.data.allowAddingCards != undefined && response.data.allowAddingCards) {
                        this.disableAddCardButton = response.data.allowAddingCards
                    } else {
                        this.disableAddCardButton = false
                    }
                }else {
                    this.disableAddCardButton = false
                }
            });
        }

        setTimeout(() => {
            if (!window.localStorage.getItem('newViewDeposit') || window.localStorage.getItem('newViewDeposit') == 'false') {
                // Check for error in URL and display appropriate modal
                if (window.location.href.indexOf('error') != -1) {
                    if (this.$route.query.id !== undefined) {
                        let error_mensaje = this.$t('ERROR' + this.$route.query.id.toString());
                        this.appComponent.modal = {
                            showModal: 'notification', // Show notification modal
                            titleModal: this.$t('Error!'), // Set modal title
                            messageModal: error_mensaje, // Set modal message
                            buttonModal: this.$t('Aceptar'), // Set button text
                            orderModal: 'closeModal', // Set order for modal action
                        };
                    } else {
                        this.appComponent.modal = {
                            showModal: 'notification', // Show notification modal
                            titleModal: this.$t('Error!'), // Set modal title
                            messageModal: this.$t('Ocurrio un error en el deposito.'), // Set modal message
                            buttonModal: this.$t('Aceptar'), // Set button text
                            orderModal: 'closeModal', // Set order for modal action
                        };
                    }
                }
                // Check for pending deposit in URL and display appropriate modal
                if (window.location.href.indexOf('pendiente') != -1) {
                    this.appComponent.modal = {
                        showModal: 'notification', // Show notification modal
                        titleModal: this.$t('Mensaje'), // Set modal title
                        messageModal: this.$t(
                            'Su deposito esta pendiente, si el deposito es satisfactorio, se verá reflejado en su saldo en unos minutos.',
                        ), // Set modal message
                        buttonModal: this.$t('Aceptar'), // Set button text
                        orderModal: 'closeModal', // Set order for modal action
                    };
                }
                // Check for successful deposit in URL and display appropriate modal
                if (window.location.href.indexOf('correcto') != -1) {
                    if (
                        this.appComponent.config.depositos != undefined &&
                        this.appComponent.config.depositos.ThankYouDeposit != undefined &&
                        this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country] != undefined &&
                        this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country].version !=
                        undefined &&
                        this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country].version == 2
                    ) {
                        this.appComponent.modal.showModal = 'thankYouDeposit'; // Show thank you modal
                    } else {
                        this.appComponent.modal = {
                            showModal: 'notification', // Show notification modal
                            titleModal: this.$t('Mensaje'), // Set modal title
                            messageModal: this.$t(
                                'El deposito fue enviado correctamente, en los proximos minutos se vera reflejado en el saldo.',
                            ), // Set modal message
                            buttonModal: this.$t('Aceptar'), // Set button text
                            orderModal: 'thankYouDeposit', // Set order for modal action
                        };
                    }
                }
            }
        }, 1000); // Delay execution by 1 second
    },
    /**
     * Lifecycle hook that is called when the component is unmounted.
     * This method is responsible for cleaning up event listeners.
     */
    unmounted() {
        // Remove the 'closeModalAddCard' event listener from the emitter
        this.emitter.all.delete('closeModalAddCard');
        // Remove the 'accept:modal' event listener from the emitter
        this.emitter.all.delete('accept:modal');
    },
    methods: {
        /**
         * Displays a modal with information.
         * @param {string} info - The information message to display in the modal.
         */
        onModalInfo(info) {
            this.appComponent.modal = {
                showModal: 'notification',
                titleModal: this.$t('Información'),
                messageModal: this.$t(info),
                buttonModal: this.$t('Aceptar'),
                orderModal: 'closeModal',
            };
        },
        /**
         * Fetches payment methods and updates the component state.
         */
        getPayments() {
            this.loadingM = true; // Set loading state to true
            this.loadingError = false; // Reset loading error state
            this.noGateways = false; 
            let params = {};
            // Check if currency change button is defined for the current country
            if (
                this.appComponent.config.header !== undefined &&
                this.appComponent.config.header.currencyChangeButton !== undefined &&
                this.appComponent.config.header.currencyChangeButton[this.appComponent.country] !== undefined &&
                this.appComponent.config.header.currencyChangeButton[this.appComponent.country]
            ) {
                params = { user_id: this.currencySelected.Id };
            }

            const timeout = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('timeout'));
                }, 10000); // Set timeout for 10 seconds
            });
            // Request payment methods from the API
            Promise.race([
                apiService.request('get_payments2', params),
                timeout
                ]).then((response: any) => {
                if (response.code == 0) {
                    if (!response.data || response.data.length === 0) {
                        this.noGateways = true;
                        this.loadingM = false;
                        return;
                    }
                    let zelle = {};
                    let paypal = {};
                    // Process each payment method returned
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].max = response.data[i].max.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        response.data[i].min = response.data[i].min.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        this.model[response.data[i].id] =
                            this.appComponent.DefaultAmountDeposits ?? response.data[i].valor;

                        if(response.data[i].externo_id == 'Paypal') {
                            paypal = response.data[i];
                        }
                        else if(response.data[i].externo_id == 'Zelle') {
                            zelle = response.data[i];
                        }
                    }
                    if(this.appComponent.config != undefined && this.appComponent.config.digitalsAccountWithdraw != undefined && this.appComponent.config.digitalsAccountWithdraw){
                        this.getAccount(zelle);
                        this.getAccount(paypal);
                    }
                    this.flag_m = true;
                    this.metodos_pago = response.data;
                    this.methods_payments = this.metodos_pago.filter((item) => {
                        return item.nombre_pasarela !== 'Depositos Manuales'
                    });
                    this.pasarelas_pago = [];
                    // Create a unique list of payment gateways
                    for (const item of this.metodos_pago) {
                        let customObj = {
                            id: item.id_pasarela,
                            img: item.pasarela,
                        };
                        this.pasarelas_pago.push(customObj);
                        var hash = {};
                        this.pasarelas_pago = this.pasarelas_pago.filter(function(current) {
                            var exists = !hash[current.id];
                            hash[current.id] = true;
                            return exists;
                        });
                    }
                    // Process tags for payment methods
                    this.metodos_pago.forEach((element) => {
                        if (element.tag) {
                            element.tag.forEach((item) => this.pasarelas_pago_v2.push({ id: item, pasarela: element }));
                        } else {
                            this.pasarelas_pago_v2.push({ id: '', pasarela: element });
                        }
                    });
                    // Reduce payment gateways to a unique structure
                    this.pasarelas_pago_v2 = this.pasarelas_pago_v2.reduce(function(results, org) {
                        if (org.id) {
                            const existing = results.find((item) => item.id === org.id);
                            if (existing) {
                                existing.pasarelas.push(org);
                            } else {
                                results.push({ id: org.id, pasarelas: [org], open: false });
                            }
                        } else {
                            results.push({ id: '', pasarelas: [org], open: false });
                        }
                        return results;
                    }, []);
                    this.config_methods = [];
                    // Count online payment methods and configurable methods
                    this.metodos_pago.forEach((value) => {
                        if (!value.isInfo && value.id != 'coupons') {
                            this.cant_metodos_online = this.cant_metodos_online + 1;
                        }
                        if (value.isConfigurable != undefined && value.isConfigurable == true) {
                            this.config_methods.push(value);
                            this.isFri = value.nombre.includes('Fri');
                            console.log(this.isFri);                   
                        }
                    });
                    // Filter out configurable payment methods
                    this.metodos_pago = this.metodos_pago.filter((item) => {
                        return item.isConfigurable == undefined || item.isConfigurable == false;
                    });

                    // payment methods with image first 
                    this.metodos_pago = this.metodos_pago.sort((a, b) => {
                        if (a.imagen && !b.imagen) return -1;
                        if (!a.imagen && b.imagen) return 1;
                        return 0; 
                    });
                    this.loadingM = false;
                } else {
                    // Handle case where response code is not 0
                    if (
                        this.config.coupons[this.appComponent.country] != undefined &&
                        this.config.coupons[this.appComponent.country].show != undefined &&
                        this.config.coupons[this.appComponent.country].show
                    ) {
                        this.metodos_pago.unshift({
                            id: 'coupons',
                            imagen: '',
                            max: '0',
                            min: '0',
                            nombre: 'Cupón',
                            pasarela: '',
                            tiempo: null,
                            valor: null,
                        });
                    }

                    this.loadingM = false; // Set loading state to false
                    this.loadingError = true
                }
            }).catch(() => {
        this.loadingError = true;
        // loadingM se mantiene en true
    });
        },
        /**
         * Fetches payment methods for the landing page.
         */
        async getPaymentsLanding() {
            await apiService.request('get_payments2', {}).then((response: any) => {
                if (response.code == 0) {
                    // Process each payment method returned
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].max = response.data[i].max.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        response.data[i].min = response.data[i].min.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        this.model[response.data[i].id] =
                            this.appComponent.DefaultAmountDeposits ?? response.data[i].valor;
                    }
                    this.flag_m = true;
                    this.metodos_pago = response.data;
                    this.pasarelas_pago = [];
                    // Create a unique list of payment gateways
                    for (const item of this.metodos_pago) {
                        let customObj = {
                            id: item.id_pasarela,
                            img: item.pasarela,
                        };
                        this.pasarelas_pago.push(customObj);
                        var hash = {};
                        this.pasarelas_pago = this.pasarelas_pago.filter(function(current) {
                            var exists = !hash[current.id];
                            hash[current.id] = true;
                            return exists;
                        });
                    }
                    // Process tags for payment methods
                    this.metodos_pago.forEach((element) => {
                        if (element.tag) {
                            element.tag.forEach((item) => this.pasarelas_pago_v2.push({ id: item, pasarela: element }));
                        } else {
                            this.pasarelas_pago_v2.push({ id: '', pasarela: element });
                        }
                    });
                    // Reduce payment gateways to a unique structure
                    this.pasarelas_pago_v2 = this.pasarelas_pago_v2.reduce(function(results, org) {
                        if (org.id) {
                            const existing = results.find((item) => item.id === org.id);
                            if (existing) {
                                existing.pasarelas.push(org);
                            } else {
                                results.push({ id: org.id, pasarelas: [org], open: false });
                            }
                        } else {
                            results.push({ id: '', pasarelas: [org], open: false });
                        }
                        return results;
                    }, []);
                    this.config_methods = [];
                    // Count online payment methods and configurable methods
                    this.metodos_pago.forEach((value) => {
                        if (!value.isInfo && value.id != 'coupons') {
                            this.cant_metodos_online = this.cant_metodos_online + 1;
                        }
                        if (value.isConfigurable != undefined && value.isConfigurable == true) {
                            this.config_methods.push(value);
                        }
                    });
                    // Filter out configurable payment methods
                    this.metodos_pago = this.metodos_pago.filter((item) => {
                        return item.isConfigurable == undefined || item.isConfigurable == false;
                    });
                } else {
                    // Handle case where response code is not 0
                    if (
                        this.config.coupons[this.appComponent.country] != undefined &&
                        this.config.coupons[this.appComponent.country].show != undefined &&
                        this.config.coupons[this.appComponent.country].show
                    ) {
                        this.metodos_pago.unshift({
                            id: 'coupons',
                            imagen: '',
                            max: '0',
                            min: '0',
                            nombre: 'Cupón',
                            pasarela: '',
                            tiempo: null,
                            valor: null,
                        });
                    }
                }
                this.loadingM = false;
            });
        },
        /**
         * Displays a modal to verify the user's phone number.
         */
        callModalVerifyPhone() {
            this.appComponent.modal = {
                showModal: 'verifyPhone',
                messageModal: {
                    emailVerifyPhone: this.emailVerifyPhone,
                },
            };
        },
        /**
         * Displays a modal to verify the code sent to the user's phone.
         */
        callModalVerifyCodePhone() {
            this.appComponent.modal = {
                showModal: 'verifyCodePhone',
                messageModal: {
                    emailVerifyPhone: this.emailVerifyPhone,
                    paramsModal: this.paramsModal,
                },
            };
        },
        /**
         * Displays a modal indicating that approval is needed.
         */
        callModalNeedApproval() {
            this.appComponent.modal = {
                showModal: 'needApproval',
                messageModal: {
                    dataText: this.dataText,
                },
            };
        },
        /**
         * Displays a modal to add a card.
         * @param {boolean} Ds - Indicates if 3D Secure is required.
         */
        callModalAddCard(Ds) {
            this.appComponent.modal = {
                showModal: Ds ? 'addCard3Ds' : 'addCard',
                messageModal: {
                    cardAdd: this.cardAdd,
                },
            };
        },
        /**
         * Accepts the modal action based on the current modal state.
         */
        acceptModal() {
            let item = this.paramsModal;
            let routeSucess = '';
            // Handle deposit confirmation
            if (this.appComponent.modal.orderModal == 'deposit') {
                if (
                    this.appComponent.config.depositos != undefined &&
                    this.appComponent.config.depositos.ThankYouDeposit != undefined &&
                    this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country] != undefined &&
                    this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country].show
                ) {
                    routeSucess = this.config.urlSkin + 'graciasdeposito';
                } else {
                    routeSucess = this.config.urlSkin + 'gestion/deposito/correcto';
                }
                const params = {
                    amount: this.model[item.id],
                    payer: {
                        status_urls: {
                            cancel: this.config.urlSkin + 'gestion/deposito/pendiente',
                            fail: this.config.urlSkin + 'gestion/deposito/error',
                            success: routeSucess,
                        },
                        forProduct: 'casino',
                        '1tap': true,
                    },
                    service: item.id,
                    vs_utm_campaign: '',
                    vs_utm_campaign2: '',
                };
                let vs_utm_campaign = '';
                let vs_utm_source = '';
                let vs_utm_medium = '';
                let vs_utm_content = '';
                let vs_utm_term = '';
                let stParam = '';
                // Collect UTM parameters from cookies
                if (this.cookies.get('vs_utm_campaign') !== '') {
                    vs_utm_campaign = this.cookies.get('vs_utm_campaign');
                    params.vs_utm_campaign = vs_utm_campaign;
                }
                if (this.cookies.get('vs_utm_campaign2') !== '') {
                    params.vs_utm_campaign2 = this.cookies.get('vs_utm_campaign2');
                }
                if (this.cookies.get('vs_utm_source') !== '') {
                    vs_utm_source = this.cookies.get('vs_utm_source');
                }
                if (this.cookies.get('vs_utm_medium') !== '') {
                    vs_utm_medium = this.cookies.get('vs_utm_medium');
                }
                if (this.cookies.get('vs_utm_content') !== '') {
                    vs_utm_content = this.cookies.get('vs_utm_content');
                }
                if (this.cookies.get('vs_utm_term') !== '') {
                    vs_utm_term = this.cookies.get('vs_utm_term');
                }
                // Append UTM parameters to the request
                if (vs_utm_campaign !== '') {
                    stParam = stParam + '&vs_utm_campaign=' + vs_utm_campaign;
                }
                if (vs_utm_source !== '') {
                    stParam = stParam + '&vs_utm_source=' + vs_utm_source;
                }
                if (vs_utm_content !== '') {
                    stParam = stParam + '&vs_utm_content=' + vs_utm_content;
                }
                if (vs_utm_term !== '') {
                    stParam = stParam + '&vs_utm_term=' + vs_utm_term;
                }
                if (vs_utm_medium !== '') {
                    stParam = stParam + '&vs_utm_medium=' + vs_utm_medium;
                }
                const vthis = this;
                this.appComponent.disabledButtonForm = true;
                // Request deposit action
                apiService.request('deposit', params).then((response: any) => {
                    if (response.code == 0) {
                        // Check if phone verification is needed
                        if (response.data.necesitaVerificacionCelular) {
                            this.emailVerifyPhone = vthis.appComponent.session.email;
                            this.callModalVerifyPhone();
                        } else {
                            // Check if approval is needed
                            if (response.data.necesitaAprobacion) {

                                this.callModalNeedApproval();
                                const data = {
                                    riskId: response.data.riskId,
                                    stateRisk: response.data.stateRisk,
                                };
                                const vthis = this;
                                var estadoDeposito = setInterval(intervaloEstadoDeposito, 5000);

                                function intervaloEstadoDeposito() {
                                    apiService.request('deposit', data).then((response2: any) => {
                                        response2 = response2.data;
                                        if (response2.code == 0) {
                                            if (response2.data.stateRisk === 1) {
                                                vthis.dataTitle =
                                                    '<div class=\'text-qr\'>' +
                                                    response2.data.dataText +
                                                    '</div>' +
                                                    vthis.$t('¡Solicitud de depósito aprobado!');
                                                vthis.dataText = vthis.$t(
                                                    'Ya puedes continuar con tu proceso de depósito.',
                                                );
                                                vthis.dataImg = response2.data.dataImg;
                                                vthis.showModalDataText = true;
                                                window.clearInterval(estadoDeposito);
                                                vthis.appComponent.deposit(response2, vthis.paramsModal);
                                            } else if (response2.data.stateRisk === 2) {
                                                vthis.dataTitle =
                                                    '<div class=\'text-qr\'>' +
                                                    response2.data.dataText +
                                                    '</div>' +
                                                    vthis.$t('¡Solicitud de depósito rechazado!');
                                                vthis.dataText = vthis.$t(
                                                    'Lo sentimos... Por favor intenta de nuevo mas tarde.',
                                                );
                                                vthis.dataImg = response2.data.dataImg;
                                                vthis.showModalDataText = true;
                                                window.clearInterval(estadoDeposito);
                                            }
                                        }
                                    });
                                }
                            } else {
                                this.appComponent.deposit(response, this.paramsModal);
                            }
                        }
                    } else {
                        var error_mensaje = '';
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                        if (error_mensaje == '') {
                            error_mensaje = this.$t('ERROR_GENERAL');
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
            } else {
                if (this.appComponent.modal.orderModal == 'acceptVerifyPhone') {
                    this.callModalVerifyCodePhone();
                } else {
                    if (this.appComponent.modal.orderModal == 'closeModal') {
                        this.appComponent.closeModal();
                        this.appComponent.disabledButtonForm = false;
                    } else {
                        if (this.appComponent.modal.orderModal == 'creditCardPayment') {
                            this.refreshBalance();
                            this.modelCards[item.id] = '';
                            this.cvv[item.id] = '';
                        } else {
                            if (this.appComponent.modal.orderModal == 'updateMethods') {
                                this.getPayments();
                                this.appComponent.closeModal();
                            } else {
                                if (this.appComponent.modal.orderModal == 'acceptVerifyPhone') {
                                    this.appComponent.modal.showModal = 'verifyCodePhone';
                                } else {
                                    if (this.appComponent.modal.orderModal == 'thankYouDeposit') {
                                        this.appComponent.gAnalytics('deposit_success');
                                        this.appComponent.closeModal();
                                    } else {
                                        if (this.appComponent.modal.orderModal == 'unverifiedAccount') {
                                            this.$router.push('/gestion/verificar_cuenta');
                                            this.appComponent.showModalDepositV2 = false
                                            this.appComponent.showModalDepositV3 = false
                                            this.appComponent.closeModal();
                                        } else {
                                            this.appComponent.closeModal();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        /**
         * Handles payment method selection.
         * @param {Object} item - The selected payment method item.
         */
        MetodoPago(item) {
            // Check if user is logged in for landing deposits
            if (
                (this.route.path == '/landing/depositos' || this.route.path == '/landing/depositos-ecuador') &&
                !this.appComponent.session.logueado
            ) {
                this.appComponent.showModalLogin = true;
                this.appComponent.depositFromLanding = {
                    amount: this.model[item.id],
                    service: item,
                };
            } else {
                // Update model for specific style version
                if (
                    this.appComponent.config.depositos != undefined &&
                    this.appComponent.config.depositos.styleVersion != undefined &&
                    this.appComponent.config.depositos.styleVersion[this.appComponent.country] != undefined &&
                    this.appComponent.config.depositos.styleVersion[this.appComponent.country] == 4
                ) {
                    this.model[item.id] = this.amountPayment;
                }
                // Track deposit analytics
                this.appComponent.gAnalytics('deposit', {
                    moneda:
                        this.appComponent.session.moneda_nom != undefined ? this.appComponent.session.moneda_nom : null,
                    info: item != undefined ? item : null,
                    monto: this.model[item.id] != undefined ? this.model[item.id] : null,
                });
                this.appComponent.disabledButtonForm = true;
                this.paramsModal = item;
                let routeSucess = '';
                // Handle card popup
                if (item.popupTarjeta) {
                    this.callModalAddCard(
                        item['validation_3DS'] != undefined && item['validation_3DS'] != null
                            ? item['validation_3DS']
                            : false,
                    );
                    this.cardAdd.amount = this.model[item.id];
                    if (item.Commission != undefined && item.Commission != null && item.Commission != '')
                        this.cardAdd.Commission = item.Commission;
                    this.cardAdd.productId = item.id;
                    this.cardAdd.saveCardShow = item.saveCard;
                    this.cardAdd.requireAuth = item.requireAuth;
                } else if (item.popupTransfer) {
                    // Handle transfer popup
                    this.appComponent.modalTransferencia = true;
                    this.appComponent.pasarelaSelected = {
                        ...item,
                        amountInit: this.model[item.id],
                    };
                } else {
                    // Handle confirmation modal for deposits
                    if (
                        this.appComponent.config.depositos != undefined &&
                        this.appComponent.config.depositos.showModalConfirm != undefined &&
                        this.appComponent.config.depositos.showModalConfirm[this.appComponent.country] != undefined &&
                        this.appComponent.config.depositos.showModalConfirm[this.appComponent.country]
                    ) {
                        if (
                            this.appComponent.config.depositos != undefined &&
                            this.appComponent.config.depositos.ThankYouDeposit != undefined &&
                            this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country] !=
                            undefined &&
                            this.appComponent.config.depositos.ThankYouDeposit[this.appComponent.country].show
                        ) {
                            routeSucess = this.config.urlSkin + 'graciasdeposito';
                        } else {
                            routeSucess = this.config.urlSkin + 'gestion/deposito/correcto';
                        }
                        const params = {
                            amount: this.model[item.id],
                            payer: {
                                status_urls: {
                                    cancel: this.config.urlSkin + 'gestion/deposito/pendiente',
                                    fail: this.config.urlSkin + 'gestion/deposito/error',
                                    success: routeSucess,
                                },
                                forProduct: 'casino',
                                '1tap': true,
                            },
                            service: item.id,
                            vs_utm_campaign: '',
                            vs_utm_campaign2: '',
                        };
                        let vs_utm_campaign = '';
                        let vs_utm_source = '';
                        let vs_utm_medium = '';
                        let vs_utm_content = '';
                        let vs_utm_term = '';
                        let stParam = '';
                        // Collect UTM parameters from cookies
                        if (this.cookies.get('vs_utm_campaign') !== '') {
                            vs_utm_campaign = this.cookies.get('vs_utm_campaign');
                            params.vs_utm_campaign = vs_utm_campaign;
                        }
                        if (this.cookies.get('vs_utm_campaign2') !== '') {
                            params.vs_utm_campaign2 = this.cookies.get('vs_utm_campaign2');
                        }
                        if (this.cookies.get('vs_utm_source') !== '') {
                            vs_utm_source = this.cookies.get('vs_utm_source');
                        }
                        if (this.cookies.get('vs_utm_medium') !== '') {
                            vs_utm_medium = this.cookies.get('vs_utm_medium');
                        }
                        if (this.cookies.get('vs_utm_content') !== '') {
                            vs_utm_content = this.cookies.get('vs_utm_content');
                        }
                        if (this.cookies.get('vs_utm_term') !== '') {
                            vs_utm_term = this.cookies.get('vs_utm_term');
                        }
                        // Append UTM parameters to the request
                        if (vs_utm_campaign !== '') {
                            stParam = stParam + '&vs_utm_campaign=' + vs_utm_campaign;
                        }
                        if (vs_utm_source !== '') {
                            stParam = stParam + '&vs_utm_source=' + vs_utm_source;
                        }
                        if (vs_utm_content !== '') {
                            stParam = stParam + '&vs_utm_content=' + vs_utm_content;
                        }
                        if (vs_utm_term !== '') {
                            stParam = stParam + '&vs_utm_term=' + vs_utm_term;
                        }
                        if (vs_utm_medium !== '') {
                            stParam = stParam + '&vs_utm_medium=' + vs_utm_medium;
                        }
                        const vthis = this;
                        this.appComponent.disabledButtonForm = true;
                        // Request deposit action
                        apiService.request('deposit', params).then((response) => {
                            if (response.code == 0) {
                                // Check if phone verification is needed
                                if (response.data.necesitaVerificacionCelular) {
                                    this.emailVerifyPhone = vthis.appComponent.session.email;
                                    this.callModalVerifyPhone();
                                } else {
                                    // Check if approval is needed
                                    if (response.data.necesitaAprobacion) {
                                        this.showModalNeedApproval = true;
                                        const data = {
                                            riskId: response.data.riskId,
                                            stateRisk: response.data.stateRisk,
                                        };
                                        var estadoDeposito = setInterval(intervaloEstadoDeposito, 5000);

                                        function intervaloEstadoDeposito() {
                                            apiService.request('deposit', data).then((response2: any) => {
                                                response2 = response2.data;
                                                if (response2.code == 0) {
                                                    if (response2.data.stateRisk === 1) {
                                                        vthis.dataTitle =
                                                            '<div class=\'text-qr\'>' +
                                                            response2.data.dataText +
                                                            '</div>' +
                                                            vthis.$t('¡Solicitud de depósito aprobado!');
                                                        vthis.dataText = vthis.$t(
                                                            'Ya puedes continuar con tu proceso de depósito.',
                                                        );
                                                        vthis.dataImg = response2.data.dataImg;
                                                        vthis.showModalDataText = true;
                                                        window.clearInterval(estadoDeposito);
                                                        vthis.appComponent.deposit(response2);
                                                    } else if (response2.data.stateRisk === 2) {
                                                        vthis.dataTitle =
                                                            '<div class=\'text-qr\'>' +
                                                            response2.data.dataText +
                                                            '</div>' +
                                                            vthis.$t('¡Solicitud de depósito rechazado!');
                                                        vthis.dataText = vthis.$t(
                                                            'Lo sentimos... Por favor intenta de nuevo mas tarde.',
                                                        );
                                                        vthis.dataImg = response2.data.dataImg;
                                                        vthis.showModalDataText = true;
                                                        window.clearInterval(estadoDeposito);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        item.amount = vthis.model[item.id];
                                        console.log(item);
                                        vthis.appComponent.deposit(response, item);
                                    }
                                }
                                this.appComponent.disabledButtonForm = false;
                                this.appComponent.depositFromLanding = null;
                            } else {
                                if (response.error_code == 300236) {
                                    this.appComponent.modal = {
                                        showModal: 'notification',
                                        titleModal: this.$t('Cuenta desverificada'),
                                        messageModal: this.$t(
                                            'Tu documento de identidad está vencido y tu cuenta ha sido desverificada. Debes actualizar tu documento para poder realizar depósitos.',
                                        ),
                                        buttonModal: this.$t('Actualizar documento'),
                                        orderModal: 'unverifiedAccount',
                                    };
                                    return;

                                } else {
                                    var error_mensaje = '';
                                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
                                    if (error_mensaje == '') {
                                        error_mensaje = this.$t('ERROR_GENERAL');
                                    }
                                    this.appComponent.modal = {
                                        showModal: 'notification',
                                        titleModal: this.$t('Error!'),
                                        messageModal: error_mensaje,
                                        buttonModal: this.$t('Aceptar'),
                                        orderModal: 'closeModal',
                                    };
                                    if (
                                        this.appComponent.depositFromLanding != null &&
                                        (this.route.path == '/landing/depositos' ||
                                            this.route.path == '/landing/depositos-ecuador')
                                    ) {
                                        this.appComponent.depositFromLanding = null;
                                    }
                                }

                            }
                        });
                    } else {
                        // Show confirmation modal
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje'),
                            messageModal: this.$t('Desea depositar ?'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'deposit',
                        };
                    }
                }
            }
        },
        /**
         * Selects a payment gateway.
         * @param {Object} item - The selected payment gateway item.
         */
        SelectPasarela(item) {
            this.selectedPayment = '';
            this.selectedPasarela = item.id;
            this.modalMetodos = true;
        },
        /**
         * Processes credit card payment.
         * @param {Object} item - The payment method item.
         */
        creditCardPayment(item) {
            // Update model for specific style version
            if (
                this.appComponent.config.depositos != undefined &&
                this.appComponent.config.depositos.styleVersion != undefined &&
                this.appComponent.config.depositos.styleVersion[this.appComponent.country] != undefined &&
                this.appComponent.config.depositos.styleVersion[this.appComponent.country] == 4
            ) {
                this.modelCards[item.id] = this.amountPayment;
            }
            this.paramsModal = item;
            const params = {
                id: item.id,
                amount: this.modelCards[item.id],
                cvv: this.cvv[item.id],
            };
            // Request credit card payment
            apiService.request('credit_card_payment', params).then((response: any) => {
                if (response.code == 0) {
                    // Check if VisaNet modal should be displayed
                    if (
                        response.dataVisaNet !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country] !== undefined &&
                        this.appComponent.config.modalVisaNetDeposit[this.appComponent.country]
                    ) {
                        this.appComponent.modalVisaNetDepositData = response.dataVisaNet;
                        this.appComponent.modalVisaNetDeposit = true;
                    } else {
                        if (response.result != undefined && response.result != '' && response.result != null) {
                            window.location.href = response.result;
                            return false;
                        }
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje'),
                            messageModal: this.$t('Deposito creado satisfactoriamente.'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                    }
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (error_mensaje == '' && response.data != undefined) {
                        error_mensaje = this.$t(response.data);
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Transacción fallida!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
        /**
         * Displays a modal for confirmed payment methods.
         * @param {Object} item - The payment method item.
         */
        confirmedMethods(item) {
            this.appComponent.modal = {
                showModal: 'modalConfiguredMethod',
                configuredMethod: {
                    id: item.id,
                    logo: item.imagen,
                },
            };
        },
        /**
         * Obtains a coupon code.
         * @param {Object} item - The coupon item.
         */
        obtenerCupon(item) {
            if (this.model[item.id] == '' || this.model[item.id] == null) {
                this.appComponent.modal = {
                    showModal: 'notification',
                    titleModal: this.$t('Error!'),
                    messageModal: this.$t('Ingresa todos los campos requeridos.'),
                    buttonModal: this.$t('Aceptar'),
                    orderModal: 'closeModal',
                };
                return false;
            }
            this.ConsultarCuenta(item);
        },
        /**
         * Consults the user's account for the coupon code.
         * @param {Object} item - The coupon item.
         */
        ConsultarCuenta(item) {
            this.buttonEnabled = false;
            const params = {
                couponscode: this.model[item.id],
            };
            // Request to validate the coupon code
            apiService.request('user_code_coupons', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Satisfactorio!'),
                        messageModal: this.$t('Cupón agregado satisfactoriamente.'),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                    this.appComponent.refreshBalance();
                    this.model[item.id] = '';
                    this.buttonEnabled = true;
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
                    this.buttonEnabled = true;
                }
            });
        },
        /**
         * Validates the deposit value input.
         * @param {Object} e - The event object containing input data.
         */
        onChangeValueDeposit(e: any) {
            if (e.input == '') {
                e.msg = this.$t('El campo se encuentra en blanco');
                e.color = 'yellow-300';
                e.validate = false;
            } else if (e.input < this.methodSelected.min) {
                e.msg = this.$t('El valor no supera el minimo permitido');
                e.color = 'red-600';
                e.validate = false;
            } else if (this.methodSelected.max > 0 && e.input > this.methodSelected.max) {
                e.msg = this.$t('El valor supera el minimo permitido');
                e.color = 'red-600';
                e.validate = false;
            } else {
                e.msg = '';
                e.color = 'green-600';
                e.validate = true;
            }
            this.disabledButtonDeposit = !(
                this.valueDeposit.validate &&
                this.valueOperation.validate &&
                this.valueDate.validate
            );
        },
        /**
         * Validates the operation number input.
         * @param {Object} e - The event object containing input data.
         */
        onChangeOperationNumber(e: any) {
            if (e.input == '') {
                e.msg = this.$t('El campo se encuentra en blanco');
                e.color = 'yellow-300';
                e.validate = false;
            } else if (e.input <= 0) {
                e.msg = this.$t('El valor no supera el minimo permitido');
                e.color = 'red-600';
                e.validate = false;
            } else {
                e.msg = '';
                e.color = 'green-600';
                e.validate = true;
            }
            this.disabledButtonDeposit = !(
                this.valueDeposit.validate &&
                this.valueOperation.validate &&
                this.valueDate.validate
            );
        },
        /**
         * Validates the operation date input.
         * @param {Object} e - The event object containing input data.
         */
        onChangeOperationDate(e: any) {
            if (e.input == '') {
                e.msg = this.$t('El campo se encuentra en blanco');
                e.color = 'yellow-300';
                e.validate = false;
            } else {
                e.msg = '';
                e.color = 'green-600';
                e.validate = true;
            }
            this.disabledButtonDeposit = !(
                this.valueDeposit.validate &&
                this.valueOperation.validate &&
                this.valueDate.validate
            );
        },
        /**
         * Submits the deposit form.
         */
        onSubmitFormDeposit() {
            const params = {
                operation_number: this.valueOperation.input,
                date: this.valueDate.input,
                amount: this.valueDeposit.input,
                user_id: this.currencySelected.Id,
                currency: this.currencySelected.Currency,
                payer: {
                    status_urls: {
                        cancel: 'https://doradobet.com/gestion/deposito/pendiente',
                        fail: 'https://doradobet.com/gestion/deposito/error',
                        success: 'https://doradobet.com/gestion/deposito/correcto',
                    },
                    forProduct: 'casino',
                    '1tap': true,
                },
                service: this.methodSelected.id,
                bank_account_id: this.methodSelected.userBank_id != undefined ? this.methodSelected.userBank_id : null ,
                vs_utm_campaign: null,
                vs_utm_campaign2: null,
            };
            // Request deposit action
            apiService.request('deposit', params).then((response: any) => {
                if (response.code == 0) {
                    this.arraySelects = {};
                    this.idAccountSelect = '';
                   /* this.methodSelected.userBank_id = '';*/
                    this.disabledButton = true;
                    this.otherView = false;
                    this.getPayments();
                    let message = this.$t('El deposito ha sido generado y se encuentra en estado de verificacion.');
                    if (
                        response.data != undefined &&
                        response.data.details != undefined &&
                        response.data.details['transactionId'] != undefined
                    ) {
                        message =
                            this.$t('El deposito ha sido generado y se encuentra en estado de verificacion, ') +
                            this.$t('id de transaccion: ') +
                            response.data.details['transactionId'];
                    }
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Deposito'),
                        messageModal: message,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                    this.valueDeposit.input = 0;
                    this.valueOperation.input = 0;
                    this.valueDate.input = '';
                    this.disabledButtonDeposit = true;
                    this.onRecharge = false;
                    this.step = 1;
                } else {
                    var error_mensaje = '';
                  if (response.error_code === 300251) {
                    const match = response.msg.match(/\d+/);
                    const number = match ? Number(match[0]) : null;
                    console.log(number);

                    error_mensaje = this.$t('Debes esperar al menos [X] minutos entre cada depósito. Aún no ha pasado el tiempo mínimo para volver a intentarlo.')

                    error_mensaje = error_mensaje.replace('[X]', String(number));
                  } else {
                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    if (error_mensaje == '') {
                      error_mensaje = this.$t('ERROR_GENERAL');
                    }
                  }
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Error!'),
                        messageModal: error_mensaje,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                    this.valueDeposit.input = 0;
                    this.valueOperation.input = 0;
                    this.valueDate.input = '';
                    this.disabledButtonDeposit = true;
                    this.onRecharge = false;
                    this.step = 1;
                }
            });
        },
        /**
         * Displays a popup with additional information.
         * @param {Object} item - The item containing data for the popup.
         */
        infoPopUp(item) {
            this.appComponent.modal = {
                buttonModal: this.$t('Aceptar'),
                showModal: 'data',
            };
            this.appComponent.infoModal = {
                dataImg: item.mainimage,
                dataTitle: item.label,
                dataText: item.text,
            };
        },
        updatePaymentProcess(options: PaymentProcessUpdate) {
            if (options.isPaymentActive !== undefined) {
                this.paymentFlowState.active = options.isPaymentActive;
            }

            if (options.currentStep !== undefined) {
                this.paymentFlowState.currentStep = options.currentStep;
            }
        },
        shouldShowDataSection() {
            return (
                this.paymentFlowState.active &&
                (this.paymentFlowState.currentStep === 'deposit-method-selection' ||
                    this.paymentFlowState.currentStep === 'payment-data-entry' ||
                    this.paymentFlowState.currentStep === 'operation-validation')
            );
        },
        getAccount(product) {
            let params = {
                State: '1',
                count: 10,
                start: 0,
                product_id: product.Id != undefined ? product.Id : product.id != undefined ? product.id : '',
                type: 'digitals'
            };
            apiService.request('get_bank_accounts', params).then((response: any) => {
                if (response.code == 0) {
                    if (response.data.length > 0){
                        for (let i = 0; i < response.data.length; i++) {
                            if(response.data[i].bank_name == "Paypal") {
                                Object.assign(this.arraySelects, {
                                    accountPaypal:  response.data,
                                });
                                this.numAccountPaypal = response.data.length
                            }
                            else if(response.data[i].bank_name == "Zelle") {
                                Object.assign(this.arraySelects, {
                                    accountZelle:  response.data,
                                });
                                this.numAccountZelle = response.data.length
                            }
                        }
                    }else {
                        if (product.Name == 'Paypal' || product.nameP == 'Paypal') {
                            Object.assign(this.arraySelects, {
                                accountPaypal: [],
                            });
                            this.numAccountPaypal = 0
                        } else if (product.Name == 'Zelle' || product.nameP == 'Zelle') {
                            Object.assign(this.arraySelects, {
                                accountZelle: [],
                            });
                            this.numAccountZelle = 0
                        }
                    }
                }
            });
        },
        selectBank(name) {
            this.otherView = true
            this.dataOtherView.nameP = name.externo_id
            this.dataOtherView.id = name.id
        },
        selectAccount(product) {
            this.idAccountSelect = product.userbank_id
            this.methodSelected.userBank_id = product.userbank_id
            this.disabledButton = false
        },
        backView(data) {
            if (data.userBank_id != undefined ) {
                this.methodSelected.userBank_id = null
                this.idAccountSelect = '';
                this.disabledButton = true
                this.updatePaymentProcess({ currentStep: 'digital-account-selection' });
            } else {
                this.updatePaymentProcess({ currentStep: 'deposit-method-selection' });
            }
        },
    },
});
</script>
<template>
    <!-- Main container for payment methods display, conditional rendering based on payment method info and loading state -->
    <div
        v-if="
            metodos_pago_info == [] &&
            loadingM &&
            route.path != '/landing/depositos' &&
            route.path != '/landing/depositos-ecuador'
        "
        class="flex w-full items-center shadow-lg"
        :class="[
            {
                'bg-neutral rounded-box': config.layout != undefined && config.layout == 3,
            },
            {
                'bg-neutral rounded-3xl': config.layout == undefined || config.layout != 3,
            },
            {
                'h-screen':
                    appComponent.config.header == undefined ||
                    appComponent.config.header.currencyChangeButton == undefined ||
                    appComponent.config.header.currencyChangeButton[appComponent.country] == undefined ||
                    !appComponent.config.header.currencyChangeButton[appComponent.country],
            },
            {
                'h-60':
                    appComponent.config.header !== undefined &&
                    appComponent.config.header.currencyChangeButton !== undefined &&
                    appComponent.config.header.currencyChangeButton[appComponent.country] !== undefined &&
                    appComponent.config.header.currencyChangeButton[appComponent.country],
            },
        ]"
    >
        <div class="flex-1"></div>
        <div class="flex flex-col w-12/12">
            <svg
                fill="none"
                class="w-12 h-12 animate-spin"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fill-rule="evenodd"
                />
            </svg> <!-- Placeholder for SVG content -->
        </div>
        <div class="flex-1"></div>
    </div>
    <!-- Loading state display with animated placeholders -->
    <div
        v-if="loadingM && !loadingError"        
        class="w-full p-5 bg-base-300"
    >
        <div v-if="config_methods.length > 0" class="w-full py-2 px-1 flex flex-row flex-nowrap flex-shrink-0 justify-start items-center gap-x-5 my-8">
            <AnimatedPlaceholder class="bg-base-100 w-[170px] h-[174px] rounded-xl mb-3" />
        </div>
        
        <div 
            v-for="index in 5"
            :key="index"
            class="cardT w-full rounded-box mb-3 border-2 border-solid border-base-100 shadow-lg shadow-black/20 bg-base-300 hidden md:block"
        >
            <div
                class="collapse-title text-xl font-medium pr-10"
            >
                <div class="flex md:grid grid-cols-none lg:grid-cols-6 gap-4 lg:gap-6 items-center">
                    <div class="flex justify-center items-center w-[104px] h-[53px]">
                        <AnimatedPlaceholder class="bg-base-100 w-[75px] h-[63px] md:w-[90px] md:h-[40px] rounded-md" />
                    </div>
                    <div class="col-span-2">
                        <div class="flex justify-between items-start">
                            <AnimatedPlaceholder class="bg-base-100 h-4 w-40 rounded" />
                        </div>
                        <div class="hidden md:block leading-[13px]">
                            <div class="flex items-center gap-2 mt-2">
                                <AnimatedPlaceholder class="bg-base-100 h-3 w-10 rounded" />
                                <AnimatedPlaceholder class="bg-base-100 h-3 w-10 rounded" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 hidden md:block">
                        <AnimatedPlaceholder class="bg-base-100 h-10 w-full rounded-md" />
                    </div>
                    <div class="col-span-1 hidden md:block">
                        <AnimatedPlaceholder class="bg-base-100 h-10 w-full rounded-md" />
                    </div>
                    <div class="flex items-center justify-center">
                        <AnimatedPlaceholder class="bg-base-100 w-[80px] h-[40px] rounded-md" />
                    </div>
                </div>
            </div>
        </div>
        <div 
            v-for="index in 5"
            :key="index"
            class="md:hidden card-c flex flex-col w-full gap-1 rounded-lg mb-3 shadow shadow-black/20 p-4 bg-base-300  border-base-100 border-2">
                <div class="w-full">
                    <div class="w-full flex justify-between items-start">
                        <AnimatedPlaceholder class="bg-base-100 h-[63px] w-[75px] rounded-md" />
                        <AnimatedPlaceholder class="bg-base-100 w-[97px] h-[15px] rounded-md" />
                    </div>
                    <div class="w-full flex justify-center items-center">
                        <div class="w-full flex items-center gap-2 mt-2">
                            <AnimatedPlaceholder class="bg-base-100 h-[11px] w-[30px] rounded" />
                            <AnimatedPlaceholder class="bg-base-100 h-[11px] w-[40px] rounded" />
                        </div>
                        <div class="flex gap-2">
                            <AnimatedPlaceholder class="bg-base-100 h-[31px] w-[93px] rounded" />
                            <AnimatedPlaceholder class="bg-base-100 h-[31px] w-[93px] rounded" />
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <div v-if="noGateways" class="flex flex-col items-center justify-center w-full h-[70vh] p-5 bg-base-300 gap-5">
        <div class="rounded-full border-error border-3 bg-transparent p-5">
            <IconClose class="w-12 h-12 text-error" />
        </div>
        <div class="flex flex-col items-center justify-center text-center font-poppinsb gap-3">
            <div class="text-neutral flex gap-1">
                <span> {{ $t('Actualmente no hay pasarelas habilitadas')}} </span>
            </div>
        </div>
        <div 
            @click="getPayments()"
            class="rounded-full bg-primary px-5 py-2 text-neutral cursor-pointer font-semibold">
            <span>
                {{ $t('Intenta nuevamente') }}
            </span>
        </div>
    </div>
    <div v-if="loadingError" class="flex flex-col items-center justify-center w-full h-[70vh] p-5 bg-base-300 gap-5">
        <div class="rounded-full border-error border-3 bg-transparent p-5">
            <IconClose class="w-12 h-12 text-error" />
        </div>
        <div class="flex flex-col items-center justify-center text-center font-poppinsb gap-3">
            <span class="text-xl text-error font-semibold">{{ $t('Oh no...') }}</span>
            <div class="text-neutral flex gap-1">
                <span class="font-bold">{{ $t('No fue posible obtener la informacion') }}</span>
                <span> {{ $t('desde el servidor en este momento')}} </span>
            </div>
            <div class="text-neutral flex gap-1">
                <span>{{ $t('Por favor, intenta nuevamente') }}</span>
                <span class="font-bold"> {{ $t('en unos minutos.')}} </span>
            </div>
        </div>
        <div 
            @click="getPayments()"
            class="rounded-full bg-primary px-5 py-2 text-neutral cursor-pointer font-semibold">
            <span>
                {{ $t('Intenta nuevamente') }}
            </span>
        </div>
    </div>


    <!-- Container for displaying payment methods or loading state -->
    <div
        v-if="!loadingM && !loadingError && !noGateways"
        class="w-full"
        :class="[
            {
                'shadow-2xl shadow-neutral-content rounded-b-xl bg-base-300':
                    config.layout != undefined &&
                    config.layout == 3 &&
                    route.path != '/landing/depositos' &&
                    route.path != '/landing/depositos-ecuador',
            },
            {
                'shadow-md rounded-xl':
                    (config.layout == undefined || config.layout != 3) &&
                    route.path != '/landing/depositos' &&
                    route.path != '/landing/depositos-ecuador',
            },
            {
                'rounded-3xl':
                    config.layout != undefined &&
                    config.layout == 3 &&
                    (route.path == '/landing/depositos' || route.path == '/landing/depositos-ecuador'),
            },
        ]"
    >
        <div
            id="formWithdrawAmount"
            class="GeneralForm WithdrawForm WithdrawAmount text-info bg-base-400"
            :class="[
                {
                    'p-5 rounded-b-xl': config.layout != undefined && config.layout == 3 && !loadingM
                },
                {
                    ' p-5 rounded-xl':
                        config.layout == undefined ||
                        (config.layout != 3 &&
                            route.path != '/landing/depositos' &&
                            route.path != '/landing/depositos-ecuador'),
                },
                {
                    'rounded-3xl':
                        config.layout != undefined &&
                        config.layout == 3 &&
                        (route.path == '/landing/depositos' || route.path == '/landing/depositos-ecuador'),
                },
                {
                    'px-5 pb-5': loadingM
                }
            ]"
            novalidate="novalidate"
        >
            <section
                v-if="
                    appComponent.config.header !== undefined &&
                    appComponent.config.header.currencyChangeButton !== undefined &&
                    appComponent.config.header.currencyChangeButton[appComponent.country] !== undefined &&
                    appComponent.config.header.currencyChangeButton[appComponent.country]
                "
            >
                <!-- Inicio flujo de pagos -->
                <div class="flex flex-col gap-1">
                    <!-- start select-currency -->
                    <section class="flex flex-col gap-2 bg-base-300 p-4 rounded-lg">
                        <h1 class="w-full text-2xl font-bold text-neutral text-start">
                            {{ $t('1. Selecciona la moneda') }}
                        </h1>

                        <div
                            v-if="!paymentFlowState.active"
                            class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-300 text-neutral-content"
                        >
                            <!-- Card -->
                            <div
                                v-for="(currency, index) in currenciesList"
                                :key="index"
                                class="flex flex-col gap-3 bg-base-300 border border-accent rounded-md p-3"
                            >
                                <p class="font-bold text-2xl text-neutral">{{ currency.Currency }}</p>
                                <p class="text-xl text-neutral">$ {{ parseFloat(currency.Credits).toFixed(2) }}</p>
                                <button
                                    @click="
                                        updatePaymentProcess({
                                            currentStep: 'payment-method-selection',
                                            isPaymentActive: true,
                                        });
                                        currencySelected = currency;
                                    "
                                    class="btn w-full mt-12 btn-success hover:bg-success/50 text-neutral"
                                >
                                    {{ $t('Recarga') }}
                                </button>
                            </div>
                            <!-- Card -->
                        </div>
                    </section>
                    <!-- end select-currency -->

                    <!-- start select-payment-method tabs content -->
                    <section
                        v-if="paymentFlowState.active"
                        class="flex flex-col gap-4 bg-base-300 p-4 rounded-lg"
                    >
                        <h2 class="w-full text-2xl font-bold text-neutral text-start">
                            {{ $t('2. Selecciona el método de pago') }}
                        </h2>

                        <!-- start select-payment -->
                        <div
                            v-if="paymentFlowState.currentStep === 'payment-method-selection'"
                            class="flex flex-col gap-4 rounded-md"
                        >
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div
                                    class="flex flex-col items-center gap-3 bg-base-300 border border-accent hover:bg-base-200/50 rounded-md p-3"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msj0212T1743012411.png"
                                        class=""
                                        alt=""
                                    />
                                    <h2 class="text-xl text-neutral font-bold">{{ $t('Depósitos informativos') }}</h2>
                                    <button
                                        @click="
                                            updatePaymentProcess({
                                                currentStep: 'deposit-method-selection',
                                            })
                                        "
                                        class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-neutral rounded-lg"
                                    >
                                        {{ $t('Seleccionar') }}
                                    </button>
                                </div>

                                <div
                                    class="flex flex-col items-center gap-3 bg-base-300 border border-accent hover:bg-base-200/50 rounded-md p-3"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msj0212T1743012395.png"
                                        class="mt-4"
                                        alt=""
                                    />
                                    <h2 class="text-xl text-neutral font-bold">{{ $t('Pasarelas de pago') }}</h2>
                                    <button
                                        @click="updatePaymentProcess({ currentStep: 'gateway-selection' })"
                                        class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-neutral rounded-lg"
                                    >
                                        {{ $t('Seleccionar') }}
                                    </button>
                                </div>

                                <div
                                    v-if="appComponent.config != undefined && appComponent.config.digitalsAccountDeposit != undefined && appComponent.config.digitalsAccountDeposit"
                                    class="flex flex-col items-center gap-3 bg-base-300 border border-accent hover:bg-base-200/50 rounded-md p-3"
                                >
                                    <img
                                        src="https://images.virtualsoft.tech/m/msj0212T1763738300.png"
                                        class=""
                                        alt=""
                                    />
                                    <h2 class="text-xl text-neutral font-bold">{{ $t('Cuentas digitales') }}</h2>
                                    <button
                                        @click="updatePaymentProcess({ currentStep: 'digital-account-selection' })"
                                        class="btn btn-success w-full h-12 mt-2 hover:bg-success/50 text-neutral rounded-lg"
                                    >
                                        {{ $t('Seleccionar') }}
                                    </button>
                                </div>
                            </div>

                            <button
                                @click="updatePaymentProcess({ isPaymentActive: false, currentStep: null })"
                                class="w-fit ml-auto p-4 btn btn-secondary hover:bg-secondary-focus text-neutral-content"
                            >
                                {{ $t('Atras') }}
                            </button>
                        </div>
                        <!-- end select-payment -->

                        <!-- start informative-deposit content -->
                        <div
                            v-if="paymentFlowState.currentStep === 'deposit-method-selection'"
                            class="flex flex-col gap-4 rounded-md"
                        >
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <!-- Card -->
                                <div
                                    v-for="(method, index) in metodos_pago.filter(m => m && m.nombre_pasarela === 'Depositos Manuales' && m.externo_id !== 'Paypal' && m.externo_id !== 'Zelle')"
                                    :key="method.id"
                                    class="in w-full"
                                >
                                    <div
                                        class="bg-base-300 rounded-lg p-4 text-lg text-neutral border border-accent"
                                        >
                                        <div class="justify-items-center">
                                            <img 
                                                class="w-[19rem] h-[8rem] object-contain rounded-xl m-[1rem]"
                                                :src="method.imagen || 'https://images.virtualsoft.tech/m/msj0212T1756758566.png'"
                                                alt="Logo"
                                                @error="$event.target.src = 'https://images.virtualsoft.tech/m/msj0212T1756758566.png'"
                                            />
                                            <div 
                                                class="tooltip tooltip-bottom relative 
                                                        before:bg-black before:text-white before:px-2 before:py-1 before:rounded-lg"
                                                :data-tip="method.nombre"
                                    >
                                                <p class="line-clamp-2 h-[3rem] text-left overflow-hidden">
                                                    {{ method.nombre }}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            @click="
                                                methodSelected = method;
                                                updatePaymentProcess({
                                                    currentStep: 'payment-data-entry',
                                                });
                                            "
                                            class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-neutral rounded-lg b-px"
                                        >
                                            {{ $t('Seleccionar') }}
                                        </button>
                                    </div>
                                </div>
                                <!-- Card -->
                            </div>

                            <button
                                @click="updatePaymentProcess({ currentStep: 'payment-method-selection' })"
                                class="w-fit ml-auto p-4 btn btn-secondary hover:bg-secondary-focus text-neutral-content"
                            >
                                {{ $t('Atras') }}
                            </button>
                        </div>
                        <!-- end informative-deposit content -->

                        <!-- start payment-gateways content -->
                        <div
                            v-if="paymentFlowState.currentStep === 'gateway-selection'"
                            class="flex flex-col gap-4 rounded-md p-6"
                        >
                            <!-- start payment-gateways desktop -->
                            <section
                                class="flex"
                                :class="
                                    config.depositos_ != undefined &&
                                    config.depositos_.infoDepositsFirst != undefined &&
                                    config.depositos_.infoDepositsFirst
                                        ? 'flex-col-reverse'
                                        : 'flex-col'
                                "
                            >
                                <template
                                    class=""
                                    v-if="metodos_pago.length > 0"
                                    v-for="(item, index) in metodos_pago"
                                >
                                    <div
                                        :class="[
                                            {
                                                'collapse collapse-plus collapse-open':
                                                    (config.layout == undefined || config.layout != 3) &&
                                                    appComponent.mobile != '' &&
                                                    appComponent.mobile != '0' &&
                                                    route.path != '/landing/depositos' &&
                                                    route.path != '/landing/depositos-ecuador',
                                            },
                                        ]"
                                        v-if="
                                            item.nombre_pasarela !== 'Depositos Manuales' &&
                                            ((!item.isInfo &&
                                                item.id != 'coupons' &&
                                                config.depositos != undefined &&
                                                config.depositos.styleVersion == undefined) ||
                                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                                config.depositos.styleVersion[appComponent.country] == 1)
                                        "
                                        class="w-full card-c grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mb-4"
                                    >
                                        <input
                                            type="checkbox"
                                            class="hidden"
                                        />
                                        <!-- new code -->

                                        <!-- Container image -->
                                        <div
                                            class="flex flex-col gap-4 items-center justify-center p-6 rounded-lg bg-base-200 hover:opacity-50"
                                        >
                                            <div class="flex flex-col gap-2">
                                                <figure class="flex flex-col gap-2">
                                                    <img
                                                        style="
                                                            padding: 5px 5px;
                                                            width: auto;
                                                            height: auto;
                                                            max-height: 54px;
                                                            border-radius: 5px;
                                                            object-fit: contain;
                                                        "
                                                        :src="item.imagen"
                                                        v-if="item.imagen !== ''"
                                                    />
                                                    <figcaption v-if="item.imagentxt !== ''">
                                                        {{ item.imagentxt }}
                                                    </figcaption>
                                                </figure>
                                                <p class="text-base font-bold text-center text-[#808080]">
                                                    {{ $t(item.nombre) }}
                                                </p>
                                            </div>
                                            <button
                                                v-if="item.info && item.info !== ''"
                                                class="fill-neutral hover:scale-125"
                                                @click="onModalInfo(item.info)"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M11 7v2h2V7zm3 10v-2h-1v-4h-3v2h1v2h-1v2zm8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8"
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                v-if="!appComponent.disabledButtonForm"
                                                @click="
                                                    () => {
                                                        MetodoPago(item);
                                                        metodos_pago.forEach((i) => (i.select = undefined));
                                                        item.select = item.id;
                                                    }
                                                "
                                                :disabled="
                                                    model[item.id] < item.min ||
                                                    model[item.id] > item.max ||
                                                    model[item.id] == null ||
                                                    model[item.id] == 0 ||
                                                    appComponent.disabledButtonForm
                                                "
                                                class="btn btn-success w-full h-12 hover:bg-success/50 text-neutral rounded-lg disabled:bg-success/50"
                                                data-use="preload"
                                                title="Next Step"
                                                :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                                :data-analytics-position="String(index + 1)"
                                                :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                            >
                                                <span class="">{{ $t('Depositar') }}</span>
                                            </button>

                                            <div
                                                v-else
                                                class="w-auto flex justify-center items-center"
                                            >
                                                <button
                                                    disabled
                                                    id="accion_depositarvalor"
                                                    class="btn bg-success w-full h-12 hover:bg-success/50 text-neutral rounded-lg"
                                                    data-use="preload"
                                                    title="Next Step"
                                                    data-analytics-label="deposit:open"
                                                    data-analytics-context="step:select-method|step-num:1"
                                                >
                                                    <svg
                                                        v-if="
                                                            appComponent.disabledButtonForm == true &&
                                                            item.id == item.select
                                                        "
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
                                                    <span class="ButtonText ng-binding ng-scope">{{
                                                        $t('Depositar')
                                                    }}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- Container image -->

                                        <!-- Container input -->
                                        <div class="flex flex-col gap-4">
                                            <div class="flex flex-col gap-2">
                                                <label
                                                    for="valor"
                                                    class="font-bold text-base text-neutral"
                                                    >Ingrese la cantidad de dinero que desea depositar</label
                                                >
                                                <input
                                                    class="input input-bordered w-full text-input-placeholder"
                                                    placeholder=""
                                                    id="valor"
                                                    v-model="model[item.id]"
                                                    type="number"
                                                />
                                            </div>
                                            <ul class="flex flex-col gap-4 list-none">
                                                <li class="w-full">
                                                    <ul class="grid grid-cols-2 md:grid-cols-1 gap-2 pl-2 list-disc">
                                                        <li
                                                            class="FormLabel inline-block text-sm font-bold text-neutral"
                                                        >
                                                            {{ $t('- Min:') }}
                                                            {{ $t(item.min) }}
                                                        </li>
                                                        <li
                                                            class="FormLabel inline-block text-sm font-bold text-neutral"
                                                        >
                                                            {{ $t('+ Max:') }}
                                                            {{ $t(item.max) }}
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li
                                                    class="FormLabel inline-block text-xs text-neutral"
                                                    v-if="
                                                        item.tiempo != undefined &&
                                                        item.tiempo != null &&
                                                        item.tiempo != ''
                                                    "
                                                >
                                                    {{ $t('Tiempo de procesamiento:') }}
                                                    {{ $t(item.tiempo) }}
                                                </li>

                                                <li
                                                    class="FormLabel inline-block text-xs text-neutral"
                                                    v-if="
                                                        item.tiempo != undefined &&
                                                        item.tiempo != null &&
                                                        item.tiempo != ''
                                                    "
                                                >
                                                    {{ $t('Tiempo de procesamiento:') }}
                                                    {{ $t(item.tiempo) }}
                                                </li>

                                                <li
                                                    class="FormLabel inline-block text-xs text-neutral"
                                                    v-if="
                                                        item.Commission != undefined &&
                                                        item.Commission != null &&
                                                        item.Commission != ''
                                                    "
                                                >
                                                    {{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                                    <span>{{ $t('+ Servicios bancarios') }} </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- Container input -->

                                        <!-- new code -->

                                        <!--<div class="collapse-content">
                                          <div>
                                            <label
                                                class="FormLabel inline-block pr-2"
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                            >{{ $t('Min:') }}
                                              {{ $t(item.min) }}
                                            </label>
                                            <label
                                                class="FormLabel inline-block"
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                            >{{ $t('Max:') }}
                                              {{ $t(item.max) }}
                                            </label>
                                          </div>
                                          <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                            <input
                                                class="input input-bordered w-full"
                                                id="valor"
                                                v-model="model[item.id]"
                                                type="number"
                                                style=""
                                            />
                                          </div>
                                          <div class="col col-md-2 w-1/2 inline-block">
                                            <button
                                                @click="MetodoPago(item)"
                                                :disabled="
                                          model[item.id] < item.min ||
                                          model[item.id] > item.max ||
                                          model[item.id] == null ||
                                          model[item.id] == 0
                                        "
                                                id="accion_depositarvalor"
                                                class="btn btn-primary w-full text-base-100"
                                                data-use="preload"
                                                title="Next Step"
                                            >
                                        <span class="ButtonText ng-binding ng-scope">{{
                                            $t('Depositar')
                                          }}</span>
                                            </button>
                                          </div>
                                        </div>-->
                                    </div> </template
                                >
                                <p
                                    class="text-2xl font-bold text-base-100 text-center"
                                    v-if="methods_payments.length <= 0"
                                >
                                    {{ $t('No hay pasarelas de pago.') }}
                                </p>
                            </section>
                            <!-- end payment-gateways desktop -->
                            <button
                                @click="updatePaymentProcess({ currentStep: 'payment-method-selection' })"
                                class="w-fit ml-auto p-4 btn btn-secondary hover:bg-secondary-focus text-neutral-content"
                            >
                                {{ $t('Atras') }}
                            </button>
                        </div>
                        <!-- end payment-gateways content -->

                        <!-- start digital-account content -->
                        <div
                            v-if="paymentFlowState.currentStep === 'digital-account-selection' && !otherView"
                            class="w-full justify-between items-baseline flex-col h-auto bg-base-300 flex gap-4 rounded-xl"
                        >
                            <div
                                class="w-full flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                            >
                                <div
                                    v-for="(
                                        dBank, index
                                    ) in metodos_pago"
                                    :key="index"
                                    class="w-64 h-72 border-1 border-accent rounded-xl flex flex-col bg-base-300 hover:bg-base-200/50 cursor-pointer"
                                    :class="
                                        dBank.externo_id == 'Paypal' && numAccountPaypal != 0 || dBank.externo_id == 'Zelle' && numAccountZelle != 0
                                        ? 'block'
                                        : 'hidden'
                                    "
                                    @click="
                                        methodSelected = dBank;
                                        selectBank(dBank)
                                    "
                                >
                                    <section
                                        class="w-full h-[10%] flex justify-end items-center"
                                    >
                                        <span
                                            class="w-28 bg-success rounded-full mt-2 mr-3 text-[8px] text-neutral text-center font-poppinsm"
                                        >
                                            {{
                                                dBank.nombre == 'Paypal'
                                                ? $t('1 Cuenta registrada')
                                                : dBank.nombre == 'Zelle' && numAccountZelle == 1
                                                ? $t('1 Cuentas registradas')
                                                : dBank.nombre == 'Zelle' && numAccountZelle > 1
                                                ? $t('2 Cuentas registradas')
                                                : ''
                                            }}
                                        </span>
                                    </section>
                                    <section
                                        class="w-full h-[75%] flex flex-col justify-center items-center"
                                    >
                                        <p
                                            class="font-poppinsm text-neutral text-xl"
                                        >
                                            {{$t(dBank.nombre)}}
                                        </p>
                                        <div
                                                class="w-24 h-24 text-accent-focus"
                                                v-html="
                                                dBank.nombre == 'Zelle'
                                                ? zelleSVG
                                                : dBank.nombre == 'Paypal'
                                                ? paypalSVG
                                                : ''
                                            "
                                        />
                                        <p
                                            class="font-poppinsls text-neutral text-center text-[12px] leading-loose"
                                        >
                                            {{
                                                dBank.nombre == 'Zelle'
                                                ? $t('Permite enviar dinero rápido entre bancos en EE.UU.')
                                                : dBank.nombre == 'Paypal'
                                                ? $t('Plataforma digital para enviar y recibir pagos de forma segura.')
                                                : ''
                                            }}
                                        </p>
                                    </section>
                                    <section
                                        class="w-full h-[15%] flex justify-center items-center mb-2"
                                    >
                                        <button
                                            @click="
                                                methodSelected = dBank;
                                                selectBank(dBank)
                                            "
                                            class="w-11/12 h-full bg-success leading-loose text-neutral rounded-lg font-poppinsm text-sm hover:bg-success-focus transition duration-300 flex justify-center items-center "
                                        >
                                            {{$t('Selecionar')}}
                                        </button>
                                    </section>
                                </div>
                                <div
                                    v-if="numAccountPaypal === 0 && numAccountZelle === 0"
                                    class="w-full text-center text-error font-bold mt-8"
                                >
                                    <span>
                                        {{ $t('No tienes cuentas digitales registradas. Por favor ') }}
                                    </span>
                                    <RouterLink
                                        to="/gestion/cuentasdigitales"
                                        @click="appComponent.showModalDepositV2 = false"
                                        class="text-primary font-bold underline">
                                        {{ $t('agrega una cuenta') }}
                                    </RouterLink>
                                    <span>
                                        {{ $t(' para continuar.') }}
                                    </span>
                                </div>
                            </div>
                            <button
                                @click="updatePaymentProcess({ currentStep: 'payment-method-selection' })"
                                class="w-fit ml-auto p-4 btn btn-secondary hover:bg-secondary-focus text-neutral-content"
                            >
                                {{ $t('Atras') }}
                            </button>
                        </div>
                        <div
                            v-if="paymentFlowState.currentStep === 'digital-account-selection' && otherView"
                            class="w-full bg-base-300 h-auto flex flex-col justify-between items-baseline gap-2 rounded-xl"

                        >

                            <div
                                class="w-full flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                            >
                                <div
                                    class="w-64 h-48 border-1 border-accent bg-base-200 rounded-xl flex flex-col"
                                >
                                    <section
                                        class="w-full h-full flex flex-col justify-center items-center"
                                    >
                                        <p
                                            class="font-poppinsm text-neutral text-xl"
                                        >
                                            {{$t(dataOtherView.nameP)}}
                                        </p>
                                        <div
                                                class="w-24 h-24 text-accent-focus"
                                                v-html="
                                                dataOtherView.nameP == 'Zelle'
                                                ? zelleSVG
                                                : dataOtherView.nameP == 'Paypal'
                                                ? paypalSVG
                                                : ''
                                            "
                                        />
                                        <p
                                            class="font-poppinsls text-neutral text-center text-[12px] leading-loose"
                                        >
                                            {{
                                                dataOtherView.nameP == 'Zelle'
                                                ? $t('Permite enviar dinero rápido entre bancos en EE.UU.')
                                                : dataOtherView.nameP == 'Paypal'
                                                ? $t('Plataforma digital para enviar y recibir pagos de forma segura.')
                                                : ''
                                            }}
                                        </p>
                                    </section>
                                </div>
                                <div
                                    class="w-[75%] h-full flex flex-col items-center md:items-start gap-3"
                                >
                                    <span class="text-[12px] text-neutral/80 font-poppinsls text-center md:text-start">
                                        {{
                                            dataOtherView.nameP == 'Paypal'
                                            ? $t('*El numero mínimo de cuentas es 1')
                                            : dataOtherView.nameP == 'Zelle'
                                            ? $t('*El numero mínimo de cuentas es 0 y el máximo de cuentas es 2')
                                            : ''
                                        }}
                                    </span>
                                    <label class="label p-0">
                                        <span
                                            class="label-text text-neutral text-lg font-poppinsm"
                                        >{{
                                                $t(
                                                    dataOtherView.nameP == 'Paypal' && !notAccountPaypal
                                                    ? 'Cuentas registradas en Paypal'
                                                    : dataOtherView.nameP == 'Zelle' && !notAccountZelle
                                                    ? 'Cuentas registradas en Zelle'
                                                    :dataOtherView.nameP == 'Zelle'
                                                    ? 'Ingresa correo electronico o número celular'
                                                    : dataOtherView.nameP == 'Paypal'
                                                    ? 'Ingresa correo paypal'
                                                    : ''
                                                )
                                            }}
                                        </span>
                                    </label>
                                    <section
                                        v-for="
                                            (account, index) in arraySelects[
                                                dataOtherView.nameP == 'Paypal'
                                                ? 'accountPaypal'
                                                : dataOtherView.nameP == 'Zelle'
                                                ? 'accountZelle'
                                                : ''
                                            ]
                                       "
                                        :key="index"
                                        class="input border-1 border-accent h-12 w-[95%] rounded-xl text-neutral hover:bg-accent flex items-center justify-between cursor-pointer"
                                        :class="idAccountSelect == account.userbank_id ? 'bg-accent' : 'bg-base-200'"
                                        @click="selectAccount(account)"
                                    >
                                        <p
                                            class="font-poppinsm"
                                        >
                                            {{
                                                index == 0
                                                ? '1.' + ' ' + account.account
                                                : index == 1
                                                ? '2.' + ' ' + account.account
                                                : ''
                                            }}
                                        </p>
                                    </section>
                                </div>
                            </div>
                            <div>

                            </div>
                            <div
                                class="w-[96%] flex items-center justify-end gap-3 "
                            >
                                <button
                                    @click="
                                        otherView = false;
                                        methodSelected.userBank_id = '';
                                        disabledButton = true;
                                        idAccountSelect = '';
                                    "
                                    class="bg-error ver:bg-error/70 text-neutral w-24 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                >
                                    {{$t('Atrás')}}
                                </button>
                                <button
                                    :disabled="
                                        disabledButton
                                    "
                                    class="bg-success hover:bg-success/70 text-neutral w-44 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                    @click="
                                        updatePaymentProcess({
                                            currentStep: 'payment-data-entry',
                                        });
                                    "
                                >
                                    {{$t('Siguiente')}}
                                </button>
                            </div>
                        </div>
                        <!-- end digital-account content -->
                    </section>
                    <!-- end select-payment-method tabs content -->

                    <!-- start payment-data-entry -->
                    <section
                        v-if="shouldShowDataSection()"
                        class="flex flex-col gap-2 bg-base-300 p-4 rounded-lg"
                    >
                        <h3 class="w-full text-2xl font-bold text-neutral text-start">
                            {{ $t('3. Ingresar los datos') }}
                        </h3>

                        <div v-if="paymentFlowState.currentStep === 'payment-data-entry'">
                            <div class="form-control w-full">
                                <label class="label">
                                    <span class="label-text text-lg text-neutral">{{
                                        $t('Monto ') + currencySelected.Currency
                                    }}</span>
                                    <span class="label-text-alt flex gap-4 text-neutral"
                                        ><span class="text-neutral">{{ $t('Min: ') + methodSelected.min }}</span>
                                        <span
                                            v-if="methodSelected.max > 0"
                                            class="text-neutral"
                                            >{{ $t('Max: ') + methodSelected.max }}</span
                                        ></span
                                    >
                                </label>
                                <input
                                    @keyup="onChangeValueDeposit(valueDeposit)"
                                    v-model="valueDeposit.input"
                                    type="number"
                                    placeholder="$ 100"
                                    class="input input-bordered w-full text-neutral placeholder:text-input-placeholder bg-input-background"
                                    :class="'border border-' + valueDeposit.color"
                                />
                                <label class="label">
                                    <span
                                        v-if="valueDeposit.msg != ''"
                                        class="label-text-alt text-error"
                                        :class="'text-' + valueDeposit.color"
                                        >{{ valueDeposit.msg }}</span
                                    >
                                </label>
                            </div>
                            <div class="flex justify-between items-center flex-col sm:flex-row gap-4">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-lg text-neutral">{{ $t('Numero de la operacion') }}</span>
                                    </label>
                                    <input
                                        @keyup="onChangeOperationNumber(valueOperation)"
                                        v-model="valueOperation.input"
                                        type="number"
                                        placeholder="000"
                                        class="input input-bordered w-ful fill-black text-neutral placeholder:text-input-placeholder bg-input-background"
                                    />
                                    <label class="label">
                                        <span
                                            v-if="valueOperation.msg != ''"
                                            class="label-text-alt text-error"
                                            :class="'text-' + valueOperation.color"
                                            >{{ valueOperation.msg }}</span
                                        >
                                    </label>
                                </div>
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-lg text-neutral">{{ $t('Fecha') }}</span>
                                    </label>
                                    <input
                                        @keyup="onChangeOperationDate(valueDate)"
                                        @change="onChangeOperationDate(valueDate)"
                                        v-model="valueDate.input"
                                        type="date"
                                        placeholder="01-01-1999"
                                        class="input input-bordered w-full fill-black text-neutral placeholder:text-input-placeholder bg-input-background"
                                    />
                                    <label class="label">
                                        <span
                                            v-if="valueDate.msg != ''"
                                            class="label-text-alt text-error"
                                            :class="'text-' + valueDate.color"
                                            >{{ valueDate.msg }}</span
                                        >
                                    </label>
                                </div>
                            </div>
                            <div class="flex justify-end items-center gap-4 mt-2">
                                <button
                                    @click="
                                        backView(methodSelected);
                                        valueDeposit.input = '';
                                        valueOperation.input = '';
                                        valueDate.input = '';
                                    "
                                    class="p-4 btn btn-error hover:bg-error"
                                >
                                    {{ $t('Atrás') }}
                                </button>
                                <button
                                    :disabled="disabledButtonDeposit"
                                    @click="updatePaymentProcess({ currentStep: 'operation-validation' })"
                                    class="btn btn-success hover:bg-success/50 text-neutral"
                                >
                                    {{ $t('Siguiente') }}
                                </button>
                            </div>
                        </div>
                    </section>
                    <!-- end payment-data-entry -->

                    <!-- start operation-validation -->
                    <section
                        v-if="shouldShowDataSection()"
                        class="flex flex-col gap-2 bg-base-300 p-4 rounded-lg"
                    >
                        <h3 class="w-full text-2xl font-bold text-neutral text-start">
                            {{ $t('4. Verifica la operación') }}
                        </h3>

                        <div
                            v-if="paymentFlowState.currentStep === 'operation-validation'"
                            class="flex flex-col gap-6"
                        >
                            <div class="text-lg text-neutral">
                                <p class="">
                                    {{ $t('Usuario: ') }}
                                    <span class="uppercase">{{ appComponent.session.nombre }}</span>
                                </p>
                                <p class="">{{ $t('Moneda: ') + currencySelected.Currency }}</p>
                                <p class="">{{ $t('Monto: $') + valueDeposit.input }}</p>
                                <p class="">
                                    {{ '# ' + $t('Operacion: ') + valueOperation.input }}
                                </p>
                                <p class="">{{ $t('Fecha: ') + valueDate.input }}</p>
                            </div>

                            <div class="flex justify-end items-center gap-4 mt-2">
                                <button
                                    @click="
                                        updatePaymentProcess({
                                            currentStep: 'payment-data-entry',
                                        })
                                    "
                                    class="p-4 btn btn-error hover:bg-error/50"
                                >
                                    Atras
                                </button>
                                <button
                                    :disabled="disabledButtonDeposit"
                                    @click="
                                        updatePaymentProcess({
                                            isPaymentActive: false,
                                            currentStep: null,
                                        });
                                        onSubmitFormDeposit();
                                    "
                                    class="btn btn-success hover:bg-success/50 text-neutral"
                                >
                                    {{ $t('Enviar datos') }}
                                </button>
                            </div>
                        </div>
                    </section>
                    <!-- end operation-validation -->
                </div>
                <!-- Fin flujo de pagos -->
            </section>
            <ul
                v-else
                class="AmountFields"
                :class="route.path != '/landing/depositos' && route.path != '/landing/depositos-ecuador' ? 'pt-4' : ''"
            >
                <!-- Main container for the payment gateways list -->
                <li v-if="config_methods.length > 0">
                    <div
                        class="w-full py-2 px-1 flex flex-row flex-nowrap flex-shrink-0 justify-start items-center overflow-auto gap-x-5 my-8"
                    >
                        <!-- Loop through each payment method in config_methods -->
                        <a
                            v-for="(item, index) in config_methods"
                            target="_blank"
                            class="flex flex-shrink-0 flex-col w-[170px] rounded-xl justify-center items-center bg-base-400 bg-gradient-to-t from-base-100 to-base-400 border-solid border-3 border-neutral-content"
                            style="box-shadow: 0px 0px 5px #0000004f"
                        >
                            <div class="w-3/5 h-[4.5rem] mt-3">
                                <!-- Display payment method image if available -->
                                <img
                                    v-if="item.imagen != ''"
                                    :src="item.imagen"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                            <div
                                class=" "
                                v-if="!item.configured"
                            >
                                <!-- Button to configure payment method if not configured -->
                                <button
                                    @click="confirmedMethods(item)"
                                    class="border-1 border-solid border-success bg-success px-8 py-2 text-xs text-neutral rounded-md my-4 hover:scale-105"
                                >
                                    <span class="ButtonText ng-binding ng-scope">{{ $t('Configurar') }}</span>
                                </button>
                            </div>
                            <div
                                class="flex justify-center flex-col items-center"
                                v-if="item.configured"
                            >
                                <!-- Input for amount to deposit -->
                                <input
                                    id="valor"
                                    v-model="model[item.id]"
                                    type="number"
                                    class="w-4/5 rounded-full border-input-border bg-input-background text-neutral"
                                />
                                <!-- Button to deposit if conditions are met -->
                                <button
                                    v-if="!appComponent.disabledButtonForm"
                                    @click="MetodoPago(item)"
                                    :disabled="
                                        model[item.id] < item.min ||
                                        model[item.id] > item.max ||
                                        model[item.id] == null ||
                                        model[item.id] == 0 ||
                                        appComponent.disabledButtonForm
                                    "
                                    id="accion_depositarvalor"
                                    class="border-1 border-solid border-success bg-success px-8 py-2 text-xs text-neutral rounded-md my-4 hover:scale-105"
                                    data-use="preload"
                                    title="Next Step"
                                    :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    :data-analytics-position="String(index + 1)"
                                    :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                >
                                    <div class="flex justify-center items-center gap-2">
                                        <span class="ButtonText ng-binding ng-scope">
                                            {{ $t('Depositar') }}
                                        </span>
                                    </div>
                                </button>
                                <!-- Disabled button state -->
                                <button
                                    v-else
                                    :disabled="appComponent.disabledButtonForm"
                                    id="accion_depositarvalor"
                                    class="border-1 border-solid border-success bg-success px-8 py-2 text-xs text-neutral rounded-md my-4"
                                    data-use="preload"
                                    title="Next Step"
                                    data-analytics-label="deposit:open"
                                    data-analytics-context="step:select-method|step-num:1"
                                >
                                    <div class="flex justify-center items-center gap-2">
                                        <span class="ButtonText ng-binding ng-scope">
                                            {{ $t('Depositar') }}
                                        </span>
                                        <svg
                                            aria-hidden="true"
                                            role="status"
                                            class="inline w-4 h-4 text-white animate-spin"
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
                                    </div>
                                </button>
                            </div>
                        </a>
                    </div>
                </li>
                <!-- Conditional rendering for credit card deposits -->
                <div
                    v-if="
                        config.depositos != undefined &&
                        config.depositos.creditCardsPayments != undefined &&
                        config.depositos.creditCardsPayments[appComponent.country] != undefined &&
                        config.depositos.creditCardsPayments[appComponent.country]
                    "
                >
                    <div>
                        <div class="add-card-c float-right"
                        v-if="!disableAddCardButton">
                            <!-- Button to add a new credit card -->
                            <button
                                class="add-card btn w-30 text-neutral bg-success"
                                data-use="preload"
                            >
                                <RouterLink
                                    :to="'/gestion/tarjetas-credito'"
                                    class="ButtonText text-info ng-binding ng-scope"
                                >{{ $t('Añadir una Tarjeta') }}
                                </RouterLink>
                            </button>
                        </div>
                        <li
                            class="FormItem fldCurrency"
                            id="fldCurrency"
                        >
                            <label
                                class="FormLabel"
                                :class="{
                                    'text-neutral': config.layout != undefined && config.layout == 3,
                                }"
                                >{{
                                    $t(
                                        'Nota: Todas las Tarjetas deben estar registradas para recargar su cuenta Justbet/Acropolis. Agregue su tarjeta de débito/crédito y comience el proceso de registro.',
                                    )
                                }}</label
                            >
                        </li>
                    </div>
                    <div
                        class="card-c"
                        v-if="
                            credit_cards.length > 0 &&
                            (config.depositos == undefined ||
                                config.depositos.styleVersion == undefined ||
                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                config.depositos.styleVersion[appComponent.country] != 4)
                        "
                    >
                        <!-- Loop through each credit card -->
                        <div
                            class="cardT w-full rounded-box mb-3"
                            v-bind:class="{
                                'collapse collapse-plus collapse-open': appComponent.mobile,
                            }"
                            v-for="(item, index) in credit_cards"
                        >
                            <input
                                type="checkbox"
                                class="hidden md:hidden"
                            />
                            <div class="collapse-title text-xl font-medium pr-10">
                                <div class="row metodos-pago grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
                                    <div class="flex justify-center items-center">
                                        <!-- Display credit card image -->
                                        <img
                                            style="width: auto; height: auto; max-height: 54px; border-radius: 5px"
                                            :src="item.imagen"
                                        />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-2"
                                    >
                                        <div class="hidden md:block">
                                            <label
                                                class="FormLabel inline-block pr-2"
                                                style="font-size: 12px; color: gray"
                                                >{{ $t('Número de la Tarjeta') }}</label
                                            >
                                        </div>
                                        <label
                                            class="FormLabel div-inline-block font-bold"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                            for="valor"
                                            >{{ $t(item.cuenta) }}</label
                                        >
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <!-- Input for amount to deposit for credit card -->
                                        <input
                                            class="input input-bordered w-full text-black bg-neutral"
                                            placeholder="Cantidad"
                                            v-model="modelCards[item.id]"
                                            type="number"
                                        />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                        v-if="item.activateCvc == 'S'"
                                    >
                                        <!-- Input for CVV if required -->
                                        <input
                                            class="input input-bordered w-full"
                                            placeholder="CVV"
                                            maxlength="3"
                                            v-model="cvv[item.id]"
                                            type="string"
                                            onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                                        />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <div
                                            v-if="!appComponent.disabledButtonForm"
                                            class="deposit-c"
                                        >
                                            <!-- Button to deposit using credit card -->
                                            <button
                                                id="accion_depositarvalor"
                                                @click="creditCardPayment(item)"
                                                :disabled="
                                                    modelCards[item.id] == null ||
                                                    modelCards[item.id] == 0 ||
                                                    (item.activateCvc == 'S' &&
                                                        (cvv[item.id] == null ||
                                                            cvv[item.id].length == '' ||
                                                            cvv[item.id].length < 3))
                                                "
                                                class="btn w-full text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
                                            >
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                        <div
                                            v-else
                                            class="w-auto flex justify-center items-center"
                                        >
                                            <!-- Disabled button state -->
                                            <button
                                                disabled
                                                id="accion_depositarvalor"
                                                class="btn w-auto text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
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
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="collapse-content">
                                <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                    <!-- Input for amount to deposit in collapsed view -->
                                    <input
                                        class="input input-bordered w-full"
                                        placeholder="Cantidad"
                                        v-model="modelCards[item.id]"
                                        type="number"
                                    />
                                </div>
                                <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                    <!-- Input for CVV in collapsed view -->
                                    <input
                                        class="input input-bordered w-full"
                                        placeholder="CVV"
                                        maxlength="3"
                                        v-model="cvv[item.id]"
                                        type="string"
                                        onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                                    />
                                </div>
                                <div class="col col-md-2 w-1/2 inline-block">
                                    <!-- Button to deposit in collapsed view -->
                                    <button
                                        @click="creditCardPayment(item)"
                                        :disabled="
                                            modelCards[item.id] == null ||
                                            modelCards[item.id] == 0 ||
                                            (item.activateCvc == 'S' &&
                                                (cvv[item.id] == null ||
                                                    cvv[item.id].length == '' ||
                                                    cvv[item.id].length < 3))
                                        "
                                        class="btn btn-success w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        data-analytics-label="deposit:open"
                                        data-analytics-context="step:select-method|step-num:1"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <li
                        style="margin-bottom: 10px; margin-top: 10px; border-top: 1px solid #9e99ac; padding-top: 5px"
                        class="FormItem fldAmount"
                        id="fldAmount"
                        v-if="credit_cards.length == 0"
                    >
                        <div class="row">
                            <div
                                style="width: 100%; display: inline-block; vertical-align: top"
                                class="col col-md-12"
                            >
                                <!-- Message indicating no credit cards added -->
                                <label
                                    class="FormLabel div-inline-block"
                                    style="width: 100%; font-size: 12px; color: gray; text-align: center"
                                >
                                    {{ $t('Sin tarjetas de crédito agregadas') }}
                                </label>
                            </div>
                        </div>
                    </li>
                    <li
                        style="margin-bottom: 10px; margin-top: 10px; border-top: 1px solid #9e99ac; padding-top: 5px"
                        v-if="config.creditCards != undefined && config.creditCards.showInfo"
                        class="FormItem fldAmount"
                        id="fldAmount"
                    >
                        <div class="row">
                            <div
                                style="width: 100%; display: inline-block; vertical-align: top"
                                class="col col-md-12"
                            >
                                <!-- Instructions for JustBet card registration -->
                                <label
                                    class="FormLabel div-inline-block float-right"
                                    style="width: 100%; font-size: 12px; color: gray; text-align: justify"
                                >
                                    <h2>{{ $t('JustBet Card Registration Instructions') }}</h2>
                                    <p>{{ $t('1.	Login into your Just bet account.') }}</p>
                                    <p>
                                        {{ $t('2.	Go to managing, then select the “Deposit” or “Manage Cards” tab.') }}
                                    </p>
                                    <p>
                                        {{ $t('3.	Click “Add Card” and input the credit/debit card information.') }}
                                    </p>
                                    <p>
                                        {{ $t('4.	Once card is added, follow the instructions that pop up.') }}
                                    </p>
                                    <p>
                                        {{
                                            $t(
                                                '5.	To confirm registration: Contact your financial institution to confirm amount that was automatically charged to your account. Once confirmed, your financial institution will remove charges.',
                                            )
                                        }}
                                    </p>
                                    <p>
                                        {{
                                            $t(
                                                '6.	After receiving confirmation from financial institution, please input the amount charged to your account in pop up.',
                                            )
                                        }}
                                    </p>
                                    <p>
                                        {{
                                            $t(
                                                '7.	Once the amount is correct, the card registration should be successful.',
                                            )
                                        }}
                                    </p>
                                    <p>{{ $t('8.	Card Registration is complete.') }}</p>
                                </label>
                            </div>
                        </div>
                    </li>
                </div>
                <!-- Section for payment gateways based on style version -->
                <section
                    v-if="
                        config.depositos != undefined &&
                        config.depositos.styleVersion != undefined &&
                        config.depositos.styleVersion[appComponent.country] != undefined &&
                        config.depositos.styleVersion[appComponent.country] == 3
                    "
                    class="cursor-pointer"
                >
                    <div v-for="(pasarela, index) in pasarelas_pago_v2">
                        <div
                            v-if="pasarela.id == ''"
                            class="w-full flex flex-col md:flex-row gap-x-2 md:gap-x-0 bg-gradient-to-b from-[#F2F0F0] via-[#dddddd] to-[#cbcbcb] justify-between items-center rounded-xl mt-4 border-solid border-3 border-neutral"
                        >
                            <div class="flex flex-col md:flex-row justify-center items-center gap-x-2">
                                <!-- Display payment gateway logo -->
                                <img
                                    class="w-[80px] h-[80px] md:w-[80px] md:h-[80px] object-contain p-2 ml-1"
                                    :src="
                                        pasarela.pasarelas[0].pasarela.imagen != ''
                                            ? pasarela.pasarelas[0].pasarela.imagen
                                            : config.logo
                                    "
                                    @error="pasarela.pasarelas[0].pasarela.imagen = config.logo"
                                    alt=""
                                />
                                <div class="flex flex-col justify-center items-start px-5 gap-y-1">
                                    <p class="font-medium text-sm md:text-xl text-black">
                                        {{ pasarela.pasarelas[0].pasarela.nombre }}
                                    </p>
                                    <p class="text-xs text-black">
                                        Min: {{ pasarela.pasarelas[0].pasarela.min }} Max:
                                        {{ pasarela.pasarelas[0].pasarela.max }}
                                    </p>
                                    <p
                                        v-if="
                                            pasarela.pasarelas[0].pasarela.tiempo != undefined &&
                                            pasarela.pasarelas[0].pasarela.tiempo != ''
                                        "
                                        class="text-xs text-black"
                                    >
                                        {{ $t('Tiempo de procesamiento:') }}
                                        {{ pasarela.pasarelas[0].pasarela.tiempo }}
                                    </p>
                                    <p
                                        class="text-xs text-black"
                                        v-if="
                                            pasarela.pasarelas[0].pasarela.Commission != undefined &&
                                            pasarela.pasarelas[0].pasarela.Commission != ''
                                        "
                                    >
                                        {{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                    </p>
                                </div>
                            </div>
                            <div
                                class="flex flex-row justify-center items-center gap-y-2 gap-x-4 mr-2 md:mr-3 my-3 md:my-0"
                            >
                                <!-- Input for amount to deposit -->
                                <input
                                    v-model="model[pasarela.pasarelas[0].pasarela.id]"
                                    type="number"
                                    name="asd"
                                    id=""
                                    class="btn shadow-md rounded-lg w-24 h-11 bg-gradient-to-t from-[#E4E4E4] to-[#F9F9F9ff] border-solid border-2 border-neutral"
                                />
                                <!-- Button to deposit -->
                                <button
                                    @click="MetodoPago(pasarela.pasarelas[0].pasarela)"
                                    :disabled="
                                        model[pasarela.pasarelas[0].pasarela.id] < pasarela.pasarelas[0].pasarela.min ||
                                        model[pasarela.pasarelas[0].pasarela.id] > pasarela.pasarelas[0].pasarela.max ||
                                        model[pasarela.pasarelas[0].pasarela.id] == null ||
                                        model[pasarela.pasarelas[0].pasarela.id] == 0
                                    "
                                    class="btn w-24 border-solid border-2 hover:scale-105 font-light border-success rounded-lg bg-gradient-to-b from-[#4BA64B] to-[#357A37] text-white h-11"
                                    data-analytics-label="deposit:open"
                                    data-analytics-context="step:select-method|step-num:1"
                                >
                                    {{ $t('Depositar') }}
                                </button>
                            </div>
                        </div>
                        <div
                            tabindex="0"
                            v-else
                            class="collapse collapse-arrow group my-3"
                        >
                            <input
                                type="checkbox"
                                class="w-full h-full"
                                aria-labelledby="depositmodal"
                            />
                            <div
                                class="collapse-title text-xl text-black flex justify-between after:md:w-[18px] after:md:h-[18px] group-hover:shadow-xl h-16 md:h-24 items-center group-hover:text-white font-medium text-center bg-gradient-to-b from-[#D6D6D6] to-[#EAEAEA] group-hover:bg-grandient-to-r group-hover:from-gray-300 group-hover:to-gray-500 rounded-xl border-solid border-3 group-hover:after:text-white after:text-[#797979] border-white"
                                id="depositmodal"
                            >
                                <div
                                    class="w-full flex flex-row gap-x-2 md:gap-x-6 justify-start items-center pointer-events-none"
                                >
                                    <!-- Display payment gateway logo -->
                                    <img
                                        class="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-contain p-2 pointer-events-none"
                                        :src="
                                            pasarela.pasarelas[0].pasarela.pasarela != ''
                                                ? pasarela.pasarelas[0].pasarela.pasarela
                                                : config.logo
                                        "
                                        alt=""
                                        @error="pasarela.pasarelas[0].pasarela.pasarela = config.logoWhite"
                                    />
                                    <p
                                        class="font-medium text-sm md:text-xl group-hover:text-white pointer-events-none"
                                    >
                                        {{ pasarela.id }}
                                    </p>
                                </div>
                            </div>
                            <div class="collapse-content text-justify bg-[#C6C6C6] rounded-xl px-0">
                                <div
                                    v-for="(item, index) in pasarela.pasarelas"
                                    class="flex flex-col justify-start items-center md:items-end"
                                >
                                    <div
                                        class="w-11/12 md:w-[85%] flex flex-col md:flex-row gap-x-2 md:gap-x-0 bg-gradient-to-b from-[#F2F0F0] via-[#FDFDFD] to-[#FDFDFD] justify-between items-center rounded-xl mt-4 border-solid border-3 border-white"
                                    >
                                        <div class="flex flex-col md:flex-row justify-center items-center gap-x-2">
                                            <!-- Display payment method image -->
                                            <img
                                                class="w-[80px] h-[80px] md:w-[80px] md:h-[80px] object-contain p-2 ml-1"
                                                :src="item.pasarela.imagen != '' ? item.pasarela.imagen : config.logo"
                                                @error="item.pasarela.imagen = config.logo"
                                                alt=""
                                            />
                                            <div class="flex flex-col justify-center items-start px-5 gap-y-1">
                                                <p class="font-medium text-sm md:text-xl text-black">
                                                    {{ item.pasarela.nombre }}
                                                </p>
                                                <p class="text-xs text-black">
                                                    Min: {{ item.pasarela.min }} Max:
                                                    {{ item.pasarela.max }}
                                                </p>
                                                <p
                                                    v-if="
                                                        item.pasarela.tiempo != undefined && item.pasarela.tiempo != ''
                                                    "
                                                    class="text-xs text-black"
                                                >
                                                    {{ $t('Tiempo de procesamiento:') }}
                                                    {{ item.pasarela.tiempo }}
                                                </p>
                                                <p
                                                    v-if="
                                                        item.pasarela.Commission != undefined &&
                                                        item.pasarela.Commission != ''
                                                    "
                                                    class="text-xs text-black"
                                                >
                                                    {{ $t('Comisión:') }}
                                                    {{ item.pasarela.Commission }}%
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="flex flex-row justify-center items-center gap-y-2 gap-x-4 mr-2 md:mr-3 my-3 md:my-0"
                                        >
                                            <!-- Input for amount to deposit -->
                                            <input
                                                v-model="model[item.pasarela.id]"
                                                type="number"
                                                name="asd"
                                                id=""
                                                class="btn shadow-md rounded-lg w-24 h-11 bg-gradient-to-t from-[#E4E4E4] to-[#F9F9F9ff] border-solid border-2 border-white"
                                            />
                                            <!-- Button to deposit -->
                                            <button
                                                @click="MetodoPago(item.pasarela)"
                                                :disabled="
                                                    model[item.pasarela.id] < item.pasarela.min ||
                                                    model[item.pasarela.id] > item.pasarela.max ||
                                                    model[item.pasarela.id] == null ||
                                                    model[item.pasarela.id] == 0
                                                "
                                                class="btn w-24 border-solid border-2 font-light border-success rounded-lg bg-gradient-to-b from-[#4BA64B] to-[#357A37] text-white h-11 hover:scale-105"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
                                            >
                                                {{ $t('Depositar') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    v-if="
                        config.depositos != undefined &&
                        config.depositos.styleVersion != undefined &&
                        config.depositos.styleVersion[appComponent.country] != undefined &&
                        config.depositos.styleVersion[appComponent.country] == 4
                    "
                    class="w-full min-h-[400px] h-auto flex flex-col md:flex-row gap-x-10 md:bg-base-100 rounded-xl p-2 sm:p-9 md:border-solid md:border-1 md:border-neutral/20 md:shadow-[0px_5px_9px_1px_#00000078]"
                >
                    <div class="w-full md:w-[60%] h-full">
                        <p class="text-md md:text-lg text-neutral-text font-poppinssb mb-4 md:mb-2">
                            Métodos de pagos
                        </p>
                        <template
                            v-if="
                                config.depositos != undefined &&
                                config.depositos.creditCardsPayments != undefined &&
                                config.depositos.creditCardsPayments
                            "
                        >
                            <div
                                class="flex justify-between cursor-pointer"
                                @click="() => (credit_cards.open = !credit_cards.open)"
                            >
                                <span class="text-xs md:text-sm font-poppins text-info capitalize">{{
                                        $t('Tarjetas')
                                    }}</span>
                                <ArrowDown
                                    :height="15"
                                    :width="15"
                                    :class="[
                                        credit_cards.open == true ? 'rotate-180  ' : '',
                                        { hidden: credit_cards.length < 6 },
                                    ]"
                                    class="transition-all ease-in-out duration-300 fill-neutral"
                                />
                            </div>
                            <div
                                class="container-pay grid grid-cols-[30%_30%_30%] gap-2 md:grid-cols-[20%_20%_20%_20%] my-5 h-auto"
                            >
                                <template v-for="(item, index) in credit_cards">
                                    <label
                                        :class="
                                            credit_cards.open
                                                ? 'block'
                                                : (credit_cards.open == false || credit_cards.open == undefined) &&
                                                  config.mobileL == '' &&
                                                  index >= 4
                                                ? 'hidden'
                                                : (credit_cards.open == false || credit_cards.open == undefined) &&
                                                  config.mobileL != '' &&
                                                  index >= 3
                                                ? 'hidden'
                                                : 'block'
                                        "
                                        class="w-full h-[70px] md:h-[90px] cursor-pointer flex justify-center items-center relative"
                                    >
                                        <input
                                            type="radio"
                                            name="payments"
                                            id=""
                                            :value="item"
                                            class="hidden peer"
                                            v-model="selectedPayment"
                                        />
                                        <p
                                            class="absolute w-4/5 text-center break-words text-xs bottom-4 drop-shadow-[0px_0px_2px:white]"
                                        >
                                            {{ item.cuenta }}
                                        </p>
                                        <img
                                            :src="item.imagen"
                                            alt=""
                                            :class="selectedPayment == item ? 'border-success' : 'border-neutral'"
                                            class="object-contain w-full h-full border-solid flex justify-center items-center bg-accent hover:border-success border-1 rounded-md overflow-hidden"
                                        />
                                        <span
                                            v-if="selectedPayment?.id == item.id && item.activateCvc == 'S'"
                                            class="w-full h-full overflow-hidden absolute top-0 left-0 bg-base-400/90 rounded-md text-neutral flex justify-center items-center flex-col"
                                        >
                                            <p
                                                v-if="selectedPayment?.id == item.id && cvv[item.id]?.length != 3"
                                                class="text-xs md:text-base w-4/5 break-words text-center"
                                            >
                                                {{ $t('Ingrese CVV:') }}
                                            </p>
                                            <input
                                                class="input input-bordered h-5 w-4/5 flex text-center text-neutral-content text-xs md:text-base"
                                                v-model="cvv[item.id]"
                                                :class="[
                                                    cvv[item.id]?.length > 2
                                                        ? ''
                                                        : 'border-solid border-1 border-red-700',
                                                    selectedPayment?.id == item.id && cvv[item.id]?.length != 3
                                                        ? 'rounded-lg'
                                                        : 'rounded-none',
                                                ]"
                                                placeholder="CVV"
                                                maxlength="3"
                                                type="string"
                                                onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                                            />
                                            <IconCheckV2
                                                v-if="selectedPayment?.id == item.id && cvv[item.id]?.length == 3"
                                                width="20"
                                                height="20"
                                                class="w-4 h-4 md:w-6 md:h-6 fill-success absolute top-[4px] right-[3px]"
                                            ></IconCheckV2>
                                        </span>
                                    </label>
                                </template>
                            </div>
                        </template>
                        <template v-for="(payment, index) in pasarelas_pago_v2">
                            <div
                                class="flex justify-between cursor-pointer"
                                @click="() => (payment.open = !payment.open)"
                            >
                                <span class="text-base md:text-base font-poppins text-neutral capitalize">{{
                                        payment.id
                                    }}</span>
                                <ArrowDown
                                    :fill="'#ffffff'"
                                    :height="15"
                                    :width="15"
                                    :class="[
                                        payment.open == true ? 'rotate-180 ' : '',
                                        { hidden: payment.pasarelas.length < 6 },
                                    ]"
                                    class="transition-all ease-in-out duration-300"
                                />
                            </div>
                            <div class="container-pay grid gap-x-4 md:gap-x-7 my-5 h-auto">
                                <template v-for="(item, index) in payment.pasarelas">
                                    <label
                                        :class="
                                            payment.open
                                                ? 'block'
                                                : (payment.open == false || payment.open == undefined) &&
                                                  config.mobileL == '' &&
                                                  index >= 4
                                                ? 'hidden'
                                                : (payment.open == false || payment.open == undefined) &&
                                                  config.mobileL != '' &&
                                                  index >= 3
                                                ? 'hidden'
                                                : 'block'
                                        "
                                        :title="item.pasarela.nombre"
                                        class="w-full h-[70px] md:h-[90px] cursor-pointer flex justify-center items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="payments"
                                            id=""
                                            :value="item"
                                            class="hidden peer"
                                            v-model="selectedPayment"
                                        />
                                        <img
                                            :src="item.pasarela.imagen"
                                            alt=""
                                            :class="selectedPayment == item ? 'border-success' : 'border-neutral'"
                                            class="object-fill w-full h-full border-solid flex justify-center items-center bg-accent hover:border-success border-1 rounded-md overflow-hidden"
                                        />
                                    </label>
                                </template>
                            </div>
                        </template>
                    </div>
                    <div class="w-full md:w-[40%] h-full">
                        <p class="text-md md:text-lg text-neutral-text font-poppinssb mb-4 md:mb-2">
                            {{ $t('Cantidad') }}
                        </p>
                        <p class="text-sm md:text-base font-poppins text-info">
                            {{ $t('Selecciona cantidad predeterminada') }}
                        </p>
                        <div
                            class="grid my-5 grid-cols-[30%_30%_30%] gap-y-0 md:gap-y-4 container-options justify-between *:opacity-10"
                        >
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    :value="10"
                                    id=""
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 10 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    10 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    :value="100"
                                    id=""
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 100 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    100 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    id=""
                                    :value="200"
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 200 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    200 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    id=""
                                    :value="1000"
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 1000 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    1000 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    id=""
                                    :value="5000"
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 5000 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    5000 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label class="cursor-pointer">
                                <input
                                    class="hidden"
                                    type="radio"
                                    name="deposit"
                                    id=""
                                    :value="10000"
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                />
                                <p
                                    :class="amountPayment == 10000 ? 'border-success' : 'border-neutral/10'"
                                    class="w-full h-[70px] text-center md:h-[90px] bg-accent/70 rounded-md flex justify-center items-center text-info font-poppinssl border-solid border-1"
                                >
                                    10000 {{ appComponent.session.moneda }}
                                </p>
                            </label>
                            <label
                                for="aa"
                                class="col-span-3 relative peer mt-4"
                            >
                                <!-- Input for custom amount -->
                                <input
                                    type="number"
                                    name=""
                                    v-model="amountPayment"
                                    data-analytics-label="deposit:amount-input"
                                    :data-analytics-context="`step:enter-amount|step-num:2|method:${String((paramsModal && (paramsModal.externo_id || paramsModal.nombre_pasarela || paramsModal.pasarelatxt || paramsModal.id)) || (methodSelected && (methodSelected.externo_id || methodSelected.nombre_pasarela || methodSelected.pasarelatxt || methodSelected.id)) || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    min="0"
                                    oninput="this.value = Math.abs(this.value)"
                                    :class="
                                        amountPayment != null &&
                                        amountPayment != 10 &&
                                        amountPayment != 100 &&
                                        amountPayment != 200 &&
                                        amountPayment != 1000 &&
                                        amountPayment != 5000 &&
                                        amountPayment != 10000
                                            ? 'border-success'
                                            : ''
                                    "
                                    class="text-xs md:text-sm bg-neutral-content focus:border-success focus:ring-0 text-neutral font-poppinssb rounded-md text-center w-full p-2 md:p-4"
                                    placeholder="Cantidad"
                                />
                            </label>
                        </div>
                        <p
                            v-if="selectedPayment?.pasarela"
                            class="w-full text-center italic text-neutral/80"
                        >
                            {{ $t('min: ') }} {{ selectedPayment?.pasarela?.min }} {{ appComponent.session.moneda }}
                            {{ $t(' max: ') }}
                            {{ selectedPayment?.pasarela?.max }}
                            {{ appComponent.session.moneda }}
                        </p>
                        <!-- Button to deposit with selected payment method -->
                        <button
                            v-if="selectedPayment?.cuenta"
                            :disabled="
                                amountPayment == null ||
                                amountPayment == 0 ||
                                (selectedPayment?.activateCvc == 'S' &&
                                    (cvv[selectedPayment?.id] == null ||
                                        cvv[selectedPayment?.id].length == '' ||
                                        cvv[selectedPayment?.id].length < 3))
                            "
                            @click="
                                amountPayment = amountPayment;
                                creditCardPayment(selectedPayment);
                            "
                            id="accion_depositarvalor"
                            class="text-xs disabled:saturate-0 disabled:opacity-70 md:text-sm cursor-pointer mt-7 p-2 md:p-4 capitalize text-info hover:from-black/20 hover:to-black/20 border-solid border-1 border-success font-poppinssb rounded-md text-center w-full bg-gradient-to-b from-success to-black/50 bg-success"
                            data-analytics-label="deposit:open"
                            data-analytics-context="step:select-method|step-num:1"
                        >
                            {{ $t('Depositar') }}
                        </button>
                        <!-- Button to deposit if no account selected -->
                        <button
                            v-else
                            @click="MetodoPago(selectedPayment?.pasarela)"
                            :disabled="
                                amountPayment < selectedPayment?.pasarela?.min ||
                                amountPayment > selectedPayment?.pasarela?.max ||
                                selectedPayment?.pasarela?.id == null ||
                                selectedPayment?.pasarela?.id == 0
                            "
                            id="accion_depositarvalor"
                            class="text-xs disabled:saturate-0 disabled:opacity-70 md:text-sm cursor-pointer mt-7 p-2 md:p-4 capitalize text-info hover:from-black/20 hover:to-black/20 border-solid border-1 border-success font-poppinssb rounded-md text-center w-full bg-gradient-to-b from-success to-black/50 bg-success"
                            data-analytics-label="deposit:open"
                            data-analytics-context="step:select-method|step-num:1"
                        >
                            {{ $t('Depositar') }}
                        </button>
                    </div>
                </section>
                <!-- List item for currency form, displayed based on payment methods and deposit tax configuration -->
                <li
                    class="FormItem fldCurrency"
                    id="fldCurrency"
                    v-if="
                        metodos_pago.length > 0 &&
                        config.depositos.TaxDeposit > 0 &&
                        config.depositos.TaxDeposit != undefined
                    "
                    :class="[
                        {
                            hidden:
                                config.layout != undefined &&
                                config.layout == 3 &&
                                (route.path == '/landing/depositos' || route.path == '/landing/depositos-ecuador'),
                        },
                    ]"
                >
                    <!-- Display deposit text if tax deposit conditions are met -->
                    <span
                        v-if="
                            config.depositos.TaxDeposit > 0 &&
                            config.depositos.TaxDeposit != undefined &&
                            config.depositos.TaxDepositBalance != undefined &&
                            config.depositos.TaxDepositBalance > 0
                        "
                        v-html="config.depositos.textDeposit"
                    ></span>
                </li>
                <!-- Select component for payment methods, shown based on configuration -->
                <div
                    class="c-select"
                    v-if="
                        config.depositos != undefined &&
                        config.depositos.styleVersion != undefined &&
                        config.depositos.styleVersion[appComponent.country] != undefined &&
                        config.depositos.styleVersion[appComponent.country] == 2
                    "
                    v-hide="modalMetodos"
                >
                    <div>
                        <ul class="pasarela cursor-pointer">
                            <!-- List of payment gateways, clickable to select -->
                            <li
                                class="rounded-xl hover:bg-primary-content bg-gradient-to-r from-gray-100 via-gray-100 to-primary-content/80 shadow-xl"
                                v-for="(item, index) in pasarelas_pago"
                                @click="SelectPasarela(item)"
                                v-bind:class="{ active: item.id == selectedPasarela }"
                            >
                                <span
                                    ><img
                                        :src="item.img"
                                        alt=""
                                /></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal for payment methods, shown based on modal state -->
                <div
                    class="modal-metodos md:relative"
                    v-show="modalMetodos"
                >
                    <!-- Button to close the modal -->
                    <button
                        class="go_back bg-gradient-to-r from-base-500 to-neutral-content btn"
                        @click="modalMetodos = false"
                    >
                        {{ $t('Volver') }}
                    </button>

                    <div class="c-select">
                        <div
                            class="dropdown"
                            :class="{ active: selLabelClick }"
                        >
                            <!-- Dropdown label for payment methods -->
                            <span
                                class="selLabel bg-primary-content rounded-xl bg-gradient-to-r from-gray-100 to-primary-content/80 shadow-xl text-black"
                                @click="selLabelClick = !selLabelClick"
                                >{{ $t('Métodos de pago') }}</span
                            >
                            <input
                                type="hidden"
                                name="cd-dropdown"
                            />
                            <ul class="dropdown-list md:relative">
                                <!-- Hidden list item for mobile view -->
                                <li
                                    data-value="0"
                                    class="md:hidden"
                                    @click="selLabelClick = false"
                                >
                                    <span><img alt="" /></span>
                                </li>
                                <!-- List of payment methods, clickable to select -->
                                <li
                                    class="hover:bg-gray-100"
                                    v-for="(item, index) in metodos_pago"
                                    data-value="item.id"
                                    @click="
                                        selectedPayment = item.id;
                                        selLabelClick = false;
                                    "
                                >
                                    <div v-if="item.id_pasarela == selectedPasarela">
                                        <span
                                            ><img
                                                :src="item.imagen"
                                                alt=""
                                            />{{ $t(item.nombre) }}</span
                                        >
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- List of payment methods for mobile view -->
                    <li
                        class="metodos_pago_mobile"
                        id="fldAmount"
                        v-for="(item, index) in metodos_pago"
                    >
                        <div
                            class="cardT w-full rounded-box mb-3"
                            v-if="item.id == selectedPayment && !selLabelClick"
                            v-bind:class="{
                                'collapse collapse-plus collapse-open': appComponent.mobile,
                            }"
                        >
                            <input
                                type="checkbox"
                                class="hidden md:hidden"
                            />
                            <div class="collapse-title text-xl font-medium pr-10">
                                <div class="row metodos-pago grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
                                    <div
                                        class="flex justify-center items-center"
                                        style=""
                                    >
                                        <img
                                            style="
                                                padding: 5px 5px;
                                                width: auto;
                                                height: auto;
                                                max-height: 54px;
                                                border-radius: 5px;
                                            "
                                            :src="item.imagen"
                                            v-if="item.imagen != ''"
                                        />
                                        <div
                                            class="text-center"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                            v-if="item.imagentxt != ''"
                                        >
                                            {{ item.imagentxt }}
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-2"
                                    >
                                        <label
                                            class="FormLabel div-inline-block"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                            for="valor"
                                            >{{ $t(item.nombre) }}
                                        </label>
                                        <div class="hidden md:block leading-[13px]">
                                            <label
                                                class="FormLabel inline-block pr-2"
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Min:') }}
                                                {{ $t(item.min) }}
                                            </label>
                                            <label
                                                class="FormLabel inline-block"
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Max:') }}
                                                {{ $t(item.max) }}
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <input
                                            class="input input-bordered w-full bg-neutral"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                            id="valor"
                                            v-model="model[item.id]"
                                            type="number"
                                            style=""
                                        />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <div
                                            v-if="!appComponent.disabledButtonForm"
                                            class="deposit-c"
                                        >
                                            <button
                                                @click="MetodoPago(item)"
                                                :disabled="
                                                    model[item.id] < item.min ||
                                                    model[item.id] > item.max ||
                                                    model[item.id] == null ||
                                                    model[item.id] == 0
                                                "
                                                id="accion_depositarvalor"
                                                class="btn w-full text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                                :data-analytics-position="String(index + 1)"
                                                :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                            >
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                        <div
                                            v-else
                                            class="w-auto flex justify-center items-center"
                                        >
                                            <button
                                                disabled
                                                id="accion_depositarvalor"
                                                class="btn w-auto text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
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
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="pasarela flex items-center justify-center"
                                        v-if="!(config.partner == 6)"
                                    >
                                        <img
                                            style="padding: 5px; width: auto; height: auto; max-height: 54px"
                                            :src="item.pasarela"
                                            v-if="item.pasarela != ''"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="collapse-content">
                                <div>
                                    <label
                                        class="FormLabel inline-block pr-2"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Min:') }}
                                        {{ $t(item.min) }}
                                    </label>
                                    <label
                                        class="FormLabel inline-block"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Max:') }}
                                        {{ $t(item.max) }}
                                    </label>
                                </div>
                                <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                    <input
                                        class="input input-bordered w-full"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        id="valor"
                                        v-model="model[item.id]"
                                        type="number"
                                        style=""
                                    />
                                </div>
                                <div class="col col-md-2 w-1/2 inline-block">
                                    <button
                                        @click="MetodoPago(item)"
                                        :disabled="
                                            model[item.id] < item.min ||
                                            model[item.id] > item.max ||
                                            model[item.id] == null ||
                                            model[item.id] == 0
                                        "
                                        id="accion_depositarvalor"
                                        class="btn btn-success w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                        :data-analytics-position="String(index + 1)"
                                        :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
                <!-- Section for displaying payment methods -->
                <section
                    v-if="!noGateways"
                    class="flex"
                    :class="
                        config.depositos_ != undefined &&
                        config.depositos_.infoDepositsFirst != undefined &&
                        config.depositos_.infoDepositsFirst
                            ? 'flex-col-reverse'
                            : 'flex-col'
                    "
                >
                    <!-- Card for each payment method -->
                    <div
                        class="card-c hidden lg:flex"
                        v-for="(item, index) in metodos_pago"
                    >
                        <div
                            class="cardT w-full rounded-box mb-3 border-2 border-solid bg-base-400 border-base-100 shadow-lg shadow-black/20"
                            :class="[
                                {
                                    'collapse collapse-plus collapse-open':
                                        (config.layout == undefined || config.layout != 3) &&
                                        appComponent.mobile != '' &&
                                        appComponent.mobile != '0' &&
                                        route.path != '/landing/depositos' &&
                                        route.path != '/landing/depositos-ecuador',
                                },
                            ]"
                            v-if="
                                (!item.isInfo &&
                                    item.id != 'coupons' &&
                                    config.depositos != undefined &&
                                    config.depositos.styleVersion == undefined) ||
                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                config.depositos.styleVersion[appComponent.country] == 1
                            "
                        >
                            <input
                                type="checkbox"
                                class="hidden md:hidden"
                            />
                            <div class="collapse-title text-xl font-medium pr-10">
                                <div class="row metodos-pago grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
                                    <div
                                        class="flex justify-center items-center w-[104px] h-[53px]"
                                        style=""
                                    >
                                        <img
                                            style="
                                                padding: 5px 5px;
                                                width: auto;
                                                height: auto;
                                                max-height: 54px;
                                                border-radius: 5px;
                                            "
                                            :src="item.imagen"
                                            v-if="item.imagen != ''"
                                        />
                                        <div
                                            class="text-center"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                            v-if="item.imagentxt != ''"
                                        >
                                            {{ item.imagentxt }}
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-2"
                                    >
                                        <div class="flex justify-between items-start">
                                            <label
                                                class="FormLabel div-inline-block text-neutral"
                                                for="valor"
                                                >{{ $t(item.nombre) }}
                                            </label>
                                            <button
                                                v-if="item.info && item.info !== ''"
                                                @click="onModalInfo(item.info)"
                                                class="fill-neutral hover:scale-125"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M11 7v2h2V7zm3 10v-2h-1v-4h-3v2h1v2h-1v2zm8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="hidden md:block leading-[13px]">
                                            <label
                                                class="FormLabel inline-block pr-2 text-neutral"
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Min:') }}
                                                {{ $t(item.min) }}
                                            </label>
                                            <label
                                                class="FormLabel inline-block text-neutral"
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Max:') }}
                                                {{ $t(item.max) }}
                                            </label>
                                            <br /><label
                                                class="FormLabel inline-block text-neutral"
                                                v-if="
                                                    item.tiempo != undefined && item.tiempo != null && item.tiempo != ''
                                                "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Tiempo de procesamiento:') }}
                                                {{ $t(item.tiempo) }}
                                            </label>
                                            <br />
                                            <label
                                                class="FormLabel inline-block text-neutral"
                                                v-if="
                                                    item.Commission != undefined &&
                                                    item.Commission != null &&
                                                    item.Commission != ''
                                                "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                                <span>{{ $t('+ Servicios bancarios') }} </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <input
                                            class="input input-bordered border-input-border w-full bg-input-background text-neutral placeholder:text-input-placeholder"
                                            data-analytics-label="deposit:amount-input"
                                            :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelect && (methodSelect.id || methodSelect.pasarela || methodSelect.nombre)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                            id="valor"
                                            v-model="model[item.id]"
                                            type="number"
                                        />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <div
                                            v-if="!appComponent.disabledButtonForm"
                                            class="deposit-c"
                                        >
                                            <button
                                                @click="
                                                    () => {
                                                        MetodoPago(item);
                                                        metodos_pago.forEach((i) => (i.select = undefined));
                                                        item.select = item.id;
                                                    }
                                                "
                                                :disabled="
                                                    model[item.id] < item.min ||
                                                    model[item.id] > item.max ||
                                                    model[item.id] == null ||
                                                    model[item.id] == 0 ||
                                                    appComponent.disabledButtonForm
                                                "
                                                id="accion_depositarvalor"
                                                class="btn w-full text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                                :data-analytics-position="String(index + 1)"
                                                :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                            >
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                        <div
                                            v-else
                                            class="w-auto flex justify-center items-center"
                                        >
                                            <button
                                                disabled
                                                id="accion_depositarvalor"
                                                class="btn w-auto text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
                                            >
                                                <svg
                                                    v-if="
                                                        appComponent.disabledButtonForm == true &&
                                                        item.id == item.select
                                                    "
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
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="pasarela flex items-center justify-center"
                                        v-if="!(config.partner == 6)"
                                    >
                                        <img
                                            style="padding: 5px; width: auto; height: auto; max-height: 54px"
                                            :src="item.pasarela"
                                            v-if="item.pasarela != ''"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="collapse-content">
                                <div>
                                    <label
                                        class="FormLabel inline-block pr-2"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Min:') }}
                                        {{ $t(item.min) }}
                                    </label>
                                    <label
                                        class="FormLabel inline-block"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Max:') }}
                                        {{ $t(item.max) }}
                                    </label>
                                </div>
                                <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                    <input
                                        class="input input-bordered w-full"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        id="valor"
                                        v-model="model[item.id]"
                                        type="number"
                                        style=""
                                    />
                                </div>
                                <div class="col col-md-2 w-1/2 inline-block">
                                    <button
                                        @click="MetodoPago(item)"
                                        :disabled="
                                            model[item.id] < item.min ||
                                            model[item.id] > item.max ||
                                            model[item.id] == null ||
                                            model[item.id] == 0
                                        "
                                        id="accion_depositarvalor"
                                        class="btn btn-success w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                        :data-analytics-position="String(index + 1)"
                                        :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card for additional payment method information -->
                    <div
                        class="card-c hidden lg:flex"
                        v-for="(item, index) in metodos_pago_info"
                    >
                        <div
                            class="cardT w-full rounded-box mb-3 border-2 border-solid bg-base-400 border-base-100 shadow-lg shadow-black/20"
                            :class="[
                                {
                                    'collapse collapse-plus collapse-open':
                                        (config.layout == undefined || config.layout != 3) &&
                                        appComponent.mobile &&
                                        route.path != '/landing/depositos' &&
                                        route.path != '/landing/depositos-ecuador',
                                },
                            ]"
                            v-if="
                                (!item.isInfo &&
                                    item.id != 'coupons' &&
                                    config.depositos != undefined &&
                                    config.depositos.styleVersion == undefined) ||
                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                config.depositos.styleVersion[appComponent.country] == 1
                            "
                        >
                            <input
                                type="checkbox"
                                class="hidden md:hidden"
                            />
                            <div class="collapse-title text-xl font-medium pr-10">
                                <div class="row metodos-pago grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
                                    <div
                                        class="flex justify-center items-center w-[104px] h-[53px]"
                                        style=""
                                    >
                                        <img
                                            style="
                                                padding: 5px 5px;
                                                width: auto;
                                                height: auto;
                                                max-height: 54px;
                                                border-radius: 5px;
                                            "
                                            :src="item.mainimage"
                                            v-if="item.mainimage != ''"
                                        />
                                        <div
                                            class="text-center "
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                            v-if="item.imagentxt != ''"
                                        >
                                            {{ item.imagentxt }}
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-2"
                                    >
                                        <label
                                            class="FormLabel div-inline-block"
                                            :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                            for="valor"
                                            >{{ $t(item.label) }}
                                        </label>
                                        <div class="hidden md:block leading-[13px]">
                                            <label
                                                class="FormLabel inline-block pr-2 "
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Min:') }}
                                                {{ $t(item.amountmin) }}
                                            </label>
                                            <label
                                                class="FormLabel inline-block"
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Max:') }}
                                                {{ $t(item.amountmax) }}
                                            </label>
                                            <br /><label
                                                class="FormLabel inline-block"
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                v-if="
                                                    item.proccesstime != undefined &&
                                                    item.proccesstime != null &&
                                                    item.proccesstime != ''
                                                "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Tiempo de procesamiento:') }}
                                                {{ $t(item.proccesstime) }}
                                            </label>
                                            <br />
                                            <label
                                                class="FormLabel inline-block"
                                                :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                                v-if="
                                                    item.Commission != undefined &&
                                                    item.Commission != null &&
                                                    item.Commission != ''
                                                "
                                                style="font-size: 12px; color: gray"
                                                for="valor"
                                                >{{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                    <input
                                        class="input input-bordered border-input-border w-full bg-input-background text-neutral placeholder:text-input-placeholder"
                                        data-analytics-label="deposit:amount-input"
                                        :data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelect && (methodSelect.id || methodSelect.pasarela || methodSelect.nombre)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                        id="valor"
                                        v-model="item.defaultamount"
                                        type="number"
                                        style=""
                                    />
                                    </div>
                                    <div
                                        style=""
                                        class="col-span-1 hidden md:block"
                                    >
                                        <div
                                            v-if="!appComponent.disabledButtonForm"
                                            class="deposit-c"
                                        >
                                            <button
                                                @click="
                                                    () => {
                                                        infoPopUp(item);
                                                    }
                                                "
                                                :disabled="appComponent.disabledButtonForm"
                                                id="accion_depositarvalor"
                                                class="btn w-full text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
                                            >
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                        <div
                                            v-else
                                            class="w-auto flex justify-center items-center"
                                        >
                                            <button
                                                disabled
                                                id="accion_depositarvalor"
                                                class="btn w-auto text-neutral bg-success"
                                                data-use="preload"
                                                title="Next Step"
                                                data-analytics-label="deposit:open"
                                                data-analytics-context="step:select-method|step-num:1"
                                            >
                                                <svg
                                                    v-if="
                                                        appComponent.disabledButtonForm == true &&
                                                        item.id == item.select
                                                    "
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
                                                <span class="ButtonText ng-binding ng-scope">{{
                                                    $t('Depositar')
                                                }}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        style=""
                                        class="pasarela flex items-center justify-center"
                                        v-if="!(config.partner == 6)"
                                    >
                                        <img
                                            style="padding: 5px; width: auto; height: auto; max-height: 54px"
                                            :src="item.thumbnailimage"
                                            v-if="item.thumbnailimage != ''"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="collapse-content">
                                <div>
                                    <label
                                        class="FormLabel inline-block pr-2"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Min:') }}
                                        {{ $t(item.amountmin) }}
                                    </label>
                                    <label
                                        class="FormLabel inline-block"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Max:') }}
                                        {{ $t(item.amountmax) }}
                                    </label>
                                </div>
                                <div class="col col-md-2 pr-3 w-1/2 inline-block">
                                    <input
                                        class="input input-bordered w-full"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        id="valor"
                                        v-model="model[item.id]"
                                        type="number"
                                        style=""
                                    />
                                </div>
                                <div class="col col-md-2 w-1/2 inline-block">
                                    <button
                                        @click="infoPopUp(item)"
                                        :disabled="
                                            model[item.id] < item.min ||
                                            model[item.id] > item.max ||
                                            model[item.id] == null ||
                                            model[item.id] == 0
                                        "
                                        id="accion_depositarvalor"
                                        class="btn btn-success w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        data-analytics-label="deposit:open"
                                        data-analytics-context="step:select-method|step-num:1"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    class="flex"
                    :class="
                        config.depositos_ != undefined &&
                        config.depositos_.infoDepositsFirst != undefined &&
                        config.depositos_.infoDepositsFirst
                            ? 'flex-col-reverse'
                            : 'flex-col'
                    "
                >
                    <!-- Display payment methods -->
                    <article
                        v-for="(item, index) in metodos_pago"
                        :class="[
                            config.depositos != undefined &&
                            config.depositos.styleVersion != undefined &&
                            config.depositos.styleVersion[appComponent.country] != undefined &&
                            config.depositos.styleVersion[appComponent.country] != 1
                                ? ''
                                : 'card-c flex flex-col md:flex-row lg:hidden gap-1 w-full h-full sm:h-auto rounded-lg mb-3 shadow shadow-black/20 p-4 bg-base-400  border-base-100 border-2',
                        ]"
                        class="w-full"
                    >
                        <div
                            v-if="
                                (!item.isInfo &&
                                    item.id != 'coupons' &&
                                    config.depositos != undefined &&
                                    config.depositos.styleVersion == undefined) ||
                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                config.depositos.styleVersion[appComponent.country] == 1
                            "
                            class="w-full"
                        >
                            <div class="w-full md:w-auto flex justify-between items-start">
                                <div class="flex justify-center items-center">
                                    <img
                                        alt="pasarelaImagen"
                                        :src="item.imagen"
                                        v-if="item.imagen != ''"
                                        class="w-12 sm:w-16 md:w-20 aspect-square md:mr-4"
                                    />
                                    <div
                                        class="text-center"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        v-if="item.imagentxt != ''"
                                    >
                                        {{ item.imagentxt }}
                                    </div>
                                </div>
                                <div class="flex justify-between items-end w-[60%]">
                                    <button
                                        v-if="item.info && item.info !== ''"
                                        @click="onModalInfo(item.info)"
                                        class="fill-neutral hover:scale-125"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M11 7v2h2V7zm3 10v-2h-1v-4h-3v2h1v2h-1v2zm8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8"
                                            />
                                        </svg>
                                        <!-- Placeholder for SVG content -->
                                    </button>
                                    <div v-else></div>
                                    <span
                                        class="FormLabel div-inline-block text-sm md:text-base flex md:hidden text-end font-normal "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        >{{ $t(item.nombre) }}
                                    </span>
                                </div>
                            </div>
                            <div class="w-full flex justify-center items-center text-sm sm:text-lg text-gray-500">
                                <div class="w-full leading-3 sm:leading-5">
                                    <span
                                        class="FormLabel div-inline-block text-lg sm:text-xl md:text-2xl hidden md:flex"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                    >{{ $t(item.nombre) }}
                                    </span>
                                    <label
                                        class="inline-block mr-2 "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        for="valor"
                                        >{{ $t('Min:') }}
                                        {{ $t(item.min) }}
                                    </label>
                                    <label
                                        class="inline-block"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        for="valor"
                                        >{{ $t('Max:') }}
                                        {{ $t(item.max) }}
                                    </label>
                                    <label
                                        class="w-full sm:inline-block hidden text-lg "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        v-if="item.tiempo != undefined && item.tiempo != null && item.tiempo != ''"
                                        for="valor"
                                        >{{ $t('Tiempo de procesamiento:') }}
                                        {{ $t(item.tiempo) }}
                                    </label>
                                    <br />
                                    <label
                                        class="FormLabel inline-block "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        v-if="
                                            item.Commission != undefined &&
                                            item.Commission != null &&
                                            item.Commission != ''
                                        "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                        <span>{{ $t('+ Servicios bancarios') }} </span>
                                    </label>
                                </div>
                                <div class="flex gap-2">
                                    <input
                                        class="input bg-input-background input-xs sm:input-sm md:input-lg input-bordered border-input-border w-16 sm:w-24 "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-input-placeholder'
                                            "
                                        id="valor"
                                        v-model="model[item.id]"
                                        type="number"
                                        style=""
                                    />
                                    <div
                                            v-if="!appComponent.disabledButtonForm"
                                            class="deposit-c"
                                        >
                                    <button
                                        @click="MetodoPago(item)"
                                        :disabled="
                                            model[item.id] < item.min ||
                                            model[item.id] > item.max ||
                                            model[item.id] == null ||
                                            model[item.id] == 0 ||
                                            appComponent.disabledButtonForm
                                        "
                                        id="accion_depositarvalor"
                                        class="btn btn-xs sm:btn-sm md:btn-lg text-neutral bg-success"
                                        data-use="preload"
                                        title="Next Step"
                                        :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                        :data-analytics-position="String(index + 1)"
                                        :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article
                        v-for="(item, index) in metodos_pago_info"
                        :class="[
                            config.depositos != undefined &&
                            config.depositos.styleVersion != undefined &&
                            config.depositos.styleVersion[appComponent.country] != undefined &&
                            config.depositos.styleVersion[appComponent.country] != 1
                                ? ''
                                : 'card-c flex flex-col md:flex-row lg:hidden gap-1 w-full h-full sm:h-auto rounded-lg mb-3 shadow shadow-black/20 p-4 bg-base-400  border-base-100 border-2',
                        ]"
                        class=""
                    >
                        <div
                            v-if="
                                (!item.isInfo &&
                                    item.id != 'coupons' &&
                                    config.depositos != undefined &&
                                    config.depositos.styleVersion == undefined) ||
                                config.depositos.styleVersion[appComponent.country] == undefined ||
                                config.depositos.styleVersion[appComponent.country] == 1
                            "
                        >
                            <div class="w-full md:w-auto flex justify-between items-start">
                                <div class="flex justify-center items-center">
                                    <img
                                        alt="pasarelaImagen"
                                        :src="item.mainimage"
                                        v-if="item.mainimage != ''"
                                        class="w-12 sm:w-16 md:w-20 aspect-square md:mr-4"
                                    />
                                    <div
                                        class="text-center"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        v-if="item.imagentxt != ''"
                                    >
                                        {{ item.imagentxt }}
                                    </div>
                                </div>
                                <span
                                    class="FormLabel div-inline-block text-lg md:text-xl flex md:hidden text-end font-normal"
                                    :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                >{{ $t(item.label) }}
                                </span>
                            </div>
                            <div class="w-full flex justify-center items-center text-sm sm:text-lg text-gray-500">
                                <div class="w-full leading-3 sm:leading-5">
                                    <span
                                        class="FormLabel div-inline-block text-lg sm:text-xl md:text-2xl hidden md:flex"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                    >{{ $t(item.label) }}
                                    </span>
                                    <label
                                        class="inline-block mr-2 "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        for="valor"
                                        >{{ $t('Min:') }}
                                        {{ $t(item.amountmin) }}
                                    </label>
                                    <label
                                        class="inline-block "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        for="valor"
                                        >{{ $t('Max:') }}
                                        {{ $t(item.amountmax) }}
                                    </label>
                                    <label
                                        class="w-full sm:inline-block hidden text-lg "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        v-if="item.tiempo != undefined && item.tiempo != null && item.tiempo != ''"
                                        for="valor"
                                        >{{ $t('Tiempo de procesamiento:') }}
                                        {{ $t(item.proccesstime) }}
                                    </label>
                                    <br />
                                    <label
                                        class="FormLabel inline-block "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral'
                                            "
                                        v-if="
                                            item.Commission != undefined &&
                                            item.Commission != null &&
                                            item.Commission != ''
                                        "
                                        style="font-size: 12px; color: gray"
                                        for="valor"
                                        >{{ $t('Comisión:') }} {{ $t(item.Commission) }}%
                                    </label>
                                </div>
                                <div class="flex gap-2">
                                    <input
                                        class="input bg-input-background input-xs sm:input-sm md:input-lg input-bordered border-input-border w-16 sm:w-24 "
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-placeholder'
                                            "
                                        id="valor"
                                        v-model="item.defaultamount"
                                        type="number"
                                        style=""
                                    />
                                    <button
                                        @click="
                                            () => {
                                                infoPopUp(item);
                                            }
                                        "
                                        :disabled="appComponent.disabledButtonForm"
                                        id="accion_depositarvalor"
                                        class="btn btn-xs sm:btn-sm md:btn-lg text-neutral bg-success"
                                        data-use="preload"
                                        title="Next Step"
                                        data-analytics-label="deposit:open"
                                        data-analytics-context="step:select-method|step-num:1"
                                    >
                                        <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
                <div v-for="(item, index) in metodos_pago">
                    <div
                        class="w-full rounded-box border border-base-300 bg-base-200 mb-3"
                        v-bind:class="{
                            'collapse collapse-plus collapse-open': appComponent.mobile,
                        }"
                        v-if="item.isInfo || item.id == 'coupons'"
                    >
                        <input
                            type="checkbox"
                            class="hidden md:hidden"
                        />
                        <div class="collapse-title text-xl font-medium pr-10 p-1">
                            <div class="row metodos-pago grid grid-cols-5 gap-5">
                                <div
                                    style="display: inline-block; vertical-align: top"
                                    class="col col-md-2 pr-5"
                                >
                                    <img
                                        style="padding: 5px 5px; width: auto; height: auto; max-height: 100px"
                                        :src="item.imagen"
                                        v-if="item.imagen != ''"
                                    />
                                    <div
                                        class="text-center"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        v-if="item.imagentxt != ''"
                                    >
                                        {{ item.imagentxt }}
                                    </div>
                                </div>
                                <div
                                    style="display: inline-block"
                                    class="col col-span-2"
                                >
                                    <label
                                        class="FormLabel div-inline-block"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        for="valor"
                                        >{{ $t(item.nombre) }}</label
                                    >
                                </div>
                                <div class="lg:block">
                                    <input
                                        class="input input-bordered w-full"
                                        :class="
                                                config.layout != undefined && config.layout == 3
                                                    ? 'text-neutral'
                                                    : 'text-neutral-content'
                                            "
                                        v-if="item.id == 'coupons'"
                                        id="valor"
                                        v-model="model[item.id]"
                                        type="text"
                                    />
                                </div>
                                <div
                                    style="display: inline-block; vertical-align: top"
                                    class="col col-md-2"
                                >
                                    <button
                                        v-if="item.id != 'coupons'"
                                        @click="MetodoPago(item)"
                                        :disabled="
                                            model[item.id] < item.min ||
                                            model[item.id] > item.max ||
                                            model[item.id] == null ||
                                            model[item.id] == 0
                                        "
                                        id="accion_depositarvalor"
                                        class="btn btn-primary w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                        :data-analytics-position="String(index + 1)"
                                        :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    >
                                        <span
                                            class="ButtonText"
                                            v-if="!item.isInfoText"
                                            >{{ $t('Depositar') }}</span
                                        >
                                        <span
                                            class="ButtonText"
                                            v-if="item.isInfoText"
                                            >{{ $t(item.isInfoText) }}</span
                                        >
                                    </button>
                                    <button
                                        v-if="item.id == 'coupons'"
                                        @click="obtenerCupon(item)"
                                        :disabled="model[item.id] == null || model[item.id] == 0"
                                        id="accion_depositarvalorr"
                                        class="btn btn-primary w-full text-neutral"
                                        data-use="preload"
                                        title="Next Step"
                                        data-analytics-label="deposit:open"
                                        data-analytics-context="step:step-num:1"
                                    >
                                        <span class="ButtonText">{{ $t('Obtener') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <li
                    style="margin-bottom: 10px; margin-top: 10px; border-top: 1px solid #9e99ac; padding-top: 5px"
                    class="FormItem fldAmount"
                    id="fldAmount"
                    v-if="metodos_pago.length == 0 && metodos_pago_info.length == 0 && flag_m"
                >
                    <div class="row">
                        <div
                            style="width: 100%; display: inline-block; vertical-align: top"
                            class="col col-md-12"
                        >
                            <label
                                class="FormLabel div-inline-block"
                                style="width: 100%; font-size: 12px; color: gray"
                                for="valor"
                            >
                                {{ $t('Por el momento no estan disponibles los metodos de deposito.') }}
                            </label>
                        </div>
                    </div>
                </li>
                <li
                    v-if="
                        config.depositos != undefined &&
                        config.depositos.cryptoPayments != undefined &&
                        config.depositos.cryptoPayments
                    "
                    style="margin-bottom: 10px; margin-top: 10px; border-top: 1px solid #9e99ac; padding-top: 10px"
                    class="FormItem crypto-container"
                >

                    <div
                        v-for="(item, index) in metodos_pago_crypto"
                        class="button-ret dep cryp"
                    >
                        <a target="_blank">
                            <div class="img">
                                <img
                                    v-if="item.imagen != ''"
                                    style="
                                        background: hsl(var(--b1));
                                        padding: 3px 3px;
                                        width: auto;
                                        height: 78px;
                                        max-height: 100px;
                                        vertical-align: inherit;
                                    "
                                    :src="item.imagen"
                                />
                                <div
                                    class="text-center"
                                    v-if="item.imagentxt != ''"
                                >
                                    {{ item.imagentxt }}
                                </div>
                            </div>
                            <span class="name">{{ $t(item.nombre) }}</span>
                            <div class="col col-md-12 cant_dep">
                                <input
                                    id="valor"
                                    v-model="model[item.id]"
                                    type="number"
                                />
                                <button
                                    v-if="item.id != 'coupons'"
                                    @click="MetodoPago(item)"
                                    :disabled="
                                        model[item.id] < item.min ||
                                        model[item.id] > item.max ||
                                        model[item.id] == null ||
                                        model[item.id] == 0
                                    "
                                    id="accion_depositarvalor"
                                    class="Button RegLink DepLink NextStepLink"
                                    data-use="preload"
                                    title="Next Step"
                                    :data-analytics-label="`deposit:method:${String( item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                    :data-analytics-position="String(index + 1)"
                                    :data-analytics-context="`step:select-method|step-num:1|method:${String(item.nombre_pasarela || item.pasarelatxt || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
                                >
                                    <span class="ButtonText ng-binding ng-scope">{{ $t('Depositar') }}</span>
                                </button>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
/* Container for payment options, using grid layout */
.container-pay {
    justify-content: space-between; /* Space between items */
    grid-template-columns: repeat(4, minmax(70px, 100px)); /* 4 columns with min/max width */
    grid-template-rows: repeat(auto-fill, minmax(90px, 1fr)); /* Auto-fill rows with min/max height */
    row-gap: 20px !important; /* Gap between rows */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 460px) {
    .container-pay {
        grid-template-columns: repeat(3, minmax(20px, 70px)); /* 3 columns on small screens */
        grid-template-rows: repeat(auto-fill, minmax(70px, 1fr)); /* Adjust row height */
        row-gap: 10px !important; /* Reduced gap */
    }
}

/* Container for options, defining row layout */
.container-options {
    grid-template-rows: repeat(auto-fill, minmax(70px, 90px)); /* Auto-fill rows */
}

/* QR text styling */
.text-qr {
    font-weight: 300; /* Light font weight */
}

/* Button styling for return actions */
.button-ret {
    margin-right: 5px; /* Right margin */
}

/* Button styles for specific return actions */
.button-ret.dep.cryp a {
    background: hsl(var(--b1)); /* White background */
    display: block; /* Block display */
    height: 100%; /* Full height */
    width: 100%; /* Full width */
    overflow: hidden; /* Hide overflow */
}

/* General button styles */
.button-ret a {
    background: #f9d000; /* Yellow background */
    padding: 4px 8px; /* Padding */
    border-radius: 5px; /* Rounded corners */
    color: hsl(var(--n)); /* Text color */
    font-weight: bold; /* Bold text */
}

/* Additional margin for return buttons */
.button-ret {
    margin-top: 8px; /* Top margin */
}

/* Display settings for specific return buttons */
.button-ret.dep {
    display: inline-block; /* Inline block display */
}

/* Specific styles for cryptocurrency return buttons */
.button-ret.dep.cryp {
    display: inline-block; /* Inline block display */
    width: 210px; /* Fixed width */
    height: 91px; /* Fixed height */
    text-align: center; /* Center text */
}

/* Image styling within cryptocurrency return buttons */
.button-ret.dep.cryp .img {
    width: 78px; /* Fixed width */
    display: inline-block; /* Inline block display */
    vertical-align: top; /* Align to top */
    overflow: hidden; /* Hide overflow */
    margin-right: 10px; /* Right margin */
}

/* Name styling within cryptocurrency return buttons */
.button-ret.dep.cryp span.name {
    font-size: 13px; /* Font size */
    display: inline-block; /* Inline block display */
    width: calc(100% - 88px); /* Dynamic width */
    padding: 5px 10px; /* Padding */
    text-align: left; /* Left align text */
    height: 100%; /* Full height */
    border-left: 1px solid #9d9d9d; /* Left border */
    text-transform: uppercase; /* Uppercase text */
    font-size: 12px; /* Font size */
}

/* Container for additional information */
.cant_dep {
    font-size: 13px; /* Font size */
    display: none; /* Hidden by default */
    width: calc(100% - 88px); /* Dynamic width */
    padding: 5px 10px; /* Padding */
    text-align: left; /* Left align text */
    height: 100%; /* Full height */
    border-left: 1px solid #9d9d9d; /* Left border */
}

/* Show additional information on hover */
.button-ret.dep.cryp a:hover .cant_dep {
    display: inline-block; /* Show on hover */
}

/* Hide name on hover */
.button-ret.dep.cryp a:hover span.name {
    display: none; /* Hide name */
}

/* Input field styling within cryptocurrency return buttons */
.button-ret.dep.cryp input {
    border-radius: 15px 15px 0 0; /* Rounded top corners */
    height: 35px; /* Fixed height */
    width: 100%; /* Full width */
    font-weight: bold; /* Bold text */
    padding-left: 7px; /* Left padding */
    color: hsl(var(--n)); /* Text color */
    background: hsl(var(--ib)); /* Light gray background */
    border-color: hsl(var(--ic)); /* Border color */
}

/* Padding for cryptocurrency return button links */
.button-ret.dep.cryp a {
    padding: 6px 8px; /* Padding */
}

/* Hover effect for cryptocurrency return button links */
.button-ret.dep.cryp a:hover {
    background: hsl(var(--b1)); /* Light gray background on hover */
}

/* Focus outline removal for buttons */
.button-ret.dep.cryp button:focus {
    outline: none; /* Remove outline */
}

/* Button styling for cryptocurrency return actions */
.button-ret.dep.cryp button {
    height: 36px; /* Fixed height */
    width: 100%; /* Full width */
    border-radius: 0 0 15px 15px; /* Rounded bottom corners */
    border: none; /* No border */
    background: hsl(var(--p)) !important; /* Gradient background */
    font-weight: bold; /* Bold text */
    color: hsl(var(--n)); /* Text color */
}

/* Responsive adjustments for medium screens */
@media (max-width: 810px) {
    .button-ret.dep.cryp {
        width: 100%; /* Full width on small screens */
    }
}

/* Title styling for cryptocurrency section */
.tlt-crypto {
    text-align: center; /* Center text */
    border-bottom: 1px solid black; /* Bottom border */
    margin-bottom: 20px; /* Bottom margin */
}

/* Image styling within cryptocurrency title */
.tlt-crypto img {
    background: white; /* White background */
    padding: 5px 5px; /* Padding */
    position: relative; /* Relative positioning */
    margin-bottom: -31px; /* Negative bottom margin */
    width: 170px; /* Fixed width */
}

/* Selected item styling */
.selected-item {
    margin: 20px 0; /* Vertical margin */
    text-align: center; /* Center text */
}

/* Paragraph styling within selected items */
.selected-item p {
    font-size: 18px; /* Font size */
}

/* Bold span styling within selected items */
.selected-item p span {
    font-weight: bold; /* Bold text */
}

/* Dropdown container styling */
.dropdown {
    margin: 0; /* No margin */
    width: 100%; /* Full width */
    position: relative; /* Relative positioning */
}

/* Active dropdown label arrow */
.dropdown.active .selLabel:after {
    content: '\25B2'; /* Up arrow */
}

/* Active dropdown list item positioning */
.dropdown.active .dropdown-list li {
    position: relative; /* Relative positioning */
}

/* Dropdown trigger styling */
.dropdown > span {
    width: 100%; /* Full width */
    height: 60px; /* Fixed height */
    line-height: 60px; /* Center text vertically */
    color: #fff; /* Text color */
    font-size: 13px; /* Font size */
    background: #f1ab00; /* Background color */
    display: block; /* Block display */
    padding: 0 50px 0 20px; /* Padding */
    position: relative; /* Relative positioning */
    z-index: 9999; /* High z-index */
    cursor: pointer; /* Pointer cursor */
}

/* Dropdown arrow styling */
.dropdown > span:after {
    content: '\25BC'; /* Down arrow */
    position: absolute; /* Absolute positioning */
    right: 0px; /* Right alignment */
    top: 15%; /* Vertical alignment */
    width: 50px; /* Fixed width */
    text-align: center; /* Center text */
    font-size: 12px; /* Font size */
    padding: 10px; /* Padding */
    height: 70%; /* Fixed height */
    line-height: 24px; /* Center text vertically */
    border-left: 1px solid white; /* Left border */
}

/* Active dropdown arrow change */
.dropdown > span:active:after {
    content: '\25B2'; /* Up arrow on active */
}

/* Dropdown list styling */
.dropdown-list {
    position: absolute; /* Absolute positioning */
    top: 0px; /* Top alignment */
    width: 100%; /* Full width */
    max-height: 80vh; /* Max height */
    overflow: auto; /* Scroll if overflow */
}

/* Dropdown list item styling */
.dropdown-list li {
    display: block; /* Block display */
    list-style: none; /* No list style */
    left: 0; /* Left alignment */
    opacity: 1; /* Full opacity */
    -webkit-transition: -webkit-transform 300ms ease; /* Transition for transform */
    transition: -webkit-transform 300ms ease; /* Transition for transform */
    transition: transform 300ms ease; /* Transition for transform */
    transition:
        transform 300ms ease,
        -webkit-transform 300ms ease; /* Combined transition */
    position: absolute; /* Absolute positioning */
    top: 0; /* Top alignment */
    width: 100%; /* Full width */
    background-color: white; /* White background */
}

/* Dropdown list item span styling */
.dropdown-list li span {
    -webkit-backface-visibility: hidden; /* Hide backface */
    -webkit-touch-callout: none; /* Disable touch callout */
    -webkit-user-select: none; /* Disable user select */
    user-select: none; /* Disable user select */
    width: 100%; /* Full width */
    font-size: 13px; /* Font size */
    line-height: 60px; /* Center text vertically */
    padding: 0px 20px; /* Padding */
    display: block; /* Block display */
    color: black; /* Text color */
    cursor: pointer; /* Pointer cursor */
}

/* Image styling within dropdown list */
ul.dropdown-list img {
    width: 28px; /* Fixed width */
    height: auto; /* Auto height */
    margin-right: 10px; /* Right margin */
    display: inline-block; /* Inline block display */
}

/* Container for selected dropdown */
.c-select {
    position: relative; /* Relative positioning */
    z-index: 9; /* High z-index */
}

/* QR text styling */
.text-qr {
    font-weight: 300; /* Light font weight */
}

/* Card title styling */
.card-c .cardT {
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 6px; /* Shadow effect */
}

/* Deposit and add card container styling */
.deposit-c,
.add-card-c {
    padding: 2px; /* Padding */
    border-radius: 9px; /* Rounded corners */
    margin-left: 10px; /* Left margin */
}

/* Input field styling within card */
.cardT input {
    font-weight: bold; /* Bold text */
}

/* Currency field styling */
li#fldCurrency {
    font-weight: bold; /* Bold text */
    margin-bottom: 15px; /* Bottom margin */
}

/* Button styling with icon for adding card */
button.add-card.btn.w-30.text-neutral::before {
    content: ''; /* Empty content for icon */
    background: url('/assets/images/add_card.svg'); /* Background image */
    width: 45px; /* Fixed width */
    height: 45px; /* Fixed height */
    position: absolute; /* Absolute positioning */
    background-size: cover; /* Cover background */
    background-repeat: no-repeat; /* No repeat */
    margin-right: -84px; /* Negative right margin */
    margin-top: 35px; /* Top margin */
}

/* Payment gateway image styling */
ul.pasarela li img {
    max-height: 100%; /* Max height */
    width: auto; /* Auto width */
    max-width: 230px; /* Max width */
    margin: auto; /* Center alignment */
}

/* Payment gateway item styling */
ul.pasarela li {
    background: #e3e3e3; /* Background color */
    margin: 8px 0; /* Vertical margin */
    height: 80px; /* Fixed height */
    text-align: center; /* Center text */
    padding: 15px; /* Padding */
}

/* Modal styling for payment methods */
.modal-metodos {
    background: #ffffffe0; /* Semi-transparent background */
    width: 100%; /* Full width */
    position: absolute; /* Absolute positioning */
    left: 0; /* Left alignment */
    top: 0; /* Top alignment */
    height: 100%; /* Full height */
    z-index: 9; /* High z-index */
    padding: 20px; /* Padding */
    backdrop-filter: blur(10px); /* Blur effect */
}

/* Back button styling */
button.go_back {
    width: 100%; /* Full width */
    color: white; /* Text color */
    background: #0a2d61; /* Background color */
    margin-bottom: 10px; /* Bottom margin */
    padding: 10px 20px; /* Padding */
    font-weight: bold; /* Bold text */
    text-align: left; /* Left align text */
    border-radius: 30px; /* Rounded corners */
}

/* Minimum height for info page */
.Framework.InfoPage {
    min-height: 100vh; /* Full viewport height */
}

/* QR text styling */
.text-qr {
    font-weight: 300; /* Light font weight */
}

/* Slash styling for visual separation */
span.slash {
    position: absolute; /* Absolute positioning */
    font-size: 17px; /* Font size */
    margin: 10px 0 0 3px; /* Margin */
    color: black; /* Text color */
}

/* Input styling for numeric input */
.my-input {
    font-size: 20px; /* Font size */
    margin: auto; /* Center alignment */
    display: inline-block; /* Inline block display */
    max-width: 33px; /* Max width */
    border-radius: 0 !important; /* No rounding */
    text-align: center; /* Center text */
    margin: 2px; /* Margin */
}

/* Numeric card input styling */
.my-input-num-card {
    letter-spacing: 2px; /* Spacing between letters */
    text-align: center; /* Center text */
}

/* Center alignment for digits */
.digits {
    text-align: center; /* Center text */
}

/* Center alignment for labels */
.my-label {
    text-align: center; /* Center text */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 800px) {
    .left_side {
        display: none; /* Hide left side */
    }

    .right_side {
        width: 100%; /* Full width */
        border-top-left-radius: 9px; /* Rounded top left */
        border-bottom-left-radius: 9px; /* Rounded bottom left */
    }
}

/* Warning styling */
.warning {
    border: 1px solid red !important; /* Red border */
}

/* Card styling */
.cardT {
    background: #d4d4d4; /* Background color */
    border-radius: 15px; /* Rounded corners */
    border: none; /* No border */
}

/* Background image styling */
.image-background {
    background: black; /* Black background */
}

/* Dot styling for indicators */
.dots span {
    height: 5px; /* Fixed height */
    width: 5px; /* Fixed width */
    margin-right: 3px; /* Right margin */
    margin-bottom: 2px !important; /* Bottom margin */
    background-color: rgb(255, 255, 255); /* White background */
    border-radius: 50%; /* Circular dots */
    display: inline-block; /* Inline block display */
}

/* Number styling */
.number {
    font-size: 14px; /* Font size */
}

/* Card add title styling */
.cardAdd h5 {
    font-weight: bold; /* Bold text */
    font-size: 22px !important; /* Font size */
    color: #979797; /* Text color */
}

/* Card add span styling */
.cardAdd span {
    font-weight: bold; /* Bold text */
    font-size: 18px !important; /* Font size */
    color: #979797; /* Text color */
}

/* Button styles for deposit actions */
button#accion_depositarvalor,
.add-card {
    border: none; /* No border */
}

/* Botón desactivado */
button#accion_depositarvalor:disabled {
    background: linear-gradient(0deg, #999, #666); /* Gradiente gris */
    cursor: not-allowed;
    opacity: 0.6;
    color: #fff;
}

/* Deposit and add card container styling */
.deposit-c,
.add-card-c {
    padding: 2px; /* Padding */
    border-radius: 9px; /* Rounded corners */
    margin-left: 10px; /* Left margin */
}

/* Currency field styling */
li#fldCurrency {
    font-weight: bold; /* Bold text */
    margin-bottom: 15px; /* Bottom margin */
}

/* Card styling */
.card-c .card_ {
    background: linear-gradient(0deg, rgb(216 216 216) 0%, rgb(234 234 234) 100%); /* Gradient background */
    border: 3px solid white; /* White border */
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 6px; /* Shadow effect */
}

/* Button styling with icon for adding card */
button.add-card.btn.w-30.text-neutral::before {
    content: ''; /* Empty content for icon */
    background: url(/assets/images/add_card.svg); /* Background image */
    width: 45px; /* Fixed width */
    height: 45px; /* Fixed height */
    position: absolute; /* Absolute positioning */
    background-size: cover; /* Cover background */
    background-repeat: no-repeat; /* No repeat */
    margin-right: -84px; /* Negative right margin */
    margin-top: 35px; /* Top margin */
}

/* Card image styling */
.card-img {
    background: url(https://images.virtualsoft.tech/m/msjT1650494523.png); /* Background image */
    background-repeat: no-repeat; /* No repeat */
    background-size: contain; /* Contain background */
    height: 205px; /* Fixed height */
}

/* Input styling for numeric input */
.my-input-num-card,
input.input_expiry,
input.input_cvv {
    text-align: center; /* Center text */
    border: 2px solid black; /* Black border */
    border-radius: 55px; /* Rounded corners */
}

/* Title styling for sections */
.tittle-c {
    border-bottom: 2px solid black; /* Bottom border */
    margin-bottom: 12px; /* Bottom margin */
}
</style>

<!-- FILE DOCUMENTED -->

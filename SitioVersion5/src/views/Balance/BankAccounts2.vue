<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import AppTable from '@/components/Table.vue';
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';

/**
 * Component definition for managing bank accounts and credit cards.
 */
export default defineComponent({
    props: {
        /** Text information for the bank. */
        infoTextBank: String,
    },
    components: {
        AnimatedPlaceholder,
        IconChevronRight,
        IconChevronLeft,
        AppTable,
    },
    data() {
        /** Configuration object for the component. */
        let config = this.$config();
        /** Event emitter for communication. */
        let emitter = this.$emitter();
        /** Reference to the app component. */
        let appComponent: any = this.$appComponent;
        /** Filter state for bank accounts. */
        let filter: any = '1';
        /** Loading state for the form. */
        let loadingForm: boolean = false;
        /** State indicating if an account is being added. */
        let onAddAccount: boolean = false;
        /** Input state for bank selection. */
        let bankInput: any = {
            value: 'Selecciona',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Input state for account type selection. */
        let accountTypeInput: any = {
            value: 'Selecciona',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Input state for account number. */
        let accountNumberInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Input state for confirming account number. */
        let accountNumberConfirmInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Input state for interbank code. */
        let interbankCodeInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Input state for confirming interbank code. */
        let interbankCodeConfirmInput: any = {
            value: '',
            color: 'accent-content',
            validation: false,
            message: '',
        };
        /** Fields configuration based on the app component's country. */
        let fields: any =
            this.$config() != undefined &&
            this.$config().cuentasBancaria != undefined &&
            this.$config().cuentasBancaria.form != undefined &&
            this.$config().cuentasBancaria.form[this.$appComponent['country']] != undefined
                ? this.$config().cuentasBancaria.form[this.$appComponent['country']]
                : [];
        /** Object to hold select options. */
        let arraySelects: any = {};
        /** Array to hold table column definitions. */
        let tableColumns: any = [];
        /** Array to hold bank accounts. */
        let bankAccounts: any = [];
        /** Array to hold credit card information. */
        let getCreditCard: any = [];
        /** Loading state for the table. */
        let loadingTable: boolean = false;
        /** Selected item for actions. */
        let itemSelect: any = {};
        /** Total count of bank accounts. */
        let totalCount: any = 0;
        /** Original state of select options. */
        let arraySelectsOrigin: any = {};
        /** Model for form data. */
        let model: any = {};
        /** Initial state of the model. */
        let modelInitial: any = {};
        /** Font color for the form. */
        let fontColorForm: string = '';
        /** List of bank accounts. */
        let banksAccountsList: any = [];
        /** Loading state for credit cards. */
        let loadingCreditCards: boolean = true;

        // Configuration checks and assignments for fields and font color
        if (
            config != undefined &&
            config['forms'] != undefined &&
            config['forms']['Cuentas bancarias'] != undefined &&
            config['forms']['Cuentas bancarias']['inputs'] != undefined
        ) {
            fields = JSON.parse(JSON.stringify(config['forms']['Cuentas bancarias']['inputs']));
        } else {
            if (
                config != undefined &&
                config['cuentasBancaria'] != undefined &&
                config['cuentasBancaria']['form'] != undefined &&
                config['cuentasBancaria']['form'][this.$appComponent['country']] != undefined
            ) {
                fields = JSON.parse(JSON.stringify(config['cuentasBancaria']['form'][this.$appComponent['country']]));
            }
        }
        if (
            config != undefined &&
            config['forms'] != undefined &&
            config['forms']['Cuentas bancarias'] != undefined &&
            config['forms']['Cuentas bancarias']['fontColorForm'] != undefined
        ) {
            fontColorForm = config['forms']['Cuentas bancarias']['fontColorForm'];
        } else {
            if (
                config != undefined &&
                config['cuentasBancaria'] != undefined &&
                config['cuentasBancaria']['fontColorForm'] != undefined
            ) {
                fontColorForm = config['cuentasBancaria']['fontColorForm'];
            }
        }
        return {
            config,
            emitter,
            appComponent,
            filter,
            loadingForm,
            onAddAccount,
            bankInput,
            accountTypeInput,
            accountNumberInput,
            accountNumberConfirmInput,
            interbankCodeInput,
            interbankCodeConfirmInput,
            arraySelects,
            tableColumns,
            bankAccounts,
            loadingTable,
            itemSelect,
            totalCount,
            arraySelectsOrigin,
            model,
            modelInitial,
            fields,
            fontColorForm,
            banksAccountsList,
            loadingCreditCards,
            getCreditCard,
        };
    },
    unmounted() {
        /** Cleanup event listeners when the component is unmounted. */
        this.emitter.all.delete('accept:modal');
    },
    mounted() {
        /** Set up event listeners and initialize data when the component is mounted. */
        this.emitter.on('accept:modal', () => {
            this.acceptModal();
        });
        if (
            this.config != undefined &&
            this.config.cuentasBancaria != undefined &&
            this.config.cuentasBancaria.tableColumns != undefined &&
            this.config.cuentasBancaria.tableColumns[this.appComponent.country] != undefined
        ) {
            this.tableColumns = this.config.cuentasBancaria.tableColumns[this.appComponent.country];
        }
        if (
            this.config != undefined &&
            this.config.cuentasBancaria != undefined &&
            this.config.cuentasBancaria[this.appComponent.country] != undefined &&
            this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1 != undefined
        ) {
            this.textDownForm = this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1;
        }
        this.widthForm =
            this.config != undefined &&
            this.config.cuentasBancaria != undefined &&
            this.config.cuentasBancaria[this.appComponent.country] != undefined &&
            this.config.cuentasBancaria[this.appComponent.country].widthF != undefined
                ? this.config.cuentasBancaria[this.appComponent.country].widthF
                : false;
        apiService.request('get_banks', {}).then((response: any) => {
            if (response.code == 0) {
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].value = response.data[i].Id;
                    response.data[i].name = response.data[i].Name;
                }
                Object.assign(this.arraySelects, { bankList: response.data });
                this.loadingForm = true;
                this.getBankAccounts(this.filter);
            }
        });
        this.fields.forEach((field) => {
            if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                field.options.forEach((opt) => {
                    opt.Id = opt.value;
                    opt.Name = opt.name;
                });
                let options: object = {};
                options[field.optionsKey] = field.options;
                Object.assign(this.arraySelects, options);
            }
        });
        this.model.name = this.appComponent.session.nombre;
        this.model.docnumber = this.appComponent.session.cedula;
        this.model.client_type = '0';
        this.modelInitial = JSON.parse(JSON.stringify(this.model));
        this.arraySelectsOrigin = JSON.parse(JSON.stringify(this.arraySelects));
    },
    methods: {
        /**
         * Accepts the modal action based on the selected item.
         */
        acceptModal() {
            const vthis = this;
            if (this.appComponent.modal.orderModal == 'delete_account') {
                let params = [
                    {
                        userbank_id: this.itemSelect.userbank_id,
                    },
                ];
                apiService.request('delete_user_bank', params).then((response: any) => {
                    if (response.code == 0) {
                        if (this.itemSelect.account_type === 'CARD') {
                            this.appComponent.modal = {
                                showModal: 'notification',
                                titleModal: this.$t('Mensaje'),
                                messageModal: this.$t('Tarjeta de credito eliminada satisfactoriamente.'),
                                buttonModal: this.$t('Aceptar'),
                                orderModal: 'closeModal',
                            };
                        } else {
                            this.appComponent.modal = {
                                showModal: 'notification',
                                titleModal: this.$t('Mensaje'),
                                messageModal: this.$t('Cuenta bancaria eliminada satisfactoriamente.'),
                                buttonModal: this.$t('Aceptar'),
                                orderModal: 'closeModal',
                            };
                        }
                        this.getBankAccounts(this.filter);
                        this.$nextTick(() => {
                            const updatedCardCount = this.getCreditCard.length;
                            localStorage.setItem('primerarecarga', updatedCardCount);
                        });
                        vthis.refreshBalance();
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
            }
            this.appComponent.closeModal();
        },
        /**
         * Fetches the list of banks from the API.
         */
        async getBanks() {
            await apiService.request('get_banks', {}).then((response: any) => {
                if (response.code == 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].value = response.data[i].Id;
                        response.data[i].name = response.data[i].Name;
                    }
                    this.loadingForm = true;
                    Object.assign(this.arraySelects, {
                        bankList: response.data,
                    });
                }
            });
        },
        /**
         * Retrieves bank accounts based on the provided state.
         * @param state - The state to filter bank accounts.
         */
        getBankAccounts(state) {
            this.loadingCreditCards = true;
            const paramsWithdrawals = {
                State: state,
                count: 10,
                start: this.page * 10,
            };
            this.loadingTable = true;
            apiService.request('get_bank_accounts', paramsWithdrawals).then((response: any) => {
                if (response.code == 0) {
                    this.getCreditCard = [];
                    this.bankAccounts = [];
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].state == 'A') {
                            response.data[i].state = this.$t('Activa');
                        } else {
                            if (response.data[i].state == 'I') {
                                response.data[i].state = this.$t('Inactiva');
                            } else {
                                if (response.data[i].state == 'C') {
                                    response.data[i].state = this.$t('Cancelada');
                                } else {
                                    if (response.data[i].state == 'P') {
                                        response.data[i].state = this.$t('Pendiente');
                                    }
                                }
                            }
                        }
                        if (response.data[i].account_type === 'CARD') {
                            this.getCreditCard.push(response.data[i]);
                        } else {
                            this.bankAccounts.push(response.data[i]);
                        }
                    }
                    this.$nextTick(() => {
                        const currentCardCount = this.getCreditCard.length;
                        const storedCardCount = localStorage.getItem('primerarecarga');
                        localStorage.setItem('primerarecarga', currentCardCount);
                        if (storedCardCount !== null) {
                            const previousCardCount = parseInt(storedCardCount);
                            if (currentCardCount > previousCardCount) {
                                this.appComponent.modal = {
                                    showModal: 'notification',
                                    titleModal: this.$t('Nueva tarjeta registrada'),
                                    messageModal: this.$t('Se ha agregado una nueva tarjeta de crédito.'),
                                    buttonModal: this.$t('Aceptar'),
                                    orderModal: 'closeModal',
                                };
                                localStorage.setItem('primerarecarga', currentCardCount);
                            }
                        }
                    });
                    this.totalCount = parseInt(response.total_count);
                    this.pages = parseInt(this.totalCount) / 10;
                    this.pages = parseInt(this.pages) + 1;
                    this.loadingTable = false;
                    this.loadingCreditCards = false;
                }
            });
        },
        /**
         * Updates the component state and fetches bank accounts based on the current filter.
         */
        update() {
            this.pages = 0;
            this.page = 0;
            if (
                this.config != undefined &&
                this.config.cuentasBancaria != undefined &&
                this.config.cuentasBancaria.tableColumns != undefined &&
                this.config.cuentasBancaria.tableColumns[this.appComponent.country] != undefined
            ) {
                this.tableColumns = this.config.cuentasBancaria.tableColumns[this.appComponent.country];
            }
            if (this.filter !== '1') {
                this.tableColumns = this.tableColumns.filter(function (obj) {
                    return obj.name !== 'delete';
                });
            }
            this.getBankAccounts(this.filter);
        },
        /**
         * Initiates the cancellation process for a bank account.
         * @param item - The bank account item to be canceled.
         */
        accountCancel(item: any) {
            this.appComponent.modal = {
                showModal: 'notification',
                titleModal: this.$t('Anular cuenta bancaria'),
                messageModal: this.$t('¿Esta seguro que desea eliminar la cuenta bancaria #') + item.account + '?',
                buttonModal: this.$t('Aceptar'),
                orderModal: 'delete_account',
            };
            this.itemSelect = item;
        },
        /**
         * Initiates the cancellation process for a credit card.
         * @param item - The credit card item to be canceled.
         */
        creditCardCancel(item: any) {
            this.appComponent.modal = {
                showModal: 'notification',
                titleModal: this.$t('¿Estás seguro de que deseas eliminar esta tarjeta ?'),
                messageModal: this.$t(
                    'Esta acción es irreversible y no podrás usar esta tarjeta para futuras transacciones.',
                ),
                buttonModal: this.$t('Aceptar'),
                orderModal: 'delete_account',
            };
            this.itemSelect = item;
        },
        /**
         * Determines the action to take based on the account type.
         * @param item - The account item to perform the action on.
         */
        buttonAction(item) {
            if (item.account_type === 'CARD') {
                this.creditCardCancel(item);
            } else {
                this.accountCancel(item);
            }
        },
        /**
         * Resets the input fields to their initial state.
         */
        onReset() {
            this.bankInput = {
                value: 'Selecciona',
                color: 'accent-content',
                validation: false,
                message: '',
            };
            this.accountTypeInput = {
                value: 'Selecciona',
                color: 'accent-content',
                validation: false,
                message: '',
            };
            this.accountNumberInput = {
                value: '',
                color: 'accent-content',
                validation: false,
                message: '',
            };
            this.accountNumberConfirmInput = {
                value: '',
                color: 'accent-content',
                validation: false,
                message: '',
            };
            this.interbankCodeInput = {
                value: '',
                color: 'accent-content',
                validation: false,
                message: '',
            };
            this.interbankCodeConfirmInput = {
                value: '',
                color: 'accent-content',
                validation: false,
                message: '',
            };
        },
        /**
         * Validates the bank input field.
         */
        handleBankInput() {
            if (this.bankInput.value !== 'Selecciona') {
                this.bankInput.validation = true;
                this.bankInput.color = 'success';
                this.bankInput.message = '';
            } else {
                this.bankInput.validation = false;
                this.bankInput.color = 'error';
                this.bankInput.message = 'Por favor selecciona un banco';
            }
        },
        /**
         * Validates the account type input field.
         */
        handleAccountTypeInput() {
            if (this.accountTypeInput.value !== 'Selecciona') {
                this.accountTypeInput.validation = true;
                this.accountTypeInput.color = 'success';
                this.accountTypeInput.message = '';
            } else {
                this.accountTypeInput.validation = false;
                this.accountTypeInput.color = 'error';
                this.accountTypeInput.message = 'Por favor selecciona un tipo de cuenta';
            }
        },
        /**
         * Validates the account number input field.
         */
        handleAccountNumberInput() {
            if (this.accountNumberInput.value == '') {
                this.accountNumberInput.validation = false;
                this.accountNumberInput.color = 'error';
                this.accountNumberInput.message = 'Por favor ingresa un número de cuenta';
            } else if (this.accountNumberInput.value.length < 10) {
                this.accountNumberInput.validation = false;
                this.accountNumberInput.color = 'yellow-500';
                this.accountNumberInput.message = 'El número de cuenta debe tener al menos 10 caracteres';
            } else if (this.accountNumberInput.value.length > 18) {
                this.accountNumberInput.validation = false;
                this.accountNumberInput.color = 'yellow-500';
                this.accountNumberInput.message = 'El número de cuenta no puede tener más de 18 caracteres';
            } else if (!/^\d+$/.test(this.accountNumberInput.value)) {
                this.accountNumberInput.validation = false;
                this.accountNumberInput.color = 'yellow-500';
                this.accountNumberInput.message = 'El número de cuenta solo puede contener números';
            } else {
                this.accountNumberInput.validation = true;
                this.accountNumberInput.color = 'success';
                this.accountNumberInput.message = '';
            }
        },
        /**
         * Validates the account number confirmation input field.
         */
        handleAccountNumberConfirmInput() {
            if (this.accountNumberConfirmInput.value == '') {
                this.accountNumberConfirmInput.validation = false;
                this.accountNumberConfirmInput.color = 'error';
                this.accountNumberConfirmInput.message = 'Por favor confirma el número de cuenta';
            } else if (this.accountNumberConfirmInput.value !== this.accountNumberInput.value) {
                this.accountNumberConfirmInput.validation = false;
                this.accountNumberConfirmInput.color = 'yellow-500';
                this.accountNumberConfirmInput.message = 'El número de cuenta no coincide';
            } else if (
                this.accountNumberConfirmInput.value == this.accountNumberInput.value &&
                this.accountNumberInput.validation
            ) {
                this.accountNumberConfirmInput.validation = true;
                this.accountNumberConfirmInput.color = 'success';
                this.accountNumberConfirmInput.message = '';
            }
        },
        /**
         * Validates the interbank code input field.
         */
        handleInterbankCodeInput() {
            if (this.interbankCodeInput.value === '') {
                this.interbankCodeInput.validation = false;
                this.interbankCodeInput.color = 'error';
                this.interbankCodeInput.message = 'Por favor ingresa un código interbancario';
            } else if (this.interbankCodeInput.value.length != 20) {
                this.interbankCodeInput.validation = false;
                this.interbankCodeInput.color = 'yellow-500';
                this.interbankCodeInput.message = 'El código interbancario debe tener 20 caracteres';
            } else if (!/^\d+$/.test(this.interbankCodeInput.value)) {
                this.interbankCodeInput.validation = false;
                this.interbankCodeInput.color = 'yellow-500';
                this.interbankCodeInput.message = 'El código interbancario solo puede contener números';
            } else {
                this.interbankCodeInput.validation = true;
                this.interbankCodeInput.color = 'success';
                this.interbankCodeInput.message = '';
            }
        },
        /**
         * Validates the interbank code confirmation input field.
         */
        handleInterbankCodeConfirmInput() {
            if (this.interbankCodeConfirmInput.value === '') {
                this.interbankCodeConfirmInput.validation = false;
                this.interbankCodeConfirmInput.color = 'error';
                this.interbankCodeConfirmInput.message = 'Por favor confirma el código interbancario';
            } else if (this.interbankCodeConfirmInput.value !== this.interbankCodeInput.value) {
                this.interbankCodeConfirmInput.validation = false;
                this.interbankCodeConfirmInput.color = 'yellow-500';
                this.interbankCodeConfirmInput.message = 'El código interbancario no coincide';
            } else if (
                this.interbankCodeConfirmInput.value === this.interbankCodeInput.value &&
                this.interbankCodeInput.validation
            ) {
                this.interbankCodeConfirmInput.validation = true;
                this.interbankCodeConfirmInput.color = 'success';
                this.interbankCodeConfirmInput.message = '';
            }
        },
        /**
         * Submits the form data to save a bank account.
         * @param values - The form values to submit.
         */
        onSubmit(values: any) {
            values.bank != undefined
                ? (values.bank = this.arraySelects['bankList'].filter((x) => x.Id == values.bank)[0])
                : (values.bank = null);
            values.account_type != undefined
                ? (values.account_type = this.arraySelects['accountTypeList'].filter(
                      (x) => x.Id == values.account_type || x.value == values.account_type,
                  )[0])
                : (values.account_type = null);
            values.client_type != undefined
                ? (values.client_type = this.arraySelects['clientTypeList'].filter(
                      (x) => x.Id == values.client_type,
                  )[0])
                : (values.client_type = null);
            if (values.account_type != null) {
                values.account_type.Id = values.account_type.value;
                values.account_type.Name = values.account_type.name;
            }
            apiService.request('save_user_bank', values).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.gAnalytics(
                        'bank_success',
                        values != undefined && values.bank != undefined && values.bank.Name != undefined
                            ? values.bank.Name
                            : null,
                    );
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Mensaje'),
                        messageModal: this.$t('Cuenta bancaria guardada satisfactoriamente.'),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                    this.getBankAccounts(this.filter);
                    this.model = JSON.parse(JSON.stringify(this.modelInitial));
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
        },
        /**
         * Handles the submission of a new bank account.
         */
        onSubmitAddNewBankAccount() {
            this.handleBankInput();
            this.handleAccountTypeInput();
            this.handleAccountNumberInput();
            this.handleAccountNumberConfirmInput();
            this.handleInterbankCodeInput();
            this.handleInterbankCodeConfirmInput();
            if (
                this.bankInput.validation &&
                this.accountTypeInput.validation &&
                this.accountNumberInput.validation &&
                this.accountNumberConfirmInput.validation &&
                this.interbankCodeInput.validation &&
                this.interbankCodeConfirmInput.validation
            ) {
                let values = {
                    name: this.appComponent.session.nombre,
                    bank: this.bankInput.value,
                    bank2: this.bankInput.value,
                    account_type: this.accountTypeInput.value,
                    account: this.accountNumberInput.value,
                    account2: this.accountNumberConfirmInput.value,
                    cod_interbank: this.interbankCodeInput.value,
                    cod_interbank2: this.interbankCodeConfirmInput.value,
                    client_type: {
                        name: 'Personal',
                        value: '0',
                        Id: '0',
                        Name: 'Personal',
                    },
                    country: this.appComponent.country,
                };
                this.onSubmit(values);
            }
            setTimeout(() => {
                this.onAddAccount = false;
            }, 1000);
        },
        /**
         * Registers a credit card token with the API.
         */
        registerCardToken() {
            const params = {
                currency: this.appComponent.session.moneda,
                method: 'auth',
                productId: this.appComponent.config.creditCard.idProduct ?? '6178',
            };
            apiService.request('register_card_token', params).then((response: any) => {
                if (response.code === 0) {
                    if (response.sessiontoken !== null && response.sessiontoken !== '') {
                        this.appComponent.creditCard(response);
                    } else {
                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Error!'),
                            messageModal: this.$t('Ha ocurrido un error al intentar agregar la tarjeta de crédito.'),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                    }
                } else {
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Error!'),
                        messageModal: response.msg,
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
    },
});
</script>
<template>
    <section class="relative w-full bg-base-200 h-auto rounded-b-box">
        <!-- Main container for bank account and credit card management -->
        <div
            v-if="!appComponent.infoApp"
            class="flex justify-center lg:justify-between items-center flex-col gap-4 py-4 md:py-9 overflow-hidden rounded-b-box"
        >
            <div
                class="relative grid grid-rows-1 md:grid-cols-2 lg:flex-row justify-center md:justify-between items-center w-full md:h-full px-4 py-4 md:px-10 gap-10"
            >
                <div
                    class="text-neutral text-normal text-justify space-y-6 w-full font-normal md:pb-5 md:border-b md:border-accent-focus"
                >
                    <!-- Information text for credit card -->
                    <p
                        v-if="config.creditCard !== undefined && config.creditCard.infoTextBank !== undefined"
                        v-html="$t(config.creditCard.infoTextBank)"
                    ></p>
                </div>
                <div class="relative flex items-center justify-center">
                    <div class="circle-background z-0 hidden md:block"></div>
                    <div class="circle-background-mobile z-0 block md:hidden"></div>
                    <img
                        src="https://images.virtualsoft.tech/m/msj0212T1734809910.png"
                        class="img-card absolute w-[45%] md:w-full h-auto top-auto right-[-20px] md:rotate-0 rotate-[30deg]"
                    />
                </div>
                <div v-if="!appComponent.infoApp" class="absolute text-neutral block md:hidden bottom-4 pl-3">
                    <!-- Button to add credit card -->
                    <button
                        v-if="
                            appComponent.config.creditCard !== undefined &&
                            appComponent.config.creditCard.bankAccountsActivate !== undefined &&
                            appComponent.config.creditCard.bankAccountsActivate && !appComponent.infoApp
                        "
                        class="mt-4 md:mt-2 mr-2 cursor-pointer border-1 border-primary-content hover:bg-primary-content px-5 py-2 text-center hover:text-neutral-content font-bold leading-6 rounded-md transition ease-in-out delay-75"
                        @click="registerCardToken"
                    >
                        {{ $t('Agregar tarjeta crédito') }}
                    </button>
                    <!-- Button to add bank account -->
                    <button
                        v-if="!appComponent.infoApp"
                        class="mt-4 md:mt-2 mr-2 cursor-pointer border-1 border-primary-content hover:bg-primary-content px-5 py-2 text-center hover:text-neutral-content font-bold leading-6 rounded-md transition ease-in-out delay-75"
                        @click="
                            getBanks();
                            onAddAccount = true;
                        "
                    >
                        {{ $t('Agregar cuenta bancaria') }}
                    </button>
                </div>
            </div>
        </div>
        <hr class="my-6 mx-6 w-[90%] border-accent-content block md:hidden" />
        <div class="flex flex-row justify-between items-center">
            <div class="AmountBox filtro-nota py-2 px-12 flex items-center">
                <label
                    class="FormLabel block md:inline-block pr-3 text-neutral"
                    for="valor"
                    >{{ $t('Estado:') }}</label
                >
                <div class="AmountContainer block md:inline-block">
                    <!-- Dropdown to filter bank accounts by state -->
                    <select
                        id="filtro_nota"
                        v-model="filter"
                        @change="update()"
                        class="select select-bordered w-full text-neutral bg-input-background border-input-border border-1"
                    >
                        <option value="">
                            {{ $t('Todas') }}
                        </option>
                        <option value="1">
                            {{ $t('Activa') }}
                        </option>
                        <option value="2">
                            {{ $t('Inactiva') }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="text-neutral hidden md:block">
                <!-- Button to add credit card -->
                <button
                    v-if="
                        appComponent.config.creditCard !== undefined &&
                        appComponent.config.creditCard.bankAccountsActivate !== undefined &&
                        appComponent.config.creditCard.bankAccountsActivate && !appComponent.infoApp
                    "
                    class="mt-4 md:mt-2 mr-2 cursor-pointer border-1 border-primary-content hover:bg-primary-content px-5 py-2 text-center hover:text-neutral-content font-bold leading-6 rounded-md transition ease-in-out delay-75"
                    @click="registerCardToken"
                >
                    {{ $t('Agregar tarjeta crédito') }}
                </button>
                <!-- Button to add bank account -->
                <button
                    v-if="!appComponent.infoApp"
                    class="mt-4 md:mt-2 mr-2 cursor-pointer border-1 border-primary-content hover:bg-primary-content px-5 py-2 text-center hover:text-neutral-content font-bold leading-6 rounded-md transition ease-in-out delay-75"
                    @click="
                        getBanks();
                        onAddAccount = true;
                    "
                >
                    {{ $t('Agregar cuenta bancaria') }}
                </button>
            </div>
        </div>
        <div
            v-if="
                appComponent.config.creditCard !== undefined &&
                appComponent.config.creditCard.bankAccountsActivate !== undefined &&
                appComponent.config.creditCard.bankAccountsActivate
            "
            class="flex flex-col md:px-8 py-4"
        >
            <div class="w-[98%]">
                <span class="w-full font-bold text-primary text-2xl pl-6 md:pl-0">
                    {{ $t('Tarjeta de crédito') }}
                </span>
                <div
                    v-if="loadingCreditCards"
                    class="w-full flex justify-start items-center"
                >
                    <AnimatedPlaceholder class="w-[178px] h-[113px] bg-secondary rounded-lg" />
                </div>
                <div
                    v-else-if="!loadingCreditCards && getCreditCard.length < 1"
                    class="w-full flex flex-col justify-center items-center"
                >
                    <span class="text-center w-full my-5 text-neutral">
                        {{ $t('No tienes tarjetas de crédito') }}
                    </span>
                </div>
                <div
                    v-else-if="!loadingCreditCards && getCreditCard.length > 0"
                    class="w-full h-full flex items-center my-6"
                >
                    <!-- Button to navigate left in the credit card slider -->
                    <button
                        v-if="getCreditCard.length > 4"
                        class="moveLeft bg-transparent border-none transition ease-in-out delay-100 hover:-translate-x-1"
                        :class="'slidePrev'"
                    >
                        <IconChevronLeft
                            class="fill-primary"
                            :width="20"
                            :height="30"
                        />
                    </button>
                    <swiper-container
                        :slidesPerView="'auto'"
                        :centeredSlides="false"
                        :grabCursor="true"
                        :space-between="1"
                        :navigation="{
                            nextEl: '.slideNext',
                            prevEl: '.slidePrev',
                        }"
                        :mousewheel="true"
                        :mousewheel-force-to-axis="true"
                        :free-mode="true"
                        :direction="'horizontal'"
                        class="mySwiper w-[70%] md:w-full h-full flex justify-start items-center md:px-0 gap-x-8 max-w-[91%] md:max-w-full"
                    >
                        <swiper-slide
                            class="rounded-lg w-[80%] md:w-[25%] overflow-hidden"
                            v-for="(account, index) in getCreditCard"
                            :key="index"
                        >
                            <button class="bg-accent w-[177px] h-[112px] rounded-lg shadow-lg text-neutral relative">
                                <div class="flex flex-col h-full">
                                    <button
                                        class="absolute right-2 top-[6px] hover:scale-105"
                                        @click="buttonAction(account)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 2L18 18"
                                                stroke="white"
                                                stroke-width="3"
                                            />
                                            <path
                                                d="M18 2L2 18"
                                                stroke="white"
                                                stroke-width="3"
                                            />
                                        </svg>
                                    </button>
                                    <div class="pt-8 flex justify-between items-center text-[10px] text-justify px-4">
                                        <div class="grid grid-rows-2">
                                            <span class="text-neutral-focus">
                                                {{ $t('Nombre') }}
                                            </span>
                                            <span>
                                                {{ appComponent.session.first_name }}
                                            </span>
                                        </div>
                                        <div class="grid grid-rows-2">
                                            <span class="text-neutral-focus text-end">
                                                {{ $t('Numero') }}
                                            </span>
                                            <span>
                                                {{ account.account }}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        class="flex justify-between items-center border-t border-accent-content w-full py-2 px-4"
                                    >
                                        <img
                                            src="https://images.virtualsoft.tech/m/msj0212T1734655389.png"
                                            class="w-11 h-8"
                                        />
                                        <img
                                            src="https://images.virtualsoft.tech/m/msj0212T1736948386.png"
                                            class="w-8 h-4"
                                        />
                                    </div>
                                </div>
                            </button>
                        </swiper-slide>
                    </swiper-container>
                    <!-- Button to navigate right in the credit card slider -->
                    <button
                        v-if="getCreditCard.length > 4"
                        class="moveRight bg-transparent border-none transition ease-in-out delay-100 hover:translate-x-1"
                        :class="'slideNext'"
                    >
                        <IconChevronRight
                            class="fill-primary"
                            :width="20"
                            :height="30"
                        />
                    </button>
                </div>
            </div>
            <hr class="w-full border-accent-content hidden md:block" />
            <hr class="my-6 mx-6 w-[90%] border-accent-content block md:hidden" />
            <span class="w-full font-bold text-primary text-2xl py-6 pl-6 md:pl-0">
                {{ $t('Cuentas Bancarias') }}
            </span>
        </div>
        <div class="px-6 overflow-x-auto">
            <!-- Table component for displaying bank accounts -->
            <AppTable
                :tableColumns="tableColumns"
                :data="bankAccounts"
                :loading="loadingTable"
                @button:action="buttonAction($event)"
            />
        </div>
    </section>
    <Teleport to="body">
        <!-- Modal for adding a new bank account -->
        <dialog
            v-if="onAddAccount && !appComponent.infoApp"
            class="modal in w-screen h-screen bg-neutral-content/90 z-[999]"
        >
            <section
                class="relative w-full max-w-[840px] max-h-[85vh] h-auto lg:h-[85%] lg:max-h-[860px] rounded-box flex justify-start items-center flex-col overflow-hidden"
            >
                <h3 class="w-full p-4 bg-base-300 text-xl font-bold">
                    {{ $t('Agregar cuenta bancaria') }}
                </h3>
                <button
                    class="absolute right-6 top-5 hover:scale-125 text-neutral"
                    @click="
                        onAddAccount = false;
                        onReset();
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M2 2L18 18"
                            stroke="currentColor"
                            stroke-width="3"
                        />
                        <path
                            d="M18 2L2 18"
                            stroke="currentColor"
                            stroke-width="3"
                        />
                    </svg>
                </button>
                <div class="bg-base-200 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box w-full">
                    <div class="h-full w-full flex flex-col gap-8 px-8 pb-8">
                        <label class="form-control w-full flex flex-row items-center">
                            <div class="label">
                                <span class="label-text text-neutral text-base mr-4">{{ $t('Tipo de moneda') }}</span>
                            </div>
                            <input
                                type="text"
                                class="input input-bordered text-neutral text-lg font-bold border-accent-content h-[25px] w-[90px] text-center"
                                :value="appComponent.session.moneda"
                                disabled
                            />
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{
                                        $t('Nombre de usuario')
                                    }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ejemplo"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    v-model="appComponent.session.nombre"
                                    disabled
                                />
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{ $t('Tipo de cliente') }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Personal"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    value="Personal"
                                    disabled
                                />
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{ $t('Banco') }}</span>
                                </div>
                                <select
                                    class="descripcion max-w-[100%] w-[100%] select select-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-neutral/10 border"
                                    v-model="bankInput.value"
                                    @change="handleBankInput()"
                                >
                                    <option
                                        disabled
                                        selected
                                    >
                                        {{ $t('Selecciona') }}
                                    </option>
                                    <option
                                        v-for="(bank, index) in arraySelects.bankList"
                                        :key="index"
                                        :value="bank.Id"
                                    >
                                        {{ $t(bank.Name) }}
                                    </option>
                                </select>
                                <div class="label">
                                    <span
                                        v-if="bankInput.message != ''"
                                        class="label-text-alt"
                                        :class="'text-sm text-' + bankInput.color"
                                        >{{ bankInput.message }}</span
                                    >
                                </div>
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{ $t('Tipo de cuenta') }}</span>
                                </div>
                                <select
                                    class="descripcion max-w-[100%] w-[100%] select select-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-neutral/10 border"
                                    v-model="accountTypeInput.value"
                                    @change="handleAccountTypeInput()"
                                >
                                    <option
                                        disabled
                                        selected
                                    >
                                        {{ $t('Selecciona') }}
                                    </option>
                                    <option value="0">
                                        {{ $t('Ahorros') }}
                                    </option>
                                    <option value="1">
                                        {{ $t('Corriente') }}
                                    </option>
                                </select>
                                <div class="label">
                                    <span
                                        v-if="accountTypeInput.message != ''"
                                        class="label-text-alt text-sm"
                                        :class="' text-' + accountTypeInput.color"
                                        >{{ accountTypeInput.message }}</span
                                    >
                                </div>
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{ $t('Número de cuenta') }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Número de cuenta"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    @input="handleAccountNumberInput()"
                                    v-model="accountNumberInput.value"
                                />
                                <div class="label">
                                    <span
                                        v-if="accountNumberInput.message != ''"
                                        class="label-text-alt"
                                        :class="'text-sm text-' + accountNumberInput.color"
                                        >{{ accountNumberInput.message }}</span
                                    >
                                </div>
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{
                                        $t('Confirmación número de cuenta')
                                    }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Confirma el número de cuenta"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    @input="handleAccountNumberConfirmInput()"
                                    v-model="accountNumberConfirmInput.value"
                                />
                                <div class="label">
                                    <span
                                        v-if="accountNumberConfirmInput.message != ''"
                                        class="label-text-alt"
                                        :class="'text-sm text-' + accountNumberConfirmInput.color"
                                        >{{ accountNumberConfirmInput.message }}</span
                                    >
                                </div>
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{
                                        $t('Código interbancario')
                                    }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ingresa el código"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    @input="handleInterbankCodeInput()"
                                    v-model="interbankCodeInput.value"
                                />
                                <div class="label">
                                    <span
                                        v-if="interbankCodeInput.message != ''"
                                        class="label-text-alt"
                                        :class="'text-sm text-' + interbankCodeInput.color"
                                        >{{ interbankCodeInput.message }}</span
                                    >
                                </div>
                            </label>
                            <label class="form-control w-full max-w-md mx-auto">
                                <div class="label">
                                    <span class="label-text text-neutral text-base">{{
                                        $t('Confirmación código interbancario')
                                    }}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Confirma el código"
                                    class="descripcion input input-bordered h-[40px] tablet:h-[50px] rounded-lg tablet:rounded-xl text-xl font-light border-input-border bg-input-background placeholder-input-placeholder text-neutral drop-shadow-xl shadow-inner shadow-secondary-content/25 border w-full"
                                    @input="handleInterbankCodeConfirmInput()"
                                    v-model="interbankCodeConfirmInput.value"
                                />
                                <div class="label">
                                    <span
                                        v-if="interbankCodeConfirmInput.message != ''"
                                        class="label-text-alt"
                                        :class="'text-sm text-' + interbankCodeConfirmInput.color"
                                        >{{ interbankCodeConfirmInput.message }}</span
                                    >
                                </div>
                            </label>
                        </div>
                        <div class="col-span-2 w-full flex justify-end items-center gap-4 pb-4">
                            <!-- Cancel button for the modal -->
                            <button
                                @click="
                                    onAddAccount = false;
                                    onReset();
                                "
                                class="btn btn-outline btn-primary hover:text-neutral-content normal-case text-base"
                            >
                                {{ $t('Cancelar') }}
                            </button>
                            <!-- Save button for the modal -->
                            <button
                                @click="onSubmitAddNewBankAccount()"
                                class="btn btn-primary text-neutral-content normal-case text-base"
                            >
                                {{ $t('Guardar información') }}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </dialog>
    </Teleport>
</template>
<style scoped>
/* Background circle for desktop view */
.circle-background {
    position: absolute;
    top: -90px;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 665px;
    height: 400px;
    border-radius: 200px 0 0 200px;
    background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
}
/* Background circle for mobile view */
.circle-background-mobile {
    position: relative;
    left: 120px;
    width: 115px;
    height: 100px;
    flex-shrink: 0;
    border-radius: 200px 0 0 200px;
    background: linear-gradient(261deg, hsl(var(--p)) 39.99%, hsl(var(--pc)) 93.9%);
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';
import MenuUser from '@/components/menus/MenuUser.vue';
import MenuUser3 from '@/components/menus/MenuUser3.vue';
import AppTable from '@/components/Table.vue';
import AppForm from '@/components/Form.vue';
import apiService from '@/services/ApiService';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import { useI18n } from 'vue-i18n';
import BankAccounts2 from '@/views/Balance/BankAccounts2.vue';
import { Input } from 'flowbite-vue';
import Button from '@/components/buttons/Button.vue';
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';
import IconChevronRight from '@/components/icons/IconChevronRight.vue';
import IconClose from '@/components/icons/IconClose.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';

/**
 * Global interface declaration for Window object to include VisanetCheckout.
 */
declare global {
    interface Window {
        VisanetCheckout: any;
    }
}

/**
 * Vue component definition for managing bank accounts.
 */
export default defineComponent({
    components: {
        ExitIcon,
        IconClose,
        IconChevronRight,
        IconChevronLeft,
        Button,
        BankAccounts2,
        Input,
        MenuUser,
        MenuUser3,
        AppTable,
        AppForm,
        VPagination,
    },
    data() {
        // Configuration and state variables initialization
        let config = this.$config();
        let emitter = this.$emitter();
        let appComponent: any = this.$appComponent;
        let refreshBalance = this.$refreshBalance;
        let bankAccounts: any = [];
        let filter: any = '1';
        let titleForm: string = '';
        let widthForm: boolean = false;
        let textDownForm: string = '';
        let fontColorForm: string = '';
        let fields: any =
            this.$config() != undefined &&
            this.$config().cuentasBancaria != undefined &&
            this.$config().cuentasBancaria.form != undefined &&
            this.$config().cuentasBancaria.form[this.$appComponent['country']] != undefined
                ? this.$config().cuentasBancaria.form[this.$appComponent['country']]
                : [];
        let arraySelects: any = {};
        let arraySelectsOrigin: any = {};
        let model: any = {};
        let modelInitial: any = {};
        let page: any = 0;
        let page2: any;
        let pages: any;
        let totalCount: any = 0;
        let itemSelect: any = {};
        let tableColumns: any = [];
        let loadingTable: boolean = false;
        let loadingForm = false;
        let newViewBank: boolean = false;
        let activeView: 'bank' | 'cellphone' | 'initial' = 'initial';
        let accountSelected: any = {};
        let getCreditCard: any = [];
        let { mergeLocaleMessage } = useI18n({ useScope: 'global' });
        let fieldsBank: any = [];
        let fieldsCellphone: any = [];

        // Conditional initialization of font color for the form
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

        const withdrawalMethod = config?.withdrawalMethod;
        if (!withdrawalMethod || withdrawalMethod.length == 0){
          activeView = 'bank';
        } else if (withdrawalMethod.length == 1){
          activeView = withdrawalMethod[0];
        }
        return {
            config,
            emitter,
            appComponent,
            refreshBalance,
            bankAccounts,
            filter,
            titleForm,
            widthForm,
            textDownForm,
            fields,
            arraySelects,
            arraySelectsOrigin,
            model,
            modelInitial,
            page,
            page2,
            totalCount,
            pages,
            itemSelect,
            tableColumns,
            loadingTable,
            loadingForm,
            mergeLocaleMessage,
            fontColorForm,
            newViewBank,
            activeView,
            accountSelected,
            getCreditCard,
            fieldsBank,
            fieldsCellphone,
        };
    },

    watch: {
        activeView: {
            handler(newVal) {
                if (newVal === 'bank' || newVal === 'cellphone') {
                    this.registerAcceptListener();
                }

                if (newVal === 'bank') {
                    if (
                        this.config?.forms?.['Cuentas bancarias']?.inputs
                    ) {
                        this.fields = JSON.parse(
                            JSON.stringify(this.config.forms['Cuentas bancarias'].inputs)
                        );
                    } else if (
                        this.config?.cuentasBancaria?.form?.[this.$appComponent['country']]
                    ) {
                        this.fields = JSON.parse(
                            JSON.stringify(
                                this.config.cuentasBancaria.form[this.$appComponent['country']]
                            )
                        );
                    }
                } else if (newVal === 'cellphone') {
                    if (
                        this.config?.numeroDeCelular?.form?.[this.$appComponent['country']]
                    ) {
                        this.fields = JSON.parse(
                            JSON.stringify(
                                this.config.numeroDeCelular.form[this.$appComponent['country']]
                            )
                        );
                    }
                }
            },
            immediate: true,
        },
    },
    unmounted() {
        // Clean up the event listener when the component is unmounted
        if (this._acceptListener) {
          this.emitter.off('accept:modal', this._acceptListener);
        }
    },
    mounted() {
        // Logic to determine the view state of the bank account
        if (window.localStorage.getItem('newViewBank') == 'true') {
            this.newViewBank = true;
            window.localStorage.setItem('newViewBank', 'true');
        } else {
            if (
                this.appComponent.config.bankAccountViewNew !== undefined &&
                !window.localStorage.getItem('newViewBank')
            ) {
                this.newViewBank = true;
                window.localStorage.setItem('newViewBank', 'true');
            } else {
                this.newViewBank = false;
                window.localStorage.setItem('newViewBank', 'false');
            }
        }
        if (
            !this.newViewBank ||
            this.appComponent.config.bankAccountViewNew == undefined ||
            !this.appComponent.config.bankAccountViewNew
        ) {
            this.registerAcceptListener();
            this.prefix =
                this.appComponent.config != undefined &&
                this.appComponent.config.prefix != undefined &&
                this.appComponent.config.prefix[this.appComponent.country] != undefined
                    ? this.appComponent.config.prefix[this.appComponent.country]
                    : '';
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
            this.config['forms'] != undefined &&
            this.config['forms']['Cuentas bancarias'] != undefined &&
            this.config['forms']['Cuentas bancarias']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Cuentas bancarias']['description'];
            } else {
                if (
                this.config != undefined &&
                this.config.cuentasBancaria != undefined &&
                this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1 != undefined
            ) {
                this.textDownForm = this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1;
                }
            }
            
            this.titleForm =
                this.config &&
                this.config.cuentasBancaria &&
                this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textInfo != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textInfo.TEXT != undefined
                    ? this.config.cuentasBancaria[this.appComponent.country].textInfo.TEXT +
                      '<br><h3 class="text-neutral">' +
                      this.$t('Tipo de Moneda') +
                      '</h3><strong class="text-neutral">' +
                      this.appComponent.session.moneda +
                      '</strong>'
                    : '';
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
                    Object.assign(this.arraySelects, {
                        bankList: response.data,
                    });
                    this.loadingForm = true;
                    this.getBankAccounts(this.filter);
                }
            });
            apiService.request('get_provider', {}).then((response: any) => {
              if (response.code == 0) {
                for (let i = 0; i < response.data.length; i++) {
                  response.data[i].value = response.data[i].Id;
                  response.data[i].name = response.data[i].Name;
                }
                Object.assign(this.arraySelects, {
                  providerList: response.data,
                });
                this.loadingForm = true;
              } else {
                console.error(this.$t('Error al obtener la lista de proveedores.'));
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
            this.model.account = this.prefix;
            this.model.account2 = this.prefix;
            this.model.docnumber = this.appComponent.session.cedula;
            this.model.client_type = '0';
            this.modelInitial = JSON.parse(JSON.stringify(this.model));
            this.arraySelectsOrigin = JSON.parse(JSON.stringify(this.arraySelects));
        }

        if (
            this.config != undefined &&
            this.config.cuentasBancaria != undefined &&
            this.config.cuentasBancaria.form != undefined &&
            this.config.cuentasBancaria.form[this.$appComponent.country] != undefined
        ) {
          this.fieldsBank = JSON.parse(
              JSON.stringify(this.config.cuentasBancaria.form[this.$appComponent.country])
          );
        }

        if (
            this.config != undefined &&
            this.config.numeroDeCelular != undefined &&
            this.config.numeroDeCelular.form != undefined &&
            this.config.numeroDeCelular.form[this.$appComponent.country] != undefined
        ) {
          this.fieldsCellphone = JSON.parse(
              JSON.stringify(this.config.numeroDeCelular.form[this.$appComponent.country])
          );
        }

        this.initSelectOptions(this.fieldsBank);
        this.initSelectOptions(this.fieldsCellphone);

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
                        } else if(this.itemSelect.account_type === 'PHONE') {
                          this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje'),
                            messageModal: this.$t('Número de celular eliminado satisfactoriamente.'),
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
         * Fetches bank accounts based on the provided state.
         * @param state - The state to filter bank accounts.
         */
        getBankAccounts(state) {
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
                }
            });
        },
        /**
         * Initiates the cancellation process for a bank account.
         * @param item - The bank account item to be canceled.
         */
        accountCancel(item: any) {
          if(item.account_type === 'PHONE') {
            this.appComponent.modal = {
              showModal: 'notification',
              titleModal: this.$t('Anular número de celular'),
              messageModal: this.$t('¿Esta seguro que desea eliminar el número de celular #') + item.account + '?',
              buttonModal: this.$t('Aceptar'),
              orderModal: 'delete_account',
            };
          } else {
            this.appComponent.modal = {
              showModal: 'notification',
              titleModal: this.$t('Anular cuenta bancaria'),
              messageModal: this.$t('¿Esta seguro que desea eliminar la cuenta bancaria #') + item.account + '?',
              buttonModal: this.$t('Aceptar'),
              orderModal: 'delete_account',
            };
          }
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
         * Handles the action button click based on account type.
         * @param item - The account item to perform action on.
         */
        buttonAction(item) {
            if (item.account_type === 'CARD') {
                this.creditCardCancel(item);
            } else {
                this.accountCancel(item);
            }
        },
        /**
         * Updates the current page based on pagination handler.
         * @param handler - The new page number.
         */
        updateHandler(handler: any) {
            this.page = handler - 1;
            this.getBankAccounts(this.filter);
        },
        /**
         * Handles changes in the input field for account prefix.
         * @param event - The event triggered by the input change.
         */
        change: function (event: any) {
            if (this.prefix != '') {
                event.event.target.addEventListener('keyup', (e: KeyboardEvent) => {
                    if (this.model.account.length <= 2) {
                        this.model.account = this.prefix;
                    } else {
                        this.model.account = this.prefix + this.model.account.replace(this.prefix, '');
                    }
                });
            }
        },
        /**
         * Handles changes in the select input for bank selection.
         * @param event - The event triggered by the select change.
         */
        changeSelect: function (event: any) {
            let value = event.event.target.value;
            let optionsKey = event.optionsKey;
            if (optionsKey == 'bankList') {
                Object.assign(this.arraySelects, {
                    branchesList:
                        this.arraySelects[optionsKey][
                            this.arraySelects[optionsKey].findIndex((i: { Id: string }) => i.Id === value)
                        ].branches,
                });
                this.model['branch'] = '';
                Object.assign(this.arraySelects, {
                    interbankCodesList:
                        this.arraySelects[optionsKey][
                            this.arraySelects[optionsKey].findIndex((i: { Id: string }) => i.Id === value)
                        ].interbankCodes,
                });
                this.model['cod_interbank'] = '';
                this.model['cod_interbank2'] = '';
                if (value == '314') {
                    Object.assign(this.arraySelects, {
                        accountTypeList: [
                            {
                                name: 'CPF',
                                value: '0',
                            },
                            {
                                name: 'Email',
                                value: '1',
                            },
                            {
                                name: 'Celular',
                                value: '2',
                            },
                            {
                                name: 'Chave Ale',
                                value: '3',
                            },
                        ],
                    });
                    this.mergeLocaleMessage('pt', {
                        'Número de cuenta': 'Chave PIX',
                        'Tipo de cuenta': 'Tipo de chave PIX',
                        'Confirmar número de cuenta': 'Confirmar chave PIX',
                    });
                } else {
                    this.arraySelects.accountTypeList = JSON.parse(
                        JSON.stringify(this.arraySelectsOrigin.accountTypeList)
                    );
                    this.mergeLocaleMessage('pt', {
                        'Número de cuenta': 'Numero de conta',
                        'Tipo de cuenta': 'Tipo De Conta',
                        'Confirmar número de cuenta': 'Confirmar o número da conta',
                    });
                }
            }
            if (optionsKey == 'providerList') {
              this.model['provider'] = value;
            }
        },
        /**
         * Handles the form submission for saving bank account details.
         * @param values - The form values to be submitted.
         */
        onSubmit(values: any) {
          if(this.activeView === 'bank') {
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
          } else {
            values.provider != undefined
                ? (values.provider = this.arraySelects['providerList'].filter((x) => x.Id == values.provider)[0])
                : (values.provider = null);
            apiService.request('save_user_cellphone', values).then((response: any) => {
              if (response.code == 0) {
                this.appComponent.modal = {
                  showModal: 'notification',
                  titleModal: this.$t('Mensaje'),
                  messageModal: this.$t('Método de retiro registrado correctamente.'),
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
          }
        },
        /**
         * Updates the bank account view and fetches necessary data.
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
         * Initializes select options for form fields.
         * @param fields - The form fields to initialize select options for.
         */
        initSelectOptions(fields) {
          fields.forEach((field) => {
            if (field.type === 'select') {
              if (field.options && field.options.length > 0) {
                field.options.forEach((opt) => {
                  opt.Id = opt.value;
                  opt.Name = opt.name;
                });
                this.arraySelects[field.optionsKey] = field.options;
              }
              else {
                this.arraySelects[field.optionsKey] = [];
              }
            }
          });
        },
        /**
         * Handles the change in bank account view state.
         */
        handleChangeBankAccountView() {
            if (this.newViewBank) {
                window.localStorage.setItem('newViewBank', 'false');
                setTimeout(() => {
                    if (
                        !this.newViewBank ||
                        this.appComponent.config.bankAccountViewNew == undefined ||
                        !this.appComponent.config.bankAccountViewNew
                    ) {
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
            this.config['forms'] != undefined &&
            this.config['forms']['Cuentas bancarias'] != undefined &&
            this.config['forms']['Cuentas bancarias']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Cuentas bancarias']['description'];
            } else {
                if (
                this.config != undefined &&
                this.config.cuentasBancaria != undefined &&
                this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1 != undefined
            ) {
                this.textDownForm = this.config.cuentasBancaria[this.appComponent.country].textCuentasBancaria1;
                }
            }
                        this.titleForm =
                            this.config &&
                            this.config.cuentasBancaria &&
                            this.config.cuentasBancaria[this.appComponent.country] != undefined &&
                            this.config.cuentasBancaria[this.appComponent.country].textInfo != undefined &&
                            this.config.cuentasBancaria[this.appComponent.country].textInfo.TEXT != undefined
                                ? this.config.cuentasBancaria[this.appComponent.country].textInfo.TEXT +
                                  '<br><h3>' +
                                  this.$t('Tipo de Moneda') +
                                  '</h3><strong>' +
                                  this.appComponent.session.moneda +
                                  '</strong>'
                                : '';
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
                                Object.assign(this.arraySelects, {
                                    bankList: response.data,
                                });
                                this.loadingForm = true;
                                this.getBankAccounts(this.filter);
                            }
                        });
                        apiService.request('get_provider', {}).then((response: any) => {
                          if (response.code == 0) {
                            for (let i = 0; i < response.data.length; i++) {
                              response.data[i].value = response.data[i].Id;
                              response.data[i].name = response.data[i].Name;
                            }
                            Object.assign(this.arraySelects, {
                              providerList: response.data,
                            });
                            this.loadingForm = true;
                          } else {
                            console.error(this.$t('Error al obtener la lista de proveedores.'));
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
                    }
                }, 1000);
            } else {
                window.localStorage.setItem('newViewBank', 'true');
            }
        },
        /**
         * Registers a card token for payment processing.
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
        /**
         * Registers an accept listener for modal actions.
         */
        registerAcceptListener() {
          if (this._acceptListener) {
            this.emitter.off('accept:modal', this._acceptListener);
          }
          this._acceptListener = () => this.acceptModal();
          this.emitter.on('accept:modal', this._acceptListener);
        },
    },
});
</script>

<template>
  <!-- Header section for the page layout -->
    <div
    v-if="config.layout != 3 && config.layout != 7"
    class="int-header h-[65px] bg-base-200 absolute w-full"
  ></div>
  <div
    v-if="config.layout != undefined && config.layout == 3"
    class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
  ></div>
<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
  <div
    class="Framework InfoPage mi-cuenta"
    v-if="appComponent.session.logueado"
  >
    <div class="Box TextBox NoHeadBox InfoBox">
      <div
          class="BoxContent InfoBoxContent"
          :class="appComponent.config.layout === 3 ? 'mx-auto' : ''"
      >
        <div
          class="Container ActivePageTitle"
          :class="
            config.layout != undefined && config.layout == 3
              ? 'my-5 pb-5 border-b-2 border-solid border-primary  w-full mx-auto'
              : 'ActivePageTitle2'
          "
        >
          <span class="h1">
            <span
              class="font-bold text-3xl text-neutral"

              >{{ $t("Registro de método de retiro") }}</span
            >
          </span>
          <div
              v-if="
							appComponent.config.bankAccountViewNew !=
								undefined &&
							appComponent.config.bankAccountViewNew
						"
              class="form-control"
          >
            <label class="label cursor-pointer">
							<span
                  class="label-text relative text-neutral text-sm font-bold w-14 leading-4"
              >{{ $t('Nueva visual')
                }}<img
                    src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
                    alt=""
                    class="absolute -top-1 right-1"
                /></span>
              <label
                  class="swap text-9xl flex justify-center items-center relative transition-all duration-700 ease-in-out cursor-pointer scale-110"
              >
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901670.png"
                    alt=""
                />
                <input
                    type="checkbox"
                    class="hidden"
                    v-model="newViewBank"
                    @click="handleChangeBankAccountView()"
                />
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901547.png"
                    alt=" "
                    class="swap-off absolute -left-[2px]"
                />
                <img
                    src="https://images.virtualsoft.tech/m/msj0212T1709901521.png"
                    alt=" "
                    class="swap-on absolute -right-3"
                />
              </label>
            </label>
          </div>
        </div>
        <div
          class="row justify-content-center w-full lg:w-10/12 mx-auto ActivePageTitle2">

          <MenuUser
            v-if="config.layout != 3"
            :page="'cuentasbancarias'"
            :MENU_ID="'3'"
          />
          <MenuUser3
            v-if="config.layout != undefined && config.layout == 3"
            :page="'cuentasbancarias'"
            :MENU_ID="'3'"
          />
          <div
            class="BoxContent TermsContentBox HelpContentBoxb w-full"
            :class="
              config.layout != undefined && config.layout == 3
                ? ''
                : 'md:w-3/4 float-left md:pl-8'
            "
          >
            <div v-if="activeView == 'initial' && config?.withdrawalMethod?.includes('bank') && config?.withdrawalMethod?.includes('cellphone')"
                 class="flex flex-col items-center justify-center bg-base-400 py-6 rounded-lg"
            >
              <span class="text-neutral text-sm mb-4 text-center">
                Selecciona cómo deseas registrar tu método de retiro:
              </span>

              <div class="flex gap-4">
                <button
                    class="px-6 py-2 rounded-md font-medium text-neutral bg-secondary hover:bg-secondary/50 transition"
                    @click="activeView = 'bank'"
                >
                  Cuenta bancaria
                </button>

                <button
                    class="px-6 py-2 rounded-md font-medium text-neutral bg-primary hover:bg-primary/50 transition"
                    @click="activeView = 'cellphone'"
                >
                  Número de celular
                </button>
              </div>
            </div>

            <div v-if="activeView == 'bank'">
            <div
              v-if="!newViewBank && !appComponent.infoApp"
              class="Container InfoContent mb-5 shadow-md bg-base-400"
              :class="
                config.layout != undefined && config.layout == 3
                  ? 'rounded-b-xl'
                  : 'rounded-xl'
              "
            >
              <div v-if="!newViewBank" class="flex items-center space-x-3 p-4 bg-base-400">
                <div class="flex items-center space-x-3 p-4 mt-6">
                  <div v-if = "config?.withdrawalMethod?.length > 1 && !newViewBank">
                    <button
                        class="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white"
                        @click="activeView = 'initial'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                        <mask id="path-1-inside-1_32_2261" fill="white">
                          <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5Z"/>
                        </mask>
                        <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5Z" fill="#071729"/>
                        <path d="M0 0H45H0ZM45 27.5C45 39.9264 34.9264 50 22.5 50C10.0736 50 0 39.9264 0 27.5V22.5C0 32.165 10.0736 40 22.5 40C34.9264 40 45 32.165 45 22.5V27.5ZM0 45V0V45ZM45 0V45V0Z" fill="#121212" mask="url(#path-1-inside-1_32_2261)"/>
                        <path d="M31.8759 22.5C31.8759 22.0856 31.7113 21.6882 31.4183 21.3952C31.1252 21.1021 30.7278 20.9375 30.3134 20.9375H17.9384L22.0426 16.8333C22.3186 16.5371 22.4688 16.1454 22.4617 15.7406C22.4545 15.3358 22.2906 14.9496 22.0043 14.6633C21.718 14.377 21.3318 14.213 20.927 14.2059C20.5222 14.1987 20.1304 14.349 19.8342 14.625L13.0634 21.3958C12.7708 21.6888 12.6064 22.0859 12.6064 22.5C12.6064 22.9141 12.7708 23.3112 13.0634 23.6042L19.8342 30.375C19.9773 30.5285 20.1498 30.6516 20.3414 30.737C20.5331 30.8224 20.74 30.8684 20.9498 30.8721C21.1596 30.8758 21.368 30.8372 21.5626 30.7586C21.7571 30.68 21.9339 30.563 22.0822 30.4147C22.2306 30.2663 22.3476 30.0896 22.4262 29.895C22.5047 29.7004 22.5433 29.492 22.5396 29.2823C22.5359 29.0725 22.49 28.8655 22.4046 28.6739C22.3192 28.4822 22.1961 28.3097 22.0426 28.1667L17.9384 24.0625H30.3134C31.1759 24.0625 31.8759 23.3625 31.8759 22.5Z" fill="#FBFBFB"/>
                      </svg>
                    </button>
                  </div>
                  <h2 class="font-semibold text-lg text-neutral"
                  >{{$t('Cuentas bancarias')}}</h2>
                </div>
              </div>
              <div
                  v-if="
									appComponent.config.creditCard !==
										undefined &&
									appComponent.config.creditCard
										.bankAccountsActivate !== undefined
								"
                  class="flex flex-col md:flex-row justify-between items-center text-neutral px-7 pt-4 sm:pl-7 sm:pt-4 w-full"
              >
								<span
                    class="font-normal text-justify leading-6 text-base md:text-lg h-auto w-full md:w-[70%]"
                >
									{{
                    $t(
                        'Estimado usuario, recuerde que la cuenta bancaria debe estar a nombre del usuario de la cuenta, con cedula correcta y moneda de curso local',
                    )
                  }}
								</span>
                <button
                    v-if="!appComponent.infoApp"
                    class="mt-4 md:mt-2 mr-2 cursor-pointer border-1 border-primary-content hover:bg-primary-content px-5 py-2 text-center hover:text-neutral-content font-bold leading-6 rounded-md transition ease-in-out delay-75"
                    @click="registerCardToken"
                >
                  {{ $t('Agregar tarjeta crédito') }}
                </button>
              </div>
              <AppForm
                :loading="loadingForm"
                :title="titleForm"
                :fields="fields"
                :styleWidth="widthForm"
                :arraySelects="arraySelects"
                :fontColorForm="fontColorForm"
                :model="model"
                :textDown="textDownForm"
                :textButton="'Aceptar'"
                @onSubmit:form="onSubmit($event)"
                @changeSelect:form="changeSelect($event)"
                @changeField:form="change($event)"
              />
            </div>
            <div
                v-if="!newViewBank"
                class="table-grid p-5 rounded-xl shadow-md bg-base-400"
            >
              <div class="AmountBox filtro-nota mb-5">
                <label
                    class="FormLabel block md:inline-block pr-3 text-neutral"
                    for="valor"
                >{{ $t("Estado:") }}</label
                >
                <div
                    class="AmountContainer block md:inline-block">

                  <select
                      id="filtro_nota"
                      v-model="filter"
                      @change="update()"
                      class="select select-bordered w-full bg-input-background border-input-border border-1 text-input-placeholder"
                  >
                    <option value="">
                      {{ $t("Todas") }}
                    </option>
                    <option value="1">
                      {{ $t("Activa") }}
                    </option>
                    <option value="2">
                      {{ $t("Inactiva") }}
                    </option>
                  </select>
                </div>
              </div>
              <div
                  v-if="
                  !appComponent.infoApp  &&
									appComponent.config.creditCard !==
										undefined &&
									appComponent.config.creditCard
										.bankAccountsActivate !== undefined
								"
                  class="flex flex-col"
              >
                <div class="border-b border-accent-content">
									<span
                      class="w-full font-bold text-primary text-2xl">

										{{ $t('Tarjeta de crédito') }}
									</span>
                  <div
                      v-if="getCreditCard.length < 1"
                      class="w-full flex flex-col justify-center items-center"
                  >
										<span
                        class="text-center w-full my-5 text-neutral">
                    {{
                        $t(
                            'No tienes tarjetas de crédito') }}

										</span>
                  </div>

                  <div
                      v-else-if="getCreditCard.length > 0"
                      class="flex py-2 gap-16"
                  >
                    <div
                        class="w-full h-full flex items-center justify-between flex-row p-1 my-2">

                      <swiper-container
                          :slidesPerView="'auto'"
                          :centeredSlides="false"
                          :spaceBetween="1"
                          :grabCursor="true"
                          :navigation="{
													nextEl: '.slideNext',
													prevEl: '.slidePrev',
												}"
                          :mousewheel="true"
                          :mousewheel-force-to-axis="true"
                          :free-mode="true"
                          :direction="'horizontal'"
                          class="mySwiper swiper-h w-full h-full flex justify-start items-center px-[2%] md:px-0 gap-x-8 max-w-[91%] md:max-w-full"
                      >
                        <swiper-slide
                            class="rounded-lg w-[80%] md:w-[25%] overflow-hidden"
                            v-for="(
														account, index
													) in getCreditCard"
                            :key="index"
                        >
                          <button
                              class="bg-accent w-[177px] h-[112px] rounded-lg shadow-lg text-neutral relative"
                          >
                            <div
                                class="flex flex-col h-full">

                              <button
                                  class="absolute right-2 top-[6px] hover:scale-105"
                                  @click="
																	buttonAction(
																		account)"
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
                              <div
                                  class="pt-8 flex justify-between items-center text-[10px] text-justify px-4"
                              >
                                <div
                                    class="grid grid-rows-2">

																	<span
                                      class="text-neutral-focus">
                                  {{
                                      $t(
                                          'Nombre') }}

																	</span>
                                  <span>
																		{{
                                      appComponent
                                          .session
                                          .first_name}}

																	</span>
                                </div>

                                <div
                                    class="grid grid-rows-2"
                                >
																	<span
                                      class="text-neutral-focus text-end">
                                  {{
                                      $t(
                                          'Numero') }}

																	</span>
                                  <span>
																		{{
                                      account.account
                                    }}
																	</span>
                                </div>
                              </div>
                              <div
                                  class="flex justify-between items-center border-t border-accent-focus w-full py-2 px-4"
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
                    </div>
                  </div>
                </div>
                <span
                    class="w-full font-bold text-primary text-2xl py-6"
                >
									{{ $t('Método de retiro') }}
								</span>
              </div>
              <div class="overflow-x-auto">
                <AppTable
                    :tableColumns="tableColumns"
                    :data="bankAccounts"
                    :loading="loadingTable"
                    @button:action="buttonAction($event)"
                />
              </div>
              <v-pagination
                  v-if="totalCount > 0"
                  v-model="page2"
                  :pages="pages"
                  :range-size="1"
                  active-color="#DCEDFF"
                  :class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
                  @update:modelValue="updateHandler"
              />
            </div>
            </div>
            <div v-if="activeView == 'cellphone'">
              <div
                  v-if="!newViewBank && !appComponent.infoApp"
                  class="Container InfoContent mb-5 shadow-md bg-base-400"
                  :class="
                config.layout != undefined && config.layout == 3
                  ? 'rounded-b-xl'
                  : 'rounded-xl'
              "
              >
                <div v-if="!newViewBank" class="flex items-center space-x-3 p-4 bg-base-400">
                  <div class="flex items-center space-x-3 p-4 mt-6">
                    <div v-if = "config['withdrawalMethod'].length > 1 && !newViewBank">
                      <button
                          class="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white"
                          @click="activeView = 'initial'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                          <mask id="path-1-inside-1_32_2261" fill="white">
                            <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5Z"/>
                          </mask>
                          <path d="M0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5Z" fill="#071729"/>
                          <path d="M0 0H45H0ZM45 27.5C45 39.9264 34.9264 50 22.5 50C10.0736 50 0 39.9264 0 27.5V22.5C0 32.165 10.0736 40 22.5 40C34.9264 40 45 32.165 45 22.5V27.5ZM0 45V0V45ZM45 0V45V0Z" fill="#121212" mask="url(#path-1-inside-1_32_2261)"/>
                          <path d="M31.8759 22.5C31.8759 22.0856 31.7113 21.6882 31.4183 21.3952C31.1252 21.1021 30.7278 20.9375 30.3134 20.9375H17.9384L22.0426 16.8333C22.3186 16.5371 22.4688 16.1454 22.4617 15.7406C22.4545 15.3358 22.2906 14.9496 22.0043 14.6633C21.718 14.377 21.3318 14.213 20.927 14.2059C20.5222 14.1987 20.1304 14.349 19.8342 14.625L13.0634 21.3958C12.7708 21.6888 12.6064 22.0859 12.6064 22.5C12.6064 22.9141 12.7708 23.3112 13.0634 23.6042L19.8342 30.375C19.9773 30.5285 20.1498 30.6516 20.3414 30.737C20.5331 30.8224 20.74 30.8684 20.9498 30.8721C21.1596 30.8758 21.368 30.8372 21.5626 30.7586C21.7571 30.68 21.9339 30.563 22.0822 30.4147C22.2306 30.2663 22.3476 30.0896 22.4262 29.895C22.5047 29.7004 22.5433 29.492 22.5396 29.2823C22.5359 29.0725 22.49 28.8655 22.4046 28.6739C22.3192 28.4822 22.1961 28.3097 22.0426 28.1667L17.9384 24.0625H30.3134C31.1759 24.0625 31.8759 23.3625 31.8759 22.5Z" fill="#FBFBFB"/>
                        </svg>
                      </button>
                    </div>
                    <h2 class="text-neutral font-semibold text-lg">{{$t('Número de celular')}}</h2>
                  </div>
                </div>
                <AppForm
                    :loading="loadingForm"
                    :title="titleForm"
                    :fields="fields"
                    :styleWidth="widthForm"
                    :arraySelects="arraySelects"
                    :fontColorForm="fontColorForm"
                    :model="model"
                    :textButton="'Aceptar'"
                    @onSubmit:form="onSubmit($event)"
                />
              </div>

            <div
              v-if="!newViewBank"
              class="table-grid p-5 rounded-xl shadow-md bg-base-400"
              >
              <div class="AmountBox filtro-nota mb-5">
                <label
                  class="FormLabel block md:inline-block pr-3 text-neutral"
                  for="valor"
                >{{ $t("Estado:") }}</label
                >
                <div
                    class="AmountContainer block md:inline-block">

                  <select
                    id="filtro_nota"
                    v-model="filter"
                    @change="update()"
                    class="select select-bordered w-full bg-input-background border-input-border border-1 text-input-placeholder"
                  >
                    <option value="">
                      {{ $t("Todas") }}
                    </option>
                    <option value="1">
                      {{ $t("Activa") }}
                    </option>
                    <option value="2">
                      {{ $t("Inactiva") }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="overflow-x-auto">
                <AppTable
                  :tableColumns="tableColumns"
                  :data="bankAccounts"
                  :loading="loadingTable"
                  @button:action="buttonAction($event)"
                />
              </div>
              <v-pagination
                v-if="totalCount > 0"
                v-model="page2"
                :pages="pages"
                :range-size="1"
                active-color="#DCEDFF"
                :class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
                @update:modelValue="updateHandler"
              />
            </div>
            </div>
            <BankAccounts2 v-if="newViewBank && activeView == null" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- FILE DOCUMENTED -->

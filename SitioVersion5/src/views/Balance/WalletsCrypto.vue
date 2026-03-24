<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent, watch  } from 'vue'; // Importing defineComponent for Vue component definition
import AppTable from '@/components/Table.vue'; // Importing table component
import router from '@/router'; // Importing router for navigation
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import { Pagination } from 'flowbite-vue'; // Importing pagination from Flowbite Vue

export default defineComponent({
    components: {
        Pagination, // Registering pagination component
        VPagination, // Registering Vue 3 pagination component
        MenuUser, // Registering user menu component
        MenuUser3, // Registering alternative user menu component
        AppForm, // Registering form component
        AppTable, // Registering table component
    },
    data: function () {
        let config = this.$config(); // Retrieving configuration
        let emitter = this.$emitter(); // Retrieving event emitter
        let appComponent: any = this.$appComponent; // Retrieving application component
        let loadingForm = true; // State for loading form
        let titleForm: string = ''; // Title for the form
        let textDownForm: string = ''; // Text below the form
        let tableColumns: any = []; // Columns for the table
        let cryptoWallets: any = []; // Data for self-exclusion
        let itemSelect: any = {}; // Selected item
        let selectedCrypto = ''; // Selected cryptocurrency
        let selectedNetwork = ''; // Selected network
        let fields: any = []
        let arraySelects: any = {}; // Array for select options
        let model: any = {}; // Model for form data
        let modelInitial: any = {}; // Initial model for form data
        let widthForm: any = {}; // Width configuration for the form
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let totalCount: any = 0; // Total count of items
        let pages: any; // Number of pages for pagination
        let loadingTable: any = false; // State for loading table
        let page: any = 0; // Current page number
        let page2: any ; // Another page variable for pagination
        let filtro_nota: any = ''; // Filter for notes
        let resetForm = true; // State to reset form
        return {
            config,
            emitter,
            appComponent,
            refreshBalance,
            loadingForm,
            fields,
            arraySelects,
            model,
            modelInitial,
            titleForm,
            textDownForm,
            widthForm,
            tableColumns,
            cryptoWallets,
            totalCount,
            pages,
            loadingTable,
            page,
            filtro_nota,
            page2,
            itemSelect,
            resetForm,
            selectedCrypto,
            selectedNetwork,
        };
    },
    unmounted() {
        this.emitter.all.delete('accept:modal'); // Cleanup event listener on unmount
    },
    mounted() {
        // Listen for 'accept:modal' event
        this.emitter.on('accept:modal', () => {
            this.acceptModal(); // Accept modal action
        });

        this.fields = this.appComponent.config != undefined && this.appComponent.config.walletsCrypto != undefined && this.appComponent.config.walletsCrypto.form != undefined &&
        this.appComponent.config.walletsCrypto.form[this.$appComponent['country']] != undefined
            ? this.appComponent.config.walletsCrypto.form[this.$appComponent['country']]
            : []; // Form fields based on country
        apiService.request('get_crypto_currency', {}).then((response: any) => {
            // API request to get game types
            if (response.code == 0) {
                // Check for successful response
                for (var i = 0; i < response.data.length; i++) {
                    // Iterate through response data
                    response.data[i].name = response.data[i].value; // Set name for select options
                }
                Object.assign(this.arraySelects, {
                    // Assigning game types to arraySelects
                    typeCryptoList: response.data,
                });
            }
            console.log(response); // Log response for debugging
        });

        this.fields.forEach((field) => {
            // Iterate through form fields
            if (
                field.type == 'select' && // Check if field is a select type
                field.options != undefined && // Ensure options are defined
                field.options.length > 0 // Ensure options array is not empty
            ) {
                let options: object = {}; // Create options object
                options[field.optionsKey] = field.options; // Assign options to the key
                Object.assign(this.arraySelects, options); // Add options to arraySelects
            }
        });
        if (
            this.config != undefined && // Check if config is defined
            this.config.walletsCrypto != undefined && // Check if walletsCrypto is defined
            this.config.walletsCrypto.tableColumns != undefined && // Check if tableColumns are defined
            this.config.walletsCrypto.tableColumns[
                this.appComponent.country
                ] != undefined // Check if tableColumns for the country are defined
        ) {
            this.tableColumns =
                this.config.walletsCrypto.tableColumns[
                    this.appComponent.country
                    ]; // Assign table columns based on country
        }
        this.getCryptoWallets(); // Fetch auto-exclusion products
    },
    watch: {
        'model.cryptocurrency_id'(nuevoValor) {
            // Aquí tienes el valor seleccionado de typeCryptoList
            // Puedes acceder a this.arraySelects.typeCryptoList y buscar el objeto seleccionado
            const seleccionado = this.arraySelects.typeCryptoList.find(
                (item) => item.value === nuevoValor
            );
            console.log('Seleccionado:', seleccionado);

            if (seleccionado) {
               // Puedes guardar el valor en una variable si lo necesitas después
            this.selectedCrypto = seleccionado.crypto_id;
            console.log('ID de la criptomoneda seleccionada:', this.selectedCrypto);

            apiService.request('get_networks', {cryptocurrency_id: this.selectedCrypto}).then((response: any) => {
                // API request to get game types
                if (response.code == 0) {
                    // Check for successful response
                    for (var i = 0; i < response.data.length; i++) {
                        // Iterate through response data
                        response.data[i].name = response.data[i].value; // Set name for select options
                    }
                    Object.assign(this.arraySelects, {
                        // Assigning game types to arraySelects
                        typeRedBlockchainList: response.data,
                    });
                }
                console.log(response); // Log response for debugging
            }); 
            } else {
                this.selectedCrypto = '';
                this.arraySelects.typeRedBlockchainList = []
            }
            
        },
        'model.network_id'(nuevoValor) {
            // Aquí tienes el valor seleccionado de typeCryptoList
            // Puedes acceder a this.arraySelects.typeCryptoList y buscar el objeto seleccionado
            const seleccionado = this.arraySelects.typeRedBlockchainList.find(
                (item) => item.value === nuevoValor
            );
            console.log('Seleccionado:', seleccionado);

            if (seleccionado) {
                // Puedes guardar el valor en una variable si lo necesitas después
            this.selectedNetwork = seleccionado.network_Id;
            console.log('ID de la blockchain seleccionada:', this.selectedNetwork);
            } else {
                this.selectedNetwork = '';
            }
            
        },
    },
    methods: {
        /**
         * Accepts the modal action based on the current modal state.
         * Handles delete wallest and email confirmation.
         */
        acceptModal(item: any) {
            // Method to accept modal action
            const vthis = this; // Preserve context
            if (this.appComponent.modal.orderModal == 'wallet_cancel'){
                let params =
                    {
                        crypto_id: this.itemSelect.id, // Parameter for API request
                    }
                apiService
                    .request('delete_crypto_account', params) // API request to delete exclusion
                    .then((response: any) => {
                        if (response.code == 0) {
                            // Check for successful response
                            this.appComponent.modal = {
                                // Set modal for success notification
                                showModal: 'notification',
                                titleModal: this.$t('OK!'),
                                messageModal: this.$t(
                                    'Esta wallet ha sido eliminada satisfactoriamente.'
                                ),
                                buttonModal: this.$t('Aceptar'),
                                orderModal: 'closeModal',
                            };
                            this.getCryptoWallets(); // Refresh auto-exclusion products
                            vthis.refreshBalance(); // Refresh balance
                        } else {
                            var error_mensaje = ''; // Initialize error message
                            if (response.error_code != undefined) {
                                error_mensaje = this.$t('ERROR' + response.error_code.toString());
                            }
                            if (response.data.result != undefined) {
                                error_mensaje = this.$t(response.data.result);
                            }
                            if (error_mensaje == '') {
                                // Fallback for empty error message
                                error_mensaje = this.$t(
                                    'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                                );
                            }
                            this.appComponent.modal = {
                                // Set modal for error notification
                                showModal: 'notification',
                                titleModal: this.$t('Error!'),
                                messageModal: error_mensaje,
                                buttonModal: this.$t('Aceptar'),
                                orderModal: 'closeModal',
                            };
                        }
                    });
                this.appComponent.closeModal(); // Close modal after action
                this.appComponent.disabledButtonWithdraw = false; // Enable withdraw button
            }
        },
        /**
         * Submits the wallet account information for saving.
         * @param values - The values to be submitted.
         */
        onSubmit(values: any) {
            // Method to handle form submission
            let params = {
                cryptocurrency_id: this.selectedCrypto, // Cryptocurrency ID from selected option
                network_id: this.selectedNetwork, // Network ID from form values
                account: values.account, // Account from form values
                verification_account: values.verification_account, // Verification account from form values
            };
            apiService
                .request('set_crypto_wallet', params) // API request to set auto-exclusion
                .then((response: any) => {
                    if (response.code == 0) {
                        // Check for successful response
                        this.appComponent.modal = {
                            // Set modal for success notification
                            showModal: 'notification',
                            titleModal: this.$t('Mensaje'),
                            messageModal: this.$t(
                                'Se agrego la wallet correctamente.'
                            ),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'closeModal',
                        };
                        this.model = JSON.parse(
                            JSON.stringify(this.modelInitial) // Reset model to initial state
                        );
                        this.getCryptoWallets(); // Refresh auto-exclusion products
                        //this.resetForm = false; // Set reset form state
                    } else {
                        var error_mensaje = ''; // Initialize error message
                        if(response.message != undefined){
                            error_mensaje = response.message; // Set error message from response
                        }
                        if (response.error_code != undefined) {
                            // Check for error code
                            error_mensaje = this.$t(
                                'ERROR' + response.error_code.toString() // Set error message based on response
                            );
                        }
                        if (error_mensaje == '') {
                            // Fallback for empty error message
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
                            );
                        }
                        this.appComponent.modal = {
                            // Set modal for error notification
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
         * Handles changes in the wallet selection dropdown.
         * Updates related information based on the selected wallet.
         * @param event - The event containing the selected value.
         */
        changeSelect: function (event: any) {
            // Method to handle select change
            this.getCryptoWallets(); // Refresh auto-exclusion products
        },
        /**
         * Updates the current page for wallets and fetches the corresponding data.
         * @param handler - The new page number.
         */
        updateHandler(handler: any) {
            // Method to handle pagination update
            this.page = handler - 1; // Update current page
            this.getCryptoWallets(); // Refresh auto-exclusion products
        },
        /**
         * Updates the withdrawal table and fetches new data based on the current configuration.
         */
        update() {
            // Method to update component state
            this.pages = 0; // Reset pages
            this.page = 0; // Reset current page
            if (
                this.config != undefined && // Check if config is defined
                this.config.walletsCrypto != undefined && // Check if walletsCrypto is defined
                this.config.walletsCrypto.tableColumns != undefined && // Check if tableColumns are defined
                this.config.walletsCrypto.tableColumns[
                    this.appComponent.country
                    ] != undefined // Check if tableColumns for the country are defined
            ) {
                this.tableColumns =
                    this.config.walletsCrypto.tableColumns[
                        this.appComponent.country
                        ]; // Assign table columns based on country
            }
            this.tableColumns = this.tableColumns.filter(function (obj) {
                // Filter out undefined columns
                return obj;
            });
            this.getCryptoWallets(); // Refresh auto-exclusion products
        },
        /**
         * Fetches Wallets requests based on the provided state.
         * Updates the Wallets list and pagination.
         */
        getCryptoWallets() {
            // Method to fetch auto-exclusion products
            const params = {
                count: 10, // Number of items to fetch
                start: this.page * 10, // Start index for pagination
                State: ""
            };
            apiService
                .request('get_crypto_wallet', params) // API request to get auto-exclusion products
                .then((response: any) => {
                    if (response.code == 0) {
                        // Check for successful response
                        for (var i = 0; i < response.data.length; i++) {
                            // Iterate through response data
                           /* response.data.crypto_wallet.request[i].id = response.data.crypto_wallet.request[i].Id; // Set ID for each item
                            response.data.crypto_wallet.request[i].tipo =
                                response.data.crypto_wallet.request[i].type_product; // Set type for each item
                            response.data.crypto_wallet.request[i].fecha_crea =
                                response.dat.crypto_wallet.requesta[i].to_date; // Set creation date for each item*/
                            response.data[i].estado = response.data[i].state; // Set state for each item
                            if (response.data[i].state == 'A') {
                                // Check state
                                response.data[i].state = 'Activa'; // Set state to 'Active'
                            } else {
                                if (response.data[i].state == 'I') {
                                    // Check for inactive state
                                    response.data[i].state = 'Inactiva'; // Set state to 'Inactive'
                                    response.data[i].button_show = true; // Show button for inactive state
                                }
                            }
                        }
                        this.cryptoWallets = JSON.parse(
                            JSON.stringify(response.data) // Store response data in cryptoWallets
                        );
                        this.totalCount = parseInt(response.total_count); // Set total count of items
                        this.pages = parseInt(this.totalCount) / 10; // Calculate total pages
                        this.pages = parseInt(this.pages) + 1; // Increment pages for pagination
                        this.loadingTable = false; // Set loading state for table
                        console.log(this.cryptoWallets); // Log self-exclusion data for debugging
                    }
                });
        },
        /**
         * Initiates the wallet cancellation process for the selected item.
         * @param item - The wallet item to cancel.
         */
        buttonAction(item) {
            // Method to handle button action
            this.walletCancel(item)
            /*this.acceptModal(item); // Accept modal action*/
        },
        /**
         * Initiates the cancellation of a wallet note.
         * Displays a confirmation modal for cancellation.
         * @param item - The wallet item to cancel.
         */
        walletCancel(item: any) {
            this.itemSelect.id = item.id; // Set selected item ID
            // Method to cancel wallet action
            this.appComponent.modal = {
                // Set modal for success notification
                showModal: 'notification',
                titleModal: this.$t('Mensaje'),
                messageModal: this.$t(
                    '¿Deseas eliminar esta dirección? Solo podrás hacerlo si no está en uso.'
                ),
                buttonModal: this.$t('Aceptar'),
                orderModal: 'wallet_cancel',
            };

        },
    },
    updated() {
        setTimeout(() => {
            // Timeout to reset form state
            this.resetForm = true; // Reset form state
        }, 200);
    },
});
</script>

<template>
    <!-- Main container for the component -->
    <div
        v-if="config.layout != 3 && config.layout != 7"
        class="int-header h-[65px] bg-base-200 absolute w-full"
    ></div>
    <!-- Alternative header for layout 3 -->
    <div
        v-if="config.layout != undefined && config.layout == 3"
        class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
    ></div>
    
    <!-- Main content area for logged-in users -->
    <div
        class="Framework InfoPage mi-cuenta overflow-y-hidden"
        v-if="appComponent.session.logueado"
    >
        <div class="Box TextBox NoHeadBox InfoBox">
            <div class="BoxContent InfoBoxContent">
                <!-- Title container -->
                <div
                    class="Container ActivePageTitle"
                    :class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content w-full mx-auto'
							: 'ActivePageTitle2'
					"
                >
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

                        >{{ $t('Wallets Cripto') }}</span
                        >
					</span>
                </div>
                <!-- User menu and form area -->
                <div
                    class="row justify-content-center w-full lg:w-10/12 mx-auto"
                >
                    <MenuUser
                        v-if="config.layout != 3"
                        :page="'wallets-crypto'"
                        :MENU_ID="'3'"
                    />
                    <MenuUser3
                        v-if="config.layout != undefined && config.layout == 3"
                        :page="'wallets-crypto'"
                        :MENU_ID="'3'"
                    />
                    <div
                        class="BoxContent TermsContentBox HelpContentBox w-full"
                        :class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
                    >
                        <!-- Form for auto-exclusion -->
                        <div
                            class="Container InfoContent mb-5 rounded-b-xl shadow-md bg-base-400"
                            :class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
                        >
                            <AppForm
                                v-if="resetForm"
                                :loading="loadingForm"
                                :title="titleForm"
                                :fields="fields"
                                :styleWidth="widthForm"
                                :arraySelects="arraySelects"
                                :model="model"
                                :textDown="textDownForm"
                                :textButton="'GUARDAR'"
                                @onSubmit:form="onSubmit($event)"
                                @changeSelect:form="changeSelect($event)"
                            />
                        </div>
                        <!-- Table for displaying self-exclusion data -->
                        <div
                            class="table-grid p-5 pb-20 rounded-xl shadow-md bg-base-300 mb-8"
                            :class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200'
									: 'bg-base-400'
							"
                        >
                            <div class="overflow-x-auto">
                                <AppTable
                                    :tableColumns="tableColumns"
                                    :data="cryptoWallets"
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
                                @update:modelValue="updateHandler"
                                :class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
                                class="flex gap-4"
                            />
                        </div>
                    </div>
                    <!-- Background gradient at the bottom -->
                    <div
                        class="hidden absolute -bottom-2 w-full h-24 bg-gradient-to-t from-neutral-content"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

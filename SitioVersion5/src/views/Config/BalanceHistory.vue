<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing the useCookies function from vue3-cookies for cookie management
import { defineComponent } from 'vue'; // Importing defineComponent to create a Vue component
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import apiService from '@/services/ApiService'; // Importing apiService for API requests
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import moment from 'moment'; // Importing moment.js for date manipulation

export default defineComponent({
    components: { MenuUser, MenuUser3, AppForm, AppTable, VPagination }, // Registering components
    data() {
        let config = this.$config(); // Retrieving configuration
        let emitter = this.$emitter(); // Retrieving event emitter
        let appComponent: any = this.$appComponent; // Retrieving app component
        let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
        let data: any = []; // Initializing data array
        let params: any = {}; // Initializing parameters object
        let titleForm: string = ''; // Initializing form title
        let widthForm: any = {}; // Initializing form width
        let textDownForm: string = ''; // Initializing text below form
        let fields: any = []; // Initializing fields array
        let arraySelects: any = {}; // Initializing array for select options
        let model: any = {}; // Initializing model object
        let modelInitial: any = {}; // Initializing initial model object
        let page: any = 0; // Initializing current page
        let page2: any; // Initializing secondary page variable
        let pages: any; // Initializing total pages variable
        let totalCount: any = 0; // Initializing total count of items
        let itemSelect: any = {}; // Initializing selected item object
        let tableColumns: any = []; // Initializing table columns array
        let loadingTable: boolean = false; // Initializing loading state for table
        let loadingForm = true; // Initializing loading state for form
        let fontColorForm: string = ''; // Initializing font color for form
        let isCero: boolean = false; // Initializing flag for zero results

        // Checking configuration for form fields
        if (
            config != undefined &&
            config['forms'] != undefined &&
            config['forms']['Historial'] != undefined &&
            config['forms']['Historial']['inputs'] != undefined
        ) {
            fields = JSON.parse(JSON.stringify(config['forms']['Historial']['inputs'])); // Assigning form fields from config
        } else {
            // Fallback to balance history form fields if not found
            if (
                config != undefined &&
                config['balanceHistory'] != undefined &&
                config['balanceHistory']['form'] != undefined &&
                config['balanceHistory']['form'][this.$appComponent['country']] != undefined
            ) {
                fields = JSON.parse(JSON.stringify(config['balanceHistory']['form'][this.$appComponent['country']])); // Assigning fallback fields
            }
        }
        return {
            config,
            emitter,
            appComponent,
            refreshBalance,
            data,
            titleForm,
            widthForm,
            textDownForm,
            fields,
            arraySelects,
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
            fontColorForm,
            params,
            isCero,
        };
    },
    setup() {
        const { cookies } = useCookies(); // Using cookies in setup function
        return { cookies }; // Returning cookies for use in the component
    },
    unmounted() {
        this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
    },
    mounted() {
        this.emitter.on('accept:modal', () => { // Setting up event listener for modal acceptance
            this.acceptModal(); // Calling acceptModal method
        });
        // Checking configuration for table columns
        if (
            this.config != undefined &&
            this.config.balanceHistory != undefined &&
            this.config.balanceHistory.tableColumns != undefined &&
            this.config.balanceHistory.tableColumns[this.appComponent.country] != undefined
        ) {
            this.tableColumns = this.config.balanceHistory.tableColumns[this.appComponent.country]; // Assigning table columns from config
        }
        // Processing fields for select options
        this.fields.forEach((field) => {
            if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                field.options.forEach((opt) => {
                    opt.Id = opt.value; // Assigning Id to option
                    opt.Name = opt.name; // Assigning Name to option
                });
                let options: object = {};
                options[field.optionsKey] = field.options; // Creating options object
                Object.assign(this.arraySelects, options); // Merging options into arraySelects
            }
        });
        this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning initial model
        // Checking for font color configuration
        if (
            this.appComponent.config['consultWithdrawals'] != undefined &&
            this.appComponent.config['consultWithdrawals']['fontColorForm'] != undefined
        ) {
            this.fontColorForm = this.appComponent.config['consultWithdrawals']['fontColorForm']; // Assigning font color from config
        }
    },
    methods: {
        acceptModal() {
            this.appComponent.closeModal(); // Closing modal
        },
        getData() {
            this.params.start = this.page * 10; // Setting start parameter for pagination
            apiService.request('movement_history', this.params).then((response: any) => { // Making API request for movement history
                if (response.code == 0) {
                    // Processing successful response
                    for (var i = 0; i < response.data.Response.request.length; i++) {
                        if (response.data.Response.request[i].Movement == '0') {
                            response.data.Response.request[i].Movement = this.$t('Entrada'); // Translating movement type
                        } else {
                            if (response.data.Response.request[i].Movement == '1') {
                                response.data.Response.request[i].Movement = this.$t('Salida'); // Translating movement type
                            }
                        }
                    }
                    this.data = JSON.parse(JSON.stringify(response.data.Response.request)); // Assigning data from response
                    this.totalCount = parseInt(response.total_count); // Setting total count from response
                    this.pages = Math.ceil(this.totalCount / 10); // Calculating total pages
                    this.loadingTable = false; // Setting loading state to false
                } else {
                    // Handling error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Translating error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ha ocurrido un error al recuperar el historial. Por favor, intenta nuevamente más tarde.', // Default error message
                        );
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Setting modal properties for error notification
                        titleModal: this.$t('Error!'), // Setting modal title
                        messageModal: error_mensaje, // Setting modal message
                        buttonModal: this.$t('Aceptar'), // Setting modal button text
                        orderModal: 'closeModal', // Setting modal close action
                    };
                }
            });
        },
        onSubmit(values: any) {
            let valueFI = values.fecha_iniH; // Retrieving initial date from form values
            let valueFF = values.fecha_finH; // Retrieving final date from form values
            let fechaIni = new Date(valueFI); // Creating date object for initial date
            let from_date = new Date(fechaIni.setHours(0, 0, 0, 0)); // Setting time to start of the day
            let fechaFin = new Date(valueFF); // Creating date object for final date
            let to_date = new Date(fechaFin.setHours(23, 59, 0, 0)); // Setting time to end of the day
            let from_date_send = parseInt(
                from_date
                    .setHours(from_date.getHours() + 24) // Adjusting date for sending
                    .toString()
                    .slice(0, 10),
            );
            let to_date_send = parseInt(
                to_date
                    .setHours(to_date.getHours() + 24) // Adjusting date for sending
                    .toString()
                    .slice(0, 10),
            );
            // Handling case where no filters are applied
            if (
                values.movement == undefined &&
                values.type_of_movement == undefined &&
                values.fecha_iniH == undefined &&
                values.fecha_finH == undefined
            ) {
                let today = moment(new Date()).format('YYYY-MM-DD'); // Getting today's date
                let todayStam = new Date(today);
                let todayS = new Date(todayStam.setHours(0, 0, 0, 0)); // Setting start of today
                let todaySF = new Date(todayStam.setHours(23, 59, 0, 0)); // Setting end of today
                let from_date_send2 = parseInt(
                    todayS
                        .setDate(todayS.getDate() - 30) // Setting date to 30 days ago
                        .toString()
                        .slice(0, 10),
                );
                let to_date_send2 = parseInt(
                    todaySF
                        .setHours(todaySF.getHours() + 24) // Adjusting end date for sending
                        .toString()
                        .slice(0, 10),
                );
                let params2 = {
                    from_date: from_date_send2, // Setting parameters for API request
                    to_date: to_date_send2,
                    count: 10,
                    start: this.page * 10,
                    type_of_movement: values.type_of_movement,
                    Type: values.movement,
                };
                this.params = params2; // Assigning parameters for request
            } else if (values.fecha_iniH !== undefined && values.fecha_finH == undefined) {
                this.model.fecha_finH = moment(new Date()).format('YYYY-MM-DD'); // Setting end date to today
                let todaySF = new Date(fechaIni.setHours(23, 59, 0, 0)); // Setting end of the day for initial date
                let to_date_send2 = parseInt(
                    todaySF
                        .setHours(todaySF.getHours() + 24) // Adjusting end date for sending
                        .toString()
                        .slice(0, 10),
                );
                let params3 = {
                    from_date: from_date_send, // Setting parameters for API request
                    to_date: to_date_send2,
                    count: 10,
                    start: this.page * 10,
                    type_of_movement: values.type_of_movement,
                    Type: values.movement,
                };
                this.params = params3; // Assigning parameters for request
            } else {
                let params = {
                    from_date: from_date_send, // Setting parameters for API request
                    to_date: to_date_send,
                    count: 10,
                    start: this.page * 10,
                    type_of_movement: values.type_of_movement,
                    Type: values.movement,
                };
                this.params = params; // Assigning parameters for request
            }
            apiService.request('movement_history', this.params).then((response: any) => { // Making API request for movement history
                if (response.code == 0) {
                    if (response.data.Response.request.length == 0) {
                        this.isCero = true; // Setting flag if no results found
                    } else {
                        this.isCero = false; // Resetting flag if results found
                    }
                    for (var i = 0; i < response.data.Response.request.length; i++) {
                        if (response.data.Response.request[i].Movement == '0') {
                            response.data.Response.request[i].Movement = this.$t('Entrada'); // Translating movement type
                        } else {
                            if (response.data.Response.request[i].Movement == '1') {
                                response.data.Response.request[i].Movement = this.$t('Salida'); // Translating movement type
                            }
                        }
                    }
                    this.data = JSON.parse(JSON.stringify(response.data.Response.request)); // Assigning data from response
                    this.totalCount = parseInt(response.total_count); // Setting total count from response
                    this.pages = Math.ceil(this.totalCount / 10); // Calculating total pages
                    this.loadingTable = false; // Setting loading state to false
                } else {
                    // Handling error response
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Translating error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ha ocurrido un error al recuperar el historial. Por favor, intenta nuevamente más tarde.', // Default error message
                        );
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Setting modal properties for error notification
                        titleModal: this.$t('Error!'), // Setting modal title
                        messageModal: error_mensaje, // Setting modal message
                        buttonModal: this.$t('Aceptar'), // Setting modal button text
                        orderModal: 'closeModal', // Setting modal close action
                    };
                }
            });
        },
        updateHandler(handler: any) {
            this.page = handler - 1; // Updating current page based on pagination
            this.getData(); // Fetching data for the updated page
        },
        buttonAction(item) {}, // Placeholder for button action method
    },
});
</script>
<template>
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
            <div class="BoxContent InfoBoxContent">
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

                            >{{ $t('Historial de Movimientos') }}</span
                        >
                    </span>
                </div>
                <div class="row justify-content-center w-full lg:w-10/12 mx-auto ActivePageTitle2">
                    <MenuUser
                        v-if="config.layout != 3"
                        :page="'historial_saldo'"
                        :MENU_ID="'3'"
                    />
                    <MenuUser3
                        v-if="config.layout != undefined && config.layout == 3"
                        :page="'historial_saldo'"
                        :MENU_ID="'3'"
                    />
                    <div
                        class="BoxContent TermsContentBox HelpContentBox w-full"
                        :class="config.layout != undefined && config.layout == 3 ? '' : 'md:w-3/4 float-left md:px-8'"
                    >
                        <div
                            class="Container InfoContent mb-5 shadow-md bg-base-400"
                            :class="
                                config.layout != undefined && config.layout == 3
                                    ? 'rounded-b-xl'
                                    : 'rounded-xl'
                            "
                        >
                            <AppForm
                                :loading="loadingForm"
                                :title="titleForm"
                                :fields="fields"
                                :styleWidth="widthForm"
                                :arraySelects="arraySelects"
                                :model="model"
                                :fontColorForm="fontColorForm"
                                :textDown="textDownForm"
                                :textButton="'Consultar'"
                                @onSubmit:form="onSubmit($event)"
                            />
                        </div>
                        <div
                            class="table-grid p-5 rounded-xl shadow-md bg-base-400"
                        >
                            <div
                                v-if="isCero"
                                class="flex justify-center items-center"
                            >
                                <p
                                    class="text-xl text-neutral"
                                    :class="
                                config.layout != undefined && config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                            "
                                >
                                    {{ $t('No se encontraron movimientos en el rango seleccionado.') }}
                                </p>
                            </div>
                            <div
                                v-if="!isCero"
                                class="overflow-x-auto"
                            >
                                <AppTable
                                    :tableColumns="tableColumns"
                                    :data="data"
                                    :loading="loadingTable"
                                    @button:action="buttonAction($event)"
                                />
                            </div>
                            <v-pagination
                                v-if="totalCount > 0 && !isCero"
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
                </div>
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->

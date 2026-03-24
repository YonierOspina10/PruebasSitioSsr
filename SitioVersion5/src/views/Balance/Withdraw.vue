<script lang="ts">
// Importing the useCookies function from the vue3-cookies package for cookie management
import { useCookies } from 'vue3-cookies';
// Importing defineComponent from Vue to define a Vue component
import { defineComponent } from 'vue';
// Importing user menu components for rendering user-specific navigation
import MenuUser from '@/components/menus/MenuUser.vue';
import MenuUser3 from '@/components/menus/MenuUser3.vue';
// Importing a table component for displaying tabular data
import AppTable from '@/components/Table.vue';
// Importing the router instance for navigation between views
import router from '@/router';
// Importing the API service for making HTTP requests
import apiService from '@/services/ApiService';
// Importing pagination component for handling paginated data display
import VPagination from '@hennge/vue3-pagination';
// Importing CSS for the pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
// Importing deposit methods components for handling deposit functionalities
import methodsDeposit from '@/components/methodsDeposit.vue';
import MethodsDepositV2 from '@/components/MethodsDepositV2.vue';
// Importing Button component from Flowbite Vue for UI elements
import { Button } from 'flowbite-vue';
// Importing an exit icon component for user interface
import ExitIcon from '@/components/icons/ExitIcon.vue';
// Importing a form component for handling user input
import AppForm from '@/components/Form.vue';
// Importing the useI18n function for internationalization support
import { useI18n } from 'vue-i18n';
// Importing a withdrawal view component for balance withdrawal functionality
import Withdraw3 from '@/views/Balance/Withdraw3.vue';
import PopUpAction from '@/components/PopUpAction.vue';
// Exporting the component definition using defineComponent
export default defineComponent({
	/**
	 * Components used in the Vue.js application.
	 * Each component is registered for use within the parent component's template.
	 */
	components: {
		/**
		 * Withdraw3 component for handling withdrawal functionality.
		 */
		Withdraw3,

		/**
		 * PopUpAction component modal action functionality.
		 */
		PopUpAction,

		/**
		 * AppForm component for rendering forms in the application.
		 */
		AppForm,

		/**
		 * ExitIcon component for displaying an exit or logout icon.
		 */
		ExitIcon,

		/**
		 * Button component for rendering buttons with various functionalities.
		 */
		Button,

		/**
		 * MethodsDepositV2 component for handling deposit methods in version 2.
		 */
		MethodsDepositV2,

		/**
		 * methodsDeposit component for managing deposit-related methods.
		 */
		methodsDeposit,

		/**
		 * MenuUser component for displaying user-related menu options.
		 */
		MenuUser,

		/**
		 * MenuUser3 component for an alternative user menu layout or functionality.
		 */
		MenuUser3,

		/**
		 * AppTable component for rendering tabular data in the application.
		 */
		AppTable,

		/**
		 * VPagination component for handling pagination in lists or tables.
		 */
		VPagination,
	},
	data() {
		let modalQueue: any[] = []; // lista de modales activos
        let currentModal: any = null; // modal actual mostrado
		/**
		 * Retrieves the configuration object for the component.
		 * @type {Object}
		 */
		let config = this.$config();

		/**
		 * Retrieves the event emitter for the component.
		 * @type {Object}
		 */
		let emitter = this.$emitter();

		/**
		 * Holds options for modal dialogs.
		 * @type {Object|null}
		 */
		let modalOption = null;

		/**
		 * Reference to the application component.
		 * @type {any}
		 */
		let appComponent: any = this.$appComponent;

		/**
		 * Function to refresh the account balance.
		 * @type {Function}
		 */
		let refreshBalance = this.$refreshBalance;

		/**
		 * Flag to control the visibility of the message modal.
		 * @type {boolean}
		 */
		let showModalMessage: boolean = false;

		/**
		 * Flag to control the visibility of the info modal.
		 * @type {boolean}
		 */
		let showModalInfo: boolean = false;

		/**
		 * Flag to control the visibility of the print modal.
		 * @type {boolean}
		 */
		let showModalPrint: boolean = false;

		/**
		 * List of banks available for selection.
		 * @type {Array<any>}
		 */
		let listBanks: any = [];

        let getCreditCard: any = [];

        /**
         * List of banks available for selection.
         * @type {Array<any>}
         */
        let listCrypto: any = [];

		/**
		 * Flag to control the visibility of the banks list.
		 * @type {boolean}
		 */
		let listBanksView: boolean = false;

		/**
		 * List of withdrawal types available.
		 * @type {Array<any>}
		 */
		let listTypesWithdraw: any = [];

		/**
		 * List of products available for withdrawal.
		 * @type {Array<any>}
		 */
		let listProductsWithdraw: any = [];

		/**
		 * List of withdrawals made.
		 * @type {Array<any>}
		 */
		let withdrawals: any = [];

		/**
		 * Filter for notes related to withdrawals.
		 * @type {string}
		 */
		let filtro_nota: any = '';

		/**
		 * Type of account selected for withdrawal.
		 * @type {string}
		 */
		let tipo_cuenta: any = '';

		/**
		 * Bank account number.
		 * @type {string}
		 */
		let cuenta_bancaria: string = '';

		/**
		 * Department ID for the selected account.
		 * @type {string}
		 */
		let depto_id: string = '';

		/**
		 * City ID for the selected account.
		 * @type {string}
		 */
		let ciudad_id: string = '';

		/**
		 * Object to hold selected values for dropdowns.
		 * @type {Object}
		 */
		let arraySelects = {};

		/**
		 * Information string for display.
		 * @type {string}
		 */
		let info1: string = '';

		/**
		 * Flag to disable the info1 field.
		 * @type {boolean}
		 */
		let info1Disabled = false;

		/**
		 * Base64 encoded string for data.
		 * @type {string}
		 */
		let base64: string = '';

		/**
		 * Base64 encoded string for download purposes.
		 * @type {string}
		 */
		let base64Download: string = '';

		/**
		 * HTML content for display.
		 * @type {string}
		 */
		let html: string = '';

		/**
		 * ID of the withdrawal being processed.
		 * @type {string}
		 */
		let withdrawId: string = '';

		/**
		 * Minimum withdrawal amount allowed.
		 * @type {number}
		 */
		let minWithdraw: any = 0;

		/**
		 * Maximum withdrawal amount allowed.
		 * @type {number}
		 */
		let maxWithdraw: any = 0;

		/**
		 * Current page number for pagination.
		 * @type {number}
		 */
		let page: any = 0;

		/**
		 * Second page number for pagination, if applicable.
		 * @type {any}
		 */
		let page2: any;

		/**
		 * Total number of pages available.
		 * @type {any}
		 */
		let pages: any;

		/**
		 * Total count of items for pagination.
		 * @type {number}
		 */
		let totalCount: any = 0;

		/**
		 * Order for modal display.
		 * @type {string}
		 */
		let orderModal: string = '';

		/**
		 * First value selected in the context.
		 * @type {any}
		 */
		let valor: any = null;

		/**
		 * Second value selected in the context.
		 * @type {any}
		 */
		let valor2: any = null;

		/**
		 * Object representing the selected item.
		 * @type {Object}
		 */
		let itemSelect: any = {};

		/**
		 * Array of columns for the data table.
		 * @type {Array<any>}
		 */
		let tableColumns: any = [];

		/**
		 * Flag indicating if the table is currently loading.
		 * @type {boolean}
		 */
		let loadingTable: boolean = false;

		/**
		 * Flag to disable the action button.
		 * @type {boolean}
		 */
		let disabledButton: boolean = false;

		/**
		 * Flag indicating if a withdrawal is in progress.
		 * @type {boolean}
		 */
		let onWithdraw: boolean = false;

		/**
		 * Object representing the selected currency.
		 * @type {Object}
		 */
		let currencySelected: any = {};

		/**
		 * List of available currencies.
		 * @type {Array<any>}
		 */
		let currenciesList: any = [];

		/**
		 * Current step in a multi-step process.
		 * @type {number}
		 */
		let step: number = 0;

		/**
		 * Flag indicating if the account addition process is active.
		 * @type {boolean}
		 */
		let onAddAcount: boolean = false;

        /**
         * Flag indicating if the safety process is active.
         * @type {boolean}
         */
        let safety: boolean = false;

		/**
		 * Flag indicating if the form is currently loading.
		 * @type {boolean}
		 */
		let loadingForm: boolean = false;

		/**
		 * Model object holding form data.
		 * @type {Object}
		 */
		let model: any = {};

		/**
		 * Fields configuration based on the current country.
		 * @type {Array<any>}
		 */
		let fields: any =
			this.$config() != undefined &&
			this.$config().cuentasBancaria != undefined &&
			this.$config().cuentasBancaria.form != undefined &&
			this.$config().cuentasBancaria.form[
				this.$appComponent['country']
			] != undefined
				? this.$config().cuentasBancaria.form[
						this.$appComponent['country']
					]
				: [];

		/**
		 * Flag to control the width of the form.
		 * @type {boolean}
		 */
		let widthForm: boolean = false;

		/**
		 * Function to merge locale messages for internationalization.
		 * @type {Function}
		 */
		let { mergeLocaleMessage } = useI18n({ useScope: 'global' });

		/**
		 * Original object for holding selected values.
		 * @type {Object}
		 */
		let arraySelectsOrigin: any = {};

		/**
		 * Text for display below the form.
		 * @type {string}
		 */
		let textDownForm: string = '';

		/**
		 * Initial model state for the form.
		 * @type {Object}
		 */
		let modelInitial: any = {};

		/**
		 * Object representing the selected account.
		 * @type {Object}
		 */
		let accountSelected: any = {};

		/**
		 * Object holding withdrawal value and its validation state.
		 * @type {Object}
		 */
		let valueWithdraw: any = {
			input: '',
			msg: '',
			color: '',
			validate: false,
		};

		/**
		 * Flag to disable the second withdrawal button.
		 * @type {boolean}
		 */
		let disabledButtonWithdraw2: boolean = true;

		/**
		 * Flag indicating if a loading spinner should be displayed.
		 * @type {boolean}
		 */
		let loadingSpin: boolean = true;

		/**
		 * Flag to control the visibility of a new view.
		 * @type {boolean}
		 */
		let newView: boolean = false;


        let localParams: any = null;

        let listDigitalsAccount: any = [];
        let arraySelectsD = {
            accountZelle: [],
        };
        let listDigitalbanks: any = [];
        let digitalsView = false;
        let numAccountZelle = 0;
        let otherView = false;
        let disabledButtonDigital = true;
        let idAccountSelect = '';
        let dataOtherView = {
            nameP: '',
            id: ''
        }
        let disableButtonWithdraw = false;
		let zelleSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.9893 95H45.0748C44.5827 95 44.1107 94.8092 43.7628 94.4695C43.4148 94.1298 43.2193 93.6691 43.2193 93.1888V82.82H25.5586C24.8803 82.819 24.2301 82.5556 23.7505 82.0874C23.2709 81.6192 23.001 80.9846 23 80.3225V71.945C23.0004 71.385 23.1924 70.8413 23.5455 70.4L54.8137 31.4675H26.9609C26.2813 31.4675 25.6295 31.204 25.1489 30.7349C24.6684 30.2658 24.3984 29.6296 24.3984 28.9662V19.6775C24.3984 18.3013 25.5471 17.18 26.957 17.18H43.2077V6.81125C43.2077 5.81375 44.0414 5 45.0633 5H55.9778C56.9997 5 57.8334 5.81375 57.8334 6.81125V17.18H74.4414C75.8513 17.18 77 18.3013 77 19.6775V27.6912C76.999 28.2482 76.8085 28.789 76.4583 29.2288L44.9942 68.5325H74.4414C75.8513 68.5325 77 69.6537 77 71.03V80.3187C77 80.9815 76.7306 81.6171 76.2508 82.0861C75.7711 82.555 75.1203 82.819 74.4414 82.82H57.8449V93.1888C57.8449 93.6691 57.6494 94.1298 57.3014 94.4695C56.9534 94.8092 56.4815 95 55.9893 95Z" fill="currentColor"/></svg>`
        let paypalSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52.0489 8C63.7364 8 73.0447 16.375 75.1489 26.9458C82.9781 30.9625 87.8031 39.7667 86.1781 49.0583L85.9864 50.0208L85.7864 50.925C84.5905 56.3051 81.6502 61.1393 77.4229 64.6756C73.1956 68.2119 67.9182 70.2522 62.4114 70.4792L61.3822 70.5H55.3281L53.1739 84.2875C52.8846 86.1351 51.9824 87.8316 50.6122 89.1043C49.242 90.377 47.4836 91.1518 45.6197 91.3042L44.9406 91.3333H36.7072C34.6028 91.3338 32.5762 90.538 31.0343 89.1059C29.4924 87.6737 28.5494 85.7112 28.3947 83.6125L28.3739 83H21.3322C20.1804 82.9999 19.0411 82.7609 17.9862 82.2983C16.9314 81.8356 15.9839 81.1593 15.2036 80.3121C14.4233 79.4648 13.8271 78.465 13.4526 77.3757C13.0782 76.2864 12.9336 75.1313 13.0281 73.9833L13.0989 73.3792L21.6656 18.5708C22.106 15.7501 23.4987 13.1652 25.6121 11.2458C27.7255 9.32648 30.4323 8.1884 33.2822 8.02083L34.0156 8H52.0531H52.0489ZM74.9156 37.1125L74.8781 37.2625C73.3903 43.1856 69.9674 48.4425 65.1525 52.1992C60.3375 55.9559 54.406 57.9974 48.2989 58H40.6031L37.3531 78.8333H37.3614L36.7072 83H44.9406L47.0947 69.2125C47.4017 67.2494 48.4001 65.4605 49.9098 64.1686C51.4194 62.8766 53.3411 62.1667 55.3281 62.1667H61.3822C65.1736 62.166 68.8515 60.8727 71.8088 58.5002C74.7661 56.1277 76.8262 52.8177 77.6489 49.1167L77.8531 48.2125C78.2896 46.2624 78.2506 44.2358 77.7393 42.3039C77.2281 40.372 76.2596 38.5915 74.9156 37.1125ZM52.0531 16.3333H34.0072C33.0942 16.3338 32.2066 16.6342 31.4809 17.1882C30.7552 17.7423 30.2316 18.5194 29.9906 19.4L29.8947 19.8583L21.3322 74.6667H29.5656L32.3697 56.7125C32.6592 54.8643 33.5621 53.1672 34.9331 51.8945C36.3041 50.6217 38.0635 49.8473 39.9281 49.6958L40.6031 49.6667H48.2947C57.0447 49.6667 64.6697 43.7167 66.7947 35.2375C67.3419 33.0593 67.3996 30.7869 66.9636 28.5837C66.5276 26.3805 65.6088 24.3014 64.2733 22.4957C62.9378 20.69 61.2187 19.2028 59.2397 18.1408C57.2607 17.0789 55.071 16.4687 52.8281 16.3542L52.0489 16.3333H52.0531Z" fill="currentColor"/></svg>`

		/**
		 * Returns the data object containing all the defined variables.
		 * @returns {Object}
		 */

		return {
			zelleSVG,
			paypalSVG,
			config,
			emitter,
			modalOption,
			appComponent,
			refreshBalance,
			showModalMessage,
			showModalInfo,
			showModalPrint,
			listBanks,
			listBanksView,
			listTypesWithdraw,
			listProductsWithdraw,
			withdrawals,
			filtro_nota,
			tipo_cuenta,
			cuenta_bancaria,
			depto_id,
			html,
			ciudad_id,
			arraySelects,
			info1,
			info1Disabled,
			base64,
			base64Download,
			withdrawId,
			minWithdraw,
			maxWithdraw,
			page,
			page2,
			totalCount,
			pages,
			orderModal,
			valor,
			valor2,
			itemSelect,
			tableColumns,
			loadingTable,
			disabledButton,
			onWithdraw,
			currencySelected,
			currenciesList,
			step,
			onAddAcount,
			loadingForm,
			fields,
			widthForm,
			model,
			mergeLocaleMessage,
			arraySelectsOrigin,
			textDownForm,
			modelInitial,
			accountSelected,
			valueWithdraw,
			disabledButtonWithdraw2,
			loadingSpin,
			newView,
            localParams,
            listDigitalsAccount,
            digitalsView,
            numAccountZelle,
            otherView,
            dataOtherView,
            disabledButtonDigital,
            listDigitalbanks,
            arraySelectsD,
            idAccountSelect,
            disableButtonWithdraw,
            listCrypto,
            getCreditCard,
            safety,
			modalQueue,
            currentModal,
		};
	},
	/**
	 * Vue.js setup function for component initialization.
	 *
	 * @returns {Object} An object containing the cookies object for use in the component.
	 */
	setup() {
		// Destructure the cookies object from the useCookies composable.
		const { cookies } = useCookies();

		// Return the cookies object to make it available in the component's template.
		return { cookies };
	},
	/**
	 * Lifecycle hook that is called when the component is unmounted.
	 * This method checks the state of the component and the configuration
	 * related to the withdrawals view before performing cleanup actions.
	 */
	unmounted() {
		// Check if the newView is not set or if the withdrawalsView configuration is missing or disabled
		if (
			!this.newView || // Indicates if a new view is active
			this.appComponent.config.withdrawalsView == undefined || // Checks if withdrawalsView is defined
			this.appComponent.config.withdrawalsView[
				this.appComponent.country
			] == undefined || // Checks if withdrawalsView for the current country is defined
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on == undefined || // Checks if the 'on' property is defined
			!this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on // Checks if the withdrawals view is enabled for the current country
		) {
			// Remove event listeners related to the finish and error steps
			this.emitter.all.delete('step:finish'); // Removes the 'step:finish' event listener
			this.emitter.all.delete('step:error2'); // Removes the 'step:error2' event listener
		}
	},
	mounted() {
		// Check if 'newView' is set in localStorage
		if (window.localStorage.getItem('newView') == 'true') {
			this.newView = true; // Set newView to true if localStorage indicates so
			window.localStorage.setItem('newView', 'true'); // Ensure localStorage reflects the newView state
		} else {
			// Check various conditions to determine if newView should be set to true
			if (
				this.appComponent.config.withdrawalsView !== undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				] !== undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				].isDefaultView !== undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				].isDefaultView &&
				!window.localStorage.getItem('newView')
			) {
				this.newView = true; // Set newView to true based on config
				window.localStorage.setItem('newView', 'true'); // Update localStorage
			} else {
				this.newView = false; // Set newView to false if conditions are not met
				window.localStorage.setItem('newView', 'false'); // Update localStorage
			}
		}
		// Check if newView is false or if certain configurations are undefined
		if (
			!this.newView ||
			this.appComponent.config.withdrawalsView == undefined ||
			this.appComponent.config.withdrawalsView[
				this.appComponent.country
			] == undefined ||
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on == undefined ||
			!this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on
		) {
			// Listen for 'step:error2' event
			this.emitter.on('step:error2', () => {
				if (!this.newView) {
					this.valor = null; // Reset valor
					this.refreshBalance(); // Refresh balance
					this.getWithdrawals(this.filtro_nota); // Fetch withdrawals with filter
					this.step = 0; // Reset step
					this.valor2 = null; // Reset valor2
					this.currencySelected = {}; // Reset selected currency
					this.accountSelected = {}; // Reset selected account
					this.valueWithdraw = {
						input: '', // Initialize input
						msg: '', // Initialize message
						color: '', // Initialize color
						validate: false, // Initialize validation state
					};
				}
			});
			// Listen for 'step:finish' event
			this.emitter.on('step:finish', () => {
				if (!this.newView) {
					this.finish(this.appComponent.saveResponseWithdrawal); // Finish process with response
				}
			});
			// Listen for 'accept:modal' event
			this.emitter.on('accept:modal', () => {
				this.acceptModal(); // Accept modal action
			});
			// Redirect to home if wallet session is '1'
			if (this.appComponent.session.wallet == '1') {
				router.push('/home'); // Navigate to home route
			}
			// Check if header configuration is undefined or currencyChangeButton is not set
			if (
				this.appComponent.config.header == undefined ||
				this.appComponent.config.header.currencyChangeButton ==
					undefined ||
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				] == undefined ||
				!this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				]
			) {
				this.getBanksAccounts(); // Fetch bank accounts
				this.getTypesWithdraw(); // Fetch withdrawal types
                this.getWalletsWithdraw(); // Fetch wallets for withdrawal

			}
			// Check if productWithdraw configuration is defined
			if (
				this.config.retiros != undefined &&
				this.config.retiros.productWithdraw != undefined &&
				this.config.retiros.productWithdraw[this.appComponent.country]
			) {
				this.getProductWithdraw(); // Fetch product withdrawals
			}
			// Check if tableColumns configuration is defined
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.retiros.tableColumns != undefined &&
				this.config.retiros.tableColumns[this.appComponent.country] !=
					undefined
			) {
				this.tableColumns =
					this.config.retiros.tableColumns[this.appComponent.country]; // Set table columns based on config
			}
			// Check if bank account text configuration is defined
			if (
				this.config != undefined &&
				this.config.cuentasBancaria != undefined &&
				this.config.cuentasBancaria[this.appComponent.country] !=
					undefined &&
				this.config.cuentasBancaria[this.appComponent.country]
					.textCuentasBancaria1 != undefined
			) {
				this.textDownForm =
					this.config.cuentasBancaria[
						this.appComponent.country
					].textCuentasBancaria1; // Set text for bank account form
			}
			// Check if currencyChangeButton is defined in header configuration
			if (
				this.appComponent.config.header !== undefined &&
				this.appComponent.config.header.currencyChangeButton !==
					undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				] !== undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				]
			) {
				// Make API request for user currency
				apiService
					.request('user_currency', {})
					.then((response: any) => {
						if (response.code === 0 && response.data.length > 0) {
							response.data.forEach((item) => {
								if (
									item.Currency ===
									this.appComponent.session.moneda
								) {
									this.currenciesList.push(item); // Add item to currenciesList if it matches session currency
								}
							});
							this.loadingSpin = false; // Stop loading spinner
						} else {
							var error_mensaje = '';
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							); // Translate error message based on error code
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
								); // Default error message if translation is empty
							}
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set modal message
								buttonModal: this.$t('Aceptar'), // Set modal button text
								orderModal: 'closeModal', // Set modal action
							};
						}
					});
			}
			// Process each field to set options for select types
			this.fields.forEach((field) => {
				if (
					field.type == 'select' &&
					field.options != undefined &&
					field.options.length > 0
				) {
					field.options.forEach((opt) => {
						opt.Id = opt.value; // Set Id to value for each option
						opt.Name = opt.name; // Set Name to name for each option
					});
					let options: object = {};
					options[field.optionsKey] = field.options; // Create options object
					Object.assign(this.arraySelects, options); // Merge options into arraySelects
				}
			});
			// Determine form width based on configuration
			this.widthForm =
				this.config != undefined &&
				this.config.cuentasBancaria != undefined &&
				this.config.cuentasBancaria[this.appComponent.country] !=
					undefined &&
				this.config.cuentasBancaria[this.appComponent.country].widthF !=
					undefined
					? this.config.cuentasBancaria[this.appComponent.country]
							.widthF // Set widthForm if defined
					: false; // Default to false if not defined
			this.model.name = this.appComponent.session.nombre; // Set model name from session
			this.model.docnumber = this.appComponent.session.cedula; // Set model document number from session
			this.model.client_type = '0'; // Set default client type
			this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Create a deep copy of the model
			this.arraySelectsOrigin = JSON.parse(
				JSON.stringify(this.arraySelects)
			); // Create a deep copy of the arraySelects
		}
	},
	methods: {
		/**
		 * Handles the back navigation logic.
		 * Toggles the view of bank list or resets the step.
		 */
		onBack() {
			if (this.listBanksView) {
				this.listBanksView = false;
				this.step = 1;
			} else {
				this.onWithdraw = false;
				this.step = 0;
                this.listDigitalbanks = [];
                this.arraySelectsD = {
                    accountZelle : []
                }
                console.log('listDigitalbanks', this.listDigitalbanks);
			}
		},
		/**
		 * Accepts the modal action based on the current modal state.
		 * Handles withdrawal cancellation and email confirmation.
		 */
		acceptModal() {
			const vthis = this; // Preserve context for use in promises
			if (this.appComponent.modal.orderModal == 'withdraw_cancel') {
				let params = {
					id: this.itemSelect.id, // ID of the selected item to cancel
				};
				apiService
					.request('withdraw_cancel', params) // API request to cancel withdrawal
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.gAnalytics('cancel_withdrawal'); // Track cancellation event
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('OK!'),
								messageModal: this.$t(
									'La nota de retiro ha sido anulada satisfactoriamente. Este valor se aumentara en saldo disponible para Apostar.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.getWithdrawals(this.filtro_nota); // Refresh withdrawals list
							vthis.refreshBalance(); // Update balance display
						} else {
							var error_mensaje = '';
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString()
							);
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
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
			} else if (this.appComponent.modal.orderModal == 'withdraw') {
				this.withdrawAccept(); // Proceed with withdrawal acceptance
			} else if (this.modalOption == 1) {
				this.$router.push('/gestion/deposito'); // Navigate to deposit management
			} else if (this.modalOption == 2) {
				apiService
					.request('send_confirm_email', {}) // Request to send confirmation email
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Confirmar correo'),
								messageModal: this.$t(
									'Hemos enviado una mensaje a tu correo electrónico, debes confirmarlo para continuar con el proceso de retiro.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
						} else {
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString()
								);
							}
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
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
			} else if (this.modalOption == 3) {
				this.$router.push('/gestion/verificar_cuenta'); // Navigate to user verification
			}
			this.appComponent.closeModal(); // Close the modal
			this.appComponent.disabledButtonWithdraw = false; // Enable withdrawal button
			this.onAddAcount = false; // Reset account addition state
			this.modalOption = null; // Clear modal option
		},
		/**
		 * Fetches withdrawal requests based on the provided state.
		 * Updates the withdrawals list and pagination.
		 * @param state - The state of withdrawals to filter.
		 */
		getWithdrawals(state) {
			const paramsWithdrawals = {
				State: state, // State filter for withdrawals
				count: 10, // Number of records to fetch
				start: this.page * 10, // Pagination start index
			};
			const vthis = this; // Preserve context for use in promises
			this.loadingTable = true; // Show loading indicator
			apiService
				.request('get_withdrawals', paramsWithdrawals) // API request to fetch withdrawals
				.then((response: any) => {
					if (response.code == 0) {
						var data = response.data.withdrawal_requests.request; // Extract withdrawal requests
						for (var i = 0; i < data.length; i++) {
							data[i].cuenta = data[i].id; // Map ID to account
							data[i].fecha_crea = data[i].date; // Map date
							data[i].valor = data[i].amount; // Map amount
							data[i].impuesto1 = data[i].tax1; // Map first tax
							data[i].impuesto2 = data[i].tax2; // Map second tax
							data[i].valorfinal =
								data[i].amount - data[i].tax1 - data[i].tax2; // Calculate final amount after taxes
							data[i].tipo = this.$t(data[i].payment_system_name); // Translate payment system name
							data[i].moneda = vthis.appComponent.session.moneda; // Set currency
							data[i].detalle = data[i].detail; // Map detail
							data[i].estado = ''; // Initialize status
							if (data[i].status == undefined) {
								data[i].status = 5 // Set status to approved
								data[i].estado = this.$t('Expiradas'); // Set status to expired
							} else if (data[i].status === '') {
								data[i].estado = this.$t(''); // Empty status
							} else if (data[i].status == 0) {
								data[i].estado = this.$t('Pendientes'); // Set status to pending
							} else if (data[i].status == 3) {
								data[i].estado = this.$t('Pagadas'); // Set status to paid
							} else if (data[i].status == -1) {
								data[i].estado = this.$t('Anuladas'); // Set status to canceled
							} else if (data[i].status == 4) {
								data[i].estado = this.$t('Rechazadas'); // Set status to rejected
							} else if (data[i].status == 2) {
								data[i].estado = this.$t('Pendientes'); // Set status to pending
							} else if (data[i].status == 1) {
								data[i].estado = this.$t('Aprobado'); // Set status to pending
							} else if (data[i].status == 5) {
								data[i].status = 0 // Set status to approved
								data[i].estado = this.$t('Aprobado'); // Set status to pending
							}
						}
						this.withdrawals = JSON.parse(JSON.stringify(data)); // Update withdrawals list
						this.totalCount = parseInt(response.total_count); // Set total count of withdrawals
						this.pages = parseInt(this.totalCount) / 10; // Calculate total pages
						this.pages = parseInt(this.pages) + 1; // Increment total pages
						this.loadingTable = false; // Hide loading indicator
					}
				});
		},
		/**
		 * Initiates the cancellation of a withdrawal note.
		 * Displays a confirmation modal for cancellation.
		 * @param item - The withdrawal item to cancel.
		 */
		withdrawCancel(item: any) {
			this.appComponent.modal = {
				showModal: 'notification',
				titleModal: this.$t('Anular Nota de Retiro'),
				messageModal:
					this.$t(
						'¿ Esta seguro que desea eliminar la nota de retiro #'
					) +
					item.id +
					'?',
				buttonModal: this.$t('Aceptar'),
				orderModal: 'withdraw_cancel', // Set order for cancellation
			};
			this.itemSelect = item; // Store selected item for cancellation
		},
		/**
		 * Fetches bank accounts for the selected user.
		 * Updates the list of banks and handles filtering based on conditions.
		 */
		getBanksAccounts() {
			const params = {
				State: '1', // Active state for bank accounts
				user_id: this.currencySelected.Id, // User ID for fetching accounts
			};

            const paramsD = {
                State: '1', // Active state for bank accounts
                user_id: this.currencySelected.Id, // User ID for fetching accounts
                type: 'digitals'
            };

			apiService
				.request('get_bank_accounts', params) // API request to fetch bank accounts
				.then((response: any) => {
					if (response && response.code == 0) {
						for (var i = 0; i < response.data.length; i++) {
							response.data[i].value =
								response.data[i].userbank_id; // Map user bank ID
							response.data[i].name =
								response.data[i].bank_name +
								' - ' +
								response.data[i].account; // Combine bank name and account
						}
                        for (var i = 0; i < response.data.length; i++) {
                            // Check if the account type is 'CARD'
                            if (response.data[i].account_type === 'CARD') {
                                // Add to credit card list
                                this.getCreditCard.push(response.data[i]);
                                console.log('this.getCreditCard', this.getCreditCard); // Log credit card data
                            } else {
                                // Add to bank accounts list
                                this.listBanks.push(response.data[i]);
                                console.log('this.bank', this.banksAccountsList); // Log bank account data
                            }
                        }

						if (
							this.listBanks &&
							this.listBanks.length > 0 &&
							this.listBanks[0]
						) {
							this.info1 = this.listBanks[0].info1; // Set info1 from the first bank
						} else if (this.info1 != '') {
							this.info1Disabled = true; // Disable info1 if empty
						} else {
						}
						if (
							this.filtro_nota !== '0' &&
							this.filtro_nota !== ''
						) {
							this.tableColumns = this.tableColumns.filter(
								function (obj) {
									return obj.name !== 'delete'; // Filter out delete column
								}
							);
						}
						if (this.filtro_nota != 4) {
							this.tableColumns = this.tableColumns.filter(
								function (obj) {
									return obj.name !== 'detalle'; // Filter out detail column
								}
							);
						}
						this.getWithdrawals(this.filtro_nota); // Fetch withdrawals based on filter
					}
				});

            apiService
                .request('get_bank_accounts', paramsD) // API request to fetch bank accounts
                .then((response: any) => {
                    if (response && response.code == 0) {
                        for (var i = 0; i < response.data.length; i++) {
                            response.data[i].value =
                                response.data[i].userbank_id; // Map user bank ID
                            response.data[i].name =
                                response.data[i].bank_name +
                                ' - ' +
                                response.data[i].account; // Combine bank name and account

                            if (response.data[i].bank_name == "Zelle") {
                                this.arraySelectsD.accountZelle.push(response.data[i])
                                this.numAccountZelle = this.arraySelectsD.accountZelle.length
                                if(this.arraySelectsD.accountZelle.length == 1){
                                    this.listDigitalbanks.push({
                                        "userbank_id": "199887",
                                        "account": "",
                                        "interbank_code": "0",
                                        "account_type": "Digital",
                                        "bank_name": "Zelle",
                                        "info1": "0",
                                        "client_type": "PERSONA",
                                        "state": "A",
                                        "coin": "VES",
                                        "valueDefault": "50",
                                        "value": "199887",
                                        "name": "Zelle - correo@p2.com"
                                    })
                                }
                            }
                            else if (response.data[i].bank_name == "Paypal") {
                                this.listDigitalbanks.push(response.data[i])
                                Object.assign(this.arraySelectsD, {
                                    accountPaypal:  [response.data[i]],
                                });
                            }
                        }
                        this.listDigitalsAccount = response.data; // Update list of banks
                        if (
                            this.listDigitalsAccount &&
                            this.listDigitalsAccount.length > 0 &&
                            this.listDigitalsAccount[0]
                        ) {
                            this.info1 = this.listDigitalsAccount[0].info1; // Set info1 from the first bank
                        } else if (this.info1 != '') {
                            this.info1Disabled = true; // Disable info1 if empty
                        } else {
                        }
                        if (
                            this.filtro_nota !== '0' &&
                            this.filtro_nota !== ''
                        ) {
                            this.tableColumns = this.tableColumns.filter(
                                function (obj) {
                                    return obj.name !== 'delete'; // Filter out delete column
                                }
                            );
                        }
                        if (this.filtro_nota != 4) {
                            this.tableColumns = this.tableColumns.filter(
                                function (obj) {
                                    return obj.name !== 'detalle'; // Filter out detail column
                                }
                            );
                        }
                        this.getWithdrawals(this.filtro_nota); // Fetch withdrawals based on filter
                    }
                });
		},
		/**
		 * Updates the current page for withdrawals and fetches the corresponding data.
		 * @param handler - The new page number.
		 */
		updateHandler(handler: any) {
			this.page = handler - 1; // Update page index
			this.getWithdrawals(this.filtro_nota); // Fetch withdrawals for the new page
		},
		/**
		 * Fetches the types of withdrawals available.
		 * Updates the list of withdrawal types.
		 */
		getTypesWithdraw() {
			apiService
				.request('get_types_withdraw', {}) // API request to fetch withdrawal types
				.then((response: any) => {
					if (response.code == 0) {
						response.data.forEach((item) => {
							this.listTypesWithdraw.push(item); // Add each type to the list
						});
					}
				});
		},
		/**
		 * Fetches products available for withdrawal.
		 * Updates the list of withdrawal products.
		 */
		
		getProductWithdraw() {
			apiService
				.request('get_product_withdraw', {}) // API request to fetch withdrawal products
				.then((response: any) => {
					if (response.code == 0) {
						response.data.forEach((item) => {
							this.listTypesWithdraw.push(item); // Add each product to the list
						});
					}
				});
		},

        getWalletsWithdraw() {
            // Fetch wallets available for withdrawal
            apiService
                .request('get_wallets_accounts', {user_id: this.appComponent.session.usuario})
                .then((response: any) => {
                    if (response.code == 0) {
                        if(response.data.length != 0){
                            response.data.forEach((item) => {
                                item.value = item.id; // Set value to wallet ID
                                item.name = item.wallet; // Combine name and currency
                            });
                            this.listCrypto = response.data; // Update list of wallets
                        }
                    }
                });
        },
		/**
		 * Finalizes the withdrawal process and handles analytics tracking.
		 * @param response - The response from the withdrawal request.
		 */
		finish(response) {
			let vthis = this; // Preserve context for use in promises
			this.appComponent.gAnalytics(
				'withdrawal_interaction',
				this.tipo_cuenta == 1
					? 'local'
					: this.tipo_cuenta == 2
						? 'Cuenta Bancaria'
						: this.tipo_cuenta == 853460
							? 'Red Activa Western Union'
							: this.tipo_cuenta == 2894342
								? 'Full Carga'
								: this.tipo_cuenta == 5446026
									? 'Mi Negocio Efectivo'
									: this.tipo_cuenta == 6283508
										? 'Farmacias Medicity'
                                        : this.tipo_cuenta == 10
                                            ? 'Wallets Crypto'
										    : ''
			);
			this.appComponent.gAnalytics('successful_withdrawal_old', {
				type: response.service, // Track successful withdrawal type
				value: response.amount, // Track withdrawal amount
			});
			this.html = response.data.details.status_messageHTML; // Set HTML message for withdrawal status
            console.log(this.listTypesWithdraw);
			if (
                this.tipo_cuenta != 2 &&
				this.listProductsWithdraw.filter((item) => {
					return item.value == this.tipo_cuenta; // Check if the account type is in the product list
				}).length <= 0 && this.tipo_cuenta != 4 && !this.safety

			) {
				if (
					response.data.details.status_messagePdf != undefined &&
					response.data.details.status_messagePdf != '' &&
					response.data.details.status_messagePdf != null
				) {
					vthis.base64 =
						'data:application/pdf;base64,' +
						response.data.details.status_messagePdf; // Set base64 for PDF
					vthis.base64Download =
						response.data.details.status_messagePdf; // Set download link for PDF
					vthis.withdrawId = response.data.details.data.WithdrawId; // Set withdrawal ID
					vthis.showModalPrint = true; // Show print modal
				} else if (this.tipo_cuenta != 10) {
					const noteWithdraw =
						response.data.details.status_message.replace(
							/\u21B5/g,
							''
						); // Clean up withdrawal message
					(
						document.getElementsByClassName(
							'recibo-content'
						)[0] as any
					).innerHTML = noteWithdraw; // Set receipt content
					(
						document.getElementById('div-recibo') as any
					).style.display = 'block'; // Show receipt
				} else {
                    this.onWithdraw = false; // Reset withdrawal state
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Mensaje'),
                        messageModal: this.$t('Retiro creado satisfactoriamente.'),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
			} else {
				this.onWithdraw = false; // Reset withdrawal state
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Mensaje'),
					messageModal: this.$t('Retiro creado satisfactoriamente.'),
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
                this.safety = false;
			}
		},
		/**
		 * Updates the withdrawal table and fetches new data based on the current configuration.
		 */
		update() {
			this.pages = 0; // Reset pages
			this.page = 0; // Reset page index
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.retiros.tableColumns != undefined &&
				this.config.retiros.tableColumns[this.appComponent.country] !=
					undefined
			) {
				this.tableColumns =
					this.config.retiros.tableColumns[this.appComponent.country]; // Set table columns based on configuration
			}
			if (this.filtro_nota !== '0' && this.filtro_nota !== '') {
				this.tableColumns = this.tableColumns.filter(function (obj) {
					return obj.name !== 'delete'; // Filter out delete column
				});
			}
			if (this.filtro_nota != 4) {
				this.tableColumns = this.tableColumns.filter(function (obj) {
					return obj.name !== 'detalle'; // Filter out detail column
				});
			}
			this.getWithdrawals(this.filtro_nota); // Fetch withdrawals based on filter
		},
		/**
		 * Prepares for the withdrawal process by checking conditions and displaying information modals.
		 */
		preWithdraw() {
			this.appComponent.disabledButtonWithdraw = true; // Disable withdrawal button
			const vthis = this; // Preserve context for use in promises
			if (
				vthis.config.retiros != undefined &&
				vthis.config.retiros.showModalInfo != undefined &&
				vthis.config.retiros.showModalInfo[
					vthis.appComponent.country
				] != undefined &&
				vthis.config.retiros.showModalInfo[vthis.appComponent.country]
			) {
				this.showModalInfo = true; // Show information modal if configured
			} else {
				this.withdraw(); // Proceed with withdrawal
			}
		},
		/**
		 * Initiates the withdrawal process after validating input fields.
		 * Displays appropriate error messages if validation fails.
		 */
		withdraw() {
			const vthis = this; // Preserve context for use in promises
            this.listTypesWithdraw.forEach((item) => {
                if (this.tipo_cuenta == item.value &&  item.safetypay != undefined && item.safetypay == true) {
                    this.safety = true;
                }
            })
			if (this.tipo_cuenta == '') {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t('Escoja el tipo de retiro'), // Prompt to select withdrawal type
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
				return false; // Exit if no withdrawal type selected
			}
			if (this.tipo_cuenta == '2' && this.cuenta_bancaria == undefined) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t('Escoja la cuenta bancaria'), // Prompt to select bank account
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
				return false; // Exit if no bank account selected
			}
			if (
				this.tipo_cuenta == '2' &&
				vthis.config.retiros.infoExtra != undefined &&
				vthis.config.retiros.infoExtra.length > 0
			) {
				var flag = false; // Flag for validation
				this.config.retiros.infoExtra.forEach(function (value, key) {
					if (
						(value.validSessionEmpty &&
							(vthis.appComponent.session[value.name] == '' ||
								vthis.appComponent.session[value.name] ==
									undefined ||
								vthis.appComponent.session[value.name] ==
									null)) ||
						value.validSessionEmpty == undefined ||
						value.validSessionEmpty == false
					) {
						if (vthis.valor == '' && value.required) {
							flag = true; // Set flag if required field is empty
						}
					}
				});
				if (flag) {
					this.appComponent.modal = {
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: this.$t(
							'Ingresa todos los campos requeridos.' // Prompt to fill all required fields
						),
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
					return false; // Exit if validation fails
				}
			}
			if (this.tipo_cuenta == '3' && this.depto_id == undefined) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t('Escoja el departamento'), // Prompt to select department
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
				return false; // Exit if no department selected
			}
			if (this.tipo_cuenta == '3' && this.ciudad_id == undefined) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t('Escoja la ciudad'), // Prompt to select city
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
				return false; // Exit if no city selected
			}
			if (
				vthis.config.retiros.minimoRetiro != undefined &&
				vthis.config.retiros.minimoRetiro
					.map((e) => e.pais)
					.indexOf(vthis.appComponent.session.pais_id) !== -1
			) {
				if (
					parseFloat(this.valor2) <
					parseFloat(
						vthis.config.retiros.minimoRetiro[
							vthis.config.retiros.minimoRetiro
								.map((e) => e.pais)
								.indexOf(vthis.appComponent.session.pais_id)
						].minimo
					)
				) {
					var minimo =
						vthis.config.retiros.minimoRetiro[
							vthis.config.retiros.minimoRetiro
								.map((e) => e.pais)
								.indexOf(vthis.appComponent.session.pais_id)
						].minimo; // Get minimum withdrawal amount
					this.appComponent.modal = {
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal:
							this.$t(
								'El valor mínimo a retirar por este medio es de'
							) +
							' ' +
							minimo +
							' ' +
							vthis.appComponent.session.moneda, // Prompt with minimum withdrawal amount
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
					return false; // Exit if below minimum
				}
			}
			if (this.tipo_cuenta == '1') {
				if (
					vthis.config.retiros.minimoRetiroLocal != undefined &&
					vthis.config.retiros.minimoRetiroLocal
						.map((e) => e.pais)
						.indexOf(vthis.appComponent.session.pais_id) !== -1
				) {
					if (
						this.valor <
						vthis.config.retiros.minimoRetiroLocal[
							vthis.config.retiros.minimoRetiroLocal
								.map((e) => e.pais)
								.indexOf(vthis.appComponent.session.pais_id)
						].minimo
					) {
						var minimo =
							vthis.config.retiros.minimoRetiroLocal[
								vthis.config.retiros.minimoRetiroLocal
									.map((e) => e.pais)
									.indexOf(vthis.appComponent.session.pais_id)
							].minimo; // Get minimum withdrawal amount for local
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal:
								this.$t(
									'El valor mínimo a retirar por este medio es de'
								) +
								' ' +
								minimo +
								' ' +
								vthis.appComponent.session.moneda, // Prompt with minimum withdrawal amount
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						return false; // Exit if below minimum
					}
				}
			}
			if (
				(this.tipo_cuenta != 2 && this.valor > 0) ||
				(this.tipo_cuenta == 2 && this.valor2 > 0)
			) {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Mensaje'),
					messageModal: this.$t(
						'¿ Esta seguro que los datos son correctos y desea generar la nota de retiro ?' // Confirm withdrawal details
					),
					buttonModal: this.$t('Aceptar'),
					orderModal: 'withdraw', // Set order for withdrawal
				};
			} else {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t(
						'Ingresa todos los campos requeridos.' // Prompt to fill all required fields
					),
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
				return false; // Exit if validation fails
			}
		},
		/**
		 * Accepts the withdrawal request and processes it.
		 * Handles the API request and response for withdrawal.
		 */
		async withdrawAccept() {
			const vthis = this; // Preserve context for use in promises
			var valor; // Amount to withdraw
			var service; // Service type for withdrawal
			var id; // ID for withdrawal
			if (this.tipo_cuenta == '1') {
				valor = this.valor; // Set value for local withdrawal
				service = 'local'; // Set service type
				id = ''; // No ID needed for local
			} else {
				if (this.tipo_cuenta == '2') {
					valor = this.valor2; // Set value for bank withdrawal
					service = 'UserBank'; // Set service type
					id = this.cuenta_bancaria; // Set bank account ID
				} else {
                    if(this.tipo_cuenta == '4') {
                        service = 'CreditCard';
                        id = this.accountSelected.userbank_id; // Get user bank ID for credit card
                    } else {
                        if (this.tipo_cuenta == '10') {
                            valor = this.valor2; // Set value for bank withdrawal
                            service = 'UserBank'; // Set service type
                            id = this.cuenta_bancaria; // Set bank account ID
                        } else {
                            if (
                                this.listProductsWithdraw.filter((item) => {
                                    return item.value == this.tipo_cuenta; // Check if the account type is in the product list
                                }).length > 0
                            ) {
                                valor = '#valor'; // Set value for product withdrawal
                                service = 'UserAgent'; // Set service type
                                id = this.tipo_cuenta; // Set product ID
                            } else {
                                valor = '#valor'; // Set value for local withdrawal
                                service = 'local'; // Set service type
                                id = this.tipo_cuenta; // Set account type ID
                            }
                        }
                    }
				}
			}
			var infoExtra = {}; // Additional info for withdrawal
			if (
				this.config.retiros.infoExtra != undefined &&
				this.config.retiros.infoExtra.length > 0
			) {
				this.config.retiros.infoExtra.forEach(function (value, key) {
					if (
						(value.validSessionEmpty &&
							(vthis.appComponent.session[value.name] == '' ||
								vthis.appComponent.session[value.name] ==
									undefined ||
								vthis.appComponent.session[value.name] ==
									null)) ||
						value.validSessionEmpty == undefined ||
						value.validSessionEmpty == false
					) {
						infoExtra[value.name] = (
							document.getElementById(value.name) as any
						).value; // Collect additional info from input fields
					}
				});
			}
			let amount = this.tipo_cuenta == 2 ? this.valor2 : this.valor; // Set amount based on account type
			if (
				this.appComponent.config.header !== undefined &&
				this.appComponent.config.header.currencyChangeButton !==
					undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				] !== undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				]
			) {
				id = this.accountSelected.userbank_id; // Set ID for currency change
				amount = this.valueWithdraw.input; // Set amount from input
			}
			if (amount != null && amount > 0) {
				let params = {
					user_id: '', // User ID for withdrawal
					amount: amount, // Amount to withdraw
					balance: '1', // Balance flag
					id: id, // ID for withdrawal
					payee: { forProduct: 'casino' }, // Payee information
					service: service, // Service type
					infoExtra: infoExtra, // Additional info
				};
				if (
					this.appComponent.config.header !== undefined &&
					this.appComponent.config.header.currencyChangeButton !==
						undefined &&
					this.appComponent.config.header.currencyChangeButton[
						this.appComponent.country
					] !== undefined &&
					this.appComponent.config.header.currencyChangeButton[
						this.appComponent.country
					]
				) {
					params = {
						amount: amount, // Amount to withdraw
						balance: '1', // Balance flag
						id: id, // ID for withdrawal
						payee: { forProduct: 'casino' }, // Payee information
						service: service, // Service type
						infoExtra: infoExtra, // Additional info
						user_id: this.currencySelected.Id, // User ID for withdrawal
					};
				}

                if (this.localParams !== null && this.localParams !== undefined) {
                    params = this.localParams;
                }
				await apiService
					.request('withdraw', params) // API request to process withdrawal
					.then((response: any) => {
						if (response && response.code === 0) {
                            this.localParams = null;
                            this.arraySelectsD = {
                                accountZelle : []
                            }
                            this.disableButtonWithdraw = false; // Enable withdrawal button
                            this.listDigitalbanks = [];
                            this.otherView = false;
                            this.accountSelected = {};
                            this.disabledButtonDigital = true;
                            this.idAccountSelect = '';
                            /*this.getBanksAccounts();*/
							if (
								response.data['confirmOTP'] !== undefined &&
								response.data['confirmOTP']
							) {
								let error_mensaje = '';
								if (response.data.msg != undefined) {
									error_mensaje = response.data.msg; // Get error message if available
								}
								if (error_mensaje == '') {
									error_mensaje = this.$t(
										'Te enviamos un código al email registrado' // Default message for OTP confirmation
									);
								}
								this.appComponent.modal = {
									showModal: 'sms', // Show SMS confirmation modal
									messageModal: {
										title: this.$t('Verificar código'), // Title for verification
										text: error_mensaje, // Message text
										buttonText: this.$t('Verificar'), // Button text
										img2: 'https://images.virtualsoft.tech/m/msjT1680297729.png', // Image for modal
										code: true, // Indicate that a code is required
										time: response.data['codeTime']
											? parseInt(
													response.data['codeTime']
												)
											: 1 * 60 * 1000, // Set timeout for code
										WithdrawId: response.data['WithdrawId']
											? response.data['WithdrawId']
											: null, // Set withdrawal ID
										service: response.data['service']
											? response.data['service']
											: null, // Set service type
										codeSend: 'email', // Indicate that code is sent via email
									},
								};
							} else {
								this.appComponent.gAnalytics(
									'withdrawal_interaction',
									this.tipo_cuenta == 1
										? 'local'
										: this.tipo_cuenta == 2
											? 'Cuenta Bancaria'
											: this.tipo_cuenta == 853460
												? 'Red Activa Western Union'
												: this.tipo_cuenta == 2894342
													? 'Full Carga'
													: this.tipo_cuenta ==
														  5446026
														? 'Mi Negocio Efectivo'
														: this.tipo_cuenta ==
															  6283508
															? 'Farmacias Medicity'
                                                            : this.tipo_cuenta == 10
                                                                ? 'Wallet Crypto'
															    : ''
								);
								this.appComponent.gAnalytics(
									'successful_withdrawal_old',
									{ type: service, value: amount } // Track successful withdrawal
								);
								this.html =
									response.data.details.status_messageHTML; // Set HTML message for withdrawal status
								this.valor = null; // Reset withdrawal value
								vthis.refreshBalance(); // Refresh balance display
								vthis.getWithdrawals(this.filtro_nota); // Refresh withdrawals list
								this.finish({ ...response, service, amount }); // Finalize withdrawal
								this.step = 0; // Reset step
								this.valor2 = null; // Reset secondary withdrawal value
								this.currencySelected = {}; // Reset currency selection
								this.accountSelected = {}; // Reset account selection
								this.valueWithdraw = {
									input: '',
									msg: '',
									color: '',
									validate: false,
								}; // Reset withdrawal input state
							}
						} else {
							if (response && response.error_code === 21015) {
								var error_mensaje = '';
								if (response.msg != undefined) {
									error_mensaje = response.msg; // Get error message if available
								}
								if (error_mensaje == '') {
									error_mensaje = this.$t(
										'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
									);
								}
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Error!'),
									messageModal: error_mensaje, // Show error message
									buttonModal: this.$t('Aceptar'),
									orderModal: 'closeModal',
								};
							} else if (response.error_code == 300034) {
								let error_mensaje = '';
								if (response.msg != undefined) {
									error_mensaje = response.msg; // Get error message if available
								}
								if (error_mensaje == '') {
									error_mensaje = this.$t(
										'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
									);
								}
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Error!'),
									messageModal: error_mensaje, // Show error message
									buttonModal: this.$t('Aceptar'),
									orderModal: 'closeModal',
								};
							} else if (response.error_code == 300053) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Depositar'),
									messageModal: this.$t(
										'Estimado usuario para retirar debe haber realizado almenos un deposito en su cuenta.' // Prompt to deposit before withdrawal
									),
									buttonModal: this.$t('Depositar'),
									orderModal: 'closeModal',
								};
								this.modalOption = 1; // Set modal option for deposit
							} else if (response.error_code == 300054) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Verificar correo'),
									messageModal: this.$t(
										'Estimado usuario, para poder realizar un retiro es necesario que verifique su correo electrónico.' // Prompt to verify email before withdrawal
									),
									buttonModal: this.$t(
										'Enviar link de verificación'
									),
									orderModal: 'closeModal',
								};
								this.modalOption = 2; // Set modal option for email verification
							} else if (response.error_code == 300237 && this.appComponent.session.doc_expired) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Cuenta desverificada'),
									messageModal: this.$t(
										'Tu documento de identidad está vencido y tu cuenta ha sido desverificada. Debes actualizar tu documento para volver a verificarte y poder realizar retiros.' // Prompt to verify email before withdrawal
									),
									buttonModal: this.$t(
										'Actualizar documento'
									),
									orderModal: 'closeModal',
								};
								this.modalOption = 3; // Set modal option for verification
							}else if (response.error_code == 300055) {
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Verificar celular'),
									messageModal: this.$t(
										'Estimado usuario, para realizar un retiro es necesario que verifique su número de celular.' // Prompt to verify phone number before withdrawal
									),
									buttonModal: this.$t('Aceptar'),
									orderModal: 'closeModal',
								};
							} else if (response.error_code == 300060) {
                                let error_mensaje = '';
                                if (response && response.error_code !== undefined) {
                                    error_mensaje = this.$t('ERROR' + response.error_code.toString());
                                }

                                if (response.msg != undefined) {
                                    error_mensaje = response.msg;
                                }

                                if (error_mensaje == '' || error_mensaje.length < 3) {
                                    error_mensaje = this.$t(
                                        'Tienes un bono activo, al crear tu nota de retiro será cancelado de manera permanente ¿Quieres continuar?',
                                    );
                                }

                                this.localParams = { ...params, remove_bonuses: true };

                                this.modalStore.title = this.$t('ATENCIÓN!');
                                this.modalStore.message = error_mensaje;
                                this.modalStore.open = true;
                                this.modalStore.cancelText = this.$t('Cancelar');
                                this.modalStore.cancel = () => {
                                    this.localParams = null;
                                    this.appComponent.showModal3 = false;
                                    this.modalStore.reset();
                                };
                                this.modalStore.action = () => {
                                    this.withdraw();
                                    this.appComponent.showModal3 = false;
                                    this.modalStore.reset();
                                };
                                this.appComponent.showModal3 = true;
                            } else {
								let error_mensaje = '';
								if (
									response &&
									response.error_code !== undefined
								) {
									error_mensaje = this.$t(
										'ERROR' + response.error_code.toString() // Get error message based on error code
									);
								}
								if (error_mensaje == '') {
									error_mensaje = this.$t(
										'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
									);
								}
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Error!'),
									messageModal: error_mensaje, // Show error message
									buttonModal: this.$t('Aceptar'),
									orderModal: 'closeModal',
								};
							}
							this.step = 0; // Reset step
							this.valor2 = null; // Reset secondary withdrawal value
							this.currencySelected = {}; // Reset currency selection
							this.accountSelected = {}; // Reset account selection
							this.valueWithdraw = {
								input: '',
								msg: '',
								color: '',
								validate: false,
							}; // Reset withdrawal input state
						}
					});
			} else {
				this.appComponent.modal = {
					showModal: 'notification',
					titleModal: this.$t('Error!'),
					messageModal: this.$t(
						'Ingresa todos los campos requeridos.' // Prompt to fill all required fields
					),
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
			}
			this.appComponent.disabledButtonWithdraw = false; // Enable withdrawal button
		},
		/**
		 * Changes the withdrawal type and updates related fields.
		 */
		changeType() {
			var type = this.listTypesWithdraw.filter(
				(item) => item.value == this.tipo_cuenta // Find selected withdrawal type
			);
			if (type.length > 0) {
				if (type[0].min != undefined) {
					this.minWithdraw = type[0].min; // Set minimum withdrawal amount
				}
				if (type[0].max != undefined) {
					this.maxWithdraw = type[0].max; // Set maximum withdrawal amount
				}
			}
			if (
				this.tipo_cuenta == '2' &&
				this.config.retiros.infoBanksAccounts != undefined &&
				this.config.retiros.infoBanksAccounts[
					this.appComponent.country
				] != undefined &&
				this.config.retiros.infoBanksAccounts[this.appComponent.country]
			) {
				this.showModalMessage = true; // Show message modal for bank accounts
			}
			if (this.tipo_cuenta == '2') {
				if (this.listBanks.length > 0) {
					this.cuenta_bancaria = this.listBanks[0].value; // Set default bank account
				}
			}
            if(this.tipo_cuenta == '10') {
                if (this.listCrypto.length > 0) {
                    this.cuenta_bancaria = this.listCrypto[0].value; // Set default wallet account
                }else {
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Mensaje'),
                        messageModal: this.$t('No tienes wallets activas registradas para realizar retiros. Agrega una desde tu perfil'),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            }
		},
		/**
		 * Validates input to allow only integer values.
		 * @param e - The keyboard event.
		 */
		onlyInteger(e) {
			if (this.config.retiros.onlyInteger != undefined) {
				if (this.config.retiros.onlyInteger) {
					var keynum = e.which; // Get key code
					if (
						(keynum >= 48 && keynum <= 57) ||
						(keynum >= 96 && keynum <= 105)
					)
						return true; // Allow number keys
					return /\d/.test(String.fromCharCode(keynum)); // Allow numeric input
				}
			}
		},
		/**
		 * Handles changes in the bank selection dropdown.
		 * Updates related information based on the selected bank.
		 * @param value - The event containing the selected value.
		 */
		changeSelect(value: any) {
			value = value.target.value; // Get selected value
			this.listBanks.forEach((item) => {
				if (item.value == value) {
					this.info1 = item.info1; // Update info1 based on selected bank
					if (this.info1 != '') {
						this.info1Disabled = true; // Disable info1 if not empty
					} else {
						this.info1Disabled = false; // Enable info1 if empty
					}
					Object.assign(this.arraySelects, {
						info2List: item.branches, // Update branches list for selected bank
					});
				}
			});
		},
		/**
		 * Closes the receipt display.
		 */
		closeRecibo() {
			(document.getElementById('div-recibo') as any).style.display =
				'none'; // Hide receipt display
		},
		/**
		 * Initiates the withdrawal cancellation process for the selected item.
		 * @param item - The withdrawal item to cancel.
		 */
		buttonAction(item) {
			this.withdrawCancel(item); // Call withdrawCancel with selected item
		},
		/**
		 * Fetches the list of banks available for selection.
		 */
		getBanks() {
			apiService.request('get_banks', {}).then((response: any) => {
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].value = response.data[i].Id; // Map bank ID
						response.data[i].name = response.data[i].Name; // Map bank name
					}
					this.loadingForm = true; // Show loading indicator
					Object.assign(this.arraySelects, {
						bankList: response.data, // Update bank list
					});
				}
			});
		},
		/**
		 * Handles changes in the second select dropdown for banks.
		 * Updates related information based on the selected bank.
		 * @param event - The event containing the selected value.
		 */
		changeSelect2(event: any) {
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get options key
			if (optionsKey == 'bankList') {
				Object.assign(this.arraySelects, {
					branchesList:
						this.arraySelects[optionsKey][
							this.arraySelects[optionsKey].findIndex(
								(i: { Id: string }) => i.Id === value
							)
						].branches, // Update branches list based on selected bank
				});
				this.model['branch'] = ''; // Reset branch model
				Object.assign(this.arraySelects, {
					interbankCodesList:
						this.arraySelects[optionsKey][
							this.arraySelects[optionsKey].findIndex(
								(i: { Id: string }) => i.Id === value
							)
						].interbankCodes, // Update interbank codes based on selected bank
				});
				this.model['cod_interbank'] = ''; // Reset interbank code model
				this.model['cod_interbank2'] = ''; // Reset second interbank code model
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
						], // Set account type options for specific bank
					});
					this.mergeLocaleMessage('pt', {
						'Número de cuenta': 'Chave PIX', // Localize account number label
						'Tipo de cuenta': 'Tipo de chave PIX', // Localize account type label
						'Confirmar número de cuenta': 'Confirmar chave PIX', // Localize confirm account number label
					});
				} else {
					Object.assign(this.arraySelects, {
						accountTypeList:
							this.arraySelectsOrigin['accountTypeList'], // Reset account type options to original
					});
					this.mergeLocaleMessage('pt', {
						'Número de cuenta': 'Numero de conta', // Localize account number label
						'Tipo de cuenta': 'Tipo De Conta', // Localize account type label
						'Confirmar número de cuenta':
							'Confirmar o número da conta', // Localize confirm account number label
					});
				}
			}
		},
		/**
		 * Submits the bank account information for saving.
		 * @param values - The values to be submitted.
		 */
		onSubmit(values: any) {
			values.bank != undefined
				? (values.bank = this.arraySelects['bankList'].filter(
						(x) => x.Id == values.bank
					)[0]) // Map selected bank to object
				: (values.bank = null);
			values.account_type != undefined
				? (values.account_type = this.arraySelects[
						'accountTypeList'
					].filter(
						(x) =>
							x.Id == values.account_type ||
							x.value == values.account_type
					)[0]) // Map selected account type to object
				: (values.account_type = null);
			values.client_type != undefined
				? (values.client_type = this.arraySelects[
						'clientTypeList'
					].filter((x) => x.Id == values.client_type)[0]) // Map selected client type to object
				: (values.client_type = null);
			if (values.account_type != null) {
				values.account_type.Id = values.account_type.value; // Set ID for account type
				values.account_type.Name = values.account_type.name; // Set name for account type
			}
			let params = { ...values }; // Prepare parameters for API request
			if (
				this.appComponent.config.header !== undefined &&
				this.appComponent.config.header.currencyChangeButton !==
					undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				] !== undefined &&
				this.appComponent.config.header.currencyChangeButton[
					this.appComponent.country
				]
			) {
				params = { ...params, user_id: this.currencySelected.Id }; // Add user ID for currency change
			}
			apiService
				.request('save_user_bank', params) // API request to save bank account
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Mensaje'),
							messageModal: this.$t(
								'Cuenta bancaria guardada satisfactoriamente.' // Success message for saving bank account
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
						this.getBanksAccounts(); // Refresh bank accounts list
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial)
						); // Reset model to initial state
					} else {
						var error_mensaje = '';
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Get error message based on error code
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje, // Show error message
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		/**
		 * Validates the withdrawal value input and updates the state accordingly.
		 * @param e - The event containing the input value.
		 */
		onChangeValueWithdraw(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Prompt for empty field
				e.color = 'yellow-300'; // Set color for warning
				e.validate = false; // Set validation state to false
			} else if (e.input < this.appComponent.config.retiros.MinWithdrawBank ) {
				e.msg = this.$t('El valor no supera el minimo permitido'); // Prompt for minimum value
				e.color = 'red-600'; // Set color for error
				e.validate = false; // Set validation state to false
			} else {
				e.msg = ''; // Clear message
				e.color = 'green-600'; // Set color for success
				e.validate = true; // Set validation state to true
			}
			this.disabledButtonWithdraw2 = !this.valueWithdraw.validate; // Enable/disable button based on validation
		},
		/**
		 * Handles the view change for withdrawals and updates the state accordingly.
		 */
		handleChangeWithdrawalsView() {
			if (this.newView) {
				window.localStorage.setItem('newView', 'false'); // Update local storage for view state
				this.appComponent.gAnalytics('withdrawal_old', 'new'); // Track view change
				setTimeout(() => {
					if (
						!this.newView ||
						this.appComponent.config.withdrawalsView == undefined ||
						this.appComponent.config.withdrawalsView[
							this.appComponent.country
						] == undefined ||
						this.appComponent.config.withdrawalsView[
							this.appComponent.country
						].on == undefined ||
						!this.appComponent.config.withdrawalsView[
							this.appComponent.country
						].on
					) {
						if (
							this.appComponent.config.header == undefined ||
							this.appComponent.config.header
								.currencyChangeButton == undefined ||
							this.appComponent.config.header
								.currencyChangeButton[
								this.appComponent.country
							] == undefined ||
							!this.appComponent.config.header
								.currencyChangeButton[this.appComponent.country]
						) {
							this.listTypesWithdraw = []; // Clear withdrawal types
							this.getBanksAccounts(); // Fetch bank accounts
							this.getTypesWithdraw(); // Fetch withdrawal types
						}
						if (
							this.config.retiros != undefined &&
							this.config.retiros.productWithdraw != undefined &&
							this.config.retiros.productWithdraw[
								this.appComponent.country
							]
						) {
							this.listProductsWithdraw = []; // Clear product withdrawals
							this.getProductWithdraw(); // Fetch product withdrawals
						}
						if (
							this.config != undefined &&
							this.config.retiros != undefined &&
							this.config.retiros.tableColumns != undefined &&
							this.config.retiros.tableColumns[
								this.appComponent.country
							] != undefined
						) {
							this.tableColumns =
								this.config.retiros.tableColumns[
									this.appComponent.country
								]; // Set table columns based on configuration
						}
						if (
							this.config != undefined &&
							this.config.cuentasBancaria != undefined &&
							this.config.cuentasBancaria[
								this.appComponent.country
							] != undefined &&
							this.config.cuentasBancaria[
								this.appComponent.country
							].textCuentasBancaria1 != undefined
						) {
							this.textDownForm =
								this.config.cuentasBancaria[
									this.appComponent.country
								].textCuentasBancaria1; // Set text for bank accounts
						}
						if (
							this.appComponent.config.header !== undefined &&
							this.appComponent.config.header
								.currencyChangeButton !== undefined &&
							this.appComponent.config.header
								.currencyChangeButton[
								this.appComponent.country
							] !== undefined &&
							this.appComponent.config.header
								.currencyChangeButton[this.appComponent.country]
						) {
							apiService
								.request('user_currency', {}) // Fetch user currency
								.then((response: any) => {
									if (
										response.code === 0 &&
										response.data.length > 0
									) {
										this.currenciesList = response.data; // Update currency list
										this.loadingSpin = false; // Hide loading indicator
									} else {
										var error_mensaje = '';
										error_mensaje = this.$t(
											'ERROR' +
												response.error_code.toString() // Get error message based on error code
										);
										if (error_mensaje == '') {
											error_mensaje = this.$t(
												'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
											);
										}
										this.appComponent.modal = {
											showModal: 'notification',
											titleModal: this.$t('Error!'),
											messageModal: error_mensaje, // Show error message
											buttonModal: this.$t('Aceptar'),
											orderModal: 'closeModal',
										};
									}
								});
						}
						this.fields.forEach((field) => {
							if (
								field.type == 'select' &&
								field.options != undefined &&
								field.options.length > 0
							) {
								field.options.forEach((opt) => {
									opt.Id = opt.value; // Set ID for options
									opt.Name = opt.name; // Set name for options
								});
								let options: object = {};
								options[field.optionsKey] = field.options; // Assign options to arraySelects
								Object.assign(this.arraySelects, options);
							}
						});
						this.widthForm =
							this.config != undefined &&
							this.config.cuentasBancaria != undefined &&
							this.config.cuentasBancaria[
								this.appComponent.country
							] != undefined &&
							this.config.cuentasBancaria[
								this.appComponent.country
							].widthF != undefined
								? this.config.cuentasBancaria[
										this.appComponent.country
									].widthF
								: false; // Set form width based on configuration
						this.model.name = this.appComponent.session.nombre; // Set user name
						this.model.docnumber = this.appComponent.session.cedula; // Set user document number
						this.model.client_type = '0'; // Set default client type
						this.modelInitial = JSON.parse(
							JSON.stringify(this.model)
						); // Reset model to initial state
						this.arraySelectsOrigin = JSON.parse(
							JSON.stringify(this.arraySelects)
						); // Store original arraySelects
					}
				}, 1000); // Delay for view change
			} else {
				window.localStorage.setItem('newView', 'true'); // Update local storage for view state
				this.appComponent.gAnalytics('withdrawal_new', 'new'); // Track view change
			}
		},
		shadowWithdrawals(element, withdraw) {
			if(!element) return; // Check if element exists

			if (!element.shadowRoot) {
				const shadow = element.attachShadow({ mode: 'open' }); // Attach shadow root if not present
				shadow.innerHTML = withdraw; // Set inner HTML for shadow root
			} else {
				element.shadowRoot.innerHTML = withdraw; // Update inner HTML for existing shadow root
			}
		},

        selectBank(name) {
            this.digitalsView = false
            this.otherView = true
            this.dataOtherView.nameP = name.bank_name
            this.dataOtherView.id = name.userbank_id
        },
        selectAccount(account) {
            this.idAccountSelect = account.userbank_id; // Set selected account ID
            this.disabledButtonDigital = false
            this.accountSelected = account;
        }
	},
});
</script>
<template>
	    <PopUpAction
    v-if="currentModal"
    :modal="currentModal"
  @close="currentModal = null"
/>

	<!-- Header section with gradient background, visible if layout is not equal to 3 -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Header section with gradient background, visible if layout is equal to 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
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
				<!-- Container for the active page title -->
				<div
					class="Container ActivePageTitle"
					:class="
						/* Conditional class based on layout configuration */
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary  w-full mx-auto flex justify-between items-center'
							: 'ActivePageTitle2'
					"
				>
					<!-- Main title span element -->
					<span class="h1">
						<!-- Title text with conditional class based on layout configuration -->
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Crear nota de retiro') }}</span
						>
					</span>
					<!-- Conditional form control for switching views -->
					<div
						v-if="
							appComponent.config.withdrawalsView != undefined &&
							appComponent.config.withdrawalsView[
								appComponent.country
							] != undefined &&
							appComponent.config.withdrawalsView[
								appComponent.country
							].switch !== undefined &&
							appComponent.config.withdrawalsView[
								appComponent.country
							].switch &&
							appComponent.config.withdrawalsView[
								appComponent.country
							].on !== undefined &&
							appComponent.config.withdrawalsView[
								appComponent.country
							].on
						"
						class="form-control"
					>
						<!-- Label for the view switch -->
						<label class="label cursor-pointer">
							<!-- Label text with an image -->
							<span
								class="label-text relative text-neutral text-sm font-bold w-14 leading-4"
								>{{ $t('Nueva visual')
								}}<img
									src="https://images.virtualsoft.tech/m/msj0212T1709899057.png"
									alt=""
									class="absolute -top-1 right-1"
							/></span>
							<!-- Switch control for toggling views -->
							<label
								class="swap text-9xl flex justify-center items-center relative transition-all duration-700 ease-in-out cursor-pointer scale-110"
							>
								<img
									src="https://images.virtualsoft.tech/m/msj0212T1709901670.png"
									alt=""
								/>
								<!-- Hidden checkbox for the switch -->
								<input
									type="checkbox"
									class="hidden"
									v-model="newView"
									@click="handleChangeWithdrawalsView()"
									data-analytics-label="deposit:toggle-visual"
									:data-analytics-context="`component:Withdraw|layout:${newView ? 'new' : 'old'}`"
								/>
								<!-- Images for the switch states -->
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
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'cuenta_cobro'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'cuenta_cobro'"
						:MENU_ID="'3'"
					/>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div
							v-if="
								(!newView ||
									appComponent.config.withdrawalsView ==
										undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									] == undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									].on == undefined ||
									!appComponent.config.withdrawalsView[
										appComponent.country
									].on) &&
								appComponent.config.header !== undefined &&
								appComponent.config.header
									.currencyChangeButton !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								] !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								] &&
								loadingSpin
							"
							class="flex w-full h-60 items-center shadow-lg"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-300 rounded-b-3xl'
									: 'bg-neutral rounded-3xl'
							"
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
								</svg>
							</div>
							<div class="flex-1"></div>
						</div>
						<section
							v-if="
								(!newView ||
									appComponent.config.withdrawalsView ==
										undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									] == undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									].on == undefined ||
									!appComponent.config.withdrawalsView[
										appComponent.country
									].on) &&
								appComponent.config.header !== undefined &&
								appComponent.config.header
									.currencyChangeButton !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								] !== undefined &&
								appComponent.config.header.currencyChangeButton[
									appComponent.country
								] &&
								!loadingSpin
							"
							class=""
						>
							<div
								class="w-full flex flex-col justify-center items-center gap-2 text-neutral-content mb-2"
							>
								<div
									class="w-full bg-base-300 rounded-lg py-2 px-4"
								>
									<div
										class="w-full h-14 flex justify-between items-center"
									>
										<h3
											class="w-full text-2xl font-bold text-neutral text-start"
										>
											{{
												'1. ' +
												$t('Selecciona la moneda')
											}}
										</h3>
										<font-awesome-icon
											v-if="!onWithdraw"
											icon="fa-solid fa-chevron-up"
											size="1x"
											class="text-neutral"
										/>
										<font-awesome-icon
											v-else
											icon="fa-solid fa-chevron-down"
											size="1x"
											class="text-neutral"
										/>
									</div>
									<div
										v-if="!onWithdraw"
										class="gridList w-full"
									>
										<div
											v-for="(
												currency, index
											) in currenciesList"
											:key="index"
										>
											<div
												class="in w-full h-52 flex flex-col justify-between items-center p-4 bg-base-300 rounded-lg shadow-lg text-neutral-content border border-accent"
											>
												<div
													class="w-full flex flex-col justify-center items-start gap-2"
												>
													<p
														class="font-bold text-2xl text-neutral"
													>
														{{ currency.Currency }}
													</p>
													<p
														class="text-xl text-neutral"
													>
														$
														{{
															parseFloat(
																currency.WithdrawalCredits
															).toFixed(2)
														}}
													</p>
												</div>
												<button
													@click="
														currencySelected =
															currency;
														onWithdraw = true;
														getBanksAccounts();
														step = 1;
														valueWithdraw = {
															input: '',
															msg: '',
															color: '',
															validate: false,
														};
													"
													class="btn w-full btn-secondary hover:bg-secondary-focus text-neutral"
													:data-analytics-label="'withdrawal:open'"
													:data-analytics-position="String(index + 1)"
													:data-analytics-context="`step:select-currency|step-num:0|currency:${currency.Currency}`"
												>
													{{ $t('Retira') }}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="w-full flex flex-col justify-center items-center gap-2 text-neutral-content"
							>
								<div
									class="w-full h-auto bg-base-300 rounded-lg py-2 px-4"
								>
									<div
										class="w-full h-14 flex justify-between items-center"
									>
										<h3
											class="w-full text-2xl font-bold text-neutral text-start"
										>
											{{
												'2. ' +
												$t(
													'Selecciona método de retiro'
												)
											}}
										</h3>
										<font-awesome-icon
											v-if="step == 1"
											icon="fa-solid fa-chevron-up"
											size="1x"
											class="text-neutral"
										/>
										<font-awesome-icon
											v-else
											icon="fa-solid fa-chevron-down"
											size="1x"
											class="text-neutral"
										/>
									</div>
									<div v-if="step == 1 && !digitalsView && !otherView" class="gridList">
										<button
											v-if="
												!listBanksView &&
												appComponent.config.retiros.retiroLocal[appComponent.country] != undefined &&
												appComponent.config.retiros.retiroLocal != undefined &&
												appComponent.config.retiros.retiroLocal[appComponent.country]
											"
											@click="
												step = 2;
												tipo_cuenta = '1';
												accountSelected = {};
												valueWithdraw = {
													input: '',
													msg: '',
													color: '',
													validate: false,
												};
											"
											class="in w-full flex justify-between items-center flex-col bg-base-300 hover:bg-base-200 rounded-lg p-4 text-lg text-neutral cursor-pointer border border-accent"
											data-analytics-label="withdrawal:method:local"
											data-analytics-position="1"
											data-analytics-context="step:select-method|step-num:1|method:local"
										>
											<div
												class="flex flex-col justify-center items-center gap-4 h-full"
											>
												<img
													src="https://images.virtualsoft.tech/m/msj0212T1706880334.png"
													class="w-20 h-20"
													alt=""
												/>
												<p class="font-bold">
													{{
														$t(
															appComponent.config
																.retiros
																.textRetiro1
														)
													}}
												</p>
											</div>
											<span
												class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-white rounded-lg"
											>
												{{ $t('Seleccionar') }}
											</span>
										</button>
										<div
											v-if="
												!listBanksView && (
												appComponent.config.retiros.retiroLocal == undefined ||
												appComponent.config.retiros.retiroLocal[appComponent.country] == undefined ||
												appComponent.config.retiros.retiroLocal[appComponent.country] == false)
											"
											class="in w-full flex justify-between items-center flex-col bg-base-300 hover:bg-base-200 border border-accent rounded-lg p-4 text-lg text-neutral cursor-pointer"
										>
											<div
												class="flex flex-col justify-center items-center gap-4 h-full"
											>
												<img
													src="https://images.virtualsoft.tech/m/msj0212T1707338708.png"
													class="w-20 h-20"
													alt=""
												/>
												<p class="font-bold">
													{{
														$t(
															appComponent.config
																.retiros
																.textRetiro1
														)
													}}
												</p>
											</div>
											<button
												disabled
												class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-white rounded-lg text-xs"
											>
												{{
													$t(
														'Este metodo aun no se encuentra habilitado'
													)
												}}
											</button>
										</div>
										<div
											v-if="!listBanksView"
											@click="
												listBanksView = true;
												tipo_cuenta = '2';
												valueWithdraw = {
													input: '',
													msg: '',
													color: '',
													validate: false,
												};
											"
											class="in w-full flex justify-between items-center flex-col bg-base-300 hover:bg-base-200 rounded-lg p-4 text-lg text-neutral cursor-pointer border border-accent"
											data-analytics-label="withdrawal:method:bank-transfer"
											data-analytics-position="2"
											data-analytics-context="step:select-method|step-num:1|method:bank-transfer"
										>
											<div
												class="flex flex-col justify-center items-center gap-4 h-full"
											>
												<img
													src="https://images.virtualsoft.tech/m/msj0212T1706880290.png"
													class="w-20 h-20"
													alt=""
												/>
												<p class="font-bold">
													{{
														$t(
															appComponent.config
																.retiros
																.textRetiro2
														)
													}}
												</p>
											</div>
											<button
												class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-white rounded-lg"
											>
												{{ $t('Seleccionar') }}
											</button>
										</div>

										<div
											v-if="
												listBanks.length > 0 &&
												listBanksView
											"
											v-for="(method, index) in listBanks"
											class="in w-full bg-base-300 hover:bg-base-200 border border-accent rounded-lg p-4 flex flex-col justify-between items-center"
										>
											<div
												class="w-full flex flex-col justify-center items-start text-neutral"
											>
												<p
													class="text-lg font-bold"
												>
													{{ method.bank_name }}
												</p>
												<p>{{ method.account }}</p>
												<p>{{ method.account_type }}</p>
												<p>{{ method.coin }}</p>
											</div>
											<button
												@click="
													accountSelected = method;
													step = 2;
													valueWithdraw = {
														input: '',
														msg: '',
														color: '',
														validate: false,
													};
												"
												class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-white rounded-lg"
												data-analytics-label="withdrawal:method:bank-transfer"
												:data-analytics-position="String(index + 1)"
												:data-analytics-context="`step:select-method|step-num:1|method:bank-transfer|bank:${method.bank_name}`"
											>
												{{ $t('Seleccionar') }}
											</button>
										</div>
										<div
											v-if="listBanksView"
											@click="
												getBanks();
												getTypesWithdraw();
												onAddAcount = true;
											"
											class="in w-full flex justify-between items-center flex-col bg-base-300 hover:bg-base-200 border border-accent rounded-lg p-4 text-lg text-neutral cursor-pointer"
										>
											<div
												class="flex flex-col justify-center items-center gap-4 h-full"
											>
												<font-awesome-icon
													icon="fa-solid fa-plus"
													size="3x"
													class="font-bold"
												/>
												<p class="font-bold">
													{{
														$t(
															'Agregar mas cuentas'
														)
													}}
												</p>
											</div>
											<button
												class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-white rounded-lg"
											>
												{{ $t('Agregar') }}
											</button>
										</div>
                                        <div
                                            v-if="!listBanksView && appComponent.config != undefined && appComponent.config.digitalsAccountWithdraw != undefined && appComponent.config.digitalsAccountWithdraw"
                                            class="in w-full flex justify-between items-center flex-col bg-base-300 hover:bg-base-200 rounded-lg p-4 text-lg text-neutral cursor-pointer border border-accent"
                                            data-analytics-label="withdrawal:method:bank-transfer"
                                            data-analytics-position="3"
                                            data-analytics-context="step:select-method|step-num:1|method:bank-transfer|subtype:digital"
                                        >
                                            <img
                                                src="https://images.virtualsoft.tech/m/msj0212T1764791478.png"
                                                class="w-20 h-20"
												alt=""
                                            />
                                            <h2 class="text-neutral font-bold">{{ $t('Cuentas digitales') }}</h2>
                                            <button
                                                @click="
                                                digitalsView = true;
												tipo_cuenta = '2';
												valueWithdraw = {
													input: '',
													msg: '',
													color: '',
													validate: false,
												};"
                                                class="btn btn-success w-full h-12 hover:bg-success/50 text-white rounded-lg"
                                            >
                                                {{ $t('Seleccionar') }}
                                            </button>
                                        </div>
									</div>
									<div
										v-if="step == 1 && !digitalsView && !otherView"
										class="w-full flex justify-end items-center mt-2"
									>
										<button
											@click="onBack()"
											class="btn btn-secondary hover:bg-secondary-focus text-neutral-content"
											data-analytics-label="withdrawal:back"
											:data-analytics-context="`step:select-method|step-num:1`"
										>
											{{ $t('Atras') }}
										</button>
									</div>

                                    <div
                                        v-if="step == 1 && digitalsView && !otherView"
                                        class="w-full justify-between items-baseline flex-col h-auto bg-base-300 flex gap-4 rounded-xl"
                                    >
                                        <div
                                            class="w-full flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                                        >
                                            <div
                                                v-for="(
                                                    dBank, index
                                                ) in listDigitalbanks"
                                                :key="index"
                                                class="w-64 h-72 border-1 border-accent bg-base-300 rounded-xl flex flex-col hover:bg-base-100 cursor-pointer"
                                                @click="
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
                                                            dBank.bank_name == 'Paypal'
                                                                ? $t('1 Cuenta registrada')
                                                                : dBank.bank_name == 'Zelle' && numAccountZelle == 1
                                                                ? $t('1 Cuentas registradas')
                                                                : dBank.bank_name == 'Zelle' && numAccountZelle > 1
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
                                                        {{$t(dBank.bank_name)}}
                                                    </p>
                                                    <div
                                                        class="w-24 h-24 text-accent-focus"
                                                        v-html="
                                                            dBank.bank_name == 'Zelle'
                                                            ? zelleSVG
                                                            : dBank.bank_name == 'Paypal'
                                                            ? paypalSVG
                                                            : ''
                                                        "
                                                    />
                                                    <p
                                                        class="font-poppinsls text-neutral text-center text-[12px] leading-loose"
                                                    >
                                                        {{
                                                            dBank.bank_name == 'Zelle'
                                                                ? $t('Permite enviar dinero rápido entre bancos en EE.UU.')
                                                                : dBank.bank_name == 'Paypal'
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
                                                            selectBank(dBank)
                                                        "
                                                        class="w-11/12 h-full bg-success leading-loose text-neutral rounded-lg font-poppinsm text-sm hover:bg-success-focus transition duration-300 flex justify-center items-center "
                                                    >
                                                        {{$t('Selecionar')}}
                                                    </button>
                                                </section>
                                            </div>
                                        </div>
                                        <button
                                            @click="
                                                digitalsView = false;
                                            "
                                            class="w-fit ml-auto p-4 btn btn-secondary hover:bg-secondary-focus text-neutral-content"
                                            data-analytics-label="withdrawal:back"
                                            data-analytics-context="step:digitals|step-num:1"
                                        >
                                            {{ $t('Atras') }}
                                        </button>
                                    </div>
                                    <div
                                        v-if="step == 1 && !digitalsView && otherView"
                                        class="w-full bg-base-300 h-auto flex flex-col justify-between items-baseline gap-2 rounded-xl"
                                    >
                                        <div
                                            class="w-full flex flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                                        >
                                            <div
                                                class="w-64 h-48 bg-base-300 border-1 border-accent rounded-xl flex flex-col"
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
                                                <span class="text-[12px] text-neutral font-poppinsls text-center md:text-start">
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
                                                        (account, index) in arraySelectsD[
                                                                    dataOtherView.nameP == 'Paypal'
                                                                    ? 'accountPaypal'
                                                                    : dataOtherView.nameP == 'Zelle'
                                                                    ? 'accountZelle'
                                                                    : ''
                                                                ]
                                                   "
                                                    :key="index"
                                                    class="input border-1 border-input-border bg-input-background  placeholder:text-input-placeholder h-12 w-[95%] rounded-xl  hover:text-neutral flex items-center hover:bg-accent justify-between cursor-pointer"
                                                    :class="idAccountSelect == account.userbank_id ? 'bg-accent text-neutral' : 'bg-base-200 text-neutral'"
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
                                                    digitalsView = true;
                                                    accountSelected = {};
                                                    idAccountSelect = '';
                                                "
                                                class="btn-secondary hover:bg-secondary-focus text-neutral w-24 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                                data-analytics-label="withdrawal:back"
                                                data-analytics-context="step:other|step-num:1"
                                            >
                                                {{$t('Atrás')}}
                                            </button>
                                            <button
                                                :disabled="
                                                    disabledButtonDigital
                                                "
                                                class="bg-accent hover:bg-accent/70 text-neutral w-44 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                                @click="
                                                    step = 2
                                                "
                                            >
                                                {{$t('Siguiente')}}
                                            </button>
                                        </div>
                                    </div>
								</div>
								<div
									class="w-full bg-base-300 rounded-lg py-2 px-4"
								>
									<div
										class="w-full h-14 flex justify-between items-center"
									>
										<h3
											class="w-full text-2xl font-bold text-neutral text-start"
										>
											{{
												'3. ' + $t('Ingrese los datos')
											}}
										</h3>
										<font-awesome-icon
											v-if="step == 2"
											icon="fa-solid fa-chevron-up"
											size="1x"
											class="text-neutral"
										/>
										<font-awesome-icon
											v-else
											icon="fa-solid fa-chevron-down"
											size="1x"
											class="text-neutral"
										/>
									</div>
									<div
										v-if="step == 2"
										class="flex flex-col sm:flex-row gap-4"
									>
										<div
											class="h-full min-w-[260px] flex flex-col justify-center items-center gap-4 bg-base-300 border border-accent rounded-lg p-4 shadow shadow-neutral-content/25"
										>
											<img
												v-if="tipo_cuenta == '1'"
												src="https://images.virtualsoft.tech/m/msj0212T1706880334.png"
												class="w-20 h-20"
												alt=""
											/>
                                            <img
                                                v-else-if="idAccountSelect != ''"
                                                src="https://images.virtualsoft.tech/m/msj0212T1764791478.png"
                                                class="w-20 h-20"
                                                alt=""
                                            />
											<img
												v-else
												src="https://images.virtualsoft.tech/m/msj0212T1706880290.png"
												class="w-20 h-20"
												alt=""
											/>
											<p
												v-if="tipo_cuenta == '1'"
												class="font-bold text-neutral"
											>
												{{
													$t(
														appComponent.config
															.retiros.textRetiro1
													)
												}}
											</p>
                                            <p
                                                v-else-if="idAccountSelect != ''"
                                                class="font-bold text-neutral"
                                            >
                                                {{
                                                    $t(
                                                       'Cuentas Digitales'
                                                    )
                                                }}
                                            </p>
											<p
												v-else
												class="font-bold text-neutral"
											>
												{{
													$t(
														appComponent.config
															.retiros.textRetiro2
													)
												}}
											</p>
										</div>
										<div class="w-full flex flex-col gap-2">
											<div
												class="form-control w-full items-start"
											>
												<label class="label p-0">
													<span
														class="label-text text-neutral text-lg"
														>{{
															$t(
																'Ingrese la cantidad que desea retirar'
															)
														}}</span
													>
												</label>
												<input
													@keyup="
														onChangeValueWithdraw(
															valueWithdraw
														)
													"
													v-model="
														valueWithdraw.input
													"
													type="number"
													:placeholder="
														'$ ' +
														currencySelected.Currency
													"
													class="input input-bordered w-full text-neutral bg-input-background placeholder:text-input-placeholder shadow shadow-neutral-content/25"
													data-analytics-label="withdrawal:amount-input"
													:data-analytics-context="`step:enter-amount|step-num:2|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
												/>
												<label
													class="label items-start"
												>
													<div
														class="flex flex-col justify-center items-start"
													>
														<span
															class="label-text-alt text-neutral"
															>{{
																'- ' +
																$t(
																	appComponent
																		.config
																		.retiros
																		.textRetiro3,
																	{
																		min:
																			tipo_cuenta ==
																			'1'
																				? appComponent
																						.config
																						.retiros
																						.MinWithdraw
																				: appComponent
																						.config
																						.retiros
																						.MinWithdrawBank,
																		currency:
																			currencySelected.Currency,
																	}
																)
															}}</span
														>
														<span
															class="label-text-alt text-neutral"
															>{{
																'+ ' +
																$t(
																	appComponent
																		.config
																		.retiros
																		.textRetiro4,
																	{
																		max:
																			tipo_cuenta ==
																			'1'
																				? appComponent
																						.config
																						.retiros
																						.MaxWithdraw
																				: appComponent
																						.config
																						.retiros
																						.MaxWithdrawBankAccount,
																		currency:
																			currencySelected.Currency,
																	}
																)
															}}</span
														>
													</div>
													<span
														v-if="
															valueWithdraw.msg !=
															''
														"
														class="label-text-alt"
														:class="
															'text-' +
															valueWithdraw.color
														"
														>{{
															valueWithdraw.msg
														}}</span
													>
												</label>
											</div>
											<div
												class="w-full flex justify-end items-center gap-4 mt-2"
											>
												<button
													@click="step = 1"
													class="btn btn-secondary hover:bg-secondary-focus text-neutral-content"
												>
													{{ $t('Atras') }}
												</button>
												<button
													:disabled="
														disabledButtonWithdraw2
													"
													@click="step = 3"
													class="btn btn-accent hover:bg-accent text-neutral"
												>
													{{ $t('Siguiente') }}
												</button>
											</div>
										</div>
									</div>
								</div>
								<div
									class="w-full bg-base-300 rounded-lg py-2 px-4"
								>
									<div
										class="w-full h-14 flex justify-between items-center"
									>
										<h3
											class="w-full text-2xl font-bold text-neutral text-start"
										>
											{{
												'4. ' +
												$t('Verifica la operación')
											}}
										</h3>
										<font-awesome-icon
											v-if="step == 3"
											icon="fa-solid fa-chevron-up"
											size="1x"
											class="text-neutral"
										/>
										<font-awesome-icon
											v-else
											icon="fa-solid fa-chevron-down"
											size="1x"
											class="text-neutral"
										/>
									</div>
									<div
										v-if="step == 3"
										class="flex flex-col gap-5"
									>
										<div class="text-lg text-neutral">
											<p class="">
												{{
													$t('Usuario: ') +
													appComponent.session.nombre.toUpperCase()
												}}
											</p>
											<p
												v-if="accountSelected.bank_name"
												class=""
											>
												{{
													$t('Banco: ') +
													accountSelected.bank_name
												}}
											</p>
											<p v-else class="">
												{{ $t('Tipo: Local Camanbet') }}
											</p>
											<p class="">
												{{
													$t('Moneda: ') +
													currencySelected.Currency
												}}
											</p>
											<p class="">
												{{
													$t('Monto: ') +
													'$ ' +
													valueWithdraw.input
												}}
											</p>
											<p class="">
												{{
													$t('Fecha: ') +
													new Date().toLocaleDateString()
												}}
											</p>
										</div>
										<div
											class="flex justify-end items-center gap-4 mt-2"
										>
											<button
												@click="step = 2"
												class="btn btn-secondary hover:bg-secondary-focus text-neutral-content"
											>
												{{ $t('Atras') }}
											</button>
											<button
                                                :disabled="
                                                    disableButtonWithdraw
                                                "
												@click="
												    disableButtonWithdraw = true;
												    withdrawAccept()
                                                "
												class="btn btn-accent hover:bg-accent text-neutral"
												data-analytics-label="withdrawal:confirm"
												:data-analytics-context="`step:confirm|step-num:3|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
											>
												{{ $t('Retirar') }}
											</button>
										</div>
									</div>
								</div>
							</div>
						</section>
						<div
							v-if="
								(!newView ||
									appComponent.config.withdrawalsView ==
										undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									] == undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									].on == undefined ||
									!appComponent.config.withdrawalsView[
										appComponent.country
									].on) &&
								(appComponent.config.header == undefined ||
									appComponent.config.header
										.currencyChangeButton == undefined ||
									appComponent.config.header
										.currencyChangeButton[
										appComponent.country
									] == undefined ||
									!appComponent.config.header
										.currencyChangeButton[
										appComponent.country
									])
							"
							class="Container InfoContent mb-5"
						>
							<div
								v-if="appComponent.session.formSplaft == 'S'"
								class="GeneralForm WithdrawForm WithdrawAmount Retirar shadow-md"
							>
								<div
									class="table-grid p-5 rounded-xl shadow-md btn-base-300 bg-base-400"
									style="text-align: center"
								>
									<div
										:class="
											config.layout != undefined &&
											config.layout == 3
												? 'text-neutral'
												: 'text-neutral-content'
										"
									>
										{{
											$t(
												'Estimado Usuario para realizar su retiro es necesario actualizar el formulario de SPLAFT.'
											)
										}}
									</div>
									<label
										@click="
											appComponent.modal.showModal =
												'splaft'
										"
										class="btn btn-xs btn-base-300"
										:class="
											config.layout != undefined &&
											config.layout == 3
												? 'text-neutral'
												: 'text-neutral-content'
										"
										>{{
											$t('Actualizar Formulario SPLAFT')
										}}</label
									>
								</div>
							</div>
							<div
								v-if="appComponent.session.formSplaft != 'S'"
								id="formWithdrawAmount"
								class="GeneralForm WithdrawForm WithdrawAmount Retirar shadow-md bg-base-400"
								novalidate="novalidate"
								:class="
									config.layout != undefined &&
									config.layout == 3
										? 'rounded-b-xl'
										: 'rounded-xl'
								"
							>
								<ul class="AmountFields">
									<li
										class="FormItem fldCurrency pb-3"
										id="fldCurrency"
									>
										<label
											class="FormLabel div-inline-block pr-3 text-neutral"
											for="selectCurrency"
											>{{ $t('Tipo de moneda') }}</label
										>
										<label
											class="page-moneda div-inline-block rounded-lg bg-input-background border-input-border border-1 text-neutral"
											>{{
												appComponent.session.moneda
											}}</label
										>
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
									>
										<div class="AmountBox">
											<label
												class="FormLabel div-inline-block pr-3 text-neutral"
												for="valor"
												>{{
													$t('Tipo de retiro:')
												}}</label
											>
											<div
												class="AmountContainer block md:inline-block"
											>
												<select
													id="tipo_cuenta"
													v-model="tipo_cuenta"
													@change="changeType()"
													class="select select-bordered w-full bg-input-background border-input-border border-1 text-neutral"
													data-analytics-label="withdrawal:method:bank-transfer"
													data-analytics-position="1"
													data-analytics-context="step:select-method|step-num:1|method:bank-transfer"
												>
													<option value="">
														{{
															$t(
																'Escoja el tipo de retiro'
															)
														}}
													</option>
													<option
														v-if="
															config.retiros
																.retiroLocal ==
																undefined ||
															config.retiros
																.retiroLocal[
																appComponent
																	.country
															] == undefined ||
															config.retiros
																.retiroLocal[
																appComponent
																	.country
															]
														"
														value="1"
													>
														{{
															$t(
																'Local Doradobet'
															)
														}}
													</option>
													<option
														v-if="
															config.retiros
																.retiroAcountBank ==
																undefined ||
															config.retiros
																.retiroAcountBank[
																appComponent
																	.country
															] == undefined ||
															config.retiros
																.retiroAcountBank[
																appComponent
																	.country
															]
														"
														value="2"
													>
														{{
															$t(
																'Cuenta Bancaria'
															)
														}}
													</option>
													<option
														v-if="
															appComponent.config.creditCard !== undefined &&
															appComponent.config.creditCard[appComponent.country] != undefined &&
															appComponent.config.creditCard[appComponent.country].withdrawActivate !== undefined
														"
														value="4"
													>
														{{ $t('Tarjeta de credito') }}
													</option>
													<option
														v-if="
															appComponent.config != undefined && appComponent.config.retiros != undefined &&
                    										config.retiros.walletCrypto != undefined && config.retiros.walletCrypto[appComponent.country] != undefined &&
                    										config.retiros.walletCrypto[appComponent.country]
														"
														value="10"
													>
														{{
															$t(
																'Criptomonedas'
															)
														}}
													</option>
													<option
														v-for="item in listTypesWithdraw"
														:value="item.value"
													>
														{{ $t(item.name) }}
													</option>
												</select>
											</div>
										</div>
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
										v-if="tipo_cuenta == 2"
									>
										<div
											v-if="
												(appComponent.session
													.verifcedula_ant == 'S' &&
													appComponent.session
														.verifcedula_post ==
														'S') ||
												(appComponent.session
													.verifcedula_ant_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_post ==
														'S') ||
												(appComponent.session
													.verifcedula_post_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_ant ==
														'S') ||
												(appComponent.session
													.verifcedula_ant_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_post_paprob ==
														'S') ||
												config.retiros.paisesNoRequiereDNI.indexOf(
													appComponent.session.pais_id
												) !== -1
											"
										>
											<div class="AmountBox">
												<label
													class="FormLabel div-inline-block pr-3 text-neutral"
													for="valor"
													>{{
														$t('Cuenta bancaria:')
													}}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<select
														id="cuenta_bancaria"
														v-model="
															cuenta_bancaria
														"
														@change="
															changeSelect($event)
														"
														class="select select-bordered w-full bg-input-background border-input-border border-1 text-neutral"
													>
														<option
															v-for="item in listBanks"
															:value="item.value"
														>
															{{ $t(item.name) }}
														</option>
													</select>
												</div>
											</div>
											<div
												class="AmountBox"
												v-if="
													appComponent.session
														.pais_id == '113'
												"
											>
												<br />
												<label
													class="FormLabel div-inline-block text-neutral"
													for="valor"
													>{{ $t('Nombre Usuario:') }}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<input
														class="FormInput input input-bordered w-full text-neutral placeholder:text-input-placeholder bg-input-background"
														type="text"
														id="userName"
														name="userName"
														:value="
															appComponent.session
																.nombre
														"
														:disabled="true"
													/>
												</div>
											</div>
											<div
												v-for="item in config.retiros
													.infoExtra"
											>
												<br
													v-if="
														(config.retiros
															.infoExtra !=
															undefined &&
															config.retiros
																.infoExtra
																.length > 0 &&
															item.validSessionEmpty &&
															(appComponent
																.session[
																item.name
															] == '' ||
																appComponent
																	.session[
																	item.name
																] ==
																	undefined ||
																appComponent
																	.session[
																	item.name
																] == null)) ||
														item.validSessionEmpty ==
															undefined ||
														item.validSessionEmpty ==
															false
													"
												/>
												<div
													class="AmountBox"
													v-if="item.type == 'text'"
												>
													<label
														class="FormLabel div-inline-block text-neutral"
														for="valor"
														>{{
															$t(item.title)
														}}</label
													>
													<div
														class="AmountContainer block md:inline-block"
													>
														<input
															class="FormInput input input-bordered w-full text-neutral placeholder:text-input-placeholder bg-input-background"
															:type="item.type"
															:id="item.name"
															:name="item.name"
															v-if="
																item.name !=
																'info1'
															"
															:placeholder="
																$t(
																	item.placeholder
																)
															"
															:disabled="
																item.disabled
															"
															autocomplete="new-password"
															required
														/>
														<input
															class="FormInput bg-input-background text-neutral placeholder:text-input-placeholder input input-bordered w-full"
															:type="item.type"
															:id="item.name"
															:name="item.name"
															v-if="
																item.name ==
																'info1'
															"
															:placeholder="
																$t(
																	item.placeholder
																)
															"
															:maxlength="item.maxLength"
															:disabled="
																info1Disabled
															"
															autocomplete="new-password 2"
															required
                                                            v-model="info1"
														/>
													</div>
												</div>
											</div>
										</div>
										<div
											v-if="
												appComponent.session
													.verifcedula_ant != 'S' &&
												appComponent.session
													.verifcedula_post != 'S' &&
												config.retiros.paisesNoRequiereDNI.indexOf(
													appComponent.session.pais_id
												) == -1 && !appComponent.session.doc_expired
											"
										>
											<div
												class="bg-base-100 text-neutral p-6"
											>
												<div>
													<b
														><span>{{
															$t(
																'Para realizar un retiros es necesario.'
															)
														}}</span>
														<RouterLink
															id="accion_verificarcuenta"
															class="Button"
															:to="'/gestion/verificar_cuenta'"
															><span>{{
																$t(
																	'¡Verificar Cuenta!'
																)
															}}</span></RouterLink
														>
													</b>
												</div>
											</div>
										</div>
										<div
											v-if="
												config.retiros
													.textRetiroCuenta !== '' &&
												config.retiros
													.textRetiroCuenta !==
													undefined
											"
											v-html="
												config.retiros.textRetiroCuenta
											"
											class="retiro-info"
											style="margin-top: 10px"
										></div>
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
										v-if="tipo_cuenta == 10"
									>
										<div
											v-if="
												(appComponent.session
													.verifcedula_ant == 'S' &&
													appComponent.session
														.verifcedula_post ==
														'S') ||
												(appComponent.session
													.verifcedula_ant_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_post ==
														'S') ||
												(appComponent.session
													.verifcedula_post_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_ant ==
														'S') ||
												(appComponent.session
													.verifcedula_ant_paprob ==
													'S' &&
													appComponent.session
														.verifcedula_post_paprob ==
														'S') ||
												config.retiros.paisesNoRequiereDNI.indexOf(
													appComponent.session.pais_id
												) !== -1
											"
										>
											<div class="AmountBox">
												<label
													class="FormLabel div-inline-block pr-3 text-neutral"
													for="valor"
													>{{
														$t('Wallet registrada:')
													}}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<select
														id="cuenta_bancaria"
														v-model="
															cuenta_bancaria
														"
														@change="
															changeSelect($event)
														"
														class="select select-bordered w-full bg-input-background border-input-border border-1 text-neutral"
													>
														<option
															v-for="item in listCrypto"
															:value="item.value"
														>
															{{ $t(item.name) }}
														</option>
													</select>
												</div>
											</div>
											<div
												class="AmountBox"
												v-if="
													appComponent.session
														.pais_id == '113'
												"
											>
												<br />
												<label
													class="FormLabel div-inline-block text-neutral"
													for="valor"
													>{{ $t('Nombre Usuario:') }}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<input
														class="FormInput input input-bordered w-full text-neutral placeholder:text-input-placeholder bg-input-background"
														type="text"
														id="userName"
														name="userName"
														:value="
															appComponent.session
																.nombre
														"
														:disabled="true"
													/>
												</div>
											</div>
											<div
												v-for="item in config.retiros
													.infoExtra"
											>
												<br
													v-if="
														(config.retiros
															.infoExtra !=
															undefined &&
															config.retiros
																.infoExtra
																.length > 0 &&
															item.validSessionEmpty &&
															(appComponent
																.session[
																item.name
															] == '' ||
																appComponent
																	.session[
																	item.name
																] ==
																	undefined ||
																appComponent
																	.session[
																	item.name
																] == null)) ||
														item.validSessionEmpty ==
															undefined ||
														item.validSessionEmpty ==
															false
													"
												/>
												<div
													class="AmountBox"
													v-if="item.type == 'text'"
												>
													<label
														class="FormLabel div-inline-block text-neutral"
														for="valor"
														>{{
															$t(item.title)
														}}</label
													>
													<div
														class="AmountContainer block md:inline-block"
													>
														<input
															class="FormInput input input-bordered w-full text-neutral placeholder:text-input-placeholder bg-input-background"
															:type="item.type"
															:id="item.name"
															:name="item.name"
															v-if="
																item.name !=
																'info1'
															"
															:placeholder="
																$t(
																	item.placeholder
																)
															"
															:disabled="
																item.disabled
															"
															autocomplete="new-password"
															required
														/>
														<input
															class="FormInput bg-input-background text-neutral placeholder:text-input-placeholder input input-bordered w-full"
															:type="item.type"
															:id="item.name"
															:name="item.name"
															:value="info1"
															v-if="
																item.name ==
																'info1'
															"
															:placeholder="
																$t(
																	item.placeholder
																)
															"
															:maxlength="item.maxLength"
															:disabled="
																info1Disabled
															"
															autocomplete="new-password 2"
															required
														/>
													</div>
												</div>
											</div>
										</div>
										<div
											v-if="
												appComponent.session
													.verifcedula_ant != 'S' &&
												appComponent.session
													.verifcedula_post != 'S' &&
												config.retiros.paisesNoRequiereDNI.indexOf(
													appComponent.session.pais_id
												) == -1 && !appComponent.session.doc_expired
											"
										>
											<div
												class="bg-base-100 text-neutral p-6"
											>
												<div>
													<b
														><span>{{
															$t(
																'Para realizar un retiros es necesario.'
															)
														}}</span>
														<RouterLink
															id="accion_verificarcuenta"
															class="Button"
															:to="'/gestion/verificar_cuenta'"
															><span>{{
																$t(
																	'¡Verificar Cuenta!'
																)
															}}</span></RouterLink
														>
													</b>
												</div>
											</div>
										</div>
										<div
											v-if="
												config.retiros
													.textRetiroCuenta !== '' &&
												config.retiros
													.textRetiroCuenta !==
													undefined
											"
											v-html="
												config.retiros.textRetiroCuenta
											"
											class="retiro-info"
											style="margin-top: 10px"
										></div>
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
										v-if="tipo_cuenta == 3"
									>
										<div class="AmountBox">
											<label
												class="FormLabel block md:inline-block"
												for="valor"
												>{{ $t('Departamento:') }}
											</label>
											<div
												class="AmountContainer div-inline-block"
											>
												<select
													id="depto_id"
													v-model="depto_id"
													name="depto_id"
												></select>
											</div>
										</div>
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
										v-if="tipo_cuenta == 3"
									>
										<div class="AmountBox">
											<label
												class="FormLabel block md:inline-block"
												for="valor"
												>{{ $t('Ciudad:') }}</label
											>
											<div
												class="AmountContainer div-inline-block"
											>
												<select
													id="ciudad_id"
													v-model="ciudad_id"
													name="ciudad_id"
												></select>
											</div>
										</div>
									</li>
									<li
										class="FormItem fldAmount"
										id="fldAmount"
										v-if="tipo_cuenta == 4"
									>
										<swiper-container
											space-between="10"
											slides-per-view="auto"
											pagination="true"
											direction="horizontal"
											mousewheel-force-to-axis="true"
											class="w-full mb-2"
										>
											<!-- Slides del carrusel con juegos -->
											<swiper-slide
												class="w-[178px] h-[113px] rounded-lg"
												v-for="(account, index) in getCreditCard"
												:key="index"
											>
												<button
													@click="accountSelected = account"
													class="bg-accent w-[177px] h-[112px] rounded-lg shadow-lg text-white relative"
                                                    :class="
                                                    accountSelected.userbank_id == account.userbank_id
													? 'bg-gradient-to-r from-[#48CAFF]/50 to-[#8D61F9]/50'
													: ''
											"
												>
													<div class="flex flex-col h-full">
														<!--													<button
																												class="absolute right-2 top-[5px] hover:scale-125"
																												@click="buttonAction($event)"
																											>
																												<svg
																													xmlns="http://www.w3.org/2000/svg"
																													width="16"
																													height="16"
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
																											</button>-->
														<div
															class="pt-8 flex justify-between items-center text-[10px] text-justify px-4"
														>
															<div class="grid grid-rows-2">
												<span class="text-gray-400">
													{{ $t('Nombre') }}
												</span>
																<span>
													{{
																		appComponent.session
																			.first_name
																	}}
												</span>
															</div>

															<div class="grid grid-rows-2">
												<span
													class="text-gray-400 text-end"
												>
													{{ $t('Numero') }}
												</span>
																<span>
													{{ account.account }}
												</span>
															</div>
														</div>
														<div
															class="flex justify-between items-center border-t border-gray-500 w-full py-2 px-4"
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
									</li>
									<li
										class="FormItem fldAmount pb-3"
										id="fldAmount"
										v-if="
											tipo_cuenta != 2 &&
											tipo_cuenta != null &&
											tipo_cuenta != 0
										"
									>
										<div
											v-if="
												(appComponent.session
													.verifcedula_ant == 'S' &&
													appComponent.session
														.verifcedula_post ==
														'S') ||
												config.retiros.paisesNoRequiereDNILocal.indexOf(
													appComponent.session.pais_id
												) !== -1 || appComponent.session.doc_expired
											"
										>
											<div class="AmountBox">
												<label
													class="FormLabel block md:inline-block pr-3 text-neutral"
													for="valor"
													>{{ $t('Cantidad') }}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<input
														autocomplete="off"
														class="FormInput input w-full placeholder-input-placeholder bg-input-background border-input-border border-1 text-neutral"
														data-debit="true"
														v-on:click="
															onlyInteger($event)
														"
														id="valor"
														name="amount"
														v-model="valor"
														:placeholder="
															$t(
																'Ingrese la cantidad aquí'
															)
														"
														type="number"
													/>
												</div>
												<button
													v-if="
														!appComponent.disabledButtonWithdraw
													"
													id="accion_retirar"
													class="Button RegLink DepLink NextStepLink gen-nota btn btn-primary ml-4 align-top mt-4 md:mt-0 text-neutral"
													data-use="preload"
													title="Next Step"
													@click="preWithdraw()"
													data-analytics-label="withdrawal:confirm"
													:data-analytics-context="`step:confirm|step-num:3|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
												>
													<span
														class="ButtonIcon DepLinkIcon icon-arrow-right"
													></span>
													<span class="ButtonText">{{
														$t('Retirar')
													}}</span>
												</button>
												<button
													v-else
													disabled
													id="accion_retirar"
													class="btn btn-primary ml-4 align-top mt-4 md:mt-0 text-neutral"
													data-use="preload"
													title="Next Step"
													data-analytics-label="withdrawal:confirm"
													:data-analytics-context="`step:confirm|step-num:3|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
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
													<span
														class="ButtonIcon DepLinkIcon icon-arrow-right"
													></span>
													<span class="ButtonText">{{
														$t('Retirar')
													}}</span>
												</button>
												<span
													class="FormStatus hidden"
													>{{ $t('Status') }}</span
												>
											</div>
										</div>
										<span class="FormHelp"></span>
										<div
											v-if="
												appComponent.session
													.verifcedula_ant != 'S' &&
												appComponent.session
													.verifcedula_post != 'S' &&
												config.retiros.paisesNoRequiereDNILocal.indexOf(
													appComponent.session.pais_id
												) == -1 && !appComponent.session.doc_expired
											"
										>
											<div
												class="bg-base-100 text-neutral p-6"
											>
												<div>
													<b
														><span
															>{{
																$t(
																	'Para realizar un retiros es necesario'
																)
															}}.</span
														>
														<RouterLink
															id="accion_verificarcuenta"
															class="Button"
															:to="'/gestion/verificar_cuenta'"
															><span>{{
																$t(
																	'¡Verificar Cuenta!'
																)
															}}</span></RouterLink
														>
													</b>
												</div>
											</div>
										</div>
										<div
											v-if="
												config.retiros
													.textRetiroLocal !== '' &&
												config.retiros
													.textRetiroLocal !==
													undefined &&
												tipo_cuenta == 1
											"
											v-html="
												$t(
													config.retiros
														.textRetiroLocal
												)
											"
											class="retiro-info"
											style="margin-top: 10px"
										></div>
										<div
											v-if="
												config.retiros
													.textRetiroLocal2 !== '' &&
												config.retiros
													.textRetiroLocal2 !==
													undefined &&
												tipo_cuenta != 1 &&
												tipo_cuenta != 2
											"
											class="retiro-info"
											style="margin-top: 10px"
										>
											{{
												$t(
													config.retiros
														.textRetiroLocal2,
													{
														min: minWithdraw,
														max: maxWithdraw,
													}
												)
											}}
										</div>
									</li>
									<div
										v-if="
											(appComponent.session
												.verifcedula_ant == 'S' &&
												appComponent.session
													.verifcedula_post == 'S') ||
											config.retiros.paisesNoRequiereDNI.indexOf(
												appComponent.session.pais_id
											) !== -1 || appComponent.session.doc_expired
										"
									>
										<li
											class="FormItem fldAmount"
											id="fldAmount"
											v-if="tipo_cuenta == 2"
										>
											<div class="AmountBox">
												<label
													class="FormLabel block md:inline-block pr-3 text-neutral"
													for="valor2"
													>{{ $t('Cantidad') }}
												</label>
												<div
													class="AmountContainer block md:inline-block"
												>
													<input
														autocomplete="off"
														class="FormInput input w-full placeholder-input-placeholder bg-input-background border-input-border border-1 text-neutral"
														data-debit="true"
														v-on:click="
															onlyInteger($event)
														"
														data-increment="100"
														data-validator="{custom:function(){ return AmountSelector.validateAmount; },messages:{}}"
														id="valor2"
														name="amount"
														v-model="valor2"
														:placeholder="
															$t(
																'Ingrese la cantidad aquí'
															)
														"
														type="number"
													/>
												</div>
												<button
													v-if="
														!appComponent.disabledButtonWithdraw
													"
													id="accion_retirar2"
													class="btn btn-primary align-top ml-4 mt-4 md:mt-0 text-neutral"
													data-use="preload"
													title="Next Step"
													@click="preWithdraw()"
													data-analytics-label="withdrawal:confirm"
													:data-analytics-context="`step:confirm|step-num:3|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
												>
													<span
														class="ButtonIcon DepLinkIcon icon-arrow-right"
													></span>
													<span class="ButtonText">{{
														$t('Retirar')
													}}</span>
												</button>
												<button
													v-else
													disabled
													id="accion_retirar2"
													class="btn btn-primary ml-4 align-top mt-4 md:mt-0 text-neutral"
													data-use="preload"
													title="Next Step"
													data-analytics-label="withdrawal:confirm"
													:data-analytics-context="`step:confirm|step-num:3|method:${tipo_cuenta == '2' ? 'bank-transfer' : (tipo_cuenta == '1' ? 'local' : String(tipo_cuenta || ''))}`"
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
													<span
														class="ButtonIcon DepLinkIcon icon-arrow-right"
													></span>
													<span class="ButtonText">{{
														$t('Retirar')
													}}</span>
												</button>
												<span
													class="FormStatus hidden"
													>{{ $t('Status') }}</span
												>
											</div>
											<span class="FormHelp"></span>
										</li>
									</div>

								</ul>
								<div
									v-if="
										config.retiros.paisesInfoRetiro.indexOf(
											appComponent.session.pais_id
										) != -1
									"
									class="retiro-info mt-3 bg-base-200"
								>
									<div>
										<div
											v-if="
												config.retiros.textRetiro1 !=
													'' &&
												config.retiros.textRetiro1 !=
													undefined &&
												config.retiros.textRetiro1 !=
													null
											"
										>
											<span
												><b>{{
													$t(
														config.retiros
															.textRetiro1
													)
												}}</b></span
											>&nbsp;
											<span
												v-if="
													config.retiros.MinWithdraw >
													0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro3,
														{
															min: config.retiros
																.MinWithdraw,
														}
													)
												"
											></span
											>&nbsp;
											<span
												v-if="
													config.retiros.MaxWithdraw >
													0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro4,
														{
															max: config.retiros
																.MaxWithdraw,
														}
													)
												"
											></span>
										</div>
										<div
											v-if="
												config.retiros.textRetiro2 !=
													'' &&
												config.retiros.textRetiro2 !=
													undefined &&
												config.retiros.textRetiro2 !=
													null
											"
										>
											<span
												><b>{{
													$t(
														config.retiros
															.textRetiro2
													)
												}}</b></span
											>&nbsp;
											<span
												v-if="
													config.retiros
														.MinWithdrawBank > 0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro3,
														{
															min: config.retiros
																.MinWithdrawBank,
														}
													)
												"
											></span
											>&nbsp;
											<span
												v-if="
													config.retiros
														.MaxWithdrawBankAccount >
													0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro4,
														{
															max: config.retiros
																.MaxWithdrawBankAccount,
														}
													)
												"
											></span>
										</div>
										<div
											v-if="
												config.retiros
													.textRetiroAditional !=
													'' &&
												config.retiros
													.textRetiroAditional !=
													undefined &&
												config.retiros
													.textRetiroAditional != null
											"
										>
											<span
												><b>{{
													$t(
														config.retiros
															.textRetiroAditional
													)
												}}</b></span
											>&nbsp;
											<span
												v-if="
													config.retiros
														.MinWithdrawBekashnet >
													0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro3,
														{
															min: config.retiros
																.MinWithdrawBekashnet,
														}
													)
												"
											></span
											>&nbsp;
											<span
												v-if="
													config.retiros
														.MaxWithdrawBetKashnet >
													0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro4,
														{
															max: config.retiros
																.MaxWithdrawBetKashnet,
														}
													)
												"
											></span>
										</div>
										<div>
											<span
												v-html="
													$t(
														config.retiros
															.textRetiro5
													)
												"
											></span>
										</div>
										<div>
											<span
												v-if="
													config.retiros.TaxWithDraw >
														0 &&
													config.retiros
														.TaxBalanceWithDraw > 0
												"
												v-html="
													$t(
														config.retiros
															.textRetiro9,
														{
															min: config.retiros
																.TaxWithDraw,
															max: config.retiros
																.TaxBalanceWithDraw,
														}
													)
												"
											></span>
										</div>
										<div class="button-ret text-neutral" v-t>
											{{ config.retiros.textRetiro6 }}
										</div>
									</div>
								</div>
								<div
									class="retiro-info mt-3 bg-base-200"
									v-if="config.partner == 14"
								>
									<div>
										<div>
											<span>{{
												$t(
													'¡Es necesario registrar una clave PIX en el sector: "Cuentas bancarias"!'
												)
											}}</span
											><br /><br />
											<span>{{
												$t(
													'¡Procedimiento requerido solo para el primer servicio!'
												)
											}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							v-if="
								(!newView ||
									appComponent.config.withdrawalsView ==
										undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									] == undefined ||
									appComponent.config.withdrawalsView[
										appComponent.country
									].on == undefined ||
									!appComponent.config.withdrawalsView[
										appComponent.country
									].on) &&
								(appComponent.config.header == undefined ||
									appComponent.config.header
										.currencyChangeButton == undefined ||
									appComponent.config.header
										.currencyChangeButton[
										appComponent.country
									] == undefined ||
									!appComponent.config.header
										.currencyChangeButton[
										appComponent.country
									])
							"
							class="table-grid p-5 rounded-xl shadow-md"
							:class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-200'
									: 'bg-base-400'
							"
						>
							<div class="AmountBox filtro-nota mb-5">
								<label
									class="FormLabel block md:inline-block pr-3 text-neutral"
									for="valor"
									>{{ $t('Estado Nota Retiro:') }}</label
								>
								<div
									class="AmountContainer block md:inline-block"
								>
									<select
										id="filtro_nota"
										v-model="filtro_nota"
										@change="update()"
										class="select select-bordered w-full bg-input-background border-input-border border-1 text-neutral"
									>
										<option value="">
											{{ $t('Todas') }}
										</option>
										<option value="0">
											{{ $t('Pendientes') }}
										</option>
										<option value="3">
											{{ $t('Pagadas') }}
										</option>
										<option value="-1">
											{{ $t('Anuladas') }}
										</option>
										<option value="4">
											{{ $t('Rechazadas') }}
										</option>
									</select>
								</div>
							</div>
							<div class="overflow-x-auto">
								<AppTable
									:tableColumns="tableColumns"
									:data="withdrawals"
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
						<Withdraw3
							v-if="
								newView &&
								appComponent.config.withdrawalsView !=
									undefined &&
								appComponent.config.withdrawalsView[
									appComponent.country
								] != undefined &&
								appComponent.config.withdrawalsView[
									appComponent.country
								].on !== undefined &&
								appComponent.config.withdrawalsView[
									appComponent.country
								].on
							"
						/>
					</div>
				</div>

				<!-- Container for the receipt display -->
				<div id="div-recibo">
					<!-- Button to close the receipt display -->
					<button
						class="action"
						id="close-recibo"
						@click="closeRecibo()"
					>
						<!-- SVG icon for the close button -->
						<svg
							class="iconShape text-[1rem] w-[3em] h-[3em] fill-white CloseIcon"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							version="1.1"
							id="Capa_1"
							x="0px"
							y="0px"
							width="512px"
							height="512px"
							viewBox="0 0 348.333 348.334"
							style="enable-background: new 0 0 348.333 348.334"
							xml:space="preserve"
						>
							<g>
								<!-- Path for the close icon -->
								<path
									d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
									fill="#FF0000"
								></path>
							</g>
						</svg>
					</button>
					<!-- Container for the receipt content -->
					<div class="recibo-content text-neutral-content"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for displaying an important message -->
	<div
		v-if="showModalMessage"
		class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
	>
		<!-- Modal box with a maximum width of 60vh and rounded corners -->
		<div class="modal-box rounded-2xl bg-neutral" style="max-width: 60vh">
			<!-- Close button for the modal -->
			<label
				@click="showModalMessage = false"
				class="cursor-pointer text-right block"
			>
				<font-awesome-icon icon="fa-solid fa-close" />
			</label>
			<!-- Container for the modal content -->
			<div
				class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8"
			>
				<!-- Inner container for the message content -->
				<div class="Container InfoContent">
					<!-- Content message with padding and text alignment -->
					<div class="content-message">
						<!-- Title of the message -->
						<h1>{{ $t('Aviso Importante') }}</h1>
						<br />
						<!-- Greeting message -->
						<p>{{ $t('Estimado usuario,') }}</p>
						<br />
						<!-- Main message content with HTML formatting -->
						<p
							v-html="
								$t(
									'Ten en cuenta que los retiros realizados por transferencia bancaria pueden tardar hasta 72 horas hábiles en ser procesados y pagados. Recuerda que los sábados, domingos y feriados no son días hábiles, así que, si realizas un retiro el día viernes, el pago será ejecutado hasta el lunes o martes de la semana siguente.'
								)
							"
						></p>
						<br /><br />
						<!-- Additional information message with HTML formatting -->
						<p
							v-html="
								$t(
									'Recuerda que tener tus datos actualizados y tus cuentas verificadas agiliza el proceso.'
								)
							"
						></p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for displaying informational messages -->
	<div
		v-if="showModalInfo"
		class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
	>
		<!-- Modal box with a maximum width of 60vh and rounded corners -->
		<div class="modal-box rounded-2xl" style="max-width: 60vh">
			<!-- Container for the modal content -->
			<div
				class="BoxContent TermsContentBox HelpContentBox w-full float-left md:px-8"
			>
				<!-- Inner container for the message content -->
				<div class="Container InfoContent">
					<!-- Content message with flex layout for alignment -->
					<div
						class="content-message flex-col"
						style="
							display: flex;
							justify-content: center;
							flex-wrap: wrap;
						"
					>
						<!-- Paragraph displaying the informational message -->
						<p v-html="$t('modalInfoWithdraw')"></p>
						<!-- Button to accept the message and trigger the withdraw function -->
						<button
							class="btn btn-primary text-neutral mt-3"
							@click="
								showModalInfo = false;
								withdraw();
							"
						>
							{{ $t('Aceptar') }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for displaying a PDF document when showModalPrint is true and layout is not equal to 3 -->
	<div
		v-if="
			showModalPrint &&
			(appComponent.config.layout == undefined ||
				appComponent.config.layout != 3)
		"
		class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
	>
		<!-- Modal box with a maximum width of 60vh and rounded corners -->
		<div class="modal-box rounded-2xl" style="max-width: 60vh">
			<!-- Close button for the modal -->
			<label
				@click="showModalPrint = false"
				class="cursor-pointer text-right block"
			>
				<font-awesome-icon icon="fa-solid fa-close" />
			</label>
			<!-- Embedded PDF document -->
			<embed
				:src="base64"
				type="application/pdf"
				width="100%"
				height="600px"
			/>
		</div>
	</div>

	<!-- Teleport component for displaying a modal when showModalPrint is true and layout is equal to 3 -->
	<Teleport
		v-if="
			showModalPrint &&
			appComponent.config.layout != undefined &&
			appComponent.config.layout == 3
		"
		to="body"
	>
		<!-- Dialog element for the modal -->
		<dialog class="modal in w-screen h-screen bg-black/80">
			<!-- Container for the modal content with responsive design -->
			<div
				class="relative rounded-box min-w-[98%] sm:min-w-[370px] sm:max-w-[50%] min-h-[270px] max-h-[90%] md:max-h-[75%] overflow-hidden text-base-content"
			>
				<!-- Close button for the modal -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="showModalPrint = false"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Modal header with title -->
				<h3 class="w-full p-4 bg-base-300 text-xl font-bold text-neutral">
					{{ $t('Descargar') }}
				</h3>
				<!-- Modal body with content -->
				<div
					class="bg-neutral p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<!-- Display HTML content if mobileL configuration is enabled -->
					<div
						class="w-full mx-10"
						v-if="
							config.mobileL != undefined && config.mobileL == 1
						"
						:ref="element => shadowWithdrawals(element, html)"
					></div>
					<!-- Embed PDF document if mobileL configuration is not enabled -->
					<embed
						v-else
						:src="base64"
						type="application/pdf"
						width="100%"
						height="600px"
					/>
				</div>
			</div>
		</dialog>
	</Teleport>

	<!-- Modal for adding a bank account, visible when onAddAcount is true -->
	<div
		v-if="onAddAcount"
		class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-[999]"
	>
		<!-- Container for the modal content with responsive design -->
		<div
			class="in relative w-11/12 max-w-3xl flex justify-center items-center flex-col gap-4 p-4 text-neutral-content rounded-box"
		>
			<!-- Inner container with scrollable content -->
			<div
				class="bg-base-400 rounded-box w-full max-h-[80vh] flex flex-col justify-start items-center gap-4 overflow-y-auto overflow-x-hidden"
			>
				<!-- Close button for the modal -->
				<button
					@click="onAddAcount = false"
					class="absolute top-2 right-2"
				>
					<!-- Exit icon component with specified dimensions and colors -->
					<ExitIcon
						:height="23"
						:width="23"
						:fill="'#ffffff'"
						:fill2="'#ee3b3f'"
					/>
				</button>
				<!-- Form component for adding a bank account -->
				<AppForm
					:loading="loadingForm"
					:title="$t('Agregar cuenta bancaria')"
					:fields="fields"
					:styleWidth="widthForm"
					:arraySelects="arraySelects"
					:model="model"
					:textDown="textDownForm"
					:textButton="'Aceptar'"
					@onSubmit:form="onSubmit($event)"
					@changeSelect:form="changeSelect2($event)"
					class="max-h-[70vh]"
				/>
			</div>
		</div>
	</div>
</template>
<style>
.content-message {
	/* Container for message content with padding and text alignment */
	padding: 30px 15px;
	text-align: justify;
	width: auto; /* Automatic width based on content */
	max-width: 100%; /* Maximum width to prevent overflow */
	background: white; /* Background color */
	color: black; /* Text color */
	border-radius: 5px; /* Rounded corners */
}

#formWithdrawAmount.Anular {
	/* Styles for the withdrawal form when in 'Anular' state */
	background: white; /* Background color */
	padding: 20px 30px; /* Padding around the content */
	border-radius: 10px; /* Rounded corners */
	padding-right: 0; /* No padding on the right */
	height: 85px; /* Fixed height */
	overflow: hidden; /* Hide overflow content */
	margin-bottom: 20px; /* Space below the form */
}

div#formWithdrawAmount.Retirar {
	/* Styles for the withdrawal form when in 'Retirar' state */
	background: white; /* Background color */
	padding: 15px 25px; /* Padding around the content */
}

div#formWithdrawAmount.Retirar label.page-moneda {
	/* Styles for the currency label within the withdrawal form */
	background: #ececec; /* Background color */
	height: auto; /* Automatic height based on content */
	padding: 12.5px; /* Padding around the label */
}

div#formWithdrawAmount.Retirar .div-inline-block {
	/* Inline block styling for elements within the withdrawal form */
	vertical-align: middle; /* Aligns elements vertically in the middle */
}

div#formWithdrawAmount.Retirar .retiro-info {
	/* Container for withdrawal information */
	background: #eaeaea; /* Background color */
	padding: 10px 15px; /* Padding around the info box */
	font-size: 13px; /* Font size for the text */
	border-radius: 5px; /* Rounded corners */
}

div#formWithdrawAmount.Retirar .retiro-info span {
	/* Styles for span elements within the withdrawal info */
	color: hsl(var(--n)); /* Text color */
}

div#formWithdrawAmount.Retirar .AmountBox.filtro-nota {
	/* Styles for the amount box with filter note */
	float: right; /* Aligns the box to the right */
}
</style>

<!-- FILE DOCUMENTED -->

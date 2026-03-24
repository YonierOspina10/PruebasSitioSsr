<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing the useCookies function for cookie management
import { defineAsyncComponent, defineComponent } from 'vue'; // Importing Vue's component definition functions
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import apiService from '@/services/ApiService'; // Importing API service for backend communication
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Importing animated placeholder component
import { useModalStore } from '@/stores/modal'; // Importing modal store for managing modal state
import logo from '@/components/images/Logo.vue'; // Importing logo component

export default defineComponent({
	components: {
		AnimatedPlaceholder, // Registering AnimatedPlaceholder component
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppTable, // Registering AppTable component
		VPagination, // Registering VPagination component
		SliderCardsGames: defineAsyncComponent(
			// Defining SliderCardsGames as an async component
			() => import('../../components/SliderCardsGames.vue') // Lazy loading SliderCardsGames component
		),
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving app component reference
		let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
		let withdrawals: any = []; // Array to hold withdrawal requests
		let filtro_nota: any = '0'; // Filter for withdrawal status
		let page: any = 1; // Current page number
		let page2: any; // Second page variable
		let pages: any; // Total number of pages
		let totalCount: any = 0; // Total count of withdrawal requests
		let itemSelect: any = {}; // Selected withdrawal item
		let tableColumns: any = []; // Columns for the table
		let loadingTable: boolean = false; // Loading state for the table
		let filterState: string = ''; // Filter state for withdrawals
		let startDate = new Date(); // Current date
		let startDate2 = new Date(startDate); // Date for filtering
		startDate2.setDate(startDate.getDate() - 30); // Setting start date to 30 days ago
		let filterDateFrom = startDate2.toISOString().slice(0, 10); // Filter start date
		let filterDateTo = startDate.toISOString().slice(0, 10); // Filter end date
		let history: any = {
			// Object to hold history data
			componentSlot: {
				id: '',
			},
		};
		let loadingWithdrawals: boolean = false; // Loading state for withdrawals
		const modalStore = useModalStore(); // Using modal store
		let theme_colors = {
			// Theme colors configuration
			primary: '#ededed',
		};
		let loadingPagination: boolean = true; // Loading state for pagination
		let status: any = [
			// Array of withdrawal statuses
			{ id: '0', value: 'Creado' },
			{ id: '1', value: 'Aprobado' },
			{ id: '2', value: 'Procesando' },
			{ id: '3', value: 'Pagado' },
			{ id: '4', value: 'Rechazado' },
			{ id: '-1', value: 'Anulado' },
		];
		let statusSelected: any = ''; // Selected status for filtering
		let newView: boolean = false; // Flag for new view state
		return {
			status, // Exposing status array
			config, // Exposing config object
			emitter, // Exposing emitter
			appComponent, // Exposing app component reference
			refreshBalance, // Exposing refresh balance function
			withdrawals, // Exposing withdrawals array
			filtro_nota, // Exposing filter for withdrawal status
			page, // Exposing current page
			page2, // Exposing second page variable
			totalCount, // Exposing total count of withdrawals
			pages, // Exposing total pages
			itemSelect, // Exposing selected item
			tableColumns, // Exposing table columns
			loadingTable, // Exposing loading state for table
			filterState, // Exposing filter state
			filterDateTo, // Exposing filter end date
			filterDateFrom, // Exposing filter start date
			history, // Exposing history object
			loadingWithdrawals, // Exposing loading state for withdrawals
			modalStore, // Exposing modal store
			theme_colors, // Exposing theme colors
			loadingPagination, // Exposing loading state for pagination
			statusSelected, // Exposing selected status
			newView, // Exposing new view flag
		};
	},
	setup() {
		const { cookies } = useCookies(); // Using cookies for session management
		return { cookies }; // Exposing cookies
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on unmount
	},
	mounted() {
		if (window.localStorage.getItem('newView') == 'true') {
			// Checking local storage for new view flag
			this.newView = true; // Setting new view to true
			window.localStorage.setItem('newView', 'true'); // Updating local storage
		} else {
			this.newView = false; // Setting new view to false
			window.localStorage.setItem('newView', 'false'); // Updating local storage
		}
		this.emitter.on('accept:modal', () => {
			// Listening for modal acceptance event
			this.acceptModal(); // Calling acceptModal method
		});
		if (
			this.config != undefined &&
			this.config.retiros != undefined &&
			this.config.retiros.tableColumns != undefined &&
			this.config.retiros.tableColumns[this.appComponent.country] !=
				undefined
		) {
			this.tableColumns =
				this.config.retiros.tableColumns[this.appComponent.country]; // Setting table columns based on config
		}
		this.tableColumns = this.tableColumns.filter(function (obj) {
			// Filtering out 'detalle' column
			return obj.name !== 'detalle';
		});
		if (this.filtro_nota !== '0') {
			this.tableColumns = this.tableColumns.filter(function (obj) {
				// Filtering out 'delete' column if filtro_nota is not '0'
				return obj.name !== 'delete';
			});
		}
		if (
			this.appComponent.config.withdrawalsView != undefined &&
			this.appComponent.config.withdrawalsView[
				this.appComponent.country
			] != undefined &&
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on != undefined &&
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on &&
			this.newView
		) {
			this.history =
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				].history; // Setting history based on config
		}
		if (this.appComponent.config.theme_colors != undefined) {
			this.theme_colors = this.appComponent.config.theme_colors; // Setting theme colors from config
		}
		if (
			this.appComponent.config.withdrawalsView != undefined &&
			this.appComponent.config.withdrawalsView[
				this.appComponent.country
			] != undefined &&
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on != undefined &&
			this.appComponent.config.withdrawalsView[this.appComponent.country]
				.on &&
			this.newView
		) {
			this.getWithdrawals3(); // Fetching withdrawals if new view is enabled
		} else {
			this.page = 0; // Resetting page to 0
			this.getWithdrawals(this.filtro_nota); // Fetching withdrawals based on filtro_nota
		}
	},
	methods: {
		openCalendar(refName: string){
			const input = this.$refs[refName] as HTMLInputElement;
			
		  	try {
		  	  if (input.showPicker) {
		  	    input.showPicker();
		  	    return;
		  	  }
		  	} catch (e) {
		  	  input.click();
		  	  return;
		  	}

		  	input.click();
		},
		acceptModal() {
			const vthis = this; // Storing reference to 'this'
			if (this.appComponent.modal.orderModal == 'withdraw_cancel') {
				// Checking if the modal is for withdrawal cancellation
				let params = {
					id: this.itemSelect.id, // Preparing parameters for API request
				};
				apiService
					.request('withdraw_cancel', params) // Making API request to cancel withdrawal
					.then((response: any) => {
						if (response.code == 0) {
							// Checking if the response is successful
							this.appComponent.gAnalytics('cancel_withdrawal'); // Tracking analytics event
							this.appComponent.modal = {
								// Setting modal state for success notification
								showModal: 'notification',
								titleModal: this.$t('OK!'),
								messageModal: this.$t(
									'La nota de retiro ha sido anulada satisfactoriamente. Este valor se aumentara en saldo disponible para Apostar.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.getWithdrawals(this.filtro_nota); // Refreshing withdrawals list
							vthis.refreshBalance(); // Refreshing balance
						} else {
							var error_mensaje = ''; // Variable to hold error message
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Preparing error message based on response
							);
							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
								); // Default error message
							}
							this.appComponent.modal = {
								// Setting modal state for error notification
								showModal: 'notification',
								titleModal: this.$t('Error!'),
								messageModal: error_mensaje,
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
						}
					});
			}
			this.appComponent.closeModal(); // Closing modal
		},
		getWithdrawals(state) {
			const paramsWithdrawals = {
				// Parameters for fetching withdrawals
				State: state,
				count: 10, // Number of withdrawals to fetch
				start: this.page * 10, // Starting index for pagination
			};
			const vthis = this; // Storing reference to 'this'
			this.loadingTable = true; // Setting loading state for table
			apiService
				.request('get_withdrawals', paramsWithdrawals) // Making API request to fetch withdrawals
				.then((response: any) => {
					if (response.code == 0) {
						// Checking if the response is successful
						var data = response.data.withdrawal_requests.request; // Extracting withdrawal requests from response
						for (var i = 0; i < data.length; i++) {
							// Iterating over each withdrawal request
							data[i].cuenta = data[i].id; // Mapping id to cuenta
							data[i].fecha_crea = data[i].date; // Mapping date to fecha_crea
							data[i].valor = data[i].amount; // Mapping amount to valor
							data[i].impuesto1 = data[i].tax1; // Mapping tax1
							data[i].impuesto2 = data[i].tax2; // Mapping tax2
							data[i].valorfinal =
								data[i].amount - data[i].tax1 - data[i].tax2; // Calculating final value after taxes
							data[i].tipo = this.$t(data[i].payment_system_name); // Translating payment system name
							data[i].moneda = vthis.appComponent.session.moneda; // Setting currency
							data[i].detalle = data[i].detail; // Mapping detail
							data[i].estado = ''; // Initializing estado
							if (data[i].status == undefined) {
								data[i].status = 5; // Setting default status if undefined
								data[i].estado = this.$t('Expiradas'); // Setting estado for expired
							} else if (data[i].status === '') {
								data[i].estado = this.$t(''); // Setting estado for empty status
							} else if (data[i].status == 0) {
								data[i].estado = this.$t('Pendientes'); // Setting estado for pending
							} else if (data[i].status == 1) {
								data[i].estado = this.$t('En proceso'); // Setting estado for pending
							} else if (data[i].status == 3) {
								data[i].estado = this.$t('Pagadas'); // Setting estado for paid
							} else if (data[i].status == -1) {
								data[i].estado = this.$t('Anuladas'); // Setting estado for canceled
							} else if (data[i].status == 4) {
								data[i].estado = this.$t('Rechazadas'); // Setting estado for rejected
							} else if (data[i].status == 2) {
								data[i].estado = this.$t('Pendientes'); // Setting estado for pending
							} else if (data[i].status == 5) {
								data[i].status = 0 // Set status to approved
								data[i].estado = this.$t('Aprobado'); // Set status to pending
							}
						}
						this.withdrawals = JSON.parse(JSON.stringify(data)); // Storing withdrawals data
						this.totalCount = parseInt(response.total_count); // Setting total count of withdrawals
						this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
						this.pages = parseInt(this.pages) + 1; // Adjusting total pages
						this.loadingTable = false; // Resetting loading state for table
					}
				});
		},
		withdrawCancel(item: any) {
			this.appComponent.modal = {
				// Setting modal state for withdrawal cancellation confirmation
				showModal: 'notification',
				titleModal: this.$t('Anular Nota de Retiro'),
				messageModal:
					this.$t(
						'¿ Esta seguro que desea eliminar la nota de retiro #'
					) +
					item.id +
					'?',
				buttonModal: this.$t('Aceptar'),
				orderModal: 'withdraw_cancel',
			};
			this.itemSelect = item; // Storing selected item for cancellation
		},
		updateHandler(handler: any) {
			this.page = handler; // Updating current page
			if (
				this.appComponent.config.withdrawalsView != undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				] != undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				].on != undefined &&
				this.appComponent.config.withdrawalsView[
					this.appComponent.country
				].on &&
				this.newView
			) {
				this.getWithdrawals3(this.filterState); // Fetching withdrawals with filter if new view is enabled
			} else {
				this.getWithdrawals(this.filtro_nota); // Fetching withdrawals based on filtro_nota
			}
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting page
			if (
				this.config != undefined &&
				this.config.retiros != undefined &&
				this.config.retiros.tableColumns != undefined &&
				this.config.retiros.tableColumns[this.appComponent.country] !=
					undefined
			) {
				this.tableColumns =
					this.config.retiros.tableColumns[this.appComponent.country]; // Setting table columns based on config
			}
			if (this.filtro_nota !== '0') {
				this.tableColumns = this.tableColumns.filter(function (obj) {
					// Filtering out 'delete' column if filtro_nota is not '0'
					return obj.name !== 'delete';
				});
			}
			if (this.filtro_nota != 4) {
				this.tableColumns = this.tableColumns.filter(function (obj) {
					// Filtering out 'detalle' column if filtro_nota is not 4
					return obj.name !== 'detalle';
				});
			}
			this.getWithdrawals(this.filtro_nota); // Fetching withdrawals based on filtro_nota
		},
		buttonAction(item) {
			this.withdrawCancel(item); // Calling withdrawCancel method with selected item
		},
		handleClickFilter() {
			if (new Date(this.filterDateTo) < new Date(this.filterDateFrom)) {
				// Checking if end date is before start date
				this.pages = 0; // Resetting pages
				this.page = 0; // Resetting page
				this.appComponent.showModal3 = true; // Showing modal for error
				this.modalStore.title = this.$t('Error!'); // Setting modal title
				this.modalStore.message = this.$t(
					'La fecha de inicio no puede ser mayor a la fecha final'
				); // Setting modal message
				this.modalStore.open = true; // Opening modal
				this.modalStore.action = () => {
					this.appComponent.showModal3 = false; // Closing modal on action
					this.modalStore.reset(); // Resetting modal store
				};
			} else {
				this.getWithdrawals3(this.filterState); // Fetching withdrawals with filter
			}
		},
		handleCancelWithdrawal(item) {
			this.appComponent.showModal3 = true; // Showing modal for cancellation confirmation
			this.modalStore.title = this.$t('Cancelar retiro'); // Setting modal title
			this.modalStore.message =
				this.$t('¿Está seguro que desea cancelar el retiro Nro.') +
				' ' +
				item.id +
				'?'; // Setting modal message
			this.modalStore.open = true; // Opening modal
			this.modalStore.action = () => {
				this.cancelWithdrawal(item.id); // Calling cancelWithdrawal method on action
			};
			this.modalStore.cancel = () => {
				this.appComponent.showModal3 = false; // Closing modal on cancel
				this.modalStore.reset(); // Resetting modal store
			};
		},
		async getWithdrawals3(state: string = '') {
			let from_date = new Date(this.filterDateFrom); // Parsing filter start date
			let to_date = new Date(this.filterDateTo); // Parsing filter end date
			let from_date_send = parseInt(
				from_date
					.setHours(from_date.getHours() + 24)
					.toString()
					.slice(0, 10)
			); // Preparing start date for API request
			let to_date_send = parseInt(
				to_date
					.setHours(to_date.getHours() + 24)
					.toString()
					.slice(0, 10)
			); // Preparing end date for API request
			const paramsWithdrawals = {
				// Parameters for fetching withdrawals
				State: state,
				to_date: to_date_send, // End date
				from_date: from_date_send, // Start date
				count: 10, // Number of withdrawals to fetch
				start: (this.page - 1) * 10, // Starting index for pagination
			};
			this.statusSelected = this.status.find(
				// Finding selected status
				(s) => s.id == this.filterState
			);
			this.statusSelected = this.statusSelected
				? this.statusSelected.value.toLowerCase() // Setting selected status value
				: '';
			this.loadingWithdrawals = true; // Setting loading state for withdrawals
			apiService
				.request('get_withdrawals', paramsWithdrawals) // Making API request to fetch withdrawals
				.then((response: any) => {
					if (response.code == 0) {
						// Checking if the response is successful
						this.withdrawals =
							response.data.withdrawal_requests.request; // Storing withdrawals data
						this.withdrawals.forEach((element) => {
							// Iterating over each withdrawal
							element.date = new Date(
								element.date
							).toLocaleString(); // Formatting date
							switch (
								element.status // Mapping status to display values
							) {
								case 0:
									element.status = 1;
									element.status2 = 'Pagada';
									break;
								case 1:
									element.status = 2;
									element.status2 = 'Pagada';
									break;
								case 2:
									element.status = 3;
									element.status2 = 'Pagada';
									break;
								case 3:
									element.status = 4;
									element.status2 = 'Pagada';
									break;
								case -1:
									element.status = 5;
									element.status2 = 'Anulada';
									break;
								case 4:
									element.status = 6;
									element.status2 = 'Rechazada';
									break;
								case 5:
                                	element.status = 7; // Internal status for 'Rechazada'
                                	element.status2 = 'Pagada'; // User-friendly status
                                	break;
								case undefined:
									element.status = 6;
									element.status2 = 'Expirada';
									break;
								default:
									element.status = 1;
									element.status2 = 'Pagada';
									break;
							}
						});
						this.totalCount = parseInt(response.total_count); // Setting total count of withdrawals
						this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
						this.pages =
							parseInt(this.pages) + 1 < 1
								? 1
								: parseInt(this.pages) + 1; // Adjusting total pages
						this.loadingWithdrawals = false; // Resetting loading state for withdrawals
						this.loadingPagination = false; // Resetting loading state for pagination
					}
				});
		},
		async cancelWithdrawal(id) {
			await apiService
				.request('withdraw_cancel', { id }) // Making API request to cancel withdrawal
				.then((response: any) => {
					if (response.code == 0) {
						// Checking if the response is successful
						this.appComponent.gAnalytics('cancel_withdrawal_new'); // Tracking analytics event
						this.appComponent.showModal3 = true; // Showing modal for cancellation success
						this.modalStore.title = 'Retiro anulado'; // Setting modal title
						this.modalStore.message = this.$t(
							'La nota de retiro ha sido anulada satisfactoriamente. Este valor se aumentara en saldo disponible para Apostar.'
						); // Setting modal message
						this.modalStore.open = true; // Opening modal
						this.modalStore.action = () => {
							this.appComponent.showModal3 = false; // Closing modal on action
							this.modalStore.reset(); // Resetting modal store
							this.getWithdrawals3(this.filterState); // Refreshing withdrawals list
							this.appComponent.refreshBalance2(); // Refreshing balance
						};
					} else {
						let error_mensaje = ''; // Variable to hold error message
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Preparing error message based on response
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
							); // Default error message
						}
						this.appComponent.showModal3 = true; // Showing modal for error
						this.modalStore.title = this.$t('Error!'); // Setting modal title
						this.modalStore.message = error_mensaje; // Setting modal message
						this.modalStore.open = true; // Opening modal
						this.modalStore.action = () => {
							this.appComponent.showModal3 = false; // Closing modal on action
							this.modalStore.reset(); // Resetting modal store
						};
					}
				});
		},
	},
});
</script>
<template>
	<div
		v-if="
			config.layout != 3 && config.layout != 7 &&
			(!newView ||
				appComponent.config.withdrawalsView == undefined ||
				appComponent.config.withdrawalsView[appComponent.country] ==
					undefined ||
				appComponent.config.withdrawalsView[appComponent.country].on ==
					undefined ||
				!appComponent.config.withdrawalsView[appComponent.country].on)
		"
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
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto flex justify-between items-center'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Anular nota de retiro') }}</span
						>
					</span>
				</div>
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'cuenta_cobro_anular'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'cuenta_cobro_anular'"
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
							class="table-grid p-5 shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'rounded-b-xl'
									: 'rounded-xl'
							"
						>
							<div
								v-if="
									!newView ||
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
									].on
								"
								class="AmountBox filtro-nota mb-5"
							>
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
										class="select select-bordered w-full bg-input-background border-input-border border-1 text-input-placeholder"
									>
										<option value="0">
											{{ $t('Pendientes') }}
										</option>
										<option value="-1">
											{{ $t('Anuladas') }}
										</option>
									</select>
								</div>
							</div>
							<div
								v-if="
									!newView ||
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
									].on
								"
								class="overflow-x-auto"
							>
								<AppTable
									:tableColumns="tableColumns"
									:data="withdrawals"
									:loading="loadingTable"
									@button:action="buttonAction($event)"
								/>
							</div>
							<v-pagination
								v-if="
									totalCount > 0 &&
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
										].on)
								"
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
							<section
								v-else-if="
									appComponent.config.withdrawalsView !=
										undefined &&
									appComponent.config.withdrawalsView[
										appComponent.country
									] != undefined &&
									appComponent.config.withdrawalsView[
										appComponent.country
									].on != undefined &&
									appComponent.config.withdrawalsView[
										appComponent.country
									].on &&
									newView
								"
								class="w-full h-auto rounded-b-box"
							>
								<div
									class="w-full h-full flex flex-col justify-center items-center gap-4"
								>
									<div
										class="w-full h-full flex justify-between items-center gap-8"
									>
										<div
											class="animationLeft w-full lg:w-[50%] flex flex-col justify-center items-center sm:items-start gap-4 md:gap-8"
										>
											<span
												class="hidden sm:flex uppercase rounded-full text-sm font-bold text-primary bg-primary/25 py-1 px-4 border-[0.28px] border-primary"
												>{{ $t('Histórico') }}</span
											>
											<span
												class="history-title text-2xl sm:text-3xl text-center sm:text-start w-full text-neutral"
												v-html="history.description"
											>
											</span>
											<div
												class="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-6 text-neutral"
											>
												<label
													class="form-control w-full max-w-xs"
												>
													<div class="label">
														<span
															class="label-text text-neutral w-full text-center sm:text-start"
															>{{
																$t('Fecha')
															}}</span
														>
													</div>
													<div class="flex items-center gap-2 bg-base-200 input input-bordered w-[280px] px-2">
													  
													  <div class="relative flex items-center">
													    <input
															ref="dateFrom"
													      type="date"
													      v-model="filterDateFrom"
													      class="input input-bordered bg-input-background text-neutral border-input-border border pr-8 outline-none focus:outline-none appearance-none"
													    />
													    
													    <svg
														@click="openCalendar('dateFrom')"
													      xmlns="http://www.w3.org/2000/svg"
													      viewBox="0 0 24 24"
													      fill="none"
													      stroke="currentColor"
													      stroke-width="1.5"
													      stroke-linecap="round"
													      stroke-linejoin="round"
													      class="w-4 h-4 text-neutral absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer
"
													    >
													      <path d="M3 8h18v3H3z" fill="currentColor"/>
													      <rect x="3" y="5" width="18" height="16" rx="2" ry="2" stroke="currentColor" fill="none"/>
													      <line x1="7" y1="3" x2="7" y2="6" stroke="currentColor" stroke-width="1.5"/>
													      <line x1="17" y1="3" x2="17" y2="6" stroke="currentColor" stroke-width="1.5"/>
													    </svg>
													  </div>
													
													  
													  <div class="relative flex items-center">
													    <input
														ref="dateTo"
													      type="date"
													      v-model="filterDateTo"
													      class="input input-bordered bg-input-background text-neutral border-input-border border pr-8 outline-none focus:outline-none appearance-none"
													    />
													    <svg
														@click="openCalendar('dateTo')"
													      xmlns="http://www.w3.org/2000/svg"
													      viewBox="0 0 24 24"
													      fill="none"
													      stroke="currentColor"
													      stroke-width="1.5"
													      stroke-linecap="round"
													      stroke-linejoin="round"
													      class="w-4 h-4 text-neutral absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
													    >
													      <path d="M3 8h18v3H3z" fill="currentColor"/>
													      <rect x="3" y="5" width="18" height="16" rx="2" ry="2" stroke="currentColor" fill="none"/>
													      <line x1="7" y1="3" x2="7" y2="6" stroke="currentColor" stroke-width="1.5"/>
													      <line x1="17" y1="3" x2="17" y2="6" stroke="currentColor" stroke-width="1.5"/>
													    </svg>
													  </div>
													</div>
												</label>
												<label
													class="form-control w-full max-w-xs ml-2"
												>
													<div class="label">
														<span
															class="label-text text-neutral w-full text-center md:text-start"
															>{{
																$t('Estados')
															}}</span
														>
													</div>
													<select
														v-model="filterState"
														@change="
															handleClickFilter()
														"
														class="select select-bordered bg-input-background text-neutral border-input-border border"
													>
														<option value="">
															{{ $t('Todos') }}
														</option>
														<option value="0">
															{{ $t('Creadas') }}
														</option>
														<option value="1">
															{{
																$t('Aprobadas')
															}}
														</option>
														<option value="2">
															{{
																$t('Procesando')
															}}
														</option>
														<option value="3">
															{{ $t('Pagadas') }}
														</option>
														<option value="4">
															{{
																$t('Rechazadas')
															}}
														</option>
														<option value="-1">
															{{ $t('Anuladas') }}
														</option>
													</select>
												</label>
												<button
													@click="handleClickFilter()"
													class="btn btn-outline btn-primary hover:bg-primary/80 border-primary hover:border-primary hover:text-neutral-content normal-case text-base"
												>
													{{ $t('Consultar') }}
												</button>
											</div>
										</div>
										<div
											class="animationRight hidden lg:flex w-[35%] flex-col-reverse justify-center items-center md:items-end gap-3"
										>
											<component
												:is="history.componentSlot.id"
												:data="history.componentSlot"
											/>
										</div>
									</div>
									<div
										class="animationUp w-full h-[700px] flex flex-col justify-start items-center gap-3 mt-4 bg-base-200 border border-primary rounded-box p-2"
									>
										<div
											class="w-full flex justify-around items-center rounded-lg h-14 text-neutral normal-case"
										>
											<span
												class="flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{ $t('# Retiro') }}</span
											>
											<span
												class="hidden md:flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{ $t('Tipo') }}</span
											>
											<span
												class="flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{ $t('Valor') }}</span
											>
											<span
												class="hidden lg:flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{
													$t('Fecha de solicitud')
												}}</span
											>
											<span
												class="hidden md:flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{
													$t('Última actualización')
												}}</span
											>
											<span
												class="flex justify-center items-center px-1 text-center leading-4 w-1/5"
												>{{ $t('Acciones') }}</span
											>
										</div>
										<div
											class="w-full h-full overflow-y-auto scrolWidth flex flex-col justify-start items-center"
										>
											<AnimatedPlaceholder
												v-if="loadingWithdrawals"
												v-for="index in 8"
												:key="index"
												class="w-full h-40 mb-2 rounded-box"
											/>
											<span
												v-if="
													!loadingWithdrawals &&
													withdrawals.length == 0
												"
												class="text-center w-full my-5 text-gray-400"
											>
												{{
													filterState != ''
														? $t(
																'No tienes retiros en estado '
															) +
															$t(statusSelected)
														: $t(
																'No tienes retiros'
															)
												}}
											</span>
											<div
												v-if="
													!loadingWithdrawals &&
													withdrawals.length > 0
												"
												v-for="(
													withdrawal, index
												) in withdrawals"
												:key="index"
												class="w-full flex flex-col justify-center items-center mb-4"
											>
												<div
													class="w-full flex justify-around items-center bg-base-200 rounded-lg h-14 md:h-20"
												>
													<span
														class="w-1/5 flex justify-center items-center text-gray-400 px-1 text-center leading-4"
														>{{
															withdrawal.id
														}}</span
													>
													<span
														class="hidden md:flex w-1/5 justify-center items-center text-gray-400 px-1 text-center leading-4"
														>{{
															$t(
																withdrawal.payment_system_name
															)
														}}</span
													>
													<span
														class="w-1/5 flex justify-center items-center text-gray-400 px-1 text-center leading-4"
														>{{
															(appComponent
																.session
																.simbolo_moneda !=
																null &&
															appComponent.session
																.simbolo_moneda !=
																undefined
																? appComponent
																		.session
																		.simbolo_moneda
																: '$') +
															withdrawal.amount
														}}</span
													>
													<span
														class="hidden lg:flex w-1/5 justify-center items-center text-gray-400 px-1 text-center leading-4"
														>{{
															withdrawal.date
														}}</span
													>
													<span
														class="hidden md:flex w-1/5 justify-center items-center text-gray-400 px-1 text-center leading-4"
														>{{
															withdrawal.date_payment2
																? withdrawal.date_payment2
																: ''
														}}</span
													>
													<span
														class="w-1/5 flex justify-center items-center"
													>
														<button
															:disabled="
																withdrawal.status !=
																1 && withdrawal.status != 7
															"
															@click="
																handleCancelWithdrawal(
																	withdrawal
																)
															"
															class="btn btn-xs lg:btn-sm btn-secondary hover:bg-primary hover:border-primary rounded-md text-xs capitalize"
															:class="
																withdrawal.status !=
																1 && withdrawal.status != 7
																	? 'text-neutral'
																	: 'text-neutral-content'
															"
														>
															{{ $t('Anular') }}
														</button>
													</span>
												</div>
												<div
													class="w-[90%] h-full max-h-[90px] border-l-1 border-gray-400 flex flex-col justify-center items-center pt-1 gap-1"
												>
													<span
														class="w-full flex lg:hidden justify-center items-center gap-1 text-gray-300 text-xs font-light"
														>{{
															$t(
																'Fecha de solicitud '
															)
														}}
														<strong
															class="font-bold"
															>{{
																withdrawal.date
																	.slice(
																		0,
																		-3
																	)
																	.replace(
																		', ',
																		' - '
																	)
															}}</strong
														></span
													>
													<ul
														class="steps text-xs w-full text-gray-400"
													>
														<li
															:data-content="
																withdrawal.status ==
																1
																	? '✓'
																	: ''
															"
															class="step"
															:class="
																withdrawal.status ==
																1
																	? 'step-primary text-neutral'
																	: ''
															"
														>
															{{ $t('Creado') }}
														</li>
														<li
															:data-content="
																withdrawal.status ==
																2 || withdrawal.status == 7
																	? '✓'
																	: ''
															"
															class="step"
															:class="
																withdrawal.status ==
																2 || withdrawal.status == 7
																	? 'step-primary text-neutral'
																	: ''
															"
														>
															{{ $t('Aprobado') }}
														</li>
														<li
															:data-content="
																withdrawal.status ==
																3
																	? '?'
																	: ''
															"
															class="step"
															:class="
																withdrawal.status ==
																3
																	? 'step-primary text-neutral'
																	: ''
															"
														>
															{{
																$t('Procesando')
															}}
														</li>
														<li
															:data-content="
																withdrawal.status ==
																4
																	? '✓'
																	: withdrawal.status ==
																		  5
																		? '✕'
																		: ''
															"
															class="step"
															:class="{
																'step-success text-neutral':
																	withdrawal.status ==
																	4,
																'step-error text-neutral':
																	withdrawal.status ==
																	5,
															}"
														>
															{{
																$t(
																	withdrawal.status2
																)
															}}
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div
										v-if="
											!loadingPagination &&
											withdrawals.length > 0
										"
										class="w-full flex flex-col md:flex-row justify-between items-center gap-2 mt-2"
									>
										<span
											class="text-base text-neutral font-semibold"
											>{{
												page * 10 -
												9 +
												' - ' +
												(page * 10 > totalCount
													? totalCount
													: page * 10) +
												' de ' +
												totalCount
											}}</span
										>
										<div
											v-if="totalCount > 0 && pages > 1"
											class="flex justify-between items-center gap-0"
										>
											<button
												@click="updateHandler(page - 1)"
												class="rounded-full bg-neutral-content/80 hover:scale-110"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="31"
													height="31"
													viewBox="0 0 31 31"
													fill="none"
												>
													<circle
														cx="15.3802"
														cy="15.3802"
														r="15.3802"
														transform="matrix(-1 0 0 1 30.7603 0)"
														fill="#191929"
													/>
													<path
														d="M11.7464 15.8038C11.626 15.6836 11.5583 15.5205 11.5581 15.3503V15.0251C11.5601 14.8553 11.6275 14.6929 11.7464 14.5716L16.1448 10.1817C16.2251 10.1007 16.3345 10.0551 16.4486 10.0551C16.5627 10.0551 16.672 10.1007 16.7523 10.1817L17.3599 10.7892C17.4404 10.8681 17.4858 10.9761 17.4858 11.0888C17.4858 11.2014 17.4404 11.3094 17.3599 11.3883L13.5519 15.1877L17.3599 18.9872C17.4409 19.0675 17.4865 19.1769 17.4865 19.2909C17.4865 19.405 17.4409 19.5144 17.3599 19.5947L16.7523 20.1937C16.672 20.2747 16.5627 20.3203 16.4486 20.3203C16.3345 20.3203 16.2251 20.2747 16.1448 20.1937L11.7464 15.8038Z"
														fill="#E8BD70"
													/>
												</svg>
											</button>
											<div
												class="flex justify-center items-center mb-2"
											>
												<v-pagination
													v-model="page"
													:pages="pages"
													:range-size="1"
													:active-color="
														theme_colors?.primary
													"
													@update:modelValue="
														updateHandler
													"
                                                    :class="
								    config.layout != undefined &&
                                    config.layout == 3
                                    ? 'text-neutral'
                                    : 'text-neutral-content'
                                "
												/>
											</div>
											<button
												@click="updateHandler(page + 1)"
												class="rounded-full bg-neutral-content/80 rotate-180 hover:scale-110"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="31"
													height="31"
													viewBox="0 0 31 31"
													fill="none"
												>
													<circle
														cx="15.3802"
														cy="15.3802"
														r="15.3802"
														transform="matrix(-1 0 0 1 30.7603 0)"
														fill="#191929"
													/>
													<path
														d="M11.7464 15.8038C11.626 15.6836 11.5583 15.5205 11.5581 15.3503V15.0251C11.5601 14.8553 11.6275 14.6929 11.7464 14.5716L16.1448 10.1817C16.2251 10.1007 16.3345 10.0551 16.4486 10.0551C16.5627 10.0551 16.672 10.1007 16.7523 10.1817L17.3599 10.7892C17.4404 10.8681 17.4858 10.9761 17.4858 11.0888C17.4858 11.2014 17.4404 11.3094 17.3599 11.3883L13.5519 15.1877L17.3599 18.9872C17.4409 19.0675 17.4865 19.1769 17.4865 19.2909C17.4865 19.405 17.4409 19.5144 17.3599 19.5947L16.7523 20.1937C16.672 20.2747 16.5627 20.3203 16.4486 20.3203C16.3345 20.3203 16.2251 20.2747 16.1448 20.1937L11.7464 15.8038Z"
														fill="#E8BD70"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none; /* Hides the default calendar icon */
}

.history-title {
	color: #fff; /* Title color for history section */
	font-style: normal; /* Normal font style */
	font-weight: 800; /* Bold font weight */
	line-height: 113.9%; /* Line height for title */
}

.scrolWidth::-webkit-scrollbar {
	width: 0.2em; /* Width of the scrollbar */
}

.step::after {
	background-color: #59597d; /* Background color for step indicator */
	width: 20px; /* Width of step indicator */
	height: 20px; /* Height of step indicator */
}

.step::before {
	background-color: transparent; /* Transparent background for step line */
	height: 1px; /* Height of step line */
	border: #59597d 1px dashed; /* Dashed border for step line */
}

.step-primary::after {
	background-color: #8ecddd; /* Background color for primary step */
	width: 20px; /* Width of primary step indicator */
	height: 20px; /* Height of primary step indicator */
	color: black; /* Text color for primary step */
}

.step-success::after {
	background-color: green; /* Background color for success step */
	width: 20px; /* Width of success step indicator */
	height: 20px; /* Height of success step indicator */
}

.step-error::after {
	background-color: red; /* Background color for error step */
	width: 20px; /* Width of error step indicator */
	height: 20px; /* Height of error step indicator */
}

.animationLeft {
	animation: 250ms ease-in-out 0s 1 normal forwards running animationLeft; /* Animation for left entry */
}

@keyframes animationLeft {
	0% {
		opacity: 0; /* Initial opacity */
		transform: translateX(-200px); /* Initial position */
	}
	100% {
		opacity: 1; /* Final opacity */
		transform: translateX(0px); /* Final position */
	}
}

.animationRight {
	animation: 250ms ease-in-out 0s 1 normal forwards running animationRight; /* Animation for right entry */
}

@keyframes animationRight {
	0% {
		opacity: 0; /* Initial opacity */
		transform: translateX(200px); /* Initial position */
	}
	100% {
		opacity: 1; /* Final opacity */
		transform: translateX(0px); /* Final position */
	}
}

.animationUp {
	animation: 250ms ease-in-out 0s 1 normal forwards running animationUp; /* Animation for upward entry */
}

@keyframes animationUp {
	0% {
		opacity: 0; /* Initial opacity */
		transform: translateY(200px); /* Initial position */
	}
	100% {
		opacity: 1; /* Final opacity */
		transform: translateY(0px); /* Final position */
	}
}
</style>

<!-- FILE DOCUMENTED -->

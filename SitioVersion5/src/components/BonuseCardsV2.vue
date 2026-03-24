<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import router from '@/router'; // Importing the router instance
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { useRoute } from 'vue-router'; // Importing the useRoute function from Vue Router
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing the ExitIcon component

export default defineComponent({
	components: { ExitIcon }, // Registering the ExitIcon component
	props: {
		data: Object, // Defining a prop named 'data' of type Object
	},
	data: function () {
		let config = this.$config(); // Accessing the application configuration
		let emitter = this.$emitter(); // Accessing the event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		let refreshBalance = this.$refreshBalance; // Function to refresh the balance
		let loyalty: any = {}; // Object to hold loyalty information
		let bonuses: any = []; // Array to hold bonuses
		let base64: string = ''; // String to hold base64 encoded data
		let base64Download: string = ''; // String to hold base64 data for download
		let showModalPrint: boolean = false; // Flag to control print modal visibility
		let showModalPrize: boolean = false; // Flag to control prize modal visibility
		let itemSelect: any = {}; // Object to hold selected item
		let onModal: boolean = false; // Flag to indicate if a modal is open
		let title: string = ''; // Title for modals
		let message: string = ''; // Message for modals
		let loadingForm = true; // Flag to indicate if the form is loading
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text for the form
		let bonusItem: any = {}; // Object to hold bonus item information
		let fields: any =
			this.$config() != undefined &&
				this.$config().loyalty != undefined &&
				this.$config().loyalty.form != undefined &&
				this.$config().loyalty.form[this.$appComponent['country']] !=
				undefined
				? this.$config().loyalty.form[this.$appComponent['country']]
				: []; // Fields for the loyalty form based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Object to hold form model data
		let modelInitial: any = {}; // Object to hold initial model data
		let widthForm: any = {}; // Object to hold form width data
		let prize: any = {
			Id: '', // Prize ID
			City: '', // Prize city
			BetShop: '', // Prize bet shop
		};
		let pagePrize: string = '1'; // Current page for prizes
		let reloadForm: boolean = true; // Flag to indicate if the form should be reloaded
		return {
			config,
			emitter,
			appComponent,
			refreshBalance,
			loyalty,
			bonuses,
			base64,
			base64Download,
			showModalPrint,
			showModalPrize,
			itemSelect,
			loadingForm,
			titleForm,
			textDownForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			widthForm,
			prize,
			pagePrize,
			reloadForm,
			onModal,
			title,
			message,
			bonusItem,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.acceptModal();
		});
		if (
			this.config.loyalty[this.appComponent.country] == undefined ||
			!this.config.loyalty[this.appComponent.country]
		) {
			router.push('/'); // Redirecting to home if loyalty config is not found
		}
		if (
			(this.config.shopBonus2 !== undefined && !this.config.shopBonus2) ||
			this.config.shopBonus2 == undefined
		) {
			this.initShopBonuses(); // Initializing shop bonuses
			if (this.appComponent.session.logueado) {
				this.initMyLoyalty(); // Initializing loyalty if user is logged in
			}
		}
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning the initial model
	},
	methods: {
		closeModal() {
			this.appComponent.closeModal(); // Closing the modal
		},
		acceptModal() {
			const vthis = this; // Storing reference to 'this'
			if (
				this.appComponent.modal.orderModal == 'activate_bonuses' &&
				!this.appComponent.disabledButtonForm
			) {
				let params = {
					bonusId: this.itemSelect.id, // Parameters for activating bonuses
				};
				this.appComponent.disabledButtonForm = true; // Disabling the button to prevent multiple submissions
				apiService
					.request('activate_bonuses', params) // Making API request to activate bonuses
					.then((response: any) => {
						let successMessage = this.$t('¡Regalo Activado!'); // Default success message when the gift is activated

						if (response.data && response.data.LoyaltyType !== undefined && response.data.LoyaltyType !== null) { // Validate that response data exists and LoyaltyType is defined
							if (Number(response.data.LoyaltyType) === 0) { // Check if LoyaltyType corresponds to sports betting
								successMessage = this.$t(
									'¡Canje exitoso! Tu premio ya está disponible. Dirígete a la sección apuestas deportivas y realiza tu pronóstico favorito.'
								); // Message shown when the reward is for sports betting
							} else {
								successMessage = this.$t(
									'¡Canje exitoso! Tu premio ya está disponible. Dirígete al juego seleccionado y encontrarás tus giros cargados.'
								); // Message shown when the reward is for casino or other games
							}
						}

						if (response.code == 0) { // Validate that the operation was successful
							this.appComponent.modal = {
								showModal: 'notification', // Indicates the modal type to be displayed
								titleModal: this.$t('Mensaje'), // Modal title text
								messageModal: successMessage, // Dynamic success message based on loyalty type
								buttonModal: this.$t('Aceptar'), // Text for the modal action button
								orderModal: 'closeModal', // Action to close the modal when the button is pressed
							};
							vthis.refreshBalance(); // Refreshing balance
							vthis.initShopBonuses(); // Re-initializing shop bonuses
							vthis.initMyLoyalty(); // Re-initializing loyalty
							if (
								response.data.pdf != undefined &&
								response.data.pdf != '' &&
								response.data.pdf != null
							) {
								vthis.base64 =
									'data:application/pdf;base64,' +
									response.data.pdf; // Setting base64 for PDF
								vthis.base64Download = response.data.pdf; // Setting base64 for download
								vthis.showModalPrint = true; // Showing print modal
							}
						} else {
							var error_mensaje = ''; // Variable to hold error message
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString() // Setting error message based on error code
								);
							}

							if (response.msg != undefined) {
								error_mensaje = response.msg;
							}

							if (error_mensaje == '') {
								error_mensaje = this.$t(
									'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
								);
							}
							this.appComponent.modal = {
								showModal: 'notification', // Showing notification modal for error
								titleModal: this.$t('Error!'), // Title for error modal
								messageModal: error_mensaje, // Error message
								buttonModal: this.$t('Aceptar'), // Button text for modal
								orderModal: 'closeModal', // Order for modal action
							};
						}
					});
			}
			this.appComponent.closeModal(); // Closing the modal
			this.showModalPrize = false; // Hiding prize modal
		},
		initMyLoyalty() {
			apiService.request('my_loyalty', {}).then((response: any) => {
				if (response.code == 0) {
					this.loyalty = response.data.loyalty; // Setting loyalty data from response
				}
			});
		},
		initShopBonuses() {
			apiService
				.request('shop_bonuses', { Country: this.appComponent.country }) // Requesting shop bonuses based on country
				.then((response: any) => {
					if (response.code == 0) {
						this.bonuses = response.data; // Setting bonuses from response
						this.bonuses.sort(
							(a: any, b: any) => a.level - b.level // Sorting bonuses by level
						);
					}
				});
		},
		reedm(bonus) {
			if (this.appComponent.session.logueado) {
				// Checking if user is logged in
				if (bonus.state == 2 && !(bonus.level > this.loyalty.level)) {
					// Checking bonus state and loyalty level
					if (bonus.betshopown) {
						this.prize = {
							Id: '', // Resetting prize ID
							City: '', // Resetting prize city
							BetShop: '', // Resetting prize bet shop
						};
						apiService
							.request('get_betshops_prizes', {}) // Requesting betshops prizes
							.then((response: any) => {
								if (response.code == 0) {
									for (
										var i = 0;
										i < response.data.length;
										i++
									) {
										response.data[i].value =
											response.data[i].Id; // Setting value for select options
										response.data[i].name =
											response.data[i].Name; // Setting name for select options
									}
									Object.assign(this.arraySelects, {
										cityList: response.data, // Assigning city list to arraySelects
									});
									this.loadingForm = true; // Indicating form is loading
									this.showModalPrize = true; // Showing prize modal
									this.loadingForm = true; // Indicating form is loading
									this.prize.Id = bonus.id; // Setting prize ID
								}
							});
					} else {
						this.appComponent.modal = {
							showModal: 'notification', // Showing notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t('Desea reclamar regalo?'), // Message for the modal
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'activate_bonuses', // Order for modal action
						};
						this.itemSelect = bonus; // Setting selected item
					}
				} else {
					if (bonus.state == 1) {
						this.appComponent.modal = {
							showModal: 'notification', // Showing notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'No cuentas con los puntos necesarios para redimir este premio' // Message for insufficient points
							),
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
					}
				}
			} else {
				this.appComponent.showModalLogin = true; // Showing login modal if user is not logged in
			}
		},
		activatebonuses(bonus) {
			this.title = this.$t('¿Confirmar compra?'); // Setting title for confirmation modal
			this.onModal = true; // Indicating that a modal is open
			this.bonusItem = bonus; // Setting the bonus item for activation
		},
		onSubmit(values) {
			values.bonusId = this.prize.Id; // Adding prize ID to submitted values
			values.Form = this.pagePrize; // Adding current page to submitted values
			if (this.pagePrize == '1') {
				values.betShop = values.BetShop; // Adding bet shop to submitted values if on page 1
			}
			apiService
				.request('activate_bonuses', values) // Making API request to activate bonuses
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification', // Showing notification modal
							titleModal: this.$t('OK!'), // Title for the modal
							messageModal:
								response.freeSpin != undefined &&
									response.freeSpin
									? this.$t(
										'Premio desbloqueado, será cargado en las próximas 12 horas.' // Message for successful activation
									)
									: this.$t('¡Regalo Activado!'), // Message for successful activation
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
						this.refreshBalance(); // Refreshing balance
						this.initShopBonuses(); // Re-initializing shop bonuses
						this.initMyLoyalty(); // Re-initializing loyalty
						if (
							response.data.pdf != undefined &&
							response.data.pdf != '' &&
							response.data.pdf != null
						) {
							this.base64 =
								'data:application/pdf;base64,' +
								response.data.pdf; // Setting base64 for PDF
							this.base64Download = response.data.pdf; // Setting base64 for download
							this.showModalPrint = true; // Showing print modal
						}
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Setting error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Showing notification modal for error
							titleModal: this.$t('Error!'), // Title for error modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
					}
					this.pagePrize = '1'; // Resetting page prize to 1
					this.fields =
						this.config != undefined &&
							this.config.loyalty != undefined &&
							this.config.loyalty.form != undefined &&
							this.config.loyalty.form[
							this.appComponent['country']
							] != undefined
							? this.config.loyalty.form[
							this.appComponent['country']
							] // Setting fields based on country
							: [];
					this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Resetting model to initial state
				});
		},
	},
});
</script>
<template>
	<!-- Modal container that appears based on the onModal state -->
	<div v-if="onModal" class="modal bg-transparent z-[999999999]">
		<!-- Inner modal content with styling and layout -->
		<div
			class="relative container-general w-4/5 sm:w-1/4 bg-base-300/95 rounded-xl border-3 border-accent shadow-[0px_0px_12px] shadow-success p-10 flex flex-col gap-y-6 justify-center items-center">
			<!-- Close button for the modal, visible only in specific layout -->
			<label v-if="config.layout != undefined && config.layout == 3" @click="onModal = false"
				class="absolute text-xs top-3 right-2 hover:scale-105 z-1 cursor-pointer">
				<ExitIcon :height="23" :width="23" :fill="'#ffffff'" :fill2="'#ee3b3f'" />
			</label>
			<!-- Title of the modal, translated using $t -->
			<h3 class="text-center text-neutral font-poppinssb" v-t>
				{{ $t(title) }}
			</h3>
			<!-- Message displayed in the modal if it is not empty -->
			<p v-if="message != ''" class="text-center text-neutral font-poppinssl" v-t>
				{{ $t(message) }}
			</p>
			<!-- Button container for actions -->
			<div class="flex w-full gap-x-7 justify-center items-center">
				<!-- Accept button that triggers reedm function and closes the modal -->
				<button @click="(reedm(bonusItem), (onModal = false))"
					class="text-neutral px-6 py-2 rounded-xl uppercase mt-4 bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105"
					v-t>
					{{ $t('Aceptar') }}
				</button>
				<!-- Reject button that simply closes the modal -->
				<button @click="onModal = false"
					class="text-neutral px-6 py-2 rounded-xl uppercase mt-4 bg-gradient-to-t from-[#652b2b] to-[#af1919] border-1 border-solid border-red-700 hover:scale-105"
					v-t>
					{{ $t('Rechazar') }}
				</button>
			</div>
		</div>
	</div>
	<!-- Article element for displaying each bonus item -->
	<article v-for="bonus in data" :key="bonus.id"
		class="w-[300px] flex flex-col justify-between items-center gap-4 hover:scale-[1.03] cursor-pointer">
		<!-- CARD -->
		<div
			class="w-full min-h-[370px] h-full flex flex-col items-center rounded-2xl bg-base-300 shadow-lg shadow-neutral-content/50">

			<!-- IMAGEN ARRIBA -->
			<div class="relative w-full">
				<img :src="bonus.image" class="w-full h-[280px] object-cover rounded-t-2xl" />
			</div>

			<!-- TITULO -->

			<div class="h-auto w-full text-info text-lg font-bold flex justify-center items-center rounded-t-2xl p-2"
				:class="[
					{
						'':
							bonus.state == 2 ||
							!appComponent.session.logueado ||
							(!appComponent.session.logueado && bonus.state == 1) ||
							bonus.state == 5,
					},
					{
						'bg-base-300':
							(bonus.state == 1 && appComponent.session.logueado) ||
							bonus.state == 3 ||
							bonus.state == 4,
					},
				]">
				<span class="text-neutral">{{ $t(bonus.title) }}</span>
			</div>
			<!-- BOTÓN -->
			<button @click="
				bonus.state !== 1
					? activatebonuses(bonus)
					: null
				" :disabled="appComponent.disabledButtonForm" class="w-36 h-10 flex items-center justify-center gap-2 
        text-base font-bold text-neutral px-4 uppercase rounded-xl" :class="{
			'bttn-noClaim': bonus.state == 2 || bonus.state == 5,
			'bttn-claim': bonus.state == 1,
			'bg-error': bonus.state == 1,

			'bg-success': bonus.state != 1
		}">


				<!-- ICONO -->
				<img class="w-5 h-5 object-contain" :src="(bonus.state == 2 || !appComponent.session.logueado)
					? 'https://images.virtualsoft.tech/m/msjT1686100632.png'
					: (bonus.state == 1 && appComponent.session.logueado)
						? 'https://images.virtualsoft.tech/m/msjT1686141894.png'
						: 'https://images.virtualsoft.tech/m/msjT1686861732.png'
					" />

				{{ bonus.state == 1 ? 'Bloqueado' : $t('Reclamar') }}
			</button>
			<span class="w-32 h-7  flex justify-center items-center font-light text-neutral text-neutral">
				{{ bonus.points }} Puntos
			</span>
		</div>

	</article>

</template>

<!-- FILE DOCUMENTED -->

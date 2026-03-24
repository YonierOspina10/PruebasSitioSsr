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
							titleModal: this.$t('Mensaje'), // Title for the modal
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
		class="in w-[300px] flex flex-col justify-between items-center gap-4 hover:scale-[1.03] cursor-pointer">
		<!-- Container for bonus item details -->
		<div
			class="w-full min-h-[370px] h-full flex flex-col justify-center items-center rounded-2xl bg-base-300 shadow-lg shadow-neutral-content/50">
			<!-- Header for bonus item with dynamic background based on state -->
			<div class="h-auto w-full text-info text-lg font-bold flex justify-center items-center rounded-t-2xl p-2"
				:class="[
					{
						'bg-success':
							bonus.state == 2 ||
							!appComponent.session.logueado ||
							(!appComponent.session.logueado &&
								bonus.state == 1) ||
							bonus.state == 5,
					},
					{
						'bg-base-300':
							(bonus.state == 1 &&
								appComponent.session.logueado) ||
							bonus.state == 3 ||
							bonus.state == 4,
					},
				]">
				<!-- Title of the bonus item, translated using $t -->
				<span class="text-neutral">{{ $t(bonus.title) }}</span>
			</div>
			<!-- Container for bonus item image and points -->
			<div class="relative w-full h-auto">
				<!-- Points display overlay -->
				<div
					class="absolute top-0 w-full flex justify-center items-center py-2 bg-base-100 shadow-sm shadow-neutral-content z-10">
					<!-- AQUI ES LO DE GANAPLAY -->
					<span
						class="w-32 h-7 rounded-xl flex justify-center items-center font-semibold text-base bg-base-200 border-1 border-neutral text-neutral">{{
							bonus.points }} Puntos</span>
				</div>
				<!-- Image of the bonus item -->
				<div class="w-[300px] h-[280px] flex justify-end items-end">
					<img :src="bonus.image" alt=""
						class="w-full h-[calc(100%-38px)] object-center max-h-full absolute ml-1" />
				</div>
			</div>
			<!-- Subtitle for the bonus item -->
			<div
				class="h-full w-full text-neutral text-sm flex justify-center items-center text-center rounded-b-2xl p-2">
				<span>{{ $t(bonus.subTitle) }}</span>
			</div>
		</div>
		<!-- Footer for bonus item with action buttons -->
		<div class="h-16 w-full flex justify-between items-center px-4 rounded-full bg-base-200" :class="[
			{
				'unlock ':
					bonus.state == 2 ||
					!appComponent.session.logueado ||
					(!appComponent.session.logueado && bonus.state == 1) ||
					bonus.state == 5,
			},
			{
				'border-3 border-solid border-graycontent':
					(bonus.state == 1 && appComponent.session.logueado) ||
					bonus.state == 3 ||
					bonus.state == 4,
			},
		]">
			<!-- Container for bonus state indicator and text -->
			<div class="w-full flex items-center gap-2" :class="bonus.state == 2 ||
				!appComponent.session.logueado ||
				(!appComponent.session.logueado && bonus.state == 1)
				? 'justify-start'
				: 'justify-center'
				">
				<!-- Dynamic image based on bonus state -->
				<div class="w-8 h-8 mb-2">
					<img v-if="
						bonus.state == 2 ||
						!appComponent.session.logueado ||
						(!appComponent.session.logueado && bonus.state == 1)
					" src="https://images.virtualsoft.tech/m/msjT1686100632.png" alt=""
						class="w-full h-full object-contain object-center" />
					<img v-if="appComponent.session.logueado && bonus.state == 1"
						src="https://images.virtualsoft.tech/m/msjT1686141894.png" alt=""
						class="w-full h-full object-contain object-center" />
					<img v-if="
						bonus.state == 3 ||
						bonus.state == 4 ||
						bonus.state == 5
					" src="https://images.virtualsoft.tech/m/msjT1686861732.png" alt=""
						class="w-full h-full object-contain object-center" />
				</div>
				<!-- Text indicating the current state of the bonus -->
				<div class="text-neutral text-base flex justify-center items-center uppercase font-normal">
					{{
						bonus.state == 1 && appComponent.session.logueado
							? $t('Bloqueado')
							: bonus.state == 2 || !appComponent.session.logueado
								? $t('Desbloqueado')
								: bonus.state == 2 ||
									(!appComponent.session.logueado &&
										bonus.state == 1)
									? $t('Reclamar')
									: bonus.state == 3
										? $t('Reclamado')
										: bonus.state == 4
											? $t('Gastado')
											: bonus.state == 5
												? $t('Entregado')
												: ''
					}}
				</div>
			</div>
			<!-- Claim button for the bonus, conditionally rendered -->
			<button v-if="
				bonus.state == 2 ||
				!appComponent.session.logueado ||
				(!appComponent.session.logueado && bonus.state == 1)
			" @click="
				activatebonuses(bonus);
			appComponent.gAnalytics('store_awards', bonus);
			" :disabled="appComponent.disabledButtonForm" class="w-36 h-10 text-base font-bold text-neutral px-4 uppercase"
				:class="[
					{ 'bttn-noClaim': bonus.state == 2 || bonus.state == 5 },
					{ 'bttn-claim': bonus.state == 1 },
				]">
				{{ $t('Reclamar') }}
			</button>
		</div>
	</article>
</template>
<style scoped>
.bttn-noClaim {
	/* Button style for 'no claim' state with a gradient background */
	background: linear-gradient(180deg,
			#646464 0%,
			#7b7b7b 11.84%,
			#575757 25.1%,
			#444444 79.69%,
			#3c3c3c 100%);
	border: 1px solid #646464;
	/* Border color matching the gradient */
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	/* Subtle shadow for depth */
	border-radius: 10px;
	/* Rounded corners */
}

.bttn-claim {
	/* Button style for 'claim' state with a green gradient background */
	background: linear-gradient(180deg,
			#00ad35 0%,
			#06c140 10.94%,
			#00a332 23.96%,
			#008a2a 85.42%,
			#026821 100%);
	border: 1px solid #00ad35;
	/* Border color matching the gradient */
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	/* Subtle shadow for depth */
	border-radius: 10px;
	/* Rounded corners */
}

.unlock {
	/* Style for unlock button with a translucent white background */
	background: rgba(255, 255, 255, 0.1);
	box-shadow:
		0px 0px 8px 5px rgba(0, 173, 53, 0.5),
		/* Green shadow for emphasis */
		7px 11px 20px rgba(0, 0, 0, 0.25);
	/* Subtle shadow for depth */
	border-radius: 31px;
	/* Rounded corners */
}

.puntos {
	/* Style for points display with a light gradient background */
	border: 1px solid #ffffff;
	/* White border */
	border-radius: 10px;
	/* Rounded corners */
}

.title {
	/* Title style with a gradient background and shadow */
	background: linear-gradient(270deg,
			rgba(38, 42, 58, 0) 0%,
			#495170 21.07%,
			#495170 50%,
			#495170 82.9%,
			rgba(38, 42, 58, 0.26) 100%);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	/* Shadow for depth */
}

img {
	/* Centered image display */
	display: block;
	margin-right: auto;
	margin-left: auto;
}

.myContainer [aria-describedby='list_progress'] {
	/* Padding for elements with specific aria attribute */
	padding: 1px 3px !important;
	vertical-align: middle;
	/* Aligns vertically in the middle */
}

img.bonuse-img {
	/* Responsive bonus image */
	max-width: 100%;
	/* Ensures image does not exceed container width */
}

.list:hover {
	/* Scale effect on hover for list items */
	transform: scale(1.04);
	/* Slightly enlarges the item */
}

.list {
	/* Style for list items with a white background */
	width: auto;
	/* Automatic width */
	height: auto;
	/* Automatic height */
	background: white;
	/* White background */
	display: inline-block;
	/* Inline block display */
	margin-right: 0;
	/* No right margin */
	border-radius: 9px;
	/* Rounded corners */
	overflow: hidden;
	/* Hides overflow content */
	transition: transform 0.2s;
	/* Smooth transition for hover effect */
	cursor: pointer;
	/* Pointer cursor on hover */
}

.black-filter {
	/* Grayscale filter for black and white effect */
	-webkit-filter: grayscale(100%);
	/* For WebKit browsers */
	filter: grayscale(100%);
	/* Standard filter */
}

.claim {
	/* Style for claim button */
	background: white;
	/* White background */
	color: #832a8c;
	/* Text color */
	font-weight: bold;
	/* Bold text */
	text-align: center;
	/* Centered text */
	padding: 5px 10px;
	/* Padding around text */
	height: 35px;
	/* Fixed height */
	display: block;
	/* Block display */
	line-height: 8px;
	/* Line height */
	border-radius: 29px;
	/* Rounded corners */
	margin-top: 10px;
	/* Top margin */
}

.list span.state {
	/* State indicator within list items */
	width: 100%;
	/* Full width */
	display: block;
	/* Block display */
	text-align: center;
	/* Centered text */
	background: black;
	/* Black background */
	color: white;
	/* White text */
	position: relative;
	/* Relative positioning */
	font-size: 11px;
	/* Font size */
	padding: 2px 5px;
	/* Padding */
}

.list span.title {
	/* Title within list items */
	display: block;
	/* Block display */
	text-align: center;
	/* Centered text */
	padding: 5px 10px;
	/* Padding */
	line-height: 13px;
	/* Line height */
	color: white;
	/* White text */
	padding: 10px;
	/* Padding */
	font-weight: bold;
	/* Bold text */
	overflow: hidden;
	/* Hides overflow content */
	background: #269c2a;
	/* Green background */
}

.list span.subTitle {
	/* Subtitle within list items */
	display: block;
	/* Block display */
	text-align: center;
	/* Centered text */
	padding: 5px 10px;
	/* Padding */
	overflow: hidden;
	/* Hides overflow content */
	color: #333;
	/* Dark gray text */
	height: auto;
	/* Automatic height */
	font-size: 13px;
	/* Font size */
}

.list span.content-test-1 {
	/* Content test 1 within list items */
	display: block;
	/* Block display */
	text-align: left;
	/* Left-aligned text */
	padding: 5px 10px;
	/* Padding */
	line-height: 13px;
	/* Line height */
	color: black;
	/* Black text */
	padding-bottom: 10px;
	/* Bottom padding */
	overflow: hidden;
	/* Hides overflow content */
	font-size: 16px;
	/* Font size */
}

.list span.content-test-2 {
	/* Content test 2 within list items */
	text-align: left;
	/* Left-aligned text */
	padding: 5px 10px;
	/* Padding */
	line-height: 13px;
	/* Line height */
	color: #57b75f;
	/* Green text */
	padding-bottom: 10px;
	/* Bottom padding */
	overflow: hidden;
	/* Hides overflow content */
	font-size: 16px;
	/* Font size */
}

.list:hover span.title {
	/* Expand title on hover */
	height: auto;
	/* Automatic height */
	overflow: auto;
	/* Allows overflow */
}

button.my-button-redimed {
	/* Style for a specific button with a green background */
	background: #269c2a !important;
	/* Green background */
}

.myContainer {
	/* Container for grid layout with three columns */
	height: auto;
	/* Automatic height */
	overflow: visible;
	/* Visible overflow */
	display: grid;
	/* Grid display */
	grid-template-columns: 1fr 1fr 1fr;
	/* Three equal columns */
	grid-gap: 25px;
	/* Gap between grid items */
	width: auto;
	/* Automatic width */
	margin-left: auto;
	/* Center alignment */
	margin-right: auto;
	/* Center alignment */
}

.myContainer-nl {
	/* Container for grid layout with four columns */
	height: auto;
	/* Automatic height */
	overflow: visible;
	/* Visible overflow */
	display: grid;
	/* Grid display */
	grid-template-columns: 1fr 1fr 1fr 1fr;
	/* Four equal columns */
	grid-gap: 25px;
	/* Gap between grid items */
	width: auto;
	/* Automatic width */
	margin-left: auto;
	/* Center alignment */
	margin-right: auto;
	/* Center alignment */
}

@media (max-width: 768px) {
	.myContainer {
		/* Responsive adjustments for smaller screens */
		height: 100%;
		/* Full height */
		display: grid;
		/* Grid display */
		grid-template-columns: repeat(1, auto);
		/* Single column layout */
		grid-gap: 20px;
		/* Gap between grid items */
		width: 100%;
		/* Full width */
		margin-left: auto;
		/* Center alignment */
		margin-right: auto;
		/* Center alignment */
	}
}

img.lvl-reg-img {
	/* Level registration image with a max height */
	max-height: 50px;
	/* Limits height */
}

button.button-lock.my-button-disabled {
	/* Disabled button style with gray background */
	background: #dadada;
	/* Light gray background */
	color: rgb(138, 134, 154);
	/* Gray text color */
}

span.cant {
	/* Style for a specific span element with a white background */
	display: block;
	/* Block display */
	margin: 5px auto;
	/* Centered with margin */
	border-radius: 15px;
	/* Rounded corners */
	text-align: center;
	/* Centered text */
	background: white;
	/* White background */
	color: #269c2a;
	/* Green text */
	font-weight: bold;
	/* Bold text */
	width: calc(100% - 25px);
	/* Full width minus margin */
	height: 50px;
	/* Fixed height */
	font-size: 18px;
	/* Font size */
	line-height: 45px;
	/* Line height */
	border-width: 2px;
	/* Border width */
	border-style: solid;
	/* Solid border */
	border-color: #269c2a;
	/* Green border color */
	margin-top: 9px;
	/* Top margin */
}

button.button-lock {
	/* Style for lock button */
	background: #832a8c;
	/* Purple background */
	width: 100%;
	/* Full width */
	padding: 10px 25px;
	/* Padding */
	color: white;
	/* White text */
}

.fontawesomeicon {
	/* Font Awesome icon style */
	float: left;
	/* Floats to the left */
	font-size: 19px;
	/* Font size */
}

span.lvl-req {
	/* Style for level requirement text */
	font-weight: bold;
	/* Bold text */
}

#myBarBonos {
	/* Progress bar for bonuses */
	width: 1%;
	/* Initial width */
	height: 18px;
	/* Fixed height */
	background-color: #57b75f;
	/* Green background */
	border-radius: 0 15px 15px 0;
	/* Rounded corners on the right */
}

.myBarBn {
	/* Another progress bar style */
	width: 1%;
	/* Initial width */
	height: 20px;
	/* Fixed height */
	background-color: #57b75f;
	/* Green background */
	border-radius: 0 15px 15px 0;
	/* Rounded corners on the right */
}

#myProgress {
	/* Background for progress bar */
	background-color: grey;
	/* Gray background */
	border-radius: 0 15px 15px 0;
	/* Rounded corners on the right */
}

.container-filter {
	/* Container for filter elements */
}

.filter {
	/* Style for filter buttons */
	display: inline-block;
	/* Inline block display */
	padding: 6px 0px;
	/* Padding */
	border-radius: 5px;
	/* Rounded corners */
	font-size: 13px;
	/* Font size */
	width: 100%;
	/* Full width */
}

span.filters-section {
	/* Style for filter section spans */
	width: 100%;
	/* Full width */
	display: inline-block;
	/* Inline block display */
	padding-right: 10px;
	/* Right padding */
}

strong {
	/* Style for strong text */
	padding-left: 0;
	/* No left padding */
}

span.filters-section:last-child {
	/* Last filter section span adjustment */
	padding-left: 10px;
	/* Left padding */
}

select {
	/* Style for select dropdowns */
	padding: 5px 6px;
	/* Padding */
	border-radius: 3px;
	/* Rounded corners */
	color: grey;
	/* Gray text color */
	width: 100%;
	/* Full width */
}

label {
	/* Style for labels */
	padding-right: 8px;
	/* Right padding */
}

.my-button {
	/* General button style */
	margin: 20px;
	/* Margin around button */
}

.my-button-disabled {
	/* Disabled button style */
	--color-base: black !important;
	/* Overrides base color */
}

.container-contact100-form-btn {
	/* Container for contact form buttons */
	display: -webkit-box;
	/* Flexbox display for older browsers */
	display: -webkit-flex;
	/* Flexbox display for older browsers */
	display: -moz-box;
	/* Flexbox display for older browsers */
	display: -ms-flexbox;
	/* Flexbox display for older browsers */
	display: flex;
	/* Flexbox display */
	flex-wrap: wrap;
	/* Allows wrapping of items */
	justify-content: center;
	/* Center items */
	padding: 20px;
	/* Padding around container */
}

.wrap-contact100-form-btn {
	/* Wrapper for contact form button */
	width: 100%;
	/* Full width */
	display: block;
	/* Block display */
	position: relative;
	/* Relative positioning */
	z-index: 1;
	/* Stacking order */
	border-radius: 25px;
	/* Rounded corners */
	overflow: hidden;
	/* Hides overflow content */
	margin: 0 auto;
	/* Center alignment */
}

.contact100-form-bgbtn {
	/* Background button for contact form */
	position: absolute;
	/* Absolute positioning */
	z-index: -1;
	/* Behind other elements */
	width: 300%;
	/* Wide background */
	height: 100%;
	/* Full height */
	background: -webkit-linear-gradient(left,
			#4caf50,
			#5d5d5d,
			#b48500,
			#5d5d5d);
	/* Gradient background */
	top: 0;
	/* Aligns to the top */
	left: -100%;
	/* Starts off-screen */
	-webkit-transition: all 0.4s;
	/* Smooth transition */
	-o-transition: all 0.4s;
	/* Smooth transition */
	-moz-transition: all 0.4s;
	/* Smooth transition */
	transition: all 0.4s;
	/* Smooth transition */
}

.contact100-form-btn {
	/* Style for contact form button */
	display: -webkit-box;
	/* Flexbox display for older browsers */
	display: -webkit-flex;
	/* Flexbox display for older browsers */
	display: -moz-box;
	/* Flexbox display for older browsers */
	display: -ms-flexbox;
	/* Flexbox display for older browsers */
	display: flex;
	/* Flexbox display */
	justify-content: center;
	/* Center items */
	align-items: center;
	/* Center items vertically */
	padding: 0 20px;
	/* Padding */
	width: 100%;
	/* Full width */
	height: 50px;
	/* Fixed height */
	font-family: Poppins-Medium;
	/* Font family */
	font-size: 16px;
	/* Font size */
	color: #fff;
	/* White text */
	line-height: 1.2;
	/* Line height */
}

.contact100-form-btn i {
	/* Icon style within contact form button */
	-webkit-transition: all 0.4s;
	/* Smooth transition */
	-o-transition: all 0.4s;
	/* Smooth transition */
	-moz-transition: all 0.4s;
	/* Smooth transition */
	transition: all 0.4s;
	/* Smooth transition */
}

.contact100-form-btn:hover i {
	/* Icon movement on button hover */
	-webkit-transform: translateX(10px);
	/* Moves icon right */
	-moz-transform: translateX(10px);
	/* Moves icon right */
	-ms-transform: translateX(10px);
	/* Moves icon right */
	-o-transform: translateX(10px);
	/* Moves icon right */
	transform: translateX(10px);
	/* Moves icon right */
}

.wrap-contact100-form-btn:hover .contact100-form-bgbtn {
	/* Background button movement on hover */
	left: 0;
	/* Moves background into view */
}
</style>

<!-- FILE DOCUMENTED -->

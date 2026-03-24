<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'; // Importing ArrowDownIcon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import BonuseCardsV2 from '@/components/BonuseCardsV2.vue'; // Importing BonuseCards component
import ArrowBack from '@/components/icons/ArrowBack.vue'; // Importing ArrowBack component
import apiService from '@/services/ApiService'; // Importing apiService for API calls
import promotionsCategoryCards from '@/components/PromotionsCategoryCards.vue'; // Importing PromotionsCategoryCards component
import IconArrow2 from '@/components/icons/IconArrow2.vue';

export default defineComponent({
	computed: {
		// Computed property to return promotionsCategoryCards component
		promotionsCategoryCards() {
			return promotionsCategoryCards;
		},
	},
	components: {
		// Registering components used in this component
		ArrowBack,
		ExitIcon,
		ArrowDownIcon,
		BonuseCardsV2,
		IconArrow2
	},
	data() {
		// Data function to initialize component state
		let config: any = this.$config(); // Configuration object
		let appComponent: any = this.$appComponent; // Application component reference
		let emitter: any = this.$emitter(); // Event emitter
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let skeleton: boolean = false; // Loading state
		let freeBets: any = []; // Array to hold free bets
		let categoryCasino: any = []; // Array for casino categories
		let physicalPrize: any = []; // Array for physical prizes
		let casinofreeSpins: any = []; // Array for casino free spins
		let onModal: boolean = false; // Modal visibility state
		let base64: string = ''; // Base64 string for PDF
		let base64Download: string = ''; // Base64 string for download
		let showModalPrint: boolean = false; // Print modal visibility state
		let title: string = ''; // Title for modal
		let message: string = ''; // Message for modal
		let bonusItem: any = {}; // Selected bonus item
		let loyalty: any = {}; // Loyalty information
		let bonusView: boolean = false; // Bonus view state
		let titleViewBonus: string = ''; // Title for bonus view
		let bonus: object = []; // Array for bonuses
		let prize: any = {
			Id: '', // Prize ID
			City: '', // Prize city
			BetShop: '', // Bet shop name
		};
		const categoryId = this.$route.params.categoryId; // Category ID from route parameters
		return {
			// Returning data properties
			config,
			appComponent,
			emitter,
			refreshBalance,
			freeBets,
			physicalPrize,
			casinofreeSpins,
			onModal,
			base64,
			base64Download,
			showModalPrint,
			title,
			message,
			bonusItem,
			loyalty,
			bonusView,
			titleViewBonus,
			bonus,
			skeleton,
			prize,
			categoryId,
		};
	},
	unmounted() {
		// Cleanup when component is unmounted
		this.emitter.all.delete('accept:modal'); // Remove event listener
	},
	mounted() {
		// Lifecycle hook when component is mounted
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Accept modal event
		});
		this.initBonuses(); // Initialize bonuses
		// Initialize category bonuses based on configuration
		if (
			this.config != undefined &&
			this.config.categoryBonosLoyalty_ != undefined
		) {
			this.config.categoryBonosLoyalty_.forEach((item) => {
				item.open = false; // Set open state to false
			});
		} else if (
			this.config != undefined &&
			this.config.categoryBonosLoyalty != undefined &&
			this.config.categoryBonosLoyalty[this.appComponent.country] !=
			undefined
		) {
			this.config.categoryBonosLoyalty[this.appComponent.country].forEach(
				(item) => {
					item.open = false; // Set open state to false
				}
			);
		}
		if (this.appComponent.session.logueado) {
			this.initMyLoyalty(); // Initialize loyalty if logged in
		}
	},
	methods: {
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Call closeModal on appComponent
		},
		acceptModal() {
			// Method to accept modal actions
			if (
				this.appComponent.modal.orderModal == 'activate_bonuses' &&
				!this.appComponent.disabledButtonForm &&
				((this.config.shopBonus2 !== undefined &&
					!this.config.shopBonus2) ||
					this.config.shopBonus2 == undefined)
			) {
				this.activeteBonus(); // Activate bonus if conditions are met
			}
			this.closeModal(); // Close the modal
		},
		initBonuses() {
			// Method to initialize bonuses
			this.skeleton = true; // Set loading state
			apiService
				.request('shop_bonuses', { Country: this.appComponent.country }) // API request for shop bonuses
				.then((respose) => {
					if (respose.code == 0) {
						// Check response code
						respose.data.forEach((bono) => {
							// Categorize bonuses
							if (bono.category == 0) {
								this.casinofreeSpins.push(bono); // Add to casino free spins
							} else if (bono.category == 1) {
								this.freeBets.push(bono); // Add to free bets
							} else if (bono.category == 2) {
								this.physicalPrize.push(bono); // Add to physical prizes
							}
						});
						// Initialize loyalty categories based on configuration
						if (
							this.config != undefined &&
							this.config.categoryBonosLoyalty_
						) {
							this.config.categoryBonosLoyalty_.forEach(
								(category) => {
									if (category.id == 1) {
										category.awards = this.freeBets; // Assign free bets
									} else if (category.id == 2) {
										category.awards = this.physicalPrize; // Assign physical prizes
									} else if (category.id == 3) {
										category.awards = this.casinofreeSpins; // Assign casino free spins
									}
									this.openViewBonus(category); // Open bonus view
								}
							);
						} else if (
							this.config != undefined &&
							this.config.categoryBonosLoyalty != undefined &&
							this.config.categoryBonosLoyalty[
							this.appComponent.country
							] != undefined
						) {
							this.config.categoryBonosLoyalty[
								this.appComponent.country
							].forEach((category) => {
								if (category.id == 1) {
									category.awards = this.freeBets; // Assign free bets
								} else if (category.id == 2) {
									category.awards = this.physicalPrize; // Assign physical prizes
								} else if (category.id == 3) {
									category.awards = this.casinofreeSpins; // Assign casino free spins
								}
								this.openViewBonus(category); // Open bonus view
							});
						}
						this.skeleton = false; // Reset loading state
					}
				});
		},
		initMyLoyalty() {
			// Method to initialize user's loyalty information
			apiService.request('my_loyalty', {}).then((response: any) => {
				if (response.code == 0) {
					this.loyalty = response.data.loyalty; // Set loyalty data
				}
			});
		},
		choseBonuse(bonus) {
			// Method to choose a bonus
			this.title = this.$t('¿Confirmar compra?'); // Set modal title
			this.onModal = true; // Show modal
			this.bonusItem = bonus; // Set selected bonus item
		},
		activeteBonus() {
			// Method to activate a bonus
			const vthis = this; // Preserve context
			let params = {
				bonusId: this.bonusItem.id, // Bonus ID parameter
			};
			this.appComponent.disabledButtonForm = true; // Disable button form
			apiService
				.request('activate_bonuses', params) // API request to activate bonuses
				.then((response: any) => {
					if (response.code == 0) {
						// Check response code
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('¡Premio canjeado!'), // Title for modal
							messageModal:
								response.freeSpin != undefined &&
									response.freeSpin
									? this.$t(
										'Premio desbloqueado, será cargado en las próximas 12 horas.'
									) // Message if free spin is available
									: this.$t(
										'Juégalo ahora. Revisa tu Inbox para saber cómo usarlo'
									), // Message if no free spin
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Order for modal action
						};
						vthis.refreshBalance(); // Refresh balance
						vthis.initBonuses(); // Reinitialize bonuses
						vthis.initMyLoyalty(); // Reinitialize loyalty
						if (
							response.data.pdf != undefined &&
							response.data.pdf != '' &&
							response.data.pdf != null
						) {
							vthis.base64 =
								'data:application/pdf;base64,' +
								response.data.pdf; // Set base64 for PDF
							vthis.base64Download = response.data.pdf; // Set base64 download
							vthis.showModalPrint = true; // Show print modal
						}
					} else {
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Set error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for modal
							messageModal: error_mensaje, // Set error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Order for modal action
						};
					}
				});
		},
		reedm(bonus) {
			// Method to redeem a bonus
			if (this.appComponent.session.logueado) {
				// Check if user is logged in
				if (bonus.state == 2 && !(bonus.level > this.loyalty.level)) {
					// Check bonus state and loyalty level
					if (bonus.betshopown) {
						this.prize = {
							Id: '', // Prize ID
							City: '', // Prize city
							BetShop: '', // Bet shop name
						};
						apiService
							.request('get_betshops_prizes', {}) // API request for betshop prizes
							.then((response: any) => {
								if (response.code == 0) {
									for (
										var i = 0;
										i < response.data.length;
										i++
									) {
										response.data[i].value =
											response.data[i].Id; // Set value for prize
										response.data[i].name =
											response.data[i].Name; // Set name for prize
									}
									this.prize.Id = bonus.id; // Set prize ID
								}
							});
					} else {
						if (
							this.config != undefined &&
							this.config.premio != undefined &&
							this.config.premio[this.appComponent.country] !=
							undefined &&
							this.config.premio[this.appComponent.country] ==
							true
						) {
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Mensaje'), // Title for modal
								messageModal: this.$t('Desea reclamar regalo?'), // Message for modal
								buttonModal: this.$t('Aceptar'), // Button text
								orderModal: 'activate_bonuses', // Order for modal action
							};
							this.bonusItem = bonus; // Set selected bonus item
						} else {
							this.bonusItem = bonus; // Set selected bonus item
							this.activeteBonus(); // Activate bonus
						}
					}
				} else {
					if (bonus.state == 1) {
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Title for modal
							messageModal: this.$t(
								'No cuentas con los puntos necesarios para redimir este premio' // Message for insufficient points
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Order for modal action
						};
					}
				}
			} else {
				this.appComponent.showModalLogin = true; // Show login modal if not logged in
			}
		},
		openViewBonus(category: any) {
			// Method to open view for a specific bonus category
			if (
				category.id === parseInt(this.categoryId) &&
				category.id === 1
			) {
				this.titleViewBonus = category.title; // Set title for bonus view
				this.bonus = this.freeBets; // Set bonuses to free bets
			}
			if (
				category.id === parseInt(this.categoryId) &&
				category.id === 2
			) {
				this.titleViewBonus = category.title; // Set title for bonus view
				this.bonus = this.physicalPrize; // Set bonuses to physical prizes
			}
			if (
				category.id === parseInt(this.categoryId) &&
				category.id === 3
			) {
				this.titleViewBonus = category.title; // Set title for bonus view
				this.bonus = this.casinofreeSpins; // Set bonuses to casino free spins
			}
		},
		onCloseModal() {
			// Method to handle modal close action
		},
	},
});
</script>
<template>
	<!-- Modal for bonus confirmation -->
	<div v-if="onModal" class="modal bg-transparent z-[999999999]">
		<div
			class="relative container-general w-4/5 sm:w-1/4 bg-secondary/95 rounded-xl border-3 border-success shadow-[0px_0px_12px] shadow-success p-10 flex flex-col gap-y-6 justify-center items-center">
			<!-- Exit button for modal -->
			<label v-if="config.layout != undefined && config.layout == 3" @click="onCloseModal"
				class="absolute text-xs top-3 right-2 hover:scale-105 z-1 cursor-pointer">
				<ExitIcon :height="23" :width="23" :fill="'#ffffff'" :fill2="'#ee3b3f'" />
			</label>
			<!-- Modal title -->
			<h3 class="text-center text-neutral font-poppinssb" v-t>
				{{ $t(title) }}
			</h3>
			<!-- Modal message -->
			<p v-if="message != ''" class="text-center text-neutral font-poppinssl" v-t>
				{{ $t(message) }}
			</p>
			<!-- Buttons for accepting or rejecting the bonus -->
			<div class="flex w-full gap-x-7 justify-center items-center">
				<button @click="reedm(bonusItem)"
					class="text-neutral px-6 py-2 rounded-xl uppercase mt-4 bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105"
					v-t>
					{{ $t('Aceptar') }}
				</button>
				<button @click="onCloseModal"
					class="text-neutral px-6 py-2 rounded-xl uppercase mt-4 bg-gradient-to-t from-[#652b2b] to-[#af1919] border-1 border-solid border-red-700 hover:scale-105"
					v-t>
					{{ $t('Rechazar') }}
				</button>
			</div>
		</div>
	</div>
	<!-- Background image and main content -->
	<div class="relative w-full h-full flex flex-col justify-center items-center">
		<div class="absolute in top-0 w-full h-full z-0">
			<!-- Background image based on configuration -->
			<img v-if="
				config != undefined &&
				config.shopBonuses != undefined &&
				config.shopBonuses.bg != undefined
			" :src="config.shopBonuses.bg" alt="" class="w-full h-full object-cover object-center" />
		</div>
		<!-- Main content area -->
		<div class="w-full flex flex-col justify-center items-center gap-16 z-10 max-w-[1300px] my-24">
			<div class="w-[80vw] flex flex-col gap-2 items-start">
				<!-- Botón regresar -->
				<button @click="$router.back()"
					class="flex items-center gap-2 text-neutral font-semibold hover:underline bg-secondary rounded-xl p-2">
					<IconArrow2 width="16" height="16" class="fill-neutral"/> {{ $t('Regresar') }}
				</button>

				<!-- Título principal -->
				<h2 class="text-neutral w-full flex justify-center items-center font-semibold">
					{{ $t('Canjea desde s/4 hasta s/2,000 en apuestas deportivas o de casino.') }}
				</h2>
			</div>
			<div class="w-[80vw] flex flex-col gap-8 items-center justify-center">
				<!-- Title for bonus view -->
				<h2
					class="in text-info text-xl md:text-3xl w-[80%] md:w-[50%] h-10 md:h-14 flex justify-center items-center font-semibold">
					{{ titleViewBonus }}
				</h2>
			</div>
			<!-- Grid for displaying bonus cards -->
			<div class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
				<BonuseCardsV2 :data="bonus" />
				<!-- Bonus cards component -->
			</div>
		</div>
	</div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

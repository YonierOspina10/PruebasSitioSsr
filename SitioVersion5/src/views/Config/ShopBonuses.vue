<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import router from '@/router'; // Importing router for navigation
import ShopBonuses2 from '@/views/Config/ShopBonuses2.vue'; // Importing ShopBonuses2 view

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
		ShopBonuses2, // Registering ShopBonuses2 component
	},
	data: function () {
		let config = this.$config(); // Getting configuration
		let emitter = this.$emitter(); // Getting event emitter
		let appComponent: any = this.$appComponent; // Getting application component
		let refreshBalance = this.$refreshBalance; // Getting refresh balance function
		let loyalty: any = {}; // Initializing loyalty object
		let bonuses: any = []; // Initializing bonuses array
		let base64: string = ''; // Initializing base64 string for PDF
		let base64Download: string = ''; // Initializing base64 download string
		let showModalPrint: boolean = false; // Flag for showing print modal
		let showModalPrize: boolean = false; // Flag for showing prize modal
		let itemSelect: any = {}; // Selected item object
		let loadingForm = true; // Flag for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text for the form
		let fields: any =
			this.$config() != undefined &&
			this.$config().loyalty != undefined &&
			this.$config().loyalty.form != undefined &&
			this.$config().loyalty.form[this.$appComponent['country']] !=
				undefined
				? this.$config().loyalty.form[this.$appComponent['country']]
				: []; // Fields for the form based on configuration
		let arraySelects: any = {}; // Object for select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for form
		let prize: any = {
			Id: '', // Prize ID
			City: '', // Prize city
			BetShop: '', // Prize bet shop
		};
		let pagePrize: string = '1'; // Current page for prize
		let reloadForm: boolean = true; // Flag for reloading form
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
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Set up event listener for modal acceptance
			this.acceptModal();
		});
		if (
			this.config.loyalty[this.appComponent.country] == undefined ||
			!this.config.loyalty[this.appComponent.country]
		) {
			router.push('/'); // Redirect if loyalty config is not defined
		}
		if (
			(this.config.shopBonus2 !== undefined && !this.config.shopBonus2) ||
			this.config.shopBonus2 == undefined
		) {
			this.initShopBonuses(); // Initialize shop bonuses
			if (this.appComponent.session.logueado) {
				this.initMyLoyalty(); // Initialize loyalty if logged in
			}
		}
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Clone initial model
	},
	methods: {
		closeModal() {
			this.appComponent.closeModal(); // Close modal function
		},
		acceptModal() {
			if (
				this.appComponent.modal.orderModal == 'activate_bonuses' &&
				!this.appComponent.disabledButtonForm
			) {
				this.activeteBonus(); // Activate bonus if conditions are met
			}
			this.appComponent.closeModal(); // Close modal
			this.showModalPrize = false; // Hide prize modal
		},
		activeteBonus() {
			const vthis = this; // Preserve context
			let params = {
				bonusId: this.itemSelect.id, // Bonus ID from selected item
				timeRequest: false, // Flag for time request
			};
			this.appComponent.disabledButtonForm = true; // Disable button form
			params.timeRequest = true; // Set time request to true
			apiService
				.request('activate_bonuses', params) // Request to activate bonuses
				.then((response: any) => {
					if (response.code == 0) {
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
										), // Message for using the prize
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
						vthis.refreshBalance(); // Refresh balance
						vthis.initShopBonuses(); // Initialize shop bonuses
						vthis.initMyLoyalty(); // Initialize loyalty
						if (
							response.data.pdf != undefined &&
							response.data.pdf != '' &&
							response.data.pdf != null
						) {
							vthis.base64 =
								'data:application/pdf;base64,' +
								response.data.pdf; // Set base64 for PDF
							vthis.base64Download = response.data.pdf; // Set download link for PDF
							vthis.showModalPrint = true; // Show print modal
						}
					} else if (response.code == 1811) {
						this.appComponent.disabledButtonForm = true; // Disable button form
						let timeLogin: any = localStorage.getItem('timeLogin'); // Get login time from local storage
						let valorNumber = parseInt(timeLogin); // Parse login time
						let sumMinutes = new Date(); // Create date object for sum
						sumMinutes.setTime(
							valorNumber + this.config.restrictionTime * 1000 // Set time for restriction
						);
						let interval = setInterval(() => {
							this.appComponent.count =
								sumMinutes.getTime() - new Date().getTime(); // Update countdown
							this.appComponent.disabledCount = true; // Disable countdown
							if (sumMinutes.getTime() <= new Date().getTime()) {
								this.appComponent.disabledCount = false; // Enable countdown
								this.appComponent.disabledButtonForm = false; // Enable button form
								clearInterval(interval); // Clear interval
							}
						}, 1000); // Update every second
					} else {
                        console.log(response.msg);
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Set error message based on error code
							);
						}
                        if (response.msg != undefined) {
                            error_mensaje = response.msg
                        }
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
					}
				});
		},
		changeSelect: function (event: any) {
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get options key
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Clone array selects
			if (optionsKey == 'cityList') {
				let betShops = arraySelects['cityList']
					.filter((x) => x.Id == value) // Filter bet shops by selected city
					.map((x) => x.BetShops)[0]; // Get bet shops for selected city
				betShops.forEach((betShop) => {
					betShop.value = betShop.Id; // Set value for bet shop
					betShop.name = betShop.Name; // Set name for bet shop
				});
				Object.assign(this.arraySelects, { betShopList: betShops }); // Update array selects with bet shop list
				this.model['BetShop'] = ''; // Reset bet shop model
			} else {
				if (optionsKey == 'provinceList') {
					let cities = arraySelects['provinceList']
						.filter((x) => x.Id == value) // Filter cities by selected province
						.map((x) => x.cities)[0]; // Get cities for selected province
					cities.forEach((citie) => {
						citie.value = citie.Id; // Set value for city
						citie.name = citie.Name; // Set name for city
					});
					Object.assign(this.arraySelects, { cityList2: cities }); // Update array selects with city list
					this.model['City'] = ''; // Reset city model
				}
			}
		},
		pagePrizeFunction() {
			this.loadingForm = false; // Set loading form to false
			this.reloadForm = false; // Set reload form to false
			this.pagePrize = '2'; // Set current page to 2
			this.fields =
				this.config != undefined &&
				this.config.loyalty != undefined &&
				this.config.loyalty.form2 != undefined &&
				this.config.loyalty.form2[this.appComponent['country']] !=
					undefined
					? this.config.loyalty.form2[this.appComponent['country']] // Get fields for form 2
					: [];
			apiService.request('get_countries', {}).then((response: any) => {
				this.reloadForm = true; // Set reload form to true
				if (response.code == 0) {
					var country = response.data.filter((item) => {
						return item.Id == this.appComponent.session.pais_id; // Filter country by session country ID
					})[0];
					for (var i = 0; i < country.departments.length; i++) {
						country.departments[i].value =
							country.departments[i].Id; // Set value for departments
						country.departments[i].name =
							country.departments[i].Name; // Set name for departments
					}
					Object.assign(this.arraySelects, {
						provinceList: country.departments, // Update array selects with province list
					});
					apiService
						.request('get_teams', {}) // Request to get teams
						.then((response2: any) => {
							for (var i = 0; i < response2.data.length; i++) {
								response2.data[i].value = response2.data[i].Id; // Set value for teams
								response2.data[i].name = response2.data[i].Name; // Set name for teams
							}
							Object.assign(this.arraySelects, {
								teamsList: response2.data, // Update array selects with teams list
							});
							this.loadingForm = true; // Set loading form to true
						});
				}
			});
		},
		initMyLoyalty() {
			apiService.request('my_loyalty', {}).then((response: any) => {
				if (response.code == 0) {
					this.loyalty = response.data.loyalty; // Set loyalty data from response
				}
			});
		},
		initShopBonuses() {
			apiService
				.request('shop_bonuses', { Country: this.appComponent.country }) // Request to get shop bonuses
				.then((response: any) => {
					if (response.code == 0) {
						this.bonuses = response.data; // Set bonuses from response
						this.bonuses.sort(
							(a: any, b: any) => a.level - b.level // Sort bonuses by level
						);
					}
				});
		},
		activatebonuses(bonus) {
			this.appComponent.disabledButtonForm = true; // Disable button form
			if (this.appComponent.session.logueado) {
				if (bonus.state == 2 && !(bonus.level > this.loyalty.level)) {
					if (bonus.betshopown) {
						this.prize = {
							Id: '', // Prize ID
							City: '', // Prize city
							BetShop: '', // Prize bet shop
						};
						apiService
							.request('get_betshops_prizes', {
								timeRequest: true, // Set time request to true
							})
							.then((response: any) => {
								if (response.code == 0) {
									for (
										var i = 0;
										i < response.data.length;
										i++
									) {
										response.data[i].value =
											response.data[i].Id; // Set value for bet shops
										response.data[i].name =
											response.data[i].Name; // Set name for bet shops
									}
									Object.assign(this.arraySelects, {
										cityList: response.data, // Update array selects with city list
									});
									this.loadingForm = true; // Set loading form to true
									this.showModalPrize = true; // Show prize modal
									this.loadingForm = true; // Set loading form to true
									this.prize.Id = bonus.id; // Set prize ID
								} else if (response.code == 1811) {
									this.appComponent.disabledButtonForm = true; // Disable button form
									let timeLogin: any =
										localStorage.getItem('timeLogin'); // Get login time from local storage
									let valorNumber = parseInt(timeLogin); // Parse login time
									let sumMinutes = new Date(); // Create date object for sum
									sumMinutes.setTime(
										valorNumber +
											this.config.restrictionTime * 1000 // Set time for restriction
									);
									let interval = setInterval(() => {
										this.appComponent.count =
											sumMinutes.getTime() -
											new Date().getTime(); // Update countdown
										this.appComponent.disabledCount = true; // Disable countdown
										if (
											sumMinutes.getTime() <=
											new Date().getTime()
										) {
											this.appComponent.disabledCount =
												false; // Enable countdown
											this.appComponent.disabledButtonForm =
												false; // Enable button form
											clearInterval(interval); // Clear interval
										}
									}, 1000); // Update every second
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
								buttonModal: this.$t('Aceptar'), // Button text for modal
								orderModal: 'activate_bonuses', // Order for modal action
							};
							this.itemSelect = bonus; // Set selected item
						} else {
							this.itemSelect = bonus; // Set selected item
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
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
					}
				}
			} else {
				this.appComponent.showModalLogin = true; // Show login modal if not logged in
			}
		},
		onSubmit(values) {
			values.bonusId = this.prize.Id; // Set bonus ID in values
			values.Form = this.pagePrize; // Set current page in values
			if (this.pagePrize == '1') {
				values.betShop = values.BetShop; // Set bet shop in values if on page 1
			}
			values.timeRequest = true; // Set time request to true
			apiService
				.request('activate_bonuses', values) // Request to activate bonuses
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('¡Premio canjeado!'), // Title for modal
							messageModal:
								response.freeSpin != undefined &&
								response.freeSpin
									? this.$t(
											'Premio desbloqueado, será cargado en las próximas 12 horas.' // Message if free spin is available
										)
									: this.$t(
											'Juégalo ahora. Revisa tu Inbox para saber cómo usarlo' // Message for using the prize
										),
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
						this.refreshBalance(); // Refresh balance
						this.initShopBonuses(); // Initialize shop bonuses
						this.initMyLoyalty(); // Initialize loyalty
						if (
							response.data.pdf != undefined &&
							response.data.pdf != '' &&
							response.data.pdf != null
						) {
							this.base64 =
								'data:application/pdf;base64,' +
								response.data.pdf; // Set base64 for PDF
							this.base64Download = response.data.pdf; // Set download link for PDF
							this.showModalPrint = true; // Show print modal
						}
					} else if (response.code == 1811) {
						this.appComponent.disabledButtonForm = true; // Disable button form
						let timeLogin: any = localStorage.getItem('timeLogin'); // Get login time from local storage
						let valorNumber = parseInt(timeLogin); // Parse login time
						let sumMinutes = new Date(); // Create date object for sum
						sumMinutes.setTime(
							valorNumber + this.config.restrictionTime * 1000 // Set time for restriction
						);
						let interval = setInterval(() => {
							this.appComponent.count =
								sumMinutes.getTime() - new Date().getTime(); // Update countdown
							this.appComponent.disabledCount = true; // Disable countdown
							if (sumMinutes.getTime() <= new Date().getTime()) {
								this.appComponent.disabledCount = false; // Enable countdown
								this.appComponent.disabledButtonForm = false; // Enable button form
								clearInterval(interval); // Clear interval
							}
						}, 1000); // Update every second
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
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Order for modal action
						};
					}
					this.pagePrize = '1'; // Reset page prize to 1
					this.fields =
						this.config != undefined &&
						this.config.loyalty != undefined &&
						this.config.loyalty.form != undefined &&
						this.config.loyalty.form[
							this.appComponent['country']
						] != undefined
							? this.config.loyalty.form[
									this.appComponent['country']
								] // Get fields for form based on country
							: [];
					this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Reset model to initial state
				});
		},
	},
});
</script>
<template>
	<ShopBonuses2
		v-if="
			config != null &&
			config.shopBonus2 != undefined &&
			config.shopBonus2 == true
		"
	/>
	<!-- Render ShopBonuses2 component if shopBonus2 is enabled -->
	<div
		v-if="
			config.layout != 3 &&
			((config.shopBonus2 != undefined && config.shopBonus2 != true) ||
				config.shopBonus2 == undefined)
		"
		class="int-header h-auto bg-base-200 absolute w-full"
	></div>
	<!-- Header section with gradient background -->
	<div
		v-if="
			config.layout != 3 &&
			((config.shopBonus2 != undefined && config.shopBonus2 != true) ||
				config.shopBonus2 == undefined)
		"
		class="Framework InfoPage mi-cuenta"
	>
		<!-- Main content area for user account -->
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<div class="Container ActivePageTitle">
					<span class="h1">
						<span class="text-info font-bold text-3xl">{{
							$t('Tienda de regalos')
						}}</span>
					</span>
				</div>
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="
							appComponent.session.logueado &&
							appComponent.viewActual != '/programa_lealtad' &&
							config.layout != 3
						"
						:page="'shop-bonuses'"
						:MENU_ID="'3'"
					/>
					<!-- Render MenuUser component if user is logged in and not on loyalty program page -->
					<MenuUser3
						v-if="
							appComponent.session.logueado &&
							appComponent.viewActual != '/programa_lealtad' &&
							config.layout != undefined &&
							config.layout == 3
						"
						:page="'shop-bonuses'"
						:MENU_ID="'3'"
					/>
					<!-- Render MenuUser3 component if user is logged in and on layout 3 -->
					<div class="BoxContent TermsContentBox HelpContentBox">
						<div class="Container InfoContent">
							<div
								class="myContainer"
								:class="{
									'myContainer-nl':
										!appComponent.session.logueado ||
										appComponent.viewActual ==
											'/programa_lealtad',
								}"
							>
								<div v-for="bonus in bonuses" class="list">
									<span class="title">{{
										$t(bonus.title)
									}}</span>
									<!-- Title for each bonus -->
									<span class="cant"
										>{{ bonus.points }}
										<span>{{ $t('PUNTOS') }}</span></span
									>
									<!-- Display points required for bonus -->
									<img
										class="bonuse-img"
										:src="bonus.image"
									/>
									<!-- Image for the bonus -->
									<span class="subTitle">{{
										$t(bonus.subTitle)
									}}</span>
									<!-- Subtitle for the bonus -->
									<div class="container-contact100-form-btn">
										<div class="wrap-contact100-form-btn">
											<button
												class="button-lock"
												:class="{
													'my-button-redimed':
														bonus.state == 4,
												}"
												@click="
													activatebonuses(bonus);
													appComponent.gAnalytics(
														'store_awards',
														bonus
													);
												"
											>
												<font-awesome-icon
													v-if="
														bonus.state == 1 &&
														appComponent.session
															.logueado
													"
													icon="fa fa-lock"
													class="fontawesomeicon"
												/>
												<!-- Lock icon for locked bonuses -->
												<font-awesome-icon
													v-if="
														bonus.state == 2 ||
														!appComponent.session
															.logueado
													"
													icon="fa fa-unlock"
													class="fontawesomeicon"
												/>
												<!-- Unlock icon for available bonuses -->
												<font-awesome-icon
													v-if="bonus.state == 3"
													icon="fa fa-check"
													class="fontawesomeicon"
												/>
												<!-- Check icon for redeemed bonuses -->
												<font-awesome-icon
													v-if="bonus.state == 4"
													icon="fa fa-check"
													class="fontawesomeicon"
												/>
												<!-- Check icon for already claimed bonuses -->
												<span
													v-if="
														bonus.state == 1 ||
														bonus.state == 2
													"
													class="lvl-req"
													hidden
												>
													<span>DESDE NIVEL</span>
													{{ bonus.level }}
													<img
														class="lvl-reg-img"
														:src="
															'../assets/images/lealtad/lvl_' +
															bonus.level +
															'.png'
														"
														alt=""
													/>
													<!-- Level requirement for bonus -->
												</span>
												<span
													v-if="
														bonus.state == 1 &&
														appComponent.session
															.logueado
													"
													class="lvl-req"
													><span>{{
														$t('BLOQUEADO')
													}}</span></span
												>
												<!-- Message for locked bonuses -->
												<span
													v-if="
														bonus.state == 2 ||
														!appComponent.session
															.logueado
													"
													class="lvl-req"
													><span>{{
														$t('DESBLOQUEADO')
													}}</span></span
												>
												<!-- Message for unlocked bonuses -->
												<span
													class="claim flex justify-center items-center"
													v-if="
														bonus.state == 2 ||
														(!appComponent.session
															.logueado &&
															bonus.state == 1)
													"
													><br />
													<svg
														v-if="
															appComponent.disabledButtonForm
														"
														aria-hidden="true"
														role="status"
														class="inline w-4 h-4 mr-1 text-neutral animate-spin"
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
														/></svg
													>{{ $t('RECLAMAR') }}</span
												>
												<span
													v-if="bonus.state == 3"
													class="lvl-req"
													><br />{{
														$t('RECLAMADO')
													}}</span
												>
												<span
													v-if="bonus.state == 4"
													class="lvl-req"
													><br />{{
														$t('GASTADO')
													}}</span
												>
												<span
													v-if="bonus.state == 5"
													class="lvl-req"
													><br />{{
														$t('ENTREGADO')
													}}</span
												>
											</button>
											<div
												v-if="
													appComponent.disabledCount &&
													bonus.state == 2
												"
												class="text-primary text-center pt-5"
											>
												{{
													$t('Intente de nuevo en: ')
												}}
												<vue-countdown
													v-if="
														appComponent.disabledCount
													"
													:time="appComponent.count"
													:interval="100"
													v-slot="{ seconds }"
													class="text-primary font-poppinsm text-sm md:text-base text-center z-1"
												>
													{{ seconds }}
												</vue-countdown>
												{{ $t(' segundos.') }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="showModalPrint"
					class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
				>
					<div class="modal-box rounded-2xl" style="max-width: 60vh">
						<label
							@click="showModalPrint = false"
							class="cursor-pointer text-right block"
						>
							<font-awesome-icon icon="fa-solid fa-close" />
						</label>
						<embed
							:src="base64"
							type="application/pdf"
							width="100%"
							height="600px"
						/>
					</div>
				</div>
				<div
					v-if="showModalPrize"
					class="modal text-neutral-content items-center bg-neutral-content bg-opacity-75"
				>
					<div class="modal-box rounded-2xl" style="max-width: 60vh">
						<label
							@click="showModalPrize = false"
							class="cursor-pointer text-right block"
						>
							<font-awesome-icon icon="fa-solid fa-close" />
						</label>
						<AppForm
							v-if="reloadForm"
							:loading="loadingForm"
							:title="titleForm"
							:fields="fields"
							:styleWidth="widthForm"
							:arraySelects="arraySelects"
							:model="model"
							:textDown="textDownForm"
							:textButton="'Reclamar'"
							@onSubmit:form="onSubmit($event)"
							@changeSelect:form="changeSelect($event)"
						/>
						<label class="label">
							<a class="label-text-alt"></a>
							<label
								class="cursor-pointer"
								@click="pagePrizeFunction()"
								v-if="pagePrize == '1'"
							>
								{{ $t('¿No encontraste tu ciudad?') }}</label
							>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	<section
		v-if="
			config.layout != undefined &&
			config.layout == 3 &&
			((config.shopBonus2 != undefined && config.shopBonus2 != true) ||
				config.shopBonus2 == undefined)
		"
		class="relative w-full h-auto flex justify-center items-center min-w-full"
	>
		<div class="absolute in top-0 w-full h-full z-0">
			<img
				v-if="
					config != undefined &&
					config.shopBonuses != undefined &&
					config.shopBonuses.bg != undefined
				"
				:src="config.shopBonuses.bg"
				alt=""
				class="w-full h-full object-cover object-center"
			/>
			<img
				v-else
				src="https://images.virtualsoft.tech/m/msj0212T1750269067.png"
				alt=""
				class="w-full h-full object-cover object-center"
			/>
		</div>
		<div
			v-if="$route.fullPath == '/gestion/mi_lealtad'"
			class="absolute flex top-0 w-full h-96 bg-gradient-to-b from-neutral-content"
		></div>
		<div
			class="w-full flex flex-col justify-center items-center gap-16 z-10 max-w-[1300px] my-24"
		>
			<div
				class="w-[80vw] flex flex-col gap-8 items-center justify-center"
			>
				<h2
					class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% max-w-[500px] text-neutral w-full h-10 sm:h-14 flex justify-center items-center font-bold text-xl sm:text-2xl"
				>
					{{ $t('Tienda de premios') }}
				</h2>
				<p class="text-2xl text-neutral">
					{{
						$t(
							'Revisa todos los premios exclusivos que tenemos para ti.'
						)
					}}
				</p>
				<p class="text-2xl text-neutral">
					{{
						$t(
							'¡Canjea tus puntos y aprovéchalos en apuestas deportivas y giros gratis!'
						)
					}}
				</p>
			</div>
			<div
				class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			>
				<article
					v-for="bonus in bonuses"
					:key="bonus.id"
					class="in w-[300px] flex flex-col justify-between items-center gap-4 hover:scale-[1.03] cursor-pointer"
				>
					<div
						class="w-full min-h-[370px] flex flex-col justify-center items-center rounded-2xl bg-neutral/50 shadow-lg shadow-neutral-content/50"
					>
						<div
							class="h-auto w-full text-neutral text-lg font-bold flex justify-center items-center rounded-t-2xl p-2"
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
									'bg-base-100':
										(bonus.state == 1 &&
											appComponent.session.logueado) ||
										bonus.state == 3 ||
										bonus.state == 4,
								},
							]"
						>
							<span class="text-neutral">{{ $t(bonus.title) }}</span>
						</div>
						<div class="relative w-full h-auto">
							<div
								class="absolute top-0 w-full flex justify-center items-center py-2 bg-neutral-content/50 shadow-md shadow-neutral-content"
							>
								<span
									class="text-neutral bg-base-200 w-52 h-7 rounded-xl flex justify-center items-center font-semibold text-base"
									>{{ bonus.points }}
									{{ $t(' Puntos') }}</span
								>
							</div>
							<div
								class="w-[300px] h-[280px] flex justify-center items-center"
							>
								<img
									v-if="
										config != undefined &&
										config.shopBonuses != undefined &&
										config.shopBonuses.bgCard != undefined
									"
									:src="config.shopBonuses.bgCard"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
								<img
									v-else
									src="https://images.virtualsoft.tech/m/msjT1686103795.png"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
								<img
									v-if="
										config != undefined &&
										config.shopBonuses != undefined &&
										config.shopBonuses.bgCard != undefined
									"
									:src="bonus.image"
									alt=""
									class="w-[130px] h-[130px] absolute ml-1 mb-1 border-solid border-3 border-accent-focus"
								/>
								<img
									v-else
									v-if="bonus.image != undefined"
									:src="bonus.image"
									alt=""
									class="w-[130px] h-[130px] absolute ml-1 mb-1"
								/>
							</div>
						</div>
						<div
							class="h-full w-full text-neutral text-sm flex justify-center items-center text-center rounded-b-2xl p-2"
						>
							<span>{{ $t(bonus.subTitle) }}</span>
						</div>
					</div>
					<div
						class="h-16 w-full flex justify-between items-center px-4 rounded-full bg-neutral/50"
						:class="[
							{
								'unlock ':
									bonus.state == 2 ||
									!appComponent.session.logueado ||
									(!appComponent.session.logueado &&
										bonus.state == 1) ||
									bonus.state == 5,
							},
							{
								'border-3 border-solid border-graycontent':
									(bonus.state == 1 &&
										appComponent.session.logueado) ||
									bonus.state == 3 ||
									bonus.state == 4,
							},
						]"
					>
						<div
							class="w-full flex items-center gap-2"
							:class="
								bonus.state == 2 ||
								!appComponent.session.logueado ||
								(!appComponent.session.logueado &&
									bonus.state == 1)
									? 'justify-start'
									: 'justify-center'
							"
						>
							<div class="w-8 h-8 mb-2">
								<img
									v-if="
										bonus.state == 2 ||
										!appComponent.session.logueado ||
										(!appComponent.session.logueado &&
											bonus.state == 1)
									"
									src="https://images.virtualsoft.tech/m/msjT1686100632.png"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
								<img
									v-if="
										appComponent.session.logueado &&
										bonus.state == 1
									"
									src="https://images.virtualsoft.tech/m/msjT1686141894.png"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
								<img
									v-if="
										bonus.state == 3 ||
										bonus.state == 4 ||
										bonus.state == 5
									"
									src="https://images.virtualsoft.tech/m/msjT1686861732.png"
									alt=""
									class="w-full h-full object-contain object-center"
								/>
							</div>
							<div
								class="text-neutral text-base flex justify-center items-center uppercase font-normal"
							>
								{{
									bonus.state == 1 &&
									appComponent.session.logueado
										? $t('Bloqueado')
										: bonus.state == 2 ||
											  !appComponent.session.logueado
											? $t('Desbloqueado')
											: bonus.state == 2 ||
												  (!appComponent.session
														.logueado &&
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
						<button
							v-if="
								bonus.state == 2 ||
								!appComponent.session.logueado ||
								(!appComponent.session.logueado &&
									bonus.state == 1)
							"
							@click="
								activatebonuses(bonus);
								appComponent.gAnalytics('store_awards', bonus);
							"
							:disabled="appComponent.disabledButtonForm"
							class="w-36 h-10 text-base font-bold text-neutral px-4 uppercase flex justify-center items-center"
							:class="[
								{
									'bttn-noClaim':
										bonus.state == 2 || bonus.state == 5,
								},
								{ 'bttn-claim': bonus.state == 1 },
							]"
						>
							<svg
								v-if="appComponent.disabledButtonForm"
								aria-hidden="true"
								role="status"
								class="inline w-4 h-4 mr-1 text-neutral animate-spin"
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
							{{ $t('Canjear') }}
							<!-- Button text for redeeming bonus -->
						</button>
					</div>
					<div
						v-if="appComponent.disabledCount && bonus.state == 2"
						class="text-primary pt-5"
					>
						{{ $t('Intente de nuevo en: ') }}
						<vue-countdown
							v-if="appComponent.disabledCount"
							:time="appComponent.count"
							:interval="100"
							v-slot="{ seconds }"
							class="text-primary font-poppinsm text-base md:text-lg text-center z-1"
						>
							{{ seconds }}
							<!-- Countdown timer for retry -->
						</vue-countdown>
						{{ $t(' segundos.') }}
					</div>
				</article>
			</div>
		</div>
		<div
			class="absolute -bottom-1 w-full h-[50%] bg-gradient-to-b from-transparent to-neutral-content p-10"
		></div>
		<!-- Bottom gradient overlay -->
	</section>
</template>
<style scoped>
.bttn-noClaim {
	background: linear-gradient(
		180deg,
		#646464 0%,
		#7b7b7b 11.84%,
		#575757 25.1%,
		#444444 79.69%,
		#3c3c3c 100%
	); /* Gradient background for no claim button */
	border: 1px solid #646464; /* Border for no claim button */
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25); /* Shadow for no claim button */
	border-radius: 10px; /* Rounded corners for no claim button */
}

.bttn-claim {
	background: linear-gradient(
		180deg,
		#00ad35 0%,
		#06c140 10.94%,
		#00a332 23.96%,
		#008a2a 85.42%,
		#026821 100%
	); /* Gradient background for claim button */
	border: 1px solid #00ad35; /* Border for claim button */
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25); /* Shadow for claim button */
	border-radius: 10px; /* Rounded corners for claim button */
}

.unlock {
	background: rgba(255, 255, 255, 0.1); /* Background for unlock state */
	box-shadow:
		0px 0px 8px 5px rgba(0, 173, 53, 0.5),
		/* Shadow for unlock state */ 7px 11px 20px rgba(0, 0, 0, 0.25); /* Shadow for unlock state */
	border-radius: 31px; /* Rounded corners for unlock state */
}

.puntos {
	background: linear-gradient(
		180deg,
		#f7f7f7 0%,
		#fffdfd 12.5%,
		#eeeeee 23.96%,
		#d8d8d8 83.33%,
		#b3b3b3 100%
	); /* Gradient background for points display */
	border: 1px solid #ffffff; /* Border for points display */
	border-radius: 10px; /* Rounded corners for points display */
}

.title {
	background: linear-gradient(
		270deg,
		rgba(38, 42, 58, 0) 0%,
		#495170 21.07%,
		#495170 50%,
		#495170 82.9%,
		rgba(38, 42, 58, 0.26) 100%
	); /* Gradient background for title */
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); /* Shadow for title */
}

img {
	display: block; /* Block display for images */
	margin-right: auto; /* Center image horizontally */
	margin-left: auto; /* Center image horizontally */
}

.myContainer [aria-describedby='list_progress'] {
	padding: 1px 3px !important; /* Padding for progress elements */
	vertical-align: middle; /* Align vertically */
}

img.bonuse-img {
	max-width: 100%; /* Responsive image for bonuses */
}

.list:hover {
	transform: scale(1.04); /* Scale effect on hover for list items */
}

.list {
	width: auto; /* Auto width for list items */
	height: auto; /* Auto height for list items */
	background: white; /* Background color for list items */
	display: inline-block; /* Inline block display for list items */
	margin-right: 0; /* No right margin */
	border-radius: 9px; /* Rounded corners for list items */
	overflow: hidden; /* Hide overflow for list items */
	transition: transform 0.2s; /* Transition effect for hover */
	cursor: pointer; /* Pointer cursor for list items */
}

.black-filter {
	-webkit-filter: grayscale(100%); /* Grayscale filter for black filter */
	filter: grayscale(100%); /* Grayscale filter for black filter */
}

.claim {
	background: white; /* Background color for claim button */
	color: #832a8c; /* Text color for claim button */
	font-weight: bold; /* Bold text for claim button */
	text-align: center; /* Center text for claim button */
	padding: 5px 10px; /* Padding for claim button */
	height: 35px; /* Height for claim button */
	display: block; /* Block display for claim button */
	line-height: 8px; /* Line height for claim button */
	border-radius: 29px; /* Rounded corners for claim button */
	margin-top: 10px; /* Top margin for claim button */
}

.list span.state {
	width: 100%; /* Full width for state span */
	display: block; /* Block display for state span */
	text-align: center; /* Center text for state span */
	background: black; /* Background color for state span */
	color: white; /* Text color for state span */
	position: relative; /* Relative positioning for state span */
	font-size: 11px; /* Font size for state span */
	padding: 2px 5px; /* Padding for state span */
}

.list span.title {
	display: block; /* Block display for title span */
	text-align: center; /* Center text for title span */
	padding: 5px 10px; /* Padding for title span */
	line-height: 13px; /* Line height for title span */
	color: white; /* Text color for title span */
	padding: 10px; /* Padding for title span */
	font-weight: bold; /* Bold text for title span */
	overflow: hidden; /* Hide overflow for title span */
	background: #269c2a; /* Background color for title span */
}

.list span.subTitle {
	display: block; /* Block display for subtitle span */
	text-align: center; /* Center text for subtitle span */
	padding: 5px 10px; /* Padding for subtitle span */
	overflow: hidden; /* Hide overflow for subtitle span */
	color: #333; /* Text color for subtitle span */
	height: auto; /* Auto height for subtitle span */
	font-size: 13px; /* Font size for subtitle span */
}

.list span.content-test-1 {
	display: block; /* Block display for content test 1 span */
	text-align: left; /* Left align text for content test 1 span */
	padding: 5px 10px; /* Padding for content test 1 span */
	line-height: 13px; /* Line height for content test 1 span */
	color: black; /* Text color for content test 1 span */
	padding-bottom: 10px; /* Bottom padding for content test 1 span */
	overflow: hidden; /* Hide overflow for content test 1 span */
	font-size: 16px; /* Font size for content test 1 span */
}

.list span.content-test-2 {
	text-align: left; /* Left align text for content test 2 span */
	padding: 5px 10px; /* Padding for content test 2 span */
	line-height: 13px; /* Line height for content test 2 span */
	color: #57b75f; /* Text color for content test 2 span */
	padding-bottom: 10px; /* Bottom padding for content test 2 span */
	overflow: hidden; /* Hide overflow for content test 2 span */
	font-size: 16px; /* Font size for content test 2 span */
}

.list:hover span.title {
	height: auto; /* Auto height on hover for title span */
	overflow: auto; /* Show overflow on hover for title span */
}

button.my-button-redimed {
	background: #269c2a !important; /* Background color for redeemed button */
}

.myContainer {
	height: auto; /* Auto height for container */
	overflow: visible; /* Show overflow for container */
	display: grid; /* Grid display for container */
	grid-template-columns: 1fr 1fr 1fr; /* Three columns for grid */
	grid-gap: 25px; /* Gap between grid items */
	width: auto; /* Auto width for container */
	margin-left: auto; /* Center container horizontally */
	margin-right: auto; /* Center container horizontally */
}

.myContainer-nl {
	height: auto; /* Auto height for container */
	overflow: visible; /* Show overflow for container */
	display: grid; /* Grid display for container */
	grid-template-columns: 1fr 1fr 1fr 1fr; /* Four columns for grid */
	grid-gap: 25px; /* Gap between grid items */
	width: auto; /* Auto width for container */
	margin-left: auto; /* Center container horizontally */
	margin-right: auto; /* Center container horizontally */
}

@media (max-width: 768px) {
	.myContainer {
		height: 100%; /* Full height for container on small screens */
		display: grid; /* Grid display for container */
		grid-template-columns: repeat(1, auto); /* Single column for grid */
		grid-gap: 20px; /* Gap between grid items */
		width: 100%; /* Full width for container */
		margin-left: auto; /* Center container horizontally */
		margin-right: auto; /* Center container horizontally */
	}
}

img.lvl-reg-img {
	max-height: 50px; /* Max height for level requirement image */
}

button.button-lock.my-button-disabled {
	background: #dadada; /* Background color for disabled button */
	color: rgb(138, 134, 154); /* Text color for disabled button */
}

span.cant {
	display: block; /* Block display for points span */
	margin: 5px auto; /* Center span horizontally */
	border-radius: 15px; /* Rounded corners for points span */
	text-align: center; /* Center text for points span */
	background: white; /* Background color for points span */
	color: #269c2a; /* Text color for points span */
	font-weight: bold; /* Bold text for points span */
	width: calc(100% - 25px); /* Width calculation for points span */
	height: 50px; /* Height for points span */
	font-size: 18px; /* Font size for points span */
	line-height: 45px; /* Line height for points span */
	border-width: 2px; /* Border width for points span */
	border-style: solid; /* Border style for points span */
	border-color: #269c2a; /* Border color for points span */
	margin-top: 9px; /* Top margin for points span */
}

button.button-lock {
	background: #832a8c; /* Background color for lock button */
	width: 100%; /* Full width for lock button */
	padding: 10px 25px; /* Padding for lock button */
	color: white; /* Text color for lock button */
}

.fontawesomeicon {
	float: left; /* Float left for font awesome icons */
	font-size: 19px; /* Font size for font awesome icons */
}

span.lvl-req {
	font-weight: bold; /* Bold text for level requirement span */
}

#myBarBonos {
	width: 1%; /* Initial width for bonus progress bar */
	height: 18px; /* Height for bonus progress bar */
	background-color: #57b75f; /* Background color for bonus progress bar */
	border-radius: 0 15px 15px 0; /* Rounded corners for bonus progress bar */
}

.myBarBn {
	width: 1%; /* Initial width for bonus progress bar */
	height: 20px; /* Height for bonus progress bar */
	background-color: #57b75f; /* Background color for bonus progress bar */
	border-radius: 0 15px 15px 0; /* Rounded corners for bonus progress bar */
}

#myProgress {
	background-color: grey; /* Background color for progress bar */
	border-radius: 0 15px 15px 0; /* Rounded corners for progress bar */
}

.container-filter {
}

.filter {
	display: inline-block; /* Inline block display for filter */
	padding: 6px 0px; /* Padding for filter */
	border-radius: 5px; /* Rounded corners for filter */
	font-size: 13px; /* Font size for filter */
	width: 100%; /* Full width for filter */
}

span.filters-section {
	width: 100%; /* Full width for filter section */
	display: inline-block; /* Inline block display for filter section */
	padding-right: 10px; /* Right padding for filter section */
}

strong {
	padding-left: 0; /* No left padding for strong elements */
}

span.filters-section:last-child {
	padding-left: 10px; /* Left padding for last filter section */
}

select {
	padding: 5px 6px; /* Padding for select elements */
	border-radius: 3px; /* Rounded corners for select elements */
	color: grey; /* Text color for select elements */
	width: 100%; /* Full width for select elements */
}

label {
	padding-right: 8px; /* Right padding for labels */
}

.my-button {
	margin: 20px; /* Margin for buttons */
}

.my-button-disabled {
	--color-base: black !important; /* Override color for disabled buttons */
}

.container-contact100-form-btn {
	display: -webkit-box; /* Flex display for button container */
	display: -webkit-flex; /* Flex display for button container */
	display: -moz-box; /* Flex display for button container */
	display: -ms-flexbox; /* Flex display for button container */
	display: flex; /* Flex display for button container */
	flex-wrap: wrap; /* Allow wrapping for button container */
	justify-content: center; /* Center content for button container */
	padding: 20px; /* Padding for button container */
}

.wrap-contact100-form-btn {
	width: 100%; /* Full width for button wrapper */
	display: block; /* Block display for button wrapper */
	position: relative; /* Relative positioning for button wrapper */
	z-index: 1; /* Z-index for button wrapper */
	border-radius: 25px; /* Rounded corners for button wrapper */
	overflow: hidden; /* Hide overflow for button wrapper */
	margin: 0 auto; /* Center button wrapper */
}

.contact100-form-bgbtn {
	position: absolute; /* Absolute positioning for background button */
	z-index: -1; /* Z-index for background button */
	width: 300%; /* Width for background button */
	height: 100%; /* Full height for background button */
	background: -webkit-linear-gradient(
		left,
		#4caf50,
		#5d5d5d,
		#b48500,
		#5d5d5d
	); /* Gradient background for contact button */
	top: 0; /* Top position for background button */
	left: -100%; /* Left position for background button */
	-webkit-transition: all 0.4s; /* Transition for background button */
	-o-transition: all 0.4s; /* Transition for background button */
	-moz-transition: all 0.4s; /* Transition for background button */
	transition: all 0.4s; /* Transition for background button */
}

.contact100-form-btn {
	display: -webkit-box; /* Flex display for contact button */
	display: -webkit-flex; /* Flex display for contact button */
	display: -moz-box; /* Flex display for contact button */
	display: -ms-flexbox; /* Flex display for contact button */
	display: flex; /* Flex display for contact button */
	justify-content: center; /* Center content for contact button */
	align-items: center; /* Align items for contact button */
	padding: 0 20px; /* Padding for contact button */
	width: 100%; /* Full width for contact button */
	height: 50px; /* Height for contact button */
	font-family: Poppins-Medium; /* Font family for contact button */
	font-size: 16px; /* Font size for contact button */
	color: #fff; /* Text color for contact button */
	line-height: 1.2; /* Line height for contact button */
}

.contact100-form-btn i {
	-webkit-transition: all 0.4s; /* Transition for icon in contact button */
	-o-transition: all 0.4s; /* Transition for icon in contact button */
	-moz-transition: all 0.4s; /* Transition for icon in contact button */
	transition: all 0.4s; /* Transition for icon in contact button */
}

.contact100-form-btn:hover i {
	-webkit-transform: translateX(10px); /* Move icon on hover */
	-moz-transform: translateX(10px); /* Move icon on hover */
	-ms-transform: translateX(10px); /* Move icon on hover */
	-o-transform: translateX(10px); /* Move icon on hover */
	transform: translateX(10px); /* Move icon on hover */
}

.wrap-contact100-form-btn:hover .contact100-form-bgbtn {
	left: 0; /* Move background button on hover */
}
</style>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import apiService from '@/services/ApiService'; // Importing API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import { AucoSDK } from 'auco-sdk-integration'; // Importing Auco SDK for integration
import VideoPlayer from '@/components/VideoPlayer.vue'; // Importing video player component

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
		VideoPlayer, // Registering VideoPlayer component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let loadingForm = false; // State for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = this.$t('textDownFormVerify'); // Text for form description
		let fields: any =
			this.$config().verificarCuenta.form[this.$appComponent['country']]; // Form fields based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let widthForm: any = {}; // Width configuration for the form
		let modalAuco: boolean = false; // State for Auco modal visibility
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
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
			modalAuco,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Event listener for accepting modal
			this.appComponent.closeModal(); // Close modal on event
		});
		if (
			this.config.verifyJumio == undefined ||
			this.config.verifyJumio[this.appComponent.country] == undefined ||
			this.config.verifyJumio[this.appComponent.country] == false
		) {
			apiService.request('get_countries', {}).then((response: any) => {
				// Requesting country data
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].value = response.data[i].Id; // Setting value for select options
						response.data[i].name = response.data[i].Name; // Setting name for select options
					}
					Object.assign(this.arraySelects, {
						countryList: response.data, // Assigning country list to arraySelects
					});
					apiService
						.request('get_countries2', {})
						.then((response: any) => {
							// Requesting additional country data
							if (response.code == 0) {
								for (var i = 0; i < response.data.length; i++) {
									response.data[i].value =
										response.data[i].Id; // Setting value for select options
									response.data[i].name =
										response.data[i].Name; // Setting name for select options
								}
								Object.assign(this.arraySelects, {
									nationalityList: response.data, // Assigning nationality list to arraySelects
								});
								apiService
									.request('get_user', {})
									.then((response: any) => {
										// Requesting user data
										if (response.code == 0) {
											this.fields.forEach((element) => {
												// Iterating over form fields
												if (
													response.data[
														element.name
													] != undefined &&
													response.data[
														element.name
													] != ''
												) {
													if (
														typeof response.data[
															element.name
														] == 'string' ||
														typeof response.data[
															element.name
														] == 'number'
													) {
														if (
															element.type.toString() ==
															'date'
														) {
															this.model[
																element.name
															] = new Date(
																response.data[
																	element.name
																]
															)
																.toISOString()
																.split('T')[0]; // Formatting date
														} else {
															this.model[
																element.name
															] =
																response.data[
																	element.name
																]; // Assigning value to model
														}
														if (
															element.name.toString() ==
															'email'
														) {
															response.data.email2 =
																response.data.email; // Duplicating email for processing
														}
													} else {
														if (
															typeof response
																.data[
																element.name
															] == 'object'
														) {
															if (
																Array.isArray(
																	response
																		.data[
																		element
																			.name
																	]
																)
															) {
																if (
																	response
																		.data[
																		element
																			.name
																	] !=
																		undefined &&
																	response
																		.data[
																		element
																			.name
																	].length > 0
																) {
																	this.model[
																		element.name
																	] =
																		response.data[
																			element.name
																		][0].Id; // Assigning first ID from array to model
																	this.changeSelectInit(
																		{
																			value: response.data[
																				element
																					.name
																			][0].Id.toString(),
																			optionsKey:
																				element.optionsKey,
																		}
																	); // Initializing select change
																}
															} else {
																if (
																	response
																		.data[
																		element
																			.name
																	] != null ||
																	response
																		.data[
																		element
																			.name
																	] !=
																		undefined
																) {
																	this.changeSelectInit(
																		{
																			value: response.data[
																				element
																					.name
																			].Id.toString(),
																			optionsKey:
																				element.optionsKey,
																		}
																	); // Initializing select change
																	setTimeout(
																		() => {
																			this.model[
																				element.name
																			] =
																				response.data[
																					element.name
																				].Id; // Assigning ID to model
																			this.modelInitial =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.model
																					)
																				); // Cloning model for initial state
																		},
																		100
																	);
																}
															}
														}
													}
												}
											});
											this.loadingForm = true; // Setting loading state to true
											this.modelInitial = JSON.parse(
												JSON.stringify(this.model) // Cloning model for initial state
											);
										}
									});
							}
						});
				}
			});
		}
		this.fields.forEach((field) => {
			// Iterating over fields to initialize select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to arraySelects
				Object.assign(this.arraySelects, options);
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				user_info: values, // User information from form
				image_data: values.dataURLFILE1, // Image data for processing
				image_data_back: values.dataURLFILE2, // Back image data for processing
				image_data_services: values.dataURLFILE3, // Service image data for processing
				image_data_selfie: values.dataURLFILE4, // Selfie image data for processing
			};
			delete values.dataURLFILE1; // Removing unnecessary data from values
			delete values.dataURLFILE2; // Removing unnecessary data from values
			delete values.dataURLFILE3; // Removing unnecessary data from values
			delete values.dataURLFILE4; // Removing unnecessary data from values
			apiService.request('update_user2', params).then((response: any) => {
				// Requesting user update
				if (response.code == 0) {
					this.appComponent.modal = {
						showModal: 'notification', // Setting modal for success notification
						titleModal: this.$t('Mensaje'), // Title for modal
						messageModal: this.$t(
							'Se ha enviado la actualización correctamente, nuestros operadores se encargaran de validar esta información.'
						), // Message for modal
						buttonModal: this.$t('Aceptar'), // Button text for modal
						orderModal: 'closeModal', // Order for modal action
					};
					this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Resetting model to initial state
					this.refreshBalance(); // Refreshing balance after update
				} else {
					var error_mensaje = ''; // Variable for error message
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
						showModal: 'notification', // Setting modal for error notification
						titleModal: this.$t('Error!'), // Title for modal
						messageModal: error_mensaje, // Message for modal
						buttonModal: this.$t('Aceptar'), // Button text for modal
						orderModal: 'closeModal', // Order for modal action
					};
				}
			});
		},
		changeSelectInit: function (event: any) {
			// Method to handle initial select change
			let value = event.value; // Selected value
			let optionsKey = event.optionsKey; // Key for options
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Cloning arraySelects
			if (optionsKey == 'countryList') {
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value) // Filtering departments based on selected country
					.map((x) => x.departments)[0]; // Getting departments from filtered result
				departments.forEach((department) => {
					department.value = department.Id; // Setting value for department
					department.name = department.Name; // Setting name for department
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Assigning department list to arraySelects
				});
			} else {
				if (optionsKey == 'departmentList') {
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value) // Filtering cities based on selected department
						.map((x) => x.cities)[0]; // Getting cities from filtered result
					cities.forEach((city) => {
						city.value = city.Id; // Setting value for city
						city.name = city.Name; // Setting name for city
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Assigning city list to arraySelects
				}
			}
		},
		changeSelect: function (event: any) {
			// Method to handle select change
			let value = event.event.target.value; // Selected value
			let optionsKey = event.optionsKey; // Key for options
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Cloning arraySelects
			if (optionsKey == 'countryList') {
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value) // Filtering departments based on selected country
					.map((x) => x.departments)[0]; // Getting departments from filtered result
				departments.forEach((department) => {
					department.value = department.Id; // Setting value for department
					department.name = department.Name; // Setting name for department
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Assigning department list to arraySelects
				});
				this.model['department_id'] = ''; // Resetting department ID in model
				this.model['city_id'] = ''; // Resetting city ID in model
			} else {
				if (optionsKey == 'departmentList') {
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value) // Filtering cities based on selected department
						.map((x) => x.cities)[0]; // Getting cities from filtered result
					cities.forEach((city) => {
						city.value = city.Id; // Setting value for city
						city.name = city.Name; // Setting name for city
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Assigning city list to arraySelects
					this.model['city_id'] = ''; // Resetting city ID in model
				}
			}
		},
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal(); // Closing modal
		},
		verifyJumio() {
			// Method to verify Jumio
			apiService.request('verifica_jumio', {}).then((response: any) => {
				// Requesting Jumio verification
				if (response.code == 0) {
					if (response.data.url != undefined) {
						window.location.href = response.data.url; // Redirecting to URL if available
					} else {
						if (
							response.data.code != undefined &&
							response.data.key != undefined
						) {
							this.modalAuco = true; // Showing Auco modal
							setTimeout(() => {
								AucoSDK({
									// Initializing Auco SDK
									iframeId: 'myIframe', // ID for iframe
									sdkType: 'validation', // SDK type
									language: 'es', // Language for SDK
									keyPublic: response.data.key, // Public key for SDK
									events: {
										onSDKReady: () => {
											console.log('onSDKReady'); // Log when SDK is ready
										},
										onSDKClose: (similarity: any) => {
											console.log(
												'similarity',
												similarity // Log similarity when SDK closes
											);
										},
									},
									env: 'PROD', // Environment for SDK
									sdkData: {
										document: response.data.code, // Document code for SDK
									},
								});
							}, 500);
						}
					}
				} else {
					var error_mensaje = ''; // Variable for error message
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
						showModal: 'notification', // Setting modal for error notification
						titleModal: this.$t('Error!'), // Title for modal
						messageModal: error_mensaje, // Message for modal
						buttonModal: this.$t('Aceptar'), // Button text for modal
						orderModal: 'closeModal', // Order for modal action
					};
				}
			});
		},
		analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:VerifyAccount|layout:layout-${this.appComponent.config.layout}`
            };
        }
	},
});
</script>
<template>
	<!-- Header section for layout 3 -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Header section for layout 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main container for the account verification page -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Active page title container -->
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto'
							: 'ActivePageTitle2'
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Verificar Cuenta') }}</span
						>
					</span>
				</div>
				<!-- Row for user menu and content -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'verificar_cuenta'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'verificar_cuenta'"
						:MENU_ID="'3'"
					/>
					<!-- Content box for terms and help -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div
							class="Container InfoContent mb-5 bg-neutral rounded-xl shadow-md"
						>
							<!-- Conditional rendering based on verification status -->
							<div
								v-if="
									appComponent.session
										.verifcedula_ant_paprob !== 'S' ||
									appComponent.session
										.verifcedula_post_paprob !== 'S'
								"
							>
								<div
									class="px-10 pt-10"
									:class="
										config.layout != undefined &&
										config.layout == 3
											? 'bg-base-200'
											: 'bg-base-400'
									"
									v-if="
										(appComponent.session
											.verifcedula_ant === 'N' ||
											appComponent.session
												.verifcedula_post === 'N') &&
										config.verifyJumio != undefined &&
										config.verifyJumio[
											appComponent.country
										] != undefined &&
										config.verifyJumio[
											appComponent.country
										] == true
									"
								>
									<VideoPlayer
										:url="
											config.verificarCuenta
												.urlVideoVerifyAccount[
												appComponent.country
											]
										"
										v-if="
											config.verificarCuenta !=
												undefined &&
											config.verificarCuenta
												.urlVideoVerifyAccount !=
												undefined &&
											config.verificarCuenta
												.urlVideoVerifyAccount[
												appComponent.country
											] != undefined
										"
									/>
									<!-- Button to verify with provider -->
									<div
										class="w-full flex justify-center items-center my-4"
									>
										<button
											aria-label="ir a proveedor"
											class="btn btn-primary text-neutral mx-auto"
											@click="verifyJumio()"
										>
											{{ $t('Verificar con proveedor') }}
										</button>
									</div>
									<!-- Description for verification with provider -->
									<div
										class="flex items-center justify-center flex-col text-neutral"
									>
										<p
											v-html="
												$t(
													'Verificación con el proveedor'
												)
											"
										></p>
									</div>
								</div>
							</div>
							<!-- Message for account validation process -->
							<div
								class="p-[10px] text-white mb-[50px] bg-neutral-content"
								v-if="
									appComponent.session
										.verifcedula_ant_paprob === 'S' ||
									appComponent.session
										.verifcedula_post_paprob === 'S'
								"
							>
								{{
									$t(
										'Su cuenta esta en proceso de validación.'
									)
								}}
							</div>
							<!-- Message for already verified account -->
							<div
								class="p-[10px] text-neutral mb-[50px] bg-base-400"
								v-if="
									appComponent.session.verifcedula_ant !==
										'N' &&
									appComponent.session.verifcedula_post !==
										'N'
								"
							>
								<div v-if="config.verifyAccount === undefined">
									<p
                                        class="text-2xl text-neutral"
                                    >
										{{ $t('Su cuenta ya fue verificada.') }}
									</p>
									<!-- Links to different sections after verification -->
									<div
										class="flex gap-4 pt-4 flex-col sm:flex-row"
									>
										<RouterLink
											to="/deportes"
											v-bind="analyticsAttrs('menu:nav:sports')"
											class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center flex justify-center items-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
										>
											{{ $t('Apuestas Deportivas') }}
										</RouterLink>
										<RouterLink
											to="/new-casino"
											v-bind="analyticsAttrs('menu:nav:casino')"
											class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center flex justify-center items-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
										>
											{{ $t('Casino') }}
										</RouterLink>
										<RouterLink
											to="/live-casino-vivo"
											v-bind="analyticsAttrs(`menu:nav:live-casino`)"
											class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center flex justify-center items-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
										>
											{{ $t('Casino en Vivo') }}
										</RouterLink>
									</div>
								</div>
								<!-- Section for verification account message -->
								<section
									v-if="config.verifyAccount !== undefined"
									class="flex justify-center items-center py-32 sm:py-2"
								>
									<div class="h-full w-full">
										<section
											class="w-full h-[650px] md:h-[700px] relative flex justify-center items-center"
										>
											<div
												class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute z-20 -top-1"
											></div>
											<div
												class="flex flex-col xl:flex-row gap-20 z-20 justify-center items-center"
											>
												<div
													class="flex flex-col gap-8 justify-center items-center m-0 lg:ml-5 mt-10 xl:mt-0"
												>
													<p
														class="text-neutral text-xl md:text-3xl max-w-[700px] text-center"
														v-html="
															$t(
																config
																	.verifyAccount
																	.message
															)
														"
													></p>
													<!-- Links based on verification account configuration -->
													<div
														class="flex gap-4 flex-col sm:flex-row"
													>
														<RouterLink
															v-if="
																config.verifyAccount !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonSport !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonSport
																	.url !=
																	undefined &&
																config
																	.verifyAccount
																	.buttonSport
																	.text !=
																	undefined
															"
															:to="
																config
																	.verifyAccount
																	.buttonSport
																	.url
															"
															v-bind="analyticsAttrs(`menu:nav:${config
																	.verifyAccount
																	.buttonSport
																	.url.replace(/^\//, '')
																	.toLowerCase()
																	.replace(/\s/g, '-')}`)"
															class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
														>
															{{
																$t(
																	config
																		.verifyAccount
																		.buttonSport
																		.text
																)
															}}
														</RouterLink>
														<RouterLink
															v-if="
																config.verifyAccount !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonCasino !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonCasino
																	.url !=
																	undefined &&
																config
																	.verifyAccount
																	.buttonCasino
																	.text !=
																	undefined
															"
															:to="
																config
																	.verifyAccount
																	.buttonCasino
																	.url
															"
															v-bind="analyticsAttrs(`menu:nav:${config
																	.verifyAccount
																	.buttonCasino
																	.url.replace(/^\//, '')
																	.toLowerCase()
																	.replace(/\s/g, '-')}`)"
															class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center flex justify-center items-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
														>
															{{
																$t(
																	config
																		.verifyAccount
																		.buttonCasino
																		.text
																)
															}}
														</RouterLink>
														<RouterLink
															v-if="
																config.verifyAccount !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonLiveCasino !==
																	undefined &&
																config
																	.verifyAccount
																	.buttonLiveCasino
																	.url !=
																	undefined &&
																config
																	.verifyAccount
																	.buttonLiveCasino
																	.text !=
																	undefined
															"
															:to="
																config
																	.verifyAccount
																	.buttonLiveCasino
																	.url
															"
															v-bind="analyticsAttrs(`menu:nav:${config
																	.verifyAccount
																	.buttonLiveCasino
																	.url.replace(/^\//, '')
																	.toLowerCase()
																	.replace(/\s/g, '-')}`)"
															class="text-shadow-xl rounded-full bg-primary text-neutral uppercase w-auto h-auto text-center font-bold px-5 py-3 hover:scale-105 transition-all z-50 ease-in-out"
														>
															{{
																$t(
																	config
																		.verifyAccount
																		.buttonLiveCasino
																		.text
																)
															}}
														</RouterLink>
													</div>
												</div>
												<img
													v-if="
														config.verifyAccount !==
															undefined &&
														config.verifyAccount
															.img !== undefined
													"
													:src="
														config.verifyAccount.img
													"
													alt=""
													class="object-contain w-[400px] xl:w-[600px]"
												/>
											</div>
											<div
												class="w-10 h-full bg-gradient-to-l from-neutral-content to-transparent absolute z-10 -right-5"
											></div>
											<div
												class="w-10 h-full bg-gradient-to-r from-neutral-content to-transparent absolute z-10 -left-5"
											></div>
											<div
												class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute z-10 -bottom-0"
											></div>
										</section>
									</div>
								</section>
							</div>
							<!-- Conditional rendering for Jumio verification -->
							<div
								v-show="
									config.verifyJumio == undefined ||
									config.verifyJumio[appComponent.country] ==
										undefined ||
									config.verifyJumio[appComponent.country] ==
										false
								"
							>
								<div
									v-show="
										appComponent.session
											.verifcedula_ant_paprob !== 'S' ||
										appComponent.session
											.verifcedula_post_paprob !== 'S'
									"
								>
									<div
										v-show="
											appComponent.session
												.verifcedula_ant === 'N' ||
											appComponent.session
												.verifcedula_post === 'N'
										"
									>
										<AppForm
											:loading="loadingForm"
											:title="titleForm"
											:fields="fields"
											:styleWidth="widthForm"
											:arraySelects="arraySelects"
											:model="model"
											:textDown="textDownForm"
											:textButton="'Enviar'"
											@onSubmit:form="onSubmit($event)"
											@changeSelect:form="
												changeSelect($event)
											"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal for Auco verification -->
	<div class="modal" v-if="modalAuco">
		<div
			class="modal-box modal-box-splaft w-full h-full max-w-3xl text-black pr-2 pl-2"
		>
			<div class="container-modal mb-5">
				<label
					@click="modalAuco = false"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
			</div>
			<iframe
				id="myIframe"
				className="h-full w-full border-0 pt-12"
				allow="camera;microphone"
			/>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineAsyncComponent, defineComponent, ref } from 'vue'; // Importing Vue functions
import apiService from '@/services/ApiService'; // Importing the API service
import AppTable from '@/components/Table.vue'; // Importing the AppTable component
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component
import '@hennge/vue3-pagination/dist/vue3-pagination.css'; // Importing pagination styles
import { useRoute } from 'vue-router'; // Importing Vue Router's useRoute
import router from '@/router'; // Importing the router instance

export default defineComponent({
	components: {
		AppForm, // Registering AppForm component
		SliderNormalComponent: defineAsyncComponent(
			// Registering an async component for the carousel
			() => import('@/components/Carousel.vue')
		),
		AppTable, // Registering AppTable component
		VPagination, // Registering VPagination component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing app component data
		let emitter = this.$emitter(); // Accessing event emitter
		const components: any = ref([]); // Reactive reference for components
		let device: string = ''; // Device type (mobile/desktop)
		let login: string = ''; // Login status
		let login2: string = ''; // Alternate login status
		let banners: any = []; // Array to hold banner data
		let loadView = true; // Flag to control loading view
		let titleForm: string = this.$t('¡Participa!'); // Title for the form
		let textButton: string = this.$t('Participar'); // Button text
		let textDownForm: string = ''; // Additional text for the form
		let backgroundForm: string = '#000000'; // Background color for the form
		let fieldsValidDocument: any = // Fields for valid document based on configuration
			this.$config() != undefined &&
			this.$config().landingLottery != undefined &&
			this.$config().landingLottery.validDocument != undefined &&
			this.$config().landingLottery.validDocument[
				this.$appComponent['country']
			] != undefined
				? this.$config().landingLottery.validDocument[
						this.$appComponent['country']
					]
				: [];
		let fieldsRegisterUser: any = // Fields for user registration based on configuration
			this.$config() != undefined &&
			this.$config().landingLottery != undefined &&
			this.$config().landingLottery.registerUser != undefined &&
			this.$config().landingLottery.registerUser[
				this.$appComponent['country']
			] != undefined
				? this.$config().landingLottery.registerUser[
						this.$appComponent['country']
					]
				: [];
		let fieldsRegisterTicket: any = // Fields for ticket registration based on configuration
			this.$config() != undefined &&
			this.$config().landingLottery != undefined &&
			this.$config().landingLottery.registeTicket != undefined &&
			this.$config().landingLottery.registeTicket[
				this.$appComponent['country']
			] != undefined
				? this.$config().landingLottery.registeTicket[
						this.$appComponent['country']
					]
				: [];
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model for form data
		let recaptcha: boolean = // Flag to show/hide reCAPTCHA
			this.$config() != undefined &&
			this.$config().landingLottery != undefined &&
			this.$config().landingLottery.recaptcha != undefined &&
			this.$config().landingLottery.recaptcha.show != undefined
				? this.$config().landingLottery.recaptcha.show
				: false;
		let background: string = ''; // Background variable
		let user: any = {
			// User object to hold user data
			id: '',
			name: '',
		};
		let step: number = 1; // Current step in the process
		let tableColumns: any = []; // Columns for the table
		let loadingTable: boolean = false; // Flag to indicate if the table is loading
		let showTemplate: boolean = false; // Flag to control template visibility
		let page: any = 0; // Current page number
		let page2: any; // Second page variable
		let pages: any; // Total number of pages
		let totalCount: any = 0; // Total count of items
		let tickets: any = []; // Array to hold ticket data
		let lottery: any = {}; // Object to hold lottery data
		let lotteryId = ''; // Lottery ID variable

		// Determine device type for banner display
		if (appComponent.mobile == '') {
			device = 'bannersDesktop';
		} else {
			if (appComponent.mobile == '1') {
				device = 'bannersMobile';
			}
		}

		// Determine login status
		if (appComponent.session.logueado) {
			login = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login = 'notLogin';
			}
		}

		// Set alternate login status
		if (appComponent.session.logueado) {
			login2 = 'login';
		} else {
			if (!appComponent.session.logueado) {
				login2 = 'not_login';
			}
		}

		// Fetch banners based on configuration and login status
		if (
			config != undefined &&
			config[login2] != undefined &&
			config[login2][appComponent.lngProd] != undefined &&
			config[login2][appComponent.lngProd]['banners'] != undefined &&
			config[login2][appComponent.lngProd]['banners'][
				'banner_landing-lottery'
			] != undefined
		) {
			banners = JSON.parse(
				JSON.stringify(
					config[login2][appComponent.lngProd]['banners'][
						'banner_landing-lottery'
					]
				)
			);
		} else {
			if (
				config != undefined &&
				config[device] != undefined &&
				config[device][appComponent.country] != undefined &&
				config[device][appComponent.country][appComponent.lngProd] !=
					undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				] != undefined &&
				config[device][appComponent.country][appComponent.lngProd][
					login
				]['landing-lottery'] != undefined
			) {
				banners = JSON.parse(
					JSON.stringify(
						config[device][appComponent.country][
							appComponent.lngProd
						][login]['landing-lottery']
					)
				);
			}
		}

		// Populate components based on configuration
		if (
			config != undefined &&
			config['components'] != undefined &&
			config['components'][appComponent.country] != undefined &&
			config['components'][appComponent.country]['landingLottery'] !=
				undefined
		) {
			config['components'][appComponent.country][
				'landingLottery'
			].forEach((component: any) => {
				component.banners = banners; // Assign banners to component
				components.value.push(component); // Add component to the reactive array
			});
		}
		return {
			config,
			appComponent,
			emitter,
			components,
			loadView,
			titleForm,
			textButton,
			textDownForm,
			backgroundForm,
			fieldsValidDocument,
			fieldsRegisterUser,
			fieldsRegisterTicket,
			arraySelects,
			model,
			modelInitial,
			recaptcha,
			background,
			user,
			step,
			tableColumns,
			loadingTable,
			page,
			page2,
			pages,
			totalCount,
			tickets,
			lottery,
			lotteryId,
			showTemplate,
		};
	},
	setup() {
		const route = useRoute(); // Accessing the current route
		let lotteryId: any = ref(route.params.LotteryId); // Reactive reference for lottery ID
		return {
			lotteryId,
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
		this.fieldsRegisterUser.forEach((field) => {
			// Populate select options for user registration fields
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options;
				Object.assign(this.arraySelects, options); // Merge options into arraySelects
			}
		});
		if (
			this.config != undefined &&
			this.config.landingLottery != undefined &&
			this.config.landingLottery.tableColumns != undefined &&
			this.config.landingLottery.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.landingLottery.tableColumns[
					this.appComponent.country
				]; // Set table columns based on configuration
		}
		this.getLottery(); // Fetch lottery data
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Clone initial model
	},
	methods: {
		onSubmit(values: any) {
			// Handle form submission
			if (this.step == 1) {
				// Step 1: Document number check
				apiService
					.request('exist_docnumber', values) // API call to check document number
					.then((response: any) => {
						if (response.code == 0) {
							// Successful response
							this.user.id = response.data.id; // Set user ID
							this.user.name = response.data.name; // Set user name
							this.appComponent.modal = {
								// Show notification modal
								showModal: 'notification',
								titleModal:
									this.$t('Hola ') + response.data.name,
								messageModal: this.$t(
									'A continuación debes registrar tus tickets. Cada ticket es una oportunidad de ganar!'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'register_tickets',
							};
						} else {
							if (response.code == 12) {
								// Document not registered
								this.appComponent.modal = {
									showModal: 'notification',
									titleModal: this.$t('Error!'),
									messageModal: this.$t(
										'El documento de identidad no se encuentra registrado'
									),
									buttonModal: this.$t('Registrar'),
									orderModal: 'register_user',
								};
							} else {
								// Handle other errors
								var error_mensaje = '';
								if (response.error_code != undefined) {
									error_mensaje = this.$t(
										'ERROR' + response.error_code.toString()
									);
								}
								if (
									error_mensaje == '' &&
									response.data != undefined
								) {
									error_mensaje = this.$t(response.data);
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
						}
					});
			} else {
				if (this.step == 2) {
					// Step 2: Confirm user data
					this.appComponent.modal = {
						showModal: 'notification',
						titleModal: this.$t('¿Tus datos estan correctos?'),
						messageModal: this.$t(
							'Es clave para reclamar tu premio si eres un feliz ganador.'
						),
						buttonModal: this.$t('Aceptar'),
						orderModal: 'confirm_register',
						values: values,
					};
				} else {
					if (this.step == 3) {
						// Step 3: Confirm ticket data
						this.appComponent.modal = {
							showModal: 'notification',
							titleModal: this.$t('¿Tus datos estan correctos?'),
							messageModal: this.$t(
								'Es clave para reclamar tu premio si eres un feliz ganador.'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'valid_ticket',
							values: values,
						};
					}
				}
			}
		},
		closeModal() {
			// Close the modal
			this.appComponent.closeModal();
		},
		acceptModal() {
			// Handle modal acceptance
			if (this.appComponent.modal.orderModal == 'confirm_register') {
				// Confirm user registration
				apiService
					.request(
						'register_user_new',
						this.appComponent.modal.values
					)
					.then((response: any) => {
						if (response.code == 0) {
							// Successful registration
							this.appComponent.modal = {
								showModal: 'notification',
								titleModal: this.$t('Mensaje'),
								messageModal: this.$t(
									'El usuario se ha registrado correctamente.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.changeStep(1); // Change to step 1
						} else {
							// Handle registration errors
							var error_mensaje = '';
							if (response.error_code != undefined) {
								error_mensaje = this.$t(
									'ERROR' + response.error_code.toString()
								);
							}
							if (
								error_mensaje == '' &&
								response.data != undefined
							) {
								error_mensaje = this.$t(response.data);
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
			} else {
				if (this.appComponent.modal.orderModal == 'register_user') {
					// Proceed to register user
					this.changeStep(2);
				} else {
					if (
						this.appComponent.modal.orderModal == 'register_tickets' // Proceed to register tickets
					) {
						this.titleForm =
							'<br><h3>' +
							this.$t('Estimad@ ') +
							this.user.name +
							'</h3>';
						this.textButton = this.$t('Registrar Tickets');
						this.step = 3; // Change to step 3
						this.getTickets(); // Fetch tickets
					} else {
						if (
							this.appComponent.modal.orderModal == 'valid_ticket' // Validate ticket
						) {
							let params = {
								ticketId: this.appComponent.modal.values.ticket,
								idUser: this.user.id,
								lotteryId: this.lotteryId,
							};
							apiService
								.request('draw_record', params)
								.then((response: any) => {
									if (response.code == 0) {
										// Successful ticket registration
										this.appComponent.modal = {
											showModal: 'notification',
											titleModal: this.$t(
												'Su solicitud ha sido procesada'
											),
											messageModal: this.$t(
												'Tickets Registrados'
											),
											buttonModal: this.$t('Aceptar'),
											orderModal: 'close_modal',
										};
										this.getTickets(); // Fetch updated tickets
										this.model = JSON.parse(
											JSON.stringify(this.modelInitial)
										); // Reset model
									} else {
										// Handle ticket registration errors
										var error_mensaje = '';
										if (response.error_code != undefined) {
											error_mensaje = this.$t(
												'ERROR' +
													response.error_code.toString()
											);
										}
										if (
											error_mensaje == '' &&
											response.data != undefined
										) {
											error_mensaje = this.$t(
												response.data
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
						}
					}
				}
			}
			this.appComponent.closeModal(); // Close the modal
		},
		updateHandler(handler: any) {
			// Handle pagination update
			this.page = handler - 1; // Update current page
			this.getTickets(); // Fetch tickets for the new page
		},
		getTickets() {
			// Fetch tickets for the user
			const params = {
				id: this.user.id,
				count: 10, // Number of tickets to fetch
				start: this.page * 10, // Starting index for pagination
				lotteryId: this.lotteryId, // Lottery ID
			};
			this.loadingTable = true; // Set loading flag
			apiService.request('get_tickets', params).then((response: any) => {
				if (response.code == 0) {
					// Successful response
					this.tickets = JSON.parse(JSON.stringify(response.data)); // Set tickets data
					this.totalCount = parseInt(response.total_count); // Set total count
					this.pages = parseInt(this.totalCount) / 10; // Calculate total pages
					this.pages = parseInt(this.pages) + 1; // Adjust total pages
					this.loadingTable = false; // Reset loading flag
				}
			});
		},
		getLottery() {
			// Fetch lottery data
			let params = {
				lotteryId: this.lotteryId, // Lottery ID
			};
			apiService
				.request('get_lottery_betshop', params)
				.then((response: any) => {
					if (response.code == 0) {
						// Successful response
						response.data.awards.sort(function (a, b) {
							// Sort awards by position
							return a.position - b.position;
						});
						this.lottery = response.data; // Set lottery data
						this.showTemplate = true; // Show template
					} else {
						router.push('/home'); // Redirect to home on error
					}
				});
		},
		changeStep(step) {
			// Change the current step
			if (step == 1) {
				this.titleForm = this.$t('¡Participa!'); // Set title for step 1
				this.textButton = this.$t('Participar'); // Set button text for step 1
				this.step = 1; // Update step
			} else {
				if (step == 2) {
					this.titleForm = this.$t('¡Registrate!'); // Set title for step 2
					this.textButton = this.$t('Registrate'); // Set button text for step 2
					this.step = 2; // Update step
				}
			}
			this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Reset model
		},
	},
});
</script>
<template>
	<!-- Main container for the lottery participation template -->
	<div v-if="showTemplate">
		<!-- Carousel for displaying banners -->
		<div class="relative carousel container-carousel w-full h-full">
			<div id="item1" class="slide carousel-item w-full">
				<div class="w-full shadow-container">
					<img
						width="1423"
						height="280"
						:src="lottery.img"
						class="w-full h-full img-shadow-container"
					/>
				</div>
			</div>
		</div>
		<section class="relative flex justify-center items-center">
			<img
				:src="lottery.background"
				alt=""
				class="absolute in top-0 w-full h-full object-cover object-top"
			/>
			<article
				class="flex flex-col justify-center items-center w-full max-w-[1300px] text-white z-20 my-5 lg:my-20 gap-5"
			>
				<div
					class="w-[80%] flex flex-col justify-center items-center gap-6"
				>
					<h2
						class="in text-3xl lg:text-4xl font-semibold text-center"
					>
						{{ lottery.title }}
					</h2>
					<div
						class="grid gap-3 lg:text-left text-center text-base lg:text-lg font-normal"
					>
						<p class="in" v-html="lottery.description"></p>
					</div>
					<!-- Participation buttons based on the current step -->
					<a
						@click="changeStep(1)"
						v-if="step == 2"
						class="py-2 px-8 text-xl font-medium rounded-lg bg-success2 hover:bg-success2/70 hover:scale-105 shadow-sm shadow-black/50"
						>{{ $t('Participar') }}</a
					>
					<a
						@click="changeStep(2)"
						v-if="step == 1"
						class="py-2 px-8 text-xl font-medium rounded-lg bg-success2 hover:bg-success2/70 hover:scale-105 shadow-sm shadow-black/50"
						>{{ $t('Registrarme') }}</a
					>
					<a
						@click="changeStep(1)"
						v-if="step == 3"
						class="py-2 px-8 text-xl font-medium rounded-lg bg-success2 hover:bg-success2/70 hover:scale-105 shadow-sm shadow-black/50"
						>{{ $t('Cerrar sesión') }}</a
					>
				</div>
				<div class="w-3/4">
					<!-- Form components for different steps -->
					<AppForm
						v-if="step == 1"
						:loading="loadView"
						:title="titleForm"
						:fields="fieldsValidDocument"
						:styleWidth="false"
						:backgroundForm="backgroundForm"
						:arraySelects="arraySelects"
						:model="model"
						:textDown="textDownForm"
						:textButton="textButton"
						:recaptcha="recaptcha"
						@onSubmit:form="onSubmit($event)"
					/>
					<AppForm
						v-if="step == 2"
						:loading="loadView"
						:title="titleForm"
						:fields="fieldsRegisterUser"
						:styleWidth="false"
						:backgroundForm="backgroundForm"
						:arraySelects="arraySelects"
						:model="model"
						:textDown="textDownForm"
						:textButton="textButton"
						:recaptcha="recaptcha"
						@onSubmit:form="onSubmit($event)"
					/>
					<AppForm
						v-if="step == 3"
						:loading="loadView"
						:title="titleForm"
						:fields="fieldsRegisterTicket"
						:styleWidth="false"
						:backgroundForm="backgroundForm"
						:arraySelects="arraySelects"
						:model="model"
						:textDown="textDownForm"
						:textButton="textButton"
						:recaptcha="recaptcha"
						@onSubmit:form="onSubmit($event)"
					/>
					<!-- Table for displaying tickets if step 3 -->
					<div
						v-if="step == 3 && totalCount > 0"
						class="overflow-x-auto lg:w-8/12 max-w-3xl msform w-full mx-auto"
					>
						<AppTable
							:tableColumns="tableColumns"
							:data="tickets"
							:loading="loadingTable"
						/>
					</div>
					<!-- Pagination component for tickets -->
					<v-pagination
						v-if="step == 3 && totalCount > 0"
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
					<div
						class="flex flex-col justify-start items-center w-full gap-4"
					>
						<h2
							class="text-3xl lg:text-4xl font-semibold text-center"
						>
							{{ $t('Premios') }}
						</h2>
						<!-- Loop through lottery awards -->
						<article
							v-for="award in lottery.awards"
							class="md:grid md:grid-cols-3 md:w-8/12 w-full bg-secondary/90 rounded-[31px] px-6 py-2 border-3 border-solid border-[#424242] shadow-md shadow-black hover:bg-secondary-content hover:scale-105 cursor-pointer"
						>
							<div
								class="mb-3 md:mb-0 flex flex-col justify-center items-center gap-4"
							>
								<img
									:src="award.img"
									alt=""
									class="w-[70px] h-[70px] object-contain"
								/>
								<div
									class="text-sm lg:text-base h-auto min-w-[100px] max-w-[185px] break-normal"
								>
									<p class="w-full font-bold text-center">
										{{ award.description }}
									</p>
								</div>
							</div>
							<div
								class="mb-3 md:mb-0 flex justify-center items-center gap-2"
							>
								<img
									src="https://images.virtualsoft.tech/m/msjT1689194455.png"
									alt=""
									class="mb-1 w-6"
								/>
								<span class="text-[#B4B4B4]">
									{{ award.fixedTime }}
								</span>
							</div>
							<div
								class="mb-3 md:mb-0 flex justify-center items-center gap-2"
								v-if="
									award.userWin != undefined &&
									award.userWin != ''
								"
							>
								<img
									src="https://images.virtualsoft.tech/m/msjT1689194493.png"
									alt=""
									class="mb-1 w-6"
								/>
								<span class="text-[#B4B4B4]">
									{{ award.userWin }}
								</span>
							</div>
						</article>
					</div>
					<!-- Rules section for the lottery -->
					<div
						class="md:w-8/12 mx-auto h-96 w-full overflow-y-auto flex justify-center items-start text-center text-white my-5 p-2 rounded-xl border-2 border-solid border-white"
					>
						<p v-html="lottery.rules"></p>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>
<style scoped>
.table-content {
	min-height: 100% !important; /* Ensure minimum height for table content */
	height: 100% !important; /* Set height for table content */
	max-height: 100% !important; /* Set maximum height for table content */
}
</style>

<!-- FILE DOCUMENTED -->

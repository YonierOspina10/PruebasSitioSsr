<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import HorizontalMenu from '@/components/HorizontalMenu.vue'; // Importing HorizontalMenu component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import router from '@/router'; // Importing router for navigation
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import MinusIcon from '@/components/icons/MinusIcon.vue'; // Importing MinusIcon component
import InfoIcon from '@/components/icons/InfoIcon.vue'; // Importing InfoIcon component
import ZoomIcon from '@/components/icons/ZoomIcon.vue'; // Importing ZoomIcon component
import ExitIconRe from '@/components/icons/ExitIconRe.vue'; // Importing ExitIconRe component

export default defineComponent({
	components: {
		ExitIconRe, // Registering ExitIconRe component
		ZoomIcon, // Registering ZoomIcon component
		InfoIcon, // Registering InfoIcon component
		ExitIcon, // Registering ExitIcon component
		HorizontalMenu, // Registering HorizontalMenu component
		MinusIcon, // Registering MinusIcon component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing the app component
		let emitter = this.$emitter(); // Getting the event emitter
		let activateEmail = false; // Flag to activate email functionality
		let activeteLink = false; // Flag to activate link functionality
		let emails = [{ email: '' }]; // Array to hold email addresses
		let inputUrl: any = ''; // Variable to hold input URL
		let params = {}; // Object to hold parameters for API requests
		let subT: any = ''; // Variable for subject text
		let loader = false; // Loader flag for asynchronous operations
		let messages: any = ''; // Variable to hold messages
		let IsVerified: boolean = false; // Flag to check if user is verified
		let previewEmail: boolean = false; // Flag to show email preview
		let menuUserNotValid = {
			// Menu configuration for invalid users
			MENU_ID: '48',
			MENU_TITLE: 'Referidos',
			MENU_SLUG: 'referido',
			MENU_EDITAR: true,
			MENU_ELIMINAR: false,
			MENU_ADICIONAR: true,
			SUBMENUS: [
				{
					SUBMENU_ID: '2418',
					SUBMENU_URL: 'agregar_referidos',
					SUBMENU_TITLE: 'Agregar referidos',
				},
			],
		};
    let menu = {
			// Menu configuration for valid users
			MENU_ID: '48',
			MENU_TITLE: 'Referidos',
			MENU_SLUG: 'referido',
			MENU_EDITAR: true,
			MENU_ELIMINAR: false,
			MENU_ADICIONAR: true,
			SUBMENUS: [
				{
					SUBMENU_ID: '2418',
					SUBMENU_URL: 'agregar_referidos',
					SUBMENU_TITLE: 'Agregar referidos',
				},
				{
					SUBMENU_ID: '2419',
					SUBMENU_URL: 'estado_referidos',
					SUBMENU_TITLE: 'Estado de referidos',
				},
			],
		};
		let routers = {}; // Object to hold router configuration
		let onModal = false; // Flag to control modal visibility
		let title: string = ''; // Title for modal
		let message: string = ''; // Message for modal
		let landingProgres: boolean = false; // Flag for landing progress
		let valueCondition: any = ''; // Variable for condition value
		let porcent: any = 0; // Percentage variable
		let copiLink: boolean = false; // Flag to indicate if link is copied
    let referralSettings: any = {};
    return {
			config,
			appComponent,
			routers,
			activateEmail,
			activeteLink,
			inputUrl,
			emails,
			params,
			messages,
			emitter,
			subT,
			onModal,
			title,
			message,
			landingProgres,
			valueCondition,
			porcent,
			menu,
			menuUserNotValid,
			loader,
			IsVerified,
			copiLink,
			previewEmail,
      referralSettings,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	beforeMount() {
		this.validUserReferral(); // Validate user referral before mounting
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Set up event listener for modal acceptance
			this.acceptModal();
		});
	},
	methods: {
		showDeposit() {
			this.appComponent.showModalDepositV2 = true; // Show deposit modal
		},
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'newRoute') {
				// Check if modal order is 'newRoute'
				router.push('/home'); // Navigate to home
				this.appComponent.closeModal(); // Close modal
			} else {
				this.appComponent.closeModal(); // Close modal
			}
		},
		validUserReferral() {
			this.loader = true; // Show loader
      apiService
          .request('get_referral_program_settings', {})
          .then((resp: any) => {
            if (resp.code == 0) {
              this.referralSettings = resp.data;
            }
          });
			apiService
				.request('validate_referent', {}) // Validate referent via API
				.then((response: any) => {
					if (response.code == 0) {
						// Check response code
						this.routers = this.menu; // Set routers to valid menu
						this.loader = false; // Hide loader
					} else if (response.code == 1) {
						// Handle invalid user case
						this.landingProgres = true; // Show landing progress
						this.loader = false; // Hide loader
						this.routers = this.menuUserNotValid; // Set routers to invalid menu
						this.porcent = response.data.ProgressPercentage; // Set progress percentage
						for (
							let i = 0;
							i < response.data.ReferentConditions.length;
							i++
						) {
							this.valueCondition =
								response.data.ReferentConditions[i].TargetValue; // Get target value
						}
						if (response.data.IsVerified == 1) {
							// Check if user is verified
							this.IsVerified = true; // Set verified flag
						}
					} else if (
						response.error_code == 4019 ||
						response.error_code == 4008
					) {
						router.push('/home'); // Redirect to home on error
					}
				});
		},
		activateButtonEmail() {
			if (this.appComponent.session.logueado) {
				// Check if user is logged in
				this.activateEmail = true; // Activate email button
				this.activeteLink = false; // Deactivate link button
				apiService
					.request('get_referent_menu', {}) // Get referent menu via API
					.then((response: any) => {
						if (response.code == 0) {
							// Check response code
							this.messages = response.data.Message; // Set messages
							this.subT = response.data.Subject; // Set subject
						}
					});
			} else {
				this.appComponent.showModalLogin = true; // Show login modal
			}
		},
		activeButtonLink() {
			if (this.appComponent.session.logueado) {
				// Check if user is logged in
				this.activeteLink = true; // Activate link button
				this.activateEmail = false; // Deactivate email button
				apiService
					.request('get_referent_menu', {}) // Get referent menu via API
					.then((response: any) => {
						if (response.code == 0) {
							// Check response code
							this.inputUrl = response.data.Url; // Set input URL
						}
					});
			} else {
				this.appComponent.showModalLogin = true; // Show login modal
			}
		},
		linkCopi() {
			let input: any = document.getElementById('textCopy'); // Get input element by ID
			if (this.inputUrl != '') {
				// Check if input URL is not empty
				input.select(); // Select input text
				document.execCommand('copy'); // Copy selected text to clipboard
				this.copiLink = true; // Set link copied flag
			}
		},
		addEmail() {
			if (this.emails.length < 4) {
				// Check if less than 4 emails
				this.emails.push({ email: '' }); // Add new email input
			}
		},
		submit() {
			apiService
				.request('send_referent_invitation', this.params) // Send referent invitation via API
				.then((respponse: any) => {
					if (respponse.code == 0) {
						// Check response code
						this.appComponent.modal = {
							// Set modal for success
							showModal: 'notification',
							titleModal: this.$t(respponse.data.AlertMessage),
							messageModal: this.$t(
								'El correo se envió exitosamente'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					} else {
						this.appComponent.modal = {
							// Set modal for error
							showModal: 'notification',
							titleModal: this.$t('Ocurrio algo..'),
							messageModal: this.$t(
								'No se pudo enviar el correo'
							),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
			this.emails = [{ email: '' }]; // Reset emails array
		},
		deletInput(i) {
			let index = parseInt(i); // Parse index to integer
			this.emails.splice(index, 1); // Remove email input at index
		},
		cachParams() {
			let EmailAddresses = ['']; // Initialize email addresses array
			let mParam = ''; // Initialize parameter variable
			EmailAddresses.pop(); // Remove last element (empty)
			for (let i = 0; i < this.emails.length; i++) {
				// Loop through emails
				if (this.validEmail(this.emails) && this.messages != '') {
					// Validate emails and check messages
					EmailAddresses.push(this.emails[i].email); // Add email to array
					mParam = this.messages; // Set message parameter
				}
			}
			if (EmailAddresses.length != 0 && this.validEmail(this.emails)) {
				// Check if there are valid emails
				this.params = {
					// Set parameters for API request
					EmailAddresses,
				};
				window.scrollTo(0, 0); // Scroll to top of the page
				this.title = this.$t('Enviar correo'); // Set modal title
				this.message = this.$t(
					'¿ Esta seguro que desea enviar el correo ?'
				); // Set modal message
				this.onModal = true; // Show confirmation modal
			} else {
				this.appComponent.modal = {
					// Set modal for invalid email
					showModal: 'notification',
					titleModal: this.$t('Correo invalido'),
					messageModal: this.$t(
						'Por favor ingrese una direccionde correo valida'
					),
					buttonModal: this.$t('Aceptar'),
					orderModal: 'closeModal',
				};
			}
		},
		validEmail(emails) {
			var re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regular expression for email validation
			let response: boolean = false; // Initialize response flag
			emails.forEach((emails) => {
				// Loop through emails
				response = re.test(emails.email); // Test each email against regex
			});
			return response; // Return validation result
		},
		closeModal() {
			this.appComponent.closeModal(); // Close modal
		},
	},
});
</script>
<template>
	<!-- Main modal for confirmation and notifications -->
	<div v-if="onModal" class="modal z-[999999999]">
		<div
			class="bg-gradient-to-b from-accent-content to-neutral-content/50 bg-accent-content rounded-[3rem] p-10 flex flex-col gap-y-6 justify-center items-center relative"
		>
			<!-- Close button for modal -->
			<label
				v-if="config.layout != undefined && config.layout == 3"
				@click="onModal = false"
				class="absolute text-xl -top-1 -right-1 hover:scale-105 z-1 cursor-pointer in"
			>
				<ExitIconRe class="w-10 h-10" />
			</label>
			<h3 class="text-center text-neutral font-poppinssb" v-t>
				{{ title }}
				<!-- Modal title -->
			</h3>
			<p class="text-center text-neutral font-poppinssl" v-t>
				{{ message }}
				<!-- Modal message -->
			</p>
			<div class="flex w-full gap-x-7 justify-center items-center">
				<!-- Accept button for modal -->
				<button
					@click="(submit(), (onModal = false))"
					class="rounded-full bg-neutral-content bg-gradient-to-r from-primary-content/70 to-primary-content/70 text-neutral hover:bg-primary-content duration-300 transition-all px-5 sm:px-3 py-2 font-poppinsm text-xl sm:text-base in"
					v-t
				>
					{{ $t('Aceptar') }}
					<!-- Button text -->
				</button>
			</div>
		</div>
	</div>
	<!-- Preview modal for email content -->
	<div v-if="previewEmail" class="modal z-[999999999]">
		<div
			class="h-[93%] sm:h-[99%] w-[93%] sm:w-[35%] container-general overflow-y-auto p-10 flex flex-col gap-x-6 justify-center items-center"
		>
			<span
				@click="previewEmail = !previewEmail"
				class="absolute top-3 sm:top-5 right-5 cursor-pointer"
			>
				<ExitIcon
					width="30px"
					height="30px"
					fill="white"
					fill2="#a5a5a5"
				/>
			</span>
			<div
				v-html="messages != undefined ? messages : ''"
				class="h-full w-full"
			/>
		</div>
	</div>
	<!-- Header for layout configuration -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div class="Framework InfoPage mi-cuenta bg-neutral-content">
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<div
					class="Container ActivePageTitle"
					:class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1">
						<span
							class="text-neutral font-bold text-3xl text-neutral"

							>{{ $t('REFERIR A UN AMIGO') }}</span
						>
					</span>
				</div>
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<HorizontalMenu :object="routers" />
					<!-- Horizontal menu component -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<!-- Loader display -->
						<div
							v-if="loader"
							class="h-[400px] p-5 rounded-b-xl bg-gradient-to-b from-base-300 to-neutral-content pb-14 max-h-max text-neutral shadow-md w-[80vw] lg:w-[67vw] md:w-[85vw] sm:w-[67vw] flex items-center justify-center"
						>
							<svg
								fill="none"
								class="w-28 h-28 animate-spin opacity-75"
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
						<!-- Content display when not loading -->
						<div
							v-if="!landingProgres && !loader"
							class="p-5 rounded-b-xl bg-gradient-to-b from-base-300 to-neutral-content pb-14 max-h-max text-neutral shadow-md w-[80vw] lg:w-[67vw] md:w-[85vw] sm:w-[67vw]"
						>
							<article
								class="flex flex-col pl-0 sm:pl-[5.5rem] sm:flex-row"
							>
								<div
									class="w-[70vw] flex flex-col pt-0 sm:pt-8 gap-2 sm:gap-8"
								>
									<div
										class="flex items-center justify-between"
									>
										<h1
											class="text-xl sm:text-3xl font-bold"
										>
											{{
												config != undefined &&
												config.viewReferrals !=
													undefined &&
												config.viewReferrals.title !=
													undefined
													? $t(
															config.viewReferrals
																.title
														)
													: $t('Centro de referencia')
											}}
										</h1>
										<img
											:src="
												config != undefined &&
												config.viewReferrals !=
													undefined &&
												config.viewReferrals
													.imgViewActive != undefined
													? $t(
															config.viewReferrals
																.imgViewActive
														)
													: config != undefined &&
														  config.referrals !=
																undefined &&
														  config.referrals
																.imgViewActive !=
																undefined
														? config.referrals
																.imgViewActive
														: ''
											"
											alt=""
											class="h-20 flex sm:hidden"
										/>
									</div>
									<p
										v-if="
											config != undefined &&
											config.viewReferrals != undefined &&
											config.viewReferrals.text !=
												undefined
										"
										v-html="config.viewReferrals.text"
									></p>
									<RouterLink
										v-if="
											config != undefined &&
											config.viewReferrals != undefined &&
											config.viewReferrals.text !=
												undefined
										"
										:to="config.referrals.urlRedirection"
										class="text-primary"
									>
										{{
											$t(
												config.viewReferrals
													.textConditions
											)
										}}
									</RouterLink>
									<p
										v-else
										class="text-sm sm:text-base text-justify"
									>
										{{
											config != undefined &&
											config.referrals != undefined &&
											config.referrals.text != undefined
												? $t(config.referrals.text)
												: ''
										}}
										<span
											class="text-primary"
											v-html="
												config != undefined &&
												config.referrals != undefined &&
												config.referrals
													.textConditions != undefined
													? $t(
															config.referrals
																.textConditions
														)
													: ''
											"
										/>
									</p>
								</div>
								<div
									class="w-[50vw] justify-center items-center pl-0 pt-5 hidden sm:flex"
								>
									<img
										:src="
											config != undefined &&
											config.viewReferrals != undefined &&
											config.viewReferrals
												.imgViewActive != undefined
												? $t(
														config.viewReferrals
															.imgViewActive
													)
												: config != undefined &&
													  config.referrals !=
															undefined &&
													  config.referrals
															.imgViewActive !=
															undefined
													? config.referrals
															.imgViewActive
													: ''
										"
										alt=""
										class="h-[90%]"
									/>
								</div>
							</article>
							<article
								class="flex flex-col items-center justify-center"
							>
								<div
									class="pr-[9rem] p-5 pl-[3rem] lg:pl-[5.5rem] md:pl-[5.5rem]"
								>
									<h1
										class="text-md sm:text-lg text-center sm:text-start w-[80vw] pl-20 sm:text-2xl sm:w-auto sm:pl-0"
									>
										{{
											$t(
												'Envía a tus amigos tu enlace de referencia único'
											)
										}}
									</h1>
								</div>
								<div class="pl-0">
									<section
										class="bg-base-300 rounded-[20px] sm:rounded-[30px] h-[25vh] sm:h-[27vh] w-[70vw] sm:w-[55vw] border-neutral-focus border-3 shadow-xl flex flex-col gap-3 sm:gap-5 justify-center items-center"
									>
										<div
											class="text-sm sm:text-lg flex justify-center items-center pt-1 sm:pt-0 w-[90%] sm:w-[65%]"
										>
                      <p v-if="referralSettings.email_invitations === 'A'" class="text-center">
												<span
													class="text-primary-content"
													>{{
														$t('Haga clic ')
													}}</span
												>
												{{
													$t(
														'en los iconos correspondientes para elegir si desea compartir'
													)
												}}
												<span
													class="text-primary-content"
													>{{
														$t(
															'por correo electrónico'
														)
													}}</span
												>
												{{ $t('o') }}
												<span
													class="text-primary-content"
													>{{
														$t('mediante un enlace')
													}}</span
												>
												{{ $t('con sus amigos.') }}
											</p>
                      <p v-else class="text-center">
                        <span class="text-primary-content">
                          {{
                            $t(
                                'Haga clic '
                            )
                          }}</span>
                        {{
                          $t(
                              'en el icono para compartir un enlace de registro con sus amigos.'
                          )
                        }}
                      </p>
										</div>
										<div class="flex gap-8 pb-2">
											<span
                          v-if="referralSettings.email_invitations === 'A'"
                          :class="
													activateEmail ? '' : 'in'
												"
												class="bg-accent px-1 sm:px-0 rounded-2xl flex items-center border-neutral/20 border-3 hover:border-primary-content hover:scale-110 transition ease-in-out"
											>
												<button
													@click="activateButtonEmail"
													class="bg-accent px-1"
												>
													<img
														class="w-14 sm:w-auto"
														:src="
															config !=
																undefined &&
															config.viewReferrals !=
																undefined &&
															config.viewReferrals
																.iconEmail !=
																undefined
																? config
																		.viewReferrals
																		.iconEmail
																: 'https://images.virtualsoft.tech/m/msjT1695739677.png'
														"
														alt="email"
													/>
												</button>
											</span>
											<span
												:class="
													activeteLink ? '' : 'in'
												"
												class="bg-accent rounded-2xl px-4 py-3 flex items-center rounded-2xl flex items-center border-neutral/20 border-3 hover:border-primary-content hover:scale-110 transition-all ease-in-out"
											>
												<button
													@click="activeButtonLink"
													class="bg-accent"
												>
													<img
														class="w-10 sm:w-auto"
														:src="
															config !=
																undefined &&
															config.viewReferrals !=
																undefined &&
															config.viewReferrals
																.iconLink !=
																undefined
																? config
																		.viewReferrals
																		.iconLink
																: 'https://images.virtualsoft.tech/m/msjT1695679644.png'
														"
														alt="link"
													/>
												</button>
											</span>
										</div>
									</section>
								</div>
							</article>
							<div
								v-if="activateEmail"
								class="pt-7 sm:pt-10 flex mx-0 sm:mx-20 justify-center"
							>
								<section
									class="bg-base-300 rounded-3xl px-0 sm:px-7 max-h-full w-[100rem] sm:w-[110%] pb-7 sm:pb-9 border-neutral-focus border-3 shadow-xl flex flex-col"
								>
									<div
										class="pt-3 sm:pt-7 px-5 sm:px-1 flex flex-col gap-5"
									>
										<div class="flex flex-col gap-3 w-ful">
											<h3
												class="text-md sm:text-lg font-bold"
											>
												{{ $t('Por e-mail') }}
												<!-- Email section title -->
											</h3>
											<p
												class="text-center sm:text-left text-sm sm:text-base"
											>
												{{
													$t(
														'Envíe su enlace personal a sus correos electrónicos '
													)
												}}
												<span
													v-if="
														appComponent.mobile !=
														''
													"
													>{{ $t('a ') }}</span
												>
												<span
													v-if="
														appComponent.mobile !=
														''
													"
													class="font-bold underline"
												>
													{{
														$t('hasta 4 contactos.')
													}}
												</span>
											</p>
										</div>
										<div
											class="flex justify-between items-center"
										>
											<p class="text-md sm:text-base">
												{{ $t('Estimado(a):') }}
												<!-- Greeting text -->
											</p>
											<span
												class="flex justify-center items-center gap-1"
											>
												<button
													@click="addEmail"
													:class="
														emails.length == 4
															? 'tooltip opacity-70'
															: 'hover:scale-105 transition ease-in hover:shadow-[0px_6px_8px_-3px] hover:shadow-neutral-content/70'
													"
													class="border-2 border-accent-content rounded-3xl px-2 sm:px-5 py-1 sm:py-2 bg-accent text-sm sm:text-base"
												>
													{{ $t('Adicionar e-mail') }}
													<!-- Button to add email -->
												</button>
												<span
													:data-tip="
														$t(
															'Limite maximo 4 e-mails'
														)
													"
													class="tooltip tooltip-top hidden sm:block"
												>
													<InfoIcon
														width="22px"
														height="23px"
													/>
												</span>
											</span>
										</div>
										<section
											class="grid grid-cols-2 gap-4 sm:gap-8 items-end"
										>
											<div
												v-for="(
													emailObj, index
												) in emails"
												:key="index"
												class="w-full relative"
											>
												<input
													type="email"
													v-model="emailObj.email"
													class="rounded-3xl sm:rounded-2xl w-[100%] h-7 sm:h-auto border-accent-content border-2 sm:border-3 bg-neutral-content"
													:class="
														index == 0 ? '' : ''
													"
												/>
												<div
													v-if="index != 0"
													@click="deletInput(index)"
													class="absolute top-1 sm:top-2 right-1 sm:right-2 cursor-pointer"
												>
													<MinusIcon
														class="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]"
													/>
												</div>
											</div>
										</section>
									</div>
									<div
										class="pt-3 px-5 sm:px-1 flex flex-col items-start gap-5"
									>
										<p class="text-sm sm:text-base">
											{{ $t('Mensaje') }}
											<!-- Message section title -->
										</p>
										<div
											class="flex justify-between items-end w-full"
										>
											<div
												@click="
													previewEmail = !previewEmail
												"
												class="w-[50%] sm:w-[22%] h-[20vh] sm:h-[22vh] text-justify p-3 rounded-2xl border-accent-content border-2 bg-neutral-content relative overflow-hidden cursor-pointer"
											>
												<div
													v-html="
														messages != undefined
															? messages
															: ''
													"
													class="object-contain h-full w-full overflow-hidden"
												></div>
												<span
													class="absolute top-0 left-0 bg-neutral/10 h-full w-full rounded-2xl flex justify-center items-center hover:scale-110 transition ease-in"
												>
													<ZoomIcon
														height="66px"
														width="66px"
														class="hover:scale-110 transition ease-in cursor-pointer"
													/>
												</span>
											</div>
											<button
												@click="cachParams"
												class="bg-primary/60 font-bold rounded-3xl w-[26%] sm:w-[10.5%] h-7 sm:h-10 hover:bg-primary text-sm sm:text-base"
											>
												{{ $t('Enviar') }}
												<!-- Send button text -->
											</button>
										</div>
									</div>
								</section>
							</div>
							<div
								v-if="activeteLink"
								class="pt-10 flex mx-0 sm:mx-20 justify-center"
							>
								<section
									class="bg-base-300 rounded-[20px] sm:rounded-[30px] max-h-max w-[100rem] sm:w-[110%] pb-5 sm:pb-8 border-neutral-focus border-3 shadow-xl flex flex-col"
								>
									<div
										class="pt-3 sm:pt-5 px-6 sm:px-10 flex flex-col gap-3 sm:gap-5"
									>
										<h3
											class="text-md sm:text-lg font-bold"
										>
											{{ $t('Link personal') }}
											<!-- Personal link section title -->
										</h3>
										<p
											class="text-sm xl:text-base md:text-sm sm:text-base text-neutral/80"
										>
											{{
												$t(
													'Envíe su enlace personal a sus correos electrónicos: '
												)
											}}
										</p>
										<div class="flex gap-6">
											<input
												id="textCopy"
												readonly
												v-model="inputUrl"
												type="url"
												class="text-neutral/50 rounded-2xl w-[100%] sm:w-[75%] border-accent-content border-2 sm:border-3 bg-neutral-content"
											/>
											<button
												v-if="appComponent.mobile == ''"
												@click="linkCopi"
												:class="
													copiLink == true
														? 'text-neutral'
														: 'text-neutral/80'
												"
												class="text-xl"
											>
												{{
													copiLink == true
														? $t('Link copiado')
														: $t('Copiar')
												}}
											</button>
										</div>
									</div>
									<div
										class="pt-3 sm:pt-5 px-6 sm:px-10 flex flex-col items-start gap-8"
									>
										<p
											class="text-justify sm:text-center w- sm:w-[45vw] text-sm sm:text-lg text-neutral/80"
										>
											<span class="text-neutral">{{
												$t(
													'Seleccione el enlace y cópielo usando CRTL + C,'
												)
											}}</span>
											{{
												$t(
													' utiliza este enlace copiándolo en tu blog, chat, Google+, Linkedin, etc. Es una forma rápida de compartirlo con tus amigos.'
												)
											}}
										</p>
									</div>
								</section>
							</div>
						</div>
						<!-- Landing progress display -->
						<div
							v-if="landingProgres && !loader"
							class="p-5 rounded-b-xl bg-gradient-to-b from-base-300 to-neutral-content pb-14 max-h-max text-neutral shadow-md w-[80vw] lg:w-[67vw] md:w-[85vw] sm:w-[67vw] h-auto"
						>
							<article
								class="flex flex-col px-0 sm:px-2 sm:flex-row"
							>
								<div class="w-[70vw] flex flex-col pt-10 gap-8">
									<h1 class="text-2xl font-bold text-primary">
										{{
											$t(
												'Aún no eres elegible para recibir referencias'
											)
										}}
										<!-- Eligibility message -->
									</h1>
									<p class="text-md sm:text-lg text-justify">
										{{
											$t(
												'Para habilitar esta sección deberás cumplir con un requisito de '
											)
										}}
										<span class="text-primary">{{
											$t(
												'depósito de ' +
													valueCondition +
													' y cuenta verificada'
											)
										}}</span>
										{{
											$t(
												'Cuando realices tu primer depósito con esta cantidad, podrás recomendar a tus amigos y ganar premios y bonificaciones por cada enlace que envíes.'
											)
										}}
									</p>
								</div>
								<div
									class="w-[60vw] sm:w-[50vw] flex justify-center items-center pl-14 sm:pl-0 pt-6 sm:pt-0"
								>
									<img
										:src="
											config != undefined &&
											config.referrals != undefined &&
											config.referrals.imgNonReferral !=
												undefined
												? config.referrals
														.imgNonReferral
												: ''
										"
										alt=""
									/>
								</div>
							</article>
							<article
								class="flex flex-col items-center justify-center"
							>
								<div
									class="w-full h-auto p-10 pl-0 sm:pl-20 flex flex-col sm:flex-row px-0 sm:px-2 justify-start items-center gap-5"
								>
									<RouterLink
										:to="
											IsVerified
												? '/gestion/verificar_cuenta'
												: ''
										"
										class="shadow-[inset_0px_-8px_0px_-1px] shadow-neutral-content/40 in border-1 border-neutral w-44 h-20 rounded-lg text-neutral text-lg flex justify-center text-center items-center before:content-[''] before:absolute before:h-2 before:w-5 before:bg-neutral before:opacity-40 before:top-2 before:left-6 before:rounded-[50%] after:content-[''] after:absolute after:h-2 after:w-3 after:bg-neutral after:opacity-40 after:top-3 after:left-2 after:rounded-[50%] after:-rotate-12"
										:class="
											IsVerified
												? 'bg-gradient-to-b from-accent to-accent-content-content/60 hover:scale-105 hover:bg-success/75'
												: 'bg-gradient-to-b from-accent to-accent-content-content/60 opacity-50 cursor-default'
										"
									>
										{{ $t('Verificar cuenta') }}
										<!-- Verify account button -->
									</RouterLink>
									<RouterLink
										to="#"
										@click="
											() => {
												if (porcent != 100) {
													appComponent.gAnalytics(
														'deposit_profile'
													);
													showDeposit();
												} else {
												}
											}
										"
										class="shadow-[inset_0px_-8px_0px_-1px] shadow-neutral-content/40 in border-1 border-neutral w-44 h-20 rounded-lg text-neutral text-lg flex justify-center relative text-center items-center before:content-[''] before:absolute before:h-2 before:w-5 before:bg-neutral before:opacity-40 before:top-2 before:left-6 before:rounded-[50%] after:content-[''] after:absolute after:h-2 after:w-3 after:bg-neutral after:opacity-40 after:top-3 after:left-2 after:rounded-[50%] after:-rotate-12"
										:class="
											porcent == 100
												? 'bg-gradient-to-b from-accent to-accent-content-content/60 opacity-50 cursor-default'
												: 'bg-gradient-to-b from-accent to-accent-content-content/60 hover:scale-105 hover:bg-success/75'
										"
									>
										{{ $t('Depositar') }}
										<!-- Deposit button -->
									</RouterLink>
								</div>
								<div
									class="flex flex-col-reverse md:flex-row px-0 sm:px-2 gap-2 mr-6 md:mr-0 items-center md:justify-start w-full"
								>
									<span
										class="font-bold text-xl text-[#FD9F05]"
										>{{ porcent + '%' }}</span
									>
									<div
										class="w-11/12 md:w-[65%] h-8 rounded-full bg-[url('https://images.virtualsoft.tech/m/msj-1212T1706029705.png')] md:bg-[130%] bg-[70%] overflow-hidden animatedBackground border-2 border-base-200 shadow-[2px_5px_5px_1px_#000000bf] flex justify-end"
									>
										<span
											:style="{
												width:
													`calc(100% - ` +
													porcent +
													'% )',
											}"
											class="h-full bg-base-200 rounded-r-full block"
										></span>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.animatedBackground {
	animation: animatedBackground 3s infinite; /* Animation for background */
}
@keyframes animatedBackground {
	0% {
		background-position: 40% 22%; /* Initial background position */
	}
	50% {
		background-position: 60% 22%; /* Mid background position */
	}
	100% {
		background-position: 40% 22%; /* Final background position */
	}
}
::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

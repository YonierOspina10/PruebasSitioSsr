<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import DoorOut from '@/components/icons/DoorOut.vue'; // Importing DoorOut icon component
import ExitDoor from '@/components/icons/ExitDoor.vue'; // Importing ExitDoor icon component
import apiService from '@/services/ApiService'; // Importing API service for making requests
import { AucoSDK } from 'auco-sdk-integration'; // Importing AucoSDK for external SDK integration

export default defineComponent({
	components: {
		DoorOut, // Registering DoorOut component
		ExitDoor, // Registering ExitDoor component
	},
	data() {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Accessing application component
		let emitter = this.$emitter(); // Getting event emitter
		let text: any =
			'Por favor, complete la verificación de su cuenta para continuar con el proceso de registro y acceder a nuestros servicios. Sólo debes de hacer clic en el botón Verificar Cuenta. Esta etapa es crucial para asegurar la integridad de su cuenta y brindarle una experiencia segura.'; // Message text for account verification
		let estadoVerify = null; // Verification status
		let img: string = ''; // Image source for verification status
		let titleText: any = ''; // Title text (not used in this fragment)
		let loader: boolean = true; // Loader state
		let modalAuco: boolean = false; // Modal visibility state for AucoSDK
		return {
			config,
			appComponent,
			text,
			estadoVerify,
			img,
			titleText,
			emitter,
			loader,
			modalAuco,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.appComponent.gAnalytics('exit_profile'); // Tracking analytics event
			this.appComponent.logOut(); // Logging out the user
			this.$router.push('/'); // Redirecting to home
			this.appComponent.closeModal(); // Closing modal
		});
		this.init(); // Initializing component data
	},
	methods: {
		init() {
			apiService.request('verification_account', {}).then((response) => {
				// Making API request for account verification
				if (response.code == 0) {
					// Successful response
					this.estadoVerify = response.data.Verification_status; // Setting verification status
					this.text = response.data.Template; // Setting verification message
					this.validImg(); // Validating image based on status
					this.loader = false; // Hiding loader
				} else if (response.code != 0) {
					// Handling non-successful response
					this.validImg(); // Validating image
					this.loader = false; // Hiding loader
				} else {
					var error_mensaje = ''; // Error message initialization
					if (response.error_code != undefined) {
						// Checking for specific error code
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Translating error message
						);
					}
					if (error_mensaje == '') {
						// Default error message if none found
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
						);
					}
					this.appComponent.modal = {
						// Setting modal properties for error display
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
				}
			});
		},
		validImg() {
			if (this.estadoVerify == null || this.estadoVerify == 0) {
				// Checking verification status
				this.img =
					this.config != undefined &&
					this.config.landingVerifyAccount != undefined &&
					this.config.landingVerifyAccount[
						this.appComponent.country
					] != undefined &&
					this.config.landingVerifyAccount[this.appComponent.country]
						.iconDefault != undefined
						? this.config.landingVerifyAccount[
								this.appComponent.country
							].iconDefault // Setting default icon
						: '';
			} else if (this.estadoVerify == 2) {
				// Pending verification status
				this.img =
					this.config != undefined &&
					this.config.landingVerifyAccount != undefined &&
					this.config.landingVerifyAccount[
						this.appComponent.country
					] != undefined &&
					this.config.landingVerifyAccount[this.appComponent.country]
						.iconPending != undefined
						? this.config.landingVerifyAccount[
								this.appComponent.country
							].iconPending // Setting pending icon
						: '';
			} else if (this.estadoVerify == 1) {
				// Refused verification status
				this.img =
					this.config != undefined &&
					this.config.landingVerifyAccount != undefined &&
					this.config.landingVerifyAccount[
						this.appComponent.country
					] != undefined &&
					this.config.landingVerifyAccount[this.appComponent.country]
						.iconRefused != undefined
						? this.config.landingVerifyAccount[
								this.appComponent.country
							].iconRefused // Setting refused icon
						: '';
			}
		},
		verifyJumio() {
			apiService.request('verifica_jumio', {}).then((response: any) => {
				// Making API request for Jumio verification
				if (response.code == 0) {
					// Successful response
					if (response.data.url != undefined) {
						// Checking for redirect URL
						window.location.href = response.data.url; // Redirecting to URL
					} else {
						if (
							response.data.code != undefined &&
							response.data.key != undefined
						) {
							// Checking for necessary data
							this.modalAuco = true; // Showing Auco modal
							setTimeout(() => {
								AucoSDK({
									// Initializing AucoSDK
									iframeId: 'myIframe',
									sdkType: 'validation',
									language: 'es',
									keyPublic: response.data.key,
									events: {
										onSDKReady: () => {
											console.log('onSDKReady'); // Logging SDK ready event
										},
										onSDKClose: (similarity: any) => {
											console.log(
												'similarity',
												similarity // Logging similarity on SDK close
											);
										},
									},
									env: 'PROD', // Setting environment
									sdkData: {
										document: response.data.code, // Document data for SDK
									},
								});
							}, 500); // Delay before initializing SDK
						}
					}
				} else {
					// Handling non-successful response
					var error_mensaje = ''; // Error message initialization
					if (response.error_code != undefined) {
						// Checking for specific error code
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Translating error message
						);
					}
					if (error_mensaje == '') {
						// Default error message if none found
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
						);
					}
					this.appComponent.modal = {
						// Setting modal properties for error display
						showModal: 'notification',
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
				}
			});
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div class="modal fixed w-full h-full z-[999999]">
		<div class="w-full h-full overflow-auto">
			<!-- Background image for the modal -->
			<img
				class="absolute w-full h-full object-cover -z-1"
				:src="
					config != undefined &&
					config.landingVerifyAccount != undefined &&
					config.landingVerifyAccount[appComponent.country] !=
						undefined &&
					config.landingVerifyAccount[appComponent.country].bg !=
						undefined
						? config.landingVerifyAccount[appComponent.country].bg
						: ''
				"
				alt="bg"
			/>
			<!-- Loader displayed while data is being fetched -->
			<div
				v-if="loader"
				class="w-full h-full flex justify-center items-center"
			>
				<svg
					fill="none"
					class="w-52 h-52 animate-spin opacity-75 fill-neutral"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
						fill-rule="evenodd"
					/>
				</svg>
			</div>
			<!-- Main content displayed after loader -->
			<main
				v-if="!loader"
				class="grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-8 lg:gap-0"
			>
				<!-- Header section with logo and exit button -->
				<div
					class="flex items-center justify-between px-3 md:px-16 col-span-1 lg:col-span-2"
				>
					<img
						class="h-10 md:h-24 pointer-events-none"
						:src="
							config != undefined &&
							config.landingVerifyAccount != undefined &&
							config.landingVerifyAccount[appComponent.country] !=
								undefined &&
							config.landingVerifyAccount[appComponent.country]
								.logo != undefined
								? config.landingVerifyAccount[
										appComponent.country
									].logo
								: ''
						"
						alt="logo"
					/>
					<button
						class="in h-12 w-12 flex justify-center items-center hover:scale-105"
						@click="
							appComponent.gAnalytics('exit_profile');
							appComponent.logOut();
						"
					>
						<ExitDoor
							:height="30"
							:width="30"
							:fill="'#fffffe'"
							class="ml-1 fill-neutral-content"
						/>
					</button>
				</div>
				<!-- Main content sections based on verification status -->
				<div
					class="flex justify-start lg:items-start items-center flex-col gap-8 pl-0 lg:pl-16 py-0 lg:py-14"
				>
					<section
						v-if="estadoVerify == null"
						class="lg:text-start text-center pb-20 h-[50%]"
					>
						<div class="relative h-[50%]">
							<p
								class="text-neutral text-4xl lg:text-6xl font-bold text-center z-40"
							>
								{{ $t('VERIFICACIÓN DE') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full ml-[2.5%] mt-[1.1%] styleText top-0 left-0 text-4xl lg:text-6xl font-bold text-center -z-1"
							>
								{{ $t('VERIFICACIÓN DE') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full ml-[1.0%] mt-[0.8%] styleText top-0 left-0 text-4xl lg:text-6xl font-bold text-center -z-1"
							>
								{{ $t('VERIFICACIÓN DE') }}
							</p>
						</div>
						<div class="relative h-[50%]">
							<p
								class="text-primary relative text-8xl lg:text-[9rem] font-bold text-center z-40 after:content-[''] after:absolute after:bottom-0 after:-z-1 after:left-0 after:bg-transparent after:w-full after:h-[0.1px] after:shadow-[0px_-70px_24px_16px_,_0px_-67px_65px_7px] lg:after:shadow-[-20px_-102px_24px_16px_,_0px_-67px_65px_7px] after:shadow-neutral-content/50 lg:after:shadow-neutral-content/50"
							>
								{{ $t('CUENTA') }}
							</p>
							<p
								class="absolute text-neutral-content styleTextDefault top-0 left-0 ml-[2.5%] mt-[1.1%] text-8xl lg:text-[9rem] font-bold w-full h-full -z-1"
							>
								{{ $t('CUENTA') }}
							</p>
							<p
								class="absolute text-neutral-content styleTextDefault top-0 left-0 ml-[1.0%] mt-[0.8%] text-8xl lg:text-[9rem] font-bold w-full h-full opacity-50 -z-1"
							>
								{{ $t('CUENTA') }}
							</p>
						</div>
					</section>
					<section
						v-if="estadoVerify == 0"
						class="lg:text-start text-center pb-20 h-[50%]"
					>
						<div class="relative h-[50%]">
							<p
								class="text-neutral text-3xl md:text-6xl font-bold z-40"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[2.0%] mt-[1.5%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[1.0%] mt-[0.8%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
						</div>
						<div class="relative h-[50%]">
							<p
								class="text-primary text-7xl md:text-9xl font-bold z-40"
							>
								{{ $t('APROBADA') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full top-0 left-0 ml-[2.0%] mt-[1.5%] styleTextDefault text-7xl md:text-9xl font-bold -z-1"
							>
								{{ $t('APROBADA') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full top-0 left-0 ml-[1.0%] mt-[0.8%] styleTextDefault text-7xl md:text-9xl font-bold -z-1"
							>
								{{ $t('APROBADA') }}
							</p>
						</div>
					</section>
					<section
						v-if="estadoVerify == 2"
						class="lg:text-start text-center pb-20 h-[50%]"
					>
						<div class="relative h-[50%]">
							<p
								class="text-neutral text-3xl md:text-6xl font-bold z-40"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[2.0%] mt-[1.5%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[1.0%] mt-[0.8%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
						</div>
						<div class="relative h-[50%]">
							<p
								class="text-warning text-6xl md:text-9xl font-bold z-40"
							>
								{{ $t('PENDIENTE') }}
							</p>
							<p
								class="absolute text-neutral-content h-full w-full styleTextPending top-0 left-0 ml-[2.0%] mt-[1.5%] text-6xl md:text-9xl font-bold -z-1"
							>
								{{ $t('PENDIENTE') }}
							</p>
							<p
								class="absolute text-neutral-content h-full w-full styleTextPending top-0 left-0 ml-[1.0%] mt-[0.8%] text-6xl md:text-9xl font-bold -z-1"
							>
								{{ $t('PENDIENTE') }}
							</p>
						</div>
					</section>
					<section
						v-if="estadoVerify == 1"
						class="lg:text-start text-center pb-20 h-[50%]"
					>
						<div class="relative h-[50%]">
							<p
								class="text-neutral text-3xl md:text-6xl font-bold z-40"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[2.0%] mt-[1.5%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
							<p
								class="absolute w-full h-full top-0 left-0 ml-[1.0%] mt-[0.8%] text-neutral-content styleText text-3xl md:text-6xl font-bold -z-1"
							>
								{{ $t('VERIFICACIÓN DE CUENTA') }}
							</p>
						</div>
						<div class="relative h-[50%]">
							<p
								class="text-[#DF0000] text-6xl md:text-9xl font-bold z-40"
							>
								{{ $t('RECHAZADA') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full top-0 left-0 ml-[2.0%] mt-[1.5%] styleTextRefused text-6xl md:text-9xl font-bold -z-1"
							>
								{{ $t('RECHAZADA') }}
							</p>
							<p
								class="absolute text-neutral-content w-full h-full top-0 left-0 ml-[1.0%] mt-[0.8%] styleTextRefused text-6xl md:text-9xl font-bold -z-1"
							>
								{{ $t('RECHAZADA') }}
							</p>
						</div>
					</section>
					<!-- Displaying verification message -->
					<p
						class="w-[95%] xl:w-[74%] text-neutral text-justify text-base lg:text-xl p-5 lg:p-0"
						v-html="text"
					></p>
					<!-- Action buttons based on verification status -->
					<div
						class="flex gap-2 sm:gap-10"
						:class="
							estadoVerify != null
								? 'justify-center items-center'
								: ''
						"
					>
						<button
							v-if="estadoVerify == null"
							class="text-neutral border-2 rounded-lg font-bold]"
							@click="
								appComponent.gAnalytics('exit_profile');
								appComponent.logOut();
							"
						>
							<p
								class="whitespace-nowrap w-full px-10 sm:px-16 py-3"
							>
								{{ $t('En otro momento') }}
							</p>
						</button>
						<button
							v-if="estadoVerify != 2"
							@click="
								() => {
									if (estadoVerify == 0) {
										$router.push('/deportes');
									} else {
										verifyJumio();
									}
								}
							"
							class="relative text-neutral bg-gradient-to-r from-primary/80 to-primary border-1 rounded-lg font-bold shadow-[inset_0px_-7px_3px] shadow-neutral-content/40 after:content-[''] after:absolute after:top-1 after:left-1 after:w-5 after:h-2 after:bg-neutral-content/10 after:rounded-[50%] after:-rotate-12 before:content-[''] before:absolute before:w-2 before:h-2 before:top-0 before:left-7 before:bg-neutral-content/10 before:rounded-full"
						>
							<p
								class="whitespace-nowrap w-full px-10 sm:px-16 py-3"
							>
								{{
									estadoVerify == null
										? $t('Verificar Cuenta')
										: '' || estadoVerify == 0
											? $t('Apostar ahora')
											: '' || estadoVerify == 1
												? $t('Volver a intentarlo')
												: ''
								}}
							</p>
						</button>
					</div>
				</div>
				<!-- Image displayed based on verification status -->
				<div
					class="w-full h-full flex items-center justify-center"
					:class="estadoVerify == 1 ? 'relative' : ''"
				>
					<img
						:class="
							estadoVerify == 1
								? 'relative lg:absolute top-0 left-0 lg:left-52 w-[60%] lg:w-[50%]'
								: 'w-[50%]'
						"
						:src="img"
						alt="icon"
					/>
				</div>
			</main>
		</div>
	</div>
	<!-- Modal for AucoSDK -->
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
<style scoped>
/* Text shadow styles for different verification states */
.styleText {
	filter: drop-shadow(1px 1px 0px hsl(var(--b1))); /* Base shadow */
}

.styleTextDefault {
	filter: drop-shadow(1px 1px 0px hsl(var(--p))); /* Default shadow */
}

.styleTextPending {
	filter: drop-shadow(1px 1px 0px hsl(var(--wa))); /* Pending shadow */
}

.styleTextRefused {
	filter: drop-shadow(1px 1px 0px #df0000); /* Refused shadow */
}
</style>

<!-- FILE DOCUMENTED -->

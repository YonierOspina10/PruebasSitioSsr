<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import router from '@/router'; // Importing router for navigation

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the app component
		let loadingForm = true; // State to indicate if the form is loading
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Additional text for the form
		let fields: any =
			this.$config().changePassword.form[this.$appComponent['country']]; // Fields for the change password form
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let fontColorForm: string = ''; // Font color for the form
        let switchM = false
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
			fontColorForm,
            switchM
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Event listener for modal acceptance
			this.appComponent.closeModal(); // Close the modal
		});
		this.fields.forEach((field) => {
			// Iterate through form fields
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {}; // Create options object
				options[field.optionsKey] = field.options; // Assign options to the key
				Object.assign(this.arraySelects, options); // Merge options into arraySelects
			}
		});
		if (
			this.appComponent.config['changePassword'] != undefined &&
			this.appComponent.config['changePassword']['fontColorForm'] !=
				undefined
		) {
			this.fontColorForm =
				this.appComponent.config['changePassword']['fontColorForm']; // Set font color from config
		}
        this.switchM = this.appComponent.switch2FAUser
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params = {
				password: values.current_password, // Current password
				new_password: values.password, // New password
			};
			apiService
				.request('update_user_password', params) // API request to update password
				.then((response: any) => {
					// Handle API response
					if (response.code == 0) {
						// Check for successful response
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Contraseña cambiada satisfactoriamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
						this.refreshBalance(); // Refresh balance after successful update
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Reset model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Generic error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Action to close modal
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for select change event
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Close the modal
		},
        activeModal2FA(){
            if(!this.appComponent.switch2FAUser) {
                this.appComponent.switch2FA = true;
            }
        }
	},
});
</script>
<template>
	<!-- Main container for the component -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="test int-header h-[65px] bg-base-200 absolute w-full"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Framework container for the InfoPage -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<!-- Box for displaying information -->
		<div class="Box TextBox NoHeadBox InfoBox ">
			<div class="BoxContent InfoBoxContent">
				<!-- Title container for the active page -->
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

							>{{ $t('Cambiar Contraseña') }}</span
						>
					</span>
				</div>
				<!-- Row for menu and form content -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'cambiar-clave'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'cambiar-clave'"
						:MENU_ID="'3'"
					/>
					<!-- Box for terms and help content -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<!-- Content box for password requirements -->
						<div
							class="p-5 shadow-md bg-base-400"
							style="margin-bottom: 10px"
                            :class="{
                                'text-neutral rounded-b-xl': config.layout != undefined && config.layout != 1 || config.partner == 22,
                                'text-neutral rounded-xl': config.layout == undefined || config.layout == 1 && config.partner != 22,
							}"
						>
							{{ $t('La nueva clave tiene que tener') }}
							<span
								v-if="
									config.passwordPrincipal != undefined &&
									config.passwordPrincipal.passwordChange !=
										undefined &&
									config.passwordPrincipal.passwordChange !=
										null
								"
								>{{ config.passwordPrincipal.passwordChange }}
								{{ $t('caracteres y debe de contener') }}</span
							>
							{{
								$t(
									'mínimo una minúscula, una mayúscula y un número'
								)
							}}
							<br /><span
								v-if="
									config.passwordPrincipal != undefined &&
									config.passwordPrincipal.textPassword !=
										undefined &&
									config.passwordPrincipal
										.DaysExpirePassword != undefined &&
									config.passwordPrincipal
										.DaysExpirePassword != null
								"
								v-t="{
									path: config.passwordPrincipal.textPassword,
									args: {
										password:
											config.passwordPrincipal
												.DaysExpirePassword,
									},
								}"
							></span>
						</div>

                        <div
                            v-if="appComponent.showModal2FA"
                            class="Container InfoContent mb-5 rounded-xl shadow-md bg-base-400 flex flex-col justify-center items-center w-full h-auto py-8 px-5 md:px-[12rem] gap-6 md:gap-0"
                            :class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
                        >
                            <div class="w-full flex flex-col gap-4">
                                <h2
                                    class="font-poppinssb text-xl"
                                >
                                    {{$t("Doble factor de autenticación")}}
                                </h2>

                                <p
                                    class="text-lg"
                                >
                                    {{$t("El doble factor de autenticación mejora la seguridad de tu cuenta. Una vez activado, solo tú podrás acceder con un código adicional generado por una app. Esta opción no se puede desactivar desde tu cuenta.")}}
                                </p>
                            </div>

                            <div class="flex flex-col md:flex-row w-full pt-5 gap-6 md:gap-0">
                                <div class="w-full md:w-[50%] flex flex-col gap-2">
                                    <h3
                                        class="font-poppinssb text-lg"
                                    >
                                        {{$t("Activar doble factor de autenticación")}}
                                    </h3>

                                    <p>
                                        {{$t('Usa una aplicación de autenticación para generar los códigos.')}}
                                    </p>
                                </div>

                                <div class="w-full md:w-[50%] flex justify-start md:justify-end">
                                    <label
                                        class="relative inline-flex items-center justify-center w-16 h-9 bg-neutral-700 rounded-full cursor-pointer transition-all duration-300 ease-in-out overflow-hidden"
                                    >
                                        <!-- Hidden checkbox -->
                                        <input
                                            type="checkbox"
                                            class="hidden"
                                            v-model="switchM"
                                            @click="activeModal2FA()"
                                            :disabled="appComponent.switch2FAUser"
                                        />

                                        <!-- Base del switch -->
                                        <span
                                            class="absolute inset-0 transition-all duration-300 ease-in-out rounded-full"
                                            :class="appComponent.switch2FAUser ? 'bg-green-500/80' : 'bg-neutral-600/60'"
                                        ></span>

                                        <!-- Thumb (círculo) -->
                                        <span
                                            class="absolute top-1 left-1 bg-white w-7 h-7 rounded-full shadow-md transition-all duration-300 ease-in-out"
                                            :class="appComponent.switch2FAUser ? 'translate-x-7' : 'translate-x-0'"
                                        ></span>

                                        <!-- Imagen decorativa opcional -->
                                        <img
                                            v-if="appComponent.switch2FAUser"
                                            src="https://images.virtualsoft.tech/m/msj19212T1758212123.png"
                                            alt=""
                                            class="absolute w-6 h-6 right-1.5"
                                        />
                                    </label>
                                </div>
                            </div>

                        </div>

						<!-- Container for the form component -->
						<div
							class="Container InfoContent mb-5 rounded-xl shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
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
								:fontColorForm="fontColorForm"
								:textButton="'Guardar'"
								@onSubmit:form="onSubmit($event)"
								@changeSelect:form="changeSelect($event)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>
<!-- FILE DOCUMENTED -->

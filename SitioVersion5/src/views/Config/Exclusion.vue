<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing user menu component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing alternative user menu component
import AppForm from '@/components/Form.vue'; // Importing form component
import { defineComponent } from 'vue'; // Importing defineComponent for creating Vue components
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
		let appComponent: any = this.$appComponent; // Accessing the application component
		let loadingForm = true; // State to manage loading status of the form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Additional text for the form
		let fields: any =
			this.$config().autoExclusion.form[this.$appComponent['country']]; // Fields for the form based on country
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
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
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleanup event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.acceptModal();
		});
		this.fields.forEach((field) => {
			// Iterating over fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assigning options to the select
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			let params: any = {
				self_auto: '1', // Parameter for self exclusion
				to_date: values.AutoExclution_date, // Date for exclusion
				Note: values.detalle, // Additional note
			};
			if (params.to_date == undefined && params.Note == undefined) {
				// Check for empty values
				params.override_exclusion = true; // Set override flag
				params.self_auto = 0; // Reset self_auto
				params.to_date = ''; // Clear date
				params.Note = ''; // Clear note
			} else {
				params.override_exclusion = false; // Set override flag to false
			}
			apiService
				.request('set_client_self_exclusion', params) // Making API request
				.then((response: any) => {
					// Handling response
					if (response.code == 0) {
						// Check for successful response
						if (params.override_exclusion == false) {
							this.appComponent.modal = {
								// Setting modal for successful exclusion
								showModal: 'notification',
								titleModal: this.$t('Mensaje'),
								messageModal: this.$t(
									'Se aplicó la Autoexclusion correctamente.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'acceptExclusion',
							};
						} else {
							this.appComponent.modal = {
								// Setting modal for successful partial exclusion removal
								showModal: 'notification',
								titleModal: this.$t('Mensaje'),
								messageModal: this.$t(
									'Se retiró la autoexclusión parcial correctamente'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'closeModal',
							};
							this.model = JSON.parse(
								JSON.stringify(this.modelInitial) // Resetting model to initial state
							);
						}
					} else {
						var error_mensaje = ''; // Variable to hold error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Fetching error message based on error code
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							// Setting modal for error notification
							showModal: 'notification',
							titleModal: this.$t('Error!'),
							messageModal: error_mensaje,
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
		changeSelect: function (event: any) {}, // Placeholder for select change handling
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal();
		},
		acceptModal() {
			// Method to accept modal actions
			if (this.appComponent.modal.orderModal == 'acceptExclusion') {
				let param = {
					auth_token: localStorage.getItem('auth_token'), // Retrieving auth token from local storage
				};
				apiService
					.request('restore_login_site', param) // Making API request to restore login
					.then((response: any) => {
						if (response.code == 0) {
							this.appComponent.modal = {
								// Setting modal for successful restoration
								showModal: 'notification',
								titleModal: this.$t('Mensaje'),
								messageModal: this.$t(
									'Se aplicó la Autoexclusion correctamente.'
								),
								buttonModal: this.$t('Aceptar'),
								orderModal: 'acceptExclusion',
							};
						}
					});
			}
			this.appComponent.closeModal(); // Closing modal
		},
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
		class="int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main container for the InfoPage when user is logged in -->
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
							? 'my-5 pb-5 border-b-2 border-solid border-primary-content'
							: ''
					"
				>
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

							>{{ $t('Autoexclusión Total') }}</span
						>
					</span>
				</div>
				<!-- Main content area for the form and information -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
					:class="
						config.layout != undefined && config.layout == 3
							? 'px-8'
							: ''
					"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'auto-exclusion'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'auto-exclusion'"
						:MENU_ID="'3'"
					/>
					<!-- Box for terms and help content -->
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
					>
						<div
							class="p-5 shadow-md bg-base-400"
							style="margin-bottom: 10px"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral rounded-b-xl'
									: 'text-neutral-content rounded-xl'
							"
						>
							<span
								v-if="
									config.autoExclusion != undefined &&
									config.autoExclusion.principalInfo !=
										undefined &&
									config.autoExclusion.principalInfo != null
								"
								>{{ $t(config.autoExclusion.principalInfo) }}
							</span>
							<br />
							<div class="flex gap-2 pt-4">
								<span
									v-if="
										config.autoExclusion != undefined &&
										config.autoExclusion.reAperturaInfo !=
											undefined &&
										config.autoExclusion.reAperturaInfo !=
											null
									"
									>{{
										$t(config.autoExclusion.reAperturaInfo)
									}}
								</span>
							</div>
							<div class="flex gap-2 pt-4">
								<span
									v-if="
										config.autoExclusion != undefined &&
										config.autoExclusion.InfoDetallada !=
											undefined &&
										config.autoExclusion.InfoDetallada !=
											null
									"
									>{{
										$t(config.autoExclusion.InfoDetallada)
									}}
								</span>
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
								:textButton="'GUARDAR'"
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

<!-- FILE DOCUMENTED -->

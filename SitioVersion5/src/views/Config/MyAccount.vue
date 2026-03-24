<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import AppForm from '@/components/Form.vue'; // Importing AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import router from '@/router'; // Importing router for navigation

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		AppForm, // Registering AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Getting event emitter
		let appComponent: any = this.$appComponent; // Getting application component
		let loadingForm = false; // State for loading form
		let titleForm: string = ''; // Title for the form
		let textDownForm: string = ''; // Text below the form
		let fields: any = []; // Fields for the form
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state
		let widthForm: any = {}; // Width configuration for the form
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let fontColorForm: string = ''; // Font color for the form

		// Check for configuration and set fields accordingly
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['Mi Cuenta'] != undefined &&
			config['forms']['Mi Cuenta']['inputs'] != undefined
		) {
            let formM = config['forms']['Mi Cuenta']['inputs']
            if(appComponent.infoApp){
                formM.forEach((item: any) => {
                    item.disabled = true
                })
                fields = JSON.parse(
                    JSON.stringify(formM)
                );
            }else {
                fields = JSON.parse(
                    JSON.stringify(formM)
                );
            }
		} else if (
            config != undefined &&
            config['miCuenta'] != undefined &&
            config['miCuenta']['form'] != undefined &&
            config['miCuenta']['form'][this.$appComponent['country']] !=
                undefined
        ) {
            let formM = config['miCuenta']['form'][this.$appComponent['country']]
            if(appComponent.infoApp){
                formM.forEach((item: any) => {
                    item.disabled = true
                })
                fields = JSON.parse(
                    JSON.stringify(formM)
                );
            }else {
                fields = JSON.parse(
                    JSON.stringify(formM)
                );
            }
        }

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
				apiService.request('get_user', {}).then((response: any) => {
					// Requesting user data
					if (response.code == 0) {
						this.fields.forEach((element) => {
							// Iterating over form fields
							if (
								typeof response.data[element.name] ==
									'string' ||
								typeof response.data[element.name] == 'number'
							) {
								if (element.type.toString() == 'date') {
									this.model[element.name] = new Date(
										response.data[element.name]
									)
										.toISOString()
										.split('T')[0]; // Formatting date
								} else {
									this.model[element.name] =
										response.data[element.name]; // Assigning value to model
								}
								if (element.name.toString() == 'email') {
									response.data.email2 = response.data.email; // Duplicating email for validation
								}
							} else {
								if (
									typeof response.data[element.name] ==
									'object'
								) {
									if (
										Array.isArray(
											response.data[element.name]
										)
									) {
										if (
											response.data[element.name] !=
												undefined &&
											response.data[element.name].length >
												0
										) {
											this.model[element.name] =
												response.data[
													element.name
												][0].Id; // Assigning first Id to model
											this.changeSelectInit({
												value: response.data[
													element.name
												][0].Id.toString(),
												optionsKey: element.optionsKey,
											}); // Initializing select change
										}
									} else {
										if (
											response.data[element.name] !=
												null ||
											response.data[element.name] !=
												undefined
										) {
											this.changeSelectInit({
												value: response.data[
													element.name
												].Id.toString(),
												optionsKey: element.optionsKey,
											}); // Initializing select change
											setTimeout(() => {
												this.model[element.name] =
													response.data[
														element.name
													].Id; // Assigning Id to model
												this.modelInitial = JSON.parse(
													JSON.stringify(this.model) // Storing initial model state
												);
											}, 100);
										}
									}
								}
							}
						});
						this.loadingForm = true; // Setting loading state to true
						this.modelInitial = JSON.parse(
							JSON.stringify(this.model) // Storing initial model state
						);
					}
				});
			}
		});
		this.fields.forEach((field) => {
			// Iterating over fields to set select options
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
		if (
			this.appComponent.config['miCuenta'] != undefined &&
			this.appComponent.config['miCuenta']['fontColorForm'] != undefined
		) {
			this.fontColorForm =
				this.appComponent.config['miCuenta']['fontColorForm']; // Setting font color from config
		}
		if (
            this.config != undefined &&
            this.config['forms'] != undefined &&
            this.config['forms']['Mi Cuenta'] != undefined &&
            this.config['forms']['Mi Cuenta']['description'] != undefined
            ) {
                this.textDownForm = this.config['forms']['Mi Cuenta']['description'];
            }
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			values.country != undefined
				? (values.country = this.arraySelects['countryList'].filter(
						(x) => x.Id == values.country
					)[0]) // Filtering country list
				: (values.country = null);
			values.department_id != undefined
				? (values.department_id = this.arraySelects[
						'departmentList'
					].filter((x) => x.Id == values.department_id)[0]) // Filtering department list
				: (values.department_id = null);
			values.city_id != undefined
				? (values.city_id = this.arraySelects['cityList'].filter(
						(x) => x.Id == values.city_id
					)[0]) // Filtering city list
				: (values.city_id = null);
			let params = {
				user_info: values, // Preparing parameters for API request
			};
			apiService.request('update_user', params).then((response: any) => {
				// Requesting user update
				if (response.code == 0) {
					this.appComponent.modal = {
						showModal: 'notification', // Setting modal for success notification
						titleModal: this.$t('Mensaje'),
						messageModal: this.$t(
							'Se ha enviado la actualización correctamente, nuestros operadores se encargaran de validar esta información.'
						),
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
					this.model = JSON.parse(JSON.stringify(this.modelInitial)); // Resetting model to initial state
					this.refreshBalance(); // Refreshing balance
				} else {
					var error_mensaje = '';
					if (response.error_code != undefined) {
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Preparing error message
						);
					}
					if (error_mensaje == '') {
						error_mensaje = this.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
						);
					}
					this.appComponent.modal = {
						showModal: 'notification', // Setting modal for error notification
						titleModal: this.$t('Error!'),
						messageModal: error_mensaje,
						buttonModal: this.$t('Aceptar'),
						orderModal: 'closeModal',
					};
				}
			});
		},
		changeSelectInit: function (event: any) {
			// Method to handle initial select change
			let value = event.value; // Getting selected value
			let optionsKey = event.optionsKey; // Getting options key
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Cloning arraySelects
			if (optionsKey == 'countryList') {
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value)
					.map((x) => x.departments)[0]; // Getting departments for selected country
				departments.forEach((department) => {
					department.value = department.Id; // Setting value for department options
					department.name = department.Name; // Setting name for department options
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Assigning department list to arraySelects
				});
			} else {
				if (optionsKey == 'departmentList') {
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value)
						.map((x) => x.cities)[0]; // Getting cities for selected department
					cities.forEach((city) => {
						city.value = city.Id; // Setting value for city options
						city.name = city.Name; // Setting name for city options
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Assigning city list to arraySelects
				}
			}
		},
		changeSelect: function (event: any) {
			// Method to handle select change
			let value = event.event.target.value; // Getting selected value
			let optionsKey = event.optionsKey; // Getting options key
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Cloning arraySelects
			if (optionsKey == 'countryList') {
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value)
					.map((x) => x.departments)[0]; // Getting departments for selected country
				departments.forEach((department) => {
					department.value = department.Id; // Setting value for department options
					department.name = department.Name; // Setting name for department options
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Assigning department list to arraySelects
				});
				this.model['department_id'] = ''; // Resetting department_id in model
				this.model['city_id'] = ''; // Resetting city_id in model
			} else {
				if (optionsKey == 'departmentList') {
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value)
						.map((x) => x.cities)[0]; // Getting cities for selected department
					cities.forEach((city) => {
						city.value = city.Id; // Setting value for city options
						city.name = city.Name; // Setting name for city options
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Assigning city list to arraySelects
					this.model['city_id'] = ''; // Resetting city_id in model
				}
			}
		},
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal();
		},
		acceptModal() {
			// Method to accept modal
			this.appComponent.closeModal();
		},
	},
});
</script>
<template>
	<!-- Header section for the layout -->
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-base-200 from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main container for the account information page -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title section for the active page -->
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

							>{{ $t('Mi Cuenta') }}</span
						>
					</span>
				</div>
				<!-- User menu and form content -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'gestion_cuenta'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'gestion_cuenta'"
						:MENU_ID="'3'"
					/>
					<div
						class="BoxContent TermsContentBox HelpContentBox w-full"
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
					>
						<div
							class="Container InfoContent mb-5 shadow-md bg-base-400"
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral rounded-b-xl'
									: 'text-neutral-content rounded-xl'
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
								:textButton="'Enviar'"
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

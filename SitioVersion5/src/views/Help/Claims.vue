<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Storing the app component reference
		let loadingForm = false; // State to track loading status of the form
		let titleForm: string = this.$t('Hoja de reclamaciones'); // Title for the form
		let textUp: string = this.$t(
			'INTERPLAY WORD S.A.C. (DORADOBET), identificado con RUC Nro. 20602190103, con domicilio legal en la calle Schell Nro. 374, Urb. Leuro, Distrito de Miraflores, provincia y departamento de Lima. De conformidad a lo establecido en el Código de Protección y Defensa del Consumidor, ponemos a disposición del consumidor nuestro Libro de Reclamaciones para que puedas registrar tu queja o reclamo sobre alguno de nuestros productos o servicios brindados.'
		); // Text displayed above the form
		let textDownForm: string = this.$t(''); // Text displayed below the form (currently empty)
		let fields: any =
			this.$config().reclamaciones.form[this.$appComponent['country']]; // Form fields based on country configuration
		let arraySelects: any = {}; // Object to hold select options
		let fontColorForm: string = ''; // Variable to hold the font color for the form
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state for the form
		let widthForm: any = {}; // Object to hold form width settings
		let recaptcha: boolean =
			this.$config().reclamaciones.recaptcha.show !== undefined
				? this.$config().reclamaciones.recaptcha.show // Check if reCAPTCHA should be shown
				: false;
		let refreshBalance = this.$refreshBalance; // Reference to refresh balance function
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
			textUp,
			textDownForm,
			widthForm,
			recaptcha,
			fontColorForm,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on component unmount
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Set up event listener for modal acceptance
			this.appComponent.closeModal(); // Close the modal when accepted
		});
		if (
			this.config['reclamaciones'] != undefined &&
			this.config['reclamaciones']['fontColorForm'] != undefined
		) {
			this.fontColorForm = this.config['reclamaciones']['fontColorForm']; // Set font color if defined in config
		}
		this.fields.forEach((field) => {
			// Iterate over form fields to populate select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assign options to the corresponding key
				Object.assign(this.arraySelects, options); // Merge options into arraySelects
			}
		});
		setTimeout(() => {
			this.loadingForm = true; // Set loading state after a delay
		}, 100);
		apiService
			.request('get_points', { country: this.appComponent.country }) // Request points based on country
			.then((response: any) => {
				let points: any = [
					{ name: 'Canal Online', value: 'canalonline' }, // Default point
				];
				if (response.data.length > 0) {
					response.data.forEach((departament: any) => {
						// Iterate through departments in response
						departament.Points.forEach((point: any) => {
							// Iterate through points in each department
							point.name = point.PuntoDeVenta; // Set point name
							point.value = point.PuntoDeVenta; // Set point value
							points.push(point); // Add point to points array
						});
					});
				}
				Object.assign(this.arraySelects, {
					establecimientoList: points, // Add points to arraySelects
					addressPVList: '', // Add point addresses to arraySelects
				});
			});
		apiService.request('get_countries', {}).then((response: any) => {
			// Request list of countries
			if (response.code == 0) {
				for (var i = 0; i < response.data.length; i++) {
					// Iterate through countries in response
					response.data[i].value = response.data[i].Id; // Set value for country
					response.data[i].name = response.data[i].Name; // Set name for country
				}
				Object.assign(this.arraySelects, {
					countryList: response.data, // Add countries to arraySelects
				});
				this.loadingForm = true; // Set loading state to true
			}
		});
	},
	methods: {
		onSubmit(values: any) {
			// Method to handle form submission
			values.tipoForm = 1; // Set form type

			const feedback = this.appComponent.session.logueado ? 'user_feedback_session' : 'user_feedback'

			apiService
				.request(feedback, values) // Send user feedback to the API
				.then((response: any) => {
					if (response.code == 0) {
						// Check if response indicates success
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Title for the modal
							messageModal: this.$t(
								'Se ha enviado correctamente la queja/reclamo, muchas gracias por querer contactarnos, lo antes posible te estaremos respondiendo.'
							), // Success message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Action to take on button click
						};
						this.model = JSON.parse(
							JSON.stringify(this.modelInitial) // Reset model to initial state
						);
					} else {
						var error_mensaje = ''; // Variable to hold error message
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
							titleModal: this.$t('Error!'), // Title for the modal
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text for modal
							orderModal: 'closeModal', // Action to take on button click
						};
					}
				});
		},
		changeSelect: function (event: any) {
			// Method to handle changes in select inputs
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get the key for the select options
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Clone arraySelects
			if (optionsKey == 'establecimientoList') {
				let selected = (arraySelects['establecimientoList'] || []).find(
					(x: any) => x.value == value
				);
				let direccion = selected ? selected.Direccion || '' : '';
				Object.assign(this.arraySelects, { addressPVList: direccion });
				this.model['direccionLocal'] = direccion;
				return;
			}
			if (optionsKey == 'countryList') {
				// If country list is changed
				let departments = arraySelects['countryList']
					.filter((x) => x.Id == value) // Filter departments based on selected country
					.map((x) => x.departments)[0]; // Get departments for the selected country
				departments.forEach((department) => {
					// Iterate through departments
					department.value = department.Id; // Set value for department
					department.name = department.Name; // Set name for department
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Add departments to arraySelects
				});
				this.model['depto_id'] = ''; // Reset department ID in model
				this.model['ciudad_id'] = ''; // Reset city ID in model
			} else {
				if (optionsKey == 'departmentList') {
					// If department list is changed
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value) // Filter cities based on selected department
						.map((x) => x.cities)[0]; // Get cities for the selected department
					cities.forEach((city) => {
						// Iterate through cities
						city.value = city.Id; // Set value for city
						city.name = city.Name; // Set name for city
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Add cities to arraySelects
					this.model['ciudad_id'] = ''; // Reset city ID in model
				}
			}
		},
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Call closeModal on appComponent
		},
	},
});
</script>
<template>
	<div
		v-if="config.layout != 3 && config.layout != 7"
		class="int-header bg-base-200 absolute w-full h-[65px]"
	></div>
	<!-- Alternative header for layout 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="hidden int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-40 bg-neutral-content absolute w-full"
    ></div>
	<!-- Main content area for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta overflow-y-hidden"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent mx-auto w-full">
				<!-- Title container -->
				<div
					class="Container my-5 pb-5 w-full md:w-10/12 mx-auto"
				>
					<span class="h1">
						<span
							class="text-primary font-bold text-3xl"

							>{{ $t('Reclamaciones') }}</span
						>
					</span>
				</div>
				<!-- User menu and content area -->
				<div
					class="row justify-content-center w-full lg:w-10/12 mx-auto"
				>
					<!-- Main container for the menu, displayed if menu is defined -->
					<div class="w-full scrollMenu flex justify-start pb-0 overflow-x-auto" >
						<!-- Ordered list for the scrollable menu items -->
						<ol class="flex gap-2">
							<RouterLink
								:to="'/reclamaciones'"
								:class="[
									'in flex items-center justify-center text-center h-16 px-3 rounded-t-lg text-xs lg:text-sm font-semibold w-full leading-4',
									$route.path === '/reclamaciones'
										? 'bg-base-400 text-primary'
										: 'bg-base-300 text-neutral'
								]"
							>
								<span>{{ $t('Hoja de reclamación') }}</span>
							</RouterLink>
						
							<RouterLink
								v-if="appComponent.session.logueado"
								:to="'/mis-reclamaciones'"
								:class="[
									'in flex items-center justify-center text-center h-16 px-3 rounded-t-lg text-xs lg:text-sm font-semibold w-full leading-4',
									$route.path === '/mis-reclamaciones'
										? 'bg-base-400 text-primary'
										: 'bg-base-300 text-neutral'
								]"
							>
								<span>{{ $t('Mis reclamaciones') }}</span>
							</RouterLink>
						</ol>
					</div>
					<div
						:class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:px-8'
						"
						class="BoxContent TermsContentBox HelpContentBox w-full"
					>
						<!-- AppForm component for user input -->
						<div
							:class="
								config.layout != undefined && config.layout == 3
									? 'text-neutral'
									: 'text-neutral-content'
							"
							class="Container InfoContent mb-5 shadow-md bg-base-400"
						>
					<!-- Main form component for submitting complaints -->
					<AppForm
						:loading="loadingForm"
						:fontColorForm="fontColorForm"
						:styleWidth="false"
						:twoColumnsMobile="false"
						:title="titleForm"
						:textUp="textUp"
						:fields="fields"
						:arraySelects="arraySelects"
						:model="model"
						:textDown="textDownForm"
						:textButton="'Enviar'"
						:recaptcha="recaptcha"
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

<style scoped>
/* Active link styling */
.active--link {
	background-color: #242637 !important; /* Background color for active link */
	color: #ffffff !important; /* Text color for active link */
}

/* Hide the scrollbar for the scroll menu */
.scrollMenu::-webkit-scrollbar {
	display: none; /* Hide scrollbar */
}
</style>
<!-- FILE DOCUMENTED -->

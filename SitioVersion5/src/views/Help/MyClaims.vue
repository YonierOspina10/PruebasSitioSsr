<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import AppForm from '@/components/Form.vue'; // Importing the AppForm component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import moment from 'moment'; // Importing moment.js for date manipulation
import AppTable from '@/components/Table.vue'; // Importing AppTable component
import VPagination from '@hennge/vue3-pagination'; // Importing pagination component

export default defineComponent({
	components: {
		AppForm, // Registering the AppForm component
        AppTable, // Registering the AppTable component
        VPagination, // Registering the VPagination component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Storing the app component reference
		let loadingForm = false; // State to track loading status of the form
		let textDownForm: string = this.$t(''); // Text displayed below the form (currently empty)
		let buttonForm: string = this.$t('Buscar'); // Text for the form's submit button
		let fields: any =
			this.$config().forms != undefined &&
			this.$config().forms['Mis reclamaciones'] != undefined &&
			this.$config().forms['Mis reclamaciones'].inputs != undefined 
			? this.$config().forms['Mis reclamaciones'].inputs
			: this.$config().myClaims != undefined &&
				this.$config().myClaims.form != undefined &&
				this.$config().myClaims.form[this.$appComponent['country']] != undefined 
				? this.$config().myClaims.form[this.$appComponent['country']]
				: []; // Form fields based on country configuration
		let arraySelects: any = {}; // Object to hold select options
		let fontColorForm: string = ''; // Variable to hold the font color for the form
		let model: any = {}; // Model for form data
		let modelInitial: any = {}; // Initial model state for the form
		let widthForm: any = {}; // Object to hold form width settings
		let refreshBalance = this.$refreshBalance; // Reference to refresh balance function
        let tableColumns: any = []; // Initializing table columns
        let page: any = 0; // Initializing current page
		let page2: any; // Initializing secondary page variable
		let pages: any; // Initializing total pages variable
		let totalCount: any = 0; // Initializing total count of items
        let loadingTable: boolean = false; // Initializing loading state for table
        let data: any = []; // Initializing data array for table
		let showModalPdf: boolean = false; // State to control visibility of PDF modal
		let base64Pdf: string = ''; // Variable to hold base64 encoded PDF data
		return {
			config,
			buttonForm,
            page,
            loadingTable,
            data,
            pages,
            page2,
            totalCount,
            tableColumns,
			emitter,
			appComponent,
			refreshBalance,
			loadingForm,
			fields,
			arraySelects,
			model,
			modelInitial,
			textDownForm,
			widthForm,
			fontColorForm,
			base64Pdf,
			showModalPdf
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on component unmount
	},
	mounted() {
		this.getData(); // Fetch initial data when component is mounted
		if (!this.appComponent.session.logueado) {
			// Redirect to home if user is not logged in
			this.$router.replace('/reclamaciones');
			return
		}
		this.emitter.on('accept:modal', () => {
			// Set up event listener for modal acceptance
			this.appComponent.closeModal(); // Close the modal when accepted
		});
        if (
			this.config != undefined &&
			this.config.myClaims != undefined &&
            this.config.myClaims.tableColumns != undefined &&
			this.config.myClaims.tableColumns[
				this.appComponent.country
			] != undefined
		) {
			this.tableColumns =
				this.config.myClaims.tableColumns[
				this.appComponent.country
			]; // Setting table columns based on configuration
		}
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
        this.fields.forEach((field) => {
			// Iterating over form fields to process select options
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					// Assigning Id and Name to each option
					opt.Id = opt.value;
					opt.Name = opt.name;
				});
				let options: object = {};
				options[field.optionsKey] = field.options; // Creating options object for select
				Object.assign(this.arraySelects, options); // Merging options into arraySelects
			}
		});
		this.modelInitial = JSON.parse(JSON.stringify(this.model)); // Cloning model for initial state
		setTimeout(() => {
			this.loadingForm = true; // Set loading state after a delay
		}, 100);
	},
	methods: {
		closeModal() {
			// Method to close the modal
			this.appComponent.closeModal(); // Call closeModal on appComponent
		},
        getData() {
			let from_date = new Date(this.model.date_claim); // Parsing start date
			let from_date_send = parseInt(
				from_date
					.setHours(from_date.getHours() + 24)
					.toString()
					.slice(0, 10)
			); // Preparing start date for API request
			const params = { 
				user_id: this.appComponent.session.usuario, // User ID from session
				DateClaim: from_date_send, // Start date for filtering claims
				NumberClaim: this.model.number_claim, // Claim number from form model
				count: 10, // Number of items per page
				start: this.page * 10, // Calculating start index for pagination
			};
			this.loadingTable = true; // Setting loading state for table
			apiService.request('get_claims', params).then((response: any) => {
				// Fetching data from API
				if (response && response.code === 0 && Array.isArray(response.data)) {
                const items = response.data.map((it: any) => ({
                    createDate: it.createDate || it.create_date || '',
                    idContact: it.idContact || it.id_contact || '',
                    medio: 'Imprimir',
                }));
					this.data = JSON.parse(
						JSON.stringify(items)
					); // Storing fetched data
					this.totalCount = this.data.length; // Storing total count of items
					this.pages = parseInt(this.totalCount) / 10; // Calculating total pages
					this.pages = parseInt(this.pages) + 1; // Adjusting for pagination
					this.loadingTable = false; // Resetting loading state for table
				}
			});
		},
        updateHandler(handler: any) {
			this.page = handler - 1; // Updating current page based on pagination
			this.getData(); // Fetching data for the new page
		},
		update() {
			this.pages = 0; // Resetting pages
			this.page = 0; // Resetting current page
			if (
				this.config != undefined &&
			    this.config.myClaims != undefined &&
                this.config.myClaims.tableColumns != undefined &&
			    this.config.myClaims.tableColumns[
			    	this.appComponent.country
			    ] != undefined
			) {
				this.tableColumns =
					this.config.myClaims.tableColumns[
				        this.appComponent.country
			        ]; // Updating table columns based on configuration
			}
			this.getData(); // Fetching data
		},

        buttonAction(item: any) {
		// Action to be performed when button in table is clicked
		const params = {
			IdPdf: item.idContact, // ID of the contact for which to generate the PDF
			user_id: this.appComponent.session.usuario, // User ID from session
		};
	    // Requesting PDF generation from the API
		apiService
			.request('generation_report_user_claims', params)
			.then((response: any) => {
				// Handling the API response
				const fileInfo = response.data;
				// Constructing the base64 PDF data URI
				this.base64Pdf = `data:${fileInfo.type || 'application/pdf'};base64,${fileInfo.data}`;
				this.showModalPdf = true; // Displaying the PDF modal
			})
			.catch((error: any) => {
				console.error('Error al solicitar el PDF:', error);
			});
		}, // Placeholder for button action method
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
							class="Container InfoContent mb-5 shadow-md bg-base-400 flex flex-col lg:flex-row justify-between items-stretch"
						>
                            <div class="w-full flex flex-col justify-between">
                                <p class="text-neutral font-semibold text-2xl pt-8 pl-8">
                                    {{ appComponent.config.forms['Mis reclamaciones'].title !== undefined && appComponent.config.forms['Mis reclamaciones'].title !== '' ?  appComponent.config.forms['Mis reclamaciones'].title : $t('Mis reclamaciones') }}
                                </p>
								<!-- Main form component for submitting complaints -->
								<AppForm
									:loading="loadingForm"
									:fontColorForm="fontColorForm"
									:styleWidth="false"
									:twoColumnsMobile="false"
									:fields="fields"
									:arraySelects="arraySelects"
									:model="model"
									:textDown="textDownForm"
									:textButton="'Buscar'"
									@onSubmit:form="getData()"
									class="w-full"
								/>
								<!-- Table for displaying deposit data -->
								<div
									class="table-grid px-5 rounded-xl shadow-md bg-base-400 w-full"
								>
									<div class="overflow-x-auto">
									<AppTable
											:tableColumns="tableColumns"
											:data="data"
											:loading="loadingTable"
											@button:action="buttonAction($event)"
										/>
									</div>
									<!-- Pagination component -->
									<v-pagination
										v-if="totalCount > 0"
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
								</div>
                            </div>
							<!-- Image section -->
                            <div class="flex justify-center items-start w-full mt-5">
                                <img
									class="max-w-full h-auto object-contain"
									alt="Imagen mis reclamaciones" 
									:src="appComponent.config.forms['Mis reclamaciones'].img !== undefined && appComponent.config.forms['Mis reclamaciones'].img !== '' ? appComponent.config.forms['Mis reclamaciones'].img : 'https://images.virtualsoft.tech/m/msj0212T1760127780.png'"></img>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for displaying PDF -->
	<dialog v-if="showModalPdf" class="modal in w-screen h-screen bg-black/80">
		<div class="relative rounded-box min-w-[98%] sm:min-w-[370px] sm:max-w-[70%] min-h-[270px] max-h-[90%] overflow-hidden text-base-content">
			<!-- Botón cerrar -->
			<button class="absolute right-6 top-5 hover:scale-125 text-neutral" @click="showModalPdf = false">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
					<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
					<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
				</svg>
			</button>

			<h3 class="w-full p-4 bg-base-300 text-xl font-bold text-neutral">{{ $t('Hoja de reclamación') }}</h3>

			<div class="bg-neutral p-4 flex flex-col justify-center items-center gap-4 rounded-b-box">
				<embed v-if="base64Pdf" :src="base64Pdf" type="application/pdf" width="100%" height="600px" />
				<div v-else class="text-center text-base-content">Cargando documento...</div>
			</div>
		</div>
	</dialog>
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

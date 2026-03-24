<script lang="ts">
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import { useCookies } from 'vue3-cookies'; // Importing cookie management
import AppForm from '@/components/Form.vue'; // Importing the main form component
import { defineComponent, ref } from 'vue'; // Importing Vue composition API functions
import router from '@/router'; // Importing the router for navigation
import { useRoute } from 'vue-router'; // Importing route management
import AppForm6 from '@/components/AppForm6.vue'; // Importing an alternative form component

export default defineComponent({
	components: {
		AppForm6, // Registering AppForm6 component
		AppForm, // Registering AppForm component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration settings
		let emitter = this.$emitter(); // Getting the event emitter
		let appComponent: any = this.$appComponent; // Accessing the application component
		let loadView = false; // Flag to control loading state
		let loadView2 = true; // Flag for secondary loading state
		let titleForm: string = this.$t('Registro'); // Title for the registration form
		let textUp: string = ''
		let textDownForm: string =
			"<div class='text-center'>" +
			this.$t(
				'Los datos deben de ser válidos, porque si no vas a tener problema para retirar el dinero de tu cuenta.'
			) +
			'</div>'; // Warning text for the form
		let backgroundForm: string = ''; // Background style for the form
		let fontColorForm: string = ''; // Font color for the form
		let img: string = ''; // Image source for the form
		let banner: string = ''; // Banner image source
		let img2: string = ''; // Second image source
		let fields: any = []; // Form fields
		let arraySelects: any = {}; // Object to hold select options
		let model: any = {}; // Model for form data
		let responseRegister: any = {}; // Response from registration API
		let recaptcha: boolean =
			this.$config().registro.recaptcha.show != undefined
				? this.$config().registro.recaptcha.show
				: false; // Flag for reCAPTCHA visibility
		let background: string = ''; // Background style
		let windowFrame: boolean = false; // Flag for window frame visibility
		let loginGoogle: boolean = false; // Flag for Google login availability
		let loginFacebook: boolean = false; // Flag for Facebook login availability
		let login: any = ''; // Login status
		let refreshBalance = this.$refreshBalance; // Function to refresh balance
		let shortRegister: boolean =
			this.$config() != undefined &&
			this.$config().registro != undefined &&
			this.$config().registro.shortRegister != undefined &&
			this.$config().registro.shortRegister[
				this.$appComponent['country']
			] != undefined
				? this.$config().registro.shortRegister[
						this.$appComponent['country']
					]
				: false; // Flag for short registration
		let checkVersion: number =
			this.$config() != undefined &&
			this.$config().registro != undefined &&
			this.$config().registro.checkVersion != undefined &&
			this.$config().registro.checkVersion[
				this.$appComponent['country']
			] != undefined
				? this.$config().registro.checkVersion[
						this.$appComponent['country']
					]
				: 1; // Version check for registration
		let btag: any = null; // Btag for tracking
		let trackerId: any = null; // Tracker ID for analytics
		let rfdo: any = null; // Referent link
		let styleWidth: boolean =
			this.$config() != undefined &&
			this.$config().registro != undefined &&
			this.$config().registro.styleWidth != undefined &&
			this.$config().registro.styleWidth[this.$appComponent['country']] !=
				undefined
				? this.$config().registro.styleWidth[
						this.$appComponent['country']
					]
				: false; // Flag for style width

		// Load form fields based on configuration
		if (
			config != undefined &&
			config['forms'] != undefined &&
			config['forms']['Registro'] != undefined &&
			config['forms']['Registro']['inputs'] != undefined
		) {
            let formR = config['forms']['Registro']['inputs']

            if(appComponent.diableCountryRegister){
                formR.forEach((item: any) => {
                    if(item.name == 'countryResident_id'){
                        item.disabled = true
                    }
                })
                fields = JSON.parse(
                    JSON.stringify(formR)
                );
            }else {
                fields = JSON.parse(
                    JSON.stringify(formR)
                );
            }

		} else {
			if (
				config != undefined &&
				config['registro'] != undefined &&
				config['registro']['form'] != undefined &&
				config['registro']['form'][this.$appComponent['country']] !=
					undefined
			) {
                let formR = config['registro']['form'][this.$appComponent['country']]
                if(appComponent.diableCountryRegister){
                    formR.forEach((item: any) => {
                        if(item.name == 'countryResident_id'){
                            item.disabled = true
                        }
                    })
                    fields = JSON.parse(
                        JSON.stringify(formR)
                    );
                }else {
                    fields = JSON.parse(
                        JSON.stringify(formR)
                    );
                }
			}
		}
		return {
			config,
			shortRegister,
			banner,
			emitter,
			appComponent,
			refreshBalance,
			loginGoogle,
			loginFacebook,
			loadView,
			loadView2,
			fields,
			arraySelects,
			model,
			responseRegister,
			titleForm,
			backgroundForm,
			fontColorForm,
			textDownForm,
			textUp,
			recaptcha,
			background,
			windowFrame,
			login,
			btag,
			trackerId,
			img,
			img2,
			rfdo,
			checkVersion,
			styleWidth,
			isMultiLoginRegister: false,
		};
	},
	setup() {
		const { cookies } = useCookies(); // Using cookies for session management
		const route = useRoute(); // Getting the current route
		let codigo: any = ref(route.params.Codigo); // Reference for first code parameter
		let codigo2: any = ref(route.params.Codigo2); // Reference for second code parameter
		let codigo3: any = ref(route.params.Codigo3); // Reference for third code parameter
		return {
			cookies,
			codigo,
			codigo2,
			codigo3,
		};
	},
	updated() {
		const vthis = this; // Reference to the Vue instance
		if (
			(document.getElementById('returnUserRegister') as any) != undefined
		) {
			(
				document.getElementById('returnUserRegister') as any
			).addEventListener('click', function (s: any) {
				vthis.appComponent.showModalLogin = true; // Show login modal on click
			});
		}
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Accept modal event listener
		});
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Clean up event listener on unmount
	},
	mounted() {
		if (this.appComponent.session.logueado) {
			this.login = 'login'; // Set login status if logged in
		} else {
			if (!this.appComponent.session.logueado) {
				this.login = 'notLogin'; // Set login status if not logged in
			}
		}
		// Load background image based on configuration
		if (
			this.config != undefined &&
			this.config['backgrounds'] != undefined &&
			this.config['backgrounds'][this.appComponent.country] !=
				undefined &&
			this.config['backgrounds'][this.appComponent.country][
				this.appComponent.lngProd
			] != undefined &&
			this.config['backgrounds'][this.appComponent.country][
				this.appComponent.lngProd
			][this.login] != undefined &&
			this.config['backgrounds'][this.appComponent.country][
				this.appComponent.lngProd
			][this.login]['registro'] != undefined &&
			this.config['backgrounds'][this.appComponent.country][
				this.appComponent.lngProd
			][this.login]['registro']['backgrounds'] != undefined &&
			this.config['backgrounds'][this.appComponent.country][
				this.appComponent.lngProd
			][this.login]['registro']['backgrounds'].length > 0
		) {
			this.background =
				this.config['backgrounds'][this.appComponent.country][
					this.appComponent.lngProd
				][this.login]['registro']['backgrounds'][0].url; // Set background image URL
		}
		if (
			/**
			 * Check if the description for the 'Registro' form is defined.
			 */
			 this.appComponent.config != undefined &&
			 this.appComponent.config['forms'] != undefined &&
			 this.appComponent.config['forms']['Registro'] != undefined &&
			this.appComponent.config['forms']['Registro'].description != undefined
		) {
			// Set the description for the 'Registro' form
			this.textUp =
				this.appComponent.config['forms']['Registro'].description;
		}
		// Check for Google login configuration
		if (
			this.config['loginGoogle'] != undefined &&
			this.config['loginGoogle'][this.appComponent.country]
		) {
			this.loginGoogle =
				this.config['loginGoogle'][this.appComponent.country]; // Set Google login availability
		}
		// Check for Facebook login configuration
		if (
			this.config['loginFacebook'] != undefined &&
			this.config['loginFacebook'][this.appComponent.country]
		) {
			this.loginFacebook =
				this.config['loginFacebook'][this.appComponent.country]; // Set Facebook login availability
		}
		// Load banner image based on configuration
		if (
			this.config != undefined &&
			this.config.registro != undefined &&
			this.config.registro.banner != undefined &&
			this.config.registro.banner[this.appComponent.country] != undefined
		) {
			this.banner =
				this.config.registro.banner[this.appComponent.country]; // Set banner image URL
		}
		// Load primary image based on configuration
		if (
			this.config != undefined &&
			this.config.registro != undefined &&
			this.config.registro.img != undefined &&
			this.config.registro.img[this.appComponent.country] != undefined
		) {
			this.img = this.config.registro.img[this.appComponent.country]; // Set primary image URL
		}
		// Load secondary image based on configuration
		if (
			this.config != undefined &&
			this.config.registro != undefined &&
			this.config.registro.img2 != undefined &&
			this.config.registro.img2[this.appComponent.country] != undefined
		) {
			this.img2 = this.config.registro.img2[this.appComponent.country]; // Set secondary image URL
		}
		// Load form background style based on configuration
		if (
			this.config['registro'] != undefined &&
			this.config['registro']['background'] != undefined &&
			this.config['registro']['background'][this.appComponent.country] !=
				undefined
		) {
			this.backgroundForm =
				this.config['registro']['background'][
					this.appComponent.country
				]; // Set form background style
		}
		// Load font color style based on configuration
		if (
			this.config['registro'] != undefined &&
			this.config['registro']['fontColorForm'] != undefined
		) {
			this.fontColorForm = this.config['registro']['fontColorForm']; // Set font color style
		}
		// Load window frame visibility based on configuration
		if (
			this.config['registro'] != undefined &&
			this.config['registro']['windowFrame'] != undefined &&
			this.config['registro']['windowFrame'][this.appComponent.country] !=
				undefined
		) {
			this.windowFrame =
				this.config['registro']['windowFrame'][
					this.appComponent.country
				]; // Set window frame visibility
		}
		// Set cookie values based on route parameters
		if (this.codigo != undefined) {
			this.cookies.set('rcdg', this.codigo); // Set first code cookie
		}
		if (this.codigo2 != undefined) {
			this.cookies.set('rcdg2', this.codigo2); // Set second code cookie
		}
		if (this.codigo3 != undefined) {
			this.cookies.set('rcdg3', this.codigo3); // Set third code cookie
		}
		// Retrieve tracking cookies
		if (this.cookies.get('btag') != null) {
			this.btag = this.cookies.get('btag'); // Get btag cookie
		}
		if (this.cookies.get('trackerId') != null) {
			this.trackerId = this.cookies.get('trackerId'); // Get tracker ID cookie
		}
		if (this.cookies.get('rfdo') != null) {
			this.rfdo = this.cookies.get('rfdo'); // Get referent link cookie
			let param = {
				ReferentLink: this.rfdo, // Prepare parameter for API request
			};
			apiService
				.request('mark_referent_invitation', param) // Mark referent invitation
				.then((response: any) => {
					if (response.code == 0) {
						console.log('user referral'); // Log successful referral
					}
				});
		}
		this.emitter.on('accept:modal', () => {
			this.acceptModal(); // Accept modal event listener
		});
		// Load country resident list if applicable
		if (
			this.fields.filter((item) => {
				return item.optionsKey == 'countryResidentList';
			}).length > 0
		) {
			apiService.request('get_countries', {}).then((response: any) => {
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].value = response.data[i].Id; // Set value for country
						response.data[i].name = response.data[i].Name; // Set name for country
					}
					Object.assign(this.arraySelects, {
						countryResidentList: response.data, // Assign country resident list to arraySelects
					});
					let countryDefault = response.data.filter((item) => {
						return item.Iso == this.appComponent.country; // Find default country
					});
					if (countryDefault.length > 0) {
						this.model.countryResident_id = countryDefault[0].Id; // Set default country ID
						this.model.nationality_id = countryDefault[0].Id; // Set default nationality ID
						let value = this.model.countryResident_id; // Get selected country ID
						let arraySelects = JSON.parse(
							JSON.stringify(this.arraySelects)
						); // Clone arraySelects
						let countryIso = arraySelects['countryResidentList']
							.filter((x) => x.Id == value)
							.map((x) => x.Iso)[0]; // Get ISO code for selected country
						if (
							this.config != undefined &&
							this.config['forms'] != undefined &&
							this.config['forms']['Registro'] != undefined &&
							this.config['forms']['Registro']['inputs'] !=
								undefined
						)
							this.fields =
								this.config['forms']['Registro']['inputs'];
						// Load fields from configuration
						else
							this.fields =
								this.config != undefined &&
								this.config.registro != undefined &&
								this.config.registro.form != undefined &&
								this.config.registro.form[countryIso] !=
									undefined
									? this.config.registro.form[countryIso] // Load fields based on country ISO
									: this.fields;
						this.fields.forEach((field) => {
							if (
								field.type == 'select' &&
								field.options != undefined &&
								field.options.length > 0
							) {
								let options: object = {};
								options[field.optionsKey] = field.options; // Assign options to arraySelects
								Object.assign(this.arraySelects, options);
							}
						});
						this.loadView2 = false; // Hide secondary loading view
						setTimeout(() => {
							this.loadView2 = true; // Show secondary loading view after delay
						}, 500);
						let departments = arraySelects['countryResidentList']
							.filter((x) => x.Id == value)
							.map((x) => x.departments)[0]; // Get departments for selected country
						departments.forEach((department) => {
							department.value = department.Id; // Set value for department
							department.name = department.Name; // Set name for department
						});
						Object.assign(this.arraySelects, {
							departmentList: departments, // Assign department list to arraySelects
						});
						this.model['department_id'] = ''; // Reset department ID
						this.model['city_id'] = ''; // Reset city ID
					}
					this.loadView = true; // Show main loading view
				}
			});
		}
		// Load nationality list if applicable
		if (
			this.fields.filter((item) => {
				return item.optionsKey == 'nationalityList';
			}).length > 0
		) {
			apiService.request('get_countries2', {}).then((response: any) => {
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].value = response.data[i].Id; // Set value for nationality
						response.data[i].name = response.data[i].Name; // Set name for nationality
					}
					Object.assign(this.arraySelects, {
						nationalityList: response.data, // Assign nationality list to arraySelects
					});
					this.loadView = true; // Show main loading view
				}
			});
		}
		// Load team list if applicable
		if (
			this.fields.filter((item) => {
				return item.optionsKey == 'teamList';
			}).length > 0
		) {
			apiService
				.request('get_teams', { country: this.appComponent.country }) // Request teams based on country
				.then((response: any) => {
					if (response.code == 0) {
						for (var i = 0; i < response.data.length; i++) {
							response.data[i].value = response.data[i].Id; // Set value for team
							response.data[i].name = response.data[i].Name; // Set name for team
						}
						Object.assign(this.arraySelects, {
							teamList: response.data, // Assign team list to arraySelects
						});
						this.loadView = true; // Show main loading view
					}
				});
		}
		let DocTypeList = this.fields.filter((item) => {
			return item.optionsKey == 'docTypeList'; // Filter for document type options
		});
		if (DocTypeList.length > 0) {
			let defaultDoctype = DocTypeList[0].options.filter((item) => {
				return item.default != undefined && item.default == true; // Find default document type
			})[0];
			this.model.doctype_id = defaultDoctype ? defaultDoctype.value : ''; // Set default document type ID
		}
		let radioType = this.fields.filter((item) => {
			return item.type == 'radio'; // Filter for radio button options
		});
		if (radioType.length > 0) {
			let radioTypeDefault = radioType[0].options.filter((item) => {
				return item.default != undefined && item.default == true; // Find default radio button option
			})[0];
			this.model[radioType[0].name] = radioTypeDefault
				? radioTypeDefault.value
				: ''; // Set default value for radio button
			if (radioType.length > 1) {
				let radioTypeDefault2 = radioType[1].options.filter((item) => {
					return item.default != undefined && item.default == true; // Find default value for second radio button
				})[0];
				this.model[radioType[1].name] = radioTypeDefault2
					? radioTypeDefault2.value
					: ''; // Set default value for second radio button
			}
		}
		// Show main loading view if no specific fields are present
		if (
			this.fields.filter((item) => {
				return item.optionsKey == 'countryResidentList';
			}).length == 0 &&
			this.fields.filter((item) => {
				return item.optionsKey == 'nationalityList';
			}).length == 0 &&
			this.fields.filter((item) => {
				return item.optionsKey == 'get_teams';
			}).length == 0
		) {
			this.loadView = true; // Show main loading view
		}
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				let options: object = {};
				options[field.optionsKey] = field.options; // Assign options to arraySelects
				Object.assign(this.arraySelects, options);
			} else if (
				field.type == 'checkbox' &&
				field.name === 'acepta_terminos' &&
				field.value != undefined &&
				field.value === 'true'
			) {
				this.model.acepta_terminos = field.value ? field.value : ''; // Set acceptance of terms
			} else if (
				field.type == 'checkbox' &&
				field.name === 'offerRegister' &&
				field.value != undefined &&
				field.value === 'true'
			) {
				this.model.offerRegister = field.value ? field.value : ''; // Set offer registration acceptance
			}
		});
		this.isMultiLoginRegister = !!this.appComponent.crossCountryRegister;
	},
	methods: {
		onSubmit(values: any) {
			if (
				this.config.registro.typeRegister != undefined &&
				this.config.registro.typeRegister == '1'
			) {
				values.landing = '1'; // Set landing flag for registration type 1
			} else {
				values.countryResident_id != undefined
					? (values.countryResident_id = this.arraySelects[
							'countryResidentList'
						].filter((x) => x.Id == values.countryResident_id)[0]) // Set country resident ID
					: (values.countryResident_id = null);
				values.department_id != undefined
					? (values.department_id = this.arraySelects[
							'departmentList'
						].filter((x) => x.Id == values.department_id)[0]) // Set department ID
					: (values.department_id = null);
				values.city_id != undefined
					? (values.city_id = this.arraySelects['cityList'].filter(
							(x) => x.Id == values.city_id
						)[0]) // Set city ID
					: (values.city_id = null);
				values.nationality_id != undefined
					? (values.nationality_id = this.arraySelects[
							'nationalityList'
						].filter((x) => x.Id == values.nationality_id)[0]) // Set nationality ID
					: (values.nationality_id = null);
			}
			if (
				typeof values.countryResident_id == 'object' &&
				values.countryResident_id != null
			) {
				values.countryResident_id['departments'] = []; // Reset departments for country resident
			}
			if (
				typeof values.department_id == 'object' &&
				values.department_id != null
			) {
				values.department_id['cities'] = []; // Reset cities for department
			}
			if (this.codigo != undefined) {
				values.code = this.codigo; // Set first code value
			}
			if (this.codigo2 != undefined) {
				values.code2 = this.codigo2; // Set second code value
			}
			if (this.codigo3 != undefined) {
				values.code3 = this.codigo3; // Set third code value
			}
			if (this.codigo3 != undefined) {
				values.code3 = this.codigo3; // Set third code value (duplicate line)
			}
			if (this.btag != null) {
				values.btag = this.btag; // Set btag value
			}
			if (this.trackerId != null) {
				values.trackerId = this.trackerId; // Set tracker ID value
			}
			if (this.rfdo != null) {
				values.referent_link = this.rfdo; // Set referent link value
			}
			if (
				this.appComponent.crossCountryRegister &&
				this.appComponent.crossCountryRegister.countryFrom
			) {
				values.countryFrom =
					this.appComponent.crossCountryRegister.countryFrom;
			}
			let params: any = {
				type_register:
					this.config.registro.typeRegister != undefined
						? this.config.registro.typeRegister
						: 1, // Set registration type
				user_info: values, // Set user information
			};
			if (this.isMultiLoginRegister) {
				params.acceptMultiLogin = true;
			}
			if (values.type_gift != undefined) {
				params.type_gift = values.type_gift; // Set gift type if applicable
			}
			apiService
				.request('register_user', params) // Send registration request
				.then((response: any) => {
					if (response.code == 0) {
						try {
							(window as any).fRegistSuccess(
								response.data.userid // Call success function with user ID
							);
						} catch (e) {}
						this.appComponent.gAnalytics('accept_register', {
							user_id:
								response != undefined &&
								response.data != undefined &&
								response.data.userid != undefined
									? response.data.userid
									: null,
							data: values != undefined ? values : null,
						}); // Track registration event
						if (response.data.auth_token != undefined) {
							this.appComponent.tokenUser =
								response.data.auth_token; // Set user token
							apiService.setAuthToken(response.data.auth_token); // Set auth token in API service
							window.localStorage.setItem(
								'auth_token',
								response.data.auth_token // Store auth token in local storage
							);
						}
						if (
							this.appComponent.config.registro != undefined &&
							this.appComponent.config.registro.landingRegister !=
								undefined &&
							this.appComponent.config.registro.landingRegister[
								this.appComponent.country
							] != undefined &&
							this.appComponent.config.registro.landingRegister[
								this.appComponent.country
							]['redirect'] != undefined &&
							this.appComponent.config.registro.landingRegister[
								this.appComponent.country
							]['redirect'] != ''
						) {
							router.push(
								this.appComponent.config.registro
									.landingRegister[this.appComponent.country][
									'redirect'
								] // Redirect to landing page if applicable
							);
						} else {
							const isMultiLogin = this.isMultiLoginRegister; // Check if registration was done using cached multi-login data

							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Mensaje'), // Set modal title
								messageModal: isMultiLogin // Determine message based on registration flow
									? this.$t(
										`¡Tu cuenta en ha sido creada! Ya puedes comenzar a jugar.`
									) // Success message for multi-login registration
									: this.$t(
										'El usuario se ha registrado correctamente. Revise su bandeja de entrada y/o su bandeja de correo no deseado donde encontrara las instrucciones para activar su cuenta. Sugerimos adicionar el correo de notificacion de su registro como un email conocido y evitar asi que futuras notificaciones lleguen a su correo no deseado.'
									), // Default success message for standard registration
								buttonModal: this.$t('Aceptar'), // Set modal button text
								orderModal: 'accept_modal', // Set modal order
							};
						}
						this.responseRegister = response.data; // Store registration response
					} else {
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Set error message based on error code
							);
						}
						if (error_mensaje == '' && response.data != undefined) {
							error_mensaje = this.$t(response.data); // Set error message from response data
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						if (response.error_code == 20028) {
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal for specific error
								titleModal: this.$t('Error!'), // Set modal title
								innerHtmlModal: this.$t(
									'MENSAJE_HIPERVINCULOHTML' // Set inner HTML for modal
								),
								buttonModal: this.$t('Aceptar'), // Set modal button text
								orderModal: 'closeModal', // Set modal order
							};
						} else {
							this.appComponent.modal = {
								showModal: 'notification', // Show notification modal
								titleModal: this.$t('Error!'), // Set modal title
								messageModal: error_mensaje, // Set modal message
								buttonModal: this.$t('Aceptar'), // Set modal button text
								orderModal: 'closeModal', // Set modal order
							};
						}
					}
				});
		},
		changeSelect: function (event: any) {
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get options key
			let arraySelects = JSON.parse(JSON.stringify(this.arraySelects)); // Clone arraySelects
			if (optionsKey == 'countryResidentList') {
				let countryIso = arraySelects['countryResidentList']
					.filter((x) => x.Id == value)
					.map((x) => x.Iso)[0]; // Get ISO code for selected country
				this.fields =
					this.config != undefined &&
					this.config.registro != undefined &&
					this.config.registro.form != undefined &&
					this.config.registro.form[countryIso] != undefined
						? this.config.registro.form[countryIso] // Load fields based on country ISO
						: this.fields;
				this.fields.forEach((field) => {
					if (
						field.type == 'select' &&
						field.options != undefined &&
						field.options.length > 0
					) {
						let options: object = {};
						options[field.optionsKey] = field.options; // Assign options to arraySelects
						Object.assign(this.arraySelects, options);
					}
				});
				this.loadView2 = false; // Hide secondary loading view
				setTimeout(() => {
					this.loadView2 = true; // Show secondary loading view after delay
					this.model = {
						countryResident_id:
							this.model.countryResident_id != undefined
								? this.model.countryResident_id
								: null, // Reset model for country resident ID
					};
					let radioType = this.fields.filter((item) => {
						return item.type == 'radio'; // Filter for radio button options
					});
					if (radioType.length > 0) {
						let radioTypeDefault = radioType[0].options.filter(
							(item) => {
								return (
									item.default != undefined &&
									item.default == true // Find default radio button option
								);
							}
						)[0];
						this.model[radioType[0].name] = radioTypeDefault
							? radioTypeDefault.value
							: ''; // Set default value for radio button
					}
					this.fields.forEach((field) => {
						if (
							field.type == 'select' &&
							field.options != undefined &&
							field.options.length > 0
						) {
							let options: object = {};
							options[field.optionsKey] = field.options; // Assign options to arraySelects
							Object.assign(this.arraySelects, options);
						} else if (
							field.type == 'checkbox' &&
							field.name === 'acepta_terminos' &&
							field.value != undefined &&
							field.value === 'true'
						) {
							this.model.acepta_terminos = field.value
								? field.value
								: ''; // Set acceptance of terms
						} else if (
							field.type == 'checkbox' &&
							field.name === 'offerRegister' &&
							field.value != undefined &&
							field.value === 'true'
						) {
							this.model.offerRegister = field.value
								? field.value
								: ''; // Set offer registration acceptance
						}
					});
				}, 500);
				let departments = arraySelects['countryResidentList']
					.filter((x) => x.Id == value)
					.map((x) => x.departments)[0]; // Get departments for selected country
				departments.forEach((department) => {
					department.value = department.Id; // Set value for department
					department.name = department.Name; // Set name for department
				});
				Object.assign(this.arraySelects, {
					departmentList: departments, // Assign department list to arraySelects
				});
				this.model['department_id'] = ''; // Reset department ID
				this.model['city_id'] = ''; // Reset city ID
			} else {
				if (optionsKey == 'departmentList') {
					let cities = arraySelects['departmentList']
						.filter((x) => x.Id == value)
						.map((x) => x.cities)[0]; // Get cities for selected department
					cities.forEach((city) => {
						city.value = city.Id; // Set value for city
						city.name = city.Name; // Set name for city
					});
					Object.assign(this.arraySelects, { cityList: cities }); // Assign city list to arraySelects
					this.model['city_id'] = ''; // Reset city ID
				} else {
					if (optionsKey == 'docTypeList') {
						let docType = arraySelects['docTypeList'].filter(
							(x) => x.value == value
						)[0]; // Get selected document type
						const elementName = this.fields.filter((item) => {
							return item.optionsKey == optionsKey; // Get field name for document type
						})[0].name;
						let inputId = '';
						this.fields.forEach((item) => {
							item.validations.forEach((validation) => {
								if (
									validation.type == 'when' &&
									validation.params.includes(elementName)
								) {
									inputId = item.name; // Get input ID based on validation
								}
							});
						});
						if (docType.type != undefined) {
							let inputElement = document.getElementById(
								inputId
							) as HTMLInputElement;
							if (inputElement) {
								inputElement.type = docType.type; // Set input type based on document type
							}
						} else {
							let inputElement = document.getElementById(
								inputId
							) as HTMLInputElement;
							if (inputElement) {
								inputElement.type = this.fields.filter(
									(item) => {
										return item.name == 'docnumber'; // Set input type for document number
									}
								)[0].type;
							}
						}
					}
				}
			}
		},
		closeModal() {
			this.appComponent.closeModal(); // Close modal function
		},
		acceptModal() {
			if (this.appComponent.modal.orderModal == 'accept_modal') {
				if (this.responseRegister.redirect) {
					location.href = this.responseRegister.redirectUrl; // Redirect if applicable
				} else {
					location.reload(); // Reload page if no redirect
				}
			}
			this.appComponent.closeModal(); // Close modal function
		},
	},
});
</script>
<template>
	<!-- Main container for the registration form -->
	<div
		v-if="
			!loadView2 &&
			(appComponent.config.layout == undefined ||
				appComponent.config.layout != 6)
		"
		class="flex w-full h-screen items-center shadow-lg rounded-3xl"
		:class="
			config.layout != undefined && config.layout == 3
				? 'bg-base-200'
				: 'bg-neutral'
		"
	>
		<div class="flex-1"></div>
		<div class="flex flex-col w-12/12">
			<!-- Loading spinner -->
			<svg
				fill="none"
				class="w-12 h-12 animate-spin"
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
		<div class="flex-1"></div>
	</div>
	<!-- Registration form component -->
	<div
		v-if="
			appComponent.config.layout == undefined ||
			appComponent.config.layout != 6 &&
			(appComponent.config.registerVersion == undefined ||
			appComponent.config.registerVersion == 1)
		"
	>
		<AppForm
			v-if="loadView2"
			:loginGoogle="loginGoogle"
			:loginFacebook="loginFacebook"
			:loading="loadView"
			:title="titleForm"
			:windowFrame="windowFrame"
			:fontColorForm="fontColorForm"
			:fields="fields"
			:shortRegister="shortRegister"
			:styleWidth="styleWidth"
			:backgroundForm="backgroundForm"
			:arraySelects="arraySelects"
			:model="model"
			:textUp="textUp"
			:textDown="textDownForm"
			:textButton="'Regístrate'"
			:recaptcha="recaptcha"
			:checkVersion="checkVersion"
			:img="img"
			:banner="banner"
			:img2="img2"
			@onSubmit:form="onSubmit($event)"
			@changeSelect:form="changeSelect($event)"
		/>
	</div>
	<!-- Alternative registration form component -->
	<AppForm6
		v-if="
			(appComponent.config.layout != undefined &&
			appComponent.config.layout == 6) ||
			(appComponent.config.registerVersion != undefined &&
			appComponent.config.registerVersion == 2)
		"
		:loginGoogle="loginGoogle"
		:loginFacebook="loginFacebook"
		:loading="loadView"
		:title="titleForm"
		:windowFrame="windowFrame"
		:fields="fields"
		:shortRegister="shortRegister"
		:styleWidth="false"
		:backgroundForm="backgroundForm"
		:arraySelects="arraySelects"
		:model="model"
		:textDown="textDownForm"
		:textButton="'Regístrate'"
		:recaptcha="recaptcha"
		:img="img"
		:banner="banner"
		:img2="img2"
		@onSubmit:form="onSubmit($event)"
		@changeSelect:form="changeSelect($event)"
	/>
</template>
<style>
/* Styles for the registration form */
form#form_registro.one-page #progressbar {
	display: none; /* Hide progress bar */
}
form#form_registro.one-page .actions-button {
	display: none; /* Hide action buttons */
}
form#form_registro.one-page .next,
form#form_registro.one-page fieldset h2,
form#form_registro.one-page fieldset h3 {
	display: none; /* Hide next button and fieldset headers */
}
form#form_registro.one-page #text-paso {
	display: none; /* Hide step text */
}
form#form_registro.one-page .form-row-1 {
	width: auto; /* Set width for form row */
	display: inline; /* Display inline */
}
form#form_registro.one-page .form-col {
	margin: 15px 0px 0px 0px; /* Margin for form columns */
}
form#form_registro.one-page input.previous {
	display: none; /* Hide previous button */
}
svg.svg-inline--fa.fa-male.fa-w-6,
svg.svg-inline--fa.fa-female.fa-w-8 {
	height: 22px; /* Set height for gender icons */
}
@media only screen and (max-width: 700px) {
	form#form_registro.one-page .form-col {
		width: 48% !important; /* Set width for form columns on small screens */
	}
	form#form_registro.one-page.msform select {
		min-width: 100% !important; /* Set minimum width for selects */
	}
	form#form_registro.one-page .form-col.div-complete {
		width: 100% !important; /* Set width for complete form column */
	}
	#modal-video {
		max-width: 66px; /* Set max width for modal video */
	}
	form#form_registro.one-page .form-row-1.pais .form-col-title {
		width: 20px !important; /* Set width for country title */
		display: inline-block; /* Display inline */
	}
	form#form_registro.one-page .form-row-1.pais .form-col-content {
		width: 115px !important; /* Set width for country content */
		display: inline-block; /* Display inline */
	}
	form#form_registro.one-page .form-row-1.pais .form-col {
		width: 100% !important; /* Set width for country column */
	}
	form#form_registro.one-page .form-col.email {
		width: 100% !important; /* Set width for email column */
		max-width: 100% !important; /* Set max width for email column */
	}
	form#form_registro.one-page .form-col.emailconfirm {
		width: 100% !important; /* Set width for email confirmation column */
		max-width: 100% !important; /* Set max width for email confirmation column */
	}
	body.one-page header {
		padding-top: 0px; /* Set padding for header */
		min-height: 0px; /* Set minimum height for header */
		-webkit-box-shadow: 0px -2px 33px 6px rgba(208, 175, 39, 1); /* Set shadow for header */
		-moz-box-shadow: 0px -2px 33px 6px rgba(208, 175, 39, 1); /* Set shadow for header */
		box-shadow: 0px -2px 33px 6px rgba(208, 175, 39, 1); /* Set shadow for header */
	}
	body.one-page #main #register-wrapper {
		padding: 0px; /* Set padding for register wrapper */
	}
}
.sexo label.error.valid {
	position: absolute; /* Set position for valid error label */
	display: inline-flex; /* Display inline-flex */
}
.msform fieldset:not(:first-of-type) {
}
</style>

<!-- FILE DOCUMENTED -->

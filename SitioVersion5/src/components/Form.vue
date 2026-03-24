<script lang="ts">
import { configure, Field, Form } from 'vee-validate'; // Importing validation library components
import IconChevronRight from './icons/IconChevronRight.vue'; // Importing icon component
import IconCheck from './icons/IconCheck.vue'; // Importing icon component
import IconClose from './icons/IconClose.vue'; // Importing icon component
import apiService from '@/services/ApiService'; // Importing API service
declare var grecaptcha: any; // Declaring grecaptcha variable for reCAPTCHA
import { toKebabCase as toKebabCaseUtil } from '@/utils';

// Configuring vee-validate to validate on various events
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
});

import * as Yup from 'yup'; // Importing Yup for schema validation
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import FacebookLogin from './FacebookLogin.vue'; // Importing Facebook login component
import CollapsibleCards from '@/components/CollapsibleCardsPopup.vue'; // Importing collapsible cards component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing exit icon component
import moment from 'moment'; // Importing moment.js for date manipulation

// Defining the Vue component
export default defineComponent({
    components: {
        ExitIcon,
        CollapsibleCards,
        Form,
        Field,
        IconChevronRight,
        IconCheck,
        IconClose,
        FacebookLogin,
    },
    props: {
        title: String, // Title prop
        textUp: String, // Upper text prop
        textDown: String, // Lower text prop
        description: String,
        img: {
            type: String,
            default: '',
        },
        banner: {
            type: String,
            default: '',
        },
        img2: {
            type: String,
            default: '',
        },
        textButton: {
            type: String,
            default: '',
        },
        fields: {
            type: Object,
            default: [],
        },
        styleWidth: Boolean, // Boolean prop for style width
        twoColumnsMobile: Boolean, // Boolean prop for mobile layout
        arraySelects: {
            type: Object,
            default: {},
        },
        checkVersion: {
            type: Number,
            default: 1,
        },
        model: Object, // Model prop for form data
        loading: Boolean, // Loading state prop
        recaptcha: Boolean, // reCAPTCHA state prop
        backgroundForm: String, // Background color for form
        fontColorForm: String, // Font color for form
        fontColorFormLight: String, // Light mode font color for form
        backgroundSize: String, // Background size for form
        shortRegister: Boolean, // Short registration flag
        windowFrame: Boolean, // Window frame flag
        loginGoogle: Boolean, // Google login flag
        loginFacebook: Boolean, // Facebook login flag
        colCheckbox: Boolean, // Checkbox column flag
    },
    data() {
        let ligthMode = false; // Light mode flag
        let recaptcha: boolean = this.recaptcha || false; // Initializing reCAPTCHA state
        let minDate: string = ''; // Minimum date for validation
        let maxDate: string = ''; // Maximum date for validation
        let disabledLogin = false; // Flag to disable login
        let clientId: any =
            (window as any).cconfig.facebookLoginClienId != undefined
                ? (window as any).cconfig.facebookLoginClienId
                : ''; // Facebook client ID from config
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let config = this.$config(); // Configuration object
        let appComponent: any = this.$appComponent; // App component reference
        let emitter = this.$emitter(); // Event emitter
        let modelForm: any = this.model; // Form model
        let phoneSearch: string = ''; // Phone search string
        let phoneSearchValid2: boolean = false; // Phone search validation flag
        let TERMINOSYCONDICIONES: any = []; // Terms and conditions array

        // Function to create validation schema based on fields
        const createValidationSchema = (fields: any = []) => {
            const schema = fields.reduce((schema: any, field: any) => {
                if (field.fromCache) {
                    return schema.concat(
                        Yup.object().shape({
                            [field.name]: Yup.mixed().notRequired(),
                        }),
                    );
                }

                const { name, validationType, validationTypeError, validations = [] } = field; // Destructuring field properties
                let validator = Yup[validationType]().typeError(validationTypeError || ''); // Initializing validator
                validations.forEach((validation: any) => {
                    let { params, type } = validation; // Destructuring validation parameters
                    if (type == 'when') {
                        // Conditional validation logic
                        if (params[0] == 'bank') {
                            params[1] = function (field, schema, test) {
                                return name == 'account' && field == '3' && test.parent['account_type'] == '0'
                                    ? schema
                                        .matches('^[0-9]+$', 'Apenas números')
                                        .min(14, 'Mínimo de 14 dígitos')
                                        .max(14, 'Máximo de 14 dígitos')
                                    : name == 'account' && field == '3' && test.parent['account_type'] == '1'
                                        ? schema
                                            .matches('^[0-9]+$', 'Apenas números')
                                            .min(13, 'Mínimo de 13 dígitos')
                                            .max(13, 'Máximo de 13 dígitos')
                                        : name == 'account' && field == '9'
                                            ? schema
                                                .matches('^[0-9]+$', 'Apenas números')
                                                .min(13, 'Mínimo de 13 dígitos')
                                                .max(13, 'Máximo de 13 dígitos')
                                            : name == 'account'
                                                ? schema
                                                    .required('Campo requerido')
                                                    .min(3, 'Mínimo de 3 dígitos')
                                                    .max(25, 'Máximo de 25 dígitos')
                                                : name == 'bank2' && field !== test.value
                                                    ? schema.matches('^[A-Z]+$', 'Banco y confirmar banco no coinciden.')
                                                    : schema;
                            };
                        } else {
                            // Additional conditional validations
                            if (params[0] == 'account') {
                                params[1] = function (field, schema, test) {
                                    return field !== test.value
                                        ? schema.matches(
                                            '^[A-Z]+$',
                                            'Número de cuenta y confirmar número de cuenta no coinciden.',
                                        )
                                        : schema;
                                };
                            } else {
                                if (params[0] == 'cellphone') {
                                    params[1] = function (field, schema, test) {
                                        return schema
                                            .matches(/^[0-9]+$/, 'Apenas números')
                                            .test(
                                                'cellphone-match',
                                                'Número de celular y confirmar número de celular no coinciden.',
                                                function (value) {
                                                    return value === test.parent['cellphone'];
                                                }
                                            );
                                    };
                                } else {
                                    if (params[0] == 'cod_interbank') {
                                        params[1] = function (field, schema, test) {
                                            return field !== test.value
                                                ? schema.matches(
                                                    '^[A-Z]+$',
                                                    'Código interbancario y confirmar código interbancario no coinciden.',
                                                )
                                                : schema;
                                        };
                                    } else {
                                        if (params[0] == 'password') {
                                            params[1] = function (field, schema, test) {
                                                return field !== test.value
                                                    ? schema.matches(
                                                        '^[0-9]+$',
                                                        'Contraseña y confirmar contraseña no coinciden.',
                                                    )
                                                    : schema;
                                            };
                                        } else {
                                            if (params[0] == 'new_password') {
                                                params[1] = function (field, schema, test) {
                                                    return field !== test.value
                                                        ? schema.matches(
                                                            '^[0-9]+$',
                                                            'Contraseña y confirmar contraseña no coinciden.',
                                                        )
                                                        : schema;
                                                };
                                            }
                                            if (params[0] == 'email') {
                                                params[1] = function (field, schema, test) {
                                                    return field !== test.value
                                                        ? schema.matches(
                                                            '^[0-9]+$',
                                                            'Correo electrónico y Confirmar correo electrónico no coinciden.',
                                                        )
                                                        : schema;
                                                };
                                            } else {
                                                if (params[0] == 'is_a_pep') {
                                                    params[1] = function (field, schema) {
                                                        return field == 'S' ? schema.required('Campo requerido') : schema;
                                                    };
                                                } else {
                                                    if (params[0] == 'family_members_pep') {
                                                        params[1] = function (field, schema) {
                                                            return field == 'S'
                                                                ? schema.required('Campo requerido')
                                                                : schema;
                                                        };
                                                    } else {
                                                        if (params[0] == 'situations_to_be_reported') {
                                                            params[1] = function (field, schema) {
                                                                return field == 'S'
                                                                    ? schema.required('Campo requerido')
                                                                    : schema;
                                                            };
                                                        } else {
                                                            if (params[0] == 'account_type') {
                                                                params[1] = function (field, schema) {
                                                                    return field == 0 || field == 2
                                                                        ? schema
                                                                            .matches('^[0-9]+$', 'Apenas números')
                                                                            .min(11, 'Mínimo de 11 dígitos')
                                                                            .max(11, 'Máximo de 11 dígitos')
                                                                        : field == 1
                                                                            ? schema.email('e-mail inválido')
                                                                            : schema;
                                                                };
                                                            } else {
                                                                if (params[0] == 'doctype_id') {
                                                                    if (validation.validations) {
                                                                        let validationDni = validation.validations.filter(
                                                                            (item) => item.value == '1',
                                                                        );
                                                                        let validationCc = validation.validations.filter(
                                                                            (item) => item.value == '2',
                                                                        );
                                                                        let validationPs = validation.validations.filter(
                                                                            (item) => item.value == '3',
                                                                        );
                                                                        params[1] = function (field, schema) {
                                                                            return name == 'docnumber' &&
                                                                                field == '1' &&
                                                                                validationDni.length > 0
                                                                                ? schema
                                                                                    .matches(
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type ===
                                                                                                    'matches' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[0],
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type ===
                                                                                                    'matches' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[1],
                                                                                    )
                                                                                    .min(
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type === 'min' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[0],
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type === 'min' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[1],
                                                                                    )
                                                                                    .max(
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type === 'max' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[0],
                                                                                        validationDni[
                                                                                            validationDni.findIndex(
                                                                                                (item) =>
                                                                                                    item.type === 'max' &&
                                                                                                    item.value === '1',
                                                                                            )
                                                                                        ].params[1],
                                                                                    )
                                                                                : name == 'docnumber' &&
                                                                                    field == '2' &&
                                                                                    validationCc.length > 0
                                                                                    ? schema
                                                                                        .matches(
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type ===
                                                                                                        'matches' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[0],
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type ===
                                                                                                        'matches' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[1],
                                                                                        )
                                                                                        .min(
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type === 'min' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[0],
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type === 'min' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[1],
                                                                                        )
                                                                                        .max(
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type === 'max' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[0],
                                                                                            validationCc[
                                                                                                validationCc.findIndex(
                                                                                                    (item) =>
                                                                                                        item.type === 'max' &&
                                                                                                        item.value === '2',
                                                                                                )
                                                                                            ].params[1],
                                                                                        )
                                                                                    : name == 'docnumber' &&
                                                                                        field == '3' &&
                                                                                        validationPs.length > 0
                                                                                        ? schema
                                                                                            .matches(
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type ===
                                                                                                            'matches' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[0],
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type ===
                                                                                                            'matches' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[1],
                                                                                            )
                                                                                            .min(
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type === 'min' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[0],
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type === 'min' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[1],
                                                                                            )
                                                                                            .max(
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type === 'max' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[0],
                                                                                                validationPs[
                                                                                                    validationPs.findIndex(
                                                                                                        (item) =>
                                                                                                            item.type === 'max' &&
                                                                                                            item.value === '3',
                                                                                                    )
                                                                                                ].params[1],
                                                                                            )
                                                                                        : schema;
                                                                        };
                                                                    } else {
                                                                        params[1] = function (field, schema) {
                                                                            return name == 'docnumber' && field == '1'
                                                                                ? schema
                                                                                    .matches('^[0-9]+$', 'Sólo números')
                                                                                    .min(8, 'Mínimo de 8 dígitos')
                                                                                    .max(8, 'Máximo de 8 dígitos')
                                                                                : name == 'docnumber' && field == '2'
                                                                                    ? schema
                                                                                        .matches('^[0-9]+$', 'Sólo números')
                                                                                        .min(9, 'Mínimo de 9 dígitos')
                                                                                        .max(9, 'Máximo de 9 dígitos')
                                                                                    : schema;
                                                                        };
                                                                    }
                                                                } else {
                                                                    if (params[0] == 'fecha_iniH') {
                                                                        params[1] = function (field, schema, test) {
                                                                            const { fecha_iniH, fecha_finH } = test.parent;
                                                                            if (fecha_iniH && fecha_finH) {
                                                                                const startDate = new Date(fecha_iniH);
                                                                                const endDate = new Date(fecha_finH);
                                                                                const diffTime =
                                                                                    endDate.getTime() - startDate.getTime();
                                                                                const diffDays = Math.floor(
                                                                                    diffTime / (1000 * 60 * 60 * 24),
                                                                                );
                                                                                if (startDate > endDate) {
                                                                                    return schema.matches(
                                                                                        '^[0-9]+$',
                                                                                        'La fecha de inicio no puede ser mayor que la fecha de fin.',
                                                                                    );
                                                                                }
                                                                                return diffDays <= 92
                                                                                    ? schema
                                                                                    : schema.matches(
                                                                                        '^[0-9]+$',
                                                                                        'Máximo 3 meses',
                                                                                    );
                                                                            }
                                                                        };
                                                                    } else {
                                                                        if (params[0] == undefined) {
                                                                            params[0] = function (schema) {
                                                                                return schema;
                                                                            };
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (appComponent.crossCountryRegister) {
                        if (type === 'when') {
                            return; // ❌ NO los proceses
                        }
                    }

                    if (!validator[type]) return;
                    validator = validator[type](...params);
                });
                return schema.concat(Yup.object().shape({ [name]: validator })); // Concatenating schema
            }, Yup.object().shape({})); // Initializing schema
            return schema; // Returning the created schema
        };
        const schema = createValidationSchema(this.fields); // Creating validation schema from fields
        let page: number = 1; // Current page number
        let clearError: boolean = true; // Flag to clear errors
        let lastPage: boolean = true; // Flag for last page
        let phoneSearchValid: boolean = true; // Phone search validation flag
        return {
            ligthMode,
            config,
            minDate,
            maxDate,
            refreshBalance,
            appComponent,
            emitter,
            disabledLogin,
            clientId,
            schema,
            modelForm,
            page,
            clearError,
            lastPage,
            phoneSearch,
            phoneSearchValid,
            phoneSearchValid2,
            showModal: false, // Modal visibility flag
            TERMINOSYCONDICIONES,
            titleTyC: '', // Title for terms and conditions
            recaptcha,
            isMultiLoginRegister: false,
            formKey: 0,

        };
    },
    mounted() {
        if (this.recaptcha) {
            this.loadRecaptcha() // Loading reCAPTCHA
                .then(() => {
                    this.$nextTick(() => {
                        setTimeout(this.renderRecaptcha, 100); // Rendering reCAPTCHA after a delay
                    });
                })
                .catch((error) => {
                    console.error('Error en el recaptcha', error); // Logging reCAPTCHA error
                });
        }
        if (this.fields != undefined && this.fields.length > 0) {
            this.fields.forEach((field) => {
                if (field.name != undefined && field.name == 'birth_date') {
                    let minimumAgeNumber = field.validations.filter((validation) => {
                        return validation.type == 'when' && validation.minimum_age_number;
                    });
                    let minimumAgeNumberValidation =
                        minimumAgeNumber.length > 0 ? minimumAgeNumber[0].minimum_age_number : 18; // Default minimum age
                    var today = new Date();
                    let dateMin = today.setFullYear(today.getFullYear() - minimumAgeNumberValidation); // Calculating minimum date
                    let dateMax = today.setFullYear(today.getFullYear() - 82); // Calculating maximum date
                    this.maxDate = moment(dateMin).format('YYYY-MM-DD'); // Formatting maximum date
                    this.minDate = moment(dateMax).format('YYYY-MM-DD'); // Formatting minimum date
                }
            });
        }
        let DocTypeList2 = this.fields.filter((item) => {
            return item.optionsKey == 'docTypeList'; // Filtering document type list
        });
        if (DocTypeList2.length > 0) {
            let defaultDoctype2 = DocTypeList2[0].options.filter((item) => {
                return item.default != undefined && item.default == true; // Getting default document type
            })[0];
            const elementName = DocTypeList2[0].name; // Document type element name
            let inputId = '';
            this.fields.forEach((item) => {
                item.validations.forEach((validation) => {
                    if (validation.type == 'when' && validation.params.includes(elementName)) {
                        inputId = item.name; // Finding input ID
                    }
                });
            });
            let inputElement = document.getElementById(inputId) as HTMLInputElement; // Getting input element by ID
            if (inputElement && defaultDoctype2 != undefined && defaultDoctype2.type != undefined) {
                inputElement.type = defaultDoctype2.type; // Setting input type
            }
        }

        this.isMultiLoginRegister = !!this.appComponent.crossCountryRegister;

        setTimeout(() => {
            if (this.$refs.contentRefs) {
                (this.$refs.contentRefs as any).forEach((ref, index) => {
                    ref.addEventListener('click', (event) => this.handleContentClick(event, index)); // Adding click event listener
                });
            }
        }, 500);
        if (this.appComponent.viewActual.indexOf('registro') == -1) {
            this.appComponent.config.registro != undefined &&
                this.appComponent.config.registro.steps != undefined &&
                this.appComponent.config.registro.steps[this.appComponent.country] != undefined
                ? delete this.appComponent.config.registro.steps[this.appComponent.country] // Deleting registration steps if not in view
                : '';
        }
        this.emitter.on('accept:modal', () => {
            this.acceptModal(); // Accept modal event
        });
        this.emitter.on('resend:code', () => {
            var params = {
                type: 1,
                phone: this.modelForm['phone'], // Phone number for verification
                timeOthersRequets: true,
            };
            apiService.request('verify_phone', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.modal = {
                        showModal: 'searchCodePhone', // Showing modal for phone code search
                        messageModal: {
                            tickedCheckPhone: response.ticked,
                        },
                    };
                } else if (response.code == 1118) {
                    this.appComponent.disableOthersButtons = true; // Disabling other buttons
                    let timeOP: any = localStorage.getItem('timeOtherPeticions'); // Getting time from local storage
                    let numberValue = parseInt(timeOP); // Parsing time value
                    let sumMinutes = new Date();
                    sumMinutes.setTime(numberValue + this.config.otherRestrictionTime * 1000); // Calculating sum minutes
                    let interval = setInterval(() => {
                        this.appComponent.otherCount = sumMinutes.getTime() - new Date().getTime(); // Updating other count
                        this.appComponent.disabledOtherCount = true; // Disabling other count
                        if (sumMinutes.getTime() <= new Date().getTime()) {
                            this.appComponent.disabledOtherCount = false; // Enabling other count
                            this.appComponent.disableOthersButtons = false; // Enabling other buttons
                            clearInterval(interval); // Clearing interval
                        }
                    }, 1000);
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Getting error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.modal = {
                        showModal: 'notification', // Showing notification modal
                        titleModal: this.$t('Error!'), // Title for error modal
                        messageModal: error_mensaje, // Error message
                        buttonModal: this.$t('Aceptar'), // Button text
                        orderModal: 'closeModal', // Order for modal
                    };
                }
            });
        });
        this.config.registro == undefined ||
            this.config.registro.steps == undefined ||
            this.config.registro.steps[this.appComponent.country] == undefined
            ? (this.lastPage = true) // Setting last page flag
            : (this.lastPage = false); // Resetting last page flag

        // Setting up theme interval to check for theme changes
        this.changeColor = setInterval(() => {
            const localStorageC = localStorage.getItem('changeThemeColor');
            if (localStorageC === 'true' && !this.ligthMode) {
                this.ligthMode = true;
            } else if (localStorageC !== 'true' && this.ligthMode) {
                this.ligthMode = false;
            }
        }, 500);
        if (this.appComponent.crossCountryRegister) { // Check if cross-country registration data exists in app cache
            const data = this.appComponent.crossCountryRegister; // Reference cached cross-country registration data

            const map = { // Map form field keys to backend response keys
                first_name: 'name', // Backend first name field
                last_name: 'lastname', // Backend last name field
                birth_date: 'natalityDate', // Backend birth date field
                email: 'email', // Backend email field
            };

            Object.keys(map).forEach((formKey) => { // Iterate through mapped form fields
                const backendKey = map[formKey]; // Get corresponding backend field name

                if (data[backendKey]) { // Check if backend value exists
                    this.modelForm[formKey] = // Assign value to form model
                        formKey === 'birth_date'
                            ? data[backendKey].replaceAll('/', '-') // Normalize birth date format for form input
                            : data[backendKey]; // Assign backend value directly

                    const field = this.fields.find(f => f.name === formKey); // Find form field configuration by name
                    if (field) { // Ensure field configuration exists
                        field.disabled = true; // Disable field to prevent user editing
                        field.fromCache = true; // Mark field as populated from cache
                    }
                }
            });

            this.formKey++; // Force form re-render to apply disabled and cached field changes
        }
    },
    computed: { // Computed properties for reactive derived state
        registerButtonText() { // Determine the registration button text dynamically
            if (this.isMultiLoginRegister) { // Check if the multi-login registration flow is active
                return this.$t('Crear cuenta en'); // Return translated text for creating a local account
            }

            return this.textButton; // Fallback to default button text
        },
    },
    unmounted() {
        if (this.appComponent.viewActual.indexOf('/landing/sorteos') == -1) {
            this.emitter.all.delete('accept:modal'); // Deleting event listener on unmount
        }
    },
    beforeUnmount() {
        if (this.$refs.contentRefs) {
            (this.$refs.contentRefs as any).forEach((ref, index) => {
                ref.removeEventListener('click', (event) => this.handleContentClick(event, index)); // Removing click event listener
            });
        }
        if (this.changeColor) {
            clearInterval(this.changeColor);
        }
    },
    watch: { // Watchers to react to reactive state changes
        'appComponent.crossCountryRegister': { // Watch cross-country registration cache changes
            handler(data) { // Execute when cross-country data changes
                if (!data) return; // Exit if no data is present
                this.isMultiLoginRegister = true; // Enable multi-login registration mode

                const map = { // Map form field keys to backend response keys
                    first_name: 'name', // Backend first name field
                    last_name: 'lastname', // Backend last name field
                    birth_date: 'natalityDate', // Backend birth date field
                    email: 'email', // Backend email field
                };

                Object.keys(map).forEach((formKey) => { // Iterate through mapped form fields
                    const backendKey = map[formKey]; // Get corresponding backend field name

                    if (data[backendKey]) { // Check if backend value exists
                        this.modelForm[formKey] = // Assign value to form model
                            formKey === 'birth_date'
                                ? data[backendKey].replaceAll('/', '-') // Normalize birth date format for form input
                                : data[backendKey]; // Assign backend value directly

                        const field = this.fields.find(f => f.name === formKey); // Find form field configuration by name
                        if (field) { // Ensure field configuration exists
                            field.disabled = true; // Disable field to prevent user editing
                        }
                    }
                });
            },
            deep: true, // Watch nested changes inside the cross-country object
            immediate: true, // Execute watcher immediately on component initialization
        },
    },

    emits: ['onSubmit:form', 'changeSelect:form', 'changeField:form'], // Emitting events
    methods: {

        loadRecaptcha() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script'); // Creating script element for reCAPTCHA
                script.src = 'https://www.google.com/recaptcha/api.js?hl=es'; // Setting script source
                script.onload = resolve; // Resolving promise on load
                script.onerror = reject; // Rejecting promise on error
                document.head.appendChild(script); // Appending script to document head
            });
        },
        renderRecaptcha() {
            if (this.recaptcha) {
                try {
                    if (typeof grecaptcha.render === 'function') {
                        setTimeout(() => {
                            grecaptcha.render('g-recaptcha', {
                                sitekey: this.config.captchaKey, // Rendering reCAPTCHA with site key
                            });
                        }, 100);
                        this.recaptcha = true; // Setting reCAPTCHA state
                        console.log('renderizo correctamente'); // Logging successful render
                    } else {
                        console.log('La renderizacion de cargo como que no es una funcion'); // Logging render error
                    }
                } catch (e) {
                    console.log('Error al renderizar grecaptcha:', e); // Logging render error
                }
            } else {
                console.log('El recaptcha esta deshabilitado'); // Logging disabled reCAPTCHA
            }
        },
        handleContentClick(event, index) {
            if (event.target.tagName === 'A') {
                event.preventDefault(); // Preventing default anchor behavior
                const href = event.target.getAttribute('href'); // Getting href attribute
                let objConfig = '';
                let objConfig2 = '';
                if (href.indexOf('terminosycondiciones') != -1) {
                    this.titleTyC = this.$t('Términos y Condiciones'); // Setting title for terms and conditions
                    objConfig = 'termsandcondition'; // Config for terms and conditions
                    objConfig2 = 'termns_and_conditions'; // Alternative config for terms and conditions
                } else {
                    if (href.indexOf('preguntasfrecuentes') != -1) {
                        this.titleTyC = this.$t('Preguntas frecuentes'); // Setting title for FAQs
                        objConfig = 'faq'; // Config for FAQs
                        objConfig2 = 'faq'; // Alternative config for FAQs
                    } else {
                        if (href.indexOf('juego-responsable') != -1) {
                            this.titleTyC = this.$t('Juego responsable'); // Setting title for responsible gaming
                            objConfig = 'responsiblegaming'; // Config for responsible gaming
                            objConfig2 = 'responsible_gaming'; // Alternative config for responsible gaming
                        } else {
                            if (href.indexOf('politica-de-privacidad') != -1) {
                                this.titleTyC = this.$t('Politica de Privacidad'); // Setting title for privacy policy
                                objConfig = 'privacypolicy'; // Config for privacy policy
                                objConfig2 = 'privacy_policies'; // Alternative config for privacy policy
                            }
                        }
                    }
                }
                if (
                    this.config != undefined &&
                    this.config['not_login'] != undefined &&
                    this.config['not_login'][this.appComponent.lngProd] != undefined &&
                    this.config['not_login'][this.appComponent.lngProd][objConfig2] != undefined
                ) {
                    this.TERMINOSYCONDICIONES = this.config['not_login'][this.appComponent.lngProd][objConfig2]; // Setting terms and conditions from config
                } else {
                    if (
                        this.config != undefined &&
                        this.config[objConfig] != undefined &&
                        this.config[objConfig][this.appComponent.country] != undefined &&
                        this.config[objConfig][this.appComponent.country][this.appComponent.lngProd] != undefined
                    ) {
                        this.TERMINOSYCONDICIONES =
                            this.config[objConfig][this.appComponent.country][this.appComponent.lngProd]; // Setting terms and conditions from config
                    }
                }
                this.showModal = true; // Showing modal
            }
        },
        closeModal() {
            this.showModal = false; // Closing modal
        },
        /**
         * Verifies if the provided DNI (Documento Nacional de Identidad) has restrictions
         * for participating in online games and sports betting, as per the regulations.
         *
         * @param {string} dni - The DNI to be verified.
         */
        verifyMincetur(dni: string) {
            // Disable the form and other buttons while the verification is in progress
            this.appComponent.disabledButtonForm = true;
            this.appComponent.disableOthersButtons = true;

            // Prepare the payload for the API request
            const payload = {
                DNI: dni,
                country: this.appComponent.country,
                site_id: 0,
            };

            // Make an API request to verify the DNI
            apiService
                .request('verification_mincetur', payload)
                .then((response: any) => {
                    // Check if the response indicates a restriction
                    const hasRestriction =
                        response &&
                            response.data &&
                            typeof response.data.hasRestriction === 'boolean'
                            ? response.data.hasRestriction
                            : false;

                    if (hasRestriction === true) {
                        // If restricted, show a modal with the restriction message
                        this.appComponent.disabledButtonForm = true;
                        this.appComponent.disableOthersButtons = true;

                        document.body.classList.add('modal-mincetur');

                        this.appComponent.modal = {
                            showModal: 'notification',
                            titleModal: this.$t(
                                'REGISTRO NO PERMITIDO – EL DNI INGRESADO CUENTA CON RESTRICCIÓN PARA PARTICIPAR EN JUEGOS A DISTANCIA Y APUESTAS DEPORTIVAS.'
                            ),
                            messageModal: this.$t(
                                'La casa de apuestas cumple con lo establecido en el Artículo 28. ' +
                                'Prohibición de participar en los juegos a distancia y/o apuestas deportivas ' +
                                'a distancia de la Ley Nro. 31557.'
                            ),
                            buttonModal: this.$t('Aceptar'),
                            orderModal: 'minceturRedirect',
                        };

                        return;
                    }

                    // If no restriction, re-enable the form and buttons
                    this.appComponent.disabledButtonForm = false;
                    this.appComponent.disableOthersButtons = false;
                })
                .catch((error) => {
                    // Handle errors by re-enabling the form and buttons
                    this.appComponent.disabledButtonForm = false;
                    this.appComponent.disableOthersButtons = false;
                });
        },
        signInWithFacebook(userFacebook) {
            console.log('Handle the response', userFacebook); // Logging Facebook response
            this.appComponent.loadView = false; // Setting loading view state
            const params = {
                id_token: userFacebook.authResponse.accessToken, // Getting access token from Facebook response
                country: this.appComponent.country, // Country from app component
                type: 2, // Type for Facebook login
            };
            this.disabledLogin = true; // Disabling login
            apiService.request('external_auth', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.firstReqBalance = false; // Setting first request balance state
                    this.appComponent.tokenSB = response.data.tokenSB; // Setting token from response
                    this.appComponent.user_id = response.data.user_id; // Setting user ID from response
                    this.appComponent.channel_id = response.data.channel_id; // Setting channel ID from response
                    this.appComponent.id_platform = response.data.id_platform; // Setting platform ID from response
                    this.appComponent.tokenUser = response.data.auth_token; // Setting user token from response
                    apiService.setAuthToken(response.data.auth_token); // Setting auth token in API service
                    this.appComponent.showModalLogin = false; // Hiding login modal
                    window.localStorage.setItem('auth_token', response.data.auth_token); // Storing auth token in local storage
                    this.appComponent.flagMenu = true; // Setting menu flag
                    this.appComponent.frm = 'lgn'; // Setting form type
                    this.refreshBalance(); // Refreshing balance
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Getting error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.loadView = true; // Setting loading view state
                    this.appComponent.modal = {
                        showModal: 'notification', // Showing notification modal
                        titleModal: this.$t('Error!'), // Title for error modal
                        messageModal: error_mensaje, // Error message
                        buttonModal: this.$t('Aceptar'), // Button text
                        orderModal: 'closeModal', // Order for modal
                    };
                }
            });
        },
        signInWithFacebookFailed() {
            var error_mensaje = this.$t('Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'); // Default error message
            this.appComponent.modal = {
                showModal: 'notification', // Showing notification modal
                titleModal: this.$t('Error!'), // Title for error modal
                messageModal: error_mensaje, // Error message
                buttonModal: this.$t('Aceptar'), // Button text
                orderModal: 'closeModal', // Order for modal
            };
        },
        signInWithGoogle(userGoogle) {
            console.log('Handle the response', userGoogle); // Logging Google response
            this.appComponent.loadView = false; // Setting loading view state
            const params = {
                id_token: userGoogle.credential, // Getting credential from Google response
                country: this.appComponent.country, // Country from app component
                type: 1, // Type for Google login
            };
            apiService.request('external_auth', params).then((response: any) => {
                if (response.code == 0) {
                    this.appComponent.firstReqBalance = false; // Setting first request balance state
                    this.appComponent.tokenSB = response.data.tokenSB; // Setting token from response
                    this.appComponent.user_id = response.data.user_id; // Setting user ID from response
                    this.appComponent.channel_id = response.data.channel_id; // Setting channel ID from response
                    this.appComponent.id_platform = response.data.id_platform; // Setting platform ID from response
                    this.appComponent.tokenUser = response.data.auth_token; // Setting user token from response
                    apiService.setAuthToken(response.data.auth_token); // Setting auth token in API service
                    this.appComponent.showModalLogin = false; // Hiding login modal
                    window.localStorage.setItem('auth_token', response.data.auth_token); // Storing auth token in local storage
                    this.appComponent.flagMenu = true; // Setting menu flag
                    this.appComponent.frm = 'lgn'; // Setting form type
                    this.refreshBalance(); // Refreshing balance
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Getting error message
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        ); // Default error message
                    }
                    this.appComponent.loadView = true; // Setting loading view state
                    this.appComponent.modal = {
                        showModal: 'notification', // Showing notification modal
                        titleModal: this.$t('Error!'), // Title for error modal
                        messageModal: error_mensaje, // Error message
                        buttonModal: this.$t('Aceptar'), // Button text
                        orderModal: 'closeModal', // Order for modal
                    };
                }
            });
        },
        acceptModal() {
            if (this.appComponent.modal.orderModal == 'verifyPhone') {
                var params = {
                    type: 1,
                    phone: this.phoneSearch, // Phone number for verification
                };
                apiService.request('verify_phone', params).then((response: any) => {
                    if (response.code == 0) {
                        this.appComponent.modal = {
                            showModal: 'searchCodePhone', // Showing modal for phone code search
                            messageModal: {
                                tickedCheckPhone: response.ticked,
                            },
                        };
                    } else {
                        var error_mensaje = '';
                        if (response.error_code != undefined) {
                            error_mensaje = this.$t('ERROR' + response.error_code.toString()); // Getting error message
                        }
                        if (error_mensaje == '') {
                            error_mensaje = this.$t(
                                'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                            ); // Default error message
                        }
                        this.appComponent.modal = {
                            showModal: 'notification', // Showing notification modal
                            titleModal: this.$t('Error!'), // Title for error modal
                            messageModal: error_mensaje, // Error message
                            buttonModal: this.$t('Aceptar'), // Button text
                            orderModal: 'closeModal', // Order for modal
                        };
                    }
                });
            } else {
                if (this.appComponent.modal.orderModal == 'verifyPhoneSuccess') {
                    this.phoneSearchValid = false; // Setting phone search validation flag
                    let phoneValue = JSON.parse(JSON.stringify(this.modelForm['phone'])); // Getting phone value
                    this.modelForm['phone'] = null; // Resetting phone value
                    setTimeout(() => {
                        this.schema.fields['phone'].conditions.forEach((item, index) => {
                            this.schema.fields['phone'].conditions[index]['fn'] = (field, schema) => {
                                return schema; // Resetting validation function
                            };
                        });
                        this.modelForm['phone'] = phoneValue; // Restoring phone value
                        (document.getElementById('phone') as any).focus(); // Focusing on phone input
                    }, 10);
                }
            }
            if (this.appComponent.modal?.orderModal === 'minceturRedirect') {

                document.body.classList.remove('modal-mincetur');

                this.appComponent.showModal = false;

                this.appComponent.disabledButtonForm = false;
                this.appComponent.disableOthersButtons = false;

                window.location.replace('/');

                return;
            }
            this.appComponent.closeModal(); // Closing modal
        },
        onSubmit(item) {
            if (this.lastPage) {
                this.appComponent.disabledButtonForm = true; // Disabling form button
                var sg = true; // Flag for reCAPTCHA validation
                if (this.recaptcha) {
                    if (grecaptcha.getResponse().length === 0) {
                        sg = false; // Setting flag to false if reCAPTCHA is not validated
                    }
                }
                if (sg) {
                    this.$emit('onSubmit:form', item); // Emitting form submission event
                }
            } else {
                this.page++; // Incrementing page number
                this.clearError = false; // Clearing error flag
                if (this.page == this.config.registro.steps[this.appComponent.country]) {
                    this.lastPage = true; // Setting last page flag
                }
            }
        },
        onInvalidSubmit({ errors }) {
            this.clearError = true; // Clearing error flag
            if (
                this.config != undefined &&
                this.config.registro != undefined &&
                this.config.registro.steps != undefined &&
                this.config.registro.steps[this.appComponent.country] != undefined &&
                this.config.registro.steps[this.appComponent.country]
            ) {
                let fieldsPage: any = [];
                this.fields
                    .filter((field) => {
                        return field.page == this.page; // Filtering fields for current page
                    })
                    .forEach((item: any) => {
                        fieldsPage.push(item.name); // Collecting field names
                    });
                var common = fieldsPage.filter((x) => Object.keys(errors).indexOf(x) !== -1); // Finding common fields with errors
                if (common.length == 0) {
                    if (this.page < this.config.registro.steps[this.appComponent.country]) {
                        this.page++; // Incrementing page number
                        this.clearError = false; // Clearing error flag
                        if (this.page == this.config.registro.steps[this.appComponent.country]) {
                            this.lastPage = true; // Setting last page flag
                        }
                    }
                }
            }
        },
        vRequired(field: any) {
            let value = field.validations.filter((item) => {
                return item.type == 'required'; // Checking for required validation
            });
            if (value.length > 0) {
                return true; // Returning true if required validation exists
            }
            return false; // Returning false if no required validation
        },
        getArraySelects(optionsKey: string) {
            for (var _key in this.arraySelects) {
                return this.arraySelects[optionsKey]; // Returning array of selects based on key
            }
        },
        changeSelect: function (event: any, optionsKey: any) {
            this.$emit('changeSelect:form', { event, optionsKey }); // Emitting change select event
        },
        initFile(event: any) {
            var file = event.target.files[0]; // Getting file from input
            if (file) {
                if (/^image/.test(file.type)) { // Checking if file is an image
                    if (parseInt((file.size / 1024).toString()) <= this.config.maxSizeFile) {
                        this.readFile(file, event.target.id); // Reading file if size is valid
                    } else {
                        this.modelForm[event.target.id] = ''; // Resetting model form value
                        this.appComponent.modal = {
                            showModal: 'notification', // Showing notification modal
                            titleModal: this.$t('Error'), // Title for error modal
                            messageModal: this.$t('Supera tamaño máximo permitido.'), // Error message
                            buttonModal: this.$t('Aceptar'), // Button text
                            orderModal: 'closeModal', // Order for modal
                        };
                    }
                } else {
                    alert('Not a valid image!'); // Alerting invalid image
                }
            }
        },
        readFile(file, name) {
            var reader = new FileReader(); // Creating file reader
            const vthis = this; // Storing reference to this
            reader.onloadend = function () {
                vthis.processFile(reader.result, file.type, name); // Processing file on load end
            };
            reader.onerror = function () {
                alert('There was an error reading the file!'); // Alerting file read error
            };
            reader.readAsDataURL(file); // Reading file as data URL
        },
        processFile(dataURL, fileType, name) {
            var maxWidth = 800; // Maximum width for image
            var maxHeight = 800; // Maximum height for image
            const vthis = this; // Storing reference to this
            var image = new Image(); // Creating new image
            image.src = dataURL; // Setting image source
            image.onload = function () {
                var width = image.width; // Getting image width
                var height = image.height; // Getting image height
                var shouldResize = width > maxWidth || height > maxHeight; // Checking if image should be resized
                if (!shouldResize) {
                    vthis.modelForm[name] = dataURL; // Setting model form value if no resize needed
                    return dataURL; // Returning data URL
                }
                var newWidth;
                var newHeight;
                if (width > height) {
                    newHeight = height * (maxWidth / width); // Calculating new height
                    newWidth = maxWidth; // Setting new width
                } else {
                    newWidth = width * (maxHeight / height); // Calculating new width
                    newHeight = maxHeight; // Setting new height
                }
                var canvas = document.createElement('canvas'); // Creating canvas for resizing
                canvas.width = newWidth; // Setting canvas width
                canvas.height = newHeight; // Setting canvas height
                var context: any = canvas.getContext('2d'); // Getting canvas context
                context.drawImage(image, 0, 0, newWidth, newHeight); // Drawing resized image on canvas
                dataURL = canvas.toDataURL(fileType); // Getting data URL from canvas
                vthis.modelForm[name] = dataURL; // Setting model form value
                return dataURL; // Returning data URL
            };
            image.onerror = function () {
                alert('There was an error processing your file!'); // Alerting file processing error
            };
        },
        changeFieldRadio(item: any, event: any) {
            this.$emit('changeField:form', { item, event }); // Emitting change field event for radio
        },
        changeField(item: any, event: any) {
            this.$emit('changeField:form', { item, event }); // Emitting change field event
            if (item.name == 'docnumber') {
                let existsDocNumber = item.validations.filter((validation) => {
                    return validation.type == 'when' && (validation.exists_doc_number || validation.valid_rut); // Checking for document number validations
                });
                if (existsDocNumber.length > 0) {
                    existsDocNumber.forEach((existDocNumber, index) => {
                        this.schema.fields[item.name].conditions[index]['fn'] = (field, schema) => {
                            return schema; // Resetting validation function
                        };
                        const doctypeIdFind = this.fields.find((field) => field.name == 'doctype_id'); // Finding document type ID field
                        const doctypeId = doctypeIdFind?.options.find((option) => option.value === this.modelForm['doctype_id']); // Getting document type ID
                        if (doctypeId.name === 'RUT' && existDocNumber.valid_rut) {
                            function clean(rut) {
                                return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''; // Cleaning RUT
                            }
                            function format(rut) {
                                rut = clean(rut); // Cleaning RUT
                                let result = rut.slice(0, -1) + '-' + rut.substr(rut.length - 1); // Formatting RUT
                                return result; // Returning formatted RUT
                            }
                            setTimeout(() => {
                                this.modelForm[item.name] = format(event.target.value); // Setting formatted RUT in model form
                            }, 10);
                        }
                    });
                }
            }
            if (item.name == 'phone') {
                let existsPhone = item.validations.filter((validation) => {
                    return validation.type == 'when' && (validation.exists_phone || validation.phone_search); // Checking for phone validations
                });
                if (existsPhone.length > 0) {
                    existsPhone.forEach((existPhone, index) => {
                        this.schema.fields[item.name].conditions[index]['fn'] = (field, schema) => {
                            return schema; // Resetting validation function
                        };
                    });
                }
            }
            if (item.name == 'email') {
                let existsEmail = item.validations.filter((validation) => {
                    return validation.type == 'when' && validation.exists_email; // Checking for email validations
                });
                if (
                    existsEmail.length > 0 &&
                    this.schema.fields[item.name] &&
                    this.schema.fields[item.name].conditions &&
                    this.schema.fields[item.name].conditions.length > 0
                ) {
                    this.schema.fields[item.name].conditions[0]['fn'] = (field, schema) => {
                        if (schema && typeof schema === 'object' && typeof schema.isValid === 'function') {
                            return schema; // Returning schema if valid
                        } else {
                            console.error("Objeto de esquema no válido devuelto por condiciones[0]['fn']"); // Logging invalid schema error
                            return Yup.string(); // Returning string schema
                        }
                    };
                } else {
                    console.error('la matriz de condiciones está vacía o no está definida para el campo: ', item.name); // Logging conditions error
                }
            }
            if (item.name == 'birth_date') {
                let minimumAge = item.validations.filter((validation) => {
                    return validation.type == 'when' && validation.minimum_age; // Checking for minimum age validations
                });
                let minimumAgeNumber = item.validations.filter((validation) => {
                    return validation.type == 'when' && validation.minimum_age_number; // Checking for minimum age number validations
                });
                let minimumAgeNumberValidation =
                    minimumAgeNumber.length > 0 ? minimumAgeNumber[0].minimum_age_number : 18; // Default minimum age number
                if (minimumAge.length > 0) {
                    this.schema.fields[item.name].conditions[0]['fn'] = (field, schema) => {
                        if (field != undefined) {
                            let date = new Date(field + 'T00:00:00'); // Creating date object from field value
                            let today = new Date(); // Getting current date
                            let age = today.getFullYear() - date.getFullYear(); // Calculating age
                            let monthDiff = today.getMonth() - date.getMonth(); // Calculating month difference
                            let dayDiff = today.getDate() - date.getDate(); // Calculating day difference
                            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                age--; // Adjusting age if necessary
                            }
                            return age < minimumAgeNumberValidation
                                ? schema.length(1, this.$t('Infringe edad mínima')) // Returning error if age is less than minimum
                                : schema; // Returning schema if valid
                        }
                    };
                }
            }
            if (item.name == 'doc_number') {
                let checkDoc = item.validations.filter((validation) => {
                    return validation.type == 'when' && validation.check_doc; // Checking for document number checks
                });
                if (checkDoc.length > 0) {
                    this.schema.fields[item.name].conditions[0]['fn'] = (field, schema) => {
                        if (field != undefined) {
                            return field != this.appComponent.session.cedula
                                ? schema.length(0, this.$t('Cédula debe coincidir con la registrada')) // Returning error if document number does not match
                                : schema; // Returning schema if valid
                        }
                    };
                }
            }
        },
        blurField(item: any, event: any) {
            if (item.name == 'docnumber') {
                let verifyMincetur = item.validations.filter((validation) => {
                    return validation.type == 'mincetur' && (validation.mincetur); // Checking for document number validations
                });
                if (verifyMincetur.length > 0 && event.target.value != '') {
                    this.verifyMincetur(event.target.value);
                }
                let existsDocNumber = item.validations.filter((validation) => {
                    return validation.type == 'when' && (validation.exists_doc_number || validation.valid_rut); // Checking for document number validations
                });
                if (existsDocNumber.length > 0 && event.target.value != '') {
                    existsDocNumber.forEach((existDocNumber, index) => {
                        if (existDocNumber.exists_doc_number) {
                            const payload: any = {
                                docnumber: event.target.value,
                            };

                            if (this.appComponent.crossCountryRegister) {
                                payload.acceptMultiLogin = true;
                            }

                            apiService
                                .request('exists_identificator', payload)
                                .then((response: any) => {
                                    if (response.code == 12) {
                                        this.schema.fields[item.name].conditions[index]['fn'] = (field, schema) => {
                                            return schema.length(0, this.$t('Cedula ya esta registrada')); // Returning error if document number is already registered
                                        };
                                        (document.getElementById(item.name) as any).focus(); // Focusing on document number input
                                    }
                                });
                        }
                        const doctypeIdFind = this.fields.find((field) => field.name == 'doctype_id'); // Finding document type ID field
                        const doctypeId = doctypeIdFind?.options.find((option) => option.value === this.modelForm['doctype_id']); // Getting document type ID
                        if (doctypeId.name === 'RUT' && existDocNumber.valid_rut) {
                            const stringWithNumbers = event.target.value; // Getting value from input
                            const onlyNumbers = stringWithNumbers.replace(/[^0-9+-kK]+/g, ''); // Cleaning input value
                            function dv(T) {
                                var M = 0,
                                    S = 1;
                                for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11; // Calculating verification digit
                                return S ? S - 1 : 'k'; // Returning verification digit
                            }
                            function validaRut(rutCompleto) {
                                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false; // Validating RUT format
                                var tmp = rutCompleto.split('-'); // Splitting RUT into number and verification digit
                                var digv = tmp[1]; // Getting verification digit
                                var rut = tmp[0]; // Getting number part of RUT
                                if (digv == 'K') digv = 'k'; // Adjusting verification digit
                                return dv(rut) == digv; // Returning validation result
                            }
                            if (!validaRut(onlyNumbers)) {
                                this.schema.fields[item.name].conditions[index]['fn'] = (field, schema) => {
                                    return schema.length(
                                        0,
                                        this.$t('RUT Inválido, Ingrese dígito de verificación separado por -'), // Returning error if RUT is invalid
                                    );
                                };
                                (document.getElementById(item.name) as any).focus(); // Focusing on document number input
                            }
                        }
                    });
                }
            }
            if (item.name == 'phone') {
                let existsPhone = item.validations.filter((validation) => {
                    return validation.type == 'when' && (validation.exists_phone || validation.phone_search); // Checking for phone validations
                });
                if (existsPhone.length > 0 && event.target.value != '') {
                    existsPhone.forEach((existPhone, index) => {
                        if (existPhone.exists_phone) {
                            const payload: any = {
                                phone: event.target.value,
                            };

                            if (this.appComponent.crossCountryRegister) {
                                payload.acceptMultiLogin = true;
                            }

                            apiService
                                .request('exists_phone', { phone: event.target.value, timeOthersRequets: true }) // Checking if phone exists
                                .then((response: any) => {
                                    if (response.code == 12) {
                                        this.phoneSearchValid2 = false; // Setting phone search validation flag
                                        this.schema.fields[item.name].conditions[0]['fn'] = (field, schema) => {
                                            return schema.length(0, this.$t('Celular ya esta registrado')); // Returning error if phone is already registered
                                        };
                                        (document.getElementById(item.name) as any).focus(); // Focusing on phone input
                                    } else if (response.code == 0) {
                                        this.phoneSearchValid2 = true; // Setting phone search validation flag to true
                                    } else if (response.code == 1118) {
                                        this.appComponent.disableOthersButtons = true; // Disabling other buttons
                                        let timeOP: any = localStorage.getItem('timeOtherPeticions'); // Getting time from local storage
                                        let numberValue = parseInt(timeOP); // Parsing time value
                                        let sumMinutos = new Date();
                                        sumMinutos.setTime(numberValue + this.config.otherRestrictionTime * 1000); // Calculating sum minutes
                                        let interval = setInterval(() => {
                                            this.appComponent.otherCount = sumMinutos.getTime() - new Date().getTime(); // Updating other count
                                            this.appComponent.disabledOtherCount = true; // Disabling other count
                                            if (sumMinutos.getTime() <= new Date().getTime()) {
                                                this.appComponent.disabledOtherCount = false; // Enabling other count
                                                this.appComponent.disableOthersButtons = false; // Enabling other buttons
                                                clearInterval(interval); // Clearing interval
                                            }
                                        }, 1000);
                                    }
                                });
                        }
                        if (existPhone.phone_search) {
                            if (this.phoneSearchValid) {
                                this.schema.fields[item.name].conditions[index]['fn'] = (field, schema) => {
                                    if (this.phoneSearchValid2)
                                        return schema.length(0, this.$t('Celular debe ser verificado')); // Returning error if phone must be verified
                                };
                            }
                        }
                    });
                }
            }
            if (item.name == 'email') {
                let existsEmail = item.validations.filter((validation) => {
                    return validation.type == 'when' && validation.exists_email; // Checking for email validations
                });
                if (existsEmail.length > 0 && event.target.value != '') {
                    const payload: any = {
                        email: event.target.value,
                    };

                    if (this.appComponent.crossCountryRegister) {
                        payload.acceptMultiLogin = true;
                    }

                    apiService
                        .request('exists_email', { email: event.target.value }) // Checking if email exists
                        .then((response: any) => {
                            if (response.code == 12) {
                                if (
                                    this.schema.fields[item.name].conditions &&
                                    this.schema.fields[item.name].conditions[0]
                                ) {
                                    this.schema.fields[item.name].conditions[0]['fn'] = (field, schema) => {
                                        return schema.test(
                                            'email-exists',
                                            'Usuario ya está registrado',
                                            () => false, // Returning error if email is already registered
                                        );
                                    };
                                    (document.getElementById(item.name) as any).focus(); // Focusing on email input
                                } else {
                                    console.error('Las condiciones del esquema no están configuradas correctamente.'); // Logging conditions error
                                }
                            }
                        })
                        .catch((error: any) => {
                            console.error('Fallo la peticion a la API:', error); // Logging API request error
                        });
                }
            }
        },
        onClicEventDocNumber(item: any) {
            if (item.type == 'textsearch') {
                let textSearchFields = this.fields.filter((field) => {
                    return field.textSearch; // Filtering fields with text search
                });
                var params = {
                    docnumber: this.modelForm[item.name], // Getting document number from model form
                    country:
                        this.modelForm['countryResident_id'] != undefined
                            ? this.arraySelects['countryResidentList']
                                .filter((x) => x.Id == this.modelForm['countryResident_id'])
                                .map((x) => x.Iso)[0] // Getting country ISO code
                            : this.appComponent.country, // Default country from app component
                };
                apiService.request('validate_cpf', params).then((response: any) => {
                    if (response.code == 0) {
                        if (response.data.length > 0) {
                            response.data[0]['birth_date'] = response.data[0]['birth_date'].replace('T00:00:00Z', ''); // Formatting birth date
                            textSearchFields.forEach((field) => {
                                this.modelForm[field.name] = response.data[0][field.name]; // Setting model form values from response
                            });
                        }
                    } else {
                        textSearchFields.forEach((field) => {
                            this.modelForm[field.name] = ''; // Resetting model form values if no data found
                        });
                    }
                });
            } else {
                setTimeout(() => {
                    (document.getElementById('email') as any).focus(); // Focusing on email input
                    if (
                        item.type == 'phonesearch' &&
                        this.modelForm[item.name].length != '' &&
                        this.phoneSearchValid2
                    ) {
                        this.phoneSearch = this.modelForm[item.name]; // Setting phone search value
                        this.appComponent.modal = {
                            showModal: 'notification', // Showing notification modal
                            titleModal: this.$t('Verificar Celular'), // Title for phone verification modal
                            messageModal: this.$t('Para verificar su celular enviaremos un código a su celular'), // Message for phone verification
                            buttonModal: this.$t('Enviar Código'), // Button text
                            orderModal: 'verifyPhone', // Order for modal
                        };
                    }
                }, 500);
            }
        },
        showpass(id) {
            let pwd: any = document.getElementById(id); // Getting password input by ID
            if (pwd.type === 'password') {
                pwd.type = 'text'; // Changing input type to text
            } else {
                pwd.type = 'password'; // Changing input type back to password
            }
        },
        toKebabCase(value: string) {
            return toKebabCaseUtil(value);
        },
        analyticsAttrs(label: string, position?: number, context?: string, extra?: string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context':
                    context ? context : `step:fill-form|step-num:1|component:Form|layout:layout-${this.appComponent.config.layout}${extra ? `|${extra}` : ''}`,
                ...(position !== undefined && { 'data-analytics-position': position }),

            };
        },
    },
});
</script>
<template>
    <div :class="[
        { 'py-3': windowFrame && backgroundForm == '' },
        {
            'relative bg-base-200 rounded-b-xl':
                config.layout != undefined &&
                config.layout == 3 &&
                $route.fullPath.indexOf('/landing/sorteos') == -1 &&
                backgroundForm == '',
        },
    ]">
        <!-- Conditional div for specific route and component name -->
        <div v-if="$route.fullPath == '/registro' && appComponent.config.name == 'Lotosports'"
            class="absolute -bottom-1 w-full h-96 bg-gradient-to-t from-neutral-content z-1"></div>
        <!-- Loading state div with dynamic classes and styles -->
        <div v-if="loading" :class="{
            'card col-span-1 row-span-3 xl:col-span-2 w-75 p-1': styleWidth == false && backgroundForm === '',
            'rounded-none': !styleWidth && !windowFrame,
            'shadow-lg rounded-xl': backgroundForm == undefined || backgroundForm == '',
            'shadow-lg rounded-xl bg-neutral 22': backgroundForm == 'neutral',
            'py-10 relative bg-center bg-base-400': backgroundForm !== '',
            'rounded-b-xl rounded-t-none': config.layout != undefined && config.layout == 3,
        }" :style="{
            backgroundImage: 'url(' + backgroundForm + ')',
            backgroundSize: backgroundSize == '' || backgroundSize == undefined ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
        }">
            <!-- Card body with conditional classes based on styleWidth and img -->
            <div :class="{
                'card-body p-0 lg:p-5': styleWidth == false,
                'flex flex-col md:flex-row-reverse items-center md:items-start justify-center gap-4': img != '',
            }">
                <!-- Image display based on conditions -->
                <div v-if="img != '' || img2 != '' && $route.path.indexOf('registro')"
                    class="flex items-center justify-center">
                    <img :src="appComponent.mobile == '' ? img : img2" alt="img-landing"
                        class="max-h-[50vh] sm:max-h-[70vh]" />
                </div>
                <!-- Title display based on conditions -->
                <h2 v-if="styleWidth == false && !shortRegister && config.layout != 3 && img == undefined"
                    class="my-4 m-auto text-2xl font-bold card-title text-center text-secondary" v-html="title"></h2>
                <!-- Title display for different layout styles -->
                <div v-if="styleWidth == true" class="justify-center items-center text-center" :class="config.layout != undefined && config.layout == 3
                    ? 'text-neutral'
                    : config.layout != undefined &&
                        config.layout == 7 &&
                        appComponent.modal.showModal == 'register'
                        ? 'text-primary-content text-2xl pt-2 bg-neutral uppercase font-poppinssb'
                        : config.partner == 22 ? 'text-neutral' : 'text-neutral-content'
                    " v-html="title"></div>
                <!-- Form wrapper with dynamic classes -->
                <div :class="[
                    { 'form-wrapper': styleWidth == false, ' ': img != '' && img2 != '' },
                    {
                        'mx-auto max-w-[700px]':
                            config.layout != undefined && config.layout == 3 && $route.fullPath == '/registro',
                    },
                    {
                        'mx-auto max-w-[1000px] min-w-[95%] md:min-w-[700px]':
                            config.layout != undefined && config.layout == 3 && $route.fullPath !== '/registro',
                    },
                ]">
                    <!-- Short register title display -->
                    <div v-if="
                        shortRegister &&
                        (config.layout == undefined ||
                            (config.layout != undefined && config.layout != 5 && config.layout != 7))
                    "
                        class="bg-base-300 w-full mx-auto text-center text-2xl rounded-t-xl py-2 font-poppinsm text-neutral"
                        :class="[
                        { 'lg:w-11/12 max-w-3xl ': config.layout == undefined || config.layout != 3 },
                        { 'w-11/12': config.layout != undefined && config.layout == 3 },
                    ]">
                        {{ $t('Registro') }}
                    </div>
                    <!-- Short register message for specific layout -->
                    <p v-if="
                        shortRegister &&
                        config.layout != undefined &&
                        config.layout == 5 &&
                        $route.fullPath == '/registro'
                    " class="mx-auto w-full text-center font-poppinssb text-success text-3xl mb-4">
                        {{ $t('Registro') }}
                    </p>
                    <!-- Title display based on conditions -->
                    <h2 v-if="styleWidth == false && !shortRegister && config.layout != 3"
                        class="p-4 m-auto text-2xl font-bold card-title text-neutral justify-center bg-base-300 rounded-t-xl lg:w-11/12 max-w-3xl"
                        v-html="title"></h2>
                    <!-- Form component with validation and dynamic classes -->
                    <Form :key="formKey" @submit="onSubmit" @invalid-submit="onInvalidSubmit"
                        :validation-schema="schema" v-slot="{ errors }" :class="[
                            {
                                'lg:w-11/12 max-w-3xl':
                                    styleWidth == false && (config.layout == undefined || config.layout != 3),
                            },
                            {
                                'w-11/12': config.layout != undefined && config.layout == 3,
                                ' border-solid border-1 border-neutral/60 rounded-xl shadow-[0px_0px_20px_9px] shadow-neutral-content/30':
                                    config.layout != undefined && config.layout == 5 && $route.fullPath == '/registro',
                            },
                        ]" class="msform w-full mx-auto" ref="myForm">
                        <!-- Conditional display for short register layout -->
                        <div v-if="
                            shortRegister &&
                            config.layout != undefined &&
                            config.layout == 5 &&
                            $route.fullPath == '/registro'
                        " class="w-full">
                            <div
                                class="bg-secondary w-full text-center text-2xl rounded-t-xl py-2 font-poppinsm flex justify-center items-center h-[21rem] relative overflow-hidden">
                                <img :src="banner" alt="" class="absolute top-0 left-0 object-fill w-full h-full" />
                            </div>
                        </div>
                        <!-- Title for specific layout -->
                        <h2 v-if="
                            styleWidth == false &&
                            !shortRegister &&
                            config.layout != undefined &&
                            config.layout == 3
                        " class="text-2xl font-bold text-center text-neutral bg-base-100 h-full w-full rounded-t-xl py-4"
                            v-html="title"></h2>
                        <!-- Fieldset for form elements with dynamic classes -->
                        <fieldset :class="{
                            '':
                                styleWidth == false && shortRegister == false && config.layout != 3,
                            'rounded-b-xl':
                                styleWidth == false &&
                                shortRegister == false &&
                                config.layout != undefined &&
                                config.layout == 3,
                            'rounded-t-none': shortRegister && config.layout != 3 && config.layout != 5,
                            'bg-primary rounded-xl':
                                shortRegister &&
                                config.layout != undefined &&
                                config.layout == 5 &&
                                $route.fullPath == '/registro',
                            'rounded-t-none rounded-b-xl':
                                shortRegister && config.layout != undefined && config.layout == 3,
                        }" class="text-neutral-content p-5 bg-base-400" :style="{
                            'background-color':
                                config.registro !== undefined &&
                                    config.registro['backgroundForm'] !== undefined &&
                                    config.layout == 3 &&
                                    shortRegister
                                    ? config.registro['backgroundForm']
                                    : 'transparent',
                            'box-shadow':
                                config.registro !== undefined &&
                                    config.registro['backgroundForm'] !== undefined &&
                                    config.layout == 3 &&
                                    shortRegister
                                    ? '0px 0px 10px 0px rgba(0,0,0,0.75)'
                                    : 'none',
                        }">
                            <!-- Currency field with dynamic label -->
                            <div v-if="config.layout != undefined"
                                :class="textUp == undefined || textUp == '' ? 'mb-1' : 'mb-9'"
                                class="FormItem fldCurrency" id="fldCurrency">
                                <label class="FormLabel div-inline-block text-neutral" for="selectCurrency"
                                    v-html="textUp"></label>
                            </div>
                            <!-- Grid for form fields -->
                            <div id="" class="pb-3 grid md:grid-cols-2 w-full" :class="[
                                twoColumnsMobile ? 'grid-cols-2' : 'grid-cols-1',
                                { 'gap-6': !shortRegister, 'gap-3': shortRegister },
                            ]">
                                <!-- Dynamic form controls based on fields array -->
                                <div v-for="item in fields" class="form-control px-2" :class="[
                                    { 'md:col-span-2': item.widthFull },
                                    { hidden: item.page != undefined && item.page != page },
                                ]">
                                    <div class="form-col w-[100%]">
                                        <!-- Title for form control -->
                                        <div v-if="item.type != 'checkbox' && item.type != 'button'"
                                            class="form-col-title ng-binding flex justify-between">
                                            <span v-if="!shortRegister" v-html="$t(item.label)" :class="config.layout != undefined && config.layout == 3
                                                ? 'text-neutral'
                                                : config.layout != undefined &&
                                                    config.layout == 5 &&
                                                    $route.fullPath == '/registro'
                                                    ? 'text-neutral font-poppinssl'
                                                    : config.partner == 2 || config.partner == 16 ? 'text-neutral' : 'text-neutral'
                                                " ref="contentRefs" :style="{
                                                    color:
                                                        fontColorForm != undefined && fontColorForm != ''
                                                            ? fontColorForm
                                                            : '#000000',
                                                }"></span>
                                            <span v-if="vRequired(item) && !shortRegister" class="text-red-500">*</span>
                                        </div>
                                        <!-- Form control content -->
                                        <div class="form-col-content div-input relative" :class="item.type == 'radio'
                                            ? item.colCheckbox != undefined && item.colCheckbox
                                                ? 'grid grid-cols-1 gap-y-4 mt-4'
                                                : item.style != undefined && item.style == 2
                                                    ? 'flex flex-row justify-around h-auto flex-wrap'
                                                    : 'grid grid-cols-2'
                                            : ''
                                            ">
                                            <label v-if="
                                                item.type == 'text' ||
                                                item.type == 'textsearch' ||
                                                item.type == 'phonesearch' ||
                                                item.type == 'password' ||
                                                item.type == 'number' ||
                                                item.type == 'date' ||
                                                item.type == 'file' ||
                                                item.type == 'textarea'
                                            ">
                                                <span class="absolute top-3 pl-3" v-if="item.icon != undefined" :class="[
                                                    item.iconbg != undefined ? item.iconbg : '',
                                                    {
                                                        'text-accent-focus':
                                                            item.iconbg == undefined && !shortRegister,
                                                        'absolute top-3 pl-3': shortRegister,
                                                        'text-accent-focus':
                                                            shortRegister &&
                                                            (config.layout == undefined ||
                                                                (config.layout != undefined && config.layout != 5)),
                                                        'text-accent-focus':
                                                            shortRegister &&
                                                            config.layout != undefined &&
                                                            config.layout == 5 &&
                                                            $route.fullPath == '/registro',
                                                    },
                                                ]"><font-awesome-icon :icon="item.icon"
                                                        class="text-accent-focus" /></span>
                                                <!-- Input fields based on type -->
                                                <Field v-if="
                                                    item.type == 'text' ||
                                                    item.type == 'password' ||
                                                    item.type == 'number' ||
                                                    item.type == 'date'
                                                " autocomplete="new-password" @blur="blurField(item, $event)"
                                                    @input="changeField(item, $event)" class="descripcion w-full border-input-border bg-input-background rounded-md h-12 rounded-r-md placeholder-input-placeholder
                                                " :id="item.name" :min="minDate" :max="maxDate" :name="item.name"
                                                    :placeholder="$t(item.placeholder)" :class="[
                                                        config.partner == 2 || config.partner == 16 ? 'text-neutral' : 'text-neutral',
                                                        item.icon ? 'pl-9 rounded-r-md' : 'rounded-md',
                                                        $route.fullPath == '/registro' ? 'rounded-md' : '',
                                                        {
                                                            ' border-solid border-neutral-content/40 border-2':
                                                                config.layout != undefined &&
                                                                config.layout == 7 &&
                                                                appComponent.modal.showModal == 'register',
                                                        },
                                                        config.layout != undefined &&
                                                            config.layout == 5 &&
                                                            $route.fullPath == '/registro'
                                                            ? 'bg-base-300 placeholder:text-secondary font-poppinssl rounded-xl border-secondary'
                                                            : '',
                                                        { inptDate: item.type == 'date' },
                                                        {
                                                            'border-success border':
                                                                errors[item.name] === undefined &&
                                                                modelForm[item.name] !== undefined &&
                                                                modelForm[item.name] !== '' &&
                                                                modelForm[item.name] !== null
                                                        },
                                                        {
                                                            'border-error border':
                                                                errors[item.name] !== undefined
                                                        },
                                                        {
                                                            uppercase:
                                                                item.type === 'text' &&
                                                                item.upperCase != undefined &&
                                                                item.upperCase === true,
                                                        },
                                                    ]" :disabled="item.disabled" :type="item.type"
                                                    v-model="modelForm[item.name]"
                                                    v-bind="analyticsAttrs(`auth:register:field:${toKebabCase(item.name)}`)" />
                                                <!-- Show password button -->
                                                <button v-if="item.type == 'password'" type="button"
                                                    class="absolute top-3 right-1 mr-4" id="showpass"
                                                    @click="showpass(item.name)">
                                                    <font-awesome-icon class="text-xl text-accent-focus"
                                                        icon="fa-solid fa-eye" />
                                                </button>
                                                <!-- Search input fields -->
                                                <Field v-if="item.type == 'textsearch' || item.type == 'phonesearch'"
                                                    autocomplete="new-password" @blur="blurField(item, $event)"
                                                    @input="changeField(item, $event)"
                                                    class="descripcion border-input-border bg-input-background rounded-md h-12 w-full placeholder-input-placeholder text-neutral"
                                                    :id="item.name" :name="item.name"
                                                    :placeholder="$t(item.placeholder)" :class="[
                                                        { 'pl-9': shortRegister },
                                                        { inptDate: item.type == 'date' },
                                                        config.layout != undefined &&
                                                            config.layout == 5 &&
                                                            $route.fullPath == '/registro'
                                                            ? 'bg-base-300 border-secondary font-poppinssl placeholder:text-secondary'
                                                            : '',
                                                    ]" :disabled="item.disabled" :type="'string'"
                                                    v-model="modelForm[item.name]"
                                                    v-bind="analyticsAttrs(`auth:register:field:${toKebabCase(item.name)}`)" />
                                                <!-- Validation button for search inputs -->
                                                <a v-if="item.type == 'textsearch' || item.type == 'phonesearch'"
                                                    @click="
                                                        () => {
                                                            if (!appComponent.disableOthersButtons) {
                                                                onClicEventDocNumber(item);
                                                            }
                                                        }
                                                    " id="ok-data"
                                                    class="btn btn-sm h-[42px] rounded-md p-2 flex absolute top-0 right-0 border-none bg-secondary text-neutral tooltip"
                                                    :class="[
                                                        {
                                                            'tooltip-open':
                                                                errors[item.name] == undefined &&
                                                                modelForm[item.name] != undefined &&
                                                                (modelForm['birth_date'] == undefined ||
                                                                    modelForm['birth_date'] == ''),
                                                        },
                                                    ]" :data-tip="item.type == 'textsearch'
                                                        ? $t('Clic en OK para validar CPF')
                                                        : item.type == 'phonesearch'
                                                            ? $t('Click aqui para validar')
                                                            : ''
                                                        "><span class="bg-secondary">OK</span></a>
                                                <!-- File input field -->
                                                <Field v-if="item.type == 'file'"
                                                    class="descripcion border-input-border bg-input-background rounded-md h-12 w-full placeholder-input-placeholder text-neutral"
                                                    :class="[
                                                        { 'pl-9': shortRegister },
                                                        { inptDate: item.type == 'date' }
                                                    ]" accept=".png,.jpg,jpeg" :id="item.name" :name="item.name"
                                                    :placeholder="$t(item.placeholder)" :disabled="item.disabled"
                                                    :type="item.type" v-model="modelForm[item.name]"
                                                    @change="initFile($event)"
                                                    v-bind="analyticsAttrs(`auth:register:field:${toKebabCase(item.name)}`)" />
                                                <!-- Textarea input field -->
                                                <Field v-if="item.type == 'textarea'"
                                                    class="descripcion overflow-auto border-input-border bg-input-background rounded-md w-full min-h-12 h-36 max-h-96 placeholder-input-placeholder text-neutral"
                                                    as="textarea" :id="item.name" :name="item.name"
                                                    :placeholder="$t(item.placeholder)" :disabled="item.disabled"
                                                    v-model="modelForm[item.name]"
                                                    v-bind="analyticsAttrs(`auth:register:field:${toKebabCase(item.name)}`)" />
                                            </label>
                                            <!-- Select input for country resident -->
                                            <div v-if="
                                                item.type == 'select' &&
                                                item.name == 'countryResident_id' &&
                                                arraySelects['countryResidentList']
                                            " tabindex="0" :class="{ 'bg-transparent': shortRegister }"
                                                class="mb-[1rem] mr-5 btn btn-sm h-[40px] rounded-md p-2 flex absolute top-px left-px border-none bg-base-400">
                                                <span id="selected-option" :class="'country-flags ' +
                                                    arraySelects['countryResidentList']
                                                        .filter((x) => x.Id == modelForm['countryResident_id'])
                                                        .map((x) => x.Iso)[0]
                                                    "></span>
                                            </div>
                                            <!-- Select input field -->
                                            <Field as="select" :value="item.valueDefault" v-if="item.type == 'select'"
                                                :class="[
                                                    item.type == 'select' && item.name == 'countryResident_id'
                                                        ? 'descripcion pl-10 max-w-[100%] w-[100%] border-input-border bg-input-background rounded-md h-12 placeholder-input-placeholder'
                                                        : 'descripcion max-w-[100%] w-[100%] border-input-border bg-input-background rounded-md h-12 placeholder-input-placeholder text-neutral',
                                                    {
                                                        ' border-solid border-neutral-content/40 border-2':
                                                            config.layout != undefined &&
                                                            config.layout == 7 &&
                                                            appComponent.modal.showModal == 'register',
                                                    },
                                                    {
                                                        'border-success border':
                                                            errors[item.name] === undefined &&
                                                            modelForm[item.name] !== undefined &&
                                                            modelForm[item.name] !== '' &&
                                                            modelForm[item.name] !== null
                                                    },
                                                    {
                                                        'border-error border':
                                                            errors[item.name] !== undefined
                                                    },
                                                    config.layout != undefined &&
                                                        config.layout == 3
                                                        ? 'text-neutral'
                                                        : config.partner == 2 || config.partner == 16 ? 'text-neutral' : 'text-neutral'
                                                ]" :id="item.name" :name="item.name" v-model="modelForm[item.name]"
                                                :disabled="item.disabled"
                                                @change="changeSelect($event, item.optionsKey)"
                                                v-bind="analyticsAttrs(`auth:register:field:${toKebabCase(item.name)}`)"
                                                >
                                                <option value="">{{ $t(item.placeholder) }}</option>
                                                <option v-for="option in getArraySelects(item.optionsKey)"
                                                    :value="option.value">
                                                    {{ $t(option.name) }}
                                                </option>
                                            </Field>
                                            <!-- Button input for registration -->
                                            <button v-if="item.type == 'button'" @click="
                                                textButton == 'Regístrate'
                                                    ? appComponent.gAnalytics('register')
                                                    : ''
                                                "
                                                v-bind="analyticsAttrs(`auth:register:submit`,undefined,`step:submit|step-num:2|component:Form|layout:layout-${appComponent.config.layout}`, undefined)"
                                                class="m-9 y-4 cursor-pointer w-11/12 btn btn-primary w-52 rounded-xl"
                                                v-show="!appComponent.disabledButtonForm"
                                                :class="{ 'btn btn-primary w-52 rounded-xl': shortRegister }">
                                                <input type="submit" class="submit text-neutral-content"
                                                    :value="lastPage ? registerButtonText : $t('Siguiente')" :class="config.layout == 3 &&
                                                        config.layout != undefined &&
                                                        shortRegister == false
                                                        ? 'bg-success w-auto h-14 rounded-lg px-8 hover:bg-success/75 hover:scale-105'
                                                        : shortRegister == false
                                                            ? 'btn btn-primary'
                                                            : ''
                                                        " />
                                                <IconChevronRight v-if="shortRegister"
                                                    class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                                                    :width="15" :height="15" />
                                            </button>
                                            <!-- Radio button group -->
                                            <div v-if="item.type == 'radio' && item.style == 2"
                                                v-for="(option,index) in item.options" class="flex flex-row gap-1 mt-2 md:mt-8">
                                                <div
                                                    class="relative w-[150px] h-[50px] flex justify-center items-center group mx-1">
                                                    <Field :id="item.name" :name="item.name" v-bind:value="option.value"
                                                        :type="option.type" v-model="modelForm[item.name]"
                                                        :disabled="item.disabled"
                                                        class="absolute top-0 left-0 w-[150px] h-[50px] cursor-pointer opacity-0 peer"
                                                        @change="changeFieldRadio(item, $event)"
                                                        v-bind="
                                                            analyticsAttrs(
                                                                `auth:register:${item.name === 'type_gift' ? 'bonus' : 'field'}:${toKebabCase(item.name === 'type_gift' ? option.title : item.name)}`,
                                                                (index as number) + 1,undefined,
                                                                item.name === 'type_gift' ? `bonus-type:${
                                                                    option.title.includes('casino')
                                                                        ? 'casino'
                                                                        : option.title.includes('deportivas')
                                                                        ? 'sports'
                                                                        : 'none'
                                                                }` : undefined ,
                                                            )
                                                        "/>
                                                    <div
                                                        class="flex justify-center items-center peer-checked:bg-success group-hover:bg-base-300 transition-all ease-in-out peer-checked:shadow-[inset_0px_-6px_2px_#00000070] w-full bg-accent peer-checked:border-primary rounded-full h-full border-neutral border-1 border-solid">
                                                        <p class="font-poppinssl leading-5 text-sm px-1 text-neutral">
                                                            {{ option.title }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Radio button without style -->
                                            <div v-else-if="item.type == 'radio'" v-for="(option, index) in item.options"
                                                :class="{ 'flex gap-2': option.icon != undefined }">
                                                <div
                                                    class="relative w-[25px] h-[25px] flex justify-center items-center">
                                                    <div v-if="modelForm[item.name] == option.value"
                                                        class="absolute animate-ping w-full h-full bg-success rounded-full z-1">
                                                    </div>
                                                    <Field :id="item.name" :name="item.name" v-bind:value="option.value"
                                                        :type="option.type" v-model="modelForm[item.name]"
                                                        :disabled="item.disabled"
                                                        class="radio flex justify-center items-center z-10 border-2 border-primary"
                                                        :class="{
                                                            ' border-solid border-neutral-content/40 border-2':
                                                                config.layout != undefined &&
                                                                config.layout == 7 &&
                                                                appComponent.modal.showModal == 'register',
                                                        }" 
                                                        @change="changeFieldRadio(item, $event)"
                                                        v-bind="
                                                            analyticsAttrs(
                                                                `auth:register:${item.name === 'type_gift' ? 'bonus' : 'field'}:${toKebabCase(item.name === 'type_gift' ? option.title : item.name)}`,
                                                                (index as number) + 1,undefined,
                                                                item.name === 'type_gift' ? `bonus-type:${
                                                                    option.title.includes('casino')
                                                                        ? 'casino'
                                                                        : option.title.includes('deportivas')
                                                                        ? 'sports'
                                                                        : 'none'
                                                                }` : undefined ,
                                                            )
                                                        "/>
                                                </div>
                                                <div class="flex justify-center items-center" :class="option.icon != undefined &&
                                                    !option.icon.includes('https') &&
                                                    option.icon != ''
                                                    ? 'flex-col'
                                                    : 'gap-2'
                                                    ">
                                                    <font-awesome-icon v-if="
                                                        option.icon != undefined && !option.icon.includes('https')
                                                    " size="2x" :icon="option.icon" class="text-neutral" />
                                                    <img v-else-if="option.icon != undefined && option.icon != ''"
                                                        :src="option.icon" alt="" class="w-[20px] aspect-square" />
                                                    <span v-html="$t(option.title)" class="text-neutral"></span>
                                                </div>
                                            </div>
                                            <!-- Checkbox input -->
                                            <div v-if="item.type == 'checkbox'" class="flex gap-x-3 mt-4">
                                                <label v-if="item.style != undefined && item.style == 2" :data-tip="item?.hoverText != undefined && item?.hoverText != ''
                                                    ? item?.hoverText
                                                    : ''
                                                    " :class="item?.hoverText != undefined && item?.hoverText != ''
                                                        ? 'tooltip style-v2 tooltip-right'
                                                        : ''
                                                        "
                                                    class="relative w-[37px] min-w-[37px] max-w-[37px] h-[21px] bg-accent rounded-full border-1 border-solid border-neutral cursor-pointer">
                                                    <Field @click="
                                                        item.name == 'acepta_terminos'
                                                            ? appComponent.gAnalytics('checkbox_older')
                                                            : item.name == 'offerRegister'
                                                                ? appComponent.gAnalytics('checkbox_send')
                                                                : ''
                                                        " :id="item.name" :name="item.name" type="checkbox"
                                                        value="true" v-model="modelForm[item.name]"
                                                        class="opacity-0 absolute top-0 left-0 peer"
                                                        v-bind="analyticsAttrs(`auth:register:consent:${toKebabCase(item.name)}`)" />
                                                    <span
                                                        class="flex justify-center items-center absolute top-[-1px] right-[-2px] w-[21px] h-[21px] bg-gradient-to-b from-red-600 to-neutral-content/80 bg-error rounded-full peer-checked:bg-success peer-checked:from-success peer-checked:to-neutral-content/80 peer-checked:-translate-x-5 transition-all ease-in-out">
                                                        <IconCheck v-if="modelForm[item.name]"
                                                            class="fill-neutral w-3 text-center left-[4px]"></IconCheck>
                                                        <IconClose v-else class="fill-neutral" :width="14" :height="14"
                                                            fill="white"></IconClose>
                                                    </span>
                                                </label>
                                                <label v-else-if="item.style != undefined && item.style == 3" :data-tip="item?.hoverText != undefined && item?.hoverText != ''
                                                    ? item?.hoverText
                                                    : ''
                                                    " :class="item?.hoverText != undefined && item?.hoverText != ''
                                                        ? 'tooltip style-v2 tooltip-right'
                                                        : ''
                                                        "
                                                    class="bg-base-300 w-6 h-6 min-w-[21px] rounded-md border-1 border-solid border-neutral relative">
                                                    <Field @click="
                                                        item.name == 'acepta_terminos'
                                                            ? appComponent.gAnalytics('checkbox_older')
                                                            : item.name == 'offerRegister'
                                                                ? appComponent.gAnalytics('checkbox_send')
                                                                : ''
                                                        " class="opacity-0 absolute top-0 left-0 peer" :id="item.name"
                                                        :name="item.name" type="checkbox" value="true"
                                                        v-model="modelForm[item.name]"
                                                        v-bind="analyticsAttrs(`auth:register:consent:${toKebabCase(item.name)}`)" />
                                                    <span
                                                        class="peer-checked:opacity-100 opacity-0 bg-success rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-1 w-3/5 h-3/5"></span>
                                                </label>
                                                <Field v-else :data-tip="item?.hoverText != undefined && item?.hoverText != ''
                                                    ? item?.hoverText
                                                    : ''
                                                    " :class="[
                                                        config.partner != 2 ? 'border-neutral' : 'border-black',
                                                        item?.hoverText != undefined && item?.hoverText != ''
                                                            ? 'tooltip style-v2 tooltip-right'
                                                            : '',
                                                        {
                                                            ' border-solid border-neutral-content/40 border-2':
                                                                config.layout != undefined && config.layout == 7,
                                                        },
                                                    ]" @click="
                                                        item.name == 'acepta_terminos'
                                                            ? appComponent.gAnalytics('checkbox_older')
                                                            : item.name == 'offerRegister'
                                                                ? appComponent.gAnalytics('checkbox_send')
                                                                : ''
                                                        " class="checkbox border-1 border-solid" :id="item.name"
                                                    :name="item.name" type="checkbox" value="true"
                                                    v-model="modelForm[item.name]"
                                                    v-bind="analyticsAttrs(`auth:register:consent:${toKebabCase(item.name)}`)" />
                                                <span v-html="$t(item.label)" ref="contentRefs" :class="config.layout != undefined && config.layout == 5 && $route.fullPath == '/registro'
                                                    ? 'font-poppinssl'
                                                    : config.partner != 2 ? 'text-neutral' : 'text-neutral'
                                                    " :style="{
                                                        color:
                                                            fontColorForm != undefined && fontColorForm != '' && !ligthMode
                                                                ? fontColorForm
                                                                : fontColorFormLight != undefined && fontColorFormLight != '' && ligthMode
                                                                    ? fontColorFormLight
                                                                    : !ligthMode
                                                                        ? '#ffffff'
                                                                        : '#000000'
                                                    }"></span>
                                            </div>
                                            <!-- Validation labels for form controls -->
                                            <label v-if="
                                                checkVersion == 2 &&
                                                errors[item.name] == undefined &&
                                                modelForm[item.name] != undefined &&
                                                !item.disabled &&
                                                item.type != 'textsearch' &&
                                                item.type != 'phonesearch' &&
                                                item.type != 'checkbox'
                                            " :for="item.name" generated="true">
                                                <font-awesome-icon
                                                    class="bg-primary w-3 h-3 rounded-full p-1 absolute -top-2 -right-2 text-neutral"
                                                    icon="fa-solid fa-check" />
                                            </label>
                                            <!-- Error alert for form controls -->
                                            <div class="alert alert-error p-1 bg-red-500/10 text-red-500 shadow-lg rounded-t-lg"
                                                :class="{ 'col-span-2': item.type == 'radio' }" v-if="
                                                    errors[item.name] != undefined &&
                                                    clearError &&
                                                    item.type != 'button'
                                                ">
                                                <div class="flex-1 px-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" class="w-5 h-5 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                                        </path>
                                                    </svg>
                                                    <label class="text-sm" v-t>{{ errors[item.name] }}</label>
                                                </div>
                                            </div>
                                            <!-- Countdown for phone search -->
                                            <div v-if="appComponent.disabledOtherCount && item.type == 'phonesearch'"
                                                class="text-secondary pt-5">
                                                {{ $t('Intente de nuevo en: ') }}
                                                <vue-countdown v-if="appComponent.disabledOtherCount"
                                                    :time="appComponent.otherCount" :interval="100"
                                                    v-slot="{ minutes, seconds }"
                                                    class="text-secondary font-poppinsm text-base md:text-lg text-center z-1">
                                                    {{ minutes }} : {{ seconds }}
                                                </vue-countdown>
                                                {{ $t(' segundos.') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Recaptcha for form submission -->
                            <div v-if="recaptcha" id="g-recaptcha" :data-sitekey="config.captchaKey"
                                class="g-recaptcha mt-9 w-40 mx-auto"
                                :class="recaptcha ? 'flex justify-center items-center' : ''"></div>
                            <!-- Navigation button for previous page -->
                            <a class="my-9 mr-1 btn btn-primary text-neutral w-[70px]" @click="
                                page--;
                            lastPage = false;
                            " v-if="page > 1">
                                {{ $t('Antes') }}
                            </a>
                            <!-- Submit button for form -->
                            <button v-if="fields.findIndex((item) => item.type == 'button') < 0"
                                @click="textButton == 'Regístrate' ? appComponent.gAnalytics('register') : ''"
                                v-bind="analyticsAttrs(`auth:register:submit`,undefined,`step:submit|step-num:2|component:Form|layout:layout-${appComponent.config.layout}`,undefined)"
                                class="m-4 md:m-9 cursor-pointer" v-show="!appComponent.disabledButtonForm" :class="[
                                    {
                                        'button-submit ':
                                            (shortRegister && config.layout == undefined) || config.layout != 3,
                                    },
                                    config.layout != undefined && config.layout == 5 && $route.fullPath == '/registro'
                                        ? 'bg-neutral-content bg-gradient-to-b from-success to-success/70 px-10 py-5 rounded-md shadow-[inset_0px_-5px_0px] shadow-neutral-content/40 hover:brightness-90'
                                        : config.layout != undefined &&
                                            config.layout == 7 &&
                                            appComponent.modal.showModal == 'register'
                                            ? 'py-7 bg-primary w-52 border-0 rounded-full uppercase drop-shadow-[2px_5px_6px_#0000007d] shadow-[inset_0px_0px_0px_4px_#00000021] hover:scale-105 transition-all ease-in-out'
                                            : 'btn btn-primary w-52 rounded-xl',
                                ]">
                                <input type="submit" class="cursor-pointer submit" :class="config.layout != undefined &&
                                    config.layout == 5 &&
                                    $route.fullPath == '/registro'
                                    ? 'text-neutral-content font-poppinssb'
                                    : config.layout != undefined &&
                                        config.layout == 7 &&
                                        appComponent.modal.showModal == 'register'
                                        ? 'uppercase text-neutral drop-shadow-[2px_5px_6px_#0000007d]'
                                        : 'text-neutral'
                                    " :value="lastPage ? $t(textButton) : $t('Siguiente')" />
                                <IconChevronRight v-if="
                                    shortRegister &&
                                    (config.layout == undefined || (config.layout != 5 && config.layout != 7))
                                " class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                                    :fill="'white'" :width="15" :height="15" />
                            </button>
                            <!-- Countdown for disabled state -->
                            <div v-if="appComponent.disabledCount" class="text-secondary pt-5">
                                {{ $t('Intente de nuevo en: ') }}
                                <vue-countdown v-if="appComponent.disabledCount" :time="appComponent.count"
                                    :interval="100" v-slot="{ seconds }"
                                    class="text-secondary font-poppinsm text-base md:text-lg text-center z-1">
                                    {{ seconds }}
                                </vue-countdown>
                                {{ $t(' segundos.') }}
                            </div>
                            <!-- Disabled button state -->
                            <button disabled class="my-9 flex justify-center items-center mx-auto"
                                v-if="appComponent.disabledButtonForm" :class="[
                                    {
                                        'button-submit bg-gradient-to-r from-[#5d5d5d] via-secondary to-[#5d5d5d] bg-[length:200%_100%] w-full rounded-full transition-all ease-in-out duration-700 h-[55px] btn-shadow':
                                            shortRegister,
                                    },
                                    {
                                        'bg-success w-52 rounded-xl hover:bg-success/75 hover:scale-105':
                                            config.layout == 3 && config.layout != undefined && shortRegister == false,
                                    },
                                    { 'btn btn-primary': shortRegister == false },
                                ]">
                                <svg aria-hidden="true" role="status" class="w-4 h-4 mr-3 text-neutral animate-spin"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                <input type="submit" class="submit text-neutral"
                                    :value="lastPage ? $t(textButton) : $t('Siguiente')" />
                                <IconChevronRight v-if="shortRegister"
                                    class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                                    :fill="'white'" :width="15" :height="15" />
                            </button>
                            <!-- Step indicator for registration -->
                            <div id="text-paso" v-if="
                                config.registro != undefined &&
                                config.registro.steps != undefined &&
                                config.registro.steps[appComponent.country] != undefined
                            " class="text-neutral">
                                {{ page }} {{ $t('de') }} {{ config.registro.steps[appComponent.country] }}
                            </div>
                            <!-- Google login button -->
                            <GoogleLogin v-if="loginGoogle" :callback="signInWithGoogle" prompt
                                class="w-full mt-8 flex justify-center items-center"
                                v-bind="analyticsAttrs(`auth:register:google-login`)"
                                @click="appComponent.gAnalytics('login_google')" />
                            <!-- Facebook login button -->
                            <div v-if="loginFacebook" class="flex items-center justify-center">
                                <facebook-login :appId="clientId" @loggedIn="signInWithFacebook"
                                    @loginFailed="signInWithFacebookFailed" :type="'custom'"
                                    :text="$t('Iniciar sesión con Facebook')"
                                    :class="'w-auto bg-neutral border-[1px] transition-all ease-in-out border-solid border-[#dadce0] px-[12px] h-[40px] mt-4 text-gray-600 rounded-md hover:bg-blue-50/30 font-medium'"></facebook-login>
                            </div>
                            <div class="row">
                                <!-- Additional text display for last page -->
                                <div v-if="textDown != '' && lastPage" class="col-12 text-justify p-4">
                                    <span v-html="textDown" :class="config.layout != undefined &&
                                        config.layout == 5 &&
                                        $route.fullPath == '/registro'
                                        ? 'text-neutral font-poppinssl'
                                        : config.partner != 2 ? 'text-neutral' : 'text-neutral'
                                        "></span>
                                </div>
                            </div>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <!-- Loading state div -->
    <div v-if="!loading" class="flex w-full h-screen items-center shadow-lg rounded-3xl bg-neutral rounded-r-3xl">
        <div class="flex-1"></div>
        <div class="flex flex-col w-12/12">
            <svg fill="none" class="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor" fill-rule="evenodd" />
            </svg>
        </div>
        <div class="flex-1"></div>
    </div>
    <!-- Modal for additional content -->
    <div class="modal z-50" v-if="showModal">
        <div class="container-general w-4/5 h-[600px] md:w-[80%] flex flex-col justify-center items-center">
            <div class="bg-base-300 container-img-text w-full overflow-y-auto containar p-5 pt-8 rounded-3xl relative">
                <div class="promotion-image w-full shadow-md relative">
                    <!-- Close button for modal -->
                    <label v-if="config.layout != 3" @click="closeModal"
                        class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs -top-7 -right-2 shadow-lg text-neutral transition ease-in-out hover:scale-105 z-1">✕</label>
                    <label v-if="config.layout != undefined && config.layout == 3" @click="closeModal"
                        class="absolute text-xs -top-6 -right-3 hover:scale-105 z-1 cursor-pointer">
                        <ExitIcon :height="23" :width="23" :fill="'#ffffff'" :fill2="'#ee3b3f'" />
                    </label>
                </div>
                <!-- Content area for modal -->
                <div id="popUpRegister" class="w-full h-[80vh] overflow-auto text-neutral-content" :style="[
                    { borderRadius: config.layout != undefined && config.layout == 3 ? '10px' : '0px' },
                    { marginTop: config.layout != undefined && config.layout == 3 ? '8px' : '0px' },
                ]">
                    <div class="Framework InfoPage">
                        <div class="Container ActivePageTitle">
                            <span class="h1">
                                <span class="font-bold text-3xl text-base-300">{{ $t(titleTyC) }}</span>
                            </span>
                        </div>
                        <CollapsibleCards :data="TERMINOSYCONDICIONES" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:global(.modal-mincetur h3) {
    padding-right: 60px !important;
}

/* Style for date input placeholder */
input[type='date']::before {
    color: hsl(var(--ip));
    /* Placeholder text color */
    position: absolute;
    /* Positioning for the placeholder */
    background-color: hsl(var(--ib));
    /* Background color using CSS variable */
    overflow: hidden;
    /* Hide overflow content */
    width: 65%;
    /* Width of the placeholder */
    text-overflow: clip;
    /* Clip text overflow */
    neutral-space: nowrap;
    /* Prevent text wrapping */
    overflow-wrap: break-word;
    /* Allow breaking of words */
}

/* Remove placeholder content on focus or when checked */
input[type='date']:focus::before,
input[type='date'].check::before {
    content: '' !important;
    /* Force empty content */
}

.input {
    background-color: hsl(var(--n)) !important;
}

/* Style for the calendar picker indicator in date input */
.inptDate::-webkit-calendar-picker-indicator {
    border-radius: 2px;
    /* Rounded corners for the indicator */
}

/* Styles for input group elements */
.input-group>*,
.input-group>.input,
.input-group>.textarea,
.input-group>.select {
    border-radius: 5px;
    /* Rounded corners for input group elements */
}

/* Button shadow effect */
.btn-shadow {
    box-shadow:
        inset 0px -2px 4px 0px #00000026,
        /* Inner shadow */
        inset 0px 4px 4px 0px #ffffff45;
    /* Inner highlight */
    font-family: Poppins-Medium !important;
    /* Font family for button */
}

/* Hover effect for submit button */
.button-submit:hover {
    background-position: 100% 0;
    /* Change background position on hover */
}

/* Move button icon on hover */
.button-submit:hover .button-icon {
    transform: translateX(10px);
    /* Translate icon on hover */
}

/* Tooltip styles for non-style-v2 tooltips */
.tooltip:not(.style-v2):after {
    border-color: hsl(221deg 8% 46%) transparent transparent transparent !important;
    /* Tooltip arrow color */
}

.tooltip:not(.style-v2):before {
    background-color: hsl(221deg 8% 46%) !important;
    /* Tooltip background color */
    color: white !important;
    /* Tooltip text color */
}

/* Responsive adjustment for tooltip position */
@media screen and (max-width: 763px) {
    .tooltip:not(.style-v2):before {
        left: -217% !important;
        /* Adjust tooltip position on small screens */
    }
}

/* Container styles */
.containar {
    border-radius: 16px;
    /* Rounded corners for container */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    /* Shadow effect */
    border: 1px solid rgba(255, 255, 255, 0.47);
    /* Border style */
}

/* Close button shadow effect */
.close-btn {
    box-shadow: inset 0px -4px 2px 0px #00000030 !important;
    /* Inner shadow for close button */
}

/* Modal background and z-index */
.modal {
    background-color: #0000004f !important;
    /* Semi-transparent background for modal */
    z-index: 999 !important;
    /* High z-index for modal */
}

/* Form label input color */
input.FormLabel {
    color: black;
    /* Text color for form label */
}

/* Submit button shadow effect */
.submit-button {
    box-shadow: inset 0px -20px 9px -11px #00000030 !important;
    /* Inner shadow for submit button */
}

/* Remove spin buttons from number input */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    /* Remove default appearance */
    margin: 0;
    /* Remove margin */
}

/* Style for number input to appear as text field */
input[type='number'] {
    -moz-appearance: textfield;
    /* Remove default appearance in Firefox */
    background-color: hsl(var(--n));
    /* neutral background for inputl */
}

/* Country flags dimensions */
.country-flags {
    width: 16px;
    /* Width of country flags */
    height: 10px;
    /* Height of country flags */
}
</style>


<!-- FILE DOCUMENTED -->

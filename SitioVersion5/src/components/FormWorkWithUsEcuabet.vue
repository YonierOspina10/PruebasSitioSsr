<script lang="ts">
import { configure, Field, Form } from 'vee-validate'; // Importing validation library components
import IconChevronRight from './icons/IconChevronRight.vue'; // Importing icon component
import IconCheck from './icons/IconCheck.vue'; // Importing icon component
import IconClose from './icons/IconClose.vue'; // Importing icon component
import apiService from '@/services/ApiService'; // Importing API service
declare var grecaptcha: any; // Declaring grecaptcha variable for reCAPTCHA

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
          if (!validator[type]) {
            return;
          }
          validator = validator[type](...params); // Applying validation
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
  watch: {
    model: function (val) {
      this.modelForm = this.model; // Watching model changes
    },
  },
  emits: ['onSubmit2:form', 'changeSelect:form', 'changeField:form'], // Emitting events
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
      this.appComponent.closeModal(); // Closing modal
    },
    onSubmit(item) {
      if (this.lastPage) {
        this.appComponent.disabledButtonForm = true; // Disabling form button
        var sg = true;
        if (sg) {
          this.$emit('onSubmit2:form', item); // Emitting form submission event
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
        let existsDocNumber = item.validations.filter((validation) => {
          return validation.type == 'when' && (validation.exists_doc_number || validation.valid_rut); // Checking for document number validations
        });
        if (existsDocNumber.length > 0 && event.target.value != '') {
          existsDocNumber.forEach((existDocNumber, index) => {
            if (existDocNumber.exists_doc_number) {
              apiService
                  .request('exists_identificator', { docnumber: event.target.value }) // Checking if document number exists
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
            if (doctypeId.name === 'RUT' &&  existDocNumber.valid_rut) {
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
    /**
     * Returns the SVG icon corresponding to a given label.
     *
     * This utility function maps a specific text label (e.g., "NOMBRE", "APELLIDO", "PAÍS")
     * to its associated SVG string representation. The icons are pre-defined in an internal
     * object and returned as inline SVG markup for use in dynamic rendering of form fields or UI elements.
     *
     * @param {string} icon - The label representing the type of field (e.g., "NOMBRE", "APELLIDO", etc.).
     * @returns {string|undefined} The corresponding SVG markup as a string if found, otherwise undefined.
     */
    getSvgIcon(icon) {
      const icons = {
        'fa-solid fa-user': `
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
          <g clip-path="url(#clip0_7138_1341)">
            <path d="M12.8961 19.6409C16.5798 19.3389 20.1925 20.2644 23.0684 22.5859C24.2819 21.4957 25.5504 20.5977 27.1381 20.1389C34.0917 18.1272 40.541 24.3231 38.6735 31.2994C36.7707 38.4129 27.7488 40.2796 22.8123 34.9816C15.583 35.1738 8.31428 35.0052 1.06919 35.0679C-0.0024047 35.0444 0.178821 33.7856 0.222158 33.0091C0.596428 26.2564 6.0332 20.2016 12.9001 19.6409H12.8961ZM21.7211 33.3738C21.4689 32.617 21.0986 31.9621 20.9016 31.17C20.4288 29.2524 20.5588 27.3269 21.2759 25.4878C21.3822 25.2172 22.0559 23.9819 22.0047 23.88C21.9062 23.68 20.744 22.9663 20.4801 22.8172C16.2606 20.4565 10.9105 20.7545 7.01813 23.6055C3.94123 25.8564 2.04623 29.57 1.91623 33.3699H21.7171L21.7211 33.3738ZM29.4625 21.4094C23.8327 21.6526 20.4958 27.7818 23.293 32.6484C26.1453 37.609 33.4574 37.6051 36.3097 32.6484C39.1621 27.6916 35.3839 21.1545 29.4625 21.4094Z" fill="#FFDB00"/>
            <path d="M13.9483 0.0102054C20.9255 -0.315277 25.4561 7.21002 21.9813 13.2334C18.798 18.7509 10.7532 19.0921 7.10897 13.8491C3.15352 8.1551 7.01442 0.331766 13.9483 0.0102054ZM13.708 1.70036C8.53908 2.15525 5.55279 7.83354 8.13329 12.3511C10.8477 17.0961 17.8328 17.1235 20.5551 12.3785C23.4311 7.36688 19.4757 1.19449 13.708 1.70036Z" fill="#FFDB00"/>
            <path d="M32.6273 26.6798C33.4151 26.4965 34.0001 27.1907 33.614 27.9044C32.1866 29.0783 30.7982 30.338 29.3279 31.4612C28.8131 31.8551 28.4231 32.3114 27.7679 31.8239C27.3818 31.5353 26.2625 30.182 25.931 29.7413C25.5722 29.2655 25.1471 28.5947 25.8842 28.1774C26.9411 27.5768 27.6938 29.6009 28.4348 30.0104L32.6273 26.6798Z" fill="#FFDB00"/>
          </g>
          <defs>
            <clipPath id="clip0_7138_1341">
            <rect width="39" height="39" fill="white"/>
            </clipPath>
          </defs>
        </svg>`,
        'fa-solid fa-location-dot': `
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
          <g clip-path="url(#clip0_7138_1353)">
            <path d="M20.3931 0.436768C20.8806 0.557668 21.3954 0.584968 21.8829 0.694168C28.3803 2.13327 31.8825 9.35217 29.1681 15.4284C28.5558 16.8012 27.4716 17.9673 26.8632 19.2309C26.8281 19.3011 26.7696 19.3518 26.7969 19.4493L32.8887 22.9671L38.5593 37.9977C38.5593 38.3955 38.1303 38.6841 37.7598 38.4969L28.7664 33.4464L19.6014 38.5554L19.2192 38.4969L10.2258 33.4425L1.23242 38.4969C0.877522 38.6685 0.627922 38.4579 0.432922 38.181V37.8105L6.09962 22.9671L6.48572 22.6863L12.1914 19.4493C12.2187 19.3518 12.1602 19.3011 12.1251 19.2309C11.6727 18.2832 10.7718 17.2419 10.2453 16.2708C6.85622 10.0425 10.1049 2.56617 16.8675 0.756568L18.5952 0.436768H20.3814H20.3931ZM19.0788 28.1853C19.5 28.5285 19.7574 28.3569 20.0538 27.9825C22.386 24.0357 25.1121 20.2449 27.4248 16.2903C30.0495 11.8014 29.3436 6.40377 25.0029 3.31107C17.0079 -2.38293 6.67682 6.44667 10.9746 15.2568L19.0827 28.1853H19.0788ZM18.9033 36.9954V29.328L18.2013 28.8756L13.3536 21.2121C13.1781 21.1809 13.2639 21.294 13.2405 21.3954C12.9558 22.7019 12.6789 24.0162 12.402 25.3227C12.1329 25.9389 11.2749 25.7166 11.31 25.0575L12.1602 20.7636L7.00442 23.6847L2.07092 36.6951L9.69932 32.448L10.8732 27.144C11.0799 26.5785 11.7819 26.6565 11.9574 27.2181L10.8537 32.5182L18.8916 36.9915L18.9033 36.9954ZM31.9839 23.6886L26.793 20.7636L29.2305 32.3622L29.3709 32.5182L36.9174 36.699L31.98 23.6925L31.9839 23.6886ZM20.0928 29.3241V36.9915L28.1385 32.4792L25.7517 21.2043L25.5411 21.3291L20.7948 28.8678L20.0928 29.3202V29.3241Z" fill="#FFDB00"/>
            <path d="M18.8877 4.9257C24.2619 4.4265 27.651 10.5846 24.336 14.8434C21.6528 18.2871 16.2279 17.8503 14.1258 14.04C12.0003 10.1907 14.5197 5.3352 18.8877 4.9296V4.9257ZM18.9618 6.0411C12.5307 6.6963 13.3614 16.5711 19.9056 16.068C26.4849 15.5649 25.6893 5.3547 18.9618 6.0411Z" fill="#FFDB00"/>
            <path d="M19.0359 7.16037C24.2931 6.56757 24.9678 14.5431 19.8315 14.9565C14.7459 15.3621 14.0595 7.72197 19.0359 7.16037ZM19.11 8.27577C15.561 8.75547 16.1928 14.2428 19.8276 13.8333C23.4546 13.4238 22.8228 7.77267 19.11 8.27577Z" fill="#FFDB00"/>
          </g>
          <defs>
            <clipPath id="clip0_7138_1353">
            <rect width="39" height="39" fill="white"/>
            </clipPath>
          </defs>
        </svg>`,
        'fa-solid fa-envelope': `
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
          <path d="M0.421204 23.1699C0.522604 23.1504 0.725404 22.8696 0.756604 22.8696H3.1785V19.2114H0.978904C0.335404 19.2114 0.390004 18.0921 0.830704 18.0921H3.1785V15.5883C3.1785 14.5431 4.2939 13.1625 5.3781 13.1625H6.8328V11.4075C6.8328 10.2141 8.1588 9.04798 9.3327 9.05578H23.946C24.6987 8.99338 24.9561 9.96448 24.2385 10.1673L9.4107 10.1751C8.4786 10.1946 7.7688 11.0214 8.034 11.9262L21.2628 21.5982L28.2321 16.4814L27.0816 15.2451C23.3883 10.1244 28.4622 3.26819 34.4565 5.46779C38.6139 6.99269 39.9282 12.3006 37.0227 15.6624C36.8121 15.9081 36.0204 16.5204 35.9814 16.7115C35.9268 20.4633 36.0828 24.2424 35.8995 27.9825C35.6382 28.8171 34.9791 29.4177 34.1484 29.6634C34.0314 30.7047 34.3122 31.7382 33.7311 32.6781C33.2085 33.5205 32.3427 33.7896 31.3989 33.852C26.2353 34.1874 20.7168 33.5946 15.5142 33.852C14.6952 33.9495 14.3715 32.8263 15.2178 32.7288H31.3248L31.8786 32.6547L27.3 29.7375L10.3779 29.7453L5.8656 32.7288H12.909C13.2561 32.7288 13.572 33.7116 12.6048 33.8442C10.4091 33.7467 8.0769 33.9924 5.9007 33.852C4.5552 33.7662 3.1824 32.9316 3.1824 31.4223V29.367C2.4921 29.2734 1.482 29.4918 0.834604 29.367C0.643504 29.328 0.585004 29.1447 0.421204 29.0706V28.6221C0.491404 28.4817 0.850204 28.2477 0.978904 28.2477H3.1785V23.9889H0.978904C0.850204 23.9889 0.491404 23.7549 0.421204 23.6145V23.166V23.1699ZM31.4145 6.23609C29.4099 6.46229 27.6276 8.16269 27.1284 10.0815C25.9467 14.6406 30.8256 18.369 34.8816 15.9822C39.7332 13.1274 37.323 5.56529 31.4145 6.23219V6.23609ZM7.9521 13.3107V26.2314L17.3433 20.1435L7.9521 13.3107ZM6.8328 14.2818H5.4522C5.421 14.2818 5.0076 14.4768 4.9413 14.5197C4.6371 14.7186 4.2939 15.2295 4.2939 15.5922V22.7604L4.407 22.8735H6.8289V14.2857L6.8328 14.2818ZM34.8582 17.2692C33.0408 18.0765 31.0206 17.9985 29.2422 17.1327L25.3188 19.9602L34.8582 26.1573V17.2692ZM8.0301 27.5067C8.0457 27.9981 8.5566 28.4622 9.009 28.5714L33.6297 28.6221C34.2264 28.548 34.7256 28.1424 34.8504 27.5457L24.3867 20.7831C24.1176 20.7753 22.2807 22.3275 21.8556 22.5732C21.4773 22.7916 21.2667 22.9047 20.8221 22.7097L18.5055 20.9976L18.2403 20.9586L8.034 27.5067H8.0301ZM6.8328 23.9889H4.2978V31.3443C4.2978 31.3677 4.3914 31.7694 4.4109 31.8318C4.4343 31.902 4.5045 32.1672 4.6254 32.1243L8.4708 29.6673C7.9482 29.2695 7.3398 28.9107 7.0707 28.2711C7.0044 28.1073 6.8289 27.534 6.8289 27.3897V23.9928L6.8328 23.9889ZM32.9979 29.7414H29.5698L32.8146 31.9059C32.8575 31.9059 33.0018 31.6134 33.0018 31.5705V29.7414H32.9979Z" fill="#FFDB00"/>
          <path d="M29.6673 12.3123C29.1642 11.7156 29.8311 11.0877 30.459 11.4816C30.6267 11.5869 31.3326 12.3357 31.395 12.3357L34.0431 9.31709C34.5735 8.94659 35.1897 9.55889 34.8192 10.0932C33.9105 11.0448 33.1188 12.2226 32.214 13.1586C31.9098 13.4706 31.6524 13.845 31.1805 13.5954C31.0518 13.5252 29.7804 12.441 29.6712 12.3084L29.6673 12.3123Z" fill="#FFDB00"/>
        </svg>`,
        'fa-solid fa-phone-volume': `
        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
          <g clip-path="url(#clip0_7138_1397)">
            <path d="M21.7347 0.889221C26.8593 1.86422 31.4067 4.68002 34.4721 8.88812C36.3207 11.4231 37.4868 14.2935 38.0757 17.3784V17.5968C37.8846 18.2793 37.2684 18.7239 36.5547 18.4275C35.8215 18.1194 35.841 16.9611 35.6577 16.2747C33.8832 9.73832 29.1837 5.05442 22.6512 3.27992C22.1988 3.15902 21.6411 3.12392 21.2082 2.97962C20.124 2.61692 20.1669 1.26752 21.2238 0.893121H21.7308L21.7347 0.889221Z" fill="#FFDB00"/>
            <path d="M7.40996 3.08883C8.66966 2.91724 9.58616 3.28384 10.5144 4.08334C11.8638 5.24164 14.0049 7.38273 15.1632 8.73213C17.7606 11.7663 15.0813 14.0088 12.9129 16.0719C12.7959 16.1811 12.5073 16.3059 12.5229 16.4541C14.6679 20.6037 18.2949 24.219 22.4406 26.3679C24.3594 24.882 25.6815 22.0506 28.5792 22.8423C29.1837 23.0061 29.6985 23.3961 30.1626 23.8017C31.5003 24.9678 33.3372 26.8281 34.5228 28.158C37.5024 31.5081 34.7256 33.5907 32.3388 35.9307C29.5464 38.6685 26.949 38.4579 23.3493 37.2957C16.6062 35.1156 10.062 29.562 5.99036 23.8602C3.34616 20.1669 -0.776141 12.6087 1.67696 8.17833C2.26586 7.11363 5.39756 3.90003 6.47786 3.39303C6.73136 3.27603 7.13696 3.12393 7.40606 3.08883H7.40996ZM7.69856 5.19093C7.53086 5.22603 7.13696 5.46003 6.98876 5.57313C6.27896 6.12303 3.69326 8.77503 3.37346 9.51214C2.14886 12.3552 4.56296 17.5188 6.03326 20.0382C9.19616 25.4631 14.0751 30.2718 19.578 33.2943C21.9765 34.6125 26.7579 36.816 29.4099 35.6187C30.1665 35.2794 32.4558 32.955 33.0642 32.2296C33.9417 31.1844 33.852 30.615 32.9901 29.6127C31.9566 28.4115 29.9442 26.3757 28.743 25.3656C28.2828 24.9795 27.9396 24.7611 27.2922 24.8625C26.5239 24.9834 24.4491 27.5808 23.6535 28.197C23.0022 28.704 22.5108 28.743 21.7542 28.431C17.9595 26.8593 12.7062 21.6216 10.8693 17.9634C10.4676 17.16 10.0035 16.1811 10.5885 15.3504C11.1657 14.5275 12.4995 13.5954 13.2366 12.7686C14.0673 11.8365 14.5314 11.2905 13.5993 10.1517C12.3045 8.57224 10.374 7.14874 9.02456 5.57703C8.65016 5.26503 8.18606 5.09343 7.69466 5.19483L7.69856 5.19093Z" fill="#FFDB00"/>
            <path d="M20.9158 7.65962C21.3682 7.56602 22.2847 7.83512 22.7527 7.96772C26.7424 9.11432 30.073 12.5268 31.0831 16.5594C31.1611 16.8636 31.3132 17.4135 31.3249 17.706C31.3678 18.9696 29.6635 19.2816 29.2384 18.0453C29.0278 17.4369 28.9537 16.7544 28.7119 16.1031C27.6862 13.3341 25.2604 11.0019 22.4485 10.0932C21.5359 9.79682 19.8667 9.82412 20.1553 8.42402C20.2216 8.11592 20.6077 7.72592 20.9158 7.66352V7.65962Z" fill="#FFDB00"/>
          </g>
          <defs>
            <clipPath id="clip0_7138_1397">
              <rect width="39" height="39" fill="white"/>
            </clipPath>
          </defs>
        </svg>`
      }

      return icons[icon] || ''
    }
  },
});
</script>
<template>
  <div
      :class="[
        { 'py-3': windowFrame && backgroundForm == '' },
        {
            'relative bg-base-200 rounded-b-xl':
                config.layout != undefined &&
                config.layout == 3 &&
                $route.fullPath.indexOf('/landing/sorteos') == -1 &&
                backgroundForm == '',
        },
    ]"
  >
    <!-- Conditional div for specific route and component name -->
    <div
        v-if="$route.fullPath == '/registro' && appComponent.config.name == 'Lotosports'"
        class="absolute -bottom-1 w-full h-96 bg-gradient-to-t from-neutral-content z-1"
    ></div>
    <!-- Loading state div with dynamic classes and styles -->
    <div
        v-if="loading"
        :class="{
            'card col-span-1 row-span-3 xl:col-span-2 w-75 p-1': styleWidth == false && backgroundForm === '',
            'rounded-none': !styleWidth && !windowFrame,
            'shadow-lg rounded-xl': backgroundForm == undefined || backgroundForm == '',
            'shadow-lg rounded-xl bg-neutral': backgroundForm == 'neutral',
            'py-10 relative bg-center': backgroundForm !== '',
            'rounded-b-xl rounded-t-none': config.layout != undefined && config.layout == 3,
        }"
        :style="{
            backgroundImage: 'url(' + backgroundForm + ')',
            backgroundSize: backgroundSize == '' || backgroundSize == undefined ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
        }"
    >
      <!-- Card body with conditional classes based on styleWidth and img -->
      <div
          :class="{
                'card-body p-0 lg:p-5': styleWidth == false,
                'flex flex-col md:flex-row-reverse items-center md:items-start justify-center gap-4': img != '',
            }"
      >
        <!-- Image display based on conditions -->
        <div
            v-if="img != '' || img2 != '' && $route.path.indexOf('registro')"
            class="flex items-center justify-center"
        >
          <img
              :src="appComponent.mobile == '' ? img : img2"
              alt="img-landing"
              class="max-h-[50vh] sm:max-h-[70vh]"
          />
        </div>
        <!-- Title display based on conditions -->
        <h2
            v-if="styleWidth == false && !shortRegister && config.layout != 3 && img == undefined"
            class="my-4 m-auto text-2xl font-bold card-title text-center text-secondary"
            v-html="title"
        ></h2>
        <!-- Title display for different layout styles -->
        <div
            v-if="styleWidth == true"
            class="justify-center items-center text-center"
            :class="
                    config.layout != undefined && config.layout == 3
                        ? 'text-neutral'
                        : config.layout != undefined &&
                            config.layout == 7 &&
                            appComponent.modal.showModal == 'register'
                          ? 'text-primary-content text-2xl pt-2 bg-neutral uppercase font-poppinssb'
                          : 'text-neutral-content'
                "
            v-html="title"
        ></div>
        <!-- Form wrapper with dynamic classes - ECUABET -->
        <div class="relative">
        <div class="relative z-10 flex flex-col md:flex-row px-8 md:px-0 max-w-full mx-auto items-center pb-[100px] py-0 md:py-8">
             <div class="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <div class="relative w-full max-w-[420px] mx-auto aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] -translate-y-16">
                <img
                    :src="config['forms']['¿Quieres ser Agente DoradoBet?'].textImage"
                    alt="¡Haz más billete!"
                    class="absolute z-20 w-[150px] md:w-[200px] top-[15%] right-40 md:right-auto md:left-0 md:-translate-x-1/4 -translate-y-1/4 drop-shadow-md"
                />
                <img
                    :src="config['forms']['¿Quieres ser Agente DoradoBet?'].characterImage"
                    alt="Personaje"
                    class="absolute z-10 bottom-0 top-[10%] left-8 md:left-1/2 md:-translate-x-1/2 w-[100%] h-auto object-contain"
                />
                <div class="absolute z-30 bottom-0 top-[80%] left-8 md:left-1/2 md:translate-x-[-43%] w-full text-center leading-none select-none pointer-events-none">
                  <img
                      :src="config['forms']['¿Quieres ser Agente DoradoBet?'].titleImage"
                      alt="Vende Ecuabet en tu negocio"
                      class="w-full h-auto mx-auto max-w-[380px]"
                  />
                </div>
              </div>
            </div>
             <div
                 :class="[
                     'w-full md:w-1/2 bg-black bg-opacity-70 rounded-2xl pt-6 pb-6 mt-12 md:mr-24 border-2 border-primary',
                     { 'form-wrapper': styleWidth == false, ' ': img != '' && img2 != '' },
                     {
                       'mx-auto max-w-[700px]':
                         config.layout != undefined && config.layout == 3 && $route.fullPath == '/registro',
                     },
                     {
                       'mx-auto max-w-[1000px] min-w-[95%] md:min-w-[700px]':
                         config.layout != undefined && config.layout == 3 && $route.fullPath !== '/registro',
                     },
                   ]"
               >
               <!-- View successful form submission - ECUABET -->
               <template v-if="appComponent.submittedSuccessfully">
                 <div class="max-w-md mx-auto rounded-xl text-center text-white">
                   <h2 class="m-auto text-2xl mb-8 font-bold card-title text-primary justify-center">
                     {{ $t('¡Solicitud recibida exitosamente!') }}
                   </h2>
                   <div class="flex justify-center mb-8">
                     <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none">
                       <path d="M71 0C31.8594 0 0.032959 31.8923 0.032959 71.0329C0.032959 110.174 31.8594 142 71 142C110.141 142 141.967 110.174 141.967 71.0329C141.967 31.8923 110.141 0 71 0ZM71 129.942C38.5146 129.942 12.0914 103.518 12.0914 71.0329C12.0914 38.5476 38.5146 12.1244 71 12.1244C103.485 12.1244 129.909 38.5476 129.909 71.0329C129.909 103.518 103.485 129.942 71 129.942Z" fill="#F3CF1D"/>
                       <path d="M100.124 44.8062C98.5426 44.8062 97.0271 45.4651 95.9728 46.5853L61.247 81.311L46.0257 66.0897C44.8396 64.9036 43.1923 64.4423 41.6767 64.3106C40.0953 64.3106 38.5797 64.9695 37.4596 66.1556C36.4053 67.2758 35.7463 68.7913 35.7463 70.3727C35.7463 72.0201 36.3394 73.5356 37.5255 74.6558L61.247 98.3774L104.473 55.1514C105.659 53.9653 106.252 52.4498 106.252 50.8024C106.252 49.221 105.593 47.7055 104.473 46.6512C103.287 45.4651 101.969 44.9379 100.124 44.872V44.8062Z" fill="#F3CF1D"/>
                     </svg>
                   </div>
                   <p class="mb-2">
                     {{ $t('Hemos recibido tu formulario de solicitud para convertirte en') }}<strong>{{ $t('agente Ecuabet') }}</strong>.
                   </p>
                   <p class="mb-4">
                     {{ $t('Nuestro equipo revisará la información y te notificaremos') }}
                     <strong>{{ $t('a través de tu correo electrónico o número de celular registrados.') }}</strong>
                   </p>
                   <p>
                     {{ $t('Agradecemos tu interés en ser parte de nuestra red de agencias.') }}
                   </p>
                 </div>
               </template>
               <!-- Form wrapper with dynamic classes -->
               <template v-else>
                  <!-- Short register title display -->
                  <div
                      v-if="
                                shortRegister &&
                                (config.layout == undefined ||
                                    (config.layout != undefined && config.layout != 5 && config.layout != 7))
                            "
                      class="bg-primary w-full mx-auto text-center text-2xl rounded-t-xl py-2 font-poppinsm"
                      :class="[
                                appComponent.partner == 8 ? 'text-neutral-content' : 'text-neutral',
                                { 'lg:w-11/12 max-w-3xl ': config.layout == undefined || config.layout != 3 },
                                { 'w-11/12': config.layout != undefined && config.layout == 3 },
                            ]"
                  >
                    {{ $t('Registro') }}
                  </div>
                  <!-- Short register message for specific layout -->
                  <p
                      v-if="
                                shortRegister &&
                                config.layout != undefined &&
                                config.layout == 5 &&
                                $route.fullPath == '/registro'
                            "
                      class="mx-auto w-full text-center font-poppinssb text-success text-3xl mb-4"
                  >
                    {{ $t('Registro') }}
                  </p>
                  <!-- Title display based on conditions -->
                  <h2
                      v-if="styleWidth == false && !shortRegister && config.layout != 3"
                      class="m-auto text-2xl mb-2 font-bold card-title text-primary justify-center"
                  >{{ $t('¿TIENES UN LOCAL?') }}</h2>
                 <!-- Additional text display for last page -->
                 <div
                     v-if="textDown != '' && lastPage"
                     class="col-12 text-center pb-12 px-4 text-white"
                 >
                                        <span
                                            v-html="textDown"
                                            :class="
                                                config.layout != undefined &&
                                                config.layout == 5 &&
                                                $route.fullPath == '/registro'
                                                    ? 'text-neutral font-poppinssl'
                                                    : ''
                                            "
                                        ></span>
                 </div>
                  <!-- Form component with validation and dynamic classes -->
                  <Form
                      @submit="onSubmit"
                      @invalid-submit="onInvalidSubmit"
                      :validation-schema="schema"
                      v-slot="{ errors }"
                      :class="[
                                {
                                    'lg:w-11/12 max-w-3xl':
                                        styleWidth == false && (config.layout == undefined || config.layout != 3),
                                },
                                {
                                    'w-11/12': config.layout != undefined && config.layout == 3,
                                    ' border-solid border-1 border-neutral/60 rounded-xl shadow-[0px_0px_20px_9px] shadow-neutral-content/30':
                                        config.layout != undefined && config.layout == 5 && $route.fullPath == '/registro',
                                },
                            ]"
                      class="msform w-full mx-auto"
                      ref="myForm"
                  >
                    <!-- Conditional display for short register layout -->
                    <div
                        v-if="
                                    shortRegister &&
                                    config.layout != undefined &&
                                    config.layout == 5 &&
                                    $route.fullPath == '/registro'
                                "
                        class="w-full"
                    >
                      <div
                          class="bg-secondary w-full text-center text-2xl rounded-t-xl py-2 font-poppinsm flex justify-center items-center h-[21rem] relative overflow-hidden"
                      >
                        <img
                            :src="banner"
                            alt=""
                            class="absolute top-0 left-0 object-fill w-full h-full"
                        />
                      </div>
                    </div>
                    <!-- Title for specific layout -->
                    <h2
                        v-if="
                                    styleWidth == false &&
                                    !shortRegister &&
                                    config.layout != undefined &&
                                    config.layout == 3
                                "
                        class="text-2xl font-bold text-center text-neutral bg-secondary-focus h-full w-full rounded-t-xl py-4"
                        v-html="title"
                    ></h2>
                    <!-- Fieldset for form elements with dynamic classes -->
                    <fieldset
                        :class="{
                                    'rounded-xl':
                                        styleWidth == false && shortRegister == false && config.layout != 3,
                                    'bg-base-200 rounded-b-xl':
                                        styleWidth == false &&
                                        shortRegister == false &&
                                        config.layout != undefined &&
                                        config.layout == 3,
                                    'rounded-t-none bg-neutral': shortRegister && config.layout != 3 && config.layout != 5,
                                    'bg-primary rounded-xl':
                                        shortRegister &&
                                        config.layout != undefined &&
                                        config.layout == 5 &&
                                        $route.fullPath == '/registro',
                                    'rounded-t-none rounded-b-xl':
                                        shortRegister && config.layout != undefined && config.layout == 3,
                                }"
                        class="text-white"
                        :style="{
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
                                }"
                    >
                      <!-- Currency field with dynamic label -->
                      <div
                          v-if="config.layout != undefined && textUp"
                          :class="textUp == undefined || textUp == '' ? 'mb-1' : 'mb-9'"
                          class="FormItem fldCurrency"
                          id="fldCurrency"
                      >
                        <label
                            class="FormLabel div-inline-block"
                            :class="
                                            config.layout != undefined && config.layout == 3
                                                ? 'text-neutral'
                                                : 'text-white'
                                        "
                            for="selectCurrency"
                            v-html="textUp"
                        ></label>
                      </div>
                      <!-- Grid for form fields -->
                      <div
                          id=""
                          class="pb-3 grid md:grid-cols-2 w-full"
                          :class="[
                                        twoColumnsMobile ? 'grid-cols-2' : 'grid-cols-1',
                                        { 'gap-6': !shortRegister, 'gap-3': shortRegister },
                                    ]"
                      >
                        <!-- Dynamic form controls based on fields array -->
                        <div
                            v-for="(item, index) in fields"
                            :key="index"
                            class="form-control px-2"
                            :class="[
                                            { 'md:col-span-2': item.widthFull },
                                            { hidden: item.page != undefined && item.page != page },
                                        ]"
                        >
                          <!-- Title for form control -->
                          <div
                              v-if="item.type != 'checkbox' && item.type != 'button'"
                              class="form-col-title ng-binding flex justify-between"
                          >
                                                <span
                                                    v-if="!shortRegister"
                                                    v-html="$t(item.label)"
                                                    class='pl-20'
                                                    :class="
                                                        config.layout != undefined && config.layout == 3
                                                            ? 'text-neutral'
                                                            : config.layout != undefined &&
                                                                config.layout == 5 &&
                                                                $route.fullPath == '/registro'
                                                              ? 'text-neutral font-poppinssl'
                                                              : 'text-white'
                                                    "
                                                    ref="contentRefs"
                                                    :style="{
                                                        color:
                                                            fontColorForm != undefined && fontColorForm != ''
                                                                ? fontColorForm
                                                                : '#000000',
                                                    }"
                                                ></span>
                            <span
                                v-if="vRequired(item) && !shortRegister"
                                class="text-red-500"
                            >*</span>
                          </div>
                          <div class="form-col w-[100%]">
                            <!-- Form control content -->
                            <div
                                class="form-col-content div-input relative"
                                :class="
                                                    item.type == 'radio'
                                                        ? item.colCheckbox != undefined && item.colCheckbox
                                                            ? 'grid grid-cols-1 gap-y-4 mt-4'
                                                            : item.style != undefined && item.style == 2
                                                              ? 'flex flex-row justify-around h-auto flex-wrap'
                                                              : 'grid grid-cols-2'
                                                        : ''
                                                "
                            >
                              <div
                                  v-if="
                                                        item.type == 'text' ||
                                                        item.type == 'textsearch' ||
                                                        item.type == 'phonesearch' ||
                                                        item.type == 'password' ||
                                                        item.type == 'number' ||
                                                        item.type == 'date' ||
                                                        item.type == 'file' ||
                                                        item.type == 'textarea' ||
                                                        item.type == 'select' ||
                                                        item.type == 'richselect'
                                                    "
                                  :class="{ 'input-group': item.icon != undefined && !shortRegister }"
                              >
                                                 <span
                                                     v-if="item.icon != undefined"
                                                     v-html="getSvgIcon(item.icon)"
                                                     :class="[
                                                                item.iconbg != undefined ? item.iconbg : '',
                                                                {
                                                                    'bg-transparent text-accent-focus':
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
                                                            ]"
                                                 ></span>
                                <!-- Input fields based on type -->
                                <Field
                                    v-if="
                                                            item.type == 'text' ||
                                                            item.type == 'password' ||
                                                            item.type == 'number' ||
                                                            item.type == 'date'
                                                        "
                                    autocomplete="new-password"
                                    @blur="blurField(item, $event)"
                                    @input="changeField(item, $event)"
                                    class="descripcion w-full border-2 border-primary bg-input-background rounded-md h-12 placeholder-input-placeholder text-neutral"
                                    :id="item.name"
                                    :min="minDate"
                                    :max="maxDate"
                                    :name="item.name"
                                    :placeholder="$t(item.placeholder)"
                                    :class="[
                                                            item.icon !== undefined ? 'rounded-r-md' : 'rounded-md',
                                                            $route.fullPath == '/registro' ? 'rounded-md' : '',
                                                            { 'pl-9': shortRegister && item.icon != undefined },
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
                                                                check:
                                                                    (errors[item.name] == undefined || errors[item.name]) &&
                                                                    modelForm[item.name] != undefined,
                                                            },
                                                            {
                                                                uppercase:
                                                                    item.type === 'text' &&
                                                                    item.upperCase != undefined &&
                                                                    item.upperCase === true,
                                                            },
                                                        ]"
                                    :disabled="item.disabled"
                                    :type="item.type"
                                    v-model="modelForm[item.name]"
                                />
                                <!-- Show password button -->
                                <button
                                    v-if="item.type == 'password'"
                                    type="button"
                                    class="absolute top-3 right-1"
                                    id="showpass"
                                    @click="showpass(item.name)"
                                >
                                  <font-awesome-icon
                                      class="text-xl text-gray-400"
                                      icon="fa-solid fa-eye"
                                  />
                                </button>
                                <!-- Search input fields -->
                                <Field
                                    v-if="item.type == 'textsearch' || item.type == 'phonesearch'"
                                    autocomplete="new-password"
                                    @blur="blurField(item, $event)"
                                    @input="changeField(item, $event)"
                                    class="descripcion border-input-border bg-input-background rounded-md h-12 w-full placeholder-input-placeholder text-neutral"
                                    :id="item.name"
                                    :name="item.name"
                                    :placeholder="$t(item.placeholder)"
                                    :class="[
                                                            { 'pl-9': shortRegister },
                                                            { inptDate: item.type == 'date' },
                                                            config.layout != undefined &&
                                                            config.layout == 5 &&
                                                            $route.fullPath == '/registro'
                                                                ? 'bg-base-300 border-secondary font-poppinssl placeholder:text-secondary'
                                                                : '',
                                                        ]"
                                    :disabled="item.disabled"
                                    :type="'string'"
                                    v-model="modelForm[item.name]"
                                />
                                <!-- Validation button for search inputs -->
                                <a
                                    v-if="item.type == 'textsearch' || item.type == 'phonesearch'"
                                    @click="
                                                            () => {
                                                                if (!appComponent.disableOthersButtons) {
                                                                    onClicEventDocNumber(item);
                                                                }
                                                            }
                                                        "
                                    id="ok-data"
                                    class="btn btn-sm h-[42px] rounded-md p-2 flex absolute top-0 right-0 border-none bg-secondary text-neutral tooltip"
                                    :class="[
                                                            {
                                                                'tooltip-open':
                                                                    errors[item.name] == undefined &&
                                                                    modelForm[item.name] != undefined &&
                                                                    (modelForm['birth_date'] == undefined ||
                                                                        modelForm['birth_date'] == ''),
                                                            },
                                                        ]"
                                    :data-tip="
                                                            item.type == 'textsearch'
                                                                ? $t('Clic en OK para validar CPF')
                                                                : item.type == 'phonesearch'
                                                                  ? $t('Click aqui para validar')
                                                                  : ''
                                                        "
                                ><span class="bg-secondary">OK</span></a
                                >
                                <!-- File input field -->
                                <Field
                                    v-if="item.type == 'file'"
                                    class="descripcion border-input-border bg-input-background rounded-md h-12 w-full placeholder-input-placeholder text-neutral"
                                    :class="[
                                                            { 'pl-9': shortRegister },
                                                            { inptDate: item.type == 'date' },
                                                        ]"
                                    accept=".png,.jpg,jpeg"
                                    :id="item.name"
                                    :name="item.name"
                                    :placeholder="$t(item.placeholder)"
                                    :disabled="item.disabled"
                                    :type="item.type"
                                    v-model="modelForm[item.name]"
                                    @change="initFile($event)"
                                />
                                <!-- Textarea input field -->
                                <Field
                                    v-if="item.type == 'textarea'"
                                    class="descripcion overflow-auto border-2 border-primary bg-input-background rounded-md w-full min-h-12 h-36 max-h-96 placeholder-input-placeholder text-neutral"
                                    :class="{ 'pl-9': shortRegister }"
                                    as="textarea"
                                    :id="item.name"
                                    :name="item.name"
                                    :placeholder="$t(item.placeholder)"
                                    :disabled="item.disabled"
                                    v-model="modelForm[item.name]"
                                />
                              <!-- Select input for country resident -->
                              <div
                                  v-if="
                                                        item.type == 'select' &&
                                                        item.name == 'countryResident_id' &&
                                                        arraySelects['countryResidentList']
                                                    "
                                  tabindex="0"
                                  :class="{ 'bg-transparent': shortRegister }"
                                  class="mb-[1rem] mr-5 btn btn-sm h-[42px] rounded-md p-2 flex absolute top-0 left-0 border-neutral-content/80"
                              >
                                                    <span
                                                        id="selected-option"
                                                        :class="
                                                            'country-flags ' +
                                                            arraySelects['countryResidentList']
                                                                .filter((x) => x.Id == modelForm['countryResident_id'])
                                                                .map((x) => x.Iso)[0]
                                                        "
                                                    ></span>
                              </div>
                              <!-- Select input field -->
                              <Field
                                  as="select"
                                  :value="item.valueDefault"
                                  v-if="item.type == 'select'"
                                  :class="[
                                                        item.type == 'select' && item.name == 'countryResident_id'
                                                            ? 'descripcion pl-10 max-w-[100%] w-[100%] border-input-border bg-input-background rounded-md h-12 placeholder-input-placeholder text-neutral'
                                                            : 'descripcion max-w-[100%] w-[100%] border-2 border-primary bg-input-background rounded-xl h-12 placeholder-input-placeholder text-neutral',
                                                        {
                                                            ' border-solid border-neutral-content/40 border-2':
                                                                config.layout != undefined &&
                                                                config.layout == 7 &&
                                                                appComponent.modal.showModal == 'register',
                                                        }
                                                    ]"
                                  :id="item.name"
                                  :name="item.name"
                                  v-model="modelForm[item.name]"
                                  :disabled="item.disabled"
                                  @change="changeSelect($event, item.optionsKey)"
                              >
                                <option value="">{{ $t(item.placeholder) }}</option>
                                <option
                                    v-for="option in getArraySelects(item.optionsKey)"
                                    :value="option.value"
                                >
                                  {{ $t(option.name) }}
                                </option>
                              </Field>
                              <!-- Button input for registration -->
                              <button
                                  v-if="item.type == 'button'"
                                  @click="
                                                        textButton == 'Regístrate'
                                                            ? appComponent.gAnalytics('register')
                                                            : ''
                                                    "
                                  class="m-9 y-4 cursor-pointer w-11/12 btn btn-primary w-52 rounded-xl"
                                  v-show="!appComponent.disabledButtonForm"
                                  :class="{ 'btn btn-primary w-52 rounded-xl': shortRegister }"
                              >
                                <input
                                    type="submit"
                                    class="submit text-neutral-content"
                                    :value="lastPage ? $t(textButton) : $t('Siguiente')"
                                    :class="
                                                            config.layout == 3 &&
                                                            config.layout != undefined &&
                                                            shortRegister == false
                                                                ? 'bg-success w-auto h-14 rounded-lg px-8 hover:bg-success/75 hover:scale-105'
                                                                : shortRegister == false
                                                                  ? 'btn btn-primary'
                                                                  : ''
                                                        "
                                />
                                <IconChevronRight
                                    v-if="shortRegister"
                                    class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                                    :width="15"
                                    :height="15"
                                />
                              </button>
                              </div>
                              <!-- Radio button group -->
                              <div
                                  v-if="item.type == 'radio' && item.style == 2"
                                  v-for="option in item.options"
                                  class="flex flex-row gap-1 mt-2 md:mt-8"
                              >
                                <div
                                    class="relative w-[150px] h-[50px] flex justify-center items-center group mx-1"
                                >
                                  <Field
                                      :id="item.name"
                                      :name="item.name"
                                      v-bind:value="option.value"
                                      :type="option.type"
                                      v-model="modelForm[item.name]"
                                      :disabled="item.disabled"
                                      class="absolute top-0 left-0 w-[150px] h-[50px] cursor-pointer opacity-0 peer"
                                      @change="changeFieldRadio(item, $event)"
                                  />
                                  <div
                                      class="flex justify-center items-center peer-checked:bg-success group-hover:bg-base-300 transition-all ease-in-out peer-checked:shadow-[inset_0px_-6px_2px_#00000070] w-full bg-accent peer-checked:border-primary rounded-full h-full border-neutral border-1 border-solid"
                                  >
                                    <p class="font-poppinssl leading-5 text-sm px-1 text-neutral">
                                      {{ option.title }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <!-- Radio button without style -->
                              <div
                                  v-else-if="item.type == 'radio'"
                                  v-for="option in item.options"
                                  :class="{ 'flex gap-2': option.icon != undefined }"
                              >
                                <div
                                    class="relative w-[25px] h-[25px] flex justify-center items-center"
                                >
                                  <div
                                      v-if="modelForm[item.name] == option.value"
                                      class="absolute animate-ping w-full h-full bg-success rounded-full z-1"
                                  ></div>
                                  <Field
                                      :id="item.name"
                                      :name="item.name"
                                      v-bind:value="option.value"
                                      :type="option.type"
                                      v-model="modelForm[item.name]"
                                      :disabled="item.disabled"
                                      class="radio flex justify-center items-center z-10 border-2 border-primary"
                                      :class="{
                                                                ' border-solid border-neutral-content/40 border-2':
                                                                    config.layout != undefined &&
                                                                    config.layout == 7 &&
                                                                    appComponent.modal.showModal == 'register',
                                                            }"
                                      @change="changeFieldRadio(item, $event)"
                                  />
                                </div>
                                <div
                                    class="flex justify-center items-center"
                                    :class="
                                                            option.icon != undefined &&
                                                            !option.icon.includes('https') &&
                                                            option.icon != ''
                                                                ? 'flex-col'
                                                                : 'gap-2'
                                                        "
                                >
                                  <font-awesome-icon
                                      v-if="
                                                                option.icon != undefined && !option.icon.includes('https')
                                                            "
                                      size="2x"
                                      :icon="option.icon"
                                      :class="
                                                                config.layout != undefined && config.layout == 3
                                                                    ? 'text-neutral'
                                                                    : 'text-neutral-content'
                                                            "
                                  />
                                  <img
                                      v-else-if="option.icon != undefined && option.icon != ''"
                                      :src="option.icon"
                                      alt=""
                                      class="w-[20px] aspect-square"
                                  />
                                  <span
                                      v-html="$t(option.title)"
                                      :class="
                                                                config.layout != undefined && config.layout == 3
                                                                    ? 'text-neutral'
                                                                    : 'text-neutral-content'
                                                            "
                                  ></span>
                                </div>
                              </div>
                              <!-- Checkbox input -->
                              <div
                                  v-if="item.type == 'checkbox'"
                                  class="flex gap-x-3 mt-4"
                              >
                                <label
                                    v-if="item.style != undefined && item.style == 2"
                                    :data-tip="
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? item?.hoverText
                                                                : ''
                                                        "
                                    :class="
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? 'tooltip style-v2 tooltip-right'
                                                                : ''
                                                        "
                                    class="relative w-[37px] min-w-[37px] max-w-[37px] h-[21px] bg-accent rounded-full border-1 border-solid border-neutral cursor-pointer"
                                >
                                  <Field
                                      @click="
                                                                item.name == 'acepta_terminos'
                                                                    ? appComponent.gAnalytics('checkbox_older')
                                                                    : item.name == 'offerRegister'
                                                                      ? appComponent.gAnalytics('checkbox_send')
                                                                      : ''
                                                            "
                                      :id="item.name"
                                      :name="item.name"
                                      type="checkbox"
                                      value="true"
                                      v-model="modelForm[item.name]"
                                      class="opacity-0 absolute top-0 left-0 peer"
                                  />
                                  <span
                                      class="flex justify-center items-center absolute top-[-1px] right-[-2px] w-[21px] h-[21px] bg-gradient-to-b from-red-600 to-neutral-content/80 bg-error rounded-full peer-checked:bg-success peer-checked:from-success peer-checked:to-neutral-content/80 peer-checked:-translate-x-5 transition-all ease-in-out"
                                  >
                                                            <IconCheck
                                                                v-if="modelForm[item.name]"
                                                                class="fill-neutral w-3 text-center left-[4px]"
                                                            ></IconCheck>
                                                            <IconClose
                                                                v-else
                                                                class="fill-neutral"
                                                                :width="14"
                                                                :height="14"
                                                                fill="white"
                                                            ></IconClose>
                                                        </span>
                                </label>
                                <label
                                    v-else-if="item.style != undefined && item.style == 3"
                                    :data-tip="
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? item?.hoverText
                                                                : ''
                                                        "
                                    :class="
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? 'tooltip style-v2 tooltip-right'
                                                                : ''
                                                        "
                                    class="bg-base-300 w-6 h-6 min-w-[21px] rounded-md border-1 border-solid border-neutral relative"
                                >
                                  <Field
                                      @click="
                                                                item.name == 'acepta_terminos'
                                                                    ? appComponent.gAnalytics('checkbox_older')
                                                                    : item.name == 'offerRegister'
                                                                      ? appComponent.gAnalytics('checkbox_send')
                                                                      : ''
                                                            "
                                      class="opacity-0 absolute top-0 left-0 peer"
                                      :id="item.name"
                                      :name="item.name"
                                      type="checkbox"
                                      value="true"
                                      v-model="modelForm[item.name]"
                                  />
                                  <span
                                      class="peer-checked:opacity-100 opacity-0 bg-success rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-1 w-3/5 h-3/5"
                                  ></span>
                                </label>
                                <Field
                                    v-else
                                    :data-tip="
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? item?.hoverText
                                                                : ''
                                                        "
                                    :class="[
                                                            item?.hoverText != undefined && item?.hoverText != ''
                                                                ? 'tooltip style-v2 tooltip-right'
                                                                : '',
                                                            {
                                                                ' border-solid border-neutral-content/40 border-2':
                                                                    config.layout != undefined && config.layout == 7,
                                                            },
                                                        ]"
                                    @click="
                                                            item.name == 'acepta_terminos'
                                                                ? appComponent.gAnalytics('checkbox_older')
                                                                : item.name == 'offerRegister'
                                                                  ? appComponent.gAnalytics('checkbox_send')
                                                                  : ''
                                                        "
                                    class="checkbox"
                                    :id="item.name"
                                    :name="item.name"
                                    type="checkbox"
                                    value="true"
                                    v-model="modelForm[item.name]"
                                />
                                <span
                                    v-html="$t(item.label)"
                                    ref="contentRefs"
                                    class=""
                                    :class="
                                                            config.layout != undefined &&
                                                            config.layout == 5 &&
                                                            $route.fullPath == '/registro'
                                                                ? 'text-neutral font-poppinssl'
                                                                : ''
                                                        "
                                    :style="{
                                                            color:
                                                                fontColorForm != undefined && fontColorForm != '' && !ligthMode
                                                                    ? fontColorForm
                                                                    : fontColorFormLight != undefined && fontColorFormLight != '' && ligthMode
                                                                        ? fontColorFormLight
                                                                        : !ligthMode
                                                                            ? '#ffffff'
                                                                            : '#000000'
                                                        }"
                                ></span>
                              </div>
                              <!-- Validation labels for form controls -->
                              <label
                                  v-if="
                                                        checkVersion == 2 &&
                                                        errors[item.name] == undefined &&
                                                        modelForm[item.name] != undefined &&
                                                        !item.disabled &&
                                                        item.type != 'textsearch' &&
                                                        item.type != 'phonesearch' &&
                                                        item.type != 'checkbox'
                                                    "
                                  :for="item.name"
                                  generated="true"
                              >
                                <font-awesome-icon
                                    class="bg-primary w-3 h-3 rounded-full p-1 absolute -top-2 -right-2 text-neutral"
                                    icon="fa-solid fa-check"
                                />
                              </label>
                              <label
                                  v-else-if="
                                                        errors[item.name] == undefined &&
                                                        modelForm[item.name] != undefined &&
                                                        !item.disabled &&
                                                        item.type != 'textsearch' &&
                                                        item.type != 'phonesearch' &&
                                                        item.type != 'checkbox'
                                                    "
                                  :for="item.name"
                                  generated="true"
                                  :class="[
                                                        item.type != 'date' &&
                                                        item.type != 'select' &&
                                                        item.name == 'gender'
                                                            ? 'right-1 max-sm:left-60 bottom-8'
                                                            : 'right-9 top-3 ' ||
                                                                (item.type != 'date' && item.type != 'select')
                                                              ? 'right-9 top-3'
                                                              : 'right-10 top-3 ',
                                                        item.type == 'password' ? 'right-9 top-3' : '',
                                                    ]"
                                  class="absolute mx-2 bg-green-500 p-1 rounded-full text-neutral flex check"
                              >
                                <font-awesome-icon icon="fa-solid fa-check" />
                              </label>
                              <!-- Error alert for form controls -->
                              <div
                                  class="alert alert-error p-1 bg-red-500/10 text-red-500 shadow-lg rounded-t-lg"
                                  :class="{ 'col-span-2': item.type == 'radio' }"
                                  v-if="
                                                        errors[item.name] != undefined &&
                                                        clearError &&
                                                        item.type != 'button'
                                                    "
                              >
                                <div class="flex-1 px-3">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      class="w-5 h-5 stroke-current"
                                  >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    ></path>
                                  </svg>
                                  <label
                                      class="text-sm"
                                      v-t
                                  >{{ errors[item.name] }}</label
                                  >
                                </div>
                              </div>
                              <!-- Countdown for phone search -->
                              <div
                                  v-if="appComponent.disabledOtherCount && item.type == 'phonesearch'"
                                  class="text-secondary pt-5"
                              >
                                {{ $t('Intente de nuevo en: ') }}
                                <vue-countdown
                                    v-if="appComponent.disabledOtherCount"
                                    :time="appComponent.otherCount"
                                    :interval="100"
                                    v-slot="{ minutes, seconds }"
                                    class="text-secondary font-poppinsm text-base md:text-lg text-center z-1"
                                >
                                  {{ minutes }} : {{ seconds }}
                                </vue-countdown>
                                {{ $t(' segundos.') }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Navigation button for previous page -->
                      <a
                          class="my-9 mr-1 btn btn-primary text-neutral w-[70px]"
                          @click="
                                        page--;
                                        lastPage = false;
                                    "
                          v-if="page > 1"
                      >
                        {{ $t('Antes') }}
                      </a>
                      <!-- Submit button for form -->
                       <button
                           v-if="fields.findIndex((item) => item.type == 'button') < 0"
                           @click="textButton == 'Regístrate' ? appComponent.gAnalytics('register') : ''"
                           :disabled="appComponent.disabledButtonForm"
                           class="h-8 w-full py-1 rounded-full font-bold uppercase mt-6 mb-1 cursor-pointer transition"
                           :class="[
                               {
                                 'button-submit': (shortRegister && config.layout == undefined) || config.layout != 3,
                               },
                               config.layout != undefined && config.layout == 5 && $route.fullPath == '/registro'
                                 ? 'bg-neutral-content bg-gradient-to-b from-success to-success/70 px-5 py-10 rounded-md shadow-[inset_0px_-5px_0px] shadow-neutral-content/40 hover:brightness-90'
                                 : config.layout != undefined &&
                                     config.layout == 7 &&
                                     appComponent.modal.showModal == 'register'
                                   ? 'py-7 bg-primary w-52 border-0 rounded-full uppercase drop-shadow-[2px_5px_6px_#0000007d] shadow-[inset_0px_0px_0px_4px_#00000021] hover:scale-105 transition-all ease-in-out'
                                   : 'w-52 rounded-xl',
                               {
                                 'bg-success hover:opacity-60 text-white cursor-pointer': !appComponent.disabledButtonForm,
                                 'bg-success opacity-50 text-white cursor-not-allowed': appComponent.disabledButtonForm
                               },
                               '!border-none'
                             ]"
                         >
                        <input
                            type="submit"
                            class="cursor-pointer submit"
                            :class="
                                            config.layout != undefined &&
                                            config.layout == 5 &&
                                            $route.fullPath == '/registro'
                                                ? 'text-neutral-content font-poppinssb'
                                                : config.layout != undefined &&
                                                    config.layout == 7 &&
                                                    appComponent.modal.showModal == 'register'
                                                  ? 'uppercase text-neutral drop-shadow-[2px_5px_6px_#0000007d]'
                                                  : 'text-neutral'
                                        "
                            :value="lastPage ? $t(textButton) : $t('Siguiente')"
                        />
                        <IconChevronRight
                            v-if="
                                            shortRegister &&
                                            (config.layout == undefined || (config.layout != 5 && config.layout != 7))
                                        "
                            class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                            :fill="'white'"
                            :width="15"
                            :height="15"
                        />
                      </button>
                      <!-- Countdown for disabled state -->
                      <div
                          v-if="appComponent.disabledCount"
                          class="text-secondary pt-5"
                      >
                        {{ $t('Intente de nuevo en: ') }}
                        <vue-countdown
                            v-if="appComponent.disabledCount"
                            :time="appComponent.count"
                            :interval="100"
                            v-slot="{ seconds }"
                            class="text-secondary font-poppinsm text-base md:text-lg text-center z-1"
                        >
                          {{ seconds }}
                        </vue-countdown>
                        {{ $t(' segundos.') }}
                      </div>
                      <!-- Disabled button state -->
                      <button
                          disabled
                          class="my-9 flex justify-center items-center mx-auto"
                          v-if="appComponent.disabledButtonForm"
                          :class="[
                                        {
                                            'button-submit bg-gradient-to-r from-[#5d5d5d] via-secondary to-[#5d5d5d] bg-[length:200%_100%] w-full rounded-full transition-all ease-in-out duration-700 h-[55px] btn-shadow':
                                                shortRegister,
                                        },
                                        {
                                            'bg-success w-52 rounded-xl hover:bg-success/75 hover:scale-105':
                                                config.layout == 3 && config.layout != undefined && shortRegister == false,
                                        },
                                        { 'btn btn-primary': shortRegister == false },
                                    ]"
                      >
                        <svg
                            aria-hidden="true"
                            role="status"
                            class="w-4 h-4 mr-3 text-neutral animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                          />
                          <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                          />
                        </svg>
                        <input
                            type="submit"
                            class="submit text-neutral"
                            :value="lastPage ? $t(textButton) : $t('Siguiente')"
                        />
                        <IconChevronRight
                            v-if="shortRegister"
                            class="inline-block ml-2 button-icon transition-all ease-in-out duration-700 fill-neutral"
                            :fill="'white'"
                            :width="15"
                            :height="15"
                        />
                      </button>
                      <!-- Step indicator for registration -->
                      <div
                          id="text-paso"
                          v-if="
                                        config.registro != undefined &&
                                        config.registro.steps != undefined &&
                                        config.registro.steps[appComponent.country] != undefined
                                    "
                      >
                        {{ page }} {{ $t('de') }} {{ config.registro.steps[appComponent.country] }}
                      </div>
                      <!-- Google login button -->
                      <GoogleLogin
                          v-if="loginGoogle"
                          :callback="signInWithGoogle"
                          prompt
                          class="w-full mt-8 flex justify-center items-center"
                          @click="appComponent.gAnalytics('login_google')"
                      />
                      <!-- Facebook login button -->
                      <div
                          v-if="loginFacebook"
                          class="flex items-center justify-center"
                      >
                        <facebook-login
                            :appId="clientId"
                            @loggedIn="signInWithFacebook"
                            @loginFailed="signInWithFacebookFailed"
                            :type="'custom'"
                            :text="$t('Iniciar sesión con Facebook')"
                            :class="'w-auto bg-neutral border-[1px] transition-all ease-in-out border-solid border-[#dadce0] px-[12px] h-[40px] mt-4 text-gray-600 rounded-md hover:bg-blue-50/30 font-medium'"
                        ></facebook-login>
                      </div>
                    </fieldset>
                  </Form>
               </template>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Loading state div -->
  <div
      v-if="!loading"
      class="flex w-full h-screen items-center shadow-lg rounded-3xl bg-neutral rounded-r-3xl"
  >
    <div class="flex-1"></div>
    <div class="flex flex-col w-12/12">
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
  <!-- Modal for additional content -->
  <div
      class="modal z-50"
      v-if="showModal"
  >
    <div class="container-general w-4/5 h-[600px] md:w-[80%] flex flex-col justify-center items-center">
      <div class="bg-base-300 container-img-text w-full overflow-y-auto containar p-5 pt-8 rounded-3xl relative">
        <div class="promotion-image w-full shadow-md relative">
          <!-- Close button for modal -->
          <label
              v-if="config.layout != 3"
              @click="closeModal"
              class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs -top-7 -right-2 shadow-lg text-neutral transition ease-in-out hover:scale-105 z-1"
          >✕</label
          >
          <label
              v-if="config.layout != undefined && config.layout == 3"
              @click="closeModal"
              class="absolute text-xs -top-6 -right-3 hover:scale-105 z-1 cursor-pointer"
          >
            <ExitIcon
                :height="23"
                :width="23"
                :fill="'#ffffff'"
                :fill2="'#ee3b3f'"
            />
          </label>
        </div>
        <!-- Content area for modal -->
        <div
            id="popUpRegister"
            class="w-full h-[80vh] overflow-auto text-neutral-content"
            :style="[
                    { borderRadius: config.layout != undefined && config.layout == 3 ? '10px' : '0px' },
                    { marginTop: config.layout != undefined && config.layout == 3 ? '8px' : '0px' },
                ]"
        >
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
/* Style for date input placeholder */
input[type='date']::before {
  color: hsl(var(--ip)); /* Placeholder text color */
  position: absolute; /* Positioning for the placeholder */
  content: attr(placeholder); /* Use the placeholder attribute as content */
  background-color: hsl(var(--ib)); /* Background color using CSS variable */
  overflow: hidden; /* Hide overflow content */
  width: 65%; /* Width of the placeholder */
  text-overflow: clip; /* Clip text overflow */
  neutral-space: nowrap; /* Prevent text wrapping */
  overflow-wrap: break-word; /* Allow breaking of words */
}

/* Remove placeholder content on focus or when checked */
input[type='date']:focus::before,
input[type='date'].check::before {
  content: '' !important; /* Force empty content */
}

.input {
  background-color: hsl(var(--n)) !important;
}

/* Style for the calendar picker indicator in date input */
.inptDate::-webkit-calendar-picker-indicator {
  border-radius: 2px; /* Rounded corners for the indicator */
}

/* Styles for input group elements */
.input-group > *,
.input-group > .input,
.input-group > .textarea,
.input-group > .select {
  border-radius: 12px !important; /* Rounded corners for input group elements */
}

/* Button shadow effect */
.btn-shadow {
  box-shadow:
      inset 0px -2px 4px 0px #00000026, /* Inner shadow */
      inset 0px 4px 4px 0px #ffffff45; /* Inner highlight */
  font-family: Poppins-Medium !important; /* Font family for button */
}

/* Hover effect for submit button */
.button-submit:hover {
  background-position: 100% 0; /* Change background position on hover */
}

/* Move button icon on hover */
.button-submit:hover .button-icon {
  transform: translateX(10px); /* Translate icon on hover */
}

/* Tooltip styles for non-style-v2 tooltips */
.tooltip:not(.style-v2):after {
  border-color: hsl(221deg 8% 46%) transparent transparent transparent !important; /* Tooltip arrow color */
}

.tooltip:not(.style-v2):before {
  background-color: hsl(221deg 8% 46%) !important; /* Tooltip background color */
  color: white !important; /* Tooltip text color */
}

/* Responsive adjustment for tooltip position */
@media screen and (max-width: 763px) {
  .tooltip:not(.style-v2):before {
    left: -217% !important; /* Adjust tooltip position on small screens */
  }
}

/* Container styles */
.containar {
  border-radius: 16px; /* Rounded corners for container */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
  border: 1px solid rgba(255, 255, 255, 0.47); /* Border style */
}

/* Close button shadow effect */
.close-btn {
  box-shadow: inset 0px -4px 2px 0px #00000030 !important; /* Inner shadow for close button */
}

/* Modal background and z-index */
.modal {
  background-color: #0000004f !important; /* Semi-transparent background for modal */
  z-index: 999 !important; /* High z-index for modal */
}

/* Form label input color */
input.FormLabel {
  color: black; /* Text color for form label */
}

/* Submit button shadow effect */
.submit-button {
  box-shadow: inset 0px -20px 9px -11px #00000030 !important; /* Inner shadow for submit button */
}

/* Remove spin buttons from number input */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Remove default appearance */
  margin: 0; /* Remove margin */
}

/* Style for number input to appear as text field */
input[type='number'] {
  -moz-appearance: textfield; /* Remove default appearance in Firefox */
  background-color: hsl(var(--n)); /* neutral background for inputl */
}

/* Country flags dimensions */
.country-flags {
  width: 16px; /* Width of country flags */
  height: 10px; /* Height of country flags */
}
</style>


<!-- FILE DOCUMENTED -->

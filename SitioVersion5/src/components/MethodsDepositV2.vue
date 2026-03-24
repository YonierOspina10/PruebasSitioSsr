<template>
	<!-- Main template container for the component -->
	<section class="bg-secondary-content p-2 rounded-b-lg">
		<!-- Main container for currency options, displayed when not in recharge or withdraw mode -->
		<div v-if="!onRecharge && !onWithdraw" class="gridList">
			<!-- Loop through available currencies -->
			<div
				v-for="(currency, index) in currencies"
				:key="index"
				class="in w-full h-52 flex flex-col justify-between items-center p-4 bg-secondary-focus rounded-lg shadow-lg text-neutral-content border border-secondary-focus"
			>
				<!-- Currency details display -->
				<div
					class="w-full flex flex-col justify-center items-start gap-2"
				>
					<p class="font-bold text-2xl">{{ currency.moneda }}</p>
					<p class="text-lg text-white">$ {{ currency.creditos }}</p>
				</div>
				<!-- Buttons for recharge and withdraw actions -->
				<div class="join w-full">
					<button
						@click="
							onSelectCurrency(currency);
							onRecharge = true;
						"
						class="btn w-1/2 btn-success join-item rounded-r-none hover:bg-success/50"
						:data-analytics-label="'deposit:open'"
						:data-analytics-position="String(index + 1)"
						:data-analytics-context="`step:select-currency|step-num:0|currency:${currency.moneda}`"
					>
						{{ $t('Recarga') }}
					</button>
					<button
						@click="
							onSelectCurrency(currency);
							getProductWithdraw();
							onWithdraw = true;
						"
						class="btn w-1/2 btn-error join-item rounded-l-none hover:bg-error/50"
					>
						{{ $t('Retira') }}
					</button>
				</div>
			</div>
		</div>
		<!-- Recharge process container -->
		<div
			v-if="onRecharge"
			class="w-full flex flex-col justify-center items-center gap-2 text-neutral-content"
		>
			<!-- Method selection for recharge -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Selecciona método de recarga')
					}}</span>
					<font-awesome-icon
						v-if="step == 1"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Display payment methods if step 1 -->
				<div v-if="step == 1" class="gridList">
					<div
						v-for="(method, index) in metodos_pago"
						class="in w-full bg-white rounded-lg p-4 text-lg"
					>
						<p class="text-2xl font-bold">{{ method.pasarela }}</p>
						<p>{{ method.nombre }}</p>
						<button
							@click="onSelectMethod(method)"
							class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-secondary-content rounded-lg"
							:data-analytics-label="`deposit:method:${String( method.pasarela || method.nombre || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
							:data-analytics-position="String(index + 1)"
							:data-analytics-context="`step:select-method|step-num:1|method:${String( method.pasarela || method.nombre || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
						>
							{{ $t('Seleccionar') }}
						</button>
					</div>
				</div>
				<!-- Back button for recharge -->
				<div
					v-if="step == 1"
					class="w-full flex justify-end items-center mt-2"
				>
					<button
						@click="onRecharge = false"
						class="btn btn-error hover:bg-error/50"
						data-analytics-label="deposit:back"
						data-analytics-context="step:select-method|step-num:1"
					>
						{{ $t('Atras') }}
					</button>
				</div>
			</div>
			<!-- Data entry for recharge -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Ingrese los datos')
					}}</span>
					<font-awesome-icon
						v-if="step == 2"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Input fields for data entry if step 2 -->
				<div v-if="step == 2" class="flex flex-col gap-4">
					<div class="form-control w-full">
						<label class="label">
							<span class="label-text text-lg">{{
								$t('Monto ') + currencySelect.moneda
							}}</span>
							<span class="label-text-alt flex gap-4"
								><span class="">{{
									$t('Min: ') + methodSelect.min
								}}</span>
								<span v-if="methodSelect.max > 0" class="">{{
									$t('Max: ') + methodSelect.max
								}}</span></span
							>
						</label>
						<input
							@change="onChangeValueDeposit(valueDeposit)"
							v-model="valueDeposit.input"
							type="number"
							placeholder="$ 100"
							class="input input-bordered w-full text-black"
							:class="'border border-' + valueDeposit.color"
							data-analytics-label="deposit:amount-input"
							:data-analytics-context="`step:enter-amount|step-num:2|method:${String((methodSelect && (methodSelect.id || methodSelect.pasarela || methodSelect.nombre)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
						/>
						<label class="label">
							<span
								v-if="valueDeposit.message != ''"
								class="label-text-alt"
								:class="'text-' + valueDeposit.color"
								>{{ valueDeposit.msg }}</span
							>
						</label>
					</div>
					<div
						class="flex justify-between items-center flex-col sm:flex-row gap-4"
					>
						<!-- Operation number input -->
						<div class="form-control w-full">
							<label class="label">
								<span class="label-text text-lg">{{
									$t('Numero de la operacion')
								}}</span>
							</label>
							<input
								@change="
									onChangeOperationNumber(valueOperation)
								"
								v-model="valueOperation.input"
								type="number"
								placeholder="000"
								class="input input-bordered w-full text-black fill-black"
							/>
							<label class="label">
								<span
									v-if="valueOperation.msg != ''"
									class="label-text-alt"
									:class="'text-' + valueOperation.color"
									>{{ valueOperation.msg }}</span
								>
							</label>
						</div>
						<!-- Date input -->
						<div class="form-control w-full">
							<label class="label">
								<span class="label-text text-lg">{{
									$t('Fecha')
								}}</span>
							</label>
							<input
								@change="onChangeOperationDate(valueDate)"
								v-model="valueDate.input"
								type="date"
								placeholder="01-01-1999"
								class="input input-bordered w-full text-black fill-black"
							/>
							<label class="label">
								<span
									v-if="valueDate.msg != ''"
									class="label-text-alt"
									:class="'text-' + valueDate.color"
									>{{ valueDate.msg }}</span
								>
							</label>
						</div>
					</div>
					<!-- Navigation buttons for data entry -->
					<div class="flex justify-end items-center gap-4 mt-2">
						<button
							@click="step = 1"
							class="btn btn-error hover:bg-error/50"
							data-analytics-label="deposit:back"
							data-analytics-context="step:enter-amount|step-num:2"
						>
							{{ $t('Atras') }}
						</button>
						<button
							:disabled="disabledButton"
							@click="onSelectData()"
							class="btn btn-success hover:bg-success/50"
						>
							{{ $t('Siguiente') }}
						</button>
					</div>
				</div>
			</div>
			<!-- Verification of operation -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Verifica la operación')
					}}</span>
					<font-awesome-icon
						v-if="step == 3"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Display operation details if step 3 -->
				<div v-if="step == 3" class="flex flex-col gap-5">
					<div class="text-lg">
						<p class="">
							{{ $t('Usuario: ') }}
							<span class="uppercase">{{
								appComponent.session.nombre
							}}</span>
						</p>
						<p class="">
							{{ $t('Moneda: ') + currencySelect.moneda }}
						</p>
						<p class="">
							{{ $t('Monto: $') + valueDeposit.input }}
						</p>
						<p class="">
							{{
								'# ' + $t('Operacion: ') + valueOperation.input
							}}
						</p>
						<p class="">{{ $t('Fecha: ') + valueDate.input }}</p>
					</div>
					<!-- Navigation buttons for verification -->
					<div
						class="w-full flex justify-end items-center gap-4 mt-2"
					>
						<button
							@click="step = 2"
							class="btn btn-error hover:bg-error/50"
							data-analytics-label="deposit:back"
							data-analytics-context="step:confirm|step-num:3"
						>
							{{ $t('Atras') }}
						</button>
						<button
							@click="onSubmitFormDeposit()"
							class="btn btn-success hover:bg-success/50"
							data-analytics-label="deposit:confirm"
							:data-analytics-context="`step:confirm|step-num:3|method:${String((methodSelect && (methodSelect.id || methodSelect.pasarela || methodSelect.nombre)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
						>
							{{ $t('Enviar datos') }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Withdraw process container -->
		<div
			v-if="onWithdraw"
			class="w-full flex flex-col justify-center items-center gap-2 text-neutral-content"
		>
			<!-- Method selection for withdrawal -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Selecciona método de retiro')
					}}</span>
					<font-awesome-icon
						v-if="step == 1"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Display withdrawal methods if step 1 -->
				<div v-if="step == 1" class="gridList">
					<div
						v-if="methodsWithdraw.length > 0"
						v-for="method in methodsWithdraw"
						class="in w-full bg-secondary rounded-lg p-4 text-lg text-gray-400"
					>
						<p class="text-2xl font-bold text-white">
							{{ method.title }}
						</p>
						<p>{{ method.name }}</p>
						<p>{{ method.code }}</p>
						<p class="font-bold">{{ method.number }}</p>
						<p>{{ method.description }}</p>
						<button
							@click="onSelectMethod(method)"
							class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-neutral rounded-lg"
						>
							{{ $t('Seleccionar') }}
						</button>
					</div>
					<!-- Option to add more accounts -->
					<div
						@click="
							getBanks();
							onAddAcount = true;
						"
						class="in w-full flex justify-between items-center flex-col bg-secondary rounded-lg p-4 text-lg text-gray-400 cursor-pointer"
					>
						<div
							class="flex flex-col justify-center items-center gap-4 h-full"
						>
							<font-awesome-icon
								icon="fa-solid fa-plus"
								size="3x"
								class="font-bold text-neutral-content"
							/>
							<p class="font-bold">
								{{ $t('Agregar mas cuentas') }}
							</p>
						</div>
						<button
							class="btn btn-success w-full h-12 mt-5 hover:bg-success/50 text-neutral rounded-lg"
						>
							{{ $t('Agregar') }}
						</button>
					</div>
				</div>
				<!-- Back button for withdrawal -->
				<div
					v-if="step == 1"
					class="w-full flex justify-end items-center mt-2"
				>
					<button
						@click="onWithdraw = false"
						class="btn btn-error hover:bg-error/50"
					>
						{{ $t('Atras') }}
					</button>
				</div>
			</div>
			<!-- Data entry for withdrawal -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Ingrese los datos')
					}}</span>
					<font-awesome-icon
						v-if="step == 2"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Input fields for data entry if step 2 -->
				<div v-if="step == 2" class="flex flex-col gap-4">
					<div class="form-control w-full">
						<label class="label">
							<span
								class="label-text text-neutral-content text-lg"
								>{{ $t('Monto ') + currencySelect.code }}</span
							>
						</label>
						<input
							v-model="valueDeposit"
							type="number"
							placeholder="$ 100"
							class="input input-bordered w-full text-black"
						/>
					</div>
					<!-- Navigation buttons for data entry -->
					<div class="flex justify-end items-center gap-4 mt-2">
						<button
							@click="step = 1"
							class="btn btn-error hover:bg-error/50"
						>
							{{ $t('Atras') }}
						</button>
						<button
							@click="onSelectData()"
							class="btn btn-success hover:bg-success/50"
						>
							{{ $t('Siguiente') }}
						</button>
					</div>
				</div>
			</div>
			<!-- Verification of withdrawal operation -->
			<div class="w-full bg-secondary-focus rounded-lg py-2 px-4">
				<div class="w-full h-14 flex justify-between items-center">
					<span class="text-xl font-bold text-white">{{
						$t('Verifica la operación')
					}}</span>
					<font-awesome-icon
						v-if="step == 3"
						icon="fa-solid fa-chevron-up"
						size="1x"
						class="text-white"
					/>
					<font-awesome-icon
						v-else
						icon="fa-solid fa-chevron-down"
						size="1x"
						class="text-white"
					/>
				</div>
				<!-- Display operation details if step 3 -->
				<div v-if="step == 3" class="flex flex-col gap-5">
					<div class="text-lg text-gray-300">
						<p class="">
							{{ $t('Usuario: ') + appComponent.session.nombre }}
						</p>
						<p class="font-bold">{{ methodSelect.title }}</p>
						<p class="">{{ $t('Monto: ') + valueDeposit.input }}</p>
						<p class="">
							{{
								$t('Fecha: ') +
								new Date()
									.toLocaleDateString()
									.split('/')
									.join('-')
							}}
						</p>
					</div>
					<p>{{ $t('Tiempo de espera: ') }}</p>
					<!-- Navigation buttons for verification -->
					<div class="flex justify-end items-center gap-4 mt-2">
						<button
							@click="step = 2"
							class="btn btn-error hover:bg-error/50"
						>
							{{ $t('Atras') }}
						</button>
						<button
							@click="onSubmitFormWithdraw()"
							class="btn btn-success hover:bg-success/50"
						>
							{{ $t('Enviar datos') }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Add account modal -->
		<div
			v-if="onAddAcount"
			class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center"
		>
			<div
				class="in relative w-11/12 max-w-xl flex justify-center items-center flex-col gap-4 p-4 text-neutral-content rounded-box"
			>
				<div
					class="bg-secondary rounded-box w-full flex flex-col justify-center items-center gap-4"
				>
					<!-- Close button for the add account modal -->
					<button
						@click="onCloseAccountForm()"
						class="absolute top-2 right-2 z-[999]"
					>
						<ExitIcon
							:height="23"
							:width="23"
							:fill="'#ffffff'"
							:fill2="'#ee3b3f'"
						/>
					</button>
					<!-- Form for adding a bank account -->
					<AppForm
						:loading="loadingForm"
						:title="$t('Agregar cuenta bancaria')"
						:fields="fields"
						:styleWidth="widthForm"
						:arraySelects="arraySelects"
						:model="model"
						:textDown="textDownForm"
						:textButton="$t('Aceptar')"
						@onSubmit:form="onSubmitAccountForm($event)"
						@changeSelect:form="changeSelect($event)"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
/**
 * Vue component script section written in TypeScript.
 * This section contains the component's logic, data, methods, and lifecycle hooks.
 */
// Importing the defineComponent function from Vue for component definition
import { defineComponent } from 'vue';
// Importing the Button component from Flowbite Vue library
import { Button } from 'flowbite-vue';
// Importing the apiService for making API calls
import apiService from '@/services/ApiService';
// Importing useCookies for cookie management in Vue 3
import { useCookies } from 'vue3-cookies';
// Importing a custom form component
import AppForm from '@/components/Form.vue';
// Importing the useI18n function for internationalization support
import { useI18n } from 'vue-i18n';
// Importing a custom exit icon component
import ExitIcon from '@/components/icons/ExitIcon.vue';

// Exporting the component definition
export default defineComponent({
	/**
	 * Components used in the current Vue instance.
	 *
	 * @component ExitIcon - Icon component for exit functionality.
	 * @component AppForm - Form component for application input.
	 * @component Button - Button component for user interactions.
	 */
	components: { ExitIcon, AppForm, Button },
	/**
	 * Vue.js setup function for component initialization.
	 *
	 * @returns {Object} An object containing the cookies instance for use in the component.
	 */
	setup() {
		// Destructure the cookies object from the useCookies() hook
		const { cookies } = useCookies();

		// Return the cookies object to make it available in the component's template
		return { cookies };
	},
	data() {
		// Retrieve configuration settings
		let config = this.$config();
		// Get the event emitter instance
		let emitter = this.$emitter();
		// Reference to the application component
		let appComponent: any = this.$appComponent;
		// Flags for various operations
		let onRecharge: boolean = false; // Indicates if recharge is active
		let onWithdraw: boolean = false; // Indicates if withdrawal is active
		let onAddAcount: boolean = false; // Indicates if adding an account is active
		// Current step in the process
		let step: number = 1;
		// Selected currency and method
		let currencySelect: any = undefined;
		let methodSelect: any = undefined;
		// Button state
		let disabledButton: boolean = true; // Button is initially disabled
		// Text for form description
		let textDownForm: string = '';
		// Deposit value structure
		let valueDeposit: any = {
			input: '', // User input for deposit
			msg: '', // Message related to deposit
			color: '', // Color indication for deposit
			validate: false, // Validation state for deposit
		};
		// Operation value structure
		let valueOperation: any = {
			input: '', // User input for operation
			msg: '', // Message related to operation
			color: '', // Color indication for operation
			validate: false, // Validation state for operation
		};
		// User details
		let valueName: string = ''; // User's name
		let valueDni: string = ''; // User's DNI
		let valueBank: string = ''; // User's bank name
		let valueNumberAccount: number = 0; // User's account number
		let valueCurrency: string = ''; // Selected currency
		// Date value structure
		let valueDate: any = {
			input: '', // User input for date
			msg: '', // Message related to date
			color: '', // Color indication for date
			validate: false, // Validation state for date
		};
		// Available currencies
		let currencies: any = [];
		// Fields configuration based on the country
		let fields: any =
			this.$config() != undefined &&
			this.$config().cuentasBancaria != undefined &&
			this.$config().cuentasBancaria.form != undefined &&
			this.$config().cuentasBancaria.form[
				this.$appComponent['country']
			] != undefined
				? this.$config().cuentasBancaria.form[
						this.$appComponent['country']
					]
				: []; // Fallback to empty array if not defined
		// Available deposit and withdrawal methods
		let methodsDeposit: any = [];
		let methodsWithdraw: any = [];
		// Types of accounts
		let typesAccount: any = [];
		// Flags and models for payment methods
		let flag_m: any = [];
		let model: any = [];
		let metodos_pago: any = []; // Payment methods
		let pasarelas_pago: any = []; // Payment gateways
		let pasarelas_pago_v2: any = []; // Version 2 of payment gateways
		let config_methods: any = []; // Configuration for methods
		let cant_metodos_online: any = 0; // Count of online methods
		let arraySelects: any = {}; // Object to hold select options
		// Modal visibility flags
		let showModalVerifyCodePhone: boolean = false; // Modal for phone verification
		let showModalDataText: boolean = false; // Modal for displaying data text
		let showModalNeedApproval: boolean = false; // Modal for approval requirement
		let showModalAddCard: boolean = false; // Modal for adding a card
		// Verification details
		let emailVerifyPhone: string = ''; // Email for phone verification
		let codeVerifyPhone: string = ''; // Verification code for phone
		// Modal data
		let orderModal: string = ''; // Order information for modal
		let dataText: string = ''; // Text data for modal
		let dataTitle: string = ''; // Title for modal
		let dataImg: string = ''; // Image for modal
		// Loading state for form
		let loadingForm = false; // Indicates if the form is loading
		let widthForm: boolean = false; // Indicates if the form width is adjusted
		// Internationalization message merging
		let { mergeLocaleMessage } = useI18n({ useScope: 'global' });
		let arraySelectsOrigin: any = {}; // Original select options
		// Return all data properties for the component
		return {
			config,
			emitter,
			appComponent,
			currencies,
			onRecharge,
			onWithdraw,
			onAddAcount,
			step,
			arraySelects,
			methodsDeposit,
			methodsWithdraw,
			currencySelect,
			methodSelect,
			valueDeposit,
			valueOperation,
			valueDate,
			valueName,
			valueDni,
			valueBank,
			valueNumberAccount,
			valueCurrency,
			flag_m,
			model,
			metodos_pago,
			pasarelas_pago,
			pasarelas_pago_v2,
			config_methods,
			cant_metodos_online,
			disabledButton,
			showModalVerifyCodePhone,
			showModalDataText,
			showModalNeedApproval,
			showModalAddCard,
			emailVerifyPhone,
			codeVerifyPhone,
			orderModal,
			dataText,
			dataTitle,
			dataImg,
			loadingForm,
			fields,
			widthForm,
			textDownForm,
			mergeLocaleMessage,
			arraySelectsOrigin,
			typesAccount,
		};
	},
	methods: {
		/**
		 * Handles changes in the deposit value input.
		 * @param {any} e - The event object containing input data.
		 */
		onChangeValueDeposit(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Set message for empty input
				e.color = 'yellow-300'; // Set color for warning
				e.validate = false; // Mark as invalid
			} else if (e.input < this.methodSelect.min) {
				e.msg = this.$t('El valor no supera el minimo permitido'); // Set message for minimum value not met
				e.color = 'red-600'; // Set color for error
				e.validate = false; // Mark as invalid
			} else if (
				this.methodSelect.max > 0 &&
				e.input > this.methodSelect.max
			) {
				e.msg = this.$t('El valor supera el minimo permitido'); // Set message for exceeding maximum value
				e.color = 'red-600'; // Set color for error
				e.validate = false; // Mark as invalid
			} else {
				e.msg = ''; // Clear message for valid input
				e.color = 'green-600'; // Set color for success
				e.validate = true; // Mark as valid
			}
			// Enable button if all validations are true
			if (
				this.valueDeposit.validate &&
				this.valueOperation.validate &&
				this.valueDate.validate
			) {
				this.disabledButton = false; // Enable button
			}
		},
		/**
		 * Handles changes in the operation number input.
		 * @param {any} e - The event object containing input data.
		 */
		onChangeOperationNumber(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Set message for empty input
				e.color = 'yellow-300'; // Set color for warning
				e.validate = false; // Mark as invalid
			} else if (e.input <= 0) {
				e.msg = this.$t('El valor no supera el minimo permitido'); // Set message for minimum value not met
				e.color = 'red-600'; // Set color for error
				e.validate = false; // Mark as invalid
			} else {
				e.msg = ''; // Clear message for valid input
				e.color = 'green-600'; // Set color for success
				e.validate = true; // Mark as valid
			}
			// Enable button if all validations are true
			if (
				this.valueDeposit.validate &&
				this.valueOperation.validate &&
				this.valueDate.validate
			) {
				this.disabledButton = false; // Enable button
			}
		},
		/**
		 * Handles changes in the operation date input.
		 * @param {any} e - The event object containing input data.
		 */
		onChangeOperationDate(e: any) {
			if (e.input == '') {
				e.msg = this.$t('El campo se encuentra en blanco'); // Set message for empty input
				e.color = 'yellow-300'; // Set color for warning
				e.validate = false; // Mark as invalid
			} else {
				e.msg = ''; // Clear message for valid input
				e.color = 'green-600'; // Set color for success
				e.validate = true; // Mark as valid
			}
			// Enable button if all validations are true
			if (
				this.valueDeposit.validate &&
				this.valueOperation.validate &&
				this.valueDate.validate
			) {
				this.disabledButton = false; // Enable button
			}
		},
		/**
		 * Handles currency selection.
		 * @param {any} item - The selected currency item.
		 */
		onSelectCurrency(item) {
			console.log(item); // Log selected currency
			this.currencySelect = item; // Set selected currency
		},
		/**
		 * Handles method selection.
		 * @param {any} item - The selected method item.
		 */
		onSelectMethod(item) {
			console.log(item); // Log selected method
			this.methodSelect = item; // Set selected method
			this.step = 2; // Move to the next step
		},
		/**
		 * Handles the selection of data for the next step.
		 */
		onSelectData() {
			console.log('paso 3 finalizado'); // Log step completion
			// Move to the next step if all validations are true
			if (
				this.valueDeposit.validate &&
				this.valueOperation.validate &&
				this.valueDate.validate
			) {
				this.step = 3; // Move to step 3
			} else {
				this.onChangeValueDeposit(this.valueDeposit); // Re-validate deposit value
			}
		},
		/**
		 * Submits the deposit form.
		 */
		onSubmitFormDeposit() {
			const params = {
				operation_number: this.valueOperation.input, // Operation number input
				date: this.valueDate.input, // Date input
				amount: this.valueDeposit.input, // Deposit amount input
				payer: {
					status_urls: {
						cancel: 'https://doradobet.com/gestion/deposito/pendiente', // URL for cancellation
						fail: 'https://doradobet.com/gestion/deposito/error', // URL for failure
						success:
							'https://doradobet.com/gestion/deposito/correcto', // URL for success
					},
					forProduct: 'casino', // Product type
					'1tap': true, // One tap payment option
				},
				service: this.methodSelect.id, // Selected method ID
				vs_utm_campaign: null, // Campaign parameter
				vs_utm_campaign2: null, // Second campaign parameter
			};
			console.log(params); // Log parameters for submission
			apiService.request('deposit', params).then((response: any) => {
				console.log(response); // Log response from API
				if (response.code == 0) {
					this.appComponent.modal = {
						showModal: 'notification', // Show notification modal
						titleModal: this.$t('Deposito'), // Modal title
						messageModal: this.$t('Se ha relializado con exito.'), // Success message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Modal action
					};
					// Reset input fields and disable button
					this.valueDeposit.input = 0;
					this.valueOperation.input = 0;
					this.valueDate.input = '';
					this.disabledButton = true;
					this.onRecharge = false; // Reset recharge flag
					this.step = 1; // Reset step
				} else {
					var error_mensaje = ''; // Initialize error message
					error_mensaje = this.$t(
						'ERROR' + response.error_code.toString() // Set error message based on error code
					);
					if (error_mensaje == '') {
						error_mensaje = this.$t('ERROR_GENERAL'); // Set general error message if none found
					}
					this.appComponent.modal = {
						showModal: 'notification', // Show notification modal
						titleModal: this.$t('Error!'), // Modal title
						messageModal: error_mensaje, // Error message
						buttonModal: this.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Modal action
					};
					// Reset input fields and disable button
					this.valueDeposit.input = 0;
					this.valueOperation.input = 0;
					this.valueDate.input = '';
					this.disabledButton = true;
					this.onRecharge = false; // Reset recharge flag
					this.step = 1; // Reset step
				}
			});
		},
		/**
		 * Submits the withdrawal form.
		 */
		onSubmitFormWithdraw() {
			console.log(
				'paso 4 finalizado: ',
				this.valueDeposit,
				this.valueOperation,
				this.valueDate
			); // Log step completion and values
			this.onRecharge = false; // Reset recharge flag
			this.step = 1; // Reset step
		},
		/**
		 * Submits the account form with provided values.
		 * @param {any} values - The account form values.
		 */
		onSubmitAccountForm(values: any) {
			values.bank != undefined
				? (values.bank = this.arraySelects['bankList'].filter(
						(x) => x.Id == values.bank
					)[0]) // Set bank value based on selection
				: (values.bank = null); // Set bank to null if undefined
			values.account_type != undefined
				? (values.account_type = this.arraySelects[
						'accountTypeList'
					].filter(
						(x) =>
							x.Id == values.account_type ||
							x.value == values.account_type
					)[0]) // Set account type based on selection
				: (values.account_type = null); // Set account type to null if undefined
			values.client_type != undefined
				? (values.client_type = this.arraySelects[
						'clientTypeList'
					].filter((x) => x.Id == values.client_type)[0]) // Set client type based on selection
				: (values.client_type = null); // Set client type to null if undefined
			if (values.account_type != null) {
				values.account_type.Id = values.account_type.value; // Set ID for account type
				values.account_type.Name = values.account_type.name; // Set name for account type
			}
			apiService
				.request('save_user_bank', values) // Send request to save bank details
				.then((response: any) => {
					if (response.code == 0) {
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Mensaje'), // Modal title
							messageModal: this.$t(
								'Cuenta bancaria guardada satisfactoriamente.' // Success message
							),
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Modal action
						};
					} else {
						var error_mensaje = ''; // Initialize error message
						error_mensaje = this.$t(
							'ERROR' + response.error_code.toString() // Set error message based on error code
						);
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Set general error message if none found
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Modal title
							messageModal: error_mensaje, // Error message
							buttonModal: this.$t('Aceptar'), // Button text
							orderModal: 'closeModal', // Modal action
						};
					}
				});
		},
		/**
		 * Closes the account form and resets values.
		 */
		onCloseAccountForm() {
			this.onAddAcount = false; // Reset add account flag
			this.valueName = ''; // Clear name input
			this.valueDni = ''; // Clear DNI input
			this.valueBank = ''; // Clear bank input
			this.valueNumberAccount = 0; // Reset account number
			this.valueCurrency = ''; // Clear currency input
		},
		/**
		 * Fetches available deposit methods from the API.
		 */
		getMethodsDeposit() {
			apiService.request('get_payments2', {}).then((response: any) => {
				console.log(response); // Log response from API
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].max = response.data[i].max.replace(
							/[&\/\\#,+()$~%.'":*?<>{}]/g,
							'' // Sanitize max value
						);
						response.data[i].min = response.data[i].min.replace(
							/[&\/\\#,+()$~%.'":*?<>{}]/g,
							'' // Sanitize min value
						);
						this.model[response.data[i].id] =
							response.data[i].valor; // Map method ID to value
					}
					this.flag_m = true; // Set flag for methods loaded
					this.metodos_pago = response.data; // Store payment methods
					this.pasarelas_pago = []; // Initialize payment gateways
					for (const item of this.metodos_pago) {
						let customObj = {
							id: item.id_pasarela, // Gateway ID
							img: item.pasarela, // Gateway image
						};
						this.pasarelas_pago.push(customObj); // Add to gateways list
						var hash = {};
						this.pasarelas_pago = this.pasarelas_pago.filter(
							function (current) {
								var exists = !hash[current.id]; // Filter duplicates
								hash[current.id] = true; // Track existing IDs
								return exists;
							}
						);
					}
					this.metodos_pago.forEach((element) => {
						if (element.tag) {
							element.tag.forEach((item) =>
								this.pasarelas_pago_v2.push({
									id: item, // Add tag ID to gateways
									pasarela: element, // Add method element
								})
							);
						} else {
							this.pasarelas_pago_v2.push({
								id: '', // Default ID for non-tagged methods
								pasarela: element, // Add method element
							});
						}
					});
					this.pasarelas_pago_v2 = this.pasarelas_pago_v2.reduce(
						function (results, org) {
							if (org.id) {
								const existing = results.find(
									(item) => item.id === org.id // Check for existing ID
								);
								if (existing) {
									existing.pasarelas.push(org); // Add to existing entry
								} else {
									results.push({
										id: org.id, // Create new entry
										pasarelas: [org],
									});
								}
							} else {
								results.push({ id: '', pasarelas: [org] }); // Add default entry
							}
							return results; // Return accumulated results
						},
						[]
					);
					this.config_methods = []; // Initialize configurable methods
					this.metodos_pago.forEach((value) => {
						if (!value.isInfo && value.id != 'coupons') {
							this.cant_metodos_online =
								this.cant_metodos_online + 1; // Count online methods
						}
						if (
							value.isConfigurable != undefined &&
							value.isConfigurable == true
						) {
							this.config_methods.push(value); // Add to configurable methods
						}
					});
					this.metodos_pago = this.metodos_pago.filter((item) => {
						return (
							item.isConfigurable == undefined ||
							item.isConfigurable == false // Filter out configurable methods
						);
					});
				} else {
					if (
						this.config.coupons[this.appComponent.country] !=
							undefined &&
						this.config.coupons[this.appComponent.country].show !=
							undefined &&
						this.config.coupons[this.appComponent.country].show
					) {
						this.metodos_pago.unshift({
							id: 'coupons', // Add coupons method if applicable
							imagen: '',
							max: '0',
							min: '0',
							nombre: 'Cupón', // Name for coupons
							pasarela: '',
							tiempo: null,
							valor: null,
						});
					}
				}
			});
		},
		/**
		 * Fetches available currencies from the API.
		 */
		getCurrencies() {
			apiService.request('user_currency', {}).then((response: any) => {
				console.log(response); // Log response from API
				if (response.code === 0) {
					if (response.data.length > 0) {
						this.currencies = response.data; // Store currencies
					}
				}
			});
		},
		/**
		 * Fetches available banks from the API.
		 */
		getBanks() {
			apiService.request('get_banks', {}).then((response: any) => {
				console.log(response); // Log response from API
				if (response.code == 0) {
					for (var i = 0; i < response.data.length; i++) {
						response.data[i].value = response.data[i].Id; // Set value for bank
						response.data[i].name = response.data[i].Name; // Set name for bank
					}
					this.loadingForm = true; // Set loading state
					Object.assign(this.arraySelects, {
						bankList: response.data, // Store bank list
					});
				}
			});
		},
		/**
		 * Fetches available withdrawal products from the API.
		 */
		getProductWithdraw() {
			apiService
				.request('get_product_withdraw', {})
				.then((response: any) => {
					console.log(response); // Log response from API
					if (response.code == 0) {
						this.methodsWithdraw = response.data; // Store withdrawal methods
						response.data.forEach((item) => {
							this.methodsWithdraw.push(item); // Add methods to withdrawal list
						});
					}
				});
		},
		/**
		 * Handles changes in the select input.
		 * @param {any} event - The event object containing select data.
		 */
		changeSelect(event: any) {
			let value = event.event.target.value; // Get selected value
			let optionsKey = event.optionsKey; // Get options key
			if (optionsKey == 'bankList') {
				Object.assign(this.arraySelects, {
					branchesList:
						this.arraySelects[optionsKey][
							this.arraySelects[optionsKey].findIndex(
								(i: { Id: string }) => i.Id === value
							)
						].branches, // Set branches based on selected bank
				});
				this.model['branch'] = ''; // Reset branch model
				Object.assign(this.arraySelects, {
					interbankCodesList:
						this.arraySelects[optionsKey][
							this.arraySelects[optionsKey].findIndex(
								(i: { Id: string }) => i.Id === value
							)
						].interbankCodes, // Set interbank codes based on selected bank
				});
				this.model['cod_interbank'] = ''; // Reset interbank code model
				this.model['cod_interbank2'] = ''; // Reset second interbank code model
				if (value == '314') {
					Object.assign(this.arraySelects, {
						accountTypeList: [
							{
								name: 'CPF', // Account type name
								value: '0', // Account type value
							},
							{
								name: 'Email', // Account type name
								value: '1', // Account type value
							},
							{
								name: 'Celular', // Account type name
								value: '2', // Account type value
							},
							{
								name: 'Chave Ale', // Account type name
								value: '3', // Account type value
							},
						],
					});
					this.mergeLocaleMessage('pt', {
						'Número de cuenta': 'Chave PIX', // Localized message for account number
						'Tipo de cuenta': 'Tipo de chave PIX', // Localized message for account type
						'Confirmar número de cuenta': 'Confirmar chave PIX', // Localized message for confirming account number
					});
				} else {
					Object.assign(this.arraySelects, {
						accountTypeList:
							this.arraySelectsOrigin['accountTypeList'], // Reset account type list
					});
					this.mergeLocaleMessage('pt', {
						'Número de cuenta': 'Numero de conta', // Localized message for account number
						'Tipo de cuenta': 'Tipo De Conta', // Localized message for account type
						'Confirmar número de cuenta':
							'Confirmar o número da conta', // Localized message for confirming account number
					});
				}
			}
		},
	},
	/**
	 * Lifecycle hook that is called before the component is mounted.
	 * This is where you can perform actions before the component is rendered.
	 */
	beforeMount() {
		// Calls the method to fetch available currencies.
		this.getCurrencies();
	},
	mounted() {
		/**
		 * Initializes the widthForm property based on the configuration
		 * for the current country. If the widthF property is not defined,
		 * it defaults to false.
		 */
		this.widthForm =
			this.config != undefined &&
			this.config.cuentasBancaria != undefined &&
			this.config.cuentasBancaria[this.appComponent.country] !=
				undefined &&
			this.config.cuentasBancaria[this.appComponent.country].widthF !=
				undefined
				? this.config.cuentasBancaria[this.appComponent.country].widthF
				: false;

		/**
		 * Sets the textDownForm property if the corresponding text
		 * for the current country is defined in the configuration.
		 */
		if (
			this.config != undefined &&
			this.config.cuentasBancaria != undefined &&
			this.config.cuentasBancaria[this.appComponent.country] !=
				undefined &&
			this.config.cuentasBancaria[this.appComponent.country]
				.textCuentasBancaria1 != undefined
		) {
			this.textDownForm =
				this.config.cuentasBancaria[
					this.appComponent.country
				].textCuentasBancaria1;
		}

		/**
		 * Iterates over the fields array to process select type fields.
		 * For each option in the select fields, it assigns Id and Name
		 * properties and adds them to the arraySelects object.
		 */
		this.fields.forEach((field) => {
			if (
				field.type == 'select' &&
				field.options != undefined &&
				field.options.length > 0
			) {
				field.options.forEach((opt) => {
					opt.Id = opt.value; // Assigns the value to Id
					opt.Name = opt.name; // Assigns the name to Name
				});
				let options: object = {};
				options[field.optionsKey] = field.options; // Creates an options object
				Object.assign(this.arraySelects, options); // Merges options into arraySelects
			}
		});

		/**
		 * Calls the method to retrieve deposit methods.
		 */
		this.getMethodsDeposit();
	},
});
</script>
<style scoped>
/* Scoped styles for the component to prevent style leakage */
/* Container for a grid layout */
.gridList {
	/* Defines a grid display */
	display: grid;
	/* Creates responsive columns that fill the available space */
	grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
	/* Centers the content within the grid */
	place-content: center;
	/* Sets the gap between grid items */
	gap: 10px;
}

/* Media query for larger screens */
@media (min-width: 800px) {
	.gridList {
		/* Defines a fixed number of columns for larger screens */
		grid-template-columns: repeat(3, minmax(15rem, 1fr));
	}
}
</style>

<!-- FILE DOCUMENTED -->

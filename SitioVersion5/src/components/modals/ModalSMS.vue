<script lang="ts">
import { defineComponent, toRaw } from 'vue'; // Import necessary functions from Vue
import apiService from '@/services/ApiService'; // Import API service for making requests
import { useModalStore } from '@/stores/modal'; // Import modal store for managing modal state

export default defineComponent({
	props: {
		dataInfo: Object, // Prop to receive data information
	},
	data() {
		let emitter = this.$emitter(); // Initialize event emitter
		let appComponent: any = this.$appComponent; // Reference to the app component
		let data: any = this.dataInfo; // Data from props
		let data1: any; // Input data for verification
		let data2: any; // Input data for verification
		let data3: any; // Input data for verification
		let data4: any; // Input data for verification
		let data5: any; // Input data for verification
		let data6: any; // Input data for verification
		let resend: any; // Flag to indicate if resend is allowed
		const modalStore = useModalStore(); // Access modal store
		return {
			emitter,
			appComponent,
			data,
			data1,
			data2,
			data3,
			data4,
			data5,
			data6,
			resend,
			modalStore,
		};
	},
	methods: {
		/**
		 * Handles keyboard actions for input fields.
		 * @param {KeyboardEvent} e - The keyboard event.
		 */
		actionKey(e) {
			if (this.data?.code != undefined && this.data?.code) {
				const form: any = document.querySelector('form'); // Select the form element
				const inputs = form.querySelectorAll('input'); // Get all input fields
				const vthis = this; // Reference to the Vue instance
				const KEYBOARDS = {
					backspace: 8, // Key code for backspace
					arrowLeft: 37, // Key code for left arrow
					arrowRight: 39, // Key code for right arrow
				};

				// Function to handle input focus and navigation
				function handleInput(e) {
					const input = e.target;
					const nextInput = input.nextElementSibling;
					if (nextInput && input.value) {
						nextInput.focus(); // Focus on the next input
						if (nextInput.value) {
							nextInput.select(); // Select the next input value
						}
					}
				}

				// Function to handle paste events
				function handlePaste(e) {
					e.preventDefault(); // Prevent default paste behavior
					const paste = e.clipboardData.getData('text'); // Get pasted text
					inputs.forEach((input, i) => {
						input.value = paste[i] || ''; // Fill inputs with pasted values
					});
				}

				// Function to handle backspace key
				function handleBackspace(e) {
					e.preventDefault(); // Prevent default backspace behavior
					const input = e.target;
					if (input.id) {
						switch (input.id) {
							case 'data1':
								vthis.data1 = ''; // Clear data1
								break;
							case 'data2':
								vthis.data2 = ''; // Clear data2
								break;
							case 'data3':
								vthis.data3 = ''; // Clear data3
								break;
							case 'data4':
								vthis.data4 = ''; // Clear data4
								break;
							case 'data5':
								vthis.data5 = ''; // Clear data5
								break;
							case 'data6':
								vthis.data6 = ''; // Clear data6
								break;
						}
						input.previousElementSibling?.focus(); // Focus on the previous input
					}
				}

				// Function to handle left arrow key
				function handleArrowLeft(e) {
					const previousInput = e.target.previousElementSibling;
					if (!previousInput) return; // Exit if no previous input
					previousInput.focus(); // Focus on the previous input
				}

				// Function to handle right arrow key
				function handleArrowRight(e) {
					const nextInput = e.target.nextElementSibling;
					if (!nextInput) return; // Exit if no next input
					nextInput.focus(); // Focus on the next input
				}

				form.addEventListener('input', handleInput); // Add input event listener
				inputs[0].addEventListener('paste', handlePaste); // Add paste event listener to the first input
				inputs.forEach((input) => {
					input.addEventListener('focus', (e) => {
						e.target?.select(); // Select input value on focus
					});
					switch (e.keyCode) {
						case KEYBOARDS.backspace:
							handleBackspace(e); // Handle backspace
							break;
						case KEYBOARDS.arrowLeft:
							handleArrowLeft(e); // Handle left arrow
							break;
						case KEYBOARDS.arrowRight:
							handleArrowRight(e); // Handle right arrow
							break;
						default:
					}
				});
			}
		},

		/**
		 * Sends phone verification request.
		 */
		sendPhoneVerification() {
			apiService
				.request('send_phone_verification', {}) // Request to send phone verification
				.then((response: any) => {
					if (response.code == 0) {
						this.data = {
							title: 'Verificar código', // Title for verification
							text: 'Te enviamos un código al número de celular registrado', // Verification message
							buttonText: 'Verificar', // Button text for verification
							img2: 'https://images.virtualsoft.tech/m/msjT1680297729.png', // Image for verification
							code: true, // Set code flag to true
							time: 1 * 60 * 1000, // Set verification time
						};
					} else {
						var error_mensaje = ''; // Initialize error message
						if (response.error_code != undefined) {
							error_mensaje = this.$t(
								'ERROR' + response.error_code.toString() // Translate error message
							);
						}
						if (error_mensaje == '') {
							error_mensaje = this.$t(
								'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde' // Default error message
							);
						}
						this.appComponent.modal = {
							showModal: 'notification', // Show notification modal
							titleModal: this.$t('Error!'), // Modal title
							messageModal: error_mensaje, // Modal message
							buttonModal: this.$t('Aceptar'), // Modal button text
							orderModal: 'closeModal', // Modal close order
						};
					}
				});
		},

		/**
		 * Handles expiration of verification code.
		 */
		endTime() {
			if (
				this.data.codeSend !== undefined &&
				this.data.codeSend === 'email'
			) {
				this.data = {
					title: 'Código expirado', // Expired code title
					text: this.$t('El código ha expirado'), // Expired code message
					img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for expired code
					code: false, // Set code flag to false
				};
				this.emitter.emit('step:error'); // Emit error event
			} else {
				this.resend = true; // Allow resend
			}
		},

		/**
		 * Validates the phone verification code.
		 */
		validatePhone() {
			if (
				(this.data1 &&
					this.data2 &&
					this.data3 &&
					this.data4 &&
					this.data5 &&
					this.data6) != undefined
			) {
				const params = {
					code: this.data1.concat(
						this.data2,
						this.data3,
						this.data4,
						this.data5,
						this.data6
					), // Concatenate input values to form the code
				};
				if (
					this.data.codeSend !== undefined &&
					this.data.codeSend === 'email'
				) {
					this.appComponent.showModal3Image = false; // Hide modal image
					this.modalStore.reset(); // Reset modal store
					params['WithdrawId'] = this.data.WithdrawId; // Add WithdrawId to params
					params['service'] = this.data.service; // Add service to params
					apiService
						.request('validate_withdrawal', params) // Request to validate withdrawal
						.then((response: any) => {
							if (response.code == 0) {
								this.data = {
									title: 'Verifición exitosa', // Successful verification title
									background:
										'https://images.virtualsoft.tech/m/msjT1680296670.png', // Background image for success
									img: 'https://images.virtualsoft.tech/m/msjT1680296533.png', // Image for success
									code: false, // Set code flag to false
								};
								this.appComponent.saveResponseWithdrawal =
									response; // Save withdrawal response
								this.emitter.emit('step:3'); // Emit step 3 event
								this.emitter.emit('step:finish'); // Emit finish event
							} else {
								if (response.error_code == 300059) {
									this.data = {
										title: 'Código incorrecto', // Incorrect code title
										text: this.$t(
											'El código ingresado es incorrecto, por favor genere la nota de retiro nuevamente.' // Incorrect code message
										),
										img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for incorrect code
										code: false, // Set code flag to false
									};
								} else if (response.error_code == 300058) {
									this.data = {
										title: 'Nota de retiro invalida', // Invalid withdrawal note title
										text: this.$t(
											'No existe nota de retiro por validar con código OTP.' // Invalid withdrawal note message
										),
										img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for invalid note
										code: false, // Set code flag to false
									};
								} else if (response.error_code == 300057) {
									this.data = {
										title: 'Código expirado', // Expired code title
										text: this.$t(
											'Nota de retiro expirada por tiempo de codigo OTP.' // Expired code message
										),
										img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for expired code
										code: false, // Set code flag to false
									};
								} else {
									let error_mensaje = ''; // Initialize error message
									if (response.error_code != undefined) {
										error_mensaje = this.$t(
											'ERROR' +
												response.error_code.toString() // Translate error message
										);
									}
									this.data = {
										title: 'Código incorrecto', // Incorrect code title
										text: error_mensaje, // Error message
										img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for incorrect code
										code: false, // Set code flag to false
									};
								}
								this.emitter.emit('step:error'); // Emit error event
								this.emitter.emit('step:error2'); // Emit additional error event
							}
						});
				} else {
					apiService
						.request('validate_phone', params) // Request to validate phone
						.then((response: any) => {
							if (response.code == 0) {
								this.data = {
									title: 'Verifición exitosa', // Successful verification title
									background:
										'https://images.virtualsoft.tech/m/msjT1680296670.png', // Background image for success
									img: 'https://images.virtualsoft.tech/m/msjT1680296533.png', // Image for success
									code: false, // Set code flag to false
								};
							} else {
								var error_mensaje = ''; // Initialize error message
								if (response.error_code != undefined) {
									error_mensaje = this.$t(
										'ERROR' + response.error_code.toString() // Translate error message
									);
								}
								this.data = {
									title: 'Código incorrecto', // Incorrect code title
									text: error_mensaje, // Error message
									img: 'https://images.virtualsoft.tech/m/msjT1680528263.png', // Image for incorrect code
									code: false, // Set code flag to false
								};
							}
						});
				}
			}
		},

		/**
		 * Closes the modal.
		 */
		close() {
			this.appComponent.closeModal(); // Close the modal
		},

		/**
		 * Emits accept event for the modal.
		 */
		accept() {
			this.emitter.emit('accept:modal'); // Emit accept event
		},
	},
});
</script>
<template>
	<!-- Main modal container -->
	<div v-if="appComponent.config.layout != 3" class="modal z-[999999999]">
		<!-- General container for modal content -->
		<div
			class="container-general w-11/12 max-w-3xl flex flex-col justify-center items-center"
		>
			<!-- Container for image and text -->
			<div
				class="container-img-text w-11/12 max-w-3xl overflow-y-auto containar rounded-3xl relative bg-base-300"
			>
				<!-- Background image container -->
				<div class="absolute h-3/6 w-full">
					<img
						v-if="data?.background != undefined"
						:src="data?.background"
						alt=""
						class="w-full h-full object-cover"
					/>
				</div>
				<!-- Promotion image container -->
				<div class="promotion-image w-full h-full shadow-md relative">
					<!-- Close button -->
					<label
						@click="close()"
						class="close-btn btn btn-sm btn-circle bg-[#e14644] absolute text-lg top-2 right-4 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
						>✕</label
					>
				</div>
				<!-- Paragraph and image container -->
				<div
					class="paragraph-image h-auto w-11/14 m-4 overflow-y-auto flex flex-col items-center"
				>
					<img
						v-if="data?.img"
						:src="data?.img"
						alt=""
						width="145"
						height="145"
						class="my-8 z-1"
					/>
					<p
						v-if="data?.title != undefined"
						class="p-4 text-neutral font-poppinsm text-3xl md:text-3xl text-center z-1"
					>
						{{ $t(data?.title) }}
						<!-- Title of the modal -->
					</p>
					<p
						v-if="data?.text != undefined"
						class="p-4 text-neutral font-poppinssl text-base md:text-lg text-center z-1"
						v-html="$t(data?.text)"
					></p>
					<!-- Verification code input section -->
					<div v-if="data?.code != undefined && data?.code">
						<form action="#" class="text-neutral">
							<div
								class="flex justify-center items-center md:gap-6 gap-2 mb-3 text-black"
							>
								<!-- Input fields for verification code -->
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data1"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data1"
								/>
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data2"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data2"
								/>
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data3"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data3"
								/>
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data4"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data4"
								/>
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data5"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data5"
								/>
								<input
									type="tel"
									maxlength="1"
									pattern="[0-9]"
									id="data6"
									class="form-control"
									@keydown="actionKey($event)"
									placeholder="-"
									v-model="data6"
								/>
							</div>
						</form>
						<!-- Resend and countdown section -->
						<div class="w-full flex justify-center items-center">
							<img
								v-if="data?.img2"
								:src="data?.img2"
								alt=""
								width="145"
								height="145"
								class="w-[80px] md:w-[145px] z-1 object-contain"
							/>
							<div
								class="w-3/5 flex flex-col justify-center items-center"
							>
								<div class="flex justify-center items-center">
									<button
										@click="sendPhoneVerification()"
										v-if="
											data?.buttonText != undefined &&
											resend
										"
										class="bg-white border-solid resend-button border-2 border-black px-6 py-3 font-poppinssl rounded-2xl text-black transition ease-in-out hover:scale-105 my-4"
									>
										{{ $t('Reenviar código') }}
										<!-- Resend code button -->
									</button>
									<p
										v-if="
											data?.text != undefined && !resend
										"
										class="p-4 text-red-600 font-poppinsm text-base md:text-lg text-center z-1"
									>
										{{ $t('Tu código vence en ') }}
										<!-- Countdown message -->
									</p>
									<vue-countdown
										v-if="
											!resend && data?.time != undefined
										"
										:time="data?.time"
										:interval="100"
										v-slot="{
											days,
											hours,
											minutes,
											seconds,
										}"
										@end="endTime()"
										class="text-red-600 font-poppinsm text-base md:text-lg text-center z-1"
									>
										{{ minutes }} : {{ seconds }}
										<!-- Countdown display -->
									</vue-countdown>
								</div>
								<button
									@click="validatePhone()"
									v-if="data?.buttonText != undefined"
									class="bg-success border-solid submit-button border-2 border-success px-6 py-3 font-poppinssl rounded-2xl text-white transition ease-in-out hover:scale-105 my-4"
								>
									{{ $t(data.buttonText) }}
									<!-- Validate button -->
								</button>
							</div>
							<div class="md:w-[150px] w-0"></div>
						</div>
					</div>
					<!-- Button for sending phone verification if code is not required -->
					<button
						@click="sendPhoneVerification()"
						v-if="data?.buttonText != undefined && !data?.code"
						class="bg-success border-solid submit-button border-2 border-success px-6 py-3 font-poppinssl rounded-2xl text-white transition ease-in-out hover:scale-105 my-4"
					>
						{{ $t(data.buttonText) }}
						<!-- Send verification button -->
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Teleport for modal layout -->
	<Teleport to="body">
		<dialog
			v-if="
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 3
			"
			class="modal in w-screen h-screen bg-black/80"
		>
			<div
				class="relative rounded-box min-w-[370px] max-w-[50%] min-h-[270px] max-h-[75%] overflow-y-auto text-base-300"
			>
				<!-- Close button for dialog -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral z-50"
					@click="close()"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<h3 class="w-full p-4 bg-secondary text-xl font-bold text-neutral">
					{{ $t('SMS') }}
					<!-- Title for SMS dialog -->
				</h3>
				<div
					class="bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<!-- Background image container for dialog -->
					<div class="absolute h-3/6 w-full 2">
						<img
							v-if="data?.background != undefined"
							:src="data?.background"
							alt=""
							class="w-full h-full object-cover"
						/>
					</div>
					<!-- Paragraph and image container for dialog -->
					<div
						class="paragraph-image h-auto w-11/14 m-4 overflow-y-auto flex flex-col items-center text-base-100"
					>
						<img
							v-if="data?.img"
							:src="data?.img"
							alt=""
							class="md:w-36 md:h-36 h-24 w-24 md:my-8 z-1"
						/>
						<p
							v-if="data?.title != undefined"
							class="p-2 md:p-4 text-gray-300 font-poppinsm text-md md:text-3xl text-center z-1"
						>
							{{ $t(data?.title) }}
							<!-- Title of the dialog -->
						</p>
						<p
							v-if="data?.text != undefined"
							class="p-2 md:p-4 text-gray-300 font-poppinssl text-base text-md md:text-lg text-center z-1"
							v-html="$t(data?.text)"
						></p>
						<!-- Verification code input section for dialog -->
						<div v-if="data?.code != undefined && data?.code">
							<form action="#" class="text-black">
								<div
									class="flex justify-center items-center md:gap-6 gap-2 mb-3"
								>
									<!-- Input fields for verification code -->
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data1"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data1"
									/>
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data2"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data2"
									/>
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data3"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data3"
									/>
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data4"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data4"
									/>
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data5"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data5"
									/>
									<input
										type="tel"
										maxlength="1"
										pattern="[0-9]"
										id="data6"
										class="form-control"
										@keydown="actionKey($event)"
										placeholder="-"
										v-model="data6"
									/>
								</div>
							</form>
							<!-- Resend and countdown section for dialog -->
							<div
								class="w-full flex justify-center items-center"
							>
								<img
									v-if="data?.img2"
									:src="data?.img2"
									alt=""
									width="145"
									height="145"
									class="w-[80px] md:w-[145px] z-1 object-contain"
								/>
								<div
									class="w-3/5 flex flex-col justify-center items-center"
								>
									<div
										class="flex justify-center items-center"
									>
										<button
											@click="sendPhoneVerification()"
											v-if="
												data?.buttonText != undefined &&
												resend
											"
											class="bg-white border-solid resend-button border-2 border-black px-6 py-3 font-poppinssl rounded-2xl text-black transition ease-in-out hover:scale-105 my-4"
										>
											{{ $t('Reenviar código') }}
											<!-- Resend code button -->
										</button>
										<p
											v-if="
												data?.text != undefined &&
												!resend
											"
											class="p-4 text-red-600 font-poppinsm text-base md:text-lg text-center z-1"
										>
											{{ $t('Tu código vence en ') }}
											<!-- Countdown message -->
										</p>
										<vue-countdown
											v-if="
												!resend &&
												data?.time != undefined
											"
											:time="data?.time"
											:interval="100"
											v-slot="{
												days,
												hours,
												minutes,
												seconds,
											}"
											@end="endTime()"
											class="text-red-600 font-poppinsm text-base md:text-lg text-center z-1"
										>
											{{ minutes }} : {{ seconds }}
											<!-- Countdown display -->
										</vue-countdown>
									</div>
									<button
										@click="validatePhone()"
										v-if="data?.buttonText != undefined"
										class="bg-success border-solid submit-button border-2 border-success px-6 py-3 font-poppinssl rounded-2xl text-white transition ease-in-out hover:scale-105 my-4"
									>
										{{ $t(data.buttonText) }}
										<!-- Validate button -->
									</button>
								</div>
								<div class="md:w-[150px] w-0"></div>
							</div>
						</div>
					</div>
					<!-- Button for sending phone verification if code is not required -->
					<div
						v-if="data?.buttonText != undefined && !data?.code"
						class="w-full flex justify-center items-center gap-4 mb-4"
					>
						<button
							@click="sendPhoneVerification()"
							class="btn btn-outline btn-primary hover:text-base-content normal-case text-base"
						>
							{{ $t(data.buttonText) }}
							<!-- Send verification button -->
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<style scoped>
/* Styles for input fields in the form */
form div input {
	position: relative;
	text-align: center;
	border-radius: 10px;
	background-color: #e0e0e0;
	border: 2px solid black;
	font-weight: 700;
	font-size: 2.5rem;
	font-family: Poppins-Medium;
	width: 10%;
	height: 54px;
}

/* Responsive styles for smaller screens */
@media only screen and (max-width: 600px) {
	form div input {
		font-size: 1.5rem;
		width: 20%;
		height: 44px;
	}
}

/* Placeholder styles for input fields */
form div input::placeholder {
	color: black;
}

/* Container styles for the modal */
.containar {
	box-shadow: inset 0px 4px 7px hsl(var(--b3)) !important;
	background: hsl(var(--b3));
	border-radius: 16px;
	box-shadow: 0 4px 30px hsl(var(--b3));
	backdrop-filter: blur(5.1px);
	-webkit-backdrop-filter: blur(5.1px);
	border: 1px solid hsl(var(--b3));
}

/* Close button styles */
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important;
}

/* Modal background styles */
.modal {
	background-color: #0000004f !important;
}

/* Submit button styles */
.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important;
}
</style>

<!-- FILE DOCUMENTED -->

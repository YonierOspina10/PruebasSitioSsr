<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	props: {
		data: Object, // Prop to receive data as an object
	},
	data() {
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let itemSelect: any = {}; // Object to hold selected item
		let selectValue: number = 0; // Selected value initialized to 0
		let onModal: boolean = false; // Flag to control modal visibility
		let title: string = ''; // Title for the modal
		let message: string = ''; // Message for the modal
		return {
			appComponent,
			selectValue,
			itemSelect,
			title,
			message,
			onModal,
			emitter,
		};
	},
	mounted() {
		this.$nextTick(() => {
			// Ensures the DOM is updated before executing
			this.emitter.on('accept:modal', () => {
				// Listening for 'accept:modal' event
				this.acceptModal(); // Calls acceptModal method when event is triggered
			});
		});
	},
	methods: {
		close() {
      this.appComponent.showMainModalBonus = false;
      this.appComponent.closeModal(); // Method to close the modal
		},
		acceptModal() {
      this.appComponent.showMainModalBonus = false;
      this.appComponent.closeModal(); // Accepts and closes the modal
		},
		confirmModal() {
			this.title = this.$t('Redimir bono'); // Sets the title for the modal
			this.message = this.$t(
				'¿ Esta seguro que desea redimir este bono ?'
			); // Sets the confirmation message
			this.onModal = true; // Opens the modal
		},
		redeem() {
			var bonusesSelect = this.data?.filter((item) => {
				// Filters bonuses based on selected value
				return item.detailId == this.selectValue; // Matches detailId with selectValue
			});
			const params = {
				// Parameters for the API request
				bonusId: bonusesSelect[0].bonoId, // Bonus ID from the selected item
				detailId: bonusesSelect[0].detailId, // Detail ID from the selected item
			};
			const vthis = this; // Reference to the current context
			apiService.request('pay_bonus', params).then(function (
				// API request to redeem bonus
				response: any
			) {
				if (response.code == 0) {
          vthis.appComponent.showMainModalBonus = false;
					// Checks if the response code indicates success
					vthis.appComponent.modal = {
						// Sets modal properties for success notification
						showModal: 'notification',
						titleModal: vthis.$t('Bono redimido!'), // Success title
						messageModal: vthis.$t(
							'Su bono se ha redimido correctamente.'
						), // Success message
						buttonModal: vthis.$t('Aceptar'), // Button text
						orderModal: 'acceptVerifyCodePhone', // Next action
					};
				} else {
          vthis.appComponent.showMainModalBonus = false;
					var error_mensaje = ''; // Variable to hold error message
					if (response.error_code != undefined) {
						// Checks for specific error code
						error_mensaje = vthis.$t(
							'ERROR' + response.error_code.toString()
						); // Sets error message
					}
					if (error_mensaje == '') {
						// Fallback for generic error message
						error_mensaje = vthis.$t(
							'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde'
						);
					}
					vthis.appComponent.modal = {
						// Sets modal properties for error notification
						showModal: 'notification',
						titleModal: vthis.$t('Error!'), // Error title
						messageModal: error_mensaje, // Error message
						buttonModal: vthis.$t('Aceptar'), // Button text
						orderModal: 'closeModal', // Next action
					};
				}
			});
		},
	},
});
</script>
<template>
	<!-- Modal for confirmation when onModal is true and layout is not 3 -->
	<div
		v-if="onModal && appComponent.config.layout != 3"
		class="modal z-[999999999]"
	>
		<div
			class="container-general bg-neutral rounded-xl p-10 flex flex-col gap-y-6 justify-center items-center"
		>
			<h3 class="text-center text-neutral-content font-poppinssb" v-t>
				{{ title }}
				<!-- Title of the modal -->
			</h3>
			<p class="text-center text-neutral-content font-poppinssl" v-t>
				{{ message }}
				<!-- Message of the modal -->
			</p>
			<div class="flex w-full gap-x-7 justify-center items-center">
				<button
					@click="onModal = false"
					class="text-neutral px-6 rounded-full uppercase mt-4 bg-gradient-to-t from-[#652b2b] to-[#af1919] border-1 border-solid border-red-700 hover:scale-105"
					v-t
				>
					{{ $t('Cancel') }}
					<!-- Cancel button -->
				</button>
				<button
					@click="(redeem(), (onModal = false))"
					class="text-neutral px-6 rounded-full uppercase mt-4 bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105"
					v-t
				>
					{{ $t('Aceptar') }}
					<!-- Accept button -->
				</button>
			</div>
		</div>
	</div>
	<Teleport to="body">
		<!-- Dialog for layout 3 -->
		<dialog
			v-if="
				onModal &&
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 3
			"
			class="modal in w-screen h-screen bg-black/80 z-[1500]"
		>
			<div
				class="relative rounded-box min-w-[370px] max-w-[50%] min-h-[270px] max-h-[75%] overflow-hidden text-base-300"
			>
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="onModal = false"
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
				<h3 class="w-full p-4 bg-secondary text-xl font-bold">
					{{ $t(title) }}
					<!-- Title for layout 3 modal -->
				</h3>
				<div
					class="bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<p
						class="text-lg text-start w-full text-gray-300 min-h-16 max-w-2xl"
					>
						{{ $t(message) }}
						<!-- Message for layout 3 modal -->
					</p>
					<div class="w-full flex justify-end items-center gap-4">
						<button
							@click="onModal = false"
							class="btn btn-outline btn-primary hover:text-base-content normal-case text-base"
						>
							{{ $t('Cancel') }}
							<!-- Cancel button for layout 3 -->
						</button>
						<button
							@click="
								redeem();
								onModal = false;
							"
							class="btn btn-outline btn-primary hover:text-base-content normal-case text-base"
						>
							{{ $t('Aceptar') }}
							<!-- Accept button for layout 3 -->
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
	<!-- Modal for layout not equal to 3 -->
	<div
		v-if="appComponent.config.layout != 3"
		class="modal z-[99999999] font-poppinsm"
	>
		<div
			class="container-general w-full flex flex-col justify-center items-center"
		>
			<div
				class="container-img-text w-full md:w-[400px] overflow-y-auto containar p-5 rounded-3xl relative flex flex-col justify-center items-center"
			>
				<div
					class="promotion-image w-full h-full bg-red-700 shadow-md relative"
				>
					<label
						@click="close()"
						class="close-btn btn btn-xs flex justify-center items-center btn-circle bg-gray-700 absolute text-base -top-3 -right-2 shadow-lg text-white transition ease-in-out hover:bg-red-700 hover:scale-105 z-1"
						>✕</label
					>
				</div>
				<div
					class="w-full h-[426px] max-h-[426px] overflow-auto text-black text-center"
				>
					<p class="font-semibold text-xl px-7 leading-6 mt-4 mb-6">
						{{ $t('ELIGE EL BONO QUE DESEAS REDIMIR') }}
						<!-- Instruction to choose a bonus -->
					</p>
					<div
						class="flex flex-col justify-center items-center gap-y-3 h-auto w-auto"
					>
						<button
							v-for="item in data"
							@click="selectValue = item.detailId"
							:class="
								selectValue == item.detailId
									? 'active text-white scale-[.99]'
									: 'inactive'
							"
							class="w-full h-auto min-h-[5rem] bg-[#DADADA] cursor-pointer rounded-lg flex justify-between items-center px-2 hover:scale-[.99] transition-all ease-in-out hover:bg-[#b2dbb7]"
						>
							<div
								class="flex justify-center items-center gap-x-4"
							>
								<div
									class="w-[5rem] h-[5rem] my-1 min-w-[5rem] max-h-auto rounded-lg flex justify-center items-center relative overflow-hidden"
								>
									<img
										:src="
											item.image != undefined &&
											item.image != ''
												? item.image
												: 'https://images.virtualsoft.tech/m/msjT1683842768.png'
										"
										alt=""
										class="w-full h-full rounded-xl object-contain"
									/>
								</div>
								<div
									class="flex justify-start items-start flex-col py-2 gap-y-1"
								>
									<p
										class="text-base font-bold text-start leading-4 break-words"
									>
										{{ item.name }}
										<!-- Name of the bonus -->
									</p>
									<p
										v-if="
											item.description != undefined &&
											item.description != '' &&
											item.description != null
										"
										class="text-xs text-start overflow-auto max-w-[190px] max-h-[65px] p-1 break-words"
									>
										{{ item.description }}
										<!-- Description of the bonus -->
									</p>
								</div>
							</div>
							<p class="font-bold px-1">
								{{ item.value }}
								<!-- Value of the bonus -->
							</p>
						</button>
					</div>
				</div>
				<button
					@click="confirmModal()"
					class="text-white px-6 rounded-full uppercase mt-4"
					:disabled="selectValue == 0"
					:class="
						selectValue != 0
							? 'bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105 '
							: 'bg-gradient-to-t from-[#535353] to-[#929292] border-1 border-solid border-[#535353]'
					"
				>
					{{ $t('Redimir') }}
					<!-- Button to redeem -->
				</button>
			</div>
		</div>
	</div>
	<Teleport to="body">
		<!-- Dialog for layout 3 -->
		<dialog
			v-if="
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 3
			"
			class="modal in w-screen h-screen bg-base-content"
		>
			<div
				class="relative rounded-box min-w-[370px] max-w-[50%] min-h-[300px] max-h-[80vh] overflow-hidden text-base-300"
			>
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
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
				<h3 class="w-full p-4 bg-secondary text-xl font-bold mr-16">
					{{ $t('ELIGE EL BONO QUE DESEAS REDIMIR') }}
					<!-- Instruction for layout 3 -->
				</h3>
				<div
					class="bg-secondary-content p-4 h-full flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<div
						class="w-full max-h-[420px] flex flex-col justify-start items-center gap-y-3 h-auto text-base-content overflow-y-auto"
					>
						<button
							v-for="item in data"
							@click="selectValue = item.detailId"
							:class="
								selectValue == item.detailId
									? 'active text-white scale-[.99]'
									: 'inactive'
							"
							class="w-full h-auto min-h-[5rem] bg-[#DADADA] cursor-pointer rounded-lg flex justify-between items-center px-2 hover:scale-[.99] transition-all ease-in-out hover:bg-[#b2dbb7]"
						>
							<div
								class="flex justify-center items-center gap-x-4"
							>
								<div
									class="w-[5rem] h-[5rem] my-1 min-w-[5rem] max-h-auto rounded-lg flex justify-center items-center relative overflow-hidden"
								>
									<img
										:src="
											item.image != undefined &&
											item.image != ''
												? item.image
												: 'https://images.virtualsoft.tech/m/msjT1683842768.png'
										"
										alt=""
										class="w-full h-full rounded-xl object-contain"
									/>
								</div>
								<div
									class="flex justify-start items-start flex-col py-2 gap-y-1"
								>
									<p
										class="text-base font-bold text-start leading-4 break-words"
									>
										{{ item.name }}
										<!-- Name of the bonus -->
									</p>
									<p
										v-if="
											item.description != undefined &&
											item.description != '' &&
											item.description != null
										"
										class="text-xs text-start overflow-auto max-w-[190px] max-h-[65px] p-1 break-words"
									>
										{{ item.description }}
										<!-- Description of the bonus -->
									</p>
								</div>
							</div>
							<p class="font-bold px-1">
								{{ item.value }}
								<!-- Value of the bonus -->
							</p>
						</button>
					</div>
					<div class="w-full flex justify-center items-center gap-4">
						<button
							@click="confirmModal()"
							:disabled="selectValue == 0"
							class="btn btn-outline btn-primary hover:text-base-content normal-case text-base"
						>
							{{ $t('Redimir') }}
							<!-- Button to redeem -->
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<style scoped>
.active {
	background: linear-gradient(
		360deg,
		#00510f,
		#006c14,
		#36b614,
		#079e0f
	) !important; /* Active button background gradient */
}
.inactive {
	background: linear-gradient(
		360deg,
		#d3d3d3,
		#c7c7c7,
		#ffffff,
		#ededed
	) !important; /* Inactive button background gradient */
}
.containar {
	background: rgb(255, 255, 255); /* Background color for container */
	border-radius: 16px; /* Rounded corners */
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
	border: 1px solid rgba(255, 255, 255, 0.47); /* Border styling */
}
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important; /* Shadow for close button */
}
.modal {
	background-color: #00000095 !important; /* Background color for modal */
}
::-webkit-scrollbar {
	width: 3px; /* Width of the scrollbar */
}
::-webkit-scrollbar-track {
	background: #f1f1f1; /* Track color for scrollbar */
}
::-webkit-scrollbar-thumb {
	background: #888; /* Thumb color for scrollbar */
}
::-webkit-scrollbar-thumb:hover {
	background: #555; /* Thumb color on hover */
}
</style>

<!-- FILE DOCUMENTED -->

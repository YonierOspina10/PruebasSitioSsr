<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import apiService from '@/services/ApiService'; // Importing the API service for making requests

export default defineComponent({
	props: {
		data: Object, // Prop to receive data object
	},
	data() {
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let onModal: string = 'hide'; // State variable to control modal visibility
		return {
			appComponent,
			emitter,
			onModal,
		};
	},
	methods: {
		close() {
			this.appComponent.closeModal(); // Method to close the modal
		},
		download() {
			window.open(this.data?.document.slug); // Method to download the document using its slug
		},
		actionModal() {
			const params = {
				type: 'acceptDocument', // Parameter to specify the action type
				document: this.data?.document, // Document to be accepted
			};
			apiService.request('documentUser', params).then((response) => {
				if (response.code == 0) {
					this.onModal = 'success'; // Update modal state to success
				} else {
					this.onModal = 'error'; // Update modal state to error
					this.appComponent.logOut(); // Log out if there's an error
				}
			});
		},
	},
});
</script>

<template>
	<!-- Modal structure that displays based on the state of onModal -->
	<div
		v-if="onModal == 'success' || onModal == 'show' || onModal == 'error'"
		class="modal z-[992] in"
	>
		<!-- Container for modal content -->
		<div
			class="container-general bg-white rounded-xl p-10 mx-4 flex flex-col gap-y-6 justify-center items-center relative overflow-hidden"
		>
			<!-- Close button for the modal -->
			<label
				@click="close()"
				class="close-btn btn btn-sm btn-circle bg-[#e14644] absolute text-lg top-2 right-4 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
				>✕</label
			>
			<!-- Success message template -->
			<template v-if="onModal == 'success'">
				<img
					class="animate-bounce duration-1000"
					width="121"
					height="121"
					src="https://images.virtualsoft.tech/m/msjT1680296533.png"
					alt="success"
				/>
				<img
					width="121"
					height="121"
					src="https://images.virtualsoft.tech/m/msjT1680296670.png"
					alt="success"
					class="absolute w-full top-0 left-0 opacity-80"
				/>
			</template>
			<!-- Error message template -->
			<img
				v-else-if="onModal == 'error'"
				width="121"
				height="121"
				src="https://images.virtualsoft.tech/m/msjT1680528263.png"
				alt="Error"
			/>
			<!-- Modal title -->
			<h3 class="text-center text-black font-poppinssb">
				{{ $t(onModal == 'success' ? 'Enhorabuena' : 'Error') }}
			</h3>
			<!-- Modal message -->
			<p class="text-center text-black font-poppinssl">
				{{
					$t(
						onModal == 'success'
							? 'Has aceptado el documento correctamente'
							: 'Actualmente no fue posible aceptar el documento, intenta más tarde'
					)
				}}
			</p>
			<!-- Action button based on modal state -->
			<button
				@click="close()"
				:class="
					onModal == 'success'
						? 'bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2'
						: 'bg-gradient-to-t from-[#464646] to-[#6e6e6e] border-1 border-solid border-[#464646]'
				"
				class="text-white px-6 rounded-full uppercase mt-4 hover:scale-105"
			>
				{{
					$t(onModal == 'success' ? 'Continúa navegando' : 'Aceptar')
				}}
			</button>
		</div>
	</div>
	<!-- Secondary modal for displaying document information -->
	<div
		class="modal z-[991] in font-poppinsm"
		:class="onModal == 'success' ? 'hidden' : ''"
	>
		<!-- Container for image and text -->
		<div
			class="container-img-text w-full h-auto md:w-[474px] md:max-w-[474px] overflow-y-auto containar p-5 rounded-3xl gap-y-7 relative flex flex-col justify-start items-center"
		>
			<!-- Display document data if available -->
			<p
				v-if="data?.data != undefined && data?.data != ''"
				class="text-black"
				v-html="data?.data"
			></p>
			<template v-else>
				<!-- Message indicating document readiness -->
				<p
					class="text-black text-center text-md font-poppinssb border-b-1 border-solid border-primary-content pb-2"
				>
					{{ $t('¡Documento "') }} {{ data?.document.title }}
					{{ $t('" listo para su aceptación!') }}
				</p>
				<!-- Display document checksum -->
				<span
					class="shadow-[0_0_8px_#00000024] bg-primary-content border-solid border-[1px] h-auto border-primary-content w-auto flex flex-row justify-center items-center"
				>
					<span
						class="font-poppinssb text-white bg-primary-content py-2 px-2 w-auto text-center h-full"
						>Hash:</span
					>
					<span
						class="font-poppinssl text-primary-content break-words h-full text-center text-wrap w-auto max-w-[350px] bg-gradient-to-b from-base-100 to-base-300 py-2 px-2"
						>{{ data?.document.checksum }}</span
					>
				</span>
				<!-- Instructions for the user -->
				<p
					class="text-black break-words text-wrap font-poppinssl w-full"
				>
					{{
						$t(
							'Estimado usuario, tenemos disponible un  documento titulado'
						)
					}}
					<br />
					<span class="font-poppinssb"
						>" {{ data?.document.title }}</span
					>
					"
					{{
						$t(
							' para su aceptación. Para proceder, por favor haga clic en el siguiente enlace: '
						)
					}}
					<span
						@click="download()"
						class="text-blue-900 font-poppinssl hover:underline hover:cursor-pointer"
					>
						{{ $t('Descargue aquí') }}</span
					>
					<br />
					<br />
					{{ $t('Agradecemos su colaboración.') }}
				</p>
			</template>
			<!-- Button to accept the document -->
			<button
				@click="actionModal()"
				class="text-white px-6 rounded-full font-poppinssl uppercase bg-gradient-to-t from-[#2b653c] to-[#19af21] border-1 border-solid border-success2 hover:scale-105"
			>
				{{ $t('Aceptar') }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.containar {
	background: rgb(255, 255, 255); /* Background color for the container */
	border-radius: 16px; /* Rounded corners */
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
	border: 1px solid rgba(255, 255, 255, 0.47); /* Border styling */
}
.modal {
	background-color: #0000004f !important; /* Semi-transparent background for modal */
}
::-webkit-scrollbar {
	width: 3px; /* Width of the scrollbar */
}
::-webkit-scrollbar-track {
	background: #f1f1f1; /* Background of the scrollbar track */
}
::-webkit-scrollbar-thumb {
	background: #888; /* Color of the scrollbar thumb */
}
::-webkit-scrollbar-thumb:hover {
	background: #555; /* Color of the scrollbar thumb on hover */
}
</style>

<!-- FILE DOCUMENTED -->

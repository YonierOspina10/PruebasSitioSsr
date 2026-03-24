<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import { toRaw } from 'vue'; // Importing toRaw to get a raw version of a reactive object

export default defineComponent({
	props: {
		infoModal: Object, // Prop to receive modal information as an object
	},
	data() {
		let appComponent: any = this.$appComponent; // Reference to the app component
		let emitter = this.$emitter(); // Event emitter for communication
		let dataModal: any = toRaw(this.infoModal); // Raw version of the infoModal prop
		return {
			appComponent,
			emitter,
			dataModal,
		};
	},
	methods: {
		/**
		 * Closes the modal and handles submission if applicable.
		 * @param {string} type - The type of close action ('submit' or 'close').
		 */
		close(type) {
			if (
				type == 'submit' &&
				this.dataModal.dataUrl != undefined &&
				this.dataModal.dataUrl != ''
			) {
				window.open(this.dataModal.dataUrl, '_blank'); // Opens the dataUrl in a new tab if provided
			}
			this.appComponent.closeModal(); // Closes the modal
			this.emitter.emit('close:modalData'); // Emits an event to notify that modal data is closed
		},
        /**
         * Downloads an QR code image for the deposit.
         */
        downloadImage() {
            const link = document.createElement('a'); // Crea un elemento <a>
            link.href = this.dataModal.dataImg; // Establece la URL de la imagen
            link.download = new Date().toISOString().split('T')[0] + '.png'; // Establece el nombre del archivo
            document.body.appendChild(link); // Agrega el enlace al DOM
            link.click(); // Simula un clic para iniciar la descarga
            document.body.removeChild(link); // Elimina el enlace del DOM
        },
	},
});
</script>
<template>
	<!-- Main modal container, displayed based on styleVersionModalData configuration -->
	<div
		v-if="
			appComponent.config.depositos.styleVersionModalData === undefined ||
			appComponent.config.depositos.styleVersionModalData === 0
		"
		class="modal z-[999999999]"
	>
		<!-- General container for modal content -->
		<div
			class="container-general w-11/12 max-w-3xl flex flex-col justify-center items-center 22"
		>
			<!-- Container for image and text -->
			<div
				class="container-img-text w-11/12 max-w-3xl overflow-y-auto bg-base-400 rounded-lg"
			>
				<!-- Conditional rendering for promotion image -->
				<div
					v-if="infoModal?.dataImg != 'noImg'"
					class="promotion-image w-full h-full shadow-md relative"
				>
					<!-- Close button for the modal -->
					<label
						@click="close('close')"
						class="btn btn-sm btn-circle absolute top-2 right-4 shadow-lg text-white transition ease-in-out hover:scale-105 bg-error"
						>✕</label
					>
					<!-- Image display if dataImg is available -->
					<img
						v-if="
							infoModal?.dataImg != undefined &&
							dataModal.dataImg != ''
						"
						:src="dataModal.dataImg"
						class="mx-auto h-full pt-11 max-h-[27rem]"
					/>
				</div>
				<!-- Container for text content -->
				<div
					class="paragraph-image bg-base-400 h-auto max-h-[24rem] w-11/14 m-4 overflow-y-auto flex flex-col items-center"
				>
					<!-- Title display if dataTitle is available -->
					<p
						v-if="
							infoModal?.dataTitle != undefined &&
							infoModal?.dataTitle != ''
						"
						class="p-4 text-neutral text-base md:text-lg text-center"
						v-html="infoModal?.dataTitle"
					></p>
					<!-- Text display if dataText is available -->
					<p
						v-if="
							infoModal?.dataText != undefined &&
							infoModal?.dataText != ''
						"
						class="p-4 text-neutral text-base md:text-lg text-center w-full break-words"
						v-html="infoModal?.dataText"
					></p>
					<div class="flex justify-center items-center gap-6">
                        <!-- Accept button to close the modal -->
                        <button
                            v-if="
							infoModal?.dataImg != undefined &&
							dataModal.dataImg != '' &&
							dataModal.dataImg.includes('data:image/png;base64')
						"
                            @click="downloadImage()"
                            class="bg-primary p-4 rounded-xl text-neutral transition ease-in-out hover:scale-105 my-4"
                        >
                            {{ $t('Descargar QR') }}
                            <!-- Translated text for 'Accept' -->
                        </button>
                        <button
                            @click="close('submit')"
                            class="bg-primary p-4 rounded-xl text-neutral transition ease-in-out hover:scale-105 my-4"
                        >
                            {{ $t('Aceptar') }}
                            <!-- Translated text for 'Accept' -->
                        </button>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<!-- Teleport for rendering modal in the body if styleVersionModalData is 1 -->
	<Teleport
		v-else-if="appComponent.config.depositos.styleVersionModalData === 1"
		to="body"
	>
		<dialog class="modal in w-screen h-screen bg-black/80">
			<!-- Container for modal content -->
			<div
				class="relative w-[95%] max-w-[700px] max-h-[90vh] p-5 flex flex-col justify-center items-center overflow-hidden"
			>
				<!-- Background image -->
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1711056631.png"
					alt=""
					class="w-full h-full absolute left-0 right-0 top-0 bottom-0 z-10"
				/>
				<!-- Additional background image for larger screens -->
				<img
					src="https://images.virtualsoft.tech/m/msj0212T1711051676.png"
					alt=""
					class="hidden md:flex w-[150%] h-[100%] object-center absolute -left-0 -right-0 -top-0 -bottom-0 z-20"
				/>
				<!-- Content container -->
				<div
					class="w-full h-full z-30 flex flex-col justify-center items-center px-5 py-10 md:px-10"
				>
					<!-- Close button for the modal -->
					<button
						@click="close('close')"
						class="rounded-full w-12 aspect-square flex justify-center items-center bg-white z-20 absolute border-solid border-6 border-red-700 text-xl text-red-700 top-16 right-0 rotate-2 shadow-lg transition ease-in-out hover:scale-105"
					>
						<img
							src="https://images.virtualsoft.tech/m/msjT1684361230.png"
							alt=""
							class="w-6"
						/>
					</button>
					<!-- Conditional rendering for image display -->
					<img
						v-if="
							infoModal?.dataImg != 'noImg' &&
							infoModal?.dataImg != undefined &&
							dataModal.dataImg != ''
						"
						:src="dataModal.dataImg"
						alt=""
						class="h-16 md:h-32 aspect-auto"
					/>
					<!-- Text container with overflow handling -->
					<div class="overflow-y-auto py-5 max-h-[60vh] scrollbar-hide">
						<p
							v-if="
								infoModal?.dataText != undefined &&
								infoModal?.dataText != ''
							"
							class="p-2 md:p-4 text-black text-base md:text-lg text-center w-full break-words"
							v-html="infoModal?.dataText"
						></p>
					</div>
					<!-- Submit button to close the modal -->
					<button
						@click="close('submit')"
						class="h-14 md:h-20 w-52 md:w-64 absolute -bottom-1 md:-bottom-2 shadow-lg transition ease-in-out hover:scale-105"
					>
						<img
							src="https://images.virtualsoft.tech/m/msj0212T1711054212.png"
							alt=""
							class="w-full h-full"
						/>
					</button>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Custom scrollbar styles for div elements */
div::-webkit-scrollbar {
	width: 0.5em; /* Width of the scrollbar */
	height: 8px; /* Height of the scrollbar */
}
div::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow for the scrollbar track */
	border-radius: 20px; /* Rounded corners for the track */
}
div::-webkit-scrollbar-thumb {
	background-color: rgb(
		217,
		217,
		217
	) !important; /* Color of the scrollbar thumb */
	border-radius: 20px; /* Rounded corners for the thumb */
}
</style>

<!-- FILE DOCUMENTED -->

<template>
	<!-- Teleport component to render the modal in the body -->
	<Teleport to="body">
		<!-- Modal dialog with full-screen background -->
		<dialog class="modal w-screen h-screen bg-black/80">
			<!-- Main section of the modal with styling for layout and appearance -->
			<section
				class="in relative rounded-[35px] w-[90vw] max-w-[600px] max-h-[65vh] text-base-300 bg-secondary flex justify-between items-center flex-col gap-5 sm:gap-8 px-10 sm:px-20 pt-20 lg:pt-10 pb-10 border border-accent-content shadow-inner shadow-accent-content/50"
			>
				<!-- Close button for the modal -->
				<button
					@click="
						appComponent.closeModal();
						modalStore.reset();
					"
					class="absolute right-6 top-6 hover:scale-105 w-9"
				>
					<!-- Close button image -->
					<img
						src="https://images.virtualsoft.tech/m/msj0212T1712164189.png"
						alt=""
						class="w-full aspect-square"
					/>
				</button>
				<div class="relative w-full">
					<!-- Image displayed in the modal -->
					<img
						:src="data.imagen"
						alt=""
						class="absolute -bottom-5 left-0 right-0 mx-auto w-[70%] max-w-[400px] max-h-[215px] aspect-auto"
					/>
				</div>
				<!-- Title of the modal -->
				<h2
					class="tittle h-20 font-light text-2xl sm:text-[35px] flex justify-center items-center flex-col sm:gap-6 text-center"
					v-html="$t(data.tittle)"
				></h2>
				<!-- Description text in the modal -->
				<p
					class="info text-base sm:text-[20px] font-light leading-6 sm:leading-9 text-justify"
					v-html="$t(data.description)"
				></p>
				<!-- Message text in the modal -->
				<p
					class="text-primary text-center font-bold leading-6 sm:leading-9 text-base sm:text-[20px]"
				>
					{{ $t(data.message) }}
				</p>
				<!-- Button to send action if not loading -->
				<button
					v-if="!loading"
					@click="modalStore.action()"
					class="btn btn-outline btn-primary hover:text-black"
				>
					{{ $t('Enviar') }}
				</button>
				<!-- Loading button state while action is processing -->
				<button
					v-else
					disabled
					@click="modalStore.action()"
					class="btn btn-outline btn-primary hover:text-black flex justify-center items-center gap-1"
				>
					<!-- Loading spinner icon -->
					<svg
						aria-hidden="true"
						role="status"
						class="inline w-4 h-4 mr-3 text-primary animate-spin"
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
					{{ $t('Enviando') }}
				</button>
			</section>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import { useGlobalStore } from '@/stores/global'; // Importing global store
import { useModalStore } from '@/stores/modal'; // Importing modal store
import { storeToRefs } from 'pinia'; // Importing storeToRefs for reactive references

export default defineComponent({
	setup() {
		return {}; // Setup function returning an empty object
	},
	data() {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Reference to the app component
		const globalStore: any = useGlobalStore(); // Accessing global store
		const modalStore = useModalStore(); // Accessing modal store
		const { open, title, message, actionText, cancelText, loading } =
			storeToRefs(modalStore); // Destructuring reactive references from modal store
		let colors: any = {}; // Object to hold color configurations
		let deviceTheme: string = 'theme_colors'; // Default theme variable
		let data: any = {
			imagen: 'https://images.virtualsoft.tech/m/msj0212T1712178610.png', // Default image URL
			tittle: '<span>Tu cuenta ha sido <strong>BLOQUEADA</strong></span>', // Default title
			description:
				'<strong>Tu cuenta está bloqueada </strong>por intentos de <strong>inicio de sesión fallidos</strong>. Haz clic en enviar para recibir instrucciones en tu correo electrónico.', // Default description
			message:
				'Sigue los pasos indicados en tu correo para recuperar el acceso.', // Default message
		};
		return {
			config,
			appComponent,
			globalStore,
			modalStore,
			open,
			title,
			message,
			actionText,
			cancelText,
			loading,
			colors,
			deviceTheme,
			data,
		};
	},
	created() {
		// Lifecycle hook to set theme colors based on configuration
		if (
			this.config.theme_colors_desktop != undefined &&
			this.config.mobileL == ''
		) {
			this.deviceTheme = 'theme_colors_desktop'; // Set desktop theme
		} else if (
			this.config.theme_colors_mobile != undefined &&
			this.config.mobileL != ''
		) {
			this.deviceTheme = 'theme_colors_mobile'; // Set mobile theme
		}
		this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
		if (
			this.appComponent.config['ModalUpdatePassword'] != undefined &&
			this.appComponent.config['ModalUpdatePassword'][
				this.appComponent.country
			] != undefined
		) {
			// Check for modal update password configuration
			if (
				this.appComponent.config['ModalUpdatePassword'][
					this.appComponent.country
				]['imagen'] != undefined
			) {
				this.data.imagen =
					this.appComponent.config['ModalUpdatePassword'][
						this.appComponent.country
					]['imagen']; // Update image if defined
			}
			if (
				this.appComponent.config['ModalUpdatePassword'][
					this.appComponent.country
				]['tittle'] != undefined
			) {
				this.data.tittle =
					this.appComponent.config['ModalUpdatePassword'][
						this.appComponent.country
					]['tittle']; // Update title if defined
			}
			if (
				this.appComponent.config['ModalUpdatePassword'][
					this.appComponent.country
				]['description'] != undefined
			) {
				this.data.description =
					this.appComponent.config['ModalUpdatePassword'][
						this.appComponent.country
					]['description']; // Update description if defined
			}
			if (
				this.appComponent.config['ModalUpdatePassword'][
					this.appComponent.country
				]['message'] != undefined
			) {
				this.data.message =
					this.appComponent.config['ModalUpdatePassword'][
						this.appComponent.country
					]['message']; // Update message if defined
			}
		}
	},
	methods: {},
});
</script>
<style>
/* Title styling for the modal */
.tittle > span {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
/* Strong text within the title */
.tittle > span strong {
	font-size: 2.25rem !important;
	line-height: 2.5rem !important;
	font-weight: 700 !important;
	color: v-bind(colors.primary) !important; /* Bind primary color */
}
/* Strong text within the info paragraph */
.info strong {
	font-weight: 600 !important;
}
/* Responsive styling for larger screens */
@media (min-width: 640px) {
	.tittle > span strong {
		font-size: 50px !important; /* Increase font size on larger screens */
	}
}
</style>

<!-- FILE DOCUMENTED -->

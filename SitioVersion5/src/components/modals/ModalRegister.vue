<script lang="ts">
import Register from '@/views/Register.vue'; // Importing the Register component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue
import IconClose from '../icons/IconClose.vue'; // Importing the IconClose component

export default defineComponent({
	components: {
		Register, // Register component used in the template
		IconClose, // IconClose component used in the template
	},
	data() {
		let appComponent: any = this.$appComponent; // Accessing the app component
		let emitter = this.$emitter(); // Accessing the event emitter
		let promotionModal: any = this.promotion; // Accessing the promotion modal data
		return {
			appComponent, // Exposing appComponent to the template
			emitter, // Exposing emitter to the template
			promotionModal: {
				// Defining the promotion modal object
				title: 'Prueba', // Title of the promotion modal
				urlImage: 'http://hola.com', // Image URL for the promotion
				content: 'content', // Content of the promotion
				url: 'asd', // URL associated with the promotion
			},
		};
	},
	created() {
		// Adding a resize event listener to adjust mobile configuration
		window.addEventListener('resize', () => {
			if (window.screen.width <= 1020)
				this.appComponent.config.mobileL = '1'; // Set mobileL to '1' for small screens
			else this.appComponent.config.mobileL = ''; // Reset mobileL for larger screens
		});
	},
	methods: {
		close() {
			this.appComponent.closeModal(); // Close the modal in the app component
			this.emitter.emit('close:modalPromotion'); // Emit an event to notify modal closure
		},
	},
});
</script>
<template>
	<!-- Button to close the promotion modal -->
	<button
		@click="close()"
		class="fixed top-2 right-2 lg:right-8 hover:scale-90 transition-all z-[9999999999] rounded-full bg-neutral p-1 shadow-[inset_1px_-5px_2px] shadow-neutral-content/40"
	>
		<!-- Close icon -->
		<IconClose class="text-red-700 w-7 h-7 rounded-full"></IconClose>
	</button>
	<!-- Modal container -->
	<div class="modal z-[999999999]">
		<!-- Flex container for centering content -->
		<div
			class="w-full h-full overflow-auto flex justify-center items-center"
		>
			<div
				:style="{
					background: `url('${
						(appComponent.config.mobileL == undefined ||
							appComponent.config.mobileL == '') &&
						appComponent.config.registro != undefined &&
						appComponent.config.registro.bgDesktop != undefined &&
						appComponent.config.registro.bgDesktop[
							appComponent.country
						] != undefined
							? appComponent.config.registro.bgDesktop[
									appComponent.country
								]
							: appComponent.config.mobileL != undefined &&
								  appComponent.config.mobileL == 1 &&
								  appComponent.config.registro != undefined &&
								  appComponent.config.registro.bgMobile !=
										undefined &&
								  appComponent.config.registro.bgMobile[
										appComponent.country
								  ] != undefined
								? appComponent.config.registro.bgMobile[
										appComponent.country
									]
								: ''
					}')`,
				}"
				class="container-general bg-cover shadow-[inset_0px_-170px_21px_-30px_,_inset_0px_-90px_21px_-30px_,_inset_0px_-340px_111px_-170px] shadow-neutral-content lg:shadow-transparent w-[90%] h-[95%] relative rounded-[66px] overflow-visible xl:overflow-hidden grid grid-cols-1 lg:grid-cols-[65%_35%] justify-items-start items-start lg:items-center p-3 lg:p-0"
			>
				<span
					:class="[
						'w-[95%] h-[92%] absolute top-2/4  left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-[66px] border-solid border-6 border-primary hidden lg:block',
						'shadow-[0px_0px_38px_8px_,_inset_0px_0px_38px_8px] shadow-primary',
					]"
				></span>
				<!-- Container for image and registration form -->
				<div
					class="flex justify-start items-end w-full h-full relative"
				>
					<img
						v-if="
							appComponent.config.mobileL == undefined ||
							appComponent.config.mobileL == ''
						"
						:src="
							appComponent.config != undefined &&
							appComponent.config.registro != undefined &&
							appComponent.config.registro.imgDesktop[
								appComponent.country
							] != undefined
								? appComponent.config.registro.imgDesktop[
										appComponent.country
									]
								: 'https://images.virtualsoft.tech/m/msj18212T1712932927.png'
						"
						alt="Character imagen"
						class="object-contain w-full h-[88vh]"
					/>
					<img
						v-else
						:src="
							appComponent.config != undefined &&
							appComponent.config.registro != undefined &&
							appComponent.config.registro.imgMobile[
								appComponent.country
							] != undefined
								? appComponent.config.registro.imgMobile[
										appComponent.country
									]
								: 'https://images.virtualsoft.tech/m/msj18212T1712944244.png'
						"
						alt="Character imagen"
						class="object-contain w-full h-auto relative -mt-7 ml-6"
					/>
				</div>
				<!-- Container for registration form -->
				<div
					class="h-full lg:h-[87%] lg:overflow-auto w-full lg:w-[88%] rounded-3xl pb-11 lg:pb-4"
				>
					<div
						class="border-solid border-6 border-base-300 relative rounded-3xl overflow-hidden shadow-[-1px_-3px_17px_10px] shadow-neutral-content lg:shadow-transparent"
					>
						<!-- Register component -->
						<Register
							class="z-1 w-full h-full rounded-full"
						></Register>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
div::-webkit-scrollbar {
	width: 0.5em; /* Width of the scrollbar */
	height: 8px; /* Height of the scrollbar */
}

div::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow for scrollbar track */
	border-radius: 20px; /* Rounded corners for scrollbar track */
}

div::-webkit-scrollbar-thumb {
	background-color: rgb(
		0,
		0,
		0
	) !important; /* Color of the scrollbar thumb */
	border-radius: 20px; /* Rounded corners for scrollbar thumb */
}

.paragraph-image table {
	color: hsl(var(--n)); /* Text color for tables within paragraph-image class */
}

.modal {
	background-color: rgba(
		0,
		0,
		0,
		0.75
	) !important; /* Background color for modal */
}
</style>

<!-- FILE DOCUMENTED -->

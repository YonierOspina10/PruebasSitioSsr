<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a modal dialog.
 */
export default defineComponent({
	props: {
		/**
		 * Data object containing properties for the modal,
		 * including image and button text.
		 */
		data: Object,
	},
	data() {
		/**
		 * Local state for the component, including references
		 * to the app component and an event emitter.
		 */
		let appComponent: any = this.$appComponent;
		let emitter = this.$emitter();
		return {
			appComponent,
			emitter,
		};
	},
	methods: {
		/**
		 * Closes the modal by calling the closeModal method
		 * on the app component.
		 */
		close() {
			this.appComponent.closeModal();
		},
		/**
		 * Emits an 'accept:modal' event to notify listeners
		 * that the modal has been accepted.
		 */
		accept() {
			this.emitter.emit('accept:modal');
		},
	},
});
</script>

<template>
	<!-- Main modal container with overflow hidden -->
	<div class="modal overflow-hidden">
		<!-- General container for modal content -->
		<div
			class="container-general w-full md:w-auto flex flex-col justify-center items-center relative"
		>
			<!-- Container for image and text -->
			<div
				class="container-img-text w-full md:w-[620px] max-w-[620px] overflow-y-auto containar p-2 rounded-3xl relative polygon-custom"
			>
				<!-- Centered container for image -->
				<div
					class="w-full h-full flex justify-center items-center polygon-custom"
				>
					<div
						class="w-full h-auto md:h-[350px] overflow-auto text-black"
					>
						<!-- Image displayed in the modal -->
						<div class="w-full h-full">
							<img
								:src="data?.imgPromotion"
								class="w-full h-full"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<!-- Conditional button display based on textButton property -->
			<div
				v-if="
					data?.textButton != undefined &&
					data?.textButton != '' &&
					data?.textButton != null
				"
				class="absolute -bottom-2 md:bottom-0 scale-50 md:scale-100 z-20"
			>
				<!-- Button that links to a URL and closes the modal -->
				<button
					class="relative px-3 py-1 button-deposit z-10 rounded-xl hover:scale-105"
				>
					<RouterLink
						:to="data?.urlButton"
						@click="close()"
						class="button-deposit-2 relative px-8 py-1 text-2xl rounded-xl uppercase"
						>{{ $t(data?.textButton) }}</RouterLink
					>
				</button>
			</div>
			<!-- Close button for the modal -->
			<label
				@click="close()"
				class="btn btn-xl btn-circle bg-white z-20 absolute border-solid border-4 border-red-700 text-xl text-red-700 -top-1 right-0 rotate-2 shadow-lg transition ease-in-out hover:scale-105"
			>
				<img
					src="https://images.virtualsoft.tech/m/msjT1684361230.png"
					width="20"
					height="20"
				/>
			</label>
			<!-- Conditional decoration image display -->
			<div
				v-if="
					data?.imgDecoration != undefined &&
					data?.imgDecoration != '' &&
					data?.imgDecoration != null
				"
				class="absolute md:-top-14 w-[120%] h-[120%] z-10"
			>
				<!-- Decoration image displayed in the background -->
				<img
					:src="data?.imgDecoration"
					alt=""
					class="w-full h-full object-cover animation-text"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Animation for text within the modal */
.animation-text {
	animation: animetext 5s alternate-reverse infinite ease-in-out;
}

/* Keyframes for the text animation */
@keyframes animetext {
	from {
		transform: translateY(-8px);
	}
	to {
		transform: translateY(8px);
	}
}

/* Styles for the button with a specific design */
.button-deposit-2 {
	border-left: 2px solid #284b2443;
	border-right: 2px solid #284b2443;
	filter: drop-shadow(1px 0px 1px #284b24);
}

/* Styles for the after pseudo-element of the button */
.button-deposit-2::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 70%;
	top: -9px;
	border-radius: 100% 100% 0px 0px;
	border-top: 2px solid #284b247c;
	filter: drop-shadow(2px -2px 1px #284b24);
	left: 0;
	z-index: -1;
}

/* Styles for the before pseudo-element of the button */
.button-deposit-2::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 10px;
	border-radius: 0px 0px 100% 100%;
	border-bottom: 2px solid #284b247c;
	filter: drop-shadow(2px 2px 1px #284b24);
	left: 0;
	z-index: -1;
}

/* Styles for the button deposit before pseudo-element */
.button-deposit::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #2d9d67;
	left: 0;
	top: -16px;
	border-radius: 100% 100% 0px 0px;
	background: linear-gradient(270deg, #3d7036, #579a4d);
	z-index: -2;
}

/* Styles for the button deposit after pseudo-element */
.button-deposit::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #2d9d67;
	left: 0;
	top: 16px;
	border-radius: 0px 0px 100% 100%;
	background: linear-gradient(270deg, #3d7036, #579a4d);
	z-index: -2;
}

/* Custom polygon shape for the modal */
.polygon-custom {
	clip-path: polygon(50% 0%, 100% 7%, 100% 93%, 50% 100%, 0 93%, 0 7%);
}

/* Container styles for the modal content */
.containar {
	background: rgb(255, 255, 255);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.47);
}

/* Modal background color */
.modal {
	background-color: #0000004f !important;
}
</style>

<!-- FILE DOCUMENTED -->

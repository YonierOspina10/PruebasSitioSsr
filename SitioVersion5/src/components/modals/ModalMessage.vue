<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import Message from '@/components/message.vue'; // Importing the Message component
import ExitIcon from '../icons/ExitIcon.vue'; // Importing the ExitIcon component

export default defineComponent({
	props: {
		dataInfo: Object, // Prop to receive data information as an object
	},
	components: {
		Message, // Registering the Message component
		ExitIcon, // Registering the ExitIcon component
	},
	data() {
		let appComponent: any = this.$appComponent; // Accessing the app component
		let emitter = this.$emitter(); // Accessing the event emitter
		let config = this.$config(); // Accessing the configuration object
		return {
			appComponent, // Returning appComponent to the component's data
			emitter, // Returning emitter to the component's data
			config, // Returning config to the component's data
		};
	},
	updated() {}, // Lifecycle hook for when the component updates
	mounted() {}, // Lifecycle hook for when the component is mounted
	methods: {
		close() {
			this.appComponent.closeModal(); // Method to close the modal
		},
		accept() {
			this.emitter.emit('accept:modal'); // Method to emit an 'accept:modal' event
		},
	},
});
</script>

<template>
	<!-- Main modal container -->
	<div class="modal z-50">
		<!-- General container for centering content -->
		<div
			class="container-general w-full flex flex-col justify-center items-center"
		>
			<!-- Container for image and text with dynamic background color -->
			<div
				class="container-img-text w-full md:w-[820px] overflow-y-auto containar p-5 pt-8 rounded-3xl relative"
				:style="{
					backgroundColor:
						config.layout != undefined && config.layout == 3
							? '#1C1E2B'
							: '#FFFFFF',
				}"
			>
				<!-- Promotion image container -->
				<div class="promotion-image w-full h-full shadow-md relative">
					<!-- Close button for layout not equal to 3 -->
					<label
						v-if="config.layout != 3"
						@click="close()"
						class="close-btn btn btn-xs btn-circle bg-gray-700 absolute text-xs -top-7 -right-2 shadow-lg text-white transition ease-in-out hover:scale-105 z-1"
						>✕</label
					>
					<!-- Exit icon for layout equal to 3 -->
					<label
						v-if="config.layout != undefined && config.layout == 3"
						@click="close()"
						class="absolute text-xs -top-6 -right-3 hover:scale-105 z-1 cursor-pointer"
						><ExitIcon
							:height="23"
							:width="23"
							:fill="'#ffffff'"
							:fill2="'#ee3b3f'"
					/></label>
				</div>
				<!-- Message container with dynamic styles -->
				<div
					class="w-full h-[70vh] overflow-auto text-black"
					:style="[
						{
							borderRadius:
								config.layout != undefined && config.layout == 3
									? '10px'
									: '0px',
						},
						{
							marginTop:
								config.layout != undefined && config.layout == 3
									? '8px'
									: '0px',
						},
					]"
				>
					<Message />
					<!-- Rendering the Message component -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Style for the container with rounded corners and shadow */
.containar {
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.47);
}

/* Style for the close button */
.close-btn {
	box-shadow: inset 0px -4px 2px 0px #00000030 !important;
}

/* Style for the modal background */
.modal {
	background-color: #0000004f !important;
	z-index: 999 !important; /* Ensures modal is on top */
}

/* Style for input labels */
input.FormLabel {
	color: black !important;
}

/* Style for the submit button */
.submit-button {
	box-shadow: inset 0px -20px 9px -11px #00000030 !important;
}
</style>

<!-- FILE DOCUMENTED -->

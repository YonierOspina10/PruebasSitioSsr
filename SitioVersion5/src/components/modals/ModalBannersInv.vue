<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a modal dialog.
 */
export default defineComponent({
	// Component props definition
	props: {
		/**
		 * Message to be displayed in the modal.
		 */
		message: String,
	},
	data() {
		// Initialize local variables for event emitter and app component
		let emitter = this.$emitter();
		let appComponent: any = this.$appComponent;
		return {
			emitter,
			appComponent,
		};
	},
	mounted() {
		// Get the close button element and add a click event listener
		const btn: HTMLElement | null =
			document.getElementById('closeBannerInv');
		btn?.addEventListener('click', (): void => {
			// Close the modal when the button is clicked
			this.appComponent.closeModal();
		});
	},
	methods: {
		/**
		 * Method to close the modal.
		 */
		close() {
			this.appComponent.closeModal();
		},
		/**
		 * Method to emit an 'accept' event.
		 */
		accept() {
			this.emitter.emit('accept:modal');
		},
	},
});
</script>

<template>
	<!-- Modal container that is conditionally rendered based on layout configuration -->
	<div v-if="appComponent.config.layout != 3" class="modal z-[999999999]" id="bannerInv">
		<!-- Display the message passed as a prop -->
		<div v-html="message"></div>
	</div>
	<Teleport to="body">
		<!-- Dialog component for layout 3 -->
		<dialog
			v-if="
				appComponent.config.layout != undefined &&
				appComponent.config.layout == 3
			"
			class="modal in w-screen h-screen bg-black/80"
		>
			<!-- Container for the dialog content -->
			<div
				class="relative rounded-box min-w-[370px] max-w-[50%] min-h-[270px] max-h-[75%] overflow-hidden text-base-300"
			>
				<!-- Close button for the dialog -->
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
						<!-- SVG paths for the close icon -->
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Content area for the message -->
				<div
					class="bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
					v-html="message"
				></div>
			</div>
		</dialog>
	</Teleport>
</template>

<!-- FILE DOCUMENTED -->

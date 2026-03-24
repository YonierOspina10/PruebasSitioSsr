<template>
	<!-- Teleport component to render the dialog in the body of the document -->
	<Teleport to="body">
		<!-- Modal dialog with full-screen overlay -->
		<dialog class="modal in w-screen h-screen bg-neutral-content/80">
			<!-- Container for the modal content with responsive design -->
			<div
				class="relative bg-base-300 rounded-box min-w-[370px] max-w-[700px] min-h-[270px] text-neutral/80 py-10 px-8 md:px-10"
			>
				<!-- Close button to clear JackpotInformation -->
				<button
					class="absolute right-4 top-4 hover:scale-125"
					@click="appComponent.JackpotInformation = ''"
				>
					<!-- SVG icon for the close button -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="17"
						height="17"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Content area for displaying JackpotInformation with scrolling -->
				<div
					class="h-full flex flex-col justify-start items-center w-full max-h-[70vh] text-neutral overflow-y-auto rounded-box shadow-lg border border-base-200"
					v-html="appComponent.JackpotInformation"
				></div>
			</div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the modal dialog.
 */
export default defineComponent({
	/**
	 * Setup function for composition API.
	 * @returns An empty object for reactive properties.
	 */
	setup() {
		return {};
	},
	/**
	 * Data function to initialize component state.
	 * @returns An object containing configuration and app component references.
	 */
	data() {
		let config = this.$config(); // Retrieve configuration settings
		let appComponent: any = this.$appComponent; // Reference to the app component
		return {
			config,
			appComponent,
		};
	},
});
</script>
<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

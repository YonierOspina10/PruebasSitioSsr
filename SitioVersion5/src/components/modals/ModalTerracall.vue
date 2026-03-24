<template>
	<!-- Teleport component to render modal in the body -->
	<Teleport to="body">
		<!-- Conditional rendering based on appComponent layout configuration -->
		<div
			v-if="
				appComponent.config.layout == undefined ||
				appComponent.config.layout != 3
			"
			class="modal z-[999999999]"
		>
			<!-- Modal box with specific width constraints -->
			<div class="modal-box w-11/12 max-w-xl">
				<!-- Close button for the modal -->
				<label
					@click="appComponent.modalTerracall = false"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
				<!-- Modal title -->
				<h3 class="w-full text-xl font-bold text-neutral-content">
					{{ $t('Terracall') }}
				</h3>
				<!-- Content area with scrollable overflow -->
				<div id="scriptTerracall"></div>
			</div>
		</div>
		<!-- Alternative modal layout for specific configuration -->
		<dialog
			v-else-if="appComponent.config.layout == 3"
			class="modal in w-screen h-screen bg-black/80"
		>
			<!-- Modal content with responsive design -->
			<div
				class="relative rounded-box min-w-[98%] sm:min-w-[470px] sm:max-w-[40%] min-h-[270px] max-h-[80%] overflow-hidden text-base-300"
			>
				<!-- Close button with SVG icon -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="appComponent.modalTerracall = false"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<!-- Cross icon paths -->
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Modal title with background color -->
				<h3 class="w-full p-4 bg-secondary text-xl font-bold">
					{{ $t('Terracall') }}
				</h3>
				<!-- Content area with scrollable overflow -->
				<div
					class="w-full h-full bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box max-h-[70vh] overflow-y-auto"
				>
					<!-- Placeholder for Payphone button -->
					<div id="scriptTerracall"></div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for ModalTerracall.
 */
export default defineComponent({
	/**
	 * Setup function for composition API.
	 */
	setup() {
		return {};
	},
	/**
	 * Data function to initialize component state.
	 */
	data() {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Reference to app component
		return {
			config,
			appComponent,
		};
	},
	/**
	 * Lifecycle hook called after the component is mounted.
	 */
	mounted() {
		console.log('ModalTerracall mounted'); // Log message for debugging
	},
});
</script>
<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

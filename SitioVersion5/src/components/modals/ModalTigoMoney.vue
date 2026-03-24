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
					@click="appComponent.modalTigoMoney = false"
					class="btn btn-sm btn-circle absolute right-2 top-2"
					>✕</label
				>
				<!-- Modal title -->
				<h3 class="w-full text-xl font-bold text-neutral-content">
					{{ $t('Tigo Money') }}
				</h3>
				<!-- Content area with scrollable overflow -->
				<div id="scriptTigoMoney"></div>
			</div>
		</div>
		<!-- Alternative modal layout for specific configuration -->
		<dialog
			v-else-if="appComponent.config.layout == 3"
			class="modal in w-screen h-screen bg-black/80"
		>
        <div class="relative inline-block">
			<!-- Modal content with responsive design -->
			<div
				class="rounded-box min-w-[98%] sm:min-w-[470px] sm:max-w-[40%] overflow-hidden text-base-300"
			>
				<!-- Content area with scrollable overflow -->
				<div
					class="w-full h-full bg-base-100 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<!-- Placeholder for Payphone button -->
					<div id="scriptTigoMoney" class="w-full h-full"></div>
				</div>
			</div>
            <!-- Close button -->
            <button
				@click="appComponent.modalTigoMoney = false"
				class="rounded-full w-12 aspect-square flex justify-center items-center bg-white z-50 border-solid border-6 border-red-700 text-xl text-red-700 rotate-2 shadow-lg transition ease-in-out absolute -right-4 -top-4 hover:scale-105"
			>
				<img
					src="https://images.virtualsoft.tech/m/msjT1684361230.png"
					alt=""
					class="w-6"
				/>
			</button>
        </div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

/**
 * Component definition for ModalTigoMoney.
 */
export default defineComponent({
	/**
	 * Setup function for composition API.
	 */
	setup() {
		const isLoading = ref(false);
		return { isLoading };
	},
	/**
	 * Data function to initialize component state.
	 */
	data() {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Reference to app component
		return {
			config,
			appComponent
		};
	},
	/**
	 * Lifecycle hook called after the component is mounted.
	 */
	mounted() {
		console.log('ModalTigoMoney mounted'); // Log message for debugging
	},
});
</script>
<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

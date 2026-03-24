<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for a modal that displays deposit processing status.
 */
export default defineComponent({
	// Component props definition
	props: {
		// Data object passed to the component
		dataInfo: {
			type: Object,
			default: {},
		},
	},
	// Component data function
	data() {
		// Retrieve configuration and emitter from the context
		let config = this.$config();
		let emitter = this.$emitter();
		let appComponent: any = this.$appComponent;
		return {
			config,
			emitter,
			appComponent,
		};
	},
	// Lifecycle hook called when the component is unmounted
	unmounted() {},
	// Lifecycle hook called when the component is mounted
	mounted() {
		// Listen for 'accept:modal' event to trigger acceptModal method
		this.emitter.on('accept:modal', () => {
			this.acceptModal();
		});
	},
	methods: {
		/**
		 * Method to handle modal acceptance logic.
		 */
		acceptModal() {
			// Check if the modal order requires approval
			if (this.appComponent.modal.orderModal == 'acceptNeedApproval') {
			}
		},
	},
});
</script>

<template>
	<!-- Main container for the modal -->
	<div class="modal">
		<!-- Box that contains the modal content -->
		<div class="modal-box w-11/12 max-w-5xl">
			<!-- Close button for the modal -->
			<label
				@click="appComponent.closeModal()"
				class="btn btn-sm btn-circle absolute right-2 top-2"
				>✕</label
			>
			<!-- Modal title -->
			<h3 class="font-bold text-lg">
				{{ $t('Estado actual: Pendiente') }}
			</h3>
			<br />
			<!-- Description of the processing status -->
			<p class="py-4">
				{{
					$t(
						'Estamos procesando tu depósito, Por favor espera un momento...'
					)
				}}
			</p>
			<!-- Loading spinner image -->
			<img :src="'images/tail-spin.svg?v=10000'" />
			<!-- Dynamic content based on dataInfo -->
			<p class="py-4" v-html="$t(dataInfo.dataText)"></p>
		</div>
	</div>
</template>

<style scoped>
/* Global styles for text color */
* {
	color: black;
}
</style>

<!-- FILE DOCUMENTED -->

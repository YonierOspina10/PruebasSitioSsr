<template>
	<!-- Teleport component to render the modal in the body of the document -->
	<Teleport to="body">
		<!-- Modal dialog with full-screen background -->
		<dialog class="modal in w-screen h-screen bg-neutral-content/80">
			<div
				class="relative rounded-box min-w-[370px] max-w-[50%] min-h-[270px] max-h-[75%] overflow-hidden text-neutral/80"
			>
				<!-- Close button to dismiss the modal -->
				<button
					class="absolute right-6 top-5 hover:scale-125 text-neutral"
					@click="
						appComponent.showModal3 = false;
						modalStore.cancel();
						modalStore.reset();
					"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 20 20"
						fill="none"
					>
						<!-- Cross icon for closing the modal -->
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Modal title -->
				<h3 class="w-full p-4 bg-base-300 text-xl font-bold">
					{{ $t(title) }}
					<!-- Translated title -->
				</h3>
				<!-- Container for the modal message and action buttons -->
				<div
					class="bg-base-200 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<!-- Modal message -->
					<p
						class="text-lg text-start w-full text-neutral/80 min-h-16 max-w-2xl"
					>
						{{ $t(message) }}
						<!-- Translated message -->
					</p>
					<div class="w-full flex justify-end items-center gap-4">
						<!-- Action button that triggers the modal store action -->
						<button
							@click="modalStore.action()"
							class="btn btn-outline btn-primary hover:text-neutral-content normal-case text-base"
						>
							{{ $t(actionText) }}
							<!-- Translated action button text -->
						</button>
						<!-- Cancel button, shown only if cancelText is not 'none' -->
						<button
							v-if="cancelText !== 'none'"
							@click="modalStore.cancel()"
							class="btn btn-primary text-neutral-content normal-case text-base"
						>
							{{ $t(cancelText) }}
							<!-- Translated cancel button text -->
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import { useModalStore } from '@/stores/modal'; // Importing modal store for state management
import { storeToRefs } from 'pinia'; // Importing storeToRefs for reactive references

export default defineComponent({
	setup() {
		return {}; // Setup function returns an empty object
	},
	data() {
		// Initialize configuration and emitter
		let config = this.$config(); // Get configuration object
		let emitter = this.$emitter(); // Get event emitter
		let appComponent: any = this.$appComponent; // Reference to the app component
		const modalStore = useModalStore(); // Access modal store
		// Destructure reactive properties from modal store
		const { open, title, message, actionText, cancelText } =
			storeToRefs(modalStore);
		return {
			config, // Expose config to the template
			emitter, // Expose emitter to the template
			appComponent, // Expose appComponent to the template
			modalStore, // Expose modalStore to the template
			open, // Expose open state to the template
			title, // Expose title to the template
			message, // Expose message to the template
			actionText, // Expose actionText to the template
			cancelText, // Expose cancelText to the template
		};
	},
});
</script>
<style scoped>
/* Scoped styles for the modal component can be added here */
</style>

<!-- FILE DOCUMENTED -->

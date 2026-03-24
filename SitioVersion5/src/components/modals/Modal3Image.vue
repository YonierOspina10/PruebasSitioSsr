<template>
	<!-- Teleport component to render the modal in the body of the document -->
	<Teleport to="body">
		<!-- Modal dialog with full-screen overlay -->
		<dialog class="modal in w-screen h-screen bg-black/80">
			<!-- Main container for the modal content with styling for layout and appearance -->
			<div
				class="relative max-w-[615px] max-h-[643px] rounded-xl bg-base-200 shadow-xl shadow-neutral-content flex flex-col justify-between items-center gap-10 text-base-300"
			>
				<!-- Close button to hide the modal and reset the store -->
				<button
					class="absolute right-3 md:right-6 top-3 md:top-5 hover:scale-125 text-neutral"
					@click="
						appComponent.showModal3Image = false;
						modalStore.reset();
					"
				>
					<!-- SVG icon for the close button -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Main image displayed in the modal -->
				<img
					:src="image"
					alt="Imagen Main Modal"
					class=""
					:style="[{ width: widthImage, height: heightImage }]"
				/>
				<!-- Container for the text content of the modal -->
				<div
					class="w-full px-8 pb-8 md:px-9 md:pb-10 flex flex-col justify-center items-start gap-6"
				>
					<!-- Title of the modal -->
					<h2 class="font-bold text-lg md:text-[22px] text-neutral">
						{{ title }}
					</h2>
					<!-- Horizontal line decoration, conditionally rendered -->
					<hr
						v-if="lineDecoration"
						class="w-full bg-secondary border-none"
						:style="{ height: '0.200px' }"
					/>
					<!-- Message text displayed in the modal -->
					<p class="text-[16px] font-light leading-6 text-neutral">
						{{ message }}
					</p>
					<div class="flex justify-center items-start gap-6 mt-2">
						<!-- Primary action button -->
						<button
							class="btn btn-md btn-primary hover:bg-primary hover:border-primary text-neutral-content normal-case text-base"
							@click="modalStore.action()"
						>
							{{ $t(actionText) }}
						</button>
						<!-- Cancel button, conditionally rendered based on cancelText -->
						<button
							v-if="cancelText !== 'none'"
							class="btn btn-md btn-outline btn-primary hover:bg-primary hover:border-primary hover:text-neutral-content normal-case text-base"
							@click="modalStore.cancel()"
						>
							{{ cancelText }}
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';
import IconClose from '@/components/icons/IconClose.vue';
export default defineComponent({
    components: { IconClose },
	// Component data function to define reactive properties
	data() {
		let config = this.$config(); // Configuration object
		let emitter = this.$emitter(); // Event emitter instance
		let appComponent: any = this.$appComponent; // Reference to the app component
		const modalStore = useModalStore(); // Access modal store
		const {
			open,
			title,
			message,
			actionText,
			cancelText,
			image,
			widthModal,
			heightModal,
			widthImage,
			heightImage,
			lineDecoration,
		} = storeToRefs(modalStore); // Destructure reactive properties from modal store
		return {
			config,
			emitter,
			appComponent,
			image,
			title,
			message,
			actionText,
			cancelText,
			modalStore,
			open,
			widthModal,
			heightModal,
			widthImage,
			heightImage,
			lineDecoration,
		};
	},
	setup() {},
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

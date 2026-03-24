<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for a modal dialog.
 */
export default defineComponent({
	props: {
		/**
		 * Data object passed to the component containing modal information.
		 */
		data: Object,
	},
	data() {
		/**
		 * Initializes component data.
		 * @returns {Object} Contains emitter and appComponent references.
		 */
		let emitter = this.$emitter();
		let appComponent: any = this.$appComponent;
		return {
			emitter,
			appComponent,
		};
	},
	mounted() {
		// Lifecycle hook called after the component is mounted.
	},
	methods: {
		/**
		 * Closes the modal by calling the closeModal method on appComponent.
		 */
		close() {
			this.appComponent.closeModal();
		},
		/**
		 * Emits an 'accept:modal' event using the emitter.
		 */
		accept() {
			this.emitter.emit('accept:modal');
		},
	},
});
</script>

<template>
	<!-- Main modal container, displayed conditionally based on appComponent layout -->
	<div
		v-if="appComponent.config.layout != 3"
		class="modal z-[999999999] bannerinvasive-v2"
	>
		<!-- Background overlay for the modal -->
		<div class="absolute h-[100%] w-[100%] bg-black m-0">
			<!-- Container for the message and actions -->
			<div class="message-contain relative">
				<span class="alert-container px-1 py-7">
					<!-- Close button for the modal -->
					<button
						@click="close()"
						type="button"
						aria-hidden="true"
						class="close bg-primary hover:bg-primary-content text-white font-bold mt-2 py-3 px-4 rounded-full"
					>
						X
					</button>
					<!-- Conditional link based on data.url -->
					<a
						v-if="data?.url != undefined"
						:target="data?.target"
						data-notify="url"
						:href="data?.url"
						class="menssage"
					>
						<span
							v-if="data?.body != undefined"
							class="message-text w-full"
						>
							<div class="break-words" v-html="data?.body"></div>
						</span>
						<!-- Conditional image display based on data.image -->
						<img
							v-if="data?.image != undefined"
							:src="data?.image"
						/>
					</a>
				</span>
				<!-- Conditional action button based on multiple data checks -->
				<div
					v-if="
						data?.url != '' &&
						data?.url != undefined &&
						data?.url != null &&
						data?.bannerInv != null &&
						data?.bannerInv != undefined &&
						data?.bannerInv != null
					"
					class="button-action"
				>
					<button
						type="button"
						class="main-item text-center w-auto h-full font-semibold text-base rounded-xl hover:shadow-inset bg-[#26B742] text-base-100 px-4 py-4"
					>
						<a :href="data.url">{{ $t(data?.buttonText) }}</a>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Teleport component to render the dialog in the body -->
	<Teleport to="body">
		<!-- Dialog component displayed conditionally based on appComponent layout -->
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
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Content area for the dialog -->
				<div
					class="bg-secondary-content p-4 flex flex-col justify-start items-center gap-4 rounded-b-box"
				>
					<span class="alert-container px-1 py-7">
						<!-- Conditional link based on data.url -->
						<a
							v-if="data?.url != undefined"
							:target="data?.target"
							data-notify="url"
							:href="data?.url"
							class="menssage"
						>
							<span
								v-if="data?.body != undefined"
								class="message-text w-full"
							>
								<div
									class="break-words"
									v-html="data?.body"
								></div>
							</span>
							<!-- Conditional image display based on data.image -->
							<img
								v-if="data?.image != undefined"
								:src="data?.image"
							/>
						</a>
					</span>
					<!-- Conditional action button based on multiple data checks -->
					<div
						v-if="
							data?.url != '' &&
							data?.url != undefined &&
							data?.url != null &&
							data?.bannerInv != null &&
							data?.bannerInv != undefined &&
							data?.bannerInv != null
						"
						class="button-action"
					>
						<button
							type="button"
							class="main-item text-center w-auto h-full font-semibold text-base rounded-xl hover:shadow-inset bg-[#26B742] text-base-100 px-4 py-4"
						>
							<a :href="data?.url">{{ $t(data?.buttonText) }}</a>
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>

<style scoped>
/* Styles for the modal with banner invasive version 2 */
.modal.bannerinvasive-v2 .contenedor-banner {
	display: flex;
}
.modal.bannerinvasive-v2 .contenedor-banner .message-contain {
	margin: auto !important;
	max-width: 100%;
	height: auto !important;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.modal.bannerinvasive-v2 .contenedor-banner .message-contain a.menssage {
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: none !important;
}
.modal.bannerinvasive-v2 .contenedor-banner .message-contain .alert-container {
	padding: 20px;
	height: auto !important;
	position: relative !important;
	background: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0px 0px 23px -4px rgba(0, 0, 0, 1);
}
.message-contain {
	width: 100%;
}

/* Media query for larger screens */
@media only screen and (min-width: 700px) {
	.modal.bannerinvasive-v2
		.contenedor-banner
		.message-contain
		.alert-container {
		max-width: 60%;
	}
	.message-contain {
		width: calc(90% - 20px) !important;
	}
	.modal.bannerinvasive-v2 .contenedor-banner .message-contain {
		max-width: 80% !important;
	}
}
.modal.bannerinvasive-v2
	.contenedor-banner
	.message-contain
	a.menssage
	span.message-text {
	font-size: 12px !important;
	color: black;
}
.button-action {
	margin-top: 20px;
}
button.close {
	color: #aaaaaa;
	width: auto !important;
	font-size: 20px;
	float: right !important;
	position: absolute !important;
	right: 8px !important;
	margin-top: -18px;
}
</style>

<!-- FILE DOCUMENTED -->

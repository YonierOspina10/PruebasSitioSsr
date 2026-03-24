<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Defines a Vue component for a modal dialog.
 */
export default defineComponent({

	// Component props definition
	props: {
		/** Title of the modal */
		title: String,
		/** Message to be displayed in the modal */
		message: String,
		/** Text for the button */
		button: String,
		button2: String,
		link2: String,
		/** Determines if the close button is shown */
		buttonX: {
			type: Boolean,
			default: true,
		},
		/** Inner HTML content for the modal */
		innerHtml: { type: String, default: '' },
	},
	data() {
		// Initialize component data
		let emitter = this.$emitter(); // Event emitter for communication
		let appComponent: any = this.$appComponent; // Reference to the app component
		return {
			emitter,
			appComponent,
		};
	},
	methods: {
		/** Closes the modal */
		close() {
			this.appComponent.closeModal();
		},
		/** Accepts the modal action and emits an event */
		accept() {
			this.emitter.emit('accept:modal'); // Emit accept event
			this.appComponent.closeModal(); // Close the modal
			console.log('Se acepto el modal', this.emitter); // Log acceptance
		},
		goToLink() {
			if (this.link2) {
				this.emitter.emit('go:register');
				this.$router.push(this.link2);
				this.appComponent.closeModal();
			}
		}
	},
});
</script>

<template>
	<!-- Main modal container, shown based on layout configuration -->
	<div v-if="
		appComponent.config.layout == undefined ||
		appComponent.config.layout != 3
	" class="modal z-[999999999]">
		<!-- Modal box with content -->
		<div class="modal-box w-11/12 max-w-xl bg-base-300">
			<!-- Close button, shown conditionally -->
			<label v-if="buttonX" @click="close()"
				class="btn btn-sm btn-circle absolute right-2 top-2 text-neutral bg-base-300">✕</label>
			<!-- Modal title -->
			<h3 class="font-bold text-lg text-neutral" v-t>{{ title }}</h3>
			<!-- Conditional message display -->
			<p v-if="innerHtml == ''" class="py-4 text-neutral" v-t>
				{{ message }}
			</p>
			<p v-else class="py-4 text-neutral" v-html="innerHtml"></p>
			<!-- Modal action buttons -->
			<div class="modal-action text-neutral">
				<label @click="accept()" class="btn shadow-lg bg-base-300 text-neutral" v-t>{{
					button
				}}</label>
				<button v-if="button2" @click="goToLink"
					class="btn btn-outline btn-primary hover:text-base-content normal-case text-base" v-t>
					{{ button2 }}
				</button>
			</div>
		</div>
	</div>
	<!-- Teleport for layout 3, renders modal in body -->
	<Teleport v-else-if="appComponent.config.layout == 3" to="body">
		<dialog class="modal in w-screen h-screen bg-neutral-content/80">
			<!-- Dialog content container -->
			<div
				class="relative rounded-box min-w-[98%] sm:min-w-[370px] sm:max-w-[50%] min-h-[270px] max-h-[75%] overflow-hidden text-neutral/80">
				<!-- Close button for the dialog -->
				<button class="absolute right-6 top-5 hover:scale-125 text-neutral" @click="close()">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
						<path d="M2 2L18 18" stroke="currentColor" stroke-width="3" />
						<path d="M18 2L2 18" stroke="currentColor" stroke-width="3" />
					</svg>
				</button>
				<!-- Dialog title -->
				<h3 class="w-full p-4 bg-base-300 text-xl font-bold" v-t>
					{{ title }}
				</h3>
				<!-- Content area for message and action buttons -->
				<div class="bg-base-200 p-4 flex flex-col justify-start items-center gap-4 rounded-b-box">
					<!-- Message display -->
					<p class="text-lg text-start w-full text-neutral/80 min-h-16 max-w-2xl" v-t>
						{{ message }}
					</p>
					<div class="flex w-full">
						<!-- Action buttons container -->
						<div class="w-full flex lg:flex-row flex-col justify-end lg:items-center items-end gap-4">
							<button @click="accept()"
								class="btn btn-outline btn-primary hover:text-base-content normal-case text-base" v-t>
								{{ button }}
							</button>
							<button v-if="button2" @click="goToLink"
								class="btn btn-outline btn-primary hover:text-base-content normal-case text-base" v-t>
								{{ button2 }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>

<!-- FILE DOCUMENTED -->

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the promotion modal.
 */
export default defineComponent({
	props: {
		/**
		 * Promotion object passed as a prop.
		 */
		promotion: Object,
	},
	data() {
		/**
		 * Initialize component data.
		 * @type {any} appComponent - Reference to the application component.
		 * @type {any} emitter - Event emitter for communication.
		 * @type {any} promotionModal - Local reference to the promotion object.
		 */
		let appComponent: any = this.$appComponent;
		let emitter = this.$emitter();
		let promotionModal: any = this.promotion;
		return {
			appComponent,
			emitter,
			promotionModal,
		};
	},
	methods: {
		/**
		 * Close the promotion modal and emit a close event.
		 */
		close() {
			this.appComponent.closeModal(); // Close the modal in the app component.
			this.emitter.emit('close:modalPromotion'); // Emit close event.
		},

		// Method to sanitize HTML content by removing inline styles and classes
		sanitizeContent(html) {
		    const parser = new DOMParser() // Create a new DOMParser instance
		    const doc = parser.parseFromString(html, "text/html") // Parse the HTML string into a document

		    // Remove styles and classes from all elements
		    const elements = doc.body.querySelectorAll("*")
		    elements.forEach(el => {
		        el.removeAttribute("style")
		        el.removeAttribute("class")
		        el.removeAttribute("color")
		        el.removeAttribute("face")
		        el.removeAttribute("size")
		    })
		
		    return doc.body.innerHTML
		},

        // Method to mount SVG content into a shadow DOM
        shadowContent(element, content) {
            // Check if the element exists
            if (!element) return

			const sanitized = this.sanitizeContent(content)

            // Check if the element is already a shadow DOM host
            if (!element.shadowRoot) {
              const shadow = element.attachShadow({ mode: 'open' })
              shadow.innerHTML = sanitized
            } else {
              element.shadowRoot.innerHTML = sanitized
            }
}
	},
});
</script>

<template>
	<!-- Main modal container -->
	<div class="modal z-[999999999]">
		<!-- General container for modal content -->
		<div
			class="container-general w-11/12 max-w-3xl flex flex-col justify-center items-center h-[98%]"
		>
			<!-- Title container with close button -->
			<div
				class="cointainer-tile bg-base-300 w-11/12 max-w-3xl rounded-t-lg flex justify-center items-center h-12 relative"
			>
				<!-- Modal title -->
				<h3
					class="font-bold text-md md:text-xl text-center w-3/5 text-accent"
					v-html="promotionModal.title"
				></h3>
				<!-- Close button -->
				<label
					@click="close()"
					class="btn btn-sm btn-circle absolute right-4 shadow-lg text-white bg-error"
					>✕</label
				>
			</div>
			<!-- Container for image and text content -->
			<div
				class="container-img-text w-11/12 max-w-3xl overflow-y-auto bg-base-400 rounded-b-lg"
			>
				<!-- Promotion image -->
				<div
					class="promotion-image px-5 w-auto h-auto max-h-[50%] shadow-md"
				>
					<img
						:src="promotionModal.urlImage"
						class="w-auto h-full object-contain object-center mx-auto"
					/>
				</div>
				<!-- Text content of the promotion -->
				<div
					class="paragraph-image bg-base-400 h-72 w-11/14 m-4 overflow-y-auto"
				>
					<p
						class="p-4"
						:class="appComponent.config.layout != undefined && appComponent.config.layout == 3 ? 'text-neutral' : 'text-neutral'"
						:ref="element => shadowContent(element, promotionModal.content)">
					</p>
				</div>
				<!-- Conditional link/button if URL is provided -->
				<div
					v-if="
						promotionModal.url != undefined &&
						promotionModal.url != ''
					"
					class="paragraph-image bg-base-400 h-auto max-h-[24rem] w-11/14 m-4 overflow-y-auto flex flex-col items-center"
				>
					<RouterLink :to="promotionModal.url">
						<!-- Accept button -->
						<button
							@click="close()"
							class="bg-accent p-4 rounded-xl text-neutral transition ease-in-out hover:scale-105 my-4"
						>
							{{ $t('Aceptar') }}
						</button>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
/* Custom scrollbar styles for div elements */
div::-webkit-scrollbar {
	width: 0.5em; /* Width of the scrollbar */
	height: 8px; /* Height of the scrollbar */
}
div::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.436); /* Shadow for the track */
	border-radius: 20px; /* Rounded corners for the track */
}
div::-webkit-scrollbar-thumb {
	background-color: rgb(
		217,
		217,
		217
	) !important; /* Color of the scrollbar thumb */
	border-radius: 20px; /* Rounded corners for the thumb */
}
.paragraph-image table {
	color: black; /* Text color for tables within paragraph-image class */
}
</style>

<!-- FILE DOCUMENTED -->

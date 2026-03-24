<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import crossClose from '@/components/icons/IconClose.vue'; // Importing the crossClose icon component

export default defineComponent({
	props: {
		action: { type: String, default: '' }, // Prop to receive an action string with a default value
	},
	components: {
		crossClose, // Registering the crossClose component
	},
	data() {
		let emitter = this.$emitter(); // Getting the event emitter instance
		let appComponent: any = this.$appComponent; // Accessing the application component
		let info = {}; // Initializing an info object to hold modal data
		return {
			emitter,
			appComponent,
			info,
		};
	},
	beforeMount() {
		// Lifecycle hook that runs before the component is mounted
		if (
			this.appComponent.config &&
			this.appComponent.config.ModalTemplates &&
			this.appComponent.config.ModalTemplates.length > 0
		) {
			// Checking if ModalTemplates exist in the app component's config
			this.info = this.appComponent.config.ModalTemplates.filter(
				(modal) =>
					modal['actionModal'] === this.action && modal['state']
			)[0]; // Filtering the modal templates based on action and state
			if (this.info == undefined) {
				this.close(); // Closing the modal if no matching info is found
			}
		} else {
			this.close(); // Closing the modal if no templates are available
		}
	},
	methods: {
		close() {
			this.appComponent.closeModalV2(); // Method to close the modal
		},
		imgError(e) {
			this.info['urlImage'] = ''; // Resetting the image URL on error
		},
		redirect(url?: string) {
			// Method to handle redirection based on the provided URL
			if (url && url.trim() !== '') {
				const isExternal =
					url.includes('http') || /^[\w-]+\.[a-z]{2,}/i.test(url); // Checking if the URL is external
				if (isExternal) {
					const completeUrl = url.includes('http')
						? url
						: `http://${url}`; // Constructing the complete URL
					window.open(completeUrl, '_blank'); // Opening the external URL in a new tab
				} else {
					const internalUrl = url.startsWith('/') ? url : `/${url}`; // Constructing the internal URL
					this.$router.push(internalUrl); // Navigating to the internal URL
				}
			}
		},
	},
});
</script>
<template>
	<!-- Teleporting the modal to the body element -->
	<Teleport to="body">
		<dialog
			v-if="info != undefined && info.state != undefined && info.state"
			class="modal in w-screen h-screen bg-black/80 z-[999999999]"
		>
			<!-- Modal container -->
			<div class="relative rounded-lg w-[98%] md:w-[60%] overflow-hidden">
				<div
					:class="
						appComponent.config.layout != undefined &&
						appComponent.config.layout != 3 &&
						appComponent.config.layout != 6 &&
						appComponent.config.layout != 5
							? 'bg-neutral text-neutral-content'
							: 'bg-secondary text-neutral'
					"
					class="w-full py-2 px-4 md:p-6 gap-2 flex justify-between items-center"
				>
					<p
						class="text-center text-md md:text-2xl font-poppinsr"
						v-t
					>
						{{ info.title }}
					</p>
					<button
						@click="close()"
						:class="[
							'cursor pointer hover:scale-105 transition-all relative',
							'flex shrink-0 items-center justify-center w-10 h-10 md:w-9',
							'md:h-9 rounded-full bg-gradient-to-b from-[#cc4a4c] to-red-700 p-1',
						]"
					>
						<span
							class="w-full h-full p-1 bg-gradient-to-b from-[#c54443] to-[#a22e2d] rounded-full flex justify-center items-center"
						>
							<crossClose
								class="drop-shadow-[1px_2px_3px_black] text-neutral"
							></crossClose>
						</span>
					</button>
				</div>
				<div
					v-if="
						info.typeModal &&
						info.typeModal != 2 &&
						info.urlImage != undefined &&
						info.urlImage != ''
					"
					class="pt-[29%] relative"
					@click="
						redirect(
							info.urlRedirection != undefined
								? info.urlRedirection
								: ''
						)
					"
				>
					<img
						:src="info.urlImage"
						alt="Imagen promotion"
						class="absolute top-0 left-0 w-full h-full object-fill bg-secondary-content"
						:class="
							info.urlRedirection != undefined &&
							info.urlRedirection != ''
								? 'cursor-pointer'
								: ''
						"
						@error="imgError"
					/>
				</div>
				<div
					:class="[
						info.typeModal && info.typeModal == 3
							? 'absolute z-50 bottom-2 right-2 md:bottom-4 md:right-4'
							: appComponent.config.layout != undefined &&
								  appComponent.config.layout != 3 &&
								  appComponent.config.layout != 6 &&
								  appComponent.config.layout != 5
								? 'bg-neutral text-neutral-content py-8 px-8 md:px-12 flex flex-col justify-start items-start gap-4 rounded-b-box'
								: 'bg-base-200 text-neutral py-8 px-8 md:px-12 flex flex-col justify-start items-start gap-4 rounded-b-box',
					]"
				>
					<p
						v-if="
							info.subTitle != undefined &&
							info.typeModal &&
							info.typeModal != 3
						"
						class="text-md md:text-2xl font-poppinsr"
						v-t
					>
						{{ info.subTitle }}
					</p>
					<p
						v-if="
							info.htmlDescription != undefined &&
							info.typeModal &&
							info.typeModal != 3
						"
						class="w-full font-poppinssl-all text-xs md:text-sm overflow-auto"
						:class="
							info.typeModal == 2
								? 'max-h-[305px]'
								: 'max-h-[105px]'
						"
						v-html="info.htmlDescription"
						v-t
					></p>
					<div
						class="w-full flex justify-end items-center gap-4 relative mt-2"
					>
						<!-- Button container -->
						<button
							@click="
								close();
								redirect(
									info.urlButton != undefined
										? info.urlButton
										: ''
								);
							"
							:style="{
								backgroundColor:
									info.colorButton != undefined &&
									info.colorButton != ''
										? info.colorButton
										: 'hsl(var(--af))',
								borderRadius:
									info.roundedButton != undefined &&
									info.roundedButton != ''
										? info.roundedButton
										: '0.5rem',
							}"
							:class="
								info.colorButton != undefined &&
								info.colorButton != '' &&
								[
									'#ffffff',
									'#fff',
									'white',
									'rgb(255, 255, 255)',
								].includes(info.colorButton.toLowerCase())
									? 'text-neutral-content'
									: 'text-neutral'
							"
							class="font-poppinssl py-2 px-4 text-xs md:text-base hover:scale-105 transition-all"
							v-t
						>
							{{
								info.textButton != undefined &&
								info.textButton != ''
									? info.textButton
									: 'Cerrar'
							}}
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>
<style scoped>
.font-poppinssl-all * {
	@apply font-poppinssl; /* Applying font styles to all elements within the font-poppinssl-all class */
}
</style>

<!-- FILE DOCUMENTED -->

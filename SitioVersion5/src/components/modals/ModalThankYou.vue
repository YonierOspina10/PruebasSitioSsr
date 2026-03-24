<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import crossClose from '../icons/IconClose.vue'; // Importing the crossClose icon component

export default defineComponent({
	components: {
		crossClose, // Registering the crossClose component
	},
	data() {
		let appComponent: any = this.$appComponent; // Accessing the appComponent from the context
		let emitter = this.$emitter(); // Accessing the emitter for event handling
		return {
			appComponent, // Exposing appComponent to the template
			emitter, // Exposing emitter to the template
		};
	},
	mounted() {
		this.appComponent.gAnalytics('deposit_success'); // Tracking the deposit success event
	},
	methods: {
		close() {
			this.appComponent.closeModal(); // Method to close the modal
		},
	},
});
</script>

<template>
	<!-- Main modal container -->
	<div class="modal z-[999999999]">
		<!-- General container for modal content -->
		<div
			class="container-general md:min-w-[330px] min-h-[350px] w-[88%] h-[55%] lg:w-[23%] lg:h-[53%] lg:p-1 flex flex-col justify-center items-center bg-neutral rounded-3xl p-1"
		>
			<!-- Background and layout for modal content -->
			<div
				class="w-full h-full bg-primary-content overflow-hidden relative rounded-3xl flex items-center justify-center"
			>
				<!-- Close button for the modal -->
				<button
					@click="close()"
					class="hover:brightness-90 hover:scale-125 absolute right-[2%] top-[2%] z-50 transition-all ease-in-out"
				>
					<crossClose
						class="w-6 h-6 bg-red-700 rounded-full p-0.5 border-solid border-1 border-neutral brightness-[1.3] cursor-pointer hover:brightness-50 drop-shadow-[0px_5px_6px_#00000040]"
					></crossClose>
				</button>
				<!-- Decorative background element -->
				<span
					:class="[
						'bg-transparent lg:bg-neutral w-full h-[38%] absolute bottom-0 left-0',
						'after:w-[105%] after:pb-[60%] after:rounded-[80%] after:absolute after:rotate-[348deg] after:drop-shadow-[0px_-25px_8px_#00000014]',
						'after:top-[-77%] after:left-[-3%] after:bg-neutral after:shadow-[-25px_150px_0px_110px] after:shadow-neutral',
					]"
				></span>
				<!-- Content area for the modal -->
				<div
					class="relative flex flex-col w-full h-full justify-start items-center pt-5"
				>
					<!-- Image displayed in the modal -->
					<img
						:src="
							appComponent.config.depositos != undefined &&
							appComponent.config.depositos.ThankYouDeposit !=
								undefined &&
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							] != undefined &&
							appComponent.config.depositos.ThankYouDeposit[
								appComponent.country
							].image != undefined
								? appComponent.config.depositos.ThankYouDeposit[
										appComponent.country
									].image
								: 'https://images.virtualsoft.tech/m/msj18212T1712757622.png'
						"
						alt="icon-modal"
						class="w-[85%] h-[44%] object-contain mb-5 pointer-events-none min-w-[263px] min-h-[144px]"
					/>
					<!-- Text content area -->
					<div
						class="flex flex-col justify-between items-center h-full"
					>
						<span class="flex flex-col gap-y-1 md:gap-y-2">
							<!-- Primary message text -->
							<p
								class="pr-10 text-neutral-content w-full [font-size:_clamp(15px,10vw,38px)] drop-shadow-[0px_6px_4px_#00000078] font-poppinssb italic uppercase text-center"
							>
								{{
									appComponent.config.depositos !=
										undefined &&
									appComponent.config.depositos
										.ThankYouDeposit != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[
										appComponent.country
									] != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[appComponent.country]
										.text1 != undefined
										? appComponent.config.depositos
												.ThankYouDeposit[
												appComponent.country
											].text1
										: $t('¡Depósito')
								}}
							</p>
							<!-- Secondary message text -->
							<p
								class="pl-8 pr-2 py-4 text-transparent bg-neutral-content/50 bg-clip-text subtitle-text font-poppinsb italic uppercase w-full text-center [font-size:_clamp(20px,13vw,48px)]"
							>
								{{
									appComponent.config.depositos !=
										undefined &&
									appComponent.config.depositos
										.ThankYouDeposit != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[
										appComponent.country
									] != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[appComponent.country]
										.text2 != undefined
										? appComponent.config.depositos
												.ThankYouDeposit[
												appComponent.country
											].text2
										: $t('Exitoso!')
								}}
							</p>
						</span>
						<!-- Link button to navigate -->
						<RouterLink
							:to="
								appComponent.config.depositos != undefined &&
								appComponent.config.depositos.ThankYouDeposit !=
									undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								] != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].button != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].button.url != undefined
									? appComponent.config.depositos
											.ThankYouDeposit[
											appComponent.country
										].button.url
									: '/deportes'
							"
							@click="close()"
							class="font-poppinssl [font-size:_clamp(12px,2vw,15px)] bg-primary-content p-3 rounded-xl drop-shadow-[0px_5px_6px_#00000040] hover:brightness-90 hover:scale-110 transition-all ease-in-out"
							v-html="
								appComponent.config.depositos != undefined &&
								appComponent.config.depositos.ThankYouDeposit !=
									undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								] != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].button != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].button.text != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].button.text != undefined
									? appComponent.config.depositos
											.ThankYouDeposit[
											appComponent.country
										].button.text
									: $t('Apuesta <span>¡AQUÍ!</span>')
							"
						></RouterLink>
						<!-- Description text -->
						<p
							class="font-poppinssl [font-size:_clamp(12px,2vw,15px)] text-neutral-content"
						>
							{{
								appComponent.config.depositos != undefined &&
								appComponent.config.depositos.ThankYouDeposit !=
									undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								] != undefined &&
								appComponent.config.depositos.ThankYouDeposit[
									appComponent.country
								].description != undefined
									? appComponent.config.depositos
											.ThankYouDeposit[
											appComponent.country
										].description
									: $t('Agradecemos su')
							}}
							<span
								class="font-poppinssb text-transparent italic bg-primary-content bg-gradient-to-t from-primary-content to-black/50 bg-clip-text"
								>{{
									appComponent.config.depositos !=
										undefined &&
									appComponent.config.depositos
										.ThankYouDeposit != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[
										appComponent.country
									] != undefined &&
									appComponent.config.depositos
										.ThankYouDeposit[appComponent.country]
										.description2 != undefined
										? appComponent.config.depositos
												.ThankYouDeposit[
												appComponent.country
											].description2
										: $t('confianza')
								}}</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
/* Text shadow for subtitle */
.subtitle-text {
	text-shadow: 0px 2px 4px hsl(var(--pc));
}

/* Custom scrollbar styles */
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

/* Style for tables within paragraph-image class */
.paragraph-image table {
	color: black; /* Text color for table */
}
</style>

<!-- FILE DOCUMENTED -->

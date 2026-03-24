<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import methodsDeposit from '@/components/methodsDeposit.vue'; // Importing methodsDeposit component
import referrals from '@/views/Promotions/Referrals.vue'; // Importing referrals view
import apiService from '@/services/ApiService'; // Importing API service for backend requests
import { Button } from 'flowbite-vue'; // Importing Button component from Flowbite Vue
import ExitIconRe from '@/components/icons/ExitIconRe.vue'; // Importing ExitIconRe component

export default defineComponent({
	props: {
		dataB: {
			// Prop to receive data, defaulting to an object with bonos array
			type: Object,
			default: { bonos: [] },
		},
	},
	computed: {
		referrals() {
			// Computed property to return referrals
			return referrals;
		},
	},
	components: { ExitIconRe, Button, methodsDeposit, ExitIcon }, // Registering components used in this component
	data() {
		let config = this.$config(); // Fetching configuration
		let appComponent: any = this.$appComponent; // Accessing app component
		let emitter = this.$emitter(); // Getting event emitter
		let bonos: object | undefined = []; // Initializing bonos as an empty array
		let onModal: boolean = false; // State to control modal visibility
		let title: string = ''; // Title for modal
		let message: string = ''; // Message for modal
		let bonusId: number = 0; // ID of the selected bonus
		let button: boolean = true; // State to control button visibility
		let onModalReclaimed: boolean = false; // State to control reclaimed modal visibility
		return {
			config,
			appComponent,
			emitter,
			bonos,
			onModal,
			title,
			message,
			bonusId,
			button,
			onModalReclaimed,
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on unmount
	},
	updated() {
		this.bonos = this.dataB.bonos; // Updating bonos when dataB changes
	},
	mounted() {
		this.emitter.on('accept:modal', () => {
			// Listening for accept:modal event
			this.appComponent.closeModal(); // Closing modal
			this.appComponent.showModalReferralAwards = false; // Hiding referral awards modal
			location.reload(); // Reloading the page
		});
	},
	methods: {
		close() {
			// Method to close the modal
			this.appComponent.showModalReferralAwards = false; // Hiding referral awards modal
		},
		accept() {
			// Method to emit accept:modal event
			this.emitter.emit('accept:modal');
		},
		choseAward(i) {
			// Method to choose an award
			this.title = this.$t('Redimir premio'); // Setting modal title
			this.message = this.$t(
				'¿ Esta seguro que desea redimir este premio?'
			); // Setting modal message
			this.onModal = true; // Showing modal
			this.bonusId = i; // Storing selected bonus ID
			this.button = false; // Hiding button
		},
		reedm(idBonus) {
			// Method to redeem a bonus
			const params = {
				// Parameters for API request
				tokenId: this.dataB.tokenId, // User ID
				Award: parseInt(this.dataB.AwardId), // Award ID
				ChoicedBonus: parseInt(idBonus), // Selected bonus ID
			};
			apiService // Making API request to redeem bonus
				.request('activate_referent_bonuses', params)
				.then((response: any) => {
					// Handling API response
					if (response.code == 0) {
						this.onModalReclaimed = true; // Showing reclaimed modal
					} else {
						this.onModal = false // Hiding modal
						// Error response
						this.appComponent.modal = {
							// Setting error modal properties
							showModal: 'notification',
							titleModal: this.$t('Error'),
							messageModal: this.$t(response.msg),
							buttonModal: this.$t('Aceptar'),
							orderModal: 'closeModal',
						};
					}
				});
		},
	},
});
</script>
<template>
	<!-- Modal for displaying successful bonus reclamation -->
	<div
		v-if="onModalReclaimed"
		class="modal z-[999999999] bg-neutral-content/0 before:absolute before:content-[''] before:w-full before:h-full before:top-0 before:left-0 before:[backdrop-filter:_blur(10px)] before:shadow-[inset_0px_0px_90px_70px_black] before:bg-accent-content/50 before:saturate-200"
	>
		<img
			src="https://images.virtualsoft.tech/site/doradobet/gif/Gold%20Confetti%20.gif"
			class="w-full h-full object-cover object-center absolute"
		/>
		<div
			class="rounded-[3rem] p-10 flex flex-col gap-y-5 justify-center items-center relative in"
		>
			<label
				v-if="config.layout != undefined && config.layout == 3"
				@click="close()"
				class="absolute text-xl top-2 sm:-top-2 right-2 sm:-right-2 hover:scale-105 z-1 cursor-pointer in"
			>
				<!-- Exit icon for closing modal -->
				<ExitIconRe
					:fill="'#ffffff'"
					:fill2="'#ee3b3f'"
					class="w-10 h-10 sm:w-16 sm:h-16"
				/>
			</label>
			<h2 class="text-center text-primary text-[3rem] font-poppinssb">
				{{ $t('¡Felicidades!') }}
				<!-- Congratulations message -->
			</h2>
			<h3 class="text-center text-primary text-xl font-poppinssl">
				{{ $t('Su premio ha sido reclamado exitosamente.') }}
				<!-- Success message -->
			</h3>
			<p class="text-center font-poppinssl w-[70%]">
				{{
					$t(
						'Disfruta de tu recompensa y sigue participando para más sorpresas.'
					)
				}}
			</p>
		</div>
	</div>
	<!-- Modal for redeeming a bonus -->
	<div v-if="onModal" class="modal z-[99999999]">
		<div
			class="bg-gradient-to-b from-accent-content to-neutral-content/50 bg-accent-content rounded-[3rem] p-10 flex flex-col gap-y-6 justify-center items-center relative"
		>
			<label
				v-if="config.layout != undefined && config.layout == 3"
				@click="
					onModal = false;
					button = true;
				"
				class="absolute text-xl -top-1 -right-1 hover:scale-105 z-1 cursor-pointer in"
			>
				<ExitIconRe class="w-10 h-10" />
				<!-- Exit icon for closing modal -->
			</label>
			<h3 class="text-center font-poppinssb in" v-t>{{ title }}</h3>
			<!-- Modal title -->
			<p class="text-center font-poppinssl in" v-t>{{ message }}</p>
			<!-- Modal message -->
			<div class="flex w-full gap-x-7 justify-center items-center">
				<button
					@click="reedm(bonusId)"
					class="rounded-full bg-neutral-content bg-gradient-to-r from-primary-content/70 to-primary-content/70 hover:bg-primary-content duration-300 transition-all px-5 sm:px-3 py-2 font-poppinsm text-xl sm:text-base in"
				>
					{{ $t('Aceptar') }}
					<!-- Accept button text -->
				</button>
			</div>
		</div>
	</div>
	<!-- Main modal for displaying bonuses -->
	<div class="modal fixed bg-neutral-content/80" @click="close()">
		<div
			@click.stop=""
			class="bg-gradient-to-b from-accent-content to-neutral-content/50 bg-accent-content rounded-xl sm:rounded-[3rem] relative w-[80%] sm:w-[75%] h-[80%] sm:h-[65%]"
		>
			<label
				v-if="config.layout != undefined && config.layout == 3"
				@click="close()"
				class="absolute text-xl top-2 sm:-top-2 right-2 sm:-right-2 hover:scale-105 z-1 cursor-pointer in"
			>
				<!-- Exit icon for closing modal -->
				<ExitIconRe
					:fill="'#ffffff'"
					:fill2="'#ee3b3f'"
					class="w-10 h-10 sm:w-16 sm:h-16"
				/>
			</label>
			<img
				:src="
					appComponent.config != undefined &&
					appComponent.config.referrals != undefined &&
					appComponent.config.referrals.modalReferral != undefined &&
					appComponent.config.referrals.modalReferral.bgModal !=
						undefined
						? appComponent.config.referrals.modalReferral.bgModal
						: ''
				"
				class="absolute w-full object-cover h-1/2 -mt-3 in"
			/>
			<div
				class="flex flex-col justify-center items-center -mt-14 sm:-mt-24"
			>
				<img
					:src="
						appComponent.config != undefined &&
						appComponent.config.referrals != undefined &&
						appComponent.config.referrals.modalReferral !=
							undefined &&
						appComponent.config.referrals.modalReferral.iconModal !=
							undefined
							? appComponent.config.referrals.modalReferral
									.iconModal
							: ''
					"
					alt=""
					class="w-[45%] h-[45%] sm:w-auto sm:h-auto [mask-image:_linear-gradient(black_60%_,_transparent)] in"
				/>
				<div class="-mt-2 flex flex-col justify-center items-center in">
					<p
						class="font-poppinsm text-primary-content text-2xl sm:text-4xl"
					>
						{{ $t('Su premio esta aqui') }}
						<!-- Message indicating prize is here -->
					</p>
					<p class="font-poppinsm text-base sm:text-xl">
						{{ $t('Escoje y comienza a ganar') }}
						<!-- Instruction to choose and win -->
					</p>
				</div>
			</div>
			<div
				class="w-[98%] sm:w-[85%] h-[50%] grid grid-cols-1 sm:grid-cols-2 gap-8 overflow-y-auto p-2 mx-auto mt-4"
			>
				<!-- Looping through bonuses to display them -->
				<div
					v-for="bono in dataB.bonos"
					class="border-2 border-transparent hover:border-2 hover:border-primary-content cursor-pointer w-full h-[150px] sm:h-[200px] rounded-3xl transition-all ease-in-out relative duration-700 group shadow-[inset_0px_-14px_1px_-2px] shadow-neutral-content/50 in"
					@click="choseAward(bono.bonoId)"
				>
					<img
						:src="bono.imagen"
						alt="Premio"
						class="w-full h-full rounded-3xl"
					/>
					<button
						class="bg-neutral-content bg-gradient-to-r from-primary-content/70 to-primary-content/70 group-hover:bg-primary-content duration-300 transition-all px-3 py-1 rounded-full absolute -right-1 sm:-right-3 -bottom-3"
					>
						{{ $t('Redimir') }}
						<!-- Redeem button text -->
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
::-webkit-scrollbar {
	height: 0px; /* Hides scrollbar height */
	width: 5px; /* Width of the scrollbar */
	background-color: hsl(var(--bc)); /* Background color of the scrollbar */
}
</style>

<!-- FILE DOCUMENTED -->

<template>
	<!-- Main container for the notification component -->
	<div class="relative flex justify-center items-center">
		<!-- Button to toggle notifications -->
		<button
			@click="
				onNotification = !onNotification;
				startAnime = 0;
				skeleton = true;
				offset = 0;
				notification = [];
				onNotification ? getNotification() : '';
				globalStore.onMenuMain = false;
			"
			class="in h-10 w-10 bg-primary rounded-full flex justify-center items-center hover:scale-105"
		>
			<!-- Notification icon -->
			<img
				src="https://images.virtualsoft.tech/icons/ajuste-saldo.svg"
				class="w-6 h-6"
				alt="notificationIconsButton"
			/>
		</button>
		<!-- Notification dropdown -->
		<div
			v-if="onNotification"
			class="in bg-secondary hidden sm:block fixed sm:absolute top-20 sm:top-14 right-6 sm:right-none w-[95vw] sm:w-96 rounded-b-xl rounded-tl-xl border border-secondary shadow-inner shadow-black/50"
		>
			<!-- Auxiliary container for styling -->
			<div
				id="aux-container"
				class="absolute -top-5 right-0 w-9 h-8 bg-accent"
			></div>
			<!-- Button to close notifications -->
			<button
				@click="
					onNotification = false;
					startAnime = 0;
					skeleton = true;
					offset = 0;
					notification = [];
				"
				class="absolute top-1 right-2 cursor-pointer hover:scale-105"
			>
				<ExitIcon :height="24" :width="24" fill="#FFFFFF" fill2="red" />
			</button>
			<!-- Title of the notification section -->
			<h2
				class="bg-accent h-10 flex justify-center items-center rounded-tl-lg border-b-2 border-primary text-white font-bold text-lg"
			>
				{{ $t('Movimientos') }}
				<!-- Translated title -->
			</h2>
			<!-- Container for notifications -->
			<div class="notiContainer w-full h-[70vh] sm:h-96 overflow-y-auto">
				<!-- Display notifications if not in skeleton state -->
				<div v-show="!skeleton" class="w-full grid gap-1 px-2 pt-2">
					<TransitionGroup
						class="grid"
						:css="true"
						@enter="onEnterToast"
					>
						<!-- Loop through notifications -->
						<button
							v-for="(notificatio, index) in notification"
							:key="index"
							class="border-b-2 border-accent-focus w-full h-20 rounded-lg flex justify-between items-center gap-2 py-1 px-2"
							ref="card"
							:data-index="index"
						>
							<!-- Notification icon -->
							<img
								:src="notificatio.icon"
								alt="notificationIcon"
								class="w-10 aspect-square object-contain object-center"
							/>
							<!-- Notification details -->
							<div
								class="w-full h-full flex flex-col justify-center items-start gap-1 text-start text-sm"
							>
								<span class="text-base-300 mt-2">{{
									notificatio.description
								}}</span>
								<span
									:class="
										notificatio.balanceIncrease
											? 'text-[#4FA87F]'
											: 'text-[#C1896C]'
									"
									>{{ notificatio.title }}</span
								>
							</div>
							<!-- Timestamp and amount -->
							<div
								class="w-52 h-full flex flex-col justify-center gap-2 text-neutral items-end text-end"
							>
								<span class="text-xs">{{
									notificatio.timestamps
								}}</span>
								<span class="text-xl leading-[18px] font-bold">
									{{ notificatio.currency }}
									{{ notificatio.amount }}</span
								>
							</div>
						</button>
					</TransitionGroup>
				</div>
				<!-- Skeleton loading state -->
				<div v-if="skeleton" class="w-full grid gap-1 p-2">
					<AnimatedPlaceholder
						v-for="index in 10"
						:key="index"
						class="w-full h-20 aspect-square rounded-xl"
					/>
				</div>
				<!-- Load more notifications button -->
				<div class="w-full h-14 flex justify-center items-center">
					<button
						@click="getLoadMoreNotification()"
						class="h-10 w-40 bg-success text-white rounded-lg hover:scale-[1.03]"
					>
						{{ $t('Cargar mas') }}
						<!-- Translated button text -->
					</button>
				</div>
			</div>
		</div>
		<!-- Teleport for mobile modal -->
		<Teleport to="body">
			<div
				v-if="onNotification"
				class="modal sm:hidden fixed top-0 left-0 bg-black/75 w-full h-full flex justify-center items-center"
			>
				<!-- Modal container for notifications -->
				<div
					class="in bg-secondary w-[95vw] sm:w-96 rounded-xl border border-secondary shadow-inner shadow-black/50"
				>
					<!-- Button to close modal -->
					<button
						@click="
							onNotification = false;
							startAnime = 0;
							skeleton = true;
							offset = 0;
							notification = [];
						"
						class="absolute top-1 right-2 cursor-pointer hover:scale-105"
					>
						<ExitIcon
							:height="24"
							:width="24"
							fill="#FFFFFF"
							fill2="red"
						/>
					</button>
					<!-- Title of the notification modal -->
					<h2
						class="bg-accent h-10 flex justify-center items-center rounded-lg border-b-2 border-primary text-white font-bold text-lg"
					>
						{{ $t('Movimientos') }}
						<!-- Translated title -->
					</h2>
					<!-- Container for notifications in modal -->
					<div
						class="notiContainer w-full h-[70vh] sm:h-96 overflow-y-auto"
					>
						<!-- Display notifications if not in skeleton state -->
						<div
							v-show="!skeleton"
							class="w-full grid gap-1 px-2 pt-2"
						>
							<TransitionGroup
								class="grid"
								:css="true"
								@enter="onEnterToast"
							>
								<!-- Loop through notifications -->
								<button
									v-for="(notificatio, index) in notification"
									:key="index"
									class="border-b-2 border-accent-focus w-full h-20 rounded-lg flex justify-between items-center gap-2 py-1 px-2"
									ref="card"
									:data-index="index"
								>
									<!-- Notification icon -->
									<img
										:src="notificatio.icon"
										alt="notificationIcon"
										class="w-10 aspect-square object-contain object-center"
									/>
									<!-- Notification details -->
									<div
										class="w-full h-full flex flex-col justify-center items-start gap-1 text-start text-sm"
									>
										<span class="text-base-300 mt-2">{{
											notificatio.description
										}}</span>
										<span
											:class="
												notificatio.balanceIncrease
													? 'text-[#4FA87F]'
													: 'text-[#C1896C]'
											"
											>{{ notificatio.title }}</span
										>
									</div>
									<!-- Timestamp and amount -->
									<div
										class="w-52 h-full flex flex-col justify-center gap-2 text-neutral items-end text-end"
									>
										<span class="text-xs">{{
											notificatio.timestamps
										}}</span>
										<span
											class="text-xl leading-[18px] font-bold"
										>
											{{ notificatio.currency }}
											{{ notificatio.amount }}</span
										>
									</div>
								</button>
							</TransitionGroup>
						</div>
						<!-- Skeleton loading state -->
						<div v-if="skeleton" class="w-full grid gap-1 p-2">
							<AnimatedPlaceholder
								v-for="index in 10"
								:key="index"
								class="w-full h-20 aspect-square rounded-xl"
							/>
						</div>
						<!-- Load more notifications button -->
						<div
							class="w-full h-14 flex justify-center items-center"
						>
							<button
								@click="getLoadMoreNotification()"
								class="h-10 w-40 bg-success text-neutral rounded-lg hover:scale-[1.03]"
							>
								{{ $t('Cargar mas') }}
								<!-- Translated button text -->
							</button>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import anime from 'animejs'; // Importing anime.js for animations
import NotificationIcon from '@/components/icons/notificationIcon.vue'; // Notification icon component
import { Button } from 'flowbite-vue'; // Button component from Flowbite
import IconClose from '@/components/icons/IconClose.vue'; // Close icon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Exit icon component
import apiService from '@/services/ApiService'; // API service for network requests
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Placeholder component for loading state
import { useGlobalStore } from '@/stores/global'; // Global store for state management
export default defineComponent({
	components: {
		AnimatedPlaceholder, // Registering AnimatedPlaceholder component
		ExitIcon, // Registering ExitIcon component
		IconClose, // Registering IconClose component
		Button, // Registering Button component
		NotificationIcon, // Registering NotificationIcon component
	},
	setup() {
		// Sample transactions data for notifications
		let transactionsTable = [
			{
				transactionId: 1001,
				operationName: 'bonusEntrance',
				title: 'Bono',
				description: 'Bono acreditado',
			},
			{
				transactionId: 1002,
				operationName: 'bonusLeaving',
				title: 'Bono',
				description: 'Bono deducido',
			},
			{
				transactionId: 2001,
				operationName: 'withdrawalCreation',
				title: 'Nota de retiro',
				description: 'Nota creada',
			},
			{
				transactionId: 2002,
				operationName: 'withdrawalPay',
				title: 'Nota de retiro',
				description: 'Nota pagada',
			},
			{
				transactionId: 2003,
				operationName: 'withdrawalDelete',
				title: 'Nota de retiro',
				description: 'Nota anulada',
			},
			{
				transactionId: 3001,
				operationName: 'sportbookBet',
				title: 'Apuesta deportiva',
				description: 'Apuesta realizada',
			},
			{
				transactionId: 3002,
				operationName: 'sportbookPay',
				title: 'Apuesta deportiva',
				description: '¡Ganaste!',
			},
			{
				transactionId: 3003,
				operationName: 'sportbookRollback',
				title: 'Apuesta deportiva',
				description: 'Apuesta anulada',
			},
			{
				transactionId: 4001,
				operationName: 'casinoBet',
				title: 'Casino',
				description: 'Apuesta realizada',
			},
			{
				transactionId: 4002,
				operationName: 'casinoPay',
				title: 'Casino',
				description: '¡Ganaste!',
			},
			{
				transactionId: 4003,
				operationName: 'casinoRollback',
				title: 'Casino',
				description: 'Apuesta anulada',
			},
			{
				transactionId: 5001,
				operationName: 'depositPay',
				title: 'Depósito',
				description: 'Depósito acreditado',
			},
			{
				transactionId: 5002,
				operationName: 'depositDelete',
				title: 'Depósito',
				description: 'Depósito anulado',
			},
			{
				transactionId: 6001,
				operationName: 'adjustmentEntrance',
				title: 'Ajuste',
				description: 'Nuevo ingreso',
			},
			{
				transactionId: 6002,
				operationName: 'adjustmentLeaving',
				title: 'Ajuste',
				description: 'Nuevo débito',
			},
		];
		return { transactionsTable }; // Exposing transactionsTable to the template
	},
	data() {
		// Configuration and state variables
		let config = this.$config(); // Application configuration
		let appComponent: any = this.$appComponent; // Reference to the app component
		let globalStore = useGlobalStore(); // Accessing global store
		let notification: any = []; // Array to hold notifications
		let notificationToast: Array<object> = []; // Array for toast notifications
		let starAnime: number = 0; // Animation start index
		let onNotification: boolean = false; // Notification visibility state
		let offset: number = 0; // Offset for pagination
		let limit: number = 10; // Limit for notifications per request
		let toast: boolean = false; // Toast visibility state
		let skeleton: boolean = true; // Skeleton loading state
		let startAnime: number = 0; // Animation start index
		return {
			config,
			appComponent,
			globalStore,
			notification,
			notificationToast,
			starAnime,
			onNotification,
			offset,
			limit,
			toast,
			skeleton,
			startAnime,
		};
	},
	methods: {
		// Animation for entering toast notifications
		onEnterToast(el: any, done: any) {
			anime({
				targets: el,
				opacity: [0, 1], // Fade in effect
				translateY: [-300, 0], // Slide in effect
				easing: 'easeInOutQuart', // Easing function
				delay: this.startAnime * 100, // Delay based on animation index
				complete: done, // Callback when animation is complete
			});
			this.startAnime += 1; // Increment animation index
		},
		// Fetch notifications from the API
		async getNotification() {
			let params = {
				source: 'user_notifications', // Source of notifications
				where: {
					start: this.offset, // Pagination start
					count: this.limit, // Number of notifications to fetch
				},
				session: {
					usuario: this.appComponent.session.usuario, // User session data
					logueado: this.appComponent.session.logueado, // User login status
				},
			};
			try {
				await apiService
					.request('get', params) // API request
					.then((response: any) => {
						this.notification = response.data.notifications; // Store fetched notifications
						this.notification.forEach((element: any) => {
							this.transactionsTable.filter((item: any) => {
								if (
									item.transactionId == element.transactionId // Match transaction ID
								) {
									element.title = item.title; // Set title
									element.description = item.description; // Set description
									const fechaActual = Math.floor(
										Date.now() / 1000 // Current timestamp
									);
									let fecha =
										fechaActual - element.timestamps; // Calculate time difference
									// Format timestamps based on time difference
									if (fecha < 60) {
										element.timestamps = `Hace ${fecha} segundos`;
									} else if (fecha < 3600) {
										element.timestamps = `Hace ${Math.floor(fecha / 60)} minutos`;
									} else if (fecha < 86400) {
										element.timestamps = `Hace ${Math.floor(fecha / 3600)} horas`;
									} else if (fecha < 2592000) {
										element.timestamps = `Hace ${Math.floor(fecha / 86400)} dias`;
									} else if (fecha < 31536000) {
										element.timestamps = `Hace ${Math.floor(fecha / 2592000)} meses`;
									} else {
										element.timestamps = `Hace ${Math.floor(fecha / 31536000)} años`;
									}
								}
							});
						});
						this.skeleton = false; // Hide loading skeleton
					});
			} catch (e) {}
		},
		// Load more notifications
		async getLoadMoreNotification() {
			this.skeleton = true; // Show loading skeleton
			this.startAnime = 0; // Reset animation start index
			this.offset = this.offset + this.limit; // Update offset for pagination
			this.notificationToast = []; // Clear toast notifications
			let params = {
				source: 'user_notifications', // Source of notifications
				where: {
					start: this.offset, // Pagination start
					count: this.limit, // Number of notifications to fetch
				},
				session: {
					usuario: this.appComponent.session.usuario, // User session data
					logueado: this.appComponent.session.logueado, // User login status
				},
			};
			try {
				await apiService
					.request('get', params) // API request
					.then((response: any) => {
						setTimeout(() => {
							let notification = response.data.notifications; // Store fetched notifications
							notification.forEach((element: any) => {
								this.transactionsTable.filter((item: any) => {
									if (
										item.transactionId ==
										element.transactionId // Match transaction ID
									) {
										element.title = item.title; // Set title
										element.description = item.description; // Set description
										const fechaActual = Math.floor(
											Date.now() / 1000 // Current timestamp
										);
										let fecha =
											fechaActual - element.timestamps; // Calculate time difference
										// Format timestamps based on time difference
										if (fecha < 60) {
											element.timestamps = `Hace ${fecha} segundos`;
										} else if (fecha < 3600) {
											element.timestamps = `Hace ${Math.floor(fecha / 60)} minutos`;
										} else if (fecha < 86400) {
											element.timestamps = `Hace ${Math.floor(fecha / 3600)} horas`;
										} else if (fecha < 2592000) {
											element.timestamps = `Hace ${Math.floor(fecha / 86400)} dias`;
										} else if (fecha < 31536000) {
											element.timestamps = `Hace ${Math.floor(fecha / 2592000)} meses`;
										} else {
											element.timestamps = `Hace ${Math.floor(fecha / 31536000)} años`;
										}
									}
								});
								this.notification.push(element); // Add new notifications to the list
							});
							this.skeleton = false; // Hide loading skeleton
						}, 1000); // Delay for loading effect
					});
			} catch (e) {}
		},
	},
});
</script>
<style scoped>
/* Custom scrollbar button styling */
*::-webkit-scrollbar-button {
	width: 1px; /* Width of the scrollbar button */
}

/* Styling for the auxiliary container */
#aux-container {
	-webkit-mask-image: radial-gradient(
		circle 10px at 11px 0,
		transparent 0,
		transparent 20px,
		black 21px
	); /* Masking effect for the auxiliary container */
}
</style>

<!-- FILE DOCUMENTED -->

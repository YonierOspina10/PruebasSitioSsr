<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary Vue functions
import crossClose from '../icons/crossClose.vue'; // Import close icon component
import notificationIcon from '../icons/notificationIcon.vue'; // Import notification icon component
import successIcon from '../icons/successIcon.vue'; // Import success icon component
import warningIcon from '../icons/warningIcon.vue'; // Import warning icon component
import anime from 'animejs'; // Import anime.js for animations

export default defineComponent({
	components: {
		successIcon, // Register success icon component
		notificationIcon, // Register notification icon component
		crossClose, // Register close icon component
		warningIcon, // Register warning icon component
	},
	data() {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Reference to the app component
		let interval: any = undefined; // Interval for notifications
		let alertsLocal: any = ref([]); // Reactive reference for local alerts
		return {
			config, // Expose config to the template
			appComponent, // Expose appComponent to the template
			interval, // Expose interval to the template
			alertsLocal, // Expose alertsLocal to the template
		};
	},
	mounted() {
		this.alertsLocal.value = this.appComponent.notificationsToast; // Initialize local alerts with notifications from app component
	},
	methods: {
		onEnter(el: any, done: any) {
			// Animation for entering notifications
			anime({
				targets: el, // Target the element
				translateX: [300, -350], // Animate horizontal translation
				direction: 'alternate', // Alternate direction for animation
				duration: 1000, // Duration of the animation
				delay: el.dataset.index * 500, // Delay based on index
				endDelay: 2000, // Delay before completing the animation
				complete: done, // Callback when animation is complete
			});
		},
		onAfterEnter() {
			// Clear notifications after they have entered
			setTimeout(() => {
				this.appComponent.notificationsToast = []; // Clear notifications from app component
			}, this.appComponent.notificationsToast.length * 1000); // Delay based on number of notifications
		},
	},
});
</script>

<template>
	<!-- Main section for notifications, positioned fixed at the top right -->
	<section
		class="flex flex-col justify-center items-center gap-2 fixed top-20 -right-96 z-[1000]"
	>
		<!-- Transition group for handling entering and leaving notifications -->
		<TransitionGroup
			class="grid"
			:css="true"
			@enter="onEnter"
			@after-enter="onAfterEnter"
			mode="out-in"
		>
			<!-- Notification item, rendered for each notification in the app component -->
			<div
				:id="'notification-' + index"
				v-for="(item, index) in appComponent.notificationsToast"
				:key="index"
				ref="notification"
				:data-index="index"
				class="bgCard min-w-[180px] flex justify-between items-center gap-2 px-2 py-2 rounded-lg border border-solid"
				:class="
					item.balanceIncrease ? 'border-success' : 'border-error'
				"
			>
				<!-- Notification icon based on balance increase -->
				<img
					:src="
						item.balanceIncrease
							? 'https://images.virtualsoft.tech/m/msjT1694553828.png'
							: 'https://images.virtualsoft.tech/m/msjT1694553731.png'
					"
					alt="NotificationDepositIcon"
					class="w-9 aspect-square object-contain object-center"
				/>
				<!-- Notification text displaying currency and amount -->
				<div
					class="text-lg text-neutral font-bold flex justify-center items-center gap-1"
				>
					<span>{{ item.currency }}/.</span>
					<!-- Currency display -->
					<span>{{ item.amount }}</span>
					<!--  Amount display -->
				</div>
			</div>
		</TransitionGroup>
	</section>
</template>

<style>
/* Styles for the notification card */
.bgCard {
	border-radius: 6px; /* Rounded corners */
	background: rgba(120, 120, 120, 0.3); /* Semi-transparent background */
	backdrop-filter: blur(10px); /* Blur effect for background */
}
</style>

<!-- FILE DOCUMENTED -->

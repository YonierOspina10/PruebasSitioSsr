<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import crossClose from '../icons/crossClose.vue'; // Importing crossClose icon component
import notificationIcon from '../icons/notificationIcon.vue'; // Importing notification icon component
import successIcon from '../icons/successIcon.vue'; // Importing success icon component
import warningIcon from '../icons/warningIcon.vue'; // Importing warning icon component

export default defineComponent({
	props: {
		alerts: Object, // Prop to receive alerts data as an object
	},
	components: {
		successIcon, // Registering success icon component
		notificationIcon, // Registering notification icon component
		crossClose, // Registering crossClose icon component
		warningIcon, // Registering warning icon component
	},
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Storing reference to the app component
		let interval: any = undefined; // Variable to hold interval ID
		let alertsLocal: any = this.alerts; // Local copy of alerts prop
		return {
			config,
			appComponent,
			interval,
			alertsLocal,
		};
	},
	unmounted() {
		clearInterval(this.interval); // Clearing the interval when the component is unmounted
	},
	mounted() {
		this.interval = setInterval(() => {
			// Setting up an interval to manage alert display
			const stringAlert = `alert-${this.appComponent.modalAlert.length - 1}`; // Constructing alert ID
			const alertDiv = document.getElementById(
				stringAlert
			) as HTMLElement; // Getting the alert element by ID
			alertDiv.style.animation = 'out 0.6s ease-in-out'; // Applying exit animation
			setTimeout(() => {
				alertDiv.style.animation = 'none'; // Resetting animation
				this.appComponent.modalAlert.pop(); // Removing the alert from the modal alert array
			}, 500);
		}, 2500); // Interval duration
	},
	methods: {
		close(index) {
			// Method to close an alert by index
			const stringAlert = `alert-${index}`; // Constructing alert ID
			const alertDiv = document.getElementById(
				stringAlert
			) as HTMLElement; // Getting the alert element by ID
			alertDiv.style.animation = 'out 0.5s ease-in-out'; // Applying exit animation
			setTimeout(() => {
				alertDiv.style.animation = 'none'; // Resetting animation
				this.appComponent.modalAlert.splice(index, 1); // Removing the alert from the modal alert array
			}, 500);
		},
	},
});
</script>

<template>
	<!-- Main container for alerts with dynamic positioning based on layout configuration -->
	<div
		style="z-index: 1000000 !important"
		:class="[
			{
				'container-messages absolute z-[999] top-0 right-0 md:w-1/3 mt-6 md:mr-6 md:right-0 h-auto max-h-screen overflow-hidden ':
					config.layout != 3,
			},
			{
				'container-messages absolute z-[999] top-20 right-5 md:w-1/3 h-auto max-h-screen overflow-hidden ':
					config.layout != undefined && config.layout == 3,
			},
		]"
	>
		<!-- Loop through alertsLocal to display each alert -->
		<div
			:id="`alert-${index}`"
			v-for="(alert, index) in alertsLocal"
			@click="close(index)"
			class="container-alert alert alert-error shadow-lg mb-3 w-full cursor-pointer"
			:class="{
				'bg-red-500 text-white': alert.type == 'error',
				'bg-success text-white': alert.type == 'success',
				'bg-yellow-400 text-white': alert.type == 'warning',
				'bg-white text-black': alert.type == 'notification',
				'bg-gray-500 text-white':
					alert.type == undefined || alert.type == '',
			}"
		>
			<div>
				<!-- Conditional rendering of icons based on alert type -->
				<crossClose v-if="alert.type == 'error'" />
				<successIcon v-if="alert.type == 'success'" />
				<warningIcon v-if="alert.type == 'warning'" />
				<notificationIcon
					v-if="
						alert.type == 'notification' ||
						alert.type == undefined ||
						alert.type == ''
					"
				/>
				<span v-html="alert.message"></span>
				<!-- Displaying alert message -->
			</div>
		</div>
	</div>
</template>

<style>
.container-alert {
	animation: 0.5s in ease-in-out; /* Animation for alert entry */
}
@keyframes in {
	0% {
		opacity: 0; /* Initial opacity for entry animation */
		transform: translateY(
			-200px
		); /* Initial position for entry animation */
	}
	100% {
		opacity: 1; /* Final opacity for entry animation */
		transform: translateY(0px); /* Final position for entry animation */
	}
}
@keyframes out {
	0% {
		opacity: 1; /* Initial opacity for exit animation */
		transform: translateY(0px); /* Initial position for exit animation */
	}
	100% {
		opacity: 0; /* Final opacity for exit animation */
		transform: translateY(-20px); /* Final position for exit animation */
	}
}
</style>

<!-- FILE DOCUMENTED -->

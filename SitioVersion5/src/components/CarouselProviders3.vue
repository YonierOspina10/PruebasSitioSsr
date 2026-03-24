<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue to create a component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings from the global context
		let appComponent: any = this.$appComponent; // Accessing the application component from the global context
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	methods: {
		/**
		 * Redirects to a specific URL based on the box parameter.
		 * @param {any} box - The box object containing the URL to navigate to.
		 */
		clickBox(box: any) {
			window.location.href = this.config.baseUrlFx + box.url; // Navigating to the constructed URL
		},
	},
});
</script>

<template>
	<!-- Main container for the payment methods section -->
	<div
		:class="{ light: config.providers.lightColor }"
		class="bg-accent overflow-x-auto px-5 flex lg:hidden w-screen lg:w-full"
	>
		<!-- Unordered list for displaying payment methods -->
		<ul
			class="flex flex-nowrap whitespace-nowrap justify-start items-center h-20 w-full gap-5"
		>
			<li class="inline-block">
				<!-- Title for the payment methods section -->
				<span class="text-info-text">{{ $t('MEDIOS DE PAGO:') }}</span>
				<!-- Translated title -->
			</li>
			<!-- Looping through payment providers based on the country of the app component -->
			<li
				v-for="value in config.PROVIDERS[appComponent.country]"
				:key="value.NAME"
				class="w-[90px] flex flex-shrink-0"
			>
				<RouterLink
					:to="config.baseUrlFx + '/gestion/deposito'"
					target="_blank"
				>
					<img
						width="65"
						height="40"
						:alt="value.NAME"
						class="payment-methods object-contain h-full w-full"
						:class="value.NAME"
						v-if="value.ICON != undefined && value.showF"
						v-lazy="value.ICON"
					/>
				</RouterLink>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.metodos-pago-footer ul {
	text-align: center; /* Center-aligns the text in the list */
	background: rgba(
		255,
		255,
		255,
		0.0784313725490196
	); /* Semi-transparent background for the list */
	overflow-x: auto; /* Enables horizontal scrolling */
	white-space: nowrap; /* Prevents line breaks in the list items */
}
.metodos-pago-footer ul li {
	display: inline-block; /* Displays list items inline */
	margin: 15px 30px; /* Margin around each list item */
}
.metodos-pago-footer.light ul {
	background: rgb(
		194,
		0,
		0
	); /* Background color for the list when in light mode */
}
.metodos-pago-footer.light ul li.medios-title {
	color: black; /* Text color for the title in light mode */
	font-weight: 400; /* Normal font weight for the title */
}
.metodos-pago-footer.light ul li img.Pagoefectivo {
	background: silver; /* Background color for specific payment method images */
	border-radius: 5px; /* Rounded corners for the images */
	padding: 0 3px; /* Padding around the images */
}
@media only screen and (max-width: 768px) {
	.metodos-pago-footer ul {
		white-space: nowrap; /* Prevents line breaks in the list items on small screens */
		overflow-y: scroll; /* Enables vertical scrolling on small screens */
	}
}
</style>

<!-- FILE DOCUMENTED -->

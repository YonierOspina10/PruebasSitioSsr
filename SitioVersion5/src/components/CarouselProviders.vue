<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue to create a component

export default defineComponent({
	data() {
		let config = this.$config(); // Retrieving configuration settings
		let appComponent: any = this.$appComponent; // Getting the application component reference
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
		};
	},
	methods: {
		// Method to handle box click events
		clickBox(box: any) {
			// Redirecting to a URL based on the box's URL property
			window.location.href = this.config.baseUrlFx + box.url;
		},
	},
});
</script>

<template>
	<!-- Main container for the payment methods footer -->
	<div
		class="metodos-pago-footer bg-base-300"
	>
		<ul class="flex justify-center items-center gap-4 px-2 md:px-0">
			<!-- Title for the payment methods section -->
			<li class="medios-title hidden md:block">
				<span>{{ $t('MEDIOS DE PAGO:') }}</span>
				<!-- Translated title -->
			</li>
			<!-- Looping through payment providers based on the country -->
			<li
				v-for="value in config.PROVIDERS[appComponent.country]"
				class="list-payments overflow-y-hidden m-1"
			>
				<!-- Link to deposit management -->
				<RouterLink
					:to="config.baseUrlFx + '/gestion/deposito'"
					target="_blank"
				>
					<img
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

<style>
.list-payments {
	width: 100px; /* Fixed width for payment method list items */
	height: 60px; /* Fixed height for payment method list items */
}

.metodos-pago-footer ul {
	text-align: center; /* Center-aligning the list items */
	background: rgba(
		255,
		255,
		255,
		0.0784313725490196
	); /* Semi-transparent background */
	overflow-x: auto; /* Allowing horizontal scrolling */
	white-space: nowrap; /* Preventing line breaks */
}


.metodos-pago-footer.light ul {
	background: white; /* White background for light mode */
}

.metodos-pago-footer.light ul li.medios-title {
	color: black; /* Text color for title in light mode */
	font-weight: 400; /* Normal font weight for title */
}

.metodos-pago-footer.light ul li img.Pagoefectivo {
	background: silver; /* Background color for specific payment method */
	border-radius: 5px; /* Rounded corners for the image */
	padding: 0 3px; /* Padding around the image */
}

@media only screen and (max-width: 768px) {
	.metodos-pago-footer ul {
		white-space: nowrap; /* Preventing line breaks on small screens */
		overflow-y: scroll; /* Allowing vertical scrolling */
	}
}
</style>

<!-- FILE DOCUMENTED -->

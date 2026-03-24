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
			// Redirecting to a URL based on the box clicked
			window.location.href = this.config.baseUrlFx + box.url;
		},
	},
});
</script>

<template>
	<!-- Main container for the payment methods section -->
	<div
		:class="{ light: config.providers.lightColor }"
		class="overflow-x-auto px-5 flex flex-col pt-2 justify-center items-center w-full"
	>
		<!-- Title for the payment methods section -->
		<span class="text-info-text font-bold">{{ $t('MEDIOS DE PAGO:') }}</span>
		<!-- List of payment methods -->
		<ul
			class="w-full flex flex-wrap gap-8 justify-center items-center py-4 max-w-[1000px]"
			:class="appComponent.config.footer_.style == 2 ? 'md:gap-10' : 'md:gap-16'"
		>
			<!-- Iterating over payment providers based on the country -->
			<li
				v-for="value in config.PROVIDERS[appComponent.country]"
				class="flex flex-shrink-0"
				:class="appComponent.config.footer_.style == 2 ? 'w-[75px] h-[50px]' : 'w-[65px] h-[40px]'"
			>
				<RouterLink
					:to="config.baseUrlFx + '/gestion/deposito'"
					target="_blank"
				>
					<!-- Payment method icon -->
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
	/* Centering the list and applying background color */
	text-align: center;
	background: rgba(255, 255, 255, 0.0784313725490196);
	overflow-x: auto; /* Allow horizontal scrolling */
	white-space: nowrap; /* Prevent line breaks */
}
.metodos-pago-footer ul li {
	/* Inline-block display for list items with margins */
	display: inline-block;
	margin: 15px 30px;
}
.metodos-pago-footer.light ul {
	/* Background color for light mode */
	background: rgb(194, 0, 0);
}
.metodos-pago-footer.light ul li.medios-title {
	/* Styling for title in light mode */
	color: black;
	font-weight: 400;
}
.metodos-pago-footer.light ul li img.Pagoefectivo {
	/* Specific styling for Pagoefectivo images */
	background: silver;
	border-radius: 5px; /* Rounded corners */
	padding: 0 3px; /* Padding around the image */
}
@media only screen and (max-width: 768px) {
	.metodos-pago-footer ul {
		/* Adjusting styles for smaller screens */
		white-space: nowrap; /* Prevent line breaks */
		overflow-y: scroll; /* Allow vertical scrolling */
	}
}
</style>

<!-- FILE DOCUMENTED -->

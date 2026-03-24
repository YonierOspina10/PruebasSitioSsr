<template>
	<!-- Main section for the animation, fixed position, full width, and centered content -->
	<section
		class="animation w-full fixed z-[200] flex justify-center items-center right-auto"
	>
		<!-- Article container for the contingency message, styled with background and rounded corners -->
		<article
			class="w-full max-w-7xl bg-[#c80202] rounded-b-3xl flex justify-center items-center gap-3 sm:gap-10 py-2 sm:py-4 px-4 sm:px-8 shadow-inner shadow-black/75"
		>
			<!-- Conditional rendering of the icon if it exists in contingencyData -->
			<img
				v-if="
					contingencyData.icon !== undefined &&
					contingencyData.icon !== ''
				"
				:src="contingencyData.icon"
				alt="ContingencyIcon"
				class="w-8 aspect-square object-contain object-center"
			/>
			<!-- Paragraph displaying the contingency message, with fallback translation -->
			<p class="text-white text-center text-sm sm:text-lg">
				{{
					contingencyData.message !== undefined &&
					contingencyData.message[appComponent.lngProd] !==
						undefined &&
					contingencyData.message[appComponent.lngProd] !== ''
						? contingencyData.message[appComponent.lngProd]
						: $t(
								'Estamos presentando una pequeña intermitencia. La seguridad de tus datos y tu dinero son nuestra prioridad.'
							)
				}}
			</p>
		</article>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for handling contingency messages.
 */
export default defineComponent({
	/**
	 * Setup function for the component.
	 * @returns An empty object for reactive properties.
	 */
	setup() {
		return {};
	},
	/**
	 * Data function for the component.
	 * @returns An object containing appComponent and contingencyData.
	 */
	data() {
		let appComponent: any = this.$appComponent; // Reference to the global app component
		return {
			appComponent,
			contingencyData: appComponent.config.contingency, // Contingency data from app configuration
		};
	},
});
</script>

<style scoped>
/* Animation class for sliding in effect */
.animation {
	animation: slideIn 1s ease-in-out; /* Applies slideIn animation */
}

/* Keyframes for slideIn animation */
@keyframes slideIn {
	0% {
		transform: translateY(-100%); /* Start position above the viewport */
		opacity: 0; /* Start invisible */
	}
	100% {
		transform: translateY(0); /* End position in place */
		opacity: 1; /* End fully visible */
	}
}
</style>

<!-- FILE DOCUMENTED -->

<template>
	<!-- Main wrapper for the home section -->
	<div id="home-wrapper">
		<!-- Section containing the background and content -->
		<section
			class="realtive w-full h-[650px] md:h-[700px] relative flex justify-center items-center"
		>
			<!-- Top gradient overlay -->
			<div
				class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute -top-1"
			></div>
			<!-- Background image, displayed if contingencyData and imgBackground are defined -->
			<img
				v-if="
					contingencyData !== undefined &&
					contingencyData.imgBackground !== undefined
				"
				:src="contingencyData.imgBackground"
				alt=""
				class="absolute -top-8 w-full h-full object-cover object-center"
			/>
			<!-- Bottom gradient overlay -->
			<div
				class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute -bottom-0"
			></div>
			<!-- Main content area -->
			<article
				class="z-10 w-full h-full max-w-[1300px] mx-auto flex flex-col justify-center items-center"
			>
				<div class="flex flex-col justify-center items-center gap-10">
					<!-- Image displayed if contingencyData and img are defined -->
					<img
						v-if="
							contingencyData !== undefined &&
							contingencyData.img !== undefined
						"
						:src="contingencyData.img"
						alt=""
						class="w-[600px] aspect-auto"
					/>
				</div>
			</article>
		</section>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Home component definition.
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
		// Reference to the app component
		let appComponent: any = this.$appComponent;
		return {
			appComponent,
			// Contingency data extracted from appComponent's config
			contingencyData: appComponent.config.contingency,
		};
	},
});
</script>
<style scoped>
/* Scoped styles for the home component can be added here */
</style>

<!-- FILE DOCUMENTED -->

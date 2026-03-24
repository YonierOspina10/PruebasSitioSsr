<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying bonus information.
 */
export default defineComponent({
	// Props accepted by the component
	props: {
		// Bonus object containing details about the bonus
		bonus: Object,
	},
});
</script>

<template>
	<!-- Main container for the component, full width and positioned relative for absolute children -->
	<div class="w-full relative">
		<!-- Router link to navigate to the bonuses progress page -->
		<RouterLink to="/my-bonuses-progress">
			<!-- Container for the bonus display, styled as a rounded button -->
			<div
				class="absolute h-12 w-72 right-0 bg-white flex justify-start items-center gap-2 rounded-full pl-5 mr-1"
			>
				<!-- Inner container for bonus name and progress meter -->
				<div class="flex flex-col justify-center items-center">
					<!-- Display the name of the bonus -->
					<p class="font-bold text-xs">{{ bonus?.name }}</p>
					<!-- Progress meter for the bonus -->
					<div
						class="meter h-4 w-44 border-2 border-solid border-success2 p-[2px]"
					>
						<!-- Dynamic width based on bonus percentage -->
						<span :style="{ width: bonus?.porcent + '%' }"></span>
						<!-- Display the percentage value of the bonus -->
						<h6
							class="porcent text-neutral -mt-[2px] -ml-3 w-8 text-center text-[10px]"
						>
							{{ bonus?.porcent }}%
						</h6>
					</div>
				</div>
				<!-- Image displayed on the right side of the bonus display -->
				<img
					src="https://images.virtualsoft.tech/m/msjT1682713611.png"
					alt=""
					class="absolute -right-1 w-20"
				/>
				<!-- Additional image positioned above the previous image -->
				<img
					src="https://images.virtualsoft.tech/m/msjT1682714459.png"
					alt=""
					class="absolute right-14 top-12 w-14 h-9"
				/>
				<!-- Display the value of the bonus in a styled span -->
				<span
					class="text-[#555555] h-6 min-w-[40px] font-bold text-sm absolute right-[50px] top-[50px] bg-white rounded-lg flex justify-center rounded-xl items-center"
					>{{ bonus?.valor_bono }}</span
				>
			</div>
		</RouterLink>
	</div>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

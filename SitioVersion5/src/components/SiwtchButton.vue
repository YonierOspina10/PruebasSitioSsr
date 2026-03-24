<template>
	<!-- Main container for the navigation bar with specific styling -->
	<div
		class="bg-accent-content rounded-full w-[200px] h-[33px] border border-neutral flex justify-between items-center"
	>
		<!-- Router link for 'Deportes' section with dynamic class binding -->
		<RouterLink
			to="/deportes"
			active-class="bg-accent border-r-2 border border-neutral"
			class="rounded-full text-sm w-1/2 h-full flex justify-center items-center gap-1"
			data-analytics-label="header:menu:deportes"
			:data-analytics-context="`component:SiwtchButton|layout:layout-6`"
			:class="
				$route.fullPath == '/new-casino'
					? ''
					: 'bg-accent border-r-2 border border-neutral'
			"
		>
			<!-- Image icon for 'Deportes' -->
			<img
				src="https://images.virtualsoft.tech/m/msj0212T1712067336.png"
				alt=""
				class="w-[20px] aspect-square object-contain"
			/>
			<span>Deportes</span>
		</RouterLink>
		<!-- Router link for 'Casino' section -->
		<RouterLink
			to="/new-casino"
			active-class="bg-accent border-l-2 border border-neutral"
			class="rounded-full text-sm w-1/2 h-full flex justify-center items-center gap-1"
			data-analytics-label="header:menu:casino"
			:data-analytics-context="`component:SiwtchButton|layout:layout-6`"
		>
			<!-- Image icon for 'Casino' -->
			<img
				src="https://images.virtualsoft.tech/m/msj0212T1712067451.png"
				alt=""
				class="w-[20px] aspect-square object-contain"
			/>
			<span>Casino</span>
		</RouterLink>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the navigation bar.
 */
export default defineComponent({
	/**
	 * Setup function for the component.
	 * @returns An empty object as no reactive state is defined.
	 */
	setup() {
		return {};
	},
});
</script>
<style scoped>
/* Scoped styles for this component will be added here if needed */
</style>

<!-- FILE DOCUMENTED -->

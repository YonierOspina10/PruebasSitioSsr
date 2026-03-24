<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'; // Import Vue functions for component definition
import { useRoute } from 'vue-router'; // Import Vue Router for route management
import { ref } from 'vue'; // Import ref for reactive references
import SportbookAltenar from '@/components/SportbookAltenar.vue'; // Import SportbookAltenar component
import MenuUser from '@/components/menus/MenuUser.vue'; // Import MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Import MenuUser3 component
import Sportbook3 from '@/views/Products/Sportbook3.vue'; // Import Sportbook3 view
import Sportbook4 from '@/views/Products/Sportbook4.vue'; // Import Sportbook4 view

declare var AltenarSportsbook: any; // Declare a global variable for AltenarSportsbook

export default defineComponent({
	components: { Sportbook4, Sportbook3, SportbookAltenar }, // Register components for use in the template
	data: function () {
		let config = this.$config(); // Retrieve configuration object
		let appComponent: any = this.$appComponent; // Get the application component
		let loadingM = true; // Initialize loading state
		return {
			config,
			appComponent,
			loadingM,
		};
	},
	computed: {
		// Computed property to determine if the sportsbook should be shown
		showSportbook() {
			return (
				(this.appComponent.config.versionAltenar != '2' &&
					(window as any).AltenarSportsbook != undefined) || // Check for version and global variable
				(this.appComponent.config.versionAltenar == '2' &&
					(window as any).altenarWSDK != undefined) // Check for alternate SDK
			);
		},
	},
});
</script>

<template>
	<!-- Main container for loading state and sportsbook components -->
	<div
		v-if="
			!(
				appComponent.config.loadSportbook !== undefined &&
				appComponent.config.loadSportbook === true
			)
		"
		class="flex w-full h-screen items-center shadow-lg bg-white"
	>
		<div class="flex-1"></div>
		<!-- Spacer for centering -->
		<div class="flex flex-col w-12/12">
			<!-- Container for loading spinner -->
			<svg
				fill="none"
				class="w-12 h-12 animate-spin"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					clip-rule="evenodd"
					d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
					fill="currentColor"
					fill-rule="evenodd"
				/>
			</svg>
		</div>
		<div class="flex-1"></div>
		<!-- Spacer for centering -->
	</div>
	<!-- Conditional rendering of SportbookAltenar component -->
	<SportbookAltenar
		v-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			appComponent.config.sportBookVersion == undefined
		"
		:page-fixed="'Live'"
	/>
	<!-- Conditional rendering of Sportbook3 component -->
    <Sportbook4
        v-else-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			(appComponent.config.sportbook === undefined || appComponent.config.sportbook === 1)
		"
    />
    <!-- Conditional rendering of Sportbook3 component -->
    <Sportbook3
        v-else-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			(appComponent.config.sportbook !== undefined && appComponent.config.sportbook === 2)
		"
    />
</template>

<!-- FILE DOCUMENTED -->

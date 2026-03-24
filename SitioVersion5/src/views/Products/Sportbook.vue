<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'; // Import Vue composition API functions
import SportbookAltenar from '@/components/SportbookAltenar.vue'; // Import SportbookAltenar component
import Sportbook3 from './Sportbook3.vue'; // Import Sportbook3 component
import Sportbook4 from './Sportbook4.vue'; // Import Sportbook4 component

export default defineComponent({
	components: { SportbookAltenar, Sportbook3, Sportbook4 }, // Register components
	data: function () {
		let config = this.$config(); // Retrieve configuration
		let appComponent: any = this.$appComponent; // Get the current app component
		let loadingM = true; // Initialize loading state
        let providerSportbook = 'ITN' // Reactive variable for sportsbook provider
		return {
			config,
			appComponent,
			loadingM,
            providerSportbook
		};
	},
	computed: {
		// Computed property to determine if the sportsbook should be shown
		showSportbook() {
			return (
				(this.appComponent.config.versionAltenar != '2' &&
					(window as any).AltenarSportsbook != undefined) ||
				(this.appComponent.config.versionAltenar == '2' &&
					(window as any).altenarWSDK != undefined)
			);
		},
	},
    created() {
        if (this.appComponent.config.providerSportbook !== undefined && this.appComponent.config.providerSportbook !== null && this.appComponent.config.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.config.providerSportbook;
        }

        if (this.appComponent.providerSportbook !== undefined && this.appComponent.providerSportbook !== null && this.appComponent.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.providerSportbook;
        }
    },
    updated() {
        if (this.appComponent.config.providerSportbook !== undefined && this.appComponent.config.providerSportbook !== null && this.appComponent.config.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.config.providerSportbook;
        }

        if (this.appComponent.providerSportbook !== undefined && this.appComponent.providerSportbook !== null && this.appComponent.providerSportbook !== '') {
            this.providerSportbook = this.appComponent.providerSportbook;
        }
    }
});
</script>

<template>
	<!-- Main container for loading state -->
	<div
		v-if="
			!(
				appComponent.config.loadSportbook !== undefined &&
				appComponent.config.loadSportbook === true
			)
		"
		class="flex w-full h-screen items-center"
		:class="
			appComponent.config.sportBookVersion !== undefined &&
			appComponent.config.sportBookVersion.type !== undefined
				? ''
				: 'shadow-lg bg-white'
		"
	>
		<div class="flex-1"></div>
		<!-- Spacer div -->
		<div class="flex flex-col w-12/12">
			<!-- Loading indicator container -->
			<svg
				fill="none"
				class="w-12 h-12 animate-spin"
				:class="
					appComponent.config.sportBookVersion !== undefined &&
					appComponent.config.sportBookVersion.type !== undefined
						? 'fill-primary stroke-2'
						: ''
				"
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
		<!-- Spacer div -->
	</div>
	<!-- Conditional rendering of SportbookAltenar component -->
	<SportbookAltenar
		v-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			appComponent.config.sportBookVersion == undefined
		"
		:page-fixed="
			appComponent.viewActual != '/lottery-bets' ? 'prelive' : 'toto'
		"
	/>
    <!-- Conditional rendering of Sportbook4 component -->
    <Sportbook4
        v-else-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			(providerSportbook === undefined || providerSportbook === 'ITN')
		"
    />
	<!-- Conditional rendering of Sportbook3 component -->
	<Sportbook3
		v-else-if="
			appComponent.config.loadSportbook !== undefined &&
			appComponent.config.loadSportbook === true &&
			(providerSportbook !== undefined && providerSportbook === 'DIGITAIN')
		"
	/>

</template>

<!-- FILE DOCUMENTED -->

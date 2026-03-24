<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for displaying a financial summary card.
 */
export default defineComponent({
	// Define the props that can be passed to the component
	props: {
		iconC: String, // Icon class for the displayed icon
		titleC: String, // Title of the card
		amountC: Number, // Amount to be displayed
		dateI: String, // Start date for the displayed period
		dateF: String, // End date for the displayed period
		colorIcon: String, // CSS class for the icon's color
		statArrow: String, // Determines the direction of the arrow (up or down)
	},
	data() {
		// Initialize component data
		let emitter = this.$emitter(); // Event emitter for communication
		let icon: any = this.iconC; // Icon class from props
		let title: any = this.titleC; // Title from props
		let amount: any = this.amountC; // Amount from props
		let colorI: any = this.colorIcon; // Color class from props
		let dateI: any = this.dateI; // Start date from props
		let dateF: any = this.dateF; // End date from props
		let arrow: any = this.statArrow; // Arrow direction from props
		return {
			icon,
			title,
			amount,
			dateI,
			dateF,
			emitter,
			colorI,
			arrow,
		};
	},
});
</script>

<template>
	<!-- Main container for the financial summary card -->
	<div>
		<!-- Flex container for centering the card -->
		<div class="flex justify-center w-full lg:w-6/12 xl:w-3/12 h-36">
			<!-- Card container with styling for background, shadow, and rounded corners -->
			<div
				class="relative w-11/12 flex flex-col min-w-0 break-words bg-neutral rounded mb-6 xl:mb-0 shadow-lg"
			>
				<!-- Inner container for padding and layout -->
				<div class="flex-auto p-4">
					<!-- Flex container for card content -->
					<div class="flex flex-wrap">
						<!-- Main content area for title, amount, and dates -->
						<div
							class="relative w-full max-w-full max-h-full flex flex-col gap-2 flex-1"
						>
							<!-- Title of the card -->
							<h5
								class="text-neutral-content uppercase font-bold text-xs"
							>
								{{ $t(title) }}
								<!-- Translated title -->
							</h5>
							<!-- Amount display -->
							<span
								class="font-semibold text-xl text-neutral-content"
							>
								{{ 'PEN ' + amount }}
								<!-- Amount with currency -->
							</span>
							<!-- Flex container for date and arrow -->
							<div class="flex gap-2">
								<span>
									<!-- Arrow icon indicating increase or decrease -->
									<i
										:class="
											arrow
												? 'fas fa-arrow-up text-green-400'
												: 'fas fa-arrow-down text-red-500'
										"
									/>
								</span>
								<span>
									{{ dateI }}
									<!-- Start date display -->
								</span>
								<span> - </span>
								<span>
									{{ dateF }}
									<!-- End date display -->
								</span>
							</div>
						</div>
						<!-- Icon container -->
						<div class="relative w-auto pl-4 flex-initial">
							<!-- Circular icon display with dynamic color -->
							<div
								class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
								:class="colorI"
							>
								<i :class="icon"></i>
								<!-- Icon display -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- FILE DOCUMENTED -->

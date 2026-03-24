<script lang="ts">
import CardBonus from '@/components/CardBonus.vue'; // Importing CardBonus component
import CardBonusV2 from '@/components/CardBonusV2.vue'; // Importing CardBonusV2 component
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import { defineComponent } from 'vue'; // Importing defineComponent from Vue

export default defineComponent({
	components: {
		MenuUser, // Registering MenuUser component
		MenuUser3, // Registering MenuUser3 component
		CardBonus, // Registering CardBonus component
		CardBonusV2, // Registering CardBonusV2 component
	},
	data: function () {
		let config = this.$config(); // Retrieving configuration
		let emitter = this.$emitter(); // Retrieving event emitter
		let appComponent: any = this.$appComponent; // Retrieving application component
		let refreshBalance = this.$refreshBalance; // Retrieving refresh balance function
		let bonuses: any = []; // Initializing bonuses array
		let lengthFreebet: number = 0; // Initializing freebet count
		let lengthGeneral: number = 0; // Initializing general bonuses count
		return {
			config, // Exposing config to template
			lengthFreebet, // Exposing freebet count to template
			lengthGeneral, // Exposing general bonuses count to template
			emitter, // Exposing emitter to template
			appComponent, // Exposing appComponent to template
			refreshBalance, // Exposing refreshBalance to template
			bonuses, // Exposing bonuses array to template
		};
	},
	unmounted() {
		this.emitter.all.delete('accept:modal'); // Cleaning up event listener on unmount
	},
	mounted() {
		if (this.appComponent.bono_header.length > 0) {
			// Checking if bono_header has items
			this.appComponent.bono_header.forEach((item) => {
				// Iterating through bono_header
				if (item.type != undefined && item.type == 'FreeBet') {
					// Checking for FreeBet type
					this.lengthFreebet++; // Incrementing freebet count
				} else {
					this.lengthGeneral++; // Incrementing general bonuses count
				}
			});
		}
		this.emitter.on('accept:modal', () => {
			// Setting up event listener for modal acceptance
			this.appComponent.closeModal(); // Closing modal on event
		});
		this.appComponent.bono_header != undefined &&
		this.appComponent.bono_header.length > 0
			? (this.bonuses = this.appComponent.bono_header) // Assigning bonuses if available
			: (this.bonuses = []); // Assigning empty array if no bonuses
	},
	methods: {
		closeModal() {
			// Method to close modal
			this.appComponent.closeModal(); // Closing modal
		},
	},
});
</script>
<template>
	<!-- Header for layout not equal to 3 -->
	<div
		v-if="config.layout != 3"
		class="int-header h-40 bg-gradient-to-r from-primary to-neutral-content absolute z-1 w-full"
	></div>
	<!-- Header for layout equal to 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<!-- Main container for user account information -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<!-- Title for active bonuses -->
				<div class="Container ActivePageTitle">
					<span class="h1">
						<span class="text-primary-content font-bold text-3xl">{{
							$t('Bonos Activos')
						}}</span>
					</span>
				</div>
				<!-- User menu and bonuses display -->
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<MenuUser
						v-if="config.layout != 3"
						:page="'my-bonuses-progress'"
						:MENU_ID="'3'"
					/>
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'my-bonuses-progress'"
						:MENU_ID="'3'"
					/>
					<!-- Conditional class assignment based on appComponent configuration -->
					<div
						:class="
							appComponent.config.my_bonuses_progress !=
								undefined &&
							appComponent.config.my_bonuses_progress[
								appComponent.country
							] != undefined &&
							appComponent.config.my_bonuses_progress[
								appComponent.country
							].style != undefined &&
							appComponent.config.my_bonuses_progress[
								appComponent.country
							].style == 2 &&
							config.layout == 3
								? 'w-full bg-secondary rounded-xl p-5'
								: 'w-full md:w-3/4'
						"
						class="BoxContent TermsContentBox HelpContentBox float-left md:px-8"
					>
						<div class="Container InfoContent">
							<!-- Displaying general bonuses if available -->
							<div
								v-if="
									appComponent.config.my_bonuses_progress !=
										undefined &&
									appComponent.config.my_bonuses_progress[
										appComponent.country
									] != undefined &&
									appComponent.config.my_bonuses_progress[
										appComponent.country
									].style != undefined &&
									appComponent.config.my_bonuses_progress[
										appComponent.country
									].style == 2
								"
								class="pt-10"
							>
								<template v-if="lengthGeneral > 0">
									<p
										class="text-primary-content text-2xl mb-4 font-poppinssb drop-shadow-[0px_3px_0px_black]"
									>
										Bonos
									</p>
									<div
										class="grid md:w-full md:h-full md:grid-cols-[1fr_1fr_1fr_1fr] w-auto h-auto grid-cols-[repeat_(1,auto)] gap-6"
									>
										<template
											v-for="bonus in appComponent.bono_header"
										>
											<card-bonus-v2
												:bonus="bonus"
												v-if="
													bonus?.type != undefined &&
													bonus?.type != 'FreeBet'
												"
											/>
										</template>
									</div>
								</template>
								<!-- Displaying freebets if available -->
								<template v-if="lengthFreebet > 0">
									<p
										class="text-primary-content text-2xl mb-4 font-poppinssb drop-shadow-[0px_3px_0px_black]"
										:class="{ 'pt-20': lengthGeneral > 0 }"
									>
										Freebets
									</p>
									<div
										class="grid md:w-full md:h-full md:grid-cols-[1fr_1fr_1fr_1fr] w-auto h-auto grid-cols-[repeat_(1,auto)] gap-6"
									>
										<template
											v-for="bonus in appComponent.bono_header"
										>
											<card-bonus-v2
												:bonus="bonus"
												v-if="
													bonus?.type != '' &&
													bonus?.type != undefined &&
													bonus?.type == 'FreeBet'
												"
											/>
										</template>
									</div>
								</template>
								<!-- Message when no bonuses or freebets are available -->
								<div
									v-if="
										lengthGeneral <= 0 && lengthFreebet <= 0
									"
									class="flex justify-center items-center min-h-[440px]"
								>
									<span
										:class="
											config.layout == 3
												? 'text-neutral bg-secondary'
												: 'bg-neutral text-neutral-content'
										"
										class="shadow-[inset_0px_-13px_16px_#00000091] flex justify-center items-center italic px-4 py-2 rounded-xl font-poppinssl text-center w-auto border-b-2 border-solid border-primary-content"
										>{{
											$t(
												'Actualmente no tienes bonos y freebets en progreso'
											)
										}}</span
									>
								</div>
							</div>
							<!-- Fallback display for bonuses -->
							<div v-else class="myContainer pt-32">
								<CardBonus
									:bonus="bonus"
									v-for="bonus in appComponent.bono_header"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.myContainer {
	height: auto; /* Container height set to auto */
	overflow: visible; /* Overflow set to visible */
	display: grid; /* Displaying as grid */
	grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
	grid-gap: 25px; /* Gap between grid items */
	width: auto; /* Width set to auto */
	margin-left: auto; /* Centering container */
	margin-right: auto; /* Centering container */
}
@media (max-width: 768px) {
	.myContainer {
		height: 100%; /* Full height on smaller screens */
		display: grid; /* Displaying as grid */
		grid-template-columns: repeat(1, auto); /* Single column layout */
		grid-gap: 20px; /* Gap between grid items */
		width: 100%; /* Full width on smaller screens */
		margin-left: auto; /* Centering container */
		margin-right: auto; /* Centering container */
	}
}
.myContainer [aria-describedby='list_progress'] {
	padding: 1px 3px !important; /* Padding for specific elements */
	vertical-align: middle; /* Vertical alignment */
}
.gradient-border {
	--border-width: 3px; /* Custom border width variable */
	position: relative; /* Positioning relative for pseudo-elements */
	justify-content: center; /* Centering content */
	align-items: center; /* Aligning items */
	color: white; /* Text color */
	background: linear-gradient(
		45deg,
		#3a3a3a5e,
		transparent
	); /* Gradient background */
	border-radius: var(--border-width); /* Border radius based on variable */
	transition: transform 0.2s; /* Transition effect for scaling */
	cursor: pointer; /* Pointer cursor on hover */
}
.gradient-border:hover {
	transform: scale(1.04); /* Scale effect on hover */
}
.gradient-border::after {
	position: absolute; /* Absolute positioning for pseudo-element */
	content: ''; /* Empty content for pseudo-element */
	top: calc(-1 * var(--border-width)); /* Positioning above border */
	left: calc(
		-1 * var(--border-width)
	); /* Positioning to the left of border */
	z-index: -1; /* Behind the main element */
	width: calc(
		100% + var(--border-width) * 2
	); /* Full width including border */
	height: calc(
		100% + var(--border-width) * 2
	); /* Full height including border */
	background: linear-gradient(
		60deg,
		rgba(141, 141, 141, 0.8),
		rgba(217, 215, 215, 0.71),
		rgba(217, 215, 215, 0.68),
		#ffffff,
		#ffffff,
		rgba(217, 215, 215, 0.68),
		rgba(217, 215, 215, 0.71),
		rgba(158, 158, 158, 0.8)
	); /* Gradient background for pseudo-element */
	background-size: 300% 300%; /* Background size for animation */
	background-position: 0 50%; /* Initial background position */
	border-radius: calc(
		2 * var(--border-width)
	); /* Border radius for pseudo-element */
	animation: moveGradient 4s alternate infinite; /* Animation for gradient movement */
}
@keyframes moveGradient {
	50% {
		background-position: 100% 50%; /* Background position at 50% keyframe */
	}
}
.title {
	display: block; /* Block display for title */
	text-align: center; /* Centering text */
	padding: 5px 10px; /* Padding for title */
	line-height: 13px; /* Line height for title */
	color: white; /* Text color */
	padding: 10px; /* Additional padding for title */
	font-weight: bold; /* Bold font weight */
	overflow: hidden; /* Hiding overflow */
	background: #555; /* Background color */
	font-size: 18px; /* Font size for title */
}
span.cant {
	display: block; /* Block display for count */
	margin: 5px auto; /* Centering with margin */
	border-radius: 15px; /* Rounded corners */
	text-align: center; /* Centering text */
	background: white; /* Background color */
	color: #000000; /* Text color */
	font-weight: bold; /* Bold font weight */
	width: calc(100% - 25px); /* Width calculation */
	height: 50px; /* Fixed height */
	font-size: 18px; /* Font size */
	line-height: 45px; /* Line height */
	border-width: 2px; /* Border width */
	border-style: solid; /* Solid border style */
	border-color: #000000; /* Border color */
	margin-top: 9px; /* Top margin */
}
span.icon-cant {
	background: #000000; /* Background color for icon */
	border-radius: 38px; /* Rounded corners */
	width: 30px; /* Fixed width */
	height: 30px; /* Fixed height */
	display: inline-grid; /* Inline grid display */
	color: #ffffff; /* Text color */
	position: relative; /* Relative positioning */
	top: -10px; /* Position adjustment */
	float: right; /* Floating to the right */
	right: -10px; /* Position adjustment */
	padding-top: 5px; /* Padding for icon */
}
.subTitle {
	display: block; /* Block display for subtitle */
	text-align: center; /* Centering text */
	padding: 5px 10px; /* Padding for subtitle */
	overflow: hidden; /* Hiding overflow */
	color: #333; /* Text color */
	height: auto; /* Automatic height */
}
.animate > span:after {
	display: none; /* Hiding after pseudo-element */
}
@keyframes move {
	0% {
		background-position: 0 0; /* Initial background position */
	}
	100% {
		background-position: 50px 50px; /* Final background position */
	}
}
.state {
	width: 100%; /* Full width for state */
	display: block; /* Block display */
	text-align: center; /* Centering text */
	background: #555555; /* Background color */
	color: white; /* Text color */
	position: relative; /* Relative positioning */
	padding: 2px 5px; /* Padding for state */
}
</style>

<!-- FILE DOCUMENTED -->

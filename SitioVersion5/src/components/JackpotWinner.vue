<template>
	<!-- Modal section that appears when showModal is true -->
	<section
		v-if="showModal"
		class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-content/50 z-[999999999999] touch-none"
	>
		<!-- Video container for mobile layout -->
		<div
			v-if="appComponent.config.mobileL == '1'"
			class="w-full h-full absolute top-0 mx-auto flex justify-center items-center bg-neutral-content/80"
		>
			<video
				autoplay
				muted
				class="w-full h-full object-cover object-center"
			>
				<source
					:src="appComponent.loyalty_price.videoMobile"
					type="video/webm"
				/>
			</video>
		</div>
		<!-- Video container for desktop layout -->
		<div
			v-else-if="appComponent.config.mobileL == ''"
			class="w-full h-full absolute top-0 mx-auto flex justify-center items-center bg-neutral-content/80"
		>
			<video
				autoplay
				muted
				class="w-full h-full object-cover object-center"
			>
				<source
					:src="appComponent.loyalty_price.video"
					type="video/webm"
				/>
			</video>
		</div>
		<!-- GIF image displayed over the video -->
		<img
			:src="appComponent.loyalty_price.gif"
			alt=""
			class="absolute intro top-2 w-full h-[90%] object-cover object-center"
		/>
		<!-- Container for jackpot information -->
		<div
			class="intro relative w-[500px] h-[312px] cursor-pointer scale-110 sm:scale-[1.4] md:scale-[1.5] lg:scale-[1.7]"
		>
			<!-- Top half of jackpot information -->
			<div
				class="absolute top-4 h-1/2 w-full flex justify-center items-center z-40"
			>
				<img
					:src="appComponent.loyalty_price.imagen"
					alt=""
					class="w-full h-full object-contain object-center"
				/>
			</div>
			<!-- Bottom half of jackpot information with price display -->
			<div
				class="absolute bottom-0 h-1/2 w-full flex justify-center items-center z-40"
			>
				<img
					:src="appComponent.loyalty_price.imagen2"
					alt=""
					class="absolute w-[60%] h-full object-contain object-center"
				/>
				<span
					class="jackpotPrice absolute w-full h-full flex justify-center items-center text-3xl sm:text-4xl text-center font-bold -bottom-1 mx-auto"
				>
					{{
						new Intl.NumberFormat().format(
							appComponent.loyalty_price.monto
						)
					}}
				</span>
			</div>
		</div>
		<!-- Button to close the modal -->
		<button
			class="intro absolute top-8 right-8 cursor-pointer hover:scale-105"
			@click="showModal = false"
		>
			<ExitIcon
				:height="28"
				:width="28"
				:fill="'#ffffff'"
				:fill2="'#ee3b3f'"
			/>
		</button>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent function
import JackpotCard from './JackpotCard.vue'; // Importing JackpotCard component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import apiService from '@/services/ApiService'; // Importing API service

export default defineComponent({
	components: {
		ExitIcon, // Registering ExitIcon component
		JackpotCard, // Registering JackpotCard component
	},
	data() {
		let config = this.$config(); // Retrieving configuration
		let appComponent: any = this.$appComponent; // Accessing app component data
		return {
			config, // Exposing config to the template
			appComponent, // Exposing appComponent to the template
			showModal: true, // Initial state for modal visibility
		};
	},
	mounted() {}, // Lifecycle hook for when the component is mounted
});
</script>

<style scoped>
.containerJackpot {
	/* Styles for the jackpot container */
	background: linear-gradient(to bottom, #ffffff20, transparent);
	backdrop-filter: blur(5px);
	border: 1px solid #ffffff40;
	border-radius: 15px;
}
.jackpotPrice {
	/* Styles for the jackpot price text */
	background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
	margin-bottom: 3px;
}
.jackpotInfo {
	/* Styles for jackpot information text */
	background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
.intro {
	/* Animation for intro effect */
	animation: intro 6s ease 0s forwards;
}
@keyframes intro {
	/* Keyframes for intro animation */
	0% {
		opacity: 0;
		scale: 2;
	}
	50% {
		opacity: 0;
		scale: 2;
	}
	75% {
		opacity: 1;
		scale: 1;
	}
	100% {
		opacity: 1;
		scale: 1;
	}
}
.zoom {
	/* Animation for zoom effect */
	animation: zoom 10s ease 0s infinite;
}
@keyframes zoom {
	/* Keyframes for zoom animation */
	0% {
		scale: 1.3;
	}
	50% {
		scale: 1.4;
	}
	100% {
		scale: 1.3;
	}
}
</style>

<!-- FILE DOCUMENTED -->

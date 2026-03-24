<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Component definition for the preloader.
 * This component displays a loading animation based on the configuration.
 */
export default defineComponent({
	data() {
		// Retrieve configuration settings
		let config = this.$config();
		return {
			config,
		};
	},
});
</script>

<template>
	<!-- Main container for the preloader, displayed based on the configuration style -->
	<div
		v-if="
			config.preloader != undefined &&
			config.preloader.style != undefined &&
			config.preloader.style == 2
		"
		class="w-full h-full flex justify-center items-center"
	>
		<!-- Inner container for logo and loading text -->
		<div class="flex flex-col justify-center items-center mx-9">
			<!-- Logo image, conditional source based on configuration -->
			<img
				:src="
					config.logo_ != undefined &&
					config.logo_.light != undefined &&
					config.logo_.light != ''
						? config.logo_.light
						: config.logo != undefined && config.logo != ''
							? config.logo
							: 'https://images.virtualsoft.tech/m/msjT1684245196.png'
				"
				alt=""
				class="mb-10 max-w-[333px] min-w-[333px] max-h-[233px] object-contain drop-shadow-[0px_0px_1px_hsl(var(--b1))]"
			/>
			<!-- Loading text with animated dots -->
			<div
				class="dots-container flex flex-row justify-center items-end gap-x-1"
			>
				<p class="text-3xl font-poppinssl text-neutral">
					{{ $t('Cargando') }}
				</p>
				<span
					class="dots-custom relative w-[8px] h-[8px] left-[-10px] bg-transparent rounded-full"
				></span>
			</div>
		</div>
		<!-- Background image for the preloader -->
		<img
			src="https://images.virtualsoft.tech/site/general/Preloader/cohetes.svg"
			alt=""
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
		/>
		<!-- Conditional background image based on configuration -->
		<img
			:src="
				config.preloader != undefined &&
				config.preloader.bg != undefined &&
				config.preloader.bg != ''
					? config.preloader.bg
					: 'https://images.virtualsoft.tech/m/msj-1212T1706281311.png'
			"
			alt=""
			class="-z-1 absolute top-0 left-0 w-full h-full object-cover"
		/>
	</div>
	<!-- Alternative preloader style -->
	<div
		v-else-if="
			config.preloader != undefined &&
			config.preloader.style != undefined &&
			config.preloader.style == 3
		"
		class="flex justify-center items-center w-full h-full"
	>
		<!-- Logo image for the alternative style -->
		<img
			:src="
				config.logo_ != undefined &&
				config.logo_.light != undefined &&
				config.logo_.light != ''
					? config.logo_.light
					: config.logo != undefined && config.logo != ''
						? config.logo
						: 'https://images.virtualsoft.tech/m/msjT1684245196.png'
			"
			alt=""
			class="z-1 object-contain w-[35%] h-[25%] md:w-[20%] md:h-[33%]"
		/>
		<!-- Circular background for loading animation -->
		<span
			class="test bg-primary-content absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[50%] pt-[50%] md:w-[25%] md:pt-[25%] rounded-full shadow-primary-content/50"
		></span>
		<!-- Background image for the alternative preloader -->
		<img
			src="https://images.virtualsoft.tech/site/general/Preloader/ecuabet.svg"
			alt=""
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[40%] z-1 object-cover"
		/>
	</div>
</template>

<style scoped>
/* Animation for the circular loading element */
.test {
	animation: bounce-animation 2s linear alternate infinite;
}

/* Keyframes for the bounce animation */
@keyframes bounce-animation {
	0% {
		box-shadow: 0px 0px 0px 25px hsl(var(--pc) / 0.3);
	}
	100% {
		box-shadow: 0px 0px 0px 35px hsl(var(--pc) / 0.3);
	}
}

/* Animation for the dots container */
.dots-container {
	animation: opacity 1.3s infinite ease-in-out alternate;
}

/* Keyframes for the opacity animation */
@keyframes opacity {
	0% {
		opacity: 0.3;
	}
	100% {
		opacity: 1;
	}
}

/* Custom dots animation for loading effect */
.dots-custom {
	box-shadow:
		10px 0px 0px hsl(var(--b1)),
		22px 0px 0px hsl(var(--b1)),
		34px 0px 0px hsl(var(--b1)),
		46px 0px 0px hsl(var(--b1));
	animation: loading 3s infinite linear;
	animation-delay: 1s;
}

/* Keyframes for the loading animation */
@keyframes loading {
	0% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	12% {
		box-shadow:
			10px -10px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	24% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	36% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px -10px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	48% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	60% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px -10px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	72% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
	84% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px -10px 0px hsl(var(--b1));
	}
	100% {
		box-shadow:
			10px 0px 0px hsl(var(--b1)),
			22px 0px 0px hsl(var(--b1)),
			34px 0px 0px hsl(var(--b1)),
			46px 0px 0px hsl(var(--b1));
	}
}
</style>

<!-- FILE DOCUMENTED -->

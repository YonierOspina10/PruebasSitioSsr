<script setup lang="ts">
import { ref } from 'vue';

// Reactive reference to track if the card is open or closed
const isOpen = ref(false);

// Reactive reference to track loading state
const isLoading = ref(false);

// Reactive reference to store balance information
const balance = ref({
	total: 458.32, // Total balance
	recargas: 0.0, // Recharge balance
	retiro: 458.32, // Withdrawal balance
	bonos: 0.0, // Bonus balance
});

// Define component props with TypeScript types
const props = defineProps<{
	currencyUser: any; // User's currency
	saldoUser: any; // User's balance
}>();

// Function to toggle the visibility of the card
const toggleCard = () => {
	isOpen.value = !isOpen.value; // Toggle isOpen state
};

// Asynchronous function to simulate recharge action
const recargar = async () => {
	isLoading.value = true; // Set loading state to true
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
	isLoading.value = false; // Reset loading state
};

// Asynchronous function to simulate consultation action
const consultar = async () => {
	isLoading.value = true; // Set loading state to true
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
	isLoading.value = false; // Reset loading state
};
</script>

<template>
	<!-- Main container for the balance card -->
	<div class="relative inline-block text-left">
		<!-- Button to toggle the card visibility -->
		<div
			@click="toggleCard"
			class="bg-primary-content w-[180px] h-[25px] rounded-full flex cursor-pointer hover:scale-[1.1]"
		>
			<span
				class="flex flex-row items-center my-auto px-1 text-[15px] text-[#000002] mx-auto"
				>Saldo:
				<p class="font-semibold">{{ currencyUser }} {{ saldoUser }}</p>
				<!-- Indicator for card open/close state -->
				<span
					:class="{ 'rotate-180': isOpen }"
					class="inline-block transition-transform"
				>
					▼
				</span>
			</span>
		</div>
		<!-- Transition effect for the card -->
		<transition name="slide-fade">
			<!-- Card content displayed when isOpen is true -->
			<div
				v-if="isOpen"
				class="absolute right-0 mt-1 w-[250px] bg-white border border-gray-200 shadow-lg rounded-md p-4"
			>
				<div class="flex justify-between items-center">
					<span class="font-semibold text-def text-[#000]">{{
						$t('Actualizar Saldo') // Title for updating balance
					}}</span>
					<!-- Button to trigger recharge action -->
					<button
						@click="recargar"
						:class="{ 'animate-spin': isLoading }"
						class="text-gray-500 hover:text-black"
					>
						⟳
					</button>
				</div>
				<!-- Display balance information -->
				<div class="mt-2 text-[#000]">
					<p>
						SALDO RECARGAS:
						<span>USD {{ balance.recargas.toFixed(2) }}</span>
					</p>
					<p>
						SALDO RETIRO:
						<span>USD {{ balance.retiro.toFixed(2) }}</span>
					</p>
					<p>
						SALDO BONOS:
						<span>USD {{ balance.bonos.toFixed(2) }}</span>
					</p>
				</div>
				<div class="mt-4 flex justify-between items-center">
					<!-- Button to trigger consultation action -->
					<button
						@click="consultar"
						class="bg-white border border-gray-400 text-gray-800 px-2 py-1 rounded-md flex items-center space-x-2"
					>
						<span>Consultar</span>
						<span :class="{ 'animate-spin': isLoading }">⟳</span>
					</button>
					<!-- Button to recharge -->
					<button
						class="bg-green-500 text-white px-4 py-1 rounded-md"
					>
						RECARGAR
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
/* Animation for spinning elements */
.animate-spin {
	animation: spin 1s linear infinite; /* Infinite spin animation */
}

/* Keyframes for spin animation */
@keyframes spin {
	0% {
		transform: rotate(0deg); /* Start rotation */
	}
	100% {
		transform: rotate(360deg); /* End rotation */
	}
}

/* Transition effects for slide-fade */
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease; /* Smooth transition */
}
.slide-fade-enter-from {
	opacity: 0; /* Start with opacity 0 */
	transform: translateY(-10px); /* Start slightly above */
}
.slide-fade-leave-to {
	opacity: 0; /* End with opacity 0 */
	transform: translateY(-10px); /* Move slightly above */
}
</style>

<!-- FILE DOCUMENTED -->

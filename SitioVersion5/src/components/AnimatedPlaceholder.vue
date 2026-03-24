<template>
	<!-- Main container for the animated placeholder -->
	<div class="animatedPlaceholder">
		<slot />
	</div>
</template>

<script setup lang="ts">
// Script section for TypeScript logic (currently empty)
</script>

<style scoped>
/* Styles for the animated placeholder */
.animatedPlaceholder {
	/* Background gradient animation from transparent to a dark color */
	background-image: linear-gradient(
		to right,
		transparent 0%,
		#181b25 50%,
		transparent 100%
	);
	/* Set the background size to create a smooth animation effect */
	background-size: 200% 100%;
	/* Box shadow for a subtle elevation effect */
	box-shadow:
		0 4px 6px -1px rgb(0 0 0 / 0.1),
		0 2px 4px -2px rgb(0 0 0 / 0.1);
	/* Animation for the background gradient */
	animation: bgAnimate 1.2s linear infinite;
}

/* Keyframes for the background animation */
@keyframes bgAnimate {
	0% {
		/* Starting position of the background */
		background-position: 50% 0;
	}
	100% {
		/* Ending position of the background */
		background-position: -150% 0;
	}
}
</style>

<!-- FILE DOCUMENTED -->

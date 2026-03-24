<script setup lang="ts">
import { defineProps, onMounted } from 'vue';

/**
 * Defines the properties accepted by the component.
 * @typedef {Object} CustomIcon
 * @property {string} SOCIAL_NAME - The name of the social network.
 * @property {string} SOCIAL_ICON - The icon associated with the social network.
 * @property {string} SOCIAL_URL - The URL for the social network.
 */
const props = defineProps<{
	customIcons: CustomIcon[]; // Array of custom icons for social networks
}>();

/**
 * Opens a new window with the provided link.
 * @param {string} link - The URL to redirect to.
 */
const redirectNetwork = (link: string): void => {
	window.open(link); // Opens the link in a new window
};

// Lifecycle hook that runs when the component is mounted
onMounted(() => {
	console.log('Component mounted.', props.customIcons); // Logs the custom icons to the console
});
</script>

<template>
	<!-- Main container for social icons, iterates over customIcons prop -->
	<div
		v-for="(social, index) in props.customIcons"
		:key="index"
		class="hover:scale-[1.1] cursor-pointer"
	>
		<!-- Link for Font Awesome icons -->
		<a
			:href="social.SOCIAL_URL"
			target="_blank"
			v-if="social.SOCIAL_ICON && social.SOCIAL_ICON.startsWith('fa-')"
		>
			<font-awesome-icon
				:icon="social.SOCIAL_ICON"
				class="fontawesomeicon w-[15px] h-[15px]"
			/>
		</a>
		<!-- Image for social icons with direct URLs -->
		<img
			v-else-if="social.SOCIAL_ICON.startsWith('http')"
			:src="social.SOCIAL_ICON"
			alt=""
			class="w-[25px] h-[20px] object-contain"
			@click="redirectNetwork(social.SOCIAL_URL)"
		/>
	</div>
</template>

<style scoped>
/* Scoped styles can be added here */
</style>

<!-- FILE DOCUMENTED -->

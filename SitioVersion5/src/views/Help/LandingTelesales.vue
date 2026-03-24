<script setup lang="ts">
import { ref, computed } from 'vue'; // Importing reactive and computed utilities from Vue
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the app component store
import router from '@/router'; // Importing the router for navigation
import { useRedirect } from '@/composables/useRedirect'; // Importing a custom composable for redirection
import { onBeforeMount } from '@vue/runtime-dom'; // Lifecycle hook to run code before the component mounts

const { redirect } = useRedirect(ref(true)); // Initializing redirect function with a reactive reference
let appComponent = ref<any>(useAppcomponentStore().appComponent); // Reactive reference to the app component
let landing = ref<any>(appComponent.value.config.landingTelesales || {}); // Reactive reference to landing configuration

const wideScreen: boolean = ref(landing.value.fullScreen || false); // Reactive reference to determine if the screen is wide
onBeforeMount(() => {
	// Lifecycle hook to check conditions before mounting
	if (Object.keys(landing.value).length == 0) router.push('/home'); // Redirect to home if landing config is empty
});

// Function to get item properties and computed values
const getItem = (item?: any) => {
	const hasRedirect = computed(
		// Computed property to check if the item has a valid redirect
		() => isValid.value && item?.redirect && item.redirect !== ''
	);
	const isValid = computed(() => item && item !== ''); // Computed property to check if the item is valid
	const className = computed(() =>
		// Computed property for dynamic class assignment
		hasRedirect.value
			? 'hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer readyClick'
			: ''
	);
	const redirectUrl = computed(() =>
		// Computed property for the redirect URL
		hasRedirect.value ? redirect(item.redirect) : ''
	);
	return { isValid, className, redirectUrl }; // Returning computed properties
};
</script>

<template>
	<!-- Main section for the landing page with dynamic classes and styles -->
	<section
		:class="[
			{
				'bg-gradient-to-b from-secondary to-neutral-content': !getItem(
					landing.background
				).isValid.value,
			},
			wideScreen ? 'fixed top-0 left-0 z-[290] overflow-hidden' : '',
		]"
		class="w-full bg-cover bg-center bg-no-repeat flex justify-center items-center p-6 h-screen"
		:style="{
			background: `url(${landing.background})`,
		}"
	>
		<!-- Button to close wide screen view -->
		<button
			v-if="wideScreen"
			:class="[
				'w-8 h-8 bg-red-700',
				'absolute right-2 top-2 rounded-full',
				'hover:scale-105 transition-all duration-700 text-neutral',
				'select-none shadow-[inset_0px_-4px_0px_#0000004d_,_-3px_4px_9px_0px_#0000004d]',
			]"
			@click="wideScreen = false"
		>
			X
		</button>
		<!-- Container for images and content -->
		<div
			class="flex justify-center items-center flex-col gap-2 w-[calc(100vh-11rem)]"
		>
			<!-- Title image -->
			<img
				v-if="getItem(landing.imgTitle).isValid.value"
				:class="getItem(landing.imgTitle).className.value"
				@click="getItem(landing.imgTitle).redirectUrl.value"
				:src="landing.imgTitle.img"
				alt="title telesales"
				class="select-none max-h-[223px]"
				draggable="false"
			/>
			<!-- Grid for content images -->
			<div class="grid grid-cols-2 h-full gap-2 items-center">
				<!-- First content image -->
				<img
					v-if="getItem(landing.imgContent1).isValid.value"
					:class="getItem(landing.imgContent1).className.value"
					@click="getItem(landing.imgContent1).redirectUrl.value"
					:src="landing.imgContent1.img"
					alt="content telesales"
					class="select-none max-h-[343px]"
					draggable="false"
				/>
				<!-- Second content image -->
				<img
					v-if="getItem(landing.imgContent2).isValid.value"
					:class="getItem(landing.imgContent2).className.value"
					@click="getItem(landing.imgContent2).redirectUrl.value"
					:src="landing.imgContent2.img"
					alt="content telesales"
					class="select-none max-h-[343px]"
					draggable="false"
				/>
			</div>
			<!-- Last image -->
			<img
				v-if="getItem(landing.imgLast).isValid.value"
				:class="getItem(landing.imgLast).className.value"
				@click="getItem(landing.imgLast).redirectUrl.value"
				:src="landing.imgLast.img"
				alt="image last telesales"
				class="select-none max-h-[113px]"
				draggable="false"
			/>
		</div>
	</section>
</template>

<style scoped>
/* Animation class for ready click effect */
.readyClick {
	animation: readyClick 0.5s alternate-reverse 2; /* Animation for the readyClick effect */
}
.readyClick:hover {
	animation-play-state: paused; /* Pause animation on hover */
	transition: transform 0.3s ease-out; /* Smooth transition for transform */
}

/* Keyframes for readyClick animation */
@keyframes readyClick {
	0% {
		transform: scale(1); /* Initial scale */
	}
	50% {
		transform: scale(1.05); /* Scale up */
	}
	100% {
		transform: scale(1); /* Return to initial scale */
	}
}
</style>

<!-- FILE DOCUMENTED -->

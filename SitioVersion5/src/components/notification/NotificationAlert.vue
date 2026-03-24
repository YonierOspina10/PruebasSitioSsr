<script lang="ts" setup>
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing the store for app component state management
import IconNotificationtwo from '@/components/icons/IconNotificationtwo.vue'; // Importing the notification icon component

// Accessing the appComponent from the store
const appComponent = useAppcomponentStore().appComponent;

// Defining component props with TypeScript types
const props = defineProps<{
	notificationCount: number; // Number of notifications to display
	eventAnalitic: string; // Event analytics identifier
	url?: string; // Optional URL for navigation
	bgIcon?: string; // Optional background color for the icon
	bgNotification?: string; // Optional background color for the notification badge
	colorText?: string; // Optional text color for the notification badge
	w?: string; // Optional width for the icon container
	h?: string; // Optional height for the icon container
}>();
</script>

<template>
	<RouterLink :to="props.url">
		<!-- Link to the specified URL prop -->
		<div
			class="relative w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:scale-105"
			@click="appComponent.gAnalytics(props.eventAnalitic)"
		>
			<div
				:style="{ background: bgNotification, color: colorText }"
				v-if="notificationCount > 0"
				class="absolute -top-[-1px] -right-1 z-10 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-success text-neutral"
			>
				{{ notificationCount }}
			</div>
			<div
				:class="[w ? w : '35px', h ? h : '35px']"
				class="bg-primary flex justify-center items-center rounded-full"
			>
				<icon-notificationtwo width="32px" class="fill-neutral-content p-[2px]" />
				<!-- Notification icon component -->
			</div>
		</div>
	</RouterLink>
</template>

<style scoped>
/* Scoped styles for this component can be added here */
</style>

<!-- FILE DOCUMENTED -->

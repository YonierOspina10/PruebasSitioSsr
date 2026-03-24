<script setup lang="ts">
import { onMounted, reactive } from 'vue'; // Import necessary Vue functions
import { useAppIonVhtml } from '@/composables/useTextIcon'; // Import custom composable for text icon handling

const { TextIcon } = useAppIonVhtml(); // Destructure TextIcon from the composable
const dataTextIcon = reactive<{ data: {} }>({ data: {} }); // Create a reactive object to hold data

onMounted(() => {
	// Lifecycle hook that runs when the component is mounted
	dataTextIcon.data = { ...TextIcon }; // Populate dataTextIcon with TextIcon data
});
</script>

<template>
	<section
		class="w-full max-w-[1000px] mx-auto flex justify-center items-center gap-[0.65rem] overflow-hidden px-[10px] py-[10px] my-[10px] gap-y-9"
	>
		<!-- Main container for the section, centers content and applies spacing -->
		<router-link
			v-if="dataTextIcon.data.url && dataTextIcon.data.url.trim() !== ''"
			:to="dataTextIcon.data.url"
			class="select-none flex gap-[0.50rem]"
		>
			<!-- Conditional link rendering based on the presence of a valid URL -->
			<div v-if="dataTextIcon.data.icon" class="icon-container">
				<!-- Container for the icon, rendered if an icon exists -->
				<div
					v-if="dataTextIcon.data.icon.startsWith('http')"
					class="w-[19px] h-[19px]"
				>
					<img
						:src="dataTextIcon.data.icon"
						alt=""
						class="object-contain"
					/>
					<!-- Image rendering for icon if the icon URL is valid -->
				</div>
				<div
					v-else
					v-html="dataTextIcon.data.icon"
					class="[&>*]:fill-primary-content [&>*]:w-[19px] [&>*]:h-[19px]"
				></div>
				<!-- Fallback rendering for icon if it's not a URL -->
			</div>
			<div
				class="whitespace-nowrap"
				v-html="dataTextIcon.data.titleVhtml"
			></div>
			<!-- Title rendering using HTML content -->
		</router-link>
		<div
			v-else-if="dataTextIcon.data.url === ''"
			class="select-none flex gap-[0.50rem]"
		>
			<!-- Fallback rendering when URL is an empty string -->
			<div v-if="dataTextIcon.data.icon" class="icon-container">
				<!-- Container for the icon, rendered if an icon exists -->
				<div
					v-if="dataTextIcon.data.icon.startsWith('http')"
					class="w-[19px] h-[19px]"
				>
					<img
						:src="dataTextIcon.data.icon"
						alt=""
						class="object-contain"
					/>
					<!-- Image rendering for icon if the icon URL is valid -->
				</div>
				<div
					v-else
					v-html="dataTextIcon.data.icon"
					class="[&>*]:fill-primary-content [&>*]:w-[19px] [&>*]:h-[19px]"
				></div>
				<!-- Fallback rendering for icon if it's not a URL -->
			</div>
			<div
				class="whitespace-nowrap"
				v-html="dataTextIcon.data.titleVhtml"
			></div>
			<!-- Title rendering using HTML content -->
		</div>
	</section>
</template>

<style scoped></style>

<!-- FILE DOCUMENTED -->

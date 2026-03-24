<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { MenuFloating } from '@/interface/IMenu';
import { useAppcomponentStore } from '@/stores/AppComponent'; // Import app component store
// Define component props with type MenuFloating array
const props = defineProps<{
	menuDataList: MenuFloating[];
}>();
let appComponent = ref<any>(useAppcomponentStore().appComponent); // Reactive reference for app component data
// Reactive reference for the selected menu index
const selectedIndex = ref<number | null>(null);

// Reference for the menu element
const menuRef = ref<HTMLElement | null>(null);

// Function to handle menu item click
const handleClick = (index: number) => {
	selectedIndex.value = index;
	appComponent.value.showGame = false;
};

// Function to handle clicks outside the menu to close it
const handleClickOutside = (e: MouseEvent) => {
	if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
		selectedIndex.value = null;
	}
};

// Function to check if a URL is an external link
const isExternalLink = (url: string): boolean => {
	return /^https?:\/\//.test(url);
};

// Lifecycle hook to add event listener on component mount
onMounted(() => {
	window.addEventListener('click', handleClickOutside);
});

// Lifecycle hook to remove event listener on component unmount
onBeforeUnmount(() => {
	window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
	<!-- Main container for the menu -->
	<div
		ref="menuRef"
		class="w-full h-[35px] max-h-[39px] mx-auto flex justify-around items-center"
	>
		<!-- Loop through menuDataList to create menu items -->
		<div
			v-for="(item, index) in menuDataList"
			:key="item.url"
			class="text-center"
		>
			<!-- External link handling -->
			<a
				v-if="isExternalLink(item.url)"
				:href="item.url"
				target="_blank"
				rel="noopener noreferrer"
				:data-analytics-label="`header:menu:${item.title.toLowerCase().replace(/\s+/g, '-')}`"
				:data-analytics-context="`component:FloatingMenu|layout:layout-${appComponent.config.layout}`"
				class="text-center"
			>
				<div class="flex flex-col items-center relative">
					<div class="rounded-full relative z-10">
						<div
							v-html="item.icon"
							class="[&>*]:w-[30px] [&>*]:h-[30px] transition-all duration-300"
							:class="[
								selectedIndex === index
									? '[&>*]:rotate-[-17deg] [&>*]:scale-[1.5] [&>*]:translate-y-[-0.75rem] [&>*]:fill-primary-content'
									: '[&>*]:fill-neutral',
								{
									'[&>*]:fill-[#FFDE00]':
										index === menuDataList.length - 1,
								},
							]"
						></div>
					</div>
					<p
						class="text-sm relative z-0"
						:class="{
							'text-primary-content':
								selectedIndex === index ||
								index === menuDataList.length - 1,
							'text-neutral':
								selectedIndex !== index &&
								index !== menuDataList.length - 1,
						}"
					>
						{{ $t(item.title) }}
					</p>
				</div>
			</a>
			<!-- Internal link handling -->
			<router-link 
				v-else
                :to="item.url"
				:data-analytics-label="`header:menu:${item.title.toLowerCase().replace(/\s+/g, '-')}`" 
				:data-analytics-context="`component:FloatingMenu|layout:layout-${appComponent.config.layout}`"
				@click="handleClick(index); appComponent.showGame = false"
			>
				<div class="flex flex-col items-center relative">
					<div class="rounded-full relative z-10">
						<div
							v-html="item.icon"
							class="[&>*]:w-[30px] [&>*]:h-[30px] transition-all duration-300"
							:class="[
								selectedIndex === index
									? '[&>*]:rotate-[-17deg] [&>*]:scale-[1.5] [&>*]:translate-y-[-0.75rem] [&>*]:fill-primary-content'
									: '[&>*]:fill-neutral',
								{
									'[&>*]:fill-[#FFDE00]':
										index === menuDataList.length - 1,
								},
							]"
						></div>
					</div>
					<p
						class="text-sm relative z-0"
						:class="{
							'text-primary-content':
								selectedIndex === index ||
								index === menuDataList.length - 1,
							'text-neutral':
								selectedIndex !== index &&
								index !== menuDataList.length - 1,
						}"
					>
						{{ $t(item.title) }}
					</p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

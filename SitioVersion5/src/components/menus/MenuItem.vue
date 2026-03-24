<template>
	<!-- Main list item container for the menu -->
	<li class="relative group">
		<!-- Clickable div that displays the menu title and an arrow icon if there are submenus -->
		<div
			class="flex items-center gap-2 p-2 cursor-pointer text-gray-700 hover:bg-yellow-100"
			:data-analytics-label="`menu:nav:${item.MENU_TITLE.toLowerCase().replace(/\s+/g,'-')}`"
			:data-analytics-context="`component:MenuItem|layout:${((window as any).cconfig && (window as any).cconfig.layout) ? (window as any).cconfig.layout : 'na'}`"
			@click="toggleSubMenu(item)"
		>
			<span>{{ item.MENU_TITLE }}</span>
			<!-- SVG icon displayed if the item has submenus -->
			<svg
				v-if="item.SUBMENUS && item.SUBMENUS.length > 0"
				class="ml-2 h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		<!-- Submenu container that appears on hover -->
		<ul
			class="absolute left-full top-0 mt-1 w-48 p-2 border border-[#333333] rounded-lg shadow-xl backdrop-blur-sm bg-[#333333]/40 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 translate-y-[0.75rem]"
		>
			<!-- Render sub-menu items using the MenuItem component -->
			<MenuItem
				v-for="subItem in item.SUBMENUS"
				:key="subItem.MENU_ID"
				:item="subItem"
				@toggle="toggleSubMenu"
				@redirect="redirectPageSubMenu"
			/>
		</ul>
	</li>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { MenuList } from '@/interface/IMenu';

// Define props for the component, expecting an item of type MenuList
const props = defineProps<{ item: MenuList }>();

// Define events that the component can emit
const emit = defineEmits(['toggle', 'redirect']);

// Function to toggle the visibility of the submenu
const toggleSubMenu = () => emit('toggle', props.item);

// Function to redirect to a submenu page
const redirectPageSubMenu = (url: string) => emit('redirect', url);
</script>

<!-- FILE DOCUMENTED -->

<script setup lang="ts">
import type { IconProps } from '../../interface'; // Importing type definition for icon properties

// Defining component props with default values
const props = withDefaults(
	defineProps<{
		w: string; // Width of the button
		h: string; // Height of the button
		disabled?: boolean; // Optional prop to disable the button
		color?: string; // Optional prop for text color
		text?: string; // Optional prop for button text
		iconComponent?: IconProps; // Optional prop for icon component
		bg?: string; // Optional prop for background color
		bgLine?: string; // Optional prop for background line color
		isVisibleLine: boolean; // Determines if the line is visible
		isVisibleLineMobile: boolean; // Determines if the line is visible on mobile
		fontWeight?: string; // Optional prop for font weight
	}>(),
	{}
);

// Defining emitted events for the component
const emits = defineEmits<{
	(e: 'onClick', handler: Event): void; // Event emitted when the button is clicked
}>();

// Click event handler
const onClick = (e: Event): void => {
	if (!props.disabled) emits('onClick', e); // Emit event only if button is not disabled
};
</script>

<template>
	<!-- Button element with dynamic styles and classes -->
	<button
		@click="onClick"
		:style="{ width: props.w, height: props.h, backgroundColor: props.bg }"
		:class="[
			'min-h-0',
			'capitalize tracking-[0.5px]',
			'border-2 border-solid border-transparent',
			'font-medium',
			props.disabled ? 'app-color-disabled' : 'default',
			'relative',
			'group',
			'flex justify-center items-center',
		]"
	>
		<span class="relative group">
			<!-- Container for text and line effects -->
			<div
				class="relative group m-[-2px] whitespace-nowrap"
				:class="[fontWeight]"
				:style="{ color: color }"
			>
				{{ props.text }}
				<!-- Display button text -->
				<span
					v-if="isVisibleLine"
					:class="['bg-primary-content']"
					class="absolute bottom-0 left-1 w-[100%] md:w-[50%] h-[2px] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
				></span>
				<span
					v-if="isVisibleLineMobile"
					:class="['bg-primary-content']"
					class="absolute bottom-0 left-2 w-[85%] h-[2px] transform transition-transform duration-300 scale-x-100"
				></span>
			</div>
		</span>
		<component
			:is="props.iconComponent?.icon"
			:width="props.iconComponent?.w"
			:height="props.iconComponent?.h"
			:fill="props.iconComponent?.fill"
		/>
		<slot />
		<!-- Slot for additional content -->
	</button>
</template>

<style scoped>
.textWith:hover {
	color: #ffffff !important; /* Hover effect for text color */
}
</style>

<!-- FILE DOCUMENTED -->

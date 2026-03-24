<script setup lang="ts">
import type { IconProps } from '../../interfaces'; // Importing IconProps type from interfaces

// Defining component props with default values
const props = withDefaults(
    defineProps<{
        w: string; // Width of the component
        h: string; // Height of the component
        disabled?: boolean; // Optional flag to disable the component
        color?: string; // Optional color for the component
        text?: string; // Optional text to display
        iconComponent?: IconProps; // Optional icon component props
        bg?: string; // Optional background color
        bgLine?: string; // Optional background line color
        isVisibleLine: boolean; // Flag to control line visibility
        isVisibleLineMobile: boolean; // Flag to control line visibility on mobile
        fontWeight?: string; // Optional font weight
    }>(),
    {},
);

// Defining emitted events for the component
const emits = defineEmits<{
    (e: 'onClick', handler: Event): void; // Emitting 'onClick' event with an Event handler
}>();

// Click event handler
const onClick = (e: Event): void => {
    if (!props.disabled) emits('onClick', e); // Emit 'onClick' event if not disabled
};
</script>
<template>
    <!-- Button component with dynamic styles and classes -->
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
        <!-- Span for button text and line effects -->
        <span class="relative group">
            <div
                class="relative group m-[-2px] whitespace-nowrap"
                :class="[fontWeight]"
                :style="{ color: color }"
            >
                {{ props.text }}
                <!-- Line effect for hover state -->
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
        <!-- Dynamic icon component -->
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
/* Changes text color to white on hover */
.textWith:hover {
    color: #ffffff !important; /* Overrides other color styles */
}
</style>

<!-- FILE DOCUMENTED -->

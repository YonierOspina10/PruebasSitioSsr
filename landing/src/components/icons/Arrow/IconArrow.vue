<script setup lang="ts">
/**
 * Defines the props for a Vue component.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.width - The width of the component.
 * @param {string} props.height - The height of the component.
 * @param {string} [props.fill] - Optional fill color for the component.
 */
defineProps<{ width: string; height: string; fill?: string }>();
</script>
<template>
    <!-- SVG container for scalable vector graphics -->
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.36328 2.21875L4.92642 5.78189L8.48956 2.21875"
            :stroke="fill"
            stroke-width="0.890785"
            stroke-linecap="round"
        />
    </svg>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

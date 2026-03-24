<script setup lang="ts">
/**
 * Define component props with TypeScript types.
 *
 * @property {string} width - The width of the SVG element.
 * @property {string} height - The height of the SVG element.
 * @property {string} [fill] - Optional stroke color for the path.
 */
defineProps<{ width: string; height: string; fill?: string }>();
</script>

<template>
    <!-- SVG container with dynamic width and height based on props -->
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 5 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <!-- Path element representing a line with dynamic stroke color -->
        <path d="M5 1.13437C4.94996 1.33035 4.82987 1.4696 4.67976 1.60369C3.61897 2.53719 2.55817 3.47585 1.50239 4.4145C1.47236 4.44545 1.43734 4.47123 1.39731 4.51249C1.50739 4.61049 1.61747 4.70848 1.72255 4.80131C2.7283 5.68839 3.72905 6.57547 4.7348 7.46255C4.88992 7.60181 4.98499 7.76684 4.96497 7.98346C4.93995 8.21038 4.82487 8.37027 4.61972 8.45794C4.41456 8.54046 4.21942 8.4992 4.05429 8.35479C3.71904 8.06082 3.3888 7.76684 3.05354 7.47287C2.11785 6.64768 1.18215 5.81733 0.246446 4.99214C0.0613082 4.8271 -0.0487739 4.63627 0.0212782 4.38356C0.0563048 4.26494 0.126357 4.14116 0.211421 4.0638C1.49738 2.91884 2.79335 1.77905 4.08432 0.639251C4.15437 0.577362 4.24444 0.546417 4.3295 0.5L4.55967 0.5C4.79485 0.587677 4.94496 0.752715 5 1.00543L5 1.13952L5 1.13437Z" />
    </svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

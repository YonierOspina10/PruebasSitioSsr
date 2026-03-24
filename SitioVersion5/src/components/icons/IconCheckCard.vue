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
    <svg :width="width" :height="height" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2" width="71" height="71" rx="35.5" fill="#1C1E2B"/>
        <rect x="2.5" y="2" width="71" height="71" rx="35.5" stroke="#00AB46" stroke-width="4"/>
        <path d="M47.914 28.5C47.3757 28.5 46.8598 28.7214 46.5009 29.0978L34.6804 40.7657L29.4991 35.6513C29.0953 35.2528 28.5346 35.0978 28.0187 35.0535C27.4804 35.0535 26.9645 35.2749 26.5832 35.6734C26.2243 36.0498 26 36.559 26 37.0904C26 37.6439 26.2019 38.1531 26.6056 38.5295L34.6804 46.5L49.3944 31.976C49.7981 31.5775 50 31.0683 50 30.5148C50 29.9834 49.7757 29.4742 49.3944 29.1199C48.9907 28.7214 48.5421 28.5443 47.914 28.5221V28.5Z" fill="#00AB46"/>
    </svg>
</template>

<style scoped>
/* Scoped styles for the component can be added here */
</style>

<!-- FILE DOCUMENTED -->

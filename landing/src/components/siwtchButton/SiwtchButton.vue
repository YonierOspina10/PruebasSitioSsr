<template>
    <!-- Main container for the navigation links with styling for background, border, and layout -->
    <div
        class="bg-primary-focus rounded-full w-[200px] h-[33px] border border-neutral flex justify-between items-center"
    >
        <!-- RouterLink for Deportes navigation with conditional classes based on route -->
        <RouterLink
            to="/deportes"
            active-class="bg-primary-content border-r-2 border border-neutral"
            data-analytics-label="header:menu:deportes"
            :data-analytics-context="`component:SiwtchButton|layout:layout-6`"
            class="rounded-full text-sm w-1/2 h-full flex justify-center items-center gap-1"
            :class="$route.fullPath == '/new-casino' ? '' : 'bg-primary-content border-r-2 border border-neutral'"
        >
            <!-- Image for Deportes link -->
            <img
                src="https://images.virtualsoft.tech/m/msj0212T1712067336.png"
                alt=""
                class="w-[20px] aspect-square object-contain"
            />
            <span>Deportes</span>
        </RouterLink>
        <!-- RouterLink for Casino navigation -->
        <RouterLink
            to="/new-casino"
            active-class="bg-primary-content border-l-2 border border-neutral"
            data-analytics-label="header:menu:casino"
            :data-analytics-context="`component:SiwtchButton|layout:layout-6`"
            class="rounded-full text-sm w-1/2 h-full flex justify-center items-center gap-1"
        >
            <!-- Image for Casino link -->
            <img
                src="https://images.virtualsoft.tech/m/msj0212T1712067451.png"
                alt=""
                class="w-[20px] aspect-square object-contain"
            />
            <span>Casino</span>
        </RouterLink>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition using the Composition API.
 * @returns {Object} The setup function returns an object for the component's reactive state.
 */
export default defineComponent({
    setup() {
        return {};
    },
});
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

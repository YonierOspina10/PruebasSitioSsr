<script setup lang="ts">
import { defineProps } from 'vue';

/**
 * Defines the component's props.
 * @typedef {Object} Props
 * @property {Array<{SOCIAL_NAME: string, SOCIAL_ICON: string, SOCIAL_URL: string}>} customIcons - Array of social icon objects.
 */
const props = defineProps<{
    customIcons: {
        SOCIAL_NAME: '';
        SOCIAL_ICON: '';
        SOCIAL_URL: '';
    }[];
}>();

/**
 * Opens a new window with the specified link.
 * @param {string} link - The URL to redirect to.
 * @returns {void}
 */
const redirectNetwork = (link: string): void => {
    window.open(link);
};
</script>
<template>
    <!-- Container for social icons, iterates over customIcons prop -->
    <div
        v-for="(social, index) in props.customIcons"
        :key="index"
        :data-analytics-label="`header:social-network:${social.SOCIAL_NAME}`"
        data-analytics-context="component:socialNetWork|layout:layout-8"
        class="hover:scale-[1.1] cursor-pointer"
    >
        <!-- Link for Font Awesome icons, opens in a new tab -->
        <a
            :href="social.SOCIAL_URL"
            target="_blank"
            v-if="social.SOCIAL_ICON && social.SOCIAL_ICON.startsWith('fa-')"
        >
            <!-- Font Awesome icon component -->
            <font-awesome-icon
                :icon="social.SOCIAL_ICON"
                class="fontawesomeicon w-[15px] h-[15px]"
            />
        </a>
        <!-- Image for social icons with direct URL -->
        <img
            v-else-if="social.SOCIAL_ICON.startsWith('http')"
            :src="social.SOCIAL_ICON"
            alt=""
            class="w-[25px] h-[20px] object-contain"
            @click="redirectNetwork(social.SOCIAL_URL)"
        />
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

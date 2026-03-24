<script setup lang="ts">
import { onMounted, reactive } from 'vue'; // Import Vue composition API functions
import { useAppIonVhtml } from '../../composables/useTextIcon'; // Import custom composable for text icon handling

const { TextIcon } = useAppIonVhtml(); // Destructure TextIcon from the composable

// Reactive object to hold data for the text icon
const dataTextIcon = reactive<{ data: {} }>({ data: {} });

// Lifecycle hook that runs when the component is mounted
onMounted(() => {
    dataTextIcon.data = { ...TextIcon }; // Spread TextIcon data into the reactive object
});
</script>
<template>
    <!-- Main section container with responsive design and flex layout -->
    <section
        class="w-full max-w-[1000px] mx-auto flex justify-center items-center gap-[0.65rem] overflow-hidden px-[28px] my-[10px] gap-y-9"
    >
        <!-- Router link for navigation, conditionally rendered based on URL presence -->
        <router-link
            v-if="dataTextIcon.data.url && dataTextIcon.data.url.trim() !== ''"
            :to="dataTextIcon.data.url"
            class="select-none flex gap-[0.50rem]"
        >
            <!-- Icon container, conditionally rendered based on icon presence -->
            <div
                v-if="dataTextIcon.data.icon"
                class="icon-container"
            >
                <!-- Image icon, rendered if the icon URL starts with 'http' -->
                <div
                    v-if="dataTextIcon.data.icon.startsWith('http')"
                    class="w-[19px] h-[19px]"
                >
                    <img
                        :src="dataTextIcon.data.icon"
                        alt=""
                        class="object-contain"
                    />
                </div>
                <!-- SVG or other icon types, rendered if the icon is not a URL -->
                <div
                    v-else
                    v-html="dataTextIcon.data.icon"
                    class="[&>*]:fill-primary-content [&>*]:w-[19px] [&>*]:h-[19px]"
                ></div>
            </div>
            <!-- Title container, rendered with HTML content -->
            <div
                class="[&>*]:text-[17px] [&>*]:md:text-[20px]"
                v-html="dataTextIcon.data.titleVhtml"
            ></div>
        </router-link>
        <!-- Fallback div for when the URL is an empty string -->
        <div
            v-else-if="dataTextIcon.data.url === ''"
            class="select-none flex gap-[0.50rem]"
        >
            <!-- Icon container, conditionally rendered based on icon presence -->
            <div
                v-if="dataTextIcon.data.icon"
                class="icon-container"
            >
                <!-- Image icon, rendered if the icon URL starts with 'http' -->
                <div
                    v-if="dataTextIcon.data.icon.startsWith('http')"
                    class="w-[19px] h-[19px]"
                >
                    <img
                        :src="dataTextIcon.data.icon"
                        alt=""
                        class="object-contain"
                    />
                </div>
                <!-- SVG or other icon types, rendered if the icon is not a URL -->
                <div
                    v-else
                    v-html="dataTextIcon.data.icon"
                    class="[&>*]:fill-primary-content [&>*]:w-[19px] [&>*]:h-[19px]"
                ></div>
            </div>
            <!-- Title container, rendered with HTML content -->
            <div
                class="[&>*]:text-[17px] [&>*]:md:text-[20px]"
                v-html="dataTextIcon.data.titleVhtml"
            ></div>
        </div>
    </section>
</template>
<style scoped>
/* Container for icons, using flexbox for alignment */
.icon-container {
    display: flex; /* Enables flexbox layout */
    justify-content: center; /* Centers items horizontally */
    align-items: center; /* Centers items vertically */
    gap: 10px; /* Space between items */
}
</style>

<!-- FILE DOCUMENTED -->

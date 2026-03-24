<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import traced from '../icons/TracedIcon.vue'; // Importing a traced icon component

export default defineComponent({
    props: {
        icons: Object, // Defining a prop 'icons' of type Object
    },
    data() {
        let appComponent: any = this.$appComponent; // Storing the app component reference
        let login2: string = ''; // Initializing a string variable for login
        return {
            login2, // Returning login2 in the data object
            appComponent, // Returning appComponent in the data object
        };
    },
    components: {
        traced, // Registering the traced component
    },
    created() {
        // Lifecycle hook that runs when the component is created
        this.icons.forEach(function (element) {
            // Iterating over each icon in the icons prop
            if (
                element.MENU_URL.indexOf('http') != -1 || // Checking if MENU_URL contains 'http'
                element.MENU_URL.indexOf('www') != -1 // Checking if MENU_URL contains 'www'
            ) {
                element.MENU_NEWTAB = true; // Setting MENU_NEWTAB to true if URL is external
            } else {
                element.MENU_NEWTAB = false; // Setting MENU_NEWTAB to false if URL is internal
            }
        });
    },
});
</script>
<template>
    <section>
        <!-- Main container for the home content section -->
        <div
            id="home-content"
            class="version1 home-slider"
        >
            <!-- Container for the animated content, centered and wrapped -->
            <div class="animated flex justify-center items-center flex-wrap py-8 gap-y-8 xl:px-30">
                <!-- Loop through each icon in the icons prop -->
                <div
                    v-for="value in icons"
                    class="container-slide w-2/4 xl:w-1/4 h-full flex items-center justify-center"
                    style=""
                >
                    <!-- RouterLink component for navigation -->
                    <RouterLink
                        @click="appComponent.gAnalytics('sub_menu', value)"
                        :to="value.MENU_URL"
                        :title="$t(value.MENU_TITLE)"
                        data-use="preload"
                        itemprop="url"
                        :aria-label="value.MENU_TITLE"
                        class="hover:scale-105 max-w-none transition-all ease-in-out"
                    >
                        <!-- Container for the icon and title -->
                        <div
                            class="flex justify-center items-center bg-gradient-to-b from-neutral to-gray-200 p-2 rounded-2xl font-poppinsb text-gray-700 scale-top-[-25px] left-[-5px] scale-[.8] md:scale-100 w-[190px] md:w-[270px] h-[62px] relative"
                        >
                            <!-- Container for the icon image -->
                            <div
                                class="container-img absolute left-[8px] w-[40px] h-[40px]"
                                style="z-index: 2"
                            >
                                <!-- Lazy-loaded icon image -->
                                <img
                                    v-lazy="value.MENU_ICON"
                                    width="35"
                                    height="15"
                                    alt="sports bets, casino"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                            <!-- Traced icon component -->
                            <traced
                                class="absolute top-[-49px] left-[-8px] z-1"
                                :class="[
                                    value.MENU_CLASS_DIV == undefined || value.MENU_CLASS_DIV == ''
                                        ? 'fill-primary-content'
                                        : value.MENU_CLASS_DIV,
                                ]"
                                :width="'145'"
                                :height="'150'"
                            />
                            <!-- Title text for the icon -->
                            <span
                                class="font-poppinsb pl-16 md:pl-12 text-gray-600/90 text-xs md:text-xl max-w-[131px] md:max-w-[200px]"
                                >{{ $t(value.MENU_TITLE) }}</span
                            >
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

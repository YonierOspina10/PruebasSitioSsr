<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import { register } from 'swiper/element/bundle'; // Importing register from Swiper for element registration
register(); // Registering Swiper elements

export default defineComponent({
    props: {
        imagesCarouselRender: Object, // Defining a prop 'imagesCarouselRender' of type Object
    },
    components: {}, // Placeholder for local components
    data() {
        let appComponent: any = this.$appComponent; // Accessing the app component from the Vue instance
        return {
            appComponent, // Returning appComponent in the data object
        };
    },
    setup() {
        return {}; // Setup function returning an empty object for composition API
    },
    methods: {
        /**
         * Retrieves the image URL based on the provided name.
         * @param name - The name or URL of the image.
         * @returns The complete image URL.
         */
        getImg(name: string) {
            if (name.includes('http'))
                return name; // Return the name if it is a full URL
            else {
                const baseUrl = new URL(import.meta.url).origin + '/landing/'; // Constructing base URL
                return new URL(baseUrl + name).href; // Returning the complete image URL
            }
        },
    },
});
</script>
<template>
    <!-- Main container for the carousel with relative positioning and styling -->
    <div
        class="relative carousel container-carousel w-full h-[120px] md:h-[300px] after:absolute after:w-full after:h-4 after:bg-primary-content after:bottom-0 after:brightness-[0.6] after:shadow-[1px_-3px_16px_13px_,_0px_-10px_50px_20px] after:shadow-primary-content after:z-1"
    >
        <!-- Swiper container for the carousel slides with various properties -->
        <swiper-container
            :spacebetween="0"
            :slidesperview="1"
            :centeredslides="true"
            :loop="false"
            navigation="true"
            :pagination="{
                clickable: true,
            }"
            class="mySwiper relative h-[100px] lg:h-[280px]"
            :class="appComponent.skeleton ? 'container-loading' : ''"
        >
            <!-- Individual slide for each banner in the carousel -->
            <swiper-slide
                lazy="true"
                v-for="(banner, i) in imagesCarouselRender"
                :key="banner.id"
                data-analytics-label="promo:banner:hero"
                :data-analytics-id="banner.id"
                :data-analytics-position="i + 1"
                :data-analytics-context="`component:BannerV3|layout:layout-${appComponent.config.layout}`"
                class="w-full z-1"
                :id="'banner-' + i"
            >
                <!-- Link to the banner's redirect URL -->
                <router-link :to="banner.redirect">
                    <!-- First image in the slide with conditional rendering -->
                    <img
                        v-if="Number(i) == 0"
                        width="1920"
                        height="280"
                        :src="banner.url"
                        :alt="`Slider ${banner.alt}`"
                        class="w-full h-full z-10"
                        loading="lazy"
                    />
                    <!-- Subsequent images in the slide with lazy loading -->
                    <img
                        v-else
                        width="1920"
                        height="280"
                        v-lazy="{ src: banner.url, delay: 3000 }"
                        :alt="`Slider ${banner.alt}`"
                        class="w-full h-full z-10"
                        loading="lazy"
                    />
                </router-link>
            </swiper-slide>
        </swiper-container>
    </div>
</template>
<style scoped>
/* Styles for navigation buttons in the swiper container */
swiper-container::part(button-next),
swiper-container::part(button-prev) {
    color: hsl(var(--b1)); /* Sets the color using a CSS variable */
    width: 20px; /* Width of the buttons */
    height: 20px; /* Height of the buttons */
}

/* Active bullet style in the swiper container */
swiper-container::part(bullet-active) {
    background-color: hsl(var(--b1)); /* Background color for active bullet */
}

/* Carousel container styles */
.container-carousel {
    cursor: pointer; /* Default cursor style */
}

/* Active state for carousel container */
.container-carousel.active {
    cursor: grab !important; /* Changes cursor to grab when active */
}

/* Shadow container styles */
.shadow-container {
    /* z-index: 10; */ /* Commented out z-index */
    position: absolute; /* Positioned absolutely within its parent */
    top: -1px; /* Offset from the top */
    left: -5px; /* Offset from the left */
    width: 101%; /* Full width with slight overflow */
    height: 101%; /* Full height with slight overflow */
    opacity: 0.9; /* Slightly transparent */
    box-shadow: inset 0px 0px 20px 19px rgb(0 0 0); /* Inner shadow effect */
}

/* Media query for small screens */
@media only screen and (max-width: 600px) {
    .shadow-container {
        box-shadow: inset 0 0 8px 2px #000 !important; /* Adjusted shadow for small screens */
    }
}

/* Image shadow container styles */
.img-shadow-container {
    /* z-index: -1; */ /* Commented out z-index */
    /* position: relative; */ /* Commented out position */
}
</style>

<!-- FILE DOCUMENTED -->

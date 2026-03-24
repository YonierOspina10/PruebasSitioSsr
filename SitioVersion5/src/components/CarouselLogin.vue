<script lang="ts">
import { defineComponent, ref } from "vue"; // Import necessary functions from Vue
import { Swiper, SwiperSlide } from "swiper/vue"; // Import Swiper and SwiperSlide components
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Import Swiper modules for functionality
import "swiper/css"; // Import Swiper CSS
import "swiper/css/pagination"; // Import Swiper pagination CSS
import "swiper/css/navigation"; // Import Swiper navigation CSS

export default defineComponent({
    props: {
        images: Array, // Define a prop 'images' that expects an array
    },
    components: {
        Swiper, // Register Swiper component
        SwiperSlide, // Register SwiperSlide component
    },
    setup() {
        return {
            pagination: {
                clickable: true, // Enable clickable pagination bullets
                renderBullet: function (index, className) { // Custom bullet rendering function
                    return '<span class="' + className + '">' + (index + 1) + '</span>'; // Return bullet HTML
                },
            },
            modules: [Autoplay, Pagination, Navigation], // Register Swiper modules
        };
    },
    data() {
        let config = this.$config(); // Retrieve configuration
        let appComponent: any = this.$appComponent; // Reference to app component
        let imagesCarousel: any = this.images; // Reference to images prop
        let imagesCarouselRender: any = undefined; // Placeholder for filtered images
        let colors: any = {}; // Initialize colors object
        let deviceTheme: string = 'theme_colors'; // Set default device theme
        return {
            config,
            appComponent,
            imagesCarousel,
            imagesCarouselRender,
            colors,
            deviceTheme,
        };
    },
    watch: {
        // When parent updates images asynchronously recompute the rendered list.
        images: {
            immediate: true,
            handler(newImages: any[]) {
                this.imagesCarousel = newImages;
                this.imagesCarouselRender = this.filterImagesByDates(this.imagesCarousel);
            },
        },
    },
    created() {
        // Lifecycle hook to set device theme based on configuration
        if (
            this.config.theme_colors_desktop != undefined &&
            this.config.mobileL == ''
        )
            this.deviceTheme = 'theme_colors_desktop'; // Set theme for desktop
        else if (
            this.config.theme_colors_mobile != undefined &&
            this.config.mobileL != ''
        )
            this.deviceTheme = 'theme_colors_mobile'; // Set theme for mobile
        this.colors = this.config[this.deviceTheme]; // Assign colors based on device theme
    },
    beforeMount() {
        this.imagesCarouselRender = this.filterImagesByDates(this.imagesCarousel);
    },
    mounted() {
        // Lifecycle hook for additional logic after component is mounted
    },
    methods: {
        // Filter images based on date criteria before the component mounts
        filterImagesByDates(images: any[]) {
            const list = Array.isArray(images) ? images : [];
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            return list.filter((e: any) => {
                const hasStart = e?.startDate != undefined && e?.startDate !== '';
                const hasEnd = e?.date != undefined && e?.date !== '';

                if (!hasStart && !hasEnd) return true;

                // If both exist
                if (hasStart && hasEnd) {
                    const startDate = new Date(String(e.startDate).replace(' ', 'T'));
                    const endDate = new Date(String(e.date).replace(' ', 'T'));
                    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return true;
                    return currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime();
                }

                // Only start
                if (hasStart && !hasEnd) {
                    const startDate = new Date(String(e.startDate).replace(' ', 'T'));
                    if (isNaN(startDate.getTime())) return true;
                    return currentDate.getTime() >= startDate.getTime();
                }

                // Only end
                if (!hasStart && hasEnd) {
                    const endDate = new Date(String(e.date).replace(' ', 'T'));
                    if (isNaN(endDate.getTime())) return true;
                    return currentDate.getTime() <= endDate.getTime();
                }

                return true;
            });
        },
        goToLink(link) {
            window.open(link, "_top"); // Open the provided link in the top window
        },
    },
});
</script>

<template>
    <section
        v-if="imagesCarouselRender.length > 0"
        class="w-full h-full flex flex-col justify-center items-center px-5"
    >
        <swiper-container
            :spaceBetween="0"
            :slidesPerView="1"
            :centeredSlides="true"
            :loop="true"
            :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
            :pagination="{ clickable: true }"
            :modules="modules"
            :navigation="true"
            :injectStyles="[
				`
            .swiper {
                border-radius:0.5rem;
            }

            .swiper-pagination,
            .swiper-pagination-clickable,
            .swiper-pagination-bullet,
            .swiper-pagination-horizontal {
                color: ${colors.neutral};
            }
			.swiper-button-prev,
			.swiper-button-next,
			.swiper-button-prev::after,
			.swiper-button-next::after {
				color: ${colors.primary};
				width: 40px;
				height: 40px;
			}`,
			]"
            class="mySwiper w-full h-[22vh] md:h-[25vh] flex flex-col justify-center items-center rounded-lg"
        >
            <SwiperSlide
                v-for="banner in imagesCarouselRender"
                class="w-full h-full z-1"
            >
                <div class="w-full h-full flex justify-center items-center">
                    <img
                        v-if="
              banner != '' &&
              banner != undefined &&
              banner.url != '' &&
              banner.url != undefined
            "
                        :src="banner.url"
                        alt=""
                        class="w-full h-full object-cover object-top z-10"
                    />
                </div>
            </SwiperSlide>
        </swiper-container>
    </section>
</template>

<style scoped>
</style>

<!-- FILE DOCUMENTED -->

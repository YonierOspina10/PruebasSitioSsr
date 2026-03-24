<script lang="ts">
import { defineComponent, ref } from 'vue'; // Import necessary functions from Vue
import IconChevronLeft from '../icons/ChevronLeftIcon.vue'; // Import left chevron icon component
import IconChevronRight from '../icons/ChevronRightIcon.vue'; // Import right chevron icon component

// Function to simulate loading a component with a delay
const loadComponent = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({});
        }, 5000); // Resolve after 5 seconds
    });
};

export default defineComponent({
    props: {
        icon: { type: String, default: '' }, // Icon to be displayed
        keySlide: { type: Number, default: 1000 }, // Key for slide identification
    },
    data() {
        // Define component data
        let config = this.$config(); // Retrieves global configuration through injected function.
        let appComponent: any = this.$appComponent; // Gets reference to the global app component store.
        let banner_promotions: any = []; // Array that will store promotional or home card items.
        return {
            config, // Stores application configuration.
            appComponent, // Stores global app component object.
            banner_promotions, // Stores promotional banners or home cards.
            sourceType: 'promotions' // Tracks whether the source is promotional or home card based.
        };
    },
    async setup() {
        const dataComponent = ref(await loadComponent()); // Load component data asynchronously
        return {
            dataComponent,
        };
    },
    components: {
        IconChevronLeft, // Register left chevron icon component
        IconChevronRight, // Register right chevron icon component
    },
    created() {
        this.loadBanners(); // Loads banners when the component is created.
    },
    mounted() {
        const container: any = document.querySelector('#containter-home-cards'); // Selects the container element for home cards.
        if (!container) return; // Exits if the container does not exist.

        const updateGridLayout = () => { // Defines a function to update layout based on card count and screen width.
            if (!this.banner_promotions || !this.banner_promotions.length) return; // Ensures there are banners to compute layout.

            const x = window.matchMedia('(max-width: 767px)'); // Media query to check if screen is mobile.
            if (x.matches) { // Layout rules for mobile screens.
                if (this.banner_promotions.length > 2) {
                    container.classList.add('grid-rows-2'); // Adds a second grid row if more than two cards.
                } else {
                    container.classList.remove('grid-rows-2'); // Removes extra row if unnecessary.
                }
                container.style['grid-template-columns'] = `repeat(${Math.ceil(
                    this.banner_promotions.length / 2
                )}, 50%)`; // Sets grid columns to 50% width each.
            } else { // Desktop layout.
                if (this.banner_promotions.length < 3) {
                    container.style['grid-template-columns'] = `repeat(${this.banner_promotions.length}, ${100 / this.banner_promotions.length + `%`
                        })`; // Distributes columns evenly if less than three cards.
                } else {
                    container.style['grid-template-columns'] = `repeat(${this.banner_promotions.length}, 33.3%)`; // Uses fixed 33.3% width for three or more cards.
                }
            }
        };

        this.$nextTick(updateGridLayout); // Executes layout update after DOM is ready.

        this.$watch('banner_promotions', updateGridLayout, { deep: true }); // Re-applies layout when the banners array changes.

        const mq = window.matchMedia('(max-width: 767px)'); // Media query event.
        mq.addEventListener('change', updateGridLayout); // Updates layout when screen width crosses breakpoint.
    },
    methods: {
        loadBanners() {

            let banners: any[] = []; // Temporary array for processing.
            let sourceType = 'promotions'; // Default source type, determines filtering.

            const notLoginConfig =
                this.appComponent.config?.not_login?.[this.appComponent.lngProd];
            // Non-logged-in flow.
            if (notLoginConfig?.banners?.banner_promotions) {
                banners = notLoginConfig.banners.banner_promotions; // Uses promotional banners.
                sourceType = 'promotions'; // Apply filtering.
            } 
            else if (notLoginConfig?.HOME_IMG_CARD) {
                banners = notLoginConfig.HOME_IMG_CARD; // Uses home card images.
                sourceType = 'home_cards'; // Do not apply filtering.
            }
        
            // Fallback to HOME_CARDS_IMAGES when no banners are available.
            if (!banners || banners.length === 0) {
                banners =
                    this.config.HOME_CARDS_IMAGES_NOLOGUEADO?.[
                        this.appComponent.country
                    ]?.[this.appComponent.lngProd] || []; // Loads fallback guest home cards.
            
                sourceType = 'home_cards'; // Ensures no filtering is applied to fallback.
            }
            // Filters items by date only if source type is promotional.
            if (sourceType === 'promotions') {
                const now = new Date();
            
                const parseDate = (str?: string) => {// Parses string date into Date object.
                    if (!str) return null;
                    const [d, t] = str.split(' ');
                    const [y, m, day] = d.split('-').map(Number);
                
                    if (!t) return new Date(y, m - 1, day, 23, 59, 59); // Default end-of-day time.
                
                    const [h, min, s] = t.split(':').map(Number);
                    return new Date(y, m - 1, day, h, min, s); // Constructs full date.
                };
            
                banners = banners.filter((e) => { // Filters based on start and end validity.
                    if (!e.startDate && !e.date) return true;
                
                    const start = parseDate(e.startDate);
                    const end = parseDate(e.date);
                
                    if (start && end) return now >= start && now <= end;
                    if (start) return now >= start;
                    if (end) return now <= end;
                    return false;
                });
            }
        
            this.sourceType = sourceType; // Stores the resolved source type.
            this.banner_promotions = banners; // Ensures reactivity replaces content.

        },
        moveLeft() {
            // Method to scroll left in the card container
            const casinoSlide = (
                document.getElementsByClassName('containter-home-cards') as HTMLCollectionOf<HTMLElement>
            )[0]; // Select the container for home cards
            let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
            casinoSlide.scrollTo({
                left:
                    scrollNumber -
                    (document.getElementsByClassName('img-cont') as HTMLCollectionOf<HTMLElement>)[0].offsetWidth,
                behavior: 'smooth', // Smooth scrolling effect
            });
        },
        moveRight() {
            // Method to scroll right in the card container
            const casinoSlide = (
                document.getElementsByClassName('containter-home-cards') as HTMLCollectionOf<HTMLElement>
            )[0]; // Select the container for home cards
            let scrollNumber = casinoSlide.scrollLeft; // Get current scroll position
            const calc = casinoSlide.scrollWidth - casinoSlide.offsetWidth; // Calculate maximum scrollable width
            if (scrollNumber + 5 >= calc) {
                casinoSlide.scrollTo({ left: 0, behavior: 'smooth' }); // Scroll back to the start
            } else if (this.banner_promotions.length < 4) {
                casinoSlide.scrollTo({
                    left: scrollNumber - scrollNumber, // No scroll if fewer than 4 images
                    behavior: 'smooth',
                });
            } else {
                casinoSlide.scrollTo({
                    left:
                        scrollNumber +
                        (document.getElementsByClassName('img-cont') as HTMLCollectionOf<HTMLElement>)[0].offsetWidth,
                    behavior: 'smooth', // Smooth scrolling effect
                });
            }
        },
    },
});
</script>
<template>
    <section v-if="appComponent.config.homePage.showHomeCardImages && appComponent.config.homePage_?.HomeCardImages?.show == undefined"
        class="relative"> <!-- Main section for home cards -->
        <div class="flex text-neutral text-2xl pl-10 font-bold items-center">{{ $t('Promociones') }}</div> <!-- Title for promotions -->
        <!-- Conditional rendering based on config -->
        <div
            v-if="appComponent.config.homePage.showHomeCardImages"
            id="containter-home-cards"
            class="containter-home-cards grid grid-flow-col md:grid-rows-1 w-full md:auto-cols-max overflow-x-scroll"
        >
            <button
                v-if="banner_promotions && banner_promotions.length > 3"
                class="btn absolute moveLeft h-full bg-transparent border-none hover:bg-black hover:opacity-70"
                @click="moveLeft()"
                aria-label="Left"
                data-analytics-label="promo:carousel:arrow-prev"
                :data-analytics-context="`component:CardIcons|layout:layout-${appComponent.config.layout}`"
            >
                <span class="bg-primary p-2 rounded-lg"
                    ><IconChevronLeft
                        class="text-black"
                        :width="5"
                        :height="10"
                /></span>
            </button>
            <!-- Button to scroll right -->
            <button
                v-if="banner_promotions && banner_promotions.length > 3"
                class="btn absolute right-0 moveRight h-full bg-transparent border-none hover:bg-black hover:opacity-70"
                @click="moveRight()"
                aria-label="Right"
                data-analytics-label="promo:carousel:arrow-next"
                :data-analytics-context="`component:CardIcons|layout:layout-${appComponent.config.layout}`"
            >
                <span class="bg-primary p-2 rounded-lg"
                    ><IconChevronRight
                        class="text-black"
                        :width="5"
                        :height="10"
                /></span>
            </button>
            <div id="containter-home-cards"
                v-for="(value, i) in banner_promotions"
                :key="value.id || i"
                data-analytics-label="promo:banner:mid"
                :data-analytics-id="value.id"
                :data-analytics-position="value.id + 1"
                :data-analytics-context="`component:CardIcon|layout:layout-${appComponent.config.layout}`"
                :class="value.MENU_CLASS"
                class="containter-home-cards flex justify-center items-center p-2 img-cont"
            >
                <RouterLink
                    @click="appComponent.gAnalytics('promotion_interaction', value.MENU_TITLE)"
                    :to="sourceType === 'promotions'
                            ? value.redirect
                            : value.MENU_URL" 
                    :id="value.idValue"
                    class="h-full border-solid border-2 border-primary-content rounded-lg"
                >
                    <!-- Image for the promotion -->
                    <img
                        :src="sourceType === 'promotions'
                                ? value.url
                                : value.MENU_IMG_URL" 
                        width="322" 
                        height="222" 
                        alt="Promociones de apuestas"
                        class="rounded-lg"
                    />
                </RouterLink>
            </div>
        </div>
    </section>
    <!-- Main section for home cards display -->
    <section
        v-if="
            appComponent.config.homePage_ !== undefined &&
            appComponent.config.homePage_.HomeCardImages !== undefined &&
            appComponent.config.homePage_.HomeCardImages.show !== undefined &&
            appComponent.config.homePage_.HomeCardImages.show
        "
        class="flex flex-col justify-center items-center w-full"
    >
        <div class="w-11/12 max-w-[1300px]">
            <!-- Title for the promotions section -->
            <div class="in relative flex justify-between items-center mt-9">
                <div class="w-auto h-auto flex flex-col mb-4">
                    <div class="w-auto h-auto py-1 flex gap-3">
                        <!-- Conditional rendering of the icon -->
                        <img
                            v-if="icon != undefined && icon != ''"
                            :src=icon
                            alt=""
                            class="w-8 h-8 object-contain"
                        />
                        <!-- Title of the section -->
                        <h3
                            class="uppercase font-bold text-xl mt-1 text-neutral"
                            aria-label="Casino bets"
                        >
                            {{ $t('BONOS') }}
                        </h3>
                    </div>
                    <!-- Underline for the title -->
                    <div class="h-1 w-full rounded-full bg-accent"></div>
                </div>
                <!-- Navigation buttons for the carousel -->
					<div
						v-if="
							appComponent.config.layout == undefined ||
							(appComponent.config.layout != undefined && appComponent.config.layout != 4)
						"
						class="flex gap-2"
						:class="
							appComponent.config.layout != undefined && appComponent.config.layout == 4
								? ' w-full justify-between px-3'
								: ''
						"
					>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slidePrev' + keySlide"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-left"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
						<button
							class="cursor-pointer hover:scale-125"
							:class="'slideNext' + keySlide"
						>
							<font-awesome-icon
								icon="fa-solid fa-angle-right"
								class="text-neutral/50 text-2xl hover:text-neutral"
							/>
						</button>
					</div>
            </div>
            <!-- Container for home card images, shown based on configuration -->
              <div
            id="containter-home-cards"
            class="containter-home-cards w-full overflow-x-scroll"
        >
            <swiper-container
                :slides-per-view="'auto'"
                :autoplay="true"
                :autoplay-delay="5000"
                :autoplay-disable-on-interaction="true"
                :autoplay-pause-on-mouse-enter="true"
                :mousewheel="true"
                :navigation="{
								nextEl: '.slideNext' + keySlide,
								prevEl: '.slidePrev' + keySlide,
							}"
                :spaceBetween="12"
                :mousewheel-force-to-axis="true"
                :direction="'horizontal'"
                class="w-[90vw] md:w-[90vw]"
            >
                <swiper-slide
                    v-for="(value, index) in banner_promotions"
                    :key="index"
                    class="w-[364px] h-[210px] tablet:w-[203px] tablet:h-[112px] desktop:w-[360px] desktop:h-[200px] max-w-[85vw] flex justify-center items-center overflow-hidden"
                >
                    <RouterLink
                        @click="appComponent.gAnalytics('promotion_interaction', value.MENU_TITLE)"
                        :to="sourceType === 'promotions'
                            ? value.redirect
                            : value.MENU_URL"
                        :id="value.MENU_ID"
                    >
                        <img
                            :src="sourceType === 'promotions'
                                ? value.url
                                : value.MENU_IMG_URL" 
                            width="1160"
                            height="208"
                            alt="Promociones de apuestas"
                            class="border-2 border-accent hover:border-accent-focus border-solid rounded-xl"
                        />
                    </RouterLink>
                </swiper-slide>
            </swiper-container>
        </div>
        </div>
    </section>
</template>
<style scoped>
div::-webkit-scrollbar {
    display: none; /* Hide the scrollbar for the container */
}
</style>

<!-- FILE DOCUMENTED -->

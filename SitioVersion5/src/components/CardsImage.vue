<script lang="ts">
import { defineComponent } from 'vue'; // Imports the defineComponent API from Vue.
import IconChevronLeft from './icons/IconChevronLeft.vue'; // Imports the left chevron icon component.
import IconChevronRight from './icons/IconChevronRight.vue'; // Imports the right chevron icon component.
import { useGetInfoFirestore } from '../composables/useInfoFirestore'; // Import function to get banners data from firestore

/**
 * Vue component definition for displaying home cards with navigation.
 */
export default defineComponent({
    props: {
        icon: { type: String, default: '' }, // Defines an optional string prop for an icon.
        keySlide: { type: Number, default: 1000 }, // Defines a numeric prop as a slide identifier.
    },
    data() {
        // Initialize component data properties.
        let config = this.$config(); // Retrieves global configuration through injected function.
        let appComponent: any = this.$appComponent; // Gets reference to the global app component store.
        let banner_promotions: any = []; // Array that will store promotional or home card items.
        let scrollReference: any = ''; // Reserved variable for scroll reference (not used here).
        return {
            config, // Stores application configuration.
            appComponent, // Stores global app component object.
            banner_promotions, // Stores promotional banners or home cards.
            sourceType: 'promotions' // Tracks whether the source is promotional or home card based.
        };
    },
    components: {
        IconChevronLeft, // Registers left chevron icon component.
        IconChevronRight, // Registers right chevron icon component.
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

    watch: {
        'appComponent.session.logueado'(newVal, oldVal) { // Watches the login state inside the global store.
            if (newVal !== oldVal) {
                console.log('🔄 Estado de sesión cambió, recargando banners...'); // Logs session state change.
                this.loadBanners(); // Reloads banners when login state changes.
            }
        },
    },

    methods: {
        async loadBanners() { // Loads promotional banners or home cards depending on login and config state.
            let banner_promotions: any = []; // Temporary array for processing.
            let sourceType = 'promotions'; // Default source type, determines filtering.

            //Get banners data from Firebase
            const firestoreBanners = await useGetInfoFirestore(this.config, this.appComponent, 'banner_promotions', { useLogin: true, useScope: true });
            if (firestoreBanners?.length) {
                banner_promotions = firestoreBanners;
                sourceType = 'promotions';
            } else {
                // Non-logged-in flow.
                if (!this.appComponent.session.logueado) {
                    const notLoginConfig = this.appComponent.config?.not_login?.[this.appComponent.lngProd];

                    if (notLoginConfig?.banners?.banner_promotions) {
                        banner_promotions = notLoginConfig.banners.banner_promotions; // Uses promotional banners.
                        sourceType = 'promotions'; // Apply filtering.
                    } else if (notLoginConfig?.HOME_IMG_CARD) {
                        banner_promotions = notLoginConfig.HOME_IMG_CARD; // Uses home card images instead.
                        sourceType = 'home_cards'; // Do not apply filtering.
                    }
                } else {
                    // Logged-in flow.
                    const loginConfig = this.appComponent.config?.login?.[this.appComponent.lngProd];

                    if (loginConfig?.banners?.banner_promotions) {
                        banner_promotions = loginConfig.banners.banner_promotions; // Uses promotional banners.
                        sourceType = 'promotions'; // Apply filtering.
                    } else if (loginConfig?.HOME_IMG_CARD) {
                        banner_promotions = loginConfig.HOME_IMG_CARD; // Uses home card images.
                        sourceType = 'home_cards'; // Do not apply filtering.
                    }
                }

                // Fallback to HOME_CARDS_IMAGES when no banners are available.
                if (!banner_promotions || banner_promotions.length === 0) {
                    if (!this.appComponent.session.logueado) {
                        banner_promotions =
                            this.config.HOME_CARDS_IMAGES_NOLOGUEADO[this.appComponent.country][
                                this.appComponent.lngProd
                            ] || []; // Loads fallback guest home cards.
                    } else {
                        banner_promotions =
                            this.config.HOME_CARDS_IMAGES_LOGUEADO[this.appComponent.country][
                                this.appComponent.lngProd
                            ] || []; // Loads fallback logged home cards.
                    }

                    sourceType = 'home_cards'; // Ensures no filtering is applied to fallback.
                }
            }
            
            // Filters items by date only if source type is promotional.
            if (sourceType === 'promotions') {
                const currentDate = new Date(); // Gets current date.
                currentDate.setSeconds(0, 0); // Normalizes seconds.
                currentDate.setMilliseconds(0); // Normalizes milliseconds.

                const parseDate = (str: string) => { // Parses string date into Date object.
                    if (!str) return null;
                    const [datePart, timePart] = str.split(' ');
                    const [year, month, day] = datePart.split('-').map(Number);
                    if (!timePart) return new Date(year, month - 1, day, 23, 59, 59); // Default end-of-day time.
                    const [hour, minute, second] = timePart.split(':').map(Number);
                    return new Date(year, month - 1, day, hour, minute, second); // Constructs full date.
                };

                banner_promotions = banner_promotions.filter((e) => { // Filters based on start and end validity.
                    if ((!e.startDate || e.startDate === '') && (!e.date || e.date === '')) return true;
                    const startDate = parseDate(e.startDate);
                    const endDate = parseDate(e.date);

                    if (startDate && endDate) return currentDate >= startDate && currentDate <= endDate;
                    if (startDate && !endDate) return currentDate >= startDate;
                    if (!startDate && endDate) return currentDate <= endDate;
                    return false;
                });
            }

            this.banner_promotions.splice(0, this.banner_promotions.length, ...banner_promotions); // Reactively replaces banner array.

            console.log(
                `🔄 Banners actualizados (${sourceType === 'promotions' ? 'filtrados' : 'sin filtrar'}) → total:`,
                this.banner_promotions.length
            ); // Logs update result.

            this.sourceType = sourceType; // Stores the resolved source type.
            this.banner_promotions.splice(0, this.banner_promotions.length, ...banner_promotions); // Ensures reactivity replaces content.
        },

        moveLeft() { // Scrolls the container to the left.
            const casinoSlide = (
                document.getElementsByClassName('containter-home-cards') as HTMLCollectionOf<HTMLElement>
            )[0]; // Selects the scrolling container.
            let scrollNumber = casinoSlide.scrollLeft; // Reads current scroll position.
            casinoSlide.scrollTo({
                left:
                    scrollNumber -
                    (document.getElementsByClassName('img-cont') as HTMLCollectionOf<HTMLElement>)[0].offsetWidth, // Subtracts card width.
                behavior: 'smooth', // Applies smooth animation.
            });
        },

        moveRight() { // Scrolls the container to the right.
            const casinoSlide = (
                document.getElementsByClassName('containter-home-cards') as HTMLCollectionOf<HTMLElement>
            )[0]; // Selects the scrolling container.
            let scrollNumber = casinoSlide.scrollLeft; // Reads current scroll position.
            const calc = casinoSlide.scrollWidth - casinoSlide.offsetWidth; // Computes maximum scroll range.

            if (scrollNumber + 5 >= calc) {
                casinoSlide.scrollTo({ left: 0, behavior: 'smooth' }); // Resets scroll when reaching the end.
            } else if (this.banner_promotions.length < 4) {
                casinoSlide.scrollTo({ left: scrollNumber - scrollNumber, behavior: 'smooth' }); // Resets for small sets.
            } else {
                casinoSlide.scrollTo({
                    left:
                        scrollNumber +
                        (document.getElementsByClassName('img-cont') as HTMLCollectionOf<HTMLElement>)[0].offsetWidth, // Moves by one card width.
                    behavior: 'smooth', // Smooth scrolling effect.
                });
            }
        },
    },
});
</script>

<template>
    <!-- Main section for home cards display -->
    <section v-if="config.homePage.showHomeCardImages || config.homePage_.HomeCardImages.show == undefined"
        class="relative w-full justify-center flex">
        <!-- Title for the promotions section -->
        <div class=" w-11/12 max-w-[1300px] z-20 items-center mt-4">
            <div>
                <div class="flex flex-col pl-10">
                    <span class="text-neutral text-2xl font-bold relative w-fit">
                        {{ $t('Promociones') }}
                        <span class="absolute left-0 -bottom-1 h-1 w-full rounded-full bg-accent"></span>
                    </span>
                </div>
            </div>

            <!-- Container for home card images, shown based on configuration -->
            <div class="relative w-full mt-4">
                <!-- Left navigation button -->
                <button v-if="banner_promotions && banner_promotions.length > 3"
                    class="btn absolute moveLeft h-full bg-transparent border-none hover:bg-black hover:opacity-70"
                    data-analytics-label="promo:carousel:arrow-prev"
                    :data-analytics-context="`component:CardsImage|layout:layout-${appComponent.config.layout}`"
                    @click="moveLeft()" aria-label="Left">
                    <span class="bg-primary p-2 rounded-lg">
                        <IconChevronLeft class="fill-black" :width="5" :height="10" />
                    </span>
                </button>
                <!-- Right navigation button -->
                <button v-if="banner_promotions && banner_promotions.length > 3"
                    data-analytics-label="promo:carousel:arrow-next"
                    :data-analytics-context="`component:CardsImage|layout:layout-${appComponent.config.layout}`"
                    class="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none hover:bg-black hover:opacity-70 h-full"
                    @click="moveRight()" aria-label="Right">
                    <span class="bg-primary p-2 rounded-lg">
                        <IconChevronRight class="fill-black" :width="5" :height="10" />
                    </span>
                </button>
                <!-- Home card images displayed in a loop -->
                <div id="containter-home-cards"
                class="containter-home-cards grid grid-flow-col md:grid-rows-1 w-full md:auto-cols-max overflow-x-scroll">
                <div :class="value.MENU_CLASS" v-for="(value, index) in banner_promotions"
                :key="index"
                data-analytics-label="promo:banner:mid"
                :data-analytics-context="`component:CardsImage|layout:layout-${appComponent.config.layout}`"
                :data-analytics-id="value.idValue"
                :data-analytics-position="index + 1"
                        class="flex justify-center items-center p-2 img-cont">
                        <RouterLink @click="appComponent.gAnalytics('promotion_interaction', value.MENU_TITLE)" :to="sourceType === 'promotions'
                            ? value.redirect
                            : value.MENU_URL" :id="value.idValue"
                            class="h-full border-solid border-2 border-primary rounded-lg">
                            <img :src="sourceType === 'promotions'
                                ? value.url
                                : value.MENU_IMG_URL" width="322" height="222" alt="Promociones de apuestas"
                                class="rounded-lg" />
                        </RouterLink>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <!-- Main section for home cards display -->
    <section v-if="
        appComponent.config.homePage_ !== undefined &&
        appComponent.config.homePage_.HomeCardImages !== undefined &&
        appComponent.config.homePage_.HomeCardImages.show !== undefined &&
        appComponent.config.homePage_.HomeCardImages.show
    " class="flex flex-col justify-center items-center w-full">
        <div class="w-11/12 z-50 max-w-[1300px]">
            <!-- Title for the promotions section -->
            <div class="in relative flex justify-between items-center mt-9">
                <div class="w-auto h-auto flex flex-col mb-4">
                    <div class="w-auto h-auto py-1 flex gap-3">
                        <!-- Conditional rendering of the icon -->
                        <img v-if="icon != undefined && icon != ''" :src=icon alt="" class="w-8 h-8 object-contain" />
                        <!-- Title of the section -->
                        <h3 class="uppercase font-bold text-xl mt-1 text-neutral" aria-label="Casino bets">
                            {{ $t('BONOS') }}
                        </h3>
                    </div>
                    <!-- Underline for the title -->
                    <div class="h-1 w-full rounded-full bg-accent"></div>
                </div>
                <!-- Navigation buttons for the carousel -->
                <div v-if="
                    config.layout == undefined ||
                    (config.layout != undefined && config.layout != 4)
                " class="flex gap-2" :class="config.layout != undefined && config.layout == 4
                    ? ' w-full justify-between px-3'
                    : ''
                    ">
                    <button class="cursor-pointer hover:scale-125" :class="'slidePrev' + keySlide">
                        <font-awesome-icon icon="fa-solid fa-angle-left"
                            class="text-neutral/50 text-2xl hover:text-neutral" />
                    </button>
                    <button class="cursor-pointer hover:scale-125" :class="'slideNext' + keySlide">
                        <font-awesome-icon icon="fa-solid fa-angle-right"
                            class="text-neutral/50 text-2xl hover:text-neutral" />
                    </button>
                </div>
            </div>
            <!-- Container for home card images, shown based on configuration -->
            <div id="containter-home-cards" class="containter-home-cards w-full overflow-x-scroll">
                <swiper-container :slides-per-view="appComponent.config.mobileL == '1' ? 'auto' : 3" :free-mode="true"
                    :autoplay="true" :autoplay-delay="5000" :autoplay-disable-on-interaction="true"
                    :autoplay-pause-on-mouse-enter="true" :mousewheel="true" :navigation="{
                        nextEl: '.slideNext' + keySlide,
                        prevEl: '.slidePrev' + keySlide,
                    }" :spaceBetween="12" :mousewheel-force-to-axis="true" :direction="'horizontal'"
                    class="w-[90vw] md:w-[90vw]">
                    <swiper-slide v-for="(value, index) in banner_promotions" :key="index"
                        class="w-[364px] h-[210px] tablet:w-[203px] tablet:h-[112px] desktop:w-[360px] desktop:h-[200px] max-w-[85vw] flex justify-center items-center overflow-hidden">

                        <RouterLink @click="appComponent.gAnalytics('promotion_interaction', value.MENU_TITLE)"
                            :to="sourceType === 'promotions' ? value.redirect : value.MENU_URL" :id="value.idValue">
                            <img :src="sourceType === 'promotions' ? value.url : value.MENU_IMG_URL" width="1160"
                                height="208" alt="Promociones de apuestas"
                                class="border-2 border-accent hover:border-accent-focus border-solid rounded-xl" />
                        </RouterLink>

                    </swiper-slide>

                </swiper-container>
            </div>
        </div>


    </section>
</template>
<style scoped>
/* Hide the scrollbar thumb for a cleaner look */
div::-webkit-scrollbar-thumb {
    display: none;
}
</style>

<!-- FILE DOCUMENTED -->

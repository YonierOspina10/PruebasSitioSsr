<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 */
export default defineComponent({
    /**
     * Component data function.
     * @returns {Object} The data object containing configuration and app component.
     */
    data() {
        // Retrieve configuration from the global context
        let config = this.$config();
        // Reference to the app component from the global context
        let appComponent: any = this.$appComponent;
        return {
            config,
            appComponent,
        };
    },

    /**
     * Lifecycle hook called after the component is mounted.
     */
    mounted() {},
    methods:{
        analyticsAttrs(label:string) {
            return {
                'data-analytics-label': label,
                'data-analytics-context': `component:PathNotFound|layout:layout-${this.appComponent.config.layout}`
            };
        },
    }
});
</script>
<template>
    <!-- Main wrapper for the home section -->
    <div
        id="home-wrapper"
        class="py-8"
    >
        <!-- Slider section, displayed if layout is not equal to 3 -->
        <div
            id="home-slider"
            v-if="appComponent.config.layout != 3"
        >
            <!-- Container for the home slider -->
            <div
                class="Container HomeSliderBox HomeHomeSliderBox flexslider"
                id="HomeSliderBox"
            >
                <!-- List of slides in the slider -->
                <ul
                    class="Container slides HomeSlider HomeHomeSlider"
                    id="HomeSlider"
                    role="navigation"
                    data-type="HomeSlider"
                >
                    <!-- Individual slide item -->
                    <li
                        style="text-align: center; display: block"
                        class="h-auto text-neutral"
                    >
                        <!-- Content of the slide -->
                        <div
                            class="Container SlideContent flex flex-col justify-center items-center gap-20"
                            itemprop="itemOffered"
                        >
                            <!-- Title of the slide -->
                            <span
                                style="text-align: center; font-size: 10em; line-height: 160px"
                                class="SlideTitle"
                                itemprop="name"
                                >404
                            </span>
                            <!-- Description of the slide -->
                            <p
                                style="text-align: center"
                                class="SlideText"
                                itemprop="description"
                            >
                                {{ $t('La página buscada no existe.') }}
                            </p>
                            <!-- Button linking to another page -->
                            <RouterLink
                                style="text-align: center"
                                target="_self"
                                to="/deportes"
                                v-bind="analyticsAttrs('menu:nav:sports')"
                                title="{{'Apuesta ya'}}"
                                class="button SlideButton btn btn-primary"
                                itemprop="url"
                            >
                                <span class="ButtonText text-white">{{ $t('Apuesta ya') }}</span>
                            </RouterLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Section displayed if layout is equal to 3 -->
        <section
            v-if="config.layout != undefined && config.layout == 3"
            class="w-full h-[710px] relative flex justify-center items-center"
        >
            <!-- Top gradient overlay -->
            <div class="w-full h-40 bg-gradient-to-b from-neutral-content to-transparent absolute -top-1"></div>
            <!-- Background image -->
            <img
                src="https://images.virtualsoft.tech/m/msjT1684245164.png"
                alt=""
                class="w-full h-full"
            />
            <!-- Bottom gradient overlay -->
            <div class="w-full h-72 bg-gradient-to-t from-neutral-content to-transparent absolute -bottom-16"></div>
            <!-- Main article container -->
            <article class="absolute w-full h-auto max-w-[1300px] mx-auto flex flex-col justify-center items-center">
                <!-- Content container with gradient background -->
                <div
                    class="h-72 w-11/12 lg:w-auto lg:h-full from-purple-700/50 to-primary/25 flex flex-col-reverse lg:flex-row justify-center items-center"
                >
                    <!-- Left content section -->
                    <div class="w-auto h-auto flex flex-col justify-center items-center gap-5">
                        <!-- Image container -->
                        <div class="h-28 lg:h-64 w-full lg:w-[450px] mt-0 lg:mt-20">
                            <img
                                src="https://images.virtualsoft.tech/m/msjT1684245229.png"
                                alt=""
                                class="number_notFound w-full h-full object-contain"
                            />
                        </div>
                        <!-- Text description -->
                        <p
                            class="h-16 lg:h-32 w-full text-center lg:text-3xl text-neutral flex justify-center items-center"
                        >
                            {{ $t('La página buscada no existe.') }}
                        </p>
                        <!-- Button linking to another page -->
                        <RouterLink
                            to="/deportes"
                            v-bind="analyticsAttrs('menu:nav:sports')"
                            class="bg-accent-focus hover:bg-accent-content hover:scale-105 h-16 w-52 rounded-xl text-xl text-neutral font-semibold shadow-xl flex justify-center items-center"
                            >{{ $t('Apuesta ya') }}</RouterLink
                        >
                    </div>
                    <!-- Right image section -->
                    <div
                        class="w-auto h-96 lg:h-[500px] pl-7 lg:pl-0 mb-5 lg:mb-0 flex justify-center items-end lg:items-center"
                    >
                        <img
                            src="https://images.virtualsoft.tech/m/msjT1684245196.png"
                            alt=""
                            class="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>
<style scoped>
/* Class for background effects with no transitions or animations */
.bg_effect {
    transition: none; /* No transition effects */
    animation: none; /* No animations applied */
    border: none; /* No border */
}

/* Keyframes for profile animation */
@keyframes profile__animate {
    0% {
        border-radius: 70% 40% 30% 40%/50% 30% 70% 40%; /* Initial border-radius */
    }
    50% {
        border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; /* Midpoint border-radius */
    }
    100% {
        border-radius: 70% 40% 30% 40%/50% 30% 70% 40%; /* Final border-radius */
    }
}

/* Class for number not found animation */
.number_notFound {
    animation: number 10s ease-in-out infinite; /* Infinite animation for not found numbers */
}

/* Keyframes for number animation */
@keyframes number {
    0% {
        scale: 1; /* Initial scale */
    }
    50% {
        scale: 1.15; /* Scale up */
        margin-left: 10px; /* Shift to the right */
    }
    100% {
        scale: 1; /* Return to initial scale */
    }
}

/* Media query for screens wider than 768px */
@media (min-width: 768px) {
    .bg_effect {
        transition: 2s; /* Apply transition effects */
        animation: profile__animate 10s ease-in-out infinite; /* Apply profile animation */
        border: solid 5px rgb(126, 34, 206, 0.5); /* Semi-transparent border */
    }
    .number_notFound {
        animation: none; /* Disable animation for number not found */
    }
}
</style>

<!-- FILE DOCUMENTED -->

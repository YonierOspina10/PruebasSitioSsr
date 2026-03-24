<template>
    <!-- Main section container with responsive layout and dynamic height based on app configuration -->
    <section
        class="h-full w-full p-4 flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-16 relative"
        :class="appComponent.config.name == 'Lotosports' ? 'md:h-[70vh]' : 'md:h-[80vh]'"
    >
        <!-- Background image for landing deposit, conditionally rendered based on app configuration -->
        <img
            v-if="
                appComponent.config.landingDeposit !== undefined &&
                appComponent.config.landingDeposit[appComponent.country] !== undefined &&
                appComponent.config.landingDeposit[appComponent.country].background !== undefined
            "
            :src="appComponent.config.landingDeposit[appComponent.country].background"
            alt="background-landing-deposit"
            class="absolute top-0 left-0 w-full h-full opacity-50 z-1"
        />
        <!-- Container for deposit methods -->
        <div
            id="methods"
            class="w-[95%] max-w-[700px] md:max-w-none lg:w-[57%] h-full z-10 animationLeft flex flex-col justify-center md:justify-start items-center gap-4"
        >
            <!-- Title for deposit section -->
            <span
                class="font-bold text-3xl text-primary text-center w-full border-b-2 border-primary h-12"
                :class="appComponent.config.name == 'Lotosports' ? 'mt-0 md:mt-20' : ''"
                >{{ $t('Depósitos') }}</span
            >
            <!-- Scrollable container for deposit methods -->
            <div class="w-full h-full overflow-y-auto scrollWidth">
                <methodsDeposit />
            </div>
        </div>
        <!-- Conditional container for additional image information -->
        <div
            v-if="
                appComponent.config.landingDeposit !== undefined &&
                appComponent.config.landingDeposit[appComponent.country] !== undefined &&
                appComponent.config.landingDeposit[appComponent.country].imgInfo !== undefined
            "
            class="imageRight w-[90%] md:w-[37%] animationRight z-10 h-full"
        >
            <!-- Button for duplicating initial deposit, visible on larger screens -->
            <span
                class="bg-gradient-to-b from-success to-[#2F6636] my-2 h-12 p-4 rounded-full text-neutral text-base md:text-xl hidden lg:flex justify-center items-center hover:scale-105 blob cursor-default border-success border-2"
            >
                {{ $t('Duplica tu depósito inicial') }}
            </span>
            <!-- Image for additional information -->
            <img
                :src="appComponent.config.landingDeposit[appComponent.country].imgInfo"
                alt=""
                class="aspect-square w-full h-auto animated-image object-contain object-center"
            />
            <!-- Button for duplicating initial deposit, visible on smaller screens -->
            <button
                @click="scrollDown()"
                class="bg-gradient-to-b from-success to-[#2F6636] my-2 h-12 p-4 rounded-full text-neutral text-xl md:text-base flex lg:hidden justify-center items-center hover:scale-105 blob cursor-default border-success border-2"
            >
                {{ $t('Duplica tu depósito inicial') }}
            </button>
        </div>
        <!-- Gradient background at the bottom of the section -->
        <div class="absolute -bottom-1 left-0 w-full bg-gradient-to-t from-neutral-content to-transparent h-96 z-1"></div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'; // Importing Vue's defineComponent for component definition
import methodsDeposit from '@/components/methodsDeposit.vue'; // Importing methodsDeposit component
import router from '@/router'; // Importing router for navigation

export default defineComponent({
    components: { methodsDeposit }, // Registering methodsDeposit component
    setup() {
        return {}; // Setup function returning an empty object
    },
    data() {
        // Initializing component data
        let config = this.$config(); // Fetching configuration
        let emitter = this.$emitter(); // Fetching event emitter
        let appComponent: any = this.$appComponent; // Fetching application component
        return {
            config,
            emitter,
            appComponent,
        };
    },
    beforeMount() {
        // Navigation logic before the component mounts
        const currentPath = this.$route.path; // Getting current route path
        if (
            this.appComponent.config.landingDeposit !== undefined &&
            this.appComponent.config.landingDeposit[this.appComponent.country] !== undefined &&
            this.appComponent.config.landingDeposit[this.appComponent.country].on !== undefined &&
            this.appComponent.config.landingDeposit[this.appComponent.country].on === true
        ) {
            // Conditional navigation based on landingDeposit configuration
            if (currentPath.includes('/landing/depositos-ecuador')) {
                if (this.appComponent.country !== 'ec') {
                    router.push('/landing/depositos'); // Redirecting to deposit page if country is not Ecuador
                }
            }
        } else {
            router.push('/home'); // Redirecting to home if landingDeposit is not enabled
        }
    },
    methods: {
        // Method to scroll down the page
        scrollDown() {
            (window as any).scrollTo(0, 360); // Scrolls to a specific position on the page
        },
    },
});
</script>
<style scoped>
.animated-image {
    object-fit: contain; /* Ensures the image maintains its aspect ratio */
    animation: pulse-animation 3s infinite; /* Applies pulse animation to the image */
}
@keyframes pulse-animation {
    0%,
    100% {
        transform: translate(-2px, -2px); /* Initial and final state of the animation */
    }
    50% {
        transform: translate(2px, 5px); /* Midpoint of the animation */
    }
}
.scrollWidth::-webkit-scrollbar {
    width: 0.2em; /* Custom scrollbar width */
    opacity: 0.5; /* Scrollbar opacity */
}
.animationLeft {
    animation: 250ms ease-in-out 0s 1 normal forwards running animationLeft; /* Animation for left entrance */
}
@keyframes animationLeft {
    0% {
        opacity: 0; /* Start with opacity 0 */
        transform: translateX(-200px); /* Start position off-screen to the left */
    }
    100% {
        opacity: 1; /* End with full opacity */
        transform: translateX(0px); /* End position at original place */
    }
}
.animationRight {
    animation: 250ms ease-in-out 0s 1 normal forwards running animationRight; /* Animation for right entrance */
}
@keyframes animationRight {
    0% {
        opacity: 0; /* Start with opacity 0 */
        transform: translateX(200px); /* Start position off-screen to the right */
    }
    100% {
        opacity: 1; /* End with full opacity */
        transform: translateX(0px); /* End position at original place */
    }
}
</style>

<!-- FILE DOCUMENTED -->

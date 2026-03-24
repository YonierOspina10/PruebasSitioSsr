<script lang="ts">
import { defineComponent } from 'vue'; // Importing the defineComponent function from Vue
import ExitIcon from '../icons/ExitIcon.vue'; // Importing the ExitIcon component

export default defineComponent({
    data() {
        // Initializing component data
        let config = this.$config(); // Fetching configuration data
        let emitter = this.$emitter(); // Fetching event emitter
        let appComponent: any = this.$appComponent; // Fetching application component reference
        let src: string = ''; // Initializing source string for iframe

        return {
            config, // Exposing config to the template
            emitter, // Exposing emitter to the template
            appComponent, // Exposing appComponent to the template
            src, // Exposing src to the template
        };
    },
    methods: {
        // Method to close the game and navigate to the appropriate route
        closeGame() {
            if (this.$route.path.indexOf('new-casino') != -1) {
                window.history.pushState('', '', '/new-casino'); // Navigate to new-casino
            } else {
                if (this.$route.path.indexOf('live-casino-vivo') != -1) {
                    window.history.pushState('', '', '/live-casino-vivo'); // Navigate to live-casino-vivo
                } else {
                    if (this.$route.path.indexOf('virtuales-lobby') != -1) {
                        window.history.pushState('', '', '/virtuales-lobby'); // Navigate to virtuales-lobby
                    }
                }
            }
        },
    },
    computed: {
        analyticsAttrs() {
            return {
                fullscreenToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:fullscreen`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                closeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:close`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                homeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:home`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
                refreshToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:refresh`,
                    'data-analytics-context': `component:ModalGames|layout:${this.appComponent.config.layout}`,
                },
            };
        }
    },
    components: { ExitIcon }, // Registering the ExitIcon component
});
</script>

<template>
    <!-- Main modal container for the game, displayed conditionally based on appComponent.showGame -->
    <div
        class="inModal fixed left-0 top-0 w-full h-full bg-base-300 flex justify-center items-center flex-col gap-2 px-2 sm:px-5 py-2"
        v-if="appComponent.showGame"
        style="z-index: 999999 !important"
        id="big-games"
    >
        <div class="w-full flex justify-between items-center"> <!-- Header section of the modal -->
            <img
                v-lazy="
                            config.logo_ != undefined &&
							config.logo_['dark'] != undefined &&
							config.logo_['light'] != undefined &&
							!appComponent.themeSportbook
								? config.logo_['dark']
								: config.logo_['light']
                "
                class="h-10"
            />
            <div class="h-full flex justify-center items-center gap-4"> <!-- Controls section -->
                <font-awesome-icon
                    v-if="config.casino.inGame.refresh"
                    icon="fa-solid fa-rotate-right"
                    size="1x"
                    class="text-neutral text-2xl cursor-pointer"
                    v-bind="analyticsAttrs.refreshToggle"
                    @click="appComponent.openGame(appComponent.gameSelected)"
                />
                <div
                    @click="
                        appComponent.showGame = false;
                        closeGame();
                    "
                    class="h-full flex justify-center items-center cursor-pointer"
                    v-bind="analyticsAttrs.closeToggle"
                >
                    <ExitIcon
                        :height="23"
                        :width="23"
                        :fill="'#ffffff'"
                        :fill2="'#ee3b3f'"
                    />
                </div>
                <div v-if="config.casino.inGame.home"> <!-- Conditional rendering for home icon -->
                    <a
                        title="home"
                        @click="appComponent.showGame = false"
                        v-bind="analyticsAttrs.homeToggle"
                        ><span class="icon-home1 text-neutral"></span
                    ></a>
                </div>
            </div>
        </div>
        <iframe
            id="game-content"
            number-of-window="1"
            aspect-ratio="16:9"
            :src="appComponent.src"
            class="w-[95vw] h-[95vh] rounded-xl m-auto"
            allow="clipboard-read; clipboard-write"
        ></iframe>
    </div>
</template>

<style scoped>
@keyframes circle-in-center {
    from {
        clip-path: circle(0%);
    }
    to {
        clip-path: circle(125%);
    }
}
/* Animation for modal appearance */
.inModal {
    animation: 2.5s cubic-bezier(0.25, 1, 0.3, 1) circle-in-center both;
}
</style>

<!-- FILE DOCUMENTED -->

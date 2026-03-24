<template>
    <!-- Main container for the game card with styling for full width and height -->
    <div
        class="w-full h-full rounded-xl bg-base-300 cursor-pointer"
        @click="handleOpenGame(game)"
        v-bind="attributesAnalytics"
    >
        <!-- Conditional rendering of the game icon if it exists -->
        <img
			v-if="
				game.icon_2 !== undefined &&
				game.icon_2 !== null &&
				game.icon_2 !== ''
			"
            :src="game.icon_2"
            alt=""
            class="h-[75%] w-full rounded-3xl hover:scale-105"
            :class="'object-' + game.object_fit"
        />
        <!-- Placeholder div if the game icon does not exist -->
		<div v-else class="h-[75%] w-full rounded-2xl" />
        <!-- Container for the game name and action button -->
		<div
			class="flex justify-between items-center w-full h-[25%] rounded-xl px-2"
		>
            <!-- Game name displayed in lowercase -->
			<p :title=game.name class="truncate text-xs text-neutral font-light capitalize w-full">
                {{ game.name.toLowerCase() }}
            </p>
            <!-- Button for an action (e.g., favorite) with an SVG icon -->
            <button
                class="flex items-center justify-center w-8 h-8 hover:scale-125 hover:fill-pri"
                @click.stop="toggleSaveToMyCasinoGames(game)"
            >
                                        <FavoriteIcon
                                            class="favorite-icon-view"
                                            :width="24"
                                            :height="16"
                                            :fill="game.fav ? '#FFDE00' : '#42413e'"
                                        ></FavoriteIcon>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { openGame } from '@/utils'; // Importing utility function to open a game
import { getCurrentInstance, onMounted, watch } from 'vue'; // Importing function to get the current Vue instance
import FavoriteIcon from '../icons/favoriteIcon.vue';
import { useFavoriteGames } from "@/composables/useFavoriteGames";

// Defining props for the component, expecting a 'game' object
const props = defineProps({
    game: Object,
    attributesAnalytics: Object,
});

// Getting the current instance of the component
const instance = getCurrentInstance();
// Accessing the global app component from the instance
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
const emitter = instance?.appContext.config.globalProperties.emitter;

// We inject appComponent and emitter to thse composable
const { toggleSaveToMyCasinoGames, getFavoriteGames } = useFavoriteGames(appComponent, emitter);

onMounted(() => {
  props.game.fav = appComponent.myListFavoriteGame.includes(props.game.id);
});
watch(
  () => appComponent.myListFavoriteGame,
  (newVal) => {
    props.game.fav = newVal.includes(props.game.id);
  },
   { deep: true }
);
// Function to handle opening the game when the card is clicked
const handleOpenGame = (game: any) => {
  openGame(game, appComponent);
};
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

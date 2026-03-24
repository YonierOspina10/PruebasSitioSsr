<template>
    <section
        class="w-full h-full mx-auto relative z-10"
        :class="maxWidthClass"
        aria-label="Casino games carousel "
    >
        <!-- Carousel games -->
        <CasinoGames
            v-if="gamesList.length > 0"
            :games="gamesList"
            :variant="data.variant"
            :title-icon="data.titleIcon"
            :top-label-icon="data.topLabelIcon"
            :icon-position="data.iconPosition"
            :title-underline="data.titleUnderline"
            :title-text="data.titleText"
            :nav-arrows="data.navArrows"
            :effect-hover-arrow="data.EffectHoverArrow"
            :show-top-label="data.showTopLabel"
            :show-button-more="data.showButtonOpenModal"
            :label-button-more="data.labelButtonOpenModal"
            :show-number="data.showNumber"
            :keyboard="data.keyboard"
            :mousewheel="data.mousewheel"
            :cover-shape="data.coverShape"
            :display-type="data.displayType"
            :slide-type="data.slideType"
            :grid-distribution="data.gridDistribution"
            :mixed-composition="data.mixedComposition"
            :enable-favorite-selection="data.enableFavoriteSelection"
            @favorite-game="(game: any) => toggleSaveToMyCasinoGames(game)"
            @select-game="(game: any) => selectGame(game)"
            @select-show-more="(ref: any) => handleCasinoGamesModal()"
            :analytics-attrs="analyticsAttrs"
        />
        <!--Games Modal  -->
        <div
            v-if="showCasinoGamesModal"
            class="in fixed top-0 right-0 bg-black/80 w-screen h-screen flex justify-center items-center z-[999]"
        >
            <CasinoGamesModal
                :gamesData="gamesData"
                :data="data"
                @close-modal="handleCasinoGamesModal"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
/*
 * @fileoverview Carouselcasino
 *
 * Carousel component for casino games using CasinoGames from
 * @tecnologia-general/virtualsoft-widgets library.
 * Fetches and displays casino games with navigation.
 *
 * @component CarouselCasino
 * @requires @tecnologia-general/virtualsoft-widgets
 */
// ============== IMPORTS ==============
import ApiService from '@/services/ApiService';
import { useGlobalStore } from '@/stores/global';
import { CasinoGames } from '@tecnologia-general/virtualsoft-widgets';
import CasinoGamesModal from './CasinoGamesModal.vue';
import { getCurrentInstance, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toKebabCase } from '@/utils';

// ============== SETUP & COMPOSABLES ==============

const route = useRoute();
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
const emitter = instance?.appContext.config.globalProperties.$emitter?.();
let storeCasinoLobby = useGlobalStore();

// ============== PROPS ==============

const { data } = defineProps(['data']);

// ============== STATE (Refs) ==============

const gamesList = ref([]);
const showCasinoGamesModal = ref(false);
let gamesData = null;
let favorites = [];
const config = (window as any).cconfig;

const getNames = appComponent.config.newCasino || {};

let category = 'getGames2';
if (data?.action && getNames[data.action]) {
    category = getNames[data.action];
}

// ============== COMPUTED ==============

// Max width class based on layout configuration
const maxWidthClass = computed(() => (config.layout_ === 8 ? 'max-w-[1112px]' : 'w-11/12 h-full max-w-[1200px]'));

// ============== METHODS ==============

const analyticsAttrs = {
    viewAll: {
        'data-analytics-label': `casino:carousel:${toKebabCase(category)}:view-all`,
        'data-analytics-context': `component:CarouselCasino|layout:${appComponent.config.layout}`
    },
    arrowPrev: {
        'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-prev`,
        'data-analytics-context': `component:CarouselCasino|layout:${appComponent.config.layout}`
    },
    arrowNext: {
        'data-analytics-label': `casino:carousel:${toKebabCase(category)}:arrow-next`,
        'data-analytics-context': `component:CarouselCasino|layout:${appComponent.config.layout}`
    },
    game: (game) => ({
        'data-analytics-id': `${game.id}`,
        'data-analytics-label': `casino:carousel:${toKebabCase(category)}:game`,
        'data-analytics-position': `${gamesList.value.findIndex((g) => g.id === game.id) + 1}`,
        'data-analytics-context': `provider:${toKebabCase(game.provider)}|category:${toKebabCase(category)}|component:CarouselCasino|layout:${appComponent.config.layout}`,
    })
};

async function getCasinoGames() {
    let optionsGames = {
        action: data.action ?? 'getGames2',
        partner_id: appComponent.partnerG,
        offset: data.offset ?? 0,
        typelobby: data.typelobby ?? '0',
        limit: data.limit ?? 25,
        category: 'all',
        provider: storeCasinoLobby.provider ?? 'all',
        country: appComponent.country,
        isMobile: appComponent.mobile == '1',
    };
    if (appComponent.session.logueado) {
        optionsGames['testUser'] = appComponent.session.user_test == 1;
        optionsGames['userId'] = appComponent.session.id_user;
        await getFavoriteGames();
    }
    // API request
    await ApiService.requestGet(
        appComponent.config.urlVirtualplayPython || 'https://casinogames.virtualsoft.bet',
        optionsGames,
    ).then((response: any) => {
        gamesData = response.data;
        gamesList.value = formatGameList(gamesData.games);
    });
}

function formatGameList(games) {
    return games.map((game, index) => ({
        id: String(game.id),
        name: game.name || '',
        icon: selectIcon(game, index),
        favorite: favorites.includes(String(game.id)),
        tag: game.tag || '',
        provider: game.provider || '',
    }));
}

function selectIcon(game, index) {
    //  mosaico style
    if (data.displayType === 'slide' && data.slideType === 'double' && data.gridDistribution === 'mosaic') {
        const useIcon2First = index % 4 === 3 || index % 4 === 0;

        return useIcon2First ? game.icon_2 || game.icon_3 || '' : game.icon_3 || game.icon_2 || '';
    }
    //  rect style
    if (data.coverShape === 'rect') {
        return game.icon_2 || game.icon_3 || '';
    }

    // Default
    return game.icon_3 || game.icon_2 || '';
}

function selectGame(game: any) {
    const gameSelected = gamesData.games.find((item) => Number(item.id) === Number(game.id));
    appComponent.openGame(gameSelected);
    appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {
        ...game,
        action: data.action,
    });
}

async function getFavoriteGames() {
    let params = {
        user_id: appComponent.session.usuario,
    };
    await ApiService.request('get_casino_favorite_ids', params).then((response: any) => {
        favorites = response.data.favorites;
    });
}

function handleCasinoGamesModal() {
    showCasinoGamesModal.value = !showCasinoGamesModal.value;
}

async function toggleSaveToMyCasinoGames(game) {
    if (appComponent.config.activeFavoritesWithBackend) {
        if (!appComponent.session.logueado) {
            appComponent.showModalLogin = true;
            return;
        }
        await setFavoriteGame(game);
        return;
    }

    // Local storage handling
    appComponent.favCasino = true;
    const index = appComponent.myCasinoGames.findIndex((g) => g.id === game.id);

    if (index === -1) {
        appComponent.myCasinoGames.push(game);
    } else {
        appComponent.myCasinoGames.splice(index, 1);
        if (appComponent.myCasinoGames.length === 0) {
            getCasinoGames();
            appComponent.favCasino = false;
        }
    }
    window.localStorage.setItem('m_c_g', JSON.stringify(appComponent.myCasinoGames));
}

async function setFavoriteGame(game: any) {
    const params = {
        user: appComponent.session.usuario,
        game_id: game.id,
        status: game.favorite ? 'I' : 'A',
    };

    try {
        const response = await ApiService.request('manage_favorite_games', params);

        if (response.code !== 0) {
            console.error('Failed to update favorite:', response);
            return;
        }

        const isFavorite = params.status === 'A';
        game.favorite = isFavorite;

        if (isFavorite) {
            if (!appComponent.myListFavoriteGame.includes(game.id)) {
                appComponent.myListFavoriteGame.push(game.id);
            }
        } else {
            appComponent.myListFavoriteGame = appComponent.myListFavoriteGame.filter((id) => id !== game.id);
        }
    } catch (error) {
        console.error('Error updating favorite game:', error);
    }
}

// ============== LIFE CYCLE ==============

onMounted(() => {
    getCasinoGames();
});
</script>

<style scoped></style>

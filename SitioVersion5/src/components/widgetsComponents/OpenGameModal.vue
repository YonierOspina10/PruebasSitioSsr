<template>
    <ModalOpenGame
        v-model="appComponent.showGame"
        :game-src="appComponent.src"
        :game-title="appComponent.gameSelected.name ?? ''"
        :related-games="relatedGames"
        :variant="1"
        :show-number="data.showNumber"
        @close="closeGame"
        @related-game-click="handleRelatedGameClick"
        @fullscreen-toggle="handleFullscreenToggle"
        @related-games-toggle="handleRelatedGamesToggle"
        :analytics-attrs="analyticsAttrs"
    />
</template>

<script lang="ts">
import { ModalOpenGame } from '@tecnologia-general/virtualsoft-widgets';
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import { analyticsSdk } from '@tecnologia-general/virtualsoft-analytics-sdk';
import { toKebabCase } from '@/utils';

export default defineComponent({
    components: { ModalOpenGame },
    data() {
        // Configuration and state variables for the component
        let appComponent: any = this.$appComponent;
        const data = appComponent.config.openGameModalWidget
            ? appComponent.config.openGameModalWidget
            : {};
        const relatedGamesInfo = data.relatedGames;
        const relatedGames = {
            ...relatedGamesInfo,
            games: [],
        };
        let gamesList = [];

        const isRelatedGamesOpen = appComponent.mobileL != '1';

        return {
            appComponent,
            relatedGames,
            data,
            gamesList,
            relatedGamesInfo,
            isRelatedGamesOpen
        };
    },
    mounted() {
        document.querySelector('body')!.style.overflow = 'hidden';
        // Fetch casino games when the component is mounted
        this.getCasinoGames();
    },
    unmounted() {
        document.querySelector('body')!.style.overflow = 'auto'; // Re-enable body scroll when component is unmounted
    },
    computed: {
        analyticsAttrs() {
            return {
                relatedGamesToggle: {
                    'data-analytics-id': `casino:sidebar:similar-games`,
                    'data-analytics-label': this.isRelatedGamesOpen
                        ? 'casino:sidebar:similar-games:toggle:open'
                        : 'casino:sidebar:similar-games:toggle:close'
                },
                fullscreenToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:fullscreen`,
                    'data-analytics-context': `component:OpenGameModal|layout:${this.appComponent.config.layout}`,
                },
                closeToggle: {
                    'data-analytics-id': `${this.appComponent.gameSelected.id}`,
                    'data-analytics-label': `casino:game-viewer:close`,
                    'data-analytics-context': `component:OpenGameModal|layout:${this.appComponent.config.layout}`,
                },
                game: (game: any) => ({
                    'data-analytics-id': `${game.id}`,
                    'data-analytics-label': `casino:sidebar:similar-games`,
                    'data-analytics-position': `${this.gamesList.findIndex((g) => g.id === game.id) + 1}`,
                    'data-analytics-context': `provider:${toKebabCase(game.provider)}|game:${toKebabCase(game.name)}|source:${toKebabCase(this.appComponent.gameSelected.name ?? this.appComponent.gameSelected.id)}|component:OpenGameModal|layout:${this.appComponent.config.layout}`,
                })
            };
        }
    },
    watch: {
        // Re-fetch when the selected game changes
        'appComponent.gameSelected.id': {
            immediate: false,
            handler(newId: any, oldId: any) {
                if (!newId || newId === oldId) return;
                // Optional: reset related games before fetching again
                if (this.relatedGames?.games) this.relatedGames.games = [];
                this.getCasinoGames();
            },
        },
    },
    methods: {
        // Fetch casino games based on user session and parameters
        async getCasinoGames() {
            let optionsGames = {
                action: this.relatedGamesInfo.games.action,
                partner_id: this.appComponent.partnerG,
                offset: 0,
                typelobby: this.relatedGamesInfo.games.typelobby,
                limit: this.relatedGamesInfo.games.limit,
                category: this.relatedGamesInfo.games.category,
                provider: this.relatedGamesInfo.games.provider,
                country: this.appComponent.country,
                isMobile: this.appComponent.mobile == '1',
                userId: this.appComponent.session.id_user,
                testUser: this.appComponent.session.user_test == 1,
                gameId: this.appComponent.gameSelected.id,
            };
            try {
                await apiService
                    .requestGet(
                        this.appComponent.config.urlVirtualplayPython
                            ? this.appComponent.config.urlVirtualplayPython
                            : 'https://gameservice.virtualsoft.tech/',
                        optionsGames,
                    )
                    .then((response: any) => {
                        this.gamesList = response.data.games;
                        this.gamesList.forEach((game) => {
                            this.relatedGames.games.push({
                                tag: game.TagImage,
                                name: game.name,
                                icon: game.icon_2 || game.icon_3,
                                id: game.id,
                                provider: game.provider,
                            });
                        });
                    });
            } catch (e) {
                console.log(e);
            }
        },
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
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        },
        handleRelatedGameClick(game) {
            const gameFind = this.gamesList.find((g) => g.id === game.id);
            this.appComponent.openGame(gameFind);
            this.appComponent.gAnalytics(this.$route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {
                ...game,
                action: this.relatedGamesInfo.games.action,
            });
            try {
                analyticsSdk.track({
                    element_section: this.$route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino',
                    element_action: 'click_button',
                    element_name: game.name,
                    element_id: game.id,
                    page_path: this.$route.path,
                    event_name: this.$route.path.includes('/live-casino-vivo') ? 'live' : 'casino' + '_' + this.appComponent.config.newCasino[this.relatedGamesInfo.games.action] ? this.appComponent.config.newCasino[this.relatedGamesInfo.games.action] : this.relatedGamesInfo.games.action,
                });
            } catch (e) {
                console.log('Analytics tracking failed:', e);
            }
        },
        handleFullscreenToggle(isFullScreen) {
            if (isFullScreen) {
                document.documentElement.requestFullscreen();
            } else if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        },
        handleRelatedGamesToggle(isOpen) {
            this.isRelatedGamesOpen = isOpen;
        },
    },
});

</script>

<style scoped>

</style>

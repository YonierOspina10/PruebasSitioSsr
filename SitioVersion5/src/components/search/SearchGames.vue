<template>
    <div class="flex justify-center items-center py-2">
        <div class="max-w-[1300px] w-11/12 px-4 text-neutral border-2 border-accent rounded-3xl bg-base-content flex items-center justify-center space-x-3">
        <MagnifyingGlass
				:height="20"
				:width="20"
                class="fill-accent-focus flex-shrink-0"
			/>
        <input
            type="text"
            class="w-full bg-transparent focus:outline-none focus:ring-0 border-none appearance-none rounded-3xl"
            placeholder="Buscar juegos"
            v-model="searchCommand.input"
            @input="debouncedInputSearch"
            @keyup.enter="searchEnter"
        />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import apiService from '@/services/ApiService';
import MagnifyingGlass from '../icons/MagnifyingGlass.vue';

declare var Ticker: any

export default defineComponent({
    components: {
        MagnifyingGlass
    },
    data() {
        let appComponent: any = this.$appComponent;
        return {
            debounceTimeout: null as any,
            searchCommand: {
                input: '',
            },
            appComponent
        };
    },
    methods: {
        debouncedInputSearch() {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                const input = this.searchCommand.input?.trim() ?? '';
                if (input.length >= 3) {
                    this.searchEnter();
                } else if (input.length === 0) {
                    this.restoreDefaultGames();
                }
            }, this.appComponent.config?.timeDebouncedSearch ?? 300);
        },

        searchEnter() {
            const input = this.searchCommand.input.trim();
            if (input.length < 3) return;

            this.appComponent.gamesList = [];

            const params = {
                action: 'getGames2',
                partner_id: this.appComponent.partnerG,
                search: input,
                country: this.appComponent.country,
                isMobile: this.appComponent.mobile === '1',
            };

            apiService
                .requestGet(this.appComponent.config.urlVirtualplay + '/cms/products/games/', params)
                .then((response: any) => {
                    const json = response.data;
                    this.appComponent.gamesList = json.games;
                    this.appComponent.total_count = json.total_count;
                    this.appComponent.offset = 0;
                    this.appComponent.limit = this.appComponent.limit;
                    this.appComponent.showLoadMoreButton = true;

                    this.handlePlaytechJackpots(json.games);

                    if (json.total_count === 0) {
                        this.appComponent.showLoadMoreButton = false;
                    }
                });
        },

        restoreDefaultGames() {
            // Reestablece el listado de juegos por defecto al limpiar el input
            this.searchCommand.input = '';
            this.appComponent.gamesList = [];
            this.appComponent.offset = 0;
            this.appComponent.total_count = 0;
            this.appComponent.limit = this.appComponent.limitConfig;
            this.appComponent.showLoadMoreButton = true;

            this.loadMoreGames();
        },

        loadMoreGames() {
            const vthis = this;
            vthis.appComponent.preloaderShow = true;

            const optionsGames: any = {
                action: 'getGames2',
                partner_id: vthis.appComponent.partnerG,
                offset: vthis.appComponent.offset,
                limit: vthis.appComponent.limit,
                country: vthis.appComponent.country,
                isMobile: vthis.appComponent.mobile === '1',
            };

            if (
                vthis.appComponent.selections.category.id &&
                vthis.appComponent.selections.category.id !== 'all'
            ) {
                optionsGames.category = vthis.appComponent.selections.category.id;
            }

            if (vthis.appComponent.providerId) {
                optionsGames.provider = vthis.appComponent.providerId;
            }

            apiService
                .requestGet(vthis.appComponent.config.urlVirtualplay + '/cms/products/games/', optionsGames)
                .then((response: any) => {
                    const json = response.data;
                    const games = json.games || [];

                    games.forEach((game: any) => {
                        vthis.appComponent.gamesList.push(game);
                    });

                    vthis.appComponent.offset = vthis.appComponent.gamesList.length;
                    vthis.appComponent.limit += vthis.appComponent.limitConfig;

                    if (vthis.appComponent.offset >= vthis.appComponent.total_count) {
                        vthis.appComponent.showLoadMoreButton = false;
                    }

                    vthis.handlePlaytechJackpots(vthis.appComponent.gamesList);

                    // Oculta preload
                    Array.from(document.getElementsByClassName('preload-game-bottom')).forEach((el) => {
                        (el as HTMLElement).style.display = 'none';
                    });
                });
        },

        handlePlaytechJackpots(games: any[]) {
            const configJackpot = this.appComponent.config?.casino?.playtechJackpot?.[this.appComponent.country];
            if (!configJackpot || !games?.length) return;

            const existingScript = document.querySelector(
                'script[src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"]'
            );
            if (existingScript) existingScript.remove();

            const script = document.createElement('script');
            script.src = 'https://tickers.playtech.com/jackpots/new_jackpotjs.js';
            script.onload = () => {
                games.forEach((game) => {
                    if (game.provider === 'PLAYTECH' && game.jackpot === 1) {
                        const obj = { ...configJackpot, game: game.front_game_id };
                        const ticker = new Ticker(obj);
                        ticker.attachToTextBox('playtech-' + game.id);
                        ticker.SetCurrencyPos('1');
                        ticker.tick();
                    }
                });
            };
            document.head.appendChild(script);
        },
    },
});
</script>

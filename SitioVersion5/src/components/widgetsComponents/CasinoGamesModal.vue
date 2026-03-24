<template>
    <article class="relative w-[90%] lg:w-[70%] h-[90%] p-2 md:p-4 bg-base-300 rounded-xl">
        <!-- Close button -->
        <button
            @click="closeModal()"
            class="absolute top-3 right-3 mx-auto hover:scale-105 z-[1000]"
        >
            <svg
                :width="30"
                :height="30"
                id="Capa_2"
                data-name="Capa 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24.94 24.94"
            >
                <circle
                    fill="#ffffff"
                    cx="12.47"
                    cy="12.47"
                    r="12.47"
                />
                <circle
                    fill="#ee3b3f"
                    cx="12.47"
                    cy="12.47"
                    r="10.66"
                />
                <path
                    fill="#ffffff"
                    d="m16.35,14.91l-2.35-2.35,2.35-2.35c.45-.45.44-1.17,0-1.61s-1.17-.45-1.61,0l-2.35,2.35-2.35-2.35c-.44-.44-1.17-.45-1.61,0s-.44,1.17,0,1.61l2.35,2.35-2.35,2.35c-.45.45-.44,1.17,0,1.61s1.17.45,1.61,0l2.35-2.35,2.35,2.35c.44.44,1.17.45,1.61,0s.44-1.17,0-1.61Z"
                />
            </svg>
        </button>
        <!-- Header -->
        <div class="in relative h-auto flex justify-center items-center w-full mb-4">
            <h2
                class="uppercase text-neutral font-bold text-2xl my-1"
                aria-label="Casino bets"
            >
                {{ $t(data.titleText) }}
            </h2>
            <div class="absolute w-20 h-1 bg-yellow-300 bottom-0 rounded-full"></div>
        </div>
        <!-- Display of loaded games -->
        <div class="gridList w-full h-[95%] overflow-y-auto">
            <div
                v-if="loading && !loadMoreGamesList.length"
                class="w-full gridList justify-center items-start gap-2"
            >
                <AnimatedPlaceholder
                    v-for="index in placeholdersCount"
                    :key="index"
                    class="aspect-square rounded-xl"
                />
            </div>

            <TransitionGroup
                class="grid"
                :css="true"
                @enter="onEnterLoadMore"
            >
                <button
                    v-for="(game, index) in loadMoreGamesList"
                    :key="index"
                    @click="selectGame(game)"
                    class="relative w-full h-full aspect-square rounded-xl"
                    ref="card"
                    :data-index="index"
                >
                    <img
                        v-show="game.icon_3"
                        :src="game.icon_3"
                        alt=""
                        :class="
                            'absolute top-0 w-full h-full rounded-xl z-20 hover:z-10' + ' object-' + game.object_fit
                        "
                    />

                    <div
                        class="z-10 hover:z-20 hover:bg-neutral/50 absolute top-0 flex flex-col justify-center items-center gap-4 w-full h-full aspect-square p-2 break-all rounded-xl"
                    >
                        <p
                            class="text-neutral text-xs xl:text-base font-bold max-w-[120px] h-auto flex justify-center items-center text-center break-words capitalize whitespace-pre-wrap"
                        >
                            {{ game.name.toLowerCase() }}
                        </p>
                        <button
                            class="w-full bg-accent-content text-neutral text-xs xl:text-base rounded-full font-bold p-2 uppercase hover:scale-105"
                            aria-label="Jugar ahora"
                        >
                            {{ $t('Jugar ahora') }}
                        </button>
                    </div>
                    <span
                        v-if="data.top"
                        class="absolute right-0 top-0 m-1 text-black text-sm font-bold pb-[1px] z-30 bg-yellow-300 w-9 h-9 rounded-full flex justify-center items-center"
                        >{{ $t('TOP') }}</span
                    >
                    <img
                        v-if="game.TagImage"
                        :src="game.TagImage"
                        width="60"
                        height="60"
                        :class="[
                            'absolute left-0 top-0',
                            'text-black text-sm font-bold',
                            'pb-[1px] z-30  w-[60px] h-[60px]',
                            'object-contain flex justify-center',
                            'items-center',
                        ]"
                        alt="Etiqueta"
                    />
                    <span
                        v-else-if="game.TagText"
                        :class="[
                            'absolute left-0 top-0 m-1 text-black',
                            'text-sm font-bold pb-[1px] z-30',
                            'w-auto h-auto flex justify-center items-center',
                            'max-w-2xl overflow-hidden',
                        ]"
                        v-html="game.TagText"
                    ></span>
                </button>
            </TransitionGroup>
            <!-- Skeleton loader for more games -->
            <AnimatedPlaceholder
                v-if="loading && loadMoreGamesList.length"
                v-for="index in placeholdersCount"
                :key="'more-' + index"
                class="aspect-square rounded-xl"
            />
            <!-- Load more button for additional games -->
            <div class="w-full flex justify-center items-center col-span-full">
                <button
                    v-if="showMore && !loading"
                    class="in btn-pyramid bg-accent-content hover:bg-accent-content/80 w-60 py-4 text-neutral font-semibold text-xl hover:scale-105 shadow-inner shadow-secondary mb-6"
                    @click="onLoadMore()"
                >
                    {{ $t('CARGAR MAS') }}
                </button>
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
// ============== IMPORTS ==============
import ApiService from '@/services/ApiService';
import { useGlobalStore } from '@/stores/global';
import { getCurrentInstance, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
import anime from 'animejs';

// ============== SETUP & COMPOSABLES ==============

const route = useRoute();
const instance = getCurrentInstance();
const appComponent = instance?.appContext.config.globalProperties.$appComponent;
const emitter = instance?.appContext.config.globalProperties.$emitter;

// ============== PROPS ==============

const props = defineProps<{
    data: any;
    gamesData: any;
}>();
// ============== EMITS  ==============

const emit = defineEmits<{
    closeModal: [];
}>();

// ============== STATE ==============

const loading = ref(true);
let loadMoreGamesList = ref<any[]>([]);
let startAnime = 0;
let totalGames = ref(0);
const currentOffset = ref(0);
const pageSize = ref(parseInt(props.data.limit) || 25);
const showMore = ref(false);
let storeCasinoLobby = useGlobalStore();

// ============== COMPUTED ==============

const placeholdersCount = computed(() => {
    const remaining = totalGames.value - loadMoreGamesList.value.length;
    const nextBatchSize = Math.min(pageSize.value, remaining);

    return nextBatchSize > 0 ? nextBatchSize : 0;
});

// ============== METHODS ==============

function getCasinoGames() {
    totalGames.value = props.gamesData?.total_count || 0;
    loadMoreGamesList.value = [...props.gamesData.games];
    currentOffset.value = loadMoreGamesList.value.length;
    showMore.value = loadMoreGamesList.value.length < totalGames.value;
    loading.value = false;
}

async function onLoadMore() {
    if (!showMore.value) return;
    loading.value = true;
    startAnime = 0;
    await getMoreGames();
    loading.value = false;
}

async function getMoreGames() {
    let optionsGames = {
        action: props.data.action ?? 'getGames2',
        partner_id: appComponent.partnerG,
        offset: currentOffset.value,
        typelobby: props.data.typelobby ?? '0',
        limit: pageSize.value,
        category: 'all',
        provider: storeCasinoLobby.provider ?? 'all',
        country: appComponent.country,
        isMobile: appComponent.mobile == '1',
    };
    if (appComponent.session.logueado) {
        optionsGames['testUser'] = appComponent.session.user_test == 1 ? true : false;
        optionsGames['userId'] = appComponent.session.id_user;
    }
    await ApiService.requestGet(
        appComponent.config.urlVirtualplayPython || 'https://gameservice.virtualsoft.tech/',
        optionsGames,
    ).then((response: any) => {
        const newGames = response.data.games;
        currentOffset.value += newGames.length;
        loadMoreGamesList.value = [...loadMoreGamesList.value, ...newGames];
        showMore.value = loadMoreGamesList.value.length < totalGames.value;
    });
}

function closeModal() {
    currentOffset.value = 0;
    showMore.value = false;
    startAnime = 0;
    loadMoreGamesList.value = [];
    emit('closeModal');
}

function onEnterLoadMore(el, done) {
    anime({
        targets: el,
        opacity: [0, 1],
        translateY: [-300, 0],
        easing: 'easeInOutQuart',
        delay: startAnime * 100,
        complete: done,
    });
    startAnime += 1;
}

function selectGame(game) {
    appComponent.openGame(game);
    appComponent.gAnalytics(route.path.includes('/live-casino-vivo') ? 'play_now_live' : 'play_casino', {
        ...game,
        action: props.data.action,
    });
}
// ============== LIFE CYCLE ==============

onMounted(() => {
    getCasinoGames();
});
</script>

<style  scoped>
/* Styles for swiper container */
swiper-container {
    width: 100%;
    height: 100%;
}
/* Styles for swiper slide */
swiper-slide {
    text-align: center;
    font-size: 18px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* Styles for individual swiper slide */
swiper-slide {
    display: block;
    width: 170px;
    height: 170px;
    aspect-ratio: 1 / 1;
    object-fit: contain;
}
/* Title styling */
.tittle {
    background: linear-gradient(180deg, #ffffff 0%, #c9c9c9 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    background-clip: text;
}
/* Load more button styling */
.loadMore {
    background: linear-gradient(180deg, #ffffff 10%, #c9c9c9 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    background-clip: text;
}
/* Grid list styling */
.gridList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    place-content: start;
    gap: 15px;
}
/* Responsive grid list styling */
@media (min-width: 768px) {
    .gridList {
        grid-template-columns: repeat(5, minmax(7rem, 1fr));
    }
}
</style>

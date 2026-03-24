<script setup lang="ts">
import { ref, onMounted, watch } from "vue"; // Importing Vue composition API functions
import { register } from 'swiper/element/bundle'; // Importing Swiper for carousel functionality
import { storeToRefs } from 'pinia'; // Importing Pinia for state management
import CardGame8 from "@/components/cards/CardGame8.vue"; // Importing CardGame8 component
import { useAppcomponentStore } from '@/stores/AppComponent'; // Importing AppComponent store
import apiService from "@/services/ApiService"; // Importing API service for network requests
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue'; // Importing placeholder component
import {useGlobalStore} from "@/stores/global"; // Importing global store
import { useCasinoStore } from '@/stores/casino' // Importing casino store
import {loadMoreGamesCasino} from "@/services/casino/loadMoreGamesCasino"; // Importing function to load more games
import Button from '@/components/buttons/Button.vue';
import { useFavoriteGames } from "@/composables/useFavoriteGames";
register(); // Registering Swiper elements

// Defining component props
const props = defineProps({
  component: {
    type: String,
    default: null,
    value: String,
  },
  value: String,
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  typelobby: String,
});

// Accessing app component store
const appComponent = useAppcomponentStore().appComponent;
const loadingLocal = ref(true); // Local loading state
const games = ref([]); // Array to hold game data
const storeCasinoLobby = useGlobalStore(); // Accessing global store
const casinoStore = useCasinoStore(); // Accessing casino store
const error = ref(null); // Error state
const dataEmpty = ref(false); // State to check if data is empty
const { providerSelect, categorySelect, offsetSelect, totalCountSelect } = storeToRefs(casinoStore); // Destructuring store references
const loadMoreButton = ref(true); // State to control load more button visibility
const notGames = ref(false); // State to check if there are no games

// Function to fetch games from the API
const getGames = async () => {
  loadingLocal.value = true; // Set loading state to true

  let localFavorites = JSON.parse(window.localStorage.getItem('m_c_g') || '[]');
  let favoriteIds = localFavorites.map((g: any) => g.id).join(',');


  let params: any = {
    action: props.data['action'],
    partner_id: appComponent?.partnerG ?? null,
    country: appComponent?.country ?? null,
    offset: 0,
    limit: props.data['limit'],
    typelobby: props.typelobby,
    isMobile: appComponent.mobile == '1',
  };

  if (categorySelect.value && categorySelect.value.id == 1811) {
    params.favorite = appComponent.myListFavoriteGame.join(',');
    } else {
    params.provider = providerSelect.value === null ? undefined : providerSelect.value?.name;
    params.category = categorySelect.value === null ? undefined : categorySelect.value?.id;
  }

  await apiService
  .requestGet(
    appComponent.config.urlVirtualplayPython ?? 'https://api2.virtualsoft.bet/',
    params
  )
  .then((response: any) => {
    games.value = response.data.games; // Assigning fetched games to the games array
      if (appComponent.myListFavoriteGame?.length) {
        games.value.forEach(game => {
          game.fav = appComponent.myListFavoriteGame.includes(game.id);
        });
      }
        loadingLocal.value = false; // Set loading state to false
        dataEmpty.value = games.value.length === 0; // Check if games array is empty
        casinoStore.setTotalCountSelect(response.data.total_count); // Update total count in store
        casinoStore.setOffsetSelect(props.data['limit']); // Update offset in store
  })
  .catch((err) => {
    error.value = err; // Capture error
        games.value = []; // Reset games array on error
        loadingLocal.value = false; // Set loading state to false
        dataEmpty.value = true; // Set data empty state to true
  });
}

// Function to load more games
const loadMoreGames = async () => {
  let optionsGames = {}; // Options for API request
  if (appComponent.session.logueado ) { // Check if user is logged in
    optionsGames = {
      action: props.data['action'],
      partner_id: appComponent?.partnerG ?? null,
      offset: offsetSelect.value === 0 ? 0 : offsetSelect.value,
      typelobby: props.typelobby,
      limit: props.data['limit'],
      provider: providerSelect.value === null ? undefined : providerSelect.value?.name,
      category: categorySelect.value === null ? undefined : categorySelect.value?.id,
      country: appComponent?.country ?? null,
      isMobile: appComponent.mobile == '1',
      userId: appComponent.session.id_user,
    };
  } else {
    optionsGames = {
      action: props.data['action'],
      partner_id: appComponent?.partnerG ?? null,
      offset: offsetSelect.value === 0 ? 0 : offsetSelect.value,
      typelobby: props.typelobby,
      limit: props.data['limit'],
      provider: providerSelect.value === null ? undefined : providerSelect.value?.name,
      category: categorySelect.value === null ? undefined : categorySelect.value?.id,
      country: appComponent?.country ?? null,
      isMobile: appComponent.mobile == '1',
    };
  }
  try {
    await apiService
        .requestGet(
            appComponent.config.urlVirtualplay + '/cms/products/games/',
            optionsGames,
        )
        .then((response: any) => {
          loadingLocal.value = false; // Set loading state to false
          response.data.games.forEach((game: any, index: number) => {
            games.value.push(game); // Add each game to the games array
          });
          let newOffset = parseInt(offsetSelect.value) + parseInt(props.data['limit']); // Calculate new offset
          casinoStore.setOffsetSelect(newOffset) // Update offset in store
        });
  } catch (e) {
    loadingLocal.value = false; // Set loading state to false on error
  }
}

// Lifecycle hook to fetch games on component mount
onMounted(() => {
  getGames()
})
const { getFavoriteGames } = useFavoriteGames(appComponent, appComponent?.emitter);
watch(
  () => appComponent.session.logueado,
  async (newVal, oldVal) => {
    if (
      newVal &&
      !oldVal &&
      appComponent.config.activeFavoritesWithBackend
    ) {
      await getFavoriteGames();
    }
  }
);
// Watchers to react to changes in selected provider and category
watch([providerSelect, categorySelect], () => {
  getGames();
});

// Watcher to manage load more button visibility based on total count
watch([totalCountSelect], () => {
  if(totalCountSelect.value <= props.data['limit'] || offsetSelect.value >= totalCountSelect.value) {
    loadMoreButton.value = false; // Hide load more button if conditions are met
  } else {
    loadMoreButton.value = true; // Show load more button
  }
  if(totalCountSelect.value == 0) {
    notGames.value = true; // Set no games state if total count is zero
  } else {
    notGames.value = false; // Reset no games state
  }
});
</script>

<template>
  <section class="w-full md:w-[80%] pt-10 px-10 md:p-10 text-neutral mx-auto"> <!-- Main container for the game section -->
    <h1 class="text-[20px] mb-6 font-poppinssl flex gap-[0.75rem] text-neutral"> <!-- Title of the section -->
      <img
          :src="props.data != undefined && props.data['icon'] != undefined
            ? props.data['icon']
            : ''
          "
          alt=""
          class="w-[19px] h-[19px] object-contain"
      />
      {{$t(props.data != undefined && props.data['title'] != undefined
          ? props.data['title']
          : ''
        )
      }} <!-- Title text -->
    </h1>
    <div
        v-if="loadingLocal"
        class="grid grid-cols-3 sm:grid-cols-6 gap-x-[2rem] gap-y-7 sm:gap-y-10 py-2"
    >
      <AnimatedPlaceholder
          v-for="index in 12"
          :key="index"
          class="h-24 sm:h-36 w-28 sm:w-48 rounded-xl bg-accent cursor-pointer"
      />
    </div>
    <div
        v-if="!loadingLocal"
        class="grid grid-cols-3 sm:grid-cols-6 gap-x-[2rem] gap-y-7 sm:gap-y-10 py-2"
    >
      <div
          class="h-24 sm:h-32 w-28 sm:w-40 rounded-xl bg-accent cursor-pointer"
          v-for="game in games"
      >
        <CardGame8 :game="game"/> <!-- Render CardGame8 component for each game -->
      </div>
    </div>
      <div v-if="!loadingLocal" class="w-full h-full flex justify-center items-center py-8">
          <Button
              v-if="loadMoreButton"
              type="button"
              :action="loadMoreGames">
              {{ $t('Más juegos') }}
          </Button>
      <div v-else-if="notGames" > <!-- Message when no games are available -->
        <p class="text-xl font-poppinssl font-poppinsm text-primary">
          {{$t('No hay juegos disponibles.')}} <!-- No games available message -->
        </p>
      </div>
    </div>
  </section>
</template>

<style>
</style>

<!-- FILE DOCUMENTED -->

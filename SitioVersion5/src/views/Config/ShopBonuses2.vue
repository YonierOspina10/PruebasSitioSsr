<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'; // Importing ArrowDownIcon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import BonuseCards from '@/components/BonuseCards.vue'; // Importing BonuseCards component
import ArrowBack from '@/components/icons/ArrowBack.vue'; // Importing ArrowBack component
import promotionsCategoryCards from '@/components/PromotionsCategoryCards.vue'; // Importing PromotionsCategoryCards component
import apiService from '@/services/ApiService';

export default defineComponent({
    computed: {
        // Computed property to return promotionsCategoryCards component
        promotionsCategoryCards() {
            return promotionsCategoryCards;
        },
    },
    components: {
        // Registering imported components for use in the template
        ArrowBack,
        ExitIcon,
        ArrowDownIcon,
        BonuseCards,
    },
    data() {
        // Data function returning component state variables
        let config: any = this.$config(); // Configuration object
        let appComponent: any = this.$appComponent; // Application component reference
        let emitter: any = this.$emitter(); // Event emitter
        let refreshBalance = this.$refreshBalance; // Function to refresh balance
        let skeleton: boolean = false; // Loading state
        let freeBets: any = []; // Array for free bets
        let physicalPrize: any = []; // Array for physical prizes
        let casinofreeSpins: any = []; // Array for casino free spins
        let liveCasino: any = []; // Array for casino free spins
        let onModal: boolean = false; // Modal visibility state
        let base64: string = ''; // Base64 string for data
        let base64Download: string = ''; // Base64 string for download
        let showModalPrint: boolean = false; // Print modal visibility state
        let title: string = ''; // Title for display
        let message: string = ''; // Message for display
        let bonusItem: any = {}; // Object for bonus item
        let loyalty: any = {}; // Object for loyalty information
        let bonusView: boolean = false; // Bonus view visibility state
        let titleViewBonus: string = ''; // Title for bonus view
        let bonus: object = []; // Array for bonuses
        let prize: any = { // Prize object with properties
            Id: '',
            City: '',
            BetShop: '',
        };
        return {
            // Returning data properties for the component
            config,
            appComponent,
            emitter,
            refreshBalance,
            freeBets,
            physicalPrize,
            casinofreeSpins,
            liveCasino,
            onModal,
            base64,
            base64Download,
            showModalPrint,
            title,
            message,
            bonusItem,
            loyalty,
            bonusView,
            titleViewBonus,
            bonus,
            skeleton,
            prize,
        };
    },
    unmounted() {}, // Lifecycle hook for cleanup when component is unmounted
    mounted() {
      this.initBonuses();
    }, // Lifecycle hook for initialization when component is mounted
  methods: {
        // Method to navigate to bonus view
        openViewBonus(category) {
            this.$router.push({
                name: 'shopBonusesCard', // Route name to navigate to
                params: { categoryId: category.id }, // Parameters for the route
            });
        },
    initBonuses() {
      this.skeleton = true;

      apiService
          .request('shop_bonuses', { Country: this.appComponent.country })
          .then((response) => {
            if (response.code == 0) {

              this.casinofreeSpins = [];
              this.freeBets = [];
              this.physicalPrize = [];
              this.liveCasino = [];

              response.data.forEach((bono) => {
                if (bono.category == 0) {
                  this.casinofreeSpins.push(bono);
                } else if (bono.category == 1) {
                  this.freeBets.push(bono);
                } else if (bono.category == 2) {
                  this.physicalPrize.push(bono);
                } else if (bono.category == 3) {
                  this.liveCasino.push(bono);
                }
              });

              const categorias =
                  this.config?.categoryBonosLoyalty_ ??
                  this.config?.categoryBonosLoyalty?.[this.appComponent.country] ??
                  [];

              categorias.forEach((category) => {
                if (category.id == 1) {
                  category.awards = this.freeBets;
                } else if (category.id == 2) {
                  category.awards = this.physicalPrize;
                } else if (category.id == 3) {
                  category.awards = this.casinofreeSpins;
                } else if (category.id == 4) {
                  category.awards = this.liveCasino;
                }
              });
              this.appComponent.shopBonusesLoaded = true;
              this.appComponent.shopBonusesData = {
                freeBets: this.freeBets,
                casinofreeSpins: this.casinofreeSpins,
                physicalPrize: this.physicalPrize,
                liveCasino: this.liveCasino,
              };

              this.skeleton = false;
            }
          });
    },
  },
});
</script>
<template>
    <!-- Main container for the component -->
    <div class="relative w-full h-full flex flex-col justify-center items-center">
        <!-- Background image container -->
        <div class="absolute in top-0 w-full h-full z-0">
            <!-- Background image source from config -->
            <img
                v-if="config != undefined && config.shopBonuses != undefined && config.shopBonuses.bg != undefined"
                :src="config.shopBonuses.bg"
                alt=""
                class="w-full h-full object-cover object-center"
            />
            <!-- Default background image -->
            <img
                v-else
                src="https://images.virtualsoft.tech/m/msj0212T1750269067.png"
                alt=""
                class="w-full h-full object-cover object-center"
            />
        </div>
        <!-- Main content container -->
        <div class="w-full flex flex-col justify-center items-center gap-16 z-10 max-w-[1300px] my-24">
            <div class="w-[80vw] flex flex-col gap-8 items-center justify-center">
                <h2
                    class="bg-gradient-to-r from-base-300/40 from-10% via-base-300 via-50% to-base-300/40 to-90% max-w-[500px] text-neutral w-full h-10 sm:h-14 flex justify-center items-center font-bold text-xl sm:text-2xl"
                >
                    {{ $t('Tienda de premios') }} <!-- Title for the prize shop -->
                </h2>
            </div>
            <!-- Container for categories -->
            <div class="flex flex-wrap gap-10 items-center justify-center">
              <article
                  v-for="category in (config != undefined && config.categoryBonosLoyalty_ != undefined
                        ? config.categoryBonosLoyalty_
                        : config != undefined &&
                            config.categoryBonosLoyalty != undefined &&
                            config.categoryBonosLoyalty[appComponent.country] != undefined
                          ? config.categoryBonosLoyalty[appComponent.country]
                          : []
                    ).filter((category) =>
                        appComponent.casinoEnabled && appComponent.virtualesEnabled && appComponent.liveCasinoEnabled
                            ? true
                            : category.id !== 3,
                    )
                    .filter(category => category.isActive === true)
                    .filter(category => category.awards && category.awards.length > 0)
                    .sort((a, b) => a.order - b.order)"
                  :key="category.id"
                  :class="['in w-[300px] flex flex-col items-center gap-4', { hidden: category.image === '' }]"
              >
                    <div
                        @click="openViewBonus(category)"
                        class="w-full min-h-[370px] flex flex-col justify-center items-center"
                        :class="{
                            'hover:scale-[1.03] cursor-pointer': category.awards?.length != 0,
                            'opacity-50': category.awards?.length == 0,
                            'container-loading': skeleton,
                        }"
                    >
                        <div
                            v-if="!skeleton && category.image != ''"
                            class="h-auto w-full text-info text-lg font-bold bg-success flex justify-center items-center rounded-t-2xl p-2"
                        >
                           <span>{{ $t(category.categoryName) }}</span><!-- Category title -->
                        </div>
                        <div
                            v-if="!skeleton && category.image != ''"
                            class="w-[300px] h-[280px] flex justify-center items-center relative"
                        >
                            <img
                                v-if="!skeleton"
                                :src="category.image"
                                alt=""
                                class="w-full h-full max-w-full max-h-full object-cover"
                            />
                            <div
                                v-if="skeleton"
                                class="conten-loading"
                            ></div>
                        </div>
                        <div
                            v-if="!skeleton"
                            class="h-auto w-full text-info-text bg-base-200 text-lg flex font-poppinssl justify-center items-center text-center rounded-b-2xl p-2"
                        >
                            <span>{{ $t('Ver más') }}</span> <!-- Button to view more -->
                        </div>
                    </div>
                    <div
                        v-if="!skeleton && category.textHTML && category.textHTML.trim() !== ''"
                        class="h-auto w-full flex flex-col justify-around items-start px-4 text-info-text text-lg bg-base-200 border-3 border-success shadow-[0px_0px_12px] shadow-success"
                        :class="category.open ? 'rounded-3xl' : 'rounded-full'"
                    >
                        <div
                            @click="() => (category.open = !category.open)"
                            class="w-full flex justify-around h-full p-3"
                        >
                            <span
                                class="flex-initial font-bold"
                                >{{
                                    $t('Escoge tu premio')
                                }}</span
                            >
                            <arrow-down-icon
                                :width="20"
                                :class="{
                                    'rotate-180 transition-all ease-in-out duration-300 ':
                                        category.open,
                                }"
                                class="fill-info-text flex-none"
                            />
                        </div>

                        <div
                            v-if="category.open && category.textHTML && category.textHTML.trim() !== ''"
                            @click="openViewBonus(category)"
                            class="flex justify-center items-center w-full py-2 cursor-pointer"
                            v-html="category.textHTML"
                        ></div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>

<!-- FILE DOCUMENTED -->

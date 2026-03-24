<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'; // Importing ArrowDownIcon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import BonuseCardsV2 from '@/components/BonuseCardsV2.vue'; // Importing BonuseCards component
import ArrowBack from '@/components/icons/ArrowBack.vue'; // Importing ArrowBack component
import promotionsCategoryCards from '@/components/PromotionsCategoryCards.vue'; // Importing PromotionsCategoryCards component
import IconArrow2 from '@/components/icons/IconArrow2.vue';
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
        BonuseCardsV2,
        IconArrow2
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
    unmounted() { }, // Lifecycle hook for cleanup when component is unmounted
    mounted() { }, // Lifecycle hook for actions after component is mounted
    methods: {
        // Method to navigate to bonus view
        openViewBonus(category) {
            this.$router.push({
                name: 'shopBonusesCardV2', // Route name to navigate to
                params: { categoryId: category.id }, // Parameters for the route
            });
        },
    },
});
</script>
<template>
    <!-- Main container for the component -->
    <div class="relative w-full h-full flex flex-col justify-center items-center">
        <!-- Main content container -->
        <div class="w-full flex flex-col justify-center items-center gap-4 z-10 my-4">
            <div class="w-[80vw] flex flex-col gap-4 items-center justify-center">
                <h2
                    class="text-neutral w-full flex justify-center items-center font-semibold">
                    {{ $t('Canjea desde s/4 hasta s/2,000 en apuestas deportivas o de casino.') }} <!-- Title for the prize shop -->
                </h2>
            </div>
            <!-- Container for categories -->
            <div class="flex flex-wrap gap-10 items-center justify-center">
                <article v-if="
                    (config != undefined && config.categoryBonosLoyalty != undefined) ||
                    (config != undefined && config.categoryBonosLoyalty_ != undefined)
                " v-for="category in (config != undefined && config.categoryBonosLoyalty_ != undefined
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
                )" :key="category.id"
                    :class="['in w-[300px] flex flex-col items-center gap-4', { hidden: category.image === '' }]">
                    <div @click="openViewBonus(category)"
                        class="w-full min-h-[370px] flex flex-col justify-center items-center" :class="{
                            'hover:scale-[1.03] cursor-pointer': category.awards?.length != 0,
                            'opacity-50': category.awards?.length == 0,
                            'container-loading': skeleton,
                        }">
                        <div v-if="!skeleton && category.image != ''"
                            class="h-auto w-full text-info text-lg font-bold bg-success flex justify-center items-center rounded-t-2xl p-2">
                            <span>{{ $t(category.title) }}</span> <!-- Category title -->
                        </div>
                        <div v-if="!skeleton && category.image != ''"
                            class="w-[300px] h-[280px] flex justify-center items-center relative border-1 border-neutral rounded-full">

                            <!-- Imagen -->
                            <img v-if="!skeleton" :src="category.image" alt=""
                                class="w-full h-full max-w-full max-h-full object-cover rounded-b-2xl" />

                            <!-- Botón sobre la imagen -->
                            <div v-if="!skeleton" class="absolute bottom-4 left-1/2 -translate-x-1/2
               bg-secondary text-info-text text-lg font-poppinssl
               px-4 py-2 rounded-xl shadow-lg
               flex justify-center items-center cursor-pointer">
                                <span class="flex items-center font-semibold">{{ $t('Ver más') }} 
                                    <IconArrow2 width="16" height="16" class="fill-neutral rotate-180"/>
                                </span>
                            </div>

                            <div v-if="skeleton" class="conten-loading"></div>
                        </div>


                    </div>

                </article>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

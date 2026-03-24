<script lang="ts">
import { defineComponent } from 'vue'; // Importing defineComponent from Vue for component definition
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'; // Importing ArrowDownIcon component
import ExitIcon from '@/components/icons/ExitIcon.vue'; // Importing ExitIcon component
import BonuseCardsV3 from '@/components/BonuseCardsV3.vue'; // Importing BonuseCardsV3 component
import ArrowBack from '@/components/icons/ArrowBack.vue'; // Importing ArrowBack component
import promotionsCategoryCards from '@/components/PromotionsCategoryCards.vue'; // Importing PromotionsCategoryCards component
import apiService from '@/services/ApiService'; // Importing the API service for making requests
import FunnelIcon from '@/components/icons/FunnelIcon.vue';

export default defineComponent({
    computed: {
        promotionsCategoryCards() {
            return promotionsCategoryCards;
        },

        filteredBonuses() {
            if (this.selectedCategory === 'all') return this.bonuses || [];

            const sel = Number(this.selectedCategory);

            // Mapeo API -> ID del select/config (ajusta si cambia la convención)
            const apiToSelectMap: Record<number, number> = {
                0: 3, // API 0 (Casino) => Select 3
                1: 1, // API 1 (Deportivas) => Select 1
                2: 2, // API 2 (Físicos) => Select 2
                // añade más si la API puede traer otros valores
            };

            return (this.bonuses || []).filter(bonus => {
                const apiCat = bonus.category ?? bonus.categoryId ?? null;
                const normalized = apiCat in apiToSelectMap ? apiToSelectMap[apiCat] : apiCat;
                return Number(normalized) === sel;
            });
        }
    },

    components: {
        // Registering imported components for use in the template
        ArrowBack,
        ExitIcon,
        ArrowDownIcon,
        BonuseCardsV3,
        FunnelIcon
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
        let bonuses: any[] = [];
        let categories: any[] = [];
        let selectedCategory: string | number = 'all';

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
            bonuses,
            categories,
            selectedCategory,
        };
    },
    unmounted() { }, // Lifecycle hook for cleanup when component is unmounted
    created() {
        this.initShopBonuses();
        this.loadCategories();

    },

    methods: {
        // Method to navigate to bonus view
        openViewBonus(category) {
            this.$router.push({
                name: 'shopBonusesCard', // Route name to navigate to
                params: { categoryId: category.id }, // Parameters for the route
            });
        },
        initShopBonuses() {
            console.log("INIT SE EJECUTO")
            apiService
                .request('shop_bonuses', { Country: this.appComponent.country })
                .then((response: any) => {
                    console.log("BONUS RECIBIDOS:", response.data)

                    if (response.code === 0) {
                        this.bonuses = response.data;
                        console.log("BONUSES GUARDADOS:", this.bonuses)
                    }
                });
        },
        loadCategories() {
            let cfg = this.config;

            if (!cfg) return;

            // Prioridad como en el template original
            if (cfg.categoryBonosLoyalty_) {
                this.categories = cfg.categoryBonosLoyalty_;
            } else if (
                cfg.categoryBonosLoyalty &&
                cfg.categoryBonosLoyalty[this.appComponent.country]
            ) {
                this.categories =
                    cfg.categoryBonosLoyalty[this.appComponent.country];
            } else {
                this.categories = [];
            }
        }



    },
});
</script>
<template>
    <!-- Main container for the component -->
    <div class="relative w-full h-full flex flex-col p-4">
        <!-- Main content container -->
        <div class="w-full flex flex-col items-start p-4 gap-4 z-10 max-w-[1300px]">
            <div class="w-full flex flex-col ">
                <h2 class="text-neutral w-full flex justify-start font-semibold">
                    {{ $t('Revisa los premios que has desbloqueado y reclama lo que es tuyo. ¡Tus recompensas te están esperando!') }}
                </h2>
            </div>
            <!-- Filtro por tipo -->
            <div class="flex flex-col w-full md:w-[15rem]">
                <label class="text-sm text-neutral">Tipo de transacción</label>

                <div class="relative">
                    <FunnelIcon
                        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral w-5 h-5" />
                    <select v-model="selectedCategory"
                        class="border rounded-full pl-10 pr-4 py-1 bg-base-200 text-neutral w-full">
                        <option value="all">Todos</option>

                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                            {{ $t(cat.title) }}
                        </option>
                    </select>
                </div>
            </div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
    <BonuseCardsV3 :bonuses="filteredBonuses" />
</div>


        </div>
    </div>
</template>
<style scoped></style>

<!-- FILE DOCUMENTED -->

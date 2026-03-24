<template>
  <div class="w-full flex flex-col gap-10 my-10">
    <h3
      class="relative md:text-2xl text-neutral mb-4 cursor-pointer select-none flex items-center justify-center border border-neutral rounded-xl py-2 backdrop-blur-sm bg-transparent/5"
      @click="showTables = !showTables">
      <!-- Texto siempre centrado -->
      <span>Descubre cómo acumulas puntos en DoradoClub</span>

      <!-- Icono alineado a la derecha -->
      <iconArrow2 width="16" height="16" :class="[
        'fill-neutral absolute right-4 transition-transform',
        showTables ? 'rotate-90' : '-rotate-90'
      ]" />
    </h3>


    <div v-if="showTables" class="overflow-x-auto">
      <div class="flex flex-col gap-6 min-w-[800px]">
        <!-- DEPORTES -->
        <LoyaltyTable :title="$t('DEPORTES')" :rows="sportsRows" :loyalty="loyalty"
          :goldIcon="loyaltyConfig.currencyIcon" :greenUpIcon="commonIcons.greenUpIcon" :hasSub="true"
          class="flex-shrink-0 w-full md:w-auto" />

        <!-- CASINO -->
        <LoyaltyTable :title="$t('CASINO')" :rows="casinoRows" :loyalty="loyalty" :goldIcon="loyaltyConfig.currencyIcon"
          :greenUpIcon="commonIcons.greenUpIcon" :hasSub="false" class="flex-shrink-0 w-full md:w-auto" />

        <!-- VIRTUALES -->
        <LoyaltyTable :title="$t('VIRTUALES')" :rows="virtualRows" :loyalty="loyalty"
          :goldIcon="loyaltyConfig.currencyIcon" :greenUpIcon="commonIcons.greenUpIcon" :hasSub="false"
          class="flex-shrink-0 w-full md:w-auto" />
      </div>
    </div>

    <!-- GLOSARIO -->
    <div class="w-full px-6 mt-8 place-items-center">
      <h3 class="text-xl font-semibold text-info mb-4">Glosario</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-neutral text-sm">

        <!-- Apuesta sencilla -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.diamontBlue" />
          <p>Apuesta sencilla.</p>
        </div>

        <!-- Apuesta combinada 10 / 20 -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.diamontRed" />
          <p>Apuesta combinada de hasta 10 - 20.</p>
        </div>

        <!-- Apuesta combinada hasta 9 -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.diamontGreen" />
          <p>Apuesta combinada hasta 9.</p>
        </div>

        <!-- Casino en vivo -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.casinoIcon" />
          <p>Apuesta Casino en vivo.</p>
        </div>

        <!-- Historial -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.history" />
          <p>Historial de puntos.</p>
        </div>

        <!-- Suma de puntos -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.greenUpIcon" />
          <p>Suma de puntos.</p>
        </div>

        <!-- Puntos redimidos -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.redDownIcon" />
          <p>Puntos redimidos.</p>
        </div>

        <!-- Puntos expirados -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.redDownIcon" />
          <p>Puntos expirados.</p>
        </div>

        <!-- Slots / Tragamonedas -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="commonIcons.boomIcon" />
          <p>Apuesta en Casino Slot / Tragamonedas.</p>
        </div>

        <!-- Dinero apostado -->
        <div class="flex items-center gap-3">
          <img class="w-8" :src="loyaltyConfig.currencyIcon" />
          <p>Dinero apostado.</p>
        </div>

      </div>
    </div>


  </div>
</template>
<script>
import LoyaltyTable from "@/components/LoyaltyTable.vue"; // Import the LoyaltyTable component
import IconArrow2 from "./icons/IconArrow2.vue"; // Import an arrow icon component

export default {
  data() { // Local reactive state for the component
    return {
      showTables: true, // Controls whether tables are visible
    };
  },

  name: "LoyaltyInfo", // Component name

  components: { LoyaltyTable, IconArrow2 }, // Components used inside this one

  props: {
    loyalty: { // Incoming loyalty configuration object
      type: Object,
      default: () => ({}) // Default to empty object
    }
  },

  computed: {
    appComponent() { // Access global component config injected as $appComponent
      return this.$appComponent;
    },

    loyaltyConfig() { // Extract the loyaltyProgramView config
      return this.appComponent?.config?.loyaltyProgramView || {};
    },

    commonIcons() { // Extract reusable icon set
      return this.loyaltyConfig.commonIcons || {};
    },

    sportsRows() { // Build table rows for sports betting rules
      return [
        { title: "Apuesta", sub: "Sencilla", logo: this.commonIcons.diamontBlue, amount: this.loyalty.SimpleBet },
        { title: "Apuesta", sub: "Combinada de 2", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet2 },
        { title: "Apuesta", sub: "Combinada de 3", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet3 },
        { title: "Apuesta", sub: "Combinada de 4", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet4 },
        { title: "Apuesta", sub: "Combinada de 5", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet5 },
        { title: "Apuesta", sub: "Combinada de 6", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet6 },
        { title: "Apuesta", sub: "Combinada de 7", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet7 },
        { title: "Apuesta", sub: "Combinada de 8", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet8 },
        { title: "Apuesta", sub: "Combinada de 9", logo: this.commonIcons.diamontGreen, amount: this.loyalty.CombinationBet9 },
        { title: "Apuesta", sub: "Combinada de 10", logo: this.commonIcons.diamontRed, amount: this.loyalty.CombinationBet10 },
      ];
    },

    casinoRows() { // Build table rows for casino categories
      return [
        { sub: "Casino Slots / Tragamonedas", logo: this.commonIcons.boomIcon, amount: this.loyalty.Casino },
        { sub: "Casino en vivo", logo: this.commonIcons.boomIcon, amount: this.loyalty.CasinoLive },
      ];
    },

    virtualRows() { // Build table rows for virtual games
      return [
        { sub: "Apuestas Virtuales", logo: this.commonIcons.boomIcon, amount: this.loyalty.Virtuals },
      ];
    },
  },
};
</script>

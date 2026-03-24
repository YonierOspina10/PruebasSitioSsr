<template>
  <div class="w-full flex flex-col my-4 items-center">

    <!-- TÍTULO -->
    <h3
      class="w-[90%] relative md:text-xl text-neutral cursor-pointer select-none flex justify-start border border-neutral rounded-xl p-2 backdrop-blur-sm bg-transparent/5 items-center"
      @click="showTables = !showTables">
      <img src="https://images.virtualsoft.tech/ms/msj0212T1764436076.png" class="mx-2" alt="">
      <span>Descubre todas las <strong class="text-primary">alternativas</strong>  para <strong class="text-primary">acumular puntos</strong> </span>

      <iconArrow2 width="16" height="16" :class="[
        'fill-neutral absolute right-4 transition-transform',
        showTables ? 'rotate-90' : '-rotate-90'
      ]" />
    </h3>

<!-- TARJETAS -->
<div v-if="showTables" class="w-full overflow-x-auto py-4">
  <div class="flex flex-wrap justify-center gap-6 w-[80%] mx-auto">

    <!-- Tarjeta dinámica -->
    <div
      v-for="item in combinedList"
      :key="item.key"
      class="bg-gradient-to-b from-neutral/20 to-neutral/5 rounded-xl px-4 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:basis-[calc((100%-6rem)/5)] flex-shrink-0"
    >
      <p class="text-neutral font-semibold mb-2">
        {{ item.label }}
      </p>

      <div
        class="flex items-center justify-center gap-2 bg-gradient-to-b from-neutral/20 to-neutral/5t px-3 py-2 rounded-full border border-neutral/40"
      >
        <span class="text-neutral font-bold">{{ loyalty.BasePoints }} Puntos</span>
        <img :src="currencyIcon" alt="coin" class="w-5 h-5" />
      </div>

      <p class="text-yellow-500 mt-2 text-sm">
        {{ item.usd }}
      </p>
    </div>

  </div>
</div>


  </div>
</template>


<script>
import IconArrow2 from "./icons/IconArrow2.vue";

export default {
  name: "LoyaltyInfo",
  components: { IconArrow2 },

  props: {
    loyalty: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      showTables: true
    };
  },

  computed: {
    appComponent() {
      return this.$appComponent;
    },

    currencyIcon() {
      return this.appComponent?.config?.loyaltyProgramView?.currencyIcon || "";
    },

    combinedList() {
      return [
        { label: "Sencillo", key: "SimpleBet", usd: this.loyalty.SimpleBet },

        { label: "Combinado 2", key: "CombinationBet2", usd: this.loyalty.CombinationBet2 },
        { label: "Combinado 3", key: "CombinationBet3", usd: this.loyalty.CombinationBet3 },
        { label: "Combinado 4", key: "CombinationBet4", usd: this.loyalty.CombinationBet4 },
        { label: "Combinado 5", key: "CombinationBet5", usd: this.loyalty.CombinationBet5 },
        { label: "Combinado 6", key: "CombinationBet6", usd: this.loyalty.CombinationBet6 },
        { label: "Combinado 7", key: "CombinationBet7", usd: this.loyalty.CombinationBet7 },
        { label: "Combinado 8", key: "CombinationBet8", usd: this.loyalty.CombinationBet8 },
        { label: "Combinado 9", key: "CombinationBet9", usd: this.loyalty.CombinationBet9 },
        { label: "Combinado 10", key: "CombinationBet10", usd: this.loyalty.CombinationBet10 },

        { label: "Casino Slots", key: "Casino", usd: this.loyalty.Casino },
        { label: "Casino en vivo", key: "CasinoLive", usd: this.loyalty.CasinoLive },
        { label: "Virtuales", key: "Virtuals", usd: this.loyalty.Virtuals }
      ].filter(item => item.usd !== undefined);
    }
  }
};
</script>
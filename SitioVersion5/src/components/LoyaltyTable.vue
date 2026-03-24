<template>
  <div class="w-full flex flex-col justify-center items-center gap-6">

    <h3 class="titles in w-[75%] lg:w-[30%] h-12 flex justify-center items-center 
      text-2xl font-semibold text-neutral">
      {{ title }}
    </h3>

    <div class="w-full overflow-x-auto px-6">
    <table class="w-full text-center border-collapse table-fixed mx-auto">
            
        <thead class="text-neutral/80 text-sm border-b border-neutral/30">
        <tr>
            <th class="py-3 text-left ">Tipo de apuesta</th>
            <th class="py-3 text-center">Moneda</th>
            <th class="py-3 text-center">Monto requerido</th>
            <th class="py-3 text-center">Acumula puntos</th>
            <th class="py-3 text-center">Punto base</th>
        </tr>
        </thead>
        <tbody class="text-neutral text-sm">
        <tr
            v-for="(item, index) in rows"
            :key="index"
            class="border-b border-neutral/20"
            >
            <!-- Columna 1 -->
            <td class="py-3">
                <div class="flex items-center gap-2">
                <img :src="item.logo" class="w-10 h-10" />

                <!-- Con subtítulo -->
                <template v-if="hasSub">
                    <div class="leading-4">
                    <span class="font-semibold">{{ item.title }}</span>
                    <p class="text-neutral/60 text-xs">{{ item.sub }}</p>
                    </div>
                </template>

                <!-- Sin subtítulo (casino / virtuales) -->
                <template v-else>
                    <span class="font-semibold">{{ item.sub }}</span>
                </template>
                </div>
            </td>

            <!-- Columna 2 -->
            <td class="py-3 text-center">
                <img :src="goldIcon" class="w-10 h-10 mx-auto" />
            </td>

            <!-- Columna 3 -->
            <td class="py-3 text-center">
                {{ item.amount }}
            </td>

            <!-- Columna 4 -->
            <td class="py-3 text-center">
                <img :src="greenUpIcon" class="w-10 h-10 mx-auto" />
            </td>

        <!-- Columna 5 -->
            <td class="py-3 text-center">
                {{ loyalty.BasePoints }}
            </td>
        </tr>

    </tbody>

    </table>

    </div>
  </div>
</template>

<script>
export default {
  name: "LoyaltyTable",
  props: {
    title: String,
    rows: Array,
    loyalty: Object,
    goldIcon: String,
    greenUpIcon: String,
    hasSub: Boolean,
  },
};
</script>

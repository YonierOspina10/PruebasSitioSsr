<script setup>
import { defineProps, defineEmits } from 'vue'

// 🟢 Recibimos todas las variables que antes estaban en el padre
const props = defineProps({
  amountDeposit: Number,
  lastDepositAmount: Number,
  franchiseSelected: [String, Number, Object, Boolean],
  methodSelected: Object,
  categoryGames: String,
  gamesList: Array,
  appComponent: Object // Mantiene acceso a session, saldo_total, openGame(), etc.
})

// 🟢 Para que amountDeposit siga siendo reactivo, lo emitimos al padre (como v-model)
const emit = defineEmits(['update:amountDeposit'])

// Función para actualizar amountDeposit sin romper la lógica original
const updateAmount = (value) => {
  emit('update:amountDeposit', Math.abs(value))
}
</script>

<template>
  <div
    class="w-full max-w-[420px] md:max-w-[220px] h-auto md:h-[407px] flex flex-col justify-center items-center md:gap-8 gap-4 z-0 md:z-10">

    <!-- ======== SECCIÓN DE MONTO A DEPOSITAR ======== -->
    <div class="w-[240px] md:w-full flex flex-col justify-center items-center gap-6 md:gap-8 mx-auto">
      <div
        class="relative flex flex-col justify-center items-center w-[152px] md:w-[95%] max-w-[240px] h-[102px] md:h-[143px] bg-base-200/50 rounded-xl px-2 py-4 shadow-md shadow-base-content/50">

        <!-- Placeholder cuando no hay depósitos previos -->
        <span v-if="lastDepositAmount === 0"
          class="text-xs md:text-base w-full text-center text-neutral">
          {{ franchiseSelected === undefined ? $t('Selecciona el monto') : $t('Valor a depositar') }}
        </span>

        <!-- Mostrar último depósito -->
        <span v-else-if="lastDepositAmount > 0"
          class="absolute left-0 top-0 flex justify-start items-center gap-1 bg-secondary rounded-tl-box rounded-br-box px-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-history">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M12 7v5l4 2"/>
          </svg>
          <span class="text-[9px] text-neutral uppercase">{{ $t('Tu último movimiento') }}</span>
        </span>

        <!-- Input de monto -->
        <div class="w-auto md:w-full flex justify-center items-center">
  <!-- Botón restar -->
  <button
    v-if="franchiseSelected === undefined"
    class="h-6 md:h-8 w-6 md:w-8 flex-shrink-0 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md"
    @click="updateAmount(props.amountDeposit - 1)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14" />
    </svg>
  </button>

          <div class="text-3xl md:text-4xl w-full h-full text-center text-neutral font-bold flex justify-center items-center">
      {{ appComponent.session.simbolo_moneda }}
    <input
      type="number"
      :value="props.amountDeposit"
      @input="updateAmount($event.target.value)"
      :disabled="franchiseSelected !== undefined"
      class="h-12 text-center text-neutral text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none rounded-box"
      :style="{ width: `${(props.amountDeposit?.toString().length || 1) + 2}ch`, maxWidth: '100%' }"
      data-analytics-label="deposit:amount-input"
      :data-analytics-context="`step:enter-amount|step-num:2|method:${String((props.methodSelected && (props.methodSelected.id || props.methodSelected.pasarela || props.methodSelected.nombre || props.methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
    />
  </div>

  <!-- Botón sumar -->
  <button
    v-if="franchiseSelected === undefined"
    class="h-6 md:h-8 w-6 md:w-8 flex-shrink-0 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral shadow-md"
    @click="updateAmount(props.amountDeposit + 1)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  </button>
</div>

        <!-- Saldo actual -->
        <div
          v-if="franchiseSelected === undefined"
          class="absolute -bottom-4 mx-auto min-w-[85%] md:min-w-[80%] flex justify-center items-center gap-1 h-8 md:h-9 px-2 md:px-3 bg-accent-focus/50 rounded-full border border-accent-focus/75">
          <span class="text-[9px] md:text-[11px] text-neutral">{{ $t('Saldo actual') }}</span>
          <span class="text-sm md:text-[14px] font-bold capitalize text-neutral">
            {{ appComponent.session.simbolo_moneda }} {{ Math.abs(appComponent.saldo_total).toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Botones rápidos -->
      <div v-if="franchiseSelected === undefined" class="min-w-32 w-[95%] flex justify-between items-center">
        <button
          v-for="(m, idx) in [1,2,3]"
          :key="idx"
          class="text-xs bg-base-300/50 text-neutral py-2 px-2 md:px-4 rounded-full hover:bg-base-content hover:scale-110 cursor-pointer shadow-md"
          @click="updateAmount(methodSelected[`mount_${m}`] || (m===1?20:m===2?50:80))"
          :data-analytics-label="`deposit:amount-preset:${props.methodSelected[`mount_${m}`] ? props.methodSelected[`mount_${m}`] : (m===1?20:m===2?50:80)}`"
          :data-analytics-position="String(idx + 1)"
          :data-analytics-context="`step:enter-amount|step-num:2|method:${String((props.methodSelected && (props.methodSelected.id || props.methodSelected.pasarela || props.methodSelected.nombre || props.methodSelected.name)) || '').trim().toLowerCase().replace(/\\s+/g,'-').replace(/_+/g,'-').replace(/[^a-z0-9-]/g,'')}`"
        >
          {{ appComponent.session.simbolo_moneda }}
          {{ methodSelected[`mount_${m}`] ? methodSelected[`mount_${m}`] : (m===1?20:m===2?50:80) }}
        </button>
      </div>
    </div>

    <!-- ======== SECCIÓN DE JUEGOS (se mantiene intacta) ======== -->
                <div v-if="categoryGames !== '' && gamesList.length > 0"
                     class="w-full h-20 md:h-full flex justify-center items-center">
                    <!-- Section for displaying game options -->

                    <div
                        class="w-[90%] md:hidden min-w-[111px] h-full min-h-[137px] flex justify-center items-center rounded-box">
                        <!-- Mobile view for game selection -->
                        <div
                            class="relative w-[220px] h-[90px] md:h-full flex justify-center items-center rounded-box bg-gradient-to-b from-[#9F019A] to-[#160134] bg-opacity-50 backdrop-blur-sm backdrop-opacity-25">
                            <swiper-container
                                class="w-[150px] h-auto overflow-hidden rounded-box py-1"
                                :slides-per-view="2"
                                :grid-rows="1"
                                :direction="'horizontal'"
                                :space-between="12"
                                :mousewheel="true"
                                :mousewheel-force-to-axis="true"
                                :class="'swiper-container' + keySlide2"
                                :navigation="{
                                    nextEl: '.slideNext' + keySlide2,
                                    prevEl: '.slidePrev' + keySlide2,
                                }"
                            >
                                <!-- Individual game slide -->
                                <swiper-slide
                                    v-for="(game, index) in gamesList"
                                    :key="index"
                                    :data-index="index"
                                    class="w-[65px] h-[58px] hover:scale-[1.02] cursor-pointer"
                                >
                                    <!-- Button for selecting a game -->
                                    <button
                                        @click="$event.stopPropagation();
                                                appComponent.openGame(game);"
                                        class="relative w-full h-full"
                                    >
                                        <!-- Game icon image -->
                                        <img
                                            v-show="
                                                game.icon_2 !== undefined &&
                                                game.icon_2 !== null &&
                                                game.icon_2 !== ''
                                            "
                                            :src="game.icon_2"
                                            :alt="game.name + game.id"
                                            class="w-full h-full object-cover object-center"
                                        />
                                    </button>
                                </swiper-slide>
                            </swiper-container>
                            <button
                                v-if="gamesList.length > 2"
                                class="absolute -left-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral"
                                :class="'slidePrev' + keySlide2">
                                <!-- Button to navigate to the previous game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                v-if="gamesList.length > 2"
                                class="absolute -right-2 my-auto h-5 w-5 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral"
                                :class="'slideNext' + keySlide2">
                                <!-- Button to navigate to the next game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="w-full h-full hidden md:flex justify-center items-center rounded-box">
                        <!-- Desktop view for game selection -->
                        <div
                            class="relative w-full h-full max-h-[178px] max-w-[196px] flex justify-center items-center py-3 px-5 rounded-box bg-gradient-to-br from-[#AD01A450] to-[#0E012E] from-10% bg-opacity-25 backdrop-blur-sm backdrop-opacity-25 aspect-square">
                            <swiper-container
                                class="overflow-hidden rounded-[15px] w-[145px] h-[145px]"
                                :slides-per-view="2"
                                :grid-rows="2"
                                :direction="'horizontal'"
                                :space-between="0"
                                :mousewheel="true"
                                :mousewheel-force-to-axis="true"
                                :class="'swiper-container' + keySlide"
                                :navigation="{
                                    nextEl: '.slideNext' + keySlide,
                                    prevEl: '.slidePrev' + keySlide,
                                }"
                            >
                                <!-- Individual game slide -->
                                <swiper-slide
                                    v-for="(game, index) in gamesList"
                                    :key="index"
                                    :data-index="index"
                                    class="w-[72px] h-[72px] cursor-pointer aspect-square"
                                >
                                    <!-- Button for selecting a game -->
                                    <button
                                        @click="
                                                $event.stopPropagation();
                                                appComponent.openGame(game);
                                            "
                                        class="relative w-full h-full"
                                    >
                                        <!-- Game icon image -->
                                        <img
                                            v-show="
                                                game.icon_3 !== undefined &&
                                                game.icon_3 !== null &&
                                                game.icon_3 !== ''
                                            "
                                            :src="game.icon_3"
                                            :alt="game.name + game.id"
                                            class="w-full h-full object-cover object-center aspect-square hover:scale-105"
                                        />
                                    </button>
                                </swiper-slide>
                            </swiper-container>
                            <button
                                v-if="gamesList.length > 4"
                                class="absolute -left-2 md:-left-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                :class="'slidePrev' + keySlide">
                                <!-- Button to navigate to the previous game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                v-if="gamesList.length > 4"
                                class="absolute -right-2 md:-right-3 top-[45%] h-5 md:h-7 w-5 md:w-7 flex justify-center items-center rounded-full bg-base-300 hover:scale-110 cursor-pointer stroke-neutral text-neutral"
                                :class="'slideNext' + keySlide">
                                <!-- Button to navigate to the next game slide -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
  </div>
</template>

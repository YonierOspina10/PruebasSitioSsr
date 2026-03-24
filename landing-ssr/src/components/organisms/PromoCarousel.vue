<script setup lang="ts">
import { computed } from 'vue'
import PromoCard from '@/components/molecules/PromoCard.vue'
import { usePromotionsStore } from '@/stores/promotions.store'
import { useCarousel } from '@/composables/useCarousel'

const promosStore = usePromotionsStore()

const promos = computed(() => promosStore.activePromotions)

const { currentIndex, next, prev, goTo, pause, resume } = useCarousel(
  computed(() => promos.value.length).value,
  { visibleItems: 3, visibleItemsMd: 2, visibleItemsSm: 1, autoPlayInterval: 5000 },
)

const VISIBLE = 3

const visiblePromos = computed(() => {
  const all = promos.value
  if (all.length === 0) return []
  const start = currentIndex.value % all.length
  const result = []
  for (let i = 0; i < Math.min(VISIBLE, all.length); i++) {
    result.push(all[(start + i) % all.length])
  }
  return result
})

// Dots del carrusel
const totalDots = computed(() => Math.max(1, promos.value.length - VISIBLE + 1))
</script>

<template>
  <section
    id="promotions"
    class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-casino-surface/30"
    aria-labelledby="promos-heading"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2">
          Ofertas Exclusivas
        </p>
        <h2 id="promos-heading" class="text-white text-3xl sm:text-4xl font-black">
          Nuestras Mejores Promociones
        </h2>
        <p class="text-gray-400 mt-3 max-w-xl mx-auto">
          Bonos diseñados para que siempre tengas más oportunidades de ganar.
        </p>
      </div>

      <!-- Carrusel de promos -->
      <div
        class="relative"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PromoCard
            v-for="promo in visiblePromos"
            :key="promo.id"
            :promo="promo"
          />
        </div>

        <!-- Controles navegación y dots -->
        <div class="flex items-center justify-center mt-8 gap-4">
          <button
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200"
            aria-label="Promoción anterior"
            @click="prev"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <!-- Dots -->
          <div class="flex gap-2" role="tablist" aria-label="Indicador de promociones">
            <button
              v-for="i in totalDots"
              :key="i"
              class="h-2 rounded-full transition-all duration-300"
              :class="currentIndex === i - 1
                ? 'w-6 bg-casino-gold'
                : 'w-2 bg-white/20 hover:bg-white/40'"
              :aria-label="`Ir a la promoción ${i}`"
              :aria-selected="currentIndex === i - 1"
              role="tab"
              @click="goTo(i - 1)"
            />
          </div>
          <button
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200"
            aria-label="Siguiente promoción"
            @click="next"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

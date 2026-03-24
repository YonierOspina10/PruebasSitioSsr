<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '@/components/molecules/GameCard.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { useGamesStore } from '@/stores/games.store'
import { useCarousel } from '@/composables/useCarousel'
import type { GameCategory } from '@/interfaces/game.interface'

const gamesStore = useGamesStore()

const categories: Array<{ value: GameCategory | null; label: string }> = [
  { value: null, label: 'Todos' },
  { value: 'slots', label: '🎰 Slots' },
  { value: 'roulette', label: '🎡 Ruleta' },
  { value: 'poker', label: '🃏 Póker' },
  { value: 'blackjack', label: '🂡 Blackjack' },
  { value: 'live', label: '📺 En Vivo' },
]

const filteredGames = computed(() => gamesStore.filteredGames)

const { currentIndex, next, prev, pause, resume } = useCarousel(
  computed(() => filteredGames.value.length).value,
  { visibleItems: 4, visibleItemsMd: 2, visibleItemsSm: 1, autoPlayInterval: 0 },
)

const VISIBLE = 4

const visibleGames = computed(() => {
  const all = filteredGames.value
  const start = currentIndex.value % all.length
  const result = []
  for (let i = 0; i < Math.min(VISIBLE, all.length); i++) {
    result.push(all[(start + i) % all.length])
  }
  return result
})
</script>

<template>
  <section id="games" class="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="games-heading">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2">
            Catálogo
          </p>
          <h2 id="games-heading" class="text-white text-3xl sm:text-4xl font-black">
            Juegos Destacados
          </h2>
        </div>
        <!-- Filtros de categoría -->
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          <button
            v-for="cat in categories"
            :key="String(cat.value)"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
            :class="gamesStore.activeCategory === cat.value
              ? 'bg-casino-gold text-casino-dark border-casino-gold'
              : 'bg-white/5 text-gray-400 border-white/10 hover:border-casino-gold/40 hover:text-white'"
            @click="gamesStore.setCategory(cat.value)"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Carrusel de juegos -->
      <div
        class="relative"
        @mouseenter="pause"
        @mouseleave="resume"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GameCard
            v-for="game in visibleGames"
            :key="game.id"
            :game="game"
          />
        </div>

        <!-- Controles de navegación -->
        <div v-if="filteredGames.length > VISIBLE" class="flex justify-center mt-8 gap-3">
          <button
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200"
            aria-label="Juegos anteriores"
            @click="prev"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold text-white flex items-center justify-center transition-colors duration-200"
            aria-label="Siguientes juegos"
            @click="next"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- CTA ver más -->
      <div class="text-center mt-10">
        <BaseButton variant="secondary" size="lg" is-anchor href="#all-games">
          Ver todos los juegos →
        </BaseButton>
      </div>
    </div>
  </section>
</template>

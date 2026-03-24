<script setup lang="ts">
import BaseImage from '@/components/atoms/BaseImage.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import type { IGame } from '@/interfaces/game.interface'

interface Props {
  game: IGame
}

defineProps<Props>()

const badgeColorMap = {
  hot: 'red',
  new: 'green',
  exclusive: 'purple',
} as const
</script>

<template>
  <article
    class="group relative bg-casino-surface rounded-xl overflow-hidden border border-white/10 hover:border-casino-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-casino-gold/10"
  >
    <!-- Imagen del juego -->
    <div class="relative">
      <BaseImage
        :src="game.thumbnail"
        :alt="game.name"
        aspect-ratio="3/2"
        loading="lazy"
      />
      <!-- Badge -->
      <div v-if="game.badge" class="absolute top-2 left-2">
        <BaseBadge
          :label="game.badge === 'hot' ? '🔥 HOT' : game.badge === 'new' ? '✨ NEW' : '💎 EXCLUSIVO'"
          :color="badgeColorMap[game.badge]"
        />
      </div>
      <!-- Indicador LIVE -->
      <div
        v-if="game.isLive"
        class="absolute top-2 right-2 flex items-center gap-1 bg-casino-red/90 text-white text-xs font-bold px-2 py-0.5 rounded-full"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        LIVE
      </div>
      <!-- Overlay de acción al hacer hover -->
      <div
        class="absolute inset-0 bg-casino-dark/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <BaseButton :href="game.playUrl" is-anchor size="md" variant="primary">
          Jugar Ahora
        </BaseButton>
      </div>
    </div>
    <!-- Info -->
    <div class="p-3">
      <h3 class="text-white font-semibold text-sm truncate">{{ game.name }}</h3>
      <div class="flex items-center justify-between mt-1">
        <span class="text-gray-400 text-xs">{{ game.provider }}</span>
        <span class="text-casino-gold text-xs font-mono">RTP {{ game.rtp }}%</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import BaseImage from '@/components/atoms/BaseImage.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import type { IPromotion } from '@/interfaces/promotion.interface'

interface Props {
  promo: IPromotion
}

defineProps<Props>()

const typeColorMap = {
  welcome: 'gold',
  deposit: 'green',
  'free-spins': 'purple',
  cashback: 'red',
  vip: 'purple',
} as const
</script>

<template>
  <article
    class="relative bg-casino-surface rounded-2xl overflow-hidden border border-white/10 hover:border-casino-gold/40 transition-all duration-300 hover:shadow-xl hover:shadow-casino-gold/10 flex flex-col"
  >
    <!-- Imagen de la promo -->
    <div class="relative">
      <BaseImage
        :src="promo.imageUrl"
        :alt="promo.title"
        aspect-ratio="2/1"
        loading="lazy"
      />
      <!-- Badge tipo -->
      <div class="absolute top-3 left-3">
        <BaseBadge :label="promo.badgeLabel" :color="typeColorMap[promo.type]" />
      </div>
      <!-- Valor destacado -->
      <div
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-casino-dark to-transparent p-4"
      >
        <p class="text-casino-gold font-black text-2xl leading-none drop-shadow">
          {{ promo.value }}
        </p>
      </div>
    </div>
    <!-- Contenido -->
    <div class="p-5 flex flex-col flex-1 gap-3">
      <div>
        <h3 class="text-white font-bold text-lg leading-tight">{{ promo.title }}</h3>
        <p class="text-casino-gold text-sm font-medium">{{ promo.subtitle }}</p>
      </div>
      <p class="text-gray-400 text-sm leading-relaxed flex-1">{{ promo.description }}</p>
      <BaseButton :href="promo.ctaUrl" is-anchor variant="primary" size="md" class="w-full">
        {{ promo.ctaLabel }}
      </BaseButton>
    </div>
  </article>
</template>

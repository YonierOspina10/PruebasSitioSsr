<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'

// Estadísticas del casino para el hero
const stats = [
  { value: '500+', label: 'Juegos' },
  { value: '24/7', label: 'Soporte' },
  { value: '$50K', label: 'Jackpot' },
  { value: '1M+', label: 'Jugadores' },
]
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[90svh] flex items-center overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <!-- Fondo: gradiente + partículas decorativas -->
    <div class="absolute inset-0 bg-gradient-to-br from-casino-dark via-[#0d0d2e] to-casino-dark" aria-hidden="true" />
    <!-- Círculos de brillo decorativos -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-casino-gold/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-casino-red/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <!-- Badge superior -->
        <div class="flex justify-center">
          <BaseBadge label="🎰 Casino Online #1 en Entretenimiento" color="gold" />
        </div>

        <!-- Título principal -->
        <h1
          id="hero-heading"
          class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight"
        >
          Juega.
          <span class="text-casino-gold">Gana.</span>
          <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-casino-gold via-yellow-300 to-casino-gold">
            Celebra.
          </span>
        </h1>

        <!-- Subtítulo -->
        <p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Descubre más de <strong class="text-white">500 juegos</strong> de casino,
          slots premium, ruleta en vivo y los mejores bonos del mercado.
          Tu suerte comienza aquí.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <BaseButton variant="primary" size="lg" is-anchor href="#register">
            🎁 Reclamar Bono de Bienvenida
          </BaseButton>
          <BaseButton variant="secondary" size="lg" is-anchor href="#games">
            Ver Juegos
          </BaseButton>
        </div>

        <!-- Indicador de promoción -->
        <p class="text-sm text-gray-400">
          ✅ Sin depósito requerido · 🔒 100% seguro · ⚡ Retiros en 24h
        </p>

        <!-- Estadísticas -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center space-y-1"
          >
            <div class="text-3xl font-black text-casino-gold">{{ stat.value }}</div>
            <div class="text-xs text-gray-400 uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Flecha de scroll animada -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
      <svg class="w-6 h-6 text-casino-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

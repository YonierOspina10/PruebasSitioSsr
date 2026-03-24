<script setup lang="ts">
import DefaultLayout from '@/templates/DefaultLayout.vue'
import HeroBanner from '@/components/organisms/HeroBanner.vue'
import GameCarousel from '@/components/organisms/GameCarousel.vue'
import PromoCarousel from '@/components/organisms/PromoCarousel.vue'
</script>

<template>
  <DefaultLayout>
    <HeroBanner />

    <!-- Separador con gradiente -->
    <div class="h-px bg-gradient-to-r from-transparent via-casino-gold/30 to-transparent mx-8" aria-hidden="true" />

    <GameCarousel />

    <!-- Separador -->
    <div class="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-8" aria-hidden="true" />

    <PromoCarousel />

    <!-- Sección "Por qué PaniPlay" -->
    <section class="py-16 px-4 sm:px-6 lg:px-8" id="features" aria-labelledby="features-heading">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-casino-gold text-sm font-semibold uppercase tracking-widest mb-2">Ventajas</p>
          <h2 id="features-heading" class="text-white text-3xl sm:text-4xl font-black">
            ¿Por qué elegir PaniPlay?
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-casino-surface rounded-xl p-6 border border-white/10 hover:border-casino-gold/30 transition-colors duration-300 text-center space-y-3"
          >
            <div class="text-4xl" aria-hidden="true">{{ feature.icon }}</div>
            <h3 class="text-white font-bold">{{ feature.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-casino-dark via-[#0d0d2e] to-casino-dark" aria-labelledby="cta-heading">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <h2 id="cta-heading" class="text-white text-4xl sm:text-5xl font-black leading-tight">
          ¿Listo para la
          <span class="text-casino-gold">aventura</span>?
        </h2>
        <p class="text-gray-300 text-lg">
          Únete a más de 1 millón de jugadores y reclama tu bono de bienvenida hoy.
        </p>
        <a
          href="#register"
          class="inline-flex items-center justify-center gap-2 px-10 py-4 bg-casino-gold text-casino-dark font-black text-lg rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-2xl shadow-casino-gold/40 hover:shadow-casino-gold/60 hover:-translate-y-0.5"
        >
          🎁 Crear Cuenta Gratis
        </a>
        <p class="text-gray-500 text-sm">Sin tarjeta de crédito · Retiro inmediato</p>
      </div>
    </section>
  </DefaultLayout>
</template>

<script lang="ts">
const features = [
  {
    icon: '🛡️',
    title: 'Seguro y Confiable',
    description: 'Plataforma con cifrado SSL y licencia de operación internacional.',
  },
  {
    icon: '⚡',
    title: 'Pagos Rápidos',
    description: 'Depósitos instantáneos y retiros procesados en menos de 24 horas.',
  },
  {
    icon: '🎁',
    title: 'Bonos Exclusivos',
    description: 'Promociones semanales, torneos y programa VIP con privilegios únicos.',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Experiencia optimizada para móvil. Juega donde quieras, cuando quieras.',
  },
]
</script>

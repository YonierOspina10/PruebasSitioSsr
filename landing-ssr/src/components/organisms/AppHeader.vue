<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavItem from '@/components/molecules/NavItem.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { useNavigationStore } from '@/stores/navigation.store'

const navStore = useNavigationStore()
const route = useRoute()

const isActive = computed(() => (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
})

function onToggleMenu() {
  navStore.toggleMenu()
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-casino-dark/95 backdrop-blur-md border-b border-white/10"
    role="banner"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0" aria-label="PaniPlay - Ir al inicio">
          <span class="text-2xl" aria-hidden="true">🎰</span>
          <span class="text-casino-gold font-black text-xl tracking-tight">
            Pani<span class="text-white">Play</span>
          </span>
        </a>

        <!-- Nav desktop -->
        <nav class="hidden md:block" aria-label="Navegación principal">
          <ul class="flex items-center gap-7">
            <NavItem
              v-for="link in navStore.mainLinks"
              :key="link.id"
              :link="link"
              :is-active="isActive(link.href)"
            />
          </ul>
        </nav>

        <!-- CTA + botón menú -->
        <div class="flex items-center gap-3">
          <BaseButton variant="ghost" size="sm" is-anchor href="#login">
            Iniciar Sesión
          </BaseButton>
          <BaseButton variant="primary" size="sm" is-anchor href="#register">
            Registrarse
          </BaseButton>
          <!-- Hamburger móvil -->
          <button
            class="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            :aria-expanded="navStore.isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
            @click="onToggleMenu"
          >
            <svg v-if="!navStore.isMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <div
        v-if="navStore.isMenuOpen"
        id="mobile-menu"
        class="md:hidden border-t border-white/10 py-4"
      >
        <nav aria-label="Menú móvil">
          <ul class="flex flex-col gap-1">
            <NavItem
              v-for="link in navStore.mainLinks"
              :key="link.id"
              :link="link"
              :is-active="isActive(link.href)"
            />
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

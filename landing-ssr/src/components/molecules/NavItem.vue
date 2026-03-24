<script setup lang="ts">
import type { INavLink } from '@/interfaces/navigation.interface'

interface Props {
  link: INavLink
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

/**
 * Navegación cross-microfrontend: usa history.pushState para que single-spa
 * detecte el cambio de ruta y monte el microfrontend correspondiente
 * (ej: SitioVersion5 para /deportes) sin recarga de página.
 * single-spa v6 parchea pushState, por lo que el cambio de ruta se detecta automáticamente.
 */
function navigateToSpa(event: Event, href: string) {
  event.preventDefault()
  window.history.pushState(null, '', href)
  // Dispara popstate como fallback por si single-spa no intercepta pushState
  window.dispatchEvent(new PopStateEvent('popstate'))
}
</script>

<template>
  <li>
    <a
      :href="link.href"
      :target="!link.isExternal && link.href.startsWith('http') ? '_blank' : undefined"
      :rel="!link.isExternal && link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
      class="relative text-sm font-medium transition-colors duration-200 py-1 group"
      :class="isActive
        ? 'text-casino-gold'
        : 'text-gray-300 hover:text-casino-gold'"
      @click="link.isExternal ? navigateToSpa($event, link.href) : undefined"
    >
      {{ link.label }}
      <!-- Subrayado animado -->
      <span
        class="absolute bottom-0 left-0 h-px bg-casino-gold transition-all duration-300"
        :class="isActive ? 'w-full' : 'w-0 group-hover:w-full'"
      />
    </a>
  </li>
</template>

<script setup lang="ts">
import { navigateToUrl } from 'single-spa'
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
 * navigateToUrl usa la API oficial de single-spa y evita depender de eventos
 * manuales adicionales para forzar el reroute.
 */
function toCanonicalShellPath(rawHref: string) {
  const trimmed = rawHref.trim()

  if (/^https?:\/\//i.test(trimmed)) {
    const parsed = new URL(trimmed)
    const path = parsed.pathname

    if (path.startsWith('/landing-ssr/')) {
      const normalizedPath = `${path.slice('/landing-ssr'.length) || '/'}${parsed.search}${parsed.hash}`
      return toShellTarget(normalizedPath)
    }

    return toShellTarget(`${parsed.pathname}${parsed.search}${parsed.hash}`)
  }

  if (trimmed.startsWith('/landing-ssr/')) {
    return trimmed.slice('/landing-ssr'.length) || '/'
  }

  if (trimmed.startsWith('/')) {
    return toShellTarget(trimmed)
  }

  return toShellTarget(`/${trimmed}`)
}

function toShellTarget(path: string) {
  if (path === '/landing-ssr' || path.startsWith('/landing-ssr/')) {
    return path
  }

  const spaRootUrl = (window as Window & { __SPA_ROOT_URL__?: string }).__SPA_ROOT_URL__
  if (!spaRootUrl) {
    return path
  }

  try {
    const shellOrigin = new URL(spaRootUrl).origin
    if (window.location.origin !== shellOrigin) {
      return `${shellOrigin}${path}`
    }
  } catch {
    return path
  }

  return path
}

function onNavClick(event: MouseEvent, link: INavLink) {
  if (link.href.startsWith('#')) {
    return
  }

  event.preventDefault()

  const currentTarget = event.currentTarget
  if (currentTarget instanceof HTMLAnchorElement) {
    navigateToUrl(toCanonicalShellPath(currentTarget.href))
    return
  }

  navigateToUrl(toCanonicalShellPath(link.href))
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
      @click="onNavClick($event, link)"
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

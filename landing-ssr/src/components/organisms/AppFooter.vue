<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation.store'

const navStore = useNavigationStore()

const socialLinks = [
  { id: 'tw', label: 'Twitter / X', href: '#', icon: '𝕏' },
  { id: 'tg', label: 'Telegram', href: '#', icon: '✈️' },
  { id: 'dc', label: 'Discord', href: '#', icon: '💬' },
  { id: 'ig', label: 'Instagram', href: '#', icon: '📷' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-casino-dark border-t border-white/10 mt-auto" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Branding -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl" aria-hidden="true">🎰</span>
            <span class="text-casino-gold font-black text-xl tracking-tight">
              Pani<span class="text-white">Play</span>
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
            El entretenimiento de casino más emocionante, con los mejores juegos y bonos exclusivos.
          </p>
          <!-- Redes sociales -->
          <div class="flex gap-3">
            <a
              v-for="s in socialLinks"
              :key="s.id"
              :href="s.href"
              :aria-label="s.label"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-casino-gold/20 hover:text-casino-gold flex items-center justify-center text-sm transition-colors duration-200"
            >
              {{ s.icon }}
            </a>
          </div>
        </div>

        <!-- Links legales -->
        <nav aria-label="Links legales" class="space-y-3">
          <h3 class="text-white font-semibold text-sm uppercase tracking-widest">Legal & Soporte</h3>
          <ul class="space-y-2">
            <li v-for="link in navStore.footerLinks" :key="link.id">
              <a
                :href="link.href"
                class="text-gray-400 text-sm hover:text-casino-gold transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Juego responsable -->
        <div class="space-y-4">
          <h3 class="text-white font-semibold text-sm uppercase tracking-widest">Juego Responsable</h3>
          <p class="text-gray-400 text-xs leading-relaxed">
            PaniPlay es solo para mayores de 18 años. El juego debe ser entretenimiento.
            Si sientes que tienes un problema, busca ayuda.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">+18</span>
            <span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">🔒 SSL</span>
            <span class="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-500">🛡️ Licenciado</span>
          </div>
        </div>
      </div>

      <!-- Línea inferior -->
      <div class="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-gray-500 text-xs text-center sm:text-left">
          &copy; {{ year }} PaniPlay. Todos los derechos reservados.
        </p>
        <p class="text-gray-600 text-xs">
          Juego responsable · Solo mayores de 18 años
        </p>
      </div>
    </div>
  </footer>
</template>

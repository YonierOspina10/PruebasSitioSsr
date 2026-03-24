<script setup lang="ts">
type BadgeColor = 'gold' | 'red' | 'purple' | 'green' | 'gray'

interface Props {
  label: string
  color?: BadgeColor
}

withDefaults(defineProps<Props>(), {
  color: 'gold',
})

const colorClasses: Record<BadgeColor, string> = {
  gold: 'bg-casino-gold/20 text-casino-gold border border-casino-gold/40',
  red: 'bg-casino-red/20 text-red-400 border border-casino-red/40',
  purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
  green: 'bg-green-500/20 text-green-400 border border-green-500/40',
  gray: 'bg-white/10 text-gray-400 border border-white/20',
}
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase"
    :class="colorClasses[color]"
  >
    {{ label }}
  </span>
</template>

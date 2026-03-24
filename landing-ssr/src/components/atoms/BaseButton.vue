<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  variant?: Variant
  size?: Size
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  /** Si es una etiqueta <a> (enlace externo) */
  isAnchor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-casino-gold text-casino-dark font-bold hover:bg-yellow-400 active:bg-yellow-500 shadow-lg shadow-casino-gold/30 hover:shadow-casino-gold/50',
  secondary:
    'bg-transparent border-2 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-dark',
  ghost:
    'bg-white/10 text-white hover:bg-white/20 border border-white/20',
  danger:
    'bg-casino-red text-white font-bold hover:bg-red-700 active:bg-red-800',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-base rounded-lg',
  lg: 'px-8 py-3.5 text-lg rounded-xl',
}
</script>

<template>
  <a
    v-if="isAnchor && href"
    :href="href"
    class="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold focus-visible:ring-offset-2 focus-visible:ring-offset-casino-dark"
    :class="[variantClasses[variant!], sizeClasses[size!], { 'opacity-50 pointer-events-none': disabled }]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-casino-gold focus-visible:ring-offset-2 focus-visible:ring-offset-casino-dark disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses[variant!], sizeClasses[size!]]"
  >
    <slot />
  </button>
</template>

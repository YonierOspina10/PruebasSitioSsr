<template>
  <button
    v-if="method"
    :disabled="isDisabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Tooltip si está deshabilitado -->
    <div
      v-if="isDisabled"
      class="tooltip absolute top-2 right-2 flex justify-center items-center stroke-neutral"
      :data-tip="`${$t('Mínimo')}: ${currency}${method.amount_min}, ${$t('Máximo')}: ${currency}${method.amount_max}`"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-info-icon lucide-info">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </div>

    <!-- Icono -->
    <div class="w-full h-10 md:h-12 flex justify-center items-center rounded-lg md:rounded-xl bg-gradient-to-t from-neutral-content/10  to-neutral-content text-neutral">
      <slot name="icon"></slot> <!-- Aquí puedes personalizar el ícono si quieres -->
    </div>

    <!-- Título -->
    <span class="text-sm md:text-[15px] text-center leading-4 break-words text-neutral">
      {{ $t(title) }}
    </span>
      <slot></slot>

    <!-- Monto mínimo -->
    <span class="text-[9px] md:text-xs text-center font-light text-neutral/50">
      {{ $t('Desde') }} {{ currency }}{{ method.amount_min }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  method: Object,
  amountDeposit: Number,
  title:  String ,
  currency: { type: String, default: '$' },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['select'])

const isDisabled = computed(() => {
  return (
    props.disabled ||
    Number(props.amountDeposit) < Number(props.method.amount_min) ||
    (props.method.amount_max &&
      Number(props.amountDeposit) > Number(props.method.amount_max))
  )
})

const buttonClasses = computed(() => ({
  'relative h-full max-h-[100px] md:min-h-[133px] md:max-h-[135px] bg-gradient-to-b from-neutral-content/10 to-base-content rounded-box p-2 md:p-4 flex flex-col justify-between items-center gap-2 hover:scale-[1.02] hover:border hover:border-neutral': true,
  'opacity-50 cursor-not-allowed': isDisabled.value
}))

function handleClick() {
  if (!isDisabled.value) emit('select', props.method)
}

</script>

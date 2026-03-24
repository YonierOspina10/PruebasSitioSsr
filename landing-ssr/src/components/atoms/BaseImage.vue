<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
  objectFit?: 'cover' | 'contain' | 'fill'
  aspectRatio?: string
}

withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  objectFit: 'cover',
})
</script>

<template>
  <div
    class="overflow-hidden"
    :style="aspectRatio ? { aspectRatio } : {}"
  >
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      class="w-full h-full transition-transform duration-300"
      :class="{
        'object-cover': objectFit === 'cover',
        'object-contain': objectFit === 'contain',
        'object-fill': objectFit === 'fill',
      }"
      decoding="async"
    />
  </div>
</template>

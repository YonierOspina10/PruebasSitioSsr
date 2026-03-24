<script setup lang="ts">
import AppHeader from '@/components/organisms/AppHeader.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-casino-dark">
    <AppHeader />
    <!-- offset para el header fixed -->
    <main class="flex-1 pt-16" id="main-content" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

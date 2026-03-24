import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ICarouselOptions } from '@/interfaces/carousel.interface'

/**
 * Composable SSR-safe para carruseles.
 * - En servidor: no hay window/timers, solo calcula el índice inicial.
 * - En cliente: activa auto-play en onMounted, que no se ejecuta en servidor.
 */
export function useCarousel(itemCount: number, options: Partial<ICarouselOptions> = {}) {
  const opts: ICarouselOptions = {
    visibleItems: options.visibleItems ?? 4,
    visibleItemsMd: options.visibleItemsMd ?? 2,
    visibleItemsSm: options.visibleItemsSm ?? 1,
    autoPlayInterval: options.autoPlayInterval ?? 4000,
    loop: options.loop ?? true,
  }

  const currentIndex = ref(0)
  const isAnimating = ref(false)
  const isPaused = ref(false)

  let autoPlayTimer: ReturnType<typeof setInterval> | null = null

  function next() {
    if (isAnimating.value) return
    isAnimating.value = true
    if (opts.loop) {
      currentIndex.value = (currentIndex.value + 1) % itemCount
    } else {
      currentIndex.value = Math.min(currentIndex.value + 1, itemCount - opts.visibleItems)
    }
    setTimeout(() => { isAnimating.value = false }, 300)
  }

  function prev() {
    if (isAnimating.value) return
    isAnimating.value = true
    if (opts.loop) {
      currentIndex.value = (currentIndex.value - 1 + itemCount) % itemCount
    } else {
      currentIndex.value = Math.max(currentIndex.value - 1, 0)
    }
    setTimeout(() => { isAnimating.value = false }, 300)
  }

  function goTo(index: number) {
    if (index >= 0 && index < itemCount) {
      currentIndex.value = index
    }
  }

  function pause() { isPaused.value = true }
  function resume() { isPaused.value = false }

  function startAutoPlay() {
    if (opts.autoPlayInterval <= 0) return
    autoPlayTimer = setInterval(() => {
      if (!isPaused.value) next()
    }, opts.autoPlayInterval)
  }

  function stopAutoPlay() {
    if (autoPlayTimer !== null) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
    }
  }

  // onMounted solo se ejecuta en el cliente, nunca en SSR → SSR-safe
  onMounted(() => {
    startAutoPlay()
  })

  onBeforeUnmount(() => {
    stopAutoPlay()
  })

  return {
    currentIndex,
    isAnimating,
    isPaused,
    next,
    prev,
    goTo,
    pause,
    resume,
    opts,
  }
}

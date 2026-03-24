export interface ICarouselOptions {
  /** Elementos visibles al mismo tiempo (desktop) */
  visibleItems: number
  /** Elementos visibles en tablet */
  visibleItemsMd: number
  /** Elementos visibles en móvil */
  visibleItemsSm: number
  /** Intervalo de auto-play en ms (0 = desactivado) */
  autoPlayInterval: number
  loop: boolean
}

export interface ICarouselState {
  currentIndex: number
  isAnimating: boolean
  isPaused: boolean
}

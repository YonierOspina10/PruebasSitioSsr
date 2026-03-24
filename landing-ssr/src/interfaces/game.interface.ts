/** Categoría de juego de casino */
export type GameCategory = 'slots' | 'roulette' | 'poker' | 'blackjack' | 'baccarat' | 'live'

/** Insignia que puede llevar una tarjeta de juego */
export type GameBadge = 'hot' | 'new' | 'exclusive' | null

export interface IGame {
  id: string
  name: string
  category: GameCategory
  provider: string
  thumbnail: string
  badge: GameBadge
  /** Porcentaje de retorno al jugador (0–100) */
  rtp: number
  isLive: boolean
  playUrl: string
}

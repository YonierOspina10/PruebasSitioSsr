import { defineStore } from 'pinia'
import type { IGame, GameCategory } from '@/interfaces/game.interface'

const MOCK_GAMES: IGame[] = [
  {
    id: 'game-001',
    name: 'Golden Sphinx',
    category: 'slots',
    provider: 'PaniPlay Studios',
    thumbnail: 'https://placehold.co/300x200/1a1a2e/ffd700?text=Golden+Sphinx',
    badge: 'hot',
    rtp: 96.5,
    isLive: false,
    playUrl: '#play',
  },
  {
    id: 'game-002',
    name: 'Dragon Fortune',
    category: 'slots',
    provider: 'PaniPlay Studios',
    thumbnail: 'https://placehold.co/300x200/1a1a2e/dc143c?text=Dragon+Fortune',
    badge: 'new',
    rtp: 97.1,
    isLive: false,
    playUrl: '#play',
  },
  {
    id: 'game-003',
    name: 'Royal Roulette',
    category: 'roulette',
    provider: 'Live Masters',
    thumbnail: 'https://placehold.co/300x200/0d0d1a/ffd700?text=Royal+Roulette',
    badge: 'exclusive',
    rtp: 97.3,
    isLive: true,
    playUrl: '#play',
  },
  {
    id: 'game-004',
    name: 'Texas Hold\'em Pro',
    category: 'poker',
    provider: 'Card Masters',
    thumbnail: 'https://placehold.co/300x200/1a1a2e/22c55e?text=Texas+HoldEm',
    badge: null,
    rtp: 99.0,
    isLive: false,
    playUrl: '#play',
  },
  {
    id: 'game-005',
    name: 'Blackjack Elite',
    category: 'blackjack',
    provider: 'Card Masters',
    thumbnail: 'https://placehold.co/300x200/0d0d1a/f3f4f6?text=Blackjack+Elite',
    badge: 'hot',
    rtp: 99.5,
    isLive: false,
    playUrl: '#play',
  },
  {
    id: 'game-006',
    name: 'Mega Jackpot Wheel',
    category: 'slots',
    provider: 'PaniPlay Studios',
    thumbnail: 'https://placehold.co/300x200/1a1a2e/a855f7?text=Mega+Jackpot',
    badge: 'exclusive',
    rtp: 95.8,
    isLive: false,
    playUrl: '#play',
  },
  {
    id: 'game-007',
    name: 'Live Baccarat VIP',
    category: 'baccarat',
    provider: 'Live Masters',
    thumbnail: 'https://placehold.co/300x200/0d0d1a/ffd700?text=Live+Baccarat',
    badge: 'new',
    rtp: 98.9,
    isLive: true,
    playUrl: '#play',
  },
  {
    id: 'game-008',
    name: 'Cleopatra Riches',
    category: 'slots',
    provider: 'PaniPlay Studios',
    thumbnail: 'https://placehold.co/300x200/1a1a2e/fbbf24?text=Cleopatra',
    badge: null,
    rtp: 96.2,
    isLive: false,
    playUrl: '#play',
  },
]

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: MOCK_GAMES as IGame[],
    activeCategory: null as GameCategory | null,
    isLoading: false,
  }),
  getters: {
    filteredGames: (state): IGame[] => {
      if (!state.activeCategory) return state.games
      return state.games.filter((g) => g.category === state.activeCategory)
    },
    featuredGames: (state): IGame[] =>
      state.games.filter((g) => g.badge === 'hot' || g.badge === 'exclusive'),
    liveGames: (state): IGame[] => state.games.filter((g) => g.isLive),
  },
  actions: {
    setCategory(category: GameCategory | null) {
      this.activeCategory = category
    },
  },
})

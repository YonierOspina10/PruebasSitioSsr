import { defineStore } from 'pinia'
import type { IPromotion } from '@/interfaces/promotion.interface'

const MOCK_PROMOTIONS: IPromotion[] = [
  {
    id: 'promo-001',
    title: 'Bono de Bienvenida',
    subtitle: 'Para nuevos jugadores',
    description: 'Duplica tu primer depósito hasta $500 y recibe 100 giros gratis.',
    type: 'welcome',
    badgeLabel: '¡NUEVO!',
    value: '200% + 100 FS',
    imageUrl: 'https://placehold.co/600x300/1a1a2e/ffd700?text=Bono+Bienvenida',
    ctaLabel: 'Reclamar Bono',
    ctaUrl: '#register',
    expiresAt: null,
  },
  {
    id: 'promo-002',
    title: 'Recarga Semanal',
    subtitle: 'Cada lunes',
    description: 'Recarga los lunes y obtén un 50% extra hasta $200.',
    type: 'deposit',
    badgeLabel: 'SEMANAL',
    value: '50% hasta $200',
    imageUrl: 'https://placehold.co/600x300/0d0d1a/dc143c?text=Recarga+Semanal',
    ctaLabel: 'Depositar Ahora',
    ctaUrl: '#deposit',
    expiresAt: null,
  },
  {
    id: 'promo-003',
    title: '50 Free Spins',
    subtitle: 'Sin depósito requerido',
    description: 'Solo por registrarte, recibe 50 giros gratis en Golden Sphinx.',
    type: 'free-spins',
    badgeLabel: 'SIN DEPÓSITO',
    value: '50 Free Spins',
    imageUrl: 'https://placehold.co/600x300/1a1a2e/a855f7?text=Free+Spins',
    ctaLabel: 'Obtener Spins',
    ctaUrl: '#register',
    expiresAt: '2026-04-30T23:59:00Z',
  },
  {
    id: 'promo-004',
    title: 'Cashback VIP',
    subtitle: 'Para jugadores frecuentes',
    description: 'Recupera el 15% de tus pérdidas cada semana. Sin límite.',
    type: 'cashback',
    badgeLabel: 'VIP',
    value: '15% Cashback',
    imageUrl: 'https://placehold.co/600x300/0d0d1a/ffd700?text=Cashback+VIP',
    ctaLabel: 'Unirme al VIP',
    ctaUrl: '#vip',
    expiresAt: null,
  },
]

export const usePromotionsStore = defineStore('promotions', {
  state: () => ({
    promotions: MOCK_PROMOTIONS as IPromotion[],
    isLoading: false,
  }),
  getters: {
    activePromotions: (state): IPromotion[] =>
      state.promotions.filter((p) => {
        if (!p.expiresAt) return true
        return new Date(p.expiresAt) > new Date()
      }),
    featuredPromotion: (state): IPromotion | undefined =>
      state.promotions.find((p) => p.type === 'welcome'),
  },
})

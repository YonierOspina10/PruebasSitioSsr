export type PromotionType = 'welcome' | 'deposit' | 'free-spins' | 'cashback' | 'vip'

export interface IPromotion {
  id: string
  title: string
  subtitle: string
  description: string
  type: PromotionType
  badgeLabel: string
  /** Valor del bono (ej: "200%", "50 Free Spins", "$100") */
  value: string
  imageUrl: string
  ctaLabel: string
  ctaUrl: string
  expiresAt: string | null
}

import { defineStore } from 'pinia'
import type { INavLink } from '@/interfaces/navigation.interface'

const MAIN_NAV_LINKS: INavLink[] = [
  { id: 'nav-home', label: 'Inicio', href: '/landing-ssr' },
  { id: 'nav-sports', label: 'Deportes', href: '/deportes', isExternal: true },
  { id: 'nav-games', label: 'Juegos', href: '#games' },
  { id: 'nav-live', label: 'Casino en Vivo', href: '#live' },
  { id: 'nav-promos', label: 'Promociones', href: '#promotions' },
  { id: 'nav-vip', label: 'Club VIP', href: '#vip' },
]

const FOOTER_LINKS: INavLink[] = [
  { id: 'footer-terms', label: 'Términos y Condiciones', href: '#terms' },
  { id: 'footer-privacy', label: 'Privacidad', href: '#privacy' },
  { id: 'footer-responsible', label: 'Juego Responsable', href: '#responsible' },
  { id: 'footer-support', label: 'Soporte', href: '#support' },
  { id: 'footer-faq', label: 'FAQ', href: '#faq' },
]

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    mainLinks: MAIN_NAV_LINKS as INavLink[],
    footerLinks: FOOTER_LINKS as INavLink[],
    isMenuOpen: false,
  }),
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
  },
})

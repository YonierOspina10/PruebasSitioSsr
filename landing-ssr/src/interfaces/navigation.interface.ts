export interface INavLink {
  id: string
  label: string
  href: string
  isExternal?: boolean
}

export interface INavState {
  links: INavLink[]
  isMenuOpen: boolean
}

// Módulo externo cargado via importmap en el contexto SSR standalone
declare module '@my-micro-apps/SitioVersion5' {
  import type { LifeCycles } from 'single-spa'
  const lifecycles: LifeCycles
  export default lifecycles
  export const bootstrap: LifeCycles['bootstrap']
  export const mount: LifeCycles['mount']
  export const unmount: LifeCycles['unmount']
}

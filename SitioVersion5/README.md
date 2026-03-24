# SitioVersionVue

Este proyecto es el resultado de la migracion desde angular a vue 3 de la antigua plataforma de usuarios.
Los principales propositos de esta plataforma es:
- Depositar
- Apostar
- Retirar
- Informar
- Gestionar

## PARTES DEL PROYECTO
- CONFIG: Es un archivo json ubicado en la carpeta public, nos brinda la informacion para construir el sitio web en cuanto al estilo y funcionalidades.
- BACKEND:

## RECOMENDACIONES A TENER EN CUENTA

- Todo debe ser dinamico y determinado por la config.
- Formatear el codigo con prettier antes de subir los cambios al repositorio.
- Todo cambio debe ser probado y verificado minimo en dos partners distintos antes de subirse al repositorio.
- Tener en cuenta la intencion y ubicaion de los colores ya que debe de ser igual para todos los partners.
- Documentar cada funcionalidad del codigo.
- No repetir codigo: usar herramientas como componentes para el html, los stores para el javascript y los layers components para el CSS.
- Capas (Z-Index):
  - Fondo: 0 - 9
  - Capa 1: 10 - 19
  - Capa 2: 20 - 29
  - Capa 3: 30 - 39
  - Capa 4: 40 - 49
  - Capa 5: 50 - 59
  - Menu Aside Desktop: 60 - 69
  - Header: 70 - 79
  - Menu Aside Mobile: 80 - 89
  - Modales: 999
- Librerias:
  - Estados globales: PINIA.
  - Funcionalidades touchscreen: SWIPER.
  - CSS Components: Daisy UI

## DOCUMENTACIONES

- Vue 3: https://vuejs.org/guide/introduction.html
- Tailwind CSS: https://tailwindcss.com/docs/installation
- Daisy UI: https://daisyui.com/docs/install/
- Pinia: https://pinia.vuejs.org/introduction.html
- Swiper: https://swiperjs.com/element
- Widgets Altenar2: https://sb2widgetsstatic-altenar2.biahosted.com/docs/?path=/docs/introduction--docs

## HERRAMIENTAS EXTRAS

- Paletas de colores y extraer colores de una imagen:
  - https://coolors.co/
- Transiciones CSS y Animaciones JS:
  - https://www.transition.style/
  - https://animejs.com/documentation/
- Iconos y Fuentes de texto:
  - https://fonts.google.com/
  - https://fontawesome.com/search
  - https://icones.js.org/
- Crear y Probar Temas de Colores:
  - https://daisyui.com/theme-generator/
- Convertidor de Fechas:
  - https://www.unixtimestamp.com/
- Conventional Commits:
  - https://www.conventionalcommits.org/en/v1.0.0/
  - Gitmoji: https://gitmoji.dev/

## EXTENSIONES

- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

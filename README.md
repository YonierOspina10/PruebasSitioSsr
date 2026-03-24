# Proyecto de Microservicios - Sitios

Este proyecto está compuesto por varios microservicios desarrollados con Vue 3, TypeScript y Vite. Cada microservicio
tiene su propia estructura y configuración.

## Estructura del Proyecto

La estructura general del proyecto es la siguiente:

```plaintext
root/ # Directorio raíz del proyecto
|
├── public/ # Archivos públicos de la aplicación
├── node_modules/ # Dependencias globales del proyecto
│
├── landing/ # Microservicio de la página de aterrizaje
│ ├── node_modules/ # Dependencias del microservicio
│ ├── public/ # Archivos públicos del microservicio
│ ├── src/ # Código fuente del microservicio
│ │ ├── assets/ # Recursos estáticos (imágenes, estilos, etc.)
│ │ ├── components/ # Componentes reutilizables del microservicio
│ │ ├── composables/ # Composables del microservicio
│ │ ├── interfaces/ # Interfaces de TypeScript del microservicio
│ │ ├── layouts/ # Layouts del microservicio
│ │ ├── router/ # Configuración de rutas del microservicio
│ │ ├── scripts/ # Scripts del microservicio
│ │ ├── services/ # Servicios del microservicio
│ │ ├── store/ # Estado global del microservicio (Pinia)
│ │ ├── utils/ # Utilidades del microservicio
│ │ ├── views/ # Vistas del microservicio
│ │ ├── zendesk/ # Integración con Zendesk del microservicio
│ │ ├── App.vue # Componente principal del microservicio
│ │ ├── styles.css # Estilos globales del microservicio
│ │ └── main.js # Punto de entrada del microservicio
│ ├── package.json # Configuración de dependencias y scripts del microservicio
│ ├── package-lock.json # Dependencias específicas de la instalación del microservicio
│ ├── tsconfig.json # Configuración de TypeScript del microservicio
│ ├── tsconfig.node.json # Configuración de TypeScript para Node.js del microservicio
│ ├── vite.config.ts # Configuración de Vite del microservicio
│ └── README.md # Documentación del microservicio
│
├── SitioVersion5/ # Microservicio de la aplicación web
│ ├── node_modules/ # Dependencias del microservicio
│ ├── public/ # Archivos públicos del microservicio
│ ├── src/ # Código fuente del microservicio
│ │ ├── assets/ # Recursos estáticos (imágenes, estilos, etc.)
│ │ ├── components/ # Componentes reutilizables del microservicio
│ │ ├── composables/ # Composables del microservicio
│ │ ├── interfaces/ # Interfaces de TypeScript del microservicio
│ │ ├── layouts/ # Layouts del microservicio
│ │ ├── router/ # Configuración de rutas del microservicio
│ │ ├── services/ # Servicios del microservicio
│ │ ├── store/ # Estado global del microservicio (Pinia)
│ │ ├── utils/ # Funciones y utilidades
│ │ │ └── cconfig/ # Funciones para extraer información de la configuración del partner
│ │ ├── views/ # Vistas del microservicio
│ │ ├── zendesk/ # Integración con Zendesk del microservicio
│ │ ├── App.vue # Componente principal del microservicio
│ │ ├── globals.ts # Tipos globales del microservicio
│ │ ├── index.css # Estilos globales del microservicio
│ │ └── main.ts # Punto de entrada del microservicio
│ ├── package.json # Configuración de dependencias y scripts del microservicio
│ ├── package-lock.json # Dependencias específicas de la instalación del microservicio
│ ├── tsconfig.json # Configuración de TypeScript del microservicio
│ ├── tsconfig.node.json # Configuración de TypeScript para Node.js del microservicio
│ ├── vite.config.ts # Configuración de Vite del microservicio
│ └── README.md # Documentación del microservicio
│
├── src/ # Aplicacion principal
│ └── main.ts # Punto de entrada de la aplicación
│
├── .env # Variables de entorno
├── .gitignore # Archivos y directorios ignorados por Git
├── .gitmodules # Submódulos de Git
├── .prettierrc # Configuración de Prettier
├── .nvmrc # Versión de Node.js
├── .idea/ # Configuración de WebStorm
├── .vscode/ # Configuración de Visual Studio Code
│
├── index.html # Archivo principal de la aplicación
│
├── package.json # Configuración de dependencias y scripts
├── package-lock.json # Dependencias específicas de la instalación
│
├── tsconfig.json # Configuración de TypeScript
├── tsconfig.app.json # Configuración de TypeScript para la aplicación
├── tsconfig.node.json # Configuración de TypeScript para Node.js
│
├── tailwind.config.js # Configuración de Tailwind CSS
├── eslint.config.js # Configuración de ESLint
├── vite.config.ts # Configuración de Vite
│
└── README.md # Documentación del proyecto
```

## Root

El proyecto root es la aplicación principal que se encarga de integrar y registrar todos los microservicios. Contiene
una carpeta `src/` donde se encuentra toda la lógica de código global que se comparte entre los microservicios. Además,
el proyecto root tiene su propio package.json para instalar dependencias globales necesarias para todos los
microservicios.

## Microservicios

Los microservicios son aplicaciones independientes que se integran en la aplicación principal. Cada microservicio tiene
su propia estructura y configuración, y se usan como componentes o rutas en la aplicación.

```plaintext
<microservice_name>/ # Directorio del microservicio
│
├── node_modules/ # Dependencias
├── public/ # Archivos públicos (index.html, favicon, etc.)
├── tests/ # Pruebas unitarias y de integración
├── dist/ # Archivos generados para producción
├── src/ # Código fuente
│ ├── assets/ # Recursos estáticos (imágenes, estilos, etc.)
│ │ └── styles/ # Estilos globales
│ ├── components/ # Componentes reutilizables
│ ├── router/ # Configuración de rutas
│ ├── views/ # Vistas
│ ├── store/ # Estados global (Pinia)
│ ├── App.vue # Componente principal
│ ├── styles.css # Estilos globales
│ └── main.ts # Punto de entrada
├── package.json # Configuración de dependencias y scripts
├── package-lock.json # Dependencias específicas de la instalación
├── tsconfig.json # Configuración de TypeScript
├── tsconfig.app.json # Configuración de TypeScript
├── tsconfig.node.json # Configuración de TypeScript para Node.js
└── vite.config.ts # Configuración de Vite
```

### `landing`

Este microservicio es responsable de la página de aterrizaje de la aplicación web. Fue creado con el propósito de
proporcionar una página de inicio liviana, con una carga inicial muy baja para asegurar buenas métricas de Core Web
Vitals en el sitio web. Este microservicio se activa solo cuando el usuario ingresa a la ruta raíz `/`.

### `SitioVersion5`

Este microservicio es el más grande del proyecto y contiene toda la aplicación web completa, excepto la ruta raíz `/`. Es
la aplicación con la que interactuará el usuario cuando esté logueado. Este microservicio maneja todas las demás rutas
de la aplicación `/*`.

## Glosario de carpetas

- `src/`: Contiene el código fuente de la aplicación principal.
- `assets/`: Contiene recursos estáticos como imágenes, estilos, etc.
- `styles/`: Contiene estilos globales de la aplicación.
- `tests/`: Contiene pruebas unitarias y de integración.
- `router/`: Contiene la configuración de rutas de la aplicación, definiendo cómo se navega entre las diferentes vistas.
- `config/`: Contiene la configuración de la aplicación o librerías externas.
- `layouts/`: Contiene los layouts de la aplicación, que son componentes de alto nivel que definen la estructura de la
  página.
- `views/`: Contiene las vistas de la aplicación, que son componentes de alto nivel que representan páginas completas.
- `components/`: Contiene componentes reutilizables que pueden ser utilizados en múltiples vistas o en otros
  componentes.
- `stores/`: Contiene los estados globales de la aplicación, gestionados con Pinia, para compartir datos entre
  componentes.
- `services/`: Contiene servicios que encapsulan la lógica y las interacciones con APIs externas o
  recursos compartidos.
- `utils/`: Contiene funciones y utilidades generales que pueden ser reutilizadas en diferentes partes de la aplicación.
- `utils/cconfig/`: Contiene funciones y utilidades específicas para extraer y manejar la configuración del partner.
- `interfaces/`: Contiene las interfaces de la aplicación, que se utilizan para definir contratos en el código,
  asegurando que las clases y objetos sigan una estructura específica.
- `types/`: Contiene los tipos de TypeScript, que se utilizan para definir la forma de los datos y mejorar la seguridad
  del código.
- `composables/`: Contiene los composables de la aplicación, que son funciones reutilizables que encapsulan lógica
  reactiva y pueden ser utilizadas en componentes Vue.

## Estandarización de Nombres

Para mantener una estructura de código clara y consistente, siempre deben ser en INGLÉS y seguir las siguientes
convenciones de nombres:

- **Componentes de Vue:** Deben ser descriptivos y seguir la convención de PascalCase (
  `HomeView.vue`, `PathNotFoundView.vue`).
- **Archivos de Configuración:** Deben tener un nombre descriptivo y seguido de `.config` (`config-name.config.ts`).
- **Configuración:** Debe tener un nombre descriptivo y seguir la convención de CamelCase (`configName`).
- **Archivos de Estilos:** Deben tener el nombre estándar y seguir la convención KebabCase (`styles-name.css`). Si son
  estilos globales, deben tener el nombre `styles.css` y estar en el `src/` de cada microservicio.
- **Archivos de Estados Globales:** Deben tener el nombre del recurso que están manejando, seguir la convención
  KebabCase y seguido de `.store` (
  `home.store.ts`).
- **Archivos de Utilidades:** Deben tener un nombre descriptivo, seguir la convención KebabCase y seguido de `.util` (
  `function-name.util.ts`).
- **Utilidad:** Debe tener un nombre descriptivo y seguir la convención de CamelCase (`functionName`).
- **Archivos de Composables:** Deben tener un nombre descriptivo, seguir la convención CamelCase y seguido de
  `.composable` (
  `useFunction.composable.ts`).
- **Composable:** Debe tener un nombre descriptivo y seguir la convención de CamelCase (`useFunction`).
- **Archivos de Interfaces:** Deben tener un nombre descriptivo y seguido de `.interface` (`IInterface.interface.ts`).
- **Interface:** Debe tener un nombre descriptivo y seguir la convención de PascalCase (`InterfaceName`).
- **Archivos de Tipos:** Deben tener un nombre descriptivo y seguido de `.type` (`Type.type.ts`).
- **Tipo:** Debe tener un nombre descriptivo y seguir la convención de PascalCase (`TypeName`).
- **Pruebas Unitarias:** Deben tener un nombre descriptivo y seguido de `.spec` (`function.spec.ts`).
- **Variables:** Deben tener un nombre descriptivo y seguir la convención de CamelCase (`variableName`). Si es una
  constante, debe estar en mayúsculas y separar las palabras con guiones (`CONSTANT_NAME`).
- **Funciones:** Deben tener un nombre descriptivo y seguir la convención de CamelCase (`functionName`).
    - Si es una función que devuelve un booleano, debe comenzar con `is` o `has` (`isReady`, `hasPermission`).
    - Si es una función que no devuelve nada, debe comenzar con `handle` (`handleClick`, `handleError`).
    - Si es una función que devuelve un valor, debe comenzar con `get` (`getUsers`, `getProducts`).
    - Si es una función que modifica un valor, debe comenzar con `set` (`setUser`, `setProduct`).
    - Si es una función que elimina un valor, debe comenzar con `delete` (`deleteUser`, `deleteProduct`).
    - Si es una función que válida un valor, debe comenzar con `validate` (`validateEmail`, `validatePassword`).
- **Hooks:** Deben tener un nombre descriptivo y seguir la convención de CamelCase (`useHook`).
    - Si es un hook que devuelve un booleano, debe comenzar con `useIs` o `useHas` (`useIsReady`, `useHasPermission`).
    - Si es un hook que no se devuelve nada, debe comenzar con `useHandle` (`useHandleClick`, `useHandleError`).
    - Si es un hook que devuelve un valor, debe comenzar con `useGet` (`useGetUsers`, `useGetProducts`).
    - Si es un hook que modifica un valor, debe comenzar con `useSet` (`useSetUser`, `useSetProduct`).
    - Si es un hook que elimina un valor, debe comenzar con `useDelete` (`useDeleteUser`, `useDeleteProduct`).
    - Si es un hook que válida un valor, debe comenzar con `useValidate` (`useValidateEmail`, `useValidatePassword`).
    - Si es un hook que se ejecuta en un evento, debe comenzar con `useOn` (`useOnClick`, `useOnScroll`).
- **IDs y Clases CSS:**
    - Si es un identificador único, debe seguir la convención de snake_case (`id_name`) y comenzar con `id-` (
      `id-element`).
    - Si es una clase reutilizable, debe seguir la convención de KebabCase (`class-name`).
    - Si es una clase específica para un componente, debe comenzar con el nombre del componente (`home-cta`).
    - Si es una clase de un elemento específico, debe comenzar con el nombre del componente y el nombre del elemento (
      `home-cta-button`).
    - Si es una clase de un estado específico, debe comenzar con el nombre del componente y el nombre del estado (
      `home-cta-button-active`).

## Configuración y Ejecución
    
Sigue estos pasos para clonar, instalar y ejecutar el proyecto correctamente:

1. **Versión de Node.js:** Asegúrate de tener instalada la versión de Node.js especificada en el archivo `.nvmrc`.
2. **Clonar el repositorio:**

    ```sh
    git clone <url-del-repositorio>
    cd <nombre-del-repositorio>
    ```

3. **Instalar dependencias del proyecto root y microservicios:**

    ```sh
    npm install
    cd landing && npm install
    cd ../SitioVersion5 && npm install
    cd ..
    ```

4. **Ejecutar la aplicación principal (root):**

    ```sh
    npm run dev
    ```

> **Nota:** No es necesario ejecutar los microservicios por separado, solo la aplicación root.

## Buenas Prácticas de Desarrollo

- **Composition API:** Utiliza la Composition API para estructurar la lógica de los componentes de forma clara y
  reutilizable. Vue recomienda usar la en aplicaciones web grandes debido a su mejor escalabilidad y
  organización del código. La Composition API permite encapsular la lógica relacionada en funciones reutilizables, lo
  que facilita el mantenimiento y la extensión del código.

- **Componentes Reutilizables:** Utiliza componentes reutilizables para evitar la duplicación de código y facilitar el
  mantenimiento. Los componentes deben ser modulares y cumplir con el principio de responsabilidad única.

- **Modales y Diálogos:** Utiliza modales y diálogos para mostrar mensajes, confirmaciones y formularios en la
  aplicación. Los modales y diálogos deben ser reutilizables y configurables para adaptarse a diferentes casos de uso.
  Para estandarizar la implementación de modales en los microservicios, sigue estos pasos:

    - **Nuevo Modal:** Crea un nuevo componente para el modal en el directorio `components/modals/` del microservicio.

      ```vue
      <template>
        <div class="modal_custom">
            <div class="modal_box_custom">
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <div class="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button class="btn" @click="emit('close')">Close</button>
                    </form>
                </div>
            </div>
        </div>
      </template>

      <script setup lang="ts">
      const emit = defineEmits(['close']);
      </script>

      <style scoped>
      /* Add your styles here */
      </style>
      ```

    - **Componente Root:** Agregar el nuevo modal en la lista del componente Root. Este componente es el punto de
      entrada de los modales y diálogos en la aplicación. Se encarga de renderizar el modal y gestionar su estado. Está
      importado en el layout del microservicio.

      ```typescript
      const modalComponents = {
        // Add more modals here
        'my_modal_example': defineAsyncComponent(() => import('./MyModalExample.vue')),
      };
      ```

    - **Abrir Modal:** Para abrir el modal desde cualquier componente, utiliza el siguiente código. El modal se abrirá
      con el nombre del componente que se definió en el componente Root.

      ```typescript
      import { useModalStore } from '@/stores';

      const modalStore = useModalStore();

      const openLoginModal = () => {
        modalStore.openModal('my_modal_example');
      };
      ```

- **Modulo de estilo:** Utiliza módulos de estilo para mantener los estilos de los componentes encapsulados y
  reutilizables. Esto ayuda a evitar conflictos de estilos y facilita la gestión de los mismos. Utiliza la propiedad
  `scoped` en la etiqueta style de los componentes para limitar su alcance a ese componente.

  ```html
  <style scoped>
      /* Estilos del componente */
  </style>
  ```

- **Estados Globales:** Utiliza Pinia para los estados globales, compartir datos entre componentes y mantener la
  coherencia de la
  aplicación. Definir las stores de Pinia en el directorio `stores/` y utilizar setup stores para inicializarlas.

  ```typescript
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    return { count, name, doubleCount, increment }

  })
  ```

- **Tipos y Interfaces:** Utiliza tipos y interfaces para definir la forma de los datos y mejorar la seguridad del
  código. Las interfaces se utilizan para definir contratos en el código, mientras que los tipos se utilizan para
  definir la forma de los datos.

    - **Interfaces:** Las interfaces se utilizan para definir la estructura de un objeto y asegurar que las clases y
      objetos
      sigan una estructura específica.

      ```typescript
      export interface User {
        id: number
        name: string
        email: string
      }
  
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      ```

    - **Tipos:** Los tipos se utilizan para definir la forma de los datos y mejorar la seguridad del código.

      ```typescript
      type UserId = number;
  
      const userId: UserId = 1;
      ```

- **Utilidades:** Utiliza utilidades para encapsular lógica no reactiva y no dependen de la Composition API. Se utilizan
  para tareas comunes y repetitivas en la aplicación.

    ```typescript
    export function formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
    ```

- **Composables:** Utiliza composables para encapsular lógica reactiva y utilizar la Composition API (ref, reactive,
  computed, watch, etc.). Se utilizan para compartir y reutilizar lógica entre componentes Vue.

    ```typescript
    import { ref, watch } from 'vue';

    export function useLocalStorage(key: string, initialValue: any) {
        const storedValue = ref(localStorage.getItem(key) || initialValue);

        watch(storedValue, (newValue) => {});

        return storedValue;
    }
    ```

- **Pruebas(Opcional):** Escribe las pruebas para garantizar el correcto funcionamiento de las funciones y
  componentes. Utiliza vitest y vue-test-utils para escribir pruebas unitarias y de integración.

    ```vue
    <!-- src/components/ButtonWithClick.vue -->
    <template>
      <button @click="handleClick">{{ text }}</button>
    </template>
    
    <script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    
    const props = defineProps<{ text: string }>();
    const emit = defineEmits(['click']);
    
    const handleClick = () => {
      emit('click');
    };
    </script>
    ```

    - Las pruebas unitarias son esenciales para garantizar que cada componente o función individual de la aplicación
      funcione correctamente de manera aislada. Estas pruebas se centran en verificar la lógica interna de una unidad de
      código sin depender de otras partes del sistema.

    ```typescript
    // tests/components/Button.spec.ts
    import { mount } from '@vue/test-utils';
    import { describe, it, expect } from 'vitest';
    import Button from '@/components/Button.vue';
    
    describe('Button.vue', () => {
      it('renders the correct text', () => {
        const wrapper = mount(Button, {
          props: {
            text: 'Click Me',
          },
        });
        expect(wrapper.text()).toBe('Click Me');
      });
    });
    ```

    - Las pruebas de integración son pruebas automatizadas que validan la interacción entre diferentes módulos o
      componentes de una aplicación. El objetivo es asegurarse de que funcionen correctamente juntos y que las
      dependencias entre ellos estén bien gestionadas.

    ```typescript
    // tests/components/ButtonWithClick.spec.ts
    import { mount } from '@vue/test-utils';
    import { describe, it, expect, vi } from 'vitest';
    import ButtonWithClick from '@/components/ButtonWithClick.vue';
  
    describe('ButtonWithClick.vue', () => {
        it('renders the correct text and emits click event', async () => {
        const wrapper = mount(ButtonWithClick, {
            props: {
                text: 'Click Me',
            },
        });
  
        expect(wrapper.text()).toBe('Click Me');
  
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
        });
    });
    ```

- **Documentación:** Documenta el código y la estructura del proyecto para facilitar el mantenimiento y la colaboración.
  Utiliza comentarios con TSDoc para documentar funciones, clases y módulos.

    ```typescript
    /**
     * Suma dos números.
     * @param {number} a - El primer número.
     * @param {number} b - El segundo número.
     * @returns {number} La suma de los dos números.
     */
    export function sum(a: number, b: number): number {
        return a + b;
    }
    ```

- **Rendimiento:** Optimiza el rendimiento de la aplicación para garantizar una experiencia rápida y receptiva para los
  usuarios. Algunas recomendaciones de Vue incluyen:

    - **Desmontar eventos:** Asegúrate de desmontar los eventos cuando ya no sean necesarios para evitar el consumo
      innecesario de memoria.

      ```typescript
      import { onMounted, onUnmounted } from 'vue';
      
      export function useEventListener(event: string, handler: EventListener) {
        onMounted(() => {
          window.addEventListener(event, handler);
        });
      
        onUnmounted(() => {
          window.removeEventListener(event, handler);
        });
      }
      ```

    - **Lazy Loading:** Carga los componentes y recursos de forma diferida para reducir el tiempo de carga inicial.

      ```typescript
      const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'));
      ```

    - **Optimización de imágenes:** Utiliza imágenes optimizadas y formatos modernos como WebP y WebM para reducir el
      tamaño de los archivos.

- **Internacionalización:** Diseña la aplicación para que sea internacionalizable y pueda ser utilizada por usuarios de
  diferentes idiomas y regiones. Utiliza la biblioteca `vue-i18n` para gestionar las claves de traducciones y el
  contenido
  multilingüe.

    - **Claves de Traducción:** Define las claves de traducción usando la convención de KebabCase y agrúpalas por
      página, componentes o módulos. Por ejemplo, para las páginas de inicio y acerca de, puedes tener las siguientes
      claves de traducción:

      ```json
      {
        "home": {
          "title": "Welcome to our website",
          "description": "This is a demo website"
        },
        "about": {
          "title": "About Us",
          "description": "Learn more about our company"
        }
      }
      ```

    - **Traducción de Texto:** Utiliza las claves de traducción en los componentes Vue para mostrar el texto en el
      idioma correcto. Puedes utilizar la función `t` del hook `useI18n` para traducir el texto.

      ```vue
      <script setup>
          import { useI18n } from 'vue-i18n'
          const { t } = useI18n()
      </script>
      
      <template>
        <div>
          <h1>{{ t('home.title') }}</h1>
          <p>{{ t('home.description') }}</p>
        </div>
      </template>
      ```

- **Formateo y Linting:** Utiliza las herramientas de formateo y linting para mantener un código limpio y consistente en
  todo el proyecto. Usa los siguientes scripts para verificar si hay problemas en el código.

    - **Prettier:** Utiliza Prettier para formatear automáticamente el código según las reglas de estilo definidas en el
      archivo de configuración.

        ```sh
        npm run format
        ```

    - **ESLint:** Utiliza ESLint para identificar y corregir problemas en el código, siguiendo las reglas de estilo
      definidas en el archivo de configuración.

        ```sh
        npm run lint
        ```

    - **Check:** Utiliza el script `check` para ejecutar Prettier y ESLint y verificar si hay problemas en el código.

        ```sh
        npm run check
        ```

- **Revisión de Código:** Realiza revisiones de código y pruebas del desarrollo en un entorno local con distintos
  partners antes de hacer un pull request para garantizar la calidad y consistencia del código en todo el proyecto.

## Commit Messages

Los mensajes de commit deben seguir el siguiente formato convencional para mantener un historial de cambios claro y
consistente.

```
<tipo>:"([IDProyecto]-[codigo])-[descripción]"
```

- **Tipo:** El tipo de commit indica la naturaleza del cambio realizado. Puede ser uno de los siguientes:
    - **feat:** Nueva funcionalidad o característica.
    - **fix:** Corrección de errores o bugs.
    - **docs:** Cambios en la documentación.
    - **style:** Cambios en el estilo del código (espacios, sangrías, etc.).
    - **refactor:** Refactorización del código sin cambios funcionales.
    - **test:** Añadir o modificar pruebas.
    - **chore:** Tareas de mantenimiento, actualizaciones, etc.
- **IDProyecto:** Identificador del proyecto.
- **Codigo:** Código de la tarea.
- **Descripción:** Descripción breve y concisa del cambio realizado.

## Pull Requests

Los pull requests deben seguir las siguientes recomendaciones para facilitar la revisión y la integración del código.

```
PR_[prefijo]-[IDProyecto]-[codigo]-[descripcion]
```

- **PR:** Prefijo para identificar el pull request.
- **Prefijo:** Prefijo del proyecto.
    - **Feature:** Nueva funcionalidad o característica.
    - **Bugfix:** Corrección de errores o bugs.
    - **Hotfix:** Corrección urgente de errores críticos.
- **IDProyecto:** Identificador del proyecto.
- **Codigo:** Código de la tarea.
- **Descripción:** Descripción breve y concisa del cambio realizado.

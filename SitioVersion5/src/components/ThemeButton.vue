<script setup lang="ts">
import { ref, watch, onMounted } from 'vue' // Importing core Vue composition API functions
import { useAppcomponentStore } from '@/stores/AppComponent' // Importing the global AppComponent store
import apiService from '@/services/ApiService' // Importing the API service for backend requests

const { appComponent } = useAppcomponentStore() // Accessing the AppComponent store instance

const ligthMode = ref(false) // Reactive state to track if light mode is active
const moonIcon = ref('') // Reactive state to store the moon icon URL
const sunIcon = ref('') // Reactive state to store the sun icon URL
const hexToHsl = (H: string) => { // Converts HEX color to HSL format (used for Tailwind variables)
  if (!H) return '' // Return empty string if input is invalid
  let r = 0, g = 0, b = 0 // Initialize RGB values

  if (H.length == 4) { // Handle short HEX (#RGB)
    r = parseInt(H[1] + H[1], 16) // Extract red
    g = parseInt(H[2] + H[2], 16) // Extract green
    b = parseInt(H[3] + H[3], 16) // Extract blue
  } else if (H.length == 7) { // Handle full HEX (#RRGGBB)
    r = parseInt(H.slice(1, 3), 16) // Extract red
    g = parseInt(H.slice(3, 5), 16) // Extract green
    b = parseInt(H.slice(5, 7), 16) // Extract blue
  }

  r /= 255 // Normalize red
  g /= 255 // Normalize green
  b /= 255 // Normalize blue

  const cmin = Math.min(r, g, b) // Minimum RGB value
  const cmax = Math.max(r, g, b) // Maximum RGB value
  const delta = cmax - cmin // Difference between max and min
  let h = 0, s = 0, l = 0 // Initialize HSL values

  if (delta !== 0) { // If not a shade of gray
    if (cmax === r) h = ((g - b) / delta) % 6 // Hue based on red
    else if (cmax === g) h = (b - r) / delta + 2 // Hue based on green
    else h = (r - g) / delta + 4 // Hue based on blue
  }
  h = Math.round(h * 60) // Convert to degrees
  if (h < 0) h += 360 // Ensure hue is positive

  l = (cmax + cmin) / 2 // Lightness calculation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)) // Saturation calculation

  s = +(s * 100).toFixed(1) // Convert saturation to percentage
  l = +(l * 100).toFixed(1) // Convert lightness to percentage

  return `${h} ${s}% ${l}%` // Return formatted HSL string
}

/**
 * Aplica los colores al root usando variables CSS dinámicas
 */
const setThemeColor = (device: string) => {
  const config = appComponent.config?.[device]
  if (!config) return

  const rootTailwind = document.createElement('style')
  rootTailwind.textContent = `
    :root {
      --pf: ${hexToHsl(config.primary_focus)} !important;
      --sf: ${hexToHsl(config.secondary_focus)} !important;
      --af: ${hexToHsl(config.accent_focus)} !important;
      --su: ${hexToHsl(config.success)} !important;
      --in: ${hexToHsl(config.info)} !important;
      --wa: ${hexToHsl(config.warning)} !important;
      --er: ${hexToHsl(config.error)} !important;
      --p: ${hexToHsl(config.primary)} !important;
      --pc: ${hexToHsl(config.primary_content)} !important;
      --s: ${hexToHsl(config.secondary)} !important;
      --sc: ${hexToHsl(config.secondary_content)} !important;
      --a: ${hexToHsl(config.accent)} !important;
      --ac: ${hexToHsl(config.accent_content)} !important;
      --n: ${hexToHsl(config.neutral)} !important;
      --nf: ${hexToHsl(config.neutral_focus)} !important;
      --nc: ${hexToHsl(config.neutral_content)} !important;
      --b1: ${hexToHsl(config.base_100)} !important;
      --b2: ${hexToHsl(config.base_200)} !important;
      --b3: ${hexToHsl(config.base_300)} !important;
      --b4: ${hexToHsl(config.base_400)} !important;
      --bc: ${hexToHsl(config.base_content)} !important;
      --nt: ${hexToHsl(config.neutral_text)} !important;
      --it: ${hexToHsl(config.info_text)} !important;
      --sb: ${hexToHsl(config.sportbook_color)} !important;
      --ic: ${hexToHsl(config.input_border)} !important;
      --ip: ${hexToHsl(config.input_placeholder)} !important;
      --ib: ${hexToHsl(config.input_background)} !important;
    }
    [data-theme="main"] .swiper-button-prev,
    [data-theme="main"] .swiper-button-next,
    [data-theme="main"] .swiper-button-prev::after,
    [data-theme="main"] .swiper-button-next::after {
      color: ${config.primary};
    }
  `

  document.body.appendChild(rootTailwind)
}
const saveThemeToBackend = (isLight: boolean) => {
  if (appComponent.session.logueado) {
    apiService.request('save_theme_color', { choicedTheme: isLight ? '1' : '2' })
  }
}

/**
 * Core logic: toggles between light and dark and applies theme colors.
 */
const initialized = ref(false)

onMounted(() => {
  const localStorageC = localStorage.getItem('changeThemeColor')
  applyTheme(localStorageC === 'true')
  initialized.value = true 
})
const applyTheme = (isLight: boolean) => {
  ligthMode.value = isLight // set reactive flag for light mode
  appComponent.session.theme_color_mode = isLight ? 1 : 2 // update session theme mode (1 = light, 2 = dark)

  localStorage.setItem('changeThemeColor', isLight ? 'true' : 'false')
  if (isLight) { // LIGHT MODE branch
    moonIcon.value = 'https://images.virtualsoft.tech/m/msj19212T1746209518.png' // set moon icon for light mode
    sunIcon.value = 'https://images.virtualsoft.tech/m/msj19212T1746207884.png' // set sun icon for light mode
    appComponent.themeSportbook = true // enable sportsbook theme flag
    let deviceTheme = '' // determine which device-specific theme to apply
    if (appComponent.config.theme_colors_ligth_desktop && appComponent.config.mobileL === '') {
      deviceTheme = 'theme_colors_ligth_desktop' // desktop light theme
    } else if (appComponent.config.theme_colors_ligth_mobile && appComponent.config.mobileL !== '') {
      deviceTheme = 'theme_colors_ligth_mobile' // mobile light theme
    }
    setThemeColor(deviceTheme) // apply CSS variables for the selected device theme
    appComponent.gAnalytics?.('change_theme_color_ligth') // analytics event (optional chaining)
  } else { // DARK MODE branch
    moonIcon.value = 'https://images.virtualsoft.tech/m/msj19212T1746206992.png' // set moon icon for dark mode
    sunIcon.value = 'https://images.virtualsoft.tech/m/msj19212T1746209351.png' // set sun icon for dark mode
    appComponent.themeSportbook = false // disable sportsbook theme flag
    let deviceTheme = '' // determine which device-specific theme to apply
    if (appComponent.config?.theme_colors_desktop && appComponent.config?.mobileL === '') {
      deviceTheme = 'theme_colors_desktop' // desktop dark theme
    } else if (appComponent.config?.theme_colors_mobile && appComponent.config?.mobileL !== '') {
      deviceTheme = 'theme_colors_mobile' // mobile dark theme
    } else {
      deviceTheme = 'theme_colors' // fallback/default theme
    }
    setThemeColor(deviceTheme) // apply CSS variables for the selected device theme
    appComponent.gAnalytics?.('change_theme_color_dark') // analytics event (optional chaining)
  }
}
/**
 * Manual toggle when the user clicks on the switch.
 */
const changeLigthMode = () => {
  const newMode = !ligthMode.value
  applyTheme(newMode)
  saveThemeToBackend(newMode) // aquí se hace la solicitud solo cuando el usuario cambia el switch
}

/**
 * Initialize theme state from localStorage when component mounts.
 */
onMounted(() => {
  const localStorageC = localStorage.getItem('changeThemeColor') // read saved theme preference
  applyTheme(localStorageC === 'true') // apply light if stored value is 'true', otherwise dark
})

/**
 * Watch for global changes in session.theme_color_mode and re-apply theme.
 */
watch(
    () => appComponent.session?.theme_color_mode,
    (newValue) => {
        if (!initialized.value || !appComponent.config?.swichThemeMode) return;
        applyTheme(newValue === 1);
    }
)
</script>


<template>
  <label
    v-if="
      appComponent.config != undefined &&
      appComponent.config.swichThemeMode != undefined &&
      appComponent.config.swichThemeMode 
    "
    class="swap text-9xl flex justify-center items-center relative w-[3rem]"
  >
    <!-- base icon -->
    <img
      :src="
        !ligthMode
          ? 'https://images.virtualsoft.tech/m/msj19212T1746208166.png'
          : 'https://images.virtualsoft.tech/m/msj19212T1746208981.png'
      "
      alt="switch-base"
    />

    <!-- hidden checkbox -->
    <input
      type="checkbox"
      class="hidden"
      @click="changeLigthMode"
    />

    <!-- moon icon -->
    <img
      :src="moonIcon"
      alt="moon"
      class="absolute opacity-100"
      :class="!ligthMode ? 'swap-off -left-[0.5px]' : 'swap-on left-[5px]'"
    />

    <!-- sun icon -->
    <img
      :src="sunIcon"
      alt="sun"
      class="absolute opacity-100"
      :class="ligthMode ? 'swap-on -right-[1px]' : 'swap-off right-[5px]'"
    />
  </label>
</template>

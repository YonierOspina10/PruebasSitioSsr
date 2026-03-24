<template>
  <div :class="appComponent?.config?.loyalty_type?.version === 4
    ? ''
    : 'gap-6 mb-10'" class="w-full flex flex-col text-center">

    <h3 :class="appComponent?.config?.loyalty_type?.version == 2
      ? 'relative text-2xl text-neutral mb-4 cursor-pointer select-none border border-neutral rounded-xl py-2 backdrop-blur-sm bg-transparent/5'
      : 'hidden'" @click="showLevels = !showLevels">
      <span class="block w-full text-center">
        <template v-if="showLevels">
          Ver menos <strong>Niveles del Programa</strong>
        </template>

        <template v-else>
          Ver más <strong>Niveles del Programa</strong>
        </template>
      </span>

      <iconArrow2 width="16" height="16" class="fill-neutral absolute right-6 top-1/2 -translate-y-1/2"
        :class="showLevels ? 'rotate-90' : '-rotate-90'" />
    </h3>
    <div :class="appComponent?.config?.loyalty_type?.version === 4
      ? 'w-full flex flex-col p-4'
      : 'hidden'">
      <h2 class="text-neutral w-full flex justify-start font-semibold">
        {{ $t('Explora cada nivel de nuestro programa de lealtad y descubre todas las recompensas que tenemos para ti')
        }}
      </h2>
    </div>

    <!-- GRID OCULTABLE -->
    <div v-if="showLevels" class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
      <div v-for="(level, index) in mergedLevels" :key="index" class="relative perspective-1000"
        :class="getLevelProgress(index) === 0 ? 'opacity-50' : 'opacity-100'">

        <!-- Card que rota toda -->
        <div class="relative w-full transition-transform duration-500 transform-style-preserve-3d" :class="[
          appComponent?.config?.loyalty_type?.version === 4
            ? 'w-full rounded-2xl p-4 flex flex-col items-center border border-neutral bg-transparent'
            : 'w-full bg-gradient-to-b from-base-300 to-base-content rounded-2xl p-6 shadow-md flex flex-col items-center border border-neutral'
        ]" :style="appComponent?.config?.loyalty_type?.version === 4
          ? {
            backgroundImage: `url(${appComponent?.config?.loyaltyProgramView?.backgraundsLeves?.['level' + (index + 1)]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: openStates[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }
          : { transform: openStates[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }">

          <!-- Iconos de estado (version 2) -->
          <div :class="appComponent?.config?.loyalty_type?.version == 2
            ? 'absolute top-4 right-4 z-10 flex items-center justify-center w-6 h-6 backface-hidden'
            : 'hidden'">
            <IconCheckv2Rounde v-if="getLevelStatusIcon(index) === 'completed'" class="w-8 h-8 fill-success" />

            <FlagIcon v-else-if="getLevelStatusIcon(index) === 'inprogress'" class="w-8 h-8" />

            <PadlockIconV2 v-else class="w-8 h-8" />
          </div>

          <div class="backface-hidden w-full flex flex-col items-center gap-2">

            <div :class="appComponent?.config?.loyalty_type?.version === 4
              ? 'bg-base-content flex text-neutral w-full justify-between p-2 text-sm rounded-xl'
              : 'hidden'">
              <h3 class="font-semibold">Nv. {{ index + 1 }}</h3>
              <h4 class="font-semibold text-neutral text-center">{{ level.name }}</h4>
              <div :class="appComponent?.config?.loyalty_type?.version == 4
                ? 'relative'
                : 'hidden'">
                <div class="w-6 h-6">
                  <IconCheckv2Rounde v-if="getLevelStatusIcon(index) === 'completed'" class="w-full fill-success" />

                  <FlagIcon v-else-if="getLevelStatusIcon(index) === 'inprogress'" class="w-full text-primary" />

                  <PadlockIconV2 v-else class="w-full text-primary" />
                </div>

              </div>
            </div>
            <div class="relative flex items-center justify-center w-full">
              <div :class="appComponent?.config?.loyalty_type?.version === 4
                ? 'hidden'
                : 'absolute inset-0 rounded-full bg-base-100 blur-xl'">
              </div>

              <img :src="level.image" :class="appComponent?.config?.loyalty_type?.version === 4
                ? 'w-[6rem] h-[6rem] bg-neutral-content/40 rounded-full border-1 border-neutral p-4'
                : 'relative w-36 h-36 object-cover rounded-full bg-base-100/20'" />
            </div>

            <div :class="appComponent?.config?.loyalty_type?.version === 4 ? 'hidden' : 'text-accent'">
              <h3 class="font-semibold">Nv. {{ index + 1 }}</h3>
              <h4 class="font-semibold text-xl text-neutral text-center">{{ level.name }}</h4>
            </div>

            <div class="w-full flex justify-between">
              <p class="text-neutral text-left">Puntos requeridos:</p>
              <strong :class="appComponent?.config?.loyalty_type?.version === 4 ? 'text-neutral' : 'text-accent'">
                {{ level.points }}
              </strong>
            </div>

            <div class="w-full mt-2">
              <div class="w-full h-2 bg-base-100 border-1 border-neutral rounded-full">
                <div class="h-2 bg-success rounded-full transition-all duration-300"
                  :style="{ width: getLevelProgress(index) + '%' }"></div>
              </div>
            </div>

            <button class="bg-secondary text-neutral p-2 rounded-xl flex items-center gap-2 mt-2"
              @click="toggleLevel(index)">
              Recompensas
              <iconArrow2 width="14" height="14" class="fill-neutral rotate-180" />
            </button>

          </div>

          <div
            class="backface-hidden rotate-y-180 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between p-4">
            <div class="text-neutral text-center w-full description-content mt-4" v-html="level.description"></div>
            <button class="bg-secondary text-neutral p-2 rounded-xl flex items-center gap-2"
              @click="toggleLevel(index)">
              <iconArrow2 width="14" height="14" class="fill-neutral" />
              Nv. {{ index + 1 }} {{ level.name }}
            </button>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>


<script>
import IconArrow2 from './icons/IconArrow2.vue'; // Imports the Arrow icon component.
import IconCheckv2Rounde from './icons/IconCheckv2Rounde.vue';// Imports the rounded checkmark icon component.
import FlagIcon from './icons/FlagIcon.vue'; // Imports the flag icon component.
import PadlockIconV2 from './icons/PadlockIconV2.vue'; // Imports the padlock icon component.

export default {
  components: { IconArrow2, IconCheckv2Rounde, FlagIcon, PadlockIconV2 }, // Registers imported components so they can be used inside the template.

  name: "LoyaltyLevels", // Sets the component's name.

  props: {
    loyalty: { type: Object, required: true },
    // Receives the loyalty configuration object (levels and required points).
    myloyalty: { type: Object, required: true },
    // Receives the user's current loyalty progress.
  },

  data() {
    return {
      showLevels: true,
      // NEW: Controls showing or hiding the levels list.

      appComponent: this.$appComponent,
      // Stores the global application component reference.

      openStates: Array(10).fill(false),
      // Stores the open/closed state for each of the 10 level sections.
    };
  },

  computed: {
    levelSettings() {
      // Retrieves loyalty level settings from the global configuration.
      return this.appComponent?.config?.loyalty_levels_settings || [];
    },

    mergedLevels() {
      // Returns empty list if loyalty object is missing.
      if (!this.loyalty || Object.keys(this.loyalty).length === 0) return [];

      // Creates an array of 10 levels with merged settings + loyalty values.
      return Array.from({ length: 10 }, (_, i) => {
        const n = i + 1;
        // Level number (1–10).

        const settings = this.levelSettings[i] || {};
        // Settings for this level (name, image, description).

        const suffix = this.levelWord(n);
        // Gets suffix like One, Two, Three...

        return {
          name: settings[`NameLevel${suffix}`] || `Nivel ${n}`,
          // Level name (custom or fallback).

          image: settings[`ImageLevel${suffix}`] || "",
          // Level image if provided.

          description: settings[`DescriptionLevel${suffix}`] || "",
          // Level description if provided.

          points: Number(this.loyalty[`Level${n}`] ?? 0),
          // Required points for this level, converted to number.
        };
      })
        .filter(level => level.points > 0);
    }
  },

  methods: {
    toggleLevel(i) {
      // Toggles the open/closed state for a specific level accordion.
      this.openStates[i] = !this.openStates[i];
    },

    levelWord(n) {
      // Maps numbers (1–10) to English words used in config keys.
      const map = [
        "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten"
      ];
      return map[n - 1];
    },

    getLevelStatusIcon(index) {
      // Returns which icon should be shown depending on progress.
      const progress = this.getLevelProgress(index);

      if (progress === 0) return 'locked';
      // User has not reached the level.

      if (progress === 100) return 'completed';
      // Level fully completed.

      return 'inprogress';
      // User is progressing through this level.
    },

    getLevelProgress(levelIndex) {
      const currentLevel = Number(this.myloyalty?.level ?? 0);
      const pts = Number(this.myloyalty?.pointsQualifying ?? 0);

      const levelNumber = levelIndex + 1;

      if (levelNumber < currentLevel) return 100;

      if (levelNumber > currentLevel) return 0;

      const required = Number(this.mergedLevels[levelIndex].points);

      if (this.myloyalty?.percentage === undefined || this.myloyalty.percentage < 0) {
        return 1;
      }
      const pct = this.myloyalty.percentage * 100;
      return pct === 0 ? 1 : pct;
    }

  },

};
</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.perspective-1000 {
  perspective: 1000px;
}


:deep(.description-content h2) {
  @apply text-accent;
  font-size: larger;
}
</style>

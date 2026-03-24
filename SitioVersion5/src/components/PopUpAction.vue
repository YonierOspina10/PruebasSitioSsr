<template>
  <div v-if="modal?.state" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
    <div class="bg-base-300 rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-[fadeIn_0.3s_ease]">
      <button class="text-neutral hover:opacity-70 transition text-xl font-bold"
        aria-label="Cerrar modal"  @click="handleClose">
        ✕
      </button>

      <!-- ----------------------------- -->
      <!-- TYPE 1 → Modal de TEXTO -->
      <!-- ----------------------------- -->
      <div v-if="modal.typeModal === 2" class="flex flex-col gap-4 text-center">
        <h2 class="text-xl font-bold text-neutral">
          {{ modal.title }}
        </h2>

        <div class="text-neutral text-sm" v-html="modal.htmlDescription"></div>

        <button
          class="w-fit ml-auto px-6 py-3 text-neutral font-semibold shadow-md hover:scale-105 transition-all"
          :style="{ background: modal.colorButton, borderRadius: modal.roundedButton }" @click="handleAction">
          {{ modal.textButton }}
        </button>

      </div>

      <!-- ----------------------------- -->
      <!-- TYPE 2 → Modal MIXTO -->
      <!-- ----------------------------- -->
      <div v-if="modal.typeModal === 1" class="flex flex-col gap-4 text-center">
        <img v-if="modal.urlImage" :src="modal.urlImage" class="w-full rounded-lg object-contain max-h-28" @error="$event.target.remove()"/>
        <h2 class="text-xl font-bold text-neutral">
          {{ modal.title }}
        </h2>
        <div class="text-neutral text-sm" v-html="modal.htmlDescription"></div>

        <button
          class="w-fit ml-auto px-6 py-3 text-neutral font-semibold shadow-md hover:scale-105 transition-all"
          :style="{ background: modal.colorButton, borderRadius: modal.roundedButton }" @click="handleAction">
          {{ modal.textButton }}
        </button>

      </div>

      <!-- ----------------------------- -->
      <!-- TYPE 3 → Modal VISUAL -->
      <!-- ----------------------------- -->
      <div v-if="modal.typeModal === 3" class="flex flex-col gap-4 text-center">
        <img v-if="modal.urlImage" :src="modal.urlImage" class="w-full rounded-lg object-contain max-h-28" @error="$event.target.remove()"/>
        <button
          class="w-fit ml-auto px-6 py-3 text-neutral font-semibold shadow-md hover:scale-105 transition-all"
          :style="{ background: modal.colorButton, borderRadius: modal.roundedButton }" @click="handleAction">
          {{ modal.textButton }}
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"; // Import helpers for defining props and emitted events

const emit = defineEmits(["close"]); // Declare the events that this component can emit

const props = defineProps({ // Define the component props
  modal: { // Modal configuration object
    type: Object, // Expected prop type
    required: true // This prop is required for the component to work
  }
});
function handleClose() {
  if (
    props.modal.actionModal === "onFirstLogin" ||
    props.modal.actionModal === "onNextLogin"
  ) {
    localStorage.setItem("modal_shown", "true");
  }

  emit("close");
}

function handleAction() { // Handles the main action button click
  if (
    props.modal.actionModal === "onFirstLogin" ||
    props.modal.actionModal === "onNextLogin"
  ) {
    localStorage.setItem("modal_shown", "true");
  }
  // If a redirect URL exists, navigate to it
  if (props.modal.urlRedirection) { // Check if the modal has a redirect URL
    window.location.href = props.modal.urlRedirection; // Redirect the browser to the provided URL
  }

  // Close the modal
  emit("close"); // Notify the parent component to close the modal
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

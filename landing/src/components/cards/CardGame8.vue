<template>
    <!-- Main container for the game card with click event handler -->
    <div
        class="w-full h-full rounded-xl bg-base-300 cursor-pointer"
        @click="handleOpenGame()"
        v-bind="analyticsAttrs"
    >
        <!-- Conditional image display based on game.icon_2 availability -->
        <img
            v-if="game.icon_2 !== undefined && game.icon_2 !== null && game.icon_2 !== ''"
            :src="game.icon_2"
            alt=""
            class="h-[75%] w-full rounded-2xl hover:scale-105"
            :class="'object-' + game.object_fit"
        />
        <!-- Fallback div if game.icon_2 is not available -->
        <div
            v-else
            class="h-[75%] w-full rounded-2xl"
        />
        <!-- Container for game name and action button -->
        <div class="flex justify-between items-center w-full h-[25%] rounded-xl px-2">
            <!-- Game name displayed in lowercase -->
            <p class="text-xs text-neutral font-light capitalize w-full">
                {{ game.name.toLowerCase() }}
            </p>
            <!-- Action button with SVG icon -->
            <button class="w-[13px] h-[13px] hover:scale-125 hover:fill-pri">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                >
                    <!-- SVG path for the icon -->
                    <path
                        d="M13.5214 5.0051C13.4643 4.82325 13.3567 4.66297 13.2119 4.54446C13.0672 4.42596 12.8919 4.35452 12.7081 4.33915L9.34308 4.05763L8.04385 0.799438C7.97359 0.621901 7.854 0.47004 7.70029 0.363163C7.54659 0.256285 7.36571 0.199219 7.18064 0.199219C6.99558 0.199219 6.8147 0.256285 6.66099 0.363163C6.50728 0.47004 6.3877 0.621901 6.31743 0.799438L5.01934 4.05703L1.65263 4.33915C1.46851 4.35529 1.29308 4.42743 1.14832 4.54651C1.00356 4.66558 0.89591 4.82632 0.838851 5.00856C0.781791 5.1908 0.777864 5.38646 0.827561 5.57101C0.877258 5.75555 0.978368 5.92079 1.11823 6.04601L3.68475 8.34254L2.90282 11.7764C2.85908 11.9629 2.86979 12.1588 2.93358 12.339C2.99737 12.5192 3.11136 12.6757 3.26108 12.7887C3.4108 12.9016 3.58951 12.9658 3.77451 12.9732C3.95951 12.9807 4.14246 12.9309 4.30015 12.8303L7.18036 10.9921L10.0623 12.8303C10.22 12.9297 10.4026 12.9785 10.587 12.9705C10.7715 12.9626 10.9495 12.8982 11.0987 12.7855C11.2479 12.6728 11.3616 12.5169 11.4256 12.3373C11.4895 12.1577 11.5007 11.9626 11.4579 11.7764L10.6731 8.34194L13.2396 6.04542C13.3806 5.92041 13.4827 5.75481 13.5328 5.56962C13.583 5.38442 13.579 5.18795 13.5214 5.0051ZM12.6465 5.32861L9.86893 7.81261C9.80559 7.86923 9.75847 7.94281 9.73272 8.02531C9.70697 8.10782 9.70359 8.19607 9.72293 8.28044L10.5716 11.9946C10.5738 11.9997 10.574 12.0055 10.5722 12.0108C10.5704 12.0161 10.5667 12.0205 10.5619 12.023C10.5516 12.0313 10.5488 12.0295 10.5402 12.023L7.41933 10.0328C7.34745 9.98702 7.26473 9.96276 7.18036 9.96276C7.09598 9.96276 7.01326 9.98702 6.94138 10.0328L3.82049 12.0242C3.81194 12.0295 3.80965 12.0313 3.79882 12.0242C3.794 12.0216 3.79031 12.0173 3.78851 12.012C3.78671 12.0067 3.78693 12.0009 3.78912 11.9958L4.63779 8.28162C4.65713 8.19725 4.65374 8.109 4.62799 8.0265C4.60224 7.94399 4.55512 7.87041 4.49178 7.8138L1.71423 5.32979C1.70739 5.32388 1.70111 5.31855 1.70681 5.30022C1.71252 5.28189 1.71708 5.28425 1.72564 5.28307L5.37124 4.97789C5.45486 4.97045 5.53488 4.93925 5.6025 4.8877C5.67012 4.83615 5.72272 4.76627 5.75451 4.68572L7.15868 1.16021C7.16325 1.15016 7.16496 1.14542 7.17865 1.14542C7.19233 1.14542 7.19405 1.15016 7.19861 1.16021L8.6062 4.68572C8.6383 4.7663 8.69123 4.83611 8.75916 4.88745C8.8271 4.9388 8.90739 4.96969 8.99118 4.97671L12.6368 5.28189C12.6453 5.28189 12.6505 5.28189 12.6556 5.29904C12.6607 5.31619 12.6556 5.32269 12.6465 5.32861Z"
                        fill="#FFDE00"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useModalStore } from '../../stores'; // Importing the modal store for managing modals

defineProps({
    game: Object, // Defining a prop 'game' of type Object
    analyticsAttrs: Object,
});

let modals = useModalStore(); // Initializing the modal store instance

/**
 * Opens the game modal by adding it to the modal store.
 */
const handleOpenGame = () => {
    modals.addModal({ showModal: 'ModalLogin7' }); // Adding 'ModalLogin7' to the modals
};
</script>
<style scoped></style>

<!-- FILE DOCUMENTED -->

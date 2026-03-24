<template>
    <!-- Main container for the animated placeholder -->
    <div class="animatedPlaceholder"></div>
</template>
<script setup lang="ts"></script>
<style scoped>
/* 
  .animatedPlaceholder: 
  A class that creates a loading placeholder effect with a gradient background and animation.
*/
.animatedPlaceholder {
    /* 
    Sets a linear gradient background that transitions from transparent to a dark color (#181b25) 
    and back to transparent, creating a shimmering effect.
  */
    background-image: linear-gradient(to right, transparent 0%, #181b25 50%, transparent 100%);

    /* 
    Defines the size of the background gradient to be twice the width of the element, 
    ensuring smooth animation.
  */
    background-size: 200% 100%;

    /* 
    Applies a subtle shadow effect to the element to give it depth.
    The shadow is defined with two layers for a more pronounced effect.
  */
    box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        /* First shadow layer */ 0 2px 4px -2px rgb(0 0 0 / 0.1); /* Second shadow layer */

    /* 
    Initiates an animation named 'bgAnimate' that lasts 1.2 seconds, 
    runs in a linear fashion, and repeats infinitely.
  */
    animation: bgAnimate 1.2s linear infinite;
}

/* 
  @keyframes bgAnimate: 
  Defines the keyframes for the background animation, transitioning the background position 
  to create a moving effect.
*/
@keyframes bgAnimate {
    /* 
    At the start of the animation (0%), the background position is set to 50% horizontally.
  */
    0% {
        background-position: 50% 0;
    }

    /* 
    At the end of the animation (100%), the background position shifts to -150% horizontally, 
    creating a seamless animation loop.
  */
    100% {
        background-position: -150% 0;
    }
}
</style>

<!-- FILE DOCUMENTED -->

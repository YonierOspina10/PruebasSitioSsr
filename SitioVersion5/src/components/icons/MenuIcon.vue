<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition for an SVG element.
 * This component accepts props to customize its dimensions and fill color.
 */
export default defineComponent({
    props: {
        /** Width of the SVG element */
        width: Number,
        /** Height of the SVG element */
        height: Number,
        /** Fill color of the SVG element */
        fill: String,
    },
});
</script>
<template>
    <!-- Placeholder for the SVG element -->
    <svg
        :width="width"
        :height="height"
        :fill="fill"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14.46 15.83"
    >
        <path
            class="menu-icon"
            d="m13.55,1.82H.91c-.5,0-.91-.41-.91-.91s.41-.91.91-.91h12.64c.5,0,.91.41.91.91s-.41.91-.91.91Z"
        />
        <path
            class="menu-icon"
            d="m9.96,6.49H.91c-.5,0-.91-.41-.91-.91s.41-.91.91-.91h9.05c.5,0,.91.41.91.91s-.41.91-.91.91Z"
        />
        <path
            class="menu-icon"
            d="m13.55,11.16H.91c-.5,0-.91-.41-.91-.91s.41-.91.91-.91h12.64c.5,0,.91.41.91.91s-.41.91-.91.91Z"
        />
        <path
            class="menu-icon"
            d="m9.96,15.83H.91c-.5,0-.91-.41-.91-.91s.41-.91.91-.91h9.05c.5,0,.91.41.91.91s-.41.91-.91.91Z"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->

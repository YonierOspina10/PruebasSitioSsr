<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Vue component definition.
 * @returns {Object} The component options object.
 */
export default defineComponent({
    /**
     * Component props definition.
     * @type {Object}
     */
    props: {
        /**
         * Width of the component.
         * @type {Number}
         */
        width: Number,

        /**
         * Height of the component.
         * @type {Number}
         */
        height: Number,

        /**
         * Fill color of the component.
         * @type {String}
         */
        fill: String,
    },
});
</script>
<template>
    <!-- SVG container for scalable vector graphics -->
    <svg
        :width="width"
        :height="height"
        :fill="fill"
        id="Capa_2"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22.39 22.41"
    >
        <path
            class="cls-1"
            d="m22.39,10.51v1.4c-.01.06-.03.11-.04.17-.08.52-.12,1.04-.23,1.55-.9,4.34-4.61,7.9-8.97,8.61-.42.07-.83.12-1.25.17h-1.4c-.06-.01-.13-.03-.19-.04-.53-.08-1.07-.12-1.6-.24C2.5,20.75-1.33,14.28.43,8.16,2.1,2.33,7.95-1.09,13.85.31c4.27,1.01,7.64,4.62,8.36,8.96.07.41.11.82.17,1.23Zm-17.9,7.93c.3-1.04.8-1.94,1.5-2.73.7-.79,1.55-1.39,2.54-1.81-2.54-1.71-2.84-5.1-1.06-7.22,1.7-2.02,4.7-2.34,6.75-.69,1.05.84,1.68,1.94,1.82,3.28.19,1.95-.58,3.48-2.15,4.64,2.04.91,3.38,2.42,4.04,4.53,2.38-2.11,3.94-5.98,2.76-10.03-1.16-3.98-4.85-6.9-9.01-7.07C7.36,1.14,3.49,3.68,1.95,7.74c-1.47,3.9-.29,8.1,2.54,10.7Zm6.71,2.66c1.95-.02,3.74-.54,5.38-1.6.17-.11.19-.21.15-.39-.57-2.47-2.57-4.2-5.1-4.41-2.8-.23-5.38,1.69-5.97,4.45-.04.17,0,.26.15.35,1.64,1.06,3.44,1.59,5.39,1.61Zm0-14.87c-1.96,0-3.55,1.6-3.55,3.57,0,1.97,1.59,3.56,3.56,3.56,1.97,0,3.55-1.59,3.55-3.56,0-1.97-1.6-3.56-3.56-3.56Z"
        />
    </svg>
</template>

<!-- FILE DOCUMENTED -->
